/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "about/index.html",
    "revision": "60d0811884cbc362cac76a3f5cb75dc2"
  },
  {
    "url": "assets/css/0.styles.077aaf28.css",
    "revision": "931a8423aafd47cb752599769d9a42c8"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.c8f48cb3.js",
    "revision": "b5528a5fd825d50fad17d2800294d9bd"
  },
  {
    "url": "assets/js/11.e5dcff6b.js",
    "revision": "2db0a29cf38f30bbf0181c8bd8bd6f1b"
  },
  {
    "url": "assets/js/12.b6af3f5a.js",
    "revision": "03e7c9ad386a637adfaf6f6cf813fdae"
  },
  {
    "url": "assets/js/13.d81d43c3.js",
    "revision": "86b4afbb13c077e478efc61d92615d3e"
  },
  {
    "url": "assets/js/14.103656be.js",
    "revision": "8b212c326900acccd426897f04297c29"
  },
  {
    "url": "assets/js/15.823e327b.js",
    "revision": "a0565cdc801c1b6d0c4265ebd883ebff"
  },
  {
    "url": "assets/js/16.9128e3cb.js",
    "revision": "5df96d30669405e1faf425181799e60b"
  },
  {
    "url": "assets/js/17.70f49628.js",
    "revision": "75fc2dd0066a744fb9a03475834df6b9"
  },
  {
    "url": "assets/js/18.328e2c21.js",
    "revision": "5563d0cc110fe9a4a6a92d5fdb208b1f"
  },
  {
    "url": "assets/js/19.6cb7ad03.js",
    "revision": "31d419493c5f60c77704fb9bc968d328"
  },
  {
    "url": "assets/js/2.8569c19c.js",
    "revision": "9203e55fdb717164f34a75761ca31c2c"
  },
  {
    "url": "assets/js/20.c318cab9.js",
    "revision": "133ce4a1492450c709b57a4390bb32b9"
  },
  {
    "url": "assets/js/21.cc26bce3.js",
    "revision": "5983f959c7baa94d731e836ece3cd32d"
  },
  {
    "url": "assets/js/22.0c0edc29.js",
    "revision": "3820eaa6e83158d42ed8790a11c23725"
  },
  {
    "url": "assets/js/23.5d0d8135.js",
    "revision": "e5f8f7be04232f58ea3b0481ac9db828"
  },
  {
    "url": "assets/js/24.cfa6dea3.js",
    "revision": "7f361a709bf1cf8929fde5f3ac98eec3"
  },
  {
    "url": "assets/js/25.aa728550.js",
    "revision": "9053165ab98e3e8bc373bb1b491a56e8"
  },
  {
    "url": "assets/js/26.e4fe1830.js",
    "revision": "fa042a28ca02b31ad2826f225b8f269f"
  },
  {
    "url": "assets/js/27.bc0b2a1f.js",
    "revision": "2c39a25d5cc281ff17fd9cefa86ce767"
  },
  {
    "url": "assets/js/28.61c175ee.js",
    "revision": "efe20a369bd014e8bb5ca7618585defa"
  },
  {
    "url": "assets/js/29.5572ab8b.js",
    "revision": "75d438ba3187a078ceb33d327515e95b"
  },
  {
    "url": "assets/js/3.52787017.js",
    "revision": "87a91c7e528199cf595c31ed721c37fb"
  },
  {
    "url": "assets/js/30.6d51077c.js",
    "revision": "aec9b0fef66ef987ad1a31765ffc44ed"
  },
  {
    "url": "assets/js/31.e78c47ed.js",
    "revision": "bb89b63986cdd3a5aa68acdef9d6b152"
  },
  {
    "url": "assets/js/32.4fc9911f.js",
    "revision": "824029df690db1c84e2e34df2f1de530"
  },
  {
    "url": "assets/js/33.90add7fe.js",
    "revision": "1cfdc3090001efb0fd6f470a3287f43e"
  },
  {
    "url": "assets/js/34.2a72d6f2.js",
    "revision": "0933b61b623b421f452920cddb799f8d"
  },
  {
    "url": "assets/js/35.c85b21b4.js",
    "revision": "0a0f0ee5b453b787a408eacb117e6481"
  },
  {
    "url": "assets/js/36.40c54119.js",
    "revision": "4ee86655f41f2615df032061316c2170"
  },
  {
    "url": "assets/js/4.1897e29e.js",
    "revision": "68fbc112e829af1213bd1f7dbd1459d5"
  },
  {
    "url": "assets/js/5.22e86231.js",
    "revision": "5e3a3f1a917d3606afcaf8cdd67a1a37"
  },
  {
    "url": "assets/js/6.6e6a3001.js",
    "revision": "886691af8ed74c70378bfb93df4b3050"
  },
  {
    "url": "assets/js/7.e2fd7935.js",
    "revision": "71e6d6c0d1beaead74e62a1f02de0ead"
  },
  {
    "url": "assets/js/8.daf34c6a.js",
    "revision": "d38a8b51c8441aa7fe67ab9a4054bac0"
  },
  {
    "url": "assets/js/9.80d6af13.js",
    "revision": "a59dfaaa5adff57bb685bbbfd116c2a0"
  },
  {
    "url": "assets/js/app.9473ddbb.js",
    "revision": "383f92ab5b90b7609b64e10567d9c33f"
  },
  {
    "url": "big-data/index.html",
    "revision": "5163271b0e3a258bd1fb9d01060c5778"
  },
  {
    "url": "c/index.html",
    "revision": "64967be2592659626dde45053512cf0d"
  },
  {
    "url": "c/常量、变量与数据类型.html",
    "revision": "3f631f1dad0d44c3aa3454ec58f595de"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "fbd0feed41790b2ab4b3c548cfefd5fd"
  },
  {
    "url": "front-end/index.html",
    "revision": "8bbccecb34894c31631c41e2f2ddb192"
  },
  {
    "url": "hello-world/Computing Machinery and Intelligence By A. M. Turing.html",
    "revision": "54a8153bdb39bf3ee1f37b033b77e0fd"
  },
  {
    "url": "hello-world/index.html",
    "revision": "b9a1b6dc396cbb469efce230f46eda37"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "5646c3793484924b222e76016a2574f2"
  },
  {
    "url": "hello-world/关于Java编程部分的文章.html",
    "revision": "d8a7501e70afc4d8f1ed65325d9245ad"
  },
  {
    "url": "hello-world/学术研究的正确姿势.html",
    "revision": "9cd32871cbcf8c3c6a4ed929f73198cd"
  },
  {
    "url": "hello-world/搭建一个基于 VuePress 的博客.html",
    "revision": "83a8156948a23b53f690b2f44c64c10f"
  },
  {
    "url": "img/ahza-white.png",
    "revision": "3c642eba43abc55fb6555dab8d743fcd"
  },
  {
    "url": "img/buildOpt.png",
    "revision": "886f601b0b53e21c83d5cd5028bc63ba"
  },
  {
    "url": "img/C程序的基本结构.jpg",
    "revision": "7a23f1d4d04270c9354597cf2499dee4"
  },
  {
    "url": "img/githubPages.png",
    "revision": "97c8e590f37706ee70ea0290c6ed9b41"
  },
  {
    "url": "img/gitIgnore.png",
    "revision": "6723b20674aac0d6ce0e5a9846964652"
  },
  {
    "url": "img/LinkedList.png",
    "revision": "14e3dd4e083426cf400833e2d5bcb8da"
  },
  {
    "url": "img/localhost.png",
    "revision": "0d631a6440230ebaddd061f434e9b9ac"
  },
  {
    "url": "img/me.jpg",
    "revision": "503f59be9b5549c306c7844f21ce29d9"
  },
  {
    "url": "img/newRepository.png",
    "revision": "20e44f9204eb5b789c6b12a92a168e59"
  },
  {
    "url": "img/newSite.png",
    "revision": "c7bfdd239436a732c8b23014a848029a"
  },
  {
    "url": "img/String_01.jpg",
    "revision": "11b3982523c6af8894622532eed1a068"
  },
  {
    "url": "img/String_02.jpg",
    "revision": "4d1449eb96ec89b47f29b1868a7398c6"
  },
  {
    "url": "img/String_03.jpg",
    "revision": "f6bf942c85e323a3dad1ebad7d6eef9d"
  },
  {
    "url": "img/String_04.jpg",
    "revision": "775360a6802adb1f6f167d363c9246ea"
  },
  {
    "url": "img/String_05.jpg",
    "revision": "33787b7a1f680a9b4cac506f314caacb"
  },
  {
    "url": "img/String_06.jpg",
    "revision": "208c3d93aa4a253aa076fb63b4637484"
  },
  {
    "url": "img/String_07.jpg",
    "revision": "4c6e51e847a402939a0e2c840237b8e2"
  },
  {
    "url": "img/String_08.jpg",
    "revision": "6ef630def6c439bf0ecd2e2b2b5bd95d"
  },
  {
    "url": "img/updateREADME.png",
    "revision": "bb76cb7e383ef9392104c283ed91e2c5"
  },
  {
    "url": "img/内存管理.jpg",
    "revision": "e4eb17b76cf8bbbd913b2a0ef66f3cd1"
  },
  {
    "url": "img/单继承.jpg",
    "revision": "5759f1246d90abcc7299dc73c1963043"
  },
  {
    "url": "img/多继承.jpg",
    "revision": "1ce2ff44e482e0b25a7b4be465fb6f49"
  },
  {
    "url": "img/文章被拒过程分析.png",
    "revision": "93a0f89798a24095caa63ae1163ed024"
  },
  {
    "url": "img/棋盘法.png",
    "revision": "3510ab577c8babbf75ba42fc502b1b6e"
  },
  {
    "url": "img/线程状态.png",
    "revision": "61e45bcbe860fb495c362e8e23f281a0"
  },
  {
    "url": "img/自动类型转换.png",
    "revision": "2f12d0fde58f56fdd54524ebac04368a"
  },
  {
    "url": "img/论文结构图.jpg",
    "revision": "c2f1ce9bab73bd445cda17969f294f3a"
  },
  {
    "url": "img/软件开发的本质.jpg",
    "revision": "330e888bac7671219bed6e813f375383"
  },
  {
    "url": "img/运算符优先级.png",
    "revision": "60cb8dabdd6a309636fca5ad623586c3"
  },
  {
    "url": "img/间接继承.jpg",
    "revision": "5aeb9041bba3e529d14787cdd817937e"
  },
  {
    "url": "img/静态内存.png",
    "revision": "d1a5f305719c2871e0f0aab66fd02a1d"
  },
  {
    "url": "index.html",
    "revision": "3b6894a2812338b7eb5922652f12191d"
  },
  {
    "url": "java/API-工具类库.html",
    "revision": "e0082d464c6d74927bd801f2deb3a5d2"
  },
  {
    "url": "java/API-语言基础类库.html",
    "revision": "92fffb717ddb1159e53f5da1114271a5"
  },
  {
    "url": "java/API-输入输出类库.html",
    "revision": "de5ecc4215c515e48404d104c0efb526"
  },
  {
    "url": "java/index.html",
    "revision": "96dff878619ad8310d896caffa601819"
  },
  {
    "url": "java/应用程序编程接口概述.html",
    "revision": "2b0163fd7ccc076b455b652b2744e677"
  },
  {
    "url": "java/语法.html",
    "revision": "2ae5892e858a904e868078646d02587c"
  },
  {
    "url": "java/面向对象.html",
    "revision": "ba8088a86efa1311e4b4307ff7222a26"
  },
  {
    "url": "kotlin/index.html",
    "revision": "a926ef78bffa11601709fbcaf83d13c9"
  },
  {
    "url": "math/index.html",
    "revision": "ac23044e878d437a2c1423fa454198e3"
  },
  {
    "url": "math/多元函数微分学.html",
    "revision": "ccac4c97661bf3d37b86bb9e5d790a21"
  },
  {
    "url": "python/index.html",
    "revision": "2e0778709c7414cc3efb274ea84dd3a9"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "1723a0969eebf2203cbb4eb0c57ebd4d"
  },
  {
    "url": "software-engineering/软件过程.html",
    "revision": "5c70ecd6e1dcc02677ae3f22d413e1f9"
  },
  {
    "url": "spring/index.html",
    "revision": "5fdb8ee1ad026ffb4497cca5b81b095c"
  },
  {
    "url": "web/HTTP.html",
    "revision": "56a7442476a3885df5b1d3f72cc7f603"
  },
  {
    "url": "web/index.html",
    "revision": "e64fcf873be3d43bd7ad75ad76a79367"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
