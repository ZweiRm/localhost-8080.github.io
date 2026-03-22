---
prev:
    text: 'Lock 与锁机制'
    link: 'java/api-util-concurrent-lock'
next:
    text: 'Callable 与 Future'
    link: 'java/api-util-concurrent-callable-future'
---

# 原子操作 atomic
### 5.9.3 `atomic`包
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
