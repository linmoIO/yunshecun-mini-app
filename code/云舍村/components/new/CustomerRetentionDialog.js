! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = require("../../utils/umengAdaptor.js"),
    t = require("../../utils/qdTracker.js"),
    a = require("../../utils/api.js"),
    r = require("../../utils/wxuser.js"),
    c = require("../../hooks/useAdReport.js"),
    u = require("../../utils/utils.js");
  Math || n();
  const n = () => "../centerDialog.js",
    l = e.defineComponent({
      __name: "CustomerRetentionDialog",
      props: {
        show: {
          type: Boolean,
          default: !1
        },
        trackingData: {
          default: () => ({})
        }
      },
      emits: ["cancel", "update:show"],
      setup(n, {
        emit: l
      }) {
        const i = n,
          s = l,
          d = c.useAdReport(),
          m = r.getStorage("config"),
          p = r.getStorage("user"),
          v = e.ref(),
          h = e.ref("400-0000-830"),
          _ = e.ref("解答咨询、预订、会员及订单相关问题");
        e.watchEffect(() => {
          var e, o;
          i.show ? (y(), null == (e = v.value) || e.showDialog(), t.qdTracker.track("user_recovery", g.value)) : null == (o = v.value) || o.hideDialog()
        });
        const g = e.computed(() => i.trackingData),
          w = () => {
            s("cancel"), s("update:show", !1), q("reject")
          },
          k = () => {
            s("update:show", !1), q("accept")
          },
          y = () => {
            var e = {
              appid: m.appid,
              codes: ["customerServiceInfo", "tripContactPhone"].join(","),
              componentAppid: m.componentAppid,
              hotelCode: m.hotelCode ? m.hotelCode : 0,
              hotelGroupCode: m.hotelGroupCode,
              clientType: "wechat_mini"
            };
            a.api.getMultiSysOptionCommon(e).then(e => {
              var o;
              1 == e.result && (null == (o = e.retVal) || o.forEach((function(e, o) {
                "customerServiceInfo" == e.code && e.value && (_.value = e.value), "tripContactPhone" == e.code && e.value && (h.value = e.value)
              }))), _.value || (_.value = "解答咨询、预订、会员及订单相关问题");
            }).catch(e => {
              console.log(e)
            })
          },
          x = () => {
            e.index.navigateTo({ url: "/pagesA/other/chat" }), b("online")
          },
          b = e => {
            const {
              commodity_id: o,
              commodity_name: a,
              room_type: r = "",
              room_product_name: c = ""
            } = g.value;
            d("CONSULT", {
              actionParam: {
                consult_type: "phone" === e ? "MAKE_PHONE_CALL" : "ONLINE_CONSULT"
              }
            }), t.qdTracker.track("consult_customer_service", {
              commodity_id: o,
              commodity_name: a,
              room_type: r,
              room_product_name: c,
              service_type: "phone" === e ? "电话客服" : "在线客服"
            })
          },
          q = e => {
            o.adaptor.sendEvent("customize_retention_window", {
              is_retention: "accept" === e ? 1 : 0
            }, "OTHER"), t.qdTracker.track("user_recovery_click", {
              ...g.value,
              button_name: "accept" === e ? "继续预定" : "确认离开"
            })
          };
        return (o, t) => e.e({
          a: !e.unref(u.isCmbchina)()
        }, e.unref(u.isCmbchina)() ? {} : {
          b: e.t(_.value),
          c: e.o(x)
        }, {
          d: e.t(h.value),
          e: e.o(o => {
            return t = h.value, e.index.makePhoneCall({
              phoneNumber: t
            }), void b("phone");
            var t
          }),
          f: e.o(w),
          g: e.o(k),
          h: e.sr(v, "ce9b9d0e-0", {
            k: "centerDialogRef"
          }),
          i: e.p({
            maxDialog: !0,
            noMaskEvent: !0
          })
        })
      }
    }),
    i = e._export_sfc(l, [
      ["__scopeId", "data-v-ce9b9d0e"]
    ]);
  wx.createComponent(i)
}();
