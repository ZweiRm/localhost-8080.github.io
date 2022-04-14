---
prev: ./API-lang
next: ./API-util
---

# API-语言基础类库 2 (Package `java.lang`)

## 线程
### 基本信息
**Package** java.lang  
`public class Thread`

### 进程与线程
+ 线程是操作系统中的重要概念之一，是程序运行的基本单元。  

+ 进程是线程的集合。每一个进程可以创建一个或多个线程。

### 自定义线程
线程执行没有顺序性，相互抢占资源。这个抢占过程不只存在于线程执行的开始，而是存在于执行的全过程。在这种抢占模式下，会导致不合常理的情况发生（多线程并发安全问题）。  

+ 继承`Thread`类
  + 在`run()`中重写线程执行逻辑。  
    子类重写父类方法后，覆盖父类中的 `run()`，执行时直接执行这个方法。

  + 类实例通过`start()`启动线程。

+ 实现`Runnable`接口
  + 重写`run()`。  
    在 `Thread` 类中 `run()` 源码为：  
    ``` java
    @Override
    public void run() {
        if (target != null) {
            target.run();
        }
    }
    ```
    手动定义的 `run()` 作为 target 对象传给 `Thread` 类，在判断非空后调用 `target.run()` (即我们手动写的 `run()`)。

  + 通过`Thread`类对象启动线程。

::: tip 一般地
我们认为实现 `Runnable` 接口的方式更好。  
使用继承 `Thread` 类方法建立线程的缺点：  
+ 继承 `Thread` 类后，线程的运行和逻辑耦合在一起  
+ 每个线程独立，无法应用线程池来减少线程创建和销毁的资源占用  
+ Java 只允许单继承，当已经继承了 `Thread` 类后，可扩展性降低  

Q: 分析以下代码运行情况  
``` java
public class Main {
    public static void main(String[] args) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("====Runnable====");
            }
        }) {
            @Override
            public void run() {
                System.out.println("====Thread====");
            }
        }.start();
    }
}
```

[分析]  
在以 `Thread` 为基础的匿名内部类的参数中，传入了一个 `Runnable` 接口的实现。该实现重写了 `run()` 作为源码中的 `target.run()` 传递给外部的匿名内部类。在匿名内部类里重写了 `run()` 完全覆盖了 `Thread` 类中的 `run()`。所以最终只执行匿名内部类中的 `run()`。  

运行结果：  
```
====Thread====
```
:::

::: warning 也就是说
不管通过哪种方法实现线程，创建的时候都是在构造一个 `Thread` 类。通过 `Runnable` 接口实现 `run()` 后，会把这个接口的实例传给 Thread类；通过继承 `Thread` 类后，重写 `run()` 直接调用该方法。
:::

::: danger 一些不全面的观点
1. 使用线程池也是一种创建线程的方法  
   使用线程池创建 500 个线程并打印它们的名称：  
    ``` java
    public class Main40 {
        public static void main(String[] args) {
            // 创建线程池
            ExecutorService executorService = Executors.newCachedThreadPool();

            for (int i = 0; i < 500; i++) {
                executorService.submit(new Task());
            }
        }
    }

    // Runnable Task
    class Task implements Runnable {

        @Override
        public void run() {
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(Thread.currentThread().getName());
        }
    }   
    ```
   进入 `Executors` 类源码我们可以观察到，它最终也是使用 `Thread` 来创建线程的：  
    ``` java
    ...
    public Thread newThread(Runnable r) {
                Thread t = new Thread(group, r,
                    namePrefix + threadNumber.getAndIncrement(),
                    0);
    ...
    ```

2. 通过实现 `Callable<T>` 接口或 `FutureTask` 类也算一种线程得到创建方法  
    它们底层也是通过 `Runnable` 接口来实现的。所以根据 `Callable` 有返回值而 `Runnable` 没有来说明 `Callable` 是一种新的线程实现方法的说法也无道理。 

3. 使用定时器创建线程也是一种新的创建线程的方法  
    使用 `Timer` 来每秒打印一下线程的名称：  
    ``` java
    public class Main {
        public static void main(String[] args) {
            Timer timer = new Timer();
            timer.scheduleAtFixedRate(new TimerTask() {
                @Override
                public void run() {
                    System.out.println(Thread.currentThread().getName());
                }
            }, 1000, 1000);
        }
    }
    ```
    我们可以观察到 `TimerTask` 类的源码中，实现了 `Runnable` 接口：  
    ``` java
    public abstract class TimerTask implements Runnable {
        ...
    ```

4. 通过匿名内部类或者使用 Lambda 表达式语法创建线程是一种新的方法  
    ``` java
    public class Main {
        public static void main(String[] args) {
            // 匿名内部类方法一
            new Thread() {
                @Override
                public void run() {
                    System.out.println(Thread.currentThread().getName());
                }
            }.start();

            // 匿名内部类方法二
            new Thread(new Runnable() {
                @Override
                public void run() {
                    System.out.println(Thread.currentThread().getName());
                }
            }).start();

            // Lambda 表达式
            new Thread(() -> System.out.println(Thread.currentThread().getName())).start();
        }
    }
    ```
    它们的本质也是实现了 `Runnable` 接口，重写了 `run()`.
:::

### 线程同步
#### 分类
使用 `synchronized` 关键字来同步多个线程，一定程度上解决线程冲突。它可以保证在同一时刻最多只有一个线程执行该段被修饰的代码。是最基本的互斥同步手段。  

+ 对象锁  
   1. **同步代码块**  
      ``` java
         synchronized(同步锁 *所有线程可见*) {
            …
         }      
      ```
      手动指定锁对象，可以传入类字节码（类锁），`this`对象（对象锁），共享资源。  

      实例（使用 `this` 作为锁对象）：  
      ``` java
      public class Main implements Runnable {
         // 生成实例
         static Main instance = new Main();

         @Override
         public void run() {
            synchronized (this) {
               System.out.println("====开始同步代码块====");
               System.out.println(Thread.currentThread().getName());
               try {
                     Thread.sleep(1000);
               } catch (InterruptedException e) {
                     e.printStackTrace();
               }
               System.out.println("====同步代码块结束====");
            }
         }

         public static void main(String[] args) throws InterruptedException {
            // 创建线程对象
            Thread thread1 = new Thread(instance);
            Thread thread2 = new Thread(instance);
      
            // 运行线程
            thread1.start();
            thread2.start();
      
            // 保证正确提示
            thread1.join();
            thread2.join();
            //        while (thread1.isAlive() || thread2.isAlive()) {}
            System.out.println("=====结束=====");
         }
      }
      ```
      `synchronized` 关键字锁定了以 `this` 为对象的代码块。在两个线程使用 `start()` 调用到 `run()` 时，会因为锁的缘故按次序运行，释放掉第一个线程的锁再执行第二个。若没有对代码块进行锁定，则两个线程同时执行代码块中的内容。  
      线程中的另一个线程调用 `join()` 时，外层线程会等待调用线程结束后再继续自己的操作。比如在 `main()` 中，线程 `t.join()` 意思为：主线程会等待线程 `t` 结束后再继续自己的操作。   

      实例（使用对象作为锁对象）：  
      ``` java
      public class Main implements Runnable {
         // 生成实例
         static Main instance = new Main();

         // 生成锁对象
         Object lock1 = new Object();
         Object lock2 = new Object();

         @Override
         public void run() {
            // 代码块 1
            synchronized (lock1) {
                  System.out.println("====开始同步代码块 1====");
                  System.out.println(Thread.currentThread().getName());
                  System.out.println("====同步代码块 1 结束====");
                  try {
                     Thread.sleep(1000);
                  } catch (InterruptedException e) {
                     e.printStackTrace();
                  }
            }

            // 代码块 2
            synchronized (lock2) {
                  System.out.println("====开始同步代码块 2====");
                  System.out.println(Thread.currentThread().getName());
                  System.out.println("====同步代码块 2 结束====");
                  try {
                     Thread.sleep(1000);
                  } catch (InterruptedException e) {
                     e.printStackTrace();
                  }
            }
         }

         public static void main(String[] args) throws InterruptedException {
            // 创建线程对象
            Thread thread1 = new Thread(instance);
            Thread thread2 = new Thread(instance);

            // 运行线程
            thread1.start();
            thread2.start();

            // 保证正确提示
            thread1.join();
            thread2.join();
      //        while (thread1.isAlive() || thread2.isAlive()) {}
            System.out.println("=====结束=====");
         }
      }
      ```
      运行结果：  
      ![同步代码块](/img/synchronized_block.gif)  
      可以发现，执行步骤为：  
      1. Thread-0 拿到 lock 1； 执行代码块 1；T-0 释放 lock 1  
      2. Thread-0 拿到 lock 2 同时 Thread-1 拿到 lock1；T-0 执行代码块 2 同时 T-1 执行代码块 1；释放 T-0 释放 lock 2 同时 T-1 释放 lock 1  
      3. Thread-1 拿到 lock 2；T-1 执行代码块 2；T-1 释放 lock 2  
      4. 打印结束

   2. **同步方法**  
      使用 `synchronized` 修饰普通方法，此时锁对象默认为 `this` 对象。  
      实例：  
      ``` java
      public class Main implements Runnable {
         static Main instance = new Main();

         @Override
         public void run() {
            method();
         }

         synchronized void method() {
            System.out.println("====同步方法开始====");
            System.out.println(Thread.currentThread().getName());
            try {
                  Thread.sleep(1000);
            } catch (InterruptedException e) {
                  e.printStackTrace();
            }
            System.out.println("====同步方法结束====");
         }

         public static void main(String[] args) throws InterruptedException {
            Thread thread1 = new Thread(instance);
            Thread thread2 = new Thread(instance);

            thread1.start();
            thread2.start();

            thread1.join();
            thread2.join();
            System.out.println("====结束====");
         }
      }
      ```
      Thread-0 进入 `run()` 调用 `method()` 时拿到锁，执行完毕释放后交给 Thread-1.  

+ 类锁  
  对于一个 Java 类来说，有且只有一个字节码对象（Class 对象）。所以当一个类拥有众多实例时，在使用类锁后，同一时刻只有一个实例可以访问资源。  

  1. **同步静态方法**  
     当同一个类的不同对象生成的线程试图访问同一个被锁定的方法时，两个线程仍然会并行执行该方法。只有被锁定的方法是静态方法时，该锁变为类锁形式，只有拿到锁的线程才能执行目标方法。  

     实例：  
     ``` java
     public class Main implements Runnable {
         // 创建实例
         static Main instance1 = new Main();
         static Main instance2 = new Main();
  
         // 静态方法
         static synchronized void method() {
            System.out.println("====同步方法开始====");
            System.out.println(Thread.currentThread().getName());
            try {
                  Thread.sleep(1000);
            } catch (InterruptedException e) {
                  e.printStackTrace();
            }
            System.out.println("====同步方法结束====");
         }
  
         @Override
         public void run() {
            method();
         }

         public static void main(String[] args) throws InterruptedException {
            // 线程分别使用不同 instance 实例来创建
            Thread thread1 = new Thread(instance1);
            Thread thread2 = new Thread(instance2);
  
            thread1.start();
            thread2.start();
  
            thread1.join();
            thread2.join();
            System.out.println("====结束====");
         }
     }
     ```

  2. **同步字节码对象（代码块）**  
      当锁对象为类的字节码时，无论这个类的哪一个实例试图访问该代码块均需要拿到锁。但当锁对象为 `this` 对象时，不同实例并行运行被锁的代码块。    
        ``` java
        public class Main implements Runnable {
            static Main instance1 = new Main();
            static Main instance2 = new Main();

            @Override
            public void run() {
                method();
            }

            void method() {
                synchronized (Main.class) {
                    System.out.println("====同步代码块开始====");
                    System.out.println(Thread.currentThread().getName());
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    System.out.println("====同步代码块结束====");
                }
            }

            public static void main(String[] args) throws InterruptedException {
                Thread thread1 = new Thread(instance1);
                Thread thread2 = new Thread(instance2);

                thread1.start();
                thread2.start();

                thread1.join();
                thread2.join();
                System.out.println("====结束====");
            }
        }
        ```

::: warning 值得注意的是
当不同线程使用同一个实例创建时，不管使用对象锁还是类锁都可以起到效果。
:::

::: tip 使用 <code>synchronized</code> 的几种常见情况
1. 两个线程同时访问一个对象的同步方法  
    即由同一个实例生成的两个线程，访问被锁定 `this` 的代码块或方法。锁生效，两个线程争夺同一把锁。  

2. 两个线程同时访问两个对象的同步方法  
    即由两个不同实例生成的两个线程，访问被锁定的 `this` 的代码块或方法。锁失效，锁定的是本身对象，而不是公共的对象。  

3. 两个线程访问 <code>synchronized</code> 修饰的静态方法  
    静态方法是属于类的，当由两个不同实例生成的连那个线程访问这样的静态方法时，锁生效。（例子等同于同步静态方法中的实例）  

4. 两个线程同时访问同步方法和非同步方法  
    两个线程由相同实例生成，其中一个被访问的方法被 `this` 锁定，规定一个线程执行被锁定方法，另一个执行非锁定方法。结果是两线程异步执行两个方法，不上锁的方法不受控制。  
    实例：  
    ``` java
    public class Main implements Runnable {
	    static Main instance = new Main();

	    @Override
		public void run() {
            // 两个线程异步启动，其中指定线程 1 执行同步方法，线程 2 执行异步方法
            if (Thread.currentThread().getName().equals("Thread-0")) {
                methodSynchronized();
            } else {
                methodAsynchronous();
            }
		}

		public synchronized void methodSynchronized() {
            System.out.println("====同步方法开始====");
            System.out.println(Thread.currentThread().getName());
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("====同步方法结束====");
		}

		public void methodAsynchronous() {
            System.out.println("====异步方法开始====");
            System.out.println(Thread.currentThread().getName());
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("====异步方法结束====");
		}

		public static void main(String[] args) throws InterruptedException {
            Thread thread1 = new Thread(instance);
            Thread thread2 = new Thread(instance);

            thread1.start();
            thread2.start();

            thread1.join();
            thread2.join();
            System.out.println("====结束====");
	    }
    }
    ```
    
5. 访问同一个对象的不同普通同步方法  
   当两个基于同一个对象生成的线程分别执行不同的被锁定的方法时，两个线程同步执行。随机一个线程先拿到锁开始执行对应方法，完毕后第二个线程拿到锁执行对应方法。  
   实例：  
    ``` java
    public class Main implements Runnable {
        static Main instance = new Main();

        @Override
        public void run() {
            // 两个线程异步启动，其中指定线程 1 执行同步方法 1，线程 2 执行同步方法 2 方法
            if (Thread.currentThread().getName().equals("Thread-0")) {
                methodSynchronized1();
            } else {
                methodSynchronized2();
            }
        }

        public synchronized void methodSynchronized1() {
            System.out.println("====同步方法 1 开始====");
            System.out.println(Thread.currentThread().getName());
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("====同步方法 1 结束====");
        }

        public synchronized void methodSynchronized2() {
            System.out.println("====同步方法 2 开始====");
            System.out.println(Thread.currentThread().getName());
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("====同步方法 2 结束====");
        }

        public static void main(String[] args) throws InterruptedException {
            Thread thread1 = new Thread(instance);
            Thread thread2 = new Thread(instance);

            thread1.start();
            thread2.start();

            thread1.join();
            thread2.join();
            System.out.println("====结束====");
        }
    }
    ```

6. 同时访问静态被 `synchronized` 修饰和非静态被 `synchronized` 修饰的方法  
   当两个线程生成自同一个对象去执行对应方法时，由于两个被锁的方法锁定范围不同，两个线程依然异步执行。就算两个线程生成自不同对象，也会异步执行。只有锁定范围和线程生成匹配才会同步执行。  
   ``` java
    public class Main implements Runnable {
        static Main instance = new Main();

        @Override
        public void run() {
            // 两个线程异步启动，其中指定线程 1 执行同步静态方法 1，线程 2 执行同步方法 2 方法
            if (Thread.currentThread().getName().equals("Thread-0")) {
                methodSynchronizedStatic();
            } else {
                methodSynchronizedNormal();
            }
        }

        public static synchronized void methodSynchronizedStatic() {
            System.out.println("====同步静态方法 1 开始====");
            System.out.println(Thread.currentThread().getName());
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("====同步静态方法 1 结束====");
        }

        public synchronized void methodSynchronizedNormal() {
            System.out.println("====同步方法 2 开始====");
            System.out.println(Thread.currentThread().getName());
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("====同步方法 2结束====");
        }

        public static void main(String[] args) throws InterruptedException {
            Thread thread1 = new Thread(instance);
            Thread thread2 = new Thread(instance);

            thread1.start();
            thread2.start();

            thread1.join();
            thread2.join();
            System.out.println("====结束====");
        }
    }
    ```

7. 方法抛出异常  
    随机一个线程拿到锁后开始执行，但若方法方法抛出异常后 Java 会释放同步锁，下一个进程拿到锁后执行后续代码。  
    实例：  
    ``` java
    public class Main implements Runnable {
        static Main instance = new Main();

        @Override
        public void run() {
            if (Thread.currentThread().getName().equals("Thread-0")) {
                methodSynchronizedWithException();
            } else {
                methodSynchronizedWithoutException();
            }
        }

        public  synchronized void methodSynchronizedWithException() {
            System.out.println("====同步异常方法 1 开始====");
            System.out.println(Thread.currentThread().getName());
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            // 创建异常
            throw new RuntimeException();
    //        System.out.println("====同步异常方法 1 结束====");
        }

        public synchronized void methodSynchronizedWithoutException() {
            System.out.println("====同步方法 2 开始====");
            System.out.println(Thread.currentThread().getName());
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("====同步方法 2结束====");
        }

        public static void main(String[] args) throws InterruptedException {
            Thread thread1 = new Thread(instance);
            Thread thread2 = new Thread(instance);

            thread1.start();
            thread2.start();

            thread1.join();
            thread2.join();
            System.out.println("====结束====");
        }
    }
    ```
    运行结果：  
    ![Synchronized With Exception](/img/synchronizedWithException.png)

8. 一个线程访问一个被 `synchronized` 修饰的方法，但方法中调用了另一个普通方法  
    会造成线程不安全，`synchronized` 只对本方法起效，当运行跳出方法后不再同步。  
::: 

<br/>

#### **`synchronized` 性质**  
+ 可重入  
    + 一个线程访问拿到锁执行外层方法后，内层方法可再次获得锁  
    + *作用*：避免死锁，提升封装性  
        例如 `method1()` 中某语句调用了 `method2()` ，且两个方法都被 `synchronized` 修饰。若 `synchronized` 不具有可重入性，线程拿到锁执行 `method1()` 时会由于当前方法未执行完而不释放锁，而 `method2()` 需要锁才能继续执行，陷入死锁状态。  
    + *粒度*：线程（非调用）
+ 不可中断  
    + 只有当一个线程释放锁后另一个线程才能拿到锁  

#### **`synchronized` 原理**  
+ 获取与释放
    + 内置锁（监视器锁）  
        `synchronized` 修饰的方法或代码块，在执行时获取锁，再完成或抛出异常时释放锁。等同于 `java.utils.concurrent` 所提供的 `ReentrantLock`.  
        
        **实例**：  
        ``` java
        import java.util.concurrent.locks.Lock;
        import java.util.concurrent.locks.ReentrantLock;

        public class Main {
            // 创建由 Lock 实现的可重入锁
            Lock lock = new ReentrantLock();

            public synchronized void methodWithSynchronized() {
                System.out.println("====执行同步方法====");
            }
            
            public void methodWithReentrantLock() {
                lock.lock();
                try {
                    System.out.println("====执行可重入锁所方法====");
                } finally {
                    lock.unlock();
                }
            }

            public static void main(String[] args) {
                Main instance = new Main();

                // 两个方法等价
                instance.methodWithSynchronized();
                instance.methodWithReentrantLock();
            }
        }
        ```
    + `monitorenter` 和 `moniterexit`  
        + 内置锁是通过 `monitorenter` 和 `moniterexit` 指令来实现的。  
        + 在需要获取锁定的地方执行 `monitorenter`，在释放的地方执行 `monitorexit`。但是 Java 无法直接判断需要释放锁的情形，所以在正常释放和异常退出都单独执行 `monitorexit`。  
        + `monitorenter` 会使锁计数器 +1，`monitorexit` 会使锁计数器 -1. 每个对象都关联于一个 monitor，且同一时间只有一个对象可以获得 monitor 锁。
        + `monitorenter` ：若当前计数器为 0，则意味着当前 monitor 无锁，则立即获得锁并使得计数器 +1；若当前线程重入锁，则计数器继续 +1；若其他线程访问到计数器不为 0 的 monitor，进入阻塞状态，直到计数器变为 0 重新获得锁。  
        + `monitorexit` ：若当前线程拥有锁，在执行该指令时，计数器 -1. 当执行后计数器为 0 意味着当前线程执行完毕释放锁，若不为 0 则继续持有锁。
        **实例**：  
        ``` java
        public void method(Thread thread) {
            synchronized (lock) {
            }
        }
        ```
        所对应的字节码反编译为：  
        ``` {10,12,16}
        public void method(java.lang.Thread);
        descriptor: (Ljava/lang/Thread;)V
        flags: (0x0001) ACC_PUBLIC
        Code:
        stack=2, locals=4, args_size=2
            0: aload_0
            1: getfield      #3                  // Field lock:Ljava/lang/Object;
            4: dup
            5: astore_2
            6: monitorenter
            7: aload_2
            8: monitorexit
            9: goto          17
            12: astore_3
            13: aload_2
            14: monitorexit
            15: aload_3
            16: athrow
            17: return
        ...
        ```
+ 可重入原理  
    利用锁计数器来实现。JVM 负责跟踪对象被加锁的次数。
+ 可见性原理  
    根据 Java 内存模型（JMM），每一个线程拥有一个本地内存，其中保存着共享资源的副本。  
    ![JMM](/img/JMM.png)  
    在线程 A 向 线程 B 通信时，主内存作为其沟通桥梁。当资源使用 `synchronized` 修饰时，会保证线程A 在完全执行完毕将数据写回主内存后再由线程 B 从主内存中获取。保证了线程的本地内存与主内存数据一致。  

#### `synchronized` 的缺陷
+ 效率低  
    锁释放的情形少。无法设定获取锁超时时间，不能中断一个正在等待获得锁的线程。
+ 不灵活
    相比读写锁，`synchronized` 获取释放锁机制单一。每个锁仅能锁定单一对象，在某些情景下不能够完全满足需求。  
+ 无法知晓是否成功获得了锁
    失去了在获取成功或失败条件下执行特定逻辑的能力。

### volatile
`volatile` 是一种同步机制，相比 `synchronized` 和 `Lock` 更轻量。因为它不会发生上下文切换等开销很大的行为。  
当一个变量被 `volatile` 修饰以后，JVM 就知道它可能会被并发修改。  
`volatile` 仅能在有限的场景发挥作用，而不能做到像 `synchronized` 那样的原子保护。  
仅能使用在变量上。  
保证了 happens-before 原则。  
可以保证本身没有赋值原子性的 `long` 和 `double` 类型变量在赋值是原子性的。  

作用：  
+ 可见性  
  在读取一个 `volatile` 修饰的变量前，需要先使相应的本地缓存失效。这样读取时就必须要主内存中读取最新值。一个被 `volatile` 修饰的变量会被立刻刷新到主内存中。  
+ 禁止重排序  
  例如：解决了单例双重锁乱序的问题。  

适用场景：  
+ 变量是一个布尔的标记。变量始终只被各个线程赋值而没有其他操作时，因为赋值操作本身具有原子性，所以 volatie 可以保证可见性也可以保证线程安全。  
+ 作为刷新前的触发器。`volatile` 修饰的变量在被赋值前的操作具有可见性，保证了在使用时那些值一定是最新的。  

::: tip Happens-before 原则与可见性
`synchronized`, `volatile`, `Lock`, 并发集合，`Thread.join()`, `Thread.start()` 都可以保证可见性。  

happens-before 原则可以解决可见性问题，这样解决并发的执行顺序。当一个操作是 happens-before 另一个操作时，第一个操作对于第二个操作是可见的。  

具体规则：  
+ 单线程规则  
  在单线程内，后面的语句一定可以看到前面语句的操作。 
+ 锁操作  
  一个线程在解锁之前的所有操作对于另一个线程拿到锁后的操作都是可见的。   
+ `volatile`  
  一个被 `volatile` 修饰的变量会被立刻刷新到主内存中。  
+ 线程启动  
  子线程启动时一定可以看到主线程之前的所有操作。  
+ `join()`  
  主线程在等待子线程运行的时候，`join()` 后的语句可以看到之前的所有操作。  
+ 传递性  
  如果 A happens-before B, B happens-befoe C, 则 A happens-before C.  
+ 中断  
  一个线程被其他线程中断时，那么另一个线程对第一个线程中断检测 (`isInterrupted()`) 或者第一个线程抛出 `InterruptedException` 一定可以被第二个线程看到。  
+ 构造方法  
  构造方法的最后一条指令 happens-before `finalize()` 的第一条指令。  
+ 工具类  
  + 线程安全容器 `get()` 一定可以看到之前 `put()` 操作。  
  + `CountDownLatch`, `Semaphore`, `CyclicBarrier` 依据自身流程保证可见性。  
  + `Future` 的 `get()` 对于之前的结果一定可见。  
  + 线程池的任务在提交前可以看到之前的所有操作。  
:::

### 线程通信
通过等待唤醒机制调节线程之间的执行顺序。  

线程在等待期间存在于线程池中，线程池本质上是一个存储线程的队列。  
A1 A2 C1 C2 → ()  
A1(Running)  
A1 A2 C1 C2 → ()  
A1(Running, <font color="red">wait()[A1]</font>)  
A2 C1 C2 → (A1)  
A2(Running, <font color="red">wait()[A2]</font>)  
C1 C2 → (A1 A2)  
C1(Running, <font color="green">notify()[A1]</font>)  
A1 C1 C2 → (A2)  
C1(Running, <font color="red">wait()[C1]</font>)  
A1 C2 → (A2, C1)  
C2(Running, <font color="red">wait()[C2]</font>)  
A1 → (A2, C1, C2)  
A1(Running, <font color="green">notify()[A2]</font>)  
A1 A2 → (C1, C2)  
A1(Running, <font color="red">wait()[A1]</font>)  
A2 → (C1, C2, A1)  
A2(Running, <font color="red">wait()[A2]</font>)  
   → (C1, C2, A1, A2)  

`sleep()`需要制定睡眠时间，结束自然恢复。释放执行权，不释放锁对象，在`Thread`类中，为静态方法
`wait()`可以指定等待时间，也可不指定，此时需要唤醒。释放执行权，释放锁对象。在`Object`类中，为普通方法。必须结合锁使用（两对象相同）。

### 死锁
**产生原因**  
多个线程；共享资源过多；锁对象不统一；锁嵌套。  

**避免死锁**  
统一锁对象、减少锁嵌套。  

**同步与异步**
+ 若某对象在某时间段内只允许一个线程操作即为同步，反之异步。

+ 同步一定安全。

+ 不安全一定异步。

### 线程状态
![线程状态](/img/线程状态.png)
+ 阻塞：不执行代码抢占资源

+ 冻结：不执行代码，不抢占资源

### 守护线程
+ 守护其他线程的执行，被守护线程结束后，守护线程无论完成与否随之结束

+ 只要代码中出现守护线程，程序中的线程只能是守护线程或者被守护线程  
  若存在多个被守护线程，则最后一个被守护线程为结束标志

### 线程优先级
+ 线程拥有 1-10 共十级优先级 

+ 优先级越高，理论上抢到资源的概率越大

+ 相邻两个优先级几乎没有差别  
  相差5级以上，略有差别

## ThreadLocal
### 基本信息
**Package** java.lang  
`public class ThreadLocal<T>`  

使用场景：  
+ 每个线程需要一个独享的对象。（例如需要某些工具类对象，`Random`, `SimpleDateFormat` 等）  
  初始化时机由程序员控制，ThreadLocal 第一次 `get()` 时就可以初始化对象，使用 `initialValue()`  
+ 每个线程内需要保存全局变量，可以让不同方法直接使用而避免参数传递。（例如拦截器中获取的用户信息）  
  对象初始化时机不由程序员控制。例如使用拦截器获取对象，使用 `set()` 将对象放入 ThreadLocal  

**优点**  
+ 线程安全
+ 执行效率高，不需要加锁
+ 高效利用内存节省开销
+ 避免传参，降低耦合度

**Thread, ThreadMap 和 ThreadLocal**  
每一个 Thread 都维护了一张 ThreadMap. 每个 Thread 可以与多个 ThreadLocal 产生关联关系，关系会被存储在 ThreadMap 中。  

**场景一分析**  
对于一个多线程打印时间的任务场景，假设每个线程都创建一个 `SimpleDateFormat` 对象：  
``` java
public class Main {
    public static void main(String[] args) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                String date = new Main().date(10);
                System.out.println(date);
            }
        }).start();

        new Thread(new Runnable() {
            @Override
            public void run() {
                String date = new Main().date(1007);
                System.out.println(date);
            }
        }).start();
    }
    public String date (int sec) {
        Date date = new Date(1000 * sec);
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        return dateFormat.format(date);
    }
}
```

对其进行改进，使用线程池和共用同一个 `SimpleDateFormat` 对象。但是出现线程安全问题。  
使用 `synchronized` 来避免线程不安全。  
``` java
public class Main {
    public static ExecutorService threadPool = Executors.newFixedThreadPool(10);
    static SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");

    public static void main(String[] args) {
        for (int i = 0; i < 1000; i++) {
            int index = i;
            threadPool.submit(new Runnable() {
                @Override
                public void run() {
                    String date = new Main().date(index);
                    System.out.println(date);
                }
            });
        }
        threadPool.shutdown();
    }
    public String date (int sec) {
        Date date = new Date(1000 * sec);
        String str = null;
        synchronized (Main.class) {
            str = dateFormat.format(date);
        }
        return str;
    }
}
```

使用 ThreadLocal 改进：  
``` java
public class Main {
    public static ExecutorService threadPool = Executors.newFixedThreadPool(10);

    public static void main(String[] args) {
        for (int i = 0; i < 1000; i++) {
            int index = i;
            threadPool.submit(new Runnable() {
                @Override
                public void run() {
                    String date = new Main().date(index);
                    System.out.println(date);
                }
            });
        }
        threadPool.shutdown();
    }
    public String date (int sec) {
        Date date = new Date(1000 * sec);
        SimpleDateFormat dateFormat = ThreadSafeFormatter.dateFormatThreadLocal.get();
        return dateFormat.format(date);
    }
}

class ThreadSafeFormatter {
    public static ThreadLocal<SimpleDateFormat> dateFormatThreadLocal = new ThreadLocal<>() {
        @Override
        protected SimpleDateFormat initialValue() {
            return new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        }
    };
    
    // 使用 Lambda 表达式形式
    public static ThreadLocal<SimpleDateFormat> dateFormatThreadLocal2 = ThreadLocal.withInitial(
            () -> new SimpleDateFormat("yyyy-MM-dd hh:mm:ss"));
}
```

**场景二分析**  
假设一个系统内部有众多业务模块都需要用到 `User` 信息。不同的线程可能需要使用不同的 `User` 对象。为了避免每个线程都携带 `User` 对象，可以把它们放到一个 Map 中。使用 `synchronized` 或 `ConcurrentHashMap` 可以解决这样的需求，但是性能会被影响。  
使用 ThreadLocal 来改进这些代码。  
``` java
public class Main85 {
    public static void main(String[] args) {
        new Service1().process();
    }
}

class User {
    String name;

    public User(String name) {
        this.name = name;
    }
}

class UserContextHolder {
    public static ThreadLocal<User> holder = new ThreadLocal<>();
}

class Service1 {
    public void process() {
        User user = new User("User");
        UserContextHolder.holder.set(user);
        new Service2().process();
    }
}

class Service2 {
    public void process() {
        User user = UserContextHolder.holder.get();
        System.out.println("2" + user.name);
        new Service3().process();
    }
}

class Service3 {
    public void process() {
        User user = UserContextHolder.holder.get();
        System.out.println("3" + user.name);
    }
}
```

### 重要方法
1. `initialValue()`  
   + 返回当前线程的初始值，是一个延迟加载的方法。只有调用 `get()` 时才会触发。  
   + 当线程第一次使用 `get()` 访问变量时，会调用此方法。除非线程已经调用过 `set()`.  
   + 每个线程最多调用一次。但如果已经调用 `remove()` 和 `get()` 时，则可再调用。  
   + 不重写该方法的话默认返回 `null`. 一般使用匿名内部类来重写，以便后续使用可以初始化副本对象。  
2. `set()`  
   为线程设置一个新值  
   原理：取出当前线程的 `ThreadLocalMap`，如果 map 存在，则调用 `map.set()` 添加值，若不存在则调用 `createMap()` 创建 map.
3. `get()`  
   得到线程对应的 value. 如果是首次调用，则会调用 `initialValue()` 来得到这个值  
   原理：取出当前线程的 `ThreadLocalMap`，调用 `map.getEntry()`，并把 ThreadLocal 的引用作为参数传入，取出 map 中属于本 ThreadLocal 的 value  
4. `remove()`  
   删除线程设置的值  
   原理：取出当前线程的 `ThreadLocalMap`，如果 map 存在则调用 `map.remove()`，并把 ThreadLocal 的引用作为参数传入，删除目标值  

**关于 ThreadLocalMap**  
ThreadLocalMap 是每个线程中的变量。其中最重要的是一个 `Entry[] table`, 可以理解为一个键值对 map.  
其中键为 ThreadLocal，值为实际要存储的变量。  
当发生 Hash 碰撞时，采用线性探测法解决。  

::: warning 注意
+ 内存泄漏 (Value 发生泄漏)  
  ThreadLocalMap 中的 Entry 的 Key 继承自 WeakReference，但 Value 是强引用。但是在线程持续时间很长的情况下，其中保存的 Key 因为弱引用被回收而 Value 被保存。存在一个 Thread 和 Value 的强引用链路，可能会导致 OOM 错误。  
  在源码中，Java 在 ThreadLocalMap 的 `set()`, `remove()` 和 `rehash()` 中预先使用手段防止这种情况的发生。它会扫描 Key 为 `null` 的 Entry, 并将其 Value 也设置成 `null` 来让 GC 回收。  
  但如果 ThreadLocal 后续一直没有被用到，则还是可能会发生这样的内存泄漏。  
  我们一般要求在使用完 ThreadLocal 后，立即调用 `remove()` 来防止这样的情况发生
+ 空指针异常  
  包装类和基本类型的 ThreadLocal 可能会在装箱拆箱的过程中抛出空指针异常。  
+ 共享对象  
  如果在 `ThreadLocal.set()` 中保存的是一个多线程共享的对象，则 `get()` 时取得的还是这个共享对象本身，仍然是有并发访问问题的。  
:::