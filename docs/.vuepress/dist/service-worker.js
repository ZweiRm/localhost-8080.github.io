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
    "revision": "20d975ff0895a62b199fa05f2d22216d"
  },
  {
    "url": "about/index.html",
    "revision": "9e342fc320983fc02b44f3fd1caafffa"
  },
  {
    "url": "algorithm/ds-001.html",
    "revision": "fda06707a6c023bc63d4b142eb9b9071"
  },
  {
    "url": "algorithm/ds-002.html",
    "revision": "3330707a3882472c4ada04994aefc1e5"
  },
  {
    "url": "algorithm/ds-003.html",
    "revision": "1831d9f6f433a923100ece0851e0a6d1"
  },
  {
    "url": "algorithm/dynamic-programming.html",
    "revision": "b2e90c17a5032bd0c7b74ad9e8ca6ded"
  },
  {
    "url": "algorithm/index.html",
    "revision": "fe680e939b6c9c39e92656540b9b7074"
  },
  {
    "url": "artificial-intelligence/index.html",
    "revision": "d0affedb33c81b3955e6585ea269bff1"
  },
  {
    "url": "artificial-intelligence/search-strategies.html",
    "revision": "5ccd4735ce7b71da161769cf7de0d9c4"
  },
  {
    "url": "assets/css/0.styles.6382141a.css",
    "revision": "445fa596d1ca431a128e827ff4503165"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.1f46c297.js",
    "revision": "119094d3130c325147eb13088122c6c0"
  },
  {
    "url": "assets/js/11.449ff39e.js",
    "revision": "00ba263a4cbaf772b983dd05ea1d839f"
  },
  {
    "url": "assets/js/12.f7ff0156.js",
    "revision": "ffa8728458a8097974f3b8c1ed0a9330"
  },
  {
    "url": "assets/js/13.8cdb9f48.js",
    "revision": "70549643eb51875504f3ed7da79fe048"
  },
  {
    "url": "assets/js/14.c3a6a9a4.js",
    "revision": "bc3ab404db957ecd9b332a3b98f9be5a"
  },
  {
    "url": "assets/js/15.759ce6ab.js",
    "revision": "f273c1b2233738657e686dc16ff5aa40"
  },
  {
    "url": "assets/js/16.d20a125e.js",
    "revision": "e1b449146ad5f207a1e0ce62d77d3ebd"
  },
  {
    "url": "assets/js/17.d619071a.js",
    "revision": "8ef3dcbe6bcab413049cd578eeeb9324"
  },
  {
    "url": "assets/js/18.1b72c8c2.js",
    "revision": "d24ab918fc0a852711874769f50b5d7a"
  },
  {
    "url": "assets/js/19.61c84a12.js",
    "revision": "be0daf6183029785e28540f09fc14af4"
  },
  {
    "url": "assets/js/20.38e2471b.js",
    "revision": "5b470e68da026093313f6d7e089ec391"
  },
  {
    "url": "assets/js/21.8df11d1e.js",
    "revision": "ce5111a7d993c72b6c80e9895010d7f3"
  },
  {
    "url": "assets/js/22.63471661.js",
    "revision": "c037dc880a7bad73a6b081892c2be576"
  },
  {
    "url": "assets/js/23.96fc402c.js",
    "revision": "1fddcfb86941f0f2c4140875cc7b9391"
  },
  {
    "url": "assets/js/24.1d3bd729.js",
    "revision": "df56a9e0654a6ed7e052350ca5147d59"
  },
  {
    "url": "assets/js/25.691f7183.js",
    "revision": "4c96ba7b05316b993ec22a1410c52c7f"
  },
  {
    "url": "assets/js/26.1be74880.js",
    "revision": "149a0756a6c556db8c7927d41895ffe7"
  },
  {
    "url": "assets/js/27.6878d80b.js",
    "revision": "5752fda1dc6d0adef856f7e140b529d8"
  },
  {
    "url": "assets/js/28.195d5a53.js",
    "revision": "e4b79edce8eda5b1f67dcc32cc2841fb"
  },
  {
    "url": "assets/js/29.50f7c2fc.js",
    "revision": "c8db954f6dd70a2023ef8716fea17236"
  },
  {
    "url": "assets/js/3.f16a11d9.js",
    "revision": "51c668df1cffe05e815f4bc08f9a8d03"
  },
  {
    "url": "assets/js/30.9a69c147.js",
    "revision": "9196753bb6eabb678c394edf25298993"
  },
  {
    "url": "assets/js/31.1985f808.js",
    "revision": "1ea3a312fad34fa7798afecc3269a3f5"
  },
  {
    "url": "assets/js/32.9f9ed09b.js",
    "revision": "69935834bcf0be23956d11c7df4febd5"
  },
  {
    "url": "assets/js/33.0d85c989.js",
    "revision": "1810fd9f962c9f7dd994c39d8bebfa18"
  },
  {
    "url": "assets/js/34.c2c9495f.js",
    "revision": "c11830eadd62ae55bbb7f7dbbb3e6e5b"
  },
  {
    "url": "assets/js/35.7effc945.js",
    "revision": "5af8333c51be1ca4063a06e3aa7a7e17"
  },
  {
    "url": "assets/js/36.a71544b4.js",
    "revision": "bee64ed07a680b9cbd367dc16c59c9d5"
  },
  {
    "url": "assets/js/37.d46bbbac.js",
    "revision": "63e792dcd3cd59cc75922be534da1d39"
  },
  {
    "url": "assets/js/38.35fcd320.js",
    "revision": "8c80067b6e2f71b1e1eab39e70b1e67b"
  },
  {
    "url": "assets/js/39.70f603ea.js",
    "revision": "05cb86caa1ea6d340735386861b20f25"
  },
  {
    "url": "assets/js/4.7cece187.js",
    "revision": "990e829b4a08bedd969bcb50d2c33927"
  },
  {
    "url": "assets/js/40.e74b232d.js",
    "revision": "f18c8b5dfea4abd1ae790a5799add8a1"
  },
  {
    "url": "assets/js/41.f7c36f1c.js",
    "revision": "d866496c951fdf5ba3dc6e6ce0ce18a8"
  },
  {
    "url": "assets/js/42.5662d17c.js",
    "revision": "5f39379007720d51731199a6a09b4205"
  },
  {
    "url": "assets/js/43.89ee8a53.js",
    "revision": "f4472336c83dbb3bc5e8e0c447215166"
  },
  {
    "url": "assets/js/44.67b21846.js",
    "revision": "b7371469cb06e880012dfc637c9ac84d"
  },
  {
    "url": "assets/js/45.22530598.js",
    "revision": "de3f1ea46e4a1209daa3d4eb019b7e94"
  },
  {
    "url": "assets/js/46.157094fd.js",
    "revision": "85581953b5cb7f401aeb6e5e00a165d9"
  },
  {
    "url": "assets/js/47.f5776896.js",
    "revision": "475b4b9fbb978756ae96bf28eafb0153"
  },
  {
    "url": "assets/js/48.e6bab344.js",
    "revision": "79d9b5be566b1c88aff221c36f42b819"
  },
  {
    "url": "assets/js/49.3ca5b231.js",
    "revision": "b507220a910462ee96411badb854577c"
  },
  {
    "url": "assets/js/5.d3ba6d1f.js",
    "revision": "ebe42a1d7c0d3959e0844f025b1eb515"
  },
  {
    "url": "assets/js/50.7c20143a.js",
    "revision": "4583189f43fb7cadaeafc4a615d181a2"
  },
  {
    "url": "assets/js/51.ae170296.js",
    "revision": "eff9cf396840e1a870797b98c645c673"
  },
  {
    "url": "assets/js/52.035ff789.js",
    "revision": "dbb25ecf6ecbc20eaee86250f4d2e96f"
  },
  {
    "url": "assets/js/53.2157ee4d.js",
    "revision": "0d81b6150f70a7fb05455adc24d9babe"
  },
  {
    "url": "assets/js/54.875062a9.js",
    "revision": "adb5cc35ae1266fd557d3131571b73f8"
  },
  {
    "url": "assets/js/55.3c1d6e2d.js",
    "revision": "fd158efda7dbb015f36b1e7dd8807a8d"
  },
  {
    "url": "assets/js/56.49533393.js",
    "revision": "4c87f2bf327c644d80c2fb84800d4cac"
  },
  {
    "url": "assets/js/57.94a42390.js",
    "revision": "adf023915ec0376af8a710513d5384bf"
  },
  {
    "url": "assets/js/58.a8900908.js",
    "revision": "c25aa45eeb9068e1e9aa7cede3bf4a56"
  },
  {
    "url": "assets/js/59.e2613f71.js",
    "revision": "9a3329d650ae4fc79bb6e0c39b7d7341"
  },
  {
    "url": "assets/js/6.a2b0fa3b.js",
    "revision": "d1bba85e4a369c6ff8a833d8662f239f"
  },
  {
    "url": "assets/js/60.62e40dd6.js",
    "revision": "805235db50fef2e664b37ed941e8857a"
  },
  {
    "url": "assets/js/61.24561ebe.js",
    "revision": "0d25835013d0174b3a94a9ea7e4b70cb"
  },
  {
    "url": "assets/js/62.11417602.js",
    "revision": "0646891d6300f1b4cc79a39a29d86e1e"
  },
  {
    "url": "assets/js/63.88eb3c51.js",
    "revision": "7e663d1836e01ff9a8e9319dd62863d7"
  },
  {
    "url": "assets/js/64.89633b41.js",
    "revision": "c479d35ec4faeb4aac6e2eed2f7ebe61"
  },
  {
    "url": "assets/js/65.7d0a9885.js",
    "revision": "d7c1eb57dfae57947fe64440cbe43bda"
  },
  {
    "url": "assets/js/7.cb3ad9d4.js",
    "revision": "10336b61d403d79b8b1fd51ae440ac55"
  },
  {
    "url": "assets/js/8.dd482055.js",
    "revision": "4188f89cb432ab6a44ff42a2d93937cd"
  },
  {
    "url": "assets/js/9.c720fa3e.js",
    "revision": "07fbfe6327c56823353ca2bc686775bb"
  },
  {
    "url": "assets/js/app.3208146d.js",
    "revision": "616d5917a5a83f59e36c8dfeac78fb6c"
  },
  {
    "url": "assets/js/vendors~flowchart.ac4cbdfa.js",
    "revision": "eeb33254f1b1bd4815d11cbfef369465"
  },
  {
    "url": "big-data/index.html",
    "revision": "dabac27a6dd663f45585488e976a9ee2"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "1d7e9072e867f26371be178e1b9a92d7"
  },
  {
    "url": "c/index.html",
    "revision": "a97fba00a81fdce43f681da59dee911f"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "bfdee5c0d8b40c66bcf6b3a13fa32134"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "6a8f74136441c4c4daf91ed75c4a3048"
  },
  {
    "url": "deep-learning/python-and-vectorization.html",
    "revision": "aa184452f4c7e066c9960370288b5f19"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "hello-world/array-and-linked-list.html",
    "revision": "d5c9575bc79961dc4ad3cf9d6923032c"
  },
  {
    "url": "hello-world/binary-search.html",
    "revision": "5c94d5d80ff8d6ba0ba0911986750c3b"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "3ee54562e0f0fbde3ee9356b136cc524"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "d6792783a471b803ff5f46623f0bb66e"
  },
  {
    "url": "hello-world/index.html",
    "revision": "9bbc1c039835c2a10a6ea6c6702d2dc5"
  },
  {
    "url": "hello-world/setup-a-server-manually.html",
    "revision": "4de087aecc9a403a400fcf4825ad3907"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "0fce6bb82196847958147a20fa660bb3"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "0b782cc5af7962b6d06af6db6ec1a436"
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
    "revision": "3500e4fe4be2cd7f44810d100a0373d8"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "9a5b6aa30c75a64abdb45055d1682663"
  },
  {
    "url": "java/API-io.html",
    "revision": "bd643e772c082d1e68ff25d7f5973e78"
  },
  {
    "url": "java/API-lang.html",
    "revision": "8d22e0bb17240a26fb27aacd1f6928c9"
  },
  {
    "url": "java/API-util.html",
    "revision": "80520b48f361e42c793173b328dd4f1a"
  },
  {
    "url": "java/grammars.html",
    "revision": "b8befd0a2d03aee5ae3f7a99d851922a"
  },
  {
    "url": "java/index.html",
    "revision": "9daeccf131ecaffd80f44f8ea89126bb"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "4522637053fef0d4d3b033f32e51b630"
  },
  {
    "url": "java/references.html",
    "revision": "7f85eab8682df2f6e183621c1146e4c2"
  },
  {
    "url": "kotlin/index.html",
    "revision": "5a9c576a004b9c38c9916e706b6616c0"
  },
  {
    "url": "math/index.html",
    "revision": "54ee94c95ea972745cd4e3d6f7f175ba"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "e9230dd9eb8f9d560cba507c3cfebb9f"
  },
  {
    "url": "mysql/divide.html",
    "revision": "1f321143c15b39b314805f186c7f1685"
  },
  {
    "url": "mysql/index.html",
    "revision": "69afcc70f269a62975f10592915912da"
  },
  {
    "url": "mysql/indices.html",
    "revision": "7ba8898163ea96d4f4e55c8b691895d5"
  },
  {
    "url": "mysql/lock.html",
    "revision": "22b49fcf87d5b0daa91c4bd41d568879"
  },
  {
    "url": "mysql/question.html",
    "revision": "dac34f8abbe1327c343ff6a0e1a1df7f"
  },
  {
    "url": "mysql/references.html",
    "revision": "b00a591c14661fb8c81930d354f7bda3"
  },
  {
    "url": "mysql/transaction.html",
    "revision": "7e42acfe65143579023c645a569d5c36"
  },
  {
    "url": "python/grammar.html",
    "revision": "506447a3794363708b97a8ec0c8e9a49"
  },
  {
    "url": "python/index.html",
    "revision": "340e3c842ff83485daf64af32aa15988"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "0a65fe1be5660658eab43b4bc8933a2e"
  },
  {
    "url": "recommender-systems/index.html",
    "revision": "a037783c6e79058e07ecd912d95bce12"
  },
  {
    "url": "recommender-systems/introduction.html",
    "revision": "6990df157b00fa6b2792a39658277b78"
  },
  {
    "url": "redis/cache.html",
    "revision": "1018014a3e0920424140ae4e76d41b0b"
  },
  {
    "url": "redis/index.html",
    "revision": "e9c1ef1aebee9501b4b59a745b1e38af"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "fe605b729d1eeb3b0d75ae1670d0c9e4"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "b57825e51a14358d832c4c4c0dad7042"
  },
  {
    "url": "spring/index.html",
    "revision": "2796c9f657eb6c262ee00b0e52fe066c"
  },
  {
    "url": "spring/ioc.html",
    "revision": "bfb1a1f2179bf9a27c7f14228d0cd0b4"
  },
  {
    "url": "spring/overall.html",
    "revision": "ddd1d8e172092de02c71077dee765a37"
  },
  {
    "url": "spring/references.html",
    "revision": "572ae43784c8fb95d6907f9a5a71a90e"
  },
  {
    "url": "web/HTTP.html",
    "revision": "0bb0aedaf6daf15f392a9be55c2a9e1b"
  },
  {
    "url": "web/index.html",
    "revision": "28db2bb4c4a13541fed559197a521b45"
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
