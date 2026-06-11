! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/api.js"),
    o = require("../../utils/wxuser.js"),
    a = require("../../utils/filter.js"),
    l = require("../../base/channel.js"),
    r = require("../../hooks/useScroll.js"),
    n = require("../../base/product.js");
  Math || (v + p + c + d + u + i + s)();
  const u = () => "../../components/calendar.js",
    i = () => "../../components/destinationBox.js",
    s = () => "../../components/bottomDialog.js",
    c = () => "../../components/empty.js",
    d = () => "../../components/bannerSwiper.js",
    v = () => "../../components/coustomHead.js",
    p = () => "../../components/new/ProductCardList.js",
    f = e.defineComponent({
      __name: "hotelList",
      setup(u) {
        const {
          scrollTop: i,
          onPageScroll: s
        } = r.useScroll();
        let c = o.getStorage("config"),
          d = o.getStorage("user"),
          v = e.ref(e.dayjs().format("YYYY-MM-DD")),
          p = e.ref(e.dayjs().add(1, "days").format("YYYY-MM-DD")),
          f = e.ref(),
          m = e.ref(l.defaultOtaChannel),
          g = e.ref(!1),
          h = e.computed(() => {
            let t = e.dayjs(v.value);
            return e.dayjs(p.value).diff(t, "d")
          }),
          y = e.ref(""),
          D = e.ref(""),
          C = e.ref(""),
          T = e.ref("");
        const L = e.ref([]),
          j = e.computed(() => n.formatFeedProductList({
            list: L.value
          })),
          b = e.ref([]),
          k = e.ref(!1),
          P = e.computed(() => k.value ? b.value : [b.value[0]]),
          H = e.ref(),
          M = e.ref();
        let N = e.ref(!1),
          S = e.ref(!1),
          w = e.ref(1),
          x = e.ref(!1),
          I = e.ref(15),
          q = e.ref(0);
        e.ref("relative");
        let Y = e.ref(40);
        e.onLoad(e => {
          console.log("onLoad生命周期"), e && e.cityName && (D.value = e.cityName), e && e.cityCode && (y.value = e.cityCode), e && e.rendezvousName && (C.value = e.rendezvousName), e && e.rendezvous && (T.value = e.rendezvous), e && e.fromDate && (v.value = e.fromDate), e && e.toDate && (p.value = e.toDate), e && e.otaChannel && (m.value = e.otaChannel)
        });
        const _ = () => {
            M.value.showDialog(), f.value.updataHis()
          },
          z = e => {
            console.log(e), y.value = e.cityCode, D.value = e.cityDesc, C.value = e.dictionaryDesc, T.value = e.dictionaryCode, M.value.hideDialog(), O()
          },
          G = e => {
            v.value = e.checkInDay, p.value = e.checkOutDay, O()
          },
          A = () => {
            H.value.showDialog()
          },
          B = () => {
            if (L.value.length >= w.value) return !1;
            var e = {
              fromDate: v.value,
              toDate: p.value,
              otaChannel: m.value,
              hotelGroupCodes: c.hotelGroupCode,
              cardLevel: "",
              hasPriceMin: "T",
              city: y.value,
              clientLatitude: "",
              clientLongitude: "",
              position: "",
              positionValue: "",
              keyWord: "",
              radius: "3000000",
              pageSize: I.value,
              firstResult: q.value,
              cardType: "",
              appid: c.appid,
              componentAppid: c.componentAppid,
              memberNo: ""
            };
            if (d && d.memberId && (e.cardLevel = d.cardLevel, e.cardType = d.cardType, e.memberNo = d.cardNo), "" == y.value && (e.radius = ""), e.clientLatitude && e.clientLongitude || (e.radius = ""), x.value) return !1;
            x.value = !0, console.log(e), t.api.findHotel(e).then((function(e) {
              x.value = !1, 1 == e.result && (e.retVal.resultInfos.forEach((function(e, t) {
                if (e.pictures ? e.picturesList = e.pictures.split(";") : e.picturesList = [], e.promotionTag ? e.promotionTags = e.promotionTag.split(",") : e.promotionTags = [], e.themeName && (e.promotionTags = e.promotionTags.concat(e.themeName.split(","))), e.promotionTags.length > 3 && (e.promotionTags = e.promotionTags.slice(0, 3)), e.distance > 1e3 ? (e.distance = (e.distance / 1e3).toFixed(2), e.distanceUnit = "公里") : e.distanceUnit = "米", e.gcHotelPicTag = "", e.gcHotelPicTags.length > 0) {
                  var o = e.gcHotelPicTags.filter(e => "08" == e.type);
                  console.log(o), o.length > 0 && (e.gcHotelPicTag = o[0].descript)
                }
                e.type = "Hotel"
              })), L.value = L.value.concat(e.retVal.resultInfos), q.value += I.value, w.value = e.retVal.totalRows, g.value = !0)
            })).catch((function(e) {
              x.value = !1, console.log(e)
            }))
          },
          F = () => {
            k.value = !k.value
          },
          V = () => {
            (() => {
              let e = {
                beginDate: v.value,
                endDate: p.value,
                cardLevel: "",
                companyLevel: "",
                cardType: "",
                category: "",
                categorySub: "",
                companyCode: "",
                gcLevel: "",
                ota: "",
                otaChannel: "WECHAT",
                dayNight: "",
                rendezvous: T.value,
                travelGroupCode: "",
                travelType: "",
                hotelCode: c.hotelCode,
                hotelGroupCode: c.hotelGroupCode,
                unitCode: c.hotelGroupCode
              };
              d && d.memberId && (e.cardLevel = d.cardLevel, e.companyLevel = d.companyLevel, e.cardType = d.cardType), t.api.travelProductList(e).then(e => {
                0 == e.result && (b.value = n.formatFeedProductList({
                  list: (e.retVal || []).map(e => ({
                    ...e,
                    type: "DestPackage" === e.categorySub ? "DestPackage" : "Travel"
                  }))
                }), k.value = !1, b.value.length > 1 ? S.value = !0 : S.value = !1)
              })
            })(), B()
          };
        e.onMounted(() => {
          console.log("onMounted生命周期"), e.index.getSystemInfo({
            success: e => {
              Y.value = (e.statusBarHeight || 0) + Y.value
            },
            fail(e) {
              console.log(e)
            }
          }), V(), setTimeout(() => {
            H.value.init({
              checkInDay: v.value,
              checkOutDay: p.value
            })
          }, 500)
        });
        const O = () => {
          w.value = 1, q.value = 0, L.value = [], V()
        };
        return e.onReachBottom(() => {
          B()
        }), s(e => {
          i.value = e.scrollTop
        }), (t, o) => e.e({
          a: e.p({
            title: "搜索结果",
            nativeMode: "true"
          }),
          b: e.t(e.unref(C) ? e.unref(C) : "全部"),
          c: e.o(_),
          d: e.t(e.unref(a.timeFilterMD2)(e.unref(v))),
          e: e.t(e.unref(a.timeFilterMD2)(e.unref(p))),
          f: e.t(e.unref(h)),
          g: e.o(A),
          h: b.value.length > 0
        }, b.value.length > 0 ? e.e({
          i: e.p({
            list: P.value
          }),
          j: e.unref(S)
        }, e.unref(S) ? {
          k: e.t(k.value ? "收起" : "展开"),
          l: e.o(F),
          m: k.value ? 1 : ""
        } : {}) : {}, {
          n: j.value.length
        }, j.value.length ? {
          o: e.p({
            list: j.value
          })
        } : {}, {
          p: 0 == L.value.length && !e.unref(x) && e.unref(g)
        }, 0 == L.value.length && !e.unref(x) && e.unref(g) ? {
          q: e.p({
            tips: "暂无酒店"
          })
        } : {}, {
          r: e.unref(w) == L.value.length
        }, (e.unref(w), L.value.length, {}), {
          s: e.p({
            showLocation: "6"
          }),
          t: e.sr(H, "166db48e-5", {
            k: "calendarCompent"
          }),
          v: e.o(G),
          w: e.p({
            checkInDay: e.unref(v),
            checkOutDay: e.unref(p)
          }),
          x: e.sr(f, "166db48e-7,166db48e-6", {
            k: "dictionaryBox"
          }),
          y: e.o(z),
          z: e.p({
            dictionaryCode: e.unref(T),
            isAutoChooseCity: e.unref(N)
          }),
          A: e.sr(M, "166db48e-6", {
            k: "destination"
          }),
          B: e.p({
            title: "旅行目的地",
            maxDialog: !0
          })
        })
      }
    });
  f.__runtimeHooks = 1;
  const m = e._export_sfc(f, [
    ["__scopeId", "data-v-166db48e"]
  ]);
  wx.createPage(m)
}();