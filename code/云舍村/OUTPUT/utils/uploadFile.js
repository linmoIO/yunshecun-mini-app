! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    n = require("./wxuser.js");
  exports.uploadFile = function(o) {
    let t = Object.assign({
        env: "development",
        fileType: "IMAGE"
      }, o),
      i = n.getStorage("config");
    return !i.env || ["test"].includes(i.env) ? t.env = "development" : t.env = "production", console.log("图片上传参数:", t), new Promise((n, o) => {
      new e._i(t).upload().then(e => {
        n(e)
      }).catch(e => {
        o(e)
      })
    })
  }
}();