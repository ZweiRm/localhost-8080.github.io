---
prev:
    text: '窗口添加和移除'
    link: '/framework/window-add-remove'
next:
    text: '窗口布局流程 relayoutWindow'
    link: '/framework/relayoutWindow'
---

# WMS 窗口层级管理

## 1. 整体架构

Android 窗口管理系统从 Android S 开始划分为三个层次：**WM Shell**、**WM Core** 和 **WM Jetpack**。

![WM 三层架构](/img/android/window_hierarchy/01_architecture.svg)

| 层次 | 运行位置 | 职责 |
|------|---------|------|
| **WM Jetpack** | App 进程 | 窗口管理 API 层，在 AOSP 中开发维护 |
| **WM Shell** | SystemUI 进程 | UI 显示层，负责分屏、PIP、单手模式等，OEM 可进行差异化定制 |
| **WM Core** | system_server 进程 | 核心管理层（WMS / ATMS），管理窗口层级和状态 |

三层之间通过 AIDL 跨进程通信。WM Core 通过 `SurfaceControl` 与 `SurfaceFlinger` 交互，控制窗口对应的 Layer 的显示。

## 2. 窗口结构端到端

一个应用窗口从 App 进程到 WMS 再到 SurfaceFlinger 的对应关系如下：

![窗口结构端到端](/img/android/window_hierarchy/03_window_structure.svg)

**App 端：**

- 每个 `Activity` 包含一个 `PhoneWindow` 对象，在 `Activity.attach()` 时创建，是 Activity 与 View 系统交互的接口。
- `DecorView` 是 View 树的根节点，在 `Activity.onCreate()` 中通过 `PhoneWindow.setContentView()` 触发 `installDecor()` 创建。
- `ViewRootImpl` 在 `Activity.onResume()` 时创建，负责建立 App 与 WMS 之间的双向通信桥梁：
  - App → WMS：通过 `IWindowSession`（Binder 接口）
  - WMS → App：通过 `IWindow`（Binder 回调）

**WMS 端：**

- 应用在 WMS 侧通过 **Task → ActivityRecord → WindowState** 层级进行管理。
- 每一个层级节点都对应 SurfaceFlinger 中的一个 Layer，在 WMS 侧通过 `SurfaceControl` 进行控制。

## 3. 窗口容器类设计

WMS 抽象出了一套窗口容器类体系来组织和管理所有窗口。

![容器类继承关系](/img/android/window_hierarchy/02_container_hierarchy.svg)

### 3.1 ConfigurationContainer

`ConfigurationContainer` 是 WMS 中的配置容器基类，是一个抽象泛型类，只定义了容纳关系，没有实现子容器的存储方式。

```java
// ConfigurationContainer.java
public abstract class ConfigurationContainer<E extends ConfigurationContainer> {
    abstract protected int getChildCount();
    abstract protected E getChildAt(int index);
    abstract protected ConfigurationContainer getParent();
}
```

每个配置容器持有一份 `Configuration` 对象，其中 `WindowConfiguration` 保存了窗口相关配置：

| 字段 | 说明 |
|------|------|
| `mBounds` | 该配置下窗口相对于屏幕的可用区域 |
| `mAppBounds` | 去除系统装饰后应用可使用的区域 |
| `mMaxBounds` | 应用可获取的最大区域（Android 12L 引入），一般为全屏 |
| `mWindowingMode` | 窗口显示模式（全屏、分屏、浮动小窗等） |

子容器会继承父容器的配置，除非子容器自己覆盖。

### 3.2 WindowContainer

`WindowContainer` 继承自 `ConfigurationContainer`，是所有窗口容器的通用基类。它将子容器保存在一个有序列表中，列表按 Z 轴顺序排列，尾部的子容器在最上层。

```java
// WindowContainer.java
class WindowContainer<E extends WindowContainer> extends ConfigurationContainer<E>
        implements Comparable<WindowContainer>, Animatable,
        SurfaceFreezer.Freezable, InsetsControlTarget {
    // 子容器列表，按 z-order 排列，列表尾部 = 屏幕最上层
    protected final WindowList<E> mChildren = new WindowList<E>();
}
```

> `WindowList` 继承自 `ArrayList`，在此基础上提供了窗口容器专用的便捷方法。

`WindowContainer` 实现了添加、删除子容器，以及遍历不同类型子容器的便捷方法。窗口的添加和移除最终都是对 `mChildren` 列表的操作。

### 3.3 RootWindowContainer

`RootWindowContainer` 是所有窗口容器的根容器，系统中只存在一个实例。它管理的直接子节点是 `DisplayContent`，每个 `DisplayContent` 对应一个显示设备（包括物理屏幕和虚拟屏幕）。

```java
// RootWindowContainer.java
public class RootWindowContainer extends WindowContainer<DisplayContent>
        implements DisplayManager.DisplayListener {

    void setWindowManager(WindowManagerService wm) {
        final Display[] displays = mDisplayManager.getDisplays();
        for (int displayNdx = 0; displayNdx < displays.length; ++displayNdx) {
            final Display display = displays[displayNdx];
            final DisplayContent displayContent = new DisplayContent(display, this);
            addChild(displayContent, POSITION_BOTTOM);
        }
    }
}
```

`RootWindowContainer` 由 WMS 创建，但等待 ATMS 启动后才初始化：

```java
// WindowManagerService.java
public class WindowManagerService {
    RootWindowContainer mRoot;
    public WindowManagerService(...) {
        mRoot = new RootWindowContainer(this);  // 与 WMS 一起创建
    }
}

// ActivityTaskManagerService.java
public class ActivityTaskManagerService {
    RootWindowContainer mRootWindowContainer;

    public void setWindowManager(WindowManagerService wm) {
        mRootWindowContainer = wm.mRoot;
        // 先设置默认 Configuration
        mRootWindowContainer.onConfigurationChanged(mTempConfig);
        mRootWindowContainer.setWindowManager(wm);
    }
}
```

`RootWindowContainer` 实现了 `DisplayListener` 接口，可以监听屏幕的添加和移除：

```java
// RootWindowContainer.java
public void onDisplayAdded(int displayId) {
    final DisplayContent display = getDisplayContentOrCreate(displayId);
    ...
}

public void onDisplayRemoved(int displayId) {
    if (displayId == DEFAULT_DISPLAY) {
        throw new IllegalArgumentException("Can't remove the primary display.");
    }
    final DisplayContent displayContent = getDisplayContent(displayId);
    if (displayContent != null) {
        displayContent.remove();
    }
}

DisplayContent getDisplayContentOrCreate(int displayId) {
    displayContent = new DisplayContent(display, this);
    addChild(displayContent, POSITION_BOTTOM);
    ...
}
```

### 3.4 DisplayArea

`DisplayArea` 根据窗口层级区域存放不同类型的窗口。它是一个泛型类，可以容纳其他任何类型的窗口容器。根据窗口相对于 Task 层级的位置，`DisplayArea` 分为三种类型：

```java
// DisplayArea.java
public class DisplayArea<T extends WindowContainer> extends WindowContainer<T> {
    protected final Type mType;

    enum Type {
        ABOVE_TASKS,   // 只能存放层级高于 Task 的窗口（如系统弹窗、水印）
        BELOW_TASKS,   // 只能存放层级低于 Task 的窗口（如壁纸）
        ANY;           // 可以存放任意层级的窗口
    }
}
```

`DisplayArea` 有两个重要的内部类：

- **`DisplayArea.Tokens`**：继承 `DisplayArea<WindowToken>`，作为叶子节点容纳非应用类的 `WindowToken`。
- **`DisplayArea.Dimmable`**：继承 `DisplayArea<DisplayArea>`，可以设置阴影效果的 `DisplayArea`。

### 3.5 DisplayContent

`DisplayContent` 的继承链为：`DisplayContent` → `RootDisplayArea` → `DisplayArea.Dimmable` → `DisplayArea<DisplayArea>`。

它是一个占据整个屏幕的根窗口容器，只能容纳其他 `DisplayArea` 类型的容器。每个显示设备（物理屏或虚拟屏）对应一个 `DisplayContent`。物理屏的 `DisplayContent` 在系统启动时创建，虚拟屏的在显示设备添加时创建。

```java
// DisplayContent.java
class DisplayContent extends RootDisplayArea
        implements WindowManagerPolicy.DisplayContentInfo {

    DisplayContent(Display display, RootWindowContainer root, ...) {
        // 创建 DisplayAreaPolicy，构建 DisplayArea 层级结构
        mDisplayAreaPolicy = mWmService.getDisplayAreaPolicyProvider().instantiate(
                mWmService, this, this, mImeWindowsContainer);
    }
}
```

### 3.6 TaskDisplayArea

`TaskDisplayArea` 继承自 `DisplayArea<WindowContainer>`，用来容纳应用的 Activity 窗口及其子窗口（Dialog、PopupWindow 等）。这类窗口分配的层级都是 `APPLICATION_LAYER`（值为 2）。

在 `DisplayAreaPolicy.DefaultProvider.instantiate()` 中创建了名为 `DefaultTaskDisplayArea` 的实例。后续启动 Activity 创建 Task 时，通过 `DisplayContent.getDefaultTaskDisplayArea()` 找到它，将 Task 添加进去。

### 3.7 其他容器

| 容器 | 说明 |
|------|------|
| **WindowToken** | 管理一组非 Activity 相关窗口的容器（如 StatusBar） |
| **Task** | 继承自 `TaskFragment`，代表一个任务，子节点可以是 Task 或 ActivityRecord |
| **ActivityRecord** | 继承自 `WindowToken`，在 WMS 中代表一个 Activity |
| **WindowState** | 继承自 `WindowContainer`，代表一个窗口，也可以作为子窗口（如 PopupWindow）的父容器 |

## 4. 窗口类型与层级

### 4.1 Window Type 分类

Window Type 分为三大类：

| 类别 | 值范围 | 说明 |
|------|--------|------|
| Application windows（应用窗口） | 1 ~ 99 | Activity、Dialog 等 |
| Sub-windows（子窗口） | 1000 ~ 1999 | PopupWindow、MediaView 等 |
| System windows（系统窗口） | 2000 ~ 2999 | StatusBar、NavigationBar、Toast 等 |

### 4.2 Window Layer

系统将所有窗口类型映射到 0 ~ 36 共 37 个层级（Layer 0 ~ Layer 36），其中：

- **Layer 0**：保留
- **Layer 1**：壁纸（Wallpaper）
- **Layer 2**：应用窗口层（`APPLICATION_LAYER`）
- **Layer 3 ~ 35**：各种系统窗口
- **Layer 36**：最高层（如圆角覆盖层）

```java
// WindowManagerPolicy.java
default int getMaxWindowLayer() {
    return 36;
}
```

### 4.3 Z-Order 计算

窗口的 Z-Order 由 `mBaseLayer` 和 `mSubLayer` 两个值决定：

```java
// WindowState.java 构造函数
if (isSubWindow) {
    mBaseLayer = parentWindowLayer * TYPE_LAYER_MULTIPLIER + TYPE_LAYER_OFFSET;
    mSubLayer = policy.getSubWindowLayerFromTypeLw(type);
} else {
    mBaseLayer = windowLayer * TYPE_LAYER_MULTIPLIER + TYPE_LAYER_OFFSET;
    mSubLayer = 0;
}
```

其中 `TYPE_LAYER_MULTIPLIER = 10000`，`TYPE_LAYER_OFFSET = 1000`，因此：

> **mBaseLayer = Window Layer × 10000 + 1000**

例如 `TYPE_STATUS_BAR` 的 Layer 为 15，则 `mBaseLayer = 15 × 10000 + 1000 = 151000`。

### 4.4 Window Type 与 Layer 映射表

以下是 `WindowManagerPolicy.getWindowLayerFromTypeLw()` 方法定义的完整映射关系：

**应用窗口（1 ~ 99）：**

| Window Type | 值 | Window Layer |
|---|---|---|
| TYPE_BASE_APPLICATION | 1 | 2 (APPLICATION_LAYER) |
| TYPE_APPLICATION | 2 | 2 |
| TYPE_APPLICATION_STARTING | 3 | 2 |
| TYPE_DRAWN_APPLICATION | 4 | 2 |
| LAST_APPLICATION_WINDOW | 99 | 2 |

**子窗口（1000 ~ 1005）— SubLayer 值：**

| Window Type | 值 | SubLayer |
|---|---|---|
| TYPE_APPLICATION_PANEL | 1000 | 1 |
| TYPE_APPLICATION_MEDIA | 1001 | -2 |
| TYPE_APPLICATION_SUB_PANEL | 1002 | 2 |
| TYPE_APPLICATION_ATTACHED_DIALOG | 1003 | 1 |
| TYPE_APPLICATION_MEDIA_OVERLAY | 1004 | -1 |
| TYPE_APPLICATION_ABOVE_SUB_PANEL | 1005 | 3 |

> 子窗口的 SubLayer 为负值表示在父窗口之下，正值表示在父窗口之上。

**系统窗口（2000 ~ 2041）：**

| Window Type | 值 | Layer | 说明 |
|---|---|---|---|
| TYPE_STATUS_BAR | 2000 | 15 | 状态栏 |
| TYPE_SEARCH_BAR | 2001 | 4 | 搜索栏 |
| TYPE_PHONE | 2002 | 3 | 电话窗口 |
| TYPE_SYSTEM_ALERT | 2003 | 12 / 9 | 系统弹窗（有/无内部系统窗口权限） |
| TYPE_KEYGUARD | 2004 | 3 | 锁屏 |
| TYPE_TOAST | 2005 | 7 | Toast 提示 |
| TYPE_SYSTEM_OVERLAY | 2006 | 23 / 10 | 系统覆盖层（有/无权限） |
| TYPE_PRIORITY_PHONE | 2007 | 8 | 高优先级电话 |
| TYPE_SYSTEM_DIALOG | 2008 | 6 | 系统对话框 |
| TYPE_KEYGUARD_DIALOG | 2009 | 19 | 锁屏对话框 |
| TYPE_SYSTEM_ERROR | 2010 | 27 / 9 | 系统错误（有/无权限） |
| TYPE_INPUT_METHOD | 2011 | 13 | 输入法 |
| TYPE_INPUT_METHOD_DIALOG | 2012 | 14 | 输入法对话框 |
| TYPE_WALLPAPER | 2013 | 1 | 壁纸 |
| TYPE_STATUS_BAR_PANEL | 2014 | 3 | 状态栏面板 |
| TYPE_SECURE_SYSTEM_OVERLAY | 2015 | 33 | 安全系统覆盖层 |
| TYPE_DRAG | 2016 | 30 | 拖拽层 |
| TYPE_STATUS_BAR_SUB_PANEL | 2017 | 18 | 状态栏子面板 |
| TYPE_POINTER | 2018 | 35 | 鼠标指针 |
| TYPE_NAVIGATION_BAR | 2019 | 24 | 导航栏 |
| TYPE_VOLUME_OVERLAY | 2020 | 22 | 音量覆盖层 |
| TYPE_BOOT_PROGRESS | 2021 | 34 | 启动进度 |
| TYPE_INPUT_CONSUMER | 2022 | 5 | 输入消费者 |
| TYPE_NAVIGATION_BAR_PANEL | 2024 | 25 | 导航栏面板 |
| TYPE_DISPLAY_OVERLAY | 2026 | 29 | 显示覆盖层 |
| TYPE_MAGNIFICATION_OVERLAY | 2027 | 28 | 放大覆盖层 |
| TYPE_PRIVATE_PRESENTATION | 2030 | 3 | 私有演示 |
| TYPE_VOICE_INTERACTION | 2031 | 21 | 语音交互 |
| TYPE_ACCESSIBILITY_OVERLAY | 2032 | 31 | 无障碍覆盖层 |
| TYPE_VOICE_INTERACTION_STARTING | 2033 | 20 | 语音交互启动 |
| TYPE_DOCK_DIVIDER | 2034 | 3 | 分屏分割线 |
| TYPE_QS_DIALOG | 2035 | 3 | 快速设置对话框 |
| TYPE_SCREENSHOT | 2036 | 26 | 截屏 |
| TYPE_PRESENTATION | 2037 | 3 | 演示 |
| TYPE_APPLICATION_OVERLAY | 2038 | 11 | 应用覆盖层 |
| TYPE_ACCESSIBILITY_MAGNIFICATION_OVERLAY | 2039 | 32 | 无障碍放大覆盖层 |
| TYPE_NOTIFICATION_SHADE | 2040 | 17 | 通知面板 |
| TYPE_STATUS_BAR_ADDITIONAL | 2041 | 16 | 附加状态栏 |

> 标注 "有/无权限" 的类型，其层级取决于调用方是否拥有 `INTERNAL_SYSTEM_WINDOW` 权限。

### 4.5 常见窗口对应的 Window Type

| 窗口 | Window Type |
|------|------------|
| Activity | TYPE_BASE_APPLICATION |
| TaskSnapshotWindow | TYPE_APPLICATION_STARTING |
| Dialog | TYPE_APPLICATION |
| PopupWindow | TYPE_APPLICATION_PANEL |
| Toast | TYPE_TOAST |

## 5. DisplayArea 层级树的构建

### 5.1 创建流程

DisplayArea 层级树的构建发生在 `DisplayContent` 创建时：

1. **SystemServer.main()** → `SystemServer.startOtherServices()`
2. 创建 WMS：`WindowManagerService.main()` → 构造函数中 `mRoot = new RootWindowContainer(this)`
3. ATMS 启动后调用 `RootWindowContainer.setWindowManager(wm)`，遍历所有 Display 创建 `DisplayContent`
4. `DisplayContent` 构造函数中通过 `DisplayAreaPolicyProvider` 创建 `DisplayAreaPolicy` 并构建层级结构

### 5.2 DisplayAreaPolicy

`DisplayAreaPolicy` 是 `DisplayArea` 的策略管理器。系统允许通过 `config_deviceSpecificDisplayAreaPolicyProvider` 配置自定义策略（如车机系统的 `CarDisplayAreaPolicyProvider`），默认使用 `DefaultProvider`。

```java
// DisplayAreaPolicy.java
static final class DefaultProvider implements DisplayAreaPolicy.Provider {
    @Override
    public DisplayAreaPolicy instantiate(WindowManagerService wmService,
            DisplayContent content, RootDisplayArea root,
            DisplayArea.Tokens imeContainer) {
        // 1. 创建 DefaultTaskDisplayArea
        final TaskDisplayArea defaultTaskDisplayArea = new TaskDisplayArea(content, wmService,
                "DefaultTaskDisplayArea", FEATURE_DEFAULT_TASK_CONTAINER);

        // 2. 设置层级构建器
        final HierarchyBuilder rootHierarchy = new HierarchyBuilder(root);
        rootHierarchy.setImeContainer(imeContainer).setTaskDisplayAreas(tdaList);
        if (content.isTrusted()) {
            configureTrustedHierarchyBuilder(rootHierarchy, wmService, content);
        }

        // 3. 构建层级
        return new DisplayAreaPolicyBuilder().setRootHierarchy(rootHierarchy).build(wmService);
    }
}
```

### 5.3 Feature 机制

`DisplayArea` 层级的构建主要依赖 `Feature` 来实现。每个 Feature 代表应用在某一类窗口上的功能特性，内部用一个长度为 `getMaxWindowLayer() + 1` 的 boolean 数组标识该 Feature 能影响哪些 Layer 层。

`configureTrustedHierarchyBuilder()` 依次添加以下 Feature：

| Feature 名 | Feature ID | 作用 | 影响的 Layer |
|---|---|---|---|
| WindowedMagnification | 4 | 窗口放大镜 | 0 ~ 31 |
| HideDisplayCutout（仅默认屏） | 6 | 隐藏刘海区域 | 除 StatusBar/NavigationBar/NotificationShade 外的所有层 |
| OneHanded（仅默认屏） | 3 | 单手模式 | 除 NavigationBar/SecureSystemOverlay 外的所有层 |
| FullscreenMagnification | 5 | 全屏放大 | 除 IME/NavigationBar/MagnificationOverlay/AccessibilityMagnification 外的所有层 |
| ImePlaceholder | 7 | 输入法占位容器 | 仅 Layer 13 ~ 14（TYPE_INPUT_METHOD 和 TYPE_INPUT_METHOD_DIALOG） |

![Feature 与 Layer 对应关系](/img/android/window_hierarchy/04_feature_layers.svg)

### 5.4 PendingArea 构建算法

`DisplayAreaPolicyBuilder.build()` 通过 `PendingArea` 临时数据结构分五步构建层级树。`PendingArea` 是一个中间节点类，包含以下字段：

```java
static class PendingArea {
    final int mMinLayer;
    final ArrayList<PendingArea> mChildren;
    final Feature mFeature;
    final PendingArea mParent;
    int mMaxLayer;
    DisplayArea mExisting;       // 已存在的 DA（如 TaskDisplayArea、ImeContainer）
    boolean mSkipTokens = false; // 跳过叶子节点创建
}
```

**第一步：初始化 root 节点**

创建一个代表整棵树根的 `PendingArea`，并将所有 Layer 指向它：

```java
PendingArea[] areaForLayer = new PendingArea[maxWindowLayerCount];
final PendingArea root = new PendingArea(null, 0, null);
Arrays.fill(areaForLayer, root);
```

**第二步：构建 Feature 区域**

按添加顺序遍历每个 Feature，对每个 Layer 检查该 Feature 是否覆盖。如果覆盖，就创建（或复用）一个 `PendingArea` 节点挂在当前 Layer 对应的父节点下，并更新 `areaForLayer` 使后续 Feature 嵌套在其内部：

```java
final int size = mFeatures.size();
for (int i = 0; i < size; i++) {
    final Feature feature = mFeatures.get(i);
    PendingArea featureArea = null;
    for (int layer = 0; layer < maxWindowLayerCount; layer++) {
        if (feature.mWindowLayers[layer]) {
            // 当前 Feature 覆盖此 Layer
            if (featureArea == null || featureArea.mParent != areaForLayer[layer]) {
                // 父节点变了，需要创建新的 PendingArea
                featureArea = new PendingArea(feature, layer, areaForLayer[layer]);
                areaForLayer[layer].mChildren.add(featureArea);
            }
            areaForLayer[layer] = featureArea;
        } else {
            featureArea = null;  // 断开，下次需要新建
        }
    }
}
```

此步完成后，构建出如下中间树（显示格式为 `FeatureID|minLayer`）：

```
root
├── 4|0 (WindowedMagnification)
│   ├── 6|0 (HideDisplayCutout)
│   │   └── 3|0 (OneHanded)
│   │       ├── 5|0 (FullscreenMagnification)
│   │       └── 7|13 (ImePlaceholder)
│   ├── 3|15 (OneHanded)
│   │   └── 5|15
│   ├── 6|16 → 3|16 → 5|16
│   ├── 3|17 → 5|17
│   ├── 6|18 → 3|18 → 5|18
│   └── 6|26 → 3|26 → 5|26, 5|29
└── 6|32 (HideDisplayCutout)
    ├── 3|32
    ├── 5|33
    └── 3|34 → 5|34
```

关键逻辑：Feature 的添加顺序决定了嵌套层次——先添加的 Feature 在外层，后添加的在内层。当某个 Feature 不覆盖某个 Layer 时，该 Layer 会"跳过"这个 Feature，直接挂在更外层的 Feature 下。例如 Layer 24-25 不被 HideDisplayCutout 和 OneHanded 覆盖，因此直接挂在 WindowedMagnification 下。

**第三步：创建叶子节点**

为每个 Layer 创建叶子 `PendingArea`，根据 Layer 类型决定叶子节点的种类：

```java
PendingArea leafArea = null;
int leafType = LEAF_TYPE_TOKENS;
for (int layer = 0; layer < maxWindowLayerCount; layer++) {
    int type = typeOfLayer(policy, layer);
    if (leafArea == null || leafArea.mParent != areaForLayer[layer]
            || type != leafType) {
        // 需要创建新的叶子节点
        leafArea = new PendingArea(null, layer, areaForLayer[layer]);
        areaForLayer[layer].mChildren.add(leafArea);
        leafType = type;
        if (leafType == LEAF_TYPE_TASK_CONTAINERS) {
            // Layer 2：添加 TaskDisplayArea
            addTaskDisplayAreasToApplicationLayer(areaForLayer[layer]);
            leafArea.mSkipTokens = true;
        } else if (leafType == LEAF_TYPE_IME_CONTAINERS) {
            // Layer 13-14：添加 ImeContainer
            leafArea.mExisting = mImeContainer;
            leafArea.mSkipTokens = true;
        }
    }
    leafArea.mMaxLayer = layer;  // 连续同类型的 Layer 复用同一个叶子节点
}

private static int typeOfLayer(WindowManagerPolicy policy, int layer) {
    if (layer == APPLICATION_LAYER) {
        return LEAF_TYPE_TASK_CONTAINERS;  // 容纳 App 窗口的 TaskDisplayArea
    } else if (layer == policy.getWindowLayerFromTypeLw(TYPE_INPUT_METHOD)
            || layer == policy.getWindowLayerFromTypeLw(TYPE_INPUT_METHOD_DIALOG)) {
        return LEAF_TYPE_IME_CONTAINERS;   // 容纳输入法窗口的 ImeContainer
    } else {
        return LEAF_TYPE_TOKENS;           // 容纳其他窗口的 DisplayArea.Tokens
    }
}
```

连续相同类型、相同父节点的 Layer 会复用同一个叶子节点（只更新其 `mMaxLayer`），例如 Layer 3 ~ 12 复用一个叶子节点，显示为 `Leaf:3:12`。

`addTaskDisplayAreasToApplicationLayer()` 将 `DefaultTaskDisplayArea` 作为已有节点挂入：

```java
private void addTaskDisplayAreasToApplicationLayer(PendingArea parentPendingArea, ...) {
    for (int i = 0; i < mTaskDisplayAreas.size(); i++) {
        PendingArea leafArea = new PendingArea(null, APPLICATION_LAYER, parentPendingArea);
        leafArea.mExisting = mTaskDisplayAreas.get(i);
        leafArea.mMaxLayer = APPLICATION_LAYER;
        parentPendingArea.mChildren.add(leafArea);
    }
}
```

**第四步：更新所有节点的 maxLayer**

自底向上递归计算每个节点的 `mMaxLayer`：

```java
int computeMaxLayer() {
    for (int i = 0; i < mChildren.size(); i++) {
        mMaxLayer = Math.max(mMaxLayer, mChildren.get(i).computeMaxLayer());
    }
    return mMaxLayer;
}
```

**第五步：实例化整棵树**

递归调用 `instantiateChildren()` 将 `PendingArea` 树转化为实际的 `DisplayArea` 树：

```java
void instantiateChildren(DisplayArea<DisplayArea> parent,
        DisplayArea.Tokens[] areaForLayer, int level,
        Map<Feature, List<DisplayArea<WindowContainer>>> areas) {
    mChildren.sort(Comparator.comparingInt(pendingArea -> pendingArea.mMinLayer));
    for (int i = 0; i < mChildren.size(); i++) {
        final PendingArea child = mChildren.get(i);
        final DisplayArea area = child.createArea(parent, areaForLayer);
        if (area == null) {
            continue;  // TaskDisplayArea 和 ImeContainer 可能返回 null
        }
        parent.addChild(area, WindowContainer.POSITION_TOP);
        if (child.mFeature != null) {
            areas.get(child.mFeature).add(area);
        }
        child.instantiateChildren(area, areaForLayer, level + 1, areas);
    }
}
```

`createArea()` 方法根据节点类型创建不同的 `DisplayArea`：

```java
private DisplayArea createArea(DisplayArea<DisplayArea> parent,
        DisplayArea.Tokens[] areaForLayer) {
    if (mExisting != null) {
        // 已有的 DA（TaskDisplayArea / ImeContainer），直接复用
        if (mExisting.asTokens() != null) {
            fillAreaForLayers(mExisting.asTokens(), areaForLayer);
        }
        return mExisting;
    }
    if (mSkipTokens) {
        return null;  // TaskDisplayArea / ImeContainer 的占位节点
    }
    // 根据 Layer 范围确定 DisplayArea 类型
    DisplayArea.Type type;
    if (mMinLayer > APPLICATION_LAYER) {
        type = DisplayArea.Type.ABOVE_TASKS;
    } else if (mMaxLayer < APPLICATION_LAYER) {
        type = DisplayArea.Type.BELOW_TASKS;
    } else {
        type = DisplayArea.Type.ANY;
    }
    if (mFeature == null) {
        // 叶子节点：创建 Tokens 容器
        final DisplayArea.Tokens leaf = new DisplayArea.Tokens(
                parent.mWmService, type, "Leaf:" + mMinLayer + ":" + mMaxLayer);
        fillAreaForLayers(leaf, areaForLayer);
        return leaf;
    } else {
        // Feature 节点：使用 Feature 的 Supplier 创建
        return mFeature.mNewDisplayAreaSupplier.create(parent.mWmService, type,
                mFeature.mName + ":" + mMinLayer + ":" + mMaxLayer, mFeature.mId);
    }
}
```

最终生成的 `DisplayArea` 节点命名规则：Feature 节点为 `FeatureName:minLayer:maxLayer`（如 `WindowedMagnification:0:31`），叶子节点为 `Leaf:minLayer:maxLayer`（如 `Leaf:3:12`）。

### 5.5 最终层级结构

构建完成后，默认屏幕的 DisplayArea 层级结构如下：

![DisplayArea 层级树](/img/android/window_hierarchy/05_displayarea_tree.svg)

通过 `adb shell dumpsys activity containers` 可以查看当前系统的完整层级：

```
ROOT
  #0 Display 0
   #2 Leaf:36:36
   #1 HideDisplayCutout:32:35
    #2 OneHanded:34:35
     #0 FullscreenMagnification:34:35
      #0 Leaf:34:35
    #1 FullscreenMagnification:33:33
     #0 Leaf:33:33
    #0 OneHanded:32:32
     #0 Leaf:32:32
   #0 WindowedMagnification:0:31
    #6 HideDisplayCutout:26:31
     #0 OneHanded:26:31
      #2 FullscreenMagnification:29:31
       #0 Leaf:29:31
      #1 Leaf:28:28
      #0 FullscreenMagnification:26:27
       #0 Leaf:26:27
    #5 Leaf:24:25
    #4 HideDisplayCutout:18:23
     #0 OneHanded:18:23
      #0 FullscreenMagnification:18:23
       #0 Leaf:18:23
    #3 OneHanded:17:17
     #0 FullscreenMagnification:17:17
      #0 Leaf:17:17
    #2 HideDisplayCutout:16:16
     #0 OneHanded:16:16
      #0 FullscreenMagnification:16:16
       #0 Leaf:16:16
    #1 OneHanded:15:15
     #0 FullscreenMagnification:15:15
      #0 Leaf:15:15
    #0 HideDisplayCutout:0:14
     #0 OneHanded:0:14
      #1 ImePlaceholder:13:14
       #0 ImeContainer
      #0 FullscreenMagnification:0:12
       #2 Leaf:3:12
       #1 DefaultTaskDisplayArea
       #0 Leaf:0:1
```

### 5.6 设计意图

构建 DisplayArea 树的目的是：

- 手机系统有多种类型的窗口，需要通过 Layer 维护窗口的显示 Z-Order。
- 存在多个功能特性（Feature），每个 Feature 需要影响若干个 Layer 层。
- 窗口类型可以增加，Feature 可以增删——通过树形结构可以灵活支持。

以 `DefaultTaskDisplayArea` 为例：其父节点链为 `FullscreenMagnification:0:12` → `OneHanded:0:14` → `HideDisplayCutout:0:14` → `WindowedMagnification:0:31` → `DisplayContent`。这意味着该节点下的所有子窗口都支持 FullscreenMagnification、OneHanded、HideDisplayCutout、WindowedMagnification 四种功能特性。

## 6. DisplayAreaOrganizer 框架

`DisplayAreaOrganizer` 是 Framework 层提供给应用层（主要是 SystemUI 等系统级应用）的接口类，用于让应用层组织和控制各种 Feature 对应的 `DisplayArea`。

![DisplayAreaOrganizer 框架](/img/android/window_hierarchy/06_organizer_framework.svg)

### 6.1 接口层次

**AIDL 接口：**

| 接口 | 功能 |
|------|------|
| `IWindowOrganizerController` | 窗口容器组织器的控制接口，提供获取 `IDisplayAreaOrganizerController` 的入口 |
| `IDisplayAreaOrganizerController` | DisplayArea 组织器的注册/反注册接口 |
| `IDisplayAreaOrganizer` | 接收指定 FeatureId 的 DisplayArea 状态变化（出现、消失、更新） |

**API 层：**

| 类 | 说明 |
|------|------|
| `WindowOrganizer` | 封装 `IWindowOrganizerController`，提供给应用层 |
| `DisplayAreaOrganizer` | 继承 `WindowOrganizer`，封装 DisplayArea 组织器的使用 |
| `DisplayAreaAppearedInfo` | 包含 `DisplayAreaInfo`（FeatureId、DisplayId）和对应的 `SurfaceControl` |

**服务层：**

`WindowOrganizerController` 和 `DisplayAreaOrganizerController` 是对应 AIDL 接口的具体实现，依托于 ATMS 服务。

### 6.2 应用示例：单手模式

WM Shell 中实现的单手模式使用了 `DisplayAreaOrganizer`。`OneHandedDisplayAreaOrganizer` 注册监听 `FEATURE_ONE_HANDED` 类型的 `DisplayArea`：

```java
// OneHandedController.java
private void updateOneHandedEnabled() {
    if (mDisplayAreaOrganizer.getDisplayAreaTokenMap().isEmpty()) {
        mDisplayAreaOrganizer.registerOrganizer(
                OneHandedDisplayAreaOrganizer.FEATURE_ONE_HANDED);
    }
}
```

通过获取到的 `SurfaceControl`（即 `leash`），`OneHandedDisplayAreaOrganizer` 对所有 `FEATURE_ONE_HANDED` 类型的 `DisplayArea` 施加平移动画，实现窗口整体下移的效果：

```java
// OneHandedDisplayAreaOrganizer.java
public class OneHandedDisplayAreaOrganizer extends DisplayAreaOrganizer {
    private ArrayMap<WindowContainerToken, SurfaceControl>
            mDisplayAreaTokenMap = new ArrayMap();

    public void onDisplayAreaAppeared(DisplayAreaInfo displayAreaInfo,
            SurfaceControl leash) {
        // 保存所有 FEATURE_ONE_HANDED 类型 DisplayArea 的 Surface
        mDisplayAreaTokenMap.put(displayAreaInfo.token, leash);
    }

    public void scheduleOffset(int xOffset, int yOffset) {
        // 对 map 中所有 Surface 执行平移动画
        mDisplayAreaTokenMap.forEach((token, leash) -> {
            animateWindows(token, leash, fromPos, yOffset, direction,
                    mEnterExitAnimationDurationMs);
        });
    }

    private void animateWindows(WindowContainerToken token,
            SurfaceControl leash, ...) {
        // 创建 ValueAnimator 对 Surface 施加动画效果
        final OneHandedAnimationController.OneHandedTransitionAnimator animator =
                mAnimationController.getAnimator(token, leash, fromPos, toPos,
                        mLastVisualDisplayBounds);
        ...
    }
}

// OneHandedAnimationController.java
public abstract static class OneHandedTransitionAnimator extends ValueAnimator {
    private final SurfaceControl mLeash;

    public void onAnimationUpdate(ValueAnimator animation) {
        // 每一帧对 Surface 应用平移变换
        applySurfaceControlTransaction(mLeash, tx, animation.getAnimatedFraction());
    }
}
```

控制 `DisplayArea` 的 `SurfaceControl` 就等同于控制该 `DisplayArea` 及其容纳的所有窗口容器——这是 `DisplayAreaOrganizer` 框架的核心思想。

通过这套框架，WMS 将某一类 Feature 窗口的组织管理权委托给了应用层，应用层可以对特定类别的窗口应用独特的功能特性。类似的框架还有 `TaskOrganizer`，用于管理 Task 层级的窗口容器。

## 7. 应用层级的添加与移除

### 7.1 添加

启动 Activity 时，窗口层级的添加分三步：

**1) 添加 Task 层级**（startActivity 时）：

```
ActivityStarter.execute()
  → ActivityStarter.executeRequest()
    → ActivityStarter.startActivityUnchecked()
      → ActivityStarter.startActivityInner()
        → ActivityStarter.setNewTask()
          → Task.reuseOrCreateTask()
            → Task$Builder.build()
              → Task.addChild()          // Task 加入 TaskDisplayArea
                → WindowContainer.addChild()
```

**2) 添加 ActivityRecord 层级**（startActivity 时）：

```
ActivityStarter.startActivityInner()
  → ActivityStarter.setNewTask()
    → ActivityStarter.addOrReparentStartingActivity()
      → Task.addChild()                 // ActivityRecord 加入 Task
        → TaskFragment.addChild()
          → WindowContainer.addChild()
```

**3) 添加 WindowState 层级**（addWindow 时）：

```
ViewRootImpl.setView()
  → IWindowSession.addToDisplayAsUser()    // App → WMS 跨进程
    → Session.addToDisplayAsUser()
      → WindowManagerService.addWindow()
        → ActivityRecord.addWindow()       // WindowState 加入 ActivityRecord
          → WindowToken.addWindow()
            → WindowContainer.addChild()
```

创建其他类型窗口（非 Activity 窗口）时，会根据窗口的 Type 找到能容纳该类型窗口对应层级的 `DisplayArea.Tokens` 叶子容器并添加进去。例如状态栏（TYPE_STATUS_BAR，Layer 15）最终被放到 `Leaf:15:15` 的子容器中。

### 7.2 移除

**WindowState 移除：** App 端调用 `Session.remove()` 时移除 WindowState，同时销毁对应 Surface：

```java
// Session.java
public void remove(IBinder clientToken) {
    mService.removeClientToken(this, clientToken);
}

// WindowManagerService.java
void removeClientToken(Session session, IBinder client) {
    synchronized (mGlobalLock) {
        WindowState win = windowForClientLocked(session, client, false);
        if (win != null) {
            win.removeIfPossible();
            return;
        }
        mEmbeddedWindowController.remove(client);
    }
}
```

**容器级联移除：** 当 ActivityRecord 或 Task 的最后一个子节点被移除时，会触发容器自身的移除（`WindowContainer.removeImmediately()`），同时销毁对应 Surface。

**DisplayContent 移除：** 在 DMS 回调 `onDisplayRemoved()` 时销毁。默认屏幕（`DEFAULT_DISPLAY`）不允许被移除。

## 8. 窗口绘制状态管理

窗口从添加到最终上屏经历五个状态：

![窗口绘制状态机](/img/android/window_hierarchy/07_drawing_states.svg)

### 8.1 NO_SURFACE（值 = 0）

窗口添加时（`WindowState` 构造）的初始状态，此时尚未创建用于绘制的 Surface。

### 8.2 DRAW_PENDING（值 = 1）

App 端首次调用 `ViewRootImpl.relayoutWindow()` 时触发 Surface 的创建。整个流程跨越 App 进程和 system_server 进程。

**App 端发起 relayout：**

```java
// ViewRootImpl.java
private int relayoutWindow(WindowManager.LayoutParams params, int viewVisibility,
        boolean insetsPending) throws RemoteException {
    int relayoutResult = mWindowSession.relayout(mWindow, params,
            requestedWidth, requestedHeight, viewVisibility,
            insetsPending ? WindowManagerGlobal.RELAYOUT_INSETS_PENDING : 0,
            mRelayoutSeq, mLastSyncSeqId, mRelayoutResult);

    if (mSurfaceControl.isValid()) {
        // Surface 创建成功，建立 BLASTBufferQueue
        updateBlastSurfaceIfNeeded();
        if (mAttachInfo.mThreadedRenderer != null) {
            mAttachInfo.mThreadedRenderer.setSurfaceControl(
                    mSurfaceControl, mBlastBufferQueue);
        }
    }
    return relayoutResult;
}

void updateBlastSurfaceIfNeeded() {
    // 创建 BLASTBufferQueue 作为 App 端的绘制通道
    mBlastBufferQueue = new BLASTBufferQueue(mTag, true);
    mBlastBufferQueue.setApplyToken(mBbqApplyToken);
    mBlastBufferQueue.update(mSurfaceControl, mSurfaceSize.x, mSurfaceSize.y,
            mWindowAttributes.format);
    // 通过 BBQ 获取可绘制的 Surface
    Surface blastSurface = mBlastBufferQueue.createSurface();
    mSurface.transferFrom(blastSurface);
}
```

**WMS 端创建 SurfaceControl：**

```java
// WindowManagerService.java
public int relayoutWindow(Session session, IWindow client, ...) {
    final WindowState win = windowForClientLocked(session, client, false);
    final boolean shouldRelayout = viewVisibility == View.VISIBLE &&
            (win.mActivityRecord == null
             || win.mAttrs.type == TYPE_APPLICATION_STARTING
             || win.mActivityRecord.isClientVisible());

    if (shouldRelayout) {
        result = createSurfaceControl(outSurfaceControl, result, win, winAnimator);
    }
    ...
}

private int createSurfaceControl(SurfaceControl outSurfaceControl, int result,
        WindowState win, WindowStateAnimator winAnimator) {
    // 创建 SurfaceControl
    SurfaceControl surfaceControl = winAnimator.createSurfaceLocked();
    if (surfaceControl != null) {
        // 将 SurfaceControl 拷贝到 App 端的 outSurfaceControl
        winAnimator.getSurfaceControl(outSurfaceControl);
    }
    return result;
}
```

`createSurfaceLocked()` 内部将状态设为 `DRAW_PENDING`（通过 `resetDrawState()`），此时 Surface 已创建但处于隐藏状态，等待 App 端完成首帧绘制。

### 8.3 COMMIT_DRAW_PENDING（值 = 2）

App 端首帧绘制完成后，调用 `finishDrawing()` 通知 WMS：

```java
// WindowStateAnimator.java
boolean finishDrawingLocked(...) {
    if (mDrawState == DRAW_PENDING) {
        mDrawState = COMMIT_DRAW_PENDING;
        layoutNeeded = true;  // 需要重新布局
    }
    return layoutNeeded;
}
```

### 8.4 READY_TO_SHOW（值 = 3）

WMS 完成窗口布局后，调用 `commitFinishDrawingLocked()` 提交绘制结果：

```java
// WindowStateAnimator.java
boolean commitFinishDrawingLocked() {
    if (mDrawState != COMMIT_DRAW_PENDING && mDrawState != READY_TO_SHOW) {
        return false;
    }
    mDrawState = READY_TO_SHOW;
    // 如果 ActivityRecord 下所有窗口都已准备好，执行显示
    if (activity == null || activity.canShowWindows() || isStartingWindow) {
        result = mWin.performShowLocked();
    }
    return result;
}
```

### 8.5 HAS_DRAWN（值 = 4）

`performShowLocked()` 将状态设为 `HAS_DRAWN` 并触发窗口动画，窗口正式上屏显示：

```java
// WindowState.java
boolean performShowLocked() {
    mWinAnimator.mDrawState = HAS_DRAWN;
    mWmService.scheduleAnimationLocked();
    return true;
}
```

当窗口可见性发生变化或 resize 时，绘制状态会被重置，重新走上述流程。

> `isDrawn()` 方法判断窗口是否已绘制完成：`mDrawState == READY_TO_SHOW || mDrawState == HAS_DRAWN`。

## 9. 动画管理概览

### 9.1 App Transition（Android T 及之前）

App Transition 用于管理应用之间或应用内部界面切换的过渡动画。动画的控制逻辑和播放均在 WMS 进程内部实现（RemoteAnimation / RecentsAnimation 场景下动画播放在 Launcher / SystemUI 进程）。

### 9.2 Shell Transition（Android U 及之后）

Android U 引入了 Shell Transition 框架，将动画 Policy 逻辑保留在 WM Core 侧，动画播放逻辑移至 WM Shell（SystemUI 进程）。这样的设计基于 Policy/UI 分离原则，方便 OEM 厂商定制过渡动画。

**等待窗口绘制完成：**

不论是 Shell Transition 还是 App Transition，都需要等待窗口绘制完成后才执行动画。`BLASTSyncEngine` 负责检查所有参与 Transition 的窗口是否完成同步绘制：

```java
// BLASTSyncEngine.java
void onSurfacePlacement() {
    if (mActiveSyncs.isEmpty()) return;
    mTmpFinishQueue.addAll(mActiveSyncs);
    while (!mTmpFinishQueue.isEmpty()) {
        final SyncGroup group = mTmpFinishQueue.remove(0);
        if (!group.tryFinish()) continue;
        ...
    }
}

// SyncGroup 内部
private boolean tryFinish() {
    for (int i = mRootMembers.size() - 1; i >= 0; --i) {
        final WindowContainer wc = mRootMembers.valueAt(i);
        if (!wc.isSyncFinished(this)) {
            return false;  // 还有窗口未完成绘制
        }
    }
    finishNow();  // 所有窗口绘制完成，开始播放动画
    return true;
}
```

`WindowState` 的同步完成判断：

```java
// WindowState.java
boolean isSyncFinished(BLASTSyncEngine.SyncGroup group) {
    if (!isVisibleRequested() || isFullyTransparent()) {
        return true;  // 不可见窗口无需等待
    }
    if (mSyncState == SYNC_STATE_WAITING_FOR_DRAW
            && mLastConfigReportedToClient && isDrawn()
            && mPrepareSyncSeqId <= 0) {
        onSyncFinishedDrawing();
    }
    return super.isSyncFinished(group);
}

public boolean isDrawn() {
    return mHasSurface && !mDestroying
            && (mWinAnimator.mDrawState == READY_TO_SHOW
                || mWinAnimator.mDrawState == HAS_DRAWN);
}
```

### 9.3 窗口动画

窗口动画（Window Animation）是单个窗口（`WindowState`）的动画，在引入 Shell Transition 后仍保持在 WM Core 侧执行。当非 Activity 主窗口、非壁纸窗口添加或移除时会触发，例如 Toast 的弹出和消失。

### 9.4 两种方案对比

|  | Shell Transition | App Transition |
|---|---|---|
| **优点** | 统一的系统动画框架，可定制性高；动画播放在 SystemUI 进程，减少对 WM Core 的侵入性修改；减少 system_server 高负荷导致的掉帧 | 涉及更少进程，跨进程通信对动画影响较小 |
| **缺点** | 涉及多个进程（system_server、SystemUI、Launcher），跨进程通信可能成为瓶颈；打断动画实现困难 | 无统一动画框架；OEM 定制引入更多侵入性修改；动画在 system_server 执行时容易掉帧 |
