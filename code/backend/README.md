# 云舍村后端服务

## 技术栈

- **运行时**: Node.js + Express.js
- **数据库**: SQLite（开发）/ 可切换为 MySQL/PostgreSQL
- **ORM**: Prisma
- **认证**: JWT
- **文件上传**: Multer（本地存储，可扩展 OSS）

---

## 快速启动

```bash
# 1. 进入后端目录
cd backend

# 2. 安装依赖
npm install

# 3. 初始化数据库
npm run db:push

# 4. 填充测试数据
npm run db:seed

# 5. 启动服务
npm run dev      # 开发模式（自动重启）
# 或
npm start        # 生产模式
```

服务默认运行在 `http://localhost:3000`

---

## 前端对接

修改 `云舍村/utils/config.js`：

```js
const USE_LOCAL_BACKEND = true;   // 改为 true
const LOCAL_BACKEND_URL = "http://localhost:3000/api";  // 本地地址
```

---

## 管理员登录

```
POST http://localhost:3000/api/admin/login

Body: { "username": "admin", "password": "admin123456" }
```

响应会返回 `token`，后续管理接口请求头需携带：
```
Authorization: Bearer <token>
```

---

## API 结构

### 小程序端（前端直接调用，路径与原生 API 相同）

| 功能 | 路径 |
|------|------|
| 微信登录 | `GET /api/member/memberLoginOpen.json` |
| 发送验证码 | `GET /api/member/createIdentifyCode.json` |
| 手机登录 | `POST /api/member/memberLoginByMobileCode.json` |
| 会员信息 | `GET /api/member/memberInfo.json` |
| 旅游产品列表 | `POST /api/shopapi/sz/travelProductList` |
| 保存旅游订单 | `POST /api/travel/saveOrder` |
| 酒店列表 | `POST /api/hotel/hotelListAllNew.json` |
| 酒店预订 | `POST /api/hotel/product/makeOrder.json` |
| 商城商品 | `GET /api/shop/listGoods.json` |
| 提交商城订单 | `POST /api/shop/submitOrder.json` |
| 活动列表 | `GET /api/singleActivity/list` |
| 支付 | `POST /api/travel/pay.json` |
| 优惠券领取 | `GET /api/coupon/receiveGiftCoupon.json` |

### 管理端 API（需要管理员 Token）

#### 媒体素材管理（重点）

| 操作 | 方法 | 路径 |
|------|------|------|
| 上传单张图片 | POST | `/api/admin/media/upload/image` |
| 上传多张图片 | POST | `/api/admin/media/upload/images` |
| 上传视频文件 | POST | `/api/admin/media/upload/video` |
| 保存视频外链 | POST | `/api/admin/media/save/video-link` |
| 更新资源封面图 | POST | `/api/admin/media/update/image` |
| 更新资源视频 | POST | `/api/admin/media/update/video` |
| 更新视频外链 | POST | `/api/admin/media/update/video-link` |
| 移除资源图片 | POST | `/api/admin/media/remove/image` |
| 媒体文件列表 | GET | `/api/admin/media` |
| 删除媒体文件 | DELETE | `/api/admin/media/:id` |

**更新资源图片示例（multipart/form-data）：**
```
POST /api/admin/media/update/image
form-data:
  file: [图片文件]
  resourceType: travel   (travel / hotel / shop / activity)
  resourceId: 1
  imageType: cover       (cover = 封面, additional = 追加到图片列表)
```

**更新视频外链示例：**
```
POST /api/admin/media/update/video-link
{
  "resourceType": "travel",
  "resourceId": 1,
  "videoLinkType": "link",
  "videoUrl": "https://cdn.example.com/video.mp4",
  "thumbnailUrl": "https://cdn.example.com/thumb.jpg"
}
```

#### 旅游产品管理

```
GET    /api/admin/travel/products        列表
POST   /api/admin/travel/products        创建
PUT    /api/admin/travel/products/:id    更新
DELETE /api/admin/travel/products/:id    删除
PUT    /api/admin/travel/products/:id/media  更新媒体（图片/视频）
GET    /api/admin/travel/orders          订单列表
PUT    /api/admin/travel/orders/status   更新订单状态
```

#### 酒店管理

```
GET    /api/admin/hotels                 酒店列表
POST   /api/admin/hotels                 创建酒店
PUT    /api/admin/hotels/:id             更新酒店
DELETE /api/admin/hotels/:id             删除酒店
PUT    /api/admin/hotels/:id/media       更新酒店媒体
POST   /api/admin/hotels/rooms           创建房型
PUT    /api/admin/hotels/rooms/:id       更新房型
DELETE /api/admin/hotels/rooms/:id       删除房型
GET    /api/admin/hotels/orders          预订订单
```

#### 商城管理

```
GET    /api/admin/shop/products   商品列表
POST   /api/admin/shop/products   创建商品
PUT    /api/admin/shop/products/:id
DELETE /api/admin/shop/products/:id
GET    /api/admin/shop/orders     订单列表
PUT    /api/admin/shop/orders/status
```

#### 活动管理

```
GET    /api/admin/activities
POST   /api/admin/activities
PUT    /api/admin/activities/:id
DELETE /api/admin/activities/:id
PUT    /api/admin/activities/:id/media
GET    /api/admin/activities/orders
```

#### Banner / 内容页管理

```
GET    /api/admin/banners
POST   /api/admin/banners
PUT    /api/admin/banners/:id
DELETE /api/admin/banners/:id

GET    /api/admin/pages
POST   /api/admin/pages
PUT    /api/admin/pages/:id
DELETE /api/admin/pages/:id
```

#### 优惠券管理

```
GET    /api/admin/coupons
POST   /api/admin/coupons       创建优惠券
PUT    /api/admin/coupons/:id
DELETE /api/admin/coupons/:id
POST   /api/admin/coupons/issue  向会员发放优惠券
```

#### 其他

```
GET    /api/admin/members        会员列表
GET    /api/admin/members/:id    会员详情
PUT    /api/admin/members/:id    更新会员
GET    /api/admin/payments       支付记录
POST   /api/admin/payments/refund 退款
GET    /api/admin/dashboard      统计数据
GET    /api/admin/services       酒店服务管理
GET    /api/admin/services/orders 服务订单
GET    /api/admin/sys-config     系统配置
POST   /api/admin/sys-config     设置系统配置
```

---

## 统一响应格式

```json
{
  "code": 0,      // 0 = 成功，非 0 = 失败
  "msg": "success",
  "data": {}      // 响应数据
}
```

分页响应：
```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "list": [],
    "total": 100,
    "page": 1,
    "pageSize": 20,
    "totalPages": 5
  }
}
```

---

## 支付说明

当前支付已切换为**微信支付真实接口**，调用支付接口后返回微信 JSAPI 支付参数。

```
本地测试真实支付时，支付发起可以在开发者工具中验证；微信支付回调和退款回调需要公网 HTTPS 地址或内网穿透地址。
```

订单状态以微信支付回调或主动查询结果为准。

正式上线需在 `.env` 中配置微信支付或支付宝的正式参数。

---

## 上传文件

上传的文件保存在 `uploads/` 目录：
- 图片：`uploads/images/`
- 视频：`uploads/videos/`

静态文件访问地址：`http://localhost:3000/uploads/images/filename.jpg`

`.env` 中 `UPLOAD_BASE_URL` 控制文件访问域名前缀。

---

## 数据库管理

```bash
npm run db:studio    # 可视化数据库管理工具
npm run db:push      # 同步 schema 到数据库（无迁移记录）
npm run db:migrate   # 生成迁移文件（生产推荐）
npm run db:seed      # 重新填充初始数据
```
