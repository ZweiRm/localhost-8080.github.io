import{_ as n,C as d,c as r,o as i,ag as o,j as e,a,G as s}from"./chunks/framework.DPDPlp3K.js";const g=JSON.parse('{"title":"索引","description":"","frontmatter":{"prev":{"text":"事务","link":"mysql/transaction"},"next":{"text":"锁","link":"mysql/lock"}},"headers":[],"relativePath":"mysql/indices.md","filePath":"mysql/indices.md"}'),c={name:"mysql/indices.md"},h={id:"索引下推",tabindex:"-1"};function u(x,t,b,p,y,m){const l=d("Badge");return i(),r("div",null,[t[3]||(t[3]=o("",35)),e("h4",h,[t[0]||(t[0]=a("索引下推 ")),s(l,{text:"MySQL 5.6+"}),t[1]||(t[1]=a()),t[2]||(t[2]=e("a",{class:"header-anchor",href:"#索引下推","aria-label":'Permalink to "索引下推 <Badge text="MySQL 5.6+"/>"'},"​",-1))]),t[4]||(t[4]=e("p",null,"索引下推 (Index Condition Pushdown, aka. ICP) 是 MySQL 5.6 推出的一项对索引查询的优化。在之前版本，当联合索引按照最左前缀匹配后，若还有条件字段不在索引范围或不满足索引使用条件时，则只能按照之前查出的结果依次回表到聚簇索引查询。而索引下推会在索引的遍历过程中就预先对条件中索引已经包含但不满足最左前缀的字段进行预先判断，过滤掉不满足的条件来减少回表次数。",-1)),t[5]||(t[5]=e("p",null,[a("例如上一小节的例子，在按照 "),e("code",null,"LIKE"),a(" 条件查询索引树时，会在所有以 J 开头的结果上，利用第二个本不能使用索引的条件来去掉所有不为 3 的项。余下结果再回表聚簇索引查询得到最终结果。")],-1))])}const k=n(c,[["render",u]]);export{g as __pageData,k as default};
