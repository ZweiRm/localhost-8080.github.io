(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{517:function(t,v,_){"use strict";_.r(v);var r=_(16),e=Object(r.a)({},(function(){var t=this,v=t.$createElement,_=t._self._c||v;return _("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[_("h1",{attrs:{id:"http-超文本传输协议"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#http-超文本传输协议"}},[t._v("#")]),t._v(" HTTP 超文本传输协议")]),t._v(" "),_("h2",{attrs:{id:"关于-http"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#关于-http"}},[t._v("#")]),t._v(" 关于 HTTP")]),t._v(" "),_("p",[t._v("HTTP 是基于 TCP/IP 协议栈来传输数据的一种协议，它规定了万维网客户端（浏览器）和服务器之间传输万维网文档的方式。HTTP 是面向事务的"),_("strong",[t._v("应用层协议")]),t._v("（即一系列信息交换看做一个整体且不可分割，要么一次性把这个整体交换，要么一次交换也不进行），它是万维网上能可靠交换文件的重要基础。")]),t._v(" "),_("h2",{attrs:{id:"基本过程"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#基本过程"}},[t._v("#")]),t._v(" 基本过程")]),t._v(" "),_("ol",[_("li",[t._v("建立连接"),_("br"),t._v("\n因为 HTTP 是基于 TCP/IP 协议的，它使用 TCP 的三次握手建立连接，四次挥手断开连接。在 HTTP 1.1 中默认开启了 Keep-Alive, 这样的 TCP 连接可以在多次请求中复用。")]),t._v(" "),_("li",[t._v("构建请求"),_("br"),t._v("\n一个 HTTP 请求分为请求行、首部和正文实体三部分。"),_("br"),t._v(" "),_("img",{attrs:{src:"/img/HTTP.png",alt:"HTTP"}}),t._v(" "),_("ul",[_("li",[t._v("请求行"),_("br"),t._v("\n对于请求行，方法包括 GET, POST, PUT 和 DELETE 四种。URL 是要访问的网站的统一资源定位符。版本通常是 1.1."),_("br"),t._v("\nGET 类型用于从服务器中获取一些资源。POST 类型用于提供给服务器信息，具体用于创建一个新资源。PUT 类型用于提供给服务器信息，具体用于修改一个资源。DELETE 类型用于从服务器中删除一个资源。")]),t._v(" "),_("li",[t._v("首部"),_("br"),t._v("\n首部是键值对形式存在的，通过冒号分割。通常保存一些重要的信息，比如客户端可接受的字符集 Accept-Charset、正文格式 Content-Type、缓存控制 Cache-control 等。")])])]),t._v(" "),_("li",[t._v("发送请求\n"),_("ul",[_("li",[t._v("HTTP 协议使用面向连接的方式发送请求。通过 stream 二进制流来传输信息。")]),t._v(" "),_("li",[t._v("二进制流会在 TCP 层中变成报文传输给服务器。TCP 层在每发送一个报文时都加上源地址和目标地址到 IP 头中交由 IP 层进行传输。每个报文段都需要对方回应一个 ACK 来保证可靠地到达对方。如果没有回应 TCP 层进行重传直到到达。")]),t._v(" "),_("li",[t._v("IP 层会检查目标地址是否与自己在同一个局域网，若是则发送 ARP 协议请求目标地址对应的 MAC 地址，并将源 MAC 和目标 MAC 放入 MAC 头发送；若不是，则发送 ARP 协议请求网关的 MAC 地址，并将源 MAC 和网关 MAC 放入 MAC 头发送。")]),t._v(" "),_("li",[t._v("网关收到后如果发现 MAC 地址符合，则取出目标 IP 地址，根据路由协议找到下一跳的路由器。获取下一跳路由器的 MAC 地址并将包发送给它。")]),t._v(" "),_("li",[t._v("在最后一跳的路由器发现目标地址在自己的出口局域网，则在局域网中发送 ARP 协议来请求目标地址的 MAC 地址并将包发送。")]),t._v(" "),_("li",[t._v("目标机器检查 MAC 地址，若目标的 MAC 地址符合则接收包，根据 IP 头中协议得知上一层为 TCP 协议，解析 TCP 头。判断 TCP 头中序列号是否是需要的，如果是则放入缓存并返回 ACK，否则丢弃包。通过 TCP 头中的端口号交由对应的 HTTP 服务器处理。")])])]),t._v(" "),_("li",[t._v("返回"),_("br"),t._v("\nHTTP 返回分为状态行、首部和正文实体三部分。\n"),_("img",{attrs:{src:"/img/HTTPResponse.png",alt:"HTTP Response"}}),t._v(" "),_("ul",[_("li",[t._v("状态行中的状态码说明了该返回的结果。如 200 表示成功，404 表示服务端无法找到请求的资源。")]),t._v(" "),_("li",[t._v("首部也是键值对形式的。如 Retry-After 告知客户端应当在多久后重试，Content-type 表示返回的内容形式。")]),t._v(" "),_("li",[t._v("返回逻辑和请求逻辑类似，构建好报文后通过 Socket 交给 TCP 层，分成小段后加上 TCP 头交给 IP 层，之后报文经过网络抵达目标机器。目标机器检查 MAC 地址和 IP 地址符合则交给 TCP 层进行解析判断。")])])])]),t._v(" "),_("h2",{attrs:{id:"http-2-0"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#http-2-0"}},[t._v("#")]),t._v(" HTTP 2.0")]),t._v(" "),_("p",[t._v("HTTP 1.1 是应用层的纯文本通信协议。每次通信都需要带完整的 HTTP 头。当没有 pipeline 模式时有实时性和并发性上的问题。HTTP 2.0 对 HTTP 头进行了压缩，并在发送和接收方建立一个对首部键值对的索引表。对于相同的头部只发送索引。"),_("br"),t._v("\nHTTP 2.0 将一个 TCP 连接分成多个流，不同流有不同的 ID. 流可以双向的在客户端和服务端传输数据，并且拥有优先级。"),_("br"),t._v("\nHTTP 2.0 通过将头部信息封装为更小的 Header 帧并开启流来传输。正文实体通过 Data 帧来传输。多个 Data 帧共同使用同一个流。"),_("br"),t._v("\n例如客户端分别发送三个请求分别获取 css, js 和 jpg 文件。在 HTTP 1.1 里只能通过串行的方式，而 HTTP 2.0 可以在同一个 TCP 连接里使用三个流。在这些流中乱序的讲数据进行发送。")]),t._v(" "),_("h2",{attrs:{id:"quic-quick-udp-internet-connection"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#quic-quick-udp-internet-connection"}},[t._v("#")]),t._v(" QUIC (Quick UDP Internet Connection)")]),t._v(" "),_("p",[t._v("QUIC 是由谷歌基于 UDP 协议开发的低时延的互联网传输层协议。它使用了一些机制使得并发状态有更好的处理。")]),t._v(" "),_("ul",[_("li",[t._v("自定义连接机制"),_("br"),t._v("\n因为 QUIC 是基于 UDP 的，它不通过三次握手建立连接。它使用 64 位的随机数作为 ID，就算 IP 或者端口发生变化，只要 ID 不变就不重新连接。")]),t._v(" "),_("li",[t._v("自定义重传机制"),_("br"),t._v("\nQUIC 利用序号和 offset 两个指标判断是否需要重新传输。每一个序号发送一次，就算是重传的内容序号也会增加，以此来使得 RTT 计算更准确（HTTP 发送多次同样序号，但返回信息是序号加一，无法准确知道往返时间）。通过 offset 来判断是否是用一段数据的包。按照 offset 就可以拼接成一个完整的流。")]),t._v(" "),_("li",[t._v("无阻塞多路复用"),_("br"),t._v("\n在同一个 QUIC 连接上可以创建多个 stream，stream 之间没有依赖关系。相比 HTTP 中某个 stream 需要重传后续的 stream 需要阻塞等待，在 QUIC 中可以无需等待直接发送。")]),t._v(" "),_("li",[t._v("自定义流量控制"),_("br"),t._v("\nQUIC 的流量控制是基于多路复用的滑动窗口，这个窗口是同时基于连接和 stream 的。窗口的起始是当前收到的最大 offset, 结束是从该 offset 到当前 stream 所能容纳的最大缓存。每个 offset 包到来便进入缓存，处于可以应答的状态，应答后就不需要重发（即接收已确认）。在窗口中的处于等待到来或者可发送的包。")])]),t._v(" "),_("h2",{attrs:{id:"https"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#https"}},[t._v("#")]),t._v(" HTTPS")]),t._v(" "),_("p",[t._v("HTTPS 协议利用对称和非对称加密手段保证安全性。")]),t._v(" "),_("h3",{attrs:{id:"加密"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#加密"}},[t._v("#")]),t._v(" 加密")]),t._v(" "),_("ul",[_("li",[t._v("对称加密"),_("br"),t._v("\n通信双方共同使用一个密钥进行通信。但是密钥可能会被劫持而造成信息不安全。")]),t._v(" "),_("li",[t._v("非对称加密"),_("br"),t._v("\n服务器端生成一对密钥，分别是公钥和私钥。公钥对所有人开放，可以给客户端用来加密信息。对应的信息在服务器端使用私钥进行解密。但是服务器端在返回信息时只能用私钥加密，所有公钥持有者都能解密这个信息，造成信息不安全。")]),t._v(" "),_("li",[t._v("数字证书加密"),_("br"),t._v("\n在非对称加密的基础上，加上一个第三方的授信机构 CA (Certificate Authority)."),_("br"),t._v("\n一个网站在创建好自己的公钥和私钥以后，将公钥交给 CA 进行认证生成证书。CA 通过签名算法将得到的信息进行计算，生成的 Hash 值作为签名连同信息一起发送出去。在证书中还包括了 Issuer 颁发者；Subject 受颁者；Validity 有效期；Public-key 公钥和 Signature Algorithm 签名算法等信息。"),_("br"),t._v("\nCA 证书直接采用层层认证的形式。下层证书可以利用上层公钥来判断是否可以正确解开，直到顶层的 root CA. 它们作为全球著名的 CA 拥有权威性。")])]),t._v(" "),_("h3",{attrs:{id:"工作模式"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#工作模式"}},[t._v("#")]),t._v(" 工作模式")]),t._v(" "),_("p",[t._v("HTTPS 会通过非对称加密模式传输一个对称加密的密钥，后续大量数据通信使用该对称加密来进行。")]),t._v(" "),_("ol",[_("li",[t._v("Client Hello"),_("br"),t._v("\n客户端通过明文传输 TLS 版本信息、加密套件候选列表、压缩算法候选列表和一个随机数。随机数用于后续协商生成对面密钥。")]),t._v(" "),_("li",[t._v("Server Hello"),_("br"),t._v("\n客户端在接收到 Client Hello 后从中选择协议版本、加密套件和压缩算法，并加上一个随机数返回给客户端。随机数用于后续协商生成对面密钥。")]),t._v(" "),_("li",[t._v("Server Hello Done"),_("br"),t._v("\n服务端发送证书给客户端，表示所有信息已经发送完毕。")]),t._v(" "),_("li",[t._v("证书验证与 Pre-master 生成"),_("br"),t._v("\n客户端使用自己信任的 CA 仓库对证书进行解密。（层层解密直到一个可信的 CA）。在确定证书可信后，客户端生成一个随机数 Pre-master.")]),t._v(" "),_("li",[t._v("Client Key Exchange"),_("br"),t._v("\n客户端用证书中的公钥对随机数进行加密，发送给服务器端。")]),t._v(" "),_("li",[t._v("对称加密密钥生成"),_("br"),t._v("\n服务器端和客户端利用客户端随机数、服务器端随机数和 Pre-master 计算出对称密钥。")]),t._v(" "),_("li",[t._v("Change Cipher Spec"),_("br"),t._v("\n客户端发送该信号通知服务器端后续用对称加密通信。")]),t._v(" "),_("li",[t._v("Encrypted Handshake Message"),_("br"),t._v("\n客户端利用已经商定的参数等信息采用对称加密，发送给服务器端用于数据与握手验证。")]),t._v(" "),_("li",[t._v("Change Cipher Spec"),_("br"),t._v("\n服务器端发送该信号通知客户端后续用对称加密通信。")]),t._v(" "),_("li",[t._v("Encrypted Handshake Message"),_("br"),t._v("\n服务器端利用已经商定的参数等信息采用对称加密，发送给客户端用于数据与握手验证。")])]),t._v(" "),_("p",[_("img",{attrs:{src:"/img/HTTPS.png",alt:"HTTPS"}})]),t._v(" "),_("h3",{attrs:{id:"重放与篡改"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#重放与篡改"}},[t._v("#")]),t._v(" 重放与篡改")]),t._v(" "),_("p",[t._v("除了窃取信息，黑客还可能实施重放和篡改攻击。重放指多次发送一样的数据来扰乱正常通信。篡改指修改部分信息后继续发送信息。")]),t._v(" "),_("p",[t._v("在 HTTPS 中， 签名包含了时间戳 Timestamp 和 Nonce 随机数。通过使用唯一的随机数；或者在 Timestamp 和 Nonce 联合唯一的情况下，服务器端对于多次相同的信息可以只接受一次，放弃其他重复内容。")]),t._v(" "),_("p",[t._v("因为签名的不可篡改性，就算修改了 Timestamp 和 Nonce，解析出的签名会无法匹配，从而避免发生篡改。")]),t._v(" "),_("h2",{attrs:{id:"参考文献或资料"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#参考文献或资料"}},[t._v("#")]),t._v(" 参考文献或资料")]),t._v(" "),_("p",[t._v("[1] 谢希仁.计算机网络（第6版）[M].北京:电子工业出版社,2013.251-258"),_("br"),t._v("\n[2] RUNOOB."),_("a",{attrs:{href:"https://www.runoob.com/http/http-tutorial.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("HTTP 教程"),_("OutboundLink")],1)])])}),[],!1,null,null,null);v.default=e.exports}}]);