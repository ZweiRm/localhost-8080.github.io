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
    "revision": "83a2c05b230f7221faa38c18a6375185"
  },
  {
    "url": "about/index.html",
    "revision": "a1c6c0c9d22f5b2a8466ef884f20ab1b"
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
    "url": "assets/js/10.b9c415bc.js",
    "revision": "b97bd321da3fd55f1e18cc8b4e762a27"
  },
  {
    "url": "assets/js/11.ce28429e.js",
    "revision": "07732526d1178cf41c45f5ed785c2ab1"
  },
  {
    "url": "assets/js/12.dc3059f6.js",
    "revision": "895be33eee19705c3c84d14dfb30731c"
  },
  {
    "url": "assets/js/13.cd91235a.js",
    "revision": "0cade2ab035e5c700f56e547b6f96304"
  },
  {
    "url": "assets/js/14.fc4833c9.js",
    "revision": "9a40fe0b1772e60550b3697ff37fe341"
  },
  {
    "url": "assets/js/15.25507908.js",
    "revision": "f9d70dbcdc3b9841795bbf31a0d979c9"
  },
  {
    "url": "assets/js/16.c0f599b2.js",
    "revision": "231551c438eb4ed9b48e2f02d45ca811"
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
    "url": "assets/js/26.c3157074.js",
    "revision": "1c6f4b48f2313c63fab83891234de14a"
  },
  {
    "url": "assets/js/27.471e5e99.js",
    "revision": "b1080d41545a08910c02a6d23821d48d"
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
    "url": "assets/js/31.d65610f2.js",
    "revision": "4c1d023dd90b740e442e6e0ba59bb1ac"
  },
  {
    "url": "assets/js/32.695f5d4e.js",
    "revision": "cac74261afb84c7e21948e4acd149f5c"
  },
  {
    "url": "assets/js/33.d3a867d3.js",
    "revision": "d0d7b68ec19504f266c75149babc4b58"
  },
  {
    "url": "assets/js/34.c4be9753.js",
    "revision": "ee71c755b684e9928d5ea8a1cc2d812f"
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
    "url": "assets/js/9.7cc75e4f.js",
    "revision": "9d6e32e58db9e3464ed2e97d5f1a700f"
  },
  {
    "url": "assets/js/app.04206eb0.js",
    "revision": "d2c7ecd98585dfff6fe6443564fbb263"
  },
  {
    "url": "big-data/index.html",
    "revision": "c4003a76b4508763a4e5a32d793d02be"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "f8c4346b10d9539c4f3ed0f7f099d989"
  },
  {
    "url": "c/index.html",
    "revision": "c32101e20742df55ab916fa89a5acb9d"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "84457a46c7ddeeeefef5665ef1e8f784"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "front-end/index.html",
    "revision": "4f5630bdb3713fcc2650170f4d4e3b4e"
  },
  {
    "url": "hello-world/about-the-article-of-java.html",
    "revision": "b9aafd2249984fae4732628e7bc6ff34"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "27f49f0d45f3302ee13d32d00f17750f"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "dc51a6b533e8643b4694a26131ca5e04"
  },
  {
    "url": "hello-world/index.html",
    "revision": "5285d5a9ffd10104140a596af4b82ce3"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "57145018c9e9800af83bb2f04111f79e"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "357fdc1872f16758681f89f04a66985a"
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
    "revision": "04d2034d74eb84b20a321633d70a389f"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "2e22eb42757a7dbc3b4cf747e2fec78c"
  },
  {
    "url": "java/API-io.html",
    "revision": "640b19da00cac9b25d418633292d9e9e"
  },
  {
    "url": "java/API-lang.html",
    "revision": "e2965c7f26c6e7f36ef67b2755205a0b"
  },
  {
    "url": "java/API-util.html",
    "revision": "3457695ae720b1ef8e070cb4e0a477ae"
  },
  {
    "url": "java/grammars.html",
    "revision": "2362a49c1a445194d2dbe69cafa19865"
  },
  {
    "url": "java/index.html",
    "revision": "50266d8299c48c132c8ab901bc0ccd7b"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "673ed871a3826ae6d4f4b911a3d96afd"
  },
  {
    "url": "kotlin/index.html",
    "revision": "320700525d9efcf0ef25810cf68423dd"
  },
  {
    "url": "math/index.html",
    "revision": "f312f9e628fd4d8f1d5ba67711a5bb6e"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "018b6cf0ec2f0ac38e1afd538dc01855"
  },
  {
    "url": "python/index.html",
    "revision": "4866988919a77edc2630cfc44c49dc27"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "76df5be443b1ac2af627cef6d4f4931f"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "b0b5ca27293413cdedca1b4757f395c6"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "e60d82c34ac9b7300ddf3dd2664c2a68"
  },
  {
    "url": "spring/index.html",
    "revision": "358b44f69402636df58452c21e9a661d"
  },
  {
    "url": "web/HTTP.html",
    "revision": "356d447ca7f1a6c2dc5d454ec9444c2a"
  },
  {
    "url": "web/index.html",
    "revision": "6c84f0d5672d3646f89198d6710f1b61"
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
