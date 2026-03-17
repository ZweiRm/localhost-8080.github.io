---
prev:
    text: 'WMS 架构与运行原理分析'
    link: 'framework/basic-with-wms'
next:
    text: 'performTraversal'
    link: 'framework/performTraversal'
---

# 应用启动流程分析

## 1. 整体介绍

本文基于 AOSP V 版本源码，以 Launcher 点击「电话」图标冷启动应用为场景，分析 Activity 启动的完整流程。

### 1.1 三模块架构

启动流程涉及 3 个模块、3 个进程：

| 模块 | 所在进程 | 职责 |
|------|---------|------|
| **SourceActivity** | Launcher 进程 | 发起 `startActivity` 请求的 Activity |
| **AMS** | system_server 进程 | 不仅指 AMS 这一个类，而是指 system_server 进程中参与处理的所有相关类（ATMS、ActivityStarter、RootWindowContainer 等） |
| **TargetActivity** | 目标应用进程 | 被启动的 Activity（电话 MainActivity） |

SourceActivity 和 TargetActivity 互相不知道对方的业务，所有协调由 AMS 管理——类似于公司里两个不同部门的人需要通过管理者来协调工作。

![三模块架构](/img/android/app_launching/01_architecture.svg)

> AMS 对 Launcher 多了一个返回箭头，因为 Launcher 需要执行 pause，但 pause 的时机 Launcher 自身无法控制，只能由 AMS 控制。

### 1.2 四阶段总览

整个流程分为 4 个阶段：

![四阶段总览](/img/android/app_launching/02_overall_flow.svg)

**阶段一**：Launcher 发起请求 → AMS 创建 ActivityRecord 和 Task 并挂载到窗口层级树 → 异步触发 Launcher pause + 目标进程创建

**阶段二**：Launcher 执行完 pause → 通知 AMS → AMS 试图启动 TargetActivity

**阶段三**：Zygote 创建目标应用进程 → 进程 attach 到 AMS → AMS 试图启动 TargetActivity

**阶段四**：`realStartActivityLocked` 条件满足 → 通过事务触发应用端创建 Activity → onCreate → onResume

**关键机制——阶段二和阶段三的竞争关系：**

阶段一结束时同时异步触发了 pause（阶段二）和进程创建（阶段三），两者执行顺序不确定。但成功启动 TargetActivity 必须同时满足 2 个条件：

1. 目标进程创建完毕
2. Launcher 执行完 pause

这意味着存在两种可能的执行路径：

**情况一：Launcher 先完成 pause。** completePause 流程来到 `startSpecificActivity`，发现进程没创建好，触发一次进程创建请求（之前已触发过，不会重复创建）。然后由阶段三的流程创建好进程后走到 `realStartActivityLocked`，此时 pause 已完成，成功启动。

**情况二：进程先创建完。** 阶段三创建进程后走到 `realStartActivityLocked`，发现还有 Activity 正在 pause，直接 return。然后等 completePause 流程走到 `startSpecificActivity`，发现进程已就绪，执行 `realStartActivityLocked` 成功启动。

> 无论哪种情况，最终都会执行到 `realStartActivityLocked`，且只有两个条件同时满足时才会真正启动。

## 2. 阶段一：桌面点击图标启动应用

### 2.1 Launcher 端流程

从用户点击图标到跨进程调用的完整调用链：

```
ItemClickHandler::onClick
  ItemClickHandler::onClickAppShortcut
    ItemClickHandler::startAppShortcutOrInfoActivity
      QuickstepLauncher::startActivitySafely
        Launcher::startActivitySafely
          AppLauncher::startActivitySafely
            BaseQuickstepLauncher::getActivityLaunchOptions  ← 构建 ActivityOptions
              Activity::startActivity
                Activity::startActivity
                  Activity::startActivityForResult
                    Instrumentation::execStartActivity
                      ActivityTaskManagerService::startActivity  ← 跨进程 IPC
```

正常通过 `startActivity` 传递 Intent 的流程也是一样的，最终都汇聚到 `Instrumentation::execStartActivity`。Launcher 多了 `getActivityLaunchOptions` 构建 `ActivityOptions`（包含 `RemoteAnimationAdapter` 等启动参数）。

核心代码：

```java
// Activity.java
public void startActivityForResult(Intent intent, int requestCode, Bundle options) {
    if (mParent == null) {
        options = transferSpringboardActivityOptions(options);
        Instrumentation.ActivityResult ar =
            mInstrumentation.execStartActivity(
                this, mMainThread.getApplicationThread(), mToken, this,
                intent, requestCode, options);
        ......
    }
}

// Instrumentation.java
public ActivityResult execStartActivity(Context who, IBinder contextThread, IBinder token,
        Activity target, Intent intent, int requestCode, Bundle options) {
    ......
    // 跨进程调用到 ATMS
    int result = ActivityTaskManager.getService().startActivity(whoThread,
            who.getOpPackageName(), who.getAttributionTag(), intent,
            intent.resolveTypeIfNeeded(who.getContentResolver()), token,
            target != null ? target.mEmbeddedID : null, requestCode, 0, null, options);
    // 检查启动结果
    checkStartActivityResult(result, intent);
    ......
}
```

> `checkStartActivityResult` 中包含常见报错，如未在 `AndroidManifest.xml` 注册 Activity 导致的 `ActivityNotFoundException`（`START_CLASS_NOT_FOUND`），以及权限不足的 `SecurityException`（`START_PERMISSION_DENIED`）等。

> **调试提示**：MIUI 已包含 log 开关，打开方式（仅支持 `ro.debuggable=1` 的包）：
> `adb root; adb remount; adb shell setprop persist.wm.debug.start_activity true; adb shell stop; adb shell start;`

### 2.2 system_server 端处理

system_server 收到启动请求后需要完成 4 件事：解析请求参数、处理窗口层级树、触发 SourceActivity pause、触发创建进程。

缩略调用链：

```
ActivityTaskManagerService::startActivity
  ATMS::startActivityAsUser × 2
    ActivityStartController::obtainStarter                    ← 构建 ActivityStarter
      ActivityStarter::execute
        Request::resolveActivity                              ← 解析启动参数
        ActivityStarter::executeRequest                       ← 创建 ActivityRecord
          ActivityStarter::startActivityUnchecked
            ActivityStarter::startActivityInner               ← 核心函数
              getOrCreateRootTask                             ← 创建 Task
              setNewTask                                      ← AR 挂载到 Task
              Task::moveToFront                               ← 移到栈顶
              RootWindowContainer::resumeFocusedTasksTopActivities  ← 显示 Activity
                Task::resumeTopActivityUncheckedLocked
                  Task::resumeTopActivityInnerLocked
                    TaskFragment::resumeTopActivity
                      TaskDisplayArea::pauseBackTasks         ← pause Launcher
                      ATMS::startProcessAsync                 ← 创建目标进程
```

![阶段一 system_server 处理流程](/img/android/app_launching/04_phase1_summary.svg)

> 流程来到 `ATMS::startActivityAsUser` 时会构建 `ActivityStartController`。`obtainStarter` 返回 `ActivityStarter` 对象，后面的 Builder 模式都是在构建 `ActivityStarter` 内部的 `Request`。

#### 2.2.1 请求参数构建

```java
// ActivityTaskManagerService.java
private int startActivityAsUser(IApplicationThread caller, String callingPackage, ...) {
    ......
    return getActivityStartController().obtainStarter(intent, "startActivityAsUser")
            .setCaller(caller)
            .setCallingPackage(callingPackage)
            .setResolvedType(resolvedType)
            .setResultTo(resultTo)
            .setRequestCode(requestCode)
            .setActivityOptions(bOptions)
            .setUserId(userId)
            .execute();
}
```

Builder 模式将参数设置到 `mRequest` 中。但 `activityInfo` 并没有通过 setter 设置，所以在 `execute` 中需要先解析：

```java
// ActivityStarter.java
int execute() {
    ......
    if (mRequest.activityInfo == null) {
        mRequest.resolveActivity(mSupervisor);  // 解析获取 activityInfo
    }
    res = executeRequest(mRequest);              // 执行启动逻辑
    ......
}
```

`Request::resolveActivity` 内部通过 `ActivityTaskSupervisor::resolveIntent` 和 `resolveActivity` 解析出 `resolveInfo` 和 `activityInfo`，其中包含 TargetActivity 的进程包名和完整类路径。

#### 2.2.2 创建 ActivityRecord

`executeRequest` 是一个关键方法，内部创建 `ActivityRecord` 对象：

```java
// ActivityStarter.java
private int executeRequest(Request request) {
    ActivityInfo aInfo = request.activityInfo;
    ......
    // 打印关键日志（搜索 "START u" 可定位 Activity 启动）
    if (err == ActivityManager.START_SUCCESS) {
        request.logMessage.append("START u").append(userId).append(" {")
            .append(intent.toShortString(true, true, true, false))
            .append("} with ").append(launchModeToString(launchMode))
            .append(" from uid ").append(callingUid);
    }
    ......
    // 构造 ActivityRecord
    final ActivityRecord r = new ActivityRecord.Builder(mService)
            .setCaller(callerApp)
            .setLaunchedFromPid(callingPid)
            .setLaunchedFromUid(callingUid)
            .setIntent(intent)
            .setActivityInfo(aInfo)
            .setSourceRecord(sourceRecord)
            .build();
    ......
    // 继续主流程
    mLastStartActivityResult = startActivityUnchecked(r, sourceRecord, ...);
}
```

`ActivityRecord` 构造时调用父类 `WindowToken` 的构造函数，创建匿名 Token：

```java
// ActivityRecord.java
private ActivityRecord(ActivityTaskManagerService _service, ......) {
    super(_service.mWindowManager, new Token(), TYPE_APPLICATION, true,
          null /* displayContent */, false);
    packageName = info.applicationInfo.packageName;
    ......
}

// WindowToken.java
protected WindowToken(WindowManagerService service, IBinder _token, int type, ...) {
    super(service);
    token = _token;       // Token 赋值
    windowType = type;
    ......
    if (dc != null) {
        dc.addWindowToken(token, this);  // 挂载到窗口树
    }
}
```

这个 Token 就是 Activity 在 system_server 中的**唯一标识符**。注意：`DisplayContent::addWindowToken` 内部对 `ActivityRecord` 做了判断，`ActivityRecord` 刚创建后**不会**挂载到窗口树，需要后续单独处理。

#### 2.2.3 窗口层级树处理（startActivityInner）

`ActivityStarter::startActivityInner` 是启动流程中最重要的函数之一。在 Launcher 界面和启动电话后的窗口层级树对比：

![窗口层级树变化](/img/android/app_launching/03_window_hierarchy.svg)

该方法依次执行 4 个操作：

```java
// ActivityStarter.java
int startActivityInner(final ActivityRecord r, ActivityRecord sourceRecord, ...) {
    final Task targetTask = reusedTask != null ? reusedTask : computeTargetTask();
    final boolean newTask = targetTask == null;  // 冷启动为 true
    ......
    if (mTargetRootTask == null) {
        // 1. 创建 Task
        mTargetRootTask = getOrCreateRootTask(mStartActivity, mLaunchFlags, ...);
    }
    if (newTask) {
        // 2. 将 ActivityRecord 挂载到 Task
        setNewTask(taskToAffiliate);
    }
    if (!mAvoidMoveToFront && mDoResume) {
        // 3. 移动 Task 到栈顶
        mTargetRootTask.getRootTask().moveToFront("reuseOrNewTask", targetTask);
    }
    if (mDoResume) {
        // 4. 显示顶部 Activity（触发 pause + 创建进程）
        mRootWindowContainer.resumeFocusedTasksTopActivities(
                mTargetRootTask, mStartActivity, mOptions, mTransientLaunch);
    }
}
```

**操作 1：创建 Task**（`getOrCreateRootTask`）

调用链经过 `RootWindowContainer` → `TaskDisplayArea::getOrCreateRootTask`，最终通过 `Task.Builder` 创建：

```java
// TaskDisplayArea.java
Task getOrCreateRootTask(int windowingMode, int activityType, boolean onTop, ...) {
    ......
    return new Task.Builder(mAtmService)
            .setWindowingMode(windowingMode)
            .setActivityType(activityType)
            .setOnTop(onTop)
            .setParent(this)       // this = DefaultTaskDisplayArea，Task 直接挂载到此处
            .setSourceTask(sourceTask)
            .build();
}
```

`build()` 内部先 `new Task()`，然后通过 `mParent.addChild(task, POSITION_TOP)` 挂载到 `DefaultTaskDisplayArea`。

**操作 2：ActivityRecord 挂载到 Task**（`setNewTask`）

```java
// ActivityStarter.java
private void addOrReparentStartingActivity(Task task, String reason) {
    TaskFragment newParent = task;
    if (mStartActivity.getTaskFragment() == null
            || mStartActivity.getTaskFragment() == newParent) {
        // 将 ActivityRecord 挂载到 Task 顶部
        newParent.addChild(mStartActivity, POSITION_TOP);
    } else {
        mStartActivity.reparent(newParent, newParent.getChildCount(), reason);
    }
}
```

> 日志：`"Starting new activity %s in new task %s"` 在 `setNewTask` 中通过 ProtoLog 打印，可确认 ActivityRecord 挂载到了哪个 Task。

**操作 3：移动 Task 到栈顶**（`moveToFront`）

将新建的 Task 移动到 `DefaultTaskDisplayArea` 最前面。冷启动时 Task 创建即在栈顶，这一步实际无移动操作，但对其他场景（如从后台恢复）是关键方法。

```java
// Task.java
void moveToFront(String reason, Task task) {
    if (task == null) { task = this; }
    // 把 Task 移动到父容器（DefaultTaskDisplayArea）的最前面
    task.getParent().positionChildAt(POSITION_TOP, task, true);
}
```

**操作 4：显示顶部 Activity**（`resumeFocusedTasksTopActivities`）

经过 `resumeTopActivityUncheckedLocked` → `resumeTopActivityInnerLocked` → `TaskFragment::resumeTopActivity`。这个方法是 Framework 中非常常见的方法，功能是**显示顶层 Activity**，以后会经常看到。

当前场景中，启动 TargetActivity 的两个条件都不满足（进程未创建、Launcher 未 pause），所以执行两个异步操作：

```java
// TaskFragment.java
final boolean resumeTopActivity(ActivityRecord prev, ActivityOptions options,
        boolean deferPause) {
    ActivityRecord next = topRunningActivity(true);  // 电话的 ActivityRecord
    ......
    // 1. pause 当前 Activity（Launcher）
    boolean pausing = !deferPause && taskDisplayArea.pauseBackTasks(next);
    ......
    if (pausing) {
        ......
        if (!next.isProcessRunning()) {
            // 2. 异步创建目标进程
            final boolean isTop = this == taskDisplayArea.getFocusedRootTask();
            mAtmService.startProcessAsync(next, false, isTop,
                    isTop ? HostingRecord.HOSTING_TYPE_NEXT_TOP_ACTIVITY
                          : HostingRecord.HOSTING_TYPE_NEXT_ACTIVITY);
        }
        return true;  // pausing 为 true 时直接 return
    }
    ......  // 后面还有重要逻辑，当前被 return 跳过
}
```

#### 2.2.4 pause 流程

`pauseBackTasks` 遍历 `DefaultTaskDisplayArea` 下每个叶子 `TaskFragment` 执行 `startPausing`：

```java
// TaskFragment.java
boolean startPausing(boolean userLeaving, boolean uiSleeping,
        ActivityRecord resuming, String reason) {
    ActivityRecord prev = mResumedActivity;  // Launcher 的 ActivityRecord
    ......
    prev.setState(PAUSING, "startPausingLocked");
    ......
    // 构建 PauseActivityItem 触发 Launcher 的 pause
    schedulePauseActivity(prev, userLeaving, pauseImmediately, false, reason);
}

void schedulePauseActivity(ActivityRecord prev, ...) {
    mAtmService.getLifecycleManager().scheduleTransaction(
            prev.app.getThread(), prev.token,
            PauseActivityItem.obtain(prev.finishing, userLeaving, ...));
}
```

`PauseActivityItem` 在应用端的执行分两步：

```java
// PauseActivityItem.java
public void execute(ClientTransactionHandler client, ActivityClientRecord r, ...) {
    client.handlePauseActivity(r, ...);  // 1. 执行 Launcher 的 pause
}

public void postExecute(ClientTransactionHandler client, IBinder token, ...) {
    ActivityClient.getInstance().activityPaused(token);  // 2. 通知 AMS pause 完成（触发阶段二）
}
```

### 2.3 阶段一总结

1. Launcher 构建 `ActivityOptions` 参数，通过 Bundle 跨进程传递到 system_server
2. AMS 解析参数到 `Request`，构建 `ActivityRecord`（持有 Token，Activity 的唯一标识）
3. 创建 Task 挂载到 `DefaultTaskDisplayArea`，将 ActivityRecord 挂载到 Task 顶部
4. 移动 Task 到栈顶
5. 触发 Launcher pause（阶段二）和目标进程创建（阶段三），两者异步

此时窗口层级树已更新，但用户仍看到 Launcher，因为 TargetActivity 进程还没创建、Activity 还没启动。

## 3. 阶段二：completePause

### 3.1 入口

Launcher 完成 pause 后，通过 `PauseActivityItem::postExecute` → `ActivityClient::activityPaused` 跨进程通知 system_server。

```java
// ActivityRecord.java
void activityPaused(boolean timeout) {
    if (pausingActivity == this) {
        ProtoLog.v(WM_DEBUG_STATES, "Moving to PAUSED: %s %s", this,
                (timeout ? "(due to timeout)" : " (pause complete)"));
        ......
        taskFragment.completePause(true /* resumeNext */, null);
    }
}
```

> 日志：`"Moving to PAUSED: ActivityRecord{...} (pause complete)"` 可确认 pause 完成。

### 3.2 completePause 的两条路径

```java
// TaskFragment.java
void completePause(boolean resumeNext, ActivityRecord resuming) {
    ActivityRecord prev = mPausingActivity;
    prev.setState(PAUSED, "completePausedLocked");
    ......
    if (resumeNext) {
        // 路径一：显示顶层 Activity
        mRootWindowContainer.resumeFocusedTasksTopActivities(topRootTask, prev, null);
    }
    ......
    // 路径二：确保所有 Activity 正确可见性
    mRootWindowContainer.ensureActivitiesVisible(resuming, 0, !PRESERVE_WINDOWS);
}
```

两条路径都可能触发 `startSpecificActivity` 试图启动 TargetActivity。

![阶段二 completePause 流程](/img/android/app_launching/05_phase2_flow.svg)

#### 路径一：resumeFocusedTasksTopActivities

这次执行 `TaskFragment::resumeTopActivity` 与阶段一不同：`pausing = false`（没有需要 pause 的 Activity 了），不会走 `if (pausing)` 内部的 return 逻辑，而是走到下面的 `startSpecificActivity`：

```java
// TaskFragment.java - resumeTopActivity
if (next.attachedToProcess()) {
    ......  // 冷启动不会走这里
} else {
    ProtoLog.d(WM_DEBUG_STATES, "resumeTopActivity: Restarting %s", next);
    mTaskSupervisor.startSpecificActivity(next, true, true);
}
```

> 日志：`"resumeTopActivity: Restarting ActivityRecord{...}"` 可确认走了 `startSpecificActivity`。

#### 路径二：ensureActivitiesVisible

遍历所有屏幕 → 所有根 Task → 所有叶子 Task → 所有 ActivityRecord，根据条件处理可见性：

```
RootWindowContainer::ensureActivitiesVisible
  DisplayContent::ensureActivitiesVisible
    forAllRootTasks → Task::ensureActivitiesVisible
      forAllLeafTasks → TaskFragment::updateActivityVisibilities
        EnsureActivitiesVisibleHelper::process
          对每个 ActivityRecord 调用 setActivityVisibilityState
```

`setActivityVisibilityState` 对不同 Activity 的处理：

```java
// EnsureActivitiesVisibleHelper.java
private void setActivityVisibilityState(ActivityRecord r, ...) {
    if (reallyVisible) {
        if (!r.attachedToProcess()) {
            // TargetActivity：进程没就绪，试图启动
            makeVisibleAndRestartIfNeeded(mStarting, mConfigChanges, isTop, ...);
        } else {
            // 其他已就绪的 Activity：处理可见性
        }
    } else {
        r.makeInvisible();  // SourceActivity（Launcher）：触发 onStop
    }
}

private void makeVisibleAndRestartIfNeeded(..., ActivityRecord r) {
    r.setVisibility(true);                                       // 设置可见
    mTaskFragment.mTaskSupervisor.startSpecificActivity(r, ...); // 试图启动
}
```

### 3.3 关键方法：startSpecificActivity

无论从哪条路径进入，最终都走到这个方法：

```java
// ActivityTaskSupervisor.java
void startSpecificActivity(ActivityRecord r, boolean andResume, boolean checkConfig) {
    final WindowProcessController wpc =
            mService.getProcessController(r.processName, r.info.applicationInfo.uid);
    if (wpc != null && wpc.hasThread()) {
        // 进程已就绪 → 进入阶段四
        realStartActivityLocked(r, wpc, andResume, checkConfig);
        return;
    }
    // 进程未就绪 → 触发创建进程
    mService.startProcessAsync(r, knownToBeDead, isTop, ...);
}
```

### 3.4 关于 attachedToProcess 的说明

`TaskFragment::resumeTopActivity` 中用 `next.attachedToProcess()` 判断，`startSpecificActivity` 中用 `ATMS::getProcessController` 判断。两者的差异在于：

```java
// ActivityRecord.java
boolean attachedToProcess() {
    return hasProcess() && app.hasThread();  // app 通过 setProcess 赋值
}
```

`app` 字段通过 `ActivityRecord::setProcess` 设置，而 `setProcess` 在 `realStartActivityLocked` 中调用。因此**冷启动在首次执行 `realStartActivityLocked` 之前，`attachedToProcess` 一定返回 `false`**。而 `getProcessController` 是从全局的 `mProcessMap` 中查询，进程一旦创建就能查到。

这解释了为什么可能出现 `resumeTopActivity` 中 `attachedToProcess` 返回 false，但紧接着 `startSpecificActivity` 中却发现进程已就绪的情况。

## 4. 阶段三：触发进程创建

### 4.1 创建进程

阶段一中 `TaskFragment::resumeTopActivity` 触发的 `startProcessAsync`，通过 Handler 发送消息到 AMS：

```java
// ActivityTaskManagerService.java
void startProcessAsync(ActivityRecord activity, ...) {
    final Message m = PooledLambda.obtainMessage(
            ActivityManagerInternal::startProcess, mAmInternal,
            activity.processName, activity.info.applicationInfo, ...);
    mH.sendMessage(m);
}
```

完整调用链：

```
ATMS::startProcessAsync
  AMS$LocalService::startProcess
    AMS::startProcessLocked
      ProcessList::startProcessLocked
        ProcessList::handleProcessStart
          Process.start()                                   ← 实际创建进程
          ProcessList::handleProcessStartedLocked          ← 设置 PID、更新状态
            AMS::reportUidInfoMessageLocked                ← 打印关键日志
```

> **关键日志**：`"Start proc <pid>:<processName>/<uid> for <type> {<component>}"`，在 `reportUidInfoMessageLocked` 中打印，搜索 `"Start proc"` 可定位进程创建时间。

> **源码差异**：当前代码使用 `Process.start()` 启动进程，而非 `Process.startProcess`。

### 4.2 应用端处理

进程创建后执行 `ActivityThread::main`：

```java
// ActivityThread.java
final ApplicationThread mAppThread = new ApplicationThread();

public static void main(String[] args) {
    Looper.prepareMainLooper();
    ActivityThread thread = new ActivityThread();
    thread.attach(false, startSeq);
    Looper.loop();
}

private void attach(boolean system, long startSeq) {
    final IActivityManager mgr = ActivityManager.getService();
    // 将 mAppThread 告知 AMS，用于后续通信
    mgr.attachApplication(mAppThread, startSeq);
}
```

`mAppThread`（`ApplicationThread`）是 AMS 与应用进程通信的 Binder 对象。

### 4.3 system_server 端处理

![阶段三 + 阶段四流程](/img/android/app_launching/06_phase3_4.svg)

```java
// ActivityManagerService.java
public final void attachApplication(IApplicationThread thread, long startSeq) {
    synchronized (this) {
        int callingPid = Binder.getCallingPid();
        attachApplicationLocked(thread, callingPid, callingUid, startSeq);
    }
}

private boolean attachApplicationLocked(IApplicationThread thread, int pid, ...) {
    ProcessRecord app;
    synchronized (mPidsSelfLocked) {
        app = mPidsSelfLocked.get(pid);  // 通过 PID 获取 ProcessRecord
    }
    ......
    // 1. 通知应用端初始化 Application
    thread.bindApplication(processName, appInfo, ...);
    ......
    // 2. 触发启动 Activity
    if (!mConstants.mEnableWaitForFinishAttachApplication) {
        finishAttachApplicationInner(startSeq, callingUid, pid);
    }
}
```

`finishAttachApplicationInner` → `mAtmInternal.attachApplication` → `RootWindowContainer::attachApplication`：

> **源码差异**：当前代码中 `RootWindowContainer::attachApplication` 直接遍历 `mStartingProcessActivities` 列表逐个匹配 uid 和进程名后调用 `realStartActivityLocked`，而非使用 `AttachApplicationHelper` 遍历整棵窗口层级树。这通过维护一个待启动 Activity 列表避免全树遍历，提高了效率。

完整调用链：

```
AMS::attachApplication
  AMS::attachApplicationLocked
    ActivityThread::bindApplication                        ← 通知应用端初始化
    AMS::finishAttachApplicationInner
      ATMS$LocalService::attachApplication
        RootWindowContainer::attachApplication
          遍历 mStartingProcessActivities 列表
            ActivityTaskSupervisor::realStartActivityLocked ← 试图启动 Activity
```

## 5. 阶段四：真正启动 Activity

### 5.1 realStartActivityLocked

无论从阶段二还是阶段三进入，最终汇聚到此方法：

```java
// ActivityTaskSupervisor.java
boolean realStartActivityLocked(ActivityRecord r, WindowProcessController proc,
        boolean andResume, boolean checkConfig) throws RemoteException {
    // 1. 前置检查：还有 Activity 正在 pause → 直接 return
    if (!mRootWindowContainer.allPausedActivitiesComplete()) {
        ProtoLog.v(WM_DEBUG_STATES,
                "realStartActivityLocked: Skipping start of r=%s"
                + " some activities pausing...", r);
        return false;
    }

    // 2. 关联进程（此后 attachedToProcess 返回 true）
    r.setProcess(proc);

    // 3. event 日志
    EventLogTags.writeWmRestartActivity(r.mUserId,
            System.identityHashCode(r), task.mTaskId, r.shortComponentName);

    // 4. 构建事务
    //   - LaunchActivityItem：触发 Activity 创建和 onCreate
    //   - ResumeActivityItem：将生命周期推进到 onResume
    final ActivityLifecycleItem lifecycleItem;
    if (andResume) {
        lifecycleItem = ResumeActivityItem.obtain(isTransitionForward);
    } else {
        lifecycleItem = PauseActivityItem.obtain();
    }

    // 5. 调度执行
    mService.getLifecycleManager().scheduleTransactionAndLifecycleItems(...);
}
```

> **源码差异**：当前代码使用 `scheduleTransactionAndLifecycleItems()` API 调度事务，而非显式创建 `ClientTransaction` 再手动添加 callback 和 setLifecycleStateRequest。这是更新的 API 封装，内部仍基于 `ClientTransaction` 机制。

> 日志：`"realStartActivityLocked: Skipping start of r=..."` 表示因 pause 未完成而跳过启动。`wm_restart_activity` event 日志表示真正开始启动。

### 5.2 应用端创建 Activity

`LaunchActivityItem::execute` 在应用端触发 Activity 创建：

```java
// LaunchActivityItem.java
public void execute(ClientTransactionHandler client, IBinder token, ...) {
    ActivityClientRecord r = new ActivityClientRecord(token, mIntent, ...);
    client.handleLaunchActivity(r, pendingActions, null);
}
```

这里的 `token` 就是阶段一创建 `ActivityRecord` 时生成的匿名 Token，贯穿整个流程。

```java
// ActivityThread.java
public Activity handleLaunchActivity(ActivityClientRecord r, ...) {
    final Activity a = performLaunchActivity(r, customIntent);
    ......
}

private Activity performLaunchActivity(ActivityClientRecord r, Intent customIntent) {
    Activity activity = null;

    // 1. 反射创建 Activity
    java.lang.ClassLoader cl = appContext.getClassLoader();
    activity = mInstrumentation.newActivity(cl, component.getClassName(), r.intent);

    // 2. 执行 attach（创建 PhoneWindow，设置 WindowManager）
    activity.attach(appContext, this, getInstrumentation(), r.token,
            r.ident, app, r.intent, r.activityInfo, title, r.parent,
            r.embeddedID, r.lastNonConfigurationInstances, config,
            r.referrer, r.voiceInteractor, window, r.activityConfigCallback,
            r.assistToken, r.shareableActivityToken);

    // 3. 执行 onCreate
    if (r.isPersistable()) {
        mInstrumentation.callActivityOnCreate(activity, r.state, r.persistentState);
    } else {
        mInstrumentation.callActivityOnCreate(activity, r.state);
    }
}
```

`callActivityOnCreate` → `Activity::performCreate` → `Activity::onCreate`，最终执行开发者重写的 `onCreate`。

随后 `ResumeActivityItem` 执行，将生命周期推进到 `onResume`。至此 TargetActivity 完成启动，用户看到目标应用界面。

## 6. 全流程总结

| 阶段    | 触发点 | 核心操作 | 关键方法 | 关键日志 |
|-------|--------|---------|---------|---------|
| **1** | 用户点击图标 | 解析参数、创建 AR/Task、挂载窗口树 | `startActivityInner` | `"START u"` |
| **2** | Launcher 完成 pause | completePause → 两条路径试图启动 | `startSpecificActivity` | `"Moving to PAUSED"` |
| **3** | 进程创建完成 | attachApplication → 遍历待启动列表 | `attachApplicationLocked` | `"Start proc"` |
| **4** | 两个条件同时满足 | realStartActivityLocked → 事务 | `realStartActivityLocked` | `wm_restart_activity` |