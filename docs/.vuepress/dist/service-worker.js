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
    "revision": "5f8e94492cd9408de93582110c9ad1db"
  },
  {
    "url": "about/index.html",
    "revision": "da80f83423295012ec9f67d6e80aa288"
  },
  {
    "url": "assets/css/0.styles.dc3f3953.css",
    "revision": "670025ce28da921117d0d4f5b9ebce5a"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.b9c46a1b.js",
    "revision": "20809c081ebbb2d9150c167026de1fa3"
  },
  {
    "url": "assets/js/11.9990e216.js",
    "revision": "66030beb31ee00f4b8ed9e572d9be431"
  },
  {
    "url": "assets/js/12.4629d291.js",
    "revision": "354c1e05f42ee81b7f0661229d91ab89"
  },
  {
    "url": "assets/js/13.85c1c1c4.js",
    "revision": "1e9253b76e5f330327de3f00277989f2"
  },
  {
    "url": "assets/js/14.a3002729.js",
    "revision": "27db7c72e364836f4d70b5b7c2b5f316"
  },
  {
    "url": "assets/js/15.c387900b.js",
    "revision": "d6844a018a03493afca9ab6e499f96d8"
  },
  {
    "url": "assets/js/16.fd88cdc6.js",
    "revision": "e58c5e0f666569c6bc255dd2489bd3f1"
  },
  {
    "url": "assets/js/17.5648db3f.js",
    "revision": "d4eb74a127a03396e492ed9a2634fbbc"
  },
  {
    "url": "assets/js/18.a3feb59d.js",
    "revision": "5a06d71084e39fd41383e486ca60d3b2"
  },
  {
    "url": "assets/js/19.98ca881c.js",
    "revision": "3b0d00d57c420fbc0878ad14d05f11ce"
  },
  {
    "url": "assets/js/2.fba6a68c.js",
    "revision": "14760500bce882342717ef2ece826115"
  },
  {
    "url": "assets/js/20.90d1dd48.js",
    "revision": "e8e048893147f8be38c26cfb87fb9186"
  },
  {
    "url": "assets/js/21.b657a1d8.js",
    "revision": "9ef6e05fa2a5ed05786ff642eff98801"
  },
  {
    "url": "assets/js/22.381015ab.js",
    "revision": "8e8efcbcbc37261762fda68310c9ef98"
  },
  {
    "url": "assets/js/23.6d2c7e48.js",
    "revision": "e54212f3aec6a6b3eee2212c45df007c"
  },
  {
    "url": "assets/js/24.90598be4.js",
    "revision": "097f6bae4e500df99edbd0d915ce65f6"
  },
  {
    "url": "assets/js/25.2d0ea1a8.js",
    "revision": "e5e048e11c41f14e65544d2ffa77f781"
  },
  {
    "url": "assets/js/26.c3157074.js",
    "revision": "1c6f4b48f2313c63fab83891234de14a"
  },
  {
    "url": "assets/js/27.471e5e99.js",
    "revision": "b1080d41545a08910c02a6d23821d48d"
  },
  {
    "url": "assets/js/28.1badbf7e.js",
    "revision": "4a8e93f52e2627e600e2814a8ba33b15"
  },
  {
    "url": "assets/js/29.b79f9bba.js",
    "revision": "2e8a4ea45ddf5e8d65f6a5e830014206"
  },
  {
    "url": "assets/js/3.420795b9.js",
    "revision": "342f80665fc6bd19b951ce8e5c3695b9"
  },
  {
    "url": "assets/js/30.963cb87e.js",
    "revision": "16f91ced861d333b0d00f548d620f67c"
  },
  {
    "url": "assets/js/31.a8f0c8a6.js",
    "revision": "8b7728b1aa9d3ef09f34c855e36a0da0"
  },
  {
    "url": "assets/js/32.069c5c2f.js",
    "revision": "8eac55bb9bd213fac314113fee13f4cf"
  },
  {
    "url": "assets/js/33.74aeb8e0.js",
    "revision": "eee614c9176455897d8805f4dceb22c4"
  },
  {
    "url": "assets/js/34.69fdcddb.js",
    "revision": "9b47b783913a872e4eae18d7ad7320b3"
  },
  {
    "url": "assets/js/35.a7e84ead.js",
    "revision": "ae27b9d118d1c52d4d161ca9814fa14d"
  },
  {
    "url": "assets/js/36.12c73702.js",
    "revision": "414d5e10f03556e1a392989af5b38f95"
  },
  {
    "url": "assets/js/4.09468943.js",
    "revision": "5ad8aa78b5577ae3beaf6e6b380e4991"
  },
  {
    "url": "assets/js/5.7c0ae059.js",
    "revision": "1cf33a6176e8b29751797b808e24a484"
  },
  {
    "url": "assets/js/6.ade8a31f.js",
    "revision": "7006c3cdd7d062354564e3d9ec664a49"
  },
  {
    "url": "assets/js/7.61df9065.js",
    "revision": "cd161f79b68b37d4a34441c7c610d1f4"
  },
  {
    "url": "assets/js/8.d727df6d.js",
    "revision": "022ab6db93a791fe53a6c1c7a31c5e4a"
  },
  {
    "url": "assets/js/9.1fea35fb.js",
    "revision": "0130ee749cc247c6ee3432c3de3a20fe"
  },
  {
    "url": "assets/js/app.1213464b.js",
    "revision": "da60ae7bea1449e3c3ebdefcf6816b50"
  },
  {
    "url": "big-data/index.html",
    "revision": "c07c1cbbd70f061f08cfeb11f219822d"
  },
  {
    "url": "c/index.html",
    "revision": "c507d9dd1c56e9ea901a7ffad55201fe"
  },
  {
    "url": "c/常量、变量与数据类型.html",
    "revision": "c6383f0eab21d0ded5a6214f55b324aa"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "3e9c869b7f854e748a12b1732785e23d"
  },
  {
    "url": "font/JetBrainsMono-Bold-Italic.woff",
    "revision": "cc9f0cedefdf486f160c42bb0b913d2a"
  },
  {
    "url": "font/JetBrainsMono-Bold.woff",
    "revision": "55c1134aa19a9745b9ec647d28d41532"
  },
  {
    "url": "font/JetBrainsMono-ExtraBold-Italic.woff",
    "revision": "acfbfb53c6ae04a0eed32cfba29470e0"
  },
  {
    "url": "font/JetBrainsMono-ExtraBold.woff",
    "revision": "8fb2b919c632aa14585e0b0df6ae618f"
  },
  {
    "url": "font/JetBrainsMono-Italic.woff",
    "revision": "9d9d24d12647f710199eb4df8780a01c"
  },
  {
    "url": "font/JetBrainsMono-Medium-Italic.woff",
    "revision": "2bd2a4a1613cb57da6e469ba6f2ecc93"
  },
  {
    "url": "font/JetBrainsMono-Medium.woff",
    "revision": "ef1089ea6d73b64008a2feef1f204f6b"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "front-end/index.html",
    "revision": "30030f11076e742c45d6a17383a07482"
  },
  {
    "url": "hello-world/Computing Machinery and Intelligence By A. M. Turing.html",
    "revision": "6bf2445c01d270285d183df1a61e5307"
  },
  {
    "url": "hello-world/index.html",
    "revision": "c7c46dc9df3c1812ed3026ca50dd3273"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "3fd085cd76123399b6c53333225065e8"
  },
  {
    "url": "hello-world/关于Java编程部分的文章.html",
    "revision": "8bc6dbb65d67fc10d2a4ca0c84e74aa2"
  },
  {
    "url": "hello-world/学术研究的正确姿势.html",
    "revision": "b0919e2cb343efc92eedde8e43910172"
  },
  {
    "url": "hello-world/搭建一个基于 VuePress 的博客.html",
    "revision": "c0c60610de2149ae12cf2a313cc04e37"
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
    "url": "img/jetbrains.svg",
    "revision": "48b3f5c87ff00f11d7b0b0fd64fdd12e"
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
    "revision": "2dfbc506d1171e42eafda63588049a31"
  },
  {
    "url": "java/API-工具类库.html",
    "revision": "4f41eb5aaa9529a57425d8388ef54c36"
  },
  {
    "url": "java/API-语言基础类库.html",
    "revision": "ccdeb89bb7654a8f14545cbf12182d81"
  },
  {
    "url": "java/API-输入输出类库.html",
    "revision": "9b29641d739ad6b7ebc9b1ae0fd2f486"
  },
  {
    "url": "java/index.html",
    "revision": "18a64f23bd51ac4aca8823fd95477e41"
  },
  {
    "url": "java/应用程序编程接口概述.html",
    "revision": "57a3c3cf872c0732fc3d8698ae6ea711"
  },
  {
    "url": "java/语法.html",
    "revision": "20e952ae139c5aa5a85db8c8405e0a25"
  },
  {
    "url": "java/面向对象.html",
    "revision": "5eb1085171ed2d3984d0ff58cb5441e7"
  },
  {
    "url": "kotlin/index.html",
    "revision": "11c53372f231ed428f02fe5c96bbc8af"
  },
  {
    "url": "math/index.html",
    "revision": "0a8f130411086fae02d293493e4b59a0"
  },
  {
    "url": "math/多元函数微分学.html",
    "revision": "fe29e5d64db35db4e1afa38f58065ae7"
  },
  {
    "url": "python/index.html",
    "revision": "7d7b274518ee639d72311c78f2196fda"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "b108a5b83cfce60e772cc84c0bdaf87d"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "68c9e311c83814897fb75a66ebd93464"
  },
  {
    "url": "software-engineering/软件过程.html",
    "revision": "cd7d63b5a90404de6abf70d1416aa093"
  },
  {
    "url": "spring/index.html",
    "revision": "724d8bcd25d81ab688dc6b721f72b813"
  },
  {
    "url": "web/HTTP.html",
    "revision": "0c32aebca02c9b2d3f8d9f29a280ba38"
  },
  {
    "url": "web/index.html",
    "revision": "88634d69804e6cd3500dff88ae4a1a35"
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
