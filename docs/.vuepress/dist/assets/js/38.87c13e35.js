(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{485:function(a,v,r){"use strict";r.r(v);var t=r(16),_=Object(t.a)({},(function(){var a=this,v=a.$createElement,r=a._self._c||v;return r("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[r("h1",{attrs:{id:"java-虚拟机"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#java-虚拟机"}},[a._v("#")]),a._v(" Java 虚拟机")]),a._v(" "),r("p",[a._v("Java 中使用范围最广的虚拟机就是 HotSpot 虚拟机，这里介绍相关的知识。")]),a._v(" "),r("h2",{attrs:{id:"内存分区"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#内存分区"}},[a._v("#")]),a._v(" 内存分区")]),a._v(" "),r("p",[r("img",{attrs:{src:"/img/%E5%86%85%E5%AD%98%E6%A8%A1%E5%9E%8B.png",alt:"内存分区"}})]),a._v(" "),r("ul",[r("li",[r("p",[a._v("程序计数器"),r("br"),a._v("\n是寄存器，负责程序计数和任务调度。"),r("br"),a._v("\n虚拟机中的字节码解释器通过改变程序计数器来依次读取指令，以此实现代码流程控制。"),r("br"),a._v("\n在多线程情况下，程序计数器记录当前线程执行位置，当线程切换时可以获得运行位置信息。"),r("br"),a._v("\n生命周期随着线程的创建而创建，随着线程的结束而死亡。")])]),a._v(" "),r("li",[r("p",[a._v("本地方法栈"),r("br"),a._v("\n描述本地（原生）方法执行的内存模型。"),r("br"),a._v("\n本地方法被执行的时候，在本地方法栈会创建一个栈帧，用于存放该本地方法的局部变量表、操作数栈、动态链接、出口信息。"),r("br"),a._v("\n可能会出现 StackOverFlowError 和 OutOfMemoryError.")])]),a._v(" "),r("li",[r("p",[a._v("栈内存（虚拟机栈）"),r("br"),a._v("\n描述 Java 方法（字节码）执行的内存模型，每次方法调用的数据都是通过栈传递的。"),r("br"),a._v("\n由一个个栈帧组成，而每个栈帧中都拥有：局部变量表、操作数栈、动态链接、方法出口信息。"),r("br"),a._v("\n其中最重要的是局部变量表，它主要存放编译器可知的各种数据类型和对象引用。"),r("br"),a._v("\n每一次函数调用都会有一个对应的栈帧被压入 Java 栈，每一个函数调用结束或抛出异常后，都会有一个栈帧被弹出。"),r("br"),a._v("\nStackOverFlowError：若 Java 虚拟机栈的内存大小不允许动态扩展，那么当线程请求栈的深度超过当前 Java 虚拟机栈的最大深度的时候，就抛出 StackOverFlowError 错误。"),r("br"),a._v("\nOutOfMemoryError： Java 虚拟机栈的内存大小可以动态扩展， 如果虚拟机在动态扩展栈时无法申请到足够的内存空间，则抛出OutOfMemoryError 错误。")])]),a._v(" "),r("li",[r("p",[a._v("堆内存"),r("br"),a._v("\n存储对象（对象生命周期结束后被 "),r("code",[a._v("GC")]),a._v(" 回收，堆也被成为 GC 堆），对象实例和数组会被分配在这里。"),r("br"),a._v("\n堆内存分为：新生代，老年代和永久代。其中新生代包括伊甸园区（Eden）和两个幸存区（Survivor, S0, S1）"),r("br"),a._v("\n可能会出现 OutOfMemoryError, 具体还分为 GC Overhead Limit Exceeded, Java heap space 等情形。")])]),a._v(" "),r("li",[r("p",[a._v("方法区"),r("br"),a._v("\n存储类的信息（已被虚拟机加载的类信息、常量、静态变量、即时编译器编译后的代码等数据）"),r("br"),a._v("\n虽然 Java 虚拟机规范把方法区描述为堆的一个逻辑部分，但是它却有一个别名叫做 Non-Heap（非堆），目的应该是与 Java 堆区分开来。"),r("br"),a._v("\n方法区和永久代的关系很像 Java 中接口和类的关系，类实现了接口。而永久代就是 HotSpot 虚拟机对虚拟机规范中方法区的一种实现方式。"),r("br"),a._v("\n方法区溢出会报 "),r("code",[a._v("OutOfMemoryError")]),a._v(" 错误"),r("br"),a._v("\n方法区中垃圾回收行为很少出现，可以用以下命令对该分区大小进行调节：")]),a._v(" "),r("div",{staticClass:"language-java extra-class"},[r("pre",{pre:!0,attrs:{class:"language-java"}},[r("code",[r("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("XX"),r("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),r("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("PermSize")]),r("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),r("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("N")]),a._v(" "),r("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//方法区 (永久代) 初始大小")]),a._v("\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("XX"),r("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),r("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("MaxPermSize")]),r("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),r("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("N")]),a._v(" "),r("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//方法区 (永久代) 最大大小,超过这个值将会抛出 OutOfMemoryError")]),a._v("\n")])])]),r("p",[a._v("其中：")]),a._v(" "),r("ul",[r("li",[r("p",[a._v("静态区"),r("br"),a._v("\n存储静态属性和静态方法"),r("br"),a._v("\n静态属性存储在此区后自动赋默认值")])]),a._v(" "),r("li",[r("p",[a._v("静态常量池"),r("br"),a._v("\n存储类成员属性和成员方法信息")])]),a._v(" "),r("li",[r("p",[a._v("运行时常量池"),r("br"),a._v("\n存储计算机常量和被 "),r("code",[a._v("final")]),a._v(" 修饰的常量副本\n逻辑包含字符串常量池存放在方法区, 此时 hotspot 虚拟机对方法区的实现为永久代。"),r("Badge",{attrs:{type:"error",text:"Java 7.0-"}}),r("br"),a._v("\n运行时常量池剩下的东西还在方法区（永久代）中，但字符串常量池被从方法区拿到了堆中。"),r("Badge",{attrs:{type:"warning",text:"Java 7.0"}}),r("br"),a._v("\n移除了永久代而用元空间取代, 这时候字符串常量池还在堆, 运行时常量池还在方法区, 只不过方法区的实现从永久代变成了元空间。"),r("Badge",{attrs:{text:"Java 8.0+"}})],1)])])]),a._v(" "),r("li",[r("p",[a._v("直接内存"),r("br"),a._v("\n直接内存并不是虚拟机运行时数据区的一部分，也不是虚拟机规范中定义的内存区域，但是这部分内存也被频繁地使用。"),r("br"),a._v("\n可能导致 OutOfMemoryError."),r("br"),a._v("\nJDK1.4 中新加入的 NIO(New Input/Output) 类，引入了一种基于通道（Channel）与缓存区（Buffer）的 I/O 方式，它可以直接使用 Native 函数库直接分配堆外内存，然后通过一个存储在 Java 堆中的 DirectByteBuffer 对象作为这块内存的引用进行操作。这样就能在一些场景中显著提高性能，因为避免了在 Java 堆和 Native 堆之间来回复制数据。"),r("Badge",{attrs:{text:"Java 1.4+"}})],1)])]),a._v(" "),r("p",[a._v("其中堆内存、方法区与直接内存是所有线程共享的，而栈内存（虚拟机栈）、本地方法栈与程序计数器是每个线程独有的。")]),a._v(" "),r("p",[a._v("在Java 8 后，虚拟机对内存分配有了更新"),r("Badge",{attrs:{text:"Java 8.0+"}}),a._v("："),r("br"),a._v(" "),r("img",{attrs:{src:"/img/%E5%86%85%E5%AD%98%E6%A8%A1%E5%9E%8B1_8.png",alt:"内存模型 1.8"}}),a._v("\n在 Java 8 之后，通过合并 HotSpot 与 JRockit 虚拟机，永久代被元空间代替，而元空间使用直接内存。"),r("br"),a._v("\n使用命令来调节元空间大小：")],1),a._v(" "),r("div",{staticClass:"language-java extra-class"},[r("pre",{pre:!0,attrs:{class:"language-java"}},[r("code",[r("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("XX"),r("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),r("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("MetaspaceSize")]),r("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),r("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("N")]),a._v(" "),r("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//设置 Metaspace 的初始（和最小大小）")]),a._v("\n"),r("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("XX"),r("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),r("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("MaxMetaspaceSize")]),r("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),r("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("N")]),a._v(" "),r("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//设置 Metaspace 的最大大小")]),a._v("\n")])])]),r("p",[a._v("MetaspaceSize 默认值为 unlimited，意味着它只受系统内存的限制；MetaspaceSize 调整标志定义元空间的初始大小，如果未指定此标志，则 Metaspace 将根据运行时的应用程序需求动态地重新调整大小。"),r("br"),a._v("\n元空间里面存放的是类的元数据，通过使用元空间而不是永久代来增加可加载类的数量。（仅受机器实际可用空间限制）")]),a._v(" "),r("h2",{attrs:{id:"垃圾分代回收机制"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#垃圾分代回收机制"}},[a._v("#")]),a._v(" 垃圾分代回收机制")]),a._v(" "),r("p",[a._v("对象在堆内存中存储。当对象在使用完成后，会在某个不定的时刻被垃圾回收器 "),r("code",[a._v("GC")]),a._v(" 解析。"),r("br"),a._v("\n值得注意的是："),r("strong",[a._v("垃圾回收过程无法手动控制")]),a._v("。"),r("br"),a._v("\n基本逻辑：")]),a._v(" "),r("ul",[r("li",[a._v("堆内存分为"),r("strong",[a._v("新生代区")]),a._v("，"),r("strong",[a._v("老年代区")]),a._v("和"),r("strong",[a._v("永久代")]),a._v("。")]),a._v(" "),r("li",[a._v("新生代区分为"),r("strong",[a._v("伊甸园区")]),a._v("和两个"),r("strong",[a._v("幸存区")]),a._v("。")]),a._v(" "),r("li",[a._v("幸存区包括两个部分，S0(From) 和 S1(To).")]),a._v(" "),r("li",[a._v("一个新创建的对象会被生成在伊甸园区，若在伊甸园区的对象经过一次回收过程仍然存活，则被移动到幸存区。")]),a._v(" "),r("li",[a._v("幸存区的回收扫描频率略低于伊甸园区。在幸存区经过多次扫描，若对象仍然存活，则被移动到老年代区。")]),a._v(" "),r("li",[a._v("老年代区的回收扫描频率会远远低于新生代区。")]),a._v(" "),r("li",[a._v("当老年代区中的对象被回收时，会导致程序卡顿甚至崩溃。")]),a._v(" "),r("li",[a._v("发生在新生代区的垃圾回收称为"),r("strong",[a._v("初代回收 (Minor GC)")]),a._v(".")]),a._v(" "),r("li",[a._v("发生在老年代区的垃圾回收称为"),r("strong",[a._v("完全回收 (Full GC)")]),a._v(".")])]),a._v(" "),r("h3",{attrs:{id:"具体逻辑"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#具体逻辑"}},[a._v("#")]),a._v(" 具体逻辑")]),a._v(" "),r("p",[r("strong",[a._v("一般情况")])]),a._v(" "),r("ul",[r("li",[a._v("对象在伊甸园区分配")]),a._v(" "),r("li",[a._v("伊甸园区垃圾回收后仍然存活的对象进入 S0 或 S1，其年龄变为 1")]),a._v(" "),r("li",[a._v("每轮垃圾回收后仍然存活的对象年龄加 1")]),a._v(" "),r("li",[a._v("当年龄大于 15 （默认情况）的对象转移到老年代"),r("br"),a._v(" "),r("code",[a._v("-XX:MaxTenuringThreshold")]),a._v(" 设定阈值年龄大小；"),r("br"),a._v(" "),r("code",[a._v("-XX:+PrintTenuringDistribution")]),a._v(" 打印当前次垃圾回收后阈值年龄。"),r("br"),a._v("\n动态年龄阈值计算机制："),r("br"),a._v("\n虚拟机遍历所有对象统计它们的年龄，按小到大对年龄出现频率进行累积计算。当某年龄开始累积对象总大小超过幸存区容量一半时，取该年龄和 MaxTenuringThreshold 中更小的作为新的阈值年龄。")]),a._v(" "),r("li",[a._v("若某次垃圾回收后伊甸园区和 S0 区被清空，则 S1 与 S0 交换角色。")]),a._v(" "),r("li",[a._v("若某次垃圾回收后 S0 区空间不够但某些对象还没有达到进入老年代条件，无法存下的部分提前进入老年代。（分配担保机制）")])]),a._v(" "),r("h2",{attrs:{id:"类加载机制"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#类加载机制"}},[a._v("#")]),a._v(" 类加载机制")]),a._v(" "),r("h2",{attrs:{id:"对象操作机制"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#对象操作机制"}},[a._v("#")]),a._v(" 对象操作机制")]),a._v(" "),r("h3",{attrs:{id:"对象创建"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#对象创建"}},[a._v("#")]),a._v(" 对象创建")]),a._v(" "),r("p",[a._v("当 JVM 遇到需要通过 "),r("code",[a._v("new")]),a._v(" 创建对象时：")]),a._v(" "),r("ol",[r("li",[a._v("类加载检查"),r("br"),a._v("\nJVM 先检查该指令的参数能否在常量池中定位到被加载、解析、初始化过。若没有，则执行相应的类加载过程。")]),a._v(" "),r("li",[a._v("分配内存"),r("br"),a._v("\n类检查后即可确定所需要的内存大小，JVM 按照堆内存是否规整（由 GC 使用的算法决定）选择一种内存分配方式进行内存分配：\n"),r("ul",[r("li",[a._v("指针碰撞"),r("br"),a._v("\n适合堆内存规整的情况。"),r("br"),a._v("\n将使用过的内存放在一边，未使用过的放在另一边，两个区域通过分界指针隔开。使用时指针向未使用过区域移动需要的内存大小。"),r("br"),a._v("\n对应 GC：Serial, ParNew")]),a._v(" "),r("li",[a._v("空闲列表"),r("br"),a._v("\n适合堆内存不规整的情况。"),r("br"),a._v("\nJVM 维护一个空闲内存列表。当需要空间时寻找一块可以存放的内存位置分给对象，之后更新列表。"),r("br"),a._v("\n对应 GC: CMS")])]),a._v(" "),r("div",{staticClass:"custom-block tip"},[r("p",{staticClass:"custom-block-title"},[a._v("并发内存分配下的线程安全")]),a._v(" "),r("p",[a._v("JVM 通过两个机制来保证线程安全：")]),a._v(" "),r("ul",[r("li",[a._v("CAS + 失败重试"),r("br"),a._v("\n每次操作不加锁，假设没有冲突直接完成某操作。当因为冲突而失败时就进行重试，直到成功为止。")]),a._v(" "),r("li",[a._v("TLAB"),r("br"),a._v("\n为每个线程预先在伊甸园区划分一块 TLAB 内存。当 JVM 在给线程中对象分配内存时首先分配在 TLAB 内存中，若对象所需内存大于 TLAB 剩余内存或 TLAB 内存已耗尽时，再采用 CAS + 失败重试机制。")])])])]),a._v(" "),r("li",[a._v("初始化值"),r("br"),a._v("\nJVM 对分配的内存初始化为默认值。（保证对象的实例属性在 Java 代码中可以不赋予初始值而直接使用）。")]),a._v(" "),r("li",[a._v("设置对象头"),r("br"),a._v("\nJVM 继续对对象进行设置，将相关的重要信息（对象所对应的具体类、类的元数据信息路径、哈希码、GC 分代年龄等）存放在对象头中。根据 JVM 运行状态不同 ，对象头设置方式可能会因为是否启用偏向锁等因素而产生不同的设置方式。")]),a._v(" "),r("li",[a._v("执行 "),r("code",[a._v("init")]),a._v(" 方法"),r("br"),a._v("\n通过执行  "),r("code",[a._v("init")]),a._v(" 方法使得具体对象初始化为程序员意愿状态。")])])])}),[],!1,null,null,null);v.default=_.exports}}]);