(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{501:function(_,v,t){"use strict";t.r(v);var e=t(18),a=Object(e.a)({},(function(){var _=this,v=_.$createElement,t=_._self._c||v;return t("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[t("h1",{attrs:{id:"api-输入-输出类库-package-java-io"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#api-输入-输出类库-package-java-io"}},[_._v("#")]),_._v(" API-输入/输出类库 (Package "),t("code",[_._v("java.io")]),_._v(")")]),_._v(" "),t("h2",{attrs:{id:"_6-1-file类"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_6-1-file类"}},[_._v("#")]),_._v(" 6.1 "),t("code",[_._v("File")]),_._v("类")]),_._v(" "),t("h3",{attrs:{id:"_6-1-1-基本信息"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_6-1-1-基本信息"}},[_._v("#")]),_._v(" 6.1.1 基本信息")]),_._v(" "),t("p",[t("strong",[_._v("Package")]),_._v(" java.io"),t("br"),_._v(" "),t("code",[_._v("public class File")])]),_._v(" "),t("ul",[t("li",[_._v("表示文件或者目录的类。")]),_._v(" "),t("li",[_._v("构造函数"),t("code",[_._v("File(String pathname)")]),_._v("可以用来构造一个文件。\n"),t("ul",[t("li",[_._v("目标文件不存在时不会创建")]),_._v(" "),t("li",[_._v("创建"),t("code",[_._v("File")]),_._v("对象时，不会在计算机中检查是否存在。只是将传入的路径标识为"),t("code",[_._v("File")]),_._v("对象。")])]),_._v(" "),t("div",{staticClass:"custom-block warning"},[t("p",{staticClass:"custom-block-title"},[_._v("注意")]),_._v(" "),t("ul",[t("li",[t("p",[_._v("Windows 下，使用"),t("code",[_._v("\\\\")]),_._v("分割目录；而 Linux 以"),t("code",[_._v("/")]),_._v("分割"),t("br"),_._v("\n使用"),t("code",[_._v("File.separator()")]),_._v("来获取目录分隔符")])]),_._v(" "),t("li",[t("p",[_._v("Windows 下，使用"),t("code",[_._v(";")]),_._v("分割不同的路径；而 Linux 以"),t("code",[_._v(":")]),_._v("分割"),t("br"),_._v("\n使用"),t("code",[_._v("File.pathSeparator()")]),_._v("来获取路径分隔符")])])])])])]),_._v(" "),t("h3",{attrs:{id:"_6-1-2-重要方法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_6-1-2-重要方法"}},[_._v("#")]),_._v(" 6.1.2 重要方法")]),_._v(" "),t("ul",[t("li",[t("p",[t("code",[_._v("createNewFile()")]),t("br"),_._v("\n创建文件。当文件不存在时，会创建新文件。"),t("br"),_._v("\n要求文件存放路径真实存在。只能用于创建文件，但不能创建目录。")])]),_._v(" "),t("li",[t("p",[t("code",[_._v("mkdir()")]),t("br"),_._v("\n只能用于创建目录。"),t("br"),_._v("\n只能创建一层目录。")])]),_._v(" "),t("li",[t("p",[t("code",[_._v("mkdirs()")]),t("br"),_._v("\n创建多层目录。")])]),_._v(" "),t("li",[t("p",[t("code",[_._v("delete()")]),t("br"),_._v("\n删除文件/目录。从计算机中真正移除。"),t("br"),_._v("\n若删除目录为目录，且该目录下有子目录或者文件时，则无法删除。")])]),_._v(" "),t("li",[t("p",[t("code",[_._v("listFiles()")]),t("br"),_._v("\n获取文件、获取目录的子文件、子目录。"),t("br"),_._v("\n以文件类对象数组形式返回。")])]),_._v(" "),t("li",[t("p",[t("code",[_._v("isDirectory()")]),t("br"),_._v("\n判断是否为目录。")])]),_._v(" "),t("li",[t("p",[t("code",[_._v("isFile()")]),t("br"),_._v("\n判断是否为文件。")])]),_._v(" "),t("li",[t("p",[t("code",[_._v("getName()")]),t("br"),_._v("\n获取文件名。")])]),_._v(" "),t("li",[t("p",[t("code",[_._v("canWrite()")]),t("br"),_._v("\n判断文件是否可写。")])])]),_._v(" "),t("h3",{attrs:{id:"_6-1-3-路径"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_6-1-3-路径"}},[_._v("#")]),_._v(" 6.1.3 路径")]),_._v(" "),t("ul",[t("li",[t("p",[_._v("绝对路径")]),_._v(" "),t("ul",[t("li",[_._v("以盘符或者"),t("code",[_._v("/")]),_._v("开头的路径")]),_._v(" "),t("li",[_._v("使用"),t("code",[_._v("getAbsolutePath()")]),_._v("获取")])])]),_._v(" "),t("li",[t("p",[_._v("相对路径")]),_._v(" "),t("ul",[t("li",[_._v("不以盘符或者"),t("code",[_._v("/")]),_._v("开头的路径")]),_._v(" "),t("li",[t("code",[_._v("..")]),_._v("表示上一层目录")]),_._v(" "),t("li",[_._v("使用"),t("code",[_._v("getPath()")]),_._v("获取")])])])]),_._v(" "),t("p",[t("strong",[_._v("路径相关的其他重要方法")])]),_._v(" "),t("ul",[t("li",[t("p",[t("code",[_._v("getParent()")]),t("br"),_._v("\n获取父目录。")])]),_._v(" "),t("li",[t("p",[t("code",[_._v("lastModified()")]),t("br"),_._v("\n获取最后修改时间，返回值为自 1970/01/01 00:00:00 至最后修改时间的毫秒值。")])]),_._v(" "),t("li",[t("p",[t("code",[_._v("setReadOnly()")]),t("br"),_._v("\n设置文件只读。")])]),_._v(" "),t("li",[t("p",[t("code",[_._v("renameTo()")]),t("br"),_._v("\n重命名文件。"),t("br"),_._v("\n若文件路径没有发生改变，则重命名；若改变则执行剪切。")])])]),_._v(" "),t("h2",{attrs:{id:"_6-2-i-o-stream"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_6-2-i-o-stream"}},[_._v("#")]),_._v(" 6.2 I/O Stream")]),_._v(" "),t("p",[t("code",[_._v("java.io")]),_._v("是一套用于传输数据的 API。根据数据传输方向、数据传输形式可以分为四类，以及他们的关系：")]),_._v(" "),t("ul",[t("li",[_._v("根据数据传输方向：输入流、输出流"),t("br"),_._v("\n输入流：当数据从外部流向程序。例如：读取文件，将数据文件读取到程序中。"),t("br"),_._v("\n输出流：数据从程序流向外部。例如：向文件写数据，数据从程序流向文件。")]),_._v(" "),t("li",[_._v("根据数据的传输形式：字节流、字符流")])]),_._v(" "),t("table",[t("thead",[t("tr",[t("th",{staticStyle:{"text-align":"center"}}),_._v(" "),t("th",{staticStyle:{"text-align":"center"}},[_._v("输入流")]),_._v(" "),t("th",{staticStyle:{"text-align":"center"}},[_._v("输出流")])])]),_._v(" "),t("tbody",[t("tr",[t("td",{staticStyle:{"text-align":"center"}},[t("strong",[_._v("字节流")])]),_._v(" "),t("td",{staticStyle:{"text-align":"center"}},[t("code",[_._v("InputStream")])]),_._v(" "),t("td",{staticStyle:{"text-align":"center"}},[t("code",[_._v("OutputStream")])])]),_._v(" "),t("tr",[t("td",{staticStyle:{"text-align":"center"}},[t("strong",[_._v("字符流")])]),_._v(" "),t("td",{staticStyle:{"text-align":"center"}},[t("code",[_._v("Reader")])]),_._v(" "),t("td",{staticStyle:{"text-align":"center"}},[t("code",[_._v("Writer")])])])])]),_._v(" "),t("p",[_._v("*这四个基本流都是抽象类。")]),_._v(" "),t("ul",[t("li",[_._v("数据的一般来源和目的地有：硬盘、网络、输入设备和内存")])]),_._v(" "),t("h3",{attrs:{id:"_6-2-1-缓冲流"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_6-2-1-缓冲流"}},[_._v("#")]),_._v(" 6.2.1 缓冲流")]),_._v(" "),t("ul",[t("li",[t("p",[t("code",[_._v("BufferedReader")]),_._v("类"),t("br"),_._v("\n需要字符输入流作为参数，缓冲流仅提供缓冲区")])]),_._v(" "),t("li",[t("p",[t("code",[_._v("BufferedWriter")]),_._v("类"),t("br"),_._v("\n使用"),t("code",[_._v("newLine()")]),_._v("写入换行符")])])]),_._v(" "),t("h3",{attrs:{id:"_6-2-2-字节流"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_6-2-2-字节流"}},[_._v("#")]),_._v(" 6.2.2 字节流")]),_._v(" "),t("p",[_._v("以字节形式读取数据，没有缓冲区。")]),_._v(" "),t("h3",{attrs:{id:"_6-2-3-转换流"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_6-2-3-转换流"}},[_._v("#")]),_._v(" 6.2.3 转换流")]),_._v(" "),t("p",[_._v("表层以字符形式，底层以字节形式。")]),_._v(" "),t("ul",[t("li",[t("p",[t("code",[_._v("InputStreamReader")]),_._v("类"),t("br"),_._v("\n转换输入流，将字节流转换为字符流")])]),_._v(" "),t("li",[t("p",[t("code",[_._v("OutputStreamWriter")]),_._v("类"),t("br"),_._v("\n转换输出流，将字节流转化为字符流"),t("br"),_._v("\n例如：将数据写出 txt 文件：使用输出流，字符流，且和文件有关。故使用"),t("code",[_._v("FileWrite")]),_._v("(它是"),t("code",[_._v("OutputStreamWriter")]),_._v("的子类)")]),_._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[_._v("关于 FileWriter")]),_._v(" "),t("ul",[t("li",[_._v("使用构造函数"),t("code",[_._v("FileWriter(String path)")]),_._v("来创建新文件。")]),_._v(" "),t("li",[_._v("写出数据时并不直接写到文件中，而是写入缓冲区。"),t("br"),_._v("\n缓冲区未满但代码已经运行结束 → "),t("code",[_._v("flush()")]),_._v("冲出。")]),_._v(" "),t("li",[_._v("使用"),t("code",[_._v("close()")]),_._v("关闭流对象。"),t("br"),_._v("\n缓冲区未冲刷关闭流对象前，自动执行"),t("code",[_._v("flush()")]),_._v("。"),t("br"),_._v("\n关闭流对象后，对象没有被释放 → 赋值为"),t("code",[_._v("null")]),_._v("，标识为可回收")])])])])]),_._v(" "),t("h3",{attrs:{id:"_6-2-4-系统-标准-流"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_6-2-4-系统-标准-流"}},[_._v("#")]),_._v(" 6.2.4 系统（标准）流")]),_._v(" "),t("ul",[t("li",[t("code",[_._v("System.in")]),_._v(" 标准输入流")]),_._v(" "),t("li",[t("code",[_._v("System.out")]),_._v(" 标准输出流")]),_._v(" "),t("li",[t("code",[_._v("System.err")]),_._v(" 标准错误流")])]),_._v(" "),t("h3",{attrs:{id:"_6-2-5-打印流"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_6-2-5-打印流"}},[_._v("#")]),_._v(" 6.2.5 打印流")]),_._v(" "),t("ul",[t("li",[t("p",[t("code",[_._v("PrintWriter")]),_._v("类"),t("br"),_._v("\n字符流")])]),_._v(" "),t("li",[t("p",[t("code",[_._v("PrintStream")]),_._v("类"),t("br"),_._v("\n字节流")])])]),_._v(" "),t("h3",{attrs:{id:"_6-2-6-合并流"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_6-2-6-合并流"}},[_._v("#")]),_._v(" 6.2.6 合并流")]),_._v(" "),t("p",[t("code",[_._v("SequenceInputStream")]),_._v("类")]),_._v(" "),t("ul",[t("li",[_._v("字节流，可以合并多个字节输入流")]),_._v(" "),t("li",[_._v("将多个字节输入流进行合并时，需要将其放到"),t("code",[_._v("Vector")]),_._v("集合，利用"),t("code",[_._v("Vector")]),_._v("集合产生一个"),t("code",[_._v("Enumeration")]),_._v("对象")]),_._v(" "),t("li",[_._v("利用"),t("code",[_._v("Enumeration")]),_._v("对象构造合并流对象")]),_._v(" "),t("li",[_._v("只有输入流，没有输出流")])]),_._v(" "),t("h3",{attrs:{id:"_6-2-7-序列化-反序列化"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_6-2-7-序列化-反序列化"}},[_._v("#")]),_._v(" 6.2.7 序列化/反序列化")]),_._v(" "),t("ul",[t("li",[_._v("序列化：将对象完成存储（持久化）。"),t("code",[_._v("ObjectOutputStream")])]),_._v(" "),t("li",[_._v("反序列化：将序列化的对象还原。"),t("code",[_._v("ObjectInputStream")])])]),_._v(" "),t("div",{staticClass:"custom-block warning"},[t("p",{staticClass:"custom-block-title"},[_._v("注意")]),_._v(" "),t("ul",[t("li",[_._v("实现对象序列化，需实现"),t("code",[_._v("Serializable")]),_._v("接口"),t("br"),_._v("\n接口中没有任何方法和属性，仅用来标识类产生的对象可以被序列化")]),_._v(" "),t("li",[_._v("被"),t("code",[_._v("static")]),_._v("/"),t("code",[_._v("transient")]),_._v("修饰的属性不会被序列化")]),_._v(" "),t("li",[_._v("每个类在序列化时都有版本号\n"),t("ul",[t("li",[_._v("没有手动指定，JVM 在编译时会自动计算版本号")]),_._v(" "),t("li",[_._v("手动指定则不再自动计算")]),_._v(" "),t("li",[_._v("对象在反序列化时会比较当前类中版本号和对象版本号是否一致")])])]),_._v(" "),t("li",[_._v("集合和数组不能被序列化")])])]),_._v(" "),t("div",{staticClass:"custom-block danger"},[t("p",{staticClass:"custom-block-title"},[_._v("特别的")]),_._v(" "),t("p",[_._v("Java 的序列化不是常用序列化手段，它存在以下问题：序列化产生的数据量大、速度慢、不能跨语言。")])]),_._v(" "),t("h3",{attrs:{id:"_6-2-8-autocloseable"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_6-2-8-autocloseable"}},[_._v("#")]),_._v(" 6.2.8 AutoCloseable")]),_._v(" "),t("ul",[t("li",[_._v("当流实现了这个接口可以被自动关闭。")]),_._v(" "),t("li",[_._v("需要写在"),t("code",[_._v("try(// Codes goes here…)")])]),_._v(" "),t("li",[_._v("当执行完毕会自动调用"),t("code",[_._v("close()")])])]),_._v(" "),t("h3",{attrs:{id:"_6-2-9-异常处理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_6-2-9-异常处理"}},[_._v("#")]),_._v(" 6.2.9 异常处理")]),_._v(" "),t("ul",[t("li",[_._v("将流对象放在"),t("code",[_._v("try")]),_._v("外定义并赋值"),t("code",[_._v("null")]),_._v("， 在"),t("code",[_._v("try")]),_._v("中初始化")]),_._v(" "),t("li",[_._v("在关闭之前判断对象是否初始化成功")]),_._v(" "),t("li",[_._v("将流强制置空，防止关流失败无法释放文件\n在写完数据后手动添加"),t("code",[_._v("flush")]),_._v("，防止关流失败数据丢失")])])])}),[],!1,null,null,null);v.default=a.exports}}]);