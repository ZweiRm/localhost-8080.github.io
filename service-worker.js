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
    "revision": "e015d00a8517f68d448f8eed680b9074"
  },
  {
    "url": "about/index.html",
    "revision": "21b08fcbb02a83dcb25b5d9245d7fa67"
  },
  {
    "url": "assets/css/0.styles.68dfa722.css",
    "revision": "7378cbdb1d4a113092633952d28e1190"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.b4092cc6.js",
    "revision": "f2d39b812077ae4dac873b76b1bb44c4"
  },
  {
    "url": "assets/js/11.f6c920d7.js",
    "revision": "36f2d63fede4e8122488a6eb72939827"
  },
  {
    "url": "assets/js/12.fe458b5b.js",
    "revision": "afdd76369e142368e5e615456c031d3b"
  },
  {
    "url": "assets/js/13.5ee9d6a3.js",
    "revision": "4210ebf2f47c6366a7aa2e412376fd84"
  },
  {
    "url": "assets/js/14.7fbf4b0e.js",
    "revision": "2a13d4eb2ae5277bc7770586bc14728d"
  },
  {
    "url": "assets/js/15.a580bdd1.js",
    "revision": "662fd00e6d7bd47152e4194243b23e9c"
  },
  {
    "url": "assets/js/16.46d2e0a7.js",
    "revision": "080f7d6e48ce5bba925c5fef8e708cfc"
  },
  {
    "url": "assets/js/17.88e76e16.js",
    "revision": "537cb09a8bf8e26e642596dc431e502b"
  },
  {
    "url": "assets/js/18.f7a56dc3.js",
    "revision": "695803a5d0671d307d2acfaaadc6070c"
  },
  {
    "url": "assets/js/19.91305173.js",
    "revision": "b7723a6613ab1a4df771968fc22b0835"
  },
  {
    "url": "assets/js/2.05c8ff67.js",
    "revision": "be21fd749343db79b512a51c687c5bc2"
  },
  {
    "url": "assets/js/20.df0a812e.js",
    "revision": "c39888129aef6a44f4eb5eb61995075b"
  },
  {
    "url": "assets/js/21.fe86fc13.js",
    "revision": "2ad27a2902a2fb3eeae3b32e7f9eac25"
  },
  {
    "url": "assets/js/22.78326be6.js",
    "revision": "dd1e00ec28f8cd821b05e8459a78f5ce"
  },
  {
    "url": "assets/js/23.fffaa973.js",
    "revision": "89e163939a95157a8f9848ae4ea591cc"
  },
  {
    "url": "assets/js/24.28e9ab58.js",
    "revision": "75a2798c7f1ee886ffa6117fd452857d"
  },
  {
    "url": "assets/js/25.db9684f9.js",
    "revision": "2371c5d96d912e7be9e6dc0e4f2a880e"
  },
  {
    "url": "assets/js/26.090a9375.js",
    "revision": "418be967f47aab0a6ed4b3dd6ff196d9"
  },
  {
    "url": "assets/js/27.f14c3ad7.js",
    "revision": "6424cf6cf1e1fe106ff011b6bca25d2d"
  },
  {
    "url": "assets/js/28.69c98ff9.js",
    "revision": "d4219138d809f4ca53af8d7a906adde6"
  },
  {
    "url": "assets/js/29.263583ef.js",
    "revision": "2aa91795d392c1615e8abcd3d44633af"
  },
  {
    "url": "assets/js/3.dac3cd9f.js",
    "revision": "e2cb394687c3e72b84f46cccb319d6e8"
  },
  {
    "url": "assets/js/30.2eda5b0c.js",
    "revision": "62b3e80f912c7436c4b9b54929983268"
  },
  {
    "url": "assets/js/31.677bb049.js",
    "revision": "772bee68b0ea1619791e81bd685b834b"
  },
  {
    "url": "assets/js/32.e4e96786.js",
    "revision": "5da18243c68376856191b71d3c776438"
  },
  {
    "url": "assets/js/33.d2034457.js",
    "revision": "2f660db7be36c8b43118f9d7752e2d1b"
  },
  {
    "url": "assets/js/4.1fbd5537.js",
    "revision": "c31b8e3b2cfb76d16044162cec2980c4"
  },
  {
    "url": "assets/js/5.cc099833.js",
    "revision": "f6bff8744cafbc653e8a1b0aac3715e1"
  },
  {
    "url": "assets/js/6.70cb5887.js",
    "revision": "0ee5327cb065ab4724a73e9d6448e609"
  },
  {
    "url": "assets/js/7.5c1cbf72.js",
    "revision": "262221bbe2fb0d4b9d12b0a3acffce29"
  },
  {
    "url": "assets/js/8.ce95d4df.js",
    "revision": "c2778404e4a6071e1bdb2f02e4edff5f"
  },
  {
    "url": "assets/js/9.3e2ba360.js",
    "revision": "7bf30ec195a5e157cda53a9b9ce3c138"
  },
  {
    "url": "assets/js/app.3298b288.js",
    "revision": "2b48b0d8adf73e1f0c6f354464274881"
  },
  {
    "url": "big-data/index.html",
    "revision": "9b904bc9b6ae65c2e212667e4859be02"
  },
  {
    "url": "c/index.html",
    "revision": "b5b3359d3cca5eb0ea75b46ec1eecc1a"
  },
  {
    "url": "c/常量、变量与数据类型.html",
    "revision": "46e0c8d6f88004d12f4025eb9a6adfb2"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "32e4ddd092df963028edbaf2e9e5250a"
  },
  {
    "url": "front-end/index.html",
    "revision": "214b07702a2faed3a4808604cdc39fc9"
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
    "revision": "716933b8957422630bec8f1b7552332d"
  },
  {
    "url": "java/API-工具类库.html",
    "revision": "ef2cbdfe7bce37942bad1aeff92cac90"
  },
  {
    "url": "java/API-语言基础类库.html",
    "revision": "617a29e3651413ef3b8d19405dae9da9"
  },
  {
    "url": "java/API-输入输出类库.html",
    "revision": "579c44cd91ad0b8c34aa78a59d5a7b05"
  },
  {
    "url": "java/index.html",
    "revision": "c92d8503be95695fb7864c3b6dea91aa"
  },
  {
    "url": "java/应用程序编程接口概述.html",
    "revision": "7f351fcb57554bd26a07f14460984c1f"
  },
  {
    "url": "java/语法.html",
    "revision": "8d06a885b283b92e0b64f3944f045b69"
  },
  {
    "url": "java/面向对象.html",
    "revision": "a9d123af9fa95329eb5d8f66fd48887e"
  },
  {
    "url": "kotlin/index.html",
    "revision": "6cdcd222de7d155dd2e524c7a0700ed8"
  },
  {
    "url": "math/index.html",
    "revision": "c3c48595032d9f117b35932be62fbc93"
  },
  {
    "url": "math/多元函数微分学.html",
    "revision": "d6aa373839f14ae1cdc76e712a4b93c6"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "a4601f4dc927d948de58f29bbe2a9f60"
  },
  {
    "url": "software-engineering/软件过程.html",
    "revision": "d090fc8a32b93fd53150a839236b9cce"
  },
  {
    "url": "spring/index.html",
    "revision": "cead17a34311e31a9a492ca6c882a2a9"
  },
  {
    "url": "tittle-tattle/Computing Machinery and Intelligence By A. M. Turing.html",
    "revision": "58fff45fe1401473f54dcc94969d5809"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "722f5ab5fafddd48be155340081f2a8f"
  },
  {
    "url": "tittle-tattle/关于Java编程部分的文章.html",
    "revision": "baf6996ef20c947452c7553c0bf48518"
  },
  {
    "url": "tittle-tattle/学术研究的正确姿势.html",
    "revision": "6cb7e6692e6ce14b3e73b7d0047bf4d9"
  },
  {
    "url": "tittle-tattle/搭建一个基于 VuePress 的博客.html",
    "revision": "d7ceabe78cd3962043c48be4f855c346"
  },
  {
    "url": "tittle-tattle/新年快乐！.html",
    "revision": "2deaf2bf4384b877ddbc0164e5f35144"
  },
  {
    "url": "web/index.html",
    "revision": "f42866700c231ef035a7e7790cbaf913"
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
