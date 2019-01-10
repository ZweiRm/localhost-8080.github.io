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
    "revision": "53cf241a2ad11a7ed3fde8b328a4e8bd"
  },
  {
    "url": "about/index.html",
    "revision": "b4cbcfa806ec97afc8ed0c9e8e6d3216"
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
    "url": "assets/js/9.0a2650e2.js",
    "revision": "a466747b19f16fdea0e7b84e322d7e53"
  },
  {
    "url": "assets/js/app.fb35e5c3.js",
    "revision": "aa025549a072e19d446853eff6ab631c"
  },
  {
    "url": "bigData/index.html",
    "revision": "f44b5f3b146dd403c17f399ca57feeaf"
  },
  {
    "url": "deepLearning/index.html",
    "revision": "943500294f6e59b1002f262c3006ca99"
  },
  {
    "url": "frontEnd/index.html",
    "revision": "b53b30ec94a4c9319577c89825ed40fb"
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
    "revision": "e182452936a61148b5cdc0ee1a4ea8d8"
  },
  {
    "url": "java/index.html",
    "revision": "16b09e416f963ee3d84303878f8e8ef2"
  },
  {
    "url": "java/语法.html",
    "revision": "6354dc30d14ed0f6991d3f55bd08531d"
  },
  {
    "url": "kotlin/index.html",
    "revision": "51a5eb84518c6517f8de0c3d72d6b1d4"
  },
  {
    "url": "spring/index.html",
    "revision": "16a0143e74dd7b63205f1189ca21e107"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "913635109883b773e5e48caf944d3706"
  },
  {
    "url": "web/index.html",
    "revision": "7405750210038ac305874621520f0530"
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
