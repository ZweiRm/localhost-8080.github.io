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
    "revision": "b61c963c62e876c092ef317448a8b814"
  },
  {
    "url": "about/index.html",
    "revision": "dc90ea1b6a5111794aa2c4b19e72ad06"
  },
  {
    "url": "algorithm/ds-001.html",
    "revision": "089406d64a625dd299e78adbf805e408"
  },
  {
    "url": "algorithm/ds-002.html",
    "revision": "397de25a87d32c613ad8d086760d065e"
  },
  {
    "url": "algorithm/ds-003.html",
    "revision": "12171c7f5e6653e24ec0c0e18734c4d8"
  },
  {
    "url": "algorithm/dynamic-programming.html",
    "revision": "64d232f5e4aff8ef0b3d5e7b7e1601ba"
  },
  {
    "url": "algorithm/index.html",
    "revision": "d64ffbf2073e92ff98c3643a9e88b32f"
  },
  {
    "url": "artificial-intelligence/index.html",
    "revision": "388e13a40fcb18fc33cc8a8f63fc0731"
  },
  {
    "url": "artificial-intelligence/search-strategies.html",
    "revision": "b7237c6a964c27c2efff8e2be26be844"
  },
  {
    "url": "assets/css/0.styles.bdbb3e15.css",
    "revision": "815b35576cda353385ceaaa8f3c6fafe"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.e91ecf24.js",
    "revision": "cda9e3087afeae928e574540133062df"
  },
  {
    "url": "assets/js/11.ce65a654.js",
    "revision": "ee5ed0476547542a66b7ed4e6d2b9a67"
  },
  {
    "url": "assets/js/12.957b2ba7.js",
    "revision": "48b82b529670412603f47de20497ff80"
  },
  {
    "url": "assets/js/13.f124361f.js",
    "revision": "b0f7f7005035554e2d84a8b7d6992d5a"
  },
  {
    "url": "assets/js/14.021636b4.js",
    "revision": "cb19dcd45a15afaf869c123aeb1a7291"
  },
  {
    "url": "assets/js/15.94c04734.js",
    "revision": "db29cb09deb09fd3e62eb0ea4fba8396"
  },
  {
    "url": "assets/js/16.8ac40baf.js",
    "revision": "99fac8ac5748a038cac4294e53719a49"
  },
  {
    "url": "assets/js/17.2817ba32.js",
    "revision": "c287d152168b5547dceebfb779ac09f4"
  },
  {
    "url": "assets/js/18.1b538868.js",
    "revision": "a007eccbf3f6ba8f4871d263003d7f40"
  },
  {
    "url": "assets/js/19.464f355f.js",
    "revision": "3183c4d0067f29fa17cbc9f8794b792c"
  },
  {
    "url": "assets/js/20.afcfb902.js",
    "revision": "8905387b0cac13efe593f2a74ce5566b"
  },
  {
    "url": "assets/js/21.d603c102.js",
    "revision": "a882b79415f087e9f1a7a66c66dae126"
  },
  {
    "url": "assets/js/22.dbc1e9bb.js",
    "revision": "f3eef62a9f43cd9c97499dd6ba62e263"
  },
  {
    "url": "assets/js/23.dcfbd51c.js",
    "revision": "a1b298b01bda3cf2acc39dc33cf73f34"
  },
  {
    "url": "assets/js/24.8903e909.js",
    "revision": "3d207a703090cc99a9c60f58eb3f5977"
  },
  {
    "url": "assets/js/25.5aab54c9.js",
    "revision": "d0aab6453c7ae5df0af8d7fde0ec2757"
  },
  {
    "url": "assets/js/26.dc03748b.js",
    "revision": "d26d81abbc88772483dfde5382b36d5b"
  },
  {
    "url": "assets/js/27.a4567d26.js",
    "revision": "de366e486c78bce6e15b4e5d2679dbe5"
  },
  {
    "url": "assets/js/28.48cffe28.js",
    "revision": "b73705bede7f3948bc445de1beba0521"
  },
  {
    "url": "assets/js/29.379b0ff0.js",
    "revision": "18445423fd20007ce7d47c2215082515"
  },
  {
    "url": "assets/js/3.a593ac9f.js",
    "revision": "60db01567134a56e0b2365c5e704d8ac"
  },
  {
    "url": "assets/js/30.3fd61329.js",
    "revision": "3504a93bb068486e5dac5516ea162b5e"
  },
  {
    "url": "assets/js/31.0f9653db.js",
    "revision": "db325d3c2f636a077fa658a228c97fef"
  },
  {
    "url": "assets/js/32.883049fa.js",
    "revision": "12c21caa6e77c54702a46da583683c60"
  },
  {
    "url": "assets/js/33.b6cf662b.js",
    "revision": "94ee0582e7ba39d2bc232cfc40e4d0e4"
  },
  {
    "url": "assets/js/34.b1f68cf2.js",
    "revision": "489e7eee84fff84edcb417a24d44cab7"
  },
  {
    "url": "assets/js/35.47efd8dc.js",
    "revision": "98efeeec9c7ab4a34a89ba1b4deea029"
  },
  {
    "url": "assets/js/36.ca56c1d3.js",
    "revision": "c5d22303820eff3c45ef46866398eac2"
  },
  {
    "url": "assets/js/37.a22d8643.js",
    "revision": "777bf754db508f52cc4efe885603347d"
  },
  {
    "url": "assets/js/38.4ba8931a.js",
    "revision": "31daecb60a58d2eb3875f33882cb3755"
  },
  {
    "url": "assets/js/39.ef4fbbb1.js",
    "revision": "092b47cd0d57cf6e65c992689c5dc707"
  },
  {
    "url": "assets/js/4.f26e65f9.js",
    "revision": "35aa580def24b586db634a5c333375db"
  },
  {
    "url": "assets/js/40.1faa85a5.js",
    "revision": "d3126be51a6f8cacaf40d6a4abbbe078"
  },
  {
    "url": "assets/js/41.51dd3953.js",
    "revision": "8c4e3eb5c7060241cdf5a9592357f67d"
  },
  {
    "url": "assets/js/42.14f973af.js",
    "revision": "90518f74a6b8e5713dbb2b5f8ef020aa"
  },
  {
    "url": "assets/js/43.38be18ed.js",
    "revision": "addc7ef2540fe1f461f68cf99524bce0"
  },
  {
    "url": "assets/js/44.cacab41b.js",
    "revision": "621c0df508b595cbc993cdfa9bd62f4d"
  },
  {
    "url": "assets/js/45.f30165da.js",
    "revision": "409be46ea49d0a3af5daed17ce86ecfc"
  },
  {
    "url": "assets/js/46.fcdf6a4b.js",
    "revision": "9c56aaa84cdbe82d8056638f6201f42f"
  },
  {
    "url": "assets/js/47.0fcb4ef2.js",
    "revision": "680067f885b4f9c18ad3ff0577f436ba"
  },
  {
    "url": "assets/js/48.1d573897.js",
    "revision": "c244d5ad35180b8f38bea21a25ca8190"
  },
  {
    "url": "assets/js/49.3755ea9b.js",
    "revision": "6642914863e50d685d68c4ff3db387e8"
  },
  {
    "url": "assets/js/5.ba8ec74e.js",
    "revision": "c315d6b169c90d26b1df59068698e3ce"
  },
  {
    "url": "assets/js/50.cc721eda.js",
    "revision": "426e01302c2135be469715f62c63a4f7"
  },
  {
    "url": "assets/js/51.7f709329.js",
    "revision": "4a064a1465f086f5862983598d9a873f"
  },
  {
    "url": "assets/js/52.5034a220.js",
    "revision": "58670cfa4f52d2ad312ee3379a6cb56f"
  },
  {
    "url": "assets/js/53.5acb8198.js",
    "revision": "f45fc493591b51b24fcbdde379d9d817"
  },
  {
    "url": "assets/js/54.f63fb688.js",
    "revision": "095fd2a7c1784f4481723b5106d91e48"
  },
  {
    "url": "assets/js/55.bf2c1cb4.js",
    "revision": "2170d7b73e5c1bfb6e71cd8f716e929d"
  },
  {
    "url": "assets/js/56.7a595e45.js",
    "revision": "0798a3e5e03103c1dd9c5c6c6b698f86"
  },
  {
    "url": "assets/js/57.f535a934.js",
    "revision": "771b3bf5cebde07aeea181b538a9980e"
  },
  {
    "url": "assets/js/58.3a07367e.js",
    "revision": "058a4934ad006ba8cb5f8e45b94d8936"
  },
  {
    "url": "assets/js/59.b46b248c.js",
    "revision": "bce148137675d37904ee20254667ad4c"
  },
  {
    "url": "assets/js/6.43605ef5.js",
    "revision": "cbad99d08b08254f02421e83a6acb250"
  },
  {
    "url": "assets/js/60.3de0ec12.js",
    "revision": "7fe3ce2f0acce6207d1766379641b46c"
  },
  {
    "url": "assets/js/61.c3eb8fdf.js",
    "revision": "1a9ee1563d6248a95a74a79505c98acc"
  },
  {
    "url": "assets/js/62.56fae6c6.js",
    "revision": "68085d9b240e18fd7b9bf2488b9227b7"
  },
  {
    "url": "assets/js/63.9493c22a.js",
    "revision": "4f01a88a06eb87e8e3708ba3550240d5"
  },
  {
    "url": "assets/js/64.50ca5da2.js",
    "revision": "2bddd9d01fcd357687d4d874224c38a2"
  },
  {
    "url": "assets/js/65.a3fd2e32.js",
    "revision": "6b8348fe97cbc7dd9a276be6ced0092f"
  },
  {
    "url": "assets/js/66.138c10a5.js",
    "revision": "e61662d04e36216b49b51232e88726ea"
  },
  {
    "url": "assets/js/67.30a60069.js",
    "revision": "c5c8a8be6d99c7042c19c45838f7317e"
  },
  {
    "url": "assets/js/68.bfc460e9.js",
    "revision": "c7ff4881ec6bfd7f6bd686bdb65b7717"
  },
  {
    "url": "assets/js/69.2342cd82.js",
    "revision": "705c5d01774a632d75525ef754099bec"
  },
  {
    "url": "assets/js/7.8765ecf5.js",
    "revision": "e06d9161f64190a65a5dccb4217dc083"
  },
  {
    "url": "assets/js/70.4e700e2e.js",
    "revision": "020591db2af1adfe42b8e6aacd86b039"
  },
  {
    "url": "assets/js/71.d9688cee.js",
    "revision": "050e7a5941c8862e3fcd3e3c8b7f6d99"
  },
  {
    "url": "assets/js/72.e592ef8b.js",
    "revision": "f669fd44517a18ffa3f79ea4357467e9"
  },
  {
    "url": "assets/js/73.040fd71d.js",
    "revision": "8213666349057a931aca4fbee9c445b0"
  },
  {
    "url": "assets/js/74.84af2ae9.js",
    "revision": "ed46ace8c59fb166612f1e60a6985276"
  },
  {
    "url": "assets/js/75.433fe46c.js",
    "revision": "83c674b4c810f98237dcdaf3423c5e5d"
  },
  {
    "url": "assets/js/8.e7c39b1e.js",
    "revision": "c5980905a079979c1ede7caf773c2f3a"
  },
  {
    "url": "assets/js/9.3949b052.js",
    "revision": "ba536cafe00e290764719a809bc9e326"
  },
  {
    "url": "assets/js/app.b0ec2a7b.js",
    "revision": "f814ac4863891a95f20e05e43b76d461"
  },
  {
    "url": "assets/js/vendors~flowchart.1e021cdf.js",
    "revision": "b9d1a86f9c293b60f708db6aa128344e"
  },
  {
    "url": "big-data/index.html",
    "revision": "f331087b823b0239c1f70f79461f51e8"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "6320b1332c53a135e35398295cfa9287"
  },
  {
    "url": "c/index.html",
    "revision": "67853c7b7d17d030fb64483aa0dce870"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "c3378a6977906a6bad163048c3fa453e"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "8e64b1ae009d2fb6087c05bc37241061"
  },
  {
    "url": "deep-learning/python-and-vectorization.html",
    "revision": "114bdb6c253197dfe147b1be9f4a2e11"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "hello-world/array-and-linked-list.html",
    "revision": "bfdc295a5d7c00400c1b375c3bc2d225"
  },
  {
    "url": "hello-world/binary-search.html",
    "revision": "f5b68bbe4004cca63dce9871addf1e08"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "30215c72a2b5a20e0019170218ea8902"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "541b9fa835a7b8a9653ed70dd467547d"
  },
  {
    "url": "hello-world/index.html",
    "revision": "c938cd31ec7aa5771ae3206e3fda4339"
  },
  {
    "url": "hello-world/setup-a-server-manually.html",
    "revision": "6f867ddedf29179e94969c077b99065f"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "6c09b32ee41e088647209caef9351ff9"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "fd71591e8ed2f6a5a3c0409f0fa7569a"
  },
  {
    "url": "img/ahza-white.png",
    "revision": "3c642eba43abc55fb6555dab8d743fcd"
  },
  {
    "url": "img/Box公共父类.png",
    "revision": "29f7513824ee0797b0e490de82ecab04"
  },
  {
    "url": "img/buildOpt.png",
    "revision": "886f601b0b53e21c83d5cd5028bc63ba"
  },
  {
    "url": "img/Collection继承关系.png",
    "revision": "15961287697b1152fdd5563f3f445b39"
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
    "url": "img/hashmap/单线程.jpg",
    "revision": "282b4e91d578488fa8899bff19bf98d3"
  },
  {
    "url": "img/hashmap/多线程1.jpg",
    "revision": "aa011bdee25edfa1cf365c4177d82e09"
  },
  {
    "url": "img/hashmap/多线程2.jpg",
    "revision": "740865cb37a7e7c6a30738ef8da9b077"
  },
  {
    "url": "img/hashmap/多线程3.jpg",
    "revision": "1d9beb0cf624bfb14527bccf05eecaf9"
  },
  {
    "url": "img/hashmap/多线程4.jpg",
    "revision": "296a53662866a6a3cdcd7e15cc181a31"
  },
  {
    "url": "img/hashmap/多线程5.jpg",
    "revision": "9e09b51b57d5046ce0c3592ab9309a47"
  },
  {
    "url": "img/hashmap/多线程6.jpg",
    "revision": "9f9368b586419ec79aa70c796796955f"
  },
  {
    "url": "img/hashmap/多线程7.jpg",
    "revision": "5defe4b85c931a1dabd76804df46802d"
  },
  {
    "url": "img/hashmap/多线程8.jpg",
    "revision": "bb1ffc26543d45b67efa7263aa069e1c"
  },
  {
    "url": "img/hashmap/多线程9.jpg",
    "revision": "f925744aef205fc91c5fa2f0323c683b"
  },
  {
    "url": "img/HTTP.png",
    "revision": "82fc121850762692d6f58a558ea6f7fc"
  },
  {
    "url": "img/HTTPResponse.png",
    "revision": "59485510df3e7e6bb959e03de1708a03"
  },
  {
    "url": "img/HTTPS.png",
    "revision": "ceb922735b48de43f832b2d0e7461e6c"
  },
  {
    "url": "img/jetbrains.svg",
    "revision": "48b3f5c87ff00f11d7b0b0fd64fdd12e"
  },
  {
    "url": "img/JMM.png",
    "revision": "32df347a83f71a49ba4bd9e01ce1596e"
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
    "url": "img/List继承关系.png",
    "revision": "380a3d18acbe73f8e51469a6aa2ac775"
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
    "url": "img/mysqlProcess.png",
    "revision": "e5850b751ff12e20209f6aa17bc8c304"
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
    "url": "img/redis/全局哈希表.jpg",
    "revision": "66ce1b8450b83d0abca6afed3853c5a8"
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
    "url": "img/synchronized_block.gif",
    "revision": "d22e6514513ee2a5ff000485d62f313b"
  },
  {
    "url": "img/synchronizedWithException.png",
    "revision": "e8475d591c334e554302cbb22c2e7e7a"
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
    "url": "img/内存模型.png",
    "revision": "d9994a00c50e0d64f118965116c19f58"
  },
  {
    "url": "img/内存模型1_8.png",
    "revision": "de11fad3c2abed388ebf991ded7bbe3a"
  },
  {
    "url": "img/内存管理.jpg",
    "revision": "e4eb17b76cf8bbbd913b2a0ef66f3cd1"
  },
  {
    "url": "img/单继承.jpg",
    "revision": "3ff56912ed756d3efb84cfb4a8261e6d"
  },
  {
    "url": "img/双亲委派.jpg",
    "revision": "6e1fc7c5aa4e23d552c9448508cd3bf2"
  },
  {
    "url": "img/多继承.jpg",
    "revision": "e74b1da5b9c57740a89caadcc3d64e9a"
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
    "url": "img/泛型类型泛化.png",
    "revision": "8f2721567e85c74e1a7454f941a568ba"
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
    "revision": "3c51667521dba3cddf7a8bb864ba12a6"
  },
  {
    "url": "img/静态内存.png",
    "revision": "d1a5f305719c2871e0f0aab66fd02a1d"
  },
  {
    "url": "index.html",
    "revision": "e808787d0dc2b170d17730e580f0c1c6"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "49d58e7624ff308a39b54ce0d0c16f4c"
  },
  {
    "url": "java/API-io.html",
    "revision": "dcc4c187648c6c6a899a90e4c4c4c83e"
  },
  {
    "url": "java/API-lang.html",
    "revision": "20135e36b32687220e0d42b89c9a086d"
  },
  {
    "url": "java/API-lang2.html",
    "revision": "19d8dbe6d2724e6b54e5d1b82e073f5d"
  },
  {
    "url": "java/API-util.html",
    "revision": "1c1747e7fc9bce24ad309cc52f467540"
  },
  {
    "url": "java/API-util2.html",
    "revision": "6b147a9b0e5ba06bb1e3e2f23c5536b4"
  },
  {
    "url": "java/API-util3.html",
    "revision": "485c7a568d01fd3031c756efd11e293d"
  },
  {
    "url": "java/grammars.html",
    "revision": "f8d0c68b29b8afe0e8cb3d86dd09e934"
  },
  {
    "url": "java/index.html",
    "revision": "9f0df08e5323496c233767fa784faef4"
  },
  {
    "url": "java/jvm.html",
    "revision": "a562bc084e08a6bf4ee9f9621b251255"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "0fad7a5cec22e5b465c805ed05625654"
  },
  {
    "url": "java/references.html",
    "revision": "f62d57cb1fea822df5f745974e3210b7"
  },
  {
    "url": "kotlin/index.html",
    "revision": "a7e7ebca01913167743e8876d7181e36"
  },
  {
    "url": "math/index.html",
    "revision": "ac046cb0ea04a01a622dbb6758b16672"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "b232240718ba16c6f8ad0cd501c866d4"
  },
  {
    "url": "mysql/divide.html",
    "revision": "08ec97b7d29d356f579d5f133218b4b2"
  },
  {
    "url": "mysql/index.html",
    "revision": "39081518cf5b8d5a6d699b482d25a611"
  },
  {
    "url": "mysql/indices.html",
    "revision": "0e74d814abb3817699f1c8f08c7d89de"
  },
  {
    "url": "mysql/lock.html",
    "revision": "782f87c4839fa2bd78365df518509f46"
  },
  {
    "url": "mysql/question.html",
    "revision": "c48d0da57449bb6cf7603dd557e2641b"
  },
  {
    "url": "mysql/references.html",
    "revision": "5d691539b92aea50fefa1dacfec90620"
  },
  {
    "url": "mysql/transaction.html",
    "revision": "e2cd16625fd9ac13c22f2c88a962f199"
  },
  {
    "url": "python/grammar.html",
    "revision": "15045c082288edfbeb4701782dd26d9b"
  },
  {
    "url": "python/index.html",
    "revision": "c1c04a5ff6cc423a0156a32383bc7ae3"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "d988ebaec87bdf9ebcce85b3e796a065"
  },
  {
    "url": "recommender-systems/index.html",
    "revision": "cdf604f560cb6bc7840028662d2256da"
  },
  {
    "url": "recommender-systems/introduction.html",
    "revision": "7b9a249ce664f76a22ebe0bdb8387a43"
  },
  {
    "url": "redis/cache.html",
    "revision": "cbab1119f57143b288e2508dc4bcd602"
  },
  {
    "url": "redis/cluster.html",
    "revision": "922a316d281320b66ab869d33a7fcbeb"
  },
  {
    "url": "redis/data-structure.html",
    "revision": "6b7bf41da03b4d65ff1ae2c1bd119dd0"
  },
  {
    "url": "redis/index.html",
    "revision": "b29f5b0073cc02e1f4459a807bab5d42"
  },
  {
    "url": "redis/persistence.html",
    "revision": "2aa8f43f147c5c479ff254f112b1e64b"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "36e5f4531d989431eed52058510a820d"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "9b0a14ccb3c2a62ac4e95e3a2a435982"
  },
  {
    "url": "spring/index.html",
    "revision": "f58adaf33d9999fb9fd82370fe923941"
  },
  {
    "url": "spring/ioc.html",
    "revision": "c6cba655042a77fc469c2e08321e7901"
  },
  {
    "url": "spring/overall.html",
    "revision": "05e7e21982acab325b60e9e8b4643a93"
  },
  {
    "url": "spring/references.html",
    "revision": "9cfdcb09e766bcab36fd8446d152e936"
  },
  {
    "url": "web/HTTP.html",
    "revision": "92ff6af16d932c8e05fe438b7962b21e"
  },
  {
    "url": "web/index.html",
    "revision": "f5cef9f8b1445ffeb3dafd72f90a1d22"
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
