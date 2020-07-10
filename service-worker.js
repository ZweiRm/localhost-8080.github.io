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
    "revision": "613428edb44be5982759ae1e4334e096"
  },
  {
    "url": "about/index.html",
    "revision": "9f0112ffaef6604a74f4cad7d3d516aa"
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
    "url": "assets/js/10.ae906114.js",
    "revision": "36f518c19db88deb0537029c150599a7"
  },
  {
    "url": "assets/js/11.b30c41bd.js",
    "revision": "1a5644afb26c3812df3f96d92c5e129c"
  },
  {
    "url": "assets/js/12.94dea058.js",
    "revision": "69779ca82239bc6a192f89428c68260b"
  },
  {
    "url": "assets/js/13.13c78913.js",
    "revision": "3d257890d783b993ace2b91eea99149b"
  },
  {
    "url": "assets/js/14.44453562.js",
    "revision": "52f7a5563991c7315d1aa347296376f7"
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
    "url": "assets/js/18.e83d5010.js",
    "revision": "22bad414840467a08302fdc3bce4a925"
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
    "url": "assets/js/21.e8d346f7.js",
    "revision": "32062316bb71e849c5414e103d182ce5"
  },
  {
    "url": "assets/js/22.53d8f1d0.js",
    "revision": "523d41577989b2509144419b3595f809"
  },
  {
    "url": "assets/js/23.a8320ac9.js",
    "revision": "bc43ce34601ee87ddab13b640d17a124"
  },
  {
    "url": "assets/js/24.50376494.js",
    "revision": "a6eaa9a0bdb38ce5408f0851ace65b54"
  },
  {
    "url": "assets/js/25.f4e5eaa9.js",
    "revision": "2e016268bce4f1f9f61e5e7f8156c83a"
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
    "url": "assets/js/29.e79eea67.js",
    "revision": "0c3f2b8601e4310a9779c5875dc601a1"
  },
  {
    "url": "assets/js/3.5a45c147.js",
    "revision": "5ea5378b14ee991bde3fc267a0a69cfe"
  },
  {
    "url": "assets/js/30.6ebae8e3.js",
    "revision": "37822c1cba4eafa2c87377cd63567b68"
  },
  {
    "url": "assets/js/31.80feca3b.js",
    "revision": "541b1a4190855f4519af22c091f90283"
  },
  {
    "url": "assets/js/32.118d6d48.js",
    "revision": "a9f4bd132795ec5bdd8eac01d28d63e2"
  },
  {
    "url": "assets/js/33.75d4cea9.js",
    "revision": "41bdef2f87ec9438d081fbd3ab34d206"
  },
  {
    "url": "assets/js/34.b0fa043f.js",
    "revision": "ef8f01ede16f6476132c302ca29e82b5"
  },
  {
    "url": "assets/js/35.65b8ce00.js",
    "revision": "688d76034631cb723ef565db95b8305a"
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
    "url": "assets/js/9.f1bd8586.js",
    "revision": "6e1c1e4aa66652bde6b71dcf0a1e5a2f"
  },
  {
    "url": "assets/js/app.8a1b21a7.js",
    "revision": "fcf994070d01ebdf886d0a7b227c9974"
  },
  {
    "url": "assets/js/vendors~flowchart.552ed627.js",
    "revision": "9388112f8736a5d2ede9ce9e0518d54d"
  },
  {
    "url": "big-data/index.html",
    "revision": "d79bf39e38f7b325c0ffb3161ec2db9a"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "a06188a35ae8562006a0e44422abfcbe"
  },
  {
    "url": "c/index.html",
    "revision": "b13fbc5793a8bd19018b4982ba127347"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "d305f89837fa36fd5f3dede4b6327095"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "0fef22f1ab4ac0528a88ac906dbb529f"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "front-end/index.html",
    "revision": "d68df4f7a119ddf1111482054ebde02a"
  },
  {
    "url": "hello-world/about-the-article-of-java.html",
    "revision": "7618770a5e711780036ef1336955ac8e"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "33ac335144933b9ad08e3284fb312194"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "9a46dfece4bbe66adca5597eb957f88b"
  },
  {
    "url": "hello-world/index.html",
    "revision": "5fc0d23b3e41d2b78d3775d7c7bdfe9e"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "0ad234f1874bf109cf056c7c59db6f5c"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "3b936542d5f151c00d4caa48664cb17c"
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
    "url": "img/gradientDescent.png",
    "revision": "ee3fd9e0244179e0f3bf66c30df0e3a2"
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
    "url": "img/LRGD_da.svg",
    "revision": "60e38cb64837321edffd77ecc839d722"
  },
  {
    "url": "img/LRGD_db.svg",
    "revision": "93ea3759197e1c23a0a9245c4c4af4d6"
  },
  {
    "url": "img/LRGD_dw1.svg",
    "revision": "2f74f5f0bc402a2376bfe49b48196e15"
  },
  {
    "url": "img/LRGD_dw2.svg",
    "revision": "03032c7c2fdda30fd78a2ecac6248274"
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
    "url": "img/me.jpg",
    "revision": "503f59be9b5549c306c7844f21ce29d9"
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
    "revision": "5ad6c59e2717b7192693aca45259bed0"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "4acb2c5103906b0b66ad43340bf7ac45"
  },
  {
    "url": "java/API-io.html",
    "revision": "93392c95208415c2d26c1014b45e9e77"
  },
  {
    "url": "java/API-lang.html",
    "revision": "4025c2b216680ca798f692e51abddcc7"
  },
  {
    "url": "java/API-util.html",
    "revision": "6de3e8c46a7390a1188d889dbba7a36d"
  },
  {
    "url": "java/grammars.html",
    "revision": "d906fd24671744a86043e256e2c4defd"
  },
  {
    "url": "java/index.html",
    "revision": "61d712ee25eb147b80d0d887c886d358"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "53b43a082214f0aba0acc4982bb64410"
  },
  {
    "url": "kotlin/index.html",
    "revision": "903cf26c0a9bb13f968281973b5b6261"
  },
  {
    "url": "math/index.html",
    "revision": "0db885c3f9f6034400c9e24ff9e79453"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "6b5f3db8af5d29d942846a5e61a1e292"
  },
  {
    "url": "python/grammar.html",
    "revision": "710a3e03fa3018b4fce11f10d04201e7"
  },
  {
    "url": "python/index.html",
    "revision": "b1f512d5b175f387ce025233f6b44cf1"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "77c63184e793f9cc8de3d236fe63915e"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "1a293e4ea3b98a8db7b9c94bb5f89a5e"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "ab5457af8a7e2f2bcc5b84b87c073407"
  },
  {
    "url": "spring/index.html",
    "revision": "9b90cd586da5b3188d36b656be0308e9"
  },
  {
    "url": "web/HTTP.html",
    "revision": "af077681c8ff261cabdd99934afac999"
  },
  {
    "url": "web/index.html",
    "revision": "098830e0053a23a6717ab60b246f47ee"
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
