---
prev:
    text: 'Math 类'
    link: 'java/api-lang-math'
next:
    text: '线程'
    link: 'java/api-lang-thread'
---

# 反射
### 4.8.1 基本信息
**Package** java.lang
`public final class Class<T>`

**Package** java.lang.reflect

Java 提供了反射机制，使用该机制可以动态操作 Java 代码（例如程序经过编译后的变动），也可以利用其来分析类的具体能力。它也体现了高内聚低耦合的设计思想。

### 4.8.2 `Class`类
`Class` 类的实例代表运行中的 Java 应用程序中的类和接口。枚举是类的一种，注解是接口的一种。
每个数组也都属于一个类，该类反映为一个 `Class` 对象，该对象被所有具有相同元素类型和维数的数组共享。
Java 的原始类型（布尔、字节、`char`、`short`、`int`、`long`、`float` 和 `double`）以及关键字 `void` 也被表示为 `Class` 对象。（即存在 `int.class`, `void.class` 等 `Class` 对象）。
`Class` 没有公共构造函数。相反，`Class` 对象是由 Java 虚拟机在加载类时自动构建的，并通过调用类加载器中的 `defineClass()` 方法来构建。

**获取 Class 对象**
通过获取具体类的 Class 对象（某些地方也称为字节码对象），我们可以利用它们获取该类的类信息。获取方法：
1. `对象.getClass()`
   通过某类的具体实例来获取该类的 `Class` 对象。调用了 [Object 类](#object类)中的方法来实现。
2. `类名.class`
   每个类都有一个隐含的静态属性 `class`, 通过类名直接获取该属性来获取到 `Class` 对象。
3. `Class.forName("类全路径")`
   `Class` 类的静态方法，获取 `Class` 对象。
   它是一种动态加载类的方法，这样的加载方式不在程序编译期完成，而是在运行时再动态加载。
   例如：
   ``` java
   class Main {
       public static void main(String[] args) {
           Admin admin = new Admin();
           admin.login();

           User user = new User();
           user.login();
       }
   }
   ```
   这样的主函数经过编译后，编译器无法找到类 `Admin` 和 `User` 以及它们所对应的 `login()` 而报错。这样的类加载形式是静态加载。

   进行改造：
   ``` java
   // 统一的人员接口
   interface Person {
       public void login();
   }

   // 具体实现
   class Admin implements Person {
       @Override
       public void login() {
           System.out.println("Admin login.");
       }
   }

   class User implements Person {
       @Override
       public void login() {
           System.out.println("User login.");
       }
   }

   // 主函数
   class Main {
       public static void main(String[] args) {
           // 通过传入参数动态加载类
           Class personClass = Class.forName(args[0]);

           // 创建实例
           Person person = (Person) personClass.newInstance();
           person.login();
       }
   }
   ```
   通过这样的改造，主函数不必在编译时期就指定具体的 `Admin` 或者 `User` 类，即使它们暂时不存在也不影响主函数编译失败。在程序运行时，给程序传入具体要加载的类动态加载并调用其 `login()` 来完成整个功能。

**获取构造函数**
1. `class对象.getConstructor(构造函数参数类型class对象)`
   返回指定参数类型的公共构造函数。
   例如：
   ``` java
   public class Person {
       // 属性

       // 有参构造方法
       public Person(String name, int age) {
           this.age = age;
           this.name = name;
       }
   }

   // main 函数中，获取到 class 对象 cl 后
   // 获取有参构造函数(传入构造方法需要的 String 和 int 类型的 class 对象)
   Constructor con = cl.getConstructor(String.class, int.class);
   ```
2. `class对象.getConstructors()`
   获取所有公共构造函数。
3. `class对象.getDeclaredConstractors(构造函数参数类型字class对象)`
   返回指定参数类型的全部构造函数（包括 `public` `private` 等）。

**获取实例对象**
`class对象.newInstance()` 要求存在无参数构造函数

**获取类属性**
1. `class对象.getFields("属性名")`
   获取所有公有属性
2. `class对象.getDeclaredFields("属性名")`
   获取所有属性

**获取方法对象**
1. `class对象.getMethod("方法名", 方法对应参数的class对象)`
   获取公有方法
2. `class对象.getDeclaredMethod("方法名", 方法对应参数的class对象)`

**获取所实现的接口**
`class对象.getInterfaces()`

**其他常用方法**
|名称|作用|
|--|--|
|`class对象.getName()`|获取类全路径名|
|`class对象.getPackage()`|获取类所在包|
|`class对象.getSimpleName()`|获取当前类名|
|`class对象.getSuperclass()`|获取父类名|
|`class对象.isAnonymousClass()`|是否是匿名内部类|
|`class对象.isLocalClass()`|是否是方法内部类|
|`class对象.isPrimitive()`|是否是基本类型|
|`class对象.isArray()`|是否是数组|
|`class对象.isEnum()`|是否是枚举|
|`class对象.isInstance(指定对象)`|判断指定对象是否是该类的实现|
|`class对象.isInterface()`|是否是接口|
|`class对象.isAssignableFrom(目标类型)`|判断目标类型是否是当前类的本身或子类|


::: tip <code>Object</code> 与 <code>Class</code>
+ `Object` 是顶级父类，`Class` 也继承自 `Object`.
+ `Class` 类用于反射，它表示了 Class 这样的一种类，可以利用它来进一步获取关于类的各种信息。
+ `Class` 类的实例表示了当前运行着的 Java 程序的类，每一个类都会在运行时自动创建出它对应的 `Class` 类实例。
+ `Class` 类的构造函数私有，只能通过 JVM 来访问。所以无法手动创建 `Class` 类的实例。
:::

### 4.8.3 `Constructor`类
描述构造方法的类。

**获取实例对象**
`constructor对象.newInstance()`

**获取构造方法返回值类型**
`constructor对象.getType()` 返回值是 `Class` 类型变量

**获取构造方法参数列表**
`constructor对象.getParameterTypes()`

### 4.8.4 `Field`类
描述属性的类。

**获取指定对象的属性值**
`field对象.get(指定对象)` 可能需要使用 `.setAccessible(true)` 来暴力破解访问权限限制。

**设置指定对象的属性值**
`field对象.set(指定对象)`

**获取属性声明类型**
`field对象.getType()` 返回值是 `Class` 类型变量

**获取属性名称**
`field对象.getName()`

### 4.8.5 `Method`类
描述方法的类。

**执行方法**
`method对象.invoke(作用对象, 参数)`
如果方法有返回值类型则返回该类型变量，若方法无返回则返回 `null`

**破解权限**
`method对象.setAccessible(true)` 允许在类外执行，一般配合执行方法一起使用。

**获取方法返回值类型**
`method对象.getReturnType()`

**获取方法参数列表**
`method对象.getParameterTypes()`

**获取抛出异常**
`method对象.getExceptionTypes()`

**判断是否含有可变参数**
`method对象.inVarArgs()`
