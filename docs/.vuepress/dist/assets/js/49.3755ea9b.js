(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{514:function(t,v,_){"use strict";_.r(v);var a=_(18),e=Object(a.a)({},(function(){var t=this,v=t.$createElement,_=t._self._c||v;return _("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[_("h1",{attrs:{id:"索引"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#索引"}},[t._v("#")]),t._v(" 索引")]),t._v(" "),_("p",[t._v("为了提高数据局查询效率，可以使用一些数据结构来解决。一般有有序数组、哈希表和树三种形式。")]),t._v(" "),_("h2",{attrs:{id:"适合索引的数据结构"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#适合索引的数据结构"}},[t._v("#")]),t._v(" 适合索引的数据结构")]),t._v(" "),_("h3",{attrs:{id:"哈希表"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#哈希表"}},[t._v("#")]),t._v(" 哈希表")]),t._v(" "),_("ul",[_("li",[t._v("一个键可以通过哈希函数计算得出一个值，根据值的不同可以将不同的记录放在对应值的结构下，一般情况下使用链表来对应同一个值的数据。具体方法有静态哈希和可扩展哈希。")]),t._v(" "),_("li",[t._v("哈希表适合等值查找的场景。在范围查找时只能依次遍历。")])]),t._v(" "),_("h3",{attrs:{id:"有序数组"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#有序数组"}},[t._v("#")]),t._v(" 有序数组")]),t._v(" "),_("ul",[_("li",[t._v("通过对值进行排序得到有序数组来存放数据。")]),t._v(" "),_("li",[t._v("对于等值和范围查找都有较好的性能，但是在更新数据时可能需要大范围挪动数据。")]),t._v(" "),_("li",[t._v("适合作为静态存储引擎，即对数据不会修改的数据建立索引。")])]),t._v(" "),_("h3",{attrs:{id:"树"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#树"}},[t._v("#")]),t._v(" 树")]),t._v(" "),_("p",[t._v("通过树也可以建立索引，将数据放在叶子结点，其余结点为索引结构。通过不同的叉树可以带来不同的 I/O 次数。常见的有二叉搜索树，B+ 树等实现。")]),t._v(" "),_("h4",{attrs:{id:"二叉搜索树"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#二叉搜索树"}},[t._v("#")]),t._v(" 二叉搜索树")]),t._v(" "),_("ul",[_("li",[t._v("在二叉搜索树中，要求左子树所有结点的值小于父节点；右子树所有结点的值大于父节点。")]),t._v(" "),_("li",[t._v("当这颗二叉树为平衡二叉树时，搜索目标值所用时间复杂度为 O(log(N)).")])]),t._v(" "),_("h2",{attrs:{id:"innodb-索引模型"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#innodb-索引模型"}},[t._v("#")]),t._v(" InnoDB 索引模型")]),t._v(" "),_("p",[t._v("在 InnoDB 引擎中，采用了 B+ 树的形式才建立索引。对于同一张表，会建立两个索引：主键索引和非主键索引。")]),t._v(" "),_("ul",[_("li",[t._v("主键索引"),_("br"),t._v("\n也称为聚簇索引 (Clusterd Index)。以主键值建立树，叶子结点存储整行数据。")]),t._v(" "),_("li",[t._v("非主键索引"),_("br"),t._v("\n也称为二级索引 (Secondary Index)。以索引列建立树，叶子结点存储主键的值。")])]),t._v(" "),_("p",[t._v("在具体查询过程中，如果采用主键进行查询的方式，则使用聚簇索引直接查找；若采用值查询的方式，则先在对应列的树中搜索，再根据得到的 ID 在聚簇索引中搜索，称为回表。由于回表需要查询两颗索引树，所以一般尽量使用主键查询。")]),t._v(" "),_("p",[t._v("叶子结点以数据页的形式保存，数据页内部使用单链表连接。InnoDB 数据按数据页为单位读写，将整个数据页读入内存，默认为 16KB.")]),t._v(" "),_("p",[t._v("其他类型的索引：")]),t._v(" "),_("ul",[_("li",[t._v("唯一索引：要求索引列的值必须唯一，允许有空值。")]),t._v(" "),_("li",[t._v("全文索引：仅用于 MyISAM。对于较大数据的全文索引生成会耗时耗空间。")]),t._v(" "),_("li",[t._v("联合索引：多个字段联合在一起生成索引。")])]),t._v(" "),_("h3",{attrs:{id:"维护"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#维护"}},[t._v("#")]),t._v(" 维护")]),t._v(" "),_("p",[t._v("在增加或删除元素时，可能会导致索引各层结点的分裂与合并，会导致性能下降。")]),t._v(" "),_("ul",[_("li",[t._v("一般情况下，我们使用自增主键可以减少由于值随机性带来的分裂操作。")]),t._v(" "),_("li",[t._v("当索引是唯一索引且有且仅有一个索引时，可以不考虑二级索引叶子结点容量占用问题，这时可以考虑直接将该字段作为主键。这样还可以规避回表带来的二次查询开销。")])]),t._v(" "),_("h3",{attrs:{id:"普通索引与唯一索引"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#普通索引与唯一索引"}},[t._v("#")]),t._v(" 普通索引与唯一索引")]),t._v(" "),_("p",[t._v("普通索引是最基本的索引，它没有任何限制。而唯一索引要求索引列的值必须唯一，但允许有空值。")]),t._v(" "),_("h2",{attrs:{id:"覆盖索引与联合索引"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#覆盖索引与联合索引"}},[t._v("#")]),t._v(" 覆盖索引与联合索引")]),t._v(" "),_("p",[t._v("当设计表时，可以根据查询需求使用覆盖索引和联合索引的方式来减少回表的发生，以此来提升性能。")]),t._v(" "),_("h3",{attrs:{id:"覆盖索引"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#覆盖索引"}},[t._v("#")]),t._v(" 覆盖索引")]),t._v(" "),_("p",[t._v("当在某二级索引中，叶子结点已经包含了要查询内容，则直接返回结果而不回表查询。这样的情况称为覆盖索引。")]),t._v(" "),_("p",[t._v("例如有表：")]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",{staticStyle:{"text-align":"center"}},[t._v("id")]),t._v(" "),_("th",{staticStyle:{"text-align":"center"}},[t._v("k")]),t._v(" "),_("th",{staticStyle:{"text-align":"center"}},[t._v("name")])])]),t._v(" "),_("tbody",[_("tr",[_("td",{staticStyle:{"text-align":"center"}},[t._v("100")]),t._v(" "),_("td",{staticStyle:{"text-align":"center"}},[t._v("1")]),t._v(" "),_("td",{staticStyle:{"text-align":"center"}},[_("code",[t._v("null")])])]),t._v(" "),_("tr",[_("td",{staticStyle:{"text-align":"center"}},[t._v("200")]),t._v(" "),_("td",{staticStyle:{"text-align":"center"}},[t._v("2")]),t._v(" "),_("td",{staticStyle:{"text-align":"center"}},[_("code",[t._v("null")])])]),t._v(" "),_("tr",[_("td",{staticStyle:{"text-align":"center"}},[t._v("300")]),t._v(" "),_("td",{staticStyle:{"text-align":"center"}},[t._v("3")]),t._v(" "),_("td",{staticStyle:{"text-align":"center"}},[_("code",[t._v("null")])])]),t._v(" "),_("tr",[_("td",{staticStyle:{"text-align":"center"}},[t._v("500")]),t._v(" "),_("td",{staticStyle:{"text-align":"center"}},[t._v("5")]),t._v(" "),_("td",{staticStyle:{"text-align":"center"}},[_("code",[t._v("null")])])]),t._v(" "),_("tr",[_("td",{staticStyle:{"text-align":"center"}},[t._v("600")]),t._v(" "),_("td",{staticStyle:{"text-align":"center"}},[t._v("6")]),t._v(" "),_("td",{staticStyle:{"text-align":"center"}},[_("code",[t._v("null")])])])])]),t._v(" "),_("p",[t._v("给字段 k 设置了索引。")]),t._v(" "),_("p",[t._v("对于语句 "),_("code",[t._v("SELECT ID FROM T WHERE k BETWEEN 3 AND 5;")]),t._v(" 来说，条件中规定了 k 的范围查找并且投影后仅需要字段 ID. 对于 k 的二级索引树来说，其叶子结点所保存的内容正好是最终所需要的字段 ID, 故这条语句将不进行回表，直接在 k 的二级索引树中查找并返回结果。")]),t._v(" "),_("h3",{attrs:{id:"联合索引"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#联合索引"}},[t._v("#")]),t._v(" 联合索引")]),t._v(" "),_("p",[t._v("将多个字段联合在一起生成索引称为联合索引。索引树中索引结构为第一个字段，叶子结点值存储被索引所有字段的数据。数据按照声明索引的顺序排列。")]),t._v(" "),_("h4",{attrs:{id:"最左前缀匹配原则"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#最左前缀匹配原则"}},[t._v("#")]),t._v(" 最左前缀匹配原则")]),t._v(" "),_("p",[t._v("因为联合索引按照既定顺序排列元素，所以不同的查询条件可能覆盖不同的索引项，而以此为基础会导致不同的结果（例如索引失效，覆盖索引等）。为了保证最高的搜索效率，联合索引的顺序按频率高到低排列。"),_("br"),t._v("\n例如：一个表有字段 a, b 和 c. 常有对 a 字段的单独查询和以 a 字段查 b 的查询。那么建立 (a, b) 的联合索引就可以覆盖这两种查询。")]),t._v(" "),_("p",[t._v("范围查找可以使用索引，但最多只能应用一次。当条件遇到 "),_("code",[t._v("BETWEEN AND")]),t._v(", "),_("code",[t._v("<")]),t._v(", "),_("code",[t._v(">")]),t._v(", "),_("code",[t._v("LIKE")]),t._v(" 后，后面的列不能使用索引。"),_("br"),t._v("\n例如：一个表有字段 a, b 和 c. 对 (a, b) 建立联合索引。查询 "),_("code",[t._v("SELECT * FROM T WHERE a LIKE 'J%' AND b = 3;")]),t._v(" 会使用索引对 a 进行范围查找，但 b 只能在索引结果基础上回表查询或者使用索引下推。")]),t._v(" "),_("h4",{attrs:{id:"索引下推"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#索引下推"}},[t._v("#")]),t._v(" 索引下推 "),_("Badge",{attrs:{text:"MySQL 5.6+"}})],1),t._v(" "),_("p",[t._v("索引下推 (Index Condition Pushdown, aka. ICP) 是 MySQL 5.6 推出的一项对索引查询的优化。在之前版本，当联合索引按照最左前缀匹配后，若还有条件字段不在索引范围或不满足索引使用条件时，则只能按照之前查出的结果依次回表到聚簇索引查询。而索引下推会在索引的遍历过程中就预先对条件中索引已经包含但不满足最左前缀的字段进行预先判断，过滤掉不满足的条件来减少回表次数。")]),t._v(" "),_("p",[t._v("例如上一小节的例子，在按照 "),_("code",[t._v("LIKE")]),t._v(" 条件查询索引树时，会在所有以 J 开头的结果上，利用第二个本不能使用索引的条件来去掉所有不为 3 的项。余下结果再回表聚簇索引查询得到最终结果。")])])}),[],!1,null,null,null);v.default=e.exports}}]);