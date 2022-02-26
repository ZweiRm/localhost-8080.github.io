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
    "revision": "f5738d84c891154579ae6efb3f8e888e"
  },
  {
    "url": "about/index.html",
    "revision": "7bf5c2e33718826d1fc998d8be720655"
  },
  {
    "url": "algorithm/ds-001.html",
    "revision": "75baa88517b7737ff521632943d15eee"
  },
  {
    "url": "algorithm/ds-002.html",
    "revision": "aa00b4090cf149a8e58c9dece6812201"
  },
  {
    "url": "algorithm/ds-003.html",
    "revision": "d465068095ad6777578c321863455317"
  },
  {
    "url": "algorithm/dynamic-programming.html",
    "revision": "2f66d3d79cd9171fafa3ddb9c237856b"
  },
  {
    "url": "algorithm/index.html",
    "revision": "c101d5383e24ff27dbda55bab041f48f"
  },
  {
    "url": "artificial-intelligence/index.html",
    "revision": "15613ef11d172a7ba15805904ac819fe"
  },
  {
    "url": "artificial-intelligence/search-strategies.html",
    "revision": "2584569bd73feff0b0377d9f92d0264d"
  },
  {
    "url": "assets/css/0.styles.0d65cfcc.css",
    "revision": "916b9a3840e07513a8a20eaa8d91d928"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.bf53735c.js",
    "revision": "ce5fcf6060d60748cd987af0c03aa660"
  },
  {
    "url": "assets/js/11.4380e1d2.js",
    "revision": "49ffe189c18eacf5346c65df0d5c4c23"
  },
  {
    "url": "assets/js/12.bed1de6a.js",
    "revision": "e3b3c9340f052f216da97b187b2abf37"
  },
  {
    "url": "assets/js/13.58a27ce0.js",
    "revision": "10808881731f408d993d43bf4bbcf02f"
  },
  {
    "url": "assets/js/14.eef70a3e.js",
    "revision": "07e078d9a2b3bb0b2f4e6c81c418d78f"
  },
  {
    "url": "assets/js/15.10217df1.js",
    "revision": "b6de4950ae82a4426fd10edc5383a6c2"
  },
  {
    "url": "assets/js/16.7c95c74b.js",
    "revision": "49d49ce0ef2305b70c9fc4a296449084"
  },
  {
    "url": "assets/js/17.c61b63de.js",
    "revision": "ac8e85853ae41e521b3adee3c3b2a497"
  },
  {
    "url": "assets/js/18.4fbbe79e.js",
    "revision": "7fa0f42b1e2cdc7bf4266c0e786fee2e"
  },
  {
    "url": "assets/js/19.4b8cf6af.js",
    "revision": "f19ec3c56f75c8669174f9551b1c4f4f"
  },
  {
    "url": "assets/js/20.1c5ed370.js",
    "revision": "2bfe137ffa9ba213159ebca4bbfa0053"
  },
  {
    "url": "assets/js/21.3ab9ce16.js",
    "revision": "db63483576ac29124135b356f53e6d6c"
  },
  {
    "url": "assets/js/22.06c2fcca.js",
    "revision": "dcde4af89c8460d643413ee6a5f063f0"
  },
  {
    "url": "assets/js/23.bbd89359.js",
    "revision": "ae69461dc2faad1a8916cd5eb7c646a2"
  },
  {
    "url": "assets/js/24.e776f3f8.js",
    "revision": "09538cf0ef19fcae0d2253bc2e5e9843"
  },
  {
    "url": "assets/js/25.0462978e.js",
    "revision": "80c18c9d4b8be02f5c89c27b2407d0eb"
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
    "url": "assets/js/28.c41d7970.js",
    "revision": "99316828db96ecc55ef516fedc8e9f0f"
  },
  {
    "url": "assets/js/29.f934fcfe.js",
    "revision": "28d5e2adc744702c9ee6f823b05ad9da"
  },
  {
    "url": "assets/js/3.a0fafcd7.js",
    "revision": "04695578a9ac4620d7dd202b353113bd"
  },
  {
    "url": "assets/js/30.d4cd854e.js",
    "revision": "d8110a21f430816d134e30b5ec415c9c"
  },
  {
    "url": "assets/js/31.aa65b6b6.js",
    "revision": "196191b8cf24820fa576521b1c235748"
  },
  {
    "url": "assets/js/32.c8a4506e.js",
    "revision": "1811f0da1dca63e44848afa588832693"
  },
  {
    "url": "assets/js/33.063ae035.js",
    "revision": "5217e8bcfe682e0067555abc3eae972c"
  },
  {
    "url": "assets/js/34.039de0ff.js",
    "revision": "e8b8a19ba8b292a1c4a7e158028d88ba"
  },
  {
    "url": "assets/js/35.83d3e256.js",
    "revision": "76fb75b313df13dd9f58112d454299fc"
  },
  {
    "url": "assets/js/36.14a9e120.js",
    "revision": "37d96f7832b1e224d5660050e2917784"
  },
  {
    "url": "assets/js/37.4cfeba6a.js",
    "revision": "df3423f778705d0b3856f6ca5312767a"
  },
  {
    "url": "assets/js/38.e7017def.js",
    "revision": "fa32c60d89a4836aa3e36f24b9e8c90a"
  },
  {
    "url": "assets/js/39.9b5d84b4.js",
    "revision": "04b7dac611744edcdfc77b2607fa1f95"
  },
  {
    "url": "assets/js/4.e58df2d1.js",
    "revision": "c2babc0d565005bdf9a463c98c935afd"
  },
  {
    "url": "assets/js/40.e78b8058.js",
    "revision": "00827974ccb727c692ba4cb687f4131d"
  },
  {
    "url": "assets/js/41.d1bb4144.js",
    "revision": "b3697022d908a3eefb141dfe618c884c"
  },
  {
    "url": "assets/js/42.ff0d8cdd.js",
    "revision": "406089ffc8946605af5caba479c87805"
  },
  {
    "url": "assets/js/43.a4f3c1a4.js",
    "revision": "8f05ce666dfc2ab89f34ab5639da0056"
  },
  {
    "url": "assets/js/44.8e76c00f.js",
    "revision": "25184af19db226de5d468ea7b454fd10"
  },
  {
    "url": "assets/js/45.34feb249.js",
    "revision": "49f4889e029e3b10083d821e58f604ac"
  },
  {
    "url": "assets/js/46.4af4e691.js",
    "revision": "93d04e036ef737baaa94336a605361a7"
  },
  {
    "url": "assets/js/47.1c896c06.js",
    "revision": "e7653a6b371d3da8c5e4f5aa25aa0353"
  },
  {
    "url": "assets/js/48.5a40d3ef.js",
    "revision": "164fdd39499f1e011d1d91f82331fe27"
  },
  {
    "url": "assets/js/49.13ed583d.js",
    "revision": "ce9c3f47ab39b19a73a9865e5287180e"
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
    "url": "assets/js/52.71dc356d.js",
    "revision": "c082ffbe104a08dd6eb8d0865f89da80"
  },
  {
    "url": "assets/js/53.9ad5bd15.js",
    "revision": "09e54022207ebabde8be264d3a0f1ce4"
  },
  {
    "url": "assets/js/54.407e2f72.js",
    "revision": "82921c857c059d6e9d4f8f8ec6ae296c"
  },
  {
    "url": "assets/js/55.f88b43e6.js",
    "revision": "3d824dda2b84e509da04a5f10f8d9376"
  },
  {
    "url": "assets/js/56.88900432.js",
    "revision": "ef1070535d12cbee9fe3757fdaedc3db"
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
    "url": "assets/js/59.709557cd.js",
    "revision": "e73210d8568c3bf1483884986cf4f1c6"
  },
  {
    "url": "assets/js/6.0753b155.js",
    "revision": "22700082e7bfe3870eb36e4d16cdd1d6"
  },
  {
    "url": "assets/js/60.9c477865.js",
    "revision": "896cc7973632bc698ddd4c7e6a9c8468"
  },
  {
    "url": "assets/js/61.eee288f1.js",
    "revision": "d1f9293ad9612cf56bc2614c031d0b19"
  },
  {
    "url": "assets/js/62.9d39a0eb.js",
    "revision": "d02f6857ea524d8d3db32a41063e8056"
  },
  {
    "url": "assets/js/63.ab6088af.js",
    "revision": "bc72558d80454b9d87119bf53599a509"
  },
  {
    "url": "assets/js/64.2fa23866.js",
    "revision": "db82a145bb46e144371421fd2dda1c63"
  },
  {
    "url": "assets/js/65.0569b4c8.js",
    "revision": "afbf9dd42b000f8b843dcc8806b3f8e1"
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
    "url": "assets/js/8.18e0b377.js",
    "revision": "c96ba7f3e8e7f9212bd78cae81cd53b7"
  },
  {
    "url": "assets/js/9.4058e2f6.js",
    "revision": "61531dcc097aea42981db7033359f780"
  },
  {
    "url": "assets/js/app.5d360c85.js",
    "revision": "bed6d91073d779ac2f3fb5787754e192"
  },
  {
    "url": "assets/js/vendors~flowchart.1688cdd8.js",
    "revision": "4bf1246381ad0f6f04a98c4e983315ce"
  },
  {
    "url": "big-data/index.html",
    "revision": "f25cdf77d082a8352d5b9b4d4945d636"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "d875bc866de9e8461a0c566cffd792d7"
  },
  {
    "url": "c/index.html",
    "revision": "78e9df6acfcb9a87f33196837926f465"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "c08185e3da56aff9f1a68242d5c7d365"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "70202e24d68c8c4b12d64fd2dc140d61"
  },
  {
    "url": "deep-learning/python-and-vectorization.html",
    "revision": "dba32b9c67420fc31d8d8aa70326a3c9"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "hello-world/array-and-linked-list.html",
    "revision": "a8deedbd0155d00d597fdc5be9c018fe"
  },
  {
    "url": "hello-world/binary-search.html",
    "revision": "9959722f942831248ac329b71215cff4"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "2e80336e485b0f8c680039a94ccaab3f"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "3ecea7512358fe5011dff8d730f0ba68"
  },
  {
    "url": "hello-world/index.html",
    "revision": "8e6e9f8ce0b07e043bb2111a82662d87"
  },
  {
    "url": "hello-world/setup-a-server-manually.html",
    "revision": "d3af67939b957406f43f0aec7eea16b0"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "1a39c07b8cb4ee8867e17bd521ec1013"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "5d8414403a7012c63f6ae0b18e77587e"
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
    "revision": "973487055a9c6c02e40a7adaf44d080c"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "37c09d0d7381573ab3e37cebae9af33a"
  },
  {
    "url": "java/API-io.html",
    "revision": "1ef4f948aa8e041cf8947223dd62af32"
  },
  {
    "url": "java/API-lang.html",
    "revision": "0fcc130cb343e5a3857824ccf65101de"
  },
  {
    "url": "java/API-util.html",
    "revision": "c0f84a6aa877d7474fdaa010bc5f7e0b"
  },
  {
    "url": "java/grammars.html",
    "revision": "3bc5865716e5c6de28b1e1dab9ef68c3"
  },
  {
    "url": "java/index.html",
    "revision": "02ee129c7cebea0e88a3d372b19d67ab"
  },
  {
    "url": "java/jvm.html",
    "revision": "6759dd29f10d237400b33564a91ba3d0"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "25f0122975bc4ab0c410ae848ff67e1c"
  },
  {
    "url": "java/references.html",
    "revision": "7fe639d770356993cde58b9e4ecd65ef"
  },
  {
    "url": "kotlin/index.html",
    "revision": "ef5d6aa3e045cda188ff15c5ab9c93cf"
  },
  {
    "url": "math/index.html",
    "revision": "f8294ad7d5de915a7f30e606b4a3e084"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "10a7669dd06b16c09c5a22f8eb4d7ea9"
  },
  {
    "url": "mysql/divide.html",
    "revision": "474a39165867eb7cf8433699c751db37"
  },
  {
    "url": "mysql/index.html",
    "revision": "7449f2ee41ed51f4210cf8ffc08b599c"
  },
  {
    "url": "mysql/indices.html",
    "revision": "57363786561ddfcd2de087d67e719321"
  },
  {
    "url": "mysql/lock.html",
    "revision": "0ef25062dd18431f8fe6a68f228ca5f8"
  },
  {
    "url": "mysql/question.html",
    "revision": "acd739f5eb75b093896e8d1b62c6ab92"
  },
  {
    "url": "mysql/references.html",
    "revision": "a70f0ea65d884b94274a83d4b11e7f00"
  },
  {
    "url": "mysql/transaction.html",
    "revision": "bae2598b48dcead20b34bd5f1687b8b6"
  },
  {
    "url": "python/grammar.html",
    "revision": "efcb2828a586a410aa4547d5823fb3ca"
  },
  {
    "url": "python/index.html",
    "revision": "9b863307a8a53c3fe023fa13c2b17742"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "c72c2a63171d7c59375011552c2a8878"
  },
  {
    "url": "recommender-systems/index.html",
    "revision": "8c35f971a8c635285b6fed2ae0c02c0f"
  },
  {
    "url": "recommender-systems/introduction.html",
    "revision": "af8fc9491d012d4cd5c2a4e1604a1aa8"
  },
  {
    "url": "redis/cache.html",
    "revision": "b110b2b8ea4563f7f0fba3a5cf38add0"
  },
  {
    "url": "redis/cluster.html",
    "revision": "7916b2b8fb4cbdbd78d60eb4af275eb0"
  },
  {
    "url": "redis/index.html",
    "revision": "4f8637b321d129ce538f3a6ca3f2297e"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "2e7a3234228f7cc712bb3ba383052a22"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "f036d4298cf74fd4fc31aff7ebd7c9e6"
  },
  {
    "url": "spring/index.html",
    "revision": "a8d4d1b7cd27a058adfa48841d73f4ac"
  },
  {
    "url": "spring/ioc.html",
    "revision": "9a125ff99b062b78ff68bad03602e5f1"
  },
  {
    "url": "spring/overall.html",
    "revision": "2530e16d4107b89224d6f2fd84c6c082"
  },
  {
    "url": "spring/references.html",
    "revision": "142844d1e4965181c215b53b6a8acddd"
  },
  {
    "url": "web/HTTP.html",
    "revision": "37ecf029a38e7c8fd81550be49d3bff5"
  },
  {
    "url": "web/index.html",
    "revision": "b5e74310d7b928cd1b49f83ec1a9f57a"
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
