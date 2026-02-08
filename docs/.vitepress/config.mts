import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "本地煮鸡:8080",
  description: "一个博客, 会记录一些技术笔记",
  lang: 'zh-CN',
  head: [
      ['link', { rel: 'icon', href: './img/favicon.ico' }],
      [
          'script',
          { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=UA-132436049-1' }
      ],
      [
          'script',
          {},
          `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-132436049-1');`
      ]
  ],
  themeConfig: {
    nav: [
        {
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
                { text: 'Android Frameworks', items: [
                    { text: 'Framework', link: '/framework/'},
                ]}
            ]
        },
        { text: '码云', link: 'https://gitee.com/zweirm/' },
        { text: '关于', link: '/about/' },
    ],
    sidebar: {
        '/java/': [{
            text: 'Java', link: 'java/index',
            items: [
                { text: '语法', link: 'java/grammars'},
                { text: '面向对象', link: 'java/object-oriented'},
                { text: 'API-介绍', link: 'java/API-introduction'},
                { text: 'API-语言基础类库', link: 'java/API-lang'},
                { text: 'API-语言基础类库2', link: 'java/API-lang2'},
                { text: 'API-工具类库', link: 'java/API-util'},
                { text: 'API-工具类库2', link: 'java/API-util2'},
                { text: 'API-工具类库3', link: 'java/API-util3'},
                { text: 'API-输入输出类库', link: 'java/API-io'},
                { text: 'Java 虚拟机', link: 'java/jvm'},
                { text: '参考文献嚯资料', link: 'java/references'}
            ]
        }],
        '/hello-world/' :[{
            text: 'Hello World!', link: 'hello-world/index',
            items: [
                { text: 'Computing Machinery and Intelligence', link: 'hello-world/computing-machinery-and-intelligence'},
                { text: '学术研究的正确姿势', link: 'hello-world/the-right-way-doing-research'},
                { text: '搭建一个基于 VuePress 的博客', link: 'hello-world/building-a-vuepress-powered-blog'},
                { text: '手动配置一台服务器', link: 'hello-world/setup-a-server-manually'},
                { text: '数组和链表', link: 'hello-world/array-and-linked-list'},
                { text: 'TODO', link: 'hello-world/TODO'}
            ]
        }],
        '/kotlin/' :[{
            text: 'Kotlin', link: 'kotlin/index'
        }],
        '/python/' :[{
            text: 'Python', link: 'python/index',
            items: [
                { text: '语法', link: 'python/grammar'}
            ]
        }],
        '/c/' :[{
            text: 'C', link: 'c/index',
            items: [
                { text: '常量与数据结构', link: 'c/constant-variable-and-data-type'}
            ]
        }],
        '/web/' :[{
            text: 'Web', link: 'web/index',
            items: [
                { text: 'HTTP', link: 'web/HTTP'}
            ]
        }],
        '/spring/' :[{
            text: 'Spring', link: 'spring/index',
            items: [
                { text: '总览', link: 'spring/overall'},
                { text: 'IoC', link: 'spring/ioc'},
                { text: '参考文献与资料', link: 'spring/references'},
            ]
        }],
        '/redis/' :[{
            text: 'Redis', link: 'redis/index',
            items: [
                { text: '缓存', link: 'redis/cache'},
                { text: '集群', link: 'redis/cluster'},
                { text: '数据结构', link: 'redis/data-structure'},
                { text: '持久化', link: 'redis/persistence'},
            ]
        }],
        '/deep-learning/': [{
            text: 'Deep Learning', link: 'deep-learning/index',
            items: [
                { text: 'Logistic Regression as a Neural Network', link: 'deep-learning/logistic-regression-as-a-neural-network'},
                { text: 'Python and Vectorization', link: 'deep-learning/python-and-vectorization'}
            ]
        }],
        '/quantitative-methods-for-DA-AI/': [{
            text: 'Quantitative Methods for DA and AI', link: 'quantitative-methods-for-DA-AI/index'
        }],
        '/artificial-intelligence/': [{
            text: 'Artificial Intelligence', link: 'artificial-intelligence/index',
            items: [
                { text: 'Search Strategies', link: 'artificial-intelligence/search-strategies'}
            ]
        }],
        '/software-engineering/': [{
            text: '软件工程', link: 'software-engineering/index',
            items: [
                { text: '软件过程', link: 'software-engineering/software-process'}
            ]
        }],
        '/math/': [{
            text: '数学', link: 'math/index',
            items: [
                { text: '多元函数微分', link: 'math/multivariate-function-differential'}
            ]
        }],
        '/algorithm/': [{
            text: '算法', link: 'algorithm/index',
            items: [
                { text: '算法 01', link: 'algorithm/ds-001'},
                { text: '算法 02', link: 'algorithm/ds-002'},
                { text: '算法 03', link: 'algorithm/ds-003'},
                { text: '动态规划', link: 'algorithm/dynamic-programming'}
            ]
        }],
        '/recommender-systems/': [{
            text: 'Recommender Systems', link: 'recommender-systems/index',
            items: [
                { text: 'Introduction', link: 'recommender-systems/introduction'}
            ]
        }],
        '/mysql/':[{
            text: 'MySQL', link: 'mysql/index',
            items: [
                { text: '事务', link: 'mysql/transaction'},
                { text: '索引', link: 'mysql/indices'},
                { text: '锁', link: 'mysql/lock'},
                { text: '分库分表', link: 'mysql/divide'},
                { text: '参考文献或资料', link: 'mysql/references'}
            ]
        }],
        '/hadoop/' :[{
            text: 'Hadoop', link: 'hadoop/index'
        }],
        '/framework/':[{
            text: 'Android Frameworks', link: 'framework/index',
            items: [
                { text: 'Activity 启动流程', link: 'framework/activity-launching-process' },
                { text: 'performTraversal', link: 'framework/performTraversal' },
                { text: 'Android 12 容器层级', link: 'framework/container'},
                { text: 'Android 16 新特性', link: 'framework/android16'},
            ]
        }],
    },
    socialLinks: [
        { icon: 'github', link: 'https://github.com/ZweiRm/localhost-8080.github.io' }
    ],
    footer: {
        message: '本作品由<a rel="contributors" target="_blank" href="https://github.com/ZweiRm/localhost-8080.github.io/graphs/contributors"><img style="display:inline" alt="GitHub contributors" src="https://img.shields.io/github/contributors/ZweiRm/localhost-8080.github.io.svg?label=%E8%B4%A1%E7%8C%AE%E8%80%85&logo=github&logoColor=3EAF7C&style=social"></a>创作，采用<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议</a>进行许可。<div style="display: flex; justify-content: center; align-items: center;"><a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="/img/licence.png" /></a></div>',
        copyright: 'Copyright © 2018-2026 localhost-8080.io'
    },
    editLink: {
        text: '请帮助我改善此页面!',
        pattern: 'https://github.com/ZweiRm/localhost-8080.github.io'
    },
    search: {
        provider: 'local',
            options: {
                locales: {
                    zh: {
                        translations: {
                            button: {
                              buttonText: '搜索文档',
                              buttonAriaLabel: '搜索文档'
                            },
                            modal: {
                                noResultsText: '无法找到相关结果',
                                resetButtonTitle: '清除查询条件',
                                footer: {
                                  selectText: '选择',
                                  navigateText: '切换'
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    sitemap: {
        hostname: 'https://localhost-8080.io'
    }
})
