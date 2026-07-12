! function() {
  "use strict";
  const cfg = require("./config.js");

  exports.uploadFile = function(options) {
    options = options || {};
    const filePath = options.file && options.file.path || options.path || "";
    const base = (cfg.config.baseUrlmall || "http://localhost:3000/api").replace(/\/api\/?$/, "");
    return new Promise((resolve, reject) => {
      if (!filePath) return reject(new Error("缺少上传文件"));
      wx.uploadFile({
        url: `${base}/api/media/upload`,
        filePath,
        name: "file",
        formData: {
          type: options.fileType || "IMAGE",
          unitCode: options.unitCode || "",
          point: JSON.stringify(options.point || {})
        },
        success(res) {
          try {
            const data = JSON.parse(res.data || "{}");
            const url = data.data && (data.data.url || data.data.fileUrl) || data.url || "";
            resolve({ success: data.code === 0 || data.result === 1 || !!url, url, data });
          } catch (err) {
            reject(err);
          }
        },
        fail: reject
      });
    });
  };
}();
