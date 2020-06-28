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
    "revision": "8ac0686d609798174cc1b2de7fd90655"
  },
  {
    "url": "about/index.html",
    "revision": "594529c8f71a064219d078b477df8f7e"
  },
  {
    "url": "assets/css/0.styles.92f8af09.css",
    "revision": "b5284a60dc3ec41b684e227b68b490c4"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.6340e5aa.js",
    "revision": "6dcc8288581309fbeca8cf77722c4025"
  },
  {
    "url": "assets/js/11.b30c41bd.js",
    "revision": "1a5644afb26c3812df3f96d92c5e129c"
  },
  {
    "url": "assets/js/12.61751d02.js",
    "revision": "9c50a8101f4c1531df43cbcd650d4909"
  },
  {
    "url": "assets/js/13.705d3e46.js",
    "revision": "caa4746dbd277c0e634ffb8609facbcc"
  },
  {
    "url": "assets/js/14.82dc3e7d.js",
    "revision": "6b48b1464ebc53c0c9cacf02b06d1e90"
  },
  {
    "url": "assets/js/15.ac550edd.js",
    "revision": "57574b8a72e3db6d96b01e362559fee6"
  },
  {
    "url": "assets/js/16.1d85b548.js",
    "revision": "47bdd9914657aa8eea52f5b8207c6e99"
  },
  {
    "url": "assets/js/17.4e8ecc8b.js",
    "revision": "7d1a604d1eb3921cbb585172b7c8021f"
  },
  {
    "url": "assets/js/18.cffd9c9d.js",
    "revision": "a032ff3779939eb9625ebc7aaeb473ff"
  },
  {
    "url": "assets/js/19.8e0a3cde.js",
    "revision": "1f58043e6bc44cfe5724c8fdb940c98b"
  },
  {
    "url": "assets/js/20.3a793dd7.js",
    "revision": "a7bd86efe83366d8b200d956f2ae8673"
  },
  {
    "url": "assets/js/21.e8d346f7.js",
    "revision": "32062316bb71e849c5414e103d182ce5"
  },
  {
    "url": "assets/js/22.4db11557.js",
    "revision": "ea3e97f41f41374dd4044640cb6ff133"
  },
  {
    "url": "assets/js/23.a8320ac9.js",
    "revision": "bc43ce34601ee87ddab13b640d17a124"
  },
  {
    "url": "assets/js/24.970ec800.js",
    "revision": "4fa62cd2a8863a2ac84a3d16edfc8059"
  },
  {
    "url": "assets/js/25.f4e5eaa9.js",
    "revision": "2e016268bce4f1f9f61e5e7f8156c83a"
  },
  {
    "url": "assets/js/26.8e82297b.js",
    "revision": "7889abac45c2059083850c44bfb1f0b3"
  },
  {
    "url": "assets/js/27.b2a86b39.js",
    "revision": "332f6bbf8a8b02366341dc99a606d25d"
  },
  {
    "url": "assets/js/28.eb6d661c.js",
    "revision": "df9062fdad1d4cbbe59f01aeaaa8665d"
  },
  {
    "url": "assets/js/29.7590a903.js",
    "revision": "05099d4837365575024f3f0c36a6d607"
  },
  {
    "url": "assets/js/3.5a45c147.js",
    "revision": "5ea5378b14ee991bde3fc267a0a69cfe"
  },
  {
    "url": "assets/js/30.488b0e91.js",
    "revision": "acd3597443434963686845f2d27f3f5f"
  },
  {
    "url": "assets/js/31.03b13abc.js",
    "revision": "a04df5e0772229fe7e0bb662ed7c43ce"
  },
  {
    "url": "assets/js/32.d9ecbf78.js",
    "revision": "054309d55fc34850deb4a782997187ba"
  },
  {
    "url": "assets/js/33.f8796fb9.js",
    "revision": "a74dbf96d8a43ca8110a924c64c2e1c3"
  },
  {
    "url": "assets/js/34.99e69fe0.js",
    "revision": "8ac144887b73aff11e64b2af7ce18f06"
  },
  {
    "url": "assets/js/35.9b2c8eba.js",
    "revision": "972aa7ac33d9a63632cbe35ed546c8f7"
  },
  {
    "url": "assets/js/36.e71322f4.js",
    "revision": "c5cb2c11c7504212629a6bacba436ffa"
  },
  {
    "url": "assets/js/37.eb2c8cce.js",
    "revision": "da41f16fc9b46ab39f870a0b51b310a4"
  },
  {
    "url": "assets/js/38.4e3d7f7f.js",
    "revision": "8b57f1a044efe40ef9496c7665956712"
  },
  {
    "url": "assets/js/39.0e713662.js",
    "revision": "a8534f9d88bf5c663af6840735609123"
  },
  {
    "url": "assets/js/4.c0313ddb.js",
    "revision": "acdfa1a4ed15cb8b2a54613637e7ba61"
  },
  {
    "url": "assets/js/5.4425da62.js",
    "revision": "413a4c63a5a741761ea980e0eb07d089"
  },
  {
    "url": "assets/js/6.9bcae24e.js",
    "revision": "03e368853e7c251d0e97f5916e010c98"
  },
  {
    "url": "assets/js/7.1104795e.js",
    "revision": "7772191eee77d8b5c8b63ff939e3e9ef"
  },
  {
    "url": "assets/js/8.3d74033d.js",
    "revision": "4409ab4710cb5ac11cdce8f33b180adc"
  },
  {
    "url": "assets/js/9.026abc8d.js",
    "revision": "0d75b3b662ed9eb86f7ea5a0cffbccb7"
  },
  {
    "url": "assets/js/app.842e12cd.js",
    "revision": "0b2ef61176d284e4ca198dd970247a11"
  },
  {
    "url": "assets/js/vendors~flowchart.552ed627.js",
    "revision": "9388112f8736a5d2ede9ce9e0518d54d"
  },
  {
    "url": "big-data/index.html",
    "revision": "0ea7f8429531e5b6196ae79366fc3843"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "9718b35ec453c909e92a0079296967b7"
  },
  {
    "url": "c/index.html",
    "revision": "39d38073d8de79373de49bdf89c9fa78"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "536cf719c89c09f3dc37d267af770dbb"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "5d1e152bbe90e093cbf939084ccfc882"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "front-end/index.html",
    "revision": "579ae97afc5a91f03be3a2bb8f95c616"
  },
  {
    "url": "hello-world/about-the-article-of-java.html",
    "revision": "34e8652a582af490c6d14fba2ac4a9ed"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "f2166295fb194b89860dddfb7a864cdb"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "69d81bf9033174d9714f6d618bb60316"
  },
  {
    "url": "hello-world/index.html",
    "revision": "18976da6b60de3d35469e5ad29466e32"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "d645681d28d85df06ddc5ae3aa09455f"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "12004ec865dc5ff310e9ca82521df728"
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
    "revision": "8bde679bb67143241af5864dfbfd7e1e"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "6f71f2e58fff117f5795db4d9a13582f"
  },
  {
    "url": "java/API-io.html",
    "revision": "1720ddea9b394681378a1bd885bb6adb"
  },
  {
    "url": "java/API-lang.html",
    "revision": "0452e02c7d0210e6a85fa45126aef990"
  },
  {
    "url": "java/API-util.html",
    "revision": "440661fb0fd902c34c8bbee460e23a23"
  },
  {
    "url": "java/grammars.html",
    "revision": "2be215d2bb52afe5e415e98bfc6b880a"
  },
  {
    "url": "java/index.html",
    "revision": "7cc34f1df927ee40cc731fe23a1f2e0f"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "f18b6424c7df7739792e8f1d3b06a1aa"
  },
  {
    "url": "kotlin/index.html",
    "revision": "68cbfe186e0b20f74009f23ac6461048"
  },
  {
    "url": "math/index.html",
    "revision": "6176ea7c0e924671c0dfeb18eef50ce6"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "cb7fadd4b5fe759e9bfd15a888af3fa3"
  },
  {
    "url": "python/grammar.html",
    "revision": "af3edc11006721e5e94fb71fe2a76b81"
  },
  {
    "url": "python/index.html",
    "revision": "ce9f06f80ebb990e603ba47cc79517b1"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "0c2e9bd0c31b19f504e0a55dea33af70"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "7e8d80e9a1c57dec4335cdee4e14bc59"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "9e28bce3dfc4799f7128b905fb626b08"
  },
  {
    "url": "spring/index.html",
    "revision": "aebeb0b8cbd05ddc6cfebac23fa15f36"
  },
  {
    "url": "web/HTTP.html",
    "revision": "52edb0b8c1d0c8166629cd396574fd3d"
  },
  {
    "url": "web/index.html",
    "revision": "f14505ba99f79b7acf84be62609f975f"
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
