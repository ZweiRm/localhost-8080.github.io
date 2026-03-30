---
prev:
    text: 'Activity 启动流程与生命周期'
    link: '/framework/activity-launching-process'
next:
    text: 'Android 广播系统'
    link: '/framework/android-broadcast-system'
---

# AMS 进程管理

## 一、背景

### 1.1 概述

AMS（ActivityManagerService）是 Android 中非常重要的系统服务，包含应用的启动、Activity 任务栈管理、应用生命周期管理、进程管理、内存管理等功能。本文聚焦于 AMS 的进程管理，涵盖进程创建、进程重启、进程优先级调整、LRU 管理、进程冻结等核心机制。

### 1.2 进程基础

在 Linux 中，进程用结构体 `task_struct` 描述，包含进程 ID（pid）、内存区描述符等关键信息：

```c
struct task_struct {
    ......
    /* 进程状态 */
    volatile long state;
    /* 指向该进程的内存区描述符 */
    struct mm_struct *mm, *active_mm;
    /* 进程ID，每个进程(线程)的PID都不同 */
    pid_t pid;
    ...
}
```

进程的资源（代码资源、运行时内存等）都依附于进程的内存空间。操作系统针对不同进程的内存空间做分配和管理。

Android 系统的资源是有限的——内存资源、CPU 资源都需要合理分配。AMS 需要知道哪些进程更重要、哪些进程不那么重要，然后针对进程的优先级做不同的资源管理和回收策略。这就是 AMS 进程管理的核心逻辑。

## 二、四大组件启动进程

### 2.1 概述

当某个应用组件启动，且该应用没有运行其他任何组件时，Android 系统会为应用启动新的进程。因此，四大组件中任何一个先启动都会触发应用进程的创建。

在应用程序中，开发者通过以下方式启动四大组件：

- `startActivity(Intent intent)` 启动 Activity
- `startService(Intent service)` 启动 Service
- `sendBroadcast(Intent intent)` 发送广播
- `ContentResolver` 中的接口使用 ContentProvider

这些方法最终都是通过 Binder 调用到 `ActivityManagerService` 中，由其进行处理。应用进程和 `system_server` 进程是相互独立的，两者之间的方法调用依赖 Binder 框架提供的进程间通讯能力。

![四大组件与 AMS 的调用关系](/img/android/process_management/01_four_components_to_ams.svg)

### 2.2 Activity 与进程创建

在 AMS 中，对每一个运行中的 Activity 都有一个 `ActivityRecord` 对象与之对应，记录 Activity 的详细状态。

Activity 的启动是一个复杂过程，涉及以下背景知识：

- AMS 中通过 Stack 和 Task 来管理 Activity
- 每一个 Activity 属于一个 Task，一个 Task 可能包含多个 Activity，一个 Stack 包含多个 Task
- `ActivityTaskSupervisor` 类负责管理所有的 Stack
- Activity 启动过程涉及 Intent 解析、Stack/Task 查询或创建、Activity 进程创建、窗口创建、生命周期调度

![Activity 管理结构](/img/android/process_management/02_activity_stack_task.svg)

在 Activity 启动的最后，如果发现新启动的 Activity 所在进程还没有启动，则会通过 `startSpecificActivity` 将其启动。关键代码如下：

```java
// ActivityTaskSupervisor.java (line 1194)
void startSpecificActivity(ActivityRecord r, boolean andResume, boolean checkConfig) {
    // Is this activity's application already running?
    final WindowProcessController wpc =
            mService.getProcessController(r.processName, r.info.applicationInfo.uid);

    boolean knownToBeDead = false;
    if (wpc != null && wpc.hasThread()) {
        try {
            realStartActivityLocked(r, wpc, andResume, checkConfig);
            return;
        } catch (RemoteException e) {
            // ...
        }
        knownToBeDead = true;
        // ...
    }
    // ...
    final boolean isTop = andResume && r.isTopRunningActivity();
    mService.startProcessAsync(r, knownToBeDead, isTop,
            isTop ? HostingRecord.HOSTING_TYPE_TOP_ACTIVITY
                    : HostingRecord.HOSTING_TYPE_ACTIVITY);
}
```

> **版本差异说明**：在较早的 Android 版本中，该方法名为 `startSpecificActivityLocked`，通过 `mService.startProcessLocked` 创建进程。当前版本（Android V）已重命名为 `startSpecificActivity`，使用 `startProcessAsync` 异步创建进程。

### 2.3 Service 与进程创建

Service 的启动相对于 Activity 简单一些。对每一个运行中的 Service，AMS 都有一个 `ServiceRecord` 对象与之对应。

启动 Service 的调用流程：

- `ActivityManagerService.startService` =>
- `ActiveServices.startServiceLocked` =>
- `ActiveServices.startServiceInnerLocked` =>
- `ActiveServices.bringUpServiceLocked` =>
- `ActivityManagerService.startProcessLocked`

`ActiveServices.bringUpServiceLocked` 会判断 Service 所在进程是否已启动，如果没有则通过 `startProcessLocked` 启动。关键代码：

```java
// ActiveServices.java
// Not running -- get it started, and enqueue this service record
// to be executed when the app comes up.
if (app == null && !permissionsReviewRequired) {
    if ((app = mAm.startProcessLocked(procName, r.appInfo, true, intentFlags,
            "service", r.name, false, isolated, false)) == null) {
        String msg = "Unable to launch app "
                + r.appInfo.packageName + "/"
                + r.appInfo.uid + " for service "
                + r.intent.getIntent() + ": process is bad";
        Slog.w(TAG, msg);
        bringDownServiceLocked(r);
        return msg;
    }
    if (isolated) {
        r.isolatedProc = app;
    }
}
```

### 2.4 ContentProvider 与进程创建

对每一个运行中的 ContentProvider，AMS 都有一个 `ContentProviderRecord` 对象与之对应。开发者通过 `ContentResolver` 中的 `insert`、`delete`、`update`、`query` 接口来使用 ContentProvider。

同一个 ContentProvider 可能同时被多个模块使用，调用 `ContentResolver` 接口的进程只是客户端，真正的 ContentProvider 运行在自身的进程中，两个进程的通讯通过 Binder 远程接口完成。

![ContentProvider IPC 模型](/img/android/process_management/03_content_provider_ipc.svg)

`ContentResolver.acquireProvider` 最终调用到 `ActivityManagerService.getContentProvider`，该方法委托给 `ContentProviderHelper.getContentProvider()`。在 `ContentProviderHelper.getContentProviderImpl` 方法中，会判断对应的 ContentProvider 进程是否已启动，如果没有则通过 `startProcessLocked` 将其启动。

### 2.5 BroadcastReceiver 与进程创建

开发者通过 `Context.sendBroadcast` 接口来发送广播。`ActivityManagerService.broadcastIntent` 方法处理广播发送。

广播是一种一对多的消息形式，接收者数量不确定。在 AMS 内部通过队列形式管理广播：

- `BroadcastQueue` 描述广播队列
- `BroadcastRecord` 描述广播事件

收到广播发送请求后，AMS 创建 `BroadcastRecord` 放入 `BroadcastQueue`，由队列在另一个线程中处理广播发送。如果发现接收者进程还没有启动，便会通过 `startProcessLocked` 方法将其启动。

## 三、进程重启机制

### 3.1 进程死亡处理流程

当一个进程死亡时，系统通过 `binderDied` 回调感知到进程退出，触发以下调用链：

```
binderDied
    AMS.appDiedLocked
        AMS.handleAppDiedLocked(app, pid, restarting, allowRestart, fromBinderDied)
            AMS.cleanUpApplicationRecordLocked(app, pid, restarting, allowRestart, ...)
                ActiveServices.killServicesLocked(app, allowRestart)
                    ActiveServices.scheduleServiceRestartLocked(sr, true)
```

### 3.2 appDiedLocked（AOSP 逻辑）

当 Binder 死亡通知到达时，系统调用 `appDiedLocked`：

```java
// ActivityManagerService.java (line 3886)
final void appDiedLocked(ProcessRecord app, int pid, IApplicationThread thread,
        boolean fromBinderDied, String reason) {
    // 确认 ProcessRecord 是否对应当前 pid
    final ProcessRecord curProc;
    synchronized (mPidsSelfLocked) {
        curProc = mPidsSelfLocked.get(pid);
    }
    if (curProc != app) {
        if (!fromBinderDied || !mProcessList.handleDyingAppDeathLocked(app, pid)) {
            Slog.w(TAG, "Spurious death for " + app + ", curProc for " + pid + ": " + curProc);
        }
        return;
    }

    mBatteryStatsService.noteProcessDied(app.info.uid, pid);

    if (!app.isKilled()) {
        if (!fromBinderDied) {
            killProcessQuiet(pid);
            mProcessList.noteAppKill(app, ApplicationExitInfo.REASON_OTHER,
                    ApplicationExitInfo.SUBREASON_UNKNOWN, reason);
        }
        app.killProcessGroupIfNecessaryLocked(true);
        synchronized (mProcLock) {
            app.setKilled(true);
        }
    }

    IApplicationThread appThread;
    final int setAdj = app.mState.getSetAdj();
    final int setProcState = app.mState.getSetProcState();
    if (app.getPid() == pid && (appThread = app.getThread()) != null
            && appThread.asBinder() == thread.asBinder()) {
        boolean doLowMem = app.getActiveInstrumentation() == null;
        boolean doOomAdj = doLowMem;
        if (!app.isKilledByAm()) {
            reportUidInfoMessageLocked(TAG,
                    "Process " + app.processName + " (pid " + pid + ") has died: "
                    + ProcessList.makeOomAdjString(setAdj, true) + " "
                    + ProcessList.makeProcStateString(setProcState), app.info.uid);
            mAppProfiler.setAllowLowerMemLevelLocked(true);
        } else {
            mAppProfiler.setAllowLowerMemLevelLocked(false);
            doLowMem = false;
        }

        EventLogTags.writeAmProcDied(app.userId, pid, app.processName, setAdj, setProcState);

        // AOSP 原始逻辑：allowRestart 参数传入 true
        // 编者注：此处源码有厂商定制，文档展示 AOSP 原始逻辑
        handleAppDiedLocked(app, pid, false, true, fromBinderDied);

        if (doOomAdj) {
            updateOomAdjLocked(OOM_ADJ_REASON_PROCESS_END);
        }
        if (doLowMem) {
            mAppProfiler.doLowMemReportIfNeededLocked(app);
        }
    }
    // ...
}
```

### 3.3 killServicesLocked

`killServicesLocked` 在 `cleanUpApplicationRecordLocked` 中调用，负责处理进程死亡后 Service 的重启判断：

```java
// ActiveServices.java (line 7688)
final void killServicesLocked(ProcessRecord app, boolean allowRestart) {
    // ...
    // 遍历进程中的所有 Service
    for (int i = numberOfRunningServices - 1; i >= 0; i--) {
        ServiceRecord sr = psr.getRunningServiceAt(i);
        // ...

        // 如果 crash 次数超过阈值（默认 2 次），且不是持久进程，停止服务
        if (allowRestart && sr.crashCount >= mAm.mConstants.BOUND_SERVICE_MAX_CRASH_RETRY
                && (sr.serviceInfo.applicationInfo.flags
                    & ApplicationInfo.FLAG_PERSISTENT) == 0) {
            Slog.w(TAG, "Service crashed " + sr.crashCount
                    + " times, stopping: " + sr);
            EventLog.writeEvent(EventLogTags.AM_SERVICE_CRASHED_TOO_MUCH,
                    sr.userId, sr.crashCount, sr.shortInstanceName,
                    sr.app != null ? sr.app.getPid() : -1);
            bringDownServiceLocked(sr, true);
        } else {
            // crash 次数未超限 → 安排 Service 重启
            final boolean scheduled = scheduleServiceRestartLocked(sr, true);
            // ...
        }
    }
    // ...
}
```

### 3.4 Service 重启逻辑

`scheduleServiceRestartLocked` 负责安排 Service 的延迟重启：

```java
// ActiveServices.java (line 5613)
private final boolean scheduleServiceRestartLocked(ServiceRecord r, boolean allowCancel) {
    // ... 计算重启延迟时间
    // 如果 Service 设置了重启延迟，使用设置的值
    // 否则使用默认延迟策略（每次 crash 延迟递增）

    // 记录重启事件日志
    EventLog.writeEvent(EventLogTags.AM_SCHEDULE_SERVICE_RESTART,
            r.userId, r.shortInstanceName, r.restartDelay);

    // 通过 mAm.mHandler 安排延迟重启消息
    mAm.mHandler.removeCallbacks(r.restarter);
    mAm.mHandler.postAtTime(r.restarter, r.nextRestartTime);
    // ...
    return true;
}
```

**事件日志说明**：

- Service crash 过多被拒绝重启：`am_service_crashed_too_much: [userId, crashCount, shortName, pid]`
- Service 被允许重启：`am_schedule_service_restart: [userId, shortName, restartDelay]`

### 3.3 持久进程的重启

对于持久进程（`isPersistent() == true`），在 `cleanUpApplicationRecordLocked` 中有特殊处理：如果进程还没有在待启动列表中，且没有被禁用，则将其加入 `mPersistentStartingProcesses` 并通过 `startProcessLocked` 重启：

```java
// ActivityManagerService.java - cleanUpApplicationRecordLocked
if (!app.isPersistent() || app.isolated) {
    // 非持久进程，移除记录
    if (!replacingPid) {
        mProcessList.removeProcessNameLocked(app.processName, app.uid, app);
    }
    // ...
} else if (!app.isRemoved()) {
    // 持久进程需要保持运行
    if (mPersistentStartingProcesses.indexOf(app) < 0) {
        mPersistentStartingProcesses.add(app);
        restart = true;
    }
}

// ...
if (restart && allowRestart && !app.isolated) {
    // 重新启动进程
    mProcessList.addProcessNameLocked(app);
    app.setPendingStart(false);
    mProcessList.startProcessLocked(app, new HostingRecord(
            HostingRecord.HOSTING_TYPE_RESTART, app.processName),
            ZYGOTE_POLICY_FLAG_EMPTY);
    return true;
}
```

## 四、进程优先级（adj）调整

### 4.1 Android 应用进程分类

Android 将应用进程分为五大类：

1. **Foreground 类**（重要性最高）：
   - 含一个前台 Activity（`onResume` 已调用）
   - 含一个 Service 且该 Service 和前台 Activity 绑定
   - 含一个调用了 `startForeground` 的 Service
   - 有 BroadcastReceiver 实例正在执行 `onReceive`

2. **Visible 类**：
   - 包含一个仅 `onPause` 被调用的 Activity（部分界面被遮住）
   - 包含一个 Service 且该 Service 和 Visible 或 Foreground 的 Activity 绑定

3. **Service 类**：包含一个通过 `startService` 启动的 Service，不属于前两类

4. **Background 类**：包含当前不可见的 Activity（`onStop` 已调用），系统按 LRU 策略回收

5. **Empty 类**：不包含任何组件，保留是为了再次需要时省去创建 Android 运行环境的开销

### 4.2 oom_score_adj 级别

Linux 内核通过 `/proc/[pid]/oom_score_adj` 文件暴露进程优先级，允许值范围 -1000 ~ +1001。值越小表示进程越重要。内存紧张时，系统遍历所有进程读取该值以确定回收顺序。

`ProcessList.java` 中预定义了 `oom_score_adj` 的可能取值：

```java
// ProcessList.java (line 226)
public static final int CACHED_APP_MAX_ADJ = 999;   // 缓存进程最大值
public static final int CACHED_APP_MIN_ADJ = 900;   // 缓存进程最小值
public static final int CACHED_APP_LMK_FIRST_ADJ = 950; // LMK 首先回收的级别
public static final int SERVICE_B_ADJ = 800;         // 老旧服务
public static final int PREVIOUS_APP_ADJ = 700;      // 上一个应用
public static final int HOME_APP_ADJ = 600;          // 桌面应用
public static final int SERVICE_ADJ = 500;           // 应用服务
public static final int HEAVY_WEIGHT_APP_ADJ = 400;  // 重量级应用
public static final int BACKUP_APP_ADJ = 300;        // 备份操作
public static final int PERCEPTIBLE_LOW_APP_ADJ = 250; // 可感知（低）
public static final int PERCEPTIBLE_APP_ADJ = 200;   // 可感知（如后台音乐）
public static final int VISIBLE_APP_ADJ = 100;       // 可见活动
public static final int PERCEPTIBLE_RECENT_FOREGROUND_APP_ADJ = 50; // 近期前台转FGS
public static final int FOREGROUND_APP_ADJ = 0;      // 前台应用（普通应用最高）
public static final int PERSISTENT_SERVICE_ADJ = -700; // 系统/持久进程绑定
public static final int PERSISTENT_PROC_ADJ = -800;  // 系统持久进程（如电话）
public static final int SYSTEM_ADJ = -900;           // 系统进程
public static final int NATIVE_ADJ = -1000;          // 原生进程
```

**一些重要的级别**：

- `FOREGROUND_APP_ADJ = 0` 是普通应用能获取到的最高优先级
- `VISIBLE_APP_ADJ` 是具有可见 Activity 的进程优先级：如果前台 Activity 设置了透明属性，背后的 Activity 也算可见
- `PERCEPTIBLE_APP_ADJ` 是用户可感知的进程：含 pause 状态的 Activity、正在 stop 的 Activity、前台 Service
- `PERSISTENT_PROC_ADJ` / `SYSTEM_ADJ` 是系统常驻进程，几乎任何时候都需要存在

### 4.3 ProcessState

进程状态影响虚拟机对进程的内存分配和垃圾回收策略。`ActivityManager.java` 定义了 process_state 级别划分，系统在修改进程状态时同步更新 `oom_score_adj`：

```java
// ActivityManager.java
public static final int PROCESS_STATE_UNKNOWN               = -1;  // 未知
public static final int PROCESS_STATE_PERSISTENT             = 0;   // 持久核心进程
public static final int PROCESS_STATE_PERSISTENT_UI          = 1;   // 带UI的持久进程
public static final int PROCESS_STATE_TOP                    = 2;   // 前台顶级进程
public static final int PROCESS_STATE_BOUND_TOP              = 3;   // 绑定到前台进程
public static final int PROCESS_STATE_FOREGROUND_SERVICE     = 4;   // 前台服务
public static final int PROCESS_STATE_BOUND_FOREGROUND_SERVICE = 5; // 绑定前台服务
public static final int PROCESS_STATE_IMPORTANT_FOREGROUND   = 6;   // 重要前台
public static final int PROCESS_STATE_IMPORTANT_BACKGROUND   = 7;   // 重要后台
public static final int PROCESS_STATE_TRANSIENT_BACKGROUND   = 8;   // 临时后台
public static final int PROCESS_STATE_BACKUP                 = 9;   // 备份
public static final int PROCESS_STATE_SERVICE                = 10;  // 普通服务
public static final int PROCESS_STATE_RECEIVER               = 11;  // 广播接收
public static final int PROCESS_STATE_TOP_SLEEPING           = 12;  // 休眠前台
public static final int PROCESS_STATE_HEAVY_WEIGHT           = 13;  // 重量级
public static final int PROCESS_STATE_HOME                   = 14;  // 桌面
public static final int PROCESS_STATE_LAST_ACTIVITY          = 15;  // 最后活动
public static final int PROCESS_STATE_CACHED_ACTIVITY        = 16;  // 缓存活动
public static final int PROCESS_STATE_CACHED_ACTIVITY_CLIENT = 17;  // 缓存客户端
public static final int PROCESS_STATE_CACHED_RECENT          = 18;  // 近期缓存
public static final int PROCESS_STATE_CACHED_EMPTY           = 19;  // 空缓存
public static final int PROCESS_STATE_NONEXISTENT            = 20;  // 不存在
```

### 4.4 ScheduleGroup

内核负责进程的 CPU 调度，ProcessList.java 中为 Activity Manager 定义了一套调度分组：

```java
// ProcessList.java
static final int SCHED_GROUP_UNDEFINED = Integer.MIN_VALUE;
static final int SCHED_GROUP_BACKGROUND = 0;      // 后台
static final int SCHED_GROUP_RESTRICTED = 1;       // 受限
static final int SCHED_GROUP_DEFAULT = 2;          // 默认
public static final int SCHED_GROUP_TOP_APP = 3;   // 顶层应用
static final int SCHED_GROUP_TOP_APP_BOUND = 4;    // 绑定到顶层应用
static final int SCHED_GROUP_FOREGROUND_WINDOW = 5; // 前台窗口
```

### 4.5 进程优先级的变化

进程优先级影响以下三个方面：

- 内存紧张时，系统对进程的回收策略
- 系统对进程的 CPU 调度策略
- 虚拟机对进程的内存分配和垃圾回收策略

触发进程状态变化的事件包括：Activity 切换、启动广播、绑定/启动服务、UI 可见性变化等，最终都直接或间接调用 `OomAdjuster` 中的 `updateOomAdjLocked` 方法来更新进程优先级。

### 4.6 ProcessRecord 中与 oom_score_adj 相关的属性

`ProcessRecord.java` 中记录了进程优先级相关的关键属性：

```java
// ProcessRecord.java / ProcessStateRecord.java
// 和 oom_score_adj 有关
int maxAdj;           // 进程的最大 OOM 调整值上限
int curRawAdj;        // 当前计算的原始（未限制）adj
int setRawAdj;        // 上次设置的原始 adj
int curAdj;           // 当前生效的 adj（经过限制和修正）
int setAdj;           // 上次设置给内核的 adj

// 和调度优先级有关
int curSchedGroup;    // 当前期望的调度组
int setSchedGroup;    // 上次设置的调度组

// 进程状态
int curProcState;     // 当前进程状态 (PROCESS_STATE_*)
int setProcState;     // 上次设置的进程状态

// 内存回收级别
int trimMemoryLevel;  // 上次选择的内存整理级别

// 进程状态标记
boolean foregroundServices; // 是否有前台 Service 在运行
boolean hasShownUi;         // 启动后是否展示过 UI
boolean hasAboveClient;     // 是否通过 BIND_ABOVE_CLIENT 绑定

// 序号
int adjSeq;           // adj 更新周期的序列号
int lruSeq;           // LRU 更新周期的序列号
```

### 4.7 updateOomAdjLocked

主要有两个方法负责更新进程优先级：

- 针对单个进程：`boolean updateOomAdjLocked(ProcessRecord app, @OomAdjReason int oomAdjReason)`
- 针对所有进程：`void updateOomAdjLocked(@OomAdjReason int oomAdjReason)`

#### 4.7.1 单独调整进程

```java
// OomAdjuster.java (line 664)
@GuardedBy("mService")
boolean updateOomAdjLocked(ProcessRecord app, @OomAdjReason int oomAdjReason) {
    synchronized (mProcLock) {
        return updateOomAdjLSP(app, oomAdjReason);
    }
}

@GuardedBy({"mService", "mProcLock"})
private boolean updateOomAdjLSP(ProcessRecord app, @OomAdjReason int oomAdjReason) {
    if (app == null || !mConstants.OOMADJ_UPDATE_QUICK) {
        updateOomAdjLSP(oomAdjReason);
        return true;
    }

    if (checkAndEnqueueOomAdjTargetLocked(app)) {
        // Simply return true as there is an oomAdjUpdate ongoing
        return true;
    }

    try {
        mOomAdjUpdateOngoing = true;
        return performUpdateOomAdjLSP(app, oomAdjReason);
    } finally {
        mOomAdjUpdateOngoing = false;
        updateOomAdjPendingTargetsLocked(oomAdjReason);
    }
}
```

`performUpdateOomAdjLSP` 的具体实现取决于 `oomadjuster_correctness_rewrite` 配置。当该配置为 `true` 时（当前默认），调用的是 `OomAdjusterModernImpl` 的实现：

```java
// OomAdjusterModernImpl.java (line 906)
@Override
protected boolean performUpdateOomAdjLSP(ProcessRecord app, @OomAdjReason int oomAdjReason) {
    mPendingProcessSet.add(app);
    performUpdateOomAdjPendingTargetsLocked(oomAdjReason);
    return true;
}
```

`performUpdateOomAdjPendingTargetsLocked` 执行增量更新：

```java
// OomAdjusterModernImpl.java
@Override
protected void performUpdateOomAdjPendingTargetsLocked(@OomAdjReason int oomAdjReason) {
    mLastReason = oomAdjReason;
    // 校准前台进程状态
    mProcessStateCurTop = enqueuePendingTopAppIfNecessaryLSP();

    Trace.traceBegin(Trace.TRACE_TAG_ACTIVITY_MANAGER, oomAdjReasonToString(oomAdjReason));

    synchronized (mProcLock) {
        // 对待处理进程集合执行增量更新（核心计算逻辑）
        partialUpdateLSP(oomAdjReason, mPendingProcessSet);
    }
    mPendingProcessSet.clear();

    Trace.traceEnd(Trace.TRACE_TAG_ACTIVITY_MANAGER);
}
```

`partialUpdateLSP` 是增量更新的核心方法，步骤如下：

1. 初始化上下文（获取 topApp、时间戳、递增 adjSeq）
2. 标记可达进程（target 进程 + 递归收集其依赖进程）
3. 初始化可达进程的状态（`initReachableStatesLSP`）
4. 计算进程间连接关系修正 adj（`computeConnectionsLSP`）
5. 按需执行 LRU 调整（`applyLruAdjust`）
6. 更新 UID 记录
7. 落地更新结果（`postUpdateOomAdjInnerLSP`）

```java
// OomAdjusterModernImpl.java - partialUpdateLSP
@GuardedBy({"mService", "mProcLock"})
private void partialUpdateLSP(@OomAdjReason int oomAdjReason, ArraySet<ProcessRecord> targets) {
    final ProcessRecord topApp = mService.getTopApp();
    final long now = mInjector.getUptimeMillis();
    final long nowElapsed = mInjector.getElapsedRealtimeMillis();
    final long oldTime = now - mConstants.mMaxEmptyTimeMillis;

    ActiveUids activeUids = mTmpUidRecords;
    activeUids.clear();
    mTmpOomAdjusterArgs.update(topApp, now, UNKNOWN_ADJ, oomAdjReason, activeUids, false);
    mAdjSeq++;

    // 标记可达进程
    final ArrayList<ProcessRecord> reachables = mTmpProcessList;
    reachables.clear();
    for (int i = 0, size = targets.size(); i < size; i++) {
        final ProcessRecord target = targets.valueAtUnchecked(i);
        target.mState.resetCachedInfo();
        target.mState.setReachable(true);
        reachables.add(target);
    }
    // 递归收集依赖进程
    collectAndMarkReachableProcessesLSP(reachables);

    // 初始化可达进程状态
    mProcessRecordProcStateNodes.resetLastNodes();
    initReachableStatesLSP(reachables, targets.size(), mTmpOomAdjusterArgs);

    // 计算连接关系修正 adj
    mProcessRecordAdjNodes.resetLastNodes();
    computeConnectionsLSP();

    // 判断是否需要 LRU 调整
    boolean needLruAdjust = false;
    for (int i = 0, size = reachables.size(); i < size; i++) {
        final ProcessStateRecord state = reachables.get(i).mState;
        state.setReachable(false);
        state.setCompletedAdjSeq(mAdjSeq);
        final int curAdj = state.getCurAdj();
        if (curAdj >= UNKNOWN_ADJ) {
            needLruAdjust = true;
        }
    }
    if (needLruAdjust) {
        applyLruAdjust(mProcessList.getLruProcessesLOSP());
    }

    // 更新 UID 记录
    for (int i = 0, size = activeUids.size(); i < size; i++) {
        final UidRecord ur = activeUids.valueAt(i);
        ur.reset();
        for (int j = ur.getNumOfProcs() - 1; j >= 0; j--) {
            updateAppUidRecIfNecessaryLSP(ur.getProcessRecordByIndex(j));
        }
    }

    // 落地更新结果
    postUpdateOomAdjInnerLSP(oomAdjReason, activeUids, now, nowElapsed, oldTime, false);
}
```

#### 4.7.2 针对所有进程

```java
// OomAdjuster.java (line 622)
@GuardedBy("mService")
void updateOomAdjLocked(@OomAdjReason int oomAdjReason) {
    synchronized (mProcLock) {
        updateOomAdjLSP(oomAdjReason);
    }
}

@GuardedBy({"mService", "mProcLock"})
private void updateOomAdjLSP(@OomAdjReason int oomAdjReason) {
    if (checkAndEnqueueOomAdjTargetLocked(null)) {
        return;
    }
    try {
        mOomAdjUpdateOngoing = true;
        performUpdateOomAdjLSP(oomAdjReason);
    } finally {
        mOomAdjUpdateOngoing = false;
        updateOomAdjPendingTargetsLocked(oomAdjReason);
    }
}
```

全量更新的 `OomAdjusterModernImpl.performUpdateOomAdjLSP` 实现：

```java
// OomAdjusterModernImpl.java (line 889)
@Override
protected void performUpdateOomAdjLSP(@OomAdjReason int oomAdjReason) {
    final ProcessRecord topApp = mService.getTopApp();
    mProcessStateCurTop = mService.mAtmInternal.getTopProcessState();
    mPendingProcessSet.clear();
    mService.mAppProfiler.mHasPreviousProcess = mService.mAppProfiler.mHasHomeProcess = false;

    mLastReason = oomAdjReason;
    Trace.traceBegin(Trace.TRACE_TAG_ACTIVITY_MANAGER, oomAdjReasonToString(oomAdjReason));

    fullUpdateLSP(oomAdjReason);

    Trace.traceEnd(Trace.TRACE_TAG_ACTIVITY_MANAGER);
}
```

`fullUpdateLSP` 全量更新流程：

```java
// OomAdjusterModernImpl.java - fullUpdateLSP
@GuardedBy({"mService", "mProcLock"})
private void fullUpdateLSP(@OomAdjReason int oomAdjReason) {
    final ProcessRecord topApp = mService.getTopApp();
    final long now = mInjector.getUptimeMillis();
    final long nowElapsed = mInjector.getElapsedRealtimeMillis();
    final long oldTime = now - mConstants.mMaxEmptyTimeMillis;

    mAdjSeq++;
    mNewNumServiceProcs = 0;
    mNewNumAServiceProcs = 0;
    mProcessRecordProcStateNodes.reset();
    mProcessRecordAdjNodes.reset();

    // 遍历所有进程（按 LRU 顺序）计算 Adj/ProcState
    final ArrayList<ProcessRecord> lru = mProcessList.getLruProcessesLOSP();
    for (int i = lru.size() - 1; i >= 0; i--) {
        final ProcessRecord app = lru.get(i);
        app.mState.resetCachedInfo();
        final UidRecord uidRec = app.getUidRecord();
        if (uidRec != null) {
            uidRec.reset();
        }
        // 核心：计算每个进程的 OomAdj 和进程状态
        computeOomAdjLSP(app, UNKNOWN_ADJ, topApp, true, now, false, false,
                oomAdjReason, false);
        // ...
    }

    // 计算进程间连接关系修正 adj
    mProcessRecordAdjNodes.resetLastNodes();
    mTmpOomAdjusterArgs.update(topApp, now, UNKNOWN_ADJ, oomAdjReason, null, true);
    computeConnectionsLSP();

    // 应用 LRU 调整
    applyLruAdjust(mProcessList.getLruProcessesLOSP());

    // 落地更新结果
    postUpdateOomAdjInnerLSP(oomAdjReason, mActiveUids, now, nowElapsed, oldTime, true);
}
```

#### 4.7.3 computeOomAdjLSP 概要

`computeOomAdjLSP` 方法约 870 行，是 adj 计算的核心。根据进程的不同状态分别更新 adj、procState 和 schedGroup。主要映射关系如下表：

| ADJ | adjType | schedGroup | procState | 说明 |
|-----|---------|------------|-----------|------|
| maxAdj≤0 | pers-top-activity | TOP_APP | PERSISTENT_UI | 持久进程 + 有顶层 Activity |
| maxAdj≤0 | fixed | DEFAULT | PERSISTENT | 持久进程（默认） |
| FOREGROUND_APP_ADJ(0) | top-activity | TOP_APP | TOP | 当前前台 Activity 进程 |
| FOREGROUND_APP_ADJ(0) | exec-service | FOREGROUND | BOUND_TOP | 正在执行 Service 生命周期 |
| FOREGROUND_APP_ADJ(0) | broadcast | FOREGROUND | RECEIVER | 正在接收广播 |
| FOREGROUND_APP_ADJ(0) | exec-service | FOREGROUND | SERVICE | 正在执行 Service 启动 |
| VISIBLE_APP_ADJ(100) | visible | DEFAULT | BOUND_FOREGROUND_SERVICE | 有可见 Activity |
| PERCEPTIBLE_APP_ADJ(200) | pausing / stopping | DEFAULT | IMPORTANT_FOREGROUND | 正在 pause 或 stop |
| PERCEPTIBLE_APP_ADJ(200) | fg-service | DEFAULT | FOREGROUND_SERVICE | 有前台 Service |
| PERCEPTIBLE_LOW_APP_ADJ(250) | imp-fg-service | DEFAULT | BOUND_FOREGROUND_SERVICE | 绑定了前台 Service |
| BACKUP_APP_ADJ(300) | backup | BACKGROUND | BACKUP | 正在备份 |
| HEAVY_WEIGHT_APP_ADJ(400) | heavy | BACKGROUND | HEAVY_WEIGHT | 重量级进程 |
| HOME_APP_ADJ(600) | home | BACKGROUND | HOME | 桌面进程 |
| PREVIOUS_APP_ADJ(700) | previous | BACKGROUND | LAST_ACTIVITY | 上一个前台应用 |
| SERVICE_ADJ(500) | started-services | BACKGROUND | SERVICE | 有已启动的 Service |
| SERVICE_B_ADJ(800) | service-b | BACKGROUND | SERVICE | B 列表 Service |
| CACHED_APP_MIN_ADJ(900)+ | cch-activity | BACKGROUND | CACHED_ACTIVITY | 缓存活动 |
| CACHED_APP_MIN_ADJ(900)+ | cch-empty | BACKGROUND | CACHED_EMPTY | 空缓存 |

#### 4.7.4 updateAndTrimProcessLSP

`postUpdateOomAdjInnerLSP` 会调用 `updateAndTrimProcessLSP`，负责裁剪过量的缓存/空进程：

```java
// OomAdjuster.java - updateAndTrimProcessLSP (AOSP 关键逻辑，已剥离厂商代码)
private void updateAndTrimProcessLSP(final long now, final long nowElapsed,
        final long oldTime, final ActiveUids activeUids, @OomAdjReason int oomAdjReason,
        boolean doingAll) {
    ArrayList<ProcessRecord> lruList = mProcessList.getLruProcessesLOSP();
    final int numLru = lruList.size();

    final boolean doKillExcessiveProcesses = shouldKillExcessiveProcesses(now);
    final int emptyProcessLimit = doKillExcessiveProcesses
            ? mConstants.CUR_MAX_EMPTY_PROCESSES : Integer.MAX_VALUE;
    final int cachedProcessLimit = doKillExcessiveProcesses
            ? (mConstants.CUR_MAX_CACHED_PROCESSES - emptyProcessLimit) : Integer.MAX_VALUE;
    int numCached = 0;
    int numEmpty = 0;
    int numTrimming = 0;

    for (int i = numLru - 1; i >= 0; i--) {
        ProcessRecord app = lruList.get(i);
        final ProcessStateRecord state = app.mState;
        if (!app.isKilledByAm() && app.getThread() != null) {
            // 应用 adj 到内核
            if (state.getCompletedAdjSeq() == mAdjSeq) {
                applyOomAdjLSP(app, doingAll, now, nowElapsed, oomAdjReason, true);
            }
            // ...
            switch (state.getCurProcState()) {
                case PROCESS_STATE_CACHED_ACTIVITY:
                case PROCESS_STATE_CACHED_ACTIVITY_CLIENT:
                    mNumCachedHiddenProcs++;
                    numCached++;
                    // 超过缓存进程上限 → 杀死
                    if ((numCached - numCachedExtraGroup) > cachedProcessLimit) {
                        app.killLocked("cached #" + numCached, "too many cached",
                                ApplicationExitInfo.REASON_OTHER,
                                ApplicationExitInfo.SUBREASON_TOO_MANY_CACHED, true);
                    }
                    break;
                case PROCESS_STATE_CACHED_EMPTY:
                    // 空进程存在过久 → 杀死
                    if (numEmpty > mConstants.CUR_TRIM_EMPTY_PROCESSES
                            && app.getLastActivityTime() < oldTime) {
                        app.killLocked("empty for too long",
                                ApplicationExitInfo.REASON_OTHER,
                                ApplicationExitInfo.SUBREASON_TRIM_EMPTY, true);
                    } else {
                        numEmpty++;
                        // 超过空进程上限 → 杀死
                        if (numEmpty > emptyProcessLimit) {
                            app.killLocked("empty #" + numEmpty, "too many empty",
                                    ApplicationExitInfo.REASON_OTHER,
                                    ApplicationExitInfo.SUBREASON_TOO_MANY_EMPTY, true);
                        }
                    }
                    break;
                default:
                    mNumNonCachedProcs++;
                    break;
            }

            // 隔离进程无 Service → 杀死
            if (app.isolated && psr.numberOfRunningServices() <= 0
                    && app.getIsolatedEntryPoint() == null) {
                app.killLocked("isolated not needed",
                        ApplicationExitInfo.REASON_OTHER,
                        ApplicationExitInfo.SUBREASON_ISOLATED_NOT_NEEDED, true);
            }

            if (state.getCurProcState() >= ActivityManager.PROCESS_STATE_HOME
                    && !app.isKilledByAm()) {
                numTrimming++;
            }
        }
    }
    // 更新低内存状态
    mService.mAppProfiler.updateLowMemStateLSP(numCached, numEmpty, numTrimming, now);
}
```

### 4.8 applyOomAdjLSP

`applyOomAdjLSP` 是将计算出的 adj 值实际应用到进程上的方法，在 `updateAndTrimProcessLSP` 中对每个进程调用。完整调用链：

```
OomAdjuster.updateOomAdjLSP(int) →
  OomAdjusterModernImpl.performUpdateOomAdjLSP(int) →
    OomAdjusterModernImpl.fullUpdateLSP →
      OomAdjuster.postUpdateOomAdjInnerLSP →
        OomAdjuster.updateAndTrimProcessLSP →
          OomAdjuster.applyOomAdjLSP(ProcessRecord, boolean, long, long, int, boolean)
```

核心逻辑分为以下步骤：

**步骤一：同步原始 adj**

```java
// OomAdjuster.java (line 3550)
if (state.getCurRawAdj() != state.getSetRawAdj()) {
    state.setSetRawAdj(state.getCurRawAdj());
}
```

**步骤二：应用 oom_score_adj 到内核**

```java
// OomAdjuster.java
if (state.getCurAdj() != state.getSetAdj()) {
    // 通知缓存优化器 adj 变化
    mCachedAppOptimizer.onOomAdjustChanged(state.getSetAdj(), state.getCurAdj(), app);

    if (isBatchingOomAdj && mConstants.ENABLE_BATCHING_OOM_ADJ) {
        // 批量模式：加入待处理列表，后续统一修改
        mProcsToOomAdj.add(app);
    } else {
        // 非批量模式：直接写入内核 /proc/[pid]/oom_score_adj
        mInjector.setOomAdj(app.getPid(), app.uid, state.getCurAdj());
    }
    state.setSetAdj(state.getCurAdj());
    if (uidRec != null) {
        uidRec.noteProcAdjChanged();
    }
}
```

**步骤三：应用调度组（调整 CPU 优先级）**

```java
// OomAdjuster.java
final int curSchedGroup = state.getCurrentSchedulingGroup();
// 先判断是否需要杀死进程
if (app.getWaitingToKill() != null && app.mReceivers.numberOfCurReceivers() == 0
        && ActivityManager.isProcStateBackground(state.getCurProcState())
        && !state.hasStartedServices()) {
    app.killLocked(app.getWaitingToKill(), ApplicationExitInfo.REASON_USER_REQUESTED,
            ApplicationExitInfo.SUBREASON_REMOVE_TASK, true);
    success = false;
} else if (state.getSetSchedGroup() != curSchedGroup) {
    int oldSchedGroup = state.getSetSchedGroup();
    state.setSetSchedGroup(curSchedGroup);

    // 映射调度组到进程组
    int processGroup;
    switch (curSchedGroup) {
        case SCHED_GROUP_BACKGROUND:
            processGroup = THREAD_GROUP_BACKGROUND; break;
        case SCHED_GROUP_TOP_APP:
        case SCHED_GROUP_TOP_APP_BOUND:
            processGroup = THREAD_GROUP_TOP_APP; break;
        case SCHED_GROUP_RESTRICTED:
            processGroup = THREAD_GROUP_RESTRICTED; break;
        case SCHED_GROUP_FOREGROUND_WINDOW:
            processGroup = THREAD_GROUP_FOREGROUND_WINDOW; break;
        default:
            processGroup = THREAD_GROUP_DEFAULT; break;
    }
    setAppAndChildProcessGroup(app, processGroup);

    // 前台调度组切换时调整线程调度策略
    if (curSchedGroup == SCHED_GROUP_TOP_APP) {
        if (oldSchedGroup != SCHED_GROUP_TOP_APP) {
            app.getWindowProcessController().onTopProcChanged();
            if (app.useFifoUiScheduling()) {
                // 保存当前优先级，切换到 SCHED_FIFO 实时调度
                state.setSavedPriority(Process.getThreadPriority(app.getPid()));
                ActivityManagerService.setFifoPriority(app, true);
            } else {
                // 提升主线程优先级到 -10
                setThreadPriority(app.getPid(), THREAD_PRIORITY_TOP_APP_BOOST);
            }
        }
    } else if (oldSchedGroup == SCHED_GROUP_TOP_APP) {
        if (app.useFifoUiScheduling()) {
            // 从前台切走：恢复原调度策略和优先级
            ActivityManagerService.setFifoPriority(app, false);
        } else {
            // 恢复默认优先级
            setThreadPriority(app.getPid(), 0);
        }
    }
}
```

**步骤四：更新进程冻结状态**

```java
// 方法末尾调用
updateAppFreezeStateLSP(app, oomAdjReason, false);
```

调度组到进程组的映射关系：

| 调度组 | 进程组 |
|--------|--------|
| SCHED_GROUP_BACKGROUND | THREAD_GROUP_BACKGROUND |
| SCHED_GROUP_TOP_APP / TOP_APP_BOUND | THREAD_GROUP_TOP_APP |
| SCHED_GROUP_RESTRICTED | THREAD_GROUP_RESTRICTED |
| SCHED_GROUP_FOREGROUND_WINDOW | THREAD_GROUP_FOREGROUND_WINDOW |
| 其他 | THREAD_GROUP_DEFAULT |

![applyOomAdjLSP 调度流程](/img/android/process_management/05_apply_oomadj_flow.svg)

### 4.8 adj 调整总结

应用状态发生变化后，会导致进程的 `oom_score_adj`、`procState`、`schedGroup` 等进程状态重新计算，并通过 `applyOomAdjLSP` 将对应的优先级、adj、进程状态等值应用到进程上。概括为：

- 通过设置进程组，改变进程所在 cgroup
- 通过设置调度策略，实现主线程在实时优先级和普通优先级间切换
- 通过设置优先级改变进程 nice 值，同时在底层改变进程所在的 cgroup

## 五、进程优先级调度策略

### 5.1 优先级调度

进程按照优先级大小不同可分为实时进程与普通进程。

![进程优先级范围](/img/android/process_management/04_process_priority_range.svg)

- **静态优先级**：不随时间改变，只能通过系统调用改变 nice 值。映射公式：`static_prio = MAX_RT_PRIO + nice + 20`（MAX_RT_PRIO=100），取值区间 [100, 139]，对应普通进程
- **实时优先级**：取值区间 [0, MAX_RT_PRIO-1] 即 [0, 99]，对应实时进程
- **动态优先级**：调度程序通过增减优先级实现奖励 IO 消耗型或惩罚 CPU 消耗型进程的效果

进程优先级以及对应 nice 值：

| 常量 | nice 值 | 说明 |
|------|---------|------|
| THREAD_PRIORITY_LOWEST | 19 | 最低优先级 |
| THREAD_PRIORITY_BACKGROUND | 10 | 后台 |
| THREAD_PRIORITY_LESS_FAVORABLE | 1 | 比默认略低 |
| THREAD_PRIORITY_DEFAULT | 0 | 默认 |
| THREAD_PRIORITY_MORE_FAVORABLE | -1 | 比默认略高 |
| THREAD_PRIORITY_FOREGROUND | -2 | 前台 |
| THREAD_PRIORITY_DISPLAY | -4 | 显示相关 |
| THREAD_PRIORITY_URGENT_DISPLAY | -8 | 显示(更重要)，input 事件 |
| THREAD_PRIORITY_AUDIO | -16 | 音频相关 |
| THREAD_PRIORITY_URGENT_AUDIO | -19 | 音频(更重要) |

### 5.2 组优先级调度

```java
// Process.java
// 设置线程的调度组（实际是设置线程调度策略）
public static final native void setThreadGroup(int tid, int group);
// 设置进程的调度策略（包括该进程的所有线程）
public static final native void setProcessGroup(int pid, int group);
// 设置线程的调度策略和优先级
public static final native void setThreadScheduler(int tid, int policy, int priority);
```

Linux 不区分进程和线程的概念。Android 中的线程对应 Linux 内核的轻量级进程，适用 Linux 进程调度策略。主线程等同于应用进程的优先级。为保证主线程执行顺畅，应控制子线程的优先级。

组优先级取值：

| 常量 | 值 | 说明 |
|------|-----|------|
| THREAD_GROUP_DEFAULT | -1 | 将优先级≤10的进程提升到-2 |
| THREAD_GROUP_BG_NONINTERACTIVE | 0 | CPU 分时时长缩短 |
| THREAD_GROUP_FOREGROUND | 1 | CPU 分时时长正常 |
| THREAD_GROUP_SYSTEM | 2 | 系统线程组 |
| THREAD_GROUP_AUDIO_APP | 3 | 应用程序音频 |
| THREAD_GROUP_AUDIO_SYS | 4 | 系统程序音频 |

### 5.3 调度策略

| 策略 | 说明 |
|------|------|
| SCHED_OTHER | 标准 round-robin 分时共享策略（默认） |
| SCHED_BATCH | 针对批处理风格进程的调度策略 |
| SCHED_IDLE | 针对优先级非常低、适合后台运行的进程 |
| SCHED_FIFO | 实时调度策略，先进先出 |
| SCHED_RR | 实时调度策略，循环调度 |

## 六、LRU 进程管理算法

### 6.1 概述

在 Android 中，应用进程用 `ProcessRecord` 表示，每个 `ProcessRecord` 记录进程的各种信息。AMS 用两个列表保存 `ProcessRecord`：

- `mPidsSelfLocked`：按 PID 索引，方便通过 PID 查找
- `mLruProcesses`：按 LRU（最近最少使用）排序，方便进行优先级管理

### 6.2 attachApplicationLocked

当一个进程启动时，调用到 AMS 的 `attachApplicationLocked`，关键步骤包括：

1. 从 `mPidsSelfLocked` 取出指定 PID 的 `ProcessRecord`
2. 调用 `IApplicationThread.bindApplication` 完成应用绑定
3. 通过 `app.makeActive(thread, mProcessStats)` 将 `IApplicationThread` binder 对象保存到 AMS
4. 调用 `updateLruProcessLocked(app, false, null)` 更新进程的 LRU 位置

### 6.3 mLruProcesses 队列结构

`mLruProcesses` 分为三个区域：

1. **无 Activity 无 Service 区域**（队列头部，最容易被回收）
2. **有 Service 无 Activity 区域**（中间）
3. **有 Activity 区域**（队列尾部，最不容易被回收）

越靠前的进程越容易被回收。`mLruProcessServiceStart` 和 `mLruProcessActivityStart` 两个索引标记区域边界。

### 6.4 updateLruProcessLSP

`updateLruProcessLSP` 负责调整进程在 `mLruProcesses` 队列中的位置，核心逻辑：

**不调整的情况**：
- 进程已被杀且清理已完成
- persistent 进程只需在列表中即可，不关心位置

**调整策略**：
- **有 Activity 的进程**：放到队列末尾（最不容易被回收）
- **有 Service 的进程**：放到 Service 区域的顶部
- **其他进程**：放到非服务区的顶部
- 如果同一应用有多个进程，则将它们放在一起

调整后还会递归处理进程依赖的 ContentProvider 和 Service 连接的进程，提升它们的位置以防被误杀。

```java
// ProcessList.java - updateLruProcessLSP
@GuardedBy({"mService", "mProcLock"})
private void updateLruProcessLSP(ProcessRecord app, ProcessRecord client,
        boolean hasActivity, boolean hasService) {
    mLruSeq++;
    final long now = SystemClock.uptimeMillis();
    app.setLastActivityTime(now);

    // 快速返回：如果应用已经在对应区域的末尾
    if (hasActivity) {
        final int N = mLruProcesses.size();
        if (N > 0 && mLruProcesses.get(N - 1) == app) {
            return;
        }
    } else {
        if (mLruProcessServiceStart > 0
                && mLruProcesses.get(mLruProcessServiceStart - 1) == app) {
            return;
        }
    }

    // persistent 进程只要在列表中即可
    int lrui = mLruProcesses.lastIndexOf(app);
    if (app.isPersistent() && lrui >= 0) {
        return;
    }

    // 从原位置移除
    if (lrui >= 0) {
        if (lrui < mLruProcessActivityStart) mLruProcessActivityStart--;
        if (lrui < mLruProcessServiceStart) mLruProcessServiceStart--;
        mLruProcesses.remove(lrui);
    }

    // 根据进程类型添加到新位置
    if (hasActivity) {
        // 有 Activity → 放到队列末尾
        mLruProcesses.add(app);
        // ...
    } else if (hasService) {
        // 有 Service → 放到 Service 区域顶部
        mLruProcesses.add(mLruProcessActivityStart, app);
        mLruProcessActivityStart++;
    } else {
        // 其他 → 放到非服务区顶部
        mLruProcesses.add(mLruProcessServiceStart, app);
        mLruProcessActivityStart++;
        mLruProcessServiceStart++;
    }
    // ...
}
```

> **核心总结**：有 Activity 的进程往后移（不容易被回收），没有 Activity 的进程往前移（容易被回收）。

## 七、Android 进程冻结机制

### 7.1 概述

Android 11 及更高版本支持 CACHED 应用的 CPU 冻结功能。当应用切换到后台且没有其他活动时，系统在一定时间后将进程 ID 迁移到冻结的 cgroup 节点上，实现冻结。这减少了缓存应用在后台消耗的 CPU 资源，达到节电目的。当应用再次切换到前台时，系统解冻进程以实现快速恢复。

冻结相关命令：

```bash
# 获取冻结开关
adb shell settings get global cached_apps_freezer
# 设置冻结开关 (enabled/disabled/default)
adb shell settings put global cached_apps_freezer enabled
# 开发者模式下开启
adb shell device_config put activity_manager_native_boot use_freezer true && adb reboot
```

### 7.2 冻结进程的作用

- **执行暂停**：冻结进程的所有线程被暂停
- **资源释放**：CPU 和内存资源被释放，重新分配给其他进程
- **节省电池**：后台不运行，降低电池消耗
- **系统稳定**：避免低优先级进程竞争系统资源
- **快速恢复**：冻结进程可迅速恢复到之前的运行状态

冻结不会终止进程或销毁应用，只是暂时挂起以优化资源使用。

### 7.3 挂起进程的方式

**通过信号暂停进程**：发送 `SIGSTOP` 信号将进程状态切换为暂停，收到 `SIGCONT` 信号恢复执行。但 `SIGCONT` 信号可被进程捕获监听，导致暂停和恢复变得不可控。

**通过 cgroup freezer 子系统**：为防止进程捕获信号干扰冻结行为，通过 cgroup 的 freezer 子系统在进程无感知情况下冻结。freezer 将进程状态设置为 `FROZEN`，不再被调度、不消耗 CPU 资源，直到状态设为 `THAWED`。

### 7.4 检查应用是否被冻结

```bash
# 检查 freezer cgroup 中的进程
adb shell cat /dev/freezer/frozen/cgroup.procs | grep -E "[0-9]{4}" | xargs adb shell ps -A | grep "com"
# 检查 uid 级别的冻结状态
adb shell cat /sys/fs/cgroup/uid_{应用UID}/cgroup.freeze
# 查看冻结相关日志
adb logcat | grep -i "\(freezing\|froze\)"
```

### 7.5 进程状态

标准的 Linux 进程状态：

| 状态 | 字母 | 说明 |
|------|------|------|
| Running | R | 运行中 |
| Sleeping | S | 可中断睡眠 |
| Device I/O | D | 不可中断睡眠（设备IO） |
| Stopped | T | 已停止 |
| Trace stop | t | 跟踪停止 |
| Dead | X | 已死亡 |
| Zombie | Z | 僵尸 |
| Parked | P | 停放 |
| Idle | I | 空闲 |

在高版本中，被冻结的进程保持 S 态，但在内核函数 `do_freezer_trap` 上等待，不消耗 CPU 资源。

### 7.6 冻结流程

冻结的触发由 oom adj 值的变化驱动。例如当 Activity destroy 时：

```
ActivityRecord.setState(DESTROYING)
  → WindowProcessController.updateProcessInfo(updateOomAdj=true)
    → ProcessRecord.updateProcessInfo(updateOomAdj=true)
      → AMS.updateOomAdjLocked(app, OOM_ADJ_REASON_ACTIVITY)
        → OomAdjuster.updateOomAdjLSP → ... → applyOomAdjLSP
          → updateAppFreezeStateLSP(app)
```

**中间代码详解**：

`ActivityRecord.setState` 在状态切换为 `DESTROYING` 时触发 adj 更新：

```java
// ActivityRecord.java
void setState(State state, String reason) {
    // ...
    switch (state) {
        // ...
        case DESTROYING:
            if (app != null && !app.hasActivities()) {
                // 无更多 Activity → 更新 LRU 和 oom adj
                app.updateProcessInfo(true /* updateServiceConnectionActivities */,
                        false /* activityChange */, true /* updateOomAdj */,
                        false /* addPendingTopUid */);
            }
            break;
        // ...
    }
    // ...
}
```

`WindowProcessController.updateProcessInfo` 将消息发送到 AMS 线程执行：

```java
// WindowProcessController.java
void updateProcessInfo(boolean updateServiceConnectionActivities, boolean activityChange,
        boolean updateOomAdj, boolean addPendingTopUid) {
    if (addPendingTopUid) {
        addToPendingTop();
    }
    if (updateOomAdj) {
        prepareOomAdjustment();
    }
    // 通过 Handler 异步调用 ProcessRecord.updateProcessInfo
    final Message m = PooledLambda.obtainMessage(WindowProcessListener::updateProcessInfo,
            mListener, updateServiceConnectionActivities, activityChange, updateOomAdj);
    mAtm.mH.sendMessage(m);
}
```

`ProcessRecord` 实现了 `WindowProcessListener` 接口，收到消息后执行 adj 更新：

```java
// ProcessRecord.java
class ProcessRecord implements WindowProcessListener {
    @Override
    public void updateProcessInfo(boolean updateServiceConnectionActivities,
            boolean activityChange, boolean updateOomAdj) {
        // ...
        mService.updateLruProcessLocked(this, activityChange, null);
        if (updateOomAdj) {
            mService.updateOomAdjLocked(this, OomAdjuster.OOM_ADJ_REASON_ACTIVITY);
        }
        // ...
    }
}
```

`updateAppFreezeStateLSP` 的核心判断逻辑：

```java
// OomAdjuster.java (line 4168)
void updateAppFreezeStateLSP(ProcessRecord app, @OomAdjReason int oomAdjReason,
        boolean immediate) {
    if (!mCachedAppOptimizer.useFreezer()) {
        return;
    }
    // ...
    if (state.getCurAdj() >= FREEZER_CUTOFF_ADJ && !opt.isFrozen()
            && !opt.shouldNotFreeze()) {
        // adj >= FREEZER_CUTOFF_ADJ (= CACHED_APP_MIN_ADJ = 900) → 异步冻结
        mCachedAppOptimizer.freezeAppAsyncLSP(app);
    } else if (state.getSetAdj() < FREEZER_CUTOFF_ADJ) {
        // adj < 900（非缓存进程） → 解冻
        mCachedAppOptimizer.unfreezeAppLSP(app,
                CachedAppOptimizer.getUnfreezeReasonCodeFromOomAdjReason(oomAdjReason));
    }
}
```

`freezeAppAsyncLSP` 设置一个延时消息（默认 10 分钟），到时后执行实际冻结：

1. 先冻结 Binder 接口（`freezeBinder`），刷新排队中的 Binder 事务
2. 如果有未完成的 Binder 事务，延迟重试
3. 冻结 Binder 接口异常则查杀应用
4. Binder 冻结成功后，调用 `setProcessFrozen(pid, uid, true)` 冻结进程

### 7.7 解冻流程

当 Activity start 时，同样通过 `updateOomAdjLocked` 触发 adj 重算，如果 adj < `CACHED_APP_MIN_ADJ`，则调用 `unfreezeAppLSP` 解冻：

```java
// CachedAppOptimizer.java (line 1701)
void unfreezeAppInternalLSP(ProcessRecord app, @UnfreezeReason int reason, boolean force) {
    final int pid = app.getPid();
    final ProcessCachedOptimizerRecord opt = app.mOptRecord;
    // sticky 冻结状态下，非 force 不解冻
    if (opt.isFreezeSticky() && !force) {
        return;
    }
    if (opt.isPendingFreeze()) {
        // 还在等待期内（未实际冻结） → 移除定时器
        mFreezeHandler.removeMessages(SET_FROZEN_PROCESS_MSG, app);
        opt.setPendingFreeze(false);
        // ...
    }
    // ...
    if (pid == 0 || !opt.isFrozen()) {
        return;
    }
    // 先解冻 Binder 接口
    freezeBinder(pid, false, FREEZE_BINDER_TIMEOUT_MS);
    // 解冻进程
    Process.setProcessFrozen(pid, app.uid, false);
    // ...
}
```

![冻结与解冻流程](/img/android/process_management/06_freeze_unfreeze_flow.svg)

### 7.8 BINDER_FREEZE API

Android 13 引入了 `BINDER_FREEZE` API。在冻结进程前先冻结 Binder 接口，调用被冻结进程的 Binder 时直接返回错误（而非阻塞），避免了 ANR 问题。

```java
// CachedAppOptimizer.FreezeHandler#freezeProcess
if (mFreezer.freezeBinder(pid, true, FREEZE_BINDER_TIMEOUT_MS) != 0) {
    handleBinderFreezerFailure(proc, "outstanding txns");
    return;
}
// Binder 冻结成功后，冻结进程
mFreezer.setProcessFrozen(pid, proc.uid, true);
opt.setFrozen(true);
```

### 7.9 冻结跨进程行为问题

冻结进程如果发生在跨进程交互行为上，可能导致通信阻塞从而引发 ANR。常见场景：

**ContentProvider 交互异常**：进程 A 同步调用进程 B 的 ContentProvider 接口，如果进程 B 被冻结，进程 A 会被挂起等待。在 Android 13 之前（无 BINDER_FREEZE API），这会导致调用方 ANR。典型 ANR trace 如下：

```
"main" prio=5 tid=1 Native
  | state=S schedstat=( ... ) utm=208 stm=44 core=6 HZ=100
  native: #00 pc ...  /apex/com.android.runtime/lib64/bionic/libc.so (__ioctl+4)
  native: #01 pc ...  /apex/com.android.runtime/lib64/bionic/libc.so (ioctl+160)
  native: #02 pc ...  /system/lib64/libbinder.so (android::IPCThreadState::talkWithDriver+296)
  native: #03 pc ...  /system/lib64/libbinder.so (android::IPCThreadState::waitForResponse+128)
  native: #04 pc ...  /system/lib64/libbinder.so (android::IPCThreadState::transact+184)
  native: #05 pc ...  /system/lib64/libbinder.so (android::BpBinder::transact+152)
  at android.os.BinderProxy.transactNative(Native method)
  at android.os.BinderProxy.transact(BinderProxy.java:540)
  at android.content.ContentProviderProxy.query(ContentProviderNative.java:470)
  at android.content.ContentResolver.query(ContentResolver.java:1183)
  // ...
```

主线程阻塞在 `BinderProxy.transactNative` → `IPCThreadState::waitForResponse`，等待被冻结进程的 ContentProvider 响应。

**Service 绑定异常**：Service 绑定过程中如果目标进程被冻结，`onServiceConnected` 中的 Binder 调用同样会阻塞在 `IPCThreadState::waitForResponse`。

Android 13+ 的 `BINDER_FREEZE` 机制解决了这一问题：调用被冻结进程的 Binder 后直接返回错误，不会阻塞调用方。

### 7.10 解冻场景

系统在以下场景会解冻进程：

#### 7.10.1 低内存时内存整理

`AppProfiler.trimMemoryUiHiddenIfNecessaryLSP` 中判断应用是否需要内存整理：

```java
// AppProfiler.java
@GuardedBy({"mService", "mProcLock"})
private void trimMemoryUiHiddenIfNecessaryLSP(ProcessRecord app) {
    if ((app.mState.getCurProcState() >= ActivityManager.PROCESS_STATE_IMPORTANT_BACKGROUND
            || app.mState.isSystemNoUi()) && app.mProfile.hasPendingUiClean()) {
        scheduleTrimMemoryLSP(app, ComponentCallbacks2.TRIM_MEMORY_UI_HIDDEN,
                "Trimming memory of bg-ui ");
        app.mProfile.setPendingUiClean(false);
    }
}
```

`scheduleTrimMemoryLSP` 先临时解冻进程，然后通知应用整理内存：

```java
// AppProfiler.java
private void scheduleTrimMemoryLSP(ProcessRecord app, int level, String msg) {
    IApplicationThread thread;
    if (app.mProfile.getTrimMemoryLevel() < level && (thread = app.getThread()) != null) {
        // 临时解冻进程（解冻后延迟 10 分钟重新冻结）
        mService.mOomAdjuster.mCachedAppOptimizer.unfreezeTemporarily(app,
                CachedAppOptimizer.UNFREEZE_REASON_TRIM_MEMORY);
        thread.scheduleTrimMemory(level);
    }
}
```

`unfreezeTemporarily` 的工作原理：先解冻，然后安排延迟重新冻结：

```java
// CachedAppOptimizer.java
@GuardedBy("mAm")
void unfreezeTemporarily(ProcessRecord app, @UnfreezeReason int reason, long delayMillis) {
    if (mUseFreezer) {
        synchronized (mProcLock) {
            final long delay = updateEarliestFreezableTime(app, delayMillis);
            if (app.mOptRecord.isFrozen() || app.mOptRecord.isPendingFreeze()) {
                unfreezeAppLSP(app, reason);
                freezeAppAsyncLSP(app, delay); // 延迟后重新冻结
            }
        }
    }
}
```

#### 7.10.2 dump 进程信息时

dump 时通过 `enableFreezer(false)` 关闭整个 freezer：

```java
// CachedAppOptimizer.java (line 1196)
public synchronized boolean enableFreezer(boolean enable) {
    if (!mUseFreezer) {
        return false;
    }

    if (enable) {
        mFreezerDisableCount--;
        if (mFreezerDisableCount > 0) return true;
        else if (mFreezerDisableCount < 0) {
            Slog.e(TAG_AM, "unbalanced call to enableFreezer, ignoring");
            mFreezerDisableCount = 0;
            return false;
        }
    } else {
        mFreezerDisableCount++;
        if (mFreezerDisableCount > 1) return true;
    }

    synchronized (mAm) {
        synchronized (mProcLock) {
            mFreezerOverride = !enable;
            mAm.mProcessList.forEachLruProcessesLOSP(true, process -> {
                if (process == null) return;
                final ProcessCachedOptimizerRecord opt = process.mOptRecord;
                if (enable && opt.hasFreezerOverride()) {
                    // 重新启用 → 恢复冻结
                    freezeAppAsyncLSP(process);
                    opt.setFreezerOverride(false);
                }
                if (!enable && opt.isFrozen()) {
                    // 禁用 → 解冻所有已冻结进程
                    unfreezeAppLSP(process, UNFREEZE_REASON_FEATURE_FLAGS);
                    opt.setFreezerOverride(true);
                }
            });
        }
    }
    return true;
}
```

#### 7.10.3 接收广播临时解冻

```java
// BroadcastQueueImpl.java - dispatchReceivers
if (r.options != null && r.options.getTemporaryAppAllowlistDuration() > 0) {
    if (r.options.getTemporaryAppAllowlistType()
            == PowerExemptionManager.TEMPORARY_ALLOW_LIST_TYPE_APP_FREEZING_DELAYED) {
        // 仅延迟 freezer，不加入临时允许列表
        mService.mOomAdjuster.mCachedAppOptimizer.unfreezeTemporarily(app,
                CachedAppOptimizer.UNFREEZE_REASON_START_RECEIVER,
                r.options.getTemporaryAppAllowlistDuration());
    } else {
        mService.tempAllowlistUidLocked(queue.uid,
                r.options.getTemporaryAppAllowlistDuration(), /* ... */);
    }
}
```

#### 7.10.4 发送广播结果临时解冻

```java
// BroadcastQueueImpl.java - scheduleResultTo
private void scheduleResultTo(@NonNull BroadcastRecord r) {
    if (r.resultTo == null) return;
    final ProcessRecord app = r.resultToApp;
    final IApplicationThread thread = (app != null) ? app.getOnewayThread() : null;
    if (thread != null) {
        mService.mOomAdjuster.unfreezeTemporarily(
                app, CachedAppOptimizer.UNFREEZE_REASON_FINISH_RECEIVER);
        // ...
        thread.scheduleRegisteredReceiver(r.resultTo, r.intent, /* ... */);
    }
}
```

#### 7.10.5 持有文件锁解冻

如果被冻结进程持有文件锁，阻塞了非缓存进程，系统会解冻以释放锁：

```java
// CachedAppOptimizer.java
public void onBlockingFileLock(IntArray pids) {
    synchronized (mAm) {
        synchronized (mProcLock) {
            int pid = pids.get(0);
            ProcessRecord app = mFrozenProcesses.get(pid);
            if (app != null) {
                for (int i = 1; i < pids.size(); i++) {
                    int blocked = pids.get(i);
                    ProcessRecord pr;
                    synchronized (mAm.mPidsSelfLocked) {
                        pr = mAm.mPidsSelfLocked.get(blocked);
                    }
                    if (pr != null && pr.mState.getCurAdj()
                            < mAm.mConstants.FREEZER_CUTOFF_ADJ) {
                        Slog.d(TAG_AM, app.processName + " (" + pid + ") blocks "
                                + pr.processName + " (" + blocked + ")");
                        // 发现阻塞了非缓存进程 → 解冻
                        unfreezeAppLSP(app, UNFREEZE_REASON_FILE_LOCKS);
                        break;
                    }
                }
            }
        }
    }
}
```

## 八、调试命令

### 8.1 查看 adj 更新日志

```bash
# 开启 adj 调试日志
adb shell am logging enable-text DEBUG_OOM_ADJ DEBUG_OOM_ADJ_REASON DEBUG_PROCESSES
# 过滤日志
adb logcat -b all | grep -i "activitymanager:.*(进程名)"
```

### 8.2 查看进程 adj 信息

```bash
# 简略信息
adb shell dumpsys activity -p (包名) oom | grep -i "proc #.*(进程名)/" -A 3
# 完整信息
adb shell dumpsys activity -p (包名) processes
```

输出示例：

```
Proc # 7: prev  + 2 b/ /CAC  ------- t: 0 27447:com.example.app/u0a234 (previous-improve)
    oom: max=1001 curRaw=702 setRaw=702 cur=702 set=702
    state: cur=CAC  set=CAC  lastPss=372MB lastSwapPss=168MB lastCachedPss=372MB
    cached=false empty=false hasAboveClient=false
```

根据 adjType 可定位到 `OomAdjuster` 中设置此类型的代码，从而找出 adj 计算的原因。

### 8.3 进程压缩日志

```bash
adb logcat -b all | grep -i "Compacted proc"
```

### 8.4 进程查杀分析

**进程启动相关 event log**：

```bash
# 查看进程启动
adb logcat -b events | grep "am_proc_start"
# 查看进程重启拦截
adb logcat -b events | grep "am_proc_died"
```

**被 LMKD 杀掉**：

```bash
adb logcat -b all | grep "lowmemorykiller"
adb logcat -b all | grep "killinfo"
```

**进程退出信息**：

通过 `dumpsys activity processes` 可查看 `ApplicationExitInfo`，包含退出原因（`reason`）、子原因（`subreason`）等详细信息。
