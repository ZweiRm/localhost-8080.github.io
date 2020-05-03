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
    "revision": "817dd864c3081b29884ecd9dc606d9ae"
  },
  {
    "url": "about/index.html",
    "revision": "9d1edac4488f1a093510ea3a4b1c0166"
  },
  {
    "url": "assets/css/0.styles.be3a30ad.css",
    "revision": "6aaec3f023fa5372f986adeebdf094d2"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.7e77314c.js",
    "revision": "d273ac23df2f873d0c233cd97a3aff76"
  },
  {
    "url": "assets/js/11.8bbe93c1.js",
    "revision": "d41977bbdda953c2e938ca15aa7e6c17"
  },
  {
    "url": "assets/js/12.106b72df.js",
    "revision": "d15321181ca5efc4ea4410fa301a7a4f"
  },
  {
    "url": "assets/js/13.30546eb9.js",
    "revision": "048218c1567f67da3211f2d6b92512ea"
  },
  {
    "url": "assets/js/14.04b82385.js",
    "revision": "5eae5694ea25ad77d87f3d0cf832b9fd"
  },
  {
    "url": "assets/js/15.631126b0.js",
    "revision": "0e009bca4ad249c55212905f2352896b"
  },
  {
    "url": "assets/js/16.c6663bcd.js",
    "revision": "a34b58e8b6573d4b39af497fa1919e76"
  },
  {
    "url": "assets/js/17.34090877.js",
    "revision": "9371d3a7598c6af651c123ad321568fb"
  },
  {
    "url": "assets/js/18.6a76f226.js",
    "revision": "04968f78f8aceac1ef9925a05bde1089"
  },
  {
    "url": "assets/js/19.f04b56cd.js",
    "revision": "a66da51aedb953d95c59206a911fe629"
  },
  {
    "url": "assets/js/2.b3a1af15.js",
    "revision": "05cc6380cc487fc0c50a98ab1831cbe5"
  },
  {
    "url": "assets/js/20.4a4130e8.js",
    "revision": "9f6f8c0b2980b21f6bb8d5d8b84eab9e"
  },
  {
    "url": "assets/js/21.297bda52.js",
    "revision": "b84dbae2f9f80e492f8c719fe754a179"
  },
  {
    "url": "assets/js/22.92047c7d.js",
    "revision": "3e2564a2276272159395e832f4b0ed91"
  },
  {
    "url": "assets/js/23.00095962.js",
    "revision": "61556c392fe441a934ecfa20b1767f16"
  },
  {
    "url": "assets/js/24.a1005230.js",
    "revision": "3c23a3cdffcd69f6678744724b1cdfb7"
  },
  {
    "url": "assets/js/25.9cdf056e.js",
    "revision": "7ae93001a030db0b6b5c71480a6d24ab"
  },
  {
    "url": "assets/js/26.b0a72755.js",
    "revision": "eb6057bd86bc7c585a9e641e583de5d0"
  },
  {
    "url": "assets/js/27.f297be8c.js",
    "revision": "61ee3c0718ed4014d87e0137893507a2"
  },
  {
    "url": "assets/js/28.0721f2f4.js",
    "revision": "5b3c3d650f040ec32f8944dadd6af803"
  },
  {
    "url": "assets/js/29.3dc1581b.js",
    "revision": "78c5e5f4283e4030d13980f085c03725"
  },
  {
    "url": "assets/js/3.406f2939.js",
    "revision": "001cc06a72fba18f69f8e094065c6b43"
  },
  {
    "url": "assets/js/30.753ab81c.js",
    "revision": "103ac1213a6e3ba919015d2e09f921e4"
  },
  {
    "url": "assets/js/31.9458501a.js",
    "revision": "82b266e1e2b8b238bf580ec7f7aeb9df"
  },
  {
    "url": "assets/js/32.43b0e8e9.js",
    "revision": "7000d0e75c2566ab40b0120e33f5c1be"
  },
  {
    "url": "assets/js/33.5977f1b9.js",
    "revision": "82c67a878b9c509a8f88e81802277d86"
  },
  {
    "url": "assets/js/34.8a115c2d.js",
    "revision": "159307ba10d5f292ca7363094bb8d7b9"
  },
  {
    "url": "assets/js/35.c61e393d.js",
    "revision": "31447ca15bd07e5a1971a09014a2ed4c"
  },
  {
    "url": "assets/js/36.f9e6d22f.js",
    "revision": "6cbcce8d045aafe16f8595bcb195a05b"
  },
  {
    "url": "assets/js/4.9c1eebfe.js",
    "revision": "6d94e89cdbf186e68a610d5b2cdbb596"
  },
  {
    "url": "assets/js/5.cae4db1b.js",
    "revision": "ce851da1b6f7f70f294dc356bc99b222"
  },
  {
    "url": "assets/js/6.9900adda.js",
    "revision": "459d2a18611996a2440ce67ec9174f81"
  },
  {
    "url": "assets/js/7.6ea4ce3d.js",
    "revision": "a6ebda0b785ab3e8c45b4f4d5241358e"
  },
  {
    "url": "assets/js/8.49245203.js",
    "revision": "aa602f3b226d54dd011ab69dd97f9cab"
  },
  {
    "url": "assets/js/9.8362f4bf.js",
    "revision": "92c8d28faf5d9a96903e9d08b7dbfc5c"
  },
  {
    "url": "assets/js/app.9a1a88c8.js",
    "revision": "203b0b8f64836fcd39f3c0d759bed41d"
  },
  {
    "url": "big-data/index.html",
    "revision": "f2400f55a2e0d3857c8ac86ffcc03b37"
  },
  {
    "url": "c/index.html",
    "revision": "5b08726824b83f8cc43b0822a19059bf"
  },
  {
    "url": "c/常量、变量与数据类型.html",
    "revision": "baa1668a65daa51d4ac09d48bc382a0b"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "b3ed4354101e7c509ff507c1936f18f9"
  },
  {
    "url": "front-end/index.html",
    "revision": "8418ce24a273a19a809966cf7c9f9cb5"
  },
  {
    "url": "hello-world/Computing Machinery and Intelligence By A. M. Turing.html",
    "revision": "4fa4a34ae7ea36ab8d70dbf4fae59f1a"
  },
  {
    "url": "hello-world/index.html",
    "revision": "1bd46dec07c203a38d15cb1fd639c73f"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "ed6e6a76d1ac13bcf998ac0863834c32"
  },
  {
    "url": "hello-world/关于Java编程部分的文章.html",
    "revision": "037218d831fe1ef5399dce1b078e5316"
  },
  {
    "url": "hello-world/学术研究的正确姿势.html",
    "revision": "370733d20f33350d64644f822836fee2"
  },
  {
    "url": "hello-world/搭建一个基于 VuePress 的博客.html",
    "revision": "20254fc7c8da036be2cefe73c445325e"
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
    "revision": "f600f5d215a36e5b35a02f3c380f2a0d"
  },
  {
    "url": "java/API-工具类库.html",
    "revision": "641ec841bf9869c8f96dbf0ada9a66a5"
  },
  {
    "url": "java/API-语言基础类库.html",
    "revision": "8d876d004101a07a4e40cf49d4e776ea"
  },
  {
    "url": "java/API-输入输出类库.html",
    "revision": "17f239adb159cad962d6d20e29701a4a"
  },
  {
    "url": "java/index.html",
    "revision": "b7ca0b8f67ccfd3a2e881e2cefc40999"
  },
  {
    "url": "java/应用程序编程接口概述.html",
    "revision": "b0c87d22f9b0cde9f3ce93f67e25c0f5"
  },
  {
    "url": "java/语法.html",
    "revision": "355a95cd5d58e3be8c7cd3df93839432"
  },
  {
    "url": "java/面向对象.html",
    "revision": "108bacad9d4af18118c024d9cf427b81"
  },
  {
    "url": "kotlin/index.html",
    "revision": "e9dbba7630fa529b59f2ee5341207d3b"
  },
  {
    "url": "math/index.html",
    "revision": "2b6710b878c8a3233d4471cabfb3c71d"
  },
  {
    "url": "math/多元函数微分学.html",
    "revision": "f084445a507575e3356fc68ca48713b1"
  },
  {
    "url": "python/index.html",
    "revision": "12ae84f37d9031399fa7f2982e890672"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "14c7d7f040038aa189ea00bc9221a6a7"
  },
  {
    "url": "software-engineering/软件过程.html",
    "revision": "e78f9b831e5b04730c77f68c001add47"
  },
  {
    "url": "spring/index.html",
    "revision": "801b50be4f6d1a7d0fe7f0e0d552e83f"
  },
  {
    "url": "web/HTTP.html",
    "revision": "e13390472aaf47ef82f80a6706b63ba5"
  },
  {
    "url": "web/index.html",
    "revision": "bd7503964a584a839a5293eb71b2c198"
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
