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
    "revision": "8c7f05fdd9464063c50301ceeefc04e2"
  },
  {
    "url": "about/index.html",
    "revision": "1a3d61d64e4d67b72ba14413c3cf2e69"
  },
  {
    "url": "assets/css/0.styles.3227a1f7.css",
    "revision": "7c7016b4a7f409894224d3f956485475"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.09561a10.js",
    "revision": "2cfc30888585ce372b25674c72e33a1f"
  },
  {
    "url": "assets/js/11.9dfa9dca.js",
    "revision": "ad6e1f4e8bd56752a1209b979cba9ed6"
  },
  {
    "url": "assets/js/12.3cacd8e5.js",
    "revision": "e5a131d0c45b0320b7deb80d3f8e7102"
  },
  {
    "url": "assets/js/13.4e768072.js",
    "revision": "b1af7958ab12d765106bcec84e5cf132"
  },
  {
    "url": "assets/js/14.02dfcfa8.js",
    "revision": "8c97839477344c439e16c06416874735"
  },
  {
    "url": "assets/js/15.fb6bbea4.js",
    "revision": "df7736b48f9ca2be423d497e684b1ae2"
  },
  {
    "url": "assets/js/16.7fb737e9.js",
    "revision": "1c636da993dfad71469c80a615e2be22"
  },
  {
    "url": "assets/js/17.8e4cb9a4.js",
    "revision": "21db542b0b2f17ae5dce320486d9178d"
  },
  {
    "url": "assets/js/18.d72b1228.js",
    "revision": "b5ce0cb44aa189d729ae8b841d1f74be"
  },
  {
    "url": "assets/js/19.387ec619.js",
    "revision": "a3597a5e5e677d07e59858c87dbb0c21"
  },
  {
    "url": "assets/js/2.4416e7e4.js",
    "revision": "7c0e430ac07c077cc46e67d0b4ce2175"
  },
  {
    "url": "assets/js/20.73d58255.js",
    "revision": "eaed4a85449e1d6ae7500d76e46c478b"
  },
  {
    "url": "assets/js/21.4ce76dcc.js",
    "revision": "80062bfee59826cd78018cd72f9dff48"
  },
  {
    "url": "assets/js/22.d14787fe.js",
    "revision": "8386b783e42c2c7397ea88e959a5ecd1"
  },
  {
    "url": "assets/js/23.a9b393f7.js",
    "revision": "d273d45e6bfbc0c3c5b996443d9a7895"
  },
  {
    "url": "assets/js/24.344ea81e.js",
    "revision": "8de8c79455734f0c75ea9f051b8152cf"
  },
  {
    "url": "assets/js/25.7ef9e21b.js",
    "revision": "6c81f5ce06a3332ec16d6b4f164f1f79"
  },
  {
    "url": "assets/js/26.7d7917e7.js",
    "revision": "d038c1e68e1d6c4f3a7db1f34741c7e1"
  },
  {
    "url": "assets/js/27.3eeccfb5.js",
    "revision": "8b4fc36ef0a9f52400d4afaa4e0681d3"
  },
  {
    "url": "assets/js/28.29f3b995.js",
    "revision": "5fec836de2753ac47738a2d8ef26d5bd"
  },
  {
    "url": "assets/js/29.3890c2ec.js",
    "revision": "b99b093dfedef8e8e6ea3126e573c0e7"
  },
  {
    "url": "assets/js/3.1a7a9be5.js",
    "revision": "65527718794d7b927fe2672fea470f9f"
  },
  {
    "url": "assets/js/30.824360cf.js",
    "revision": "04e6deb930a1a719bda473a131582fe0"
  },
  {
    "url": "assets/js/4.0328c64c.js",
    "revision": "270d88cf87115a95f551a7ea250dcd35"
  },
  {
    "url": "assets/js/5.18ece291.js",
    "revision": "1e29b328955555619eef364612737dda"
  },
  {
    "url": "assets/js/6.5f06fe91.js",
    "revision": "bbecd6728ecab6522707c4252d6cf83c"
  },
  {
    "url": "assets/js/7.abcc6fc0.js",
    "revision": "094cd0a1a89d9f47603eeb6769110a05"
  },
  {
    "url": "assets/js/8.ef9ecfad.js",
    "revision": "f34521df8ae1c82221e71249abe07044"
  },
  {
    "url": "assets/js/9.f9c48265.js",
    "revision": "d5a0a6380a4e1f3687ad430d0daf8db5"
  },
  {
    "url": "assets/js/app.fbd441f1.js",
    "revision": "6dc4584c5e8722adb497464190878f5e"
  },
  {
    "url": "big-data/index.html",
    "revision": "07ce394cbd3e2aaac49fa0cace72b3c8"
  },
  {
    "url": "c/index.html",
    "revision": "336dbd450c558a9c9e923119673618ae"
  },
  {
    "url": "c/常量、变量与数据类型.html",
    "revision": "61646d69030050c203ffad4d6139f000"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "b08a0ecbc09ca00b8ebea7462a5e3ab1"
  },
  {
    "url": "front-end/index.html",
    "revision": "8dc0a3ba40206a2a9a320bbd65b73f30"
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
    "revision": "e1888dcfdab277dd25493ad4646a8707"
  },
  {
    "url": "java/API-语言基础类库.html",
    "revision": "8ac6ed8ff50e0df04e4e68bbb4f21f90"
  },
  {
    "url": "java/index.html",
    "revision": "8538fa3e548075275b5b05e333384e64"
  },
  {
    "url": "java/应用程序编程接口概述.html",
    "revision": "d9c5432a977f4f28ba597c51b645fd8a"
  },
  {
    "url": "java/语法.html",
    "revision": "759b8fb5ca08d851483702ed5abed005"
  },
  {
    "url": "java/面向对象.html",
    "revision": "ab70e42cb976c0b62a0953fcd8133dc6"
  },
  {
    "url": "kotlin/index.html",
    "revision": "cfcb1ef1ac73676a21bff3f3cf5d5814"
  },
  {
    "url": "math/index.html",
    "revision": "496e7f29007459013925d6add6e9a5c5"
  },
  {
    "url": "math/多元函数微分学.html",
    "revision": "c513b8b563af0814d5f7abcd6beb1dfb"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "ca01ac5e277197bc0c4a831c8b8a45a1"
  },
  {
    "url": "software-engineering/软件过程.html",
    "revision": "dedbdba1054a250699507bc5ef74d08f"
  },
  {
    "url": "spring/index.html",
    "revision": "6da31a630b16bdcd6be59ace99e8ba9f"
  },
  {
    "url": "tittle-tattle/Computing Machinery and Intelligence By A. M. Turing.html",
    "revision": "22397c846fb297fe2376052420621508"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "b57e8a50ccaabb39c805aeea0eb3b6df"
  },
  {
    "url": "tittle-tattle/关于Java编程部分的文章.html",
    "revision": "890d45bbb9b92f186530d9b08922bf36"
  },
  {
    "url": "tittle-tattle/学术研究的正确姿势.html",
    "revision": "292d5bb1f8c9835ff4d103ad94286a15"
  },
  {
    "url": "tittle-tattle/新年快乐！.html",
    "revision": "45441ad41a0747ae67c8c9eccca6830e"
  },
  {
    "url": "web/index.html",
    "revision": "8bec7f561d03608e0bf17746ec609216"
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
