---
prev: ./
next: false
---

# 总览
## 版本与 API

### Spring Framework 与 Java 版本的对应关系
|Spring Framework|Java SE| Java EE|
|:--:|:--:|:--:|
|1.x|1.3+ （动态代理，AOP）|J2EE 1.3+ （Servlet 2.3 事件，Spring 事件）|
|2.x|1.4.2+（NIO）|J2EE 1.3+|
|3.x|5+（注解、枚举）|J2EE 1.4, Java EE 5|
|4.x （Spring Boot 1.0）|6+	Java EE 6, Java EE 7|
|5.x|8+|Java EE 7|

### Java 各版本语法特性在 Spring 上的体现
**Java 5 语法特性在 Spring 上的体现**  
|语法特性|Spring 版本|代表实现|
|:--:|:--:|:--:|
|注解|1.2+|@Transactional|
|枚举|1.2+|Propagation|
|for-each|3.0+|AbstractApplicationContext|
|自动装箱|3.0+||
|泛型|3.0+|ApplicationListener|

<br/>

**Java 6 语法特性在 Spring 上的体现**  
|语法特性|Spring 版本|代表实现|
|:--:|:--:|:--:|
|@Override|4.0+||

<br/>

**Java 7 语法特性在 Spring 上的体现**  
|语法特性|Spring 版本|代表实现|
|:--:|:--:|:--:|
|Diamond 语法|5.0+|DefaultListableBeanFactory|
|try-with-resources 语法|5.0+|ResourceBundleMessageSource|

<br/>

**Java 8 语法特性在 Spring 上的体现**  
|语法特性|Spring 版本|代表实现|
|:--:|:--:|:--:|
|Lambda 语法|5.0+|PropertyEditorRegistrySupport|

### Java 各版本 API 在 Spring 上的体现
**< Java 5 API 在 Spring 上的体现**  
|API|Spring 版本|代表实现|
|:--:|:--:|:--:|
|反射|1.0+|MethodMatcher|
|Java Beans|1.0+|CachedIntrospectionResults|
|动态代理|1.0+|JdkDynamicAopProxy|

<br />

**Java 5 API 在 Spring 上的体现**  
|API|Spring 版本|代表实现|
|:--:|:--:|:--:|
|XML 处理|1.0+|XmlBeanDefinitionReader|
|Java 管理扩展|1.2+|@ManagedResource|
|Instrumentation|2.0+|InstrumentationSavingAgent|
|并发框架|3.0+|ThreadPoolTaskScheduler|
|格式化|3.0+|DateFormatter|

<br />

**Java 6 API 在 Spring 上的体现**  
|API|Spring 版本|代表实现|
|:--:|:--:|:--:|
|JDBC 4.0|1.0+|JdbcTemplate|
|Common Annotations|2.5+|CommonAnnotationBeanPostProcessor|
|JAXB 2.0|3.0+|Jaxb2Marshaller|
|Scripting in JVM|4.2+|StandardScriptFactory|
|可插拔注解处理|5.0+|@Indedxed|
|Java Compiler API|5.0+|TestCompiler|

<br />

**< Java 7 API 在 Spring 上的体现**  
|API|Spring 版本|代表实现|
|:--:|:--:|:--:|
|Fork/Join|3.1+|ForkJoinPoolFactoryBean|
|NIO 2|4.0+|PathResource|

<br />

**< Java 8 API 在 Spring 上的体现**  
|API|Spring 版本|代表实现|
|:--:|:--:|:--:|
|Date, Time|4.0+|DateTimeContext|
|可重复 Annotations|4.0+|@PropertySources|
|Stream|4.2+|StreamConverter|
|CompletableFuture|4.2+|CompletableToListenableFutureAdapter|

### Java EE 各 API 在 Spring 上的体现
**Web API**
|JSR|Spring 版本|代表实现|
|:--:|:--:|:--:|
|Servlet + JSP|1.0+|DispatcherServlet|
|JSTL|1.0+|JstlView|
|JavaServer Faces|1.1+|FacesContextUtils|
|Portlet|2.0 - 4.2|DispatcherPortlet|
|SOAP 简单对象访问协议|2.5+|SoapFaultException|
|WebServices|2.5+|CommonAnnotationBeanPostProcessor|
|WebSocket|4.0+|WebSocketHandler|

<br />

**数据存储**
|JSR|Spring 版本|代表实现|
|:--:|:--:|:--:|
|JDO|1.0 - 4.2|JdoTemplate|
|JTA （事物）|1.0+|JtaTransactionManager|
|JPA|2.0+|JpaTransactionManager|
|Java Caching API （NIO）|3.2+|JCacheCache|

<br />

**Bean**
|JSR|Spring 版本|代表实现|
|:--:|:--:|:--:|
|JMS|1.1+|JmsTemplate|
|EJB 2.0|1.0+|AbstractStatefulSessionBean|
|Dependency Injection for Java|2.5+|AutowiredAnnotationBeanPostProcessor|
|Bean Validation|3.0+|LocalValidatorFactoryBean|