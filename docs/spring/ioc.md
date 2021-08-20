---
prev: ./overall
next: false
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


Java Beans 作为 IoC 容器时的一些特性：  
+ 依赖查找
+ 生命周期管理
+ 配置元信息（如反射）
+ 事件（基于 Java 事件）
+ 自定义（补充字段、方法、类型转换等）
+ 资源管理
+ 持久化

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