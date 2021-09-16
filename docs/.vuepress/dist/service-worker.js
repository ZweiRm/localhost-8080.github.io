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
    "revision": "10175e5c8d510d431581f6331f495816"
  },
  {
    "url": "about/index.html",
    "revision": "5c85f3d5304d725997fe1c87f3209786"
  },
  {
    "url": "algorithm/ds-001.html",
    "revision": "921bc824560c005d10e8bf609b1c80df"
  },
  {
    "url": "algorithm/ds-002.html",
    "revision": "db096d6787776e0fecf3150023cdf7dd"
  },
  {
    "url": "algorithm/index.html",
    "revision": "24e6e670dfd49c71df11d28d481e0377"
  },
  {
    "url": "artificial-intelligence/index.html",
    "revision": "9a01d8eb649a9ca091d1a4d30b499ec6"
  },
  {
    "url": "artificial-intelligence/search-strategies.html",
    "revision": "ce544e22f3fa8ac6f61608dd290d71c2"
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
    "url": "assets/js/10.92d7c762.js",
    "revision": "2fd36ca1866f50be6d53c27fffbc67eb"
  },
  {
    "url": "assets/js/11.837ccec4.js",
    "revision": "c3074e62068a5d35ba4fbb16f892a403"
  },
  {
    "url": "assets/js/12.71d7bb59.js",
    "revision": "0a9a02a78104de484c9ebfeab6b8f162"
  },
  {
    "url": "assets/js/13.9b635bdb.js",
    "revision": "f01d5b683d7005ad962a3f2c37705e7a"
  },
  {
    "url": "assets/js/14.5b24efb3.js",
    "revision": "ea3a15a95229b4cd4cde1f4f89012f36"
  },
  {
    "url": "assets/js/15.8984ea68.js",
    "revision": "945a7d9e80a11d0f76a81458432ed48b"
  },
  {
    "url": "assets/js/16.28782335.js",
    "revision": "1f24d7216aa42c62fbab88bbacf05883"
  },
  {
    "url": "assets/js/17.8c8fe584.js",
    "revision": "79f957e777fe8d68e32f33ef5d1944bb"
  },
  {
    "url": "assets/js/18.732ea28a.js",
    "revision": "8bc565c4f533a93f3afc55fce7f938af"
  },
  {
    "url": "assets/js/19.5da0ae34.js",
    "revision": "132a3febe65148310f4e13debcc1a790"
  },
  {
    "url": "assets/js/20.079c29f3.js",
    "revision": "ae2da8e5d4bd9cfb1acd059d251b9f38"
  },
  {
    "url": "assets/js/21.3148760c.js",
    "revision": "6f0bfafae924429b192f14c7d7daaee6"
  },
  {
    "url": "assets/js/22.70458cbb.js",
    "revision": "70ec554776d99a4ce43e6de6890f702c"
  },
  {
    "url": "assets/js/23.e4c4fedd.js",
    "revision": "63b2345f1a23b4362360db630bbd3042"
  },
  {
    "url": "assets/js/24.542e4e05.js",
    "revision": "161f8f033e03441b458e317cdad5df0c"
  },
  {
    "url": "assets/js/25.1a6a1388.js",
    "revision": "c15f08b091f2f53f08cb928743eaf07f"
  },
  {
    "url": "assets/js/26.82066589.js",
    "revision": "6157b0a995bce12e8181a930b662f261"
  },
  {
    "url": "assets/js/27.be82ea78.js",
    "revision": "90e9850e9f21b7d7caf8f14ab19f2b6a"
  },
  {
    "url": "assets/js/28.00386555.js",
    "revision": "b582be5985d48f430a2d4c831c87879e"
  },
  {
    "url": "assets/js/29.c1288df8.js",
    "revision": "9d82df6000975dc3053e797e328aab0d"
  },
  {
    "url": "assets/js/3.3efdb081.js",
    "revision": "c58b0295068be32a1352db49073f9774"
  },
  {
    "url": "assets/js/30.d853a40c.js",
    "revision": "8c6b2e71303ae896926b3aba1194a7b9"
  },
  {
    "url": "assets/js/31.cf21c0d2.js",
    "revision": "7296cf77697540fc4a9158d3ff6251c6"
  },
  {
    "url": "assets/js/32.1ae54633.js",
    "revision": "7654392e284273bce923d8eecdf45403"
  },
  {
    "url": "assets/js/33.7dd30fc7.js",
    "revision": "0018bfb2129735af5357039889bf2fb5"
  },
  {
    "url": "assets/js/34.632ce5d9.js",
    "revision": "0a7af482a324ad2cd7b478edc35ec02b"
  },
  {
    "url": "assets/js/35.f8eae663.js",
    "revision": "d137f98219255938c1853fd9a7d7ef65"
  },
  {
    "url": "assets/js/36.8e335d2d.js",
    "revision": "6e2e06c4d9d7c30a1e822219b673b2d1"
  },
  {
    "url": "assets/js/37.d965e796.js",
    "revision": "b1dfc3913a7d03c9a4145a858a624378"
  },
  {
    "url": "assets/js/38.c55d8017.js",
    "revision": "c22df87fc0e71e9bba9f8e82ea445377"
  },
  {
    "url": "assets/js/39.03448044.js",
    "revision": "809517fa420ff610907fa52f004638a3"
  },
  {
    "url": "assets/js/4.f36e69d2.js",
    "revision": "cfac292c83ebe148407ca81c0c9a856d"
  },
  {
    "url": "assets/js/40.4a4853ff.js",
    "revision": "948414d2de319a60b23cf2085064f098"
  },
  {
    "url": "assets/js/41.1ab79730.js",
    "revision": "0e5aca8389969adb25356d80ce2b3f3e"
  },
  {
    "url": "assets/js/42.2fdf2dce.js",
    "revision": "378dfcade1b6e52607c1da7c988768d8"
  },
  {
    "url": "assets/js/43.5f2f7767.js",
    "revision": "a5b10d5eb5120b10bccc9c27dffaf895"
  },
  {
    "url": "assets/js/44.95770bff.js",
    "revision": "dc9af08b87f20cb56bcf288150a9a579"
  },
  {
    "url": "assets/js/45.3b65cb61.js",
    "revision": "6bfd8e359d9f5398332f687a9f2f9c77"
  },
  {
    "url": "assets/js/46.fae97ea5.js",
    "revision": "84708f704388a7908ba9875d6919b755"
  },
  {
    "url": "assets/js/47.95fdddae.js",
    "revision": "1e9fd46a48da07247ff0069570c954ca"
  },
  {
    "url": "assets/js/48.f9fcbc38.js",
    "revision": "eaf5a8a894e2a854a532288b18770ec1"
  },
  {
    "url": "assets/js/49.8ff0b8c1.js",
    "revision": "fcfdab467ed103ff693b9832f67404a9"
  },
  {
    "url": "assets/js/5.c1db86ad.js",
    "revision": "e3501fcbe771fc92ccf625e3add67c1b"
  },
  {
    "url": "assets/js/50.228a61bc.js",
    "revision": "aa2c42e862396a23c2b2ccf09f8a4a90"
  },
  {
    "url": "assets/js/51.b2dd5f61.js",
    "revision": "9fd75f01a8ddc219b92fc3a41b0e1035"
  },
  {
    "url": "assets/js/52.0219a3dc.js",
    "revision": "0d5fb7a8f48556042d1b3276ea6619dd"
  },
  {
    "url": "assets/js/53.ac9b9766.js",
    "revision": "69b266e65856e51b411ac46c97435170"
  },
  {
    "url": "assets/js/54.53546026.js",
    "revision": "8ce7f12cd45bea0eb80c5f48d54b5ad6"
  },
  {
    "url": "assets/js/55.8cc1f2ad.js",
    "revision": "faba00e7e389a2bdd271e61e95b684ae"
  },
  {
    "url": "assets/js/56.c287ebb3.js",
    "revision": "85b1a8205006600dbf63c1c5b2cad651"
  },
  {
    "url": "assets/js/57.4c7eebe4.js",
    "revision": "748a10c9692a72eddaab64480aefc9df"
  },
  {
    "url": "assets/js/58.86407e8c.js",
    "revision": "c97f5d15db63b3dbb3359c93b1fd86a7"
  },
  {
    "url": "assets/js/59.540ebfd0.js",
    "revision": "4db9803a64174a1227cf19b9ae5dcf83"
  },
  {
    "url": "assets/js/6.279234f0.js",
    "revision": "b03e2eb7562c7d72589ca25eeabe1739"
  },
  {
    "url": "assets/js/60.05fede69.js",
    "revision": "7fa48d114f744cb024953bc9cec35432"
  },
  {
    "url": "assets/js/61.637ad455.js",
    "revision": "77a319d740315ea44190144eb878fc65"
  },
  {
    "url": "assets/js/7.9f42334e.js",
    "revision": "deb1877451b170e926806f5dc584f312"
  },
  {
    "url": "assets/js/8.44c6de7e.js",
    "revision": "5a6bace7f2cdf373d7d48e069fdd92b2"
  },
  {
    "url": "assets/js/9.ab2f5e7a.js",
    "revision": "074090f896241c48bfb8540e3a728300"
  },
  {
    "url": "assets/js/app.39411ef0.js",
    "revision": "d67e304f4176df0fc724e9b0bcd500fb"
  },
  {
    "url": "assets/js/vendors~flowchart.cfb38b78.js",
    "revision": "2f78bb7d502f4754d9c967b6bfd0a848"
  },
  {
    "url": "big-data/index.html",
    "revision": "d6e4e16c605e42e7e5b4b91808beec33"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "c1a1f7b8d11595e160280eaa96c9d753"
  },
  {
    "url": "c/index.html",
    "revision": "bd651cef62daa8c35ac08273ea6e1e91"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "88227cc8ab38fb548b9077cbde780e4a"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "5fef1f0d53b0945ed719571f85a7c513"
  },
  {
    "url": "deep-learning/python-and-vectorization.html",
    "revision": "d70f362b12b3d0cf8185ff12b0faac2f"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "front-end/index.html",
    "revision": "5f878a55aed95c6cd01cb1079f37d9cd"
  },
  {
    "url": "hello-world/array-and-linked-list.html",
    "revision": "cf78b60f10670a717978811bed16f3f0"
  },
  {
    "url": "hello-world/binary-search.html",
    "revision": "bac3b0f8dc35a6c8701364d95c60023a"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "659c40e5e436b2c58c46bfccf7bc1899"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "ad782e872e7b4fd689e6f887de82d894"
  },
  {
    "url": "hello-world/index.html",
    "revision": "22deab0b41bcde39f4e1a022653a088f"
  },
  {
    "url": "hello-world/setup-a-server-manually.html",
    "revision": "f351b02ba4801e6f6ad803a784316e1c"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "35b3d0c12743362a20dc11c6b63a564c"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "b13eb4406ace78e051d75d1590820044"
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
    "revision": "87e4d5c89e13c856d3c1b3cc43008b05"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "2c0eddcfda4fd722b232c80ae029977d"
  },
  {
    "url": "java/API-io.html",
    "revision": "c5d59b3cc224ebd910b4b61bea662a2a"
  },
  {
    "url": "java/API-lang.html",
    "revision": "9717b7d65a3f928b6ae5ce7f4135864b"
  },
  {
    "url": "java/API-util.html",
    "revision": "8726765d7dd93445e38be0d6cdd25141"
  },
  {
    "url": "java/grammars.html",
    "revision": "6b42f585cddd79de8d2633a06c6e7100"
  },
  {
    "url": "java/index.html",
    "revision": "029e03f875b0b0c2daac087064ab9c7b"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "84418ece41aa3f109fd4ae2ffafa1424"
  },
  {
    "url": "java/references.html",
    "revision": "db0b92990382dc9022366d70d64bfb4d"
  },
  {
    "url": "kotlin/index.html",
    "revision": "2afa7abb13da696cf70054f00c6ddb3f"
  },
  {
    "url": "math/index.html",
    "revision": "339c23002a3d349ab8d2213914963d6d"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "b901ec5fa294acb2bd4ff560276b865f"
  },
  {
    "url": "mysql/index.html",
    "revision": "5d90971becc917847bcb3ce89230f27d"
  },
  {
    "url": "mysql/indices.html",
    "revision": "c75ef7d053d08202c36b2afa9e63d2c5"
  },
  {
    "url": "mysql/lock.html",
    "revision": "0adff48ac61733164f6d90b259b3b3c5"
  },
  {
    "url": "mysql/question.html",
    "revision": "9d2f2c41ebe612d7c688dc42f08fc1c9"
  },
  {
    "url": "mysql/references.html",
    "revision": "99c83ed6f2f97480bf10087090d1c7f5"
  },
  {
    "url": "mysql/transaction.html",
    "revision": "02d7fce9946ed5f441f5f4d2e18689a4"
  },
  {
    "url": "python/grammar.html",
    "revision": "6f3bcfaabe5637cb5379d45f4ac4c722"
  },
  {
    "url": "python/index.html",
    "revision": "e240e03cd08c2e86a9bb37cba104e575"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "4930ac45687a3b9268ddb6481b031f8f"
  },
  {
    "url": "recommender-systems/index.html",
    "revision": "21912215767101ade972bea0c3116aa7"
  },
  {
    "url": "recommender-systems/introduction.html",
    "revision": "e0d1222ff46c5852b3c89ceb1df8758c"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "fc0cf7fe03d1f1e578022d260a3c0e7d"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "98dc8ed8e5abc61ec6b0a857561ca9bc"
  },
  {
    "url": "spring/index.html",
    "revision": "433e4080345ea3a4eb7ac0ad4fa13cda"
  },
  {
    "url": "spring/ioc.html",
    "revision": "f8a4a5e00d92f7371852eac38fed4e72"
  },
  {
    "url": "spring/overall.html",
    "revision": "d78a6fc8483dc3a836c76692bb85e790"
  },
  {
    "url": "spring/references.html",
    "revision": "ae6469605e2a7714739d0c6a3b5d2bb6"
  },
  {
    "url": "web/HTTP.html",
    "revision": "9f13652ab9d1adadc65bd7cc8e207726"
  },
  {
    "url": "web/index.html",
    "revision": "3167d78143e1883979eb8f04fa6a53c2"
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
