---
prev:
    text: '无焦点窗口 ANR'
    link: '/framework/anr-no-focused'
next:
    text: 'Android 16 新特性'
    link: '/framework/android16'
---

# Android 稳定性 - 泄漏与Crash

本文档系统介绍 Android 系统中常见的稳定性问题——Layer 泄漏、FD 泄漏、内存泄漏、Native Crash 以及死机重启的原理、诊断方法和工具使用。

![总览](/img/android/stability/01_stability_overview.svg)

## 第一章：Layer 泄漏

Layer 泄漏是 Android 系统稳定性中最常见也最严重的问题之一。SurfaceFlinger 规定最多只能创建 **4096 个 Layer**，一旦存留过多，会导致性能变差，出现内存不足、卡顿、发热等问题，严重时导致 system_server 被 OOM Killer 查杀，引发系统重启。

### 1.1 基础概念：Surface、Window、Layer

应用侧的 `Surface`，在 WMS 侧对应 `Window`，在 SurfaceFlinger 侧称为 `Layer`。

| 概念 | 所在进程 | 说明 |
|------|---------|------|
| **Surface** | App 进程 | 绘制 View 的画布，位置和大小由 Window 决定 |
| **Window** | system_server (WMS) | 显示应用内容的窗口，限制内容的位置和大小 |
| **Layer** | SurfaceFlinger | Surface 在 SurfaceFlinger 中对应的图层以及显存 |

![Surface/Window/Layer 关系](/img/android/stability/02_surface_window_layer.svg)

Android 显示由 **App 进程、system_server 进程、SurfaceFlinger 进程**三方配合完成：

1. **App 进程**：发起 Surface 创建请求，触发控件的测量、布局、绘制以及输入事件处理，主要在 `ViewRootImpl` 中触发。
2. **system_server 进程**：`WindowManagerService` 接收 App 请求，与 SurfaceFlinger 建立连接，发起具体的 Surface 创建请求，并管理 `SurfaceControl` 辅助对象。
3. **SurfaceFlinger 进程**：创建具体的 Layer，管理、合成所有图层，最终将内容显示到屏幕上。

### 1.2 WindowContainer 窗口层级结构

`WindowContainer` 是 Android 窗口管理系统中的基类，所有窗口容器都是它的子类。它定义了窗口容器的通用行为，包括添加/删除子容器、遍历 Window、Task 等。

```java
// WindowContainer.java line 156
class WindowContainer<E extends WindowContainer> extends ConfigurationContainer<E>
        implements Comparable<WindowContainer>, Animatable, SurfaceFreezer.Freezable,
        InsetsControlTarget
```

![WindowContainer 层级结构](/img/android/stability/03_windowcontainer_hierarchy.svg)

#### WindowState

一个 `WindowState` 对象代表一个窗口，保存了窗口的各个属性（大小、位置、可见性等）。

```java
// WindowState.java line 317
class WindowState extends WindowContainer<WindowState> implements WindowManagerPolicy.WindowState,
        InsetsControlTarget, InputTarget
```

#### WindowToken 容器类

能直接持有 `WindowState` 的容器类有三种：

| 容器类 | 持有的窗口类型 | 示例 |
|-------|-------------|------|
| `WindowToken` | App 之上的窗口 | StatusBar、NavigationBar |
| `ActivityRecord` | App 窗口 | Launcher、各应用 Activity |
| `WallpaperWindowToken` | App 之下的窗口 | ImageWallpaper |

```java
// WindowToken.java line 78
class WindowToken extends WindowContainer<WindowState> {

// ActivityRecord.java line 530
public final class ActivityRecord extends WindowToken
        implements WindowManagerService.AppFreezeListener {

// WallpaperWindowToken.java line 49
class WallpaperWindowToken extends WindowToken {
```

#### Task

`Task` 继承自 `TaskFragment`，是存放 `ActivityRecord` 的容器。一个 Task 对应一个 Activity 栈，可以包含多个 Activity，也可以包含子 Task。

```java
// Task.java line 283
class Task extends TaskFragment {

// TaskFragment.java line 156
class TaskFragment extends WindowContainer<WindowContainer> {
```

#### DisplayArea 体系

`DisplayArea` 表示显示器上的虚拟区域，用于组织和管理窗口，有三种类型：

| 类型 | 说明 |
|------|------|
| `BELOW_TASKS` | 只能存放层级低于 Task 的窗口（如壁纸） |
| `ABOVE_TASKS` | 只能存放层级高于 Task 的窗口（如系统弹窗） |
| `ANY` | 可以存放任意层级的窗口 |

核心子类包括：
- **`TaskDisplayArea`**：容纳应用 Activity 窗口及子窗口
- **`DisplayArea.Tokens`**：只能包含 `WindowToken` 的容器
- **`DisplayContent`**：代表一个实际屏幕，继承自 `RootDisplayArea`
- **`RootWindowContainer`**：窗口最顶层容器，管理所有 `DisplayContent`

```java
// RootWindowContainer.java line 191
public class RootWindowContainer extends WindowContainer<DisplayContent>
        implements DisplayManager.DisplayListener
```

**层级结构化的优点**：
- 各容器有明确的上下级关系，不越级处理，边界清晰。
- 保证窗口不越界——例如 Launcher 永远不可能高于 StatusBar，也不会低于 Wallpaper。

### 1.3 Surface 的创建与销毁

> 泄漏问题，多数是创建的 Layer 后续没有及时销毁。最终导致 Composition layers 和 Offscreen Layers 逐渐累积，超过 4096 个 layer 时报错。

#### Surface 创建流程

`ViewRootImpl` 创建后，`Surface` 和 `SurfaceControl` 作为全局变量被创建：

```java
// ViewRootImpl.java line 1070
public final Surface mSurface = new Surface();
private final SurfaceControl mSurfaceControl = new SurfaceControl();
```

初始化流程：

1. `ViewRootImpl.setView()` → `requestLayout()` → 下一个 Vsync 时执行 `performTraversals()`
2. `performTraversals()` → `relayoutWindow()` → 通过 Binder 调用 WMS 的 `relayoutWindow()`
3. **WMS 侧**通过 `createSurfaceControl()` → `WindowSurfaceController` → `SurfaceControl.Builder.build()` → `nativeCreate()` 完成 native 层创建
4. **App 侧**通过 `SurfaceControl.copyFrom()` 获得 SurfaceControl 的 native 指针
5. `relayout` 完成后，通过 `updateBlastSurfaceIfNeeded()` 初始化 Surface

#### Surface 销毁流程

以 Activity Stop 为例：App 端执行 `StopActivityItem` 流程，server 端从 `activityStopped()` 开始执行 Surface 移除。

核心销毁方法见下一节 SurfaceControl 相关内容。

### 1.4 Transaction 机制

`Transaction` 是应用与 SurfaceFlinger 交流的方式之一。应用打开一个 Transaction，设置各种属性操作，最后通过 `apply` 提交给 SurfaceFlinger 处理。

**主要操作**：

| 类型 | 操作 | 说明 |
|------|------|------|
| **创建** | `SurfaceControl` 构造 | 通过 `SurfaceControl.Builder.build()` |
| | `copyFrom` | 同步和替换 SurfaceControl 对象 |
| | `readFromParcel` | 从 Parcel 中读取 SurfaceControl 状态（IPC 场景） |
| | `mirrorSurface` | 创建镜像 Surface |
| **释放** | `remove` | 调用 reparent(null) + release() |
| | `reparent` | 将 SurfaceControl 的 parent 置为 null |
| | `release` | 释放 SurfaceControl 对象 |

### 1.5 SurfaceFlinger Layer 机制

#### SurfaceControl、LayerHandle、Layer 关系

`SurfaceControl` 是暴露给外部进程用于操控 SurfaceFlinger 中 Layer 的句柄。实例化一个 SurfaceControl 时，会创建一个对应的 Layer，并持有该 Layer 的句柄（`LayerHandle`），通过 LayerHandle 管理 Layer 的保留和销毁。

![SurfaceControl/LayerHandle/Layer 类关系](/img/android/stability/06_surfacecontrol_class_relation.svg)

![SurfaceControl/LayerHandle/Layer 生命周期](/img/android/stability/04_surfacecontrol_lifecycle.svg)

#### Layer 的创建

SurfaceControl 的创建有三种方式：

1. **`SurfaceControl.Builder.build()`**：创建新的 SurfaceControl 和 Layer 对象
2. **`SurfaceControl.copyFrom()`**：拷贝创建，内部共享同一个 Layer
3. **`SurfaceControl(Parcel in)`**：通过 Parcelable 创建，用于 IPC 场景

```java
// ColorFade.java line 628
final SurfaceControl.Builder builder = new SurfaceControl.Builder()
        .setName("ColorFade")
        .setSecure(isSecure)
        .setCallsite("ColorFade.createSurface");
// ... 设置属性后 build
mSurfaceControl = builder.build();
```

创建完成后，客户端 SurfaceControl 持有 `sp<LayerHandle>` 引用，LayerHandle 持有 `sp<Layer>` 引用，通过操作 LayerHandle 即可找到对应的 Layer。

#### Layer 的销毁

SurfaceControl 销毁有两种方式：

**方式一：`SurfaceControl.release()`**

```java
// SurfaceControl.java line 1825
public void release() {
    if (mNativeObject != 0) {
        if (SurfaceControlRegistry.sCallStackDebuggingEnabled) {
            SurfaceControlRegistry.getProcessInstance().checkCallStackDebugging(
                    "release", null, this, null);
        }
        mFreeNativeResources.run();
        mNativeObject = 0;
        mNativeHandle = 0;
        // ...
    }
}
```

此方法销毁客户端 SurfaceControl 并将 LayerHandle 引用计数减一，但不一定同步销毁 SurfaceFlinger 中的 Layer——如果 Layer 存在 Parent，它会作为 **Offscreen Layer** 添加到 Offscreen 列表中，待 Parent 释放时才析构。

**方式二：`Transaction.remove()`**

```java
// SurfaceControl.java line 5196
public Transaction remove(@NonNull SurfaceControl sc) {
    reparent(sc, null);  // 先将 Parent 置为 null
    sc.release();         // 再执行 release
    return this;
}
```

此方法同时释放客户端和服务端资源，确保 Layer 能被正确销毁。

**确保 Layer 正常销毁的条件**：所有引用该 LayerHandle 的 SurfaceControl 都通过 `release()` 释放，且通过 `reparent(null)` 将父 Layer 置空。

#### Layer 泄漏的主要原因

1. **SurfaceControl 操作不合理**
   - 使用完毕后没有执行 `release()` 释放
   - 存在父 SurfaceControl 时没有执行 `reparent(null)`
   - 创建了多份 SurfaceControl 副本，没有对所有副本执行释放

2. **LayerHandle 操作不合理**
   - SurfaceControl 未析构，持有 LayerHandle 引用
   - ComposerState 未析构，持有 LayerHandle 引用

3. **Layer 操作不合理**
   - 释放时没有将 Parent Layer 置空
   - 仅释放 Parent Layer，未释放子 Layer

### 1.6 SurfaceControl 引用关系与 GC 机制

理解 SurfaceControl 的引用关系对于分析 Layer 泄漏问题至关重要。在 Hprof 中，一个 SurfaceControl 通常有三类引用。

#### NativeAllocationRegistry 与 sun.misc.Cleaner

SurfaceControl 在创建时会调用 `assignNativeObject()`，通过 `NativeAllocationRegistry` 关联 Java 对象与 native 对象：

```java
// SurfaceControl.java line 1049
private void assignNativeObject(long nativeObject, String callsite) {
    if (mNativeObject != 0) {
        release();
    }
    if (nativeObject != 0) {
        mFreeNativeResources =
                sRegistry.registerNativeAllocation(this, nativeObject);
    }
    mNativeObject = nativeObject;
    // ...
}
```

`NativeAllocationRegistry` 利用 **虚引用（PhantomReference）** 感知 Java 对象被回收的时机，自动回收 native 内存：

- `Cleaner` 继承自 `PhantomReference<Object>`，持有 SurfaceControl 的引用（referent）
- 新创建的 Cleaner 存储在双向链表中
- `CleanerRunner` 持有 Cleaner 对象，在调用 `run()` 时执行 native 资源释放

SurfaceControl native 内存的释放时机：
1. **主动调用** `SurfaceControl.release()` 时触发 `mFreeNativeResources.run()`
2. **被动回收**：Java 层 SurfaceControl 不可达时，由 GC 触发 `Cleaner.clean()`

#### FinalizerReference 机制

`FinalizerReference` 是一种管理重写了 `finalize()` 方法的对象终结的特殊引用类型。

**基本流程**：
1. 对象不再被强引用持有时，`FinalizerReference` 将其加入队列等待执行 `finalize()`
2. 守护线程 `FinalizerDaemon` 从队列取出对象执行 `finalize()`
3. `finalize()` 执行完成后，引用被清除，对象变为完全不可达状态

**需要两次 GC 才能回收**：
- **第一次 GC**：发现已无 FinalizerReference 以外的引用，加入 ReferenceQueue
- `FinalizerDaemon` 守护线程执行 `finalize()`，解除引用
- **第二次 GC**：发现对象不再被引用，标记为不可达，最终清除

> 系统定义了 `FinalizerWatchdogDaemon` 监控 `FinalizerDaemon` 线程运行状态，超时会抛出异常。

#### SurfaceControlRegistry (WeakHashMap)

SurfaceControl 通过 `SurfaceControlRegistry.add()` 将 `<SurfaceControl, timestamp>` 添加到 `WeakHashMap` 中，用于跟踪状态和 dump 操作。

```java
// SurfaceControlRegistry.java line 145
@GuardedBy("sLock")
private final WeakHashMap<SurfaceControl, Long> mSurfaceControls;
```

`WeakHashMap` 使用弱引用包装键对象，当键不再被强引用持有时会被 GC 回收，对应条目自动清除。

#### Hprof 分析中的 SurfaceControl 信息

在 Hprof 中 SurfaceControl 的 `mName` 字段包含关键信息：
```
// #183419 是 layerId
// @0x68a9d0a 是 SurfaceControl 的 hashcode
DefaultTransition Dim Layer for - Surface(name=ActivityRecord{...}#183419)/@0x68a9d0a#183993
```

FinalizerReference 显示 `referent` 表示对象被引用，`zombie` 表示已被标记为可回收但 finalize 尚未调用。

### 1.7 Shell Transition 与 Layer 泄漏

Android 引入 Shell Transition 后，如果没有及时处理好 Transition 的状态，容易引起 Transition 堆积导致 Layer 泄漏。

#### 整体流程

![Shell Transition 流程](/img/android/stability/05_shell_transition_flow.svg)

Shell Transition 分为以下阶段：

| 阶段 | 说明 |
|------|------|
| **Trigger** | 任何导致窗口变化的操作触发 Transition |
| **Create/Collecting** | 创建 Transition，记录参与的容器 |
| **Sync** | 等待所有容器准备就绪（如完成内容重绘） |
| **onTransitionReady** | 计算相关信息，做动画准备 |
| **Playing** | 加载动画资源，执行动画 |
| **Finish** | 动画结束，处理收尾工作 |

#### 泄漏相关的关键日志

**Transition 堆积**——某个 Transition 没有正常 finish，后续 Transition 被 merge 或堆积：

```
V WindowManagerShell: Transition (#35193) ready while (#35190) is still animating.
    Notify the animating transition in case they can be merged
```

**mReadyTransitions 积压**——已准备就绪但无法执行的 Transition：

```
I ShellTransitions: track.mReadyTransitions.size() > 1, return, active = (#24148)
```

**SYNC 超时**——SurfaceFlinger onCommitted 回调超时（3.5s）：

```
E BLASTSyncEngine: WM sent Transaction to organized, but never received commit callback.
    Application ANR likely to follow.
```

### 1.8 Layer 泄漏监控

#### dma-buf 内存占用监控

Kernel 在 `/sys/kernel/dmabuf/buffers` 目录下暴露了所有 dma-buf 对象信息：

```bash
# 查看 dma-buf 对象的创建者和大小
adb shell cat /sys/kernel/dmabuf/buffers/<inode>/exporter_name
adb shell cat /sys/kernel/dmabuf/buffers/<inode>/size

# 查看进程的 dma-buf fd 引用
adb shell cat /proc/<pid>/fdinfo/<fd>
# 输出中 exp_name 开头的表示 dma-buf 对象

# 查看进程 mmap 的 dma-buf 对象
adb shell cat /proc/<pid>/maps | grep /dmabuf
```

**监控原理**：

1. 扫描 `/sys/kernel/dmabuf/buffers/{inode}` 下全部 size 文件获取 dma-buf 总大小
2. 超过阈值（默认 2560MB）时，遍历各进程 fdinfo 和 maps 获取引用信息
3. 计算各进程的 dma-buf RSS 和 PSS 占用
4. 找到超标 Top1 进程，抓取日志上报
5. 执行自动恢复策略

#### Layer 数量监控

SurfaceFlinger 维护了当前已创建 Layer 数量（`mNumLayers`），超过 4096 时拒绝新建请求。

**监控流程**：

1. 定时轮询（每 150 秒）查询 `mNumLayers`
2. 超过阈值（3500 个）时抓取 debug 日志（含 systemui/home/system_server 的 hprof）
3. 执行自动恢复策略

### 1.9 Layer 泄漏典型问题模式

基于历史问题分析，Layer 泄漏主要分为以下类型：

#### 类型一：Transition 堆积

**场景**：Transition 没有正常 finish，导致后续 Transition 被 merge 或堆积。

**典型日志模式**：
```
// 同一个 Transition 一直在 playing 状态
V WindowManagerShell: Transition (#N+1) ready while (#N) is still animating.
// 后续 Transition 持续堆积
I ShellTransitions: track.mReadyTransitions.size() > 1, return, active = (#N)
// dma-buf 超标
E Memory: Warring!!! dma-buf leak: xxxkB
// 最终 OOM 导致重启
E: Out of memory: Kill process <pid> (system_server) score 0 or sacrifice child
```

#### 类型二：SYNC 状态异常

**场景**：abort Transition 时未正确清空 `mSyncGroup`，导致 `finishSync` 无法正常结束 sync 状态。

**关键代码路径**：

当 `mSyncState == SYNC_STATE_NONE` 时，`finishSync` 会提前返回，**不会清空 `mSyncGroup`**。如果之前 abort Transition 时已将 `mSyncState` 置为 `SYNC_STATE_NONE` 但未清空 `mSyncGroup`，后续每次 `finishSync` 都会因为 `syncGroup != group` 而跳过 merge 操作。

```java
// WindowContainer.java line 4382
void finishSync(Transaction outMergedTransaction, BLASTSyncEngine.SyncGroup group,
        boolean cancel) {
    // ...
    if (mSyncState == SYNC_STATE_NONE) return;  // 提前返回，不会执行后续的 mSyncGroup = null
    final BLASTSyncEngine.SyncGroup syncGroup = getSyncGroup();
    if (syncGroup != null && group != syncGroup) return;  // group 不匹配，直接返回
    // ...
    outMergedTransaction.merge(mSyncTransaction);  // mSyncTransaction 中的操作不会被 merge
    // ...
    mSyncState = SYNC_STATE_NONE;
    mSyncGroup = null;
}
```

**后果**：WindowToken 的 `mSyncTransaction` 中的 reparent 操作永远不会执行，Leash 无法删除，Layer 泄漏逐步累积。

**典型日志**：
```
I WindowManager: finishSync: return for different sync group group=@A syncGroup=@B
    mSyncGroup=@B this=WindowToken{...}
```

#### 类型三：动画 Leash 泄漏

**场景**：动画创建的 Leash SurfaceControl 在动画结束后未被正确释放。

**诊断方法**：
1. 查看 `SurfaceControlRegistry` 中泄漏 Layer 的 Callsite
2. 通过 Hprof 定位对应 SurfaceControl 的引用链
3. 确认是业务异常持有 Leash 还是框架流程问题

#### 类型四：Binder 资源耗尽

**场景**：应用短时间内大量启动 Activity，耗尽系统 Binder 资源。

**典型日志**：
```
// 频繁启动 Activity
I ActivityTaskManager: START u0 {cmp=...} with LAUNCH_MULTIPLE result code=102
// Binder buffer 耗尽
W BpBinder: Large or Failed outgoing transaction of 128 bytes
E JavaBinder: !!! FAILED BINDER TRANSACTION !!!
// 导致 DeadSystemException
W Monkey: // CRASH: ... android.os.DeadSystemException
```

### 1.10 Layer 泄漏诊断方法

#### 诊断步骤

1. **查看 Offscreen/Visible Layers 信息**
   - Offscreen Layer：LayerHandle 未释放，但 Parent Layer 已释放
   - Visible Layers：LayerHandle 未释放，Parent Layer 也未释放
   - 路径：`stability/resleak/layersleak/`

2. **分析 Hprof**
   - 搜索 `SurfaceControl`，通过 Callsite 定位对应对象
   - 查看引用链，定位被谁持有
   - 区分系统问题还是 App 业务问题

3. **区分全局变量和局部变量**
   - 全局变量需要调用 `release()` 释放
   - 局部变量移出作用域后自动释放

#### SurfaceControl 动态日志

开启方式：
```bash
# 监控指定 LayerName 的 SurfaceControl 创建和销毁
adb shell setprop persist.sys.sc.dynamic.log LayerName
# 例如监控 leash 泄漏
adb shell setprop persist.sys.sc.dynamic.log 'animation-leash'
# 多个同时监控
adb shell setprop persist.sys.sc.dynamic.log "'Transition Root',WindowToken"
# 过滤日志
adb logcat | grep -iE ': sc\.'
```

日志包含 SurfaceControl 的三种创建方式（construct/readFromParcel/copyFrom）和销毁（release）的调用栈。

#### 快速确认泄漏进程

1. 使用 MAT 打开 system_server 的 hprof
2. 查看 `SurfaceControl` 和 `Transaction` 对象数量
3. 如果 system_server 中 SC 数量异常大（接近 4096），直接分析引用关系
4. 如果 system_server 正常，分析 systemui 和 home 的 hprof

## 第二章：FD 泄漏

### 2.1 文件描述符基础

Linux 系统中"一切皆文件"，文件是操作系统中"数据对象"的抽象。文件描述符（fd）是操作系统提供给上层操控这些对象的"句柄"。

进程的 fd 上限为 **32768**。操作系统限制 fd 数量就是在限制进程通过 fd 能操控的资源数量。

#### 内核数据结构

与 fd 相关的四个关键结构体：

| 结构体 | 说明 |
|--------|------|
| `task_struct` | 包含 `files_struct` 指针，描述进程打开的文件信息 |
| `files_struct` | 包含文件描述符表 `fdtable` |
| `fdtable` | fd 数组，将 fd 编号映射到 `file` 结构体 |
| `struct file` | 描述打开的文件，包含 `f_op` 操作表和 `f_path` 路径 |

```c
// include/linux/sched.h
struct task_struct {
    struct files_struct *files;
};
```

### 2.2 FD 与 Layer 泄漏的关系

SurfaceControl 中包含 fd 计数。**Layer 泄漏必然引发 FD 泄漏**——因为每个 Layer 关联的 SurfaceControl 会持有 fd 资源。

### 2.3 FD 泄漏判断

FD 监控阈值为 **5000**。需要关注：

1. 查看 `fd_leak` 文件中的 `Hold Fd Nums Change` 计数
2. 判断是持续增加还是在阈值附近浮动
3. 如果短暂超出后回落，需要进一步确认引用类型

> 超过阈值 5000 本身不会引起系统异常，监控的目的是发现可能存在的问题，存在一定误报率。

### 2.4 FD 泄漏处理方向

1. **解决泄漏根因**：Layer 泄漏必然引发 FD 泄漏，优先解决 Layer 泄漏问题
2. **误报甄别**：FD 使用数量峰值容易短暂超过阈值，不代表真正泄漏，需要观察趋势

## 第三章：内存泄漏

### 3.1 Java 内存泄漏

Java 内存泄漏是指对象不再使用但仍被强引用持有，无法被 GC 回收。

#### MAT 工具使用

MAT（Eclipse Memory Analyzer Tool）是分析 Java Heap Dump 的主要工具。

**安装**：
- 下载地址：https://eclipse.dev/mat/download/
- 需要 JDK 17：`sudo apt-get install openjdk-17-jdk`

**Hprof 转换**：
```bash
# Android Hprof 需要转换为标准 Java Hprof 格式
<Android SDK>/platform-tools/hprof-conv input.hprof output.hprof
```

**Hprof 生成方法**：
```bash
# 通过 adb 命令
adb shell "am dumpheap $(pidof system_server) /data/local/tmp/system_server.hprof"
adb shell "am dumpheap $(pidof com.android.systemui) /data/local/tmp/systemui.hprof"
```

#### 关键分析功能

| 功能 | 说明 |
|------|------|
| **Histogram** | 列出每个类的实例数量和内存占用 |
| **Dominator Tree** | 按对象大小排序，分析引用关系 |
| **OQL** | 类 SQL 的查询语言，搜索满足条件的对象 |
| **Leak Suspects** | 自动分析内存泄漏可能原因 |

**Shallow Heap vs Retained Heap**：
- **Shallow Heap**：对象本身占用内存，不含引用对象
- **Retained Heap**：对象被 GC 回收后能释放的总内存（包含引用链上所有对象）

#### 查看引用关系

1. **List objects** → with incoming references：查看谁引用了该对象
2. **List objects** → with outgoing references：查看该对象引用了谁
3. **Merge Shortest Paths to GC Root**（排除 weak/soft/phantom 引用）：找到强引用路径

> 带黄点的对象表示可被 GC Roots 访问到，无法被回收。

#### OQL 查询

```sql
-- 查询所有 ActivityRecord 实例
SELECT * FROM instanceof com.android.server.wm.ActivityRecord

-- 查询 SurfaceControl 的 mName 字段
SELECT mName.value.toString() FROM android.view.SurfaceControl

-- 按名称过滤
SELECT * FROM android.view.SurfaceControl
WHERE mName.value.toString().contains("animation-leash")
```

#### GC Root 类型

| GC Root 类型 | 说明 |
|-------------|------|
| System Class | bootstrap classloader 加载的类 |
| JNI Local/Global | native 代码中的局部/全局变量 |
| Thread | 存活线程 |
| Java Local | 线程栈中的局部变量 |
| Busy Monitor | synchronized 锁引用的对象 |
| Finalizable | finalize 队列中等待执行的对象 |

**MAT 打开大文件失败**：
修改 `MemoryAnalyzer.ini` 中 `-Xmx` 为 8g 或 16g，或启动时指定：
```bash
./MemoryAnalyzer -Xmx8g
```

### 3.2 Native 内存泄漏

Native 内存泄漏指 C/C++ 代码中分配的内存未正确释放。分析工具包括 simpleperf/perf 火焰图。

## 第四章：Native Crash

### 4.1 概念

Native Crash 指发生在 C/C++ 代码层的崩溃。当 Native 代码执行非法操作时，Linux 内核向进程发送信号（Signal），进程终止并产生崩溃信息。

**与 Java Crash 的对比**：
- Java Crash：有清晰的异常堆栈，易于定位
- Native Crash：日志是原始机器指令地址和内存映射，需要工具解析

### 4.2 Tombstone 分析

Native Crash 发生时，Android 会生成 Tombstone 文件保存到 `/data/tombstones/tombstone_xx`。

#### 关键字段

```
ABI: 'arm64'                     # 体系结构
Timestamp: 2025-05-25 04:02:34   # 发生时间
Cmdline: com.android.systemui    # 程序名
pid: 4007, tid: 4228, name: wmshell.anim  # 进程/线程信息
signal 11 (SIGSEGV), code 1 (SEGV_MAPERR), fault addr 0x...  # 信号和错误地址
Abort message: '...'             # 中止消息
```

#### 常见信号类型

| 信号 | 子类型 | 说明 |
|------|--------|------|
| **SIGSEGV** | SEGV_MAPERR | 地址不在进程映射中 |
| | SEGV_ACCERR | 没有访问权限 |
| **SIGABRT** | — | 程序主动退出（abort()、raise()） |
| **SIGILL** | ILL_ILLOPC | 非法操作码 |
| | ILL_ILLTRP | 非法 trap |
| **SIGBUS** | BUS_ADRALN | 访问地址未对齐 |
| | BUS_ADRERR | 访问不存在的物理地址 |
| **SIGFPE** | FPE_INTDIV | 整数除以 0 |
| | FPE_FLTDIV | 浮点数除以 0 |

#### 堆栈分析

```
backtrace:
  #00 pc 0xNNNN  /system/lib64/libgui.so (ClassName::method+offset) (BuildId: xxx)
  #01 pc 0xNNNN  /system/lib64/libgui.so (...)
  ...
```

- `pc`：程序计数器偏移
- 括号内是符号化后的函数名和偏移
- `BuildId` 用于匹配符号文件

#### 寄存器分析要点

- `x0`：通常是 this 指针或第一个参数
- `x8`：如果与 fault addr 相同，说明该寄存器持有非法地址
- `pc`：崩溃时的程序计数器，指向出错的库和函数
- `lr`：链接寄存器，保存返回地址

### 4.3 分析工具

#### core-parser

[OpenCoreAnalysisKit](https://github.com/Penguin38/OpenCoreAnalysisKit) 是 Core 文件分析工具，支持：
- 解析 Java 数据结构
- 解析 Java 线程调用栈
- 从 Core 文件提取 Java Heap Profile
- dumpsys 服务
- 查询全局强引用、弱引用

**环境要求**：Linux 系统，需要 cmake (>= 3.21.1)、clang、NDK。

#### GDB

GDB 可用于更深入的 native 层调试：
- 加载 core dump 文件
- 查看内存内容
- 分析寄存器状态
- 反汇编崩溃点附近的指令

## 第五章：SurfaceFlinger 动态日志

SurfaceFlinger 提供了多种动态日志用于监控和诊断难以复现的问题。

### 5.1 日志类型

| 日志类型 | 开启命令 | 用途 |
|---------|---------|------|
| VRI/BBQ 日志 | `adb shell setprop persist.sys.sf.dynamic.log true` | 监控 ViewRootImpl 和 BlastBufferQueue |
| SF 日志 | `adb shell setprop persist.vendor.mi_sf.dynamic.log true` | 监控 SurfaceFlinger |
| SC Layer 日志 | `adb shell setprop persist.sys.sc.dynamic.log LayerName` | 监控指定 Layer 的 SurfaceControl |

### 5.2 DRAW_PENDING 问题诊断

应用 ANR 时 WindowState 状态为 DRAW_PENDING，表示 App 调用了 `addToDisplay()` 但 WMS 未收到绘制完成回调。

**常见原因**：
- App `onDraw()` / `onResume()` 执行时间过长
- UI 线程未发送绘制请求（`dispatchOnPreDraw()` 返回 cancelDraw）
- 延迟共享元素过渡动画

**诊断开关**：
```bash
# 方式一：dumpsys（立即生效，重启失效）
adb shell dumpsys gfxinfo com.example.app debuglog true
# 方式二：setprop（长期有效）
adb shell setprop persist.sys.sf.dynamic.log true
# 过滤日志
adb logcat | grep -iE ': vri\.'
```

**简略流程**：
Setup → registerCallbacksForSync → Received frameCommittedCallback → reportNextDraw → reportDrawFinished

### 5.3 Buffer 流转问题诊断

应用 ANR 时主线程等待 RenderThread 完成命令（nSyncAndDrawFrame / nSetStopped）。

**常见原因**：
- `dequeueBuffer` 等待无可用 buffer（apply 后未收到 release 回调）
- `queueBuffer` 等待（syncTransaction 未完成）
- Fence 未释放（驱动层原因）

**诊断开关**：
```bash
# App 进程日志
adb shell dumpsys gfxinfo com.example.app debuglog true
# SF 进程日志
adb shell dumpsys SurfaceFlinger debuglog true
# 过滤
adb logcat | grep -iE ' sf\.| bbq\.'
```

**Buffer 流转简略流程**：
dequeueBuffer → queueBuffer → acquireNextBufferLocked → setTransactionState → gatherBufferInfo → transactionReadyBufferCheck → sendCallbacks → releaseBufferCallback

## 第六章：诊断工具速查

### 6.1 常用 adb 命令

```bash
# 生成 Hprof
adb shell "am dumpheap $(pidof system_server) /data/local/tmp/system_server.hprof"
adb shell "am dumpheap $(pidof com.android.systemui) /data/local/tmp/systemui.hprof"

# 转换 Hprof
hprof-conv input.hprof output.hprof

# 查看 Layer 数量（dump SurfaceFlinger）
adb shell dumpsys SurfaceFlinger

# 查看 dma-buf 使用情况
adb shell cat /sys/kernel/dmabuf/buffers/<inode>/size

# 查看进程 fd 数量
adb shell ls /proc/<pid>/fd | wc -l

# 动态日志开关
adb shell setprop persist.sys.sf.dynamic.log true           # VRI/BBQ
adb shell setprop persist.vendor.mi_sf.dynamic.log true     # SurfaceFlinger
adb shell setprop persist.sys.sc.dynamic.log 'LayerName'    # SurfaceControl

# 查看离线日志（可能需要解压）
adb shell ls /data/local/tmp/stability/resleak/layersleak/
```

### 6.2 MAT 常用 OQL

```sql
-- 查询所有 SurfaceControl 对象
SELECT * FROM android.view.SurfaceControl

-- 查询含特定名称的 SurfaceControl
SELECT * FROM android.view.SurfaceControl
WHERE mName.value.toString().contains("animation-leash")

-- 查询所有 ActivityRecord
SELECT * FROM instanceof com.android.server.wm.ActivityRecord

-- 查询 DisplayContent
SELECT * FROM instanceof com.android.server.wm.DisplayContent
```

### 6.3 关键日志过滤

```bash
# Layer 泄漏相关
grep -iE 'layer leak|Out of memory|dma-buf leak' logcat.txt

# Transition 堆积
grep -iE 'mReadyTransitions.size|is still animating|Merge into' logcat.txt

# SYNC 状态异常
grep -iE 'finishSync.*return for different|Trying to move non-collecting' logcat.txt

# Binder 异常
grep -iE 'FAILED BINDER TRANSACTION|DeadSystemException' logcat.txt

# FD 泄漏
grep -iE 'fd.*leak|Hold Fd Nums' logcat.txt
```
