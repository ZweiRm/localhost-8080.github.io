---
prev:
    text: 'Android Frameworks'
    link: 'framework/index'
next:
    text: 'Activity 启动全流程分析与 Activity 生命周期'
    link: 'framework/activity-launching-process'
---

# WMS 架构与运行原理分析

## 1. 概述

WindowManagerService（以下简称 WMS）是 Android 系统中负责窗口管理的核心系统服务，运行于 `system_server` 进程中。其核心职责包括：窗口的增删管理、布局与尺寸计算、窗口动画调度，以及与 SurfaceFlinger 的交互以控制窗口的合成与显示。

Google 在架构设计上将窗口管理划分为三个层次：

| 层次 | 运行位置 | 定位 |
|------|---------|------|
| **WM Shell** | SystemUI 进程 | UI 显示层，供 OEM 进行差异化与定制化开发 |
| **WM Core** | SystemServer 进程 | 核心管理层，Google 长期规划纳入 Mainline 模块 |
| **WM Jetpack** | App 进程 | WM API 层，在 AOSP 中开发并开源维护 |

本文档旨在提供 WMS 的整体架构认知，为后续排查窗口显示相关问题建立基础。

## 2. 整体架构

下图展示了 WMS 在 Android 系统中的分层位置，从应用层到硬件层的完整链路：

![WMS 整体架构分层示意图](/img/android/wms/01_wms_architecture.svg)

从上到下，窗口显示链路经过以下关键层次：应用通过 `ViewRootImpl` 和 `Choreographer` 驱动绘制流程；WM Shell 提供过渡动画、屏幕旋转等 UI 策略；WM Core 管理窗口层级、Insets、锁屏等核心逻辑；最终通过 Native 层的 SurfaceFlinger 和 HWComposer 完成合成输出。

## 3. 核心数据结构

WMS 的窗口管理建立在一套树形容器继承体系之上，所有窗口容器均继承自 `WindowContainer`，而 `WindowContainer` 继承自 `ConfigurationContainer`。下图展示了完整的继承关系：

![WMS 核心数据结构继承层级](/img/android/wms/02_class_hierarchy.svg)

各核心类的职责说明如下：

+ **RootWindowContainer** 是整棵窗口树的根节点，负责管理所有的 `DisplayContent` 实例。
+ **DisplayContent** 对应系统中的每个显示设备（包括物理屏幕与虚拟显示）。添加窗口时可指定目标 `DisplayContent`，以实现多屏场景下的窗口定向投放。
+ **DisplayArea** 用于在 `DisplayContent` 之下对 `WindowContainer` 进行分组管理，主要承载系统类型窗口的层级组织。其子类包括：`DisplayArea.Dimmable`（支持变暗效果的区域）、`TaskDisplayArea`（所有应用任务的父节点，管理 Task）、`DisplayArea.Tokens`（管理 WindowToken 的区域）。
+ **TaskFragment** 是平行窗口（Parallel Window）引入的数据结构。`Task` 继承自 `TaskFragment`，但在窗口层级树中 `TaskFragment` 位于 `Task` 的子节点位置。`Task` 本身代表一个任务栈，用于管理 `ActivityRecord`。
+ **WindowToken** 是窗口管理器中一组相关窗口的容器，通常以 `AppWindowToken` 的形式作为 Activity 的显示句柄。其子类 `ActivityRecord` 与 App 层的每个 `Activity` 对象一一对应，负责管理关联的 `WindowState`；`WallpaperWindowToken` 则专门代表一组壁纸窗口。
+ **WindowState** 是 WMS 中对窗口的核心描述对象，所有 `WindowState` 实例存储在 `mWindowMap` 中，是窗口属性查询与操作的主要入口。

## 4. 窗口类型

### 4.1 Windowing Mode

系统定义了 8 种窗口模式（Windowing Mode），每种模式代表一种特定的窗口呈现策略，WMS 根据不同模式执行对应的布局与显示逻辑：

```java
public static final int WINDOWING_MODE_UNDEFINED   = 0;  // 未定义
public static final int WINDOWING_MODE_FULLSCREEN   = 1;  // 全屏模式
public static final int WINDOWING_MODE_PINNED       = 2;  // 画中画模式（始终置顶）
public static final int WINDOWING_MODE_FREEFORM     = 5;  // 自由窗口模式
public static final int WINDOWING_MODE_MULTI_WINDOW = 6;  // 通用多窗口模式

// MIUI 扩展
public static final int MIUI_WINDOWING_MODE_PRIMARY   = 3;  // 分屏主窗口
public static final int MIUI_WINDOWING_MODE_SECONDARY = 4;  // 分屏副窗口
public static final int WINDOWING_MODE_HOVER          = 101; // 悬停窗口模式
```

### 4.2 Activity Type

针对特殊功能的 Activity，系统定义了专用的 Activity 类型，用于在特定场景下触发差异化处理：

```java
public static final int ACTIVITY_TYPE_UNDEFINED = 0;  // 未定义
public static final int ACTIVITY_TYPE_STANDARD  = 1;  // 标准 Activity
public static final int ACTIVITY_TYPE_HOME      = 2;  // Launcher 主页
public static final int ACTIVITY_TYPE_RECENTS   = 3;  // 最近任务（全局唯一）
public static final int ACTIVITY_TYPE_ASSISTANT = 4;  // 语音助手
public static final int ACTIVITY_TYPE_DREAM     = 5;  // 屏保 (Dream)
```

## 5. 窗口绘制状态

窗口的绘制状态本质上构成了窗口 Surface 从创建到上屏的生命周期，共包含 5 个阶段：

![窗口绘制状态生命周期](/img/android/wms/05_draw_state_lifecycle.svg)

各状态的语义如下：

| 状态 | 值 | 说明 |
|------|---|------|
| `NO_SURFACE` | 0 | Surface 已被销毁，但 WindowState 对象仍保留在窗口树中 |
| `DRAW_PENDING` | 1 | Surface 已创建，WMS 等待 App 侧 `ViewRootImpl` 完成内容绘制 |
| `COMMIT_DRAW_PENDING` | 2 | App 侧绘制完成并通知 WMS，等待提交到下一次布局 |
| `READY_TO_SHOW` | 3 | 绘制已提交，延迟显示直到同一 WindowToken 下的所有窗口均就绪 |
| `HAS_DRAWN` | 4 | 窗口首次上屏完成，标记为已显示状态 |

对应的常量定义：

```java
static final int NO_SURFACE          = 0;
static final int DRAW_PENDING        = 1;
static final int COMMIT_DRAW_PENDING = 2;
static final int READY_TO_SHOW       = 3;
static final int HAS_DRAWN           = 4;
```

## 6. 通信机制

### 6.1 APP 与 WMS 的通信

App 进程与 WMS 之间通过双向 Binder 通信完成交互：

![APP 与 WMS 的 Binder 通信机制](/img/android/wms/03_app_wms_comm.svg)

**App → WMS 方向**：App 进程中的 `ViewRootImpl` 持有 `IWindowSession` 的 Binder 代理对象（`IWindowSession.Proxy`），通过远程调用将布局请求、刷新请求等发送至 WMS 侧的 `Session` 实体对象。

**WMS → App 方向**：WMS 持有 App 传入的 `IWindow` Binder 代理对象（`IWindow.Proxy`），用于向 App 回调系统 Configuration 变更、Insets 状态变化等信息。App 侧的 `W` 类（继承 `IWindow.Stub`）作为 Binder 实体接收这些回调。

### 6.2 WMS 与 SurfaceFlinger 的通信

自 Android 9.0 起，Google 对 Surface 控制方式进行了重构，引入 `SurfaceControl.Transaction` 类，支持将多个 Surface 操作聚合到一个事务中进行批量处理。

![WMS 与 SurfaceFlinger 的 Transaction 通信](/img/android/wms/04_transaction_flow.svg)

Transaction 机制的核心特性：

- **延迟执行**：Transaction 中的所有操作均为延后处理，无论之前设置了多少操作，仅在调用 `apply()` 时才最终提交给 SurfaceFlinger。因此操作的设置顺序不代表执行顺序，只有 `apply()` 的调用顺序决定实际的执行序列。
- **事务合并**：多个 Transaction 可通过 `merge()` 合并到同一个 Transaction 中，统一 `apply`。
- **跨进程传递**：Transaction 支持通过 Binder 跨进程传递，在目标进程中执行 `merge` 和 `apply` 操作。

典型流程中，Home、SystemUI、system_server 各进程分别创建自己的 Transaction 并设置操作，随后通过 merge 汇聚到一个 Transaction 中统一 apply，由 SurfaceFlinger 一次性处理所有 Surface 变更。

`getSyncTransaction()` 方法用于获取与客户端同步的 Transaction 实例：

```java
@Override
public Transaction getSyncTransaction() {
    if (mSyncTransactionCommitCallbackDepth > 0) {
        return mSyncTransaction;
    }
    if (mSyncState != SYNC_STATE_NONE) {
        return mSyncTransaction;
    }
    return getPendingTransaction();
}
```

当存在同步回调（`mSyncTransactionCommitCallbackDepth > 0`）或处于同步状态（`mSyncState != SYNC_STATE_NONE`）时，返回 `mSyncTransaction` 以确保事务与客户端保持同步；否则回退到 `getPendingTransaction()` 返回待处理事务。