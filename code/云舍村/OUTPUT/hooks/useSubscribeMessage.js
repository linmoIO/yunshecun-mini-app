! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    s = require("../utils/api.js"),
    r = require("../utils/qdTracker.js"),
    t = require("../utils/umengAdaptor.js"),
    c = require("../utils/wxuser.js").getStorage("config"),
    u = e.ref({});
  exports.useSubscribeMessage = function(a) {
    const n = e.ref([]);
    return e.watch(() => e.unref(a), r => {
      r && function() {
        const r = e.unref(a);
        if (!Array.isArray(r) || !r.length) return void(n.value = []);
        const t = [],
          o = [];
        r.forEach(e => {
          u.value[e] ? t.push(u.value[e]) : o.push(e)
        }), n.value = t, o.length > 0 && s.api.interfaceTransfer({
          query: {
            unitCode: c.hotelGroupCode,
            templateTypes: o
          },
          config: {
            interfaceType: "POST",
            interfaceModule: "GC_TRAVEL_ORDER",
            interfaceMethod: "/api/travelOrderDict/queryTemplateInfo",
            interfaceFrom: "GC",
            hotelGroupCode: c.hotelGroupCode
          }
        }).then(e => {
          var s;
          if (1 === e.result && (null == (s = e.retVal.retVal) ? void 0 : s.length) > 0) {
            const s = e.retVal.retVal;
            s.forEach(e => {
              const s = e.item;
              s && o.includes(s) && (u.value[s] = e)
            }), n.value = [...t, ...s]
          }
        }).catch(e => {
          console.error("{useSubscribeMessage} {initTmpl} 订阅消息API请求失败", e)
        })
      }()
    }, {
      immediate: !0
    }), {
      subscribeMessage: async function() {
        var s;
        try {
          return (null == (s = n.value) ? void 0 : s.length) ? new Promise(s => {
            e.index.requestSubscribeMessage({
              tmplIds: n.value.map(e => e.setValue),
              success: e => {
                try {
                  ! function(e) {
                    n.value.forEach(s => {
                      const c = e[s.setValue];
                      if (["accept", "reject"].includes(c)) {
                        const e = "accept" === c ? "订阅" : "拒绝";
                        t.adaptor.sendEvent("click_subscription_message_control", {
                          template_id: s.setValue,
                          result: e
                        }), r.qdTracker.track("subscrip_msg_click", {
                          template_id: s.setValue,
                          template_name: s.descript,
                          template_result: e
                        })
                      }
                    })
                  }(e)
                } catch (e) {
                  console.warn("{useSubscribeMessage} 埋点上报失败", e)
                }
                s({
                  success: !0,
                  completed: !0
                })
              },
              fail: e => {
                console.warn("{useSubscribeMessage} 订阅消息失败", e), s({
                  success: !1,
                  completed: !0
                })
              }
            })
          }) : (console.warn("{useSubscribeMessage} 没有模板"), {
            success: !1,
            completed: !0
          })
        } catch (e) {
          return console.error("{useSubscribeMessage} 订阅消息执行异常", e), {
            success: !1,
            completed: !0
          }
        }
      }
    }
  }
}();