'use strict';

const UPLOAD_PREFIX = '/uploads/images/';

const assets = {
  brand: `${UPLOAD_PREFIX}云舍村-品牌标识.webp`,
  courtyard: `${UPLOAD_PREFIX}云舍村-苔藓院落.webp`,
  boat: `${UPLOAD_PREFIX}云舍村-泛舟夜景.webp`,
  scenery2: `${UPLOAD_PREFIX}云舍村-村落风景-02.webp`,
  scenery3: `${UPLOAD_PREFIX}云舍村-村落风景-03.webp`,
  scenery4: `${UPLOAD_PREFIX}云舍村-村落风景-04.webp`,
  scenery5: `${UPLOAD_PREFIX}云舍村-村落风景-05.webp`,
  scenery6: `${UPLOAD_PREFIX}云舍村-村落风景-06.webp`,
  scenery7: `${UPLOAD_PREFIX}云舍村-村落风景-07.webp`,
  chineseBrand: `${UPLOAD_PREFIX}云舍村-中文品牌标识.png`,
  reserveBadge: `${UPLOAD_PREFIX}云舍村-预约标识.png`,
  reserveButton: `${UPLOAD_PREFIX}云舍村-预约按钮底图.png`,
  duckField: `${UPLOAD_PREFIX}云舍村-稻田鸭群.png`,
  childRateTable: `${UPLOAD_PREFIX}云舍村-儿童住宿费用表.png`,
  policyBackground: `${UPLOAD_PREFIX}云舍村-预约条款背景.png`,
  reservationNav: `${UPLOAD_PREFIX}云舍村-预约页导航背景.png`,
  aerial: `${UPLOAD_PREFIX}云舍村-航拍全景.jpg`,
  farming: `${UPLOAD_PREFIX}云舍村-稻田耕牛.jpg`,
  stonePath: `${UPLOAD_PREFIX}云舍村-青石板古道.jpg`,
  reception: `${UPLOAD_PREFIX}云舍村-木构接待厅.jpg`,
  study: `${UPLOAD_PREFIX}云舍村-竹榻书屋.jpg`,
  waterside: `${UPLOAD_PREFIX}云舍村-水岸泛舟.jpg`,
  theatre: `${UPLOAD_PREFIX}云舍村-古戏楼.jpg`,
  salon: `${UPLOAD_PREFIX}云舍村-雅室陈设.jpg`,
  bamboo: `${UPLOAD_PREFIX}云舍村-竹林小径.jpg`,
  brandBanner: `${UPLOAD_PREFIX}云舍村-品牌横幅.jpg`,
};

const json = (value) => JSON.stringify(value);

const demoMedia = [
  { name: '云舍村-航拍全景.jpg', originalName: '村落航拍', type: 'image', mimeType: 'image/jpeg', category: 'scenery', url: `${UPLOAD_PREFIX}云舍村-航拍全景.jpg` },
  { name: '云舍村-稻田耕牛.jpg', originalName: '稻田耕牛', type: 'image', mimeType: 'image/jpeg', category: 'farming', url: `${UPLOAD_PREFIX}云舍村-稻田耕牛.jpg` },
  { name: '云舍村-青石板古道.jpg', originalName: '青石板古道', type: 'image', mimeType: 'image/jpeg', category: 'scenery', url: `${UPLOAD_PREFIX}云舍村-青石板古道.jpg` },
  { name: '云舍村-木构接待厅.jpg', originalName: '木构接待厅', type: 'image', mimeType: 'image/jpeg', category: 'hotel', url: `${UPLOAD_PREFIX}云舍村-木构接待厅.jpg` },
  { name: '云舍村-竹榻书屋.jpg', originalName: '竹榻书屋', type: 'image', mimeType: 'image/jpeg', category: 'hotel', url: `${UPLOAD_PREFIX}云舍村-竹榻书屋.jpg` },
  { name: '云舍村-水岸泛舟.jpg', originalName: '水岸泛舟', type: 'image', mimeType: 'image/jpeg', category: 'activity', url: `${UPLOAD_PREFIX}云舍村-水岸泛舟.jpg` },
  { name: '云舍村-古戏楼.jpg', originalName: '古戏楼', type: 'image', mimeType: 'image/jpeg', category: 'culture', url: `${UPLOAD_PREFIX}云舍村-古戏楼.jpg` },
  { name: '云舍村-雅室陈设.jpg', originalName: '雅室（会议室）.jpg', type: 'image', mimeType: 'image/jpeg', category: 'hotel', url: `${UPLOAD_PREFIX}云舍村-雅室陈设.jpg` },
  { name: '云舍村-竹林小径.jpg', originalName: '竹林小径', type: 'image', mimeType: 'image/jpeg', category: 'scenery', url: `${UPLOAD_PREFIX}云舍村-竹林小径.jpg` },
  { name: '云舍村-品牌横幅.jpg', originalName: '云舍村品牌横幅', type: 'image', mimeType: 'image/jpeg', category: 'banner', url: `${UPLOAD_PREFIX}云舍村-品牌横幅.jpg` },
];

const demoTravelProducts = [
  {
    productCode: 'DEMO-TRAVEL-ROOTS-01', title: '演示·村落归居两日体验', subtitle: '湖湘民居、茶事与田园日常',
    description: '以传统村落为起点，住进木构院落，沿青石板路漫游，体验擂茶、农事与夜间水岸风景。本产品价格仅用于小程序联调展示。',
    price: 1280, originalPrice: 1480, coverImage: assets.aerial,
    images: json([assets.aerial, assets.courtyard, assets.stonePath, assets.waterside]), category: 'DestPackage', destination: 'taoyuan', duration: 2, minPersons: 1, maxPersons: 4,
    tags: json(['演示数据', '归居体验', '湖湘民居']),
    itinerary: json([{ day: 1, title: '抵达与村落漫游', items: ['木构接待厅办理入住', '青石板古道与院落漫游', '晚间水岸泛舟'] }, { day: 2, title: '田园与手艺', items: ['晨间茶事', '菜园农事体验', '桃源绣手作体验'] }]),
    includes: json(['演示住宿 1 晚', '村内体验项目组合', '基础早餐']), excludes: json(['往返交通', '个人消费']), notes: '演示套餐，实际可售内容与价格以运营配置为准。', sortOrder: 10, status: 1,
  },
  {
    productCode: 'DEMO-TRAVEL-CRAFT-02', title: '演示·桃源工艺寻访一日', subtitle: '从古建材料到桃源绣',
    description: '走访村内博物苑、作坊与戏楼，了解古建材料、木作陈设和桃源绣的日常传承，适合亲子与文化漫游。',
    price: 680, originalPrice: 780, coverImage: assets.theatre,
    images: json([assets.theatre, assets.reception, assets.salon, `${UPLOAD_PREFIX}89901092-0f7a-4ce9-a0f0-6175ff8923da.jpg`]), category: 'DayActivity', destination: 'taoyuan', duration: 1, minPersons: 1, maxPersons: 6,
    tags: json(['演示数据', '传统手艺', '亲子友好']),
    itinerary: json([{ day: 1, title: '工艺与村落', items: ['博物苑导览', '木构建筑细节观察', '桃源绣手作体验', '古戏楼茶歇'] }]),
    includes: json(['演示导览服务', '手作材料包', '茶歇']), excludes: json(['住宿', '午餐']), notes: '演示产品，体验时段需提前预约。', sortOrder: 11, status: 1,
  },
  {
    productCode: 'DEMO-TRAVEL-SEASONS-03', title: '演示·四时田园慢游三日', subtitle: '茶山、菜园与青石板路',
    description: '用三天时间感受村落四季：茶山晨雾、菜园劳作、竹林散步与溪畔泛舟，留出充分的自由时间回到村民般的日常。',
    price: 1680, originalPrice: 1980, coverImage: assets.farming,
    images: json([assets.farming, assets.bamboo, assets.stonePath, assets.waterside, assets.courtyard]), category: 'Travel', destination: 'taoyuan', duration: 3, minPersons: 1, maxPersons: 4,
    tags: json(['演示数据', '田园慢游', '三日两晚']),
    itinerary: json([{ day: 1, title: '茶山入村', items: ['茶山漫步', '入住归居院落', '溪畔晚餐'] }, { day: 2, title: '村民日常', items: ['菜园农事', '书屋阅读', '擂茶体验'] }, { day: 3, title: '竹林与水岸', items: ['竹林小径散步', '水岸泛舟', '自由返程'] }]),
    includes: json(['演示住宿 2 晚', '早餐与茶事体验', '农事与泛舟体验']), excludes: json(['往返交通', '酒水及个人消费']), notes: '演示套餐，季节性内容需以当日开放项目为准。', sortOrder: 12, status: 1,
  },
];

const demoHotel = {
  hotelCode: 'DEMO-HOTEL-YUNSHE', hotelGroupCode: 'YUNSHECUN', name: '演示·云舍归居客栈',
  address: '湖南省常德市桃花源风景区云舍村内', city: '常德', province: '湖南', phone: '0736-7070666',
  description: '演示住宿目录，采用湖湘传统民居的木构空间与院落尺度，适合验证酒店列表、房型详情与预订流程。',
  coverImage: assets.reception, images: json([assets.reception, assets.courtyard, assets.salon, assets.study]),
  starLevel: 5, facilities: json(['院落庭院', '茶室', '书屋', '村内接驳', '行李寄存']), checkInTime: '09:00', checkOutTime: '15:00', status: 1, sortOrder: 10,
};

const demoRooms = [
  { roomCode: 'DEMO-COURTYARD-A', name: '演示·苔藓院落大床房', description: '木构院落中的安静大床房，推窗可见苔痕、树影与青石小径。', price: 980, originalPrice: 1180, area: 42, bedType: '2米大床', capacity: 2, images: json([assets.courtyard, assets.reception]), amenities: json(['独立卫浴', '茶席', '院景']), stock: 8, status: 1, sortOrder: 10 },
  { roomCode: 'DEMO-WATERSIDE-B', name: '演示·水岸雅舍双床房', description: '临近水岸的双床房，适合朋友同行或亲子入住。', price: 1180, originalPrice: 1380, area: 48, bedType: '1.35米双床', capacity: 3, images: json([assets.waterside, assets.salon]), amenities: json(['独立卫浴', '水岸景观', '茶席']), stock: 6, status: 1, sortOrder: 11 },
  { roomCode: 'DEMO-BAMBOO-C', name: '演示·竹林书屋套房', description: '坐落于竹林边的套房，配有阅读空间与临水休憩区。', price: 1380, originalPrice: 1680, area: 65, bedType: '2米大床', capacity: 3, images: json([assets.study, assets.bamboo, assets.stonePath]), amenities: json(['独立卫浴', '书桌', '竹林景观', '茶具']), stock: 4, status: 1, sortOrder: 12 },
];

const demoActivities = [
  { activityCode: 'DEMO-ACTIVITY-TEA', title: '演示·桃源擂茶入门', description: '从炒米、磨茶到冲泡，了解擂茶在当地日常饮食中的位置，完成一碗自己的擂茶。', price: 168, originalPrice: 198, coverImage: assets.scenery2, images: json([assets.scenery2, assets.study]), location: '云舍村茶坊', startDate: '2026-01-01', endDate: '2026-12-31', status: 1, maxPersons: 12, category: '茶事体验', sortOrder: 10 },
  { activityCode: 'DEMO-ACTIVITY-EMBROIDERY', title: '演示·桃源绣手作体验', description: '在绣娘指导下完成一枚简洁纹样，认识“有图必有意，有意必吉祥”的民间审美。', price: 198, originalPrice: 238, coverImage: `${UPLOAD_PREFIX}89901092-0f7a-4ce9-a0f0-6175ff8923da.jpg`, images: json([`${UPLOAD_PREFIX}89901092-0f7a-4ce9-a0f0-6175ff8923da.jpg`, assets.salon]), location: '云舍村作坊', startDate: '2026-01-01', endDate: '2026-12-31', status: 1, maxPersons: 8, category: '传统手艺', sortOrder: 11 },
  { activityCode: 'DEMO-ACTIVITY-FARM', title: '演示·菜园农事半日', description: '跟随村民认识时令蔬菜，完成松土、采摘或浇灌，感受“晨兴理荒秽”的田园日常。', price: 128, originalPrice: 158, coverImage: assets.farming, images: json([assets.farming, assets.duckField]), location: '云舍村菜园', startDate: '2026-01-01', endDate: '2026-12-31', status: 1, maxPersons: 10, category: '田园农事', sortOrder: 12 },
  { activityCode: 'DEMO-ACTIVITY-BOAT', title: '演示·水岸泛舟夜游', description: '在灯影与树影之间缓慢行舟，观察村落水岸与夜色变化，雨天或水位不适时暂停。', price: 238, originalPrice: 268, coverImage: assets.waterside, images: json([assets.waterside, assets.boat]), location: '云舍村水岸', startDate: '2026-01-01', endDate: '2026-12-31', status: 1, maxPersons: 6, category: '水岸游历', sortOrder: 13 },
];

const demoShopProducts = [
  { productCode: 'DEMO-SHOP-TEA', name: '演示·云舍高山茶礼盒', description: '以茶山风物为灵感的演示茶礼，适合验证商品详情、SKU 与购物车流程。', price: 198, originalPrice: 238, stock: 80, coverImage: assets.scenery2, images: json([assets.scenery2, assets.study]), category: '茶礼', status: 1, sortOrder: 10, skuInfo: json([{ name: '规格', values: ['演示装 100g', '演示装 200g'] }]) },
  { productCode: 'DEMO-SHOP-EMBROIDERY', name: '演示·桃源绣手绣方巾', description: '以桃源绣纹样为主题的演示文创小物，图案与寓意来自村落手艺介绍。', price: 128, originalPrice: 158, stock: 120, coverImage: `${UPLOAD_PREFIX}89901092-0f7a-4ce9-a0f0-6175ff8923da.jpg`, images: json([`${UPLOAD_PREFIX}89901092-0f7a-4ce9-a0f0-6175ff8923da.jpg`, assets.salon]), category: '桃源绣', status: 1, sortOrder: 11, skuInfo: json([{ name: '颜色', values: ['绛红演示款', '靛青演示款'] }]) },
  { productCode: 'DEMO-SHOP-RICE', name: '演示·云舍五合土米礼', description: '以村内晒谷坪“五合土”工艺为灵感的演示米礼，内容用于展示商品与订单链路。', price: 88, originalPrice: 108, stock: 100, coverImage: assets.farming, images: json([assets.farming, assets.duckField]), category: '田园食集', status: 1, sortOrder: 12, skuInfo: json([{ name: '规格', values: ['演示 1kg'] }]) },
  { productCode: 'DEMO-SHOP-BAMBOO', name: '演示·竹编茶席', description: '竹林与茶事场景中的轻巧茶席，适合搭配茶具使用。', price: 158, originalPrice: 188, stock: 60, coverImage: assets.bamboo, images: json([assets.bamboo, assets.study]), category: '茶器', status: 1, sortOrder: 13, skuInfo: json([{ name: '尺寸', values: ['演示标准款'] }]) },
];

const pdfParagraphs = [
  '村落是我们最早的家园，是扎在大地上最深的根。',
  '作为东方村落文明的一种诠释，云舍村秉承着对中华传统文化的尊崇和极具匠心的追寻，致力于保护和传承东方的村落文明。以陶渊明笔下的《桃花源记》与刘禹锡的《陋室铭》为意境，呈现出千百年来历久而弥新的民间工艺与智慧，赋予无尽薪火相传的民间文化遗产以时代价值，使之焕发新生，为当代和未来的造访者再现梦中的世外桃源……',
  '保护与传承东方村落文明是云舍村的出发点和落脚点，也贯穿了村落营造的全过程。',
  '项目伊始，云舍人花了两年多的时间，寻艺四方，问俗南北，走访调研了上百个古村落和古民居群，探寻传统村落建筑和园林的历史痕迹，并搜集了大量的古建筑材料。当在报纸上看到因修建水电站，千年托口古镇即将移民搬迁、沉入江底的消息，项目团队随即赶赴古镇，将一万多平米的古青石板、条石、门窗等古建材料花费巨资收集、吊装，从三百多公里外的大山深处运输回村。逢山开路、遇水架桥。云舍人行遍湖南、湖北、江西、四川、贵州等地，搜集、抢救了数以万计的古物件。',
  '随后聘请数百位全国各地的老匠人，用最精湛的传统技艺纯手工打造村落的每一栋建筑。建造过程中所使用的，百分之九十五以上都是有上百年，甚至数百年历史印记的古建材料，其中包括数万平米的老青石板，数千吨的老条石，以及大批量的古旧门窗、石墩、石柱、石砖等。村内的家具陈设，则由明式家具传承人带队，历时八年，用金丝楠木拆房老料，按一比一的比例纯手工逐件打造而成。',
  '十五年，五千多个日夜，一个似乎被遗忘了千百年的古村落，如雨后的蘑菇般冒了出来。',
  '村内六十余栋具有典型湖湘民居特色的院落，掩映于茂林修竹之间。一条长约三公里的青石板路嫁接起整个村子的动脉，构成由北向为主，向东西延伸的村落系统。俯瞰村子全貌，宛如一条泰然自若的蛟龙，静静守望着这片遗落风尘的净土。目前，村落的生活区包括草庐、书屋、射圃、茶坊、戏楼、饭庄、博物苑、作坊、酒肆、菜园、果园等场景。远观，村内的每一栋建筑都与湖湘传统民居一脉相承，如出一辙；近赏，每一个院落又是一步一景，耐人寻味。',
  '湖湘民居是融入大自然之中的民居形式，是一种人工建筑环境与大自然的完美融合。“虽由人作，宛自天开”。云舍村的一座座院落或隐于青山古树之间，或枕山傍水，或夹溪而筑，有些还有人工开凿的水渠穿村而过，在各家各户门前流过。充满浪漫色彩的同时，又展现出人类对大自然的依恋与敬畏。云舍村巧夺天工的景观排布背后，隐藏着博大精深的风水文化和天人合一的民间智慧。',
  '村内的每一个细节，看似朴实无华，却常常蕴藏着博大精深的民间智慧。比如说院内的晒谷坪，俗称五合土。制造工艺是先把桐油、石灰、黄土、河砂搅拌均匀，发酵数日之后，再与煮成粥状的糯米混合搅拌均匀，铺平后用石夯夯实，再反复用木缒手工敲打月余后完工。这种传统民间工艺锤炼出来的作品，与现代化的钢筋混凝土截然不同，它们被赋有了独特的生命力，仿佛与周围的人和环境在一起呼吸、生长。',
  '村内移植进来了大大小小，共一万七千余棵本地树种，在四季风景的交替下如诗如画。菜园子里自种的百余种四季蔬菜和时令瓜果，配上热气腾腾的钵子菜、琳琅满目的擂茶、米粉等特色佳肴，令人流连忘返。',
  '十三年磨一剑。直到今天，这个“久藏深闺”、集东方村落万般风情于一身的世外桃源才揭开她神秘的面纱，开始迎接一个个“刘子骥”前来探寻。',
  '这里是华夏先民世代营造的田园梦，这里是文人墨客心驰神往的乌托邦，这里是东方村落文明的缩影……',
  '云舍村位于湖南省桃源县西南 15 公里的水溪附近，地处古武陵县境内，是陶渊明笔下《桃花源记》所描述的“世外桃源”真迹地。',
  '踏入村口，交错纵横的青石板道经历千百年风雨沧桑，在雨后熠熠闪光。村内的房屋为全木质穿斗式结构，屋顶呈现出特殊的坡度和形状。作为传统乡村聚落和居住空间的历史遗存，湖湘民居将其时代特征、建筑技艺和民族习俗展现得淋漓尽致。',
  '走在云舍村，处处是画，步步皆景。苔痕上阶绿，草色入帘青。春生夏长，秋收冬藏，四季流转，景色各异。时间仿佛在这里定格，过往全都尘封一隅，只剩下祥和与宁静。',
  '一砖一瓦，一木一石，都有根有脉，有因有果。暧暧远人村，依依墟里烟；晨兴理荒秽，带月荷锄归；欢然酌春酒，摘我园中蔬。重温古人隐藏于村落中的诗意与智慧：户庭无尘杂，虚室有余闲，可以调素琴，阅金经。',
  '世居这里的人们，不断通过艺术升华平凡生活，载之以日常用器，传情以物。桃源工的木雕，有着浓厚的生活印记，折射出民间艺人的娴熟技巧和超凡智慧。“有图必有意，有意必吉祥”。桃源工·青花绣。在云舍村，顿顿都少不了沸腾的钵子菜；擂茶是村民的最爱，也是当地最有名的小吃。',
];

const officialHomeParagraphs = [
  '自打国人心中最柔软和诗意的地方，被陶渊明称作桃花源；一代一代的我们，便有了一份执着的向往和寻找……',
  '或许，你还没有听说或找到云舍村。这里不是一家奢华的度假酒店，而是一个归居式的传统村落，一个东方村落的共享空间。',
  '这里没有经理和客人，只有长住与归居的村民。这里没有老板、经理人、服务员，只有村长和常居村民；这里没有度假客人，只有归居村民。',
  '请别以安缦作比，这里追求的不是奢华，而是让奢华归真返朴；请别以裸心堡作比，这里讲述的不是已经发生的历史，而是那些即将发生的故事。',
  '请别以你到过的任何酒店作比。云舍村希望让你发现的，不是这里既有的美和好，而是你内心潜在的美和好。',
];

const aboutContent = `<section><h2>云舍村简介</h2>${pdfParagraphs.map((paragraph) => `<p>${paragraph}</p>`).join('')}</section><section><h3>归居之约</h3>${officialHomeParagraphs.map((paragraph) => `<p>${paragraph}</p>`).join('')}</section>`;

const policyContent = `
  <section><h2>云舍村入住条款及细则</h2><p>云舍村没有消费，只有按时间和空间缴纳的村落维护费。村落维护费包括村内提供的住宿、餐食、茶饮、体验式农耕、传统手工、文艺欣赏、艺术品鉴等诸多项目。</p><h3>预订</h3><ol><li>仅提供入住天数少于 31 天的客房预订。同一入住时间段，每位宾客最多可预订 3 间客房。对于桃花源·云舍村推出的套餐或客房优惠，桃花源·云舍村有权根据相关法律拒绝或接受任何预订或任何参与套餐或优惠的宾客。</li><li>预订时需全额支付相应的村落维护费用。村落维护费不包括超出套餐额度的餐饮费、服务费和其他花费。</li><li>所有价格均以人民币计算。</li><li>桃花源·云舍村保留权利根据市场情况不定时调整客房价格（但不影响已确认的预订下已支付的价格）和/或根据适用税率或其他政府收费的变更而收取额外费用。</li><li>收到订单确认号即代表预订已确认。</li><li>预订的客房和套餐产品内容仅限宾客个人使用，不得转让、转售或用于旅行团、企业活动、营销、推广或其他商业目的。</li><li>若桃花源·云舍村出现失误（包括但不限于房价错误或客房类型错误，若预订已被确认则会与宾客友好协商），或宾客在预订客房时涉及欺诈或欺骗行为（无论预订确认与否），桃花源·云舍村保留取消或修改客房预订的权利。</li></ol></section>
  <section><h3>取消与变更</h3><ol><li>如需取消预订，须至少于入住日期 00:00 的 48 小时前提交申请，方能获全额退款。如于入住日期 00:00 前的 48 小时内取消预订，则将收取宾客预订时支付的首晚房费（包含服务费和税费）。</li><li>入住日期 00:00 起不得申请取消预订，但若入住当日宾客未办理入住（即未按照预订日期入住酒店），则宾客的预订自动取消，且将收取宾客预订时支付的首晚房费（包含服务费和税费）。一旦办理入住，则预订无法再取消。</li><li>预订变更，包括但不限于入住时长或客房类型变更，视变更时的供应情况而定，且宾客应支付因变更而产生的差价。</li><li>入住和/或退房日期的变更需至少于入住日期 00:00 的 48 小时前进行，且视供应情况、预订优惠条款和市场价格而定。晚于上述时间则不得进行变更。</li><li>酒店前台入住手续需由预订姓名的本人到场办理。已确认的预订不允许更改姓名。</li></ol></section>
  <section><h3>入住与退房</h3><ol><li>所有入住酒店的宾客（包括儿童）以及入住期间的访客均须持有有效个人身份证明原件（中国内地游客，须携带《中华人民共和国居民身份证》；中国香港、中国澳门地区游客，须携带《港澳居民来往内地通行证》、《中华人民共和国旅行证》或《中华人民共和国港澳居民居住证》；中国台湾地区游客，须携带《台湾居民来往大陆通行证》、《中华人民共和国旅行证》或《中华人民共和国台湾居民居住证》；其他国家及地区游客，须携带有效护照或《中华人民共和国外国人永久居留身份证》）进行登记。每个房间需至少有一位成人宾客入住。</li><li>入住时间最早为当日 09:00，退房时间最晚为当日 15:00。申请推迟退房时间可能需要支付额外费用。入住高峰时段，入住可能会有所延迟。入住高峰期间，请尽早到村并办理入住手续。</li><li>入住后提早退房将不会退还宾客任何费用，除非由桃花源·云舍村认定为特殊情况，可退还部分费用。</li></ol></section>
  <section><h3>住宿</h3><ol><li>住宿人数不得超过客房最大可入住人数。如仍有空房，可为额外宾客加订房间。</li><li>相邻客房、相连客房或客房位置需要申请，且视入住时的供应情况而定。</li><li>每间客房最多容纳 1 名 17 岁及以下儿童，和成人共用现有床铺。</li><li>客房不提供加床服务，如果入住人数超过客房的可入住人数，则必须增订客房。</li><li>不得携带宠物入住。</li></ol><h3>儿童住宿费用</h3><ul><li>5 岁及以下：使用现有床铺免费；早餐免费。</li><li>6 至 11 岁：使用现有床铺加收人民币 150 元/人/晚；早餐免费。</li><li>12 至 17 岁：使用现有床铺加收人民币 805 元/人/晚；早餐免费。</li></ul></section>
  <section><h3>其他</h3><ol><li>村内的演出和其他游历项目、服务或事项可能随时变更，且可能随时因重建、翻修、客容量限制、季节变化、恶劣天气、特别活动或其他原因而暂时关闭、更改或中断。</li><li>未使用的游历票或其他套餐内容或特色服务，包括餐食都不予退款。未使用的套餐内容也不能折现。</li><li>其他条款与细则可能适用于特殊或打折优惠或预订。</li><li>宾客应随时看管好其私人财物，并自行为其安全负责。</li><li>此条款和细则可能变更。如法律另有强制性规定，则应以相应法律规定为准。</li></ol><h3>联系我们</h3><p>如需获取预订信息、取消或修改预订，请致电 +86 0736-7070666。</p></section>`;

const privacyContent = `
  <section><h2>隐私政策</h2><p>感谢您选择云舍村为您的度假目的地。我们诚挚地致力于为您提供卓越的度假体验。为了确保您的隐私得到最大程度的保护，我们编制了详尽的隐私政策，以便您全面了解我们如何收集、使用、共享和保护您的个人信息。</p></section>
  <section><h3>信息收集与使用</h3><p>在使用云舍村服务时，我们可能会收集多样化的个人信息，包括但不限于姓名、联系方式、信用卡信息、偏好设置、身份证明文件等。这些信息将用于订单处理、住宿安排、特色活动提供等服务；我们也可能用于市场研究、用户行为分析，以优化服务和满足用户需求。</p><p>为确保服务符合您的期望，我们可能收集房间喜好、餐饮口味等偏好信息，以提供更符合您期望的个性化度假体验。</p></section>
  <section><h3>信息保护</h3><p>我们采用数据加密、访问控制、网络安全监控等安全措施，保护您的个人信息免受未经授权的访问、使用、披露或破坏。我们定期进行风险评估和安全审查，并开展员工信息安全意识培训。只有在必要业务运作中、经合法授权的工作人员才能访问您的个人信息。</p></section>
  <section><h3>信息共享与披露</h3><p>我们将您的个人信息视为高度机密。除非经您明确同意或法律法规明文规定，我们不会将个人信息分享给第三方。与合作伙伴的信息共享遵循法律法规，并在明确目的下保障同等水平的信息保护。为提供支付处理、客户支持、市场营销等服务，可能与第三方服务提供商共享必要信息；我们将确保这些服务提供商同样遵循高标准信息保护措施。</p></section>
  <section><h3>未成年人隐私保护</h3><p>我们的服务主要面向成年人。对于未满 18 岁的未成年人，建议在监护人陪同和同意下使用服务。我们不会故意收集未成年人个人信息；如发现错误收集，将立即删除。</p></section>
  <section><h3>隐私政策的修改</h3><p>我们可能根据业务发展、技术更新或法规要求修改本政策。发生重大变更时，将通过适当方式通知您，并提供更新后政策链接。</p></section>
  <section><h3>联系我们</h3><p>如对本政策有疑问、建议或投诉，请致电 +86 0736-7070666。我们将竭力解答，并持续改进隐私政策和数据保护措施。感谢您耐心阅读，云舍村期待与您一同共度世外桃源的美好时光。</p></section>`;

const faq = [
  { id: 'location', question: '云舍村在哪里？', answer: '云舍村位于湖南省常德市桃花源风景区，距桃源县城西南约 15 公里。' },
  { id: 'booking', question: '如何预约到访或住宿？', answer: '请在小程序选择日期、房型或体验项目提交预约；如需协助，可致电 <b>0736-7070666</b>。' },
  { id: 'experience', question: '村内有哪些体验？', answer: '村内可体验湖湘民居与园林、茶事与擂茶、桃源绣、村落漫游、泛舟及菜园农事等内容，具体安排以当日确认信息为准。' },
  { id: 'arrival', question: '到访前需要注意什么？', answer: '请按确认时间抵达，并关注天气与舒适步行装备。村内有青石板路，请注意雨天防滑并照看同行儿童。' },
  { id: 'service', question: '需要人工帮助怎么办？', answer: '可通过小程序在线客服留言，或拨打云舍村咨询电话 <b>0736-7070666</b>。' },
];

const contentPages = [
  { pageCode: 'about_us', title: '关于云舍村', content: aboutContent, type: 'cms', sortOrder: 1 },
  { pageCode: 'culture_intro', title: '什么是云舍村', content: json({
    heroImage: assets.courtyard,
    image: assets.scenery2,
    title: '这里是云舍村',
    paragraphs: [
      '云舍村位于湖南省桃源县西南水溪附近，是以湖湘传统村落为意境营造的归居式村落。',
      '村内六十余栋院落掩映于茂林修竹之间，青石板路、溪流、园林与传统民居共同构成一处可居、可游、可感知的东方村落空间。',
      '在这里，可以读书、品茶、看戏、体验农事和民间手艺，也可以在四季景色中慢下来，重温村落日常中的诗意与智慧。',
    ],
    phone: '0736-7070666',
    address: '湖南省常德市桃花源风景区',
    gallery: [assets.courtyard, assets.duckField, assets.boat, assets.scenery2, assets.scenery3, assets.scenery4, assets.scenery5, assets.scenery6, assets.scenery7],
  }), type: 'cms', sortOrder: 2 },
  { pageCode: 'faq', title: '常见问题', content: json(faq), type: 'cms', sortOrder: 3 },
  { pageCode: 'member_policy', title: '预约须知', content: policyContent, type: 'cms', sortOrder: 4 },
  { pageCode: 'privacy_policy', title: '隐私政策', content: privacyContent, type: 'cms', sortOrder: 5 },
];

const bannerDefinitions = [
  { title: '桃花源·云舍村', imageUrl: assets.courtyard, linkUrl: '/pages/scenery/culture-detail', position: '1', sortOrder: 1 },
  { title: '一座手工营造的村落', imageUrl: assets.scenery3, linkUrl: '/pages/scenery/culture-detail', position: '1', sortOrder: 2 },
  { title: '每个入世的人，都该有一个出世的地方', imageUrl: assets.scenery2, linkUrl: '/pages/scenery/culture-detail', position: '3', sortOrder: 1 },
  { title: '归居院落', imageUrl: assets.courtyard, linkUrl: '/pages/scenery/culture-detail', position: '4_ul', sortOrder: 1 },
  { title: '村落漫游', imageUrl: assets.scenery3, linkUrl: '/pages/scenery/culture-detail', position: '4_ur1', sortOrder: 2 },
  { title: '水岸泛舟', imageUrl: assets.boat, linkUrl: '/pages/scenery/culture-detail', position: '4_ur2', sortOrder: 3 },
  { title: '溪畔庭园', imageUrl: assets.scenery4, linkUrl: '/pages/scenery/culture-detail', position: '4_dl1', sortOrder: 4 },
  { title: '雨后青石板路', imageUrl: assets.scenery5, linkUrl: '/pages/scenery/culture-detail', position: '4_dl2', sortOrder: 5 },
  { title: '村居一隅', imageUrl: assets.scenery6, linkUrl: '/pages/scenery/culture-detail', position: '4_dr', sortOrder: 6 },
  { title: '庭院夜色', imageUrl: assets.scenery7, linkUrl: '/pages/scenery/culture-detail', position: '5_up', sortOrder: 1 },
  { title: '溪畔庭园', imageUrl: assets.scenery4, linkUrl: '/pages/scenery/culture-detail', position: '6_row1', sortOrder: 1 },
];

const configs = [
  { key: 'cs_phone', value: '0736-7070666', description: '云舍村咨询电话' },
  { key: 'customer_service_phone', value: '0736-7070666', description: '客服电话' },
  { key: 'hotel_group_name', value: '桃花源·云舍村', description: '村落名称' },
  { key: 'brand_logo', value: assets.brand, description: '云舍村品牌标识' },
  { key: 'site_address', value: '湖南省常德市桃花源风景区', description: '村落地址' },
  { key: 'site_beian', value: '湘ICP备2023030754号-1', description: '备案信息' },
  { key: 'search_hot_words', value: json(['云舍村', '桃花源', '湖湘民居', '青石板路', '擂茶']), description: '搜索热词' },
  { key: 'destinations_series', value: json([{ productSeriesName: '桃花源·云舍村', productSeriesCode: 'taoyuan' }]), description: '目的地系列' },
  { key: 'diy_trip_title', value: '定制云舍村到访体验', description: '定制行程标题' },
  { key: 'diy_trip_content', value: '<p>请告知到访时间、同行人数与偏好；具体安排、可选内容及费用以预约确认信息为准。</p>', description: '定制行程介绍' },
  { key: 'diy_example_plans', value: json([]), description: 'DIY 参考方案' },
];

async function seedYunsheContent(prisma) {
  for (const media of demoMedia) {
    const existing = await prisma.mediaFile.findFirst({ where: { name: media.name } });
    if (!existing) await prisma.mediaFile.create({ data: media });
  }

  for (const page of contentPages) {
    await prisma.contentPage.upsert({
      where: { pageCode: page.pageCode },
      update: {},
      create: { ...page, status: 1 },
    });
  }

  for (const config of configs) {
    await prisma.sysConfig.upsert({ where: { key: config.key }, update: {}, create: config });
  }

  for (const banner of bannerDefinitions) {
    const existing = await prisma.banner.findFirst({ where: { title: banner.title, position: banner.position } });
    const data = { ...banner, linkType: 'path', status: 1 };
    if (!existing) await prisma.banner.create({ data });
  }

  for (const product of demoTravelProducts) {
    await prisma.travelProduct.upsert({ where: { productCode: product.productCode }, update: {}, create: product });
  }

  const hotel = await prisma.hotel.upsert({ where: { hotelCode: demoHotel.hotelCode }, update: {}, create: demoHotel });
  for (const room of demoRooms) {
    const existing = await prisma.roomType.findFirst({ where: { roomCode: room.roomCode } });
    const data = { ...room, hotelId: hotel.id };
    if (!existing) await prisma.roomType.create({ data });
  }

  for (const activity of demoActivities) {
    await prisma.activity.upsert({ where: { activityCode: activity.activityCode }, update: {}, create: activity });
  }

  for (const product of demoShopProducts) {
    await prisma.shopProduct.upsert({ where: { productCode: product.productCode }, update: {}, create: product });
  }

  return {
    assets,
    banners: bannerDefinitions.length,
    pages: contentPages.length,
    demoTravelProducts: demoTravelProducts.length,
    demoHotels: 1,
    demoRooms: demoRooms.length,
    demoActivities: demoActivities.length,
    demoShopProducts: demoShopProducts.length,
  };
}

module.exports = { seedYunsheContent, assets };
