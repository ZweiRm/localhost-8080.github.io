---
editLink: false
---

# Hello World!

## 这个博客
搭一个个人博客的计划已经酝酿好久了，受小伙伴用 Hexo 在 GitHub Pages 上搭建博客的启发，这个站点诞生咯。  
我会逐步将之前记录在 OneNote 上的笔记转移到这个站点，此外可能也会记录一些非技术性的琐碎。(转移周期应该会很长，重构笔记真的好麻烦哦:new_moon_with_face:)

## 在这里你可以看到
编程语言相关：  
+ 关于 [Java 程序设计](/java/)的内容
+ 关于 [Kotlin 程序设计](/kotlin/)的内容

> ---
后端开发技术相关：  
+ 关于 [Web 技术](/web/)的内容
+ 关于 [Spring 技术](/spring/)的内容
+ 关于 [MySQL](/mysql/) 的内容
+ 关于[Redis](/redis/)的内容
+ 关于[大数据](/big-data/)的内容

> ---
学科基础相关：
+ 关于[软件工程](/software-engineering/)的内容
+ 关于[算法](/algorithm/)的内容

> ---
机器学习相关：
+ 关于[人工智能](/artificial-intelligence/)的内容
+ 关于[深度学习](/deep-learning/)的内容
+ 关于[推荐系统](/recommender-systems/)的内容
+ 关于[数据分析与人工智能定量分析](/quantitative-methods-for-DA-AI/)的内容

> ---
+ [杂谈](/hello-world/)

你可以通过右上角的导航栏 (移动端就是左上角咯:laughing:)中`博文-XXX`来查看这些内容。  

哦对了，忘了一个不太重要的内容，那就是关于我的信息。你还可以通过导航栏的[<code style="color: #3EAF7C"><b>关于</b></code>](/about/)按钮访问关于页面，我会将我的信息和做过的项目链接写在上面，欢迎各位指正。`关于`的旁边的按钮可以直接跳转到我的 GitHub 和码云页面，虽然目前里面可能暂时没有太多有意思的东西。

## 文章施工状态说明
|形式|状态|
|:--|:--|
|文章仅包含题目“Hello VuePress!”。|已确定文章总体规划，暂未开始笔记重构。|
|文章有部分内容；文章仅有小标题。|笔记重构中，未完成。|
|文章内容完整，但标题前无序号。|笔记基本重构完毕，后期会有较大幅度调整。|
|文章每个标题前都有序号。|笔记整体重构完毕，可能后期会有细微调整。|

## 这个域名有点似曾相识？
假如你之前碰巧访问过[考据癖](http://localhost-8080.com/)站点，你会发现本站和`考据癖`只有顶级域名不同。是的，本站点的域名构思正是起源于这个站点。这里声明本站与`考据癖`没有任何关系。  

2018 年的某天，我正在查阅关于数学家的资料，猛地看到站点的域名是`localhost-8080`,让我回想起了一个笑话：“大家好，我写了个网站，链接是http://localhost:8080，欢迎大家访问”。而这个域名反利用这个梗，十分有趣。  

> @xsannyx: OKAY! Time to lift our #starup. Everyone visit http://localhost:8080 and share :)

<span class="heimu">我们知道，众多的技术的默认端口都是 8080 ，在本地开发测试环境中可以使用 localhost:8080 这个 URL 来访问。本地归本地，网络实际环境中这个 URL 只能访问本机而不能访问其他主机，这是由 URL 决定的。</span>

`考据癖`是一个很有趣很棒的站点，站长学姐对她感兴趣的各种事情进行了考究，并形成了一篇篇博客。内容丰富、风趣且严谨。本站点借鉴了`考据癖`域名核心词，注册了`.io`顶级域名。希望本站内容也继承`考据癖`站点的好奇与探究精神，不断完善与进步。

<style>
p span .heimu,
p .heimu,
.heimu,
.heimu a,
a .heimu,
.heimu a.new {
  background-color: #252525;
  color: #252525;
  text-shadow: none
}

body:not(.heimu_toggle_on) .heimu:hover,
body:not(.heimu_toggle_on) .heimu:active,
body:not(.heimu_toggle_on) .heimu.off {
  transition: color .13s linear;
  color: #fff
}
</style>

## 感谢
感谢您的支持！点个赞呗:smirk:~ <a rel="点赞" href="https://github.com/ZweiRm/localhost-8080.github.io" onclick=like()><img alt="GitHub stars" src="https://img.shields.io/github/stars/ZweiRm/localhost-8080.github.io.svg?color=2F835D&logoColor=3EAF7C&style=social"></a>

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-132436049-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-132436049-1');
  
</script>

<script type="text/javascript">  
function like() {
    gtag('event', 'like', {
    'event_category': 'like',
    'event_label': 'like',
    'value': 1
    });
}
</script>