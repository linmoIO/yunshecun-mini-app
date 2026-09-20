'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const rateLimit = require('express-rate-limit');
const sharp = require('sharp');

const config = require('./config');
const routes = require('./routes');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const { normalizePublicAssetUrls } = require('./utils/publicAssetUrl');

const app = express();

// 安全 Headers（管理后台含内联脚本，放开 CSP 限制）
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      scriptSrcAttr: ["'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'blob:', '*'],
      connectSrc: ["'self'", 'http://localhost:*', 'https:'],
      fontSrc: ["'self'", 'data:'],
      objectSrc: ["'none'"],
    },
  },
}));

// 跨域
app.use(cors({
  origin: config.cors.origin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'membertoken', 'MemberToken', 'x-admin-token'],
  credentials: true,
}));

// 请求日志
if (config.env !== 'test') {
  app.use(morgan('dev'));
}

// 请求体解析
app.use(express.json({
  limit: '10mb',
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  },
}));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 兼容历史数据中绑定 localhost:3000 的上传地址，按当前公开入口返回。
app.use((_req, res, next) => {
  const originalJson = res.json.bind(res);
  res.json = (body) => originalJson(normalizePublicAssetUrls(body, config.publicBaseUrl));
  next();
});

// 小程序会给图片 URL 附加 imageMogr2/thumbnail/宽度 参数；本地上传文件不是 OSS，
// Express 静态文件服务会忽略该参数，导致首屏直接传输几十 MB 原图。按请求缩放后再返回，
// 不带该参数的下载保持原行为。
app.use('/uploads/images', async (req, res, next) => {
  const match = req.path.match(/^\/(.+)$/);
  const widthMatch = req.originalUrl.match(/[?&]imageMogr2\/thumbnail\/(\d+)x(?:&|$)/);
  if (!match || !widthMatch) return next();

  let relativePath;
  try {
    relativePath = decodeURIComponent(match[1]);
  } catch {
    return res.status(400).end();
  }
  const imageRoots = [
    path.resolve(path.join(__dirname, '../uploads/images')),
    path.resolve(path.join(__dirname, '../public/images')),
  ];
  const candidates = imageRoots.map((root) => path.resolve(path.join(root, relativePath)));
  if (candidates.some((candidate, index) => !candidate.startsWith(`${imageRoots[index]}${path.sep}`))) {
    return res.status(400).end();
  }
  const filePath = candidates.find((candidate) => fs.existsSync(candidate));
  if (!filePath) return next();

  try {
    const width = Math.max(1, Math.min(Number(widthMatch[1]), 2400));
    const image = sharp(filePath).resize({ width, withoutEnlargement: true });
    const extension = path.extname(filePath).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(extension)) return next();
    const output = extension === '.png'
      ? await image.png().toBuffer()
      : extension === '.webp'
        ? await image.webp({ quality: 82 }).toBuffer()
        : await image.jpeg({ quality: 82, progressive: true }).toBuffer();
    res.set('Cache-Control', 'public, max-age=2592000, immutable');
    res.type(extension === '.png' ? 'png' : extension === '.webp' ? 'webp' : 'jpg').send(output);
  } catch (err) {
    return next(err);
  }
});

// 上传文件以 UUID 命名，更新会使用新 URL，可安全使用长期浏览器缓存。
app.use('/uploads', express.static(path.join(__dirname, '../uploads'), {
  maxAge: '30d',
  immutable: true,
}));
// 云舍村随代码发布的本地化素材使用同一公开 URL 契约；上传卷中没有同名文件时回退到此目录。
app.use('/uploads/images', express.static(path.join(__dirname, '../public/images'), {
  maxAge: '30d',
  immutable: true,
}));

// 管理后台网页（访问 http://localhost:3000 即可打开）
app.use(express.static(path.join(__dirname, '../public')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

// 限流（API 接口）
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 500,
  message: { code: 429, msg: '请求过于频繁，请稍后再试', data: null },
});
app.use('/api', limiter);

// URL 规范化：前端 baseUrl=/api 拼接 /api/xxx 路径 → /api/api/xxx 双重前缀
// 统一去掉第一层 /api，让后续路由正常工作
app.use((req, res, next) => {
  if (req.url.startsWith('/api/api/') || req.url === '/api/api') {
    req.url = req.url.slice(4); // /api/api/xxx → /api/xxx
  } else if (req.url.startsWith('/guardian/api/api/') || req.url === '/guardian/api/api') {
    req.url = req.url.replace('/guardian/api/api', '/guardian/api'); // guardian 双前缀同理
  }
  next();
});

// 专项限流：短信验证码（防刷）— 每 IP 每分钟最多 3 次
const smsLimiter = rateLimit({ windowMs: 60000, max: 3, message: { code: 429, msg: '发送太频繁，请稍后再试', data: null } });
app.use('/api/member/createIdentifyCode.json', smsLimiter);

// 专项限流：登录接口 — 每 IP 每分钟最多 10 次
const loginLimiter = rateLimit({ windowMs: 60000, max: 10, message: { code: 429, msg: '登录请求太频繁，请稍后再试', data: null } });
app.use('/api/microSoftWare/getOpenidSessionKeyV2.json', loginLimiter);
app.use('/api/member/memberLoginByMobileCode.json', loginLimiter);
app.use('/api/admin/login', loginLimiter);
app.use('/api/admin/staff/login', loginLimiter);

// 路由前缀：前端调用 /api/* → 我们挂载在 /api 下
app.use('/api', routes);

// guardian 兼容（前端 appkey 模式下 URL 会加 /guardian 前缀）
app.use('/guardian/api', routes);
app.use('/guardian', routes);

// 404 处理
app.use(notFound);

// 全局错误处理
app.use(errorHandler);

module.exports = app;
