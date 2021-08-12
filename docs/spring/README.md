---
prev: false
next: ./overall
---

# Spring
本 分区介绍 Spring 框架的各个细节。

## 框架

- 总览
    - 特性
    - 版本
    - 模块化
    - 技术整合
        - Java 语言特性
        - JDK API
        - JavaEE API
    - 模型
        - OOP
            - 契约接口
        - AOP
            - 动态代理
            - 字节码提升
        - Metaprogramming
            - 配置元信息
            - 注解
            - 属性配置
        - Module Oriented Programming
            - Maven
            - Java 9 Automatic Modules
            - @Enable
        - Functional Programming
            - Lambda
            - Reactive
- IoC （管理 Bean）
    - 关于 IoC
    - 依赖查找 （IoC 的一种实现）
    - 依赖注入（IoC 的一种实现）
    - 依赖来源
    - IoC 容器生命周期
- Bean
    - 实例 （主要来源于依赖）
    - 作用域
    - 生命周期
- 元信息 （给 Bean 配置数据；控制 IoC 容器）
    - 注解
    - 配置元信息
    - 外部化属性
- 基础设施（元信息的工具，IoC 的扩展）
    - 资源管理（通过 XML, properties 配置元信息；通过 properties, yaml 配置外部化属性）
    - 类型转换 （通过对象属性配置元信息；通过配置数据配置外部化属性）
    - 数据绑定（接收校验的内容）
    - 校验（接收国际化的文案）
    - 国际化
    - 事件（监听泛型事件）
    - 泛型处理
