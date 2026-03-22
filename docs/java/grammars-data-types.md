---
prev:
    text: '基本概念与常量变量'
    link: 'java/grammars-basics'
next:
    text: '运算符'
    link: 'java/grammars-operators'
---

# 数据类型
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
[类](./oo-classes-objects.html#_3-2-1-类)、[接口](./oo-interfaces.html#_3-11-接口)和[数组](./grammars-arrays.html#_2-7-数组)  
**默认值**：`null`  
::: tip
`String`是一个引用数据类型，所以它并不包含在关键字中  
声明赋值`String String = "String";`是可以被理解的
:::

### 2.3.3 数据类型转换
#### 2.3.3.1 隐式转换/自动类型转换

![自动类型转换.png](/img/自动类型转换.png)
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

