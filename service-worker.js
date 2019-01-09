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
    "revision": "04f42ecbc846ca2336536e6f84d64a7d"
  },
  {
    "url": "about/index.html",
    "revision": "d482c094345f2304a0c20e6cd6c77b11"
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
    "url": "assets/js/9.5f46b992.js",
    "revision": "d2a03f0984513cdfa58f68407e754814"
  },
  {
    "url": "assets/js/app.ef25125f.js",
    "revision": "3665ed21e6e53be6a983774553429fee"
  },
  {
    "url": "bigData/index.html",
    "revision": "c424d7cfb1cd67f2c91bbf3614022722"
  },
  {
    "url": "deepLearning/index.html",
    "revision": "b3369c5ae56106ca37042ba6cfa26e2a"
  },
  {
    "url": "frontEnd/index.html",
    "revision": "d393b7c5f87000e3d68ef6b1d19d5786"
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
    "url": "index.html",
    "revision": "f668a3f0c9b0b6febd7f5c412505a0a2"
  },
  {
    "url": "java/index.html",
    "revision": "b9fa6d99ee9258643d22e7ddc7c62f7d"
  },
  {
    "url": "java/语法基础.html",
    "revision": "1b2262f7f41e1511c864dad3be22647d"
  },
  {
    "url": "kotlin/index.html",
    "revision": "3cc66e674c5a6ea4e31d62820216ad4f"
  },
  {
    "url": "spring/index.html",
    "revision": "047e961a7f6f02c34a55ad0d4a7f13b0"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "5ae8f9a6397b56da43112981c2c833f5"
  },
  {
    "url": "web/index.html",
    "revision": "71db3f50d1a30cea562f5693d65ddf3e"
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
