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
    "revision": "53ccadadce43e798933c4a71f03e95c5"
  },
  {
    "url": "about/index.html",
    "revision": "6a3aff541d41a87aeff0e8f95c688baf"
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
    "url": "assets/js/10.0a183c01.js",
    "revision": "ed73c37bb2bd3b10ed5cfea983e95820"
  },
  {
    "url": "assets/js/11.6e0a09bc.js",
    "revision": "356aa00e2b543b8336eae28029a02dac"
  },
  {
    "url": "assets/js/12.6b005727.js",
    "revision": "689f78e3561caeb2ec6c90626f7bd678"
  },
  {
    "url": "assets/js/13.da735c33.js",
    "revision": "9692b0185195640f088434cf0e618f43"
  },
  {
    "url": "assets/js/14.56c3d352.js",
    "revision": "f9e0ca3e2a028a03204a1b8e47a13742"
  },
  {
    "url": "assets/js/15.73fd8183.js",
    "revision": "e2cb84ef4e060a3811b9bdbc53169963"
  },
  {
    "url": "assets/js/16.d09ff1fc.js",
    "revision": "fc0ffb57e8c738f33c7d6b3632a96354"
  },
  {
    "url": "assets/js/17.4ec2534a.js",
    "revision": "02b2a8210d4e97745460b507f487886f"
  },
  {
    "url": "assets/js/2.d187085c.js",
    "revision": "b29470ef580202dd64eb870c85563cb3"
  },
  {
    "url": "assets/js/3.4a239607.js",
    "revision": "3920006c689fddae3ec7a3050751d79d"
  },
  {
    "url": "assets/js/4.ee680b5f.js",
    "revision": "b4b003328d79cc749be3aa7a84366192"
  },
  {
    "url": "assets/js/5.36b225b5.js",
    "revision": "95bb80dc89a4785c5634f57ea2ddbb7f"
  },
  {
    "url": "assets/js/6.6cb28b21.js",
    "revision": "1f432a39e152eef5a9f092f7cc13139d"
  },
  {
    "url": "assets/js/7.a63a299a.js",
    "revision": "e4e65e680cd601a376494c5eb3e63a93"
  },
  {
    "url": "assets/js/8.e2296729.js",
    "revision": "00e1cc8fbbc87c649ba8da4b876da12e"
  },
  {
    "url": "assets/js/9.a3b90509.js",
    "revision": "54bf3c113b930b0d87f817cb05d3ee77"
  },
  {
    "url": "assets/js/app.aaf37bc6.js",
    "revision": "b35b023f1c21d264854bf804a14a499d"
  },
  {
    "url": "bigData/index.html",
    "revision": "68f0525d3426c4602b5bc66315f9aff8"
  },
  {
    "url": "bigData/web1.html",
    "revision": "474204749c093b86b409acf6a6f9d7c7"
  },
  {
    "url": "deepLearning/index.html",
    "revision": "002a789cb30f4cd69d3d8cf815f7080c"
  },
  {
    "url": "deepLearning/web1.html",
    "revision": "a8944b2288d58b4f0fb1e70cffe8d5e7"
  },
  {
    "url": "frontEnd/index.html",
    "revision": "35e0521cb8ef2ca780ef83a2cb58fe43"
  },
  {
    "url": "frontEnd/web1.html",
    "revision": "b82920e2c58b25207349a9151327aa45"
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
    "revision": "30d2b46adda343207d180ea8c2d77dc6"
  },
  {
    "url": "java/android1.html",
    "revision": "5b0b254b4a45e980640036d45cb6cef7"
  },
  {
    "url": "java/index.html",
    "revision": "b1776910a7d10470692457aba35e2057"
  },
  {
    "url": "spring/index.html",
    "revision": "a852436b59dcb39778d13c77c9842d84"
  },
  {
    "url": "spring/ios1.html",
    "revision": "96931dff6a1c9e33283ae4b22580ae7d"
  },
  {
    "url": "web/index.html",
    "revision": "bd6809370ac4fcb31706a73bfa1ce5a8"
  },
  {
    "url": "web/web1.html",
    "revision": "436ebe65c4c45be149f19917dfd4c013"
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
