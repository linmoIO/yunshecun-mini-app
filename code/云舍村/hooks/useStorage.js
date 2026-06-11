! function() {
  "use strict";
  const r = require("../common/vendor.js"),
    e = require("../utils/wxuser.js"),
    t = {
      read: r => {
        try {
          return JSON.parse(r)
        } catch {
          return r
        }
      },
      write: r => "string" == typeof r ? r : JSON.stringify(r)
    };
  exports.useStorage = function(o, n, s = {}) {
    const {
      serializer: u = t,
      onError: a = (r => console.error("Storage error:", r))
    } = s, c = r.ref(n);
    return c.value = (() => {
      try {
        const r = e.getStorage(o);
        return null !== r && "" !== r ? u.read(r) : n
      } catch (r) {
        return a(r), n
      }
    })(), r.watch(c, (r, t) => {
      r !== t && (r => {
        try {
          null == r ? e.setStorage(o, "") : e.setStorage(o, u.write(r))
        } catch (r) {
          a(r)
        }
      })(r)
    }, {
      deep: !0,
      immediate: !0
    }), c
  }
}();