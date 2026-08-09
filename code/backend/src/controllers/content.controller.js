'use strict';

const { PrismaClient } = require('@prisma/client');
const { success, error, paginate } = require('../utils/response');

const prisma = new PrismaClient();

// ---- 小程序端 ----

const getBanners = async (req, res) => {
  const { position } = req.query;
  const where = { status: 1 };
  if (position) where.position = position;
  const now = new Date();
  where.OR = [
    { startDate: null },
    { startDate: { lte: now } },
  ];

  const list = await prisma.banner.findMany({
    where,
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  });
  return success(res, { list });
};

// 把 Banner 记录转成前端期望的 ad item 格式
const toAdItem = (b) => ({
  id: String(b.id),
  name: b.title || '',
  fileUrl: b.imageUrl || '',
  fileType: 1,
  path: b.linkUrl || '',
});

// 每个 location 的完整 infos 骨架（空数组）
// 前端代码会硬遍历特定子字段，必须保证所有字段存在
const LOCATION_SKELETON = {
  '1': { topCarousel: [] },
  '2': { homePageLogin: [] },
  '3': { homePageIntroduction: [] },
  '4': { ul: [], ur1: [], ur2: [], dl1: [], dl2: [], dr: [] },
  '5': { up: [], down1: [], down2: [], down3: [], down4: [] },
  '6': { row1: [], row2: [], row3: [] },
  '7': { homePageGlobalPopUp: [] },
};
// location 1/2/3/7 的主字段名（可通过后台 Banner 管理）
const LOCATION_KEY = {
  '1': 'topCarousel',
  '2': 'homePageLogin',
  '3': 'homePageIntroduction',
  '7': 'homePageGlobalPopUp',
};

// /shopapi/sz/advertisementPage  (普通调用，bannerSwiper 组件用)
const getAdvertisementPage = async (req, res) => {
  const params = { ...(req.body || {}), ...(req.query || {}) };
  const { showLocation, position } = params;

  // 解析请求的 location 列表
  const locations = showLocation
    ? showLocation.split(',').map(s => s.trim()).filter(Boolean)
    : (position ? [position] : []);

  let banners = [];
  if (locations.length) {
    banners = await prisma.banner.findMany({
      where: { status: 1, position: { in: locations } },
      orderBy: { sortOrder: 'asc' },
    });
  } else {
    banners = await prisma.banner.findMany({ where: { status: 1 }, orderBy: { sortOrder: 'asc' } });
  }

  // 返回 bannerSwiper 期望的格式：{ result:0, retVal:{ datas:[{infos:"[...]"}] } }
  const items = banners.map(toAdItem);
  return res.json({
    code: 0,
    result: 0,
    msg: 'success',
    retVal: {
      datas: items.length ? [{ infos: JSON.stringify(items) }] : [],
    },
  });
};

// location 4/5/6 的子位置定义（位置码 → 所属 location + infos key）
const SUB_POSITION_MAP = {
  '4_ul': { loc: '4', key: 'ul' }, '4_ur1': { loc: '4', key: 'ur1' },
  '4_ur2': { loc: '4', key: 'ur2' }, '4_dl1': { loc: '4', key: 'dl1' },
  '4_dl2': { loc: '4', key: 'dl2' }, '4_dr':  { loc: '4', key: 'dr'  },
  '5_up':    { loc: '5', key: 'up'    }, '5_down1': { loc: '5', key: 'down1' },
  '5_down2': { loc: '5', key: 'down2' }, '5_down3': { loc: '5', key: 'down3' },
  '5_down4': { loc: '5', key: 'down4' },
  '6_row1': { loc: '6', key: 'row1' }, '6_row2': { loc: '6', key: 'row2' },
  '6_row3': { loc: '6', key: 'row3' },
};

// /shopapi/sz/advertisementPage/v2  (newModel=true，首页 travel/index 用)
const getAdvertisementPageV2 = async (req, res) => {
  const params = { ...(req.body || {}), ...(req.query || {}) };
  const { showLocation } = params;

  const requestedLocations = showLocation
    ? showLocation.split(',').map(s => s.trim()).filter(Boolean)
    : ['1','2','3','4','5','6','7'];

  // 拉取所有有效 banner（主位置 + 子位置）
  const allSubKeys = Object.keys(SUB_POSITION_MAP);
  const allBanners = await prisma.banner.findMany({
    where: { status: 1 },
    orderBy: { sortOrder: 'asc' },
  });

  // 按主 location 分组（LOCATION_KEY 位置）
  const grouped = {};
  // 按子位置分组（SUB_POSITION_MAP 位置）
  const subGrouped = {};

  allBanners.forEach(b => {
    if (LOCATION_KEY[b.position]) {
      // 主位置 banner（1/2/3/7）
      if (!grouped[b.position]) grouped[b.position] = [];
      grouped[b.position].push(toAdItem(b));
    } else if (SUB_POSITION_MAP[b.position]) {
      // 子位置 banner（4_ul, 5_down1 等）
      const { loc, key } = SUB_POSITION_MAP[b.position];
      if (!subGrouped[loc]) subGrouped[loc] = {};
      if (!subGrouped[loc][key]) subGrouped[loc][key] = [];
      subGrouped[loc][key].push(toAdItem(b));
    }
  });

  // 构建 retVal
  const retVal = requestedLocations.map(loc => {
    // 从骨架开始（保证所有子字段存在）
    const skeleton = JSON.parse(JSON.stringify(LOCATION_SKELETON[loc] || {}));

    if (LOCATION_KEY[loc]) {
      // 主位置：覆盖主字段
      skeleton[LOCATION_KEY[loc]] = grouped[loc] || [];
    } else if (subGrouped[loc]) {
      // 子位置：用数据库值覆盖对应子字段
      Object.keys(subGrouped[loc]).forEach(key => {
        skeleton[key] = subGrouped[loc][key];
      });
    }

    return { location: Number(loc), infos: skeleton };
  });

  return res.json({ code: 0, result: 0, msg: 'success', retVal });
};

const getMarketingPage = async (req, res) => {
  const params = { ...(req.body || {}), ...(req.query || {}) };
  const { pageCode, type, showLocation } = params;
  const where = { status: 1 };
  if (pageCode) where.pageCode = pageCode;
  if (type) where.type = type;

  const pages = await prisma.contentPage.findMany({
    where, orderBy: { sortOrder: 'asc' },
  });
  const formatted = pages.map(formatPage);

  // 风物(scenery)页需要 showLocation="3" 的商品分类配置
  // scenery.js: t.retVal.datas → forEach(e => if "3"==e.showLocation: C.value = parse(e.infos))
  // 动态从 ShopProduct 的 category 字段生成分类
  const shopCategories = await prisma.shopProduct.findMany({
    where: { status: 1 },
    select: { category: true },
    distinct: ['category'],
  });
  const catList = shopCategories.map((c, i) => ({
    typeName: c.category || `分类${i+1}`,
    type: [c.category || `cat${i+1}`],
    goodsIds: [],
    number: 20,
  }));
  if (catList.length === 0) {
    catList.push({ typeName: '全部商品', type: ['all'], goodsIds: [], number: 20 });
  }

  const allDatas = [
    ...formatted.map(p => ({ showLocation: p.type || '1', infos: p.content || '[]', ...p })),
    { showLocation: '3', infos: JSON.stringify(catList) },  // 风物分类
  ];

  return res.json({
    code: 0, result: 0, msg: 'success',
    data: { pages: formatted },
    retVal: { datas: allDatas },
  });
};

const getModePage = async (req, res) => {
  const params = { ...(req.body || {}), ...(req.query || {}) };
  // modePage showLocation="2" → 风物页分类导航图标
  const shopCategories = await prisma.shopProduct.findMany({
    where: { status: 1 }, select: { category: true, coverImage: true }, distinct: ['category'],
  });
  const navItems = shopCategories.map(c => ({
    title: c.category || '全部',
    imgUrl: c.coverImage || '',
    link: '',
    typeName: c.category || '全部',
    type: [c.category || 'all'],
  }));
  if (navItems.length === 0) navItems.push({ title: '全部商品', imgUrl: '', link: '' });

  return res.json({
    code: 0, result: 0, msg: 'success',
    retVal: { datas: [{ showLocation: '2', infos: JSON.stringify(navItems) }] },
  });
};

const getContentPage = async (req, res) => {
  const { pageCode } = req.query;
  const page = await prisma.contentPage.findUnique({ where: { pageCode } });
  if (!page) return error(res, '页面不存在');
  return success(res, formatPage(page));
};

const getCmsPage = async (req, res) => {
  const pageCode = String(req.params.pageCode || '').trim();
  if (!pageCode) return error(res, '页面不存在');
  const page = await prisma.contentPage.findUnique({ where: { pageCode } });
  if (!page || page.status !== 1) return success(res, { pageCode, content: '', title: '' });
  return success(res, formatPage(page));
};

const getSysOptions = async (req, res) => {
  const { keys, codes } = req.query;
  const codeArr = (codes || keys || '').split(',').map(s => s.trim()).filter(Boolean);

  // 从 SysConfig 读客服电话（后台系统设置里可以配置）
  const phoneConfig = await prisma.sysConfig.findFirst({ where: { key: 'cs_phone' } });
  const csPhone = phoneConfig?.value || '0736-7070666';
  const wxCsUrl = (await prisma.sysConfig.findFirst({ where: { key: 'cs_wx_url' } }))?.value || '';
  const wxCorpId = (await prisma.sysConfig.findFirst({ where: { key: 'cs_wx_corpid' } }))?.value || '';
  const cmbPayUrl = (await prisma.sysConfig.findFirst({ where: { key: 'cmb_pay_url' } }))?.value || '';

  // 前端 useSysOptions 期望：{ result:1, retVal:[{code, value}] }
  const retValMap = {
    // customerServiceInfo 是纯文本描述，前端 kfDialog 把它作为副标题显示
    customerServiceInfo: '解答咨询、预订、会员及订单相关问题',
    tripContactPhone: csPhone,
    wxCustomerServiceUrl: wxCsUrl,
    wxCustomerCorpId: wxCorpId,
    cmbPayUrl,
    cs_phone: csPhone,
  };

  const retVal = codeArr.length
    ? codeArr.map(code => ({ code, value: retValMap[code] || '' }))
    : Object.entries(retValMap).map(([code, value]) => ({ code, value }));

  // 兼容两种格式
  return res.json({
    code: 0,
    result: 1,
    msg: 'success',
    data: retValMap,
    retVal,
  });
};

// ---- 管理端 ----

const adminListBanners = async (req, res) => {
  const { pageNum = 1, pageSize = 20, position, status } = req.query;
  const where = {};
  if (position) where.position = position;
  if (status !== undefined) where.status = Number(status);

  const [list, total] = await Promise.all([
    prisma.banner.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { updatedAt: 'desc' }],
      skip: (Number(pageNum) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    prisma.banner.count({ where }),
  ]);
  return paginate(res, list, total, pageNum, pageSize);
};

const adminCreateBanner = async (req, res) => {
  const { title, imageUrl, linkUrl, linkType, position, sortOrder, status, startDate, endDate } = req.body;
  if (!imageUrl) return error(res, '请提供图片');

  const banner = await prisma.banner.create({
    data: {
      title, imageUrl, linkUrl, linkType,
      position: position || 'home',
      sortOrder: sortOrder ? Number(sortOrder) : 0,
      status: status !== undefined ? Number(status) : 1,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
    },
  });
  return success(res, banner);
};

const adminUpdateBanner = async (req, res) => {
  const { title, imageUrl, linkUrl, linkType, position, sortOrder, status, startDate, endDate } = req.body;
  const banner = await prisma.banner.update({
    where: { id: Number(req.params.id) },
    data: {
      title, imageUrl, linkUrl, linkType, position,
      sortOrder: sortOrder ? Number(sortOrder) : 0,
      status: status !== undefined ? Number(status) : 1,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
    },
  });
  return success(res, banner);
};

const adminDeleteBanner = async (req, res) => {
  await prisma.banner.delete({ where: { id: Number(req.params.id) } });
  return success(res, null, '删除成功');
};

const adminListPages = async (req, res) => {
  const { pageNum = 1, pageSize = 20, type, keyword } = req.query;
  const where = {};
  if (type) where.type = type;
  if (keyword) where.OR = [{ title: { contains: keyword } }, { pageCode: { contains: keyword } }];

  const [list, total] = await Promise.all([
    prisma.contentPage.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { updatedAt: 'desc' }],
      skip: (Number(pageNum) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    prisma.contentPage.count({ where }),
  ]);
  return paginate(res, list.map(formatPage), total, pageNum, pageSize);
};

const adminCreatePage = async (req, res) => {
  const { pageCode, title, content, type, sortOrder, status } = req.body;
  if (!pageCode) return error(res, '请提供页面编码');

  const page = await prisma.contentPage.create({
    data: {
      pageCode, title,
      content: content ? (typeof content === 'string' ? content : JSON.stringify(content)) : null,
      type,
      sortOrder: sortOrder ? Number(sortOrder) : 0,
      status: status !== undefined ? Number(status) : 1,
    },
  });
  return success(res, formatPage(page));
};

const adminUpdatePage = async (req, res) => {
  const { title, content, type, sortOrder, status } = req.body;
  const page = await prisma.contentPage.update({
    where: { id: Number(req.params.id) },
    data: {
      title,
      content: content ? (typeof content === 'string' ? content : JSON.stringify(content)) : null,
      type,
      sortOrder: sortOrder ? Number(sortOrder) : 0,
      status: status !== undefined ? Number(status) : 1,
    },
  });
  return success(res, formatPage(page));
};

const adminDeletePage = async (req, res) => {
  await prisma.contentPage.delete({ where: { id: Number(req.params.id) } });
  return success(res, null, '删除成功');
};

const adminGetSysConfigs = async (req, res) => {
  const list = await prisma.sysConfig.findMany({ orderBy: { key: 'asc' } });
  return success(res, list);
};

const adminSetSysConfig = async (req, res) => {
  const { key, value, description } = req.body;
  if (!key) return error(res, '请提供配置键');
  const config = await prisma.sysConfig.upsert({
    where: { key },
    update: { value, description },
    create: { key, value, description },
  });
  return success(res, config);
};

const formatPage = (p) => ({
  ...p,
  content: tryParse(p.content, p.content),
});

const tryParse = (s, f) => { try { return s ? JSON.parse(s) : f; } catch { return f; } };

module.exports = {
  getBanners, getAdvertisementPage, getAdvertisementPageV2, getMarketingPage, getModePage, getContentPage, getCmsPage, getSysOptions,
  adminListBanners, adminCreateBanner, adminUpdateBanner, adminDeleteBanner,
  adminListPages, adminCreatePage, adminUpdatePage, adminDeletePage,
  adminGetSysConfigs, adminSetSysConfig,
};
