'use strict';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 把 DB 产品转成前端期望的 travel product 格式
// productType 必须小写（base/product.js formatTravelThemeProducts 用小写判断跳转路径）
const toTravelItem = (p) => {
  const categorySub = p.category || 'Travel';
  const travelType = p.productCode || String(p.id);
  const CATEGORY_TO_TYPE = { Travel:'travel', DestPackage:'travel', ExchangeCoupon:'tdq', Hotel:'hotel', DayActivity:'daily' };
  return {
    productId: travelType,
    productType: CATEGORY_TO_TYPE[categorySub] || 'travel',
    categorySub,
    travelType,  // Travel/DestPackage 详情页 URL 参数
    title: p.title,
    secondTitle: p.description || '',
    productItineraryDesc: p.description || '',
    pics: p.coverImage || '',
    themes: p.tags ? tryParse(p.tags, []) : [],
    tagApiDtos: categorySub ? [{ tageDesc: categorySub }] : [],
    specificationsType: 'PEOPLE',
    skuFlag: true,
    minPriceDto: { payType: 'CASH', price: p.price || 0 },
    duration: p.duration,
    urls: p.coverImage ? [{ pictureType: 'LISTIMAGE', url: p.coverImage }] : [],
  };
};

const toHotelItem = (h) => ({
  productId: h.hotelCode,  // Hotel 详情页用 hotelCode
  hotelCode: h.hotelCode,
  productType: 'hotel',    // 小写！
  categorySub: 'Hotel',
  title: h.name,
  secondTitle: h.description || '',
  pics: h.coverImage || '',
  tagApiDtos: h.city ? [{ tageDesc: h.city }] : [],
  minPriceDto: { payType: 'CASH', price: h.priceFrom || 0 },
  skuFlag: true,
});

const toActivityItem = (a) => ({
  productId: a.activityCode || String(a.id),  // DayActivity 详情页用 activityCode
  activityCode: a.activityCode || String(a.id),
  productType: 'daily',  // 小写！
  categorySub: 'DayActivity',
  title: a.title,
  secondTitle: a.description || '',
  pics: a.coverImage || '',
  tagApiDtos: a.category ? [{ tageDesc: a.category }] : [],
  minPriceDto: { payType: 'CASH', price: a.price || 0 },
  skuFlag: true,
});

const tryParse = (s, f) => { try { return s ? JSON.parse(s) : f; } catch { return f; } };

// POST /shopapi/search/product  和  /shopapi/search/product/title
const searchProducts = async (req, res) => {
  const { keyword = '', firstNum = 1, pageSize = 20 } = { ...(req.body || {}), ...(req.query || {}) };
  const kw = (keyword || '').trim();

  const [travels, hotels, activities, shops] = await Promise.all([
    prisma.travelProduct.findMany({
      where: { status: 1, ...(kw && { title: { contains: kw } }) },
      take: Number(pageSize),
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    }),
    prisma.hotel.findMany({
      where: { status: 1, ...(kw && { name: { contains: kw } }) },
      take: Number(pageSize),
    }),
    prisma.activity.findMany({
      where: { status: 1, ...(kw && { title: { contains: kw } }) },
      take: Number(pageSize),
    }),
    prisma.shopProduct.findMany({
      where: { status: 1, ...(kw && { name: { contains: kw } }) },
      take: Number(pageSize),
    }),
  ]);

  // 前端 useSearchTravel 期望: retVal.{ journeyList, destPackageList, goodsList, hotelList, activitiesList }
  return res.json({
    code: 0,
    result: 0,
    msg: 'success',
    retVal: {
      journeyList: travels.map(toTravelItem),
      destPackageList: [],
      goodsList: shops.map(s => ({
        productId: String(s.id),
        productType: 'ExchangeCoupon',
        title: s.name,
        pics: s.coverImage || s.images ? tryParse(s.images, [])[0] || '' : '',
        minPriceDto: { payType: 'CASH', price: s.price || 0 },
      })),
      hotelList: hotels.map(toHotelItem),
      activitiesList: activities.map(toActivityItem),
    },
  });
};

// GET /shopapi/search/getHomeHotWordList
const getHotWords = async (req, res) => {
  const cfgs = await prisma.sysConfig.findFirst({ where: { key: 'search_hot_words' } });
  const words = cfgs?.value
    ? tryParse(cfgs.value, ['精品旅行', '云舍酒店', '休闲度假', '特色体验', '亲子游'])
    : ['精品旅行', '云舍酒店', '休闲度假', '特色体验', '亲子游'];

  // 前端 useSearchTravel 期望: retVal[].{ dictionaryCode, dictionaryDesc, jumpUrl, picUrl, searchDisplay }
  return res.json({
    code: 0,
    result: 0,
    msg: 'success',
    retVal: words.map((w, i) => ({
      dictionaryCode: typeof w === 'string' ? w : w.text,
      dictionaryDesc: typeof w === 'string' ? w : w.text,
      jumpUrl: typeof w === 'object' ? w.url || '' : '',
      picUrl: '',
      searchDisplay: 'T',
      sortOrder: i,
    })),
  });
};

module.exports = { searchProducts, getHotWords };
