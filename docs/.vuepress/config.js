module.exports = {
    title: '本地煮鸡:8080', 
    description: '个人博客，大概会记录一些技术笔记',
    head: [
        ['link', { rel: 'icon', href: '/img/favicon.ico' }]
    ],
    themeConfig: {
        repo: 'ZweiRm/localhost-8080.github.io',
        repoLabel: '查看源码',
        editLinks: true,
        editLinkText: '帮助我改善此页面！',
        nav: [
            { text: '主页', link: '/' },
            { text: '博文',
              items: [
                { text: 'Java', link: '/java/' },
                { text: 'Kotlin', link: '/kotlin/' },
                { text: 'Web', link: '/web/' },
                { text: 'Spring', link: '/spring/' },
                { text: '大数据', link: '/bigData/' },
                { text: '前端', link: '/frontEnd/' },
                { text: '深度学习', link: '/deepLearning/' },
                { text: '杂谈', link: '/tittle-tattle/' }
              ] 
            },
            { text: '关于', link: '/about/' },
            { text: 'Github', link: 'https://www.github.com/ZweiRm' },
            { text: '码云', link: 'https://gitee.com/zweirm/' },
        ],
        sidebar: {
            '/java/': [
                '',
                '语法', 
            ],

            '/kotlin/': [
                "",
            ],

            '/web/': [
                "",
            ],

            '/spring/': [
                "",
            ],

            '/bigData/': [
                "",
            ],
            
            '/frontEnd/': [
                "",
            ],

            '/deepLearning/': [
                "",
            ],

            '/tittle-tattle/': [
                "",
            ],

            '/': [
                '',
            ]
        },
        sidebarDepth: 2,
        lastUpdated: '上次更新: ',
        serviceWorker: {
            updatePopup: { 
                message: "有新文章更新了", 
                buttonText: "刷新" 
            }
        }
    },
    serviceWorker: true,
}