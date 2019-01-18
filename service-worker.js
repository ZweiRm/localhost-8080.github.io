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
    "revision": "1c34eb50adb054a71d5988dc14187fcd"
  },
  {
    "url": "about/index.html",
    "revision": "659a56d62006239ece772c64ec0c3bcd"
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
    "url": "assets/js/10.7472e0a3.js",
    "revision": "67c0495ebfc41e410b0eb054e8222756"
  },
  {
    "url": "assets/js/11.aed9d054.js",
    "revision": "4a7957dfc6d505d3a4a462325d08e254"
  },
  {
    "url": "assets/js/12.26d7c6b7.js",
    "revision": "550d05aa460b66826562f05723075dbf"
  },
  {
    "url": "assets/js/13.eeeb5ac1.js",
    "revision": "fc41320c68efc9606026ac243dc2a2ff"
  },
  {
    "url": "assets/js/14.9cdf2ea9.js",
    "revision": "08c8c97aa7414ab495203d71bd2e5de2"
  },
  {
    "url": "assets/js/15.c3e4aa47.js",
    "revision": "651fc5190c7dbe9ac609ac2a4894115f"
  },
  {
    "url": "assets/js/2.83b44d2f.js",
    "revision": "e43022a54e9006f030812fafd79af1d1"
  },
  {
    "url": "assets/js/3.75325f6a.js",
    "revision": "2f61c13ccae7c9a4174986f6fd62db82"
  },
  {
    "url": "assets/js/4.09d788af.js",
    "revision": "1511f7a3db4d888802ea020490485ab2"
  },
  {
    "url": "assets/js/5.dcb35dea.js",
    "revision": "a5220ed58399bf0bba973eacf1a5757c"
  },
  {
    "url": "assets/js/6.55d21d85.js",
    "revision": "2d9cd5b478ef9e64ca8a4e051cfa2e59"
  },
  {
    "url": "assets/js/7.4e117243.js",
    "revision": "dd4766700cf8611fee9f376f74731dc7"
  },
  {
    "url": "assets/js/8.f0f82a31.js",
    "revision": "9aff44993afeda63ca8d16f211702a86"
  },
  {
    "url": "assets/js/9.dca8f8d7.js",
    "revision": "ff7b65e1db2637e9e6be5d9c39e0fcf7"
  },
  {
    "url": "assets/js/app.53e80330.js",
    "revision": "6d22a5dc2ef7de8eb28320416771dd76"
  },
  {
    "url": "bigData/index.html",
    "revision": "1b675ed28e87b61a25053e60d32f52ea"
  },
  {
    "url": "deepLearning/index.html",
    "revision": "753c5984020bf14db70b06bd54e17ee9"
  },
  {
    "url": "frontEnd/index.html",
    "revision": "abc576ba94cd041ff806aab4548b5fd2"
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
    "revision": "aeffa3d2f81ec1d26a8fe96857706445"
  },
  {
    "url": "java/index.html",
    "revision": "59c299810d1227c5ee5afe44ed162802"
  },
  {
    "url": "java/语法.html",
    "revision": "7544badb9c262a4b1e31f808e25e1c4e"
  },
  {
    "url": "java/面向对象.html",
    "revision": "cbe989dfff92e6e22a61390e3ffe1f5e"
  },
  {
    "url": "kotlin/index.html",
    "revision": "a021d1191981616cf35ffdac58903f1b"
  },
  {
    "url": "spring/index.html",
    "revision": "e7c87d3eed5602ec844473c60908d276"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "43024f9235dd99078f016117b7b01c3f"
  },
  {
    "url": "web/index.html",
    "revision": "0965f6a3e5330107323cd336f4cd0ce0"
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
