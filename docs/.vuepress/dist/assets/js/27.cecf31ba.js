(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{572:function(s,n,a){"use strict";a.r(n);var t=a(21),e=Object(t.a)({},(function(){var s=this,n=s.$createElement,a=s._self._c||n;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"二分查找"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#二分查找"}},[s._v("#")]),s._v(" 二分查找")]),s._v(" "),a("p",[s._v("这篇文章讨论二分查找的总体概念，并在此基础上尝试探讨各个细节问题。如：更新 "),a("code",[s._v("mid")]),s._v(" "),a("code",[s._v("high")]),s._v(" 和 "),a("code",[s._v("low")]),s._v(" 时 "),a("code",[s._v("+1")]),s._v(" "),a("code",[s._v("-1")]),s._v(" 对其效果的影响；边界值确定；变体情况处理。")]),s._v(" "),a("h2",{attrs:{id:"基本概念"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基本概念"}},[s._v("#")]),s._v(" 基本概念")]),s._v(" "),a("p",[s._v("二分查找是一种时间复杂度为 "),a("code",[s._v("O(logn)")]),s._v(" 级别的查找方式，其每轮搜索都会缩小一半的查询范围，可以把两集很大的数据用很少的查找次数来寻找到目标值。")]),s._v(" "),a("p",[s._v("最简单版本的二分查找是基于有序无重复数列的查找方法："),a("br"),s._v(" "),a("strong",[s._v("Code")])]),s._v(" "),a("div",{staticClass:"language-java line-numbers-mode"},[a("div",{staticClass:"highlight-lines"},[a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("div",{staticClass:"highlighted"},[s._v(" ")]),a("br"),a("br"),a("br"),a("br"),a("div",{staticClass:"highlighted"},[s._v(" ")]),a("br"),a("div",{staticClass:"highlighted"},[s._v(" ")]),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br")]),a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("binarySearch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" arr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" size"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" target"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 初始化")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" low "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" high "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" size "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 循环迭代")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("while")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("low "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<=")]),s._v(" high"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" mid "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("low "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" high"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("arr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("mid"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("==")]),s._v(" target"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" mid"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("else")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("arr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("mid"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v(" target"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            low "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" mid "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("else")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            high "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" mid "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 无法找到")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br")])]),a("p",[s._v("分析："),a("br"),s._v("\n情况枚举：")]),s._v(" "),a("ul",[a("li",[a("p",[s._v("循环条件 ("),a("code",[s._v("<")]),s._v(" 和 "),a("code",[s._v("<=")]),s._v(")"),a("br"),s._v(" "),a("strong",[s._v("条件：元素个数为偶数个；循环条件为 "),a("code",[s._v("<")]),s._v("；指针更新都为 "),a("code",[s._v("+1")]),s._v("：")]),a("br"),s._v("\n数组元素个数不同可能会造成过早跳出循环。"),a("br"),s._v("\n以数组 [3, 6, 8, 19, 25, 30] 为例来尝试。")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("size: 6; target: 19\nIteration 1:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n ↑     ↑          ↑\n l     m          h\n\nIteration 2:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n          ↑   ↑   ↑\n          l   m   h\n\nIteration 3:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n          ↑\n         lmh\n\nJump out of loop;\nreturn -1;\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br")])]),a("p",[s._v("可以发现，当数组元素个数为偶数个时，查询过程走到两个指针重合后就会跳出循环，而不会进入循环返回目标数的下标。"),a("br"),s._v("\n当元素个数为奇数个时则无此问题如：[3, 6, 8, 19, 25, 30, 32]。")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("size: 7; target 25\nIteration 1:\n[3, 6, 8, 19, 25, 30, 32]\n(0, 1, 2, 3,  4,  5,  6)\n ↑        ↑           ↑\n l        m           h\n\nIteration 2:\n[3, 6, 8, 19, 25, 30, 32]\n(0, 1, 2, 3,  4,  5,  6)\n          ↑   ↑       ↑\n          l   m       h\nreturn 4;\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br")])])]),s._v(" "),a("li",[a("p",[s._v("指针变更 ("),a("code",[s._v("+1")]),s._v(" 和 "),a("code",[s._v("-1")]),s._v(")\n当保持循环条件不变（即 "),a("code",[s._v("<=")]),s._v("），将 "),a("code",[s._v("low")]),s._v(" 指针变更为与 上一次 "),a("code",[s._v("mid")]),s._v(" 位置相等。以数组 [3, 6, 8, 19, 25, 30] 为例来尝试。")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("size: 6; target: 30\nIteration 1:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n ↑     ↑          ↑\n l     m          h\n\nIteration 2:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n       ↑  ↑       ↑\n       l  m       h\n\nIteration 3:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n          ↑   ↑   ↑\n          l   m   h\n\nIteration 4:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n              ↑   ↑\n             lm   h\n\n...\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br")])]),a("p",[s._v("可以看出，当目标值为右边界时，程序因为 "),a("code",[s._v("mid")]),s._v(" 位置无法进一步更新而进入死循环。")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("size: 7; target: 32\nIteration 1:\n[3, 6, 8, 19, 25, 30, 32]\n(0, 1, 2, 3,  4,  5,  6)\n ↑        ↑           ↑\n l        m           h\n\nIteration 2:\n[3, 6, 8, 19, 25, 30, 32]\n(0, 1, 2, 3,  4,  5,  6)\n          ↑   ↑       ↑\n          l   m       h\n\nIteration 3:\n[3, 6, 8, 19, 25, 30, 32]\n(0, 1, 2, 3,  4,  5,  6)\n              ↑   ↑   ↑\n              l   m   h\n\nIteration 4:\n[3, 6, 8, 19, 25, 30, 32]\n(0, 1, 2, 3,  4,  5,  6)\n                  ↑   ↑\n                  lm   h\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br")])]),a("p",[s._v("当保持循环条件不变（即 "),a("code",[s._v("<=")]),s._v("），将 "),a("code",[s._v("high")]),s._v(" 指针变更为与 上一次 "),a("code",[s._v("mid")]),s._v(" 位置相等。以数组 [3, 6, 8, 19, 25, 30] 为例来尝试。")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("size: 6; target: 3\nIteration 1:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n ↑     ↑          ↑\n l     m          h\n\nIteration 2:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n ↑  ↑  ↑\n l  m  h\n\nIteration 3:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n ↑  ↑      \n lm h      \n\n...\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br")])]),a("p",[s._v("可以看出，当目标值为左边界时，程序同样因为 "),a("code",[s._v("mid")]),s._v(" 位置无法进一步更新而进入死循环。")]),s._v(" "),a("p",[s._v("当保持循环条件不变（即 "),a("code",[s._v("<=")]),s._v("），将 "),a("code",[s._v("high")]),s._v(" 和 "),a("code",[s._v("low")]),s._v(" 指针都变更为与 上一次 "),a("code",[s._v("mid")]),s._v(" 位置相等。以数组 [3, 6, 8, 19, 25, 30] 为例来尝试。")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("size: 6; target: 3\nIteration 1:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n ↑     ↑          ↑\n l     m          h\n\nIteration 2:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n ↑  ↑  ↑\n l  m  h\n\nIteration 3:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n ↑  ↑      \n lm h      \n\n...\n\nsize: 6; target: 30\nIteration 1:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n ↑     ↑          ↑\n l     m          h\n\nIteration 2:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n       ↑  ↑       ↑\n       l  m       h\n\nIteration 3:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n          ↑   ↑   ↑\n          l   m   h\n\nIteration 4:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n              ↑   ↑\n             lm   h\n\n...\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br"),a("span",{staticClass:"line-number"},[s._v("35")]),a("br"),a("span",{staticClass:"line-number"},[s._v("36")]),a("br"),a("span",{staticClass:"line-number"},[s._v("37")]),a("br"),a("span",{staticClass:"line-number"},[s._v("38")]),a("br"),a("span",{staticClass:"line-number"},[s._v("39")]),a("br"),a("span",{staticClass:"line-number"},[s._v("40")]),a("br"),a("span",{staticClass:"line-number"},[s._v("41")]),a("br"),a("span",{staticClass:"line-number"},[s._v("42")]),a("br"),a("span",{staticClass:"line-number"},[s._v("43")]),a("br"),a("span",{staticClass:"line-number"},[s._v("44")]),a("br"),a("span",{staticClass:"line-number"},[s._v("45")]),a("br"),a("span",{staticClass:"line-number"},[s._v("46")]),a("br"),a("span",{staticClass:"line-number"},[s._v("47")]),a("br")])]),a("p",[s._v("可以看出，当边界值为左边界或右边界时，程序同样因为 "),a("code",[s._v("mid")]),s._v(" 位置无法进一步更新而进入死循环。")]),s._v(" "),a("p",[s._v("当修改循环条件（即 "),a("code",[s._v("<")]),s._v("），将 "),a("code",[s._v("low")]),s._v(" 指针变更为与 上一次 "),a("code",[s._v("mid")]),s._v(" 位置相等。以数组 [3, 6, 8, 19, 25, 30] 为例来尝试。")])])]),s._v(" "),a("h2",{attrs:{id:"参考文献或资料"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考文献或资料"}},[s._v("#")]),s._v(" 参考文献或资料")])])}),[],!1,null,null,null);n.default=e.exports}}]);