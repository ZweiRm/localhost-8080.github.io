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
    "revision": "143fa284db0afa0d3eab9eff86945fed"
  },
  {
    "url": "about/index.html",
    "revision": "c538eaefa963dda32d64a9ec4e34b3c2"
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
    "url": "assets/js/9.48a33950.js",
    "revision": "5d15032bdbe1765bf77d638afe3bc52c"
  },
  {
    "url": "assets/js/app.ed219e63.js",
    "revision": "bb160c553b11eceff4d62d3125ab347e"
  },
  {
    "url": "bigData/index.html",
    "revision": "340bb53a31c5eef026c27ad8cf83cd24"
  },
  {
    "url": "deepLearning/index.html",
    "revision": "b661e2b21b3bc7c533d719be4f7e8ab4"
  },
  {
    "url": "frontEnd/index.html",
    "revision": "bf9502866e83eee2a510265abe998eff"
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
    "revision": "602725d3e31508fcfe34db591b72ef09"
  },
  {
    "url": "java/index.html",
    "revision": "d7c062b08bd16fa6c1bd4aebd4f66d6b"
  },
  {
    "url": "java/语法.html",
    "revision": "7dadbf0ef46adcaed03d82d294d8f831"
  },
  {
    "url": "java/面向对象.html",
    "revision": "5bc18774a017b76c541c8ebadc876da1"
  },
  {
    "url": "kotlin/index.html",
    "revision": "f0a10c9e958e68358f64474353b52cd6"
  },
  {
    "url": "spring/index.html",
    "revision": "d3c8b90ac2a40ec4e786a6419c51715b"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "917ec10629512b0119ff05065ca1ae71"
  },
  {
    "url": "tittle-tattle/关于Java编程部分的文章.html",
    "revision": "e68a2eb380f1891c19392e66b00500e9"
  },
  {
    "url": "web/index.html",
    "revision": "62dbffd2fa311806208ab13315bd90f6"
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
