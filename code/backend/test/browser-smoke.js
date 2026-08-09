'use strict';

const assert = require('node:assert/strict');
const { chromium } = require('playwright-core');

const baseUrl = process.env.LOCAL_TEST_BASE_URL || 'https://localhost:3443';
const edgePath = process.env.LOCAL_TEST_EDGE_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const adminUsername = process.env.LOCAL_TEST_ADMIN_USERNAME || 'admin';
const adminPassword = process.env.LOCAL_TEST_ADMIN_PASSWORD;

const run = async () => {
  assert.ok(adminPassword, '必须设置 LOCAL_TEST_ADMIN_PASSWORD');
  const browser = await chromium.launch({ executablePath: edgePath, headless: true });
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    const failedRequests = [];
    page.on('requestfailed', (request) => failedRequests.push({ url: request.url(), failure: request.failure()?.errorText }));

    await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
    await page.locator('#loginUser').fill(adminUsername);
    await page.locator('#loginPass').fill(adminPassword);
    await page.getByRole('button', { name: '登 录' }).click();
    await page.waitForFunction(() => Boolean(localStorage.getItem('adminToken')));

    const pages = [
      ['数据看板', '#page-dashboard'],
      ['旅游产品', '#page-travel'],
      ['酒店管理', '#page-hotel'],
      ['活动管理', '#page-activity'],
      ['商城商品', '#page-shop'],
      ['Banner管理', '#page-banner'],
      ['媒体素材库', '#page-media'],
      ['全部订单', '#page-orders'],
      ['支付记录', '#page-payments'],
      ['会员管理', '#page-members'],
    ];
    for (const [label, selector] of pages) {
      await page.locator('.nav-item', { hasText: label }).click();
      await page.locator(selector).waitFor({ state: 'visible' });
    }

    await page.locator('.nav-item', { hasText: '媒体素材库' }).click();
    await page.locator('#mediaGrid .media-card').first().waitFor();
    await page.getByText('雅室（会议室）.jpg', { exact: true }).waitFor();
    const mediaImageWidth = await page.locator('#mediaGrid img').first().evaluate((image) => image.naturalWidth);
    assert.ok(mediaImageWidth > 0, '媒体库缩略图应成功加载');

    const imageUrl = `${baseUrl}/uploads/images/8d80f25f-d982-442d-ade8-5ae2abf9c78d.jpg`;
    await page.goto(imageUrl, { waitUntil: 'load' });
    const width = await page.locator('img').evaluate((image) => image.naturalWidth);
    assert.ok(width > 0, '浏览器应成功解码 HTTPS 图片');
    assert.deepEqual(failedRequests.filter((item) => item.failure?.includes('CERT')), []);
  } finally {
    await browser.close();
  }
};

run().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
