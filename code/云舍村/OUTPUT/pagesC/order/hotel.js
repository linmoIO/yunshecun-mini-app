! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    a = require("../../base/channel.js"),
    o = require("../../base/common.js"),
    t = require("../../base/jAlert/jAlert.js"),
    l = require("../../base/product.js"),
    r = require("../../hooks/useAdReport.js"),
    u = require("../../hooks/useScroll.js"),
    c = require("../../hooks/useSubscribeMessage.js"),
    i = require("../../hooks/useXhsReport.js"),
    n = require("../../utils/api.js"),
    s = require("../../utils/filter.js"),
    v = require("../../utils/helper.js"),
    d = require("../../utils/platform.js"),
    p = require("../../utils/qdTracker.js"),
    m = require("../../utils/umengAdaptor.js"),
    g = require("../../utils/utils.js"),
    f = require("../../utils/wxuser.js");
  Array || (e.resolveComponent("mp-html") + e.resolveComponent("FloatButtonKf"))(), Math || (T + E + (() => "../../uni_modules/mp-html/components/mp-html/mp-html.js") + k + C + P + D + x + y + R + h + b)();
  const h = () => "../../components/backToTop.js",
    y = () => "../../components/bottomDialog.js",
    D = () => "../../components/calendar.js",
    T = () => "../../components/coustomHead.js",
    C = () => "../../components/empty.js",
    b = () => "../../components/kfDialog.js",
    E = () => "../../components/new/ErrorLimiting.js",
    P = () => "../../components/new/ProductCardList.js",
    k = () => "../../components/roomList.js",
    x = () => "../../components/swiperBox.js",
    R = () => "../components/dailyPrice.js",
    j = e.defineComponent({
      __name: "hotel",
      setup(h) {
        const y = i.useXshReport(),
          {
            subscribeMessage: D
          } = c.useSubscribeMessage(["NEW_ACTIVITY_MA", "POINT_VALID_MA", "TRAVEL_GUIDE_MA"]),
          T = r.useAdReport();
        setTimeout(() => {
          T("PRODUCT_VIEW"), T("VIEW_CONTENT", {
            object: "hotelDetail"
          })
        }, 300);
        const C = e.ref(),
          b = e.ref([]),
          E = e.ref(9999),
          {
            scrollTop: P,
            onPageScroll: k
          } = u.useScroll(),
          x = e.ref({}),
          R = e.ref(),
          j = e.ref(),
          M = e.ref([]);
        let H = e.reactive({});
        const I = e.ref({}),
          G = e.ref(!0),
          L = e.ref(!1),
          S = e.ref(!1);
        e.ref(!1);
        const A = f.getStorage("config"),
          N = e.ref(f.getStorage("user")),
          w = e.ref(e.dayjs().format("YYYY-MM-DD")),
          B = e.ref(e.dayjs().add(1, "days").format("YYYY-MM-DD")),
          _ = e.computed(() => w.value && B.value ? e.dayjs(B.value).diff(e.dayjs(w.value), "day") : 1),
          F = e.ref(""),
          q = e.ref(""),
          V = e.ref(""),
          O = e.ref(a.defaultOtaChannel),
          Y = e.ref(""),
          U = e.ref({
            gcHotel: {}
          }),
          W = e.ref({}),
          $ = e.ref([]),
          J = e.ref([]),
          z = e.computed(() => l.formatFeedProductList({
            list: (J.value || []).map(e => ({
              ...e,
              type: "DestPackage" === e.categorySub ? "DestPackage" : "Travel"
            }))
          })),
          X = e.ref({
            gcRoomExtra: {}
          }),
          K = e.ref({}),
          Z = e.ref({}),
          Q = e.ref(""),
          ee = e.computed(() => {
            const a = e.dayjs(w.value);
            return e.dayjs(B.value).diff(a, "d")
          }),
          ae = e.ref(),
          oe = e.ref(null),
          te = e.ref("");
        e.reactive({
          indicatorDots: !1,
          autoplay: !1,
          slot: !0,
          dotPosStyle: "bottom:-14px;left:50%;transform: translate(-50%);background:rgba(204, 204, 204, 0.28);",
          dotStyle: "background:#000;"
        });
        const le = e.reactive({
            indicatorDots: !1,
            autoplay: !0,
            dotPosStyle: "left: 50%;transform: translateX(-50%);bottom:12px;"
          }),
          re = e.ref([]),
          ue = e.ref(!1),
          ce = e.ref(""),
          ie = e.ref("room"),
          ne = e.ref(""),
          se = e.ref(0),
          ve = e.ref(0),
          de = e.ref(0),
          pe = e.ref(!1),
          me = e.ref("#42535c"),
          ge = e.ref(!1),
          fe = e.ref(!1),
          he = e.ref({
            bottom: "120px"
          }),
          ye = e.ref(200),
          De = e.ref(200),
          Te = e.ref(200),
          Ce = e.ref(-85),
          be = e.ref(-132),
          Ee = e.ref(0),
          Pe = e.ref(0),
          ke = e.ref(!1),
          xe = e.ref(0),
          Re = e.ref(44),
          je = e.ref(!1),
          Me = e.ref(!1),
          He = e.ref(!1);

        function Ie() {
          ve.value = de.value, e.nextTick$1(() => {
            ve.value = 0
          })
        }

        function Ge(e) {
          Ee.value = e.touches[0].clientY, Pe.value = 0
        }

        function Le(e) {
          const a = e.touches[0].clientY - Ee.value;
          Pe.value = a
        }

        function Se(e) {
          const a = Pe.value;
          a < 0 ? Ne(!1) : a > 0 && Ne(!0)
        }

        function Ae() {
          C.value.showDialog()
        }

        function Ne(e) {
          G.value = e, se.value = 0, pe.value = !1
        }

        function we(e) {
          const a = e.detail.scrollTop;
          pe.value = a > 100
        }

        function Be() {
          ve.value = de.value, e.nextTick$1(() => {
            ve.value = 100
          })
        }

        function _e(e) {
          0 === e && (x.value = {})
        }

        function Fe(e) {
          x.value = e
        }

        function qe(a) {
          if (!N.value || !N.value.memberId) return g.toLogin(), !1;
          console.log(a), ne.value = a.travelGroupCode, n.api.interfaceTransfer({
            query: {
              unitCode: A.hotelGroupCode,
              travelGroupCode: ne.value,
              ota: "DIRECT",
              otaChannel: O.value
            },
            config: {
              interfaceType: "POST",
              interfaceModule: "GC_PRODUCT_JOURNEY",
              interfaceMethod: "/api/travelGroup/findTravelProductForWechatDetail",
              interfaceFrom: "GC",
              hotelGroupCode: A.hotelGroupCode
            }
          }).then(a => {
            if (1 === a.result && 0 === a.retVal.result) {
              const o = a.retVal.retVal;
              H = JSON.parse(JSON.stringify(o[0])), H.itineraryDtos.length > 0 && (H.itineraryDtos[0].active = !0, I.value = H.itineraryDtos[0]), H.topImage.forEach(e => {}), n.api.interfaceTransfer({
                query: {
                  beginDate: e.dayjs().format("YYYY-MM-DD"),
                  endDate: e.dayjs().add(6, "month").format("YYYY-MM-DD"),
                  cardLevel: N.value.cardLevel,
                  cardType: N.value.cardType,
                  gcLevel: "",
                  hotelGroupCode: A.hotelGroupCode,
                  itineraryCode: I.value.itineraryCode,
                  ota: "DIRECT",
                  otaChannel: O.value,
                  travelType: H.travelType
                },
                config: {
                  interfaceType: "POST",
                  interfaceModule: "GC_PRODUCT_JOURNEY",
                  interfaceMethod: "/api/travelGroup/listTravelProductDailyDetail",
                  interfaceFrom: "GC",
                  hotelGroupCode: A.hotelGroupCode
                }
              }).then(a => {
                1 === a.result && 0 === a.retVal.result && (a.retVal.retVal.forEach(a => {
                  a.specificationsPriceDtos.forEach(o => {
                    const t = a;
                    t.embarkDate = a.groupBeginDate, t.MMdd = e.dayjs(a.groupBeginDate).format("MM/DD"), "0" === e.dayjs(a.groupBeginDate).format("d") && (t.week = "周日"), "1" === e.dayjs(a.groupBeginDate).format("d") && (t.week = "周一"), "2" === e.dayjs(a.groupBeginDate).format("d") && (t.week = "周二"), "3" === e.dayjs(a.groupBeginDate).format("d") && (t.week = "周三"), "4" === e.dayjs(a.groupBeginDate).format("d") && (t.week = "周四"), "5" === e.dayjs(a.groupBeginDate).format("d") && (t.week = "周五"), "6" === e.dayjs(a.groupBeginDate).format("d") && (t.week = "周六"), t.number = a.productAvailNum, t.price = o.price, t.payType = o.payType, t.specificationsType = o.specificationsType, t.groupBeginDateFormat = e.dayjs(t.groupBeginDate).format("MM月DD日"), t.groupEndDateFormat = e.dayjs(t.groupEndDate).format("MM月DD日"), M.value.push(t)
                  })
                }), R.value.createDate(M.value), j.value.showDialog())
              })
            }
          })
        }
        const Ve = e.computed(() => {
          const e = d.getMenuButtonBoundingClientRect();
          return console.log("menuButton:", e), `right:${e.right-e.left+15}px;`
        });

        function Oe(e) {
          $.value[e.roomIndex].travelList = $.value[e.roomIndex].travelWechatHotelDetailDtos
        }

        function Ye(a) {
          if (!N.value || !N.value.memberId) return g.toLogin(), !1;
          const o = a.roomType,
            t = a.room;
          console.log(e.toRaw(o)), console.log(e.toRaw(t));
          const l = {
            productCode: o.productCode,
            fromDate: w.value,
            toDate: B.value,
            productName: t.roomDescript,
            rateCode: o.pmsRateCode,
            rmtype: o.roomType,
            ticket: o.ticket,
            payMethod: o.payMethod,
            hotelCode: Y.value,
            descript: U.value.gcHotel.descript,
            address: U.value.gcHotel.address1,
            resrvNumMin: o.resrvNumMin,
            prepayTimeLimit: o.prepayTimeLimit,
            prepayHoldTimeMax: o.prepayHoldTimeMax,
            prepayMethod: o.prepayMethod,
            cancelPrehour: o.cancelPrehour,
            cancelPretime: o.cancelPretime,
            cancelPredays: o.cancelPredays,
            cancelCondition: o.cancelCondition,
            hotelGroupCode: o.hotelGroupCode,
            stayTime: o.stayTime,
            otaChannel: O.value,
            sourceActivityId: F.value,
            sourceActivityName: V.value
          };
          f.setStorage("hotelOrderRoom", Object.assign(o, {
            roomDescript: t.roomDescript,
            gcRoomExtra: t.gcRoomExtra
          })), e.index.navigateTo({
            url: "/pagesC/order/bookInfo?" + g.createUrl(l)
          })
        }

        function Ue(a) {
          console.log(e.toRaw(a)), te.value = a.room.roomDescript, ie.value = a.type, console.log(ie.value), "pack" === a.type && (te.value = a.pack.title, Z.value = a.pack);
          const o = [];
          a.room.gcRoomExtra.picturesList.forEach(e => {
            o.push({
              imgUrl: e
            })
          }), X.value = a.room, K.value = a.roomType, 0 === o.length && o.push({
            imgUrl: "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/hotel/images/noPic.png"
          }), re.value = o, n.api.interfaceTransfer({
            query: {
              hotelGroupCode: A.hotelGroupCode,
              hotelCode: Y.value,
              roomType: K.value.roomType
            },
            config: {
              interfaceType: "POST",
              interfaceModule: "GC_PRODUCT_JOURNEY",
              interfaceMethod: "/api/travelGroup/findPicTypeByRoomType",
              interfaceFrom: "GC",
              hotelGroupCode: A.hotelGroupCode
            }
          }).then(e => {
            1 === e.result && 0 === e.retVal.result && (b.value = e.retVal.retVal, b.value.forEach(e => {
              e.listNew = [], e.list.forEach((a, o) => {
                const t = Math.trunc(o / 10);
                e.listNew[t] || (e.listNew[t] = []), e.listNew[t].push(a)
              })
            }))
          }), oe.value.showDialog()
        }

        function We(e) {
          e.checkInDay && e.checkOutDay && (w.value = e.checkInDay, B.value = e.checkOutDay, Je())
        }

        function $e() {
          ae.value.showDialog()
        }

        function Je() {
          (function(a) {
            const l = {
              cardLevel: "",
              cardType: "",
              fromDate: w.value,
              hotelCodes: [Y.value],
              hotelGroupCode: A.hotelGroupCode,
              isBuyOnBehalf: "",
              isWeeHour: "",
              langCode: "zh-CN",
              meetingType: "",
              ota: "WECHAT",
              otaChannel: O.value,
              queryNormalProduct: !1,
              queryPmsCompanyProducts: "F",
              queryRoomSetRemark: !1,
              showType: 1,
              srcHotelGroupCode: A.hotelGroupCode,
              toDate: B.value,
              orderPrice: "asc"
            };
            N.value && N.value.memberId && (l.cardLevel = N.value.cardLevel, l.cardType = N.value.cardType), Me.value = !0, n.api.interfaceTransfer({
              config: {
                interfaceType: "POST",
                interfaceModule: "GC_PRODUCT_JOURNEY",
                interfaceMethod: "api/travelGroup/hotelListAllForSongZan",
                interfaceFrom: "GC",
                hotelGroupCode: A.hotelGroupCode
              },
              query: l
            }).then(a => {
              if (1 === a.result && 0 === a.retVal.result) {
                if (a.retVal = a.retVal.retVal, je.value = !1, !a.retVal || !a.retVal[0]) return t.jAlert3(`酒店代码为:${Y.value},未返回酒店详情`), !1;
                const l = a.retVal[0];
                m.adaptor.updatePageProperties({
                  hotel_name: l.gcHotel.descript,
                  detail_address: l.gcHotel.address1,
                  price: l.minPrice
                }), l.productRoomList.forEach((e, a) => {
                  e.roomPicCount = 1, e.gcRoomExtra || (e.gcRoomExtra = {}), e.gcRoomExtra.pictures ? e.gcRoomExtra.picturesList = e.gcRoomExtra.pictures.split(";") : e.gcRoomExtra.picturesList = [], e.roomPicCount += e.gcRoomExtra.picturesList.length, e.gcProductBases.forEach((e, a) => {
                    e.showName = e.name, N.value && N.value.memberId && "MEM" === e.prodCategorySub && (e.showName = `${N.value.cardLevelDescript}会员价（${e.name}）`)
                  }), e.travelList = [], e.travelWechatHotelDetailDtos.forEach(e => {
                    e.unit = "元", e.priceDtos.forEach(a => {
                      "CASH" === a.payType && (e.price = s.valFormat(a.adultPrice)), "INTEGRALCASH" === a.payType && (e.price2 = `积分+现金价：${s.valFormat(a.integral)}积分+${s.valFormat(a.adultPrice)}元/套`)
                    }), e.specificationsPriceDtos.forEach(a => {
                      "PACKAGE" === a.priceModel && (e.unit = a.priceModelDesc, e.price = s.valFormat(a.price))
                    })
                  }), e.travelWechatHotelDetailDtos.length > 0 && e.travelList.push(e.travelWechatHotelDetailDtos[0])
                }), $.value = l.productRoomList.map(e => {
                  var a, o;
                  return e.gcRoomExtra = e.gcRoomExtra || {}, (null == (a = null == e ? void 0 : e.gcRoomExtra) ? void 0 : a.logo) ? e.gcRoomExtra.logo = v.imageMogr2(e.gcRoomExtra.logo, "750x") : e.gcRoomExtra.logo = "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/hotel/images/noPic.png", (null == (o = null == e ? void 0 : e.gcRoomExtra) ? void 0 : o.pictures) && (e.gcRoomExtra.pictures = e.gcRoomExtra.pictures.split(";").map(e => v.imageMogr2(e, "750x"))), e
                }), U.value = l, l.roomImagesList && l.roomImagesList.length > 0 && (Q.value = l.roomImagesList[0].pictures), l.gcHotelExtra && l.gcHotelExtra.logo && (Q.value = l.gcHotelExtra.logo), o = Q.value, e.index.request({
                  url: o + "?imageAve",
                  data: {},
                  method: "GET",
                  success: e => {
                    e.data && e.data.RGB && (me.value = g.convertToCSSColor(e.data.RGB))
                  },
                  fail: () => {}
                }), L.value || (W.value = {
                  commodity_id: Y.value,
                  commodity_name: U.value.gcHotel.descript,
                  series: q.value
                }, p.qdTracker.setData(W.value), p.qdTracker.track("hoteldetail_view", {
                  hotel_name: l.gcHotel.descript,
                  checkin_date: w.value,
                  checkout_date: B.value
                })), L.value = !0
              } else t.jAlert3(a.msg || a.retVal.msg);
              var o;
              console.log(a)
            }).catch(e => {
              (null == e ? void 0 : e.code) !== o.RateLimitStatusCode && (null == e ? void 0 : e.status) !== o.RateLimitStatusCode || (je.value = !0)
            }).finally(() => {
              Me.value = !1
            })
          })(),
          function() {
            const e = {
              beginDate: w.value,
              endDate: B.value,
              cardLevel: "",
              companyLevel: "",
              cardType: "",
              category: "",
              categorySub: "",
              companyCode: "",
              gcLevel: "",
              ota: "",
              otaChannel: O.value,
              dayNight: "",
              rendezvous: "",
              travelGroupCode: "",
              travelType: "",
              hotelCode: Y.value,
              hotelGroupCode: A.hotelGroupCode
            };
            N.value && N.value.memberId && (e.cardLevel = N.value.cardLevel, e.companyLevel = N.value.companyLevel, e.cardType = N.value.cardType), n.api.travelProductList(e).then(e => {
              if (0 === e.result) {
                const a = e.retVal;
                e.retVal.forEach(e => {
                  e.showBookBtn = !0
                }), J.value = a
              }
            })
          }()
        }

        function ze() {
          if (!N.value || !N.value.memberId) return g.toLogin(), !1;
          ue.value ? async function() {
            if (S.value) return !1;
            S.value = !0, await D(), n.api.deleteGoodsCollection([ce.value]).then(e => {
              S.value = !1, 1 === e.result ? (t.jAlert3("取消收藏"), ue.value = !1) : t.jAlert3(e.msg)
            })
          }(): async function() {
            if (S.value) return !1;
            S.value = !0, await D(), n.api.addGoodsCollection({
              goodsId: Y.value,
              goodsName: U.value.gcHotel.descript,
              hotelCode: A.hotelCode,
              hotelGroupCode: A.hotelGroupCode,
              memberId: N.value.memberId,
              productType: "hotel",
              picture: Q.value,
              price: U.value.minPrice
            }).then(e => {
              S.value = !1, 1 === e.result ? (T("ADD_TO_WISHLIST"), p.qdTracker.track("collect", {
                collect_type: "产品"
              }), t.jAlert3("收藏成功"), ue.value = !0, Xe()) : t.jAlert3(e.msg)
            })
          }()
        }

        function Xe() {
          n.api.getGoodsIsCollection({
            goodsId: Y.value,
            hotelGroupCode: A.hotelGroupCode,
            hotelCode: A.hotelCode,
            memberId: N.value.memberId
          }).then(e => {
            1 === e.result && e.retVal && e.retVal.length > 0 && (ue.value = !0, ce.value = e.retVal[0].id)
          })
        }

        function Ke() {
          G.value ? Te.value = ye.value : Te.value = De.value
        }

        function Ze(e) {
          const a = e.detail.scrollTop;
          e.detail.scrollHeight, de.value = a, G.value || (a <= 100 ? (ge.value = !1, fe.value = !1, ke.value = !1) : (console.log(a, 99999999999), ke.value = a > 400, ge.value = !1, fe.value = !1))
        }

        function Qe() {
          T("SHARE")
        }
        return e.watch(G, () => {
          Ke()
        }), e.onMounted(() => {
          const a = "isFirst_" + Y.value;
          "F" === f.getStorage(a) && (G.value = !1), f.setStorage(a, "F"), setTimeout(() => {
            ae.value.init({
              checkInDay: w.value,
              checkOutDay: B.value,
              stayMax: 7
            })
          }, 500), Je(), N.value && N.value.memberId && Xe(), e.index.getSystemInfo({
            success: e => {
              const a = e.statusBarHeight || 0;
              E.value = a || 0, ye.value = e.screenHeight - 62, De.value = 226 + a, be.value = -(De.value - 44 - a - 62), xe.value = e.statusBarHeight || 0, Re.value = (e.statusBarHeight || 0) + Re.value, Ke(), He.value = !0
            },
            fail(e) {
              console.log(e)
            }
          })
        }), e.onLoad(e => {
          y.report(y.actionTypeEnum.visit, null), e.hotelCode && (Y.value = e.hotelCode), e.fromDate && (w.value = e.fromDate), e.toDate && (B.value = e.toDate), e.sourceActivityId && (F.value = e.sourceActivityId), e.sourceActivityName && (V.value = decodeURIComponent(e.sourceActivityName)), e.seriesDesc && (q.value = decodeURIComponent(e.seriesDesc))
        }), e.onUnload(() => {
          p.qdTracker.resetData(W.value)
        }), k(e => {
          P.value = e.scrollTop
        }), (a, o) => {
          return e.e({
            a: je.value
          }, je.value ? {
            b: e.p({
              color: "#fff",
              "bg-color": "#000"
            }),
            c: e.o(Je),
            d: e.p({
              show: je.value
            })
          } : {}, {
            e: !Me.value && !je.value && He.value
          }, Me.value || je.value || !He.value ? {} : {
            f: e.t(de.value > 150 ? (t = U.value.gcHotel.descript, 4, t.length > 4 ? t.slice(0, 4) + "..." : t) : ""),
            g: de.value > 150 ? "#000" : "#fff",
            h: e.s(Ve.value),
            i: e.o(Qe),
            j: e.p({
              color: de.value > 150 ? "#000" : "#fff",
              "bg-color": de.value > 150 ? "#fff" : "",
              "back-filter": pe.value ? "blur(20px)" : ""
            })
          }, {
            k: !L.value
          }, (L.value, {}), {
            l: L.value
          }, L.value ? e.e({
            m: e.unref(v.imageMogr2)(Q.value, "750x"),
            n: De.value + "px",
            o: !G.value
          }, G.value ? {} : {
            p: e.t(U.value.gcHotel.descript),
            q: e.t(U.value.altitude),
            r: e.o(e => Ne(!0))
          }, {
            s: `linear-gradient(180deg, rgba(117, 131, 145, 0) 0%, ${me.value} 100%)`,
            t: G.value
          }, (G.value, {}), {
            v: G.value ? Ce.value + "px" : be.value + "px",
            w: G.value
          }, G.value ? {
            x: e.t(U.value.gcHotel.descript),
            y: e.t(U.value.altitude),
            z: e.p({
              content: U.value.gcHotel.htmlInfo
            }),
            A: se.value,
            B: e.o(we),
            C: pe.value ? 1 : ""
          } : {}, {
            D: G.value ? 1 : "",
            E: me.value,
            F: G.value ? 4 : "",
            G: G.value ? Te.value + "px" : "",
            H: Te.value + "px",
            I: G.value ? "-1" : "",
            J: G.value ? 1 : "",
            K: e.o(Ge),
            L: e.o(Le),
            M: e.o(Se),
            N: U.value.minPrice
          }, U.value.minPrice ? {
            O: e.t(e.unref(s.valFormat)(U.value.minPrice))
          } : {}, {
            P: ue.value ? 1 : "",
            Q: ue.value ? 1 : "",
            R: ue.value ? "" : 1,
            S: e.o(ze),
            T: e.f(U.value.gcHotelThemes, (a, o, t) => ({
              a: e.t(a.descript),
              b: o
            })),
            U: e.o(Ge),
            V: e.o(Le),
            W: e.o(Se),
            X: e.t(U.value.gcHotel.address1),
            Y: e.o(a => function(a) {
              const o = e.coordtransform.bd09togcj02(a.hotelLongitude, a.hotelLatitude);
              e.index.openLocation({
                latitude: Number(o[1]),
                longitude: Number(o[0]),
                scale: 28,
                name: a.descript,
                address: a.address1
              })
            }(U.value.gcHotel)),
            Z: e.o(a => {
              return o = U.value.gcHotel.phone, void e.index.makePhoneCall({
                phoneNumber: o
              });
              var o
            }),
            aa: ke.value
          }, (ke.value, {}), {
            ab: ke.value
          }, ke.value ? {
            ac: Re.value + "px"
          } : {}, {
            ad: e.t(e.unref(s.timeFilterMD)(w.value)),
            ae: e.t(ee.value),
            af: e.t(e.unref(s.timeFilterMD)(B.value)),
            ag: e.o($e),
            ah: ke.value ? 1 : "",
            ai: e.o(Ue),
            aj: e.o(Ye),
            ak: e.o(Oe),
            al: e.o(qe),
            am: e.p({
              "product-room-list": $.value,
              "from-date": w.value,
              "to-date": B.value,
              hotel: U.value.gcHotel,
              user: e.unref(N)
            }),
            an: 0 === $.value.length
          }, 0 === $.value.length ? {
            ao: e.p({
              tips: "暂无可订房型"
            })
          } : {}, {
            ap: U.value && U.value.gcHotelPicTags && U.value.gcHotelPicTags.length > 0
          }, U.value && U.value.gcHotelPicTags && U.value.gcHotelPicTags.length > 0 ? e.e({
            aq: U.value && U.value.gcHotelPicTags && U.value.gcHotelPicTags.length > 0
          }, U.value && U.value.gcHotelPicTags && U.value.gcHotelPicTags.length > 0 ? {
            ar: e.f(U.value.gcHotelPicTags, (a, o, t) => ({
              a: a.logo,
              b: e.t(a.descript),
              c: o
            }))
          } : {}) : {}, {
            as: J.value.length > 0
          }, J.value.length > 0 ? {
            at: e.p({
              list: z.value
            })
          } : {}, {
            av: G.value ? "4" : "",
            aw: G.value ? 1 : "",
            ax: !G.value,
            ay: ve.value,
            az: e.o(Ze)
          }) : {}, {
            aA: L.value
          }, L.value ? e.e({
            aB: ge.value && !G.value
          }, ge.value && !G.value ? {
            aC: e.o(Ae),
            aD: e.o(Be)
          } : {}, {
            aE: !ge.value && !G.value
          }, ge.value || G.value ? {} : {
            aF: e.p({
              "tracking-data": {
                commodity_id: Y.value,
                commodity_name: U.value.gcHotel.descript
              }
            })
          }) : {}, {
            aG: e.sr(ae, "acdc94be-8", {
              k: "calendarCompent"
            }),
            aH: e.o(We),
            aI: e.p({
              "check-in-day": w.value,
              "check-out-day": B.value
            }),
            aJ: e.p({
              slides: re.value,
              "swiper-config": le
            }),
            aK: e.t(X.value.gcRoomExtra.squareMeter),
            aL: e.t(X.value.gcRoomExtra.bedType),
            aM: e.t(X.value.gcRoomExtra.floor),
            aN: e.p({
              content: X.value.gcRoomExtra.abstracts,
              "container-style": "line-height:22px"
            }),
            aO: e.p({
              content: X.value.gcRoomExtra.detail,
              "container-style": "line-height:22px"
            }),
            aP: e.f(b.value, (a, o, t) => e.e({
              a: a.listNew.length > 0
            }, a.listNew.length > 0 ? {
              b: e.t(a.descript),
              c: e.f(a.listNew, (a, o, t) => ({
                a: e.f(a, (a, o, t) => ({
                  a: a.logo,
                  b: e.t(a.descript),
                  c: o
                })),
                b: o
              }))
            } : {}, {
              d: o
            })),
            aQ: e.p({
              content: U.value.gcHotel.resrvNoticePp
            }),
            aR: e.p({
              content: U.value.gcHotel.resrvNoticeCs
            }),
            aS: "room" === ie.value
          }, "room" === ie.value ? e.e({
            aT: e.t(e.unref(s.valFormat)(K.value.pbMinPriceWithPromotion)),
            aU: _.value > 1
          }, (_.value, {}), {
            aV: "T" === K.value.bookAble
          }, "T" === K.value.bookAble ? e.e({
            aW: K.value.minSaleNum <= 0
          }, K.value.minSaleNum <= 0 ? {} : e.e({
            aX: !(e.unref(N) && e.unref(N).memberId) && "F" === K.value.notMemberBook
          }, e.unref(N) && e.unref(N).memberId || "F" !== K.value.notMemberBook ? {
            aZ: e.o(e => {
              Ye({
                roomType: K.value,
                room: X.value
              })
            })
          } : {
            aY: e.o(e => function() {
              if (!N.value || !N.value.memberId) return g.toLogin(), !1
            }())
          })) : {}) : {}, {
            ba: "pack" === ie.value
          }, "pack" === ie.value ? {
            bb: e.t(e.unref(s.valFormat)(Z.value.price)),
            bc: e.t(Z.value.price2),
            bd: e.o(e => function(e) {
              if (!N.value || !N.value.memberId) return g.toLogin(), !1;
              oe.value.hideDialog(), qe(e)
            }(Z.value))
          } : {}, {
            be: e.sr(oe, "acdc94be-9", {
              k: "roomCompent"
            }),
            bf: e.p({
              title: te.value
            }),
            bg: x.value.groupBeginDateFormat
          }, x.value.groupBeginDateFormat ? {
            bh: e.t(x.value.groupBeginDateFormat),
            bi: e.t(x.value.groupEndDateFormat),
            bj: e.o(e => function() {
              const e = {
                title: H.title,
                itineraryDesc: I.value.itineraryDesc,
                groupBeginDateFormat: x.value.groupBeginDateFormat,
                groupEndDateFormat: x.value.groupEndDateFormat,
                groupBeginDate: x.value.groupBeginDate,
                groupEndDate: x.value.groupEndDate,
                number: 1,
                travelGroupCode: ne.value,
                travelType: H.travelType,
                itineraryCode: I.value.itineraryCode,
                price: x.value.price,
                meetingPoint: H.rendezvous,
                specificationsPriceDtos: x.value.specificationsPriceDtos,
                productUrl: "",
                priceDtos: x.value.priceDtos,
                orderType: H.categorySub,
                orderTypeDesc: I.value.categorySubDesc,
                isSigning: H.isSigning,
                priceModel: H.priceModel
              };
              H.urls && H.urls.forEach(a => {
                "LISTIMAGE" === a.pictureType && (e.productUrl = a.url)
              }), f.setStorage("travelInfo", e), g.goPage(`/pagesB/travel/confirmOrder?sourceActivityId=${F.value}&sourceActivityName=${V.value}`)
            }())
          } : {}, {
            bk: e.sr(R, "acdc94be-16,acdc94be-15", {
              k: "dailyPrices"
            }),
            bl: e.o(Fe),
            bm: e.sr(j, "acdc94be-15", {
              k: "chooseDate"
            }),
            bn: e.o(_e),
            bo: e.p({
              title: "选择入住日期"
            }),
            bp: fe.value && !G.value
          }, fe.value && !G.value ? {
            bq: e.p({
              "back-to-top-style": he.value,
              "scroll-fn": Ie
            })
          } : {}, {
            br: e.sr(C, "acdc94be-18", {
              k: "kf"
            }),
            bs: e.p({
              title: "一键咨询"
            })
          });
          var t
        }
      }
    });
  j.__runtimeHooks = 1;
  const M = e._export_sfc(j, [
    ["__scopeId", "data-v-acdc94be"]
  ]);
  wx.createPage(M)
}();