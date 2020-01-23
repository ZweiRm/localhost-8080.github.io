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
### `Collcetion`类
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

**具体实现类**  
`ArrayList`类
+ 默认初始容量为10；扩容时，在上一次的基础上扩容一半容量
+ 线程不安全的集合
+ 内存空间连续 
+ 增删元素比较慢

`LinkedList`类
+ 基于链表实现，增删快，查询慢
+ 线程不安全的集合
## `Iterator`接口

## `Collections`类

## `Map`接口

## `Properties`类

## `Scanner`类