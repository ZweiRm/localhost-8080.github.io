---
prev: ./API-lang
next: ./API-io
---

# API-工具类库 (Package `java.util`)
## 日期
### `Date`类
**基本信息**  
**Package** java.util  
`public class Date`  

+ 使用`Date`类对象来表示一个日期。默认创建的对象会获取系统当前时间。  

**重要方法**  

**格式化日期显示**
+ 将字符串转化为日期对象  
  使用`SimpleDateFormat`类向上造型，调用其`Date parse(String source)`来转换。  
  **Input**
  ```java
  Date date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse("2000-02-01 12:42:15");
  ```

+ 将日期对象转换为字符串
  使用`SimpleDateFormat`类向上造型，调用其`StringBuffer format(Date date)`来转换。  
  **Input**
  ```java
  String str = new SimpleDateFormat("yyyy年MM月dd日").format(date);
  ```

### `Calendar`类
**基本信息**  
**Package** java.util  
`public abstract class Calendar`  

+ 使用静态方法`static Calendar getInstance()`来获取一个`Calendar`类实例。  

## 集合
### `Collcetion`接口
**基本信息**  
**Package** java.util  
`public interface Collection<E>`  

+ 是集合类的顶级接口
+ 其中`<E>`是泛型，代表该集合只能存储`E`类的数据作为元素(element)，且必须是引用数据类型。   
  如：`Collection<String>`限定集合中只能存储`String`类的数据。

### `List`接口
**基本信息**  
**Package** java.util  
`public interface List<E>`    

+ 是一种有序的`Collection`
+ 元素有序（存入顺序），可重复
+ 元素存在下标，可通过下标操作对应的元素

**重要实现类**  
`ArrayList`类
+ 默认初始容量为 10；扩容时，在上一次的基础上扩容一半容量 (无参创建时为空数组，第一次赋值时扩展为 10)
+ 线程不安全的集合（在方法内做局部变量时安全）
+ 内存空间连续 
+ 增删元素比较慢

`LinkedList`类
+ 基于链表实现，增删快，查询慢
+ 线程不安全的集合
![LinkedList](/img/LinkedList.png)
+ 因为在 Java 中，链表默认实现为双向链表。使用在按 index 访问结点时，源码采用了判断 index 属于前一半元素还是后一半元素的形式，之后使用 for 循环从前到 index 或从后到 index 依次遍历直到访问到目标结点。这样做可以减少一半元素的遍历操作。  

`Vector`类
+ Java 中最早的集合，初始容量是10
+ 内存空间连续
+ 每次扩容1倍
+ 线程安全
+ 使用方法`elements()`来返回枚举

  **重要派生类**  
  `Stack`类  
	+ 遵循先进后出的原则
	+ 最先放入的元素称为栈底元素
	+ 最后放入的元素称为栈顶元素
	+ 放入——入栈/压栈
    + 拿出——出栈/弹栈

### `Queue`接口
**基本信息**  
**Package** java.util  
`public interface Queue<E>`  

+ 遵循先进先出的原则。
+ 是一种特殊的`Collection`
+ 其线性实现有`ListQueue`

### `Set`接口
**基本信息**  
**Package** java.util  
`public interface Set<E>` 

+ 是散列的`Collection`
+ 元素不可重复
+ 不保证存入顺序
+ 基于哈希码存放
+ 若添加相同元素则抛弃  
  使用equals()比较时，比较实际元素

**重要实现类**  
`HashSet`类  

+ 默认初始容量为 16, 加载因子为 0.75F  
  loadFactor 加载因子/装载因子，`float`类型
+ 每次扩容一倍
+ 是线程不安全的集合
+ `HashSet` 底层基于 `HashMap` 实现，除少数几个方法自己实现外，大部分均调用 `HashMap` 中的方法
+ 去重原理：  
  在加入新元素时，  
  + 首先计算元素的 hashcode 来判断添加的位置；同时计算已加入的所有元素的 hashcode，对比新元素与已有元素的 hashcode 来判断是否重复
  + 如果有相同 hashcode，则调用 `equals()` 检查对象是否相同
  + 若相同则排除元素

::: tip 值得注意的是
在数据结构知识中，栈和队列是一种有着特殊规则的线性表。而在 Java 语言中各个集合类之间的继承、实现关系并不完全符合传统数据结构知识。
:::

## `Map`接口
**基本信息**  
**Package** java.util  
`Interface Map<K,​V>`

+ 以键-值对形式存在的数据结构，其中键是唯一的
+ 遍历`Map`的方法
  + 获取所有键，通过键来获取值
  + 获取键值对组成的集合

**重要实现类**  
`HashMap`类  
+ 默认初始容量是 16, 加载因子为 0.75F，每次扩容一倍
+ 如果手动设置了初始容量，每次扩容后容量为初始容量的 2 的幂次方个
+ 允许键或值为 `null`
+ 异步式线程不安全的映射，不对映射做安全限制
+ 经过 hash 运算后的元素，如果它们的位置相同则会生成链表。在链表长度大于 8 后会进行判断：若当前数组长度小于 64，则先扩容数组；若数组长度大于 64 则将链表转成红黑树）<Badge text="Java 8.0+"/>  

> 在 Java 8 之前，HashMap 的底层设计是数组和链表的组合。HashMap 对要存入元素的 key 的 hashcode 经过扰动函数处理后得到 hash 值。对这个值进行 (n-1) & hash 运算（当容量是二的幂次时，hash % n 与此等价）来找到当前元素的存放位置。若当前位置已经存在元素，则对比当前要存入元素的 hash 与 key 是否和已有元素相同，若相同则覆盖，不同则拉出一条链表。  

::: tip HashMap 元素存取及扩容机制
HashMap 在多线程的情况下会发生线程不安全的情况。  

具体表现为：
+ 在 Java 7 及以前版本会因为扩容而造成环链而死循环或者数据丢失；
+ 在 Java 8 以及之后的版本会因为扩容而造成数据覆盖。  

**元素保存**  
HashMap 通过 `put()` 来保存元素。它的具体逻辑为：  
1. 通过元素的 key 使用 `hashCode()` 获取哈希值，并使用哈希值进行 hash 操作，最后用操作后的哈希值计算 index
2. 如果哈希值无碰撞则放进 bucket
3. 如果哈希碰撞，则以链表形式存储在 bucket
4. 如果碰撞导致链表过长，则把链表转换为红黑树
5. 如果元素结点已存在则替换旧的 value
6. 如果 bucket 满则 resize
``` java
public V put(K key, V value) {
   // 对key的hashCode()做hash
   return putVal(hash(key), key, value, false, true);
}

final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
               boolean evict) {
   Node<K,V>[] tab; Node<K,V> p; int n, i;
   // tab为空则创建
   if ((tab = table) == null || (n = tab.length) == 0)
      n = (tab = resize()).length;
   // 计算index，并对null做处理
   if ((p = tab[i = (n - 1) & hash]) == null)
      tab[i] = newNode(hash, key, value, null);
   else {
      Node<K,V> e; K k;
      // 节点存在
      if (p.hash == hash &&
         ((k = p.key) == key || (key != null && key.equals(k))))
         e = p;
      // 该链为树
      else if (p instanceof TreeNode)
         e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
      // 该链为链表
      else {
         for (int binCount = 0; ; ++binCount) {
               if ((e = p.next) == null) {
                  p.next = newNode(hash, key, value, null);
                  if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
                     treeifyBin(tab, hash);
                  break;
               }
               if (e.hash == hash &&
                  ((k = e.key) == key || (key != null && key.equals(k))))
                  break;
               p = e;
         }
      }
      // 写入
      if (e != null) { // existing mapping for key
         V oldValue = e.value;
         if (!onlyIfAbsent || oldValue == null)
            e.value = value;
         afterNodeAccess(e);
         return oldValue;
      }
   }
   ++modCount;
   // 超过load factor*current capacity，resize
   if (++size > threshold)
      resize();
   afterNodeInsertion(evict);
   return null;
}
```

**元素获取**  
HashMap 通过 `get()` 来获取元素。它的具体逻辑为：  
1. 若 bucket 中的第一个结点是目标元素，则命中
2. 第一个结点未命中则通过 `key.equals(k)` 获取对应的 entry:  
   + 若为树则在树中查找，时间复杂度 O(logn)
   + 若为链表则在链表中查找，时间复杂度 O(n)
``` java
public V get(Object key) {
    Node<K,V> e;
    return (e = getNode(hash(key), key)) == null ? null : e.value;
}

final Node<K,V> getNode(int hash, Object key) {
   Node<K,V>[] tab; Node<K,V> first, e; int n; K k;
   if ((tab = table) != null && (n = tab.length) > 0 &&
      (first = tab[(n - 1) & hash]) != null) {
      // 直接命中
      if (first.hash == hash && // always check first node
         ((k = first.key) == key || (key != null && key.equals(k))))
         return first;
      // 未命中
      if ((e = first.next) != null) {
         // 在树中get
         if (first instanceof TreeNode)
            return ((TreeNode<K,V>)first).getTreeNode(hash, key);
         // 在链表中get
         do {
            if (e.hash == hash &&
               ((k = e.key) == key || (key != null && key.equals(k))))
               return e;
         } while ((e = e.next) != null);
      }
   }
   return null;
}
```
**hash 操作**  
在 `put()` 和 `get()` 中涉及到的 `hash()` 对元素的哈希值进行了扰动：  
``` java
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```
含义为：对哈希值的高 16 位保持不变，但是对低 16 位取异或操作于高 16 位。通过这样的方法，既减少了系统的开销，也不会造成的因为高位没有参与下标的计算(table 长度比较小时)，从而引起的碰撞。  

**Java 7 的扩容机制**  
在 Java 7 中的 `resize()` 定义为：  
``` java{10}
void resize(int newCapacity) {            //传入新的容量
   Entry[] oldTable = table;              //引用扩容前的Entry数组
   int oldCapacity = oldTable.length;
   if (oldCapacity == MAXIMUM_CAPACITY) { //扩容前的数组大小如果已经达到最大(2^30)了
      threshold = Integer.MAX_VALUE;      //修改阈值为int的最大值(2^31-1)，这样以后就不会扩容了
      return;
   }

   Entry[] newTable = new Entry[newCapacity];   //初始化一个新的Entry数组
   transfer(newTable);                          //！！将数据转移到新的Entry数组里
   table = newTable;                            //HashMap的table属性引用新的Entry数组
   threshold = (int) (newCapacity * loadFactor);//修改阈值
}
```
其中它所调用的 `transfer()` 会带来线程不安全问题。`transfer()` 定义为：  
``` java{10,11,12}
void transfer(Entry[] newTable, boolean rehash) {
   int newCapacity = newTable.length;
   for (Entry<K,V> e : table) {
      while(null != e) {
         Entry<K,V> next = e.next;
         if (rehash) {
            e.hash = null == e.key ? 0 : hash(e.key);
         }
         int i = indexFor(e.hash, newCapacity);
         e.next = newTable[i];
         newTable[i] = e;
         e = next;
      }
   }
}
```
在这个算法中，使用了**头插法**来转移元素，它可能会在多线程操作时造成死循环：  


**Java 8 的扩容机制**  
``` java
final Node<K,V>[] resize() {
    Node<K,V>[] oldTab = table;
    int oldCap = (oldTab == null) ? 0 : oldTab.length;
    int oldThr = threshold;
    int newCap, newThr = 0;
    if (oldCap > 0) {
        // 超过最大值就不再扩充了，就只好随你碰撞去吧
        if (oldCap >= MAXIMUM_CAPACITY) {
            threshold = Integer.MAX_VALUE;
            return oldTab;
        }
        // 没超过最大值，就扩充为原来的2倍
        else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY &&
                 oldCap >= DEFAULT_INITIAL_CAPACITY)
            newThr = oldThr << 1; // double threshold
    }
    else if (oldThr > 0) // initial capacity was placed in threshold
        newCap = oldThr;
    else {               // zero initial threshold signifies using defaults
        newCap = DEFAULT_INITIAL_CAPACITY;
        newThr = (int)(DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
    }
    // 计算新的resize上限
    if (newThr == 0) {

        float ft = (float)newCap * loadFactor;
        newThr = (newCap < MAXIMUM_CAPACITY && ft < (float)MAXIMUM_CAPACITY ?
                  (int)ft : Integer.MAX_VALUE);
    }
    threshold = newThr;
    @SuppressWarnings({"rawtypes","unchecked"})
        Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap];
    table = newTab;
    if (oldTab != null) {
        // 把每个bucket都移动到新的buckets中
        for (int j = 0; j < oldCap; ++j) {
            Node<K,V> e;
            if ((e = oldTab[j]) != null) {
                oldTab[j] = null;
                if (e.next == null)
                    newTab[e.hash & (newCap - 1)] = e;
                else if (e instanceof TreeNode)
                    ((TreeNode<K,V>)e).split(this, newTab, j, oldCap);
                else { // preserve order
                    Node<K,V> loHead = null, loTail = null;
                    Node<K,V> hiHead = null, hiTail = null;
                    Node<K,V> next;
                    do {
                        next = e.next;
                        // 原索引
                        if ((e.hash & oldCap) == 0) {
                            if (loTail == null)
                                loHead = e;
                            else
                                loTail.next = e;
                            loTail = e;
                        }
                        // 原索引+oldCap
                        else {
                            if (hiTail == null)
                                hiHead = e;
                            else
                                hiTail.next = e;
                            hiTail = e;
                        }
                    } while ((e = next) != null);
                    // 原索引放到bucket里
                    if (loTail != null) {
                        loTail.next = null;
                        newTab[j] = loHead;
                    }
                    // 原索引+oldCap放到bucket里
                    if (hiTail != null) {
                        hiTail.next = null;
                        newTab[j + oldCap] = hiHead;
                    }
                }
            }
        }
    }
    return newTab;
}
```
:::

`HashTable`类
+ 默认初始容量为 11, 加载因子为 0.75F
+ 每次扩容后容量变成原来的 2n+1
+ 不允许键或值为 `null`
+ 同步式线程安全的映射
  + 对外公开的涉及到键值对的操作方法都是同步方法（被 `synchronized` 修饰）
  + 锁对象是 `this`，`HashTable` 以本身对象作为锁对象

`ConcurrentHashMap`类
+ 异步式线程安全的映射
+ 引入分段锁（分桶锁）
详情见[ConcurrentMap](#concurrentmap接口)  

## Stream <Badge text="Java 8.0+"/>
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

## 并发
**基本信息**  
**Package** java.util.concurrent

### `BlockingQueue`接口
**基本信息**  
`public interface BlockingQueue<E>`  

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
            
   5. `remove(object)`  
      + 非阻塞
      + 队空，不报错
          
   6. `remove()`  
      + 非阻塞
      + 队空则抛异常`NoSuchElementException`
            
   7. `poll()`  
      + 非阻塞
      + 队空返回`null`
            
   8. `poll(timeout, TimeUnit.xxx)`  
      + `timeout`期间内一直尝试移除队首，若超时未添加成功则返回`null`
          
   9. `take(object)`  
      + 阻塞
      
2. `PriorityBlockingQueue`类  
   + 无界
   + 不允许元素为空
   + 队列中元素对应的类必须实现`Comparable`接口  
     重写`compareTo()`来进行排序  
     + 自然排序，升序
	  + 不保证迭代遍历时的顺序
     + 保证逐个取出时的顺序

3. `SynchronousQueue`类  
   只能保存单个元素

### `BlockingDeque`接口
**基本信息**  
`public interface BlockingDeque<E>`  

+ 双向队列
+ 继承自`BlockingQueue`

### `ConcurrentMap`接口
**基本信息**  
`public interface ConcurrentMap<K,​V>`  

**重要实现类/接口**  
1. `ConcurrentHashMap`类  
   + 映射底层依靠键值对存储数据，默认大小为 16
	+ 数组的每一个位置维系了一个链表
	+ 经过一定位运算分布到 16 个桶中  
     当元素碰撞时，两元素键对比；若相同，则覆盖。不同则生成链。
   + 加载因子 `0.75f`  
     避免桶中元素太多影响效率，引入加载因子;  
     当达到一定规模，如使用到 $0.75*16=12$ 个桶以后时，则对桶的数量扩增。之后重新计算全部哈希码，重新排布（Rehash）

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


### `CountDownLatch`类
**基本信息**  
`public class CountDownLatch`

+ 递减锁
+ 在构造时传入，线程执行之后`await()`
+ 计数线程全部执行完成（进行 countdown 来递减）之后执行`await()`之后的代码
+ 适合于不同线程进行计数

**实例代码**  
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

### `CyclicBarrier`类
**基本信息**  
`public class CyclicBarrier`  

+ 栅栏
+ 在构造时传入，需要阻塞的地方`await()`
+ 没`await()`一次计数减少一次，直到减为 0 放开阻塞
+ 适合于同一线程类产生多个线程计数

**实例代码**  
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

### `Exchanger`类
**基本信息**  
`public class Exchanger<V>`

+ 交换机
+ 用与交换两个线程的信息

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

### `Semaphore`类
**基本信息**  
`public class Semaphore`  

+ 信号量
+ 用于限制某段代码在某个时间段内最多只能有规定线程书目进入访问
+ 每个线程进入的时候需要进行`acquire()`操作，使得信号量`-1`，知道为`0`
+ 若有新的线程来访问则会在`acquire()`操作阻塞，直到之前的某线程`release()`

**实例代码**  
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
`Executor`提供了以下线程池：`CachedThreadPool`、`ScheduledThreadPool`, `FixedThreadPool`, `SingleThreadExecutor` 和 `ForkJoinPool`。  

+ `CachedThreadPool`
  + 缓存线程池
  + 小队列大池（无界线程池）
  + 无核心线程，临时线程存活时间短（自动回收多余线程）
  + 能够较好应用高并发场景
  + 不适合长任务场景
  ``` java
  ExecutorService executorService = Executors.newCachedThreadPool();
  ```
  + 在源码中使用 ThreadPoolExecutor 创建线程池，参数设定 corePoolSize 为 0，maxPoolSize 为 Integer.MAX_VALUE 来允许任意多任务并发操作。keepAliveTime 为 60L. 使用 SynchronousQueue 作为任务队列，队列中无容量，仅用作队列与线程中间简单交换。可能会因为线程过多而发生内存超限。

+ `ScheduledThreadPool`  
  + 周期性的线程池
  + 使用 `schedule()` 传入参数：任务，延迟时间，时间单位来执行延迟任务
  + 使用 `scheduleAtFixedRate()` 传入参数：任务，起始延迟时间，执行周期，时间单位来执行定时任务
  ``` java
  ExecutorService executorService = Executors.newScheduledThreadPool(5);
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

+ `SingleThreadExecutor`  
  + 类似 `FixedThreadPool`，源码使用 ThreadPoolExecutor 创建线程池，参数设定 corePoolSize 与 maxPoolSize 相同，都为 1,  keepAliveTime 为 0L, 使用 LinkedBlockingQueue 来充当任务队列。  
  + 
+ `ForkJoinPool`
  + 分叉合并（不推荐使用）

+ `WorkStealingPool` <Badge text="Java 1.8+"/>  
  + 适用于有子任务的情况  
  + 线程之间可以窃取资源来提升并行能力，但不保证执行顺序

|线程池|corePoolSize|maxpoolSize|keepAliveTime|workQueue|
|:--:|:--:|:--:|:--:|:--:|
|FixedThreadPool|参数列表接收|与 corePoolSize 相同|0s|LinkedBlockingQueue（无界队列）|
|SingleThreadExecutor|1|1|0s|LinkedBlockingQueue（无界队列）|
|CachedThreadPool|0|Integer.MAX_VALUE|60s|SynchronousQueue（直接交换简单队列）|
|ScheduledThreadPool|参数列表接收|Integer.MAX_VALUE|10s|DelayedWorkQueue（优先队列）|
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
+ `awaitTermination()`  
  + 开始后进入阻塞状态，检测时间内线程池任务是否会完全终止并返回结果。传入参数：中止时间，时间单位。
+ `shutdownNow()`  
  + 立刻关闭线程池。线程中的线程获取到了 interrupted 信号，队列中的任务返回为 runnableList.

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



### 锁与原子操作
+ 锁
  + 类似`synchronized`机制，但更加灵活
  + 公平策略与非公平策略
    + `synchronized`为非公平策略
    + `Lock`接口  
      **基本信息**  
      **Package** java.util.concurrent.locks  

      `public interface Lock`  

      **具体实现类**  
      `ReentrantLock`类  
      + 默认为非公平策略，可设置为公平策略
      + 通过`lock()`上锁，`unlock()`解锁
  + 读写锁`ReadWriteLock`
     + 使用时允许多个线程同时使用统一资源，但只允许一个线程对资源进行写操作
     + 读期间不允许进行写操作，写期间不允许进行读操作
+ 原子操作
  操作时不允许其他操作

## `Iterator`接口
**基本信息**  
**Package** java.util  
`public interface Iterator<E>`

<Badge text="Java SE 5.0+"/>  
+ 通过指针挪动遍历集合
+ 遍历过程中不允许增删原集合
+ 若一个对象允许使用 foreach 遍历，该类必须实现`Iterable`接口

## `Collections`类
**基本信息**  
**Package** java.util  
`public class Collections`

操作集合的工具类，提供了对集合的各种操作方法。它也对原生集合进行了封装，提供了线程安全的集合(Synchronized)和不可变集合(Unmodifiable)。  

**重要方法**  
`compare(T o1, T o2)`  
  + 返回正负值来确定大小  
  + 若为正则第一个数排到第二个数之后；反之排到其前  
  + 若没有指定排序规则， 必须实现`Comparable`接口，比较规则写在`compareTo()`中

## `Properties`类
**基本信息**  
**Package** java.util  
`public class Properties`

+ 是一个可以持久化的映射
+ 键和值默认为`String`类型
+ `Properties`对象必须存储到`properties`文件中
+ `properties`文件中不能存储中文，会变成对应的编码

**重要方法**  
`setProperty("键","值")`  
`store(输出流, comments)`  
`load(输入流)`  

## `Scanner`类
**基本信息**  
**Package** java.util  
`public final class Scanner`

使用`Scanner`可以从控制台读取数据。

``` java
Scanner sc = new Scanner(System.in);
String name = sc.nextLine();
```

::: warning 注意
除了`nextLine()`，其余都是以空格为结束符
:::
