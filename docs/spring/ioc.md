---
prev: ./overall
next: ./references
---

# 控制反转
控制反转是一种编程原则，它和传统控制流相比逆转了整个控制流，自定义代码会从框架中接收控制流。  
传统流程：自定义功能代码调用库来处理一般任务；  
控制反转：框架调用自定义代码。  

## 实现方法
1. Service Locator pattern （服务定位模式）  
   通过 JNDI 来获取 Java EE 组件。  
2. Dependency Injection （DI, 依赖注入）
   + 构造器注入
   + 参数注入
   + Setter 注入
   + 接口注入
3. Contextualized Loopup (上下文查找，依赖查找)  
   Java Beans 中使用通用上下文来实现 Beans 管理和 Beans 层次管理  
4. Template Method pattern （模板方法模式）  
   例如在 JDBC Template 中提供了回调，在实现接口时不需要关心该回调来自哪里
5. Strategy pattern （策略模式）

## 目的
+ 解耦实现与执行
+ 关注于模块被设计时的真正目的
+ 使得模块脱离对相关系统的具体功能，转而依赖契约
+ 避免更换模块时的副作用

**IoC 容器的目的**  
+ 依赖处理
  + 依赖查找
  + 依赖注入
+ 生命周期管理
  + 容器
  + 资源
+ 配置
  + 容器
  + 外部化配置
  + 资源

**IoC 的一些应用案例**  
+ Java SE
  + Java Beans
  + Java ServiceLoader (SPI)
  + JNDI (Java Naming and Directory Interface)
+ Java EE
  + EJB (Enterprise Java Beans)
  + Servlet
+ 开源框架
  + Apache Avalon
  + PicoContainer
  + Google Guice
  + Spring Framework

### Java Beans
Java Beans 是 Java 提供的一种可重用组件。Java Beans 提供了基于反射实现的自省机制，通过这种机制可以获取和更改 Java Beans 的信息。  

Java Beans 作为 IoC 容器时的一些特性：  
+ 依赖查找
+ 生命周期管理
+ 配置元信息（如反射）
+ 事件（基于 Java 事件）
+ 自定义（补充字段、方法、类型转换等）
+ 资源管理
+ 持久化

使用自省机制查看配置元信息：  
实例：  
**Person POJO**  
``` java
public class Person {
    // Properties
    String name;
    Integer age;

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }
}
```

**Main**  
``` java
import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) throws IntrospectionException {
        // 通过自省获得 beanInfo 对象
        BeanInfo beanInfo = Introspector.getBeanInfo(Person.class, Object.class);

        Stream.of(beanInfo.getPropertyDescriptors()).forEach(propertyDescriptor -> {
            System.out.println(propertyDescriptor);
        });
    }
}
```

**输出**  
```
java.beans.PropertyDescriptor[
    name=age; 
    values={
        expert=false; 
        visualUpdate=false; 
        hidden=false; 
        enumerationValues=[
            Ljava.lang.Object;
            @548b7f67; 
            required=false
    }; 
    propertyType=class java.lang.Integer; 
    readMethod=public java.lang.Integer spring.Person.getAge(); 
    writeMethod=public void spring.Person.setAge(java.lang.Integer)
]
java.beans.PropertyDescriptor[
    name=name; 
    values={
        expert=false; 
        visualUpdate=false; 
        hidden=false; 
        enumerationValues=[Ljava.lang.Object;
        @7ac7a4e4; 
        required=false
    }; 
    propertyType=class java.lang.String; 
    readMethod=public java.lang.String spring.Person.getName(); 
    writeMethod=public void spring.Person.setName(java.lang.String)
]
```

Spring 在 3.0- 大量使用基于 PropertyEditorSupport 来实现元信息的编程。

## 依赖查找与依赖注入
|类型|依赖处理|实现便利性|代码入侵性|API 依赖性|可读性|
|:--:|:--:|:--:|:--:|:--:|:--:|
|依赖查找|主动获取|相对繁琐|侵入业务逻辑|依赖容器 API|良好|
|依赖注入|被动提供|相对便利|侵入性低|不依赖容器 API|一般|

### 依赖注入
**构造器注入与 Setter 注入**  
+ 构造器注入
  + 优点
    + 以不可变对象形式实现组件来保证被依赖的对象不为空（也可以用 ObjectProvider 来依赖空对象）
    + 以完全初始化状态返回给调用端
    + 被管理对象状态一致
  + 缺点
+ Setter 注入
  + 一般用于可选依赖的注入
  + 优点
    + 便于重新注入和重配置
    + 不需要过多文档解释，是自文档的
    + 可以使用 Java Beans 的 PropertyEditor 机制来进行类型转换
    + 易于管理 Beans
    + 对拥有默认值的对象友好，可以有某些属性不被运行时支持
  + 缺点
    + 无法规定注入顺序（Spring 提供了 InitialzingBean 来辅助实现注入顺序确定，但不是强制)
    + 已注入的 setter 可能不会在使用前被调用