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
    "revision": "71389d5dfd492d62facfc7cf7a2f0e65"
  },
  {
    "url": "about/index.html",
    "revision": "303298de0e0c1cccd7c5a4d1fc41ea01"
  },
  {
    "url": "algorithm/ds-001.html",
    "revision": "d7ebd004f9c6b6984470db1501f37960"
  },
  {
    "url": "algorithm/ds-002.html",
    "revision": "a4641620e2a8681923aae0fcdecc95c9"
  },
  {
    "url": "algorithm/ds-003.html",
    "revision": "8fb27b0320c8e7ed88eadb251635fa99"
  },
  {
    "url": "algorithm/dynamic-programming.html",
    "revision": "21afbf7edbcb74b8b24c9822b676d12e"
  },
  {
    "url": "algorithm/index.html",
    "revision": "e35a5cfe1a776266940b7aa5f0d4491e"
  },
  {
    "url": "artificial-intelligence/index.html",
    "revision": "2d4b5b43a2817daa3461992723f92592"
  },
  {
    "url": "artificial-intelligence/search-strategies.html",
    "revision": "631643c9d3d827661e455c173a2a470c"
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
    "url": "assets/js/10.27b9fd75.js",
    "revision": "572bbc6d0bcd14d6a05be8e425427efc"
  },
  {
    "url": "assets/js/11.251a2d25.js",
    "revision": "a95d6771610bd634070e2ae4824ba1c4"
  },
  {
    "url": "assets/js/12.ec72f4d2.js",
    "revision": "698969ece09ebdde6d1d0cd3b06adb1e"
  },
  {
    "url": "assets/js/13.58a27ce0.js",
    "revision": "10808881731f408d993d43bf4bbcf02f"
  },
  {
    "url": "assets/js/14.26351475.js",
    "revision": "127fd7de572a22fc1bf3debd54400471"
  },
  {
    "url": "assets/js/15.32bf1f65.js",
    "revision": "a63d55f22b89d8d6a19edf63108a01fc"
  },
  {
    "url": "assets/js/16.e335a045.js",
    "revision": "13357e13de7774051a378cec924d42ee"
  },
  {
    "url": "assets/js/17.43872067.js",
    "revision": "8e2bcc6e46d015fc2ca1ef638b6add11"
  },
  {
    "url": "assets/js/18.e900233e.js",
    "revision": "5153300ec5bfb5c5f9348a3c5c17c10a"
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
    "url": "assets/js/21.3ab9ce16.js",
    "revision": "db63483576ac29124135b356f53e6d6c"
  },
  {
    "url": "assets/js/22.a97ee47c.js",
    "revision": "49b04e0d5f5c9feb023d51ed18b4866f"
  },
  {
    "url": "assets/js/23.329445ac.js",
    "revision": "07016f0625d81dc498e569e54e267f4c"
  },
  {
    "url": "assets/js/24.e776f3f8.js",
    "revision": "09538cf0ef19fcae0d2253bc2e5e9843"
  },
  {
    "url": "assets/js/25.0462978e.js",
    "revision": "80c18c9d4b8be02f5c89c27b2407d0eb"
  },
  {
    "url": "assets/js/26.b1a17966.js",
    "revision": "f6267e1fe668b12d073d0e321f14521c"
  },
  {
    "url": "assets/js/27.dee33b8c.js",
    "revision": "7985a6c149a835830738c125c9ac657d"
  },
  {
    "url": "assets/js/28.c2b89128.js",
    "revision": "aeddc499ec289e1b3789dd36129e1a37"
  },
  {
    "url": "assets/js/29.1b707fe5.js",
    "revision": "5f009ffb65c80bb4af8218360d8cf49d"
  },
  {
    "url": "assets/js/3.a0fafcd7.js",
    "revision": "04695578a9ac4620d7dd202b353113bd"
  },
  {
    "url": "assets/js/30.a43170c9.js",
    "revision": "1c03fcfba9a2436a194cf643f62cf031"
  },
  {
    "url": "assets/js/31.87aca9ff.js",
    "revision": "ce3d1270ee196d9756062b70cc9155db"
  },
  {
    "url": "assets/js/32.92b6d63c.js",
    "revision": "8cd01b6432b85f2cbd336c70544c563f"
  },
  {
    "url": "assets/js/33.028ae567.js",
    "revision": "607f75bc7d7bbd5ad18910ceef9e39af"
  },
  {
    "url": "assets/js/34.0a747a13.js",
    "revision": "861cb49e5f779bc80ff7467a19c4544a"
  },
  {
    "url": "assets/js/35.83d3e256.js",
    "revision": "76fb75b313df13dd9f58112d454299fc"
  },
  {
    "url": "assets/js/36.1380e203.js",
    "revision": "920c3e15887955697171ad44a4d6073a"
  },
  {
    "url": "assets/js/37.1d7d202d.js",
    "revision": "9c711e815750d0e32acab87b653c2811"
  },
  {
    "url": "assets/js/38.c4c2fe58.js",
    "revision": "9b5e2f814240a9c24b0cd77327279f1e"
  },
  {
    "url": "assets/js/39.9f567607.js",
    "revision": "47d3fd2f163703cb82f7426356412feb"
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
    "url": "assets/js/41.650c7e0f.js",
    "revision": "e71a5431b02fdefeb7a1b134cebe00ba"
  },
  {
    "url": "assets/js/42.616b9978.js",
    "revision": "52db4e1508264434ff22c17d2c715ee7"
  },
  {
    "url": "assets/js/43.501f3642.js",
    "revision": "175a091bc5725a9115dcbcfc074bb5b4"
  },
  {
    "url": "assets/js/44.c815d413.js",
    "revision": "5995b08b1c89e39bb35a2713d757611b"
  },
  {
    "url": "assets/js/45.6c621469.js",
    "revision": "cdf1bc3224400927c713ae1a13916658"
  },
  {
    "url": "assets/js/46.df0565ab.js",
    "revision": "4753c37da1a62e6de4972eb21d42c0f6"
  },
  {
    "url": "assets/js/47.8d318aed.js",
    "revision": "125641cb34d13058ed1948b3cd51cbf4"
  },
  {
    "url": "assets/js/48.d5322737.js",
    "revision": "b01c598111d78d84b2749e3c3cabf008"
  },
  {
    "url": "assets/js/49.26691289.js",
    "revision": "3ba85a66a013ce303e2e768047123440"
  },
  {
    "url": "assets/js/5.ebfd9835.js",
    "revision": "a41bed5a2d55dfba967d6c120a218cb4"
  },
  {
    "url": "assets/js/50.6f7e9f28.js",
    "revision": "2c37446f58945567f7ef7149efe2bd00"
  },
  {
    "url": "assets/js/51.1dfda3a1.js",
    "revision": "62a1d16263cff2852674ad762722af9c"
  },
  {
    "url": "assets/js/52.96efee34.js",
    "revision": "ea1fb589e7ec5e392019a81f730b2a2b"
  },
  {
    "url": "assets/js/53.70784990.js",
    "revision": "e3eed4c2927d493ec710738b3ab5a81a"
  },
  {
    "url": "assets/js/54.56965dfd.js",
    "revision": "3f31bf2e5d7299aa4fdf267cc1c6e473"
  },
  {
    "url": "assets/js/55.ef710949.js",
    "revision": "8e152d3cf39842fe709765dd26cb656f"
  },
  {
    "url": "assets/js/56.813a4e89.js",
    "revision": "aae0acde7eed82853ecc7c717d45fa51"
  },
  {
    "url": "assets/js/57.577ea04d.js",
    "revision": "555f50bf90b2e519a19ed2a5865fe8a9"
  },
  {
    "url": "assets/js/58.8a1b6dde.js",
    "revision": "1d9e7c216ab0a272b059dff3e009f167"
  },
  {
    "url": "assets/js/59.82b1f83b.js",
    "revision": "f3541024b1ca90d336fcd160f0d837e8"
  },
  {
    "url": "assets/js/6.c1de91b0.js",
    "revision": "36cb0daafaf8b421533e0ca5e77fd0b0"
  },
  {
    "url": "assets/js/60.e5d4a22a.js",
    "revision": "2c75228d0ed335b41dde0acfac7f09a3"
  },
  {
    "url": "assets/js/61.e1bc85ad.js",
    "revision": "abcca222300a58a3e72acc25e41afcda"
  },
  {
    "url": "assets/js/62.b7d54870.js",
    "revision": "f34bef85c36eb38db9b72468d7286a70"
  },
  {
    "url": "assets/js/63.7cd44c24.js",
    "revision": "174870bdd158720302a13c2b5f2305ac"
  },
  {
    "url": "assets/js/64.a61329de.js",
    "revision": "8eda6095dfb889adfa775f2116ed3f99"
  },
  {
    "url": "assets/js/65.0393dc72.js",
    "revision": "90e268d8331928e28bd4b815a5f0b967"
  },
  {
    "url": "assets/js/66.cf3ed885.js",
    "revision": "80bdc894d5556020ec7b45eeff31add1"
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
    "url": "assets/js/app.3212fed2.js",
    "revision": "2ca64730b90f315706ae09f54463a6cc"
  },
  {
    "url": "assets/js/vendors~flowchart.1688cdd8.js",
    "revision": "4bf1246381ad0f6f04a98c4e983315ce"
  },
  {
    "url": "big-data/index.html",
    "revision": "109814cc8fedb74ea9adad50228f24bc"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "40c09a00a6ade89da063c9bbb5a3d877"
  },
  {
    "url": "c/index.html",
    "revision": "69bd3123cc0facba179a06ae478bd967"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "f37b8f6b37a935aed6173a7ed11920d1"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "d40633b522b672468799ecef6ca6b08b"
  },
  {
    "url": "deep-learning/python-and-vectorization.html",
    "revision": "87ae74f33dfcbc54fec2b96034675571"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "hello-world/array-and-linked-list.html",
    "revision": "9b8136b23a3c53e0c2e5204e2428589f"
  },
  {
    "url": "hello-world/binary-search.html",
    "revision": "8894c387c5192e96dab7952aa72e460f"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "d8e403097811bab4cecbf6e6aa45c582"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "5e0cb4a7e4a616a74ab29aba06ce42ee"
  },
  {
    "url": "hello-world/index.html",
    "revision": "4e779d97e57fe329caaea41055ceedb6"
  },
  {
    "url": "hello-world/setup-a-server-manually.html",
    "revision": "ef65ef342da8a01de15397130780cb22"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "b840a3e047fe2aa7f8d471285e967a99"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "0ab10c450c9092164fa4f365443b4571"
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
    "revision": "5f719d55c65d8ec0a87576555383f174"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "b5c9b04028f8205e132a420cb19928b3"
  },
  {
    "url": "java/API-io.html",
    "revision": "3c786fc083873e5f04fc0423609d170c"
  },
  {
    "url": "java/API-lang.html",
    "revision": "a532f91326cec22ee87c46548765035b"
  },
  {
    "url": "java/API-util.html",
    "revision": "4ac7feec725ad725f0579c14edf404f5"
  },
  {
    "url": "java/grammars.html",
    "revision": "217351708a077035c25ddb3218e42e5b"
  },
  {
    "url": "java/index.html",
    "revision": "ca9fade12142cc79af1465028d12315c"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "5cabef6db716af82226a78a63838731d"
  },
  {
    "url": "java/references.html",
    "revision": "7eea718a32473e4edce6720edb3e3138"
  },
  {
    "url": "kotlin/index.html",
    "revision": "743a66b53a28f9a2ea0610e9f6156ef2"
  },
  {
    "url": "math/index.html",
    "revision": "8845a4dea4c97dbac735bbfbfa6c9336"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "d12f57fbdc893b9c6a30692bcad607ee"
  },
  {
    "url": "mysql/divide.html",
    "revision": "6ddba4848a8504c97f9880fca804d0f6"
  },
  {
    "url": "mysql/index.html",
    "revision": "5cb0910699e9acd10a5b0177e39a8fc8"
  },
  {
    "url": "mysql/indices.html",
    "revision": "5ee1372cb31855cbc891fd0f7ae4f7a9"
  },
  {
    "url": "mysql/lock.html",
    "revision": "53fb90d4bee1b9a990399f35e39830eb"
  },
  {
    "url": "mysql/question.html",
    "revision": "6525a4935b5665958f3b9fbe188bc527"
  },
  {
    "url": "mysql/references.html",
    "revision": "d59c51858b7cc459b31ba4c3c053c83d"
  },
  {
    "url": "mysql/transaction.html",
    "revision": "99d447cb9371bc8fce2756b5dc0017f5"
  },
  {
    "url": "python/grammar.html",
    "revision": "b2501c60c877716e0f7d0dc924915647"
  },
  {
    "url": "python/index.html",
    "revision": "8a6d9d0db0a2e843bd393683920d6bbf"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "061c12f4020bcf27d26d71be001c74a9"
  },
  {
    "url": "recommender-systems/index.html",
    "revision": "2f8e4abdde4c5b21def2333631c7b616"
  },
  {
    "url": "recommender-systems/introduction.html",
    "revision": "a643ab2e9d214e79e97518d6bd056100"
  },
  {
    "url": "redis/cache.html",
    "revision": "e352a22942caf7b88bfd2b15607df75d"
  },
  {
    "url": "redis/cluster.html",
    "revision": "3690dd4d037f9737ece60db5acaaa65e"
  },
  {
    "url": "redis/index.html",
    "revision": "b41811eb84a467597767dad08723be5b"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "dc628db26e4aa15ebf9f6f8ae624f38d"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "abe90bbddaa802dbd4cbff19b8852f67"
  },
  {
    "url": "spring/index.html",
    "revision": "7a30b88eddf311ae44f0210dc5146526"
  },
  {
    "url": "spring/ioc.html",
    "revision": "01d153e389929bc7008f7c48eecdd049"
  },
  {
    "url": "spring/overall.html",
    "revision": "b1b161b0270940ae40908d30d4b33e92"
  },
  {
    "url": "spring/references.html",
    "revision": "e255e3605d8dc404f1bfdc5336b06ea9"
  },
  {
    "url": "web/HTTP.html",
    "revision": "1a5a76f9c031bbe140a95ef1baac5cb2"
  },
  {
    "url": "web/index.html",
    "revision": "77dd69dfcdf2d0762c866ce774c4f5b1"
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
