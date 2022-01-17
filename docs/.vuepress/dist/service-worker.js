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
    "revision": "ee0e1dd01d2c28063963fb0a458cf069"
  },
  {
    "url": "about/index.html",
    "revision": "ad250d1d3ca09e6225f5425c7cb42d3f"
  },
  {
    "url": "algorithm/ds-001.html",
    "revision": "9058f038670b27b0cdaf8f07fd9ef724"
  },
  {
    "url": "algorithm/ds-002.html",
    "revision": "0edb213e41a0dbf72e4ab3af22c785c6"
  },
  {
    "url": "algorithm/ds-003.html",
    "revision": "13237e64ea7b761dd974297299801159"
  },
  {
    "url": "algorithm/dynamic-programming.html",
    "revision": "dfbaca29306b51019cee313870104291"
  },
  {
    "url": "algorithm/index.html",
    "revision": "c51823519fbca77d8210fd8c938de352"
  },
  {
    "url": "artificial-intelligence/index.html",
    "revision": "cc73a13dce66141d8be2da8d9d56bb16"
  },
  {
    "url": "artificial-intelligence/search-strategies.html",
    "revision": "941f2213213e512b9150f22237bed54e"
  },
  {
    "url": "assets/css/0.styles.4368a130.css",
    "revision": "0982ddfc51467c5877df638298612cdb"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.391e7463.js",
    "revision": "ce5fcf6060d60748cd987af0c03aa660"
  },
  {
    "url": "assets/js/11.090783df.js",
    "revision": "189f58014d73d67a7afacd620b4f30dc"
  },
  {
    "url": "assets/js/12.90e9ae29.js",
    "revision": "a27e2dd974d6d5e9dc8cc26e758ffa2a"
  },
  {
    "url": "assets/js/13.32b63c4b.js",
    "revision": "d7f7f6aee9a10b0ddeb708acbe265db6"
  },
  {
    "url": "assets/js/14.31aa0923.js",
    "revision": "d0f0b0f9f8e50aa90faa6547302c4219"
  },
  {
    "url": "assets/js/15.870d6ab2.js",
    "revision": "4ffc00cbf2dca4b829ccb26ddd8d511e"
  },
  {
    "url": "assets/js/16.0f7e660d.js",
    "revision": "13357e13de7774051a378cec924d42ee"
  },
  {
    "url": "assets/js/17.a583d83f.js",
    "revision": "3ba155915c5f761dd08ac4702938ed5c"
  },
  {
    "url": "assets/js/18.370c1868.js",
    "revision": "0d7f1665f9bb1b26521f33192f8674cb"
  },
  {
    "url": "assets/js/19.4c094a86.js",
    "revision": "189ccb8e25f82133d89245db7e311f9f"
  },
  {
    "url": "assets/js/20.97815d08.js",
    "revision": "d656b2603fdc2acceaf12457740422e7"
  },
  {
    "url": "assets/js/21.2afbd32c.js",
    "revision": "8dbbbb8af1b55db9c533a993eb373d7c"
  },
  {
    "url": "assets/js/22.17f6cbac.js",
    "revision": "9f0e13cf6c678969f8f9b6b6dbdae57b"
  },
  {
    "url": "assets/js/23.7f59907d.js",
    "revision": "5d8836db7b71e5b15b98e383691ddc8b"
  },
  {
    "url": "assets/js/24.e723bea2.js",
    "revision": "c3534a126fbd6d09e8cf9b81f3381116"
  },
  {
    "url": "assets/js/25.b44f911a.js",
    "revision": "1895cd66c974937a99d7e151a750df8a"
  },
  {
    "url": "assets/js/26.145650a8.js",
    "revision": "f6267e1fe668b12d073d0e321f14521c"
  },
  {
    "url": "assets/js/27.f68eb525.js",
    "revision": "314e2d75b9999fbc213df88b42fb0622"
  },
  {
    "url": "assets/js/28.dcb8c383.js",
    "revision": "b33286c0338f85d7d6ee2b671a3fbf4c"
  },
  {
    "url": "assets/js/29.5fdc5fe4.js",
    "revision": "10b9a2c831f8698a6430e3a1695ef82a"
  },
  {
    "url": "assets/js/3.b8a4ce43.js",
    "revision": "7c9c6dcfb15576dc3f59c234b37c0c62"
  },
  {
    "url": "assets/js/30.a26a2bad.js",
    "revision": "12af6cf1400e5045c83ced4d588a028f"
  },
  {
    "url": "assets/js/31.385fced3.js",
    "revision": "896143da46e97e0eb1f98fbbeadf6fad"
  },
  {
    "url": "assets/js/32.d1e4223e.js",
    "revision": "8cd01b6432b85f2cbd336c70544c563f"
  },
  {
    "url": "assets/js/33.8d058876.js",
    "revision": "5217e8bcfe682e0067555abc3eae972c"
  },
  {
    "url": "assets/js/34.b86a477c.js",
    "revision": "5b82b05ecccb594eade1a0bfbead3374"
  },
  {
    "url": "assets/js/35.07e1c56b.js",
    "revision": "51e446cf9eb702a2a1649af7d759ec31"
  },
  {
    "url": "assets/js/36.e36b532f.js",
    "revision": "00ed1df450db4a053b9e1d1540c5f3f6"
  },
  {
    "url": "assets/js/37.f718701d.js",
    "revision": "6a746abcef6c29d068d82bc5b7353d0f"
  },
  {
    "url": "assets/js/38.76f3c9b7.js",
    "revision": "f47d4fb8b491f6f4defe6460984c5f57"
  },
  {
    "url": "assets/js/39.752db470.js",
    "revision": "3dae8a5659ae1302f838dc13f871059c"
  },
  {
    "url": "assets/js/4.849edfe7.js",
    "revision": "f7fe54a7045d2fbf3a24ae0dcece281b"
  },
  {
    "url": "assets/js/40.09f3eac7.js",
    "revision": "f36e285ee31b59c4ba50e2dbab273cb6"
  },
  {
    "url": "assets/js/41.3bee722f.js",
    "revision": "4962fea5538cda3395e8f659ad77a97f"
  },
  {
    "url": "assets/js/42.d698e159.js",
    "revision": "c4ba14e767841a3af12713c42855d8ff"
  },
  {
    "url": "assets/js/43.1ed6e04c.js",
    "revision": "f6e1ab946d25c8411668e7d609a7408c"
  },
  {
    "url": "assets/js/44.ad7ffc32.js",
    "revision": "eeccc82645bec3b260f5ef610ec963aa"
  },
  {
    "url": "assets/js/45.6c4a6ba0.js",
    "revision": "331d8632f102017452b31de83bf5555a"
  },
  {
    "url": "assets/js/46.e0ee1b14.js",
    "revision": "fb63ac6f98058497fc46715cf01db6a3"
  },
  {
    "url": "assets/js/47.e92edfef.js",
    "revision": "953bbaa20fe08bde48c8a0c6c230ceb8"
  },
  {
    "url": "assets/js/48.a9cac952.js",
    "revision": "b72e13b59a7bf47f2636c1fa5d0fc644"
  },
  {
    "url": "assets/js/49.8cdbdb16.js",
    "revision": "3ba85a66a013ce303e2e768047123440"
  },
  {
    "url": "assets/js/5.165522f3.js",
    "revision": "0f7f5b017c00dcda0ba9dfb84c88021c"
  },
  {
    "url": "assets/js/50.9e80cf93.js",
    "revision": "06d46ce936b2a832058481f9009b3c25"
  },
  {
    "url": "assets/js/51.db4abd75.js",
    "revision": "7c7e7c1c7e6a51da5064c2af14650667"
  },
  {
    "url": "assets/js/52.bb99d068.js",
    "revision": "144c273000b81403d35b9b7a61318d09"
  },
  {
    "url": "assets/js/53.77863696.js",
    "revision": "34148b178f1fd27c6d91e7ed93c2d8c7"
  },
  {
    "url": "assets/js/54.ec29b28a.js",
    "revision": "eb7a372a10d13b69d3bfd4d75d97da33"
  },
  {
    "url": "assets/js/55.9f8cef3a.js",
    "revision": "896d616a9ee89db2ae9040c1bb3503ba"
  },
  {
    "url": "assets/js/56.dd5712d7.js",
    "revision": "6e04b130bd0c7d84abebd2951706212e"
  },
  {
    "url": "assets/js/57.7ea6a099.js",
    "revision": "a0eb4d69700e5aabc4c03bd1d78ea695"
  },
  {
    "url": "assets/js/58.d9dde2db.js",
    "revision": "98b425fdd4b61cb644f04c03f47bc74e"
  },
  {
    "url": "assets/js/59.3e1c10d2.js",
    "revision": "d2f991334b256731359f411333a56436"
  },
  {
    "url": "assets/js/6.99f9a46c.js",
    "revision": "b5d589616163aa7351d0fe5111f65cd2"
  },
  {
    "url": "assets/js/60.7baddf72.js",
    "revision": "f6eec65c35cc2077ed0d761f89e370c6"
  },
  {
    "url": "assets/js/61.58bc617d.js",
    "revision": "831ddd38cc0ff74206c6713e8e13b0c9"
  },
  {
    "url": "assets/js/62.03e14552.js",
    "revision": "48ca8bbab8f3221119d01bda6d57a61d"
  },
  {
    "url": "assets/js/63.876a1278.js",
    "revision": "8d103b429f4f9c4d5ca703c2fdf234ec"
  },
  {
    "url": "assets/js/64.827951ca.js",
    "revision": "ff33556898b095e3ac4a5e9b0d6e9ebe"
  },
  {
    "url": "assets/js/65.e0be07e5.js",
    "revision": "767c962d71caa8922feef9d9f1891122"
  },
  {
    "url": "assets/js/66.da1e8d91.js",
    "revision": "20c4293302583e59ea0d81edcd0674b4"
  },
  {
    "url": "assets/js/7.5dbb61bd.js",
    "revision": "62485c9d52729b4453dd252d1b972462"
  },
  {
    "url": "assets/js/8.58affc76.js",
    "revision": "d1787f35797eedee038651849f08a094"
  },
  {
    "url": "assets/js/9.26d6672c.js",
    "revision": "457f78398b3c946abdd81bf1cc352a94"
  },
  {
    "url": "assets/js/app.a584d5e0.js",
    "revision": "4633e0a32e0d0534bfee523cabe30f11"
  },
  {
    "url": "assets/js/vendors~flowchart.9f766271.js",
    "revision": "905c6f5cb40a596b5fc84f882df9d66f"
  },
  {
    "url": "big-data/index.html",
    "revision": "542f9a5f8ec497f45a9111f557929231"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "b37114e679eee7950a1983ed2659257e"
  },
  {
    "url": "c/index.html",
    "revision": "8c55ae3707469f449bba6b09586d5962"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "f53666c7aede37df2f011c8aa18da24a"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "c3c1297c337d8cc03c7bab0f2d626454"
  },
  {
    "url": "deep-learning/python-and-vectorization.html",
    "revision": "44592db985b67693800d30c6c1e92166"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "hello-world/array-and-linked-list.html",
    "revision": "65c9f05e293667bf464b5d8d63d24cb4"
  },
  {
    "url": "hello-world/binary-search.html",
    "revision": "c961c74cca2edd1c67ff8a8257cbf8ee"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "0de5426d07345d1b4224ac8a5b3c6b95"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "d0c6eb20621db58dde486f2a63bca5f4"
  },
  {
    "url": "hello-world/index.html",
    "revision": "c66ae85c257481aa040e3177596bd589"
  },
  {
    "url": "hello-world/setup-a-server-manually.html",
    "revision": "d0badf312d022419da843d90deb7361b"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "e09310ad57bacb1c31a4cc3a40625fb8"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "8cb4d98a9e944fd915d90407a505f96c"
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
    "revision": "ca423dfb278a26cb17b6561c4c76494d"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "b40b7a4140a6c93e986f8a1261f87c62"
  },
  {
    "url": "java/API-io.html",
    "revision": "ef3e204883d3cc7ae77db98ccbc37dd6"
  },
  {
    "url": "java/API-lang.html",
    "revision": "51ae36b50abe2b457df7f2a75e285b53"
  },
  {
    "url": "java/API-util.html",
    "revision": "72ed6627f25377eba100b3bd1dc3f35e"
  },
  {
    "url": "java/grammars.html",
    "revision": "65dee810d57627a538f6ba2b8e49388c"
  },
  {
    "url": "java/index.html",
    "revision": "8391d13596f128c269c40cf781c18376"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "8f6e2f57de60d1d37025a4371daa4ae5"
  },
  {
    "url": "java/references.html",
    "revision": "3b7433deace94fe526fa48775bc57391"
  },
  {
    "url": "kotlin/index.html",
    "revision": "173258c782f510f5bb94b11e83173a4e"
  },
  {
    "url": "math/index.html",
    "revision": "ddea75e6c118245725cbf6c4d07cf3f0"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "7e9ba6443277262efb83827814fec173"
  },
  {
    "url": "mysql/divide.html",
    "revision": "33a43bd0ea06eaa7e247c87ccb72efde"
  },
  {
    "url": "mysql/index.html",
    "revision": "3ebe96d9ccdce4b38738c48094cc474b"
  },
  {
    "url": "mysql/indices.html",
    "revision": "77cfce2c0bd4c4d1afeccc5409e7c59f"
  },
  {
    "url": "mysql/lock.html",
    "revision": "3e9dd99e3608a35882131425cd4384ba"
  },
  {
    "url": "mysql/question.html",
    "revision": "8055eb1b0e04bed20a101a6bc2776026"
  },
  {
    "url": "mysql/references.html",
    "revision": "eeee74a415945a0af5a560c16497cbbf"
  },
  {
    "url": "mysql/transaction.html",
    "revision": "e5edf03cf0c66fe80054b7f37d347834"
  },
  {
    "url": "python/grammar.html",
    "revision": "d2d3692645a1f306cddb388f2087546d"
  },
  {
    "url": "python/index.html",
    "revision": "e76b33100337f3033165607b789ba039"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "168253b448b71f9625b7324b3415564f"
  },
  {
    "url": "recommender-systems/index.html",
    "revision": "fca5001db7253507df8bc5a101a8885d"
  },
  {
    "url": "recommender-systems/introduction.html",
    "revision": "6c1e2d2860ef0f95156ddc0efc904884"
  },
  {
    "url": "redis/cache.html",
    "revision": "b1d6db58dfae1bb37615b0356a2a00ca"
  },
  {
    "url": "redis/cluster.html",
    "revision": "4b9db96d9f11c5051dfc35e972f49743"
  },
  {
    "url": "redis/index.html",
    "revision": "f6b7aad107d8cd0abe24a9e37aa05996"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "936ad81f3f41db1be1c6dbf1d1fbe9bb"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "8a3a2949e22659875c599686a60cbcea"
  },
  {
    "url": "spring/index.html",
    "revision": "24f480bbf6d10be1d1bc5a339b8b3179"
  },
  {
    "url": "spring/ioc.html",
    "revision": "694471df50d21b74c4a6cb8f47b08edd"
  },
  {
    "url": "spring/overall.html",
    "revision": "1e2f8de0d7a61c894b185e940fe91f14"
  },
  {
    "url": "spring/references.html",
    "revision": "47ca6e8bd34b763b5a59e1a3a0c6180e"
  },
  {
    "url": "web/HTTP.html",
    "revision": "ddeaba870265b8625b59b8dc1ce23d77"
  },
  {
    "url": "web/index.html",
    "revision": "8b175414e84c9feb85bd6846b07d4904"
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
