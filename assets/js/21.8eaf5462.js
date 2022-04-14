(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{473:function(v,_,t){"use strict";t.r(_);var d=t(16),o=Object(d.a)({},(function(){var v=this,_=v.$createElement,t=v._self._c||_;return t("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[t("h1",{attrs:{id:"常量、变量与数据类型"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#常量、变量与数据类型"}},[v._v("#")]),v._v(" 常量、变量与数据类型")]),v._v(" "),t("h2",{attrs:{id:"关键字与标识符"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#关键字与标识符"}},[v._v("#")]),v._v(" 关键字与标识符")]),v._v(" "),t("p",[v._v("C 标记符包括六种类型：关键字、标识符、常量、字符串、特殊符号和运算符。")]),v._v(" "),t("ul",[t("li",[t("p",[t("strong",[v._v("关键字 (keyword) 是程序语句的基本构成块，有固定含义且不可改变。")])]),v._v(" "),t("p",[v._v("ANSI C 规定的关键字：")]),v._v(" "),t("table",[t("thead",[t("tr",[t("th",[v._v("col 1")]),v._v(" "),t("th",[v._v("col 2")]),v._v(" "),t("th",[v._v("col 3")]),v._v(" "),t("th",[v._v("col 4")])])]),v._v(" "),t("tbody",[t("tr",[t("td",[t("code",[v._v("auto")])]),v._v(" "),t("td",[t("code",[v._v("double")])]),v._v(" "),t("td",[t("code",[v._v("int")])]),v._v(" "),t("td",[t("code",[v._v("struct")])])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("break")])]),v._v(" "),t("td",[t("code",[v._v("else")])]),v._v(" "),t("td",[t("code",[v._v("long")])]),v._v(" "),t("td",[t("code",[v._v("switch")])])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("case")])]),v._v(" "),t("td",[t("code",[v._v("enum")])]),v._v(" "),t("td",[t("code",[v._v("register")])]),v._v(" "),t("td",[t("code",[v._v("typedef")])])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("char")])]),v._v(" "),t("td",[t("code",[v._v("extern")])]),v._v(" "),t("td",[t("code",[v._v("return")])]),v._v(" "),t("td",[t("code",[v._v("union")])])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("const")])]),v._v(" "),t("td",[t("code",[v._v("float")])]),v._v(" "),t("td",[t("code",[v._v("short")])]),v._v(" "),t("td",[t("code",[v._v("unsigned")])])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("continue")])]),v._v(" "),t("td",[t("code",[v._v("for")])]),v._v(" "),t("td",[t("code",[v._v("signed")])]),v._v(" "),t("td",[t("code",[v._v("void")])])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("default")])]),v._v(" "),t("td",[t("code",[v._v("goto")])]),v._v(" "),t("td",[t("code",[v._v("sizeof")])]),v._v(" "),t("td",[t("code",[v._v("volatile")])])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("do")])]),v._v(" "),t("td",[t("code",[v._v("if")])]),v._v(" "),t("td",[t("code",[v._v("static")])]),v._v(" "),t("td",[t("code",[v._v("while")])])])])]),v._v(" "),t("p",{staticStyle:{color:"#3eaf7c"}},[t("b",[v._v("* C99 增添了一些关键字。")])])]),v._v(" "),t("li",[t("p",[t("strong",[v._v("标识符 (identifier) 指变量名、函数和数组名。是自定义的名称。")])])])]),v._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[v._v("标识符的规则")]),v._v(" "),t("ul",[t("li",[t("p",[v._v("第一个字符必须是字母或下划线")])]),v._v(" "),t("li",[t("p",[v._v("只能由字母、数字或下划线组成")])]),v._v(" "),t("li",[t("p",[v._v("只有前 31 个字符是有效的（最长为 31 个字符）")])]),v._v(" "),t("li",[t("p",[v._v("不能使用关键字")])]),v._v(" "),t("li",[t("p",[v._v("不能包含空格符")])])])]),v._v(" "),t("h2",{attrs:{id:"常量"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#常量"}},[v._v("#")]),v._v(" 常量")]),v._v(" "),t("p",[v._v("C 语言的常量是固定值，"),t("strong",[v._v("运行中不能修改")]),v._v("。")]),v._v(" "),t("p",[v._v("常量包含两大类："),t("strong",[v._v("数字常量")]),v._v("和"),t("strong",[v._v("字符常量")]),v._v("。")]),v._v(" "),t("p",[v._v("其中数字常量包括："),t("strong",[v._v("整型常量")]),v._v("和"),t("strong",[v._v("实数常量")]),v._v("；字符常量包括："),t("strong",[v._v("单字符常量")]),v._v("和"),t("strong",[v._v("字符串常量")]),v._v("。")]),v._v(" "),t("h3",{attrs:{id:"整型常量"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#整型常量"}},[v._v("#")]),v._v(" 整型常量")]),v._v(" "),t("p",[v._v("指一个数字系列。包括三种类型：十进制、八进制和十六进制。")]),v._v(" "),t("h4",{attrs:{id:"十进制"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#十进制"}},[v._v("#")]),v._v(" 十进制")]),v._v(" "),t("p",[v._v("由 0 到 9 的数字构成，前面可加"),t("code",[v._v("+")]),v._v("或"),t("code",[v._v("-")]),v._v("。")]),v._v(" "),t("div",{staticClass:"custom-block warning"},[t("p",{staticClass:"custom-block-title"},[v._v("注意")]),v._v(" "),t("ul",[t("li",[t("p",[v._v("ANSI C 支持一元加号")])]),v._v(" "),t("li",[t("p",[v._v("数字之间不允许嵌入空格、逗号或非数字字符")])])])]),v._v(" "),t("h4",{attrs:{id:"八进制"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#八进制"}},[v._v("#")]),v._v(" 八进制")]),v._v(" "),t("p",[v._v("由 0 到 7 的数字组成，以 "),t("code",[v._v("0")]),v._v(" 打头。")]),v._v(" "),t("h4",{attrs:{id:"十六进制"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#十六进制"}},[v._v("#")]),v._v(" 十六进制")]),v._v(" "),t("p",[v._v("由 "),t("code",[v._v("0x")]),v._v(" 或 "),t("code",[v._v("0X")]),v._v(" 打头，除数字 0 到 9 外，还包含字母 "),t("code",[v._v("A")]),v._v(" 到 "),t("code",[v._v("F")]),v._v(" 或 "),t("code",[v._v("a")]),v._v(" 到 "),t("code",[v._v("f")]),v._v(" 用来表示 10 到 15。")]),v._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[v._v("关于最大取值范围")]),v._v(" "),t("ul",[t("li",[t("p",[v._v("能保存的最大整数值取决于具体计算机。32 位计算机保存的最大整数比 16 位计算机能保存的大。")])]),v._v(" "),t("li",[t("p",[v._v("当给常量加上 "),t("code",[v._v("U")]),v._v("、"),t("code",[v._v("L")]),v._v("、"),t("code",[v._v("UL")]),v._v("等修饰符时可以保存更大的整数（无符号数、长整数）。")])])])]),v._v(" "),t("h3",{attrs:{id:"实数常量"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#实数常量"}},[v._v("#")]),v._v(" 实数常量")]),v._v(" "),t("p",[v._v("也称浮点常量，是包含小数部分的数字常量。")]),v._v(" "),t("p",[v._v("类似整型常数，实数常数前也可以加"),t("code",[v._v("+")]),v._v("或"),t("code",[v._v("-")]),v._v("。")]),v._v(" "),t("h4",{attrs:{id:"特殊表示法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#特殊表示法"}},[v._v("#")]),v._v(" 特殊表示法")]),v._v(" "),t("p",[v._v("省略掉小数点前或后的数字是允许的。如："),t("code",[v._v("215.")]),v._v("、"),t("code",[v._v(".95")]),v._v("、"),t("code",[v._v("-.71")]),v._v("、"),t("code",[v._v("+.5")]),v._v("都是合法的。")]),v._v(" "),t("div",{staticClass:"custom-block warning"},[t("p",{staticClass:"custom-block-title"},[v._v("注意")]),v._v(" "),t("ul",[t("li",[t("p",[v._v("当数字以后缀"),t("code",[v._v("f")]),v._v("或"),t("code",[v._v("F")]),v._v("结尾，则强制转换为单精度。")])]),v._v(" "),t("li",[t("p",[v._v("当数字无后缀或以"),t("code",[v._v("L")]),v._v("为后缀，则明确指定为双精度。")])])])]),v._v(" "),t("h3",{attrs:{id:"单字符常量"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#单字符常量"}},[v._v("#")]),v._v(" 单字符常量")]),v._v(" "),t("p",[v._v("用一对单引号括起来的单个字符。")]),v._v(" "),t("p",[v._v("字符常量具有 ASCII 整数值。")]),v._v(" "),t("h3",{attrs:{id:"字符串常量"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#字符串常量"}},[v._v("#")]),v._v(" 字符串常量")]),v._v(" "),t("p",[v._v("用双引号括起来的一系列字符，这些字符可以是字母、数字、特殊字符或空格。")]),v._v(" "),t("h3",{attrs:{id:"反斜杠字符常量"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#反斜杠字符常量"}},[v._v("#")]),v._v(" 反斜杠字符常量")]),v._v(" "),t("p",[v._v("也称转义字符或换码顺序。表示一些特殊含义，由"),t("code",[v._v("\\")]),v._v("和一个字符构成。")]),v._v(" "),t("table",[t("thead",[t("tr",[t("th",[v._v("常量")]),v._v(" "),t("th",[v._v("含义")])])]),v._v(" "),t("tbody",[t("tr",[t("td",[t("code",[v._v("\\a")])]),v._v(" "),t("td",[v._v("警告声")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("\\b")])]),v._v(" "),t("td",[v._v("退格符")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("\\f")])]),v._v(" "),t("td",[v._v("换页符，将当前位置移到下页开头")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("\\n")])]),v._v(" "),t("td",[v._v("换行符")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("\\r")])]),v._v(" "),t("td",[v._v("回车符")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("\\t")])]),v._v(" "),t("td",[v._v("水平制表符")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("\\v")])]),v._v(" "),t("td",[v._v("垂直制表符")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("\\'")])]),v._v(" "),t("td",[v._v("单引号")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("\\''")])]),v._v(" "),t("td",[v._v("双引号")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("\\?")])]),v._v(" "),t("td",[v._v("问号")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("\\\\")])]),v._v(" "),t("td",[v._v("反斜杠")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("\\0")])]),v._v(" "),t("td",[v._v("零")])])])]),v._v(" "),t("h2",{attrs:{id:"变量"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#变量"}},[v._v("#")]),v._v(" 变量")]),v._v(" "),t("p",[v._v("是一个可用于保存数据值的数据名。")]),v._v(" "),t("p",[v._v("变量在不同的程序中运行时可以具有不同的值。")]),v._v(" "),t("p",[v._v("命名遵从"),t("a",{attrs:{href:"#%E5%85%B3%E9%94%AE%E5%AD%97%E4%B8%8E%E6%A0%87%E8%AF%86%E7%AC%A6"}},[v._v("标识符")]),v._v("的规则，且区分大小写。")]),v._v(" "),t("p",{staticStyle:{color:"#3eaf7c"}},[t("b",[v._v("* 有文章表明变量名不应多于八个字符，某些编译器只能识别前八个字符。（仅针对某些老式编译器）")])]),v._v(" "),t("h2",{attrs:{id:"数据类型"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#数据类型"}},[v._v("#")]),v._v(" 数据类型")]),v._v(" "),t("p",[v._v("C 语言支持三种数据类型："),t("strong",[v._v("基本数据类型")]),v._v("、"),t("strong",[v._v("派生数据类型")]),v._v("和"),t("strong",[v._v("自定义数据类型")]),v._v("。")]),v._v(" "),t("ul",[t("li",[t("p",[v._v("基本数据类型包括："),t("strong",[v._v("整型")]),v._v("、"),t("strong",[v._v("浮点型")]),v._v("和"),t("strong",[v._v("void")])])]),v._v(" "),t("li",[t("p",[v._v("派生类数据类型包括："),t("strong",[v._v("数组")]),v._v("、"),t("strong",[v._v("函数")]),v._v("、"),t("strong",[v._v("结构体")]),v._v("和"),t("strong",[v._v("指针")])])])]),v._v(" "),t("h3",{attrs:{id:"整型"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#整型"}},[v._v("#")]),v._v(" 整型")]),v._v(" "),t("p",[v._v("整型包含两大类："),t("strong",[v._v("整数型")]),v._v("和"),t("strong",[v._v("字符型")]),v._v("。")]),v._v(" "),t("p",[v._v("整型也包括："),t("strong",[v._v("有符号")]),v._v("和"),t("strong",[v._v("无符号")]),v._v("两大类。")]),v._v(" "),t("ul",[t("li",[t("p",[v._v("有符号整数型包括："),t("code",[v._v("int")]),v._v(" "),t("code",[v._v("short int")]),v._v(" "),t("code",[v._v("long int")])])]),v._v(" "),t("li",[t("p",[v._v("无符号整数型包括："),t("code",[v._v("unsigned int")]),v._v(" "),t("code",[v._v("unsigned short int")]),v._v(" "),t("code",[v._v("unsigned long int")])])])]),v._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[v._v("关于取值范围和有无符号")]),v._v(" "),t("ul",[t("li",[t("p",[v._v("通常整数型"),t("strong",[v._v("占用一个字的长度")]),v._v("，根据计算机的不同，它可以表述的范围不同（16 位和 32 位）。")])]),v._v(" "),t("li",[t("p",[v._v("C 语言的整数型默认是有符号的，故关键字"),t("code",[v._v("signed")]),v._v("省略。有符号整型使用其中一位来表示正负。无符号整数型指表述正值。它们取值范围不同。")])]),v._v(" "),t("li",[t("p",[v._v("整数型根据数的大小分为"),t("code",[v._v("short int")]),v._v(" "),t("code",[v._v("int")]),v._v(" "),t("code",[v._v("long int")]),v._v("三种来分别表述不同长度的整数。"),t("code",[v._v("short int")]),v._v("所需存储空间为"),t("code",[v._v("int")]),v._v("的一半。")])])])]),v._v(" "),t("p",[v._v("字符型包括："),t("code",[v._v("char")]),v._v(" "),t("code",[v._v("signed char")]),v._v(" "),t("code",[v._v("unsigned char")]),v._v("。")]),v._v(" "),t("p",[v._v("一个单字符通常用"),t("strong",[v._v("一个字节")]),v._v("（8位）保存。")]),v._v(" "),t("p",[v._v("字符类型也可以被"),t("code",[v._v("signed")]),v._v("和"),t("code",[v._v("unsigned")]),v._v("修饰，这样它们可以表示的范围会有所不同。")]),v._v(" "),t("h3",{attrs:{id:"浮点型"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#浮点型"}},[v._v("#")]),v._v(" 浮点型")]),v._v(" "),t("p",[v._v("浮点数由 32 位空间保存，其中 6 位存放小数。")]),v._v(" "),t("p",[v._v("当"),t("code",[v._v("float")]),v._v("提供的精度不够时，可以用"),t("code",[v._v("double")]),v._v("来表示双精度浮点数，一个"),t("code",[v._v("double")]),v._v("类型的数字占用 64 位空间，其中 14 位是小数。")]),v._v(" "),t("p",[t("code",[v._v("long double")]),v._v("可以表示的范围更大，精度更高。不同编译器对其大小定义不同，有 8 字节、10 字节、12 字节和 16 字节。")]),v._v(" "),t("h3",{attrs:{id:"void型"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#void型"}},[v._v("#")]),v._v(" void型")]),v._v(" "),t("p",[v._v("通常用来指定函数的类型。当函数不用返回任何值时，这个函数可以被定义为 void 类型。")]),v._v(" "),t("p",[v._v("同时 void 类型可以起一般类型的作用，用来表示其他各种标准类型。")]),v._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[v._v("取值范围")]),v._v(" "),t("table",[t("thead",[t("tr",[t("th",[v._v("类型")]),v._v(" "),t("th",[v._v("大小（位）")]),v._v(" "),t("th",[v._v("表示范围")])])]),v._v(" "),t("tbody",[t("tr",[t("td",[t("code",[v._v("char")]),v._v(" "),t("code",[v._v("signed char")])]),v._v(" "),t("td",[v._v("8")]),v._v(" "),t("td",[v._v("-128~127")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("unsigned char")])]),v._v(" "),t("td",[v._v("8")]),v._v(" "),t("td",[v._v("0~255")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("int")]),v._v(" "),t("code",[v._v("signed int")]),v._v("（16位）")]),v._v(" "),t("td",[v._v("16")]),v._v(" "),t("td",[v._v("-32,768~32,767")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("int")]),v._v(" "),t("code",[v._v("signed int")]),v._v("（32位）")]),v._v(" "),t("td",[v._v("32")]),v._v(" "),t("td",[v._v("-2"),t("sup",[v._v("31")]),v._v("~2"),t("sup",[v._v("31")]),v._v("-1 （-2,147,483,648~2,147,483,647）")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("unsigned int")]),v._v("（16位）")]),v._v(" "),t("td",[v._v("16")]),v._v(" "),t("td",[v._v("0~65,535")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("unsigned int")]),v._v("（32位）")]),v._v(" "),t("td",[v._v("32")]),v._v(" "),t("td",[v._v("0~2"),t("sup",[v._v("32")]),v._v("-1（4,294,967,395）")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("short int")]),v._v(" "),t("code",[v._v("signed short int")]),v._v("（16位）")]),v._v(" "),t("td",[v._v("8")]),v._v(" "),t("td",[v._v("-128~127")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("short int")]),v._v(" "),t("code",[v._v("signed short int")]),v._v("（32位）")]),v._v(" "),t("td",[v._v("16")]),v._v(" "),t("td",[v._v("-32,768~32,767")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("unsigned short int")]),v._v("（16位）")]),v._v(" "),t("td",[v._v("8")]),v._v(" "),t("td",[v._v("0~255")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("unsigned short int")]),v._v("（32位）")]),v._v(" "),t("td",[v._v("16")]),v._v(" "),t("td",[v._v("0~65,535")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("long int")]),v._v(" "),t("code",[v._v("signed long int")])]),v._v(" "),t("td",[v._v("32")]),v._v(" "),t("td",[v._v("-2"),t("sup",[v._v("31")]),v._v("~2"),t("sup",[v._v("31")]),v._v("-1")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("unsigned long int")])]),v._v(" "),t("td",[v._v("32")]),v._v(" "),t("td",[v._v("0~2"),t("sup",[v._v("32")]),v._v("-1")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("float")])]),v._v(" "),t("td",[v._v("32")]),v._v(" "),t("td",[v._v("3.4E-38~3.4E+38")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("double")])]),v._v(" "),t("td",[v._v("64")]),v._v(" "),t("td",[v._v("1.7E-308~1.7E+308")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("long double")]),v._v("（用 10 位存储）")]),v._v(" "),t("td",[v._v("80")]),v._v(" "),t("td",[v._v("3.4E-4932~1.1E+4932")])]),v._v(" "),t("tr",[t("td",[t("code",[v._v("long double")]),v._v("（用 16 位存储）")]),v._v(" "),t("td",[v._v("128")]),v._v(" "),t("td",[v._v("3.4E-4932~1.1E+4932")])])])])])])}),[],!1,null,null,null);_.default=o.exports}}]);