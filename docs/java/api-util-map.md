---
prev:
    text: '集合'
    link: 'java/api-util-collection'
next:
    text: 'Stream'
    link: 'java/api-util-stream'
---

# Map 接口
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
详情见[ConcurrentMap](./api-util-concurrent-containers)  
