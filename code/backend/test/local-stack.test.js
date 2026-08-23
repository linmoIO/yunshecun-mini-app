'use strict';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const assert = require('node:assert/strict');
const test = require('node:test');

const baseUrl = process.env.LOCAL_TEST_BASE_URL || 'https://localhost:3443';
const adminUsername = process.env.LOCAL_TEST_ADMIN_USERNAME || 'admin';
const adminPassword = process.env.LOCAL_TEST_ADMIN_PASSWORD;

const request = async (path, options) => {
  const response = await fetch(`${baseUrl}${path}`, options);
  const body = await response.text();
  return { response, body, json: () => JSON.parse(body) };
};

const isReversibleMojibake = (value) => {
  if (!value || typeof value !== 'string') return false;
  const repaired = Buffer.from(value, 'latin1').toString('utf8');
  return repaired !== value && !repaired.includes('\uFFFD') && /[\u4E00-\u9FFF]/.test(repaired)
    && Buffer.from(repaired, 'utf8').toString('latin1') === value;
};

test('local stack exposes a healthy HTTPS API and same-origin admin page', async () => {
  const health = await request('/api/health');
  assert.equal(health.response.status, 200);
  assert.equal(health.json().status, 'ok');

  const admin = await request('/');
  assert.equal(admin.response.status, 200);
  assert.match(admin.response.headers.get('content-type'), /text\/html/);
  assert.match(admin.body, /const API = '\/api';/);
  assert.doesNotMatch(admin.body, /localhost:3000\/api/);
});

test('mini-program startup configuration endpoints are reachable over HTTPS', async () => {
  const endpoints = [
    '/api/api/cache/sysOptions/getMultiSysOptionCommon.json?appid=wxc8e2d82494b5b533&codes=customerServiceInfo%2CtripContactPhone&componentAppid=&hotelCode=0&hotelGroupCode=SONGTSAM&clientType=wechat_mini',
    '/api/shopapi/search/getHomeHotWordList?hotelGroupCode=SONGTSAM',
    '/api/api/shop/getShopButtonConfig.json?hotelGroupCode=SONGTSAM&appid=wxc8e2d82494b5b533&businessType=2',
  ];

  for (const endpoint of endpoints) {
    const result = await request(endpoint);
    assert.equal(result.response.status, 200, endpoint);
    assert.equal(result.json().code, 0, endpoint);
  }
});

test('search returns stable empty results and only usable hot words', async () => {
  const hotWords = await request('/api/shopapi/search/getHomeHotWordList');
  assert.equal(hotWords.response.status, 200);
  const words = hotWords.json().retVal.map((item) => item.dictionaryDesc);
  assert.deepEqual(words, ['云舍村', '桃花源']);

  const empty = await request('/api/shopapi/search/product', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ keyword: '不存在的测试关键词XYZ', pageSize: 20 }),
  });
  assert.equal(empty.response.status, 200);
  const result = empty.json().retVal;
  for (const key of ['journeyList', 'destPackageList', 'goodsList', 'hotelList', 'activitiesList']) {
    assert.deepEqual(result[key], [], key);
  }
});

test('member login preserves tokens across normalized headers and refresh', async () => {
  const memberId = '9f825402-2c46-498a-9e90-b10c49875226';
  const memberLogin = await request(`/api/member/memberLoginOpen.json?memberId=${memberId}`);
  assert.equal(memberLogin.response.status, 200);
  const memberBody = memberLogin.json();
  assert.equal(memberBody.result, 1);
  const initialToken = memberBody.data?.memberToken;
  assert.ok(initialToken);

  const authorization = await request('/api/auth-center/api/login/authorization', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      loginType: 'wechat',
      authData: { openid: memberBody.retVal?.openid },
    }),
  });
  assert.equal(authorization.response.status, 200);
  const authorizationBody = authorization.json();
  assert.equal(authorizationBody.success, true);
  assert.ok(authorizationBody.data?.member?.memberToken);
  assert.ok(authorization.response.headers.get('accesstoken'));

  const refreshed = await request('/api/auth-center/api/auth/refresh/token', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${initialToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken: initialToken }),
  });
  assert.equal(refreshed.response.status, 200);
  const refreshedBody = refreshed.json();
  assert.equal(refreshedBody.code, 0);
  assert.ok(refreshedBody.data?.accessToken);
  assert.equal(refreshedBody.data?.refreshToken, refreshedBody.data?.accessToken);
});

test('hotel shelf and detail expose price, hero image and introduction', async () => {
  const shelf = await request('/api/shop-api/productShelfApp/getProductShelfInfoList', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'hotel', pageSize: 20 }),
  });
  assert.equal(shelf.response.status, 200);
  const hotelItem = shelf.json().data.find((item) => item.hotelCode === 'DEMO-HOTEL-YUNSHE');
  assert.ok(hotelItem);
  assert.ok(hotelItem.minPriceDto.price > 0);

  const detail = await request('/api/sync/interfaceTransfer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      config: { interfaceMethod: 'api/travelGroup/hotelListAllForSongZan' },
      query: {
        hotelCodes: ['DEMO-HOTEL-YUNSHE'],
        fromDate: '2026-08-23',
        toDate: '2026-08-24',
      },
    }),
  });
  assert.equal(detail.response.status, 200);
  const hotel = detail.json().retVal.retVal[0];
  assert.ok(hotel.gcHotelExtra.logo);
  assert.ok(hotel.gcHotel.htmlInfo);
  assert.equal(hotel.minPrice, hotelItem.minPriceDto.price);
  assert.equal(new Set(hotel.productRoomList.map((room) => room.gcRoomExtra.logo)).size, hotel.productRoomList.length);
});

test('travel home advertisement API exposes HTTPS images without legacy URLs', async () => {
  const advertisement = await request('/api/shopapi/sz/advertisementPage/v2?hotelGroupCode=SONGTSAM&clientTypes=wechat_mini&channel=mini_app&showLocation=1%2C2%2C3%2C4%2C5%2C6%2C7');
  assert.equal(advertisement.response.status, 200);
  const body = advertisement.json();
  const serialized = JSON.stringify(body);
  assert.doesNotMatch(serialized, /http:\/\/localhost:3000\/uploads\//);
  const imageUrls = [...serialized.matchAll(/https:\/\/localhost:3443\/uploads\/images\/[^"\\]+/g)].map((match) => match[0]);
  assert.ok(imageUrls.length > 0, '首页广告应包含图片');

  for (const imageUrl of new Set(imageUrls)) {
    const image = await fetch(imageUrl, { method: 'HEAD' });
    assert.equal(image.status, 200, imageUrl);
    assert.match(image.headers.get('content-type') || '', /^image\//, imageUrl);
    assert.match(image.headers.get('cache-control') || '', /max-age=2592000/, imageUrl);
    assert.match(image.headers.get('cache-control') || '', /immutable/, imageUrl);
  }
});

test('administrator can authenticate and media names are not mojibake', async () => {
  assert.ok(adminPassword, '必须设置 LOCAL_TEST_ADMIN_PASSWORD');
  const login = await request('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: adminUsername, password: adminPassword }),
  });
  assert.equal(login.response.status, 200);
  const session = login.json();
  assert.equal(session.code, 0, session.msg);
  assert.ok(session.data.token);

  const media = await request('/api/admin/media?pageNum=1&pageSize=100', {
    headers: { Authorization: `Bearer ${session.data.token}` },
  });
  assert.equal(media.response.status, 200);
  const payload = media.json();
  assert.equal(payload.code, 0, payload.msg);
  assert.ok(payload.data.list.length > 0);
  assert.deepEqual(payload.data.list.filter((item) => isReversibleMojibake(item.originalName)), []);
  assert.doesNotMatch(JSON.stringify(payload), /http:\/\/localhost:3000\/uploads\//);

  const dashboard = await request('/api/admin/dashboard', {
    headers: { Authorization: `Bearer ${session.data.token}` },
  });
  assert.equal(dashboard.response.status, 200);
  assert.equal(dashboard.json().code, 0);

  for (const item of payload.data.list.filter((item) => item.type === 'image')) {
    const image = await fetch(item.url, { method: 'HEAD' });
    assert.equal(image.status, 200, item.originalName);
    assert.match(image.headers.get('content-type') || '', /^image\//, item.originalName);
  }
});

test('public content endpoints return usable data and protected media requires authentication', async () => {
  const unauthenticatedMedia = await request('/api/admin/media?pageNum=1&pageSize=1');
  assert.notEqual(unauthenticatedMedia.response.status, 200);

  const banners = await request('/api/banners/public?limit=10');
  assert.equal(banners.response.status, 200);
  const bannerData = banners.json();
  assert.equal(bannerData.code, 0);
  assert.ok(Array.isArray(bannerData.data.list));

  const products = await request('/api/shop/products');
  assert.equal(products.response.status, 200);
  const productData = products.json();
  assert.equal(productData.code, 0);
  assert.ok(Array.isArray(productData.data.list));
});

test('administrator read-only management endpoints are available', async () => {
  assert.ok(adminPassword, '必须设置 LOCAL_TEST_ADMIN_PASSWORD');
  const login = await request('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: adminUsername, password: adminPassword }),
  });
  const token = login.json().data.token;
  const endpoints = [
    '/api/admin/travel/products',
    '/api/admin/hotels',
    '/api/admin/shop/products',
    '/api/admin/activities',
    '/api/admin/services',
    '/api/admin/coupons',
    '/api/admin/banners',
    '/api/admin/pages',
    '/api/admin/sys-config',
    '/api/admin/payments',
    '/api/admin/members',
    '/api/admin/departures',
    '/api/admin/destinations/series',
    '/api/admin/destinations/products',
    '/api/admin/invoice/requests',
    '/api/admin/diy/requests',
  ];

  for (const endpoint of endpoints) {
    const result = await request(endpoint, { headers: { Authorization: `Bearer ${token}` } });
    assert.equal(result.response.status, 200, endpoint);
    assert.equal(result.json().code, 0, endpoint);
  }
});
