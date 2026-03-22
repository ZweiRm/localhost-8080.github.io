---
prev:
    text: 'String 类'
    link: 'java/api-lang-string'
next:
    text: 'Math 类'
    link: 'java/api-lang-math'
---

# 包装类
### 4.6.1 基本信息
对于每种基本数据类型, Java 都提供了与其对应的类。这些类称为包装类。

| 基本数据类型 | `byte` | `short` | `int`     | `long` | `float` | `double` | `char`      | `boolean` |
| :----------: | :----- | ------- | --------- | ------ | ------- | -------- | ----------- | --------- |
|    包装类    | `Byte` | `Short` | `Integer` | `Long` | `Float` | `Double` | `Character` | `Boolean` |

> `int`和`char`所对应的包装类为单词的全拼。

### 4.6.2 装箱

将**基本数据类型转换为对应的引用数据类型对象**的操作。

### 4.6.3 自动装箱 <Badge text="Java SE 5.0+"/>

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

### 4.6.4 自动拆箱 <Badge text="Java SE 5.0+"/>

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
