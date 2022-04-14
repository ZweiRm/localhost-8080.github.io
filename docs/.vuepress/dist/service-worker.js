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
    "revision": "be3b6e845081d5f3aab33d0078b8dc71"
  },
  {
    "url": "about/index.html",
    "revision": "d6e68a0ad5d9bd8dbcf618bd1292b693"
  },
  {
    "url": "algorithm/ds-001.html",
    "revision": "266a683fb7f2b0bdd05998016dea4c43"
  },
  {
    "url": "algorithm/ds-002.html",
    "revision": "c28b30c24ca8232759860f44eff19617"
  },
  {
    "url": "algorithm/ds-003.html",
    "revision": "7e62f4165a350edbf6f59a520903aed5"
  },
  {
    "url": "algorithm/dynamic-programming.html",
    "revision": "50d43d8ece16133b3cbac3483ad71280"
  },
  {
    "url": "algorithm/index.html",
    "revision": "9c7db925223fe7ae4792f57fc72b76c9"
  },
  {
    "url": "artificial-intelligence/index.html",
    "revision": "dd9d8d158c047b28b5ad494f2951d3be"
  },
  {
    "url": "artificial-intelligence/search-strategies.html",
    "revision": "a86b2eb189a7b451cdd1806f4e788fee"
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
    "url": "assets/js/10.df2e213d.js",
    "revision": "85c36a5b4b2316717d961082261d5320"
  },
  {
    "url": "assets/js/11.3a9d702a.js",
    "revision": "e1388f02472ea85dd711307e56f4cd56"
  },
  {
    "url": "assets/js/12.73fe8dc9.js",
    "revision": "8b821d4921a2859c0d6fbdf88dd3b105"
  },
  {
    "url": "assets/js/13.a555e34f.js",
    "revision": "c075715a6641484090dc439804cf1a04"
  },
  {
    "url": "assets/js/14.0d457dd1.js",
    "revision": "fc1f6b4557f03d41dfd115eb2223f4c6"
  },
  {
    "url": "assets/js/15.111e6934.js",
    "revision": "72ff3ca6e2d5f1e71ea4d7f39dcc2de7"
  },
  {
    "url": "assets/js/16.a4cbb348.js",
    "revision": "98d0b9e3e4381e54bdfcdacf76c4fad8"
  },
  {
    "url": "assets/js/17.07bb20d4.js",
    "revision": "e293d2009ee81767f3d06b53454359cf"
  },
  {
    "url": "assets/js/18.24f7dfdf.js",
    "revision": "a435ae4a9b492b488382354b003efa7d"
  },
  {
    "url": "assets/js/19.d7cbfcec.js",
    "revision": "a8f2a9c09f6031f82a3a44ff590cf48f"
  },
  {
    "url": "assets/js/20.b7092aec.js",
    "revision": "24e7b94e6b3567a7624fbca777c22c9d"
  },
  {
    "url": "assets/js/21.8eaf5462.js",
    "revision": "3ea784345e23bb32ae95823b5df4a4ff"
  },
  {
    "url": "assets/js/22.cb2b2706.js",
    "revision": "d7828915e1e2a230c8d684c6cd572cd1"
  },
  {
    "url": "assets/js/23.03f0d760.js",
    "revision": "534171ff73f92122f90aa22cd0d8d150"
  },
  {
    "url": "assets/js/24.20e4da85.js",
    "revision": "5eef316962d9aca586c843e650d80136"
  },
  {
    "url": "assets/js/25.e4daca47.js",
    "revision": "aa747da953c11e2d3ada25c5d826225a"
  },
  {
    "url": "assets/js/26.220186bc.js",
    "revision": "7197067a0b3ff80dab8a6316137ae4e0"
  },
  {
    "url": "assets/js/27.6b0644b0.js",
    "revision": "f2ad6e481243f6ff2b2a70de7d3fe0f6"
  },
  {
    "url": "assets/js/28.c1cb269e.js",
    "revision": "619e9fcbbd12bb9ee4ce935b8ce89320"
  },
  {
    "url": "assets/js/29.58f77c6b.js",
    "revision": "5c86d1014900b9b00d1fc1cbaa95064b"
  },
  {
    "url": "assets/js/3.7837b6f0.js",
    "revision": "5666ccc39e11f2b5280d890c65c9d68d"
  },
  {
    "url": "assets/js/30.7d32497d.js",
    "revision": "79ee73b31e71c497304d62a7e9159064"
  },
  {
    "url": "assets/js/31.0718448a.js",
    "revision": "f8ca11765695d76931624270b10b7ce1"
  },
  {
    "url": "assets/js/32.381e6dd8.js",
    "revision": "4f2f4dc5225775261511d92b06a9f5a1"
  },
  {
    "url": "assets/js/33.8c9192c9.js",
    "revision": "6940114558513f1662da6cb8ebb4d631"
  },
  {
    "url": "assets/js/34.730499e0.js",
    "revision": "c22c9a33fcc98802a30cb0198089dca3"
  },
  {
    "url": "assets/js/35.f39b906a.js",
    "revision": "272609d581795c46e9433e90a28ddce9"
  },
  {
    "url": "assets/js/36.e63c605a.js",
    "revision": "68142315fc3cd81c59f6b3f15b4370ea"
  },
  {
    "url": "assets/js/37.b9e0db2a.js",
    "revision": "5010b95719dba7ec3c1671472f5d2391"
  },
  {
    "url": "assets/js/38.7d3be48a.js",
    "revision": "257f110c00870a6e2be9ccc19e0500c6"
  },
  {
    "url": "assets/js/39.84cd00ba.js",
    "revision": "1d2e1c8334a177a70a0a20b475a326a6"
  },
  {
    "url": "assets/js/4.82cbc76e.js",
    "revision": "ae37a1a9fed70cb970eb2fc85a834f1c"
  },
  {
    "url": "assets/js/40.bdaa58f4.js",
    "revision": "b1c7670874ef58f490dff6162591512c"
  },
  {
    "url": "assets/js/41.6d402c5a.js",
    "revision": "d655c80da07c6266d7ad262561f86283"
  },
  {
    "url": "assets/js/42.d3d09414.js",
    "revision": "6299909b042d97da2b58a0d18c783360"
  },
  {
    "url": "assets/js/43.63457252.js",
    "revision": "97086f87a5bfbfc148632253a4e2bc57"
  },
  {
    "url": "assets/js/44.742d8c3d.js",
    "revision": "a0542f0687bb852b9bbcac6712056469"
  },
  {
    "url": "assets/js/45.3794d4b7.js",
    "revision": "574892aec3fdbf945f3d5ffe4a99e338"
  },
  {
    "url": "assets/js/46.ae3fde42.js",
    "revision": "a72312c2a90e75ad3575a532ae02701c"
  },
  {
    "url": "assets/js/47.029de0a2.js",
    "revision": "708304005b76dbd4ec7c96686958827b"
  },
  {
    "url": "assets/js/48.9a84b761.js",
    "revision": "90c99783b4cafad8d19fb77c76841432"
  },
  {
    "url": "assets/js/49.01cfae63.js",
    "revision": "f261be3911d4f5230b3a13a477992e40"
  },
  {
    "url": "assets/js/5.2082fc82.js",
    "revision": "58c4483416df5853ff9e544f2459f30e"
  },
  {
    "url": "assets/js/50.a1bb4220.js",
    "revision": "2db85dcab88d9900c20515415f661fc5"
  },
  {
    "url": "assets/js/51.1eff2183.js",
    "revision": "595081ac3605d8d5c001ae5be22f72b9"
  },
  {
    "url": "assets/js/52.e7cc1dad.js",
    "revision": "4bd889674278766a4b9895d913a97c19"
  },
  {
    "url": "assets/js/53.0d77546d.js",
    "revision": "15d1fec9d9853f66a9796a28b5de226a"
  },
  {
    "url": "assets/js/54.e5e5f099.js",
    "revision": "968d0a7b670bbc4cdc82dffa1e005991"
  },
  {
    "url": "assets/js/55.2dd62275.js",
    "revision": "7a5a669c21b471f23c5e7e56a588e94d"
  },
  {
    "url": "assets/js/56.1eb82c14.js",
    "revision": "59b835f64299343b26593723b1aa679a"
  },
  {
    "url": "assets/js/57.db3f0a68.js",
    "revision": "101c4b09ea9f87e0323fe115c974ec2a"
  },
  {
    "url": "assets/js/58.ff6221cd.js",
    "revision": "1c273bf89327821c77a64ecad47db6aa"
  },
  {
    "url": "assets/js/59.6775a377.js",
    "revision": "a3789518654d660c6eaf5e22b563461b"
  },
  {
    "url": "assets/js/6.c7aab8c3.js",
    "revision": "bb1d08003550b34f9447db9446ad03d0"
  },
  {
    "url": "assets/js/60.071ecb38.js",
    "revision": "0a8a207255fddc5152435f292cdc6bb8"
  },
  {
    "url": "assets/js/61.6023b659.js",
    "revision": "4e17c063af08c5a4cf877bab983c59d5"
  },
  {
    "url": "assets/js/62.1683492a.js",
    "revision": "784f08b4b32832cb1ebf9a165f147b25"
  },
  {
    "url": "assets/js/63.66635e4c.js",
    "revision": "0bf50bd323b85e6fb9b7372c5ee269bf"
  },
  {
    "url": "assets/js/64.0707f4a4.js",
    "revision": "83459f048d6f701137c0d8f3d368484c"
  },
  {
    "url": "assets/js/65.59297fab.js",
    "revision": "2a7ed7cd7bf5d414e22716b75d4a7191"
  },
  {
    "url": "assets/js/66.18763994.js",
    "revision": "c8112a596eee9489127f8fbe9a223efa"
  },
  {
    "url": "assets/js/67.6581c7f5.js",
    "revision": "6bd0f54a88ea0d3314cc75835f64fac1"
  },
  {
    "url": "assets/js/68.9af3d135.js",
    "revision": "86fdc7333c5261e533291e70184ca02e"
  },
  {
    "url": "assets/js/69.bbc0fe1a.js",
    "revision": "87b24ec94b79f7602037fc56158c7fa9"
  },
  {
    "url": "assets/js/7.a49c5159.js",
    "revision": "5de92c4679b91c968721f9923d431aac"
  },
  {
    "url": "assets/js/70.09ec79f5.js",
    "revision": "93c03c3a77b21aad8f4136bf1f6ac095"
  },
  {
    "url": "assets/js/71.b383adf6.js",
    "revision": "387c73978b8635267567678ffb8d62f7"
  },
  {
    "url": "assets/js/72.1923dc30.js",
    "revision": "eb7b4d95921a97dbec857ee300e13241"
  },
  {
    "url": "assets/js/73.3cc70d5a.js",
    "revision": "91b4fd0f4aed2261aca3c2b3342f04eb"
  },
  {
    "url": "assets/js/8.4880e05b.js",
    "revision": "6c51eecd8c2861d31734b33ca0dd7e35"
  },
  {
    "url": "assets/js/9.08b642ec.js",
    "revision": "1f0efe70195914a228841599861bac0f"
  },
  {
    "url": "assets/js/app.5c6e5b97.js",
    "revision": "484e9ede30ddaae886e17b8c22867de5"
  },
  {
    "url": "assets/js/vendors~flowchart.899652fe.js",
    "revision": "1a4a2e36ed845872fc6b862d84a31925"
  },
  {
    "url": "big-data/index.html",
    "revision": "67f3b13fca19a0bdf12435d61bf91db1"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "bee50de64f75b4fcf555edf79538dc44"
  },
  {
    "url": "c/index.html",
    "revision": "6eec2d2ad11d80414ed3701a674486ef"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "30ee82b12affd1d8f60fed762b11df11"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "835b2752be2ba2bef5c8c6587960f92d"
  },
  {
    "url": "deep-learning/python-and-vectorization.html",
    "revision": "f76390e9a740a7a5bef4edbcea9e4f16"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "hello-world/array-and-linked-list.html",
    "revision": "dd4a88e84d80fdebe0c350f7844c15ca"
  },
  {
    "url": "hello-world/binary-search.html",
    "revision": "fbc9e02ee3fa0fd98d2dd9d10b7e9e76"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "5ac67616f24918bc5b98bf6c53837606"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "1101f9486b8dffa47e24d7f315ad79e4"
  },
  {
    "url": "hello-world/index.html",
    "revision": "720c47d54d9682db74ddde39b0992502"
  },
  {
    "url": "hello-world/setup-a-server-manually.html",
    "revision": "25b437a868f81a944a77d9af00c30d89"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "11b0c45775450b7a50ce7849cec4e232"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "26b7a709527b3953aab0e963b73f296d"
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
    "revision": "e43a07fc051f6b86509b8b7899a5c7b2"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "30aef4432c4d729a069cc0435c619ecb"
  },
  {
    "url": "java/API-io.html",
    "revision": "752bf2bb3850b0d56c0258429ad32a4e"
  },
  {
    "url": "java/API-lang.html",
    "revision": "9748b09f5fe46cc16aa5000e4187b904"
  },
  {
    "url": "java/API-lang2.html",
    "revision": "6187fe8c97310a6fadf97802de932f6e"
  },
  {
    "url": "java/API-util.html",
    "revision": "1288b9a68eda66391b611fc424c7aab9"
  },
  {
    "url": "java/API-util2.html",
    "revision": "a3078ec9e22c16b6a82f06afd8180e66"
  },
  {
    "url": "java/API-util3.html",
    "revision": "ba9773f74102e40107ac3955b47df813"
  },
  {
    "url": "java/grammars.html",
    "revision": "24f7a4d033d16869fa9a014265f57abc"
  },
  {
    "url": "java/index.html",
    "revision": "72848958507d2f52d281f0ca12d2c91d"
  },
  {
    "url": "java/jvm.html",
    "revision": "ddc94382b6a143b4675ed9575384701c"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "8dc1ba34b62a4a000b62a7cb6c791ffe"
  },
  {
    "url": "java/references.html",
    "revision": "c3b5fcd2d2c37f5b9f92203533c7cfa3"
  },
  {
    "url": "kotlin/index.html",
    "revision": "5f3c94e24dd395b2fb5a6843e35e9458"
  },
  {
    "url": "math/index.html",
    "revision": "da7527465d5442a4a3ef18b6a087219d"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "4bf486fcf97318be4946d3126f715c0e"
  },
  {
    "url": "mysql/divide.html",
    "revision": "2de7556e913e863dc5c1cbd823d69b8f"
  },
  {
    "url": "mysql/index.html",
    "revision": "5bc80c87e3b9d08768cc9e58132260d9"
  },
  {
    "url": "mysql/indices.html",
    "revision": "0436db2e11efeac95bf405950480f813"
  },
  {
    "url": "mysql/lock.html",
    "revision": "c2e1976dd7a87c02449b009b0cebe890"
  },
  {
    "url": "mysql/question.html",
    "revision": "7f8874e1ce2c19aecd805fbfa546fd0f"
  },
  {
    "url": "mysql/references.html",
    "revision": "dbf56eeb3032b20b75b1e5214d25b88a"
  },
  {
    "url": "mysql/transaction.html",
    "revision": "b82f99c6a425ab0a0f80e915db6f1f0a"
  },
  {
    "url": "python/grammar.html",
    "revision": "0aa4cbd08034a2769578ce5bfe0cb3cf"
  },
  {
    "url": "python/index.html",
    "revision": "2658ff74727487d38a0c5e9f5458e9c7"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "e4e582be16aae30f422fa38dd13dadc6"
  },
  {
    "url": "recommender-systems/index.html",
    "revision": "a678c24aa77b25243efcb18e07ec3d5e"
  },
  {
    "url": "recommender-systems/introduction.html",
    "revision": "cbccc6601ca348a61ea44dc5756e429d"
  },
  {
    "url": "redis/cache.html",
    "revision": "b78b13040f245a0a4028db0a402db37e"
  },
  {
    "url": "redis/cluster.html",
    "revision": "fe61b32af6dcff6a5396e130aca984f8"
  },
  {
    "url": "redis/index.html",
    "revision": "03f92cef98b7482306d498f53cbc9d7e"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "ea3c34eb79b1533d694ac82cc06ee7d2"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "449802780d1625a4d433cfc7ea5e5777"
  },
  {
    "url": "spring/index.html",
    "revision": "ad23920fe69da2ad6b90b3ea1aa25922"
  },
  {
    "url": "spring/ioc.html",
    "revision": "62c4f5d705f396ac0084aa8fc11434fe"
  },
  {
    "url": "spring/overall.html",
    "revision": "8ece89dbe6646e15ed5bc6a8f0a0deb5"
  },
  {
    "url": "spring/references.html",
    "revision": "e7228cc11f61d79bce6f7042f06ee467"
  },
  {
    "url": "web/HTTP.html",
    "revision": "ee8cf0997d881be8f5db0259a7a9e472"
  },
  {
    "url": "web/index.html",
    "revision": "bd6f4ad1a526414b90feff8c732bd3ca"
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
