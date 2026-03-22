---
prev:
    text: '原子操作 atomic'
    link: 'java/api-util-concurrent-atomic'
next:
    text: '并发容器'
    link: 'java/api-util-concurrent-containers'
---

# Callable 与 Future
### 5.9.4 Callable接口
**基本信息**  
**Package** java.util.concurrent

`Interface Callable<v>`

克服了 `Runnable` 接口没有返回值，不能抛出可检查异常的特点。  
类似于 `Runnable`, 是一个可以被其他线程执行的任务，其中包含了 `call()` 描述具体逻辑，它是有返回值且抛出异常的。  

### 5.9.5 Future接口
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
