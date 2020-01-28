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
    "revision": "9c0e8673496f2dea152462960d81e564"
  },
  {
    "url": "about/index.html",
    "revision": "7e6cebf84d3fec5cd0a11793c0c95960"
  },
  {
    "url": "assets/css/0.styles.3227a1f7.css",
    "revision": "7c7016b4a7f409894224d3f956485475"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.f5a6a26d.js",
    "revision": "9b769b8ebf1a6fd30d93b7818076096f"
  },
  {
    "url": "assets/js/11.1aa6a55b.js",
    "revision": "febd10ebc574a03070f4312589d4ca14"
  },
  {
    "url": "assets/js/12.1c51d5af.js",
    "revision": "3d24692827534777abe4793d8bf2c857"
  },
  {
    "url": "assets/js/13.ca3b9d11.js",
    "revision": "2d032da226eedb93b9f56fa3f829b567"
  },
  {
    "url": "assets/js/14.47d1d54b.js",
    "revision": "7ab6bada9f4bd55f8d3473a931358bd5"
  },
  {
    "url": "assets/js/15.c8a4bced.js",
    "revision": "442f5e1e85b29cd92ce95f697af7ef6a"
  },
  {
    "url": "assets/js/16.b7d2790a.js",
    "revision": "92eb98a9ad52797166a0c9b0ac7a1f32"
  },
  {
    "url": "assets/js/17.9360b8e2.js",
    "revision": "f7596d9384d4a3871ef95527e143fdf1"
  },
  {
    "url": "assets/js/18.65f05401.js",
    "revision": "4ec769316906d9bcf4d6f42a46bdaef2"
  },
  {
    "url": "assets/js/19.0ebbe057.js",
    "revision": "3e1b1a3f7d58b9e515c69da675094e22"
  },
  {
    "url": "assets/js/2.4416e7e4.js",
    "revision": "7c0e430ac07c077cc46e67d0b4ce2175"
  },
  {
    "url": "assets/js/20.cc9bdce6.js",
    "revision": "398fdd744cf23474a7ea8272f80daf8a"
  },
  {
    "url": "assets/js/21.c543eca6.js",
    "revision": "feb2483c486bd41cc7658d907467bc1a"
  },
  {
    "url": "assets/js/22.220d24cc.js",
    "revision": "04c41357718dfd26a410dc830f92f8f5"
  },
  {
    "url": "assets/js/23.c926b19a.js",
    "revision": "99606046fa31afbd4909fd9da52fa85c"
  },
  {
    "url": "assets/js/24.5c59f61a.js",
    "revision": "7acd47072e1ddb4666dd62a3ea160d85"
  },
  {
    "url": "assets/js/25.dae1c915.js",
    "revision": "faa8a80d9495d8f6145d1b5f5bd03180"
  },
  {
    "url": "assets/js/26.e07a8223.js",
    "revision": "24d07d5cf18f510d53dfeb0cb869b6ea"
  },
  {
    "url": "assets/js/27.981ecbbb.js",
    "revision": "8d41f131c80c46e31fa09c2031d7d1af"
  },
  {
    "url": "assets/js/28.9fd8ef30.js",
    "revision": "ed217eb8acfaed1b0dfaa86649a21a63"
  },
  {
    "url": "assets/js/29.5ececf37.js",
    "revision": "8362ce8005c08ffbda2b566ffeca1d5b"
  },
  {
    "url": "assets/js/3.1a7a9be5.js",
    "revision": "65527718794d7b927fe2672fea470f9f"
  },
  {
    "url": "assets/js/30.fed8102a.js",
    "revision": "62dd4c6b75b5d674f91c3a8abc3b88c1"
  },
  {
    "url": "assets/js/31.53e1c2c5.js",
    "revision": "5d354c5dfc67bdd29f4b8c4d5dab05f2"
  },
  {
    "url": "assets/js/4.6a870eb1.js",
    "revision": "b0301c4732a3c0ee9c6870781de20745"
  },
  {
    "url": "assets/js/5.18ece291.js",
    "revision": "1e29b328955555619eef364612737dda"
  },
  {
    "url": "assets/js/6.3e716ed1.js",
    "revision": "1243a1ccbce721f0906ab8d0ee7d8268"
  },
  {
    "url": "assets/js/7.130b09a9.js",
    "revision": "4840ecfe4b807ce1f797c7737567876a"
  },
  {
    "url": "assets/js/8.ed5933d6.js",
    "revision": "6deb3382eab9f8eca28f459837162d86"
  },
  {
    "url": "assets/js/9.2f32420d.js",
    "revision": "c3a4f1047b175654f2d8e5395773eb39"
  },
  {
    "url": "assets/js/app.eb21489c.js",
    "revision": "936e7419f1ca2080a12b1d5b3a177031"
  },
  {
    "url": "big-data/index.html",
    "revision": "52699713e4b66fa0aae2bda3631e3816"
  },
  {
    "url": "c/index.html",
    "revision": "b8570c76de1ee7c44c676b2f1df347ac"
  },
  {
    "url": "c/常量、变量与数据类型.html",
    "revision": "669b276533aa97fd2cc096759ea41b5a"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "fc859ab9e70c8aaf13a42ad52171f956"
  },
  {
    "url": "front-end/index.html",
    "revision": "edc0112a5abe86be2cd46fcef8cf0732"
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
    "revision": "f2a7a94e045c3dd6abd57bf3588024b1"
  },
  {
    "url": "java/API-工具类库.html",
    "revision": "1dea76c421ea0c1af408117571a7dab9"
  },
  {
    "url": "java/API-语言基础类库.html",
    "revision": "7054cd888c4db420f102a4fddd933442"
  },
  {
    "url": "java/index.html",
    "revision": "5445bffb06e00fde85fe3445c2153b61"
  },
  {
    "url": "java/应用程序编程接口概述.html",
    "revision": "c89068e34c23d477be55b5f02313d0d0"
  },
  {
    "url": "java/语法.html",
    "revision": "ac8d5c96978a3b4b5b1a8bd625a1c261"
  },
  {
    "url": "java/面向对象.html",
    "revision": "fe1669815937b57060c888ba04275303"
  },
  {
    "url": "kotlin/index.html",
    "revision": "6836ac74e354b1888245f19235e1aa1c"
  },
  {
    "url": "math/index.html",
    "revision": "fcf01ad1c04e7e6b01a51be585ebb762"
  },
  {
    "url": "math/多元函数微分学.html",
    "revision": "7659438f362eae24ad9c405dcec650d6"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "983fda6efd348ef7f376b7b67f295bcb"
  },
  {
    "url": "software-engineering/软件过程.html",
    "revision": "0350300d22178bb4e91e53e2a21aded9"
  },
  {
    "url": "spring/index.html",
    "revision": "66ab342186a5c77504286811f08ace1e"
  },
  {
    "url": "tittle-tattle/Computing Machinery and Intelligence By A. M. Turing.html",
    "revision": "f9abcdb10416afc86a867ab3181d68b7"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "624c4b41c42c5f8608befc8f8e738e6a"
  },
  {
    "url": "tittle-tattle/关于Java编程部分的文章.html",
    "revision": "b3bdcc016c084257fc2dd0ee051ed6c3"
  },
  {
    "url": "tittle-tattle/学术研究的正确姿势.html",
    "revision": "bf80988e5ce460ed964f9ac715fe2659"
  },
  {
    "url": "tittle-tattle/新年快乐！.html",
    "revision": "51926ab0a0763361127643f02b79307d"
  },
  {
    "url": "web/index.html",
    "revision": "fa533261b018a95f910c2d4781267121"
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
