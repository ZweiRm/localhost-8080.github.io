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
    "revision": "47809f645e451e62256f6cbb46e67281"
  },
  {
    "url": "about/index.html",
    "revision": "79a06d4c7c305e9b19f1a47c8b1b6cb5"
  },
  {
    "url": "assets/css/0.styles.eaee3f53.css",
    "revision": "e76466ddaf392c1bbbc7727aa923aa80"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.33e7aa58.js",
    "revision": "a7a6b059cc3931e77d0ecd472d50e519"
  },
  {
    "url": "assets/js/11.c51f7743.js",
    "revision": "c48b3c27e136a4b0f305a0481210803f"
  },
  {
    "url": "assets/js/12.c1f8ca16.js",
    "revision": "45a48716e519048cc33e0c469bee31da"
  },
  {
    "url": "assets/js/13.858a4a84.js",
    "revision": "828aed4b2cd0a4a74bcb59481af0f246"
  },
  {
    "url": "assets/js/14.35f05375.js",
    "revision": "3de06672707f7712787f83b4eacf24d4"
  },
  {
    "url": "assets/js/15.1970bbda.js",
    "revision": "e0bb61f8afc0298629f619ccf2a8dc92"
  },
  {
    "url": "assets/js/16.9d12003f.js",
    "revision": "7659057a26de11401f94f1a40fd72232"
  },
  {
    "url": "assets/js/17.3531a0aa.js",
    "revision": "4e625bde29cedddf3fb74f89cf6b666c"
  },
  {
    "url": "assets/js/18.8fd8ea27.js",
    "revision": "f8e72bac21c917c54face3595464994b"
  },
  {
    "url": "assets/js/19.8fa8d314.js",
    "revision": "673a3424505cb15e7278cf82d75236b0"
  },
  {
    "url": "assets/js/2.95f7aeec.js",
    "revision": "6f970957c3e11ce516cc6990364fce47"
  },
  {
    "url": "assets/js/20.73f8d16f.js",
    "revision": "9b76f05d575776819e3a835e7782ca76"
  },
  {
    "url": "assets/js/21.6d602679.js",
    "revision": "afedd53fdd4dee21200bdf5001a123c7"
  },
  {
    "url": "assets/js/22.035159ad.js",
    "revision": "4ba7e71cc1bb61036ab64d795629c3d0"
  },
  {
    "url": "assets/js/23.3a21b6cf.js",
    "revision": "0b5e0bffb4443cf027a57516ec5bb96a"
  },
  {
    "url": "assets/js/24.133f7b84.js",
    "revision": "ffe7b2878b0fc2acbbfcec20ceba7c3f"
  },
  {
    "url": "assets/js/25.a87efbf0.js",
    "revision": "44e87e85ef70a6b971d909f8f954f5c5"
  },
  {
    "url": "assets/js/26.2bb50e18.js",
    "revision": "3e6f1da296cda0087b238b5f1e39e49f"
  },
  {
    "url": "assets/js/3.65078ec3.js",
    "revision": "884308f991ecd5cca07777b7dedb5188"
  },
  {
    "url": "assets/js/4.a89e10f0.js",
    "revision": "30b5efec6b7bda87bdeefe3b724fb221"
  },
  {
    "url": "assets/js/5.01a0765a.js",
    "revision": "a94195f9b95f458335db619287f16c07"
  },
  {
    "url": "assets/js/6.fda93e83.js",
    "revision": "0733c9b58e90b44824e6f601f22c8db2"
  },
  {
    "url": "assets/js/7.7285d2b0.js",
    "revision": "f960984907a2b54b425fac930a645603"
  },
  {
    "url": "assets/js/8.482ec3ac.js",
    "revision": "9c00f9a3b5e5f12ee2ee4e11077ff007"
  },
  {
    "url": "assets/js/9.cee92a7b.js",
    "revision": "1d1b391880529adadfeebc5fb51000ca"
  },
  {
    "url": "assets/js/app.e18cb0d0.js",
    "revision": "a39b6deb9ac3a9853579fb2524a7e500"
  },
  {
    "url": "big-data/index.html",
    "revision": "3f9224ab1eab318f950601c5a111edf3"
  },
  {
    "url": "c/index.html",
    "revision": "b76e5a15cffb0787f60b9794fbef069b"
  },
  {
    "url": "c/常量、变量与数据类型.html",
    "revision": "0685b7992cfeaa53f64e5629e297cec6"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "5cd152ad1909e2cd213f2d48c00be5e1"
  },
  {
    "url": "front-end/index.html",
    "revision": "05baae387c84c173b3fcdffd87ffe729"
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
    "revision": "a0721d77abfcaed46e4cae0b08f85f4b"
  },
  {
    "url": "java/index.html",
    "revision": "8028a6dbc7829f52b500adcdeb4c1d6b"
  },
  {
    "url": "java/应用程序编程接口.html",
    "revision": "be9aed1668e25b98462d00d1d16b9896"
  },
  {
    "url": "java/语法.html",
    "revision": "1f522204586e8d4bd9237a887f39bacc"
  },
  {
    "url": "java/面向对象.html",
    "revision": "0f48c39f57c061813763e9093f4c6269"
  },
  {
    "url": "kotlin/index.html",
    "revision": "58fd338512d6673bf50aefe52a9b4ce2"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "5a290abcfac0438a226b244c46bba668"
  },
  {
    "url": "software-engineering/软件过程.html",
    "revision": "4cc561ff6c0222ea3830221c6362ad64"
  },
  {
    "url": "spring/index.html",
    "revision": "418439edae322b88337ffeb7230abea7"
  },
  {
    "url": "tittle-tattle/Computing Machinery and Intelligence By A. M. Turing.html",
    "revision": "458dcbbb480fe0a854d66487df9b5117"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "ad09ecda31a64d09d856c6deb061c174"
  },
  {
    "url": "tittle-tattle/关于Java编程部分的文章.html",
    "revision": "e46949e87a533508db186fda946d5d4c"
  },
  {
    "url": "tittle-tattle/新年快乐！.html",
    "revision": "476f10b5433a27e3a9ea50ea3127e5d9"
  },
  {
    "url": "web/index.html",
    "revision": "7e671dc996dee2bb38d390d7890e4b06"
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
