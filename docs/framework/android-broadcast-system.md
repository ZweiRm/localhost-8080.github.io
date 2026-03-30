---
prev:
    text: 'AMS 进程管理'
    link: '/framework/ams_process_management'
next:
    text: 'WMS 架构与运行原理分析'
    link: '/framework/basic-with-wms'
---

# Android 广播系统

## 一、概述

Android 中的广播（Broadcast）是 AMS 四大组件之一，是一种跨组件、跨应用的通信机制。它允许应用或系统在特定事件（如设备启动、网络状态变更、电池电量变化等）发生时发送消息，其他组件可以注册接收并响应这些消息，从而实现进程间通信。

广播系统由三个角色组成：

- **广播发送端**：负责将广播消息发送给 AMS。发送端可以是应用程序的任何组件（Activity、Service 等），也可以是系统自身；
- **AMS 广播系统**：负责将广播消息进行分类、排序，并分发给广播接收端；
- **广播接收端**：负责接收广播消息并进行响应。接收端需要先注册到系统中，以便在特定事件发生时接收广播。

![广播系统总览](/img/android/broadcast/01_broadcast_overview.svg)

广播的基本流程：

1. 广播接收端向 AMS 注册广播，表明其想要监听某个事件（action）；
2. 广播发送端向 AMS 发出广播，AMS 将广播存入其内部队列；
3. AMS 将广播从队列中取出并分发给各个广播接收端；
4. 广播接收端收到广播后执行 `onReceive` 方法。

### 广播的分类

| 分类维度 | 类型 | 说明 |
|---------|------|------|
| 接收者注册方式 | 动态注册 | 通过 `Context.registerReceiver()` 注册，仅在进程运行时有效 |
| | 静态注册 | 通过 AndroidManifest.xml 的 `<receiver>` 标签注册，可冷启动进程 |
| 系统紧急程度 | urgent | 前台广播、闹钟广播、interactive 广播 |
| | normal | 普通广播 |
| | offload | 携带 FLAG_RECEIVER_OFFLOAD 的广播 |
| ANR 机制 | assumeDelivered | "假设送达"类型，不触发 ANR（动态注册 + 无序 + 无 resultTo） |
| | blockDelivered | "阻塞送达"类型，触发 ANR 检测 |
| 延迟派发 | 可延迟 | 携带 `DEFERRAL_POLICY_UNTIL_ACTIVE` 策略的广播 |
| | 不可延迟 | 有序广播等不允许延迟的广播 |
| ANR 超时时间 | 前台广播 | 10 秒 |
| | 后台广播 | 60 秒 |

> U 版本之后，广播分发以进程为单位（BroadcastProcessQueue），一个广播的各个接收者被打散到不同 BPQ 中。这解决了不同有序广播之间（无共同接收者时）的互相阻塞问题，但同一有序广播内部不同接收者之间的阻塞仍然存在。

## 二、广播系统架构

### 2.1 核心数据结构

![广播类图](/img/android/broadcast/03_class_diagram.svg)

**BroadcastQueueModernImpl** — U 版本之后新增的广播系统核心类，包括广播入队和分发机制。

**BroadcastProcessQueue（BPQ）** — 每个广播接收端进程都有一个对应的 BPQ。BPQ 内部维护三个队列：

```java
// BroadcastProcessQueue.java (line 128, 135, 142)
private final ArrayDeque<SomeArgs> mPending = new ArrayDeque<>();
private final ArrayDeque<SomeArgs> mPendingUrgent = new ArrayDeque<>(4);
private final ArrayDeque<SomeArgs> mPendingOffload = new ArrayDeque<>(4);
```

按紧急程度从高到低：`mPendingUrgent` > `mPending` > `mPendingOffload`。

**BPQ 的 mRunnableAt 属性** — 表示该 BPQ 何时可以从 runnable 状态调度为 running 状态，受多种因素影响：
- 待分发广播的类型（urgent 广播导致更早的 mRunnableAt）
- 接收端进程的状态（cached 进程导致较晚的 mRunnableAt）
- 是否被更早的广播接收者阻塞（ordered/prioritized 广播可能导致 mRunnableAt 为无穷大）

**mRunnableHead 双向链表** — 维护所有可运行的 BPQ（mRunnableAt 非无穷大），按 mRunnableAt 从小到大排序，链表头部的 BPQ 最急需被调度。

```java
// BroadcastQueueModernImpl.java (line 188)
private BroadcastProcessQueue mRunnableHead = null;
```

**mRunning 数组** — 记录处于 running 状态的 BPQ。只有处于 running 状态的 BPQ 才能分发广播，最多允许 `MAX_RUNNING_PROCESS_QUEUES`（默认 4）个进程处于 running 状态，且最多同时冷启动一个进程。

### 2.2 防饥饿机制

| 场景 | 问题 | 解决方案 |
|------|------|---------|
| BPQ 中有大量不同紧急程度的广播 | 重要广播被普通广播延迟 | 按紧急程度分三个队列（mPendingUrgent 优先派发） |
| BPQ 中紧急广播过多 | 普通广播饥饿 | 限制连续分发紧急广播的数量（`MAX_CONSECUTIVE_URGENT_DISPATCHES`） |
| BPQ 中可延迟广播过多 | delay 时间越来越长 | 当 BPQ 待发广播超过 `MAX_PENDING_BROADCASTS` 时绕过延迟策略 |
| BPQ 长时间垄断 running 槽位 | 其他 BPQ 无法调度 | 连续派发达到 `MAX_RUNNING_ACTIVE_BROADCASTS` 时强制撤下 |
| CPU 竞争导致 ANR 误报 | 接收端等待 CPU 时间片 | soft ANR 机制，最多延长至原定 ANR 时间的两倍 |

### 2.3 广播的 Delivery 状态机

![状态机图](/img/android/broadcast/06_state_machine.svg)

广播的每个接收者都有独立的 delivery 状态：
- **DELIVERY_PENDING**：广播已入队，等待派发
- **DELIVERY_DEFERRED**：接收者进程处于 cached 状态，广播被延迟
- **DELIVERY_SCHEDULED**：广播正在被系统派发
- **DELIVERY_DELIVERED**：广播已成功送达（终态）
- **DELIVERY_SKIPPED**：广播被 skip 策略跳过（终态）
- **DELIVERY_FAILURE**：广播派发失败（终态）
- **DELIVERY_TIMEOUT**：广播超时未完成，触发 ANR（终态）

## 三、广播注册流程

### 3.1 注册整体架构

广播注册是一个 C/S 架构模型。核心主线：**客户端的 BroadcastReceiver 对象、用于 Binder 传输的 IIntentReceiver 对象、以及系统端的 ReceiverList 对象，这三者一一对应，都表示一个广播接收者。**

这三者的关系类似于窗口管理中 PhoneWindow、IWindow（W）、WindowState 的关系。

![注册时序图](/img/android/broadcast/04_registration_sequence.svg)

#### 关键方法调用链

```plaintext
MainActivity::registerReceiver
    ContextImpl::registerReceiverInternal
        LoadedApk::getReceiverDispatcher               -- BroadcastReceiver → IIntentReceiver
            new ReceiverDispatcher → new InnerReceiver  -- InnerReceiver 继承 IIntentReceiver.Stub
            mReceivers.put(context, map)                -- 应用进程维护注册映射
        AMS::registerReceiverWithFeature                -- Binder call 到 AMS
            AMS::registerReceiverWithFeatureTraced
                new ReceiverList                        -- IIntentReceiver → ReceiverList
                mRegisteredReceivers.put(...)           -- 系统维护全局注册映射
                new BroadcastFilter
                mReceiverResolver.addFilter(...)        -- 系统维护全局 Filter 映射
```

### 3.2 应用侧注册流程

以一个简单的 demo 为例：

```java
// 应用注册广播 demo
public class MyBroadcastReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent.getAction().equals("com.example.MY_BROADCAST")) {
            Toast.makeText(context, "received", Toast.LENGTH_SHORT).show();
        }
    }
}

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // ...
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction("com.example.MY_BROADCAST");
        registerReceiver(new MyBroadcastReceiver(), intentFilter);
    }
}
```

#### registerReceiverInternal

```java
// ContextImpl.java (line 1858)
private Intent registerReceiverInternal(BroadcastReceiver receiver, int userId,
        IntentFilter filter, String broadcastPermission,
        Handler scheduler, Context context, int flags) {
    IIntentReceiver rd = null;
    if (receiver != null) {
        if (mPackageInfo != null && context != null) {
            if (scheduler == null) {
                // 默认使用主线程 handler 处理广播
                scheduler = mMainThread.getHandler();
            }
            // BroadcastReceiver → IIntentReceiver 的转换
            rd = mPackageInfo.getReceiverDispatcher(
                receiver, context, scheduler,
                mMainThread.getInstrumentation(), true);
        }
        // ...
    }
    // Binder call 到 AMS
    final Intent intent = ActivityManager.getService().registerReceiverWithFeature(
            mMainThread.getApplicationThread(), mBasePackageName, getAttributionTag(),
            AppOpsManager.toReceiverId(receiver), rd, filter, broadcastPermission, userId,
            flags);
    return intent;
}
```

#### getReceiverDispatcher

```java
// LoadedApk.java (line 1674)
// 二级 Map：Context → (BroadcastReceiver → ReceiverDispatcher)
private final ArrayMap<Context, ArrayMap<BroadcastReceiver, ReceiverDispatcher>> mReceivers
    = new ArrayMap<>();

public IIntentReceiver getReceiverDispatcher(BroadcastReceiver r,
        Context context, Handler handler,
        Instrumentation instrumentation, boolean registered) {
    synchronized (mReceivers) {
        LoadedApk.ReceiverDispatcher rd = null;
        ArrayMap<BroadcastReceiver, LoadedApk.ReceiverDispatcher> map = null;
        if (registered) {
            map = mReceivers.get(context);
            if (map != null) {
                rd = map.get(r);
            }
        }
        if (rd == null) {
            // 根据 BroadcastReceiver 创建 ReceiverDispatcher
            rd = new ReceiverDispatcher(mActivityThread.getApplicationThread(), r, context,
                    handler, instrumentation, registered);
            if (registered) {
                if (map == null) {
                    map = new ArrayMap<>();
                    mReceivers.put(context, map);
                }
                map.put(r, rd);
            }
        }
        // 返回 IIntentReceiver 对象
        return rd.getIIntentReceiver();
    }
}
```

`ReceiverDispatcher` 构造器中创建 `InnerReceiver`，后者继承 `IIntentReceiver.Stub` 并实现了 `performReceive` 方法：

```java
// LoadedApk.java ReceiverDispatcher 构造器
ReceiverDispatcher(IApplicationThread appThread, BroadcastReceiver receiver,
        Context context, Handler activityThread, ...) {
    // InnerReceiver 继承 IIntentReceiver.Stub
    mIIntentReceiver = new InnerReceiver(mAppThread, this, !registered);
    mReceiver = receiver;
    mContext = context;
    mActivityThread = activityThread;
    // ...
}
```

### 3.3 系统侧注册流程

```java
// ActivityManagerService.java
// 保存所有进程的 IIntentReceiver → ReceiverList 映射
final HashMap<IBinder, ReceiverList> mRegisteredReceivers = new HashMap<>();

private Intent registerReceiverWithFeatureTraced(IApplicationThread caller,
        String callerPackage, ...,
        IIntentReceiver receiver, IntentFilter filter, ...) {
    // ...
    synchronized (this) {
        ReceiverList rl = mRegisteredReceivers.get(receiver.asBinder());
        if (rl == null) {
            // 创建 ReceiverList（BroadcastFilter 列表）
            rl = new ReceiverList(this, callerApp, callingPid, callingUid,
                    userId, receiver);
            // 每个进程最多注册 1000 个接收者
            rl.app.mReceivers.addReceiver(rl);
            mRegisteredReceivers.put(receiver.asBinder(), rl);
        }
        // 构建 BroadcastFilter
        BroadcastFilter bf = new BroadcastFilter(filter, rl, callerPackage, ...);
        rl.add(bf);
        // 添加到全局 Resolver，用于后续广播查找接收者
        mReceiverResolver.addFilter(getPackageManagerInternal().snapshot(), bf);
    }
}
```

系统侧注册流程的主要步骤：

1. 检查系统核心组件注册重要广播时是否设置了 `SYSTEM_HIGH_PRIORITY`
2. 收集本次注册涉及的 sticky 广播
3. 对非系统广播进行 EXPORTED 兼容性检查
4. 将 `IIntentReceiver` 转化为 `ReceiverList`，将 `IntentFilter` 转化为 `BroadcastFilter`
5. 如果注册时匹配到多个 sticky 广播，则构建 `BroadcastRecord` 走入队流程

#### Sticky 广播

```java
// ActivityManagerService.java
// 全局 sticky 广播缓存：userId → (action → StickyBroadcast 列表)
final SparseArray<ArrayMap<String, ArrayList<StickyBroadcast>>> mStickyBroadcasts =
        new SparseArray<>();
```

Sticky 广播是一种特殊广播，发送后会被系统缓存，后续注册的接收者能立即收到最新的 sticky 广播。典型用例如电池状态 `ACTION_BATTERY_CHANGED`。应用可以用 `receiver=null` 简化注册，直接获取返回的 Intent。

#### 兼容性检查

注册时会根据注册者 UID 下所有 package 的 `targetSdkVersion` 判断是否要求显式声明 `RECEIVER_EXPORTED` / `RECEIVER_NOT_EXPORTED`。若 UID 下所有 package 都适配了 U 及以上版本的 SDK，则必须显式声明，否则抛出 `SecurityException`。

## 四、广播入队流程

### 4.1 入队整体架构

广播入队与广播派发是两个独立的流程。U 版本上广播以 BPQ 为单位批量派发，入队阶段会统计 BPQ 中所有广播的特征信息，用于决定广播派发的时机（mRunnableAt），因此不再是入队一个广播就立即派发。

![入队时序图](/img/android/broadcast/05_enqueue_sequence.svg)

#### 关键方法调用链

```plaintext
ContextImpl::sendBroadcast
    AMS::broadcastIntentWithFeature                       -- Binder call 到 AMS
        AMS::broadcastIntentLockedTraced
            collectReceiverComponents                     -- 收集静态注册接收者
            mReceiverResolver.queryIntent                 -- 收集动态注册接收者
            Merge into one list                           -- 合并排序（归并排序的 merge）
            SaferIntentUtils::filterNonExportedComponents -- 过滤 unexported 接收者
            new BroadcastRecord                           -- 创建广播记录
                calculateUrgent                           -- 计算是否 urgent
                calculateDeferUntilActive                 -- 计算是否可延迟
                calculateBlockedUntilBeyondCount          -- 计算阻塞关系
                isPrioritized                             -- 计算是否为"优先级广播"
            BroadcastQueueModernImpl::enqueueBroadcastLocked
                applyDeliveryGroupPolicy                  -- 第一处 skip 策略
                getOrCreateProcessQueue                   -- 创建/获取 BPQ
                shouldSkipMessage                         -- 第二处 skip 策略
                enqueueOrReplaceBroadcast                 -- 入队或替换
                updateRunnableList                        -- 更新 mRunnableAt
                enqueueUpdateRunningList                  -- 发送 MSG_UPDATE_RUNNING_LIST
```

### 4.2 broadcastIntentLockedTraced

这是系统侧执行广播入队的核心方法。

```java
// ActivityManagerService.java (line ~5800)
final int broadcastIntentLockedTraced(ProcessRecord callerApp, String callerPackage, ...,
        Intent intent, ..., boolean ordered, boolean sticky, ...) {
    intent = new Intent(intent);
    // 默认不派发给处于 stop 状态的 package
    intent.addFlags(Intent.FLAG_EXCLUDE_STOPPED_PACKAGES);

    List receivers = null;              // 静态接收者
    List<BroadcastFilter> registeredReceivers = null;  // 动态接收者

    // 通过 PKMS 收集静态接收者（按优先级排序）
    receivers = collectReceiverComponents(intent, resolvedType, callingUid, users, ...);
    // 收集动态接收者（按优先级排序）
    if (intent.getComponent() == null) {
        registeredReceivers = mReceiverResolver.queryIntent(snapshot, intent, ...);
    }
    // ...
```

#### 接收者列表合并

```java
    // 以 receivers（静态）为基表，将 registeredReceivers（动态）合并进来
    // 合并原理同归并排序的 merge，按优先级从大到小
    int ir = 0;
    if (receivers != null) {
        int NT = receivers.size();
        int it = 0;
        while (it < NT && ir < NR) {
            // ...
            if (curr.getPriority() >= curt.priority) {
                receivers.add(it, curr);  // 动态接收者优先级更高，插入
                ir++; curr = null; it++; NT++;
            } else {
                it++; curt = null;
            }
        }
    }
    // 将剩余动态接收者追加到末尾
    while (ir < NR) {
        receivers.add(registeredReceivers.get(ir));
        ir++;
    }
```

合并完成后，`receivers` 列表包含所有静态和动态接收者，按优先级从大到小排列。

#### 创建 BroadcastRecord 并入队

```java
    // 过滤 unexported 接收者
    SaferIntentUtils.filterNonExportedComponents(args, receivers);
    // 创建 BroadcastRecord
    BroadcastRecord r = new BroadcastRecord(queue, intent, callerApp, ...,
            receivers, resultToApp, resultTo, ..., ordered, sticky, ...);
    // 广播入队
    queue.enqueueBroadcastLocked(r);
}
```

### 4.3 BroadcastRecord 关键计算

#### calculateUrgent

```java
// BroadcastRecord.java (line 854)
static boolean calculateUrgent(@NonNull Intent intent, @Nullable BroadcastOptions options) {
    if ((intent.getFlags() & Intent.FLAG_RECEIVER_FOREGROUND) != 0) {
        return true;
    }
    if (options != null) {
        if (options.isInteractive()) return true;
        if (options.isAlarmBroadcast()) return true;
    }
    return false;
}
```

携带 `FLAG_RECEIVER_FOREGROUND`、interactive 或 alarm 标记的广播为 urgent。

#### calculateDeferUntilActive

```java
// BroadcastRecord.java (line 877)
static boolean calculateDeferUntilActive(int callingUid, @Nullable BroadcastOptions options,
        @Nullable IIntentReceiver resultTo, boolean ordered, boolean urgent) {
    // 有序广播不可延迟
    if (ordered) return false;
    // 无序但带 resultTo 的广播始终可延迟
    if (!ordered && resultTo != null) return true;
    // 根据 BroadcastOptions 的 deferralPolicy 决定
    if (options != null) {
        switch (options.getDeferralPolicy()) {
            case DEFERRAL_POLICY_UNTIL_ACTIVE: return true;
            case DEFERRAL_POLICY_NONE: return false;
        }
    }
    // ...
}
```

#### isPrioritized

```java
// BroadcastRecord.java (line 746)
static boolean isPrioritized(@NonNull int[] blockedUntilBeyondCount, boolean ordered) {
    return !ordered && (blockedUntilBeyondCount.length > 0)
            && (blockedUntilBeyondCount[0] != -1);
}
```

"优先级广播"包括所有有序广播以及接收者优先级不全一致的无序广播。

### 4.4 enqueueBroadcastLocked

```java
// BroadcastQueueModernImpl.java (line 802)
public void enqueueBroadcastLocked(@NonNull BroadcastRecord r) {
    // 第一处 skip 策略：根据 BroadcastOptions 配置
    applyDeliveryGroupPolicy(r);

    r.enqueueTime = SystemClock.uptimeMillis();
    mHistory.onBroadcastEnqueuedLocked(r);

    boolean enqueuedBroadcast = false;
    for (int i = 0; i < r.receivers.size(); i++) {
        final Object receiver = r.receivers.get(i);
        // 获取或创建接收者进程对应的 BPQ
        final BroadcastProcessQueue queue = getOrCreateProcessQueue(
                getReceiverProcessName(receiver), getReceiverUid(receiver));
        // 第二处 skip 策略：权限检查
        final String skipReason = mSkipPolicy.shouldSkipMessage(r, receiver);
        if (skipReason != null) {
            setDeliveryState(null, null, r, i, receiver,
                    BroadcastRecord.DELIVERY_SKIPPED, "skipped by policy at enqueue: " + skipReason);
            continue;
        }
        enqueuedBroadcast = true;
        // 入队或替换（第三处 skip 策略：FLAG_RECEIVER_REPLACE_PENDING）
        queue.enqueueOrReplaceBroadcast(r, i, mBroadcastConsumerDeferApply);
        // 更新 mRunnableAt
        updateRunnableList(queue);
        // 切换到 ActivityManager 线程执行派发
        enqueueUpdateRunningList();
    }
}
```

三处 skip 策略：
1. **DeliveryGroupPolicy**：基于 `BroadcastOptions` 配置，如亮灭屏广播使用 `DELIVERY_GROUP_POLICY_MOST_RECENT` 只保留最新广播
2. **shouldSkipMessage**：权限检查，安全中心插桩
3. **FLAG_RECEIVER_REPLACE_PENDING**：替换同 flag 的旧广播

#### 广播入 BPQ 队列

```java
// BroadcastProcessQueue.java
public BroadcastRecord enqueueOrReplaceBroadcast(@NonNull BroadcastRecord record,
        int recordIndex, ...) {
    // ...
    SomeArgs newBroadcastArgs = SomeArgs.obtain();
    newBroadcastArgs.arg1 = record;
    newBroadcastArgs.argi1 = recordIndex;
    // 按紧急程度选择队列
    getQueueForBroadcast(record).addLast(newBroadcastArgs);
    // 更新 BPQ 特征信息
    onBroadcastEnqueued(record, recordIndex);
    return null;
}

private ArrayDeque<SomeArgs> getQueueForBroadcast(@NonNull BroadcastRecord record) {
    if (record.isUrgent()) return mPendingUrgent;
    else if (record.isOffload()) return mPendingOffload;
    else return mPending;
}
```

### 4.5 updateRunnableAt

```java
// BroadcastProcessQueue.java (line 1200)
void updateRunnableAt() {
    if (!mRunnableAtInvalidated) return;
    mRunnableAtInvalidated = false;

    final SomeArgs next = peekNextBroadcast();
    if (next != null) {
        final BroadcastRecord r = (BroadcastRecord) next.arg1;
        final int index = next.argi1;
        final long runnableAt = r.enqueueTime;

        // 被阻塞的广播：mRunnableAt 设为无穷大
        if (r.isBlocked(index)) {
            mRunnableAt = Long.MAX_VALUE;
            return;
        }
        // 按优先级分档计算 mRunnableAt
        if (mForcedDelayedDurationMs > 0) {
            mRunnableAt = runnableAt + mForcedDelayedDurationMs;
        } else if (mCountForeground > mCountForegroundDeferred) {
            mRunnableAt = runnableAt + constants.DELAY_URGENT_MILLIS;     // 入队时间 - 120s
        } else if (mCountInteractive > 0) {
            mRunnableAt = runnableAt + constants.DELAY_URGENT_MILLIS;
        } else if (mCountInstrumented > 0) {
            mRunnableAt = runnableAt + constants.DELAY_URGENT_MILLIS;
        } else if (mUidForeground) {
            mRunnableAt = runnableAt + constants.DELAY_FOREGROUND_PROC_MILLIS;
        } else if (mCountOrdered > 0) {
            mRunnableAt = runnableAt;                                      // 入队时间
        } else if (mCountAlarm > 0) {
            mRunnableAt = runnableAt;
        } else if (mCountPrioritized > mCountPrioritizedDeferred) {
            mRunnableAt = runnableAt;
        } else if (mCountManifest > 0) {
            mRunnableAt = runnableAt;
        } else if (UserHandle.isCore(uid)) {
            mRunnableAt = runnableAt;
        } else {
            mRunnableAt = runnableAt + constants.DELAY_NORMAL_MILLIS;     // 入队时间 + 500ms
        }
    } else {
        mRunnableAt = Long.MAX_VALUE;
    }
}
```

根据 BPQ 的特征信息决定该 BPQ 从 runnable 调度到 running 的时机，大致分为四档：
1. **紧急**（urgent/foreground/interactive）：入队时间 - 120 秒
2. **重要**（ordered/alarm/prioritized/manifest/core）：入队时间
3. **普通**：入队时间 + 500ms
4. **可延迟**：入队时间 + 120 秒

至此，广播入队完成。入队过程就是将一个广播的所有接收者打散到各自对应的 BPQ 队列中，并给每个 BPQ 设置可派发的时间。

## 五、广播分发流程

广播分发主要解决两个问题：
1. 如何将当前广播派发给对应的每个接收者
2. 本轮派发完成后如何触发下一轮派发

### 5.1 分发整体架构

![分发时序图（warm 路径）](/img/android/broadcast/07_dispatch_warm_sequence.svg)

![分发时序图（cold 路径）](/img/android/broadcast/08_dispatch_cold_sequence.svg)

#### 关键方法调用链

```plaintext
MSG_UPDATE_RUNNING_LIST
    BroadcastQueueModernImpl::updateRunningListLocked       -- 更新 running 数组
        promoteToRunningLocked                              -- BPQ: runnable → running
        scheduleReceiverWarmLocked                          -- 进程已存在
            shouldSkipReceiver                              -- 第四处 skip（功耗/冻结）
            dispatchReceivers                               -- 派发广播
                isAssumedDelivered                          -- 判断广播类型
                startDeliveryTimeoutLocked                  -- 埋 ANR 炸弹
                thread.scheduleRegisteredReceiver           -- 动态接收者
                thread.scheduleReceiver                     -- 静态接收者
            shouldRetire                                    -- 判断是否退休
            makeActiveNextPending                           -- 选择下一个广播
        scheduleReceiverColdLocked                          -- 进程不存在，冷启动
            startProcessLocked → ... → onApplicationAttachedLocked
                → scheduleReceiverWarmLocked                -- 进程启动后回到 warm 路径
        demoteFromRunningLocked                             -- BPQ: running → runnable
```

### 5.2 updateRunningListLocked

```java
// BroadcastQueueModernImpl.java
private void updateRunningListLocked() {
    // 计算可用 slot 数量（总共 5 个，其中 1 个预留给 urgent）
    final int usedExtra = Math.min(getRunningUrgentCount(),
            mConstants.EXTRA_RUNNING_URGENT_PROCESS_QUEUES);
    int avail = mRunning.length - getRunningSize() - usedExtra;
    if (avail == 0) return;

    BroadcastProcessQueue queue = mRunnableHead;
    while (queue != null && avail > 0) {
        BroadcastProcessQueue nextQueue = queue.runnableAtNext;

        if (!queue.isRunnable()) { queue = nextQueue; continue; }

        // 已达 4 个 running 时，仅允许 urgent BPQ 进入
        if (getRunningSize() >= mConstants.MAX_RUNNING_PROCESS_QUEUES) {
            if (!queue.isPendingUrgent()) { queue = nextQueue; continue; }
        }

        // 未到 mRunnableAt 时间的 BPQ，延迟处理
        if (runnableAt > now) {
            mLocalHandler.sendEmptyMessageAtTime(MSG_UPDATE_RUNNING_LIST, runnableAt);
            break;
        }

        // 冷启动进程控制：同一时间只冷启一个进程
        final boolean processWarm = queue.isProcessWarm();
        if (!processWarm) {
            if (mRunningColdStart == null) {
                mRunningColdStart = queue;
            } else if (isPendingColdStartValid()) {
                queue = nextQueue; continue;
            }
        }

        // 提升到 running 状态
        promoteToRunningLocked(queue);
        boolean completed;
        if (processWarm) {
            completed = scheduleReceiverWarmLocked(queue);
        } else {
            completed = scheduleReceiverColdLocked(queue);
        }
        if (completed) {
            demoteFromRunningLocked(queue);
        }
        avail--;
        queue = nextQueue;
    }
}
```

### 5.3 scheduleReceiverWarmLocked

这是 BPQ 以进程为单位批量派发的核心逻辑。

```java
// BroadcastQueueModernImpl.java
private boolean scheduleReceiverWarmLocked(@NonNull BroadcastProcessQueue queue) {
    // 循环派发：只要 BPQ 三个容器中还有广播，就持续派发
    while (queue.isActive()) {
        final BroadcastRecord r = queue.getActive();
        final int index = queue.getActiveIndex();

        if (r.terminalCount == 0) {
            r.dispatchTime = SystemClock.uptimeMillis();
        }

        // 第四处 skip：功耗/冻结模块在此插桩
        final String skipReason = shouldSkipReceiver(queue, r, index);
        if (skipReason == null) {
            final boolean isBlockingDispatch = dispatchReceivers(queue, r, index);
            if (isBlockingDispatch) return false;  // 阻塞送达，等待 finish
        } else {
            finishReceiverActiveLocked(queue, BroadcastRecord.DELIVERY_SKIPPED, skipReason);
        }

        // 检查是否应该退休（防饥饿）
        if (shouldRetire(queue)) break;
        // 选择下一个待派发广播
        queue.makeActiveNextPending();
    }
    return true;
}
```

### 5.4 dispatchReceivers

```java
// BroadcastQueueModernImpl.java
private boolean dispatchReceivers(@NonNull BroadcastProcessQueue queue,
        @NonNull BroadcastRecord r, int index) {
    final boolean assumeDelivered = r.isAssumedDelivered(index);

    // 非 assumeDelivered 类型才埋 ANR 炸弹
    if (mService.mProcessesReady && !r.timeoutExempt && !assumeDelivered) {
        queue.setTimeoutScheduled(true);
        final int softTimeoutMillis = (int) (r.isForeground()
                ? mFgConstants.TIMEOUT : mBgConstants.TIMEOUT);
        startDeliveryTimeoutLocked(queue, softTimeoutMillis);
    }

    setDeliveryState(queue, app, r, index, receiver,
            BroadcastRecord.DELIVERY_SCHEDULED, "scheduleReceiverWarmLocked");

    final IApplicationThread thread = app.getOnewayThread();
    if (thread != null) {
        if (receiver instanceof BroadcastFilter) {
            // 动态注册接收者
            thread.scheduleRegisteredReceiver(
                ((BroadcastFilter) receiver).receiverList.receiver,
                receiverIntent, r.resultCode, r.resultData, r.resultExtras,
                r.ordered, r.initialSticky, assumeDelivered, r.userId, ...);
            if (assumeDelivered) {
                // "假设送达"类型立即完成
                finishReceiverActiveLocked(queue,
                        BroadcastRecord.DELIVERY_DELIVERED, "assuming delivered");
                return false;
            }
        } else {
            // 静态注册接收者
            thread.scheduleReceiver(receiverIntent,
                    ((ResolveInfo) receiver).activityInfo, ...);
        }
        return true;  // 阻塞送达，等待 app 回调 finish
    }
    return false;
}
```

#### isAssumedDelivered

```java
// BroadcastRecord.java (line 253)
boolean isAssumedDelivered(int index) {
    // 动态注册 + 无序 + 无 resultTo
    return (receivers.get(index) instanceof BroadcastFilter) && !ordered
            && (resultTo == null);
}
```

"假设送达"类型广播发出后立即假定已送达，不触发 ANR 机制。这是并行分发的基础——只有这类广播能真正做到多进程并行。

#### ANR 超时机制（soft + hard）

```java
// BroadcastQueueModernImpl.java
private void startDeliveryTimeoutLocked(BroadcastProcessQueue queue, int softTimeoutMillis) {
    if (mAnrTimer.serviceEnabled()) {
        mAnrTimer.start(queue, softTimeoutMillis);
    } else {
        queue.lastCpuDelayTime = queue.app.getCpuDelayTime();
        mLocalHandler.sendMessageDelayed(Message.obtain(mLocalHandler,
                MSG_DELIVERY_TIMEOUT_SOFT, softTimeoutMillis, 0, queue), softTimeoutMillis);
    }
}
```

即使触发了 soft 超时也不一定立即 ANR——系统会检查进程等待 CPU 的时间，最多将 ANR 阈值延长至原定时间的两倍（前台 20 秒，后台 120 秒）。

### 5.5 shouldRetire（防饥饿）

```java
// BroadcastQueueModernImpl.java (line 1522)
private boolean shouldRetire(@NonNull BroadcastProcessQueue queue) {
    final boolean shouldRetire;
    if (UserHandle.isCore(queue.uid)) {
        // 系统进程：16 个阻塞送达 或 64 个假设送达
        final int nonBlockingDeliveryCount = queue.getActiveAssumedDeliveryCountSinceIdle();
        final int blockingDeliveryCount = queue.getActiveCountSinceIdle()
                - nonBlockingDeliveryCount;
        shouldRetire = (blockingDeliveryCount >= mConstants.MAX_CORE_RUNNING_BLOCKING_BROADCASTS)
                || (nonBlockingDeliveryCount >= mConstants.MAX_CORE_RUNNING_NON_BLOCKING_BROADCASTS);
    } else {
        // 非系统应用：16 个任意广播
        shouldRetire = queue.getActiveCountSinceIdle() >= mConstants.MAX_RUNNING_ACTIVE_BROADCASTS;
    }
    return !queue.isRunnable() || !queue.isProcessWarm() || shouldRetire;
}
```

### 5.6 scheduleReceiverColdLocked

当 BPQ 对应的进程不存在时（静态注册接收者），需要冷启动进程：

```java
// BroadcastQueueModernImpl.java
private boolean scheduleReceiverColdLocked(@NonNull BroadcastProcessQueue queue) {
    queue.setActiveViaColdStart(true);
    // ...
    // 动态注册的广播接收者不能冷启进程
    if (receiver instanceof BroadcastFilter) {
        finishReceiverActiveLocked(queue, BroadcastRecord.DELIVERY_SKIPPED, ...);
        return true;
    }
    // 冷启动进程
    final HostingRecord hostingRecord = HostingRecord.byBroadcastReceiver(...);
    mService.startProcessLocked(info.processName, info, ...);
    return false;  // 进程启动后会回调 onApplicationAttachedLocked
}
```

进程启动完成后，通过 `onApplicationAttachedLocked` → `scheduleReceiverWarmLocked` 回到 warm 路径。

## 六、广播完成流程

### 6.1 动态注册接收者完成流程

AMS 在 `dispatchReceivers` 中通过 `scheduleRegisteredReceiver` Binder call 到应用进程：

```java
// ActivityThread.java
public void scheduleRegisteredReceiver(IIntentReceiver receiver, Intent intent, ...) {
    // 调用 InnerReceiver 的 performReceive
    if (receiver instanceof LoadedApk.ReceiverDispatcher.InnerReceiver) {
        ((LoadedApk.ReceiverDispatcher.InnerReceiver) receiver)
                .performReceive(intent, resultCode, ...);
    }
    // ...
}
```

`InnerReceiver.performReceive` → `ReceiverDispatcher.performReceive` → 向主线程 post 一个 Runnable：

```java
// LoadedApk.ReceiverDispatcher
public void performReceive(Intent intent, ...) {
    final Args args = new Args(intent, resultCode, ...);
    // 向 handler 消息队列 post runnable
    mActivityThread.post(args.getRunnable());
}
```

Runnable 的 run 方法体中执行 `onReceive` 和 `finish`：

```java
// LoadedApk.ReceiverDispatcher.Args
public final Runnable getRunnable() {
    return () -> {
        final BroadcastReceiver receiver = mReceiver;
        // ...
        receiver.setPendingResult(this);
        // 执行应用实现的 onReceive
        receiver.onReceive(mContext, intent);
        // onReceive 执行完毕后通知 AMS
        if (receiver.getPendingResult() != null) {
            finish();
        }
    };
}
```

### 6.2 静态注册接收者完成流程

AMS 通过 `scheduleReceiver` Binder call 到应用进程，发送 `H.RECEIVER` 消息：

```java
// ActivityThread.java
private void handleReceiver(ReceiverData data) {
    // 通过反射创建 BroadcastReceiver 实例
    receiver = packageInfo.getAppFactory()
            .instantiateReceiver(cl, data.info.name, data.intent);
    // ...
    receiver.setPendingResult(data);
    receiver.onReceive(context.getReceiverRestrictedContext(), data.intent);
    // finish 通知 AMS
    if (receiver.getPendingResult() != null) {
        data.finish();
    }
}
```

### 6.3 finish 流程

`PendingResult.finish()` → `sendFinished()` → `am.finishReceiver()`：

```java
// BroadcastReceiver.PendingResult
public void sendFinished(IActivityManager am) {
    synchronized (this) {
        mFinished = true;
        // 只有非 assumeDelivered 类型才需要通知 AMS
        if (!mAssumeDeliveredHint) {
            if (mOrderedHint) {
                // 有序广播还需传递 abort 信息
                am.finishReceiver(mToken, mResultCode, mResultData,
                        mResultExtras, mAbortBroadcast, mFlags);
            } else {
                am.finishReceiver(mToken, 0, null, null, false, mFlags);
            }
        }
    }
}
```

AMS 收到 `finishReceiver` 后：

```java
// BroadcastQueueModernImpl.java
public boolean finishReceiverLocked(@NonNull ProcessRecord app, ...) {
    // 将状态设为 DELIVERY_DELIVERED
    finishReceiverActiveLocked(queue, BroadcastRecord.DELIVERY_DELIVERED, "remote app");
    // 有序广播被 abort 时，skip 后续接收者
    if (r.resultAbort) {
        for (int i = index + 1; i < r.receivers.size(); i++) {
            setDeliveryState(..., DELIVERY_SKIPPED, "resultAbort");
        }
    }
    // 检查是否退休
    if (shouldRetire(queue)) {
        demoteFromRunningLocked(queue);
        return true;
    }
    // 触发下一个广播的派发
    queue.makeActiveNextPending();
    if (scheduleReceiverWarmLocked(queue)) {
        demoteFromRunningLocked(queue);
        return true;
    }
    return false;
}
```

`finishReceiverActiveLocked` 中会取消 ANR 炸弹：

```java
private void finishReceiverActiveLocked(@NonNull BroadcastProcessQueue queue,
        int deliveryState, String reason) {
    setDeliveryState(queue, app, r, index, receiver, deliveryState, reason);
    if (deliveryState == BroadcastRecord.DELIVERY_TIMEOUT) {
        // 触发 ANR
        mService.appNotResponding(queue.app, tr);
    } else if (queue.timeoutScheduled()) {
        // 取消 ANR 炸弹
        cancelDeliveryTimeoutLocked(queue);
    }
}
```

### 6.4 goAsync 机制

应用可以在 `onReceive` 中调用 `goAsync()` 将广播处理转移到子线程，避免阻塞主线程：

```java
// BroadcastReceiver.java
public final PendingResult goAsync() {
    PendingResult res = mPendingResult;
    // 将 mPendingResult 置为 null，阻止 onReceive 返回后自动 finish
    mPendingResult = null;
    return res;
}
```

调用 `goAsync()` 后，`onReceive` 返回时不会自动调用 `finish()`，应用需要在子线程完成处理后手动调用 `PendingResult.finish()`。注意：ANR 计时器仍然在运行，`goAsync()` 并不延长超时时间。

## 七、关键日志

### 7.1 开启动态日志

```shell
adb shell am logging enable-text DEBUG_BACKGROUND_CHECK DEBUG_BROADCAST \
    DEBUG_BROADCAST_BACKGROUND DEBUG_BROADCAST_LIGHT DEBUG_BROADCAST_DEFERRAL
```

### 7.2 日志示例

以亮屏广播为例：
```
// AMS 收到广播
V ActivityManager: Broadcast: Intent { act=android.intent.action.SCREEN_ON ... }

// 广播入队
V ActivityManager: Enqueueing broadcast: android.intent.action.SCREEN_ON replacePending=false
V BroadcastQueue: Enqueuing BroadcastRecord{...} for 124 receivers

// BPQ 调度为 running
V BroadcastQueue: Promoting BroadcastProcessQueue{... system/1000} from runnable to running

// 派发给接收者
V BroadcastQueue: Scheduling BroadcastRecord{...} to warm ProcessRecord{...}
```

### 7.3 Dump 信息

```
ACTIVITY MANAGER BROADCAST STATE (dumpsys activity broadcasts)

  Registered Receivers:       动态注册的接收者（以接收者为单位）
  Receiver Resolver Table:    动态注册的接收者（以 action 为单位）
  Per-process queues:         每个有待发广播的 BPQ 状态
  Runnable:                   等待调度为 running 的 BPQ
  Running:                    正在执行广播派发的 BPQ
  Pending broadcasts:         系统中所有等待派发的广播
  Historical broadcasts:      已派发广播的详情（256 条）
  Historical broadcasts summary: 已派发广播的简略列表（1024 条）
```

## 八、为什么广播入队和派发需要放到不同线程

广播入队时 `broadcastIntentWithFeature` 方法已持有 AMS 锁，整个入队流程都在 AMS 锁的临界区内。后续广播派发通过 `MSG_UPDATE_RUNNING_LIST` 消息切换到 ActivityManager 线程，该线程在 `updateRunningList` 时重新获取 AMS 锁。

虽然两个流程在不同线程中执行会产生锁竞争，但好处是显著减轻了 ActivityManager 线程的负载。广播入队是高频且离散的操作，U 版本将广播改为按 BPQ 批量分发也是为了减少 ActivityManager 线程的调度开销。

```java
// BroadcastQueueModernImpl.java
private void enqueueUpdateRunningList() {
    mLocalHandler.removeMessages(MSG_UPDATE_RUNNING_LIST);
    mLocalHandler.sendEmptyMessage(MSG_UPDATE_RUNNING_LIST);
}
```
