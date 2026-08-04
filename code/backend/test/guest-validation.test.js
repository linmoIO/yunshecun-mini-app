'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { validateGuestInput } = require('../src/controllers/member.controller');
const { getPaymentFailureMessage } = require('../src/controllers/payment.controller');

const validIdCardGuest = {
  name: '张三',
  phone: '13800138000',
  idType: '身份证',
  idNumber: '11010519491231002X',
  birthday: '1949-12-31',
};

test('出行人手机号与证件号码必须通过服务端校验', () => {
  assert.equal(validateGuestInput(validIdCardGuest), '');
  assert.equal(validateGuestInput({ ...validIdCardGuest, name: '张' }), '');
  assert.equal(validateGuestInput({ ...validIdCardGuest, name: '' }), '请填写姓名');
  assert.equal(validateGuestInput({ ...validIdCardGuest, phone: '123' }), '手机号格式不正确');
  assert.equal(validateGuestInput({ ...validIdCardGuest, idNumber: '110105194912310021' }), '证件号码格式不正确');
  assert.equal(validateGuestInput({ ...validIdCardGuest, birthday: '2026/08/02' }), '出生日期格式不正确');
});

test('出行人必须填写完整且合法的证件信息', () => {
  assert.equal(validateGuestInput({ name: '李四', phone: '' }), '请填写完整证件信息');
  assert.equal(validateGuestInput({ name: '李四', idType: '身份证' }), '请填写完整证件信息');
  assert.equal(validateGuestInput({ name: '李四', idNumber: '11010519491231002X' }), '请填写完整证件信息');
});

test('支付底层异常不向小程序用户暴露证书路径或系统错误', () => {
  const internalError = new Error('读取微信支付私钥失败: C:\\Users\\dev\\apiclient_key.pem (ENOENT)');
  assert.equal(getPaymentFailureMessage(internalError), '微信支付暂时不可用，请稍后重试');
  assert.equal(getPaymentFailureMessage({ code: 'POINTS_INVALID', message: '积分不足' }), '积分不足');
});
