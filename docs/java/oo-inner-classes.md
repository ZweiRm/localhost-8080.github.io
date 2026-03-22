---
prev:
    text: '接口'
    link: 'java/oo-interfaces'
next:
    text: '泛型'
    link: 'java/oo-generics'
---

# 内部类与Lambda
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

