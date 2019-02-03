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
    "revision": "1103df5071b14ac7444bcc28f1510321"
  },
  {
    "url": "about/index.html",
    "revision": "e5824a3144363c781b001d4d19a15cb1"
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
    "url": "assets/js/10.47fe6d1d.js",
    "revision": "d909d1828709e24b265c63ccb898dbf5"
  },
  {
    "url": "assets/js/11.a6f21c81.js",
    "revision": "39f839aa68fb8cad716793cc39417703"
  },
  {
    "url": "assets/js/12.ecd5c9ec.js",
    "revision": "14b237cc007173148774e590de1596eb"
  },
  {
    "url": "assets/js/13.3ba1a14b.js",
    "revision": "7090845ea80c8cbf2b2511faff76a49d"
  },
  {
    "url": "assets/js/14.300f0749.js",
    "revision": "050745f59cfe06bb6b12e92c825d7887"
  },
  {
    "url": "assets/js/15.16b74280.js",
    "revision": "dcc50c3c41167f87bad8bb84ea2fb526"
  },
  {
    "url": "assets/js/16.dc24dc37.js",
    "revision": "62848fbc7ca6142187e3ef2f66baca68"
  },
  {
    "url": "assets/js/17.36c53f70.js",
    "revision": "6f3b7b14109705a1bde0fe94923b555e"
  },
  {
    "url": "assets/js/18.9afe33b1.js",
    "revision": "5ee4a53a287fd281d107b108ecc03edb"
  },
  {
    "url": "assets/js/2.d187085c.js",
    "revision": "b29470ef580202dd64eb870c85563cb3"
  },
  {
    "url": "assets/js/3.90f013ef.js",
    "revision": "5d7b4ab5fba3117695fe05b023993a4b"
  },
  {
    "url": "assets/js/4.f3c1883f.js",
    "revision": "94696ac995eef84d1886f5bb659dd07c"
  },
  {
    "url": "assets/js/5.a67e07c1.js",
    "revision": "6d68e4fe99391a74ac7018fa2370f71e"
  },
  {
    "url": "assets/js/6.259ffc94.js",
    "revision": "d9c02e2ea53f2c2e78d67b2148dc770b"
  },
  {
    "url": "assets/js/7.3216b24b.js",
    "revision": "ed2d833140fc02df5423750cf5e4a250"
  },
  {
    "url": "assets/js/8.e8e4ec64.js",
    "revision": "9e53a3e62a2e6a8a29e8cef20aa82898"
  },
  {
    "url": "assets/js/9.377d7270.js",
    "revision": "63703b2528ec9b46e7261b0ecd6df73e"
  },
  {
    "url": "assets/js/app.05814905.js",
    "revision": "00e6b1e87632d061a07dba8c49b66450"
  },
  {
    "url": "bigData/index.html",
    "revision": "f5fe19faf7e6948360a2c3566d0b25ed"
  },
  {
    "url": "deepLearning/index.html",
    "revision": "8f2eeffa7edc9b7eadb3cb058e6cb7f7"
  },
  {
    "url": "frontEnd/index.html",
    "revision": "37d6a661eaf5b3ef4132e0be960e7aa8"
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
    "revision": "5ac6dc2f4b9655b7fdc796f7ffd7be03"
  },
  {
    "url": "java/index.html",
    "revision": "73776666b0525ecc41363a8aaa56f058"
  },
  {
    "url": "java/语法.html",
    "revision": "0a2255c977277106448aad835739287e"
  },
  {
    "url": "java/面向对象.html",
    "revision": "9db10927f0d9418427f0d1d96a344a27"
  },
  {
    "url": "kotlin/index.html",
    "revision": "8d41f3a6a3d03df667b033fb7318edeb"
  },
  {
    "url": "softwareEngineering/111.html",
    "revision": "f5aaa3c4a039f3217824db0b9a022bef"
  },
  {
    "url": "softwareEngineering/index.html",
    "revision": "58e4bce5fed84919c191c373b420a271"
  },
  {
    "url": "spring/index.html",
    "revision": "bf6228409a30339a3c5d45764b0d4713"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "3ef93baa82db1920f0a0b62cbb40c512"
  },
  {
    "url": "tittle-tattle/关于Java编程部分的文章.html",
    "revision": "67e50bd175b6aade07e83b733556ac35"
  },
  {
    "url": "web/index.html",
    "revision": "8dd2f4a9273d50d60b95f60a9c1121de"
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
