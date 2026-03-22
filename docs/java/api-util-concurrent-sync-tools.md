---
prev:
    text: '并发容器'
    link: 'java/api-util-concurrent-containers'
next:
    text: 'CAS 与 AQS'
    link: 'java/api-util-concurrent-cas-aqs'
---

# 同步工具
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
