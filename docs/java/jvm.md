---
prev: 
    text: 'API-输入输出类库'
    link: 'java/API-io'
next: 
    text: '参考文献或资料'
    link: 'java/references'
---

# Java 虚拟机
Java 中使用范围最广的虚拟机就是 HotSpot 虚拟机，这里介绍相关的知识。  

## 7.1 内存分区
![内存分区](/img/内存模型.png)

+ 程序计数器  
  是寄存器，负责程序计数和任务调度。  
  虚拟机中的字节码解释器通过改变程序计数器来依次读取指令，以此实现代码流程控制。  
  在多线程情况下，程序计数器记录当前线程执行位置，当线程切换时可以获得运行位置信息。  
  生命周期随着线程的创建而创建，随着线程的结束而死亡。  

+ 本地方法栈  
  描述本地（原生）方法执行的内存模型。  
  本地方法被执行的时候，在本地方法栈会创建一个栈帧，用于存放该本地方法的局部变量表、操作数栈、动态链接、出口信息。  
  可能会出现 StackOverFlowError 和 OutOfMemoryError.  

+ 栈内存（虚拟机栈）  
  描述 Java 方法（字节码）执行的内存模型，每次方法调用的数据都是通过栈传递的。  
  由一个个栈帧组成，而每个栈帧中都拥有：局部变量表、操作数栈、动态链接、方法出口信息。  
  其中最重要的是局部变量表，它主要存放编译器可知的各种数据类型和对象引用。  
  每一次函数调用都会有一个对应的栈帧被压入 Java 栈，每一个函数调用结束或抛出异常后，都会有一个栈帧被弹出。  
  StackOverFlowError：若 Java 虚拟机栈的内存大小不允许动态扩展，那么当线程请求栈的深度超过当前 Java 虚拟机栈的最大深度的时候，就抛出 StackOverFlowError 错误。  
  OutOfMemoryError： Java 虚拟机栈的内存大小可以动态扩展， 如果虚拟机在动态扩展栈时无法申请到足够的内存空间，则抛出 OutOfMemoryError 错误。

+ 堆内存  
  存储对象（对象生命周期结束后被 `GC` 回收，堆也被成为 GC 堆），对象实例和数组会被分配在这里。  
  堆内存分为：新生代，老年代和永久代。其中新生代包括伊甸园区（Eden）和两个幸存区（Survivor, S0, S1）  
  可能会出现 OutOfMemoryError, 具体还分为 GC Overhead Limit Exceeded, Java heap space 等情形。  

+ 方法区  
  存储类的信息（已被虚拟机加载的类信息、常量、静态变量、即时编译器编译后的代码等数据）  
  虽然 Java 虚拟机规范把方法区描述为堆的一个逻辑部分，但是它却有一个别名叫做 Non-Heap（非堆），目的应该是与 Java 堆区分开来。  
  方法区和永久代的关系很像 Java 中接口和类的关系，类实现了接口。而永久代就是 HotSpot 虚拟机对虚拟机规范中方法区的一种实现方式。  
  方法区溢出会报 `OutOfMemoryError` 错误  
  方法区中垃圾回收行为很少出现，可以用以下命令对该分区大小进行调节：  
  ``` java
  -XX:PermSize=N //方法区 (永久代) 初始大小
  -XX:MaxPermSize=N //方法区 (永久代) 最大大小,超过这个值将会抛出 OutOfMemoryError
  ```
  其中：  
  + 静态区  
    存储静态属性和静态方法  
    静态属性存储在此区后自动赋默认值

  + 静态常量池  
    存储类成员属性和成员方法信息  

  + 运行时常量池  
    存储计算机常量和被 `final` 修饰的常量副本
    逻辑包含字符串常量池存放在方法区, 此时 hotspot 虚拟机对方法区的实现为永久代。<Badge type="error" text="Java 7.0-"/>  
    运行时常量池剩下的东西还在方法区（永久代）中，但字符串常量池被从方法区拿到了堆中。<Badge type="warning" text="Java 7.0"/>  
    移除了永久代而用元空间取代, 这时候字符串常量池还在堆, 运行时常量池还在方法区, 只不过方法区的实现从永久代变成了元空间。<Badge text="Java 8.0+"/>  

+ 直接内存  
  直接内存并不是虚拟机运行时数据区的一部分，也不是虚拟机规范中定义的内存区域，但是这部分内存也被频繁地使用。  
  可能导致 OutOfMemoryError.  
  JDK1.4 中新加入的 NIO(New Input/Output) 类，引入了一种基于通道（Channel）与缓存区（Buffer）的 I/O 方式，它可以直接使用 Native 函数库直接分配堆外内存，然后通过一个存储在 Java 堆中的 DirectByteBuffer 对象作为这块内存的引用进行操作。这样就能在一些场景中显著提高性能，因为避免了在 Java 堆和 Native 堆之间来回复制数据。<Badge text="Java 1.4+"/>

其中堆内存、方法区与直接内存是所有线程共享的，而栈内存（虚拟机栈）、本地方法栈与程序计数器是每个线程独有的。  

在Java 8 后，虚拟机对内存分配有了更新<Badge text="Java 8.0+"/>：  
![内存模型 1.8](/img/内存模型1_8.png)
在 Java 8 之后，通过合并 HotSpot 与 JRockit 虚拟机，永久代被元空间代替，而元空间使用直接内存。  
使用命令来调节元空间大小：  
``` java
-XX:MetaspaceSize=N //设置 Metaspace 的初始（和最小大小）
-XX:MaxMetaspaceSize=N //设置 Metaspace 的最大大小
```
MetaspaceSize 默认值为 unlimited，意味着它只受系统内存的限制；MetaspaceSize 调整标志定义元空间的初始大小，如果未指定此标志，则 Metaspace 将根据运行时的应用程序需求动态地重新调整大小。  
元空间里面存放的是类的元数据，通过使用元空间而不是永久代来增加可加载类的数量。（仅受机器实际可用空间限制）  

::: tip 对象生命周期结束的判定
堆内存中有两个机制可以检测对象声明周期是否结束。  
1. 引用计数法  
   给对象添加一个引用计数器，当出现一个引用时计数器加一，当引用失效时计数器减一。当计数器为零时对象声明周期结束。  
   但主流 JVM 并不采用这个机制，因为它无法解决对象循环引用问题。  
2. 可达性分析算法  
   设定一些对象成为 GC Roots。从 GC Roots 开始向下搜索，所有走过路径称为引用链。当某对象没有从 GC Root 到该对象的引用链时，即处于不可达状态。这些对象需要被回收。  
   不可达的对象会经过两个阶段：  
   1. 被判定不可达后被进行标记
   2. 被标记过一次的对象被进行筛选，如果有必要进行 `finalize()` 则被回收。 （对象没有调用 `finalize()` 或这个方法已经被虚拟机调用过时认为不需要执行 `finalize()`)  
   可以作为 GC Root 的对象有：  
   + 栈内存中引用的对象（栈帧中的本地变量表）  
   + 本地方法栈中引用的对象  
   + 方法区中类的静态属性引用的对象
   + 方法区中常量引用的对象
   + 被同步锁持有的对象
:::

## 7.2 垃圾分代回收机制
对象在堆内存中存储。当对象在使用完成后，会在某个不定的时刻被垃圾回收器 `GC` 解析。  
值得注意的是：**垃圾回收过程无法手动控制**。  
基本逻辑：  
+ 堆内存分为**新生代区**，**老年代区**和**永久代**。  
+ 新生代区分为**伊甸园区**和两个**幸存区**。  
+ 幸存区包括两个部分，S0(From) 和 S1(To).  
+ 一个新创建的对象会被生成在伊甸园区，若在伊甸园区的对象经过一次回收过程仍然存活，则被移动到幸存区。  
+ 幸存区的回收扫描频率略低于伊甸园区。在幸存区经过多次扫描，若对象仍然存活，则被移动到老年代区。
+ 老年代区的回收扫描频率会远远低于新生代区。
+ 当老年代区中的对象被回收时，会导致程序卡顿甚至崩溃。
+ GC 分为两大类：  
  + Partial GC
    + Minor GC (Young GC): 只对新生代进行垃圾回收，当伊甸园区满时触发
    + Major GC (Old GC): 只对老年代进行垃圾回收
    + Mixed GC: 对整个新生代和部分老年代进行垃圾回收
  + Full GC: 对整个堆和方法区进行垃圾回收，当准备触发 Minor GC 但是预估平均晋升比老年代剩余空间大时触发；当永久代满时触发；当执行 `System.gc()` 和 Heap Dump 时触发

### 7.2.1 具体逻辑
**一般情况**  
+ 对象在伊甸园区分配
+ 伊甸园区垃圾回收后仍然存活的对象进入 S0 或 S1，其年龄变为 1
+ 每轮垃圾回收后仍然存活的对象年龄加 1
+ 当年龄大于 15 （默认情况）的对象转移到老年代  
  `-XX:MaxTenuringThreshold` 设定阈值年龄大小；  
  `-XX:+PrintTenuringDistribution` 打印当前次垃圾回收后阈值年龄。  
  动态年龄阈值计算机制：  
  虚拟机遍历所有对象统计它们的年龄，按小到大对年龄出现频率进行累积计算。当某年龄开始累积对象总大小超过幸存区容量一半时，取该年龄和 MaxTenuringThreshold 中更小的作为新的阈值年龄。  
+ 若某次垃圾回收后伊甸园区和 S0 区被清空，则 S1 与 S0 交换角色。  
+ 若某次垃圾回收后 S0 区空间不够但某些对象还没有达到进入老年代条件，无法存下的部分提前进入老年代。（分配担保机制）  

### 7.2.2 垃圾回收算法
1. 标记-清除算法  
   先标记出不需要回收的对象，之后统一回收掉没有被标记的对象。  
   问题：  
   + 效率低  
   + 产生不连续的碎片导致空间利用率低  
2. 标记-复制算法  
   将内存分为大小相同的两块，每次使用其中一块。当当前使用的内存不足时，标记出不需要回收的对象并复制到第二块内存中。之后一次性清除掉第一块内存中所有空间。  
3. 标记-整理算法  
   根据老年代特性提出的算法。标记出不需要回收的对象并让它们移向一端，之后清除掉边界以外的内存空间。  
4. 分代回收算法  
   [具体逻辑](#垃圾分代回收机制)。综合利用上面的算法。  
   在分代的基础上，在新生代中选择标记复制算法，只需要付出少量对象复制成本就可以在高频率对象生命周期结束的情况下完成垃圾回收。  
   在老年代使用标记-清除或标记-整理算法，它们的生命周期更长，没有额外的空间可以分配担保。  

### 7.2.3 垃圾回收器
垃圾回收器是垃圾回收算法的具体实现。需要在具体场景选用最合适的垃圾回收器。  
1. Serial  
   + 串行收集器，单线程。在进行垃圾回收时，其他工作线程都需要暂停，直到收集结束。  
   + 垃圾回收算法：新生代采用标记-复制算法，老年代采用标记-整理算法。  
   + 优点：简单高效，没有线程交互开销。适用于 Client 模式下的虚拟机。  
   + 缺点：Stop-The-World 的巨大停顿影响程序体验。  
2. ParNew  
   + Serial 的多线程版本。（用户线程等待，垃圾回收器并行执行，直到回收结束后用户线程继续）除使用多线程外，其他行为和 Serial 相同。  
   + 垃圾回收算法：新生代采用标记-复制算法，老年代采用标记-整理算法。  
   + 适用于 Server 模式下的虚拟机。可以与 CMS 回收器配合工作。  
3. Parallel Scavenge  
   + Java 7 的默认垃圾回收器。  
   + 拥有高吞吐的特性（高效利用 CPU, CPU 中用于运行用户代码的时间与 CPU 总消耗时间比值高）  
   + 用户线程等待，垃圾回收器并行执行，直到回收结束后用户线程继续。  
   + 垃圾回收算法：新生代采用标记-复制算法，老年代采用标记-整理算法。  
4. Serial Old  
   + Serial 老年代版本。  
   + 用于在 Java 8 和以前的版本中搭配 Parallel Scavenge 使用；或作为 CMS 的备选方案。  
5. Parallel Old  
   + Parallel Scavenge 的老年代版本。  
6. CMS  
   + Concurrent Mark Sweep 收集器。以获取最短回收停顿为目标，提高用户体验。 
   + 是 HotSpot 虚拟机的第一款真正意义上的并发收集器。  
   + 实现垃圾回收线程与用户线程几乎同时工作。  
   + 垃圾回收算法：使用标记-清除算法，具体步骤为  
      + 初始标记  
        暂停其他线程，记录直接与 Root 相连的对象  
      + 并发标记  
        同时开启 GC 线程与用户线程。用闭包结构记录可达对象。  
        （闭包结构中不具有实时性。它不会包含全部可达对象，因为用户线程可能会不断更新引用。算法会跟踪记录引用更新的地方）  
      + 重新标记  
        用户线程暂停，GC 线程修正并发标记期间引用更新的地方。  
        停顿时间比初始标记时间稍长，比并发标记时间短。  
      + 并发清除  
        开启用户线程，GC 线程开始对未标记区域清除。  
      + 并发重置  
  + 优点：并发收集、低停顿。  
  + 缺点：对 CPU 资源敏感；无法处理浮动垃圾；使用标记-清除算法带来空间碎片化。  
7. G1  
   + Garbage First 垃圾回收器，是 Java 9 的默认垃圾回收器。  
   + 面向服务器的垃圾回收器，针对配备多颗处理器和大容量内存的机器。  
   + 极高概率满足 GC 停顿时间小且高吞吐。  
   + 四个特点：  
     1. 并发与并行  
        利用多 CPU 特性来缩短 Stop The World 时间（并行）。  
        利用并发在本需要停顿用户线程来执行 GC 任务的情况下同时运行。    
     2. 分代回收  
        保留分代概念，但不需要其他垃圾回收器配合。  
     3. 空间整合  
        整体来看使用标记-整理算法；从局部来看使用标记-复制算法。  
     4. 可预测停顿  
        可以建立一个长度为几毫秒的停顿时间预测供使用者使用。  
   + 执行步骤：  
     G1 在后台维护了一个优先列表。每次根据允许的收集时间优先选择回收价值最大的区域（Region）。  
     通过使用划分区域的方式，保证 G1 在有限时间内尽可能提高收集率。  
     1. 初始标记
     2. 并发标记
     3. 最终标记
     4. 筛选回收
8. ZGC  
   + Java 11 中提供的一款新的垃圾回收器。  
   + 适用于大内存低延迟服务的内存管理与回收。  
   + 垃圾回收算法：标记-复制算法。  

## 7.3 关于类
### 7.3.1 类生命周期
一个类的声明周期包括：  
1. 加载
   JVM 规定类的加载分为三步（这个规定不具体，具有操作的灵活性）：  
   1. 通过全类名获取类的二进制字节流
   2. 将字节流所代表的静态存储结构转换为方法区的运行时数据
   3. 在内存中生成一个代表该类的 Class 对象，作为方法区数据的访问入口  
   
   **类加载与连接工作是重合进行的，加载阶段还未结束时，连接阶段就已经可以开始。*  
   ::: tip 关于类加载可控性
   非数组的类在类加载阶段中的获取二进制字节流的动作拥有高可控性。  
   可以通过重写类加载器的 `loadClass()` 来自定义获取字节流的方式。  

   **数组类型不通过类加载器创建而直接由 JVM 负责。*
   :::
2. 连接  
   连接步骤分为三步：  
   1. 验证  
      具体包括四步：  
      1. 文件格式验证  
         验证字节流是否符合 Class 文件格式规范。  
         例如：是否以魔数 `0xCAFBABE` 开头；主次版本号是否在当前 JVM 处理范围内；常量池是否有不支持的类型等。
      2. 元数据验证  
         对字节码描述的信息进行语义分析，保证其描述的信息符合 Java 语言规范。  
         例如：类继承正确性（是否继承了被 `final` 修饰的类等）
      3. 字节码验证  
         通过数据流和控制流分析，确定程序语义合法、逻辑合逻辑。  
         例如：保证任意时刻操作数栈和指令代码序列可以配合工作。  
      4. 符号引用验证  
         确保解析动作正确执行。  
   2. 准备  
      正式为类变量分配内存并设置变量的初始值。  
      ::: warning 注意
      1. 该时刻仅分配静态变量（类变量, Class Variables）空间  
         实例变量会在对象实例化时随着对象一起被分配在堆内存中。  
      2. 永久代中字符串常量池、静态变量等被移入堆内存<Badge text="Java 7.0+"/>  
         但是在 Java 7 之前的版本，静态变量会被分配到方法区中的静态常量池，HotSpot 通过永久代来实现方法区。  
         详情见[内存分区](#内存分区)。  
      3. 分配的初始值是每种变量的默认值  
         就算人为在类中定义了初始值，但在准备阶段只会被分配这种类型的默认值。除非它被 `final` 修饰。  
      :::
   3. 解析  
      将虚拟机常量池里的符号引用替换为直接引用。  
      符号引用指用符号来描述目标，可以是任何字面量；直接引用是直接指向目标的指针或相对偏移量或间接定位目标的句柄。  
      解析主要针对类、接口、字段、类方法、接口方法、方法句柄和调用限定符这七类符号引用。  
      通过将符号引用转换为直接引用，程序可以准确得知类、字段、方法等在内存中的指针或偏移量。  
3. 初始化  
   执行初始化方法 `<clinit> ()`. 这个方法是编译后自动生成的。它是一个带锁的方法，JVM 会在多线程环境中保证安全性（因为类初始化中如果遇到线程阻塞则很难被发现）。  
   JVM 要求以下六种情况必须初始化：  
   1. 遇到 `new`, `getstatic`, `putstatic`, `invokestatic` 四条字节码指令时  
      + `new` 程序创建一个类实例
      + `getstatic` 程序访问类的静态变量
      + `putstatic` 程序给类的静态变量赋值
      + `invokestatic` 程序调用类的静态方法  
   2. 使用反射包的方法对类进行反射调用时  
   3. 当初始化一个类时发现它的父类还未初始化时，先触发该类的父类的初始化  
   4. JVM 启动时，初始化程序的主类  
   5. 当使用 `MethodHandle` 和 `VarHandle` 时，必须先使用 `findStaticVarHandle` 来初始化要调用的类  
   6. 一个定义了默认方法的接口的实现类被初始化时，该接口要在其之前被初始化  
4. 使用  
5. 卸载  
   需要满足三个要求：  
   1. 该类的所有实例对象都被垃圾回收
   2. 该类在其他地方都没有引用
   3. 该类的类加载器实例被垃圾回收  
   
   以此我们可以看出，Java 自身的类加载器 `BootstrapClassLoader`, `ExtClassLoader`, `AppClassLoader` 负责加载 Java 提供的类，这些类加载器的实例不会被回收。  
   自定义的类加载器可以被回收。使用自定义类加载器加载的类会被卸载。

### 7.3.2 类加载
**类加载器**  
Java 提供了三个内置的类加载器。其中两个用 Java 语言编写，继承自 `java.lang.ClassLoader`. 剩下的一个用 C++ 编写。  
+ BootstrapClassLoader 启动类加载器  
  是最顶层的类加载器，由 C++ 语言实现。负责加载 `/lib` 目录中的 jar 包或被 `-Xbootclasspath` 指定的路径中的 jar 包和类。  
+ ExtensionClassLoader 扩展类加载器  
  负责加载 `/lib/ext` 目录中的 jar 包和类或被 `java.ext.dirs` 变量指定的路径中的 jar 包和类。  
+ AppClassLoader 应用程序类加载器  
  面向用户的类加载器，负责加载当前应用 ClassPath 中所有的包和 jar 包和类。  

除了 Java 提供的类加载器，用户可以自己定义一个类加载器，需要继承 `java.lang.ClassLoader`.  
如果自定义的类加载器想使用双亲委派机制，则需要重写 `findClass()`. 所有无法被父加载器加载的类会通过这个方法被加载。  
如果自定义的类加载器不想使用双亲委派机制，则需要重写 `loadClass()`.  

**类加载机制**  
+ 双亲委派机制  
   主要逻辑：  
   + 类加载的时候 JVM 会判断当前类是否被当前加载器加载过，如果已经加载过则直接返回，否则把请求发给父级类加载器的 `loadClass()` 处理，再判断是否由该加载器加载，若无则继续上抛，直到顶层的 BootstrapClassLoader. 
   + 之后进入加载环节，当顶层加载器无法处理时，则下放到子级加载器尝试加载，若无法加载则层层下放，直到找到可以加载的类加载器。  
   + 若始终无法找到可以加载的类加载器，则报 ClassNotFoundException.  
  ![双亲委派机制](/img/双亲委派.jpg)

   源码分析：  
   ``` java
   private final ClassLoader parent;
   protected Class<?> loadClass(String name, boolean resolve) throws ClassNotFoundException {
      synchronized (getClassLoadingLock(name)) {
         // 首先，检查请求的类是否已经被加载过
         Class<?> c = findLoadedClass(name);
         if (c == null) {
            long t0 = System.nanoTime();
               try {
                  if (parent != null) {//父加载器不为空，调用父加载器loadClass()方法处理
                     c = parent.loadClass(name, false);
                  } else {//父加载器为空，使用启动类加载器 BootstrapClassLoader 加载
                     c = findBootstrapClassOrNull(name);
                  }
               } catch (ClassNotFoundException e) {
                  //抛出异常说明父类加载器无法完成加载请求
                  //...
               }

            if (c == null) {
               long t1 = System.nanoTime();
               //自己尝试加载
               c = findClass(name);

               // this is the defining class loader; record the stats
               sun.misc.PerfCounter.getParentDelegationTime().addTime(t1 - t0);
               sun.misc.PerfCounter.getFindClassTime().addElapsedTimeFrom(t1);
               sun.misc.PerfCounter.getFindClasses().increment();
            }
         }
         
         if (resolve) {
            resolveClass(c);
         }
         
         return c;
      }
   }
   ```

   优点：保证了 Java 程序的稳定运行，避免类重复加载。保证 Java 核心 API 不会篡改。  
+ 全盘负责委托机制  
  当一个类加载器尝试加载一个类的时候，除非提示使用的是另一个类加载器，则该类所依赖和引用的类都由同一个类加载器加载。  
  


### 7.3.3 类文件结构
JVM 会通过编译器将程序转换为 `.class` 文件。这个文件是 Java 跨平台的基础。根据 JVM 规范，Class 文件定义结构为：  
```
ClassFile {
   u4             magic;                                 //Class 文件的标志
   u2             minor_version;                         //Class 的小版本号
   u2             major_version;                         //Class 的大版本号
   u2             constant_pool_count;                   //常量池的数量
   cp_info        constant_pool[constant_pool_count-1];  //常量池
   u2             access_flags;                          //Class 的访问标记
   u2             this_class;                            //当前类
   u2             super_class;                           //父类
   u2             interfaces_count;                      //接口
   u2             interfaces[interfaces_count];          //一个类可以实现多个接口
   u2             fields_count;                          //Class 文件的字段属性
   field_info     fields[fields_count];                  //一个类可以有多个字段
   u2             methods_count;                         //Class 文件的方法数量
   method_info    methods[methods_count];                //一个类可以有个多个方法
   u2             attributes_count;                      //此类的属性表中的属性数
   attribute_info attributes[attributes_count];          //属性表集合
}
```
使用命令 `javap -v 类名` 来查看 Class 信息；使用命令 `javap -v 类名 -> fileName.txt` 来将结果输出到 txt 文件中。  

**魔数 Magic Number**  
Class 文件的前 4 个字节为魔数，它的作用是确定是可以被虚拟机接受的文件。  
在 Java 中，魔数为 `0xCAFEBABE`.

**文件版本号 Minor and Major Version**  
第 5-6 字节为次版本号；7-8 字节为主版本号。  
高版本 JVM 可以向下兼容低版本编译器生成 Class 文件，但低版本 JVM 不能运行高版本编译器。  

**常量池**  
常量池存放字面量和符号引用。  
其中字面量包括文本字符串、被 `final` 修饰的常量等；  
符号引用包括：类和接口的全限定名；字段的名称和描述符；方法的名称和描述符。  
常量池的容量是 `constant_pool_count - 1`, 因为常量池计数从 1 开始，第 0 个元素作为一个 tag.  
常量池中的每一个元素都表示了一个表，其中最开头的一个元素 tag 表示了常量类型，占长度为 u1：  
|类型|标志|描述|
|:--|:--:|:--|
||0|不引用任何一个常量池项|
|CONSTANT_utf8_info|1|UTF-8 编码的字符串|
|CONSTANT_Integer_info|3|整形字面量|
|CONSTANT_Float_info|4|浮点型字面量|
|CONSTANT_Long_info|５|长整型字面量|
|CONSTANT_Double_info|６|双精度浮点型字面量|
|CONSTANT_Class_info|７|类或接口的符号引用|
|CONSTANT_String_info|８|字符串类型字面量|
|CONSTANT_Fieldref_info|９|字段的符号引用|
|CONSTANT_Methodref_info|10|类中方法的符号引用|
|CONSTANT_InterfaceMethodref_info|11|接口中方法的符号引用|
|CONSTANT_NameAndType_info|12|字段或方法的符号引用|
|CONSTANT_MethodHandle_info|15|表示方法句柄|
|CONSTANT_MothodType_info|16|标志方法类型|
|CONSTANT_InvokeDynamic_info|18|表示一个动态方法调用点|

**访问标志**  
用于识别类或接口级别的信息。例如文件是类还是接口；权限修饰符；非权限修饰符等。  
|类型|值|描述|
|:--|:--:|:--|
|ACC_PUBLIC|0x0001|public|
|ACC_FINAL|0x0010|final|
|ACC_SUPER|0x0020|当 invokespecial 指令调用该类方法时特殊处理|
|ACC_INTERFACE|0x0200|接口|
|ACC_ABSTRACT|0x0400|abstract|
|ACC_SYNTHETIC|0x1000|synthetic|
|ACC_ANNOTATION|0x2000|注解|
|ACC_EMUM|0x4000|枚举|

**索引集合**  
这一部分表示当前类、父类和接口的索引集合。这些索引用于确定类的全限定名。  
接口索引描述类实现了哪些接口，它们会被按 `implements` 或 `extends` 关键字后面的类型顺序排放在索引中。  

**字段表集合**  
这一部分用于描述接口或类中声明的变量。它包括静态变量和实例变量，但不包含方法内部声明的局部变量）。  
字段表的结构：  
```
field_info {
   u2             access_flages;                // 权限/非权限控制符
   u2             name_index;                   // 常量池引用，表示字段名称
   u2             descriptor_index;             // 常量池用用，表示字段和方法描述符
   u2             attributes_count;             // 字段个数
   attribute_info attributes[attributes_count]; // 存放字段具体内容
}
```
|类型|值|描述|
|:--|:--:|:--|
|ACC_PUBLIC|0x0001|public|
|ACC_PRIVATE|0x0002|private|
|ACC_PROTECTED|0x0004|protected|
|ACC_STATIC|0x0008|static|
|ACC_FINAL|0x0010|final|
|ACC_VOLATILE|0x0040|volatile|
|ACC_TRANSIENT|0x0080|transient|
|ACC_SYNTHETIC|0x1000|synthetic|
|ACC_ENUM|0x4000|枚举|

**方法表集合**  
这一部分用于表示类中的方法。分别存放方法数量和具体方法表。  
```
method_info {
   u2             access_flages;                // 权限/非权限控制符
   u2             name_index;                   // 常量池引用，表示字段名称
   u2             descriptor_index;             // 常量池用用，表示字段和方法描述符
   u2             attributes_count;             // 字段个数
   attribute_info attributes[attributes_count]; // 存放字段具体内容
}
```
|类型|值|描述|
|:--|:--:|:--|
|ACC_PUBLIC|0x0001|public|
|ACC_PRIVATE|0x0002|private|
|ACC_PROTECTED|0x0004|protected|
|ACC_STATIC|0x0008|static|
|ACC_FINAL|0x0010|final|
|ACC_SYNCHRONIZED|0x0020|synchronized|
|ACC_BRIDGE|0x0040|桥接方法|
|ACC_VARARGS|0x0080|可变参数|
|ACC_NATIVE|0x0100|native, 用 Java 语言实现|
|ACC_ABSTRACT|0x0400|abstract|
|ACC_STRICT|0x0800|strictfp, floating-point 为 FP-strict|
|ACC_SYNTHETIC|0x1000|synthetic|

**属性表集合**  
这一部分是字段表和方法表中携带的属性表集合，用于描述某些场景的专有信息。  

## 7.4 关于对象
### 7.4.1 对象创建
当 JVM 遇到需要通过 `new` 创建对象时：  
1. 类加载检查  
   JVM 先检查该指令的参数能否在常量池中定位到被加载、解析、初始化过。若没有，则执行相应的类加载过程。
2. 分配内存  
   类检查后即可确定所需要的内存大小，JVM 按照堆内存是否规整（由 GC 使用的算法决定）选择一种内存分配方式进行内存分配：  
   + 指针碰撞  
     适合堆内存规整的情况。  
     将使用过的内存放在一边，未使用过的放在另一边，两个区域通过分界指针隔开。使用时指针向未使用过区域移动需要的内存大小。  
     对应 GC：Serial, ParNew  
   + 空闲列表  
     适合堆内存不规整的情况。  
     JVM 维护一个空闲内存列表。当需要空间时寻找一块可以存放的内存位置分给对象，之后更新列表。  
     对应 GC: CMS  
   ::: tip 并发内存分配下的线程安全
    JVM 通过两个机制来保证线程安全：  
    + CAS + 失败重试   
      每次操作不加锁，假设没有冲突直接完成某操作。当因为冲突而失败时就进行重试，直到成功为止。  
    + TLAB  
      为每个线程预先在伊甸园区划分一块 TLAB 内存。当 JVM 在给线程中对象分配内存时首先分配在 TLAB 内存中，若对象所需内存大于 TLAB 剩余内存或 TLAB 内存已耗尽时，再采用 CAS + 失败重试机制。  
   ::: 
3. 初始化值  
   JVM 对分配的内存初始化为默认值。（保证对象的实例属性在 Java 代码中可以不赋予初始值而直接使用）。  
4. 设置对象头  
   JVM 继续对对象进行设置，将相关的重要信息（对象所对应的具体类、类的元数据信息路径、哈希码、GC 分代年龄等）存放在对象头中。根据 JVM 运行状态不同 ，对象头设置方式可能会因为是否启用偏向锁等因素而产生不同的设置方式。  
5. 执行 `init` 方法  
   通过执行  `init` 方法使得具体对象初始化为程序员意愿状态。   

### 7.4.2 内存布局
一个对象在内存中可分为三块：  
1. 对象头  
   对象头包含两部分信息：  
   + 运行时数据：哈希码、GC 分代年龄、锁状态等
   + 类型指针：对象指向类的元数据指针。JVM 通过这个指针来确定对象属于那一个类。
2. 实例数据  
   真正存储的有效信息，定义的属性内容会被存放在这里。  
3. 对齐填充  
   起占位作用。HotSpot 的自动内存管理系统要求对象起始地址必须是 8 字节的整数倍。当实例数据没有对齐时，使用对齐填充来补全。  

### 7.4.3 访问定位
Java 程序通过栈内存中的引用数据来操作堆中的具体对象。主流的访问方式包括：  
+ 句柄  
  堆内存中划分一块区域成为句柄池，栈内存中的引用数据存储的是对象的句柄地址。句柄中存储了对象实例数据和类型数据的地址。  
  在对象被移动时只会改变句柄中的指针而不需要改变栈内存中的引用。  
+ 指针  
  由堆内存直接管理类型数据等信息，栈内存中的引用数据存储的直接是对象地址。  
  访问速度更快，节省了一次指针定位的时间开销。  