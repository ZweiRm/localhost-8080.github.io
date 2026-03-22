---
prev:
    text: '窗口层级管理'
    link: '/framework/wms-window-hierarchy'
next:
    text: '窗口绘制状态'
    link: '/framework/window-draw-state'
---

# WMS 窗口布局流程 relayoutWindow

窗口添加到 WindowManagerService（WMS）之后，应用进程通过 `ViewRootImpl` 发起布局请求，最终触发服务端完成窗口尺寸计算、Surface 状态变更与显示。本文从客户端的 `requestLayout` 调用出发，沿 Binder 通道进入服务端 `relayoutWindow`，完整梳理窗口布局的执行路径。

## 一、客户端流程

### 1.1 ViewRootImpl 与 WMS 的通信

窗口添加流程的起点是 `ViewRootImpl.setView()`。该方法是客户端与 WMS 通信以添加窗口的入口，核心做两件事：

1. 调用 `requestLayout()`，触发后续的 `performTraversals()` → `relayoutWindow()` → `reportDrawFinished()` 流程，通过 Session 与服务端通信。
2. 调用 `mWindowSession.addToDisplayAsUser()`，通过 Binder 调用 Session 的 `addToDisplayAsUser` 方法完成窗口添加。

**窗口添加时序：**

![窗口添加时序图](/img/android/relayoutWindow/01_window_add_sequence.svg)

代码路径：`frameworks/base/core/java/android/view/ViewRootImpl.java`

```java
public void setView(View view, WindowManager.LayoutParams attrs, View panelParentView,
        int userId) {
    synchronized (this) {
        if (mView == null) {
            mView = view;
            ......
            // 将布局参数拷贝至 mWindowAttributes
            mWindowAttributes.copyFrom(attrs);
            if (mWindowAttributes.packageName == null) {
                mWindowAttributes.packageName = mBasePackageName;
            }

            attrs = mWindowAttributes;
            ......
            // 获取当前布局的 flags
            mClientWindowLayoutFlags = attrs.flags;
            ......

            // 请求布局，对应服务端 relayoutWindow 流程
            requestLayout();

            ......
            try {
                // 与服务端进行 Binder 通信，调用 Session 的 addToDisplayAsUser 方法
                res = mWindowSession.addToDisplayAsUser(mWindow, mWindowAttributes,
                        getHostVisibility(), mDisplay.getDisplayId(), userId,
                        mInsetsController.getRequestedVisibleTypes(), inputChannel,
                        mTempInsets, mTempControls, attachedFrame, compatScale);
                ......
            } catch (RemoteException e) {
                ......
            }

            ......
            if (res < WindowManagerGlobal.ADD_OKAY) {
                // 处理各种添加窗口失败的错误码
                switch (res) {
                    case WindowManagerGlobal.ADD_BAD_APP_TOKEN:
                    case WindowManagerGlobal.ADD_BAD_SUBWINDOW_TOKEN:
                        throw new WindowManager.BadTokenException(
                                "Unable to add window -- token " + attrs.token
                                + " is not valid; is your activity running?");
                    case WindowManagerGlobal.ADD_NOT_APP_TOKEN:
                        throw new WindowManager.BadTokenException(
                                "Unable to add window -- token " + attrs.token
                                + " is not for an application");
                    case WindowManagerGlobal.ADD_APP_EXITING:
                        throw new WindowManager.BadTokenException(
                                "Unable to add window -- app for token " + attrs.token
                                + " is exiting");
                    case WindowManagerGlobal.ADD_DUPLICATE_ADD:
                        throw new WindowManager.BadTokenException(
                                "Unable to add window -- window " + mWindow
                                + " has already been added");
                    case WindowManagerGlobal.ADD_STARTING_NOT_NEEDED:
                        return;
                    case WindowManagerGlobal.ADD_MULTIPLE_SINGLETON:
                        throw new WindowManager.BadTokenException(
                                "Unable to add window " + mWindow
                                + " -- another window of type "
                                + mWindowAttributes.type + " already exists");
                    case WindowManagerGlobal.ADD_PERMISSION_DENIED:
                        throw new WindowManager.BadTokenException(
                                "Unable to add window " + mWindow
                                + " -- permission denied for window type "
                                + mWindowAttributes.type);
                    case WindowManagerGlobal.ADD_INVALID_DISPLAY:
                        throw new WindowManager.InvalidDisplayException(
                                "Unable to add window " + mWindow
                                + " -- the specified display can not be found");
                    case WindowManagerGlobal.ADD_INVALID_TYPE:
                        throw new WindowManager.InvalidDisplayException(
                                "Unable to add window " + mWindow
                                + " -- the specified window type "
                                + mWindowAttributes.type + " is not valid");
                }
                throw new RuntimeException(
                        "Unable to add window -- unknown error code " + res);
            }
            ......
        }
    }
}
```

### 1.2 requestLayout 触发视图遍历

`requestLayout` 的本质是请求一次 `scheduleTraversals` 视图树遍历，然后触发 `performTraversals`。

**客户端流程：**

![客户端流程图](/img/android/relayoutWindow/02_client_flow.svg)

代码路径：`frameworks/base/core/java/android/view/ViewRootImpl.java`

```java
@Override
public void requestLayout() {
    if (!mHandlingLayoutInLayoutRequest) {
        checkThread();
        // 将 mLayoutRequested 标志设置为 true
        mLayoutRequested = true;
        scheduleTraversals();
    }
}
```

`scheduleTraversals()` 通过 Choreographer 在下一个 VSYNC 信号到来时回调 `mTraversalRunnable`：

```java
void scheduleTraversals() {
    if (!mTraversalScheduled) {
        mTraversalScheduled = true;
        mTraversalBarrier = mHandler.getLooper().getQueue().postSyncBarrier();
        mChoreographer.postCallback(
                Choreographer.CALLBACK_TRAVERSAL, mTraversalRunnable, null);
        notifyRendererOfFramePending();
        pokeDrawLockIfNeeded();
    }
}
```

`TraversalRunnable` 执行 `doTraversal()`，最终调用 `performTraversals()`：

```java
final class TraversalRunnable implements Runnable {
    @Override
    public void run() {
        doTraversal();
    }
}

void doTraversal() {
    if (mTraversalScheduled) {
        mTraversalScheduled = false;
        mHandler.getLooper().getQueue().removeSyncBarrier(mTraversalBarrier);
        // 调用 performTraversals
        performTraversals();
    }
}
```

`performTraversals()` 是 View 树三大流程（measure、layout、draw）的起点。在其中会调用 `relayoutWindow()` 与服务端通信：

```java
private void performTraversals() {
    ......
    relayoutResult = relayoutWindow(params, viewVisibility, insetsPending);
    ......
    // 比较各类 Insets 变化
    final boolean contentInsetsChanged = !mPendingContentInsets.equals(
            mAttachInfo.mContentInsets);
    if (contentInsetsChanged) {
        mAttachInfo.mContentInsets.set(mPendingContentInsets);
    }
    ......
    // 更新窗口宽高
    if (mWidth != frame.width() || mHeight != frame.height()) {
        mWidth = frame.width();
        mHeight = frame.height();
    }
}
```

### 1.3 relayoutWindow 客户端调用

`relayoutWindow()` 方法通过 `Session` 与服务端进行 Binder 通信，发起窗口重新布局请求：

```java
private int relayoutWindow(WindowManager.LayoutParams params, int viewVisibility,
        boolean insetsPending) throws RemoteException {

    final int requestedWidth = (int) (measuredWidth * appScale + 0.5f);
    final int requestedHeight = (int) (measuredHeight * appScale + 0.5f);
    int relayoutResult = 0;
    mRelayoutSeq++;

    if (relayoutAsync) {
        mWindowSession.relayoutAsync(mWindow, params,
                requestedWidth, requestedHeight, viewVisibility,
                insetsPending ? WindowManagerGlobal.RELAYOUT_INSETS_PENDING : 0,
                mRelayoutSeq, mLastSyncSeqId);
    } else {
        // 通过 Session 与服务端通信，调用 relayout
        relayoutResult = mWindowSession.relayout(mWindow, params,
                requestedWidth, requestedHeight, viewVisibility,
                insetsPending ? WindowManagerGlobal.RELAYOUT_INSETS_PENDING : 0,
                mRelayoutSeq, mLastSyncSeqId, mTmpFrames, mPendingMergedConfiguration,
                mSurfaceControl, mTempInsets, mTempControls, mRelayoutBundle);
        mRelayoutRequested = true;
    }
    return relayoutResult;
}
```

至此，客户端流程结束，后面进入服务端流程。

## 二、服务端流程

**服务端流程：**

![服务端流程图](/img/android/relayoutWindow/03_server_flow.svg)

### 2.1 WMS.relayoutWindow 入口

在 `WMS.relayoutWindow` 中主要做了以下事情：

1. 根据客户端传过来的 `IWindow` 从 `mWindowMap` 获取窗口添加阶段创建的 `WindowState`。
2. 设置 `DisplayContent.mLayoutNeeded` 以及 `shouldRelayout` 标志位。
3. Surface 的创建流程。
4. 窗口尺寸的计算以及 Surface 的状态变更。

代码路径：`frameworks/base/services/core/java/com/android/server/wm/WindowManagerService.java`

```java
public int relayoutWindow(Session session, IWindow client, LayoutParams attrs,
        int requestedWidth, int requestedHeight, int viewVisibility, int flags,
        ClientWindowFrames outFrames, MergedConfiguration mergedConfiguration,
        SurfaceControl outSurfaceControl, InsetsState outInsetsState,
        InsetsSourceControl[] outActiveControls, Bundle outSyncIdBundle) {
    ......
    synchronized (mGlobalLock) {
        // 1. 根据客户端传过来的 IWindow 从 mWindowMap 中获取对应的 WindowState
        final WindowState win = windowForClientLocked(session, client, false);
        if (win == null) {
            return 0;
        }
        // 获取 DisplayContent、DisplayPolicy 以及 WindowStateAnimator
        final DisplayContent displayContent = win.getDisplayContent();
        final DisplayPolicy displayPolicy = displayContent.getDisplayPolicy();
        WindowStateAnimator winAnimator = win.mWinAnimator;

        if (viewVisibility != View.GONE) {
            // 根据客户端请求的窗口大小设置 requestedWidth, requestedHeight
            // 并设置 WindowState.mLayoutNeeded 为 true
            win.setRequestedSize(requestedWidth, requestedHeight);
        }
        ......
        // 根据请求的宽度和高度设置窗口缩放比例
        win.setWindowScale(win.mRequestedWidth, win.mRequestedHeight);
        ......
        // 标记 relayout 已调用
        win.mRelayoutCalled = true;
        win.mInRelayout = true;
        // 将当前窗口的可见性由 INVISIBLE 调整为 VISIBLE
        win.setViewVisibility(viewVisibility);

        // 2.1 将 DisplayContent 中的布局标志位 mLayoutNeeded 置为 true
        win.setDisplayLayoutNeeded();
        win.mGivenInsetsPending =
                (flags & WindowManagerGlobal.RELAYOUT_INSETS_PENDING) != 0;

        // 2.2 判断是否允许 relayout
        // 条件：View 可见且（ActivityRecord 不为空，或布局类型为 TYPE_APPLICATION_STARTING，
        //       或窗口已告知客户端可以显示）
        final boolean shouldRelayout = viewVisibility == View.VISIBLE &&
                (win.mActivityRecord == null
                        || win.mAttrs.type == TYPE_APPLICATION_STARTING
                        || win.mActivityRecord.isClientVisible());
        ......
        // 3. Surface 的创建流程
        if (shouldRelayout) {
            try {
                result = createSurfaceControl(outSurfaceControl, result, win, winAnimator);
            } catch (Exception e) {
                return 0;
            }
        }

        // 4. 窗口尺寸的计算以及 Surface 的状态变更
        // WindowSurfacePlacer 在 WMS 初始化时创建
        mWindowPlacerLocked.performSurfacePlacement(true /* force */);
        ......
        // 填充计算好的 frame 返回给客户端，更新 mergedConfiguration 对象
        win.fillClientWindowFramesAndConfiguration(outFrames, mergedConfiguration,
                false /* useLatestConfig */, shouldRelayout);
        win.onResizeHandled();
        ......
    }
    Binder.restoreCallingIdentity(origId);
    return result;
}
```

### 2.2 窗口布局循环

`performSurfacePlacement` 是确定所有窗口的 Surface 如何摆放、如何显示、显示在什么位置和区域大小的入口方法。该方法设置了布局的循环条件：当 `mTraversalScheduled` 标志位为 `true` 且 `loopCount` 大于 0 时，继续调用 `performSurfacePlacementLoop` 执行布局操作。

代码路径：`frameworks/base/services/core/java/com/android/server/wm/WindowSurfacePlacer.java`

```java
final void performSurfacePlacement(boolean force) {
    if (mDeferDepth > 0 && !force) {
        mDeferredRequests++;
        return;
    }
    // 将循环的最大次数设置为 6 次
    int loopCount = 6;
    do {
        mTraversalScheduled = false;
        // 执行窗口布局操作
        performSurfacePlacementLoop();
        mService.mAnimationHandler.removeCallbacks(mPerformSurfacePlacement);
        loopCount--;
    // 只有当 mTraversalScheduled 为 true 且循环次数大于 0 时，才会再次循环执行布局
    } while (mTraversalScheduled && loopCount > 0);
    mService.mRoot.mWallpaperActionPending = false;
}
```

`performSurfacePlacementLoop` 主要做两件事：

1. 调用 `RootWindowContainer` 对所有窗口执行布局操作。
2. 处理是否再次布局的逻辑。如果 `DisplayContent.mLayoutNeeded` 为 `true` 且布局循环次数小于 6 次，则将 `mTraversalScheduled` 置为 `true`，使 `performSurfacePlacement` 中再次调用 `performSurfacePlacementLoop`。

```java
private void performSurfacePlacementLoop() {
    // 若当前已在布局操作中，则直接返回
    if (mInLayout) {
        return;
    }
    mInLayout = true;
    ......
    try {
        // 1. 调用 RootWindowContainer 的 performSurfacePlacement() 方法
        mService.mRoot.performSurfacePlacement();

        mInLayout = false;

        if (mService.mRoot.isLayoutNeeded()) {
            // 2. 若需要布局且布局次数小于 6 次，则再次请求布局
            if (++mLayoutRepeatCount < 6) {
                // 将 mTraversalScheduled 标志位设置为 true
                requestTraversal();
            } else {
                Slog.e(TAG, "Performed 6 layouts in a row. Skipping");
                mLayoutRepeatCount = 0;
            }
        } else {
            mLayoutRepeatCount = 0;
        }
    } catch (RuntimeException e) {
        mInLayout = false;
    }
}
```

### 2.3 Surface 状态变更与窗口尺寸计算

`RootWindowContainer.performSurfacePlacement()` 调用 `performSurfacePlacementNoTrace()` 方法执行实际的布局处理，主要流程：

1. 如果有焦点变化，更新焦点。
2. 执行窗口尺寸计算、Surface 状态变更等操作。
3. 将 Surface 状态变更为 `HAS_DRAWN`，触发 App 过渡动画。
4. 再次处理焦点变化。
5. 如果过程中有 size 或位置变化，则通知客户端重新 relayout。
6. 销毁不可见的窗口。

代码路径：`frameworks/base/services/core/java/com/android/server/wm/RootWindowContainer.java`

```java
void performSurfacePlacement() {
    Trace.traceBegin(TRACE_TAG_WINDOW_MANAGER, "performSurfacePlacement");
    try {
        performSurfacePlacementNoTrace();
    } finally {
        Trace.traceEnd(TRACE_TAG_WINDOW_MANAGER);
    }
}
```

```java
void performSurfacePlacementNoTrace() {
    ......
    // 1. 如果有焦点变化，更新焦点
    if (mWmService.mFocusMayChange) {
        mWmService.mFocusMayChange = false;
        mWmService.updateFocusedWindowLocked(
                UPDATE_FOCUS_WILL_PLACE_SURFACES, false /* updateInputWindows */);
    }
    ......

    // 开启事务
    mWmService.openSurfaceTransaction();
    try {
        // 2. 执行窗口尺寸计算，Surface 状态变更等操作
        applySurfaceChangesTransaction();
    } catch (RuntimeException e) {
        Slog.wtf(TAG, "Unhandled exception in Window Manager", e);
    } finally {
        // 关闭事务，提交
        mWmService.closeSurfaceTransaction("performLayoutAndPlaceSurfaces");
    }
    ......
    // 3. 将 Surface 状态变更为 HAS_DRAWN，触发 App 过渡动画
    checkAppTransitionReady(surfacePlacer);
    ......
    // 4. 遍历所有 DisplayContent，更新壁纸
    for (int displayNdx = 0; displayNdx < mChildren.size(); ++displayNdx) {
        final DisplayContent displayContent = mChildren.get(displayNdx);
        if (displayContent.mWallpaperMayChange) {
            displayContent.pendingLayoutChanges |= FINISH_LAYOUT_REDO_WALLPAPER;
        }
    }
    // 5. 再次处理焦点变化
    if (mWmService.mFocusMayChange) {
        mWmService.mFocusMayChange = false;
        mWmService.updateFocusedWindowLocked(UPDATE_FOCUS_PLACING_SURFACES,
                false /* updateInputWindows */);
    }
    ......
    // 6. 如果过程中 size 或位置变化，则通知客户端重新 relayout
    handleResizingWindows();
    ......
    // 7. 销毁不可见的窗口
    i = mWmService.mDestroySurface.size();
    if (i > 0) {
        do {
            i--;
            WindowState win = mWmService.mDestroySurface.get(i);
            win.mDestroying = false;
            final DisplayContent displayContent = win.getDisplayContent();
            if (displayContent.mInputMethodWindow == win) {
                displayContent.setInputMethodWindowLocked(null);
            }
            if (displayContent.mWallpaperController.isWallpaperTarget(win)) {
                displayContent.pendingLayoutChanges |= FINISH_LAYOUT_REDO_WALLPAPER;
            }
            win.destroySurfaceUnchecked();
        } while (i > 0);
        mWmService.mDestroySurface.clear();
    }
    ......
}
```

`applySurfaceChangesTransaction()` 在 `RootWindowContainer` 中的实现主要执行：

1. 水印、StrictMode 警告框以及模拟器显示的布局。
2. 遍历所有 `DisplayContent` 执行其 `applySurfaceChangesTransaction`。

```java
private void applySurfaceChangesTransaction() {
    mHoldScreenWindow = null;
    mObscuringWindow = null;

    // 1. 水印、StrictMode 警告框以及模拟器显示的布局
    final DisplayContent defaultDc = mWmService.getDefaultDisplayContentLocked();
    final DisplayInfo defaultInfo = defaultDc.getDisplayInfo();
    final int defaultDw = defaultInfo.logicalWidth;
    final int defaultDh = defaultInfo.logicalHeight;

    if (mWmService.mWatermark != null) {
        mWmService.mWatermark.positionSurface(defaultDw, defaultDh, mDisplayTransaction);
    }
    if (mWmService.mStrictModeFlash != null) {
        mWmService.mStrictModeFlash.positionSurface(defaultDw, defaultDh,
                mDisplayTransaction);
    }
    if (mWmService.mEmulatorDisplayOverlay != null) {
        mWmService.mEmulatorDisplayOverlay.positionSurface(defaultDw, defaultDh,
                mWmService.getDefaultDisplayRotation(), mDisplayTransaction);
    }

    // 2. 遍历 RootWindowContainer 下所有 DisplayContent
    final int count = mChildren.size();
    for (int j = 0; j < count; ++j) {
        final DisplayContent dc = mChildren.get(j);
        dc.applySurfaceChangesTransaction();
    }

    mWmService.mDisplayManagerInternal.performTraversal(mDisplayTransaction);
    SurfaceControl.mergeToGlobalTransaction(mDisplayTransaction);
}
```

接下来继续跟踪 `DisplayContent.applySurfaceChangesTransaction()`。该方法主要：

1. 遍历所有窗口，计算窗口的布局大小。
2. Surface 的状态更改。
3. 处理 Surface 的位置、大小以及显示等。

代码路径：`frameworks/base/services/core/java/com/android/server/wm/DisplayContent.java`

```java
void applySurfaceChangesTransaction() {
    final WindowSurfacePlacer surfacePlacer = mWmService.mWindowPlacerLocked;
    ......
    // 1. 执行布局，该方法最终会调用 performLayoutNoTrace，计算窗口的布局参数
    performLayout(true /* initial */, false /* updateInputWindows */);
    ......
    try {
        // 用于初始化检查所需的状态变量
        mDisplayPolicy.beginPostLayoutPolicyLw();
        // 循环遍历进行参数的设置
        forAllWindows(mApplyPostLayoutPolicy, true /* traverseTopToBottom */);
        // 调整可见性
        mDisplayPolicy.finishPostLayoutPolicyLw();
    } finally {
        Trace.traceEnd(TRACE_TAG_WINDOW_MANAGER);
    }

    try {
        // 2. 遍历所有窗口，主要是改变 Surface 的状态
        forAllWindows(mApplySurfaceChangesTransaction, true /* traverseTopToBottom */);
    } finally {
        Trace.traceEnd(TRACE_TAG_WINDOW_MANAGER);
    }
    // 3. 处理各个 Surface 的位置、大小以及是否要在屏幕上显示等
    prepareSurfaces();
    ......
}
```

### 2.4 计算窗口位置大小

继续跟踪 `performLayout()`。该方法主要调用 `performLayoutNoTrace()`，首先判断布局标志位 `mLayoutNeeded`（该标志位在 `WMS.relayoutWindow` 中被置为 `true`），`false` 则直接返回不进行布局操作。`true` 则分别遍历父窗口和子窗口进行布局。

代码路径：`frameworks/base/services/core/java/com/android/server/wm/DisplayContent.java`

```java
void performLayout(boolean initial, boolean updateInputWindows) {
    Trace.traceBegin(TRACE_TAG_WINDOW_MANAGER, "performLayout");
    try {
        performLayoutNoTrace(initial, updateInputWindows);
    } finally {
        Trace.traceEnd(TRACE_TAG_WINDOW_MANAGER);
    }
}
```

```java
private void performLayoutNoTrace(boolean initial, boolean updateInputWindows) {
    // 1. 判断是否需要布局，不需要则直接返回
    if (!isLayoutNeeded()) {
        return;
    }
    // 将 DisplayContent.mLayoutNeeded 属性置为 false
    clearLayoutNeeded();
    ......
    // 2. 对所有顶级窗口进行布局，最终回调 mPerformLayout
    forAllWindows(mPerformLayout, true /* traverseTopToBottom */);

    // 3. 处理子窗口的布局，最终回调 mPerformLayoutAttached
    forAllWindows(mPerformLayoutAttached, true /* traverseTopToBottom */);
    ......
}
```

**遍历顶级窗口：** 当遍历到 `DisplayContent` 下的每个窗口时都会执行 `mPerformLayout`，该方法将 `WindowState.mLayoutNeeded` 标志位置 `false`，并将具体的布局操作交给 `DisplayPolicy` 处理：

```java
private final Consumer<WindowState> mPerformLayout = w -> {
    // 如果当前窗口为子窗口则直接返回
    if (w.mLayoutAttached) {
        return;
    }

    // 判断当前窗口是否会不可见
    final boolean gone = w.isGoneForLayout();

    if (!gone || !w.mHaveFrame || w.mLayoutNeeded) {
        if (mTmpInitial) {
            w.resetContentChanged();
        }
        w.mSurfacePlacementNeeded = true;
        // 将 WindowState.mLayoutNeeded 标志位置为 false
        w.mLayoutNeeded = false;
        // 判断当前窗口是否是第一次布局
        final boolean firstLayout = !w.isLaidOut();
        // 调用 DisplayPolicy.layoutWindowLw 进行布局
        getDisplayPolicy().layoutWindowLw(w, null, mDisplayFrames);
        w.mLayoutSeq = mLayoutSeq;

        if (firstLayout) {
            if (!w.getFrame().isEmpty()) {
                w.updateLastFrames();
            }
            w.onResizeHandled();
        }
    }
};
```

**遍历子窗口：**

```java
private final Consumer<WindowState> mPerformLayoutAttached = w -> {
    // 如果当前窗口不是子窗口则直接返回
    if (!w.mLayoutAttached) {
        return;
    }

    if ((w.mViewVisibility != GONE && w.mRelayoutCalled) || !w.mHaveFrame
            || w.mLayoutNeeded) {
        if (mTmpInitial) {
            w.resetContentChanged();
        }
        w.mSurfacePlacementNeeded = true;
        w.mLayoutNeeded = false;
        // 调用 DisplayPolicy.layoutWindowLw 进行布局，传入父窗口
        getDisplayPolicy().layoutWindowLw(w, w.getParentWindow(), mDisplayFrames);
        w.mLayoutSeq = mLayoutSeq;
    }
};
```

`layoutWindowLw` 主要做以下三件事：

1. 获取 `DisplayFrames`：`DisplayContent` 新建时创建，内部数据由屏幕提供。
2. 调用 `WindowLayout.computeFrames` 计算窗口布局大小。
3. 调用 `WindowState.setFrames` 将计算的布局参数赋值给当前窗口的 `windowFrames`。

代码路径：`frameworks/base/services/core/java/com/android/server/wm/DisplayPolicy.java`

```java
public void layoutWindowLw(WindowState win, WindowState attached,
        DisplayFrames displayFrames) {
    if (win.skipLayout()) {
        return;
    }

    // 1. 获取 DisplayFrames
    displayFrames = win.getDisplayFrames(displayFrames);
    final WindowManager.LayoutParams attrs =
            win.getLayoutingAttrs(displayFrames.mRotation);
    final Rect attachedWindowFrame = attached != null ? attached.getFrame() : null;

    final boolean trustedSize = attrs == win.mAttrs;
    final int requestedWidth = trustedSize ? win.mRequestedWidth : UNSPECIFIED_LENGTH;
    final int requestedHeight = trustedSize ? win.mRequestedHeight : UNSPECIFIED_LENGTH;

    // 2. 调用 WindowLayout.computeFrames 计算窗口布局大小
    mWindowLayout.computeFrames(attrs, win.getInsetsState(),
            displayFrames.mDisplayCutoutSafe, win.getBounds(), win.getWindowingMode(),
            requestedWidth, requestedHeight, win.getRequestedVisibilities(),
            attachedWindowFrame, win.mGlobalScale, sTmpClientFrames);

    // 3. 将计算的布局参数赋值给 windowFrames
    win.setFrames(sTmpClientFrames, win.mRequestedWidth, win.mRequestedHeight);
}
```

`computeFrames` 的计算逻辑较长，主要根据系统的 Inset 情况（如状态栏 StatusBar、导航栏 NavigationBar 等）来给应用窗口一个合适的 frame。

### 2.5 WindowState 策略应用（Post Layout Policy）

回到 `DisplayContent.applySurfaceChangesTransaction()` 方法，主要关注以下三个方法：

1. `beginPostLayoutPolicyLw` —— 参数初始化
2. `applyPostLayoutPolicyLw` —— 参数设置
3. `finishPostLayoutPolicyLw` —— 调整可见性

#### 2.5.1 beginPostLayoutPolicyLw

用于初始化检查所需的状态变量：

代码路径：`frameworks/base/services/core/java/com/android/server/wm/DisplayPolicy.java`

```java
public void beginPostLayoutPolicyLw() {
    mLeftGestureHost = null;
    mTopGestureHost = null;
    mRightGestureHost = null;
    mBottomGestureHost = null;
    mTopFullscreenOpaqueWindowState = null;
    mNavBarColorWindowCandidate = null;
    mNavBarBackgroundWindow = null;
    mStatusBarAppearanceRegionList.clear();
    mLetterboxDetails.clear();
    mStatusBarBackgroundWindows.clear();
    mStatusBarColorCheckedBounds.setEmpty();
    mStatusBarBackgroundCheckedBounds.setEmpty();
    mSystemBarColorApps.clear();
    mAllowLockscreenWhenOn = false;
    mShowingDream = false;
    mIsFreeformWindowOverlappingWithNavBar = false;
}
```

#### 2.5.2 applyPostLayoutPolicyLw

用于记录可能影响系统窗口或锁屏界面可见性的窗口。遍历到每个窗口时回调：

```java
private final Consumer<WindowState> mApplyPostLayoutPolicy =
        w -> getDisplayPolicy().applyPostLayoutPolicyLw(w, w.mAttrs, w.getParentWindow(),
                mImeLayeringTarget);
```

代码路径：`frameworks/base/services/core/java/com/android/server/wm/DisplayPolicy.java`

```java
public void applyPostLayoutPolicyLw(WindowState win, WindowManager.LayoutParams attrs,
        WindowState attached, WindowState imeTarget) {
    if (attrs.type == TYPE_NAVIGATION_BAR) {
        // 更新导航栏位置
        final DisplayFrames displayFrames = mDisplayContent.mDisplayFrames;
        mNavigationBarPosition = navigationBarPosition(displayFrames.mRotation);
    }
    final boolean affectsSystemUi = win.canAffectSystemUiFlags();

    // 应用锁屏策略
    applyKeyguardPolicy(win, imeTarget);

    // 检查 freeform 窗口是否与导航栏区域重叠
    if (!mIsFreeformWindowOverlappingWithNavBar && win.inFreeformWindowingMode()
            && win.mActivityRecord != null && isOverlappingWithNavBar(win)) {
        mIsFreeformWindowOverlappingWithNavBar = true;
    }

    // 四边手势区域处理
    if (win.hasInsetsSourceProvider()) {
        final SparseArray<InsetsSourceProvider> providers = win.getInsetsSourceProviders();
        final Rect bounds = win.getBounds();
        for (int index = providers.size() - 1; index >= 0; index--) {
            final InsetsSourceProvider provider = providers.valueAt(index);
            final InsetsSource source = provider.getSource();
            if ((source.getType()
                    & (Type.systemGestures() | Type.mandatorySystemGestures())) == 0) {
                continue;
            }
            final Insets insets = source.calculateInsets(
                    bounds, false /* ignoreVisibility */);
            if (mLeftGestureHost == null && insets.left > 0) mLeftGestureHost = win;
            if (mTopGestureHost == null && insets.top > 0) mTopGestureHost = win;
            if (mRightGestureHost == null && insets.right > 0) mRightGestureHost = win;
            if (mBottomGestureHost == null && insets.bottom > 0) mBottomGestureHost = win;
        }
    }

    if (!affectsSystemUi) {
        return;
    }

    // 记录顶部全屏不透明窗口（用于确定系统 UI 控制窗口）
    if (mTopFullscreenOpaqueWindowState == null) {
        mTopFullscreenOpaqueWindowState = win;
    }

    // 缓存与状态栏重叠的窗口（确定状态栏外观）
    if (mStatusBar != null
            && sTmpRect.setIntersect(win.getFrame(), mStatusBar.getFrame())
            && !mStatusBarBackgroundCheckedBounds.contains(sTmpRect)) {
        mStatusBarBackgroundWindows.add(win);
        mStatusBarBackgroundCheckedBounds.union(sTmpRect);
        if (!mStatusBarColorCheckedBounds.contains(sTmpRect)) {
            mStatusBarAppearanceRegionList.add(new AppearanceRegion(
                    win.mAttrs.insetsFlags.appearance & APPEARANCE_LIGHT_STATUS_BARS,
                    new Rect(win.getFrame())));
            mStatusBarColorCheckedBounds.union(sTmpRect);
            addSystemBarColorApp(win);
        }
    }

    // 缓存与导航栏区域重叠的窗口（确定导航栏不透明度和外观）
    if (isOverlappingWithNavBar(win)) {
        if (mNavBarColorWindowCandidate == null) {
            mNavBarColorWindowCandidate = win;
            addSystemBarColorApp(win);
        }
        if (mNavBarBackgroundWindow == null) {
            mNavBarBackgroundWindow = win;
        }
    }
    ......
}
```

该方法中还会调用 `applyKeyguardPolicy` 方法，根据当前是否锁屏以及 `WindowState` 是否能在锁屏上显示，对 `WindowState` 设置相应的可见标记：

```java
private void applyKeyguardPolicy(WindowState win, WindowState imeTarget) {
    if (win.canBeHiddenByKeyguard()) {
        final boolean shouldBeHiddenByKeyguard =
                shouldBeHiddenByKeyguard(win, imeTarget);
        if (win.mIsImWindow) {
            // 通知 IME Insets Provider 冻结 IME Insets
            mDisplayContent.getInsetsStateController().getImeSourceProvider()
                    .setFrozen(shouldBeHiddenByKeyguard);
        }
        if (shouldBeHiddenByKeyguard) {
            win.hide(false /* doAnimation */, true /* requestAnim */);
        } else {
            win.show(false /* doAnimation */, true /* requestAnim */);
        }
    }
}
```

**canBeHiddenByKeyguard** 判断窗口是否能被锁屏隐藏：

```java
boolean canBeHiddenByKeyguard() {
    // Activity 类型的 WindowState 可见性取决于 Activity 可见性，不会被 Keyguard 覆盖
    if (mActivityRecord != null) {
        return false;
    }
    // 以下四种窗口也不会被隐藏：通知栏、状态栏、导航栏和壁纸
    switch (mAttrs.type) {
        case TYPE_NOTIFICATION_SHADE:
        case TYPE_STATUS_BAR:
        case TYPE_NAVIGATION_BAR:
        case TYPE_WALLPAPER:
            return false;
        default:
            // 判断当前窗口层级是否小于 TYPE_NOTIFICATION_SHADE
            return mPolicy.getWindowLayerLw(this)
                    < mPolicy.getWindowLayerFromTypeLw(TYPE_NOTIFICATION_SHADE);
    }
}
```

**shouldBeHiddenByKeyguard** 判断窗口是否应该被锁屏隐藏：

```java
private boolean shouldBeHiddenByKeyguard(WindowState win, WindowState imeTarget) {
    // 如果当前窗口为 IME 窗口且处于 AOD 状态，则隐藏
    final boolean hideIme = win.mIsImWindow
            && (mDisplayContent.isAodShowing()
                    || (mDisplayContent.isDefaultDisplay && !mWindowManagerDrawComplete));
    if (hideIme) {
        return true;
    }
    // 如果不是默认显示或不在锁屏时，不隐藏
    if (!mDisplayContent.isDefaultDisplay || !isKeyguardShowing()) {
        return false;
    }
    // 如果 IME Target 窗口可见且能在锁屏上显示，则显示 IME
    final boolean showImeOverKeyguard = imeTarget != null && imeTarget.isVisible()
            && win.mIsImWindow && (imeTarget.canShowWhenLocked()
                    || !imeTarget.canBeHiddenByKeyguard());
    if (showImeOverKeyguard) {
        return false;
    }
    // 如果锁屏被遮挡，则显示 SHOW_WHEN_LOCKED 窗口
    final boolean allowShowWhenLocked = isKeyguardOccluded()
            && (win.canShowWhenLocked()
                    || (win.mAttrs.privateFlags & LayoutParams.PRIVATE_FLAG_SYSTEM_ERROR) != 0);
    return !allowShowWhenLocked;
}
```

**hide / show 方法：**

`WindowState.hide()` 方法清除窗口可见性标志：

```java
boolean hide(boolean doAnimation, boolean requestAnim) {
    ......
    mLegacyPolicyVisibilityAfterAnim = false;
    final boolean isFocused = isFocused();
    if (!doAnimation) {
        // 清除窗口可见性
        clearPolicyVisibilityFlag(LEGACY_POLICY_VISIBILITY);
        mWmService.enableScreenIfNeededLocked();
        if (isFocused) {
            mWmService.mFocusMayChange = true;
        }
    }
    if (requestAnim) {
        mWmService.scheduleAnimationLocked();
    }
    // 更新焦点窗口
    if (isFocused) {
        mWmService.updateFocusedWindowLocked(
                UPDATE_FOCUS_NORMAL, false /* updateImWindows */);
    }
    return true;
}
```

`WindowState.show()` 方法设置窗口可见性标志：

```java
boolean show(boolean doAnimation, boolean requestAnim) {
    if (isLegacyPolicyVisibility() && mLegacyPolicyVisibilityAfterAnim) {
        return false; // Already showing
    }
    if (!showToCurrentUser()) return false;
    if (!mAppOpVisibility) return false;
    if (mPermanentlyHidden) return false;
    if (mHiddenWhileSuspended) return false;
    if (mForceHideNonSystemOverlayWindow) return false;

    // 设置窗口可见性标志
    setPolicyVisibilityFlag(LEGACY_POLICY_VISIBILITY);
    mLegacyPolicyVisibilityAfterAnim = true;
    if (doAnimation) {
        mWinAnimator.applyAnimationLocked(TRANSIT_ENTER, true);
    }
    if (requestAnim) {
        mWmService.scheduleAnimationLocked();
    }
    // 更新窗口焦点
    if ((mAttrs.flags & FLAG_NOT_FOCUSABLE) == 0) {
        mWmService.updateFocusedWindowLocked(
                UPDATE_FOCUS_NORMAL, false /* updateImWindows */);
    }
    return true;
}
```

#### 2.5.3 finishPostLayoutPolicyLw

```java
public void finishPostLayoutPolicyLw() {
    if (!mShowingDream) {
        mDreamingLockscreen = mService.mPolicy.isKeyguardShowingAndNotOccluded();
    }
    // 更新系统状态栏属性
    updateSystemBarAttributes();

    if (mShowingDream != mLastShowingDream) {
        mLastShowingDream = mShowingDream;
        mDisplayContent.notifyKeyguardFlagsChanged();
    }

    mService.mPolicy.setAllowLockscreenWhenOn(getDisplayId(), mAllowLockscreenWhenOn);
}
```

`finishPostLayoutPolicyLw` 的目的主要是调整系统窗口和锁屏界面的可见性。

### 2.6 Surface 变更事务处理

回到 `DisplayContent.applySurfaceChangesTransaction()` 方法中的 `mApplySurfaceChangesTransaction`。该回调循环遍历各个 `WindowState`，根据携带的参数确定是否修改逻辑屏显示参数，并且对 `WindowState` 状态进行由 `COMMIT_DRAW_PENDING` 到 `READY_TO_SHOW` 的转变（`commitFinishDrawingLocked`）。

代码路径：`frameworks/base/services/core/java/com/android/server/wm/DisplayContent.java`

```java
private final Consumer<WindowState> mApplySurfaceChangesTransaction = w -> {
    final WindowSurfacePlacer surfacePlacer = mWmService.mWindowPlacerLocked;
    final boolean obscuredChanged = w.mObscured !=
            mTmpApplySurfaceChangesTransactionState.obscured;
    final RootWindowContainer root = mWmService.mRoot;

    // 1. 设置 WindowState.mObscured 属性值
    w.mObscured = mTmpApplySurfaceChangesTransactionState.obscured;

    // 确定当前 WindowState 是否被上面的窗口遮挡
    if (!mTmpApplySurfaceChangesTransactionState.obscured) {
        final boolean isDisplayed = w.isDisplayed();
        // 确定是否会遮挡后续遍历的 WindowState
        if (isDisplayed && w.isObscuringDisplay()) {
            mObscuringWindow = w;
            mTmpApplySurfaceChangesTransactionState.obscured = true;
        }

        // 逻辑屏上是否有内容显示，用于控制多屏镜像
        final boolean displayHasContent = root.handleNotObscuredLocked(w,
                mTmpApplySurfaceChangesTransactionState.obscured,
                mTmpApplySurfaceChangesTransactionState.syswin);

        if (!mTmpApplySurfaceChangesTransactionState.displayHasContent
                && !getDisplayPolicy().isWindowExcludedFromContent(w)) {
            mTmpApplySurfaceChangesTransactionState.displayHasContent |= displayHasContent;
        }

        if (w.mHasSurface && isDisplayed) {
            // 获取窗口属性中携带的控制逻辑屏显示参数
            if ((w.mAttrs.flags & FLAG_KEEP_SCREEN_ON) != 0) {
                mTmpHoldScreenWindow = w;
            }
            final int type = w.mAttrs.type;
            if (type == TYPE_SYSTEM_DIALOG || type == TYPE_SYSTEM_ERROR
                    || (type == TYPE_NOTIFICATION_SHADE
                        && mWmService.mPolicy.isKeyguardShowing())) {
                mTmpApplySurfaceChangesTransactionState.syswin = true;
            }
            // 刷新率相关参数
            if (mTmpApplySurfaceChangesTransactionState.preferredRefreshRate == 0
                    && w.mAttrs.preferredRefreshRate != 0) {
                mTmpApplySurfaceChangesTransactionState.preferredRefreshRate
                        = w.mAttrs.preferredRefreshRate;
            }
            ......
        }
    }

    w.handleWindowMovedIfNeeded();
    w.resetContentChanged();

    // 首先判断当前 WindowState 是否有 SurfaceControl
    if (w.mHasSurface) {
        // 3. 对已经画好的窗口进行 commit 操作
        final boolean committed = winAnimator.commitFinishDrawingLocked();
        if (isDefaultDisplay && committed) {
            if (w.hasWallpaper()) {
                mWallpaperMayChange = true;
                pendingLayoutChanges |= FINISH_LAYOUT_REDO_WALLPAPER;
            }
        }
    }

    final ActivityRecord activity = w.mActivityRecord;
    if (activity != null && activity.isVisibleRequested()) {
        activity.updateLetterboxSurface(w);
        final boolean updateAllDrawn = activity.updateDrawnWindowStates(w);
        if (updateAllDrawn && !mTmpUpdateAllDrawn.contains(activity)) {
            mTmpUpdateAllDrawn.add(activity);
        }
    }
    w.updateResizingWindowIfNeeded();
};
```

在这个方法中主要做了三件事：

1. **设置 `WindowState.mObscured` 属性值**：表示该窗口是否被其他窗口遮挡。遍历过程中，只要一个窗口已显示且全屏显示，之后遍历的 `WindowState` 的 `mObscured` 属性将设置为 `true`。
2. **填充显示参数**：将窗口所携带的控制逻辑屏显示相关参数填充给 `mTmpApplySurfaceChangesTransactionState` 对象属性。
3. **提交绘制完成**：对已经画好的窗口进行 commit 操作。

`mTmpApplySurfaceChangesTransactionState` 对象用来在遍历过程中保存对所有窗口的遍历结果，每次遍历时都会重置：

```java
private static final class ApplySurfaceChangesTransactionState {
    public boolean displayHasContent;
    public boolean obscured;
    public boolean syswin;
    public boolean preferMinimalPostProcessing;
    public float preferredRefreshRate;
    public int preferredModeId;
    public float preferredMinRefreshRate;
    public float preferredMaxRefreshRate;
    public boolean disableHdrConversion;

    void reset() {
        displayHasContent = false;
        obscured = false;
        syswin = false;
        preferMinimalPostProcessing = false;
        preferredRefreshRate = 0;
        preferredModeId = 0;
        preferredMinRefreshRate = 0;
        preferredMaxRefreshRate = 0;
        disableHdrConversion = false;
    }
}
```

**handleNotObscuredLocked** 方法确定 `displayHasContent` 变量，表示对应窗口是否需要镜像给其他 display：

代码路径：`frameworks/base/services/core/java/com/android/server/wm/RootWindowContainer.java`

```java
boolean handleNotObscuredLocked(WindowState w, boolean obscured, boolean syswin) {
    ......
    if (w.mHasSurface && canBeSeen) {
        final DisplayContent displayContent = w.getDisplayContent();
        if (displayContent != null && displayContent.isDefaultDisplay) {
            // 当窗口类型是 Dream 类型或锁屏显示时，副屏上不显示
            if (w.isDreamWindow() || mWmService.mPolicy.isKeyguardShowing()) {
                mObscureApplicationContentOnSecondaryDisplays = true;
            }
            // 默认屏幕永远为 true
            displayHasContent = true;
        } else if (displayContent != null &&
                (!mObscureApplicationContentOnSecondaryDisplays
                        || (obscured && type == TYPE_KEYGUARD_DIALOG))) {
            // 满足条件的窗口在副屏上也会显示
            displayHasContent = true;
        }
    }
    return displayHasContent;
}
```

最终遍历完成后，将值保存在 `mTmpApplySurfaceChangesTransactionState` 中，并向 DMS 发出请求，为顶层 Window 设置显示参数（如刷新率、宽高、是否镜像等属性）：

```java
void applySurfaceChangesTransaction() {
    ......
    mTmpApplySurfaceChangesTransactionState.reset();
    ......
    mLastHasContent = mTmpApplySurfaceChangesTransactionState.displayHasContent;
    if (!mWmService.mDisplayFrozen) {
        mWmService.mDisplayManagerInternal.setDisplayProperties(mDisplayId,
                mLastHasContent,
                mTmpApplySurfaceChangesTransactionState.preferredRefreshRate,
                mTmpApplySurfaceChangesTransactionState.preferredModeId,
                mTmpApplySurfaceChangesTransactionState.preferredMinRefreshRate,
                mTmpApplySurfaceChangesTransactionState.preferredMaxRefreshRate,
                mTmpApplySurfaceChangesTransactionState.preferMinimalPostProcessing,
                true /* inTraversal */);
    }
    ......
}
```

### 2.7 提交窗口布局 —— READY_TO_SHOW

`WindowStateAnimator.commitFinishDrawingLocked()` 方法对 `mDrawState` 状态进行过滤，并将其变更为 `READY_TO_SHOW`。

**窗口绘制状态机：**

![窗口绘制状态机](/img/android/relayoutWindow/05_draw_state_machine.svg)

```java
boolean commitFinishDrawingLocked() {
    // 非 COMMIT_DRAW_PENDING 和 READY_TO_SHOW 则直接返回
    if (mDrawState != COMMIT_DRAW_PENDING && mDrawState != READY_TO_SHOW) {
        return false;
    }
    // 将状态变更为 READY_TO_SHOW
    mDrawState = READY_TO_SHOW;
    boolean result = false;
    final ActivityRecord activity = mWin.mActivityRecord;

    // 以下三种情况直接进入 performShowLocked() 流程：
    // 1. ActivityRecord 为空（不依赖 Activity 的窗口，如悬浮窗）
    // 2. canShowWindows() 为 true（所有窗口已绘制完成且没有正在进行的父级窗口过渡动画）
    // 3. 窗口类型为启动窗口（Starting Window，如 Splash Screen）
    if (activity == null || activity.canShowWindows()
            || mWin.mAttrs.type == TYPE_APPLICATION_STARTING) {
        result = mWin.performShowLocked();
    }
    return result;
}
```

进入 `performShowLocked()` 流程后，`mDrawState` 将更新为 `HAS_DRAWN`。

## 三、Show Surface

**Show Surface 流程：**

![Show Surface 流程图](/img/android/relayoutWindow/04_show_surface_flow.svg)

回到 `DisplayContent.applySurfaceChangesTransaction()` 方法中的 `prepareSurfaces()` 调用。该调用沿着容器层级逐层向下传递，最终到达每个 `WindowState`，通过 `WindowStateAnimator.prepareSurfaceLocked()` 控制 Surface 的可见性，并调用 `showRobustly()` 将 Surface 显示出来。

调用链：`DisplayContent.prepareSurfaces()` → `DisplayArea.prepareSurfaces()` → `WindowContainer.prepareSurfaces()`（循环调用子容器）→ `WindowState.prepareSurfaces()` → `WindowStateAnimator.prepareSurfaceLocked()` → `WindowSurfaceController.showRobustly()`

最终调用 `showRobustly`，将 Surface 全部 show 出来：

```java
void showRobustly(SurfaceControl.Transaction t) {
    if (mSurfaceShown) {
        return;
    }
    // 将 mSurfaceShown 设置为 true
    setShown(true);
    // 调用 SurfaceControl 中的 show 方法，将 Surface show 出来
    t.show(mSurfaceControl);
}
```
