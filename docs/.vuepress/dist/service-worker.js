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
    "revision": "9158f32c845ee6a4c7d2c46b123719b8"
  },
  {
    "url": "about/index.html",
    "revision": "f90460c2703bf5e6509dda58ef6e06ed"
  },
  {
    "url": "artificial-intelligence/index.html",
    "revision": "b6a361ca5a7e95947e8e23c13bed47fb"
  },
  {
    "url": "artificial-intelligence/search-strategies.html",
    "revision": "cf1c7c9ab478cb637bebb1623fd61bdc"
  },
  {
    "url": "assets/css/0.styles.8500d292.css",
    "revision": "09ba561ddb61d2eab5291a8592e1c00c"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.fbac4858.js",
    "revision": "99b1214cc61675f41849dc1dc4c281d9"
  },
  {
    "url": "assets/js/11.17ae892a.js",
    "revision": "8a509bb3460507f5df218cfd6358ef39"
  },
  {
    "url": "assets/js/12.a92f4bf0.js",
    "revision": "9a8a937008819bce2bc80dac8d5bf2d1"
  },
  {
    "url": "assets/js/13.8baeb27d.js",
    "revision": "02d99f67aa1fa7c0e91f0f624803090a"
  },
  {
    "url": "assets/js/14.8716bfb3.js",
    "revision": "6abc45b5922133a1c5f291be4b86f0e3"
  },
  {
    "url": "assets/js/15.c36c37d6.js",
    "revision": "dc9bc270ccf125fe6efb6409c57d78fd"
  },
  {
    "url": "assets/js/16.8e98baf3.js",
    "revision": "a90ef2cdbc04aab1576c2bf32219d224"
  },
  {
    "url": "assets/js/17.86030c34.js",
    "revision": "addb161090961e00fdb481ac4f2a7caa"
  },
  {
    "url": "assets/js/18.79e4fe4d.js",
    "revision": "be5cdd456d67ab435a9fdd363c75160b"
  },
  {
    "url": "assets/js/19.bfc32321.js",
    "revision": "eb8e48cb97fa80f786dcf38d300a9cd9"
  },
  {
    "url": "assets/js/20.0b7580a8.js",
    "revision": "46f0dab4f16463c65c2e06e3b36066af"
  },
  {
    "url": "assets/js/21.43e2a164.js",
    "revision": "88f3edb7bb4ee8ccf6e23b9aacc7f32c"
  },
  {
    "url": "assets/js/22.b6e2dece.js",
    "revision": "c5da7a8178f0a48effb778b8f28dd0ea"
  },
  {
    "url": "assets/js/23.4c2dfb54.js",
    "revision": "fda3472f46b2a3b6a90d5b1cb3480d18"
  },
  {
    "url": "assets/js/24.91e6b40f.js",
    "revision": "407aea7ff9b70854ff0d199bb16b7613"
  },
  {
    "url": "assets/js/25.d19465e8.js",
    "revision": "aa8d9323f7a550371e1ef34740f1c017"
  },
  {
    "url": "assets/js/26.a7fdbca6.js",
    "revision": "ae5018268f35cca699ea87377a9ea8e6"
  },
  {
    "url": "assets/js/27.e373b91f.js",
    "revision": "3102927559258f2ab59f11365ce69c7d"
  },
  {
    "url": "assets/js/28.5b2cbe1d.js",
    "revision": "10cf1caa156212917d393e6277ff36b3"
  },
  {
    "url": "assets/js/29.6157dd6c.js",
    "revision": "822e723c3a9b73a71cf726362968c023"
  },
  {
    "url": "assets/js/3.5dc5b798.js",
    "revision": "d9613039c4bf27872193579fdb5d9207"
  },
  {
    "url": "assets/js/30.30bc3849.js",
    "revision": "eb02c06ac4d0c09babf4d0288da8a6e5"
  },
  {
    "url": "assets/js/31.50c3d167.js",
    "revision": "f51e5593a6c5f4f13214a97c5fcc8c9d"
  },
  {
    "url": "assets/js/32.fc4ac746.js",
    "revision": "006964104fc3a099d27d1b6ee89558d0"
  },
  {
    "url": "assets/js/33.6a7faaaf.js",
    "revision": "9dcef5f698c5b71a3d644f24449c926b"
  },
  {
    "url": "assets/js/34.9fa6b6ce.js",
    "revision": "0e4f62485056e7c6acf684628f312161"
  },
  {
    "url": "assets/js/35.a8cdf7dd.js",
    "revision": "2ed0a1bb05fd92514f8b42675ecc0d2a"
  },
  {
    "url": "assets/js/36.67e72cfb.js",
    "revision": "d5079618563ba2cd467527e2f1d8126c"
  },
  {
    "url": "assets/js/37.14393908.js",
    "revision": "cabbba7d2b5e235b6c16e33e6217cf97"
  },
  {
    "url": "assets/js/38.c41c7f9c.js",
    "revision": "44839d653a224a0ac80dc28bb5c2092c"
  },
  {
    "url": "assets/js/39.ebccd3fc.js",
    "revision": "5f2bad59b72d7c0cef2d4be88b33a29e"
  },
  {
    "url": "assets/js/4.fbf32185.js",
    "revision": "c22f93c59cf178037176e1ed72a3dca3"
  },
  {
    "url": "assets/js/40.65233b34.js",
    "revision": "13faf7f164e3f33a883c895921bb985e"
  },
  {
    "url": "assets/js/41.4768d615.js",
    "revision": "9c6b3582d25c2f2ad98bdf33ed4f05e6"
  },
  {
    "url": "assets/js/42.18a89413.js",
    "revision": "0c626fcf1dca053c2ca3a89a78bf7b11"
  },
  {
    "url": "assets/js/43.8c67efe9.js",
    "revision": "8cf56e64e34223d3a6b6d8def4708101"
  },
  {
    "url": "assets/js/44.204b67ea.js",
    "revision": "a9d42ccc8a36bed186843a8a82c67c1f"
  },
  {
    "url": "assets/js/45.d5260f57.js",
    "revision": "3bf478179308400674793c6c9965a644"
  },
  {
    "url": "assets/js/5.d3389438.js",
    "revision": "ebc5345f85c914b023c8580b3092f133"
  },
  {
    "url": "assets/js/6.465ee2f0.js",
    "revision": "9bc98c7c645d74c54159e269e477fb72"
  },
  {
    "url": "assets/js/7.373f00c6.js",
    "revision": "e4e0cc7b893f46abe8eda3992c8f648a"
  },
  {
    "url": "assets/js/8.a7414f83.js",
    "revision": "4494dcc6f99d4b630fa98007f75ff067"
  },
  {
    "url": "assets/js/9.1dadfc78.js",
    "revision": "dd33a335285165ee2b88483cd45d23dc"
  },
  {
    "url": "assets/js/app.99d814d2.js",
    "revision": "7a1171e109cfeb32d28421b0907baaba"
  },
  {
    "url": "assets/js/vendors~flowchart.ab3105b0.js",
    "revision": "8508d0e92a3147ed6cccc1472e97ddbf"
  },
  {
    "url": "big-data/index.html",
    "revision": "d6acf9ffb89628a9dbb265706fcbf8aa"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "eafba09ea43c0204930a8194e3a2d379"
  },
  {
    "url": "c/index.html",
    "revision": "22a302d740e9a17ff739ebb5443bf5dc"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "9845386b22ac2be448712ef2b2adab04"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "772147d5394702286657f36931415727"
  },
  {
    "url": "deep-learning/python-and-vectorization.html",
    "revision": "12ad3b6529d8a0982163508c70271f5c"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "front-end/index.html",
    "revision": "c24ba3310c301239ffc86fa23f759182"
  },
  {
    "url": "hello-world/about-the-article-of-java.html",
    "revision": "c0dce97173e8402ae152e643484424af"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "4bb393e118400c0298a0dac9def59d5f"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "23411bda736f3dfe0bf307e3688db0ce"
  },
  {
    "url": "hello-world/index.html",
    "revision": "e94d6e4125d6e84bfc108d27d699d073"
  },
  {
    "url": "hello-world/setup-a-server-manually.html",
    "revision": "715a7adebc43f162aca2fd6e830ef9fd"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "a32f6c25b031ceb7507bc3fee6a59560"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "31f7fe89447b4796c4973f4bf35ebbe8"
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
    "revision": "ced3b531e32f12a7448d951ad323c8ea"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "2eed0f7774bd4a46110710d66b209099"
  },
  {
    "url": "java/API-io.html",
    "revision": "81006d634be6131eb4fbcd0998ed6b80"
  },
  {
    "url": "java/API-lang.html",
    "revision": "b6226d75dd924413d906290a59329363"
  },
  {
    "url": "java/API-util.html",
    "revision": "f293b750859056c1ab451035ed791b47"
  },
  {
    "url": "java/grammars.html",
    "revision": "bb92bc47c0280cb680b93ec3ff3ad13f"
  },
  {
    "url": "java/index.html",
    "revision": "87ab575faa39957b302a922e04b21656"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "bfa33189b812d88bf7b873ae64ac33f0"
  },
  {
    "url": "kotlin/index.html",
    "revision": "655127f6fff86e51ec9e01ca5d14ed01"
  },
  {
    "url": "math/index.html",
    "revision": "276d96a54834ca872f9713b629a16090"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "c825a0aa264ed089ac5e5748bcc41bc4"
  },
  {
    "url": "python/grammar.html",
    "revision": "ace69565c16b21ec88af87786943cddc"
  },
  {
    "url": "python/index.html",
    "revision": "d950877d1734104c9f7e920551cde647"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "cdd24f3d8fca5155322d56fdafb06666"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "01efac0e084c2c9bc4095223accb9574"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "866a1ee9382437eb59081e0f97987c16"
  },
  {
    "url": "spring/index.html",
    "revision": "91c1a59797dacc87a646cd2e2d8638ca"
  },
  {
    "url": "web/HTTP.html",
    "revision": "0c84fff03faa1b38c9ddfc105cb961e1"
  },
  {
    "url": "web/index.html",
    "revision": "b09590d6e762903eb17d3cab590b64db"
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
