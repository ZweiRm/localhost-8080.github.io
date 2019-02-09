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
    "revision": "d5ec1a1b82354fe8d612d837786eebb1"
  },
  {
    "url": "about/index.html",
    "revision": "2c7debfd1bcad4f3245b49771c6f8523"
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
    "url": "assets/js/10.85c7384f.js",
    "revision": "56db1600b5980b271cc31915356e29a5"
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
    "url": "assets/js/app.c87cd3e3.js",
    "revision": "6abace2c96ffbc3e2745570196ccd04d"
  },
  {
    "url": "bigData/index.html",
    "revision": "3efdae9226689e2e3c36760cd0b9fafc"
  },
  {
    "url": "deepLearning/index.html",
    "revision": "0f60f95c8498e862be56dd8683557263"
  },
  {
    "url": "frontEnd/index.html",
    "revision": "cdf21517606fe3133b867ed24ed03744"
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
    "revision": "b8ff8f6f5a8af5979c3024517f19c47a"
  },
  {
    "url": "java/index.html",
    "revision": "ac48e94421b390d7613177b97b9985f9"
  },
  {
    "url": "java/语法.html",
    "revision": "423368b3d627c7ac7d6ccb54f8004f92"
  },
  {
    "url": "java/面向对象.html",
    "revision": "c8ee23bbefad676be96b7aad8cbf7a48"
  },
  {
    "url": "kotlin/index.html",
    "revision": "1a003dc980a331dfab1dbc7cb9842478"
  },
  {
    "url": "softwareEngineering/111.html",
    "revision": "240b5e1c517073208dfdaca4dcdd9efc"
  },
  {
    "url": "softwareEngineering/index.html",
    "revision": "830c392fe92cec1a62b177745d2fdc09"
  },
  {
    "url": "spring/index.html",
    "revision": "54a062d7253f5144f60a7b456cee4644"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "4d8b654f559f29f51755dc0237de5c38"
  },
  {
    "url": "tittle-tattle/关于Java编程部分的文章.html",
    "revision": "1e01ffd21bf3205f8723f30ba60bbf99"
  },
  {
    "url": "tittle-tattle/新年快乐！.html",
    "revision": "8f6e71ff3da2147d63d95db52cf66f0a"
  },
  {
    "url": "web/index.html",
    "revision": "5f0785d2c0f7c6e1134e4d7e9d39c920"
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
