(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{489:function(t,e,a){"use strict";a.r(e);var _=a(20),v=Object(_.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"事务"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#事务"}},[t._v("#")]),t._v(" 事务")]),t._v(" "),a("p",[t._v("事务会保证一组数据库操作要么全都成功，要么全部失败。事务的支持是在引擎实现的。MyISAM 引擎不支持事务，InnoDB 引擎支持事务。")]),t._v(" "),a("p",[a("strong",[t._v("特性")])]),t._v(" "),a("ul",[a("li",[t._v("原子性 Atomicity")]),t._v(" "),a("li",[t._v("一致性 Consistency")]),t._v(" "),a("li",[t._v("隔离性 Isolation")]),t._v(" "),a("li",[t._v("持久性 Durability")])]),t._v(" "),a("h2",{attrs:{id:"隔离性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#隔离性"}},[t._v("#")]),t._v(" 隔离性")]),t._v(" "),a("p",[t._v("在多事务同时执行时，可能会出现脏读、不可重复读和幻读的问题：")]),t._v(" "),a("ul",[a("li",[t._v("脏读：事务 B 在执行中读取到了事务 A 修改过但未提交的数据；")]),t._v(" "),a("li",[t._v("不可重复读：事务 B 前后读取两次，在读第二次前事务 A 对数据进行了修改，导致事务 B 第二次读取时记录内容不一致；")]),t._v(" "),a("li",[t._v("幻读：事务 B 前后读取两次，在第二次读取前事务 A 增加或删除了记录，导致事务 B 第二次读取时获得的记录数量不一致；")])]),t._v(" "),a("h3",{attrs:{id:"隔离级别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#隔离级别"}},[t._v("#")]),t._v(" 隔离级别")]),t._v(" "),a("p",[t._v("MySQL 给出了四个隔离级别，通过隔离级别来解决上面的问题：")]),t._v(" "),a("ul",[a("li",[t._v("读未提交：事务未提交时其所作更改就对其他事务可见；"),a("br"),t._v("\n直接返回记录最新值，不使用阅读视图。")]),t._v(" "),a("li",[t._v("读提交：事务提交后所做更改对其他事务可见；"),a("br"),t._v("\n阅读视图在每条 SQL 开始执行时创建。")]),t._v(" "),a("li",[t._v("可重复读：事务在执行过程中可见的数据与其启动时一致，未提交前所作更改其他事务不可见；"),a("br"),t._v("\n阅读视图在事务启动时创建，在整个事务期间使用该视图。")]),t._v(" "),a("li",[t._v("串行化：对同一记录根据需求加读锁和写锁，当锁冲突时需要等待前一事务执行完成后才能执行；"),a("br"),t._v("\n使用加锁的形式避免冲突。")])]),t._v(" "),a("p",[t._v("MySQL 会在"),a("strong",[t._v("读数据")]),t._v("采用一致性读，即利用一致性阅读视图来实现。但在"),a("strong",[t._v("更新数据")]),t._v("时，会采用当前读的方法来保证更新数据生效。"),a("br"),t._v("\n对于当前读来说， SELECT 语句可以加上 "),a("code",[t._v("lock in share mode")]),t._v(" 或 "),a("code",[t._v("for update")]),t._v(" 变成当前读。其中第一个是读锁（共享锁），第二个是写锁（排它锁）。")]),t._v(" "),a("h4",{attrs:{id:"并发版本控制"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#并发版本控制"}},[t._v("#")]),t._v(" 并发版本控制")]),t._v(" "),a("p",[t._v("具体通过多版本并发控制 (MVCC) 来实现，不同时刻启动的阅读视图 (read-view)."),a("br"),t._v("\n在 MySQL 中，每条更新记录会同时记录一条回滚操作到 undo log 中，记录中的最新值可以通过回滚来回到之前的状态。例如一串操作：1 → 2, 2 → 3, 3 → 4，对应的 undo log 是：2 → 1, 3 → 2, 4 → 3."),a("br"),t._v("\n假设在第一个更新创建了 read-view A, 在所有操作完成后创建了 read-view B. 对于 read-view A 来说，假如需要回到最原始的值 1，需要依次回滚所有操作；假如有新事务将当前值 4 修改为 5，这个操作对 read-view A,B 所在的事务不冲突。")]),t._v(" "),a("p",[t._v("示例："),a("br"),t._v("\n一条记录 r，当前值为 1.")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"center"}},[t._v("事务 A")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("事务 B")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("读未提交")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("读提交")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("可重复读")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("串行化")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("R(r)")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}}),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("A: 1")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("A: 1")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("A: 1")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("A: 1")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}}),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("R(r)")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("B: 1")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("B: 1")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("B: 1")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("B: 1")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}}),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("W(r): 2")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}}),t._v(" "),a("td",{staticStyle:{"text-align":"center"}}),t._v(" "),a("td",{staticStyle:{"text-align":"center"}}),t._v(" "),a("td",{staticStyle:{"text-align":"center"}})]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("R(r)")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}}),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("A: 2")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("A: 1")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("A: 1")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("A: 1")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}}),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("Commit")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}}),t._v(" "),a("td",{staticStyle:{"text-align":"center"}}),t._v(" "),a("td",{staticStyle:{"text-align":"center"}}),t._v(" "),a("td",{staticStyle:{"text-align":"center"}})]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("R(r)")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}}),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("A: 2")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("A: 2")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("A: 1")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("A: 1")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("Commit")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}}),t._v(" "),a("td",{staticStyle:{"text-align":"center"}}),t._v(" "),a("td",{staticStyle:{"text-align":"center"}}),t._v(" "),a("td",{staticStyle:{"text-align":"center"}}),t._v(" "),a("td",{staticStyle:{"text-align":"center"}})]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[t._v("R(r)")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}}),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("A: 2")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("A: 2")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("A: 2")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("A: 2")])])])]),t._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[t._v("特别的")]),t._v(" "),a("ul",[a("li",[t._v("不同数据库的默认隔离级别不同，Oracle 的默认隔离级别是"),a("strong",[t._v("读提交")]),t._v("，而 MySQL 的默认隔离级别是"),a("strong",[t._v("可重复读")]),t._v("。在使用由 Oracle 数据库迁移到 MySQL 数据库的应用时需要修改隔离级别。启动时设置启动参数 "),a("code",[t._v("transaction-isolation")]),t._v(" 为 "),a("code",[t._v("READ-COMMITTED")]),t._v("."),a("br"),t._v("\n使用语句 "),a("code",[t._v("SHOW VARIABLES LIKE 'transaction-isolation';")]),t._v(" 查看当前的隔离级别。")]),t._v(" "),a("li",[t._v("系统会在判断没有比当前 undo log 更早的 read-view 存在时删除该日志，所有不建议使用长事务。"),a("br"),t._v("\n长事务会导致在该事务提交前所有回滚记录都必须保留，占用很大存储空间。同时它也会占有锁资源。")])])]),t._v(" "),a("p",[a("strong",[t._v("一致性读视图")]),a("br"),t._v("\n阅读视图是基于整个库的。其基本逻辑是：")]),t._v(" "),a("ul",[a("li",[t._v("对于每一个事物，拥有一个 transaction id, 它按申请顺序严格递增，在事务开始时从事务系统申请。")]),t._v(" "),a("li",[t._v("每行记录有多个版本，每次事务更新时创建新版本。记录 row trx_id，内容为事务的 transaction id. 旧版本会被保留，新版本可以直接提取到信息。行旧记录版本不是物理存在，而是当前版本根据 undo log 计算得来的。")]),t._v(" "),a("li",[t._v("事务数组"),a("br"),t._v("\nInnoDB 为每个事务创建数组来保存事务启动瞬间当前活跃的所有事务的 ID （启动但未提交）\n"),a("ul",[a("li",[t._v("ID 最小值记为低水位；ID 最大值加 1 作为高水位；")]),t._v(" "),a("li",[t._v("数组和高水位共同组成一致性阅读视图。")]),t._v(" "),a("li",[t._v("数据版本可见性规则："),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("所有事务：\n[已提交事务 [未提交事务集合] 未开始事务]\n         ^       ↑      ^\n       低水位  当前事务 高水位\n\n活跃事务数组：\n[低水位，……，高水位+1]\n")])])]),t._v("以可重复读隔离级别为例：\n"),a("ul",[a("li",[t._v("当 row trx_id 落在已提交事务，说明当前版本是已提交的事务或当前事务自己生成的。该数据可见；")]),t._v(" "),a("li",[t._v("当 row trx_id 落在未开始事务，说明当前版本是将来事务生成的。数据不可见；")]),t._v(" "),a("li",[t._v("当 row trx_id 落在未提交事务集合，则对比事务数组（因为序列会标记事务开始时已经提交事务为低水位，其后都标记为未提交或未开始。但这里面的事务有可能会在后续提交）：\n"),a("ul",[a("li",[t._v("若 row trx_id 在数组中，表示当前版本是还未提交事务生成。数据不可见；")]),t._v(" "),a("li",[t._v("若 row trx_id 不在数组中，表示当前版本是已提交的事务生成的。该数据可见。")])])])])])])])]),t._v(" "),a("p",[t._v("总结下来：一个记录的版本对于一致性阅读视图来说有：")]),t._v(" "),a("ul",[a("li",[t._v("事务自己更新该记录，可见；")]),t._v(" "),a("li",[t._v("版本未提交，不可见；")]),t._v(" "),a("li",[t._v("版本已提交，在创建阅读视图后提交，不可见；")]),t._v(" "),a("li",[t._v("版本已提交，在创建阅读视图前提交，可见。")])]),t._v(" "),a("h2",{attrs:{id:"启动方式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#启动方式"}},[t._v("#")]),t._v(" 启动方式")]),t._v(" "),a("ol",[a("li",[t._v("显示启动。\n使用 "),a("code",[t._v("begin transaction")]),t._v(" 或者 "),a("code",[t._v("start transaction")]),t._v(" 来启动，提交语句是 "),a("code",[t._v("commit")]),t._v(", 回滚语句是 "),a("code",[t._v("rollback")]),t._v(". 这种启动方式会在它之后第一个操作表的语句开启事务。如果想立即启动一个事务，使用 "),a("code",[t._v("start transaction with consistent snapshot")]),t._v("."),a("br"),t._v("\n在读提交级别下，"),a("code",[t._v("start transaction with consistent snapshot")]),t._v(" 等同于 "),a("code",[t._v("begin transaction")]),t._v(", 因为它每个语句都会创建一个一致性阅读视图。")]),t._v(" "),a("li",[t._v("设置关闭线程自动提交。\n使用 "),a("code",[t._v("set autocommit=0")]),t._v(" 来关闭自动提交。当就算只执行一个 SELECT 语句时也会开启一个事务。这个事务只有当主动 commit 或 rollback，或者断开连接时才结束。"),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[t._v("特别地")]),t._v(" "),a("p",[t._v("为避免有些客户端框架在连接成功后自动执行 "),a("code",[t._v("set autocommit=0")]),t._v(" 的命令造成长连接带来的长事务，推荐使用 "),a("code",[t._v("set autocommit=1")]),t._v(" 并用显示的方式启动事务。")])])])]),t._v(" "),a("h3",{attrs:{id:"提交并开启下一个事务"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#提交并开启下一个事务"}},[t._v("#")]),t._v(" 提交并开启下一个事务")]),t._v(" "),a("p",[t._v("在显示使用事务的时候，可以使用 "),a("code",[t._v("commit workk and chain")]),t._v(" 命令来提交当前事务并开启下一个事务。这样可以减少执行一次 "),a("code",[t._v("begin")]),t._v(" 语句的交互开销，也可以知道每个语句是否在事务中。")]),t._v(" "),a("p",[a("strong",[t._v("查找长事务")]),a("br"),t._v("\n使用命令来查找时间超过 60 秒的事务:")]),t._v(" "),a("div",{staticClass:"language-SQL extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sql"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("SELECT")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" \n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("FROM")]),t._v(" information_schema"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("innodb_trx \n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("WHERE")]),t._v(" TIME_TO_SEC"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("timediff"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("now")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("trx_started"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("60")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])}),[],!1,null,null,null);e.default=v.exports}}]);