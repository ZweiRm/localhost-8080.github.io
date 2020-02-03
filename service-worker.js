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
    "revision": "269c9cfe397f9985aa9f40890e3550a9"
  },
  {
    "url": "about/index.html",
    "revision": "9b400a510e7a9ecf19044dab2e4e3150"
  },
  {
    "url": "assets/css/0.styles.9d50b4f4.css",
    "revision": "e148952ace6862d6140177986cff1788"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.4c2d03b6.js",
    "revision": "95d3c297a9bf43af5e098361da71edf2"
  },
  {
    "url": "assets/js/11.201f9008.js",
    "revision": "23c4f0f4c0cfdc0cce8489d2041f8e9a"
  },
  {
    "url": "assets/js/12.e88f28a9.js",
    "revision": "a0c2593ff7aa9796acb9489f4823681f"
  },
  {
    "url": "assets/js/13.1166f8c5.js",
    "revision": "9c00321543f32fe0911d1ca082ce488c"
  },
  {
    "url": "assets/js/14.a33d94a4.js",
    "revision": "7ab6bada9f4bd55f8d3473a931358bd5"
  },
  {
    "url": "assets/js/15.2f184d00.js",
    "revision": "dfaaa7f54fc64d960825c368733776b8"
  },
  {
    "url": "assets/js/16.1ae9cae2.js",
    "revision": "28273f7d2f2c577e2a70de754ba9ed2c"
  },
  {
    "url": "assets/js/17.86aaa3a9.js",
    "revision": "50ba634cb41db240f2a2d0b4ac721e63"
  },
  {
    "url": "assets/js/18.a9b13b3a.js",
    "revision": "63b1d6ec96ac48a03895c41ce3205171"
  },
  {
    "url": "assets/js/19.a5506041.js",
    "revision": "8f93b472d522e7885fcb8f5a17876cae"
  },
  {
    "url": "assets/js/2.26035483.js",
    "revision": "6a4f303e66a1e33a66e0fe1ab787a9b2"
  },
  {
    "url": "assets/js/20.2f360665.js",
    "revision": "ed1e7e829b0d64e3fec0ae1fd2aaea8f"
  },
  {
    "url": "assets/js/21.e6a99df5.js",
    "revision": "b02e4d774f28bc3f818f770102847a8a"
  },
  {
    "url": "assets/js/22.bb76ac92.js",
    "revision": "2cd326bcd6d3bb1695276ab79db295be"
  },
  {
    "url": "assets/js/23.0644ec26.js",
    "revision": "29731a9b949f0940ec798e05e898b51e"
  },
  {
    "url": "assets/js/24.25a6b007.js",
    "revision": "730a364d5069d1047844f51865755cef"
  },
  {
    "url": "assets/js/25.a53d86c1.js",
    "revision": "faa8a80d9495d8f6145d1b5f5bd03180"
  },
  {
    "url": "assets/js/26.a202ad4b.js",
    "revision": "69e9d082d68f18492ef44d5e4ac94fb7"
  },
  {
    "url": "assets/js/27.2806a453.js",
    "revision": "5fa004983703594c77666f3cec0fbf72"
  },
  {
    "url": "assets/js/28.53a460dc.js",
    "revision": "ed217eb8acfaed1b0dfaa86649a21a63"
  },
  {
    "url": "assets/js/29.1e10bb0d.js",
    "revision": "8362ce8005c08ffbda2b566ffeca1d5b"
  },
  {
    "url": "assets/js/3.1e75c58d.js",
    "revision": "392339d24ee50add4b634a95129d53c7"
  },
  {
    "url": "assets/js/30.037f0143.js",
    "revision": "d194e203eae0e81a7f8cdd54f22fc8b6"
  },
  {
    "url": "assets/js/31.53e1c2c5.js",
    "revision": "5d354c5dfc67bdd29f4b8c4d5dab05f2"
  },
  {
    "url": "assets/js/4.ea5c5ea3.js",
    "revision": "40fe2cabaa60912d0ce0dfff1b8bd04a"
  },
  {
    "url": "assets/js/5.15b13fd7.js",
    "revision": "4bf26d7e82894b2afe56682dd89783f3"
  },
  {
    "url": "assets/js/6.2811bf05.js",
    "revision": "49642ac802cdac9960580f999f65b13f"
  },
  {
    "url": "assets/js/7.eb74044e.js",
    "revision": "d0b7d03ef56c3530795519202443a386"
  },
  {
    "url": "assets/js/8.a012fb81.js",
    "revision": "6deb3382eab9f8eca28f459837162d86"
  },
  {
    "url": "assets/js/9.f05fa50a.js",
    "revision": "b28da0af4d8ae0c2ac375e83b518eee0"
  },
  {
    "url": "assets/js/app.7cf86cd9.js",
    "revision": "ed1032c07358332b941593de66c25fa9"
  },
  {
    "url": "big-data/index.html",
    "revision": "cfc5859804d6750627835d196a24505b"
  },
  {
    "url": "c/index.html",
    "revision": "e4c54eeb9ebb3449ffd11c9c0baf599d"
  },
  {
    "url": "c/常量、变量与数据类型.html",
    "revision": "873804a8baa5e40a16fc8b8739be8fbc"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "a287cbf59586990a45f9bd1fd85c20b3"
  },
  {
    "url": "front-end/index.html",
    "revision": "528b976937d8a9e444748f5495ed784c"
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
    "revision": "a59bb3983e8af44d5a9fedfb2887ee51"
  },
  {
    "url": "java/API-工具类库.html",
    "revision": "4a33161d15f1286283579583060e6a5c"
  },
  {
    "url": "java/API-语言基础类库.html",
    "revision": "0cb14a4de86c4fa83d5521a6755c098b"
  },
  {
    "url": "java/index.html",
    "revision": "7fdc51a239b5fad92cf82788c22d942a"
  },
  {
    "url": "java/应用程序编程接口概述.html",
    "revision": "50ac66677bd725e2c20e337c732128bf"
  },
  {
    "url": "java/语法.html",
    "revision": "a4d10ad9a080cdc0500c586747ca4a1c"
  },
  {
    "url": "java/面向对象.html",
    "revision": "5e84b856287643e48b031dda4b2c626e"
  },
  {
    "url": "kotlin/index.html",
    "revision": "e86f1813f6065e2efe3a6ff2c6e6ceca"
  },
  {
    "url": "math/index.html",
    "revision": "9651b07a5505b85f3d9ed8d76fef4b5c"
  },
  {
    "url": "math/多元函数微分学.html",
    "revision": "af4ab944dbcfe31d6ef8d5bab29847c4"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "b7384f50b6564b537ff6ed8a6fce4469"
  },
  {
    "url": "software-engineering/软件过程.html",
    "revision": "a5f5593ec3ce12e7ff3b016ca8a670e1"
  },
  {
    "url": "spring/index.html",
    "revision": "8f288a7f888a846486bd5efed50a85c2"
  },
  {
    "url": "tittle-tattle/Computing Machinery and Intelligence By A. M. Turing.html",
    "revision": "2d4a658f30c997706f0ff49c8d875e9e"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "1257cd9ccc8901646106142a138cbe1a"
  },
  {
    "url": "tittle-tattle/关于Java编程部分的文章.html",
    "revision": "be15d6c5d08648262bef5c41a3293666"
  },
  {
    "url": "tittle-tattle/学术研究的正确姿势.html",
    "revision": "d9daef33e9450551b1f4a707051be67c"
  },
  {
    "url": "tittle-tattle/新年快乐！.html",
    "revision": "b676367138ca11ecaf529a809e82f39f"
  },
  {
    "url": "web/index.html",
    "revision": "46c89d027522ce2b92f39b30b175aae8"
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
