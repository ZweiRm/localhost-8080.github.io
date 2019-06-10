# 概述
## 1.1 关于 C

+ C 语言是1972年，在贝尔实验室开发的。
  它在 ALGOL、BCPL 和 B 语言的基础上发展而来，利用了它们的很多概念并增添了数据类型等其他特性。

+ C 语言与 UNIX 操作系统一起开发，它们有很强的关联性。
  UNIX 操作系统几乎完全用 C 语言编码。

+ 版本变化  
  
  + C89  
    或称 ANSI C。1989年由 ANSI 发布的第一个 C 语言标准。次年由 ISO 全文批准，给予名称：ISO/IEC 9899。
  
  + C99  
    1999年，ISO 将 C++ 和 Java 的一些特性加入，发布 ISO/IEC 9899: 1999 标准。
  
  + C11  
    2011年，ISO 发布新版本的标准：ISO/IEC 9899: 2011.

## 1.2 主要特性

+ 健壮、高效、运行速度快
+ 高度可移植
+ 适用于结构化程序设计
+ 可自我扩展

## 1.3 C 程序的基本结构

![C程序的基本结构](/img/C程序的基本结构.jpg)

+ 文档部分**由注释行组成**，给出**程序名称、作者等信息**。

+ 链接部分提供的指令告诉编译器**从系统库中链接哪些函数**。

+ 定义部分定义**所有符号常量**。

+ 全局声明部分**声明了全局变量和自定义函数**。全局变量可以在多个函数中使用；自定义函数声明在前，实现在后。

+ `main()`是 C 程序的**执行入口**，每个 C 程序必须有一个。其中声明部分用于声明所以将在执行部分中使用的变量。执行部分是具体逻辑语句。

+ 子程序包含了**所有自定义函数的实现**，这些函数在`main()`中被调用。特别地，自定义函数可以以任意顺序出现，但通常它们在`main()`之后。

::: warning 注意
除`main()`外，若无必要，其余部分都可以省略。
:::