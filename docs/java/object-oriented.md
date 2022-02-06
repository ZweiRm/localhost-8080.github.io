---
prev: ./grammars
next: ./API-introduction
---

# 面向对象
## 3.1 概述
### 3.1.1 面向过程
面向过程注重过程，强调完成这个过程的具体动作。  
其设计理念是[自顶向下，逐步求精](./语法.html/#顺序结构)的。

### 3.1.2 面向对象
面向对象 (Object-Oriented) 注重对象，当我们拥有这个对象时，我们就拥有了这个对象所具有的一切功能。  
面向对象技术最大的三个特征是：**封装**，**继承**和**多态**。

## 3.2 类和对象
### 3.2.1 类
类 (Class) 是 Java 程序设计语言的基础。  
类似于显示生活中“种类”的概念，Java 中的类也是一种对某类事物进行抽象和归并。  
我们对某类事物进行抽象分析，去粗取精，由表及里，判断出这类事物最本质的特征，并用 Java 中预定的手法进行表述，就形成了一个类。  
一个类包含两大内容：**属性**和**方法**（也称“**成员变量**”和“**成员方法**”）。

::: tip 成员变量和局部变量的区别
1. 定义位置不同：
   * 成员变量是定义在类内方法外

   * 局部变量是定义在方法或者语句内部

2. 作用域不同：
   * 成员变量作用域整个类

   * 局部变量只能在定义的方法或者语句内部使用

3. 内部存储位置不同：
   * 成员变量存在堆内存中，并且在堆内存中自动的赋予默认值

   * 局部变量是存储在栈内存中，不会自动给值

4. 生命周期不同：
   * 成员变量是随着对象的创建而加载到堆内存中，随着对象的回收而释放;

   * 局部变量在方法或者语句执行的时候才会创建，随着方法或者语句的结束而立即移除栈内存
:::

### 3.2.2 对象
对象 (Object) 是对类的实例化。  
我们可以通过某类的具体对象来进行具体操作。  
使用`new`关键字可以创建新的对象，使用`.`运算符获取并使用该对象所具有的方法。  
对象在程序中传递时，传递的是引用地址而不是数据本身。

### 3.2.3 `this`
+ `this`关键字  
  + `this`关键字可以表述一个对当前对象自身的引用。  

  + 在本类中使用`this`可以调用本类的**非静态方法**和**非静态属性**。

+ `this()`语句  
  + 表示在本类的构造方法中调用**本类**的其他的对应形式的构造函数。  

  + 必须放在构造函数的第一行。

### 3.2.4 `super`
+ `super`关键字
  + `super`关键字用以表示对父类对象的引用。

  + 表示在子类中调用父类中的方法和属性。

+ `super()`语句
  + 表示子类的构造方法中，调用父类中对应形式的构造方法。

  + 必须写在子类构造函数的第一行。

  + 每一个子类的构造函数都直接或间接的含有`super()`语句。  

  + 如果父类中没有提供无参构造，那么此时子类的构造函数中必须手动添加一个`super()`语句。

## 3.3 方法
方法 (Method) , 也称为函数。  
为实现代码复用，需要将代码进行封装。这种封装的形式就是方法。  
方法在定义好之后，必须明确返回值类型。若方法有明确的返回值类型，还要确保方法有返回值。  

**作用**：
+ 提高代码复用性。  

+ 使代码结构更加清晰。

+ 便于模块化开发。

**方法签名**：一个方法由其修饰符、返回值类型、方法名和形式参数唯一确定，这一组数据称为方法签名。  
定义：`修饰符 返回值类型 方法名(形式参数) {...}`  
例如：`public void method(int num1, int num2) {...}`  

### 3.3.1 构造方法
与类同名且没有返回值类型。  
可以被重载。  
构造函数中可以存在`return`语句，用于规避不合理的数据。  
**作用**：用于创建对象（标识对象创建的开始和结束）

### 3.3.2 方法的使用
+ 方法递归  
  **核心**：方法调用自己本身  
  ::: warning 注意 
  需要控制好结束条件，若递归层数太深，则出现栈溢出错误。
  :::

+ 方法重载 (Method Overload)  
  详见[多态](#多态)。
  
+ 方法覆盖 (Method Override)  
  详见[多态](#多态)。

::: warning 注意
在传递参数的时候，对于基本类型而言，传递的实际值；对于引用类型而言，传递的是地址。  
例如在传递数组对象时，只要地址不发生改变，方法中的一切变化会作用于原数组。
:::



## 3.4 代码块
### 3.4.1 构造代码块
+ 定义在类内。  

+ 也称“初始化代码块”，在创建对象时执行构造方法之前先执行。  

+ 用于完成一些初始化的操作。

### 3.4.2 局部代码块
+ 定义在方法或代码块中。  

+ 限制变量的生命周期和使用范围。  

+ 可以提高内存的利用率。

## 3.5包
包是类的容器，提供了解决命名空间冲突的方案。  
### 3.5.1 包的声明  
  - 使用`package`关键字声明定义一个包。  

  - 一个`.java`文件只允许存在一个`package`语句。  

  - 包的声明必须放在`.java`文件的首行。  

### 3.5.2 包的导入  
  - 使用`import`关键字来导入别的包。  
  
  - `*`为通配符，表示导入该包下所有类（不包括子包中的类）。  

### 3.5.3 JDK 常用包  
  - `java.lang`：核心包，在程序启动时自动加载到方法区，不需要手动导入  

  - `java.util`：工具包，存放简化操作的工具类

  - `java.io`：数据传输

  - `java.net`：网络传输

  - `java.math`：数学运算

  - `java.sql`：数据库相关

  - `java.awt`：图形用户界面

  - `java.security`：数据安全

  - `javax.xxx`：扩展

  - `org.xxx`：第三方厂商、开源社区提供的包

::: warning 注意
+ 包名不能以`java`、`javax`或者`org`开头。  

+ 同包，或`lang`包下的类不使用`import`语句导入
:::

## 3.6 封装
将一个事物的相关信息聚集在一个逻辑单元内部的机制就是封装。  

**形式**：方法、属性私有化（类的封装）、内部类等。  

**优点**：提高复用性和安全性，使代码结构更加紧密。

## 3.7 继承
对于两个类 A 和 B 来说，它们之间的关系是：B 由 A 派生而来（对于 B 类来说，它拥有 A 类的所有属性和方法），则可以说 B 类继承自 A 类。

### 3.7.1 形式
使用`extends`关键字实现继承。  
Java 仅支持单继承（一个子类只能有一个父类）。

### 3.7.2 单继承与多继承
+ 单继承  
  子类只能有一个父类的继承形式。 

  **优点**：
    + 可以提高代码的复用性  

    + 可以避免方法调用的混乱，提高了方法调用的安全性
  
+ 多继承  
  子类可以拥有多个父类的继承形式。  

  **优点**：
    + 代码的复用性上要优于单继承

+ 举例  
  + `iPhone 类`仅继承自`智能设备类`。（单继承）  

    ![单继承](/img/单继承.jpg)

  + `Apple Watch 类`同时继承自`时钟类`和`只能设备类`。（多继承）  
    
    ![多继承](/img/多继承.jpg)

### 3.7.3 直接继承与间接继承
+ 直接继承  
  B 类直接派生于 A 类，称直接继承。

+ 间接继承
  B 类直接派生于 A类，C 类直接派生于 B 类。则称 C 类间接继承于 A 类。  
  ![间接继承](/img/间接继承.jpg)

::: tip 特别地
子类继承自父类时，父类中这些内容子类不可见：  
+ `private`

+ 代码块

+ 构造方法
:::

## 3.8 多态
+ 当众多对象接收到同一个消息后，可以产生不同的响应效果，这种现象称为多态。  

+ 多态性依托于继承性。  

+ 多态主要针对的是对象具有的行为，而不是属性。  

+ 可以提高代码的灵活性，配合反射实现解耦。

### 3.8.1 编译时多态
方法重载 (Method Overload)  
是**行为多态**。  
发生在同一个类中，方法名一致而参数列表不同。和修饰符、返回值类型、异常无关。  

### 3.8.2 运行时多态
+ 向上造型
  + 是**对象多态**。  

  + 父类引用指向子类对象。  
    代码高亮标出。

    **Input**
    ``` java {11}
    class Super {
      // ...
    }

    class Sub extends Super {
      // ...
    }

    class App {
      public static void main(String args[]) {
        Super super = new Sub();  // 向上造型

        Sub sub = (Sub) new Super();  // 向下造型
      }
    }
    ```
    ::: danger 注意
    向下造型是不允许的，上面的例子会通过编译器检测，但运行后会抛出异常：  
    **Output**
    ```
    java.lang.ClassCastException: class Super cannot be cast to class Sub
    ```
    :::

  + 使用向上造型时，编译期**只检查两个类之间的关系**而**不检查具体用哪个类创建对象**  

  + 对象方法看父类，方法内容看子类。  

+ 方法覆盖 (Method Override)  
  + 又称方法重写，是**行为多态**。  

  + 发生在父子类中，双方拥有方法签名完全一致的非静态方法。  

  + 调用方法的时候，调用的是重写后的方法。  

  ::: warning 注意
    1. 子类重写的方法**权限修饰符需大于等于父类**。  

    2. 关于返回值类型  
       + 若**父类方法返回值类型是引用数据类型**，则子类重写的方法的返回值类型是父类方法返回值类型的子类或其本身。  

       + 若**父类方法返回值类型是基本数据类型**，则子类重写的方法返回值类型必须和父类方法相同。  
    
    3. 子类抛出的异常需为父类异常的子类。
  :::

  **Input**
  ``` java
  class A {
    /**
    * 方法 mA
    * @return void
    */
    public void mA() {
      // ...
    }
  }

  class B extends A {
    /**
    * 方法 mB
    * @return void
    */
    public void mB() {
      // ...
    }
  }

  /**
    * 方法 m
    * @return B
    */
  class C {
    public B m() {
      // ...
    }
  }

  class D extends C {
    /**
    * 方法 m
    * @return A
    */
    public A m() {
      // ...
    }
  }

  ...

  public static void main(String[] args) {
    // 用C类声明，用D类创建对象
    // 则对象c拥有返回值类型为B的方法m()
    C c = new D();

    // 用B类声明一个变量b，来接收方法的返回值
    // 方法调用的是D类中的m()
    // 由于D类中m()的返回值类型是A，故最终是用子类接收父类对象
    B b = c.m();

    // 对象b无法调用B类中的mB()
    // b.mB();
  }
  ```

## 3.9 权限修饰符
+ Java 提供了`public`, `protected`, `默认`, `private`四种访问修饰符。  
+ 通过访问修饰符来提高程序的安全性和可维护性。

修饰符|本类中|同包类中 (本包)|子类中|其他包中 (不同包中的所有类)
:-:|:-:|:-:|:-:|:-:
`public`|可以|可以|可以|可以
`protected`|可以|可以|可以|不可以
`默认`|可以|可以|同包可以|不可以
`private`|可以|不可以|不可以|不可以

## 3.10 非权限修饰符
### 3.10.1 静态
+ Java 中使用`static`关键字来标识静态。  

+ 可以使用静态来修饰变量、方法、内部类和代码块。  

#### 3.10.1.1 静态变量
+ 也称为**类变量**。  

+ 随着类的加载而被加载到方法区中，在其内部自动赋[默认值](./语法.html/#基本数据类型)。  

+ 静态变量优先于对象而存在，故静态变量可以不通过对象，直接通过类来调用（通过对象调用也是可以被理解的）。

+ 该类所产生的所有对象实际上保存该静态变量在静态区中的地址。  

+ 静态变量被该类的所有对象所共享。

![静态内存](/img/静态内存.png)  

**路标 ->** [Java 内存分区](./#内存分区)。

::: warning 注意
+ 静态变量**不能**定义在构造代码块中

+ 在构造代码块中**可以**对静态变量赋值

**Input**
``` java
class OneClass {
  static int iSta;

  {
    iSta = 10;
  }
}

```
:::

#### 3.10.1.2 静态方法
+ 也称为**类方法**。

+ 在类加载的时候加载到方法区中的静态区。只存储在静态区，方法被调用时在栈内存中执行。

+ 静态方法**先于对象而存在**，静态方法可通过类名或对象调用，不能直接使用本类中的非静态方法和非静态属性。

::: warning 注意
+ 静态方法中**不能**定义静态变量

+ 静态方法中**不能**直接调用类中的非静态方法

+ `main()`中**不能**使用`this`或`super`

+ 静态方法**不能**重写

+ 父子类中**可以**存在方法签名一致的静态方法
  父子类中存在方法签名完全一致的方法，两者或均被`static`修饰或都不被`static`修饰

+ 静态方法**可以**被继承

+ 类只加载一次，只在第一次使用时加载到方法去，加载之后不再移除
:::

#### 3.10.1.3 静态代码块
+ 类被第一次真正使用（创建对象/调用方法）时执行一次

+ 先父后子，先静后动

**Input**
``` java
class OneClass {
  static int i = 5; // Warning: Variable 'i' initializer '5' is redundan

  static {
    i = 7;
    i += 7;
  }
}

Class AnotherClass {
  static {
    i = 7;  // Warning: The value 7 assigned to 'i' is never used 
    i += 7; // Error: Illegal forward reference
  }

  static int i = 5;
}
```
+ 在`OneClass`中  
  首先编译`int i`，后续针对`i`的操作有效。  

+ 在`AnotherClass`中  
  编译到`i = 7;`时检查之前代码中是否定义过变量`i`，若上文不存在该变量则将其暂时标记为一个成员变量。  
  此时这个变量`i`不真实存在，后续对`i`的操作无效。  
  直到找到与标记名称`i`一致的成员变量时，才会将标记的`i`真正赋值。

### 3.10.2 最终
`final`关键字可以用来修饰数据（成员变量），方法（成员方法）和类。  

#### 3.10.2.1 常量
当`final`修饰数据时，这个数据称为常量。**定义后不可修改**。  
::: warning 注意
+ 成员常量**需要在对象创建完成前进行赋初值，且只能赋值一次**。  
+ 若常量类型为**基本数据类型，其实际值不可变**；若常量类型为**引用数据类型，其地址不可变**。  

+ 若常量是静态常量，**需要在类加载之前进行赋值**。
:::

#### 3.10.2.2 最终方法
当`final`修饰方法时，这个方法称为最终方法。  

::: warning 注意
最终方法**不能被重写，可以被重载，可以被继承**。
:::

#### 3.10.2.3 最终类
当`final`修饰类时，这个类称为最终类。

::: warning 注意
+ 最终类**不能被继承**。

+ 最终类**不能拥有匿名内部类**。
:::

### 3.10.3 抽象
#### 3.10.3.1 抽象方法
+ 当需要子类存在一些名称一致但细节不同的方法时，可以在父类中事先声明出这些方法。  

+ 此时的声明行为无需为其编写方法体，使用这种方式构成的方法称为**抽象方法**，使用关键字`abstract`修饰。  

::: warning 注意
+ 抽象方法所在类**必须是抽象类**  

+ 抽象方法**必须被重写**，子类继承抽象类后**必须重写其中的抽象方法**  

+ **抽象方法之间可以重载**（重载只关注方法名和参数列表）  

+ 抽象方法的**权限是`默认`，要求子类必须同包**  
:::

::: danger 注意
+ 抽象方法**不能使用`static`修饰**（静态方法隶属于类）  

+ 抽象方法**不能使用`final`修饰**（最终方法无法被重写，不符合抽象方法的规则）  

+ 抽象方法**不能使用`private`修饰**（造成子类不可见，进而无法重载）

+ **最终类不能是抽象类**（最终类无法被继承，进而其方法也无法被重载）
:::
#### 3.10.3.2 抽象类
被`abstract`修饰的类称为抽象类。  

::: warning 注意
+ 抽象类**不能创建对象**  

+ 抽象类中**存在构造方法**  

+ 抽象类中**可以存在非抽象方法和属性**
:::

## 3.11 接口
+ 类似于类的引用类型。

+ 使用关键字 `interface` 表示  

+ 接口中方法默认且只能为抽象方法。<Badge type="error" text="< Java SE 7.0"/>  
  + 在接口中，使用 `default` 关键字修饰的方法可以拥有方法体，可以给所有具体实现对象扩展功能。<Badge text="Java SE 8.0 +"/>  
  + 接口中也可以存在静态方法，要求该方法拥有方法体。这样的方法可以直接通过接口名打点获取到。<Badge text="Java SE 8.0 +"/>  

+ 接口中的数据都为公共的静态常量（被 `final`, `static` 和 `public` 修饰的成员变量）  

### 3.11.1 接口的实现
+ 和抽象类类似，接口也可以有具体化的实现，称为实现(implements)。  

+ 使用关键字 `implements` 来使一个类变为目标接口的实现类。
  + 当类成为某接口（们）的实现类后，要求实现接口中定义的所有抽象方法。  

  + 一个类可以实现多个接口，不过可能会造成方法混乱。  

### 3.11.2 接口的多重继承
**接口可以多重继承**，使用 `extends` 关键字来继承其他接口。

::: tip 特别地
对于引用数据类型的强制转换有：
> + 在进行强制类型转换时，编译器会检查两个类之间是否存在继承关系  
>   + 若存在继承关系，则编译时会通过，但运行时不一定  
>
>   + 若不存在继承关系，编译时会报错  
>
> → 详见[引用类型的强制类型转换](./语法.html/#引用类型的强制类型转换)

由于接口之间可以多继承，接口和类之间可以多实现，所以会形成复杂的图状结构。在这样的结构中寻找根是很困难的，为提高效率，Java 在编译时会**放弃检查类于接口是否存在实现关系**。  
:::

::: warning 注意
+ 接口**不能被实例化**。  

+ 接口中**不允许定义构造方法**，**编译完成后会产生 `.class` 文件**，但**接口不是类**。  

+ 接口**默认只能被 `public` 修**饰，且实现接口的类中的**具体实现方法也只能被 `public` 所修饰**。

+ 接口中的**方法默认被 `public` 和 `abstract` 修饰**。

+ 接口**可作为模板**，用于反射中来实现解耦。
:::

## 3.12 内部类
定义在类或者接口内部的类称为内部类。

### 3.12.1 方法内部类
+ 定义在方法中的类。  

+ 只能在**定义它的方法中使用**。  

+ 方法内部类中**不能定义静态属性和静态方法**，但**静态常量是允许定义的**。

+ 方法内部类**可以使用外部类中的一些属性和方法**。**但如果使用的是当前方法的数据时，要求这个数据为常量 (自动被 `final` 修饰，不可以被修改)**。  

+ 在内部类中使用 `this` 关键字表示当前该内部类的对象。  

### 3.12.2 成员内部类
+ 定义在类的内部，方法外部的类。

### 3.12.3 静态内部类
使用 `static` 关键字修饰的内部类。

### 3.12.4 匿名内部类
+ 类体定义和对象创建写在一起的形式，没有名称，只使用一次。

+ 本质上是继承了对应的类或是实现了对应的接口（只要一个类允许被继承，那么它就可以拥有匿名内部类的形式）。

+ 若匿名内部类定义在方法中，则其使用规则同方法内部类一致。

+ 若匿名内部类定义在类中，则其使用规则同成员内部类一致。

### 3.12.5 内部接口
+ 定义在类或接口中的接口。  

+ 类中定义的接口，接口中定义的类，接口中定义的接口，默认都用 `static` 修饰。  

### 3.12.6 Lambda 表达式 <Badge text="Java 8.0+"/>
+ Lambda 表达式是 Java 8.0 提供的特性，它也被成为箭头函数、匿名函数和闭包。它体现了代码即数据（Code as Data）的思想。通过传统方法利用接口和匿名内部类等方法来实现将代码封装为数据的手段存在语法冗余、`this` 关键字在内部类中绑定和访问有误区、变量捕获有特殊要求、数据控制不友好等问题。Lambda 表达式进行了优化。它本质上只是语法上的优化而不是新的内容。  
+ Lambda 表达式是一种轻量级函数编程的思想，可以使得代码聚焦于数据逻辑处理。    
+ `->` 是 Lambda 表达式的核心操作符，在它左边是参数列表，右侧是操作表达式。  
+ Lambda 表达式只能操作一个方法。它的本质就是对函数式接口的实现。  

**函数式接口 Functional Interface**  
+ 函数式接口是只包含一个抽象方法的特殊接口。可以使用语义化检测注解 `@FunctionalInterface` 来对其进行修饰进行检查。  
+ 因为 Java 8.0 提供了接口默认方法，所以可以利用默认方法来对函数式接口增加通用功能，而不是在实现类中增加。  
+ 类似的，Java 8.0 也提供了接口中的静态方法。当业务中有需要使用类名打点直接获取方法时，可以直接在接口中定义这样的静态方法。  
+ **虽然函数式接口要求只能存在一个抽象方法，但如果有额外的继承自 Object 类的抽象方法，它们也可以存在于函数式接口中。*  

``` java
@FunctionalInterface
public interface SomeFuncIntf {
    // 唯一的抽象方法
    String method(String parameter);

    // 默认方法
    default String defaultMehod(String parameter) {
        // ...
    }

    // 静态方法
    static String staticMehod(String parameter) {
        // ...
    }

    // 继承自 Object 类的其他抽象方法
    String toString();
}
```

利用 Lambda 表达式对函数式接口编写具体实现：  
``` java
SomeFuncIntf somefunc = (String parameter) -> {
    return "The results";
}
```

**Java 内建函数式接口**  
在 Java 8.0 中提供了一些预定义的常用函数式功能，它们被划分于 `java.util.function` 包中。  
+ `java.util.function.Predicate<T>`  
  接收参数对象 `T`, 返回一个 `boolean` 类型的结果。  
  ``` java
  Predicate<Integer> pre = (Integer intg) -> {
      return intg > 0;
  };

  // 使用 test() 验证
  System.out.println(pre.test(3));
  ```

+ `java.util.function.Consumer<T>`  
  接收参数对象 `T`, 不返回结果。  
  ``` java
  Consumer<Integer> con = (Integer intg) -> {
      System.out.println("Consuming " + intg);
  };

  // 使用 accept() 验证
  con.accept(3);
  ```

+ `java.util.function.Supplier<T>`  
  不接受参数，返回结果对象 `T`.    
  ``` java
  Supplier<String> supp = () -> {
      return UUID.randomUUID().toString();
  };

  // 使用 get() 验证
  System.out.println(supp.get());
  ```

+ `java.util.function.Function<T, R>`  
  接收参数对象 `T`, 返回结果对象 `R`.  
  ``` java
  Function<String, Integer> func = (String msg) -> {
      return msg.equals("Yes") ? 1 : 0;
  };

  // 使用 apply() 验证
  System.out.println(func.apply("No"));
  ```

+ `java.util.function.UnaryOperator<T>`  
  接收参数对象 `T`, 返回结果对象 `T`. 它继承了 `Function`接口。  
  ``` java
  UnaryOperatorr<String> uOpt = (String msg) -> {
      msg += " done";
      return msg;
  };

  // 使用继承自 Function 的 apply() 验证
  System.out.println(uopt.apply("Yes"));
  ```

+ `java.util.function.BinaryOperator<T>`  
  接收两个参数对象 `T`, 返回一个结果对象 `T`. 它继承了 `Function`接口。  
  ``` java
  BinaryOperator<Integer> biOpt = (Integer num1, Integer num2) -> {
      return num1 > num2 ? 1 : 0;
  };

  // 使用继承自 Function 的 apply() 验证
  System.out.println(biOpt.apply(1, 2));
  ``` 

**基本语法**  
`[接口声明] = (参数) -> {代码块};`  
+ 接口声明：与该 Lambda 表达式关联的接口的声明，用于接收结果。
+ 参数：与关联接口中抽象方法中声明的参数相同（包括个数相同和顺序相同）。可以不声明参数的类型，JVM 会自动通过绑定的函数式接口推断参数的类型。
+ 操作符：`->`.
+ 执行代码块：出现在操作符右侧，负责描述具体逻辑。当所需要执行的代码只有一行时，可以省略括号。当所需要执行的代码只有一行且有返回值时，可以省略括号和 `return` 关键字。  

*类型*  
+ 没有参数、没有返回值的函数式接口抽象函数  
  ``` java
  // 接口定义
  interface LambdaWithoutReturnAndParameter {
      void method();
  }

  // 具体执行
  LambdaWithoutReturnAndParameter lbdNRNP = () -> System.out.println("Hello world!");
  lbdNRNP.method();
  ```

+ 带有参数，没有返回值的函数式接口抽象函数  
  ``` java
  interface LambdaWithoutReturnWithParameter {
      void method(String name, int age);
  }

  LambdaWithoutReturnWithParameter lbdNRWP = (String name, int age) -> {
      System.out.println("Name: " + name + ", Age: " + age);
  };
  lbdNRWP.method("Tom", 18);
  ```

+ 带有参数，带有返回值的函数式接口抽象函数  
  ``` java
  interface LambdaWithReturnAndParameter {
      int method(int num1, int num2);
  }

  LambdaWithReturnAndParameter lbdWRWP = (num1, num2) -> num1 + num2;
  System.out.println(lbdWRWP.method(1, 2));
  ```

**变量捕获**  
Lambda 表达式可以实现在匿名内部类的参数捕获功能。  
+ 在 Lambda 表达式形式的匿名内部类中，`this` 关键字表示它所在外部类的对象。  
+ 可以直接访问匿名内部类中的局部变量。
+ 可以直接访问外部类成员方法中的局部变量，但默认自动被 `final` 修饰，无法进行修改。

``` java
class Main {
    String globalVar = "global";

    public void method() {
        String localVar = "local";

        // 匿名内部类
        new Thread(() -> {
            String innerVar = "inner";

            // 使用 this 来访问全局变量
            System.out.println(this.globalVar);

            // 访问内部类中的内部变量
            System.out.println(innerVar);

            // 访问外部类成员方法的局部变量
            System.out.println(localVar);

            // localVar = "hello"; 不允许被修改
        });
    }
}
```

**类型推断**  
Lambda 表达式参数类型自动推断  
在使用 Lambda 表达式来实现一个函数式接口时，JVM 会自动联系它对应的函数式接口来推断出参数的具体类型。所以在编写 Lambda 表达式时可以不用显式声明参数的类型。  
``` java
// 函数式接口
@FunctionalInterface
interface OneFuncInterf<T, R> {
    R method(T t, R r);
}

public class Main {
    // 以函数式接口为参数的方法，作用是将传入的字符串加入到指定的 List 中
    public static void execute(OneFuncInterf<String, List> interf) {
        List<String> list = interf.method("Hello", new ArrayList());
        System.out.println(list);
    }

    // Lambda 形式执行 execute 方法
    execute((x, y) -> {
        y.add(x);
        return y;
    });

    // 匿名内部类形式执行 execute 方法
    execute(new OneFuncInterf<String, List>() {
        @Override
        public List method(String s, List list) {
            list.add(s);
            return list;
        }
    });
}
```

**方法重载**  
在同一个类中有多个名称相同但参数列表或返回值不同的方法称为方法重载。对于参数列表是不同函数式接口的重载方法，它作为 Lambda 表达式形式实现接口时，会因为无法推断出当前对应的具体接口而报错。此时请使用传统匿名内部类形式来实现该接口。  
``` java
public class Main {
    // 两个内部接口
    interface IntfOne {
        void method(String s);
    }

    interface IntfTwo {
        void method(String s);
    }

    // 重载方法
    public void execute(IntfOne intf) {
        intf.method("Hello");
    }

    public void execute(IntfTwo intf) {
        intf.method("World");
    }

    // 主函数
    public static void main(String[] args) {
        Main main = new Main();

        // 使用 Lambda 形式创建接口对象
        // main.execute((String s) -> {
        //     System.out.println(s);
        // });

        // 使用匿名内部类形式创建接口对象
        main.execute(new IntfOne() {
            @Override
            public void method(String s) {
                System.out.println(s);
            }
        });

        main.execute(new IntfTwo() {
            @Override
            public void method(String s) {
                System.out.println(s);
            }
        });
    }
}
```

**底层原理**  
编写简单的 Lambda 表达式代码并对其反编译查看结果。  
``` java
public class Main {
    public static void main(String[] args) {
        Interf interf = (s) -> System.out.println(s);
        interf.method("Hello world.");
    }
}

interface Interf {
    void method(String s);
}
```

反编译 Main.class 有：  
``` java{4}
public class Main {
  public Main();
  public static void main(java.lang.String[]);
  private static void lambda$main$0(java.lang.String);  // 具体方法实现
}
```
其中生成了静态方法 `lambda$main$0`, 即：  
``` java
public class Main {
    ...

    private static void lambda$main$0(java.lang.String s) {
        System.out.println(s);
    }
}
```

继续对整个编译过程动态编译，有：  
``` java{3}
final class Main$Lambda$1 implements Interf {
    private Main$$Lambda$1();
    public void method(java.lang.String);
}
```
即：  
``` java
public class Main {
    ...

    final class Main$Lambda$1 implements Interf {
        private Main$$Lambda$1();
        public void method(java.lang.String s) {
            Main.lambda$main$0();   // 调用上面的具体实现方法
        }
    }
}
```

最后在执行时创建 `Main$Lambda$1` 类的对象，调用其方法进行执行。


**方法引用**  
方法引用与Lambda 表达式绑定使用。  

+ 静态方法引用  
  语法：`类名::方法名`
+ 实例方法引用  
  语法：创建一个类的实例后，使用 `对象名::方法名`
+ 构造方法引用  
  语法: `类名::new`, 使用对应的函数式接口对象接收

使用方法引用等方法来实现对 `Person` 对象集合的操作：
``` java
@Data
@AllArgsConstructor
@NoArgsConstructor
class Person {
    private String name;
    private String gender;
    private int age;

    public static int comparaByAge(Person p1, Person p2) {
        return p1.getAge() - p2.getAge();
    }
}

class PersonUtil {
    public int compareByName(Person p1, Person p2) {
        return p1.getName().hashCode() - p2.getName().hashCode();
    }
}

interface IPerson {
    // 通过指定类型的构造方法初始化对象数据
    Person initPerson(String name, String gender, int age);
}

public class Main {
    // 存储 Person 对象列表
    List<Person> personList = new ArrayList();
    personList.add(new Person("Amy", "F", 16));
    personList.add(new Person("Bob", "M", 18));
    ...

    // 匿名内部类实现集合对比 (Comparator)
    Collections.sort(personList, new Comparator<Person>() {
        @Override
        public int compare(Person o1, Person o2) {
            return o1.getAge() - o2.getAge();
        }
    });

    // Lambda 表达式实现集合对比
    // Lambda 表达式自动关联相应的函数式接口，自动推断参数类型，填充到具体逻辑中。生成具体的对象传给 sort()
    Collections.sort(personList, (p1, p2) -> p1.getAge() - p2.getAge());

    // 静态方法引用实现集合对比
    // 静态方法引用直接调用自己编写的逻辑关联到函数式接口，而不需要重新再写第二遍。生成具体对象，传递给 sort()
    Collections.sort(personList, Person::compareByAge);

    // 实例方法引用实现集合对比
    // 直接生成一个对象，关联替换对应函数式接口匿名方法。生成对象传递给 sort()
    PersonUtil personutil = new PersonUtil();
    Collections.sort(personList, personutil::compareByName);

    // 构造方法引用
    // 通过函数式接口获取 Person 类型的构造接口
    IPerson ip = Person::new;
    Person person = ip.initPerson("Jerry", "M", 22);    // 使用构造接口创建对象
}
```


## 3.13 泛型
使用泛型可以在定义类、接口和函数时将某一个类型（即某一个类或者某一个接口）作为参数。它可以使得在使用不同类型作为输入下重用某些代码，效果类比形式参数。  

主要作用：  
+ 更强的编译时类型检查  
  Java 编译器会在编译器对泛型进行检查，从而降低了整个程序在运行时发生错误的概率。  
+ 消除类型转换  
  例如：默认情况下 List 存放的是 `Object` 类型数据。所有其他引用类都是 `Object` 的子类，所以各类型数据都可以成功存入默认的 List 中。但在试图通过默认 List 接收一个指定类型的元素时，就会发生类型转换。如果我们对整个 List 使用泛型声明元素类型后，后续提取接收元素则不需要类型转换。  
  默认 List:  
  ``` java{3}
  List list = new ArrayList();
  list.add("hello");
  String s = (String) list.get(0);
  ```
  使用泛型的 List:  
  ``` java{3}
  List<String> list = new ArrayList<String>();
  list.add("hello");
  String s = list.get(0);
  ```
+ 实现泛型算法  
  通过泛型来实现泛型算法。使其可定义、类型安全且易读。  

### 3.13.1 泛型类型
**声明泛型类型**  
对于规定了类型的类和接口，称之为泛型类型。对于类型参数，使用尖括号包裹。其中类型参数是一个大写的字母。  
定义语法：`class ClassName<T1, T2, ..., Tn> {...}`  
  
通常我们规定类型参数字母用以下所示的来表示：  
+ `E` Element 元素 (从 Java 集合中扩展)
+ `K` Key 键
+ `N` Number 数字
+ `T` Type 类型
+ `V` Value 值
+ `S`, `U`, `V`, etc. 类型（单个 T 无法满足需求时，按字母表序使用 T 周围的其他字母）  

举例：  
定义一个可以存放元素的 `Box` 类，其存放元素定义为 `Object` 类型。`Box` 类拥有获取元素的 `get()` 和存放元素的 `set()`. 因为可以存放的类型定义为 `Object`, 所以它可以接受任意引用类型的元素。则可能会造成一些无法在编译期被检查出来的错误：在代码的某一部分向 Box 中存放 `Integer` 类型的数据而另一部分代码向 Box 存放 `String` 类型的数据。这样就会造成运行时错误。  
``` java
public class Box {
    private Object object;

    public void set(Object object) { this.object = object; }
    public Object get() { return object; }
}
```

使用泛型来规定 Box 只能接受某一种类型的元素：  
``` java
public class Box<T> {
    // T stands for "Type"
    private T t;

    public void set(T t) { this.t = t; }
    public T get() { return t; }
}
```
在 Box 被使用时，需要指明该 Box 接受的元素类型，并且这个 Box 只能接受这样一种类型，从而避免了之前描述的错误可能。  

**调用与实例化泛型类型**  
当实例化一个参数化类型时，必须在尖括号中用具体的引用类型来代替定义时的字母，如：  
使用 `Box<Integer> intergerBox` 来声明一个只能存放 `Integer` 类型的 Box.  
使用 `new Box<Integer>()` 来实例化具体的可以存放 `Integer` 的 Box 对象。  

::: tip 钻石操作符 <Badge text="Java 7.0+"/> <Badge text="Java 9.0+"/>
在 Java SE 7.0 之后，当调用泛型类型的构造函数来实例化对象时，可以不在尖括号里写出具体的类型而让编译器自动进行推断。这样的空尖括号 `<>` 称为钻石操作符。在 Java 9 中，它新增了对匿名内部类的支持。  
例如声明并实例化一个可以存放 `Integer` 类型的 Box 写为：  
`Box<Integer> integerBox = new Box<>();`
:::

**多类型参数的泛型类型**  
泛型类型可以拥有多个类型参数。例如编写一个拥有键值对的容器接口和具体的实现类：  
``` java
// Pair 容器接口
public interface Pair<K, V> {
    public K getKey();
    public V getValue();
}

// 具体实现类：OrderedPair
public class OrderedPair<K, V> implements Pair<K, V> {

    private K key;
    private V value;

    public OrderedPair(K key, V value) {
	this.key = key;
	this.value = value;
    }

    public K getKey()	{ return key; }
    public V getValue() { return value; }
}

// 声明并创建具体实例
OrderedPair<String, Integer> p1 = new OrderedPair<>("Even", 8);
OrderedPair<String, String>  p2 = new OrderedPair<>("hello", "world");
```

**参数化类型**  
对于一个泛型类型，它声明时的类型参数也可以是一个声明了类型参数的泛型类型，称为参数和类型。  
例如：`OrderedPair<String, Box<Integer>> p = new OrderedPair<>("primes", new Box<Integer>(...));`  