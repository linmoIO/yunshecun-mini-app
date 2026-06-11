! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/api.js"),
    o = require("../../utils/wxuser.js");
  Array || e.resolveComponent("FloatButtonKf")(), Math || r();
  const r = () => "../../components/coustomHead.js",
    a = e.defineComponent({
      __name: "tripHotel",
      setup(r) {
        let a = o.getStorage("config"),
          n = o.getStorage("user"),
          s = e.ref({}),
          i = e.ref([]),
          m = e.ref("");
        const l = (e, t) => {
            const o = new Set(e),
              r = new Set(t);
            return o.size === r.size && [...o].every(e => r.has(e))
          },
          c = () => {
            var o = {
              fromDate: "",
              toDate: "",
              otaChannel: "WECHAT",
              hotelGroupCodes: a.hotelGroupCode,
              cardLevel: "",
              hasPriceMin: "T",
              clientLatitude: "",
              clientLongitude: "",
              position: "",
              positionValue: "",
              keyWord: "",
              radius: "",
              pageSize: 999,
              firstResult: 0,
              cardType: "",
              appid: a.appid,
              componentAppid: a.componentAppid,
              memberNo: ""
            };
            t.api.findHotel(o).then((function(t) {
              1 == t.result && i.value.forEach(o => {
                o.bizDateF = e.dayjs(o.bizDate).format("M月D日"), o.moon = e.dayjs(o.bizDate).format("M"), o.days = e.dayjs(o.bizDate).format("D"), o.teamRsvSrcs.forEach(r => {
                  r.arrDateF = e.dayjs(o.arrDate).format("M月D日"), r.depDateF = e.dayjs(o.depDate).format("M月D日"), t.retVal.resultInfos.forEach((e, t) => {
                    r.hotelCode == e.code && (r.extraLogo = e.extraLogo, r.phone = e.phone)
                  })
                })
              })
            })).catch((function(e) {
              console.log(e)
            }))
          };
        return e.onLoad(e => {
          m.value = e.teamNo
        }), e.onMounted(() => {
          t.api.interfaceTransfer({
            query: {
              unitCode: a.hotelGroupCode,
              mobile: n.mobile
            },
            config: {
              interfaceType: "GET",
              interfaceModule: "GC_TRAVEL_ORDER",
              interfaceMethod: "/api/team/order/detail/" + m.value,
              interfaceFrom: "GC",
              hotelGroupCode: a.hotelGroupCode
            }
          }).then(e => {
            if (1 == e.result && 0 == e.retVal.result) {
              s.value = e.retVal.retVal;
              let t = [];
              s.value.teamItineraryInfos[0].teamItineraries.forEach(e => {
                if (e.teamRsvSrcs && e.teamRsvSrcs.length > 0) {
                  let o = {};
                  o = e, o.roomList = [], e.teamRsvSrcs.forEach(e => {
                    o.arrDate = e.arrDate, o.depDate = e.depDate, o.hotelDesc = e.hotelDesc, o.night = 1, o.roomList.push({
                      rmtypeDesc: e.rmtypeDesc,
                      rmtype: e.rmtype,
                      rmnum: e.rmnum,
                      hotelDesc: e.hotelDesc
                    })
                  }), t.push(o)
                }
              }), i.value = (e => {
                const t = [];
                for (const o of e) {
                  let e = {};
                  o.roomList.forEach(t => {
                    let r = `${o.arrDate}_${t.rmtype}_${t.hotelDesc}`;
                    e[r] ? e[r].rmnum += t.rmnum : e[r] = {
                      ...t
                    }
                  }), o.roomList = Object.values(e), o.key = [], o.roomList.forEach(e => {
                    o.key.push(`${e.rmtype}_${e.hotelDesc}_${e.rmnum}`)
                  });
                  let r = t.find(e => o.roomList.every(t => e.roomList.some((r, a) => !(o.arrDate !== e.depDate || !l(o.key, e.key) || (e.roomList[a].rmnum += t.rmnum, 0)))));
                  r ? (r.depDate = o.depDate, r.night += o.night) : t.push(o)
                }
                return t
              })(t), console.log(i.value), c()
            }
          })
        }), (t, o) => ({
          a: e.p({
            title: "行程酒店",
            nativeMode: !0
          }),
          b: e.f(e.unref(i), (t, o, r) => e.e({
            a: t.teamRsvSrcs.length > 0
          }, t.teamRsvSrcs.length > 0 ? e.e({
            b: e.t(t.dayNum),
            c: t.night > 1
          }, t.night > 1 ? {
            d: e.t(t.dayNum + t.night - 1)
          } : {}, {
            e: e.f(t.teamRsvSrcs, (t, o, r) => e.e({
              a: o < 1
            }, o < 1 ? {
              b: t.extraLogo,
              c: e.t(t.arrDateF),
              d: e.t(t.depDateF),
              e: e.t(t.hotelDesc),
              f: e.t(t.rmtypeDesc),
              g: e.o(o => {
                return r = t.phone, void e.index.makePhoneCall({
                  phoneNumber: r
                });
                var r
              }, o),
              h: e.o(o => (t => {
                e.index.navigateTo({
                  url: `/pagesD/trip/hotelInfo?rmtype=${t.rmtype}&hotelCode=${t.hotelCode}&arrDate=${t.arrDateF}&depDate=${t.depDateF}&rmtypeDesc=${t.rmtypeDesc}`
                })
              })(t), o)
            } : {}, {
              i: o
            }))
          }) : {}, {
            f: o
          }))
        })
      }
    }),
    n = e._export_sfc(a, [
      ["__scopeId", "data-v-47a734be"]
    ]);
  wx.createPage(n)
}();