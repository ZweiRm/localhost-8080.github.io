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
    "revision": "2d303f9f4026c2e849481ded1fe05602"
  },
  {
    "url": "about/index.html",
    "revision": "3563586a3a30946f75b9642e313e1723"
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
    "url": "assets/js/10.cb7040d2.js",
    "revision": "78303c9bf68c229c14fed349d4310b34"
  },
  {
    "url": "assets/js/11.388fdd42.js",
    "revision": "b62eaa249f724b58950b097e0e33be6e"
  },
  {
    "url": "assets/js/12.72bfe954.js",
    "revision": "9fcab62c99e2ce33083062e8c0abfbad"
  },
  {
    "url": "assets/js/13.e4c93bbb.js",
    "revision": "1dfc9fbb88289b73d4b9a51ef9fb85be"
  },
  {
    "url": "assets/js/14.73c1f7b0.js",
    "revision": "188baea308e1c688f9152abdded67f9f"
  },
  {
    "url": "assets/js/15.58a37d1a.js",
    "revision": "bcf5e66bd2c88f28589b2d3e9b338bda"
  },
  {
    "url": "assets/js/16.0fb308fa.js",
    "revision": "7441a150cecf41a96844b13a7dde8feb"
  },
  {
    "url": "assets/js/17.861df562.js",
    "revision": "4e0f2626388fee3f2f4c7620e3db9fbb"
  },
  {
    "url": "assets/js/18.fb514733.js",
    "revision": "01fdc4b08355c8b1fb3368346c2573a4"
  },
  {
    "url": "assets/js/19.efdec22c.js",
    "revision": "298adcd61658692efb297ae533dac49b"
  },
  {
    "url": "assets/js/2.d3e9c765.js",
    "revision": "2b2cb8dfc9d1cac46680b7a52053d552"
  },
  {
    "url": "assets/js/3.502e7362.js",
    "revision": "c231b6601a2dd392dd9a2bf4cca2c491"
  },
  {
    "url": "assets/js/4.0de3c30a.js",
    "revision": "e63733a6a4ae91161bea2c4d901dae1c"
  },
  {
    "url": "assets/js/5.d2502665.js",
    "revision": "2cccd2d49d7fb099e6df07a1b0e5269c"
  },
  {
    "url": "assets/js/6.db21117c.js",
    "revision": "bb25efd0800643385174077ae21dc824"
  },
  {
    "url": "assets/js/7.3216b24b.js",
    "revision": "ed2d833140fc02df5423750cf5e4a250"
  },
  {
    "url": "assets/js/8.60e01a7e.js",
    "revision": "a99a26338793afe9dea0de4ef491de70"
  },
  {
    "url": "assets/js/9.90d214bd.js",
    "revision": "e63ce4ebd0cf820832c2f96b1da28c94"
  },
  {
    "url": "assets/js/app.821e7b19.js",
    "revision": "028188c9390840f252f2f1e0f1d83a0b"
  },
  {
    "url": "bigData/index.html",
    "revision": "4e4f7780473f2b88ededb2661aa839b0"
  },
  {
    "url": "deepLearning/index.html",
    "revision": "978b9e4c96e20036b97a764077e2146a"
  },
  {
    "url": "frontEnd/index.html",
    "revision": "5bfe5e222b2e192f96b31a97b64235a5"
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
    "revision": "e7f889cc585982baebb37357b77b3018"
  },
  {
    "url": "java/index.html",
    "revision": "47d618e482891e6339bf7d8c992f022d"
  },
  {
    "url": "java/应用程序编程接口.html",
    "revision": "bff50caa421b6778f93d8ebe28684b6f"
  },
  {
    "url": "java/语法.html",
    "revision": "7d7260e5ecb9a9a02611e40af93f8747"
  },
  {
    "url": "java/面向对象.html",
    "revision": "f1decc1eb73b1aa9b9a2c7888f7ed88d"
  },
  {
    "url": "kotlin/index.html",
    "revision": "71baee652d6e6fba0c9cf871281fd20c"
  },
  {
    "url": "softwareEngineering/index.html",
    "revision": "eeae1a8a446a535b17883f795d5d4d26"
  },
  {
    "url": "spring/index.html",
    "revision": "36fe92897df7bf97745887cfe06782f6"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "ab1318f5e0f09de3c77f5d39fe5de874"
  },
  {
    "url": "tittle-tattle/关于Java编程部分的文章.html",
    "revision": "3e6571190964a18246bd45d58cd774a0"
  },
  {
    "url": "tittle-tattle/新年快乐！.html",
    "revision": "0b452284c57ba041e7cded0a7b1ebfbf"
  },
  {
    "url": "web/index.html",
    "revision": "ca09122e5f509d97640902c5259ef993"
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
