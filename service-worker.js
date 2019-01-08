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
    "revision": "37fb20f1fefea55613b3d874e699a400"
  },
  {
    "url": "about.html",
    "revision": "23eff714c7b96712633fbc260c080b07"
  },
  {
    "url": "ahza-white.png",
    "revision": "3c642eba43abc55fb6555dab8d743fcd"
  },
  {
    "url": "android/android1.html",
    "revision": "49ee1126e5530170ef0fc6ca82b8b8f0"
  },
  {
    "url": "android/index.html",
    "revision": "99f19e65ae3154e5387fcd77c5f81486"
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
    "url": "assets/js/4.035e5b30.js",
    "revision": "c3e1ade0819bcf6f89daed48c351a9ef"
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
    "url": "assets/js/app.8a9adc0b.js",
    "revision": "3a897f73d0e4064dc8172796c6c0da4c"
  },
  {
    "url": "contact.html",
    "revision": "147c53483fbe20a5c2b9a2a005da5d9f"
  },
  {
    "url": "index.html",
    "revision": "2f6710dc252d6f5e4effec172627b5c3"
  },
  {
    "url": "ios/index.html",
    "revision": "3cffade211988e69682b7d7271ca9c75"
  },
  {
    "url": "ios/ios1.html",
    "revision": "28881dc0f041e15dfd0c542b0dd96e1b"
  },
  {
    "url": "web/index.html",
    "revision": "e088f73d792e24f0f07747c7009ca608"
  },
  {
    "url": "web/web1.html",
    "revision": "ccb243e61d8771aa56fc661fb9d59c50"
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
