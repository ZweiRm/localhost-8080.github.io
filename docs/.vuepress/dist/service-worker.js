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
    "revision": "c5a2cb2ebcdb5ba1ecd58ab5992c6660"
  },
  {
    "url": "about/index.html",
    "revision": "c01151ccfea5b0bc2c72127bb80838ec"
  },
  {
    "url": "artificial-intelligence/index.html",
    "revision": "3bddb17ca3b682e6e012c6db0f967c40"
  },
  {
    "url": "artificial-intelligence/search-strategies.html",
    "revision": "6a7bfd63cf2f6edf74f356175508bf09"
  },
  {
    "url": "assets/css/0.styles.37aa415d.css",
    "revision": "8b01aaa9aaf0ca45f1a8986074adcd8b"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.30c62b40.js",
    "revision": "644dfe4e2203a94ed075b7398eadc9e0"
  },
  {
    "url": "assets/js/11.a8daf05e.js",
    "revision": "7ba45f8649af9c3998045ab0511ad9b5"
  },
  {
    "url": "assets/js/12.635353b4.js",
    "revision": "e37fdabc045509587628e5683e359afa"
  },
  {
    "url": "assets/js/13.87be6588.js",
    "revision": "5da19dcceb8e2f6401ec0e5ff8666f1c"
  },
  {
    "url": "assets/js/14.cdd61c86.js",
    "revision": "9372db770849473518171d1700569ba4"
  },
  {
    "url": "assets/js/15.3fde9b81.js",
    "revision": "3cd5edb703a07eb665048cabaf60a5ee"
  },
  {
    "url": "assets/js/16.e351c251.js",
    "revision": "682c7778d58007aa1c9239ca669eef46"
  },
  {
    "url": "assets/js/17.526b4111.js",
    "revision": "2ad3b54f0596c34bb909299106fded91"
  },
  {
    "url": "assets/js/18.3f21e985.js",
    "revision": "d52c60940b6519fde30408598e67c831"
  },
  {
    "url": "assets/js/19.644b55e2.js",
    "revision": "b4ca2e3ec9d9d1b4bfee26fd53c38ea5"
  },
  {
    "url": "assets/js/20.0b7580a8.js",
    "revision": "46f0dab4f16463c65c2e06e3b36066af"
  },
  {
    "url": "assets/js/21.7d2e46b3.js",
    "revision": "3b202abc42a1c2c8745550308dd43581"
  },
  {
    "url": "assets/js/22.96634bff.js",
    "revision": "8008242ea9355115ae490f7f8df0c7d8"
  },
  {
    "url": "assets/js/23.eedaf52e.js",
    "revision": "09f8166c26a4d8c4d9f33f693573786d"
  },
  {
    "url": "assets/js/24.91e6b40f.js",
    "revision": "407aea7ff9b70854ff0d199bb16b7613"
  },
  {
    "url": "assets/js/25.698e4036.js",
    "revision": "5dd1d105ccc9919038e67be43da886d7"
  },
  {
    "url": "assets/js/26.cfb75b70.js",
    "revision": "6e1201f82360d9f153e3358827ee1b78"
  },
  {
    "url": "assets/js/27.99e1b311.js",
    "revision": "b2c7f84d3325f1646cd350424a53b2b2"
  },
  {
    "url": "assets/js/28.d27370cb.js",
    "revision": "8ac802f67c72252a9971272e116de116"
  },
  {
    "url": "assets/js/29.6157dd6c.js",
    "revision": "822e723c3a9b73a71cf726362968c023"
  },
  {
    "url": "assets/js/3.5dc5b798.js",
    "revision": "d9613039c4bf27872193579fdb5d9207"
  },
  {
    "url": "assets/js/30.595f35fe.js",
    "revision": "8f752ceea128504e52fd8369c5c95efb"
  },
  {
    "url": "assets/js/31.2a7104be.js",
    "revision": "751c63f48f9a869e9075ab24086cf8be"
  },
  {
    "url": "assets/js/32.517c4b03.js",
    "revision": "4844136eef8b8d64fc00a4c8b0fd1501"
  },
  {
    "url": "assets/js/33.6a7faaaf.js",
    "revision": "9dcef5f698c5b71a3d644f24449c926b"
  },
  {
    "url": "assets/js/34.d1aa82bd.js",
    "revision": "973df31348698cdfc5dbdeb1b61abc1a"
  },
  {
    "url": "assets/js/35.f4d1cf85.js",
    "revision": "0b062be8355b88448719c6d8a21fa59d"
  },
  {
    "url": "assets/js/36.67e72cfb.js",
    "revision": "d5079618563ba2cd467527e2f1d8126c"
  },
  {
    "url": "assets/js/37.db05bcc2.js",
    "revision": "29358351eb97747f70d84ed024d9be06"
  },
  {
    "url": "assets/js/38.d6c9fa5b.js",
    "revision": "f131e8af74edf93512d2f5a8916d613f"
  },
  {
    "url": "assets/js/39.e88fb587.js",
    "revision": "041e51bb36300da1889e68e5ce5439c2"
  },
  {
    "url": "assets/js/4.fbf32185.js",
    "revision": "c22f93c59cf178037176e1ed72a3dca3"
  },
  {
    "url": "assets/js/40.b056e1e1.js",
    "revision": "314ddc293bd805b838bacad7cbbb1da1"
  },
  {
    "url": "assets/js/41.38c95ebb.js",
    "revision": "d77b98ad7700afb3f5e8d47984ce0643"
  },
  {
    "url": "assets/js/42.88588a6b.js",
    "revision": "b4acd02225908ae5d7eccbbe55aa41e6"
  },
  {
    "url": "assets/js/43.d5c09949.js",
    "revision": "c7905c7f2879cd2827ee31e4360ab42e"
  },
  {
    "url": "assets/js/44.8c7070bc.js",
    "revision": "6e3c4efbfb0764f8e03df59b5a80c00c"
  },
  {
    "url": "assets/js/45.d5260f57.js",
    "revision": "3bf478179308400674793c6c9965a644"
  },
  {
    "url": "assets/js/5.d3389438.js",
    "revision": "ebc5345f85c914b023c8580b3092f133"
  },
  {
    "url": "assets/js/6.465ee2f0.js",
    "revision": "9bc98c7c645d74c54159e269e477fb72"
  },
  {
    "url": "assets/js/7.2f4f8811.js",
    "revision": "199903d681063ee9f5168e4fb2a3ff59"
  },
  {
    "url": "assets/js/8.963b9a8b.js",
    "revision": "547c19ec25974be8ac640ceae8b1fee1"
  },
  {
    "url": "assets/js/9.1dadfc78.js",
    "revision": "dd33a335285165ee2b88483cd45d23dc"
  },
  {
    "url": "assets/js/app.d184ef87.js",
    "revision": "c7d964c91b483d290cd32114213a5242"
  },
  {
    "url": "assets/js/vendors~flowchart.ab3105b0.js",
    "revision": "8508d0e92a3147ed6cccc1472e97ddbf"
  },
  {
    "url": "big-data/index.html",
    "revision": "e0be220a3bd5761a852b3f15966bb7ab"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "75182763f344c407d66667c1f61bcb01"
  },
  {
    "url": "c/index.html",
    "revision": "528b656e3ef1d3987b41d79f00d62227"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "c9759545774faaf609fa3f82473c5973"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "8d399c29ece83305e7b8c0325295ed78"
  },
  {
    "url": "deep-learning/python-and-vectorization.html",
    "revision": "a692a1d4b0abf9aa1c28f3f4300321a4"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "front-end/index.html",
    "revision": "fb0cadb04195fce2e5418fd06be8de39"
  },
  {
    "url": "hello-world/about-the-article-of-java.html",
    "revision": "4bb1a15d7ad7956f0d867aee7367e998"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "04f7904619051adb3ecb0eaf83ac9b97"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "6659cb0d8d5bebff8570221c0717a7e3"
  },
  {
    "url": "hello-world/index.html",
    "revision": "15c6162bb9705fa0d9f25bcf28c96260"
  },
  {
    "url": "hello-world/setup-a-server-manually.html",
    "revision": "9cfec2d55e760d94776e2f36dc78d42b"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "a5c84a0d12c12b926ab959ff25d57799"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "17d500163007109901901641f81c99cc"
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
    "revision": "08ca20d91aebeb563a4080951f8e436b"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "91160f20904b2e22d1fd86a6ef038ba4"
  },
  {
    "url": "java/API-io.html",
    "revision": "e7b2748e1f0cd313500143d2d3dbb7b0"
  },
  {
    "url": "java/API-lang.html",
    "revision": "0b9ae5ca220eff68e613403283e473e2"
  },
  {
    "url": "java/API-util.html",
    "revision": "caa8bd0567703dac5d93f28a30c91a1f"
  },
  {
    "url": "java/grammars.html",
    "revision": "caf36f6fc133904674a757f1559a02d3"
  },
  {
    "url": "java/index.html",
    "revision": "660658dd32a93444ee5d357e5e4b1bf1"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "586ce122779968926ca472a993907518"
  },
  {
    "url": "kotlin/index.html",
    "revision": "461ab1047882b41a381e4085a9cb91b8"
  },
  {
    "url": "math/index.html",
    "revision": "a70d1a03cca8768dd48f4ca026af235a"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "0a5feff622116f27d6ce0f4cc2c1788c"
  },
  {
    "url": "python/grammar.html",
    "revision": "4b44bde1f46205790dbea5ad17034a10"
  },
  {
    "url": "python/index.html",
    "revision": "09bca90689bff9653019c6a6efdecf5f"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "1a23e48766891dcffdea28853996da1d"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "2f94cb68dc11ce7908b3cf2fce103df3"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "8739b5103a4d8f09e8b5e0872689cef0"
  },
  {
    "url": "spring/index.html",
    "revision": "bce955aa8fd8eb4ef71d82c4a1443da9"
  },
  {
    "url": "web/HTTP.html",
    "revision": "74c9b29b0d0f95f241df94e8e7c80f31"
  },
  {
    "url": "web/index.html",
    "revision": "4c2c8a544d07044428bed0d730dfc422"
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
