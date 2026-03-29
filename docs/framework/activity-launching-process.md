---
prev:
    text: 'WMS 架构与运行原理分析'
    link: 'framework/basic-with-wms'
next:
    text: '窗口添加和移除'
    link: '/framework/window-add-remove'
---

# Activity 启动流程与生命周期

> 基于 AOSP 源码，完整分析从 Launcher 点击应用图标到目标 Activity 完成 `onResume` 的全过程。

## 前言

### 目标读者与阅读建议

本文面向对 Android Framework 不熟悉的开发者。阅读前建议了解 Android 四大组件的基本概念和 Binder IPC 机制。

### 三个核心模块

应用启动流程涉及 3 个核心模块，分别运行在 3 个不同的进程中：

| 模块 | 所在进程 | 职责 |
|------|---------|------|
| SourceActivity | Launcher 进程 | 发起启动请求，执行 pause 流程 |
| AMS（ATMS / AMS） | system_server 进程 | 处理启动请求，管理 Activity 生命周期，管理窗口层级 |
| TargetActivity | 目标应用进程 | 被启动的目标 Activity |

**类比说明**：可以把这三个模块想象成一个公司的协作流程。SourceActivity 是"提出需求的部门"，AMS 是"管理层"（负责审批、调度资源、分配任务），TargetActivity 是"执行部门"。管理层（AMS）收到需求后，先通知原部门暂停手头工作（pause），同时安排新部门做准备（创建进程），一切就绪后才让新部门正式开始工作（启动 Activity）。

![三个核心模块](/img/android/app_launching/01_three_modules.svg)

## 总体流程概览

### 4 阶段总览

整个启动流程分为 4 个阶段：

![4 阶段总览图](/img/android/app_launching/02_four_phase_overview.svg)


| 阶段 | 名称 | 关键操作 | 触发方 |
|------|------|----------|--------|
| 1 | Launcher 发起启动请求 | 创建 ActivityRecord/Task，触发 pause + 进程创建 | Launcher → system_server |
| 2 | completePause | Launcher 完成 onPause，AMS 尝试启动目标 Activity | system_server |
| 3 | 创建应用进程 | Zygote fork 新进程，attachApplication 通知 AMS | Zygote → 新进程 → system_server |
| 4 | 真正启动 Activity | realStartActivityLocked → onCreate → onResume | system_server → 新进程 |

### 阶段二/三的异步竞争关系

**这是理解启动流程最关键的一点**：阶段一结束时会**同时**触发两条异步路径——Launcher 的 pause（阶段二）和目标应用进程的创建（阶段三）。两者执行顺序不确定。

成功启动 TargetActivity 必须**同时满足 2 个先决条件**：
1. 目标应用进程创建完毕
2. Launcher（SourceActivity）执行完 pause

无论阶段二还是阶段三先完成，最终都会调用 `realStartActivityLocked` 方法。如果另一个条件尚未满足，该方法会直接 return，等待条件满足后再次触发。

#### 场景分析：谁先完成？

**情况一：completePause 先完成（阶段二先于阶段三）**

Launcher 先完成 pause，流程走到 `startSpecificActivity`。此时进程还没创建好，`wpc.hasThread()` 为 false，所以不会执行 `realStartActivityLocked`，而是再次触发 `startProcessAsync`（当然之前已经触发过了，不会重复创建）。之后等阶段三进程创建好，走到 `RootWindowContainer.attachApplication()` 时，发现 pause 已完成，`realStartActivityLocked` 成功执行，触发 TargetActivity 启动。

**情况二：进程创建先完成（阶段三先于阶段二）**

进程先创建好，走到 `realStartActivityLocked`，但发现 Launcher 还没执行完 pause（`allPausedActivitiesComplete()` 返回 false），所以直接 return。之后等 Launcher 完成 pause，completePause 流程走到 `startSpecificActivity`，此时发现进程已经创建好，直接执行 `realStartActivityLocked`，触发 TargetActivity 启动。

> 无论哪种情况，最终结果一样：两个条件都满足后，TargetActivity 被启动。区别只是由哪条路径最终触发了 `realStartActivityLocked` 的成功执行。

![异步竞争关系](/img/android/app_launching/03_async_competition.svg)


### 完整流程图

下图展示了跨 4 个进程（Launcher / system_server / Zygote / 目标应用）的完整调用路径。图中标注了：
- 每个关键方法在哪个进程中执行
- 各进程间的 Binder IPC 交互
- 阶段二（pause）和阶段三（进程创建）的并行分支
- 关键 events 日志标签（(a)~(k)），可与附录 B 的日志示例对照
- 编号步骤 1~6，对应文档1原始流程图中的 6 个阶段标注

![完整流程图](/img/android/app_launching/04_full_process_overview.svg)

## 一、阶段一：Launcher 发起启动请求

### 1.1 应用端处理（Launcher → ATMS）

当用户在 Launcher 中点击应用图标时，经过 Launcher 内部调用链，最终通过 `Instrumentation.execStartActivity()` 跨进程调用到 `ActivityTaskManagerService.startActivity()`。

调用链：
```
Launcher.startActivitySafely()
  → Activity.startActivity()
    → Activity.startActivityForResult()
      → Instrumentation.execStartActivity()
        → ATMS.startActivity()  [Binder IPC: Launcher 进程 → system_server 进程]
```

![Launcher 请求 ATMS 流程](/img/android/app_launching/05_launcher_to_atms.svg)


#### startActivitySafely

Launcher 调用 `startActivitySafely()` 方法，为 Intent 添加 `FLAG_ACTIVITY_NEW_TASK` 标志（在新的 Task 中启动 Activity），然后调用 `Activity.startActivity()`。

```java
// ActivityContext.java
default RunnableList startActivitySafely(
        View v, Intent intent, @Nullable ItemInfo item) {
    // 添加 FLAG_ACTIVITY_NEW_TASK
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    ...
    context.startActivity(intent, optsBundle);
    ...
}
```

#### startActivityForResult

`startActivity()` 最终调用 `startActivityForResult()`，传入 `requestCode = -1` 表示 Launcher 不需要知道目标 Activity 的启动结果。

```java
// Activity.java
public void startActivityForResult(@RequiresPermission Intent intent, int requestCode,
        @Nullable Bundle options) {
    if (mParent == null) {
        options = transferSpringboardActivityOptions(options);
        Instrumentation.ActivityResult ar =
            mInstrumentation.execStartActivity(
                this, mMainThread.getApplicationThread(), mToken, this,
                intent, requestCode, options);
        ...
    }
}
```

#### Instrumentation 跨进程调用 ATMS

`Instrumentation` 负责调用 Activity 和 Application 的生命周期，具有跟踪生命周期的功能。每个 Activity 都持有 `Instrumentation` 对象的引用，但整个进程只存在一个 `Instrumentation` 对象。

```java
// Instrumentation.java
public ActivityResult execStartActivity(
        Context who, IBinder contextThread, IBinder token, Activity target,
        Intent intent, int requestCode, Bundle options) {
    ...
    try {
        // 通过 Binder 跨进程调用 ATMS 的 startActivity 方法
        int result = ActivityTaskManager.getService().startActivity(whoThread,
                who.getOpPackageName(), who.getAttributionTag(), intent,
                intent.resolveTypeIfNeeded(who.getContentResolver()), token,
                target != null ? target.mEmbeddedID : null,
                requestCode, 0, null, options);
        // 通知 ActivityMonitor 启动结果
        notifyStartActivityResult(result, options);
        // 检查启动结果，失败则抛出异常
        checkStartActivityResult(result, intent);
    } catch (RemoteException e) {
        throw new RuntimeException("Failure from system", e);
    }
    return null;
}
```

`ActivityTaskManager.getService()` 获取 ATMS 的代理对象。ATMS 位于 `system_server` 进程，通过 Binder IPC 进行跨进程调用：

```java
// ActivityTaskManager.java
public static IActivityTaskManager getService() {
    return IActivityTaskManagerSingleton.get();
}

private static final Singleton<IActivityTaskManager> IActivityTaskManagerSingleton =
        new Singleton<IActivityTaskManager>() {
            @Override
            protected IActivityTaskManager create() {
                final IBinder b = ServiceManager.getService(Context.ACTIVITY_TASK_SERVICE);
                return IActivityTaskManager.Stub.asInterface(b);
            }
        };
```

#### checkStartActivityResult

IPC 调用返回后，`checkStartActivityResult` 检查错误码。常见的**未在 AndroidManifest.xml 中注册 Activity** 导致的 `ActivityNotFoundException` 就是在这里抛出的：

```java
// Instrumentation.java (line 2456)
public static void checkStartActivityResult(int res, Object intent) {
    if (!ActivityManager.isStartResultFatalError(res)) {
        return;
    }

    switch (res) {
        case ActivityManager.START_INTENT_NOT_RESOLVED:
        case ActivityManager.START_CLASS_NOT_FOUND:
            if (intent instanceof Intent && ((Intent)intent).getComponent() != null)
                throw new ActivityNotFoundException(
                        "Unable to find explicit activity class "
                        + ((Intent)intent).getComponent().toShortString()
                        + "; have you declared this activity in your AndroidManifest.xml"
                        + ", or does your intent not match its declared <intent-filter>?");
            throw new ActivityNotFoundException(
                    "No Activity found to handle " + intent);
        case ActivityManager.START_PERMISSION_DENIED:
            throw new SecurityException("Not allowed to start activity " + intent);
        case ActivityManager.START_FORWARD_AND_REQUEST_CONFLICT:
            throw new AndroidRuntimeException(
                    "FORWARD_RESULT_FLAG used while also requesting a result");
        case ActivityManager.START_NOT_ACTIVITY:
            throw new IllegalArgumentException(
                    "PendingIntent is not an activity");
        case ActivityManager.START_NOT_VOICE_COMPATIBLE:
            throw new SecurityException(
                    "Starting under voice control not allowed for: " + intent);
        case ActivityManager.START_VOICE_NOT_ACTIVE_SESSION:
            throw new IllegalStateException(
                    "Session calling startVoiceActivity does not match active session");
        case ActivityManager.START_VOICE_HIDDEN_SESSION:
            throw new IllegalStateException(
                    "Cannot start voice activity on a hidden session");
        case ActivityManager.START_ASSISTANT_NOT_ACTIVE_SESSION:
            throw new IllegalStateException(
                    "Session calling startAssistantActivity does not match active session");
        case ActivityManager.START_ASSISTANT_HIDDEN_SESSION:
            throw new IllegalStateException(
                    "Cannot start assistant activity on a hidden session");
        case ActivityManager.START_CANCELED:
            throw new AndroidRuntimeException("Activity could not be started for " + intent);
        default:
            throw new AndroidRuntimeException("Unknown error code " + res + " when starting " + intent);
    }
}
```

### 1.2 system_server 处理请求

ATMS 收到启动请求后，通过 `ActivityStarter` 类处理 Activity 的启动逻辑。

调用链：
```
ATMS.startActivity()
  → ActivityStarter.execute()
    → ActivityStarter$Request.resolveActivity()  -- 解析 resolveInfo / activityInfo
    → ActivityStarter.executeRequest()           -- 创建 ActivityRecord
      → ActivityStarter.startActivityUnchecked()
        → ActivityStarter.startActivityInner()
```

`Request.resolveActivity()` 解析 `resolveInfo` 和 `activityInfo`。TargetActivity 所在的进程包名和 TargetActivity 的完整路径都保存在 `activityInfo` 中。如果 `activityInfo` 为 `null`，说明 PackageManagerService 无法解析该 Intent，会导致启动失败（详见附录 C.5）。

### 1.3 创建 ActivityRecord

在 `executeRequest()` 中创建 `ActivityRecord`，它包含了目标 Activity 的所有信息：

```java
// ActivityStarter.java # executeRequest
final ActivityRecord r = new ActivityRecord.Builder(mService)
        .setCaller(callerApp)
        .setLaunchedFromPid(callingPid)
        .setLaunchedFromUid(callingUid)
        .setLaunchedFromPackage(callingPackage)
        .setLaunchedFromFeature(callingFeatureId)
        .setIntent(intent)
        .setResolvedType(resolvedType)
        .setActivityInfo(aInfo)
        .setConfiguration(mService.getGlobalConfiguration())
        .setResultTo(resultRecord)
        .setResultWho(resultWho)
        .setRequestCode(requestCode)
        .setComponentSpecified(request.componentSpecified)
        .setRootVoiceInteraction(voiceSession != null)
        .setActivityOptions(checkedOptions)
        .setSourceRecord(sourceRecord)
        .build();
```

**ActivityRecord 的 Token 机制**：`ActivityRecord` 的父类是 `WindowToken`，在构造时会创建一个 Token（匿名 Binder 对象），保存在 `WindowToken` 中。Token 是 Activity 在 system_server 里的**唯一标识符**，贯穿整个 Activity 的生命周期管理。

> `"START u"` 日志就在 `executeRequest` 方法中打印，这是分析 Activity 启动流程的关键日志。

### 1.4 窗口层级树操作

`startActivityInner` 是 Activity 启动流程中**最重要的函数之一**，负责在窗口层级树上完成 3 个操作：

1. **创建 Task** — `getOrCreateRootTask()`
2. **挂载 ActivityRecord** — `setNewTask()`
3. **移动到栈顶** — `moveToFront()`

```java
// ActivityStarter.java # startActivityInner
int startActivityInner(final ActivityRecord r, ActivityRecord sourceRecord, ...) {
    ...
    // 1. 计算启动模式（Task 标志）
    computeLaunchingTaskFlags();

    if (mTargetRootTask == null) {
        // 2. 创建 Task，挂载到 DefaultTaskDisplayArea
        mTargetRootTask = getOrCreateRootTask(mStartActivity, mLaunchFlags, targetTask,
                mOptions);
    }

    if (newTask) {
        // 3. 将 ActivityRecord 挂载到层级结构树
        setNewTask(taskToAffiliate);
    }
    ...
    // 4. 显示启动窗口（Starting Window）
    mTargetRootTask.startActivityLocked(mStartActivity, ...);

    if (mDoResume) {
        // 5. 触发 Pause Launcher + Resume 新 Activity
        mRootWindowContainer.resumeFocusedTasksTopActivities(
                mTargetRootTask, mStartActivity, mOptions, mTransientLaunch);
    }

    // 6. 更新最近任务列表
    mSupervisor.mRecentTasks.add(startedTask);
    ...
    return START_SUCCESS;
}
```

#### getOrCreateRootTask — 创建 Task

调用链：`ActivityStarter.getOrCreateRootTask()` → `TaskDisplayArea.getOrCreateRootTask()` → `Task.Builder.build()`

在 `Task.Builder.build()` 中，Task 被创建后通过 `setParent()` 挂载到 `DefaultTaskDisplayArea` 下：

```java
// Task.java # Builder.build() (line 8225)
Task build() {
    if (mParent != null && mParent instanceof TaskDisplayArea) {
        validateRootTask((TaskDisplayArea) mParent);
    }
    ...
    final Task task = buildInner();
    ...
    // 通过 setParent 挂载到 DefaultTaskDisplayArea
    if (mParent != null) {
        if (mParent instanceof Task) {
            final Task parentTask = (Task) mParent;
            parentTask.addChild(task, mOnTop ? POSITION_TOP : POSITION_BOTTOM,
                    (mActivityInfo.flags & FLAG_SHOW_FOR_ALL_USERS) != 0);
        } else {
            mParent.addChild(task, mOnTop ? POSITION_TOP : POSITION_BOTTOM);
        }
    }
    return task;
}
```

#### setNewTask — 挂载 ActivityRecord 到 Task

`ActivityStarter.setNewTask()` 调用 `addOrReparentStartingActivity()`，将 `ActivityRecord` 挂载到新创建的 Task 中，位于顶部（`POSITION_TOP`）。

```java
// ActivityStarter.java
private void setNewTask(Task taskToAffiliate) {
    final boolean toTop = !mLaunchTaskBehind && !avoidMoveToFront();
    // mTargetRootTask.reuseOrCreateTask 创建子 Task
    final Task task = mTargetRootTask.reuseOrCreateTask(
            mStartActivity.info, mIntent, mVoiceSession, ...);
    // 将 ActivityRecord 挂载到 Task 中
    addOrReparentStartingActivity(task, "setTaskFromReuseOrCreateNewTask");
}

// ActivityStarter.java
private void addOrReparentStartingActivity(@NonNull Task task, String reason) {
    TaskFragment newParent = task;
    ...
    if (mStartActivity.getTaskFragment() == null
            || mStartActivity.getTaskFragment() == newParent) {
        // 重点：将 ActivityRecord 挂在到新创建的 Task 中，并且是顶部
        newParent.addChild(mStartActivity, POSITION_TOP);
    } else {
        mStartActivity.reparent(newParent, newParent.getChildCount(), reason);
    }
}
```

#### moveToFront — 移动 Task 到栈顶

将新建的目标应用 Task 移到 `DefaultTaskDisplayArea` 的最上方。

调用链：`Task.moveToFront(reason)` → `Task.moveToFront(reason, task)` → `task.getParent().positionChildAt()`

```java
// Task.java (line 6048)
void moveToFront(String reason, Task task) {
    ...
    if (!isAttached()) {
        return;
    }
    ...
    final TaskDisplayArea taskDisplayArea = getDisplayArea();
    final Task lastFocusedTask = isRootTask() ? taskDisplayArea.getFocusedRootTask() : null;
    if (task == null) {
        // 当前场景 task 为 null，所以赋值为 this（即 mTargetRootTask）
        task = this;
    }
    // getParent() 返回 DefaultTaskDisplayArea，将 Task 移到最前面
    task.getParent().positionChildAt(POSITION_TOP, task, true /* includingParents */);
    taskDisplayArea.updateLastFocusedRootTask(lastFocusedTask, reason);
}
```

> 实际上在当前冷启动场景下，由于 Task 在 `getOrCreateRootTask` 时就已经以 `POSITION_TOP` 创建，所以 `moveToFront` 并不会改变什么。但对于其他场景（如从后台切到前台），这一步是必要的。

#### 窗口层级树变化

**启动前**：只有 Launcher 的 Task

![启动前窗口层级树](/img/android/app_launching/06_window_hierarchy_before.svg)


**启动后**：多了目标应用的 Task 和 ActivityRecord，位于 Launcher 之上

![启动后窗口层级树](/img/android/app_launching/07_window_hierarchy_after.svg)


### 1.5 触发 Pause 与进程创建

`resumeFocusedTasksTopActivities` 最终调用到 `TaskFragment.resumeTopActivity()`，这是 Framework 中非常常见的方法，功能是**显示顶层 Activity**。

在当前场景下，系统检查发现 Launcher 仍处于 Resumed 状态，因此需要先通知 Launcher 进入 Paused 状态。同时异步触发目标应用进程的创建。

```java
// RootWindowContainer.java
boolean resumeFocusedTasksTopActivities(
        Task targetRootTask, ActivityRecord target, ActivityOptions targetOptions,
        boolean deferPause) {
    if (!mTaskSupervisor.readyToResume()) {
        return false;
    }
    boolean result = false;
    if (targetRootTask != null && (targetRootTask.isTopRootTaskInDisplayArea()
            || getTopDisplayFocusedRootTask() == targetRootTask)) {
        result = targetRootTask.resumeTopActivityUncheckedLocked(target, targetOptions,
                deferPause);
    }
    ...
    return result;
}
```

#### pauseBackTasks → startPausing

`TaskFragment.resumeTopActivity()` 方法名的含义是"显示顶层 Activity"。在当前场景下：
- `next` 返回的是 TargetActivity 的 ActivityRecord（它是 DefaultTaskDisplayArea 下顶层 Task 中的顶层 Activity）
- 但是 TargetActivity 的进程还没创建，也没有执行 pause，所以需要先处理 pause 和进程创建

关键逻辑：

```java
// TaskFragment.java
final boolean resumeTopActivity(ActivityRecord prev, ActivityOptions options,
        boolean skipPause) {
    // next 返回的是 TargetActivity 的 ActivityRecord
    ActivityRecord next = topRunningActivity(true /* focusableOnly */);
    ...
    // pausing = true，因为 pauseBackTasks 触发了 Launcher 的 pause
    boolean pausing = !skipPause && taskDisplayArea.pauseBackTasks(next);
    ...
    if (pausing) {
        // 有 Activity 正在 pausing，先返回
        // 等 pause 完成后会再次走到这里
        return true;
    }
    ...
    if (next.attachedToProcess()) {
        // 进程已存在（当前冷启动场景不走这里）
    } else if (!next.isProcessRunning()) {
        // 进程不存在，异步启动新进程
        mAtmService.startProcessAsync(next, ...);
    }
}
```

`pauseBackTasks` 遍历 `DefaultTaskDisplayArea` 下每个叶子 Task，调用 `pauseActivityIfNeeded`：

```java
// TaskDisplayArea.java
boolean pauseBackTasks(ActivityRecord resuming) {
    final int[] someActivityPaused = {0};
    forAllLeafTasks(leafTask -> {
        if (leafTask.pauseActivityIfNeeded(resuming, "pauseBackTasks")) {
            someActivityPaused[0]++;
        }
    }, true /* traverseTopToBottom */);
    return someActivityPaused[0] > 0;
}
```

`Task.pauseActivityIfNeeded` 内部通过 `forAllLeafTaskFragments` 遍历每个 `TaskFragment`，找到持有 Resumed Activity 的 TaskFragment 执行 pause：

```java
// Task.java (line 1668)
boolean pauseActivityIfNeeded(@Nullable ActivityRecord resuming, @NonNull String reason) {
    ...
    final int[] someActivityPaused = {0};
    // 遍历所有叶子 TaskFragment
    forAllLeafTaskFragments((taskFrag) -> {
        final ActivityRecord resumedActivity = taskFrag.getResumedActivity();
        if (resumedActivity != null && !taskFrag.canBeResumed(resuming)) {
            // 当前 TaskFragment 中有 Resumed 的 Activity，且不能继续保持 Resume
            if (taskFrag.startPausing(false /* uiSleeping */, resuming, reason)) {
                someActivityPaused[0]++;
            }
        }
    }, true /* traverseTopToBottom */);
    return someActivityPaused[0] > 0;
}
```

`TaskFragment.startPausing()` 设置 Launcher 状态为 `PAUSING`，通过 `schedulePauseActivity` 构建 `PauseActivityItem` 发送到 Launcher 进程：

```java
// TaskFragment.java
boolean startPausing(boolean userLeaving, boolean uiSleeping, ActivityRecord resuming,
        String reason) {
    ...
    // prev 就是 Launcher 的 ActivityRecord
    ActivityRecord prev = mResumedActivity;
    ...
    // 设置 Pausing Activity
    mPausingActivity = prev;
    mLastPausedActivity = prev;

    // 设置状态为 PAUSING
    prev.setState(PAUSING, "startPausingLocked");
    prev.getTask().touchActiveTime();

    if (prev.attachedToProcess()) {
        // Launcher 的进程肯定是存在的，走这里
        // 跨进程通知 Launcher Pause
        schedulePauseActivity(prev, userLeaving, pauseImmediately,
                false /* autoEnteringPip */, reason);
    }
    ...
}
```

#### startProcessAsync（异步）

`TaskFragment.resumeTopActivity()` 中同时触发 TargetActivity 所在进程的创建：

```java
// TaskFragment.java # resumeTopActivity
if (next.attachedToProcess()) {
    // 进程已存在
    next.app.updateProcessInfo(false, true, false, false);
} else if (!next.isProcessRunning()) {
    // 进程不存在，异步启动新进程
    final boolean isTop = this == taskDisplayArea.getFocusedRootTask();
    mAtmService.startProcessAsync(next, false /* knownToBeDead */, isTop,
            isTop ? HostingRecord.HOSTING_TYPE_NEXT_TOP_ACTIVITY
                    : HostingRecord.HOSTING_TYPE_NEXT_ACTIVITY);
}
```

### 1.6 阶段一小结

1. Launcher 进程构建启动参数（`ActivityOptions`），通过 Bundle 经 Binder IPC 传递到 system_server
2. AMS 解析参数，放在 `Request` 类中保存
3. AMS 构建 `ActivityRecord`（Activity 在 system_server 端的代表，同时也是一个窗口容器）
4. 创建 `Task` 挂载到窗口层级树的 `DefaultTaskDisplayArea` 下
5. 将 `ActivityRecord` 挂载到 `Task` 中（这样 ActivityRecord 也就挂载到了窗口层级树中）
6. 触发 Launcher 执行 pause 逻辑（→ 阶段二）
7. 异步触发目标应用进程创建（→ 阶段三）

system_server 端的完整调用堆栈：

```
ActivityTaskManagerService.startActivity()
  ActivityTaskManagerService.startActivityAsUser()
    ActivityStartController.obtainStarter()
      ActivityStarter.execute()
        ActivityStarter$Request.resolveActivity()       -- 解析启动请求参数
        ActivityStarter.executeRequest()                -- 创建 ActivityRecord
          ActivityStarter.startActivityUnchecked()
            ActivityStarter.startActivityInner()        -- 关键函数
              ActivityStarter.getOrCreateRootTask()     -- 创建 Task
              ActivityStarter.setNewTask()              -- ActivityRecord 挂载到 Task
              Task.moveToFront()                        -- 移动 Task 到栈顶
              RootWindowContainer.resumeFocusedTasksTopActivities()  -- 显示 Activity
                Task.resumeTopActivityUncheckedLocked()
                  Task.resumeTopActivityInnerLocked()
                    TaskFragment.resumeTopActivity()    -- 显示顶层 Activity
                      TaskDisplayArea.pauseBackTasks()  -- pause Launcher
                      ATMS.startProcessAsync()          -- 创建目标应用进程
```

## 二、阶段二：completePause

### 2.1 Launcher onPause 执行

system_server 通过 `ClientLifecycleManager.scheduleTransactionItem()` 跨进程发送 `PauseActivityItem` 到 Launcher 进程。

![scheduleTransactionItem 流程](/img/android/app_launching/08_schedule_transaction_pause.svg)


`PauseActivityItem` 有两个关键方法：
- **execute**：触发 `handlePauseActivity` → `performPause` → `onPause()`
- **postExecute**：调用 `activityPaused()` 通知 system_server pause 已完成

```java
// PauseActivityItem.java
@Override
public void execute(@NonNull ClientTransactionHandler client, @NonNull ActivityClientRecord r,
        @NonNull PendingTransactionActions pendingActions) {
    Trace.traceBegin(TRACE_TAG_ACTIVITY_MANAGER, "activityPause");
    client.handlePauseActivity(r, mFinished, mUserLeaving, mAutoEnteringPip,
            pendingActions, "PAUSE_ACTIVITY_ITEM");
    Trace.traceEnd(TRACE_TAG_ACTIVITY_MANAGER);
}
```

Launcher 执行完 `onPause()` 后的回调链：

```
PauseActivityItem.postExecute()
  → ActivityClient.activityPaused()
    → ActivityClientController.activityPaused()
      → ActivityRecord.activityPaused()
        → TaskFragment.completePause()
```

```java
// Activity.java
final void performPause() {
    ...
    dispatchActivityPrePaused();
    mFragments.dispatchPause();
    mCalled = false;
    onPause();  // 执行 Activity 的 onPause 方法
    ...
    mResumed = false;
    dispatchActivityPostPaused();
}
```

### 2.2 completePause 后的两条路径

`completePause` 中设置 Launcher 状态为 `PAUSED`，然后触发两个关键操作：

```java
// TaskFragment.java
void completePause(boolean resumeNext, ActivityRecord resuming) {
    ActivityRecord prev = mPausingActivity;
    if (prev != null) {
        prev.setState(PAUSED, "completePausedLocked");
        mPausingActivity = null;
    }

    if (resumeNext) {
        // 路径1: 显示顶层 Activity
        mRootWindowContainer.resumeFocusedTasksTopActivities(topRootTask, prev, null);
    }

    // 路径2: 确保 Activity 可见性
    mRootWindowContainer.ensureActivitiesVisible(resuming);
}
```

两条路径**都可能**触发 `startSpecificActivity` 来尝试启动 TargetActivity：

1. **路径1: `resumeFocusedTasksTopActivities`** → `TaskFragment.resumeTopActivity()` → `startSpecificActivity`
2. **路径2: `ensureActivitiesVisible`** → `EnsureActivitiesVisibleHelper` → `makeVisibleAndRestartIfNeeded` → `startSpecificActivity`

#### attachedToProcess 的含义

在路径1中，`resumeTopActivity` 会检查 `next.attachedToProcess()`：

```java
// ActivityRecord.java (line 2960)
boolean attachedToProcess() {
    return hasProcess() && app.hasThread();
}
```

`ActivityRecord.app` 通过 `setProcess()` 方法设置，而 `setProcess()` 在 `realStartActivityLocked` 中调用。因此**冷启动没执行到 `realStartActivityLocked` 之前，`attachedToProcess()` 肯定返回 `false`**。

这与 `startSpecificActivity` 中的判断方式不同——后者通过 `mService.getProcessController(processName, uid)` 获取 `WindowProcessController`，判断**进程是否存在**。两者的区别：

| 方法 | 含义 | 冷启动进程已创建但未 realStart 时 |
|------|------|-----------------------------------|
| `attachedToProcess()` | ActivityRecord 是否已绑定到进程 | **false**（setProcess 还没调用） |
| `wpc != null && wpc.hasThread()` | 进程是否存在且有通信线程 | **true**（进程已创建完毕） |

#### startSpecificActivity 方法

```java
// ActivityTaskSupervisor.java (line 1194)
void startSpecificActivity(ActivityRecord r, boolean andResume, boolean checkConfig) {
    // 获取目标进程信息
    final WindowProcessController wpc =
            mService.getProcessController(r.processName, r.info.applicationInfo.uid);

    if (wpc != null && wpc.hasThread()) {
        // 进程已存在 → 直接启动 Activity
        realStartActivityLocked(r, wpc, andResume, checkConfig);
        return;
    }

    // 进程不存在 → 触发创建进程
    mService.startProcessAsync(r, knownToBeDead, isTop,
            isTop ? HostingRecord.HOSTING_TYPE_TOP_ACTIVITY
                    : HostingRecord.HOSTING_TYPE_ACTIVITY);
}
```

### 2.3 ensureActivitiesVisible 流程

`ensureActivitiesVisible` 遍历所有屏幕、所有 Task、所有 ActivityRecord，确保可见性正确。

调用链：
```
RootWindowContainer.ensureActivitiesVisible()
  → DisplayContent.ensureActivitiesVisible()
    → forAllRootTasks → Task.ensureActivitiesVisible()
      → forAllLeafTasks → TaskFragment.updateActivityVisibilities()
        → EnsureActivitiesVisibleHelper.process()
```

```java
// RootWindowContainer.java (line 2133)
void ensureActivitiesVisible(ActivityRecord starting, boolean notifyClients) {
    ...
    mTaskSupervisor.beginActivityVisibilityUpdate();
    try {
        for (int displayNdx = getChildCount() - 1; displayNdx >= 0; --displayNdx) {
            final DisplayContent display = getChildAt(displayNdx);
            display.ensureActivitiesVisible(starting, notifyClients);
        }
    } finally {
        mTaskSupervisor.endActivityVisibilityUpdate();
    }
}
```

```java
// DisplayContent.java (line 7484)
void ensureActivitiesVisible(ActivityRecord starting, boolean notifyClients) {
    ...
    mInEnsureActivitiesVisible = true;
    forAllRootTasks(rootTask -> {
        rootTask.ensureActivitiesVisible(starting, notifyClients);
    });
    ...
}
```

#### EnsureActivitiesVisibleHelper 处理

`process()` 方法遍历容器下所有子元素，对每个 `ActivityRecord` 调用 `setActivityVisibilityState()`：

```java
// EnsureActivitiesVisibleHelper.java (line 72)
void process(@Nullable ActivityRecord starting, boolean notifyClients) {
    ...
    for (int i = mTaskFragment.mChildren.size() - 1; i >= 0; --i) {
        final WindowContainer child = mTaskFragment.mChildren.get(i);
        final TaskFragment childTaskFragment = child.asTaskFragment();
        if (childTaskFragment != null) {
            // 子 TaskFragment 递归处理
            childTaskFragment.updateActivityVisibilities(starting, notifyClients);
        } else if (child.asActivityRecord() != null) {
            // ActivityRecord 处理可见性
            setActivityVisibilityState(child.asActivityRecord(), starting, resumeTopActivity);
        }
    }
}
```

`setActivityVisibilityState` 对不同的 Activity 有不同处理：

```java
// EnsureActivitiesVisibleHelper.java (line 135)
private void setActivityVisibilityState(ActivityRecord r, ActivityRecord starting,
        final boolean resumeTopActivity) {
    ...
    r.updateVisibilityIgnoringKeyguard(mBehindFullyOccludedContainer);
    final boolean reallyVisible = r.shouldBeVisibleUnchecked();

    if (r.visibleIgnoringKeyguard) {
        if (r.occludesParent()) {
            // 该 Activity 完全遮挡，后面的 Activity 不需要显示了
            mBehindFullyOccludedContainer = true;
        }
    }

    if (reallyVisible) {
        if (!r.attachedToProcess()) {
            // 情况1: TargetActivity — 需要显示但进程还没绑定
            // → 调用 makeVisibleAndRestartIfNeeded，尝试启动
            makeVisibleAndRestartIfNeeded(mStarting, resumeTopActivity && isTop, r);
        } else if (r.isVisibleRequested()) {
            // 情况2: 已经可见的 Activity — 无需处理
        } else {
            // 情况3: 需要变为可见的 Activity
            r.makeVisibleIfNeeded(mStarting, mNotifyClients);
        }
    } else {
        // 情况4: Launcher — 不应该可见了
        // → 调用 makeInvisible，加入 Stopping 队列
        r.makeInvisible();
    }
}
```

总结遍历效果：
- **TargetActivity**（`reallyVisible = true`, `!attachedToProcess()`）：调用 `makeVisibleAndRestartIfNeeded()`，设置 visibility 为 true 并尝试启动
- **Launcher**（被 TargetActivity 完全遮挡，`reallyVisible = false`）：调用 `makeInvisible()`，加入 Stopping 队列等待后续 idle 时执行 onStop

```java
// EnsureActivitiesVisibleHelper.java (line 192)
if (!r.attachedToProcess()) {
    makeVisibleAndRestartIfNeeded(mStarting, resumeTopActivity && isTop, r);
}
```

```java
// EnsureActivitiesVisibleHelper.java (line 242)
private void makeVisibleAndRestartIfNeeded(ActivityRecord starting,
        boolean andResume, ActivityRecord r) {
    if (!r.isVisibleRequested() || r.mLaunchTaskBehind) {
        r.setVisibility(true);
    }
    if (r != starting) {
        mTaskFragment.mTaskSupervisor.startSpecificActivity(r, andResume,
                true /* checkConfig */);
    }
}
```

#### makeInvisible（触发 Launcher onStop）

Launcher 被设置为不可见后，加入 Stopping 队列：

```java
// ActivityRecord.java
void makeInvisible() {
    ...
    setVisibility(false);

    switch (getState()) {
        case STOPPING:
        case STOPPED:
            // Reset the flag indicating that an app can enter picture-in-picture
            // once the activity is hidden
            supportsEnterPipOnTaskSwitch = false;
            break;
        case RESUMED:
        case INITIALIZING:
        case PAUSING:
        case PAUSED:
        case STARTED:
            // 加入 Stopping 队列，等待后续 idle 时执行 onStop
            addToStopping(true /* scheduleIdle */,
                    canEnterPictureInPicture /* idleDelayed */, "makeInvisible");
            break;
        default:
            break;
    }
}
```

### 2.4 阶段二小结

Launcher 完成 pause 后，AMS 执行两步操作：
1. **显示顶层 Activity**（`resumeFocusedTasksTopActivities`）
2. **确保系统 Activity 可见性**（`ensureActivitiesVisible`）

两个流程都可能触发 `startSpecificActivity`。如果此时目标进程已经创建好（阶段三先完成），则直接进入 `realStartActivityLocked`；否则会再次触发进程创建。

completePause 的完整调用堆栈：

```
ActivityClientController.activityPaused()
  ActivityRecord.activityPaused()
    TaskFragment.completePause()
      路径1: RootWindowContainer.resumeFocusedTasksTopActivities()  -- 显示顶层 Activity
        Task.resumeTopActivityUncheckedLocked()
          Task.resumeTopActivityInnerLocked()
            TaskFragment.resumeTopActivity()
              ActivityTaskSupervisor.startSpecificActivity()       -- 试图启动 Activity
      路径2: RootWindowContainer.ensureActivitiesVisible()         -- 确保 Activity 可见性
        DisplayContent.ensureActivitiesVisible()
          forAllRootTasks → Task.ensureActivitiesVisible()
            forAllLeafTasks → TaskFragment.updateActivityVisibilities()
              EnsureActivitiesVisibleHelper.process()
                EnsureActivitiesVisibleHelper.setActivityVisibilityState()
                  EnsureActivitiesVisibleHelper.makeVisibleAndRestartIfNeeded()
                    ActivityTaskSupervisor.startSpecificActivity()  -- 试图启动 Activity
```

> **注意**：`ensureActivitiesVisible` 流程并不是针对某一个 Activity，而是遍历整个设备上所有的 Activity，让它们该显示的显示，该隐藏的隐藏。在当前场景下，TargetActivity 会被设置为 visible 并尝试启动，Launcher 会被 `makeInvisible()` 加入 Stopping 队列。

## 三、阶段三：创建应用进程

### 3.1 进程创建链路

进程创建的触发点是阶段一中 `TaskFragment.resumeTopActivity()` 调用的 `startProcessAsync()`。

调用链：
```
ActivityTaskManagerService.startProcessAsync()
  → ActivityManagerService$LocalService.startProcess()
    → ActivityManagerService.startProcessLocked()
      → ProcessList.startProcessLocked()
        → ProcessList.handleProcessStart()
          → Process.start()                          -- 启动进程（Zygote fork）
          → ProcessList.handleProcessStartedLocked()
            → AMS.reportUidInfoMessageLocked()       -- 打印关键日志
```

`startProcessAsync` 之所以是"异步"的，是因为它通过 Handler 投递消息来启动进程，避免在持有 ATMS 锁的情况下直接调用 AMS（可能导致死锁）：

```java
// ActivityTaskManagerService.java
void startProcessAsync(ActivityRecord activity, boolean knownToBeDead, boolean isTop,
        String hostingType) {
    ...
    // 通过 Handler 发送消息，异步调用 AMS 的进程创建逻辑
    final Message m = PooledLambda.obtainMessage(ActivityManagerInternal::startProcess,
            mAmInternal, activity.processName, activity.info.applicationInfo, knownToBeDead,
            isTop, hostingType, activity.intent.getComponent());
    mH.sendMessage(m);
    ...
}
```

**关键日志**（在 `ProcessList.handleProcessStartedLocked()` → `AMS.reportUidInfoMessageLocked()` 中打印）：
```
ActivityManager: Start proc <pid>:<processName>/<uid> for <type> {<component>}
```

这条日志是判断进程创建时间点的重要参考，经常用于分析启动耗时。

### 3.2 应用端处理

Zygote 创建应用进程后，执行 `ActivityThread.main()`：

```java
// ActivityThread.java
public static void main(String[] args) {
    ...
    Looper.prepareMainLooper();

    ActivityThread thread = new ActivityThread();
    thread.attach(false, startSeq);

    Looper.loop();
    throw new RuntimeException("Main thread loop unexpectedly exited");
}

private void attach(boolean system, long startSeq) {
    sCurrentActivityThread = this;
    ...
    if (!system) {
        final IActivityManager mgr = ActivityManager.getService();
        try {
            // 通过 Binder 跨进程调用 AMS 的 attachApplication 方法
            mgr.attachApplication(mAppThread, startSeq);
        } catch (RemoteException ex) {
            throw ex.rethrowFromSystemServer();
        }
    }
    ...
}
```

`mAppThread` 是 `ApplicationThread` 类型（继承 `IApplicationThread.Stub`），是 AMS 与应用进程通信的 Binder 对象。

### 3.3 system_server 端处理

#### AMS.attachApplicationLocked

```java
// ActivityManagerService.java
public final void attachApplication(IApplicationThread thread, long startSeq) {
    ...
    synchronized (this) {
        attachApplicationLocked(thread, callingPid, callingUid, startSeq);
    }
}

private void attachApplicationLocked(@NonNull IApplicationThread thread,
        int pid, int callingUid, long startSeq) {
    ...
    // 1. 跨进程调用应用进程，创建绑定 Application
    thread.bindApplication(processName, appInfo, ...);
    ...
    // 2. 完成 attach，触发后续的 Activity 启动
    finishAttachApplicationInner(startSeq, callingUid, pid);
    ...
}
```

#### RootWindowContainer.attachApplication

`finishAttachApplicationInner()` 通过 `mAtmInternal.attachApplication()` 调用到 `RootWindowContainer.attachApplication()`，后者遍历待启动的 Activity 列表，对匹配的 Activity 调用 `realStartActivityLocked()`。

```
AMS.finishAttachApplicationInner()
  → ATMS$LocalService.attachApplication()
    → RootWindowContainer.attachApplication()
      → 遍历 mStartingProcessActivities 列表
        → 匹配 uid 和进程名，过滤不满足条件的 ActivityRecord
          → ActivityTaskSupervisor.realStartActivityLocked()
```

`RootWindowContainer.attachApplication()` 遍历 `mStartingProcessActivities` 列表（在 `startProcessAsync` 时加入），逐个检查后调用 `realStartActivityLocked`：

```java
// RootWindowContainer.java (line 2082)
boolean attachApplication(WindowProcessController app) throws RemoteException {
    final ArrayList<ActivityRecord> activities = mService.mStartingProcessActivities;
    ...
    for (int i = activities.size() - 1; i >= 0; i--) {
        final ActivityRecord r = activities.get(i);
        // 匹配 uid 和进程名
        if (app.mUid != r.info.applicationInfo.uid || !app.mName.equals(r.processName)) {
            continue;
        }
        activities.remove(i);
        final TaskFragment tf = r.getTaskFragment();
        // 过滤掉不满足启动条件的 ActivityRecord
        if (tf == null || r.finishing || r.app != null
                || !r.shouldBeVisible(true /* ignoringKeyguard */)
                || !r.showToCurrentUser()) {
            continue;
        }
        try {
            final boolean canResume = r.isFocusable() && r == tf.topRunningActivity();
            if (mTaskSupervisor.realStartActivityLocked(r, app, canResume,
                    true /* checkConfig */)) {
                hasActivityStarted = true;
            }
        } catch (RemoteException e) { ... }
    }
    ...
}
```

过滤条件说明：
- `r.finishing`：Activity 正在结束，不需要启动
- `r.app != null`：Activity 已经绑定到进程了（不应该出现在待启动列表中）
- `!r.shouldBeVisible`：Activity 不应该可见
- `!r.showToCurrentUser`：Activity 不属于当前用户

### 3.4 阶段三小结

应用进程启动后，在 `ActivityThread.main()` 中执行 `attach`，将自己的 `ApplicationThread` Binder 对象告知 AMS。AMS 收到后：
1. 调用 `thread.bindApplication()` 通知应用端初始化 Application
2. 遍历待启动 Activity 列表，触发 `realStartActivityLocked()`

## 四、阶段四：真正启动 Activity

### 4.1 realStartActivityLocked

无论是阶段二（completePause）还是阶段三（attachApplication）触发，最终都会走到 `realStartActivityLocked`。

```java
// ActivityTaskSupervisor.java
boolean realStartActivityLocked(ActivityRecord r, WindowProcessController proc,
        boolean andResume, boolean checkConfig) throws RemoteException {

    // 1. 检查是否所有 Activity 已 Paused
    if (!mRootWindowContainer.allPausedActivitiesComplete()) {
        return false;
    }
    ...
    // 2. 将 ActivityRecord 绑定到进程（此后 attachedToProcess 返回 true）
    r.setProcess(proc);
    ...
    try {
        // 3. 创建 LaunchActivityItem（触发 onCreate）
        final LaunchActivityItem launchActivityItem = LaunchActivityItem.obtain(r.token,
                r.intent, System.identityHashCode(r), r.info, ...);

        // 4. 创建最终生命周期状态 Item
        final ActivityLifecycleItem lifecycleItem;
        if (andResume) {
            lifecycleItem = ResumeActivityItem.obtain(r.token, isTransitionForward,
                    r.shouldSendCompatFakeFocus());
        } else if (r.isVisibleRequested()) {
            lifecycleItem = PauseActivityItem.obtain(r.token);
        } else {
            lifecycleItem = StopActivityItem.obtain(r.token);
        }

        // 5. 发送事务到应用进程
        mService.getLifecycleManager().scheduleTransactionAndLifecycleItems(
                proc.getThread(), launchActivityItem, lifecycleItem,
                true /* shouldDispatchImmediately */);
        ...
    } catch (RemoteException e) {
        ...
    }
    return true;
}
```

**关键点**：
- `allPausedActivitiesComplete()` 检查：如果 Launcher 还在 pausing，直接返回 `false`，等待 completePause 后再次触发
- `r.setProcess(proc)` (line 910)：标记 ActivityRecord 已绑定到进程
- 通过 `scheduleTransactionAndLifecycleItems` 将 `LaunchActivityItem` + `ResumeActivityItem` 组合发送

### 4.2 onCreate

应用进程收到事务后，`TransactionExecutor` 处理事务项：

```java
// TransactionExecutor.java
public void executeTransactionItems(@NonNull ClientTransaction transaction) {
    final List<ClientTransactionItem> items = transaction.getTransactionItems();
    for (int i = 0; i < size; i++) {
        final ClientTransactionItem item = items.get(i);
        if (item.isActivityLifecycleItem()) {
            executeLifecycleItem(transaction, (ActivityLifecycleItem) item);
        } else {
            executeNonLifecycleItem(transaction, item, ...);
        }
    }
}
```

对于 `LaunchActivityItem`（非生命周期项），执行 `handleLaunchActivity()` → `performLaunchActivity()`：

```
LaunchActivityItem.execute()
  → ActivityThread.handleLaunchActivity()
    → ActivityThread.performLaunchActivity()
      → Instrumentation.newActivity()     -- 通过反射创建 Activity 实例
      → Activity.attach()                 -- 创建 PhoneWindow，设置 WindowManager
      → Instrumentation.callActivityOnCreate()  -- 执行 onCreate
        → Activity.performCreate()
          → Activity.onCreate()
```

![onCreate 流程](/img/android/app_launching/09_activity_oncreate.svg)


#### Activity 反射创建

```java
// Instrumentation.java (line 1451)
public Activity newActivity(ClassLoader cl, String className, Intent intent)
        throws InstantiationException, IllegalAccessException, ClassNotFoundException {
    String pkg = intent != null && intent.getComponent() != null
            ? intent.getComponent().getPackageName() : null;
    return getFactory(pkg).instantiateActivity(cl, className, intent);
}
```

内部通过 `AppComponentFactory.instantiateActivity()` 使用 ClassLoader 反射创建 Activity 实例。

#### Activity.attach — 创建 Window

```java
// Activity.java (line 9058)
final void attach(Context context, ActivityThread aThread,
        Instrumentation instr, IBinder token, int ident,
        Application application, Intent intent, ActivityInfo info,
        CharSequence title, Activity parent, String id, ...) {
    attachBaseContext(context);
    mFragments.attachHost(null);

    // 创建 PhoneWindow
    mWindow = new PhoneWindow(this, window, activityConfigCallback);
    mWindow.setWindowControllerCallback(mWindowControllerCallback);
    mWindow.setCallback(this);
    mWindow.setOnWindowDismissedCallback(this);
    ...
    // 设置 WindowManager
    mWindow.setWindowManager(
            (WindowManager)context.getSystemService(Context.WINDOW_SERVICE),
            mToken, mComponent.flattenToString(), ...);
    ...
    mToken = token;
    mApplication = application;
    ...
}
```

#### performLaunchActivity 关键流程

```java
// ActivityThread.java (line 4279)
private Activity performLaunchActivity(ActivityClientRecord r, Intent customIntent) {
    ...
    Activity activity = null;
    try {
        java.lang.ClassLoader cl = activityBaseContext.getClassLoader();
        // 1. 反射创建 Activity
        activity = mInstrumentation.newActivity(cl, component.getClassName(), r.intent);
    } catch (Exception e) {
        ...
    }

    try {
        Application app = r.packageInfo.makeApplicationInner(false, mInstrumentation);
        ...
        if (activity != null) {
            // 2. attach — 创建 Window
            activity.attach(activityBaseContext, this, getInstrumentation(), r.token,
                    r.ident, app, r.intent, r.activityInfo, title, r.parent, ...);
            ...
            // 3. 触发 onCreate
            if (r.isPersistable()) {
                mInstrumentation.callActivityOnCreate(activity, r.state, r.persistentState);
            } else {
                mInstrumentation.callActivityOnCreate(activity, r.state);
            }
        }
    } catch (Exception e) {
        ...
    }
    return activity;
}
```

### 4.3 onStart → onResume

`LaunchActivityItem` 执行完 `onCreate` 后，接下来处理 `ResumeActivityItem`（生命周期项），通过 `executeLifecycleItem()` 处理：

```java
// TransactionExecutor.java
private void executeLifecycleItem(@NonNull ClientTransaction transaction,
        @NonNull ActivityLifecycleItem lifecycleItem) {
    final IBinder token = lifecycleItem.getActivityToken();
    final ActivityClientRecord r = mTransactionHandler.getActivityClient(token);
    ...
    // 执行中间状态（ON_CREATE → ON_START）
    cycleToPath(r, lifecycleItem.getTargetState(), true /* excludeLastState */, transaction);
    // 执行最终状态（ON_RESUME）
    lifecycleItem.execute(mTransactionHandler, mPendingActions);
    lifecycleItem.postExecute(mTransactionHandler, mPendingActions);
}
```

#### cycleToPath 生命周期路径计算

由于 `onCreate` 完成后状态为 `ON_CREATE`（1），目标状态为 `ON_RESUME`（3），`excludeLastState = true`：

1. **getLifecyclePath** 计算路径：`ON_CREATE → ON_START → ON_RESUME`，移除最后一个 `ON_RESUME` 后剩 `[ON_START]`
2. **performLifecycleSequence** 执行 `ON_START` → `handleStartActivity()` → `performStart()` → `onStart()`
3. **lifecycleItem.execute()** 执行 `ResumeActivityItem.execute()` → `handleResumeActivity()` → `performResume()` → `onResume()`

```java
// TransactionExecutorHelper.java
public IntArray getLifecyclePath(int start, int finish, boolean excludeLastState) {
    ...
    mLifecycleSequence.clear();
    if (finish >= start) {
        // 添加 start 到 finish 之间的生命周期状态
        for (int i = start + 1; i <= finish; i++) {
            mLifecycleSequence.add(i);
        }
    }
    ...
    if (excludeLastState && mLifecycleSequence.size() != 0) {
        mLifecycleSequence.remove(mLifecycleSequence.size() - 1);
    }
    return mLifecycleSequence;
}
```

```java
// ResumeActivityItem.java
@Override
public void execute(@NonNull ClientTransactionHandler client, @NonNull ActivityClientRecord r,
        @NonNull PendingTransactionActions pendingActions) {
    Trace.traceBegin(TRACE_TAG_ACTIVITY_MANAGER, "activityResume");
    client.handleResumeActivity(r, true /* finalStateRequest */, mIsForward,
            mShouldSendCompatFakeFocus, "RESUME_ACTIVITY");
    Trace.traceEnd(TRACE_TAG_ACTIVITY_MANAGER);
}
```

### 4.4 idle → onStop（前一个 Activity）

TargetActivity 完成 `onResume` 后，应用进程在主线程空闲时通过 `Looper.myQueue().addIdleHandler()` 通知 system_server。

system_server 收到 `IDLE_NOW_MSG` 后，调用 `processStoppingAndFinishingActivities()` 处理 Stopping 队列中的 Activity（即 Launcher），触发其 onStop。

```java
// ActivityTaskSupervisor.java
case IDLE_NOW_MSG: {
    activityIdleFromMessage((ActivityRecord) msg.obj, false /* fromTimeout */);
} break;

void activityIdleInternal(ActivityRecord r, boolean fromTimeout,
        boolean processPausingActivities, Configuration config) {
    processStoppingAndFinishingActivities(r, processPausingActivities, "idle");
}
```

加入 Stopping 队列的 Activity 必须等动画执行完毕才会真正执行 onStop：

```java
// ActivityTaskSupervisor.java # processStoppingAndFinishingActivities
for (int i = 0; i < mStoppingActivities.size(); i++) {
    final ActivityRecord s = mStoppingActivities.get(i);
    final boolean animating = s.isInTransition()
            && s.getTask() != null && !s.getTask().isForceHidden();
    // 满足条件才能 stop：动画完成 或 关机场景
    if ((!animating && !displaySwapping) || mService.mShuttingDown
            || s.getRootTask().isForceHiddenForPinnedTask()) {
        readyToStopActivities.add(s);
        mStoppingActivities.remove(i);
        i--;
    }
}
```

### 4.5 阶段四小结

无论阶段二还是阶段三先完成，只要两个先决条件（进程已创建 + pause 已完成）都满足，就会通过 `realStartActivityLocked` 触发应用端 Activity 的创建和生命周期执行：

**onCreate** → **onStart** → **onResume** → idle → 前一个 Activity **onStop**

## 附录 A：生命周期状态常量表

| 常量 | 值 | 说明 |
|------|------|------|
| `ON_CREATE` | 1 | Activity 已创建 |
| `ON_START` | 2 | Activity 已启动（可见但不可交互） |
| `ON_RESUME` | 3 | Activity 已恢复（可见且可交互） |
| `ON_PAUSE` | 4 | Activity 已暂停 |
| `ON_STOP` | 5 | Activity 已停止（不可见） |
| `ON_DESTROY` | 6 | Activity 已销毁 |
| `ON_RESTART` | 7 | Activity 正在重新启动 |

## 附录 B：events 日志分析指南

### 系统侧 vs 应用侧日志区分

Events 日志中，系统侧日志由 system_server 打印，应用侧日志由应用进程打印。两者视角不同：
- **系统侧**：`wm_create_activity`、`wm_pause_activity`、`wm_restart_activity` 等——表示系统**发出了指令**
- **应用侧**：`wm_on_create_called`、`wm_on_paused_called`、`wm_on_resume_called` 等——表示应用**执行了回调**

两者的时间差就是 IPC 传输 + 应用端执行的耗时。

### events 日志完整示例

```
// ========== 系统侧：创建 Task 和 Activity ==========
16:59:35.138  system  I wm_task_created: 344
16:59:35.141  system  I wm_create_task: [0,344,344,0]
16:59:35.141  system  I wm_create_activity: [0,253354194,344,com.example.app/.MainActivity,...]

// ========== 系统侧：Pause Launcher ==========
16:59:35.143  system  I wm_pause_activity: [0,206561781,com.example.launcher/.Launcher,userLeaving=true,pauseBackTasks]

// ========== 应用侧：Launcher Pause 回调 ==========
16:59:35.149  app     I wm_on_top_resumed_lost_called: [206561781,com.example.launcher.Launcher,topStateChangedWhenResumed]
16:59:35.151  app     I wm_on_paused_called: [0,206561781,com.example.launcher.Launcher,performPause,2]

// ========== 系统侧：Launcher 加入 Stopping 队列 ==========
16:59:35.155  system  I wm_add_to_stopping: [0,206561781,com.example.launcher/.Launcher,makeInvisible]

// ========== 系统侧：创建应用进程 ==========
16:59:35.185  system  I am_proc_start: [0,32076,10262,com.example.app,next-top-activity,{...}]
16:59:35.208  system  I am_proc_bound: [0,32076,com.example.app]

// ========== 系统侧：启动 Activity ==========
16:59:35.216  system  I wm_restart_activity: [0,253354194,344,com.example.app/.MainActivity]
16:59:35.219  system  I wm_set_resumed_activity: [0,com.example.app/.MainActivity,...]

// ========== 应用侧：Activity 生命周期回调 ==========
16:59:35.371  app     I wm_on_create_called: [0,253354194,com.example.app.MainActivity,performCreate,62]
16:59:35.427  app     I wm_on_start_called: [0,253354194,com.example.app.MainActivity,handleStartActivity,55]
16:59:35.433  app     I wm_on_resume_called: [0,253354194,com.example.app.MainActivity,RESUME_ACTIVITY,5]

// ========== 应用侧：获得 Top Resumed 状态 ==========
16:59:35.532  app     I wm_on_top_resumed_gained_called: [253354194,com.example.app.MainActivity,...]

// ========== 系统侧：记录启动耗时 ==========
16:59:35.544  system  I wm_activity_launch_time: [0,253354194,com.example.app/.MainActivity,404]

// ========== 应用侧：Idle ==========
16:59:35.575  app     I wm_on_idle_called: com.example.app.MainActivity

// ========== 系统侧和应用侧：Stop Launcher ==========
16:59:35.879  system  I wm_stop_activity: [0,206561781,com.example.launcher/.Launcher]
16:59:35.892  app     I wm_on_stop_called: [0,206561781,com.example.launcher.Launcher,STOP_ACTIVITY_ITEM,3]
```

**日志规律**：
- 启动 A 会停止 B
- 如果 A 是**全屏遮挡**页面，B 会执行 `onPause` → `onStop`
- 如果 A 是**半遮挡**页面（如透明 Activity、Dialog Activity），B 只会执行到 `onPause`

### "START u" 日志解读

分析启动 Activity 时携带的 Flag，可搜索 `"START u"` 日志：

```
START u0 {act=android.intent.action.MAIN cat=[android.intent.category.LAUNCHER]
    flg=0x10200000 cmp=com.example.app/.MainActivity ...}
    with LAUNCH_SINGLE_TOP from uid 10137 ... result code=0
```

其中 `u0` 表示主空间用户，`u10` 表示分身空间用户。

### result code 含义

| 范围 | 含义 | 典型值 |
|------|------|--------|
| -100 ~ -1 | 启动出现 Error | `START_CLASS_NOT_FOUND`(-2)、`START_INTENT_NOT_RESOLVED`(-1)、`START_PERMISSION_DENIED`(-3) |
| 0 ~ 99 | 启动成功 | `START_SUCCESS`(0)、`START_TASK_TO_FRONT`(2)、`START_DELIVERED_TO_TOP`(3) |
| 100 ~ 199 | 不允许启动（非 Error） | `START_SWITCHES_CANCELED`(100)、`START_ABORTED`(102) |

相关常量定义在 `ActivityManager.java` 中：

```java
// ActivityManager.java
public static final int START_SUCCESS = 0;
public static final int START_RETURN_INTENT_TO_CALLER = 1;
public static final int START_TASK_TO_FRONT = 2;
public static final int START_DELIVERED_TO_TOP = 3;
public static final int START_SWITCHES_CANCELED = 100;
public static final int START_RETURN_LOCK_TASK_MODE_VIOLATION = 101;
public static final int START_ABORTED = 102;
```

## 附录 C：典型问题案例

### C.1 后台启动被禁

**场景**：系统侧只有 "START u" 日志，无 `wm_create_activity` 等 events 日志。

**日志特征**：
```
W ActivityTaskManager: Background activity launch blocked
    [callingPackage: com.example.app; callingUid: 10180; appSwitchState: 2;
     callingUidHasAnyVisibleWindow: false; ...]
E ActivityTaskManager: Abort background activity starts from 10180
I ActivityTaskManager: START u0 {...} result code=102
```

**分析方向**：检查调用方是否具有后台启动 Activity 的权限，确认 `callingUidHasAnyVisibleWindow` 是否为 `false`。`result code=102`（`START_ABORTED`）表示启动被中止。

### C.2 进程启动失败/冻结

**场景**：系统侧 events 日志只走到 `wm_create_activity`，后续生命周期缺失。

**可能原因 1：Package 被冻结**
```
E ActivityManager: Failure starting process com.example.app
E ActivityManager: java.lang.SecurityException: Package com.example.app is currently frozen!
W PackageFreezer: Freeze package com.example.app about 26.51 seconds for reason: installPackageLI
```

**可能原因 2：进程启动耗时过长**
```
// 从 am_proc_start 到 am_proc_bound 间隔 10 秒
18:57:53.238  I am_proc_start: [0,15810,10182,com.example.app,...]
18:58:04.972  I am_proc_bound: [0,15810,com.example.app]
```

### C.3 进程冻结导致回调缺失

**场景**：系统侧生命周期完整，但应用侧无生命周期输出。

系统不受冻结影响，因此系统侧日志正常，但应用侧回调延迟或缺失：
```
// 系统侧在 13:57:27 发出 resume
13:57:27.204 system I wm_resume_activity: [0,195528257,240,com.example.app/.DetailActivity]

// 应用侧直到 13:58:10 才执行 onRestart（延迟约 43 秒）
13:58:10.631 app    I wm_on_restart_called: [0,195528257,com.example.app.DetailActivity,,0]
```

**排查方法**：搜索 `FZ`（Freeze）或 `THAW`（解冻）日志确认进程冻结和解冻时机。

### C.4 onStop 延迟（idle/动画）

#### 原因 1：当前页面 onResume 耗时导致 idle 延迟

onStop 的执行依赖于新 Activity 进入 idle 状态。如果新 Activity 的 `onResume` 耗时过长，会导致 idle 延迟，进而延迟前一个页面的 onStop。

```
// 新 Activity 的 onResume 耗时 10 秒
16:49:33.938 app    I wm_on_start_called: [0,6508537,...,handleStartActivity,1]
16:49:43.945 app    I wm_on_resume_called: [0,6508537,...,RESUME_ACTIVITY,10006]
// idle 触发后才 stop Launcher
16:49:43.790 system I wm_stop_activity: [0,37392378,com.example.launcher/.Launcher]
```

**原理**：应用进程在 `onResume` 后通过 `Looper.myQueue().addIdleHandler()` 通知系统侧 idle，系统收到 `IDLE_NOW_MSG` 后调用 `processStoppingAndFinishingActivities()` 处理 Stopping 队列。

#### 原因 2：动画耗时

加入 Stopping 队列的 Activity 必须等动画执行完毕才会执行 onStop（见 4.4 节代码）。

### C.5 Intent 解析失败

```
W ActivityTaskManager: aInfo is null for resolve intent: Intent { act=... cmp=... }
```

**原因**：`activityInfo` 为 `null` 是因为 `resolveInfo` 为 `null`，即 PackageManagerService 无法解析该 Intent。

**分析方向**：
- Intent 的 `component`、`action`、`category`、`data` 是否正确
- 目标应用是否已安装且未被禁用
- 是否存在 PackageManager 层面的匹配问题

### C.6 不同 Android 版本 "START u" 日志输出时机差异

Android U（Android 14）中，`START u` 日志在系统侧流程完成后才打印，而之前版本在系统侧流程开始时打印。因此 U 版本的 `START u` 时间戳较之前版本偏后，这是正常行为，不代表 AMS 系统侧耗时。应以 events 日志为准判断实际耗时。
