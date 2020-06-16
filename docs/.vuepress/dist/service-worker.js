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
    "revision": "98d39e1908e57962fc51bf5cea3ad944"
  },
  {
    "url": "about/index.html",
    "revision": "465038b6308c84e95e12317a8d463365"
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
    "url": "assets/js/10.2fe017b9.js",
    "revision": "168993b8da377c93526ceb70b6a789d3"
  },
  {
    "url": "assets/js/11.b1d4b070.js",
    "revision": "1595a404090e1d0e14825776104c2ec8"
  },
  {
    "url": "assets/js/12.ccb2c053.js",
    "revision": "7450b5f8865ffb802415995ce04608a3"
  },
  {
    "url": "assets/js/13.dba67c57.js",
    "revision": "ced1ac6d1dff680b83bef5efefee6bd2"
  },
  {
    "url": "assets/js/14.a677c191.js",
    "revision": "6b4dcdf66d318c1de40ea4590175e671"
  },
  {
    "url": "assets/js/15.3f90ac36.js",
    "revision": "7282e862c44b943679f12d2b00c537e9"
  },
  {
    "url": "assets/js/16.9e2c2005.js",
    "revision": "47bdd9914657aa8eea52f5b8207c6e99"
  },
  {
    "url": "assets/js/17.6d3bb9a2.js",
    "revision": "35a7707a82f1bc667419669c934386b9"
  },
  {
    "url": "assets/js/18.37ead12f.js",
    "revision": "a032ff3779939eb9625ebc7aaeb473ff"
  },
  {
    "url": "assets/js/19.5b3f7b97.js",
    "revision": "1f58043e6bc44cfe5724c8fdb940c98b"
  },
  {
    "url": "assets/js/20.3f34f55f.js",
    "revision": "a7bd86efe83366d8b200d956f2ae8673"
  },
  {
    "url": "assets/js/21.3e9a036a.js",
    "revision": "15428fc71ffca74f0ee13abc21f50429"
  },
  {
    "url": "assets/js/22.5cee0fc7.js",
    "revision": "ef5c0a5f35175b394cba6c757bfd4b93"
  },
  {
    "url": "assets/js/23.fd39bcd2.js",
    "revision": "70fdc5fa5acae5573d2d175f62068900"
  },
  {
    "url": "assets/js/24.9f9019a1.js",
    "revision": "4fa62cd2a8863a2ac84a3d16edfc8059"
  },
  {
    "url": "assets/js/25.b9256779.js",
    "revision": "2e016268bce4f1f9f61e5e7f8156c83a"
  },
  {
    "url": "assets/js/26.0c25a14a.js",
    "revision": "de951476beab683afc742cb7ef59731a"
  },
  {
    "url": "assets/js/27.ad30f138.js",
    "revision": "3feb034881de79cffe22e4b50480b681"
  },
  {
    "url": "assets/js/28.8ad4e7a6.js",
    "revision": "0167e5fc595ae40621c6916bfa24248a"
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
    "url": "assets/js/30.bc2ac851.js",
    "revision": "0bcca883666f3b871f7037e5095d3ba2"
  },
  {
    "url": "assets/js/31.ce2f58a5.js",
    "revision": "67f2cca65e0014c12bbcf36f909ef70b"
  },
  {
    "url": "assets/js/32.cb21f302.js",
    "revision": "2ba20024ea11854b007406d714c39da0"
  },
  {
    "url": "assets/js/33.3377fb2d.js",
    "revision": "3fb4c8e702066b29862f62c0f69fecb1"
  },
  {
    "url": "assets/js/34.2c30e9cd.js",
    "revision": "75a99d049af0ba6d454cea8ae9d11368"
  },
  {
    "url": "assets/js/35.7fe72b11.js",
    "revision": "c9bfa1ff901720862f2b1869b1f1b0bd"
  },
  {
    "url": "assets/js/36.a1930d31.js",
    "revision": "74a3fc2b5fae3c971ba8406f4880b13a"
  },
  {
    "url": "assets/js/37.3afdacbe.js",
    "revision": "3d7ba7edd62be6402458ff801aeab63a"
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
    "url": "assets/js/8.4f1355de.js",
    "revision": "442db2c1ac8094a6f9804e3bf9ccd973"
  },
  {
    "url": "assets/js/9.7d93baec.js",
    "revision": "1e44f2b0199a32d670cb0fd40935dc17"
  },
  {
    "url": "assets/js/app.5587029f.js",
    "revision": "8c757bc56a3ecbcf78f3648129595f4e"
  },
  {
    "url": "assets/js/vendors~flowchart.a5ed7893.js",
    "revision": "9388112f8736a5d2ede9ce9e0518d54d"
  },
  {
    "url": "big-data/index.html",
    "revision": "5c8ee18c5b53edb4342d93ddc88d641c"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "19d9ed74fb514745a6dc634a77ba9936"
  },
  {
    "url": "c/index.html",
    "revision": "08b707fa27be7451e9c592cb9925efdf"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "7e6ff6ed763bf637346da0ce8cc161c8"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "6ed1ac505fefca85c157a7cec0dc2b6d"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "front-end/index.html",
    "revision": "5fe4016017ca3ee2c42714176ca80927"
  },
  {
    "url": "hello-world/about-the-article-of-java.html",
    "revision": "20965bbd3bfcbd722c76f3ead6b4370f"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "ee89a1d05bce332779b0c2fa963c9897"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "eab457fc4044b26325584d78526e282a"
  },
  {
    "url": "hello-world/index.html",
    "revision": "ba7a9b011cadc3d18a5d0945adfc6d11"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "1e3b1afba811a5f760aa651626891465"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "ff9497258a0c026131197a265e9e3faf"
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
    "revision": "076d5f423fb396e3814591a9590ecfef"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "a07d089ffb17211e6633c1db8437fbf7"
  },
  {
    "url": "java/API-io.html",
    "revision": "5fcc7d65bef0e3d508dd45a967476c68"
  },
  {
    "url": "java/API-lang.html",
    "revision": "90ac51a5decb77e739e3f4361c68f444"
  },
  {
    "url": "java/API-util.html",
    "revision": "133d8eed74a10a267e94fe1cceb64dee"
  },
  {
    "url": "java/grammars.html",
    "revision": "fef9e3633e4d3daa0d1d829c8d339099"
  },
  {
    "url": "java/index.html",
    "revision": "7edfcbe9ead714b643cf2f15a731c89d"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "161ac5310da4b6ff31f347f099526273"
  },
  {
    "url": "kotlin/index.html",
    "revision": "ca8a36327f21b4f15e277aa1b79563d5"
  },
  {
    "url": "math/index.html",
    "revision": "b613b49457dbaf7c4e52ebd1139eaf18"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "58b08cecb470fba4049adddbd40ac870"
  },
  {
    "url": "python/grammar.html",
    "revision": "2b69edf1724afd073fb43d2fc9c15326"
  },
  {
    "url": "python/index.html",
    "revision": "4465e533f1015fe6fa0a5df4f30c412d"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "16ae02589598f40db314d8b84de58c1a"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "662b4fe32b7dd1b7bd5db4e29abd3361"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "ef22cabffdea491ba2a56661b42e15f3"
  },
  {
    "url": "spring/index.html",
    "revision": "d08c1d8a70c8ae034b05322ad2361707"
  },
  {
    "url": "web/HTTP.html",
    "revision": "264ed59e9d40acd22895656c16574991"
  },
  {
    "url": "web/index.html",
    "revision": "c9d5240c059d6c37ba829f6e66da2961"
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
