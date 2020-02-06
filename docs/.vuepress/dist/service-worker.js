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
    "revision": "be3a17418fb4d9623bde3787343babe3"
  },
  {
    "url": "about/index.html",
    "revision": "499a80f72f4f9207258f7cb2fd5a47aa"
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
    "url": "assets/js/10.4b667d6a.js",
    "revision": "09742476408584ecf54384b0b59b9b03"
  },
  {
    "url": "assets/js/11.7fe32825.js",
    "revision": "35785670e503a7fe65e95977513ca068"
  },
  {
    "url": "assets/js/12.42441efc.js",
    "revision": "193c41d96f1192581feea3e5b23787cb"
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
    "url": "assets/js/21.8aa9dacc.js",
    "revision": "8f8635460c2790755db6a42281e60bca"
  },
  {
    "url": "assets/js/22.7e1b0ec3.js",
    "revision": "004d7bd2f2ae90ab5e3a3b81359fe899"
  },
  {
    "url": "assets/js/23.69fe7292.js",
    "revision": "b081cb12be723cb5473572a513df248b"
  },
  {
    "url": "assets/js/24.6cdcb491.js",
    "revision": "b023ef2d61a2ae378c07de0ea77351e7"
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
    "url": "assets/js/3.9f3b2b40.js",
    "revision": "dd897e429b332b026a9e25366971490a"
  },
  {
    "url": "assets/js/30.a84d5f74.js",
    "revision": "5b92a96a4c0bf778724c5ceb2c6312c0"
  },
  {
    "url": "assets/js/31.12e135d1.js",
    "revision": "1e6b5de1deb7399ba04372397fb50c9e"
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
    "url": "assets/js/9.680b0c39.js",
    "revision": "f122eacb2416636fd370b3379a78e4ca"
  },
  {
    "url": "assets/js/app.390df4af.js",
    "revision": "a46226f8aecdec1d0e2bd4a14432f717"
  },
  {
    "url": "big-data/index.html",
    "revision": "343a223aebe2bb2d224b13dcc1fab4ef"
  },
  {
    "url": "c/index.html",
    "revision": "a32e265b9870ffd6ca3f226943513b8d"
  },
  {
    "url": "c/常量、变量与数据类型.html",
    "revision": "971c204f4b6693b850ca87d17d9380e3"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "a259d5e331487b1d3c612d70c460b968"
  },
  {
    "url": "front-end/index.html",
    "revision": "1628eabcc10a1937d2ab1d0c27000d06"
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
    "revision": "0e2de931e1bd6aac9b4e6d6a2cd214b3"
  },
  {
    "url": "java/API-工具类库.html",
    "revision": "b6c5bf44c0bd69b58af08670f9fd01a5"
  },
  {
    "url": "java/API-语言基础类库.html",
    "revision": "9dbb5118ba5c23ce838ca40b6e992aed"
  },
  {
    "url": "java/API-输入输出类库.html",
    "revision": "483e6465c8276c611a87c1a9d3c6dbb2"
  },
  {
    "url": "java/index.html",
    "revision": "06118dfe4a9f7ca80455eac0e8ad249f"
  },
  {
    "url": "java/应用程序编程接口概述.html",
    "revision": "529096b769dc6033bc88089dc88e071e"
  },
  {
    "url": "java/语法.html",
    "revision": "d767c6e6176df09f958bb867bfa6c8ed"
  },
  {
    "url": "java/面向对象.html",
    "revision": "b81f6ff25c5a890a44ad25a7d10ed85d"
  },
  {
    "url": "kotlin/index.html",
    "revision": "7c820e95bee2a6afb1c1ec05e3a6892c"
  },
  {
    "url": "math/index.html",
    "revision": "796cdd4261180d7dd020790ebde0c612"
  },
  {
    "url": "math/多元函数微分学.html",
    "revision": "48104e3797fd69822b1b3b331d76a2c8"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "31ef3bde8235978c9ef1a0805b57fda0"
  },
  {
    "url": "software-engineering/软件过程.html",
    "revision": "d43e7f6fa1c213f3d197e4bb7074fdf6"
  },
  {
    "url": "spring/index.html",
    "revision": "c49f9bf84f62a23b7d6a84b8b9b43239"
  },
  {
    "url": "tittle-tattle/Computing Machinery and Intelligence By A. M. Turing.html",
    "revision": "d3d983c9c2af5ea43713c8a051342aa1"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "b292249f1389606b0af599f626327f8b"
  },
  {
    "url": "tittle-tattle/关于Java编程部分的文章.html",
    "revision": "974f25ccda1326262cbe25e9b8cec547"
  },
  {
    "url": "tittle-tattle/学术研究的正确姿势.html",
    "revision": "d9de7e9c50ec7e18ea940c44b35b8857"
  },
  {
    "url": "tittle-tattle/新年快乐！.html",
    "revision": "5ff2de470b337e887ddb02500f817288"
  },
  {
    "url": "web/index.html",
    "revision": "98a22ede3b4a487ddf914a5818a232ac"
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
