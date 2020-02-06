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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "f8fd232e915409bb4c562ebb6ce7cdf6"
  },
  {
    "url": "about/index.html",
    "revision": "d0f1a42f8e1066bc6fed60735446e3e1"
  },
  {
    "url": "assets/css/0.styles.62892d27.css",
    "revision": "ee9af82d61e74d54a4f37f47b2041a94"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.4c2d03b6.js",
    "revision": "95d3c297a9bf43af5e098361da71edf2"
  },
  {
    "url": "assets/js/11.2c231f45.js",
    "revision": "627c592ddffe1167447c15f5bff4e250"
  },
  {
    "url": "assets/js/12.f7c3e1f4.js",
    "revision": "813617b634b20ee0781c7272a0c0b66b"
  },
  {
    "url": "assets/js/13.78ab01bd.js",
    "revision": "6c32b6b78eba18488b7161837e03af79"
  },
  {
    "url": "assets/js/14.f0a2aae2.js",
    "revision": "30e949e8cbee06d5a378d66734f7f5b7"
  },
  {
    "url": "assets/js/15.dc318f34.js",
    "revision": "01554ff346afc8ace25a3ed1d81cfbf3"
  },
  {
    "url": "assets/js/16.f150a67f.js",
    "revision": "29903617b88668571ae5186516c355bc"
  },
  {
    "url": "assets/js/17.55e1706a.js",
    "revision": "5f30fbd69b7eb7a97ef53dbcb738ceb3"
  },
  {
    "url": "assets/js/18.8911d2dd.js",
    "revision": "18e45305daade27806c1054d1a22086f"
  },
  {
    "url": "assets/js/19.13edf9cf.js",
    "revision": "6e2f54697fc9286e116036b14243d22e"
  },
  {
    "url": "assets/js/2.26035483.js",
    "revision": "6a4f303e66a1e33a66e0fe1ab787a9b2"
  },
  {
    "url": "assets/js/20.83eca27c.js",
    "revision": "2205adedd3d20ff28d7bafc276263ed4"
  },
  {
    "url": "assets/js/21.5845196c.js",
    "revision": "2349dc06a2f968f066509fa91ac60afe"
  },
  {
    "url": "assets/js/22.eaa7f830.js",
    "revision": "7c76b9172c85c7305a46d6576ef97458"
  },
  {
    "url": "assets/js/23.23cdf10a.js",
    "revision": "ab8f1a770993890a39b2f677ad6fb6b7"
  },
  {
    "url": "assets/js/24.233dbe8e.js",
    "revision": "5e6b1434fcd8945992e9d4381c4d7940"
  },
  {
    "url": "assets/js/25.81163e2b.js",
    "revision": "99193ed767c67bfbe0211ee77f990a85"
  },
  {
    "url": "assets/js/26.e5b9372c.js",
    "revision": "b38edfae23d90ab16c496fb7d5c05b63"
  },
  {
    "url": "assets/js/27.619d7388.js",
    "revision": "8aec0e88b95bece871f912e861b66286"
  },
  {
    "url": "assets/js/28.fb097be6.js",
    "revision": "97b0d968335c7ee683239d2642b530c5"
  },
  {
    "url": "assets/js/29.b8fbf1a9.js",
    "revision": "da6a33eb04c620eff7e01a9ebb0616b4"
  },
  {
    "url": "assets/js/3.1e75c58d.js",
    "revision": "392339d24ee50add4b634a95129d53c7"
  },
  {
    "url": "assets/js/30.7897d7d8.js",
    "revision": "7bbd641445356c270992e004b9599554"
  },
  {
    "url": "assets/js/31.d90a9b47.js",
    "revision": "f2b5f7b3c6735eecf44a8a4702a4d3a9"
  },
  {
    "url": "assets/js/32.8d99c490.js",
    "revision": "bc642c8168c4e31956b80523ae0e84d3"
  },
  {
    "url": "assets/js/4.1e6e8137.js",
    "revision": "3acea63baf481e5c3560a3b308e47daa"
  },
  {
    "url": "assets/js/5.15b13fd7.js",
    "revision": "4bf26d7e82894b2afe56682dd89783f3"
  },
  {
    "url": "assets/js/6.12be29ec.js",
    "revision": "05d95fc12bf2edcbdaf59e5e29c0e6fe"
  },
  {
    "url": "assets/js/7.223b55a8.js",
    "revision": "a7dabc48f0ae67004b5679a757fd3362"
  },
  {
    "url": "assets/js/8.4d226119.js",
    "revision": "5080881ecb847d48d77d435bd265d735"
  },
  {
    "url": "assets/js/9.4e8b0c30.js",
    "revision": "c3a4f1047b175654f2d8e5395773eb39"
  },
  {
    "url": "assets/js/app.49a3527f.js",
    "revision": "db4e388af6ea41fa6de0fd0518689d63"
  },
  {
    "url": "big-data/index.html",
    "revision": "4245654ce3f03d67e6661838df58e03e"
  },
  {
    "url": "c/index.html",
    "revision": "17aaef6f73529e89bc22059c6196c593"
  },
  {
    "url": "c/常量、变量与数据类型.html",
    "revision": "3dd1ff5809300abf6a8feb509c67cb4e"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "f3c7266f25248f626472834fc3853ac6"
  },
  {
    "url": "front-end/index.html",
    "revision": "ee48e6240c3ac50d2f1905766cf20805"
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
    "url": "img/LinkedList.png",
    "revision": "14e3dd4e083426cf400833e2d5bcb8da"
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
    "url": "img/文章被拒过程分析.png",
    "revision": "93a0f89798a24095caa63ae1163ed024"
  },
  {
    "url": "img/棋盘法.png",
    "revision": "3510ab577c8babbf75ba42fc502b1b6e"
  },
  {
    "url": "img/线程状态.png",
    "revision": "61e45bcbe860fb495c362e8e23f281a0"
  },
  {
    "url": "img/自动类型转换.png",
    "revision": "2f12d0fde58f56fdd54524ebac04368a"
  },
  {
    "url": "img/论文结构图.jpg",
    "revision": "c2f1ce9bab73bd445cda17969f294f3a"
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
    "revision": "a266aeb665cf2bf7d89b55d11c4fb6e3"
  },
  {
    "url": "java/API-工具类库.html",
    "revision": "4a213738ab0b85ac429faae04beb9e70"
  },
  {
    "url": "java/API-语言基础类库.html",
    "revision": "faccb9de4e76f8ee70fad27622f482b3"
  },
  {
    "url": "java/API-输入输出类库.html",
    "revision": "fa29c79369a75029ed5e7fe682af0be6"
  },
  {
    "url": "java/index.html",
    "revision": "a5f0587b3313dff6a8c04d44296c59a4"
  },
  {
    "url": "java/应用程序编程接口概述.html",
    "revision": "a4b69840941d2d65e0d15abb0ea9a87e"
  },
  {
    "url": "java/语法.html",
    "revision": "a12ba13762dac1d4484694eb3fedeaa7"
  },
  {
    "url": "java/面向对象.html",
    "revision": "bc4dda8e480492199ac732fb445a268f"
  },
  {
    "url": "kotlin/index.html",
    "revision": "57987cde4084a879520ac0e9c88e1438"
  },
  {
    "url": "math/index.html",
    "revision": "391706800fac2d6e6a5cc810eb290a24"
  },
  {
    "url": "math/多元函数微分学.html",
    "revision": "6835c2187be2018954b106dc242a5b18"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "ef1533d0a56efc9be8b0b2d759a0a580"
  },
  {
    "url": "software-engineering/软件过程.html",
    "revision": "f1af399b015901320bf11fe280521592"
  },
  {
    "url": "spring/index.html",
    "revision": "46d6dde9162d06120a2c8162ba67c3c4"
  },
  {
    "url": "tittle-tattle/Computing Machinery and Intelligence By A. M. Turing.html",
    "revision": "5feaaf91135ec1ce601b8d4109039bf8"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "7c3dcc4e2d2aee27291d0d6a829e63ac"
  },
  {
    "url": "tittle-tattle/关于Java编程部分的文章.html",
    "revision": "246236412651eacb4c73f3738066a05f"
  },
  {
    "url": "tittle-tattle/学术研究的正确姿势.html",
    "revision": "a6ea91ed47f69b221bf7e67b96f9d6eb"
  },
  {
    "url": "tittle-tattle/新年快乐！.html",
    "revision": "785d3eb1b896bcf1927f1599e7df35f7"
  },
  {
    "url": "web/index.html",
    "revision": "d4b1653804e319d92a05e04eeef34195"
  }
].concat(self.__precacheManifest || []);
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
