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
    "revision": "6803f568cbb084afb92c49c37731c8cc"
  },
  {
    "url": "about/index.html",
    "revision": "7b6e656012a556bdc261fbc5816e47bc"
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
    "url": "assets/js/12.41b5e9fe.js",
    "revision": "7e7a6c191e5e5241c02de2e845bf6c96"
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
    "url": "assets/js/app.7fd8d625.js",
    "revision": "66eb7126fcd132be54d6bc16a0fa8d7d"
  },
  {
    "url": "bigData/index.html",
    "revision": "ee7d53643385081d52d86de315acb05a"
  },
  {
    "url": "bigData/web1.html",
    "revision": "56b79141e75128aeedbe28ead6af8cfb"
  },
  {
    "url": "deepLearning/index.html",
    "revision": "4f13aa8767351139845cea3d9dbeceab"
  },
  {
    "url": "deepLearning/web1.html",
    "revision": "2cc67c211e569dedc19fa09dd018add2"
  },
  {
    "url": "frontEnd/index.html",
    "revision": "876c4ea4ba996da6db71562b76db2d51"
  },
  {
    "url": "frontEnd/web1.html",
    "revision": "fb044a45d96173f454643be7d9d92207"
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
    "revision": "ed0b64ca55edf03a6978aecf0308bb89"
  },
  {
    "url": "java/index.html",
    "revision": "4b1d9ce23d4c2b5a79e3f54a27d6a0c7"
  },
  {
    "url": "java/语法基础.html",
    "revision": "f45dd46858dcfdb18a421644ca0a7341"
  },
  {
    "url": "kotlin/index.html",
    "revision": "01c7710c98a1464de88b075bf652cdf9"
  },
  {
    "url": "kotlin/web1.html",
    "revision": "c12afa01d4fa2db0d1c7c85f04c82408"
  },
  {
    "url": "spring/index.html",
    "revision": "8575fd51094d70bd8e394d41303af85c"
  },
  {
    "url": "spring/ios1.html",
    "revision": "63f721278d82c48b28aee995439eb3e8"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "55f28335185e5b7171652c3b5b443797"
  },
  {
    "url": "web/index.html",
    "revision": "563c7e6bd1bdc6e4c1b76f11ab2e16da"
  },
  {
    "url": "web/web1.html",
    "revision": "dfde45dc8b50659cb7429b328726dd94"
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
