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
    "revision": "65e129cc87fbeea2a0ef9c0ebee54d1e"
  },
  {
    "url": "about/index.html",
    "revision": "a93c98ad525f07d91181e12f247cff29"
  },
  {
    "url": "algorithm/ds-001.html",
    "revision": "0e39cfa7aa603ee31d500797d2be08fa"
  },
  {
    "url": "algorithm/ds-002.html",
    "revision": "2ebefb9fd51ff9e1ca4ee478af550e11"
  },
  {
    "url": "algorithm/ds-003.html",
    "revision": "15dd827b393e1868ee280f765ec663ff"
  },
  {
    "url": "algorithm/dynamic-programming.html",
    "revision": "14f670c8fc4809b35b5e4bcdfc85db73"
  },
  {
    "url": "algorithm/index.html",
    "revision": "457b8752a22d40fc33198275a35b6656"
  },
  {
    "url": "artificial-intelligence/index.html",
    "revision": "ef8cb88f77a14a46cc77729d789e1618"
  },
  {
    "url": "artificial-intelligence/search-strategies.html",
    "revision": "731e521e8b1b2d973bfb07952bf388fb"
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
    "url": "assets/js/11.07f03e5e.js",
    "revision": "7455a0ef0b95e8d2942a0086170d03ea"
  },
  {
    "url": "assets/js/12.00e6435a.js",
    "revision": "24d58abd746486530801aaf82f4e86e0"
  },
  {
    "url": "assets/js/13.c713966a.js",
    "revision": "17fa15e977ecac8c54366995cf0fc2eb"
  },
  {
    "url": "assets/js/14.960b6416.js",
    "revision": "6841d229575efac13967170ada6bb96b"
  },
  {
    "url": "assets/js/15.111e6934.js",
    "revision": "72ff3ca6e2d5f1e71ea4d7f39dcc2de7"
  },
  {
    "url": "assets/js/16.a4cbb348.js",
    "revision": "98d0b9e3e4381e54bdfcdacf76c4fad8"
  },
  {
    "url": "assets/js/17.07bb20d4.js",
    "revision": "e293d2009ee81767f3d06b53454359cf"
  },
  {
    "url": "assets/js/18.24f7dfdf.js",
    "revision": "a435ae4a9b492b488382354b003efa7d"
  },
  {
    "url": "assets/js/19.9111c778.js",
    "revision": "1fd68c8bf05978b563d43512c498a9e0"
  },
  {
    "url": "assets/js/20.ce49d80b.js",
    "revision": "29a24276b4e445906575d014f347ca49"
  },
  {
    "url": "assets/js/21.785d1e24.js",
    "revision": "1dc669cd20ec82e63cedf306ecbb895c"
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
    "url": "assets/js/25.dc015f48.js",
    "revision": "8f3ce276a4b6abf90dc350680c3ddfce"
  },
  {
    "url": "assets/js/26.220186bc.js",
    "revision": "7197067a0b3ff80dab8a6316137ae4e0"
  },
  {
    "url": "assets/js/27.29b95c41.js",
    "revision": "2016c356df0d05f9958faf979e6a0430"
  },
  {
    "url": "assets/js/28.15650ad7.js",
    "revision": "c1f804057ce2a133b2bfb7716dba7b98"
  },
  {
    "url": "assets/js/29.18bf1c7d.js",
    "revision": "19e751e6f743ab2c24f61bdf50605d8c"
  },
  {
    "url": "assets/js/3.7837b6f0.js",
    "revision": "5666ccc39e11f2b5280d890c65c9d68d"
  },
  {
    "url": "assets/js/30.c964bf18.js",
    "revision": "500a32cababf4e65426d00350f08749d"
  },
  {
    "url": "assets/js/31.0718448a.js",
    "revision": "f8ca11765695d76931624270b10b7ce1"
  },
  {
    "url": "assets/js/32.8f0c6a0b.js",
    "revision": "7870b84498dbf29f66a8a9df0dc9e67c"
  },
  {
    "url": "assets/js/33.f7f54596.js",
    "revision": "07ef2365c8ed33d6c14196e4344f4543"
  },
  {
    "url": "assets/js/34.7f5b5fcb.js",
    "revision": "50cfadfb2dccc78dcfc987cc4f4bd514"
  },
  {
    "url": "assets/js/35.1740bc96.js",
    "revision": "61d1f576cbd0ef261182b6dfede61e87"
  },
  {
    "url": "assets/js/36.1ce5d065.js",
    "revision": "54d13f02fa51116fe48614b8f2016225"
  },
  {
    "url": "assets/js/37.10447d7b.js",
    "revision": "ce8ba2fdbafa15881d7c2601e0a82f27"
  },
  {
    "url": "assets/js/38.08c3bab4.js",
    "revision": "a0ecad8543e538e0a8a9395827de3b89"
  },
  {
    "url": "assets/js/39.4856d97c.js",
    "revision": "5d64695572b13ed6fe0cfe160c7fce9d"
  },
  {
    "url": "assets/js/4.82cbc76e.js",
    "revision": "ae37a1a9fed70cb970eb2fc85a834f1c"
  },
  {
    "url": "assets/js/40.84a013af.js",
    "revision": "b8f27be69975a10c69e0906ddb2090f6"
  },
  {
    "url": "assets/js/41.da1be60c.js",
    "revision": "a75bb500c2047563ca6f8021fa055562"
  },
  {
    "url": "assets/js/42.9911f9eb.js",
    "revision": "9a93216cb2559ac2f897b689cfef516f"
  },
  {
    "url": "assets/js/43.a1eaf45d.js",
    "revision": "29563df5d68852a1e17cc581fe0bbf74"
  },
  {
    "url": "assets/js/44.d56936bf.js",
    "revision": "8da3225bfa75afef951a7d474fc3e3a2"
  },
  {
    "url": "assets/js/45.823df19e.js",
    "revision": "33b3b17e9a5340fbb015403ef753820a"
  },
  {
    "url": "assets/js/46.fadc3c60.js",
    "revision": "31a9ea4dd0b99030aa3a4193039d9214"
  },
  {
    "url": "assets/js/47.1f9017a5.js",
    "revision": "41e1889c303a9bc9f626a66f266a91a0"
  },
  {
    "url": "assets/js/48.6e1bd59f.js",
    "revision": "4bf241b11ba220735e1e4065f7ad7edb"
  },
  {
    "url": "assets/js/49.f7247be8.js",
    "revision": "57e006a632460424e2c0dea7642e52bc"
  },
  {
    "url": "assets/js/5.2082fc82.js",
    "revision": "58c4483416df5853ff9e544f2459f30e"
  },
  {
    "url": "assets/js/50.420b11fb.js",
    "revision": "ecb94902503812d95ac8c3e5407787c3"
  },
  {
    "url": "assets/js/51.66398ed5.js",
    "revision": "d3e112d34ed28bc7f66de0771d764442"
  },
  {
    "url": "assets/js/52.22c8ce28.js",
    "revision": "8c33b552dc4b53188c7a7c6017fe4287"
  },
  {
    "url": "assets/js/53.9542b573.js",
    "revision": "c11aeb368cbe7e803f8d90c6a069e4ca"
  },
  {
    "url": "assets/js/54.25735df4.js",
    "revision": "83eca478dd6e6783e71d9a3844940349"
  },
  {
    "url": "assets/js/55.0f8db6d7.js",
    "revision": "77e726f272aa10cecb1143cf9b474444"
  },
  {
    "url": "assets/js/56.89cb62b9.js",
    "revision": "d6a826c38a29753c3f8f000bd4ad5be1"
  },
  {
    "url": "assets/js/57.2a13361d.js",
    "revision": "5421c6f037d3235a617709a404dafd8e"
  },
  {
    "url": "assets/js/58.531d06f6.js",
    "revision": "0bb52f377eee29673a5aa8e1e2c7989e"
  },
  {
    "url": "assets/js/59.2d64ae16.js",
    "revision": "23d75530b0aa887b2b8846f4aabd8d74"
  },
  {
    "url": "assets/js/6.99f29953.js",
    "revision": "f01027734dea5efbe6411d9538ace0ba"
  },
  {
    "url": "assets/js/60.d8f94907.js",
    "revision": "98bc02bc42309d9c2b5179dce3d7fb8a"
  },
  {
    "url": "assets/js/61.37ecdcf3.js",
    "revision": "64350fa86edfdd045c4e86e0d387693a"
  },
  {
    "url": "assets/js/62.d225a614.js",
    "revision": "a8b2863dc6cbf94cf385a682428ab7d2"
  },
  {
    "url": "assets/js/63.30b119b2.js",
    "revision": "435078b0dda00e81e52d7371f872a428"
  },
  {
    "url": "assets/js/64.07765652.js",
    "revision": "2e4763c813cc75b64c6a8d28395209a0"
  },
  {
    "url": "assets/js/65.5113121e.js",
    "revision": "8728ead3e4f2eb6fcd794969fd59215b"
  },
  {
    "url": "assets/js/66.fc2be658.js",
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
    "url": "assets/js/7.abea3f3a.js",
    "revision": "bdb289c68bef3bb6c3d9d005c49b62bf"
  },
  {
    "url": "assets/js/70.5c51f62e.js",
    "revision": "b96ab29685e4f2319d94ac3e31ba79da"
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
    "url": "assets/js/app.79fe8aaf.js",
    "revision": "01913488a174d78fcee2a6cdb2263d22"
  },
  {
    "url": "assets/js/vendors~flowchart.899652fe.js",
    "revision": "1a4a2e36ed845872fc6b862d84a31925"
  },
  {
    "url": "big-data/index.html",
    "revision": "9b20abc60c7524177ae09ef37ccd6b9e"
  },
  {
    "url": "c/constant-variable-and-data-type.html",
    "revision": "fd33c43500968336f14414969b9270ac"
  },
  {
    "url": "c/index.html",
    "revision": "8883fdd47901baefcc2cb8c6d4e25133"
  },
  {
    "url": "deep-learning/index.html",
    "revision": "11e1accc18ca75ea5e16536ad390ea23"
  },
  {
    "url": "deep-learning/logistic-regression-as-a-neural-network.html",
    "revision": "d82880cba26043220c00d20aa16e4697"
  },
  {
    "url": "deep-learning/python-and-vectorization.html",
    "revision": "f32864fa9d4ab2952ef91e36e1f477b6"
  },
  {
    "url": "font/JetBrainsMono-Regular.woff",
    "revision": "d4ff51ff52d30f839d5be70c33bf872e"
  },
  {
    "url": "hello-world/array-and-linked-list.html",
    "revision": "eaa02c6a688781a98e0a9b1aedbe6b29"
  },
  {
    "url": "hello-world/binary-search.html",
    "revision": "f5d8619c09bbdc562a3f593e315ebbc1"
  },
  {
    "url": "hello-world/building-a-vuepress-powered-blog.html",
    "revision": "4d332bb38faf8f558c39e42eee991af0"
  },
  {
    "url": "hello-world/computing-machinery-and-intelligence.html",
    "revision": "1cf155260f66b40264276c4277e4875b"
  },
  {
    "url": "hello-world/index.html",
    "revision": "d2c4b539e956fb2c7370abc0a1582a58"
  },
  {
    "url": "hello-world/setup-a-server-manually.html",
    "revision": "3c8cb4b843a10e28431bf8f14b85f3b6"
  },
  {
    "url": "hello-world/the-right-way-doing-research.html",
    "revision": "90b8f0d8559de77dda04f689897f3b9a"
  },
  {
    "url": "hello-world/TODO.html",
    "revision": "8d566f70c462d4ac64ef001b97b8f6e2"
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
    "revision": "a6d0f7c1f165f75ac144cdff4d249760"
  },
  {
    "url": "java/API-introduction.html",
    "revision": "f45e7cbeb789031776dc537ec611d8d7"
  },
  {
    "url": "java/API-io.html",
    "revision": "af1fa7e5494be0d43e02853f0cdc31c3"
  },
  {
    "url": "java/API-lang.html",
    "revision": "958a6cbfc71bde21259bdd98d9dff127"
  },
  {
    "url": "java/API-util.html",
    "revision": "5df06dc07d865688413aaa57103e21c0"
  },
  {
    "url": "java/grammars.html",
    "revision": "dc41d64046d793253917a10c6145b1e2"
  },
  {
    "url": "java/index.html",
    "revision": "febcff22856a0691cfc7834a84bb0b1a"
  },
  {
    "url": "java/jvm.html",
    "revision": "c25a426ccd2dac995ab477ec4239d307"
  },
  {
    "url": "java/object-oriented.html",
    "revision": "03d8560ab9aacce518a781f56b93e49f"
  },
  {
    "url": "java/references.html",
    "revision": "b18306829a8e2d8223cff419d40562ba"
  },
  {
    "url": "kotlin/index.html",
    "revision": "4270b82eab308ab7c09fa95ff2ad922b"
  },
  {
    "url": "math/index.html",
    "revision": "8fbd8d9ebdcbcefba4b8de25670c13dd"
  },
  {
    "url": "math/multivariate-function-differential.html",
    "revision": "bfdd240361419819c06a0d44967ca73d"
  },
  {
    "url": "mysql/divide.html",
    "revision": "37d4a2fbdc33a366b530d6cd8c09610b"
  },
  {
    "url": "mysql/index.html",
    "revision": "9394b982a3bea5e6b5e47996266f4446"
  },
  {
    "url": "mysql/indices.html",
    "revision": "4221da3cfe5c6dea165560be2c2cb768"
  },
  {
    "url": "mysql/lock.html",
    "revision": "06536ccd3dfbaa8dfc08e14f4b577aa0"
  },
  {
    "url": "mysql/question.html",
    "revision": "327e91011f3bd7774785e882c874c5e2"
  },
  {
    "url": "mysql/references.html",
    "revision": "3a6a30e44cd95a5c0390a6bedb11008b"
  },
  {
    "url": "mysql/transaction.html",
    "revision": "974ff1da9075e5a8e1dcb2854e9d23a8"
  },
  {
    "url": "python/grammar.html",
    "revision": "6995cdcff359c8418cfecd80f7071349"
  },
  {
    "url": "python/index.html",
    "revision": "5dcb27e45535eb1ec451aec2accaaf2e"
  },
  {
    "url": "quantitative-methods-for-DA-AI/index.html",
    "revision": "88ee740718b7a9a4855d78afdfff8504"
  },
  {
    "url": "recommender-systems/index.html",
    "revision": "08dfec961d62b93d471100ed080543bb"
  },
  {
    "url": "recommender-systems/introduction.html",
    "revision": "49f8d499f613d7c2ddc682ba4d34ce42"
  },
  {
    "url": "redis/cache.html",
    "revision": "775fdc7fd518a59718b68f36f8d42941"
  },
  {
    "url": "redis/cluster.html",
    "revision": "d06c9ec065402edc5a8aa1bb4de8ece3"
  },
  {
    "url": "redis/index.html",
    "revision": "73f1598150d95769edafbf7554ca35b3"
  },
  {
    "url": "software-engineering/index.html",
    "revision": "3eb2e787a05bbac19a37adbae7c0a7ce"
  },
  {
    "url": "software-engineering/software-process.html",
    "revision": "05890f56a4134f83671a53ffcbcfd5cf"
  },
  {
    "url": "spring/index.html",
    "revision": "5ee7b79b5d7218172a362fa281eb16c3"
  },
  {
    "url": "spring/ioc.html",
    "revision": "d76b79a3efef045cc2d2cfb707cf07bc"
  },
  {
    "url": "spring/overall.html",
    "revision": "f8e06d74747691be06ebe7ef86ebddc4"
  },
  {
    "url": "spring/references.html",
    "revision": "0b2caddc16a78e5e8260b362a764852e"
  },
  {
    "url": "web/HTTP.html",
    "revision": "7591a8de164d8451e40cbce9bb39e541"
  },
  {
    "url": "web/index.html",
    "revision": "4baf5c10177b12df645583a3dbd1eb4b"
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
