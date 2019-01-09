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
    "revision": "f8bae990459cd59e9119d8763fc64485"
  },
  {
    "url": "about/index.html",
    "revision": "834e38bf9b58cfd181128f8ef69162c1"
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
    "url": "assets/js/10.dcc79764.js",
    "revision": "6c9b0f301388f94319e9361a3b30c89d"
  },
  {
    "url": "assets/js/11.3b3942ca.js",
    "revision": "36e385b671d20ee85913ac1fc76b3a76"
  },
  {
    "url": "assets/js/12.ebea2a22.js",
    "revision": "d77c4a44f2eff59b968bd375be194058"
  },
  {
    "url": "assets/js/13.2a28c5c9.js",
    "revision": "be5c86b5798e101846b6c299c3fbacb7"
  },
  {
    "url": "assets/js/14.cbd43057.js",
    "revision": "076ed024e0d8a66c2d30c4e97fc2f692"
  },
  {
    "url": "assets/js/15.bde10888.js",
    "revision": "dc999d5d77ae9842d8f6c1a57e64bff4"
  },
  {
    "url": "assets/js/16.6cc62f4e.js",
    "revision": "e0e5539dfb2da55c5861a2ec69fbc8ee"
  },
  {
    "url": "assets/js/17.be0eca6f.js",
    "revision": "e10f53047120a0f42d1c59ea4eff28ac"
  },
  {
    "url": "assets/js/18.c73fdb87.js",
    "revision": "99bebf5a438bf0ae6a8d7fb2bf34565c"
  },
  {
    "url": "assets/js/19.86c12897.js",
    "revision": "cded39e5788f84641b691236d30578b0"
  },
  {
    "url": "assets/js/2.d3e9c765.js",
    "revision": "2b2cb8dfc9d1cac46680b7a52053d552"
  },
  {
    "url": "assets/js/20.910e8aff.js",
    "revision": "786c11d39c1474965f3f38d3bcf0dc55"
  },
  {
    "url": "assets/js/3.045a4587.js",
    "revision": "a9f4cf4e4876b84d8d39f1bdb5f607a2"
  },
  {
    "url": "assets/js/4.282feb9e.js",
    "revision": "273137ae9985e29e15d257c15806c613"
  },
  {
    "url": "assets/js/5.82944546.js",
    "revision": "e4a72b0a3b9c876c1bfc165d4a678111"
  },
  {
    "url": "assets/js/6.c194b9c2.js",
    "revision": "ed13160b8cb44458a22dfe442d11f435"
  },
  {
    "url": "assets/js/7.a63a299a.js",
    "revision": "e4e65e680cd601a376494c5eb3e63a93"
  },
  {
    "url": "assets/js/8.609808fb.js",
    "revision": "5067d09e08b73587290ae16fc100be80"
  },
  {
    "url": "assets/js/9.c056750b.js",
    "revision": "faef44b4f113db89cd35f8513427575b"
  },
  {
    "url": "assets/js/app.21655b67.js",
    "revision": "2b4bb01901fff4407ad2313c2a01b92e"
  },
  {
    "url": "bigData/index.html",
    "revision": "ab7f5645031e3216ac2caf5ad11efde3"
  },
  {
    "url": "bigData/web1.html",
    "revision": "35a8600dd5a6f843d8f01069e43c8cac"
  },
  {
    "url": "deepLearning/index.html",
    "revision": "79ee61a4c1bb40dc781e469c5e40a0d1"
  },
  {
    "url": "deepLearning/web1.html",
    "revision": "38737b3e2be43d22c1b1032c13568a93"
  },
  {
    "url": "frontEnd/index.html",
    "revision": "db333c3d85dd1c9ae5703812193b224a"
  },
  {
    "url": "frontEnd/web1.html",
    "revision": "b23e6c21e070d941353e492e2ecfdde5"
  },
  {
    "url": "img/ahza-white.png",
    "revision": "3c642eba43abc55fb6555dab8d743fcd"
  },
  {
    "url": "img/localhost.png",
    "revision": "a86b4177450a76712bb8e7dc0cb8fad8"
  },
  {
    "url": "img/me.jpg",
    "revision": "503f59be9b5549c306c7844f21ce29d9"
  },
  {
    "url": "index.html",
    "revision": "e66f0ed509f324108caaf194ff99267a"
  },
  {
    "url": "java/android1.html",
    "revision": "1bd9394223f011a2aa02c195d3e4bbf6"
  },
  {
    "url": "java/index.html",
    "revision": "cdee5946b6aab4345a65cd73e7e4f04d"
  },
  {
    "url": "kotlin/index.html",
    "revision": "96baae60bbfb19a3b1c28ba39596b0c3"
  },
  {
    "url": "kotlin/web1.html",
    "revision": "ab52d6dad542a51fff78b64045216524"
  },
  {
    "url": "spring/index.html",
    "revision": "907b542a7b4ae8166a2866f7d23e1ba0"
  },
  {
    "url": "spring/ios1.html",
    "revision": "a7a7ada2826d22d9df28f824a57f9130"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "db3d2d0cb27c9e243d53bdf057fb3fc9"
  },
  {
    "url": "web/index.html",
    "revision": "22cdb754181aaca674698a3841784548"
  },
  {
    "url": "web/web1.html",
    "revision": "b8a3759602d67949f029729958073000"
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
