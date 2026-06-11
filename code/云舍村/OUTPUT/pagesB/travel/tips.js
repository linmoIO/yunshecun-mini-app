! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    r = require("../../utils/api.js"),
    o = require("../../utils/wxuser.js"),
    t = require("../../base/jAlert/jAlert.js"),
    a = require("../../base/channel.js"),
    l = require("../../utils/utils.js"),
    u = require("../../utils/umengAdaptor.js"),
    n = require("../../assets/index.js"),
    i = e.defineComponent({
      __name: "tips",
      setup(i) {
        let d = o.getStorage("config"),
          s = o.getStorage("user"),
          v = e.ref(a.defaultOtaChannel);
        const p = e.ref(!1),
          c = e.ref(""),
          m = e.ref(""),
          f = e.ref(""),
          h = e.ref(""),
          C = e.ref(""),
          g = e.ref(""),
          j = e.ref(),
          b = e.ref(0),
          y = e.computed(() => new Array(b.value).fill(".").join(""));

        function G() {
          var r, o;
          null == (o = null == (r = e.index) ? void 0 : r.hideNavigationBarLoading) || o.call(r), j.value && (clearInterval(j.value), j.value = void 0)
        }
        const O = () => {
          r.api.orderDetail({
            memberNo: s.memberId,
            memberId: s.memberId,
            hotelGroupCode: d.hotelGroupCode,
            hotelCode: d.hotelCode,
            travelOrderNo: c.value,
            mobile: s.mobile
          }).then(e => {
            var o;
            1 == e.result && (g.value = e.retVal.reserveOrder.sta, f.value = e.retVal.reserveOrder.itineraryCode, m.value = e.retVal.reserveOrder.productCode, h.value = e.retVal.reserveOrder.orderType, "Custom" == h.value ? (o = {
              appid: d.appid,
              codes: ["customizedRemind"].join(","),
              componentAppid: d.componentAppid,
              hotelCode: d.hotelCode ? d.hotelCode : 0,
              hotelGroupCode: d.hotelGroupCode,
              clientType: "wechat_mini"
            }, r.api.getMultiSysOptionCommon(o).then(e => {
              1 == e.result && e.retVal.forEach((function(e) {
                "customizedRemind" == e.code && e.value && (C.value = e.value)
              }))
            })) : r.api.interfaceTransfer({
              query: {
                unitCode: d.hotelGroupCode,
                travelType: m.value,
                ota: "DIRECT",
                otaChannel: v.value
              },
              config: {
                interfaceType: "POST",
                interfaceModule: "GC_PRODUCT_JOURNEY",
                interfaceMethod: "/api/travelGroup/findTravelProductForWechatDetail",
                interfaceFrom: "GC",
                hotelGroupCode: d.hotelGroupCode
              }
            }).then(e => {
              1 == e.result && 0 == e.retVal.result && e.retVal.retVal.forEach(e => {
                e.itineraryDtos.forEach(e => {
                  e.itineraryCode == f.value && (C.value = e.warmPrompt)
                })
              })
            }))
          })
        };
        return e.onLoad(e => {
          c.value = e.orderNo, (() => {
            if (p.value) return;
            p.value = !0;
            const e = `/pagesB/other/pay?orderNo=${c.value}&productType=${h.value}`,
              o = "/pagesB/travel/contractConfirm?orderNo=" + c.value;
            let a = e;
            "R" != g.value && (a = o);
            let n = a;
            const i = u.adaptor.getUtmParam("ALL") || {};
            r.api.invokeExtSign({
              hotelCode: d.hotelCode,
              hotelGroupCode: d.hotelGroupCode,
              memberNo: s.memberId,
              travelOrderNo: c.value,
              returnUrl: n,
              ...i
            }).then(e => {
              p.value = !1, 1 == e.result ? setTimeout(() => {
                G(), l.goPage(e.msg, !0)
              }, 1e3) : t.jAlert3(e.msg)
            })
          })()
        }), e.onMounted(() => {
          var r, o;
          null == (o = null == (r = e.index) ? void 0 : r.showNavigationBarLoading) || o.call(r), j.value = setInterval(() => {
            b.value++, b.value > 3 && (b.value = 0)
          }, 500), O()
        }), e.onUnmounted(() => {
          G()
        }), (r, o) => ({
          a: e.unref(n.assets).contractConfirm,
          b: e.t(y.value)
        })
      }
    }),
    d = e._export_sfc(i, [
      ["__scopeId", "data-v-6c802b2f"]
    ]);
  wx.createPage(d)
}();