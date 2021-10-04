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
    "revision": "7627a6922034483093183b929dda6997"
  },
  {
    "url": "about/index.html",
    "revision": "1da1f4e5792562f31016fa074fded56e"
  },
  {
    "url": "algorithm/ds-001.html",
    "revision": "82295cb7c3e07b7e5dbae6014ff3eea8"
  },
  {
    "url": "algorithm/ds-002.html",
    "revision": "9252c94726a46c3e77d0470b842eab6e"
  },
  {
    "url": "algorithm/index.html",
    "revision": "e767cbe475e253ba370d0301d70df2b9"
  },
  {
    "url": "artificial-intelligence/index.html",
    "revision": "97297141ca8547e06e8180f0268dda27"
  },
  {
    "url": "artificial-intelligence/search-strategies.html",
    "revision": "608899e2fff37d5c7752440fff2cf36d"
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
    "url": "assets/js/10.d8e60297.js",
    "revision": "15ead9e253a338f09b0e4f807f04617f"
  },
  {
    "url": "assets/js/11.e4597082.js",
    "revision": "abae00207bb2390086d0e4bfc2102049"
  },
  {
    "url": "assets/js/12.565d30e8.js",
    "revision": "209e3b18037c0130b777ff0c0b75b4ec"
  },
  {
    "url": "assets/js/13.5c03949d.js",
    "revision": "46a1a69bf9aa5b7fc9e448b5df1c74db"
  },
  {
    "url": "assets/js/14.f49a1040.js",
    "revision": "c512cc91428d525d8c37b94cf91ca41b"
  },
  {
    "url": "assets/js/15.1ef10c8b.js",
    "revision": "8f79cf3bddc7b06d1cd7dceee686b435"
  },
  {
    "url": "assets/js/16.65acd3b7.js",
    "revision": "99ccab804f50007cb8b6075b03056964"
  },
  {
    "url": "assets/js/17.a7c5beed.js",
    "revision": "546e501d229e797ba08b2dd96f8256d0"
  },
  {
    "url": "assets/js/18.642f4c10.js",
    "revision": "2e03b45e4d7356a60b1e2048eadea89b"
  },
  {
    "url": "assets/js/19.f4610694.js",
    "revision": "5621719818bb35aca522ea67db33d316"
  },
  {
    "url": "assets/js/20.e140871b.js",
    "revision": "0535b9d1d971f192f8a062550dec6a91"
  },
  {
    "url": "assets/js/21.227845b5.js",
    "revision": "b8bc59f8f3bccd608a1e1971465c8e84"
  },
  {
    "url": "assets/js/22.597cde87.js",
    "revision": "52f13c20ad195cfe48f8a7f04c80e8a0"
  },
  {
    "url": "assets/js/23.9e81813d.js",
    "revision": "aedbd03ba04acd75f657254db212d9e7"
  },
  {
    "url": "assets/js/24.d8a25e39.js",
    "revision": "86e9202cb7092307ab51170000672f91"
  },
  {
    "url": "assets/js/25.09c31aff.js",
    "revision": "221d50dcefd0eea7bcc4d66721c6c324"
  },
  {
    "url": "assets/js/26.fa1b5b51.js",
    "revision": "94ecb82c176d1056d677c471b41c55a3"
  },
  {
    "url": "assets/js/27.5130ae25.js",
    "revision": "79bda34de5e43a94bd094ef2312a13fe"
  },
  {
    "url": "assets/js/28.1614b116.js",
    "revision": "3764d61bdf65fb2c662d70c2e5d57df5"
  },
  {
    "url": "assets/js/29.58baf3ae.js",
    "revision": "dd57064f3d22d45d1669e4a00fa3cfd4"
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
    "url": "assets/js/31.376b0993.js",
    "revision": "ab6b435e0b1b090b9c973b87cbd3384b"
  },
  {
    "url": "assets/js/32.8ea40cfb.js",
    "revision": "b320542e8fec4c1bbbd2575115922600"
  },
  {
    "url": "assets/js/33.33680ecb.js",
    "revision": "ac085a0063090aeff62325fc1c6846ea"
  },
  {
    "url": "assets/js/34.bf8aca24.js",
    "revision": "01e48c879d8d5cd5ac69cfa9db029eaa"
  },
  {
    "url": "assets/js/35.a0081568.js",
    "revision": "7c74492b058e259f39ad0f1f465eb732"
  },
  {
    "url": "assets/js/36.b4b82385.js",
    "revision": "628144c740598d93e713aafcaffffa6b"
  },
  {
    "url": "assets/js/37.288ea8cc.js",
    "revision": "030a3912459f98e57635a4bdcc90b14a"
  },
  {
    "url": "assets/js/38.ce2ca628.js",
    "revision": "8251f3024d3ad56431259d71540b9112"
  },
  {
    "url": "assets/js/39.7e73dab7.js",
    "revision": "05e8e8c0d720931bf128f9e6b85b9e52"
  },
  {
    "url": "assets/js/4.f7f5e982.js",
    "revision": "9d2e5a861a4005910b65f66bc69e6270"
  },
  {
    "url": "assets/js/40.7bd48cd9.js",
    "revision": "6948369869a00dee9eaf2c42a5c5eba5"
  },
  {
    "url": "assets/js/41.077e5c17.js",
    "revision": "83fbf24c0e5f080c88c7d1a992e19f20"
  },
  {
    "url": "assets/js/42.07315e9d.js",
    "revision": "4dfb3595740dacf9c574a41e908278a1"
  },
  {
    "url": "assets/js/43.df5a7553.js",
    "revision": "6145a49db4e8d62d7eff4a0d08f95f2e"
  },
  {
    "url": "assets/js/44.2b7ff68c.js",
    "revision": "4dd61e76ba71a543c4dd3cf891b59916"
  },
  {
    "url": "assets/js/45.c8e499f7.js",
    "revision": "45d655b7ccc2e43633ee74ef7e67cdcf"
  },
  {
    "url": "assets/js/46.2b2073f9.js",
    "revision": "35e484c1a0ff45a3c807beeb08f7b17f"
  },
  {
    "url": "assets/js/47.81dfd3c4.js",
    "revision": "1bbe4dfcfa7aa9a9afa169a0756722a3"
  },
  {
    "url": "assets/js/48.3cc7b7c6.js",
    "revision": "b372ae354d3515dbae57c9b6120f2ca7"
  },
  {
    "url": "assets/js/49.5d36a1b9.js",
    "revision": "01f9d296cdc93604316bd4202b227aff"
  },
  {
    "url": "assets/js/5.98c08254.js",
    "revision": "409919467e8346e19b1ba72e115a731d"
  },
  {
    "url": "assets/js/50.3a03909f.js",
    "revision": "979fe33f28e06e5838b40003a7b02855"
  },
  {
    "url": "assets/js/51.ec37da90.js",
    "revision": "e80d51fa6629bef368ac215ebe06dc1a"
  },
  {
    "url": "assets/js/52.4ae2259f.js",
    "revision": "7e7661bb9df41ea0e7dc1dd1670dca44"
  },
  {
    "url": "assets/js/53.f53cfbdd.js",
    "revision": "9fca795d3dd22117a520f6bce53449e1"
  },
  {
    "url": "assets/js/54.62aeef80.js",
    "revision": "1b14987aa48d4a0c3fbc11c729a62abe"
  },
  {
    "url": "assets/js/55.069b050b.js",
    "revision": "db6768d842a7a8d6e42d9d6165490373"
  },
  {
    "url": "assets/js/56.82b45417.js",
    "revision": "d7209be48d3ec4e4ee092ee0c91b30db"
  },
  {
    "url": "assets/js/57.2f622372.js",
    "revision": "a51d82df9c25fe5b132cbd9c73593069"
  },
  {
    "url": "assets/js/58.bf4cd89a.js",
    "revision": "9e05c2114e22c70277d12602a7b72518"
  },
  {
    "url": "assets/js/59.8c3edcb8.js",
    "revision": "40f879114ee77035ad77adab86786d73"
  },
  {
    "url": "assets/js/6.5d34e6c7.js",
    "revision": "44c8d5c48de51bb2c0c89ff63c0cadd8"
  },
  {
    "url": "assets/js/60.6442b3bc.js",
    "revision": "cba0fbf1c71c20f9cdccb5233a1dd20b"
  },
  {
    "url": "assets/js/61.217f65a1.js",
    "revision": "1fbe02faaae8eb80341b6be3e0d7273e"
  },
  {
    "url": "assets/js/62.21fa98a7.js",
    "revision": "5c095a3c4b1588a6452a4bcf50c6a549"
  },
  {
    "url": "assets/js/63.099fe6a9.js",
    "revision": "a154b350aa3e39dfd40fddf839aa9cf3"
  },
  {
    "url": "assets/js/7.7dd11319.js",
    "revision": "04fb1b9c96f773d020781b13db4bef0a"
  },
  {
    "url": "assets/js/8.c65feb50.js",
    "revision": "8e51264d351f975a047d3ffca885fa28"
  },
  {
    "url": "assets/js/9.790cfb3b.js",
    "revision": "82d196a6c11e0444743bdba5faf6a34d"
  },
  {
    "url": "assets/js/app.a2454d80.js",
    "revision": "5325fd53f68918b19cb68541c740bc60"
  },
  {
    "url": "assets/js/vendors~flowchart.d3fd88fa.js",
    "revision": "ee1c0e4af157c73482b46746eee156c7"
  },
  {
    "url": "big-data/index.html",
    "revision": "2c9186ac08fe3800d18ff94e51e75958"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "c48da5c1b3cd4e2d049c1d6c61724310"
  },
  {
    "url": "c/index.html",
    "revision": "51bbad993698d4da2bd0f8f645451472"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "51609bf79caa7821afa83ae5b4843dcf"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "ee722138df9ad262423d846001aaf4fd"
  },
  {
    "url": "deep-learning/python-and-vectorization.html",
    "revision": "75eb7a8fecf4f968f81f11c211d27fa4"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "hello-world/array-and-linked-list.html",
    "revision": "eb79575baecf0a91df1ec9c588cff486"
  },
  {
    "url": "hello-world/binary-search.html",
    "revision": "43b2988a7861bbf334c3385bd461c2dd"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "53c11b810c0b63ea77b981f12e442e73"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "74d92d42a1e7b575e0749e17f9011db7"
  },
  {
    "url": "hello-world/index.html",
    "revision": "9d234b931a45dc4e266b55c098e61d25"
  },
  {
    "url": "hello-world/setup-a-server-manually.html",
    "revision": "a72374f68877fe22a27e000b530eead6"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "8ddcb48134d2edff5cc29c573aa3388a"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "92f7268023997d0468627a64cfe9226c"
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
    "revision": "c3389a5b38f7d49f011b124a18d54492"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "9ea34d9579d12f722ccf267702e80459"
  },
  {
    "url": "java/API-io.html",
    "revision": "fdb285fbaf2812c7c13dc9c19cb2fdeb"
  },
  {
    "url": "java/API-lang.html",
    "revision": "366735c4b4656f05868d5ee2b95bb081"
  },
  {
    "url": "java/API-util.html",
    "revision": "a4529ccc51cc55e1174f20bfd15ada10"
  },
  {
    "url": "java/grammars.html",
    "revision": "b06348b92762a0b8cf4a56b1c4877845"
  },
  {
    "url": "java/index.html",
    "revision": "a455f66702057714e8e0d6c6d68ac73b"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "1c4f27222189ed4f2c637f62faee694f"
  },
  {
    "url": "java/references.html",
    "revision": "4d47b918a2daffbd6509453128c10b50"
  },
  {
    "url": "kotlin/index.html",
    "revision": "cc20245df29eaa2dab2f2b517c70a3b7"
  },
  {
    "url": "math/index.html",
    "revision": "224974f21ee7d227f105fbbb1d00685f"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "0325882ffa8877cdd6cd21aa54c924a3"
  },
  {
    "url": "mysql/divide.html",
    "revision": "c042062435cf7c1a3f9e735079d5b78f"
  },
  {
    "url": "mysql/index.html",
    "revision": "b226295ddd839e8c377bc8e249cf0069"
  },
  {
    "url": "mysql/indices.html",
    "revision": "0182769ebcdadd565387247a839da02f"
  },
  {
    "url": "mysql/lock.html",
    "revision": "1377c68df004ad3ff4b0d57732dafb12"
  },
  {
    "url": "mysql/question.html",
    "revision": "88e36a84f413617236c4863a5ff57f0e"
  },
  {
    "url": "mysql/references.html",
    "revision": "980b886c375b86b820c6c58f76901641"
  },
  {
    "url": "mysql/transaction.html",
    "revision": "0a6e7f6e7f4435cc0e9ddab343b512b7"
  },
  {
    "url": "python/grammar.html",
    "revision": "9991cfd0207554b3a9727ef6fa5ddc99"
  },
  {
    "url": "python/index.html",
    "revision": "c85d9f6c6fb0d3f2ff60d2b9916882f7"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "a2e4fc743aa39fb111414af89a12af61"
  },
  {
    "url": "recommender-systems/index.html",
    "revision": "7c31a7fab1d30688c3a80fd0d07f2bbb"
  },
  {
    "url": "recommender-systems/introduction.html",
    "revision": "b0fb5112583449a3539ee324bd94f5f2"
  },
  {
    "url": "redis/cache.html",
    "revision": "40f7929ea92d075753814b54b7bd1a30"
  },
  {
    "url": "redis/index.html",
    "revision": "704a8a9a1da7dd7df6e986f6e25aed33"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "78bfc4ffeb53633a0465a17f8a87e72b"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "91fc54aae0c333fe62eee8629cfaee03"
  },
  {
    "url": "spring/index.html",
    "revision": "747d4782ae61695fcca5184286176703"
  },
  {
    "url": "spring/ioc.html",
    "revision": "c2b6ecd6bc2db6828b78c802a058e25d"
  },
  {
    "url": "spring/overall.html",
    "revision": "493537731a1e01af0df99ad95a46111c"
  },
  {
    "url": "spring/references.html",
    "revision": "2b1cc395633c0f063b96c903810ac118"
  },
  {
    "url": "web/HTTP.html",
    "revision": "18d1376f273b6f52871dd7e59e7b2045"
  },
  {
    "url": "web/index.html",
    "revision": "cbfa6a1e2962830840468df0988262ea"
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
