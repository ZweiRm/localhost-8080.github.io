---
prev:
    text: '锁屏与解锁机制'
    link: '/framework/keyguard-lock-unlock'
next:
    text: '属性动画'
    link: '/framework/android-property-animation'
---

# App 冷启动全链路分析

一次 App 冷启动横跨 5 个进程、经历 14 个阶段，从用户手指触碰图标到界面可交互，整条链路可以归纳为三个大的阶段：

**准备阶段** — 谁来做、在哪做。Launcher 通过 Binder 把 Intent 交给 system\_server 的 ATMS；ATMS 在窗口层级树上创建 Task 和 ActivityRecord，同时创建一个 `TRANSIT_OPEN` 类型的 Shell Transition；随后**并行**触发两件事：通知 Launcher pause，以及通过 Zygote fork 出 App 新进程。两者都完成后，`realStartActivityLocked()` 将 `LaunchActivityItem` 下发到 App。

**绘制阶段** — 画什么、怎么画。App 走完 `onCreate → onResume` 生命周期后，`ViewRootImpl` 向 WMS 注册窗口（`addWindow`），等待 VSync 到来后执行 `performTraversals()`：先通过 `relayoutWindow()` 创建 Surface（`DrawState → DRAW_PENDING`），再 `measure → layout → draw`。`ThreadedRenderer` 将绘制指令录制为 DisplayList，交由 RenderThread 驱动 GPU 渲染，最终通过 `BLASTBufferQueue.queueBuffer()` 将 GraphicBuffer 提交给 SurfaceFlinger。绘制完成后 `finishDrawing()` 通知 WMS，DrawState 一路推进到 `HAS_DRAWN`。

**上屏阶段** — 什么时候可见。`BLASTSyncEngine` 确认所有参与者就绪后，将收集到的 `SyncTransaction` 原子合并，通过 `onTransactionReady()` 交给 Shell。Shell 执行 `startT.apply()` 使 App Layer 在 SurfaceFlinger 中变为可见，随后播放开场动画（Launcher 淡出 / App 滑入）。动画结束时 `finishT.apply()` 恢复状态。最后 WMS 将焦点切换到新窗口，App 收到 `onWindowFocusChanged(true)`——启动完成。

> **本文定位**：端到端串联文档。各阶段仅做链路级说明（做了什么、为什么、关键状态变化），详细源码分析链接到对应的专题文档。

## 涉及进程与模块

![涉及进程与模块](/img/android/full_chain/02_involved_modules.svg)

| 进程 | 关键模块 | 职责 |
|------|---------|------|
| **Launcher** | `ItemClickHandler`, `Activity`, `Instrumentation` | 发起启动请求，执行 pause |
| **system_server** | `ATMS`, `ActivityStarter`, `AMS`, `ProcessList` | 路由 Activity、管理生命周期、创建进程 |
| **system_server** | `WMS`, `WindowState`, `WindowStateAnimator`, `WindowSurfacePlacer` | 窗口管理、Surface 创建、布局计算、DrawState 流转 |
| **system_server** | `TransitionController`, `Transition`, `BLASTSyncEngine` | Shell Transition 动画协调、SyncGroup 同步 |
| **SystemUI** | `WM Shell`, `Transitions`, `DefaultTransitionHandler` | 动画执行（接收 `TransitionInfo`，驱动动画） |
| **SystemUI** | `StartingWindowController`, `SplashscreenWindowCreator` | StartingWindow 创建与移除 |
| **Zygote** | `ZygoteConnection`, `Zygote` | fork 新进程 |
| **App** | `ActivityThread`, `Activity`, `ViewRootImpl`, `Choreographer` | 生命周期、View 树创建、VSync 调度 |
| **App** | `ThreadedRenderer`, `RenderThread`, `BLASTBufferQueue` | 硬件加速渲染、缓冲区管理 |
| **SurfaceFlinger** | `SurfaceFlinger`, `HWC` | Layer 合成、帧输出 |

### 两条 Transaction 路径

启动过程中存在两条不同的 `SurfaceControl.Transaction` 提交路径，理解它们的区别对排查问题至关重要：

| 路径 | Transaction 类型 | 用途 | 触发时机 |
|------|-----------------|------|---------|
| **Sync 路径** | `SyncTransaction` | Transition 动画的原子提交 | `BLASTSyncEngine.finishNow()` 合并后通过 `onTransactionReady()` 交给 Shell，Shell 通过 `startT.apply()` 一次性提交 |
| **每帧路径** | `PendingTransaction` | 常规每帧 Surface 属性更新 | `WindowAnimator.animate()` 每帧遍历所有窗口，收集 Surface 变更后 `mTransaction.apply()` |

> **相关文档** → [SurfaceControl Transaction](./surfacecontrol-transaction.md)

## 总时序图

![App 冷启动总时序](/img/android/full_chain/01_overall_timeline.svg)

## 总调用链

![总调用链](/img/android/full_chain/03_call_chain.svg)

## 一、Launcher 发起启动请求（步骤 ①）

**做了什么**：用户点击图标后，Launcher 将触摸事件转化为 Intent，经过 `Instrumentation.execStartActivity()` 跨进程调用到 `ActivityTaskManagerService.startActivity()`。

**关键状态变化**：无。

**典型耗时**：1～5ms（Binder IPC 开销）。

**关键日志**：

| Tag | 日志 | 含义 |
|-----|------|------|
| `ActivityTaskManager` | `START u0 {intent} from uid N` | ATMS 收到启动请求 |

> **详细分析** → [应用启动流程 §1.1 流程概览](./activity-launching-process.md#11-流程概览)

## 二、ATMS 路由与窗口层级树操作（步骤 ②）

**做了什么**：ATMS 收到请求后，经过 `ActivityStarter.execute()` 完成以下操作：

1. **解析请求参数**：`Request.resolveActivity()` 解析 `resolveInfo` 和 `activityInfo`
2. **创建 ActivityRecord**：Activity 在 system_server 的代表，同时也是一个 `WindowToken`
3. **创建/获取 Task**：`getOrCreateRootTask()` 在 `DefaultTaskDisplayArea` 下创建 Task
4. **挂载 ActivityRecord 到 Task**：`setNewTask()` + `addOrReparentStartingActivity()`
5. **移动 Task 到顶部**：`Task.moveToFront()` 确保新启动的 Activity 在最上面
6. **创建 Shell Transition**：`TransitionController.createTransition(TRANSIT_OPEN)` 创建 Transition 并建立 SyncGroup
7. **触发 StartingWindow**：`Task.startActivityLocked()` → `showStartingWindow()` 添加启动窗口
8. **触发 Launcher pause 和进程创建**（并行）

**关键状态变化**：

- 窗口层级树新增 Task + ActivityRecord
- Shell Transition 进入 Collecting 状态
- StartingWindow 开始创建（异步，在 SystemUI 进程）

**典型耗时**：5～20ms。

**关键日志**：

| Tag | 日志 | 含义 |
|-----|------|------|
| `WindowManager` | `Creating Transition: TransitionRecord{id=N type=OPEN}` | Transition 创建 |
| `WindowManager` | `Collecting in transition N: ActivityRecord{...}` | ActivityRecord 被收集到 Transition |

> **详细分析**：
> - 启动请求处理 → [应用启动流程 §2. system_server 处理](./activity-launching-process.md#2-阶段一system_server-处理)
> - 窗口层级树 → [WMS 窗口层级树](./wms-window-hierarchy.md)
> - Shell Transition 创建 → [Shell Transition §四、Collecting 阶段](./ShellTransition.md#四collecting-阶段)
> - StartingWindow 添加 → [StartingWindow §添加流程](./StartingWindow.md#添加流程)

![ATMS 路由与 Transition 创建时序](/img/android/full_chain/06_atms_routing_sequence.svg)

## 三、Launcher Pause 与 Zygote Fork（步骤 ③，并行）

`TaskFragment.resumeTopActivity()` 同时触发两条并行路径：

### ③-A Launcher Pause

**做了什么**：`pauseBackTasks()` 遍历所有叶子 Task，对 Launcher 构建 `PauseActivityItem` 触发 pause。Launcher 执行完 `onPause()` 后，通过 `activityPaused()` 通知 system\_server。

**关键状态变化**：Launcher ActivityRecord 状态 → `PAUSING` → `PAUSED`。

### ③-B Zygote Fork 新进程

**做了什么**：`startProcessAsync()` → `ProcessList.startProcessLocked()` → `ZygoteProcess.start()` 通过 LocalSocket 通知 Zygote fork 子进程。新进程启动后执行 `ActivityThread.main()`，创建主线程 Looper，通过 `attachApplication()` Binder 回调注册到 AMS。

**关键状态变化**：新进程创建，`ApplicationThread` Binder 对象注册到 AMS。

**并发竞争**：两条路径执行顺序不确定。只有**两者都完成**后，才能进入步骤 ④ 的 `realStartActivityLocked()`。如果一方先完成，`realStartActivityLocked()` 会因条件不满足而直接 return，等另一方完成后再次触发。

**典型耗时**：
- Launcher pause：5～20ms
- Zygote fork：10～50ms

**关键日志**：

| Tag | 日志 | 含义 |
|-----|------|------|
| `ActivityManager` | `Start proc <pid>:<processName>/<uid> for activity ...` | 进程创建完成 |

> **详细分析**：
> - Pause 流程 → [应用启动流程 §二、completePause](./activity-launching-process.md#二阶段二----completepause)
> - 进程创建 → [应用启动流程 §三、触发进程创建](./activity-launching-process.md#三阶段三----触发进程创建)

![Zygote Fork 与进程注册时序](/img/android/full_chain/07_zygote_fork_sequence.svg)

## 四、realStartActivityLocked — 启动 Activity（步骤 ④）

**做了什么**：`ActivityTaskSupervisor.realStartActivityLocked()` 在确认 pause 完成且进程就绪后，构建 `ClientTransaction`，将 `LaunchActivityItem`（触发 `onCreate`）和 `ResumeActivityItem`（触发 `onResume`）下发到 App 进程。

**前置条件**：
1. 目标进程已创建（`wpc.hasThread() == true`）
2. 所有需要 pause 的 Activity 已完成 pause

**关键状态变化**：`ActivityRecord.setProcess(proc)` 将 ActivityRecord 绑定到进程（此后 `attachedToProcess()` 返回 true）。

> **详细分析** → [应用启动流程 §四、真正启动 Activity](./activity-launching-process.md#四阶段四----真正启动-activity)

## 五、Activity 生命周期（步骤 ⑤）

**做了什么**：App 进程收到 `ClientTransaction` 后依次执行：

1. **`handleLaunchActivity()`**：
   - `Instrumentation.newActivity()` 通过反射创建 Activity
   - `Activity.attach()` 创建 `PhoneWindow` 并关联 `WindowManager`
   - `Activity.onCreate()` → `setContentView()` 创建 DecorView + inflate 布局
2. **`Activity.onStart()`**
3. **`Activity.onResume()`**

此时 **View 树已创建但窗口尚未与 WMS 通信**。

**典型耗时**：
- Application.onCreate：0～500ms+（取决于 SDK 初始化）
- Activity.onCreate / inflate：20～200ms（取决于布局复杂度）

**关键日志**：

| Tag | 日志 | 含义 |
|-----|------|------|
| `ActivityTaskManager` | `Activity reported start: ActivityRecord{...}` | Activity onStart 完成 |

> **详细分析** → [Activity 启动流程详解](./activity-launching-process.md)

## 六、窗口创建与注册（步骤 ⑥）

**做了什么**：`handleResumeActivity()` 在 `onResume()` 之后调用 `wm.addView(decor)`：

1. **创建 ViewRootImpl**：App 端与 WMS 通信的核心桥梁
2. **ViewRootImpl.setView()**：
   - `requestLayout()` → 注册 VSync 回调（异步，等待下一帧）
   - `Session.addToDisplayAsUser()` → 同步 Binder 调用 `WMS.addWindow()`
3. **WMS.addWindow()**：
   - 创建 `WindowState`（初始 `DrawState = NO_SURFACE`）
   - 将 WindowState 挂载到 ActivityRecord（WindowToken）下
   - 存入 `mWindowMap`（key = IBinder, value = WindowState）

**关键时序**：`addWindow`（同步）先于 `relayoutWindow`（异步，等 VSync）执行。

**关键状态变化**：WindowState 创建，`DrawState = NO_SURFACE`。

**关键日志**：

| Tag | 日志 | 含义 |
|-----|------|------|
| `WindowManager` | `addWindow: Window{...} type=BASE_APPLICATION` | 窗口添加到 WMS |

> **详细分析**：
> - addWindow 流程 → [WMS 窗口显示流程 §第一步：addWindow](./window-rendering-process.md#第一步addwindow)
> - 窗口添加详解 → [WMS 窗口添加和移除](./window-add-remove.md)
> - DrawState 初始状态 → [DrawState §NO_SURFACE](./window-draw-state.md#no_surface--无-surface)

![addWindow 与 InputChannel 建立时序](/img/android/full_chain/08_add_window_sequence.svg)

## 七、VSync 到来 → performTraversals（步骤 ⑦）

**做了什么**：`requestLayout()` 通过 `Choreographer` 注册了 VSync 回调。VSync-app 信号到来时，`doFrame()` 按 INPUT → ANIMATION → TRAVERSAL 顺序执行，最终触发 `performTraversals()`：

1. **relayoutWindow()**：跨进程请求 WMS 创建 Buffer 类型的 `SurfaceControl`，并计算窗口大小/位置。WMS 创建 Surface 后设置 `DrawState = DRAW_PENDING`，Surface 通过出参返回 App。
2. **performMeasure() / performLayout()**：View 树的测量和布局。
3. **createSyncIfNeeded()**：创建 `SurfaceSyncGroup`，注册 `reportDrawFinished` 回调。
4. **performDraw()**：触发 View 树绘制。

**关键状态变化**：`DrawState: NO_SURFACE → DRAW_PENDING`（Surface 已创建但尚未绘制）。

**典型耗时**：relayoutWindow 5～15ms + measure/layout 5～50ms。

**关键日志**：

| Tag | 日志 | 含义 |
|-----|------|------|
| `WindowManager` | `Relayout Window{...}: oldVis=GONE newVis=VISIBLE` | relayoutWindow 创建 Surface |

> **详细分析**：
> - relayoutWindow → [relayoutWindow 详解](./relayoutWindow.md)
> - Surface 创建 → [WMS 窗口显示流程 §第二步：relayoutWindow](./window-rendering-process.md#第二步relayoutwindow)
> - DrawState DRAW_PENDING → [DrawState §DRAW_PENDING](./window-draw-state.md#draw_pending--等待绘制)
> - VSync/Choreographer → [DrawState §Choreographer VSync 机制](./window-draw-state.md#场景一创建-surface)

## 八、硬件加速渲染管线（步骤 ⑧）

本阶段是现有详解文档未覆盖的内容，此处适当展开。

`performDraw()` 触发硬件加速渲染流水线，整个过程跨越两个线程：

![渲染管线](/img/android/full_chain/05_rendering_pipeline.svg)

### 8.1 主线程：录制 DisplayList

`ThreadedRenderer.draw()`（line 833）首先调用 `updateRootDisplayList()`，遍历 View 树将每个 View 的绘制操作记录到 `RenderNode` 的 DisplayList 中。这是**录制**而非立即执行——类似于录制一段绘制脚本，稍后由 GPU 回放。

随后调用 `syncAndDrawFrame()`（line 566，JNI → native `nSyncAndDrawFrame`），将主线程状态同步到 RenderThread，由 RenderThread 接管后续 GPU 渲染。

### 8.2 RenderThread：GPU 渲染

RenderThread 是独立于主线程的渲染线程。`DrawFrameTask.drawFrame()` → `CanvasContext.draw()` 解析 DisplayList 中的绘制指令，转换为 GPU 指令（OpenGL ES 或 Vulkan），GPU 将渲染结果写入 `GraphicBuffer`。

### 8.3 BLASTBufferQueue：缓冲区提交

`BLASTBufferQueue`（line 28, `graphics/java/android/graphics/BLASTBufferQueue.java`）是 App 端的缓冲区队列管理器。RenderThread 通过 `dequeueBuffer()` 获取空闲 GraphicBuffer，GPU 写入后通过 `queueBuffer()` 提交给 SurfaceFlinger。

### 8.4 SurfaceFlinger 合成

SurfaceFlinger 在 VSYNC-sf 信号到来时，先通过 `commitTransactions()` 应用所有 `SurfaceControl.Transaction`（包括 `t.show()`、位置变更等），然后 `composite()` 将所有可见 Layer 通过 HWC（Hardware Composer）或 GPU 合成输出到屏幕。

**典型耗时**：GPU 渲染首帧 5～30ms + SurfaceFlinger 合成约 1 帧（8～16ms）。

> **相关文档** → [SurfaceControl Transaction](./surfacecontrol-transaction.md)

## 九、绘制完成通知与 DrawState 流转（步骤 ⑨）

**做了什么**：RenderThread 绘制完成后，通过 `SurfaceSyncGroup` 回调机制最终调用 `reportDrawFinished()` → `Session.finishDrawing()` 跨进程通知 WMS。

WMS 收到后触发 DrawState 状态机流转：

```
DRAW_PENDING → COMMIT_DRAW_PENDING → READY_TO_SHOW → HAS_DRAWN
     ↑                ↑                    ↑              ↑
finishDrawingLocked  requestTraversal   commitFinish    performShowLocked
                     触发 layout        DrawingLocked    → showRobustly()
```

1. **`finishDrawingLocked()`**：`DRAW_PENDING → COMMIT_DRAW_PENDING`
2. **`requestTraversal()`** 触发一次窗口 layout
3. **`commitFinishDrawingLocked()`**：`COMMIT_DRAW_PENDING → READY_TO_SHOW`，然后立即尝试 `performShowLocked()`
4. **`performShowLocked()`**：`READY_TO_SHOW → HAS_DRAWN`
5. **`prepareSurfaceLocked()` → `showRobustly()`**：执行 `t.show(mSurfaceControl)` 将 Surface 标记为可见

**关键理解**：`HAS_DRAWN` 只是逻辑状态标记，真正上屏还需要 `Transaction.apply()` 提交到 SurfaceFlinger。

![DrawState 流转](/img/android/full_chain/04_draw_state_flow.svg)

> **详细分析**：
> - DrawState 完整流转 → [DrawState 详解](./window-draw-state.md)
> - finishDrawingWindow → [WMS 窗口显示流程 §第三步：finishDrawingWindow](./window-rendering-process.md#第三步finishdrawingwindow)
> - SurfaceSyncGroup 机制 → [DrawState §COMMIT_DRAW_PENDING](./window-draw-state.md#commit_draw_pending--第一次绘制完成)

## 九-A、WMS performSurfacePlacement 大循环

上述 DrawState 流转并非自动发生，它由 WMS 端的 `performSurfacePlacement` 大循环驱动。这个循环在多个时机被触发（`addWindow` 后、`relayoutWindow` 中、`finishDrawing` 后），是 WMS 中最核心的机制之一。

**大循环执行流程**：

```
WindowSurfacePlacer.performSurfacePlacement()       // 最多循环 6 次
  → RootWindowContainer.performSurfacePlacementNoTrace()
    ├── ① updateFocusedWindowLocked()               // 焦点检查
    ├── ② applySurfaceChangesTransaction()           // 核心：布局 + Surface 属性更新
    │     ├── performLayout()                        // 计算每个窗口的 frame
    │     │     └── DisplayPolicy.layoutWindowLw()
    │     │         └── WindowLayout.computeFrames()
    │     ├── forAllWindows(mApplySurfaceChangesTransaction)  // 遍历所有窗口
    │     │     └── commitFinishDrawingLocked()       // DrawState 推进
    │     │         └── performShowLocked()           // → HAS_DRAWN
    │     ├── prepareSurfaces()                       // Surface show/hide/alpha
    │     │     └── showRobustly() → t.show(SC)
    │     └── activity.updateAllDrawn()               // allDrawn 判定
    ├── ③ handleResizingWindows()                    // 通知 App 窗口 resize
    ├── ④ mSyncEngine.onSurfacePlacement()           // 驱动 SyncGroup.tryFinish()
    └── ⑤ checkAppTransitionReady()                  // Transition 就绪检查
```

这个循环贯穿了步骤 ⑥（addWindow 后首次触发）到步骤 ⑨（finishDrawing 后再次触发）的整个过程。每次触发都可能推进 DrawState、更新 Surface 属性、检查 SyncGroup 完成状态。

> **详细分析**：
> - 窗口布局 → [relayoutWindow §二、服务端流程](./relayoutWindow.md#二服务端流程)
> - 可见性管理 → [可见性管理](./visibility-management.md)

## 十、SyncGroup 完成与 Shell Transition 动画（步骤 ⑩）

**做了什么**：窗口大循环中 `BLASTSyncEngine.onSurfacePlacement()` 检查 SyncGroup 中所有参与者是否完成绘制。当所有条件满足后：

1. **`tryFinish()` → `finishNow()`**：收集所有参与者的 `mSyncTransaction` 合并为一个原子 `startTransaction`
2. **`Transition.onTransactionReady()`**：
   - `commitVisibleActivities()` 更新可见性
   - `calculateTargets()` 计算动画目标
   - `buildFinishTransaction()` 构建 finishT（动画结束时 apply）
   - 通知 Shell 侧
3. **Shell 侧 `Transitions.onTransitionReady()`**：
   - `setupStartState()` 设置初始可见性（OPEN 窗口 alpha=0、TO_BACK 窗口在 finishT 中 hide）
   - `setupAnimHierarchy()` 将 leash reparent 到 rootLeash
   - 选择 `TransitionHandler` 播放动画（通常 `DefaultTransitionHandler`）
4. **动画播放**：Launcher 淡出 / 新 App 滑入
5. **`finishTransition()`**：动画结束，`finishT.apply()` 恢复窗口状态，`cleanupTransaction` 释放 leash

**超时机制**：`BLASTSyncEngine` 设置 5 秒超时，超时后强制进入下一阶段。

**典型耗时**：动画 200～500ms。

**关键日志**：

| Tag | 日志 | 含义 |
|-----|------|------|
| `WindowManager` | `SyncGroup N: Finished!` | 所有参与者绘制完成 |
| `WindowManager` | `Calling onTransitionReady info={id=N t=OPEN ...}` | Core 侧通知 Shell |
| `WindowManagerShell` | `Playing animation for (#N) ...` | Shell 开始播放动画 |
| `WindowManagerShell` | `Transition animation finished` | 动画结束 |
| `WindowManager` | `Finish Transition (#N): ... finished=NNNms` | Core 侧清理完成 |

> **详细分析** → [Shell Transition 机制](./ShellTransition.md)

![SyncGroup 完成到 Shell 动画时序](/img/android/full_chain/09_sync_to_shell_sequence.svg)

## 十一、焦点窗口切换（步骤 ⑫）

本阶段是现有详解文档未完整覆盖的内容，此处适当展开。

### 11.1 触发时机

窗口可见性变化、新窗口添加/移除、Activity 切换时，WMS 调用 `updateFocusedWindowLocked()` 重新计算焦点。在 App 启动场景中，焦点切换发生在新 App 窗口变为可见之后。

### 11.2 焦点计算

焦点更新的完整链路：

```
WMS.updateFocusedWindowLocked()                    // line 7261
  → RootWindowContainer.updateFocusedWindowLocked() // line 602 - 遍历所有 DisplayContent
    → DisplayContent.updateFocusedWindowLocked()    // line 4581
      → findFocusedWindow()                         // line 4555
        → forAllWindows(mFindFocusedWindow, true)   // 从上到下遍历窗口
      → mCurrentFocus = newFocus                    // 更新焦点
      → InputMonitor.setInputFocusLw()              // line 4686 - 通知 Input 系统
```

```java
// DisplayContent.java line 4555
WindowState findFocusedWindow() {
    mTmpWindow = null;
    forAllWindows(mFindFocusedWindow, true /* traverseTopToBottom */);
    if (mTmpWindow == null) {
        return null;
    }
    return mTmpWindow;
}
```

`mFindFocusedWindow`（line 940）是一个 lambda，对每个窗口检查 `canReceiveKeys()`，从上到下遍历，找到第一个满足以下条件的 `WindowState`：
- 可见（`isVisibleRequestedOrAdding()`）
- 可接收焦点（`canReceiveKeys()`：无 `FLAG_NOT_FOCUSABLE` 标志）
- 位于焦点 Display 上

### 11.3 通知 InputDispatcher

焦点更新后，通过 `InputMonitor` 将新的焦点窗口信息同步到 native 层的 `InputDispatcher`：

```java
// InputMonitor.java line 417
void setInputFocusLw(WindowState newWindow, boolean updateInputWindows) {
    final IBinder focus = newWindow != null ? newWindow.mInputChannelToken : null;
    if (focus == mInputFocus) {
        return;  // 焦点未变，直接返回
    }
    if (newWindow != null && newWindow.canReceiveKeys()) {
        newWindow.mToken.paused = false;
    }
    setUpdateInputWindowsNeededLw();
    if (updateInputWindows) {
        updateInputWindowsLw(false /* force */);  // 调度更新到 InputDispatcher
    }
}
```

### 11.4 App 收到焦点回调

焦点切换完成后，InputDispatcher 通过 InputChannel 将焦点事件发送到 App 进程，`ViewRootImpl` 收到通知：

```java
// ViewRootImpl.java line 12048
public void windowFocusChanged(boolean hasFocus) {
    synchronized (this) {
        mWindowFocusChanged = true;
        mUpcomingWindowFocus = hasFocus;
    }
    Message msg = Message.obtain();
    msg.what = MSG_WINDOW_FOCUS_CHANGED;
    mHandler.sendMessage(msg);  // 投递到主线程
}

// 主线程处理 → handleWindowFocusChanged() (line 5355)
//   → dispatchFocusEvent() (line 5446)
//     → mView.dispatchWindowFocusChanged(hasWindowFocus)
//       → Activity.onWindowFocusChanged(true)    ← App 启动完成的标志
```

`onWindowFocusChanged(true)` 通常被视为 App 启动完成、界面可交互的标志。

**关键日志**：

| Tag | 日志 | 含义 |
|-----|------|------|
| `input_focus` (EventLog 62001) | `Focus request ...` | WMS 请求焦点切换（`InputMonitor` line 581） |
| `input_focus` (EventLog 62001) | `Focus entering ...` | InputDispatcher 确认焦点切换（native 层） |

> **相关文档**：
> - 焦点窗口切换全链路 → [焦点窗口切换](./focus-window-switching.md)
> - 无焦点窗口 ANR → [无焦点窗口 ANR](./anr-no-focused.md)
> - Input 系统焦点派发 → [Input 系统 §Key 事件的派发](./input-system.md#key-事件的派发)

## 十二、首帧后的持续 Surface 更新

首帧上屏并不意味着 Surface 操作结束。动画播放期间及之后，`WindowAnimator` 通过 **PendingTransaction 路径** 持续驱动每帧的 Surface 属性更新：

```
WindowAnimator.animate()                        // 每帧由 Choreographer 触发
  ├── DisplayContent.prepareSurfaces()
  │     └── 每个 WindowContainer.prepareSurfaces()
  │         └── WindowStateAnimator.prepareSurfaceLocked(t)
  │             ├── t.setAlpha(mSurfaceControl, mShownAlpha)  // 透明度
  │             ├── t.setMatrix(...)                           // 变换矩阵
  │             └── showRobustly(t) / hide(t)                 // show/hide
  └── mTransaction.merge(dc.getPendingTransaction())
      └── mTransaction.apply()                               // 每帧 apply → SurfaceFlinger
```

**与 Sync 路径的区别**：
- **Sync 路径**（Transition 期间）：所有 Surface 变更收集到 `SyncTransaction`，由 `BLASTSyncEngine.finishNow()` 合并为一个原子 Transaction，通过 `onTransactionReady()` 一次性交给 Shell
- **PendingTransaction 路径**（常规每帧）：`WindowAnimator.animate()` 每帧遍历所有窗口，直接 `apply()` 到 SurfaceFlinger

Transition 动画结束后，`finishT.apply()` 恢复窗口状态，此后 Surface 更新完全切换到 PendingTransaction 路径。

## 十三、窗口可见性与 Transition Collect 的联系

窗口可见性变化（`setVisibility(true/false)`）与 Shell Transition 的 Collecting 阶段紧密关联：

- 当 `setVisibility(true)` 被调用时，如果当前有 Transition 正在 Collecting，该 WindowContainer 会被 `collect()` 到 Transition 中
- 可见性变更不会立即 apply 到 Surface，而是暂存在 `SyncTransaction` 中，等待 SyncGroup 完成后原子提交
- 这保证了多个窗口的可见性变化（如 Launcher hide + App show）能在同一帧原子提交，避免视觉闪烁

> **详细分析** → [可见性管理 §1.7 setVisibility 详细流程](./visibility-management.md#17-setvisibility-详细流程)

## 冷启动各阶段耗时参考

| 阶段 | 典型耗时 | 主要耗时原因 | 优化方向 |
|------|---------|-------------|---------|
| Launcher → ATMS | 1～5ms | Binder IPC 开销 | — |
| Zygote Fork | 10～50ms | 进程创建 + 内存映射 | USAP 预 fork 池 |
| Application.onCreate | 0～500ms+ | SDK 初始化、SP 读取等 | 懒加载、异步初始化 |
| Activity.onCreate / inflate | 20～200ms | 布局复杂度、View 层级深度 | 扁平化布局、ViewStub |
| measure / layout / draw | 5～50ms | View 树遍历、自定义 View | 减少 measure 次数 |
| GPU 渲染首帧 | 5～30ms | Shader 编译（首次）、纹理上传 | Shader 预热 |
| SurfaceFlinger 合成 | 8～16ms（约 1 帧） | 等待下一个 VSYNC-sf | — |
| Shell Transition 动画 | 200～500ms | 动画时长设定 | — |

## 关键类与文件速查

| 组件 | 关键类 | 源码路径 |
|------|--------|---------|
| Activity 管理 | `ActivityTaskManagerService` | `services/core/.../wm/ActivityTaskManagerService.java` |
| Activity 启动 | `ActivityStarter` | `services/core/.../wm/ActivityStarter.java` |
| Activity 栈 | `ActivityTaskSupervisor` | `services/core/.../wm/ActivityTaskSupervisor.java` |
| 进程管理 | `ProcessList` | `services/core/.../am/ProcessList.java` |
| App 主线程 | `ActivityThread` | `core/java/android/app/ActivityThread.java` |
| 事务框架 | `ClientTransaction`, `LaunchActivityItem` | `core/java/android/app/servertransaction/` |
| 窗口管理 | `WindowManagerService` | `services/core/.../wm/WindowManagerService.java` |
| 窗口状态 | `WindowState` | `services/core/.../wm/WindowState.java` |
| 窗口树根 | `RootWindowContainer` | `services/core/.../wm/RootWindowContainer.java` |
| View 树根 | `ViewRootImpl` | `core/java/android/view/ViewRootImpl.java` |
| VSync 协调 | `Choreographer` | `core/java/android/view/Choreographer.java` |
| 硬件渲染 | `ThreadedRenderer` (extends `HardwareRenderer`) | `core/java/android/view/ThreadedRenderer.java` |
| Surface 状态 | `WindowStateAnimator` | `services/core/.../wm/WindowStateAnimator.java` |
| Shell Transition | `Transition`, `TransitionController` | `services/core/.../wm/Transition.java` |
| 同步引擎 | `BLASTSyncEngine` | `services/core/.../wm/BLASTSyncEngine.java` |
| 缓冲区队列 | `BLASTBufferQueue` | `core/java/android/graphics/BLASTBufferQueue.java` |
| Input 焦点 | `InputMonitor` | `services/core/.../wm/InputMonitor.java` |

## 关键日志速查

| 阶段 | Tag | 关键日志 | 含义 |
|------|-----|---------|------|
| 启动请求 | `ActivityTaskManager` | `START u0 {intent} from uid N` | ATMS 收到启动请求 |
| 进程启动 | `ActivityManager` | `Start proc <pid>:<name>/<uid> for activity ...` | 进程创建完成 |
| Transition 创建 | `WindowManager` | `Creating Transition: TransitionRecord{id=N type=OPEN}` | Shell Transition 开始 |
| 窗口添加 | `WindowManager` | `addWindow: Window{...} type=BASE_APPLICATION` | 窗口注册到 WMS |
| 绘制完成 | `WindowManager` | `Finishing drawing window Window{...}: mDrawState=DRAW_PENDING` | App 绘制完成通知 |
| Surface 显示 | `WindowManager` | `SURFACE SHOW (performLayout): ...` | Surface show |
| 同步完成 | `WindowManager` | `SyncGroup N: Finished!` | 所有参与者就绪 |
| 同步超时 | `BLASTSyncEngine` | `Sync group N timeout` | 5 秒超时强制推进 |
| 动画开始 | `WindowManagerShell` | `Playing animation for (#N) ...` | Shell 播放动画 |
| 动画结束 | `WindowManagerShell` | `Transition animation finished` | 动画完成 |
| Transition 完成 | `WindowManager` | `Finish Transition (#N): ... finished=NNNms` | Core 清理完成 |
| 焦点切换 | `input_focus` (EventLog 62001) | `Focus request ...` / `Focus entering ...` | 焦点窗口变更（WMS 侧 `InputMonitor`，native 侧 `InputDispatcher`） |
| StartingWindow | `WindowManager` | `Creating SplashScreenStartingData` | StartingWindow 创建 |
| StartingWindow 移除 | `WindowManager` | `Schedule remove starting ActivityRecord{...}` | StartingWindow 移除 |

## 附录：ProtoLog 开启命令

```bash
# Shell Transition 相关
adb shell wm logging enable-text WM_DEBUG_WINDOW_TRANSITIONS WM_DEBUG_WINDOW_TRANSITIONS_MIN WM_DEBUG_SYNC_ENGINE

# StartingWindow 相关
adb shell wm logging enable-text WM_DEBUG_STARTING_WINDOW

# 焦点窗口相关
adb shell wm logging enable-text WM_DEBUG_FOCUS WM_DEBUG_FOCUS_LIGHT
```
