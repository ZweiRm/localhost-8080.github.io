---
prev:
    text: 'Java'
    link: 'java/index'
next:
    text: '数据类型'
    link: 'java/grammars-data-types'
---

# 基本概念与常量变量
## 2.1 基本概念
### 2.1.1 注释
注释用来解释程序内容，对程序本身而言不具有逻辑意义，也不会被编译成机器码。  
适当的添加注释可以提高程序的可读性，还可以辅助排错。  
Java 的注释分为三种类型：  
1. 单行注释
``` java
// 被注释文字
```
<br>

2. 多行注释
``` java
/*
    被注释文字
    被注释文字
    ...
*/
```
<br>

3. 文档注释
``` java
/**
    被注释文字
    ...
*/
```

### 2.1.2 关键字
关键字也被称为保留字。在 Java 中，关键字是包含特殊意义的保留单词，共计50个。
> **Java Language Keywords**  
Here is a list of keywords in the Java programming language. You cannot use any of the following as identifiers in your programs. The keywords `const` and `goto` are reserved, even though they are not currently used. `true`, `false`, and `null` might seem like keywords, but they are actually literals; you cannot use them as identifiers in your programs.  
>col 1     |col 2     |col 3     |col 4     |col 5
>:--------:|:--------:|:--------:|:--------:|:--------:
>`abstract`|`continue`|`for`     |`new`     |`switch`
>`assert`***|`default`|`goto`*|`package`|`synchronized`
>`boolean`|`do`|`if`|`private`|`this`
>`break`|`double`|`implements`|`protected`|`throw`
>`byte` |`else`|`import`|`public`|`throws`
>`case` |`enum`****|`instanceof`|`return`|`transient`
>`catch`|`extends`|`int`|`short`|`try`
>`char` |`final`|`interface`|`static`|`void`
>`class`|`finally`|`long`|`strictfp`**|`volatile`
>`const`*|`float`|`native`|`super`|`while`
>\*&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;not used  
>**&emsp;&emsp;&emsp;&nbsp;added in 1.2  
>***&emsp;&emsp;&nbsp;&nbsp;&nbsp;added in 1.4  
>****&emsp;&emsp;&nbsp;&nbsp;added in 5.0  
[原文](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/_keywords.html)

### 2.1.3 标识符
在 Java 程序中自定义的名称，可以是任意长度，由**字母、数字、下划线(_)和美元符号($)构成**。
::: tip 建议
+ 我们建议对标识符的选取做到“见名知义”  
+ 用标识符给类、方法和变量起名时还需要遵循一定的规范，让程序更易读
:::
::: warning 注意
+ 应尽量减少使用`$`作为标识符的内容  
+ Java 标识符**对大小写敏感**
:::
::: danger 禁止
+ 标识符**第一个字符不能是数字**  
+ 标识符**不能是关键字**  
+ 标识符**不能是布尔值**    
+ 标识符**不能是`null`**
:::

## 2.2 常量与变量
### 2.2.1 常量
或称“字面常量”，包含以下几种类型：
+ 整数常量  
所有整数  
可以用二进制、八进制、十进制、十六进制表示。具体见[进制](#进制)。

+ 浮点数常量  
所有小数  
Java 中具体表现形式见[浮点型](#浮点型)。

+ 字符常量  
包括普通字符和转义字符两种  
将一个字母、数字或符号使用`''`包围，构成普通字符常量  
为避免冲突或特殊含义，规定了转义字符。转义字符由字母或符号和和反斜杠(\\)组成，如：  

字符|含义
:--:|:--:
`\\`|\\
`\'`|\'
`\"`|\"
`\n`|换行
`\r`|回车
`\t`|制表符

+ 字符串常量  
将一个或多个字符使用`""`包围，构成字符串常量

+ 布尔常量  
表示逻辑值，包括`true`和`false`

+ 空常量  
表示空，值为`null`

### 2.2.2 变量
在 Java 中，变量用来记录数据，是一个有类型的存储单元  

变量具有以下特点：  
+ 变量的使用范围不能超过其所在的`{...}`
+ 变量必须定义和给值后才能使用

变量可分为以下几类：  
+ 实例变量 (Instance Variables, Non-Static Fields): 在类中不使用修饰词`static`定义的变量
+ 类变量 (Class Variables, Static Fields): 类中使用修饰词`static`定义的变量，或接口中的变量
+ 局部变量 (Local Variables): 由局部变量声明语句生命的变量
+ 参数 (Parameters): 方法、异常、创建类时需要的变量

以下代码中，高亮部分即变量的声明和赋值：
``` java {3}
public class VariableDemo {
    public static void main(String[] args) {
        int a = 5;
        System.out.println(a);
    }
}
```

::: tip 局部变量类型推断<Badge text="Java 10+"/>
从 Java 10 开始，允许使用关键字 `var` 来代替局部变量声明中的类型，JVM 会从变量初始化器中自动填充合适的类型。  
实例：  
``` java
// 显式声明
var userChannels = new HashMap<User, List<String>>();

// 从方法返回
var channels = lookupUserChannels("Tom");
channels.forEach(System.out::println);
```

代码：  
``` java{1,2,3}
Path path = Paths.get("src/web.log");
try (Stream<String> lines = Files.lines(path)){
    long warningCount
            = lines
                .filter(line -> line.contains("WARNING"))
                .count();
    System.out.println("Found " + warningCount + " warnings in the
log file");
} catch (IOException e) {
    e.printStackTrace();
}
```
可以被改写为：
``` java{1,2,3}
var path = Paths.get("src/web.log");
try (var lines = Files.lines(path)){
    var warningCount
            = lines
                .filter(line -> line.contains("WARNING"))
                .count();
    System.out.println("Found " + warningCount + " warnings in the
log file");
} catch (IOException e) {
    e.printStackTrace();
}
```

但是值得注意的是，这个特性不能很好的在多态中使用。
对于父类 Vehicle 和它的子类 Car 和 Bike，有：  
``` java
var v = new Car(); // 会被自动推断为 Car

// v = new Bike(); 当本意是 Vehicle v = new Bike() 的向上造型会失效
```

**不能使用局部变量类型推断的地方**  
+ 不能用于类的属性与方法签名  
  // `public long process(var list) { }`  
+ 不能用于没有具体初始化的变量  
  // `var x`  
+ 不能给 var 变量赋 `null`  
  // `var x = null`  
+ 不能用于 Lambda 表达式  
  // `var x = () -> {}`  
  但 `var` 关键字可以使用在 Lambda 表达式的参数中<Badge text="Java 11+"/>  

**在匿名内部类中使用局部变量类型推断**  
通常情况下，匿名内部类中定义的属性不能在类外进行访问，但如果将匿名内部类的接受变量改为 `var` 则可以打破这个限制。  
这个点可以用来**解决当一个方法想返回一些值作为中间结果**的情形。  
在不使用这个特性时，必须创建和维护一个新的类来实现这样的功能，例如 `Collectors.averagingDouble()` 源码中的小 double 数组。  
实例：  
Product 类，包含产品的名称、库存、价值信息。要求计算一个 list 中所有产品的总价值（库存 * 价值）。最终输出每个产品的名称与总价值。  
``` java{8,10,11,12}
// product list
var products = List.of(
    new Product(10, 3, "Apple"),
    new Product(5, 2, "Banana"),
    new Product(17, 5, "Pear"));

// 使用 stream 来映射名称与总价值，用 var 变量接收
var productInfos = products
    .stream()
    .map(product -> new Object() {
        String name = product.getName();
        int total = product.getStock() * product.getValue();
    })
    .collect(toList());

// 遍历输出
productInfos.forEach(prod ->
    System.out.println("name = " + prod.name + ", total = " +
prod.total));
```
输出结果：  
```
name = Apple, total = 30
name = Banana, total = 10
name = Pear, total = 85
```
:::

### 2.2.3 进制
+ 十进制：0 ~ 9，满十进一，数字在代码中默认十进制

+ 二进制<Badge text="Java SE 7.0 +"/>：0 ~ 1，满二进一，在程序中标识一个二进制数，以`0b`或`0B`开头。如：`0b0011` = `0B0011`

+ 八进制：0 ~ 7，满八进一，以`0`开头。如：`06`、`012`

+ 十六进制：0 ~ 9，A ~ F，满16进一，以`0x`或`0X`作为开头。如：`0x23` = `0X23`

:::  details 进制转换
*计算机基础内容*：  
+ 十进制和二进制转化  
    **十变二**  
    除二取余法，连除倒取余  
    如：25的二进制为11001  
    ```
    2|25...1  
      2|12...0  
        2|6...0  
          2|3...1  
            2|1...1
    ```
    **二变十**  
    2的幂次方累加  
    如：1101001的十进制是105
    ```
    1+8+32+64=105
    ```

    **十变二的2的幂次累减法**  
    如：781的二进制为1100001101
    ```
    [512]-[256]-128-64-32-16-[8]-[4]-2-[1]
    ```
+ 二进制和八进制转化  
    **二变八**  
    低位次开始，每三位一组产生八进制数字，最高位不足补0  
    如：1100001101的八进制为01415
    ```
     001|100|001|101
    -> 1   4   1   5
    ```
    **八变二**  
    1位化3位  
    如：03627的二进制为011 110 010 111  
+ 二进制和十六进制转化  
    **二变十六**  
    低位次开始，每四位一组产生八进制数字，最高位不足补0  
    如：0111 1001 0111的十六进制为0x797  
    如：0001 1101 1110的十六进制为0x1DE

    **十六变二**  
    1位化4位
:::

