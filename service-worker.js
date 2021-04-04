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
    "revision": "e0ac07e6b88fde540d6fbe990e1e9b3c"
  },
  {
    "url": "about/index.html",
    "revision": "25d8e0e70d53139a8f56ffa02bf386c7"
  },
  {
    "url": "artificial-intelligence/index.html",
    "revision": "98ae4c7e887c7aaafddfecaf3a7aa409"
  },
  {
    "url": "artificial-intelligence/search-strategies.html",
    "revision": "073437dbc136b22de47a654451807f7b"
  },
  {
    "url": "assets/css/0.styles.20b8e637.css",
    "revision": "e7913038d4a7071402768445e87c7bee"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.54f22b44.js",
    "revision": "efee83726b29c3cced1737002ea54c44"
  },
  {
    "url": "assets/js/11.e468b1cd.js",
    "revision": "1cdda7876c5f2718d9e5f5f56d3c4d15"
  },
  {
    "url": "assets/js/12.f03a97b8.js",
    "revision": "c186dd285d8af98113e09db166357f61"
  },
  {
    "url": "assets/js/13.28fedd2f.js",
    "revision": "683e04d6817f6b7480fcdd0e5bd9ffe8"
  },
  {
    "url": "assets/js/14.05b02eff.js",
    "revision": "c3f414c2c6c4c185e149757ec1e3c752"
  },
  {
    "url": "assets/js/15.e8d9793a.js",
    "revision": "19eead37595655ef1f234b531a27ce55"
  },
  {
    "url": "assets/js/16.049a56e2.js",
    "revision": "623f59814d9ac297cbe393ca77c202ec"
  },
  {
    "url": "assets/js/17.e97d92fe.js",
    "revision": "9cbd67c5361760ba84778ba154428926"
  },
  {
    "url": "assets/js/18.3e4d0273.js",
    "revision": "cc5b29fcae3eb892e078af980e05cb43"
  },
  {
    "url": "assets/js/19.e8f26629.js",
    "revision": "78d4d185b2f582e4ee2919bb7863c343"
  },
  {
    "url": "assets/js/20.9f8caa98.js",
    "revision": "22a875abb2513fc3fe2d249c8d43bf3e"
  },
  {
    "url": "assets/js/21.4d7c030c.js",
    "revision": "2f4b0c67d37487b7aac179e1dd27c3c5"
  },
  {
    "url": "assets/js/22.9b34a2bf.js",
    "revision": "44a33a3716a7208c203c9bdf66a0ea6c"
  },
  {
    "url": "assets/js/23.09aed1b8.js",
    "revision": "f09381a967280a1fde476b33060d672c"
  },
  {
    "url": "assets/js/24.35230f76.js",
    "revision": "8a6f8a2f7442d6099e2bf043183d3475"
  },
  {
    "url": "assets/js/25.aa4545b1.js",
    "revision": "bac2d6d547a76b11679d4a28816946c5"
  },
  {
    "url": "assets/js/26.55409145.js",
    "revision": "05d01cb5071f3622e1d2152d78bfc5eb"
  },
  {
    "url": "assets/js/27.28dcdeb7.js",
    "revision": "992de4bc92cac6c328f1bfb6e6da3a30"
  },
  {
    "url": "assets/js/28.cc80380f.js",
    "revision": "8667e1620c959b155863213885843d10"
  },
  {
    "url": "assets/js/29.a4318aac.js",
    "revision": "b6e30341dc09a3be432ba87c7a7bba22"
  },
  {
    "url": "assets/js/3.4ee3a991.js",
    "revision": "1165d944f3530a70acce4e980792565b"
  },
  {
    "url": "assets/js/30.8dc8cda8.js",
    "revision": "5755103e8aee15557d59797e204fb4f4"
  },
  {
    "url": "assets/js/31.a23589a8.js",
    "revision": "fc89cdf5685897f1870811bae9517215"
  },
  {
    "url": "assets/js/32.a9aafb4a.js",
    "revision": "21f8b4d6de364826c1b7abc2021076c6"
  },
  {
    "url": "assets/js/33.42b0e1e9.js",
    "revision": "60623f13127072743ccf3c72b81dd30b"
  },
  {
    "url": "assets/js/34.3e2bb194.js",
    "revision": "52a69fb83073bbb02fb1931c8bb0db1e"
  },
  {
    "url": "assets/js/35.01927192.js",
    "revision": "ac4f8811ae017547c59958f390c13509"
  },
  {
    "url": "assets/js/36.26115c09.js",
    "revision": "d405983df339dc258ebe67d8f0e1a276"
  },
  {
    "url": "assets/js/37.6e62defc.js",
    "revision": "05a4c7c1a675f6ef955f6828111ecacd"
  },
  {
    "url": "assets/js/38.1b799d52.js",
    "revision": "4baa191fda8f281acdef74a05b95ad67"
  },
  {
    "url": "assets/js/39.d0845971.js",
    "revision": "38fc9b53ae52aac47cae74b6b8b09eb8"
  },
  {
    "url": "assets/js/4.c4fa71af.js",
    "revision": "08756b8f47a945c29f2eb5ed449235e5"
  },
  {
    "url": "assets/js/40.74d5b189.js",
    "revision": "da5540e7eabf0fb8b15fc1552b172c89"
  },
  {
    "url": "assets/js/41.c37b1d82.js",
    "revision": "275fff54123d47d448e396d80a61ff8a"
  },
  {
    "url": "assets/js/42.cc92219d.js",
    "revision": "235da67ce7718ad95b641b3373738d89"
  },
  {
    "url": "assets/js/43.7a7f4aaf.js",
    "revision": "9714fb24c48b5de8eacbb081f64bbb22"
  },
  {
    "url": "assets/js/44.32527ea1.js",
    "revision": "d90f65bfae5345e9496f11231b55866b"
  },
  {
    "url": "assets/js/45.e8168ed8.js",
    "revision": "8c8a285da6bd47143ff3053657a334bd"
  },
  {
    "url": "assets/js/46.05c60e37.js",
    "revision": "0d24e89d2e2fd2f990d3779ab147e2f8"
  },
  {
    "url": "assets/js/5.73148f50.js",
    "revision": "1de44f4d5ea4bac832e25629c75eb09a"
  },
  {
    "url": "assets/js/6.a9629946.js",
    "revision": "d5eaa57f568633ddc321ac7194778c16"
  },
  {
    "url": "assets/js/7.c8f1ddc3.js",
    "revision": "9d0fb8418666fa2e6cf45a525da77396"
  },
  {
    "url": "assets/js/8.32990cfd.js",
    "revision": "9d351089c8a3a7c9eb30ca689e052b8a"
  },
  {
    "url": "assets/js/9.abf9359a.js",
    "revision": "cdd8d138ba8fc9d5f24a6abbfa2a9960"
  },
  {
    "url": "assets/js/app.0cd38322.js",
    "revision": "98a5fa33d06927c2d60d01c1aeefe1cc"
  },
  {
    "url": "assets/js/vendors~flowchart.97e60c9f.js",
    "revision": "6548ff3d9d5b08a3c45afdb1d478541d"
  },
  {
    "url": "big-data/index.html",
    "revision": "e925ee64fe419b667ecbd3d59afd2712"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "15f74de35b548446d2a13201df8ca3fe"
  },
  {
    "url": "c/index.html",
    "revision": "84262283988f1002764583e3846774a9"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "abeb358816270d35799c72b39b167fa9"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "61211c166bfc83952aba25e501e00a9a"
  },
  {
    "url": "deep-learning/python-and-vectorization.html",
    "revision": "6f670939dcc80033d9368454730356f9"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "front-end/index.html",
    "revision": "95211062d3f697f3749861d0f3b0af8d"
  },
  {
    "url": "hello-world/about-the-article-of-java.html",
    "revision": "b527536fc630572cee11907351ad961d"
  },
  {
    "url": "hello-world/array-and-linked-list.html",
    "revision": "ce2d8da5e1450c5d666d6bff09688761"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "5923b7374143f52c72de0afdcc1374fa"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "8039032bd7a796c4143ba88cdbe0a837"
  },
  {
    "url": "hello-world/index.html",
    "revision": "d44400f4ecd155b53dbe0cfd9007ed70"
  },
  {
    "url": "hello-world/setup-a-server-manually.html",
    "revision": "086d95e044133e20dbb76cf0b827ab60"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "e0cdd39165b641b0acea63cc9a4d7e50"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "7c3401f4fe7e89db0629618b1e0ac122"
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
    "url": "img/tomcat_webapps.jpg",
    "revision": "1c76cd467dad7e9d344fb294ad1db53b"
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
    "revision": "160ac915abf7390bc28884c8db193164"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "8a05c56dece2e1bd594b82e5a5ecd7af"
  },
  {
    "url": "java/API-io.html",
    "revision": "26d44570638ccc52f089f92c65528fa4"
  },
  {
    "url": "java/API-lang.html",
    "revision": "c5fab775f1e4fe434dd705bf96da5d78"
  },
  {
    "url": "java/API-util.html",
    "revision": "a97a8bcf9bb9dd7ade9a12f131beb75b"
  },
  {
    "url": "java/grammars.html",
    "revision": "f811aa5a7334c296df45c8ac04210979"
  },
  {
    "url": "java/index.html",
    "revision": "514221ca1c6d1c93159aea8fc1b446e7"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "cdac008d9f889e96c4c0b4ba15c1c26f"
  },
  {
    "url": "kotlin/index.html",
    "revision": "cde56d6d2f4759d19c7179b0e9c633d3"
  },
  {
    "url": "math/index.html",
    "revision": "78cd4ca6677aff2de95eec75ad08cd57"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "32d02e443f810055d64ed868938b2c2e"
  },
  {
    "url": "python/grammar.html",
    "revision": "61ffae68dd885f0ca76097de64069bd3"
  },
  {
    "url": "python/index.html",
    "revision": "3caf259a25c42a2ee16b99525fd79c46"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "b1056e534a718c0ab9f8114bd9a08a76"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "c4caccc96a9868326a60e1124b5131d2"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "6a717e72b03dc9756cfd7d1cde23d924"
  },
  {
    "url": "spring/index.html",
    "revision": "b9fb31a975e75f7d4742ad5a63fb615b"
  },
  {
    "url": "web/HTTP.html",
    "revision": "e967d315d9446715cd85495221c3dd23"
  },
  {
    "url": "web/index.html",
    "revision": "b726541601fb09c92aa25d26271be9ea"
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
