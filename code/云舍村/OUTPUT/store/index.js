! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    s = require("../utils/wxuser.js");
  require("./modules/micro.js");
  const o = e.defineStore("main", {
    state: () => ({
      user: {
        name: "123",
        ok: 1111
      },
      wxuser: {
        name: "231",
        ok: 2222
      },
      addressInfo: {},
      config: s.getStorage("config")
    }),
    getters: {},
    actions: {
      getEditAddress(e) {
        console.log(e), this.addressInfo = {
          ...e
        }, console.log(this.addressInfo)
      }
    }
  });
  exports.mainStore = o
}();