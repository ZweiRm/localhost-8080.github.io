---
prev:
    text: 'Object / System / 异常 / 枚举'
    link: 'java/api-lang-basics'
next:
    text: '包装类'
    link: 'java/api-lang-wrapper'
---

# String 类
### 4.5.1 基本信息
**Package** java.lang
`public final class String`

+ `String`类是一个最终类，表示字符串。

+ 所有字符串都是`String`类的实例。

+ 字符串是常量，创建后不可更改，但可以被共享。

### 4.5.2 重要方法
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

### 4.5.3 正则表达式
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
