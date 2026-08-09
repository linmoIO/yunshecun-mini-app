'use strict';

require('dotenv').config();

const port = process.env.PORT || 3000;
const publicBaseUrl = (process.env.PUBLIC_BASE_URL || `http://localhost:${port}`).replace(/\/$/, '');
const resolvePublicUrl = (value) => {
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;
  return `${publicBaseUrl}${value.startsWith('/') ? value : `/${value}`}`;
};

module.exports = {
  port,
  env: process.env.NODE_ENV || 'development',
  publicBaseUrl,

  jwt: {
    secret: process.env.JWT_SECRET || 'yunshecun_secret_2024',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },

  adminJwt: {
    secret: process.env.ADMIN_JWT_SECRET || 'yunshecun_admin_secret_2024',
    expiresIn: process.env.ADMIN_JWT_EXPIRES_IN || '24h',
  },

  wechat: {
    code2SessionUrl: process.env.WECHAT_CODE2SESSION_URL || 'https://api.weixin.qq.com/sns/jscode2session?appid={0}&secret={1}&js_code={2}&grant_type=authorization_code',
    appId: process.env.WECHAT_APP_ID || 'wxc8e2d82494b5b533',
    appSecret: process.env.WECHAT_APP_SECRET || '',
  },

  wechatPay: {
    mchId: process.env.WECHAT_PAY_MCH_ID || '',
    merchantSerialNumber: process.env.WECHAT_PAY_MERCHANT_SERIAL_NUMBER || '',
    privateKeyPath: process.env.WECHAT_PAY_PRIVATE_KEY_PATH || process.env.WECHAT_PAY_KEY_PATH || '',
    apiV3Key: process.env.WECHAT_PAY_API_V3_KEY || process.env.WECHAT_PAY_API_KEY || '',
    apiKey: process.env.WECHAT_PAY_API_KEY || process.env.WECHAT_PAY_API_V3_KEY || '',
    certPath: process.env.WECHAT_PAY_CERT_PATH || '',
    keyPath: process.env.WECHAT_PAY_KEY_PATH || '',
    notifyUrl: resolvePublicUrl(process.env.WECHAT_PAY_NOTIFY_URL || process.env.WECHAT_PAY_PAY_NOTIFY_URL || ''),
    payNotifyUrl: resolvePublicUrl(process.env.WECHAT_PAY_PAY_NOTIFY_URL || process.env.WECHAT_PAY_NOTIFY_URL || ''),
    payTicketNotifyUrl: resolvePublicUrl(process.env.WECHAT_PAY_TICKET_NOTIFY_URL || ''),
    refundNotifyUrl: resolvePublicUrl(process.env.WECHAT_PAY_REFUND_NOTIFY_URL || ''),
  },

  alipay: {
    appId: process.env.ALIPAY_APP_ID || '',
    privateKey: process.env.ALIPAY_PRIVATE_KEY || '',
    publicKey: process.env.ALIPAY_PUBLIC_KEY || '',
    notifyUrl: resolvePublicUrl(process.env.ALIPAY_NOTIFY_URL || ''),
  },

  oss: {
    region: process.env.OSS_REGION || 'oss-cn-guangzhou',
    accessKeyId: process.env.OSS_ACCESS_KEY_ID || '',
    accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET || '',
    bucket: process.env.OSS_BUCKET || 'yunshecun',
    endpoint: process.env.OSS_ENDPOINT || '',
  },

  upload: {
    baseUrl: process.env.UPLOAD_BASE_URL || '/uploads',
    maxImageSize: 100 * 1024 * 1024, // 100MB
    maxVideoSize: 500 * 1024 * 1024, // 500MB
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    allowedVideoTypes: ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv'],
  },

  hotel: {
    groupCode: process.env.HOTEL_GROUP_CODE || 'YUNSHECUN',
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
