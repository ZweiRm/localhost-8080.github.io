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
    "revision": "1e4d0a2c60694d5ea5c76baa514f1a58"
  },
  {
    "url": "about/index.html",
    "revision": "ddc80c9becdaeca472f9a41ecab36945"
  },
  {
    "url": "algorithm/ds-001.html",
    "revision": "a82653e85be72d3c69188ca0da184739"
  },
  {
    "url": "algorithm/ds-002.html",
    "revision": "c99ce5bbe043ceb1e481f4ef03a00b4c"
  },
  {
    "url": "algorithm/ds-003.html",
    "revision": "675002ea7020f27d68ff9537f787147b"
  },
  {
    "url": "algorithm/dynamic-programming.html",
    "revision": "d1a7b2748f27890404f56839895298a8"
  },
  {
    "url": "algorithm/index.html",
    "revision": "a892cb38b6b2ff7aeb7158e48c7ea5b8"
  },
  {
    "url": "artificial-intelligence/index.html",
    "revision": "2b0b7068f253b3c23c6e1971df2e8962"
  },
  {
    "url": "artificial-intelligence/search-strategies.html",
    "revision": "762b982e95084d2af1e7932cc4d11df5"
  },
  {
    "url": "assets/css/0.styles.ecc20c62.css",
    "revision": "9dda647ba53b032eeab719b0d9e94fe8"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.a5161dde.js",
    "revision": "9f0ac999b4c53aeff01e21352819206b"
  },
  {
    "url": "assets/js/11.d9d749fe.js",
    "revision": "a70a27ffbb1f18ee471f44f80d99e980"
  },
  {
    "url": "assets/js/12.e9fd7213.js",
    "revision": "c01bbcdef5d1ad97ee13b558d7dcd6aa"
  },
  {
    "url": "assets/js/13.752bd570.js",
    "revision": "ae3a3a73a998aeb3774fc8716ee99046"
  },
  {
    "url": "assets/js/14.74353e5c.js",
    "revision": "4c2212532794be06bde15a6916cea156"
  },
  {
    "url": "assets/js/15.6d78bf84.js",
    "revision": "fb929e83453fd6bb2d7c7ea097b1de90"
  },
  {
    "url": "assets/js/16.5f0818f2.js",
    "revision": "ce36b971df69e127181cf88259b5f7f9"
  },
  {
    "url": "assets/js/17.befe7212.js",
    "revision": "e293d2009ee81767f3d06b53454359cf"
  },
  {
    "url": "assets/js/18.d84b5664.js",
    "revision": "8eb81cd0333db6e2bc228bc71b65b7ee"
  },
  {
    "url": "assets/js/19.5e271eff.js",
    "revision": "7491b8597cf3a43567ae6c6088892d05"
  },
  {
    "url": "assets/js/20.5b385699.js",
    "revision": "5742dc5ceac3b97ee27375a7c5720901"
  },
  {
    "url": "assets/js/21.abb57c4d.js",
    "revision": "1dc669cd20ec82e63cedf306ecbb895c"
  },
  {
    "url": "assets/js/22.ca27b41c.js",
    "revision": "3595d7c019e5a81f953f15995fd95f23"
  },
  {
    "url": "assets/js/23.7cc6f7fb.js",
    "revision": "94901289ae483a1a976e4b87cd1e2852"
  },
  {
    "url": "assets/js/24.df6e70d5.js",
    "revision": "5eef316962d9aca586c843e650d80136"
  },
  {
    "url": "assets/js/25.e47db156.js",
    "revision": "aa747da953c11e2d3ada25c5d826225a"
  },
  {
    "url": "assets/js/26.ea53f69d.js",
    "revision": "3c8d7292039da2826c5959a849ad3cd5"
  },
  {
    "url": "assets/js/27.e74e39a4.js",
    "revision": "9d2a15ab601439390f67374ff200b7d0"
  },
  {
    "url": "assets/js/28.37f33672.js",
    "revision": "9134f15e3ca8ecb97cfcae52213b3ad8"
  },
  {
    "url": "assets/js/29.13565ef4.js",
    "revision": "5c86d1014900b9b00d1fc1cbaa95064b"
  },
  {
    "url": "assets/js/3.f83a99be.js",
    "revision": "5666ccc39e11f2b5280d890c65c9d68d"
  },
  {
    "url": "assets/js/30.c5a8587d.js",
    "revision": "441595aac803afe42e7eddd65bb44958"
  },
  {
    "url": "assets/js/31.3e83ac1d.js",
    "revision": "dcc6cd6085804956302d7f6aa960694e"
  },
  {
    "url": "assets/js/32.4b242ec9.js",
    "revision": "77e967bf7ed10cc04aa769869d7e4fba"
  },
  {
    "url": "assets/js/33.5dae66c1.js",
    "revision": "07ef2365c8ed33d6c14196e4344f4543"
  },
  {
    "url": "assets/js/34.69c54f82.js",
    "revision": "1b38444097f333bd11e7e1f30a68c1d1"
  },
  {
    "url": "assets/js/35.451420fc.js",
    "revision": "e3ff655535f6a42b5783357da30b7218"
  },
  {
    "url": "assets/js/36.38908e43.js",
    "revision": "53d910fe49678bff58394ce88e77c8c5"
  },
  {
    "url": "assets/js/37.dcae9c46.js",
    "revision": "2e1d2fc0a825040de807f2b6d07fb497"
  },
  {
    "url": "assets/js/38.87c13e35.js",
    "revision": "c949c8bff5349e09ecf8bbdfa8709123"
  },
  {
    "url": "assets/js/39.ae81f180.js",
    "revision": "8c8417b22e3ebbf479cd9c77b0417ddd"
  },
  {
    "url": "assets/js/4.e99d6e4e.js",
    "revision": "27532e090189728ee67fff78ba750a1e"
  },
  {
    "url": "assets/js/40.36c4f11d.js",
    "revision": "fc53d84d154c6f161bc5985fe16f739a"
  },
  {
    "url": "assets/js/41.fdb38cd8.js",
    "revision": "0f7016f8a736ba26b2e7c1dacea825d9"
  },
  {
    "url": "assets/js/42.6314fab3.js",
    "revision": "4c036eb4ea620282215dcc3283aa59bb"
  },
  {
    "url": "assets/js/43.c6ac6c24.js",
    "revision": "1ef366a216975a08a8e0dca9a36ce956"
  },
  {
    "url": "assets/js/44.b5213dfa.js",
    "revision": "3afa7e07d30c53c6265323b32826727e"
  },
  {
    "url": "assets/js/45.db704e14.js",
    "revision": "c993e16cf6482a80202772722eefa088"
  },
  {
    "url": "assets/js/46.874d23c4.js",
    "revision": "16c03d2aa1f8f7b970545df950b2da97"
  },
  {
    "url": "assets/js/47.713dd6ed.js",
    "revision": "e3a331eaafe9f74cc0c3b2aedc6249a8"
  },
  {
    "url": "assets/js/48.9916d458.js",
    "revision": "bdf08503871b3cabda8acebd1ea8f77f"
  },
  {
    "url": "assets/js/49.fa622c3c.js",
    "revision": "303f59fda86fe5c505e8790d0472c4a0"
  },
  {
    "url": "assets/js/5.612dc22d.js",
    "revision": "58c4483416df5853ff9e544f2459f30e"
  },
  {
    "url": "assets/js/50.a6923b34.js",
    "revision": "d1578d0def78807bf16ffdd470118d7c"
  },
  {
    "url": "assets/js/51.6c6078d0.js",
    "revision": "5accbaa21aa6ae7c4b4f2db3aa47bfc1"
  },
  {
    "url": "assets/js/52.9de35595.js",
    "revision": "dd9ea464bb97cff5f325ad0a7df4bd9d"
  },
  {
    "url": "assets/js/53.82472cc3.js",
    "revision": "c11aeb368cbe7e803f8d90c6a069e4ca"
  },
  {
    "url": "assets/js/54.47d098cf.js",
    "revision": "5b0a533084b9f6ce6f94a6092a25c9e8"
  },
  {
    "url": "assets/js/55.c6569a40.js",
    "revision": "77e726f272aa10cecb1143cf9b474444"
  },
  {
    "url": "assets/js/56.b1de2e32.js",
    "revision": "d6a826c38a29753c3f8f000bd4ad5be1"
  },
  {
    "url": "assets/js/57.562e9d38.js",
    "revision": "5421c6f037d3235a617709a404dafd8e"
  },
  {
    "url": "assets/js/58.09c681fc.js",
    "revision": "0bb52f377eee29673a5aa8e1e2c7989e"
  },
  {
    "url": "assets/js/59.52cdc848.js",
    "revision": "ae90104d5c21079fd1c3677221635248"
  },
  {
    "url": "assets/js/6.99f29953.js",
    "revision": "f01027734dea5efbe6411d9538ace0ba"
  },
  {
    "url": "assets/js/60.655b586f.js",
    "revision": "fb29f398161ff3534d29a9b338ffff34"
  },
  {
    "url": "assets/js/61.fb26c5b2.js",
    "revision": "8b7b40740805e060f04aaf43935d42f8"
  },
  {
    "url": "assets/js/62.4df0d4f3.js",
    "revision": "811e93fcd521cc386c96ef55359f608f"
  },
  {
    "url": "assets/js/63.81161c74.js",
    "revision": "435078b0dda00e81e52d7371f872a428"
  },
  {
    "url": "assets/js/64.e0b4dd35.js",
    "revision": "2e4763c813cc75b64c6a8d28395209a0"
  },
  {
    "url": "assets/js/65.2c27de1a.js",
    "revision": "d35fb3f9c04cd7418a42f129e509e261"
  },
  {
    "url": "assets/js/66.8b69ae23.js",
    "revision": "2957e4ceec7af7adb97f09359ec12c1a"
  },
  {
    "url": "assets/js/67.98709f71.js",
    "revision": "83643b4f919087f77631152f032c2fa0"
  },
  {
    "url": "assets/js/68.8d32d42c.js",
    "revision": "58492cf78bf2fa5ebd92458f9637c3f8"
  },
  {
    "url": "assets/js/69.70eedef4.js",
    "revision": "d477e2a21a11c4dcabf3b4ab147adb55"
  },
  {
    "url": "assets/js/7.fc3990b3.js",
    "revision": "bdb289c68bef3bb6c3d9d005c49b62bf"
  },
  {
    "url": "assets/js/70.5c51f62e.js",
    "revision": "b96ab29685e4f2319d94ac3e31ba79da"
  },
  {
    "url": "assets/js/8.cd912e3b.js",
    "revision": "8190ae0a70588bfd4b8da47b13f12e7d"
  },
  {
    "url": "assets/js/9.b00a2bb6.js",
    "revision": "1f0efe70195914a228841599861bac0f"
  },
  {
    "url": "assets/js/app.ed89cf52.js",
    "revision": "75f1995e5e55ed10340d1170cdc61891"
  },
  {
    "url": "assets/js/vendors~flowchart.899652fe.js",
    "revision": "1a4a2e36ed845872fc6b862d84a31925"
  },
  {
    "url": "big-data/index.html",
    "revision": "d04ed1200316b4129bb3c70229399d7d"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "0d8c19f9fff871b66b727e2d2352408f"
  },
  {
    "url": "c/index.html",
    "revision": "68d2ef834c0e3a06189079d510968ea1"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "ca992bd665e7d711abf8ae614ccbb748"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "85145a02cc6de19d60f1a74d995b9d53"
  },
  {
    "url": "deep-learning/python-and-vectorization.html",
    "revision": "cce71a568e2e6301ed2fbadc30c88c0d"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "hello-world/array-and-linked-list.html",
    "revision": "05dbeff96ff66cba336e102151369922"
  },
  {
    "url": "hello-world/binary-search.html",
    "revision": "a972789350ab19ed9ad484f92c256d6e"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "7a0e7bbe731cbc00ef096a2d739c3b05"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "403b5533e311b0e1bdb88a5aa4a08cf0"
  },
  {
    "url": "hello-world/index.html",
    "revision": "a2517ec213f3a3c30f872018a68f7ebf"
  },
  {
    "url": "hello-world/setup-a-server-manually.html",
    "revision": "2dd7ff74a1bb0781d968e53a294a6be3"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "aa9644e676e54c28b47d55388e636dd6"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "cd9060f79a08494fff4cd8791e8c4717"
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
    "revision": "b8cfcae2a64e6964b95050067d8e63b8"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "6b4392dfa71376b80276cd8e395dc7ae"
  },
  {
    "url": "java/API-io.html",
    "revision": "6df5df6b5dd873c0fe66800820a87c30"
  },
  {
    "url": "java/API-lang.html",
    "revision": "a646f589315b728ab1056e4ccc3c1cb3"
  },
  {
    "url": "java/API-util.html",
    "revision": "e7b6c542a71dfdf70f32636d11a4446d"
  },
  {
    "url": "java/grammars.html",
    "revision": "4c3c22596ed303ce666d19214725885c"
  },
  {
    "url": "java/index.html",
    "revision": "b0a88a8ba9f1bd4578dcdcbfa45a0b18"
  },
  {
    "url": "java/jvm.html",
    "revision": "ce04dd267b17735b297deed472018474"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "91c505f616bde25ebfb14eff01f70c11"
  },
  {
    "url": "java/references.html",
    "revision": "f57ee5bdfe8df48006c0eb0e6b151122"
  },
  {
    "url": "kotlin/index.html",
    "revision": "ce88fbb2ca1387a7d8267b7e9ff33472"
  },
  {
    "url": "math/index.html",
    "revision": "11a0f59d2f26e816c56f23818d5359e3"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "afbe5f115d2213ea0c9e8dcd39627c35"
  },
  {
    "url": "mysql/divide.html",
    "revision": "fb2e527f200a4d20c71bb08330feb621"
  },
  {
    "url": "mysql/index.html",
    "revision": "05454f3a75f506512ef5c4ee346f11c7"
  },
  {
    "url": "mysql/indices.html",
    "revision": "2dce0598512de8eaa3cb149729112148"
  },
  {
    "url": "mysql/lock.html",
    "revision": "e8967e706d08e6dabebc3ae697b74143"
  },
  {
    "url": "mysql/question.html",
    "revision": "7877614055fb51843c27b6c4a15aa068"
  },
  {
    "url": "mysql/references.html",
    "revision": "0b6065e75a6f1254b5443f05e43459c7"
  },
  {
    "url": "mysql/transaction.html",
    "revision": "bb8fc81ab5291927a7171bc1caa2f82d"
  },
  {
    "url": "python/grammar.html",
    "revision": "c8a83e005d2a88b05559abf527bf0e5a"
  },
  {
    "url": "python/index.html",
    "revision": "cdb783d3a63fcdddaf72d3fa37d0b90e"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "98ee7808a63348f6df1c82b8a81748ef"
  },
  {
    "url": "recommender-systems/index.html",
    "revision": "35cb26961f8111069e6348a307ab1c35"
  },
  {
    "url": "recommender-systems/introduction.html",
    "revision": "50554a0cd26007c4c3456fb81813f300"
  },
  {
    "url": "redis/cache.html",
    "revision": "f1272037a571726eccabeaed605d1d7d"
  },
  {
    "url": "redis/cluster.html",
    "revision": "0b8f336798f5248332cc21f815983201"
  },
  {
    "url": "redis/index.html",
    "revision": "d778d8ac1c0760442f80a99b2be78be8"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "589c305b357623d1a553c42b1cc63c0b"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "7718cd4255f5281fb48370584d428259"
  },
  {
    "url": "spring/index.html",
    "revision": "8981e26cfcf1953b83a370464534c2ad"
  },
  {
    "url": "spring/ioc.html",
    "revision": "ef4086c53523e97385dbcfd46c3727d1"
  },
  {
    "url": "spring/overall.html",
    "revision": "fc0d25f33c875ac5cc83d3458c92a027"
  },
  {
    "url": "spring/references.html",
    "revision": "a9d743c1d43ef52ad71801439d0094f8"
  },
  {
    "url": "web/HTTP.html",
    "revision": "9e483e5c73228d7eaa8d156931f92efc"
  },
  {
    "url": "web/index.html",
    "revision": "8ceb9b0f1d3bf6fa59c81d2247ef3c5d"
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
