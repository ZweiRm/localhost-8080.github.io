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
    "revision": "511c5a90e17b83daa31ebd28de27c506"
  },
  {
    "url": "about/index.html",
    "revision": "4f67bec9f535fcad1aebb74cad26eed0"
  },
  {
    "url": "algorithm/ds-001.html",
    "revision": "8765596f5710fa9ea57a7499b280f361"
  },
  {
    "url": "algorithm/ds-002.html",
    "revision": "fa52044379577329655588fb7e787e78"
  },
  {
    "url": "algorithm/ds-003.html",
    "revision": "25292001d7e251df22db942ecc7f86c2"
  },
  {
    "url": "algorithm/dynamic-programming.html",
    "revision": "8e1ca807e4242e2d0f202cc8e776b0f4"
  },
  {
    "url": "algorithm/index.html",
    "revision": "f5c59976aac77023044d51a8ea77c531"
  },
  {
    "url": "artificial-intelligence/index.html",
    "revision": "e4ad40a543304f489821eb3cfdf37eca"
  },
  {
    "url": "artificial-intelligence/search-strategies.html",
    "revision": "86b62d1c8fe8a56be9ea691e8ebf815b"
  },
  {
    "url": "assets/css/0.styles.8daecd82.css",
    "revision": "458710e396a5c9dfa9a445cf9c35e189"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.d03c1c94.js",
    "revision": "64cf5082d0a5a99fe3059d381c2a2162"
  },
  {
    "url": "assets/js/11.5449c472.js",
    "revision": "189f58014d73d67a7afacd620b4f30dc"
  },
  {
    "url": "assets/js/12.ffa371ff.js",
    "revision": "b020a2b05019cbab7f803d26a6c333b3"
  },
  {
    "url": "assets/js/13.f904733b.js",
    "revision": "919fa2e23276159629983384bc3dd89e"
  },
  {
    "url": "assets/js/14.50e7d4f5.js",
    "revision": "1ce0829a31b1ec716eabe26936b16a54"
  },
  {
    "url": "assets/js/15.9948268d.js",
    "revision": "9a25ec524ec6dc1d0a705e1ce68c7388"
  },
  {
    "url": "assets/js/16.fbc1d719.js",
    "revision": "b01fd83dbcf11ae0d122ef41abe4a5fa"
  },
  {
    "url": "assets/js/17.ac73dd31.js",
    "revision": "ed8bc3205e6237a7473bb008fc11e62d"
  },
  {
    "url": "assets/js/18.e900233e.js",
    "revision": "5153300ec5bfb5c5f9348a3c5c17c10a"
  },
  {
    "url": "assets/js/19.6ffb2557.js",
    "revision": "6ad894bdf9fc01a656ba6d1e2366aa13"
  },
  {
    "url": "assets/js/20.d34a975e.js",
    "revision": "956f727d4eb143204bd1ed3e48149216"
  },
  {
    "url": "assets/js/21.ee6ee61e.js",
    "revision": "8dbbbb8af1b55db9c533a993eb373d7c"
  },
  {
    "url": "assets/js/22.7980ca86.js",
    "revision": "81c4443058b4a15859b43b46db2d8952"
  },
  {
    "url": "assets/js/23.2a248509.js",
    "revision": "25f698f75b57cac87064e0e8441de977"
  },
  {
    "url": "assets/js/24.b65bbf39.js",
    "revision": "9455545c2f41f43228b7b19c616615f5"
  },
  {
    "url": "assets/js/25.a770b7c9.js",
    "revision": "1895cd66c974937a99d7e151a750df8a"
  },
  {
    "url": "assets/js/26.b1a17966.js",
    "revision": "f6267e1fe668b12d073d0e321f14521c"
  },
  {
    "url": "assets/js/27.dee33b8c.js",
    "revision": "7985a6c149a835830738c125c9ac657d"
  },
  {
    "url": "assets/js/28.a148cc7d.js",
    "revision": "b33286c0338f85d7d6ee2b671a3fbf4c"
  },
  {
    "url": "assets/js/29.0df29703.js",
    "revision": "e3d73e5e81f786b61f1427d5719f4cf9"
  },
  {
    "url": "assets/js/3.dc470578.js",
    "revision": "1b0b251673ec8d6c50707ed3fade3624"
  },
  {
    "url": "assets/js/30.1ac05fd6.js",
    "revision": "48348f1f490812c5e0c5151a968a62db"
  },
  {
    "url": "assets/js/31.066811ab.js",
    "revision": "896143da46e97e0eb1f98fbbeadf6fad"
  },
  {
    "url": "assets/js/32.9661ce04.js",
    "revision": "0237b66fa8f42be2f96273f8712903e8"
  },
  {
    "url": "assets/js/33.028ae567.js",
    "revision": "607f75bc7d7bbd5ad18910ceef9e39af"
  },
  {
    "url": "assets/js/34.346ef410.js",
    "revision": "bbc1baf3eb1b8e567b9fe0c2936b80c8"
  },
  {
    "url": "assets/js/35.79e2c8ad.js",
    "revision": "1b69662953278f40b38fcf4135a35079"
  },
  {
    "url": "assets/js/36.aa02cd46.js",
    "revision": "79cd7665d7be43008de6ca144c725389"
  },
  {
    "url": "assets/js/37.1b86390d.js",
    "revision": "b3bcc551d7a070dfc38c24da3b03442f"
  },
  {
    "url": "assets/js/38.66029fb5.js",
    "revision": "63350ab0678b4180212cc49c319bec1e"
  },
  {
    "url": "assets/js/39.773f7cb0.js",
    "revision": "7d92c330f4650d6875170296f75ba4d5"
  },
  {
    "url": "assets/js/4.26307ac0.js",
    "revision": "f7fe54a7045d2fbf3a24ae0dcece281b"
  },
  {
    "url": "assets/js/40.09b89705.js",
    "revision": "368fd7f51c83804a25e070de161c0379"
  },
  {
    "url": "assets/js/41.25c0fa7b.js",
    "revision": "a5455401048a408dcb41f3f712435103"
  },
  {
    "url": "assets/js/42.acfb14c1.js",
    "revision": "f870ad522c2a82acbc87f440b4b840ee"
  },
  {
    "url": "assets/js/43.43ba001d.js",
    "revision": "f6e1ab946d25c8411668e7d609a7408c"
  },
  {
    "url": "assets/js/44.7da91912.js",
    "revision": "60226e08e501170dbaf18b71df53316c"
  },
  {
    "url": "assets/js/45.6c621469.js",
    "revision": "cdf1bc3224400927c713ae1a13916658"
  },
  {
    "url": "assets/js/46.df0565ab.js",
    "revision": "4753c37da1a62e6de4972eb21d42c0f6"
  },
  {
    "url": "assets/js/47.63fde2fd.js",
    "revision": "1fe23e92d629c5435261271b406b6fbd"
  },
  {
    "url": "assets/js/48.4caa203e.js",
    "revision": "ccdc237f2ef39f1c2ace11a5fbe4ce80"
  },
  {
    "url": "assets/js/49.d10cbc0f.js",
    "revision": "7c944fcf0c0853b518bfc4c87d561348"
  },
  {
    "url": "assets/js/5.0e349cc0.js",
    "revision": "0f7f5b017c00dcda0ba9dfb84c88021c"
  },
  {
    "url": "assets/js/50.0b48b1da.js",
    "revision": "4a01bb3044c7e1a95b700cb8ef3ab0ea"
  },
  {
    "url": "assets/js/51.cc895fdc.js",
    "revision": "7c7e7c1c7e6a51da5064c2af14650667"
  },
  {
    "url": "assets/js/52.f2592bde.js",
    "revision": "a8f8ee2c9f5b908d767865c8b6ce907e"
  },
  {
    "url": "assets/js/53.3c1a8ab3.js",
    "revision": "10d728ff7b632a89bb1c3fd166a4e35d"
  },
  {
    "url": "assets/js/54.878fee63.js",
    "revision": "ee103ff8ae075bba73f16403d1820cf7"
  },
  {
    "url": "assets/js/55.3cb118b1.js",
    "revision": "6d39e54fdb6b9d9d1b736497f392d6e5"
  },
  {
    "url": "assets/js/56.a48296d5.js",
    "revision": "6e04b130bd0c7d84abebd2951706212e"
  },
  {
    "url": "assets/js/57.c6447a0d.js",
    "revision": "20eeb7112f7490bbff9d6af3dfb13b3b"
  },
  {
    "url": "assets/js/58.e68af85d.js",
    "revision": "25b0f8c1d24e40ffe01934e24d206f22"
  },
  {
    "url": "assets/js/59.da90dd2f.js",
    "revision": "14071af39f16314f789174b235716e8f"
  },
  {
    "url": "assets/js/6.0506d3fa.js",
    "revision": "31f26bc5ee52fff019886420a34297b8"
  },
  {
    "url": "assets/js/60.e5d4a22a.js",
    "revision": "2c75228d0ed335b41dde0acfac7f09a3"
  },
  {
    "url": "assets/js/61.77f0e47d.js",
    "revision": "831ddd38cc0ff74206c6713e8e13b0c9"
  },
  {
    "url": "assets/js/62.af7555a4.js",
    "revision": "800e8a2dd701217cd553ca74e399c059"
  },
  {
    "url": "assets/js/63.05e21dc1.js",
    "revision": "7e8eaa9738b713d7d39d253fcfcdb0ae"
  },
  {
    "url": "assets/js/64.f7dedd00.js",
    "revision": "e89c7d1b023d93a55fc8c1b09378fb01"
  },
  {
    "url": "assets/js/65.1703ec48.js",
    "revision": "767c962d71caa8922feef9d9f1891122"
  },
  {
    "url": "assets/js/66.da1e8d91.js",
    "revision": "20c4293302583e59ea0d81edcd0674b4"
  },
  {
    "url": "assets/js/7.83396dcb.js",
    "revision": "e3cb9fc8803dad4efd041e80e7d874cd"
  },
  {
    "url": "assets/js/8.92a42e37.js",
    "revision": "d1787f35797eedee038651849f08a094"
  },
  {
    "url": "assets/js/9.63a94b1d.js",
    "revision": "457f78398b3c946abdd81bf1cc352a94"
  },
  {
    "url": "assets/js/app.a27ea408.js",
    "revision": "12f4a1153cff3a89b07246fecef69b98"
  },
  {
    "url": "assets/js/vendors~flowchart.9f766271.js",
    "revision": "905c6f5cb40a596b5fc84f882df9d66f"
  },
  {
    "url": "big-data/index.html",
    "revision": "1d74f0eafa92e8ded81cf0e7e022eff0"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "da652308790c309cf7e4337265c68744"
  },
  {
    "url": "c/index.html",
    "revision": "5f1f9bf434efd267798f564afbccebd9"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "eac8342236e88fe53d52fbe46c0a837e"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "9994e14680ce575e40781636f3e5a314"
  },
  {
    "url": "deep-learning/python-and-vectorization.html",
    "revision": "34f911697b19a9c7fda74934830bf9d9"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "hello-world/array-and-linked-list.html",
    "revision": "57989d7721b65073e7401f297f2f6334"
  },
  {
    "url": "hello-world/binary-search.html",
    "revision": "c3cec9df48924fa6b6532190efb985ce"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "40c0f1a6eec54879ef2764bf3b70b110"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "563c297e36bda97b684132279ca7d893"
  },
  {
    "url": "hello-world/index.html",
    "revision": "a29af0af2051482004d9174b77ff2cec"
  },
  {
    "url": "hello-world/setup-a-server-manually.html",
    "revision": "2054030c9e39fee24be8aeb510621f0b"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "1471b5085013152b7be4f52bd45dc752"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "6692513ca3588b78b91e038ed20cd13a"
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
    "revision": "91b9c912205416b7a653ab3cf51ac1f3"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "a46938e8d926586a7d2540687fdfbe3f"
  },
  {
    "url": "java/API-io.html",
    "revision": "4c4b537077c99fca909073650b64e384"
  },
  {
    "url": "java/API-lang.html",
    "revision": "0ef108d1802da9ccdccbd95459a123db"
  },
  {
    "url": "java/API-util.html",
    "revision": "27a8e502d93a9e4eb508e1f8c399233f"
  },
  {
    "url": "java/grammars.html",
    "revision": "36eca90304792ecdb36a846a2a06183f"
  },
  {
    "url": "java/index.html",
    "revision": "15f3cd7889c9e1751cddb84246bed76d"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "5bba73a7febf259e9a71fdd7279b8576"
  },
  {
    "url": "java/references.html",
    "revision": "55d3606f065582a351ca675364d24366"
  },
  {
    "url": "kotlin/index.html",
    "revision": "5677138b7f6a85b0c6c3e0f3a9e71e99"
  },
  {
    "url": "math/index.html",
    "revision": "949fbf54fc3143f853bd90339eaf85bc"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "a565b5e3b0fab1e2b79e07e8b48513f5"
  },
  {
    "url": "mysql/divide.html",
    "revision": "4003bcc5146135739df5c8863d2331c6"
  },
  {
    "url": "mysql/index.html",
    "revision": "ba13c8d2602c91487184d36d60de930e"
  },
  {
    "url": "mysql/indices.html",
    "revision": "82499a5958f206e02af514c47444cca6"
  },
  {
    "url": "mysql/lock.html",
    "revision": "519b70262b3d7322b799d2e9e8737fca"
  },
  {
    "url": "mysql/question.html",
    "revision": "e5fe362233151716c5e354c76213cb8d"
  },
  {
    "url": "mysql/references.html",
    "revision": "67c82605554dd209ddfd839ef17f895f"
  },
  {
    "url": "mysql/transaction.html",
    "revision": "690a54677a0e8019548a06741d7543ad"
  },
  {
    "url": "python/grammar.html",
    "revision": "cb30f26ccc523e1d9429fde46ec35b58"
  },
  {
    "url": "python/index.html",
    "revision": "a8297e30c25ee627e28fb4be99b01ad6"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "cc13c9b1156f638f4bd87d0e632a07a8"
  },
  {
    "url": "recommender-systems/index.html",
    "revision": "2b9b860128d3ef7ce6f33316f7dac430"
  },
  {
    "url": "recommender-systems/introduction.html",
    "revision": "ea33829533c18ded43acbf2523b33a35"
  },
  {
    "url": "redis/cache.html",
    "revision": "e3cbbd93f0c0363e612ecb7e2c1b9d4e"
  },
  {
    "url": "redis/cluster.html",
    "revision": "f1d76dbe87e59bca5548a07489ab0a7b"
  },
  {
    "url": "redis/index.html",
    "revision": "799d69125e5316389837f1351c886638"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "820c5ac5d4e30a49d40f38ececa5cb60"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "f3cf40bb897187dfc3731d48d2b6f24f"
  },
  {
    "url": "spring/index.html",
    "revision": "08e05fec82f33d70a2bb813af66bdb5d"
  },
  {
    "url": "spring/ioc.html",
    "revision": "6f5299a21a49dbf6e2c4ae9eda4fe14b"
  },
  {
    "url": "spring/overall.html",
    "revision": "54565dc21f4655bf3af88df7edecd956"
  },
  {
    "url": "spring/references.html",
    "revision": "2066f93f4c37a9832d90e7e6189387d2"
  },
  {
    "url": "web/HTTP.html",
    "revision": "4bd605b3c846a173d1389cd6ce268a07"
  },
  {
    "url": "web/index.html",
    "revision": "ef117eaf5543976a402a557b74836dbb"
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
