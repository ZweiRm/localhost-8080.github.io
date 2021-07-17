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
    "revision": "506499276bdf246b9a169cdbd8fcd6fc"
  },
  {
    "url": "about/index.html",
    "revision": "bd57cd515c929c5eabcb47c9bdb0fede"
  },
  {
    "url": "artificial-intelligence/index.html",
    "revision": "4a4ae660aab213db28e5bcf54e62c536"
  },
  {
    "url": "artificial-intelligence/search-strategies.html",
    "revision": "16032510ff35b7c1ec98773cb3f7dbbd"
  },
  {
    "url": "assets/css/0.styles.d716ed5b.css",
    "revision": "fde7e2f518fd8c375ccc7538e4fe283b"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.e547df83.js",
    "revision": "e40d498b0cd1dd586ba1636937bb9176"
  },
  {
    "url": "assets/js/11.b6ccb910.js",
    "revision": "57bd817904d08ff2ceebfd7ac8077599"
  },
  {
    "url": "assets/js/12.6a59a495.js",
    "revision": "ba089e88c7db2c6c1e5b37626f8cce38"
  },
  {
    "url": "assets/js/13.02c2adaa.js",
    "revision": "4dfdd7a8e82f6a06254aac7b9cbf139d"
  },
  {
    "url": "assets/js/14.98d042d4.js",
    "revision": "fc55c982b97529ab8d576b08bf25fd6d"
  },
  {
    "url": "assets/js/15.4dabac79.js",
    "revision": "23da9e883782e566835df0f3764c8ebb"
  },
  {
    "url": "assets/js/16.e71109c0.js",
    "revision": "70e42901a35350a7e4f08656d0da4059"
  },
  {
    "url": "assets/js/17.b784a19f.js",
    "revision": "001cffd38f52e0b7a30f65e26881a687"
  },
  {
    "url": "assets/js/18.aa465e7b.js",
    "revision": "dd16c538a282b4d719e1ceff7aef131f"
  },
  {
    "url": "assets/js/19.5f90142c.js",
    "revision": "929ffadffe7c498fe17a28a01a4bab56"
  },
  {
    "url": "assets/js/20.cd5c908a.js",
    "revision": "4c2999bb5e6c79a140ad41f8474d5ec3"
  },
  {
    "url": "assets/js/21.dddb662f.js",
    "revision": "69f4802baedf2b1a3bc00abc33476cc7"
  },
  {
    "url": "assets/js/22.3bbf1bb5.js",
    "revision": "683136308b8f43aaf6675ee4a432053e"
  },
  {
    "url": "assets/js/23.b44456dc.js",
    "revision": "079d402f4b5b5c5bbd227998cd74a697"
  },
  {
    "url": "assets/js/24.dbb2546f.js",
    "revision": "6c3326a72a4b061c90783af78bd27fc7"
  },
  {
    "url": "assets/js/25.ce532f90.js",
    "revision": "119197a83932a9dfa65d40cc3ff69528"
  },
  {
    "url": "assets/js/26.5ea60cf1.js",
    "revision": "1f53a77801480fc122ee0b4cef97a7cf"
  },
  {
    "url": "assets/js/27.7d3befe9.js",
    "revision": "204b2f284b7f8e7eabb52728b488129f"
  },
  {
    "url": "assets/js/28.081e4634.js",
    "revision": "a1f59dd55a6e6de4f0089599dd37142e"
  },
  {
    "url": "assets/js/29.4c890e2f.js",
    "revision": "10ddcd88de5f34565dd17cbee59ed2d0"
  },
  {
    "url": "assets/js/3.b9f74d1d.js",
    "revision": "6638c20db36b75c0cc865cdcb01ef546"
  },
  {
    "url": "assets/js/30.216711e7.js",
    "revision": "a9c2a58bf8110a0522e4461a59f4daab"
  },
  {
    "url": "assets/js/31.877d2fc5.js",
    "revision": "471065c7a2ff314656e433496c6e1491"
  },
  {
    "url": "assets/js/32.ecde65fe.js",
    "revision": "f1078d2c0a63fda7a593b7ff32e469cf"
  },
  {
    "url": "assets/js/33.18bfa4d5.js",
    "revision": "631072e9fdc3ba66e7446ee5c014204d"
  },
  {
    "url": "assets/js/34.446de239.js",
    "revision": "7d07da8ec18cec725dc6b4b46b0eec48"
  },
  {
    "url": "assets/js/35.17edb524.js",
    "revision": "58283b241c8285b710eb0f3e5cb50775"
  },
  {
    "url": "assets/js/36.ec6ba9f3.js",
    "revision": "2d96e52f110c46cfa512214c216758b5"
  },
  {
    "url": "assets/js/37.de9ac6bf.js",
    "revision": "f7b5fbd7515016165397dd5644723a37"
  },
  {
    "url": "assets/js/38.a0a79387.js",
    "revision": "a601830fc008adacf034c62e3523d41d"
  },
  {
    "url": "assets/js/39.b9cf2f0f.js",
    "revision": "2e21e61913f058f3de99f172c086d8b1"
  },
  {
    "url": "assets/js/4.7ac6ef6f.js",
    "revision": "926e01ddab5ba004bc0e63cbdb651a33"
  },
  {
    "url": "assets/js/40.d4ffdaec.js",
    "revision": "3758e42ea9211a38f44c25ceaa39feed"
  },
  {
    "url": "assets/js/41.0ec09677.js",
    "revision": "7ca9238c6ac5002fbb3b9cd3170219e0"
  },
  {
    "url": "assets/js/42.361cd342.js",
    "revision": "be5099204bc8a5ef49d3c84fc4b74b15"
  },
  {
    "url": "assets/js/43.6ce19a22.js",
    "revision": "9b1f91785ba86ef47d444440dc655cf8"
  },
  {
    "url": "assets/js/44.f2d9b458.js",
    "revision": "52ab5a19f262421248d961d2141cf96d"
  },
  {
    "url": "assets/js/45.b23d7a68.js",
    "revision": "52ce137036f17ecd730a0bbbc01f0878"
  },
  {
    "url": "assets/js/46.4f5e10b2.js",
    "revision": "02e7b08617669fbbbb1abb72c34e6f9e"
  },
  {
    "url": "assets/js/47.6af760a6.js",
    "revision": "cf91d553417048893f08c3d05c6bda12"
  },
  {
    "url": "assets/js/5.45c57ac7.js",
    "revision": "489719daed47b72d8e6946a0855372a6"
  },
  {
    "url": "assets/js/6.f106da30.js",
    "revision": "38348e105b741216ad4d29e30c0fb9ad"
  },
  {
    "url": "assets/js/7.b05fd197.js",
    "revision": "0afe181fc5a4685f612c83e2cc53a3f6"
  },
  {
    "url": "assets/js/8.601a5407.js",
    "revision": "cc05f9fc8ad9c0933c98787b51d9f772"
  },
  {
    "url": "assets/js/9.c6e20403.js",
    "revision": "23a05e264cb032557e04c313ba3f05c1"
  },
  {
    "url": "assets/js/app.a85bea06.js",
    "revision": "488bb290a994f9a0a6e0a1ebacb294c8"
  },
  {
    "url": "assets/js/vendors~flowchart.46320f95.js",
    "revision": "5c6028461fe34330236dd8250e36e1e9"
  },
  {
    "url": "big-data/index.html",
    "revision": "0cc7565888c4e599c8e368ebb993790d"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "ededcb26df6fa775e19bac15638c4136"
  },
  {
    "url": "c/index.html",
    "revision": "4dc36a43817fa40edb33a450d9a0abf2"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "b95d0d66be93ff908df536c0bb813cc4"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "fed8207983d82c39fcc86173db32683b"
  },
  {
    "url": "deep-learning/python-and-vectorization.html",
    "revision": "50420d837a550287245910cadb0ac6ab"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "front-end/index.html",
    "revision": "2a6dac07668dd59c1fffc3d75701877a"
  },
  {
    "url": "hello-world/about-the-article-of-java.html",
    "revision": "41759681d19b129741936167a9f0855f"
  },
  {
    "url": "hello-world/array-and-linked-list.html",
    "revision": "fe1c88bfc9617759206aaf0b30dafa83"
  },
  {
    "url": "hello-world/binary-search.html",
    "revision": "d2f4371abd69f1576c3f7ae8cb544d50"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "22d67c5b3cfe6c3c38d0c87c5659a732"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "122412100c84efd91c105e383a0b7024"
  },
  {
    "url": "hello-world/index.html",
    "revision": "0944cf6f9a4c72094164ccaf14a205e7"
  },
  {
    "url": "hello-world/setup-a-server-manually.html",
    "revision": "e93d3e97843909f049206b0c4db55262"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "c46632f769d9cd6479d359776106a217"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "838e9611b8831ab45ab62989169d2bf1"
  },
  {
    "url": "img/ahza-white.png",
    "revision": "3c642eba43abc55fb6555dab8d743fcd"
  },
  {
    "url": "img/buildOpt.png",
    "revision": "886f601b0b53e21c83d5cd5028bc63ba"
  },
  {
    "url": "img/C程序的基本结构.jpg",
    "revision": "7a23f1d4d04270c9354597cf2499dee4"
  },
  {
    "url": "img/depthFirstSearch.png",
    "revision": "b9a011eed9b98e99df0bb638ba7aa051"
  },
  {
    "url": "img/githubPages.png",
    "revision": "97c8e590f37706ee70ea0290c6ed9b41"
  },
  {
    "url": "img/gitIgnore.png",
    "revision": "6723b20674aac0d6ce0e5a9846964652"
  },
  {
    "url": "img/gradientDescent_real.svg",
    "revision": "51a27790af79965ce122cdabb3cb8e3e"
  },
  {
    "url": "img/gradientDescent.svg",
    "revision": "bf24d25265d0323034b8e6eda8b47347"
  },
  {
    "url": "img/jetbrains.svg",
    "revision": "48b3f5c87ff00f11d7b0b0fd64fdd12e"
  },
  {
    "url": "img/licence.png",
    "revision": "44c7d2e043428bc130a424d81c2caebc"
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
    "url": "img/LRGD_dz.svg",
    "revision": "bec2bef3f3445f209fff4c4be3ddc3d3"
  },
  {
    "url": "img/LRGD_repeat.svg",
    "revision": "278418edeecbfe1e33a24c921ee1095c"
  },
  {
    "url": "img/LRGDComputationGraph.jpg",
    "revision": "7ad1b57c0d9671cd620e861f825c7194"
  },
  {
    "url": "img/newRepository.png",
    "revision": "20e44f9204eb5b789c6b12a92a168e59"
  },
  {
    "url": "img/newSite.png",
    "revision": "c7bfdd239436a732c8b23014a848029a"
  },
  {
    "url": "img/oNotation.png",
    "revision": "a80c951f7c5bfa62997505d7f686d076"
  },
  {
    "url": "img/sigmoid.jpg",
    "revision": "909136ab97f3aa85e17ff23ddd6f46f6"
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
    "url": "img/tomcat_webapps.jpg",
    "revision": "1c76cd467dad7e9d344fb294ad1db53b"
  },
  {
    "url": "img/uniformCost.png",
    "revision": "d88da5d903fc63f65328677be66c324a"
  },
  {
    "url": "img/updateREADME.png",
    "revision": "bb76cb7e383ef9392104c283ed91e2c5"
  },
  {
    "url": "img/vultr_add_ssh_key.jpg",
    "revision": "02030fb24d62ab5a8d145dce1e32fbfb"
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
    "revision": "e9f28ac0ef3d4075b68d22c4994062b5"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "16caf2de2a209a586234a2bc6f12e979"
  },
  {
    "url": "java/API-io.html",
    "revision": "e7df79b7c691768d7b6efa06bcc93565"
  },
  {
    "url": "java/API-lang.html",
    "revision": "b4d1650fb982123d970d1af792b44e20"
  },
  {
    "url": "java/API-util.html",
    "revision": "f9f8fae1028bd46f1494acd4a81131eb"
  },
  {
    "url": "java/grammars.html",
    "revision": "f6955c797b9aec544c1d4c01f263d5f8"
  },
  {
    "url": "java/index.html",
    "revision": "f331d62b75edf8d91b9b0ac3b77e8675"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "7b7511a514a254c1b0ed5cbc8b99f65e"
  },
  {
    "url": "kotlin/index.html",
    "revision": "3d69cdd142a378a026655c4149529377"
  },
  {
    "url": "math/index.html",
    "revision": "058310798e3d0d2b7a4a962c2f4b1b85"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "2af5467f6b023ab4ee3e940cae7b5136"
  },
  {
    "url": "python/grammar.html",
    "revision": "8ad86e1608c37cf3b9a257f8975133c0"
  },
  {
    "url": "python/index.html",
    "revision": "3cb79d03cc07aa7e1876221ead3c4c44"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "c8e5fddc8a03b423463fcffcff0a73e8"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "f75995d49dcdaf91aed1fc9c821a11da"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "33e337d8098452f970c36db1bc95bb61"
  },
  {
    "url": "spring/index.html",
    "revision": "531203f3b1d4fbb7c475d2e59333dd99"
  },
  {
    "url": "web/HTTP.html",
    "revision": "d32f719928ad157a1687a0629fdbf3d8"
  },
  {
    "url": "web/index.html",
    "revision": "ee62d4bbd0642ac81515b4e1779b3644"
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
