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
    "revision": "ccd406bf25d227f6f41375808877b0ec"
  },
  {
    "url": "about/index.html",
    "revision": "dc4b559192554627e4aa5cac5cff93e6"
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
    "url": "assets/js/10.4e52b822.js",
    "revision": "5b304f49e99b33f48dc57a61b32d7957"
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
    "url": "assets/js/9.0a5b62b3.js",
    "revision": "d54322d9454ff7d29b124a6272233a7e"
  },
  {
    "url": "assets/js/app.76303992.js",
    "revision": "1a3d92c8dc049996fb25131d26029b0b"
  },
  {
    "url": "bigData/index.html",
    "revision": "f2cf70cb12dd9aac7447d345109b7c50"
  },
  {
    "url": "deepLearning/index.html",
    "revision": "3f197d7bc9d0bcc7d9d77303fd5def60"
  },
  {
    "url": "frontEnd/index.html",
    "revision": "11f2d844601ef10b5aaa8ffdeb436aed"
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
    "revision": "31cf8f191bdea16e7cf0e23dd0374335"
  },
  {
    "url": "java/index.html",
    "revision": "af5f5cf9eea6b3bbb0348869823c5867"
  },
  {
    "url": "java/语法.html",
    "revision": "c1e06ce84e74975be660418922fdc292"
  },
  {
    "url": "java/面向对象.html",
    "revision": "eaeff1ae5e23d360def70c293977617f"
  },
  {
    "url": "kotlin/index.html",
    "revision": "78f230fd8124ec05fe70858de2c80056"
  },
  {
    "url": "spring/index.html",
    "revision": "4b7b3636890ed73dbd0fdcb3537eb437"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "fcbced6e59705c467d608725b52fdfb5"
  },
  {
    "url": "web/index.html",
    "revision": "c48e83f07c4bf90c679680eab06e0884"
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
