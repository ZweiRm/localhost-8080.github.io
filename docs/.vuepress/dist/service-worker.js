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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "74e2dd9061f6d3e2f9084aa1dbd8b2fc"
  },
  {
    "url": "about/index.html",
    "revision": "4a30b2d3caa79d106b06f36caa3ad8f9"
  },
  {
    "url": "assets/css/0.styles.eaee3f53.css",
    "revision": "e76466ddaf392c1bbbc7727aa923aa80"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.803ed3d7.js",
    "revision": "e39a036562c93effc9c6344bc569f8e3"
  },
  {
    "url": "assets/js/11.790e7e57.js",
    "revision": "29bed5835ceec45c431afd07d1a1509d"
  },
  {
    "url": "assets/js/12.c3ab8fe0.js",
    "revision": "f2d7100aef1b3bd25d2db956f52645f9"
  },
  {
    "url": "assets/js/13.48f67a6e.js",
    "revision": "9517429553cee9e7232c49e5122994af"
  },
  {
    "url": "assets/js/14.c765793e.js",
    "revision": "b20f487d81bd32faf93dcdc7a309f392"
  },
  {
    "url": "assets/js/15.f4b1bbb3.js",
    "revision": "e0bb61f8afc0298629f619ccf2a8dc92"
  },
  {
    "url": "assets/js/16.c6a19bbb.js",
    "revision": "7659057a26de11401f94f1a40fd72232"
  },
  {
    "url": "assets/js/17.95e4c879.js",
    "revision": "4e625bde29cedddf3fb74f89cf6b666c"
  },
  {
    "url": "assets/js/18.0d9019fd.js",
    "revision": "b6b5c78208ef0d729c14ab283f2f94d0"
  },
  {
    "url": "assets/js/19.a8cea379.js",
    "revision": "0b6480213a23a16245c66076fdbe68ca"
  },
  {
    "url": "assets/js/2.aff1ee0b.js",
    "revision": "6f970957c3e11ce516cc6990364fce47"
  },
  {
    "url": "assets/js/20.e5fd7c4a.js",
    "revision": "1ee9c1125d55538748e683c1dd8403ce"
  },
  {
    "url": "assets/js/21.acd18154.js",
    "revision": "75a8951a9e27e18a542136930fcd269d"
  },
  {
    "url": "assets/js/22.2247687d.js",
    "revision": "4ba7e71cc1bb61036ab64d795629c3d0"
  },
  {
    "url": "assets/js/23.b515413a.js",
    "revision": "63484542bcf2ba13d21c9d929b1858ea"
  },
  {
    "url": "assets/js/24.3f819381.js",
    "revision": "cef5e397d9681252e9373086c600584b"
  },
  {
    "url": "assets/js/25.ad38070d.js",
    "revision": "44e87e85ef70a6b971d909f8f954f5c5"
  },
  {
    "url": "assets/js/26.61a6ce55.js",
    "revision": "3e6f1da296cda0087b238b5f1e39e49f"
  },
  {
    "url": "assets/js/3.65078ec3.js",
    "revision": "884308f991ecd5cca07777b7dedb5188"
  },
  {
    "url": "assets/js/4.6fa46199.js",
    "revision": "30b5efec6b7bda87bdeefe3b724fb221"
  },
  {
    "url": "assets/js/5.01a0765a.js",
    "revision": "a94195f9b95f458335db619287f16c07"
  },
  {
    "url": "assets/js/6.695d39be.js",
    "revision": "0733c9b58e90b44824e6f601f22c8db2"
  },
  {
    "url": "assets/js/7.41b5996c.js",
    "revision": "f960984907a2b54b425fac930a645603"
  },
  {
    "url": "assets/js/8.acb60f9a.js",
    "revision": "9846ca1e2eafa294f19ba1ebb6868d0e"
  },
  {
    "url": "assets/js/9.3b5e8e60.js",
    "revision": "336a87fb2611709eff46441717c0500c"
  },
  {
    "url": "assets/js/app.0db91fba.js",
    "revision": "62102528e3cee15f8010329e4eee9386"
  },
  {
    "url": "big-data/index.html",
    "revision": "847bb94126a5988f0e8901cc245fb39b"
  },
  {
    "url": "c/index.html",
    "revision": "1c6a430616efef2f9975f2f7343a316e"
  },
  {
    "url": "c/常量、变量与数据类型.html",
    "revision": "3c61d495a384a2f52b4c21671025db4b"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "58c5a60fe4bdf1c1b13fb428315d0122"
  },
  {
    "url": "front-end/index.html",
    "revision": "2f99d2d9be2faf4fc9cbcf5419b49c96"
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
    "url": "img/自动类型转换.png",
    "revision": "2f12d0fde58f56fdd54524ebac04368a"
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
    "revision": "fbb6ba00ba8bfd9d4788e41fed022b00"
  },
  {
    "url": "java/index.html",
    "revision": "b765a82ba8b4b0c41b32a26fa438ccdb"
  },
  {
    "url": "java/应用程序编程接口.html",
    "revision": "e8986ce317233c07230092b419148dcd"
  },
  {
    "url": "java/语法.html",
    "revision": "c6ac133b42e44685c3587ee32b7893f4"
  },
  {
    "url": "java/面向对象.html",
    "revision": "9d27fb1cdf9222dcbb2e34c6258f1e8d"
  },
  {
    "url": "kotlin/index.html",
    "revision": "027aedc8f599ecc547af1d76a143e65f"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "689d352dd2b6427a2dfbb4fa5fa2ffce"
  },
  {
    "url": "software-engineering/软件过程.html",
    "revision": "ecf64f36fa0382184536fb8e315f0de1"
  },
  {
    "url": "spring/index.html",
    "revision": "8266a690634b7ca93c5c44d130aacf4e"
  },
  {
    "url": "tittle-tattle/Computing Machinery and Intelligence By A. M. Turing.html",
    "revision": "e006aea6c22a4332fdb81b130c420811"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "ea0380b664d088cbaa74dc1a506c5452"
  },
  {
    "url": "tittle-tattle/关于Java编程部分的文章.html",
    "revision": "93878fa7f15c88dc0dfdb78681bfd95f"
  },
  {
    "url": "tittle-tattle/新年快乐！.html",
    "revision": "f52d95af035af29af10a6a195a5a3d4e"
  },
  {
    "url": "web/index.html",
    "revision": "6eb158cb09e789924d548850915a1321"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
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
