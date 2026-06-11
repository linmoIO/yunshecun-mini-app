! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    a = require("../../base/channel.js"),
    t = require("../../base/common.js"),
    i = require("../../base/jAlert/jAlert.js"),
    o = require("../../hooks/useAdReport.js"),
    r = require("../../hooks/useScroll.js"),
    l = require("../../hooks/useSubscribeMessage.js"),
    n = require("../../hooks/useXhsReport.js"),
    u = require("../../utils/api.js"),
    c = require("../../utils/filter.js"),
    s = require("../../utils/helper.js"),
    d = require("../../utils/qdTracker.js"),
    v = require("../../utils/utils.js"),
    p = require("../../utils/wxuser.js");
  Math || (h + D + C + y + T + f + m + g)();
  const m = () => "../../components/backToTop.js",
    f = () => "../../components/bottomDialog.js",
    y = () => "../../components/collapse.js",
    h = () => "../../components/coustomHead.js",
    g = () => "../../components/kfDialog.js",
    D = () => "../../components/new/ErrorLimiting.js",
    C = () => "../../components/swiperBox.js",
    T = () => "../components/dailyPrice.js",
    P = e.defineComponent({
      __name: "dailyActivityDetail",
      setup(m) {
        const f = n.useXshReport(),
          {
            subscribeMessage: y
          } = l.useSubscribeMessage(["NEW_ACTIVITY_MA", "POINT_VALID_MA", "TRAVEL_GUIDE_MA"]),
          h = o.useAdReport();
        setTimeout(() => {
          h("PRODUCT_VIEW"), h("VIEW_CONTENT")
        }, 300);
        const g = e.ref(a.defaultActivityChannel),
          {
            scrollTop: D,
            onPageScroll: C
          } = r.useScroll(),
          T = p.getStorage("config"),
          P = p.getStorage("user"),
          x = e.ref(),
          j = e.ref(),
          b = e.ref({}),
          _ = e.ref(),
          S = e.reactive({
            indicatorDots: !1,
            autoplay: !1,
            dotPosStyle: "left: 50%;transform: translateX(-50%);bottom:12px;"
          }),
          A = e.ref(0),
          I = e.ref(),
          L = e.ref(!1),
          M = e.ref(!1),
          w = e.ref(!1),
          N = e.ref([]),
          k = e.ref(-1),
          E = e.ref();
        e.ref(!1);
        const R = e.ref([]),
          G = e.ref(!0),
          Y = e.ref(1),
          q = e.ref(0),
          V = e.ref(!1),
          F = e.ref({}),
          W = e.ref({
            minPriceDto: {},
            canResrv: ""
          });
        e.ref(!1);
        const U = e.ref([]),
          H = e.ref([]),
          O = e.ref({}),
          z = e.ref([]),
          B = e.ref(1),
          $ = e.ref(!1),
          Q = e.ref(!1);
        e.ref(e.dayjs().format("YYYY-MM-DD"));
        const X = e.ref({}),
          J = e.reactive([]),
          K = e.ref("");

        function Z(e) {
          E.value.changeCurrent(e)
        }

        function ee(e) {
          k.value = e
        }

        function ae(e) {
          b.value = e, H.value = e.dateList.calendarWithPriceDto, e.time && (O.value = e.nextTime)
        }

        function te(a) {
          a.canTap = !0, a.isActive = !0, a.number = a.sumCapacity, b.value = a, e.dayjs().add(0 === a.earlyDay ? -24 : a.earlyDay, "hour"), H.value = a.dateList.calendarWithPriceDto, O.value = {}, j.value.chooseTime({}), j.value.chooseDay(a)
        }

        function ie(e) {
          e.canSelect && (O.value = e, b.value.time = `${e.startDate}-${e.endDate}`, b.value.onSaleCode = e.onSaleCode, j.value.chooseTime(e))
        }

        function oe() {
          le() || "F" !== W.value.canResrv && (P && P.memberId ? (U.value.length > 0 ? re() : i.jAlert3("暂无可预订时间"), _.value.showDialog()) : v.toLogin())
        }

        function re() {
          if (!b.value.onSaleCode) {
            const e = U.value.find(e => -1 !== e.dateList.calendarWithPriceDto.findIndex(e => e.canSelect) && e.show),
              a = e.calendarWithPriceDto.find(e => e.canSelect);
            te(e), ie(a || e.calendarWithPriceDto[0])
          }
        }

        function le() {
          return !!L.value && (e.index.showToast({
            title: "预览链接无法操作，请从正常入口进入。",
            icon: "none",
            duration: 5e3
          }), !0)
        }

        function ne() {
          if (le()) return;
          if ("F" === W.value.canResrv) return;
          if (!b.value.onSaleCode) return void oe();
          if (!P || !P.memberId) return v.toLogin(), !1;
          let e = [];
          const a = [];
          W.value.minPriceDto.payType && (e = W.value.minPriceDto.payType.split(",")), e.forEach(e => {
            const t = {
              credit: W.value.minPriceDto.credit,
              mixCredit: W.value.minPriceDto.mixCredit,
              mixPrice: W.value.minPriceDto.mixPrice,
              payType: e,
              price: W.value.minPriceDto.price,
              priceType: W.value.minPriceDto.priceType
            };
            a.push(t)
          });
          const t = {
            title: W.value.name,
            activityCode: I.value,
            hotels: z.value,
            minSaleSize: W.value.minSaleSize,
            minPriceList: a,
            curDailyPrice: b.value,
            price: W.value.minPriceDto.price,
            dailyPriceList: U.value,
            ...W.value
          };
          d.qdTracker.track("book_click", {
            commodity_id: I.value,
            commodity_name: t.title,
            travel_date: t.curDailyPrice.embarkDate
          }), p.setStorage("dailyActivityInfo", t), ue("/pagesE/dailyActivity/submitOrder")
        }

        function ue(a) {
          le() || e.index.navigateTo({
            url: a
          })
        }

        function ce(a) {
          const t = e.index.createSelectorQuery(),
            i = e.index.createSelectorQuery(),
            o = [];
          G.value = !1, t.selectAll(".topContent").boundingClientRect(), i.selectAll(".contentHight").boundingClientRect(), t.exec(t => {
            let r = t[0][0].height - 15;
            i.exec(t => {
              for (let e = 0; e < t[0].length; e++) o.push(t[0][e].height + 32);
              for (let e = 0; e < a - 1; e++) r += o[e];
              e.index.pageScrollTo({
                scrollTop: r,
                duration: 200,
                success: e => {
                  Y.value = a, setTimeout(() => {
                    G.value = !0
                  }, 300)
                }
              })
            })
          })
        }

        function se() {
          Q.value = !0, u.api.interfaceTransfer({
            config: {
              interfaceType: "GET",
              interfaceModule: "GC_ACTIVITIES_CENTER",
              interfaceMethod: "api/activity/getOneActivityWithPrice",
              interfaceFrom: "GC",
              hotelGroupCode: T.hotelGroupCode
            },
            query: {
              unitCode: T.hotelGroupCode,
              activityCode: I.value
            }
          }).then(a => {
            if (1 === a.result && 0 === a.retVal.result) {
              const i = a.retVal.retVal;
              $.value = !1, (i.roundPictures ? i.roundPictures.split(";") : []).forEach(e => {
                  J.push({
                    imgUrl: e
                  })
                }), i.pay = i.minPriceDto.payType.includes("INTEGRALCASH") ? "mix" : "money", i.activityTags = i.activityTags ? i.activityTags.split(",") : [], W.value = i, X.value = {
                  commodity_id: I.value,
                  commodity_name: i.name,
                  series: K.value
                }, d.qdTracker.setData(X.value), d.qdTracker.track("mini_productdetail_view", {
                  commodity_id: I.value,
                  commodity_name: i.name
                }),
                function(e) {
                  if (z.value.length >= B.value) return !1;
                  const a = {
                    hotelCodes: e,
                    otaChannel: g.value,
                    hotelGroupCodes: T.hotelGroupCode,
                    cardLevel: "",
                    hasPriceMin: "T",
                    clientLatitude: "",
                    clientLongitude: "",
                    position: "",
                    positionValue: "",
                    keyWord: "",
                    pageSize: 9999,
                    firstResult: 0,
                    cardType: "",
                    appid: T.appid,
                    componentAppid: T.componentAppid
                  };
                  u.api.findHotel(a).then(e => {
                    1 === e.result && (e.retVal.resultInfos.forEach((e, a) => {
                      if (e.pictures ? e.picturesList = e.pictures.split(";") : e.picturesList = [], e.promotionTag ? e.promotionTags = e.promotionTag.split(",") : e.promotionTags = [], e.themeName && (e.promotionTags = e.promotionTags.concat(e.themeName.split(","))), e.promotionTags.length > 3 && (e.promotionTags = e.promotionTags.slice(0, 3)), e.distance > 1e3 ? (e.distance = (e.distance / 1e3).toFixed(2), e.distanceUnit = "公里") : e.distanceUnit = "米", e.gcHotelPicTag = "", e.gcHotelPicTags.length > 0) {
                        const a = e.gcHotelPicTags.filter(e => "08" === e.type);
                        a.length > 0 && (e.gcHotelPicTag = a[0].descript)
                      }
                    }), z.value = z.value.concat(e.retVal.resultInfos))
                  }).catch(e => {
                    console.log(e)
                  })
                }(i.belongHotels), t = i.questions, u.api.interfaceTransfer({
                  query: {
                    isHalts: "F",
                    unitCode: T.hotelGroupCode,
                    problemCode: t
                  },
                  config: {
                    interfaceType: "POST",
                    interfaceModule: "GC_PRODUCT_JOURNEY",
                    interfaceMethod: "/api/itinerary/listTravelProblem",
                    interfaceFrom: "GC",
                    hotelGroupCode: T.hotelGroupCode
                  }
                }).then(e => {
                  1 === e.result && 0 === e.retVal.result && (F.value = e.retVal.retVal)
                }),
                function(a) {
                  e.index.showLoading({
                    title: "加载中..."
                  });
                  const t = a.resrvRule || "",
                    i = a.earlyDays,
                    o = a.capacityType;
                  u.api.interfaceTransfer({
                    config: {
                      interfaceType: "GET",
                      interfaceModule: "GC_ACTIVITIES_CENTER",
                      interfaceMethod: "api/singleWechat/onSaleCalendarWithMoney",
                      interfaceFrom: "GC",
                      hotelGroupCode: T.hotelGroupCode
                    },
                    query: {
                      unitCode: T.hotelGroupCode,
                      activityCode: I.value,
                      startDate: e.dayjs().format("YYYY-MM-DD"),
                      endDate: de(),
                      ...L.value && {
                        isPreview: !0
                      }
                    }
                  }).then(a => {
                    if (U.value = [], 1 === a.result && 0 === a.retVal.result) {
                      const r = a.retVal.retVal,
                        l = [];
                      for (const e in function(e) {
                          const a = Object.keys(e).sort(),
                            t = {};
                          for (let i = 0; i < a.length; i++) t[a[i]] = e[a[i]];
                          return t
                        }(r)) {
                        const a = {
                          dateName: e,
                          dateList: r[e]
                        };
                        l.push(a)
                      }
                      A.value = 0, l.forEach(a => {
                        const r = a;
                        r.calendarWithPriceDto = a.dateList.calendarWithPriceDto, r.embarkDate = a.dateName, r.sumCapacity = a.dateList.sumCapacity, r.priceType = a.dateList.minPriceDto.priceType, r.MMdd = e.dayjs(a.dateName).format("MM/DD"), r.earlyDay = i, r.price = a.dateList.minPriceDto.price, r.resrvRule = t, r.capacityType = o;
                        const l = e.dayjs().add("ONE_DAY" === t ? i - 1 : -1, "day").format("YYYY-MM-DD");
                        A.value <= 4 && e.dayjs(a.dateName).isAfter(e.dayjs(l)) && a.sumCapacity > 0 && (a.show = !0, A.value++), "0" === e.dayjs(a.dateName).format("d") && (r.week = "周日"), "1" === e.dayjs(a.dateName).format("d") && (r.week = "周一"), "2" === e.dayjs(a.dateName).format("d") && (r.week = "周二"), "3" === e.dayjs(a.dateName).format("d") && (r.week = "周三"), "4" === e.dayjs(a.dateName).format("d") && (r.week = "周四"), "5" === e.dayjs(a.dateName).format("d") && (r.week = "周五"), "6" === e.dayjs(a.dateName).format("d") && (r.week = "周六"), r.price = r.dateList.minPriceDto.price, r.groupBeginDateFormat = e.dayjs(r.dateName).format("MM月DD日"), r.groupBeginDateFormat2 = e.dayjs(r.dateName).format("MM.DD"), r.groupEndDateFormat = e.dayjs(r.dateName).format("MM月DD日"), U.value.push(r)
                      }), U.value.forEach(a => {
                        const t = e.dayjs().add(0 === a.earlyDay ? -24 : a.earlyDay, "hour");
                        a.dateList.calendarWithPriceDto.forEach(i => {
                          const o = `${i.bizDate} ${i.startDate}:00`;
                          !e.dayjs(o).isAfter(e.dayjs(t)) && "ONE_HOUR" === a.resrvRule && e.dayjs(e.dayjs().format("YYYY-MM-DD")).isSame(e.dayjs(i.bizDate).format("YYYY-MM-DD")) ? i.canSelect = !1 : i.canSelect = !0
                        }), -1 === a.dateList.calendarWithPriceDto.findIndex(e => e.canSelect) && (a.show = !1)
                      }), U.value.length > 0 && re(), setTimeout(() => {
                        j.value.createDate(U.value)
                      }, 1e3)
                    }
                  }).finally(() => {
                    e.index.hideLoading()
                  })
                }(i)
            }
            var t
          }).catch(e => {
            (null == e ? void 0 : e.code) !== t.RateLimitStatusCode && (null == e ? void 0 : e.status) !== t.RateLimitStatusCode || ($.value = !0)
          }).finally(() => {
            Q.value = !1
          })
        }

        function de() {
          const e = new Date;
          e.setMonth(e.getMonth() + 2);
          const a = e.getFullYear();
          let t = e.getMonth() + 1,
            i = e.getDate();
          return t < 10 && (t = "0" + t), i < 10 && (i = "0" + i), `${a}-${t}-${i}`
        }

        function ve() {
          u.api.getGoodsIsCollection({
            goodsId: I.value,
            hotelGroupCode: T.hotelGroupCode,
            hotelCode: T.hotelCode,
            memberId: P.memberId
          }).then(e => {
            1 === e.result && e.retVal && e.retVal.length > 0 && (w.value = !0, N.value = e.retVal[0].id)
          })
        }
        return e.onShareAppMessage(() => ({
          title: W.value.name,
          imageUrl: s.shareImageTransfrom(W.value.shareReport)
        })), e.onShareTimeline(() => ({
          title: W.value.name,
          imageUrl: s.shareImageTransfrom(W.value.shareReport, "timeline")
        })), C(a => {
          D.value = a.scrollTop;
          const t = [],
            i = e.index.createSelectorQuery();
          i.selectAll(".contentHight").boundingClientRect();
          const o = e.index.createSelectorQuery();
          o.selectAll(".tabs-warp").boundingClientRect(), o.exec(e => {
            e[0][0].top < q.value ? V.value = !0 : V.value = !1
          }), i.exec(e => {
            for (let a = 0; a < e[0].length; a++) t.push(e[0][a].top);
            G.value && (t[3] < 0 ? Y.value = 4 : t[2] < 0 ? Y.value = 3 : t[1] < 0 ? Y.value = 2 : Y.value = 1)
          });
          const r = e.index.createSelectorQuery();
          r.selectAll(".travel-date-item").boundingClientRect(), r.exec(e => {
            e && e.length > 0 && (R.value = [], e[0].forEach((e, a) => {
              e.top < q.value + 39 ? (R.value.forEach((e, t) => {
                t < a && (R.value[t] = !1)
              }), R.value[a] = !0) : R.value[a] = !1
            }))
          })
        }), e.onLoad(e => {
          f.report(f.actionTypeEnum.visit, null), e && e.activityCode && (I.value = e.activityCode), e && e.isPreview && (L.value = e.isPreview), e && e.seriesDesc && (K.value = decodeURIComponent(e.seriesDesc))
        }), e.onMounted(() => {
          se(), ve()
        }), e.onUnload(() => {
          d.qdTracker.resetData(X.value)
        }), (a, t) => e.e({
          a: $.value
        }, $.value ? {
          b: e.p({
            color: "#fff",
            "bg-color": "#000"
          }),
          c: e.o(se),
          d: e.p({
            show: $.value
          })
        } : Q.value ? {} : e.e({
          f: e.unref(D) < 30 && W.value.videoUrls
        }, e.unref(D) < 30 && W.value.videoUrls ? {
          g: -1 === k.value ? 1 : "",
          h: e.o(e => Z(0)),
          i: k.value > -1 ? 1 : "",
          j: e.o(e => Z(1))
        } : {}, {
          k: e.p({
            "is-preview": L.value,
            color: e.unref(D) > 50 ? "#000" : "#fff",
            "bg-color": e.unref(D) > 50 ? "#fff" : ""
          }),
          l: e.sr(E, "0fa8995e-3", {
            k: "swiperRef"
          }),
          m: e.o(ee),
          n: e.p({
            slides: J,
            "swiper-config": S,
            "video-url": W.value.videoUrls
          }),
          o: e.t(W.value.name),
          p: w.value ? 1 : "",
          q: w.value ? 1 : "",
          r: w.value ? "" : 1,
          s: e.o(e => function() {
            if (!le()) return P && P.memberId ? void(w.value ? async function() {
              if (M.value) return !1;
              M.value = !0, await y(), u.api.deleteGoodsCollection([N.value]).then(e => {
                M.value = !1, 1 === e.result ? (i.jAlert3("取消收藏"), w.value = !1) : i.jAlert3(e.msg)
              })
            }(): async function() {
              if (M.value) return !1;
              M.value = !0, await y(), u.api.addGoodsCollection({
                goodsId: I.value,
                goodsName: W.value.name,
                hotelCode: T.hotelCode,
                hotelGroupCode: T.hotelGroupCode,
                memberId: P.memberId,
                picture: W.value.indexPicture,
                productType: "activity",
                price: W.value.minPriceDto.price,
                subGoodsName: W.value.typeDescript
              }).then(e => {
                M.value = !1, 1 === e.result ? (h("ADD_TO_WISHLIST"), d.qdTracker.track("collect", {
                  collect_type: "产品"
                }), i.jAlert3("收藏成功"), w.value = !0, ve()) : i.jAlert3(e.msg)
              })
            }()) : (v.toLogin(), !1)
          }()),
          t: W.value.introduce,
          v: W.value.minPriceDto.price
        }, W.value.minPriceDto.price ? {
          w: e.t(e.unref(c.valFormat)(W.value.minPriceDto.price))
        } : {}, {
          x: W.value.minPriceDto.mixCredit
        }, W.value.minPriceDto.mixCredit ? e.e({
          y: W.value.minPriceDto.mixPrice
        }, W.value.minPriceDto.mixPrice ? {
          z: e.t(e.unref(c.valFormat)(W.value.minPriceDto.mixPrice))
        } : {}, {
          A: e.t(e.unref(c.valFormat)(W.value.minPriceDto.mixCredit))
        }) : {}, {
          B: W.value.tagsList
        }, W.value.tagsList ? {
          C: e.f(W.value.tagsList, (a, t, i) => ({
            a: e.t(a),
            b: t
          }))
        } : {}, {
          D: W.value.minCapacity || W.value.maxCapacity
        }, W.value.minCapacity || W.value.maxCapacity ? e.e({
          E: e.t(W.value.minCapacity),
          F: W.value.minCapacity && W.value.maxCapacity
        }, (W.value.minCapacity && W.value.maxCapacity, {}), {
          G: e.t(W.value.maxCapacity),
          H: "CHILD" === W.value.adapterPeople
        }, (W.value.adapterPeople, {}), {
          I: "ADULT" === W.value.adapterPeople
        }, (W.value.adapterPeople, {}), {
          J: "ALL" === W.value.adapterPeople
        }, (W.value.adapterPeople, {})) : {}, {
          K: W.value.earlyDays > 0
        }, W.value.earlyDays > 0 ? {
          L: e.t(W.value.earlyDays),
          M: e.t("ONE_DAY" === W.value.resrvRule ? "天" : "小时")
        } : {}, {
          N: e.t(W.value.phone),
          O: e.t(W.value.activityBegin),
          P: e.t(W.value.activityEnd),
          Q: W.value.activityCode
        }, W.value.activityCode ? {
          R: W.value.useRule
        } : {}, {
          S: W.value.benefit
        }, W.value.benefit ? {
          T: W.value.benefit
        } : {}, {
          U: e.f(z.value, (a, t, i) => ({
            a: e.t(a.descript),
            b: e.t(a.address),
            c: e.o(t => {
              return i = a, void(le() || e.index.navigateTo({
                url: "/pagesC/order/hotel?hotelCode=" + i.code
              }));
              var i
            }, t),
            d: e.o(t => function(a) {
              if (le()) return;
              const t = e.coordtransform.bd09togcj02(a.hotelLongitude, a.hotelLatitude);
              e.index.openLocation({
                latitude: Number(t[1]),
                longitude: Number(t[0]),
                scale: 28
              })
            }(a), t),
            e: e.o(t => {
              return i = a.phone, void(le() || e.index.makePhoneCall({
                phoneNumber: i
              }));
              var i
            }, t),
            f: t
          })),
          V: A.value > 0
        }, A.value > 0 ? e.e({
          W: e.f(U.value, (a, t, i) => e.e({
            a: a.show
          }, a.show ? e.e({
            b: e.t(a.week),
            c: e.t(a.MMdd),
            d: "FREE" === a.priceType
          }, "FREE" === a.priceType ? {} : {
            e: e.t(e.unref(c.valFormat)(a.price))
          }, {
            f: a.dateName === b.value.dateName ? 1 : "",
            g: e.o(e => te(a), t)
          }) : {}, {
            h: t
          })),
          X: A.value >= 4
        }, A.value >= 4 ? {
          Y: e.o(e => oe())
        } : {}) : {}, {
          Z: e.f(H.value, (a, t, i) => e.e({
            a: e.t(a.startDate),
            b: e.t(a.endDate),
            c: a.startDate === O.value.startDate ? 1 : "",
            d: "INFINITY" !== a.capacityType
          }, "INFINITY" !== a.capacityType ? {
            e: e.t(a.capacity)
          } : {}, {
            f: t,
            g: a.canSelect ? "" : 1,
            h: a.startDate === O.value.startDate ? 1 : "",
            i: e.o(e => ie(a), t)
          })),
          aa: 1 === Y.value ? 1 : "",
          ab: e.o(e => ce(1)),
          ac: 2 === Y.value ? 1 : "",
          ad: e.o(e => ce(2)),
          ae: V.value ? 1 : "",
          af: q.value + "px",
          ag: W.value.activityCode
        }, W.value.activityCode ? {
          ah: W.value.priceExplain,
          ai: e.p({
            "default-height": "30px",
            open: !0,
            "arrow-style": "position: absolute;right: 0;top: -5px;width: 100%;display: flex;justify-content: flex-end;",
            "icon-name": "icon-a-16_xialajiantou_hei"
          }),
          aj: W.value.extraTips,
          ak: e.p({
            "default-height": "30px",
            open: !0,
            "arrow-style": "position: absolute;right: 0;top: -5px;width: 100%;display: flex;justify-content: flex-end;",
            "icon-name": "icon-a-16_xialajiantou_hei"
          }),
          al: W.value.resrvNotice,
          am: e.p({
            "default-height": "30px",
            open: !0,
            "arrow-style": "position: absolute;right: 0;top: -5px;width: 100%;display: flex;justify-content: flex-end;",
            "icon-name": "icon-a-16_xialajiantou_hei"
          })
        } : {}, {
          an: e.f(F.value, (a, t, i) => ({
            a: e.t(a.title),
            b: e.t(a.answer),
            c: t
          })),
          ao: e.o(e => ue("/pagesB/other/question?businessType=Activity")),
          ap: e.o(e => {
            le() || x.value.showDialog()
          }),
          aq: e.t("T" === W.value.canResrv || L.value ? "预订" : "已售罄"),
          ar: "T" === W.value.canResrv || L.value ? 1 : "",
          as: "F" !== W.value.canResrv || L.value ? "" : 1,
          at: e.o(e => ne()),
          av: e.sr(j, "0fa8995e-8,0fa8995e-7", {
            k: "dailyPrices"
          }),
          aw: e.o(ae),
          ax: e.o(e => {
            b.value.onSaleCode ? (_.value.hideDialog(), ne()) : i.jAlert3("请选择预约时间")
          }),
          ay: e.sr(_, "0fa8995e-7", {
            k: "orderLayer"
          }),
          az: e.p({
            title: "可订班期",
            "title-border": !0,
            "max-dialog": !0
          }),
          aA: e.sr(x, "0fa8995e-10", {
            k: "kf"
          }),
          aB: e.p({
            title: "联系客服",
            "tracking-data": {
              commodity_id: I.value,
              commodity_name: W.value.name
            }
          })
        }), {
          e: !Q.value
        })
      }
    });
  P.__runtimeHooks = 7;
  const x = e._export_sfc(P, [
    ["__scopeId", "data-v-0fa8995e"]
  ]);
  wx.createPage(x)
}();