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
    "revision": "4d590527bad38ae0c137dd1ad04ff632"
  },
  {
    "url": "about/index.html",
    "revision": "f1080beb406672ebb5cc6d199d6445f0"
  },
  {
    "url": "algorithm/ds-001.html",
    "revision": "d99a34c3e252e798b3d5d679a6e17463"
  },
  {
    "url": "algorithm/index.html",
    "revision": "25b39a56b37eba3e7e5d39eea6b53989"
  },
  {
    "url": "artificial-intelligence/index.html",
    "revision": "ecaf9051bdeff1a6187a1daf97894db5"
  },
  {
    "url": "artificial-intelligence/search-strategies.html",
    "revision": "73149fdc28c3ce31f7482d58df0d000a"
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
    "url": "assets/js/10.659d688c.js",
    "revision": "4c89bfc0e19de480af360aa264210f0a"
  },
  {
    "url": "assets/js/11.e75f6980.js",
    "revision": "5f8e7864d1e14c6e4f822d10d09af566"
  },
  {
    "url": "assets/js/12.ad7da3c4.js",
    "revision": "f69e161d1a0e3ab5c47ca80dc70372f1"
  },
  {
    "url": "assets/js/13.bf7835e2.js",
    "revision": "da8100c20080d7e6e6400982692cf727"
  },
  {
    "url": "assets/js/14.75611cbe.js",
    "revision": "eda00cda1c1ab6f881a54163ad4481ac"
  },
  {
    "url": "assets/js/15.c7c90e2e.js",
    "revision": "72ae5e64a549ccb8682d8bc1b3bbd2c7"
  },
  {
    "url": "assets/js/16.108cc861.js",
    "revision": "09fe5dd741a03234cb8a7719160e74b0"
  },
  {
    "url": "assets/js/17.d62fc01b.js",
    "revision": "f8359d21bada5bb71d67728c6c7702b7"
  },
  {
    "url": "assets/js/18.7d779a70.js",
    "revision": "405418e8bd88e734f3fbac21b00a666c"
  },
  {
    "url": "assets/js/19.4f04c81d.js",
    "revision": "29893a83abf3f9b1979344c4e5b7b98e"
  },
  {
    "url": "assets/js/20.2c9b45fd.js",
    "revision": "39f8c11524daf25ab42365c931927e39"
  },
  {
    "url": "assets/js/21.8a669a43.js",
    "revision": "6ba784747bd8b01f652f122feb37b2cd"
  },
  {
    "url": "assets/js/22.03abd32b.js",
    "revision": "ca71368a8305137d56740a509a727d8e"
  },
  {
    "url": "assets/js/23.601c9bed.js",
    "revision": "f2570abeedcd3060cc98e7cb29145fe8"
  },
  {
    "url": "assets/js/24.626ae573.js",
    "revision": "6c0a4b8d9eab2ba9c22ae533fdb0fac5"
  },
  {
    "url": "assets/js/25.6f33a11e.js",
    "revision": "593814323131f72695b51f29d66930d1"
  },
  {
    "url": "assets/js/26.0183f231.js",
    "revision": "bd60a8ec1d3c26ead97b642d687a8650"
  },
  {
    "url": "assets/js/27.a5e7c143.js",
    "revision": "4d95bcddec9db741ad96f20782a4b195"
  },
  {
    "url": "assets/js/28.f8559ab3.js",
    "revision": "90372b8d8aba8e15237ec63b8b206b20"
  },
  {
    "url": "assets/js/29.f37daf6a.js",
    "revision": "1d353407df7eb6d9c9066ac99806fa4e"
  },
  {
    "url": "assets/js/3.edba18b2.js",
    "revision": "62870d284e83e738185e7d378e209234"
  },
  {
    "url": "assets/js/30.2d7f810e.js",
    "revision": "7498047ffd43483f59977e45d601be72"
  },
  {
    "url": "assets/js/31.d60d659c.js",
    "revision": "e856657d6d668b2e38f272319c16c7fa"
  },
  {
    "url": "assets/js/32.749f453f.js",
    "revision": "c6947993b941b3b9c2e4600687d1a435"
  },
  {
    "url": "assets/js/33.97e8cc83.js",
    "revision": "6900d4bbf8659f59523f940e1e57edd2"
  },
  {
    "url": "assets/js/34.58f60d62.js",
    "revision": "feeffcc95e1cd0a15744e73a25e6ecb9"
  },
  {
    "url": "assets/js/35.3338ad8d.js",
    "revision": "379c87406f5c17a92f03cf499953bdb6"
  },
  {
    "url": "assets/js/36.8163b227.js",
    "revision": "49a3a3ee73815ce37f5192604c8817ed"
  },
  {
    "url": "assets/js/37.74d3f5de.js",
    "revision": "8383db9a35b9026828feba5d26c5ca78"
  },
  {
    "url": "assets/js/38.fdf4c72b.js",
    "revision": "e2e21b5af7b6d35d5e178c88f3c0bfb9"
  },
  {
    "url": "assets/js/39.abcceb81.js",
    "revision": "41707b6729df3d91d49184911291045a"
  },
  {
    "url": "assets/js/4.3e9ac5f8.js",
    "revision": "be4c1d30061d60d51d8015edd35bf5dd"
  },
  {
    "url": "assets/js/40.c8a8068f.js",
    "revision": "9fedfaed01b3bd516beda9c4d0ba4c14"
  },
  {
    "url": "assets/js/41.bd84d893.js",
    "revision": "b669579ba9aca7b74a193d2ecf583194"
  },
  {
    "url": "assets/js/42.25d48f73.js",
    "revision": "c253b5ff8e4eb86b9ef597b2c34229ad"
  },
  {
    "url": "assets/js/43.c96f1c28.js",
    "revision": "23fed78fed4c3cad8ada0c95eb51b39c"
  },
  {
    "url": "assets/js/44.1bb91579.js",
    "revision": "7ddf25c2bd8a96759b75c2fe4b2225d0"
  },
  {
    "url": "assets/js/45.7e27fb98.js",
    "revision": "e36f01c7cc95de53209a2485b386e371"
  },
  {
    "url": "assets/js/46.24d28f92.js",
    "revision": "3f928778ed504fac9c7e2d24e3cac77e"
  },
  {
    "url": "assets/js/47.80151436.js",
    "revision": "ee975dd72534a4f427491ebdfdebb50b"
  },
  {
    "url": "assets/js/48.2e6619b7.js",
    "revision": "ffb9a42a2236cb60fed4ba1f530431c7"
  },
  {
    "url": "assets/js/49.9c58786f.js",
    "revision": "dbfb5e6ea785091b7d6bd3b3eff3d8a9"
  },
  {
    "url": "assets/js/5.74cf20d1.js",
    "revision": "0db79385c7d26c84d68b8b413a4c7c1e"
  },
  {
    "url": "assets/js/50.96218769.js",
    "revision": "56ad72ef6c099e0af9f447e837478eaa"
  },
  {
    "url": "assets/js/51.afcd4b15.js",
    "revision": "f4e3e68e5c717dd66d4065f8978bd6fc"
  },
  {
    "url": "assets/js/52.510b5aa6.js",
    "revision": "5ea8c05571cd2e1bf894d61e267d7c58"
  },
  {
    "url": "assets/js/53.81e4173d.js",
    "revision": "e505fcaac9afe80c0be302a27068b0f4"
  },
  {
    "url": "assets/js/54.b90e58b0.js",
    "revision": "2067ecf4da8e1411cd09c7f1697aca40"
  },
  {
    "url": "assets/js/55.d9119db8.js",
    "revision": "bf80fd64880f680bd11190116bf9f850"
  },
  {
    "url": "assets/js/56.3a8b052f.js",
    "revision": "28fe1b0152a56c20f2959699830a1edf"
  },
  {
    "url": "assets/js/57.40d80356.js",
    "revision": "5558e91c3567c4f4789e74f630e12aa4"
  },
  {
    "url": "assets/js/58.91e37b88.js",
    "revision": "62ac38ac20821cfdbc1d36e2041f22ee"
  },
  {
    "url": "assets/js/59.0cfbf0c4.js",
    "revision": "dbb2b75b241d80f58f76ba4f31a4a654"
  },
  {
    "url": "assets/js/6.85771ff3.js",
    "revision": "41ad23a4dfa85bacfadf2cab740a0c11"
  },
  {
    "url": "assets/js/7.9e531ddf.js",
    "revision": "40222fee32562a6ec358e1d52d56a265"
  },
  {
    "url": "assets/js/8.2a6c6fce.js",
    "revision": "62968ccb26b5dc33f06de1248fae8c49"
  },
  {
    "url": "assets/js/9.9fe60ec4.js",
    "revision": "1cb37f7bfe7689d94070bccbd7097956"
  },
  {
    "url": "assets/js/app.b1c910cf.js",
    "revision": "5f2f5c5a2d43cb0275795712ae61e7eb"
  },
  {
    "url": "assets/js/vendors~flowchart.9798c266.js",
    "revision": "2a03dda502c94817fdd2392f9021dea0"
  },
  {
    "url": "big-data/index.html",
    "revision": "6a6097d2685ee7f3cbdffc31692ffba0"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "2a7198f07806b5563114689503ed87e3"
  },
  {
    "url": "c/index.html",
    "revision": "e94f604370b680b462d87f8c9a70e037"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "705575fc53fda6801ade19542377a9de"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "4ecd67ce659c4fc952fe04f40abf81f6"
  },
  {
    "url": "deep-learning/python-and-vectorization.html",
    "revision": "0c7e4b0788ba674400cd24bbfadd03e1"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "front-end/index.html",
    "revision": "0296951c26cbb297f7fccff78c6f8bb6"
  },
  {
    "url": "hello-world/array-and-linked-list.html",
    "revision": "bdbf5a09de9ab0da54635fb732e35e35"
  },
  {
    "url": "hello-world/binary-search.html",
    "revision": "b22d0669ffb4ad3e379631dbc8ba3b4d"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "53408f3ef843ca4799079b57eb25408c"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "4290aee3c9954d5072ee0e2250095734"
  },
  {
    "url": "hello-world/index.html",
    "revision": "74d68963d0535e9ed2712620d8b60d81"
  },
  {
    "url": "hello-world/setup-a-server-manually.html",
    "revision": "970d681afe97d3fa46a079e1d9ae3d73"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "152a7be658341ea5c82c3971a476af1b"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "3a15ad64aea52b3836fb0f3d6c59c606"
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
    "revision": "2818eaa242c60d0729fbfad33c27f7ab"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "343777e80d740accd126af66e952242e"
  },
  {
    "url": "java/API-io.html",
    "revision": "d9de5c8527f24c8bbc691da07f79ebf7"
  },
  {
    "url": "java/API-lang.html",
    "revision": "3b690f590c1980bc10a27822fde3a7c6"
  },
  {
    "url": "java/API-util.html",
    "revision": "457fb3c63b40b168f150a400c918670e"
  },
  {
    "url": "java/grammars.html",
    "revision": "4c2f13e064353d20bd034eed54a34a7f"
  },
  {
    "url": "java/index.html",
    "revision": "27d7f28933f2a3b1bff6cea2e9f49e3b"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "a8fe78de553b29d430e164f40e83a3cc"
  },
  {
    "url": "java/references.html",
    "revision": "d3819886326904a43e42f4dacfd2c153"
  },
  {
    "url": "kotlin/index.html",
    "revision": "4ca4024078b04715f7f9fffcc61a9c18"
  },
  {
    "url": "math/index.html",
    "revision": "a48c5ce9b1cbd1941a483d55a3d1d6aa"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "0d1e465c8788e3087ba96696023a9bc0"
  },
  {
    "url": "mysql/index.html",
    "revision": "61a49ab2c6d23dd67d4ebe2643442fe9"
  },
  {
    "url": "mysql/indices.html",
    "revision": "13ff9cc9ee1edb50185c1e1f58100dfd"
  },
  {
    "url": "mysql/question.html",
    "revision": "08b12deea649fe603ec57955f79b9e27"
  },
  {
    "url": "mysql/references.html",
    "revision": "8c0654bdd45809289d3df71698948e32"
  },
  {
    "url": "mysql/transaction.html",
    "revision": "f07d901e9348530cca50efb4193d6bc8"
  },
  {
    "url": "python/grammar.html",
    "revision": "b4832593f2edc001cadafe6d5ad848b2"
  },
  {
    "url": "python/index.html",
    "revision": "7e035d4434cf92e9ab92c45921debcac"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "25e03f42f4ef490a9a8f8211775498c3"
  },
  {
    "url": "recommender-systems/index.html",
    "revision": "c0887255e39645934ce56c9ec5c5831c"
  },
  {
    "url": "recommender-systems/introduction.html",
    "revision": "001756e02ef6559ef99ba76a8617f39d"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "42701c5e3caff31adff9f15604a79845"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "d394fb444d0c39c62f516e10ae06c926"
  },
  {
    "url": "spring/index.html",
    "revision": "b9a628250b700a421377aebdcd486720"
  },
  {
    "url": "spring/ioc.html",
    "revision": "1504500a6b18487e7ed6ea148366bd7b"
  },
  {
    "url": "spring/overall.html",
    "revision": "fc8ca6fac3c3b065154faa6aa27e9c11"
  },
  {
    "url": "spring/references.html",
    "revision": "19c4498668154186668a728492c7018f"
  },
  {
    "url": "web/HTTP.html",
    "revision": "41d67575fb79a2d589cfb9ba3396fb77"
  },
  {
    "url": "web/index.html",
    "revision": "3995fb39af2e900797057aeaf8f65b85"
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
