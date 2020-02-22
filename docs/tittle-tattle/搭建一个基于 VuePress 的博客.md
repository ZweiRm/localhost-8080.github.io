---
prev: ./学术研究的正确姿势
next: false
---

# 搭建一个基于 VuePress 的博客/技术文档网站
## 什么是 VuePress?
VuePress 是一款基于 Vue 的静态网站生成器。它可以将你编写的 Markdown 文档转化为已经渲染好的 HTML 静态页面。这些页面有着良好的 SEO 优化，可以轻松的支持搜索引擎收录；同时页面被浏览时由 Vue 接管而形成单页应用，其他页面按浏览按需加载。 

## 为什么选 VuePress?
最重要的一点是：VuePress 对 Vue 技术有着很好的支持。你可以在文档中使用 Vue 的动态组件，这对 Vue 程序员来说十分友好。  
其次是 VuePress 的默认主题，它的设计初衷是为了提供给编写产品文档的一个解决方案。也就是说，VuePress 生成的静态网页应用的风格看上去是技术文档，而不是传统博客。这更契合程序员的日常阅读习惯，同时可以让我们编写文章时操作简便且富有条理。当然，VuePress 也有官方和第三方主题，可以实现 Hexo 等技术的博客风格，可以按需安装。  
VuePress 也拥有者丰富的插件库，当你需要评论功能、用 $\LaTeX$ 输入一些公式等，都能找到相关的插件来支持自己的需求。  
这些是表层上的一些优势。关于 VuePress 和其他类似技术在底层实现和性能方面的对比可以在[官方文档](https://vuepress.vuejs.org/zh/guide/#%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E6%98%AF)中进行阅读。

## 技术架构
VuePress 的部署方案是多种多样的，这篇文章主要讲 VuePress + GitHub Pages 和 VuePress + Netlify 两种部署方案。其中 Netlify 是持续集成的。两种方案都不需要额外的服务器。  

我们需要用到的技术：Git, VuePress, Markdown  
我们需要用到的工具：GitHub, Netlify (可选)  

## 开始前的建议
在我们正式开始前，我推荐：预先掌握 Git 的基础知识、Markdown 的简单语法和 GitHub 的基本使用方法、大致阅读 VuePress 官方文档。

## 搭建
### I. Git 和 GitHub
1. 新建 Repository  
    假如你还没有 GitHub 账户，注册一个，然后新建 Repository。   
    仓库名称填写你希望取的域名加上 ".github.io"，然后填写对这个仓库的大概描述，勾选 “Initialize this repository with a README”。
    <div align="center">![New Repository](/img/newRepository.png)</div>

2. 完善 Repository  
   + 完善 `README.md`  
     在 Repository 页面完善项目信息，点击 `README.md` 文件的编辑按钮进入编辑界面，使用 Markdown 语法编写对该项目更详细的描述。完成后点击 `Commit changes` 按钮来提交本次修改。  
     ![Update README](/img/updateREADME.png)  

   + 编写 `.gitignore`  
     很多文件我们不需要同步到 GitHub 仓库里，使用`.gitignore`文件来标识出哪些文件或目录不需要同步。  
     在仓库首页点击`Creat new file`按钮进入编辑界面。输入新建的文件名：`.gitignore`，并填写内容："node_modules"。（根据你使用的 IDE 不同，也许你需要添加".vs" 或者 ".idea" 等内容来避免同步 IDE 独特的项目信息，请根据需求自行添加。）  
     完成后点击 `Commit changes` 按钮来提交本次修改。  
     ![.gitignore](/img/gitIgnore.png)

3. 安装和配置 Git  
   + 安装并部署你的 Git  
     下载并安装相关的程序，运行并配置你的账户。你可以根据廖雪峰老师的这个教程来安装。[廖雪峰的官方网站-安装Git](https://www.liaoxuefeng.com/wiki/896043488029600/896067074338496)
   
   + 初始化本地仓库  
     在本机上适合的位置创建一个文件夹，命名和 GitHub 创建的仓库名称一致。这个文件夹将作为我们本次项目的文件夹。  
     使用 Git Bash 或者其他命令行（控制台/终端）程序访问到该文件夹，输入命令来把文件夹初始化为 git 仓库。 
     ``` sh
     git init
     ```

   + 建立本地和远程仓库的连接  
     生成本地 SSH Key，并提交 GitHub。使用命令关联远程仓库。  
     具体请参考：[廖雪峰的官方网站-远程仓库](https://www.liaoxuefeng.com/wiki/896043488029600/896954117292416)

   + 拉取文件到本地  
     ``` sh
     git pull
     ```

### II. 安装 VuePress
1. 安装 Node.js  
   下载并安装 [Node.js](https://nodejs.org/zh-cn/).

2. 安装 Yarn  
   使用命令行程序全局安装包管理器 Yarn.
   ``` sh
   npm install -g yarn
   ``` 

3. 安装 VuePress  
   使用命令行程序访问到之前创建的项目目录。以本地依赖形式安装。后创建 /docs 目录用来后续存放需要编写的文章。  
   ``` sh
   # 将 VuePress 作为一个本地依赖安装
   yarn add -D vuepress

   # 新建一个 docs 目录
   mkdir docs
   ```

### III. 配置 VuePress
1. 编写脚本 
   修改`package.json`文件，添加一些脚本：  
   ``` json
   {
     "scripts": {
       "docs:dev": "npx vuepress dev docs",
       "docs:build": "npx vuepress build docs"
     }
   }
   ```

   ::: warning 值得注意的是
   因为是追加内容，所以需要在本原来的最后一项后加上逗号。例如：
   ``` json {4}
   {
      "devDependencies": {
        "vuepress": "^1.3.1"
      },
      "scripts": {
        "docs:dev": "npx vuepress dev docs",
        "docs:build": "npx vuepress build docs"
      }
   }
   ```
   :::

2. 创建必要的文件和目录
   + 在 /docs 目录中创建目录：/.vuepress  
   + 在 /.vuepress 目录中创建目录： /public  
   + 在 /public 目录中创建目录： /img  
   + 在 /img 目录中放入你喜欢的图片当做首页 logo，这里假设图片名为`logo.png`
   + 退回到 /docs 目录，创建 `README.md`文件，它将生成为站点首页  
     参考这个示例编写：
     ``` markdown
     ---
     home: true
     heroImage: /img/logo.png
     actionText: Hello, world! →
     actionLink: /tittle-tattle/
     meta:
     - name: keywords
       content: 技术 软件 计算机 Java Web 软件工程 笔记
     features:
     - title: 全面
       details: 笔记涵盖从计算机科学、软件工程、到各种具体实用技术等多维度内容。
     - title: 简洁
       details: 笔记力图以简洁的文字和画面表现出各知识的条理关系。
     - title: 实用
       details: 这不是百科全书，但在全面的基础上尽量展示最可能用到的部分。
     footer: Copyright © 2018-2020 ahza.xin | localhost-8080.io
     ---
     ```
     + `home` 标识当前页面为站点首页
     + `heroImage` 选定首页大图（Logo）
     + `actionText` 指定默认按钮文字
     + `actionLink` 指定默认按钮跳转的页面
     + `meta` 可以指定在 html 的 `<meta>` 中增添的信息，这里增添了关于 "keywords" 的内容
     + `features` 是默认的三个特性展示，通过设置 title 和 details 来完善内容
     + `footer` 展示页脚信息  

     首页效果可以参考 VuePress 官方文档的首页。

3. 配置文件  
    在 /docs/.vuepress/ 目录下创建文件：`config.js` 并编写。  
    参考示例：  
    ``` js
    module.exports = {
      title: '本地煮鸡:8080',
      description: '一个博客, 大概会记录一些技术笔记',
      head: [
        ['link', { rel: 'icon', href: '/img/favicon.ico' }]
      ],
      plugins: {
        '@vuepress/pwa': {
          serviceWorker: true,
          updatePopup: {
            message: "有文章更新了",
            buttonText: "刷新"
          }
        },
        '@vuepress/back-to-top': true,
        '@vuepress/register-components': {
          componentsDir: '/components/'
        },
        '@vuepress/google-analytics': {
          'ga': 'UA-**********-*'
        }
      },
      themeConfig: {
        repo: 'ZweiRm/localhost-8080.github.io',
        repoLabel: '查看源码',
        docsDir: 'docs',
        editLinks: true,
        editLinkText: '帮助我改善此页面！',
        lastUpdated: '上次更新',
        nav: [{
          text: '主页',
          link: '/',
          },
          {
            text: '博文',
            items: [
              { text: 'Java', link: '/java/' },
              { text: 'Kotlin', link: '/kotlin/' }
            ]
          },
          { text: '关于', link: '/about/' },
          { text: 'Github', link: 'https://www.github.com/ZweiRm' },
        ],
        sidebar: {
          '/java/': [
            '',
            '语法',
            '面向对象',
            '应用程序编程接口概述'
          ],
          '/kotlin/': [
              '',
          ]
        },
        sidebarDepth: 2
      }
    }
    ```
   
    + `title`  
      网站的标题。

    + `description`  
      网站的描述，它会被渲染在 html 的 `<meta>` 中。

    + `head`  
      这里设置的值会被渲染在 html 的 `<head>` 中，示例中设置了网站的 favicon（即浏览器标签里网站的小图标）。  

    + `plugins`  
     设置并启用插件，这里设置了官网插件：pwa, back-to-top, register-components 和 google-analytics.  
     具体设置及使用方法参照：[插件 | VuePress](https://vuepress.vuejs.org/zh/plugin/)。

    + `themeConfig`  
      配置默认主体。在这个示例中，配置了 Git 仓库和编辑链接、最后更新时间、导航栏、侧边栏（多层嵌套式）。具体设置及使用方法参照：[默认主题配置 | VuePress](https://vuepress.vuejs.org/zh/theme/default-theme-config.html)。  
      ::: warning 注意
      + 关于侧边栏  
        侧边栏的配置和你的 /docs 目录息息相关，二者应当是相互对应的。例如：  
      
        在这个示例配置文件中，`sidebar` 配置了一些文章，它们表达的意思是：Java 项下有文章《README》（即空字符串）、《语法》、《面向对象》、《应用程序编程接口概述》；在 Kotlin 项下有文章《README》。它们所对应的目录结构将在下一小节中展示。  

        由于这里对每篇文章手动设置了侧边栏，所以后面每次当我们需要撰写新的文章时都需要通过调整这个配置来显示正确的侧边栏。  

        文章分类目录为英文时，为了避免不必要的烦恼推荐写为小写英文，它们将会被映射为 url.  

      + 关于导航栏  
        一般读者需要通过导航栏来访问具体类目中的文章。在这个示例配置文件中，配置了普通链接，如：`主页`，它所对应的链接是 `/`；嵌套链接，如：`博文`，它还包含了 `Java` 和 `Kotlin` 子项。
      :::
  
   这里只介绍有用且相对必要的配置，其他配置项及配置项的详细信息请参照：[配置 | VuePress](https://vuepress.vuejs.org/zh/config/)。

   ::: tip 从 0.x 迁移
   假如你按照其他 0.x 版本的 VuePress 安装过了，并渴望使用新的 1.x 版本 VuePress，请参照文章 [从 VuePress 0.x 迁移 | VuePress](https://vuepress.vuejs.org/zh/miscellaneous/migration-guide.html) 来配置。
   :::

4. 目录结构  
   到此，你已经可以通过使用命令行程序运行命令来进入开发模式进行文章的撰写了：  
   ``` sh
   yarn docs:dev
   ```
   我们此时的目录结构为：  
   ```
   · (whatever-you-like.github.io)
   ├── docs
   │   ├── .vuepress
   │   │   ├── public
   │   │   │   └── img
   |   |   ├── config.js
   |   |   └── dist (使用页面生成命令后，静态页面将会生成在这里，这个目录也会自动生成)
   |   ├── java
   |   |   ├── README.md
   |   |   ├── 语法.md
   |   |   ├── 面向对象.md
   |   |   └── 应用程序编程接口概述.md
   |   └── kotlin
   |       └── README.md
   ├── node_modules
   ├── package.json
   ├── yarn.lock
   ├── README.md
   ├── .gitignore
   └── .git
   ```
   在开发模式下，你可以在 /docs 目录下通过新建 `.md` 文件来新建一篇文章，通过新建一个目录来新建一个分类。完成后同步修改 .vuepress/config.js 中相关导航栏和侧边栏配置。  

   当你在编写一篇文章时，每当保存了 `.md` 文件，结果会自动更新在浏览器页面中。  

   当我们完成文章的编写后，我们需要生成静态网页并部署到服务器中，实现互联网访问我们的网站。这里提供两种方法，一个是拥有持续集成功能的 Netlify 方案，一个是手动操作的 GitHub Pages 方案，我们将分为两节描述它们。

## 部署 - Netlify
Netlify 提供了一种十分方便的持续集成体验。也就是说，每当你 push 你的新文章到 GitHub 后，Netlify 可以自动帮你生成静态页面文件并部署。但它的缺点也十分明显，由于一些特殊的网络原因，由 Netlify 部署的网站访问速度会极其缓慢甚至无法加载。  

当我们注册好 Netlify 后，对其进行一些简单的配置：
1. 同步我们的代码到 GitHub  
   首先通过命令把我们之前写过的所有内容同步到 GitHub 上的远程仓库。  
   ``` sh
   git add -A
   git commit -m 'deploy'

   # 将<USERNAME>/<USERNAME>.github.io.git 修改为你的仓库
   git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master
   ```

2. 创建新网站  
   + 点击`New site from Git`按钮创建新网站。点击 GitHub 按钮连接我们的项目仓库。  
     ![Create a new site](/img/newSite.png)
   + 选择我们的远程仓库
   + 填写配置信息：Build command, Publish directory  
     ![Build Options](/img/buildOpt.png)
   + 点击 `Deploy site` 按钮

 Netlify 还有一些其他的设置，比如域名配置、DNS 配置等，你可以根据需求自行阅读相关说明并进行设置。

## 部署 - GitHub Pages
我们可以使用 GitHub 自带的 GitHub Pages 来实现部署，它使用 GitHub 的服务器，一般情况下不会出现复杂的网络问题。  

1. 生成静态网页文件  
   使用命令来生成文档：  
   ``` sh
   yarn docs:build
   ```
   将生成在 whatever-you-like.github.io/docs/.vuepress/dist 中的所有文件复制并粘贴到项目文档的根目录（即 whatever-you-like.github.io）中。

2. 同步我们的代码到 GitHub  
   通过命令把我们之前写过的所有内容同步到 GitHub 上的远程仓库。  
   ``` sh
   git add -A

   # 引号中的字符串可以根据实际情况进行修改
   git commit -m 'deploy'

   # 将<USERNAME>/<USERNAME>.github.io.git 修改为你的仓库
   git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master
   ```

3. 设置 GitHub Pages  
   进入 GitHub 中，点击我们的项目仓库并点击设置按钮。找到 GitHub Pages 选项，修改设置：`Source` 项选中：master branch，勾选 `Enforce HTTPS`.  
   ![GitHub Pages](/img/githubPages.png)  
   如果你拥有自己注册的域名并希望使用在这个网站上，可以将它填写在 `Custom domain` 中。

::: warning 注意
当你使用本方法来部署你的网页，每当你希望更新你的网站页面时，你都需要手动进行以下操作：  
1. 使用命令来生成静态页面：  
   ``` sh
   yarn docs:build
   ```

2. 将生成在 whatever-you-like.github.io/docs/.vuepress/dist 中的所有文件复制并粘贴到项目文档的根目录（即 whatever-you-like.github.io）中

3. 使用命令来提交你的代码到 GitHub 远程仓库:
   ``` sh
   git add -A

   # 引号中的字符串可以根据实际情况进行修改
   git commit -m 'deploy'

   # 将<USERNAME>/<USERNAME>.github.io.git 修改为你的仓库
   git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master
   ```

当然你也可以在本地配置 Jenkins 等持续集成方案来实现自动部署，在这篇文章中不再赘述。
:::

## 特别注意点
1. 当编写多篇文章之间的链接时，格式为`[链接文字](./文章名.html/#章节名)`。即比文章内链接多了两项：`./文章名.html`。特别需要注意的是文章名后有 ".html" 的。

2. 推荐使用 IDE 来编写你的文章，比如使用 Visual Studio Code 或者 IntelliJ IDEA 等 IDE. 它们很好的支持了版本控制软件 Git，可以通过相对可视化的操作来简化你在 Git 方面的操作，这会让你日常书写体验变得更好。 

## 参考文献或资料
[1] Evan You.[VuePress](https://vuepress.vuejs.org/)  
[2] 廖雪峰.[廖雪峰的官方网站-Git教程](https://www.liaoxuefeng.com/wiki/896043488029600)  
[3] destiny0904.[VuePress 入门](https://www.jianshu.com/p/6fa4bfa449ed)