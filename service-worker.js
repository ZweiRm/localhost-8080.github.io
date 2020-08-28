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
    "revision": "85937cc7167f2375b2d850dc06030ab2"
  },
  {
    "url": "about/index.html",
    "revision": "8d91e459ccb420ce33b896fc971b203e"
  },
  {
    "url": "assets/css/0.styles.ff1f9cf9.css",
    "revision": "c48ea4a67e6a14b56acd41aba50ac209"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.c7aec6f9.js",
    "revision": "36f518c19db88deb0537029c150599a7"
  },
  {
    "url": "assets/js/11.d03121b2.js",
    "revision": "7b8235a70beff3450dc38500d371618e"
  },
  {
    "url": "assets/js/12.41268184.js",
    "revision": "7450b5f8865ffb802415995ce04608a3"
  },
  {
    "url": "assets/js/13.f2365b9d.js",
    "revision": "429fefeea1742caf1a6ec65dfbbffc90"
  },
  {
    "url": "assets/js/14.7bed20f5.js",
    "revision": "313fcc86f1431f51ae6c731180295a42"
  },
  {
    "url": "assets/js/15.18546ab2.js",
    "revision": "5e9a3dee629bd3c6c334e3cc92fa34e9"
  },
  {
    "url": "assets/js/16.07ab5c15.js",
    "revision": "efa2675214614c0c8d1feda4f6cd39c4"
  },
  {
    "url": "assets/js/17.9bde1cdb.js",
    "revision": "c73c1a8ccb929b8a5092bd2a4a79fc09"
  },
  {
    "url": "assets/js/18.fdabb00a.js",
    "revision": "cb4bfbc0b4e6565d42e391ae07e91ba8"
  },
  {
    "url": "assets/js/19.5e985d70.js",
    "revision": "6ab127a5a76ead2d04aac86831dab836"
  },
  {
    "url": "assets/js/20.aaae7a60.js",
    "revision": "84a203b8be450eb0c6581211c58b8e80"
  },
  {
    "url": "assets/js/21.def12064.js",
    "revision": "1f6b99471c0b1f39e79183fd1a91116b"
  },
  {
    "url": "assets/js/22.de43c72b.js",
    "revision": "290450830af9e8d86e910183545ad6a6"
  },
  {
    "url": "assets/js/23.ec7075b0.js",
    "revision": "5b98e694a1d1db1fb7099a064a4533bf"
  },
  {
    "url": "assets/js/24.903623b8.js",
    "revision": "b451e49009715ce9e851ef03d2f61ef8"
  },
  {
    "url": "assets/js/25.cd7aba8f.js",
    "revision": "9d6080637450848939771d9a3a09853b"
  },
  {
    "url": "assets/js/26.bbe27de8.js",
    "revision": "fb2464f1c584adba836dc1a52f177846"
  },
  {
    "url": "assets/js/27.13f198c4.js",
    "revision": "d8df35f893cb20aaf595b4c3a394b026"
  },
  {
    "url": "assets/js/28.b6f1a5a6.js",
    "revision": "f99c45990221e009bdec00cdc67f0c57"
  },
  {
    "url": "assets/js/29.f3a91a1e.js",
    "revision": "6dc115e9497b4801d68b267e12d22ebc"
  },
  {
    "url": "assets/js/3.443abace.js",
    "revision": "43f1333bcf7ae0d2fd002ab267f528b7"
  },
  {
    "url": "assets/js/30.e9428586.js",
    "revision": "6a5fe9b95deb24a001298359839f3486"
  },
  {
    "url": "assets/js/31.dbc9b65d.js",
    "revision": "79a2d707d52a52bfb182c63a40c94dc4"
  },
  {
    "url": "assets/js/32.4fcc3c7c.js",
    "revision": "d048dce965f81e20ccf76a1276074ce1"
  },
  {
    "url": "assets/js/33.0ce3a87e.js",
    "revision": "d3a9f317cb49bd381e60ba911fb947b9"
  },
  {
    "url": "assets/js/34.12edd7e3.js",
    "revision": "0fc76c92a8970332a7a40a1695655c38"
  },
  {
    "url": "assets/js/35.e3562e6c.js",
    "revision": "96d4531737a268747813d8f0039c9444"
  },
  {
    "url": "assets/js/36.cafca1a0.js",
    "revision": "9e19656622e385126e45a81c294882d6"
  },
  {
    "url": "assets/js/37.f41c61d2.js",
    "revision": "721fdf899ed192cb392d262109e15899"
  },
  {
    "url": "assets/js/38.3cad210d.js",
    "revision": "1ea76f1522bf3d889caeb820d72e9ba6"
  },
  {
    "url": "assets/js/39.6ac500a1.js",
    "revision": "15a1ea39b1732b0b3c7d98863afbf62c"
  },
  {
    "url": "assets/js/4.808f7068.js",
    "revision": "65bae7fce8fff5e1b5529a2c322e60e4"
  },
  {
    "url": "assets/js/40.5da40a19.js",
    "revision": "773c37ffa864235dcfb7796822f1171c"
  },
  {
    "url": "assets/js/41.732719ee.js",
    "revision": "6d9e6c8be4cda3a4e519191e329134e9"
  },
  {
    "url": "assets/js/5.e5300968.js",
    "revision": "413a4c63a5a741761ea980e0eb07d089"
  },
  {
    "url": "assets/js/6.42baef53.js",
    "revision": "52c02a83e980a48901ab00023f69ef88"
  },
  {
    "url": "assets/js/7.697b99e1.js",
    "revision": "7772191eee77d8b5c8b63ff939e3e9ef"
  },
  {
    "url": "assets/js/8.fae09b8f.js",
    "revision": "38dcc22b5877b1291632cbc60046029d"
  },
  {
    "url": "assets/js/9.5025cf72.js",
    "revision": "a863e3b06964493b01f3179caf1142e5"
  },
  {
    "url": "assets/js/app.d07be59a.js",
    "revision": "4410244f3ede196f67ab4819d3a864a3"
  },
  {
    "url": "assets/js/vendors~flowchart.d91dd0c8.js",
    "revision": "fe653cfadbed38ae9c968308d961cf8c"
  },
  {
    "url": "big-data/index.html",
    "revision": "c6c2396e0bb0705516b789df733b2aa1"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "f1e07b3315532483219104511dbd6929"
  },
  {
    "url": "c/index.html",
    "revision": "27da6b62112dc84c91ca5869c688c7c1"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "b592899d2f793167c075b8b28e39d24e"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "5feffb1c752e6c462f380fb7357a5000"
  },
  {
    "url": "deep-learning/python-and-vectorization.html",
    "revision": "378562373ad8fbd39e16537252ea6469"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "front-end/index.html",
    "revision": "7b59e4ee8a22b8ed7785109f56fa2a67"
  },
  {
    "url": "hello-world/about-the-article-of-java.html",
    "revision": "7cd03903db846b731de5f42f94ccbea4"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "da2598d9b916edf085c483877751a92c"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "41d3b5f19c4ce8e237cb6820dd8a0a73"
  },
  {
    "url": "hello-world/index.html",
    "revision": "039a1f2110901f3395fbfb87413159c9"
  },
  {
    "url": "hello-world/setup-a-server-manually.html",
    "revision": "58ee7bcd8edb739eeba648261fddd99a"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "6664eb6f4192463c8817bf2925efeb84"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "65ae1f6fa24951bbe2376b926fc026f5"
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
    "revision": "3f35c308c83bb94200c49afe2b8b8a64"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "9b478ba0a757e092be6adec34b9b268b"
  },
  {
    "url": "java/API-io.html",
    "revision": "84a7cb155b4c2c6ea0803c3fd9b23713"
  },
  {
    "url": "java/API-lang.html",
    "revision": "46bf1919a24e789b98b01077612dc91b"
  },
  {
    "url": "java/API-util.html",
    "revision": "495474272cfd911206762aad01916c65"
  },
  {
    "url": "java/grammars.html",
    "revision": "48fa8d7ea0bc09e9fbcc72dcaf48abf8"
  },
  {
    "url": "java/index.html",
    "revision": "b4b1a930859bc41c7b2e20a73e1b4116"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "2e9d059ef2f7557d8afb9c3ceaa22dcb"
  },
  {
    "url": "kotlin/index.html",
    "revision": "0b4c483946f152ddd4a308e1df51c61f"
  },
  {
    "url": "math/index.html",
    "revision": "4a10d63618a9f28f420c9e15be602645"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "af67b6973b131100c3311a3c85fa2ebe"
  },
  {
    "url": "python/grammar.html",
    "revision": "c86481b63be85337a11e648dceb84dfa"
  },
  {
    "url": "python/index.html",
    "revision": "a7241878b4f30049757cfda516244f61"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "c364965f4a50c8ac4dd768ca6c4b0504"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "45137b72d2573df9db083c4e87246dcb"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "5473f4a37a1b6b1851016aa738e5a4b4"
  },
  {
    "url": "spring/index.html",
    "revision": "f9f6f7be76a7472c6f83fc7cd40f330f"
  },
  {
    "url": "web/HTTP.html",
    "revision": "7073356dbcd2ccbc3e7d962bc1fc3693"
  },
  {
    "url": "web/index.html",
    "revision": "fdb31955a24c5c31c5ec407adebf8243"
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
