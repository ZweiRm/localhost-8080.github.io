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
    "revision": "096b6826ae57213b887700166f1ea720"
  },
  {
    "url": "about/index.html",
    "revision": "21124510fe4f6eaa98be544549a8d262"
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
    "url": "assets/js/10.59c02cd4.js",
    "revision": "6a87f5a266adc24aced338657dc64105"
  },
  {
    "url": "assets/js/11.38d54b07.js",
    "revision": "dc04443ff260f6e2c487735df5701844"
  },
  {
    "url": "assets/js/12.e2dce902.js",
    "revision": "98c52d8f3ce53d5aab289791c39b6bc3"
  },
  {
    "url": "assets/js/13.ce6695f7.js",
    "revision": "d5a6aab5137cfc21bedef40a595baced"
  },
  {
    "url": "assets/js/14.bf3ddb63.js",
    "revision": "365744e87067bb742846748cc571cc3b"
  },
  {
    "url": "assets/js/15.eb2a74b8.js",
    "revision": "5c9c651c4838d69c7e8c521597f09a4c"
  },
  {
    "url": "assets/js/16.49c05da3.js",
    "revision": "d845be9fb81b5c8db6c1343550ce188a"
  },
  {
    "url": "assets/js/17.1cfc90ef.js",
    "revision": "bf8155a068c5d4fba54bd2d4b7cc4911"
  },
  {
    "url": "assets/js/18.428e73ec.js",
    "revision": "39b169634256b95c44b862f77428eb5d"
  },
  {
    "url": "assets/js/19.d32a1d31.js",
    "revision": "aa185a1947fb56fa1a8df0cce80e42cf"
  },
  {
    "url": "assets/js/2.6461f9e3.js",
    "revision": "87c72668380d02287a43c3c8e24a1d5b"
  },
  {
    "url": "assets/js/20.feb0f433.js",
    "revision": "ac1ba56f81fc0d0621ad3dec6bcec75a"
  },
  {
    "url": "assets/js/21.1ec41e56.js",
    "revision": "6b3b4e1a1f81094c86e5d61412ec33ed"
  },
  {
    "url": "assets/js/22.3fe2d575.js",
    "revision": "78be804751e4f440cd72c7c5d9c0890b"
  },
  {
    "url": "assets/js/23.ca8bf1ab.js",
    "revision": "f7a274c76dcfe0b70a3fb635ac9780a1"
  },
  {
    "url": "assets/js/24.5db8fc93.js",
    "revision": "db64f7ff7e28c614b7861f567ea04155"
  },
  {
    "url": "assets/js/25.492e79ab.js",
    "revision": "1dc556d4c0906b4b60a131f41aa41f94"
  },
  {
    "url": "assets/js/26.df26f6ac.js",
    "revision": "70ba9c9c5b36568f2a8674c38c822184"
  },
  {
    "url": "assets/js/27.8b0f5536.js",
    "revision": "448395a90dbe9bf0a5bb84ee542acb9b"
  },
  {
    "url": "assets/js/28.7036f177.js",
    "revision": "b8fb483b39db2f548d7f34450b365d91"
  },
  {
    "url": "assets/js/29.39f35ede.js",
    "revision": "85b6c7298867245e9d391c3dee59ceb7"
  },
  {
    "url": "assets/js/3.ffc84efa.js",
    "revision": "a6d8e7407e2e405437ebcc35898d4580"
  },
  {
    "url": "assets/js/30.619dbbdb.js",
    "revision": "87c3e969d9127750737b18119cb92d81"
  },
  {
    "url": "assets/js/31.12e135d1.js",
    "revision": "1e6b5de1deb7399ba04372397fb50c9e"
  },
  {
    "url": "assets/js/32.8d99c490.js",
    "revision": "bc642c8168c4e31956b80523ae0e84d3"
  },
  {
    "url": "assets/js/4.f36f78b0.js",
    "revision": "b259203596afd8bf59f7fab70fe09f42"
  },
  {
    "url": "assets/js/5.7af00410.js",
    "revision": "b9eebacf94d3da8378abd4c3949cf7d9"
  },
  {
    "url": "assets/js/6.08b8a347.js",
    "revision": "94fd0bf790ff4f65fb7480dda1b397b4"
  },
  {
    "url": "assets/js/7.2669deb1.js",
    "revision": "7ca37b22949140ce18650781871cfe77"
  },
  {
    "url": "assets/js/8.c0b86336.js",
    "revision": "08bd206f92da12e9654a322ab56866da"
  },
  {
    "url": "assets/js/9.7e1aeeee.js",
    "revision": "b2e735f082f4a41eddd1f74bd555b351"
  },
  {
    "url": "assets/js/app.6aec2dca.js",
    "revision": "0133b9bfe5092328b2aeae1b3eeb96f5"
  },
  {
    "url": "big-data/index.html",
    "revision": "2b36356998777f4c2f1e1d24ee382572"
  },
  {
    "url": "c/index.html",
    "revision": "fe6ff10bcb69486a72c0209759fff24e"
  },
  {
    "url": "c/常量、变量与数据类型.html",
    "revision": "9fd2c6deb11f8f9cbb17e06645319a19"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "7a3d85f788be7f6b071dbb254d521de9"
  },
  {
    "url": "front-end/index.html",
    "revision": "654707129be5f714f04fe30d707c8579"
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
    "revision": "14f8d9bad5525b9085e714e2e6c48f57"
  },
  {
    "url": "java/API-工具类库.html",
    "revision": "cefc8dcb82fe4190480b4985d3ec14e0"
  },
  {
    "url": "java/API-语言基础类库.html",
    "revision": "fcc2daa12df7380b68c0da6dab36a38c"
  },
  {
    "url": "java/API-输入输出类库.html",
    "revision": "6cc20c4310d4bceba3b22cdec9d760be"
  },
  {
    "url": "java/index.html",
    "revision": "c008fafa96783672e013a1974f0b811c"
  },
  {
    "url": "java/应用程序编程接口概述.html",
    "revision": "e3812fda395c54fa685994925a51d9ad"
  },
  {
    "url": "java/语法.html",
    "revision": "97c8c139d4ac0ebec7a0500fe9088a93"
  },
  {
    "url": "java/面向对象.html",
    "revision": "36ce59ed2984cd6f187a1a64f2a88bbc"
  },
  {
    "url": "kotlin/index.html",
    "revision": "21cc212d947e6bded93b6646106dabaa"
  },
  {
    "url": "math/index.html",
    "revision": "de6ab1e19347f1c6e097bd665597e11b"
  },
  {
    "url": "math/多元函数微分学.html",
    "revision": "c5347bf29a4f99cc28db696d16b3ad08"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "7e4d78fb7b9b024eb69fcbdfc2e22da2"
  },
  {
    "url": "software-engineering/软件过程.html",
    "revision": "0186a2ad0518a2b55dd4e116ddddd0be"
  },
  {
    "url": "spring/index.html",
    "revision": "be63d7c0a90193a5080093d936087e16"
  },
  {
    "url": "tittle-tattle/Computing Machinery and Intelligence By A. M. Turing.html",
    "revision": "1f36e147fd8a41de4655ca0408ecd009"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "f0916e984198ce47cceadcc1f66da1af"
  },
  {
    "url": "tittle-tattle/关于Java编程部分的文章.html",
    "revision": "7803bfff0cc73509c697ce6197563c45"
  },
  {
    "url": "tittle-tattle/学术研究的正确姿势.html",
    "revision": "e23e332fcbc97174aea74b0711cd3c5d"
  },
  {
    "url": "tittle-tattle/新年快乐！.html",
    "revision": "94424183a62a28d4491022a9dbea50f9"
  },
  {
    "url": "web/index.html",
    "revision": "22b8e9da3d58606e7878b6771240b143"
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
