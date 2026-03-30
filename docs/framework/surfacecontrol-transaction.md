---
prev:
    text: '转屏机制'
    link: '/framework/screen-rotation'
next:
    text: 'Organizer 机制'
    link: '/framework/wms-organizer'
---

# SurfaceControl & Transaction 流程

## 概述

在深入 Transaction 的实现之前，首先明确两个容易混淆的概念：

- **Transaction**：表示一次与 SurfaceControl 相关的业务处理，即对 Surface 属性的批量修改操作
- **Transition**：表示一次窗口状态转换，通常伴随动画将窗口从一个状态过渡到另一个状态

Transition 是 Android U 开始引入的窗口动画机制，其内部实现大量依赖 Transaction 来操作窗口的 SurfaceControl。本文聚焦于 Transaction 本身的工作机制。

## 基本概念

### View、Window、Surface、Layer

- **View** 是构建应用显示内容的基本组件，所有需要显示的 UI 元素都由各种 View 组合而成
- **Window** 用来限制应用的显示范围，定义显示内容的位置、大小、层级、效果等特性
- **Surface** 是绘制 View 的画布，其位置和大小由 Window 指定
- **Layer** 是 Surface 在 SurfaceFlinger 中对应的图层，关联着实际的显存

### Surface、SurfaceControl、Transaction

三者的演化历程：

- Android 最初只有 `Surface` 类，用于表示绘制 View 的画布
- Android 4.3（2013）将 `Surface` 中对画布的控制逻辑（创建、销毁、移动、缩放）抽离到 `SurfaceControl` 类
- Android 9.0（2018）新增 `SurfaceControl.Transaction` 类，支持将多个 Surface 控制操作集合到一个事务中一次性处理

Transaction 的几个关键特性：

- 所有操作都是**延迟执行**的——无论之前设置了多少操作，只有调用 `apply()` 时才会提交给 SurfaceFlinger 处理。因此操作的设置顺序不代表执行顺序，只有 `apply()` 的顺序才决定执行顺序
- 多个 Transaction 可以通过 `merge()` 合并成一个 Transaction 后统一 `apply()`
- Transaction 可以跨进程传递，在其他进程中 merge 或 apply

### SurfaceFlinger

SurfaceFlinger 是 Native 层的系统服务，负责将所有应用的 Surface 合成到一起并最终显示到屏幕上。

SurfaceFlinger 在合成时可以对 Surface 做额外处理，影响最终显示效果：

- 更改 Surface 的透明度、模糊度，控制与其他 Surface 叠放时的视觉效果
- 对 Surface 进行变换（缩放、旋转、位移等）

这些处理操作都是由应用或 WMS 通过 Transaction 传递给 SurfaceFlinger 的。

## SurfaceControl 与 Transaction 的类结构

![SurfaceControl 类结构](/img/android/surfacecontrol_transaction/01_class_structure.svg)

### 三层架构

- **Java 层**：`SurfaceControl.java` 定义了 Java 层的 SurfaceControl 对象，同时定义了静态内部类 `Transaction`
- **JNI 层**：`android_view_SurfaceControl.cpp` 实现了 Java 层所有 `nativeXXXX` 方法到 Native 层的桥接
- **Native 层**：每创建一个 Java SurfaceControl 实例，都会在 Native 层创建对应的 C++ SurfaceControl 实例；Transaction 同理，C++ 的 Transaction 类定义在 `SurfaceComposerClient` 内部。`SurfaceComposerClient` 是一个 Binder 客户端，远程端连接 SurfaceFlinger，所有对 Surface 和 Transaction 的处理都通过它传递给 SurfaceFlinger

> **注意**：无论 Java 的 SurfaceControl 还是 C++ 的 SurfaceControl，都创建在同一个进程中（同一个 App 进程或 system_server 进程），而 SurfaceFlinger 运行在独立进程中。

### SurfaceControl 的关键属性

SurfaceControl 定义了两个 `long` 型属性和一个通过 `getLayerId()` 获得的 `int` 型 ID：

```java
// SurfaceControl.java (line 704)
public long mNativeObject;
private long mNativeHandle;
```

- **mNativeObject**：Native 层 SurfaceControl 对象的指针，用于关联 Java 层与 Native 层的 SurfaceControl
- **mNativeHandle**：SurfaceFlinger 中对应 Layer 的 LayerHandle 的 IBinder 指针，用于关联客户端的 SurfaceControl 与 SurfaceFlinger 的 Layer

```java
// SurfaceControl.java (line 1706)
public boolean isSameSurface(@NonNull SurfaceControl other) {
    return other.mNativeHandle == mNativeHandle;
}
```

`isSameSurface()` 比较的就是 mNativeHandle。SurfaceControl 对象会跨进程传播——例如 WMS 创建 Surface 后传递给应用进程绘制，或传给 SystemUI 的 wm-shell 做动画——这样在不同进程中会创建多个 SurfaceControl 实例，但只要它们的 mNativeHandle 指向同一个 Layer，操作的就是同一个窗口。这也是 WMS、SystemUI、Launcher 都能做窗口动画的关键。

- **LayerId**：SurfaceFlinger 中每个 Layer 的唯一 ID。每创建一个 Layer 就将 ID 自增 1（超过 `int` 最大值 2^31 时回滚到 1）

```java
// SurfaceControl.java (line 6097)
public int getLayerId() {
    if (mNativeObject != 0) {
        return nativeGetLayerId(mNativeObject);
    }
    return -1;
}
```

> Android V 之前，SurfaceControl 的操作通过 LayerHandle 定位到 Layer；Android V 之后改为通过 LayerId 定位 Layer 相关的功能类。

### Transaction 的关键属性

Transaction 只有一个 **mNativeObject** 对应 Native 层 Transaction 对象的指针。Transaction 不会在 SurfaceFlinger 中创建常驻对象，每个 Transaction 处理完就会销毁。每个 Transaction 都有一个 `id`（通过 `getId()` 获得），用于跟踪其执行过程。

## Transaction 操作 SurfaceControl 的流程

下面以 `reparent`（更新层级关系）操作为例，介绍 Transaction 处理 SurfaceControl 操作的完整流程。

### 第一步：Java 层设置操作

Java 层调用 `reparent` 后直接通过 `nativeReparent` 调用到 Native 层，传递的是 `mNativeObject`（即 Native 层 Transaction 和 SurfaceControl 的指针）：

```java
// SurfaceControl.java (line 4127)
public Transaction reparent(@NonNull SurfaceControl sc,
        @Nullable SurfaceControl newParent) {
    checkPreconditions(sc);
    // ...
    long otherObject = 0;
    if (newParent != null) {
        newParent.checkNotReleased();
        otherObject = newParent.mNativeObject;
    }
    nativeReparent(mNativeObject, sc.mNativeObject, otherObject);
    mReparentedSurfaces.put(sc, newParent);
    return this;
}
```

### 第二步：JNI 层桥接

Native 层通过 `reinterpret_cast` 将 Java 传递的指针转换为 C++ 对象，并调用 Transaction 的 `reparent` 方法：

```cpp
// android_view_SurfaceControl.cpp (line 2026)
static void nativeReparent(JNIEnv* env, jclass clazz, jlong transactionObj,
        jlong nativeObject,
        jlong newParentObject) {
    auto ctrl = reinterpret_cast<SurfaceControl *>(nativeObject);
    auto newParent = reinterpret_cast<SurfaceControl *>(newParentObject);
    auto transaction = reinterpret_cast<SurfaceComposerClient::Transaction*>(transactionObj);
    transaction->reparent(ctrl, newParent);
}
```

### 第三步：Native 层记录操作到 layer_state_t

`reparent()` 内部先通过 `getLayerState()` 获取对应的 `layer_state_t` 指针，然后通过**位或运算**在 `what` 字段上标记 `eReparent` 操作，并保存新 parent 的引用：

```cpp
// SurfaceComposerClient.cpp (line 1761)
SurfaceComposerClient::Transaction& SurfaceComposerClient::Transaction::reparent(
        const sp<SurfaceControl>& sc, const sp<SurfaceControl>& newParent) {
    layer_state_t* s = getLayerState(sc);
    if (!s) {
        mStatus = BAD_INDEX;
        return *this;
    }
    if (SurfaceControl::isSameSurface(sc, newParent)) {
        return *this;
    }
    s->what |= layer_state_t::eReparent;
    s->parentSurfaceControlForChild = newParent ? newParent->getParentingLayer() : nullptr;

    registerSurfaceControlForCallback(sc);
    return *this;
}
```

`layer_state_t` 结构体定义在 `LayerState.h` 中，关键属性如下：

```cpp
// LayerState.h (line 182)
struct layer_state_t {
    // ...
    sp<IBinder> surface;    // 指向 LayerHandle 的 IBinder，用于在 SF 中找到对应 Layer
    int32_t layerId;        // 对应的 LayerId
    uint64_t what;          // 位掩码，记录要对此 Layer 执行的操作
    // ...

    enum {
        ePositionChanged            = 0x00000001,
        // ...
        eAlphaChanged               = 0x00000008,
        // ...
        eFlagsChanged               = 0x00000040,
        // ...
        eReparent                   = 0x00008000,
        // ...
    };
};
```

- **`surface`**：指向 LayerHandle 的 IBinder，传递到 SurfaceFlinger 后用于定位对应的 Layer
- **`layerId`**：对应的 LayerId
- **`what`**：位掩码，通过位或运算可以同时记录多种操作（如 reparent、position、alpha 等变化）
- 此外还有各操作对应的附加数据字段（如新 parent、坐标、alpha 值等）

### 第四步：getLayerState() 的存储机制

`reparent()` 中对 `layer_state_t` 赋值后，操作实际保存在哪里？关键在 `getLayerState()` 的实现。

Transaction 内部维护一个无序表 `mComposerStates`，key 为 SurfaceControl 的 LayerHandle（即 mNativeHandle），value 为 `ComposerState` 对象。`getLayerState()` 为每个 SurfaceControl 创建一个 ComposerState 实例，以 LayerHandle 为 key 存入表中：

```cpp
// SurfaceComposerClient.h (line 505)
class Transaction : public Parcelable {
    std::unordered_map<sp<IBinder>, ComposerState, IBinderHash> mComposerStates;
    // ...
};
```

```cpp
// SurfaceComposerClient.cpp (line 1410)
layer_state_t* SurfaceComposerClient::Transaction::getLayerState(const sp<SurfaceControl>& sc) {
    auto handle = sc->getLayerStateHandle();

    if (mComposerStates.count(handle) == 0) {
        // we don't have it, add an initialized layer_state to our list
        ComposerState s;

        s.state.surface = handle;
        s.state.layerId = sc->getLayerId();

        mComposerStates[handle] = s;
    }

    return &(mComposerStates[handle].state);
}
```

`ComposerState` 也定义在 `LayerState.h` 中，内部持有一个 `layer_state_t`，并提供序列化方法：

```cpp
// LayerState.h (line 729)
class ComposerState {
public:
    layer_state_t state;
    status_t write(Parcel& output) const;
    status_t read(const Parcel& input);
};
```

### 第五步：同一 layer_state_t 可叠加多个操作

一个 SurfaceControl 对应一个 `layer_state_t`，可以通过位或运算同时保存多种操作。例如：

```cpp
// SurfaceComposerClient.cpp (line 1778)
SurfaceComposerClient::Transaction& SurfaceComposerClient::Transaction::setColor(
        const sp<SurfaceControl>& sc,
        const half3& color) {
    layer_state_t* s = getLayerState(sc);
    // ...
    s->what |= layer_state_t::eColorChanged;
    s->color.rgb = color;
    // ...
}
```

```cpp
// SurfaceComposerClient.cpp (line 1434)
SurfaceComposerClient::Transaction& SurfaceComposerClient::Transaction::setPosition(
        const sp<SurfaceControl>& sc, float x, float y) {
    layer_state_t* s = getLayerState(sc);
    // ...
    s->what |= layer_state_t::ePositionChanged;
    s->x = x;
    s->y = y;
    // ...
}
```

### 第六步：merge 合并多个 Transaction

多个 Transaction 可以通过 `merge()` 合并成一个。核心逻辑是将 other 的 `mComposerStates` 复制到当前实例中。如果两个 Transaction 操作了同一个 SurfaceControl，则通过 `layer_state_t::merge()` 合并操作标志：

```cpp
// SurfaceComposerClient.cpp (line 977)
SurfaceComposerClient::Transaction& SurfaceComposerClient::Transaction::merge(
        Transaction&& other) {
    // 合并 transaction id 历史记录（用于调试追踪）
    // ...

    for (auto const& [handle, composerState] : other.mComposerStates) {
        if (mComposerStates.count(handle) == 0) {
            mComposerStates[handle] = composerState;
        } else {
            if (composerState.state.what & layer_state_t::eBufferChanged) {
                releaseBufferIfOverwriting(mComposerStates[handle].state);
            }
            mComposerStates[handle].state.merge(composerState.state);
        }
    }
    // ...
}
```

当两个 Transaction 对同一个 SurfaceControl 都设置了 buffer 操作时，`merge()` 会先释放被覆盖的旧 buffer，避免内存泄漏。

### 第七步：apply 提交给 SurfaceFlinger

调用 `apply()` 时才会将所有操作真正提交给 SurfaceFlinger。`apply()` 接受两个参数：

- **`synchronous`**：若为 `true`，调用方会阻塞等待 SurfaceFlinger commit 此 Transaction 后再返回。内部通过注册一个 `TransactionCommittedCallback` 并等待信号量实现
- **`oneWay`**：若为 `true`，使用 oneWay binder 调用，Transaction 可能被乱序执行，不保证顺序。与 `synchronous` 互斥

```cpp
// SurfaceComposerClient.cpp (line 1208)
status_t SurfaceComposerClient::Transaction::apply(bool synchronous, bool oneWay) {
    if (mStatus != NO_ERROR) {
        return mStatus;
    }

    // 同步模式：注册 commit 回调，apply 完成后等待信号量
    std::shared_ptr<SyncCallback> syncCallback = std::make_shared<SyncCallback>();
    if (synchronous) {
        syncCallback->init();
        addTransactionCommittedCallback(SyncCallback::getCallback(syncCallback),
                                        /*callbackContext=*/nullptr);
    }

    // 处理 listener callbacks
    bool hasListenerCallbacks = !mListenerCallbacks.empty();
    std::vector<ListenerCallbacks> listenerCallbacks;
    for (const auto& [listener, callbackInfo] : mListenerCallbacks) {
        // ... 将 callback 信息关联到对应的 layer_state_t
    }

    // 缓存 buffer，减少跨进程传输开销
    cacheBuffers();

    // 将 mComposerStates 转存为 Vector
    Vector<ComposerState> composerStates;
    for (auto const& kv : mComposerStates) {
        composerStates.add(kv.second);
    }

    // 处理 flags
    uint32_t flags = 0;
    if (mAnimation) {
        flags |= ISurfaceComposer::eAnimation;
    }
    if (oneWay && !synchronous) {
        flags |= ISurfaceComposer::eOneWay;
    }
    if (mEarlyWakeupStart && !mEarlyWakeupEnd) {
        flags |= ISurfaceComposer::eEarlyWakeupStart;
    }
    if (mEarlyWakeupEnd && !mEarlyWakeupStart) {
        flags |= ISurfaceComposer::eEarlyWakeupEnd;
    }

    // 通过 Binder 调用 SurfaceFlinger::setTransactionState
    sp<IBinder> applyToken = mApplyToken ? mApplyToken : getDefaultApplyToken();
    sp<ISurfaceComposer> sf(ComposerService::getComposerService());
    sf->setTransactionState(mFrameTimelineInfo, composerStates, ...,
                            applyToken, ..., mId, mMergedTransactionIds);

    // 生成新的 transaction id，清理状态
    mId = generateId();
    clear();

    // 同步模式下阻塞等待
    if (synchronous) {
        syncCallback->wait();
    }
    return NO_ERROR;
}
```

注意 `apply()` 中传递了两个重要参数：

- **applyToken**：SurfaceFlinger 会根据它将不同来源的 Transaction 分组管理
- **mId**：基于 pid 自增生成的唯一标识，用于跟踪每个 Transaction 的执行情况

```cpp
// SurfaceComposerClient.cpp (line 96)
int64_t generateId() {
    return (((int64_t)getpid()) << 32) | ++idCounter;
}
```

## Transaction 回调机制

Transaction 提供了两种回调，用于跟踪 Transaction 的执行进度：

### TransactionCommittedListener

当 Transaction 被 SurfaceFlinger **commit**（即应用到内部状态）后触发。此时 Transaction 的操作已被记录，但尚未渲染到屏幕上：

```java
// SurfaceControl.java (line 5317)
public Transaction addTransactionCommittedListener(
        @NonNull @CallbackExecutor Executor executor,
        @NonNull TransactionCommittedListener listener) {
    TransactionCommittedListener listenerInner =
            () -> executor.execute(listener::onTransactionCommitted);
    nativeAddTransactionCommittedListener(mNativeObject, listenerInner);
    return this;
}
```

### TransactionCompletedListener

当 Transaction 被 **present**（即实际渲染到屏幕）后触发，附带 `TransactionStats` 信息，包含 latch 时间和 present fence：

```java
// SurfaceControl.java (line 5339)
public Transaction addTransactionCompletedListener(
        @NonNull @CallbackExecutor Executor executor,
        @NonNull Consumer<TransactionStats> listener) {
    // ...
    Consumer<TransactionStats> listenerInner = stats -> executor.execute(
                            () -> listener.andThen(TransactionStats::close).accept(stats));
    nativeAddTransactionCompletedListener(mNativeObject, listenerInner);
    return this;
}
```

```java
// SurfaceControl.java (line 3068)
public static final class TransactionStats {
    private long mLatchTimeNanos;    // buffer 被 latch 的时间
    private SyncFence mSyncFence;    // present fence
}
```

这两种回调的典型应用场景：

- **CommittedListener**：Transition 动画中，确认窗口状态已被 SurfaceFlinger 接受后，再开始下一步操作
- **CompletedListener**：应用渲染管线中，确认帧已实际显示后再提交下一帧，实现帧率匹配

## SurfaceFlinger 中处理 Transaction 的流程

由于 Android V 对 Layer 管理做了较大重构，以下主要分析 Android V 版本的流程。

### 第一步：接收并入列（Binder 线程）

`SurfaceFlinger::setTransactionState()` 在 Binder 线程中被调用，主要完成以下工作：

```cpp
// SurfaceFlinger.cpp (line 6958)
status_t SurfaceFlinger::setTransactionState(
        const FrameTimelineInfo& frameTimelineInfo,
        Vector<ComposerState>& states, ...,
        const sp<IBinder>& applyToken, ...,
        uint64_t transactionId, ...) {

    // 权限检查与状态清理
    IPCThreadState* ipc = IPCThreadState::self();
    const int originPid = ipc->getCallingPid();
    const int originUid = ipc->getCallingUid();
    uint32_t permissions = LayerStatePermissions::getTransactionPermissions(originPid, originUid);
    for (auto& composerState : states) {
        composerState.state.sanitize(permissions);
    }

    // 将 ComposerState 列表转为 ResolvedComposerState 列表
    std::vector<ResolvedComposerState> resolvedStates;
    resolvedStates.reserve(states.size());
    for (auto& state : states) {
        resolvedStates.emplace_back(std::move(state));
        auto& resolvedState = resolvedStates.back();
        // 解析 layerId、parentId、relativeParentId 等
        resolvedState.layerId = LayerHandle::getLayerId(resolvedState.state.surface);
        if (resolvedState.state.what & layer_state_t::eReparent) {
            resolvedState.parentId =
                    getLayerIdFromSurfaceControl(resolvedState.state.parentSurfaceControlForChild);
        }
        // ...
    }

    // 封装为 TransactionState 对象
    TransactionState state{frameTimelineInfo, resolvedStates, displays, flags,
                           applyToken, ..., transactionId, mergedTransactionIds};

    // 入列到 TransactionHandler 的无锁队列
    mTransactionHandler.queueTransaction(std::move(state));

    // 根据 earlyWakeup 标志决定调度策略
    const auto schedule = [](uint32_t flags) {
        if (flags & eEarlyWakeupEnd) return TransactionSchedule::EarlyEnd;
        if (flags & eEarlyWakeupStart) return TransactionSchedule::EarlyStart;
        return TransactionSchedule::Late;
    }(state.flags);

    // 预约一次 VSync 事件，后续在主线程处理
    setTransactionFlags(eTransactionFlushNeeded, schedule, applyToken, frameHint);
}
```

`ResolvedComposerState` 是 `ComposerState` 的子类，扩展了各种 ID 属性用于在 SurfaceFlinger 中快速定位 Layer：

```cpp
// TransactionState.h (line 39)
class ResolvedComposerState : public ComposerState {
public:
    std::shared_ptr<renderengine::ExternalTexture> externalTexture;
    uint32_t layerId = UNASSIGNED_LAYER_ID;
    uint32_t parentId = UNASSIGNED_LAYER_ID;
    uint32_t relativeParentId = UNASSIGNED_LAYER_ID;
    uint32_t touchCropId = UNASSIGNED_LAYER_ID;
};
```

`TransactionHandler::queueTransaction()` 只是将任务放入无锁队列：

```cpp
// TransactionHandler.cpp (line 38)
void TransactionHandler::queueTransaction(TransactionState&& state) {
    mLocklessTransactionQueue.push(std::move(state));
    mPendingTransactionCount.fetch_add(1);
}
```

### 第二步：主线程调度

SurfaceFlinger 在下次 VSync 事件时，根据 `eTransactionFlushNeeded` 标志发现有待处理的 Transaction，进入 `commit()` → `updateLayerSnapshots()` 流程：

```cpp
// SurfaceFlinger.cpp (line 3567)
// 在 commit() 方法内
const bool flushTransactions = clearTransactionFlags(eTransactionFlushNeeded);
bool transactionsAreEmpty = false;
mustComposite |=
        updateLayerSnapshots(vsyncId, ..., flushTransactions, transactionsAreEmpty);

// 发送回调
if (transactionsAreEmpty) {
    mTransactionCallbackInvoker.sendCallbacks(false /* onCommitOnly */);
} else {
    mTransactionCallbackInvoker.sendCallbacks(true /* onCommitOnly */);
}
```

### Android V 的 Layer 架构

在深入 `updateLayerSnapshots()` 之前，先了解 Android V 上的新 Layer 架构（该架构在 Android U 代码中已存在但未正式启用，到 Android V 才正式启用）。

![Android V Layer 架构](/img/android/surfacecontrol_transaction/02_layer_architecture.svg)

Android V 将原来 Layer 的状态拆分为三层：

**单个 Layer 状态类：**

- **RequestedLayerState**：上层客户端请求的 Layer 前端状态，是单个 Layer 的属性，不考虑层级关系
- **LayerHierarchy**：Layer 层级关系中的一个节点，对应一个 RequestedLayerState，通过 `mParent` 和 `mChildren` 组成树状结构（类似 WindowContainer）
- **LayerSnapshot**：提供给合成引擎和渲染引擎的最终状态，综合了层级关系。例如一个 Layer 本身是 show 状态，但其 parent 是 hide 的，那么它在合成时也会被 hide

**管理类：**

- **LayerLifecycleManager**：管理所有 RequestedLayerState 的生命周期（创建、销毁）和前端状态更新
- **LayerHierarchyBuilder**：组织和管理所有 LayerHierarchy 的层级关系
- **LayerSnapshotBuilder**：将 RequestedLayerState 前端状态结合 LayerHierarchy 层级关系，生成用于后端合成的 LayerSnapshot

### 第三步：收集与应用 Transaction

`updateLayerSnapshots()` 是处理 Transaction 的核心方法：

```cpp
// SurfaceFlinger.cpp (line 3063)
bool SurfaceFlinger::updateLayerSnapshots(VsyncId vsyncId, nsecs_t frameTimeNs,
                                          bool flushTransactions, bool& outTransactionsAreEmpty) {
    frontend::Update update;

    if (flushTransactions) {
        // 1. 收集 Transaction
        mTransactionHandler.collectTransactions();

        // 2. 处理新创建的 Layer
        {
            std::scoped_lock<std::mutex> lock(mCreatedLayersLock);
            update.layerCreatedStates = std::move(mCreatedLayers);
            update.newLayers = std::move(mNewLayers);
            // ...
        }
        mLayerLifecycleManager.addLayers(std::move(update.newLayers));

        // 3. Flush Transaction
        update.transactions = mTransactionHandler.flushTransactions();

        // 4. 应用 Transaction 到 Layer 前端状态
        mLayerLifecycleManager.applyTransactions(update.transactions);
        mLayerLifecycleManager.onHandlesDestroyed(update.destroyedHandles);

        // 5. 更新层级关系
        mLayerHierarchyBuilder.update(mLayerLifecycleManager);
    }

    // 6. 更新 LayerSnapshot
    // ... mLayerSnapshotBuilder.update(args);
}
```

#### collectTransactions：按 ApplyToken 分组

```cpp
// TransactionHandler.cpp (line 44)
void TransactionHandler::collectTransactions() {
    while (!mLocklessTransactionQueue.isEmpty()) {
        auto maybeTransaction = mLocklessTransactionQueue.pop();
        if (!maybeTransaction.has_value()) {
            break;
        }
        auto transaction = maybeTransaction.value();
        // 按 applyToken 分组存入待处理队列
        mPendingTransactionQueues[transaction.applyToken].emplace(std::move(transaction));
    }
}
```

`mPendingTransactionQueues` 是一个**无序表**，key 为 `applyToken`（每个进程对应一个默认的 applyToken）。这意味着 SurfaceFlinger 收到的所有 Transaction 会按请求来源重新分组。

> **注意**：由于这个表是无序的，如果有两个进程（如 system_server 和 SystemUI）同时对同一个 SurfaceControl 执行操作（例如 show 或 hide），两个操作的执行先后顺序是**不确定的**，可能导致 Layer 状态异常。

#### flushTransactions：处理 Barrier 依赖

```cpp
// TransactionHandler.cpp (line 55)
std::vector<TransactionState> TransactionHandler::flushTransactions() {
    std::vector<TransactionState> transactions;
    TransactionFlushState flushState;
    flushState.queueProcessTime = systemTime();

    // 循环处理，直到所有 barrier 依赖都被解析
    int lastTransactionsPendingBarrier = 0;
    int transactionsPendingBarrier = 0;
    do {
        lastTransactionsPendingBarrier = transactionsPendingBarrier;
        transactionsPendingBarrier = flushPendingTransactionQueues(transactions, flushState);
    } while (lastTransactionsPendingBarrier != transactionsPendingBarrier);

    // 处理 unsignaled buffer 的特殊情况
    applyUnsignaledBufferTransaction(transactions, flushState);

    mPendingTransactionCount.fetch_sub(transactions.size());
    return transactions;
}
```

flush 阶段有两个重要机制：

- **Barrier 依赖解析**：Transaction 可以通过 `setBufferHasBarrier` 设置依赖——"直到另一个 Layer 的某个 frameNumber 的 buffer 被 latch 后，才能处理本 Transaction"。flush 会循环迭代直到所有可解析的 barrier 链都被处理完
- **Unsignaled Buffer 处理**：在特定条件下（只有单个 Transaction 且其 acquire fence 未 signal），允许提前 latch 该 buffer 以减少延迟

#### applyTransactions：更新 Layer 前端状态

```cpp
// LayerLifecycleManager.cpp (line 184)
void LayerLifecycleManager::applyTransactions(
        const std::vector<TransactionState>& transactions, bool ignoreUnknownLayers) {
    for (const auto& transaction : transactions) {
        for (const auto& resolvedComposerState : transaction.states) {
            const auto& clientState = resolvedComposerState.state;
            uint32_t layerId = resolvedComposerState.layerId;
            if (layerId == UNASSIGNED_LAYER_ID) {
                ALOGW("%s Handle %p is not valid", __func__, clientState.surface.get());
                continue;
            }

            RequestedLayerState* layer = getLayerFromId(layerId);
            // ...
            layer->merge(resolvedComposerState);
            // ...
        }
    }
}
```

通过 `layerId` 找到对应的 `RequestedLayerState`，调用 `merge()` 更新状态。

#### update：更新层级关系

```cpp
// LayerHierarchy.cpp (line 417)
void LayerHierarchyBuilder::update(LayerLifecycleManager& layerLifecycleManager) {
    if (!mInitialized) {
        init(layerLifecycleManager.getLayers());
    } else if (layerLifecycleManager.getGlobalChanges().test(
                       RequestedLayerState::Changes::Hierarchy)) {
        doUpdate(layerLifecycleManager.getLayers(),
                 layerLifecycleManager.getDestroyedLayers());
    } else {
        return; // nothing to do
    }
    // ...
}
```

只有当层级关系发生变化（如 reparent）时才会触发更新。

### 整体流程图

![Transaction 处理流程](/img/android/surfacecontrol_transaction/03_transaction_flow.svg)

## Early Wakeup 机制

Transaction 的 `apply()` 中可以携带 EarlyWakeup 标志，用于**降低输入延迟**：

- **`setEarlyWakeupStart()`**：通知 SurfaceFlinger 调度器"即将提交重要内容，请提前唤醒"，SF 会调整 VSync 相位以更快地响应后续帧
- **`setEarlyWakeupEnd()`**：取消 early wakeup 提示

```cpp
// SurfaceFlinger.cpp (line 7016)
if (flags & (eEarlyWakeupStart | eEarlyWakeupEnd)) {
    const bool hasPermission =
            (permissions & layer_state_t::Permission::ACCESS_SURFACE_FLINGER) ||
            callingThreadHasPermission(sWakeupSurfaceFlinger);
    if (!hasPermission) {
        ALOGE("Caller needs permission android.permission.WAKEUP_SURFACE_FLINGER to use "
              "eEarlyWakeup[Start|End] flags");
        flags &= ~(eEarlyWakeupStart | eEarlyWakeupEnd);
    }
}
```

使用 EarlyWakeup 需要 `ACCESS_SURFACE_FLINGER` 权限或 `WAKEUP_SURFACE_FLINGER` 权限。该机制主要用于手写笔输入等需要极低延迟的场景。

SurfaceFlinger 收到 EarlyWakeup 标志后，会选择不同的调度策略：

```cpp
// SurfaceFlinger.cpp (line 7230)
const auto schedule = [](uint32_t flags) {
    if (flags & eEarlyWakeupEnd) return TransactionSchedule::EarlyEnd;
    if (flags & eEarlyWakeupStart) return TransactionSchedule::EarlyStart;
    return TransactionSchedule::Late;
}(state.flags);
```

## Buffer Cache 机制

在 `apply()` 调用 `setTransactionState()` 之前，会先执行 `cacheBuffers()` 对 GraphicBuffer 进行缓存优化。

缓存机制的核心思路：GraphicBuffer 体积较大，如果每次 Transaction 都完整传输 buffer 数据，IPC 开销会很高。`cacheBuffers()` 使用一个全局的 `BufferCache` 单例（最多缓存 4096 个 buffer），对已传输过的 buffer 只传递缓存 ID，避免重复传输。

## 常见问题

Transaction 相关的常见问题通常与 **Transition 动画过程中 Transaction apply 的时机**有关，容易导致无焦点 ANR 或 Layer 泄露。

### 典型问题场景

Transition 动画过程中，Transaction 会被连续 merge 并跨进程传递给 SystemUI 或 Home 进程去 apply。如果 apply 时机不当，可能出现：

- 窗口的 SurfaceControl 被错误地 hide、setAlpha(0) 或 reparent，导致 SurfaceControl 不可见
- SurfaceControl 无法正确销毁，导致 Layer 泄露
- 以上情况均可能引发无焦点 ANR

### 调试方法

Android V 上可以通过以下命令打开 Transaction apply 日志（设置后需重启）：

```
adb shell setprop persist.wm.debug.sc.tx.log_match_call apply
```

### ApplyToken 排序问题

前面提到 `TransactionHandler::collectTransactions()` 按 ApplyToken 分组管理 Transaction。如果有两个进程（如 system_server 和 SystemUI）同时对同一个 SurfaceControl 设置操作，由于无序表的特性，两个操作的执行先后顺序无法保证，也可能导致 Layer 状态异常。
