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
    "revision": "2a9f9c7b4740ab7649a4b17bef66ac29"
  },
  {
    "url": "about/index.html",
    "revision": "efd79f03967d4b9a993a126c975b81c8"
  },
  {
    "url": "assets/css/0.styles.c99e36f2.css",
    "revision": "ce89a2bd3d2e9b372adad319ee94c61c"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.4b6771ad.js",
    "revision": "5f77b792eaba776fd6bbec90543d3f64"
  },
  {
    "url": "assets/js/11.ac64d24f.js",
    "revision": "91cfa7bcbaddd906a0f040a8129572b0"
  },
  {
    "url": "assets/js/12.bcdee977.js",
    "revision": "93dce016603c976de22e88ac9ebba5b2"
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
    "url": "assets/js/16.fd88cdc6.js",
    "revision": "e58c5e0f666569c6bc255dd2489bd3f1"
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
    "url": "assets/js/22.029a032f.js",
    "revision": "743adff6e1b9f30a1ff5ce1b3d684221"
  },
  {
    "url": "assets/js/23.010410df.js",
    "revision": "40f12e167ca840251ecdd591adef382e"
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
    "url": "assets/js/26.89df46f8.js",
    "revision": "b3079f892b17fb214394fab6e46e3bd1"
  },
  {
    "url": "assets/js/27.fdad306a.js",
    "revision": "a54aad3528c096c8d1516a50c19d4b41"
  },
  {
    "url": "assets/js/28.82ab9bb1.js",
    "revision": "e78fe5e81993342e8b6258cf75055558"
  },
  {
    "url": "assets/js/29.726b3fda.js",
    "revision": "cd706ba3497ac415dc6243ecc2b88ab3"
  },
  {
    "url": "assets/js/3.420795b9.js",
    "revision": "342f80665fc6bd19b951ce8e5c3695b9"
  },
  {
    "url": "assets/js/30.cb1d8ef9.js",
    "revision": "628477ecffd25ba98e776ffba5588e0c"
  },
  {
    "url": "assets/js/31.380ca00e.js",
    "revision": "dd96e50ed2e114a2d0d650f74c618b42"
  },
  {
    "url": "assets/js/32.58ca9146.js",
    "revision": "9675752912b1e09e76441c8ec2a7255e"
  },
  {
    "url": "assets/js/33.74aeb8e0.js",
    "revision": "eee614c9176455897d8805f4dceb22c4"
  },
  {
    "url": "assets/js/34.b0b008b8.js",
    "revision": "f8f9f702ab23e5ece75664285d47e5fd"
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
    "url": "assets/js/app.3bcef88b.js",
    "revision": "0ce36aeb7d074858b0859532decee391"
  },
  {
    "url": "big-data/index.html",
    "revision": "240048be45594ecd87f7ed3b65bf1388"
  },
  {
    "url": "c/index.html",
    "revision": "4c5a27c4ae72221101b93397bf97040a"
  },
  {
    "url": "c/常量、变量与数据类型.html",
    "revision": "a9b7d801aa20a2251f86fca5849ec69c"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "200242d8a85f83a20ecfa023346bbef7"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "front-end/index.html",
    "revision": "cd919b47438fe1d315111e07993b0fa8"
  },
  {
    "url": "hello-world/Computing Machinery and Intelligence By A. M. Turing.html",
    "revision": "9625b53c3ba6861b53c63cca0cb2ddb2"
  },
  {
    "url": "hello-world/index.html",
    "revision": "db4526880294cc6f6900b1ee33ad1ab7"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "d1b393df0c332c666b16e9b04ec2a6d5"
  },
  {
    "url": "hello-world/关于Java编程部分的文章.html",
    "revision": "241e47278dc8458bd9f86e947fe1e6f9"
  },
  {
    "url": "hello-world/学术研究的正确姿势.html",
    "revision": "bee152a0ea46c3452f47bbdaecc212cc"
  },
  {
    "url": "hello-world/搭建一个基于 VuePress 的博客.html",
    "revision": "78de7cd0d4cddabdc87de7e19459ab9b"
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
    "revision": "a98bef91094ebe32f1f2125e9ed51ddf"
  },
  {
    "url": "java/API-工具类库.html",
    "revision": "493c9e633ddafa2e369d88d2763c8656"
  },
  {
    "url": "java/API-语言基础类库.html",
    "revision": "aea473e765bcf42cde656508ef949c52"
  },
  {
    "url": "java/API-输入输出类库.html",
    "revision": "b160fdf6a6aad56f79975f572fcaae4d"
  },
  {
    "url": "java/index.html",
    "revision": "38335f90b38d943754ec0b0460a65a72"
  },
  {
    "url": "java/应用程序编程接口概述.html",
    "revision": "830a4013089b30af27e4f77e10aeb746"
  },
  {
    "url": "java/语法.html",
    "revision": "efb5c4d9dcf7aa3663043220f875071b"
  },
  {
    "url": "java/面向对象.html",
    "revision": "9ad980ee402e48a4b47f07c031800210"
  },
  {
    "url": "kotlin/index.html",
    "revision": "2fd1c4f32cbe21480dbc686cd122fe4e"
  },
  {
    "url": "math/index.html",
    "revision": "2f943af1a32e62ba421c360beada37fe"
  },
  {
    "url": "math/多元函数微分学.html",
    "revision": "8fad993d03decaba577fdb6bd846c7fc"
  },
  {
    "url": "python/index.html",
    "revision": "e2c47efbec466a206a3276f01acc0b87"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "1fbeaf26eb2fecb138cd026fa059d84e"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "14042c9ad665d36f8a31f4d050fe891d"
  },
  {
    "url": "software-engineering/软件过程.html",
    "revision": "8a45f6fe197b4684a8207363e1bdc547"
  },
  {
    "url": "spring/index.html",
    "revision": "2b4cc35ea0676755cb901ca809b8d9ab"
  },
  {
    "url": "web/HTTP.html",
    "revision": "86c63e8b29909a252605109f8cc7723f"
  },
  {
    "url": "web/index.html",
    "revision": "01d3e5e350535a7dd25ab94a1f4d73dc"
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
