---
prev:
    text: 'StartingWindow'
    link: '/framework/StartingWindow'
next:
    text: 'Android 属性动画原理'
    link: '/framework/android-property-animation'
---

# Shell Transition 机制

本文档梳理 Android U 引入的 Shell Transition 动画机制，包括其整体架构、生命周期各阶段的流程与代码、对窗口 Surface 状态的影响，以及常见问题与治理方法。

## 一、背景与动机

Android 系统在 Shell Transition 之前没有统一的动画系统，各子系统（App Transition、PIP、分屏、小窗等）分别实现各自的动画功能。自 Android T 版本，Google 开始引入 Shell Transition 机制，将动画统一到 WM Shell 中，Android U 版本首次正式开启该功能。

![整体架构](/img/android/shellTransition/architecture.svg)

Shell Transition 将动画执行从 system_server 进程解耦到 SystemUI 进程中的 WindowManagerShell，带来两个关键好处：

1. **OEM 定制更灵活**：厂商可直接修改 WindowManagerShell，无需修改 Framework 核心代码
2. **减轻 system_server 负担**：动画执行从繁忙的 system_server 移到独立进程，减少相互影响

## 二、基础概念

### 2.1 WindowContainer 与 SurfaceControl

> WindowContainer 层级体系（RootWindowContainer → DisplayContent → Task → ActivityRecord → WindowState）及其与 SurfaceFlinger Layer 的对应关系，详见[无焦点窗口 ANR 文档 §2.1](./anr-no-focused#_2-1-windowcontainer-层级结构)。

### 2.2 什么是 Transition

一个 Transition 代表一次**用户可见的 WM 层级变化**，例如启动 Activity、关闭 Activity、切换任务、旋转屏幕等。每个 Transition 是一组 **Change 原语**的集合：

![触发方式与类型](/img/android/shellTransition/05_trigger_types.svg)

## 三、生命周期概览

![Transition 生命周期](/img/android/shellTransition/lifecycle.svg)

Shell Transition 的生命周期分为三大阶段：

**Collecting 阶段（WM Core）**：
1. **Trigger**：WM 操作触发 Transition 创建
2. **Collecting**：执行 WM 操作并收集参与的窗口容器
3. **Syncing**：等待所有参与容器完成重绘

**Playing 阶段（WM Shell）**：
4. **onTransitionReady**：Core 侧准备完毕，通知 Shell 侧
5. **动画执行**：Shell 侧选择 TransitionHandler 播放动画

**Finishing 阶段**：
6. **finishTransition**：动画结束，Shell 通知 Core，Core 执行清理

## 四、Collecting 阶段

### 4.1 触发方式

Transition 的触发来自两侧：

- **Core 侧**：`startActivity()`、`finishActivity()`、`moveTaskToFront()`、configuration change、rotation change 等 WM 操作
- **Shell 侧**：通过 `WindowContainerTransaction`（WCT）发起，如 PIP 进入/退出、分屏操作等

以启动 Activity 为例，在 `ActivityStarter.startActivityUnchecked()` 中创建 Transition：

```java
// ActivityStarter.java line 1793
private int startActivityUnchecked(...) {
    ...
    Transition newTransition = transitionController.isShellTransitionsEnabled()
            ? transitionController.createTransition(TRANSIT_OPEN) : null;
    ...
}
```

### 4.2 创建 Transition

```java
// TransitionController.java line 338
Transition createTransition(int type) {
    return createTransition(type, 0 /* flags */);
}

Transition createTransition(@WindowManager.TransitionType int type,
        @WindowManager.TransitionFlags int flags) {
    ...
    Transition transit = new Transition(type, flags, this, mSyncEngine);
    ProtoLog.v(WM_DEBUG_WINDOW_TRANSITIONS, "Creating Transition: %s", transit);
    moveToCollecting(transit);
    return transit;
}
```

创建后立即进入 Collecting 状态，开始收集参与动画的窗口容器。此时打印日志：

```
WindowManager: Creating Transition: TransitionRecord{xxx id=N type=OPEN flags=0x0}
WindowManager: Collecting in transition N: ActivityRecord{xxx}
```

## 五、Sync 阶段

### 5.1 BLASTSyncEngine

![BLASTSyncEngine 同步机制](/img/android/shellTransition/06_sync_mechanism.svg)

`BLASTSyncEngine` 负责等待所有参与容器完成绘制同步。每个 Transition 对应一个 `SyncGroup`，包含所有需要同步的 `WindowContainer`（`mRootMembers`）。

每次 `applySurfaceChangesTransaction()` 后触发 `onSurfacePlacement()` 检查：

```
WindowManager: SyncGroup N: onSurfacePlacement checking {Task{...}, Display{...}}
```

当所有窗口完成绘制：

```
WindowManager: SyncGroup N: Finished!
```

### 5.2 超时机制

`BLASTSyncEngine` 设置 5 秒超时：

```java
// WindowState.java line 850
static final int BLAST_TIMEOUT_DURATION = 5000; /* milliseconds */
```

超时后强制进入下一阶段：

```
BLASTSyncEngine: Sync group N timeout
BLASTSyncEngine: Unfinished container: ActivityRecord{xxx}
```

**常见超时原因**：参与窗口停留在 DRAW_PENDING 状态（App 绘制未完成）。

## 六、onTransactionReady 阶段

同步完成后（正常或超时），`SyncGroup.finishNow()` 收集所有参与容器的 sync transaction 合并为 `StartTransaction`，然后通过 `onTransactionReady()` 通知 Shell 侧。

Core 侧在 `Transition.onTransactionReady()` 中完成动画前的准备：

1. **commitVisibleActivities / commitVisibleWallpapers**：更新窗口可见性
2. **calculateTargets**：计算动画目标
3. **calculateTransitionInfo**：构建 `TransitionInfo`
4. **assignTrack**：分配动画轨道
5. **mStartTransaction**：来自 `SyncGroup.finishNow()` 传入的 transaction 参数，包含所有参与容器的 sync transaction
6. **buildFinishTransaction**：构建 FinishTransaction（Shell 侧动画结束后 apply，恢复状态）
7. **buildCleanupTransaction**：构建 CleanupTransaction（清理 transition-only 的 Surface，如 root leash 和 snapshot）

关键日志：

```
WindowManager: Calling onTransitionReady: {id=89 t=OPEN f=0x0 ...
    c=[{null m=OPEN f=FILLS_TASK leash=Surface(name=ActivityRecord{xxx})...},
       {null m=TO_BACK f=FILLS_TASK leash=Surface(name=ActivityRecord{yyy})...}]}
```

## 七、Playing 阶段（动画执行）

### 7.1 Shell 侧接收

Shell 侧 `Transitions.onTransitionReady()` 接收动画数据，调用 `dispatchReady()` 将 Transition 派发到合适的 TransitionHandler：

```
WindowManagerShell: onTransitionReady (#89) ...
WindowManagerShell: Playing animation for (#89) ...
```

### 7.2 TransitionHandler 选择

![TransitionHandler 选择流程](/img/android/shellTransition/07_handler_selection.svg)

Shell 遍历所有注册的 TransitionHandler，依次调用 `startAnimation()`，第一个返回 true 的 Handler 接管动画。如果没有 Handler 接管，由 `DefaultTransitionHandler` 兜底：

```
WindowManagerShell:  try handler KeyguardTransitionHandler
WindowManagerShell:  try handler RecentsTransitionHandler
WindowManagerShell:  try handler PipTransition
WindowManagerShell:  try handler DefaultTransitionHandler
WindowManagerShell:  animated by DefaultTransitionHandler@xxx
```

### 7.3 setupStartState()

![setupStartState 可见性设置](/img/android/shellTransition/08_setup_start_state.svg)

动画开始前，`setupStartState()` 设置每个参与窗口的初始可见性：

```java
// Transitions.java line 625
private static void setupStartState(@NonNull TransitionInfo info,
        @NonNull SurfaceControl.Transaction t,
        @NonNull SurfaceControl.Transaction finishT, ...) {
    boolean isOpening = isOpeningType(info.getType());
    for (int i = info.getChanges().size() - 1; i >= 0; --i) {
        final TransitionInfo.Change change = info.getChanges().get(i);
        final SurfaceControl leash = change.getLeash();
        final int mode = info.getChanges().get(i).getMode();
        ...
        if (mode == TRANSIT_OPEN || mode == TRANSIT_TO_FRONT) {
            // 打开的窗口：初始 show
            t.show(leash);
            if (isOpening
                    // 如果是 starting window transfer 接收方，需要立即可见
                    && (change.getFlags() & FLAG_STARTING_WINDOW_TRANSFER_RECIPIENT) == 0) {
                t.setAlpha(leash, 0.f);  // alpha 从 0 开始，便于淡入动画
            }
            finishT.show(leash);
        } else if (mode == TRANSIT_CLOSE || mode == TRANSIT_TO_BACK) {
            // 关闭的窗口：在 finishT 中 hide（动画结束时执行）
            finishT.hide(leash);
        }
    }
}
```

**关键理解**：
- `startT`（t）：动画**开始前**立即 apply
- `finishT`：动画**结束时**才 apply，用于恢复窗口状态

### 7.4 setupAnimHierarchy()

调整动画层级关系，将参与动画的 leash reparent 到 rootLeash 下：

```java
// Transitions.java line 818
private static void setupAnimHierarchy(@NonNull TransitionInfo info,
        @NonNull SurfaceControl.Transaction t,
        @NonNull SurfaceControl.Transaction finishT) {
    ...
    for (int i = numChanges - 1; i >= 0; --i) {
        final TransitionInfo.Change change = info.getChanges().get(i);
        final SurfaceControl leash = change.getLeash();
        if (!TransitionInfo.isIndependent(change, info)) continue;
        boolean hasParent = change.getParent() != null;
        final TransitionInfo.Root root = TransitionUtil.getRootFor(change, info);
        if (!hasParent) {
            t.reparent(leash, root.getLeash());  // reparent 到 rootLeash
            ...
        }
        final int layer = calculateAnimLayer(change, i, numChanges, type);
        t.setLayer(leash, layer);
    }
}
```

### 7.5 动画流程

![动画执行流程](/img/android/shellTransition/animation-flow.svg)

DefaultTransitionHandler 加载动画资源，对每个 Change 创建动画并播放。动画执行期间窗口的 Layer 处于 reparent 到 rootLeash 的状态。

## 八、Finishing 阶段

### 8.1 动画完成通知

动画结束后，Shell 侧调用 `finishTransition()`：

```
WindowManagerShell: Transition animation finished (aborted=false), notifying core (#89) ...
```

此时 Shell 侧 apply `finishT`，恢复窗口状态（包括对 TO_BACK/CLOSE 窗口执行 hide）。

### 8.2 Core 侧清理

Core 侧 `TransitionController.finishTransition()` 执行清理：

```java
// TransitionController.java line 1221
void finishTransition(Transition record) {
    ...
    ProtoLog.v(WM_DEBUG_WINDOW_TRANSITIONS, "Finish Transition: %s", record);
    mPlayingTransitions.remove(record);
    ...
    updateRunningRemoteAnimation(record, false /* isPlaying */);
    record.finishTransition();
    for (int i = mAnimatingExitWindows.size() - 1; i >= 0; i--) {
        final WindowState w = mAnimatingExitWindows.get(i);
        if (w.mAnimatingExit && w.mHasSurface && !w.inTransition()) {
            w.onExitAnimationDone();
        }
        if (!w.mAnimatingExit || !w.mHasSurface) {
            mAnimatingExitWindows.remove(i);
        }
    }
    ...
    if (!inTransition()) {
        validateStates();  // 执行 mStateValidators
    }
}
```

关键日志：

```
WindowManager: Finish Transition (#89): created at ... finished=675.119ms
```

**正常动画时长为几百毫秒**。如果 finished 字段显示几秒甚至没有 Finish 日志，说明动画异常。

### 8.3 状态校验器（mStateValidators）

`validateStates()` 执行所有注册的状态校验回调。其中 `enforceSurfaceVisible()` 用于修复 `setVisibility(true)` 在动画期间被覆盖的问题：

```java
// WindowContainer.java line 3955
static void enforceSurfaceVisible(@NonNull WindowContainer<?> wc) {
    if (wc.mSurfaceControl == null) return;
    wc.getSyncTransaction().show(wc.mSurfaceControl);
    final ActivityRecord ar = wc.asActivityRecord();
    if (ar != null) {
        ar.mLastSurfaceShowing = true;
    }
    // 同时 show 所有父级 Surface
    for (WindowContainer<?> p = wc.getParent(); p != null && p != wc.mDisplayContent;
            p = p.getParent()) {
        if (p.mSurfaceControl != null) {
            p.getSyncTransaction().show(p.mSurfaceControl);
            final Task task = p.asTask();
            if (task != null) {
                task.mLastSurfaceShowing = true;
            }
        }
    }
    wc.scheduleAnimation();
}
```

## 九、对焦点窗口的影响

![Surface 状态影响](/img/android/shellTransition/surface-impact.svg)

动画期间 Surface 状态变化会影响 InputDispatcher 的焦点判定：

### 9.1 hide 导致 NOT_VISIBLE

`setupStartState()` 中 `finishT.hide(leash)` 在动画结束时使 TO_BACK/CLOSE 窗口的 Layer 变为 hidden。如果此时另一个 Activity 以 `LAUNCH_SINGLE_TOP` 等方式重新启动了这个窗口，`setVisibility(true)` 只 show 了父级而不是当前 ActivityRecord 的 Surface，随后动画 finish 时 `finishT` 的 hide 覆盖了之前的 show → Layer 留在 hidden 状态 → NOT_VISIBLE ANR。

### 9.2 reparent 导致 Layer 脱离层级

`setupAnimHierarchy()` 将 leash reparent 到 rootLeash。如果动画未正常 finish，leash 不会恢复到原来的父级 → Layer 脱离正常层级树 → 在 dump SurfaceFlinger 中可以看到 Layer 层级只有 2-3 级（正常应有 8-10 级）。

### 9.3 动画堆积

当系统中 Transition 动画大量堆积（数百个），新 Transition 进入排队等待（`track.mReadyTransitions.size() > 1`），无法被及时 dispatch 和播放。大量排队的动画导致后续 Transition 长时间无法 finish → Task Surface 留在 hide 状态。

日志特征：

```
ShellTransitions: dispatchReady: track.mReadyTransitions.size() > 1, return, size = 444
BLASTSyncEngine: WM sent Transaction (#N, ...) to organizer,
    but never received commit callback. Application ANR likely to follow.
```

## 十、常见问题与治理

### 10.1 动画未 finish 导致 Surface hide

**问题**：动画期间目标窗口被重新启动，动画 finish 时 hide 操作覆盖了 show。

**治理**：在 `setVisibility(true)` 且不在 Transition collect 阶段时，通过 `mStateValidators` 注册回调，等动画结束后校验并强制 show。AOSP 通过 `onVisibleWithoutCollectingTransition()` + `enforceSurfaceVisible()` 实现。

### 10.2 动画堆积导致 abort

**问题**：桌面启动 App 或小窗操作产生大量 OPEN 动画堆积（400-500+），新 Transition 被异常丢弃。

**治理**：各业务（桌面、小窗等）需确保动画及时 finish，避免堆积。对长时间未结束的动画增加超时保护。

### 10.3 reparent 异常（pendingTransaction vs syncTransaction 时序）

**问题**：创建 Starting Window 退出动画使用 `pendingTransaction`（依赖 Choreographer.doFrame），取消动画使用 `syncTransaction`。Shell 动画期间两者 apply 时序不确定，可能导致 WindowState 被 reparent 到已脱离层级的 animation-leash 上。

**治理**：确保 Starting Window 退出动画使用与 Shell 动画一致的 Transaction 类型；或延迟到 startTransaction commit 后再执行 remove。

## 十一、调试环境与日志分析

### 11.1 开启 Debug 日志

Shell Transition 的日志分布在两个进程中，需要分别开启：

```bash
# Core 侧（system_server 进程）— 开启 Transition 相关 ProtoLog
adb shell wm logging enable-text WM_DEBUG_WINDOW_TRANSITIONS WM_DEBUG_WINDOW_TRANSITIONS_MIN WM_DEBUG_SYNC_ENGINE

# Shell 侧（SystemUI 进程）— 开启 Shell Transition ProtoLog
adb shell dumpsys activity service SystemUIService WMShell protolog enable-text WM_SHELL_TRANSITIONS

# SurfaceControl 日志 — 查看 Surface 操作（黑屏/位置异常时使用）
adb shell setprop persist.wm.debug.sc.tx.log_match_call show,hide,reparent,setMatrix,merge,apply
```

查看所有可用的 Core 侧日志开关：

```bash
adb shell dumpsys window logging
```

### 11.2 分析工具

| 工具 | 用途 | 说明 |
|------|------|------|
| **mpv** | 逐帧查看录屏 | 便于定位动画异常发生的精确帧（建议开启"时间悬浮窗"方便对照时间戳） |
| **Winscope** | 查看 SurfaceFlinger 信息 | 定位黑屏/白屏/闪屏时的 Surface 层级状态 |
| **VsCode** | 日志查看 | 配合日志高亮和搜索分析 |

### 11.3 TransitionInfo 属性解读

当 Transition ready 时，Core 侧和 Shell 侧会打印完整的 `TransitionInfo`：

```
WindowManager: Calling onTransitionReady: {id=150 t=OPEN f=0x0 trk=0
    r=[0@Point(0, 0)] c=[
    {WCT{...Task{...#39 type=standard}}} m=TO_FRONT f=MOVE_TO_TOP
        leash=Surface(name=Task=39#1270) sb=Rect(0, 0 - 1224, 2912) eb=Rect(0, 0 - 1224, 2912)},
    {WCT{...Task{...#1 type=home}}} m=TO_BACK f=SHOW_WALLPAPER
        leash=Surface(name=Task=1#72) sb=Rect(0, 0 - 1224, 2912) eb=Rect(0, 0 - 1224, 2912)}]}
```

各字段含义：

| 字段 | 含义 | 源码位置 |
|------|------|---------|
| `id=N` | Transition 的 SyncId，唯一标识 | `TransitionInfo.mDebugId` |
| `t=OPEN` | Transition 类型（OPEN/CLOSE/TO_FRONT/TO_BACK/CHANGE 等） | `TransitionInfo.mType` |
| `f=0x0` | Transition flags | `TransitionInfo.mFlags` |
| `trk=N` | 动画轨道编号（不同 track 可并行播放） | `TransitionInfo` track 字段 |
| `c=[...]` | 所有 Changes，每个对应一个 WindowContainer | `TransitionInfo.mChanges` |

每个 Change 中的子字段：

| 字段 | 含义 |
|------|------|
| `m=TO_FRONT` | 变化模式（OPEN/CLOSE/TO_FRONT/TO_BACK/CHANGE） |
| `f=MOVE_TO_TOP` | Change flags（SHOW_WALLPAPER/FILLS_TASK/STARTING_WINDOW_TRANSFER 等） |
| `leash=Surface(...)` | 动画使用的 leash Surface |
| `sb=Rect(...)` | 起始 bounds |
| `eb=Rect(...)` | 结束 bounds |
| `d=N` | display id |
| `bc=ffxxxxxx` | background color |
| `component=...` | 对应的 Activity 组件名 |

### 11.4 正常动画生命周期日志

```
# 1. 创建 Transition
WindowManager: Creating Transition: TransitionRecord{xxx id=89 type=OPEN}

# 2. 收集参与窗口
WindowManager: Collecting in transition 89: ActivityRecord{xxx}

# 3. 同步完成
WindowManager: SyncGroup 89: Finished!

# 4. Core 侧准备完毕
WindowManager: Calling onTransitionReady: {id=89 t=OPEN ...}

# 5. Shell 侧接收并选择 Handler
WindowManagerShell: onTransitionReady (#89) ...
WindowManagerShell:  animated by DefaultTransitionHandler@xxx

# 6. 动画结束
WindowManagerShell: Transition animation finished (aborted=false), notifying core (#89)

# 7. Core 侧清理
WindowManager: Finish Transition (#89): ... finished=675.119ms
```

### 11.5 异常模式

| 异常 | 日志特征 |
|------|---------|
| 同步超时 | `Sync group N timeout` + `Unfinished container: ...` |
| 动画堆积 | 同一 track 上多个 Transition 排队，后续动画无法 dispatch（表现为长时间无 `animated by` 日志） |
| commit 超时 | `WM sent Transaction ... but never received commit callback` |
| 动画时间过长 | `finished=` 字段显示秒级甚至无 Finish 日志 |

### 11.6 识别动画由哪个 Handler 执行

Shell 侧日志可以清晰地看到每个 Transition 最终由哪个 Handler 接管：

```
# DefaultTransitionHandler 处理（系统默认动画）
WindowManagerShell:  try handler DefaultTransitionHandler@xxx
WindowManagerShell:  animated by DefaultTransitionHandler@xxx

# RecentsTransitionHandler 处理（全面屏手势/最近任务）
WindowManagerShell:  try firstHandler RecentsTransitionHandler@xxx
WindowManagerShell:  animated by firstHandler

# RemoteTransitionHandler 处理（桌面远程动画）
WindowManagerShell:  try handler RemoteTransitionHandler@xxx
WindowManagerShell:  animated by RemoteTransitionHandler@xxx

# KeyguardTransitionHandler 处理（锁屏解锁动画）
WindowManagerShell:  try handler KeyguardTransitionHandler@xxx
WindowManagerShell:  animated by KeyguardTransitionHandler@xxx
```

如果已有 `mHandler`（如之前选中的 firstHandler）会先尝试它，成功则打印 `animated by firstHandler`；否则遍历 `mHandlers` 列表逐个尝试。

### 11.7 常见动画 Target 构成

不同场景下 Transition 收集的 Target 不同：

```
# 解锁动画：Home Task + DefaultTaskDisplayArea
Final targets: [Task{... #100 type=home}, DefaultTaskDisplayArea@xxx]

# 桌面启动应用 / 退出应用到桌面：应用 Task + Home Task
Final targets: [Task{... #237 type=standard A=10261:com.example.app}, Task{... #100 type=home}]

# 应用内页面切换：两个 ActivityRecord
Final targets: [ActivityRecord{... SecondActivity t239}, ActivityRecord{... MainActivity t239}]
```

## 十二、实战问题排查指南

本节基于动画生命周期的四个阶段，按照"Collecting → Ready → Play → Finish"的顺序组织问题排查方法。

### 12.1 分析动画四步走

排查动画问题的基本思路：

1. **Collecting 阶段**：确认 Transition 收集了正确的窗口容器
2. **Ready 阶段**：读取 TransitionInfo，确认属性信息正确
3. **Play 阶段**：识别动画最终被哪个 Handler 执行
4. **Finish 阶段**：判断动画是否正常结束

### 12.2 Collecting 阶段排查

窗口被 collect 到 Transition 中的常见原因：

**可见性改变**：Activity 生命周期变化导致窗口可见性改变。

```
# 首次启动，因 wm_restart_activity 改变可见性而被 collect
WindowManager: Collecting in transition 1037: ActivityRecord{xxx com.example.app/.MainActivity}
wm_restart_activity: [0,162070869,87,com.example.app/.MainActivity]

# addToStopping 表示 Activity 由可见→不可见，会被 collect
WindowManager: Collecting in transition 51: ActivityRecord{xxx com.example.launcher/.Launcher}
wm_add_to_stopping: [0,32595333,com.example.launcher/.Launcher,makeInvisible]
```

**配置变化**：转屏等 config change 触发 collect。

```
WindowManager: rotation changed from 1 to 0 due ActivityRecord{xxx com.example.app/.Activity}
WindowManager: Collecting in transition 55: Display{#0 state=ON size=2400x1080 ROTATION_90} init visibleRequested:true
WindowManager: Collecting in transition 55: Task{xxx #27 type=standard} init visibleRequested:true
```

### 12.3 Transition Ready 超时问题

**前提知识**：
- `TRANSIT_CHANGE` 类型超时时间为 **2 秒**（`CHANGE_TIMEOUT_MS = 2000`）
- 其他类型超时时间为 **5 秒**（`DEFAULT_TIMEOUT_MS = 5000`）
- 典型表现：启动 App 时长达 5 秒的黑/白屏；返回时底下页面闪黑

**确认超时方法**：从 `requestStartTransition`（或首次 `Collecting in transition`）到 `onTransitionReady` 之间如果达到超时时间，即可确认。

```
# Finish Transition 日志中的各阶段耗时
WindowManager: Finish Transition (#1406): created at 08-22 17:25:10.045
    collect-started=962.789ms started=3372.77ms ready=3372.7ms
    sent=3393.318ms finished=4222.233ms
```

**超时日志**：

```
BLASTSyncEngine: Sync group N timeout
BLASTSyncEngine: Unfinished container: ActivityRecord{xxx com.example.app/.Activity}
```

#### 12.3.1 窗口绘制超时

最常见的原因——参与动画的窗口未能在超时时间内完成绘制。

**排查步骤**：

1. 检查 event log (`logcat -b events`) 中对应 Activity 的生命周期是否及时执行到 onResume
2. 查看超时日志中 `Unfinished container` 后面的窗口 drawState（如 `READY_TO_SHOW`、`DRAW_PENDING`）

```
# 窗口停留在 READY_TO_SHOW 状态导致超时
BLASTSyncEngine: Sync group 555 timeout
BLASTSyncEngine: Unfinished container: ActivityRecord{xxx com.example.app/.SplashActivity}
BLASTSyncEngine: Window{xxx com.example.app/.SplashActivity} READY_TO_SHOW
```

窗口 drawState 停留在 `READY_TO_SHOW` 表示窗口已经准备好显示但还没有实际完成绘制（未调用 `reportDrawFinished`），这是常见的第三方 App 启动黑屏原因。

#### 12.3.2 Ready 条件不满足

`allReady()` 返回 true 需要同时满足以下条件：

```java
// Transition.java line 5074 — ReadyTrackerOld.allReady()
boolean allReady() {
    // ...ProtoLog 省略...
    if (!mUsed) return false;           // 条件1: 已被使用
    if (mDeferReadyDepth > 0) return false;  // 条件2: 没有被 defer
    if (mReadyOverride) return true;     // 快速路径: setAllReady() 被调用过
    // 条件3: 所有 ready group 都为 true
    for (int i = mReadyGroups.size() - 1; i >= 0; --i) {
        final WindowContainer wc = mReadyGroups.keyAt(i);
        if (!wc.isAttached() || !wc.isVisibleRequested()) continue;
        if (!mReadyGroups.valueAt(i)) return false;
    }
    return true;
}
```

超时日志会打印具体原因：

```
Transition: #1929 readiness timeout, used=true deferReadyDepth=0
    group={Display{#0 state=ON size=1200x2670 ROTATION_0}=false}
```

- **group=false**：某个 Display 的 ready group 没有被设为 true。通常是 `setReady(dc, false)` 后一直没有成功设置为 true。
- **deferReadyDepth 不为 0**：说明 `deferTransitionReady()` 被调用后 `continueTransitionReady()` 没有正确回调。
- **used=false**：Transition 被创建后从未被使用过（极端情况）。

### 12.4 黑屏问题排查

黑屏问题需要先确定动画 ready 前相关窗口是否正常显示。常见原因：

#### 12.4.1 没有可见窗口

动画 ready 时参与窗口都不可见，导致无内容显示。通过 Winscope 检查窗口可见性。

#### 12.4.2 可见窗口 bounds 在屏幕外

窗口虽然可见，但位置偏移到屏幕外。用 Winscope 查看窗口坐标，检查是否有异常的 X/Y 偏移。例如 X 轴偏移为负值，导致窗口完全在屏幕左侧外。

排查方法：先查看窗口的 parent 坐标是否正确，然后打开 SurfaceControl 的 `setMatrix` 日志查看是哪里设置了异常位置。

#### 12.4.3 页面没有内容

窗口可见且位置正确，但 App 页面本身没有绘制任何内容。这通常是 App 侧问题。

#### 12.4.4 SurfaceView 导致的黑屏

SurfaceView 有独立的 Layer，Activity 首帧渲染完成时 SurfaceView 可能还没完成首帧渲染。此时 StartingWindow 被移除后，SurfaceView 区域会显示为黑色（受 background 影响）。

这在游戏、拍照、视频等全屏 SurfaceView 应用中尤其常见。

### 12.5 大图标问题排查

**出现场景**：从桌面点击图标启动应用，或通过手势/导航键返回桌面。

**原理**：这些场景中有两个图层参与动画：
1. **图标图层**（桌面提供）：层级较低
2. **Surface 图层**（对应窗口）：层级较高

正常情况下两个图层同时缩放且 size 完全匹配，Surface 图层遮挡住图标图层，肉眼看不到图标。

**闪大图标的原因**：Surface 图层异常导致图标图层暴露：
1. Surface 在动画过程中有几帧不可见（最常见：StartingWindow 的 Surface 未完成绘制）
2. Surface 的透明度被改变，透出下面的图标图层
3. Surface 的层级被调低

**排查重点**：检查 StartingWindow 是否在动画 ready 之前完成绘制。如果动画 ready 后 StartingWindow 才绘制完成，就会出现大图标。可通过对比 `onTransitionReady` 日志时间和超时日志中 `Unfinished container` 里 Splash Screen 窗口的 drawState 来确认：

```
# 动画 ready 时间点
WindowManager: Calling onTransitionReady: {id=811 t=OPEN ...}

# 超时日志中可看到 Splash Screen 窗口的绘制状态
BLASTSyncEngine: Unfinished container: ActivityRecord{xxx com.example.app/.Activity}
```

### 12.6 无动画问题排查

#### 12.6.1 App 自定义无动画

App 通过 `overridePendingTransition` 设置进入/退出动画资源为 0：

```
# opt={t=CUSTOM enterResId=0 exitResId=0} 表示 App 自定义了无动画
WindowManager: Calling onTransitionReady: {id=93 t=OPEN f=0x0
    opt={t=CUSTOM enterResId=0 exitResId=0} ...}
```

此时 TransitionInfo 的 `opt` 字段会显示 `enterResId=0 exitResId=0`，这是 App 主动行为，非系统问题。

#### 12.6.2 Transition 被 merge 到其他动画

页面切换动画可能被 merge 到桌面动画中，但桌面没有处理该动画：

```
WindowManagerShell: Transition was merged: (#87) ... into (#86) ...
```

#### 12.6.3 Shell 侧 abort 导致无动画

如果新 Transition 正在 transfer starting window，Shell 可能直接 abort 该动画并将其合并到前一个动画：

```
# 判断为不可见动画，直接 abort
WindowManagerShell: Non-visible anim so abort: (#87) ...
# abort 后 merge 到前一个动画
WindowManagerShell: Transition was merged: (#87) ... into (#86) ...
```

### 12.7 动画耗时排查

`Finish Transition` 日志的各时间字段可以精确定位哪个阶段慢：

```
Finish Transition (#N): created at HH:MM:SS.mmm
    collect-started=Xms    # Transition 开始 collect 的耗时
    request-sent=Xms       # requestStartTransition 的耗时
    started=Xms            # 从创建到开始 collecting 的耗时
    ready=Xms              # 从创建到 ready 的耗时
    sent=Xms               # 从创建到发送给 Shell 的耗时
    finished=Xms           # 从创建到完全结束的耗时
```

#### 12.7.1 started 慢

Core 侧动画太多，新 Transition 需要排队等待 start：

```
WindowManager: Queueing transition: TransitionRecord{xxx id=-1 type=TO_FRONT}
# started 耗时 3s+
Finish Transition (#1406): ... started=3372.77ms ...
```

#### 12.7.2 ready 慢

常见原因是启动的 Activity 主题为半透明，不会添加 StartingWindow，需要等待 mainWindow 绘制完成。在此期间可能又 collect 了新的页面，也需要等待绘制：

```
# ProtoLog 打印窗口主题属性（Translucent=true 时不添加 StartingWindow）
WindowManager: Translucent=true Floating=false ShowWallpaper=false Disable=false
# ready 耗时 1.4s
Finish Transition (#5432): ... ready=1411.278ms ...
```

#### 12.7.3 finished 慢（动画执行超时）

动画执行时间过长，通常是 Shell 侧动画未正常结束：

```
# Shell 侧动画结束
WindowManagerShell: Transition animation finished (aborted=false), notifying core (#273)
# 该动画执行了 230 秒才结束
WindowManager: Finish Transition #273: ... finished=230688.982ms
```

**正常动画时长为几百毫秒**。如果 `finished` 字段显示秒级，说明动画执行严重超时。

### 12.8 动画堆积问题

当前一个动画迟迟不结束时，后续 Transition 会在 Shell 侧排队等待，无法被 dispatch 和播放。

**典型表现**：桌面点击无反应、白屏、黑屏。

**日志特征**：

```
# 后续动画被阻塞，当前正在执行的动画未结束
# AOSP 在 track.mReadyTransitions.size() > 1 时直接 return，不继续 dispatch
```

**排查方法**：
1. 搜索当前 active 的 Transition id
2. 查看该 Transition 的 `Finish Transition` 日志，确认 `finished` 耗时
3. 定位是 Shell 侧动画执行超时还是 Core 侧清理异常

### 12.9 RemoteTransitionHandler 匹配排查

如果 Transition 没有被 RemoteTransitionHandler 处理（预期应该被桌面接管），检查 filter 注册状态：

```bash
# 查看已注册的 Remote Transition filters
adb shell dumpsys activity service SystemUIService WMShell | grep -A 10 "Registered Remotes:"
```

正常输出应包含桌面注册的 filter 列表。如果输出为空或 `none`，说明桌面未正确注册 Remote Transition。

## 附录：关键文件索引

| 模块 | 文件路径 | 关键方法 |
|------|---------|---------|
| Core | `services/.../wm/TransitionController.java` | `createTransition()`, `finishTransition()` |
| Core | `services/.../wm/WindowContainer.java` | `enforceSurfaceVisible()` |
| Core | `services/.../wm/Transition.java` | `onTransactionReady()`, `calculateTargets()` |
| Core | `services/.../wm/BLASTSyncEngine.java` | `SyncGroup`, `finishNow()`, 超时 5000ms |
| Shell | `libs/WindowManager/Shell/.../transition/Transitions.java` | `onTransitionReady()`, `setupStartState()`, `setupAnimHierarchy()` |
| Shell | `libs/WindowManager/Shell/.../transition/DefaultTransitionHandler.java` | `startAnimation()` |
