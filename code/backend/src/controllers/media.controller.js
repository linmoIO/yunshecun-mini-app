'use strict';

const path = require('path');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const { success, error, paginate } = require('../utils/response');
const { getFileUrl } = require('../middleware/upload');
const config = require('../config');

const prisma = new PrismaClient();

// 上传单张图片
const uploadImage = async (req, res) => {
  if (!req.file) return error(res, '未接收到图片文件');

  const fileUrl = getFileUrl(req.file.filename, 'images');
  const category = req.body.category || 'general';

  const media = await prisma.mediaFile.create({
    data: {
      name: req.file.filename,
      originalName: req.file.originalname,
      type: 'image',
      mimeType: req.file.mimetype,
      url: fileUrl,
      size: req.file.size,
      category,
      uploadedBy: req.admin?.username || req.member?.phone || 'anonymous',
    },
  });

  return success(res, { url: fileUrl, mediaId: media.id, filename: req.file.filename });
};

// 上传多张图片
const uploadImages = async (req, res) => {
  if (!req.files?.length) return error(res, '未接收到图片文件');

  const category = req.body.category || 'general';
  const results = [];

  for (const file of req.files) {
    const fileUrl = getFileUrl(file.filename, 'images');
    const media = await prisma.mediaFile.create({
      data: {
        name: file.filename,
        originalName: file.originalname,
        type: 'image',
        mimeType: file.mimetype,
        url: fileUrl,
        size: file.size,
        category,
        uploadedBy: req.admin?.username || req.member?.phone || 'anonymous',
      },
    });
    results.push({ url: fileUrl, mediaId: media.id, filename: file.filename });
  }

  return success(res, { list: results });
};

// 上传视频（本地文件）
const uploadVideo = async (req, res) => {
  if (!req.file) return error(res, '未接收到视频文件');

  const fileUrl = getFileUrl(req.file.filename, 'videos');
  const category = req.body.category || 'general';
  const thumbnailUrl = req.body.thumbnailUrl || null;

  const media = await prisma.mediaFile.create({
    data: {
      name: req.file.filename,
      originalName: req.file.originalname,
      type: 'video',
      mimeType: req.file.mimetype,
      url: fileUrl,
      thumbnailUrl,
      size: req.file.size,
      category,
      uploadedBy: req.admin?.username || req.member?.phone || 'anonymous',
    },
  });

  return success(res, { url: fileUrl, mediaId: media.id, filename: req.file.filename, thumbnailUrl });
};

// 保存视频链接（外链或第三方CDN链接）
const saveVideoLink = async (req, res) => {
  const { videoUrl, thumbnailUrl, name, category, linkType = 'external' } = req.body;
  if (!videoUrl) return error(res, '请提供视频链接');

  const media = await prisma.mediaFile.create({
    data: {
      name: name || `video_link_${Date.now()}`,
      originalName: name || videoUrl,
      type: 'video',
      mimeType: 'video/external',
      url: videoUrl,
      thumbnailUrl,
      category: category || 'general',
      tags: JSON.stringify({ linkType }),
      uploadedBy: req.admin?.username || 'admin',
    },
  });

  return success(res, { url: videoUrl, thumbnailUrl, mediaId: media.id, linkType });
};

// 更新资源的图片（替换旧图片）
const updateResourceImage = async (req, res) => {
  const { resourceType, resourceId, imageType = 'cover' } = req.body;
  if (!req.file) return error(res, '未接收到图片');

  const fileUrl = getFileUrl(req.file.filename, 'images');
  const updateData = {};

  if (imageType === 'cover') {
    updateData.coverImage = fileUrl;
  } else if (imageType === 'additional') {
    // 追加到图片列表
    let existing;
    if (resourceType === 'travel') existing = await prisma.travelProduct.findUnique({ where: { id: Number(resourceId) } });
    else if (resourceType === 'hotel') existing = await prisma.hotel.findUnique({ where: { id: Number(resourceId) } });
    else if (resourceType === 'activity') existing = await prisma.activity.findUnique({ where: { id: Number(resourceId) } });

    const currentImages = tryParse(existing?.images, []);
    currentImages.push(fileUrl);
    updateData.images = JSON.stringify(currentImages);
  }

  await updateResource(resourceType, Number(resourceId), updateData);

  await prisma.mediaFile.create({
    data: {
      name: req.file.filename,
      originalName: req.file.originalname,
      type: 'image',
      mimeType: req.file.mimetype,
      url: fileUrl,
      size: req.file.size,
      category: resourceType,
      uploadedBy: req.admin?.username || 'admin',
    },
  });

  return success(res, { url: fileUrl }, '图片更新成功');
};

// 更新资源的视频
const updateResourceVideo = async (req, res) => {
  const { resourceType, resourceId, videoLinkType = 'upload', videoUrl: externalUrl, thumbnailUrl: externalThumb } = req.body;

  let videoUrl, thumbnailUrl;

  if (videoLinkType === 'upload' && req.file) {
    videoUrl = getFileUrl(req.file.filename, 'videos');
    thumbnailUrl = externalThumb || null;
  } else if (videoLinkType === 'link' && externalUrl) {
    videoUrl = externalUrl;
    thumbnailUrl = externalThumb || null;
  } else {
    return error(res, '请提供视频文件或视频链接');
  }

  const updateData = { videoUrl, videoThumb: thumbnailUrl, videoLinkType };
  await updateResource(resourceType, Number(resourceId), updateData);

  return success(res, { videoUrl, thumbnailUrl, videoLinkType }, '视频更新成功');
};

// 媒体文件列表（管理端）
const adminListMedia = async (req, res) => {
  const { pageNum = 1, pageSize = 20, type, category, keyword } = req.query;
  const where = {};
  if (type) where.type = type;
  if (category) where.category = category;
  if (keyword) where.OR = [{ name: { contains: keyword } }, { originalName: { contains: keyword } }];

  const [list, total] = await Promise.all([
    prisma.mediaFile.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (Number(pageNum) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    prisma.mediaFile.count({ where }),
  ]);
  return paginate(res, list, total, pageNum, pageSize);
};

// 删除媒体文件
const adminDeleteMedia = async (req, res) => {
  const { id } = req.params;
  const media = await prisma.mediaFile.findUnique({ where: { id: Number(id) } });
  if (!media) return error(res, '文件不存在');

  // 删除本地文件
  if (!media.url.startsWith('http')) {
    const filePath = path.join(__dirname, '../../uploads', media.type === 'video' ? 'videos' : 'images', media.name);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  await prisma.mediaFile.delete({ where: { id: Number(id) } });
  return success(res, null, '删除成功');
};

// 批量删除图片并从资源中移除
const adminRemoveResourceImage = async (req, res) => {
  const { resourceType, resourceId, imageUrl } = req.body;
  if (!resourceType || !resourceId || !imageUrl) return error(res, '参数不完整');

  let existing;
  if (resourceType === 'travel') existing = await prisma.travelProduct.findUnique({ where: { id: Number(resourceId) } });
  else if (resourceType === 'hotel') existing = await prisma.hotel.findUnique({ where: { id: Number(resourceId) } });
  else if (resourceType === 'activity') existing = await prisma.activity.findUnique({ where: { id: Number(resourceId) } });

  if (!existing) return error(res, '资源不存在');

  const images = tryParse(existing.images, []).filter(url => url !== imageUrl);
  await updateResource(resourceType, Number(resourceId), { images: JSON.stringify(images) });

  return success(res, { images }, '图片移除成功');
};

const updateResource = async (type, id, data) => {
  if (type === 'travel') return prisma.travelProduct.update({ where: { id }, data });
  if (type === 'hotel') return prisma.hotel.update({ where: { id }, data });
  if (type === 'shop') return prisma.shopProduct.update({ where: { id }, data });
  if (type === 'activity') return prisma.activity.update({ where: { id }, data });
  throw new Error(`未知资源类型: ${type}`);
};

const tryParse = (s, f) => { try { return s ? JSON.parse(s) : f; } catch { return f; } };

module.exports = {
  uploadImage, uploadImages, uploadVideo, saveVideoLink,
  updateResourceImage, updateResourceVideo,
  adminListMedia, adminDeleteMedia, adminRemoveResourceImage,
};
