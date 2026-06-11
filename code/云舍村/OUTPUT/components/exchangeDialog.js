! function() {
  "use strict";
  const o = require("../common/vendor.js"),
    e = require("../base/jAlert/jAlert.js"),
    t = require("../utils/api.js"),
    r = require("../utils/utils.js"),
    u = require("../utils/wxuser.js"),
    a = u.getStorage("config");
  u.getStorage("user");
  const n = o.defineComponent({
    name: "ExchangeDialog",
    components: {
      bottomDialog: () => "./bottomDialog.js"
    },
    props: {
      orderId: {
        type: String,
        default: () => ""
      }
    },
    setup(u) {
      const n = o.ref([]),
        c = o.ref({}),
        p = o.ref([]),
        s = o.ref([]),
        l = o.ref(),
        i = o.ref([]),
        d = o.ref({}),
        h = (o, e) => {
          i.value = [];
          const r = [],
            u = [],
            n = [],
            c = [],
            p = {
              unitCode: a.hotelGroupCode,
              hotelGroupCode: a.hotelGroupCode
            };
          o.forEach(o => {
            var e;
            const t = null == (e = o.type) ? void 0 : e.toString();
            "4" === t && r.push(o.productCode), "3" === t && n.push(o.productCode), "2" === t && "Custom" !== o.productPrimaryClassification && c.push(o.productPrimaryClassification), "1" === t && u.push(o.productCode)
          }), n.length > 0 && (p.itineraryCodes = n), u.length > 0 && (p.travelTypes = u), c.length > 0 && (p.categorySubs = c), r.length > 0 && (p.travelGroupCodes = r), t.api.interfaceTransfer({
            query: p,
            config: {
              interfaceType: "POST",
              interfaceModule: "GC_PRODUCT_JOURNEY",
              interfaceMethod: "/api/travelGroup/listTravelProductForWechatTdqV2",
              interfaceFrom: "GC",
              hotelGroupCode: a.hotelGroupCode
            }
          }).then(o => {
            if (1 === o.result && 0 === o.retVal.result && o.retVal.retVal) {
              const t = o.retVal.retVal;
              e.productNum = t.length, t.forEach(o => {
                o.couponNo = e.couponNo, i.value.push(o)
              })
            }
          })
        },
        g = () => {
          n.value = [], p.value = [], t.api.shopOrderDetail({
            equipment: a.equipment,
            hotelGroupCode: a.hotelGroupCode,
            hotelGroupId: a.hotelGroupId,
            id: u.orderId
          }).then(o => {
            1 === o.result && (c.value = o.retVal, p.value = c.value.listShopOrderItemVO[0].counponList, d.value = c.value.listShopOrderItemVO[0].shopGoods, p.value.length > 0 && p.value.forEach(o => {
              if ("I" === o.couponSta) {
                const e = [];
                o.couponCodeUseConfigProductDtoList.forEach(t => {
                  t.couponNo = o.couponNo, e.push(t)
                }), h(e, o)
              }
            }))
          })
        };
      return o.watch(() => u.orderId, () => {
        p.value = [], g()
      }, {
        immediate: !0
      }), o.onMounted(() => {}), {
        couponCodeUseConfigProductDtoList: n,
        getShopOrder: g,
        counponList: p,
        reserveOrder: c,
        travelProductList: h,
        travelList: s,
        exchangeDialog: l,
        showDialog: () => {
          l.value.showDialog()
        },
        productDtoList: i,
        choose: o => {
          p.value.forEach(o => {
            o.choosed = !1
          }), o.choosed = !0
        },
        goExchange: () => {
          let o = {};
          p.value.forEach(e => {
            e.choosed && (o = e)
          }), o.couponNo ? r.goPage("/pagesB/exchangeCoupon/exchangeList?couponNo=" + o.couponNo) : e.jAlert3("请选择兑换券")
        },
        showDetail: o => {
          r.goPage(`/pagesB/travel/travelDetail?travelType=${o.travelType}&couponNo=${o.couponNo}`)
        },
        shopGoods: d
      }
    }
  });
  Array || o.resolveComponent("bottom-dialog")();
  const c = o._export_sfc(n, [
    ["render", function(e, t, r, u, a, n) {
      return {
        a: o.f(e.counponList, (t, r, u) => o.e(e.counponList.length > 1 ? {
          a: o.t(r + 1)
        } : {}, {
          b: o.t(t.couponNo),
          c: "I" === t.couponSta
        }, "I" === t.couponSta ? o.e({
          d: t.choosed
        }, t.choosed ? {
          e: o.o(o => e.choose(t), r)
        } : {
          f: o.o(o => e.choose(t), r)
        }) : ("O" === t.couponSta || t.couponSta, {}), {
          g: "O" === t.couponSta || "U" === t.couponSta,
          h: "I" !== t.couponSta ? 1 : "",
          i: t.productNum > 0
        }, t.productNum > 0 ? {
          j: o.f(e.productDtoList, (r, u, a) => o.e({
            a: t.couponNo === r.couponNo
          }, t.couponNo === r.couponNo ? {
            b: o.t(r.title),
            c: o.o(o => e.showDetail(r), u)
          } : {}, {
            d: u
          }))
        } : {}, {
          k: r
        })),
        b: e.counponList.length > 1,
        c: o.o(o => e.goExchange()),
        d: o.sr("exchangeDialog", "f272cdab-0"),
        e: o.p({
          title: "选择要兑换的券",
          "max-dialog": !0
        })
      }
    }],
    ["__scopeId", "data-v-f272cdab"]
  ]);
  wx.createComponent(c)
}();