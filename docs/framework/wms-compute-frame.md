---
prev:
    text: '窗口布局流程'
    link: '/framework/relayoutWindow'
next:
    text: '窗口绘制状态'
    link: '/framework/window-draw-state'
---

# 窗口大小计算 computeFrame

## 概述

在 Android 窗口管理系统（WMS）中，每个窗口的最终位置和大小由 **WindowLayout.computeFrames()** 方法计算得出。该方法根据窗口的 LayoutParams 属性、系统 Insets 状态、DisplayCutout 安全区域、窗口边界等输入，计算出三个关键矩形：

- **frame**：窗口的实际边界矩形（屏幕坐标系）
- **displayFrame**：窗口可以展示的显示区域边界（受 insets 和 cutout 限制）
- **parentFrame**：用于 Gravity 计算和 MATCH_PARENT 解析的参考框架

这三个矩形存储在 `ClientWindowFrames` 对象中，计算完成后通过 `WindowState.setFrames()` 写入窗口状态。

![总览流程](/img/android/computeFrames/01_overview_flow.svg)

## 核心数据结构

### ClientWindowFrames

`ClientWindowFrames` 是窗口帧计算的输出容器，同时也在客户端（应用进程）和服务端（system_server）之间传递。

```java
// ClientWindowFrames.java line 34
public class ClientWindowFrames implements Parcelable {
    /** 窗口的实际边界 */
    public final Rect frame = new Rect();

    /**
     * 容器帧，通常等于显示大小。如果窗口 LayoutParams 指定了 fitInsetsSides，
     * 则会排除对应方向的 insets 区域。
     */
    public final Rect displayFrame = new Rect();

    /** 用于 Gravity 和 MATCH_PARENT 计算的参考帧 */
    public final Rect parentFrame = new Rect();

    /** 父窗口帧（子窗口场景）。null 表示这是根窗口 */
    public @Nullable Rect attachedFrame;

    /** parentFrame 是否被 DisplayCutout 裁切 */
    public boolean isParentFrameClippedByDisplayCutout;

    /** 兼容缩放比例 */
    public float compatScale = 1f;
}
```

### WindowFrames（服务端）

`WindowFrames` 是 WMS 服务端存储窗口帧信息的容器，位于 `WindowState.mWindowFrames` 中。

```java
// WindowFrames.java line 35
public class WindowFrames {
    /** 用于 Gravity 和 MATCH_PARENT 计算的参考帧 */
    public final Rect mParentFrame = new Rect();

    /** 窗口应该适配的边界 */
    public final Rect mDisplayFrame = new Rect();

    /** 应用看到的"真实"帧，显示坐标系 */
    final Rect mFrame = new Rect();

    /** 上一次的 frame，用于检测帧变化 */
    final Rect mLastFrame = new Rect();

    /** frame 相对于父容器的偏移版本 */
    final Rect mRelFrame = new Rect();

    /** 缩放到应用坐标空间的兼容帧 */
    final Rect mCompatFrame = new Rect();
}
```

### DisplayFrames

`DisplayFrames` 持有影响窗口布局的显示级信息。

```java
// DisplayFrames.java line 38
public class DisplayFrames {
    /** Insets 状态，包含所有 InsetsSource（状态栏、导航栏、cutout 等） */
    public final InsetsState mInsetsState;

    /** 屏幕的完整不受限区域 (0, 0, width, height) */
    public final Rect mUnrestricted = new Rect();

    /** 不与 DisplayCutout 相交的安全区域 */
    public final Rect mDisplayCutoutSafe = new Rect();

    public int mWidth;
    public int mHeight;
    public int mRotation;
}
```

## 触发时机：Layout 遍历

窗口帧计算是在 WMS 的 **layout 遍历** 过程中触发的。完整的调用链如下：

![调用链](/img/android/computeFrames/02_call_chain.svg)

### 入口：WindowSurfacePlacer.performSurfacePlacement()

layout 遍历由 `WindowSurfacePlacer` 发起，它维护一个循环（最多 6 次），直到不再需要布局：

```java
// WindowSurfacePlacer.java line 141
final void performSurfacePlacement(boolean force) {
    if (mDeferDepth > 0 && !force) {
        mDeferredRequests++;
        return;
    }
    int loopCount = 6;
    do {
        mTraversalScheduled = false;
        performSurfacePlacementLoop();
        // ...
        loopCount--;
    } while (mTraversalScheduled && loopCount > 0);
    // ...
}
```

`performSurfacePlacementLoop()` 内部调用 `RootWindowContainer.performSurfacePlacement()`，后者调用 `applySurfaceChangesTransaction()`，该方法最终对每个 DisplayContent 调用：

```java
// DisplayContent.java line 5873
performLayout(true /* initial */, false /* updateInputWindows */);
```

### 两阶段布局：performLayoutNoTrace()

`DisplayContent.performLayoutNoTrace()` 将窗口布局分为两个阶段：

```java
// DisplayContent.java line 5983
private void performLayoutNoTrace(boolean initial, boolean updateInputWindows) {
    if (!isLayoutNeeded()) {
        return;
    }
    clearLayoutNeeded();

    int seq = mLayoutSeq + 1;
    if (seq < 0) seq = 0;
    mLayoutSeq = seq;

    mTmpInitial = initial;

    // 第一阶段：布局所有根窗口（不依附于其他窗口的窗口）
    forAllWindows(mPerformLayout, true /* traverseTopToBottom */);

    // 第二阶段：布局所有依附窗口（子窗口），它们依赖父窗口的位置
    forAllWindows(mPerformLayoutAttached, true /* traverseTopToBottom */);

    // 窗口帧可能已改变，通知 InputDispatcher
    mInputMonitor.setUpdateInputWindowsNeededLw();
    if (updateInputWindows) {
        mInputMonitor.updateInputWindowsLw(false /*force*/);
    }
}
```

### 第一阶段：根窗口布局（mPerformLayout）

```java
// DisplayContent.java line 1038
private final Consumer<WindowState> mPerformLayout = w -> {
    if (w.mLayoutAttached) {
        return; // 跳过子窗口，留到第二阶段处理
    }

    final boolean gone = w.isGoneForLayout();

    if (!gone || !w.mHaveFrame || w.mLayoutNeeded) {
        if (mTmpInitial) {
            w.resetContentChanged();
        }
        w.mSurfacePlacementNeeded = true;
        w.mLayoutNeeded = false;

        final boolean firstLayout = !w.isLaidOut();
        getDisplayPolicy().layoutWindowLw(w, null, mDisplayFrames);
        w.mLayoutSeq = mLayoutSeq;

        if (firstLayout) {
            if (!w.getFrame().isEmpty()) {
                w.updateLastFrames();
                // ...
            }
            w.onResizeHandled();
        }
    }
};
```

### 第二阶段：子窗口布局（mPerformLayoutAttached）

```java
// DisplayContent.java line 1104
private final Consumer<WindowState> mPerformLayoutAttached = w -> {
    if (!w.mLayoutAttached) {
        return; // 跳过根窗口
    }
    if ((w.mViewVisibility != GONE && w.mRelayoutCalled) || !w.mHaveFrame
            || w.mLayoutNeeded) {
        if (mTmpInitial) {
            w.resetContentChanged();
        }
        w.mSurfacePlacementNeeded = true;
        w.mLayoutNeeded = false;
        getDisplayPolicy().layoutWindowLw(w, w.getParentWindow(), mDisplayFrames);
        w.mLayoutSeq = mLayoutSeq;
    }
};
```

两个阶段的核心区别在于 `layoutWindowLw` 的第二个参数 `attached`：
- 根窗口传 `null`
- 子窗口传 `w.getParentWindow()`（父窗口的 WindowState）

## DisplayPolicy.layoutWindowLw()

`DisplayPolicy.layoutWindowLw()` 是连接布局遍历与实际帧计算的桥梁：

```java
// DisplayPolicy.java line 1703
public void layoutWindowLw(WindowState win, WindowState attached, DisplayFrames displayFrames) {
    if (win.skipLayout()) {
        return;
    }

    // 获取适配当前旋转的 DisplayFrames
    displayFrames = win.getDisplayFrames(displayFrames);

    final WindowManager.LayoutParams attrs = win.mAttrs.forRotation(displayFrames.mRotation);
    sTmpClientFrames.attachedFrame = attached != null ? attached.getFrame() : null;

    // 如果窗口有不同旋转的 LayoutParams，不信任其请求的尺寸
    final boolean trustedSize = attrs == win.mAttrs;
    final int requestedWidth = trustedSize ? win.mRequestedWidth : UNSPECIFIED_LENGTH;
    final int requestedHeight = trustedSize ? win.mRequestedHeight : UNSPECIFIED_LENGTH;

    mWindowLayout.computeFrames(attrs, win.getInsetsState(), displayFrames.mDisplayCutoutSafe,
            win.getBounds(), win.getWindowingMode(), requestedWidth, requestedHeight,
            win.getRequestedVisibleTypes(), win.mGlobalScale, sTmpClientFrames);

    win.setFrames(sTmpClientFrames, win.mRequestedWidth, win.mRequestedHeight);
}
```

关键输入参数：
- `attrs`：窗口的 LayoutParams（可能经过旋转适配）
- `win.getInsetsState()`：当前 insets 状态
- `displayFrames.mDisplayCutoutSafe`：cutout 安全区域
- `win.getBounds()`：窗口所在 Task 的边界
- `win.getWindowingMode()`：窗口模式（全屏、分屏、画中画等）
- `requestedWidth/Height`：应用请求的尺寸（来自 measure 阶段）
- `win.mGlobalScale`：全局缩放比例（兼容模式）

## WindowLayout.computeFrames() 核心算法

这是窗口帧计算的核心方法，分为五个阶段。

![计算流程](/img/android/computeFrames/03_compute_frames_flow.svg)

### 方法签名

```java
// WindowLayout.java line 71
public void computeFrames(WindowManager.LayoutParams attrs, InsetsState state,
        Rect displayCutoutSafe, Rect windowBounds, @WindowingMode int windowingMode,
        int requestedWidth, int requestedHeight, @InsetsType int requestedVisibleTypes,
        float compatScale, ClientWindowFrames frames)
```

方法开头首先从参数中提取常用变量：

```java
// WindowLayout.java line 75
final int type = attrs.type;
final int fl = attrs.flags;
final int pfl = attrs.privateFlags;
final boolean layoutInScreen = (fl & FLAG_LAYOUT_IN_SCREEN) == FLAG_LAYOUT_IN_SCREEN;
final Rect attachedWindowFrame = frames.attachedFrame;
final Rect outDisplayFrame = frames.displayFrame;
final Rect outParentFrame = frames.parentFrame;
final Rect outFrame = frames.frame;
```

### 阶段一：计算受 Insets 约束的 displayFrame

首先根据窗口的 `fitInsetsTypes` 和 `fitInsetsSides` 属性，计算被 insets 收缩后的显示区域：

```java
// WindowLayout.java line 85
final Insets insets = state.calculateInsets(windowBounds, attrs.getFitInsetsTypes(),
        attrs.isFitInsetsIgnoringVisibility());
final int sides = attrs.getFitInsetsSides();
final int left = (sides & WindowInsets.Side.LEFT) != 0 ? insets.left : 0;
final int top = (sides & WindowInsets.Side.TOP) != 0 ? insets.top : 0;
final int right = (sides & WindowInsets.Side.RIGHT) != 0 ? insets.right : 0;
final int bottom = (sides & WindowInsets.Side.BOTTOM) != 0 ? insets.bottom : 0;
outDisplayFrame.set(windowBounds.left + left, windowBounds.top + top,
        windowBounds.right - right, windowBounds.bottom - bottom);
```

`InsetsState.calculateInsets()` 遍历所有 InsetsSource，对匹配类型的 source 取最大 insets：

```java
// InsetsState.java line 276
public Insets calculateInsets(Rect frame, @InsetsType int types, boolean ignoreVisibility) {
    Insets insets = Insets.NONE;
    for (int i = mSources.size() - 1; i >= 0; i--) {
        final InsetsSource source = mSources.valueAt(i);
        if ((source.getType() & types) == 0) {
            continue;
        }
        insets = Insets.max(source.calculateInsets(frame, ignoreVisibility), insets);
    }
    return insets;
}
```

### 阶段二：确定 parentFrame

parentFrame 是 Gravity 布局和 MATCH_PARENT 的参考框架。确定逻辑取决于是否有父窗口：

```java
// WindowLayout.java line 95
if (attachedWindowFrame == null) {
    // 根窗口：parentFrame = displayFrame
    outParentFrame.set(outDisplayFrame);
    if ((pfl & PRIVATE_FLAG_INSET_PARENT_FRAME_BY_IME) != 0) {
        // 如果设置了 INSET_PARENT_FRAME_BY_IME 标志，还要减去 IME 的 insets
        final InsetsSource source = state.peekSource(ID_IME);
        if (source != null) {
            outParentFrame.inset(source.calculateInsets(
                    outParentFrame, false /* ignoreVisibility */));
        }
    }
} else {
    // 子窗口：
    // - 如果没有 FLAG_LAYOUT_IN_SCREEN：parentFrame = 父窗口的帧
    // - 如果有 FLAG_LAYOUT_IN_SCREEN：parentFrame = displayFrame
    outParentFrame.set(!layoutInScreen ? attachedWindowFrame : outDisplayFrame);
}
```

### 阶段三：处理 DisplayCutout 约束

根据窗口的 `layoutInDisplayCutoutMode` 对 parentFrame 和 displayFrame 进行 cutout 安全区域裁切：

```java
// WindowLayout.java line 110-115 (此处源码有厂商定制，文档展示 AOSP 原始逻辑)
final int cutoutMode = attrs.layoutInDisplayCutoutMode;
final DisplayCutout cutout = state.getDisplayCutout();
final Rect displayCutoutSafeExceptMaybeBars = mTempDisplayCutoutSafeExceptMaybeBarsRect;
displayCutoutSafeExceptMaybeBars.set(displayCutoutSafe);
```

不同 cutoutMode 的处理：

- **LAYOUT_IN_DISPLAY_CUTOUT_MODE_ALWAYS**：不做任何 cutout 裁切，直接跳过。
- **LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES**：只在短边方向保持 cutout 安全区域限制，长边方向放开（允许延伸到 cutout 区域）。
- **LAYOUT_IN_DISPLAY_CUTOUT_MODE_DEFAULT**：严格遵守 cutout 安全区域。但如果窗口设置了 `FLAG_LAYOUT_IN_SCREEN | FLAG_LAYOUT_INSET_DECOR`，且系统栏的 insets 已经覆盖了 cutout 的安全距离，则可以放开该方向的 cutout 限制。

```java
// WindowLayout.java line 124
if (cutoutMode == LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES) {
    if (displayFrame.width() < displayFrame.height()) {
        // 竖屏：短边是水平方向，放开垂直方向
        displayCutoutSafeExceptMaybeBars.top = MIN_Y;
        displayCutoutSafeExceptMaybeBars.bottom = MAX_Y;
    } else {
        // 横屏：短边是垂直方向，放开水平方向
        displayCutoutSafeExceptMaybeBars.left = MIN_X;
        displayCutoutSafeExceptMaybeBars.right = MAX_X;
    }
}
```

系统栏覆盖 cutout 时的放开逻辑：

```java
// WindowLayout.java line 133
final boolean layoutInsetDecor = (attrs.flags & FLAG_LAYOUT_INSET_DECOR) != 0;
if (layoutInScreen && layoutInsetDecor
        && (cutoutMode == LAYOUT_IN_DISPLAY_CUTOUT_MODE_DEFAULT
        || cutoutMode == LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES)) {
    final Insets systemBarsInsets = state.calculateInsets(
            displayFrame, systemBars(), requestedVisibleTypes);
    if (systemBarsInsets.left >= cutout.getSafeInsetLeft()) {
        displayCutoutSafeExceptMaybeBars.left = MIN_X;
    }
    if (systemBarsInsets.top >= cutout.getSafeInsetTop()) {
        displayCutoutSafeExceptMaybeBars.top = MIN_Y;
    }
    if (systemBarsInsets.right >= cutout.getSafeInsetRight()) {
        displayCutoutSafeExceptMaybeBars.right = MAX_X;
    }
    if (systemBarsInsets.bottom >= cutout.getSafeInsetBottom()) {
        displayCutoutSafeExceptMaybeBars.bottom = MAX_Y;
    }
}
```

IME 窗口的特殊处理：如果导航栏存在，IME 窗口的底部始终可以延伸到底部 cutout 区域下方：

```java
// WindowLayout.java line 152
if (type == TYPE_INPUT_METHOD
        && displayCutoutSafeExceptMaybeBars.bottom != MAX_Y
        && state.calculateInsets(displayFrame, navigationBars(), true).bottom > 0) {
    displayCutoutSafeExceptMaybeBars.bottom = MAX_Y;
}
```

最终对 parentFrame 和 displayFrame 应用 cutout 安全区域交集：

```java
// WindowLayout.java line 176
final boolean attachedInParent = attachedWindowFrame != null && !layoutInScreen;
final boolean floatingInScreenWindow = !attrs.isFullscreen() && layoutInScreen
        && type != TYPE_BASE_APPLICATION;

// 依附于父窗口的子窗口和浮动窗口不需要额外的 cutout 约束
if (!attachedInParent && !floatingInScreenWindow) {
    mTempRect.set(outParentFrame);
    outParentFrame.intersectUnchecked(displayCutoutSafeExceptMaybeBars);
    frames.isParentFrameClippedByDisplayCutout = !mTempRect.equals(outParentFrame);
}
outDisplayFrame.intersectUnchecked(displayCutoutSafeExceptMaybeBars);
```

### FLAG_LAYOUT_NO_LIMITS 处理

设置了 `FLAG_LAYOUT_NO_LIMITS` 的窗口可以超出屏幕边界，但 `TYPE_SYSTEM_ERROR` 窗口和多窗口模式下的窗口例外：

```java
// WindowLayout.java line 196
final boolean noLimits = (attrs.flags & FLAG_LAYOUT_NO_LIMITS) != 0;
final boolean inMultiWindowMode = WindowConfiguration.inMultiWindowMode(windowingMode);

if (noLimits && type != TYPE_SYSTEM_ERROR && !inMultiWindowMode) {
    outDisplayFrame.left = MIN_X;    // -100000
    outDisplayFrame.top = MIN_Y;     // -100000
    outDisplayFrame.right = MAX_X;   // 100000
    outDisplayFrame.bottom = MAX_Y;  // 100000
}
```

### 阶段四：计算窗口尺寸（w × h）

根据 LayoutParams 的 width/height 属性、请求尺寸和兼容缩放计算窗口的实际宽高：

```java
// WindowLayout.java line 208
final boolean hasCompatScale = compatScale != 1f;
final int pw = outParentFrame.width();
final int ph = outParentFrame.height();
final boolean extendedByCutout =
        (attrs.privateFlags & PRIVATE_FLAG_LAYOUT_SIZE_EXTENDED_BY_CUTOUT) != 0;
int rw = requestedWidth;
int rh = requestedHeight;
float x, y;
int w, h;
```

**确定 requestedWidth/Height**：如果视图层次尚未 measure（值为 `UNSPECIFIED_LENGTH`），或设置了 `PRIVATE_FLAG_LAYOUT_SIZE_EXTENDED_BY_CUTOUT`，则使用 attrs 中指定的尺寸或父帧尺寸：

```java
// WindowLayout.java line 223
if (rw == UNSPECIFIED_LENGTH || extendedByCutout) {
    rw = attrs.width >= 0 ? attrs.width : pw;
}
if (rh == UNSPECIFIED_LENGTH || extendedByCutout) {
    rh = attrs.height >= 0 ? attrs.height : ph;
}
```

**尺寸计算**分为两种情况：

**FLAG_SCALED 窗口**（缩放窗口）：

```java
// WindowLayout.java line 230
if ((attrs.flags & FLAG_SCALED) != 0) {
    if (attrs.width < 0) {
        w = pw;
    } else if (hasCompatScale) {
        w = (int) (attrs.width * compatScale + .5f);
    } else {
        w = attrs.width;
    }
    // height 同理
}
```

**普通窗口**：

```java
// WindowLayout.java line 246
if (attrs.width == MATCH_PARENT) {
    w = pw;
} else if (hasCompatScale) {
    w = (int) (rw * compatScale + .5f);
} else {
    w = rw;
}
// height 同理
```

**多窗口模式下的尺寸限制**：

```java
// WindowLayout.java line 270
if (inMultiWindowMode
        && (attrs.privateFlags & PRIVATE_FLAG_LAYOUT_CHILD_WINDOW_IN_PARENT_FRAME) == 0) {
    w = Math.min(w, pw);
    h = Math.min(h, ph);
}
```

### 阶段五：Gravity 定位与 Display 适配

首先判断是否需要 fitToDisplay：

```java
// WindowLayout.java line 285
final boolean fitToDisplay = !inMultiWindowMode
        || ((attrs.type != TYPE_BASE_APPLICATION) && !noLimits);
```

- 全屏模式下的窗口始终需要 fitToDisplay
- 多窗口模式下，`TYPE_BASE_APPLICATION` 类型的窗口不做 fitToDisplay（它们的位置由 Task 边界决定）

然后使用 `Gravity.apply()` 将窗口放置到 parentFrame 中，再使用 `Gravity.applyDisplay()` 确保窗口不超出 displayFrame：

```java
// WindowLayout.java line 289
Gravity.apply(attrs.gravity, w, h, outParentFrame,
        (int) (x + attrs.horizontalMargin * pw),
        (int) (y + attrs.verticalMargin * ph), outFrame);

if (fitToDisplay) {
    Gravity.applyDisplay(attrs.gravity, outDisplayFrame, outFrame);
}
```

**Gravity.apply()** 根据 gravity 标志在容器内定位窗口：

```java
// Gravity.java line 218
public static void apply(int gravity, int w, int h, Rect container,
        int xAdj, int yAdj, Rect outRect) {
    // 水平方向：根据 gravity 的 X 轴拉力确定 left/right
    switch (gravity & ((AXIS_PULL_BEFORE | AXIS_PULL_AFTER) << AXIS_X_SHIFT)) {
        case 0: // CENTER_HORIZONTAL
            outRect.left = container.left
                    + ((container.right - container.left - w) / 2) + xAdj;
            outRect.right = outRect.left + w;
            break;
        case AXIS_PULL_BEFORE << AXIS_X_SHIFT: // LEFT
            outRect.left = container.left + xAdj;
            outRect.right = outRect.left + w;
            break;
        case AXIS_PULL_AFTER << AXIS_X_SHIFT: // RIGHT
            outRect.right = container.right - xAdj;
            outRect.left = outRect.right - w;
            break;
        default: // FILL_HORIZONTAL
            outRect.left = container.left + xAdj;
            outRect.right = container.right + xAdj;
            break;
    }
    // 垂直方向同理
    // ...
}
```

**Gravity.applyDisplay()** 确保窗口可见于 display 区域内：

```java
// Gravity.java line 350
public static void applyDisplay(int gravity, Rect display, Rect inoutObj) {
    // 垂直方向
    if ((gravity & DISPLAY_CLIP_VERTICAL) != 0) {
        // 裁切模式：直接裁切到 display 边界
        if (inoutObj.top < display.top) inoutObj.top = display.top;
        if (inoutObj.bottom > display.bottom) inoutObj.bottom = display.bottom;
    } else {
        // 移动模式：尽量平移窗口使其可见
        int off = 0;
        if (inoutObj.top < display.top) off = display.top - inoutObj.top;
        else if (inoutObj.bottom > display.bottom) off = display.bottom - inoutObj.bottom;
        if (off != 0) {
            if (inoutObj.height() > (display.bottom - display.top)) {
                inoutObj.top = display.top;
                inoutObj.bottom = display.bottom;
            } else {
                inoutObj.top += off;
                inoutObj.bottom += off;
            }
        }
    }
    // 水平方向同理
    // ...
}
```

### 扩展帧处理（extendFrameByCutout）

如果窗口设置了 `PRIVATE_FLAG_LAYOUT_SIZE_EXTENDED_BY_CUTOUT`，计算完成后还会将帧扩展到 cutout 区域：

```java
// WindowLayout.java line 298
if (extendedByCutout) {
    extendFrameByCutout(displayCutoutSafe, outDisplayFrame, outFrame, mTempRect);
}
```

```java
// WindowLayout.java line 316
public static void extendFrameByCutout(Rect displayCutoutSafe,
        Rect displayFrame, Rect inOutFrame, Rect tempRect) {
    if (displayCutoutSafe.contains(inOutFrame)) {
        return; // 帧完全在安全区域内，无需扩展
    }
    tempRect.set(inOutFrame);
    // 将帧移入 cutout 安全区域
    Gravity.applyDisplay(0 /* gravity */, displayCutoutSafe, tempRect);
    if (tempRect.intersect(displayFrame)) {
        inOutFrame.union(tempRect); // 合并原帧和移动后的帧
    }
}
```

## WindowState.setFrames()：结果写入

计算完成后，`DisplayPolicy.layoutWindowLw()` 调用 `WindowState.setFrames()` 将结果写入窗口状态：

```java
// WindowState.java line 1450
void setFrames(ClientWindowFrames clientWindowFrames, int requestedWidth, int requestedHeight) {
    final WindowFrames windowFrames = mWindowFrames;
    mTmpRect.set(windowFrames.mParentFrame);

    // 写入三个核心帧
    windowFrames.mDisplayFrame.set(clientWindowFrames.displayFrame);
    windowFrames.mParentFrame.set(clientWindowFrames.parentFrame);
    windowFrames.mFrame.set(clientWindowFrames.frame);

    // 计算兼容帧（应用坐标空间）
    windowFrames.mCompatFrame.set(windowFrames.mFrame);
    if (mInvGlobalScale != 1f) {
        windowFrames.mCompatFrame.scale(mInvGlobalScale);
    }
    windowFrames.setParentFrameWasClippedByDisplayCutout(
            clientWindowFrames.isParentFrameClippedByDisplayCutout);

    // 计算相对帧（相对于父容器的偏移）
    windowFrames.mRelFrame.set(windowFrames.mFrame);
    WindowContainer<?> parent = getParent();
    int parentLeft = 0;
    int parentTop = 0;
    if (mIsChildWindow) {
        parentLeft = ((WindowState) parent).mWindowFrames.mFrame.left;
        parentTop = ((WindowState) parent).mWindowFrames.mFrame.top;
    } else if (parent != null) {
        final Rect parentBounds = parent.getBounds();
        parentLeft = parentBounds.left;
        parentTop = parentBounds.top;
    }
    windowFrames.mRelFrame.offsetTo(windowFrames.mFrame.left - parentLeft,
            windowFrames.mFrame.top - parentTop);

    // 检测内容变化
    if (requestedWidth != mLastRequestedWidth || requestedHeight != mLastRequestedHeight
            || !mTmpRect.equals(windowFrames.mParentFrame)) {
        mLastRequestedWidth = requestedWidth;
        mLastRequestedHeight = requestedHeight;
        windowFrames.setContentChanged(true);
    }

    // 检测帧变化，加入 mFrameChangingWindows
    if (!windowFrames.mFrame.equals(windowFrames.mLastFrame)
            || !windowFrames.mRelFrame.equals(windowFrames.mLastRelFrame)) {
        mWmService.mFrameChangingWindows.add(this);
    }

    // ...
    updateSourceFrame(windowFrames.mFrame);
    // ...
    mSurfacePlacementNeeded = true;
    mHaveFrame = true;
}
```

## 客户端计算：ViewRootImpl

窗口帧计算不仅在服务端（system_server）进行，也在客户端（应用进程的 ViewRootImpl）中进行。客户端使用同样的 `WindowLayout.computeFrames()` 方法，在两个场景下调用：

### 场景一：窗口添加后的初始布局

```java
// ViewRootImpl.java line 2070
mWindowLayout.computeFrames(mWindowAttributes, state,
        displayCutoutSafe, winConfig.getBounds(), winConfig.getWindowingMode(),
        UNSPECIFIED_LENGTH, UNSPECIFIED_LENGTH,
        mInsetsController.getRequestedVisibleTypes(), 1f /* compatScale */,
        mTmpFrames);
setFrame(mTmpFrames.frame, true /* withinRelayout */);
```

### 场景二：异步 relayout 优化

当窗口属性变更但无需完整 relayout 时，客户端可以本地计算新帧：

```java
// ViewRootImpl.java line 10405
mWindowLayout.computeFrames(mWindowAttributes.forRotation(winConfig.getRotation()),
        state, displayCutoutSafe, winConfig.getBounds(),
        winConfig.getWindowingMode(),
        measuredWidth, measuredHeight, mInsetsController.getRequestedVisibleTypes(),
        1f /* compatScale */, mTmpFrames);
```

只有当帧的位置和大小同时发生变化时才需要完整的 relayout（涉及 BLAST 同步），否则可以通过 `relayoutAsync` 异步发送属性更新。

## Windowless 窗口的帧计算

嵌入式窗口（通过 `WindowlessWindowManager` 管理）使用 `WindowlessWindowLayout`——`WindowLayout` 的子类。它不受 insets 和 cutout 的影响，帧计算完全由父窗口边界决定：

```java
// WindowlessWindowLayout.java line 43
@Override
public void computeFrames(WindowManager.LayoutParams attrs, InsetsState state,
        Rect displayCutoutSafe, Rect windowBounds, @WindowingMode int windowingMode,
        int requestedWidth, int requestedHeight, @InsetsType int requestedVisibleTypes,
        float compatScale, ClientWindowFrames frames) {
    if (frames.attachedFrame == null) {
        frames.frame.set(0, 0, attrs.width, attrs.height);
        frames.parentFrame.set(frames.frame);
        frames.displayFrame.set(frames.frame);
        return;
    }

    final int height = calculateLength(attrs.height, requestedHeight,
            frames.attachedFrame.height());
    final int width = calculateLength(attrs.width, requestedWidth,
            frames.attachedFrame.width());
    Gravity.apply(attrs.gravity, width, height, frames.attachedFrame,
            (int) (attrs.x + attrs.horizontalMargin),
            (int) (attrs.y + attrs.verticalMargin),
            frames.frame);
    frames.displayFrame.set(frames.frame);
    frames.parentFrame.set(frames.attachedFrame);
}
```

## Surface 尺寸计算：computeSurfaceSize

帧计算完成后，窗口的 Surface 实际尺寸由 `WindowLayout.computeSurfaceSize()` 确定：

```java
// WindowLayout.java line 331
public static void computeSurfaceSize(WindowManager.LayoutParams attrs, Rect maxBounds,
        int requestedWidth, int requestedHeight, Rect winFrame, boolean dragResizing,
        Point outSurfaceSize) {
    int width;
    int height;
    if ((attrs.flags & WindowManager.LayoutParams.FLAG_SCALED) != 0) {
        // 缩放窗口始终使用请求的尺寸
        width = requestedWidth;
        height = requestedHeight;
    } else {
        if (dragResizing) {
            // 拖拽调整大小时使用全屏尺寸，避免频繁重新分配 buffer
            width = maxBounds.width();
            height = maxBounds.height();
        } else {
            width = winFrame.width();
            height = winFrame.height();
        }
    }

    if (width < 1) width = 1;
    if (height < 1) height = 1;

    // 加上 surface insets（用于阴影等效果）
    final Rect surfaceInsets = attrs.surfaceInsets;
    width += surfaceInsets.left + surfaceInsets.right;
    height += surfaceInsets.top + surfaceInsets.bottom;

    outSurfaceSize.set(width, height);
}
```

## 模拟布局：simulateLayoutDisplay

`DisplayPolicy.simulateLayoutDisplay()` 用于在不实际修改窗口状态的情况下预先计算 insets source 窗口的帧，以确定系统栏的位置：

```java
// DisplayPolicy.java line 1668
void simulateLayoutDisplay(DisplayFrames displayFrames) {
    sTmpClientFrames.attachedFrame = null;
    for (int i = mInsetsSourceWindowsExceptIme.size() - 1; i >= 0; i--) {
        final WindowState win = mInsetsSourceWindowsExceptIme.valueAt(i);
        mWindowLayout.computeFrames(win.mAttrs.forRotation(displayFrames.mRotation),
                displayFrames.mInsetsState, displayFrames.mDisplayCutoutSafe,
                displayFrames.mUnrestricted, win.getWindowingMode(), UNSPECIFIED_LENGTH,
                UNSPECIFIED_LENGTH, win.getRequestedVisibleTypes(), win.mGlobalScale,
                sTmpClientFrames);
        final SparseArray<InsetsSourceProvider> providers = win.getInsetsSourceProviders();
        final InsetsState state = displayFrames.mInsetsState;
        for (int index = providers.size() - 1; index >= 0; index--) {
            state.addSource(providers.valueAt(index).createSimulatedSource(
                    displayFrames, sTmpClientFrames.frame));
        }
    }
}
```

该方法遍历所有提供 insets 的窗口（状态栏、导航栏等，不含 IME），为它们计算帧并更新 InsetsState 中的模拟 source。这确保了后续普通窗口的帧计算能正确感知系统栏的位置。
