---
prev:
    text: 'Android Input 系统'
    link: '/framework/input-system'
next:
    text: 'performTraversal'
    link: '/framework/performTraversal'
---

# 无焦点窗口 ANR

本文档聚焦 Android 无焦点窗口 ANR 的治理：焦点窗口切换全链路（WMS → SurfaceFlinger → InputDispatcher）、ANR 触发与检测机制、窗口绘制状态机、关键日志与排查方法，以及典型治理案例。

## 一、ANR 概述

### 1.1 ANR 定义

ANR（Application Not Responding）表示应用程序在规定时间内未完成特定操作。系统会弹出对话框，让用户选择等待或关闭应用。

### 1.2 ANR 的类型

![ANR 四种类型](/img/android/anr/17_anr_types.svg)

本文重点关注 **Input ANR** 中的**无焦点窗口 ANR**，其提示语为：

```
Application does not have a focused window
```

### 1.3 无焦点窗口 ANR 的本质

按键事件（KeyEvent）的派发需要一个**焦点窗口**作为目标。如果系统存在焦点应用（focusedApplication）但没有焦点窗口（focusedWindow），按键事件将无法派发。当这种等待持续超过 5 秒，InputDispatcher 就会触发 ANR。

需要焦点窗口的不仅是按键事件。轨迹球、游戏摇杆等设备上报的 MotionEvent 也需要焦点窗口派发，因为这些事件不存在指针位置。

> 触摸事件（触屏 MotionEvent）**不受此限制**，它根据触摸坐标找到对应窗口进行派发。

## 二、窗口层级与焦点窗口概念

### 2.1 WindowContainer 层级结构

![WindowContainer 窗口层级体系](/img/android/anr/11_window_container_hierarchy.svg)

WMS 使用树状的 `WindowContainer` 体系管理所有窗口。每个容器都持有 `SurfaceControl`，在 SurfaceFlinger 中对应一个 Layer。父容器被 hide 会导致所有子窗口不可见——即使 WindowState 自身状态正常，如果其父级 Task 或 TaskDisplayArea 的 Layer 被 hide，InputDispatcher 也会判定为 `NOT_VISIBLE`。

### 2.2 焦点应用与焦点窗口

```java
// DisplayContent.java
// 焦点应用：当前前台 Activity，低于它的窗口不能成为焦点窗口
ActivityRecord mFocusedApp = null;

// 焦点窗口：当前接收按键事件和指针事件的窗口
WindowState mCurrentFocus = null;
```

- **焦点应用（mFocusedApp）**：Activity 切换为 top resumed 时设置
- **焦点窗口（mCurrentFocus）**：由 WMS 遍历窗口树确定，同一屏幕同一时间最多一个

### 2.3 窗口信息同步路径

![整体架构](/img/android/anr/01_overall_architecture.svg)

焦点窗口的确定涉及三个模块协作：

1. **WMS**：管理窗口状态，确定哪个窗口应该获得焦点
2. **SurfaceFlinger**：管理 Layer 显示，根据实际可见性补充标记，传递焦点请求到 Input
3. **InputDispatcher**：根据窗口列表和焦点请求，最终决定是否授予焦点

WMS 只管理窗口元数据，无法确定实际显示状态；SurfaceFlinger 管理实际渲染，能知道哪些 Layer 确实可见。因此焦点信息需要经过 SurfaceFlinger 校验后才能到达 InputDispatcher。

### 2.4 查看焦点窗口的方法

```bash
# WMS 侧：查看焦点窗口和焦点应用
adb shell dumpsys window displays | grep -E "mCurrentFocus|mFocusedApp"
#   mCurrentFocus=Window{xxx u0 com.example.app/.MainActivity}
#   mFocusedApp=ActivityRecord{yyy u0 com.example.app/.MainActivity t12}

# SurfaceFlinger 侧：HWC layers 中 [*] 标记焦点窗口
adb shell dumpsys SurfaceFlinger | grep -A 50 "HWC layers"

# Input 侧：查看焦点应用和焦点窗口
adb shell dumpsys input | grep -E "FocusedApplications|FocusedWindows"
#   FocusedWindows: displayId=0, name='xxx com.example.app/...'
#   如果是 <none>，说明当前无焦点窗口
```

## 三、WMS 侧焦点窗口管理

### 3.1 焦点更新入口

![WMS 焦点更新内部流程](/img/android/anr/12_wms_focus_update_flow.svg)

焦点更新的入口是 `WindowManagerService.updateFocusedWindowLocked()`：

```java
// WindowManagerService.java:7261
boolean updateFocusedWindowLocked(int mode, boolean updateInputWindows) {
    Trace.traceBegin(TRACE_TAG_WINDOW_MANAGER, "wmUpdateFocus");
    boolean changed = mRoot.updateFocusedWindowLocked(mode, updateInputWindows);
    Trace.traceEnd(TRACE_TAG_WINDOW_MANAGER);
    return changed;
}
```

该方法在多个场景下被调用：`addWindow()`、`removeWindow()`、`relayoutWindow()`、`setFocusedApp()` 等。

### 3.2 RootWindowContainer.updateFocusedWindowLocked()

按 Z 序（从最顶层开始）遍历所有 DisplayContent，对每个 Display 执行焦点更新：

```java
// RootWindowContainer.java:602
boolean updateFocusedWindowLocked(int mode, boolean updateInputWindows) {
    mTopFocusedAppByProcess.clear();
    boolean changed = false;
    int topFocusedDisplayId = INVALID_DISPLAY;
    // 按 Z 序从顶层开始遍历
    for (int i = mChildren.size() - 1; i >= 0; --i) {
        final DisplayContent dc = mChildren.get(i);
        changed |= dc.updateFocusedWindowLocked(mode, updateInputWindows,
                topFocusedDisplayId);
        final WindowState newFocus = dc.mCurrentFocus;
        if (newFocus != null) {
            final int pidOfNewFocus = newFocus.mSession.mPid;
            if (mTopFocusedAppByProcess.get(pidOfNewFocus) == null) {
                mTopFocusedAppByProcess.put(pidOfNewFocus, newFocus.mActivityRecord);
            }
            if (topFocusedDisplayId == INVALID_DISPLAY) {
                topFocusedDisplayId = dc.getDisplayId();
            }
        } else if (topFocusedDisplayId == INVALID_DISPLAY && dc.mFocusedApp != null) {
            topFocusedDisplayId = dc.getDisplayId();
        }
    }
    if (topFocusedDisplayId == INVALID_DISPLAY) {
        topFocusedDisplayId = DEFAULT_DISPLAY;
    }
    if (mTopFocusedDisplayId != topFocusedDisplayId) {
        mTopFocusedDisplayId = topFocusedDisplayId;
        mWmService.mInputManager.setFocusedDisplay(topFocusedDisplayId);
        mWmService.mPolicy.setTopFocusedDisplay(topFocusedDisplayId);
        mWmService.mAccessibilityController.setFocusedDisplay(topFocusedDisplayId);
    }
    return changed;
}
```

关键逻辑：第一个找到焦点窗口的 Display 成为 `topFocusedDisplayId`，后续 Display 如果没有自己的焦点（`hasOwnFocus() == false`），将不会尝试查找焦点窗口。

### 3.3 DisplayContent.updateFocusedWindowLocked()

```java
// DisplayContent.java:4581
boolean updateFocusedWindowLocked(int mode, boolean updateInputWindows,
        int topFocusedDisplayId) {
    // 瞬态启动期间不自动切换焦点
    if (mCurrentFocus != null && mTransitionController.shouldKeepFocus(mCurrentFocus)
            && mFocusedApp != null && mCurrentFocus.isDescendantOf(mFocusedApp)
            && mCurrentFocus.isVisible() && mCurrentFocus.isFocusable()) {
        return false;
    }
    WindowState newFocus = findFocusedWindowIfNeeded(topFocusedDisplayId);
    if (mCurrentFocus == newFocus) {
        return false;
    }
    // 更新 IME 目标
    boolean imWindowChanged = false;
    final WindowState imWindow = mInputMethodWindow;
    if (imWindow != null) {
        final WindowState prevTarget = mImeLayeringTarget;
        final WindowState newTarget = computeImeTarget(true);
        imWindowChanged = prevTarget != newTarget;
        if (mode != UPDATE_FOCUS_WILL_ASSIGN_LAYERS
                && mode != UPDATE_FOCUS_WILL_PLACE_SURFACES) {
            assignWindowLayers(false);
        }
        if (imWindowChanged) {
            mWmService.mWindowsChanged = true;
            setLayoutNeeded();
            newFocus = findFocusedWindowIfNeeded(topFocusedDisplayId);
        }
    }
    // 日志：Changing focus from X to Y
    ProtoLog.d(WM_DEBUG_FOCUS_LIGHT, "Changing focus from %s to %s displayId=%d Callers=%s",
            mCurrentFocus, newFocus, getDisplayId(), Debug.getCallers(4));
    final WindowState oldFocus = mCurrentFocus;
    mCurrentFocus = newFocus;

    if (newFocus != null) {
        mWinAddedSinceNullFocus.clear();
        mWinRemovedSinceNullFocus.clear();
        if (newFocus.canReceiveKeys()) {
            newFocus.mToken.paused = false;
        }
    }
    getDisplayPolicy().focusChangedLw(oldFocus, newFocus);
    mAtmService.mBackNavigationController.onFocusChanged(newFocus);
    // 通知 InputMonitor
    getInputMonitor().setInputFocusLw(newFocus, updateInputWindows);
    adjustForImeIfNeeded();
    scheduleToastWindowsTimeoutIfNeededLocked(oldFocus, newFocus);
    return true;
}
```

### 3.4 焦点窗口查找

```java
// DisplayContent.java:4545
WindowState findFocusedWindowIfNeeded(int topFocusedDisplayId) {
    // 只有拥有自己的焦点或者还没有其他 Display 获焦时才查找
    return (hasOwnFocus() || topFocusedDisplayId == INVALID_DISPLAY)
                ? findFocusedWindow() : null;
}

// DisplayContent.java:4555
WindowState findFocusedWindow() {
    mTmpWindow = null;
    forAllWindows(mFindFocusedWindow, true /* traverseTopToBottom */);
    if (mTmpWindow == null) {
        ProtoLog.v(WM_DEBUG_FOCUS_LIGHT,
                "findFocusedWindow: No focusable windows, display=%d", getDisplayId());
        return null;
    }
    return mTmpWindow;
}
```

### 3.5 mFindFocusedWindow 核心逻辑

这是焦点查找的核心 Lambda，对每个窗口从顶到底逐一检查：

```java
// DisplayContent.java:940
private final ToBooleanFunction<WindowState> mFindFocusedWindow = w -> {
    final ActivityRecord focusedApp = mFocusedApp;
    ProtoLog.v(WM_DEBUG_FOCUS, "Looking for focus: %s, flags=%d, canReceive=%b, reason=%s",
            w, w.mAttrs.flags, w.canReceiveKeys(),
            w.canReceiveKeysReason(false /* fromUserTouch */));

    // ① canReceiveKeys 检查——不满足直接跳过
    if (!w.canReceiveKeys()) {
        return false;
    }

    // ② IME 子窗口特殊处理
    if (w.mIsImWindow && w.isChildWindow() && (mImeLayeringTarget == null
            || !mImeLayeringTarget.isRequestedVisible(ime()))) {
        return false;
    }
    if (w.mAttrs.type == TYPE_INPUT_METHOD_DIALOG && mImeLayeringTarget != null
            && !mImeLayeringTarget.isRequestedVisible(ime())
            && !mImeLayeringTarget.isVisibleRequested()) {
        return false;
    }

    final ActivityRecord activity = w.mActivityRecord;

    // ③ 没有焦点应用时，当前窗口直接获焦
    if (focusedApp == null) {
        ProtoLog.v(WM_DEBUG_FOCUS_LIGHT,
                "findFocusedWindow: focusedApp=null using new focus @ %s", w);
        mTmpWindow = w;
        return true;
    }

    // ④ 焦点应用的窗口不可获焦时，当前窗口获焦
    if (!focusedApp.windowsAreFocusable()) {
        ProtoLog.v(WM_DEBUG_FOCUS_LIGHT,
                "findFocusedWindow: focusedApp windows not focusable using new focus @ %s", w);
        mTmpWindow = w;
        return true;
    }

    // ⑤ 当前窗口的 Activity 在焦点应用之下 → 无焦点窗口
    if (activity != null && w.mAttrs.type != TYPE_APPLICATION_STARTING) {
        if (focusedApp.compareTo(activity) > 0) {
            ProtoLog.v(WM_DEBUG_FOCUS_LIGHT,
                    "findFocusedWindow: Reached focused app=%s", focusedApp);
            mTmpWindow = null;
            return true;
        }
        // ⑥ 嵌入式 Activity 检查
        TaskFragment parent = activity.getTaskFragment();
        if (parent != null && parent.isEmbedded()) {
            if (activity.getTask() == focusedApp.getTask()
                    && activity.getTaskFragment() != focusedApp.getTaskFragment()) {
                return false;
            }
        }
    }

    // ⑦ 默认：当前窗口获焦
    ProtoLog.v(WM_DEBUG_FOCUS_LIGHT, "findFocusedWindow: Found new focus @ %s", w);
    mTmpWindow = w;
    return true;
};
```

各分支的含义：
- **分支 ①**：`canReceiveKeys()` 失败 → 此窗口不能获焦，跳过
- **分支 ②**：IME 子窗口在目标不可见时不获焦
- **分支 ③**：没有设置焦点应用 → 第一个能获焦的窗口就是焦点窗口
- **分支 ④**：焦点应用的窗口不可获焦（如 finishing 状态）→ 同上
- **分支 ⑤**：当前窗口属于焦点应用之下的 Activity → 没有合格的窗口，返回 null（**无焦点窗口**）
- **分支 ⑥**：嵌入式 Activity 在同一 Task 不同 TaskFragment 中 → 跳过
- **分支 ⑦**：默认获焦

### 3.6 canReceiveKeys()

![canReceiveKeys 判断条件](/img/android/anr/06_canReceiveKeys_conditions.svg)

```java
// WindowState.java:3300
public boolean canReceiveKeys(boolean fromUserTouch) {
    // 瞬态启动期间保持可获焦
    if (mActivityRecord != null && mTransitionController.shouldKeepFocus(mActivityRecord)) {
        return true;
    }

    final boolean canReceiveKeys = isVisibleRequestedOrAdding()
            && (mViewVisibility == View.VISIBLE)     // 客户端 View 可见
            && !mRemoveOnExit                         // 非退出状态
            && ((mAttrs.flags & FLAG_NOT_FOCUSABLE) == 0)  // 无不可获焦标记
            && (mActivityRecord == null || mActivityRecord.windowsAreFocusable(fromUserTouch))
            && (mActivityRecord == null || mActivityRecord.getTask() == null
                    || !mActivityRecord.getTask().getRootTask().shouldIgnoreInput());

    if (!canReceiveKeys) {
        return false;
    }
    // 非受信任虚拟屏需用户主动触摸
    return fromUserTouch || getDisplayContent().isOnTop()
            || getDisplayContent().isTrusted();
}
```

### 3.7 isVisibleRequestedOrAdding()

```java
// WindowState.java:2095
boolean isVisibleRequestedOrAdding() {
    final ActivityRecord atoken = mActivityRecord;
    return (mHasSurface || (!mRelayoutCalled && mViewVisibility == View.VISIBLE))
            && isVisibleByPolicy() && !isParentWindowHidden()
            && (atoken == null || atoken.isVisibleRequested())
            && !mAnimatingExit && !mDestroying;
}
```

条件含义：
- `mHasSurface`：Surface 已创建（relayout 已执行）；或 `!mRelayoutCalled && mViewVisibility == VISIBLE`（addWindow \~ relayout 之间）
- `isVisibleByPolicy()`：策略允许可见
- `!isParentWindowHidden()`：父窗口未隐藏
- `isVisibleRequested()`：ActivityRecord 请求可见
- `!mAnimatingExit && !mDestroying`：非退出/销毁状态

### 3.8 canReceiveKeysReason() 调试方法

```java
// WindowState.java:3280
public String canReceiveKeysReason(boolean fromUserTouch) {
    return "fromTouch= " + fromUserTouch
            + " isVisibleRequestedOrAdding=" + isVisibleRequestedOrAdding()
            + " mViewVisibility=" + mViewVisibility
            + " mRemoveOnExit=" + mRemoveOnExit
            + " flags=" + mAttrs.flags
            + " appWindowsAreFocusable="
            + (mActivityRecord == null || mActivityRecord.windowsAreFocusable(fromUserTouch))
            + " canReceiveTouchInput=" + canReceiveTouchInput()
            + " displayIsOnTop=" + getDisplayContent().isOnTop()
            + " displayIsTrusted=" + getDisplayContent().isTrusted()
            + " transitShouldKeepFocus=" + (mActivityRecord != null
                    && mTransitionController.shouldKeepFocus(mActivityRecord));
}
```

开启调试日志：

```bash
adb shell wm logging enable-text WM_DEBUG_FOCUS WM_DEBUG_FOCUS_LIGHT
```

日志示例：

```
WindowManager: Looking for focus: Window{xxx com.example.app/...Activity},
  flags=-2122252032, canReceive=true,
  reason=fromTouch=false isVisibleRequestedOrAdding=true mViewVisibility=0
  mRemoveOnExit=false appWindowsAreFocusable=true canReceiveTouchInput=true
  displayIsOnTop=true displayIsTrusted=true transitShouldKeepFocus=false
  mHasSurface=true mRelayoutCalled=true isVisibleByPolicy=true
  isParentWindowHidden=false atoken.isVisibleRequested=true
  mAnimatingExit=false mDestroying=false
```

### 3.9 焦点更新模式

`updateFocusedWindowLocked()` 的 `mode` 参数控制更新行为：

- `UPDATE_FOCUS_NORMAL (0)`：常规更新
- `UPDATE_FOCUS_WILL_ASSIGN_LAYERS (1)`：窗口层级分配之前
- `UPDATE_FOCUS_PLACING_SURFACES (2)`：performSurfacePlacement 期间
- `UPDATE_FOCUS_WILL_PLACE_SURFACES (3)`：Surface 放置之前
- `UPDATE_FOCUS_REMOVING_FOCUS (4)`：焦点窗口移除之后

## 四、InputMonitor：WMS 向底层同步焦点

![WMS → SF → Input 完整流程](/img/android/anr/07_wms_to_sf_to_input.svg)

### 4.1 setInputFocusLw()

WMS 找到焦点窗口后，通过 InputMonitor 开始同步：

```java
// InputMonitor.java:417
void setInputFocusLw(WindowState newWindow, boolean updateInputWindows) {
    ProtoLog.v(WM_DEBUG_FOCUS_LIGHT, "Input focus has changed to %s display=%d",
            newWindow, mDisplayId);
    final IBinder focus = newWindow != null ? newWindow.mInputChannelToken : null;
    if (focus == mInputFocus) {
        return;
    }
    if (newWindow != null && newWindow.canReceiveKeys()) {
        newWindow.mToken.paused = false;
    }
    setUpdateInputWindowsNeededLw();
    if (updateInputWindows) {
        updateInputWindowsLw(false /* force */);
    }
}
```

日志：`wms.Input focus has changed to Window{xxx} display=0`

### 4.2 异步更新流程

更新通过 `android.anim` 线程异步执行：

```java
// InputMonitor.java:383
void updateInputWindowsLw(boolean force) {
    if (!force && !mUpdateInputWindowsNeeded) {
        return;
    }
    scheduleUpdateInputWindows();
}

// InputMonitor.java:390
private void scheduleUpdateInputWindows() {
    if (mDisplayRemoved) return;
    if (!mUpdateInputWindowsPending) {
        mUpdateInputWindowsPending = true;
        mHandler.post(mUpdateInputWindows);  // 投递到 android.anim 线程
    }
}
```

`mUpdateInputWindows` Runnable 执行时：
1. 通过 `forAllWindows()` 遍历所有窗口，对每个窗口调用 `populateInputWindowHandle()` + `setInputWindowInfoIfNeeded()`
2. 调用 `updateInputFocusRequest()` → `requestFocus()`
3. merge 到 PendingTransaction → `scheduleAnimation()`
4. `WindowAnimator.animate()` → `closeSurfaceTransaction()` → `nativeApplyTransaction()` 发送到 SF

### 4.3 populateInputWindowHandle()

将 WindowState 的属性填充到 InputWindowHandle：

```java
// InputMonitor.java:271
void populateInputWindowHandle(final InputWindowHandleWrapper inputWindowHandle,
        final WindowState w) {
    inputWindowHandle.setInputApplicationHandle(w.mActivityRecord != null
            ? w.mActivityRecord.getInputApplicationHandle(false) : null);
    inputWindowHandle.setToken(w.mInputChannelToken);
    inputWindowHandle.setDispatchingTimeoutMillis(w.getInputDispatchingTimeoutMillis());
    inputWindowHandle.setTouchOcclusionMode(w.getTouchOcclusionMode());
    inputWindowHandle.setPaused(w.mActivityRecord != null && w.mActivityRecord.paused);
    inputWindowHandle.setWindowToken(w.mClient.asBinder());
    inputWindowHandle.setName(w.getName());

    int flags = w.mAttrs.flags;
    if (w.mAttrs.isModal()) {
        flags = flags | FLAG_NOT_TOUCH_MODAL;
    }
    inputWindowHandle.setLayoutParamsFlags(flags);
    inputWindowHandle.setInputConfigMasked(
            InputConfigAdapter.getInputConfigFromWindowParams(
                    w.mAttrs.type, flags, w.mAttrs.inputFeatures),
            InputConfigAdapter.getMask());

    // 关键：设置 focusable 属性
    final boolean focusable = w.canReceiveKeys()
            && (mDisplayContent.hasOwnFocus() || mDisplayContent.isOnTop());
    inputWindowHandle.setFocusable(focusable);

    final boolean hasWallpaper = mDisplayContent.mWallpaperController.isWallpaperTarget(w)
            && !mService.mPolicy.isKeyguardShowing()
            && w.mAttrs.areWallpaperTouchEventsEnabled();
    inputWindowHandle.setHasWallpaper(hasWallpaper);
    inputWindowHandle.setSurfaceInset(w.mAttrs.surfaceInsets.left);
    // ... touchable region 等
}
```

### 4.4 requestFocus()

打印焦点切换三步日志的**第一步**：

```java
// InputMonitor.java:573
private void requestFocus(IBinder focusToken, String windowName) {
    if (focusToken == mInputFocus) {
        return;
    }
    mInputFocus = focusToken;
    mInputFocusRequestTimeMillis = SystemClock.uptimeMillis();
    mInputTransaction.setFocusedWindow(mInputFocus, windowName, mDisplayId);
    EventLog.writeEvent(LOGTAG_INPUT_FOCUS, "Focus request " + windowName,
            "reason=UpdateInputWindows");
    ProtoLog.v(WM_DEBUG_FOCUS_LIGHT, "Focus requested for window=%s", windowName);
}
```

日志：`input_focus: [Focus request xxx com.example.app/...Activity,reason=UpdateInputWindows]`

### 4.5 SurfaceControl.Transaction.setFocusedWindow()

```java
// SurfaceControl.java:4682
public Transaction setFocusedWindow(@NonNull IBinder token,
        String windowName, int displayId) {
    nativeSetFocusedWindow(mNativeObject, token, windowName, displayId);
    return this;
}
```

JNI 层构造 `FocusRequest` 结构体（token + windowName + timestamp + displayId），存入 Transaction 的 `mInputWindowCommands.focusRequests` 列表。`Transaction.apply()` 时通过 Binder 发送到 SurfaceFlinger 的 `setTransactionState()`。

## 五、SurfaceFlinger 侧焦点传递

### 5.1 Transaction 接收与处理

SurfaceFlinger 通过 `setTransactionState()` 接收 Transaction，将焦点请求通过 `addInputWindowCommands()` 合并到待处理列表：

```cpp
// SurfaceFlinger.cpp
uint32_t SurfaceFlinger::addInputWindowCommands(
        const InputWindowCommands& inputWindowCommands) {
    bool hasChanges = mInputWindowCommands.merge(inputWindowCommands);
    return hasChanges ? eTraversalNeeded : 0;
}
```

### 5.2 updateInputFlinger()

在每次 VSync 的 `commit()` 阶段，SurfaceFlinger 调用 `updateInputFlinger()` 处理焦点请求：

```cpp
// SurfaceFlinger.cpp
void SurfaceFlinger::updateInputFlinger(VsyncId vsyncId, TimePoint frameTime) {
    if (!mInputFlinger || (!mUpdateInputInfo && mInputWindowCommands.empty())) {
        return;
    }
    std::vector<WindowInfo> windowInfos;
    std::vector<DisplayInfo> displayInfos;
    bool updateWindowInfo = false;
    if (mUpdateInputInfo) {
        mUpdateInputInfo = false;
        updateWindowInfo = true;
        buildWindowInfos(windowInfos, displayInfos);  // 构建窗口信息列表
    }
    // ...
    BackgroundExecutor::getInstance().sendCallbacks({[...]() {
        if (updateWindowInfo) {
            // 路径 1：窗口信息变化 → 通知 InputDispatcher
            mWindowInfosListenerInvoker->windowInfosChanged(...);
        }
        // 路径 2：焦点请求 → 直接转发
        for (const auto& focusRequest : inputWindowCommands.focusRequests) {
            inputFlinger->setFocusedWindow(focusRequest);
        }
    }});
    mInputWindowCommands.clear();
}
```

### 5.3 Layer 可见性判断

`buildWindowInfos()` 中通过 `Layer::fillInputInfo()` 为每个窗口设置可见性。Layer 的可见性取决于：

- Layer 自身 `flags`：**末位为奇数表示 hidden**（如 `0x1`、`0x3`、`0x103`）
- Layer 的 `alpha` 值：`0` 表示完全透明
- **父 Layer 的状态**：父 Layer hidden 或 alpha=0 会导致子 Layer 不可见

这是 InputDispatcher 判断焦点窗口是否 `NOT_VISIBLE` 的依据。

### 5.4 窗口信息到达 InputDispatcher 的两条路径

1. **窗口列表更新**：`windowInfosChanged()` → `InputDispatcher::onWindowInfosChanged()` → `setInputWindowsLocked()`
2. **焦点请求**：`inputFlinger->setFocusedWindow()` → `InputDispatcher::setFocusedWindow()`

两条路径都会触发 `FocusResolver` 进行焦点解析。

## 六、InputDispatcher 侧焦点处理与 ANR 检测

![InputDispatcher 焦点解析流程](/img/android/anr/13_input_focus_resolution.svg)

### 6.1 焦点应用设置

WMS 通过 `InputManagerService.setFocusedApplication()` 直接设置焦点应用：

```cpp
// InputDispatcher.cpp:5924
void InputDispatcher::setFocusedApplicationLocked(
        ui::LogicalDisplayId displayId,
        const std::shared_ptr<InputApplicationHandle>& inputApplicationHandle) {
    std::shared_ptr<InputApplicationHandle> oldFocusedApplicationHandle =
            getValueByKey(mFocusedApplicationHandlesByDisplay, displayId);
    if (sharedPointersEqual(oldFocusedApplicationHandle, inputApplicationHandle)) {
        return; // This application is already focused.
    }
    // Set the new application handle.
    if (inputApplicationHandle != nullptr) {
        mFocusedApplicationHandlesByDisplay[displayId] = inputApplicationHandle;
    } else {
        mFocusedApplicationHandlesByDisplay.erase(displayId);
    }
    // 焦点应用变化时重置 ANR 计时
    resetNoFocusedWindowTimeoutLocked();
}
```

日志：`input_focus: displayId:0, focusApplication has changed to ActivityRecord{xxx}`

### 6.2 焦点请求处理

SurfaceFlinger 转发的焦点请求到达 `setFocusedWindow()`，交由 `FocusResolver` 解析：

```cpp
// InputDispatcher.cpp:7429
void InputDispatcher::setFocusedWindow(const FocusRequest& request) {
    { // acquire lock
        std::scoped_lock _l(mLock);
        std::optional<FocusResolver::FocusChanges> changes =
                mFocusResolver.setFocusedWindow(request,
                                                getWindowHandlesLocked(
                                                        ui::LogicalDisplayId{request.displayId}));
        ScopedSyntheticEventTracer traceContext(mTracer);
        if (changes) {
            onFocusChangedLocked(*changes, traceContext.getTracker());
        }
    } // release lock
    // Wake up poll loop since it may need to make new input dispatching choices.
    mLooper->wake();
}
```

日志：`input_focus: [Focus receive :xxx com.example.app/...Activity,reason=setFocusedWindow]`

### 6.3 焦点窗口判定：isTokenFocusable()

```cpp
// FocusResolver.cpp:168
Focusability FocusResolver::isTokenFocusable(
        const sp<IBinder>& token,
        const std::vector<sp<WindowInfoHandle>>& windows,
        sp<WindowInfoHandle>& outFocusableWindow) {
    bool allWindowsAreFocusable = true;
    bool windowFound = false;
    sp<WindowInfoHandle> visibleWindowHandle = nullptr;
    for (const sp<WindowInfoHandle>& window : windows) {
        if (window->getToken() != token) {
            continue;
        }
        windowFound = true;
        if (!window->getInfo()->inputConfig.test(
                gui::WindowInfo::InputConfig::NOT_VISIBLE)) {
            visibleWindowHandle = window;
        }
        if (window->getInfo()->inputConfig.test(
                gui::WindowInfo::InputConfig::NOT_FOCUSABLE)) {
            allWindowsAreFocusable = false;
            break;
        }
    }
    if (!windowFound) return Focusability::NO_WINDOW;
    if (!allWindowsAreFocusable) return Focusability::NOT_FOCUSABLE;
    if (!visibleWindowHandle) return Focusability::NOT_VISIBLE;

    outFocusableWindow = visibleWindowHandle;
    return Focusability::OK;
}
```

四种判定结果：
- **OK**：窗口存在 + 可见 + 可获焦 → 授予焦点
- **NO_WINDOW**：窗口不在列表中（Layer 被移除、生命周期未完成）
- **NOT_FOCUSABLE**：窗口存在但设置了 `NOT_FOCUSABLE`
- **NOT_VISIBLE**：窗口存在但不可见（**最常见的 ANR 根因**）

日志：
- 成功：`input_focus: [At display 0,focus update to xxx,from setFocusedWindow.]`
- 失败：`input_focus: [At display 0,ignore set focus to xxx,because NOT_VISIBLE,from setFocusedWindow.]`

### 6.4 getResolvedFocusWindow()

支持焦点转移链（一个窗口获焦后可将焦点转给另一个窗口）：

```cpp
// FocusResolver.cpp
Focusability FocusResolver::getResolvedFocusWindow(
        const sp<IBinder>& token,
        const std::vector<sp<WindowInfoHandle>>& windows,
        sp<WindowInfoHandle>& outFocusableWindow) {
    sp<IBinder> curFocusCandidate = token;
    bool focusedWindowFound = false;
    std::unordered_set<sp<IBinder>, SpHash<IBinder>> tokensReached;

    while (curFocusCandidate != nullptr
            && tokensReached.count(curFocusCandidate) == 0) {
        tokensReached.emplace(curFocusCandidate);
        Focusability result = isTokenFocusable(
                curFocusCandidate, windows, outFocusableWindow);
        if (result == Focusability::OK) {
            focusedWindowFound = true;
            curFocusCandidate = outFocusableWindow->getInfo()->focusTransferTarget;
        }
        if (!focusedWindowFound) {
            return result;
        }
    }
    return focusedWindowFound ? Focusability::OK : Focusability::NO_WINDOW;
}
```

### 6.5 窗口信息更新时的焦点重检查

当窗口列表变化时（`setInputWindows`），FocusResolver 会用之前保存的焦点请求重新检查：

```cpp
// FocusResolver.cpp
std::optional<FocusChanges> FocusResolver::setInputWindows(
        ui::LogicalDisplayId displayId,
        const std::vector<sp<WindowInfoHandle>>& windows) {
    const std::optional<FocusRequest> request = getFocusRequest(displayId);
    const sp<IBinder> currentFocus = getFocusedWindowToken(displayId);
    if (request) {
        sp<WindowInfoHandle> resolvedFocusWindow;
        Focusability result = getResolvedFocusWindow(
                request->token, windows, resolvedFocusWindow);
        // 如果窗口变为可见，焦点终于可以授予
        if (result == Focusability::OK
                && resolvedFocusWindow->getToken() == currentFocus) {
            return std::nullopt;  // 焦点未变
        }
        mLastFocusResultByDisplay[displayId] = result;
        if (result == Focusability::OK) {
            return updateFocusedWindow(displayId,
                    "Window became focusable. Previous reason: "
                    + ftl::enum_string(previousResult),
                    resolvedFocusWindow->getToken(),
                    resolvedFocusWindow->getName());
        }
        removeFocusReason = ftl::enum_string(result);
    }
    return updateFocusedWindow(displayId, removeFocusReason, nullptr);
}
```

**这是窗口绘制完成后焦点最终生效的关键时机**——窗口从 NOT_VISIBLE 变为可见，FocusResolver 检测到后授予焦点。

### 6.6 焦点结果处理

```cpp
// InputDispatcher.cpp:7448
void InputDispatcher::onFocusChangedLocked(
        const FocusResolver::FocusChanges& changes, ...) {
    if (changes.oldFocus) {
        // 为旧窗口发送 Cancel 事件 + Focus leaving
        CancelationOptions options(CancelationOptions::Mode::CANCEL_NON_POINTER_EVENTS,
                "focus left window", ...);
        synthesizeCancelationEventsForWindowLocked(..., options);
        enqueueFocusEventLocked(changes.oldFocus, false, changes.reason);
    }
    if (changes.newFocus) {
        // 重置 ANR 计时 + Focus entering
        resetNoFocusedWindowTimeoutLocked();
        enqueueFocusEventLocked(changes.newFocus, true, changes.reason);
    }
    disablePointerCaptureForcedLocked();
    if (mFocusedDisplayId == changes.displayId) {
        sendFocusChangedCommandLocked(changes.oldFocus, changes.newFocus);
    }
}
```

### 6.7 焦点事件派发

```cpp
// InputDispatcher.cpp:1819
void InputDispatcher::dispatchFocusLocked(nsecs_t currentTime,
        std::shared_ptr<const FocusEntry> entry) {
    std::shared_ptr<Connection> connection = getConnectionLocked(entry->connectionToken);
    if (connection == nullptr) return;
    entry->dispatchInProgress = true;
    std::string message = std::string("Focus ")
            + (entry->hasFocus ? "entering " : "leaving ")
            + connection->getInputChannelName();
    std::string reason = std::string("reason=").append(entry->reason);
    android_log_event_list(LOGTAG_INPUT_FOCUS) << message << reason << LOG_ID_EVENTS;
    dispatchEventLocked(currentTime, entry, {{connection}});
}
```

日志：
- `input_focus: [Focus entering xxx com.example.app/...Activity (server),reason=Window became focusable. Previous reason: NOT_VISIBLE]`
- `input_focus: [Focus leaving xxx com.example.app/...Activity (server),reason=NO_WINDOW]`

### 6.8 按键派发与 ANR 触发

![焦点授予与 ANR 触发流程](/img/android/anr/03_focus_grant_flow.svg)

```cpp
// InputDispatcher.cpp:2401
sp<WindowInfoHandle> InputDispatcher::findFocusedWindowTargetLocked(
        nsecs_t currentTime, const EventEntry& entry,
        nsecs_t& nextWakeupTime,
        InputEventInjectionResult& outInjectionResult) {
    outInjectionResult = InputEventInjectionResult::FAILED;
    ui::LogicalDisplayId displayId = getTargetDisplayId(entry);
    sp<WindowInfoHandle> focusedWindowHandle =
            getFocusedWindowHandleLocked(displayId);
    std::shared_ptr<InputApplicationHandle> focusedApplicationHandle =
            getValueByKey(mFocusedApplicationHandlesByDisplay, displayId);

    // 情况 1：无焦点应用 + 无焦点窗口 → 直接丢弃事件
    if (focusedWindowHandle == nullptr && focusedApplicationHandle == nullptr) {
        return nullptr;
    }

    // 情况 2：有焦点应用 + 无焦点窗口 → 等待/ANR
    if (focusedWindowHandle == nullptr && focusedApplicationHandle != nullptr) {
        if (!mNoFocusedWindowTimeoutTime.has_value()) {
            // 开始计时
            std::chrono::nanoseconds timeout =
                    focusedApplicationHandle->getDispatchingTimeout(
                            DEFAULT_INPUT_DISPATCHING_TIMEOUT);
            mNoFocusedWindowTimeoutTime = currentTime + timeout.count();
            mAwaitedFocusedApplication = focusedApplicationHandle;
            mAwaitedApplicationDisplayId = displayId;
            nextWakeupTime = std::min(nextWakeupTime, *mNoFocusedWindowTimeoutTime);
            outInjectionResult = InputEventInjectionResult::PENDING;
            return nullptr;
        } else if (currentTime > *mNoFocusedWindowTimeoutTime) {
            // 已超时，丢弃事件
            return nullptr;
        } else {
            // 继续等待
            outInjectionResult = InputEventInjectionResult::PENDING;
            return nullptr;
        }
    }

    // 情况 3：有焦点窗口 → 正常派发
    resetNoFocusedWindowTimeoutLocked();
    outInjectionResult = InputEventInjectionResult::SUCCEEDED;
    return focusedWindowHandle;
}
```

### 6.9 ANR 处理流程

```cpp
// InputDispatcher.cpp:1032
nsecs_t InputDispatcher::processAnrsLocked() {
    const nsecs_t currentTime = now();
    nsecs_t nextAnrCheck = LLONG_MAX;
    if (mNoFocusedWindowTimeoutTime.has_value()
            && mAwaitedFocusedApplication != nullptr) {
        if (currentTime >= *mNoFocusedWindowTimeoutTime) {
            processNoFocusedWindowAnrLocked();
            mAwaitedFocusedApplication.reset();
            mNoFocusedWindowTimeoutTime = std::nullopt;
            return LLONG_MIN;
        } else {
            nextAnrCheck = *mNoFocusedWindowTimeoutTime;
        }
    }
    // ... 其他 ANR 检查
}

// InputDispatcher.cpp:1056
void InputDispatcher::processNoFocusedWindowAnrLocked() {
    // Check if the application that we are waiting for is still focused.
    std::shared_ptr<InputApplicationHandle> focusedApplication =
            getValueByKey(mFocusedApplicationHandlesByDisplay,
                    mAwaitedApplicationDisplayId);
    if (focusedApplication == nullptr ||
        focusedApplication->getApplicationToken() !=
                mAwaitedFocusedApplication->getApplicationToken()) {
        return; // The focused application has changed.
    }
    const sp<WindowInfoHandle>& focusedWindowHandle =
            getFocusedWindowHandleLocked(mAwaitedApplicationDisplayId);
    if (focusedWindowHandle != nullptr) {
        return; // We now have a focused window. No need for ANR.
    }
    onAnrLocked(mAwaitedFocusedApplication);
}
```

`onAnrLocked()` 通过 policy 回调到 Java 侧，最终调用 `AnrController.notifyAppUnresponsive()`，弹出 ANR 对话框。

## 七、窗口绘制状态机

![窗口绘制状态机](/img/android/anr/02_draw_state_machine.svg)

### 7.1 五种状态

```java
// WindowStateAnimator.java:140
static final int NO_SURFACE = 0;       // 没有 Surface
static final int DRAW_PENDING = 1;     // Surface 已创建但未绘制，Surface 隐藏
static final int COMMIT_DRAW_PENDING = 2; // 首次绘制完成，Surface 待显示
static final int READY_TO_SHOW = 3;    // 绘制已提交，等待同 Token 所有窗口就绪
static final int HAS_DRAWN = 4;        // 窗口已在屏幕上显示
```

### 7.2 状态转换的完整代码路径

![绘制完成回调链](/img/android/anr/14_draw_complete_chain.svg)

#### DRAW_PENDING → COMMIT_DRAW_PENDING

```java
// WindowStateAnimator.java:231
boolean finishDrawingLocked(SurfaceControl.Transaction postDrawTransaction) {
    boolean layoutNeeded = false;
    if (mDrawState == DRAW_PENDING) {
        ProtoLog.v(WM_DEBUG_DRAW,
                "finishDrawingLocked: mDrawState=COMMIT_DRAW_PENDING %s in %s",
                mWin, mSurfaceController);
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

#### COMMIT_DRAW_PENDING → READY_TO_SHOW → HAS_DRAWN

```java
// WindowStateAnimator.java:274
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

// WindowState.java:5027
boolean performShowLocked() {
    if (!showToCurrentUser()) {
        return false;
    }
    logPerformShow("performShow on ");

    final int drawState = mWinAnimator.mDrawState;
    if ((drawState == HAS_DRAWN || drawState == READY_TO_SHOW)
            && mActivityRecord != null) {
        if (mAttrs.type != TYPE_APPLICATION_STARTING) {
            mActivityRecord.onFirstWindowDrawn(this);
        } else {
            mActivityRecord.onStartingWindowDrawn();
        }
    }
    if (mWinAnimator.mDrawState != READY_TO_SHOW || !isReadyForDisplay()) {
        return false;
    }
    logPerformShow("Showing ");

    mWmService.enableScreenIfNeededLocked();
    mWinAnimator.applyEnterAnimationLocked();
    mWinAnimator.mLastAlpha = -1;
    mWinAnimator.mDrawState = HAS_DRAWN;
    mWmService.scheduleAnimationLocked();
    // ...
    return true;
}
```

### 7.3 App 侧绘制完成回调链

```
App: ViewRootImpl.reportDrawFinished(t, seqId)
  → mWindowSession.finishDrawing(mWindow, t, seqId)    // Binder
    → Session.finishDrawing()
      → WMS.finishDrawingWindow(session, window, t, seqId)
        → win.finishDrawing(t, seqId)
          → mWinAnimator.finishDrawingLocked(t)         // DRAW_PENDING → COMMIT_DRAW_PENDING
        → mWindowPlacerLocked.requestTraversal()
          → commitFinishDrawingLocked()                  // → READY_TO_SHOW
            → performShowLocked()                        // → HAS_DRAWN
```

### 7.4 cancelDraw 机制

**DRAW_PENDING 卡住的最常见原因**是 `cancelDraw`：

```java
// ViewRootImpl.java:5017
mCheckIfCanDraw = isSyncRequest || cancelDraw;

boolean cancelDueToPreDrawListener = mAttachInfo.mTreeObserver.dispatchOnPreDraw();
boolean cancelAndRedraw = cancelDueToPreDrawListener
         || (cancelDraw && mDrewOnceForSync);

if (!cancelAndRedraw) {
    createSyncIfNeeded();       // 只有不取消时才创建同步
    notifyDrawStarted(...);
    mDrewOnceForSync = true;
} else if (cancelAndRedraw) {
    // 取消绘制，重新调度
    mLastPerformTraversalsSkipDrawReason = cancelDueToPreDrawListener
        ? "predraw_" + mAttachInfo.mTreeObserver.getLastDispatchOnPreDrawCanceledReason()
        : "cancel_" + cancelReason;
    scheduleTraversals();       // 重试
}
```

如果 `OnPreDrawListener.onPreDraw()` 返回 false（常见于共享元素过渡动画异常），`cancelAndRedraw` 为 true，`createSyncIfNeeded()` 不执行 → `reportDrawFinished()` 不会被调用 → WMS 永远收不到绘制完成通知 → 窗口停留在 **DRAW_PENDING**。

日志特征：`vri.reportNextDraw` 多次出现但无对应的 `vri.reportDrawFinished`。

### 7.5 渲染管线与绘制状态的关联

![渲染管线](/img/android/anr/08_rendering_pipeline.svg)

绘制状态的推进依赖 App 侧的渲染管线：

1. **Choreographer.doFrame()**：VSync 到达后，依次处理 Input → Animation → **Traversal** 回调
2. **performTraversals()** 中调用 `relayoutWindow()` → 触发 Surface 创建 → **DRAW_PENDING**
3. UIThread 完成 measure/layout/draw 后，通过 `postAndWait()` 将渲染任务交给 **RenderThread**
4. RenderThread 完成 GPU 渲染（syncFrameState → dequeueBuffer → renderFrame → queueBuffer）
5. 渲染完成后 `reportDrawFinished()` 通知 WMS → **COMMIT_DRAW_PENDING → READY_TO_SHOW → HAS_DRAWN**
6. SurfaceFlinger 合成上屏 → Layer 变为可见 → InputDispatcher 焦点生效

## 八、焦点切换全链路日志

### 8.1 正常焦点切换的完整日志序列

![焦点切换泳道图](/img/android/anr/05_focus_switching_flow.svg)

![Activity 启动焦点切换时间线](/img/android/anr/10_focus_timeline.svg)

以启动新 Activity 为例：

```
# 1. 暂停旧 Activity
wm_pause_activity: [0,...,com.example.oldapp/.OldActivity,userLeaving=true,...]
wm_on_paused_called: [0,...,com.example.oldapp.OldActivity,performPause,...]

# 2. 焦点离开旧窗口
input_focus: [Focus leaving xxx com.example.oldapp/...OldActivity (server),reason=NO_WINDOW]

# 3. 新 Activity 生命周期
wm_set_resumed_activity: [0,com.example.newapp/.NewActivity,...]
wm_on_create_called: [0,...,com.example.newapp.NewActivity,performCreate,...]
wm_on_start_called: [0,...,com.example.newapp.NewActivity,handleStartActivity,...]
wm_on_resume_called: [0,...,com.example.newapp.NewActivity,RESUME_ACTIVITY,...]

# 4. WMS 找到焦点窗口
WindowManager: wms.Input focus has changed to Window{xxx com.example.newapp/...NewActivity}

# 5. 焦点切换三步
input_focus: [Focus request xxx com.example.newapp/...NewActivity,reason=UpdateInputWindows]

# 6. 首帧绘制
vri.reportNextDraw ...
vri.reportDrawFinished ...
WindowManager: wms.finishDrawingLocked: mDrawState=COMMIT_DRAW_PENDING Window{xxx}
WindowManager: wms.showSurfaceRobustly mWin:Window{xxx}

# 7. SF 传递，Input 收到
input_focus: [Focus receive :xxx com.example.newapp/...NewActivity,reason=setFocusedWindow]
input_focus: [At display :0,Ignore setFocusedWindow :xxx,Reason = NOT_VISIBLE]

# 8. 窗口变为可见后焦点生效
input_focus: [At display :0,Focus update :xxx,reason=setInputWindows]
input_focus: [Focus entering xxx com.example.newapp/...NewActivity (server),
    reason=Window became focusable. Previous reason: NOT_VISIBLE]
```

### 8.2 正常 vs 异常日志对比

![正常 vs 异常焦点切换](/img/android/anr/16_normal_vs_abnormal_focus.svg)

**关键判断**：`Focus request` 和 `Focus entering` 应成对出现。只有 request 没有 entering → 焦点在 SF→Input 路径受阻。

### 8.3 Event Log 关键字

- `am_anr`：ANR 时间点和类型
- `ANR in`：具体 ANR 窗口和原因
- `input_focus`：焦点切换步骤
- `wm_on_resume_called`：Activity 生命周期
- `wm_set_resumed_activity`：焦点应用切换

### 8.4 Proto Log 调试

```bash
adb shell wm logging enable-text WM_DEBUG_FOCUS WM_DEBUG_FOCUS_LIGHT
```

输出每个窗口的遍历详情，包括 `canReceiveKeys` 结果和所有条件值。

## 九、ANR 分析方法

![ANR 排查决策树](/img/android/anr/09_anr_analysis_decision_tree.svg)

### 9.1 分析步骤

**第一步**：搜索 `am_anr` 确定 ANR 时间和窗口。

**第二步**：搜索 `wm_on_resume_called`，确认目标窗口是否到达 onResume。未到达 → NO_WINDOW 类型。

**第三步**：搜索 `input_focus`，检查 `Focus entering` 是否出现。出现 → 问题在应用自身。

**第四步**：检查 dump window 的 `mDrawState` 和 dump SurfaceFlinger 的 Layer 信息。

### 9.2 Layer 状态分析

![Layer 状态分析](/img/android/anr/15_layer_state_analysis.svg)

```
MI-SF : Print state of com.example.app/...Activity#258199
MI-SF : isVisibleForInput=0 hasInputInfo=1 canReceiveInput=0 isVisible=0
MI-SF : Parents states:
MI-SF : --9-- Display 0 name="Built-in"#1 flags=0x2 getAlpha=1.000
MI-SF :   ...
MI-SF : --3-- Task=6302#258182 flags=0x1 getAlpha=1.000    ← 末位奇数=hidden!
MI-SF :   ...
```

批量检索：`grep -rna -E "MI-SF   : --\d+-- .*flags=\d+[13579]" ./*`

### 9.3 系统负载指标（PSI）

```bash
adb shell cat /proc/pressure/cpu
# some avg10=8.23 avg60=7.89 avg300=10.58
# avg10 > 19 → 压力较大；> 80 → 严重
```

### 9.4 高温限频与拔核

壳温超 46°C → CPU 降频。日志中搜索 `VIRTUAL-SENSOR` 后的温度值（除以 1000）。`hotplug_cpuX=1` 表示核心 X 被暂停。

### 9.5 进程冻结

所有线程处于 `do_freezer_trap` 状态，无法执行生命周期回调。

## 十、常见问题分类

### 10.1 NO_WINDOW 类

- 生命周期未到达 onResume：进程启动慢、主线程阻塞
- 进程被冻结：`do_freezer_trap`
- 进程启动失败：ANR 报到上一个页面或桌面

### 10.2 NOT_VISIBLE 类

![NOT_VISIBLE 根因分类](/img/android/anr/18_not_visible_root_causes.svg)

- **DRAW_PENDING 卡住**：cancelDraw / 共享元素动画异常
- **COMMIT_DRAW_PENDING 卡住**：deferLayout 未恢复
- **READY_TO_SHOW 卡住**：mViewVisibility = GONE
- **Layer 被 hide**：Shell Transition 动画异常（详见 [Shell Transition 文档](./ShellTransition)）
- **Layer reparent 异常**：pendingTransaction vs syncTransaction 时序
- **Layer alpha=0**：小窗/自由窗口模式

### 10.3 多屏幕焦点异常

虚拟屏在栈顶时，主屏 `hasOwnFocus() == false`，即使窗口已 resume 也无法获焦。

### 10.4 PopupWindow 层级抢占

高层级类型的 PopupWindow 抢占焦点，前台 App 无法获焦。治理：设置 `FLAG_NOT_FOCUSABLE`。

## 十一、典型治理案例

### 11.1 动画堆积导致 Task Layer hide

**机制**：桌面/小窗产生大量 Transition 动画堆积（400+），新 Transition 无法 dispatch，异常 abort，Task Surface 留在 hide 状态。

**日志**：`dispatchReady: track.mReadyTransitions.size() > 1, return, size = 444`

**治理**：业务确保动画及时 finish，增加超时保护。详见 [Shell Transition 文档](./ShellTransition)。

### 11.2 窗口动画 reparent 异常

**机制**：Starting Window 退出动画用 `pendingTransaction`，取消动画用 `syncTransaction`。Shell 动画期间两者 apply 时序不确定 → WindowState 被 reparent 到已脱离层级的 leash。

**日志**：Layer 层级只有 2-3 级（animation-leash → WindowState → Surface）。

**治理**：确保使用一致的 Transaction 类型。

### 11.3 DRAW_PENDING 卡住：cancelDraw

**机制**：共享元素动画状态异常 → `OnPreDrawListener.onPreDraw()` 返回 false → `cancelAndRedraw = true` → `createSyncIfNeeded()` 不执行 → `reportDrawFinished()` 永远不会被调用。

**日志**：`vri.reportNextDraw` 多次但无 `vri.reportDrawFinished`。

**治理**：App 层确保动画状态正确；异常时清除动画状态。

### 11.4 COMMIT_DRAW_PENDING 卡住

**机制**：`finishDrawingLocked()` 推进到 COMMIT_DRAW_PENDING 后，`requestTraversal()` 需触发布局遍历。`deferLayout` 未恢复 → 布局被阻塞 → 状态无法推进。

**日志**：`ANR ... drawState=COMMIT_DRAW_PENDING`。长时间停留在此状态直到 ANR。

### 11.5 READY_TO_SHOW 卡住

**机制**：`performShowLocked()` 检查 `isReadyForDisplay()` 返回 false。常见原因：App 进程在 `onPause` 中调用 `Handler.removeCallbacksAndMessages(null)` 移除了 `MSG_DISPATCH_APP_VISIBILITY` 消息 → `mAppVisible` 未设为 true → `mViewVisibility = GONE`。

**日志**：`performShow on Window{xxx}: mDrawState=READY_TO_SHOW readyForDisplay=false ... mViewVisibility 8`（8 = View.GONE）。

### 11.6 多屏幕焦点切换异常

**机制**：虚拟屏在栈顶时 `topFocusedDisplayId` 已设为虚拟屏 ID。主屏 `hasOwnFocus() == false` → `findFocusedWindowIfNeeded()` 返回 null → 主屏无焦点窗口。此时如果有目标为主屏的按键/轨迹球事件 → ANR。

**日志**：`FocusedDisplayId: 3`，`displayId=0 ... result='NO_WINDOW'`。

### 11.7 PopupWindow 抢占焦点

**机制**：高层级 PopupWindow（如 `TYPE_STATUS_BAR_SUB_PANEL`）层级比普通 App 窗口高，焦点被抢占。前台 App 的 `mFocusedApp` 已设置但焦点窗口是 PopupWindow → App 窗口无法获焦。

**日志**：`currentFocus=Window{xxx PopupWindow:yyy}`，`focusedApp=ActivityRecord{zzz com.example.app/...}`（两者不匹配）。

**治理**：高层级窗口设置 `FLAG_NOT_FOCUSABLE`。

## 附录：关键文件索引

| 模块 | 文件路径 | 关键方法 |
|------|---------|---------|
| WMS | `services/.../wm/WindowManagerService.java` | `updateFocusedWindowLocked()` (7261) |
| WMS | `services/.../wm/RootWindowContainer.java` | `updateFocusedWindowLocked()` (602) |
| WMS | `services/.../wm/DisplayContent.java` | `updateFocusedWindowLocked()` (4581), `findFocusedWindow()` (4555), `mFindFocusedWindow` (940) |
| WMS | `services/.../wm/WindowState.java` | `canReceiveKeys()` (3300), `isVisibleRequestedOrAdding()` (2095), `performShowLocked()` (5027) |
| WMS | `services/.../wm/InputMonitor.java` | `requestFocus()` (573), `setInputFocusLw()` (417), `populateInputWindowHandle()` (271) |
| WMS | `services/.../wm/WindowStateAnimator.java` | `mDrawState` (140-164), `finishDrawingLocked()` (231), `commitFinishDrawingLocked()` (274) |
| Framework | `core/.../view/SurfaceControl.java` | `Transaction.setFocusedWindow()` (4682) |
| Framework | `core/.../view/ViewRootImpl.java` | `performTraversals()` (4086), `reportDrawFinished()` (5971) |
| JNI | `core/jni/android_view_SurfaceControl.cpp` | `nativeSetFocusedWindow()` (2297) |
| Native | `native/.../gui/SurfaceComposerClient.cpp` | `Transaction::setFocusedWindow()` (2205) |
| SF | `native/.../surfaceflinger/SurfaceFlinger.cpp` | `updateInputFlinger()` (5595), `addInputWindowCommands()` (8220) |
| Input | `native/.../inputflinger/dispatcher/InputDispatcher.cpp` | `setFocusedWindow()`, `findFocusedWindowTargetLocked()`, `processNoFocusedWindowAnrLocked()` |
| Input | `native/.../inputflinger/dispatcher/FocusResolver.cpp` | `isTokenFocusable()`, `setInputWindows()`, `setFocusedWindow()` |
