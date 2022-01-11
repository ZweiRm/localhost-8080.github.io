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
    "revision": "c0046a02913b535f06e08184ea1edd9f"
  },
  {
    "url": "about/index.html",
    "revision": "5a7c026c7e3fc943c6e8f2265c482d2f"
  },
  {
    "url": "algorithm/ds-001.html",
    "revision": "56481ee69e2e783b2eaa6174f1b8dc76"
  },
  {
    "url": "algorithm/ds-002.html",
    "revision": "62defe22471f7d916abb84a41af17540"
  },
  {
    "url": "algorithm/ds-003.html",
    "revision": "f68f36b62e9d37343522aa23c2927648"
  },
  {
    "url": "algorithm/dynamic-programming.html",
    "revision": "09067201b20e37cf83a6e5bf94908ea6"
  },
  {
    "url": "algorithm/index.html",
    "revision": "03ef615126709402d4232ef011a14c9d"
  },
  {
    "url": "artificial-intelligence/index.html",
    "revision": "9e77ac2cbe07e86cdfdeef1033985381"
  },
  {
    "url": "artificial-intelligence/search-strategies.html",
    "revision": "d79d765ec57267cd058deb447b74a470"
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
    "url": "assets/js/10.532374da.js",
    "revision": "64cf5082d0a5a99fe3059d381c2a2162"
  },
  {
    "url": "assets/js/11.ca547ac2.js",
    "revision": "9dcb37fe42b3872b30b64cd4f6d29af5"
  },
  {
    "url": "assets/js/12.cc7ab86d.js",
    "revision": "a0d2475dbbbc60c07c446e2b988cbb17"
  },
  {
    "url": "assets/js/13.e0eff42f.js",
    "revision": "10808881731f408d993d43bf4bbcf02f"
  },
  {
    "url": "assets/js/14.1d547d9d.js",
    "revision": "189574b43c0ee71ed824f894cd6b74c7"
  },
  {
    "url": "assets/js/15.3c5fb9da.js",
    "revision": "58893cc71e16136edd122dd499363281"
  },
  {
    "url": "assets/js/16.c2390bb6.js",
    "revision": "c278c772ae9273b9cf3401f480ac3b42"
  },
  {
    "url": "assets/js/17.93e2f671.js",
    "revision": "fc1b9b08000f4dbdbfe8ed81e175aec0"
  },
  {
    "url": "assets/js/18.e2bbd49f.js",
    "revision": "9179990d0738d1936aa5df8e52fe1bf3"
  },
  {
    "url": "assets/js/19.8e53203b.js",
    "revision": "22f6cdbe356ff81fb79be7c753e4f815"
  },
  {
    "url": "assets/js/20.8500c6d1.js",
    "revision": "4b1235230bbfcbfae43fc1554490ba83"
  },
  {
    "url": "assets/js/21.8c844656.js",
    "revision": "9c6b59faf8186f88d9adf46e151e875b"
  },
  {
    "url": "assets/js/22.d5081ec7.js",
    "revision": "af2843be5e5b02c1ffd06b1a89df27e1"
  },
  {
    "url": "assets/js/23.2b1b4bbf.js",
    "revision": "ae69461dc2faad1a8916cd5eb7c646a2"
  },
  {
    "url": "assets/js/24.1bf25556.js",
    "revision": "9455545c2f41f43228b7b19c616615f5"
  },
  {
    "url": "assets/js/25.6474a6c7.js",
    "revision": "eb2c6ca8c8c86217e5d0bdbe2f8630cb"
  },
  {
    "url": "assets/js/26.b6fdfa7f.js",
    "revision": "539357dc63dfe85b1e79d1659b437a0c"
  },
  {
    "url": "assets/js/27.36620ee4.js",
    "revision": "c033fae3853e82a976471adaac94d422"
  },
  {
    "url": "assets/js/28.af9ed2a4.js",
    "revision": "75781f7b684da6ddf30b0abf175bd332"
  },
  {
    "url": "assets/js/29.792970e6.js",
    "revision": "5f009ffb65c80bb4af8218360d8cf49d"
  },
  {
    "url": "assets/js/3.2561a88e.js",
    "revision": "d6494375c1299b56bfd33da70af81047"
  },
  {
    "url": "assets/js/30.f1192f12.js",
    "revision": "682aa8c7fc3508d16448c97d2dfc84d4"
  },
  {
    "url": "assets/js/31.9e835d26.js",
    "revision": "b48c382cba99ba0d0d805f17352a6401"
  },
  {
    "url": "assets/js/32.0f81d908.js",
    "revision": "87dd51941ddd31f17465cbffcd08b7bc"
  },
  {
    "url": "assets/js/33.32ad8df2.js",
    "revision": "05cf95460d19bf8be490da2977a04893"
  },
  {
    "url": "assets/js/34.ed3b2857.js",
    "revision": "ddcfcac103d86352f9881c73f664c395"
  },
  {
    "url": "assets/js/35.64b2cc20.js",
    "revision": "e1db181b2f3471a4e41799f39ed6ff77"
  },
  {
    "url": "assets/js/36.4e6b7751.js",
    "revision": "9dc563dd4f93fdfe74db9765db1da420"
  },
  {
    "url": "assets/js/37.738ede80.js",
    "revision": "76c164b2e675e27b7d6f7f9e0dfbbb9f"
  },
  {
    "url": "assets/js/38.d3bf5d18.js",
    "revision": "83ea13805349d769d06b26c6c1428198"
  },
  {
    "url": "assets/js/39.752db470.js",
    "revision": "3dae8a5659ae1302f838dc13f871059c"
  },
  {
    "url": "assets/js/4.8c1dcf46.js",
    "revision": "49d4be8963247ec46ce580cd4b5b4ddc"
  },
  {
    "url": "assets/js/40.86aa5b17.js",
    "revision": "ead107b5794bf17a6ac22b0aea82ee83"
  },
  {
    "url": "assets/js/41.98022fa6.js",
    "revision": "2066e85891979cb7880f40f317b7faed"
  },
  {
    "url": "assets/js/42.49a9537d.js",
    "revision": "4b7d9c91b7884af9594a92d3d1a021c6"
  },
  {
    "url": "assets/js/43.fda6dd68.js",
    "revision": "e0c6a1b8382f71697469f7bc03ef4501"
  },
  {
    "url": "assets/js/44.c1d96f93.js",
    "revision": "beadc4ba584dc8f4a454f2ad2ed95fb7"
  },
  {
    "url": "assets/js/45.d6c290f7.js",
    "revision": "a74ba8a82453d447916c638fc4b8fb25"
  },
  {
    "url": "assets/js/46.54103c5b.js",
    "revision": "e3e59763b9cdf09bd3cd059ca6d942d8"
  },
  {
    "url": "assets/js/47.4bf2d7a1.js",
    "revision": "8a8cc4e6785c518255993bde5863aa2d"
  },
  {
    "url": "assets/js/48.e169fa6e.js",
    "revision": "794c3675564b4ff19cff214f4c061e7e"
  },
  {
    "url": "assets/js/49.3763cd98.js",
    "revision": "1918919562cb2d369a578958762be3af"
  },
  {
    "url": "assets/js/5.61ff964e.js",
    "revision": "4569a2d52108b49071d67398fb75998e"
  },
  {
    "url": "assets/js/50.9e80cf93.js",
    "revision": "06d46ce936b2a832058481f9009b3c25"
  },
  {
    "url": "assets/js/51.4784ee89.js",
    "revision": "b2a86db218ed1cb57ef17efbfd63e684"
  },
  {
    "url": "assets/js/52.15b996cb.js",
    "revision": "ea1fb589e7ec5e392019a81f730b2a2b"
  },
  {
    "url": "assets/js/53.83383441.js",
    "revision": "e3eed4c2927d493ec710738b3ab5a81a"
  },
  {
    "url": "assets/js/54.591aa0d5.js",
    "revision": "20b542fb4ed695d7f172f9860183b7d2"
  },
  {
    "url": "assets/js/55.1a77f27b.js",
    "revision": "73f16f85e7248ba40503d4bc375b7e47"
  },
  {
    "url": "assets/js/56.35622bcc.js",
    "revision": "aae0acde7eed82853ecc7c717d45fa51"
  },
  {
    "url": "assets/js/57.e5ac8063.js",
    "revision": "53bf5e88b64742aecf04d3264fb2c3e8"
  },
  {
    "url": "assets/js/58.18247e04.js",
    "revision": "25b0f8c1d24e40ffe01934e24d206f22"
  },
  {
    "url": "assets/js/59.47759ff3.js",
    "revision": "207ad68df72118c08fbc827992b7b5c7"
  },
  {
    "url": "assets/js/6.4d0ccc72.js",
    "revision": "64ccf202fca030649a973b8ce8ce7083"
  },
  {
    "url": "assets/js/60.0dc4a365.js",
    "revision": "2c75228d0ed335b41dde0acfac7f09a3"
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
    "url": "assets/js/63.a79b4e51.js",
    "revision": "174870bdd158720302a13c2b5f2305ac"
  },
  {
    "url": "assets/js/64.d27ce38f.js",
    "revision": "e89c7d1b023d93a55fc8c1b09378fb01"
  },
  {
    "url": "assets/js/65.1078b184.js",
    "revision": "cb23be158afa25306ccd7c071f7760bf"
  },
  {
    "url": "assets/js/66.8c4232ba.js",
    "revision": "084cca781436487ba02452e7d35046ce"
  },
  {
    "url": "assets/js/7.0d0c7b72.js",
    "revision": "59823d022b980605aa0580431ff4537e"
  },
  {
    "url": "assets/js/8.3cd0de13.js",
    "revision": "895d543598c0a9e3059e54d099e07425"
  },
  {
    "url": "assets/js/9.cdb3ff55.js",
    "revision": "471ee05c72773ad19f4bbb47fb7c6291"
  },
  {
    "url": "assets/js/app.35d38518.js",
    "revision": "5ee1ec395910391a5e75f71e1ad047f8"
  },
  {
    "url": "assets/js/vendors~flowchart.586ddf52.js",
    "revision": "6768e5debc57e05387e70a39187eb199"
  },
  {
    "url": "big-data/index.html",
    "revision": "30abfc4ecfce8154fbcbc0e0a46c027b"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "1ae50f7f164101d451dc4d38f06fdda4"
  },
  {
    "url": "c/index.html",
    "revision": "41dba7b6ad266ce85154c3554d0c6918"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "93dfe99fb41b1f41e67ff4ac843eb312"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "4896ec0d8cb32fdf535f4db5e2d1a17d"
  },
  {
    "url": "deep-learning/python-and-vectorization.html",
    "revision": "006526cffcb6c3169d74073db634f2f3"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "hello-world/array-and-linked-list.html",
    "revision": "083d64bdc65dbde47e98dab787e71bbc"
  },
  {
    "url": "hello-world/binary-search.html",
    "revision": "b1a106f81a689404cee3159efcf0854e"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "7462fb0f2962b251af48ff9a68c872e3"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "671f463358f6524a448ea48f104aa15b"
  },
  {
    "url": "hello-world/index.html",
    "revision": "6ef922c2ceb630a06ab67509450c9c7b"
  },
  {
    "url": "hello-world/setup-a-server-manually.html",
    "revision": "28fd6588462d4170f679504bb03dc641"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "32d99c08458832e4d9cb93d45e22a231"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "8f2d205667925d851869be2973497dfb"
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
    "revision": "770112f2e27964540583ce83277f6945"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "bdd672d6a02cf29aedc75727402905b2"
  },
  {
    "url": "java/API-io.html",
    "revision": "f77daabaafcdb8c9241926acaa2beb2b"
  },
  {
    "url": "java/API-lang.html",
    "revision": "64753295f1c04293ccb0e61745a952ed"
  },
  {
    "url": "java/API-util.html",
    "revision": "18f627a19d02b8d71a323bdff14ce945"
  },
  {
    "url": "java/grammars.html",
    "revision": "e5033bc910340ea86cfb9a9e748b965d"
  },
  {
    "url": "java/index.html",
    "revision": "1542de13efc08c81e22fc5ba02681bc0"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "73d6995f506af4510c12c2ce465d7fc2"
  },
  {
    "url": "java/references.html",
    "revision": "489a5bcde2fdc7b885aa6dc19b687fb7"
  },
  {
    "url": "kotlin/index.html",
    "revision": "7dce73ca1556e1dce5b6617e2f18f94e"
  },
  {
    "url": "math/index.html",
    "revision": "a1ad2d3b0d4db0ef4c53045c760e2417"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "fd44628bccb0189f32e972b41357639d"
  },
  {
    "url": "mysql/divide.html",
    "revision": "d84fcb3f8d4e7fa0548e2bc824c18f6e"
  },
  {
    "url": "mysql/index.html",
    "revision": "c789f0cbbf33dfb0399b376a67d725a7"
  },
  {
    "url": "mysql/indices.html",
    "revision": "8ec5ad1bbf38026d62587335431d3743"
  },
  {
    "url": "mysql/lock.html",
    "revision": "5c18a5d69ba42fb584641c5d0b6a7a51"
  },
  {
    "url": "mysql/question.html",
    "revision": "70dc27d99d43e98e86fffc1ad030843b"
  },
  {
    "url": "mysql/references.html",
    "revision": "55e84abf2545cf8be47d10677da8aafe"
  },
  {
    "url": "mysql/transaction.html",
    "revision": "3102454dd9553ee2ef8efbedf4e94712"
  },
  {
    "url": "python/grammar.html",
    "revision": "b51d2fa80c6e5f8f167f3838940972fe"
  },
  {
    "url": "python/index.html",
    "revision": "d79ab221e052413ecc9375d894a6ba14"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "c1c2b6f5e2656b3728f3d3a324a1cd10"
  },
  {
    "url": "recommender-systems/index.html",
    "revision": "83d29905fb2b6c8d1d06608cdaebcfa4"
  },
  {
    "url": "recommender-systems/introduction.html",
    "revision": "71b95062eddb581f287e2f0852eeef20"
  },
  {
    "url": "redis/cache.html",
    "revision": "3f65986a6fdaf4aee692ba54a74cf827"
  },
  {
    "url": "redis/cluster.html",
    "revision": "c6103b7fcbdd7fd01ce820079586a566"
  },
  {
    "url": "redis/index.html",
    "revision": "1302575aadc3eebada12432b9d7fcb63"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "8b41258e77cb38a5d9b637b458f8b4da"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "c6b968dd9e29efde34eca145efa5fc3c"
  },
  {
    "url": "spring/index.html",
    "revision": "b09582cde9e32c7de76dcd1630f9d6f4"
  },
  {
    "url": "spring/ioc.html",
    "revision": "9f2ae2ff673047ee11b45474aefa1504"
  },
  {
    "url": "spring/overall.html",
    "revision": "3ec4e87f5bd8a2b5658d0806d27a8917"
  },
  {
    "url": "spring/references.html",
    "revision": "4d1f6c507bf05c1f7d8cfa28a5a30806"
  },
  {
    "url": "web/HTTP.html",
    "revision": "35f6771bd4e349593c014074d5208bfc"
  },
  {
    "url": "web/index.html",
    "revision": "cbb51546f9f0777a6e28b834adc27bf6"
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
