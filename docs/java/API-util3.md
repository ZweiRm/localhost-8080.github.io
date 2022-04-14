---
prev: ./API-util2
next: ./API-io
---

# API-工具类库 3 (Package `java.util`)
## 并发(续)
**基本信息**  
**Package** java.util.concurrent

### 5.9.6 `ConcurrentMap`接口
**基本信息**  
`public interface ConcurrentMap<K,​V>`  

**重要实现类/接口**  
1. `ConcurrentHashMap`类  
   + 映射底层依靠键值对存储数据，默认大小为 16
	+ 数组的每一个位置维系了一个链表，默认当元素大于 8 时，转为红黑树（根据泊松分布，得知链表长度为 8 是千万分之一）
	+ 经过一定位运算分布到 16 个桶中  
     当元素碰撞时，两元素键对比；若相同，则覆盖。不同则生成链。  
     每个桶独立设置了 `ReentrantLock` 来保证线程安全，每个桶互不影响，提高并发效率。  
     默认最高支持 16 个线程并发写。<Badge type="warning" text="Java 7.0"/>   
     在 Java 8 中将结构改为和 HashMap 类似的链表/红黑树结构，每个结点之间都互不影响。利用 CAS 和 synchronized 保证线程安全。  
   + 加载因子 `0.75f`  
     避免桶中元素太多影响效率，引入加载因子;  
     当达到一定规模，如使用到 $0.75*16=12$ 个桶以后时，则对桶的数量扩增。之后重新计算全部哈希码，重新排布（Rehash）
   + `putVal()` 流程  
     + 判断 key 是否为空
     + 计算哈希
     + 根据对应位置结点类型赋值：helpTransfer；增长链表；红黑树增加结点
     + 检查满足阈值则链表转为红黑树
     + 返回 oldVal
   + `get()` 流程
     + 计算哈希
     + 找到对应位置，根据结点情况：直接取值；红黑树中取值；遍历链表取值
     + 返回找到的结果
   + `replace()` 组合操作，满足了取值并放值组合操作的线程安全。  
   + `putIfAbsent()` 组合操作。满足了当前值不存在时存放元素组合操作的线程安全。  

2. `ConcurrentNavigableMap`接口  
   是一种并发导航映射  

   **重要实现类**  
   + `ConcurrentSkipListMap`类  
     跳跃表  

     **重要方法**  
     + `headMap(String key)`  
	    从头开始，截取到指定的键之前组成的子map
				
	  + `tailMap(String key)`  
		 从尾开始截取
					
	  + `subMap(String fromKey, String toKey)`  
		 范围截取

### 5.9.7 `BlockingQueue`接口
**基本信息**  
`public interface BlockingQueue<E>`  

有界的阻塞队列。可以指定容量。可以设定是否公平，若公平则保证等待最长时间的线程会被优先处理，可能会带来性能损耗。  
可以用于多线程的队列场景。例如生产者消费者情况，一端生产者存放数据，一端消费者拿走数据。

**重要实现类**  
1. `ArrayBlockingQueue`类  
   是基于数组且有界的阻塞队列。  

   **重要方法**  
   1. `add(object)`
      + 非阻塞
      + 底层调用`offer()`
      + 添加溢出抛异常`IllegalStateException: Queue full`  
          
   2. `offer(object)`  
      + 非阻塞
      + 添加溢出返回`false`
          
   3. `offer(object, timeout, TimeUnit.xxx)`  
      + `timeout`期间内一直尝试添加，若超时未添加成功则返回`false`
            
   4. `put(object)`  
      + 阻塞
      + 插入元素。若队列满无法插入则阻塞，直到队列中有新的空闲位置。  
            
   5. `remove(object)`  
      + 非阻塞
      + 队空，不报错
          
   6. `remove()`  
      + 非阻塞
      + 队空则抛异常 `NoSuchElementException`
  
   7. `element()`
      + 非阻塞
      + 返回队列头结点，若头为空抛出异常
            
   8. `poll()`  
      + 非阻塞
      + 队空返回 `null`
      + 取出元素并删除
            
   9. `poll(timeout, TimeUnit.xxx)`  
      + `timeout` 期间内一直尝试移除队首，若超时未添加成功则返回 `null`
          
   10. `peek()`
      + 非阻塞
      + 队空返回 `null`
      + 取出元素

   11. `take(object)`  
      + 阻塞
      + 获取并移除队列的头结点。若队列中无数据则阻塞，直到队列中有数据。
      
2. `LinkedBlockingQueue` 类
   链表形式的阻塞队列。长度无界。take 和 put 分别拥有一把锁来保证互相线程安全。

3. `PriorityBlockingQueue` 类  
   + 无界
   + 不允许元素为空
   + 支持优先级
   + 队列中元素对应的类必须实现 `Comparable` 接口  
     重写 `compareTo()` 来进行排序  
     + 自然排序，升序
	  + 不保证迭代遍历时的顺序
     + 保证逐个取出时的顺序

3. `SynchronousQueue` 类  
   + 容量为 0，直接交换用的数据结构
  
4. `DelayQueue` 类
   + 延迟队列，根据延迟时间排序
   + 元素需要实现 `Delayed` 接口，规定排序规则
   + 无界队列

5. `ConcurrentLinkedQueue` 类
   + 非阻塞队列
   + 使用 CAS 算法保证线程安全

### 5.9.8 `BlockingDeque`接口
**基本信息**  
`public interface BlockingDeque<E>`  

+ 双向队列
+ 继承自`BlockingQueue`


### 5.9.9 `CopyOnWriteArrayList`类
**基本信息**  
`public class CopyOnWriteArrayList<T>`  

用来代替 Vector 和 SynchronizedList, 提供一个在并发情形下的 List 集合。避免了效率低和迭代中无法编辑的缺点。  
适用于读快写慢的场景。例如：黑名单、每日更新、监听器等。  
创建新副本，读写分离。在写入时创建新的副本，结束后再更新引用。  
对于旧的容器是符合不可变原理的，保证线程安全。  
迭代过程中可以修改，但迭代过程中可能迭代的是过期的内容，取决于迭代器的创建时间。  

缺点：  
+ 数据不一致。可以保证最终的数据一致性，但不能保证实时的数据一致性。
+ 内存占用。进行写操作时，内存中会同时驻扎两个对象。

**读写规则**  
读取完全不加锁。写入不会阻塞读操作。只有写入与写入之间需要同步等待。  

**用法**  
+ 在迭代中修改数组内容。
  ``` java
  public static void main(String[] args) {
      CopyOnWriteArrayList<String> list = new CopyOnWriteArrayList<>();

      list.add("1");
      list.add("2");
      list.add("3");
      list.add("4");
      list.add("5");

      // 迭代器迭代
      Iterator<String> iterator = list.iterator();

      // 普通迭代
  //        while (iterator.hasNext()) {
  //            String next = iterator.next();
  //            System.out.println(next);
  //        }

        // 迭代中修改，但是迭代结果不受改动影响
      while (iterator.hasNext()) {
         String next = iterator.next();
         if (next.equals("2")) {
               list.remove("5");
         }
         System.out.println(next); // 迭代打印仍为 1-5
      }
  }
  ```


### 5.9.10 `CountDownLatch`类
**基本信息**  
`public class CountDownLatch`

+ 递减锁
+ 在构造时传入，线程执行之后 `await()`
+ 计数线程全部执行完成（进行 countdown 来递减）之后执行 `await()` 之后的代码
+ 适合于不同线程进行计数
+ 状态不可以重置，不能重置

**实例代码**  
一个线程等待多个线程都执行完毕再继续自己的工作。  
示例一：  
``` java
import java.util.concurrent.CountDownLatch;

public class CouuntDownLatchDemo {
   public static void main(String[] args) throws InterruptedException {
      CountDownLatch countDownLatch = new CountDownLatch(2);
      new Thread(new Teacher(countDownLatch)).start();
      new Thread(new Student(countDownLatch)).start();

      countDownLatch.await();

      System.out.println("上课");
   }
}

class Teacher implements Runnable {
   private CountDownLatch countDownLatch;

   public Teacher(CountDownLatch countDownLatch) {
      this.countDownLatch = countDownLatch;
   }

   @Override
   public void run() {
      System.out.println("老师进入教室");
      countDownLatch.countDown();
   }
}

class Student implement Runnable {
   private CountDownLatch countDownLatch;

   public Student(CountDownLatch countDownLatch) {
      this.countDownLatch = countDownLatch;
   }

   @Override
   public void run() {
      System.out.println("学生进入教室");
      countDownLatch.countDown();
   }
}
```

示例二：当五步质检都合格才通过。  
``` java
public class Main {
    public static void main(String[] args) throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(5);

        // 线程池
        ExecutorService service = Executors.newFixedThreadPool(5);
        for (int i = 0; i < 5; i++) {
            // 编号
            final int no = i + 1;

            // 子线程
            Runnable runnable = new Runnable() {
                @Override
                public void run() {
                    try {
                        Thread.sleep((long) (Math.random() * 10000));
                        System.out.println("No. " + no + "完成检查");
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    } finally {
                        latch.countDown();
                    }
                }
            };

            // 放入线程池
            service.submit(runnable);
        }

        // 检查
        System.out.println("等待检查……");
        latch.await();

        // 结果
        System.out.println("检查完毕，进入下一环节");
    }
}
```

多个线程等待一个线程的信号后同时开始执行。  
实例：模拟运动员等待发令后开始比赛。  
``` java
public class Main {
    public static void main(String[] args) throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(1);

        // 线程池
        ExecutorService service = Executors.newFixedThreadPool(5);
        for (int i = 0; i < 5; i++) {
            final int no = i + 1;
            Runnable runnable = new Runnable() {
                @Override
                public void run() {
                    System.out.println("No. " + no + "准备完毕，等待发令");
                    try {
                        latch.await();
                        System.out.println("No. " + no + "开始跑步");
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            };

            // 执行任务
            service.submit(runnable);
        }

        // 裁判进行准备工作
        Thread.sleep(5000);
        
        // 发令
        System.out.println("裁判准备完毕，发令");
        latch.countDown();
    }
}
```

结合多等一和一等多。  
示例：模拟运动员等待发令后开始比赛；所有运动员跑步完成后结束比赛。  
``` java
public class Main {
    public static void main(String[] args) throws InterruptedException {
        // 裁判倒计
        CountDownLatch begin = new CountDownLatch(1);
        // 运动员倒计
        CountDownLatch end = new CountDownLatch(5);

        // 线程池
        ExecutorService service = Executors.newFixedThreadPool(5);
        for (int i = 0; i < 5; i++) {
            final int no = i + 1;
            Runnable runnable = new Runnable() {
                @Override
                public void run() {
                    System.out.println("No. " + no + "准备完毕，等待发令");
                    try {
                        begin.await();
                        System.out.println("No. " + no + "开始跑步");

                        // 跑步过程
                        Thread.sleep((long) (Math.random() * 1000));
                        System.out.println("No. " + no + "已跑到终点");
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    } finally {
                        end.countDown();
                    }
                }
            };

            // 执行任务
            service.submit(runnable);
        }

        // 裁判进行准备工作
        Thread.sleep(5000);

        // 发令
        System.out.println("裁判准备完毕，发令");
        begin.countDown();

        // 等待跑步
        end.await();
        System.out.println("所有人到达终点，比赛结束");
    }
}
```

### 5.9.11 `CyclicBarrier`类
**基本信息**  
`public class CyclicBarrier`  

+ 栅栏
+ 在构造时传入，需要阻塞的地方 `await()`
+ 没 `await()` 时一次计数减少一次，直到减为 0 放开阻塞
+ 线程会等待，知道足够多的线程达到了规定的数量，当达到触发条件时进行下一步动作
+ 适合于同一线程类产生多个线程计数；线程之间相互等待处理结果就绪的场景

::: tip 与 <code>CountDownLatch</code> 的区别
+ 作用不同  
  `CyclicBarrier` 等到固定数量线程到达栅栏位才继续执行。而 `CountDownLatch` 等待数字为 0. `CyclicBarrier` 是基于线程的，`CountDownLatch` 是基于事件的。
+ 可重用性不同  
  `CountDownLatch` 在倒数到 0 后就无法重用。而 `CyclicBarrier` 可以重复使用。
:::

**实例一**  
``` java
import java.util.concurrent.CyclicBarrier;

public class CyclicBarrierDemo {
   public static void main(String[] args) {
      CyclicBarrier cyclicBarrier = new CyclicBarrier(3);
      new Thread(new Horse("1"), cyclicBarrier)).start();
      new Thread(new Horse("2"), cyclicBarrier)).start();
      new Thread(new Horse("3"), cyclicBarrier)).start();

      System.out.println("开始比赛");
   }
}

class Horse implements Runnable {
   private String name;
   private CyclicBarrier cyclicBarrier;

   public Horse(String name, CyclicBarrier cyclicBarrier) {
      this.name = name;
      this.cyclicBarrier = cyclicBarrier;
   }

   @Override
   public void run() {
      System.out.println(name + "走到出发点");
      try {
         cyclicBarrier.await();
      } catch (InterruptedException | BrokenBarrierException e) {
         e.printStackTrace();
      }
   }
}
```

**示例二** 
``` java
public class Main {
    public static void main(String[] args) {
        CyclicBarrier cyclicBarrier = new CyclicBarrier(5, new Runnable() {
            @Override
            public void run() {
                System.out.println("等待结束，开始执行");
            }
        });

        // 创建线程
        for (int i = 0; i < 10; i++) {  // CyclicBarrier 可以重用
            new Thread(new Task(i, cyclicBarrier)).start();
        }
    }

    static class Task implements Runnable {
        private int id;
        private CyclicBarrier cyclicBarrier;

        public Task(int id, CyclicBarrier cyclicBarrier) {
            this.id = id;
            this.cyclicBarrier = cyclicBarrier;
        }

        @Override
        public void run() {
            System.out.println("线程" + id + "正在准备");
            try {
                Thread.sleep((long) (Math.random() * 10000));
                System.out.println("线程" + id + "准备完毕，开始等待其他线程");
                cyclicBarrier.await();

                // 所有人等待结束，同时执行
                System.out.println("线程" + id + "开始执行");
            } catch (InterruptedException | BrokenBarrierException e) {
                e.printStackTrace();
            }
        }
    }
}
``` 

### 5.9.12 `Phaser`类
**基本信息**  
`public class Phaser`  

和 `CyclicBarrier` 类似，但是计数可变。  


### 5.9.13 `Semaphore`类
**基本信息**  
`public class Semaphore`  

+ 信号量
+ 用于限制某段代码在某个时间段内最多只能有规定线程书目进入访问。通过控制信号量来保证线程之间的配合。线程只有拿到信号量以后才能继续运行，比其他同步器更加灵活
+ 每个线程进入的时候需要进行 `acquire()` 操作，使得信号量 `-1`，直到为 `0`
+ 若有新的线程来访问则会在 `acquire()` 操作阻塞，直到之前的某线程 `release()`  
+ 使用流程：  
  + 初始化 Semaphore，指定信号量总额
  + 在需要执行的代码前调用 `acquire()` 或 `acquireUniterruptibly()`
  + 任务执行结束后，调用 `release()` 释放信号量

**重要方法**  
+ `Semaphore(int permits, boolean fair)`  
  构造方法，可以设置是否使用公平策略。若公平，则会把等待的线程放入到 FIFO 队列中，每次信号量会发给等待了最久的线程。  
+ `acquire()`  
  获取信号量，响应中断。可以指定获取信号量的数量。  
+ `acuireUniterruptbily()`  
  获取信号量，不响应中断。  
+ `tryAcquire()`  
  尝试立即获取信号量，若有则获取成功，若无不陷入阻塞，之后重新尝试。 
+ `tryAcquire(int timeout)`  
  尝试立即获取信号量，等待设定时间。若时间内获取不到则继续其他任务。  
+ `release()`  
  归还信号量。可以指定释放信号量的数量。  

::: warning 注意
+ 我们一般要求获取和释放的信号量数目一致，否则会导致程序卡死。  
+ 不强制要求获取与释放信号量的是同一个线程。任务可以跨线程/线程池进行。  
+ 可以用作条件等待。即线程 1 需要在线程 2 准备好之后在工作，此时设定线程 1 进行 `acquire()` 而线程 2 `release()`，相当于一个轻量级的 `CountDownLatch`.  
:::

**示例一**  
``` java
import java.util.concurrent.Semaphore;

public class SemaphoreDemo {
   public static void main(String[] args) {
      Semaphore semaphore = new Semaphore(5);

      for (int i = 0; i < 10; i++) {
         new Thread(new FileWatching(semaphore)).start();
      }
   }
}

class FileWatching implements Runnable {
   private Semaphore semaphore;

   public FileWatching(Semaphore semaphore) {
      this.semaphore = semaphore;
   }

   @Override
   public void run() {
      String name = Thread.currentThread().getName();
      try {
         semaphore.acquire(); // 信号量 -1
         System.out.println(name + "领取到了眼镜开始观影");
         Thread.sleep(5000);
      } catch (InterruptedException e) {
         e.printStackTrace();
      }

      System.out.println(name + "归还眼镜，离开了影院");
      semaphore.release(); // 信号量 +1
   }
}
```

**示例二**   
``` java
public class Main {
    static Semaphore semaphore = new Semaphore(3, true);

    public static void main(String[] args) {
        // 建立线程池
        ExecutorService service = Executors.newFixedThreadPool(50);
        for (int i = 0; i < 100; i++) {
            service.submit(new Task());
        }
        service.shutdown();
    }

    // 任务静态内部类
    static class Task implements Runnable {
        @Override
        public void run() {
            // 获取信号量
            try {
                semaphore.acquire();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            // 模拟执行任务
            System.out.println(Thread.currentThread().getName() + "拿到信号量");
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            // 释放信号量
            System.out.println(Thread.currentThread().getName() + "释放信号量");
            semaphore.release();
        }
    }
}
```


### 5.9.14 `Exchanger`类
**基本信息**  
`public class Exchanger<V>`

+ 交换机
+ 用于在合适的时机交换两个线程的信息，例如两个线程工作在同一个类的不同实例上时的数据交换

**实例代码**  
``` java
import java.util.concurrent.Exchanger;

public class ExchangerDemo {
   public static void main(String[] args) {
      Exchanger<String> exchanger = new Exchanger<>();
      new Thread(new SpyA(exchanger)).start();
      new Thread(new SpyB(exchanger)).start();
   }
}

class SpyA implements Runnable {
   private Exchanger<String> exchanger;

   public SpyA(Exchanger<String> exchanger) {
      this.exchanger = exchanger;
   }

   @Override
   public void run() {
      String msg = "M1";
      try {
         String exchange = exchanger.exchange(msg);
         System.out.println("SpyA 收到 SpyB 的信息：" + exchange);
      } catch (InterruputedException e) {
         e.printStackTrace();
      }
   }
}

class SpyB implements Runnable {
   private Exchanger<String> exchanger;

   public SpyB(Exchanger<String> exchanger) {
      this.exchanger = exchanger;
   }

   @Override
   public void run() {
      String msg = "M2";
      try {
         String exchange = exchanger.exchange(msg);
         System.out.println("SpyB 收到 SpyA 的信息：" + exchange);
      } catch (InterruputedException e) {
         e.printStackTrace();
      }
   }
}
```

### 5.9.15 `Condition`接口
**基本信息**  
**Package** java.util.concurrent.locks  
`public interface Condition`  

+ 可以控制线程的等待和唤醒，是 `Object.wait()` 的升级版。  
+ 当线程 1 需要等待某个条件时，执行 `condition.await()` 并进入阻塞状态。  
线程 2 执行对应的条件，当条件达成后，线程 2 执行 `condition.signal()`. 此时 JVM 将等待该 condition 的线程变为可执行状态。  
+ `signal()` 是公平策略，会唤醒等待时间最长的线程。`signalAll()` 唤醒所有线程。  
+ 与锁联用。  

**示例一**  
``` java
public class Main {
    private ReentrantLock lock = new ReentrantLock();
    private Condition condition = lock.newCondition();

    void method1() throws InterruptedException {
        lock.lock();
        try {
            // 条件不满足
            System.out.println("条件不满足，开始等待");
            condition.await();

            // 条件满足
            System.out.println("条件满足，开始执行后续任务");
        } finally {
            lock.unlock();
        }
    }

    void method2() {
        lock.lock();
        try {
            // 准备完成
            System.out.println("准备完成，唤醒其他线程");
            condition.signal();
        } finally {
            lock.unlock();
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Main main = new Main();
        // 子线程唤醒
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    Thread.sleep(1000);
                    main.method2();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }).start();

        // 主线程等待
        main.method1();
    }
}
```

**示例二**  
生产者消费者模式。  
``` java
public class ProducerConsumer {
    // 建立队列
    private int queueSize = 10;
    private PriorityQueue<Integer> queue = new PriorityQueue<>(queueSize);

    // 建立锁
    private Lock lock = new ReentrantLock();

    // 建立条件
    private Condition notFull = lock.newCondition();
    private Condition notEmpty = lock.newCondition();

    class Consumer extends Thread {
        @Override
        public void run() {
            consume();
        }

        private void consume() {
            while (true) {
                lock.lock();
                try {
                    // 队空，等待生产者
                    while (queue.size() == 0) {
                        System.out.println("队列空，等待数据添加");
                        try {
                            notEmpty.await();
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }

                    // 队不空，唤起消费者
                    queue.poll();
                    notFull.signalAll();
                    System.out.println("从队列中取走一个元素，剩余" + queue.size() + "个元素");
                } finally {
                    lock.unlock();
                }
            }
        }
    }

    class Producer extends Thread {
        @Override
        public void run() {
            produce();
        }

        private void produce() {
            while (true) {
                lock.lock();
                try {
                    // 队满，等待消费者
                    while (queue.size() == queueSize) {
                        System.out.println("队列满，等待队列空余");
                        try {
                            notFull.await();
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }

                    // 队空，唤起生产者
                    queue.offer(1);
                    notEmpty.signalAll();
                    System.out.println("向队列中添加一个元素，剩余" + (queueSize - queue.size()) + "个位置");
                } finally {
                    lock.unlock();
                }
            }
        }
    }

    public static void main(String[] args) {
        ProducerConsumer producerConsumer = new ProducerConsumer();
        Consumer consumer = producerConsumer.new Consumer();
        Producer producer = producerConsumer.new Producer();
        producer.start();
        consumer.start();
    }
}
```

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
