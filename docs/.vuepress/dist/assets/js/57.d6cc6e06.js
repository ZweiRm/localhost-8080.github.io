(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{602:function(v,_,r){"use strict";r.r(_);var t=r(21),n=Object(t.a)({},(function(){var v=this,_=v.$createElement,r=v._self._c||_;return r("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[r("h1",{attrs:{id:"缓存"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#缓存"}},[v._v("#")]),v._v(" 缓存")]),v._v(" "),r("h2",{attrs:{id:"缓存异常"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#缓存异常"}},[v._v("#")]),v._v(" 缓存异常")]),v._v(" "),r("h3",{attrs:{id:"数据不一致"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#数据不一致"}},[v._v("#")]),v._v(" 数据不一致")]),v._v(" "),r("p",[v._v("数据一致要求：")]),v._v(" "),r("ul",[r("li",[v._v("当缓存中有数据时，数据值需与数据库相同；")]),v._v(" "),r("li",[v._v("缓存中没有数据时，数据库的值是最新的。")])]),v._v(" "),r("p",[r("strong",[v._v("读写缓存")]),r("br"),v._v("\n对于在缓存进行修改后，写回到数据库有两种策略：")]),v._v(" "),r("ul",[r("li",[v._v("同步写回：修改缓存的时候同步修改数据库，使得缓存与数据库中数据一致；\n在业务中使用事务机制，保证缓存和数据库更新原子性。")]),v._v(" "),r("li",[v._v("异步写回：修改缓存后不立刻修改数据库，等到数据从缓存淘汰时再写回。"),r("br"),v._v("\n在数据一致性要求不高时，使用异步写回。")])]),v._v(" "),r("p",[r("strong",[v._v("只读缓存")]),v._v("：如果有新增数据直接写回数据库；删改时将缓存数据标记为无效，则发生数据缺失而直接去数据库中的数据读入缓存。")]),v._v(" "),r("p",[r("strong",[v._v("新增数据")]),r("br"),v._v("\n数据直接写入到数据库中，不对缓存做修改。（符合缓存中没有数据，数据库是最新的。是数据一致的）")]),v._v(" "),r("p",[r("strong",[v._v("修改/删除数据")]),r("br"),v._v("\n需要保证原子性，不然会发生数据不一致：")]),v._v(" "),r("ul",[r("li",[v._v("先删除缓存，再删数据库。若缓存删除成功，数据库删除失败。下次访问时，缓存中数据缺失，去数据库中查找出为旧值。")]),v._v(" "),r("li",[v._v("先删数据库，再删缓存。数据库更新后，缓存未更新，数据不一致。请求访问缓存取到的是旧值。")])]),v._v(" "),r("p",[r("strong",[v._v("解决方法")]),r("br"),v._v("\n重试机制：把要删除或更新的数据存放到消息队列中。如果没有成功删除或者更新数据库值时，可以从消息队列中重新读取，再次尝试更新。如果重试一定次数后仍不成功，向业务层发送报错信息。如果成功删除或更新数据库值后，将该数据从消息队列中移除。")]),v._v(" "),r("p",[r("strong",[v._v("多线程情况下删除数据的问题")])]),v._v(" "),r("ul",[r("li",[v._v("先删除缓存，再删除数据库。"),r("br"),v._v("\nA 线程删除缓存但没来得及更新数据库，B 线程读取数据发现数据缺失，去数据库中读取。"),r("br"),v._v("\n导致 B 线程读取到了旧值，它还会把旧值放回到缓存中，让其他线程读取到旧值。"),r("br"),v._v("\nA 线程继续修改数据库。数据库中的值和缓存中不一致。"),r("br"),v._v(" "),r("strong",[v._v("解决方法")]),v._v("：延迟双删。A 线程删除缓存和数据库后 sleep 一段时间。在这段时间里让 B 线程完成读取旧值并填充回缓存。之后再次删除缓存一次。这样其他线程请求会发现值缺失而去访问数据库并把新值存到缓存中。")]),v._v(" "),r("li",[v._v("先删除数据库，再删除缓存。"),r("br"),v._v("\nA 线程删除数据库但没来得及删除缓存， B 线程读取数据从缓存中拿到旧值。"),r("br"),v._v("\n该问题影响不大，A 线程也会在短时间内删除缓存中的内容。读到旧值的数量不会很多。")])]),v._v(" "),r("h3",{attrs:{id:"缓存雪崩"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#缓存雪崩"}},[v._v("#")]),v._v(" 缓存雪崩")]),v._v(" "),r("p",[v._v("指大量请求无法在缓存中处理，这些请求会发送到数据库中，导致数据库层压力激增。")]),v._v(" "),r("p",[r("strong",[v._v("原因一")]),r("br"),v._v("\n缓存中有大量数据同时过期，导致大量请求无法被处理。"),r("br"),v._v("\n解决方法：")]),v._v(" "),r("ul",[r("li",[v._v("避免给大量数据设置相同的过期时间"),r("br"),v._v("\n如果业务要求某些数据同时失效，可以单独使用 "),r("code",[v._v("EXPIRE")]),v._v(" 给数据设置过期时间，设置时增加一个小量级随机数如 1 到 3 分钟。这样在保证过期时间相近的同时避免同时失效。")]),v._v(" "),r("li",[v._v("服务降级"),r("br"),v._v("\n对于不同数据采用不同的处理方式：\n"),r("ul",[r("li",[v._v("业务访问非核心数据，暂时停止从缓存中查询。直接返回预定义信息、空值、错误信息；")]),v._v(" "),r("li",[v._v("业务访问核心数据，允许查询缓存。缓存未命中继续通过数据库读取。")])])])]),v._v(" "),r("p",[r("strong",[v._v("原因二")]),r("br"),v._v("\nRedis 缓存实例故障宕机。"),r("br"),v._v("\n解决方法：")]),v._v(" "),r("ul",[r("li",[v._v("在业务系统里实现服务熔断或请求限流机制\n"),r("ul",[r("li",[v._v("熔断（业务影响大）"),r("br"),v._v("\n监测 Redis 所在机器和数据库的负载指标，当发现缓存实例宕机，数据库负载激增则启动熔断机制。暂停业务对缓存接口的访问，不把请求发给缓存实例而直接返回。等到实例恢复服务后再允许请求发送到缓存系统。")]),v._v(" "),r("li",[v._v("请求限流"),r("br"),v._v("\n在 Redis 实例宕机后，业务中控制每秒进入的请求数，防止请求过多发送到数据库。")])])]),v._v(" "),r("li",[v._v("事前预防\n"),r("ul",[r("li",[v._v("高可用集群\n通过主从节点构造高可用集群。如果缓存主节点宕机，从节点可以切换为主节点。")])])])]),v._v(" "),r("h3",{attrs:{id:"缓存击穿"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#缓存击穿"}},[v._v("#")]),v._v(" 缓存击穿")]),v._v(" "),r("p",[v._v("对某热点数据的请求无法在缓存中处理，发送到后端导致数据库层压力激增。经常发生在热点数据过期失效时。")]),v._v(" "),r("p",[r("strong",[v._v("解决方法")]),r("br"),v._v("\n对于访问特别频繁的热点数据不设置过期时间。")]),v._v(" "),r("h3",{attrs:{id:"缓存穿透"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#缓存穿透"}},[v._v("#")]),v._v(" 缓存穿透")]),v._v(" "),r("p",[v._v("要访问的数据既不在缓存中也不在数据库中。这种情况一般发生在业务层出现误操作或者遭受恶意攻击。当缓存和数据库中数据被误删除，或者专门恶意持续访问数据库中没有的数据会发生缓存穿透。")]),v._v(" "),r("p",[r("strong",[v._v("解决方法")])]),v._v(" "),r("ul",[r("li",[v._v("设置缓存空值、缺省值"),r("br"),v._v("\n在发生缓存穿透后，在缓存在存放一个空值或缺省值。在下次穿透请求到来时返回这个值。")]),v._v(" "),r("li",[v._v("布隆过滤器"),r("br"),v._v("\n使用布隆过滤器判断数据是否存在来减轻数据库压力。\n"),r("blockquote",[r("p",[v._v("布隆过滤器包含一个 bit 数组，数组初始值都为 0；和 N 个哈希函数组成。"),r("br"),v._v("\n当标记一个已经存在的数据时，会进行以下操作：")]),v._v(" "),r("ul",[r("li",[v._v("使用所有的哈希函数，依次对这个数据进行计算，得到 N 个哈希值；")]),v._v(" "),r("li",[v._v("每个哈希值对 bit 数组长度取模，得到该值在数组中的位置；")]),v._v(" "),r("li",[v._v("将数组对应位置设置为 1.\n当查询一个数据时，通过计算哈希并取模，只要对应位置有一个不为 1 说明数据不存在。")])])])]),v._v(" "),r("li",[v._v("前端请求检测"),r("br"),v._v("\n在前端对请求的合法性进行检测，过滤掉恶意请求，不让它们继续访问缓存和后端。")])])])}),[],!1,null,null,null);_.default=n.exports}}]);