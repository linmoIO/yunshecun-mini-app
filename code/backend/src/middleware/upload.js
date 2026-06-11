'use strict';

const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const config = require('../config');

const storage = (subDir) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../../uploads', subDir));
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${uuidv4()}${ext}`);
    },
  });

const imageFilter = (req, file, cb) => {
  if (config.upload.allowedImageTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('只允许上传图片文件 (JPEG/PNG/GIF/WEBP)'), false);
  }
};

const videoFilter = (req, file, cb) => {
  if (config.upload.allowedVideoTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('只允许上传视频文件 (MP4/MOV/AVI/WMV)'), false);
  }
};

const anyFilter = (req, file, cb) => cb(null, true);

const uploadImage = multer({
  storage: storage('images'),
  limits: { fileSize: config.upload.maxImageSize },
});

const uploadVideo = multer({
  storage: storage('videos'),
  fileFilter: videoFilter,
  limits: { fileSize: config.upload.maxVideoSize },
});

const uploadAny = multer({
  storage: storage('images'),
  fileFilter: anyFilter,
  limits: { fileSize: config.upload.maxImageSize },
});

const getFileUrl = (filename, type = 'images') => {
  return `${config.upload.baseUrl}/${type}/${filename}`;
};

module.exports = { uploadImage, uploadVideo, uploadAny, getFileUrl };
