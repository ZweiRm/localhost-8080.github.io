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
    "revision": "88c739f9c6eeccbfbf4e66cc05da0caf"
  },
  {
    "url": "about/index.html",
    "revision": "7a2b414fa7721f6ed0a7e363a2ca1e7a"
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
    "url": "assets/js/app.c83d703c.js",
    "revision": "15e610a3cdc4ee255d51a5a3ccc3e506"
  },
  {
    "url": "bigData/index.html",
    "revision": "01c0ed580a6cc30e9735d7c923c805a0"
  },
  {
    "url": "deepLearning/index.html",
    "revision": "b99cd2af7aa6c97cafb97958be6606f5"
  },
  {
    "url": "frontEnd/index.html",
    "revision": "a9a49ace9d7a274cfc56f77ea8d1ff41"
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
    "revision": "c6c590a58154abc41f7465b0af8cd907"
  },
  {
    "url": "java/index.html",
    "revision": "6039f63a6efa6ac9b0ea4492b59ea8bf"
  },
  {
    "url": "java/语法.html",
    "revision": "08b93243d9a9e5558ebe5e52f91a9f90"
  },
  {
    "url": "kotlin/index.html",
    "revision": "82702ed410c461dccf4ffd89ee158eae"
  },
  {
    "url": "spring/index.html",
    "revision": "56c5f8b27513f017b69f3d61e7af2c31"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "5f111d5b69d8a7614b7a729acc84025c"
  },
  {
    "url": "web/index.html",
    "revision": "5fe69c212d17dc185b5206f662456621"
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
