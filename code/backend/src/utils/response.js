'use strict';

const success = (res, data = null, msg = 'success') => {
  return res.json({ code: 0, msg, data });
};

const error = (res, msg = '操作失败', code = -1, statusCode = 200) => {
  return res.status(statusCode).json({ code, msg, data: null });
};

const paginate = (res, list, total, page, pageSize) => {
  return res.json({
    code: 0,
    msg: 'success',
    data: {
      list,
      total,
      page: Number(page),
      pageSize: Number(pageSize),
      totalPages: Math.ceil(total / pageSize),
    },
  });
};

module.exports = { success, error, paginate };
