(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{476:function(v,_,r){"use strict";r.r(_);var t=r(20),a=Object(t.a)({},(function(){var v=this,_=v.$createElement,r=v._self._c||_;return r("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[r("h1",{attrs:{id:"java-虚拟机"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#java-虚拟机"}},[v._v("#")]),v._v(" Java 虚拟机")]),v._v(" "),r("h2",{attrs:{id:"内存管理概论"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#内存管理概论"}},[v._v("#")]),v._v(" 内存管理概论")]),v._v(" "),r("h3",{attrs:{id:"内存分区"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#内存分区"}},[v._v("#")]),v._v(" 内存分区")]),v._v(" "),r("p",[r("img",{attrs:{src:"/img/%E5%86%85%E5%AD%98%E7%AE%A1%E7%90%86.jpg",alt:"内存分区"}})]),v._v(" "),r("ul",[r("li",[r("p",[v._v("寄存器"),r("br"),v._v("\n负责程序计数和任务调度")])]),v._v(" "),r("li",[r("p",[v._v("本地方法栈"),r("br"),v._v("\n存储本地方法")])]),v._v(" "),r("li",[r("p",[v._v("栈内存"),r("br"),v._v("\n执行代码块，存储局部变量")])]),v._v(" "),r("li",[r("p",[v._v("堆内存"),r("br"),v._v("\n存储对象（对象生命周期结束后被"),r("code",[v._v("GC")]),v._v("回收）")])]),v._v(" "),r("li",[r("p",[v._v("方法区"),r("br"),v._v("\n存储类的信息，一旦存入不再移除"),r("br"),v._v("\n方法区溢出会报"),r("code",[v._v("OutOfMemoryError")]),v._v("错误"),r("br"),v._v("\n其中：")]),v._v(" "),r("ul",[r("li",[r("p",[v._v("静态区"),r("br"),v._v("\n存储静态属性和静态方法"),r("br"),v._v("\n静态属性存储在此区后自动赋默认值")])]),v._v(" "),r("li",[r("p",[v._v("静态常量池"),r("br"),v._v("\n存储类成员属性和成员方法信息")])]),v._v(" "),r("li",[r("p",[v._v("运行时常量池"),r("br"),v._v("\n存储计算机常量和被"),r("code",[v._v("final")]),v._v("修饰的常量副本")])])])])]),v._v(" "),r("h3",{attrs:{id:"_1-5-2-垃圾分代回收机制"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_1-5-2-垃圾分代回收机制"}},[v._v("#")]),v._v(" 1.5.2 垃圾分代回收机制")]),v._v(" "),r("p",[v._v("对象在堆内存中存储。当对象在使用完成后，会在某个不定的时刻被垃圾回收器"),r("code",[v._v("GC")]),v._v("解析。"),r("br"),v._v("\n值得注意的是："),r("strong",[v._v("垃圾回收过程无法手动控制")]),v._v("。")]),v._v(" "),r("ul",[r("li",[r("p",[v._v("堆内存分为"),r("strong",[v._v("新生代区")]),v._v("和"),r("strong",[v._v("老年代区")]),v._v("。")])]),v._v(" "),r("li",[r("p",[v._v("新生代区分为"),r("strong",[v._v("伊甸园区")]),v._v("和"),r("strong",[v._v("幸存区")]),v._v("。")])]),v._v(" "),r("li",[r("p",[v._v("一个新创建的对象会被生成在伊甸园区，若在伊甸园区的对象经过一次回收过程仍然存活，则被移动到幸存区。")])]),v._v(" "),r("li",[r("p",[v._v("幸存区的回收扫描频率略低于伊甸园区。在幸存区经过多次扫描，若对象仍然存活，则被移动到老年代区。")])]),v._v(" "),r("li",[r("p",[v._v("老年代区的回收扫描频率会远远低于新生代区。")])]),v._v(" "),r("li",[r("p",[v._v("当老年代区中的对象被回收时，会导致程序卡顿甚至崩溃。")])]),v._v(" "),r("li",[r("p",[v._v("发生在新生代区的垃圾回收称为"),r("strong",[v._v("初代回收 (Minor GC)")]),v._v(".")])]),v._v(" "),r("li",[r("p",[v._v("发生在老年代区的垃圾回收称为"),r("strong",[v._v("完全回收 (Full GC)")]),v._v(".")])])])])}),[],!1,null,null,null);_.default=a.exports}}]);