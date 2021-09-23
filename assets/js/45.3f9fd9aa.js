(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{421:function(t,a,s){"use strict";s.r(a);var r=s(17),_=Object(r.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"锁"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#锁"}},[t._v("#")]),t._v(" 锁")]),t._v(" "),s("p",[t._v("为了解决并发操作可能会出现的问题，MySQL 提供了锁机制。根据加锁范围，分为全局锁、表级锁和行级锁。")]),t._v(" "),s("h2",{attrs:{id:"全局锁"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#全局锁"}},[t._v("#")]),t._v(" 全局锁")]),t._v(" "),s("p",[t._v("使用命令 "),s("code",[t._v("FLUSH TABLES WITH READ LOCK")]),t._v(" 让整个库处于只读状态。之后其他线程的 DDL(数据定义语言，包括创建表、修改表等)、DML(数据操作语言，包括增、删、改)和更新类的事务的提交语句会被阻塞。"),s("br"),t._v("\n使用 "),s("code",[t._v("UNLOCK TABLES")]),t._v(" 解锁。")]),t._v(" "),s("h3",{attrs:{id:"使用场景"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#使用场景"}},[t._v("#")]),t._v(" 使用场景")]),t._v(" "),s("p",[t._v("当在进行全库逻辑备份（所有记录查找并保存到文本）时，可以考虑使用全局锁。")]),t._v(" "),s("ul",[s("li",[t._v("必要性"),s("br"),t._v("\n可能会发生数据不一致。在不加全局锁的情形下，因为不同表之间执行顺序不同备份时间就不同。若一张表在备份时间差内进行了更新操作，则它会与已经备份的关联表数据不一致。"),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[t._v("一个有限制条件的解决方案")]),t._v(" "),s("p",[t._v("可以利用可重复读的事务来解决。在支持事务的引擎里，比如 InnoDB 提供了逻辑备份工具 mysqldump. 使用参数 "),s("code",[t._v("-single-transaction")]),t._v(" 来使用它时会在导入数据前启动一个事务，保证视图的一致性。且由于多版本并发控制 （MVCC），在备份过程中可以进行更新操作。")])])]),t._v(" "),s("li",[t._v("缺点\n"),s("ul",[s("li",[t._v("在主库备份时，FTWRL 会使得主库不能执行更新操作，业务停摆；")]),t._v(" "),s("li",[t._v("若是读写分离的主从库模式，从库备份时，从库不能执行主库同步的 binglog 导致主从延迟。")])])])]),t._v(" "),s("div",{staticClass:"custom-block warning"},[s("p",{staticClass:"custom-block-title"},[t._v("关于设置全局只读的解决方法")]),t._v(" "),s("p",[t._v("使用 "),s("code",[t._v("set global readonly=true")]),t._v(" 也可以使得整个库处于只读的状态，但会带来一些问题：")]),t._v(" "),s("ul",[s("li",[t._v("在一些主从库中，会使用 readonly 作为逻辑判断是否是从库；")]),t._v(" "),s("li",[t._v("当客户端发生异常断开时，readonly 不会改变库的状态，依旧保持只读会导致库处于长时间不可写状态。 FTWRL 在发生断开时会自动释放全局锁，让库恢复可以正常更新的状态。")])])]),t._v(" "),s("h2",{attrs:{id:"表级锁"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#表级锁"}},[t._v("#")]),t._v(" 表级锁")]),t._v(" "),s("p",[t._v("表锁分为两种：表锁和元数据锁。")]),t._v(" "),s("h3",{attrs:{id:"表锁"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#表锁"}},[t._v("#")]),t._v(" 表锁")]),t._v(" "),s("p",[t._v("使用 "),s("code",[t._v("LOCK TABLES $table READ/WRITE")]),t._v(" 来对表进行锁定。它使用 "),s("code",[t._v("UNLOCK TABLES")]),t._v(" 主动解锁或在客户端断开连接时自动释放锁。它不仅限制别的线程的读或写，也限制本线程的操作：")]),t._v(" "),s("ul",[s("li",[t._v("线程 A 对某表添加读锁，线程 A 和其他线程都不能对表进行写操作。同时线程 A 不可以读写其他未加锁的表；")]),t._v(" "),s("li",[t._v("线程 A 对某表添加写锁，线程 A 可以对表进行写操作，其他线程对表读写都阻塞；")])]),t._v(" "),s("p",[t._v("理解为共享读锁，独占写锁。表锁在没有更细粒度的锁出现前，是最常用的并发处理机制。")]),t._v(" "),s("h3",{attrs:{id:"元数据锁-metadata-lock"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#元数据锁-metadata-lock"}},[t._v("#")]),t._v(" 元数据锁 (Metadata Lock) "),s("Badge",{attrs:{text:"MySQL 5.5+"}})],1),t._v(" "),s("p",[t._v("元数据锁会在一个表被访问时自动加锁而不需要显示使用，是一个 Server 层的锁。它可以保证读写的正确性。MDL 在语句开始时申请，事务结束后释放。")]),t._v(" "),s("ul",[s("li",[t._v("当一个表在进行增删改查时会添加读锁，此时所有线程都可以正常读取元数据，不影响增删改查。（读锁之间不互斥，多个线程可以对同一张表进行增删改查）")]),t._v(" "),s("li",[t._v("当一个表正在进行结构更改操作时加写锁，只有拥有锁的线程可以读写元数据，其他线程不能执行任何操作。（写锁与读锁、写锁与写锁互斥，保证结构变更安全性）")])]),t._v(" "),s("p",[t._v("申请 MDL 的操作会形成一个队列，其中写锁优先级高于读锁。所以当一个写锁处于阻塞时，当前和后续所有操作都会被阻塞。所以情况如：事务 A 的查询操作触发 MDL 读锁，事务 B 包含 DDL 语句被阻塞，事务 C 有查询语句，但是因为优先级也被阻塞。意味着后续任何操作都会被阻塞。"),s("br"),t._v("\n当一个事务拿到 MDL 后，只有当事务结束时才会释放锁。如果事务包含 DDL，这样它会在 DDL 执行前隐式提交事务以保障 DDL 处于一个单独的事务中，这时也会释放 MDL。")]),t._v(" "),s("p",[s("strong",[t._v("解决方案")])]),t._v(" "),s("ul",[s("li",[t._v("解决长事务。查询 information_schema 库中的 innodb_trx 表，若要执行 DDL 的表正好在长事务，可以暂停 DDL 或者 kill 长事务。")]),t._v(" "),s("li",[t._v("如果目标表是热点表，就在 DDL 中设置超时时间，在规定时间内拿到 MDL 写锁即执行，拿不到则放弃。后续重试。")])]),t._v(" "),s("div",{staticClass:"language-sql extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sql"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("ALTER")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("TABLE")]),t._v(" tbl_name NOWAIT "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("add")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("column")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("ALTER")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("TABLE")]),t._v(" tbl_name WAIT N "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("add")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("column")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v(" \n")])])]),s("h2",{attrs:{id:"行级锁"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#行级锁"}},[t._v("#")]),t._v(" 行级锁")]),t._v(" "),s("p",[t._v("行级锁由引擎实现，MyISAM 不支持行级锁。对于同一行记录，当事务 A 和事务 B 都想更新它时，必须等事务 A 操作完成后 B 才执行。")]),t._v(" "),s("h3",{attrs:{id:"两段锁"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#两段锁"}},[t._v("#")]),t._v(" 两段锁")]),t._v(" "),s("p",[t._v("行锁在需要时被加，事务结束后释放。当一个事务需要锁定多个行时，应当吧最可能造成冲突和影响并发度的锁向后放，从而减少一次操作中锁定共享数据的时间，提升效率。")]),t._v(" "),s("h3",{attrs:{id:"死锁检测"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#死锁检测"}},[t._v("#")]),t._v(" 死锁检测")]),t._v(" "),s("p",[t._v("当不同线程出现循环资源依赖时，每个线程都在等其他线程释放资源，进入死锁状态。为了避免死锁，有两种方法：")]),t._v(" "),s("ul",[s("li",[t._v("通过设置参数 "),s("code",[t._v("innodb_lock_wait_timeout")]),t._v(" 来设置超时，如果等待超过预定时间则放弃。超时时间不容易控制，默认为 50 秒，但一般对于在线服务来说这个时间；如果设置过短，对于短等待事务不合理；")]),t._v(" "),s("li",[t._v("通过设置参数 "),s("code",[t._v("innodb_deadlock_detect")]),t._v(" 为 "),s("code",[t._v("on")]),t._v(" 来开启死锁检测，当发现死锁后主动回滚其中一个事务，让其他事务继续。死锁检测的操作是 "),s("mjx-container",{staticClass:"MathJax",attrs:{jax:"SVG"}},[s("svg",{staticStyle:{"vertical-align":"-0.566ex"},attrs:{xmlns:"http://www.w3.org/2000/svg",width:"5.757ex",height:"2.452ex",viewBox:"0 -833.9 2544.6 1083.9"}},[s("g",{attrs:{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"matrix(1 0 0 -1 0 0)"}},[s("g",{attrs:{"data-mml-node":"math"}},[s("g",{attrs:{"data-mml-node":"mi"}},[s("path",{attrs:{"data-c":"4F",d:"M740 435Q740 320 676 213T511 42T304 -22Q207 -22 138 35T51 201Q50 209 50 244Q50 346 98 438T227 601Q351 704 476 704Q514 704 524 703Q621 689 680 617T740 435ZM637 476Q637 565 591 615T476 665Q396 665 322 605Q242 542 200 428T157 216Q157 126 200 73T314 19Q404 19 485 98T608 313Q637 408 637 476Z"}})]),s("g",{attrs:{"data-mml-node":"mo",transform:"translate(763, 0)"}},[s("path",{attrs:{"data-c":"28",d:"M94 250Q94 319 104 381T127 488T164 576T202 643T244 695T277 729T302 750H315H319Q333 750 333 741Q333 738 316 720T275 667T226 581T184 443T167 250T184 58T225 -81T274 -167T316 -220T333 -241Q333 -250 318 -250H315H302L274 -226Q180 -141 137 -14T94 250Z"}})]),s("g",{attrs:{"data-mml-node":"msup",transform:"translate(1152, 0)"}},[s("g",{attrs:{"data-mml-node":"mi"}},[s("path",{attrs:{"data-c":"6E",d:"M21 287Q22 293 24 303T36 341T56 388T89 425T135 442Q171 442 195 424T225 390T231 369Q231 367 232 367L243 378Q304 442 382 442Q436 442 469 415T503 336T465 179T427 52Q427 26 444 26Q450 26 453 27Q482 32 505 65T540 145Q542 153 560 153Q580 153 580 145Q580 144 576 130Q568 101 554 73T508 17T439 -10Q392 -10 371 17T350 73Q350 92 386 193T423 345Q423 404 379 404H374Q288 404 229 303L222 291L189 157Q156 26 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 112 180T152 343Q153 348 153 366Q153 405 129 405Q91 405 66 305Q60 285 60 284Q58 278 41 278H27Q21 284 21 287Z"}})]),s("g",{attrs:{"data-mml-node":"mn",transform:"translate(600, 363) scale(0.707)"}},[s("path",{attrs:{"data-c":"32",d:"M109 429Q82 429 66 447T50 491Q50 562 103 614T235 666Q326 666 387 610T449 465Q449 422 429 383T381 315T301 241Q265 210 201 149L142 93L218 92Q375 92 385 97Q392 99 409 186V189H449V186Q448 183 436 95T421 3V0H50V19V31Q50 38 56 46T86 81Q115 113 136 137Q145 147 170 174T204 211T233 244T261 278T284 308T305 340T320 369T333 401T340 431T343 464Q343 527 309 573T212 619Q179 619 154 602T119 569T109 550Q109 549 114 549Q132 549 151 535T170 489Q170 464 154 447T109 429Z"}})])]),s("g",{attrs:{"data-mml-node":"mo",transform:"translate(2155.6, 0)"}},[s("path",{attrs:{"data-c":"29",d:"M60 749L64 750Q69 750 74 750H86L114 726Q208 641 251 514T294 250Q294 182 284 119T261 12T224 -76T186 -143T145 -194T113 -227T90 -246Q87 -249 86 -250H74Q66 -250 63 -250T58 -247T55 -238Q56 -237 66 -225Q221 -64 221 250T66 725Q56 737 55 738Q55 746 60 749Z"}})])])])])]),t._v(" 级别的。会造成 CPU 利用率高。"),s("br"),t._v("\n解决方案：\n"),s("ul",[s("li",[t._v("如果能保证业务不会出现死锁，临时关闭死锁检测。但可能带来大量超时，业务有损。")]),t._v(" "),s("li",[t._v("控制并发度。编写中间件，或者修改 MySQL 源码，使得同行更新在进入引擎前进行排队。")]),t._v(" "),s("li",[t._v("业务进行逻辑分段。")])])],1)])])}),[],!1,null,null,null);a.default=_.exports}}]);