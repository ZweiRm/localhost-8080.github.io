---
prev:
    text: 'SurfaceControl & Transaction 流程'
    link: '/framework/surfacecontrol-transaction'
next:
    text: '窗口布局流程 relayoutWindow'
    link: '/framework/relayoutWindow'
---

# Choreographer 与 VSync 机制

本文档覆盖 Android 帧调度的核心链路：VSync 信号从 SurfaceFlinger 到达应用进程 → Choreographer 调度回调 → ViewRootImpl 执行 measure/layout/draw 的完整流程。

## 一、概述

### 1.1 Choreographer 的角色

**Choreographer（编舞者）** 是 Android 应用进程中帧调度的核心枢纽。它接收来自显示子系统的 VSync（垂直同步）脉冲信号，协调输入处理、动画计算和视图绘制，确保所有可视更新与屏幕刷新节奏对齐。

> 应用一般不直接使用 Choreographer，而是通过 `View.invalidate()`、`ValueAnimator.start()` 等高层 API 间接驱动帧调度。

### 1.2 核心模块

帧调度流程涉及以下核心模块，跨越 Native 层和 Java 层：

| 模块 | 所在层/进程 | 职责 |
|------|------------|------|
| SurfaceFlinger | Native / surfaceflinger 进程 | 生成 VSync 信号，管理显示合成 |
| DisplayEventReceiver（Native） | Native / 应用进程 | 接收 VSync 事件，通过 JNI 回调到 Java 层 |
| DisplayEventReceiver（Java） | Java / 应用进程 | 定义 VSync 回调接口，调度信号到 Handler |
| Choreographer | Java / 应用进程 | 管理 5 类回调队列，按序执行帧工作 |
| ViewRootImpl | Java / 应用进程 | 注册 TRAVERSAL 回调，执行 View 树的 measure/layout/draw |

### 1.3 全链路总览

![全链路总览](/img/android/choreographer_vsync/01_overall_flow.svg)

## 二、VSync 信号的接收

下图展示 VSync 信号从 SurfaceFlinger 到 Choreographer.doFrame() 的完整路径，按 surfaceflinger 进程、应用进程 Native 层、Java 层三个泳道呈现：

![VSync 信号传递路径](/img/android/choreographer_vsync/03_vsync_signal_path.svg)

### 2.1 Native 层：DisplayEventDispatcher

VSync 信号由 SurfaceFlinger 通过 BitTube（socket pair）发送到应用进程。Native 层的 `DisplayEventDispatcher`（libgui）通过 Looper 监听 BitTube 的 fd，收到事件后调用 `dispatchVsync()`。

```cpp
// frameworks/native/libs/gui/DisplayEventDispatcher.cpp
// DisplayEventDispatcher 监听 BitTube fd，通过 Looper 回调分发事件
```

### 2.2 JNI 层：NativeDisplayEventReceiver

`NativeDisplayEventReceiver` 继承 `DisplayEventDispatcher`，在 `dispatchVsync()` 中将 Native 的 `VsyncEventData` 转换为 Java 对象，然后回调 Java 层的 `DisplayEventReceiver.dispatchVsync()`。

```cpp
// android_view_DisplayEventReceiver.cpp:75
class NativeDisplayEventReceiver : public DisplayEventDispatcher {
    // ...
    void dispatchVsync(nsecs_t timestamp, PhysicalDisplayId displayId, uint32_t count,
                       VsyncEventData vsyncEventData) override;
};
```

`dispatchVsync()` 的关键操作：

1. 将 C++ 的 `VsyncEventData` 转换为 Java 对象（包含 FrameTimeline 数组、frameInterval 等）
2. 调用 Java 的 `DisplayEventReceiver.dispatchVsync()`

```cpp
// android_view_DisplayEventReceiver.cpp:171
void NativeDisplayEventReceiver::dispatchVsync(nsecs_t timestamp, PhysicalDisplayId displayId,
                                               uint32_t count, VsyncEventData vsyncEventData) {
    JNIEnv* env = AndroidRuntime::getJNIEnv();
    // ... 创建 Java VsyncEventData 对象
    // 调用 Java 层 dispatchVsync()
    env->CallVoidMethod(receiverObj.get(),
            gDisplayEventReceiverClassInfo.dispatchVsync, timestamp, displayId.value, count);
}
```

### 2.3 Java 层：DisplayEventReceiver

`DisplayEventReceiver` 是 VSync 事件的 Java 侧接口，提供核心方法：

```java
// DisplayEventReceiver.java:339
public void scheduleVsync() {
    if (mReceiverPtr == 0) {
        Log.w(TAG, "Attempted to schedule a vertical sync pulse but the display event "
                + "receiver has already been disposed.");
    } else {
        nativeScheduleVsync(mReceiverPtr);  // FastNative，请求下一次 VSync
    }
}
```

- `scheduleVsync()`：请求下一次 VSync 脉冲（单次请求模型，非持续订阅）
- `onVsync()`：VSync 到达时的回调（由子类 `FrameDisplayEventReceiver` 重写）
- `getLatestVsyncEventData()`：从 SurfaceFlinger 获取最新的时间线数据

#### VsyncEventData 数据结构

```java
// DisplayEventReceiver.java
public static class VsyncEventData {
    public long frameInterval;                    // 帧间隔（纳秒）
    public int preferredFrameTimelineIndex;       // 推荐的时间线索引
    public final FrameTimeline[] frameTimelines;   // 最多 7 条可选帧时间线
    public int frameTimelinesLength;              // 实际时间线数量
}

public static class FrameTimeline {
    public long vsyncId;                          // VSync 标识符
    public long expectedPresentationTime;         // 预期上屏时间（纳秒）
    public long deadline;                         // 帧完成截止时间（纳秒）
}
```

`FrameTimeline` 提供了一个帧时间窗口：应用必须在 `deadline` 之前完成渲染，帧才会在 `expectedPresentationTime` 时刻准时上屏。SurfaceFlinger 提供多条时间线，允许应用在延迟时选择更晚的时间线。

## 三、Choreographer 核心机制

### 3.0 Choreographer 内部结构

![Choreographer 内部结构](/img/android/choreographer_vsync/02_choreographer_structure.svg)

### 3.1 线程模型与初始化

Choreographer 是**线程单例**——每个拥有 Looper 的线程最多有一个实例：

```java
// Choreographer.java:377
public static Choreographer getInstance() {
    return sThreadInstance.get();  // ThreadLocal<Choreographer>
}
```

构造函数初始化核心组件：

```java
// Choreographer.java:335
private Choreographer(Looper looper, int vsyncSource, long layerHandle) {
    mLooper = looper;
    mHandler = new FrameHandler(looper);
    mDisplayEventReceiver = USE_VSYNC
            ? new FrameDisplayEventReceiver(looper, vsyncSource, layerHandle)
            : null;
    mLastFrameTimeNanos = Long.MIN_VALUE;
    mFrameIntervalNanos = (long)(1000000000 / getRefreshRate());

    mCallbackQueues = new CallbackQueue[CALLBACK_LAST + 1];
    for (int i = 0; i <= CALLBACK_LAST; i++) {
        mCallbackQueues[i] = new CallbackQueue();
    }
    setFPSDivisor(SystemProperties.getInt(ThreadedRenderer.DEBUG_FPS_DIVISOR, 1));
}
```

关键成员：

| 字段 | 类型 | 说明 |
|------|------|------|
| `mHandler` | FrameHandler | 处理帧消息（MSG_DO_FRAME, MSG_DO_SCHEDULE_VSYNC 等） |
| `mDisplayEventReceiver` | FrameDisplayEventReceiver | 接收 VSync 信号 |
| `mCallbackQueues[]` | CallbackQueue[5] | 5 类回调的有序队列 |
| `mFrameInfo` | FrameInfo | 帧时间信息，用于性能追踪 |
| `mFrameIntervalNanos` | long | 帧间隔（16.6ms @60Hz） |
| `mFrameScheduled` | boolean | 是否已请求下一帧 |

### 3.2 五类回调

Choreographer 维护 5 个按优先级排序的回调队列，每帧按序执行：

| 序号 | 常量 | 名称 | 说明 |
|------|------|------|------|
| 0 | `CALLBACK_INPUT` | 输入 | 处理输入事件，最先执行 |
| 1 | `CALLBACK_ANIMATION` | 动画 | ValueAnimator 等动画帧回调 |
| 2 | `CALLBACK_INSETS_ANIMATION` | Insets 动画 | WindowInsets 动画更新，需在 ANIMATION 之后、TRAVERSAL 之前执行 |
| 3 | `CALLBACK_TRAVERSAL` | 遍历 | View 树的 measure/layout/draw，由 ViewRootImpl 注册 |
| 4 | `CALLBACK_COMMIT` | 提交 | 帧后处理，如果帧严重延迟会调整帧时间 |

```java
// Choreographer.java:265
private static final String[] CALLBACK_TRACE_TITLES = {
    "input", "animation", "insets_animation", "traversal", "commit"
};
```

执行顺序的设计意图：先处理输入（用户操作立即响应） → 再计算动画（更新属性值） → 再执行布局和绘制（反映最新状态） → 最后提交（帧时间校正）。

### 3.3 回调注册：postCallback

外部通过 `postCallback()` 系列方法注册回调：

```
postCallback(callbackType, action, token)
  → postCallbackDelayed(callbackType, action, token, delayMillis)
    → postCallbackDelayedInternal(callbackType, action, token, delayMillis)
```

`postCallbackDelayedInternal()` 的核心逻辑：

1. 将回调插入对应类型的 `CallbackQueue`（按 dueTime 排序的链表）
2. 如果回调已到期（`dueTime <= now`），调用 `scheduleFrameLocked()` 请求下一帧
3. 如果回调延迟执行，发送 `MSG_DO_SCHEDULE_CALLBACK` 消息在到期时触发调度

### 3.4 帧调度：scheduleFrameLocked

下图展示 `scheduleFrameLocked()` 的完整决策流程：

![帧调度流程](/img/android/choreographer_vsync/04_schedule_frame_flow.svg)

```java
// Choreographer.java:898
private void scheduleFrameLocked(long now) {
    if (!mFrameScheduled) {
        mFrameScheduled = true;
        if (USE_VSYNC) {
            // 在 Looper 线程直接请求 VSync
            if (isRunningOnLooperThreadLocked()) {
                scheduleVsyncLocked();
            } else {
                // 非 Looper 线程，发消息到 Handler
                Message msg = mHandler.obtainMessage(MSG_DO_SCHEDULE_VSYNC);
                msg.setAsynchronous(true);
                mHandler.sendMessageAtFrontOfQueue(msg);
            }
        } else {
            // 不使用 VSync 时，按帧间隔延迟发送 MSG_DO_FRAME
            final long nextFrameTime = Math.max(
                    mLastFrameTimeNanos / TimeUtils.NANOS_PER_MS + sFrameDelay, now);
            Message msg = mHandler.obtainMessage(MSG_DO_FRAME);
            msg.setAsynchronous(true);
            mHandler.sendMessageAtTime(msg, nextFrameTime);
        }
    }
}
```

关键设计：
- `mFrameScheduled` 保证同一时刻最多只有一次 VSync 请求（去重）
- 消息设置为**异步消息**（`setAsynchronous(true)`），能穿越 ViewRootImpl 设置的同步屏障
- 非 Looper 线程的请求会通过 `sendMessageAtFrontOfQueue` 尽快到达 Looper 线程

### 3.5 VSync 请求：scheduleVsyncLocked

```java
// Choreographer.java:1293
private void scheduleVsyncLocked() {
    try {
        Trace.traceBegin(Trace.TRACE_TAG_VIEW, "Choreographer#scheduleVsyncLocked");
        mDisplayEventReceiver.scheduleVsync();
    } finally {
        Trace.traceEnd(Trace.TRACE_TAG_VIEW);
    }
}
```

`scheduleVsync()` 最终调用 `nativeScheduleVsync()`，通过 Binder 向 SurfaceFlinger 请求在**下一次**屏幕刷新时发送一个 VSync 脉冲。这是单次请求模型——每帧都需要重新请求。

## 四、帧处理：doFrame

### 4.1 VSync 到达 → doFrame 调用链

VSync 信号到达后的调用链：

```
SurfaceFlinger 发送 VSync
  → NativeDisplayEventReceiver::dispatchVsync()        [Native]
    → DisplayEventReceiver.dispatchVsync()              [JNI 回调到 Java]
      → FrameDisplayEventReceiver.onVsync()             [Java]
        → 封装 Message(this) 投递到 Handler
          → FrameDisplayEventReceiver.run()              [Handler 消息处理]
            → Choreographer.doFrame()
```

#### FrameDisplayEventReceiver.onVsync()

```java
// Choreographer.java:1619
public void onVsync(long timestampNanos, long physicalDisplayId, int frame,
        VsyncEventData vsyncEventData) {
    // 校验时间戳不在未来
    long now = System.nanoTime();
    if (timestampNanos > now) {
        Log.w(TAG, "Frame time is " + ((timestampNanos - now) * 0.000001f)
                + " ms in the future!");
        timestampNanos = now;
    }

    if (mHavePendingVsync) {
        Log.w(TAG, "Already have a pending vsync event.  There should only be "
                + "one at a time.");
    } else {
        mHavePendingVsync = true;
    }

    mTimestampNanos = timestampNanos;
    mFrame = frame;
    mLastVsyncEventData.copyFrom(vsyncEventData);

    // 将自身（Runnable）封装为异步 Message 投递到 Handler
    Message msg = Message.obtain(mHandler, this);
    msg.setAsynchronous(true);
    mHandler.sendMessageAtTime(msg, timestampNanos / TimeUtils.NANOS_PER_MS);
}
```

投递时机设为 VSync 时间戳（而非立即执行），目的是让**比 VSync 更早到达的消息**先被处理，避免 VSync 处理饿死消息队列中的其他工作。

#### FrameDisplayEventReceiver.run()

```java
// Choreographer.java:1685
public void run() {
    mHavePendingVsync = false;
    doFrame(mTimestampNanos, mFrame, mLastVsyncEventData);
}
```

### 4.2 doFrame 核心流程

下图展示 `doFrame()` 从 VSync 到达到回调执行完毕的完整流程：

![doFrame 处理流程](/img/android/choreographer_vsync/05_doframe_flow.svg)

`doFrame()` 是每帧处理的核心入口：

```java
// Choreographer.java:972
void doFrame(long frameTimeNanos, int frame,
        DisplayEventReceiver.VsyncEventData vsyncEventData) {
    final long startNanos;
    final long frameIntervalNanos = vsyncEventData.frameInterval;

    // 1. 更新 FrameData 的帧时间线
    FrameTimeline timeline = mFrameData.update(frameTimeNanos, vsyncEventData);

    synchronized (mLock) {
        if (!mFrameScheduled) {
            return;  // 没有待处理的帧
        }

        // 2. 计算抖动（jitter）：当前时间与 VSync 时间戳之差
        long intendedFrameTimeNanos = frameTimeNanos;
        startNanos = System.nanoTime();
        final long jitterNanos = startNanos - frameTimeNanos;

        // 3. 如果抖动超过一帧间隔，说明帧延迟了
        if (jitterNanos >= frameIntervalNanos) {
            // 对齐到最近的帧间隔网格
            long lastFrameOffset = jitterNanos % frameIntervalNanos;
            frameTimeNanos = startNanos - lastFrameOffset;

            final long skippedFrames = jitterNanos / frameIntervalNanos;
            if (skippedFrames >= SKIPPED_FRAME_WARNING_LIMIT) {
                Log.i(TAG, "Skipped " + skippedFrames + " frames!  "
                        + "The application may be doing too much work on its main thread.");
            }
            // 重新选择帧时间线
            timeline = mFrameData.update(frameTimeNanos, mDisplayEventReceiver, jitterNanos);
        }

        // 4. 防止帧时间回退
        if (frameTimeNanos < mLastFrameTimeNanos) {
            scheduleVsyncLocked();
            return;
        }

        // 5. FPS 除数检查（用于低帧率实验）
        if (mFPSDivisor > 1) { ... }

        // 6. 记录帧信息
        mFrameInfo.setVsync(intendedFrameTimeNanos, frameTimeNanos,
                vsyncEventData.preferredFrameTimeline().vsyncId,
                vsyncEventData.preferredFrameTimeline().deadline,
                startNanos, vsyncEventData.frameInterval);
        mFrameScheduled = false;
        mLastFrameTimeNanos = frameTimeNanos;
    }

    // 7. 锁定动画时钟
    AnimationUtils.lockAnimationClock(frameTimeNanos / TimeUtils.NANOS_PER_MS,
            timeline.mExpectedPresentationTimeNanos);

    // 8. 按序执行 5 类回调
    mFrameInfo.markInputHandlingStart();
    doCallbacks(Choreographer.CALLBACK_INPUT, frameIntervalNanos);

    mFrameInfo.markAnimationsStart();
    doCallbacks(Choreographer.CALLBACK_ANIMATION, frameIntervalNanos);
    doCallbacks(Choreographer.CALLBACK_INSETS_ANIMATION, frameIntervalNanos);

    mFrameInfo.markPerformTraversalsStart();
    doCallbacks(Choreographer.CALLBACK_TRAVERSAL, frameIntervalNanos);

    doCallbacks(Choreographer.CALLBACK_COMMIT, frameIntervalNanos);

    // 9. 解锁动画时钟
    AnimationUtils.unlockAnimationClock();
}
```

### 4.3 doCallbacks 详解

```java
// Choreographer.java:1189
void doCallbacks(int callbackType, long frameIntervalNanos) {
    CallbackRecord callbacks;
    long frameTimeNanos = mFrameData.mFrameTimeNanos;
    synchronized (mLock) {
        final long now = System.nanoTime();
        // 从队列中提取所有到期的回调
        callbacks = mCallbackQueues[callbackType].extractDueCallbacksLocked(
                now / TimeUtils.NANOS_PER_MS);
        if (callbacks == null) {
            return;
        }
        mCallbacksRunning = true;

        // COMMIT 阶段的特殊处理：如果帧延迟超过 2 个帧间隔，调整帧时间
        if (callbackType == Choreographer.CALLBACK_COMMIT) {
            final long jitterNanos = now - frameTimeNanos;
            if (frameIntervalNanos > 0 && jitterNanos >= 2 * frameIntervalNanos) {
                final long lastFrameOffset = jitterNanos % frameIntervalNanos
                        + frameIntervalNanos;
                frameTimeNanos = now - lastFrameOffset;
                mLastFrameTimeNanos = frameTimeNanos;
                mFrameData.update(frameTimeNanos, mDisplayEventReceiver, jitterNanos);
            }
        }
    }
    // 遍历执行所有回调
    for (CallbackRecord c = callbacks; c != null; c = c.next) {
        c.run(mFrameData);
    }
    // 回收 CallbackRecord 到对象池
    synchronized (mLock) {
        mCallbacksRunning = false;
        do {
            final CallbackRecord next = callbacks.next;
            recycleCallbackLocked(callbacks);
            callbacks = next;
        } while (callbacks != null);
    }
}
```

#### CallbackRecord 的执行逻辑

`CallbackRecord` 有两个 `run` 重载，互相配合处理三种回调类型：

```java
// Choreographer.java:1729
public void run(long frameTimeNanos) {
    if (token == FRAME_CALLBACK_TOKEN) {
        ((FrameCallback)action).doFrame(frameTimeNanos);
    } else {
        ((Runnable)action).run();
    }
}

// Choreographer.java:1737
void run(FrameData frameData) {
    frameData.setInCallback(true);
    if (token == VSYNC_CALLBACK_TOKEN) {
        ((VsyncCallback) action).onVsync(frameData);
    } else {
        run(frameData.getFrameTimeNanos());  // 委托给 run(long)
    }
    frameData.setInCallback(false);
}
```

`doCallbacks()` 调用 `run(FrameData)`，根据 token 类型分派：
- **VsyncCallback**（`VSYNC_CALLBACK_TOKEN`）：获取完整帧时间线数据（FrameData）
- **FrameCallback**（`FRAME_CALLBACK_TOKEN`）：获取帧时间戳（如动画系统使用）
- **Runnable**（其他 token）：简单执行（如 ViewRootImpl 的 TraversalRunnable）

## 五、ViewRootImpl 与 Choreographer 的协作

### 5.1 scheduleTraversals：注册帧回调

当 View 树需要更新时（`invalidate()` 或 `requestLayout()`），ViewRootImpl 通过 `scheduleTraversals()` 向 Choreographer 注册 TRAVERSAL 回调：

```java
// ViewRootImpl.java:3536
void scheduleTraversals() {
    if (!mTraversalScheduled) {
        mTraversalScheduled = true;
        // 1. 设置同步屏障，阻止非异步消息执行
        mTraversalBarrier = mHandler.getLooper().getQueue().postSyncBarrier();
        // 2. 向 Choreographer 注册 TRAVERSAL 回调
        mChoreographer.postCallback(
            Choreographer.CALLBACK_TRAVERSAL, mTraversalRunnable, null);
        notifyRendererOfFramePending();
        pokeDrawLockIfNeeded();
    }
}
```

**同步屏障（Sync Barrier）** 是关键设计：它阻止 MessageQueue 中的**同步消息**被处理，但允许**异步消息**（如 VSync 回调）通过。这确保 VSync 消息不会被其他消息阻塞。

![同步屏障机制](/img/android/choreographer_vsync/08_sync_barrier.svg)

### 5.2 TraversalRunnable

```java
// ViewRootImpl.java:11648
final class TraversalRunnable implements Runnable {
    @Override
    public void run() {
        doTraversal();
    }
}
final TraversalRunnable mTraversalRunnable = new TraversalRunnable();
```

### 5.3 doTraversal → performTraversals

```java
// ViewRootImpl.java:3583
void doTraversal() {
    if (mTraversalScheduled) {
        mTraversalScheduled = false;
        // 移除同步屏障，恢复正常消息处理
        mHandler.getLooper().getQueue().removeSyncBarrier(mTraversalBarrier);
        performTraversals();  // 执行 View 树的 measure → layout → draw
    }
}
```

`performTraversals()` 是 Android 视图系统中最核心（也最庞大）的方法，依次执行：

1. **measureHierarchy** / **performMeasure**：测量 View 树，确定每个 View 的大小
2. **performLayout**：布局 View 树，确定每个 View 的位置
3. **performDraw**：绘制 View 树，提交绘制命令到 RenderThread

### 5.4 从 View.invalidate() 到屏幕刷新的完整链路

![invalidate 到屏幕刷新](/img/android/choreographer_vsync/06_invalidate_to_draw.svg)

```
View.invalidate()
  → ViewGroup.invalidateChild() [向上遍历]
    → ViewRootImpl.invalidateChildInParent()
      → invalidateRectOnScreen()
        → scheduleTraversals()
          → postSyncBarrier()
          → mChoreographer.postCallback(CALLBACK_TRAVERSAL, mTraversalRunnable)
            → postCallbackDelayedInternal()
              → scheduleFrameLocked()
                → scheduleVsyncLocked()
                  → DisplayEventReceiver.scheduleVsync()
                    → nativeScheduleVsync()   [请求下一次 VSync]
                      ...
                      [等待 VSync 信号到达]
                      ...
                    → FrameDisplayEventReceiver.onVsync()
                      → Handler 投递消息
                        → FrameDisplayEventReceiver.run()
                          → Choreographer.doFrame()
                            → doCallbacks(CALLBACK_TRAVERSAL)
                              → TraversalRunnable.run()
                                → ViewRootImpl.doTraversal()
                                  → removeSyncBarrier()
                                  → performTraversals()
                                    → performMeasure()
                                    → performLayout()
                                    → performDraw()
                                      → RenderThread 执行实际渲染
                                        → 提交 Buffer 到 SurfaceFlinger 合成上屏
```

## 六、帧时间管理

### 6.1 FrameInfo：帧时间追踪

下图展示一帧从 VSync 到上屏的时间线，以及 FrameInfo 中各阶段标记的位置：

![帧时间线与 FrameInfo 阶段](/img/android/choreographer_vsync/07_frame_timing.svg)

`FrameInfo` 记录帧处理各阶段的时间戳，用于性能分析和 Jank 检测：

```java
// FrameInfo.java
// 关键索引
INTENDED_VSYNC (2)           // 原始 VSync 时间戳
VSYNC (3)                    // 实际使用的帧时间（可能因延迟被调整）
HANDLE_INPUT_START (5)       // INPUT 回调开始时间
ANIMATION_START (6)          // ANIMATION 回调开始时间
PERFORM_TRAVERSALS_START (7) // TRAVERSAL 回调开始时间
DRAW_START (8)               // 绘制开始时间
FRAME_DEADLINE (9)           // 帧截止时间
FRAME_START_TIME (10)        // doFrame 实际开始时间
FRAME_INTERVAL (11)          // 帧间隔
```

`INTENDED_VSYNC` 与 `VSYNC` 的差异体现帧延迟程度。在 Systrace 中可以观察到这两个值：如果差距过大，说明主线程在 VSync 到来前有其他耗时操作。

### 6.2 Jank 检测

#### doFrame 中的帧跳过检测

```java
// Choreographer.java:1002
final long jitterNanos = startNanos - frameTimeNanos;
if (jitterNanos >= frameIntervalNanos) {
    final long skippedFrames = jitterNanos / frameIntervalNanos;
    if (skippedFrames >= SKIPPED_FRAME_WARNING_LIMIT) {
        Log.i(TAG, "Skipped " + skippedFrames + " frames!  "
                + "The application may be doing too much work on its main thread.");
    }
}
```

这是开发者最常见的 Jank 警告日志。当 `jitterNanos`（当前时间与 VSync 时间戳之差）超过帧间隔时，说明帧处理延迟了，跳过的帧数 = jitter / frameInterval。

#### COMMIT 阶段的帧时间校正

```java
// Choreographer.java:1218
if (callbackType == Choreographer.CALLBACK_COMMIT) {
    final long jitterNanos = now - frameTimeNanos;
    if (frameIntervalNanos > 0 && jitterNanos >= 2 * frameIntervalNanos) {
        // 帧处理超过 2 个帧间隔，调整帧时间
        final long lastFrameOffset = jitterNanos % frameIntervalNanos + frameIntervalNanos;
        frameTimeNanos = now - lastFrameOffset;
        mLastFrameTimeNanos = frameTimeNanos;
    }
}
```

当帧处理时间过长（超过 2 帧），COMMIT 阶段会向前调整帧时间，确保下一帧的帧时间不会回退。这保证了帧时间的单调递增性。

### 6.3 FrameTimeline 与延迟帧处理

当帧延迟时，Choreographer 需要选择一条仍然有效的帧时间线：

```java
// Choreographer.FrameData.update()
// 1. 遍历已有时间线，找到 deadline 仍在未来的
// 2. 如果所有时间线都已过期，从 SurfaceFlinger 获取最新的时间线数据
// 3. 选择第一条 deadline 仍然有效的时间线
```

这确保了即使帧延迟，应用仍能选择最优的上屏时间点，而不是简单放弃。

## 七、FrameHandler 消息类型

```java
// Choreographer.java:1560
private final class FrameHandler extends Handler {
    public void handleMessage(Message msg) {
        switch (msg.what) {
            case MSG_DO_FRAME:
                // 不使用 VSync 时的帧触发
                doFrame(System.nanoTime(), 0, new DisplayEventReceiver.VsyncEventData());
                break;
            case MSG_DO_SCHEDULE_VSYNC:
                // 非 Looper 线程请求 VSync 时的中转
                doScheduleVsync();
                break;
            case MSG_DO_SCHEDULE_CALLBACK:
                // 延迟回调到期时的触发
                doScheduleCallback(msg.arg1);
                break;
        }
    }
}
```

| 消息 | 值 | 触发场景 |
|------|---|---------|
| `MSG_DO_FRAME` | 0 | 不使用 VSync 时按帧间隔触发 |
| `MSG_DO_SCHEDULE_VSYNC` | 1 | 非 Looper 线程请求 VSync |
| `MSG_DO_SCHEDULE_CALLBACK` | 2 | 延迟回调到期需要调度 |

## 八、调试与观测

### 8.1 Systrace 追踪

Choreographer 在关键节点插入了 Trace 标签：

| Trace 名称 | 含义 |
|-----------|------|
| `Choreographer#doFrame {vsyncId}` | 帧处理开始，携带 VSync ID |
| `Choreographer#scheduleVsyncLocked` | 请求 VSync |
| `Choreographer#onVsync {vsyncId}` | VSync 信号到达 |
| `input` / `animation` / `traversal` / `commit` | 各阶段回调执行 |
| `Choreographer#doFrame - resynced to {vsyncId}` | 帧延迟后重新选择时间线 |

### 8.2 关键日志

```bash
# 帧跳过警告（Jank）
adb logcat -s Choreographer:I
# 输出: Skipped 30 frames! The application may be doing too much work on its main thread.

# 查看帧信息（需要开启 DEBUG_FRAMES）
adb shell setprop debug.choreographer.skipwarning 1
```

### 8.3 dumpsys 信息

```bash
# 查看 gfxinfo 中的帧时间数据
adb shell dumpsys gfxinfo <package>

# 帧统计包含 FrameInfo 中记录的各阶段时间戳
```

## 九、关键设计总结

### 9.1 单次请求模型

Choreographer 使用**按需请求**而非**持续订阅** VSync。只有当有回调需要执行时才请求 VSync，空闲时不消耗资源。每次 `doFrame()` 执行完毕后，`mFrameScheduled` 被置为 false，下次有新回调注册时才重新请求。

### 9.2 同步屏障保障优先级

ViewRootImpl 在 `scheduleTraversals()` 中设置同步屏障，确保 VSync 的异步消息能优先于普通消息被处理。屏障在 `doTraversal()` 中移除。

### 9.3 帧时间对齐

当帧延迟时，Choreographer 将帧时间对齐到帧间隔网格（`frameTimeNanos - jitterNanos % frameIntervalNanos`），而非使用实际的 VSync 时间戳。这保证了动画计算的平滑性——即使跳帧，动画时间轴仍然均匀。

### 9.4 动画时钟锁定

`AnimationUtils.lockAnimationClock()` 在 `doFrame()` 期间将动画时钟锁定为当前帧时间。所有在同一帧内执行的动画看到相同的时间，避免了因回调执行顺序不同导致的时间不一致。

## 附录 A：核心文件索引

| 模块 | 文件路径 | 关键方法 |
|------|---------|---------|
| Choreographer | `frameworks/base/core/java/android/view/Choreographer.java` | `doFrame()` (972), `scheduleFrameLocked()` (898), `doCallbacks()` (1189) |
| DisplayEventReceiver (Java) | `frameworks/base/core/java/android/view/DisplayEventReceiver.java` | `scheduleVsync()` (339), `onVsync()` (250) |
| DisplayEventReceiver (JNI) | `frameworks/base/core/jni/android_view_DisplayEventReceiver.cpp` | `dispatchVsync()` (171), `nativeScheduleVsync()` |
| DisplayEventDispatcher (Native) | `frameworks/native/libs/gui/DisplayEventDispatcher.cpp` | `scheduleVsync()`, `handleEvent()` |
| ViewRootImpl | `frameworks/base/core/java/android/view/ViewRootImpl.java` | `scheduleTraversals()` (3536), `doTraversal()` (3583) |
| FrameInfo | `frameworks/base/graphics/java/android/graphics/FrameInfo.java` | `setVsync()` (137) |
