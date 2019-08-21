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
    "revision": "b525b96dea61a9dba2e3aa05aa426d52"
  },
  {
    "url": "about/index.html",
    "revision": "2f6e88b21f4cf31f206aee9203694f66"
  },
  {
    "url": "assets/css/0.styles.f96cc392.css",
    "revision": "baaf47e45418925d11f4847bb328b023"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.9adcf299.js",
    "revision": "497dddd508a87787067620c0765da626"
  },
  {
    "url": "assets/js/11.28495165.js",
    "revision": "ee397f97db6b76fa1324868b48e1c1b9"
  },
  {
    "url": "assets/js/12.f25525bd.js",
    "revision": "649549f0cb6ff5659d30f0f19609c772"
  },
  {
    "url": "assets/js/13.491137a6.js",
    "revision": "e67c6a924c9e9ca3d84037d2785a8f87"
  },
  {
    "url": "assets/js/14.4d1905f2.js",
    "revision": "e3625e4491c4d94df88d2819ffaf4116"
  },
  {
    "url": "assets/js/15.865c3750.js",
    "revision": "4dd959cc282c467ad2ecee175aef6cdf"
  },
  {
    "url": "assets/js/16.f5b93332.js",
    "revision": "5155a688d085e01a75a38d956f998f13"
  },
  {
    "url": "assets/js/17.bd2580dd.js",
    "revision": "5c99841315d8a85ceea99b6e9624a811"
  },
  {
    "url": "assets/js/18.348e98a1.js",
    "revision": "def0274dba6a7c63f8239ee51ce7f84e"
  },
  {
    "url": "assets/js/19.07f36766.js",
    "revision": "c8d6e12c1703ef69a240a87c55baadee"
  },
  {
    "url": "assets/js/2.e0b5fd1a.js",
    "revision": "05d9f551719253f128a3ce557879f21f"
  },
  {
    "url": "assets/js/20.168203c6.js",
    "revision": "ea4d056e9a3a4453b5533cfe7dee5d53"
  },
  {
    "url": "assets/js/21.22fe9b1f.js",
    "revision": "1fb80a197d0ea45e8bb26d6b5a821185"
  },
  {
    "url": "assets/js/22.73e36a95.js",
    "revision": "b728ed725153d4cb3719e03b3a93dc8a"
  },
  {
    "url": "assets/js/23.d3667907.js",
    "revision": "cfff84ca0b08aa057f5d1585808e9fa5"
  },
  {
    "url": "assets/js/24.607f3f3d.js",
    "revision": "6477c959da468a6fa244a3c0fe13fae4"
  },
  {
    "url": "assets/js/25.be38d55d.js",
    "revision": "6f2262f769fede571d2554394a98642d"
  },
  {
    "url": "assets/js/26.234e6da8.js",
    "revision": "9d57c881142e173155a30d0dea974b71"
  },
  {
    "url": "assets/js/27.d56da717.js",
    "revision": "3f2b5200d402055601bc51f512132f61"
  },
  {
    "url": "assets/js/28.1a60486e.js",
    "revision": "3f044300a18ff9126a84cd9621610aa1"
  },
  {
    "url": "assets/js/29.69710d1d.js",
    "revision": "e6f367e5800c9decd517a2683a24974e"
  },
  {
    "url": "assets/js/3.9978f7fe.js",
    "revision": "759e49ccc289506e64a91340a9c7bc29"
  },
  {
    "url": "assets/js/4.b89cc21e.js",
    "revision": "12618518e1fe80b392c77e7c5ab2693e"
  },
  {
    "url": "assets/js/5.40df75d9.js",
    "revision": "a33f612b66e50ccc5916b69f14090956"
  },
  {
    "url": "assets/js/6.862b22ed.js",
    "revision": "aebf0e988204583bbfeb77dfcef25427"
  },
  {
    "url": "assets/js/7.c47950d2.js",
    "revision": "4dc95a050f93f99eed8afbd725fa7af8"
  },
  {
    "url": "assets/js/8.407f6e59.js",
    "revision": "0eb8f499b0014e94658e811a9a02999c"
  },
  {
    "url": "assets/js/9.9744d2fc.js",
    "revision": "13f9bbf8cc7ebf2586b2ed948da9c1f1"
  },
  {
    "url": "assets/js/app.bac1f272.js",
    "revision": "8baed503966401cd0b54abf901006e6b"
  },
  {
    "url": "big-data/index.html",
    "revision": "411b7e5c6b29f18cb600036ca044ef45"
  },
  {
    "url": "c/index.html",
    "revision": "c5b50059b704f85bc5401104243bc22d"
  },
  {
    "url": "c/常量、变量与数据类型.html",
    "revision": "6ae540eb2c87a0b530e0125704ad21a4"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "07d1057c759e7d837729ed24829f9bf0"
  },
  {
    "url": "front-end/index.html",
    "revision": "0a66bdfa247d99fc51129ee5f1c4a0af"
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
    "url": "img/文章被拒过程分析.png",
    "revision": "93a0f89798a24095caa63ae1163ed024"
  },
  {
    "url": "img/棋盘法.png",
    "revision": "3510ab577c8babbf75ba42fc502b1b6e"
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
    "revision": "cb7468b5190f1064810152186e24caa2"
  },
  {
    "url": "java/index.html",
    "revision": "2af5f943dda0c9139984ceb31ee38895"
  },
  {
    "url": "java/应用程序编程接口.html",
    "revision": "355e532b3342624bb0899a45fcec6328"
  },
  {
    "url": "java/语法.html",
    "revision": "e1a01928fbecbf37408cdcc525f34d3d"
  },
  {
    "url": "java/面向对象.html",
    "revision": "e178099ac359d32b3df7a691b80883a3"
  },
  {
    "url": "kotlin/index.html",
    "revision": "96801a49d005c19154f9829143a1ba58"
  },
  {
    "url": "math/index.html",
    "revision": "585388f0bbc3ddf05c4ff8b1ea83526e"
  },
  {
    "url": "math/多元函数微分学.html",
    "revision": "5cb3b207224bf7feae0bdb8a557e9822"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "f1d67f0de0990779e7fc7f629d3c27db"
  },
  {
    "url": "software-engineering/软件过程.html",
    "revision": "5bb5bc4a6478e543a19c76218d5deacc"
  },
  {
    "url": "spring/index.html",
    "revision": "30e17609f2c9d49b09f15e42161e19af"
  },
  {
    "url": "tittle-tattle/Computing Machinery and Intelligence By A. M. Turing.html",
    "revision": "9ed30c821f154a6095f99cadfa3f0e41"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "f334cfa479b160cad491dca1f6ba105f"
  },
  {
    "url": "tittle-tattle/关于Java编程部分的文章.html",
    "revision": "f8ca3f2c5ea64db20e036e55d089d680"
  },
  {
    "url": "tittle-tattle/学术研究的正确姿势.html",
    "revision": "0dbda73eebd8f0afe61df2819c0296ff"
  },
  {
    "url": "tittle-tattle/新年快乐！.html",
    "revision": "4d823ec9041b1584b3c71853c282eba4"
  },
  {
    "url": "web/index.html",
    "revision": "d34bb32808db2c1e7a4c5487341ed0ae"
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
