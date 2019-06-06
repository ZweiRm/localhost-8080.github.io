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
    "revision": "db941fc2cefb01576522082c96ea1b12"
  },
  {
    "url": "about/index.html",
    "revision": "c494bdd33e494051779d40963554a891"
  },
  {
    "url": "assets/css/0.styles.3e1d0bd1.css",
    "revision": "9ea15421c257b7c2e72a5668b435969f"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.b6ee7c1c.js",
    "revision": "56b16a93612ee1ea390d5f1487cf7d1f"
  },
  {
    "url": "assets/js/11.56bcbb08.js",
    "revision": "d214f2c74d7ccf5901cf1ba8f2429751"
  },
  {
    "url": "assets/js/12.4495ab1d.js",
    "revision": "79195847133049426d394698ed98aec9"
  },
  {
    "url": "assets/js/13.a32c9920.js",
    "revision": "b5c4cd7df4f18a071e698dcf27a0db98"
  },
  {
    "url": "assets/js/14.4d0b626f.js",
    "revision": "2c93f96badc8c666cafaee875086152e"
  },
  {
    "url": "assets/js/15.9db9a31a.js",
    "revision": "c48c09281f1cfd17883dd6b0dc102389"
  },
  {
    "url": "assets/js/16.a5661a34.js",
    "revision": "0b753739834f1a955ea97a2136e15dd0"
  },
  {
    "url": "assets/js/17.85b2f08b.js",
    "revision": "bb1716f193c479f6c7f823d2a1ef3fca"
  },
  {
    "url": "assets/js/18.52e0710f.js",
    "revision": "1cf2e73b5328a475251ea7da370d39fa"
  },
  {
    "url": "assets/js/19.12580a3a.js",
    "revision": "ee0dad81c46d92e602baaf1fd1da95b0"
  },
  {
    "url": "assets/js/2.a3e62f69.js",
    "revision": "a15e57c7449839726f6b4b637f095932"
  },
  {
    "url": "assets/js/20.d6659528.js",
    "revision": "ae690f0e42576d3b929bde523cba7f68"
  },
  {
    "url": "assets/js/21.093efa81.js",
    "revision": "33e61e32b1d0bbc28e2945ec2c8af669"
  },
  {
    "url": "assets/js/22.71f11861.js",
    "revision": "86b79233b736755c5926f60d7b329867"
  },
  {
    "url": "assets/js/23.865b0ffa.js",
    "revision": "4b3f4e9ba40eae94ac118cc66cfc18fe"
  },
  {
    "url": "assets/js/3.aec55cfb.js",
    "revision": "6c8ad6a13f8edfe4a4871050656fe441"
  },
  {
    "url": "assets/js/4.af911e5f.js",
    "revision": "f541de14ee1d171557564543f441f125"
  },
  {
    "url": "assets/js/5.440eb4ba.js",
    "revision": "faaf518efbc4ef0df57b4d8d01f4dd8f"
  },
  {
    "url": "assets/js/6.e1109b6b.js",
    "revision": "e617f67665ffb32f9a1f8dec3cd1051a"
  },
  {
    "url": "assets/js/7.eee6d708.js",
    "revision": "4c338330c7dca971c46987cc20f409df"
  },
  {
    "url": "assets/js/8.9372b7bb.js",
    "revision": "3a487eb9c095b46cf78b91f44d940855"
  },
  {
    "url": "assets/js/9.6807aed3.js",
    "revision": "aed3d2fad095ab6a41f73ee5ad1473c9"
  },
  {
    "url": "assets/js/app.28c9abc5.js",
    "revision": "39818cf411b41b496a66f90dbb46e112"
  },
  {
    "url": "big-data/index.html",
    "revision": "32aa9d0d204ed0fd87376a0b64e867a7"
  },
  {
    "url": "c/index.html",
    "revision": "b7dafbe33060f424cd49de61448e012e"
  },
  {
    "url": "c/常量、变量与数据类型.html",
    "revision": "acd7c2b8516555331a529eb3ae864163"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "869e7668793192e253d0c615e72c15a3"
  },
  {
    "url": "front-end/index.html",
    "revision": "5701e233e8074a36cf9fc0d4b1e9aac7"
  },
  {
    "url": "img/ahza-white.png",
    "revision": "3c642eba43abc55fb6555dab8d743fcd"
  },
  {
    "url": "img/C程序的基本结构.jpg",
    "revision": "7a23f1d4d04270c9354597cf2499dee4"
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
    "url": "img/软件开发的本质.jpg",
    "revision": "330e888bac7671219bed6e813f375383"
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
    "revision": "cc3eefcd8b20ae33316c5a8205c17fd3"
  },
  {
    "url": "java/index.html",
    "revision": "59a9ea4ed9505d31ae87289e27a33efe"
  },
  {
    "url": "java/应用程序编程接口.html",
    "revision": "67a7f8367c2eff3a192da437ba636ac0"
  },
  {
    "url": "java/语法.html",
    "revision": "cd20c5a63b351fbb57c35346296a7f30"
  },
  {
    "url": "java/面向对象.html",
    "revision": "fccf2055eddbccd3053cfa31a8be6631"
  },
  {
    "url": "kotlin/index.html",
    "revision": "39982bbc269754e4383bd615ffbb0673"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "9df1ef12158d4724765a684583e45e36"
  },
  {
    "url": "software-engineering/软件过程.html",
    "revision": "89ebfdbfe1440617540c7d3fc9d19c22"
  },
  {
    "url": "spring/index.html",
    "revision": "9b615491b244d57bd3410d03aa74db9c"
  },
  {
    "url": "tittle-tattle/Computing Machinery and Intelligence By A. M. Turing.html",
    "revision": "bec8e9682f3220e921c4eb381f937317"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "e55a8de7324d2a8379157485cdd2bde7"
  },
  {
    "url": "tittle-tattle/关于Java编程部分的文章.html",
    "revision": "84844ae2949665d2e17b6fdfe57a171c"
  },
  {
    "url": "tittle-tattle/新年快乐！.html",
    "revision": "16d33c19b8c4e853046ab15af7a70393"
  },
  {
    "url": "web/index.html",
    "revision": "98f60cabea70b5bf62b2b6827e000fb8"
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
