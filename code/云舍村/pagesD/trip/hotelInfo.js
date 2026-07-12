! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/api.js"),
    r = require("../../base/jAlert/jAlert.js"),
    o = require("../../utils/wxuser.js");
  Math || (u + s + l + a)();
  const a = () => "../../components/swiperBox.js",
    l = () => "../../components/moreText.js",
    u = () => "../../components/coustomHead.js",
    s = () => "../components/tripNav.js",
    n = e.defineComponent({
      __name: "hotelInfo",
      setup(a) {
        let l = o.getStorage("config"),
          u = e.ref(""),
          s = e.ref({}),
          n = e.ref(""),
          p = e.ref(""),
          i = e.ref(""),
          c = e.ref(""),
          d = e.ref([]),
          f = e.ref(e.dayjs().format("YYYY-MM-DD")),
          m = e.ref(e.dayjs().add(1, "days").format("YYYY-MM-DD")),
          v = e.ref(""),
          h = e.ref(""),
          g = o.getStorage("user"),
          C = e.ref({});
        const y = e.ref(1);
        let V = e.ref(!0),
          D = e.reactive({
            indicatorDots: !1,
            autoplay: !1,
            slot: !0,
            dotPosStyle: "bottom:-14px;left:50%;transform: translate(-50%);background:rgba(204, 204, 204, 0.28);",
            dotStyle: "background:#000;"
          });
        const b = () => {
          var e = {
            fromDate: f.value,
            toDate: m.value,
            otaChannel: "wechat",
            hotelCodes: [u.value],
            hotelGroupCode: l.hotelGroupCode,
            cardLevel: "",
            cardType: "",
            appid: l.appid,
            memberNo: "",
            componentAppid: l.componentAppid,
            srcHotelGroupCode: l.hotelGroupCode,
            isWeeHour: "",
            couponNo: ""
          };
          t.api.hotelListAll(e).then(e => {
            1 == e.result ? (s.value.descript = e.retVal[0].gcHotel.descript, C.value.productDesc = s.value.descript, s.value.logo = e.retVal[0].gcHotelExtra.logo, e.retVal[0].productRoomList.forEach(e => {
              console.log(e), e.roomType == c.value && (s.value.roomDescript = e.roomDescript, s.value.abstracts = e.gcRoomExtra.abstracts)
            })) : r.jAlert3(e.msg)
          })
        };
        return e.onLoad(e => {
          e.teamNo && (h.value = e.teamNo), e.depDate && (n.value = decodeURIComponent(e.depDate)), e.arrDate && (p.value = decodeURIComponent(e.arrDate)), u.value = e.hotelCode, c.value = e.rmtype, v.value = e.rmtypeDesc, e.type && (y.value = e.type.toString())
        }), e.onMounted(() => {
          var o;
          t.api.interfaceTransfer({
            query: {
              hotelGroupCode: l.hotelGroupCode,
              hotelCode: u.value,
              roomType: c.value
            },
            config: {
              interfaceType: "POST",
              interfaceModule: "GC_PRODUCT_JOURNEY",
              interfaceMethod: "/api/travelGroup/findPicTypeByRoomType",
              interfaceFrom: "GC",
              hotelGroupCode: l.hotelGroupCode
            }
          }).then(e => {
            1 == e.result && 0 == e.retVal.result && (d.value = e.retVal.retVal, d.value.forEach(e => {
              e.listNew = [], e.list.forEach((t, r) => {
                let o = Math.trunc(r / 10);
                e.listNew[o] || (e.listNew[o] = []), e.listNew[o].push(t)
              }), e.list.length > 5 ? e.maxHeight = "140px" : e.maxHeight = "50px"
            }))
          }), h.value ? (o = () => {
            t.api.showOrder({
              orderNo: C.value.reserveList[0].orderNo,
              hotelGroupCode: l.hotelGroupCode
            }).then(t => {
              V.value = !1, 1 == t.result ? (C.value.guestList = t.retVal.guestList, C.value.hotelCode = t.retVal.hotelCode, C.value.arrivalFrom = t.retVal.arrStr, i.value = e.dayjs(t.retVal.arrStr).format("HH:mm"), ("N" == t.retVal.sta || "R" == t.retVal.sta && 2 == t.retVal.paySta) && (C.value.orderSta = "W"), "I" == t.retVal.sta && (C.value.orderSta = "I"), "O" == t.retVal.sta && (C.value.orderSta = "O"), C.value.productDesc = t.retVal.hotelDescript) : r.jAlert3(t.msg)
            }), b()
          }, t.api.interfaceTransfer({
            query: {
              curPage: 1,
              firstResult: 0,
              isAgency: "T",
              mobile: g.mobile,
              pageSize: 999,
              unitCode: l.hotelGroupCode
            },
            config: {
              interfaceType: "POST",
              interfaceModule: "GC_TRAVEL_ORDER",
              interfaceMethod: "/api/team/order/myTravelList",
              interfaceFrom: "GC",
              hotelGroupCode: l.hotelGroupCode
            }
          }).then(e => {
            1 == e.result && 0 == e.retVal.result && e.retVal.retVal.length > 0 && e.retVal.retVal.forEach(e => {
              console.log(11111, e.teamNo == h.value), e.teamNo == h.value && (C.value = e, o && o())
            })
          })) : (i.value = "12:00", b())
        }), (t, r) => e.e({
          a: e.p({
            color: "#fff"
          }),
          b: e.unref(s).logo,
          c: e.t(e.unref(s).descript),
          d: !e.unref(V)
        }, e.unref(V) ? {} : {
          e: e.p({
            teamOrder: e.unref(C),
            teamNo: e.unref(h),
            hotelCode: e.unref(u),
            typeNumber: y.value
          })
        }, {
          f: e.t(e.unref(s).descript),
          g: e.t(e.unref(v) || e.unref(s).roomDescript),
          h: e.t(e.unref(p)),
          i: e.t(e.unref(i)),
          j: e.t(e.unref(n)),
          k: e.unref(s).abstracts
        }, e.unref(s).abstracts ? {
          l: e.p({
            content: e.unref(s).abstracts,
            openText: "更多",
            maxLine: 5
          })
        } : {}, {
          m: e.f(e.unref(d), (t, r, o) => ({
            a: e.t(t.descript),
            b: e.w(({
              item: t
            }, r, o) => ({
              a: e.f(t, (t, r, o) => ({
                a: t.logo,
                b: e.t(t.descript),
                c: r
              })),
              b: o,
              c: r
            }), {
              name: "item",
              path: "m[" + o + "].b",
              vueId: "4599335a-3-" + o
            }),
            c: "4599335a-3-" + o,
            d: e.p({
              slides: t.listNew,
              swiperConfig: e.unref(D),
              isDot: t.list.length > 10
            }),
            e: t.maxHeight,
            f: r
          }))
        })
      }
    }),
    p = e._export_sfc(n, [
      ["__scopeId", "data-v-4599335a"]
    ]);
  wx.createPage(p)
}();
