# 基础
## 关于 Java
+ 1995 年 Sun 公司正式推出的一款编程语言  
吸收了 C++ 的优点，去掉了其中难以理解的部分

+ 起初它的名字为 Oak  
Green Project 引导下开发了 Oak 语言，并在实用机器运行  
SunWorld 大会正式以"Java"的名字发布了 1.0 版本  
提出了 Java 的口号 "Write once, run anywhere."

+ 版本变化
   + Beta [1995, **JDK Beta**]
   + 1.0 [1996, **JDK 1.0**] (JVM, Applet, AWT...)
   + 1.1 [1997, **JDK 1.1**] (JDBC, JavaBean, 内部类...)
   + 1.2 [1998, **J2SE 1.2**, ...] (分解为 J2SE, J2EE, J2ME)
   + 1.3 [2000, **J2SE 1.3**, ...] (数学运算, Timer, ...)
   + 1.4 [2002, **J2SE 1.4**, ...] (正则, 日志, XML解析器, ...) 走向成熟
   + 5.0 [2004, **J2SE 5.0**, ...] (泛型, 自动装箱, 枚举, 便利循环, ...) 面向易用
   + 6.0 [2006, **Java SE 6.0**, ...] (动态语言, 垃圾回收, 类加载, ...)
   + Sun 衰落，被 Oracle 收购
   + 7.0 [2011, **Java SE 7.0**, ...] (G1 收集器, 类加载框架, ...)
   + 8.0 [2014, **Java SE 8.0 (LTS)**, ...] (Lambda 表达式, 默认方法, ...)
   + 9.0 [2017, **Java SE 9.0**, ...] (模块系统, REPL 交互式编程, ...)
   + 10.0 [2018, **Java SE 10.0**, ...] (局部类型推测, 改进的 GC, ...)
   + 11.0 [2018, **Java SE 11.0 (LTS)**, ...] (基于嵌套的访问控制, 标准 Http 客户端, ...)

+ 技术结构
   + Java SE: 标准版
   + Java EE: 企业版
   + Java ME: 移动版

+ 跨平台性  
Java 是一款拥有跨平台性的语言。这种特性的实现方式是<span id="JVM"></span>JVM (Java Virtual Machine).  
Java 针对每种操作系统开发了对应的 Java 虚拟机，Java 程序在编写完成后并不直接在计算机中运行，而是先提交给对应操作系统的 JVM 进行“翻译”。JVM 将 Java 代码“翻译”成当前操作系统可以“读懂”的语言后才运行。  
所以 Java 语言的跨平台性得益于 JVM，但 **JVM 本身不具有跨平台性**。

## JVM, JRE 和 JDK
+ [JVM (Java Virtual Machine)](#JVM), **Java 虚拟机**，是 Java 可以跨平台的前提。

+ JRE (Java Runtime Environment), **Java 运行时环境**，包括 JVM、Java 平台核心类和基础 Java 平台库。

+ JDK (Java Development Kit), **Java 开发工具包**，包括 JRE 和一些开发工具.

## 第一个 Java 程序
``` java
class Demo {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}
```

::: warning 注意
+ Java 程序必须写到 `.java` 文件中
+ `.class` 文件名对应类名。每一个类在编译后会生成一个对应的 `.class` 文件
+ 当一个类用 `public` 修饰时，这个类被称为**公共类**。公共类要求和 Java 文件名完全一致
:::

## 命令行下的操作
编译当前 Java 文件使用命令`javac`，完整命令：  
**Input**
```
javac -d 编译完成后存放路径 要编译的.java文件
```
<br>

存在类依赖时使用`java -cp`来命令指定依赖路径，完整命令：  
**Input**
```
java -cp .class文件的存放路径 .class文件的文件名
```
<br>

生成 JavaDoc使用命令`javadoc -d`，完整命令：  
**Input**
```
javadoc -d 文档生成路径 编译的.java文件
```