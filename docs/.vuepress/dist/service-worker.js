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
    "revision": "739b6fff1684d7f86a552e16429a4cea"
  },
  {
    "url": "about/index.html",
    "revision": "53a05db7394dd25ed44d5837c5727a88"
  },
  {
    "url": "algorithm/ds-001.html",
    "revision": "6a614b1fdfdcf21c50f369404a619783"
  },
  {
    "url": "algorithm/ds-002.html",
    "revision": "55aee8ea2361bd8a9a23c98c832d91dd"
  },
  {
    "url": "algorithm/index.html",
    "revision": "2b2f22f99e422db46acbe02c6042c4e9"
  },
  {
    "url": "artificial-intelligence/index.html",
    "revision": "ac7a3bd6ffd514304fa589946da2689a"
  },
  {
    "url": "artificial-intelligence/search-strategies.html",
    "revision": "32f5d776a7fe646b1308299aa08e6567"
  },
  {
    "url": "assets/css/0.styles.6382141a.css",
    "revision": "445fa596d1ca431a128e827ff4503165"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.fe0e250d.js",
    "revision": "fe760b5ecad96571eefc33ad45ad502e"
  },
  {
    "url": "assets/js/11.377fe7da.js",
    "revision": "b313a51fdae7eee2c1b3a30f08c13475"
  },
  {
    "url": "assets/js/12.ccd325c1.js",
    "revision": "be4635fc54af8d29829f27525c86a5e6"
  },
  {
    "url": "assets/js/13.6c0d3027.js",
    "revision": "863c4d2a5abcd4f8c9450a5bd56db630"
  },
  {
    "url": "assets/js/14.0ebeb0b6.js",
    "revision": "65be1437235e9a6eac5abb2e85e7f2d3"
  },
  {
    "url": "assets/js/15.e8bce24c.js",
    "revision": "da98e9efd63c9ff9f93435634ff459ef"
  },
  {
    "url": "assets/js/16.65acd3b7.js",
    "revision": "99ccab804f50007cb8b6075b03056964"
  },
  {
    "url": "assets/js/17.4611a966.js",
    "revision": "63ecc3e598fde5dcf123eb87e47d9f16"
  },
  {
    "url": "assets/js/18.ada155a4.js",
    "revision": "16e848ac0d34fd8710fa4c47165b88eb"
  },
  {
    "url": "assets/js/19.b9bdfd70.js",
    "revision": "8d41868284eb92008c73c5d42d38a3ae"
  },
  {
    "url": "assets/js/20.32b144a7.js",
    "revision": "85737f3e88a9b06a63ed93e10144a28a"
  },
  {
    "url": "assets/js/21.227845b5.js",
    "revision": "b8bc59f8f3bccd608a1e1971465c8e84"
  },
  {
    "url": "assets/js/22.597cde87.js",
    "revision": "52f13c20ad195cfe48f8a7f04c80e8a0"
  },
  {
    "url": "assets/js/23.7b244d11.js",
    "revision": "fe99f1315f92d1db8a796c284687fdf4"
  },
  {
    "url": "assets/js/24.5f4402ca.js",
    "revision": "f2d116308f1e823f39b87f0b27ba7b2e"
  },
  {
    "url": "assets/js/25.657eb588.js",
    "revision": "bf12e6bb5421edb20276b4788ef1b6b8"
  },
  {
    "url": "assets/js/26.077cf8f9.js",
    "revision": "f98cfed89331d70a798e0b1b8ee0b8bd"
  },
  {
    "url": "assets/js/27.977b6e0a.js",
    "revision": "c8c99aa3f25d04490579931b2bdf2698"
  },
  {
    "url": "assets/js/28.2d167c49.js",
    "revision": "1038080d5e6985d7eea1e642a965d609"
  },
  {
    "url": "assets/js/29.6ea5cdf0.js",
    "revision": "e33e91eef8a2a97c2c1bbb6e6d6b6610"
  },
  {
    "url": "assets/js/3.3e1ac6b4.js",
    "revision": "4ac3af4caa8533704b32e681ac65f6fe"
  },
  {
    "url": "assets/js/30.4dce4b5f.js",
    "revision": "f6a858b65837dc739d58a1711e96b1f4"
  },
  {
    "url": "assets/js/31.494e82a9.js",
    "revision": "3fc9a5f3c642145aaa4d3607dc453ef7"
  },
  {
    "url": "assets/js/32.0526aff0.js",
    "revision": "ba8006463bf2751c678b306be0a5bdaf"
  },
  {
    "url": "assets/js/33.5d8a2978.js",
    "revision": "d607e21237e819c466d56e6ffe11bacf"
  },
  {
    "url": "assets/js/34.f2fb8659.js",
    "revision": "8f1b808d903b575fd52ef25a88d28b4a"
  },
  {
    "url": "assets/js/35.44134598.js",
    "revision": "56cfc7882a8a908fa7060bfcf2e6e4e8"
  },
  {
    "url": "assets/js/36.85135098.js",
    "revision": "dfc8f5658e8803fab133d23d4921ae21"
  },
  {
    "url": "assets/js/37.7899c506.js",
    "revision": "b55f2968da7c5670d3a6ac6e3c662738"
  },
  {
    "url": "assets/js/38.f43b917e.js",
    "revision": "3b4d06acda96076e610584acff74f53e"
  },
  {
    "url": "assets/js/39.08f3caea.js",
    "revision": "9d8e46ce04da93bb7dd14344224d3db1"
  },
  {
    "url": "assets/js/4.f7f5e982.js",
    "revision": "9d2e5a861a4005910b65f66bc69e6270"
  },
  {
    "url": "assets/js/40.9ef62d37.js",
    "revision": "ef240a3c721054783d8a0fc132315290"
  },
  {
    "url": "assets/js/41.38b72c91.js",
    "revision": "629bf2c58a9d76f0a164f391455eaf5e"
  },
  {
    "url": "assets/js/42.a1e6f296.js",
    "revision": "373823b0500159b1c043d708b3437c38"
  },
  {
    "url": "assets/js/43.a47fbb9a.js",
    "revision": "809a330ded8e26191afabcbc928028cc"
  },
  {
    "url": "assets/js/44.60baef14.js",
    "revision": "ac950f63f8efd0040ec3b15f785a741c"
  },
  {
    "url": "assets/js/45.3f9fd9aa.js",
    "revision": "0ea3e15ffe303960f64556545d67a388"
  },
  {
    "url": "assets/js/46.3a6e3e46.js",
    "revision": "940e565aedf25fcf2560eaef62ae16ba"
  },
  {
    "url": "assets/js/47.9f1ec43e.js",
    "revision": "88376fb138650a14a573ba6f98efd44a"
  },
  {
    "url": "assets/js/48.480f7d0b.js",
    "revision": "f16b24299f850cfdcd62d3e39f69034f"
  },
  {
    "url": "assets/js/49.b039a9b1.js",
    "revision": "0918fc879d01650d40de9d5fc3a557f8"
  },
  {
    "url": "assets/js/5.98c08254.js",
    "revision": "409919467e8346e19b1ba72e115a731d"
  },
  {
    "url": "assets/js/50.0b20964e.js",
    "revision": "008abd54ceb2e356ef2d5406ea837516"
  },
  {
    "url": "assets/js/51.ecfc0f3f.js",
    "revision": "f1fddd3574dd30b7a7c7e7c42f5d721b"
  },
  {
    "url": "assets/js/52.dcf41ff6.js",
    "revision": "3b409cf05eb99315b69c65811b7d51f1"
  },
  {
    "url": "assets/js/53.3b9c4981.js",
    "revision": "9d2656ab60fda3614ac84cfa031a64fa"
  },
  {
    "url": "assets/js/54.842ea5eb.js",
    "revision": "87fd761622a61510f7a8cf226eed694a"
  },
  {
    "url": "assets/js/55.f9448f1b.js",
    "revision": "338c5e87b3bab40a864f4f6ebcbfd28b"
  },
  {
    "url": "assets/js/56.b42eec06.js",
    "revision": "fd8d9c89d536df8676ec3c36a8a485ed"
  },
  {
    "url": "assets/js/57.b8518cf2.js",
    "revision": "bbd7ccb27021218f4cbbebbfeb46e4df"
  },
  {
    "url": "assets/js/58.41452984.js",
    "revision": "226537e687f0862ed4e48d4c45d37efa"
  },
  {
    "url": "assets/js/59.210624a7.js",
    "revision": "3d41f4f7154f3a2863b3f84686b8684e"
  },
  {
    "url": "assets/js/6.e268b5c2.js",
    "revision": "fb15d874abb0511281c2a91914b6b46c"
  },
  {
    "url": "assets/js/60.08c56de9.js",
    "revision": "678dc2c3af8b81a62ee558be341882c5"
  },
  {
    "url": "assets/js/61.b0a8d00e.js",
    "revision": "028f825de22dfd7a2b951d39960658be"
  },
  {
    "url": "assets/js/62.ba7f065f.js",
    "revision": "966bbd5fca79adeee6d65fe001914713"
  },
  {
    "url": "assets/js/7.feb426c8.js",
    "revision": "3aaec4acc0b7fe40f600b7cff0b29f53"
  },
  {
    "url": "assets/js/8.c65feb50.js",
    "revision": "8e51264d351f975a047d3ffca885fa28"
  },
  {
    "url": "assets/js/9.a312f3a9.js",
    "revision": "c03d4adba9f2e73f65e4856ad04f125e"
  },
  {
    "url": "assets/js/app.9a138a22.js",
    "revision": "93c8b044441e583fa8d4ce1e1c08306e"
  },
  {
    "url": "assets/js/vendors~flowchart.d3fd88fa.js",
    "revision": "ee1c0e4af157c73482b46746eee156c7"
  },
  {
    "url": "big-data/index.html",
    "revision": "552b1f7b74a3fc0758601bed8b82a97e"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "c486f7997e291736ae63db01ccc56c2c"
  },
  {
    "url": "c/index.html",
    "revision": "e22148fe8674f4cc1143570ff11e41af"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "38021888f6ddad3d7de7984e9d74bcf0"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "62708a2fd52ce80de673995851acc95c"
  },
  {
    "url": "deep-learning/python-and-vectorization.html",
    "revision": "f02d8791e377ea57e63d3267033054c0"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "front-end/index.html",
    "revision": "99a38159b7a8cff24c3bf94e58aa1dc6"
  },
  {
    "url": "hello-world/array-and-linked-list.html",
    "revision": "43e12e0ca4ad477a060a7c79703043dd"
  },
  {
    "url": "hello-world/binary-search.html",
    "revision": "7ab7a4542ca52855f56274bcd381ea05"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "9a1bc6e3a6048a104d2878701c12bfc8"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "af11d7787990643c4fbe074329647663"
  },
  {
    "url": "hello-world/index.html",
    "revision": "9da689af389d19326013b14d13b6f79a"
  },
  {
    "url": "hello-world/setup-a-server-manually.html",
    "revision": "0ecc1835c6216a4a4a74d1044df396a7"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "a64f7538061eeafb2f1fc5675a984871"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "12c21036efcc05d788b7a828623c2341"
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
    "revision": "3d42deb481ea6f4e036cc7dd64c1414f"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "a70285bbd24427aa97c61c1f8a3fc46d"
  },
  {
    "url": "java/API-io.html",
    "revision": "17287e0f15299c92033b9ccf6d0b7caf"
  },
  {
    "url": "java/API-lang.html",
    "revision": "779f507d376c3bd51010a9de065ff2c5"
  },
  {
    "url": "java/API-util.html",
    "revision": "350bcab868100bdd9df05a2c9b60fa1a"
  },
  {
    "url": "java/grammars.html",
    "revision": "692cd81bc566a1798cdb51312b74f5cd"
  },
  {
    "url": "java/index.html",
    "revision": "80e09345485d0dfa7d78cd939e96637d"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "7ee1e35e70dedaf9b37430ea2f3e2f2b"
  },
  {
    "url": "java/references.html",
    "revision": "81e994f8c4560656c96f7ecf6a31103e"
  },
  {
    "url": "kotlin/index.html",
    "revision": "6f1d95587e0632db7c5fe540decaa0bb"
  },
  {
    "url": "math/index.html",
    "revision": "61b3849a40451bcfc5091b8f3ff34dfe"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "38279eff059e0d2dc80b81b9d41f2322"
  },
  {
    "url": "mysql/divide.html",
    "revision": "f2b0efaf0f6624b632010e8ee9fd5fbe"
  },
  {
    "url": "mysql/index.html",
    "revision": "5672fb3137a2faf3148f52504a9cb796"
  },
  {
    "url": "mysql/indices.html",
    "revision": "7010176d75e902da5c5dfec062bcba94"
  },
  {
    "url": "mysql/lock.html",
    "revision": "65de94ab88376f3ae189f341b30fb59a"
  },
  {
    "url": "mysql/question.html",
    "revision": "cdfc90f2fd2f9141c8d487f9b24a7499"
  },
  {
    "url": "mysql/references.html",
    "revision": "85fd1f049187e16c529f3a0a56697152"
  },
  {
    "url": "mysql/transaction.html",
    "revision": "b9ca387e2d312a84103f323fce873350"
  },
  {
    "url": "python/grammar.html",
    "revision": "7cb3fdf0d60940225e6375e9d5d2e3ed"
  },
  {
    "url": "python/index.html",
    "revision": "7ac1cf42f66e084fa4c926831a5c93d2"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "e8d5fbc46c9d0be630b9272b4e208dc7"
  },
  {
    "url": "recommender-systems/index.html",
    "revision": "95ed1fcde797664f86d1ecff2a696995"
  },
  {
    "url": "recommender-systems/introduction.html",
    "revision": "7cc8766e7b74acc9579e68c717929768"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "8c93e6c64f4443671f09256fc9dbbd76"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "633f5b243b4089d6ed55499bcfd0631c"
  },
  {
    "url": "spring/index.html",
    "revision": "52850e4c0d20f55806181933b483f7c4"
  },
  {
    "url": "spring/ioc.html",
    "revision": "0ce75e1451210b80d693c69dc470912d"
  },
  {
    "url": "spring/overall.html",
    "revision": "223617eac9e8d5b39a215d71a73f19d8"
  },
  {
    "url": "spring/references.html",
    "revision": "d8f3de5fb3a38a23cd961f38671c7e8a"
  },
  {
    "url": "web/HTTP.html",
    "revision": "961dacc679398fd75eb4ee8ffe79386e"
  },
  {
    "url": "web/index.html",
    "revision": "9c727674620a22d3b4cbe16435690f2f"
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
