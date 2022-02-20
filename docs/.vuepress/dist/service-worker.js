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
    "revision": "2412307d5d47a059043ef25cf1ef1e20"
  },
  {
    "url": "about/index.html",
    "revision": "7c91c541f6e85115be9309aea7fce41f"
  },
  {
    "url": "algorithm/ds-001.html",
    "revision": "e3173b53e14f825dc9c4e74c0581dd2d"
  },
  {
    "url": "algorithm/ds-002.html",
    "revision": "62e9e5429a33f03b2bec0850220bbfdf"
  },
  {
    "url": "algorithm/ds-003.html",
    "revision": "6fcb430397df9c7759a963dc43329287"
  },
  {
    "url": "algorithm/dynamic-programming.html",
    "revision": "db08cd90df6806114cb5405c9c7164ec"
  },
  {
    "url": "algorithm/index.html",
    "revision": "04d5a45cfe6001b49011046030aa6798"
  },
  {
    "url": "artificial-intelligence/index.html",
    "revision": "53225296d3a7601ae2664c9b8a145424"
  },
  {
    "url": "artificial-intelligence/search-strategies.html",
    "revision": "ee26c16e34a1665f7c282d9422f4caf8"
  },
  {
    "url": "assets/css/0.styles.8daecd82.css",
    "revision": "458710e396a5c9dfa9a445cf9c35e189"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.bf53735c.js",
    "revision": "ce5fcf6060d60748cd987af0c03aa660"
  },
  {
    "url": "assets/js/11.4380e1d2.js",
    "revision": "49ffe189c18eacf5346c65df0d5c4c23"
  },
  {
    "url": "assets/js/12.2373a5f7.js",
    "revision": "a92790292190248ae3032b0f138cc847"
  },
  {
    "url": "assets/js/13.8d793768.js",
    "revision": "367fdb7b59687d6ee9c9bea19d5f5621"
  },
  {
    "url": "assets/js/14.eef70a3e.js",
    "revision": "07e078d9a2b3bb0b2f4e6c81c418d78f"
  },
  {
    "url": "assets/js/15.3f0dfd4f.js",
    "revision": "a7225550cca721eb4aac1a60477d54f9"
  },
  {
    "url": "assets/js/16.7c95c74b.js",
    "revision": "49d49ce0ef2305b70c9fc4a296449084"
  },
  {
    "url": "assets/js/17.6a2a2e00.js",
    "revision": "fc1b9b08000f4dbdbfe8ed81e175aec0"
  },
  {
    "url": "assets/js/18.adc63f01.js",
    "revision": "d713e2b9a3b742bff0343f6c77017de4"
  },
  {
    "url": "assets/js/19.c2158dbe.js",
    "revision": "189ccb8e25f82133d89245db7e311f9f"
  },
  {
    "url": "assets/js/20.5d31faac.js",
    "revision": "4dba2727a3ca30657525ca583fa27b39"
  },
  {
    "url": "assets/js/21.116e003c.js",
    "revision": "9c6b59faf8186f88d9adf46e151e875b"
  },
  {
    "url": "assets/js/22.e9671227.js",
    "revision": "b6530f23571dd4e5a2c9032c151d146d"
  },
  {
    "url": "assets/js/23.535da27d.js",
    "revision": "662a2048bf32f8f0bbcb3a1848a13a16"
  },
  {
    "url": "assets/js/24.8c2e697e.js",
    "revision": "d4c684b8eb35ade68e543ea97445557c"
  },
  {
    "url": "assets/js/25.0462978e.js",
    "revision": "80c18c9d4b8be02f5c89c27b2407d0eb"
  },
  {
    "url": "assets/js/26.6a7981d3.js",
    "revision": "8c0dbfd8516ae69b98ac441343ce27ce"
  },
  {
    "url": "assets/js/27.9b8fcb47.js",
    "revision": "25787b380fdb6d043cd1c51a4252539c"
  },
  {
    "url": "assets/js/28.47463da5.js",
    "revision": "97d36bb504f100abfa5e774da1d76347"
  },
  {
    "url": "assets/js/29.0df29703.js",
    "revision": "e3d73e5e81f786b61f1427d5719f4cf9"
  },
  {
    "url": "assets/js/3.a0fafcd7.js",
    "revision": "04695578a9ac4620d7dd202b353113bd"
  },
  {
    "url": "assets/js/30.d4cd854e.js",
    "revision": "d8110a21f430816d134e30b5ec415c9c"
  },
  {
    "url": "assets/js/31.066811ab.js",
    "revision": "896143da46e97e0eb1f98fbbeadf6fad"
  },
  {
    "url": "assets/js/32.9661ce04.js",
    "revision": "0237b66fa8f42be2f96273f8712903e8"
  },
  {
    "url": "assets/js/33.c9da10a8.js",
    "revision": "b221f28bcebd615a923cf424c30ae0f8"
  },
  {
    "url": "assets/js/34.5c17563d.js",
    "revision": "613d84525d9a98b1d32dca29424a514f"
  },
  {
    "url": "assets/js/35.83d3e256.js",
    "revision": "76fb75b313df13dd9f58112d454299fc"
  },
  {
    "url": "assets/js/36.57925ec6.js",
    "revision": "1fb6fb42ab64c0c9f6cbb17b1a035cfd"
  },
  {
    "url": "assets/js/37.a3345929.js",
    "revision": "44bee274ba728acc47edae405568c359"
  },
  {
    "url": "assets/js/38.763f84ff.js",
    "revision": "1f238ce1f95cfed324b5a89d6d34861f"
  },
  {
    "url": "assets/js/39.7190ed45.js",
    "revision": "77753f960fa0b3107ff448702b73ce0d"
  },
  {
    "url": "assets/js/4.e58df2d1.js",
    "revision": "c2babc0d565005bdf9a463c98c935afd"
  },
  {
    "url": "assets/js/40.9927c6de.js",
    "revision": "d1cf5f44739acb0920af669d0a50e84f"
  },
  {
    "url": "assets/js/41.9f4697bd.js",
    "revision": "4962fea5538cda3395e8f659ad77a97f"
  },
  {
    "url": "assets/js/42.84286b3e.js",
    "revision": "f85de348a7fc57bee279803a13a6bb7a"
  },
  {
    "url": "assets/js/43.501f3642.js",
    "revision": "175a091bc5725a9115dcbcfc074bb5b4"
  },
  {
    "url": "assets/js/44.8ad7df55.js",
    "revision": "3fa1e4f7754f6c94acef26b17b9d2aa8"
  },
  {
    "url": "assets/js/45.105a594b.js",
    "revision": "ebfbdea341f627ae35bb20f3f4b5ec50"
  },
  {
    "url": "assets/js/46.78546fae.js",
    "revision": "febcbfb6861e3b330bdaf1728e8759bc"
  },
  {
    "url": "assets/js/47.39805dbd.js",
    "revision": "7cb53af72a2b678579aeff8ea6c467c6"
  },
  {
    "url": "assets/js/48.d5322737.js",
    "revision": "b01c598111d78d84b2749e3c3cabf008"
  },
  {
    "url": "assets/js/49.48f8625e.js",
    "revision": "1918919562cb2d369a578958762be3af"
  },
  {
    "url": "assets/js/5.ebfd9835.js",
    "revision": "a41bed5a2d55dfba967d6c120a218cb4"
  },
  {
    "url": "assets/js/50.fd90d212.js",
    "revision": "1b4f6df1d6a383059086a1f5a2b4edbf"
  },
  {
    "url": "assets/js/51.cc895fdc.js",
    "revision": "7c7e7c1c7e6a51da5064c2af14650667"
  },
  {
    "url": "assets/js/52.9ddf5da2.js",
    "revision": "03126d6d46c32b2dabe2f4ffa9c1a5a6"
  },
  {
    "url": "assets/js/53.d1355f93.js",
    "revision": "f5520ce22afdaa03fe5c3829b284074e"
  },
  {
    "url": "assets/js/54.878fee63.js",
    "revision": "ee103ff8ae075bba73f16403d1820cf7"
  },
  {
    "url": "assets/js/55.e8923aae.js",
    "revision": "a7ccaca6455bc333699552f3a1b0fee8"
  },
  {
    "url": "assets/js/56.68c5b669.js",
    "revision": "969fcc7c988b688787d00324a2214e00"
  },
  {
    "url": "assets/js/57.3c19ce75.js",
    "revision": "71579d904e7ace4d3744abbc4a085adf"
  },
  {
    "url": "assets/js/58.9b0bb3ad.js",
    "revision": "98b425fdd4b61cb644f04c03f47bc74e"
  },
  {
    "url": "assets/js/59.da90dd2f.js",
    "revision": "14071af39f16314f789174b235716e8f"
  },
  {
    "url": "assets/js/6.f64a1c39.js",
    "revision": "bc846d6b8c0389c45015afdabe85b7a0"
  },
  {
    "url": "assets/js/60.bbacb707.js",
    "revision": "143e635f2d7f2284f9b23ec9d76e8119"
  },
  {
    "url": "assets/js/61.5846d4bd.js",
    "revision": "3b36f35a08eb8fb51af3dfae62b06e93"
  },
  {
    "url": "assets/js/62.51347d8b.js",
    "revision": "48ca8bbab8f3221119d01bda6d57a61d"
  },
  {
    "url": "assets/js/63.6bbc8336.js",
    "revision": "8d103b429f4f9c4d5ca703c2fdf234ec"
  },
  {
    "url": "assets/js/64.38f270f8.js",
    "revision": "88aa803d8d1daaaf17f6615b5a6a9338"
  },
  {
    "url": "assets/js/65.1703ec48.js",
    "revision": "767c962d71caa8922feef9d9f1891122"
  },
  {
    "url": "assets/js/66.cf3ed885.js",
    "revision": "80bdc894d5556020ec7b45eeff31add1"
  },
  {
    "url": "assets/js/7.27ca659c.js",
    "revision": "c83598f74666437c78e87bc53173cfcc"
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
    "url": "assets/js/app.3a2572df.js",
    "revision": "a732c6b95158f950ec7f7a6cb6a89af3"
  },
  {
    "url": "assets/js/vendors~flowchart.1688cdd8.js",
    "revision": "4bf1246381ad0f6f04a98c4e983315ce"
  },
  {
    "url": "big-data/index.html",
    "revision": "ae808b1b9389662fed8f723ef586f7fa"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "25868657e216e54a27271ad3cf76e281"
  },
  {
    "url": "c/index.html",
    "revision": "72822068134430273995c6761db5a3ba"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "d6f747667cfddb1243c10726e16247f8"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "c6c403047c98e644dd5290387d5c3279"
  },
  {
    "url": "deep-learning/python-and-vectorization.html",
    "revision": "bcba4aca77e74bafa98b92b1c164f695"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "hello-world/array-and-linked-list.html",
    "revision": "bdf78979364d84e937ee6c08e70c4aa7"
  },
  {
    "url": "hello-world/binary-search.html",
    "revision": "d1b366862baac104b1b6f76617ff346f"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "bf5fc2d47c06341e8f2da0c648fb5377"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "57dd8538a91de38c2fd1b351849f902b"
  },
  {
    "url": "hello-world/index.html",
    "revision": "4a94155987bc2988d7961ccb01860b75"
  },
  {
    "url": "hello-world/setup-a-server-manually.html",
    "revision": "b6ff2764ec003722ce2151e66fb6ae98"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "d2cb2dd914d3b91bf713cfd655a63049"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "d2b209ece23c35dad9440fed0d9b3b38"
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
    "revision": "cc0cf72614d9515cb9a43709b1bc55fa"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "4a1ca8b411b3c13bedeadde810a7fae2"
  },
  {
    "url": "java/API-io.html",
    "revision": "850ec6f02979684b2d666fc65488ab24"
  },
  {
    "url": "java/API-lang.html",
    "revision": "71ea8896c5343bbbb412b1f28ada67ce"
  },
  {
    "url": "java/API-util.html",
    "revision": "9b50dfb8d63bbd941313699458a40c25"
  },
  {
    "url": "java/grammars.html",
    "revision": "41d6766328f99786c42a46775821c068"
  },
  {
    "url": "java/index.html",
    "revision": "970278facc322e9737a1e81269ae436c"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "079c419f6d4550033e75b461731b04d5"
  },
  {
    "url": "java/references.html",
    "revision": "74e132e228982c63b84b646e923776d2"
  },
  {
    "url": "kotlin/index.html",
    "revision": "90cb65fbbf27ca1f20a5c3b051fdcc5d"
  },
  {
    "url": "math/index.html",
    "revision": "283d79d18202c0798addc863acda90f1"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "9a10aa411f0f52a6d90587b6cf6e18f0"
  },
  {
    "url": "mysql/divide.html",
    "revision": "9f018483ab32843758c2ff1d041240a9"
  },
  {
    "url": "mysql/index.html",
    "revision": "ef1963670656187e6f954bb3f60ae30b"
  },
  {
    "url": "mysql/indices.html",
    "revision": "047f6b2a6333859b2a5eb004b1babb48"
  },
  {
    "url": "mysql/lock.html",
    "revision": "105da4cd3ed5cf66b960d075fe1ce301"
  },
  {
    "url": "mysql/question.html",
    "revision": "c8e475686dd81622f9ce7694d5214aa9"
  },
  {
    "url": "mysql/references.html",
    "revision": "1da3111968a50b2cc9138b8b5fe4bf72"
  },
  {
    "url": "mysql/transaction.html",
    "revision": "127e3eeed6cf6fcbf6c500b139559be9"
  },
  {
    "url": "python/grammar.html",
    "revision": "5eb44948b8ddf76a913e2346a4ee22d6"
  },
  {
    "url": "python/index.html",
    "revision": "cab4ec3279e3dfb3493823521ecd3167"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "f320cd4bd301bd703fe475c2ad9d7153"
  },
  {
    "url": "recommender-systems/index.html",
    "revision": "f39fd4753e5b8e99bd169e585790fd73"
  },
  {
    "url": "recommender-systems/introduction.html",
    "revision": "66c10fdfd203c14d8c433b91becd77a3"
  },
  {
    "url": "redis/cache.html",
    "revision": "d771358e40d5348cb524cc212ab51c31"
  },
  {
    "url": "redis/cluster.html",
    "revision": "f137fcfbe39e1e7f17bf76fc83b5eeb2"
  },
  {
    "url": "redis/index.html",
    "revision": "adc1d33f4e213da0fbb739972d8d9fb8"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "35a90e4f6576b7a1cc37bca33421aa62"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "4b5da7f59914583a25a535b3f9cd042c"
  },
  {
    "url": "spring/index.html",
    "revision": "d1b8732dfe3331d03a16356a774fdcaa"
  },
  {
    "url": "spring/ioc.html",
    "revision": "050e00b16c58336a5eedd323da0acc07"
  },
  {
    "url": "spring/overall.html",
    "revision": "fdb11af5d7c40f77a8c6551c4bde808a"
  },
  {
    "url": "spring/references.html",
    "revision": "d8d6e888b14adc89920593e5f555db00"
  },
  {
    "url": "web/HTTP.html",
    "revision": "063ede4b0ac7f7e14ae00758593832f8"
  },
  {
    "url": "web/index.html",
    "revision": "464aab90c574e2401a732c62423c5070"
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
