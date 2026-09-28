'use strict';

// Express 4 不会捕获 async 路由处理函数返回的 Promise 拒绝，异常会变成
// unhandledRejection，在 Node 15+ 上直接导致整个进程退出（线上表现为全站 502）。
// 这里在 Layer 层把 Promise 拒绝转交给 next(err)，由 errorHandler 统一返回 JSON。
const Layer = require('express/lib/router/layer');

Layer.prototype.handle_request = function handle(req, res, next) {
  const fn = this.handle;
  if (fn.length > 3) return next();
  try {
    const ret = fn(req, res, next);
    if (ret && typeof ret.catch === 'function') ret.catch(next);
  } catch (err) {
    next(err);
  }
};
