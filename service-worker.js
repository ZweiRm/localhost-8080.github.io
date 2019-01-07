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
    "revision": "2614eee5a845e5ca9191851b94379bef"
  },
  {
    "url": "about.html",
    "revision": "7f75843a785436fabf7cca9743cfbe3a"
  },
  {
    "url": "ahza-white.png",
    "revision": "3c642eba43abc55fb6555dab8d743fcd"
  },
  {
    "url": "android/android1.html",
    "revision": "b293b191e9e466d0ab3802099448379a"
  },
  {
    "url": "android/index.html",
    "revision": "45ea4c2309cb0ad92b875096fd8084bb"
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
    "url": "assets/js/10.9c533dab.js",
    "revision": "63c50898d32aad706467c6a559f2b632"
  },
  {
    "url": "assets/js/11.8663f0af.js",
    "revision": "8e8d04d5f268e7c13897a1d453a24c4d"
  },
  {
    "url": "assets/js/12.2c2b4f72.js",
    "revision": "84f39645c17ecd371e7eaa3902ee9257"
  },
  {
    "url": "assets/js/2.b32ead01.js",
    "revision": "46aa3cfb9e8dda75ebe31b7d20931392"
  },
  {
    "url": "assets/js/3.6cc619bc.js",
    "revision": "bcdc206559c28fbebc8d531c266d875c"
  },
  {
    "url": "assets/js/4.4876e2db.js",
    "revision": "e4e14e330f6480823f2370aa4e7374b3"
  },
  {
    "url": "assets/js/5.85640304.js",
    "revision": "db4450c6bf07c7628a36b092d0ac9ca0"
  },
  {
    "url": "assets/js/6.b10b79e0.js",
    "revision": "101bd88fa1cc3c5fe1912f069adee8ae"
  },
  {
    "url": "assets/js/7.c9d9e849.js",
    "revision": "72d7693b7e64da4f090015f726e1f893"
  },
  {
    "url": "assets/js/8.66413343.js",
    "revision": "5b12b2c56c2653350f6a34fb0ae6394d"
  },
  {
    "url": "assets/js/9.06f974c6.js",
    "revision": "fe295bdcbddd2f32a677c0e6a68adb6a"
  },
  {
    "url": "assets/js/app.96dac257.js",
    "revision": "7babe430d01958139dd790de7229a6ee"
  },
  {
    "url": "contact.html",
    "revision": "8b9a559b8b11668fd7c7fbea7efae1e3"
  },
  {
    "url": "index.html",
    "revision": "bac4afdb204954e6f42774a20447be87"
  },
  {
    "url": "ios/index.html",
    "revision": "8dd3c6a4e17e320b9c63222927d84c2c"
  },
  {
    "url": "ios/ios1.html",
    "revision": "055fd90c5c0e991fb3403f47e898e0d1"
  },
  {
    "url": "web/index.html",
    "revision": "8d77d7112fff86af1c1f1dd9669683a9"
  },
  {
    "url": "web/web1.html",
    "revision": "9c2411bc3ee1c27c8abd706146ec3c1a"
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
