---
prev:
    text: '日期'
    link: 'java/api-util-date'
next:
    text: 'Map 接口'
    link: 'java/api-util-map'
---

# 集合
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
