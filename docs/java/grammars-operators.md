---
prev:
    text: '数据类型'
    link: 'java/grammars-data-types'
next:
    text: '表达式与流程控制'
    link: 'java/grammars-flow-control'
---

# 运算符
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

