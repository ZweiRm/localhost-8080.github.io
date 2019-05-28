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
    "revision": "52be1dece6366b768b431a391fd44eaa"
  },
  {
    "url": "about/index.html",
    "revision": "554b222db44c72715949dd537ace56fd"
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
    "url": "assets/js/10.8ce2be6e.js",
    "revision": "c969a59e69d47afd8b5b41512200c793"
  },
  {
    "url": "assets/js/11.5fdc96a3.js",
    "revision": "b9dfa183395bef70b5937bc8a41f8b38"
  },
  {
    "url": "assets/js/12.d9091d64.js",
    "revision": "a36d5f5ba1f9fbf9c1d6b09bf9a116bc"
  },
  {
    "url": "assets/js/13.2339ab00.js",
    "revision": "e5191e56e19b06a5348c75b4a320962c"
  },
  {
    "url": "assets/js/14.2af740b5.js",
    "revision": "767dc75247202a33b93006485f18e0d3"
  },
  {
    "url": "assets/js/15.f8be2f4d.js",
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
    "url": "assets/js/18.1fb0c555.js",
    "revision": "a62bd3ac4245dd0a31cf97920c379b5d"
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
    "url": "assets/js/3.ac2fc189.js",
    "revision": "2d0137b953cee7ec0a9cc7e85e6f76c2"
  },
  {
    "url": "assets/js/4.ffccad24.js",
    "revision": "92f5e802794606af6b14094cf02ffab6"
  },
  {
    "url": "assets/js/5.a6dbaf08.js",
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
    "url": "assets/js/8.c8789478.js",
    "revision": "e6f794e95870fa5e71ed4ec0674d433a"
  },
  {
    "url": "assets/js/9.be282ccc.js",
    "revision": "a558b3c1b212b49571cbf61c6f3f61fa"
  },
  {
    "url": "assets/js/app.4f9f24a9.js",
    "revision": "2f1df4b5226afb8a8f96ab90391b18c9"
  },
  {
    "url": "big-data/index.html",
    "revision": "f9fd9400d9b39a6a7627fcf355bd358d"
  },
  {
    "url": "c/index.html",
    "revision": "9147e71fbacce1c0b775c3afc5ababd1"
  },
  {
    "url": "c/常量、变量与数据类型.html",
    "revision": "5463a4dd5a2f29181f7584569d87cf25"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "547afe9cf5116c4f91a4bf074afecb8d"
  },
  {
    "url": "front-end/index.html",
    "revision": "884761e63bba398011ef2d14d205477e"
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
    "revision": "56ba599c007e38a48e2d22a12b491ab3"
  },
  {
    "url": "java/index.html",
    "revision": "f4e1d35e06aa7025c84fb5344ea11514"
  },
  {
    "url": "java/应用程序编程接口.html",
    "revision": "32876d69e0318fcc49b2b360175e1f7c"
  },
  {
    "url": "java/语法.html",
    "revision": "0f1e1a6a975f9af30ae9de60c8e3f1cf"
  },
  {
    "url": "java/面向对象.html",
    "revision": "a6f22aafff8a18f2f6a7273f19ad8e36"
  },
  {
    "url": "kotlin/index.html",
    "revision": "b3a8fbee01eb494f6274852e39c15c5f"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "810567cbea4e6add4c14082a09686072"
  },
  {
    "url": "spring/index.html",
    "revision": "c0dc6a475ecf81cd224905f0d61f124e"
  },
  {
    "url": "tittle-tattle/Computing Machinery and Intelligence By A. M. Turing.html",
    "revision": "af84ddc18a6b80252e130d32a0e3af55"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "b2623e08d37f00fb2cca00871cf08713"
  },
  {
    "url": "tittle-tattle/关于Java编程部分的文章.html",
    "revision": "61d45768807ef4d428d45673c8323a65"
  },
  {
    "url": "tittle-tattle/新年快乐！.html",
    "revision": "8c8241c7b1b1bbb3671ea6325bcf2ba0"
  },
  {
    "url": "web/index.html",
    "revision": "c16edcb804be344679a42ab97aec15a0"
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
