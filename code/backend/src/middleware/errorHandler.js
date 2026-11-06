'use strict';

const errorHandler = (err, req, res, next) => {
  console.error('[Error]', req.method, req.originalUrl, String(err.message || '').trim().split('\n')[0]);  // 不输出完整 stack，避免刷屏
  if (res.headersSent) return next(err);

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ code: -1, msg: '文件大小超出限制', data: null });
  }

  if (err.message?.includes('只允许上传')) {
    return res.status(400).json({ code: -1, msg: err.message, data: null });
  }

  const statusCode = err.statusCode || err.status || 500;
  // 5xx 不向用户暴露内部错误详情（如 Prisma 校验信息）
  const message = statusCode >= 500 ? '服务繁忙，请稍后重试' : (err.message || '请求失败');

  res.status(statusCode).json({ code: -1, msg: message, data: null });
};

const notFound = (req, res) => {
  res.status(404).json({ code: 404, msg: `接口 ${req.path} 不存在`, data: null });
};

module.exports = { errorHandler, notFound };
