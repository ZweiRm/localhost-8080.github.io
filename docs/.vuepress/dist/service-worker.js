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
    "revision": "fd824baf0042f36fde896d51b974fbe6"
  },
  {
    "url": "about/index.html",
    "revision": "5dd50d1ff1a4af2ba677c06c3f64d7ea"
  },
  {
    "url": "algorithm/ds-001.html",
    "revision": "6a3b95688cdae9157a3764256818d6a9"
  },
  {
    "url": "algorithm/ds-002.html",
    "revision": "e27cc23c51e6a796b5fafb926803fed3"
  },
  {
    "url": "algorithm/ds-003.html",
    "revision": "d5e213e12d8b59f38f73532c39b4d1f1"
  },
  {
    "url": "algorithm/dynamic-programming.html",
    "revision": "693ce7e7ae3b9f08e267fd4f646ff364"
  },
  {
    "url": "algorithm/index.html",
    "revision": "c51b37ef8cf13dfbfa9ca71e892b77f6"
  },
  {
    "url": "artificial-intelligence/index.html",
    "revision": "afb07de3d370979625e637df71a9a247"
  },
  {
    "url": "artificial-intelligence/search-strategies.html",
    "revision": "3c8fc30dbf4b94e444b947b735ed0bd4"
  },
  {
    "url": "assets/css/0.styles.95897c78.css",
    "revision": "aa04e01b91fc257df34f5d850a5b4935"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.09a7c310.js",
    "revision": "7ca22c8c224a16a6b586346be6ed3581"
  },
  {
    "url": "assets/js/11.6ebca3c3.js",
    "revision": "9dcb37fe42b3872b30b64cd4f6d29af5"
  },
  {
    "url": "assets/js/12.ad278091.js",
    "revision": "50221f425077f226663dc8927f74374d"
  },
  {
    "url": "assets/js/13.8d793768.js",
    "revision": "367fdb7b59687d6ee9c9bea19d5f5621"
  },
  {
    "url": "assets/js/14.a02ff1c3.js",
    "revision": "0d036e216bb7a6c49e8b0f116974ae24"
  },
  {
    "url": "assets/js/15.e89e7e8d.js",
    "revision": "58893cc71e16136edd122dd499363281"
  },
  {
    "url": "assets/js/16.7c95c74b.js",
    "revision": "49d49ce0ef2305b70c9fc4a296449084"
  },
  {
    "url": "assets/js/17.c975798a.js",
    "revision": "f9576d254bfe3cc34634b5347a4f0cec"
  },
  {
    "url": "assets/js/18.e900233e.js",
    "revision": "5153300ec5bfb5c5f9348a3c5c17c10a"
  },
  {
    "url": "assets/js/19.acb9941d.js",
    "revision": "51bd0e2e229d9d4e6928c6f5ab09a128"
  },
  {
    "url": "assets/js/20.9fa7424d.js",
    "revision": "17fcf67df2ea9df8798352c8a8476698"
  },
  {
    "url": "assets/js/21.59f243d9.js",
    "revision": "fee9a3ff72edbf255bdd4a2e56275c33"
  },
  {
    "url": "assets/js/22.06c2fcca.js",
    "revision": "dcde4af89c8460d643413ee6a5f063f0"
  },
  {
    "url": "assets/js/23.35c811bc.js",
    "revision": "0a1779e6d184a5890bf6872e493764fa"
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
    "url": "assets/js/26.6a7981d3.js",
    "revision": "8c0dbfd8516ae69b98ac441343ce27ce"
  },
  {
    "url": "assets/js/27.9b8fcb47.js",
    "revision": "25787b380fdb6d043cd1c51a4252539c"
  },
  {
    "url": "assets/js/28.f6071dfc.js",
    "revision": "92d9adde68525c3e7a8edf8608a0a6f7"
  },
  {
    "url": "assets/js/29.0df29703.js",
    "revision": "e3d73e5e81f786b61f1427d5719f4cf9"
  },
  {
    "url": "assets/js/3.a0fafcd7.js",
    "revision": "04695578a9ac4620d7dd202b353113bd"
  },
  {
    "url": "assets/js/30.85fe18e9.js",
    "revision": "e3d8ac5264125c9d80e1029626825380"
  },
  {
    "url": "assets/js/31.87aca9ff.js",
    "revision": "ce3d1270ee196d9756062b70cc9155db"
  },
  {
    "url": "assets/js/32.7036125b.js",
    "revision": "47cb7e42d5b7ca0d294d4781d66d68cc"
  },
  {
    "url": "assets/js/33.c9da10a8.js",
    "revision": "b221f28bcebd615a923cf424c30ae0f8"
  },
  {
    "url": "assets/js/34.cee9425c.js",
    "revision": "433bca424b861908bf7f7275c2f681d4"
  },
  {
    "url": "assets/js/35.83d3e256.js",
    "revision": "76fb75b313df13dd9f58112d454299fc"
  },
  {
    "url": "assets/js/36.60546f75.js",
    "revision": "e9980dacc7ff53c966fd7fa82521d0e7"
  },
  {
    "url": "assets/js/37.da209425.js",
    "revision": "03b4f3ab66a53a1b37d62245d93a3370"
  },
  {
    "url": "assets/js/38.8535c653.js",
    "revision": "6a98549d2e7b3bfdc98e5381ca40c92e"
  },
  {
    "url": "assets/js/39.0212eccd.js",
    "revision": "3d7f26df88d1ffbda109c8b08a47f367"
  },
  {
    "url": "assets/js/4.e58df2d1.js",
    "revision": "c2babc0d565005bdf9a463c98c935afd"
  },
  {
    "url": "assets/js/40.bd17aaf0.js",
    "revision": "eaf7fc747972424d4d11c8477edf0ae5"
  },
  {
    "url": "assets/js/41.54362d65.js",
    "revision": "1c456767c8f6e90e6fc25504a0af952b"
  },
  {
    "url": "assets/js/42.a566f10a.js",
    "revision": "f8b2e995b66b1317d1a2ae51c9180414"
  },
  {
    "url": "assets/js/43.af0d8b5c.js",
    "revision": "bf059f21e4e9cf1f0fc6904b5c134e3c"
  },
  {
    "url": "assets/js/44.1a7b8ab4.js",
    "revision": "ffb9c19066cee12e9371340b4cf9738a"
  },
  {
    "url": "assets/js/45.34feb249.js",
    "revision": "49f4889e029e3b10083d821e58f604ac"
  },
  {
    "url": "assets/js/46.9f4594e8.js",
    "revision": "c2098b98a8dce747a76f7339e4cd04e4"
  },
  {
    "url": "assets/js/47.a34f4fe5.js",
    "revision": "ed49d6c82dc028327b6d54331c67cabe"
  },
  {
    "url": "assets/js/48.244265d6.js",
    "revision": "36ac792da4355cfe4f79e4d468e07b8a"
  },
  {
    "url": "assets/js/49.f4dcce33.js",
    "revision": "a9bae26a5d8aed7f72b4f840d0e69dd6"
  },
  {
    "url": "assets/js/5.ebfd9835.js",
    "revision": "a41bed5a2d55dfba967d6c120a218cb4"
  },
  {
    "url": "assets/js/50.96ff4629.js",
    "revision": "c76222338d6900b539e28c6fbd96bfce"
  },
  {
    "url": "assets/js/51.260414e0.js",
    "revision": "8042a700801b1a1215b96dce82e403c2"
  },
  {
    "url": "assets/js/52.177afda5.js",
    "revision": "ee2160c4e1352b761dcfc71aa3cc15f7"
  },
  {
    "url": "assets/js/53.187f6aab.js",
    "revision": "17a7bc08733acce93992d23b467f70a1"
  },
  {
    "url": "assets/js/54.e6db504f.js",
    "revision": "4fadf1c3e5ddd0407899ae859b039ffc"
  },
  {
    "url": "assets/js/55.bb8cd582.js",
    "revision": "94cdd78f020435105c9c887cdb332f4b"
  },
  {
    "url": "assets/js/56.261dc5df.js",
    "revision": "7e40e370eb51bfec1e19698490b98552"
  },
  {
    "url": "assets/js/57.f3afb620.js",
    "revision": "d957fb736013deaf825aa409cec54cd3"
  },
  {
    "url": "assets/js/58.7960ee65.js",
    "revision": "d575502007ab49c56e57979f03e282e6"
  },
  {
    "url": "assets/js/59.495d2002.js",
    "revision": "baae2d558a55d8af8cf7b6a9a436a2eb"
  },
  {
    "url": "assets/js/6.594b10c9.js",
    "revision": "508ee9e80bd3c6a33a5407f5c4d047fa"
  },
  {
    "url": "assets/js/60.70f94986.js",
    "revision": "e9ff9c2b090627195d846fe5e3cfa9d9"
  },
  {
    "url": "assets/js/61.c1632cf6.js",
    "revision": "f7427ddd10837858a1ef863404c775ec"
  },
  {
    "url": "assets/js/62.10e8557f.js",
    "revision": "c2ff9d62dbbc8bf5e76153336caae083"
  },
  {
    "url": "assets/js/63.c1a1811e.js",
    "revision": "ee0c4b35769266f1256a8a256cdb2247"
  },
  {
    "url": "assets/js/64.a6e11182.js",
    "revision": "30b3fcb33c66ad535e547c4dfbfc7104"
  },
  {
    "url": "assets/js/65.bdce8be8.js",
    "revision": "dd828263bb8273f5f28ddecfb52a8986"
  },
  {
    "url": "assets/js/66.35c0c81e.js",
    "revision": "7163261efa275727ef4d13fdc57a7cb6"
  },
  {
    "url": "assets/js/67.8265785a.js",
    "revision": "2ea2889ca2a6fe432a6fdb9538b6edb6"
  },
  {
    "url": "assets/js/7.0dbec8b1.js",
    "revision": "017ab77fdfda099e4f0982dea0574d25"
  },
  {
    "url": "assets/js/8.055893f4.js",
    "revision": "1ab66241dc59f3ae90930cd978c75e38"
  },
  {
    "url": "assets/js/9.4058e2f6.js",
    "revision": "61531dcc097aea42981db7033359f780"
  },
  {
    "url": "assets/js/app.24c96e8a.js",
    "revision": "7f826804acfc77ae38c8ed7fe17904a0"
  },
  {
    "url": "assets/js/vendors~flowchart.1688cdd8.js",
    "revision": "4bf1246381ad0f6f04a98c4e983315ce"
  },
  {
    "url": "big-data/index.html",
    "revision": "c3f6778284fb7355492b05f46c522450"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "b29a7bd4ad8a2c278216e69a7e76bd7c"
  },
  {
    "url": "c/index.html",
    "revision": "008383863f7dbf7b5dd7116722c8cef8"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "26db0f68dbd6af5472055f444f7f4fa6"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "abbc53de357b97ef3fa76591873ef308"
  },
  {
    "url": "deep-learning/python-and-vectorization.html",
    "revision": "fd9c1b8256ef4d86a27352b7f2028e5b"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "hello-world/array-and-linked-list.html",
    "revision": "0fc1e4cbde7947b962e519c6d8d9d1aa"
  },
  {
    "url": "hello-world/binary-search.html",
    "revision": "7ac81f432d6921b8c4439bfea76da0be"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "edaaa24e86568f70cb16d3b42cf17fa7"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "1e9f5ccebf3ec6d3c608bc25650d8576"
  },
  {
    "url": "hello-world/index.html",
    "revision": "59e4f52b37239c15f7509a0550e2a900"
  },
  {
    "url": "hello-world/setup-a-server-manually.html",
    "revision": "a2d13b490b8e74fa19fe898189f5cceb"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "fa31df1ab9b46d4e630a3b936e5f9927"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "186f321a01e3622472863e86b740ef75"
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
    "revision": "05b7c9659102e15e7d9fb31a139bf4c5"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "4517f82589cc5c5896b4cb80646f4a9a"
  },
  {
    "url": "java/API-io.html",
    "revision": "2a4bc9f90537c232873868d1a3a62c57"
  },
  {
    "url": "java/API-lang.html",
    "revision": "3f2145baee00adc7a30d90f7af985a54"
  },
  {
    "url": "java/API-util.html",
    "revision": "99e1fe53b34ca37a4d922aa2bced58f3"
  },
  {
    "url": "java/grammars.html",
    "revision": "ec591a9846ceb5608c499dbe1f16d022"
  },
  {
    "url": "java/index.html",
    "revision": "f262ad2a6f878a9472e2dce61d0ef729"
  },
  {
    "url": "java/jvm.html",
    "revision": "ecfdcb9ff83cb2ed3fc223eb643bd99f"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "d1eb5ff5bdbd99d72fa628ed2b9bb407"
  },
  {
    "url": "java/references.html",
    "revision": "09977b5d5a16299de79d5c896739ee5b"
  },
  {
    "url": "kotlin/index.html",
    "revision": "12f7f7823cad2307b88e595d064daede"
  },
  {
    "url": "math/index.html",
    "revision": "1892acd870aad6a4b30d57d5ec8c4d03"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "cde909c498e2ca07455a8ca9475d4c5e"
  },
  {
    "url": "mysql/divide.html",
    "revision": "c74580d183c08ca9a31044dbe1fcad87"
  },
  {
    "url": "mysql/index.html",
    "revision": "f1e08810b4c16db3e00e55ca2f4f70d4"
  },
  {
    "url": "mysql/indices.html",
    "revision": "5887332654acb4377331219dd580165d"
  },
  {
    "url": "mysql/lock.html",
    "revision": "aaa4e7dc3fd158adc77b095b0a20f941"
  },
  {
    "url": "mysql/question.html",
    "revision": "c98f1c8181286e997e666af1eaf1c908"
  },
  {
    "url": "mysql/references.html",
    "revision": "0ae311c9edfcb984866f65bfa5ec0761"
  },
  {
    "url": "mysql/transaction.html",
    "revision": "1452ba40d5d1dbc8eadfc0f2824ad3c4"
  },
  {
    "url": "python/grammar.html",
    "revision": "957934066242121ab7d4ed69e30a277f"
  },
  {
    "url": "python/index.html",
    "revision": "c89e717e4b422875ced3626e463fcbe6"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "b5a2434bf2e99c205a69dad3bf86fa6a"
  },
  {
    "url": "recommender-systems/index.html",
    "revision": "1f773320e73bf4dd96e2a297cbc20fcc"
  },
  {
    "url": "recommender-systems/introduction.html",
    "revision": "22f018091f3ce1df9e91338986ca469f"
  },
  {
    "url": "redis/cache.html",
    "revision": "81b1f7df0ddcc34fba33ddf8d9f30ccc"
  },
  {
    "url": "redis/cluster.html",
    "revision": "c00c746785d440849eab50a08262109a"
  },
  {
    "url": "redis/index.html",
    "revision": "ae7421a9e39a7c650b3a643d74fa8b46"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "079c90e893ca6948a66929f5b6c18274"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "7f071f797d45b8003f912f0c5e29a0e3"
  },
  {
    "url": "spring/index.html",
    "revision": "5c363a888cc4d905a9c7cabe47afeb53"
  },
  {
    "url": "spring/ioc.html",
    "revision": "fc7e1bc280e112b08cca8b436cc577c4"
  },
  {
    "url": "spring/overall.html",
    "revision": "a614b793b8e99acf79a66a607ebf9bbc"
  },
  {
    "url": "spring/references.html",
    "revision": "c45c7b5052bf67c704c933faf44dbf48"
  },
  {
    "url": "web/HTTP.html",
    "revision": "4dd1bc33fea65d01e4e42ba5f2b1f04a"
  },
  {
    "url": "web/index.html",
    "revision": "2a9adedb430a93d9ce39be896207dc59"
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
