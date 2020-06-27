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
    "revision": "c1f83038dd72c0a2228d9065e3cbaeb7"
  },
  {
    "url": "about/index.html",
    "revision": "024a52d6747dd6b4ee2cebedd0695a92"
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
    "url": "assets/js/10.ae906114.js",
    "revision": "36f518c19db88deb0537029c150599a7"
  },
  {
    "url": "assets/js/11.6f925e13.js",
    "revision": "39592c6e9023020cf92273295c8bc295"
  },
  {
    "url": "assets/js/12.da0cf775.js",
    "revision": "649dabf9a45d26d1f737cebb6242b60c"
  },
  {
    "url": "assets/js/13.cd217561.js",
    "revision": "9107bfcadc0a3e1e6ea7f1dd87134c11"
  },
  {
    "url": "assets/js/14.1f375e36.js",
    "revision": "0ecca209f9aa09db507670077c189bf4"
  },
  {
    "url": "assets/js/15.ac550edd.js",
    "revision": "57574b8a72e3db6d96b01e362559fee6"
  },
  {
    "url": "assets/js/16.a44581df.js",
    "revision": "1b40564cd7fe27c813f641ee0a8a16a0"
  },
  {
    "url": "assets/js/17.44d21bbe.js",
    "revision": "e11529f3e106ae919c460b3f2745382c"
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
    "url": "assets/js/20.6373bd42.js",
    "revision": "e4c630b99bf3ca84afb5fe3eb052ee6d"
  },
  {
    "url": "assets/js/21.a49487b0.js",
    "revision": "15428fc71ffca74f0ee13abc21f50429"
  },
  {
    "url": "assets/js/22.4db11557.js",
    "revision": "ea3e97f41f41374dd4044640cb6ff133"
  },
  {
    "url": "assets/js/23.bb0f832d.js",
    "revision": "70fdc5fa5acae5573d2d175f62068900"
  },
  {
    "url": "assets/js/24.970ec800.js",
    "revision": "4fa62cd2a8863a2ac84a3d16edfc8059"
  },
  {
    "url": "assets/js/25.0d601bd4.js",
    "revision": "f3605178ebd9558c6f993d6626a0f4da"
  },
  {
    "url": "assets/js/26.4dbe4741.js",
    "revision": "d2757ca460dfc70f159a82e3158a3b9f"
  },
  {
    "url": "assets/js/27.d7da8695.js",
    "revision": "01a4f6d291893a495e3680580fbd091d"
  },
  {
    "url": "assets/js/28.980e6336.js",
    "revision": "3952eca049350a07f412d27b4250f0a3"
  },
  {
    "url": "assets/js/29.989d7ad6.js",
    "revision": "2870438f53d60bfd4f499fa90af25bb2"
  },
  {
    "url": "assets/js/3.5a45c147.js",
    "revision": "5ea5378b14ee991bde3fc267a0a69cfe"
  },
  {
    "url": "assets/js/30.6ebae8e3.js",
    "revision": "37822c1cba4eafa2c87377cd63567b68"
  },
  {
    "url": "assets/js/31.80b6be2f.js",
    "revision": "e51706e34a9b220f81d05d1957e83f53"
  },
  {
    "url": "assets/js/32.b0bcecd3.js",
    "revision": "8f20b1a5d76822c359c303968ad27caa"
  },
  {
    "url": "assets/js/33.f8accb04.js",
    "revision": "92cd9aa62923e5715f3609695cf82bde"
  },
  {
    "url": "assets/js/34.50e99713.js",
    "revision": "75a99d049af0ba6d454cea8ae9d11368"
  },
  {
    "url": "assets/js/35.df137389.js",
    "revision": "61d2c170fb9e0adf84c055859cbd8da7"
  },
  {
    "url": "assets/js/36.ecf0e8c6.js",
    "revision": "d572156592dd0c399ae02fa029adadb3"
  },
  {
    "url": "assets/js/37.01598138.js",
    "revision": "35c3a59437c1e8e8c3690bafda809773"
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
    "url": "assets/js/8.c460d48f.js",
    "revision": "2b11c65299b684861203cfcf94a40bb5"
  },
  {
    "url": "assets/js/9.9814348b.js",
    "revision": "ed65f9011d31f67c250a2810b0b60674"
  },
  {
    "url": "assets/js/app.6849c0b1.js",
    "revision": "f9d788baaf4e7d22ce917df8a1e8aa87"
  },
  {
    "url": "assets/js/vendors~flowchart.552ed627.js",
    "revision": "9388112f8736a5d2ede9ce9e0518d54d"
  },
  {
    "url": "big-data/index.html",
    "revision": "ac3437f6232463f049d2beac18b73bb7"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "4cdd89f6bcb0111c1901e1b50c99a5b6"
  },
  {
    "url": "c/index.html",
    "revision": "8f9dc6bf3b168c68558fb4d9faaef005"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "1a5d96e5563ca78e7fa9ce57004ca8d9"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "3749f3e46f35c2be8ff80fc9141c8fcb"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "front-end/index.html",
    "revision": "39134e24bd600b6a7f59ea76363702ba"
  },
  {
    "url": "hello-world/about-the-article-of-java.html",
    "revision": "8782405d8a50608064ee0858e810a6f9"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "dfe3f01f20975054a093b4e39700b20b"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "7eee65918e2b2d535440bec9938719c0"
  },
  {
    "url": "hello-world/index.html",
    "revision": "57e9db718f0d5c0401c4de968155f20b"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "709e8391ec41150a69f8d52cef70ecce"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "e076e571aad5f9d547e060d9812ddc44"
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
    "revision": "23b7a029a69c42f4bc1e117351ecda98"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "4ffb3591252883b38d9628873192795f"
  },
  {
    "url": "java/API-io.html",
    "revision": "4239189456929465b4f9f3691259cc05"
  },
  {
    "url": "java/API-lang.html",
    "revision": "fcb32ce8cf0281446039769edc961d7f"
  },
  {
    "url": "java/API-util.html",
    "revision": "99ffb1a47c3c5694b9bebe762dfd778b"
  },
  {
    "url": "java/grammars.html",
    "revision": "f125dba4f0ec531407880ab09cfd43e6"
  },
  {
    "url": "java/index.html",
    "revision": "b4a155bec3cbc82234e9b34a94c5dd94"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "6ce7f9155233be7d7a1b4bc399625e48"
  },
  {
    "url": "kotlin/index.html",
    "revision": "288f0903427d5d8799c5dde52824ea7f"
  },
  {
    "url": "math/index.html",
    "revision": "d23917d986952cc76d4fe6b1a93db827"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "c387f0dbc4a2b21895aa7bdd02b5294b"
  },
  {
    "url": "python/grammar.html",
    "revision": "5bfc7b74e5fc8c342b2b360f97845b31"
  },
  {
    "url": "python/index.html",
    "revision": "283501bc15c14d70892589da562b795d"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "784a3f06fafb39711d7953d1f802b407"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "179645e4fee2b1eb3760ce65dea83e78"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "427745650ef5964eb052cdc9c6090896"
  },
  {
    "url": "spring/index.html",
    "revision": "02867659f8e809ace7b8cbaa04fdad01"
  },
  {
    "url": "web/HTTP.html",
    "revision": "afc987c9a8467605896b9af688d71a98"
  },
  {
    "url": "web/index.html",
    "revision": "bce1810f59123dc4352369d1dde59764"
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
