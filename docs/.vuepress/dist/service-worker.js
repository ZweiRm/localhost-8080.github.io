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
    "revision": "9bace9326b5704992e7878aa9198c5de"
  },
  {
    "url": "about/index.html",
    "revision": "f6f97184572f8438ecc7cf9dfef94669"
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
    "url": "assets/js/10.0f89086e.js",
    "revision": "ec22a7e7b6bc0e98e7da7de6fb09c74c"
  },
  {
    "url": "assets/js/11.4836e65d.js",
    "revision": "6afffb5d1ac084f062db6ca06c3f3a6d"
  },
  {
    "url": "assets/js/12.cb6c414d.js",
    "revision": "b60f2f12aac183519c9233c546582d2f"
  },
  {
    "url": "assets/js/13.7c2bda96.js",
    "revision": "385e5da7f3eb402a7d5d57095af6f118"
  },
  {
    "url": "assets/js/14.418cfc13.js",
    "revision": "a73db210bedef288d47128d932e09b4b"
  },
  {
    "url": "assets/js/15.213155e3.js",
    "revision": "bf16f47eaadea921c5157694731c1ad1"
  },
  {
    "url": "assets/js/16.9b144962.js",
    "revision": "dee3babd494f8835e02a6a4956fee777"
  },
  {
    "url": "assets/js/17.1d3004e9.js",
    "revision": "da6e60193ddff6f3f392ca7d6205e532"
  },
  {
    "url": "assets/js/18.020f4cdc.js",
    "revision": "c27dabf14eb8a36248052593ac2d5399"
  },
  {
    "url": "assets/js/19.1e662a76.js",
    "revision": "9e95e1f5d9e378ed2dbebc4c11db3965"
  },
  {
    "url": "assets/js/2.bca23384.js",
    "revision": "97fbad6b99c59af9184b2f82c3a765c0"
  },
  {
    "url": "assets/js/20.35bbd17b.js",
    "revision": "e4c9cbb36c83ca1a752fa877423dcb82"
  },
  {
    "url": "assets/js/21.d2ec32a5.js",
    "revision": "6c04e38590a3f976de997d343e917194"
  },
  {
    "url": "assets/js/22.4f93e1cd.js",
    "revision": "f336345b361dd391091a7fe983d17c67"
  },
  {
    "url": "assets/js/3.6935aa76.js",
    "revision": "2944a7b766ab6a01402a052f48962f74"
  },
  {
    "url": "assets/js/4.ffccad24.js",
    "revision": "92f5e802794606af6b14094cf02ffab6"
  },
  {
    "url": "assets/js/5.3cde45e8.js",
    "revision": "eeaf68368e1709dd768ee2b54d4d8b5f"
  },
  {
    "url": "assets/js/6.43d6bc99.js",
    "revision": "d4327c9ad9f33f75515e43e5f935549f"
  },
  {
    "url": "assets/js/7.25b1e0f0.js",
    "revision": "df8467460e0767b85c39692a284c0d3c"
  },
  {
    "url": "assets/js/8.2b90bd87.js",
    "revision": "e6f794e95870fa5e71ed4ec0674d433a"
  },
  {
    "url": "assets/js/9.a4f69f5a.js",
    "revision": "a558b3c1b212b49571cbf61c6f3f61fa"
  },
  {
    "url": "assets/js/app.130fcbfd.js",
    "revision": "3434fee444f0221e7b4abc65e6144cbf"
  },
  {
    "url": "bigData/index.html",
    "revision": "3f718a1991039c4f5a13a9b32be10fca"
  },
  {
    "url": "c/index.html",
    "revision": "24b6ee6915a97cf61f7eda7595f87e68"
  },
  {
    "url": "c/常量、变量与数据类型.html",
    "revision": "d2bfdb70a14f255f74a939ba8c5d920c"
  },
  {
    "url": "deepLearning/index.html",
    "revision": "ca43248991111d41767b3ff8abad4769"
  },
  {
    "url": "frontEnd/index.html",
    "revision": "248b7d0e3b7c1ca79d0f01806294a025"
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
    "revision": "3e0bcb0adf4c585811b62251e81c7c81"
  },
  {
    "url": "java/index.html",
    "revision": "e495e5845bfe08dfe10f718d57185524"
  },
  {
    "url": "java/应用程序编程接口.html",
    "revision": "c37bec416e4ddde5e9eb55d7dcef9d77"
  },
  {
    "url": "java/语法.html",
    "revision": "8b70b644dd859886396843893448de6d"
  },
  {
    "url": "java/面向对象.html",
    "revision": "c156d7d02c24eaf49a6cb1e94f9fd14c"
  },
  {
    "url": "kotlin/index.html",
    "revision": "8ace3553eca887c75ee036071a49f309"
  },
  {
    "url": "softwareEngineering/index.html",
    "revision": "f4cfa2decd39f7c069d350c8f69f3e56"
  },
  {
    "url": "spring/index.html",
    "revision": "8fe01c5f947c6c9a7d40d0856d8040ef"
  },
  {
    "url": "tittle-tattle/Computing Machinery and Intelligence By A. M. Turing.html",
    "revision": "bba4f93ff956806cd2932ba70dbf87a1"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "7d69f4ccf5847be05be59f5fe26f49bd"
  },
  {
    "url": "tittle-tattle/关于Java编程部分的文章.html",
    "revision": "1e452c0fdd50c8e10193819b317bab10"
  },
  {
    "url": "tittle-tattle/新年快乐！.html",
    "revision": "bc8da3bb19c5e0e2728c66a95f8ad160"
  },
  {
    "url": "web/index.html",
    "revision": "643d69edf162bac4b831bfdafe91f130"
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
