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
    "revision": "86c187cd0c27e5b45fc00b7ff42f3812"
  },
  {
    "url": "about/index.html",
    "revision": "04de4940e8ded221aa330ee0cf049ae2"
  },
  {
    "url": "assets/css/0.styles.f6e8343e.css",
    "revision": "7c7016b4a7f409894224d3f956485475"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.201dd648.js",
    "revision": "9b769b8ebf1a6fd30d93b7818076096f"
  },
  {
    "url": "assets/js/11.3ac07926.js",
    "revision": "7d003cce93b1c70140c72b385e763f0a"
  },
  {
    "url": "assets/js/12.6a8e6b82.js",
    "revision": "e5a131d0c45b0320b7deb80d3f8e7102"
  },
  {
    "url": "assets/js/13.c6f05007.js",
    "revision": "757ea45d72402310d145fb6d2c4959c5"
  },
  {
    "url": "assets/js/14.75ce7183.js",
    "revision": "35a901126296ba426fe1e34663132dcb"
  },
  {
    "url": "assets/js/15.581ff89b.js",
    "revision": "f546667e7b55369a013f407d746826f8"
  },
  {
    "url": "assets/js/16.6decd703.js",
    "revision": "389ff1314ec645b0ebd6a4342603a422"
  },
  {
    "url": "assets/js/17.45814742.js",
    "revision": "9c537b3127318eff90422053c8a78a0d"
  },
  {
    "url": "assets/js/18.2351e01f.js",
    "revision": "1e8cba7ff98c723cbd1e805cdaf58fc2"
  },
  {
    "url": "assets/js/19.fba7ce75.js",
    "revision": "4025c041fa9ce7cb02bb185bdd23b7cc"
  },
  {
    "url": "assets/js/2.4edbad44.js",
    "revision": "de11865881a7f076fa0bc633ba35094f"
  },
  {
    "url": "assets/js/20.9028fb74.js",
    "revision": "614e7cb3c05742c3376cb396d9af4a09"
  },
  {
    "url": "assets/js/21.e970ed8a.js",
    "revision": "d08f6181315b00112b0acfd53d6e59c5"
  },
  {
    "url": "assets/js/22.69c4b615.js",
    "revision": "a274d9427433c26df694e9c191026c11"
  },
  {
    "url": "assets/js/23.d0a0269d.js",
    "revision": "a78c73cd6c3d5c3c31f318dd2b82e41c"
  },
  {
    "url": "assets/js/24.d1531090.js",
    "revision": "f1df95970753a8e46df86947a2f905a6"
  },
  {
    "url": "assets/js/25.5da1fab1.js",
    "revision": "2ff468618e1169ea38409cfcd3b1ea82"
  },
  {
    "url": "assets/js/26.c0c326a8.js",
    "revision": "152852824cd5bdb72c85aa96fc94202d"
  },
  {
    "url": "assets/js/27.dcabf9e3.js",
    "revision": "8b00ec04a56201bbc59e8c064af4ba84"
  },
  {
    "url": "assets/js/28.3849a274.js",
    "revision": "0af298ad0f0d4f5b580e74e4f4d2473a"
  },
  {
    "url": "assets/js/29.7c7e4ba6.js",
    "revision": "086e0d05a8aba946d0e87a88c17b458b"
  },
  {
    "url": "assets/js/3.3ed07104.js",
    "revision": "90838b6878fb76ae6fb74f5bedd80dac"
  },
  {
    "url": "assets/js/4.14abb8e8.js",
    "revision": "1bd68d43600d222ac5e459a527fbcd67"
  },
  {
    "url": "assets/js/5.c8401989.js",
    "revision": "1e29b328955555619eef364612737dda"
  },
  {
    "url": "assets/js/6.57de6369.js",
    "revision": "7db67052d4f6f9c3b76d08521b296c67"
  },
  {
    "url": "assets/js/7.eba5f74e.js",
    "revision": "c497dd184efdcf9c8c94f970f65daf52"
  },
  {
    "url": "assets/js/8.00f7c4e8.js",
    "revision": "7068a8ff60a0e4c3ec5e2c55117585f3"
  },
  {
    "url": "assets/js/9.7d6ebfb2.js",
    "revision": "0ba8d50c6b6a7a98aa8669322c749c80"
  },
  {
    "url": "assets/js/app.2b59be21.js",
    "revision": "a1f0449ba65c3f8bc65e65c1bc138672"
  },
  {
    "url": "big-data/index.html",
    "revision": "41f9ae1234800ba5745ecd34a01be9cb"
  },
  {
    "url": "c/index.html",
    "revision": "6371857d9fba6a0b45d50cf9e5991119"
  },
  {
    "url": "c/常量、变量与数据类型.html",
    "revision": "25b8bb8c6ef1066d383392c023bc00c3"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "3dd9114c54e20446066246105e4ada70"
  },
  {
    "url": "front-end/index.html",
    "revision": "154f6b939908de62a432a4dd887e80df"
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
    "revision": "3090d04de03dad45f5d2b19fdf9795dd"
  },
  {
    "url": "java/index.html",
    "revision": "d43e44063c07b8925fa7961cdf831d74"
  },
  {
    "url": "java/应用程序编程接口.html",
    "revision": "1cccacc48dec295e0fdcf7cb6f49b9a2"
  },
  {
    "url": "java/语法.html",
    "revision": "256fd40dc4a39a716be6149e485d8740"
  },
  {
    "url": "java/面向对象.html",
    "revision": "a12c18bd9904994a6425053a2bbc5f53"
  },
  {
    "url": "kotlin/index.html",
    "revision": "e9736633f2dae1fd207671cf64ffcb8b"
  },
  {
    "url": "math/index.html",
    "revision": "cd7ce2a6c96c7dd2e78bb0373a3533d0"
  },
  {
    "url": "math/多元函数微分学.html",
    "revision": "f84d19fd5abcbfb8c97bdf5e42ba14f0"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "c3a840b2491393e7f2cea7917f54077d"
  },
  {
    "url": "software-engineering/软件过程.html",
    "revision": "20b7819ef40770d88292ec0f84eb2ef1"
  },
  {
    "url": "spring/index.html",
    "revision": "288f4c240c3d1be3b22309b3e89721d7"
  },
  {
    "url": "tittle-tattle/Computing Machinery and Intelligence By A. M. Turing.html",
    "revision": "b31e4872ecadbbb81ffc6a151476621a"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "f45916b8eae3af173b6f0cf6871c4fe0"
  },
  {
    "url": "tittle-tattle/关于Java编程部分的文章.html",
    "revision": "888af8169e51c471d6c3b8c6996be1e5"
  },
  {
    "url": "tittle-tattle/学术研究的正确姿势.html",
    "revision": "08347f8510f9b158f440da97a6ed09c6"
  },
  {
    "url": "tittle-tattle/新年快乐！.html",
    "revision": "0b41dcbcedee88b78a985c4d858ef43f"
  },
  {
    "url": "web/index.html",
    "revision": "fb8cb427240947a30b0e3c3e575087c6"
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
