'use strict';

const router = require('express').Router();
const ctrl = require('../controllers/auth.controller');
const { authMiddleware } = require('../middleware/auth');

// 微信登录 (小程序端)
router.post('/microSoftWare/getOpenidSessionKeyV2.json', ctrl.wechatLogin);
router.get('/microSoftWare/getOpenidSessionKeyV2.json', ctrl.wechatLogin);
// memberLoginOpen.json: refreshMemberInfo 用 openid/memberId 刷新（不带 code）
// 必须返回 result:1, retVal:{memberId,memberToken,...} 否则 refreshMemberInfo 会清空 user 存储
router.get('/member/memberLoginOpen.json', ctrl.memberLoginOpen);

// 生成图形验证码（返回 SVG 图片和验证码 ID）
router.get('/member/getCaptcha', ctrl.generateCaptcha);
router.post('/member/getCaptcha', ctrl.generateCaptcha);

// 发送验证码（需先通过图形验证码）
router.get('/member/createIdentifyCode.json', ctrl.sendVerifyCode);
router.post('/member/createIdentifyCode.json', ctrl.sendVerifyCode);
router.get('/member/verifyIdentifyCode.json', ctrl.verifyIdentifyCode);
router.post('/member/verifyIdentifyCode.json', ctrl.verifyIdentifyCode);

// 验证码登录
router.post('/member/memberLoginByMobileCode.json', ctrl.loginByMobileCode);
router.get('/member/memberLoginByMobileCode.json', ctrl.loginByMobileCode);
router.get('/member/memberLoginByMobileAndOpenId.json', ctrl.loginByMobileCode);

// 快速注册
router.post('/member/fastRegister.json', ctrl.loginByMobileCode);

// 一键登录 (auth-center) - memberLogin.js 使用
router.post('/auth-center/api/login/authorization', ctrl.loginByAuthorization);
router.post('/auth-center/api/login/verification/code', ctrl.loginByVerificationCode);

// Token 刷新 (auth-center)
router.post('/auth/refresh/token', ctrl.refreshToken);
router.get('/auth/refresh/token', ctrl.refreshToken);
router.post('/auth-center/api/auth/refresh/token', ctrl.refreshToken);
router.get('/auth-center/api/auth/refresh/token', ctrl.refreshToken);

// 退出登录
router.post('/member/logout', authMiddleware, ctrl.logout);

// 管理员登录（POST 处理；GET 重定向到后台首页）
router.post('/admin/login', ctrl.adminLogin);
router.get('/admin/login', (req, res) => res.redirect('/'));

// 员工登录（POST 处理）
router.post('/admin/staff/login', ctrl.staffLogin);
// 浏览器直接打开此 URL 时，友好重定向到管理后台登录页
router.get('/admin/staff/login', (req, res) => res.redirect('/'));

// 绑定手机号（需已登录）
router.post('/member/bind-phone', authMiddleware, ctrl.bindPhone);

module.exports = router;
