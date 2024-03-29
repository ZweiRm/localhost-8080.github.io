module.exports = {
    locales: {
        '/': {
            lang: 'zh-CN',
            title: '本地煮鸡:8080',
            description: '一个博客, 大概会记录一些技术笔记',
        }
    },
    title: '本地煮鸡:8080',
    description: '一个博客, 大概会记录一些技术笔记',
    head: [
        ['link', { rel: 'icon', href: '/img/favicon.ico' }]
    ],
    markdown: {
        extendMarkdown: md => {
            md.use(require('markdown-it-sup'))
            md.use(require('markdown-it-sub'))
        },
        lineNumbers: true
    },
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
            'ga': 'UA-132436049-1'
        },
        'mathjax': {
            target: 'svg',
            macros: {
                '*': '\\times',
            }
        },
        'sitemap': {
            hostname: 'https://localhost-8080.io',
            dateFormatter: val => {
                return new Date().toISOString()
            }
        },
        'flowchart': {},
        'vuepress-plugin-baidu-tongji-analytics': {
            key: '5344755f0a57ddd063df74878ae8a921'
        },
        'seo': {
            siteTitle: (_, $site) => $site.title,
            title: $page => $page.title,
            description: $page => $page.frontmatter.description,
            author: (_, $site) => $site.themeConfig.author,
            tags: $page => $page.frontmatter.tags,
            twitterCard: _ => undefined,
            type: $page => ['computer science', 'software engineering', 'java', 'machine learning'].some(folder => $page.regularPath.startsWith('/' + folder)) ? 'article' : 'website',
            url: (_, $site, path) => ($site.themeConfig.domain || '') + path,
            image: ($page, $site) => $page.frontmatter.image && (($site.themeConfig.domain && !$page.frontmatter.image.startsWith('http') || '') + $page.frontmatter.image),
            publishedAt: $page => $page.frontmatter.date && new Date($page.frontmatter.date),
            modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
        },
        'vuepress-plugin-nprogress':{},
        'vuepress-plugin-comment': {
            choosen: 'valine', 
            options: {
                el: '#valine-vuepress-comment',
                appId: 'VKHDXsOo0FghGI6SSp2dXqUy-gzGzoHsz',
                appKey: 'iNabEE1WnFK3fWracc5Wb8GB',
                path: '<%- frontmatter.to.path %>'
            }
        },
        'vuepress-plugin-baidu-autopush':{}
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
            text: '笔记',
            items: [
                { text: 'Java', link: '/java/' },
                { text: '杂谈', link: '/hello-world/' }
            ]
        },
        {
            text: '施工中笔记',
            items: [
                { text: '编程语言', items: [
                    { text: 'Kotlin', link: '/kotlin/' },
                    { text: 'Python', link: '/python/' },
                ]},
                { text: '后端开发技术', items: [
                    { text: 'Web', link: '/web/' },
                    { text: 'Spring', link: '/spring/' },
                    { text: 'MySQL', link: '/mysql/'},
                    { text: 'Redis', link: '/redis/' },
                ]},
                { text: '学科基础', items: [
                    { text: '软件工程', link: '/software-engineering/' },
                    { text: '算法', link: '/algorithm/' },
                ]},
                { text: '机器学习', items: [
                    { text: '人工智能', link: '/artificial-intelligence/'},
                    { text: '深度学习', link: '/deep-learning/' },
                    { text: '推荐系统', link: '/recommender-systems/' },
                    { text: '数据分析与人工智能定量分析', link: '/quantitative-methods-for-DA-AI/'},
                ]},
                { text: '大数据', items: [
                    { text: 'Hadoop', link: '/hadoop/' },
                ]},
                { text: 'Android', items: [
                    { text: 'Framework', link: '/framework/'},
                ]}
            ]
        },
        { text: 'Github', link: 'https://www.github.com/ZweiRm' },
        { text: '码云', link: 'https://gitee.com/zweirm/' },
        { text: '关于', link: '/about/' },
        ],
        sidebar: {
            '/java/': [
                '',
                'grammars',
                'object-oriented',
                'API-introduction',
                'API-lang',
                'API-lang2',
                'API-util',
                'API-util2',
                'API-util3',
                'API-io',
                'jvm',
                'references'
            ],

            '/kotlin/': [
                '',
            ],

            '/python/': [
                '',
                'grammar'
            ],

            '/c/': [
                '',
                'constant-variable-and-data-type',
            ],

            '/web/': [
                '',
                'HTTP'
            ],

            '/spring/': [
                '',
                'overall',
                'ioc',
                'references'
            ],

            '/redis/': [
                '',
                'cache',
                'cluster',
                'data-structure',
                'persistence'
            ],

            '/deep-learning/': [
                '',
                'logistic-regression-as-a-neural-network',
                'python-and-vectorization'
            ],

            '/quantitative-methods-for-DA-AI/': [
                '',
            ],

            '/artificial-intelligence/': [
                '',
                'search-strategies',
            ],

            '/software-engineering/': [
                '',
                'software-process',
            ],

            '/math/': [
                '',
                'multivariate-function-differential'
            ],

            '/algorithm/': [
                '',
                'ds-001',
                'ds-002',
                'ds-003',
                'dynamic-programming'
            ],

            '/recommender-systems/': [
                '',
                'introduction',
            ],

            '/mysql/':[
                '',
                'transaction',
                'indices',
                'lock',
                'references',
                'divide',
            ],

            '/hadoop/':[
                ''
            ],

            '/framework/':[
                '',
                'activity-launching-process',
                'performTraversal',
                'container',
            ],

            '/hello-world/': [
                '',
                'computing-machinery-and-intelligence',
                'the-right-way-doing-research',
                'building-a-vuepress-powered-blog',
                'setup-a-server-manually',
                'array-and-linked-list',
                'TODO'
            ],

            '/': [
                ''
            ]
        },
        sidebarDepth: 2
    }
}