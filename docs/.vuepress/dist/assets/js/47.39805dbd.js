(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{486:function(t,e,a){"use strict";a.r(e);var s=a(20),v=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"关于索引的迷惑"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#关于索引的迷惑"}},[t._v("#")]),t._v(" 关于索引的迷惑")]),t._v(" "),a("h2",{attrs:{id:"已知资料"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#已知资料"}},[t._v("#")]),t._v(" 已知资料")]),t._v(" "),a("p",[t._v("在 InnoDB 引擎中，采用了 B+ 树的形式才建立索引。对于同一张表，会建立两个索引：主键索引和非主键索引。")]),t._v(" "),a("ul",[a("li",[t._v("主键索引"),a("br"),t._v("\n也称为聚簇索引 (Clusterd Index)。以主键值建立树，叶子结点存储整行数据。")]),t._v(" "),a("li",[t._v("非主键索引"),a("br"),t._v("\n也称为二级索引 (Secondary Index)。以索引列建立树，叶子结点存储主键的值。")])]),t._v(" "),a("p",[t._v("在具体查询过程中，如果采用主键进行查询的方式，则使用聚簇索引直接查找；若采用值查询的方式，则先在对应列的树中搜索，再根据得到的 ID 在聚簇索引中搜索，称为回表。由于回表需要查询两颗索引树，所以一般尽量使用主键查询。")]),t._v(" "),a("h2",{attrs:{id:"课程例子"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#课程例子"}},[t._v("#")]),t._v(" 课程例子")]),t._v(" "),a("p",[t._v("有表：")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"center"}},[t._v("id")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("k")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("name")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("100")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("1")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[a("code",[t._v("null")])])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("200")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("2")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[a("code",[t._v("null")])])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("300")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("3")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[a("code",[t._v("null")])])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("500")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("5")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[a("code",[t._v("null")])])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("600")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("6")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[a("code",[t._v("null")])])])])]),t._v(" "),a("p",[t._v("给字段 k 设置了索引")]),t._v(" "),a("h2",{attrs:{id:"疑惑"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#疑惑"}},[t._v("#")]),t._v(" 疑惑")]),t._v(" "),a("blockquote",[a("p",[t._v("如果语句是 select * from T where ID=500，即主键查询方式，则只需要搜索 ID 这棵 B+ 树；")])]),t._v(" "),a("p",[t._v("实际运行:")]),t._v(" "),a("div",{staticClass:"language-sql extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sql"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("EXPLAIN")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("SELECT")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("FROM")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token identifier"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("`")]),t._v("data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("`")])]),t._v(" \n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("WHERE")]),t._v("\n\tid "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("500")]),t._v("\n")])])]),a("p",[t._v("结果：\n"),a("code",[t._v("Extra null")]),a("br"),t._v("\n与预期不符。")]),t._v(" "),a("blockquote",[a("p",[t._v("如果语句是 select * from T where k=5，即普通索引查询方式，则需要先搜索 k 索引树，得到 ID 的值为 500，再到 ID 索引树搜索一次。这个过程称为回表。")])]),t._v(" "),a("p",[t._v("实际运行:")]),t._v(" "),a("div",{staticClass:"language-sql extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sql"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("EXPLAIN")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("SELECT")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("FROM")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token identifier"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("`")]),t._v("data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("`")])]),t._v(" \n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("WHERE")]),t._v("\n\tk "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),t._v("\n")])])]),a("p",[t._v("结果：\n"),a("code",[t._v("Extra null")]),a("br"),t._v("\n与预期不符。")]),t._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[t._v("疑问")]),t._v(" "),a("ul",[a("li",[t._v("经过试验，如果 "),a("code",[t._v("SELECT")]),t._v(" 的不是 "),a("code",[t._v("*")]),t._v(" 而是 "),a("code",[t._v("id")]),t._v(" 或者 "),a("code",[t._v("k")]),t._v(" 时，"),a("code",[t._v("EXPLAIN")]),t._v(" 的结果会变成 "),a("code",[t._v("Using index")]),t._v(";")]),t._v(" "),a("li",[t._v("经过试验，如果更换表设计，去掉字段 "),a("code",[t._v("name")]),t._v("，仅保留 "),a("code",[t._v("id")]),t._v(" 和 "),a("code",[t._v("k")]),t._v(" 时，再重复上面两个查询语句，第二个语句结果会变成 "),a("code",[t._v("Using index")]),t._v(";")])]),t._v(" "),a("p",[t._v("问题一是"),a("strong",[t._v("控制使用索引与否的到底是什么")]),t._v("，按照实验一，可以猜测是“在多字段情况下，给单个非主键字段设置索引，使用索引与否由 "),a("code",[t._v("SELECT")]),t._v(" 项控制。只有查询字段是被索引包含的才会使用；"),a("br"),t._v("\n但是第二个实验在更新表设计后，在通配查询也使用了索引，破除了上面的猜想。"),a("br"),t._v("\n造成上面情况的原因是什么？")]),t._v(" "),a("p",[t._v("问题二是"),a("strong",[t._v("为什么语句一在 "),a("code",[t._v("Explain")]),t._v(" 后显示为 "),a("code",[t._v("null")])]),t._v("？")])])])}),[],!1,null,null,null);e.default=v.exports}}]);