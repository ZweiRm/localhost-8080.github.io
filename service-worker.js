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
    "revision": "b369b070d3c6acabc6576fb2bf8bfe5b"
  },
  {
    "url": "about/index.html",
    "revision": "8f637a6a87af0799632c9d075cd43726"
  },
  {
    "url": "assets/css/0.styles.ff1f9cf9.css",
    "revision": "c48ea4a67e6a14b56acd41aba50ac209"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.0dc9abb7.js",
    "revision": "178b2c22bc438c1b4ba12d26c6db4a8d"
  },
  {
    "url": "assets/js/11.d7fbad31.js",
    "revision": "1a5644afb26c3812df3f96d92c5e129c"
  },
  {
    "url": "assets/js/12.7de9345e.js",
    "revision": "9c50a8101f4c1531df43cbcd650d4909"
  },
  {
    "url": "assets/js/13.7c4f419a.js",
    "revision": "b6c7ce9074996959d9b31a22bc5869c5"
  },
  {
    "url": "assets/js/14.7bed20f5.js",
    "revision": "313fcc86f1431f51ae6c731180295a42"
  },
  {
    "url": "assets/js/15.fee98c9d.js",
    "revision": "ab0709b9b1a4fa956a591cdecaee13e7"
  },
  {
    "url": "assets/js/16.07ab5c15.js",
    "revision": "efa2675214614c0c8d1feda4f6cd39c4"
  },
  {
    "url": "assets/js/17.9bde1cdb.js",
    "revision": "c73c1a8ccb929b8a5092bd2a4a79fc09"
  },
  {
    "url": "assets/js/18.fdabb00a.js",
    "revision": "cb4bfbc0b4e6565d42e391ae07e91ba8"
  },
  {
    "url": "assets/js/19.5e985d70.js",
    "revision": "6ab127a5a76ead2d04aac86831dab836"
  },
  {
    "url": "assets/js/20.aaae7a60.js",
    "revision": "84a203b8be450eb0c6581211c58b8e80"
  },
  {
    "url": "assets/js/21.c808221a.js",
    "revision": "9c57f26b4b7276c15d4b17b8f0cbc9d5"
  },
  {
    "url": "assets/js/22.de43c72b.js",
    "revision": "290450830af9e8d86e910183545ad6a6"
  },
  {
    "url": "assets/js/23.ec7075b0.js",
    "revision": "5b98e694a1d1db1fb7099a064a4533bf"
  },
  {
    "url": "assets/js/24.903623b8.js",
    "revision": "b451e49009715ce9e851ef03d2f61ef8"
  },
  {
    "url": "assets/js/25.cd7aba8f.js",
    "revision": "9d6080637450848939771d9a3a09853b"
  },
  {
    "url": "assets/js/26.bbe27de8.js",
    "revision": "fb2464f1c584adba836dc1a52f177846"
  },
  {
    "url": "assets/js/27.13f198c4.js",
    "revision": "d8df35f893cb20aaf595b4c3a394b026"
  },
  {
    "url": "assets/js/28.b6f1a5a6.js",
    "revision": "f99c45990221e009bdec00cdc67f0c57"
  },
  {
    "url": "assets/js/29.f3a91a1e.js",
    "revision": "6dc115e9497b4801d68b267e12d22ebc"
  },
  {
    "url": "assets/js/3.443abace.js",
    "revision": "43f1333bcf7ae0d2fd002ab267f528b7"
  },
  {
    "url": "assets/js/30.73244f77.js",
    "revision": "63bd35d36074599b2c6db53420733595"
  },
  {
    "url": "assets/js/31.6a5fd158.js",
    "revision": "5fbb6a5c572f288c3d7e76b84f96d9c3"
  },
  {
    "url": "assets/js/32.33a5b8d9.js",
    "revision": "53df185e61f5870618ae951825498b8c"
  },
  {
    "url": "assets/js/33.7f3a36eb.js",
    "revision": "1871fb8da388960f5c8f7d323257e49b"
  },
  {
    "url": "assets/js/34.12edd7e3.js",
    "revision": "0fc76c92a8970332a7a40a1695655c38"
  },
  {
    "url": "assets/js/35.c0fab1c2.js",
    "revision": "ec532bd8a114d2336f60ea519cb012b7"
  },
  {
    "url": "assets/js/36.07ddb4a2.js",
    "revision": "ba7285aeb97867346b279c3181e86244"
  },
  {
    "url": "assets/js/37.f66087f2.js",
    "revision": "1759e490b34b0a9ccccb0f5045979d5f"
  },
  {
    "url": "assets/js/38.5f118fca.js",
    "revision": "90a7bf0ca22ff1a3afc68cc6dd6ff8d4"
  },
  {
    "url": "assets/js/39.6ac500a1.js",
    "revision": "15a1ea39b1732b0b3c7d98863afbf62c"
  },
  {
    "url": "assets/js/4.808f7068.js",
    "revision": "65bae7fce8fff5e1b5529a2c322e60e4"
  },
  {
    "url": "assets/js/40.5da40a19.js",
    "revision": "773c37ffa864235dcfb7796822f1171c"
  },
  {
    "url": "assets/js/41.732719ee.js",
    "revision": "6d9e6c8be4cda3a4e519191e329134e9"
  },
  {
    "url": "assets/js/5.e5300968.js",
    "revision": "413a4c63a5a741761ea980e0eb07d089"
  },
  {
    "url": "assets/js/6.42baef53.js",
    "revision": "52c02a83e980a48901ab00023f69ef88"
  },
  {
    "url": "assets/js/7.697b99e1.js",
    "revision": "7772191eee77d8b5c8b63ff939e3e9ef"
  },
  {
    "url": "assets/js/8.fae09b8f.js",
    "revision": "38dcc22b5877b1291632cbc60046029d"
  },
  {
    "url": "assets/js/9.5025cf72.js",
    "revision": "a863e3b06964493b01f3179caf1142e5"
  },
  {
    "url": "assets/js/app.fc0a214a.js",
    "revision": "9e9b3fde8c2e5a79ce3a7e3d20a94e72"
  },
  {
    "url": "assets/js/vendors~flowchart.d91dd0c8.js",
    "revision": "fe653cfadbed38ae9c968308d961cf8c"
  },
  {
    "url": "big-data/index.html",
    "revision": "9de4a8bf39faedf2b7a38f160e9ae2c7"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "7869b98a11b69f0d2d53a3302bc09cfa"
  },
  {
    "url": "c/index.html",
    "revision": "90795e6d553b57f56ea1268bd4a5da0f"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "905960f7dc61f7bafb8a32269b67698b"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "85cb87d269b1f01013699f1a58b1de5a"
  },
  {
    "url": "deep-learning/python-and-vectorization.html",
    "revision": "55571e4c66cb12bceb532511df668d37"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "front-end/index.html",
    "revision": "d5a68e21e3805fa9d84ca8d027cea5a4"
  },
  {
    "url": "hello-world/about-the-article-of-java.html",
    "revision": "93e271d7bbc5236bfbf065b8a10a1471"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "7d8aa7f5db692c60a90097940d9aa545"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "abc03e5c4acd883ac56ed927e4b056c3"
  },
  {
    "url": "hello-world/index.html",
    "revision": "4d71eeb111b5093bdb7eaf816674b050"
  },
  {
    "url": "hello-world/setup-a-server-manually.html",
    "revision": "9881576d9096d76a43bfd4cf4a220b8c"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "307cc5c2499c5f2aaaa916dd9d2a293a"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "76bbf3ce2f367f99fb6a83edde377a4a"
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
    "url": "img/tomcat_webapps.jpg",
    "revision": "1c76cd467dad7e9d344fb294ad1db53b"
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
    "revision": "cb0afc7da09a5afe6a45edae6d4d48cf"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "21b46c652526fb47c36fae26ae25e43b"
  },
  {
    "url": "java/API-io.html",
    "revision": "85378b67bda3b3b36075133c1b7c6366"
  },
  {
    "url": "java/API-lang.html",
    "revision": "24caac195eaf6c1117c12867349bdd12"
  },
  {
    "url": "java/API-util.html",
    "revision": "b4364f1f10953e0c4cdc35d131f21074"
  },
  {
    "url": "java/grammars.html",
    "revision": "ec20400d63f0e1662d102eb50b0abfe6"
  },
  {
    "url": "java/index.html",
    "revision": "338a0ba9dce237e2f309340a60fefa09"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "2824bd02855456d7e0cbe67ee9d95140"
  },
  {
    "url": "kotlin/index.html",
    "revision": "712a84037fc9bf86d2508c21ebdc9fce"
  },
  {
    "url": "math/index.html",
    "revision": "68e7629579cb3ba1a562d7eb3f545e2c"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "a47bd2b72575add56b6f23a6fcbbb8b1"
  },
  {
    "url": "python/grammar.html",
    "revision": "157c5ad3a177015ede7199ff585b3c90"
  },
  {
    "url": "python/index.html",
    "revision": "0fa51c19ba00a83e70ffff234006d567"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "e55de8b282ea317cc4f08547d889e6fd"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "a602ae3c78fcb2b1f62b3033f4e5e26e"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "e644291da6a492e1d1f9f84b44f959d9"
  },
  {
    "url": "spring/index.html",
    "revision": "a9fab041137e222255ca9539b2515390"
  },
  {
    "url": "web/HTTP.html",
    "revision": "be93423eb7c4ffe30753983657a77ab6"
  },
  {
    "url": "web/index.html",
    "revision": "573435ea1b76830bff2fbee9e980d8a8"
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
