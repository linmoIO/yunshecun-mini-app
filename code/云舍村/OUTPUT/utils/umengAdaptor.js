! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    t = require("../base/aplusPageConfig.js");
  let u = {};
  u = e.wx$1;
  const s = new Proxy(u, {
      get: (e, t, s) => u[t]
    }),
    o = {
      sendPV: function(e) {
        console.log("[utils/aplusAdaptor] {sendPV}", e), s.aplus_queue.push({
          action: "aplus.sendPV",
          arguments: [{
            is_auto: !1
          }, {
            ...e
          }]
        })
      },
      sendEvent: function(e, t, u = "CLK", o = "POST") {
        console.log("[utils/aplusAdaptor] {sendEvent}", e, t, u), s.aplus_queue.push({
          action: "aplus.record",
          arguments: [e, u, t, o]
        })
      },
      registerGlobalProperties: function(e) {
        console.log("[utils/aplusAdaptor] {registerGlobalProperties}", e), s.aplus_queue.push({
          action: "aplus.setMetaInfo",
          arguments: ["globalproperty", {
            ...e
          }]
        })
      },
      updatePageProperties: function(...e) {
        console.log("[utils/aplusAdaptor] {updatePageProperties}", ...e), s.aplus_queue.push({
          action: "aplus.updatePageProperties",
          arguments: [...e]
        })
      },
      appendGlobalProperties: function(...e) {
        console.log("[utils/aplusAdaptor] {appendGlobalProperties}", ...e), s.aplus_queue.push({
          action: "aplus.appendMetaInfo",
          arguments: ["globalproperty", {
            ...e
          }]
        })
      },
      getGlobalProperties: function() {
        return s.aplus.getMetaInfo("globalproperty")
      },
      getUtmParam(e) {
        const t = {
            utm_campaign: 1,
            utm_source: 2,
            utm_medium: 3,
            utm_content: 4,
            utm_term: 5
          },
          u = s.aplus.getMetaInfo("globalproperty");
        return "ALL" === e ? Object.keys(t).reduce((e, s) => (e[s] = u["utm_" + t[s]] || "", e), {}) : u[e in t ? "utm_" + t[e] : e] || ""
      },
      clearGlobalProperties: function() {
        s.aplus_queue.push({
          action: "aplus.setMetaInfo",
          arguments: ["globalproperty", {}]
        })
      },
      setUserId: function(e, t = "testOrganization") {
        s.aplus_queue.push({
          action: "aplus.setMetaInfo",
          arguments: ["_user_id", e]
        })
      },
      setDeviceId: function(e) {
        console.log("[utils/aplusAdaptor] {setDeviceId}", e), s.aplus_queue.push({
          action: "aplus.setMetaInfo",
          arguments: ["_anony_id", e]
        })
      }
    };
  t.refreshPageConfig(s), exports.adaptor = o
}();