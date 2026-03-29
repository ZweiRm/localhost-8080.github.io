---
prev:
    text: 'Android Input 系统'
    link: '/framework/input-system'
next:
    text: 'performTraversal'
    link: '/framework/performTraversal'
---

# 无焦点窗口 ANR

本文档聚焦 Android 无焦点窗口 ANR 的治理：ANR 触发与检测机制、窗口绘制状态机、关键日志与排查方法，以及典型治理案例。

焦点窗口切换的完整链路（WMS → SurfaceFlinger → InputDispatcher → App）详见 [焦点窗口切换](./focus-window-switching)。

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

- **焦点应用（mFocusedApp）**：Activity 切换为 top resumed 时设置，低于它的窗口不能成为焦点窗口
- **焦点窗口（mCurrentFocus）**：由 WMS 遍历窗口树确定，同一屏幕同一时间最多一个

> 焦点应用与焦点窗口的详细说明、焦点切换的完整链路（WMS → SurfaceFlinger → InputDispatcher → App）、以及查看焦点窗口的调试方法，详见 [焦点窗口切换](./focus-window-switching)。

## 三、焦点切换链路概要

焦点窗口的确定涉及 WMS、SurfaceFlinger、InputDispatcher 三个模块的协作。完整链路如下：

1. **WMS**：`updateFocusedWindowLocked()` → `findFocusedWindow()` → 遍历窗口树，通过 `canReceiveKeys()` 找到第一个可获焦窗口
2. **InputMonitor**：`setInputFocusLw()` → `requestFocus()` → 通过 `SurfaceControl.Transaction.setFocusedWindow()` 写入焦点请求
3. **SurfaceFlinger**：`updateInputFlinger()` → 根据 Layer 实际可见性（flags、alpha、父 Layer）校验窗口状态，将焦点请求转发给 InputDispatcher
4. **InputDispatcher**：`FocusResolver.isTokenFocusable()` 判定窗口是否满足焦点条件（OK / NO_WINDOW / NOT_FOCUSABLE / NOT_VISIBLE），满足则通过 `dispatchFocusLocked()` 授予焦点
5. **App**：`InputEventReceiver.onFocusEvent()` → `ViewRootImpl.handleWindowFocusChanged()` → `Activity.onWindowFocusChanged()`

> 以上每个环节的详细代码路径、判定逻辑和调试方法，详见 [焦点窗口切换](./focus-window-switching)。

日志：`wms.Input focus has changed to Window{xxx} display=0`

## 四、按键派发中的 ANR 触发

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

### 4.1 ANR 处理流程

```cpp
// InputDispatcher.cpp:1082
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

## 五、窗口绘制状态机

![窗口绘制状态机](/img/android/anr/02_draw_state_machine.svg)

### 5.1 五种状态

```java
// WindowStateAnimator.java:140
static final int NO_SURFACE = 0;       // 没有 Surface
static final int DRAW_PENDING = 1;     // Surface 已创建但未绘制，Surface 隐藏
static final int COMMIT_DRAW_PENDING = 2; // 首次绘制完成，Surface 待显示
static final int READY_TO_SHOW = 3;    // 绘制已提交，等待同 Token 所有窗口就绪
static final int HAS_DRAWN = 4;        // 窗口已在屏幕上显示
```

### 5.2 状态转换的完整代码路径

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
// WindowStateAnimator.java:275
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

### 5.3 App 侧绘制完成回调链

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

### 5.4 cancelDraw 机制

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

### 5.5 渲染管线与绘制状态的关联

![渲染管线](/img/android/anr/08_rendering_pipeline.svg)

绘制状态的推进依赖 App 侧的渲染管线：

1. **Choreographer.doFrame()**：VSync 到达后，依次处理 Input → Animation → **Traversal** 回调
2. **performTraversals()** 中调用 `relayoutWindow()` → 触发 Surface 创建 → **DRAW_PENDING**
3. UIThread 完成 measure/layout/draw 后，通过 `postAndWait()` 将渲染任务交给 **RenderThread**
4. RenderThread 完成 GPU 渲染（syncFrameState → dequeueBuffer → renderFrame → queueBuffer）
5. 渲染完成后 `reportDrawFinished()` 通知 WMS → **COMMIT_DRAW_PENDING → READY_TO_SHOW → HAS_DRAWN**
6. SurfaceFlinger 合成上屏 → Layer 变为可见 → InputDispatcher 焦点生效

---

## 六、焦点切换日志与 ANR 诊断

> 焦点切换的完整日志序列详见 [焦点窗口切换 §八](./focus-window-switching#八焦点切换全链路日志)。以下聚焦于 ANR 诊断相关的日志分析。

### 6.1 正常焦点切换的完整日志序列

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

# 5. 焦点切换两步
input_focus: [Focus request xxx com.example.newapp/...NewActivity,reason=UpdateInputWindows]

# 6. 首帧绘制
vri.reportNextDraw ...
vri.reportDrawFinished ...
WindowManager: wms.finishDrawingLocked: mDrawState=COMMIT_DRAW_PENDING Window{xxx}
WindowManager: wms.showSurfaceRobustly mWin:Window{xxx}

# 7. SF 传递焦点请求，Input 判定 NOT_VISIBLE
# FocusResolver 判定窗口不可见，焦点暂不授予（此步 AOSP 不产生 input_focus event log）

# 8. 窗口变为可见后焦点生效
input_focus: [Focus entering xxx com.example.newapp/...NewActivity (server),
    reason=Window became focusable. Previous reason: NOT_VISIBLE]
```

### 6.2 正常 vs 异常日志对比

![正常 vs 异常焦点切换](/img/android/anr/16_normal_vs_abnormal_focus.svg)

**关键判断**：`Focus request` 和 `Focus entering` 应成对出现。只有 request 没有 entering → 焦点在 SF→Input 路径受阻。

### 6.3 Event Log 关键字

- `am_anr`：ANR 时间点和类型
- `ANR in`：具体 ANR 窗口和原因
- `input_focus`：焦点切换步骤
- `wm_on_resume_called`：Activity 生命周期
- `wm_set_resumed_activity`：焦点应用切换

### 6.4 Proto Log 调试

```bash
adb shell wm logging enable-text WM_DEBUG_FOCUS WM_DEBUG_FOCUS_LIGHT
```

输出每个窗口的遍历详情，包括 `canReceiveKeys` 结果和所有条件值。

## 九、ANR 分析方法

## 七、ANR 分析方法

![ANR 排查决策树]((/img/android/anr/09_anr_analysis_decision_tree.svg)

### 7.1 分析步骤

**第一步**：搜索 `am_anr` 确定 ANR 时间和窗口。

**第二步**：搜索 `wm_on_resume_called`，确认目标窗口是否到达 onResume。未到达 → NO_WINDOW 类型。

**第三步**：搜索 `input_focus`，检查 `Focus entering` 是否出现。出现 → 问题在应用自身。

**第四步**：检查 dump window 的 `mDrawState` 和 dump SurfaceFlinger 的 Layer 信息。

### 7.2 Layer 状态分析

通过 `dumpsys SurfaceFlinger` 检查目标窗口对应 Layer 及其父 Layer 的可见性状态。关键信息：

```bash
adb shell dumpsys SurfaceFlinger --list   # 列出所有 Layer
adb shell dumpsys SurfaceFlinger           # 完整 dump，搜索目标窗口 Layer
```

在 dump 输出中关注以下字段：

- **flags**：末位为奇数表示 hidden（如 `0x1`、`0x3`、`0x103`）
- **alpha**：`0` 表示完全透明
- **父 Layer 状态**：父 Layer hidden 或 alpha=0 会导致子 Layer 不可见

示例（从 `dumpsys SurfaceFlinger` 输出中截取）：

```
+ Layer (Task=6302#258182) uid=1000
  ...
  flags=0x00000001    ← 末位奇数=hidden!
  ...
```

如果目标窗口的 Layer 本身状态正常，需逐级检查父 Layer 是否被 hide。

### 7.3 系统负载指标（PSI）

```bash
adb shell cat /proc/pressure/cpu
# some avg10=8.23 avg60=7.89 avg300=10.58
# avg10 > 19 → 压力较大；> 80 → 严重
```

### 7.4 高温限频与拔核

设备温度过高时，系统会进行 CPU 降频或拔核以降温。可通过以下方式检查：

```bash
adb shell dumpsys thermalservice   # 查看热状态
adb shell cat /sys/class/thermal/thermal_zone*/temp   # 查看各热区温度
```

日志中搜索 `thermal` 相关关键字。CPU 核心被暂停（hotplug offline）时，对应核心的状态为 offline。

### 7.5 进程冻结

所有线程处于 `do_freezer_trap` 状态，无法执行生命周期回调。

## 十、常见问题分类

## 八、常见问题分类

### 8.1 NO_WINDOW 类

- 生命周期未到达 onResume：进程启动慢、主线程阻塞
- 进程被冻结：`do_freezer_trap`
- 进程启动失败：ANR 报到上一个页面或桌面

### 8.2 NOT_VISIBLE 类

![NOT_VISIBLE 根因分类](/img/android/anr/18_not_visible_root_causes.svg)

- **DRAW_PENDING 卡住**：cancelDraw / 共享元素动画异常
- **COMMIT_DRAW_PENDING 卡住**：deferLayout 未恢复
- **READY_TO_SHOW 卡住**：mViewVisibility = GONE
- **Layer 被 hide**：Shell Transition 动画异常（详见 [Shell Transition 文档](/framework/ShellTransition)）
- **Layer reparent 异常**：pendingTransaction vs syncTransaction 时序
- **Layer alpha=0**：小窗/自由窗口模式

### 8.3 多屏幕焦点异常

虚拟屏在栈顶时，主屏 `hasOwnFocus() == false`，即使窗口已 resume 也无法获焦。

### 8.4 PopupWindow 层级抢占

高层级类型的 PopupWindow 抢占焦点，前台 App 无法获焦。治理：设置 `FLAG_NOT_FOCUSABLE`。

## 十一、典型治理案例

## 九、典型治理案例

### 9.1 动画堆积导致 Task Layer hide

**机制**：桌面/小窗产生大量 Transition 动画堆积（400+），新 Transition 无法 dispatch，异常 abort，Task Surface 留在 hide 状态。

**日志**：`dispatchReady: track.mReadyTransitions.size() > 1, return, size = 444`

**治理**：业务确保动画及时 finish，增加超时保护。详见 [Shell Transition 文档](/framework/ShellTransition)。

### 9.2 窗口动画 reparent 异常

**机制**：Starting Window 退出动画用 `pendingTransaction`，取消动画用 `syncTransaction`。Shell 动画期间两者 apply 时序不确定 → WindowState 被 reparent 到已脱离层级的 leash。

**日志**：Layer 层级只有 2-3 级（animation-leash → WindowState → Surface）。

**治理**：确保使用一致的 Transaction 类型。

### 9.3 DRAW_PENDING 卡住：cancelDraw

**机制**：共享元素动画状态异常 → `OnPreDrawListener.onPreDraw()` 返回 false → `cancelAndRedraw = true` → `createSyncIfNeeded()` 不执行 → `reportDrawFinished()` 永远不会被调用。

**日志**：`vri.reportNextDraw` 多次但无 `vri.reportDrawFinished`。

**治理**：App 层确保动画状态正确；异常时清除动画状态。

### 9.4 COMMIT_DRAW_PENDING 卡住

**机制**：`finishDrawingLocked()` 推进到 COMMIT_DRAW_PENDING 后，`requestTraversal()` 需触发布局遍历。`deferLayout` 未恢复 → 布局被阻塞 → 状态无法推进。

**日志**：`ANR ... drawState=COMMIT_DRAW_PENDING`。长时间停留在此状态直到 ANR。

### 9.5 READY_TO_SHOW 卡住

**机制**：`performShowLocked()` 检查 `isReadyForDisplay()` 返回 false。常见原因：App 进程在 `onPause` 中调用 `Handler.removeCallbacksAndMessages(null)` 移除了 `MSG_DISPATCH_APP_VISIBILITY` 消息 → `mAppVisible` 未设为 true → `mViewVisibility = GONE`。

**日志**：`performShow on Window{xxx}: mDrawState=READY_TO_SHOW readyForDisplay=false ... mViewVisibility 8`（8 = View.GONE）。

### 9.6 多屏幕焦点切换异常

**机制**：虚拟屏在栈顶时 `topFocusedDisplayId` 已设为虚拟屏 ID。主屏 `hasOwnFocus() == false` → `findFocusedWindowIfNeeded()` 返回 null → 主屏无焦点窗口。此时如果有目标为主屏的按键/轨迹球事件 → ANR。

**日志**：`FocusedDisplayId: 3`，`displayId=0 ... result='NO_WINDOW'`。

### 9.7 PopupWindow 抢占焦点

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
| WMS | `services/.../wm/WindowStateAnimator.java` | `mDrawState` (140-164), `finishDrawingLocked()` (231), `commitFinishDrawingLocked()` (275) |
| Framework | `core/.../view/SurfaceControl.java` | `Transaction.setFocusedWindow()` (4682) |
| Framework | `core/.../view/ViewRootImpl.java` | `performTraversals()` (4086), `reportDrawFinished()` (5971) |
| JNI | `core/jni/android_view_SurfaceControl.cpp` | `nativeSetFocusedWindow()` (2297) |
| Native | `native/.../gui/SurfaceComposerClient.cpp` | `Transaction::setFocusedWindow()` (2205) |
| SF | `native/.../surfaceflinger/SurfaceFlinger.cpp` | `updateInputFlinger()` (5595), `addInputWindowCommands()` (8220) |
| Input | `native/.../inputflinger/dispatcher/InputDispatcher.cpp` | `setFocusedWindow()`, `findFocusedWindowTargetLocked()`, `processNoFocusedWindowAnrLocked()` |
| Input | `native/.../inputflinger/dispatcher/FocusResolver.cpp` | `isTokenFocusable()`, `setInputWindows()`, `setFocusedWindow()` |
