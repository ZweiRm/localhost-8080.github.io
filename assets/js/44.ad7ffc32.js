(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{483:function(t,e,a){"use strict";a.r(e);var n=a(20),r=Object(n.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"分库分表"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#分库分表"}},[t._v("#")]),t._v(" 分库分表")]),t._v(" "),a("p",[t._v("通过将单个数据库拆分成多个、单个表拆分成多个的方法来提升数据库的性能，增加其可用性。"),a("br"),t._v("\n当单个库数据量大时，会造成查询 QPS 增高，可以通过拆库的方式分担连接压力。同时拆分数据库也可以提升可用性实现高可用。"),a("br"),t._v("\n当单个表数据量大时，数据库本身的手段无法优化性能，可以通过拆表的方式争取性能。")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"center"}},[t._v("方案")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("解决问题")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("只分库")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("数据库读写 QPS 高，连接数不足")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("只分表")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("单表数据量过大，性能遇到瓶颈")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("分库分表")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("连接数不足，性能瓶颈")])])])]),t._v(" "),a("h2",{attrs:{id:"拆分方案"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#拆分方案"}},[t._v("#")]),t._v(" 拆分方案")]),t._v(" "),a("p",[t._v("对于拆表拆库，可以按查询数量和连接数量计算求出大概数目。切分时有水平和垂直两种切分方式："),a("br"),t._v("\n水平切分：按业务维度横线切分；\n垂直切分：把不同字段切分到不同的表中。")])])}),[],!1,null,null,null);e.default=r.exports}}]);