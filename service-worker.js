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
    "url": "404.html",
    "revision": "c16b0858cb447c8c6f9a309809c20b46"
  },
  {
    "url": "about/index.html",
    "revision": "0da55682a4a97d0b6d0b47793595a189"
  },
  {
    "url": "assets/css/0.styles.dc3f3953.css",
    "revision": "670025ce28da921117d0d4f5b9ebce5a"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.202169cf.js",
    "revision": "ea972b70771468d4b4210ec92d98397a"
  },
  {
    "url": "assets/js/11.551f2a43.js",
    "revision": "07732526d1178cf41c45f5ed785c2ab1"
  },
  {
    "url": "assets/js/12.42f8a9fe.js",
    "revision": "1157e1149c324299e3d5ba85c965d9f9"
  },
  {
    "url": "assets/js/13.3951b89a.js",
    "revision": "eacec6d75fdee7471b3c628158499e1c"
  },
  {
    "url": "assets/js/14.a3002729.js",
    "revision": "27db7c72e364836f4d70b5b7c2b5f316"
  },
  {
    "url": "assets/js/15.ba7ee142.js",
    "revision": "95577bd3a20e7601f615d64364576fce"
  },
  {
    "url": "assets/js/16.26806a90.js",
    "revision": "f25a672a08f5a53dcffb0bf82495a871"
  },
  {
    "url": "assets/js/17.5648db3f.js",
    "revision": "d4eb74a127a03396e492ed9a2634fbbc"
  },
  {
    "url": "assets/js/18.b20ad270.js",
    "revision": "75493cecf89a766874f6495c3b5edbb7"
  },
  {
    "url": "assets/js/19.d725c561.js",
    "revision": "12cb951e5f7649ccc5dd3cfc72f0d22d"
  },
  {
    "url": "assets/js/2.fba6a68c.js",
    "revision": "14760500bce882342717ef2ece826115"
  },
  {
    "url": "assets/js/20.d3372f99.js",
    "revision": "c7fad162c69a21c6f5318485f62b6c60"
  },
  {
    "url": "assets/js/21.d7501ee1.js",
    "revision": "652786a573b3a3aee308ef3a3961acd4"
  },
  {
    "url": "assets/js/22.381015ab.js",
    "revision": "8e8efcbcbc37261762fda68310c9ef98"
  },
  {
    "url": "assets/js/23.dda7af50.js",
    "revision": "efcc7424977b470a1fa45380b761d231"
  },
  {
    "url": "assets/js/24.90598be4.js",
    "revision": "097f6bae4e500df99edbd0d915ce65f6"
  },
  {
    "url": "assets/js/25.b75db8b6.js",
    "revision": "72e909a0825d1ce4a85de21c656c9421"
  },
  {
    "url": "assets/js/26.c3157074.js",
    "revision": "1c6f4b48f2313c63fab83891234de14a"
  },
  {
    "url": "assets/js/27.615bb25d.js",
    "revision": "0c2966fb881a52b31d85b1391397aef4"
  },
  {
    "url": "assets/js/28.fd336e74.js",
    "revision": "338de65a1cbb3af216c199abdc3d17d1"
  },
  {
    "url": "assets/js/29.c320f2ea.js",
    "revision": "6804360004437dcc0dbca2340efd31c8"
  },
  {
    "url": "assets/js/3.420795b9.js",
    "revision": "342f80665fc6bd19b951ce8e5c3695b9"
  },
  {
    "url": "assets/js/30.963cb87e.js",
    "revision": "16f91ced861d333b0d00f548d620f67c"
  },
  {
    "url": "assets/js/31.d65610f2.js",
    "revision": "4c1d023dd90b740e442e6e0ba59bb1ac"
  },
  {
    "url": "assets/js/32.46cf446d.js",
    "revision": "cac74261afb84c7e21948e4acd149f5c"
  },
  {
    "url": "assets/js/33.d3a867d3.js",
    "revision": "d0d7b68ec19504f266c75149babc4b58"
  },
  {
    "url": "assets/js/34.c4be9753.js",
    "revision": "ee71c755b684e9928d5ea8a1cc2d812f"
  },
  {
    "url": "assets/js/35.a7e84ead.js",
    "revision": "ae27b9d118d1c52d4d161ca9814fa14d"
  },
  {
    "url": "assets/js/36.12c73702.js",
    "revision": "414d5e10f03556e1a392989af5b38f95"
  },
  {
    "url": "assets/js/4.09468943.js",
    "revision": "5ad8aa78b5577ae3beaf6e6b380e4991"
  },
  {
    "url": "assets/js/5.7c0ae059.js",
    "revision": "1cf33a6176e8b29751797b808e24a484"
  },
  {
    "url": "assets/js/6.ade8a31f.js",
    "revision": "7006c3cdd7d062354564e3d9ec664a49"
  },
  {
    "url": "assets/js/7.1453e115.js",
    "revision": "85a975e24c6e0113864ab2f339eff78e"
  },
  {
    "url": "assets/js/8.0fbc40a1.js",
    "revision": "774d0567762381cbd06b9645d1aff454"
  },
  {
    "url": "assets/js/9.7cc75e4f.js",
    "revision": "9d6e32e58db9e3464ed2e97d5f1a700f"
  },
  {
    "url": "assets/js/app.95fbe573.js",
    "revision": "0a6ec5f1882b0760fe125f4f21b7e951"
  },
  {
    "url": "big-data/index.html",
    "revision": "9398d77eed0dcc20bffb8e2c8fedcdb7"
  },
  {
    "url": "c/index.html",
    "revision": "b8a0dafd3e352605a84e95d7a692eeeb"
  },
  {
    "url": "c/常量、变量与数据类型.html",
    "revision": "dd926ce91a1a39d9c68fd2679108f2a1"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "150693a6d6c199c3e773f0a596c17695"
  },
  {
    "url": "font/JetBrainsMono-Bold-Italic.woff",
    "revision": "cc9f0cedefdf486f160c42bb0b913d2a"
  },
  {
    "url": "font/JetBrainsMono-Bold.woff",
    "revision": "55c1134aa19a9745b9ec647d28d41532"
  },
  {
    "url": "font/JetBrainsMono-ExtraBold-Italic.woff",
    "revision": "acfbfb53c6ae04a0eed32cfba29470e0"
  },
  {
    "url": "font/JetBrainsMono-ExtraBold.woff",
    "revision": "8fb2b919c632aa14585e0b0df6ae618f"
  },
  {
    "url": "font/JetBrainsMono-Italic.woff",
    "revision": "9d9d24d12647f710199eb4df8780a01c"
  },
  {
    "url": "font/JetBrainsMono-Medium-Italic.woff",
    "revision": "2bd2a4a1613cb57da6e469ba6f2ecc93"
  },
  {
    "url": "font/JetBrainsMono-Medium.woff",
    "revision": "ef1089ea6d73b64008a2feef1f204f6b"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "front-end/index.html",
    "revision": "c1a726ac4f1955ea40d501e37d3d2f16"
  },
  {
    "url": "hello-world/Computing Machinery and Intelligence By A. M. Turing.html",
    "revision": "421ff5de4d29ab39eb24bd59ccd4ba45"
  },
  {
    "url": "hello-world/index.html",
    "revision": "f3787a02a2cd9acfd817daa33547d930"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "44da8bdc9931d8f28ed0d9965456615d"
  },
  {
    "url": "hello-world/关于Java编程部分的文章.html",
    "revision": "3dce723292e0deada9cf545c1fd29360"
  },
  {
    "url": "hello-world/学术研究的正确姿势.html",
    "revision": "6372bba1862951fb6f3a687ec510086e"
  },
  {
    "url": "hello-world/搭建一个基于 VuePress 的博客.html",
    "revision": "69afde31b891094e7cc20b94453dcefb"
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
    "url": "img/jetbrains.svg",
    "revision": "48b3f5c87ff00f11d7b0b0fd64fdd12e"
  },
  {
    "url": "img/licence.png",
    "revision": "44c7d2e043428bc130a424d81c2caebc"
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
    "revision": "fa4acd1275d4a1a2959283071c539a3e"
  },
  {
    "url": "java/API-工具类库.html",
    "revision": "5a4dd63339f0530718edebd1a364bb83"
  },
  {
    "url": "java/API-语言基础类库.html",
    "revision": "fa87e60aba3769518792f7ac63d22989"
  },
  {
    "url": "java/API-输入输出类库.html",
    "revision": "8ffc9cca293cbc6c7e46f22f346d0a05"
  },
  {
    "url": "java/index.html",
    "revision": "6e91b57cac713d2b945feed47d97128f"
  },
  {
    "url": "java/应用程序编程接口概述.html",
    "revision": "dc11bb6fbbc3e1a46d77e53d8ea16c88"
  },
  {
    "url": "java/语法.html",
    "revision": "819570dd5a66def86842bbd2034e5abb"
  },
  {
    "url": "java/面向对象.html",
    "revision": "5448cf45d7b0999c8be3a6904d30525a"
  },
  {
    "url": "kotlin/index.html",
    "revision": "ce9add642af012043c81a5b35207b93e"
  },
  {
    "url": "math/index.html",
    "revision": "6fe7a627ea4b4cebaa6e5d4f6d84b870"
  },
  {
    "url": "math/多元函数微分学.html",
    "revision": "dc944b063444622043eb81a7847fbe8c"
  },
  {
    "url": "python/index.html",
    "revision": "ddd60bebc602e930ed79265ad186b442"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "bd9ddbe768ecc13f0041324080995a99"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "e281cae6930363358bade0840d518568"
  },
  {
    "url": "software-engineering/软件过程.html",
    "revision": "4bdb36d8b1c560292a3b77441575ba13"
  },
  {
    "url": "spring/index.html",
    "revision": "f8c94b218a6396f1f181bdaa916380c1"
  },
  {
    "url": "web/HTTP.html",
    "revision": "fe8b76c0e8aa17011a5344e65c7e2c12"
  },
  {
    "url": "web/index.html",
    "revision": "29b2c10bba3b6a004abd8519fe5b6bb9"
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
