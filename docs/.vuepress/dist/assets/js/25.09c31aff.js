(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{459:function(t,n,a){"use strict";a.r(n);var s=a(17),e=Object(s.a)({},(function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"二分查找"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#二分查找"}},[t._v("#")]),t._v(" 二分查找")]),t._v(" "),a("p",[t._v("这篇文章讨论二分查找的总体概念，并在此基础上尝试探讨各个细节问题。如：更新 "),a("code",[t._v("mid")]),t._v(" "),a("code",[t._v("high")]),t._v(" 和 "),a("code",[t._v("low")]),t._v(" 时 "),a("code",[t._v("+1")]),t._v(" "),a("code",[t._v("-1")]),t._v(" 对其效果的影响；边界值确定；变体情况处理。")]),t._v(" "),a("h2",{attrs:{id:"基本概念"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基本概念"}},[t._v("#")]),t._v(" 基本概念")]),t._v(" "),a("p",[t._v("二分查找是一种时间复杂度为 "),a("code",[t._v("O(logn)")]),t._v(" 级别的查找方式，其每轮搜索都会缩小一半的查询范围，可以把两集很大的数据用很少的查找次数来寻找到目标值。")]),t._v(" "),a("p",[t._v("最简单版本的二分查找是基于有序无重复数列的查找方法："),a("br"),t._v(" "),a("strong",[t._v("Code")])]),t._v(" "),a("div",{staticClass:"language-java extra-class"},[a("div",{staticClass:"highlight-lines"},[a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("br"),a("br"),a("br"),a("br"),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("br"),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br")]),a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("binarySearch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" arr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" size"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" target"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 初始化")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" low "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" high "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" size "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 循环迭代")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("low "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<=")]),t._v(" high"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" mid "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("low "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" high"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("arr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("mid"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" target"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" mid"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("arr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("mid"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" target"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            low "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" mid "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            high "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" mid "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 无法找到")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("分析："),a("br"),t._v("\n情况枚举：")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("循环条件 ("),a("code",[t._v("<")]),t._v(" 和 "),a("code",[t._v("<=")]),t._v(")"),a("br"),t._v(" "),a("strong",[t._v("条件：元素个数为偶数个；循环条件为 "),a("code",[t._v("<")]),t._v("；指针更新都为 "),a("code",[t._v("+1")]),t._v("：")]),a("br"),t._v("\n数组元素个数不同可能会造成过早跳出循环。"),a("br"),t._v("\n以数组 [3, 6, 8, 19, 25, 30] 为例来尝试。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("size: 6; target: 19\nIteration 1:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n ↑     ↑          ↑\n l     m          h\n\nIteration 2:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n          ↑   ↑   ↑\n          l   m   h\n\nIteration 3:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n          ↑\n         lmh\n\nJump out of loop;\nreturn -1;\n")])])]),a("p",[t._v("可以发现，当数组元素个数为偶数个时，查询过程走到两个指针重合后就会跳出循环，而不会进入循环返回目标数的下标。"),a("br"),t._v("\n当元素个数为奇数个时则无此问题如：[3, 6, 8, 19, 25, 30, 32]。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("size: 7; target 25\nIteration 1:\n[3, 6, 8, 19, 25, 30, 32]\n(0, 1, 2, 3,  4,  5,  6)\n ↑        ↑           ↑\n l        m           h\n\nIteration 2:\n[3, 6, 8, 19, 25, 30, 32]\n(0, 1, 2, 3,  4,  5,  6)\n          ↑   ↑       ↑\n          l   m       h\nreturn 4;\n")])])])]),t._v(" "),a("li",[a("p",[t._v("指针变更 ("),a("code",[t._v("+1")]),t._v(" 和 "),a("code",[t._v("-1")]),t._v(")\n当保持循环条件不变（即 "),a("code",[t._v("<=")]),t._v("），将 "),a("code",[t._v("low")]),t._v(" 指针变更为与 上一次 "),a("code",[t._v("mid")]),t._v(" 位置相等。以数组 [3, 6, 8, 19, 25, 30] 为例来尝试。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("size: 6; target: 30\nIteration 1:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n ↑     ↑          ↑\n l     m          h\n\nIteration 2:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n       ↑  ↑       ↑\n       l  m       h\n\nIteration 3:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n          ↑   ↑   ↑\n          l   m   h\n\nIteration 4:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n              ↑   ↑\n             lm   h\n\n...\n")])])]),a("p",[t._v("可以看出，当目标值为右边界时，程序因为 "),a("code",[t._v("mid")]),t._v(" 位置无法进一步更新而进入死循环。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("size: 7; target: 32\nIteration 1:\n[3, 6, 8, 19, 25, 30, 32]\n(0, 1, 2, 3,  4,  5,  6)\n ↑        ↑           ↑\n l        m           h\n\nIteration 2:\n[3, 6, 8, 19, 25, 30, 32]\n(0, 1, 2, 3,  4,  5,  6)\n          ↑   ↑       ↑\n          l   m       h\n\nIteration 3:\n[3, 6, 8, 19, 25, 30, 32]\n(0, 1, 2, 3,  4,  5,  6)\n              ↑   ↑   ↑\n              l   m   h\n\nIteration 4:\n[3, 6, 8, 19, 25, 30, 32]\n(0, 1, 2, 3,  4,  5,  6)\n                  ↑   ↑\n                  lm   h\n")])])]),a("p",[t._v("当保持循环条件不变（即 "),a("code",[t._v("<=")]),t._v("），将 "),a("code",[t._v("high")]),t._v(" 指针变更为与 上一次 "),a("code",[t._v("mid")]),t._v(" 位置相等。以数组 [3, 6, 8, 19, 25, 30] 为例来尝试。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("size: 6; target: 3\nIteration 1:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n ↑     ↑          ↑\n l     m          h\n\nIteration 2:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n ↑  ↑  ↑\n l  m  h\n\nIteration 3:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n ↑  ↑      \n lm h      \n\n...\n")])])]),a("p",[t._v("可以看出，当目标值为左边界时，程序同样因为 "),a("code",[t._v("mid")]),t._v(" 位置无法进一步更新而进入死循环。")]),t._v(" "),a("p",[t._v("当保持循环条件不变（即 "),a("code",[t._v("<=")]),t._v("），将 "),a("code",[t._v("high")]),t._v(" 和 "),a("code",[t._v("low")]),t._v(" 指针都变更为与 上一次 "),a("code",[t._v("mid")]),t._v(" 位置相等。以数组 [3, 6, 8, 19, 25, 30] 为例来尝试。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("size: 6; target: 3\nIteration 1:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n ↑     ↑          ↑\n l     m          h\n\nIteration 2:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n ↑  ↑  ↑\n l  m  h\n\nIteration 3:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n ↑  ↑      \n lm h      \n\n...\n\nsize: 6; target: 30\nIteration 1:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n ↑     ↑          ↑\n l     m          h\n\nIteration 2:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n       ↑  ↑       ↑\n       l  m       h\n\nIteration 3:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n          ↑   ↑   ↑\n          l   m   h\n\nIteration 4:\n[3, 6, 8, 19, 25, 30]\n(0, 1, 2, 3,  4,  5)\n              ↑   ↑\n             lm   h\n\n...\n")])])]),a("p",[t._v("可以看出，当边界值为左边界或右边界时，程序同样因为 "),a("code",[t._v("mid")]),t._v(" 位置无法进一步更新而进入死循环。")]),t._v(" "),a("p",[t._v("当修改循环条件（即 "),a("code",[t._v("<")]),t._v("），将 "),a("code",[t._v("low")]),t._v(" 指针变更为与 上一次 "),a("code",[t._v("mid")]),t._v(" 位置相等。以数组 [3, 6, 8, 19, 25, 30] 为例来尝试。")])])]),t._v(" "),a("h2",{attrs:{id:"参考文献或资料"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考文献或资料"}},[t._v("#")]),t._v(" 参考文献或资料")])])}),[],!1,null,null,null);n.default=e.exports}}]);