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
    "revision": "cf9efee894f369905e5c3c7f82475f04"
  },
  {
    "url": "about/index.html",
    "revision": "e998d55011b3e28c042998a5a605e77e"
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
    "url": "assets/js/10.b5aecce7.js",
    "revision": "74908a7a4d957d374f28b01bf44efe19"
  },
  {
    "url": "assets/js/11.e7bd29d3.js",
    "revision": "1595a404090e1d0e14825776104c2ec8"
  },
  {
    "url": "assets/js/12.d53801d4.js",
    "revision": "7450b5f8865ffb802415995ce04608a3"
  },
  {
    "url": "assets/js/13.b0b1f4f0.js",
    "revision": "4228b4331172feb1147718ae5569366f"
  },
  {
    "url": "assets/js/14.47199d77.js",
    "revision": "b76aaa092305247b04dabeac79a7bf58"
  },
  {
    "url": "assets/js/15.ac550edd.js",
    "revision": "57574b8a72e3db6d96b01e362559fee6"
  },
  {
    "url": "assets/js/16.9c9a50e0.js",
    "revision": "c8edb20744411d9afac4281f69ccadfa"
  },
  {
    "url": "assets/js/17.de9b75a9.js",
    "revision": "f4916f6736ef4e680fa9870087b2a3b9"
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
    "url": "assets/js/20.3a793dd7.js",
    "revision": "a7bd86efe83366d8b200d956f2ae8673"
  },
  {
    "url": "assets/js/21.a49487b0.js",
    "revision": "15428fc71ffca74f0ee13abc21f50429"
  },
  {
    "url": "assets/js/22.79eabdfd.js",
    "revision": "805511c18ddccc2f91f01f7b586c8a37"
  },
  {
    "url": "assets/js/23.34958e0b.js",
    "revision": "a45cf186de56f13bfa4908e0f84248ba"
  },
  {
    "url": "assets/js/24.50376494.js",
    "revision": "a6eaa9a0bdb38ce5408f0851ace65b54"
  },
  {
    "url": "assets/js/25.0d601bd4.js",
    "revision": "f3605178ebd9558c6f993d6626a0f4da"
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
    "url": "assets/js/28.eb6d661c.js",
    "revision": "df9062fdad1d4cbbe59f01aeaaa8665d"
  },
  {
    "url": "assets/js/29.fa6836bd.js",
    "revision": "197b5e80bf035fe2bccafb15deeb075d"
  },
  {
    "url": "assets/js/3.5a45c147.js",
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
    "url": "assets/js/32.d9ecbf78.js",
    "revision": "054309d55fc34850deb4a782997187ba"
  },
  {
    "url": "assets/js/33.5c5c40bb.js",
    "revision": "5d74ac1cd25c6e16aaaa53b051dfaa35"
  },
  {
    "url": "assets/js/34.b0fa043f.js",
    "revision": "ef8f01ede16f6476132c302ca29e82b5"
  },
  {
    "url": "assets/js/35.eebd5f31.js",
    "revision": "44f1dbb5675fe020ee4955dede248fd5"
  },
  {
    "url": "assets/js/36.022457af.js",
    "revision": "f64d7947d089581665fd2592333d6eb7"
  },
  {
    "url": "assets/js/37.01598138.js",
    "revision": "35c3a59437c1e8e8c3690bafda809773"
  },
  {
    "url": "assets/js/38.6f42647d.js",
    "revision": "e4581dadba4d26a7a560b8dc4ec9af97"
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
    "url": "assets/js/8.6d044f50.js",
    "revision": "38dcc22b5877b1291632cbc60046029d"
  },
  {
    "url": "assets/js/9.0fc7e92b.js",
    "revision": "1e44f2b0199a32d670cb0fd40935dc17"
  },
  {
    "url": "assets/js/app.e9b1ed50.js",
    "revision": "32f454c1ff5ef3632cc78d6f692a9774"
  },
  {
    "url": "assets/js/vendors~flowchart.552ed627.js",
    "revision": "9388112f8736a5d2ede9ce9e0518d54d"
  },
  {
    "url": "big-data/index.html",
    "revision": "d9e666dd102f5714c4420a40c8ce2002"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "d100e0831db7fde9bbd8ef2501170e47"
  },
  {
    "url": "c/index.html",
    "revision": "0a65cbd812435701e8a848328a4d335f"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "61cb4d35b82f39a9b02e7ce044dc32e4"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "a29bccd90aa1b8ecd52a87f609b503a9"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "front-end/index.html",
    "revision": "2e60b04ae28e693ad8369c78a6754d02"
  },
  {
    "url": "hello-world/about-the-article-of-java.html",
    "revision": "70c0937f5a405e62928933f903e7571d"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "b120e0ac32b7183f26c06bed53f4720a"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "02f3e7beaa04ee86f69481ce66dce8f8"
  },
  {
    "url": "hello-world/index.html",
    "revision": "5a78d47dae8500a3664cdd181eddbc5f"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "89b115fb7a049d8ca3c237d1afae742f"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "355773449ae92a49cbf03f136ebb1141"
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
    "revision": "45a91a9518e49995322e9cf8db460c15"
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
    "revision": "d3ebd04d21e95829b6da30f129e3a666"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "c13c637e8de962c34d8f93c0e6413441"
  },
  {
    "url": "java/API-io.html",
    "revision": "5b761ffe3db8159888ea244b5497b0f3"
  },
  {
    "url": "java/API-lang.html",
    "revision": "fd25647616e24f6d6a9512174c09afe9"
  },
  {
    "url": "java/API-util.html",
    "revision": "8aa2ebe93a78da508eb464d5c355ddf5"
  },
  {
    "url": "java/grammars.html",
    "revision": "0f75e13b8af6927b8e2ca48c0d101a84"
  },
  {
    "url": "java/index.html",
    "revision": "573b5ba05f1a66e925aa9c7644487a0b"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "779d21afc9ce38ceaa6b8b77bd7a3643"
  },
  {
    "url": "kotlin/index.html",
    "revision": "2c37d37b3307d7ad4638719092f4dbc8"
  },
  {
    "url": "math/index.html",
    "revision": "0ce6bfda92843ef74079a769fea75b4f"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "f6c0e0b61694d0d72ed13ed43f20eeeb"
  },
  {
    "url": "python/grammar.html",
    "revision": "1d258f618ab835a558835d2ac38ae260"
  },
  {
    "url": "python/index.html",
    "revision": "fbbab0b8c82edcbd476f356ee79d48b6"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "e5e7c26b6f844ea3b17de02cc8b1fa09"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "04f7415bbf84a7c86eee11a4bcd9e929"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "039bd423fb4f1dab8d27ec589b1e7c00"
  },
  {
    "url": "spring/index.html",
    "revision": "775fc3fde4511a4ecb8d522e415fe00b"
  },
  {
    "url": "web/HTTP.html",
    "revision": "55da8e147a10ed407c499a93b1024884"
  },
  {
    "url": "web/index.html",
    "revision": "281c83f99d2c3776ff5d8760ed96b1d6"
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
