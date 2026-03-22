---
prev:
    text: 'Stream'
    link: 'java/api-util-stream'
next:
    text: '线程池与 ExecutorService'
    link: 'java/api-util-concurrent-executor'
---

# 其他工具类
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
