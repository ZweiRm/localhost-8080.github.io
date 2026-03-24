---
prev:
    text: 'SurfaceControl & Transaction 流程'
    link: '/framework/surfacecontrol-transaction'
next:
    text: 'Android Input 系统'
    link: '/framework/input-system'
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

> WindowContainer 层级体系（RootWindowContainer → DisplayContent → Task → ActivityRecord → WindowState）及其与 SurfaceFlinger Layer 的对应关系，详见[无焦点窗口 ANR 文档 §2.1](/framework/anr-no-focused#_2-1-windowcontainer-层级结构)。

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
// ActivityStarter.java
private int startActivityUnchecked(...) {
    ...
    Transition newTransition = transitionController.isShellTransitionsEnabled()
            ? transitionController.createTransition(TRANSIT_OPEN) : null;
    ...
}
```

### 4.2 创建 Transition

**代码路径**：`TransitionController.java:338`

```java
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
// WindowState.java:850
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
WindowManager: Calling onTransitionReady info={id=89 t=OPEN f=0x0 ...
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

**代码路径**：`Transitions.java:625`

动画开始前，`setupStartState()` 设置每个参与窗口的初始可见性：

```java
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
            // 打开的窗口：初始 show，alpha 从 0 开始便于淡入动画
            t.show(leash);
            t.setAlpha(leash, 0.f);
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

**代码路径**：`Transitions.java:818`

调整动画层级关系，将参与动画的 leash reparent 到 rootLeash 下：

```java
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
// TransitionController.java:1221
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
// WindowContainer.java
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

## 十一、关键日志与分析

### 11.1 正常动画生命周期日志

```
# 1. 创建 Transition
WindowManager: Creating Transition: TransitionRecord{xxx id=89 type=OPEN}

# 2. 收集参与窗口
WindowManager: Collecting in transition 89: ActivityRecord{xxx}

# 3. 同步完成
WindowManager: SyncGroup 89: Finished!

# 4. Core 侧准备完毕
WindowManager: Calling onTransitionReady info={id=89 t=OPEN ...}

# 5. Shell 侧接收并选择 Handler
WindowManagerShell: onTransitionReady (#89) ...
WindowManagerShell:  animated by DefaultTransitionHandler@xxx

# 6. 动画结束
WindowManagerShell: Transition animation finished (aborted=false), notifying core (#89)

# 7. Core 侧清理
WindowManager: Finish Transition (#89): ... finished=675.119ms
```

### 11.2 异常模式

| 异常 | 日志特征 |
|------|---------|
| 同步超时 | `Sync group N timeout` + `Unfinished container: ...` |
| 动画堆积 | `dispatchReady: track.mReadyTransitions.size() > 1, return, size = N` |
| commit 超时 | `WM sent Transaction ... but never received commit callback` |
| 动画时间过长 | `finished=` 字段显示秒级甚至无 Finish 日志 |

### 11.3 ProtoLog 开启

```bash
adb shell wm logging enable-text WM_DEBUG_WINDOW_TRANSITIONS WM_DEBUG_WINDOW_TRANSITIONS_MIN WM_DEBUG_SYNC_ENGINE
```

## 附录：关键文件索引

| 模块 | 文件路径 | 关键方法 |
|------|---------|---------|
| Core | `services/.../wm/TransitionController.java` | `createTransition()`, `finishTransition()` |
| Core | `services/.../wm/WindowContainer.java` | `enforceSurfaceVisible()` |
| Core | `services/.../wm/Transition.java` | `onTransactionReady()`, `calculateTargets()` |
| Core | `services/.../wm/BLASTSyncEngine.java` | `SyncGroup`, `finishNow()`, 超时 5000ms |
| Shell | `libs/WindowManager/Shell/.../transition/Transitions.java` | `onTransitionReady()`, `setupStartState()`, `setupAnimHierarchy()` |
| Shell | `libs/WindowManager/Shell/.../transition/DefaultTransitionHandler.java` | `startAnimation()` |
