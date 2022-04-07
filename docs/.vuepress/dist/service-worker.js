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
    "revision": "29f555b0b1dce7f2ad61c6c05605a268"
  },
  {
    "url": "about/index.html",
    "revision": "61804523202ce0861459b5257dbb74e4"
  },
  {
    "url": "algorithm/ds-001.html",
    "revision": "3c73cd44bcf5e8d314c24f7dcac74c91"
  },
  {
    "url": "algorithm/ds-002.html",
    "revision": "03f19f85dbc6d3a9f05bae3429df6d3d"
  },
  {
    "url": "algorithm/ds-003.html",
    "revision": "cec43a879d855d1e1209e2088525eca8"
  },
  {
    "url": "algorithm/dynamic-programming.html",
    "revision": "6c0e3dcda78605893600aee5a4fcacb6"
  },
  {
    "url": "algorithm/index.html",
    "revision": "553612e3c0361f67ca4fdcdba65ed730"
  },
  {
    "url": "artificial-intelligence/index.html",
    "revision": "7b45fc13b912bd0b0c79aedf17e22e9c"
  },
  {
    "url": "artificial-intelligence/search-strategies.html",
    "revision": "c20d4dc24f4b89098abb7370d5927cfd"
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
    "url": "assets/js/10.b1255ef6.js",
    "revision": "9f0ac999b4c53aeff01e21352819206b"
  },
  {
    "url": "assets/js/11.e8d2e24a.js",
    "revision": "a583ed0cd59615acd5e16c7f285d291f"
  },
  {
    "url": "assets/js/12.00e6435a.js",
    "revision": "24d58abd746486530801aaf82f4e86e0"
  },
  {
    "url": "assets/js/13.b70ef17a.js",
    "revision": "e0874858d412e0365abd9e81706b0dc9"
  },
  {
    "url": "assets/js/14.66c52588.js",
    "revision": "5fe4b2472b9ed2af2725e5f3e1f04144"
  },
  {
    "url": "assets/js/15.4a9ac07e.js",
    "revision": "9632dc8bbee25d861ab8a2923eee7f99"
  },
  {
    "url": "assets/js/16.278ab374.js",
    "revision": "459cfe45c5f654964f1d1357cc42c698"
  },
  {
    "url": "assets/js/17.88d94586.js",
    "revision": "180d1145f383358a60d6a79072a0563a"
  },
  {
    "url": "assets/js/18.94d0877c.js",
    "revision": "98897b3790369ffbcc1780c40e576c3a"
  },
  {
    "url": "assets/js/19.82127e8c.js",
    "revision": "78345970a53fe251943bd7a652fae139"
  },
  {
    "url": "assets/js/20.ce49d80b.js",
    "revision": "29a24276b4e445906575d014f347ca49"
  },
  {
    "url": "assets/js/21.1b660895.js",
    "revision": "0a7d146aff8f1d549765fae4e37e830a"
  },
  {
    "url": "assets/js/22.772dcc66.js",
    "revision": "3595d7c019e5a81f953f15995fd95f23"
  },
  {
    "url": "assets/js/23.35bca617.js",
    "revision": "4533454ed7a2faf674b01bd420466220"
  },
  {
    "url": "assets/js/24.20e4da85.js",
    "revision": "5eef316962d9aca586c843e650d80136"
  },
  {
    "url": "assets/js/25.e4daca47.js",
    "revision": "aa747da953c11e2d3ada25c5d826225a"
  },
  {
    "url": "assets/js/26.56748bca.js",
    "revision": "488a66156bc8e7e0e1ac43b76c778f86"
  },
  {
    "url": "assets/js/27.9fc29358.js",
    "revision": "a8bba6ffbe4e9fdf491023d655392bc8"
  },
  {
    "url": "assets/js/28.c1cb269e.js",
    "revision": "619e9fcbbd12bb9ee4ce935b8ce89320"
  },
  {
    "url": "assets/js/29.3a3eb0cc.js",
    "revision": "759c10b9a631b994048041fc409deeed"
  },
  {
    "url": "assets/js/3.7837b6f0.js",
    "revision": "5666ccc39e11f2b5280d890c65c9d68d"
  },
  {
    "url": "assets/js/30.7d32497d.js",
    "revision": "79ee73b31e71c497304d62a7e9159064"
  },
  {
    "url": "assets/js/31.5ec66dac.js",
    "revision": "0783a0134cc4486839d75174e8d95daa"
  },
  {
    "url": "assets/js/32.8f0c6a0b.js",
    "revision": "7870b84498dbf29f66a8a9df0dc9e67c"
  },
  {
    "url": "assets/js/33.725218da.js",
    "revision": "8ecd04b324c2839b8d97b22bd02c1a4c"
  },
  {
    "url": "assets/js/34.eb78e149.js",
    "revision": "9a1cefe5876478139c1224817660fc67"
  },
  {
    "url": "assets/js/35.9534c1fe.js",
    "revision": "8080313c8a017cf152301b14f5700d89"
  },
  {
    "url": "assets/js/36.1c3a08f3.js",
    "revision": "410398af403fba0c91d3dd5daed518a9"
  },
  {
    "url": "assets/js/37.6a74583c.js",
    "revision": "704581d2adeac8f3aa39091d7c11958e"
  },
  {
    "url": "assets/js/38.9c47309a.js",
    "revision": "d8f34fc17d2f0619d1d694f537741fef"
  },
  {
    "url": "assets/js/39.2907a5f6.js",
    "revision": "02debbeb6f3f7daadf5795b5d0b06667"
  },
  {
    "url": "assets/js/4.82cbc76e.js",
    "revision": "ae37a1a9fed70cb970eb2fc85a834f1c"
  },
  {
    "url": "assets/js/40.8da4121f.js",
    "revision": "1f222bb3944668ce0936b7956f050618"
  },
  {
    "url": "assets/js/41.e172a3be.js",
    "revision": "5fca772a624c984a190e80ff0708598b"
  },
  {
    "url": "assets/js/42.c32831af.js",
    "revision": "eb1d6ddcb4edb2035efb03daa6a3b915"
  },
  {
    "url": "assets/js/43.5c5a9a53.js",
    "revision": "af1caba3673230ddaedce48ee0d1a5b0"
  },
  {
    "url": "assets/js/44.7edfa0dc.js",
    "revision": "0012bcf9649aa4d084c4a2513a852fce"
  },
  {
    "url": "assets/js/45.c448965d.js",
    "revision": "c2d6ea5c3eb2f1da044168e74ca20a37"
  },
  {
    "url": "assets/js/46.f3af59b7.js",
    "revision": "9ca7771aa71540c8953605a231ea2e21"
  },
  {
    "url": "assets/js/47.cbc913ba.js",
    "revision": "ea09b951f7e1a5b019ebf419f50ddea1"
  },
  {
    "url": "assets/js/48.241ef44d.js",
    "revision": "5f6940b5b9d2496520718017f02cfbb2"
  },
  {
    "url": "assets/js/49.0957c9ae.js",
    "revision": "e3be8a5fd8c1988ee9c7632088636e55"
  },
  {
    "url": "assets/js/5.2082fc82.js",
    "revision": "58c4483416df5853ff9e544f2459f30e"
  },
  {
    "url": "assets/js/50.2384b3a0.js",
    "revision": "1dd6cf6b036c0175a77b2045b65c557b"
  },
  {
    "url": "assets/js/51.2f738a0c.js",
    "revision": "741fff5c3e892f4c777e2bca1775d169"
  },
  {
    "url": "assets/js/52.69868562.js",
    "revision": "759794c26511e4a5fc3338ccee3c314f"
  },
  {
    "url": "assets/js/53.de476767.js",
    "revision": "911a2b0fb98907a02dbf7a9962814dca"
  },
  {
    "url": "assets/js/54.fb0ce667.js",
    "revision": "ea9247afc98542453c7b8215cfe83081"
  },
  {
    "url": "assets/js/55.e7a3e5bc.js",
    "revision": "efb94a37d51a525fb06b34a9907273bd"
  },
  {
    "url": "assets/js/56.f1bc409f.js",
    "revision": "4fde46546ccb046e02e6345f4c519429"
  },
  {
    "url": "assets/js/57.9aa81a5f.js",
    "revision": "a5df658df002df818a377239bd8115b1"
  },
  {
    "url": "assets/js/58.c7f230c4.js",
    "revision": "4cb087bd8a177690b9d9757dcd562a89"
  },
  {
    "url": "assets/js/59.f2965bf4.js",
    "revision": "6e23343fb38367e861289abe7cedd74f"
  },
  {
    "url": "assets/js/6.6023aaa4.js",
    "revision": "ef53ffaa87876d27611b2baeac5a9367"
  },
  {
    "url": "assets/js/60.66581e06.js",
    "revision": "4c322312603fad6f94eaa35a03dda0ea"
  },
  {
    "url": "assets/js/61.1ba31bba.js",
    "revision": "6dc3788905cb45de3ddc482550229d8e"
  },
  {
    "url": "assets/js/62.7cc1e925.js",
    "revision": "9a07cf6b9b50c729393d7a200261dd15"
  },
  {
    "url": "assets/js/63.2d74e6cb.js",
    "revision": "3cdbbedd8f0a1fa018beb6eb9ef71ddf"
  },
  {
    "url": "assets/js/64.f5d7dd41.js",
    "revision": "d0e7f57ab6631517ede3cd1fdf04fcc5"
  },
  {
    "url": "assets/js/65.9dc1dc89.js",
    "revision": "5dfa92ebd1c8dffa8780f1bf76bdb1b3"
  },
  {
    "url": "assets/js/66.4088197c.js",
    "revision": "5e62ba4ce7cde5043fbba82b373b0ca5"
  },
  {
    "url": "assets/js/67.528a8746.js",
    "revision": "e9c41e29008163074a206181cf2ab58a"
  },
  {
    "url": "assets/js/68.1f1d436b.js",
    "revision": "42641a0702a69b5905ea6f1df0490dc8"
  },
  {
    "url": "assets/js/69.bc4f6b90.js",
    "revision": "715ad3bf89d95a06a61ec6a51474e247"
  },
  {
    "url": "assets/js/7.abea3f3a.js",
    "revision": "bdb289c68bef3bb6c3d9d005c49b62bf"
  },
  {
    "url": "assets/js/70.726e5693.js",
    "revision": "e5b4d6b8c0e36fc2a861dbef57920bfc"
  },
  {
    "url": "assets/js/71.e4451a31.js",
    "revision": "390436c6c5b7ab6255720b896f8e5f85"
  },
  {
    "url": "assets/js/72.ac9e79e8.js",
    "revision": "9b5c2a77516f621d21603ec565fbe76c"
  },
  {
    "url": "assets/js/8.637bd5a9.js",
    "revision": "8190ae0a70588bfd4b8da47b13f12e7d"
  },
  {
    "url": "assets/js/9.08b642ec.js",
    "revision": "1f0efe70195914a228841599861bac0f"
  },
  {
    "url": "assets/js/app.788d2661.js",
    "revision": "e8e37981aa137d3ca618710efcf5c4a3"
  },
  {
    "url": "assets/js/vendors~flowchart.899652fe.js",
    "revision": "1a4a2e36ed845872fc6b862d84a31925"
  },
  {
    "url": "big-data/index.html",
    "revision": "fc3dd6d14ed20f2e6a5aa2ca431272b2"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "0739ae22d7855cb921cd4e93982bc2aa"
  },
  {
    "url": "c/index.html",
    "revision": "d37e6beaff69619948669626c806dd45"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "9b5980003f5c0fcb7fe3ffc322ddb6d9"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "2c149622b42884234845cd0213fe477e"
  },
  {
    "url": "deep-learning/python-and-vectorization.html",
    "revision": "9330133f93548568291700aec55a8529"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "hello-world/array-and-linked-list.html",
    "revision": "b58c0b6e21b66cf8a70d8b6b71a31679"
  },
  {
    "url": "hello-world/binary-search.html",
    "revision": "a55f6ceba94df5364a0c0a99e04fb6e7"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "3c5bee9ef4e7c56b98ecdd552bfd2197"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "b58f4c6fb4dfc4778d257b568c6bd379"
  },
  {
    "url": "hello-world/index.html",
    "revision": "89291053bb1e8d83145058a7394e22f4"
  },
  {
    "url": "hello-world/setup-a-server-manually.html",
    "revision": "7e05da04dbbd8156bdadf4c4771d1565"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "c697fee8c8429df192ecbf9e9a81729f"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "76addc395fd0b6c85e827b47d1320b2d"
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
    "url": "img/hashmap/单线程.jpg",
    "revision": "282b4e91d578488fa8899bff19bf98d3"
  },
  {
    "url": "img/hashmap/多线程1.jpg",
    "revision": "aa011bdee25edfa1cf365c4177d82e09"
  },
  {
    "url": "img/hashmap/多线程2.jpg",
    "revision": "740865cb37a7e7c6a30738ef8da9b077"
  },
  {
    "url": "img/hashmap/多线程3.jpg",
    "revision": "1d9beb0cf624bfb14527bccf05eecaf9"
  },
  {
    "url": "img/hashmap/多线程4.jpg",
    "revision": "296a53662866a6a3cdcd7e15cc181a31"
  },
  {
    "url": "img/hashmap/多线程5.jpg",
    "revision": "9e09b51b57d5046ce0c3592ab9309a47"
  },
  {
    "url": "img/hashmap/多线程6.jpg",
    "revision": "9f9368b586419ec79aa70c796796955f"
  },
  {
    "url": "img/hashmap/多线程7.jpg",
    "revision": "5defe4b85c931a1dabd76804df46802d"
  },
  {
    "url": "img/hashmap/多线程8.jpg",
    "revision": "bb1ffc26543d45b67efa7263aa069e1c"
  },
  {
    "url": "img/hashmap/多线程9.jpg",
    "revision": "f925744aef205fc91c5fa2f0323c683b"
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
    "url": "img/双亲委派.jpg",
    "revision": "6e1fc7c5aa4e23d552c9448508cd3bf2"
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
    "revision": "af3adccab1dc316debd3527175b29a5f"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "2017264e45ed30e41c8592e1ee4b38b6"
  },
  {
    "url": "java/API-io.html",
    "revision": "3c24cabfc06f78fa8fe64a2543880740"
  },
  {
    "url": "java/API-lang.html",
    "revision": "7e7f9fa05ffb9f979546e7411af21cf6"
  },
  {
    "url": "java/API-lang2.html",
    "revision": "b09474f1d48fd19b9b987c68131eab68"
  },
  {
    "url": "java/API-util.html",
    "revision": "4c277dc960c1c4b9d456c836180007f9"
  },
  {
    "url": "java/API-util2.html",
    "revision": "d1b47ac2767fd36a5c8f3b6c3ddba2cd"
  },
  {
    "url": "java/grammars.html",
    "revision": "0840a85e98eca428455449b447998e33"
  },
  {
    "url": "java/index.html",
    "revision": "4de4b4e3b4d950b8a6ce9019ed040730"
  },
  {
    "url": "java/jvm.html",
    "revision": "c98678a39e5482879366adf6ddd6e4f4"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "c1dd5513b4a3de83d54f6d4de720365f"
  },
  {
    "url": "java/references.html",
    "revision": "c1c4092533306e59e1c970955fe51009"
  },
  {
    "url": "kotlin/index.html",
    "revision": "b23ffdcf4182674c624bd84ac92b1805"
  },
  {
    "url": "math/index.html",
    "revision": "5f4987e258242db01bc6bee4c400b3f7"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "1f35489a953fb73e2646422a5be1e088"
  },
  {
    "url": "mysql/divide.html",
    "revision": "96421d313574b9601936e2c0a157c52d"
  },
  {
    "url": "mysql/index.html",
    "revision": "66913ffe896faceae69d0869854d46cf"
  },
  {
    "url": "mysql/indices.html",
    "revision": "7c93d4ef9801906693aecf9e04953303"
  },
  {
    "url": "mysql/lock.html",
    "revision": "c932069f7eecb2a8aad18cc291099db2"
  },
  {
    "url": "mysql/question.html",
    "revision": "7817af431a66e97f99c1a1949bcf17a8"
  },
  {
    "url": "mysql/references.html",
    "revision": "b4d445fb0254cee9f4fcb4a1e98bbda2"
  },
  {
    "url": "mysql/transaction.html",
    "revision": "f575e096f60cec3e478dd5372dc35b75"
  },
  {
    "url": "python/grammar.html",
    "revision": "ee688a82e710cebfdbec6efa585684fd"
  },
  {
    "url": "python/index.html",
    "revision": "956f3910735f9cab981edc54ceab7dcb"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "e83d13c7e75496bd15832ac397d401b4"
  },
  {
    "url": "recommender-systems/index.html",
    "revision": "4981d0dc431d251a8df26b136db2e4ae"
  },
  {
    "url": "recommender-systems/introduction.html",
    "revision": "e5252b5283f88cc3ea36eb1497df272c"
  },
  {
    "url": "redis/cache.html",
    "revision": "2ded96e6d90f61bead8a59ca71fdaa17"
  },
  {
    "url": "redis/cluster.html",
    "revision": "8fc045114fb085832cc177857f600e0d"
  },
  {
    "url": "redis/index.html",
    "revision": "51ef4f7139a0ae87a261ae9bd392b0b1"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "3ca17e4483810760a6078684e8ae65e7"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "accbda8e65851a2b02422710c4c43bf2"
  },
  {
    "url": "spring/index.html",
    "revision": "b4265eeaa74753c57e21677ad1c561a4"
  },
  {
    "url": "spring/ioc.html",
    "revision": "d9c648841e1000e93bc1b3817143f1bc"
  },
  {
    "url": "spring/overall.html",
    "revision": "df278a87fcbb57ea2ad2f6f2fb23c2e8"
  },
  {
    "url": "spring/references.html",
    "revision": "a629f398a1ea91333c82d01e20164ce9"
  },
  {
    "url": "web/HTTP.html",
    "revision": "1e6657dcf090948a9808a99d0d8b6e86"
  },
  {
    "url": "web/index.html",
    "revision": "8e2cb6a5ba2267259fc3a5bb7c746df6"
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
