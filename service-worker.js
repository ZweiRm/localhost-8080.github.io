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
    "revision": "526c5460f6356ddfd06312c5dc458b1e"
  },
  {
    "url": "about/index.html",
    "revision": "af9513b7cfb4627304cc34be9a8b99fa"
  },
  {
    "url": "assets/css/0.styles.be3a30ad.css",
    "revision": "6aaec3f023fa5372f986adeebdf094d2"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.02b1fede.js",
    "revision": "55f1e7d9947b52ffa8cc884e4afea943"
  },
  {
    "url": "assets/js/11.82cce8e8.js",
    "revision": "e96b54d7149a3fdd8783f9607fd4f596"
  },
  {
    "url": "assets/js/12.3f75eb60.js",
    "revision": "fce23387c00c63e1da9368b297019249"
  },
  {
    "url": "assets/js/13.9155f2e6.js",
    "revision": "4a785d6b9e46e1df448131ce24ae7c72"
  },
  {
    "url": "assets/js/14.04b82385.js",
    "revision": "5eae5694ea25ad77d87f3d0cf832b9fd"
  },
  {
    "url": "assets/js/15.7eaaee8c.js",
    "revision": "f46e49cb1937294680d4465a1afba1d2"
  },
  {
    "url": "assets/js/16.a2245187.js",
    "revision": "d2533a4550adc8f45ca256214271cdc8"
  },
  {
    "url": "assets/js/17.34090877.js",
    "revision": "9371d3a7598c6af651c123ad321568fb"
  },
  {
    "url": "assets/js/18.e4840970.js",
    "revision": "b2f97c90b29238e23d694dde9af870fd"
  },
  {
    "url": "assets/js/19.f04b56cd.js",
    "revision": "a66da51aedb953d95c59206a911fe629"
  },
  {
    "url": "assets/js/2.b3a1af15.js",
    "revision": "05cc6380cc487fc0c50a98ab1831cbe5"
  },
  {
    "url": "assets/js/20.4a4130e8.js",
    "revision": "9f6f8c0b2980b21f6bb8d5d8b84eab9e"
  },
  {
    "url": "assets/js/21.c5561b15.js",
    "revision": "47ecd9ede0b5db597ebb47dd98be6e4a"
  },
  {
    "url": "assets/js/22.a7320650.js",
    "revision": "763f3cdd7600924280b89cc0208eec02"
  },
  {
    "url": "assets/js/23.ff511459.js",
    "revision": "2f71b3c47f3b7439879bdf8a7ec1f4ad"
  },
  {
    "url": "assets/js/24.a1005230.js",
    "revision": "3c23a3cdffcd69f6678744724b1cdfb7"
  },
  {
    "url": "assets/js/25.f626f75f.js",
    "revision": "c0a3a1a0ccf534c602c9343b9810d780"
  },
  {
    "url": "assets/js/26.cd8ea0e7.js",
    "revision": "170a880c5689fb5c12b5e723ec9a7938"
  },
  {
    "url": "assets/js/27.011ebaf1.js",
    "revision": "24962685f19054ecd00f2a6ee1b4576e"
  },
  {
    "url": "assets/js/28.51de85a3.js",
    "revision": "9a5a9843741924782178a2d100e01e37"
  },
  {
    "url": "assets/js/29.0c9c1cc5.js",
    "revision": "88b60fd316becb728dec8a30d3011ef8"
  },
  {
    "url": "assets/js/3.406f2939.js",
    "revision": "001cc06a72fba18f69f8e094065c6b43"
  },
  {
    "url": "assets/js/30.753ab81c.js",
    "revision": "103ac1213a6e3ba919015d2e09f921e4"
  },
  {
    "url": "assets/js/31.b70d7cd0.js",
    "revision": "0566afb10734fa4bada26d0a29ec0690"
  },
  {
    "url": "assets/js/32.86115302.js",
    "revision": "feb6722382dc87ccf5016696dd4b114c"
  },
  {
    "url": "assets/js/33.b2368996.js",
    "revision": "bed96385919f11276cb22de5c8834b87"
  },
  {
    "url": "assets/js/34.8a115c2d.js",
    "revision": "159307ba10d5f292ca7363094bb8d7b9"
  },
  {
    "url": "assets/js/35.c61e393d.js",
    "revision": "31447ca15bd07e5a1971a09014a2ed4c"
  },
  {
    "url": "assets/js/36.f9e6d22f.js",
    "revision": "6cbcce8d045aafe16f8595bcb195a05b"
  },
  {
    "url": "assets/js/4.9c1eebfe.js",
    "revision": "6d94e89cdbf186e68a610d5b2cdbb596"
  },
  {
    "url": "assets/js/5.cae4db1b.js",
    "revision": "ce851da1b6f7f70f294dc356bc99b222"
  },
  {
    "url": "assets/js/6.9900adda.js",
    "revision": "459d2a18611996a2440ce67ec9174f81"
  },
  {
    "url": "assets/js/7.bbcc3cb2.js",
    "revision": "1e244edeeeb3da6e49c6229b560cda92"
  },
  {
    "url": "assets/js/8.49245203.js",
    "revision": "aa602f3b226d54dd011ab69dd97f9cab"
  },
  {
    "url": "assets/js/9.29263ded.js",
    "revision": "361a0b425785f1cca3cb62873a57e5b5"
  },
  {
    "url": "assets/js/app.543aa0bf.js",
    "revision": "06629a1bcaa3614b9ef2558ed7b12d93"
  },
  {
    "url": "big-data/index.html",
    "revision": "052d00337107b33c8d9171cf6d9f2bd3"
  },
  {
    "url": "c/index.html",
    "revision": "616cd6ad9cafa18cfea26eda09e71c4e"
  },
  {
    "url": "c/常量、变量与数据类型.html",
    "revision": "ae7908f4fd1db7f200587f46e5bdd432"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "2572b06831c60322ceb7c0d97b01d8a7"
  },
  {
    "url": "front-end/index.html",
    "revision": "2de764d12d21fce59aed793a02ca7154"
  },
  {
    "url": "hello-world/Computing Machinery and Intelligence By A. M. Turing.html",
    "revision": "1f01bde1f5c7d1d0c70f055c999a5b7d"
  },
  {
    "url": "hello-world/index.html",
    "revision": "1f1472f49822a6be91ed2a544e891924"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "b93dca4258a3ee92d7efec54af79778f"
  },
  {
    "url": "hello-world/关于Java编程部分的文章.html",
    "revision": "eef7e97b3bffc8ece38e277a98f0bd94"
  },
  {
    "url": "hello-world/学术研究的正确姿势.html",
    "revision": "9f5750be79558f4655d48c1dc74f53e4"
  },
  {
    "url": "hello-world/搭建一个基于 VuePress 的博客.html",
    "revision": "0c24e22caae80d72f1cb9cbfabc1289d"
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
    "revision": "b5ba96da22db41f993683feec5a92e90"
  },
  {
    "url": "java/API-工具类库.html",
    "revision": "22a7e80fd1c1bf10f6e655ebf6d9c368"
  },
  {
    "url": "java/API-语言基础类库.html",
    "revision": "150601bc7610d75953ec84c73f9ad971"
  },
  {
    "url": "java/API-输入输出类库.html",
    "revision": "724841e31aa1167ae64b12cb3c0f9270"
  },
  {
    "url": "java/index.html",
    "revision": "bd9f0d06190d5cd709731d3ddb099d54"
  },
  {
    "url": "java/应用程序编程接口概述.html",
    "revision": "1b00dfe4c8758a015a6e933d36f2cdac"
  },
  {
    "url": "java/语法.html",
    "revision": "0779fdf65ba9b2b2b18dd3bc5d5747d1"
  },
  {
    "url": "java/面向对象.html",
    "revision": "7e512ae08172e12ba18975ec2466cf11"
  },
  {
    "url": "kotlin/index.html",
    "revision": "e6dbef24c25c0192cdc6de62d05565d0"
  },
  {
    "url": "math/index.html",
    "revision": "a19335cf48691c4e132f2ec8ec42ef56"
  },
  {
    "url": "math/多元函数微分学.html",
    "revision": "9df7cb2e0678c46a2611b7613e39e6c1"
  },
  {
    "url": "python/index.html",
    "revision": "7debf4f87bd932504464d40db9c920f4"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "2632d2a53a4cdea6eca74747597165ce"
  },
  {
    "url": "software-engineering/软件过程.html",
    "revision": "52b2d40945b6904f9a7a5734c6c7d23c"
  },
  {
    "url": "spring/index.html",
    "revision": "45bacbc80463a98e1aaf850dd3d061c8"
  },
  {
    "url": "web/HTTP.html",
    "revision": "00d2b358e28cd75a6bf3431a953f1319"
  },
  {
    "url": "web/index.html",
    "revision": "8723e95d94d7b699e4b13f45eb92cfeb"
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
