---
prev:
    text: 'ThreadLocal'
    link: 'java/api-lang-threadlocal'
next:
    text: '集合'
    link: 'java/api-util-collection'
---

# 日期
## 5.1 日期
### 5.1.1 `Date`类
**基本信息**  
**Package** java.util  
`public class Date`  

+ 使用`Date`类对象来表示一个日期。默认创建的对象会获取系统当前时间。  

**重要方法**  

**格式化日期显示**
+ 将字符串转化为日期对象  
  使用`SimpleDateFormat`类向上造型，调用其`Date parse(String source)`来转换。  
  **Input**
  ```java
  Date date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse("2000-02-01 12:42:15");
  ```

+ 将日期对象转换为字符串
  使用`SimpleDateFormat`类向上造型，调用其`StringBuffer format(Date date)`来转换。  
  **Input**
  ```java
  String str = new SimpleDateFormat("yyyy年MM月dd日").format(date);
  ```

### 5.1.2 `Calendar`类
**基本信息**  
**Package** java.util  
`public abstract class Calendar`  

+ 使用静态方法`static Calendar getInstance()`来获取一个`Calendar`类实例。  
