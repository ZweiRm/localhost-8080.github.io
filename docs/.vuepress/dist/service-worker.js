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
    "revision": "ed2ce2a8dc3bd1164ea5bb49e33a8b4d"
  },
  {
    "url": "about/index.html",
    "revision": "3e4776fba229fb7d37b7c829aeab85f1"
  },
  {
    "url": "algorithm/ds-001.html",
    "revision": "f701a4865bcfca1c108b4b1f092c1b35"
  },
  {
    "url": "algorithm/ds-002.html",
    "revision": "022fa7726ba07e129a946435d4d875b3"
  },
  {
    "url": "algorithm/index.html",
    "revision": "d5d7e384934edab61b387b18d5036e8e"
  },
  {
    "url": "artificial-intelligence/index.html",
    "revision": "c6f5ddae459c76b394f568aca8f6a0e8"
  },
  {
    "url": "artificial-intelligence/search-strategies.html",
    "revision": "3e5cf1a03ce30cc4faa107fa5733b4d6"
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
    "url": "assets/js/10.eee31474.js",
    "revision": "5a9fe88c1ff5721c038f07c53cfb7a9f"
  },
  {
    "url": "assets/js/11.9725c3c1.js",
    "revision": "bd2b1f11bb2267a3b387c1c64611fe13"
  },
  {
    "url": "assets/js/12.565d30e8.js",
    "revision": "209e3b18037c0130b777ff0c0b75b4ec"
  },
  {
    "url": "assets/js/13.22100c05.js",
    "revision": "fff667a5f4c09b2f66416c32d454e407"
  },
  {
    "url": "assets/js/14.0ebeb0b6.js",
    "revision": "65be1437235e9a6eac5abb2e85e7f2d3"
  },
  {
    "url": "assets/js/15.2332bb2e.js",
    "revision": "1e767a4e4fda089dff898080b67a25e7"
  },
  {
    "url": "assets/js/16.bcf274af.js",
    "revision": "671dacf7c2551347d026a6a6f1757a86"
  },
  {
    "url": "assets/js/17.d4414e73.js",
    "revision": "d880cde9820e901da3618eb943d50506"
  },
  {
    "url": "assets/js/18.81a89848.js",
    "revision": "6a40da005d4b7482db23ac04aebfc53d"
  },
  {
    "url": "assets/js/19.32bc1570.js",
    "revision": "cb00602a934ee3429ac4a11247d48c30"
  },
  {
    "url": "assets/js/20.f5cc01db.js",
    "revision": "84d1b80f1baffa1f22c1c9b160337d02"
  },
  {
    "url": "assets/js/21.a298686b.js",
    "revision": "cd4ad7ea4c2eac286659b43cc3ec680f"
  },
  {
    "url": "assets/js/22.108f598f.js",
    "revision": "45649666501fcb37587bd2a5265c2c45"
  },
  {
    "url": "assets/js/23.c7fd1efe.js",
    "revision": "e2210bb5e5dfae2e728461bea94162e5"
  },
  {
    "url": "assets/js/24.6f01b0fb.js",
    "revision": "ea07092e0b38f5a377c8c5b92b8a8a0e"
  },
  {
    "url": "assets/js/25.6ceb177c.js",
    "revision": "c374bbe5f03f08f710e5d529c56b668b"
  },
  {
    "url": "assets/js/26.69b11cdd.js",
    "revision": "bf852071070238379292c5273492a9b4"
  },
  {
    "url": "assets/js/27.946b2003.js",
    "revision": "e50c136f656c72fa2c9176da80e1b068"
  },
  {
    "url": "assets/js/28.0b5a9b98.js",
    "revision": "268850f983b2f4c3c746c1d5ce32c4d8"
  },
  {
    "url": "assets/js/29.0e1af8d0.js",
    "revision": "7b19d9754d5af939ae50024b31edd407"
  },
  {
    "url": "assets/js/3.3e1ac6b4.js",
    "revision": "4ac3af4caa8533704b32e681ac65f6fe"
  },
  {
    "url": "assets/js/30.d20428cb.js",
    "revision": "8934e9210d26af634149ea060c5c3628"
  },
  {
    "url": "assets/js/31.43e3dbfc.js",
    "revision": "c3a7fe0a75c1fc3df93f62eb242ce8a9"
  },
  {
    "url": "assets/js/32.f7f2e9d2.js",
    "revision": "4ec55f114a15049ae6004ca01fe0b3c9"
  },
  {
    "url": "assets/js/33.23bd613d.js",
    "revision": "eb35f21025009bd052a0502da039b26a"
  },
  {
    "url": "assets/js/34.bf8aca24.js",
    "revision": "01e48c879d8d5cd5ac69cfa9db029eaa"
  },
  {
    "url": "assets/js/35.c7d57902.js",
    "revision": "692db35983506b153e8ce1516e77b37b"
  },
  {
    "url": "assets/js/36.bc73882f.js",
    "revision": "1d92055de253540da76f12b13ba06657"
  },
  {
    "url": "assets/js/37.c9f1e72c.js",
    "revision": "771e98444fc5d5e060195f5cda67ace3"
  },
  {
    "url": "assets/js/38.8645af7a.js",
    "revision": "d374265feed1f547f08c28c622caff41"
  },
  {
    "url": "assets/js/39.395cb0b3.js",
    "revision": "21d7f0a1f2a16c1dba1f3ef33bea3ca2"
  },
  {
    "url": "assets/js/4.f7f5e982.js",
    "revision": "9d2e5a861a4005910b65f66bc69e6270"
  },
  {
    "url": "assets/js/40.ba71381f.js",
    "revision": "7879a9ab51924e0244506287858ece51"
  },
  {
    "url": "assets/js/41.1b8a4092.js",
    "revision": "909420f3bf6e9413ebe1593c11371108"
  },
  {
    "url": "assets/js/42.a8451446.js",
    "revision": "8b9535766413cc48521b64fd0bd20cd5"
  },
  {
    "url": "assets/js/43.691e6b43.js",
    "revision": "e7f82b2e55b87e39f719ce84de6b81fe"
  },
  {
    "url": "assets/js/44.4032af82.js",
    "revision": "405516c8d35c62627750ea8fed962fba"
  },
  {
    "url": "assets/js/45.02343bf7.js",
    "revision": "1596cbd9a028008a6b62092ffb59ab55"
  },
  {
    "url": "assets/js/46.a2d46cbf.js",
    "revision": "d5efee46ae87fc9bb0752370580e6ed1"
  },
  {
    "url": "assets/js/47.911fe8a1.js",
    "revision": "66c64dd0ee9611334766eaeb9d017853"
  },
  {
    "url": "assets/js/48.66d476dd.js",
    "revision": "9a9cf177b3a641710da73a06c4d01ea7"
  },
  {
    "url": "assets/js/49.4d4d8179.js",
    "revision": "0995a135dc8177e43fbfea89a097bc7d"
  },
  {
    "url": "assets/js/5.98c08254.js",
    "revision": "409919467e8346e19b1ba72e115a731d"
  },
  {
    "url": "assets/js/50.a9ed262b.js",
    "revision": "aa448b8c10a7d67173a1c42e535540fa"
  },
  {
    "url": "assets/js/51.2adf2884.js",
    "revision": "f1d2d82caba7b8902166cceecddd7275"
  },
  {
    "url": "assets/js/52.be4c3e12.js",
    "revision": "6e39d33d2d627157e8c6ab79430aec8c"
  },
  {
    "url": "assets/js/53.d196cd6b.js",
    "revision": "dd4596347a5f82bd7a51a03c365c997c"
  },
  {
    "url": "assets/js/54.842ea5eb.js",
    "revision": "87fd761622a61510f7a8cf226eed694a"
  },
  {
    "url": "assets/js/55.f9448f1b.js",
    "revision": "338c5e87b3bab40a864f4f6ebcbfd28b"
  },
  {
    "url": "assets/js/56.4718b724.js",
    "revision": "9d982b31263a6164436188caf7b2daf9"
  },
  {
    "url": "assets/js/57.b8518cf2.js",
    "revision": "bbd7ccb27021218f4cbbebbfeb46e4df"
  },
  {
    "url": "assets/js/58.f151c684.js",
    "revision": "4fe3cc11b579e4069132b568851d21c8"
  },
  {
    "url": "assets/js/59.b4043952.js",
    "revision": "7e5895072b6f1a3b7cfa170b37858c72"
  },
  {
    "url": "assets/js/6.e268b5c2.js",
    "revision": "fb15d874abb0511281c2a91914b6b46c"
  },
  {
    "url": "assets/js/60.a4b24d96.js",
    "revision": "8c4dbcd08e39f5923ac97a31063f8d0c"
  },
  {
    "url": "assets/js/61.7df98648.js",
    "revision": "a9c7d8c5bff8ea65345a8684f333e7ca"
  },
  {
    "url": "assets/js/62.ba7f065f.js",
    "revision": "966bbd5fca79adeee6d65fe001914713"
  },
  {
    "url": "assets/js/7.feb426c8.js",
    "revision": "3aaec4acc0b7fe40f600b7cff0b29f53"
  },
  {
    "url": "assets/js/8.c65feb50.js",
    "revision": "8e51264d351f975a047d3ffca885fa28"
  },
  {
    "url": "assets/js/9.a312f3a9.js",
    "revision": "c03d4adba9f2e73f65e4856ad04f125e"
  },
  {
    "url": "assets/js/app.c9a4d57f.js",
    "revision": "38b1c53b6bb89ddcae297cf6d41d29c2"
  },
  {
    "url": "assets/js/vendors~flowchart.d3fd88fa.js",
    "revision": "ee1c0e4af157c73482b46746eee156c7"
  },
  {
    "url": "big-data/index.html",
    "revision": "965c027e8c24c65a6b10c3cf6cabbab1"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "b83e82f550a09b0cdf1726102424d207"
  },
  {
    "url": "c/index.html",
    "revision": "b3a3803b46507a680bff65868cbb0b25"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "1667b511b2e83d7e22a7617973223886"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "fd2395c87193406d4b13e7d118c4eb10"
  },
  {
    "url": "deep-learning/python-and-vectorization.html",
    "revision": "454b3e1ce8f5f4bb95cf0b78558538e4"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "hello-world/array-and-linked-list.html",
    "revision": "a756ec765206ea675c2d10d887819994"
  },
  {
    "url": "hello-world/binary-search.html",
    "revision": "90638e030baf4bee5f43f7bbfbdb2469"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "2938dbc71d6b90a85c58434970e38077"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "8aa57a8fa951ff41c77eea4bf0a33aa6"
  },
  {
    "url": "hello-world/index.html",
    "revision": "2996d2c4d6d356f1b1c993159d5e3d71"
  },
  {
    "url": "hello-world/setup-a-server-manually.html",
    "revision": "439b5b5fb505d4a1666089b14ffee9da"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "d44e57c371bbfc382da38bbb783acd8d"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "f8832f03fc0d8117148addd72b64a071"
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
    "revision": "c255315c00d08255268c2dd8ef4e7e3d"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "d475459bf02b56670b7dfc42c68ff36d"
  },
  {
    "url": "java/API-io.html",
    "revision": "5f4b3e8e9aa74394502da0501e483214"
  },
  {
    "url": "java/API-lang.html",
    "revision": "78544f2bc17e81beaabe5c2dccd6f7b9"
  },
  {
    "url": "java/API-util.html",
    "revision": "a5922453ad4ee1af1f8b8ff769957c83"
  },
  {
    "url": "java/grammars.html",
    "revision": "efaf6ce5526e2f575ffbfa37795556ef"
  },
  {
    "url": "java/index.html",
    "revision": "372d273c1b0a9041acc3a2328ea11418"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "22c7edf0dc4bb4b2495d20b131be6af6"
  },
  {
    "url": "java/references.html",
    "revision": "f2a6324a663edc73c455826d5b08093e"
  },
  {
    "url": "kotlin/index.html",
    "revision": "73a6ae13f3e88c4380fa8ac4cade5510"
  },
  {
    "url": "math/index.html",
    "revision": "c38910378e85bb9ff040080f99d2795f"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "438caab98156cf4e3de28b8f4545a088"
  },
  {
    "url": "mysql/divide.html",
    "revision": "b5e4f23131736c84babf880b0d06d08b"
  },
  {
    "url": "mysql/index.html",
    "revision": "045d9a583542c8db89666a21320bde3a"
  },
  {
    "url": "mysql/indices.html",
    "revision": "8f1166f01c2d2c6f689714d63139066a"
  },
  {
    "url": "mysql/lock.html",
    "revision": "0dc2a7c1421ec86f272689c4c1848b29"
  },
  {
    "url": "mysql/question.html",
    "revision": "f3bc85f75d4197414677df28c72d0118"
  },
  {
    "url": "mysql/references.html",
    "revision": "ac14a04b91e92af074ef879fa54cb45b"
  },
  {
    "url": "mysql/transaction.html",
    "revision": "8ab01beb5b5505cea52de8c85d942aaf"
  },
  {
    "url": "python/grammar.html",
    "revision": "7f5ac8cf1c819970362f9a1802989c95"
  },
  {
    "url": "python/index.html",
    "revision": "1cc1276860e51373161217d4349784f9"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "8e63bc5dcc94e84749352fc48f6bd6cc"
  },
  {
    "url": "recommender-systems/index.html",
    "revision": "9bf88177ad3db0123b2543423e950b63"
  },
  {
    "url": "recommender-systems/introduction.html",
    "revision": "3653ce221ac8aa7d775db2ab55fda48e"
  },
  {
    "url": "redis/index.html",
    "revision": "d89ef236255bbc2ea326f1b7697ad0f8"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "e3e2254ce97b7bc4861b35675463b8cc"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "df10633b5cb89d598cc694a3781a0321"
  },
  {
    "url": "spring/index.html",
    "revision": "ab59a0e5782a77d4325276b51aef4c9f"
  },
  {
    "url": "spring/ioc.html",
    "revision": "af6c78ab6ee0bb0846d20276ecb1f460"
  },
  {
    "url": "spring/overall.html",
    "revision": "dc71c53ee193032885e74136b4d9891c"
  },
  {
    "url": "spring/references.html",
    "revision": "b352cc6335203e48706eca57ad338883"
  },
  {
    "url": "web/HTTP.html",
    "revision": "81a1b3a43c435a21c0726c7e1c035a6e"
  },
  {
    "url": "web/index.html",
    "revision": "7b8499eb97c7629c901c5fd544965717"
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
