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
    "revision": "954d6d86c9773da34df7c8e23cdfeebc"
  },
  {
    "url": "about/index.html",
    "revision": "f4e68ef677dbd9145a2d14baa45221ce"
  },
  {
    "url": "assets/css/0.styles.c99e36f2.css",
    "revision": "ce89a2bd3d2e9b372adad319ee94c61c"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.b9c46a1b.js",
    "revision": "20809c081ebbb2d9150c167026de1fa3"
  },
  {
    "url": "assets/js/11.ce28429e.js",
    "revision": "07732526d1178cf41c45f5ed785c2ab1"
  },
  {
    "url": "assets/js/12.4629d291.js",
    "revision": "354c1e05f42ee81b7f0661229d91ab89"
  },
  {
    "url": "assets/js/13.2bbe09e2.js",
    "revision": "34ca720d9343e8b2f8779f8cf10ea624"
  },
  {
    "url": "assets/js/14.fc4833c9.js",
    "revision": "9a40fe0b1772e60550b3697ff37fe341"
  },
  {
    "url": "assets/js/15.6ac227d1.js",
    "revision": "e9264422ef31f5ab194ed5c8c90c4f4a"
  },
  {
    "url": "assets/js/16.692c95d4.js",
    "revision": "1338eb203480eadfac27b15c54ef64a8"
  },
  {
    "url": "assets/js/17.448789b7.js",
    "revision": "19c1355dc1bca48238cd96b5a8a5e3ac"
  },
  {
    "url": "assets/js/18.aec3df1d.js",
    "revision": "36501227d7dbd40086bf156d80e4d8a8"
  },
  {
    "url": "assets/js/19.64307d2e.js",
    "revision": "73df8b5f02d2239098d34dd50a6fa85d"
  },
  {
    "url": "assets/js/2.fba6a68c.js",
    "revision": "14760500bce882342717ef2ece826115"
  },
  {
    "url": "assets/js/20.ced208fe.js",
    "revision": "eb46da715d68ea0dec3c73aaffeb09ba"
  },
  {
    "url": "assets/js/21.7a786855.js",
    "revision": "25656fa49ea0e62bf5632e903829cc38"
  },
  {
    "url": "assets/js/22.e1a7134b.js",
    "revision": "514d784d1dafc22f7b88dde448dc3920"
  },
  {
    "url": "assets/js/23.ec00ead0.js",
    "revision": "9045d058ffea65f1021db2f9428758c9"
  },
  {
    "url": "assets/js/24.80b8b3ca.js",
    "revision": "097f6bae4e500df99edbd0d915ce65f6"
  },
  {
    "url": "assets/js/25.1dc91667.js",
    "revision": "72e909a0825d1ce4a85de21c656c9421"
  },
  {
    "url": "assets/js/26.c97461f6.js",
    "revision": "99de9a81e725d1c25988b2d0adee08cd"
  },
  {
    "url": "assets/js/27.26f72bbe.js",
    "revision": "615f6ac8b8d9c007e9ffc3b79038b16c"
  },
  {
    "url": "assets/js/28.9f28bd25.js",
    "revision": "4a8e93f52e2627e600e2814a8ba33b15"
  },
  {
    "url": "assets/js/29.b79f9bba.js",
    "revision": "2e8a4ea45ddf5e8d65f6a5e830014206"
  },
  {
    "url": "assets/js/3.420795b9.js",
    "revision": "342f80665fc6bd19b951ce8e5c3695b9"
  },
  {
    "url": "assets/js/30.963cb87e.js",
    "revision": "16f91ced861d333b0d00f548d620f67c"
  },
  {
    "url": "assets/js/31.3252a8d4.js",
    "revision": "8621558ea8b087dfb4858400a9c2e83a"
  },
  {
    "url": "assets/js/32.0709e378.js",
    "revision": "d13ee5e168034c700b37fcc6f9245aaf"
  },
  {
    "url": "assets/js/33.cd19161d.js",
    "revision": "0e56933c2b49bbe589e05e97a6544e3c"
  },
  {
    "url": "assets/js/34.69fdcddb.js",
    "revision": "9b47b783913a872e4eae18d7ad7320b3"
  },
  {
    "url": "assets/js/35.a7e84ead.js",
    "revision": "ae27b9d118d1c52d4d161ca9814fa14d"
  },
  {
    "url": "assets/js/36.12c73702.js",
    "revision": "414d5e10f03556e1a392989af5b38f95"
  },
  {
    "url": "assets/js/4.09468943.js",
    "revision": "5ad8aa78b5577ae3beaf6e6b380e4991"
  },
  {
    "url": "assets/js/5.7c0ae059.js",
    "revision": "1cf33a6176e8b29751797b808e24a484"
  },
  {
    "url": "assets/js/6.ade8a31f.js",
    "revision": "7006c3cdd7d062354564e3d9ec664a49"
  },
  {
    "url": "assets/js/7.1453e115.js",
    "revision": "85a975e24c6e0113864ab2f339eff78e"
  },
  {
    "url": "assets/js/8.d727df6d.js",
    "revision": "022ab6db93a791fe53a6c1c7a31c5e4a"
  },
  {
    "url": "assets/js/9.6c42af0e.js",
    "revision": "f654ee0cb6a05560486840a837ede30e"
  },
  {
    "url": "assets/js/app.06545fcc.js",
    "revision": "24a97ccabe7bc34eb8861c4963ee91f2"
  },
  {
    "url": "big-data/index.html",
    "revision": "85e77b94f52e390ce79ec60dcd5590cc"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "c82b6dc94f0a93472377fc8b4bb9df3e"
  },
  {
    "url": "c/index.html",
    "revision": "dea52e1afcef116cc062af45edd047ce"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "6ddc6d0196fdf76387345c50df31fd92"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "front-end/index.html",
    "revision": "8c44d1c1ffc4df9d3cef980524c98afa"
  },
  {
    "url": "hello-world/about-the-article-of-java.html",
    "revision": "ba2a36732129cfbd9c8f6ef6bb4171c9"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "b35c317e5b0edff527453ffc782043e9"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "19c564429618c038c8292ef196d3849a"
  },
  {
    "url": "hello-world/index.html",
    "revision": "ff0009876b1b8ea1e5efb363adecf4eb"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "071a278284251a2df5fac713bd5d9618"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "51b83c6c9889972433ef0d62ac85131a"
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
    "revision": "2a8aeefac346a23f1a045273427cf117"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "f8572938c32781e3585eaf60f6b0fa7c"
  },
  {
    "url": "java/API-io.html",
    "revision": "7642a7f2b8e20f7a099ec3e26e14006c"
  },
  {
    "url": "java/API-lang.html",
    "revision": "ee1f4dcf27bcbe5aa6272af9ca8486e6"
  },
  {
    "url": "java/API-util.html",
    "revision": "1f370f3c8e5717c0c46e85f9542296e2"
  },
  {
    "url": "java/grammars.html",
    "revision": "7d61e6b0f951a259fa06dd44ab68f75c"
  },
  {
    "url": "java/index.html",
    "revision": "68d67560cc0c101eec4f1471ea75856c"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "f030d70ecd473c24710bbf66093fca1c"
  },
  {
    "url": "kotlin/index.html",
    "revision": "7c5135fdb8c4842cdf27b98a02fc6e3a"
  },
  {
    "url": "math/index.html",
    "revision": "a8667ee5ef9449d3ef258f81228fe36c"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "eeb88b55e680af73356152d63ade0868"
  },
  {
    "url": "python/index.html",
    "revision": "6be9c5dfd39a7e39369833072c786fa6"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "28ec836413eae046295e3ef7622ad892"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "a40d15dcb77f05dca44801ce48297197"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "de0e735d2077cb5e8ab1ba74a36eb786"
  },
  {
    "url": "spring/index.html",
    "revision": "662495b2d19bea687bdf171a74b4a5a8"
  },
  {
    "url": "web/HTTP.html",
    "revision": "7f19fb2cba9a9a88db11d47add378ad6"
  },
  {
    "url": "web/index.html",
    "revision": "de546155c195476a0b154db9fdeb7d3d"
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
