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
    "url": "about/index.html",
    "revision": "3614861eb9cf2ab7b4f70cccc77718dc"
  },
  {
    "url": "assets/css/0.styles.077aaf28.css",
    "revision": "931a8423aafd47cb752599769d9a42c8"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.f0ffd05c.js",
    "revision": "efed9efe62087e505eac947db501d299"
  },
  {
    "url": "assets/js/11.19b83b87.js",
    "revision": "cc5e64e315ebd075c3e1eaebd4b5638a"
  },
  {
    "url": "assets/js/12.b6af3f5a.js",
    "revision": "03e7c9ad386a637adfaf6f6cf813fdae"
  },
  {
    "url": "assets/js/13.1e473bcb.js",
    "revision": "2d40b8009a5e7573e71253dabcc6f318"
  },
  {
    "url": "assets/js/14.103656be.js",
    "revision": "8b212c326900acccd426897f04297c29"
  },
  {
    "url": "assets/js/15.c87e99a9.js",
    "revision": "6234e0d26af5699f9241c26a503043d4"
  },
  {
    "url": "assets/js/16.05a65ce4.js",
    "revision": "aeeb4a1492c41d934626e0640bacc9df"
  },
  {
    "url": "assets/js/17.017132d0.js",
    "revision": "9945058c2c66add5f6e7840df86dc808"
  },
  {
    "url": "assets/js/18.67063aac.js",
    "revision": "3dfce14cba537f9ade23a4886e1915ae"
  },
  {
    "url": "assets/js/19.a2aacda0.js",
    "revision": "e36872925a67407031881743a438f006"
  },
  {
    "url": "assets/js/2.8569c19c.js",
    "revision": "9203e55fdb717164f34a75761ca31c2c"
  },
  {
    "url": "assets/js/20.c318cab9.js",
    "revision": "133ce4a1492450c709b57a4390bb32b9"
  },
  {
    "url": "assets/js/21.e928ffea.js",
    "revision": "20e45bea4c24b851839fd4f301c336bb"
  },
  {
    "url": "assets/js/22.281c5ce1.js",
    "revision": "c90708d8fb280b0ea2866c98cf760944"
  },
  {
    "url": "assets/js/23.cac528f1.js",
    "revision": "73df5a9256cd8e0ac4c63c4b5b975ee7"
  },
  {
    "url": "assets/js/24.4aabb05e.js",
    "revision": "af46cb4e4877d19caa9ca16b86f230b4"
  },
  {
    "url": "assets/js/25.aa728550.js",
    "revision": "9053165ab98e3e8bc373bb1b491a56e8"
  },
  {
    "url": "assets/js/26.20828187.js",
    "revision": "481bc003d4ef39c72b7cfdb8be26e7b8"
  },
  {
    "url": "assets/js/27.b89a65f2.js",
    "revision": "c07b070fd2d7eeac50d8270828b88f41"
  },
  {
    "url": "assets/js/28.59a6843c.js",
    "revision": "45e745b67c66a0a5efddd1773559788b"
  },
  {
    "url": "assets/js/29.e03fcddf.js",
    "revision": "7facdf7c0aea4e15b1f28fc19f0b7c8a"
  },
  {
    "url": "assets/js/3.e61e0cf6.js",
    "revision": "b54f89e975773b03d2cef621f1499690"
  },
  {
    "url": "assets/js/30.27b80711.js",
    "revision": "67c2f06a5d6f3c6bcb22df8c2433575f"
  },
  {
    "url": "assets/js/31.4095bd44.js",
    "revision": "8575db56873c3b1b6c1e32f75fa62414"
  },
  {
    "url": "assets/js/32.de463e61.js",
    "revision": "b9444f1c7e904ff7d5eef4eaa065b09b"
  },
  {
    "url": "assets/js/33.90add7fe.js",
    "revision": "1cfdc3090001efb0fd6f470a3287f43e"
  },
  {
    "url": "assets/js/34.806bef7d.js",
    "revision": "c5869a2206d7d87a0542ed981613ca06"
  },
  {
    "url": "assets/js/35.c85b21b4.js",
    "revision": "0a0f0ee5b453b787a408eacb117e6481"
  },
  {
    "url": "assets/js/36.40c54119.js",
    "revision": "4ee86655f41f2615df032061316c2170"
  },
  {
    "url": "assets/js/4.1897e29e.js",
    "revision": "68fbc112e829af1213bd1f7dbd1459d5"
  },
  {
    "url": "assets/js/5.22e86231.js",
    "revision": "5e3a3f1a917d3606afcaf8cdd67a1a37"
  },
  {
    "url": "assets/js/6.6e6a3001.js",
    "revision": "886691af8ed74c70378bfb93df4b3050"
  },
  {
    "url": "assets/js/7.e2fd7935.js",
    "revision": "71e6d6c0d1beaead74e62a1f02de0ead"
  },
  {
    "url": "assets/js/8.d865382a.js",
    "revision": "8312850560f332ecc943b60107b0e1f7"
  },
  {
    "url": "assets/js/9.11bcd407.js",
    "revision": "e6150a9e5bcf4de340510f335043ed9b"
  },
  {
    "url": "assets/js/app.693ccff2.js",
    "revision": "25581c46170247587d3c1cf77b79f711"
  },
  {
    "url": "big-data/index.html",
    "revision": "23cb572e6305646e90e1a7420c602d67"
  },
  {
    "url": "c/index.html",
    "revision": "31b9d270760238dd903f823beb314eb8"
  },
  {
    "url": "c/常量、变量与数据类型.html",
    "revision": "03ffadf13b5c9ab3063f858ea574edbd"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "b91c943777c95c4d022e4e2054bc518d"
  },
  {
    "url": "front-end/index.html",
    "revision": "8234e5a568d99948f9d9830d8e9d4d23"
  },
  {
    "url": "hello-world/Computing Machinery and Intelligence By A. M. Turing.html",
    "revision": "c636bf3369f64dd2fbb6acff586098d8"
  },
  {
    "url": "hello-world/index.html",
    "revision": "bf8e15ea33d059bfe60dd70235f56cd7"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "d397c6ff4706d7a73e9f7b4b4a4d301c"
  },
  {
    "url": "hello-world/关于Java编程部分的文章.html",
    "revision": "8e291eda68132a72be717c0593320db7"
  },
  {
    "url": "hello-world/学术研究的正确姿势.html",
    "revision": "bf625fa822fdd408b948ed80eb16d132"
  },
  {
    "url": "hello-world/搭建一个基于 VuePress 的博客.html",
    "revision": "f9f1c20dbbeb6e9c3cb8ea9ea05d998a"
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
    "revision": "4cb3a71deba3ae59af88c200ce62ac60"
  },
  {
    "url": "java/API-工具类库.html",
    "revision": "4a13fbb03575b11ca41f53aabf8d6863"
  },
  {
    "url": "java/API-语言基础类库.html",
    "revision": "ae59aa377bfa1c235351bc09c478e373"
  },
  {
    "url": "java/API-输入输出类库.html",
    "revision": "e00359e7025cdb5a36c1cb736427166b"
  },
  {
    "url": "java/index.html",
    "revision": "607b0c53da16d1554358ed6c1a4ba837"
  },
  {
    "url": "java/应用程序编程接口概述.html",
    "revision": "06e1ab5a38d10e587fd9cb989f50cb85"
  },
  {
    "url": "java/语法.html",
    "revision": "7f1198655138602c02ba71b7cff50691"
  },
  {
    "url": "java/面向对象.html",
    "revision": "4dbb7e727ccd8378adb6d257e124f236"
  },
  {
    "url": "kotlin/index.html",
    "revision": "5b3aea2f6c62f5b155f511de1938f48a"
  },
  {
    "url": "math/index.html",
    "revision": "775250496e54202b3f034ecf387179f2"
  },
  {
    "url": "math/多元函数微分学.html",
    "revision": "795545ed5d9dc43d8243ddd9b7fb8543"
  },
  {
    "url": "python/index.html",
    "revision": "5f2675401b7e99f38b916d63e7cdbc1d"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "b8a6d59dc42d39b4093765b31e782ae8"
  },
  {
    "url": "software-engineering/软件过程.html",
    "revision": "fe04dbbd52c8870d861941a763458912"
  },
  {
    "url": "spring/index.html",
    "revision": "65f36f96d4a06c6dfa94ba2faf68a077"
  },
  {
    "url": "web/HTTP.html",
    "revision": "243e1a3991383f7cf7780141dce0878e"
  },
  {
    "url": "web/index.html",
    "revision": "4b76d94af6045a9cac6872317426b0dc"
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
