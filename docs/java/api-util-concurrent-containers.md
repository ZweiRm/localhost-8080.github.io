---
prev:
    text: 'Callable 与 Future'
    link: 'java/api-util-concurrent-callable-future'
next:
    text: '同步工具'
    link: 'java/api-util-concurrent-sync-tools'
---

# 并发容器
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
