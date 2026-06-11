! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = require("../../utils/api.js"),
    t = require("../../utils/wxuser.js"),
    r = require("../../utils/utils.js"),
    a = require("../../base/jAlert/jAlert.js");
  Math || (n + u)();
  const n = () => "../../components/coustomHead.js",
    u = () => "../components/ExchangeListBox.js",
    l = e.defineComponent({
      __name: "exchangeList",
      setup(n) {
        let u = t.getStorage("config"),
          l = e.ref(""),
          i = e.ref([]),
          s = e.ref([]),
          c = e.ref("");
        const d = e => {
            let o = e.couponNo || l.value;
            r.goPage("/pagesB/travel/travelDetail?travelType=" + e.travelType + "&couponNo=" + o)
          },
          p = () => {
            o.api.interfaceTransfer({
              query: {
                hotelGroupCode: u.hotelGroupCode,
                couponNo: l.value,
                channel: "WECHAT"
              },
              config: {
                interfaceType: "POST",
                interfaceModule: "",
                interfaceMethod: "/api/coupon/listCouponCodeUseConfigProductByCouponNo",
                interfaceFrom: "coupon",
                hotelGroupCode: u.hotelGroupCode
              }
            }).then(e => {
              1 == e.result && 0 == e.retVal.result && (i.value = e.retVal.retVal, h())
            })
          },
          h = () => {
            s.value = [];
            let t = [],
              r = [],
              a = [],
              n = [];
            var c = {
              unitCode: u.hotelGroupCode,
              hotelGroupCode: u.hotelGroupCode
            };
            let d = !1;
            i.value.forEach(e => {
              "TRAVEL" === e.orderType && (d = !0), "TRAVEL" === e.orderType && ("4" == e.type && t.push(e.productCode), "3" == e.type && a.push(e.productCode), "2" == e.type && "Custom" != e.productPrimaryClassification && n.push(e.productPrimaryClassification), "1" == e.type && r.push(e.productCode))
            }), a.length > 0 && (c.itineraryCodes = a), r.length > 0 && (c.travelTypes = r), n.length > 0 && (c.categorySubs = n), t.length > 0 && (c.travelGroupCodes = t), d ? o.api.interfaceTransfer({
              query: c,
              config: {
                interfaceType: "POST",
                interfaceModule: "GC_PRODUCT_JOURNEY",
                interfaceMethod: "/api/travelGroup/listTravelProductForWechatTdqV2",
                interfaceFrom: "GC",
                hotelGroupCode: u.hotelGroupCode
              }
            }).then(o => {
              const {
                result: t,
                retVal: r
              } = o;
              1 == t && 0 == r.result && (r.retVal && r.retVal.length ? (e.index.hideLoading(), r.retVal.forEach(e => {
                e.couponNo = l.value, s.value.push(e)
              })) : v())
            }) : v()
          },
          f = e.ref(!1),
          g = e.ref();

        function v() {
          g.value = setTimeout(() => {
            console.log("<ExchangeList> {goConsultationForm}"), e.index.redirectTo({
              url: "/pagesE/consultationForm/index",
              success() {
                e.index.hideLoading(), f.value = !0, clearTimeout(g.value)
              }
            }), v()
          }, 300)
        }
        return e.onLoad(e => {
          l.value = e.couponNo, e.encrypted_codes && (c.value = e.encrypted_codes)
        }), e.onUnmounted(() => {
          g.value && clearTimeout(g.value)
        }), e.onMounted(() => {
          c.value ? (e.index.showLoading({
            title: "加载中..."
          }), o.api.getCodeInfo({
            appid: u.appid,
            encrypted_code: c.value
          }).then(o => {
            1 == o.result ? (l.value = o.retVal.code, p()) : (e.index.hideLoading(), a.jAlert3(o.msg))
          })) : l.value ? (e.index.showLoading({
            title: "加载中..."
          }), p()) : s.value = t.getStorage("productDtoList")
        }), (o, t) => ({
          a: e.p({
            title: "选择可兑产品",
            nativeMode: !0
          }),
          b: e.o(d),
          c: e.p({
            list: e.unref(s)
          })
        })
      }
    }),
    i = e._export_sfc(l, [
      ["__scopeId", "data-v-b849307b"]
    ]);
  wx.createPage(i)
}();