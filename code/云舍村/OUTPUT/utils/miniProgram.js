! function() {
  "use strict";
  var i;
  const r = require("../common/vendor.js");

  function n(i) {
    r.wx$1.miniProgram.switchTab({
      url: i.url,
      fail: r => {
        a(i)
      }
    })
  }

  function a(i) {
    r.wx$1.miniProgram.navigateTo({
      url: i.url,
      fail: r => {
        n(i)
      }
    })
  }(null == (i = null == navigator ? void 0 : navigator.userAgent) ? void 0 : i.includes("xhsminiapp")) && (r.wx$1.miniProgram = {}, r.wx$1.miniProgram.getEnv = xhs.miniProgram.getEnv, r.wx$1.miniProgram.navigateTo = xhs.miniProgram.navigateTo, r.wx$1.miniProgram.redirectTo = xhs.miniProgram.redirectTo, r.wx$1.miniProgram.reLaunch = xhs.miniProgram.reLaunch, r.wx$1.miniProgram.switchTab = xhs.miniProgram.switchTab, r.wx$1.miniProgram.postMessage = xhs.miniProgram.postMessage, r.wx$1.miniProgram.navigateBack = xhs.miniProgram.navigateBack);
  const o = {
    isMiniProgram: async function() {
      var i;
      if (/MicroMessenger/i.test(null == navigator ? void 0 : navigator.userAgent) || (null == (i = null == navigator ? void 0 : navigator.userAgent) ? void 0 : i.includes("xhsminiapp"))) {
        let i = function() {
          return new Promise((i, n) => {
            r.wx$1.miniProgram.getEnv(r => {
              r.miniprogram ? i(!0) : i(!1)
            })
          })
        };
        return await i()
      }
      return !1
    },
    navigateTo: a,
    postMessage: function(i) {
      r.wx$1.miniProgram.postMessage({
        data: i
      })
    },
    postMessageV2: function(i) {
      r.wx$1.miniProgram.postMessage(i)
    },
    navigateBack: function(i = {}) {
      r.wx$1.miniProgram.navigateBack(i)
    },
    redirectTo: function(i) {
      r.wx$1.miniProgram.redirectTo({
        url: i.url,
        fail: r => {
          n(i)
        }
      })
    },
    switchTab: n,
    reLaunch: function(i) {
      r.wx$1.miniProgram.reLaunch({
        url: i.url,
        fail: r => {
          n(i)
        }
      })
    }
  };
  exports.miniProgram = o
}();