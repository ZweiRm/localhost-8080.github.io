---
prev:
    text: 'WindowInsets'
    link: '/framework/windowInsets'
next:
    text: '转屏机制'
    link: '/framework/screen-rotation'
---
# StartingWindow

## 概述

### 定义

当用户点击应用图标启动应用时，系统需要进行一系列耗时任务（进程创建、资源加载、窗口绘制等）。在这些任务完成之前，StartingWindow 会先显示一个过渡页面，给用户反馈系统已经接收到打开应用的指令并正在处理。当应用完成初始化并准备好显示主界面时，StartingWindow 就会消失。

StartingWindow 属于 SystemUI 进程，按照 SystemUI 指定的参数创建窗口。SystemServer 进程负责决定何时创建窗口，SystemUI 进程负责指定窗口样式。这也是为什么 StartingWindow 相关的泄露问题都会报在 SystemUI 进程。

### 类型

StartingWindow 有三种类型常量：

```java
// ActivityRecord.java line 571
static final int STARTING_WINDOW_TYPE_NONE = 0;
static final int STARTING_WINDOW_TYPE_SNAPSHOT = 1;
static final int STARTING_WINDOW_TYPE_SPLASH_SCREEN = 2;
```

- **NONE**：不添加 StartingWindow，常见于应用内的 Activity 切换。
- **SNAPSHOT**：快照启动窗口，显示最近一次可见内容的快照截图。使用场景如 Task 从后台切换到前台、屏幕解锁。三方应用不能控制其样式。
- **SPLASH_SCREEN**：闪屏启动窗口，显示空白窗口，背景与应用主题相关。使用场景如应用冷启动。三方应用可配置具体样式。

### 常见触发时机

- **应用冷启动**：系统分配 SPLASH_SCREEN 类型的 StartingWindow，显示空白窗口，背景与应用主题相关。
- **Task 从后台切换到前台**：例如屏幕解锁或从最近任务列表重新打开应用，使用 SNAPSHOT 类型，显示最近一次的可见内容快照。

### 涉及的问题类型

- **闪屏问题**：过早移除或绘制出现问题导致闪屏。
- **动画问题**：StartingWindow 同时参与窗口动画和 WmShell 动画，两者重叠时可能出现异常。
- **泄露问题**：StartingWindow 的添加和移除依赖于应用的绘制，如果应用异常可能导致 StartingWindow 无法正常移除，引发内存泄露。
- **性能问题**：应用启动动画依赖 StartingWindow，如果出现问题会影响启动响应速度。
- **无响应问题**：StartingWindow 默认不接收输入事件，如果停留时间太长可能导致用户操作无反应。

## 添加流程

StartingWindow 的创建时机在 Activity 的启动前期阶段。在 ActivityStarter 的 `startActivityInner()` 中触发添加 StartingWindow 的流程。在添加 StartingWindow 之前，应用对应的 Task 和 ActivityRecord 都已经存在了。

### 总览

![StartingWindow 添加流程总览](/img/android/startingWindow/03_overall_architecture.svg)

### Core 侧

#### 冷启动调用堆栈

```
addStartingWindow, TaskOrganizerController
createSplashScreenStartingSurface, StartingSurfaceController
createStartingSurface, SplashScreenStartingData
scheduleAddStartingWindow, ActivityRecord
addStartingWindow, ActivityRecord
showStartingWindow, ActivityRecord
showStartingWindow, ActivityRecord
showStartingWindow, StartingSurfaceController
startActivityLocked, Task
startActivityInner, ActivityStarter
startActivityUnchecked, ActivityStarter
executeRequest, ActivityStarter
execute, ActivityStarter
startActivityAsUser, ActivityTaskManagerService
startActivityAsUser, ActivityTaskManagerService
startActivity, ActivityTaskManagerService
```

![冷启动时序图](/img/android/startingWindow/01_cold_start_sequence.svg)

#### Task#startActivityLocked

在 `startActivityInner()` 中，通过 `mTargetRootTask.startActivityLocked()` 触发添加 StartingWindow 的流程。

该方法中有一个关键变量 `boolean doShow = true`，控制是否执行 `showStartingWindow()`。在某些场景下会被置为 `false`：

```java
// Task.java line 6485
void startActivityLocked(ActivityRecord r, @Nullable Task topTask, boolean newTask,
                         boolean isTaskSwitch, ActivityOptions options,
                         @Nullable ActivityRecord sourceRecord) {
    // ... 前置处理 ...

    boolean doShow = true;
    if (newTask) {
        if ((r.intent.getFlags() & Intent.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED) != 0) {
            resetTaskIfNeeded(r, r);
            doShow = topRunningNonDelayedActivityLocked(null) == r;
        }
    } else if (options != null && options.getAnimationType()
            == ActivityOptions.ANIM_SCENE_TRANSITION) {
        doShow = false;
    }
    if (options != null && options.getDisableStartingWindow()) {
        doShow = false;
    }
    if (r.mLaunchTaskBehind) {
        // mLaunchTaskBehind 不需要 StartingWindow
        r.setVisibility(true);
        ensureActivitiesVisible(null /* starting */);
        if (!r.isVisibleRequested()) {
            r.notifyUnknownVisibilityLaunchedForKeyguardTransition();
        }
        mDisplayContent.executeAppTransition();
    } else if (SHOW_APP_STARTING_PREVIEW && doShow) {
        Task baseTask = r.getTask();
        final ActivityRecord prev = baseTask.getActivity(
                a -> a.mStartingData != null && a.showToCurrentUser());
        mWmService.mStartingSurfaceController.showStartingWindow(r, prev, newTask,
                isTaskSwitch, sourceRecord);
    }
}
```

`doShow` 被置为 `false` 的场景：
- 新 Task 且设置了 `FLAG_ACTIVITY_RESET_TASK_IF_NEEDED`，但当前顶部 Activity 不是目标 Activity
- 使用了 Scene Transition 动画
- ActivityOptions 明确禁用 StartingWindow

#### StartingSurfaceController#showStartingWindow

从 WMS 中拿到 `StartingSurfaceController` 的实例，由它负责管理 StartingWindow 的 Surface：

```java
// StartingSurfaceController.java line 198
void showStartingWindow(ActivityRecord target, ActivityRecord prev,
        boolean newTask, boolean isTaskSwitch, ActivityRecord source) {
    if (mDeferringAddStartingWindow) {
        addDeferringRecord(target, prev, newTask, isTaskSwitch, source);
    } else {
        target.showStartingWindow(prev, newTask, isTaskSwitch, true /* startActivity */,
                source);
    }
}
```

其中 `target` 就是要添加 StartingWindow 的 ActivityRecord。

#### ActivityRecord#showStartingWindow

```java
// ActivityRecord.java line 9246
void showStartingWindow(ActivityRecord prev, boolean newTask, boolean taskSwitch,
        boolean processRunning, boolean startActivity, ActivityRecord sourceRecord,
        ActivityOptions candidateOptions) {
    if (mTaskOverlay) {
        // overlay activities 不显示 StartingWindow
        return;
    }
    final ActivityOptions startOptions = candidateOptions != null
            ? candidateOptions : mPendingOptions;
    if (startOptions != null
            && startOptions.getAnimationType() == ActivityOptions.ANIM_SCENE_TRANSITION) {
        // 使用 shared element transition 时不显示 StartingWindow
        return;
    }

    int splashScreenTheme = startActivity ? getSplashscreenTheme(startOptions) : 0;

    // 验证并解析 theme
    final int resolvedTheme = evaluateStartingWindowTheme(prev, packageName, theme,
            splashScreenTheme);

    mSplashScreenStyleSolidColor = shouldUseSolidColorSplashScreen(sourceRecord, startActivity,
            startOptions, resolvedTheme);

    final boolean activityCreated =
            mState.ordinal() >= STARTED.ordinal() && mState.ordinal() <= STOPPED.ordinal();
    // 如果当前 Activity 刚创建且下面所有 Activity 都已 finish，视为 warm launch
    final boolean newSingleActivity = !newTask && !activityCreated
            && task.getActivity((r) -> !r.finishing && r != this) == null;

    final boolean scheduled = addStartingWindow(packageName, resolvedTheme,
            prev, newTask || newSingleActivity, taskSwitch, processRunning,
            allowTaskSnapshot(), activityCreated, mSplashScreenStyleSolidColor, allDrawn);
    // ...
}
```

#### evaluateStartingWindowTheme 与 validateStartingWindowTheme

`evaluateStartingWindowTheme` 是 theme 解析的入口方法，内部调用 `validateStartingWindowTheme` 进行验证：

```java
// ActivityRecord.java line 2971
private int evaluateStartingWindowTheme(ActivityRecord prev, String pkg, int originalTheme,
        int replaceTheme) {
    if (!validateStartingWindowTheme(prev, pkg, originalTheme)) {
        return 0;
    }
    int selectedTheme = originalTheme;
    if (replaceTheme != 0 && validateStartingWindowTheme(prev, pkg, replaceTheme)) {
        selectedTheme = replaceTheme;
    }
    return selectedTheme;
}
```

`validateStartingWindowTheme` 判断以下四个属性，任意一个为 `true` 则不添加 StartingWindow：

- `windowIsTranslucent` —— 透明窗口（应用设了透明属性、空 Activity 等）
- `windowIsFloating` —— 浮窗相关场景
- `windowShowWallpaper` —— 带壁纸属性（如桌面、锁屏）
- `windowDisableStarting` —— 应用主动禁用 StartingWindow

```java
// ActivityRecord.java line 3015
private boolean validateStartingWindowTheme(ActivityRecord prev, String pkg, int theme) {
    ProtoLog.v(WM_DEBUG_STARTING_WINDOW, "Checking theme of starting window: 0x%x", theme);
    if (theme == 0) {
        return false;
    }

    final WindowStyle style = theme == this.theme
            ? mWindowStyle : mAtmService.getWindowStyle(pkg, theme, mUserId);
    if (style == null) {
        return false;
    }
    final boolean windowIsTranslucent = style.isTranslucent();
    final boolean windowIsFloating = style.isFloating();
    final boolean windowShowWallpaper = style.showWallpaper();
    final boolean windowDisableStarting = style.disablePreview();
    ProtoLog.v(WM_DEBUG_STARTING_WINDOW,
            "Translucent=%s Floating=%s ShowWallpaper=%s Disable=%s",
            windowIsTranslucent, windowIsFloating, windowShowWallpaper,
            windowDisableStarting);

    if (windowIsTranslucent || windowIsFloating) {
        return false;
    }
    if (windowShowWallpaper
            && getDisplayContent().mWallpaperController.getWallpaperTarget() != null) {
        return false;
    }
    if (windowDisableStarting && !launchedFromSystemSurface()) {
        // 如果前一个 Activity 可以 transfer StartingWindow，则仍然返回 true
        return prev != null && prev.getActivityType() == ACTIVITY_TYPE_STANDARD
                && prev.mTransferringSplashScreenState == TRANSFER_SPLASH_SCREEN_IDLE
                && (prev.mStartingData != null
                || (prev.mStartingWindow != null && prev.mStartingSurface != null));
    }
    return true;
}
```

应用侧可通过 theme 属性控制 StartingWindow 的行为，例如：

```xml
<style name="AppTheme.StartingWindowTheme" parent="AppTheme">
    <item name="android:windowSplashScreenBackground">@color/colorPrimary</item>
    <item name="android:windowSplashScreenAnimatedIcon">@mipmap/ic_launcher</item>
    <item name="android:windowSplashScreenAnimationDuration">1000</item>
    <!-- 设置为 true 将导致系统不添加 StartingWindow -->
    <item name="android:windowIsTranslucent">true</item>
</style>
```

#### ActivityRecord#addStartingWindow（关键方法）

这是 StartingWindow 添加流程中的核心方法，包含三块逻辑：
1. 判断是否有必要添加 StartingWindow，若无需添加则直接 return false
2. 通过 `getStartingWindowType()` 获取要添加的类型
3. 根据类型执行具体的添加逻辑

```java
// ActivityRecord.java line 3072
boolean addStartingWindow(String pkg, int resolvedTheme, ActivityRecord from, boolean newTask,
        boolean taskSwitch, boolean processRunning, boolean allowTaskSnapshot,
        boolean activityCreated, boolean isSimple,
        boolean activityAllDrawn) {
    // 屏幕冻结时不添加
    if (!okToDisplay()) {
        return false;
    }
    // 已有 StartingWindow 不重复添加
    if (hasStartingWindow()) {
        return false;
    }
    // 主窗口已绘制完成，不需要 StartingWindow
    final WindowState mainWin = findMainWindow(false /* includeStartingApp */);
    if (mainWin != null && mainWin.isDrawn()) {
        return false;
    }

    // 获取 TaskSnapshot
    final TaskSnapshot snapshot =
            mWmService.mTaskSnapshotController.getSnapshot(task.mTaskId, task.mUserId,
                    false /* restoreFromDisk */, false /* isLowResolution */);

    // 判断 StartingWindow 类型
    final int type = getStartingWindowType(newTask, taskSwitch, processRunning,
            allowTaskSnapshot, activityCreated, activityAllDrawn, snapshot);

    // 判断是否使用旧版 splash screen
    final boolean useLegacy = type == STARTING_WINDOW_TYPE_SPLASH_SCREEN
            && mWmService.mStartingSurfaceController.isExceptionApp(packageName, mTargetSdk,
                () -> {
                    ActivityInfo activityInfo = intent.resolveActivityInfo(
                            mAtmService.mContext.getPackageManager(),
                            PackageManager.GET_META_DATA);
                    return activityInfo != null ? activityInfo.applicationInfo : null;
                });

    final int typeParameter = StartingSurfaceController
            .makeStartingWindowTypeParameter(newTask, taskSwitch, processRunning,
                    allowTaskSnapshot, activityCreated, isSimple, useLegacy, activityAllDrawn,
                    type, isIconStylePreferred(resolvedTheme), packageName, mUserId);

    // ===== Snapshot 类型路径 =====
    if (type == STARTING_WINDOW_TYPE_SNAPSHOT) {
        if (isActivityTypeHome()) {
            // Home 的 snapshot 只使用一次
            mWmService.mTaskSnapshotController.removeSnapshotCache(task.mTaskId);
            if ((mDisplayContent.mAppTransition.getTransitFlags()
                    & WindowManager.TRANSIT_FLAG_KEYGUARD_GOING_AWAY_NO_ANIMATION) == 0) {
                // 仅在直接解锁时使用 Home 的 snapshot 作为 StartingWindow
                return false;
            }
        }
        return createSnapshot(snapshot, typeParameter);
    }

    // resolvedTheme 为 0 但原始 theme 不为 0，说明应用不想要 StartingWindow
    if (resolvedTheme == 0 && theme != 0) {
        return false;
    }

    // 尝试从前一个 Activity transfer StartingWindow
    if (from != null && transferStartingWindow(from)) {
        return true;
    }

    // 非 SPLASH_SCREEN 类型则不创建
    if (type != STARTING_WINDOW_TYPE_SPLASH_SCREEN) {
        return false;
    }

    // ===== Splash Screen 类型路径 =====
    ProtoLog.v(WM_DEBUG_STARTING_WINDOW, "Creating SplashScreenStartingData");
    mStartingData = new SplashScreenStartingData(mWmService, resolvedTheme, typeParameter);
    scheduleAddStartingWindow();
    return true;
}
```

#### getStartingWindowType（类型判定）

该方法根据当前启动场景判断应该使用哪种类型的 StartingWindow：

```java
// ActivityRecord.java line 3320
private int getStartingWindowType(boolean newTask, boolean taskSwitch, boolean processRunning,
        boolean allowTaskSnapshot, boolean activityCreated, boolean activityAllDrawn,
        TaskSnapshot snapshot) {
    // 特殊情况：新 Activity 启动到一个正在移到前台的已有 Task 中
    // 如果启动的 Activity 就是创建该 Task 的 Activity，可能是 trampoline，
    // 尝试使用当前运行 Activity 的 snapshot 使过渡更平滑
    if (!newTask && taskSwitch && processRunning && !activityCreated && task.intent != null
            && mActivityComponent.equals(task.intent.getComponent())) {
        final ActivityRecord topAttached = task.getActivity(ActivityRecord::attachedToProcess);
        if (topAttached != null) {
            if (topAttached.isSnapshotCompatible(snapshot)
                    && mDisplayContent.getDisplayRotation().rotationForOrientation(
                    getOverrideOrientation(),
                    mDisplayContent.getRotation()) == snapshot.getRotation()) {
                return STARTING_WINDOW_TYPE_SNAPSHOT;
            }
            // 没有可用的 snapshot，且 trampoline 之后会立即显示已有 Activity，
            // 显示 splash screen 可能不合适
            return STARTING_WINDOW_TYPE_NONE;
        }
    }

    final boolean isActivityHome = isActivityTypeHome();

    // 新 Task、进程未启动、或 Task 切换且 Activity 未创建 → Splash Screen
    if ((newTask || !processRunning || (taskSwitch && !activityCreated))
            && !isActivityHome) {
        return STARTING_WINDOW_TYPE_SPLASH_SCREEN;
    }

    if (taskSwitch) {
        if (allowTaskSnapshot) {
            // Task 切换且允许使用 snapshot
            if (isSnapshotCompatible(snapshot)) {
                return STARTING_WINDOW_TYPE_SNAPSHOT;
            }
            // Snapshot 不兼容（如方向不一致），非 Home 则使用 Splash Screen
            if (!isActivityHome) {
                return STARTING_WINDOW_TYPE_SPLASH_SCREEN;
            }
        }
        // 虽然不允许 snapshot，但 Activity 尚未完成绘制，使用 Splash Screen
        if (!activityAllDrawn && !isActivityHome) {
            return STARTING_WINDOW_TYPE_SPLASH_SCREEN;
        }
    }
    return STARTING_WINDOW_TYPE_NONE;
}
```

类型判定的核心逻辑总结：

| 场景 | 返回类型 |
|------|---------|
| 新 Task / 冷启动（进程未启动）/ Task 切换且 Activity 未创建 | SPLASH_SCREEN |
| Task 切换且 snapshot 兼容 | SNAPSHOT |
| Task 切换但 snapshot 不兼容 | SPLASH_SCREEN |
| Trampoline 场景且 snapshot 可用 | SNAPSHOT |
| Trampoline 场景且 snapshot 不可用 | NONE |
| 其他（如应用内 Activity 切换） | NONE |

#### Snapshot 类型路径

如果类型为 SNAPSHOT，执行 `createSnapshot()` 创建启动窗口：

```java
// ActivityRecord.java line 3252
private boolean createSnapshot(TaskSnapshot snapshot, int typeParams) {
    if (snapshot == null) {
        return false;
    }
    ProtoLog.v(WM_DEBUG_STARTING_WINDOW, "Creating SnapshotStartingData");
    mStartingData = new SnapshotStartingData(mWmService, snapshot, typeParams);
    if ((!mStyleFillsParent && task.getChildCount() > 1)
            || task.forAllLeafTaskFragments(TaskFragment::isEmbedded)) {
        // Case 1: Task 中有透明 Activity 在上面，使用 shared starting window
        // Case 2: Activity 被 TaskFragment resize 时保持 StartingWindow 与 Task 同 bounds
        associateStartingDataWithTask();
    }
    scheduleAddStartingWindow();
    return true;
}
```

`SnapshotStartingData` 的 `createStartingSurface()` 会调用到 `StartingSurfaceController.createTaskSnapshotSurface()`：

```java
// SnapshotStartingData.java line 38
@Override
StartingSurface createStartingSurface(ActivityRecord activity) {
    return mService.mStartingSurfaceController.createTaskSnapshotSurface(activity,
            mSnapshot);
}
```

```java
// StartingSurfaceController.java line 150
StartingSurface createTaskSnapshotSurface(ActivityRecord activity, TaskSnapshot taskSnapshot) {
    final Task task = activity.getTask();
    if (task == null) {
        return null;
    }
    final WindowState mainWindow = task
            .getTopFullscreenMainWindow(false /* includeStartingApp */);
    if (mainWindow == null) {
        return null;
    }
    if (activity.mDisplayContent.getRotation() != taskSnapshot.getRotation()) {
        activity.mDisplayContent.handleTopActivityLaunchingInDifferentOrientation(
                activity, false /* checkOpening */);
    }
    final TaskOrganizerController controller =
            mService.mAtmService.mTaskOrganizerController;
    if (controller.addStartingWindow(task, activity, 0 /* launchTheme */, taskSnapshot)) {
        return new StartingSurface(task, controller.getTaskOrganizer());
    }
    return null;
}
```

#### Splash Screen 类型路径

如果类型为 SPLASH_SCREEN，创建 `SplashScreenStartingData` 并调度添加：

```java
// SplashScreenStartingData.java line 48
@Override
StartingSurface createStartingSurface(ActivityRecord activity) {
    return mService.mStartingSurfaceController.createSplashScreenStartingSurface(
            activity, mTheme);
}
```

```java
// StartingSurfaceController.java line 85
StartingSurface createSplashScreenStartingSurface(ActivityRecord activity, int theme) {
    final Task task = activity.getTask();
    final TaskOrganizerController controller =
            mService.mAtmService.mTaskOrganizerController;
    if (task != null && controller.addStartingWindow(
            task, activity, theme, null /* taskSnapshot */)) {
        return new StartingSurface(task, controller.getTaskOrganizer());
    }
    return null;
}
```

#### 两种类型的汇合点：TaskOrganizerController#addStartingWindow

> `TaskOrganizerController` 是 WMS Organizer 框架的一部分，负责 Task 级别的窗口委托管理。关于其注册机制、回调分发和整体架构，参见 [WMS Organizer 机制](./wms-organizer.md)。

无论是 Snapshot 还是 Splash Screen 类型，最终都会调用到 `TaskOrganizerController.addStartingWindow()`，通过 Binder 跨进程调用到 SystemUI（WmShell）：

```java
// TaskOrganizerController.java line 631
boolean addStartingWindow(Task task, ActivityRecord activity, int launchTheme,
        TaskSnapshot taskSnapshot) {
    final Task rootTask = task.getRootTask();
    if (rootTask == null || activity.mStartingData == null) {
        return false;
    }
    final ITaskOrganizer lastOrganizer = getTaskOrganizer();
    if (lastOrganizer == null) {
        return false;
    }
    final StartingWindowInfo info = task.getStartingWindowInfo(activity);
    if (launchTheme != 0) {
        info.splashScreenThemeResId = launchTheme;
    }
    info.taskSnapshot = taskSnapshot;
    info.appToken = activity.token;
    try {
        lastOrganizer.addStartingWindow(info);
    } catch (RemoteException e) {
        Slog.e(TAG, "Exception sending onTaskStart callback", e);
        return false;
    }
    return true;
}
```

#### scheduleAddStartingWindow

在保存了 StartingData 后，通过 `scheduleAddStartingWindow()` 真正触发创建流程：

```java
// ActivityRecord.java line 3280
private void scheduleAddStartingWindow() {
    ProtoLog.v(WM_DEBUG_STARTING_WINDOW, "Add starting %s: startingData=%s",
            this, mStartingData);
    // createStartingSurface 有两个实现类(SplashScreenStartingData / SnapshotStartingData)，
    // 根据 type 调用对应方法
    mStartingSurface = mStartingData.createStartingSurface(ActivityRecord.this);
    if (mStartingSurface != null) {
        ProtoLog.v(WM_DEBUG_STARTING_WINDOW,
                "Added starting %s: startingWindow=%s startingView=%s",
                ActivityRecord.this, mStartingWindow, mStartingSurface);
    }
    // ...
}
```

### WmShell 侧

通过 `TaskOrganizerController` Binder 调用后，流程来到 SystemUI 进程中的 WmShell 模块。

![WmShell 侧时序图](/img/android/startingWindow/02_wmshell_sequence.svg)

#### StartingWindowController#addStartingWindow

```java
// StartingWindowController.java line 163
public void addStartingWindow(StartingWindowInfo windowInfo) {
    mSplashScreenExecutor.execute(() -> {
        Trace.traceBegin(TRACE_TAG_WINDOW_MANAGER, "addStartingWindow");

        final int suggestionType = mStartingWindowTypeAlgorithm.getSuggestedWindowType(
                windowInfo);
        final RunningTaskInfo runningTaskInfo = windowInfo.taskInfo;
        if (suggestionType == STARTING_WINDOW_TYPE_WINDOWLESS) {
            mStartingSurfaceDrawer.addWindowlessStartingSurface(windowInfo);
        } else if (isSplashScreenType(suggestionType)) {
            mStartingSurfaceDrawer.addSplashScreenStartingWindow(windowInfo, suggestionType);
        } else if (suggestionType == STARTING_WINDOW_TYPE_SNAPSHOT) {
            final TaskSnapshot snapshot = windowInfo.taskSnapshot;
            mStartingSurfaceDrawer.makeTaskSnapshotWindow(windowInfo, snapshot);
        }
        if (suggestionType != STARTING_WINDOW_TYPE_NONE
                && suggestionType != STARTING_WINDOW_TYPE_WINDOWLESS) {
            int taskId = runningTaskInfo.taskId;
            int color = mStartingSurfaceDrawer
                    .getStartingWindowBackgroundColorForTask(taskId);
            if (color != Color.TRANSPARENT) {
                synchronized (mTaskBackgroundColors) {
                    mTaskBackgroundColors.append(taskId, color);
                }
            }
            if (mTaskLaunchingCallback != null && isSplashScreenType(suggestionType)) {
                mTaskLaunchingCallback.accept(taskId, suggestionType, color);
            }
        }

        Trace.traceEnd(TRACE_TAG_WINDOW_MANAGER);
    });
}
```

根据 `suggestionType` 分发到 `StartingSurfaceDrawer` 的不同方法：
- **SPLASH_SCREEN / SOLID_COLOR / LEGACY** → `addSplashScreenStartingWindow()`：在 `SplashscreenWindowCreator` 中通过 `SplashscreenContentDrawer.makeSplashScreenContentView()` 指定样式，然后通过 `WindowManagerGlobal.addView()` 添加窗口
- **SNAPSHOT** → `makeTaskSnapshotWindow()`：创建 snapshot 类型的 StartingWindow
- **WINDOWLESS** → `addWindowlessStartingSurface()`

对于 Splash Screen 类型，`SplashscreenContentDrawer.makeSplashScreenContentView()` 负责创建具体的 `SplashScreenView`，这是一个 View，指定了启动窗口的样式：

```java
// SplashscreenContentDrawer.java line 447
private SplashScreenView makeSplashScreenContentView(Context context, StartingWindowInfo info,
        @StartingWindowType int suggestType, Consumer<Runnable> uiThreadInitConsumer) {
    updateDensity();
    getWindowAttrs(context, mTmpAttrs);
    // ...
    return new SplashViewBuilder(context, ai)
        .setWindowBGColor(themeBGColor)
        .overlayDrawable(legacyDrawable)
        .chooseStyle(splashType)
        .setUiThreadInitConsumer(uiThreadInitConsumer)
        .setAllowHandleSolidColor(info.allowHandleSolidColorSplashScreen())
        .build();
}
```

随后在 `SplashscreenWindowCreator.addWindow()` 中通过 `WindowManagerGlobal.addView()` 添加窗口，即 StartingWindow 窗口：

```java
// SplashscreenWindowCreator.java line 343
protected boolean addWindow(int taskId, IBinder appToken, View view, Display display,
        WindowManager.LayoutParams params,
        @StartingWindowInfo.StartingWindowType int suggestType) {
    // ...
    mWindowManagerGlobal.addView(view, params, display,
            null /* parentWindow */, context.getUserId());
    // ...
}
```

之后的流程就是标准的窗口添加流程。

### 窗口绑定：attachStartingWindow

在 WMS 添加 StartingWindow 窗口时，由于窗口类型为 `TYPE_APPLICATION_STARTING`，会触发 `attachStartingWindow()`，将 StartingWindow 的窗口与对应的 Activity 或 Task 关联：

```java
// ActivityRecord.java line 3638
void attachStartingWindow(@NonNull WindowState startingWindow) {
    startingWindow.mStartingData = mStartingData;
    mStartingWindow = startingWindow;
    if (mStartingData != null) {
        if (mStartingData.mAssociatedTask != null) {
            // Snapshot 类型可能调用了 associateStartingDataWithTask()
            if (!hasFixedRotationTransform()) {
                attachStartingSurfaceToAssociatedTask();
            }
        } else if (isEmbedded()) {
            associateStartingWindowWithTaskIfNeeded();
        }
        if (mTransitionController.isCollecting()) {
            mStartingData.mTransitionId = mTransitionController.getCollectingTransitionId();
        }
    }
}
```

## 移除流程

一般触发移除的时机是应用第一帧绘制完毕。应用在绘制第一帧之前若自身 Activity 被销毁也会触发移除。

![移除流程时序图](/img/android/startingWindow/04_removal_sequence.svg)

### 触发条件

应用绘制完成第一帧后，通过客户端侧 `ViewRootImpl.reportDrawFinished()` 通知系统：

```java
// ViewRootImpl 中
private void reportDrawFinished(@Nullable Transaction t, int seqId) {
    // ...
    mWindowSession.finishDrawing(mWindow, t, seqId);
    // ...
}
```

之后找到对应的 ActivityRecord，调用 `onFirstWindowDrawn()`，触发移除 StartingWindow：

```java
// ActivityRecord.java line 8461
void onFirstWindowDrawn(WindowState win) {
    firstWindowDrawn = true;
    mSplashScreenStyleSolidColor = true;
    mAtmService.mBackNavigationController.removePredictiveSurfaceIfNeeded(this);

    if (mStartingWindow != null) {
        ProtoLog.v(WM_DEBUG_STARTING_WINDOW, "Finish starting %s"
                + ": first real window is shown, no animation", win.mToken);
        win.cancelAnimation();
    }

    final Task associatedTask = task.mSharedStartingData != null ? task : null;
    if (associatedTask == null) {
        removeStartingWindow();
    } else if (associatedTask.getActivity(
            r -> r.isVisibleRequested() && !r.firstWindowDrawn) == null) {
        // 关联 Task 中所有可见 Activity 都已绘制完成
        associatedTask.forAllActivities(r -> {
            r.removeStartingWindow();
        });
    }
}
```

### removeStartingWindow

```java
// ActivityRecord.java line 3703
void removeStartingWindow() {
    // ...
    if (mStartingData != null
            && mStartingData.mRemoveAfterTransaction == AFTER_TRANSITION_FINISH) {
        return;
    }
    if (transferSplashScreenIfNeeded()) {
        return;
    }
    removeStartingWindowAnimation(true /* prepareAnimation */);
    // ...
}
```

`removeStartingWindowAnimation()` 中会通过 `StartingSurfaceController.StartingSurface.remove()` → `TaskOrganizerController.removeStartingWindow()` 跨进程通知 SystemUI 移除 StartingWindow。

### Splash Screen 类型移除

流程来到 SystemUI 侧的 `SplashscreenWindowCreator`：

```java
// SplashscreenWindowCreator.java line 455
public boolean removeIfPossible(StartingWindowRemovalInfo info, boolean immediately) {
    if (mRootView == null) {
        return true;
    }
    if (mSplashView == null) {
        Slog.e(TAG, "Found empty splash screen, remove!");
        removeWindowInner(mRootView, false);
        return true;
    }
    if (immediately
            || mSuggestType == STARTING_WINDOW_TYPE_LEGACY_SPLASH_SCREEN) {
        removeWindowInner(mRootView, false);
    } else {
        if (info.playRevealAnimation) {
            // 播放退出动画后移除
            mSplashscreenContentDrawer.applyExitAnimation(mSplashView,
                    info.windowAnimationLeash, info.mainFrame,
                    () -> removeWindowInner(mRootView, true),
                    mCreateTime, info.roundedCornerRadius);
        } else {
            // SplashScreenView 已复制到客户端，隐藏并跳过默认退出动画
            removeWindowInner(mRootView, true);
        }
    }
    return true;
}
```

`removeWindowInner()` 中通过 `WindowManagerGlobal.removeView()` 通知 WMS 移除窗口，进入标准的窗口移除流程：

```java
// SplashscreenWindowCreator.java line 379
private void removeWindowInner(@NonNull View decorView, boolean hideView) {
    requestTopUi(false);
    if (!decorView.isAttachedToWindow()) {
        return;
    }
    if (hideView) {
        decorView.setVisibility(View.GONE);
    }
    mWindowManagerGlobal.removeView(decorView, false /* immediate */);
}
```

### Snapshot 类型移除

Snapshot 类型的移除位于 `StartingSurfaceDrawer` 内部类 `TaskSnapshotWindow`：

```java
// StartingSurfaceDrawer.java line 279
public final boolean removeIfPossible(StartingWindowRemovalInfo info, boolean immediately) {
    if (immediately
            || mActivityType == ACTIVITY_TYPE_HOME
            || info.deferRemoveMode == DEFER_MODE_NONE) {
        removeImmediately();
        return true;
    }
    scheduleRemove(info.deferRemoveMode);
    return false;
}
```

## 关键日志

开启 StartingWindow 相关日志：

```shell
adb shell wm logging enable-text WM_DEBUG_STARTING_WINDOW
```

以冷启动设置（`com.android.settings`）为例，关键日志如下：

**1. 创建 Activity**

```
wm_create_activity: [0,144889413,184,com.android.settings/.MainSettings,
    android.intent.action.MAIN,NULL,NULL,270532608]
```

**2. 检查 StartingWindow 的 theme**

```
WindowManager: Checking theme of starting window: 0x7f1605c7
```

**3. 尝试添加 StartingWindow（包含详细参数信息）**

```
WindowManager: Try to add startingWindow type = STARTING_WINDOW_TYPE_SPLASH_SCREEN
    this = ActivityRecord{...com.android.settings/.MainSettings t184}
    newTask = true  taskSwitch = true  processRunning = true
    activityCreated = false  activityAllDrawn = false
```

**4. 创建 StartingData（此时窗口尚未创建）**

```
WindowManager: Creating SplashScreenStartingData
WindowManager: Add starting ActivityRecord{...}: startingData=SplashScreenStartingData{...}
WindowManager: Added starting ActivityRecord{...}: startingWindow=null
    startingView=StartingSurface@...
```

**5. 来到 SystemUI 侧，指定样式并添加窗口**

```
ShellStartingWindow: addSplashScreen for package: com.android.settings
    with theme: 7f1605c7 for task: 184, suggestType: 1
```

**6. WMS 创建 StartingWindow 窗口**

```
WindowManager: Add startingWindow, surfaceControl = Surface(name=...
    Splash Screen com.android.settings#644) layerId = 644
```

**7. StartingWindow 绘制完成**

```
WindowManager: Finishing drawing window Window{... Splash Screen com.android.settings}:
    mDrawState=DRAW_PENDING
WindowManager: wms.showSurfaceRobustly mWin:Window{... Splash Screen com.android.settings}
```

**8. 应用第一帧绘制完成，触发移除**

```
WindowManager: onFirstWindowDrawn, try to remove startingWindow.
    this = ActivityRecord{...com.android.settings/.MainSettings t184}
```

**9. 调度移除**

```
WindowManager: Schedule remove starting ActivityRecord{...}
    startingWindow=Window{... Splash Screen com.android.settings}
    animate=true
```

**10. SystemUI 侧移除**

```
ShellStartingWindow: Task start finish, remove starting surface for task: 184
```

**11. WMS 移除窗口**

```
WindowManager: Starting window removed Window{... Splash Screen com.android.settings}
```

**12. 退出动画完成后真正移除**

```
WindowManager: StartingWindow exit animation finished,
    win = Window{... Splash Screen com.android.settings EXITING} remove = true
WindowManager: postWindowRemoveCleanupLocked: Removing startingWindow
    Window{... Splash Screen com.android.settings}
    from ActivityRecord{...com.android.settings/.MainSettings t184}
```
