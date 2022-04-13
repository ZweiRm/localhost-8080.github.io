---
prev: ./API-util
next: ./API-util3
---

# API-工具类库 2 (Package `java.util`)
## 并发
**基本信息**  
**Package** java.util.concurrent

JUC 的工具包括三大类：  
+ 并发安全
  + 互斥同步
  + 非互斥同步
  + 无同步方案
+ 线程管理
+ 线程协作

### `ExecutorService`接口
**基本信息**  
`public interface ExecutorService`  

+ 线程池，实现线程复用
+ 先交由核心线程处理；若核心线程已满则放入工作队列中；若工作队列满则创建临时线程

`Executor` 接口是 JUC 线程池库的顶级接口。`ExecutorService` 继承了该接口。`Executor` 中只有一个 `execute()`.  
`ExecutorService` 接口在 `Executor` 的基础上增加了新的方法，比如 `shutdown()`.  

`Executors` 是关于 `Executor` 的工具类。具体的内置线程池创建是用这个类创建的。  

`ThreadPoolExecutor` 继承了抽象类 `AbstractExecutorService`, 而 `AbstractExecutorService` 实现了 `ExecutorService` 接口。  
在使用 `Executors` 创建线程池时，使用了向上造型。即 `ThreadPoolExecutor` 对象 被 `ExecutorService` 变量接收。  

**创建线程池的构造方法参数**  
|参数名|类型|含义|
|:--:|:--:|:--:|
|corePoolSize|int|核心线程数量|
|maxPoolSize|int|最大线程数量|
|keepAliveTime|long|保持存活时间|
|workQueue|BlockingQueue|任务存储队列|
|threadFactory|ThreadFactory|当线程池需要新的线程时，会使用 threadFactory 来生成新线程|
|Handler|RejectedExecutionHandler|当线程池无法接受所提交任务时的拒绝策略|

当线程池创建完成后，不会创建线程。等待任务到来时再创建线程。线程池可以在 corePoolSize 的基础上额外增加线程以应对情况，其最大数量是 maxPoolSize. 具体逻辑是：  
+ 如果线程数量小于 corePoolSize, 即使有线程处于空闲，也新建一个线程来处理新任务；
+ 如果线程大于等于 corePoolSize 但小于 maxPoolSize, 则任务存放在任务队列中等待调用到现有线程中；
+ 如果队列已满且线程数量小于 maxPoolSize, 创建新线程来运行任务；
+ 如果队列已满且线程数等于 maxPoolSize, 拒绝该任务。  

keepAliveTime 是线程存活时间。当线程数量大于 corePoolSize 后，多余空闲线程会在时间超过 keepAliveTime 后被终止。如果设置 allowCoreThreadTimeout= true 则核心线程也会被终止（不推荐）。  

新线程由 ThreadFactory 创建，默认使用 `Executor.defaultThreadFactory()`，创建的线程在同一个线程组中。拥有同样的 NORM_PRIORITY 且都不是守护线程。也可以指定 ThreadFactory 来对线程名、线程组、优先级、是否是守护线程等进行设置。  

对于线程队列，有以下常见类型：  
+ SynchronousQueue: 直接交换,做简单的队列和线程之间中转。队列中没有容量，使用这种队列需要设置较大的 maxPoolSize;  
+ LinkedBlockingQueue: 无界队列，所有任务都会持续放到队列中。当处理速度追不上任务新增速度时，可能会发生异常，比如内存超限；
+ ArrayBlcokingQueue: 有界队列。  

**特性**  
+ 当设置 corePoolSize 和 maxPoolSize 相等，则创建固定大小的线程池。  
+ 线程池优先保证当前有较少的线程数量，只有在负载很大的情况下才增加线程数。  
+ 将 maxPoolSize 设置为很大值（如 Integer.MAX_VALUE）来允许线程池容纳任意数量的并发任务。  
+ 如果任务队列使用了无界队列（如 LinkedBlockingQueue），那么线程数量就永远不会超过 corePoolSize。  

**实例代码**  
``` java
public class ExcutorServiceDemo {
   public static void main(String[] args) {
      // corePoolSize: 核心池大小。线程池中核心线程的数量，创建后不再销毁
      // maximumPoolSize: 允许存在的最大线程数量
      // keepAliveTime：存活时间
      // unit: （存活时间的）单位
      // workQueue: 工作队列，阻塞式队列。在核心线程都被使用的情况下，新请求会被放在工作队列中

      ExecutorService executorService = new ThreadPoolExcutor(5, 10, 3000, TimeUnit.MILLISECONDS, new ArrayBlockingQueue(10));
      for(int i = 0; i < 5; i++) {
         executorService.submit(new Demo()); // 支持Runnable
         // executorService.execute(new Demo()); 支持Callable/Runnable
      }
      executorService.shutdown();
   }
}

class Demo implements Runnable {
   @Override
   public void run() {
      System.out.println(Thread.currentThread().getName() + "被处理");
      try {
         Thread.sleep(3000);
      } catch (InterruptedException e) {
         e.printStackTrace();
      }
   }
}
```

::: tip 线程池
`Executor` 提供了以下线程池：`CachedThreadPool`、`ScheduledThreadPool`, `FixedThreadPool`, `SingleThreadExecutor` 和 `ForkJoinPool`。  

+ `CachedThreadPool`
  + 缓存线程池
  + 小队列大池（无界线程池）
  + 无核心线程，临时线程存活时间短（自动回收多余线程）
  + 能够较好应用高并发场景
  + 不适合长任务场景
  ``` java
  Executor Service executorService = Executors.newCachedThreadPool();
  ```
  + 在源码中使用 ThreadPoolExecutor 创建线程池，参数设定 corePoolSize 为 0，maxPoolSize 为 Integer.MAX_VALUE 来允许任意多任务并发操作。keepAliveTime 为 60L. 使用 SynchronousQueue 作为任务队列，队列中无容量，仅用作队列与线程中间简单交换。可能会因为线程过多而发生内存超限错误。

+ `ScheduledThreadPool`  
  + 周期性的线程池
  + 使用 `schedule()` 传入参数：任务，延迟时间，时间单位来执行延迟任务
  + 使用 `scheduleAtFixedRate()` 传入参数：任务，起始延迟时间，执行周期，时间单位来执行定时任务
  ``` java
  ExecutorService executorService = Executors.newScheduledThreadPool(5);

  // 延迟启动
  executorService.schedule(new Task(), 5, TimeUnit.SECONDS);

  // 每隔一定时间循环启动
  executorService.schedule(new Task(), 1, 3, TimeUnit.SECONDS);
  ```
  + 和 `CachedThreadPool` 类似，参数设定 corePoolSize 为创建时的传入参数，maxPoolSize 为 Integer.MAX_VALUE 来允许任意多任务并发操作。

+ `FixedThreadPool`
  + 大队列小池（传入数目）
  + 所有线程都为核心线程
  + 降低服务器的并发压力
  ``` java
  ExecutorService executorService = Executors.newFixedThreadPool(5);
  ```
  + 在源码中使用 ThreadPoolExecutor 创建线程池，参数设定 corePoolSize 与 maxPoolSize 相同，都为创建 FixedThreadPool 时的参数，以次创建固定大小的线程池。因为不会有超出 corePoolSize 的线程，所以 keepAliveTime 为 0L. 最后使用 LinkedBlockingQueue 来充当任务队列，所有超出线程数量的任务都会被放在这个无界队列中。  
  + 因为 LinkedBlockingQueue 没有容量上线，所以当请求数量越来越多且无法及时处理完毕时（请求堆积），会造成占用大量内存而报 OOM 错误。  

+ `SingleThreadExecutor`  
  + 类似 `FixedThreadPool`，源码使用 ThreadPoolExecutor 创建线程池，参数设定 corePoolSize 与 maxPoolSize 相同，都为 1,  keepAliveTime 为 0L, 使用 LinkedBlockingQueue 来充当任务队列。  
  + 
+ `ForkJoinPool`
  + 分叉合并（不推荐使用）

+ `WorkStealingPool` <Badge text="Java 1.8+"/>  
  + 适用于有子任务的情况(如二叉树遍历、处理矩阵的子矩阵等情况)  
  + 线程之间可以窃取资源来提升并行能力，但不保证执行顺序
  + 要求线程没有锁；线程执行顺序不被保证

|线程池|corePoolSize|maxpoolSize|keepAliveTime|workQueue|
|:--:|:--:|:--:|:--:|:--:|
|FixedThreadPool|参数列表接收|与 corePoolSize 相同|0s|LinkedBlockingQueue（无界队列）|
|SingleThreadExecutor|1|1|0s|LinkedBlockingQueue（无界队列）|
|CachedThreadPool|0|Integer.MAX_VALUE|60s|SynchronousQueue（直接交换简单队列）|
|ScheduledThreadPool|参数列表接收|Integer.MAX_VALUE|0s|DelayedWorkQueue（优先队列）|
:::

::: tip Callable 接口
**基本信息**  
`public interface Callable<V>`   

+ 泛型表示线程执行后的返回值结果
+ `Callable`只能交给线程池处理

**实例代码**  
``` java
class CallableDemo implements Callable<String> {
   @Override
   public String call() {
      for (int i = 0; i < 10; i++) {
         System.out.println(i);
      }
      return "SUCCESS";
   }
}
```
:::

::: warning 关于创建线程池
一般来讲，更推荐手动创建线程池。创建时可以参考以下启发规则：  
+ 当任务是 CPU 密集型的（如加密、Hash 计算等），线程数量设置为 CPU 核心数的 1 到 2 倍。
+ 当任务是耗时 IO 型的（如读写数据库、文件、网络等），线程数应大于 CPU 核心数多倍。以 JVM 线程监控显示最繁忙的情况为依据，保证线程空闲可以衔接。具体计算方法：线程数 = CPU 核心数 * (1 + 平均等待时间 / 平均工作时间)  

在使用线程池时需要注意：  
+ 避免任务堆积
+ 避免线程数过度增加
+ 排查是否发生线程泄漏（无法回收的线程）
:::

**线程池的结束方法**  
+ `shutdown()`  
  + 执行后对新来任务拒绝，等待当前和队列中所有任务执行完毕后终止线程池。
  + 使用 `isShutdown()` 判断当前是否进入了 shutdown 状态。
  + 使用 `isTerminated()` 判断当前是否所有线程任务都已完成。
  ``` java
  public class ShutDown {
      public static void main (String[] args) {
          ExecutorService executorService = Executors.newFixedThreadPool(10);
          for (int i = 0; i < 1000; i++) {
              executorService.execute(new ShutDownTask());
          }
          Thread.sleep(1500);

          executorService.shutdown();

          // 提交新任务会被拒绝
          executorService.execute(new ShutDownTask());
      }
  }

  class ShutDownTask implements Runnable {
      @Override
      public void run() {
          try {
              Thread.sleep(500);
              System.out.println(Thread.currentThread().getName());
          } catch (InterruptedException e) {
              e.printStackTrace();
          }
      }
  }
  ```
+ `awaitTermination()`  
  + 开始后进入阻塞状态（线程继续运行），检测时间内线程池任务是否会完全终止并返回结果。传入参数：中止时间，时间单位。
+ `shutdownNow()`  
  + 立刻关闭线程池。线程中的线程获取到了 interrupted 信号，队列中的任务返回为 runnableList （返回值）.

**线程池拒绝任务**  
+ Executor 关闭后，新任务会被拒绝。（例如在 `shutdown()` 执行后）  
+ Executor 在线程已经达到 maxPoolSize 且任务队列已满时，新任务会被拒绝。  

拒绝策略：  
+ AbortPolicy：直接抛出异常
+ DiscardPolicy：静默丢弃
+ DiscardOldestPolicy：新任务到来时，丢弃存在时间最久的任务
+ CallerRunsPolicy：让提交任务的线程自己执行任务，可以避免业务损失，提供负反馈以降低线程池压力

**钩子方法**  
利用钩子函数可以在任务之前前后设定特定的逻辑（例如生成日志或者进行统计等）。  
自定义的可暂停线程池：  
``` java
import java.util.concurrent.*;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

public class PauseableThreadPool extends ThreadPoolExecutor {
    // 标记位
    private boolean isPaused;
    // 上锁来保证对标记位的并发修改线程安全
    private final ReentrantLock lock = new ReentrantLock();
    // 新建锁状态
    private Condition unpaused = lock.newCondition();

    public PauseableThreadPool(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, BlockingQueue<Runnable> workQueue) {
        super(corePoolSize, maximumPoolSize, keepAliveTime, unit, workQueue);
    }

    public PauseableThreadPool(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, BlockingQueue<Runnable> workQueue, ThreadFactory threadFactory) {
        super(corePoolSize, maximumPoolSize, keepAliveTime, unit, workQueue, threadFactory);
    }

    public PauseableThreadPool(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, BlockingQueue<Runnable> workQueue, RejectedExecutionHandler handler) {
        super(corePoolSize, maximumPoolSize, keepAliveTime, unit, workQueue, handler);
    }

    public PauseableThreadPool(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, BlockingQueue<Runnable> workQueue, ThreadFactory threadFactory, RejectedExecutionHandler handler) {
        super(corePoolSize, maximumPoolSize, keepAliveTime, unit, workQueue, threadFactory, handler);
    }

    // 暂停方法
    private void pause() {
        lock.lock();
        try {
            isPaused = true;
        } finally {
            lock.unlock();
        }
    }

    // 恢复方法
    private void resume() {
        lock.lock();
        try {
            isPaused = false;
            unpaused.signalAll();
        } finally {
            lock.unlock();
        }
    }

    // 钩子方法
    @Override
    protected void beforeExecute(Thread t, Runnable r) {
        super.beforeExecute(t, r);
        lock.lock();
        try {
            while (isPaused) {
                // 休眠线程
                unpaused.await();
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            lock.unlock();
        }
    }

    public static void main(String[] args) throws InterruptedException {
        // 创建自定义可暂停线程池实例
        PauseableThreadPool pauseableThreadPool = new PauseableThreadPool(10, 20, 10L, TimeUnit.SECONDS, new LinkedBlockingQueue<>());

        // 任务
        Runnable runnable = new Runnable() {
            @Override
            public void run() {
                System.out.println("执行");
                try {
                    Thread.sleep(10);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        };
        
        // 使用线程池
        for (int i = 0; i < 10_000; i++) {
            pauseableThreadPool.execute(runnable);
        }

        // 暂停
        Thread.sleep(1500);
        pauseableThreadPool.pause();
        System.out.println("线程池暂停");

        // 恢复
        Thread.sleep(1500);
        pauseableThreadPool.resume();
        System.out.println("线程池恢复");
    }
}
```
**实现原理**  
线程池组成：  
+ 线程池管理器：管理线程池的创建销毁等
+ 工作线程：具体处理任务的线程
+ 任务队列：存放线程的队列
+ 任务接口（Task）：具体执行的任务

**线程复用原理**  
``` java {3,22}
final void runWorker(Worker w) {
   Thread wt = Thread.currentThread();
   Runnable task = w.firstTask;
   w.firstTask = null;
   w.unlock(); // allow interrupts
   boolean completedAbruptly = true;
   try {
      while (task != null || (task = getTask()) != null) {
            w.lock();
            // If pool is stopping, ensure thread is interrupted;
            // if not, ensure thread is not interrupted.  This
            // requires a recheck in second case to deal with
            // shutdownNow race while clearing interrupt
            if ((runStateAtLeast(ctl.get(), STOP) ||
               (Thread.interrupted() &&
                  runStateAtLeast(ctl.get(), STOP))) &&
               !wt.isInterrupted())
               wt.interrupt();
            try {
               beforeExecute(wt, task);
               try {
                  task.run();
                  afterExecute(task, null);
               } catch (Throwable ex) {
                  afterExecute(task, ex);
                  throw ex;
               }
            } finally {
               task = null;
               w.completedTasks++;
               w.unlock();
            }
      }
      completedAbruptly = false;
   } finally {
      processWorkerExit(w, completedAbruptly);
   }
}
```
工作线程会不断从队列中拿到 task，之后通过 `run()` 来执行。这样以来，相同的线程就可以执行不同的任务。  

**线程池状态** 
+ RUNNING：接收新任务，排队处理任务
+ SHUTDOWN：不接受新任务，排队处理任务
+ STOP：不接受新任务，不处理排队任务，中断正在进行任务
+ TIDYING：所有任务已完成，即将运行 `terminate()` 钩子方法
+ TERMINATED：`terminate()` 运行完成

### `Lock`接口
**基本信息**  
**Package** java.util.concurrent.locks  

`public interface Lock`  

用于控制对共享资源的访问。通常情况下 `Lock` 仅允许一个线程来访问共享资源，但也有一些特殊的实现类允许并发访问。  
`Lock` 加解锁和 `synchronized` 有相同的内存语义，下一个线程加锁后可以看到前一个线程解锁前所有操作。  
由于 `synchronized` 具有以下缺点，我们需要 `Lock` 来强化功能：  
+ 效率低。锁释放情况少，获得锁不能设置超时或者中断。  
+ 不够灵活。加减锁的时机单一，每个锁只有单一条件。  
+ 无法知道是否成功获取到了锁。  

**分类**  
根据线程是否锁住同步资源可以分为：  
+ 悲观锁、互斥同步锁（锁）  
  + 缺点：阻塞和唤醒带来性能劣势；可能造成永久阻塞；可能造成优先级反转。  
  + 优点：就算临界区持锁时间越来越差，对锁的开销影响不大
  + 认为如果不对资源进行上锁，就可能会有其他线程争抢而造成数据错误。所以每次获取和修改数据时都先把资源锁住。  
  + 适合并发写入多的情况；临界区持锁时间长的情况。例如：临界区有 IO 操作；临界区代码复杂循环量大；临界区竞争激烈。    
  + 例子：`synchronized` `Lock`  
+ 乐观锁、非互斥同步锁（不锁）  
  + 缺点：如果自旋时间长或者不停重试，会造成消耗的资源越来越多。  
  + 认为在线程处理数据时不会有其他线程干扰而不提前对资源锁定。在更新数据时对比修改期间是否有其他线程改动，如果没有则正常操作；如果发现数据不一致则选择放弃、报错、重试等策略。  
  + 一般利用 CAS 算法实现。  
  + 适合并发写入少，大部分操作是读取的场景。不加锁可以让读的性能大幅提高。  
  + 例子：原子类、并发容器  

根据多线程能否公用一把锁可以分为：  
+ 共享锁（可）  
+ 独占锁（不可）  

根据多线程竞争是否需要排队可以分为：  
+ 公平锁（排队）  
  优点：每个线程公平处理，在等待一段时间后总有执行机会。  
  缺点：慢，吞吐量小。  
+ 非公平锁（先插队，失败再排队）  
  优点：避免唤醒期间的空档期而提高效率。  
  缺点：可能产生线程饥饿（长时间内始终得不到执行）。  

根据同一个线程是否可以重复获得同一把锁可以分为：  
+ 可重入锁  
  + 优点：避免死锁；提高封装性。  
+ 不可重入锁  

根据是否可以中断可分为：  
+ 可中断锁  
+ 非可中断锁  

根据等待锁的过程可以分为：  
+ 自旋锁（自旋）  
  当同步代码内容简单，线程状态转换时间开销比代码执行时间还要长，设计出自旋锁。  
  让线程状态不变的前提下进行自旋，如果自旋完成后之前锁定的资源已经释放锁，则不必切换状态直接获取资源，避免了切换线程状态的开销。  
  缺点：如果锁被占用时间过长，自旋线程会浪费处理器资源。虽然自旋开销低于悲观锁，但随着自旋时间的增增长开销也线性增长。  
  适用于多核处理器的服务器，并发程度不是特别高，临界区小。  
+ 非自旋锁（阻塞）  
  在没有拿到锁的情况下直接阻塞线程。  

**重要方法**  
+ `lock()`  
  获取锁。如果锁被其他线程获取则等待。  
  它不会在遇到异常时自动释放锁，所以我们一般要求在上锁后把业务用 `try-finally` 包裹，并在 `finally` 中释放锁。  
  `lock()` 不能被中断，如果死锁发生则可能永久等待。  
+ `tryLock()`  
  尝试获取锁，如果当前锁没有被其他线程占用则成功获取，返回 `true`，否则返回 `false`.  
  可以根据是否能获取到锁来决定后续程序行为。  
  方法会立刻返回，不会在拿不到锁时等待（无视公平策略）。  
+ `tryLock(long time, TimeUnit unit)`  
  带有超时时间的 `tryLock()`. 在等待设定时间内拿不到锁则放弃。  
+ `lockInterruptibly()`  
  相当于等待时间无限长的 `tryLock()`, 但是它可以被中断。  
+ `unlock()`  
  解锁。  

**具体实现类**  
`ReentrantLock` 类  
+ 默认为非公平策略，可设置为公平策略
+ 互斥锁、可重入锁、可中断锁
+ 类似 `synchronized` 机制，但更加灵活  
+ 利用 AQS 算法实现  
+ `isHeldByCurrentThread()` 查看锁是否被当前线程持有  
+ `getQueueLength()` 返回正在等待当前锁的队列长度  
    
`ReentrantReadWriteLock` 类
+ 使用时允许多个线程同时使用统一资源，但只允许一个线程对资源进行写操作  
+ 读期间不允许进行写操作，写期间不允许进行读操作  
+ 读锁为共享锁，写锁为独享锁  
+ 适用于读多写少的场景  
+ 插队策略  
  设置公平策略：`private static ReentrantReadWriteLock reentrantReadWriteLock = new ReentrantReadWriteLock(true);`  
  不公平策略避免解饿：写锁可以随时尝试插队。读线程可以插队，但需要在等待队列头结点的线程不是写线程时可以插队。  
+ 升降级策略  
  支持降级但不支持升级。若支持升级容易操作死锁，因为假设两个写线程想升级，都需要对方先释放锁，造成死锁。  
``` java
private static ReentrantReadWriteLock reentrantReadWriteLock = new ReentrantReadWriteLock();
private static ReentrantReadWriteLock.readLock = reentrantReadWriteLock.readLock();
private static ReentrantReadWriteLock.writeLock = reentrantReadWriteLock.writeLock();
```

**锁优化**  
JVM 对锁进行了优化：  
+ 自旋锁的自适应：在自旋尝试一段时间后自动转为阻塞所来防止资源消耗过大。  
+ 锁消除：对于无需加锁但是加锁的场景，消除掉锁。  
+ 锁粗化：频繁对一些资源加锁解锁时，合并相邻的操作进入一个锁中。  

使用锁时的启发规则：  
+ 缩小同步代码块
+ 尽量不要锁定方法
+ 减少锁使用次数
+ 避免人为制造热点数据
+ 避免锁中包含锁
+ 选择适合的锁和工具类

### `atomic`包
**基本信息**  
**Package** java.util.concurrent.atomic  

保证一个或一组不可分割的操作的线程安全。相比锁的粒度更细，效率更高。  

**分类**  
+ 基本类型原子类
  + `AtomicInteger`
  + `AtomicLong`
  + `AtomicBoolean`
+ 数组类型原子类
  + `AtomicIntegerArray`
  + `AtomicLongArray`
  + `AtomicReferenceArray`
+ 引用类型原子类
  + `AtomicReference`
  + `AtomicStampedReference`
  + `AtomicMarkableReference`
+ 升级类型原子类
  + `AtomicIntegerFieldUpdater`
  + `AtomicLongFieldUpdater`
  + `AtomicReferenceFieldUpdater`
+ Adder 累加器
  + `LongAdder`
  + `DoubleAdder`
+ Accumulator 累加器
  + `LongAccumulator`
  + `DoubleAccumulator`

**`AtomicInteger` 类**  
基于 CAS 的原子类，是对 `Integer` 的封装，可以提供一些原子操作。

*重要方法*
+ `get()` 获取当前值  
+ `getAndSet(int newValue)` 获取当前值并赋新值  
+ `getAndIncrement()`  获取当前值并自增  
+ `getAndDecrement()` 获取当前值并自减  
+ `getAndAdd(int delta)` 获取当前值并加上预期值  
+ `compareAndSet(int expect, int update)`  若当前值与预期值相同则更新，否则不操作  

``` java
public class Main implements Runnable {
    private static final AtomicInteger atomicInteger = new AtomicInteger();

    public void incrementAtomic() {
        atomicInteger.getAndIncrement();
    }

    private static volatile int basicCount = 0;

    public void incrementBasic() {
        basicCount++;
    }

    @Override
    public void run() {
        for (int i = 0; i < 10000; i++) {
            incrementAtomic();
            incrementBasic();
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Main main = new Main();

        Thread thread1 = new Thread(main);
        Thread thread2 = new Thread(main);

        thread1.start();
        thread2.start();

        thread1.join();
        thread2.join();

        System.out.println("原子结果：" + atomicInteger.get());
        System.out.println("普通结果：" + basicCount);
    }
}
```
在多线程情况下，普通 `int` 变量的自增操作不具备线程安全性，需要额外处理。而原子类可以保证原子性，从而让结果为准确的 `20000`.  

**`AtomicIntegerArray` 类**  
用法与基本类型原子类类似。  

``` java
public class Main {
    public static void main(String[] args) {
        // 新建长度为 1000 的原子数组
        AtomicIntegerArray atomicIntegerArray = new AtomicIntegerArray(1000);

        // 实例化自增自减类
        Increment increment = new Increment(atomicIntegerArray);
        Decrement decrement = new Decrement(atomicIntegerArray);

        // 生成 200 个线程
        Thread[] threadsInc = new Thread[100];
        Thread[] threadsDec = new Thread[100];

        // 每个线程对每一个数组元素自增自减
        for (int i = 0; i < 100; i++) {
            threadsDec[i] = new Thread(increment);
            threadsInc[i] = new Thread(decrement);

            threadsInc[i].start();
            threadsDec[i].start();
        }

        // 主线程等待自增自减完成
        for (int i = 0; i < 100; i++) {
            try {
                threadsInc[i].join();
                threadsDec[i].join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        // 测试结果
        for (int i = 0; i < atomicIntegerArray.length(); i++) {
            if (atomicIntegerArray.get(i) != 0) {
                System.out.println("发现错误");
            }
        }

        System.out.println("结束");
    }
}

// 原子数组每个元素自减类
class Decrement implements Runnable {
    private AtomicIntegerArray array;

    public Decrement(AtomicIntegerArray array) {
        this.array = array;
    }

    @Override
    public void run() {
        for (int i = 0; i < array.length(); i++) {
            array.getAndDecrement(i);
        }
    }
}

// 原子数组每个元素自增类
class Increment implements Runnable {
    private AtomicIntegerArray array;

    public Increment(AtomicIntegerArray array) {
        this.array = array;
    }

    @Override
    public void run() {
        for (int i = 0; i < array.length(); i++) {
            array.getAndIncrement(i);
        }
    }
}
```

`AtomicReference<T>` 类  
保证对象的原子性，用法与基本类型原子类类似。  

*重要方法*  
+ `get()` 获取当前值  
+ `getAndSet(int newValue)` 获取当前值并赋新值  
+ `compareAndSet(int expect, int update)`  若当前值与预期值相同则更新，否则不操作  

`AtomicIntegerFieldUpdater` 类  
将普通变量升级为原子变量。  

适用场景：  
+ 如果已经经常需要并发操作的 `int` 变量无法被直接修改成原子类型变量
+ 偶尔需要对 `int` 变量使用原子类型的 `get()` `set()` 操作 

注意点：  
+ 保证可见性。底层用反射实现  
+ 变量不可以被 `static` 修饰  

``` java
public class Main2 implements Runnable{
    public static class Candidate {
        volatile int score;
    }

    static Candidate Alice;
    static Candidate Bob;

    // 实例化 Updater，传入 Class 对象和变量名
    public static AtomicIntegerFieldUpdater<Candidate> scoreUpdater = AtomicIntegerFieldUpdater.newUpdater(Candidate.class, "score");

    @Override
    public void run() {
        for (int i = 0; i < 10000; i++) {
            // 普通类型自增
            Alice.score++;

            // 升级类型自增
            scoreUpdater.getAndIncrement(Bob);
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Alice = new Candidate();
        Bob = new Candidate();

        Main2 main2 = new Main2();

        Thread thread1 = new Thread(main2);
        Thread thread2 = new Thread(main2);

        thread1.start();
        thread2.start();

        thread1.join();
        thread2.join();

        System.out.println("普通变量：" + Alice.score);
        System.out.println("升级后的变量：" + Bob.score);
    }
}
```

**`LongAdder` 类**<Badge text="Java 8.0+"/>  
+ 相对 `AtomicLong` 效率更高，底层是空间换时间的算法。在竞争激烈时，它把不同的线程对应到不同的 Cell 中进行修改，以此降低冲突概率。体现了多段锁的思想，提高了并发性。  
+ `AtomicLong` 在每次加法操作时都需要进行 flush 和 refresh 操作：在多核工作情况下，一个线程的新结果先会被 flush 到共享内存中，再 refresh 到其他线程共享结果。造成时间消耗。  
而 `LongAdder` 每个线程都有自己的计数器，线程内独立计数不受其他线程干扰。具体而言：  
引入分段累加概念，内部使用一个 `base` 变量和一个 `Cell[]` 来参与计数。在竞争不激烈时，直接在 `base` 变量上累加。而竞争激烈时，各个线程分散累加到自己槽道的 `Cell[i]` 中，最后统计 `base` 和 `Cell[]` 中的所有结果。  
但是最终求和 `sum()` 没有保证线程安全，所以可能在统计时又发生新的变化，这样新变化无法体现在结果中。  
+ 更适合与统计求和的场景。  

**`LongAccumulator` 类**  
适合于大量计算且可以并行计算（要求计算顺序不影响结果）的场景。  
``` java
public class Main {
    public static void main(String[] args) {
        // x 为初始值, y 为下一值，通过初始值和下一值计算和
        LongAccumulator longAccumulator = new LongAccumulator(Long::sum, 0);

        // 建立线程池
        ExecutorService executorService = Executors.newFixedThreadPool(8);

        // 使用流操作和 accumulator 累加 1-9
        IntStream.range(1, 10).forEach(i -> executorService.submit(()-> longAccumulator.accumulate(i)));

        // 等待线程结束
        executorService.shutdown();
        while (!executorService.isTerminated()){}

        // 打印结果
        System.out.println(longAccumulator.getThenReset());
    }
}
```

### Callable接口
**基本信息**  
**Package** java.util.concurrent

`Interface Callable<v>`

克服了 `Runnable` 接口没有返回值，不能抛出可检查异常的特点。  
类似于 `Runnable`, 是一个可以被其他线程执行的任务，其中包含了 `call()` 描述具体逻辑，它是有返回值且抛出异常的。  

### Future接口
**基本信息**  
**Package** java.util.concurrent

`Interface Future<v>`

当方法计算耗时的情况下，可以创建子线程来完成具体工作，期间主线程可以继续其他任务。直到需要获取结果时，再利用 `Future` 来拿到结果。  
可以利用 `Future.get()` 来获取 `Callable` 返回的执行结果；可以通过 `Future.isDone()` 来执行判断任务是否执行完毕、取消、获取任务结果等操作。  
但是如果在 `call()` 没有执行完毕时调用 `Future.get()`, 主线程会被阻塞，直到 `call()` 返回结果后才能拿到结果，此后主线程切换到可执行状态。  
`Future` 可以认为是一个存储器，它存储了 `call()` 的结果。这个任务执行时间无法提前确定，完全取决于 `call()` 的执行情况。  

::: warning 注意
+ 当使用 `for` 批量获取 `Future` 时，容易发生一部分线程慢， `get()` 调用时就应当用 `timeout` 限制或使用 `CompletableFuture`.
+ `Future` 的生命周期不能后退。一旦任务处于已完成状态则不能重头再来。  
:::

**重要方法**  
+ `get()`  
  获取 `Callable` 任务的状态，有五种情况：  
  1. 任务正常完成，立即返回结果。  
  2. 任务尚未完成，处于还未开始或进行中的状态。将阻塞直到任务完成。  
  3. 任务执行过程中抛出异常  
     `get()` 会抛出 `ExecutionException`. 是 `call()` 执行时产生的异常。不论 `call()` 抛出的异常是什么类型，最后 `get()` 抛出的异常都会是 `ExecutionException`.  
     程序不会在一产生异常的时候就抛出，而是会等到 `get()` 执行的时候。  
  4. 任务被取消，抛出 `CancellationException`.  
  5. 任务超时，当使用的是带有超时参数的 `get(long timeout, TimeUnit unit)` 时，在等待时间到了还没有获取到结果，就抛出 `TimeoutException`.  
+ `cancel(boolean)`  
  取消任务执行。参数表示是否中断正在执行的任务。传入 `true` 用于业务逻辑能够正常处理中断。传入 `false` 可以适用于未能正确处理中断的业务逻辑；不清楚任务是否支持取消；需要等待已经开始的任务完成；避免尚未开始的任务被启动。  
  包括三种情形：  
  + 任务还没有开始。任务被正常取消，之后也不会执行，返回 `true`.  
  + 任务已经完成或已经取消。`cancel()` 执行失败，返回 `false`.  
  + 任务已经开始执行。不会直接取消该任务，根据填写参数做判断：如果传入 `true` 则任务收到中断信号；若传入 `false` 继续等待任务完成。
+ `isDone()`  
  判断线程是否执行完毕。  
+ `isCancelled()`  
  判断任务是否被取消。  

**使用方法**  
*用法一：线程池 `submit()` 返回 `Future` 对象*  
  向线程池提交任务的同时立即返回一个空的 `Future` 容器，当任务执行完毕时，线程池会把该结果填入容器。可以利用之前的 `Future` 对象来获取到任务的执行结果。  
  ``` java
  public class Main {
      public static void main(String[] args) {
          ExecutorService service = Executors.newFixedThreadPool(10);
          Future<Integer> future = service.submit(new CallableTask());
          try {
              System.out.println(future.get());
          } catch (InterruptedException | ExecutionException e) {
              throw new RuntimeException(e);
          }
          service.shutdown();
      }

      static class CallableTask implements Callable<Integer> {
          @Override
          public Integer call() throws Exception {
              Thread.sleep(3000);
              return new Random().nextInt();
          }
      }
  }
  ```
  Lambda 表达式形式为：  
  ``` java
  public class Main {
      public static void main(String[] args) {
          ExecutorService service = Executors.newFixedThreadPool(10);
          Callable<Integer> callable = () -> {
              Thread.sleep(3000);
              return new Random().nextInt();
          };
          Future<Integer> future = service.submit(callable);
          try {
              System.out.println(future.get());
          } catch (InterruptedException | ExecutionException e) {
              throw new RuntimeException(e);
          }
          service.shutdown();
      }
  }
  ```

  批量提交任务，批量接收结果：  
  ``` java
  public class Main {
      public static void main(String[] args) {
          ExecutorService service = Executors.newFixedThreadPool(2);
          ArrayList<Future> futures = new ArrayList<>();  // 存储结果的 List

          for (int i = 0; i < 20; i++) {
              Future<Integer> future = service.submit(new CallableTask());
              futures.add(future);
          }

          for (int i = 0; i < 20; i++) {
              Future<Integer> future = futures.get(i);
              try {
                  Integer integer = future.get();
                  System.out.println(integer);
              } catch (InterruptedException | ExecutionException e) {
                  throw new RuntimeException(e);
              }
          }
      }

      static class CallableTask implements Callable<Integer> {
          @Override
          public Integer call() throws Exception {
              Thread.sleep(3000);
              return new Random().nextInt();
          }
      }
  }
  ```
  带有超时的 `get()` 方法：  
  ``` java
  public class Main {
      private static final Ad DEFAULT_AD = new Ad("默认广告");
      private static final ExecutorService exec = Executors.newFixedThreadPool(10);

      static class Ad {
          String name;

          public Ad(String name) {
              this.name = name;
          }

          @Override
          public String toString() {
              return "Ad{" +
                      "name='" + name + '\'' +
                      '}';
          }
      }

      static class FetchAdTask implements Callable<Ad> {
          @Override
          public Ad call() throws Exception {
              try {
                  Thread.sleep(3000);
              } catch (InterruptedException e) {
                  System.out.println("睡眠期间被中断");
                  return new Ad("被中断的默认广告");
              }
              return new Ad("在线广告");
          }
      }

      public void printAd() {
          Future<Ad> future = exec.submit(new FetchAdTask());
          Ad ad;
          try {
              ad = future.get(2000, TimeUnit.MILLISECONDS);
              System.out.println(ad);
          } catch (InterruptedException e) {
              ad =  new Ad("被中断的默认广告");
              System.out.println(ad);
          } catch (ExecutionException e) {
              ad =  new Ad("异常时的默认广告");
              System.out.println(ad);
          } catch (TimeoutException e) {
              ad = new Ad("超时的默认广告");
              System.out.println("超时，未获取到广告");
              boolean cancel = future.cancel(true);
              System.out.println("Cancel 结果: " + cancel);
              exec.shutdown();
              System.out.println(ad);
          }
      }

      public static void main(String[] args) {
          Main main = new Main4();
          main.printAd();
      }
  }
  ```

*用法二：使用 `FutureTask` 创建 `Future`* 
`FutureTask` 是一个包装器，可以把 `Callable` 和 `Future` 转换为 `Runnable`. 既可以作为 `Runnable` 被线程执行，也能作为 `Future` 获得 `Callable` 的返回值。 `FutureTask` 同时实现了 `Callable` 和 `Future` 接口。  
使用方法：把 `Callable` 实例当做参数生成 `FutureTask` 对象，之后把它当做 `Runnable` 对象，用线程池或线程执行，最后通过 `FutureTask` 获得结果。  
``` java
public class Main {
    public static void main(String[] args) {
        Task task = new Task();

        FutureTask<Integer> integerFutureTask = new FutureTask<>(task);

        // 使用线程
        Thread thread = new Thread(integerFutureTask);
        thread.start();

        // 获取结果
        try {
            System.out.println("Task 运行结果: " + integerFutureTask.get());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException(e);
        }
    }

    static class Task implements Callable<Integer> {
        @Override
        public Integer call() throws Exception {
            System.out.println("子线程正在计算");
            Thread.sleep(3000);
            int sum = 0;
            for (int i = 0; i < 100; i++) {
                sum += i;
            }
            return sum;
        }
    }
}
```