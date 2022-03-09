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
    "revision": "b9f39936e4511e3ec6b15b5e0e61b9fc"
  },
  {
    "url": "about/index.html",
    "revision": "8857502e80f97fc663c48387bfc156bb"
  },
  {
    "url": "algorithm/ds-001.html",
    "revision": "fdcf41f639ba3902611afee3aba300c8"
  },
  {
    "url": "algorithm/ds-002.html",
    "revision": "8649d5b300cc3478e9111e64d7151821"
  },
  {
    "url": "algorithm/ds-003.html",
    "revision": "655aed330e4b0e29b435b75749d2e346"
  },
  {
    "url": "algorithm/dynamic-programming.html",
    "revision": "73836d1e7ae8f48cc0b490eeb0ba2903"
  },
  {
    "url": "algorithm/index.html",
    "revision": "73b2bdf23f90d2581ca1715aefac1bd2"
  },
  {
    "url": "artificial-intelligence/index.html",
    "revision": "3ec14eecc60c797b4136a101ebe2c389"
  },
  {
    "url": "artificial-intelligence/search-strategies.html",
    "revision": "f74ddb4dc99e7f8937d60bc1a811830d"
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
    "url": "assets/js/10.c700757f.js",
    "revision": "c80f0734d661c5e46707c42ce05bfc15"
  },
  {
    "url": "assets/js/11.7c075557.js",
    "revision": "7e489db067f19ee3ff9385ec209270a2"
  },
  {
    "url": "assets/js/12.ad278091.js",
    "revision": "50221f425077f226663dc8927f74374d"
  },
  {
    "url": "assets/js/13.f904733b.js",
    "revision": "919fa2e23276159629983384bc3dd89e"
  },
  {
    "url": "assets/js/14.26351475.js",
    "revision": "127fd7de572a22fc1bf3debd54400471"
  },
  {
    "url": "assets/js/15.713ebfd4.js",
    "revision": "4ffc00cbf2dca4b829ccb26ddd8d511e"
  },
  {
    "url": "assets/js/16.1c66caf7.js",
    "revision": "4cf1e07cca3fed1444e8aa67b881467f"
  },
  {
    "url": "assets/js/17.c61b63de.js",
    "revision": "ac8e85853ae41e521b3adee3c3b2a497"
  },
  {
    "url": "assets/js/18.4fbbe79e.js",
    "revision": "7fa0f42b1e2cdc7bf4266c0e786fee2e"
  },
  {
    "url": "assets/js/19.20fef13b.js",
    "revision": "90cf791a1dd851cba3be15f7708770da"
  },
  {
    "url": "assets/js/20.f772cbeb.js",
    "revision": "d656b2603fdc2acceaf12457740422e7"
  },
  {
    "url": "assets/js/21.7c81d488.js",
    "revision": "5bd439691b7efca2e930524bd031b4c7"
  },
  {
    "url": "assets/js/22.e9671227.js",
    "revision": "b6530f23571dd4e5a2c9032c151d146d"
  },
  {
    "url": "assets/js/23.bbd89359.js",
    "revision": "ae69461dc2faad1a8916cd5eb7c646a2"
  },
  {
    "url": "assets/js/24.4c4d62b9.js",
    "revision": "f635ad042c7b9b71d218394f9a9a5f32"
  },
  {
    "url": "assets/js/25.0462978e.js",
    "revision": "80c18c9d4b8be02f5c89c27b2407d0eb"
  },
  {
    "url": "assets/js/26.b2650f53.js",
    "revision": "5b0fcd9866439b13cde2f7e56915f1f4"
  },
  {
    "url": "assets/js/27.780cc893.js",
    "revision": "314e2d75b9999fbc213df88b42fb0622"
  },
  {
    "url": "assets/js/28.a7ea213e.js",
    "revision": "af1ed685c295184245c9ccc0060e69ef"
  },
  {
    "url": "assets/js/29.44d8b5a9.js",
    "revision": "8c1b7d43e4bac3d0353ef22d91c2e0b3"
  },
  {
    "url": "assets/js/3.a0fafcd7.js",
    "revision": "04695578a9ac4620d7dd202b353113bd"
  },
  {
    "url": "assets/js/30.3f6ccf25.js",
    "revision": "f6ee2909a0002fb29e7501ef2588fbf2"
  },
  {
    "url": "assets/js/31.066811ab.js",
    "revision": "896143da46e97e0eb1f98fbbeadf6fad"
  },
  {
    "url": "assets/js/32.ef4fa724.js",
    "revision": "a5606052ed99a98b4ee3808aadf6d9fc"
  },
  {
    "url": "assets/js/33.063ae035.js",
    "revision": "5217e8bcfe682e0067555abc3eae972c"
  },
  {
    "url": "assets/js/34.e7aa3311.js",
    "revision": "5cc7d494c1597a71cc6b3a64ba89431d"
  },
  {
    "url": "assets/js/35.8894f14d.js",
    "revision": "ed8e66c4f85d9d9ff9bda56d713c9610"
  },
  {
    "url": "assets/js/36.14a9e120.js",
    "revision": "37d96f7832b1e224d5660050e2917784"
  },
  {
    "url": "assets/js/37.b8bf9583.js",
    "revision": "57e687ba3ba0a4aeb5c3f972cb950354"
  },
  {
    "url": "assets/js/38.9c1a65e2.js",
    "revision": "b691c3dcb040497f55e2438877abc4c7"
  },
  {
    "url": "assets/js/39.4e5c216f.js",
    "revision": "f1f4633f4a556a9ebf84c0f820c992a9"
  },
  {
    "url": "assets/js/4.e58df2d1.js",
    "revision": "c2babc0d565005bdf9a463c98c935afd"
  },
  {
    "url": "assets/js/40.702bf00b.js",
    "revision": "29c60f78bc2569ad9e5dd48001540a87"
  },
  {
    "url": "assets/js/41.ee46f2a7.js",
    "revision": "de2ea3ac4c9254ea8b404e9f4a21803b"
  },
  {
    "url": "assets/js/42.10d87fd3.js",
    "revision": "069d9ae89b93a3e0e1eb89a74dfa4645"
  },
  {
    "url": "assets/js/43.57384b80.js",
    "revision": "86eea04775416a0ccf9257be2663e3c0"
  },
  {
    "url": "assets/js/44.8e76c00f.js",
    "revision": "25184af19db226de5d468ea7b454fd10"
  },
  {
    "url": "assets/js/45.2c447437.js",
    "revision": "7f3d3eda486359a0f92f541f6256f6ca"
  },
  {
    "url": "assets/js/46.371ba3dc.js",
    "revision": "583f4a0f73a742aa2ac8db7aecdf0474"
  },
  {
    "url": "assets/js/47.2dc75161.js",
    "revision": "64dcfd7d1e3bf01ce1225f4830c714ab"
  },
  {
    "url": "assets/js/48.244265d6.js",
    "revision": "36ac792da4355cfe4f79e4d468e07b8a"
  },
  {
    "url": "assets/js/49.96496909.js",
    "revision": "f26474519107dd5009bd33d1457ff720"
  },
  {
    "url": "assets/js/5.ebfd9835.js",
    "revision": "a41bed5a2d55dfba967d6c120a218cb4"
  },
  {
    "url": "assets/js/50.96ff4629.js",
    "revision": "c76222338d6900b539e28c6fbd96bfce"
  },
  {
    "url": "assets/js/51.da1889bf.js",
    "revision": "e351322dba845a7ebc91466d19b90ffb"
  },
  {
    "url": "assets/js/52.177afda5.js",
    "revision": "ee2160c4e1352b761dcfc71aa3cc15f7"
  },
  {
    "url": "assets/js/53.d8a134e1.js",
    "revision": "e12d22c51de343462d5ded691419b6c8"
  },
  {
    "url": "assets/js/54.24033603.js",
    "revision": "8a60c0081aa3e415f96ec43644ec9596"
  },
  {
    "url": "assets/js/55.6cb61c09.js",
    "revision": "595714d4ef2d8549c4d89c6f77c1e28b"
  },
  {
    "url": "assets/js/56.892d8429.js",
    "revision": "b96991c81c37e3cdb029df5d196544ad"
  },
  {
    "url": "assets/js/57.f3afb620.js",
    "revision": "d957fb736013deaf825aa409cec54cd3"
  },
  {
    "url": "assets/js/58.7960ee65.js",
    "revision": "d575502007ab49c56e57979f03e282e6"
  },
  {
    "url": "assets/js/59.fd7760f7.js",
    "revision": "ba8c06742b396a89e0f178576f20e0e2"
  },
  {
    "url": "assets/js/6.594b10c9.js",
    "revision": "508ee9e80bd3c6a33a5407f5c4d047fa"
  },
  {
    "url": "assets/js/60.a047ec03.js",
    "revision": "63ae38743b34dcd14b41cb458722dfc0"
  },
  {
    "url": "assets/js/61.d887d538.js",
    "revision": "0880678923fef747fe96ad51a6f3266f"
  },
  {
    "url": "assets/js/62.9d39a0eb.js",
    "revision": "d02f6857ea524d8d3db32a41063e8056"
  },
  {
    "url": "assets/js/63.672819ec.js",
    "revision": "043d8ed0be451f48d0393481b43e4482"
  },
  {
    "url": "assets/js/64.ee6e9014.js",
    "revision": "f251f8ad2c737fa23e0293a41a1b5559"
  },
  {
    "url": "assets/js/65.0569b4c8.js",
    "revision": "afbf9dd42b000f8b843dcc8806b3f8e1"
  },
  {
    "url": "assets/js/66.35c0c81e.js",
    "revision": "7163261efa275727ef4d13fdc57a7cb6"
  },
  {
    "url": "assets/js/67.8265785a.js",
    "revision": "2ea2889ca2a6fe432a6fdb9538b6edb6"
  },
  {
    "url": "assets/js/7.eb3417d7.js",
    "revision": "0082e8e3454309aee29e187b341ce87f"
  },
  {
    "url": "assets/js/8.9a855433.js",
    "revision": "4620c0c1bc7ec7acc74c7fa0b25cb868"
  },
  {
    "url": "assets/js/9.4058e2f6.js",
    "revision": "61531dcc097aea42981db7033359f780"
  },
  {
    "url": "assets/js/app.9ff9fd73.js",
    "revision": "41c06257ab77a1f8487b5a53df13450f"
  },
  {
    "url": "assets/js/vendors~flowchart.1688cdd8.js",
    "revision": "4bf1246381ad0f6f04a98c4e983315ce"
  },
  {
    "url": "big-data/index.html",
    "revision": "4d0369b4a5d4ddf3de583c26c0c26c02"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "f248ff0989c1fbd85e32b037dbde9679"
  },
  {
    "url": "c/index.html",
    "revision": "0402f129ba81131e9404987ea9028dec"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "05a7eaa8fb093cf8ecb19efec1857f4b"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "9d3ad861c444dd120525cabf649e93f4"
  },
  {
    "url": "deep-learning/python-and-vectorization.html",
    "revision": "fb8b26b0b0e4c044f76541d08a5e72f1"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "hello-world/array-and-linked-list.html",
    "revision": "20d5614edbd41c388b1089990e0a7cdd"
  },
  {
    "url": "hello-world/binary-search.html",
    "revision": "12d389d81fea44dda1a2e4722123b23e"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "bcf0bc1a66578c524bafffebba6f4653"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "df4707c7548bb100ed7343e7de6cc8b8"
  },
  {
    "url": "hello-world/index.html",
    "revision": "86fa8e423a704912860af09f9d11eb46"
  },
  {
    "url": "hello-world/setup-a-server-manually.html",
    "revision": "1713577d507e83b489f0568417d96f4a"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "6fd5eaf9a9c230d0ddd9f6b1b5be3c01"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "ddbc3e38f4cc4154c4a9c823cd0f9863"
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
    "revision": "5c550b9d9e1521c972ff820576841eb7"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "3c080d02d991bb247b4103c2c910a492"
  },
  {
    "url": "java/API-io.html",
    "revision": "c460a5655d5c405571e680815a4e6e73"
  },
  {
    "url": "java/API-lang.html",
    "revision": "f12e08eb16089c8a4f6ab814be67219b"
  },
  {
    "url": "java/API-util.html",
    "revision": "c8ffa42887dd25c06fdc409ddc3ac041"
  },
  {
    "url": "java/grammars.html",
    "revision": "7ebdc98de392ae16a624673379b7bdff"
  },
  {
    "url": "java/index.html",
    "revision": "1e84a62848b6254a79a5dfa6c239ab4d"
  },
  {
    "url": "java/jvm.html",
    "revision": "b2bf420b78f11c200ecefb33a9e0ec61"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "12f77989ff35d4c32f92409d9840f74f"
  },
  {
    "url": "java/references.html",
    "revision": "9a629494236c77238c0ddca45e92a66a"
  },
  {
    "url": "kotlin/index.html",
    "revision": "9d84ec8773e6b889935144d964c2eb25"
  },
  {
    "url": "math/index.html",
    "revision": "5c72cd946e0577e59d4ae292ed5b090e"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "999b1ac59e9f305242546e8ccb943abf"
  },
  {
    "url": "mysql/divide.html",
    "revision": "ec2dde3f613c85915f25f928c3a374a8"
  },
  {
    "url": "mysql/index.html",
    "revision": "7e8349a6a9a49389d7393ffef4a77591"
  },
  {
    "url": "mysql/indices.html",
    "revision": "6ba5ea7f9dd11cb1f94e5d185d841f69"
  },
  {
    "url": "mysql/lock.html",
    "revision": "84f2744bc76787939c4937c02cef506c"
  },
  {
    "url": "mysql/question.html",
    "revision": "be1b86ae648344ce927327d5a55389e5"
  },
  {
    "url": "mysql/references.html",
    "revision": "b39658c1cb141a8e2be8931ef1f8e559"
  },
  {
    "url": "mysql/transaction.html",
    "revision": "15e0f740602f12f0b83cb649bad3eaf7"
  },
  {
    "url": "python/grammar.html",
    "revision": "5b642f30b10112cb2bdaf11dec1c9fa5"
  },
  {
    "url": "python/index.html",
    "revision": "d221cc180af35084479b25466f4693e7"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "21fbb36afff6328b30c108ca9b35ed9b"
  },
  {
    "url": "recommender-systems/index.html",
    "revision": "851627b00c041a4817d28eb0417b4baf"
  },
  {
    "url": "recommender-systems/introduction.html",
    "revision": "4dfba113310faf36961164f90f18af23"
  },
  {
    "url": "redis/cache.html",
    "revision": "3d90057d907cd2e16a176cd55f834de5"
  },
  {
    "url": "redis/cluster.html",
    "revision": "d142326b9b5b05d7f4879da3c0572839"
  },
  {
    "url": "redis/index.html",
    "revision": "0bc42d0f8f8030766b2f41e8e285d6a0"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "3272d3782e471a5bdb38dbf5910247ce"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "774360ca2cbdba7a186cce7379f970b1"
  },
  {
    "url": "spring/index.html",
    "revision": "599526f3a89e3c710c28035cd0274557"
  },
  {
    "url": "spring/ioc.html",
    "revision": "e4a238efa9ce4839a4c834560729cd9a"
  },
  {
    "url": "spring/overall.html",
    "revision": "de3961a484f47bfba4ccd1597947da3d"
  },
  {
    "url": "spring/references.html",
    "revision": "d0e6113a1ef4b9ddf43b9900ec26dba6"
  },
  {
    "url": "web/HTTP.html",
    "revision": "5b7fc33405b7d9dd52d63894454cfcde"
  },
  {
    "url": "web/index.html",
    "revision": "65b74e57802d5ade0322ebb294d811b9"
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
