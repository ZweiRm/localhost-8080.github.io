---
prev:
    text: '线程'
    link: 'java/api-lang-thread'
next:
    text: '日期'
    link: 'java/api-util-date'
---

# ThreadLocal
### 4.10.1 基本信息
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

### 4.10.2 重要方法
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
