'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config');
const { error } = require('../utils/response');

const authMiddleware = async (req, res, next) => {
  const token =
    req.headers['membertoken'] ||
    req.headers['authorization']?.replace('Bearer ', '') ||
    req.query.memberToken ||
    req.body?.memberToken;

  if (!token) {
    return error(res, '请先登录', 401, 401);
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    req.member = decoded;
    next();
  } catch (err) {
    return error(res, '登录已过期，请重新登录', 401, 401);
  }
};

const adminAuthMiddleware = (req, res, next) => {
  const token =
    req.headers['authorization']?.replace('Bearer ', '') ||
    req.headers['x-admin-token'];

  if (!token) {
    return error(res, '未授权访问', 401, 401);
  }

  try {
    const decoded = jwt.verify(token, config.adminJwt.secret);
    req.admin = decoded;
    next();
  } catch (err) {
    return error(res, '管理员登录已过期', 401, 401);
  }
};

const optionalAuth = async (req, res, next) => {
  const token =
    req.headers['membertoken'] ||
    req.headers['authorization']?.replace('Bearer ', '') ||
    req.query.memberToken ||
    req.body?.memberToken;

  if (token) {
    try {
      const decoded = jwt.verify(token, config.jwt.secret);
      req.member = decoded;
    } catch (_) {}
  }
  next();
};

module.exports = { authMiddleware, adminAuthMiddleware, optionalAuth };
