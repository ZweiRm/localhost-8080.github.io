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
    "revision": "df749fd07082aa295b3e38b488f517d3"
  },
  {
    "url": "about/index.html",
    "revision": "cc3a39826208831632688659035c9177"
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
    "url": "assets/js/10.d5899f0c.js",
    "revision": "8f0cd43403f41e863d974f68872d1fcd"
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
    "url": "assets/js/9.42c78285.js",
    "revision": "24184bc4b2099f0c2cabf4c6253cdc0b"
  },
  {
    "url": "assets/js/app.f1f25e6c.js",
    "revision": "9a23d825852b77099a79c0f417efa094"
  },
  {
    "url": "bigData/index.html",
    "revision": "81c186a6d9e2a08ec8b13dbd419f06e2"
  },
  {
    "url": "deepLearning/index.html",
    "revision": "7a5b5f99e980c02baa33e1796fbb38c8"
  },
  {
    "url": "frontEnd/index.html",
    "revision": "9d969110e4caeca422d9e7b9ad320aba"
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
    "revision": "68e28ec6f8a4588fba63e47befc90c6e"
  },
  {
    "url": "java/index.html",
    "revision": "2b5f4c2b02ef483a781c91c90cf0f993"
  },
  {
    "url": "java/语法.html",
    "revision": "631a5126aed6cdb41900aa061fca810e"
  },
  {
    "url": "java/面向对象.html",
    "revision": "48df57b1ecd2e518236002e359c24918"
  },
  {
    "url": "kotlin/index.html",
    "revision": "23f4fa2bb68edb29b17e6dd8356678b2"
  },
  {
    "url": "softwareEngineering/111.html",
    "revision": "143d68b4a77274540fb76ff9ee3c6b8d"
  },
  {
    "url": "softwareEngineering/index.html",
    "revision": "ac246a70f803f609bb85c3454f3c1855"
  },
  {
    "url": "spring/index.html",
    "revision": "743912c77db5782bb13d6b7cf662faf9"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "54e4dd66e90853aebea400bd0aec3c10"
  },
  {
    "url": "tittle-tattle/关于Java编程部分的文章.html",
    "revision": "4f156afc156d4bda189ebe1380ef70f4"
  },
  {
    "url": "tittle-tattle/新年快乐！.html",
    "revision": "572a85aa53f298010ca403a889ce2716"
  },
  {
    "url": "web/index.html",
    "revision": "4264d778fc836d79f0bd0c2d773e5f49"
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
