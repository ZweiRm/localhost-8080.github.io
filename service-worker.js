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
    "revision": "54adaf6a1c90eff43eabd1baa290c660"
  },
  {
    "url": "about/index.html",
    "revision": "291a016cb5c9afde4de5627b045992b3"
  },
  {
    "url": "assets/css/0.styles.0d19fd84.css",
    "revision": "9bb6b9f88c684f84f2eb3ace755e382e"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.5e624673.js",
    "revision": "7d830605812b0fdbe8d7513fa29f011b"
  },
  {
    "url": "assets/js/11.0b620351.js",
    "revision": "7fbd196440942dd52786121825d5660b"
  },
  {
    "url": "assets/js/12.6c80dfa5.js",
    "revision": "f455c28daf2cd04e8b3ee7c8fa7a6fa5"
  },
  {
    "url": "assets/js/13.a813ff00.js",
    "revision": "1ac3b0da46b452aef93b8ee3bb12f4d8"
  },
  {
    "url": "assets/js/14.2f6215c0.js",
    "revision": "48369613cfdcff3bcf5ab3cb020b7105"
  },
  {
    "url": "assets/js/15.44f8c19d.js",
    "revision": "54a6a30c3fb859b8fc8df025e04fe744"
  },
  {
    "url": "assets/js/16.f8a5e4f1.js",
    "revision": "f7799f682d10084f3750e6fe3070d1f7"
  },
  {
    "url": "assets/js/17.9d347a0d.js",
    "revision": "43bd78ed2371efe9e74537a6e0115bc9"
  },
  {
    "url": "assets/js/18.f6407538.js",
    "revision": "a6c48da85a2f989531125efad396614c"
  },
  {
    "url": "assets/js/19.05a89876.js",
    "revision": "e22886820fd8fc76e56ebc42c4ee27d8"
  },
  {
    "url": "assets/js/2.afc26b7e.js",
    "revision": "8f265611657e1a7af270952db67ef914"
  },
  {
    "url": "assets/js/20.fdf2dde1.js",
    "revision": "f11119ae0014b1eb42e60ec39d16fb22"
  },
  {
    "url": "assets/js/3.bd3841a1.js",
    "revision": "7109d2e511f2232566b526deb177c290"
  },
  {
    "url": "assets/js/4.d397bb7e.js",
    "revision": "82ff235a98ee9db1d3422020b378e7d5"
  },
  {
    "url": "assets/js/5.6d1fa4b2.js",
    "revision": "df35aded56b12c6900683d1dd0f5d2fe"
  },
  {
    "url": "assets/js/6.8c6b5f5f.js",
    "revision": "b48400bb8277e36fa0985b030d5c3a50"
  },
  {
    "url": "assets/js/7.37b02643.js",
    "revision": "721e2d0d7d2e48968afe4acf2680d3fd"
  },
  {
    "url": "assets/js/8.eb5a5c8d.js",
    "revision": "045d571490a8161dd5b884bcdb04795c"
  },
  {
    "url": "assets/js/9.39d12c1a.js",
    "revision": "948dadbd5c3789b7b023d8494e2e3826"
  },
  {
    "url": "assets/js/app.b1665f02.js",
    "revision": "a17010ef08c3c601017079f6fb9e89da"
  },
  {
    "url": "bigData/index.html",
    "revision": "3350eea472f1cfe704aa77be2fcc8519"
  },
  {
    "url": "deepLearning/index.html",
    "revision": "6d816b42cf43a86032a27459dffa7bc9"
  },
  {
    "url": "frontEnd/index.html",
    "revision": "4253a33d85be202aba155da0f247cdcd"
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
    "revision": "de134bfd216bf907f8f014af16f2a7b0"
  },
  {
    "url": "java/index.html",
    "revision": "1d79ea5799bf33046119dc7d0eb35d06"
  },
  {
    "url": "java/应用程序编程接口.html",
    "revision": "87602225374246f9be8d2191ee7f70c7"
  },
  {
    "url": "java/语法.html",
    "revision": "4779bd6cf81101cc6d88692a12b5463e"
  },
  {
    "url": "java/面向对象.html",
    "revision": "367a76cd6545cd0b4f0dffe7c70a13da"
  },
  {
    "url": "kotlin/index.html",
    "revision": "8121bbe0c19a16edfe0d29c47ac94403"
  },
  {
    "url": "softwareEngineering/index.html",
    "revision": "030f3ed68f03de32cd21f5d8d7d16871"
  },
  {
    "url": "spring/index.html",
    "revision": "742812c02c85c9cbf8175274e181a56d"
  },
  {
    "url": "tittle-tattle/Computing Machinery and Intelligence By A. M. Turing.html",
    "revision": "bef03736f3eb8295943df3d33a8c8a20"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "27a4a89c3cb41122809bc239167239ae"
  },
  {
    "url": "tittle-tattle/关于Java编程部分的文章.html",
    "revision": "479418e8fbccf818c6e92d6505089f14"
  },
  {
    "url": "tittle-tattle/新年快乐！.html",
    "revision": "4e26e1a39c514676d68d2343c77bfaf7"
  },
  {
    "url": "web/index.html",
    "revision": "1113dbd66f19d3db34683ebe270aeb83"
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
