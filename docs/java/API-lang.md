---
prev: ./API-introduction
next: ./API-lang2
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

*这三个属性都是字节流，见 [I/O Stream](./API-输入输出类库.html#i-o-stream).
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

## 反射
### 基本信息
**Package** java.lang  
`public final class Class<T>`  

**Package** java.lang.reflect  

Java 提供了反射机制，使用该机制可以动态操作 Java 代码（例如程序经过编译后的变动），也可以利用其来分析类的具体能力。它也体现了高内聚低耦合的设计思想。  

### `Class`类
`Class` 类的实例代表运行中的 Java 应用程序中的类和接口。枚举是类的一种，注解是接口的一种。  
每个数组也都属于一个类，该类反映为一个 `Class` 对象，该对象被所有具有相同元素类型和维数的数组共享。  
Java 的原始类型（布尔、字节、`char`、`short`、`int`、`long`、`float` 和 `double`）以及关键字 `void` 也被表示为 `Class` 对象。（即存在 `int.class`, `void.class` 等 `Class` 对象）。  
`Class` 没有公共构造函数。相反，`Class` 对象是由 Java 虚拟机在加载类时自动构建的，并通过调用类加载器中的 `defineClass()` 方法来构建。  

**获取 Class 对象**  
通过获取具体类的 Class 对象（某些地方也称为字节码对象），我们可以利用它们获取该类的类信息。获取方法：  
1. `对象.getClass()`  
   通过某类的具体实例来获取该类的 `Class` 对象。调用了 [Object 类](#object类)中的方法来实现。  
2. `类名.class`  
   每个类都有一个隐含的静态属性 `class`, 通过类名直接获取该属性来获取到 `Class` 对象。  
3. `Class.forName("类全路径")`  
   `Class` 类的静态方法，获取 `Class` 对象。  
   它是一种动态加载类的方法，这样的加载方式不在程序编译期完成，而是在运行时再动态加载。  
   例如：  
   ``` java
   class Main {
       public static void main(String[] args) {
           Admin admin = new Admin();
           admin.login();

           User user = new User();
           user.login();
       }
   }
   ```
   这样的主函数经过编译后，编译器无法找到类 `Admin` 和 `User` 以及它们所对应的 `login()` 而报错。这样的类加载形式是静态加载。  

   进行改造：  
   ``` java
   // 统一的人员接口
   interface Person {
       public void login();
   }

   // 具体实现
   class Admin implements Person {
       @Override
       public void login() {
           System.out.println("Admin login.");
       }
   }

   class User implements Person {
       @Override
       public void login() {
           System.out.println("User login.");
       }
   }

   // 主函数
   class Main {
       public static void main(String[] args) {
           // 通过传入参数动态加载类
           Class personClass = Class.forName(args[0]);
           
           // 创建实例
           Person person = (Person) personClass.newInstance();
           person.login();
       }
   }
   ```
   通过这样的改造，主函数不必在编译时期就指定具体的 `Admin` 或者 `User` 类，即使它们暂时不存在也不影响主函数编译失败。在程序运行时，给程序传入具体要加载的类动态加载并调用其 `login()` 来完成整个功能。  

**获取构造函数**  
1. `class对象.getConstructor(构造函数参数类型class对象)`  
   返回指定参数类型的公共构造函数。  
   例如：  
   ``` java
   public class Person {
       // 属性

       // 有参构造方法
       public Person(String name, int age) {
           this.age = age;
           this.name = name;
       }
   }

   // main 函数中，获取到 class 对象 cl 后
   // 获取有参构造函数(传入构造方法需要的 String 和 int 类型的 class 对象)
   Constructor con = cl.getConstructor(String.class, int.class);
   ```
2. `class对象.getConstructors()`  
   获取所有公共构造函数。  
3. `class对象.getDeclaredConstractors(构造函数参数类型字class对象)`  
   返回指定参数类型的全部构造函数（包括 `public` `private` 等）。  

**获取实例对象**  
`class对象.newInstance()` 要求存在无参数构造函数  

**获取类属性**  
1. `class对象.getFields("属性名")`  
   获取所有公有属性  
2. `class对象.getDeclaredFields("属性名")`  
   获取所有属性  

**获取方法对象**  
1. `class对象.getMethod("方法名", 方法对应参数的class对象)`  
   获取公有方法  
2. `class对象.getDeclaredMethod("方法名", 方法对应参数的class对象)`  

**获取所实现的接口**  
`class对象.getInterfaces()`  

**其他常用方法**  
|名称|作用|
|--|--|
|`class对象.getName()`|获取类全路径名|
|`class对象.getPackage()`|获取类所在包|
|`class对象.getSimpleName()`|获取当前类名|
|`class对象.getSuperclass()`|获取父类名|
|`class对象.isAnonymousClass()`|是否是匿名内部类|
|`class对象.isLocalClass()`|是否是方法内部类|
|`class对象.isPrimitive()`|是否是基本类型|
|`class对象.isArray()`|是否是数组|
|`class对象.isEnum()`|是否是枚举|
|`class对象.isInstance(指定对象)`|判断指定对象是否是该类的实现|
|`class对象.isInterface()`|是否是接口|
|`class对象.isAssignableFrom(目标类型)`|判断目标类型是否是当前类的本身或子类|


::: tip <code>Object</code> 与 <code>Class</code>
+ `Object` 是顶级父类，`Class` 也继承自 `Object`.  
+ `Class` 类用于反射，它表示了 Class 这样的一种类，可以利用它来进一步获取关于类的各种信息。  
+ `Class` 类的实例表示了当前运行着的 Java 程序的类，每一个类都会在运行时自动创建出它对应的 `Class` 类实例。  
+ `Class` 类的构造函数私有，只能通过 JVM 来访问。所以无法手动创建 `Class` 类的实例。  
:::

### `Constructor`类
描述构造方法的类。  

**获取实例对象**  
`constructor对象.newInstance()`  

**获取构造方法返回值类型**  
`constructor对象.getType()` 返回值是 `Class` 类型变量  

**获取构造方法参数列表**  
`constructor对象.getParameterTypes()`  

### `Field`类
描述属性的类。  

**获取指定对象的属性值**  
`field对象.get(指定对象)` 可能需要使用 `.setAccessible(true)` 来暴力破解访问权限限制。  

**设置指定对象的属性值**  
`field对象.set(指定对象)`  

**获取属性声明类型**  
`field对象.getType()` 返回值是 `Class` 类型变量  

**获取属性名称**  
`field对象.getName()`  

### `Method`类
描述方法的类。  

**执行方法**  
`method对象.invoke(作用对象, 参数)`  
如果方法有返回值类型则返回该类型变量，若方法无返回则返回 `null`

**破解权限**  
`method对象.setAccessible(true)` 允许在类外执行，一般配合执行方法一起使用。  

**获取方法返回值类型**  
`method对象.getReturnType()`  

**获取方法参数列表**  
`method对象.getParameterTypes()`  

**获取抛出异常**  
`method对象.getExceptionTypes()`  

**判断是否含有可变参数**  
`method对象.inVarArgs()`  