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
    "revision": "73062e350bdc706ea2c992b84a816b25"
  },
  {
    "url": "about/index.html",
    "revision": "0e2848f432eb14c7c74800035b56753a"
  },
  {
    "url": "assets/css/0.styles.62892d27.css",
    "revision": "ee9af82d61e74d54a4f37f47b2041a94"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.4b667d6a.js",
    "revision": "09742476408584ecf54384b0b59b9b03"
  },
  {
    "url": "assets/js/11.f4e3a472.js",
    "revision": "89e5eeb8af63c30f7571a5350b863085"
  },
  {
    "url": "assets/js/12.42441efc.js",
    "revision": "193c41d96f1192581feea3e5b23787cb"
  },
  {
    "url": "assets/js/13.dd63e5fd.js",
    "revision": "24b0cf657ef27f8a441ee60aa06f3d4e"
  },
  {
    "url": "assets/js/14.6fb45276.js",
    "revision": "b0bf6c0ebf30ed0449dcc417619e9e7a"
  },
  {
    "url": "assets/js/15.7d7eb5fb.js",
    "revision": "67c648091c84448549902c906ecf23f6"
  },
  {
    "url": "assets/js/16.71520c10.js",
    "revision": "51f255ed5387da5f1302043cc809cb79"
  },
  {
    "url": "assets/js/17.bbd8fd53.js",
    "revision": "28deb26657aae9e61e03d7beca662a88"
  },
  {
    "url": "assets/js/18.18bca579.js",
    "revision": "bf7263754a9a3d9000cf6321e99648c1"
  },
  {
    "url": "assets/js/19.0154e1d5.js",
    "revision": "942ac4c3d61d3c32f8f9cfe33ba49cd2"
  },
  {
    "url": "assets/js/2.476d463f.js",
    "revision": "200b953f54917daaab73b1e641ce5b59"
  },
  {
    "url": "assets/js/20.9b0bf4a3.js",
    "revision": "62205aaecdb025e968fc863b25dca072"
  },
  {
    "url": "assets/js/21.3621e74e.js",
    "revision": "a2dd6711b4cfb7277c50451d56897a07"
  },
  {
    "url": "assets/js/22.3fe2d575.js",
    "revision": "78be804751e4f440cd72c7c5d9c0890b"
  },
  {
    "url": "assets/js/23.ade75fc6.js",
    "revision": "bb1dc6b8764fbd8a7ccfe818db915f0e"
  },
  {
    "url": "assets/js/24.697edba3.js",
    "revision": "b20ef6b202e1ca46b2a0cca40eb1f9a3"
  },
  {
    "url": "assets/js/25.cde49c0f.js",
    "revision": "d031b605e9523543abc022de12f6f467"
  },
  {
    "url": "assets/js/26.2f3ab533.js",
    "revision": "6216c7c2cb7af65282032f45fe3ca28e"
  },
  {
    "url": "assets/js/27.b6a4be19.js",
    "revision": "bafc5aecaf5e18d41c1a19ff963f106b"
  },
  {
    "url": "assets/js/28.1d0eb6b2.js",
    "revision": "473c22076402a0ce97d0ce0e76a0d117"
  },
  {
    "url": "assets/js/29.ca26ba96.js",
    "revision": "e4bc4d279ca9e584a1caa38f0a1f8504"
  },
  {
    "url": "assets/js/3.343162a5.js",
    "revision": "62f17c742ed85a3b9d39cadfc5a668f9"
  },
  {
    "url": "assets/js/30.a20253ea.js",
    "revision": "c28278014841ff946d3d011fe423650a"
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
    "url": "assets/js/4.bed6244b.js",
    "revision": "c1c09c7dd3666693cfcd949dcaeb8d95"
  },
  {
    "url": "assets/js/5.095b0e20.js",
    "revision": "50a8bb7a9e49ded37133bd7eac365995"
  },
  {
    "url": "assets/js/6.1d612fec.js",
    "revision": "ce1cda7c35b8db0f25a91dab45127a17"
  },
  {
    "url": "assets/js/7.7d86fae6.js",
    "revision": "5f5195b42213d8023b51a08fed8dcb2d"
  },
  {
    "url": "assets/js/8.997a164b.js",
    "revision": "599ce465e7c3cdb6ac3b6886d1c8a4ca"
  },
  {
    "url": "assets/js/9.680b0c39.js",
    "revision": "f122eacb2416636fd370b3379a78e4ca"
  },
  {
    "url": "assets/js/app.7d4a30e4.js",
    "revision": "97916014249b21c4453e96ce15c287a2"
  },
  {
    "url": "big-data/index.html",
    "revision": "d3154671b77d0306de1740f58c7b9024"
  },
  {
    "url": "c/index.html",
    "revision": "0892e3b957f1e14907a9b10bfe5db08b"
  },
  {
    "url": "c/常量、变量与数据类型.html",
    "revision": "95e2a6b10b43ef0bb5d4cf2a21aa63b0"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "db852a213b746d0e2a00cf6fc02b449b"
  },
  {
    "url": "front-end/index.html",
    "revision": "de093b2f19e0b7c9c5b16c787591fe48"
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
    "revision": "8c19eecb01897f2317ea7ee2849779d5"
  },
  {
    "url": "java/API-工具类库.html",
    "revision": "592aaa9d417c196a16659e0cd192f6d3"
  },
  {
    "url": "java/API-语言基础类库.html",
    "revision": "5c055fec2797552164ceea77d1db7f37"
  },
  {
    "url": "java/API-输入输出类库.html",
    "revision": "8b85f7033044ebfaec3a55d6630aab6c"
  },
  {
    "url": "java/index.html",
    "revision": "728c67dfe5c418edddb1b6d2d57c0062"
  },
  {
    "url": "java/应用程序编程接口概述.html",
    "revision": "e59e51341dce26484e54798647a9d52d"
  },
  {
    "url": "java/语法.html",
    "revision": "407979bb8be40ec4f9f422bc0e5ad720"
  },
  {
    "url": "java/面向对象.html",
    "revision": "e30c90cd350efbb94d0db0939f17c6fa"
  },
  {
    "url": "kotlin/index.html",
    "revision": "b8d01ef232e18cad6a44272f2eb5b3dc"
  },
  {
    "url": "math/index.html",
    "revision": "4166693fe07fb4fc63c3e7ccb0b21437"
  },
  {
    "url": "math/多元函数微分学.html",
    "revision": "8b63120af3b49fdd1830bf9d520dc9af"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "9f0ff5a669308fb9e8092e45771deb84"
  },
  {
    "url": "software-engineering/软件过程.html",
    "revision": "ee8d5bf1faaa0b1a6a601bf7f026b889"
  },
  {
    "url": "spring/index.html",
    "revision": "a4d2d5631f9475fae1881667027551f3"
  },
  {
    "url": "tittle-tattle/Computing Machinery and Intelligence By A. M. Turing.html",
    "revision": "37ee73eeb37e4a440dafd0860d7b94cc"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "fa80d85b74d3ebf627d33430f345b526"
  },
  {
    "url": "tittle-tattle/关于Java编程部分的文章.html",
    "revision": "b9ea4d5deb957acff2e10da4f013fd3c"
  },
  {
    "url": "tittle-tattle/学术研究的正确姿势.html",
    "revision": "1d9b4f3511a868f3c184fca771e45847"
  },
  {
    "url": "tittle-tattle/新年快乐！.html",
    "revision": "20cf439f0ca6f33db7d1a5848180004d"
  },
  {
    "url": "web/index.html",
    "revision": "c80e5e40d2ff65c6b3f3597bf4e95466"
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
