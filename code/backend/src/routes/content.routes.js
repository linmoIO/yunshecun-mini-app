'use strict';

const router = require('express').Router();
const ctrl = require('../controllers/content.controller');
const couponCtrl = require('../controllers/coupon.controller');
const { optionalAuth, authMiddleware } = require('../middleware/auth');

// 广告/Banner/内容页
router.get('/shopapi/sz/advertisementPage', ctrl.getAdvertisementPage);
router.post('/shopapi/sz/advertisementPage', ctrl.getAdvertisementPage);
router.get('/shopapi/sz/advertisementPage/v2', ctrl.getAdvertisementPageV2);
router.post('/shopapi/sz/advertisementPage/v2', ctrl.getAdvertisementPageV2);
router.post('/shopapi/sz/marketingPage', ctrl.getMarketingPage);
router.post('/shopapi/sz/modePage', ctrl.getModePage);
router.post('/shopapi/sz/msgPage', ctrl.getMarketingPage);

// 商品搜索页
router.get('/shopapi/sz/shopGoodsPage', ctrl.getMarketingPage);
router.get('/shopapi/sz/queryMarketingPageTags.json', (req, res) => res.json({ code: 0, data: [] }));

// 系统配置
router.get('/cache/sysOptions/getMultiSysOptionCommon.json', ctrl.getSysOptions);

// 优惠券领取（需要登录）
router.get('/coupon/getPresentCouponDetail.json', authMiddleware, couponCtrl.getCouponDetail);
router.get('/coupon/receiveGiftCoupon.json', authMiddleware, couponCtrl.receiveGiftCoupon);
router.get('/coupon/presentGiftCoupon.json', authMiddleware, couponCtrl.receiveGiftCoupon);
router.get('/coupon/bindCouponToMemberForPlatform.json', authMiddleware, couponCtrl.bindCoupon);
router.post('/coupon/compute/maxDiscount', authMiddleware, couponCtrl.computeMaxDiscount);
router.post('/coupon/checkCouponExclusion', authMiddleware, couponCtrl.checkCouponExclusion);
router.get('/coupon/listCouponCodeUseConfigProductByCouponNo', authMiddleware, (req, res) => res.json({ code: 0, data: [] }));

// 发票相关
const invoiceCtrl = require('../controllers/invoice.controller');
router.get('/invoice/getOrderInvoiceSta.json', authMiddleware, invoiceCtrl.getOrderInvoiceStatus);
router.get('/invoice/applyInvoice.json', authMiddleware, invoiceCtrl.applyInvoice);
router.get('/invoice/saveOrUpdateOrderInvoice.json', authMiddleware, invoiceCtrl.saveOrUpdateInvoice);
router.get('/invoice/getInvoiceOrder.json', authMiddleware, invoiceCtrl.getInvoiceOrder);
router.get('/invoice/getInvoiceAmountAndMsg.json', authMiddleware, invoiceCtrl.getInvoiceAmountAndMsg);

// 相册分类
router.get('/albumCategory/listRootCategory', optionalAuth, (req, res) => res.json({ code: 0, data: [] }));

// 小程序码
router.get('/microSoftWare/admin/getWxacodeUnlimitUrl.json', authMiddleware, (req, res) => res.json({ code: 0, data: { url: '' } }));

// 订单聚合
// orderAggregation: 酒旅订单聚合（支持 openid/memberid/memberToken 多种鉴权，支持 orderStatus 过滤）
router.get('/orderAggregation/orderList.json', optionalAuth, async (req, res) => {
  const { PrismaClient: _P2 } = require('@prisma/client');
  const _p3 = new _P2();
  const q = req.query || {};
  const openid = q.openid || '';
  const memberIdParam = q.memberid || q.memberId || '';
  const orderStatusFilter = q.orderStatus || ''; // 逗号分隔，如 "1" 或 "2,4"

  // orderStatus 数字码 → DB 状态字符串
  const codeToDb = { '1':'pending','2':'refunded','3':'confirmed','4':'refunding','5':'cancelled','7':'completed','8':'signing','9':'completed','11':'processing' };
  // DB 状态 → 前端码
  const dbToCode = { pending:'1', paid:'3', confirmed:'3', processing:'11', completed:'9', cancelled:'5', refunded:'2', refunding:'4', signing:'8' };

  let member = null;
  try {
    if (req.member) {
      member = await _p3.member.findUnique({ where: { id: req.member.id } });
    } else if (memberIdParam) {
      member = await _p3.member.findFirst({ where: { memberId: String(memberIdParam) } });
    } else if (openid) {
      member = await _p3.member.findFirst({ where: { wechatOpenId: openid } });
    }
  } catch {}

  let orders = [];
  if (member) {
    try {
      const statusCodes = orderStatusFilter ? orderStatusFilter.split(',').map(s => s.trim()).filter(Boolean) : [];
      const dbStatuses = statusCodes.length > 0 ? [...new Set(statusCodes.map(c => codeToDb[c]).filter(Boolean))] : null;

      const tWhere = { memberId: member.id };
      const hWhere = { memberId: member.id };
      if (dbStatuses) { tWhere.status = { in: dbStatuses }; hWhere.status = { in: dbStatuses }; }

      const [tOrders, hOrders] = await Promise.all([
        _p3.travelOrder.findMany({ where: tWhere, include: { product: true }, orderBy: { createdAt: 'desc' }, take: 30 }),
        _p3.hotelOrder.findMany({ where: hWhere, include: { hotel: true }, orderBy: { createdAt: 'desc' }, take: 10 }),
      ]);
      tOrders.forEach(o => orders.push({
        orderNo: o.orderNo, channel: 'freetravel',
        orderStatus: dbToCode[o.status] || '9',
        title: o.product?.title || '旅游套餐', price: o.totalAmount || 0,
        link: o.product?.coverImage || '', hotelCode: '',
        // 提供 orderTypeDesc/itineraryName 防止前端拼出 "undefined · undefined"
        extraJson: JSON.stringify({ orderTypeDesc: '旅游套餐', itineraryName: o.product?.title || '云舍行程' }),
      }));
      hOrders.forEach(o => orders.push({
        orderNo: o.orderNo, channel: 'room',
        orderStatus: dbToCode[o.status] || '9',
        title: o.hotel?.name || '酒店订单', price: o.totalAmount || 0,
        link: o.hotel?.coverImage || '', hotelCode: o.hotel?.hotelCode || '', extraJson: '{}',
      }));
      orders.sort((a, b) => b.orderNo.localeCompare(a.orderNo));
    } catch(err) { console.error('[orderAggregation]', err); }
  }
  await _p3.$disconnect();
  return res.json({ code: 0, result: 1, retVal: { orderList: orders, total: orders.length } });
});

// 隐私政策
router.get('/wxMiniApp/getUserViewPrivacyPop', optionalAuth, (req, res) => res.json({ code: 0, data: { viewed: false } }));
router.post('/wxMiniApp/getUserViewPrivacyPop', optionalAuth, (req, res) => res.json({ code: 0, data: { viewed: false } }));
router.get('/wxMiniApp/saveUserViewPrivacyPop', authMiddleware, (req, res) => res.json({ code: 0, data: null }));
router.get('/wxMiniApp/getCancelRule.json', optionalAuth, (req, res) => res.json({ code: 0, data: { rule: '' } }));
router.post('/wxMiniApp/getCancelRule.json', optionalAuth, (req, res) => res.json({ code: 0, data: { rule: '' } }));
router.post('/wxMiniApp/updateUserinfoByMiniOpenId.json', authMiddleware, (req, res) => res.json({ code: 0, data: null }));
router.post('/wxMiniApp/decryptV2.json', (req, res) => res.json({ code: 0, data: {} }));

// 活动相关
// memberCenter.js line 283: 1===e.result && e.retVal.length → y.value=true → 显示功能列表
router.post('/activityapi/InvitationSpoil/selectInvitationSpoilRules', optionalAuth, (req, res) => res.json({
  code: 0, result: 1, retVal: [{ ruleType: 'DEFAULT', status: 1 }]
}));
router.post('/activityapi/InvitationSpoil/saveInvitationYQHYRecord', authMiddleware, (req, res) => res.json({ code: 0, data: null }));
router.post('/activityapi/InvitationSpoil/saveInvitationJSYQRecord', authMiddleware, (req, res) => res.json({ code: 0, data: null }));
router.get('/activityapi/InvitationSpoil/findInvitationLandConfigByCodeH5', optionalAuth, (req, res) => res.json({ code: 0, data: {} }));
router.post('/activityapi/InvitationSpoil/ifCanRewardGiveaways', authMiddleware, (req, res) => res.json({ code: 0, data: { canReward: false } }));
router.post('/activityapi/tasketCenter/selectMarketTaskCentersH5', authMiddleware, (req, res) => res.json({ code: 0, data: [] }));

// 签约/合同
router.get('/fdd/invokeExtSign.json', authMiddleware, (req, res) => res.json({ code: 0, data: { url: '' } }));
router.get('/fdd/downloadContractNoByGcRsvNo.json', authMiddleware, (req, res) => res.json({ code: 0, data: { url: '' } }));
router.get('/fdd/getContractNoByGcRsvNo.json', authMiddleware, (req, res) => res.json({ code: 0, data: '' }));

// 奖品
router.get('/wechat/platform/game/prizewinner.json', authMiddleware, (req, res) => res.json({ code: 0, data: [] }));
router.get('/wechat/platform/game/rewardlist', authMiddleware, (req, res) => res.json({ code: 0, data: [] }));
router.get('/wechat/platform/game/savePrizeAddress.json', authMiddleware, (req, res) => res.json({ code: 0, data: null }));

// 白名单
router.get('/marketingActivity/whitelist/checkWhitelist', authMiddleware, (req, res) => res.json({ code: 0, data: { inWhitelist: false } }));

// ---- 智能 interfaceTransfer：处理酒店搜索等 ----
const { PrismaClient: _Prisma } = require('@prisma/client');
const _prisma = new _Prisma();

async function handleInterfaceTransfer(req, res) {
  const body = req.body || {};
  const { config = {}, query = {}, params = {} } = body;
  const method = config.interfaceMethod || '';
  const path = config.path || '';

  // 风物页商品列表：weimoInterfaceTransfer with config.path="/weimob_shop/v2.0/goods/getList"
  if (path.includes('goods/getList') || path.includes('weimob_shop')) {
    const { pageNum = 1, pageSize = 20 } = params;
    const { classifyId } = params.queryParameter || {};
    const where = { status: 1 };
    if (classifyId && classifyId !== 'all') where.category = classifyId;

    const [products, total] = await Promise.all([
      _prisma.shopProduct.findMany({
        where,
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
        skip: (Number(pageNum) - 1) * Number(pageSize),
        take: Number(pageSize),
      }),
      _prisma.shopProduct.count({ where }),
    ]);

    const pageList = products.map(p => {
      let firstImg = '';
      try { firstImg = p.coverImage || (p.images ? JSON.parse(p.images)[0] || '' : ''); } catch {}
      return {
        goodsId: String(p.id),
        goodsName: p.name,
        goodsDesc: p.description || '',
        goodsMainPhoto: firstImg,
        minPrice: p.price || 0,
        maxPrice: p.originalPrice || p.price || 0,
        stock: p.stock !== undefined ? p.stock : 99,
        productType: 'shop',
        // 点击商品跳转到商品详情页（小程序内部路由）
        link: `/pagesA/other/productDetail?id=${p.id}`,
      };
    });

    return res.json({ code: 0, result: 0, retVal: { pageList, totalCount: total, pageSize: Number(pageSize) } });
  }

  // 酒店详情页（pagesC/order/hotel.js 使用，需要完整房型信息）
  if (method.includes('hotelListAllForSongZan') || method.includes('hotelListAllNewForWechat')) {
    const hotelCodes = query.hotelCodes || [];
    const fromDate = query.fromDate || new Date().toISOString().split('T')[0];
    const toDate = query.toDate || new Date(Date.now() + 86400000).toISOString().split('T')[0];
    const hotels = await _prisma.hotel.findMany({
      where: hotelCodes.length ? { hotelCode: { in: hotelCodes }, status: 1 } : { status: 1 },
      include: { roomTypes: { where: { status: 1 }, orderBy: { sortOrder: 'asc' } } },
    });
    const result = hotels.map(h => {
      const minRoomPrice = h.roomTypes.reduce((m, r) => Math.min(m, r.price || 999999), 999999);
      const effectiveMinPrice = h.priceFrom || (minRoomPrice === 999999 ? 0 : minRoomPrice);

      const productRoomList = h.roomTypes.map(r => {
        const roomPrice = Number(r.price) || 0;
        // stock: null（prisma返回null而非undefined）会让 !== undefined 判断出错，须用 != null
        const stock = (r.stock != null) ? Number(r.stock) : 10;
        const canBook = stock > 0;
        const roomImages = (() => { try { return r.images ? JSON.parse(r.images) : []; } catch { return []; } })();
        const logoImg = roomImages[0] || h.coverImage || '';

        // travelWechatHotelDetailDtos: 每晚日期区间的可订信息
        const dto = {
          roomCode: r.roomCode,
          fromDate, toDate,
          price: roomPrice,  // 数字，不是字符串
          unit: '元',
          priceDtos: [{ payType: 'CASH', adultPrice: roomPrice }],
          specificationsPriceDtos: [{ priceModel: 'ROOM', priceModelDesc: '间/晚', price: roomPrice }],
          productAvailNum: stock,
          canBook,
          bedType: r.bedType || '',
          area: r.area ? `${r.area}㎡` : '',
          capacity: r.capacity || 2,
        };

        return {
          roomCode: r.roomCode,
          roomName: r.name,
          roomDescript: r.name,    // roomList.js 组件读 t.roomDescript 作为房间名称
          bedType: r.bedType || '大床',
          area: r.area ? `${r.area}㎡` : '',
          capacity: r.capacity || 2,
          gcRoomExtra: {
            logo: logoImg,
            picturesList: roomImages,
            pictures: roomImages.join(';'),
            description: r.description || '',
            abstracts: r.description || '',
            bedType: r.bedType || '',         // roomList.js 读 t.gcRoomExtra.bedType
            squareMeter: r.area ? `${r.area}㎡` : '',  // roomList.js 读 t.gcRoomExtra.squareMeter
            floor: '',
            detail: '',
          },
          gcProductBases: [
            {
              name: `¥${roomPrice}/晚`,
              showName: `¥${roomPrice}/晚`,
              pbMinPriceWithPromotion: roomPrice,  // roomList.js 用这个显示第二行价格
              bookAble: canBook ? 'T' : 'F',       // 'T'=可预订, 否则显示"不可订"
              minSaleNum: canBook ? Math.max(1, stock) : 0,
              notMemberBook: 'T',                  // 允许非会员预订
              payMethod: 'CASH',                   // 非SCORE则走普通预订
              prodCategorySub: 'STD',
              price: roomPrice,
              // Ye() 导航到 bookInfo 所需字段
              productCode: `${h.hotelCode}-${r.roomCode}`,
              roomType: r.roomCode,
              pmsRateCode: r.roomCode,
              ticket: '',
              hotelGroupCode: h.hotelGroupCode || 'SONGTSAM',
              stayTime: '',
              resrvNumMin: 1,
              prepayTimeLimit: 24,
              prepayHoldTimeMax: 72,
              prepayMethod: 'PREPAY',
              cancelPrehour: 24,
              cancelPretime: '',
              cancelPredays: 1,
              cancelCondition: '出发前24小时可免费取消',
              otaChannel: 'WECHAT',
            },
          ],
          travelWechatHotelDetailDtos: [dto],
          travelList: [dto],
        };
      });

      return {
        gcHotel: {
          hotelCode: h.hotelCode,
          descript: h.name,
          address1: h.address || '',
          city: h.city || '',
          province: h.province || '',
          phone: h.phone || '',
          logo: h.coverImage || '',
          description: h.description || '',
          starLevel: h.starLevel || 5,
        },
        minPrice: effectiveMinPrice,
        productRoomList,
      };
    });
    return res.json({ code: 0, result: 1, retVal: { result: 0, retVal: result } });
  }

  // 酒店列表（按状态/全量）
  if (method.includes('getGcHotelListByStatus') || method.includes('hotelListAllNew')) {
    const hotels = await _prisma.hotel.findMany({ where: { status: 1 }, orderBy: { sortOrder: 'asc' } });
    return res.json({ code: 0, result: 1, retVal: { retVal: hotels.map(h => ({
      hotelCode: h.hotelCode,
      hotelName: h.name,
      hotelPic: h.coverImage || '',
      city: h.city || '',
      address: h.address || '',
      star: h.starLevel || 5,
      priceMin: h.priceFrom || 0,
    })) } });
  }

  // 酒店名称搜索
  if (method.includes('getGcHotelListByName')) {
    const kw = query.hotelName || '';
    const hotels = await _prisma.hotel.findMany({
      where: { status: 1, ...(kw && { name: { contains: kw } }) },
      orderBy: { sortOrder: 'asc' }, take: 20,
    });
    return res.json({ code: 0, result: 1, retVal: { retVal: hotels.map(h => ({
      hotelCode: h.hotelCode,
      hotelName: h.name,
      hotelPic: h.coverImage || '',
      city: h.city || '',
      address: h.address || '',
      star: h.starLevel || 5,
      priceMin: h.priceFrom || 0,
    })) } });
  }

  // 旅游产品详情（travelDetail 页面调用）
  if (method.includes('findTravelProductForWechatDetail')) {
    const travelType = query.travelType || '';
    const product = await _prisma.travelProduct.findFirst({
      where: { status: 1, OR: [{ productCode: travelType }, { id: isNaN(travelType) ? -1 : Number(travelType) }] },
    });
    if (!product) {
      return res.json({ code: 0, result: 1, retVal: { result: -1, retVal: null } });
    }
    const tryParseProd = (s, f) => { try { return s ? JSON.parse(s) : f; } catch { return f; } };
    const images = tryParseProd(product.images, []).map(u => ({ pictureType: 'LISTIMAGE', url: u }));
    if (product.coverImage) images.unshift({ pictureType: 'LISTIMAGE', url: product.coverImage });
    const itinerary = tryParseProd(product.itinerary, []);
    const includes = tryParseProd(product.includes, []);
    const excludes = tryParseProd(product.excludes, []);

    // itineraryDtos 是"行程方案"数组（每个元素 = 一种路线方案）
    // F.value = Ce.itineraryDtos[0]，模板从 F.value 读取：
    //   F.value.costIncludes（费用包含）
    //   F.value.costExcluding（费用不含，注意字段名是 Excluding 不是 Excludes）
    //   F.value.warmPrompt（温馨提示）
    //   F.value.dayDtos[].dayDetailDtos[]（每日行程详情）
    const includesText = Array.isArray(includes) ? includes.join('\n') : (product.includes || '');
    const excludesText = Array.isArray(excludes) ? excludes.join('\n') : (product.excludes || '');
    const notesText = product.notes || '';

    const itineraryDtos = [{
      itineraryCode: product.productCode + '-v1',
      itineraryDesc: product.title,
      itineraryShortDesc: product.description || '',
      // 费用说明（F.value 读这些字段）
      costDescription: product.description || '',
      costIncludes: includesText,
      costExcluding: excludesText,   // 注意：是 costExcluding，不是 costExcludes
      warmPrompt: notesText,
      cancelRule: '',
      // 每日行程
      dayDtos: itinerary.map((day, idx) => ({
        dayTitle: day.title || `第${idx + 1}天`,
        open: idx === 0,
        dayDetailDtos: (day.details || []).map(d => ({
          title: d.title || '',
          content: d.content || '',
          picture: d.picture || '',
        })),
      })),
    }];

    const productObj = {
      travelType: product.productCode,
      productCode: product.productCode,
      title: product.title,               // analytics product_name 用这个
      travelGroupName: product.title,
      travelGroupTitle: product.title,
      description: product.description || '',
      travelGroupDesc: product.description || '',
      categorySub: 'FreeTravel',  // confirmOrder.js: P=true 当 categorySub==='FreeTravel'
      miniPrice: product.price || 0,
      startingPrice: product.price || 0,
      price: String(product.price || 0),
      miniST: 'CASH',
      miniSTDesc: `¥${product.price || 0}/人起`,
      priceModel: 'PEOPLE',
      specificationsType: 'PEOPLE',
      duration: product.duration || 5,
      durationDays: product.duration || 5,
      minPersons: product.minPersons || 1,
      maxPersons: product.maxPersons || 99,
      skuFlag: true,
      orderType: 'FreeTravel',
      hasCoupon: false,
      destination: product.destination || '',
      urls: images,
      // topImage 必须是字符串数组，否则 Ce.topImage.forEach 会崩溃导致 oa() 不执行（日期不加载）
      topImage: images.map(img => img.url).filter(Boolean),
      itineraryDtos,
      itineraryDays: product.duration || 5,  // la() 计算结束日期用
      // 费用说明
      costIncludes: includes.join('\n') || product.includes || '',
      costExcludes: excludes.join('\n') || product.excludes || '',
      includes: Array.isArray(includes) ? includes : [],
      excludes: Array.isArray(excludes) ? excludes : [],
      // 温馨提示 & 预订须知
      notes: product.notes || '',
      travelTips: product.notes || '',
      reservationDesc: product.notes || '',
      cancelRule: '',
      // 问答
      productProblemDtos: [],
      // 产品亮点（用 subtitle 字段）
      subtitle: product.subtitle || product.description || '',
      highlights: product.subtitle || '',
    };
    return res.json({ code: 0, result: 1, retVal: { result: 0, retVal: [productObj] } });
  }

  // 旅游产品下单价格计算（confirmOrder 和 pay 页面都会调）
  if (method.includes('queryPayDetail') || method.includes('getTravelPrice')) {
    const travelType = query.travelType || '';
    const orderNo = query.orderNo || '';
    const adultNum = Number(query.adultNum || query.num || 1) || 1;
    let unitPrice = Number(query.miniPrice || query.price || 0);
    let totalFromOrder = 0;

    // 方式1：用 travelType 查产品价格
    if (!unitPrice && travelType) {
      const prod = await _prisma.travelProduct.findFirst({
        where: { OR: [{ productCode: travelType }, { productCode: travelType.split('-')[0] }] }
      });
      unitPrice = prod?.price || 0;
    }

    // 方式2：pay页 Ie() 只传 orderNo，直接用订单的 totalAmount
    if (!unitPrice && orderNo) {
      const order = await _prisma.travelOrder.findFirst({
        where: { orderNo },
        include: { product: true },
      });
      if (order) {
        totalFromOrder = order.totalAmount || 0;
        unitPrice = order.product?.price || 0;
      }
    }

    const total = totalFromOrder > 0 ? totalFromOrder : (unitPrice * adultNum);
    const rateSum = total;
    return res.json({ code: 0, result: 1, retVal: {
      result: 0,
      retVal: {
        readyPay: total,
        totalPrice: total,
        rateSum,
        memberDscAmount: 0,
        couponRateSum: 0,
        exchangeRateSum: 0,
        gwDiscount: 0,
        point: 0, pointMoney: 0,
        adultTeamRateSum: total,
        basicTeamRateSum: 0,
        childrenTeamRateSum: 0,
        singleRoomRateSum: 0,
        guaranteedPrice: 0,
        priceModel: 'PEOPLE',
        unitPrice,
        adultNum,
        travelRateSumDto: { rateSum, readyPay: total, memberDscAmount: 0, couponRateSum: 0, exchangeRateSum: 0, gwDiscount: 0 },
      }
    }});
  }

  // 出发日期列表（travelDetail 日历用）
  if (method.includes('listDailyDetailWithTag') || method.includes('listTravelProductDailyDetail')) {
    const travelType = query.travelType || '';
    const product = travelType ? await _prisma.travelProduct.findFirst({
      where: { OR: [{ productCode: travelType }, { id: isNaN(travelType) ? -1 : Number(travelType) }] }
    }) : null;
    const price = product?.price || 0;
    const duration = product?.duration || 5;

    // 优先从数据库读取后台配置的出发日期
    if (product) {
      const dbDates = await _prisma.travelDeparture.findMany({
        where: { productCode: product.productCode, status: 1, departDate: { gte: new Date().toISOString().split('T')[0] } },
        orderBy: { departDate: 'asc' },
      });
      if (dbDates.length > 0) {
        const dates = dbDates.map(d => {
          const p = d.price || price;
          const specDto = { specificationsType: 'PEOPLE', childType: 'ADULT', payType: 'CASH', adult: 1, children: 0, price: p, _id: 'PEOPLE-ADULT' };
          return {
            travelGroupCode: `${travelType}-${d.departDate}`,
            groupBeginDate: d.departDate,
            groupEndDate: d.endDate || d.departDate,
            productAvailNum: d.stock || 10,
            canTap: (d.stock || 10) > 0,
            show: true,
            startingPrice: p, miniPrice: p, price: p,
            miniST: 'CASH', priceModel: 'PEOPLE',
            priceDtos: [{ price: p, payType: 'CASH' }],
            specificationsPriceDtos: [specDto],
            hasRmtype: true,
            travelGroupName: product.title || '',
          };
        });
        return res.json({ code: 0, result: 1, retVal: { result: 0, retVal: dates } });
      }
    }

    // 生成未来 12 个月的出发日期（每月第1、15日）
    const dayjs = require('dayjs');
    const dates = [];
    for (let m = 0; m < 12; m++) {
      for (const d of [1, 15]) {
        const begin = dayjs().add(m, 'month').date(d).format('YYYY-MM-DD');
        const end = dayjs(begin).add(duration - 1, 'day').format('YYYY-MM-DD');
        const specDto = { specificationsType: 'PEOPLE', childType: 'ADULT', payType: 'CASH', adult: 1, children: 0, price, singleRoomPrice: 0, _id: 'PEOPLE-ADULT' };
        dates.push({
          travelGroupCode: `${travelType}-${begin}`,
          groupBeginDate: begin,
          groupEndDate: end,
          productAvailNum: 10,
          canTap: true,
          show: m < 2,
          // la() 函数读 startingPrice（不是 miniPrice/price）作为日期卡展示价格
          startingPrice: price,
          miniPrice: price,
          price: price,  // 数字，不是字符串（dailyPrice 组件比较大小用数字）
          miniST: 'CASH',
          priceModel: 'PEOPLE',
          // la() 会访问 priceDtos.length，不能 undefined
          priceDtos: [{ price, payType: 'CASH' }],
          specificationsPriceDtos: [specDto],
          hasRmtype: true,   // false 会弹"无法购买"客服弹窗
          travelGroupName: product?.title || '',
        });
      }
    }
    return res.json({ code: 0, result: 1, retVal: { result: 0, retVal: dates } });
  }

  // 酒店/房间类型（confirmOrder 需要）
  if (method.includes('getTravelGroupHotelAvailableNum') || method.includes('listTravelRmclassDto') ||
      method.includes('listTravelGroupRmtypes') || method.includes('getHotelRoomTypeByTravelGroupCode')) {
    return res.json({ code: 0, result: 1, retVal: { result: 0, retVal: [] } });
  }

  // 行程助手 planList（trip/index.js line 511: e.retVal.retVal）
  if (method.includes('planList') || method.includes('plan/recommend')) {
    return res.json({ code: 0, result: 1, retVal: { result: 0, retVal: [] } });
  }

  // 司机顾问（trip/index.js line 537: t.retVal.retVal[0].mobile）
  if (method.includes('listDriverButlerDto')) {
    return res.json({ code: 0, result: 1, retVal: { result: 0, retVal: [] } });
  }

  // 其他（订阅消息模板等）返回空成功
  return res.json({ code: 0, result: 0, data: null, retVal: null });
}

router.post('/sync/interfaceTransfer', handleInterfaceTransfer);
router.post('/shopapi/weimobCloud/interfaceTransfer', handleInterfaceTransfer);

// 商品搜索
router.post('/shopapi/search/product', optionalAuth, require('../controllers/search.controller').searchProducts);
router.post('/shopapi/search/product/title', optionalAuth, require('../controllers/search.controller').searchProducts);
router.get('/shopapi/search/getHomeHotWordList', require('../controllers/search.controller').getHotWords);

// ---- 线路系列配置（destinations 页面 tabs）----
const DEFAULT_SERIES = [
  { productSeriesName: '梅里环线', productSeriesCode: 'meili' },
  { productSeriesName: '拉萨环线', productSeriesCode: 'lasa' },
  { productSeriesName: '香格里拉环线', productSeriesCode: 'shangri-la' },
  { productSeriesName: '冰川环线', productSeriesCode: 'glacier' },
];

router.get('/shop-api/productShelfApp/getProductShelfConfigApp', optionalAuth, async (req, res) => {
  const cfg = await _prisma.sysConfig.findFirst({ where: { key: 'destinations_series' } });
  const series = cfg?.value ? JSON.parse(cfg.value) : DEFAULT_SERIES;
  return res.json({ success: true, data: series });
});

// ---- 产品货架（按系列 + 分类过滤）----
// type/serverKey 映射（前端 destinations.js 硬编码的分类）
const TYPE_TO_CATEGORY = {
  'travel': 'Travel', 'Travel': 'Travel',
  'tdq': 'ExchangeCoupon', 'ExchangeCoupon': 'ExchangeCoupon',
  'hotel': 'Hotel', 'Hotel': 'Hotel',
  'daily': 'DayActivity', 'DayActivity': 'DayActivity',
  'DestPackage': 'DestPackage',
};

async function getProductShelf(req, res) {
  const params = { ...(req.body || {}), ...(req.query || {}) };
  const { productSeriesCode, keyword, type, isAll, firstNum = 1, pageSize = 50 } = params;

  const resolvedType = TYPE_TO_CATEGORY[type] || (isAll ? null : null);
  const TAKE = Number(pageSize) || 50;

  // 判断需要查哪些表
  const wantTravel = !resolvedType || ['Travel', 'DestPackage', 'ExchangeCoupon'].includes(resolvedType);
  const wantHotel = !resolvedType || resolvedType === 'Hotel';
  const wantActivity = !resolvedType || resolvedType === 'DayActivity';

  const results = [];

  // --- 旅游产品 ---
  if (wantTravel) {
    const where = { status: 1 };
    if (keyword) where.title = { contains: keyword };
    if (productSeriesCode && productSeriesCode !== 'all') where.destination = productSeriesCode;
    if (resolvedType) where.category = resolvedType;
    const list = await _prisma.travelProduct.findMany({ where, orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }], take: TAKE });
    list.forEach(p => {
      const categorySub = p.category || 'Travel';
      results.push({
        productId: p.productCode, productType: 'travel', categorySub,
        travelType: p.productCode, title: p.title, secondTitle: p.subtitle || p.description || '',
        productItineraryDesc: p.description || '', pics: p.coverImage || '',
        price: p.price || 0, duration: p.duration,
        themes: p.tags ? (typeof p.tags === 'string' ? (() => { try { return JSON.parse(p.tags); } catch { return []; } })() : p.tags) : [],
        tagApiDtos: [{ tageDesc: categorySub }],
        specificationsType: 'PEOPLE', skuFlag: true,
        minPriceDto: { payType: 'CASH', price: p.price || 0 },
        productCode: p.productCode, coverImage: p.coverImage || '',
        description: p.description || '', seriesCode: p.destination || '',
        urls: p.coverImage ? [{ pictureType: 'LISTIMAGE', url: p.coverImage }] : [],
      });
    });
  }

  // --- 酒店 ---
  if (wantHotel) {
    const where = { status: 1 };
    if (keyword) where.name = { contains: keyword };
    const hotels = await _prisma.hotel.findMany({ where, orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }], take: TAKE });
    hotels.forEach(h => {
      const minPrice = h.priceFrom || 0;
      results.push({
        productId: h.hotelCode, productType: 'hotel', categorySub: 'Hotel',
        travelType: null, hotelCode: h.hotelCode,
        title: h.name, secondTitle: h.address || h.city || '',
        productItineraryDesc: h.description || '', pics: h.coverImage || '',
        price: minPrice, duration: null,
        themes: [], tagApiDtos: [{ tageDesc: '酒店' }],
        specificationsType: 'ROOM', skuFlag: false,
        minPriceDto: { payType: 'CASH', price: minPrice },
        productCode: h.hotelCode, coverImage: h.coverImage || '',
        description: h.description || '', seriesCode: h.city || '',
        urls: h.coverImage ? [{ pictureType: 'LISTIMAGE', url: h.coverImage }] : [],
        // 酒店详情页路由
        hotelDetailUrl: `/pagesC/order/hotel?hotelCode=${h.hotelCode}`,
      });
    });
  }

  // --- 活动 ---
  if (wantActivity) {
    const where = { status: 1 };
    if (keyword) where.title = { contains: keyword };
    const activities = await _prisma.activity.findMany({ where, orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }], take: TAKE });
    activities.forEach(a => {
      results.push({
        productId: a.activityCode, productType: 'daily', categorySub: 'DayActivity',
        travelType: null, activityCode: a.activityCode,
        title: a.title, secondTitle: a.location || '',
        productItineraryDesc: a.description || '', pics: a.coverImage || '',
        price: a.price || 0, duration: 1,
        themes: [], tagApiDtos: [{ tageDesc: '在地活动' }],
        specificationsType: 'PEOPLE', skuFlag: true,
        minPriceDto: { payType: 'CASH', price: a.price || 0 },
        productCode: a.activityCode, coverImage: a.coverImage || '',
        description: a.description || '', seriesCode: a.category || '',
        urls: a.coverImage ? [{ pictureType: 'LISTIMAGE', url: a.coverImage }] : [],
      });
    });
  }

  return res.json({ success: true, data: results });
}

router.get('/shop-api/productShelfApp/getProductShelfInfoList', optionalAuth, getProductShelf);
router.post('/shop-api/productShelfApp/getProductShelfInfoList', optionalAuth, getProductShelf);
router.get('/shop-api/productGroup/getAdvertiseProductGroupVo', optionalAuth, (req, res) => res.json({ code: 0, data: {} }));

// 加盟/会员活动
router.get('/member-activity-center/list', authMiddleware, (req, res) => res.json({ code: 0, data: [] }));

// 广告埋点上报（travelDetail/useAdReport 调用，不影响功能，直接 200）
router.post('/advertise-server/app-api/advertise/app/appReport', (req, res) => res.json({ code: 0, result: 0, data: null }));
router.get('/advertise-server/app-api/advertise/app/appReport', (req, res) => res.json({ code: 0, result: 0, data: null }));

// 招商银行
router.post('/tfMember/userDataDes.json', authMiddleware, (req, res) => res.json({ code: 0, data: {} }));
router.get('/tfMember/getAuthInfo.json', authMiddleware, (req, res) => res.json({ code: 0, data: {} }));

// 客服电话（统一出口，前端可直接调）
router.get('/cs/phone', async (req, res) => {
  const cfg = await _prisma.sysConfig.findFirst({ where: { key: 'cs_phone' } });
  res.json({ code: 0, phone: cfg?.value || '400-0000-830' });
});

module.exports = router;
