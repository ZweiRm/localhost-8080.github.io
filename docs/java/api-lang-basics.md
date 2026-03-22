---
prev:
    text: 'API-介绍'
    link: 'java/api-introduction'
next:
    text: 'String 类'
    link: 'java/api-lang-string'
---

# Object / System / 异常 / 枚举
## 4.1 `Object`类

### 4.1.1 基本信息
**Package** java.lang
`public class Object`

+ `Object`类是所有类的父类。在 Java 中处于顶级父类的地位，是类层级结构的根类。

+ 任何类对象都可以用`Object`类的对象来接收。

### 4.1.2 重要方法
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
   ::: tip 重写 <code>equals()</code>
   当手动重写`equals()`时，思路为:
   1. 判断地址是否一致(`if (this == obj)`)

   2. 判断参数是否为空(`if (obj == null)`)

   3. 判断类型是否一致(`if (this.getClass() != obj.getClass())`)

   4. 判断属性值是否一致
   :::

::: tip <code>hashCode()</code> 与 <code>euqals()</code>
+ 如果两个对象相等，则 hashcode 一定也是相同的
+ 两个对象相等，对两个 `equals()` 方法返回 `true`
+ 两个对象有相同的 hashcode 值，它们也不一定是相等的

综上，如果一个类的 `equals()` 方法被覆盖过，则 `hashCode()` 方法也必须被覆盖。
:::

## 4.2 `System`类

### 4.2.1 基本信息

**Package** java.lang

`public final class System`

+ `System`类提供了标准输入输出、错误输入输出和一些访问系统属性的方法。

+ 它是一个静态类，不能被继承，不能被实例化，所有方法都是静态方法。

### 4.2.2 重要方法

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

*这三个属性都是字节流，见 [I/O Stream](./api-io#i-o-stream).
:::

## 4.3 异常
异常是一套处理和反馈问题的机制。

### 4.3.1 基本信息

**Package** java.lang

`public class Throwable`

+ `Throwable`类是异常 (Exception) 和错误 (Error) 的父类。

+ 错误无法处理，而异常可以处理。

### 4.3.2 `Exception`
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

### 4.3.3 `Error`
错误。不应试图捕获的严重问题。无法处理。

## 4.4 枚举
### 4.4.1 基本信息
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
