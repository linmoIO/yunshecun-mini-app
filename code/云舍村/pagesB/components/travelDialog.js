! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../base/channel.js"),
    r = require("../../utils/api.js"),
    a = require("../../utils/filter.js"),
    o = require("../../utils/wxuser.js"),
    i = o.getStorage("config"),
    l = o.getStorage("user"),
    n = e.defineComponent({
      name: "TraveDialog",
      components: {
        bottomDialog: () => "../../components/bottomDialog.js"
      },
      props: {
        travelType: {
          type: Object,
          default: () => ({})
        },
        travelTitle: {
          type: String,
          default: () => ""
        },
        travelGroupCodes: {
          type: Array,
          default: () => []
        },
        couponCode: {
          type: String
        }
      },
      setup(o) {
        const n = e.ref({}),
          s = e.ref({}),
          u = e.ref(t.defaultOtaChannel),
          c = e.ref(!1),
          d = e.ref(),
          p = e.ref([]),
          D = e.ref({}),
          y = () => {
            r.api.interfaceTransfer({
              query: {
                beginDate: e.dayjs().format("YYYY-MM-DD"),
                cardLevel: l.cardLevel || "",
                cardType: l.cardType || "",
                gcLevel: "",
                hotelGroupCode: i.hotelGroupCode,
                itineraryCode: n.value.itineraryCode,
                ota: "DIRECT",
                otaChannel: u.value,
                travelType: D.value.travelType
              },
              config: {
                interfaceType: "POST",
                interfaceModule: "GC_PRODUCT_JOURNEY",
                interfaceMethod: "/api/travelGroup/listTravelProductDailyDetail",
                interfaceFrom: "GC",
                hotelGroupCode: i.hotelGroupCode
              }
            }).then(t => {
              if (c.value = !1, p.value = [], 1 === t.result && 0 === t.retVal.result) {
                const r = t.retVal.retVal;
                for (let e = 0; e < r.length; e++) {
                  let t = !1;
                  const a = r[e];
                  o.travelGroupCodes.forEach(e => {
                    e === a.travelGroupCode && (t = !0)
                  }), t || (r.splice(e, 1), e--)
                }
                r.forEach(t => {
                  const r = t;
                  r.embarkDate = t.groupBeginDate, r.MMdd = e.dayjs(t.groupBeginDate).format("MM/DD"), e.dayjs().diff(t.groupBeginDate, "s") < 0 && (t.show = !0);
                  const a = e.dayjs(t.groupBeginDate).format("d");
                  r.week = {
                    0: "周日",
                    1: "周一",
                    2: "周二",
                    3: "周三",
                    4: "周四",
                    5: "周五",
                    6: "周六"
                  } [a], r.groupEndDate = e.dayjs(r.groupBeginDate).add(D.value.itineraryDays - 1, "days").format("YYYY-MM-DD hh:mm:ss"), r.number = r.productAvailNum, r.price = r.minPrice, r.groupBeginDateFormat = e.dayjs(r.groupBeginDate).format("MM月DD日"), r.groupBeginDateFormat2 = e.dayjs(r.groupBeginDate).format("MM.DD"), r.groupEndDateFormat = e.dayjs(r.groupEndDate).format("MM月DD日"), p.value.push(r)
                }), console.log(p.value)
              }
            })
          },
          v = () => {
            r.api.interfaceTransfer({
              query: {
                ota: "DIRECT",
                otaChannel: "wechat",
                unitCode: i.hotelGroupCode,
                travelType: o.travelType,
                travelGroupCodes: o.travelGroupCodes,
                couponCode: o.couponCode
              },
              config: {
                interfaceType: "POST",
                interfaceModule: "GC_PRODUCT_JOURNEY",
                interfaceMethod: "/api/travelGroup/findTravelProductForWechatDetail",
                interfaceFrom: "GC",
                hotelGroupCode: i.hotelGroupCode
              }
            }).then(e => {
              if (1 === e.result && 0 === e.retVal.result) {
                const t = e.retVal.retVal;
                if (D.value = JSON.parse(JSON.stringify(t[0])), D.value.itineraryDtos = [], o.travelGroupCodes.length > 0)
                  for (let e = 0; e < t.length; e++) {
                    const r = t[e];
                    o.travelGroupCodes.forEach(e => {
                      r.travelGroupCode.split(",").forEach(t => {
                        e === t && (r.hasGroup = !0)
                      })
                    }), r.hasGroup || (t.splice(e, 1), e--)
                  }
                t.forEach(e => {
                  e.itineraryDtos.length > 0 && e.itineraryDtos.forEach(e => {
                    e.dayDtos.forEach((e, t) => {
                      e.dayTitle = "", 0 === t && (e.open = !0), e.dayDetailDtos.forEach(t => {
                        t.picture && (t.picture = t.picture.split(",")), e.dayTitle ? e.dayTitle += " - " + t.title : e.dayTitle = t.title
                      })
                    }), D.value.itineraryDtos.push(e)
                  })
                }), D.value.itineraryDtos.length > 0 && (D.value.itineraryDtos[0].active = !0, n.value = D.value.itineraryDtos[0]), y()
              }
            })
          };
        return e.watch(() => o.travelType, (e, t) => {
          v()
        }), e.onMounted(() => {}), {
          findTravelProductForWechatDetail: v,
          itineraryDtos: n,
          travel: d,
          openItinerary: e => {
            e.open ? e.open = !1 : e.open = !0
          },
          showDialog: () => {
            d.value.showDialog()
          },
          travelDetail: D,
          dailyPriceList: p,
          otaChannel: u,
          isAjax: c,
          chooseTravel: e => {
            c.value || e.itineraryCode === n.value.itineraryCode || (c.value = !0, D.value.itineraryDtos.forEach(e => {
              e.active = !1
            }), e.active = !0, n.value = e, y())
          },
          curDailyPrice: s,
          chooseDate: e => {
            e.canTap = !0
          },
          valFormat: a.valFormat
        }
      }
    });
  Array || e.resolveComponent("bottom-dialog")();
  const s = e._export_sfc(n, [
    ["render", function(t, r, a, o, i, l) {
      return e.e({
        a: t.travelDetail.itineraryDtos && t.travelDetail.itineraryDtos.length > 0
      }, t.travelDetail.itineraryDtos && t.travelDetail.itineraryDtos.length > 0 ? {
        b: e.f(t.travelDetail.itineraryDtos, (r, a, o) => ({
          a: e.t(r.itineraryDesc),
          b: e.t(r.itineraryShortDesc),
          c: a,
          d: r.active ? 1 : "",
          e: e.o(e => t.chooseTravel(r), a)
        })),
        c: e.f(t.dailyPriceList, (r, a, o) => e.e({
          a: r.show
        }, r.show ? {
          b: e.t(r.week),
          c: e.t(r.MMdd),
          d: e.t(t.valFormat(r.price)),
          e: r.groupBeginDate === t.curDailyPrice.groupBeginDate ? 1 : "",
          f: e.o(e => t.chooseDate(r), a)
        } : {}, {
          g: a
        }))
      } : {}, {
        d: t.itineraryDtos.dayDtos
      }, t.itineraryDtos.dayDtos ? {
        e: e.f(t.itineraryDtos.dayDtos, (r, a, o) => ({
          a: e.t(r.rsvDay),
          b: e.t(r.placeOfDepartureDesc),
          c: e.t(r.destinationDesc),
          d: e.t(r.descript),
          e: e.o(e => t.openItinerary(r), a),
          f: e.t(r.dayTitle),
          g: e.f(r.dayDetailDtos, (t, r, a) => e.e({
            a: t.titlesIcon,
            b: e.t(t.title),
            c: e.t(t.descript),
            d: t.productUrl
          }, t.productUrl ? {
            e: t.productUrl
          } : {}, {
            f: e.t(t.timeSlot),
            g: r
          })),
          h: a,
          i: r.open ? 1 : ""
        }))
      } : {}, {
        f: e.sr("travel", "b835ce78-0"),
        g: e.p({
          title: t.travelTitle,
          "max-dialog": "true"
        })
      })
    }],
    ["__scopeId", "data-v-b835ce78"]
  ]);
  wx.createComponent(s)
}();
