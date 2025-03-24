import{_ as i,c as l,o as t,ag as e}from"./chunks/framework.DPDPlp3K.js";const o="/img/C%E7%A8%8B%E5%BA%8F%E7%9A%84%E5%9F%BA%E6%9C%AC%E7%BB%93%E6%9E%84.jpg",u=JSON.parse('{"title":"C 概述","description":"","frontmatter":{"prev":false,"next":{"text":"常量与数据类型","link":"c/constant-variable-and-data-type"}},"headers":[],"relativePath":"c/index.md","filePath":"c/index.md"}'),r={name:"c/index.md"};function n(s,a,c,p,d,_){return t(),l("div",null,a[0]||(a[0]=[e('<h1 id="c-概述" tabindex="-1">C 概述 <a class="header-anchor" href="#c-概述" aria-label="Permalink to &quot;C 概述&quot;">​</a></h1><h2 id="_1-1-关于-c" tabindex="-1">1.1 关于 C <a class="header-anchor" href="#_1-1-关于-c" aria-label="Permalink to &quot;1.1 关于 C&quot;">​</a></h2><ul><li><p>C 语言是1972年，在贝尔实验室开发的。 它在 ALGOL、BCPL 和 B 语言的基础上发展而来，利用了它们的很多概念并增添了数据类型等其他特性。</p></li><li><p>C 语言与 UNIX 操作系统一起开发，它们有很强的关联性。 UNIX 操作系统几乎完全用 C 语言编码。</p></li><li><p>版本变化</p><ul><li><p>C89<br> 或称 ANSI C。1989年由 ANSI 发布的第一个 C 语言标准。次年由 ISO 全文批准，给予名称：ISO/IEC 9899。</p></li><li><p>C99<br> 1999年，ISO 将 C++ 和 Java 的一些特性加入，发布 ISO/IEC 9899: 1999 标准。</p></li><li><p>C11<br> 2011年，ISO 发布新版本的标准：ISO/IEC 9899: 2011.</p></li></ul></li></ul><h2 id="_1-2-主要特性" tabindex="-1">1.2 主要特性 <a class="header-anchor" href="#_1-2-主要特性" aria-label="Permalink to &quot;1.2 主要特性&quot;">​</a></h2><ul><li>健壮、高效、运行速度快</li><li>高度可移植</li><li>适用于结构化程序设计</li><li>可自我扩展</li></ul><h2 id="_1-3-c-程序的基本结构" tabindex="-1">1.3 C 程序的基本结构 <a class="header-anchor" href="#_1-3-c-程序的基本结构" aria-label="Permalink to &quot;1.3 C 程序的基本结构&quot;">​</a></h2><p><img src="'+o+'" alt="C程序的基本结构"></p><ul><li><p>文档部分<strong>由注释行组成</strong>，给出<strong>程序名称、作者等信息</strong>。</p></li><li><p>链接部分提供的指令告诉编译器<strong>从系统库中链接哪些函数</strong>。</p></li><li><p>定义部分定义<strong>所有符号常量</strong>。</p></li><li><p>全局声明部分<strong>声明了全局变量和自定义函数</strong>。全局变量可以在多个函数中使用；自定义函数声明在前，实现在后。</p></li><li><p><code>main()</code>是 C 程序的<strong>执行入口</strong>，每个 C 程序必须有一个。其中声明部分用于声明所以将在执行部分中使用的变量。执行部分是具体逻辑语句。</p></li><li><p>子程序包含了<strong>所有自定义函数的实现</strong>，这些函数在<code>main()</code>中被调用。特别地，自定义函数可以以任意顺序出现，但通常它们在<code>main()</code>之后。</p></li></ul><div class="warning custom-block"><p class="custom-block-title">注意</p><p>除<code>main()</code>外，若无必要，其余部分都可以省略。</p></div>',9)]))}const h=i(r,[["render",n]]);export{u as __pageData,h as default};
