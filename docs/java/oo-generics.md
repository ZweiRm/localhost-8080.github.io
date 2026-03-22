---
prev:
    text: '内部类与Lambda'
    link: 'java/oo-inner-classes'
next:
    text: 'API-介绍'
    link: 'java/api-introduction'
---

# 泛型
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
设定了类型参数的泛型类型称为参数化类型。例如：`List<String>`  

对于一个泛型类型，它声明时的类型参数也可以是一个声明了类型参数的泛型类型。  
例如：  
`OrderedPair<String, Box<Integer>> p = new OrderedPair<>("primes", new Box<Integer>(...));`  

**原始类型**  
当一个泛型类型在声明和实例化时没有声明类型参数时，称为原始类型。  
对于上面的泛型类型 Box 来说，省略类型参数声明之后：`Box rawBox = new Box();`  
就是声明并实例化了 Box 的原始类型。  
+ 一个非泛型类型的普通类型不称为原始类型也无需声明类型参数。  
+ 当使用声明了类型参数的变量接收（引用）原始类型时，会得到警告 `unchecked conversion`
  ``` java{2}
  Box rawBox = new Box();
  Box<Integer> intBox = rawBox;
  ```
+ 当声明的原始类型变量接收（引用）泛型类型时，会得到警告 `unchecked invocation`  
  ``` java{2}
  Box<Integer> intBox = new Box<>();
  Box rawBox = intBox;
  ```
+ 当声明的原始类型变量接收（引用）泛型类型并使用泛型类型的方法时，会得到警告 `unchecked invocation to {method}`
  ``` java {3}
  Box<String> stringBox = new Box<>();
  Box rawBox = stringBox;
  rawBox.set(8);  // warning: unchecked invocation to set(T)
  ```

### 3.13.2 泛型方法
类似泛型类型，当一个方法声明了它限定使用的类型后称为泛型方法。对于方法的泛型，它的作用域只在被声明的函数里。  
语法：`权限控制符 [静态] <泛型 1, 泛型 2, ...> 返回值类型 方法名(参数列表) {...}`  
**泛型和静态的声明必须出现在返回值类型前**。  

编写一个 `Util` 类，其中包含泛型方法 `compare()` 用来比较两个泛型类型 `Pair`:  
``` java{20-23}
// Pair 类
public class Pair<K, V> {

    private K key;
    private V value;

    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public void setKey(K key) { this.key = key; }
    public void setValue(V value) { this.value = value; }
    public K getKey()   { return key; }
    public V getValue() { return value; }
}

// Util 类
public class Util {
    public static <K, V> boolean compare(Pair<K, V> p1, Pair<K, V> p2) {
        return p1.getKey().equals(p2.getKey()) &&
               p1.getValue().equals(p2.getValue());
    }
}
```

调用 `compare()` 来比较两个 `Pair` 实例：  
``` java{6}
// 实例化 Pair
Pair<Integer, String> p1 = new Pair<>(1, "apple");
Pair<Integer, String> p2 = new Pair<>(2, "pear");

// 调用比较函数，结果由布尔变量 same 所引用
boolean same = Util.<Integer, String>compare(p1, p2);
```
*类型推断*  
在调用泛型方法时，编译器可以自动推断出这个泛型方法所需要的类型参数，所以调用时的类型参数声明可以被省略。  
``` java{3}
Pair<Integer, String> p1 = new Pair<>(1, "apple");
Pair<Integer, String> p2 = new Pair<>(2, "pear");
boolean same = Util.compare(p1, p2);
```

### 3.13.3 有界类型参数
当限定泛型类型可接受的类型参数范围时（例如只接受某一类及其子类作为类型参数）称为有界类型参数。  
+ 使用 `extends` 关键字来设定类型参数的上界；使用 `super` 关键字来设定类型参数的下界。  
  语法：`<X extends 类/接口>` 上界, ``<X super 类/接口>`` 下界  
  ``` java{2,8}
  // 规定了上界的泛型方法
  public <U extends Number> void inspect(U u){
      System.out.println("T: " + t.getClass().getName());
      System.out.println("U: " + u.getClass().getName());
  }

  // 规定了上界的泛型类型
  public class NaturalNumber<T extends Integer> {...}
  ```
+ 当拥有多个界时，类型参数直接用 `&` 隔开。`<T extends B1 & B2 & B3>`  
  一个具有多个界的类型变量是边界中列出的所有类型的一个子类型。如果其中一个界是一个类，必须首先指定它。  
  ``` java{5}
  Class A { /* ... */ }
  interface B { /* ... */ }
  interface C { /* ... */ }

  class D <T extends A & B & C> { /* ... */ }
  ```
+ 当一个泛型类型设定好它的类型参数范围后，可以使用这个类型参数的方法。  
  ``` java{8}
  public class NaturalNumber<T extends Integer> {

      private T n;

      public NaturalNumber(T n)  { this.n = n; }

      public boolean isEven() {
          return n.intValue() % 2 == 0;
      }

      // ...
  }
  ```

实例：编写一个泛型数组的元素对比函数，要求计数比指定元素大的所有元素个数。  
``` java
public static <T extends Comparable<T>> int countGreaterThan(T[] anArray, T elem) {
    int count = 0;
    for (T e : anArray)
        if (e.compareTo(elem) > 0)
            ++count;
    return count;
}
```
在循环中，不使用 `e > elem`. 因为比较运算符只适用于基本数字类型。使用有界类型参数来使用 `Comparable` 接口的 `compareTo()` 实现对比。  

::: tip 关于泛型的类型推断
+ 实例化时类型参数的自动推断  
  当调用泛型类型的构造函数来实例化对象时，可以不在尖括号里写出具体的类型而让编译器自动进行推断，称为钻石操作符。  
  ``` java
  Map<String, List<String>> myMap = new HashMap<>();
  ```
  钻石操作符不可省略，否则声明的是原始类型。  
+ 调用泛型方法时的类型推断  
  在调用泛型方法时，编译器可以自动推断出这个泛型方法所需要的类型参数，所以调用时的类型参数声明可以被省略。  
  ``` java
  // 泛型方法定义
  public static <U> void addBox(U u, java.util.List<Box<U>> boxes) {/* ... */}

  // 自动推断出调用时的类型参数是 Integer
  BoxDemo.addBox(Integer.valueOf(20), listOfIntegerBoxes);
  ```
+ 构造函数类型推断  
  构造函数也可以被写成泛型方法。是实例化时，可以类似泛型方法的类型推断而不必写出具体的类型参数。  
  ``` java
  class MyClass<X> {
    // 带有类型参数的构造函数
    <T> MyClass(T t) {
      // ...
    }
  }

  // 实例化时，从传入的 "" 推断出构造函数所需要的类型参数是 String
  MyClass<Integer> myObject = new MyClass<>("");
  ```
:::

### 3.13.4 通配
在泛型代码中，问号（`?`）被称为通配符，代表未知类型。通配符可以在各种情况下使用：作为参数、字段或局部变量的类型；有时作为返回类型（尽管更好的编程实践要求其更具体）。  
注意：**通配符永远不会被用作泛型方法调用、泛型类型实例创建或超类型的类型参数。**  

**上界通配**  
使用通配符可以设定泛型类型参数的上边界。  
语法：`<? extends 类/接口>`.  
实例：定义一个 `sumOfList()` 来获得 List 中所有元素的和。要求 List 元素可以为 `Number` 及其子类类型，和以 `double` 形式储存。  
``` java
// sumOfList()，使用上界通配规定参数 List 中元素的上界为 Number
public static double sumOfList(List<? extends Number> list) {
    double s = 0.0;
    for (Number n : list)
        s += n.doubleValue(); // 使用 doubleValue() 来使得结果为 double 类型
    return s;
}

// 计算 Integer 类型 list 的元素和
List<Integer> li = Arrays.asList(1, 2, 3);
System.out.println("sum = " + sumOfList(li));

// 计算 Double 类型 list 的元素和
List<Double> ld = Arrays.asList(1.2, 2.3, 3.5);
System.out.println("sum = " + sumOfList(ld));
```

**下界通配**  
类似上界通配，使用通配符可以设定泛型类型参数的上边界。  
语法：`<? super 类/接口>`.  
实例：定义一个方法来计算 1 到 10 的和（1 + 2 + 3 + ... + 10），并且将每一轮的结果添加到一个 `List` 中。要求这个 `List` 存放元素的类型是 `Integer` 及其父类类型。  
``` java
public static void addNumbers(List<? super Integer> list) {
    for (int i = 1; i <= 10; i++) {
        list.add(i);
    }
}
```

**无界通配**  
当在尖括号内只写一个问号时，称为无界通配，它用来表示未知类型。  
通常有两种适用情形：  
+ 当编写的方法可以被 `Object` 类的功能所实现  
+ 泛型类型中的方法与参数类型无关  
  例如泛型类型 `List<T>` 中，`List.size()` 和 `List.clear()` 与 `T` 具体是什么类型无关。  

实例：编写一个遍历打印 List 元素的方法。  
``` java
// 错误写法，这个方法只能遍历打印元素为 Object 类型的 List
// 元素为其他类型的 List 不是 List<Object> 的子类
public static void printList(List<Object> list) {
    for (Object elem : list)
        System.out.println(elem + " ");
    System.out.println();
}

// 正确写法，使用无界通配保证元素为任何类型的 List 都是 List<Object> 的子类
public static void printList(List<?> list) {
    for (Object elem: list)
        System.out.print(elem + " ");
    System.out.println();
}

// 调用 printList()
List<Integer> li = Arrays.asList(1, 2, 3);
List<String>  ls = Arrays.asList("one", "two", "three");
printList(li);
printList(ls);
```
**`List<Object>` 与 `List<?>` 是不同的。你可以在 `List<Object>` 中插入一个 `Object` 或者 `Object` 的任何子类型。但是你只能在 `List<?>` 中插入 `null`.**  

::: warning 关于继承关系
**泛型类型的泛化**  
类似类之间的多态，一个父类声明可以引用子类对象（例如 `Object someObj = new Integer(1);`, 一个类型参数声明为父类的泛型类型可以存放子类元素。  
``` java
Box<Number> box = new Box<Number>();
box.add(new Integer(10));   // OK
box.add(new Double(10.1));  // OK
```
但要注意：**声明了类型参数为父类的泛型类型与声明了类型参数为子类的泛型类型不构成继承关系。**  
``` java{6,7}
// 一个参数要求为 Number 为类型参数的泛型类型 Box 的函数
public void boxTest(Box<Number> n) { /* ... */ }

Box<Integer> intBox = new Box<>();
Box<Double> doubleBox = new Box<>();
// boxTest(intBox);
// boxTest(doubleBox);
```
![泛型类型的泛化](/img/泛型类型泛化.png)

泛型类型之间可以通过 `extends` (类) 和 `implements` (接口)来实现继承关系。例如 `ArrayList<E>` 实现了 `List<E>`，而 `List<E>` 继承了 `Collection<E>`. 那么这三个类直接是继承关系。那么对应的，当声明了父类参数类型且后续不变时，类之间的继承关系保留，例如：`ArrayList<String>` 是 `List<String>` 的子类，而 `List<String>` 是 `Collection<String>` 的子类。  
![Collection继承关系](/img/Collection继承关系.png)

**泛型类型继承关系**  
使用通配可以实现泛型类型的继承关系。  
对于 `Box<Integer>` 和 `Box<Number>` 来说，虽然它们之间不存在继承关系，但是它们的公共父类可以是 `Box<?>`.
![Box的公共父类](/img/Box公共父类.png)  

利用上下界通配可以真正实现类型参数是子父类的泛型类型继承。例如：  
``` java
// 泛型类型向上造型
List<? extends Integer> intList = new ArrayList<>();
List<? extends Number>  numList = intList;  // OK. List<? extends Integer> is a subtype of List<? extends Number>
```
对于 `List<?>`, `List<Number>`, `List<Integer>`, `List<? extends Number>`, `List<? extends Integer>`, `List<? super Number>`, `List<? super Integer>` 它们之间的关系为：  
![List继承关系](/img/List继承关系.png)
:::

**通配捕获与 Helper 函数**  
当在代码中声明了一个通配符时，编译器会去通过它周围的代码推断出这个通配符所需要的具体类型，称为通配捕获。  
但在某些情况下，编译器无法推断出具体所需要的类型时，就会报 `WildcardError`. 这时需要编写一些 Helper 方法来使得泛型捕获到正确的类型。  

实例：  
``` java
import java.util.List;

public class WildcardError {

    void foo(List<?> i) {
        i.set(0, i.get(0));
    }
}
```
会得到错误：  
```
WildcardError.java:6: error: method set in interface List<E> cannot be applied to given types;
    i.set(0, i.get(0));
     ^
  required: int,CAP#1
  found: int,Object
  reason: actual argument Object cannot be converted to CAP#1 by method invocation conversion
  where E is a type-variable:
    E extends Object declared in interface List
  where CAP#1 is a fresh type-variable:
    CAP#1 extends Object from capture of ?
1 error
```
在代码中，编译器会把参数 `i` 推断为 `Object`. 之后在 `foo()` 中调用变量 `i` 所在的 `List` 接口中的 `List.set(int, E)`. 这个函数要求第二个参数是一个类型参数，但因为编译器之前将 `i` 推断成为 `Object` 类型，所以对应 `i.get(0)` 也是 `Object` 类型。这样的结果与要求不匹配，编译器无法确定对 list 插入的值到底是何种类型而报错。  

通过编写一个 `fooHelper()` 来绕过编译器的类型安全检测：  
``` java
public class WildcardFixed {

    void foo(List<?> i) {
        fooHelper(i);
    }


    // Helper method created so that the wildcard can be captured
    // through type inference.
    private <T> void fooHelper(List<T> l) {
        l.set(0, l.get(0));
    }

}
```
这样以来，在 `foolHelper()` 中已经声明了类型参数是 `T`，编译器就可以在 `List.set(int, E)` 中确定第二个参数是 `T` 类型的，从而符合类型安全。  

实例 2：  
``` java
import java.util.List;

public class WildcardErrorBad {

    void swapFirst(List<? extends Number> l1, List<? extends Number> l2) {
      Number temp = l1.get(0);
      l1.set(0, l2.get(0)); // expected a CAP#1 extends Number,
                            // got a CAP#2 extends Number;
                            // same bound, but different types
      l2.set(0, temp);	    // expected a CAP#1 extends Number,
                            // got a Number
    }
}

// 具体调用执行
List<Integer> li = Arrays.asList(1, 2, 3);
List<Double>  ld = Arrays.asList(10.10, 20.20, 30.30);
swapFirst(li, ld);
```
虽然两个 list 都符合 `List<? extends Number>`, 但显然 `Integer` 与 `Double` 无法匹配。这样的代码也无法编写 Helper 函数来解决。  

::: tip 通配使用建议
建议通过以下规则来确定具体代码中使用上下界通配时的范围确定：  
将变量看做两大类型：输入型和输出型。其中，  
+ 输入型变量：向代码提供数据。  
+ 输出型变量：保存数据，供给其他地方使用。  

例如：一个函数 `copy(src, dest)`, 其中 `src` 是输入型变量， `dest` 是输出型变量。  

以此为标准，当要确定通配上下界时：  
+ 输入型变量用上界通配
+ 输出型变量用下界通配
+ 当输入型变量可以使用 `Object` 类特性时，用无界通配
+ 变量既有输入特性又有输出特性，不使用通配  

*这些准则并不适用于方法的返回类型。应该避免使用通配符作为返回类型，因为它迫使使用代码的程序员去处理通配符。*  

**关于 `List<? extends ...>`**  
一般认为一个 `List<? extends ...>` 是一个只读的 list。它的现有元素不能被增加或修改，但其实不是严格意义上的只读。
``` java
// 自然数类
class NaturalNumber {

    private int i;

    public NaturalNumber(int i) { this.i = i; }
    // ...
}

// 偶数类
class EvenNumber extends NaturalNumber {

    public EvenNumber(int i) { super(i); }
    // ...
}

// 具体调用
List<EvenNumber> le = new ArrayList<>();
List<? extends NaturalNumber> ln = le;
// ln.add(new NaturalNumber(35));  // compile-time error
```
`List<EvenNumber>` 是 `List<? extends NaturalNumber>` 的子类，所以变量 `ln` 可以引用 `le` (向上造型)。但调用 `ln` 的 `add()` 去添加一个自然数到偶数 list 是不可以的。  
但是，仍然可以对 `ln` 进行以下操作：  
+ 添加 `null` 元素
+ 调用 `clear()`
+ 获取迭代器 iterator 并调用 `remove()`
+ 捕捉通配并写入从 list 中读到的元素
:::

### 3.13.5 类型擦除
Java 主要利用类型擦除来实现泛型功能，其主要作用：  
+ 如果类型参数是无界的，则用它们的界或 `Object` 类替换泛型类型中的所有类型参数。
+ 在必要时插入类型转换，以保持类型安全。
+ 生成桥接方法以保留扩展泛型类型中的多态性。

类型擦除确保不会为参数化类型创建新的类；因此，泛型不会产生运行时开销。  

也就是说，Java 所提供的泛型是在编译期实现的，当编译通过后，泛型信息（类型变量、参数化类型）都会被擦除。  
例如：  
``` java
Class c1 = new ArrayList<String>().getClass();
Class c2 = new ArrayList<Integer>().getClass();
System.out.println(c1 == c2);
```
结果会为 `true`, 它们都是 `ArrayList` 类型的。此时如果使用反射来操作 `c1` 或 `c2`, 其他它们可以存放任意类型的元素。  

**泛型类型的类型擦除**  
在类型擦除过程中，Java 编译器会擦除所有的类型参数，如果类型参数是有界的，则用它的第一个界来代替，如果类型参数是无界的，则用 `Object` 来代替。  
实例：  
``` java
// 单链表的 Node 类
public class Node<T> {

    private T data;
    private Node<T> next;

    public Node(T data, Node<T> next) {
        this.data = data;
        this.next = next;
    }

    public T getData() { return data; }
    // ...
}
```

编译器类型擦除后的状态：  
``` java
// T 是无界的，被替换为 Object
public class Node {

    private Object data;
    private Node next;

    public Node(Object data, Node next) {
        this.data = data;
        this.next = next;
    }

    public Object getData() { return data; }
    // ...
}
```

实例2：  
``` java
// 设定了上界的 Node 函数
public class Node<T extends Comparable<T>> {

    private T data;
    private Node<T> next;

    public Node(T data, Node<T> next) {
        this.data = data;
        this.next = next;
    }

    public T getData() { return data; }
    // ...
}
```

编译器类型擦除后的状态：
``` java
//  T 被替换为第一个届 Comparable
public class Node {

    private Comparable data;
    private Node next;

    public Node(Comparable data, Node next) {
        this.data = data;
        this.next = next;
    }

    public Comparable getData() { return data; }
    // ...
}
```

**泛型方法的类型擦除**  
实例：  
``` java
// 计数数组中元素个数
public static <T> int count(T[] anArray, T elem) {
    int cnt = 0;
    for (T e : anArray)
        if (e.equals(elem))
            ++cnt;
        return cnt;
}
```

编译器类型擦除后的状态：
``` java
// T 是无界的，被替换为 Object
public static int count(Object[] anArray, Object elem) {
    int cnt = 0;
    for (Object e : anArray)
        if (e.equals(elem))
            ++cnt;
        return cnt;
}
```

实例2：  
``` java
// 图形类
class Shape { /* ... */ }
class Circle extends Shape { /* ... */ }
class Rectangle extends Shape { /* ... */ }

// 泛型方法 draw
public static <T extends Shape> void draw(T shape) { /* ... */ }

// 编译器类型擦除后的状态：
public static void draw(Shape shape) { /* ... */ }
```

**保证类型安全的强制转换与桥接方法**  
实例：  
``` java
// 类 Node
public class Node<T> {

    public T data;

    public Node(T data) { this.data = data; }

    public void setData(T data) {
        System.out.println("Node.setData");
        this.data = data;
    }
}

// MyNode 继承 Node
public class MyNode extends Node<Integer> {
    public MyNode(Integer data) { super(data); }

    public void setData(Integer data) {
        System.out.println("MyNode.setData");
        super.setData(data);    // 调用父类方法
    }
}

// 具体调用
MyNode mn = new MyNode(5);
Node n = mn;            // A raw type - compiler throws an unchecked warning
n.setData("Hello");     // Causes a ClassCastException to be thrown.
Integer x = mn.data; 

// 编译器类型擦除后的状态：
MyNode mn = new MyNode(5);
Node n = (MyNode)mn;         // A raw type - compiler throws an unchecked warning
n.setData("Hello");          // Causes a ClassCastException to be thrown.
Integer x = (String)mn.data; 
```

当一个类继承或实现了一个参数化类型/接口时，Java 编译器会创建一个桥接方法来处理泛型擦除。  
例如上面的例子，两个类经过类型擦除后会变为：  
``` java
public class Node {

    public Object data;

    public Node(Object data) { this.data = data; }

    public void setData(Object data) {
        System.out.println("Node.setData");
        this.data = data;
    }
}

public class MyNode extends Node {

    public MyNode(Integer data) { super(data); }

    public void setData(Integer data) {
        System.out.println("MyNode.setData");
        super.setData(data);
    }
}
```
此时 `Node.setData(Object)` 与 `MyNode.setData(Integer)` 无法匹配。编译器则为了在类型擦除后保持多态性而创建一个桥接方法：  
``` java{5,6,7}
class MyNode extends Node {

    // Bridge method generated by the compiler
    //
    public void setData(Object data) {
        setData((Integer) data);
    }

    public void setData(Integer data) {
        System.out.println("MyNode.setData");
        super.setData(data);
    }

    // ...
}
```

在上一小节的具体调用中，`n.setData("Hello");` 调用的是桥接方法 `setData((Integer) data)`. 因为 `"Hello"` 与 `Integer` 不匹配而报 `ClassCastException`.  