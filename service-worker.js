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
    "revision": "2fe618664a003f375c594441f905cd2b"
  },
  {
    "url": "about/index.html",
    "revision": "234d3765d89e2d8ddce45bd8f1d59e8d"
  },
  {
    "url": "assets/css/0.styles.dcae4551.css",
    "revision": "439d826d57d7154c5ddbcf8f39f129c2"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.714f7e0c.js",
    "revision": "deb3a368890743cf3b42e7cc0be5271c"
  },
  {
    "url": "assets/js/11.aed9d054.js",
    "revision": "4a7957dfc6d505d3a4a462325d08e254"
  },
  {
    "url": "assets/js/12.26d7c6b7.js",
    "revision": "550d05aa460b66826562f05723075dbf"
  },
  {
    "url": "assets/js/13.eeeb5ac1.js",
    "revision": "fc41320c68efc9606026ac243dc2a2ff"
  },
  {
    "url": "assets/js/14.9cdf2ea9.js",
    "revision": "08c8c97aa7414ab495203d71bd2e5de2"
  },
  {
    "url": "assets/js/15.c3e4aa47.js",
    "revision": "651fc5190c7dbe9ac609ac2a4894115f"
  },
  {
    "url": "assets/js/2.83b44d2f.js",
    "revision": "e43022a54e9006f030812fafd79af1d1"
  },
  {
    "url": "assets/js/3.75325f6a.js",
    "revision": "2f61c13ccae7c9a4174986f6fd62db82"
  },
  {
    "url": "assets/js/4.09d788af.js",
    "revision": "1511f7a3db4d888802ea020490485ab2"
  },
  {
    "url": "assets/js/5.dcb35dea.js",
    "revision": "a5220ed58399bf0bba973eacf1a5757c"
  },
  {
    "url": "assets/js/6.55d21d85.js",
    "revision": "2d9cd5b478ef9e64ca8a4e051cfa2e59"
  },
  {
    "url": "assets/js/7.4e117243.js",
    "revision": "dd4766700cf8611fee9f376f74731dc7"
  },
  {
    "url": "assets/js/8.267929d1.js",
    "revision": "78c2152bbc3ae492080bc013386d352f"
  },
  {
    "url": "assets/js/9.0a5b62b3.js",
    "revision": "d54322d9454ff7d29b124a6272233a7e"
  },
  {
    "url": "assets/js/app.0ac2c1da.js",
    "revision": "7e8f61c30565572d5719551a92cb007e"
  },
  {
    "url": "bigData/index.html",
    "revision": "89052c6435542b619459a0b6e623bc51"
  },
  {
    "url": "deepLearning/index.html",
    "revision": "99b726b6e1d9d21f7826b1bba18b6a4f"
  },
  {
    "url": "frontEnd/index.html",
    "revision": "8cae1684b4be31eea01c049b18cd9bf2"
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
    "url": "img/自动类型转换.png",
    "revision": "2f12d0fde58f56fdd54524ebac04368a"
  },
  {
    "url": "img/运算符优先级.png",
    "revision": "60cb8dabdd6a309636fca5ad623586c3"
  },
  {
    "url": "index.html",
    "revision": "1cf0c03fc7a5881ee0a53b067b3b9cb6"
  },
  {
    "url": "java/index.html",
    "revision": "ba740f9ac30317627dd3e7eb7ba8e81a"
  },
  {
    "url": "java/语法.html",
    "revision": "d8ea2613c2e13593345e6abd18f06856"
  },
  {
    "url": "java/面向对象.html",
    "revision": "377fb2a93515836c7913dee13dca654f"
  },
  {
    "url": "kotlin/index.html",
    "revision": "b5f03d7f9515ae7dfa235f95b223deb9"
  },
  {
    "url": "spring/index.html",
    "revision": "430f05d6b150f9bda08b89e121d0e49f"
  },
  {
    "url": "tittle-tattle/index.html",
    "revision": "8ebaf75fee00326cc6c8098dea7a0de3"
  },
  {
    "url": "web/index.html",
    "revision": "630798105d891c230ddf5d3196c7cefb"
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
