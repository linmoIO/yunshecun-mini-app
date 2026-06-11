! function() {
  "use strict";
  const o = require("../common/vendor.js"),
    e = require("../utils/filter.js"),
    t = require("../utils/platform.js"),
    r = require("../utils/qdTracker.js"),
    a = require("../utils/umengAdaptor.js"),
    i = require("../utils/utils.js"),
    m = o.defineComponent({
      name: "RoomList",
      props: {
        fromDate: {
          type: String,
          default: () => ""
        },
        toDate: {
          type: String,
          default: () => ""
        },
        productRoomList: {
          type: Array,
          default: () => []
        },
        user: {
          type: Object,
          default: () => ({})
        },
        hotel: {
          type: Object,
          default: () => ({})
        }
      },
      emits: ["showCurrentRoom", "goBook", "showTravelAll", "goPackItem"],
      setup(m, {
        emit: l
      }) {
        const n = o.computed(() => m.fromDate && m.toDate ? o.dayjs(m.toDate).diff(o.dayjs(m.fromDate), "day") : 1);
        return {
          goBookInfo: (o, e) => {
            var t;
            a.adaptor.sendEvent("click_book_page_product_card_control", {
              hotel_name: m.hotel.descript,
              start_date: m.fromDate,
              end_date: m.toDate,
              price: e.roomMinPrice,
              room_id: e.roomType,
              room_name: e.roomDescript
            }), r.qdTracker.track("hotel_book_click", {
              hotel_name: m.hotel.descript,
              checkin_date: m.fromDate,
              checkout_date: m.toDate,
              room_type: e.roomDescript,
              room_product_name: null == (t = e.gcProductBases[0]) ? void 0 : t.name
            }), l("goBook", {
              roomType: o,
              room: e,
              type: "room"
            })
          },
          goLogin: () => {
            i.toLogin()
          },
          setCurrentRoom: (o, e) => {
            l("showCurrentRoom", {
              roomType: o,
              room: e,
              type: "room"
            })
          },
          showTravelAll: o => {
            l("showTravelAll", {
              roomIndex: o
            })
          },
          setCurrentPack: (o, e, t) => {
            l("showCurrentRoom", {
              roomType: o,
              room: e,
              pack: t,
              type: "pack"
            })
          },
          preview: (o, e) => {
            e = [o, ...e], t.previewImage({
              current: o,
              urls: e
            })
          },
          goPackItem: o => {
            l("goPackItem", o)
          },
          valFormat: e.valFormat,
          dayNum: n
        }
      }
    }),
    l = o._export_sfc(m, [
      ["render", function(e, t, r, a, i, m) {
        return {
          a: o.f(e.productRoomList, (t, r, a) => o.e({
            a: t.gcRoomExtra.logo,
            b: o.o(o => e.preview(t.gcRoomExtra.logo, t.gcRoomExtra.pictures), r),
            c: o.t(t.roomPicCount),
            d: o.t(t.roomDescript),
            e: o.t(t.gcRoomExtra.bedType),
            f: o.t(t.gcRoomExtra.squareMeter),
            g: o.f(t.gcProductBases, (r, a, i) => o.e({
              a: o.t(r.showName),
              b: o.t(e.valFormat(r.pbMinPriceWithPromotion))
            }, (e.dayNum, {}), {
              c: o.o(o => e.setCurrentRoom(r, t), a),
              d: "T" === r.bookAble
            }, "T" === r.bookAble ? o.e({
              e: r.minSaleNum <= 0
            }, r.minSaleNum <= 0 ? {} : o.e({
              f: !(e.user && e.user.memberId) && "F" === r.notMemberBook
            }, e.user && e.user.memberId || "F" !== r.notMemberBook ? o.e({
              h: "SCORE" === r.payMethod
            }, "SCORE" === r.payMethod ? o.e({
              i: e.user.pointBalance >= r.pbMinPriceWithPromotion
            }, e.user.pointBalance >= r.pbMinPriceWithPromotion ? {
              j: o.o(o => e.goBookInfo(r, t), a)
            } : {}) : "TICKET" === r.payMethod ? {
              l: o.o(o => e.goBookInfo(r, t), a)
            } : o.e({
              m: "PP" === r.payMethod || "SCORE_PP" === r.payMethod
            }, "PP" === r.payMethod || "SCORE_PP" === r.payMethod ? {
              n: o.o(o => e.goBookInfo(r, t), a)
            } : {
              o: o.o(o => e.goBookInfo(r, t), a)
            }), {
              k: "TICKET" === r.payMethod
            }) : {
              g: o.o(o => e.goLogin(), a)
            })) : {}, {
              p: r.minSaleNum <= 0 || "T" !== r.bookAble ? 1 : "",
              q: a
            })),
            h: "true" === t.isFull ? 1 : "",
            i: t.travelList && t.travelList.length > 0
          }, t.travelList && t.travelList.length > 0 ? o.e({
            j: o.f(t.travelList, (r, a, i) => o.e({
              a: o.t(r.title),
              b: o.t(r.price),
              c: o.t(r.unit),
              d: r.price2
            }, r.price2 ? {
              e: o.t(r.price2)
            } : {}, {
              f: o.o(o => e.setCurrentPack(t.gcProductBases[0], t, r), a),
              g: o.o(o => e.goPackItem(r), a),
              h: a
            })),
            k: t.travelList && t.travelList.length < t.travelWechatHotelDetailDtos.length
          }, t.travelList && t.travelList.length < t.travelWechatHotelDetailDtos.length ? {
            l: o.o(o => e.showTravelAll(r), r)
          } : {}) : {}, {
            m: r
          })),
          b: e.dayNum > 1
        }
      }]
    ]);
  wx.createComponent(l)
}();