! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    t = require("../utils/wxuser.js"),
    i = require("../utils/utils.js"),
    o = require("../base/channel.js"),
    r = require("../utils/filter.js"),
    c = require("../services/common.js"),
    l = e.defineComponent({
      __name: "RecommendProducts",
      props: {
        orderNo: null
      },
      setup(l) {
        const a = l,
          d = t.getStorage("config"),
          n = e.ref({});
        return e.ref(o.defaultChannel), e.onMounted(() => {
          c.getRecommendProducts({
            clientType: o.defaultChannel,
            hotelGroupCode: d.hotelGroupCode,
            showLocation: 1,
            orderNo: a.orderNo
          }).then(t => {
            if (console.log("{fetchRecommendProducts.getRecommendProducts} res:", t), 0 === (null == t ? void 0 : t.result) && !e.lodashExports.isEmpty(null == t ? void 0 : t.retVal)) {
              const {
                link: e,
                title: i,
                desc: o,
                payCompletionRecommendList: r
              } = t.retVal;
              n.value = {
                title: i,
                desc: o,
                link: e,
                items: r.map(e => {
                  var t;
                  const i = {
                    ...e
                  };
                  if (e.picture && (i.pics = e.picture.split(",")[0]), "daily" == e.productType) try {
                    (null == e ? void 0 : e.minPriceDto) ? (i.payType = e.minPriceDto.payType.includes("CASH") ? "money" : "mix", i.price = "money" == i.payType ? e.minPriceDto.price || 0 : e.minPriceDto.mixPrice || 0, i.credit = e.minPriceDto.mixCredit) : i.price = (null == (t = e.minPriceDto) ? void 0 : t.price) || 0
                  } catch (e) {
                    i.price = 0
                  }
                  return i
                })
              }
            }
          })
        }), (t, o) => e.e({
          a: n.value.items && n.value.items.length > 0
        }, n.value.items && n.value.items.length > 0 ? e.e({
          b: n.value.title || n.value.link
        }, n.value.title || n.value.link ? e.e({
          c: e.t(n.value.title),
          d: n.value.link
        }, n.value.link ? e.e({
          e: n.value.desc
        }, n.value.desc ? {
          f: e.t(n.value.desc)
        } : {}) : {}, {
          g: e.o(e => {
            i.goPage(n.value.link)
          })
        }) : {}, {
          h: e.f(n.value.items, (t, o, c) => e.e({
            a: t.pics + "?imageView2/1/w/332/h/332&x-oss-process=image/resize,m_fill,w_322,h_332",
            b: e.t(t.title),
            c: t.price > 0
          }, t.price > 0 ? {
            d: e.t(e.unref(r.valFormat)(t.price))
          } : (-1 === t.price || t.productType, {}), {
            e: -1 === t.price,
            f: "daily" === t.productType,
            g: o,
            h: e.o(e => (e => {
              "tdq" == e.productType ? i.goPage("/pagesB/exchangeCoupon/exchangeCouponDetail?id=" + e.productId) : "hotel" == e.productType ? i.goPage("/pagesC/order/hotel?hotelCode=" + e.productId) : "daily" == e.productType ? i.goPage("/pagesE/dailyActivity/dailyActivityDetail?activityCode=" + e.productId) : "weimob" === e.productType ? i.goPage(`/ec_goods/detail?vid=0&productInstanceId=13545845204&id=${e.productId}&appid=wx85856dcb803b16cc`) : i.goPage("/pagesB/travel/travelDetail?travelType=" + e.travelType)
            })(t), o)
          }))
        }) : {})
      }
    }),
    a = e._export_sfc(l, [
      ["__scopeId", "data-v-1429ceef"]
    ]);
  wx.createComponent(a)
}();