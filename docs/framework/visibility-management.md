---
prev:
    text: '窗口绘制状态'
    link: '/framework/window-draw-state'
next:
    text: 'ShellTransition'
    link: '/framework/ShellTransition'
---

# Activity 与窗口可见性更新机制

本文详细介绍 Android 系统中 Activity 和窗口可见性的更新机制，包括从 Activity 启动完成后如何通过 `ensureActivitiesVisible` 链路逐层更新每个 Activity 的可见性状态，以及如何将可见性信息传递给应用进程完成窗口的显示/隐藏。

## 基础概念

在分析可见性更新流程之前，需要先了解以下几个核心概念：

**焦点应用（mFocusedApp）**

```java
// DisplayContent.java
/**
 * The foreground app of this display. Windows below this app cannot be the focused window. If
 * the user taps on the area outside of the task of the focused app, we will notify AM about the
 * new task the user wants to interact with.
 */
ActivityRecord mFocusedApp = null;
```

焦点应用是指在 app 切换过程中状态变为 top resumed 的 Activity。位于该应用之下的窗口不能成为焦点窗口。

**焦点窗口（mCurrentFocus）**

```java
// DisplayContent.java
/**
 * Window that is currently interacting with the user. This window is responsible for receiving
 * key events and pointer events from the user.
 */
WindowState mCurrentFocus = null;
```

焦点窗口决定了用户与哪个窗口进行交互。当一个窗口获得焦点时，它将开始接收用户的按键和触摸事件；当失去焦点时，则停止接收输入。焦点切换本质上是窗口维度的概念，焦点总是从一个窗口切换到另一个窗口。

**焦点更新方法（updateFocusedWindowLocked）**

```java
// DisplayContent.java
/**
 * Update the focused window and make some adjustments if the focus has changed.
 *
 * @param mode Indicates the situation we are in. Possible modes are:
 *             UPDATE_FOCUS_NORMAL,
 *             UPDATE_FOCUS_PLACING_SURFACES,
 *             UPDATE_FOCUS_WILL_PLACE_SURFACES,
 *             UPDATE_FOCUS_REMOVING_FOCUS
 * @param updateInputWindows Whether to sync the window information to the input module.
 * @param topFocusedDisplayId Display id of current top focused display.
 * @return true if the focused window has changed.
 */
boolean updateFocusedWindowLocked(int mode, boolean updateInputWindows,
        int topFocusedDisplayId) {}
```

## 总体流程概览

在一个应用启动时，会经历如下关键流程：

```
resumeTopActivityUncheckedLocked
  → ... → realStartActivityLocked
    → minimalResumeActivityLocked → completeResumeLocked
      → reportResumedActivityLocked → ensureActivitiesVisible
        (RootWindowContainer → DisplayContent → Task)
```

Activity 在 `realStartActivityLocked` 阶段通过 `scheduleTransaction` 回调应用的 `onCreate`、`onStart`、`onResume`。随后在 `completeResumeLocked` 中调用 `reportResumedActivityLocked`，进而触发 `ensureActivitiesVisible` 更新所有 Activity 的可见性。

以下是完整的可见性更新流程概览：

![Activity 与窗口可见性总体流程](/img/android/visibility/01_overall_flow.svg)

## 一、Activity 可见性

### 1.1 completeResumeLocked

当 Activity 进入 resumed 状态后，`completeResumeLocked` 负责完成后续的状态更新工作。

```java
// ActivityRecord.java
void completeResumeLocked() {
    idle = false;
    results = null;
    if (newIntents != null && newIntents.size() > 0) {
        mLastNewIntent = newIntents.get(newIntents.size() - 1);
    }
    newIntents = null;

    mTaskSupervisor.updateHomeProcessIfNeeded(this);
    try {
        if (isActivityTypeHome()) {
            mTaskSupervisor.new PreferredAppsTask().execute();
        }
    } catch (Exception e) {
        Slog.v(TAG, "Exception: " + e);
    }

    if (nowVisible) {
        // 此时窗口已可见，停止等待 Activity 可见的超时检查
        mTaskSupervisor.stopWaitingForActivityVisible(this);
    }

    // 安排空闲超时，防止应用未主动触发 idle 回调
    mTaskSupervisor.scheduleIdleTimeout(this);

    // 进入 reportResumedActivityLocked，触发可见性更新
    mTaskSupervisor.reportResumedActivityLocked(this);
    // ...
}
```

该方法的核心作用是：重置 Activity 的部分状态（idle、results、newIntents 等），无条件调用 `updateHomeProcessIfNeeded` 更新 Home 进程，对 Home 类型 Activity 触发 `PreferredAppsTask`，然后调用 `reportResumedActivityLocked` 进入可见性更新流程。

### 1.2 reportResumedActivityLocked

```java
// ActivityTaskSupervisor.java
boolean reportResumedActivityLocked(ActivityRecord r) {
    // 已经 resumed 的 Activity 不可能还在 stopping，从列表中移除
    mStoppingActivities.remove(r);

    final Task rootTask = r.getRootTask();
    // 检查所有 Activity 是否都已恢复完成
    if (rootTask.getDisplayArea().allResumedActivitiesComplete()) {
        // 如果是，更新所有 Activity 的可见性
        mRootWindowContainer.ensureActivitiesVisible();
        // 确保所有 Display 的 Activity 和窗口可见性一致
        mRootWindowContainer.executeAppTransitionForAllDisplay();
        return true;
    }
    return false;
}
```

`allResumedActivitiesComplete` 方法定义在 `TaskDisplayArea` 中，通过遍历所有子容器检查每个 Task 的顶部 Activity 是否都处于 RESUMED 状态：

```java
// TaskDisplayArea.java
boolean allResumedActivitiesComplete() {
    for (int i = mChildren.size() - 1; i >= 0; --i) {
        final WindowContainer child = mChildren.get(i);
        if (child.asTaskDisplayArea() != null) {
            if (!child.asTaskDisplayArea().allResumedActivitiesComplete()) {
                return false;
            }
            continue;
        }
        final ActivityRecord r = mChildren.get(i).asTask().getTopResumedActivity();
        // 如果有 Activity 还未到达 RESUMED 状态，返回 false
        if (r != null && !r.isState(RESUMED)) {
            return false;
        }
    }
    final Task currentFocusedRootTask = getFocusedRootTask();
    mLastFocusedRootTask = currentFocusedRootTask;
    return true;
}
```

### 1.3 ensureActivitiesVisible 调用链

可见性更新从 `RootWindowContainer` 开始，逐层向下分发：

#### RootWindowContainer

```java
// RootWindowContainer.java
void ensureActivitiesVisible(ActivityRecord starting, boolean notifyClients) {
    // 防止递归调用
    if (mTaskSupervisor.inActivityVisibilityUpdate()
            || mTaskSupervisor.isRootVisibilityUpdateDeferred()) {
        return;
    }
    mTaskSupervisor.beginActivityVisibilityUpdate();
    try {
        // 遍历每个 DisplayContent
        for (int displayNdx = getChildCount() - 1; displayNdx >= 0; --displayNdx) {
            final DisplayContent display = getChildAt(displayNdx);
            display.ensureActivitiesVisible(starting, notifyClients);
        }
    } finally {
        mTaskSupervisor.endActivityVisibilityUpdate();
    }
}
```

`beginActivityVisibilityUpdate` / `endActivityVisibilityUpdate` 通过 `mVisibilityTransactionDepth` 计数来防止递归调用，并在最外层事务开始/结束时执行特定操作：

```java
// ActivityTaskSupervisor.java
void beginActivityVisibilityUpdate() {
    if (mVisibilityTransactionDepth == 0) {
        // 首次进入时更新锁屏状态
        getKeyguardController().updateVisibility();
    }
    mVisibilityTransactionDepth++;
}

void endActivityVisibilityUpdate() {
    mVisibilityTransactionDepth--;
    if (mVisibilityTransactionDepth == 0) {
        // 所有嵌套更新完成后，批量计算进程的 Activity 状态
        computeProcessActivityStateBatch();
    }
}
```

#### DisplayContent

```java
// DisplayContent.java
void ensureActivitiesVisible(ActivityRecord starting, boolean notifyClients) {
    if (mInEnsureActivitiesVisible) {
        return; // 防止递归
    }
    mAtmService.mTaskSupervisor.beginActivityVisibilityUpdate();
    try {
        mInEnsureActivitiesVisible = true;
        // 遍历所有根 Task，逐个更新可见性
        forAllRootTasks(rootTask -> {
            rootTask.ensureActivitiesVisible(starting, notifyClients);
        });
        // 在 Shell Transition 旋转场景下同步调整壁纸窗口
        if (mTransitionController.useShellTransitionsRotation()
                && mTransitionController.isCollecting()
                && mWallpaperController.getWallpaperTarget() != null) {
            mWallpaperController.adjustWallpaperWindows();
        }
    } finally {
        mAtmService.mTaskSupervisor.endActivityVisibilityUpdate();
        mInEnsureActivitiesVisible = false;
    }
}
```

#### Task

```java
// Task.java
void ensureActivitiesVisible(@Nullable ActivityRecord starting, boolean notifyClients) {
    mTaskSupervisor.beginActivityVisibilityUpdate();
    try {
        // 对 Task 的每个叶子节点从顶到底更新可见性
        forAllLeafTasks(task -> {
            task.updateActivityVisibilities(starting, notifyClients);
        }, true /* traverseTopToBottom */);

        // 如果正在等待半透明 Activity 绘制，且下方没有未绘制的 Activity，直接通知
        if (mTranslucentActivityWaiting != null
                && mUndrawnActivitiesBelowTopTranslucent.isEmpty()) {
            notifyActivityDrawnLocked(null);
        }
    } finally {
        mTaskSupervisor.endActivityVisibilityUpdate();
    }
}
```

参数说明：
- `starting`：正在启动或恢复的顶部 Activity，调用方需确保其可见
- `notifyClients`：是否将可见性变更通知给客户端，从 `RootWindowContainer` 传递的默认值为 `true`

#### TaskFragment

```java
// TaskFragment.java
final void updateActivityVisibilities(@Nullable ActivityRecord starting,
        boolean notifyClients) {
    mTaskSupervisor.beginActivityVisibilityUpdate();
    try {
        // 委托给 EnsureActivitiesVisibleHelper 处理
        mEnsureActivitiesVisibleHelper.process(starting, notifyClients);
    } finally {
        mTaskSupervisor.endActivityVisibilityUpdate();
    }
}
```

### 1.4 EnsureActivitiesVisibleHelper

这是可见性更新的核心类，负责遍历 TaskFragment 的子容器，决定每个 Activity 的可见性状态。

#### process

```java
// EnsureActivitiesVisibleHelper.java
void process(@Nullable ActivityRecord starting, boolean notifyClients) {
    // 重置状态
    reset(starting, notifyClients);

    if (mTopRunningActivity != null && mTaskFragment.asTask() != null) {
        mTaskFragment.asTask().checkTranslucentActivityWaiting(mTopRunningActivity);
    }

    // 判断是否应该 resume 顶部 Activity
    final boolean resumeTopActivity = mTopRunningActivity != null
            && !mTopRunningActivity.mLaunchTaskBehind
            && mTaskFragment.canBeResumed(starting)
            && (starting == null || !starting.isDescendantOf(mTaskFragment));

    // 从顶到底遍历子容器
    ArrayList<TaskFragment> adjacentTaskFragments = null;
    for (int i = mTaskFragment.mChildren.size() - 1; i >= 0; --i) {
        final WindowContainer child = mTaskFragment.mChildren.get(i);
        final TaskFragment childTaskFragment = child.asTaskFragment();
        if (childTaskFragment != null
                && childTaskFragment.getTopNonFinishingActivity() != null) {
            // 递归更新子 TaskFragment 的 Activity 可见性
            childTaskFragment.updateActivityVisibilities(starting, notifyClients);

            // 判断是否完全遮挡：当子 TaskFragment 与父容器边界相同且不透明时
            mBehindFullyOccludedContainer |=
                    (childTaskFragment.getBounds().equals(mTaskFragment.getBounds())
                            && !childTaskFragment.isTranslucent(starting));

            if (mAboveTop && mTopRunningActivity.getTaskFragment() == childTaskFragment) {
                mAboveTop = false;
            }
            if (mBehindFullyOccludedContainer) {
                continue;
            }

            // 处理相邻 TaskFragment（分屏模式）
            if (adjacentTaskFragments != null
                    && adjacentTaskFragments.contains(childTaskFragment)) {
                if (!childTaskFragment.isTranslucent(starting)
                        && !childTaskFragment.getAdjacentTaskFragment()
                                .isTranslucent(starting)) {
                    mBehindFullyOccludedContainer = true;
                }
                continue;
            }
            final TaskFragment adjacentTaskFrag =
                    childTaskFragment.getAdjacentTaskFragment();
            if (adjacentTaskFrag != null) {
                if (adjacentTaskFragments == null) {
                    adjacentTaskFragments = new ArrayList<>();
                }
                adjacentTaskFragments.add(adjacentTaskFrag);
            }
        } else if (child.asActivityRecord() != null) {
            // 如果是 ActivityRecord，设置其可见性状态
            setActivityVisibilityState(child.asActivityRecord(), starting,
                    resumeTopActivity);
        }
    }
}
```

`reset` 方法用于初始化状态：

```java
void reset(ActivityRecord starting, boolean notifyClients) {
    mStarting = starting;
    mTopRunningActivity = mTaskFragment.topRunningActivity();
    mAboveTop = mTopRunningActivity != null;
    // shouldBeVisible → getVisibility(starting) 中会判断 TaskFragment 的可见性
    mContainerShouldBeVisible = mTaskFragment.shouldBeVisible(mStarting);
    mBehindFullyOccludedContainer = !mContainerShouldBeVisible;
    mNotifyClients = notifyClients;
}
```

关键字段说明：
- `mAboveTop`：标记当前遍历位置是否在顶部运行 Activity 之上
- `mContainerShouldBeVisible`：当前 TaskFragment 是否应该可见
- `mBehindFullyOccludedContainer`：当前位置是否被上方不透明容器完全遮挡

#### setActivityVisibilityState

这是决定单个 Activity 可见性的核心方法：

![setActivityVisibilityState 详细流程](/img/android/visibility/02_setActivityVisibilityState.svg)

```java
// EnsureActivitiesVisibleHelper.java
private void setActivityVisibilityState(ActivityRecord r, ActivityRecord starting,
        final boolean resumeTopActivity) {
    final boolean isTop = r == mTopRunningActivity;

    // ① 顶部 Activity 之上的 Activity 一律不可见
    if (mAboveTop && !isTop) {
        r.makeInvisible();
        return;
    }
    mAboveTop = false;

    // ② 更新不考虑锁屏影响的可见性
    r.updateVisibilityIgnoringKeyguard(mBehindFullyOccludedContainer);
    // ③ 综合锁屏状态判断实际可见性
    final boolean reallyVisible = r.shouldBeVisibleUnchecked();

    // ④ 根据 visibleIgnoringKeyguard 更新遮挡状态
    if (r.visibleIgnoringKeyguard) {
        if (r.occludesParent()) {
            // 不透明 Activity 会遮挡其下方的所有 Activity
            mBehindFullyOccludedContainer = true;
        } else {
            mBehindFullyOccludedContainer = false;
        }
    } else if (r.isState(INITIALIZING)) {
        r.cancelInitializing();
    }

    // ⑤ 根据 reallyVisible 执行不同操作
    if (reallyVisible) {
        if (r.finishing) {
            return;
        }
        // 确保配置与当前一致
        if (r != mStarting && mNotifyClients) {
            r.ensureActivityConfiguration(true /* ignoreVisibility */);
        }

        if (!r.attachedToProcess()) {
            // 未关联进程：重启 Activity 并使其可见
            makeVisibleAndRestartIfNeeded(mStarting, resumeTopActivity && isTop, r);
        } else if (r.isVisibleRequested()) {
            // 已经请求可见：处理已可见状态
            if (r.mClientVisibilityDeferred && mNotifyClients) {
                r.makeActiveIfNeeded(r.mClientVisibilityDeferred ? null : starting);
                r.mClientVisibilityDeferred = false;
            }
            r.handleAlreadyVisible();
            if (mNotifyClients) {
                r.makeActiveIfNeeded(mStarting);
            }
        } else {
            // 需要变为可见
            r.makeVisibleIfNeeded(mStarting, mNotifyClients);
        }
    } else {
        // 不可见
        r.makeInvisible();
    }

    // ⑥ Home Task 特殊处理
    if (!mBehindFullyOccludedContainer && mTaskFragment.isActivityTypeHome()
            && r.isRootOfTask()) {
        // Home Activity 之后的其他 Task 中的 Activity 不应该可见
        // Home 通常是半透明的（显示壁纸），但在其后面不应显示 Home Task 内的其他 Activity
        mBehindFullyOccludedContainer = true;
    }
}
```

### 1.5 可见性判断细节

#### updateVisibilityIgnoringKeyguard

在不考虑锁屏的情况下判断 Activity 是否应该可见：

```java
// ActivityRecord.java
void updateVisibilityIgnoringKeyguard(boolean behindOccludedContainer) {
    visibleIgnoringKeyguard = (!behindOccludedContainer || mLaunchTaskBehind)
            && showToCurrentUser();
}
```

逻辑说明：
- 如果 Activity **没有**被全屏容器遮挡（`!behindOccludedContainer`），或者是后台启动的 Activity（`mLaunchTaskBehind`），则认为可见
- 还需通过 `showToCurrentUser()` 确认当前用户有权限看到该 Activity

#### shouldBeVisibleUnchecked

综合锁屏状态判断 Activity 是否真正可见：

![shouldBeVisibleUnchecked 与 Keyguard 判断](/img/android/visibility/05_keyguard_visibility.svg)

```java
// ActivityRecord.java
boolean shouldBeVisibleUnchecked() {
    final Task rootTask = getRootTask();
    // 根任务为空或忽略锁屏时不可见 → 返回 false
    if (rootTask == null || !visibleIgnoringKeyguard) {
        return false;
    }
    // 画中画模式下如果被强制隐藏 → 返回 false
    if (inPinnedWindowingMode() && rootTask.isForceHidden()) {
        return false;
    }
    // 不信任的嵌入 Activity 有覆盖层时不可见
    if (hasOverlayOverUntrustedModeEmbedded()) {
        return false;
    }

    if (mDisplayContent.isSleeping()) {
        // 屏幕休眠时，只有能唤醒屏幕的 Activity 才可见
        return canTurnScreenOn();
    } else {
        // 非休眠状态，检查 Keyguard 状态下的可见性
        return mTaskSupervisor.getKeyguardController().checkKeyguardVisibility(this);
    }
}
```

**canTurnScreenOn** — 检查 Activity 是否能在灭屏状态下唤醒屏幕：

```java
// ActivityRecord.java
boolean canTurnScreenOn() {
    if (!getTurnScreenOnFlag()) {
        return false;
    }
    return mCurrentLaunchCanTurnScreenOn
            && mTaskSupervisor.getKeyguardController().checkKeyguardVisibility(this);
}

boolean getTurnScreenOnFlag() {
    return mTurnScreenOn || containsTurnScreenOnWindow();
}
// mTurnScreenOn 在 Activity 初始化时根据 FLAG_TURN_SCREEN_ON 设置
```

#### checkKeyguardVisibility

锁屏状态下的可见性检查逻辑，位于 `KeyguardController` 中：

```java
// KeyguardController.java
boolean checkKeyguardVisibility(ActivityRecord r) {
    // Display 标记了允许不安全锁屏显示，且可以解锁 → 可见
    if (r.mDisplayContent.canShowWithInsecureKeyguard() && canDismissKeyguard()) {
        return true;
    }

    if (isKeyguardOrAodShowing(r.mDisplayContent.getDisplayId())) {
        // Keyguard 或 AOD 正在显示 → 检查是否能在锁屏上方显示
        return canShowActivityWhileKeyguardShowing(r);
    } else if (isKeyguardLocked(r.getDisplayId())) {
        // Keyguard 已锁定但被遮挡 → 检查是否允许在遮挡状态下显示
        return canShowWhileOccluded(r.containsDismissKeyguardWindow(),
                r.canShowWhenLocked());
    } else {
        // 没有 Keyguard → 可见
        return true;
    }
}
```

**canDismissKeyguard** — 判断是否可以在不输入凭证的情况下解除锁屏：

```java
boolean canDismissKeyguard() {
    return mWindowManager.mPolicy.isKeyguardTrustedLw()
            || !mWindowManager.isKeyguardSecure(mService.getCurrentUserId());
}
```

**isKeyguardOrAodShowing** — 判断 Keyguard 或 AOD 是否正在显示且未被遮挡：

```java
boolean isKeyguardOrAodShowing(int displayId) {
    final KeyguardDisplayState state = getDisplayState(displayId);
    return (state.mKeyguardShowing || state.mAodShowing)
            && !state.mKeyguardGoingAway
            && !state.mOccluded;
}
```

**canShowActivityWhileKeyguardShowing** — 在锁屏显示时判断 Activity 是否可以展示。基于 `FLAG_DISMISS_KEYGUARD` 和 `FLAG_SHOW_WHEN_LOCKED` 两个标志判断：

```java
boolean canShowActivityWhileKeyguardShowing(ActivityRecord r) {
    final KeyguardDisplayState state = getDisplayState(r.getDisplayId());
    return r.containsDismissKeyguardWindow() && canDismissKeyguard() && !state.mAodShowing
            && (state.mDismissalRequested
            || (r.canShowWhenLocked() && state.mDismissingKeyguardActivity != r));
}
```

**canShowWhenLocked** — 检查 Activity 是否设置了锁屏上方显示的标志：

```java
private static boolean canShowWhenLocked(ActivityRecord r) {
    if (r == null || r.getTaskFragment() == null) {
        return false;
    }
    if (canShowWhenLockedInner(r)) {
        return true;
    } else if (r.mInheritShownWhenLocked) {
        // 继承下方 Activity 的锁屏显示属性
        final ActivityRecord activity = r.getTaskFragment().getActivityBelow(r);
        return activity != null && canShowWhenLockedInner(activity);
    } else {
        return false;
    }
}

// 辅助方法：判断单个 Activity 是否可在锁屏上方显示
private static boolean canShowWhenLockedInner(@NonNull ActivityRecord r) {
    return !r.inPinnedWindowingMode()
            && (r.mShowWhenLocked || r.containsShowWhenLockedWindow()
                    || r.mIsUserAlwaysVisible);
}
```

**isKeyguardLocked** — 判断 Keyguard 是否处于锁定状态：

```java
boolean isKeyguardLocked(int displayId) {
    final KeyguardDisplayState state = getDisplayState(displayId);
    return state.mKeyguardShowing && !state.mKeyguardGoingAway;
}
```

**canShowWhileOccluded** — 在 Keyguard 被遮挡时判断是否可以显示：

```java
boolean canShowWhileOccluded(boolean dismissKeyguard, boolean showWhenLocked) {
    return showWhenLocked || dismissKeyguard
            && !mWindowManager.isKeyguardSecure(mService.getCurrentUserId());
}
```

相关的窗口管理器标志常量：

```java
// WindowManager.java
public static final int FLAG_SHOW_WHEN_LOCKED = 0x00080000;
public static final int FLAG_DISMISS_KEYGUARD = 0x00400000;
public static final int FLAG_TURN_SCREEN_ON = 0x00200000;
```

### 1.6 makeVisibleIfNeeded → setVisibility

当 Activity 需要从不可见变为可见时，通过 `makeVisibleIfNeeded` 触发 `setVisibility`：

```java
// ActivityRecord.java
void makeVisibleIfNeeded(ActivityRecord starting, boolean reportToClient) {
    if ((mState == RESUMED && mVisibleRequested) || this == starting) {
        return; // 已经可见或正在启动，无需处理
    }

    final Task rootTask = getRootTask();
    try {
        if (rootTask.mTranslucentActivityWaiting != null) {
            updateOptionsLocked(returningOptions);
            rootTask.mUndrawnActivitiesBelowTopTranslucent.add(this);
        }
        // 核心：设置可见性为 true
        setVisibility(true);
        app.postPendingUiCleanMsg(true);
        if (reportToClient) {
            mClientVisibilityDeferred = false;
            makeActiveIfNeeded(starting);
        } else {
            mClientVisibilityDeferred = true;
        }
        mTaskSupervisor.mStoppingActivities.remove(this);
    } catch (Exception e) {
        Slog.w(TAG, "Exception thrown making visible: " + intent.getComponent(), e);
    }
    handleAlreadyVisible();
}
```

### 1.7 setVisibility 详细流程

`setVisibility` 是 Activity 可见性变更的核心入口，内部分为多个步骤：

![setVisibility 详细流程](/img/android/visibility/03_setVisibility_detail.svg)

```java
// ActivityRecord.java
void setVisibility(boolean visible) {
    if (getParent() == null) {
        Slog.w(TAG_WM, "Attempted to set visibility of non-existing app token: " + token);
        return;
    }
    if (visible) {
        mDeferHidingClient = false;
    }
    setVisibility(visible, mDeferHidingClient);
}
```

核心实现在 `setVisibility(boolean visible, boolean deferHidingClient)` 中，完整方法体如下：

```java
// ActivityRecord.java
private void setVisibility(boolean visible, boolean deferHidingClient) {
    final AppTransition appTransition = getDisplayContent().mAppTransition;

    // 如果目标不可见且当前也未请求可见，处理 defer 逻辑后返回
    if (!visible && !mVisibleRequested) {
        if (!deferHidingClient && mLastDeferHidingClient) {
            mLastDeferHidingClient = deferHidingClient;
            setClientVisible(false);
        }
        return;
    }

    // 收集 Transition（仅在 Shell Transitions 启用且正在 collecting 时）
    boolean isCollecting = false;
    boolean inFinishingTransition = false;
    if (mTransitionController.isShellTransitionsEnabled()) {
        isCollecting = mTransitionController.isCollecting();
        if (isCollecting) {
            mTransitionController.collect(this);
        } else {
            inFinishingTransition = mTransitionController.inFinishingTransition(this);
        }
    }

    onChildVisibilityRequested(visible);

    final DisplayContent displayContent = getDisplayContent();
    displayContent.mOpeningApps.remove(this);
    displayContent.mClosingApps.remove(this);

    // ===== (1) 更新 mVisibleRequested =====
    setVisibleRequested(visible);
    mLastDeferHidingClient = deferHidingClient;

    if (!visible) {
        // 不可见时：如果 starting window 已转移但首个窗口尚未绘制，隐藏客户端
        if (startingMoved && !firstWindowDrawn && hasChild()) {
            setClientVisible(false);
        }
    } else {
        // 可见时的准备逻辑
        if (!appTransition.isTransitionSet() && appTransition.isReady()) {
            displayContent.mOpeningApps.add(this);
        }
        startingMoved = false;

        if (!isVisible() || mAppStopped) {
            clearAllDrawn();
            if (!Flags.resetDrawStateOnClientInvisible()
                && !isVisible() && !isClientVisible()) {
                // 重置绘制状态，防止 starting window 被立即关闭
                forAllWindows(w -> {
                    if (!Flags.resetDrawStateOnClientInvisible()
                    && w.mWinAnimator.mDrawState == HAS_DRAWN) {
                        w.mWinAnimator.resetDrawState();
                        w.forceReportingResized();
                    }
                }, true /* traverseTopToBottom */);
            }
        }

        // ===== (2) 通知客户端窗口可见 =====
        setClientVisible(true);

        requestUpdateWallpaperIfNeeded();
        mAppStopped = false;
        transferStartingWindowFromHiddenAboveTokenIfNeeded();
    }

    // 如果在 Transition collecting 中，处理可见性标记并推迟提交
    if (isCollecting) {
        if (!visible) {
            if (mTransitionController.inPlayingTransition(this)) {
                mTransitionChangeFlags |= FLAG_IS_OCCLUDED;
            }
        } else {
            mTransitionChangeFlags &= ~FLAG_IS_OCCLUDED;
        }
        return;
    }
    // 如果在 finishing transition 中，加入验证列表
    if (inFinishingTransition) {
        mTransitionController.mValidateCommitVis.add(this);
        return;
    }

    // 如果正在准备 AppTransition，推迟可见性变更
    if (deferCommitVisibilityChange(visible)) {
        return;
    }

    // ===== (3) 提交可见性变更 =====
    commitVisibility(visible, true /* performLayout */);
    updateReportedVisibilityLocked();
}
```

该方法围绕三个核心步骤展开：

**(1) setVisibleRequested** — 更新 `mVisibleRequested` 字段。`setVisibleRequested` 最终调用到 `WindowContainer.setVisibleRequested`，更新字段后通知父容器和 listeners：

```java
// WindowContainer.java
boolean setVisibleRequested(boolean visible) {
    if (mVisibleRequested == visible) return false;
    mVisibleRequested = visible;
    final WindowContainer parent = getParent();
    if (parent != null) {
        parent.onChildVisibleRequestedChanged(this);
    }
    for (int i = mListeners.size() - 1; i >= 0; --i) {
        mListeners.get(i).onVisibleRequestedChanged(mVisibleRequested);
    }
    return true;
}
```

`ActivityRecord` 重写了该方法，额外处理 IME 状态和服务连接可见性：

```java
// ActivityRecord.java
@Override
boolean setVisibleRequested(boolean visible) {
    if (!super.setVisibleRequested(visible)) return false;
    setInsetsFrozen(!visible);
    updateVisibleForServiceConnection();
    if (app != null) {
        mTaskSupervisor.onProcessActivityStateChanged(app, false /* forceBatch */);
    }
    logAppCompatState();
    if (!visible) {
        final InputTarget imeInputTarget = mDisplayContent.getImeInputTarget();
        mLastImeShown = imeInputTarget != null && imeInputTarget.getWindowState() != null
                && imeInputTarget.getWindowState().mActivityRecord == this
                && mDisplayContent.mInputMethodWindow != null
                && mDisplayContent.mInputMethodWindow.isVisible();
        finishOrAbortReplacingWindow();
    }
    return true;
}
```

**(2) setClientVisible(true)** — 通知客户端窗口可见，触发窗口可见性的跨进程通知流程，详见"二、窗口可见性"部分。

**(3) commitVisibility** — 在满足条件时（非 Transition 收集中、非 finishing transition 中、非延迟提交），执行最终的可见性提交。注意在此之前有三个提前返回的检查：`isCollecting`、`inFinishingTransition` 和 `deferCommitVisibilityChange()`。

### 1.8 commitVisibility

`commitVisibility` 直接更新可见性状态并触发窗口排列：

```java
// ActivityRecord.java
void commitVisibility(boolean visible, boolean performLayout, boolean fromTransition) {
    mVisibleSetFromTransferredStartingWindow = false;
    if (visible == isVisible()) {
        return;
    }

    final int windowsCount = mChildren.size();
    final boolean runningAnimation = sEnableShellTransitions ? visible
            : isAnimating(PARENTS, ANIMATION_TYPE_APP_TRANSITION);

    // 遍历所有子窗口，通知它们 app 可见性变化
    for (int i = 0; i < windowsCount; i++) {
        mChildren.get(i).onAppVisibilityChanged(visible, runningAnimation);
    }

    // 更新 mVisible 和 mVisibleRequested
    setVisible(visible);
    setVisibleRequested(visible);

    if (!visible) {
        stopFreezingScreen(true, true);
    } else {
        if (mStartingWindow != null && !mStartingWindow.isDrawn()
                && (firstWindowDrawn || allDrawn)) {
            mStartingWindow.clearPolicyVisibilityFlag(LEGACY_POLICY_VISIBILITY);
            mStartingWindow.mLegacyPolicyVisibilityAfterAnim = false;
        }
        forAllWindows(mWmService::makeWindowFreezingScreenIfNeededLocked, true);
    }

    // 通知 Task 信息变更
    Task task = getOrganizedTask();
    while (task != null) {
        task.dispatchTaskInfoChangedIfNeeded(false /* force */);
        task = task.getParent().asTask();
    }

    // 更新输入窗口和焦点
    final DisplayContent displayContent = getDisplayContent();
    displayContent.getInputMonitor().setUpdateInputWindowsNeededLw();
    if (performLayout) {
        mWmService.updateFocusedWindowLocked(UPDATE_FOCUS_WILL_PLACE_SURFACES,
                false /*updateInputWindows*/);
        mWmService.mWindowPlacerLocked.performSurfacePlacement();
    }
    displayContent.getInputMonitor().updateInputWindowsLw(false /*force*/);
    mTransitionChangeFlags = 0;

    postApplyAnimation(visible, fromTransition);
}
```

其中 `setVisible` 负责更新 `mVisible` 字段：

```java
// ActivityRecord.java
void setVisible(boolean visible) {
    if (visible != mVisible) {
        mVisible = visible;
        if (app != null) {
            mTaskSupervisor.onProcessActivityStateChanged(app, false /* forceBatch */);
        }
        scheduleAnimation();
    }
}
```

## 二、窗口可见性

当 Activity 的可见性通过 `setClientVisible(true)` 通知给窗口系统后，可见性信息会经过以下路径传递到应用进程。

![窗口可见性更新流程](/img/android/visibility/04_window_visibility.svg)

### 2.1 WindowToken.setClientVisible

```java
// WindowToken.java
/** Have we told the window clients to show themselves? */
private boolean mClientVisible;

void setClientVisible(boolean clientVisible) {
    if (mClientVisible == clientVisible) {
        return;
    }
    mClientVisible = clientVisible;
    // 向所有客户端窗口发送可见性状态
    sendAppVisibilityToClients();
}
```

`ActivityRecord` 继承自 `WindowToken`，重写了 `setClientVisible` 以处理 `mDeferHidingClient` 逻辑：

```java
// ActivityRecord.java
void setClientVisible(boolean clientVisible) {
    if (!clientVisible && mDeferHidingClient) return;
    super.setClientVisible(clientVisible);
}
```

### 2.2 sendAppVisibilityToClients

从 `WindowContainer` 开始递归遍历所有子容器：

```java
// WindowContainer.java
void sendAppVisibilityToClients() {
    for (int i = mChildren.size() - 1; i >= 0; --i) {
        final WindowContainer wc = mChildren.get(i);
        wc.sendAppVisibilityToClients();
    }
}
```

最终到达 `WindowState`，通过 Binder 跨进程通知应用：

```java
// WindowState.java
void sendAppVisibilityToClients() {
    super.sendAppVisibilityToClients();

    final boolean clientVisible = mToken.isClientVisible();
    // Starting Window 在 clientVisible=false 时不隐藏
    if (mAttrs.type == TYPE_APPLICATION_STARTING && !clientVisible) {
        return;
    }

    try {
        // 通过 IWindow Binder 接口将可见性发送给应用
        mClient.dispatchAppVisibility(clientVisible);
    } catch (RemoteException e) {
        // 远端客户端处理可见性消息失败，可能处于异常状态（如 Binder 缓冲区溢出），
        // 导致可见性不同步，因此终止该进程
        Slog.w(TAG, "Exception thrown during dispatchAppVisibility " + this, e);
        android.os.Process.killProcess(mSession.mPid);
    }
}
```

### 2.3 ViewRootImpl 端处理

应用进程通过 `ViewRootImpl` 的内部类 `W`（实现 `IWindow.Stub`）接收来自 WMS 的可见性通知：

```java
// ViewRootImpl.java
static class W extends IWindow.Stub {
    @Override
    public void dispatchAppVisibility(boolean visible) {
        final ViewRootImpl viewAncestor = mViewAncestor.get();
        if (viewAncestor != null) {
            viewAncestor.dispatchAppVisibility(visible);
        }
    }
}

public void dispatchAppVisibility(boolean visible) {
    Message msg = mHandler.obtainMessage(MSG_DISPATCH_APP_VISIBILITY);
    msg.arg1 = visible ? 1 : 0;
    mHandler.sendMessage(msg);
}
```

通过 Handler 消息切换到主线程后处理：

```java
// ViewRootImpl.java
void handleAppVisibility(boolean visible) {
    if (mAppVisible != visible) {
        final boolean previousVisible = getHostVisibility() == View.VISIBLE;
        mAppVisible = visible;
        final boolean currentVisible = getHostVisibility() == View.VISIBLE;
        // 只在可见性确实改变时触发重绘
        if (previousVisible != currentVisible) {
            mAppVisibilityChanged = true;
            scheduleTraversals();
        }
        if (!mRemoved || !mAppVisible) {
            AnimationHandler.requestAnimatorsEnabled(mAppVisible, this);
        }
    }
}
```

### 2.4 scheduleTraversals → performTraversals

`scheduleTraversals` 是 Android 视图系统中触发 View 重新测量、布局、绘制的入口：

```java
// ViewRootImpl.java
void scheduleTraversals() {
    if (!mTraversalScheduled) {
        mTraversalScheduled = true;
        // 设置同步屏障，保证遍历回调优先执行
        mTraversalBarrier = mHandler.getLooper().getQueue().postSyncBarrier();
        // 通过 Choreographer 在下一帧执行遍历
        mChoreographer.postCallback(
                Choreographer.CALLBACK_TRAVERSAL, mTraversalRunnable, null);
        notifyRendererOfFramePending();
        pokeDrawLockIfNeeded();
    }
}

void doTraversal() {
    if (mTraversalScheduled) {
        mTraversalScheduled = false;
        // 移除同步屏障
        mHandler.getLooper().getQueue().removeSyncBarrier(mTraversalBarrier);
        // 执行视图遍历
        performTraversals();
    }
}
```

`performTraversals()` 是 View 系统的核心方法，依次执行：
1. **performMeasure()** → `onMeasure`：计算视图大小
2. **performLayout()** → `onLayout`：确定视图位置
3. **performDraw()** → `onDraw`：绘制视图内容

### 2.5 View 可见性常量

```java
// View.java
public static final int VISIBLE = 0x00000000;    // 可见
public static final int INVISIBLE = 0x00000004;  // 不可见，但仍占用布局空间
public static final int GONE = 0x00000008;        // 不可见，不占用布局空间
```

## 三、SurfaceControl 可见性更新

除了通过 `setClientVisible` 通知应用进程之外，窗口的 Surface 可见性也需要在 system_server 端通过 `SurfaceControl` 进行更新。这通过 `performSurfacePlacement` 触发的 `prepareSurfaces` 调用链完成。

![SurfaceControl 可见性更新调用栈](/img/android/visibility/06_surface_visibility.svg)

完整的调用栈如下（从底向上）：

```
SurfaceControl.Transaction.setVisibility
  ← Task.prepareSurfaces
    ← WindowContainer.prepareSurfaces (逐层递归)
      ← DisplayArea.Dimmable.prepareSurfaces
        ← DisplayContent.prepareSurfaces
          ← DisplayContent.applySurfaceChangesTransaction
            ← RootWindowContainer.applySurfaceChangesTransaction
              ← RootWindowContainer.performSurfacePlacementNoTrace
                ← RootWindowContainer.performSurfacePlacement
                  ← WindowSurfacePlacer.performSurfacePlacementLoop
                    ← WindowSurfacePlacer.performSurfacePlacement
```

`performSurfacePlacement` 在 `commitVisibility` 中通过 `mWmService.mWindowPlacerLocked.performSurfacePlacement()` 触发，最终通过 `SurfaceFlinger` 更新 Surface 的显示状态。
