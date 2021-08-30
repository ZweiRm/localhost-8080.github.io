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
    "revision": "d1470b3dc506ce71a3a8a896424a4a29"
  },
  {
    "url": "about/index.html",
    "revision": "bf1be8425ba82787a67f44cdac59b7f8"
  },
  {
    "url": "algorithm/ds-001.html",
    "revision": "eefe0689c166451cb6c7a75d89d8b26f"
  },
  {
    "url": "algorithm/index.html",
    "revision": "a992d17e2c1637a4745e33a00e5b7cdc"
  },
  {
    "url": "artificial-intelligence/index.html",
    "revision": "57fc2331b509bab31342e462f34bd0a0"
  },
  {
    "url": "artificial-intelligence/search-strategies.html",
    "revision": "e9449122f5decfa92b9f4513d118cb9b"
  },
  {
    "url": "assets/css/0.styles.d86c96e9.css",
    "revision": "e7913038d4a7071402768445e87c7bee"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.659d688c.js",
    "revision": "4c89bfc0e19de480af360aa264210f0a"
  },
  {
    "url": "assets/js/11.1a2e2c62.js",
    "revision": "8ec089fad3d47ea0f9523f565146589a"
  },
  {
    "url": "assets/js/12.8eb80cdb.js",
    "revision": "733968546b075000b3a3f7011fc7dcbd"
  },
  {
    "url": "assets/js/13.d4f1fd06.js",
    "revision": "66973e98e877ae537274d047cd5f7a81"
  },
  {
    "url": "assets/js/14.75611cbe.js",
    "revision": "eda00cda1c1ab6f881a54163ad4481ac"
  },
  {
    "url": "assets/js/15.e3c0c5b0.js",
    "revision": "dba7338e66920ef2fdc336e986553871"
  },
  {
    "url": "assets/js/16.796b7074.js",
    "revision": "aa06104abe4a0b0fbeefb0b25025351a"
  },
  {
    "url": "assets/js/17.26483284.js",
    "revision": "85d014b250933c971ed0f7aff9aa1fb7"
  },
  {
    "url": "assets/js/18.f63e49c6.js",
    "revision": "71115b0407b3ad0372eea1e296fab354"
  },
  {
    "url": "assets/js/19.ace63165.js",
    "revision": "9bc3b6ea228283fa022a263f989f7fde"
  },
  {
    "url": "assets/js/20.8cdbdf4d.js",
    "revision": "990be27f8d674d19537e3f2f3ecb6ec7"
  },
  {
    "url": "assets/js/21.a87f2737.js",
    "revision": "f5d68837cd5f89f25d69250ac5507191"
  },
  {
    "url": "assets/js/22.8bcdd9dd.js",
    "revision": "e4e41e7430ab2d97d7fee799d07d84d2"
  },
  {
    "url": "assets/js/23.6cd5c641.js",
    "revision": "592bee4a9051723cd03c4a68f51b3660"
  },
  {
    "url": "assets/js/24.37e9f8d5.js",
    "revision": "9bee8c0730fc11b4df1ae89a9ce465e7"
  },
  {
    "url": "assets/js/25.136785b7.js",
    "revision": "a2e18b2108d3ff779818ac39905d56ca"
  },
  {
    "url": "assets/js/26.0183f231.js",
    "revision": "bd60a8ec1d3c26ead97b642d687a8650"
  },
  {
    "url": "assets/js/27.af8afb73.js",
    "revision": "19412def66e19efb978585a305029aba"
  },
  {
    "url": "assets/js/28.f8559ab3.js",
    "revision": "90372b8d8aba8e15237ec63b8b206b20"
  },
  {
    "url": "assets/js/29.f37daf6a.js",
    "revision": "1d353407df7eb6d9c9066ac99806fa4e"
  },
  {
    "url": "assets/js/3.edba18b2.js",
    "revision": "62870d284e83e738185e7d378e209234"
  },
  {
    "url": "assets/js/30.c543aece.js",
    "revision": "7320696c13b51428bc6d42696a221e14"
  },
  {
    "url": "assets/js/31.81c9dab3.js",
    "revision": "81fc7af2d3c7269df63692e4adacd5ab"
  },
  {
    "url": "assets/js/32.6a26bfb9.js",
    "revision": "4cd4871c2311b2085e91c90c9186d85e"
  },
  {
    "url": "assets/js/33.79d40e34.js",
    "revision": "96457e3ef77557177603f081abbbac96"
  },
  {
    "url": "assets/js/34.189fb7a9.js",
    "revision": "e46e539b3ae409067f599bc6e0573750"
  },
  {
    "url": "assets/js/35.4393866e.js",
    "revision": "8f0fb0a17b80a42bf34b21c9555c1880"
  },
  {
    "url": "assets/js/36.610aaf93.js",
    "revision": "6c58de3152b42677f65a97a32308cd4a"
  },
  {
    "url": "assets/js/37.967b833d.js",
    "revision": "945aa05430098c4743262c120eb6c8a2"
  },
  {
    "url": "assets/js/38.fdf4c72b.js",
    "revision": "e2e21b5af7b6d35d5e178c88f3c0bfb9"
  },
  {
    "url": "assets/js/39.abcceb81.js",
    "revision": "41707b6729df3d91d49184911291045a"
  },
  {
    "url": "assets/js/4.3e9ac5f8.js",
    "revision": "be4c1d30061d60d51d8015edd35bf5dd"
  },
  {
    "url": "assets/js/40.5f0d77f9.js",
    "revision": "f9081a56c8a2b7f76c291da5882731be"
  },
  {
    "url": "assets/js/41.bd84d893.js",
    "revision": "b669579ba9aca7b74a193d2ecf583194"
  },
  {
    "url": "assets/js/42.a9e42a26.js",
    "revision": "7400a32764e8e2d4c65fc22adf357889"
  },
  {
    "url": "assets/js/43.d02e1559.js",
    "revision": "8fd1f040cb7f4b264bbd45a506d6117b"
  },
  {
    "url": "assets/js/44.c4b99328.js",
    "revision": "a8c3dc871d3dd2d397cb88a8ba6de5c8"
  },
  {
    "url": "assets/js/45.e3ab67de.js",
    "revision": "7276f33a02f5baca0fe6b5aae8629e86"
  },
  {
    "url": "assets/js/46.7c349191.js",
    "revision": "31e71cc84b05b7a2cd2b8c8e368ed2fb"
  },
  {
    "url": "assets/js/47.e0a56d7e.js",
    "revision": "63fd10aeb64c87d3dc353f3ce7d7ad95"
  },
  {
    "url": "assets/js/48.b9afcc51.js",
    "revision": "72024c183146989f248a3fc0d3ab8e60"
  },
  {
    "url": "assets/js/49.6dd727b6.js",
    "revision": "b43f7661339c1de8b46181b86ccfd2f0"
  },
  {
    "url": "assets/js/5.74cf20d1.js",
    "revision": "0db79385c7d26c84d68b8b413a4c7c1e"
  },
  {
    "url": "assets/js/50.31d22d9d.js",
    "revision": "a0a964ee8b39c42f295bcd0c16f1beea"
  },
  {
    "url": "assets/js/51.d2990646.js",
    "revision": "42e81d32d7fe2394661996008c755f5e"
  },
  {
    "url": "assets/js/52.80b714d7.js",
    "revision": "742f8072b21f438b076b414073672725"
  },
  {
    "url": "assets/js/53.2f275891.js",
    "revision": "1b5ebde6a0ebade835afd7ac63681cb9"
  },
  {
    "url": "assets/js/54.8ab1ff15.js",
    "revision": "8f8aa5be3723e12e741e7415f1f10ea5"
  },
  {
    "url": "assets/js/55.dd6da70d.js",
    "revision": "d55053beee776fde8e02ad0c5a8976fc"
  },
  {
    "url": "assets/js/56.6200d7b5.js",
    "revision": "6c4088efe379ebc89f8d2967b3dafee4"
  },
  {
    "url": "assets/js/57.c4c843c7.js",
    "revision": "d1d9eb8caa66c9823ff23e9998c7f13b"
  },
  {
    "url": "assets/js/58.5e20b713.js",
    "revision": "09c85424ce4c334628aef46e050fe4b2"
  },
  {
    "url": "assets/js/6.9f2b6213.js",
    "revision": "103e3b5c0171cbcb0944ea1a3befa351"
  },
  {
    "url": "assets/js/7.9f42334e.js",
    "revision": "deb1877451b170e926806f5dc584f312"
  },
  {
    "url": "assets/js/8.2a6c6fce.js",
    "revision": "62968ccb26b5dc33f06de1248fae8c49"
  },
  {
    "url": "assets/js/9.f042e7fe.js",
    "revision": "2f016a642836771437de6f09aeb595f3"
  },
  {
    "url": "assets/js/app.2a231f70.js",
    "revision": "89e1e9739f6218417953d124804a434c"
  },
  {
    "url": "assets/js/vendors~flowchart.9798c266.js",
    "revision": "2a03dda502c94817fdd2392f9021dea0"
  },
  {
    "url": "big-data/index.html",
    "revision": "7f0a65a5aee6472203bc7d4f72b73bb7"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "d887cb785ae4ca2084918de95cee4688"
  },
  {
    "url": "c/index.html",
    "revision": "62b2564f58ebbbea9b24aa8d872fdfba"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "41d49349f06b40a339238b25c2f60474"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "656bb8bd1c18cd34b6c8805477c9231e"
  },
  {
    "url": "deep-learning/python-and-vectorization.html",
    "revision": "fab3077ed8b98de6d6089caceb6b9ab7"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "front-end/index.html",
    "revision": "4ecac422d348307839d3734b6479acde"
  },
  {
    "url": "hello-world/array-and-linked-list.html",
    "revision": "0346101fc8c998ee56ba73aec30562d1"
  },
  {
    "url": "hello-world/binary-search.html",
    "revision": "1f0a16379964fdb334e59b2de53921cd"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "38fae57df3390bf15d3361489975e0aa"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "d3753a06f66a8ce47cc9323b4568eaf6"
  },
  {
    "url": "hello-world/index.html",
    "revision": "ed483f4b4cd3f6ef206871054ccdedbe"
  },
  {
    "url": "hello-world/setup-a-server-manually.html",
    "revision": "fdd58c9aec5d53f410671f6c4039d842"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "d7a13501439feac68e5ba392c0dd553b"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "b0dcb76d6199ef1cf927cd2d766079be"
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
    "revision": "df4655e38d1627f99d847a095dcf8ab9"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "cf987032ea67e67f62dc762a7af84761"
  },
  {
    "url": "java/API-io.html",
    "revision": "5b575fd11115c30466ede082193b69a6"
  },
  {
    "url": "java/API-lang.html",
    "revision": "9c9b837f8f095ac1f3aeb0af7da1ecb6"
  },
  {
    "url": "java/API-util.html",
    "revision": "afa7b01af34f3df675ed84b6fffa379d"
  },
  {
    "url": "java/grammars.html",
    "revision": "349df8e73e6effec7dc994330b34b3f6"
  },
  {
    "url": "java/index.html",
    "revision": "438d7df50add58b2a6e99095f8464917"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "080d1a758a2ddf0cd3d957190374a0dd"
  },
  {
    "url": "java/references.html",
    "revision": "2840ce84fcc3f5624c7f9c74f92a0425"
  },
  {
    "url": "kotlin/index.html",
    "revision": "65ba0085f0ac7676a4da40b3c4a7d599"
  },
  {
    "url": "math/index.html",
    "revision": "7e2b657f081aebcaa51c9e12fda1f0f9"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "2db10303a457ea6f01bed3a6e634fd05"
  },
  {
    "url": "mysql/index.html",
    "revision": "9f23b1a9ac0ceaa75a418ad7faeab650"
  },
  {
    "url": "mysql/indices.html",
    "revision": "c003b1a22b598f65490e3f200560aff1"
  },
  {
    "url": "mysql/references.html",
    "revision": "5604baae1c6f758c1964109fcf96c751"
  },
  {
    "url": "mysql/transaction.html",
    "revision": "518e84ed2f9b01dbea3e22218cd5141d"
  },
  {
    "url": "python/grammar.html",
    "revision": "970959c0214d5d37dfcde43f0180723b"
  },
  {
    "url": "python/index.html",
    "revision": "7223370105c3699878bf78e697b2bb30"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "a3fe5bc575a4dea4a38aad501bc1d121"
  },
  {
    "url": "recommender-systems/index.html",
    "revision": "6edb3df3232762459675704d35548be0"
  },
  {
    "url": "recommender-systems/introduction.html",
    "revision": "a1d67b597a4f7bccb0d9c3302c0936fe"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "f255ab2b4b1ef0ac67fb487445eb8d59"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "24024acd8264660732792d9d719f65bd"
  },
  {
    "url": "spring/index.html",
    "revision": "236ac46c740e0eba6dc4bc9b3400aa81"
  },
  {
    "url": "spring/ioc.html",
    "revision": "c85863ff3259ae3fecb48ea4cc794dbe"
  },
  {
    "url": "spring/overall.html",
    "revision": "324046b41b8ecfee9b7e846d6fb7e399"
  },
  {
    "url": "spring/references.html",
    "revision": "6ff95691f36dba45fb16788833c66409"
  },
  {
    "url": "web/HTTP.html",
    "revision": "f8b2cd33c19e415999e525e8f1c2acde"
  },
  {
    "url": "web/index.html",
    "revision": "3bb4fe28e9efaa9a108336fb0768d56f"
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
