---
prev:
    text: 'Organizer 机制'
    link: '/framework/wms-organizer'
next:
    text: '属性动画'
    link: '/framework/android-property-animation'
---

# Keyguard 锁屏与解锁机制

本文档基于 AOSP Android V 源码，梳理锁屏（Keyguard）机制的完整流程，包括息屏锁屏、解锁、锁屏遮挡（Occlude/UnOcclude）以及与 SleepToken 和 Shell Transition 系统的协作。

## 关键组件概览

### KeyguardController

`KeyguardController` 是 Keyguard 在 system_server 侧的核心控制器，位于 `com.android.server.wm` 包。它维护每个 Display 的锁屏状态，管理 SleepToken 的获取与释放，并负责触发各种 Keyguard 相关的 Transition。

### KeyguardDisplayState

`KeyguardDisplayState` 是 `KeyguardController` 的内部类，为每个 Display 维护独立的锁屏状态。

```java
// KeyguardController.java line 619
private static class KeyguardDisplayState {
    private final int mDisplayId;
    private boolean mKeyguardShowing;      // 锁屏是否正在显示
    private boolean mAodShowing;           // AOD（息屏显示）是否正在显示
    private boolean mKeyguardGoingAway;    // 锁屏是否正在消失（解锁动画中）
    private boolean mDismissalRequested;   // 是否请求了解除锁屏
    private boolean mOccluded;             // 锁屏是否被 Activity 遮挡
    private ActivityRecord mTopOccludesActivity;      // 遮挡锁屏的 Activity
    private ActivityRecord mDismissingKeyguardActivity; // 请求解除锁屏的 Activity
    private ActivityRecord mTopTurnScreenOnActivity;    // 请求亮屏的 Activity
    private boolean mRequestDismissKeyguard;
    private final ActivityTaskManagerService mService;
    private final ActivityTaskManagerInternal.SleepTokenAcquirer mSleepTokenAcquirer;
}
```

这些状态变量之间的关系通过以下状态机描述：

![KeyguardDisplayState 状态机](/img/android/keyguard/01_keyguard_state_machine.svg)

## SleepToken 机制

SleepToken 用于控制 Display 的 sleep 状态。当任意 SleepToken 存在时，`DisplayContent.shouldSleep()` 返回 true，Activity 将被 pause。

### 两种 SleepToken

系统中存在两种 tag 的 SleepToken，分别由不同组件管理：

```java
// 1. "keyguard" — 锁屏时 acquire，解锁/被遮挡时 release
// KeyguardController.java line 76, 94
static final String KEYGUARD_SLEEP_TOKEN_TAG = "keyguard";
mSleepTokenAcquirer = mService.new SleepTokenAcquirerImpl(KEYGUARD_SLEEP_TOKEN_TAG);

// 2. "Display-off" — 灭屏时 acquire，亮屏时 release
// RootWindowContainer.java line 235, 594
private static final String DISPLAY_OFF_SLEEP_TOKEN_TAG = "Display-off";
mDisplayOffTokenAcquirer = mService.new SleepTokenAcquirerImpl(DISPLAY_OFF_SLEEP_TOKEN_TAG);
```

`PhoneWindowManager` 中的 `mScreenOffSleepTokenAcquirer` 实际是通过 `DisplayPolicy.getScreenOffSleepTokenAcquirer()` 获取的，返回的就是 `RootWindowContainer.mDisplayOffTokenAcquirer`（tag = "Display-off"）：

```java
// PhoneWindowManager.java line 2334
mScreenOffSleepTokenAcquirer = mDefaultDisplayPolicy.getScreenOffSleepTokenAcquirer();

// DisplayPolicy.java line 1090
public ActivityTaskManagerInternal.SleepTokenAcquirer getScreenOffSleepTokenAcquirer() {
    return mService.mRoot.mDisplayOffTokenAcquirer;  // 返回 "Display-off" acquirer
}
```

![SleepToken 核心流程时序图](/img/android/keyguard/02_sleeptoken_overview.svg)

### SleepToken 核心判断

```java
// DisplayContent.java line 7457
boolean shouldSleep() {
    return (getRootTaskCount() == 0 || !mAllSleepTokens.isEmpty())
            && (mAtmService.mRunningVoice == null);
}
```

满足以下两个条件即进入 sleep：
1. RootTask 个数为 0 **或者** SleepToken 列表非空
2. 没有正在运行的语音交互（如通话）

### updateKeyguardSleepToken

`KeyguardController` 通过此方法决定是否持有 keyguard 类型的 SleepToken：

```java
// KeyguardController.java line 553
private void updateKeyguardSleepToken(int displayId) {
    final KeyguardDisplayState state = getDisplayState(displayId);
    if (isKeyguardUnoccludedOrAodShowing(displayId)) {
        state.mSleepTokenAcquirer.acquire(displayId);  // 锁屏未被遮挡 → 持有 token
    } else {
        state.mSleepTokenAcquirer.release(displayId);  // 解锁/被遮挡 → 释放 token
    }
}
```

判断条件：

```java
// KeyguardController.java line 122
boolean isKeyguardUnoccludedOrAodShowing(int displayId) {
    final KeyguardDisplayState state = getDisplayState(displayId);
    if (displayId == DEFAULT_DISPLAY && state.mAodShowing) {
        return !state.mKeyguardGoingAway;
    }
    return isKeyguardOrAodShowing(displayId);
}

boolean isKeyguardOrAodShowing(int displayId) {
    final KeyguardDisplayState state = getDisplayState(displayId);
    return (state.mKeyguardShowing || state.mAodShowing)
            && !state.mKeyguardGoingAway
            && !state.mOccluded;
}
```

### SLEEP 与 WAKE Transition

当 SleepToken 状态变化时，`RootWindowContainer.applySleepTokens()` 会创建 SLEEP 或 WAKE Transition：

- **SLEEP Transition**（`TRANSIT_SLEEP = 12`）：延迟 1 秒创建，用于通知 Shell 停止所有动画
- **WAKE Transition**（`TRANSIT_WAKE = 11`）：所有 SleepToken 清空且无正在收集的 Transition 时创建

```java
// RootWindowContainer.java line 3112 — applySleepTokens 中的关键逻辑
// 创建 SLEEP Transition（延迟 1s）
if (displayShouldSleep && !display.mAllSleepTokens.isEmpty()) {
    mHandler.sendMessageDelayed(
            mHandler.obtainMessage(MSG_SEND_SLEEP_TRANSITION, display),
            SLEEP_TRANSITION_WAIT_MILLIS);  // 1000ms
}

// 创建 WAKE Transition
if (!displayShouldSleep && !display.mTransitionController.isCollecting()) {
    int transit = TRANSIT_NONE;
    if (display.isKeyguardOccluded()) {
        transit = WindowManager.TRANSIT_KEYGUARD_OCCLUDE;
    }
    if (wasSleeping) {
        transit = TRANSIT_WAKE;
    }
    display.mTransitionController.requestStartTransition(
            display.mTransitionController.createTransition(transit, flags),
            startTask, null, null);
}
```

**什么情况下不会创建 WAKE Transition**：在解锁场景中，亮屏时先释放 ScreenOff token 但此时还有 keyguard token；解锁时释放 keyguard token 但此时已有 Transition 在收集。因此在有锁屏的正常解锁场景中，不会创建 WAKE Transition。

## 息屏流程

![息屏核心流程](/img/android/keyguard/03_screen_off_flow.svg)

### 调用链

息屏时的 SleepToken 和可见性更新链路：

```
PMS 发出 MSG_UPDATE_POWER_STATE
  → DisplayPowerController.updatePowerStateInternal()
    → animateScreenStateChange() → setScreenState()
      → PhoneWindowManager.screenTurnedOff()
        → updateScreenOffSleepToken(true)
          → mScreenOffSleepTokenAcquirer.acquire("ScreenOff")
            → RootWindowContainer.createSleepToken()
              → ATMS.updateSleepIfNeededLocked()
                → mSleeping = true
                → goingToSleepLocked()
                  → applySleepTokens(false)
                  → checkReadyForSleepLocked()
                    → putTasksToSleep()
                      → goToSleepIfPossible()
                        → sleepIfPossible()
                          → startPausing() — pause 当前 Activity
                          → updateActivityVisibilities() — 更新可见性
```

### Activity Pause 与可见性更新

`sleepIfPossible` 做两件事：

```java
// TaskFragment.java line 1096
boolean sleepIfPossible(boolean shuttingDown) {
    boolean shouldSleep = true;
    if (mResumedActivity != null) {
        // 当前有 Activity 处于 resumed 状态，需要先 pause
        startPausing(false /* userLeaving */, true /* uiSleeping */,
                null /* resuming */, "sleep");
        shouldSleep = false;
    }
    // ...
    if (shouldSleep) {
        // pause 完成后，更新可见性（会更新 mOccluded）
        updateActivityVisibilities(null, 0, !PRESERVE_WINDOWS, true);
    }
    return shouldSleep;
}
```

需要注意的是，`startPausing` 和 `updateActivityVisibilities` 在 WindowManagerState 树中的**不同叶子节点**下执行。这是因为遍历采用 `forAllRootTasks` 从 Z-order 顶部向下逐个节点处理。

### 锁屏 Binder Call 到 ATMS

与息屏同步进行的是 SystemUI 侧的锁屏流程。当 Keyguard 需要显示时：

```
KeyguardViewMediator.onFinishedGoingToSleep()
  → maybeHandlePendingLock()
    → doKeyguardLocked()
      → showLocked()
        → handleShow()
          → setShowingLocked(true)
            → updateActivityLockScreenState(true, aodShowing)
              → ActivityTaskManager.getService().setLockScreenShown(true, aodShowing)
                  ↓ (Binder call 到 system_server)
                ATMS.setLockScreenShown()
                  → KeyguardController.setKeyguardShown()
```

## Keyguard Appearing Transition

当 Keyguard 需要显示时，`setKeyguardShown` 处理 Appearing 转换：

```java
// KeyguardController.java line 173
void setKeyguardShown(int displayId, boolean keyguardShowing, boolean aodShowing) {
    // ...
    state.mKeyguardShowing = keyguardShowing;  // line 230
    state.mAodShowing = aodShowing;            // line 231

    if (keyguardChanged) {
        state.mKeyguardGoingAway = false;  // line 235 — 重置 goingAway 状态
        if (keyguardShowing) {
            state.mDismissalRequested = false;
        }
        if (goingAwayRemoved
                || (Flags.keyguardAppearTransition() && keyguardShowing
                        && !Display.isOffState(dc.getDisplayInfo().state))) {
            // 请求 Keyguard Appearing Transition
            transitionDc.requestTransitionAndLegacyPrepare(
                    TRANSIT_TO_FRONT, TRANSIT_FLAG_KEYGUARD_APPEARING);  // line 247-248
            // ...
            transitionDc.executeAppTransition();
        }
    }

    updateKeyguardSleepToken();  // line 258 — 获取 keyguard SleepToken
    mRootWindowContainer.ensureActivitiesVisible();  // line 259
}
```

**Transition 类型**：`TRANSIT_TO_FRONT` + `TRANSIT_FLAG_KEYGUARD_APPEARING`

**状态变化**：
- `mKeyguardShowing = true`
- `mKeyguardGoingAway = false`（重置）
- 获取 keyguard SleepToken

## 解锁流程（Keyguard Going Away）

![解锁核心流程](/img/android/keyguard/04_unlock_flow.svg)

### keyguardGoingAway 完整流程

指纹认证成功后，SystemUI 通过 Binder 调用 `ATMS.keyguardGoingAway(flags)`：

```java
// KeyguardController.java line 283
void keyguardGoingAway(int displayId, int flags) {
    final KeyguardDisplayState state = getDisplayState(displayId);
    if (!state.mKeyguardShowing || state.mKeyguardGoingAway) {
        return;  // 如果锁屏未显示或已在 goingAway，直接返回
    }
    mService.deferWindowLayout();
    state.mKeyguardGoingAway = true;  // line 290

    try {
        EventLogTags.writeWmSetKeyguardShown(displayId,
                state.mKeyguardShowing ? 1 : 0, state.mAodShowing ? 1 : 0,
                1 /* keyguardGoingAway */, state.mOccluded ? 1 : 0,
                "keyguardGoingAway");

        final int transitFlags = convertTransitFlags(flags);  // line 299
        final DisplayContent dc = mRootWindowContainer.getDefaultDisplay();

        // Legacy transition
        dc.prepareAppTransition(TRANSIT_KEYGUARD_GOING_AWAY, transitFlags);
        // Shell transition（新版本优先使用）
        dc.mAtmService.getTransitionController().requestTransitionIfNeeded(
                TRANSIT_TO_BACK, transitFlags, null, dc);  // line 305-306

        updateKeyguardSleepToken();  // 释放 keyguard SleepToken
        mRootWindowContainer.resumeFocusedTasksTopActivities();  // 恢复栈顶 Activity
        mRootWindowContainer.ensureActivitiesVisible();
        mRootWindowContainer.addStartingWindowsForVisibleActivities();
        mWindowManager.executeAppTransition();
    } finally {
        mService.continueWindowLayout();
    }
}
```

### Flag 转换

```java
// KeyguardController.java line 345
private int convertTransitFlags(int keyguardGoingAwayFlags) {
    int result = TRANSIT_FLAG_KEYGUARD_GOING_AWAY;
    if ((keyguardGoingAwayFlags & KEYGUARD_GOING_AWAY_FLAG_TO_SHADE) != 0) {
        result |= TRANSIT_FLAG_KEYGUARD_GOING_AWAY_TO_SHADE;
    }
    if ((keyguardGoingAwayFlags & KEYGUARD_GOING_AWAY_FLAG_NO_WINDOW_ANIMATIONS) != 0) {
        result |= TRANSIT_FLAG_KEYGUARD_GOING_AWAY_NO_ANIMATION;
    }
    if ((keyguardGoingAwayFlags & KEYGUARD_GOING_AWAY_FLAG_WITH_WALLPAPER) != 0) {
        result |= TRANSIT_FLAG_KEYGUARD_GOING_AWAY_WITH_WALLPAPER;
    }
    if ((keyguardGoingAwayFlags & KEYGUARD_GOING_AWAY_FLAG_SUBTLE_WINDOW_ANIMATIONS) != 0) {
        result |= TRANSIT_FLAG_KEYGUARD_GOING_AWAY_SUBTLE_ANIMATION;
    }
    if ((keyguardGoingAwayFlags & KEYGUARD_GOING_AWAY_FLAG_TO_LAUNCHER_CLEAR_SNAPSHOT) != 0) {
        result |= TRANSIT_FLAG_KEYGUARD_GOING_AWAY_TO_LAUNCHER_CLEAR_SNAPSHOT;
    }
    return result;
}
```

**Transition 类型**：
- Legacy: `TRANSIT_KEYGUARD_GOING_AWAY`
- Shell: `TRANSIT_TO_BACK` + `TRANSIT_FLAG_KEYGUARD_GOING_AWAY`（及各修饰 flag）

### 解锁过程中的 SleepToken 变化

解锁时释放 keyguard SleepToken 后，`removeSleepToken` 触发 `updateSleepIfNeededLocked`：

```java
// ActivityTaskManagerService.java line 5931
void updateSleepIfNeededLocked() {
    final boolean shouldSleep = !mRootWindowContainer.hasAwakeDisplay();
    final boolean wasSleeping = mSleeping;

    if (!shouldSleep) {
        if (wasSleeping) {
            mSleeping = false;
            mTopProcessState = ActivityManager.PROCESS_STATE_TOP;
            mTaskSupervisor.comeOutOfSleepIfNeededLocked();
        }
        mRootWindowContainer.applySleepTokens(true /* applyToRootTasks */);
    }
    // ...
}
```

`applySleepTokens(true)` 在此场景中会恢复 Activity 状态：

```java
// RootWindowContainer.java line 3112 — applySleepTokens 中恢复 Activity
display.forAllRootTasks(rootTask -> {
    rootTask.forAllLeafTasksAndLeafTaskFragments(
            taskFragment -> taskFragment.awakeFromSleeping(),
            true /* traverseTopToBottom */);
    if (rootTask.isFocusedRootTaskOnDisplay()
            && !mTaskSupervisor.getKeyguardController()
            .isKeyguardOrAodShowing(display.mDisplayId)) {
        rootTask.resumeTopActivityUncheckedLocked(null, null);
    }
    rootTask.ensureActivitiesVisible(null);
});
```

### 壁纸处理

解锁过程中壁纸的显示/隐藏由 `WallpaperController.adjustWallpaperWindows()` 控制。此方法在 `DisplayContent.applySurfaceChangesTransaction()` 中被调用：

```java
// WallpaperController.java line 1034
void adjustWallpaperWindows() {
    mDisplayContent.mWallpaperMayChange = false;

    // 1. 查找需要壁纸的目标窗口
    findWallpaperTarget();
    // 2. 根据查找结果更新 mWallpaperTarget
    updateWallpaperWindowsTarget(mFindResults);
    WallpaperWindowToken token = getTokenForTarget(mWallpaperTarget);

    // 3. mWallpaperTarget 不为 null 则壁纸可见
    final boolean visible = token != null;
    // ...
    // 4. 更新壁纸的可见性
    updateWallpaperTokens(visible, mDisplayContent.isKeyguardLocked());
}
```

关键数据结构 `FindWallpaperTargetResult` 中：
- `mTopHideWhenLockedWallpaper`：桌面壁纸（锁屏时不可见的壁纸）
- `mTopShowWhenLockedWallpaper`：共享壁纸（锁屏和桌面都可见的壁纸）
- `useTopWallpaperAsTarget`：当找不到目标窗口但需要显示壁纸时使用

壁纸 Surface 的 show/hide 在 `WindowStateAnimator.prepareSurfaceLocked()` 中处理：

```java
// WindowStateAnimator.java line 480
void prepareSurfaceLocked(SurfaceControl.Transaction t) {
    final WindowState w = mWin;
    // ...
    if (!w.isOnScreen()) {
        hide(t, "prepareSurfaceLocked");  // 不可见时直接 hide
        // ...
    } else if (mLastAlpha != mShownAlpha || mLastHidden) {
        mLastAlpha = mShownAlpha;
        boolean prepared =
            mSurfaceController.prepareToShowInTransaction(t, mShownAlpha);  // 设置 alpha
        if (prepared && mDrawState == HAS_DRAWN) {
            if (mLastHidden) {
                mSurfaceController.showRobustly(t);  // 调用 show 方法显示窗口
                mLastHidden = false;
            }
        }
    }
}
```

#### setWallpaperAsTarget 机制

亮屏解锁过程中，NotificationShade 窗口会去掉 `SHOW_WALLPAPER` Flag，此时 Launcher 尚未显示，会导致短暂无壁纸（闪黑）。为解决此问题，Framework 提供了 `setWallpaperAsTarget` 接口：当 SystemUI 调用 `setWallpaperAsTarget(true)` 时，系统会将 `mWallpaperTarget` 设置为壁纸窗口自身，从而不依赖其他窗口的 `SHOW_WALLPAPER` flag 来显示壁纸。

更新流程：`setWallpaperAsTarget(true)` → `adjustWallpaperWindows()` → `findWallpaperTarget()` → `updateWallpaperWindowsTarget()` → `updateWallpaperTokens()` → `WallpaperWindowToken.updateWallpaperWindows()` → `setVisibility()` → `commitVisibility()` → `setVisible()` → `setClientVisible()`

### NotificationShade 隐藏

NotificationShade（`TYPE_NOTIFICATION_SHADE = 2040`）窗口的隐藏有两种方式：

- **灭屏解锁**：SystemUI 直接设置 LayoutParams.alpha = 0，通过系统侧 `WindowStateAnimator` 更新对应 Surface 的 alpha
- **亮屏解锁**：SystemUI 将 Window 可见性设置为不可见，在 `relayoutWindow` 时直接销毁 Surface

## Keyguard Occluded Transition

当一个设置了 `canShowWhenLocked()` 的 Activity 启动时（如锁屏下打开相机），会触发 Keyguard Occlude 转换。

### updateVisibility 检测遮挡

`KeyguardDisplayState.updateVisibility()` 在可见性更新时检测遮挡状态变化：

```java
// KeyguardController.java line 659
void updateVisibility(KeyguardController controller, DisplayContent display) {
    final boolean lastOccluded = mOccluded;
    mOccluded = false;
    mTopOccludesActivity = null;

    final Task task = getRootTaskForControllingOccluding(display);
    final ActivityRecord top = task != null ? task.getTopNonFinishingActivity() : null;

    if (top != null) {
        if (top.canShowWhenLocked()) {      // line 695
            mTopOccludesActivity = top;      // 标记为遮挡 Activity
        }

        mOccluded = mTopOccludesActivity != null  // line 708
                || (mDismissingKeyguardActivity != null
                && task.topRunningActivity() == mDismissingKeyguardActivity
                && controller.canShowWhileOccluded(true, false));
    }

    if (lastOccluded != mOccluded) {  // line 738 — 遮挡状态发生变化
        controller.handleOccludedChanged(mDisplayId, mTopOccludesActivity);
    }
}
```

### handleOccludedChanged

```java
// KeyguardController.java line 433
private void handleOccludedChanged(int displayId, @Nullable ActivityRecord topActivity) {
    if (displayId != DEFAULT_DISPLAY) {
        updateKeyguardSleepToken(displayId);
        return;  // 非默认屏幕仅更新 SleepToken
    }

    final boolean occluded = getDisplayState(displayId).mOccluded;
    final boolean performTransition = isKeyguardLocked(displayId);

    mWindowManager.mPolicy.onKeyguardOccludedChangedLw(occluded);
    mService.deferWindowLayout();
    try {
        if (isKeyguardLocked(displayId)) {
            final int type = occluded
                    ? TRANSIT_KEYGUARD_OCCLUDE : TRANSIT_KEYGUARD_UNOCCLUDE;
            final int flag = occluded
                    ? TRANSIT_FLAG_KEYGUARD_OCCLUDING : TRANSIT_FLAG_KEYGUARD_UNOCCLUDING;

            final Task trigger = (occluded && topActivity != null)
                    ? topActivity.getRootTask() : null;
            Transition transition = tc.requestTransitionIfNeeded(
                    type, flag, trigger,
                    mRootWindowContainer.getDefaultDisplay());  // line 459-460
            if (trigger != null) {
                transition.collect(trigger);
            }
        }
        updateKeyguardSleepToken(displayId);  // 遮挡时释放 keyguard SleepToken
    } finally {
        mService.continueWindowLayout();
    }
}
```

**Transition 类型**：
- Occlude: `TRANSIT_KEYGUARD_OCCLUDE` + `TRANSIT_FLAG_KEYGUARD_OCCLUDING`
- UnOcclude: `TRANSIT_KEYGUARD_UNOCCLUDE` + `TRANSIT_FLAG_KEYGUARD_UNOCCLUDING`

### Occlude 场景的典型触发路径

以锁屏下双击音量键打开相机为例：

```
ScreenOff SleepToken release（亮屏）
  → ActivityStarter.startActivityInner()（启动相机 Activity）
    → resumeTopActivityInnerLocked()
      → realStartActivityLocked()
        → ensureActivitiesVisible()
          → KeyguardController.updateVisibility()
            → KeyguardDisplayState.updateVisibility()
              → 检测到 mOccluded 从 false 变为 true
                → handleOccludedChanged()
                  → 请求 TRANSIT_KEYGUARD_OCCLUDE
                  → updateKeyguardSleepToken() → release keyguard token
```

## Keyguard UnOccluded Transition

当遮挡 Keyguard 的 Activity 退出或失去 `canShowWhenLocked` 能力时，触发 UnOcclude 转换。处理逻辑与 Occlude 使用同一个 `handleOccludedChanged` 方法，但此时 `occluded = false`：

- **Transition 类型**：`TRANSIT_KEYGUARD_UNOCCLUDE` + `TRANSIT_FLAG_KEYGUARD_UNOCCLUDING`
- `trigger` 为 null（没有特定的 Task 需要聚焦）
- 重新获取 keyguard SleepToken

## KeyguardTransitionHandler（Shell 侧）

`KeyguardTransitionHandler` 位于 Shell 侧，负责将 Keyguard 相关的 Transition 路由到 SystemUI 提供的远程动画实现。

![KeyguardTransitionHandler 动画路由](/img/android/keyguard/05_transition_handler_routing.svg)

### handles 判断

```java
// KeyguardTransitionHandler.java line 157
public static boolean handles(TransitionInfo info) {
    if (info.getType() == WindowManager.TRANSIT_WAKE && !info.isKeyguardGoingAway()) {
        return false;  // 普通亮屏不播放动画
    }
    return (info.getFlags() & KEYGUARD_VISIBILITY_TRANSIT_FLAGS) != 0;
}
```

### 动画路由

```java
// KeyguardTransitionHandler.java line 189
public boolean startAnimation(@NonNull IBinder transition, @NonNull TransitionInfo info,
        @NonNull SurfaceControl.Transaction startTransaction,
        @NonNull SurfaceControl.Transaction finishTransaction,
        @NonNull TransitionFinishCallback finishCallback) {

    if (!handles(info) || mIsLaunchingActivityOverLockscreen) return false;

    // 按优先级路由到对应的远程动画
    if ((info.getFlags() & TRANSIT_FLAG_KEYGUARD_GOING_AWAY) != 0) {
        return startAnimation(mExitTransition, "going-away", ...);
    }
    if ((info.getFlags() & TRANSIT_FLAG_KEYGUARD_APPEARING) != 0) {
        return startAnimation(mAppearTransition, "appearing", ...);
    }
    if ((info.getFlags() & TRANSIT_FLAG_KEYGUARD_LOCKED) != 0) {
        if ((info.getFlags() & TRANSIT_FLAG_KEYGUARD_OCCLUDING) != 0) {
            return startAnimation(mOccludeTransition, "occlude", ...);
        } else if ((info.getFlags() & TRANSIT_FLAG_KEYGUARD_UNOCCLUDING) != 0) {
            return startAnimation(mUnoccludeTransition, "unocclude", ...);
        }
    }
    return false;
}
```

### 五个远程动画处理器

```java
// KeyguardTransitionHandler.java line 98
private IRemoteTransition mExitTransition = null;           // Keyguard Going Away
private IRemoteTransition mAppearTransition = null;         // Keyguard Appearing
private IRemoteTransition mOccludeTransition = null;        // Keyguard Occluded
private IRemoteTransition mOccludeByDreamTransition = null; // Occluded by Dream
private IRemoteTransition mUnoccludeTransition = null;      // Keyguard UnOccluded
```

这些 `IRemoteTransition` 由 SystemUI 的 `KeyguardService` 注册，实际动画执行在 SystemUI 进程中完成。

## Transition 常量汇总

| 常量 | 值/说明 | 使用场景 |
|------|---------|---------|
| `TRANSIT_TO_FRONT` | 基础类型 | Keyguard Appearing |
| `TRANSIT_TO_BACK` | 基础类型 | Keyguard Going Away |
| `TRANSIT_KEYGUARD_GOING_AWAY` | Legacy 类型 | 解锁（旧版兼容） |
| `TRANSIT_KEYGUARD_OCCLUDE` | 遮挡类型 | Activity 遮挡锁屏 |
| `TRANSIT_KEYGUARD_UNOCCLUDE` | 取消遮挡类型 | 从遮挡返回锁屏 |
| `TRANSIT_SLEEP` (12) | Sleep 类型 | 灭屏，停止动画 |
| `TRANSIT_WAKE` (11) | Wake 类型 | 亮屏 |
| `TRANSIT_FLAG_KEYGUARD_APPEARING` | Flag | 标记锁屏出现 |
| `TRANSIT_FLAG_KEYGUARD_GOING_AWAY` | Flag | 标记锁屏消失 |
| `TRANSIT_FLAG_KEYGUARD_OCCLUDING` | Flag | 标记锁屏被遮挡 |
| `TRANSIT_FLAG_KEYGUARD_UNOCCLUDING` | Flag | 标记遮挡取消 |
| `TRANSIT_FLAG_KEYGUARD_LOCKED` | Flag | 标记锁屏锁定状态 |
| `TRANSIT_FLAG_KEYGUARD_GOING_AWAY_TO_SHADE` | Flag | 解锁到通知栏 |
| `TRANSIT_FLAG_KEYGUARD_GOING_AWAY_NO_ANIMATION` | Flag | 无解锁动画 |
| `TRANSIT_FLAG_KEYGUARD_GOING_AWAY_WITH_WALLPAPER` | Flag | 携带壁纸 |
| `TRANSIT_FLAG_KEYGUARD_GOING_AWAY_SUBTLE_ANIMATION` | Flag | 微妙动画 |

## 调试日志

### Events 日志

```
wm_set_keyguard_shown: [displayId, mKeyguardShowing, mAodShowing, keyguardGoingAway, mOccluded, caller]
wm_set_keyguard_occluded: [occluded, ?, ?, caller]
wm_sleep_token: [displayId, 1=create/0=remove, tag]
```

### System 日志

开启详细日志：

```bash
adb shell wm logging enable-text WM_DEBUG_APP_TRANSITIONS WM_DEBUG_WINDOW_TRANSITIONS WM_DEBUG_SYNC_ENGINE WM_DEBUG_WALLPAPER
```

关键日志 tag：

- **ShellTransition**：`WindowManagerShell` — Shell 侧 Transition 处理
- **窗口显示隐藏**：`SurfaceControlRegistry: show|hide|setAlpha`
- **壁纸**：`WM_DEBUG_WALLPAPER` 相关日志
- **SleepToken**：`WM_DEBUG_SLEEP_TOKEN` — "Create sleep token|Remove sleep token"
