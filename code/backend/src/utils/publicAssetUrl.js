'use strict';

const legacyUploadPrefix = 'http://localhost:3000/uploads/';

const normalizeString = (value, publicBaseUrl) => value.replaceAll(
  legacyUploadPrefix,
  `${publicBaseUrl}/uploads/`,
);

const normalizePublicAssetUrls = (value, publicBaseUrl) => {
  if (typeof value === 'string') return normalizeString(value, publicBaseUrl);
  if (Array.isArray(value)) return value.map((item) => normalizePublicAssetUrls(item, publicBaseUrl));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [
      key,
      normalizePublicAssetUrls(item, publicBaseUrl),
    ]));
  }
  return value;
};

module.exports = { normalizePublicAssetUrls };
