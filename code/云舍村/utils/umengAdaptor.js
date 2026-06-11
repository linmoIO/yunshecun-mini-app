! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    t = require("../base/aplusPageConfig.js");
  let u = {};

  function n() {
    const t = "object" == typeof e.wx$1 && e.wx$1 ? e.wx$1 : {};
    return Array.isArray(t.aplus_queue) || (Array.isArray(globalThis.aplus_queue) ? t.aplus_queue = globalThis.aplus_queue : t.aplus_queue = []), globalThis.aplus_queue || (globalThis.aplus_queue = t.aplus_queue), t.aplus && "function" == typeof t.aplus.getMetaInfo || (t.aplus = {
      getMetaInfo() {
        return {}
      }
    }), u = t, t
  }

  function r(e) {
    try {
      const t = n();
      t.aplus_queue.push(e)
    } catch (e) {
      console.warn("[utils/aplusAdaptor] enqueue failed:", e)
    }
  }
  n();
  const s = new Proxy({}, {
      get: (e, t) => n()[t],
      set: (e, t, s) => (n()[t] = s, !0)
    }),
    o = {
      sendPV: function(e) {
        console.log("[utils/aplusAdaptor] {sendPV}", e), r({
          action: "aplus.sendPV",
          arguments: [{
            is_auto: !1
          }, {
            ...e
          }]
        })
      },
      sendEvent: function(e, t, u = "CLK", o = "POST") {
        console.log("[utils/aplusAdaptor] {sendEvent}", e, t, u), r({
          action: "aplus.record",
          arguments: [e, u, t, o]
        })
      },
      registerGlobalProperties: function(e) {
        console.log("[utils/aplusAdaptor] {registerGlobalProperties}", e), r({
          action: "aplus.setMetaInfo",
          arguments: ["globalproperty", {
            ...e
          }]
        })
      },
      updatePageProperties: function(...e) {
        console.log("[utils/aplusAdaptor] {updatePageProperties}", ...e), r({
          action: "aplus.updatePageProperties",
          arguments: [...e]
        })
      },
      appendGlobalProperties: function(...e) {
        console.log("[utils/aplusAdaptor] {appendGlobalProperties}", ...e), r({
          action: "aplus.appendMetaInfo",
          arguments: ["globalproperty", Object.assign({}, ...e)]
        })
      },
      getGlobalProperties: function() {
        return n().aplus.getMetaInfo("globalproperty") || {}
      },
      getUtmParam(e) {
        const t = {
            utm_campaign: 1,
            utm_source: 2,
            utm_medium: 3,
            utm_content: 4,
            utm_term: 5
          },
          u = n().aplus.getMetaInfo("globalproperty") || {};
        return "ALL" === e ? Object.keys(t).reduce((e, s) => (e[s] = u["utm_" + t[s]] || "", e), {}) : u[e in t ? "utm_" + t[e] : e] || ""
      },
      clearGlobalProperties: function() {
        r({
          action: "aplus.setMetaInfo",
          arguments: ["globalproperty", {}]
        })
      },
      setUserId: function(e, t = "testOrganization") {
        r({
          action: "aplus.setMetaInfo",
          arguments: ["_user_id", e]
        })
      },
      setDeviceId: function(e) {
        console.log("[utils/aplusAdaptor] {setDeviceId}", e), r({
          action: "aplus.setMetaInfo",
          arguments: ["_anony_id", e]
        })
      }
    };
  Promise.resolve(t.refreshPageConfig(s)).catch(e => {
    console.warn("[utils/aplusAdaptor] refreshPageConfig failed:", e)
  }), exports.adaptor = o
}();
