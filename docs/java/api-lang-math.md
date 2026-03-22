---
prev:
    text: '包装类'
    link: 'java/api-lang-wrapper'
next:
    text: '反射'
    link: 'java/api-lang-reflection'
---

# Math 类
### 4.7.1 基本信息
**Package** java.lang
`public final class Math`

`Math`类是一个最终类，其构造函数是私有的。

该类提供了一系列静态方法，这些方法实现了基本的数学运算，如三角函数、绝对值、平方根等。

### 4.7.2 重要方法
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

### 4.7.3 `strictfp`关键字

精确浮点(strict float point)，用于修饰类、接口和方法。

被修饰的代码在执行中以80位二进制数来运算小数，结果会保留为64位。

::: tip 特别的

当适用精确运算时，Java 提供了`BigDecimal`类。

这个类中对基础运算（如加、减、乘、除）提供了方法支持，故，不能使用运算符（如`+`、`-`、`*`、`/`）来进行运算。

:::
