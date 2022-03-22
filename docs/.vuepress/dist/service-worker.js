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
    "revision": "55d2dcf973c7c4ebb2a0a76088047708"
  },
  {
    "url": "about/index.html",
    "revision": "7e4d7042e8650256aea9fe51c858e3da"
  },
  {
    "url": "algorithm/ds-001.html",
    "revision": "ac63a3cfd8de2636a1a0dbddf3990578"
  },
  {
    "url": "algorithm/ds-002.html",
    "revision": "e373e38290a8db58b2f4d13e2effd9f9"
  },
  {
    "url": "algorithm/ds-003.html",
    "revision": "250a0f90b0c97a1ab4eaea2a68c327e8"
  },
  {
    "url": "algorithm/dynamic-programming.html",
    "revision": "6310fed4c9e4d59b828b625f959af585"
  },
  {
    "url": "algorithm/index.html",
    "revision": "4d4ee9f364bb112433439ca26c625363"
  },
  {
    "url": "artificial-intelligence/index.html",
    "revision": "646009216e1da5b3f7e32dff804859df"
  },
  {
    "url": "artificial-intelligence/search-strategies.html",
    "revision": "0c88b66f08ecea2414542f64a5166350"
  },
  {
    "url": "assets/css/0.styles.ecc20c62.css",
    "revision": "9dda647ba53b032eeab719b0d9e94fe8"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.3adfe19d.js",
    "revision": "1844db3925547334262bc42eda2b0a01"
  },
  {
    "url": "assets/js/11.09b759ca.js",
    "revision": "a583ed0cd59615acd5e16c7f285d291f"
  },
  {
    "url": "assets/js/12.58c3c31a.js",
    "revision": "f69e161d1a0e3ab5c47ca80dc70372f1"
  },
  {
    "url": "assets/js/13.752bd570.js",
    "revision": "ae3a3a73a998aeb3774fc8716ee99046"
  },
  {
    "url": "assets/js/14.181f1bcf.js",
    "revision": "6987e023ba848866d50ac9759f0ee758"
  },
  {
    "url": "assets/js/15.38c74136.js",
    "revision": "0ecf1f2f5a23fdfb8af5a6ed738c0429"
  },
  {
    "url": "assets/js/16.95f8f4d9.js",
    "revision": "0beddc0d54bc59edcc5debe12be2a2dc"
  },
  {
    "url": "assets/js/17.54b56cba.js",
    "revision": "cfa214628ad6b5cd9c709f5a7aa1d6f0"
  },
  {
    "url": "assets/js/18.d84b5664.js",
    "revision": "8eb81cd0333db6e2bc228bc71b65b7ee"
  },
  {
    "url": "assets/js/19.87837777.js",
    "revision": "7a9b1795f949c03e9a9d3821f8867b08"
  },
  {
    "url": "assets/js/20.a66eeff5.js",
    "revision": "d07fb5fc12448b3e91752e27ebd2459e"
  },
  {
    "url": "assets/js/21.c56ff9e1.js",
    "revision": "1c50cb786c07d108f7dd3830c1465679"
  },
  {
    "url": "assets/js/22.ccad7158.js",
    "revision": "32e16b08478f375fff11537fc0700449"
  },
  {
    "url": "assets/js/23.7cc6f7fb.js",
    "revision": "94901289ae483a1a976e4b87cd1e2852"
  },
  {
    "url": "assets/js/24.38388c2d.js",
    "revision": "f57f63b3362438b14d711c564c705b0a"
  },
  {
    "url": "assets/js/25.77281d9f.js",
    "revision": "73c68260ef1a79156cb795824be994c1"
  },
  {
    "url": "assets/js/26.cff24e7f.js",
    "revision": "f8e9ce0e0e1d10be2b8429ab95cf1c8e"
  },
  {
    "url": "assets/js/27.5aea81c0.js",
    "revision": "452afcc5d77a4e663d44c752db432d1f"
  },
  {
    "url": "assets/js/28.d2c96cf0.js",
    "revision": "483d3305786521136b2738dd95f0a909"
  },
  {
    "url": "assets/js/29.13565ef4.js",
    "revision": "5c86d1014900b9b00d1fc1cbaa95064b"
  },
  {
    "url": "assets/js/3.5e213994.js",
    "revision": "0f1c1e1eea127efc242953cd4e76a2dc"
  },
  {
    "url": "assets/js/30.4fb7780f.js",
    "revision": "6d7fc6705d8b66cbfd038faafb359b0e"
  },
  {
    "url": "assets/js/31.7cb8d683.js",
    "revision": "67d7ecde59ad1712191f4c7eff338f93"
  },
  {
    "url": "assets/js/32.92d57a10.js",
    "revision": "f71e5a09b6e34e3c07fefac91d5b9ac5"
  },
  {
    "url": "assets/js/33.f71d4765.js",
    "revision": "405054933b1d8beb519dac3f53ce06a7"
  },
  {
    "url": "assets/js/34.a13839b8.js",
    "revision": "1d1c6b21de59b8e15f2696c3ae966094"
  },
  {
    "url": "assets/js/35.451420fc.js",
    "revision": "e3ff655535f6a42b5783357da30b7218"
  },
  {
    "url": "assets/js/36.7afede1c.js",
    "revision": "c48642ab0c27821ef7113eb6ac56f9f7"
  },
  {
    "url": "assets/js/37.98b43b09.js",
    "revision": "9566bdb9b56a4a5a0f3047f18bc9a69c"
  },
  {
    "url": "assets/js/38.f75bb434.js",
    "revision": "85792e7762209428b90c5fd2ecffab75"
  },
  {
    "url": "assets/js/39.ec539916.js",
    "revision": "33a33f78b56ad2c761e2b7962856a951"
  },
  {
    "url": "assets/js/4.4456b9a5.js",
    "revision": "daeb09e74d59d762ca1c719c1b41819b"
  },
  {
    "url": "assets/js/40.90511417.js",
    "revision": "b523fed8b3b72409a6639aa925a90b60"
  },
  {
    "url": "assets/js/41.d0d2b5c2.js",
    "revision": "9ad9cfc8b7ccf8a94e7e8b1b1736a1af"
  },
  {
    "url": "assets/js/42.8e6a983a.js",
    "revision": "5f137c067f26e7df3dc0a28833fa1239"
  },
  {
    "url": "assets/js/43.dd175bc4.js",
    "revision": "83cc07f321ba83731500a9568cba45fa"
  },
  {
    "url": "assets/js/44.c8013700.js",
    "revision": "ca1be614debddf0a692a8bb3dbcd960d"
  },
  {
    "url": "assets/js/45.71f21be7.js",
    "revision": "31d8e200ae3d8625373caf6934d3cfa1"
  },
  {
    "url": "assets/js/46.9d57ebbf.js",
    "revision": "31a9ea4dd0b99030aa3a4193039d9214"
  },
  {
    "url": "assets/js/47.9187daec.js",
    "revision": "b6d2235dfc187a3f25c32a61cd9697fe"
  },
  {
    "url": "assets/js/48.42721d77.js",
    "revision": "fbcae353f6e609276309d6ff50570772"
  },
  {
    "url": "assets/js/49.0b83e96b.js",
    "revision": "781b606455c3c4d3f46656b8f1312d71"
  },
  {
    "url": "assets/js/5.612dc22d.js",
    "revision": "58c4483416df5853ff9e544f2459f30e"
  },
  {
    "url": "assets/js/50.a6923b34.js",
    "revision": "d1578d0def78807bf16ffdd470118d7c"
  },
  {
    "url": "assets/js/51.6c6078d0.js",
    "revision": "5accbaa21aa6ae7c4b4f2db3aa47bfc1"
  },
  {
    "url": "assets/js/52.665f7bc4.js",
    "revision": "32918620094d62a77133c2eb545ad37a"
  },
  {
    "url": "assets/js/53.8c7eab7b.js",
    "revision": "8fb6664195ee43adab69d163e0b4683d"
  },
  {
    "url": "assets/js/54.87960688.js",
    "revision": "ddee66800ccbc67e5185578552f49ec6"
  },
  {
    "url": "assets/js/55.c6569a40.js",
    "revision": "77e726f272aa10cecb1143cf9b474444"
  },
  {
    "url": "assets/js/56.8f75e778.js",
    "revision": "502068245ad41c31f41db5e4f3276d5b"
  },
  {
    "url": "assets/js/57.562e9d38.js",
    "revision": "5421c6f037d3235a617709a404dafd8e"
  },
  {
    "url": "assets/js/58.514413e5.js",
    "revision": "5f7d6be8df79bc12f8b903ff1b342982"
  },
  {
    "url": "assets/js/59.3eb9cee1.js",
    "revision": "1b35ced548406212201ecba1b094ecea"
  },
  {
    "url": "assets/js/6.99f29953.js",
    "revision": "f01027734dea5efbe6411d9538ace0ba"
  },
  {
    "url": "assets/js/60.655b586f.js",
    "revision": "fb29f398161ff3534d29a9b338ffff34"
  },
  {
    "url": "assets/js/61.191e4d0a.js",
    "revision": "d97f3a4578f25a94dd5da7741d735acd"
  },
  {
    "url": "assets/js/62.92cdef23.js",
    "revision": "998d91fa4b0f4e5b69ecba3fb0aee347"
  },
  {
    "url": "assets/js/63.d233b148.js",
    "revision": "cdcc26a20c9f201e30c18442bf4870c6"
  },
  {
    "url": "assets/js/64.cfca67d1.js",
    "revision": "563690d710888dfb7abff97a3bcc6806"
  },
  {
    "url": "assets/js/65.2c27de1a.js",
    "revision": "d35fb3f9c04cd7418a42f129e509e261"
  },
  {
    "url": "assets/js/66.d97c5ea4.js",
    "revision": "a3245b575464b244d632858c881aa2cc"
  },
  {
    "url": "assets/js/67.98709f71.js",
    "revision": "83643b4f919087f77631152f032c2fa0"
  },
  {
    "url": "assets/js/68.8d32d42c.js",
    "revision": "58492cf78bf2fa5ebd92458f9637c3f8"
  },
  {
    "url": "assets/js/69.70eedef4.js",
    "revision": "d477e2a21a11c4dcabf3b4ab147adb55"
  },
  {
    "url": "assets/js/7.fc3990b3.js",
    "revision": "bdb289c68bef3bb6c3d9d005c49b62bf"
  },
  {
    "url": "assets/js/70.5c51f62e.js",
    "revision": "b96ab29685e4f2319d94ac3e31ba79da"
  },
  {
    "url": "assets/js/8.8634021e.js",
    "revision": "db940827bb004bb61c9a4633103e762b"
  },
  {
    "url": "assets/js/9.b00a2bb6.js",
    "revision": "1f0efe70195914a228841599861bac0f"
  },
  {
    "url": "assets/js/app.5cefb728.js",
    "revision": "36f7456e275ddf0f61e1740c3a541efb"
  },
  {
    "url": "assets/js/vendors~flowchart.543d9c9f.js",
    "revision": "7e399309a80d906d7115b249ee7268cb"
  },
  {
    "url": "big-data/index.html",
    "revision": "5e0e167622d4888b67fdc1c478b21d14"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "6b82f1c678e9ad293349eb6193e1f2a9"
  },
  {
    "url": "c/index.html",
    "revision": "fab5dc367e62035bd13576ca78eb8cab"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "f37c94b7601c2e6421840e3d7f6b7ce5"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "0640ce93eeda8d38a919e47a91e501e4"
  },
  {
    "url": "deep-learning/python-and-vectorization.html",
    "revision": "6cc4c3998bac0b4c369a826858558a49"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "hello-world/array-and-linked-list.html",
    "revision": "9bccf133195fce9eac11bc73761fdd39"
  },
  {
    "url": "hello-world/binary-search.html",
    "revision": "9c1a92a15c532c86fbf9b391ccfa0e18"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "3eacdce4bea337cda62a1968f3ece62d"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "fa65b0ca5c1f2497392cb066b30b09de"
  },
  {
    "url": "hello-world/index.html",
    "revision": "8da27c0d8f262e399f49038b54330cd4"
  },
  {
    "url": "hello-world/setup-a-server-manually.html",
    "revision": "db4e6fe35bee63450c67ac55f351d4dd"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "0297e4865dec10712c8da0e2c28a1d08"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "8fb0f0df7cc70443c2c6b5c8f9811e86"
  },
  {
    "url": "img/ahza-white.png",
    "revision": "3c642eba43abc55fb6555dab8d743fcd"
  },
  {
    "url": "img/Box公共父类.png",
    "revision": "29f7513824ee0797b0e490de82ecab04"
  },
  {
    "url": "img/buildOpt.png",
    "revision": "886f601b0b53e21c83d5cd5028bc63ba"
  },
  {
    "url": "img/Collection继承关系.png",
    "revision": "15961287697b1152fdd5563f3f445b39"
  },
  {
    "url": "img/C程序的基本结构.jpg",
    "revision": "7a23f1d4d04270c9354597cf2499dee4"
  },
  {
    "url": "img/depthFirstSearch.png",
    "revision": "b9a011eed9b98e99df0bb638ba7aa051"
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
    "url": "img/gradientDescent_real.svg",
    "revision": "51a27790af79965ce122cdabb3cb8e3e"
  },
  {
    "url": "img/gradientDescent.svg",
    "revision": "bf24d25265d0323034b8e6eda8b47347"
  },
  {
    "url": "img/HTTP.png",
    "revision": "82fc121850762692d6f58a558ea6f7fc"
  },
  {
    "url": "img/HTTPResponse.png",
    "revision": "59485510df3e7e6bb959e03de1708a03"
  },
  {
    "url": "img/HTTPS.png",
    "revision": "ceb922735b48de43f832b2d0e7461e6c"
  },
  {
    "url": "img/jetbrains.svg",
    "revision": "48b3f5c87ff00f11d7b0b0fd64fdd12e"
  },
  {
    "url": "img/JMM.png",
    "revision": "32df347a83f71a49ba4bd9e01ce1596e"
  },
  {
    "url": "img/licence.png",
    "revision": "44c7d2e043428bc130a424d81c2caebc"
  },
  {
    "url": "img/LinkedList.png",
    "revision": "14e3dd4e083426cf400833e2d5bcb8da"
  },
  {
    "url": "img/List继承关系.png",
    "revision": "380a3d18acbe73f8e51469a6aa2ac775"
  },
  {
    "url": "img/localhost.png",
    "revision": "0d631a6440230ebaddd061f434e9b9ac"
  },
  {
    "url": "img/LRGD_dz.svg",
    "revision": "bec2bef3f3445f209fff4c4be3ddc3d3"
  },
  {
    "url": "img/LRGD_repeat.svg",
    "revision": "278418edeecbfe1e33a24c921ee1095c"
  },
  {
    "url": "img/LRGDComputationGraph.jpg",
    "revision": "7ad1b57c0d9671cd620e861f825c7194"
  },
  {
    "url": "img/mysqlProcess.png",
    "revision": "e5850b751ff12e20209f6aa17bc8c304"
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
    "url": "img/oNotation.png",
    "revision": "a80c951f7c5bfa62997505d7f686d076"
  },
  {
    "url": "img/sigmoid.jpg",
    "revision": "909136ab97f3aa85e17ff23ddd6f46f6"
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
    "url": "img/synchronized_block.gif",
    "revision": "d22e6514513ee2a5ff000485d62f313b"
  },
  {
    "url": "img/synchronizedWithException.png",
    "revision": "e8475d591c334e554302cbb22c2e7e7a"
  },
  {
    "url": "img/tomcat_webapps.jpg",
    "revision": "1c76cd467dad7e9d344fb294ad1db53b"
  },
  {
    "url": "img/uniformCost.png",
    "revision": "d88da5d903fc63f65328677be66c324a"
  },
  {
    "url": "img/updateREADME.png",
    "revision": "bb76cb7e383ef9392104c283ed91e2c5"
  },
  {
    "url": "img/vultr_add_ssh_key.jpg",
    "revision": "02030fb24d62ab5a8d145dce1e32fbfb"
  },
  {
    "url": "img/内存模型.png",
    "revision": "d9994a00c50e0d64f118965116c19f58"
  },
  {
    "url": "img/内存模型1_8.png",
    "revision": "de11fad3c2abed388ebf991ded7bbe3a"
  },
  {
    "url": "img/内存管理.jpg",
    "revision": "e4eb17b76cf8bbbd913b2a0ef66f3cd1"
  },
  {
    "url": "img/单继承.jpg",
    "revision": "3ff56912ed756d3efb84cfb4a8261e6d"
  },
  {
    "url": "img/多继承.jpg",
    "revision": "e74b1da5b9c57740a89caadcc3d64e9a"
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
    "url": "img/泛型类型泛化.png",
    "revision": "8f2721567e85c74e1a7454f941a568ba"
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
    "revision": "3c51667521dba3cddf7a8bb864ba12a6"
  },
  {
    "url": "img/静态内存.png",
    "revision": "d1a5f305719c2871e0f0aab66fd02a1d"
  },
  {
    "url": "index.html",
    "revision": "d117e8a493b7232a5fffca14f2572481"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "9fdd4b50f39ed551838273fe459a1d63"
  },
  {
    "url": "java/API-io.html",
    "revision": "9b53424be4d89a99895e30132b4064b9"
  },
  {
    "url": "java/API-lang.html",
    "revision": "93b45e92cb8ca360576abc44831e908b"
  },
  {
    "url": "java/API-util.html",
    "revision": "f40c04f423c671fe9b942e84d63f9e0c"
  },
  {
    "url": "java/grammars.html",
    "revision": "3e440e352f678be0cb27bebd381b17fd"
  },
  {
    "url": "java/index.html",
    "revision": "bb85bb9a176061afc0f27590f7c15c35"
  },
  {
    "url": "java/jvm.html",
    "revision": "d7fd76c55606d4d01a9cd6c44cce90a1"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "59565f261aae5b8ece22bcc426496787"
  },
  {
    "url": "java/references.html",
    "revision": "dccc257bada9ad0b1bb00e3c90acf57c"
  },
  {
    "url": "kotlin/index.html",
    "revision": "229a0a1da910d67352e0ed640f64640a"
  },
  {
    "url": "math/index.html",
    "revision": "2f7b08de314e847438948ca0e580d3b1"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "6d206be7f1fa045ebf548c3f5f385d81"
  },
  {
    "url": "mysql/divide.html",
    "revision": "5f8870ec021e094087439022a1aadab7"
  },
  {
    "url": "mysql/index.html",
    "revision": "8a39c30e8052429b69a0bdfbd542dfb8"
  },
  {
    "url": "mysql/indices.html",
    "revision": "7ef480676fdbe4bb7f6299f2dd3bfe84"
  },
  {
    "url": "mysql/lock.html",
    "revision": "4b1d0af808e758cf534791aa9df8173b"
  },
  {
    "url": "mysql/question.html",
    "revision": "02194064a5477fa8c069d77dfb668ece"
  },
  {
    "url": "mysql/references.html",
    "revision": "7a2c5a1d12d04f7065e678a5f5366cbd"
  },
  {
    "url": "mysql/transaction.html",
    "revision": "940a8fad4bdc363be862ca1c91e22a55"
  },
  {
    "url": "python/grammar.html",
    "revision": "8a349f4938f7c99b642d31aa7373aebc"
  },
  {
    "url": "python/index.html",
    "revision": "71c536bf76db2ef9801350f3b9872c84"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "9ac2f411d92e621e320d149ee8b9c5c2"
  },
  {
    "url": "recommender-systems/index.html",
    "revision": "378cb411f0e70d1f426658e01b1c945a"
  },
  {
    "url": "recommender-systems/introduction.html",
    "revision": "212436dc29e052dcdbfbeb89b50606d2"
  },
  {
    "url": "redis/cache.html",
    "revision": "3aaac02a166a0e60e6c68f5b52dab659"
  },
  {
    "url": "redis/cluster.html",
    "revision": "d81179d086ef564b13f3fe1792b58a3d"
  },
  {
    "url": "redis/index.html",
    "revision": "e3262f367eb35027e8ca02ba41785582"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "dbd696e964010d62d7b6c5cacf3dcf7e"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "499f2d4af43a4140af78bb4921b04ef6"
  },
  {
    "url": "spring/index.html",
    "revision": "1977e70da638293770cc1f99595c836f"
  },
  {
    "url": "spring/ioc.html",
    "revision": "6dc8058dd889456bed7d1bb570fe1086"
  },
  {
    "url": "spring/overall.html",
    "revision": "c1bf70286dc3fd310f6773d9bc9e24f7"
  },
  {
    "url": "spring/references.html",
    "revision": "52756906218f4293721e1d4cb4d5042f"
  },
  {
    "url": "web/HTTP.html",
    "revision": "65272e0411e57c487af203234c156fff"
  },
  {
    "url": "web/index.html",
    "revision": "a4b7865afe80890df34572d710f15fce"
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
