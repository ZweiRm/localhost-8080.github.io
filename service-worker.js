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
    "revision": "46a6ae07de4482f7ae659d1c96d89a91"
  },
  {
    "url": "about/index.html",
    "revision": "b6454a26b95303a172f19ef45edc1c2d"
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
    "url": "assets/js/10.99fa2ff9.js",
    "revision": "f36139ebb52dae03fa8ee917f5078561"
  },
  {
    "url": "assets/js/11.078d100d.js",
    "revision": "f0e77817e14292343d334a0245aada0e"
  },
  {
    "url": "assets/js/12.66490535.js",
    "revision": "3ebfd55adecdf28aa6696b5d2ba54891"
  },
  {
    "url": "assets/js/13.a957225f.js",
    "revision": "2461b74a0a65bf0390a5318a2b3321a4"
  },
  {
    "url": "assets/js/14.ddfd711f.js",
    "revision": "f3d25aa2876eca528d455471b8099611"
  },
  {
    "url": "assets/js/15.bde10888.js",
    "revision": "dc999d5d77ae9842d8f6c1a57e64bff4"
  },
  {
    "url": "assets/js/16.7f11fa85.js",
    "revision": "1728f793b81be78053198f120156ccf6"
  },
  {
    "url": "assets/js/17.a0cd66c2.js",
    "revision": "cadfcba1a1af8e1216e51b07d6428466"
  },
  {
    "url": "assets/js/18.260f5e21.js",
    "revision": "a4cdeef6099f9a2658da48b1cb10c5e0"
  },
  {
    "url": "assets/js/19.d6157199.js",
    "revision": "7a8fb1025533b396053f073e3914a243"
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
    "url": "assets/js/6.970b9929.js",
    "revision": "7c7c38adaaea5dcbbf0dca28ce1d4bf5"
  },
  {
    "url": "assets/js/7.37fb698d.js",
    "revision": "e4e65e680cd601a376494c5eb3e63a93"
  },
  {
    "url": "assets/js/8.5a1e278c.js",
    "revision": "56ac1aaedeaf3d70f0c983fc7f928e63"
  },
  {
    "url": "assets/js/9.39f42e0b.js",
    "revision": "3f2a6263a87fff31e4363d9739ee7064"
  },
  {
    "url": "assets/js/app.09e811bc.js",
    "revision": "809477d33be0d22d685c2113c634d9a4"
  },
  {
    "url": "bigData/index.html",
    "revision": "8b279c5f7d1f4676c71484011aa4e770"
  },
  {
    "url": "deepLearning/index.html",
    "revision": "c793ade5493a36bb688070aa91d1f43b"
  },
  {
    "url": "frontEnd/index.html",
    "revision": "26b87690fa322353e4a4d974a4d3ac2f"
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
    "url": "img/String_01.jpg",
    "revision": "11b3982523c6af8894622532eed1a068"
  },
  {
    "url": "img/String_02.jpg",
    "revision": "4d1449eb96ec89b47f29b1868a7398c6"
  },
  {
    "url": "img/String_03.jpg",
    "revision": "f6bf942c85e323a3dad1ebad7d6eef9d"
  },
  {
    "url": "img/String_04.jpg",
    "revision": "775360a6802adb1f6f167d363c9246ea"
  },
  {
    "url": "img/String_05.jpg",
    "revision": "33787b7a1f680a9b4cac506f314caacb"
  },
  {
    "url": "img/String_06.jpg",
    "revision": "208c3d93aa4a253aa076fb63b4637484"
  },
  {
    "url": "img/String_07.jpg",
    "revision": "4c6e51e847a402939a0e2c840237b8e2"
  },
  {
    "url": "img/String_08.jpg",
    "revision": "6ef630def6c439bf0ecd2e2b2b5bd95d"
  },
  {
    "url": "img/内存管理.jpg",
    "revision": "e4eb17b76cf8bbbd913b2a0ef66f3cd1"
  },
  {
    "url": "img/单继承.jpg",
    "revision": "5759f1246d90abcc7299dc73c1963043"
  },
  {
    "url": "img/多继承.jpg",
    "revision": "1ce2ff44e482e0b25a7b4be465fb6f49"
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
    "url": "img/间接继承.jpg",
    "revision": "5aeb9041bba3e529d14787cdd817937e"
  },
  {
    "url": "img/静态内存.png",
    "revision": "d1a5f305719c2871e0f0aab66fd02a1d"
  },
  {
    "url": "index.html",
    "revision": "d36f7af791c9bebf44bf0efc297cb0dd"
  },
  {
    "url": "java/index.html",
    "revision": "ae6116ce3b6432336d41c63a84d4a22b"
  },
  {
    "url": "java/应用程序编程接口.html",
    "revision": "760c5e0be5adb0b70a4860a066a0d9d0"
  },
  {
    "url": "java/语法.html",
    "revision": "acf8ac450c1ee6099ee995a5a62239bc"
  },
  {
    "url": "java/面向对象.html",
    "revision": "a9956dd4dd79ae968c808336574095b6"
  },
  {
    "url": "kotlin/index.html",
    "revision": "a2cfc42c70401be01cc96e5426ffae17"
  },
  {
    "url": "softwareEngineering/111.html",
    "revision": "38a09ca7af80927ee5f99672f04652b6"
  },
  {
    "url": "softwareEngineering/index.html",
    "revision": "364117f9eb05d88a51a2e35dcf1f3c31"
  },
  {
    "url": "spring/index.html",
    "revision": "142483b6d09b634d6982a6bea2dd938f"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "b9a79bd5e625156365da24a36493246e"
  },
  {
    "url": "tittle-tattle/关于Java编程部分的文章.html",
    "revision": "d78436e38840c8db3c93a7ae2c0e6581"
  },
  {
    "url": "tittle-tattle/新年快乐！.html",
    "revision": "7c63d63bf082dd5a5e4b50bd7e436e5f"
  },
  {
    "url": "web/index.html",
    "revision": "cce50653796935818da8092586011e93"
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
