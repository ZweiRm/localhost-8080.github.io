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
    "revision": "8fe81fe6bcd6be81773590e4a7d464cd"
  },
  {
    "url": "about/index.html",
    "revision": "9689bd5d67fe75ef7830c7d216ff443a"
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
    "url": "assets/js/10.c325bdec.js",
    "revision": "a3808a19bb1c69dc6b80a76ba2f7725a"
  },
  {
    "url": "assets/js/11.d6102d50.js",
    "revision": "9f6222f62a645d2e366d8b82d84bbdd9"
  },
  {
    "url": "assets/js/12.ffe36940.js",
    "revision": "d83420d1ae8129ce5e9a5dfc1890e008"
  },
  {
    "url": "assets/js/13.4f140686.js",
    "revision": "d593991a154ffda9e16f1caddc6b159d"
  },
  {
    "url": "assets/js/14.4aba3685.js",
    "revision": "a50fbf25add2d891a86c027c0c74300f"
  },
  {
    "url": "assets/js/2.cb3337ac.js",
    "revision": "48330e6cd43f4ab19848edbf2bc9e538"
  },
  {
    "url": "assets/js/3.e132ce33.js",
    "revision": "e5c2f84ac06ef6c2baaf179192f25bec"
  },
  {
    "url": "assets/js/4.e9903940.js",
    "revision": "bf2e042c8ac0d826d6f2f52e5cc495d4"
  },
  {
    "url": "assets/js/5.36b225b5.js",
    "revision": "95bb80dc89a4785c5634f57ea2ddbb7f"
  },
  {
    "url": "assets/js/6.259ffc94.js",
    "revision": "d9c02e2ea53f2c2e78d67b2148dc770b"
  },
  {
    "url": "assets/js/7.543b319e.js",
    "revision": "0fddbdc4cdf24298e04321ef618d24cc"
  },
  {
    "url": "assets/js/8.4d9e3899.js",
    "revision": "6f7afe8b5267ac87b6e2fab60ac03f1a"
  },
  {
    "url": "assets/js/9.d9bbad85.js",
    "revision": "958847f53a0c1be7c976360f17ab9f90"
  },
  {
    "url": "assets/js/app.aa725221.js",
    "revision": "e2f379c005269b4f8f41aa4e53d26847"
  },
  {
    "url": "bigData/index.html",
    "revision": "e7cf5a8f4577f67c635eb210e39a5017"
  },
  {
    "url": "deepLearning/index.html",
    "revision": "5ec3aeb645421b2582afd3374cc2088d"
  },
  {
    "url": "frontEnd/index.html",
    "revision": "064ecb2caedf7aaa4d0769ec51e2985e"
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
    "url": "img/自动类型转换.png",
    "revision": "2f12d0fde58f56fdd54524ebac04368a"
  },
  {
    "url": "img/运算符优先级.png",
    "revision": "60cb8dabdd6a309636fca5ad623586c3"
  },
  {
    "url": "index.html",
    "revision": "0e897c1f9ada6be4ebeded87bad2a056"
  },
  {
    "url": "java/index.html",
    "revision": "1aa496f1169cb1040649de44171133da"
  },
  {
    "url": "java/语法.html",
    "revision": "0c274e4cf397ddc9ca016b713f56ac2e"
  },
  {
    "url": "kotlin/index.html",
    "revision": "d37fb32f0b47ece715d83e75a7b97c8e"
  },
  {
    "url": "spring/index.html",
    "revision": "04d24a1f12160a54b29837da36afb12d"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "ba05a73c24f1b46cbcc2220c3bce4d61"
  },
  {
    "url": "web/index.html",
    "revision": "2fe049dc41f585e9fc15655fec04a6e2"
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