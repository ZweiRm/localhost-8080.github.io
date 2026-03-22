---
prev:
    text: '同步工具'
    link: 'java/api-util-concurrent-sync-tools'
next:
    text: '输入输出类库'
    link: 'java/api-io'
---

# CAS 与 AQS
### 5.9.16 CAS (Compare and Swap) 原理
+ 在并发中判断是否被其他线程修改的方法，保证多线程情况下修改不会出错。假设某个变量应该是某值，如果是，则继续修改；如果不是则该值被其他线程修改过，则不修改。  
+ 三个操作数：内存值 V, 预期值 A 和要修改的值 B. 仅当 V 与 A 相同时，才将 V 修改为 B，最后返回 V.  
+ 应用场景：  
  + 乐观锁  
  + 并发容器  
  + 原子类  
    1. 加载 Unsafe 工具直接操作内存数据  
       Java 通过本地方法编写了 Unsafe 类，提供了硬件级别的原子操作。  
       通过 valueOffset 这样的内存偏移地址在内存中获取到 value 原值，之后提供 Unsafe 来实现 CAS.  
    2. 使用 volatile 修饰 value 字段保证可见性  
+ 缺点：  
  + ABA 问题：线程 1 在比较时发现值符合，但是在准备修改期间被其他线程变更值为其他值又变回原值，CAS 无法知道这些变更。可以利用版本号的方法解决。  
  + 自旋时间过长

### 5.9.17 AQS (Abstract Queued Synchronizer)
AQS 是一个用于构建锁、同步器和协作工具的工具类。利用它可以简单构建线程协作类。  
核心为三部分：  
+ state
  + 会因为具体实现类的不同而具有不同含义。在 `Semaphore` 中表示剩余信号量个数。在 `CountDownLatch` 中表示还要倒数的个数。在 `ReentrantLock` 中表示锁的占有情况，比如可重入次数。  
  + 被 `volatile` 修饰，允许并发修改。修改 state 的方法需要保证线程安全，例如 `getState()`, `setSate()`, `compareAndSetState()` 等。这些方法都依赖 atomic 包支持。  
+ 控制线程对锁争抢和配合的 FIFO 队列  
  + 用来存放等待中的线程。  
  + 双向链表形式。  
+ 期望协作工具类要实现的获取和释放等重要方法
  + 获取方法  
    依赖 state 变量，经常会阻塞。例如 `Semaphore` 中的 `acquire()`, `CountDownLatch` 中的 `await()`  
  + 释放方法  
    依赖 state 变量，不会阻塞。例如 `Semaphore` 中的 `release()`, `CountDownLatch` 中的 `countDown()`  

示例：  
利用 AQS 编写一个一次性门闩线程协作器。线程调用 `await()` 进入阻塞状态；当某一线程调用 `signal()` 则放行所有线程。  
``` java
public class Latch {
    private Sync sync = new Sync();

    // 获取
    public void await() {
        sync.acquireShared(0);
    }

    // 释放
    public void signal() {
        sync.releaseShared(0);
    }

    private class Sync extends AbstractQueuedSynchronizer {
        @Override
        protected int tryAcquireShared(int arg) {
            return (getState() == 1) ? 1 : -1;  // 小于 0 的时候阻塞
        }

        @Override
        protected boolean tryReleaseShared(int arg) {
            setState(1);    // state = 1 时放行
            return true;    // 为真时放行
        }
    }
}
```
