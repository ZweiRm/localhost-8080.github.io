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
    "revision": "9ac077c3405e3c4b2cbeb306cf87b515"
  },
  {
    "url": "about/index.html",
    "revision": "c165bdd1ed2e39e425fdc6ec6e2d09ce"
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
    "url": "assets/js/10.97fc5786.js",
    "revision": "8f43262fca0bb5aff76cebd322e2330e"
  },
  {
    "url": "assets/js/11.38d54b07.js",
    "revision": "dc04443ff260f6e2c487735df5701844"
  },
  {
    "url": "assets/js/12.f2cdc0ab.js",
    "revision": "ffb514728f2b6f1f22806b094e702249"
  },
  {
    "url": "assets/js/13.bbba8897.js",
    "revision": "e480a8f8f8c4c9d263994cb5493d56f0"
  },
  {
    "url": "assets/js/14.2d87bd58.js",
    "revision": "62002e262e377d92786ce56b152e40d9"
  },
  {
    "url": "assets/js/15.9ebdd395.js",
    "revision": "34d47c568e8b36f389edc8386b31f693"
  },
  {
    "url": "assets/js/16.bca084dd.js",
    "revision": "796efd6a7c0a06d64667ae66debb93f8"
  },
  {
    "url": "assets/js/17.961dfd2f.js",
    "revision": "9ab10536d33b6b97262b9bc04f458f15"
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
    "url": "assets/js/21.4d3c49e7.js",
    "revision": "be87f27135fdc5bfd69b35bd4bc78c21"
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
    "url": "assets/js/25.f7b39f8d.js",
    "revision": "94d6d12a230fd3bd9f5bf049751ccb0c"
  },
  {
    "url": "assets/js/26.ef40021c.js",
    "revision": "de609f427a792f8fc51f9d26843d5a68"
  },
  {
    "url": "assets/js/27.8b0f5536.js",
    "revision": "448395a90dbe9bf0a5bb84ee542acb9b"
  },
  {
    "url": "assets/js/28.8821f33e.js",
    "revision": "692574703b23542bc308bc9e5d482699"
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
    "url": "assets/js/30.c3c2b63d.js",
    "revision": "a27ea59a44d4cf7f4c3744e557856811"
  },
  {
    "url": "assets/js/31.c2ecf8ce.js",
    "revision": "b07699453322d4726a6469b82a91f14a"
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
    "url": "assets/js/7.adf9f909.js",
    "revision": "7171e6ef8a69f339bb697423c5af0c11"
  },
  {
    "url": "assets/js/8.3bf99868.js",
    "revision": "e314b10df3d07438d734033cb4fa3084"
  },
  {
    "url": "assets/js/9.7e1aeeee.js",
    "revision": "b2e735f082f4a41eddd1f74bd555b351"
  },
  {
    "url": "assets/js/app.9f88feee.js",
    "revision": "eb09c4e5d725b88f9d09224dd63723ce"
  },
  {
    "url": "big-data/index.html",
    "revision": "730f7c5e64784b77623ad0a5b1ee35e1"
  },
  {
    "url": "c/index.html",
    "revision": "cdd8795f47bf48491e01b5349f8d728d"
  },
  {
    "url": "c/常量、变量与数据类型.html",
    "revision": "b9b67ec7dd6e9844d68c7d8515724804"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "d512b5c395fa6da551102dfaa59bfe83"
  },
  {
    "url": "front-end/index.html",
    "revision": "a25e818477d7c3d558f9e515a60310d8"
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
    "revision": "7c4c3443b3baef3f3dbfa24c79c2354c"
  },
  {
    "url": "java/API-工具类库.html",
    "revision": "a0e7373c12f2b1bc7bdc818be2c57895"
  },
  {
    "url": "java/API-语言基础类库.html",
    "revision": "d472ce125c7fa0240688caed44e7ba7d"
  },
  {
    "url": "java/API-输入输出类库.html",
    "revision": "d135a9c290a397e2b4f705d6c63ed9f2"
  },
  {
    "url": "java/index.html",
    "revision": "c618894bf061fd1613609d23e9f478f9"
  },
  {
    "url": "java/应用程序编程接口概述.html",
    "revision": "1fbb41886f353ed153838e3fc36ba0b4"
  },
  {
    "url": "java/语法.html",
    "revision": "f202d724441ba1a7b1163d4421cc4912"
  },
  {
    "url": "java/面向对象.html",
    "revision": "ae4da80aec3909a83c27841b3da06a97"
  },
  {
    "url": "kotlin/index.html",
    "revision": "ff978fa8ed7387eacdadcd3c70f3da70"
  },
  {
    "url": "math/index.html",
    "revision": "0e453521f75b0ede58eeae25abeba1ec"
  },
  {
    "url": "math/多元函数微分学.html",
    "revision": "5d27a8ecf1167a121e1b60f0d48a9a05"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "5980f8a54fdb8c2145ab243c11cd0156"
  },
  {
    "url": "software-engineering/软件过程.html",
    "revision": "8175f3e220141967e0f207e7b7ca0463"
  },
  {
    "url": "spring/index.html",
    "revision": "94fb6f32731da091493f6eb1a14d37d2"
  },
  {
    "url": "tittle-tattle/Computing Machinery and Intelligence By A. M. Turing.html",
    "revision": "93b97228e8a6d7b0003ed295cd4f652e"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "bc8de7c00d459646980645e8dabaaa5c"
  },
  {
    "url": "tittle-tattle/关于Java编程部分的文章.html",
    "revision": "acfb4ff3ec3ac61aefc952fab96d98ec"
  },
  {
    "url": "tittle-tattle/学术研究的正确姿势.html",
    "revision": "4fa06fbcba5528c2002832afac87ed8f"
  },
  {
    "url": "tittle-tattle/新年快乐！.html",
    "revision": "ae94116af74ebc9774a0af0fb980f10b"
  },
  {
    "url": "web/index.html",
    "revision": "ec4a71579a3bcd810a6561e0e9afe9f2"
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
