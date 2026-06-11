'use strict';

const router = require('express').Router();
const ctrl = require('../controllers/media.controller');
const { adminAuthMiddleware } = require('../middleware/auth');
const { uploadImage, uploadVideo, uploadAny } = require('../middleware/upload');

// 管理端 - 媒体上传（需要管理员登录）
router.post('/admin/media/upload/image', adminAuthMiddleware, uploadImage.single('file'), ctrl.uploadImage);
router.post('/admin/media/upload/images', adminAuthMiddleware, uploadImage.array('files', 20), ctrl.uploadImages);
router.post('/admin/media/upload/video', adminAuthMiddleware, uploadVideo.single('file'), ctrl.uploadVideo);
router.post('/admin/media/save/video-link', adminAuthMiddleware, ctrl.saveVideoLink);

// 更新资源媒体（图片/视频）
router.post('/admin/media/update/image', adminAuthMiddleware, uploadImage.single('file'), ctrl.updateResourceImage);
router.post('/admin/media/update/video', adminAuthMiddleware, uploadVideo.single('file'), ctrl.updateResourceVideo);
router.post('/admin/media/update/video-link', adminAuthMiddleware, ctrl.updateResourceVideo);
router.post('/admin/media/remove/image', adminAuthMiddleware, ctrl.adminRemoveResourceImage);

// 媒体文件管理
router.get('/admin/media', adminAuthMiddleware, ctrl.adminListMedia);
router.delete('/admin/media/:id', adminAuthMiddleware, ctrl.adminDeleteMedia);

module.exports = router;
