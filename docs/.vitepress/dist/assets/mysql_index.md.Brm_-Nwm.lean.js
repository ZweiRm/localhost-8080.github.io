import{_ as n,C as s,c as t,o as d,ag as i,j as l,a as o,G as a}from"./chunks/framework.DPDPlp3K.js";const p="/img/mysqlProcess.png",T=JSON.parse('{"title":"MySQL","description":"","frontmatter":{"prev":false,"next":{"text":"事务","link":"mysql/transaction"}},"headers":[],"relativePath":"mysql/index.md","filePath":"mysql/index.md"}'),c={name:"mysql/index.md"},b={class:"tip custom-block"};function g(u,e,h,_,f,m){const r=s("Badge");return d(),t("div",null,[e[13]||(e[13]=i("",5)),l("ul",null,[l("li",null,[e[9]||(e[9]=o("连接器 ")),l("ul",null,[e[8]||(e[8]=i("",1)),l("li",null,[e[6]||(e[6]=o("连接分类 ")),e[7]||(e[7]=l("ul",null,[l("li",null,[o("长连接"),l("br"),o(" 连接成功后持续有请求，则这些请求都是用同一个连接执行。")]),l("li",null,[o("短连接"),l("br"),o(" 连接成功后执行几次操作就断开连接，之后重新建立。"),l("br"),o(" 建立连接的过程复杂，一般情况是用长连接来避免很多的连接动作。")])],-1)),l("div",b,[e[4]||(e[4]=l("p",{class:"custom-block-title"},"问题",-1)),e[5]||(e[5]=l("p",null,"当 MySQL 在执行过程中，临时内存都放在连接对象中管理导致内存占用上涨很快。内存占用过大时会导致系统强行杀掉进程导致 MySQL 异常重启，怎么处理？",-1)),l("ul",null,[e[3]||(e[3]=l("li",null,"定期断开长连接。当连接执行一段时间后，或程序执行过一个占用内存很大的大查询后断开连接。之后需要查询时重新连接。",-1)),l("li",null,[e[0]||(e[0]=o("每次执行大操作后，执行 ")),e[1]||(e[1]=l("code",null,"mysql_reset_connection",-1)),e[2]||(e[2]=o(" 重新初始化连接资源。 此操作不需要重新连接和权限验证，但会将连接恢复到刚创建完成时的状态。")),a(r,{text:"MySQL 5.7 +"})])])])])])]),l("li",null,[e[10]||(e[10]=o("查询缓存 ")),a(r,{text:"MySQL 8.0 -",type:"error"}),e[11]||(e[11]=i("",3))]),e[12]||(e[12]=i("",3))]),e[14]||(e[14]=i("",21))])}const S=n(c,[["render",g]]);export{T as __pageData,S as default};
