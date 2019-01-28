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
    "revision": "9ed8b95ce00af909efb31327186ed1d2"
  },
  {
    "url": "about/index.html",
    "revision": "0b97a9364ad5d74a19bc52be693ff30b"
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
    "url": "assets/js/10.6cd083c1.js",
    "revision": "f0bc2ff6b916fdb523f37e23d8b9cfb1"
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
    "url": "assets/js/9.48a33950.js",
    "revision": "5d15032bdbe1765bf77d638afe3bc52c"
  },
  {
    "url": "assets/js/app.fd628633.js",
    "revision": "ce295fce8679b3c164a7579d380603fb"
  },
  {
    "url": "bigData/index.html",
    "revision": "28a5ec30f4d51dba83c29315fee4ff61"
  },
  {
    "url": "deepLearning/index.html",
    "revision": "f66540dbfa2d4154a5acc8ce222b6ba7"
  },
  {
    "url": "frontEnd/index.html",
    "revision": "812be6e189cce6b68ed8d05b35ee1ab0"
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
    "revision": "c356ef64f2fdee6175f5943286f868bc"
  },
  {
    "url": "java/index.html",
    "revision": "62ef7801d6742342ebe07c3540008936"
  },
  {
    "url": "java/语法.html",
    "revision": "ab071d9a5b22e628c77d6f7956ce5a75"
  },
  {
    "url": "java/面向对象.html",
    "revision": "477f4f59fd7a0aaad69e0b5a0f83c623"
  },
  {
    "url": "kotlin/index.html",
    "revision": "e4153461fb4c937e907a0007b6e24338"
  },
  {
    "url": "spring/index.html",
    "revision": "6124748cb25a7c9078781d1ab6e86881"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "1a505ce133e650c5edc4b052ee990863"
  },
  {
    "url": "tittle-tattle/关于Java编程部分的文章.html",
    "revision": "d83803bef0a4111a2deff5a46abc7163"
  },
  {
    "url": "web/index.html",
    "revision": "b309a1d657064e1bbc98be2df54be296"
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
