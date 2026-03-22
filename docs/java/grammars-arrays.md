---
prev:
    text: '表达式与流程控制'
    link: 'java/grammars-flow-control'
next:
    text: '类与对象'
    link: 'java/oo-classes-objects'
---

# 数组
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