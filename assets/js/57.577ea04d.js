(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{497:function(t,a,Q){"use strict";Q.r(a);var T=Q(20),r=Object(T.a)({},(function(){var t=this,a=t.$createElement,Q=t._self._c||a;return Q("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[Q("h1",{attrs:{id:"集群"}},[Q("a",{staticClass:"header-anchor",attrs:{href:"#集群"}},[t._v("#")]),t._v(" 集群")]),t._v(" "),Q("h2",{attrs:{id:"redis-切片集群"}},[Q("a",{staticClass:"header-anchor",attrs:{href:"#redis-切片集群"}},[t._v("#")]),t._v(" Redis 切片集群 "),Q("Badge",{attrs:{text:"Redis 3.0+"}})],1),t._v(" "),Q("p",[t._v("在数据量很大的情况下，Redis 使用 RDB 进行持久化时会通过 fork 子进程来完成。而 fork 操作会阻塞主进程，而且 fork 操作需要的时间与数据量大小正相关，这样会导致 Redis 响应变慢。")]),t._v(" "),Q("p",[t._v("使用切片集群来启动一组 Redis 实例组成一个集群，将数据按照一定规则切分成多份分别保存在不同实例中。对于单个集群来说，数据量变小，Redis 响应时间不会过分变慢。")]),t._v(" "),Q("p",[t._v("这样的扩展称为横向扩展。对应打的纵向扩展指升级单个实例的配置资源。")]),t._v(" "),Q("h3",{attrs:{id:"一致性哈希算法"}},[Q("a",{staticClass:"header-anchor",attrs:{href:"#一致性哈希算法"}},[t._v("#")]),t._v(" 一致性哈希算法")]),t._v(" "),Q("p",[t._v("一致性哈希算法是麻省理工大学的 David Karger 及其合作者发明的一种特殊的哈希算法。它可以用来解决分布式情况下数据映射的问题。")]),t._v(" "),Q("p",[t._v("在这个算法中，将整个哈希值空间组织到了一个虚拟的圆环中。例如哈希空间 "),Q("mjx-container",{staticClass:"MathJax",attrs:{jax:"SVG"}},[Q("svg",{staticStyle:{"vertical-align":"-0.05ex"},attrs:{xmlns:"http://www.w3.org/2000/svg",width:"1.131ex",height:"1.557ex",viewBox:"0 -666 500 688"}},[Q("g",{attrs:{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"matrix(1 0 0 -1 0 0)"}},[Q("g",{attrs:{"data-mml-node":"math"}},[Q("g",{attrs:{"data-mml-node":"mn"}},[Q("path",{attrs:{"data-c":"30",d:"M96 585Q152 666 249 666Q297 666 345 640T423 548Q460 465 460 320Q460 165 417 83Q397 41 362 16T301 -15T250 -22Q224 -22 198 -16T137 16T82 83Q39 165 39 320Q39 494 96 585ZM321 597Q291 629 250 629Q208 629 178 597Q153 571 145 525T137 333Q137 175 145 125T181 46Q209 16 250 16Q290 16 318 46Q347 76 354 130T362 333Q362 478 354 524T321 597Z"}})])])])])]),t._v(" 到 "),Q("mjx-container",{staticClass:"MathJax",attrs:{jax:"SVG"}},[Q("svg",{staticStyle:{"vertical-align":"-0.186ex"},attrs:{xmlns:"http://www.w3.org/2000/svg",width:"5.736ex",height:"2.072ex",viewBox:"0 -833.9 2535.1 915.9"}},[Q("g",{attrs:{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"matrix(1 0 0 -1 0 0)"}},[Q("g",{attrs:{"data-mml-node":"math"}},[Q("g",{attrs:{"data-mml-node":"msup"}},[Q("g",{attrs:{"data-mml-node":"mn"}},[Q("path",{attrs:{"data-c":"32",d:"M109 429Q82 429 66 447T50 491Q50 562 103 614T235 666Q326 666 387 610T449 465Q449 422 429 383T381 315T301 241Q265 210 201 149L142 93L218 92Q375 92 385 97Q392 99 409 186V189H449V186Q448 183 436 95T421 3V0H50V19V31Q50 38 56 46T86 81Q115 113 136 137Q145 147 170 174T204 211T233 244T261 278T284 308T305 340T320 369T333 401T340 431T343 464Q343 527 309 573T212 619Q179 619 154 602T119 569T109 550Q109 549 114 549Q132 549 151 535T170 489Q170 464 154 447T109 429Z"}})]),Q("g",{attrs:{"data-mml-node":"TeXAtom",transform:"translate(500, 363) scale(0.707)"}},[Q("g",{attrs:{"data-mml-node":"mn"}},[Q("path",{attrs:{"data-c":"33",d:"M127 463Q100 463 85 480T69 524Q69 579 117 622T233 665Q268 665 277 664Q351 652 390 611T430 522Q430 470 396 421T302 350L299 348Q299 347 308 345T337 336T375 315Q457 262 457 175Q457 96 395 37T238 -22Q158 -22 100 21T42 130Q42 158 60 175T105 193Q133 193 151 175T169 130Q169 119 166 110T159 94T148 82T136 74T126 70T118 67L114 66Q165 21 238 21Q293 21 321 74Q338 107 338 175V195Q338 290 274 322Q259 328 213 329L171 330L168 332Q166 335 166 348Q166 366 174 366Q202 366 232 371Q266 376 294 413T322 525V533Q322 590 287 612Q265 626 240 626Q208 626 181 615T143 592T132 580H135Q138 579 143 578T153 573T165 566T175 555T183 540T186 520Q186 498 172 481T127 463Z"}}),Q("path",{attrs:{"data-c":"32",d:"M109 429Q82 429 66 447T50 491Q50 562 103 614T235 666Q326 666 387 610T449 465Q449 422 429 383T381 315T301 241Q265 210 201 149L142 93L218 92Q375 92 385 97Q392 99 409 186V189H449V186Q448 183 436 95T421 3V0H50V19V31Q50 38 56 46T86 81Q115 113 136 137Q145 147 170 174T204 211T233 244T261 278T284 308T305 340T320 369T333 401T340 431T343 464Q343 527 309 573T212 619Q179 619 154 602T119 569T109 550Q109 549 114 549Q132 549 151 535T170 489Q170 464 154 447T109 429Z",transform:"translate(500, 0)"}})])])]),Q("g",{attrs:{"data-mml-node":"mo",transform:"translate(1257.1, 0)"}},[Q("path",{attrs:{"data-c":"2212",d:"M84 237T84 250T98 270H679Q694 262 694 250T679 230H98Q84 237 84 250Z"}})]),Q("g",{attrs:{"data-mml-node":"mn",transform:"translate(2035.1, 0)"}},[Q("path",{attrs:{"data-c":"31",d:"M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z"}})])])])])]),t._v(", 我们先对服务器节点和数据分别进行 hash 计算来确定它们在圆环上的位置。其中对服务器节点可以使用它们的 IP 或者 名称作为 hash 函数的参数。")],1),t._v(" "),Q("p",[t._v("这样以来，服务器和所有的数据都被散列到了这个圆环上。之后判断每个数据点所属的服务器方法是：从数据点开始顺时针旋转，遇到的第一个服务器节点就是它会被存放的服务器节点。")]),t._v(" "),Q("p",[t._v("为了防止服务器节点过于集中而造成数据倾斜，引入虚拟节点的概念。对每个服务器计算多个 hash, 这些位置成为虚拟节点，它们都对应着同一个真实节点。通过这样引入众多节点的方式来使得数据尽可能的分布均匀。")]),t._v(" "),Q("h3",{attrs:{id:"redis-cluster"}},[Q("a",{staticClass:"header-anchor",attrs:{href:"#redis-cluster"}},[t._v("#")]),t._v(" Redis Cluster")]),t._v(" "),Q("p",[t._v("在 Redis 中提供了 Redis Cluster 方案来支持切片集群。它实现数据与 Redis 实例之间关系的方式不完全等同一致性哈希算法，它采用了哈希槽的概念。")]),t._v(" "),Q("p",[Q("strong",[t._v("数据映射")]),Q("br"),t._v("\n在一个切片集群中一共拥有 16384 个哈希槽。这些槽类似数据分区，每个数据都会根据 key 被映射到一个哈希槽中。逻辑为：利用 key, 将它按照 CRC16 算法得到一个 16 位的值。再将这个值对 16384 取模，得到一个 0 到 16384 之间的数字。这个数字就是这个数据会被映射到的哈希槽编号。")]),t._v(" "),Q("p",[t._v("当使用 "),Q("code",[t._v("cluster create")]),t._v(" 命令来创建集群时，哈希槽与具体 Redis 实例之间的对应是平均的。当集群中有 n 个 Redis 实例时，每个实例负责 "),Q("mjx-container",{staticClass:"MathJax",attrs:{jax:"SVG"}},[Q("svg",{staticStyle:{"vertical-align":"-0.566ex"},attrs:{xmlns:"http://www.w3.org/2000/svg",width:"8.145ex",height:"2.262ex",viewBox:"0 -750 3600 1000"}},[Q("g",{attrs:{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"matrix(1 0 0 -1 0 0)"}},[Q("g",{attrs:{"data-mml-node":"math"}},[Q("g",{attrs:{"data-mml-node":"mn"}},[Q("path",{attrs:{"data-c":"31",d:"M213 578L200 573Q186 568 160 563T102 556H83V602H102Q149 604 189 617T245 641T273 663Q275 666 285 666Q294 666 302 660V361L303 61Q310 54 315 52T339 48T401 46H427V0H416Q395 3 257 3Q121 3 100 0H88V46H114Q136 46 152 46T177 47T193 50T201 52T207 57T213 61V578Z"}}),Q("path",{attrs:{"data-c":"36",d:"M42 313Q42 476 123 571T303 666Q372 666 402 630T432 550Q432 525 418 510T379 495Q356 495 341 509T326 548Q326 592 373 601Q351 623 311 626Q240 626 194 566Q147 500 147 364L148 360Q153 366 156 373Q197 433 263 433H267Q313 433 348 414Q372 400 396 374T435 317Q456 268 456 210V192Q456 169 451 149Q440 90 387 34T253 -22Q225 -22 199 -14T143 16T92 75T56 172T42 313ZM257 397Q227 397 205 380T171 335T154 278T148 216Q148 133 160 97T198 39Q222 21 251 21Q302 21 329 59Q342 77 347 104T352 209Q352 289 347 316T329 361Q302 397 257 397Z",transform:"translate(500, 0)"}}),Q("path",{attrs:{"data-c":"33",d:"M127 463Q100 463 85 480T69 524Q69 579 117 622T233 665Q268 665 277 664Q351 652 390 611T430 522Q430 470 396 421T302 350L299 348Q299 347 308 345T337 336T375 315Q457 262 457 175Q457 96 395 37T238 -22Q158 -22 100 21T42 130Q42 158 60 175T105 193Q133 193 151 175T169 130Q169 119 166 110T159 94T148 82T136 74T126 70T118 67L114 66Q165 21 238 21Q293 21 321 74Q338 107 338 175V195Q338 290 274 322Q259 328 213 329L171 330L168 332Q166 335 166 348Q166 366 174 366Q202 366 232 371Q266 376 294 413T322 525V533Q322 590 287 612Q265 626 240 626Q208 626 181 615T143 592T132 580H135Q138 579 143 578T153 573T165 566T175 555T183 540T186 520Q186 498 172 481T127 463Z",transform:"translate(1000, 0)"}}),Q("path",{attrs:{"data-c":"38",d:"M70 417T70 494T124 618T248 666Q319 666 374 624T429 515Q429 485 418 459T392 417T361 389T335 371T324 363L338 354Q352 344 366 334T382 323Q457 264 457 174Q457 95 399 37T249 -22Q159 -22 101 29T43 155Q43 263 172 335L154 348Q133 361 127 368Q70 417 70 494ZM286 386L292 390Q298 394 301 396T311 403T323 413T334 425T345 438T355 454T364 471T369 491T371 513Q371 556 342 586T275 624Q268 625 242 625Q201 625 165 599T128 534Q128 511 141 492T167 463T217 431Q224 426 228 424L286 386ZM250 21Q308 21 350 55T392 137Q392 154 387 169T375 194T353 216T330 234T301 253T274 270Q260 279 244 289T218 306L210 311Q204 311 181 294T133 239T107 157Q107 98 150 60T250 21Z",transform:"translate(1500, 0)"}}),Q("path",{attrs:{"data-c":"34",d:"M462 0Q444 3 333 3Q217 3 199 0H190V46H221Q241 46 248 46T265 48T279 53T286 61Q287 63 287 115V165H28V211L179 442Q332 674 334 675Q336 677 355 677H373L379 671V211H471V165H379V114Q379 73 379 66T385 54Q393 47 442 46H471V0H462ZM293 211V545L74 212L183 211H293Z",transform:"translate(2000, 0)"}})]),Q("g",{attrs:{"data-mml-node":"TeXAtom",transform:"translate(2500, 0)"}},[Q("g",{attrs:{"data-mml-node":"mo"}},[Q("path",{attrs:{"data-c":"2F",d:"M423 750Q432 750 438 744T444 730Q444 725 271 248T92 -240Q85 -250 75 -250Q68 -250 62 -245T56 -231Q56 -221 230 257T407 740Q411 750 423 750Z"}})])]),Q("g",{attrs:{"data-mml-node":"mi",transform:"translate(3000, 0)"}},[Q("path",{attrs:{"data-c":"6E",d:"M21 287Q22 293 24 303T36 341T56 388T89 425T135 442Q171 442 195 424T225 390T231 369Q231 367 232 367L243 378Q304 442 382 442Q436 442 469 415T503 336T465 179T427 52Q427 26 444 26Q450 26 453 27Q482 32 505 65T540 145Q542 153 560 153Q580 153 580 145Q580 144 576 130Q568 101 554 73T508 17T439 -10Q392 -10 371 17T350 73Q350 92 386 193T423 345Q423 404 379 404H374Q288 404 229 303L222 291L189 157Q156 26 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 112 180T152 343Q153 348 153 366Q153 405 129 405Q91 405 66 305Q60 285 60 284Q58 278 41 278H27Q21 284 21 287Z"}})])])])])]),t._v(" 个哈希槽。"),Q("br"),t._v("\n当使用 "),Q("code",[t._v("cluster meet")]),t._v(" 命令手动建立实例之间的连接来形成集群时，可以使用 "),Q("code",[t._v("cluster addslot")]),t._v(" 命令来给每个实例指定哈希槽数量。但是手动指定必须将 16384 个槽都分配好，否则集群无法正常工作。")],1),t._v(" "),Q("p",[Q("strong",[t._v("客户端定位数据")]),Q("br"),t._v("\n当 Redis 建立好集群后，具体实例会将自己所负责的槽信息广播给相连的其他实例，这样当客户端和集群建立连接后访问其中一个实例就能知道所有实例负责的槽信息。之后客户端会将哈希槽信息缓存到本地。当客户端请求键值对时，先根据键来计算哈希槽，再根据槽信息找到对应的实例并发送请求。")]),t._v(" "),Q("p",[t._v("每一个 Redis 实例都会维护一个 16384 位的二进制位序列和一个大小为 16384 的共享数组。当一个实例需要负责哈希槽 k 时，二进制位序列中槽道序号对应的位，第 k 位，会被赋值为是 1. 共享数组被所有实例共同维护。"),Q("br"),t._v("\n集群中共同维护的数组中保存了数组下标对应的槽道由哪个实例负责。实例的 ip 和端口号会被保存到数组中。")]),t._v(" "),Q("p",[Q("strong",[t._v("重分片")]),Q("br"),t._v("\n当集群发生变动时，哈希槽会发生重分片(Reshard)操作。")]),t._v(" "),Q("ul",[Q("li",[t._v("集群中 Redis 实例发生增减；")]),t._v(" "),Q("li",[t._v("负载均衡。")])]),t._v(" "),Q("p",[t._v("当发生重分片时，实例负责的槽道会发生变化。具体数据和槽道一一对应，所以在重分片后数据存放根据槽道变动。槽道发生变动的数据在对 key 计算哈希取模后找到新的槽道号，并进行移动到新的实例中。实例之间广播槽信息获得新的整体槽信息。"),Q("br"),t._v("\n具体过程：")]),t._v(" "),Q("ul",[Q("li",[t._v("确定新的哈希槽归属")]),t._v(" "),Q("li",[t._v("减少槽道的实例中位序列变化，不需要的被标为 0")]),t._v(" "),Q("li",[t._v("新增槽道的示例中位序列变化，需要的被标记为 1")]),t._v(" "),Q("li",[t._v("共享数组中清空减少槽道实例中负责的被减少的槽道下标数据")]),t._v(" "),Q("li",[t._v("共享数组中赋值增加槽道实例中负责的被增加的槽道下标数据，内容为自己的 ip 和端口号")]),t._v(" "),Q("li",[t._v("确定数据归属，所以 key 重新计算，根据转发逻辑将数据传输到对应的实例中")])]),t._v(" "),Q("p",[Q("strong",[t._v("重定向机制")]),Q("br"),t._v("\n在服务器端变动完成后，客户端并没有拿到最新的槽道与数据信息，所以当客户端对某实例进行数据请求时，可能会发生重定向。具体分为两种情况：")]),t._v(" "),Q("ol",[Q("li",[t._v("当前实例中数据迁移结束，已经完全被移动到另一个实例中"),Q("br"),t._v("\nRedis 会返回一个 "),Q("code",[t._v("MOVE")]),t._v(" 错误信息，包含了该数据所在新实例的信息。客户端可以和新实例进行连接获取数据，并把更新后的该槽道与实例的对应关系缓存进行更新。")]),t._v(" "),Q("li",[t._v("当前实例中数据正在迁移，只有一部分数据移动到了另一个实例中"),Q("br"),t._v("\nRedis 会返回一个 "),Q("code",[t._v("ASK")]),t._v(" 错误信息，包含了该数据所在新实例的信息。当客户端对新实例发送 "),Q("code",[t._v("ASKING")]),t._v(" 命令来询问是否允许客户端进行后续的命令执行，允许则使用 "),Q("code",[t._v("GET")]),t._v(" 命令来获取数据。但 "),Q("code",[t._v("ASK")]),t._v(" 不会给客户端提供槽道的新对应关系，如果后续客户端提交同样的请求，还是会被发到原来的实例。")])])])}),[],!1,null,null,null);a.default=r.exports}}]);