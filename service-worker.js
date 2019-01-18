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
    "revision": "0764ce6383dc418f18ccf91c4aec5f9f"
  },
  {
    "url": "about/index.html",
    "revision": "0fca17fa9fb5f535a8374d77dd7274e2"
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
    "url": "assets/js/10.b2114078.js",
    "revision": "a2bfc1d601474a8152982ea008bdf3f4"
  },
  {
    "url": "assets/js/11.048f6a0b.js",
    "revision": "7818052eae546caaf3585a035db53304"
  },
  {
    "url": "assets/js/12.ca292f97.js",
    "revision": "94d7f9035c6672cb110e5c174e1ea81e"
  },
  {
    "url": "assets/js/13.7c9a0b3f.js",
    "revision": "66a0f480c0569265f5e347a86d479776"
  },
  {
    "url": "assets/js/14.60b145b7.js",
    "revision": "5cf90c7da7b3fab32231f76eb302cf0a"
  },
  {
    "url": "assets/js/15.0c6fd83b.js",
    "revision": "0ea3bb8bf18970ff8d076e3bacfdbc84"
  },
  {
    "url": "assets/js/16.e358d100.js",
    "revision": "838f7165a9ee021520bf673d15bcbb46"
  },
  {
    "url": "assets/js/2.83b44d2f.js",
    "revision": "e43022a54e9006f030812fafd79af1d1"
  },
  {
    "url": "assets/js/3.17d751ec.js",
    "revision": "c2f05a0f5b66419c0cc673346010ec82"
  },
  {
    "url": "assets/js/4.bb830f69.js",
    "revision": "cb9070437a7535b67907f558a745eb1f"
  },
  {
    "url": "assets/js/5.581967eb.js",
    "revision": "db4450c6bf07c7628a36b092d0ac9ca0"
  },
  {
    "url": "assets/js/6.db21117c.js",
    "revision": "bb25efd0800643385174077ae21dc824"
  },
  {
    "url": "assets/js/7.08fadd03.js",
    "revision": "4901c7655749bacbe392cae91e169f8e"
  },
  {
    "url": "assets/js/8.e9fa4115.js",
    "revision": "29e5aee818a6bc6c58730e4974e2eae0"
  },
  {
    "url": "assets/js/9.3741ff13.js",
    "revision": "29a5b3e23e64d318ae3b3cc760d071de"
  },
  {
    "url": "assets/js/app.3883f68f.js",
    "revision": "1815a44e7f5a3bb548361b8cd43c344a"
  },
  {
    "url": "bigData/index.html",
    "revision": "e85e3eb9d327e82908329dcdac318ed4"
  },
  {
    "url": "deepLearning/index.html",
    "revision": "f848094c53a0b70ed44c38ba4d13e44b"
  },
  {
    "url": "frontEnd/index.html",
    "revision": "1d21dc8e70a45e235bddfc79018841a2"
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
    "url": "img/自动类型转换.png",
    "revision": "2f12d0fde58f56fdd54524ebac04368a"
  },
  {
    "url": "img/运算符优先级.png",
    "revision": "60cb8dabdd6a309636fca5ad623586c3"
  },
  {
    "url": "index.html",
    "revision": "4903c2779bc53b2f14ced02aad2d13e6"
  },
  {
    "url": "java/index.html",
    "revision": "8da9a00d098a8ce2896f2fbc65315bba"
  },
  {
    "url": "java/语法.html",
    "revision": "7a676a9122c76a2a969b048764d37166"
  },
  {
    "url": "java/面向对象.html",
    "revision": "5f81778cdf0833821aa7b7ad8f3a39e9"
  },
  {
    "url": "kotlin/index.html",
    "revision": "0ffaf435be4262466c9963f7b3156995"
  },
  {
    "url": "spring/index.html",
    "revision": "92934cf397631c7d007582e9f6ac4364"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "aeef409b32820dc6a09febacb4fb30cc"
  },
  {
    "url": "tittle-tattle/关于Java编程部分的文章.html",
    "revision": "2ffc8d984c1a6a4d7925026069f11936"
  },
  {
    "url": "web/index.html",
    "revision": "3870cc80fcd3da2b57234907876a02fd"
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
