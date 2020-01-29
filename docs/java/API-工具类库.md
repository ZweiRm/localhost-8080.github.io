---
prev: ./面向对象
next: false
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
+ 默认初始容量为10；扩容时，在上一次的基础上扩容一半容量
+ 线程不安全的集合
+ 内存空间连续 
+ 增删元素比较慢

`LinkedList`类
+ 基于链表实现，增删快，查询慢
+ 线程不安全的集合
![LinkedList](/img/LinkedList.png)

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

::: tip 值得注意的是
在数据结构知识中，栈和队列是一种有着特殊规则的线性表。而在 Java 语言中各个集合类之间的继承、实现关系并不完全符合传统数据结构知识。
:::

## 并发
**基本信息**  
**Package** java.util.concurrent

### `BlockingQueue`接口
**基本信息**  
`public interface BlockingQueue<E>`  

**重要实现类**  
`ArrayBlockingQueue`类  
是基于数组且有界的阻塞队列。  

​	​	**重要方法**  
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
   
### `BlockingDeque`接口

### `ConcurrentMap`接口

### `CountDownLatch`类

### `CyclicBarrier`类

### `Exchanger`类

### `Semaphore`类

### `ExecutorService`接口

### 锁与原子操作

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

操作集合的工具类  

**重要方法**  
`compare(T o1, T o2)`  
  + 返回正负值来确定大小  
  + 若为正则第一个数排到第二个数之后；反之排到其前  
  + 若没有指定排序规则， 必须实现`Comparable`接口，比较规则写在`compareTo()`中

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
+ 默认初始容量是 16, 加载因子为 0.75F
+ 每次扩容一倍
+ 允许键或值为`null`
+ 异步式线程不安全的映射，不对映射做安全限制

`HashTable`类
+ 默认初始容量为 11, 加载因子为 0.75F
+ 不允许键或值为`null`
+ 同步式线程安全的映射
  + 对外公开的涉及到键值对的操作方法都是同步方法
  + 锁对象是`this`，`HashTable`以本身对象作为锁对象

`ConcurrentHashMap`类
+ 异步式线程安全的映射
+ 引入分段锁（分桶锁）
详情见[ConcurrentMap](#concurrentmap接口)  

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

::: warning 注意
除了`nextLine()`，其余都是以空格为结束符
:::
