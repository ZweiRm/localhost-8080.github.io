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
    "revision": "9cb6c315e583d14d1f1e670a5faabd9d"
  },
  {
    "url": "about/index.html",
    "revision": "82920334f147a8ea9ed989f393332162"
  },
  {
    "url": "algorithm/ds-001.html",
    "revision": "0b490ec9dff68212d0c34866f1eda024"
  },
  {
    "url": "algorithm/ds-002.html",
    "revision": "6361110a88a05973339e91db8b3b402c"
  },
  {
    "url": "algorithm/ds-003.html",
    "revision": "4d31c4fbd96646e5337518793bca7304"
  },
  {
    "url": "algorithm/dynamic-programming.html",
    "revision": "77e4d45e8dd080cd74d82b8a99c2ad6a"
  },
  {
    "url": "algorithm/index.html",
    "revision": "236ea6c5a85a4e5d3909ddcc7ace8f3a"
  },
  {
    "url": "artificial-intelligence/index.html",
    "revision": "f885949845231e44254da5fc03351c91"
  },
  {
    "url": "artificial-intelligence/search-strategies.html",
    "revision": "01e2002bfd4ad349a890f2cd29da0b83"
  },
  {
    "url": "assets/css/0.styles.7aae9a16.css",
    "revision": "b906c563d5854a4d0f23531ff579c1d5"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.a5161dde.js",
    "revision": "9f0ac999b4c53aeff01e21352819206b"
  },
  {
    "url": "assets/js/11.09b759ca.js",
    "revision": "a583ed0cd59615acd5e16c7f285d291f"
  },
  {
    "url": "assets/js/12.7e044f04.js",
    "revision": "96934c1969d7ea5be4d5d7072533fac8"
  },
  {
    "url": "assets/js/13.4772712e.js",
    "revision": "bcbf6107fc3e71f1d308dd9e0b695b37"
  },
  {
    "url": "assets/js/14.181f1bcf.js",
    "revision": "6987e023ba848866d50ac9759f0ee758"
  },
  {
    "url": "assets/js/15.cbe31954.js",
    "revision": "9316c756ed4bb9332fa4a0466fc3d16e"
  },
  {
    "url": "assets/js/16.b93cb34b.js",
    "revision": "ed4827bd71f4b73f636fb91093fd2467"
  },
  {
    "url": "assets/js/17.1d2595f8.js",
    "revision": "43aac1c35517c79e5eba0f2d9315956a"
  },
  {
    "url": "assets/js/18.d84b5664.js",
    "revision": "8eb81cd0333db6e2bc228bc71b65b7ee"
  },
  {
    "url": "assets/js/19.a87bbb33.js",
    "revision": "ef052d337767764e597137d8e57c9e52"
  },
  {
    "url": "assets/js/20.581c5b10.js",
    "revision": "29a24276b4e445906575d014f347ca49"
  },
  {
    "url": "assets/js/21.f20802c8.js",
    "revision": "b33a504980181ce66f952a07745318a8"
  },
  {
    "url": "assets/js/22.c24bd83b.js",
    "revision": "b4b4081d02a412db080624ba9e3d427b"
  },
  {
    "url": "assets/js/23.876dbf67.js",
    "revision": "eea2ebb86c7ea5e7c6efd98f05bc1c7b"
  },
  {
    "url": "assets/js/24.1c3fa819.js",
    "revision": "9442570ab718fd3dd17a8b98025f0470"
  },
  {
    "url": "assets/js/25.c2be21e8.js",
    "revision": "8cbb10f41e95a7c4c398a4fb14b321a7"
  },
  {
    "url": "assets/js/26.9eb021e3.js",
    "revision": "92a8db309add16378baae3e0be696ec9"
  },
  {
    "url": "assets/js/27.957c6be2.js",
    "revision": "963b6e4e43667fb333925a75854eb21c"
  },
  {
    "url": "assets/js/28.37f33672.js",
    "revision": "9134f15e3ca8ecb97cfcae52213b3ad8"
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
    "url": "assets/js/30.489d1666.js",
    "revision": "d1817eaeb4b0d94dd9c053035b4685c8"
  },
  {
    "url": "assets/js/31.07f1259f.js",
    "revision": "1fbd8783ec1e9619b0bc46c70d30fb71"
  },
  {
    "url": "assets/js/32.3e6ec855.js",
    "revision": "8afa77271948c1dc01600ca624214ef7"
  },
  {
    "url": "assets/js/33.5f0aeba6.js",
    "revision": "2ac5ceda957a7d9243ae3e27c5f730da"
  },
  {
    "url": "assets/js/34.32c44897.js",
    "revision": "65e5903ac752907b8581e2a616bcb974"
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
    "url": "assets/js/37.9d4e0d4c.js",
    "revision": "2a6a22eb9b672e5d3d8dfc7ba632b7dd"
  },
  {
    "url": "assets/js/38.95374faa.js",
    "revision": "29ab2d8bef6f1ca4ede2b4f939a498c6"
  },
  {
    "url": "assets/js/39.ae81f180.js",
    "revision": "8c8417b22e3ebbf479cd9c77b0417ddd"
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
    "url": "assets/js/41.c93e386f.js",
    "revision": "4b7526e4f13e771bd77e9a50b091676d"
  },
  {
    "url": "assets/js/42.30c8b019.js",
    "revision": "5d1a841084c61dd85aabce8678e9ae51"
  },
  {
    "url": "assets/js/43.dd175bc4.js",
    "revision": "83cc07f321ba83731500a9568cba45fa"
  },
  {
    "url": "assets/js/44.b5213dfa.js",
    "revision": "3afa7e07d30c53c6265323b32826727e"
  },
  {
    "url": "assets/js/45.71f21be7.js",
    "revision": "31d8e200ae3d8625373caf6934d3cfa1"
  },
  {
    "url": "assets/js/46.a74b0c12.js",
    "revision": "b27a8a51de3448478b8109fe861e513c"
  },
  {
    "url": "assets/js/47.59bb3ec2.js",
    "revision": "7c0dcd8010cbb1d4e5d0139cadc16601"
  },
  {
    "url": "assets/js/48.9d9531ad.js",
    "revision": "b4649b41424d6ce3f6674cce7e40958e"
  },
  {
    "url": "assets/js/49.f8fc39e0.js",
    "revision": "2ab2633ecb8a10c3778275cda3220d85"
  },
  {
    "url": "assets/js/5.612dc22d.js",
    "revision": "58c4483416df5853ff9e544f2459f30e"
  },
  {
    "url": "assets/js/50.fe89bc1c.js",
    "revision": "0d580ac5785dc1ea795cd0f77cd467bc"
  },
  {
    "url": "assets/js/51.3a33589a.js",
    "revision": "c529e0a153e087663c00fb4ac4c16f56"
  },
  {
    "url": "assets/js/52.b8026cd5.js",
    "revision": "74351e75e005650602a351ef52a45521"
  },
  {
    "url": "assets/js/53.25c8a092.js",
    "revision": "4755e926b16d7e7040146efe51c05342"
  },
  {
    "url": "assets/js/54.93e5ceb2.js",
    "revision": "29ac77a19808c0d581e8bba940c41c1c"
  },
  {
    "url": "assets/js/55.c6569a40.js",
    "revision": "77e726f272aa10cecb1143cf9b474444"
  },
  {
    "url": "assets/js/56.b1de2e32.js",
    "revision": "d6a826c38a29753c3f8f000bd4ad5be1"
  },
  {
    "url": "assets/js/57.562e9d38.js",
    "revision": "5421c6f037d3235a617709a404dafd8e"
  },
  {
    "url": "assets/js/58.09c681fc.js",
    "revision": "0bb52f377eee29673a5aa8e1e2c7989e"
  },
  {
    "url": "assets/js/59.66afa234.js",
    "revision": "7df857f246e70873c91378cbdfa48bdf"
  },
  {
    "url": "assets/js/6.ccc11c65.js",
    "revision": "fa5fb0190e100a04f14aac95a35e58b5"
  },
  {
    "url": "assets/js/60.4be783b8.js",
    "revision": "98bc02bc42309d9c2b5179dce3d7fb8a"
  },
  {
    "url": "assets/js/61.fb26c5b2.js",
    "revision": "8b7b40740805e060f04aaf43935d42f8"
  },
  {
    "url": "assets/js/62.4df0d4f3.js",
    "revision": "811e93fcd521cc386c96ef55359f608f"
  },
  {
    "url": "assets/js/63.81161c74.js",
    "revision": "435078b0dda00e81e52d7371f872a428"
  },
  {
    "url": "assets/js/64.e0b4dd35.js",
    "revision": "2e4763c813cc75b64c6a8d28395209a0"
  },
  {
    "url": "assets/js/65.825109aa.js",
    "revision": "8728ead3e4f2eb6fcd794969fd59215b"
  },
  {
    "url": "assets/js/66.05eeae08.js",
    "revision": "9ec321ea16ec663137a95e1348d97dc9"
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
    "url": "assets/js/7.511b542c.js",
    "revision": "d0e9a68d0af46792ad09616301ec96ef"
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
    "url": "assets/js/app.a02005bb.js",
    "revision": "33cbd166af2f606e72763538756d351d"
  },
  {
    "url": "assets/js/vendors~flowchart.543d9c9f.js",
    "revision": "7e399309a80d906d7115b249ee7268cb"
  },
  {
    "url": "big-data/index.html",
    "revision": "3999208c6e1bc7d2e41d1804c1095db1"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "acc6943d6df4f633d37fccc8b9c9e555"
  },
  {
    "url": "c/index.html",
    "revision": "b67d77fb1a2a0ba7ff98a6e39de686d1"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "61afeb84d71cca97f60c6bdca7caf8b1"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "39d86d695b1ec01ad5635656c22aeec4"
  },
  {
    "url": "deep-learning/python-and-vectorization.html",
    "revision": "6012041d9ecbfb9b6c6b6cfe0ae613b2"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "hello-world/array-and-linked-list.html",
    "revision": "d9566dfb484906915f6469196af0ad96"
  },
  {
    "url": "hello-world/binary-search.html",
    "revision": "0c822b7989be2ec38e115142f919e4a6"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "bceb3495a24b5231e555c5fa2437c736"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "c491611437e4d7f4609ea111eb891081"
  },
  {
    "url": "hello-world/index.html",
    "revision": "98a74cf51b1478628c96afff8370b01d"
  },
  {
    "url": "hello-world/setup-a-server-manually.html",
    "revision": "3a3dad436b4694f76d201eceb62dab97"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "c0739f83e197640a53c37719d3a42a6f"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "de6811a3b59972bcf54cc151f3e78b65"
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
    "revision": "f34675d562616fea155d64420e6a9cf3"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "dc120070f6883337ec4a17f2c28d2043"
  },
  {
    "url": "java/API-io.html",
    "revision": "48a1aca3843f61ad9f4796ab83ecaadf"
  },
  {
    "url": "java/API-lang.html",
    "revision": "5f03d4ecda486c87543f1d80b5de7ef0"
  },
  {
    "url": "java/API-util.html",
    "revision": "48c5c6fb7e05535840f0ad5369229008"
  },
  {
    "url": "java/grammars.html",
    "revision": "c9d52d26aad62b49b7fb5ce349116020"
  },
  {
    "url": "java/index.html",
    "revision": "5e6a11405283220fb873b41d4560aaeb"
  },
  {
    "url": "java/jvm.html",
    "revision": "0ec772c813813e1bd1cbbdb26ed2c506"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "57d798a072e5dc7f5f328e64d877ad29"
  },
  {
    "url": "java/references.html",
    "revision": "5c5eb2366efba09e0aa62342afe1bc85"
  },
  {
    "url": "kotlin/index.html",
    "revision": "c32fe31de117078a24234d33ce3fde89"
  },
  {
    "url": "math/index.html",
    "revision": "621ec212752b4190ced0516787566db3"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "42c3830f987f178bac943acf892a65f6"
  },
  {
    "url": "mysql/divide.html",
    "revision": "603b8938d1c59778d6ea7035b0dcd4a4"
  },
  {
    "url": "mysql/index.html",
    "revision": "b860c9e1793ef9eb6249c593c237f0a9"
  },
  {
    "url": "mysql/indices.html",
    "revision": "73cb875eac3c93f5d134180b8684fb02"
  },
  {
    "url": "mysql/lock.html",
    "revision": "7207fdfa019d3c05d3f412f6b92ae25a"
  },
  {
    "url": "mysql/question.html",
    "revision": "bdc1bb296b63d1de4e1599f770e73da8"
  },
  {
    "url": "mysql/references.html",
    "revision": "52bfc43aa82f7a7f91c0f9ab2d6374be"
  },
  {
    "url": "mysql/transaction.html",
    "revision": "b45b1ca12b10ca815c983cd90def5dea"
  },
  {
    "url": "python/grammar.html",
    "revision": "83697ba40921bd55b3eeabcf95b17b9f"
  },
  {
    "url": "python/index.html",
    "revision": "5b242ca48671a6ee252ff605848a22aa"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "0a7dc7c7a83c65d91d52e54f81c58f5f"
  },
  {
    "url": "recommender-systems/index.html",
    "revision": "cdb8e80d9f736faadaa995dad9d3a694"
  },
  {
    "url": "recommender-systems/introduction.html",
    "revision": "43e2e3c88169b04941ddabe45db918ea"
  },
  {
    "url": "redis/cache.html",
    "revision": "8295cd9f8d3459b4c0dd619fb49e3cdc"
  },
  {
    "url": "redis/cluster.html",
    "revision": "a0d4aa6ed500f538d4b3908dc8c97350"
  },
  {
    "url": "redis/index.html",
    "revision": "a0005b7ad529a69105bdd34db926ecff"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "4956f8eb98ec4dedd5b3c059884400bc"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "918478bce10d8c13d82aeb96e9010867"
  },
  {
    "url": "spring/index.html",
    "revision": "5fd6c54439d45d47eb345e377147f93a"
  },
  {
    "url": "spring/ioc.html",
    "revision": "682ff2b13f69973f13716d463d657e89"
  },
  {
    "url": "spring/overall.html",
    "revision": "62c96ac888ac4f7fdd851c3792ff9ef9"
  },
  {
    "url": "spring/references.html",
    "revision": "0134ae2134b97936cd697b4cb56878a8"
  },
  {
    "url": "web/HTTP.html",
    "revision": "f08240986287e25128fc70a49e9330fd"
  },
  {
    "url": "web/index.html",
    "revision": "e00d45ebf152454538a706675b3b69a9"
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
