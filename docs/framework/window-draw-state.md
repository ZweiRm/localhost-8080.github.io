---
prev:
    text: '窗口布局流程 relayoutWindow'
    link: '/framework/relayoutWindow'
next:
    text: 'ViewRootImpl 中 performTraversal() 梳理'
    link: '/framework/performTraversal'
---

# WMS 窗口绘制状态

## 概述

`WindowStateAnimator.mDrawState` 描述了窗口 Surface 从创建到显示的绘制状态流转。理解这一状态机是分析窗口显示、动画、转屏等问题的基础。

### 关键类

| 类 | 路径 | 职责 |
|---|---|---|
| `WindowStateAnimator` | `frameworks/base/services/core/java/com/android/server/wm/WindowStateAnimator.java` | 管理窗口的绘制状态 |
| `ViewRootImpl` | `frameworks/base/core/java/android/view/ViewRootImpl.java` | 处理客户端窗口的绘制 |
| `WindowSurfacePlacer` | `frameworks/base/services/core/java/com/android/server/wm/WindowSurfacePlacer.java` | 窗口布局，放置 surfaces |
| `WindowSurfaceController` | `frameworks/base/services/core/java/com/android/server/wm/WindowSurfaceController.java` | Surface 控制器（app 进程的 RenderThread 将在其上绘制） |
| `WindowManagerService` | `frameworks/base/services/core/java/com/android/server/wm/WindowManagerService.java` | WMS 服务端 |

### 五种绘制状态

```java
// WindowStateAnimator.java
static final int NO_SURFACE = 0;         // 没有 Surface
static final int DRAW_PENDING = 1;       // Surface 已创建但窗口尚未绘制，Surface 处于隐藏状态
static final int COMMIT_DRAW_PENDING = 2; // 窗口第一次完成绘制但 Surface 尚未显示，将在下一次布局时显示
static final int READY_TO_SHOW = 3;      // 绘制已提交，等待同一 WindowToken 下所有窗口就绪后一起显示
static final int HAS_DRAWN = 4;          // 窗口首次显示在屏幕上
```

### 状态机

![状态机](/img/android/window_draw_state/01_state_machine.svg)

### 总览流程

从 Activity Resume 开始，经历添加窗口、创建 Surface、绘制、提交、到最终显示的完整流程：

![总览流程](/img/android/window_draw_state/02_overall_flow.svg)

### System server 端交互全景

下图展示了 system_server 端各模块（WMS、WindowState、WindowStateAnimator、WindowSurfacePlacer、DisplayContent、WindowAnimator）如何协作驱动状态转换。注意 WindowAnimator 通过 Vsync 动画回调提供了另一条触发 `performShowLocked` 的路径：

![System server 端交互全景](/img/android/window_draw_state/09_server_interaction.svg)

## NO_SURFACE — 无 Surface

`NO_SURFACE` 是窗口的初始状态，表示该窗口没有对应的 Surface。以下场景会处于或回到此状态：

1. **窗口刚被添加时**：在 `WindowState` 构造方法中创建 `WindowStateAnimator`，默认状态即为 `NO_SURFACE`。
2. **Surface 创建失败时**：`createSurfaceLocked` 抛出异常，回退到 `NO_SURFACE`。
3. **Surface 被销毁后**：窗口不可见退至后台（如 `ActivityRecord.stop`），调用 `destroySurfaceLocked` 后回到 `NO_SURFACE`。

### 添加窗口流程

App 进程执行完 Activity 的 `onResume` 后，通过 `ViewRootImpl` 告知 system_server 添加当前 Activity 的窗口。此时窗口尚无 Surface。

![添加窗口时序](/img/android/window_draw_state/03_add_window_sequence.svg)

**App 进程：**

```java
// ActivityThread.java
public void handleResumeActivity(ActivityClientRecord r, boolean finalStateRequest,
        boolean isForward, String reason) {
    // 执行 Activity 的 onResume
    if (!performResumeActivity(r, finalStateRequest, reason)) {
        return;
    }
    // ...
    View decor = r.window.getDecorView();
    ViewManager wm = a.getWindowManager();
    WindowManager.LayoutParams l = r.window.getAttributes();
    if (a.mVisibleFromClient) {
        if (!a.mWindowAdded) {
            a.mWindowAdded = true;
            // 创建 ViewRootImpl 并调用 setView
            wm.addView(decor, l);
        }
    }
    // 注册 IdleHandler，主线程空闲时通知 system_server
    Looper.myQueue().addIdleHandler(new Idler());
}
```

```java
// WindowManagerGlobal.java
public void addView(View view, ViewGroup.LayoutParams params,
        Display display, Window parentWindow, int userId) {
    // 创建 ViewRootImpl 实例
    root = new ViewRootImpl(view.getContext(), display);
    view.setLayoutParams(wparams);
    mViews.add(view);
    mRoots.add(root);
    mParams.add(wparams);
    // 调用 setView，触发窗口添加流程
    root.setView(view, wparams, panelParentView, userId);
}
```

```java
// ViewRootImpl.java
public void setView(View view, WindowManager.LayoutParams attrs, View panelParentView,
        int userId) {
    // 在添加到窗口管理器之前安排初始布局
    requestLayout();
    // 通过 IPC 添加窗口到 WMS
    res = mWindowSession.addToDisplayAsUser(mWindow, mWindowAttributes,
            getHostVisibility(), mDisplay.getDisplayId(), userId,
            mInsetsController.getRequestedVisibleTypes(), inputChannel, mTempInsets,
            mTempControls, attachedFrame, compatScale);
}
```

**System server 进程：**

```java
// WindowState.java
WindowState(WindowManagerService service, Session s, IWindow c, WindowToken token,
        WindowState parentWindow, int appOp, WindowManager.LayoutParams a, int viewVisibility,
        int ownerId, int showUserId, boolean ownerCanAddInternalSystemWindow,
        PowerManagerWrapper powerManagerWrapper) {
    super(service);
    // 创建 WindowStateAnimator，默认 mDrawState = NO_SURFACE
    mWinAnimator = new WindowStateAnimator(this);
}
```

### Surface 销毁

当窗口不可见退至后台时，Surface 会被销毁，状态回到 `NO_SURFACE`：

```java
// WindowStateAnimator.java
void destroySurfaceLocked(SurfaceControl.Transaction t) {
    if (mSurfaceController == null) {
        return;
    }
    mWin.mHidden = true;
    try {
        destroySurface(t);
    } catch (RuntimeException e) {
        // ...
    }
    mWin.setHasSurface(false);
    if (mSurfaceController != null) {
        mSurfaceController.setShown(false);
    }
    mSurfaceController = null;
    mDrawState = NO_SURFACE;
}
```

## DRAW_PENDING — 等待绘制

`DRAW_PENDING` 表示 Surface 已创建但尚未绘制内容。在此状态下，Surface 处于隐藏状态。有三种场景会设置此状态：

1. **relayoutWindow 创建 Surface 成功**
2. **窗口需要 resize**（`contentChanged || insetsChanged || shouldSendRedrawForSync()`）
3. **亮屏时需要显示但尚未绘制完成**

### 场景一：创建 Surface

![创建 Surface 时序](/img/android/window_draw_state/04_create_surface_sequence.svg)

#### App 进程

`setView` 中先调用 `requestLayout` 触发 `scheduleTraversals`，安排首次绘制。`scheduleTraversals` 主要做两件事：

- 向消息队列发送同步屏障（Sync Barrier），阻塞同步消息，确保界面刷新优先
- 将 `mTraversalRunnable` 投递到 Choreographer，等待下一个 Vsync 信号

下图展示了 `scheduleTraversals` 与 Choreographer VSync 的完整交互流程：从发送同步屏障、注册 Vsync 回调，到 Vsync 信号到来后通过异步消息触发 `doFrame` → `doTraversal`，最后移除同步屏障：

![Choreographer VSync 机制](/img/android/window_draw_state/11_choreographer_vsync.svg)

```java
// ViewRootImpl.java
void scheduleTraversals() {
    if (!mTraversalScheduled) {
        mTraversalScheduled = true;
        // 发送同步屏障
        mTraversalBarrier = mHandler.getLooper().getQueue().postSyncBarrier();
        // 投递到 Choreographer，等待 Vsync 回调
        mChoreographer.postCallback(
            Choreographer.CALLBACK_TRAVERSAL, mTraversalRunnable, null);
        notifyRendererOfFramePending();
        pokeDrawLockIfNeeded();
    }
}
```

Vsync 信号到来后，通过 `doFrame` → `doTraversal` → `performTraversals` 执行遍历：

```java
// ViewRootImpl.java
void doTraversal() {
    if (mTraversalScheduled) {
        mTraversalScheduled = false;
        // 移除同步屏障
        mHandler.getLooper().getQueue().removeSyncBarrier(mTraversalBarrier);
        // 执行布局遍历
        performTraversals();
    }
}
```

在 `performTraversals` 内部调用 `relayoutWindow`，通过 IPC 请求 system_server 创建 Surface。

> **渲染流水线背景**：Surface 创建完成返回 App 后，后续的绘制流程沿着如下流水线推进——UI Thread 完成 measure/layout/draw 后同步到 RenderThread，由 GPU 执行实际渲染，最终 swap buffer 给 SurfaceFlinger 合成上屏。整个流水线预算为一个 Vsync 周期（16.6ms）。

![渲染流水线](/img/android/window_draw_state/10_rendering_pipeline.svg)

#### System server 进程

```java
// WindowManagerService.java
private int relayoutWindowInner(Session session, IWindow client, LayoutParams attrs, ...) {
    final WindowState win = windowForClientLocked(session, client, false);
    final boolean shouldRelayout = viewVisibility == View.VISIBLE &&
            (win.mActivityRecord == null || win.mAttrs.type == TYPE_APPLICATION_STARTING
                    || win.mActivityRecord.isClientVisible());
    if (shouldRelayout && outSurfaceControl != null) {
        try {
            // 创建 SurfaceControl 并拷贝到 outSurfaceControl
            result = createSurfaceControl(outSurfaceControl, result, win, winAnimator);
        } catch (Exception e) {
            // ...
        }
    }
}
```

```java
// WindowManagerService.java
private int createSurfaceControl(SurfaceControl outSurfaceControl, int result,
        WindowState win, WindowStateAnimator winAnimator) {
    if (!win.mHasSurface) {
        result |= RELAYOUT_RES_SURFACE_CHANGED;
    }
    WindowSurfaceController surfaceController;
    try {
        // 委托 WindowStateAnimator 创建 Surface
        surfaceController = winAnimator.createSurfaceLocked();
    } finally {
        Trace.traceEnd(TRACE_TAG_WINDOW_MANAGER);
    }
    if (surfaceController != null) {
        // 将 Surface 拷贝给 app 进程
        surfaceController.getSurfaceControl(outSurfaceControl);
    }
    return result;
}
```

创建 Surface 并设置状态为 `DRAW_PENDING`：

```java
// WindowStateAnimator.java
WindowSurfaceController createSurfaceLocked() {
    final WindowState w = mWin;
    if (mSurfaceController != null) {
        return mSurfaceController;
    }
    w.setHasSurface(false);
    // 设置 mDrawState = DRAW_PENDING
    resetDrawState();

    mService.makeWindowFreezingScreenIfNeededLocked(w);
    int flags = SurfaceControl.HIDDEN; // 默认隐藏

    try {
        final boolean isHwAccelerated = (attrs.flags & FLAG_HARDWARE_ACCELERATED) != 0;
        final int format = isHwAccelerated ? PixelFormat.TRANSLUCENT : attrs.format;
        // 创建 WindowSurfaceController，内部创建 SurfaceControl 与 SurfaceFlinger 通信
        mSurfaceController = new WindowSurfaceController(
                attrs.getTitle().toString(), format, flags, this, attrs.type);
        w.setHasSurface(true);
        w.mInputWindowHandle.forceChange();
    } catch (OutOfResourcesException e) {
        mService.mRoot.reclaimSomeSurfaceMemory(this, "create", true);
        mDrawState = NO_SURFACE;
        return null;
    } catch (Exception e) {
        mDrawState = NO_SURFACE;
        return null;
    }
    mLastHidden = true;
    return mSurfaceController;
}

void resetDrawState() {
    mDrawState = DRAW_PENDING;
    if (mWin.mActivityRecord == null) {
        return;
    }
    if (!mWin.mActivityRecord.isAnimating(TRANSITION)) {
        mWin.mActivityRecord.clearAllDrawn();
    }
}
```

### 场景二：窗口 Resize

窗口大循环中的 `updateResizingWindowIfNeeded` 判断是否需要重绘。当内容变化、Insets 变化或需要同步 buffer 时，将状态回退为 `DRAW_PENDING`：

```java
// WindowState.java
void updateResizingWindowIfNeeded() {
    final boolean insetsChanged = mWindowFrames.hasInsetsChanged();
    // ...
    final boolean didFrameInsetsChange = setReportResizeHints();
    final boolean configChanged = !mInRelayout && !isLastConfigReportedToClient();
    final boolean dragResizingChanged = !mDragResizingChangeReported && isDragResizeChanged();
    final boolean contentChanged = didFrameInsetsChange || configChanged
            || dragResizingChanged || attachedFrameChanged;

    if (contentChanged || insetsChanged || shouldSendRedrawForSync()) {
        consumeInsetsChange();
        onResizeHandled();
        mWmService.makeWindowFreezingScreenIfNeededLocked(this);
        // 需要重绘时，回退绘制状态
        if ((configChanged || getOrientationChanging() || dragResizingChanged)
                && isVisibleRequested()) {
            winAnimator.mDrawState = DRAW_PENDING;
            if (mActivityRecord != null) {
                mActivityRecord.clearAllDrawn();
            }
        }
        if (!mWmService.mResizingWindows.contains(this)) {
            mWmService.mResizingWindows.add(this);
        }
    }
}
```

### 场景三：亮屏时判定

亮屏时检查需要显示但尚未绘制完成的窗口：

```java
// WindowState.java
void requestDrawIfNeeded(List<WindowState> outWaitingForDrawn) {
    if (!isVisible()) {
        return;
    }
    // 壁纸窗口：检查是否有可见但未绘制的壁纸
    final WallpaperWindowToken wallpaperToken = mToken.asWallpaperToken();
    if (wallpaperToken != null) {
        if (wallpaperToken.hasVisibleNotDrawnWallpaper()) {
            outWaitingForDrawn.add(this);
        }
        return;
    }
    // Activity 窗口：检查是否已全部绘制
    if (mActivityRecord != null) {
        if (!mActivityRecord.isVisibleRequested()) return;
        if (mActivityRecord.allDrawn) return;
        if (mAttrs.type == TYPE_APPLICATION_STARTING) {
            if (isDrawn()) return;
        } else if (mActivityRecord.mStartingWindow != null) {
            return;
        }
    } else if (!mPolicy.isKeyguardHostWindow(mAttrs)) {
        return;
    }
    // 设置 DRAW_PENDING 并强制加入 resizing 列表
    mWinAnimator.mDrawState = DRAW_PENDING;
    forceReportingResized();
    outWaitingForDrawn.add(this);
}
```

## COMMIT_DRAW_PENDING — 第一次绘制完成

`COMMIT_DRAW_PENDING` 表示应用已完成一次绘制并通知了 WMS。接下来需要等待布局系统进行提交。

### App 进程：SurfaceSyncGroup 机制

为了保证绘制事务的原子性，`ViewRootImpl` 使用 `SurfaceSyncGroup` 来同步绘制完成的通知。这个过程涉及两个 SyncGroup：

- **mWmsRequestSyncGroup**：用于与 WMS 同步，其回调最终会调用 `reportDrawFinished` 通知 system_server
- **mActiveSurfaceSyncGroup**：用于收集当前帧的所有同步请求

```java
// ViewRootImpl.java
// WMS 请求同步的状态
int mWmsRequestSyncGroupState;
private static final int WMS_SYNC_NONE = 0;
private static final int WMS_SYNC_PENDING = 1;
private static final int WMS_SYNC_RETURNED = 2;
private static final int WMS_SYNC_MERGED = 3;
```

#### 创建 SyncGroup 并注册回调

![SurfaceSyncGroup 建立流程](/img/android/window_draw_state/05_sync_group_setup.svg)

**创建 mWmsRequestSyncGroup：**

`SurfaceSyncGroup` 的构造方法接收一个 `Consumer<Transaction>` 回调，允许调用者获取合并后的事务。`ViewRootImpl` 利用它将事务发送到 WMS 进行同步。

```java
// ViewRootImpl.java
private void createSyncIfNeeded() {
    final int seqId = mSyncSeqId;
    mWmsRequestSyncGroupState = WMS_SYNC_PENDING;
    mWmsRequestSyncGroup = new SurfaceSyncGroup("wmsSync-" + mTag, t -> {
        mWmsRequestSyncGroupState = WMS_SYNC_MERGED;
        if (mWindowSession instanceof Binder) {
            // system 进程中运行时，避免死锁
            Transaction transactionCopy = new Transaction();
            transactionCopy.merge(t);
            mHandler.postAtFrontOfQueue(() -> reportDrawFinished(transactionCopy, seqId));
        } else {
            // app 进程
            reportDrawFinished(t, seqId);
        }
    });
    mWmsRequestSyncGroup.add(this, null /* runnable */);
}
```

**关联 mActiveSurfaceSyncGroup 与 mWmsRequestSyncGroup：**

通过 `addLocalSync`，将 mWmsRequestSyncGroup（parent）的回调设置到 mActiveSurfaceSyncGroup（child）中。当 child ready 时，触发 `onTransactionReady` 回调并传递合并的 transaction：

```java
// SurfaceSyncGroup.java
private boolean addLocalSync(ISurfaceSyncGroup childSyncToken, boolean parentSyncGroupMerge) {
    SurfaceSyncGroup childSurfaceSyncGroup = getSurfaceSyncGroup(childSyncToken);
    ITransactionReadyCallback callback =
            createTransactionReadyCallback(parentSyncGroupMerge);
    // 将 parent 的 callback 设置到 child 中
    childSurfaceSyncGroup.setTransactionCallbackFromParent(mISurfaceSyncGroup, callback);
    return true;
}
```

```java
// SurfaceSyncGroup.java
public ITransactionReadyCallback createTransactionReadyCallback(boolean parentSyncGroupMerge) {
    ITransactionReadyCallback transactionReadyCallback =
            new ITransactionReadyCallback.Stub() {
                @Override
                public void onTransactionReady(Transaction t) {
                    synchronized (mLock) {
                        if (t != null) {
                            t.sanitize(Binder.getCallingPid(), Binder.getCallingUid());
                            if (parentSyncGroupMerge) {
                                t.merge(mTransaction);
                            }
                            // 将 child 传过来的 transaction 合并到 parent 的 mTransaction 中
                            mTransaction.merge(t);
                        }
                        mPendingSyncs.remove(this);
                        checkIfSyncIsComplete();
                    }
                }
            };
    return transactionReadyCallback;
}
```

**注册 RenderThread 帧绘制回调：**

注册一个在 RenderThread 绘制下一帧时执行的回调，该回调仅触发一次。首次绘制 Activity 窗口时 `syncBuffer` 为 false，绘制完成后直接调用 `surfaceSyncGroup.markSyncReady()`：

```java
// ViewRootImpl.java
private void registerCallbacksForSync(boolean syncBuffer,
        final SurfaceSyncGroup surfaceSyncGroup) {
    mAttachInfo.mThreadedRenderer.registerRtFrameCallback(new FrameDrawingCallback() {
        @Override
        public HardwareRenderer.FrameCommitCallback onFrameDraw(int syncResult, long frame) {
            if (syncBuffer) {
                // 后续同步 buffer 场景
                boolean result = mBlastBufferQueue.syncNextTransaction(transaction -> {
                    surfaceSyncGroup.addTransaction(transaction);
                    surfaceSyncGroup.markSyncReady();
                });
            }
            return didProduceBuffer -> {
                // 首次绘制 syncBuffer=false，直接标记 ready
                if (!syncBuffer) {
                    surfaceSyncGroup.markSyncReady();
                }
            };
        }
    });
}
```

#### mActiveSurfaceSyncGroup ready

RenderThread 在 HWUI 绘制下一帧时触发 `onFrameCommit` 回调，调用 `markSyncReady`，再回调 parent（mWmsRequestSyncGroup）的 `onTransactionReady` 并传入 transaction。此流程运行在 Render Thread 线程：

![Active SyncGroup Ready 流程](/img/android/window_draw_state/06_active_sync_ready.svg)

```java
// SurfaceSyncGroup.java
@GuardedBy("mLock")
private void checkIfSyncIsComplete() {
    // 所有 pending syncs 完成后触发回调
    mTransactionReadyConsumer.accept(mTransaction);
    mFinished = true;
}
```

#### mWmsRequestSyncGroup ready

在 `performTraversals` 完成绘制后，标记 mWmsRequestSyncGroup ready，触发构造时注册的 `reportDrawFinished` 回调：

![WMS Request SyncGroup Ready 流程](/img/android/window_draw_state/07_request_sync_ready.svg)

```java
// ViewRootImpl.java
private void performTraversals() {
    // ...绘制完成后
    if (!cancelAndRedraw) {
        mReportNextDraw = false;
        mActiveSurfaceSyncGroup = null;
        mSyncBuffer = false;
        // 标记 request sync ready
        if (isInWMSRequestedSync()) {
            mWmsRequestSyncGroup.markSyncReady();
            mWmsRequestSyncGroup = null;
            mWmsRequestSyncGroupState = WMS_SYNC_NONE;
        }
    }
}
```

Sync ready 后触发构造方法中的 `transactionReadyConsumer` 回调：

```java
// SurfaceSyncGroup.java
public SurfaceSyncGroup(String name, Consumer<Transaction> transactionReadyConsumer) {
    mTransactionReadyConsumer = (transaction) -> {
        transactionReadyConsumer.accept(transaction);
        synchronized (mLock) {
            if (mSurfaceSyncGroupCompletedListener == null) {
                invokeSyncCompleteCallbacks();
            }
        }
    };
}
```

最终回到 `createSyncIfNeeded` 中注册的回调，调用 `reportDrawFinished` 通知 system_server 绘制完成。

### System server 进程

```java
// WindowManagerService.java
void finishDrawingWindow(Session session, IWindow client,
        @Nullable SurfaceControl.Transaction postDrawTransaction, int seqId) {
    if (postDrawTransaction != null) {
        postDrawTransaction.sanitize();
    }
    synchronized (mGlobalLock) {
        WindowState win = windowForClientLocked(session, client, false);
        if (win != null && win.finishDrawing(postDrawTransaction, seqId)) {
            if (win.hasWallpaper()) {
                win.getDisplayContent().pendingLayoutChanges |=
                        WindowManagerPolicy.FINISH_LAYOUT_REDO_WALLPAPER;
            }
            win.setDisplayLayoutNeeded();
            // 请求窗口布局刷新
            mWindowPlacerLocked.requestTraversal();
        }
    }
}
```

```java
// WindowState.java
boolean finishDrawing(SurfaceControl.Transaction postDrawTransaction, int syncSeqId) {
    final boolean hasSyncHandlers = executeDrawHandlers(postDrawTransaction, syncSeqId);
    boolean skipLayout = false;
    boolean layoutNeeded = false;

    // 异步旋转控制器优先处理
    final AsyncRotationController asyncRotationController =
            mDisplayContent.getAsyncRotationController();
    if (asyncRotationController != null
            && asyncRotationController.handleFinishDrawing(this, postDrawTransaction)) {
        postDrawTransaction = null;
        skipLayout = true;
    } else if (syncActive) {
        // 在 BLASTSyncEngine 中的窗口
        if (!syncStillPending) {
            layoutNeeded = onSyncFinishedDrawing();
        }
        if (postDrawTransaction != null) {
            mSyncTransaction.merge(postDrawTransaction);
            postDrawTransaction = null;
        }
    }

    // 调用 WindowStateAnimator 完成绘制状态转换
    layoutNeeded |= mWinAnimator.finishDrawingLocked(postDrawTransaction);
    return !skipLayout && (hasSyncHandlers || layoutNeeded);
}
```

`finishDrawingLocked` 将状态从 `DRAW_PENDING` 转为 `COMMIT_DRAW_PENDING`：

```java
// WindowStateAnimator.java
boolean finishDrawingLocked(SurfaceControl.Transaction postDrawTransaction) {
    boolean layoutNeeded = false;
    if (mDrawState == DRAW_PENDING) {
        mDrawState = COMMIT_DRAW_PENDING;
        layoutNeeded = true;
    }
    if (postDrawTransaction != null) {
        mWin.getSyncTransaction().merge(postDrawTransaction);
        layoutNeeded = true;
    }
    return layoutNeeded;
}
```

## READY_TO_SHOW — 提交窗口布局

`READY_TO_SHOW` 表示窗口的绘制已完成提交，等待实际显示。有两条路径可以到达此状态。

### 路径一：窗口大循环 mApplySurfaceChangesTransaction

这是最常见的路径。窗口布局流程从 `performSurfacePlacement` 开始，内部有一个最多循环 6 次的布局处理（因为不能保证一次完成布局）。

![READY_TO_SHOW 路径一时序](/img/android/window_draw_state/08_ready_to_show_sequence.svg)

```java
// WindowSurfacePlacer.java
final void performSurfacePlacement(boolean force) {
    if (mDeferDepth > 0 && !force) {
        mDeferredRequests++;
        return;
    }
    int loopCount = 6;
    do {
        mTraversalScheduled = false;
        performSurfacePlacementLoop();
        mService.mAnimationHandler.removeCallbacks(mPerformSurfacePlacement);
        loopCount--;
    } while (mTraversalScheduled && loopCount > 0);
}
```

`applySurfaceChangesTransaction` 是窗口大循环的核心方法，内部依次执行 `performLayout`（计算窗口大小）、`mApplyPostLayoutPolicy`（应用布局策略）、`mApplySurfaceChangesTransaction`（提交绘制状态、执行 `commitFinishDrawingLocked`）、`prepareSurfaces`（准备 Surface 显示，最终调用 `showRobustly`）：

![applySurfaceChangesTransaction 详细流程](/img/android/window_draw_state/12_apply_surface_changes.svg)

在布局过程中，`mApplySurfaceChangesTransaction` 遍历所有窗口，执行 `commitFinishDrawingLocked`：

```java
// DisplayContent.java
private final Consumer<WindowState> mApplySurfaceChangesTransaction = w -> {
    if (w.mHasSurface) {
        // 尝试提交绘制完成状态
        final boolean committed = w.mWinAnimator.commitFinishDrawingLocked();
        if (isDefaultDisplay && committed) {
            if (w.hasWallpaper()) {
                mWallpaperMayChange = true;
                pendingLayoutChanges |= FINISH_LAYOUT_REDO_WALLPAPER;
            }
        }
    }
};
```

`commitFinishDrawingLocked` 将状态从 `COMMIT_DRAW_PENDING` 转为 `READY_TO_SHOW`，并尝试直接调用 `performShowLocked`：

```java
// WindowStateAnimator.java
boolean commitFinishDrawingLocked() {
    if (mDrawState != COMMIT_DRAW_PENDING && mDrawState != READY_TO_SHOW) {
        return false;
    }
    mDrawState = READY_TO_SHOW;
    boolean result = false;
    final ActivityRecord activity = mWin.mActivityRecord;
    if (activity == null || activity.canShowWindows()
            || mWin.mAttrs.type == TYPE_APPLICATION_STARTING) {
        result = mWin.performShowLocked();
    }
    return result;
}
```

### 路径二：Transition.onTransactionReady

在 `BLASTSyncEngine.SyncGroup.finishNow()` 之后，`Transition.onTransactionReady` 会提交可见 Activity 的绘制状态。这条路径的目的是在动画开始时就让参与方可见：

```java
// Transition.java
@Override
public void onTransactionReady(int syncId, SurfaceControl.Transaction transaction) {
    // 提交可见 Activity 的可见性，以便 TaskInfo 可见
    commitVisibleActivities(transaction);
}

private void commitVisibleActivities(SurfaceControl.Transaction transaction) {
    for (int i = mParticipants.size() - 1; i >= 0; --i) {
        final ActivityRecord ar = mParticipants.valueAt(i).asActivityRecord();
        if (ar == null || ar.getTask() == null) continue;
        if (ar.isVisibleRequested()) {
            // 提交可见性
            ar.commitVisibility(true, false, true);
            // 让 ActivityRecord 及其子窗口尝试提交 finishDrawing
            ar.commitFinishDrawing(transaction);
        }
        ar.getTask().setDeferTaskAppear(false);
    }
}
```

```java
// ActivityRecord.java
void commitFinishDrawing(SurfaceControl.Transaction t) {
    boolean committed = false;
    for (int i = mChildren.size() - 1; i >= 0; i--) {
        committed |= mChildren.get(i).commitFinishDrawing(t);
    }
    if (committed) {
        requestUpdateWallpaperIfNeeded();
    }
}
```

```java
// WindowState.java
boolean commitFinishDrawing(SurfaceControl.Transaction t) {
    boolean committed = mWinAnimator.commitFinishDrawingLocked();
    if (committed) {
        // 提交成功后立即准备 Surface 显示
        mWinAnimator.prepareSurfaceLocked(t);
    }
    for (int i = mChildren.size() - 1; i >= 0; i--) {
        committed |= mChildren.get(i).commitFinishDrawing(t);
    }
    return committed;
}
```

## HAS_DRAWN — 窗口显示

`HAS_DRAWN` 表示窗口正在屏幕上显示。只有 `mDrawState` 切换到 `HAS_DRAWN` 后，后续才能通过 `showRobustly` 将 Surface layer 设为可见。

> **注意**：`HAS_DRAWN` 本身只是一个状态标记，并不代表窗口已经在屏幕上可见。后面还需要通过 `prepareSurfaceLocked` → `showRobustly` → `Transaction.apply` 才能真正提交给 SurfaceFlinger 合成上屏。

### performShowLocked 的触发路径

有两条主要路径会触发 `performShowLocked`：

**路径一：commitFinishDrawingLocked 直接调用**

在上一节的 `commitFinishDrawingLocked` 中，设置 `READY_TO_SHOW` 后会立即尝试调用 `performShowLocked`（条件是 `canShowWindows()` 为 true）。

**路径二：WindowAnimator Vsync 回调**

`WindowAnimator` 每次 Vsync 都会遍历所有 WindowState，检查处于 `READY_TO_SHOW` 状态的窗口并触发 `performShowLocked`：

```java
// WindowAnimator.java
WindowAnimator(final WindowManagerService service) {
    mAnimationFrameCallback = frameTimeNs -> {
        synchronized (mService.mGlobalLock) {
            mAnimationFrameCallbackScheduled = false;
            animate(frameTimeNs);
        }
    };
}

private void animate(long frameTimeNs) {
    final int numDisplays = root.getChildCount();
    for (int i = 0; i < numDisplays; i++) {
        final DisplayContent dc = root.getChildAt(i);
        dc.updateWindowsForAnimator();
        dc.prepareSurfaces();
    }
}
```

```java
// DisplayContent.java
private final Consumer<WindowState> mUpdateWindowsForAnimator = w -> {
    WindowStateAnimator winAnimator = w.mWinAnimator;
    final ActivityRecord activity = w.mActivityRecord;
    if (winAnimator.mDrawState == READY_TO_SHOW) {
        if (activity == null || activity.canShowWindows()) {
            if (w.performShowLocked()) {
                pendingLayoutChanges |= FINISH_LAYOUT_REDO_ANIM;
            }
        }
    }
};
```

### performShowLocked 实现

```java
// WindowState.java
boolean performShowLocked() {
    if (!showToCurrentUser()) {
        clearPolicyVisibilityFlag(VISIBLE_FOR_USER);
        return false;
    }

    final int drawState = mWinAnimator.mDrawState;
    if ((drawState == HAS_DRAWN || drawState == READY_TO_SHOW) && mActivityRecord != null) {
        if (mAttrs.type != TYPE_APPLICATION_STARTING) {
            // 非启动窗口：通知 ActivityRecord 移除 starting window
            mActivityRecord.onFirstWindowDrawn(this);
        } else {
            mActivityRecord.onStartingWindowDrawn();
        }
    }

    if (mWinAnimator.mDrawState != READY_TO_SHOW || !isReadyForDisplay()) {
        return false;
    }

    mWmService.enableScreenIfNeededLocked();
    // 加载窗口进入动画
    mWinAnimator.applyEnterAnimationLocked();

    // 设置状态为 HAS_DRAWN
    mWinAnimator.mLastAlpha = -1;
    mWinAnimator.mDrawState = HAS_DRAWN;
    mWmService.scheduleAnimationLocked();

    if (mHidden) {
        mHidden = false;
        final DisplayContent displayContent = getDisplayContent();
        // 递归执行子窗口的 performShowLocked
        for (int i = mChildren.size() - 1; i >= 0; --i) {
            final WindowState c = mChildren.get(i);
            if (c.mWinAnimator.mSurfaceController != null) {
                c.performShowLocked();
                if (displayContent != null) {
                    displayContent.setLayoutNeeded();
                }
            }
        }
    }
    return true;
}
```

### canShowWindows() 分析

`performShowLocked` 的触发条件中，`canShowWindows()` 起着关键的"守门"作用。在当前版本（Shell Transitions 启用的 Android V）中，该方法**始终返回 true**：

```java
// ActivityRecord.java
boolean canShowWindows() {
    // isShellTransitionsEnabled() 在 Android V 上始终为 true
    // ActivityRecord 的 mSyncState 不会是 SYNC_STATE_WAITING_FOR_DRAW
    return mTransitionController.isShellTransitionsEnabled()
            ? mSyncState != SYNC_STATE_WAITING_FOR_DRAW : allDrawn;
}
```

原因：`ActivityRecord` 没有 UI，其 `mSyncState` 不会被设置为 `SYNC_STATE_WAITING_FOR_DRAW`。在 `WindowContainer.prepareSync()` 中，`ActivityRecord`（没有覆盖 `prepareSync`）会直接设置为 `SYNC_STATE_READY`：

```java
// WindowContainer.java
boolean prepareSync() {
    if (mSyncState != SYNC_STATE_NONE) {
        return false;
    }
    for (int i = getChildCount() - 1; i >= 0; --i) {
        final WindowContainer child = getChildAt(i);
        child.prepareSync();
    }
    mSyncState = SYNC_STATE_READY;
    return true;
}
```

**ActivityRecord.mSyncState 的生命周期：**

`mSyncState` 是 `WindowContainer` 的字段。对于 `ActivityRecord`，其状态变化如下：

- **设置为 SYNC_STATE_READY**：`prepareSync()` 中，`ActivityRecord`（作为 WindowContainer 的子类）直接设为 `SYNC_STATE_READY`。在窗口大循环调用 `BLASTSyncEngine.SyncGroup.tryFinish()` 时，会检查每个参与者的 `isSyncFinished`，`ActivityRecord` 由于已是 READY 状态，会继续检查其子 WindowState。
- **设置为 SYNC_STATE_NONE**：两种场景——(1) parent 发生变化（`onSyncReparent`）；(2) `BLASTSyncEngine.SyncGroup.finishNow()` 时所有参与者已就绪，通过 `finishSync` 标记为 NONE。

```java
// BLASTSyncEngine.SyncGroup
private boolean tryFinish() {
    if (!mReady) return false;
    if (!mDependencies.isEmpty()) return false;
    for (int i = mRootMembers.size() - 1; i >= 0; --i) {
        final WindowContainer wc = mRootMembers.valueAt(i);
        if (!wc.isSyncFinished(this)) {
            return false;
        }
    }
    finishNow();
    return true;
}
```

```java
// WindowContainer.java
boolean isSyncFinished(BLASTSyncEngine.SyncGroup group) {
    if (!isVisibleRequested()) return true;
    if (mSyncState == SYNC_STATE_NONE && getSyncGroup() != null) {
        prepareSync();
    }
    if (mSyncState == SYNC_STATE_WAITING_FOR_DRAW) return false;
    // READY 状态：继续检查子窗口
    for (int i = mChildren.size() - 1; i >= 0; --i) {
        final WindowContainer child = mChildren.get(i);
        final boolean childFinished = group.isIgnoring(child) || child.isSyncFinished(group);
        if (childFinished && child.isVisibleRequested() && child.fillsParent()) {
            return true;
        }
        if (!childFinished) return false;
    }
    return true;
}
```

也就是说，`commitFinishDrawingLocked` 在设置 `READY_TO_SHOW` 后，通常会直接调用 `performShowLocked`，一步到位设置 `HAS_DRAWN`。

## showRobustly — Surface 上屏

`HAS_DRAWN` 状态仅代表窗口逻辑上已经"绘制完成可以显示"，但真正让 SurfaceFlinger 合成上屏，还需要通过 `prepareSurfaceLocked` 调用 `showRobustly` 设置 `Transaction.show`，最终 `Transaction.apply` 提交给 SurfaceFlinger。

### 触发入口

1. **commitFinishDrawing 返回 true 时**：直接调用 `prepareSurfaceLocked`
2. **WindowState 的 prepareSurfaces 方法**：在窗口大循环或动画回调中被调用

### prepareSurfaceLocked

```java
// WindowStateAnimator.java
void prepareSurfaceLocked(SurfaceControl.Transaction t) {
    final WindowState w = mWin;
    if (!hasSurface()) {
        if (w.getOrientationChanging() && w.isGoneForLayout()) {
            w.setOrientationChanging(false);
        }
        return;
    }

    computeShownFrameLocked();

    if (!w.isOnScreen()) {
        hide(t, "prepareSurfaceLocked");
    } else if (mLastAlpha != mShownAlpha || mLastHidden) {
        mLastAlpha = mShownAlpha;
        boolean prepared =
            mSurfaceController.prepareToShowInTransaction(t, mShownAlpha);

        if (prepared && mDrawState == HAS_DRAWN) {
            if (mLastHidden) {
                // 关键：调用 showRobustly 显示 Surface
                mSurfaceController.showRobustly(t);
                mLastHidden = false;
                final DisplayContent displayContent = w.getDisplayContent();
                if (!displayContent.getLastHasContent()) {
                    displayContent.pendingLayoutChanges |= FINISH_LAYOUT_REDO_ANIM;
                }
            }
        }
    }
}
```

### showRobustly

```java
// WindowSurfaceController.java
void showRobustly(SurfaceControl.Transaction t) {
    if (mSurfaceShown) {
        return;
    }
    setShown(true);
    t.show(mSurfaceControl);
}
```

`t.show(mSurfaceControl)` 将 Surface 设置为可见。但这只是记录在 Transaction 中，后续还需要 `Transaction.apply()` 才会真正提交到 SurfaceFlinger 进行合成上屏。