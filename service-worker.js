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
    "revision": "5d7f3b8b2f6363bafc36e1e3279ad242"
  },
  {
    "url": "about/index.html",
    "revision": "eb90a68affea00a49e332b5d0221b993"
  },
  {
    "url": "assets/css/0.styles.92f8af09.css",
    "revision": "b5284a60dc3ec41b684e227b68b490c4"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.0ff24d56.js",
    "revision": "81f1c2221b8cea1b10e5f49608153734"
  },
  {
    "url": "assets/js/11.fd2782a8.js",
    "revision": "99d83eeac20546f43c79d2b148da6e22"
  },
  {
    "url": "assets/js/12.61751d02.js",
    "revision": "9c50a8101f4c1531df43cbcd650d4909"
  },
  {
    "url": "assets/js/13.cd217561.js",
    "revision": "9107bfcadc0a3e1e6ea7f1dd87134c11"
  },
  {
    "url": "assets/js/14.bb9309e3.js",
    "revision": "9ce7934fca701f70c7bb5de8b78dbf9e"
  },
  {
    "url": "assets/js/15.ac550edd.js",
    "revision": "57574b8a72e3db6d96b01e362559fee6"
  },
  {
    "url": "assets/js/16.ff30beea.js",
    "revision": "e5f086efe97b7bf9db1e9ceeb0273e24"
  },
  {
    "url": "assets/js/17.2b3a944a.js",
    "revision": "4e848594a0b38c2e91bd964759da5c3b"
  },
  {
    "url": "assets/js/18.e218ce56.js",
    "revision": "bbfea15db90546820a65711dd3252d3a"
  },
  {
    "url": "assets/js/19.8e0a3cde.js",
    "revision": "1f58043e6bc44cfe5724c8fdb940c98b"
  },
  {
    "url": "assets/js/20.23640db6.js",
    "revision": "62fbd74be708cc6b8fa2f11c9db43165"
  },
  {
    "url": "assets/js/21.f459e9f1.js",
    "revision": "be61e06e7572e679bbe13f0006e5904c"
  },
  {
    "url": "assets/js/22.79eabdfd.js",
    "revision": "805511c18ddccc2f91f01f7b586c8a37"
  },
  {
    "url": "assets/js/23.f139fd32.js",
    "revision": "09a7dc2f7f26e58f3e9b846780956980"
  },
  {
    "url": "assets/js/24.b1497be8.js",
    "revision": "84171a4ee838c56aede2ab03b5cfa676"
  },
  {
    "url": "assets/js/25.11575f47.js",
    "revision": "b3f7c84b6161ff844e71a97db20b6202"
  },
  {
    "url": "assets/js/26.8e82297b.js",
    "revision": "7889abac45c2059083850c44bfb1f0b3"
  },
  {
    "url": "assets/js/27.91811c06.js",
    "revision": "b6f528c7ba79cd290879ae5da2fbdad4"
  },
  {
    "url": "assets/js/28.ccc75c4a.js",
    "revision": "0167e5fc595ae40621c6916bfa24248a"
  },
  {
    "url": "assets/js/29.989d7ad6.js",
    "revision": "2870438f53d60bfd4f499fa90af25bb2"
  },
  {
    "url": "assets/js/3.eb9d8409.js",
    "revision": "5ea5378b14ee991bde3fc267a0a69cfe"
  },
  {
    "url": "assets/js/30.623049a2.js",
    "revision": "9440299ec3d5862d1a409742c3236cf0"
  },
  {
    "url": "assets/js/31.80b6be2f.js",
    "revision": "e51706e34a9b220f81d05d1957e83f53"
  },
  {
    "url": "assets/js/32.247d6192.js",
    "revision": "7844cbaad52344e4452e501725058f34"
  },
  {
    "url": "assets/js/33.124624f7.js",
    "revision": "6ae1f9142f4f11aaa8269d90d07c462f"
  },
  {
    "url": "assets/js/34.423f75fd.js",
    "revision": "060a55710a56007a6c80f97c2c42e44a"
  },
  {
    "url": "assets/js/35.eebd5f31.js",
    "revision": "44f1dbb5675fe020ee4955dede248fd5"
  },
  {
    "url": "assets/js/36.9619d24b.js",
    "revision": "546a7bd08e580b899aa3537a53cd11b1"
  },
  {
    "url": "assets/js/37.2c7a528b.js",
    "revision": "3d7ba7edd62be6402458ff801aeab63a"
  },
  {
    "url": "assets/js/38.8750133e.js",
    "revision": "8c17d697ee33b39a1da906ecd1f53167"
  },
  {
    "url": "assets/js/39.0e713662.js",
    "revision": "a8534f9d88bf5c663af6840735609123"
  },
  {
    "url": "assets/js/4.c0313ddb.js",
    "revision": "acdfa1a4ed15cb8b2a54613637e7ba61"
  },
  {
    "url": "assets/js/5.4425da62.js",
    "revision": "413a4c63a5a741761ea980e0eb07d089"
  },
  {
    "url": "assets/js/6.9bcae24e.js",
    "revision": "03e368853e7c251d0e97f5916e010c98"
  },
  {
    "url": "assets/js/7.1104795e.js",
    "revision": "7772191eee77d8b5c8b63ff939e3e9ef"
  },
  {
    "url": "assets/js/8.3a34a10b.js",
    "revision": "7be9a0b1f33a32ad30534ecd4b907d8d"
  },
  {
    "url": "assets/js/9.f1bd8586.js",
    "revision": "6e1c1e4aa66652bde6b71dcf0a1e5a2f"
  },
  {
    "url": "assets/js/app.bcc5c163.js",
    "revision": "359aeb70230f3c00e5926e1d401264f2"
  },
  {
    "url": "assets/js/vendors~flowchart.552ed627.js",
    "revision": "9388112f8736a5d2ede9ce9e0518d54d"
  },
  {
    "url": "big-data/index.html",
    "revision": "15be29584730a9488632a718f3c43f73"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "fdb05a20b7fb322715feacba0b564091"
  },
  {
    "url": "c/index.html",
    "revision": "6b8d503629f354cf23543924b11c3231"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "ace063a4bfe5086c8eeffbc48e3ec8d5"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "b27a8534cc7d0094f7e4fa74c2674013"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "front-end/index.html",
    "revision": "10592e1f82f39fc585b958e3efd05f77"
  },
  {
    "url": "hello-world/about-the-article-of-java.html",
    "revision": "bf5da329e494e8e2e7f0863552424a38"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "f8b8f4882434bc38548d13b2c5ad96b5"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "3495bcd3572361c4a81a78258849e89e"
  },
  {
    "url": "hello-world/index.html",
    "revision": "f72879e38f2795ae7c08a589a480adba"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "19e27e20ef999e48b053549a7a14b403"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "1e7682fec8eef841530d0edd313d0d6a"
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
    "url": "img/updateREADME.png",
    "revision": "bb76cb7e383ef9392104c283ed91e2c5"
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
    "revision": "8f40087b29d5083617cc2b9d4109d535"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "e40bc56c3ae5df2f579f7f529101d1ea"
  },
  {
    "url": "java/API-io.html",
    "revision": "1c29e741f366b65784c41e1f8dc52c82"
  },
  {
    "url": "java/API-lang.html",
    "revision": "6fdaa37c45b885ac1b3376cf1a177537"
  },
  {
    "url": "java/API-util.html",
    "revision": "e0b5aae7b737441192f116120deb604b"
  },
  {
    "url": "java/grammars.html",
    "revision": "12497690a7128b8adad6e6d24beb0907"
  },
  {
    "url": "java/index.html",
    "revision": "081ac14d512bd39e0d7df3458f4263fe"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "76b1ee03899cab96cf777794aa05965c"
  },
  {
    "url": "kotlin/index.html",
    "revision": "fc3145cea4b6595e4eb9a8bf3cd6962a"
  },
  {
    "url": "math/index.html",
    "revision": "e38aeb824d5f9cb72af80c1c5f8d0f9a"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "fa9a0fbb9e63d93009551bb7ef2fad3a"
  },
  {
    "url": "python/grammar.html",
    "revision": "62acfc3fa31b29a4c6dbfca96aaef666"
  },
  {
    "url": "python/index.html",
    "revision": "ff31820c1640f735cac9585bae78d182"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "89c26392ec53edc78262bfcb72a820b2"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "5e954ee558a8b2f5af05c2cfcdf0b7cb"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "f748d5e9bf7a07eb9dd3a2007064452c"
  },
  {
    "url": "spring/index.html",
    "revision": "0da1fe466831e457691dde76e2ff5c31"
  },
  {
    "url": "web/HTTP.html",
    "revision": "6c7b850bc99b06ff3851fe982b90c563"
  },
  {
    "url": "web/index.html",
    "revision": "6970c199d06b3c6c260fc80c00e2a2a0"
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
