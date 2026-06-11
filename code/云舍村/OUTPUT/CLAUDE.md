# 云舍村小程序 - 搭建指南 & 开发文档

## 📋 项目概述

云舍村是一个综合旅行+酒店+商城平台的微信小程序，包括：
- **旅游套餐预订**（跨域跳转至旅游助手小程序）
- **酒店预订**（完整流程：列表→详情→填表→支付）
- **在地体验**（DIY定制行程）
- **风物商城**（商品浏览→购物车→订单→支付）
- **会员系统**（出行人、地址、积分、开票等）

**后端**：Node.js/Express + Prisma ORM + SQLite  
**前端**：WeChat Mini Program (uni-app/Vue 3)

---

## 🚀 快速搭建

### 后端启动
```bash
cd backend
npm install
node server.js  # 启动在 http://localhost:3000
```

### 前端本地预览
```bash
# 云舍村目录打开小程序开发工具
# 1. 导入 云舍村 目录
# 2. 编译→ 预览 (或点击开发工具的预览按钮)
```

### 管理后台
访问 `http://localhost:3000` → 输入管理员账号登录

---

## 📁 项目结构

```
.
├── backend/                          # Node.js 后端
│   ├── src/
│   │   ├── routes/                  # 路由层
│   │   │   ├── shop.routes.js       # 商城路由（商品、订单、配置）
│   │   │   ├── travel.routes.js     # 旅游套餐+DIY行程
│   │   │   ├── hotel.routes.js      # 酒店订单
│   │   │   ├── member.routes.js     # 会员相关（地址、出行人、开票等）
│   │   │   ├── admin.routes.js      # 管理端（后台管理所有数据）
│   │   │   ├── chat.routes.js       # 在线客服
│   │   │   └── content.routes.js    # CMS内容（轮播图、设置页等）
│   │   ├── controllers/             # 业务逻辑层
│   │   │   ├── shop.controller.js   # 商城逻辑
│   │   │   ├── hotel.controller.js  # 酒店逻辑
│   │   │   ├── payment.controller.js # 支付逻辑
│   │   │   └── ...
│   │   ├── middleware/
│   │   │   └── auth.js              # JWT认证中间件
│   │   ├── utils/
│   │   │   └── response.js          # 统一响应格式
│   │   └── app.js                   # Express app配置
│   ├── prisma/
│   │   └── schema.prisma            # 数据库schema（所有表定义）
│   ├── public/
│   │   └── index.html               # 管理后台HTML（完整页面在这里）
│   └── server.js                    # 启动入口
│
└── 云舍村/                            # 小程序前端
    ├── pages/                       # 主包页面
    │   ├── travel/
    │   │   ├── index.js             # 旅游首页（推荐线路列表）
    │   │   ├── destinations.js      # 全部产品（聚合旅游/酒店/活动）
    │   │   └── preIndex.js          # 预订页
    │   ├── trip/
    │   │   └── index.js             # 在地体验（推荐+DIY选项）
    │   ├── scenery/
    │   │   ├── scenery.js           # 风物首页（轮播+网格）
    │   │   └── culture-detail.js    # 风物详情
    │   ├── member/
    │   │   ├── memberCenter.js      # 我的页面（导航菜单）
    │   │   └── orderList.js         # 订单列表（酒旅+风物订单）
    │   └── ...
    │
    ├── pagesA/                      # 子包（会员+商城+工具）
    │   ├── member/
    │   │   ├── address.js           # 收货地址（CRUD）
    │   │   ├── travelersList.js     # 出行人管理
    │   │   ├── myCollection.js      # 我的收藏
    │   │   ├── sendPoints.js        # 积分转赠
    │   │   ├── beneficiaryPage.js   # 权益关联人
    │   │   ├── faqPage.js           # 常见问题
    │   │   ├── aboutPage.js         # 关于我们
    │   │   ├── travelPreference.js  # 出行偏好
    │   │   ├── invoicePage.js       # 开票申请+记录
    │   │   └── ...
    │   └── other/
    │       ├── productDetail.js     # 风物商品详情
    │       ├── shopOrder.js         # 风物订单填写
    │       ├── myShopOrders.js      # 我的风物订单
    │       ├── diyTrip.js           # 定制行程页面
    │       └── chat.js              # 在线客服
    │
    ├── pagesD/
    │   └── trip/
    │       └── tripList.js          # 全部行程（酒旅订单+DIY方案）
    │
    ├── utils/
    │   ├── config.js                # 配置（API地址）
    │   ├── api.js                   # API请求类
    │   ├── utils.js                 # 工具函数
    │   └── wxuser.js                # 本地存储
    │
    ├── components/
    │   ├── bottomNav.js             # 底部导航栏（自动选中）
    │   └── ...
    │
    ├── app.json                     # 小程序配置（页面注册、权限等）
    ├── app.js                       # 全局入口
    └── OUTPUT/                      # 打包输出目录（同步备份）

```

---

## 🔗 功能模块对应表

### 1️⃣ 旅游套餐 (Travel)

| 功能 | 前端文件 | 后端路由 | 说明 |
|------|--------|---------|------|
| 首页推荐 | `pages/travel/index.js` | `/shopapi/marketingActivity/...` | 调用旧接口，前置mock |
| 全部产品 | `pages/travel/destinations.js` | `GET /shop-api/productShelfApp/getProductShelfInfoList` | 聚合旅游/酒店/活动，自定义query |
| 产品详情 | 旧接口跳转 | 外部小程序 | 跨域跳转至 `pagesTravelAssistant/travel/index` |
| 预订支付 | 旧接口流程 | 旧接口 | 依赖旧系统，不修改 |

**后端文件**：
- Route: `backend/src/routes/travel.routes.js`
- Controller: `backend/src/controllers/travel.controller.js`
- Schema: `backend/prisma/schema.prisma` → `TravelProduct` 表

---

### 2️⃣ 酒店预订 (Hotel)

| 功能 | 前端文件 | 后端路由 | 说明 |
|------|--------|---------|------|
| 酒店列表 | `pages/travel/destinations.js` (聚合) | `GET /shop/hotel/list` | 返回酒店卡片 |
| 酒店详情 | `pagesC/order/hotel.js` | `GET /hotel/getHotelInfo` | 房型+设施+价格 |
| 查看房间 | `pagesC/order/hotel.js` | `GET /hotel/showOrder` | 入住日期房间列表 |
| 订单确认 | `pagesC/order/bookInfo.js` | `POST /hotel/order` → `POST /shop/pay.json` | 填表+支付 |
| 订单记录 | `pages/member/orderList.js` Tab 1 | `GET /orderAggregation/orderList.json` | 旧接口聚合 |
| 房型管理 | 后台表格 | 各种 CRUD | `backend/public/index.html` 表单 |

**后端文件**：
- Route: `backend/src/routes/hotel.routes.js`
- Controller: `backend/src/controllers/hotel.controller.js`
- Schema: `TravelProduct`, `Hotel`, `RoomType`, `HotelOrder`

---

### 3️⃣ 在地体验/DIY行程 (Trip & DIY)

| 功能 | 前端文件 | 后端路由 | 说明 |
|------|--------|---------|------|
| 在地体验首页 | `pages/trip/index.js` | 旧接口 | 推荐线路，DIY链接改为本地 |
| 定制行程表单 | `pagesA/other/diyTrip.js` | `POST /diy/submit` | 用户提交需求 |
| DIY参考示例 | `pagesA/other/diyTrip.js` | `GET /diy/examples` | 默认3个参考方案 |
| 定制内容配置 | `pagesA/other/diyTrip.js` | `GET /diy/config` | 读后台自定义介绍文本 |
| 我的行程计划 | `pagesD/trip/tripList.js` Tab 0 | `GET /orderAggregation/orderList.json` | 酒旅订单 |
| 我的行程方案 | `pagesD/trip/tripList.js` Tab 1 | `GET /diy/my-requests` | DIY回复列表 |
| 后台DIY管理 | 管理后台左菜单 | `GET/PUT /admin/diy/requests` | 查看+回复+上传方案图 |

**后端文件**：
- Route: `backend/src/routes/travel.routes.js` (DIY endpoints)
- Schema: `DiyTripRequest` 表

---

### 4️⃣ 风物商城 (Shop)

| 功能 | 前端文件 | 后端路由 | 说明 |
|------|--------|---------|------|
| 商城首页 | `pages/scenery/scenery.js` | `GET /shop/getShopButtonConfig.json` 获取导航Logo | 轮播+网格+导航 |
| 商品轮播 | `pages/scenery/scenery.js` | `GET /banners/public?limit=3` | 最多3张轮播图 |
| 商品详情 | `pagesA/other/productDetail.js` | `GET /shop/products/:id` | 价格、库存、评价 |
| 商品评价 | `pagesA/other/productDetail.js` | `GET /shop/products/:id/reviews` | 用户评价列表 |
| 下单填表 | `pagesA/other/shopOrder.js` | `POST /shop/order` | 创建订单 |
| 地址选择 | `pagesA/member/address.js?select=1` | `GET /member/addresses` | 从地址簿选择 |
| 支付调起 | `pagesA/other/shopOrder.js` | `POST /shop/pay.json` | 返回支付参数 |
| 订单列表 | `pagesA/other/myShopOrders.js` | `GET /shop/my-orders` | 订单卡片+追踪号 |
| 后台商品管理 | 管理后台左菜单 | CRUD `/admin/shop/products` | 增删改商品 |
| 后台订单管理 | 管理后台左菜单 | 查看+填快递号 | 表格+模态框 |

**后端文件**：
- Route: `backend/src/routes/shop.routes.js`
- Controller: `backend/src/controllers/shop.controller.js`
- Schema: `Product`, `ShopOrder`, `ShopOrderItem`

---

### 5️⃣ 会员系统 (Member)

| 功能 | 前端文件 | 后端路由 | 说明 |
|------|--------|---------|------|
| 收货地址 | `pagesA/member/address.js` | CRUD `/member/addresses` | 增删改默认地址 |
| 出行人 | `pagesA/member/travelersList.js` | CRUD `/member/travelers` | 管理出行人信息 |
| 我的收藏 | `pagesA/member/myCollection.js` | `GET /member/all-collections` | 旅游/酒店/活动/商品合并 |
| 积分转赠 | `pagesA/member/sendPoints.js` | `POST /member/transfer-points` | 输入对方手机号 |
| 权益关联人 | `pagesA/member/beneficiaryPage.js` | CRUD `/member/benefit-links` | 绑定其他账号共享权益 |
| 常见问题 | `pagesA/member/faqPage.js` | `GET /cms/faq` | 后台自定义FAQ list |
| 关于我们 | `pagesA/member/aboutPage.js` | `GET /cms/about` | 后台自定义介绍文本 |
| 出行偏好 | `pagesA/member/travelPreference.js` | `GET/POST /member/travel-preference` | 基于历史订单+手动设置 |
| 开票申请 | `pagesA/member/invoicePage.js` Tab 0 | `POST /invoice/request` | 选订单+填开票信息 |
| 开票记录 | `pagesA/member/invoicePage.js` Tab 1 | `GET /invoice/my-requests` | 查看处理状态+发票图 |
| 后台开票管理 | 管理后台左菜单 | 查看+上传发票图 | 处理申请、填备注 |

**后端文件**：
- Route: `backend/src/routes/member.routes.js`
- Schema: `ShippingAddress`, `Guest`, `Beneficiary`, `InvoiceRequest`

---

### 6️⃣ 支付系统 (Payment)

| 功能 | 前端文件 | 后端路由 | 说明 |
|------|--------|---------|------|
| 创建支付单 | `pagesA/other/shopOrder.js` | `POST /shop/pay.json` | 返回 timeStamp, nonceStr, package, paySign |
| 支付查询 | `pagesA/other/shopOrder.js` | `GET /payment/query` | 查询支付状态 |
| 支付回调 | （异步） | `POST /payment/callback` | 微信服务器通知 |
| 后台支付管理 | 管理后台左菜单 | `GET /admin/payments` | 查看所有支付记录 |

**后端文件**：
- Route: `backend/src/routes/payment.routes.js`
- Controller: `backend/src/controllers/payment.controller.js`
- Schema: `Payment` 表

---

### 7️⃣ 系统设置 (Settings & CMS)

| 功能 | 后端路由 | 说明 |
|------|---------|------|
| 导航Logo配置 | `GET/PUT /admin/nav-config` | 中间大按钮Logo |
| DIY行程内容 | `GET /diy/config` | 页面标题+介绍文本 |
| 常见问题 | `GET /cms/faq` | FAQ列表(JSON) |
| 关于我们 | `GET /cms/about` | 介绍文本(HTML) |
| 系统配置 | 各 `/admin/sys-config` | 所有 SysConfig 字段 |

**后端文件**：
- Route: `backend/src/routes/content.routes.js` (部分)
- Schema: `SysConfig` 表

---

## 📝 常见修改指南

### 修改导航栏Logo
1. **后台**：系统设置 → 导航栏配置 → 上传图片URL
2. **代码路径**：`backend/src/routes/shop.routes.js` 第11行 `getShopButtonConfig`

### 修改风物商城轮播图
1. **后台**：商城管理 → 轮播图管理 → 增删改
2. **API**：`POST/DELETE /admin/banners`
3. **后端路径**：`backend/src/routes/content.routes.js`
4. **前端调用**：`pages/scenery/scenery.js` 第40行 `loadBanners()`

### 新增会员功能页面
1. **创建文件**：`pagesA/member/yourPage.js` + `.wxml` + `.wxss` + `.json`
2. **后端路由**：如需数据，在 `backend/src/routes/member.routes.js` 添加
3. **注册页面**：在 `app.json` subPackages[0].pages 中添加 `"member/yourPage"`
4. **添加菜单**：在 `backend/src/routes/shop.routes.js` 的 `getShopMemberCenterConfig` 中添加菜单项

### 修改商品价格/库存
1. **后台**：商城管理 → 商品管理 → 编辑
2. **字段**：price, originalPrice, stock
3. **数据库表**：`Product`

### 修改订单状态流程
1. **后台**：订单管理 → 更改状态
2. **可选状态**：pending, paid, shipped, completed, cancelled
3. **代码路径**：`backend/src/controllers/shop.controller.js` → `adminUpdateOrderStatus`

### 添加新的会员菜单项
1. **位置**：`backend/public/index.html` → `getShopMemberCenterConfig`
2. **格式**：
   ```json
   { "desc": "菜单名", "url": "/pagesA/member/yourPage", "logo": "", "business": "default" }
   ```
3. **对应前端**：创建 `pagesA/member/yourPage.js` 及相关文件

---

## 🗄️ 数据库表速查

### 核心表
- **Product**：风物商品
- **ShopOrder**：风物订单
- **ShopOrderItem**：订单商品项
- **Hotel**：酒店基本信息
- **RoomType**：房型
- **HotelOrder**：酒店订单
- **TravelProduct**：旅游套餐
- **Activity**：在地活动
- **Banner**：轮播图
- **DiyTripRequest**：定制行程需求
- **InvoiceRequest**：开票申请
- **ShippingAddress**：收货地址
- **Guest**：出行人
- **Payment**：支付记录
- **SysConfig**：系统配置（键值对）

### Schema文件
```
backend/prisma/schema.prisma
```

---

## 🔐 认证与权限

### 前端本地存储（登录信息）
```javascript
// 路径：utils/wxuser.js
wx.getStorageSync('user')  // { memberId, memberToken, nickname, phone, avatar, ... }
```

### 后端认证中间件
```javascript
// 路径：backend/src/middleware/auth.js
authMiddleware      // 需要登录
optionalAuth        // 可选登录
adminAuthMiddleware // 管理员认证
```

### 获取当前用户
```javascript
// 后端 controller 中
req.member.id        // 用户ID
req.member.memberId  // 用户memberId
```

---

## 🚨 常见坑

| 坑 | 解决方案 |
|----|---------|
| 前端无法连接后端 | 检查 `utils/config.js` 的 `baseUrlmall` 是否正确 |
| 登录后请求返回401 | 检查 token 是否存储，Header 是否正确：`Authorization: Bearer {token}` |
| 商品/酒店查不到 | 检查数据库是否有数据，status 是否为1（已启用） |
| 后台表格空白 | 打开浏览器控制台查看 network，看请求是否成功 |
| WeChat pay 不弹出 | 确保：(1) 已登录 (2) POST `/shop/pay.json` 成功 (3) 本地环境会 mock 支付 |
| 页面加载缓慢 | 检查是否有大图片未优化，或 API 响应慢 |

---

## 📚 API 文档模板

### 请求示例
```javascript
// GET 请求
wx.request({
  url: BASE + '/api/endpoint?param=value',
  method: 'GET',
  header: { 'Authorization': 'Bearer ' + token },
  success: res => { console.log(res.data); }
});

// POST 请求
wx.request({
  url: BASE + '/api/endpoint',
  method: 'POST',
  data: { key: 'value' },
  header: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
  success: res => { console.log(res.data); }
});
```

### 响应格式
```json
{
  "code": 0,
  "msg": "success",
  "data": { /* 具体数据 */ }
}
```

---

## 🎯 下一步

1. **启动开发**：运行后端 + 打开小程序开发工具预览
2. **修改流程**：选择对应功能 → 查表找位置 → 修改代码
3. **提交部署**：`git commit` → `git push` → CI/CD 自动部署
4. **监控日志**：后台查看运行日志，前端控制台排查问题

---

**最后更新**：2026-06-10  
**维护者**：Claude Code
