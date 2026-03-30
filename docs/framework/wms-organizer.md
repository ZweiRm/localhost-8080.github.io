---
prev:
    text: 'SurfaceControl & Transaction 流程'
    link: '/framework/surfacecontrol-transaction'
next:
    text: '属性动画'
    link: '/framework/android-property-animation'
---

# WMS Organizer 机制

## 概述

Organizer 是 Android WMS 提供的一套**委托管理窗口容器**的框架。系统将窗口层级树（WindowContainer Hierarchy）中特定层级的节点——Task、TaskFragment、DisplayArea——的管理权交给外部进程（通常是 SystemUI 的 Shell 模块），由它们通过 `WindowContainerTransaction` 统一下发变更指令。

这套机制从 Android 12 引入，核心设计目标是将**窗口布局策略**（分屏、画中画、自由窗口等）从 system_server 移至 Shell 进程，使布局策略可以独立迭代。

### 核心类关系

![Organizer 架构总览](/img/android/organizer/01_architecture.svg)

整个体系分三层：

| 层级 | 客户端 (Shell 进程) | 服务端 (system_server) |
|------|---------------------|----------------------|
| 总调度 | `WindowOrganizer` | `WindowOrganizerController` |
| Task 管理 | `TaskOrganizer` | `TaskOrganizerController` |
| TaskFragment 管理 | `TaskFragmentOrganizer` | `TaskFragmentOrganizerController` |
| DisplayArea 管理 | `DisplayAreaOrganizer` | `DisplayAreaOrganizerController` |

`WindowOrganizerController` 是中枢，它持有三个子 Controller 的引用，并负责处理 `WindowContainerTransaction`：

```java
// WindowOrganizerController.java line 228
WindowOrganizerController(ActivityTaskManagerService atm) {
    mService = atm;
    mGlobalLock = atm.mGlobalLock;
    mTaskOrganizerController = new TaskOrganizerController(mService);
    mDisplayAreaOrganizerController = new DisplayAreaOrganizerController(mService);
    mTaskFragmentOrganizerController = new TaskFragmentOrganizerController(atm, this);
    mTransitionController = new TransitionController(atm);
}
```

三个子 Controller 各自通过 AIDL 接口暴露给客户端：

```java
// IWindowOrganizerController.aidl line 90
ITaskOrganizerController getTaskOrganizerController();
IDisplayAreaOrganizerController getDisplayAreaOrganizerController();
ITaskFragmentOrganizerController getTaskFragmentOrganizerController();
```


## WindowOrganizer 基类

`WindowOrganizer` 是所有 Organizer 的客户端基类，定义了 Transaction 的提交入口：

```java
// WindowOrganizer.java line 40
public class WindowOrganizer {
    // ...
}
```

### 核心方法

| 方法 | 行号 | 说明 |
|------|------|------|
| `applyTransaction(WCT)` | 51 | 异步提交 Transaction，不等待完成 |
| `applySyncTransaction(WCT, callback)` | 75 | 同步提交，所有参与者绘制完成后通过 callback 返回合并后的 SurfaceControl.Transaction |
| `startNewTransition(type, WCT)` | 94 | 创建新的 Shell Transition 并绑定 WCT |
| `finishTransition(token, WCT)` | 181 | 结束一个 Transition |

三个子类 `TaskOrganizer`、`TaskFragmentOrganizer`、`DisplayAreaOrganizer` 均继承自 `WindowOrganizer`。


## TaskOrganizer

`TaskOrganizer` 用于管理 Task（根任务栈及 Organizer 创建的子任务栈）。Shell 的分屏、自由窗口、画中画等功能都依赖它。

### 客户端 API

```java
// TaskOrganizer.java line 47
public class TaskOrganizer extends WindowOrganizer {
    // ...
}
```

**注册/注销**

| 方法 | 行号 | 说明 |
|------|------|------|
| `registerOrganizer()` | 75 | 注册为 TaskOrganizer，返回当前所有已存在的可管理 Task 列表 |
| `unregisterOrganizer()` | 86 | 注销，所有由该 Organizer 创建的 Task 被删除，其他 Task 迁移到下一个优先级的 Organizer |

**Task 操作**

| 方法 | 行号 | 说明 |
|------|------|------|
| `createRootTask(displayId, windowingMode, cookie, removeWithOrg)` | 161 | 创建根任务栈 |
| `deleteRootTask(token)` | 186 | 删除由 Organizer 创建的根任务栈 |
| `getChildTasks(parent, activityTypes)` | — | 获取指定 Task 的子 Task |
| `getRootTasks(displayId, activityTypes)` | — | 获取 Display 上的根 Task |
| `setInterceptBackPressedOnTaskRoot(task, intercept)` | — | 启用/关闭根 Activity 返回键回调 |

**回调方法（子类重写）**

| 回调 | 说明 |
|------|------|
| `onTaskAppeared(RunningTaskInfo, SurfaceControl)` | Task 开始被管理，附带 SurfaceControl leash |
| `onTaskVanished(RunningTaskInfo)` | Task 不再被管理 |
| `onTaskInfoChanged(RunningTaskInfo)` | Task 属性变化（bounds、windowing mode 等） |
| `onBackPressedOnTaskRoot(RunningTaskInfo)` | 根 Activity 上按了返回键 |

这些回调在客户端通过 `ITaskOrganizer.Stub` 实现，并通过 Executor 分发：

```java
// TaskOrganizer.java line 282
private final ITaskOrganizer mInterface = new ITaskOrganizer.Stub() {
    @Override
    public void onTaskAppeared(RunningTaskInfo taskInfo, SurfaceControl leash) {
        mExecutor.execute(() -> TaskOrganizer.this.onTaskAppeared(taskInfo, leash));
    }
    // ... 其他回调同理
};
```

### 服务端 Controller

```java
// TaskOrganizerController.java line 77
class TaskOrganizerController extends ITaskOrganizerController.Stub {
    // ...
}
```

#### 核心数据结构

```java
// TaskOrganizerController.java line 481
private final ArrayDeque<ITaskOrganizer> mTaskOrganizers = new ArrayDeque<>();
private final ArrayMap<IBinder, TaskOrganizerState> mTaskOrganizerStates = new ArrayMap<>();
private final HashSet<Integer> mInterceptBackPressedOnRootTasks = new HashSet<>();
```

- `mTaskOrganizers`：按注册顺序存储的双端队列，**最后注册的优先级最高**（`peekLast()` 获取当前活跃 Organizer）
- `mTaskOrganizerStates`：每个 Organizer 的状态包装，含 DeathRecipient、PendingEventsQueue、已管理的 Task 列表

#### 注册流程

![TaskOrganizer 注册流程](/img/android/organizer/02_register_flow.svg)

```java
// TaskOrganizerController.java line 504
@Override
public ParceledListSlice<TaskAppearedInfo> registerTaskOrganizer(ITaskOrganizer organizer) {
    enforceTaskPermission("registerTaskOrganizer()");
    // ...
    if (!mTaskOrganizerStates.containsKey(organizer.asBinder())) {
        mTaskOrganizers.add(organizer);
        mTaskOrganizerStates.put(organizer.asBinder(),
                new TaskOrganizerState(organizer, uid));
    }
    final TaskOrganizerState state = mTaskOrganizerStates.get(organizer.asBinder());
    mService.mRootWindowContainer.forAllTasks((task) -> {
        boolean returnTask = !task.mCreatedByOrganizer;
        task.updateTaskOrganizerState(returnTask /* skipTaskAppeared */);
        if (task.isOrganized() && returnTask) {
            SurfaceControl taskLeash = state.addTaskWithoutCallback(task,
                    "TaskOrganizerController.registerTaskOrganizer");
            taskInfos.add(new TaskAppearedInfo(task.getTaskInfo(), taskLeash));
        }
    });
    return new ParceledListSlice<>(taskInfos);
}
```

注册时已存在的 Task **不会触发 `onTaskAppeared` 回调**，而是通过返回值 `ParceledListSlice<TaskAppearedInfo>` 一次性传递给客户端。后续新出现的 Task 才通过回调通知。

#### Task 与 Organizer 的关联规则

Task 是否可以被 Organizer 管理由 `canBeOrganized()` 决定：

```java
// Task.java line 5414
private boolean canBeOrganized() {
    if (isRootTask() || mCreatedByOrganizer) {
        return true;
    }
    final Task parentTask = getParent().asTask();
    return parentTask != null && parentTask.mCreatedByOrganizer;
}
```

满足以下任一条件的 Task 可被 Organizer 管理：
1. 根任务栈 (`isRootTask()`)
2. 由 Organizer 创建的 Task (`mCreatedByOrganizer`)
3. 父 Task 是由 Organizer 创建的

当 Task 状态变化时，`updateTaskOrganizerState()` 重新评估归属：

```java
// Task.java line 5568
boolean updateTaskOrganizerState(boolean skipTaskAppeared) {
    if (getSurfaceControl() == null) {
        return false;
    }
    if (!canBeOrganized()) {
        return setTaskOrganizer(null);
    }
    final TaskOrganizerController controller = mWmService.mAtmService.mTaskOrganizerController;
    final ITaskOrganizer organizer = controller.getTaskOrganizer();
    // 由 Organizer 创建的 Task 不允许迁移到其他 Organizer
    if (mCreatedByOrganizer && mTaskOrganizer != null && organizer != null
            && mTaskOrganizer != organizer) {
        return false;
    }
    return setTaskOrganizer(organizer, skipTaskAppeared);
}
```

其中 `getTaskOrganizer()` 返回的是 `mTaskOrganizers.peekLast()`，即优先级最高的 Organizer。

#### TaskOrganizerState

每个注册的 Organizer 对应一个 `TaskOrganizerState`，封装了：

```java
// TaskOrganizerController.java line 333
class TaskOrganizerState {
    private final TaskOrganizerCallbacks mOrganizer;
    private final DeathRecipient mDeathRecipient;
    private final ArrayList<Task> mOrganizedTasks = new ArrayList<>();
    private final TaskOrganizerPendingEventsQueue mPendingEventsQueue;
    private final int mUid;
    // ...
}
```

- **DeathRecipient**：监听 Organizer 进程死亡，自动清理
- **mOrganizedTasks**：该 Organizer 管理的 Task 列表
- **PendingEventsQueue**：延迟批量分发回调事件

**Organizer 注销/死亡时的清理逻辑** (`dispose()`):

```java
// TaskOrganizerController.java line 406
void dispose() {
    mTaskOrganizers.remove(mOrganizer.mTaskOrganizer);
    while (!mOrganizedTasks.isEmpty()) {
        final Task t = mOrganizedTasks.get(0);
        if (t.mCreatedByOrganizer) {
            t.removeImmediately();  // Organizer 创建的 Task 直接删除
        } else {
            t.updateTaskOrganizerState();  // 尝试迁移到下一个 Organizer
        }
        // ...
    }
    mPendingEventsQueue.clearPendingTaskEvents();
    mTaskOrganizerStates.remove(mOrganizer.getBinder());
}
```

#### 回调分发机制

![回调分发流程](/img/android/organizer/03_callback_dispatch.svg)

TaskOrganizer 的回调采用 **Pending Events 延迟批量分发** 机制：

1. **事件产生**：Task 状态变化时调用 `onTaskAppeared()` / `onTaskVanished()` / `onTaskInfoChanged()` 将事件加入 PendingEventsQueue
2. **去重优化**：如果 `APPEARED` 事件尚未分发就收到 `VANISHED`，则取消 `APPEARED`，不发送 `VANISHED`
3. **批量分发**：`dispatchPendingEvents()` 在 Layout 完成后统一触发，遍历所有 Organizer 的 pending queue 逐个回调

```java
// TaskOrganizerController.java line 1010
void dispatchPendingEvents() {
    if (mService.mWindowManager.mWindowPlacerLocked.isLayoutDeferred()) {
        return;
    }
    for (int taskOrgIdx = 0; taskOrgIdx < mTaskOrganizerStates.size(); taskOrgIdx++) {
        TaskOrganizerState state = mTaskOrganizerStates.valueAt(taskOrgIdx);
        state.mPendingEventsQueue.dispatchPendingEvents();
    }
}
```

#### createRootTask 流程

```java
// TaskOrganizerController.java line 895
Task createRootTask(DisplayContent display, int windowingMode, @Nullable IBinder launchCookie,
        boolean removeWithTaskOrganizer) {
    final Task task = new Task.Builder(mService)
            .setWindowingMode(windowingMode)
            .setIntent(new Intent())
            .setCreatedByOrganizer(true)
            .setDeferTaskAppear(true)
            .setLaunchCookie(launchCookie)
            .setParent(display.getDefaultTaskDisplayArea())
            .setRemoveWithTaskOrganizer(removeWithTaskOrganizer)
            .build();
    task.setDeferTaskAppear(false);
    return task;
}
```

创建时 `setDeferTaskAppear(true)` 延迟 `onTaskAppeared` 回调，直到 Task 完全构建并附加到层级树后才释放，确保回调携带完整的配置信息。


## TaskFragmentOrganizer

`TaskFragmentOrganizer` 用于管理嵌入式 Activity（Embedded Activities）。与 TaskOrganizer 不同，它针对 Task 内部的 `TaskFragment` 节点，主要服务于 Jetpack WindowManager 库的 Activity Embedding 功能。

### 客户端 API

```java
// TaskFragmentOrganizer.java line 49
public class TaskFragmentOrganizer extends WindowOrganizer {
    // ...
}
```

**注册/注销**

| 方法 | 行号 | 说明 |
|------|------|------|
| `registerOrganizer()` | 165 | 注册为非系统 Organizer |
| `registerOrganizer(boolean isSystemOrganizer)` | 187 | 注册，可选系统 Organizer（需额外权限） |
| `unregisterOrganizer()` | 199 | 注销 |

**Transaction 操作**

| 方法 | 行号 | 说明 |
|------|------|------|
| `applyTransaction(WCT, transitionType, shouldApplyIndependently)` | 286 | 提交 WCT，指定 Transition 类型 |
| `onTransactionHandled(token, WCT, transitionType, shouldApplyIndependently)` | 252 | 通知服务端已处理完 Transaction（恢复 Transition） |

**核心回调**

| 回调 | 说明 |
|------|------|
| `onTransactionReady(TaskFragmentTransaction)` | 服务端将多个事件打包为一个 Transaction 下发 |

### 与 TaskOrganizer 的关键差异

TaskFragmentOrganizer 的回调机制与 TaskOrganizer 有本质不同：

- **TaskOrganizer**：每个事件独立回调（`onTaskAppeared` / `onTaskVanished` / `onTaskInfoChanged`）
- **TaskFragmentOrganizer**：多个事件打包为一个 `TaskFragmentTransaction` 批量下发，客户端通过 `onTransactionReady(TaskFragmentTransaction)` 接收

`TaskFragmentTransaction` 包含多个 `Change`，类型包括：

| Change Type | 值 | 说明 |
|---|---|---|
| `TYPE_TASK_FRAGMENT_APPEARED` | 1 | TaskFragment 出现 |
| `TYPE_TASK_FRAGMENT_INFO_CHANGED` | 2 | TaskFragment 属性变化 |
| `TYPE_TASK_FRAGMENT_VANISHED` | 3 | TaskFragment 消失 |
| `TYPE_TASK_FRAGMENT_PARENT_INFO_CHANGED` | 4 | 父 Task 属性变化 |
| `TYPE_TASK_FRAGMENT_ERROR` | 5 | 操作出错 |
| `TYPE_ACTIVITY_REPARENTED_TO_TASK` | 6 | Activity 被 reparent 到 Task |

### 服务端 Controller

```java
// TaskFragmentOrganizerController.java line 81
public class TaskFragmentOrganizerController extends ITaskFragmentOrganizerController.Stub {
    // ...
}
```

#### 核心数据结构

```java
// TaskFragmentOrganizerController.java line 93
private final ArrayMap<IBinder, TaskFragmentOrganizerState> mTaskFragmentOrganizerState =
        new ArrayMap<>();
private final ArrayMap<IBinder, List<PendingTaskFragmentEvent>> mPendingTaskFragmentEvents =
        new ArrayMap<>();
```

#### 注册流程

```java
// TaskFragmentOrganizerController.java line 580
private void registerOrganizerInternal(
        @NonNull ITaskFragmentOrganizer organizer, boolean isSystemOrganizer) {
    if (isSystemOrganizer) {
        enforceTaskPermission("registerSystemOrganizer()");
    }
    final int pid = Binder.getCallingPid();
    final int uid = Binder.getCallingUid();
    synchronized (mGlobalLock) {
        // ...
        mTaskFragmentOrganizerState.put(organizer.asBinder(),
                new TaskFragmentOrganizerState(organizer, pid, uid, isSystemOrganizer));
        mPendingTaskFragmentEvents.put(organizer.asBinder(), new ArrayList<>());
    }
}
```

与 TaskOrganizer 不同，TaskFragmentOrganizer 注册时**不返回已存在的 TaskFragment 列表**——因为 TaskFragment 的创建是由 Organizer 主动发起的。

#### TaskFragmentOrganizerState

```java
// TaskFragmentOrganizerController.java line 114
private class TaskFragmentOrganizerState implements IBinder.DeathRecipient {
    private final ArrayList<TaskFragment> mOrganizedTaskFragments;
    private final ITaskFragmentOrganizer mOrganizer;
    private final int mOrganizerPid;
    private final int mOrganizerUid;
    private final boolean mIsSystemOrganizer;
    // Delta 检测用
    private final Map<TaskFragment, TaskFragmentInfo> mLastSentTaskFragmentInfos;
    private final Map<TaskFragment, Integer> mTaskFragmentTaskIds;
    private final SparseArray<TaskFragmentParentInfo> mLastSentTaskFragmentParentInfos;
    // Transition 协调
    private final ArrayMap<IBinder, Integer> mDeferredTransitions;
    // ...
}
```

State 中通过 `mLastSentTaskFragmentInfos` 做 Delta 检测，仅在信息实际发生变化时才发送回调，避免冗余通知。

#### 批量分发机制

事件的分发通过 `dispatchPendingEvents()` 触发，将 Pending 事件组装为 `TaskFragmentTransaction`：

```java
// TaskFragmentOrganizerController.java line 1203
private void dispatchPendingEvents(@NonNull TaskFragmentOrganizerState state,
        @NonNull List<PendingTaskFragmentEvent> pendingEvents) {
    if (pendingEvents.isEmpty()) {
        return;
    }
    // ...
    final int numEvents = pendingEvents.size();
    final TaskFragmentTransaction transaction = new TaskFragmentTransaction();
    for (int i = 0; i < numEvents; i++) {
        final PendingTaskFragmentEvent event = pendingEvents.get(i);
        // 对 APPEARED / INFO_CHANGED 事件，自动附加 PARENT_INFO_CHANGED
        if (event.mEventType == PendingTaskFragmentEvent.EVENT_APPEARED
                || event.mEventType == PendingTaskFragmentEvent.EVENT_INFO_CHANGED) {
            final Task task = event.mTaskFragment.getTask();
            if (mTmpTaskSet.add(task)) {
                transaction.addChange(prepareChange(new PendingTaskFragmentEvent.Builder(
                        PendingTaskFragmentEvent.EVENT_PARENT_INFO_CHANGED, state.mOrganizer)
                        .setTask(task)
                        .build()));
            }
        }
        transaction.addChange(prepareChange(event));
    }
    state.dispatchTransaction(transaction);
    pendingEvents.clear();
}
```

如果 Transition 正在收集中，分发时会调用 `deferTransitionReady()` 暂停 Transition，等待 Organizer 调用 `onTransactionHandled()` 后再恢复。

#### 后台延迟优化

```java
// TaskFragmentOrganizerController.java line 1241 (概要)
private boolean shouldDeferPendingEvents(TaskFragmentOrganizerState state,
        List<PendingTaskFragmentEvent> pendingEvents) {
    // 如果事件关联的 Task 不可见且非紧急事件，延迟分发
    // 等 Task 变为可见时再发送
}
```

这一优化减少了后台 Task 变更时对 Organizer 的不必要唤醒。


## DisplayAreaOrganizer

`DisplayAreaOrganizer` 用于管理显示区域（DisplayArea），控制诸如单手模式（One-Handed）、放大镜（Magnification）、Display Cutout 隐藏等系统功能对应的显示区域。

### 客户端 API

```java
// DisplayAreaOrganizer.java line 34
public class DisplayAreaOrganizer extends WindowOrganizer {
    // ...
}
```

#### FEATURE 常量

DisplayArea 通过 Feature ID 标识其功能类型，Organizer 按 Feature 注册：

| 常量 | 值 | 说明 |
|------|---|------|
| `FEATURE_ROOT` | 0 | 根显示区域 |
| `FEATURE_DEFAULT_TASK_CONTAINER` | 1 | 默认 Task 容器 (TaskDisplayArea) |
| `FEATURE_WINDOW_TOKENS` | 2 | 非 Activity 窗口 token 容器 |
| `FEATURE_ONE_HANDED` | 3 | 单手模式 |
| `FEATURE_WINDOWED_MAGNIFICATION` | 4 | 窗口放大镜 |
| `FEATURE_FULLSCREEN_MAGNIFICATION` | 5 | 全屏放大镜 |
| `FEATURE_HIDE_DISPLAY_CUTOUT` | 6 | 隐藏 Display Cutout |
| `FEATURE_IME_PLACEHOLDER` | 7 | IME 占位 |
| `FEATURE_IME` | 8 | IME 容器 |
| `FEATURE_VENDOR_FIRST` | 10001 | 厂商自定义起始 |
| `FEATURE_RUNTIME_TASK_CONTAINER_FIRST` | 20002 | 运行时创建的 TaskDisplayArea |

**注册/注销**

| 方法 | 行号 | 说明 |
|------|------|------|
| `registerOrganizer(int feature)` | 174 | 注册管理指定 Feature 的 DisplayArea，返回已存在的列表 |
| `unregisterOrganizer()` | 187 | 注销，删除 Organizer 创建的 TDA |
| `createTaskDisplayArea(displayId, parentFeatureId, name)` | 217 | 创建运行时 TaskDisplayArea |
| `deleteTaskDisplayArea(token)` | 235 | 删除 Organizer 创建的 TDA |

**回调方法**

| 回调 | 行号 | 说明 |
|------|------|------|
| `onDisplayAreaAppeared(info, leash)` | 248 | DisplayArea 出现 |
| `onDisplayAreaVanished(info)` | 251 | DisplayArea 消失 |
| `onDisplayAreaInfoChanged(info)` | 256 | DisplayArea 配置变化 |

### 服务端 Controller

```java
// DisplayAreaOrganizerController.java line 42
public class DisplayAreaOrganizerController extends IDisplayAreaOrganizerController.Stub {
    // ...
}
```

#### 核心数据结构

```java
// DisplayAreaOrganizerController.java line 53
private final HashMap<Integer, DisplayAreaOrganizerState> mOrganizersByFeatureIds = new HashMap();
```

以 Feature ID 为 key 存储 Organizer 状态。**每个 Feature 只允许一个 Organizer**，新注册会替换已死亡的旧 Organizer。

#### 注册流程

```java
// DisplayAreaOrganizerController.java line 128
@Override
public ParceledListSlice<DisplayAreaAppearedInfo> registerOrganizer(
        IDisplayAreaOrganizer organizer, int feature) {
    enforceTaskPermission("registerOrganizer()");
    // ...
    // 替换已死亡的 Organizer
    if (mOrganizersByFeatureIds.get(feature) != null) {
        mOrganizersByFeatureIds.remove(feature).destroy();
    }
    final DisplayAreaOrganizerState state = new DisplayAreaOrganizerState(organizer, feature);
    // 遍历所有 trusted Display 的 DisplayArea
    mService.mRootWindowContainer.forAllDisplays(dc -> {
        if (!dc.isTrusted()) return;
        dc.forAllDisplayAreas((da) -> {
            if (da.mFeatureId != feature) return;
            displayAreaInfos.add(organizeDisplayArea(organizer, da, "..."));
        });
    });
    mOrganizersByFeatureIds.put(feature, state);
    return new ParceledListSlice<>(displayAreaInfos);
}
```

与 TaskOrganizer 类似，注册时已存在的 DisplayArea 通过返回值传递，后续新出现的才通过回调通知。

#### DisplayArea 中的 Organizer 集成

DisplayArea 节点自身维护了 Organizer 引用：

```java
// DisplayArea.java line 91
private final DisplayAreaOrganizerController mOrganizerController;
IDisplayAreaOrganizer mOrganizer;
boolean mDisplayAreaAppearedSent;
```

当 Organizer 设置时：

```java
// DisplayArea.java line 638
void setOrganizer(IDisplayAreaOrganizer organizer, boolean skipDisplayAreaAppeared) {
    if (mOrganizer == organizer) return;
    if (mDisplayContent == null || !mDisplayContent.isTrusted()) {
        throw new IllegalStateException(
                "Don't organize or trigger events for unavailable or untrusted display.");
    }
    IDisplayAreaOrganizer lastOrganizer = mOrganizer;
    mOrganizer = organizer;
    sendDisplayAreaVanished(lastOrganizer);  // 通知旧 Organizer
    if (!skipDisplayAreaAppeared) {
        sendDisplayAreaAppeared();  // 通知新 Organizer
    } else if (organizer != null) {
        mDisplayAreaAppearedSent = true;  // 注册时通过返回值传递，标记为已发送
    }
}
```

配置变化时自动通知 Organizer：

```java
// DisplayArea.java line 680
@Override
public void onConfigurationChanged(Configuration newParentConfig) {
    // ...
    if (mOrganizer != null && getConfiguration().diff(mTmpConfiguration) != 0) {
        sendDisplayAreaInfoChanged();
    }
}
```

#### createTaskDisplayArea

```java
// DisplayAreaOrganizerController.java line 191
@Override
public DisplayAreaAppearedInfo createTaskDisplayArea(IDisplayAreaOrganizer organizer,
        int displayId, int parentFeatureId, String name) {
    // ...
    // 父节点可以是 RootDisplayArea 或 TaskDisplayArea
    final RootDisplayArea parentRoot = display.getItemFromDisplayAreas(da ->
            da.asRootDisplayArea() != null && da.mFeatureId == parentFeatureId
                    ? da.asRootDisplayArea() : null);
    // ...
    final int taskDisplayAreaFeatureId = mNextTaskDisplayAreaFeatureId++;
    final TaskDisplayArea tda = parentRoot != null
            ? createTaskDisplayArea(parentRoot, name, taskDisplayAreaFeatureId)
            : createTaskDisplayArea(parentTda, name, taskDisplayAreaFeatureId);
    // ...
}
```

创建的 TaskDisplayArea 标记 `mCreatedByOrganizer = true`，注销时自动删除。


## WindowContainerTransaction (WCT)

WCT 是 Organizer 向 WMS 下发变更指令的载体，支持两类操作：

1. **Change（配置变更）**：修改 WindowContainer 的配置属性
2. **HierarchyOp（层级操作）**：修改窗口层级树结构

### 处理流程

![WCT 处理流程](/img/android/organizer/04_wct_flow.svg)

#### 入口

```java
// WindowOrganizerController.java line 252
@Override
public void applyTransaction(WindowContainerTransaction t) {
    enforceTaskPermission("applyTransaction()");
    final CallerInfo caller = new CallerInfo();
    final long ident = Binder.clearCallingIdentity();
    try {
        synchronized (mGlobalLock) {
            applyTransaction(t, -1 /*syncId*/, null /*transition*/, caller);
        }
    } finally {
        Binder.restoreCallingIdentity(ident);
    }
}
```

#### 核心处理方法

内部 `applyTransaction()` 分四个阶段处理（基于 `WindowOrganizerController.java` line 740+）：

**阶段 1：应用 Configuration 变更**

遍历 `t.getChanges()` 中每个 `(WindowContainerToken, Change)` 对，根据 WindowContainer 类型分发到不同处理方法：

```java
// WindowOrganizerController.java line 2358
private int applyWindowContainerChange(WindowContainer wc,
        WindowContainerTransaction.Change c, @Nullable IBinder errorCallbackToken) {
    sanitizeWindowContainer(wc);
    if (wc.asDisplayArea() != null) {
        return applyDisplayAreaChanges(wc.asDisplayArea(), c);
    } else if (wc.asTask() != null) {
        return applyTaskChanges(wc.asTask(), c);
    } else if (wc.asTaskFragment() != null && wc.asTaskFragment().isEmbedded()) {
        return applyTaskFragmentChanges(wc.asTaskFragment(), c, errorCallbackToken);
    } else {
        return applyChanges(wc, c);
    }
}
```

Change 支持的操作包括：设置 bounds、windowingMode、focusable、hidden、forceTranslucent、dragResizing、relativeBounds 等。

**阶段 2：应用 HierarchyOp**

遍历 `t.getHierarchyOps()`，通过 `applyHierarchyOp()` 逐个执行。支持的操作类型：

| 操作 | 说明 |
|------|------|
| `REPARENT` / `REORDER` | 重新挂载 / 重新排序 |
| `REMOVE_TASK` | 删除 Task |
| `LAUNCH_TASK` | 从 Recents 启动 Task |
| `SET_LAUNCH_ROOT` | 设置启动根 Task |
| `CHILDREN_TASKS_REPARENT` | 按条件批量 reparent 子 Task |
| `FINISH_ACTIVITY` | 结束 Activity |
| `PENDING_INTENT` | 执行 PendingIntent |
| `ADD_TASK_FRAGMENT_OPERATION` | TaskFragment 操作 |
| `MOVE_PIP_ACTIVITY_TO_PINNED_TASK` | 移动 Activity 到画中画 |
| `ADD/REMOVE_INSETS_FRAME_PROVIDER` | Insets 管理 |

**阶段 3：生命周期更新**

根据累积的 Effects 标志决定后续操作：
- `TRANSACT_EFFECTS_LIFECYCLE`：调用 `ensureActivitiesVisible()` + `resumeFocusedTasksTopActivities()`
- `TRANSACT_EFFECTS_CLIENT_CONFIG`：调用 `ensureActivityConfiguration()`

**阶段 4：恢复布局**

```java
// WindowOrganizerController.java line 968 (概要)
finally {
    continueWindowLayout();
    setDeferRootVisibilityUpdate(false);
}
```

整个过程用 `deferWindowLayout()` / `continueWindowLayout()` 包裹，确保所有变更在单次布局遍历中原子化应用。

### 同步 Transaction (applySyncTransaction)

当需要等待所有窗口绘制完成后再统一提交 SurfaceControl 变更时，使用 `applySyncTransaction()`：

```java
// WindowOrganizerController.java line 269
@Override
public int applySyncTransaction(WindowContainerTransaction t,
        IWindowContainerTransactionCallback callback) {
    // ...
    final BLASTSyncEngine.SyncGroup syncGroup = prepareSyncWithOrganizer(callback);
    final int syncId = syncGroup.mSyncId;
    // 应用 Transaction 时，每个受影响的 WindowContainer 加入 SyncGroup
    applyTransaction(t, syncId, null, caller);
    setSyncReady(syncId);
    // BLASTSyncEngine 等待所有参与者绘制完成后，通过 callback.onTransactionReady() 返回合并后的 Transaction
    return syncId;
}
```

`BLASTSyncEngine` 收集所有参与 WC 的 SurfaceControl.Transaction，待全部绘制完成后合并为一个 Transaction 回调给客户端。


## 整体协作模型

### 典型使用场景

| 场景 | 使用的 Organizer | 说明 |
|------|-----------------|------|
| 分屏模式 | TaskOrganizer | Shell 创建两个 root Task，管理它们的 bounds 和 z-order |
| 画中画 (PiP) | TaskOrganizer | Shell 管理 PiP Task 的 bounds 和动画 |
| 自由窗口 | TaskOrganizer | Shell 管理 freeform Task 的位置和大小 |
| Activity Embedding | TaskFragmentOrganizer | Jetpack WindowManager 管理 Task 内嵌入式 Activity 的布局 |
| 单手模式 | DisplayAreaOrganizer | 管理 FEATURE_ONE_HANDED 区域的缩放和位置 |
| 窗口放大镜 | DisplayAreaOrganizer | 管理 FEATURE_WINDOWED_MAGNIFICATION 区域 |
| IME 容器管理 | DisplayAreaOrganizer | 管理 FEATURE_IME 区域 |

### Shell 端使用示例：单手模式

以单手模式为例，展示 Organizer 的典型使用方式。`OneHandedDisplayAreaOrganizer` 注册 `FEATURE_ONE_HANDED` 类型的 DisplayArea，获取其 SurfaceControl leash 后直接操控窗口位置。

**注册并保存 leash：**

```java
// OneHandedDisplayAreaOrganizer.java line 61
public class OneHandedDisplayAreaOrganizer extends DisplayAreaOrganizer {

    private ArrayMap<WindowContainerToken, SurfaceControl> mDisplayAreaTokenMap = new ArrayMap();

    // line 172
    @Override
    public List<DisplayAreaAppearedInfo> registerOrganizer(int displayAreaFeature) {
        final List<DisplayAreaAppearedInfo> displayAreaInfos =
                super.registerOrganizer(displayAreaFeature);
        for (int i = 0; i < displayAreaInfos.size(); i++) {
            final DisplayAreaAppearedInfo info = displayAreaInfos.get(i);
            onDisplayAreaAppeared(info.getDisplayAreaInfo(), info.getLeash());
        }
        // ...
        return displayAreaInfos;
    }

    // line 155
    @Override
    public void onDisplayAreaAppeared(@NonNull DisplayAreaInfo displayAreaInfo,
            @NonNull SurfaceControl leash) {
        mDisplayAreaTokenMap.put(displayAreaInfo.token, leash);
    }
}
```

注册时，`registerOrganizer()` 的返回值包含已存在的 DisplayArea，需要手动调用 `onDisplayAreaAppeared` 处理；后续新出现的 DisplayArea 通过回调自动通知。

**通过 leash 执行动画：**

```java
// OneHandedDisplayAreaOrganizer.java line 224
public void scheduleOffset(int xOffset, int yOffset) {
    final float fromPos = mLastVisualOffset;
    final int direction = yOffset > 0
            ? TRANSITION_DIRECTION_TRIGGER : TRANSITION_DIRECTION_EXIT;
    mDisplayAreaTokenMap.forEach(
            (token, leash) -> {
                animateWindows(token, leash, fromPos, yOffset, direction,
                        mEnterExitAnimationDurationMs);
            });
    mLastVisualOffset = yOffset;
}
```

控制 DisplayArea 的 SurfaceControl 就等同于控制该 DisplayArea 及其容纳的所有子窗口——这是 Organizer 框架的核心思想。Shell 无需关心 DisplayArea 下有多少 Task 和 Window，只需操作一个 leash 即可整体平移所有窗口。

### 生命周期保障

所有 Organizer 都内置了 `DeathRecipient` 机制，当 Organizer 进程意外死亡时自动清理：
- **TaskOrganizer**：`dispose()` 删除 Organizer 创建的 Task，其他 Task 迁移到下一优先级 Organizer
- **TaskFragmentOrganizer**：`removeOrganizer()` 清理所有 pending 事件，`dispose()` 清理关联的 TaskFragment
- **DisplayAreaOrganizer**：`destroy()` 清理 Organizer 关联的 DisplayArea，删除 Organizer 创建的 TDA

### 权限要求

所有 Organizer 操作都需要 `MANAGE_ACTIVITY_TASKS` 权限（通过 `enforceTaskPermission()` 校验），只有系统进程（如 SystemUI）才能使用。TaskFragmentOrganizer 的 `registerOrganizer(isSystemOrganizer=false)` 不需要此权限，但其操作范围限制在调用方自己的 Task 内。


## 关键源码文件索引

| 文件 | 路径 | 说明 |
|------|------|------|
| WindowOrganizer.java | `core/java/android/window/` | 客户端基类 |
| TaskOrganizer.java | `core/java/android/window/` | Task 管理客户端 |
| TaskFragmentOrganizer.java | `core/java/android/window/` | TaskFragment 管理客户端 |
| DisplayAreaOrganizer.java | `core/java/android/window/` | DisplayArea 管理客户端 |
| IWindowOrganizerController.aidl | `core/java/android/window/` | 总控制器 AIDL |
| ITaskOrganizer.aidl | `core/java/android/window/` | Task 回调接口 (oneway) |
| ITaskFragmentOrganizer.aidl | `core/java/android/window/` | TaskFragment 回调接口 (oneway) |
| IDisplayAreaOrganizer.aidl | `core/java/android/window/` | DisplayArea 回调接口 (oneway) |
| WindowOrganizerController.java | `services/core/.../server/wm/` | 服务端总控制器 |
| TaskOrganizerController.java | `services/core/.../server/wm/` | Task 管理服务端 |
| TaskFragmentOrganizerController.java | `services/core/.../server/wm/` | TaskFragment 管理服务端 |
| DisplayAreaOrganizerController.java | `services/core/.../server/wm/` | DisplayArea 管理服务端 |
| WindowContainerTransaction.java | `core/java/android/window/` | Transaction 定义 |
| Task.java | `services/core/.../server/wm/` | Task 节点 (含 Organizer 关联逻辑) |
| TaskFragment.java | `services/core/.../server/wm/` | TaskFragment 节点 |
| DisplayArea.java | `services/core/.../server/wm/` | DisplayArea 节点 |
