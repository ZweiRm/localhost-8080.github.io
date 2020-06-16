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
    "revision": "d60aa466e0c085e7626f70315a4155f5"
  },
  {
    "url": "about/index.html",
    "revision": "f7f4a60398ff622a51b8f479b38ae8a8"
  },
  {
    "url": "assets/css/0.styles.9092888f.css",
    "revision": "b5284a60dc3ec41b684e227b68b490c4"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.d9d542a1.js",
    "revision": "74908a7a4d957d374f28b01bf44efe19"
  },
  {
    "url": "assets/js/11.beaa2318.js",
    "revision": "a09dba333ad0c269d2edf73a39230580"
  },
  {
    "url": "assets/js/12.b5bb6919.js",
    "revision": "69779ca82239bc6a192f89428c68260b"
  },
  {
    "url": "assets/js/13.bd75ac34.js",
    "revision": "2795f214e9cc5a7d068a747712fd9ac8"
  },
  {
    "url": "assets/js/14.2ab53a8b.js",
    "revision": "afd753d38e3a06f996812aaa84902309"
  },
  {
    "url": "assets/js/15.3f90ac36.js",
    "revision": "7282e862c44b943679f12d2b00c537e9"
  },
  {
    "url": "assets/js/16.d9715fe1.js",
    "revision": "1b40564cd7fe27c813f641ee0a8a16a0"
  },
  {
    "url": "assets/js/17.b3f74247.js",
    "revision": "7d1a604d1eb3921cbb585172b7c8021f"
  },
  {
    "url": "assets/js/18.68c8311e.js",
    "revision": "bbfea15db90546820a65711dd3252d3a"
  },
  {
    "url": "assets/js/19.5b3f7b97.js",
    "revision": "1f58043e6bc44cfe5724c8fdb940c98b"
  },
  {
    "url": "assets/js/20.3bfffc34.js",
    "revision": "62fbd74be708cc6b8fa2f11c9db43165"
  },
  {
    "url": "assets/js/21.24bba576.js",
    "revision": "f44aae89ab91b8eead60a8cc01ab05f6"
  },
  {
    "url": "assets/js/22.53fe59ac.js",
    "revision": "ea3e97f41f41374dd4044640cb6ff133"
  },
  {
    "url": "assets/js/23.6fb4f714.js",
    "revision": "dc8373154a3ac251636d4685436a56a8"
  },
  {
    "url": "assets/js/24.9f9019a1.js",
    "revision": "4fa62cd2a8863a2ac84a3d16edfc8059"
  },
  {
    "url": "assets/js/25.62f5afef.js",
    "revision": "f3605178ebd9558c6f993d6626a0f4da"
  },
  {
    "url": "assets/js/26.589c126b.js",
    "revision": "6498d8452e0778ac79f688c442aedfee"
  },
  {
    "url": "assets/js/27.aa7c3244.js",
    "revision": "332f6bbf8a8b02366341dc99a606d25d"
  },
  {
    "url": "assets/js/28.ce6c7a01.js",
    "revision": "3952eca049350a07f412d27b4250f0a3"
  },
  {
    "url": "assets/js/29.e664f677.js",
    "revision": "2870438f53d60bfd4f499fa90af25bb2"
  },
  {
    "url": "assets/js/3.1f8efb2d.js",
    "revision": "5ea5378b14ee991bde3fc267a0a69cfe"
  },
  {
    "url": "assets/js/30.b196f1ad.js",
    "revision": "5d9117d8148f29813abd28c90487e939"
  },
  {
    "url": "assets/js/31.61dd9921.js",
    "revision": "22b73b6980950a28790d7765f9e5a339"
  },
  {
    "url": "assets/js/32.330ffee7.js",
    "revision": "0771aa505c5924445344342c4aba89ef"
  },
  {
    "url": "assets/js/33.879016bb.js",
    "revision": "891fca1c334d325e7c9de6d0024b0cf5"
  },
  {
    "url": "assets/js/34.90b569ac.js",
    "revision": "ef8f01ede16f6476132c302ca29e82b5"
  },
  {
    "url": "assets/js/35.0cba767a.js",
    "revision": "61d2c170fb9e0adf84c055859cbd8da7"
  },
  {
    "url": "assets/js/36.f5d5ef5b.js",
    "revision": "546a7bd08e580b899aa3537a53cd11b1"
  },
  {
    "url": "assets/js/37.3e0c847e.js",
    "revision": "2fd15ae7ad6a3fbf9a3143cb7d29501d"
  },
  {
    "url": "assets/js/38.76ad4445.js",
    "revision": "8b57f1a044efe40ef9496c7665956712"
  },
  {
    "url": "assets/js/39.65a77180.js",
    "revision": "a8534f9d88bf5c663af6840735609123"
  },
  {
    "url": "assets/js/4.2685b650.js",
    "revision": "acdfa1a4ed15cb8b2a54613637e7ba61"
  },
  {
    "url": "assets/js/5.8bdd5415.js",
    "revision": "413a4c63a5a741761ea980e0eb07d089"
  },
  {
    "url": "assets/js/6.cae77035.js",
    "revision": "03e368853e7c251d0e97f5916e010c98"
  },
  {
    "url": "assets/js/7.59b42095.js",
    "revision": "7772191eee77d8b5c8b63ff939e3e9ef"
  },
  {
    "url": "assets/js/8.53d6b382.js",
    "revision": "4409ab4710cb5ac11cdce8f33b180adc"
  },
  {
    "url": "assets/js/9.4d37cea9.js",
    "revision": "f6631558ecf4117703e892a492eacec7"
  },
  {
    "url": "assets/js/app.797e6b76.js",
    "revision": "23b90e1b238971b4a35f6574a288c1b2"
  },
  {
    "url": "assets/js/vendors~flowchart.a5ed7893.js",
    "revision": "9388112f8736a5d2ede9ce9e0518d54d"
  },
  {
    "url": "big-data/index.html",
    "revision": "8f2b689b7d8ac0395ce583f333e906f4"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "f05c37a55449a1adc597334c775bc824"
  },
  {
    "url": "c/index.html",
    "revision": "362d3699e1c988d380041184c7f94862"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "ac10ddcf05ba9ef94cc365ae1efe934f"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "e5ad679371398511f25a22fb4f938924"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "front-end/index.html",
    "revision": "496ed1a11fe2bdb50954e37470f0ed4d"
  },
  {
    "url": "hello-world/about-the-article-of-java.html",
    "revision": "9614ded022c8aa0c393947989ec5e5c7"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "2b669e1298f994802866bac038d3522d"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "0a423dcc2762252dfc28409772013edc"
  },
  {
    "url": "hello-world/index.html",
    "revision": "48f25bb1ed3c97b0af830e5a039aa88c"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "d2838417c79265443cd8fed08dea3c52"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "da02df8cd63692b3e2b6b4fd9b9fc916"
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
    "url": "img/githubPages.png",
    "revision": "97c8e590f37706ee70ea0290c6ed9b41"
  },
  {
    "url": "img/gitIgnore.png",
    "revision": "6723b20674aac0d6ce0e5a9846964652"
  },
  {
    "url": "img/jetbrains.svg",
    "revision": "48b3f5c87ff00f11d7b0b0fd64fdd12e"
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
    "url": "img/me.jpg",
    "revision": "503f59be9b5549c306c7844f21ce29d9"
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
    "url": "img/updateREADME.png",
    "revision": "bb76cb7e383ef9392104c283ed91e2c5"
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
    "revision": "9083eb17541e695ba2cfa0b739001db5"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "319baf472a29f9bfdfdedc81a26d5bb9"
  },
  {
    "url": "java/API-io.html",
    "revision": "f0c3dc6167ec6cb39dd5141238d69dd9"
  },
  {
    "url": "java/API-lang.html",
    "revision": "dcf0b7d23234bd4525ee26f04786dab0"
  },
  {
    "url": "java/API-util.html",
    "revision": "a213916f4310ee267f04a03d6a1b6677"
  },
  {
    "url": "java/grammars.html",
    "revision": "053fb9a929ccaba1491bd04613419bd2"
  },
  {
    "url": "java/index.html",
    "revision": "d19b0982e25e895a8c7eaba6cecbfc52"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "fb7c90ed028cbf6f2640e0af1e2f4def"
  },
  {
    "url": "kotlin/index.html",
    "revision": "bf367a41bdfcd9ac4aca20ac8b342d47"
  },
  {
    "url": "math/index.html",
    "revision": "291e72bdeffb3aa00619ca86271a0aaf"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "bedea2463132698505e0d3982de0cd71"
  },
  {
    "url": "python/grammar.html",
    "revision": "c7a7fe09069311fb9752675df965c3da"
  },
  {
    "url": "python/index.html",
    "revision": "13440db0b2e818fdbd93666a13857ec4"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "e8d08ec7586eb33ea0ab5be39fa308ec"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "6d8920ef54a5b74048b6af4199d2ade1"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "1f11cc40d1a8df5b69b0f6b7b0cdc790"
  },
  {
    "url": "spring/index.html",
    "revision": "37934a760ffeb130794cbad6ac3aa86b"
  },
  {
    "url": "web/HTTP.html",
    "revision": "a3c8b928a44e4c1677ecbbf77db88cb8"
  },
  {
    "url": "web/index.html",
    "revision": "a8a2bd329cf40aa06b547cd305bd9f3d"
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
