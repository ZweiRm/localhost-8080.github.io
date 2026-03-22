---
prev:
    text: '修饰符'
    link: 'java/oo-modifiers'
next:
    text: '内部类与Lambda'
    link: 'java/oo-inner-classes'
---

# 接口
## 3.11 接口
+ 类似于类的引用类型。

+ 使用关键字 `interface` 表示  

+ 接口中方法默认且只能为抽象方法。<Badge type="error" text="< Java SE 7.0"/>  
  + 在接口中，使用 `default` 关键字修饰的方法可以拥有方法体，可以给所有具体实现对象扩展功能。<Badge text="Java SE 8.0 +"/>  
  + 接口中也可以存在静态方法，要求该方法拥有方法体。这样的方法可以直接通过接口名打点获取到。<Badge text="Java SE 8.0 +"/>  

+ 接口中的数据都为公共的静态常量（被 `final`, `static` 和 `public` 修饰的成员变量）  

::: tip 接口与抽象
类似于抽象类，它也是一个同于体现开闭原则的设计。在编写代码时，利用接口可以做到只关心类的操作而不关心具体实现，等之后在具体实现的层面再做具体考量，利用它可以成为具体实现的模板。但不同于抽象，接口着重在系统架构中设计方法层面发挥作用，定义各功能模块之间的通信；而抽象在代码实现层面发挥作用，体现代码重用。  

它的另一个作用是体现多态。下面给出一个简单的例子：  
现在有这样一个系统，它的用户拥有登录功能。但登录功能在一个时刻仅能一个人登录（意味着入口函数只能有一个实例）。  
``` java
// User 类
class User {
    public void login() {
        System.out.println("User login.");
    }
}
```
在入口方法利用这个类生成实例来执行这样的操作：  
``` java
class Main {
    public static void main(String[] args) {
        User user = new User();
        user.login();
    }
}
```
但是之后系统有新的需求：引入管理员角色来管理系统。理所应当地，他们也拥有登录功能。此时对原有代码进行改造。  
简单思考：  
首先增加一个新的类：Admin 而不直接将 User 类改为 Admin。  
之后对入口方法的实例进行改造，显然直接将 User 相关代码改为 Admin 会打破开闭原则，所以仍然有问题。  

我们这里引入接口的概念而重新设计整个系统。  
对于 Admin 和 User，我们抽象出一个更高层的 Person 接口，它拥有登录方法的设计。而 Admin 与 User 类作为 Person 的具体实现，重写定义在接口里的登录方法。（这样体现了功能模块设计只考虑具体方法，而到实现层再考虑具体实现；同时给向上造型提供了条件）  
在入口方法中，我们利用向上造型，使用 Person 接口来声明变量，具体的实例化根据需要进行改变。  
``` java
// 统一的人员接口
interface Person {
    void login();
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
        // 向上造型创建实例
        Person person = new Admin();    // 必要时可以写 Person person = new User();
        person.login();
    }
}
```
通过引入 Person 接口，我们在实际使用时就可以按照意愿来 new 任意符合需求的具体对象。使用统一的命令对多样对象做操作就是多态性的体现。  
:::

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
> → 详见[引用类型的强制类型转换](./grammars#引用类型的强制类型转换)

由于接口之间可以多继承，接口和类之间可以多实现，所以会形成复杂的图状结构。在这样的结构中寻找根是很困难的，为提高效率，Java 在编译时会**放弃检查类于接口是否存在实现关系**。  
:::

::: warning 注意
+ 接口**不能被实例化**。  

+ 接口中**不允许定义构造方法**，**编译完成后会产生 `.class` 文件**，但**接口不是类**。  

+ 接口**默认只能被 `public` 修**饰，且实现接口的类中的**具体实现方法也只能被 `public` 所修饰**。

+ 接口中的**方法默认被 `public` 和 `abstract` 修饰**。

+ 接口**可作为模板**，用于反射中来实现解耦。
:::
