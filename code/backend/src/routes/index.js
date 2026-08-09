'use strict';

const router = require('express').Router();

// 所有路由模块
const authRoutes = require('./auth.routes');
const memberRoutes = require('./member.routes');
const travelRoutes = require('./travel.routes');
const hotelRoutes = require('./hotel.routes');
const shopRoutes = require('./shop.routes');
const paymentRoutes = require('./payment.routes');
const activityRoutes = require('./activity.routes');
const serviceRoutes = require('./service.routes');
const contentRoutes = require('./content.routes');
const mediaRoutes = require('./media.routes');
const adminRoutes = require('./admin.routes');

// 挂载路由
// 小程序 API 路由（前端调用路径，挂载到根路由使 /api/* 正常工作）
// CMS 路由需先于 member.routes 的兼容 /cms/:key 路由注册，避免页面内容被错误解释为系统配置。
router.use('/', contentRoutes);
router.use('/', authRoutes);
router.use('/', memberRoutes);
router.use('/', travelRoutes);
router.use('/', hotelRoutes);
router.use('/', shopRoutes);
router.use('/', paymentRoutes);
router.use('/', activityRoutes);
router.use('/', serviceRoutes);
// 媒体上传路由
router.use('/', mediaRoutes);

// 客服聊天路由
router.use('/', require('./chat.routes'));

// 管理端路由 - 前缀 /admin
router.use('/admin', adminRoutes);

// 健康检查
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: '云舍村后端服务' });
});

module.exports = router;
