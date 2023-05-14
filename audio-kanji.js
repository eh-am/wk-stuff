// ==UserScript==
// @name         Audio Kanji 4.0
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  based off Audio Tweak 4.0
// @author       Hubbit200
// @author       Kumirei
// @match        https://www.wanikani.com/*
// @match        https://www.wanikani.com/subjects/review
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wanikani.com
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
  "use strict";

  const AudioKanjiData = {
    あい: "https://files.wanikani.com/2t2rqp3yihzk2665s4kxrhyr8ejj",
    あおい: "https://files.wanikani.com/tw081oc562nt4ao26ugzjevqkoym",
    あか: "https://files.wanikani.com/06vuuh0wi033oy509b08uufzbe8h",
    あかつき: "https://files.wanikani.com/f1muookk8c4z2wkb1qvljwbfm61d",
    あき: "https://files.wanikani.com/d9f1ny1rcmx6dqsucr23rvl6oz2o",
    あく: "https://files.wanikani.com/fqwtkcyjwhxqrsmigqcv5fa5dhre",
    あけぼの: "https://files.wanikani.com/p54ltyhu7kcsfkqt1m9wzkc2r7vv",
    あさ: "https://files.wanikani.com/6nq2dse1nan1fj9ofz3i4ja41uoi",
    あせ: "https://files.wanikani.com/oj9d1abbcskhotfayxra04yz9kma",
    あたま: "https://files.wanikani.com/uv9hu125lm0gk18lcs571vjvtrps",
    あな: "https://files.wanikani.com/t55zmfs3ehn279hcdu0dg4lx5rmk",
    あま: "https://files.wanikani.com/t8dpeg2tdjlvji41jcfdfvv4py12",
    あめ: "https://files.wanikani.com/bydte802zhzkrivvhylagsomjfb0",
    あらし: "https://files.wanikani.com/b016hnklpqg5ilffn1runtgb7tjg",
    あんず: "https://files.wanikani.com/o20k8eq2v39pyn1s4kh5557eiytt",
    い: "https://files.wanikani.com/hiftm8zh0n9m7np02twcwyh7lckv",
    いき: "https://files.wanikani.com/etr7c850sn3pwu6d4ddfbtm4rq9x",
    いく: "https://files.wanikani.com/neeg5j7ghi6ay2jzbhpqcaon49cf",
    いじ: "https://files.wanikani.com/vnhhckwwgaramdda7ffahx9qj9l6",
    いち: "https://files.wanikani.com/7n4wu3xh3grz6gegiryea4eroaz0",
    いちご: "https://files.wanikani.com/vdzzur8zkmkessqw79jz06gdf6wm",
    いと: "https://files.wanikani.com/jp06uumrhv8pnrcby3f86o59qk0c",
    いな: "https://files.wanikani.com/wjh9ldjxegel5y26pmsvrlsvcagg",
    いぬ: "https://files.wanikani.com/bbxc3am1ra5zvilk3pj22bxuplb0",
    いね: "https://files.wanikani.com/abf8vih9nz5zbgdprnnretyi6cp0",
    いばら: "https://files.wanikani.com/0v8k3nnshgz9330pnyzmcj9clq8e",
    いも: "https://files.wanikani.com/d1lpec5q4huqwfii1kiygw209lli",
    いろ: "https://files.wanikani.com/tgmeazgh063i2uddit65qnbo6tvh",
    いわ: "https://files.wanikani.com/yi83qtczozayy3efjul4yxgx86gx",
    うず: "https://files.wanikani.com/tc3v4hoqu1kx06zel9iwu8p2o27h",
    うそ: "https://files.wanikani.com/c2la0n8salmf783j6qm29ctj20ye",
    うた: "https://files.wanikani.com/cp5qaw91yccj0rl4t9et2bj2eno4",
    うつ: "https://files.wanikani.com/wcfbl449wsk3hrn53yz237lzhqbt",
    うで: "https://files.wanikani.com/ntag42tlltlogusiuv41hh9cdkxf",
    うめ: "https://files.wanikani.com/hrx5787ij3h2jpm2eqxl3ooabkpq",
    うら: "https://files.wanikani.com/ia1v7p073se7z922pngmrma9dot9",
    うわさ: "https://files.wanikani.com/2wnsdhxayexv9imwkjmjg01852vc",
    うん: "https://files.wanikani.com/k37faj9q3hnxw0q9tha3z5fiwwf3",
    え: "https://files.wanikani.com/jnwd9tclw0g1lx7lowgy06zsmu01",
    えき: "https://files.wanikani.com/3xdp9tzcnjm0q52yhmb07resis5t",
    えり: "https://files.wanikani.com/klow35nw3yx8p8igqn57kw09z0kv",
    えん: "https://files.wanikani.com/f962sjhjy3qejwml0c0fse0mo7jy",
    お: "https://files.wanikani.com/x6wjet6dtepxe1nolukrmqu85hlt",
    おう: "https://files.wanikani.com/y3v8t938hg6z3dr2rk7z3vgs9pz6",
    おおかみ: "https://files.wanikani.com/k5pe6eb46cu7plcr3zankx9r8dqg",
    おか: "https://files.wanikani.com/ks4mm7oct3qtmo207poy1jzbivgs",
    おく: "https://files.wanikani.com/6zw042zigw46s0jk6ztyy39qxd2b",
    おつ: "https://files.wanikani.com/ekiusf7p32y7cnai8jz0p0d373qm",
    おれ: "https://files.wanikani.com/qq6ud6mo1me9dfl7o214nltq23qp",
    おろし: "https://files.wanikani.com/7v2rowflgfhkjq7o3j7he21hjbgj",
    か: "https://files.wanikani.com/avq4ziadu7v62lthhwuagjc92y7r",
    かい: "https://files.wanikani.com/u2sp3idy5ojptcmdegsne1nedbvf",
    かえで: "https://files.wanikani.com/1abj4ddqz8ennczzktwsewxise9o",
    かお: "https://files.wanikani.com/7wlb3byachjgpknvarywjx9pce01",
    かがみ: "https://files.wanikani.com/qedobj37fwza9bsyhdaby5wgkzzk",
    かき: "https://files.wanikani.com/r3pwrccrm9nqcxa7dw102deog6ef",
    かぎ: "https://files.wanikani.com/015qwaxb7na6rssyz5urhi54fwp5",
    かく: "https://files.wanikani.com/5vvnb1rf42695unj7smdx5gam3fm",
    かけ: "https://files.wanikani.com/0vts38w7xkk8xgxya3yz1lw0nid2",
    かさ: "https://files.wanikani.com/4s7926r58kidiafkwu9agbgj44sl",
    かじ: "https://files.wanikani.com/np6ph1x8llpa6wqtz9jwnxv7l1c7",
    かた: "https://files.wanikani.com/0ydzesiparz0nz97aia6qpuoeubs",
    かたまり: "https://files.wanikani.com/igno6p6emu85nztw10em5i8q80wd",
    かつ: "https://files.wanikani.com/294036ufjr42cygputcubxwfb3cs",
    かに: "https://files.wanikani.com/ymf7gep5c9voqhcgtrf86isr8iob",
    かぶ: "https://files.wanikani.com/zdgc7hw2slnnbw2d2lsvcppvlh54",
    かべ: "https://files.wanikani.com/oynqcw6zzkl2ub72eqaa6k0apobb",
    かま: "https://files.wanikani.com/qy7hvwj5abjtvxofg2wfl12hz7c0",
    かみ: "https://files.wanikani.com/ohh2992tohsqbeb8ngrj5soz8nz8",
    かめ: "https://files.wanikani.com/zg8fcusterzn6gu8hn7nspp4uc5n",
    からす: "https://files.wanikani.com/dswvb3l9dmc0leelx4vxwulkkhww",
    かる: "https://files.wanikani.com/b67yu2bmhnazv3qzsqlxvwwlmws0",
    かれ: "https://files.wanikani.com/9alak1vry1c7z5dl1r6hqx1bpbf6",
    かわ: "https://files.wanikani.com/dtu9xlnp57ucjrz26axv9xovquh8",
    かん: "https://files.wanikani.com/vmnefas2ifbuikyt7vxkcl40db2z",
    がく: "https://files.wanikani.com/nzt4x93yopffw5z8f52g2vj8iai4",
    がら: "https://files.wanikani.com/mfa14enhhafz15bsls0zdjaow19u",
    がわ: "https://files.wanikani.com/gb8vokhvcny84msc7o6t76dpgg2k",
    き: "https://files.wanikani.com/isx37dh56344fiult7n0mdl9fy3s",
    きく: "https://files.wanikani.com/zbg6u9fsqzsny3i9zt7rdje5sp2q",
    きち: "https://files.wanikani.com/eqcwdjtmasp3jelrvidn2b3n5dw7",
    きつね: "https://files.wanikani.com/x3kajxvb2lwb3a67ytbekdmmlp27",
    きゅう: "https://files.wanikani.com/4cmgqo1hu071him5xv8a19yy8cgd",
    きょう: "https://files.wanikani.com/3j3ulfd4qavx32wxgcbqtat7f4du",
    きょく: "https://files.wanikani.com/etqv5uzykcmqppsg29oavr1st6fb",
    きり: "https://files.wanikani.com/nm3m8qb0v261kwavqtlv2ewac848",
    きん: "https://files.wanikani.com/cj0mte48g03w41cwychvnjst2fbr",
    ぎゃく: "https://files.wanikani.com/4n899feh827v6einmpcj7h5aiq11",
    ぎん: "https://files.wanikani.com/7vhxubzrk7r0m1ky1muq74ubesa7",
    く: "https://files.wanikani.com/33wwfkhrgx5bq6lcuy6hyww2xxw1",
    くき: "https://files.wanikani.com/gkc35lijrc4s5rcbdq6j9h4wgev4",
    くさ: "https://files.wanikani.com/vr0mz8aczvnzj2n1863ct9yi5cnv",
    くし: "https://files.wanikani.com/m45hgtk2w2en6to3zxuoo9nw4w13",
    くせ: "https://files.wanikani.com/akqdrg967x22dewdsfag50rg2e8x",
    くちびる: "https://files.wanikani.com/tbv9pgu66heou328ntk5506mxqts",
    くつ: "https://files.wanikani.com/b59m7zaf24at1xw3534y9yx3nznk",
    くび: "https://files.wanikani.com/saz7nbak3i60pijxsdjci8l5mr7f",
    くま: "https://files.wanikani.com/n0tmaoa1kofyfva5hix3nb38aem4",
    くも: "https://files.wanikani.com/fxwiwp0be3o87mbzgyfw4r5umvmy",
    くわ: "https://files.wanikani.com/acm1tan2asjwy27de8xb1fto9aok",
    くん: "https://files.wanikani.com/nqw2cn0hlkgc1cwscy685dqd0cfw",
    ぐ: "https://files.wanikani.com/npfm2rfpgnaf9hbbamrx91uuyybu",
    ぐん: "https://files.wanikani.com/k7z1y9ji8tlg7kzdz3lmn8uv5khf",
    け: "https://files.wanikani.com/jqvtmufclsxfkgtzsw18i2uk4uby",
    けい: "https://files.wanikani.com/mapja18e0heght70ts8dreinhwpx",
    けつ: "https://files.wanikani.com/whlmhjy9ndv3u8njarz142aouius",
    けん: "https://files.wanikani.com/gz06rgprk609wr6rlkkmz92c5hmk",
    げき: "https://files.wanikani.com/h1lo0slv4vxi0ur6btdrognq0006",
    げん: "https://files.wanikani.com/flyct023tygcun61zv31i5bna3ax",
    こ: "https://files.wanikani.com/ju67jl0fvh8oyslezsuom39peuch",
    こい: "https://files.wanikani.com/fybor33vtfzflspmacuq3egbe0ig",
    こう: "https://files.wanikani.com/qyuul5ucmtl92k2aaza69c242uq7",
    こえ: "https://files.wanikani.com/phd5jopwcmaryh3l6h9w8igxj0co",
    こおり: "https://files.wanikani.com/os3vvmbz1mf6v3dx3r3x2un9gl5m",
    こく: "https://files.wanikani.com/hbzgsvo64j94zptd9cfom0eyzyj9",
    こし: "https://files.wanikani.com/5l1708l61xbk70ybdf0kpia4jqwk",
    こと: "https://files.wanikani.com/z4on9h0up7ggf81pld1uuiwqftvi",
    こま: "https://files.wanikani.com/tp6rn5q42l1f3b3cgjq5f3073v8h",
    これ: "https://files.wanikani.com/q1e9hkyol4xdevk4bpl492rl8e4a",
    ころ: "https://files.wanikani.com/r11bku3jg50h7rx9owvesqjff1yc",
    こん: "https://files.wanikani.com/lthvn3c5zm3rm4q0bsb14yav5o29",
    ご: "https://files.wanikani.com/59eqebn0ua3gu8imu2q44warjcb3",
    ごう: "https://files.wanikani.com/jatdv0mka00wzxixc205n7cai654",
    さい: "https://files.wanikani.com/r869uc9r2c1a2v8xlui25eze1eew",
    さか: "https://files.wanikani.com/ireyxd0y3zfuuuwmlgfa8lfm50bx",
    さき: "https://files.wanikani.com/qpupyrgvtnfqa00l2wm231spddg2",
    さく: "https://files.wanikani.com/spdmn5qml0ljg7307nhkbkabyef2",
    さくら: "https://files.wanikani.com/45xfy3yla3vbbhckgzjagxy0h7t9",
    さけ: "https://files.wanikani.com/ua9sgmd65qt02fzixhrr2hnzqjvm",
    さつ: "https://files.wanikani.com/3pszd5pqu6mtpvqvni3dxmn8mceg",
    さと: "https://files.wanikani.com/5mw3w1s9jdw98ztbvpimyjv7jy1b",
    さま: "https://files.wanikani.com/gqgkfcqmeapoo34qdmnbsyf4s6x6",
    さむらい: "https://files.wanikani.com/m7l8pa6ctxu2p7y65788xqfy39rg",
    さら: "https://files.wanikani.com/d2cjm99elog0ljo1z6ym3gefxhhw",
    さる: "https://files.wanikani.com/gv6g7ft0nqzzlu7262e7gnlpbp5u",
    さわ: "https://files.wanikani.com/o7qp644hcde14rfq76y1nk5spz3m",
    さん: "https://files.wanikani.com/qntk5h0s02b7vdh8vkx579538u6p",
    ざい: "https://files.wanikani.com/9jdijh2him8ujr7e71uq5ci0whnl",
    し: "https://files.wanikani.com/1vppu9cdiip8i8731xqz5syszl61",
    しお: "https://files.wanikani.com/oetfb0kjsb0btdkxh4qaemysf9fd",
    しおり: "https://files.wanikani.com/x0umurifaddkm3czlyelgm6djmub",
    しか: "https://files.wanikani.com/ba4p9xh9m2usz44xhv4r7y687zr6",
    しき: "https://files.wanikani.com/vj00lk680uxukhapixzctlthj0tf",
    した: "https://files.wanikani.com/exrcl339w14h1lyxfdix7si41iif",
    しつ: "https://files.wanikani.com/hhwegp50p6hfltich5hg5st6qrkg",
    しば: "https://files.wanikani.com/3ego5q1wvyjtn0gkguw67vuj6yy5",
    しま: "https://files.wanikani.com/nf0l3lk7uuoapa81tcwqfvr9gtfr",
    しも: "https://files.wanikani.com/0xutb2jykl7vmsu5moxow6d4ip0p",
    しゃく: "https://files.wanikani.com/067w3tyv31y74kujcanx67wgjrit",
    しゅ: "https://files.wanikani.com/lwmzoyirr2vqk6d6skij45jw355z",
    しゅう: "https://files.wanikani.com/166q3xm1snm9walqx7db56ieuve5",
    しゅん: "https://files.wanikani.com/u45yylkoiynmesyxh1ngnnu6zt45",
    しょ: "https://files.wanikani.com/qkhj65yuimns8lsq3pnni5mrc3uw",
    しょう: "https://files.wanikani.com/8i6n0ng529yribd10p3txg9fnoxl",
    しるし: "https://files.wanikani.com/corfmx4qryzv52efethxn6qxmjrk",
    しろ: "https://files.wanikani.com/b0j8lv363khh8afvq62m9mxpl9cp",
    しん: "https://files.wanikani.com/sdpi1j2tvowziiyjpvo68egnq1ul",
    じ: "https://files.wanikani.com/2q4hsmasi4mxfuunk4ghndwetc88",
    じき: "https://files.wanikani.com/wnwzpfp6414t83hwbcylbvheymdx",
    じく: "https://files.wanikani.com/3ihfec17wvxh82v8e8xyagkhpdel",
    じつ: "https://files.wanikani.com/o2zrxmtve61xprbg5dc2b8jazhlv",
    じゅう: "https://files.wanikani.com/cpftgyrsdnallh1z0n1khaoti7pn",
    じゅく: "https://files.wanikani.com/ai66apwm03ouaqcjc2yi2y2mc88c",
    じょう: "https://files.wanikani.com/fc7srz91p1789jemaubtb7aohsjq",
    じん: "https://files.wanikani.com/bmgmkyy2rfnj897s9rezqnm4by46",
    す: "https://files.wanikani.com/oluxd56849qp1iyjpla639mk7bdn",
    すう: "https://files.wanikani.com/qir7kgj2cil5cc8nzxxzkwsytmsz",
    すき: "https://files.wanikani.com/rous2msdtfvfldsc3e9jt1gg71hd",
    すぎ: "https://files.wanikani.com/iz5vnnonh90zrof93mkcnm7fab1t",
    すみ: "https://files.wanikani.com/z9ni9acv7h1lk38vdtac2wpp1ihw",
    すん: "https://files.wanikani.com/qzra7anl5e918zhb82rfp5zbn7vy",
    ず: "https://files.wanikani.com/soz93jhbmo48ewl0j07dkummn70u",
    せ: "https://files.wanikani.com/r7et9uyhyo61whwwzfqj96cqjfrb",
    せい: "https://files.wanikani.com/h1q6k87wr3qu9vspavwazrmta7dy",
    せき: "https://files.wanikani.com/u1kzdr41f90dth5805pa4pr9rhc3",
    せん: "https://files.wanikani.com/x4yaopcvyzqbd60oqmo046q1pqge",
    そう: "https://files.wanikani.com/21wgny81wcwg482v5a7pkwlk4zcc",
    そく: "https://files.wanikani.com/ukvopm0xhm29qoq9oc89tttrk3wf",
    そこ: "https://files.wanikani.com/60l5ykzfg1gs3wsd6mhuzn0bpymr",
    そん: "https://files.wanikani.com/hmc6mpcvnsdiebytsa6jhnniwznh",
    ぞう: "https://files.wanikani.com/fqmuawxicbe2zyy94qa7m1h83yb4",
    ぞく: "https://files.wanikani.com/031crhwu06oznv7xnf89tsrlneoz",
    た: "https://files.wanikani.com/iz98ra3230f7sbsp079s9z4c2rfi",
    たい: "https://files.wanikani.com/h65rd9c712z1xeeircj9bqptgi3c",
    たき: "https://files.wanikani.com/lom62hk84c1ortsla85d4vfu0p57",
    たく: "https://files.wanikani.com/jgrqlvu456h22953yp8pz7gt4g6l",
    たけ: "https://files.wanikani.com/uhzkhsdb5o2w9ayxfwnkib4cgjal",
    たつ: "https://files.wanikani.com/f79hy3a06a2f8yrsevtdoulfdxk0",
    たて: "https://files.wanikani.com/nka151uhnsjwtllpiv7mptvjr925",
    たな: "https://files.wanikani.com/vzrpqlsl8oa112klafvb70il18g2",
    たに: "https://files.wanikani.com/7todho1vo6ypz6nplzpti4kgz6u3",
    たま: "https://files.wanikani.com/xt71lquuk7oui986q5pgt9mn7nz6",
    たまご: "https://files.wanikani.com/v04a28buq00ypijwadmjhocx3g1j",
    たん: "https://files.wanikani.com/x4lv7tw8gry2ucyz2e1qzqq9mwtj",
    だい: "https://files.wanikani.com/nrhl6dovxsfo7x1usg5q5q5q40sc",
    だく: "https://files.wanikani.com/2040jnh7xbp7hk74cmoglkdj3ud7",
    だれ: "https://files.wanikani.com/7lki1crdv8lt9cnfnbw3gewx09b7",
    だん: "https://files.wanikani.com/wm792ak318d8ujzviuc74e0jb6bd",
    ち: "https://files.wanikani.com/kqv5t10wa849euzy8zsvs37gbdws",
    ちく: "https://files.wanikani.com/6sijqe9iowh2kuwnlxleysbj6pah",
    ちち: "https://files.wanikani.com/8xux0k9p4xwd0m23czch6nkoe4zb",
    ちゅう: "https://files.wanikani.com/dloam11hd7lwbn5p1ry1qmvs2lbc",
    ちょう: "https://files.wanikani.com/kqnojq81rpbg4y6dxusfe8y53fut",
    ちん: "https://files.wanikani.com/ucg2fbqhnic64xl109mdwpt15kab",
    つか: "https://files.wanikani.com/xjhngnpsgzvto4vg03cvqug6t1z5",
    つくえ: "https://files.wanikani.com/fk1lyl7dyjhc46ish58rd4rsmuh1",
    つな: "https://files.wanikani.com/lzgcqjxwfslpsb341d43uv1dvf0z",
    つぼ: "https://files.wanikani.com/icvwzwqvdbaoewg8vx1gvqy7ebmr",
    つま: "https://files.wanikani.com/wf5jdsacx7ddt3wragindzjfnoxo",
    つめ: "https://files.wanikani.com/bftmoa4v7wzh45ir5w1dz9d4441s",
    つる: "https://files.wanikani.com/bvkg5qnok52n6no6ny5ig9ykz67j",
    て: "https://files.wanikani.com/hvpfzeo4rbxtinmogpjwx3ko3mh2",
    てい: "https://files.wanikani.com/cstuiwh8duuv6bfhrjtx1pwp1ai3",
    てき: "https://files.wanikani.com/h6lvd8njti7suf1kebd8wmnp9c5k",
    てら: "https://files.wanikani.com/gkq1lkqewdm885zlnhloxgltpxzp",
    てん: "https://files.wanikani.com/4oqabo9774lf8a1zj21n0s11s6on",
    と: "https://files.wanikani.com/8k7lhjprxmvf9txjhxyjr1kvdjfz",
    とう: "https://files.wanikani.com/7eoavpf45ahlh055q9h3yf98jbjl",
    とうげ: "https://files.wanikani.com/debcqm4mpu6a041cya6zfjcckr1p",
    とく: "https://files.wanikani.com/ccjimkp426mkqfheoety2km3tpie",
    とち: "https://files.wanikani.com/8pvurau2gyy4whi62wce1fta9wuj",
    とら: "https://files.wanikani.com/q48j6k98cf79u70i6vro2cux8uaz",
    ど: "https://files.wanikani.com/2uxsrx0gcsg56mybfun86pki6uln",
    どう: "https://files.wanikani.com/nwzqmaej3d1cafz5aq6el3rxdjo5",
    どく: "https://files.wanikani.com/3wcg3ior6ulgtygh69v2f9sm8ec1",
    どんぶり: "https://files.wanikani.com/gki1rkck0tj8cdc65d8pfp99ragf",
    な: "https://files.wanikani.com/k8z1gna6vauepeipmlao2wgpz198",
    なか: "https://files.wanikani.com/u3v5cl0zh9ejwucbir8y3jf0j2pg",
    なし: "https://files.wanikani.com/b2dwkrpkfgo50jrha6tv1jh49jwr",
    なぞ: "https://files.wanikani.com/h0d7xdapgp2bjtvo2f20bwq5zqpg",
    なつ: "https://files.wanikani.com/58x1acnehst0nt8omglvol21h3t3",
    なに: "https://files.wanikani.com/vk5da3y7ua0p9wemkusnkpl5zwmq",
    なべ: "https://files.wanikani.com/hah6sij7xrouk8excsuhk8fdf0gs",
    なんじ: "https://files.wanikani.com/eq6lex3fcsy39stxwxkkufwl5msh",
    に: "https://files.wanikani.com/bb5ywwhjvm4hen1ix5w3x40wgn3f",
    にく: "https://files.wanikani.com/xbq5hkws2rjextq0jus8qgdk3sf4",
    にしき: "https://files.wanikani.com/xumlv81f77w9gszirdssbdwr2vk0",
    にじ: "https://files.wanikani.com/dk0n2bcdk6xm8bzm4rh9obfursss",
    にょう: "https://files.wanikani.com/cf27tqpqet1fojn1npv33mmvh4rf",
    にん: "https://files.wanikani.com/tgtlqvbmly1vz057bz0xkhbew6tm",
    ぬま: "https://files.wanikani.com/wxikxanqu40spww3ox9mrqvvmn87",
    ね: "https://files.wanikani.com/osjp50kjwpfjho54swwxfgdah19a",
    ねこ: "https://files.wanikani.com/be239wcuj2ccesqlp4ncpuhi8413",
    ねつ: "https://files.wanikani.com/u83gar6mqod36m1lgfwls315hqk4",
    のう: "https://files.wanikani.com/cvxpgwe0qi9du0q6z7ijpa8txrmg",
    は: "https://files.wanikani.com/jagezqu9r870dqi1mjszognyrv88",
    はい: "https://files.wanikani.com/d5zil4v4kutwtwnlit6nfj12y6pc",
    はく: "https://files.wanikani.com/6txk2xb44vf9wx338ahih8q73l65",
    はこ: "https://files.wanikani.com/53dovvlkrh1r78xkfrrldenbsfxf",
    はし: "https://files.wanikani.com/099i5syxvo0ui22w09tvdwwpmfdc",
    はじ: "https://files.wanikani.com/bftk8xm019pt285dwrw1kp3i7awf",
    はた: "https://files.wanikani.com/up8t6mtugkdz4l8esgv028b42mfs",
    はだ: "https://files.wanikani.com/91zet74pn0xnxl29p2y84lwidu87",
    はち: "https://files.wanikani.com/izfsuc8tlxpyd70wyhvgnj96cuk2",
    はと: "https://files.wanikani.com/d68cow2umbx0mqr3njzl1skbm2qf",
    はな: "https://files.wanikani.com/qy69fqj0sit82xor73xq2olottkx",
    はね: "https://files.wanikani.com/t30f2d88m90ej2ib6tsxs104ua3o",
    はは: "https://files.wanikani.com/jzocvhtpfdrcfyskf97phl6a9ugw",
    はば: "https://files.wanikani.com/mv0omfjoegf38oqnpzyfo97g1fo4",
    はま: "https://files.wanikani.com/txt04frkylt0aqbyj16tep84rvit",
    はやし: "https://files.wanikani.com/6zn3ypovy2osmyvt6wjo3zhlyhnt",
    はやぶさ: "https://files.wanikani.com/eejfd6k26d9c1lbyn43v7auprkpb",
    はら: "https://files.wanikani.com/sc1v4yflwyic0iroys0vze1o2mit",
    はる: "https://files.wanikani.com/kqde6z7sblujj8m5wj4sq871f12g",
    はん: "https://files.wanikani.com/awyyc160z1y8oswjsgwqix892zh8",
    ばい: "https://files.wanikani.com/71d6kgrflce07haf2tovlk376q2i",
    ばつ: "https://files.wanikani.com/7yg0ga9ejqvfld0cnurf7b2bzztk",
    ばん: "https://files.wanikani.com/6lgdglkt924qdscg9sb0jmfeh4zt",
    ひ: "https://files.wanikani.com/825xi5ke9fyinpl4ir6g9l1l6x7j",
    ひき: "https://files.wanikani.com/q6nzsk8fk9ri0zy1nx7hi4eyusuo",
    ひざ: "https://files.wanikani.com/jp43ew7fufkbzjr8pppnv6k8npio",
    ひめ: "https://files.wanikani.com/7thh3135epyl9k1r3f9uo8g3jfux",
    ひゃく: "https://files.wanikani.com/eyvnamfcd0cnrwj6ukwvr53f89ok",
    ひょう: "https://files.wanikani.com/wgdiz95k6ijt22cbryyr8hxkvtuq",
    ひる: "https://files.wanikani.com/9z0bms74vn012hzh42kx3hfykqoy",
    ひん: "https://files.wanikani.com/1bcrsaz027cn57izoj99txcs5l46",
    びょう: "https://files.wanikani.com/fa5cco3homt9ga1bcect64dp3a9r",
    びん: "https://files.wanikani.com/ldzr6purfzt0m3rn15hnfhknv9bv",
    ふう: "https://files.wanikani.com/g4d9yytaeubjouw1t9agvbuz4d5u",
    ふく: "https://files.wanikani.com/m8iryidwyeflrgnzb03srqv3mh92",
    ふくろ: "https://files.wanikani.com/skyvi4e8ktj895hvq2q2473llwef",
    ふじ: "https://files.wanikani.com/05k86hhdryxzxjuld4q5vkibznt0",
    ふね: "https://files.wanikani.com/el08q45ycfcap4k9gkow1n6ka1d0",
    ふゆ: "https://files.wanikani.com/qidbbav8474uvi96p40k1h1uc3uc",
    ふん: "https://files.wanikani.com/ymai6cva6gjtb3uyc5hq4y5pwmww",
    ぶ: "https://files.wanikani.com/n8omo5g88f47v6nuqx4s16ttlrei",
    ぶた: "https://files.wanikani.com/iuln9iqu33uqq19p5tv336vq93pn",
    ぶん: "https://files.wanikani.com/35i43qqh2bet563rbog394sgltuf",
    へ: "https://files.wanikani.com/36xoqiqw2mmt78nuvp63gno1bqbw",
    へい: "https://files.wanikani.com/lsvs7oknuba20zevslqextvbsk4l",
    へび: "https://files.wanikani.com/xtu72a8n2i2yplqgyh6d1h3kz42h",
    へん: "https://files.wanikani.com/7tbs2oj7t7cd4x0hrcizz3mhgv9h",
    べつ: "https://files.wanikani.com/dg5ljrxtb2d2rvfiu7i68xs7p6kk",
    べん: "https://files.wanikani.com/nkktm7wy76tz614iyvtr0wg5p7x3",
    ほ: "https://files.wanikani.com/2f9vkshkvg93xj0z2nmtcxk8blqi",
    ほう: "https://files.wanikani.com/z9e8vy1uw00ra27ct0n97gkhegto",
    ほたる: "https://files.wanikani.com/n3c0g3yo2dccg7id01cc55nqgo3n",
    ほり: "https://files.wanikani.com/0wuezcc705lfs61z4xkqngun5tlw",
    ほん: "https://files.wanikani.com/lh8fd0dl87c80wzarmrz9mjqwt3v",
    ぼう: "https://files.wanikani.com/dpbt6ppgtc4xdsamu9eou6wokx2f",
    ぼく: "https://files.wanikani.com/bibhbkjnuyoyb0qnxc0vksurj3n1",
    ぼつ: "https://files.wanikani.com/2kl2btu4msnft1mk6kilaay6qhsk",
    ま: "https://files.wanikani.com/9s45qrkpc9r719ycj7eaza3ql6z6",
    まい: "https://files.wanikani.com/39catunspzcdlubhw4jnnz4inskw",
    まく: "https://files.wanikani.com/3anfrtp13x0k21ebi6tyugmnhzil",
    まくら: "https://files.wanikani.com/ojtlqasgtnw7sy7j0ckk9bxsro8n",
    ます: "https://files.wanikani.com/qb9jzf0qun26e6ell06d12p3a1vd",
    また: "https://files.wanikani.com/mlhnciszn0g7ln19m4pnrfihfze4",
    まつ: "https://files.wanikani.com/4vuhjm6nrjj5m7rf6l7yqclk62ci",
    まど: "https://files.wanikani.com/j6tqawoh9516dw44tqjgu7cjrmw5",
    まる: "https://files.wanikani.com/3walg2gpk72bedsuku658qaa9jh8",
    まん: "https://files.wanikani.com/d7fvn1w10esf42k6ggqyuvqa0dqv",
    み: "https://files.wanikani.com/2b2wlvbo57y7filkt0xca5g2o1dk",
    みさき: "https://files.wanikani.com/d33mq57tldw7rn0te600nokcurms",
    みず: "https://files.wanikani.com/m7wjihzj8buuv95aj9dguv73wdp0",
    みつ: "https://files.wanikani.com/6vlrkto5xcpapmo6tedrkwf8d4t0",
    みどり: "https://files.wanikani.com/nvu86u4odfybznkl19shdk909h6c",
    みみ: "https://files.wanikani.com/d61gzqvnv0vgr89rqipz8siu4jsz",
    みや: "https://files.wanikani.com/fgortsx485vf8g1hvinicfcqnhg7",
    みょう: "https://files.wanikani.com/90l1h0dlqh0rgjogle5rqbopmfdd",
    むかし: "https://files.wanikani.com/if1s3gsbz3yvuru2q4pkxp8mgh7d",
    むぎ: "https://files.wanikani.com/juios4zsfaurqgj3fr65uzkva1gb",
    むこ: "https://files.wanikani.com/ml5x05mpawl7ejts5b3s2s3d30lb",
    むし: "https://files.wanikani.com/ta0cq6zspzm15woslcrhvfr3ffu3",
    むすめ: "https://files.wanikani.com/bg400d5vkyzpbs1kv7ps5c7oh5mu",
    むね: "https://files.wanikani.com/tdg21ibe1fgcx037chrufry08hnv",
    むら: "https://files.wanikani.com/apsc8imoxffbym822ic8877gcw8l",
    め: "https://files.wanikani.com/rtg96whf8yrveit8x59d4bge12zo",
    めす: "https://files.wanikani.com/hi6myjfetamppcjgjw4jc6dobf2a",
    めん: "https://files.wanikani.com/6pzli3qvxmsy1ltkanaq7ohn1bn7",
    も: "https://files.wanikani.com/iqkwp6077ondzhd1eil1xwb71iuw",
    もう: "https://files.wanikani.com/cstsu03ys7g8fbvgppve8siq30j6",
    もち: "https://files.wanikani.com/ae1zoxhdomk4xf1291t0g91kjefr",
    もも: "https://files.wanikani.com/0zkkx00wvdtasi4y15z2r1187mrq",
    もり: "https://files.wanikani.com/jdp3e2m0xyxahaw985djl27apqy1",
    もん: "https://files.wanikani.com/hsdh4pa5dlp3kts6vc9z6sc910zp",
    や: "https://files.wanikani.com/nbpb9524q784d0az87l5vp2mwkf0",
    やく: "https://files.wanikani.com/msmu844pdai7i4nht34wz3m28d3n",
    やみ: "https://files.wanikani.com/yvuu5eemr7mn30r65bi5f0p98kta",
    ゆ: "https://files.wanikani.com/qnu5pp0ckqw6ol4pf0i3f0n933r2",
    ゆき: "https://files.wanikani.com/hjowpjsdqxv3j0o9kcqte5zy3be6",
    ゆる: "https://files.wanikani.com/p80fgstl3xroqewraudtrlynrw6i",
    よ: "https://files.wanikani.com/5ovx36hwsl48vfkdfem94kdnrw1b",
    よう: "https://files.wanikani.com/nt0v69f7sg389pttw6zkbwfts09g",
    よこ: "https://files.wanikani.com/ia8etr47q6yqpjlfgcfip55b9bls",
    よめ: "https://files.wanikani.com/orzxc8frkddn70zgr9hk5p0d04kk",
    らく: "https://files.wanikani.com/osgwdeorb7rq29ldydggml3skx8s",
    らん: "https://files.wanikani.com/a5m9ddpvokgxnrbph24mxi4sk7u8",
    りゅう: "https://files.wanikani.com/49env5o2i1haismcrmkmw86wp58i",
    りょう: "https://files.wanikani.com/qsz7y0uqbhdan7s7xig9qdqvdxrd",
    るい: "https://files.wanikani.com/vv2p2t3pub1hggbq9ehgp5dygrvq",
    れい: "https://files.wanikani.com/v1l22g0lupikunvvkea6m97trxrm",
    れつ: "https://files.wanikani.com/4p64q1lh4ppiuiwyfccg6hrnainx",
    ろく: "https://files.wanikani.com/v86giptj4jyqxapl867xhd75u3c1",
    わ: "https://files.wanikani.com/sgf5ft58uxll9x5yqfxlzjd0ii3y",
    わが: "https://files.wanikani.com/o2wczcdxis7cut7ayig1d0vofmug",
    わき: "https://files.wanikani.com/ve3na805p7bysy379gme2un9pkul",
    わく: "https://files.wanikani.com/ttffqca6h7y2z0ljmbj7xqgvpirb",
    わた: "https://files.wanikani.com/c8y57du1dt2wbw8g55pvh8l2znwl",
    わに: "https://files.wanikani.com/k2swt1jwrp0epfpcxp9qhlmmlwgx",
    わん: "https://files.wanikani.com/9m42e0sck7i9eyvlj1uctfyipds6",
    ページ: "https://files.wanikani.com/gd5mizdawzenrtkso07vih0c2d5m",
  };

  // Initialize an empty array to store the words and their information
  var wordList = [];
  var hasPlayedAlready = false;
  var queueElement =
    document.body.querySelector(`[id="quiz-queue"]`).firstElementChild;

  // Listen for the Turbo event "didAnswerQuestion"
  function handleDidAnswerQuestion() {
    // Get the word from the div with class "character-header__characters"
    let word = document.querySelector(
      ".character-header__characters"
    ).textContent;
    // Get the question type from the span with class "quiz-input__question-type"
    let questionType = document.querySelector(
      ".quiz-input__question-type"
    ).textContent;
    // Get item type
    let itemType = document.querySelector(
      ".quiz-input__question-category"
    ).textContent;

    // Check if the word is already in the list
    let index = wordList.findIndex(function (item) {
      return item.word === word;
    });

    // If the word is not in the list
    if (index === -1 && itemType == "Kanji") {
      const quiz_input = get_controller("quiz-input");
      const pronunciation =
        quiz_input.currentSubject[
          quiz_input.currentSubject.primary_reading_type
        ][0];
      const audioLink = AudioKanjiData[pronunciation];

      // Create a new object with the word, audio link and isReadingComplete properties
      let newItem = {
        word: word,
        audioLink: audioLink ? audioLink : null,
        isReadingComplete: false,
      };

      // Add the new item to the list
      wordList.push(newItem);
    }

    // get hte index again since we need it
    index = wordList.findIndex(function (item) {
      return item.word === word;
    });
    // If the word is already in the list
    //else if (index !== -1) {
    if (hasPlayedAlready) return;
    // Get the existing item from the list
    let existingItem = wordList[index];

    console.log("tocar audio questionType", questionType);
    // If isReadingComplete is true
    if (existingItem.isReadingComplete || questionType === "reading") {
      console.log("should play audio");
      // Play the audio link
      if (existingItem.audioLink == null) return;
      let audio = new Audio(existingItem.audioLink);
      if (audio == null) console.log("Invalid Audio");
      else {
        audio.play();
        hasPlayedAlready = true;
        let audioButton = document.querySelector(
          '[data-action="quiz-audio#play"]'
        );
        let audioIcon = audioButton.querySelector("i");
        audioButton.onclick = function () {
          if (audio.paused) {
            audio.play();
            audioIcon.classList.remove("fa-volume-off");
            audioIcon.classList.add("fa-volume-high");
            audioButton.classList.remove("additional-content__item--disabled");
          }
        };
        audio.onended = function () {
          audioIcon.classList.remove("fa-volume-high");
          audioIcon.classList.add("fa-volume-off");
        };
        setTimeout(function () {
          audioButton.classList.remove("additional-content__item--disabled");
        }, 100);
      }
    }
    // }
  }

  // Listen for the Turbo event "didCompleteSubject"
  function handleDidCompleteSubject() {
    // Get the word from the div with class "character-header__characters"
    let word = document.querySelector(
      ".character-header__characters"
    ).textContent;

    // Check if the word is in the list
    let index = wordList.findIndex(function (item) {
      return item.word === word;
    });

    // If the word is in the list
    if (index !== -1) {
      // Remove it from the list
      wordList.splice(index, 1);
    }
  }

  function get_controller(name) {
    return Stimulus.getControllerForElementAndIdentifier(
      document.querySelector(`[data-controller~="${name}"]`),
      name
    );
  }

  function handleWillShowNextQuestion() {
    hasPlayedAlready = false;
    // Get the question type from the span with class "quiz-input__question-type"
    let questionType = document.querySelector(
      ".quiz-input__question-type"
    ).textContent;
    // Get item type
    let itemType = document.querySelector(
      ".quiz-input__question-category"
    ).textContent;
    // Check if previous item was correct
    let wasPrevCorrect = document.querySelector(
      ".quiz-input__input-container[correct='true']"
    );

    let audioButton = document.querySelector('[data-action="quiz-audio#play"]');
    if (audioButton.onclick != null) audioButton.onclick = null;

    if (itemType.includes("Kanji") && wasPrevCorrect != undefined) {
      // Get the word from the div with class "character-header__characters"
      let word = document.querySelector(
        ".character-header__characters"
      ).textContent;
      // Check if the word is already in the list
      let listItem =
        wordList[
          wordList.findIndex(function (item) {
            return item.word === word;
          })
        ];

      // If listItem is null, break
      if (listItem == null) return;

      const quiz_input = get_controller("quiz-input");
      const pronunciation =
        quiz_input.currentSubject[
          quiz_input.currentSubject.primary_reading_type
        ][0];
      const audioLink = AudioKanjiData[pronunciation];
      console.log("is there audoi for", pronunciation, "?", audioLink);
      if (audioLink) {
        listItem.audioLink = audioLink;
      }

      // Get the audio link from the queue
      //      let audioObj = JSON.parse(queueElement.textContent).find((obj) => {
      //        return obj.type == "Vocabulary" && obj.characters == word;
      //      });
      //      // Set the audio link and isReadingComplete to true
      //      listItem.audioLink =
      //        audioLink.readings[0].pronunciations[0].sources[0].url;
      listItem.isReadingComplete = true;
    }
  }

  // Add event listeners for both events using addEventListener
  window.addEventListener("didAnswerQuestion", handleDidAnswerQuestion);
  window.addEventListener("didCompleteSubject", handleDidCompleteSubject);
  window.addEventListener("willShowNextQuestion", handleWillShowNextQuestion);
})();
