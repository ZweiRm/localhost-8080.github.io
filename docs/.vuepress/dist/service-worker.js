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
    "revision": "89bf7adc27f71b23ec137728d75cfb2e"
  },
  {
    "url": "about/index.html",
    "revision": "c93e4d8e8987e81a0e14ad89cce8373b"
  },
  {
    "url": "algorithm/ds-001.html",
    "revision": "c23aef38b939b317b3c8b6e025e8a3ad"
  },
  {
    "url": "algorithm/ds-002.html",
    "revision": "b7e59b04fc495ec59a29c193f1ce0f01"
  },
  {
    "url": "algorithm/ds-003.html",
    "revision": "649a3af5cd23937160c3821b1af143a9"
  },
  {
    "url": "algorithm/dynamic-programming.html",
    "revision": "16a792841801d4e3a926ca60e7df5c84"
  },
  {
    "url": "algorithm/index.html",
    "revision": "4b5d912f40ad293ff0356e9fca01ee7f"
  },
  {
    "url": "artificial-intelligence/index.html",
    "revision": "73f286628d64ae7ea1754a5666b26be0"
  },
  {
    "url": "artificial-intelligence/search-strategies.html",
    "revision": "eeb2082c335b6708b254828370b2b7e6"
  },
  {
    "url": "assets/css/0.styles.ecc20c62.css",
    "revision": "9dda647ba53b032eeab719b0d9e94fe8"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.c791a782.js",
    "revision": "4a33113741922b0f885b5a147b362736"
  },
  {
    "url": "assets/js/11.28b70681.js",
    "revision": "96eed8c532d3951bcfd2208d09295be4"
  },
  {
    "url": "assets/js/12.5afd9efb.js",
    "revision": "fb4e24ee3c46d70fcaeb4a0eaedf9bba"
  },
  {
    "url": "assets/js/13.140c34f0.js",
    "revision": "0fde2660389340eec7031734a5378754"
  },
  {
    "url": "assets/js/14.7d326419.js",
    "revision": "63984557a912e73d443bc07591bfb2f6"
  },
  {
    "url": "assets/js/15.8068ea95.js",
    "revision": "73f49400dae4f2de34059373cd910f70"
  },
  {
    "url": "assets/js/16.67ec5bab.js",
    "revision": "7c04630676d1320769bdcfda70503cd9"
  },
  {
    "url": "assets/js/17.c86845e7.js",
    "revision": "4ddde1ade4264826d3c7ef4078281c13"
  },
  {
    "url": "assets/js/18.d9bb6a79.js",
    "revision": "ac04be37be441962a102a3aa41d65e31"
  },
  {
    "url": "assets/js/19.45ba0e69.js",
    "revision": "4c8616fb01be8724bdce61594e026b69"
  },
  {
    "url": "assets/js/20.720312f5.js",
    "revision": "9e9a74cc30c7947b4f24ce3f52565d62"
  },
  {
    "url": "assets/js/21.ded98e0f.js",
    "revision": "ada59cff0bdaabaf0c1f25a5730de138"
  },
  {
    "url": "assets/js/22.97f73749.js",
    "revision": "f4ffae77369644f34b0787d52e879dc5"
  },
  {
    "url": "assets/js/23.9a078f42.js",
    "revision": "c1397e4d331a937181a126d36c46ec7d"
  },
  {
    "url": "assets/js/24.d38e4a7a.js",
    "revision": "2c04009120761ebff6100839d14cb83f"
  },
  {
    "url": "assets/js/25.05f0e142.js",
    "revision": "3b03843b952e88f2787e4b86647b6a5a"
  },
  {
    "url": "assets/js/26.1d8e8af3.js",
    "revision": "5b127202c498004b0d9422145a7b3f9d"
  },
  {
    "url": "assets/js/27.62efc4a2.js",
    "revision": "4f629d08925eae3e2b98d4fb946fc658"
  },
  {
    "url": "assets/js/28.f364071e.js",
    "revision": "ad5bc5a12d4af5a28059a7c126f42521"
  },
  {
    "url": "assets/js/29.b3f6ef75.js",
    "revision": "d6a2b5a6fa3be397ef94fa50d6cb7c6f"
  },
  {
    "url": "assets/js/3.1fb3b4b2.js",
    "revision": "6ef267786d148ae46df51242ed5769eb"
  },
  {
    "url": "assets/js/30.a46f11bd.js",
    "revision": "6cc4bc160110b139af9d6ee4446aa36a"
  },
  {
    "url": "assets/js/31.1b13d8d1.js",
    "revision": "de600a43645c7c6fc49fec31da750190"
  },
  {
    "url": "assets/js/32.0af6dfcd.js",
    "revision": "80120cf080efbf1579f3a857d762bbfe"
  },
  {
    "url": "assets/js/33.0bb78317.js",
    "revision": "51abc7f2d017ab137516b09fda3d9a3a"
  },
  {
    "url": "assets/js/34.4f33c285.js",
    "revision": "447274ec886d08a7aac43645998fa20e"
  },
  {
    "url": "assets/js/35.ed290680.js",
    "revision": "f58e28579a25572d109f7d1c89f98ebd"
  },
  {
    "url": "assets/js/36.e87c137b.js",
    "revision": "72ae02a3dc3f57a6c15ebe5aa5dd52c3"
  },
  {
    "url": "assets/js/37.45c2681e.js",
    "revision": "40842494167a37f1bb18f381b6298a12"
  },
  {
    "url": "assets/js/38.d2dcc99c.js",
    "revision": "42c5b6de06e05aabbe3b30e565df493b"
  },
  {
    "url": "assets/js/39.7dd9ae0a.js",
    "revision": "f91e1c96bec20ce71907ea8b94c14072"
  },
  {
    "url": "assets/js/4.8d4a860c.js",
    "revision": "788646a00a7e814716d3b2b8c0f09787"
  },
  {
    "url": "assets/js/40.1abb1d21.js",
    "revision": "a600ed11510de5db705dca6e150f8c47"
  },
  {
    "url": "assets/js/41.dafc1c82.js",
    "revision": "f93f3897c8fde63a76ddd40a17d5614e"
  },
  {
    "url": "assets/js/42.00a79892.js",
    "revision": "1d69894a7329fa46d5923ebe4b14563e"
  },
  {
    "url": "assets/js/43.d824c00e.js",
    "revision": "c7fffdb9a547ac6decf4e89be9761839"
  },
  {
    "url": "assets/js/44.7cd4304b.js",
    "revision": "ec1c30a2d31491610e98c804788f5bf1"
  },
  {
    "url": "assets/js/45.d10d790b.js",
    "revision": "5b3acb603deac97b1d07a992f72d7cbb"
  },
  {
    "url": "assets/js/46.e4305394.js",
    "revision": "00bc5ea590c32cf1c0673fb1d05814be"
  },
  {
    "url": "assets/js/47.491226dc.js",
    "revision": "2ed4fa6bef2510e29a4e3b6a2b320cec"
  },
  {
    "url": "assets/js/48.7f4b002c.js",
    "revision": "413591e7e727fdcf8220801ae43d6480"
  },
  {
    "url": "assets/js/49.e4d80963.js",
    "revision": "360bbb902555470ac9743248597e2993"
  },
  {
    "url": "assets/js/5.5d16e667.js",
    "revision": "4d94c1ca412af88e8030eff088fc53e7"
  },
  {
    "url": "assets/js/50.f110a67a.js",
    "revision": "74537f3a70d34288881859794b37370a"
  },
  {
    "url": "assets/js/51.86c9f8c9.js",
    "revision": "eb9e2caa90321b8b5c4c76508b5bbd13"
  },
  {
    "url": "assets/js/52.c18ddf9e.js",
    "revision": "b97e46d3c6f17ad1d86406eaaaabf567"
  },
  {
    "url": "assets/js/53.e368a98b.js",
    "revision": "8a428a8b8fc6d75abab8a6408faafdcb"
  },
  {
    "url": "assets/js/54.2a88f804.js",
    "revision": "bd95505cfbeaf661f77a65f0364f28a8"
  },
  {
    "url": "assets/js/55.98e1c50f.js",
    "revision": "36b31a9beea59fc3d762031679fe23cf"
  },
  {
    "url": "assets/js/56.f6871679.js",
    "revision": "024235c5efb1dba3bb5402f14fa72f1f"
  },
  {
    "url": "assets/js/57.399d1ca3.js",
    "revision": "a957cbd2f5fdce0c3844ccfd5c4deaa2"
  },
  {
    "url": "assets/js/58.9950ba6e.js",
    "revision": "6c7e3b18ef7c71260c1022ace318c8d8"
  },
  {
    "url": "assets/js/59.dde38f82.js",
    "revision": "d67af9d1457ae120b39c0d772b4a4c1d"
  },
  {
    "url": "assets/js/6.dc286500.js",
    "revision": "76bf56967d8054a9f427c500cbea5632"
  },
  {
    "url": "assets/js/60.0561d845.js",
    "revision": "bb68a37be661f953acfc7b09cbd6de84"
  },
  {
    "url": "assets/js/61.e5ff37d9.js",
    "revision": "73a3bed995b5edb042884556c66560bb"
  },
  {
    "url": "assets/js/62.d8345631.js",
    "revision": "62942f7f9b0334688e7b267966c7005a"
  },
  {
    "url": "assets/js/63.88af5898.js",
    "revision": "111a56509795860d3166990a000ddb36"
  },
  {
    "url": "assets/js/64.9d152829.js",
    "revision": "3fc1e59701ef3e8c9445e6451cc36936"
  },
  {
    "url": "assets/js/65.0b3c68b5.js",
    "revision": "f525c5ed61b9d988ff22156593620a23"
  },
  {
    "url": "assets/js/66.d9cb03c1.js",
    "revision": "2f9517efd59e6762bd81e044ccf30ab3"
  },
  {
    "url": "assets/js/67.4e7defde.js",
    "revision": "4f6829f1f676a15f243c1f237ad21aa3"
  },
  {
    "url": "assets/js/68.9639661b.js",
    "revision": "fb14ad9b351f55502e22e95d5ddf14dc"
  },
  {
    "url": "assets/js/69.a8995f74.js",
    "revision": "f84db7fa900e8da8af17141ad7b98877"
  },
  {
    "url": "assets/js/7.ad32fd31.js",
    "revision": "f9427410c51d3d051090525200879b2e"
  },
  {
    "url": "assets/js/70.3abf2bb4.js",
    "revision": "eda4066f44d2a1cf1c9f38345c54be55"
  },
  {
    "url": "assets/js/71.061c6832.js",
    "revision": "5073e8cd4f30ea606ae4923e4c5cae28"
  },
  {
    "url": "assets/js/72.0da682bc.js",
    "revision": "07c53e8886b43efce34d2e4965b7bc4a"
  },
  {
    "url": "assets/js/73.9fa65361.js",
    "revision": "f6c1ff5bc5354a35eb82ca68b12db8e8"
  },
  {
    "url": "assets/js/74.c3c02692.js",
    "revision": "f7ad56c20160b74f1afb3dec867dcda5"
  },
  {
    "url": "assets/js/75.a14d0dea.js",
    "revision": "7a19376532b366e8f5d46071e5f72e89"
  },
  {
    "url": "assets/js/76.a0906d46.js",
    "revision": "9902566928d73f3a26d86c585e9016cb"
  },
  {
    "url": "assets/js/77.0e2e1410.js",
    "revision": "0a7867c17100e615b3038bee1f67ef0c"
  },
  {
    "url": "assets/js/78.514139cb.js",
    "revision": "01aa41fd8927eea91f55741e570cf9bd"
  },
  {
    "url": "assets/js/79.af2fc428.js",
    "revision": "ce349a08bc52612f769e670fb7ea70e1"
  },
  {
    "url": "assets/js/8.3532e2cd.js",
    "revision": "a42e9b83ce302651da6a02b8d8bc8e09"
  },
  {
    "url": "assets/js/9.55aa1538.js",
    "revision": "385b4131301b26ac5453115b71f7fc86"
  },
  {
    "url": "assets/js/app.f18c4670.js",
    "revision": "f1d96fb2c2cf78c09cd4281a2888d391"
  },
  {
    "url": "assets/js/vendors~flowchart.a1e8bc2b.js",
    "revision": "650c19a076335662d76ee3048e5552f5"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "ef051462fdaf28548192d917fa7aa24e"
  },
  {
    "url": "c/index.html",
    "revision": "9bf3db784bbd49748d4ad7b1f0338747"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "03ec0ebce3a1fc6b764a40edb6e57d93"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "f636f94b52b07884bd7b9a959f37dd99"
  },
  {
    "url": "deep-learning/python-and-vectorization.html",
    "revision": "cbd4798286871250cd4a3a2e009850cb"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "framework/activity-launching-process.html",
    "revision": "2cc7f65517c86e3ab70cbf1236f07ed1"
  },
  {
    "url": "framework/container.html",
    "revision": "a89d6abd3c3d2323c49a1d57583d78f6"
  },
  {
    "url": "framework/index.html",
    "revision": "d87d1ae7025558e42be3e0fbec54f501"
  },
  {
    "url": "framework/performTraversal.html",
    "revision": "d8288af016005730032836dd7f832d2b"
  },
  {
    "url": "hadoop/index.html",
    "revision": "34049561ce63e38608a1667aea8a549d"
  },
  {
    "url": "hello-world/array-and-linked-list.html",
    "revision": "f575106ed516f20f01bf376f8baf6038"
  },
  {
    "url": "hello-world/binary-search.html",
    "revision": "7fba7dd9508818d930db7a219ed2e11f"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "e8c661fd553eb46eed355e0eb80cee8d"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "767487226d9eba0a3f7a3ebfb1cbdad9"
  },
  {
    "url": "hello-world/index.html",
    "revision": "2b1af6a1a6744be1ee5d5082bb4e78ea"
  },
  {
    "url": "hello-world/setup-a-server-manually.html",
    "revision": "873f3a99e5f4279c534692067107fe40"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "27edbfa8b3e3e5919402a5dc0acd155d"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "7bf255d79ad23baf196b293c04b94afe"
  },
  {
    "url": "img/ahza-white.png",
    "revision": "3c642eba43abc55fb6555dab8d743fcd"
  },
  {
    "url": "img/android/defualt_container.png",
    "revision": "d7bd7560164386ecd16d80c841a62e07"
  },
  {
    "url": "img/android/feature.png",
    "revision": "f3bf92a4586b67dec2f4ef6cc9cabc7a"
  },
  {
    "url": "img/android/recorder_container.png",
    "revision": "c8acdbc5bbfadf5a2c40979e57d13c16"
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
    "revision": "0144e9c1b0330ea6f42a14d4b921b196"
  },
  {
    "url": "img/gradientDescent.svg",
    "revision": "fec0b9f9f8f04ffd90a6c288a8057194"
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
    "revision": "307312a03c26737544e8bb2afa863f22"
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
    "revision": "c72fcf3ba337d232e25e74cc520a5bee"
  },
  {
    "url": "img/LRGD_repeat.svg",
    "revision": "7d7d27b562fec5ec99c04ec4ae09478f"
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
    "revision": "0124c6808e352e979f6d230727b25dcc"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "32ea895b2e2409eb745140dffa1a9bbe"
  },
  {
    "url": "java/API-io.html",
    "revision": "4473977416a8db6a40d54b43b3b58e10"
  },
  {
    "url": "java/API-lang.html",
    "revision": "7e987e123403cc3b26b4a7fb09431882"
  },
  {
    "url": "java/API-lang2.html",
    "revision": "bc641842b672f24c1cbbf57b433e3804"
  },
  {
    "url": "java/API-util.html",
    "revision": "62e9960b9375a46bc0acd1829860c6b0"
  },
  {
    "url": "java/API-util2.html",
    "revision": "13472d6437d08ec030039017f7993882"
  },
  {
    "url": "java/API-util3.html",
    "revision": "cf375a8af1f75e32f770de785a4d23dc"
  },
  {
    "url": "java/grammars.html",
    "revision": "6d3e2bde4b6ced7dd81906a2d006785a"
  },
  {
    "url": "java/index.html",
    "revision": "311f072a033e262908aaa083f0144bde"
  },
  {
    "url": "java/jvm.html",
    "revision": "9f1814cdba4c4441a5a5db5c9043c8a0"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "08c36a301ffb6ca5d1322ab81c527348"
  },
  {
    "url": "java/references.html",
    "revision": "9dcd5aabfa0355f8ad2941d0eb611ff5"
  },
  {
    "url": "kotlin/index.html",
    "revision": "862564412ce8116580b922d5b7f7b10e"
  },
  {
    "url": "math/index.html",
    "revision": "3c0df958072f16223d8115ed36f1d5c8"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "f1cab9ef7e6dd680f2e3c4480cfa83eb"
  },
  {
    "url": "mysql/divide.html",
    "revision": "687efe4a5a1945dfb7b97889281226f2"
  },
  {
    "url": "mysql/index.html",
    "revision": "e78b2fcd93b4a53be5557707067798d2"
  },
  {
    "url": "mysql/indices.html",
    "revision": "4b5f896b3d834a523f4b660f4c9788ae"
  },
  {
    "url": "mysql/lock.html",
    "revision": "7bc1011628a82245b42d6db1bc937da0"
  },
  {
    "url": "mysql/question.html",
    "revision": "ded7d881b4157343e5eb6ecf2c1d757a"
  },
  {
    "url": "mysql/references.html",
    "revision": "5100ddbccfa49190c91f52244b105669"
  },
  {
    "url": "mysql/transaction.html",
    "revision": "e61e3b400a12af0e8429abacab54e0d0"
  },
  {
    "url": "python/grammar.html",
    "revision": "5cfb5d79a958046ce1f17e19cb3bf50b"
  },
  {
    "url": "python/index.html",
    "revision": "988eb6f3a7ed1f5c6e3f6a57debd344e"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "2b8ef3cf9c18e6378ad831f9ac9d4c06"
  },
  {
    "url": "recommender-systems/index.html",
    "revision": "57c4d3557f7dd1c09567ede7547dfe01"
  },
  {
    "url": "recommender-systems/introduction.html",
    "revision": "a0510c26729d820e17d7307d2cccb423"
  },
  {
    "url": "redis/cache.html",
    "revision": "7946a28f68f2836ce918290263b42f65"
  },
  {
    "url": "redis/cluster.html",
    "revision": "fc26587e8ddad789afe2ebb5b18dd127"
  },
  {
    "url": "redis/data-structure.html",
    "revision": "bc299a863589c307a7aa1e057a0ceb5e"
  },
  {
    "url": "redis/index.html",
    "revision": "8848cab79af69f5e5abbc00804c93bb5"
  },
  {
    "url": "redis/persistence.html",
    "revision": "86ebb44c2fed0827071f376d3f9de508"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "d5e1c3e7ea95592dfef267e68781c554"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "a05e578f2869777a85b54a357fe29b0c"
  },
  {
    "url": "spring/index.html",
    "revision": "2151789409bafaa45b1792a533e11f9b"
  },
  {
    "url": "spring/ioc.html",
    "revision": "661aac7ae290a2733b0cb0a57c4023d4"
  },
  {
    "url": "spring/overall.html",
    "revision": "7059192631356b1c79826b6030a52ad8"
  },
  {
    "url": "spring/references.html",
    "revision": "78a719bfce51524f7296d5cb64a72c89"
  },
  {
    "url": "web/HTTP.html",
    "revision": "8e47210e4f7aeb130384903e6c5cbc4b"
  },
  {
    "url": "web/index.html",
    "revision": "d3adb345cd89b62873cf23f48853d657"
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
