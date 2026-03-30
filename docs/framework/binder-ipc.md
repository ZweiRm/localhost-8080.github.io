---
prev: false
next:
  text: 'Activity 启动流程与生命周期'
  link: '/framework/activity-launching-process'
---

# Android Binder IPC 机制

> 本文系统介绍 Android 的核心进程间通信机制 Binder，涵盖架构设计、通信原理、AIDL 机制，以及 Framework 中 Service 与 Manager 的设计模式。

## 一、概述

### 1.1 为什么需要 IPC

Android 基于 Linux 内核，每个应用运行在独立的进程中，拥有各自的虚拟地址空间。进程间无法直接访问对方的内存，这是操作系统的安全边界。然而 Android 系统的正常运作离不开进程间协作：

- 应用需要调用系统服务（如 AMS、WMS、PMS）
- 应用之间需要数据共享（如 ContentProvider）
- 系统进程需要管理应用的生命周期

因此，Android 需要一种高效、安全的进程间通信（IPC）机制。

### 1.2 为什么选择 Binder

Linux 原生提供了多种 IPC 机制：

| 机制 | 拷贝次数 | 特点 | 不足 |
|------|---------|------|------|
| **管道 (Pipe)** | 2 次 | 简单，单向通信 | 效率低，只能父子进程间使用 |
| **Socket** | 2 次 | 通用，支持网络通信 | 开销大，传输效率低 |
| **共享内存** | 0 次 | 最快 | 同步复杂，无安全机制 |
| **信号 (Signal)** | — | 异步通知 | 只能传递信号编号，无法传输数据 |
| **Binder** | **1 次** | 高效、安全、支持身份验证 | Android 专有，非标准 Linux 机制 |

Binder 的核心优势：

1. **一次拷贝**：通过 mmap 内存映射，数据从发送方到接收方只需一次 `copy_from_user`，而传统 IPC 需要两次拷贝
2. **安全性**：Binder 驱动在内核层为每次通信附加发送方的 UID/PID，接收方可据此做权限校验，且发送方无法伪造身份
3. **C/S 架构**：天然支持客户端-服务端模型，与 Android 的系统服务架构契合

## 二、Binder 架构

Binder 通信涉及四个角色：

![Binder IPC 整体架构](/img/android/binder_ipc/01_binder_architecture.svg)

| 角色 | 说明 |
|------|------|
| **Client** | 服务的调用方，持有服务端的代理对象（BinderProxy） |
| **Server** | 服务的提供方，实现具体的业务逻辑 |
| **ServiceManager** | 系统服务的注册中心，类似 DNS，负责维护"服务名 → Binder 引用"的映射表 |
| **Binder 驱动** | 内核模块（`/dev/binder`），负责跨进程的数据传输和线程调度 |

### 通信流程

1. **注册**：Server 进程启动后，通过 `ServiceManager.addService("service_name", binder)` 将自己的 Binder 实体注册到 ServiceManager
2. **查询**：Client 进程通过 `ServiceManager.getService("service_name")` 获取 Server 的 Binder 引用（实际得到的是一个 BinderProxy 代理对象）
3. **调用**：Client 通过代理对象发起调用，数据经过 Binder 驱动传输到 Server，Server 执行后将结果原路返回

> ServiceManager 本身也是一个 Binder 服务，但它的 Binder 引用（handle = 0）是所有进程在启动时就已知的"约定"，不需要再通过另一个 ServiceManager 去查找。

## 三、一次拷贝原理

Binder 的核心性能优势来自 mmap 内存映射机制：

![Binder 一次拷贝原理](/img/android/binder_ipc/02_one_copy_mmap.svg)

### 传统 IPC 的两次拷贝

在 Socket、Pipe 等传统 IPC 中，数据传输需要两步：
1. 发送方通过 `copy_from_user` 将数据从用户空间拷贝到内核缓冲区
2. 内核通过 `copy_to_user` 将数据从内核缓冲区拷贝到接收方用户空间

### Binder 的一次拷贝

Binder 利用 mmap 机制优化了这个过程：

1. 接收方进程在打开 Binder 驱动时，通过 `mmap()` 系统调用将一块内核缓冲区映射到自己的用户空间。此后，内核缓冲区和接收方用户空间指向**同一块物理内存**
2. 发送方调用 `ioctl(BINDER_WRITE_READ)` 时，Binder 驱动通过 `copy_from_user` 将数据拷贝到内核缓冲区
3. 由于 mmap 的映射关系，接收方可以直接在用户空间读取数据，**无需第二次拷贝**

```c
// 接收方打开 Binder 驱动时执行 mmap
// ProcessState.cpp
ProcessState::ProcessState(const char* driver) {
    mDriverFD = open(driver, O_RDWR | O_CLOEXEC);  // 打开 /dev/binder
    mVMStart = mmap(nullptr,
                    BINDER_VM_SIZE,          // (1MB - PAGE_SIZE*2)，通常为 1MB - 8KB
                    PROT_READ,               // 用户空间只读
                    MAP_PRIVATE | MAP_NORESERVE,
                    mDriverFD, 0);
}
```

> Binder 默认的 mmap 映射大小为 `(1 * 1024 * 1024) - sysconf(_SC_PAGE_SIZE) * 2`，页大小通过 `sysconf()` 动态获取。在 4KB 页设备上为 `1MB - 8KB`，在 16KB 页设备（Android 15+ 支持）上为 `1MB - 32KB`。这也是单次 Binder 传输数据的上限，超过此限制会抛出 `TransactionTooLargeException`。

## 四、AIDL 机制

### 4.1 AIDL 是什么

AIDL（Android Interface Definition Language）是 Android 提供的接口定义语言，用于生成跨进程通信所需的模板代码。开发者只需定义接口，AIDL 工具会自动生成 Proxy（客户端代理）和 Stub（服务端骨架）。

### 4.2 AIDL 示例

定义一个 AIDL 接口：

```java
// IMyService.aidl
interface IMyService {
    String getData(int id);
    void setData(int id, String value);
}
```

编译后自动生成 `IMyService.java`，包含以下关键类：

![AIDL Proxy/Stub 类结构](/img/android/binder_ipc/03_aidl_proxy_stub.svg)

### 4.3 Stub（服务端骨架）

`Stub` 是一个抽象类，继承自 `Binder` 并实现 `IMyService` 接口。服务端需要继承它并实现具体方法：

```java
// 服务端实现
public class MyServiceImpl extends IMyService.Stub {
    @Override
    public String getData(int id) {
        return "data_" + id;  // 业务逻辑
    }

    @Override
    public void setData(int id, String value) {
        // 业务逻辑
    }
}
```

`Stub.onTransact()` 负责将收到的 Binder 事务分发到对应的方法：

```java
// AIDL 自动生成
@Override
public boolean onTransact(int code, Parcel data, Parcel reply, int flags) {
    switch (code) {
        case TRANSACTION_getData: {
            data.enforceInterface(descriptor);
            int _arg0 = data.readInt();         // 反序列化参数
            String _result = this.getData(_arg0); // 调用实现
            reply.writeString(_result);          // 序列化返回值
            return true;
        }
        case TRANSACTION_setData: {
            // ...
        }
    }
    return super.onTransact(code, data, reply, flags);
}
```

### 4.4 Proxy（客户端代理）

`Proxy` 实现了 `IMyService` 接口，内部持有 `mRemote`（一个 `IBinder` 引用，指向远端的 Stub）。调用方法时，Proxy 将参数序列化为 `Parcel`，通过 `mRemote.transact()` 发送到服务端：

```java
// AIDL 自动生成的 Proxy
@Override
public String getData(int id) throws RemoteException {
    Parcel _data = Parcel.obtain();
    Parcel _reply = Parcel.obtain();
    try {
        _data.writeInterfaceToken(DESCRIPTOR);
        _data.writeInt(id);                            // 序列化参数
        mRemote.transact(TRANSACTION_getData, _data, _reply, 0);  // 发起 IPC
        _reply.readException();
        return _reply.readString();                    // 反序列化结果
    } finally {
        _reply.recycle();
        _data.recycle();
    }
}
```

### 4.5 asInterface()

`Stub.asInterface()` 用于将 `IBinder` 转换为接口对象。它会判断是否在同一进程中：

```java
public static IMyService asInterface(IBinder obj) {
    if (obj == null) return null;
    // 查询本地接口——如果在同一进程，直接返回 Stub 本身
    IInterface iin = obj.queryLocalInterface(DESCRIPTOR);
    if (iin != null && iin instanceof IMyService) {
        return (IMyService) iin;
    }
    // 不在同一进程，返回 Proxy
    return new IMyService.Stub.Proxy(obj);
}
```

- **同进程**：直接返回 Stub 实现，方法调用是普通的 Java 方法调用，无 IPC 开销
- **跨进程**：返回 Proxy 对象，方法调用会通过 Binder 驱动进行 IPC

## 五、Framework 中的 Service 与 Manager

Android Framework 中大量使用 Binder，系统服务遵循统一的 **Manager — Service 模式**。

![系统服务的 Manager-Service 模式](/img/android/binder_ipc/04_system_service_pattern.svg)

### 5.1 三个角色的分工

| 角色 | 位置 | 职责 | 示例 |
|------|------|------|------|
| **XxxManagerService** | system_server 进程 | 继承 `IXxxService.Stub`，**真正的业务逻辑实现** | ActivityManagerService, WindowManagerService |
| **IXxxService** | AIDL 定义 | 定义 Service 暴露的接口，编译后生成 Stub 和 Proxy | IActivityManager, IWindowManager |
| **XxxManager** | App 进程 | 封装 Proxy 调用，为应用提供**简洁友好的 API** | ActivityManager, WindowManager |

### 5.2 为什么需要 Manager 层

直接使用 `IXxxService.Stub.Proxy` 也能完成调用，但 Manager 提供了额外的价值：

1. **简化 API**：Proxy 的方法签名与 AIDL 一致，参数较底层。Manager 将多个 Proxy 调用组合为一个语义清晰的高层方法
2. **缓存与优化**：Manager 可以缓存频繁查询的结果，减少不必要的 IPC
3. **异常处理**：统一处理 `RemoteException` 等跨进程异常
4. **版本兼容**：AIDL 接口可能随版本变化，Manager 层可以屏蔽这些差异

### 5.3 获取系统服务的流程

应用通过 `Context.getSystemService()` 获取 Manager 实例：

```java
// 应用代码
ActivityManager am = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
```

内部流程：

```java
// ContextImpl.java
@Override
public Object getSystemService(String name) {
    return SystemServiceRegistry.getSystemService(this, name);
}

// SystemServiceRegistry.java — 注册阶段（静态初始化块）
registerService(Context.ACTIVITY_SERVICE, ActivityManager.class,
    new CachedServiceFetcher<ActivityManager>() {
        @Override
        public ActivityManager createService(ContextImpl ctx) {
            return new ActivityManager(ctx.getOuterContext(), ctx.mMainThread.getHandler());
        }
    });
```

整个链路：`getSystemService()` → `ServiceManager.getService()` 获取 IBinder → `Stub.asInterface()` 生成 Proxy → 用 Proxy 构造 Manager → 返回给应用。

### 5.4 常见的系统服务

| 服务名 | Manager | Service | AIDL 接口 | 职责 |
|--------|---------|---------|-----------|------|
| `activity` | ActivityManager | ActivityManagerService | IActivityManager | 进程管理、广播、Service 管理 |
| `activity_task` | ActivityTaskManager | ActivityTaskManagerService | IActivityTaskManager | Activity 和 Task 管理（Android 10+ 从 AMS 拆分） |
| `window` | WindowManager | WindowManagerService | IWindowManager | 窗口管理、布局、层级 |
| `package` | PackageManager | PackageManagerService | IPackageManager | 应用安装、权限、组件查询 |
| `input_method` | InputMethodManager | InputMethodManagerService | IInputMethodManager | 输入法管理 |
| `input` | InputManager | InputManagerService | IInputManager | 输入事件管理 |
| `display` | DisplayManager | DisplayManagerService | IDisplayManager | 显示设备管理 |
| `power` | PowerManager | PowerManagerService | IPowerManager | 电源管理、WakeLock |

## 六、应用间 Binder 通信

除了应用与系统服务之间的通信，应用与应用之间也可以通过 Binder 进行 IPC，典型场景是 **bindService + AIDL**。

![应用间 Binder 通信](/img/android/binder_ipc/05_app_to_app_binder.svg)

### 6.1 服务端实现

```java
// Server App
public class MyRemoteService extends Service {
    private final IMyService.Stub mBinder = new IMyService.Stub() {
        @Override
        public String getData(int id) {
            return "data_from_server_" + id;
        }
    };

    @Override
    public IBinder onBind(Intent intent) {
        return mBinder;  // 返回 Stub 实现
    }
}
```

### 6.2 客户端调用

```java
// Client App
private IMyService mService;

private ServiceConnection mConnection = new ServiceConnection() {
    @Override
    public void onServiceConnected(ComponentName name, IBinder service) {
        // asInterface() 判断同进程/跨进程，返回 Stub 或 Proxy
        mService = IMyService.Stub.asInterface(service);
    }

    @Override
    public void onServiceDisconnected(ComponentName name) {
        mService = null;
    }
};

// 绑定服务
Intent intent = new Intent();
intent.setComponent(new ComponentName("com.server.app", "com.server.app.MyRemoteService"));
bindService(intent, mConnection, Context.BIND_AUTO_CREATE);

// 调用远程方法（跨进程）
String result = mService.getData(42);
```

### 6.3 完整流程

1. Client 调用 `bindService()`，请求通过 Binder 发送到 AMS
2. AMS 查找或启动目标 Service，调用其 `onCreate()` 和 `onBind()`
3. `onBind()` 返回 `IMyService.Stub` 实现（IBinder 对象）
4. AMS 将 IBinder 通过 `ServiceConnection.onServiceConnected()` 回调给 Client
5. Client 通过 `Stub.asInterface()` 得到 Proxy，后续调用直接走 Binder 驱动，**不再经过 AMS**

> 注意：AMS 只在建立连接阶段参与，连接建立后 Client 与 Server 直接通过 Binder 通信。这类似 TCP 握手——连接建立后，数据传输不再经过中间人。

### 6.4 ContentProvider 的 Binder 通信

ContentProvider 也使用 Binder 进行跨进程通信，但开发者无需手动编写 AIDL：

```java
// 跨进程查询另一个 App 的 ContentProvider
Cursor cursor = getContentResolver().query(
    Uri.parse("content://com.other.app.provider/data"),
    null, null, null, null);
```

内部流程：`ContentResolver` → AMS 查找目标 Provider → 返回 `IContentProvider` 的 Binder 引用 → 通过 Binder 调用 Provider 的 `query()`/`insert()` 等方法。

## 七、Binder 调用全链路

以 `startActivity()` 为例，一次完整的 Binder 调用从 Java 层穿越 JNI、Native 层，最终到达内核的 Binder 驱动：

![Binder 调用全链路](/img/android/binder_ipc/06_binder_call_stack.svg)

### 7.1 Client 侧调用栈

```
Activity.startActivity()
  → Instrumentation.execStartActivity()
    → ATMS.Stub.Proxy.startActivity()     // AIDL 生成的 Proxy
      → BinderProxy.transact()             // Java 层 Binder
        → android_os_BinderProxy_transact() // JNI
          → BpBinder::transact()           // Native 层
            → IPCThreadState::transact()
              → ioctl(BINDER_WRITE_READ)   // 进入内核
```

### 7.2 Server 侧调用栈

```
ioctl(BINDER_WRITE_READ)                  // 内核唤醒 Binder 线程
  → IPCThreadState::executeCommand()
    → BBinder::transact()                  // Native 层
      → JavaBBinder::onTransact()          // JNI 回调
        → Binder.execTransact()            // Java 层
          → ATMS.Stub.onTransact()         // AIDL 生成的 Stub
            → ATMS.startActivity()         // 真正的业务逻辑
```

### 7.3 关键类说明

| 类 | 层级 | 角色 |
|----|------|------|
| `BinderProxy` | Java | Client 侧的 Binder 代理，对应远端的 Binder 实体 |
| `Binder` | Java | Server 侧的 Binder 实体基类 |
| `BpBinder` | Native | Client 侧代理（Binder Proxy），与 BinderProxy 一一对应 |
| `BBinder` | Native | Server 侧实体（Binder Base），与 Java Binder 一一对应 |
| `IPCThreadState` | Native | 管理当前线程的 Binder 通信状态，负责与驱动交互 |
| `ProcessState` | Native | 管理当前进程的 Binder 状态，负责 mmap 和线程池 |

## 八、Binder 线程池

### 8.1 线程模型

Binder 通信是同步的——Client 发起调用后会阻塞，直到 Server 处理完毕并返回结果。为了能同时处理多个 Client 请求，每个进程都维护了一个 **Binder 线程池**。

```cpp
// ProcessState.cpp
#define DEFAULT_MAX_BINDER_THREADS 15

void ProcessState::startThreadPool() {
    spawnPooledThread(true);  // 启动主 Binder 线程
}

void ProcessState::spawnPooledThread(bool isMain) {
    sp<Thread> t = sp<PoolThread>::make(isMain);
    t->run(name.c_str());
}
```

- 默认最大线程数为 **15**（加上主 Binder 线程共 16 个）
- 线程按需创建，当所有线程都在处理请求时，Binder 驱动会通知进程创建新线程
- 如果线程池已满，新请求会排队等待

### 8.2 oneway 调用

默认的 Binder 调用是同步的，但 AIDL 支持 `oneway` 关键字声明异步调用：

```java
// AIDL 定义
interface IMyService {
    oneway void fireAndForget(String message);  // 异步调用
    String getData(int id);                      // 同步调用
}
```

`oneway` 调用的特点：
- Client 发出请求后**立即返回**，不等待 Server 处理完成
- 不能有返回值（方法必须返回 void）
- 不会抛出远程异常
- 多个 oneway 调用按照发送顺序依次执行（FIFO）

> Android Framework 中大量使用 oneway，例如 `IApplicationThread` 中的生命周期回调（`scheduleTransaction`）就是 oneway 的——system_server 通知 App 执行生命周期变化后不需要等待结果。

## 九、Binder 中的死亡通知

当 Server 进程意外终止时，Client 需要感知并做清理。Binder 提供了 **DeathRecipient** 机制：

```java
// Client 注册死亡监听
IBinder binder = ServiceManager.getService("my_service");
binder.linkToDeath(new IBinder.DeathRecipient() {
    @Override
    public void binderDied() {
        // Server 进程死亡，执行清理或重连
        Log.w(TAG, "Remote service died, reconnecting...");
    }
}, 0);
```

底层原理：Binder 驱动维护了 Binder 实体与引用之间的关系。当持有 Binder 实体的进程退出时，驱动会遍历所有引用该实体的 Proxy，向它们发送死亡通知。