---
prev:
    text: 'Map 接口'
    link: 'java/api-util-map'
next:
    text: '其他工具类'
    link: 'java/api-util-others'
---

# Stream
## 5.4 Stream <Badge text="Java 8.0+"/>
**基本信息**  
**Package** java.util.stream  

Java 为集合运算和表达提供了一种更高阶的表达方式，通过这种表达方式可以使得代码更简洁直观。  

1. 聚合操作
   可以对数据集合进行批量的操作，如 filter, map, reduce, find, sorted, match 等。可以实现一些类似 SQL 语句的效果。
2. 处理流程
   1. 获取数据源
      + 从集合或数组中获取 stream  
        `集合.stream()`; `集合.parallelStream()`; `Arrays.stream(T t)` (T 为具体数组).  
        ``` java
        // 直接将多个元素转换为 Stream 对象
        Stream elementsStream = Stream.of("Alice", "Bob", "Jerry");

        // 将引用数据类型数组转换为 Stream 对象
        String[] strArray = new String[]{"Alice", "Bob", "Jerry"};
        Stream arrayStream = Arrays.stream(strArray);

        // 将列表转换为 Stream 对象
        List<String> list = new ArrayList<>();
        list.add("Alice");
        list.add("Bob");
        list.add("Jerry");
        Stream listStream = list.stream();

        // 将集合转换为 Stream 对象
        Set<String> set = new HashSet<>();
        set.add("Alice");
        set.add("Bob");
        set.add("Jerry");
        Stream setStream = set.stream();

        // 将 Map 转换为 Stream 对象
        Map<String, Integer> map = new HashMap<>();
        map.put("Alice", 1);
        map.put("Bob", 2);
        map.put("Jery", 3);
        Stream mapStream = map.entrySet().stream();
        ```

        关于 ParallelStream:  
        @flowstart
        st=>start: 开始
        e=>end: 结束
        
        op1=>operation: Splitor.estimateSize() 分片数量 阈值处理
        
        cond1=>condition: 分片大于阈值？
        op2=>operation: 最小任务单元计算 doLeaf
        op3=>operation: 创建子任务 Task
        
        op4=>operation: 终结判断 AbstractTask.tryComplete(...)
        
        cond2=>condition: 其他并行中间节点 Pedding == 0?
        op5=>operation: 最终任务操作 onCompletion(...)
        op6=>operation: 等待其他节点
        
        cond3=>condition: 其他子节点任务？
        op7=>operation: 合并所有节点数据
        op8=>operation: 销毁中间数据

        cond4=>condition: 节点任务判断？

        op9=>operation: 左右节点 fork 分解

        cond5=>condition: 通过软件控制 CPU 分片对线程均衡操作？
        op10=>operation: 添加到当前线程

        st->op1

        op1->cond1
        cond1(yes)->op2->op4->cond2
        cond1(no)->op3->op9->cond5
        cond2(yes)->op6->e
        cond2(no)->op5->cond3
        cond3(yes)->op8->e
        cond3(no)->op7->cond4
        cond4(yes)->op5
        cond4(no)->e
        cond5(yes)->op10->e
        cond5(no)->op1
        @flowend
        **ParallelStream 在操作非线程安全的集合时会出现数据不一致。可以通过 Collections 提供的同步块来实现线程安全，但会出现线程竞争问题。通过联合 Stream 提供的聚合操作（例如 collect 操作）和 ParallelStream可以实现对非线程安全集合的并行操作。**

      + 从流中获取 stream  
        `BufferReader.lines()`  
      + 通过静态工厂获取 stream  
        `java.util.stream.IntStream.range()`; `java.nio.file.Files.walk()`
      + 自定义构建 stream  
        `java.util.Spliterator`
      + 其他方式  
        `Random.ints()`; `Pattern.splitAsStream()`
   2. 数据转换（1 到多次）
      + 中间操作 API (intermediate)  
        它的结果是一个 stream. 可以存在一到多个连续的中间操作。但中间操作只记录操作方式而不具体执行，直到结束操作发生时才开始对数据进行真是操作。  
        具体分为：  
        + 无状态中间操作：数据处理时不受前置中间操作的影响。  
          常用：`map`, `filter`, `peek`, `parallel`, `sequential`, `unordered`    
        + 有状态中间操作：数据处理时受前置中间操作的影响。  
          常用：`distinct`, `sorted`, `limit`, `skip`  
        
        常用中间操作：  
        ``` java
        // 数据
        List<String> accountList = new ArrayList<>();
        accountList.add("Alice");
        accountList.add("Bob");
        accountList.add("James");
        accountList.add("Mary");
        accountList.add("Robert");
        accountList.add("Jennifer");
        accountList.add("John");

        // 通过 map 中间操作利用 Lambda 表达式关联函数式接口对数据进行操作
        // 结束后转回 List
        accountList = accountList.stream()
            .map(x -> "Name: " + x)
            .collect(Collectors.toList());
        accountList.forEach(System.out::println);
        
        // 通过 filter 中间操作过滤符合条件的用户
        // filter 的参数是函数式接口 Predicate. 若操作逻辑复杂，可以自定义接口实现类进行操作
        accountList = accountList.stream()
            .filter(x -> x.length() > 3)
            .collect(Collectors.toList());
        accountList.forEach(System.out::println);

        // 通过 forEach 中间操作实现增强循环
        accountList.forEach(System.out::println);// 带有方法引用的增强型循环
        accountList.forEach(x -> System.out.println("Account Name: " + x));

        // 通过 peek 中间操作对同一个集合多次迭代修改
        accountList.stream()
            .peek(x -> System.out.println("Iterate 1: " + x))
            .peek(x -> System.out.println("Iterate 2: " + x))
            .forEach(System.out::println);
        ```

        对数字运算的操作：  
        ``` java
        // 数据
        List<Integer> intList = new ArrayList<>();
        intList.add(5);
        intList.add(23);
        intList.add(1);
        intList.add(75);
        intList.add(3);
        intList.add(1);
        intList.add(87);

        // 通过 skip 中间操作跳过某些数据，属于有状态中间操作
        intList.stream().skip(3).forEach(System.out::println);

        // 通过 limit 中间操作限制输出数据的数量，属于有状态中间操作
        intList.stream().limit(2).forEach(System.out::println);

        // 通过 distinct 中间操作剔除重复数据，属于有状态中间操作
        intList.stream().distinct().forEach(System.out::println);

        // 通过 sorted 中间操作对数据进行排序，属于有状态中间操作
        intList.stream().sorted().forEach(System.out::println);

        // 通过 max 终结操作获取集合中最大值
        // 它返回一个 Optional 对象。
        // Optional 是一个存放对象的容器，可以仅存放 null 也可以存放具体数据。当其中存在数据时可以通过 get() 获取
        Optional maxOptional = intList.stream().max((x, y) -> x - y);
        System.out.println(maxOptional.get());

        // 通过 min 终结操作获取集合中最小值
        Optional minOptional = intList.stream().min((x, y) -> x - y);
        System.out.println(minOptional.get());

        // 通过 reduce 终结操作合并处理数据，依次对每个元素进行合并操作
        // 求所有元素的和
        Optional sumOptional = intList.stream().reduce((sum, x) -> sum + x);
        System.out.println(sumOptional.get());
        ```
   3. 执行逻辑操作获取结果
      + 终结操作/结束操作 (terminal)  
        对于一个 stream 来说，只能有一个终结操作。这个操作一旦发生，就会对集合进行真实的处理并生成结果，过程不可逆。  
        具体分为：  
        + 非短路操作：stream 必须处理完集合中所有元素才能得到结果。  
          常用：`forEach`, `forEachOrdered`, `toArray`, `reduce`, `collect`, `min`, `max`, `count`, `iterator`  
        + 短路操作：stream 在处理过程中一旦满足某个条件即可得到结果。（例如从一个无限大的 stream 中获得一个有限大的 stream）  
          常用：`anyMatch`, `allMatch`, `noneMatch`, `findFirst`, `findAny`  
      ``` java
      // 将 Stream 对象转换为数组
      Object[] objArr = stream.toArray();   // 生成 Object 数组
      String[] strArr = stream.toArray(String[]::new);  // 通过方法引用生成 String 类型数组

      // 将 Stream 对象转换为字符串
      String str = stream.collect(Collectors.joining()).toString(); // 将字符拼接并转换成字符串

      // 将 Stream 对象转换为列表
      List<String> strList = (List<String>) stream.collect(Collectors.toList);

      // 将 Stream 对象转换为集合
      Set<String> strSet = (Set<String>) stream.collect(Collectors.toSet());

      // 将 Stream 对象转换为 Map
      // 使用 Lambda 表达式对 Key 和 Value 进行单独处理
      Map<String, String> strMap = (Map<String, String>) stream.collect(Collectors.toMap(x -> x, y -> y));
      ```

**基本数据类型流**  
在 Stream 中对集合进行操作时，会频繁的对基本数据类型进行自动装箱和自动拆箱的工作。Java 为其提供了一些封装来使得整个处理流程只进行一次装箱一次拆箱，从而降低执行的复杂性。比如 `IntStream` 等。  
``` java
// 将 int 数组转换为 IntStream 并遍历打印元素
IntStream.of(new int[]{1, 2, 3}).forEach(System.out::println);

// 范围打印 1 到 5
IntStream.range(1, 6).forEach(System.out::println);         // [1,6)
IntStream.rangeClosed(1, 5).forEach(System.out::println);   // [1,5]
```
