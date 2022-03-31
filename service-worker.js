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
    "revision": "e6df8828433b30e336e366f71eb1fffb"
  },
  {
    "url": "about/index.html",
    "revision": "cdd80ceae1d360dc13d9e2cc83be95e0"
  },
  {
    "url": "algorithm/ds-001.html",
    "revision": "6de4f467bbe5d7bf5ac5f0b2dee3473e"
  },
  {
    "url": "algorithm/ds-002.html",
    "revision": "62f370e763f7bec69d30dd0e90944465"
  },
  {
    "url": "algorithm/ds-003.html",
    "revision": "b471353140d063d596f825fcb9c04fd9"
  },
  {
    "url": "algorithm/dynamic-programming.html",
    "revision": "5e01e3cdf4b3e945b7c57f6cea9f7f29"
  },
  {
    "url": "algorithm/index.html",
    "revision": "bba1c546d96f00249c7b1117f0df06ea"
  },
  {
    "url": "artificial-intelligence/index.html",
    "revision": "052467dd763f52de5c224aa399f44f9e"
  },
  {
    "url": "artificial-intelligence/search-strategies.html",
    "revision": "58361e2e843efe6e1c08a3dc4dc4c261"
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
    "url": "assets/js/10.3db72865.js",
    "revision": "db783046f806535532b1a249f0eb0747"
  },
  {
    "url": "assets/js/11.e2f5250c.js",
    "revision": "2e79754758abba07dd9436905b51d968"
  },
  {
    "url": "assets/js/12.f63fa97f.js",
    "revision": "86ab07f1a1d9526e6b6d4f20848ff2bf"
  },
  {
    "url": "assets/js/13.e42d27b0.js",
    "revision": "0e7815c004d9839c145499e879fef99a"
  },
  {
    "url": "assets/js/14.25b97c89.js",
    "revision": "5024da2e62e25f53e65bd5420f2f5e8f"
  },
  {
    "url": "assets/js/15.42284b63.js",
    "revision": "c62c3ecb0ec6778f8908bab6676c628d"
  },
  {
    "url": "assets/js/16.c222c94f.js",
    "revision": "ee57300323cdcc541b5f351789062163"
  },
  {
    "url": "assets/js/17.a7997758.js",
    "revision": "ee568bbbb4dcbf00ceea20465dfcf1a1"
  },
  {
    "url": "assets/js/18.8b231358.js",
    "revision": "596a00e5223048598414f84806f4b29b"
  },
  {
    "url": "assets/js/19.47486c9e.js",
    "revision": "193977a431edc3e6e9ae9d5a13f23f6e"
  },
  {
    "url": "assets/js/20.d4e96369.js",
    "revision": "73bf81d7e170f4e6de264b4f1ebfb657"
  },
  {
    "url": "assets/js/21.acff7b54.js",
    "revision": "b8bd34419f970e9e9d073044911f86c6"
  },
  {
    "url": "assets/js/22.24643371.js",
    "revision": "d6719e1f981d9ee9b9c88beec703653e"
  },
  {
    "url": "assets/js/23.9fee5a58.js",
    "revision": "48d97d4c5cd25bb17a1bea80d95d94e1"
  },
  {
    "url": "assets/js/24.4bebf76a.js",
    "revision": "1bca5e801321ac2d399f6c9bddf993ad"
  },
  {
    "url": "assets/js/25.fde177e7.js",
    "revision": "44f11616859ad379b5156bb82a542b31"
  },
  {
    "url": "assets/js/26.80f88484.js",
    "revision": "5275147677d7a70f33e763cae4cb87de"
  },
  {
    "url": "assets/js/27.cecf31ba.js",
    "revision": "46250eaafbcdd3510489f8830e7b4b3d"
  },
  {
    "url": "assets/js/28.29e0650a.js",
    "revision": "c742cf32dcc168ff237b7a592530c0da"
  },
  {
    "url": "assets/js/29.b892bd21.js",
    "revision": "c270254f0baa80df4a7d3ef9e7326ae8"
  },
  {
    "url": "assets/js/3.f2d02393.js",
    "revision": "9fb9b9b720ddb9bb65d5b2df4c758e10"
  },
  {
    "url": "assets/js/30.aacbbbb8.js",
    "revision": "77566f6b20c64f5a1883df67af3aae0c"
  },
  {
    "url": "assets/js/31.0576d241.js",
    "revision": "83d0e869c74cd7902da1bb2f570c4f0b"
  },
  {
    "url": "assets/js/32.d7ea036f.js",
    "revision": "6ca23457b26d62df29d7ee0456f8bd0a"
  },
  {
    "url": "assets/js/33.4a6c9ca0.js",
    "revision": "501003b4a58e8c78b9a700bf3f08ecbb"
  },
  {
    "url": "assets/js/34.8cf40115.js",
    "revision": "822ef28b88abd8c884ed7b2a959c8edd"
  },
  {
    "url": "assets/js/35.513f9a4f.js",
    "revision": "03b2c0120bc5ee31db5f47887e442d14"
  },
  {
    "url": "assets/js/36.fb2475e1.js",
    "revision": "5f314b2924cd3cc246ecd1e7e1508adb"
  },
  {
    "url": "assets/js/37.64084903.js",
    "revision": "03a3b07e7bcfcfcefe01d0279bd4c1b9"
  },
  {
    "url": "assets/js/38.d63c9968.js",
    "revision": "bd27cbce87c59c5d9ce85193bfc556db"
  },
  {
    "url": "assets/js/39.50d6f5ae.js",
    "revision": "99337dbf23624d1d725e8243e76f98df"
  },
  {
    "url": "assets/js/4.65404ac7.js",
    "revision": "afec3e767ffc56db1e4dfc94379bd57d"
  },
  {
    "url": "assets/js/40.c583dffc.js",
    "revision": "74bd6df866714a5b87f46bec27c2a7db"
  },
  {
    "url": "assets/js/41.dcc15789.js",
    "revision": "8fbaeb7c4385e46434ed37816c9eab22"
  },
  {
    "url": "assets/js/42.e998f07f.js",
    "revision": "7155e2d6504fc68c8381531074418f8c"
  },
  {
    "url": "assets/js/43.e2e1986a.js",
    "revision": "cf9d04a639da0ebdc7236947e2efb6b1"
  },
  {
    "url": "assets/js/44.efd61c75.js",
    "revision": "9b1f993a1e6d45e3924539d86a422566"
  },
  {
    "url": "assets/js/45.541fb74c.js",
    "revision": "1385a4a7786ce4d8e9437fd44306bbac"
  },
  {
    "url": "assets/js/46.10733275.js",
    "revision": "475b3e0ed6c3a9450a748b3087d06b43"
  },
  {
    "url": "assets/js/47.79cd74f9.js",
    "revision": "6756500aead20a3c80ea50875695757b"
  },
  {
    "url": "assets/js/48.fc3080de.js",
    "revision": "5e950a40528be2013db569451e0d0de4"
  },
  {
    "url": "assets/js/49.7c78796d.js",
    "revision": "1976a7858f1c438074037125ae2ce6dc"
  },
  {
    "url": "assets/js/5.56e21045.js",
    "revision": "76210f4dc10c4590cd2b037a531a8176"
  },
  {
    "url": "assets/js/50.9cd2609b.js",
    "revision": "56a1f662aae9218f4dfa2b4ac429eb33"
  },
  {
    "url": "assets/js/51.73cd79f1.js",
    "revision": "0213b2f7fdfff81b02ad3235dc2e0e58"
  },
  {
    "url": "assets/js/52.7350505a.js",
    "revision": "e654a8dd477ecd4f1e42764b4c3f75aa"
  },
  {
    "url": "assets/js/53.a32375fb.js",
    "revision": "288ba6eb66be79885d0e33270dea09fd"
  },
  {
    "url": "assets/js/54.d1f167ab.js",
    "revision": "6a0f7115ce726026fac34d836b80648c"
  },
  {
    "url": "assets/js/55.f1cb3d5d.js",
    "revision": "f9a4c282f3e9b7852003fafd06448391"
  },
  {
    "url": "assets/js/56.c7c4b97d.js",
    "revision": "6e85558340908c44e10a10d54bf1d88c"
  },
  {
    "url": "assets/js/57.d6cc6e06.js",
    "revision": "33c861ed7c7a15e3d3cf71bb52e6c27d"
  },
  {
    "url": "assets/js/58.9764dc9e.js",
    "revision": "928cc21848b78636db48b8e79ab51ff7"
  },
  {
    "url": "assets/js/59.82edadf9.js",
    "revision": "5a10706f32b170acd181aeaf1b245248"
  },
  {
    "url": "assets/js/6.16c5c887.js",
    "revision": "6b37fd8ebedddaf202deb1b26b3ef753"
  },
  {
    "url": "assets/js/60.a3faf4b1.js",
    "revision": "2270ea31ea5e6edb6cdb6ac55433a406"
  },
  {
    "url": "assets/js/61.97ded2da.js",
    "revision": "1710bfc9ec7931b9a2ce43f13f1ce622"
  },
  {
    "url": "assets/js/62.a7eefbfc.js",
    "revision": "5668d22ee33d535d101d83e1241bfa21"
  },
  {
    "url": "assets/js/63.61ce184c.js",
    "revision": "df2c322abb324ec79ec17364123742d6"
  },
  {
    "url": "assets/js/64.638d3159.js",
    "revision": "da32fd31b0eeeb7e509873e3227d817a"
  },
  {
    "url": "assets/js/65.89bd47ac.js",
    "revision": "3342a710ef38342b8274fa24559b39ff"
  },
  {
    "url": "assets/js/66.0cd54345.js",
    "revision": "c3255d28dd5e0e6a442a211274b11058"
  },
  {
    "url": "assets/js/67.19786ff1.js",
    "revision": "6d81d70ff91a8417402ff1a0176081c5"
  },
  {
    "url": "assets/js/68.b37f53a6.js",
    "revision": "aa151614e7c2fa338fa1ad89dadf69fe"
  },
  {
    "url": "assets/js/69.d6d579d9.js",
    "revision": "6a4ea017f6e1a1c84b03a8f08197ef99"
  },
  {
    "url": "assets/js/7.f03ab03b.js",
    "revision": "0feeeb94d041e431837aa57853fa448c"
  },
  {
    "url": "assets/js/70.7fa36fe8.js",
    "revision": "3c49c3d6d387f4d8d757b8f15b55f5f9"
  },
  {
    "url": "assets/js/8.ccb9356e.js",
    "revision": "1b5ed2ccfb5e74bf7a338a0556958cd4"
  },
  {
    "url": "assets/js/9.712118a5.js",
    "revision": "fac2a901b93447ccb60debcecef14f2c"
  },
  {
    "url": "assets/js/app.f41c9d4b.js",
    "revision": "f5578ae1be2d27dce14329168dd047c8"
  },
  {
    "url": "assets/js/vendors~flowchart.b0a817e3.js",
    "revision": "022b0bf8f0e7fc20c2ef50a0308c7ab1"
  },
  {
    "url": "big-data/index.html",
    "revision": "ee56c90ff29db47865ced480d5201e54"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "150d8d88bfb40058c45363addfa4d199"
  },
  {
    "url": "c/index.html",
    "revision": "0ed29d823e52619126f8228e9444e00c"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "55b7810e5d774da36916de8f8b9e3730"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "08c149ff4dcd7c52941bc6985b19291e"
  },
  {
    "url": "deep-learning/python-and-vectorization.html",
    "revision": "cea601a36cb1db49e14e9a086ec4ad65"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "hello-world/array-and-linked-list.html",
    "revision": "5648594ec7ede91377b3b6f6ff15b2dc"
  },
  {
    "url": "hello-world/binary-search.html",
    "revision": "4d36fa53bd5f4bb8b0ab9211301c791e"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "66afce20646d53099c5d1c2c6a999101"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "8a2589d68e7cac85ba78437d7cce38fb"
  },
  {
    "url": "hello-world/index.html",
    "revision": "8ae2ed2fe51e9124c13f923269473889"
  },
  {
    "url": "hello-world/setup-a-server-manually.html",
    "revision": "62b74de52f1bea16c84fa1d4a23d5d9c"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "0693258f54655acd942de7f2d276a66c"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "73c7ffe47abdec35dcedf384c84a2aa4"
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
    "revision": "e3e6cb4a8e46dc2879e493b58861ca78"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "f608ac8da5ee7634e37af72de984f526"
  },
  {
    "url": "java/API-io.html",
    "revision": "6708d52205eeb76181d8ffb5bfe7fcc5"
  },
  {
    "url": "java/API-lang.html",
    "revision": "28033c34988b3525c1cb837e92175400"
  },
  {
    "url": "java/API-util.html",
    "revision": "250f75a64d752848e29ff03cb4004a4c"
  },
  {
    "url": "java/grammars.html",
    "revision": "5fc8e64f4ef3d94f39bc73faa45fef83"
  },
  {
    "url": "java/index.html",
    "revision": "5801d271b1a9d95392c284eadfb3e3ef"
  },
  {
    "url": "java/jvm.html",
    "revision": "59caebbe64bdbe5e32086ef39bab4766"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "e75c0ba87c71b0a118e5414af5c5c79d"
  },
  {
    "url": "java/references.html",
    "revision": "a917b64749efc97e9fb0a18bf1ff4cf5"
  },
  {
    "url": "kotlin/index.html",
    "revision": "9b857b91fbee1c11f3e7774332e0599c"
  },
  {
    "url": "math/index.html",
    "revision": "3680434b6286a904b51ba487c8c3230b"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "202a653a922b0ac03bf634bff3edfef9"
  },
  {
    "url": "mysql/divide.html",
    "revision": "89f029a3406ad90b925e1cb950795743"
  },
  {
    "url": "mysql/index.html",
    "revision": "8eb96ee217491052345101ae9a45ab02"
  },
  {
    "url": "mysql/indices.html",
    "revision": "c775aa43462587a8ea005fc3902e8234"
  },
  {
    "url": "mysql/lock.html",
    "revision": "d89d513035f6e55482f97afd422e0e6f"
  },
  {
    "url": "mysql/question.html",
    "revision": "5f7706e6b52de74761e5659d631a749b"
  },
  {
    "url": "mysql/references.html",
    "revision": "9523819f026591960088ff5efc00c6f5"
  },
  {
    "url": "mysql/transaction.html",
    "revision": "c37ecc87aef2df87e2a0e3145eccbc1e"
  },
  {
    "url": "python/grammar.html",
    "revision": "76a5c03463f4a32981c5c291eb90c2c3"
  },
  {
    "url": "python/index.html",
    "revision": "5cf5fdcb3b8f791ddd225ed7fbc4ceda"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "2396732a6f2255850134454cc4cbbd59"
  },
  {
    "url": "recommender-systems/index.html",
    "revision": "39f7c190c744c0b797a5a30771ed4f76"
  },
  {
    "url": "recommender-systems/introduction.html",
    "revision": "3b8d6cadc81c709727eb9b0317fbfc98"
  },
  {
    "url": "redis/cache.html",
    "revision": "006ee34e7e7b40ddccd815ea37cfde4f"
  },
  {
    "url": "redis/cluster.html",
    "revision": "9c06d403819f69a275a13245bb8794a9"
  },
  {
    "url": "redis/index.html",
    "revision": "515567715e36d7247be9803f108d45cd"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "cca741120eb20e3ea42f7dd379cbc4c2"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "3156d3bfe7d86275777e0e51cd2e0d45"
  },
  {
    "url": "spring/index.html",
    "revision": "22b653e14fe5d9d67cb0c4abd47d009a"
  },
  {
    "url": "spring/ioc.html",
    "revision": "96063bb81148943d83e354b01cf438ae"
  },
  {
    "url": "spring/overall.html",
    "revision": "e7dea71e3a1f73a666ed21e64c71d2f7"
  },
  {
    "url": "spring/references.html",
    "revision": "cc39aef9bea9d30b819d20394cbee15f"
  },
  {
    "url": "web/HTTP.html",
    "revision": "d51c7d12ce940024e32b03200a889af1"
  },
  {
    "url": "web/index.html",
    "revision": "4ac084add2d53b27fee72ddaa3a68835"
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
