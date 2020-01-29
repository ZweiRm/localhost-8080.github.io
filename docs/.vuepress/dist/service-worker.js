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
    "revision": "1c24f6475ec924290be4b1db324cb609"
  },
  {
    "url": "about/index.html",
    "revision": "072b2bbffe03bcd4e9bd8ba248a8d8d7"
  },
  {
    "url": "assets/css/0.styles.3227a1f7.css",
    "revision": "7c7016b4a7f409894224d3f956485475"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.295131ed.js",
    "revision": "371f4444bd31067463fcfb5d9e35642b"
  },
  {
    "url": "assets/js/11.afc72252.js",
    "revision": "8847029c244e7217ad6c0080a4dc0036"
  },
  {
    "url": "assets/js/12.2bf45324.js",
    "revision": "a0c2593ff7aa9796acb9489f4823681f"
  },
  {
    "url": "assets/js/13.a55de0b8.js",
    "revision": "32af47156625f990c8019fc0fd36def9"
  },
  {
    "url": "assets/js/14.47d1d54b.js",
    "revision": "7ab6bada9f4bd55f8d3473a931358bd5"
  },
  {
    "url": "assets/js/15.a6d26f3b.js",
    "revision": "d08d7cf34fd19bed89e340d6a5787bb8"
  },
  {
    "url": "assets/js/16.60e3d706.js",
    "revision": "28273f7d2f2c577e2a70de754ba9ed2c"
  },
  {
    "url": "assets/js/17.9360b8e2.js",
    "revision": "f7596d9384d4a3871ef95527e143fdf1"
  },
  {
    "url": "assets/js/18.65f05401.js",
    "revision": "4ec769316906d9bcf4d6f42a46bdaef2"
  },
  {
    "url": "assets/js/19.0ebbe057.js",
    "revision": "3e1b1a3f7d58b9e515c69da675094e22"
  },
  {
    "url": "assets/js/2.4416e7e4.js",
    "revision": "7c0e430ac07c077cc46e67d0b4ce2175"
  },
  {
    "url": "assets/js/20.cc9bdce6.js",
    "revision": "398fdd744cf23474a7ea8272f80daf8a"
  },
  {
    "url": "assets/js/21.b87035dc.js",
    "revision": "42a1db3db72506e8906a84df40796a47"
  },
  {
    "url": "assets/js/22.5930d3d3.js",
    "revision": "2cd326bcd6d3bb1695276ab79db295be"
  },
  {
    "url": "assets/js/23.c2d90825.js",
    "revision": "29731a9b949f0940ec798e05e898b51e"
  },
  {
    "url": "assets/js/24.e2179a68.js",
    "revision": "c995961055eaecc33256247bb1e62720"
  },
  {
    "url": "assets/js/25.dae1c915.js",
    "revision": "faa8a80d9495d8f6145d1b5f5bd03180"
  },
  {
    "url": "assets/js/26.a709b633.js",
    "revision": "99dba81ecdb2fba6faef9a6634dd4872"
  },
  {
    "url": "assets/js/27.981ecbbb.js",
    "revision": "8d41f131c80c46e31fa09c2031d7d1af"
  },
  {
    "url": "assets/js/28.9fd8ef30.js",
    "revision": "ed217eb8acfaed1b0dfaa86649a21a63"
  },
  {
    "url": "assets/js/29.fe22d24d.js",
    "revision": "a4dfda5489cb51670d7a734018b99fa9"
  },
  {
    "url": "assets/js/3.1a7a9be5.js",
    "revision": "65527718794d7b927fe2672fea470f9f"
  },
  {
    "url": "assets/js/30.fed8102a.js",
    "revision": "62dd4c6b75b5d674f91c3a8abc3b88c1"
  },
  {
    "url": "assets/js/31.53e1c2c5.js",
    "revision": "5d354c5dfc67bdd29f4b8c4d5dab05f2"
  },
  {
    "url": "assets/js/4.6a870eb1.js",
    "revision": "b0301c4732a3c0ee9c6870781de20745"
  },
  {
    "url": "assets/js/5.18ece291.js",
    "revision": "1e29b328955555619eef364612737dda"
  },
  {
    "url": "assets/js/6.59f231e7.js",
    "revision": "17b81b5ce5fa1c923d930c2b28ea49bf"
  },
  {
    "url": "assets/js/7.054749d5.js",
    "revision": "29246ca39a94cd14ba6571705cb4a4f5"
  },
  {
    "url": "assets/js/8.05caec4b.js",
    "revision": "7068a8ff60a0e4c3ec5e2c55117585f3"
  },
  {
    "url": "assets/js/9.f9c48265.js",
    "revision": "d5a0a6380a4e1f3687ad430d0daf8db5"
  },
  {
    "url": "assets/js/app.d3b90337.js",
    "revision": "4fa6d72fb025730895308e4a85fb7232"
  },
  {
    "url": "big-data/index.html",
    "revision": "7d24b59e43c2a3bc3f2c6f6f437bc3dd"
  },
  {
    "url": "c/index.html",
    "revision": "c994d3e1b2e254f6d9d5c1859d32c802"
  },
  {
    "url": "c/常量、变量与数据类型.html",
    "revision": "895453b4c32d4625b236f40a1ee882f6"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "a467872d8c5f21f32f89c2424e47ff49"
  },
  {
    "url": "front-end/index.html",
    "revision": "486cde081845f5b4be4857767790ab9f"
  },
  {
    "url": "img/ahza-white.png",
    "revision": "3c642eba43abc55fb6555dab8d743fcd"
  },
  {
    "url": "img/C程序的基本结构.jpg",
    "revision": "7a23f1d4d04270c9354597cf2499dee4"
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
    "revision": "0a760eb8bb8b558bf6b75b762f13a278"
  },
  {
    "url": "java/API-工具类库.html",
    "revision": "53ccf0bce1ace2f19c6e4f04f13779dc"
  },
  {
    "url": "java/API-语言基础类库.html",
    "revision": "3060ec26f31dac1bef91442264123f31"
  },
  {
    "url": "java/index.html",
    "revision": "9a39bedeb0cf1b1589b7800edbc1eeed"
  },
  {
    "url": "java/应用程序编程接口概述.html",
    "revision": "06f3a992e439d6fa3a7bd04a9181ac6a"
  },
  {
    "url": "java/语法.html",
    "revision": "50f203313389c997520b2b2fee58ccd0"
  },
  {
    "url": "java/面向对象.html",
    "revision": "22d50a15a2c2524ad4f307cc6043f0c6"
  },
  {
    "url": "kotlin/index.html",
    "revision": "b6a49706679e5b1b21af03ae26642f9a"
  },
  {
    "url": "math/index.html",
    "revision": "00b82ea89e5f53bc9abb60e46ced473b"
  },
  {
    "url": "math/多元函数微分学.html",
    "revision": "8ff31ed03915c3612858b79eb96bd9e2"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "3ee677371886ce2dafd51b0b951c020f"
  },
  {
    "url": "software-engineering/软件过程.html",
    "revision": "bb2331befc1cae5c0d86a7efcad59854"
  },
  {
    "url": "spring/index.html",
    "revision": "a9f6b1ae8a78665b0f0bb33030d25001"
  },
  {
    "url": "tittle-tattle/Computing Machinery and Intelligence By A. M. Turing.html",
    "revision": "6a367e3e2a2971566382310be684b519"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "9e5e8c539fc6652f4b74c33bb1e188fa"
  },
  {
    "url": "tittle-tattle/关于Java编程部分的文章.html",
    "revision": "802134f3922ac7ae72119dc5e5709740"
  },
  {
    "url": "tittle-tattle/学术研究的正确姿势.html",
    "revision": "e069c24f7ef1c36d2f34f3fbe4c719eb"
  },
  {
    "url": "tittle-tattle/新年快乐！.html",
    "revision": "ce84a3dc424e3301a204d7033f4e9ce5"
  },
  {
    "url": "web/index.html",
    "revision": "9c71d69fb6621f43e43705182f63ab7e"
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
