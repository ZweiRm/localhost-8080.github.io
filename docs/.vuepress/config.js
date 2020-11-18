module.exports = {
    title: '本地煮鸡:8080',
    description: '一个博客, 大概会记录一些技术笔记',
    head: [
        ['link', { rel: 'icon', href: '/img/favicon.ico' }]
    ],
    markdown: {
        extendMarkdown: md => {
            md.use(require('markdown-it-sup'))
            md.use(require('markdown-it-sub'))
        }
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
        },
        'flowchart': {},
        'vuepress-plugin-baidu-tongji-analytics': {
            key: '5344755f0a57ddd063df74878ae8a921'
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
                text: '笔记',
                items: [
                    { text: 'Java', link: '/java/' },
                    { text: 'Kotlin', link: '/kotlin/' },
                    { text: 'Python', link: '/python/' },
                    { text: 'Web', link: '/web/' },
                    { text: 'Spring', link: '/spring/' },
                    { text: '大数据', link: '/big-data/' },
                    { text: '前端', link: '/front-end/' },
                    { text: '深度学习', link: '/deep-learning/' },
                    { text: '软件工程', link: '/software-engineering/' },
                    { text: '杂谈', link: '/hello-world/' }
                ]
            },
            { text: '关于', link: '/about/' },
            { text: 'Github', link: 'https://www.github.com/ZweiRm' },
            { text: '码云', link: 'https://gitee.com/zweirm/' },
        ],
        sidebar: {
            '/java/': [
                '',
                'grammars',
                'object-oriented',
                'API-introduction',
                'API-lang',
                'API-util',
                'API-io',
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
            ],

            '/big-data/': [
                '',
            ],

            '/front-end/': [
                '',
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

            '/hello-world/': [
                '',
                'about-the-article-of-java',
                'computing-machinery-and-intelligence',
                'the-right-way-doing-research',
                'building-a-vuepress-powered-blog',
                'setup-a-server-manually',
                'TODO'
            ],

            '/': [
                ''
            ]
        },
        sidebarDepth: 2
    }
}