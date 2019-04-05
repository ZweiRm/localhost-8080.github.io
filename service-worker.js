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
    "revision": "3e0e3a9126d19860d2cce9e4676fb401"
  },
  {
    "url": "about/index.html",
    "revision": "f465b2da13e6e11b226fed4a7654a529"
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
    "url": "assets/js/10.ee0da143.js",
    "revision": "a12a4480dd93ad51883868e13b3f4216"
  },
  {
    "url": "assets/js/11.248956a3.js",
    "revision": "b5ce81ba0aad4b817da8847c7abc30e0"
  },
  {
    "url": "assets/js/12.efcee083.js",
    "revision": "34f7217a82a7fdfa83de793abbb83817"
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
    "url": "assets/js/16.a1fb2a56.js",
    "revision": "6c9a8a8239f1625d0077367cd27319ba"
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
    "url": "assets/js/8.b9be2a96.js",
    "revision": "4d54ec9f8725fd1e59cbeac5d367ce0f"
  },
  {
    "url": "assets/js/9.5d1a0287.js",
    "revision": "d38620c889f1f4cfce1c305e48f7a18d"
  },
  {
    "url": "assets/js/app.51ac89f7.js",
    "revision": "7a4a3f27689d8d02df035fded6729662"
  },
  {
    "url": "bigData/index.html",
    "revision": "778eff54361299132afc3a77248abcc3"
  },
  {
    "url": "deepLearning/index.html",
    "revision": "92afc2d0a3ec47c360c23ece46b7ce1b"
  },
  {
    "url": "frontEnd/index.html",
    "revision": "27c6a8d6bacb99ec1be43853e179756d"
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
    "revision": "42cd1ee5e815a5fab9902f3f7db1a394"
  },
  {
    "url": "java/index.html",
    "revision": "3283d931f103cec8231523168aaf59bf"
  },
  {
    "url": "java/语法.html",
    "revision": "669288e56e7ee000090b04458359c07c"
  },
  {
    "url": "java/面向对象.html",
    "revision": "c1cf9a2bc495b512ae0ca16afaaea0f8"
  },
  {
    "url": "kotlin/index.html",
    "revision": "075395c5d8d96289d6c48f8c7cb50e6b"
  },
  {
    "url": "softwareEngineering/111.html",
    "revision": "acdae7486e9ff46e710ca14b0d31e865"
  },
  {
    "url": "softwareEngineering/index.html",
    "revision": "cb03c5c589eb7e20213a5476e25f4ce1"
  },
  {
    "url": "spring/index.html",
    "revision": "acf1736d6e28337d24e7465fcc455942"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "5be46888f27b9152f1c1c16deda640c0"
  },
  {
    "url": "tittle-tattle/关于Java编程部分的文章.html",
    "revision": "eea6655c790560a4788b85b3102f0ae8"
  },
  {
    "url": "tittle-tattle/新年快乐！.html",
    "revision": "99b5faac2e568bf09ea0080499d6663a"
  },
  {
    "url": "web/index.html",
    "revision": "e75a4823381b6d6bdf1e592f468ab33f"
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
