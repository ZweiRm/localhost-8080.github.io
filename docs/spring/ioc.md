---
prev: ./overall
next: ./references
---

# 控制反转
通常情况下 beans 通过构造器类或者服务定位机制自己控制实例化和依赖的位置，但在 Spring 里，这些操作交由 Spring 容器通过控制反转来实现。控制反转是一种设定对象之间依赖（与之关联的对象）的一种过程。它仅允许通过以下形式来实现：构造器参数；工厂方法参数；对象在背工厂方法构造完成或返回时设定的属性。容器会在创建 beans 时注入依赖。  

控制反转是一种编程原则，它和传统控制流相比逆转了整个控制流，自定义代码会从框架中接收控制流。  
传统流程：自定义功能代码调用库来处理一般任务；  
控制反转：框架调用自定义代码。  

## 实现方法
1. Service Locator pattern （服务定位模式）（不完全算 IoC)  
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

**Spring 作为 IoC 容器的优势**  
+ IoC 管理，依赖查找与依赖注入
+ AOP
+ 事务
+ 事件机制
+ SPI 扩展
+ 第三方整合
+ 易测试
+ 更好的面向对象

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

### 依赖查找
**分类**  
+ 根据 Bean 名称或 ID 查找（鉴定）  
  + 实时查找  
    `/domain/` 中的 User POJO
    ``` java
    public class User {
        private Long id;
        private String name;

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        @Override
        public String toString() {
            return "User{" +
                    "id=" + id +
                    ", name='" + name + '\'' +
                    '}';
        }
    }
    ```
    `/META-INF/` 中的上下文管理 XML  
    ``` xml
    <?xml version="1.0" encoding="utf-8" ?>
    <beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:p="http://www.springframework.org/schema/p"
        xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">
        <bean id="user" class="xin.ahza.ioc.domain.User">
            <property name="id" value="1"/>
            <property name="name" value="user"/>
        </bean>
    </beans>
    ```

    应用程序上下文  
    ``` java
    import org.springframework.beans.factory.BeanFactory;
    import org.springframework.context.support.ClassPathXmlApplicationContext;
    import xin.ahza.ioc.domain.User;

    public class DependencyLookup {
        public static void main(String[] args) {
        // 使用 XML 配置文件启动 Spring 上下文
        BeanFactory beanFactory = new ClassPathXmlApplicationContext("classpath:/META-INF/dependency-lookup-context.xml");

        realtimeLookup(beanFactory);
    }

        private static void realtimeLookup(BeanFactory beanFactory) {
            User user = (User) beanFactory.getBean("user");
            System.out.println(user);
        }
    }
    ```
    
    运行结果  
    ```
    User{id=1, name='user'}
    ```
  + 延迟查找  
    使用 `ObjectFactoryCreatingFactoryBean` 来作为 Bean 实现查找。它是 `FactoryBean` 的一个实现，可以返回一个 `ObjectFactory`。这个 `ObjectFacory` 可以返回一个来自 `BeanFactory` 的 Bean.  
    POJO 与上相同  
    `/META-INF/` 中的上下文管理 XML. 在确定 User Bean 之后新增 ObjectFactory Bean  
    ``` xml
    <?xml version="1.0" encoding="utf-8" ?>
    <beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:p="http://www.springframework.org/schema/p"
        xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">
        <bean id="user" class="xin.ahza.ioc.domain.User">
            <property name="id" value="1"/>
            <property name="name" value="user"/>
        </bean>
        <bean id="objectFactory" class="org.springframework.beans.factory.config.ObjectFactoryCreatingFactoryBean">
            <property name="targetBeanName" value="user"/>
        </bean>
    </beans>
    ```

    应用程序上下文  
    ``` java
    import org.springframework.beans.factory.BeanFactory;
    import org.springframework.beans.factory.ObjectFactory;
    import org.springframework.context.support.ClassPathXmlApplicationContext;
    import xin.ahza.ioc.domain.User;

    public class DependencyLookup {
        public static void main(String[] args) {
            // 使用 XML 配置文件启动 Spring 上下文
            BeanFactory beanFactory = new ClassPathXmlApplicationContext("classpath:/META-INF/dependency-lookup-context.xml");
            delayLookup(beanFactory);
        }

        private static void delayLookup(BeanFactory beanFactory) {
            ObjectFactory<User> objectFactory = (ObjectFactory<User>) beanFactory.getBean("objectFactory");
            User user = objectFactory.getObject();
            System.out.println(user);
        }
    }
    ```
    
    运行结果  
    ```
    User{id=1, name='user'}
    ```
+ 根据 Bean 类型查找  
  + 单个 Bean 对象  
    POJO 类与上相同  
    `/META-INF/` 中的上下文管理 XML 文件与实时查找相同  
    应用程序上下文  
    ``` java
    import org.springframework.beans.factory.BeanFactory;
    import org.springframework.beans.factory.ObjectFactory;
    import org.springframework.context.support.ClassPathXmlApplicationContext;
    import xin.ahza.ioc.domain.User;

    public class DependencyLookup {
        public static void main(String[] args) {
            // 使用 XML 配置文件启动 Spring 上下文
            BeanFactory beanFactory = new ClassPathXmlApplicationContext("classpath:/META-INF/dependency-lookup-context.xml");

            typeLookup(beanFactory);
        }
        private static void typeLookup(BeanFactory beanFactory) {
            // 使用接受参数为 Class<T> 形式的 getBean() 获取 Bean
            User user = beanFactory.getBean(User.class);
            System.out.println(user);
        }
    }    
    ```
    
    运行结果  
    ```
    User{id=1, name='user'}
  + 集合 Bean 对象  
    POJO 类与上相同  
    `/META-INF/` 中的上下文管理 XML 文件与实时查找相同  
    应用程序上下文  
    ``` java
    import org.springframework.beans.factory.BeanFactory;
    import org.springframework.beans.factory.ListableBeanFactory;
    import org.springframework.beans.factory.ObjectFactory;
    import org.springframework.context.support.ClassPathXmlApplicationContext;
    import xin.ahza.ioc.domain.User;

    import java.util.Map;

    public class DependencyLookup {
        public static void main(String[] args) {
            // 使用 XML 配置文件启动 Spring 上下文
            BeanFactory beanFactory = new ClassPathXmlApplicationContext("classpath:/META-INF/dependency-lookup-context.xml");

            collectionTypeLookup(beanFactory);
        }

        private static void collectionTypeLookup(BeanFactory beanFactory) {
            // 检测 beanFactory 是否返回的是 Map 集合
            if (beanFactory instanceof ListableBeanFactory) {
                ListableBeanFactory listableBeanFactory = (ListableBeanFactory) beanFactory;
                // 以 bean id 为 key, bean name 为 value 的 Map对象
                Map<String, User> users = listableBeanFactory.getBeansOfType(User.class);
                System.out.println(users);
            }
        }
    }
    ```

    运行结果  
    ```
    {user=User{id=1, name='user'}}
    ```
+ 根据 Bean 名称和类型查找  
+ 根据注解查找  
  当需要用注解来区分某些 Bean 时，例如 User 和 SuperUser，它们都是 User，但 SuperUser 拥有更高的权限。在 Beans 中我们可以编写注解来区分它们。  
  编写注解类  
    ``` java
    import java.lang.annotation.ElementType;
    import java.lang.annotation.Retention;
    import java.lang.annotation.RetentionPolicy;
    import java.lang.annotation.Target;

    @Target(ElementType.TYPE)
    @Retention(RetentionPolicy.RUNTIME)
    public @interface Super {
    }
    ```
  + 集合 Bean 对象  
    在之前的 User POJO 基础上，编写 SuperUser POJO  
    ``` java
    import xin.ahza.ioc.annotation.Super;

    @Super
    public class SuperUser extends User {
        private String address;

        public String getAddress() {
            return address;
        }

        public void setAddress(String address) {
            this.address = address;
        }

        @Override
        public String toString() {
            return "SuperUser{" +
                    "address='" + address + '\'' +
                    "} " + super.toString();
        }
    }
    ```

    更新 `/META-INF/` 中的上下文管理 XML 文件，增加 SuperUser Bean  
    ``` xml{11,12,13}
    <?xml version="1.0" encoding="utf-8" ?>
    <beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:p="http://www.springframework.org/schema/p"
        xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">
        <bean id="user" class="xin.ahza.ioc.domain.User">
            <property name="id" value="1"/>
            <property name="name" value="user"/>
        </bean>
        <bean id="superUser" class="xin.ahza.ioc.domain.SuperUser" parent="user" primary="true">
            <property name="address" value="Address"/>
        </bean>
    </beans>
    ```
    ::: warning 值得注意的是
    因为 User Bean 和 SuperUser Bean 同属于 User，所以在之前案例的根据 Bean 类型的单个 Bean 查找会出现冲突。这里在 SuperUser Bean 的 `property` 中指定了 `primary=true` 来保证在单个查询中发现多个 Bean 时只查找优先项。
    :::
    应用程序上下文  
    ``` java
    import org.springframework.beans.factory.BeanFactory;
    import org.springframework.beans.factory.ListableBeanFactory;
    import org.springframework.beans.factory.ObjectFactory;
    import org.springframework.context.support.ClassPathXmlApplicationContext;
    import xin.ahza.ioc.annotation.Super;
    import xin.ahza.ioc.domain.User;

    import java.util.Map;

    public class DependencyLookup {
        public static void main(String[] args) {
            // 使用 XML 配置文件启动 Spring 上下文
            BeanFactory beanFactory = new ClassPathXmlApplicationContext("classpath:/META-INF/dependency-lookup-context.xml");

            collectionAnnotationLookup(beanFactory);
        }

        private static void collectionAnnotationLookup(BeanFactory beanFactory) {
            // 检测 beanFactory 是否返回的是 Map 集合
            if (beanFactory instanceof ListableBeanFactory) {
                ListableBeanFactory listableBeanFactory = (ListableBeanFactory) beanFactory;
                // 以 bean id 为 key, bean name 为 value 的 Map对象
                Map<String, User> users = (Map) listableBeanFactory.getBeansWithAnnotation(Super.class);
                System.out.println(users);
            }
        }
    }
    ```

    运行结果  
    ```
    {superUser=SuperUser{address='Address'} User{id=1, name='user'}}
    ```
    
### 依赖注入
**构造器注入与 Setter 注入**  
+ 构造器注入  
  基于构造器的注入是通过容器调用带有很多参数的构造方法来完成的，每一个参数代表一个依赖关系。（与调用带有确定参数的静态工厂方法来创建 bean 几乎等价；容器对带参数的构造器和带参数的静态工厂方法类似）  
  + 优点
    + 以不可变对象形式实现组件来保证被依赖的对象不为空（也可以用 ObjectProvider 来依赖空对象）
    + 以完全初始化状态返回给调用端
    + 被管理对象状态一致
  + 缺点
+ Setter 注入  
  容器在调用无参构造函数或无参静态工厂方法实例化 bean 后，在 bean 上调用 setter 来注入依赖。  
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