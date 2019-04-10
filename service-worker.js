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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "e9da01098f3beabfafd92b28f953a034"
  },
  {
    "url": "about/index.html",
    "revision": "fe710bdb7583e39c817eee60b9dd687c"
  },
  {
    "url": "assets/css/0.styles.dcae4551.css",
    "revision": "439d826d57d7154c5ddbcf8f39f129c2"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.99fa2ff9.js",
    "revision": "f36139ebb52dae03fa8ee917f5078561"
  },
  {
    "url": "assets/js/11.078d100d.js",
    "revision": "f0e77817e14292343d334a0245aada0e"
  },
  {
    "url": "assets/js/12.66490535.js",
    "revision": "3ebfd55adecdf28aa6696b5d2ba54891"
  },
  {
    "url": "assets/js/13.a957225f.js",
    "revision": "2461b74a0a65bf0390a5318a2b3321a4"
  },
  {
    "url": "assets/js/14.ddfd711f.js",
    "revision": "f3d25aa2876eca528d455471b8099611"
  },
  {
    "url": "assets/js/15.bde10888.js",
    "revision": "dc999d5d77ae9842d8f6c1a57e64bff4"
  },
  {
    "url": "assets/js/16.7f11fa85.js",
    "revision": "1728f793b81be78053198f120156ccf6"
  },
  {
    "url": "assets/js/17.a0cd66c2.js",
    "revision": "cadfcba1a1af8e1216e51b07d6428466"
  },
  {
    "url": "assets/js/18.260f5e21.js",
    "revision": "a4cdeef6099f9a2658da48b1cb10c5e0"
  },
  {
    "url": "assets/js/19.d6157199.js",
    "revision": "7a8fb1025533b396053f073e3914a243"
  },
  {
    "url": "assets/js/2.d3e9c765.js",
    "revision": "2b2cb8dfc9d1cac46680b7a52053d552"
  },
  {
    "url": "assets/js/20.910e8aff.js",
    "revision": "786c11d39c1474965f3f38d3bcf0dc55"
  },
  {
    "url": "assets/js/3.045a4587.js",
    "revision": "a9f4cf4e4876b84d8d39f1bdb5f607a2"
  },
  {
    "url": "assets/js/4.282feb9e.js",
    "revision": "273137ae9985e29e15d257c15806c613"
  },
  {
    "url": "assets/js/5.82944546.js",
    "revision": "e4a72b0a3b9c876c1bfc165d4a678111"
  },
  {
    "url": "assets/js/6.970b9929.js",
    "revision": "7c7c38adaaea5dcbbf0dca28ce1d4bf5"
  },
  {
    "url": "assets/js/7.37fb698d.js",
    "revision": "e4e65e680cd601a376494c5eb3e63a93"
  },
  {
    "url": "assets/js/8.5a1e278c.js",
    "revision": "56ac1aaedeaf3d70f0c983fc7f928e63"
  },
  {
    "url": "assets/js/9.98a4b57d.js",
    "revision": "360e423aafa14a734a0a76b94360f9d3"
  },
  {
    "url": "assets/js/app.e2ca7533.js",
    "revision": "a2ca5759050a44217e6319732c85d3ba"
  },
  {
    "url": "bigData/index.html",
    "revision": "d26f80d60068ede074e6117fbf2f5d32"
  },
  {
    "url": "deepLearning/index.html",
    "revision": "1c442d22b5eaca0c1b5cb41cee1f49e3"
  },
  {
    "url": "frontEnd/index.html",
    "revision": "da7e25f4b227dd027fc92b7ce2ef3af1"
  },
  {
    "url": "img/ahza-white.png",
    "revision": "3c642eba43abc55fb6555dab8d743fcd"
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
    "url": "img/自动类型转换.png",
    "revision": "2f12d0fde58f56fdd54524ebac04368a"
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
    "revision": "62aad17988720809f3f10e876f5efeeb"
  },
  {
    "url": "java/index.html",
    "revision": "e6fd817137be59bce2cbcc3d2a669483"
  },
  {
    "url": "java/应用程序编程接口.html",
    "revision": "eb5be71958752c01f9a07d7d95b1b162"
  },
  {
    "url": "java/语法.html",
    "revision": "c12d54beb09f04a252638160af293df4"
  },
  {
    "url": "java/面向对象.html",
    "revision": "c8eca76e92b07ae9001c7b62518a2536"
  },
  {
    "url": "kotlin/index.html",
    "revision": "33ad5a6161cf79cc38319ba329721cf8"
  },
  {
    "url": "softwareEngineering/111.html",
    "revision": "425b7bfbea94651c2602295e04b2842d"
  },
  {
    "url": "softwareEngineering/index.html",
    "revision": "404cd87f9e27356e90f1923c6971332d"
  },
  {
    "url": "spring/index.html",
    "revision": "81b35f4f623b671258e4f5d169cd0a7e"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "474e837e9daaa546926573904408b9b8"
  },
  {
    "url": "tittle-tattle/关于Java编程部分的文章.html",
    "revision": "d8c040548f0ce58fc40382123535fe1a"
  },
  {
    "url": "tittle-tattle/新年快乐！.html",
    "revision": "c992797d1ee9ab89c68a9722014c153a"
  },
  {
    "url": "web/index.html",
    "revision": "1704d20bc75c8e740695b8369b4b68c1"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
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
