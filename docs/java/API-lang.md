---
prev: ./API-introduction
next: ./API-util
---

# API-语言基础类库 (Package `java.lang`)
## `Object`类

### 基本信息
**Package** java.lang  
`public class Object`

+ `Object`类是所有类的父类。在 Java 中处于顶级父类的地位，是类层级结构的根类。  

+ 任何类对象都可以用`Object`类的对象来接收。

### 重要方法
1. `clone()`  
   + 克隆一个对象。  

   + 当一个对象要被克隆时，**它所对应的类必须实现`Cloneable`接口**。  

   + 克隆完成后会产生一个新的对象。**新对象和原对象的地址不同，但属性值相同**。  

   + `Cloneable`接口  
     其中没有任何属性和方法，仅用于标识此类产生的对象可以被克隆。

2. `finalize()`
   + 通知`GC`回收当前对象。

   + 即使`GC`已经开始运行，也只回收当前对象而不回收其他对象。

   + <span style="color:#3eaf7c">* `System.gc()`通知`GC`回收所有可以回收的对象。→[`System`类](#_4-2-2-system类)</span>

3. `getClass()`  
   获取对象的运行时类对象（如，后续可用于反射）。

4. `hashCode()`  
   获取该对象的哈希码值，在一定范围内可以认为是唯一的。哈希码为一串 32 位的二进制数据。

5. `toString()`  
   打印对象。实际调用对象本身的`toString()`。

6. `equals(Object obj)`  
   比较两个对象是否相等。默认比较对象的地址，但对于`File`，`String`，`Date`和包装类来说，它们比较地是对象值。  
   ::: tip 特别地
   当手动重写`equals()`时，思路为:  
   1. 判断地址是否一致(`if (this == obj)`)

   2. 判断参数是否为空(`if (obj == null)`)

   3. 判断类型是否一致(`if (this.getClass() != obj.getClass())`)
   
   4. 判断属性值是否一致
   :::

## `System`类

### 基本信息

**Package** java.lang

`public final class System`

+ `System`类提供了标准输入输出、错误输入输出和一些访问系统属性的方法。  

+ 它是一个静态类，不能被继承，不能被实例化，所有方法都是静态方法。

### 重要方法

1. `static void gc()`

   强制 Java 虚拟机启动垃圾回收机制，收集内存中所有不再被引用的对象所占用的内存空间。

2. `static void exit(int status)`

   强制终止当前正在运行的 Java 虚拟机，并将参数`status`返回给系统。通常来讲，`status`为 0 表示正常终止；非 0 表示异常终止。

3. `static long currentTimeMillis()`  
   返回从 1970 年 1 月 1 日到当前系统时间的毫秒数。

::: tip 关于<code>System</code>类的属性
+ `in`  
  从键盘输入信息，只能按字节读取

+ `out`  
  将信息标准输出到显示器（是`PrintStream`类的对象，声明：`static final PrintStream out`）

+ `err`  
  将错误提示信息（使用红色字体）输出到显示器（是`PrintStream`类的对象，声明：`static final PrintStream err`）

*这三个属性都是字节流，见 [I/O Stream](./API-输入输出类库.html/#i-o-stream).
:::

## 异常
异常是一套处理和反馈问题的机制。

### 基本信息

**Package** java.lang

`public class Throwable`

+ `Throwable`类是异常 (Exception) 和错误 (Error) 的父类。

+ 错误无法处理，而异常可以处理。

### `Exception`
**分类**
+ 编译时异常（或称已检查异常）：编译期出现的异常，要求必须处理，抛出或者捕获。  
  如：`CloneNotSupportedException`和`ParseException`

+ 运行时异常（或称未检查异常）：编译期不报错，但运行时出现。在编译期处理与否均可，往往非语法错误。  
  如：`ArithmeticException`、`ArrayIndexOutOfBoundException`、`NullPointerException`、`ClassCastException`和`NumberFormatException`

+ 自定义异常：编程者通过继承某个异常类自己编写的异常。  

::: tip 关于异常处理
+ 运行时异常可以随意抛出和捕获

+ 编译时异常只能在抛出时捕获
:::

::: tip 关于异常捕获
+ 使用多个`catch`来分别捕获不同的异常  

+ 可以捕获一个父类异常，统一处理

+ 在一个`catch`语句中，可以使用`|`分割不同的异常来分组处理，避免了写多个`catch`语句<Badge text="> Java SE 7.0"/>    

+ 当一个方法声明抛出父类异常时，处理中必须处理父类异常

+ 在捕获异常时，需要先捕获子类异常再捕获父类异常
:::

::: tip 关于 finally
无论是否发生异常都会执行
:::

### `Error`
错误。不应试图捕获的严重问题。无法处理。

## 线程
### 基本信息
**Package** java.lang  
`public class Thread`

### 进程与线程
+ 线程是操作系统中的重要概念之一，是程序运行的基本单元。  

+ 进程是线程的集合。每一个进程可以创建一个或多个线程。

### 自定义线程
线程执行没有顺序性，相互抢占资源。这个抢占过程不只存在于线程执行的开始，而是存在于执行的全过程。在这种抢占模式下，会导致不合常理的情况发生（多线程并发安全问题）。  

+ 继承`Thread`类
  + 在`run()`中重写线程执行逻辑。  

  + 类实例通过`start()`启动线程。

+ 实现`Runnable`接口
  + 重写`run()`。

  + 通过`Thread`类对象启动线程。

+ 实现`Callable<T>接口`
  + 重写`call()`

### 线程同步
使用`synchronized`关键字来同步多个线程，一定程度上解决线程冲突。  

**同步代码块**  
``` java
   synchronized(同步锁 *所有线程可见*) {
      …
   }      
```
可以传入类字节码，`this`对象，共享资源

**同步方法**  
   使用`synchronized`修饰方法，此时锁对象为`this`对象。

### 线程通信
通过等待唤醒机制调节线程之间的执行顺序。  

线程在等待期间存在于线程池中，线程池本质上是一个存储线程的队列。  
A1 A2 C1 C2 → ()  
A1(Running)  
A1 A2 C1 C2 → ()  
A1(Running, <font color="red">wait()[A1]</font>)  
A2 C1 C2 → (A1)  
A2(Running, <font color="red">wait()[A2]</font>)  
C1 C2 → (A1 A2)  
C1(Running, <font color="green">notify()[A1]</font>)  
A1 C1 C2 → (A2)  
C1(Running, <font color="red">wait()[C1]</font>)  
A1 C2 → (A2, C1)  
C2(Running, <font color="red">wait()[C2]</font>)  
A1 → (A2, C1, C2)  
A1(Running, <font color="green">notify()[A2]</font>)  
A1 A2 → (C1, C2)  
A1(Running, <font color="red">wait()[A1]</font>)  
A2 → (C1, C2, A1)  
A2(Running, <font color="red">wait()[A2]</font>)  
   → (C1, C2, A1, A2)  

`sleep()`需要制定睡眠时间，结束自然恢复。释放执行权，不释放锁对象，在`Thread`类中，为静态方法
`wait()`可以指定等待时间，也可不指定，此时需要唤醒。释放执行权，释放锁对象。在`Object`类中，为普通方法。必须结合锁使用（两对象相同）。

### 死锁
**产生原因**  
多个线程；共享资源过多；锁对象不统一；锁嵌套。  

**避免死锁**  
统一锁对象、减少锁嵌套。  

**同步与异步**
+ 若某对象在某时间段内只允许一个线程操作即为同步，反之异步。

+ 同步一定安全。

+ 不安全一定异步。

### 线程状态
![线程状态](/img/线程状态.png)
+ 阻塞：不执行代码抢占资源

+ 冻结：不执行代码，不抢占资源

### 守护线程
+ 守护其他线程的执行，被守护线程结束后，守护线程无论完成与否随之结束

+ 只要代码中出现守护线程，程序中的线程只能是守护线程或者被守护线程  
  若存在多个被守护线程，则最后一个被守护线程为结束标志

### 线程优先级
+ 线程拥有 1-10 共十级优先级 

+ 优先级越高，理论上抢到资源的概率越大

+ 相邻两个优先级几乎没有差别  
  相差5级以上，略有差别

## 枚举
### 基本信息
**Package** java.lang  
`public abstract class Enum<E extends Enum<E>>` 

+ 取值固定且能一一列举

+ 枚举常量必须定义在首行，用`,`隔开，以`;`结尾

+ 枚举类中允许定义属性和方法

+ 枚举类构造函数默认且只能为私有  
  可以携带参数，在枚举后添加括号

+ 可以定义抽象方法，以匿名内部类的形式实现

+ `switch(表达式)`  
  表达式值新添Enum常量

## `String`类
### 基本信息
**Package** java.lang  
`public final class String`  

+ `String`类是一个最终类，表示字符串。

+ 所有字符串都是`String`类的实例。

+ 字符串是常量，创建后不可更改，但可以被共享。

### 重要方法
1. `char chatAt()`  
   获取字符串指定下标字符。

2. `int length()`  
   获取字符串长度。

3. `char[] toCharArray()`  
   将字符串转化为字符数组。

4. 其他不改变原串的方法  
   |方法|描述|备注|
   |--|--|--|
   |`int compareTo(String another)`|判断两个字符串大小，根据返回值正负来确定|
   |`String concat(String str)`|拼接字符串，不该面原字符串||
   |`boolean contains(String str)`|是否包含该子串||
   |`boolean equals(Object o)`|是否相等||
   |`byte[] getBytes()`|将字符串转化为字节数组|通过`String`的构造方法将字节数组转化为字符串|
   |`int indexOf(int ch, int index)`|指定下标开始寻找指定字符第一次出现的位置||
   |`static String valueOf()`|将传入值转换为字符串|传入对象则会调用对象的`toString()`；<br>传入字符数组对象，则打印其内容|
   |`String replaceAll(String reg, String str)`|替换指定内容||
   |`boolean matches(String reg)`|是否匹配指定规则||
   |`String[] split(String reg)`|按指定规则切割字符串|作为切割的符号会被消除；<br>若两个切割符号相连，则会被分出一个空字符串`""`|


::: tip 特别地
+ 拼接字符串可以使用运算符"`+`"，本质上 Java 编译器会调用`StringBuffer`（或类似技术）来实现这个拼接操作。

+ 拼接多个字符串建议使用`StringBuilder`类，少量字符串使用`+`运算符

+ `StringBuilder`和`StringBuffer`使用方法完全一致
  + `StringBuilder`线程不安全

  + `StringBuffer`线程安全

+ 故代码：  
  **Input**
  ``` java
  String s = "a";
  s += "b";
  ```
  实际上的执行效果是：
  ``` java
  String s = "a";
  s = new StringBuilder("a").append("b").toString();
  ```
  在最后的`toString()`中生成了新的字符串对象，类似于（真实过程更加复杂）：
  ``` java
  s = new String ("ab");
  ```

**分析代码**  
**Input**
  ``` java
  String s1 = "ab";
  String s2 = new String("ab");
  String s4 = "a";
  s4 += "b";
  ```

  1. 第一句
     ``` java
     String s1 = "ab";
     ```
     内存图：  
     ![String s1 = "ab";](/img/String_01.jpg)
  
  2. 第二句
     ``` java
     String s2 = new String("ab");
     ```
     内存图：  
     ![String s2 = new String("ab");](/img/String_02.jpg)

  3. 第三句
     ``` java
     String s4 = "a";
     ```
     内存图：  
     ![String s4 = "a";](/img/String_03.jpg)

  4. 第四句
     ``` java
     s4 += "b";
     ```
     由`StringBuilder`实现`+=`操作，具体步骤为：  
     1. 生成`StringBuilder`对象  
        ``` java
        new StringBuilder("a")
        ```
        内存图：  
        ![new StringBuilder("a")](/img/String_04.jpg)

      2. `StringBuilder`对象取`append()`方法拼接字符串  
         ``` java
         new StringBuilder("a").append("b")
         ```
         内存图：
         ![new StringBuilder("a").append("b")](/img/String_05.jpg)  
         堆内存`0x3f4c`断开与常量"a"(`0x45fa`)的链接，转而链接常量"ab"(`0x003d`)。
     
      3. 调用`toString()`生成新的`String`对象  
         ``` java
         new StringBuilder("a").append("b").toString()
         ```
         内存图：  
         ![new StringBuilder("a").append("b").toString()](/img/String_06.jpg)  
     
      4. 将新生成的`String`对象的管理权交给`s4`（赋值）  
         ``` java
         s4 = new StringBuilder("a").append("b").toString();
         ```
         内存图：  
         ![s4 = new StringBuilder("a").append("b").toString();](/img/String_07.jpg)
         栈内存内`s4`断开与常量"a"(`0x45fa`)的链接，转而链接堆内存`0x7bce`。

      5. 结束操作，最终结果  
         内存图：  
         ![完成](/img/String_08.jpg)
:::

::: tip 关于编码
按照某些规律将字符映射成字节。这个记录规则就是编码表
|名称|内容|特点|
|--|--|--|
|ASCII|0 至 127|不完全|
|西欧码表 ISO-8859-1|西欧字符|一个字母占 1 字节|
|GB2312|常见基本简体汉字和部分常用繁体汉字|一个字符占 2 字节|
|UTF-8|常见语言的常见字符|一个字符占 3 字节
:::

→ [关于`Scanner`类](#scanner类)

### 正则表达式
正则表达式本质上是**指定匹配**或**筛选规则**的一系列表达式。

**规则**  
+ 元字符与限定符：正则表达式中含有表达特殊意义的字符，这些字符成为元字符；在正则表达式中，需要表示元字符出现次数等逻辑规则时，使用限定符来表示。  

+ 在 Java 中，由于使用`\`转义且某些元字符中本身包含`\`，故在使用时需要写作`\\`。如：表示任意一个数字的正则表达式在 Java 中写作`\\d`。  

|元字符/限定符|描述|
|--|--|
|`.`|任意字符|
|`\d`|0至9任意一个数字|
|`\D`|任意一个非数字|
|`\s`|空格类字符，如`\t`, `\n`, `\x0B`, `\f`, `\r`|
|`\S`|任意一个非空格类字符|
|`\w`|除`$`外的可用于标识符的字符（字母(a-zA-Z)、数字(0-9)、下划线(_)）|
|`\W`|任意一个不能用于标识符的字符|
|`^`|串开头|
|`$`|串结尾|
|`|`|或|
|`+`|出现1次或多次|
|`?`|出现0次或1次|
|`*`|出现0次或多次|
|`{n}`|出现n次|
|`{n,}`|出现至少n次|
|`{n,m}`|出现n至m次|
|`()`|捕获组|
|`[]`|单个字符|
|`\n`|编号为n的捕获组|

> **这里：{n,m|n,m∈N<sub>+</sub>}**

**捕获组**
+ 起编号作用  

+ 从左括号出现的位置开始计算  

例如：`(A((BC(D))E))F)`  
|捕获组|内容|
|--|--|
|`\\1`|`A((BC(D))E)`|
|`\\2`|`(BC(D))E`|
|`\\3`|`BC(D)`|
|`\\4`|`D`|
|`\\5`|`F`|

**`String`类中的使用**  
+ 使用`boolean matches(String regex)`来使用正则表达式验证字符串是否符合规则。  

+ `String`类还提供了其他的验证规则函数，如：`boolean startsWith(String prefix)`用来验证是否由某字符串打头。
> ---

## 包装类
### 基本信息
对于每种基本数据类型, Java 都提供了与其对应的类。这些类称为包装类。  

| 基本数据类型 | `byte` | `short` | `int`     | `long` | `float` | `double` | `char`      | `boolean` |
| :----------: | :----- | ------- | --------- | ------ | ------- | -------- | ----------- | --------- |
|    包装类    | `Byte` | `Short` | `Integer` | `Long` | `Float` | `Double` | `Character` | `Boolean` |

> `int`和`char`所对应的包装类为单词的全拼。

### 装箱

将**基本数据类型转换为对应的引用数据类型对象**的操作。

### 自动装箱 <Badge text="Java SE 5.0+"/>

将一个**基本数据类型变量直接赋值给对应的引用数据类型对象**。本质上调用了对应的`valueOf()`。

例如：

```java
Integer integer = 3;
```

相当于：

```java
Integer integer = Integer.valueOf(3);
```

::: warning 注意
所有相同类型地包装类对象之间值的比较，应当全部使用equals()。  

在值范围在 -128 到 127内的赋值，Integer对象会在IntegerCache.cache中产生，会服用已有对象。此时使用==比较是安全的。  
但在范围之外的所有数据会在堆中产生，不会复用已有对象。  
故推荐全部使用equals()来规避风险。
:::

### 自动拆箱 <Badge text="Java SE 5.0+"/>

将一个引用数据类型对象直接赋值给对应基本数据类型变量。本质上调用了对象的`xxxValue()`。

例如：

```java
int i = integer;
```

相当于：

```java
int i = integer.intValue();
```

当发生基本数据类型和包装类运算时，会发生自动拆箱。

::: tip 关于哈希码

+ 整数的哈希码是其本身，但小数的哈希码需要经过计算才能得到。

+ 字符的哈希码是其对应的编码。

+ 布尔类型的哈希码为特殊值，如`true`的哈希码为`1231`；`false`为`1237`。

+ 八种基本数据类型的哈希码都为固定值。

:::

## `Math`类
### 基本信息
**Package** java.lang  
`public final class Math`

`Math`类是一个最终类，其构造函数是私有的。

该类提供了一系列静态方法，这些方法实现了基本的数学运算，如三角函数、绝对值、平方根等。

### 重要方法
1. `static double ceil(double a)`  
   向上取整

2. `static double floor(double a)`  
   向下取整

3. `static long round(double a)`/`static int round(float a)`  
   四舍五入

4. `static double sqrt(double a)`  
   求平方根

5. `static double pow(double a, double b)`  
   求幂 (a<sup>b</sup>)

6. `static double random()`  
   返回一个随机数 (0.0≤x<1.0)

### `strictfp`关键字

精确浮点(strict float point)，用于修饰类、接口和方法。

被修饰的代码在执行中以80位二进制数来运算小数，结果会保留为64位。

::: tip 特别的

当适用精确运算时，Java 提供了`BigDecimal`类。

这个类中对基础运算（如加、减、乘、除）提供了方法支持，故，不能使用运算符（如`+`、`-`、`*`、`/`）来进行运算。

:::
