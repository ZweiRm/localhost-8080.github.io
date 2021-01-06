(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{421:function(v,_,t){"use strict";t.r(_);var e=t(13),a=Object(e.a)({},(function(){var v=this,_=v.$createElement,t=v._self._c||_;return t("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[t("h1",{attrs:{id:"api-输入-输出类库-package-java-io"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#api-输入-输出类库-package-java-io"}},[v._v("#")]),v._v(" API-输入/输出类库 (Package "),t("code",[v._v("java.io")]),v._v(")")]),v._v(" "),t("h2",{attrs:{id:"file类"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#file类"}},[v._v("#")]),v._v(" "),t("code",[v._v("File")]),v._v("类")]),v._v(" "),t("h3",{attrs:{id:"基本信息"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#基本信息"}},[v._v("#")]),v._v(" 基本信息")]),v._v(" "),t("p",[t("strong",[v._v("Package")]),v._v(" java.io"),t("br"),v._v(" "),t("code",[v._v("public class File")])]),v._v(" "),t("ul",[t("li",[v._v("表示文件或者目录的类。")]),v._v(" "),t("li",[v._v("构造函数"),t("code",[v._v("File(String pathname)")]),v._v("可以用来构造一个文件。\n"),t("ul",[t("li",[v._v("目标文件不存在时不会创建")]),v._v(" "),t("li",[v._v("创建"),t("code",[v._v("File")]),v._v("对象时，不会在计算机中检查是否存在。只是将传入的路径标识为"),t("code",[v._v("File")]),v._v("对象。")])]),v._v(" "),t("div",{staticClass:"custom-block warning"},[t("p",{staticClass:"custom-block-title"},[v._v("注意")]),v._v(" "),t("ul",[t("li",[t("p",[v._v("Windows 下，使用"),t("code",[v._v("\\\\")]),v._v("分割目录；而 Linux 以"),t("code",[v._v("/")]),v._v("分割"),t("br"),v._v("\n使用"),t("code",[v._v("File.separator()")]),v._v("来获取目录分隔符")])]),v._v(" "),t("li",[t("p",[v._v("Windows 下，使用"),t("code",[v._v(";")]),v._v("分割不同的路径；而 Linux 以"),t("code",[v._v(":")]),v._v("分割"),t("br"),v._v("\n使用"),t("code",[v._v("File.pathSeparator()")]),v._v("来获取路径分隔符")])])])])])]),v._v(" "),t("h3",{attrs:{id:"重要方法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#重要方法"}},[v._v("#")]),v._v(" 重要方法")]),v._v(" "),t("ul",[t("li",[t("p",[t("code",[v._v("createNewFile()")]),t("br"),v._v("\n创建文件。当文件不存在时，会创建新文件。"),t("br"),v._v("\n要求文件存放路径真实存在。只能用于创建文件，但不能创建目录。")])]),v._v(" "),t("li",[t("p",[t("code",[v._v("mkdir()")]),t("br"),v._v("\n只能用于创建目录。"),t("br"),v._v("\n只能创建一层目录。")])]),v._v(" "),t("li",[t("p",[t("code",[v._v("mkdirs()")]),t("br"),v._v("\n创建多层目录。")])]),v._v(" "),t("li",[t("p",[t("code",[v._v("delete()")]),t("br"),v._v("\n删除文件/目录。从计算机中真正移除。"),t("br"),v._v("\n若删除目录为目录，且该目录下有子目录或者文件时，则无法删除。")])]),v._v(" "),t("li",[t("p",[t("code",[v._v("listFiles()")]),t("br"),v._v("\n获取文件、获取目录的子文件、子目录。"),t("br"),v._v("\n以文件类对象数组形式返回。")])]),v._v(" "),t("li",[t("p",[t("code",[v._v("isDirectory()")]),t("br"),v._v("\n判断是否为目录。")])]),v._v(" "),t("li",[t("p",[t("code",[v._v("isFile()")]),t("br"),v._v("\n判断是否为文件。")])]),v._v(" "),t("li",[t("p",[t("code",[v._v("getName()")]),t("br"),v._v("\n获取文件名。")])]),v._v(" "),t("li",[t("p",[t("code",[v._v("canWrite()")]),t("br"),v._v("\n判断文件是否可写。")])])]),v._v(" "),t("h3",{attrs:{id:"路径"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#路径"}},[v._v("#")]),v._v(" 路径")]),v._v(" "),t("ul",[t("li",[t("p",[v._v("绝对路径")]),v._v(" "),t("ul",[t("li",[v._v("以盘符或者"),t("code",[v._v("/")]),v._v("开头的路径")]),v._v(" "),t("li",[v._v("使用"),t("code",[v._v("getAbsolutePath()")]),v._v("获取")])])]),v._v(" "),t("li",[t("p",[v._v("相对路径")]),v._v(" "),t("ul",[t("li",[v._v("不以盘符或者"),t("code",[v._v("/")]),v._v("开头的路径")]),v._v(" "),t("li",[t("code",[v._v("..")]),v._v("表示上一层目录")]),v._v(" "),t("li",[v._v("使用"),t("code",[v._v("getPath()")]),v._v("获取")])])])]),v._v(" "),t("p",[t("strong",[v._v("路径相关的其他重要方法")])]),v._v(" "),t("ul",[t("li",[t("p",[t("code",[v._v("getParent()")]),t("br"),v._v("\n获取父目录。")])]),v._v(" "),t("li",[t("p",[t("code",[v._v("lastModified()")]),t("br"),v._v("\n获取最后修改时间，返回值为自 1970/01/01 00:00:00 至最后修改时间的毫秒值。")])]),v._v(" "),t("li",[t("p",[t("code",[v._v("setReadOnly()")]),t("br"),v._v("\n设置文件只读。")])]),v._v(" "),t("li",[t("p",[t("code",[v._v("renameTo()")]),t("br"),v._v("\n重命名文件。"),t("br"),v._v("\n若文件路径没有发生改变，则重命名；若改变则执行剪切。")])])]),v._v(" "),t("h2",{attrs:{id:"i-o-stream"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#i-o-stream"}},[v._v("#")]),v._v(" I/O Stream")]),v._v(" "),t("p",[t("code",[v._v("java.io")]),v._v("是一套用于传输数据的 API。根据数据传输方向、数据传输形式可以分为四类，以及他们的关系：")]),v._v(" "),t("ul",[t("li",[v._v("根据数据传输方向：输入流、输出流"),t("br"),v._v("\n输入流：当数据从外部流向程序。例如：读取文件，将数据文件读取到程序中。"),t("br"),v._v("\n输出流：数据从程序流向外部。例如：向文件写数据，数据从程序流向文件。")]),v._v(" "),t("li",[v._v("根据数据的传输形式：字节流、字符流")])]),v._v(" "),t("table",[t("thead",[t("tr",[t("th",{staticStyle:{"text-align":"center"}}),v._v(" "),t("th",{staticStyle:{"text-align":"center"}},[v._v("输入流")]),v._v(" "),t("th",{staticStyle:{"text-align":"center"}},[v._v("输出流")])])]),v._v(" "),t("tbody",[t("tr",[t("td",{staticStyle:{"text-align":"center"}},[t("strong",[v._v("字节流")])]),v._v(" "),t("td",{staticStyle:{"text-align":"center"}},[t("code",[v._v("InputStream")])]),v._v(" "),t("td",{staticStyle:{"text-align":"center"}},[t("code",[v._v("OutputStream")])])]),v._v(" "),t("tr",[t("td",{staticStyle:{"text-align":"center"}},[t("strong",[v._v("字符流")])]),v._v(" "),t("td",{staticStyle:{"text-align":"center"}},[t("code",[v._v("Reader")])]),v._v(" "),t("td",{staticStyle:{"text-align":"center"}},[t("code",[v._v("Writer")])])])])]),v._v(" "),t("p",[v._v("*这四个基本流都是抽象类。")]),v._v(" "),t("ul",[t("li",[v._v("数据的一般来源和目的地有：硬盘、网络、输入设备和内存")])]),v._v(" "),t("h3",{attrs:{id:"缓冲流"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#缓冲流"}},[v._v("#")]),v._v(" 缓冲流")]),v._v(" "),t("ul",[t("li",[t("p",[t("code",[v._v("BufferedReader")]),v._v("类"),t("br"),v._v("\n需要字符输入流作为参数，缓冲流仅提供缓冲区")])]),v._v(" "),t("li",[t("p",[t("code",[v._v("BufferedWriter")]),v._v("类"),t("br"),v._v("\n使用"),t("code",[v._v("newLine()")]),v._v("写入换行符")])])]),v._v(" "),t("h3",{attrs:{id:"字节流"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#字节流"}},[v._v("#")]),v._v(" 字节流")]),v._v(" "),t("p",[v._v("以字节形式读取数据，没有缓冲区。")]),v._v(" "),t("h3",{attrs:{id:"转换流"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#转换流"}},[v._v("#")]),v._v(" 转换流")]),v._v(" "),t("p",[v._v("表层以字符形式，底层以字节形式。")]),v._v(" "),t("ul",[t("li",[t("p",[t("code",[v._v("InputStreamReader")]),v._v("类"),t("br"),v._v("\n转换输入流，将字节流转换为字符流")])]),v._v(" "),t("li",[t("p",[t("code",[v._v("OutputStreamWriter")]),v._v("类"),t("br"),v._v("\n转换输出流，将字节流转化为字符流"),t("br"),v._v("\n例如：将数据写出 txt 文件：使用输出流，字符流，且和文件有关。故使用"),t("code",[v._v("FileWrite")]),v._v("(它是"),t("code",[v._v("OutputStreamWriter")]),v._v("的子类)")]),v._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[v._v("关于 FileWriter")]),v._v(" "),t("ul",[t("li",[v._v("使用构造函数"),t("code",[v._v("FileWriter(String path)")]),v._v("来创建新文件。")]),v._v(" "),t("li",[v._v("写出数据时并不直接写到文件中，而是写入缓冲区。"),t("br"),v._v("\n缓冲区未满但代码已经运行结束 → "),t("code",[v._v("flush()")]),v._v("冲出。")]),v._v(" "),t("li",[v._v("使用"),t("code",[v._v("close()")]),v._v("关闭流对象。"),t("br"),v._v("\n缓冲区未冲刷关闭流对象前，自动执行"),t("code",[v._v("flush()")]),v._v("。"),t("br"),v._v("\n关闭流对象后，对象没有被释放 → 赋值为"),t("code",[v._v("null")]),v._v("，标识为可回收")])])])])]),v._v(" "),t("h3",{attrs:{id:"系统-标准-流"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#系统-标准-流"}},[v._v("#")]),v._v(" 系统（标准）流")]),v._v(" "),t("ul",[t("li",[t("code",[v._v("System.in")]),v._v(" 标准输入流")]),v._v(" "),t("li",[t("code",[v._v("System.out")]),v._v(" 标准输出流")]),v._v(" "),t("li",[t("code",[v._v("System.err")]),v._v(" 标准错误流")])]),v._v(" "),t("h3",{attrs:{id:"打印流"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#打印流"}},[v._v("#")]),v._v(" 打印流")]),v._v(" "),t("ul",[t("li",[t("p",[t("code",[v._v("PrintWriter")]),v._v("类"),t("br"),v._v("\n字符流")])]),v._v(" "),t("li",[t("p",[t("code",[v._v("PrintStream")]),v._v("类"),t("br"),v._v("\n字节流")])])]),v._v(" "),t("h3",{attrs:{id:"合并流"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#合并流"}},[v._v("#")]),v._v(" 合并流")]),v._v(" "),t("p",[t("code",[v._v("SequenceInputStream")]),v._v("类")]),v._v(" "),t("ul",[t("li",[v._v("字节流，可以合并多个字节输入流")]),v._v(" "),t("li",[v._v("将多个字节输入流进行合并时，需要将其放到"),t("code",[v._v("Vector")]),v._v("集合，利用"),t("code",[v._v("Vector")]),v._v("集合产生一个"),t("code",[v._v("Enumeration")]),v._v("对象")]),v._v(" "),t("li",[v._v("利用"),t("code",[v._v("Enumeration")]),v._v("对象构造合并流对象")]),v._v(" "),t("li",[v._v("只有输入流，没有输出流")])]),v._v(" "),t("h3",{attrs:{id:"序列化-反序列化"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#序列化-反序列化"}},[v._v("#")]),v._v(" 序列化/反序列化")]),v._v(" "),t("ul",[t("li",[v._v("序列化：将对象完成存储（持久化）。"),t("code",[v._v("ObjectOutputStream")])]),v._v(" "),t("li",[v._v("反序列化：将序列化的对象还原。"),t("code",[v._v("ObjectInputStream")])])]),v._v(" "),t("div",{staticClass:"custom-block warning"},[t("p",{staticClass:"custom-block-title"},[v._v("注意")]),v._v(" "),t("ul",[t("li",[v._v("实现对象序列化，需实现"),t("code",[v._v("Serializable")]),v._v("接口"),t("br"),v._v("\n接口中没有任何方法和属性，仅用来标识类产生的对象可以被序列化")]),v._v(" "),t("li",[v._v("被"),t("code",[v._v("static")]),v._v("/"),t("code",[v._v("transient")]),v._v("修饰的属性不会被序列化")]),v._v(" "),t("li",[v._v("每个类在序列化时都有版本号\n"),t("ul",[t("li",[v._v("没有手动指定，JVM 在编译时会自动计算版本号")]),v._v(" "),t("li",[v._v("手动指定则不再自动计算")]),v._v(" "),t("li",[v._v("对象在反序列化时会比较当前类中版本号和对象版本号是否一致")])])]),v._v(" "),t("li",[v._v("集合和数组不能被序列化")])])]),v._v(" "),t("div",{staticClass:"custom-block danger"},[t("p",{staticClass:"custom-block-title"},[v._v("特别的")]),v._v(" "),t("p",[v._v("Java 的序列化不是常用序列化手段，它存在以下问题：序列化产生的数据量大、速度慢、不能跨语言。")])]),v._v(" "),t("h3",{attrs:{id:"autocloseable"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#autocloseable"}},[v._v("#")]),v._v(" AutoCloseable")]),v._v(" "),t("ul",[t("li",[v._v("当流实现了这个接口可以被自动关闭。")]),v._v(" "),t("li",[v._v("需要写在"),t("code",[v._v("try(// Codes goes here…)")])]),v._v(" "),t("li",[v._v("当执行完毕会自动调用"),t("code",[v._v("close()")])])]),v._v(" "),t("h3",{attrs:{id:"异常处理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#异常处理"}},[v._v("#")]),v._v(" 异常处理")]),v._v(" "),t("ul",[t("li",[v._v("将流对象放在"),t("code",[v._v("try")]),v._v("外定义并赋值"),t("code",[v._v("null")]),v._v("， 在"),t("code",[v._v("try")]),v._v("中初始化")]),v._v(" "),t("li",[v._v("在关闭之前判断对象是否初始化成功")]),v._v(" "),t("li",[v._v("将流强制置空，防止关流失败无法释放文件\n在写完数据后手动添加"),t("code",[v._v("flush")]),v._v("，防止关流失败数据丢失")])])])}),[],!1,null,null,null);_.default=a.exports}}]);