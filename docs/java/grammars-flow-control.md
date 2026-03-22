---
prev:
    text: '运算符'
    link: 'java/grammars-operators'
next:
    text: '数组'
    link: 'java/grammars-arrays'
---

# 表达式与流程控制
## 2.5 表达式、语句和代码块
### 2.5.1 表达式
一个表达式由**变量**，**运算符**和**方法调用**组成，其具体组合方式由语法决定。  
表达式的结果是一个**值**。  
如代码`int result = 1 + 2;`中，`result = 1 + 2`就是一个表达式。

### 2.5.2 语句
**语句**是程序执行的最小单元。  
在 Java 中一个语句由`;`结束，下面这些表达式加上`;`就可以构成一个语句：  
+ 声明表达式
+ 使用`++`和`--`
+ 方法调用
+ 创建对象表达式
### 2.5.3 代码块
当把0到多个**语句**用**括号**包围时，这个结构就是一个代码块。  
只要可以出现单独语句的地方都可以出现代码块。

详见[代码块](./object-oriented.html#_3-4-代码块)。

## 2.6 流程控制
### 2.6.1 顺序结构
结构化程序设计由迪杰斯特拉 (E.W.Dijikstra) 在 1965 年提出，其要求采用“自顶向下，逐步求精”的设计方法。  
简单来讲，就是从上到下，从左到右，依次执行。

### 2.6.2 分支结构
1. `if-then`语句  
    当`条件`为**真**时，则执行`{...}`中的语句。  
    **格式**：
    ``` java
    if (condition) {
        // some statements
    }
    ```
    ::: tip 特别的
    当`then`的部分只有一条语句时，包裹其的大括号可以省略。  
    ``` java
    if (condition)
        // a statement
    ```
    :::

2. `if-then-else`语句  
    当`条件`为**真**时，执行`{...}`中的内容，否则执行`else {...}`中的内容。  
    **格式**：
    ``` java
    if (condition) {
        // some statements
    } else {
        // other statements
    }
    ```
    ::: tip 特别的
    `if-then-else`语句可以嵌套使用。  
    下面是一个简单的例子来实现“大于90分为A，大于80分为B……的成绩判断”程序。  
    ``` java
    class IfElseDemo {
        public static void main(String[] args) {

            int testscore = 76;
            char grade;

            if (testscore >= 90) {
                grade = 'A';
            } else if (testscore >= 80) {
                grade = 'B';
            } else if (testscore >= 70) {
                grade = 'C';
            } else if (testscore >= 60) {
                grade = 'D';
            } else {
                grade = 'F';
            }
            System.out.println("Grade = " + grade);
        }
    }
    ```
    :::

3. `switch`语句  
+ `switch`语句可以拥有多个可执行的路径 (`if`系列只有一个)。  

+ `switch`语句可以对`byte`, `short`, `char`和`int`类型的数据进行判定。  

+ 对`String`类进行判定<Badge text="Java SE 7.0 +"/>。  

+ `switch`还可以判定`Enum`枚举类型和一些特定的包装类，如`Character`, `Byte`, `Short`和`Integer`.  

下面是一个通过输入`int`类型月份输入，由计算机输出对应单词的程序：  
   **Input**
   ``` java
    public class SwitchDemo {
        public static void main(String[] args) {

            int month = 8;
            String monthString;
            switch (month) {
                case 1:  monthString = "January";
                        break;
                case 2:  monthString = "February";
                        break;
                case 3:  monthString = "March";
                        break;
                case 4:  monthString = "April";
                        break;
                case 5:  monthString = "May";
                        break;
                case 6:  monthString = "June";
                        break;
                case 7:  monthString = "July";
                        break;
                case 8:  monthString = "August";
                        break;
                case 9:  monthString = "September";
                        break;
                case 10: monthString = "October";
                        break;
                case 11: monthString = "November";
                        break;
                case 12: monthString = "December";
                        break;
                default: monthString = "Invalid month";
                        break;
            }
            System.out.println(monthString);
        }
    }
```

   **Output**
   ``` sh
   August
   ```
   ::: warning 注意
   + `break;`语句用来跳出当前判定或循环。  
   所以我们可以知道当执行到某不含`break;`的`case`块时，判定仍将继续下去，直到所有`case`均不满足或遇到`break;`才退出操作。  
   **Input**
   ``` java
   public class SwitchDemoFallThrough {
        public static void main(String[] args) {

            java.util.ArrayList<String> futureMonths =
                new java.util.ArrayList<String>();

            int month = 8;

            switch (month) {
                case 1:  futureMonths.add("January");
                case 2:  futureMonths.add("February");
                case 3:  futureMonths.add("March");
                case 4:  futureMonths.add("April");
                case 5:  futureMonths.add("May");
                case 6:  futureMonths.add("June");
                case 7:  futureMonths.add("July");
                case 8:  futureMonths.add("August");
                case 9:  futureMonths.add("September");
                case 10: futureMonths.add("October");
                case 11: futureMonths.add("November");
                case 12: futureMonths.add("December");
                        break;
                default: break;
            }

            if (futureMonths.isEmpty()) {
                System.out.println("Invalid month number");
            } else {
                for (String monthName : futureMonths) {
                System.out.println(monthName);
                }
            }
        }
    }
```  

   **Output**  
    
``` sh
    August
    September
    October
    November
    December
```

+ 判定过程按`case`顺序依次判定，但若每个`case`块内都含`break;`语句则`case`顺序不影响结果。
:::

### 2.6.3 循环结构
1. `while`语句  
   当`条件`为**真**时，则持续执行`{...}`中的语句。  
   **格式**：
   ``` java
   while (condition) {
       // some statements
   }
   ```
2. `do-while`语句  
   先执行一次循环体`{...}`, 再进行`条件`的判断。若`条件`为**真**则持续执行循环体。  
   **格式**：
    ``` java
    do {
        // some statements
    } while (condition);
    ```
3. `for`语句  
   是一种重复迭代的循环语句，当不满足`终止条件`时持续执行循环体。  
   **格式**：
   ``` java
   for (initialization; termination; increment) {
       // statements
   } 
   ```
   ::: warning 注意
   + `for`语句要求填写三部分：**循环变量**、**终止条件**和**状态更新**。  

   + 三个部分可以为空，但其中的`;`需要留下。  
   :::  

   ::: tip 增强的 for 循环
   增强的 for 循环是一个语法糖，它使得`for`循环在某些场景更易读。  
   增强的 for 循环通常用在对**集合类**和**数组**遍历上，官方推荐在可以使用这种循环的地方都使用这种形式。  
   **格式**
   ``` java
   for (int item : someCollection) {
       // some statements
   }
   ```
    ::: warning 注意
    在增强的 for 循环中，被循环的集合类或数组是一个新的“副本”。  
    所以在增强的 for 循环中对被循环变量进行更改操作不会生效。
    :::

::: tip 特别的
+ `while`和`do-while`循环适用于**循环次数不固定，变化不规律**的场景。  

+ `for`循环使用于**变化规律**的场景。
:::

### 2.6.4 控制转移
1. `break`语句  
   终止循环/switch.

2. `continue`语句  
   终止当前循环，执行下一次循环。  

::: tip 特别的
`break`和`continue`拥有两种形式：使用`label`和不使用`label`。  
在多重循环下，一个`label`标签可以更好地让程序跳转到该跳转的地方。  
下面是两个实例，使用`label`的地方用高亮标识出：  
**Input**
``` java {15,21}
class BreakWithLabelDemo {
    public static void main(String[] args) {

        int[][] arrayOfInts = { 
            { 32, 87, 3, 589 },
            { 12, 1076, 2000, 8 },
            { 622, 127, 77, 955 }
        };
        int searchfor = 12;

        int i;
        int j = 0;
        boolean foundIt = false;

    search:
        for (i = 0; i < arrayOfInts.length; i++) {
            for (j = 0; j < arrayOfInts[i].length;
                 j++) {
                if (arrayOfInts[i][j] == searchfor) {
                    foundIt = true;
                    break search;
                }
            }
        }

        if (foundIt) {
            System.out.println("Found " + searchfor + " at " + i + ", " + j);
        } else {
            System.out.println(searchfor + " not in the array");
        }
    }
}
```
**Output**
```
Found 12 at 1, 0
```
---

**Input**
``` java {11,18,22}
class ContinueWithLabelDemo {
    public static void main(String[] args) {

        String searchMe = "Look for a substring in me";
        String substring = "sub";
        boolean foundIt = false;

        int max = searchMe.length() - 
                  substring.length();

    test:
        for (int i = 0; i <= max; i++) {
            int n = substring.length();
            int j = i;
            int k = 0;
            while (n-- != 0) {
                if (searchMe.charAt(j++) != substring.charAt(k++)) {
                    continue test;
                }
            }
            foundIt = true;
                break test;
        }
        System.out.println(foundIt ? "Found it" : "Didn't find it");
    }
}
```
**Output**
```
Found it
```
:::

3. `return`语句  
   终止当前方法，方法的执行结果将会返回给调用该方法的地方。

