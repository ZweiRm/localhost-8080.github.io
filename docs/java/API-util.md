---
prev: ./API-lang2
next: ./API-util2
---

# API-工具类库 (Package `java.util`)
## 5.1 日期
### 5.1.1 `Date`类
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

### 5.1.2 `Calendar`类
**基本信息**  
**Package** java.util  
`public abstract class Calendar`  

+ 使用静态方法`static Calendar getInstance()`来获取一个`Calendar`类实例。  

## 5.2 集合
### 5.2.1 `Collcetion`接口
**基本信息**  
**Package** java.util  
`public interface Collection<E>`  

+ 是集合类的顶级接口
+ 其中`<E>`是泛型，代表该集合只能存储`E`类的数据作为元素(element)，且必须是引用数据类型。   
  如：`Collection<String>`限定集合中只能存储`String`类的数据。

### 5.2.2 `List`接口
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

### 5.2.3 `Queue`接口
**基本信息**  
**Package** java.util  
`public interface Queue<E>`  

+ 遵循先进先出的原则。
+ 是一种特殊的`Collection`
+ 其线性实现有`ListQueue`

### 5.2.4 `Set`接口
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

## 5.3 `Map`接口
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
*造成死循环*  
在这个算法中，使用了**头插法**来转移元素，它可能会在多线程操作时造成死循环：  
[分析]  
假设初始 bucket 为 2, 现在有三个元素，key 为 3 5 7，都保存在第一个 bucket 中，进行 `resize()`.  
在单线程情况下，它会按照这样的结果进行变化：  
![单线程](/img/hashmap/单线程.jpg)  

多线程情况下，假设线程 1 在 `newTable[i] = e;` 一句挂起，则当前变化为：  
![多线程1](/img/hashmap/多线程1.jpg)  
线程 2 继续运行，完成后续步骤。最后结果为：  
![多线程2](/img/hashmap/多线程2.jpg)  
线程 1 继续运行，虽然挂起前它的状态存储为 `e->3`, `next->7`, `newTable[3] = null`，但是从线程 2 更新后的主内存结果继续后续操作时运行结果为：  
![多线程3](/img/hashmap/多线程3.jpg)  
循环继续，处理 `e->7`, 经过操作后结果为：  
![多线程4](/img/hashmap/多线程4.jpg)  
循环继续，处理 `e->3`, 经过操作后结果为：  
![多线程5](/img/hashmap/多线程5.jpg)  
当前 `e->null` 循环结束。  
因为出现循环链表，当使用该 HashMap 遍历时就会发生死循环。  

*造成数据丢失*  
[分析]  
假设初始 bucket 为 2, 现在有三个元素，key 为 7 5 3，都保存在第一个 bucket 中，进行 `resize()`.  
![多线程6](/img/hashmap/多线程6.jpg)  
多线程情况下，假设线程 1 在 `newTable[i] = e;` 一句挂起，则当前变化为：  
![多线程7](/img/hashmap/多线程7.jpg)  
线程 2 继续运行，完成后续步骤。最后结果为：  
![多线程8](/img/hashmap/多线程8.jpg)  
线程 1 继续运行，虽然挂起前它的状态存储为 `e->7`, `next->5`, `newTable[3] = null`，但是从线程 2 更新后的主内存结果继续后续操作时运行结果为：  
循环继续，处理 `e->5`, 经过操作后结果为：  
![多线程9](/img/hashmap/多线程9.jpg)  
当前 `e->null` 循环结束。  
元素 3 丢失，且链表有环路。  

**Java 8 的扩容机制**  
在 Java 8 中，`resize()` 定义为：  
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
当超过限制的时候会 resize，然而又因为我们使用的是 2 次幂的扩展(指长度扩为原来 2 倍)，所以，**元素的位置要么是在原位置，要么是在原位置再移动 2 次幂的位置**。  
它的 `hash()` 定义为 `h^(h>>>16)`.  
假设当前有两个 key 被分在了同一个 bucket 中，现在进行 rehash:  
当长度 n 变为原来的 2 倍后，在重新计算位置的时候就需要额外考虑新的高 1 位.  
那么就有两种情况，最高位为 0 或最高位 为 1: 
```
Old:
n-1   0000 0000 0000 0000 0000 0000 0000 1111
key1  1111 1111 1111 1111 0000 1111 0000 0101
key2  1111 1111 1111 1111 0000 1111 0001 0101

New:
n-1   0000 0000 0000 0000 0000 0000 0001 1111
key1  1111 1111 1111 1111 0000 1111 0000 0101
key2  1111 1111 1111 1111 0000 1111 0001 0101
```
也就是说，原来因为低 4 位都为 0101 (5) 而被分到同一个 bucket 中的元素，在 rehash 后，它们可能会被分在 00101 (5) 或 10101 (21, 5+16). 即新位置只会在原位或再移动 2 次幂的位置。  
利用这个特性，在扩容的时候不需要重新计算 hash，只需要看新增的 1 位是 1 还是 0 就可以确定它的新位置。  

*数据覆盖*  
在这个算法中，使用了**尾插法**来转移元素，它可能会在多线程操作时造成数据覆盖：  
[分析]
当两个线程拥有相同的哈希值且目标位置为 `null` 时，它们都会进入 `if ((p = tab[i = (n - 1) & hash]) == null)` 这个判断中。  
这时假设线程 1 进入判断但是未存储数据时被挂起，而线程 2 进入并完成元素插入。之后线程 1 继续执行，这时不需要再进行哈希判断，则线程 1 会将线程 2 已经存入的数据覆盖掉。  
:::

`Hashtable`类
+ 默认初始容量为 11, 加载因子为 0.75F
+ 每次扩容后容量变成原来的 2n+1
+ 不允许键或值为 `null`
+ 同步式线程安全的映射
  + 对外公开的涉及到键值对的操作方法都是同步方法（被 `synchronized` 修饰）
  + 锁对象是 `this`，`HashTable` 以本身对象作为锁对象

`ConcurrentHashMap`类
+ 异步式线程安全的映射
+ 引入分段锁（分桶锁）
详情见[ConcurrentMap](./API-util2.html#concurrentmap接口)  

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

## 5.5  `Iterator`接口
**基本信息**  
**Package** java.util  
`public interface Iterator<E>`

<Badge text="Java SE 5.0+"/>  
+ 通过指针挪动遍历集合
+ 遍历过程中不允许增删原集合
+ 若一个对象允许使用 foreach 遍历，该类必须实现`Iterable`接口

## 5.6 `Collections`类
**基本信息**  
**Package** java.util  
`public class Collections`

操作集合的工具类，提供了对集合的各种操作方法。它也对原生集合进行了封装，提供了线程安全的集合(Synchronized)和不可变集合(Unmodifiable)。  

**重要方法**  
`compare(T o1, T o2)`  
  + 返回正负值来确定大小  
  + 若为正则第一个数排到第二个数之后；反之排到其前  
  + 若没有指定排序规则， 必须实现`Comparable`接口，比较规则写在`compareTo()`中

## 5.7 `Properties`类
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

## 5.8 `Scanner`类
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
