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
    "revision": "dfd54e82ae23cd0d5292f885971a67aa"
  },
  {
    "url": "about/index.html",
    "revision": "35885f8fbb28d1ab8621758f626bccab"
  },
  {
    "url": "assets/css/0.styles.bbf45d46.css",
    "revision": "7c7016b4a7f409894224d3f956485475"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.cf2cf728.js",
    "revision": "371f4444bd31067463fcfb5d9e35642b"
  },
  {
    "url": "assets/js/11.1f7d64f4.js",
    "revision": "ee00339d265664d1feb046c9089ef6b2"
  },
  {
    "url": "assets/js/12.02096200.js",
    "revision": "e5a131d0c45b0320b7deb80d3f8e7102"
  },
  {
    "url": "assets/js/13.49b321d1.js",
    "revision": "757ea45d72402310d145fb6d2c4959c5"
  },
  {
    "url": "assets/js/14.f86a9de6.js",
    "revision": "39d6abadf6c1b8b343a89e9419eb81f2"
  },
  {
    "url": "assets/js/15.93e40623.js",
    "revision": "f546667e7b55369a013f407d746826f8"
  },
  {
    "url": "assets/js/16.60c6c565.js",
    "revision": "ef2d688f3a56c3d75bcb9d9887049a0f"
  },
  {
    "url": "assets/js/17.8b8b2fab.js",
    "revision": "9c537b3127318eff90422053c8a78a0d"
  },
  {
    "url": "assets/js/18.d6927b0a.js",
    "revision": "1e8cba7ff98c723cbd1e805cdaf58fc2"
  },
  {
    "url": "assets/js/19.fce63b21.js",
    "revision": "4025c041fa9ce7cb02bb185bdd23b7cc"
  },
  {
    "url": "assets/js/2.5fbcbb8a.js",
    "revision": "7c0e430ac07c077cc46e67d0b4ce2175"
  },
  {
    "url": "assets/js/20.f5e4a42c.js",
    "revision": "614e7cb3c05742c3376cb396d9af4a09"
  },
  {
    "url": "assets/js/21.cdf5fa09.js",
    "revision": "d08f6181315b00112b0acfd53d6e59c5"
  },
  {
    "url": "assets/js/22.c0ecf24b.js",
    "revision": "a274d9427433c26df694e9c191026c11"
  },
  {
    "url": "assets/js/23.fa685766.js",
    "revision": "a78c73cd6c3d5c3c31f318dd2b82e41c"
  },
  {
    "url": "assets/js/24.889be0da.js",
    "revision": "f1df95970753a8e46df86947a2f905a6"
  },
  {
    "url": "assets/js/25.5c05c583.js",
    "revision": "0ccd7b06ded09632973913f79960bfbd"
  },
  {
    "url": "assets/js/26.1f4e2abb.js",
    "revision": "152852824cd5bdb72c85aa96fc94202d"
  },
  {
    "url": "assets/js/27.a855f164.js",
    "revision": "e5dac29566d4dc8efa53d698c17b069e"
  },
  {
    "url": "assets/js/28.7f71e581.js",
    "revision": "e66ac387cd59daef919bf8d901c4f59a"
  },
  {
    "url": "assets/js/29.1b83f1a3.js",
    "revision": "086e0d05a8aba946d0e87a88c17b458b"
  },
  {
    "url": "assets/js/3.c0389840.js",
    "revision": "90838b6878fb76ae6fb74f5bedd80dac"
  },
  {
    "url": "assets/js/4.40ce9960.js",
    "revision": "1bd68d43600d222ac5e459a527fbcd67"
  },
  {
    "url": "assets/js/5.0697a167.js",
    "revision": "1e29b328955555619eef364612737dda"
  },
  {
    "url": "assets/js/6.db60dd2c.js",
    "revision": "49642ac802cdac9960580f999f65b13f"
  },
  {
    "url": "assets/js/7.e40a5a53.js",
    "revision": "e63c21ca711bcedcc4f6b5bbf5799586"
  },
  {
    "url": "assets/js/8.d0daeb59.js",
    "revision": "9cc403e085fcf578e744e9c012cf3e1d"
  },
  {
    "url": "assets/js/9.57b2ca2d.js",
    "revision": "0ba8d50c6b6a7a98aa8669322c749c80"
  },
  {
    "url": "assets/js/app.cd593f3a.js",
    "revision": "1380274d2481f9ff062aea3d51d7452d"
  },
  {
    "url": "big-data/index.html",
    "revision": "83314a49912aefd26964760e5e0ee5d1"
  },
  {
    "url": "c/index.html",
    "revision": "3df6b5de5592779ab0020cab44735446"
  },
  {
    "url": "c/常量、变量与数据类型.html",
    "revision": "fbe3514ddc39cbc63053c505c87e5d92"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "8d74685f6ebfa26d9f5c4f7bb7cc04c2"
  },
  {
    "url": "front-end/index.html",
    "revision": "231be299bec60dbb9cb98fcd9083b0a5"
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
    "revision": "6285e2c3acc915cccb131508196edcb4"
  },
  {
    "url": "java/index.html",
    "revision": "770691ea70b3ee8a96fa4736195e22f9"
  },
  {
    "url": "java/应用程序编程接口.html",
    "revision": "b33ca20c44b1f2b51dc907e5f3dec76a"
  },
  {
    "url": "java/语法.html",
    "revision": "e54608e6f2742b297261a528832d6360"
  },
  {
    "url": "java/面向对象.html",
    "revision": "2fffa9fe44bf76b9e3b6321eb34177c1"
  },
  {
    "url": "kotlin/index.html",
    "revision": "d94f82709a6b62b8f25f75c62ff4582c"
  },
  {
    "url": "math/index.html",
    "revision": "889fae26a1c30d9d358a6718c947e8d8"
  },
  {
    "url": "math/多元函数微分学.html",
    "revision": "61b569a963be34cbd63ac26efc4a4715"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "85a82bfd19fc3d2093d1785b1e6b758a"
  },
  {
    "url": "software-engineering/软件过程.html",
    "revision": "e859fcc2f94a3c6b0c561d811b325981"
  },
  {
    "url": "spring/index.html",
    "revision": "7257a6e13152c42e259187db31787637"
  },
  {
    "url": "tittle-tattle/Computing Machinery and Intelligence By A. M. Turing.html",
    "revision": "feebb300939c16404c9e8cac5aa49660"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "4690865c7e0d695b4858336c37cb3705"
  },
  {
    "url": "tittle-tattle/关于Java编程部分的文章.html",
    "revision": "a53c0eb46eacf6833ab21742267356c8"
  },
  {
    "url": "tittle-tattle/学术研究的正确姿势.html",
    "revision": "6f89d69d60122ae6f078da83ced59fb5"
  },
  {
    "url": "tittle-tattle/新年快乐！.html",
    "revision": "b1892d52e320a9e84d252cbb65083c01"
  },
  {
    "url": "web/index.html",
    "revision": "870a10334c7a9b25e53f2490c9f81033"
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
