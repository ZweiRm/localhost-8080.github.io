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
    "revision": "73515fa3e9d4e7d0176d0d43ddb21fa1"
  },
  {
    "url": "about/index.html",
    "revision": "6b9366995fdcb0bcc41a9560549fa941"
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
    "url": "assets/js/10.1924cf94.js",
    "revision": "c76800c1dfa9a75bd88853ad08165e08"
  },
  {
    "url": "assets/js/11.1a317ed8.js",
    "revision": "e45471c0a2cd6a5d5336cc653d3dcde4"
  },
  {
    "url": "assets/js/12.7573fb73.js",
    "revision": "8eb6c4d30067de1d50e0309748d26358"
  },
  {
    "url": "assets/js/13.dd63e5fd.js",
    "revision": "24b0cf657ef27f8a441ee60aa06f3d4e"
  },
  {
    "url": "assets/js/14.0b3d7a6f.js",
    "revision": "6e483c5f781313e4979017e6e7a34c17"
  },
  {
    "url": "assets/js/15.93b8295a.js",
    "revision": "e5ffbdc5cd941c2cc9e6d10658715242"
  },
  {
    "url": "assets/js/16.71520c10.js",
    "revision": "51f255ed5387da5f1302043cc809cb79"
  },
  {
    "url": "assets/js/17.bcdf9f9d.js",
    "revision": "e5f4c20f8291cf4a96069fd5644e6462"
  },
  {
    "url": "assets/js/18.3fe0f2f7.js",
    "revision": "7d6d5e44493f6b366b7003b66d1e4dcc"
  },
  {
    "url": "assets/js/19.0154e1d5.js",
    "revision": "942ac4c3d61d3c32f8f9cfe33ba49cd2"
  },
  {
    "url": "assets/js/2.476d463f.js",
    "revision": "200b953f54917daaab73b1e641ce5b59"
  },
  {
    "url": "assets/js/20.9b0bf4a3.js",
    "revision": "62205aaecdb025e968fc863b25dca072"
  },
  {
    "url": "assets/js/21.b2812dee.js",
    "revision": "ff96a3ee7bcfe262fb4e13e652a08a20"
  },
  {
    "url": "assets/js/22.0d2877af.js",
    "revision": "77d2d78e7b344179ea58723ba553637e"
  },
  {
    "url": "assets/js/23.5ed60466.js",
    "revision": "849507d0c3727ba0fe480eea8a3f9650"
  },
  {
    "url": "assets/js/24.0755be55.js",
    "revision": "8cd404d0708babe29b867c95dd6d3777"
  },
  {
    "url": "assets/js/25.53b5fb0d.js",
    "revision": "a8d53beddc5f2ee86648e8b71a21eba4"
  },
  {
    "url": "assets/js/26.62f5494e.js",
    "revision": "7eb4a30626c64c6c72bcef972cc01d13"
  },
  {
    "url": "assets/js/27.b6a4be19.js",
    "revision": "bafc5aecaf5e18d41c1a19ff963f106b"
  },
  {
    "url": "assets/js/28.aba453ca.js",
    "revision": "a522c32a955acab113a914e57cd6546b"
  },
  {
    "url": "assets/js/29.ca26ba96.js",
    "revision": "e4bc4d279ca9e584a1caa38f0a1f8504"
  },
  {
    "url": "assets/js/3.343162a5.js",
    "revision": "62f17c742ed85a3b9d39cadfc5a668f9"
  },
  {
    "url": "assets/js/30.c3c2b63d.js",
    "revision": "a27ea59a44d4cf7f4c3744e557856811"
  },
  {
    "url": "assets/js/31.11a6659e.js",
    "revision": "bac9ad400a465dfc5c95c98de7677059"
  },
  {
    "url": "assets/js/32.8d99c490.js",
    "revision": "bc642c8168c4e31956b80523ae0e84d3"
  },
  {
    "url": "assets/js/4.bed6244b.js",
    "revision": "c1c09c7dd3666693cfcd949dcaeb8d95"
  },
  {
    "url": "assets/js/5.095b0e20.js",
    "revision": "50a8bb7a9e49ded37133bd7eac365995"
  },
  {
    "url": "assets/js/6.1d612fec.js",
    "revision": "ce1cda7c35b8db0f25a91dab45127a17"
  },
  {
    "url": "assets/js/7.6ae51ed2.js",
    "revision": "076a79482c2a78eb9a381d2e591453f8"
  },
  {
    "url": "assets/js/8.de234edd.js",
    "revision": "80536120064cfc0403f22be487f75be6"
  },
  {
    "url": "assets/js/9.8e5634fa.js",
    "revision": "d68b849a14ffc8e50f8215c9630bbe6d"
  },
  {
    "url": "assets/js/app.3ba8d023.js",
    "revision": "06afec90ba929009eb4987277434c22b"
  },
  {
    "url": "big-data/index.html",
    "revision": "0ed7a6c65d7e5401df3e451dad13ceb1"
  },
  {
    "url": "c/index.html",
    "revision": "c3d608afb6c0273615c1be7ecfc75c2b"
  },
  {
    "url": "c/常量、变量与数据类型.html",
    "revision": "4282065aab2750020954c94749f967da"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "07c52c2f2058f00b17c60b7054013888"
  },
  {
    "url": "front-end/index.html",
    "revision": "1363759b735193adc6a439c4894908d4"
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
    "revision": "4e79c77c5ba46753be88f4c2d2c8deaa"
  },
  {
    "url": "java/API-工具类库.html",
    "revision": "cbaba905802f31fe72236d24330f2aa8"
  },
  {
    "url": "java/API-语言基础类库.html",
    "revision": "885debf2428960fc875149a86bae943c"
  },
  {
    "url": "java/API-输入输出类库.html",
    "revision": "dfcf285b1ba7672c7e16dce2bdcf6267"
  },
  {
    "url": "java/index.html",
    "revision": "65f611bfe6214136649407a3d9682fcd"
  },
  {
    "url": "java/应用程序编程接口概述.html",
    "revision": "a9e6a6200b5ff75bfa5dbdc5947f7cae"
  },
  {
    "url": "java/语法.html",
    "revision": "ed77d9ffd414b89b029c09aa5d071739"
  },
  {
    "url": "java/面向对象.html",
    "revision": "c1386b41742143d2428979237b18ada9"
  },
  {
    "url": "kotlin/index.html",
    "revision": "376594d6f350e152855b58807ff86425"
  },
  {
    "url": "math/index.html",
    "revision": "9ce9ee48ac3e6eb77abbc3f47d6274ac"
  },
  {
    "url": "math/多元函数微分学.html",
    "revision": "857e22b0fc1137180d57c567c3d0c499"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "e0100bdc1512c57c0e299c2d8ef581d4"
  },
  {
    "url": "software-engineering/软件过程.html",
    "revision": "37d89e30221a1b060d2742c6d963275f"
  },
  {
    "url": "spring/index.html",
    "revision": "e48399a3603c2a85516fc826d7fe52a4"
  },
  {
    "url": "tittle-tattle/Computing Machinery and Intelligence By A. M. Turing.html",
    "revision": "7567cefd68bcd74225d1111412d0092f"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "287c106902fe59ccd5ed48f2a80e3977"
  },
  {
    "url": "tittle-tattle/关于Java编程部分的文章.html",
    "revision": "027e2391dbffa9bf93877b89fdba6340"
  },
  {
    "url": "tittle-tattle/学术研究的正确姿势.html",
    "revision": "0772bd8184f44924c7762d62192c67b2"
  },
  {
    "url": "tittle-tattle/新年快乐！.html",
    "revision": "1c436df8e6f1fa2b095053f60259ca1a"
  },
  {
    "url": "web/index.html",
    "revision": "0a72c0eea63c0ba7e1ed3749e995a258"
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
