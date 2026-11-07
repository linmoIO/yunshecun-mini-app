'use strict';

const legacyUploadPrefix = 'http://localhost:3000/uploads/';

const normalizeString = (value, publicBaseUrl) => {
  const normalized = value.replaceAll(
  legacyUploadPrefix,
  `${publicBaseUrl}/uploads/`,
  );
  return normalized.startsWith('/images/') || normalized.startsWith('/uploads/')
    ? `${publicBaseUrl}${normalized}`
    : normalized;
};

const normalizePublicAssetUrls = (value, publicBaseUrl) => {
  if (typeof value === 'string') return normalizeString(value, publicBaseUrl);
  if (Array.isArray(value)) return value.map((item) => normalizePublicAssetUrls(item, publicBaseUrl));
  if (value && typeof value === 'object') {
    // 只递归普通对象；Date、Prisma Decimal、Buffer 等交给 JSON.stringify 原样序列化。
    // 否则 Object.entries(new Date()) 为空，所有直接返回的时间字段都会变成 {}（如订单“下单时间”为空）。
    const proto = Object.getPrototypeOf(value);
    if (proto !== Object.prototype && proto !== null) return value;
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [
      key,
      normalizePublicAssetUrls(item, publicBaseUrl),
    ]));
  }
  return value;
};

module.exports = { normalizePublicAssetUrls };
