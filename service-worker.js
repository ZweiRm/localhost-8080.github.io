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
    "revision": "a17805c52876119bddf9a834bad85e37"
  },
  {
    "url": "about/index.html",
    "revision": "dafc2ea06d9b73fc4d323fb32b2fa147"
  },
  {
    "url": "assets/css/0.styles.0d19fd84.css",
    "revision": "9bb6b9f88c684f84f2eb3ace755e382e"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.6100b167.js",
    "revision": "e1190598ee4c0b16198bfc5b03327926"
  },
  {
    "url": "assets/js/11.ea3c6e9c.js",
    "revision": "ddbdaa63e948770cce504cc4f3e3674b"
  },
  {
    "url": "assets/js/12.6f7aa0ab.js",
    "revision": "11e6588e5610aeedc06de33ef5e9e3a6"
  },
  {
    "url": "assets/js/13.e72e195c.js",
    "revision": "5e2cf5383c226571926df678088d5b69"
  },
  {
    "url": "assets/js/14.1e52e008.js",
    "revision": "f9196b1dd2b2c2cb8735d0479a2e0329"
  },
  {
    "url": "assets/js/15.0977500d.js",
    "revision": "4ff84aed44b0099ee667aa4b3596d2a1"
  },
  {
    "url": "assets/js/16.52af11c6.js",
    "revision": "cb66577cf8ba2d8de6d9ea1b762feb14"
  },
  {
    "url": "assets/js/17.e28f49e3.js",
    "revision": "30597d78973f046ac5ad67adc3c474da"
  },
  {
    "url": "assets/js/18.b8f463c7.js",
    "revision": "2c6236055ebaa9e821c8295a6882be12"
  },
  {
    "url": "assets/js/19.32649514.js",
    "revision": "56478f37d0e677d9be01ffe286b32e91"
  },
  {
    "url": "assets/js/2.41b8775c.js",
    "revision": "345b34d6489666601ffb0d2d210a0f1a"
  },
  {
    "url": "assets/js/20.f8101da3.js",
    "revision": "51c3fe6b7291eddb786572a7c18d3bbf"
  },
  {
    "url": "assets/js/3.e4fe2b0b.js",
    "revision": "ef2369f1605005db2b479bb39da61a34"
  },
  {
    "url": "assets/js/4.212a7d76.js",
    "revision": "d97af8ba01f09ab9b7560977738635ce"
  },
  {
    "url": "assets/js/5.eaf96e58.js",
    "revision": "dadbb83fb2a45a4be7beddbb7e2b1175"
  },
  {
    "url": "assets/js/6.6b963318.js",
    "revision": "b2d4393b3f9e2ec6768da61544575aa8"
  },
  {
    "url": "assets/js/7.8765ece5.js",
    "revision": "f864540633df7e7683d1816173818ba3"
  },
  {
    "url": "assets/js/8.ad2d3c35.js",
    "revision": "b5e82a9276768df5daea37ecf39443d7"
  },
  {
    "url": "assets/js/9.d49af66b.js",
    "revision": "2d764264510cf4d0282231c7e863f672"
  },
  {
    "url": "assets/js/app.17c9fa19.js",
    "revision": "502cc132c578859b342c3a7b5c645796"
  },
  {
    "url": "bigData/index.html",
    "revision": "5a25b4cf939a29367ab298e90a09ec37"
  },
  {
    "url": "deepLearning/index.html",
    "revision": "145b4d722df8c3adfa2bb8c6d9f1bf04"
  },
  {
    "url": "frontEnd/index.html",
    "revision": "ea4e2ad45d64753693a06c6cd6099dad"
  },
  {
    "url": "img/ahza-white.png",
    "revision": "3c642eba43abc55fb6555dab8d743fcd"
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
    "revision": "bcd0c5adfea3260c14a53b4100fce2f7"
  },
  {
    "url": "java/index.html",
    "revision": "107c55e1991f2197358bce7df0e9e44c"
  },
  {
    "url": "java/应用程序编程接口.html",
    "revision": "ae4355c3a20c2f13537ff6e7f084483b"
  },
  {
    "url": "java/语法.html",
    "revision": "6892323f5d1481181349e7c101d17e33"
  },
  {
    "url": "java/面向对象.html",
    "revision": "eb020d28d71c179a6f70fab97f16f64c"
  },
  {
    "url": "kotlin/index.html",
    "revision": "e54892a3e517cc152e80a14396ac483f"
  },
  {
    "url": "softwareEngineering/index.html",
    "revision": "012e89e5ab1ee756951934ebd34ad968"
  },
  {
    "url": "spring/index.html",
    "revision": "dfb5bfb71c0e064d81507415aa545d3d"
  },
  {
    "url": "tittle-tattle/Computing Machinery and Intelligence By A. M. Turing.html",
    "revision": "11afa324016c0d19dd307f7b2bdc84c2"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "9c2981a5cdd6e60677c83a5ecf93d719"
  },
  {
    "url": "tittle-tattle/关于Java编程部分的文章.html",
    "revision": "44f672127c6623dcbedf8c766d16b256"
  },
  {
    "url": "tittle-tattle/新年快乐！.html",
    "revision": "214fd0f99e025b75f551b80698d14657"
  },
  {
    "url": "web/index.html",
    "revision": "1f41ccfb79b4864cc2e8132c0f06e98f"
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
