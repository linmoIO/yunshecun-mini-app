'use strict';

require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',

  jwt: {
    secret: process.env.JWT_SECRET || 'yunshecun_secret_2024',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },

  adminJwt: {
    secret: process.env.ADMIN_JWT_SECRET || 'yunshecun_admin_secret_2024',
    expiresIn: process.env.ADMIN_JWT_EXPIRES_IN || '24h',
  },

  wechat: {
    appId: process.env.WECHAT_APP_ID || 'wxf26084f7c2585736',
    appSecret: process.env.WECHAT_APP_SECRET || '',
  },

  wechatPay: {
    mchId: process.env.WECHAT_PAY_MCH_ID || '',
    apiKey: process.env.WECHAT_PAY_API_KEY || '',
    certPath: process.env.WECHAT_PAY_CERT_PATH || '',
    keyPath: process.env.WECHAT_PAY_KEY_PATH || '',
    notifyUrl: process.env.WECHAT_PAY_NOTIFY_URL || '',
  },

  alipay: {
    appId: process.env.ALIPAY_APP_ID || '',
    privateKey: process.env.ALIPAY_PRIVATE_KEY || '',
    publicKey: process.env.ALIPAY_PUBLIC_KEY || '',
    notifyUrl: process.env.ALIPAY_NOTIFY_URL || '',
  },

  oss: {
    region: process.env.OSS_REGION || 'oss-cn-guangzhou',
    accessKeyId: process.env.OSS_ACCESS_KEY_ID || '',
    accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET || '',
    bucket: process.env.OSS_BUCKET || 'yunshecun',
    endpoint: process.env.OSS_ENDPOINT || '',
  },

  upload: {
    baseUrl: process.env.UPLOAD_BASE_URL || 'http://localhost:3000/uploads',
    maxImageSize: 100 * 1024 * 1024, // 100MB
    maxVideoSize: 500 * 1024 * 1024, // 500MB
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    allowedVideoTypes: ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv'],
  },

  hotel: {
    groupCode: process.env.HOTEL_GROUP_CODE || 'SONGTSAM',
    groupId: parseInt(process.env.HOTEL_GROUP_ID) || 1,
  },

  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },

  admin: {
    defaultUsername: process.env.ADMIN_DEFAULT_USERNAME || 'admin',
    defaultPassword: process.env.ADMIN_DEFAULT_PASSWORD || 'admin123456',
  },
};
