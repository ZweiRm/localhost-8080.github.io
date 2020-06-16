---
prev: ./
next: ./object-oriented
---

# 语法
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

### 2.2.3 进制
+ 十进制：0 ~ 9，满十进一，数字在代码中默认十进制

+ 二进制<Badge text="Java SE 7.0 +"/>：0 ~ 1，满二进一，在程序中标识一个二进制数，以`0b`或`0B`开头。如：`0b0011` = `0B0011`

+ 八进制：0 ~ 7，满八进一，以`0`开头。如：`06`、`012`

+ 十六进制：0 ~ 9，A ~ F，满16进一，以`0x`或`0X`作为开头。如：`0x23` = `0X23`

::: tip 关于进制转换
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

## 2.3 数据类型
### 2.3.1 基本数据类型
+ 数值型
  + 整数型 (整型)
    > `byte` 字节型  
      **长度**：1个字节  
      **取值范围**：-2<sup>7</sup> ~ 2<sup>7</sup>-1 (-128 ~ 127)  
      **默认值**: `0`

    > `short` 短整型  
      **长度**：2个字节  
      **取值范围**：-2<sup>15</sup> ~ 2<sup>15</sup>-1 (-32768 ~ 32767)  
      **默认值**: `0`

    > `int` 整型  
      **长度**：4个字节  
      **取值范围**：-2<sup>31</sup> ~ 2<sup>31</sup>-1 (-2147483648 ~ 2147483647)  
      >::: tip 使用`_`分割大数字<Badge text="Java SE 7.0 +"/>  
      >例如：`int a = 100_500;`
      >:::
      >**默认值**: `0`

    > `long` 长整型  
      **长度**：8个字节  
      **取值范围**：-2<sup>63</sup> ~ 2<sup>63</sup>-1 (≈ -10<sup>18</sup> ~ 10<sup>18</sup>)  
      以`l`或`L`结尾，推荐使用`L`  
      **默认值**: `0L`

  + <span id="浮点型"></span>浮点型  
    > `float` 单精度浮点型  
      **长度**：4个字节  
      **取值范围**：≈ -1.4<sup>45</sup> ~ 3.4×10<sup>38</sup>  
      以`f`或`F`结尾  
      **默认值**: `0.0f`

    > `double` 双精度浮点型  
      **长度**：8个字节  
      **取值范围**：≈ -4.9<sup>-324</sup> ~ 10<sup>308</sup>  
      以`d`或`D`结尾，默认不写  
      **默认值**: `0.0d`
      ::: tip
      科学计数法  
      `3e10` → 3×10<sup>10</sup>  
      `0x3P5` → 3×2<sup>5</sup> (十六进制)
      :::
+ 字符型  
> `char` 字符型  
**长度**：2个字节  
**取值范围**：0 ~ 2<sup>16</sup>-1 (0 ~ 65535, '\u0000' ~ '\uffff')  
**默认值**: `'\u0000'`
+ 布尔型
> `boolean` 布尔型  
**长度**：1位/1字节/4字节  
**取值范围**：`true`和`false`  
**默认值**：`false`

### 2.3.2 引用数据类型
[类](#类)、[接口](#接口)和[数组](#数组)  
**默认值**：`null`  
::: tip
`String`是一个引用数据类型，所以它并不包含在关键字中  
声明赋值`String String = "String";`是可以被理解的
:::

### 2.3.3 数据类型转换
#### 2.3.3.1 隐式转换/自动类型转换
![自动类型转换](/img/自动类型转换.png)
规律一：小类型可以自动转化为大类型  
``` java
int i = 10;
float f = i;
```
<br>

规律二：整数可以自动的转化为小数，但可能出现精度损失的问题  
``` java
long l = 10L;
float f = i;
```
<br>

规律三：`char`可以自动转化为`int`  
``` java
char c = 'c';
int i = c;
```
<br>

::: tip
+ 代码编译期，JVM 会检查数据类型和声明类型是否一致或兼容  
+ 如果在赋值的时候数据是一个变量，不会去检查这个变量的值而是检查变量的类型和声明的数据类型是否兼容。
:::

下列情形是不兼容情形 JVM 给出的反馈  
**Input**
``` java
char c = 97;
short s = c;
```
**Output**
```
Application.java:4: 错误: 不兼容的类型: 从char转换到short可能会有损失 
short s = c;
      ^
1 个错误
```
---
**Input**  
``` java
short s = 97;
char c = s;
```
**Output**
```
Application.java:4: 错误: 不兼容的类型: 从short转换到char可能会有损失
char c = s;
     ^
1 个错误
```

#### 2.3.3.2 显示转换/强制类型转换
在大类型赋值给小类型/小数类型转为整数类型使用  
::: warning 注意
小数类型强制转为整数类型时会抛弃小数位
:::
示例：  
**Input**
``` java
int i = 97;
short s = (short) i;
```
---
**Input**
``` java
double d = 1.1;
int i = (int) d;

System.out.println(i);
```
**Output**
```
1
```
精度丢失

---
**Input**
``` java
int i = 200;
byte b = (byte) i;

System.out.println(b);
```
**Output**
```
-56
```
#### 2.3.3.3 引用类型的强制类型转换
在多态情况下，无法访问子类特有的成员（方法列表已被父类确定），需要进行强制类型转换来实现。  
**Input**  
``` java {21}
class Supper() {
    ...

    public void mSup_1() {
        // ...
    }

    public void mSup_2() {
        // ...
    }
}

class Sub() extends Supper {
    public void mSub() {
        // ...
    }
}

public static void main(String[] args) {
    Supper supper = new Sub(); // 父类引用指向子类对象，向上造型
    supper.mSub(); // 报错，无法访问
}
```

将对象强制转换为Sub类型后，即可访问该方法。  
**Input**  
``` java
Sub sub = (Sub) supper;
sub.mSub();
```

::: tip 特别的
+ 在进行强制类型转换时，编译器会检查两个类之间是否存在继承关系  
  + 若存在继承关系，则编译时会通过，但运行时不一定  

  + 若不存在继承关系，编译时会报错
:::

## 2.4 运算符
### 2.4.1 算术运算符
包括`+`、`-`、`*`、`/`、`%`、`++`、`--`.  
::: warning 注意
+ `byte`类型和`short`类型运算时会自动提升为`int`类型  

**Input**
``` java
byte b1 = 3;
byte b2 = 5;
byte sum = b1 + b2;

System.out.println(sum);
```
**Output**
```
Application.java:5: 错误: 不兼容的类型: 从int转换到byte可能会有损失  
    byte sum = b1 + b2;
           ^
1 个错误
```
---
+ 同一类型参与运算，结果的类型与参与运算的类型一致  
+ 若运算中有大类型参与运算，结果为大类型
+ 绝大部分小数转换为二进制是无限小数，所以double类型无法精确存储小数，也不能进行精确运算  

**Input**
``` java
double d1 = 3;
double d2 = 2.98;

System.out.println(d1 - d2);
```
**Output**
```
0.020000000000000018
```
---
+ 整数/0 ``ArithmeticException``；任意非0数字/0.0 输出``Infinite``；0/0.0输出``NaN``  

**Input**
``` java
int i = 1;
System.out.println(i / 0);
```
**Output**
```
Exception in thread "main" java.lang.ArithmeticException: / by  zero
at Application.main(Application.java:4)
```
---
**Input**
``` java
int i = 1;
System.out.println(i / 0.0);
```
**Output**
```
Infinity
```
---
**Input**
``` java
int i = 1;
System.out.println(i / -0.0);
```
**Output**
```
-Infinity
```
---
**Input**
``` java
int i = 0;
System.out.println(i / -0.0);
```
**Output**
```
NaN
```
---
+ 取模运算，先按正数取余，再看左运算位符号判定结果符号  
**Input**
``` java
System.out.println(3.2 % 2);
```
**Output**
```
1.2
```
---
**Input**
``` java
System.out.println(5.4 % 1.7);
```
**Output**
```
0.3000000000000005
```
+ 小数可以当做取模运算的操作数
+ `++`/`--`运算在变量名之前，表示先自增，自增完成之后才会参与运算。在之后则先拿原值参与运算，之后再自增  

**Input**
``` java
int i = 5;
int j = i++;
```
取出`i`中的5 → `i`自增 → 将5赋值给`j`  

---
**Input**
``` java
int i = 5;
int j = i++ * 2;

System.out.println("i = " + i);
System.out.println("j = " + j);
```
**Output**
```
i = 6
j = 10
```
取出`i`中的5 → 5和2相乘得10 → `i`自增 → 将10赋值给`j`  

---
**Input**
``` java
int i = 5;
int j = ++i * 2;

System.out.println("i = " + i);
System.out.println("j = " + j);
```
**Output**
```
i = 6
j = 12
```
取出`i`中的5 → `i`自增(6) → 将6和2相乘得12 → 将12赋值给`j`

---
**Input**
``` java
int i = 3;
int j = i++ + ++i;

System.out.println("i = " + i);
System.out.println("j = " + j);
```
**Output**
```
i = 5
j = 8
```
取出`i`中的3 → `i`自增(4) → `i`自增(5) → 3+5得8 → 将8赋值给`j`

---
**Input**
``` java
int i = 3;
int j = ++i + i++;

System.out.println("i = " + i);
System.out.println("j = " + j);
```
**Output**
```
i = 5
j = 8
```
取出`i`中的3 → `i`自增(4) → `i`自增(5) → 将4和自增前的4相加得8 → 将8赋值给`j`

---
+ `byte`和`short`类型可以参与`++`/`--`运算，运算结束后保持原类型（底层进行了强制转换）
:::

### 2.4.2 赋值运算符
包括`=`、`+=`、`-=`、`*=`、`/=`、`%=`、`|=`、`&=`、`^=`、`<<=`、`>>=`和`>>>=`.
::: warning 注意
+ 除`=`以外，其余赋值运算符要求变量必须有值
+ `byte`/`short`类型可以参与赋值运算
:::
::: tip Bonus
判断以下魔法程序的输出值  
1. **Input**
   ``` java
   int i = 5;
   System.out.println(i += i -= i *= 5);
   ```
2. **Input**
   ``` java
   int i = 3;
   System.out.println(i += i *= i -= i++);
   ```
3. **Input**
   ``` java
   int i = 5;
   System.out.println(i += i -= i *= i++);
   ```
4. **Input**
   ``` java
   int i = 5;
   System.out.println(i += i -= i *= i++ + ++i);
   ```

---
1. **Output**
   ```
   -15
   ```
   `5 + (5 - (5 * 5)) = -15`
2. **Output**
   ```
   3
   ```
   `int i = 3;`  
   `i += i *= i -= i++;`  
   `3 + (3 * (3 - 3)) = 3`

3. **Output**
   ```
   -15
   ```
   `5 + (5 - (5 * 5)) = -15`
4. **Output**
   ```
   -50
   ```
   `5 + (5 - (5 * (5 + 7))) = -50`
:::

### 2.4.3 关系运算符
或称“比较运算符”  
包括`>`、`<`、`>=`、`<=`、`==`、`!=`  

### 2.4.4 逻辑运算符
或称“条件运算符”  
包括`&&`、`||`、`!`、`&`、`|`、`^`和`?:`  
::: tip 特别的
+ 运算符`?:`是一个**三目运算符**  
    语句`result = someCondition ? value1 : value2;`表示：  
    “如果`某条件`为真，则将`值1`赋给`结果`，否则将`值2`赋给`结果`”    
    > **The Conditional Operators**  
    ...  
    Another conditional operator is `?:`, which can be thought of as shorthand for an `if-then-else` statement (discussed in the Control Flow Statements section of this lesson). This operator is also known as the ternary operator because it uses three operands. In the following example, this operator should be read as: "If `someCondition` is `true`, assign the value of `value1` to result. Otherwise, assign the value of `value2` to result."    
    ...  
    [原文](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/op2.html)  
+ 运算符`&&`和`||`具有短路效果
:::

### 2.4.5 位运算符
包括`&`、`|`、`^`、`~`、`<<`、`>>`和`>>>`

::: warning 关于 & | ^
我们可以注意到，在[逻辑运算符](#逻辑运算符)和[位运算符](#位运算符)中都出现了`&`、`|`、`^`.  

在[官方文档](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/opsummary.html)的表述中，`&`、`|`、`^`三个运算符属于位运算符，而不是逻辑运算符，但在实践中我们发现两种具体情形下 JVM 都可以正确理解当前上下文这三个运算符的含义。故本文将三个运算符分别写进了两个分类。  
**Input**
``` java
byte b1 = 0b0010101;
byte b2 = 0b1010101;
System.out.println(Integer.toBinaryString(b1 & b2));

boolean bb1 = true;
boolean bb2 = false;
System.out.println(bb1 & bb2);
```
**Output**
```
10101
false
```
:::

::: warning 注意
位运算针对的是整数，运算的是数据的补码
:::

### 2.4.6 类型比较运算符
运算符`instanceof`用来判断对象是否为类的实例  
**Input**
``` java
System.out.println("abc" instanceof String);
```  
**Output**
```
true
```

### 2.4.7 优先级
自上而下优先级逐渐递减。
![运算符优先级](/img/运算符优先级.png)  
::: tip 特别的
运算符`()`、`[]`和`.`虽不在表中，但享有最高的优先级。
:::

## 2.5 表达式、语句和代码块
### 2.5.1 表达式
一个表达式由**变量**，**运算符**和**方法调用**组成，其具体组合方式由语法决定。  
表达式的结果是一个**值**。  
如代码`int result = 1 + 2;`中，`result = 1 + 2`就是一个表达式。

### 2.5.2 语句
**语句**是程序执行的最小单元。  
在 Java 中一个语句由`;`结束，下面这些表达式加上`;`就可以构成一个语句：  
+ 声明表达式
+ 使用`++`和`--`
+ 方法调用
+ 创建对象表达式
### 2.5.3 代码块
当把0到多个**语句**用**括号**包围时，这个结构就是一个代码块。  
只要可以出现单独语句的地方都可以出现代码块。

详见[代码块](./面向对象.html/#代码块)。

## 2.6 流程控制
### 2.6.1 顺序结构
结构化程序设计由迪杰斯特拉 (E.W.Dijikstra) 在 1965 年提出，其要求采用“自顶向下，逐步求精”的设计方法。  
简单来讲，就是从上到下，从左到右，依次执行。

### 2.6.2 分支结构
1. `if-then`语句  
    当`条件`为**真**时，则执行`{...}`中的语句。  
    **格式**：
    ``` java
    if (condition) {
        // some statements
    }
    ```
    ::: tip 特别的
    当`then`的部分只有一条语句时，包裹其的大括号可以省略。  
    ``` java
    if (condition)
        // a statement
    ```
    :::

2. `if-then-else`语句  
    当`条件`为**真**时，执行`{...}`中的内容，否则执行`else {...}`中的内容。  
    **格式**：
    ``` java
    if (condition) {
        // some statements
    } else {
        // other statements
    }
    ```
    ::: tip 特别的
    `if-then-else`语句可以嵌套使用。  
    下面是一个简单的例子来实现“大于90分为A，大于80分为B……的成绩判断”程序。  
    ``` java
    class IfElseDemo {
        public static void main(String[] args) {

            int testscore = 76;
            char grade;

            if (testscore >= 90) {
                grade = 'A';
            } else if (testscore >= 80) {
                grade = 'B';
            } else if (testscore >= 70) {
                grade = 'C';
            } else if (testscore >= 60) {
                grade = 'D';
            } else {
                grade = 'F';
            }
            System.out.println("Grade = " + grade);
        }
    }
    ```
    :::

3. `switch`语句  
+ `switch`语句可以拥有多个可执行的路径 (`if`系列只有一个)。  

+ `switch`语句可以对`byte`, `short`, `char`和`int`类型的数据进行判定。  

+ 对`String`类进行判定<Badge text="Java SE 7.0 +"/>。  

+ `switch`还可以判定`Enum`枚举类型和一些特定的包装类，如`Character`, `Byte`, `Short`和`Integer`.  

下面是一个通过输入`int`类型月份输入，由计算机输出对应单词的程序：  
   **Input**
   ``` java
    public class SwitchDemo {
        public static void main(String[] args) {

            int month = 8;
            String monthString;
            switch (month) {
                case 1:  monthString = "January";
                        break;
                case 2:  monthString = "February";
                        break;
                case 3:  monthString = "March";
                        break;
                case 4:  monthString = "April";
                        break;
                case 5:  monthString = "May";
                        break;
                case 6:  monthString = "June";
                        break;
                case 7:  monthString = "July";
                        break;
                case 8:  monthString = "August";
                        break;
                case 9:  monthString = "September";
                        break;
                case 10: monthString = "October";
                        break;
                case 11: monthString = "November";
                        break;
                case 12: monthString = "December";
                        break;
                default: monthString = "Invalid month";
                        break;
            }
            System.out.println(monthString);
        }
    }
```

   **Output**
   ``` sh
   August
   ```
   ::: warning 注意
   + `break;`语句用来跳出当前判定或循环。  
   所以我们可以知道当执行到某不含`break;`的`care`块时，判定仍将继续下去，直到所有`case`均不满足或遇到`break;`才退出操作。  
   **Input**
   ``` java
   public class SwitchDemoFallThrough {
        public static void main(String[] args) {

            java.util.ArrayList<String> futureMonths =
                new java.util.ArrayList<String>();

            int month = 8;

            switch (month) {
                case 1:  futureMonths.add("January");
                case 2:  futureMonths.add("February");
                case 3:  futureMonths.add("March");
                case 4:  futureMonths.add("April");
                case 5:  futureMonths.add("May");
                case 6:  futureMonths.add("June");
                case 7:  futureMonths.add("July");
                case 8:  futureMonths.add("August");
                case 9:  futureMonths.add("September");
                case 10: futureMonths.add("October");
                case 11: futureMonths.add("November");
                case 12: futureMonths.add("December");
                        break;
                default: break;
            }

            if (futureMonths.isEmpty()) {
                System.out.println("Invalid month number");
            } else {
                for (String monthName : futureMonths) {
                System.out.println(monthName);
                }
            }
        }
    }
```  

   **Output**  
    
``` sh
    August
    September
    October
    November
    December
```

+ 判定过程按`case`顺序依次判定，但若每个`case`块内都含`break;`语句则`case`顺序不影响结果。
:::

### 2.6.3 循环结构
1. `while`语句  
   当`条件`为**真**时，则持续执行`{...}`中的语句。  
   **格式**：
   ``` java
   while (condition) {
       // some statements
   }
   ```
2. `do-while`语句  
   先执行一次循环体`{...}`, 再进行`条件`的判断。若`条件`为**真**则持续执行循环体。  
   **格式**：
    ``` java
    do {
        // some statements
    } while (condition);
    ```
3. `for`语句  
   是一种重复迭代的循环语句，当不满足`终止条件`时持续执行循环体。  
   **格式**：
   ``` java
   for (initialization; termination; increment) {
       // statements
   } 
   ```
   ::: warning 注意
   + `for`语句要求填写三部分：**循环变量**、**终止条件**和**状态更新**。  

   + 三个部分可以为空，但其中的`;`需要留下。  
   :::  

   ::: tip 增强的 for 循环
   增强的 for 循环是一个语法糖，它使得`for`循环在某些场景更易读。  
   增强的 for 循环通常用在对**集合类**和**数组**遍历上，官方推荐在可以使用这种循环的地方都使用这种形式。  
   **格式**
   ``` java
   for (int item : someCollection) {
       // some statements
   }
   ```
    ::: warning 注意
    在增强的 for 循环中，被循环的集合类或数组是一个新的“副本”。  
    所以在增强的 for 循环中对被循环变量进行更改操作不会生效。
    :::

::: tip 特别的
+ `while`和`do-while`循环适用于**循环次数不固定，变化不规律**的场景。  

+ `for`循环使用于**变化规律**的场景。
:::

### 2.6.4 控制转移
1. `break`语句  
   终止循环/switch.

2. `continue`语句  
   终止当前循环，执行下一次循环。  

::: tip 特别的
`break`和`continue`拥有两种形式：使用`label`和不使用`label`。  
在多重循环下，一个`label`标签可以更好地让程序跳转到该跳转的地方。  
下面是两个实例，使用`label`的地方用高亮标识出：  
**Input**
``` java {15,21}
class BreakWithLabelDemo {
    public static void main(String[] args) {

        int[][] arrayOfInts = { 
            { 32, 87, 3, 589 },
            { 12, 1076, 2000, 8 },
            { 622, 127, 77, 955 }
        };
        int searchfor = 12;

        int i;
        int j = 0;
        boolean foundIt = false;

    search:
        for (i = 0; i < arrayOfInts.length; i++) {
            for (j = 0; j < arrayOfInts[i].length;
                 j++) {
                if (arrayOfInts[i][j] == searchfor) {
                    foundIt = true;
                    break search;
                }
            }
        }

        if (foundIt) {
            System.out.println("Found " + searchfor + " at " + i + ", " + j);
        } else {
            System.out.println(searchfor + " not in the array");
        }
    }
}
```
**Output**
```
Found 12 at 1, 0
```
---

**Input**
``` java {11,18,22}
class ContinueWithLabelDemo {
    public static void main(String[] args) {

        String searchMe = "Look for a substring in me";
        String substring = "sub";
        boolean foundIt = false;

        int max = searchMe.length() - 
                  substring.length();

    test:
        for (int i = 0; i <= max; i++) {
            int n = substring.length();
            int j = i;
            int k = 0;
            while (n-- != 0) {
                if (searchMe.charAt(j++) != substring.charAt(k++)) {
                    continue test;
                }
            }
            foundIt = true;
                break test;
        }
        System.out.println(foundIt ? "Found it" : "Didn't find it");
    }
}
```
**Output**
```
Found it
```
:::

3. `return`语句  
   终止当前方法，方法的执行结果将会返回给调用该方法的地方。

## 2.7 数组
+ 数组是用来存放一组相同数据类型的容器。  

+ 数组中每一项被称为**元素**。  

+ 每个数组自动的隐含了一个标识其长度的属性`length`，可以使用`arrayName.length`表达式来获取。   

+ 数组的下标从 0 开始，到其长度减 1 结束。  

+ 在内存中，数据部分存放在**堆内存**，并在**栈内存**存放一个指向该数据的引用。

### 2.7.1 声明
数组的声明包含两部分：**数组的类型**和**数组的名称**。  
**格式**  
1. 
``` java
type[] arrayName;
```

2. 
``` java
type arrayName[];
```

### 2.7.2 创建
一个数组在声明时不会真正在堆内存分配空间，而只在栈内存生成了一个指向`null`的地址引用。  
我们使用`new`关键字来创建数组。  
**格式**
``` java
arrayName = new type[num];
```
下面是一个创建包含 10 个`int`元素的数组的例子：  
``` java
anArray = new int[10];
```

### 2.7.3 初始化
数组在创建完成后，程序会自动给该数组赋该数组类型的默认值，默认值详见[数据类型](#数据类型)。  
我们可以手动对每个元素进行赋值：  
``` java
anArray[0] = 100; // initialize first element
anArray[1] = 200; // initialize second element
anArray[2] = 300; // and so forth
```

::: tip 合并声明、创建和初始化
以下两种缩写形式可以将数组的声明、创建和初始化合并在一条语句中。  
1. 
``` java
type[] arrayName = new type[]{e1, e2, ...};
```

2. 
``` java
type[] arrayName = {e1, e2, ...};
```
:::

::: danger 注意
数组一经创建，其**长度即固定，不可改变**。
:::

### 2.7.4 多维数组
简单讲，多维数组是“数组的数组”。n 维数组的每一个元素都是 n-1 维数组。  
下面是一个多维数组的例子：  
**Input**
``` java
class MultiDimArrayDemo {
    public static void main(String[] args) {

        String[][] names = {
            {"Mr. ", "Mrs. ", "Ms. "},
            {"Smith", "Jones"}
        };
        // Mr. Smith
        System.out.println(names[0][0] + names[1][0]);
        // Ms. Jones
        System.out.println(names[0][2] + names[1][1]);
    }
}
```
**Output**
```
Mr. Smith
Ms. Jones
```

### 2.7.5 使用
+ 访问元素  
  使用`arrayName[index]`表达式来访问某元素。

+ 数组复制  
  数组的名称仅仅标识了对数组数据的引用，所以下面的代码中，两个数组指向的是堆内存中同一个数组数据。  
  ``` java
  int[] arr1 = {1, 2, 3};
  int[] arr2 = arr1;
  ```

  Java 在`System`类中提供了`arraycopy()`方法用来复制一个数组，其本质是在堆内存中生成一个新的内容相同的数组数据。  
  其具体参数是： 
  ``` java
  System.arraycopy(src, srcPos, dest, destPos, length)
  ```
  可以将数组`src`中，从`srcPos`开始的`length`个元素复制到`dest`数组的`destPos`位置。  