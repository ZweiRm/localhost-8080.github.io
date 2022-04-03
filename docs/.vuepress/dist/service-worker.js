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
    "revision": "4256abb9ff561dbfec680eed83516d2e"
  },
  {
    "url": "about/index.html",
    "revision": "86616ca2934e3277ee0a68a61048bb79"
  },
  {
    "url": "algorithm/ds-001.html",
    "revision": "550c264eea3e6faf0216fb8048431116"
  },
  {
    "url": "algorithm/ds-002.html",
    "revision": "7c16c747236e8ba83c3c3bedd2f91dad"
  },
  {
    "url": "algorithm/ds-003.html",
    "revision": "43f952b83acef0325ff102309e412c38"
  },
  {
    "url": "algorithm/dynamic-programming.html",
    "revision": "2e6fb1c01238f5c1679761214e4cb6e0"
  },
  {
    "url": "algorithm/index.html",
    "revision": "45425fdf25f46b168465f73f0006a571"
  },
  {
    "url": "artificial-intelligence/index.html",
    "revision": "fe5ee28ea295588dceadac6cccee0be0"
  },
  {
    "url": "artificial-intelligence/search-strategies.html",
    "revision": "58ef1a394591af543ae03905cf571882"
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
    "url": "assets/js/10.df2e213d.js",
    "revision": "85c36a5b4b2316717d961082261d5320"
  },
  {
    "url": "assets/js/11.3a9d702a.js",
    "revision": "e1388f02472ea85dd711307e56f4cd56"
  },
  {
    "url": "assets/js/12.bce491cd.js",
    "revision": "a854df1eed9f3c70a6075b276ddb8684"
  },
  {
    "url": "assets/js/13.a555e34f.js",
    "revision": "c075715a6641484090dc439804cf1a04"
  },
  {
    "url": "assets/js/14.0d457dd1.js",
    "revision": "fc1f6b4557f03d41dfd115eb2223f4c6"
  },
  {
    "url": "assets/js/15.e02f719a.js",
    "revision": "7444fc7b3cb832c68fe18ef7ddb4de94"
  },
  {
    "url": "assets/js/16.a4cbb348.js",
    "revision": "98d0b9e3e4381e54bdfcdacf76c4fad8"
  },
  {
    "url": "assets/js/17.d0d5b9ca.js",
    "revision": "4ea205dba80246cef16b1018bd61e919"
  },
  {
    "url": "assets/js/18.4605b9d5.js",
    "revision": "2ff1ebd011180af9d1b8eb68104e3899"
  },
  {
    "url": "assets/js/19.455c0ddc.js",
    "revision": "7491b8597cf3a43567ae6c6088892d05"
  },
  {
    "url": "assets/js/20.b7092aec.js",
    "revision": "24e7b94e6b3567a7624fbca777c22c9d"
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
    "url": "assets/js/25.04762b28.js",
    "revision": "120ab08398c5b9cf4927bdab4f2c7b2f"
  },
  {
    "url": "assets/js/26.2167c673.js",
    "revision": "fae5a6c4f206587c46bcd7df6e483708"
  },
  {
    "url": "assets/js/27.6b0644b0.js",
    "revision": "f2ad6e481243f6ff2b2a70de7d3fe0f6"
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
    "url": "assets/js/30.8304dc21.js",
    "revision": "c912b00051c87066f81ed5b7d5e56be1"
  },
  {
    "url": "assets/js/31.de5bcd4f.js",
    "revision": "f82abeff87e546f7fee0d879f33bc4fc"
  },
  {
    "url": "assets/js/32.79008558.js",
    "revision": "8afa77271948c1dc01600ca624214ef7"
  },
  {
    "url": "assets/js/33.2b5ebac7.js",
    "revision": "405054933b1d8beb519dac3f53ce06a7"
  },
  {
    "url": "assets/js/34.68bb68ad.js",
    "revision": "4975ec2a95606de6ce2ce9eec4bacb92"
  },
  {
    "url": "assets/js/35.cbd28c8d.js",
    "revision": "4d40c227b7b62e3b8fa795067a804e21"
  },
  {
    "url": "assets/js/36.585f8156.js",
    "revision": "7f69b016b932811705ca985be8f88068"
  },
  {
    "url": "assets/js/37.bee624f0.js",
    "revision": "c34970184c95431857e8077fbc25116b"
  },
  {
    "url": "assets/js/38.05ce9606.js",
    "revision": "f0c032c49e1cebbbac6b667fa5b6fd8e"
  },
  {
    "url": "assets/js/39.0531f3b1.js",
    "revision": "c90189b042cb611f10475b9f3d6914d6"
  },
  {
    "url": "assets/js/4.82cbc76e.js",
    "revision": "ae37a1a9fed70cb970eb2fc85a834f1c"
  },
  {
    "url": "assets/js/40.51fe58b2.js",
    "revision": "baf933d52052b756fb82b778eac00e77"
  },
  {
    "url": "assets/js/41.3ae77b1b.js",
    "revision": "878e5df3850870b01cc8e659d2d127c9"
  },
  {
    "url": "assets/js/42.1b866d6a.js",
    "revision": "d155f0f4792b13b60040488df5a41b27"
  },
  {
    "url": "assets/js/43.f524c845.js",
    "revision": "6bb57ff245d4e4f45e50e04f4517292b"
  },
  {
    "url": "assets/js/44.e3028dbe.js",
    "revision": "b036e15ba6f135fb2a430637375cacb8"
  },
  {
    "url": "assets/js/45.d33efa3f.js",
    "revision": "c08d0a5f379ebf6460296021c058494b"
  },
  {
    "url": "assets/js/46.66e858b9.js",
    "revision": "8775136e19067c192974891ec1b70e30"
  },
  {
    "url": "assets/js/47.48c39351.js",
    "revision": "53dab2f4ace8aef3251eaf3332538e53"
  },
  {
    "url": "assets/js/48.640a201f.js",
    "revision": "a8e6b22154699b3e0124a83f37781c62"
  },
  {
    "url": "assets/js/49.3b310e5c.js",
    "revision": "c386b8e0892850210c26a8c24c86c109"
  },
  {
    "url": "assets/js/5.2082fc82.js",
    "revision": "58c4483416df5853ff9e544f2459f30e"
  },
  {
    "url": "assets/js/50.838606a5.js",
    "revision": "86899daefd692d8f78a21754758de0f4"
  },
  {
    "url": "assets/js/51.fdc3a483.js",
    "revision": "096110ba18323633650ce8122721be86"
  },
  {
    "url": "assets/js/52.ee6c680a.js",
    "revision": "d0ee490f53701f2d8669d4e4cd3d489b"
  },
  {
    "url": "assets/js/53.cd455118.js",
    "revision": "9357c4a2aed555241c2c677a92263091"
  },
  {
    "url": "assets/js/54.5319439c.js",
    "revision": "9a03c47f43097a9a1bc8719a0b0de0a0"
  },
  {
    "url": "assets/js/55.edaa6e43.js",
    "revision": "957a0871ea06a16025e4aaca869b89fd"
  },
  {
    "url": "assets/js/56.82d16cbd.js",
    "revision": "5328550e4e16f0cba26e1924a9ac970c"
  },
  {
    "url": "assets/js/57.57bb8209.js",
    "revision": "c486b7d9dcf3c146695ff6bb0f7b3e9c"
  },
  {
    "url": "assets/js/58.ce4e3b1f.js",
    "revision": "d8b69c854227db496468bc65b0f278b8"
  },
  {
    "url": "assets/js/59.c19ebe0b.js",
    "revision": "a61c8cd6f63265f7f99a7cc52c1147e8"
  },
  {
    "url": "assets/js/6.82ed979c.js",
    "revision": "b6b37672e05c01c2ebd24b2765b3f75c"
  },
  {
    "url": "assets/js/60.c4bf6805.js",
    "revision": "6116156331d912170fbd85a61e9ff7ab"
  },
  {
    "url": "assets/js/61.c77ccae1.js",
    "revision": "c0495a7bf0106b0c7765c21323a1c6ac"
  },
  {
    "url": "assets/js/62.5e2cacda.js",
    "revision": "5989f943a65d1e6af9fe6d23c307fe3e"
  },
  {
    "url": "assets/js/63.172c9501.js",
    "revision": "64940c239c3cb3763124c04f8b55b022"
  },
  {
    "url": "assets/js/64.25cbd8cf.js",
    "revision": "7e797fd0ebbc77ec088511959d6b2dc0"
  },
  {
    "url": "assets/js/65.e841bc6c.js",
    "revision": "99298f115d3b57b6bf94dc9d8ba4fd61"
  },
  {
    "url": "assets/js/66.3a0b96a2.js",
    "revision": "e99e7bca30b883ca9cf2c52ad542aabe"
  },
  {
    "url": "assets/js/67.27e86aac.js",
    "revision": "a6b173fac90c4a55988df5b8ca5d5e4b"
  },
  {
    "url": "assets/js/68.eb6d61d6.js",
    "revision": "cf5ff221979614bd9ebeeb00bcfe27fc"
  },
  {
    "url": "assets/js/69.ccd07b0a.js",
    "revision": "5650d1e914d6abd7645d992adcee0632"
  },
  {
    "url": "assets/js/7.abea3f3a.js",
    "revision": "bdb289c68bef3bb6c3d9d005c49b62bf"
  },
  {
    "url": "assets/js/70.90705380.js",
    "revision": "8fb4723d7919e09563ed575a070ed717"
  },
  {
    "url": "assets/js/71.d5b11149.js",
    "revision": "1d3c61ff2243cfe6a553528f926657ca"
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
    "url": "assets/js/app.df152255.js",
    "revision": "8717256ce91b3b824d3ad178f51546dc"
  },
  {
    "url": "assets/js/vendors~flowchart.899652fe.js",
    "revision": "1a4a2e36ed845872fc6b862d84a31925"
  },
  {
    "url": "big-data/index.html",
    "revision": "8f5e64186cedfe81587ceff40b12feec"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "6a3a25f69cebb723c724fee661fc4b2e"
  },
  {
    "url": "c/index.html",
    "revision": "bbe40f29ecb2cbe2d6f5fdcbcd75bf92"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "a5b56ff306c4cd326d5b1322b43bca36"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "74e6168d8d0c20afdb31a48bb107e046"
  },
  {
    "url": "deep-learning/python-and-vectorization.html",
    "revision": "615866ef24bc067a12d7dbc89cd9e428"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "hello-world/array-and-linked-list.html",
    "revision": "1acefc38d94394467b8ba6d872ff9da7"
  },
  {
    "url": "hello-world/binary-search.html",
    "revision": "b87dcc7604282c3dea1fcfcb7e578192"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "e6717584894714ae18cd36fed2ec2c4e"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "b46b98d7e9b20e3bdcc8da54af22364d"
  },
  {
    "url": "hello-world/index.html",
    "revision": "56d280d08c541dca375ec8cff20e6b9f"
  },
  {
    "url": "hello-world/setup-a-server-manually.html",
    "revision": "19afa6ba861b34c3e543d1fe6d6eaca1"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "39654677ad8c0eec8eda11587b2971bf"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "449888793b45eddb0e5e5d8d5cc4a531"
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
    "revision": "7f12df30d369e765a8053e681c89a353"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "c4c11bbab363f79d2092f3250d28f1a1"
  },
  {
    "url": "java/API-io.html",
    "revision": "cde320db88985f9f807ecccec1a1f28f"
  },
  {
    "url": "java/API-lang.html",
    "revision": "4cd8234b0fc973cf2c152f31860094ec"
  },
  {
    "url": "java/API-util.html",
    "revision": "428533cc03f7f86372691d0b1cfaa60b"
  },
  {
    "url": "java/API-util2.html",
    "revision": "c1747f19c54cd0c049b4f982eaa893ba"
  },
  {
    "url": "java/grammars.html",
    "revision": "c56c06d24394db01af00c5ec757d70a8"
  },
  {
    "url": "java/index.html",
    "revision": "6fe1f47b8fe4f7de18a9bdeaa604db0e"
  },
  {
    "url": "java/jvm.html",
    "revision": "b0fb51db3d43c161b58f84fee8e18f09"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "dc69199922e2d39413b9e101be1c1d20"
  },
  {
    "url": "java/references.html",
    "revision": "36886a6cc6dd317daf6269c1b4e7c337"
  },
  {
    "url": "kotlin/index.html",
    "revision": "fd2c1a7f715c4c8fbe42eeb3f74a600c"
  },
  {
    "url": "math/index.html",
    "revision": "50c866d17d0b58cccfb98a95b5c22f46"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "cac7a7ac1aa172da7e40a7176fa76002"
  },
  {
    "url": "mysql/divide.html",
    "revision": "caf89f478e5dafb4b531a5a715408a0f"
  },
  {
    "url": "mysql/index.html",
    "revision": "f6111c056d2b1e2120cfcc4ca84f738b"
  },
  {
    "url": "mysql/indices.html",
    "revision": "69ba3be84be3e77e2cdffc6991ddcf0c"
  },
  {
    "url": "mysql/lock.html",
    "revision": "a4d49949069154830e720fc23d843216"
  },
  {
    "url": "mysql/question.html",
    "revision": "fc5259ab18337b77599053eb5bb76a46"
  },
  {
    "url": "mysql/references.html",
    "revision": "66639a4912adb8f286b741e9bb75dfb1"
  },
  {
    "url": "mysql/transaction.html",
    "revision": "5e2cebfc5ac9797c71c6ce89b0beac78"
  },
  {
    "url": "python/grammar.html",
    "revision": "f5546a22cdc48b78370e91355b9eddce"
  },
  {
    "url": "python/index.html",
    "revision": "aa3bc26ee12a12f713866376e994ec5b"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "2471730fe6a42cbfc19e8be25b892171"
  },
  {
    "url": "recommender-systems/index.html",
    "revision": "8daaf924caa4532c398ec8f26d436bf6"
  },
  {
    "url": "recommender-systems/introduction.html",
    "revision": "cded48e6fc8e48f8ac0fd2b65e045b78"
  },
  {
    "url": "redis/cache.html",
    "revision": "3c92e02d201d8770e9e1cea5b46f0d2d"
  },
  {
    "url": "redis/cluster.html",
    "revision": "a1e653777a99b6031d3926ee5aa80777"
  },
  {
    "url": "redis/index.html",
    "revision": "780e65d92560572bab716c680ac781ce"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "c6fe3a800b76f692fa488ecd84202517"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "ff43672f613c4fd23b9a3796e0363322"
  },
  {
    "url": "spring/index.html",
    "revision": "2e5c30db0c74b5f22d5a6f50e5831155"
  },
  {
    "url": "spring/ioc.html",
    "revision": "2c7e0b6b9389286498948460d56fbed2"
  },
  {
    "url": "spring/overall.html",
    "revision": "f8e75ee11dd5b473047e7661ef69bea2"
  },
  {
    "url": "spring/references.html",
    "revision": "9486613dae21f2450780cd347fd64a68"
  },
  {
    "url": "web/HTTP.html",
    "revision": "dfa9c2bacaa2c03b669983aa4afe80c9"
  },
  {
    "url": "web/index.html",
    "revision": "65e273656737cd0818262bd05482b75b"
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
