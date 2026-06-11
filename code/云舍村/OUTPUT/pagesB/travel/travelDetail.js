! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    a = require("../../assets/index.js"),
    t = require("../../base/channel.js"),
    l = require("../../base/common.js"),
    o = require("../../base/jAlert/jAlert.js"),
    r = require("../../base/product.js"),
    i = require("../../hooks/useAdReport.js"),
    u = require("../../hooks/useQTAutoClk.js"),
    n = require("../../hooks/useScroll.js"),
    c = require("../../hooks/useSubscribeMessage.js"),
    s = require("../../hooks/useXhsReport.js"),
    v = require("../../utils/api.js"),
    d = require("../../utils/filter.js"),
    p = require("../../utils/helper.js"),
    f = require("../../utils/platform.js"),
    g = require("../../utils/qdTracker.js"),
    m = require("../../utils/umengAdaptor.js"),
    h = require("../../utils/utils.js"),
    y = require("../../utils/wxuser.js");
  Array || e.resolveComponent("mp-html")(), Math || (_ + b + M + j + G + (() => "../../uni_modules/mp-html/components/mp-html/mp-html.js") + C + E + T + D + S + P + A + k)();
  const D = () => "../../components/backToTop.js",
    T = () => "../../components/bottomDialog.js",
    C = () => "../../components/collapse.js",
    b = () => "../../components/coustomHead.js",
    P = () => "../../components/kfDialog.js",
    M = () => "../../components/new/ErrorLimiting.js",
    A = () => "../../components/new/LimitingRetry/LimitingRetryDialog.js",
    E = () => "../../components/new/Stepper.js",
    _ = () => "../../components/noData.js",
    S = () => "../../components/share.js",
    j = () => "../../components/swiperBox.js",
    k = () => "../components/dailyPrice.js",
    G = () => "../components/travel/CategorySubInfo.js",
    I = e.defineComponent({
      __name: "travelDetail",
      setup(D) {
        const T = s.useXshReport(),
          {
            subscribeMessage: C
          } = c.useSubscribeMessage(["NEW_ACTIVITY_MA", "POINT_VALID_MA", "TRAVEL_GUIDE_MA"]),
          b = i.useAdReport(),
          P = e.ref(!1);
        setTimeout(() => {
          b("PRODUCT_VIEW"), b("VIEW_CONTENT")
        }, 300);
        const {
          scrollTop: M,
          onPageScroll: A
        } = n.useScroll(), E = y.getStorage("config"), _ = e.ref(!1), S = e.ref(t.defaultOtaChannel), j = e.ref(t.defaultChannel), k = e.ref(), G = e.ref({}), I = e.ref({}), x = e.ref(0), L = e.ref(0), w = e.ref(!1), N = e.ref(!0), R = e.ref(), Y = e.ref(), q = e.ref(""), B = e.ref(!1), V = e.ref(""), O = e.ref(), F = e.ref({}), U = e.ref(y.getStorage("user") || {}), z = e.ref([]), $ = e.ref(""), K = e.ref([]), H = e.ref(-1), Q = e.ref(), W = e.ref(!1), J = e.ref(!1), Z = e.ref(!1), X = e.ref("position: absolute;right: 0;top: -5px;width: 100%;display: flex;justify-content: flex-end;"), ee = e.ref({}), ae = e.ref(!0), te = e.ref({}), le = e.ref(!1), oe = e.ref(!1), re = e.reactive({
          indicatorDots: !1,
          dotPosStyle: "display:none;"
        }), ie = e.reactive({
          indicatorDots: !1,
          autoplay: !1,
          dotPosStyle: "left: 50%; transform: translateX(-50%); bottom: 12px;"
        }), ue = e.ref({}), ne = e.ref(""), ce = e.ref(""), se = e.ref(!1), ve = e.ref(!1), de = e.ref(!1), pe = e.ref([]), fe = e.ref([]), ge = e.ref([]), me = e.ref(""), he = e.ref(1), ye = e.ref(!1), De = e.ref(!1), Te = e.ref(""), Ce = e.reactive({}), be = e.ref({}), Pe = e.ref({}), Me = e.ref([]), Ae = e.ref("F"), Ee = e.ref(""), _e = e.ref("");
        let Se = e.reactive([]);
        const je = {
            BZT: a.assets.icProductTravel,
            DestPackage: a.assets.icProductPackage
          },
          ke = {
            BZT: "旅行",
            DestPackage: "目的地套餐"
          },
          Ge = e.computed(() => Pe.value.category ? ke[Pe.value.category] : ""),
          Ie = e.computed(() => {
            var e;
            return (null == (e = be.value) ? void 0 : e.priceModel) ? function(e) {
              let a = "";
              switch (e) {
                case "PEOPLE":
                  a = "人";
                  break;
                case "FAMILY":
                  a = "家庭";
                  break;
                case "PACKAGE":
                  a = "套";
                  break;
                default:
                  a = ""
              }
              return a
            }(be.value.priceModel) : ""
          }),
          xe = e.ref(0),
          Le = e.ref(0),
          we = e.ref(0),
          Ne = e.ref(0),
          Re = e.ref(0),
          Ye = e.ref(0),
          qe = e.ref(0),
          Be = e.ref(0);

        function Ve(e) {
          we.value = e;
          let a = Math.min(2, 4 - e, G.value.productAvailNum - e);
          a < 0 && (a = 0), Be.value = a
        }

        function Oe(e) {
          Ye.value = e;
          let a = Math.min(4 - e, G.value.productAvailNum - e);
          a < 0 && (a = 0), we.value > a && (we.value = a), Re.value = a
        }

        function Fe(e) {
          H.value = e
        }

        function Ue(e) {
          const a = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
            t = ["", "十", "百", "千", "万", "亿"];
          if (0 === e) return a[0];
          let l = "",
            o = 0;
          for (; e > 0;) {
            const r = e % 10;
            0 !== r ? l = 1 === r && 1 === o && "" !== l ? t[o] + l : a[r] + t[o] + l : "" !== l && l.charAt(0) !== a[0] && (l = a[0] + l), o++, e = Math.floor(e / 10)
          }
          return l
        }

        function ze(e) {
          ea() || (W.value = e, O.value.showDialog())
        }

        function $e() {
          ea() || e.index.navigateTo({
            url: `/pagesTravelAssistant/journey/edit?fromType=travelDetail&itineraryCode=${F.value.itineraryCode}&productIntention=${Ce.categorySub}&travelType=${Ce.travelType}`
          })
        }

        function Ke() {
          if (ea()) return;
          b("SHARE");
          const a = {
            type: Ce.category,
            posterImage: p.imageMogr2(Ce.posterImage, "750x"),
            title: Ce.title,
            desc: Ce.productItineraryDesc,
            themes: Ce.themes,
            priceTime: "此价格生成于" + e.dayjs().format("YYYY.MM.DD"),
            price: "¥" + be.value.price,
            priceModelDesc: `/${Ie.value}起`,
            seriesDesc: "",
            categorySubDesc: F.value.categorySubDesc,
            categorySub: Ce.categorySub,
            sketch: "",
            datas: "出发日期：",
            path: "",
            params: "",
            time: `此海报于${e.dayjs().format("YYYY.MM.DD")}生成`,
            priceModel: Ce.priceModel,
            picPage: "TRAVEL_DETAIL",
            position: "TRAVEL_DETAIL_IMG",
            bizRelObject: "TRAVEL_DETAIL",
            bizRelObjectId: q.value
          };
          F.value.itineraryShortDesc && (a.sketch += F.value.itineraryShortDesc), Ce.productNum && (a.sketch && (a.sketch += " 丨 "), a.sketch += Ce.productNum + "人"), Ce.carTypeDesc && (a.sketch && (a.sketch += " 丨 "), a.sketch += "" + Ce.carTypeDesc);
          const t = getCurrentPages(),
            l = t[t.length - 1];
          a.path = l.route;
          const r = l.options;
          a.params = h.createUrl(r), fe.value.forEach(e => {
              a.datas += e.groupBeginDateFormat2 + " "
            }), a.seriesDesc = Ee.value, te.value = a,
            function() {
              e.index.showLoading({
                title: "图片生成中..."
              });
              const a = y.getStorage("config"),
                t = "travelType=" + encodeURIComponent(q.value),
                l = {
                  appid: a.appid,
                  componentAppid: a.componentAppid,
                  line_color_g: 0,
                  page: te.value.path,
                  width: 500,
                  line_color_b: 0,
                  auto_color: !1,
                  scene: t,
                  is_hyaline: !0,
                  line_color_r: 0
                };
              v.api.getWxacodeUnlimitUrl(l).then(a => {
                1 === a.result ? (te.value.qrCode = a.retVal.imageUrl, _.value = !0) : o.jAlert3(a.msg), e.index.hideLoading()
              })
            }()
        }

        function He(e) {
          Q.value.changeCurrent(e)
        }

        function Qe() {
          _.value = !1
        }

        function We() {
          if (!ea()) return U.value && U.value.memberId ? void(ea() || (de.value ? async function() {
            ea() || !ve.value && (ve.value = !0, await C(), v.api.deleteGoodsCollection([pe.value]).then(e => {
              ve.value = !1, 1 === e.result ? (o.jAlert3("取消收藏"), de.value = !1) : o.jAlert3(e.msg)
            }))
          }(): async function() {
            ea() || !ve.value && (ve.value = !0, await C(), v.api.addGoodsCollection({
              goodsId: q.value,
              goodsName: Ce.title,
              hotelCode: E.hotelCode,
              hotelGroupCode: E.hotelGroupCode,
              memberId: U.value.memberId,
              picture: me.value,
              productType: Ce.categorySub,
              price: be.value.price,
              subGoodsName: Ce.subtitle
            }).then(e => {
              1 === e.result ? (b("ADD_TO_WISHLIST"), g.qdTracker.track("collect", {
                collect_type: "产品"
              }), o.jAlert3("收藏成功"), Je()) : o.jAlert3(e.msg)
            }))
          }())) : (h.toLogin(), !1)
        }

        function Je() {
          v.api.getGoodsIsCollection({
            goodsId: q.value,
            hotelGroupCode: E.hotelGroupCode,
            hotelCode: E.hotelCode,
            memberId: U.value.memberId
          }).then(e => {
            ve.value = !1, 1 === e.result && e.retVal && e.retVal.length > 0 && (de.value = !0, pe.value = e.retVal[0].id)
          })
        }

        function Ze() {
          e.index.showModal({
            content: Ce.illustrate,
            showCancel: !1,
            confirmText: "我知道了",
            confirmColor: "#000000"
          })
        }

        function Xe() {
          var e;
          G.value.groupBeginDate ? (g.qdTracker.track("book_click", {
            commodity_id: ee.value.travelType,
            commodity_name: ee.value.title,
            series: Ee.value,
            theme: null == (e = ee.value.themes) ? void 0 : e.join(","),
            rendezvous: ee.value.rendezvousDesc,
            dissolution: ee.value.dissolutionDesc,
            travel_route: G.value.itineraryDesc,
            travel_date: G.value.groupBeginDate,
            end_date: G.value.groupEndDate
          }), R.value.hideDialog(), Y.value.showDialog()) : o.jAlert3("请选择出行日期")
        }

        function ea() {
          return !!B.value && (e.index.showToast({
            title: "预览链接无法操作，请从正常入口进入。",
            icon: "none",
            duration: 5e3
          }), !0)
        }

        function aa(e) {
          ea() || (U.value && U.value.memberId ? (oe.value = !1, G.value.groupBeginDate && "all" !== e ? Xe() : ia()) : h.toLogin())
        }

        function ta(a) {
          const t = e.index.createSelectorQuery(),
            l = e.index.createSelectorQuery(),
            o = [];
          N.value = !1, t.selectAll(".topContent").boundingClientRect(), l.selectAll(".contentHight").boundingClientRect(), t.exec(t => {
            let r = t[0][0].height - 15;
            l.exec(t => {
              for (let e = 0; e < t[0].length; e++) o.push(t[0][e].height + 32);
              for (let e = 0; e < a - 1; e++) r += o[e];
              e.index.pageScrollTo({
                scrollTop: r,
                duration: 200,
                success: () => {
                  x.value = a, setTimeout(() => {
                    N.value = !0
                  }, 1e3)
                }
              })
            })
          })
        }

        function la(a) {
          var t;
          const l = a;
          l.embarkDate = a.groupBeginDate, l.MMdd = e.dayjs(a.groupBeginDate).format("MM/DD");
          const {
            adult: o = 0,
            children: r = 0
          } = (null == (t = l.specificationsPriceDtos) ? void 0 : t[0]) || {};
          "PEOPLE" === l.priceModel && l.productAvailNum < o + r && (l.canTap = !1), l.number = l.productAvailNum;
          const i = e.dayjs(a.groupBeginDate).format("d");
          return l.week = {
            0: "周日",
            1: "周一",
            2: "周二",
            3: "周三",
            4: "周四",
            5: "周五",
            6: "周六"
          } [i], l.groupEndDate = e.dayjs(l.groupBeginDate).add(Ce.itineraryDays - 1, "days").format("YYYY-MM-DD hh:mm:ss"), "FreeTravel" === Ce.categorySub ? l.productAvailNum > 8 ? l.availNum = 8 : l.availNum = l.productAvailNum : "PACKAGE" !== a.priceModel && l.productAvailNum > 4 ? l.availNum = 4 : l.availNum = l.productAvailNum, l.price = l.startingPrice, l.price || 0 !== l.priceDtos.length || (l.price = "实时计价"), -1 === l.price && (l.price = "实时计价"), a.specificationsPriceDtos.length > 0 && (l.allNumber = Number((a.specificationsPriceDtos[0].adult + a.specificationsPriceDtos[0].children).toFixed(2)), l.payType = a.specificationsPriceDtos[0].payType, l.specificationsType = a.specificationsPriceDtos[0].specificationsType), l.groupBeginDateFormat = e.dayjs(l.groupBeginDate).format("MM月DD日"), l.groupBeginDateFormat2 = e.dayjs(l.groupBeginDate).format("MM.DD"), l.groupEndDateFormat = e.dayjs(l.groupEndDate).format("MM月DD日"), l
        }

        function oa() {
          const a = {
            beginDate: e.dayjs().format("YYYY-MM-DD"),
            endDate: e.dayjs().add(12, "month").format("YYYY-MM-DD"),
            cardLevel: U.value.cardLevel || "",
            cardType: U.value.cardType || "",
            gcLevel: "",
            hotelGroupCode: E.hotelGroupCode,
            ota: "DIRECT",
            otaChannel: S.value,
            travelType: Ce.travelType,
            itineraryCode: F.value.itineraryCode
          };
          B.value && (a.isPreview = B.value), le.value && !B.value && (a.isMarketingPage = !0), $.value && (a.couponNo = $.value), v.api.interfaceTransfer({
            query: a,
            config: {
              interfaceType: "POST",
              interfaceModule: "GC_PRODUCT_JOURNEY",
              interfaceMethod: "/api/travelGroup/listDailyDetailWithTag",
              interfaceFrom: "GC",
              hotelGroupCode: E.hotelGroupCode
            }
          }).then(a => {
            var t;
            if (se.value = !1, J.value = !0, ge.value = [], 1 === a.result && 0 === a.retVal.result) {
              const l = a.retVal.retVal;
              if (he.value = 0, "4" === (null == (t = _e.value) ? void 0 : t.toString()))
                for (let e = 0; e < l.length; e++) {
                  let a = !1;
                  const t = l[e];
                  Me.value.forEach(e => {
                    e === t.travelGroupCode && (a = !0)
                  }), a || (l.splice(e, 1), e--)
                }
              l.forEach(a => {
                const t = la(a);
                !1 !== t.canTap && e.dayjs().diff(a.groupBeginDate, "s") < 0 && he.value < 8 && t.productAvailNum > 0 && (a.show = !0, he.value++), !1 !== t.canTap && ge.value.push(t)
              })
            }
          })
        }

        function ra(a) {
          const t = {
            beginDate: e.dayjs().format("YYYY-MM-DD"),
            cardLevel: U.value.cardLevel || "",
            cardType: U.value.cardType || "",
            gcLevel: "",
            hotelGroupCode: E.hotelGroupCode,
            ota: "DIRECT",
            otaChannel: S.value,
            travelType: Ce.travelType,
            itineraryCode: F.value.itineraryCode,
            isMarketingPage: !(!le.value || B.value)
          };
          return a || (t.endDate = e.dayjs().add(12, "month").format("YYYY-MM-DD")), B.value && (t.isPreview = B.value), $.value && (t.couponNo = $.value), v.api.interfaceTransfer({
            query: t,
            config: {
              interfaceType: "POST",
              interfaceModule: "GC_PRODUCT_JOURNEY",
              interfaceMethod: "/api/travelGroup/listTravelProductDailyDetail",
              interfaceFrom: "GC",
              hotelGroupCode: E.hotelGroupCode
            }
          })
        }

        function ia() {
          ra().then(e => {
            var a;
            if (se.value = !1, J.value = !0, ye.value = !1, fe.value = [], 1 === e.result && 0 === e.retVal.result) {
              const t = e.retVal.retVal;
              if ("4" === (null == (a = _e.value) ? void 0 : a.toString()))
                for (let e = 0; e < t.length; e++) {
                  let a = !1;
                  const l = t[e];
                  Me.value.forEach(e => {
                    e === l.travelGroupCode && (a = !0)
                  }), a || (t.splice(e, 1), e--)
                }
              t.forEach(e => {
                const a = la(e);
                !1 !== a.canTap && fe.value.push(a)
              }), k.value.createDate(fe.value), R.value.showDialog()
            }
          }).catch(e => {
            (null == e ? void 0 : e.code) !== l.RateLimitStatusCode && (null == e ? void 0 : e.status) !== l.RateLimitStatusCode || (De.value = !0, Te.value = "listTravelProductDailyDetail")
          }).finally(() => {
            P.value = !1
          })
        }
        A(a => {
          M.value = a.scrollTop;
          const t = [],
            l = e.index.createSelectorQuery();
          l.selectAll(".contentHight").boundingClientRect();
          const o = e.index.createSelectorQuery();
          o.selectAll(".tabs-warp").boundingClientRect(), o.exec(e => {
            e[0][0].top && e[0][0].top < L.value ? w.value = !0 : w.value = !1
          }), l.exec(e => {
            for (let a = 0; a < e[0].length; a++) t.push(e[0][a].top);
            N.value && (t[3] < 0 ? x.value = 4 : t[2] < 0 ? x.value = 3 : t[1] < 0 ? x.value = 2 : x.value = 1)
          });
          const r = e.index.createSelectorQuery();
          r.selectAll(".travel-date-item").boundingClientRect(), r.exec(e => {
            e && e.length > 0 && (K.value = [], e[0].forEach((e, a) => {
              e.top < L.value + 35 ? (K.value.forEach((e, t) => {
                t < a && (K.value[t] = !1)
              }), K.value[a] = !0) : K.value[a] = !1
            }))
          })
        }), e.onLoad(e => {
          if (T.init(e.click_id), T.report(T.actionTypeEnum.visit, null), e.pageType && (V.value = e.pageType), e.travelType && (q.value = e.travelType), e.isPreview && (B.value = e.isPreview), e.isMarketingPage && (le.value = e.isMarketingPage), e.couponNo && ($.value = e.couponNo), e.scene) {
            const a = h.getUrlParams(decodeURIComponent(e.scene));
            a.travelType && (q.value = a.travelType)
          }
          e.sourceActivityId && (ne.value = e.sourceActivityId), e.sourceActivityName && (ce.value = decodeURIComponent(e.sourceActivityName)), e.isAll && (Ae.value = e.isAll), e.seriesDesc && (Ee.value = decodeURIComponent(e.seriesDesc))
        }), e.onUnload(() => {
          g.qdTracker.resetData(ue.value)
        });
        const ua = e.ref(!1);

        function na() {
          const e = {
            unitCode: E.hotelGroupCode,
            travelType: q.value,
            ota: "DIRECT",
            otaChannel: S.value,
            isMarketingPage: !(!le.value || B.value)
          };
          B.value && (e.isPreview = B.value), $.value && (e.couponNo = $.value), P.value = !0, v.api.interfaceTransfer({
            query: e,
            config: {
              interfaceType: "POST",
              interfaceModule: "GC_PRODUCT_JOURNEY",
              interfaceMethod: "/api/travelGroup/findTravelProductForWechatDetail",
              interfaceFrom: "GC",
              hotelGroupCode: E.hotelGroupCode
            }
          }).then(e => {
            var a, t, l, o;
            if (ye.value = !1, 1 === e.result && 0 === e.retVal.result) {
              const r = e.retVal.retVal;
              if (!r) return void(Z.value = !0);
              const i = JSON.parse(JSON.stringify(r[0]));
              if (ee.value = i, be.value = {
                  price: i.miniPrice,
                  priceModel: i.miniST,
                  priceModelDesc: i.miniSTDesc
                }, Object.keys(i).forEach(e => {
                  Ce[e] = i[e]
                }), Pe.value = r[0], Ce.itineraryDtos = [], Ce.urls && Ce.urls.forEach(e => {
                  "LISTIMAGE" === e.pictureType && (me.value = e.url)
                }), "3" === (null == (a = _e.value) ? void 0 : a.toString()))
                for (let e = 0; e < r.length; e++) {
                  const a = r[e];
                  Me.value.forEach(e => {
                    a.itineraryDtos.forEach(t => {
                      e === t.itineraryCode && (a.hasGroup = !0)
                    })
                  }), a.hasGroup || (r.splice(e, 1), e--)
                }
              if ("4" === (null == (t = _e.value) ? void 0 : t.toString()))
                for (let e = 0; e < r.length; e++) {
                  const a = r[e];
                  Me.value.forEach(e => {
                    a.travelGroupCode.split(",").forEach(t => {
                      e === t && (a.hasGroup = !0)
                    })
                  }), a.hasGroup || (r.splice(e, 1), e--)
                }
              r.forEach(e => {
                e.itineraryDtos.length > 0 && e.itineraryDtos.forEach(e => {
                  e.dayDtos.forEach((e, a) => {
                    e.dayTitle = "", 0 === a && (e.open = !0), e.dayDetailDtos.forEach(a => {
                      a.picture && (a.picture = a.picture.replace(/;/g, ",").split(",")), e.dayTitle ? e.dayTitle += " - " + a.title : e.dayTitle = a.title
                    })
                  }), Ce.itineraryDtos.push(e)
                })
              }), m.adaptor.updatePageProperties({
                product_id: i.travelType,
                product_name: i.title,
                price: be.value.price,
                product_type: ke[i.category]
              }), ue.value = {
                commodity_id: i.travelType,
                commodity_name: i.title,
                series: Ee.value,
                theme: null == (l = i.themes) ? void 0 : l.join(",")
              }, g.qdTracker.setData(ue.value), g.qdTracker.track("mini_productdetail_view", {
                commodity_id: i.travelType,
                commodity_name: i.title,
                series: Ee.value,
                theme: null == (o = i.themes) ? void 0 : o.join(","),
                rendezvous: i.rendezvousDesc,
                dissolution: i.dissolutionDesc
              }), Ce.itineraryDtos.length > 0 && (Ce.itineraryDtos[0].active = !0, F.value = Ce.itineraryDtos[0]), Se = [], Ce.topImage.forEach(e => {
                Se.push({
                  imgUrl: e
                })
              }), r.length > 0 ? oa() : J.value = !0
            }
          }).catch(e => {
            (null == e ? void 0 : e.code) !== l.RateLimitStatusCode && (null == e ? void 0 : e.status) !== l.RateLimitStatusCode || (ye.value = !0)
          }).finally(() => {
            P.value = !1
          })
        }

        function ca() {
          ye.value = !1, na()
        }

        function sa() {
          De.value = !1, "listTravelProductDailyDetail" === Te.value ? ia() : "checkStock" === Te.value && ma(), Te.value = void 0
        }

        function va(e) {
          var a;
          oe.value = !0, (null == e ? void 0 : e.travelGroupCode) !== (null == (a = G.value) ? void 0 : a.travelGroupCode) && (e.hasRmtype ? (e.specificationsPriceDtos.forEach(e => {
            e._id = `${e.specificationsType}-${e.childType}`
          }), G.value = e, g.qdTracker.track("choice_travel_date", {
            commodity_id: ee.value.travelType,
            commodity_name: ee.value.title,
            travel_code: F.value.itineraryCode,
            travel_route: F.value.itineraryDesc,
            travel_date: G.value.groupBeginDate,
            end_date: G.value.groupEndDate
          }), I.value = e.specificationsPriceDtos[0], function() {
            xe.value = 0, we.value = 0, Ne.value = 0, Re.value = 0, Ye.value = 0, qe.value = 0, Be.value = 0;
            const {
              specificationsPriceDtos: e,
              productAvailNum: a
            } = G.value;
            "PEOPLE" === G.value.priceModel ? (Ne.value = e[0].adult || 1, qe.value = e[0].children || 0, Ve(Ne.value), Oe(qe.value)) : (xe.value = 1, Le.value = a)
          }()) : o.jAlert12("请联系松赞客服或顾问", "联系客服", "重新选择", () => {}, () => {
            R.value.hideDialog(), ze(!1)
          }, "您选择的产品因资源保障原因暂无法购买，详讯400-0000-830。"))
        }
        const da = e.ref(!1);

        function pa(a, t) {
          a.open ? a.open = !1 : a.open = !0, a.open || e.nextTick$1(() => {
            const a = "#travel-date-item" + t;
            e.index.pageScrollTo({
              selector: a,
              offsetTop: -(L.value + 35),
              complete: () => {}
            })
          })
        }
        const fa = e.ref(!1);
        e.onShow(() => {
          fa.value = !1
        });
        const ga = e.computed(() => {
          const e = f.getMenuButtonBoundingClientRect();
          return `right:${e.right-e.left}px;`
        });

        function ma() {
          var a, t;
          ua.value || fa.value || (fa.value = !0, e.index.showLoading({
            title: "加载中..."
          }), a = () => {
            var a, t, l, o, r;
            try {
              const i = {
                title: Ce.title,
                itineraryDesc: F.value.itineraryDesc,
                groupBeginDateFormat: G.value.groupBeginDateFormat,
                groupEndDateFormat: G.value.groupEndDateFormat,
                groupBeginDate: G.value.groupBeginDate,
                groupEndDate: G.value.groupEndDate,
                number: xe.value,
                travelGroupCode: G.value.travelGroupCode,
                travelType: Ce.travelType,
                itineraryCode: F.value.itineraryCode,
                price: G.value.price,
                meetingPoint: Ce.rendezvous,
                specificationsPriceDtos: [],
                productUrl: "",
                priceDtos: G.value.priceDtos,
                orderType: Ce.categorySub,
                category: Ce.category,
                orderTypeDesc: F.value.categorySubDesc,
                isSigning: Ce.isSigning,
                priceModel: G.value.priceModel,
                adult: we.value,
                children: Ye.value,
                groupPt: G.value.groupPt,
                specificationsType: G.value.specificationsType,
                tagDesc: G.value.tagDesc,
                series: ke[ee.value.category],
                themes: null == (a = ee.value.themes) ? void 0 : a.join(","),
                rendezvousDesc: ee.value.rendezvousDesc,
                dissolutionDesc: ee.value.dissolutionDesc
              };
              "FAMILY" === G.value.priceModel ? i.specificationsPriceDtos = [I.value] : null == (t = G.value.specificationsPriceDtos) || t.forEach(e => {
                let a = !1;
                i.specificationsPriceDtos.forEach(t => {
                  e.payType === t.payType && (a = !0)
                }), a || i.specificationsPriceDtos.push(e)
              }), Ce.urls && Ce.urls.forEach(e => {
                "LISTIMAGE" === e.pictureType && (i.productUrl = e.url)
              });
              const u = {
                commodity_id: ee.value.travelType,
                commodity_name: ee.value.title
              };
              "PEOPLE" === G.value.priceModel && (u.adult_num = we.value, u.children_num = Ye.value), "FAMILY" === G.value.priceModel && (u.adult_num = null == (l = I.value) ? void 0 : l.adult, u.children_num = null == (o = I.value) ? void 0 : o.children), "PACKAGE" === G.value.priceModel && (u.adult_num = null == (r = G.value) ? void 0 : r.allNumber, u.children_num = 0), g.qdTracker.track("choice_travel_num", u), y.setStorage("travelInfo", i);
              let n = `/pagesB/travel/confirmOrder?sourceActivityId=${ne.value}&sourceActivityName=${ce.value}`;
              $.value && (n = `/pagesB/travel/confirmOrder?sourceActivityId=${ne.value}&sourceActivityName=${ce.value}&couponNo=${$.value}`), R.value.hideDialog(), Y.value.hideDialog(), e.index.hideLoading(), h.goPage(n), setTimeout(() => {
                fa.value = !1
              }, 500)
            } catch {
              ua.value = !1
            }
          }, t = () => {
            fa.value = !1, e.index.hideLoading()
          }, se.value || (ua.value = !0, ra(!0).then(l => {
            se.value = !1;
            let o = !1;
            1 === l.result && 0 === l.retVal.result ? (l.retVal.retVal.forEach(e => {
              e.travelGroupCode === G.value.travelGroupCode && e.productAvailNum > 0 && (o = !0)
            }), o ? null == a || a() : null == t || t(), o || e.index.showModal({
              title: "请联系松赞客服或顾问",
              content: "您选择的产品因资源保障原因暂无法购买,详讯400-0000-830",
              cancelText: "联系客服",
              confirmText: "我知道了",
              cancelColor: "#a43127",
              confirmColor: "#333333",
              success(e) {
                e.confirm ? (R.value.hideDialog(), Y.value.hideDialog()) : e.cancel && (R.value.hideDialog(), Y.value.hideDialog(), ze(!1))
              }
            })) : null == t || t()
          }).catch(e => {
            null == t || t(), (null == e ? void 0 : e.code) !== l.RateLimitStatusCode && (null == e ? void 0 : e.status) !== l.RateLimitStatusCode || (De.value = !0, Te.value = "checkStock", se.value = !1)
          }).finally(() => {
            ua.value = !1
          })))
        }
        e.onShareTimeline(() => {
          let e = "travelType=" + Ce.travelType;
          return le.value && (e += "&isMarketingPage=true"), {
            title: Ce.title,
            query: e,
            imageUrl: p.shareImageTransfrom(me.value, "timeline")
          }
        }), e.onBackPress(() => ea()), e.onShareAppMessage(() => {
          let e = "/pagesB/travel/travelDetail?travelType=" + Ce.travelType;
          return le.value && (e += "&isMarketingPage=true"), B.value && (e += "&isPreview=true"), {
            title: Ce.title,
            path: e,
            imageUrl: p.shareImageTransfrom(me.value)
          }
        }), e.onMounted(() => {
          var a;
          $.value ? (a = () => {
            na()
          }, da.value = !0, v.api.interfaceTransfer({
            query: {
              hotelGroupCode: E.hotelGroupCode,
              couponNo: $.value,
              channel: "WECHAT"
            },
            config: {
              interfaceType: "POST",
              interfaceModule: "",
              interfaceMethod: "/api/coupon/listCouponCodeUseConfigProductByCouponNo",
              interfaceFrom: "coupon",
              hotelGroupCode: E.hotelGroupCode
            }
          }).then(e => {
            1 === e.result && 0 === e.retVal.result && (Me.value = [], e.retVal.retVal.length > 0 && e.retVal.retVal.forEach(e => {
              _e.value = e.type;
              const a = e.type.toString();
              "4" !== a && "3" !== a || Me.value.push(e.productCode)
            }), a && a())
          }).finally(() => {
            da.value = !1
          })) : na(), Je(), v.api.advertisementPage({
            hotelCode: E.hotelCode,
            hotelGroupCode: E.hotelGroupCode,
            clientTypes: j.value,
            firstResult: 0,
            pageSize: 10,
            showLocation: "5"
          }).then(e => {
            0 === e.result && e.retVal && e.retVal.datas && e.retVal.datas.length > 0 && e.retVal.datas.forEach(e => {
              "5" === e.showLocation && (z.value = JSON.parse(e.infos))
            })
          }), e.index.getSystemInfo({
            success: e => {
              L.value = e.statusBarHeight + 40
            },
            fail(a) {
              e.index.showToast({
                title: "获取系统信息失败",
                icon: "none"
              })
            }
          })
        }), e.watch(() => [da.value, P.value], ([a, t]) => {
          a || t ? e.index.showLoading({
            title: "加载中..."
          }) : setTimeout(() => {
            e.index.hideLoading()
          }, 500)
        });
        const {
          handleQTClick: ha
        } = u.useQTAutoClk();
        return (t, l) => {
          var o;
          return e.e({
            a: Z.value && !Ce.travelType
          }, (Z.value && Ce.travelType, {}), {
            b: ye.value
          }, ye.value ? {
            c: e.p({
              color: "#fff",
              "bg-color": "#000"
            }),
            d: e.o(ca),
            e: e.p({
              show: ye.value
            })
          } : {}, {
            f: e.unref(M) < 30 && Ce.video
          }, e.unref(M) < 30 && Ce.video ? {
            g: -1 === H.value ? 1 : "",
            h: e.o(e => He(0)),
            i: H.value > -1 ? 1 : "",
            j: e.o(e => He(1))
          } : {}, {
            k: e.s(ga.value),
            l: e.o(Ke),
            m: e.p({
              "is-preview": B.value,
              color: e.unref(M) > 50 ? "#000" : "#fff",
              "bg-color": e.unref(M) > 50 ? "#fff" : ""
            }),
            n: e.sr(Q, "96fa774f-4", {
              k: "swiperRef"
            }),
            o: e.o(Fe),
            p: e.p({
              slides: e.unref(Se),
              "swiper-config": ie,
              "video-url": Ce.video
            }),
            q: Ge.value
          }, Ge.value ? {
            r: je[Pe.value.category],
            s: e.t(Ge.value)
          } : {}, {
            t: Pe.value.themes
          }, Pe.value.themes ? {
            v: e.f(Pe.value.themes, (a, t, l) => ({
              a: e.t(a),
              b: "product-theme-" + t
            }))
          } : {}, {
            w: de.value ? 1 : "",
            x: de.value ? 1 : "",
            y: de.value ? "" : 1,
            z: de.value ? "取消收藏" : "收藏",
            A: e.o(e => We()),
            B: e.t(Pe.value.title),
            C: e.unref(a.assets).icTravelLine,
            D: e.t(Pe.value.productItineraryDesc),
            E: e.unref(a.assets).icTravelPoint,
            F: e.t(Pe.value.rendezvousDesc),
            G: e.t(Pe.value.dissolutionDesc),
            H: be.value.price > 0
          }, be.value.price > 0 ? e.e({
            I: e.t(e.unref(d.valFormat)(be.value.price)),
            J: e.t(Ie.value),
            K: Ce.illustrate
          }, Ce.illustrate ? {
            L: e.o(Ze)
          } : {}) : {}, {
            M: Pe.value.subtitle
          }, Pe.value.subtitle ? {
            N: e.t(Pe.value.subtitle)
          } : {}, {
            O: Pe.value.tagApiDtos && Pe.value.tagApiDtos.length
          }, Pe.value.tagApiDtos && Pe.value.tagApiDtos.length ? {
            P: e.f(Pe.value.tagApiDtos, (a, t, l) => ({
              a: e.t(a.tageDesc),
              b: "product-tag-" + t
            }))
          } : {}, {
            Q: e.f(null == (o = Pe.value) ? void 0 : o.pfTags, (a, t, l) => ({
              a: e.t(1 === (null == a ? void 0 : a.sex) ? "男" : "女"),
              b: e.f(null == a ? void 0 : a.dates, (t, l, o) => {
                var r;
                return {
                  a: e.t(t),
                  b: e.t(l + 1 < (null == (r = null == a ? void 0 : a.dates) ? void 0 : r.length) ? "、" : ""),
                  c: l
                }
              }),
              c: t
            })),
            R: "BZT" === Pe.value.category
          }, "BZT" === Pe.value.category ? {
            S: e.p({
              "travel-type": Ce.travelType,
              "custom-style": {
                flexShrink: 0,
                paddingLeft: 8
              }
            })
          } : {}, {
            T: Ce.itineraryDtos && Ce.itineraryDtos.length
          }, Ce.itineraryDtos && Ce.itineraryDtos.length ? {
            U: e.f(Ce.itineraryDtos, (a, t, l) => ({
              a: e.t(e.unref(d.valFormat)(a.startingPrice)),
              b: e.t(e.unref(r.getPriceModelDesc)(a.specificationsType)),
              c: e.t(a.categorySubDesc),
              d: e.t(a.itineraryDesc),
              e: e.t(a.itineraryShortDesc),
              f: "product-journey-" + t,
              g: a.active ? 1 : "",
              h: e.o(t => function(a) {
                se.value || a.itineraryCode === F.value.itineraryCode || (Ce.categorySub = a.categorySub, se.value = !0, ae.value = !1, e.nextTick$1(() => {
                  ae.value = !0
                }), G.value = {}, Ce.itineraryDtos.forEach(e => {
                  e.active = !1
                }), a.active = !0, F.value = a, oa())
              }(a), "product-journey-" + t)
            }))
          } : {}, {
            V: he.value > 0
          }, he.value > 0 ? e.e({
            W: e.f(ge.value, (a, t, l) => e.e({
              a: a.show
            }, a.show ? e.e({
              b: a.tagDesc
            }, a.tagDesc ? {
              c: e.t(a.tagDesc)
            } : {}, {
              d: e.t(a.week),
              e: e.t(a.MMdd),
              f: "实时计价" === a.price
            }, "实时计价" === a.price ? {} : {
              g: e.t(e.unref(d.valFormat)(a.price))
            }, {
              h: a.travelGroupCode === G.value.travelGroupCode ? 1 : "",
              i: e.o(e => function(e) {
                e.canTap = !0, k.value.chooseDay(e)
              }(a), t)
            }) : {}, {
              j: t
            })),
            X: he.value >= 4
          }, he.value >= 4 ? {
            Y: e.o(e => aa("all"))
          } : {}) : {}, {
            Z: 1 === x.value ? 1 : "",
            aa: e.o(e => ta(1)),
            ab: 2 === x.value ? 1 : "",
            ac: e.o(e => ta(2)),
            ad: 3 === x.value ? 1 : "",
            ae: e.o(e => ta(3)),
            af: 4 === x.value ? 1 : "",
            ag: e.o(e => ta(4)),
            ah: w.value ? 1 : "",
            ai: L.value + "px",
            aj: F.value.featureDtos && F.value.featureDtos.length > 0
          }, (F.value.featureDtos && F.value.featureDtos.length, {}), {
            ak: e.f(F.value.featureDtos, (a, t, l) => ({
              a: e.t(Ue(t + 1)),
              b: e.t(a.summarize),
              c: e.f(a.pictureDtos, (a, t, l) => ({
                a: a.picture + "?imageView2/1/w/442/h/333",
                b: e.t(a.subheading),
                c: e.t(a.featureDesc),
                d: t
              })),
              d: t
            })),
            al: F.value.largeImage
          }, (F.value.largeImage, {}), {
            am: F.value.largeImage
          }, F.value.largeImage ? {
            an: F.value.largeImage
          } : {}, {
            ao: e.f(F.value.dayDtos, (a, t, l) => e.e({
              a: e.t(a.rsvDay),
              b: 0 === t
            }, 0 === t ? {} : {
              c: e.t(a.placeOfDepartureDesc)
            }, {
              d: t === F.value.dayDtos.length - 1
            }, t === F.value.dayDtos.length - 1 ? {} : e.e({
              e: a.destinationDesc
            }, (a.destinationDesc, {}), {
              f: e.t(a.destinationDesc)
            }), {
              g: e.t(a.descript),
              h: e.t(a.dayTitle),
              i: e.o(e => pa(a, t), t),
              j: K.value[t]
            }, K.value[t] ? e.e({
              k: e.t(a.rsvDay),
              l: e.t(a.placeOfDepartureDesc),
              m: a.destinationDesc
            }, (a.destinationDesc, {}), {
              n: e.t(a.destinationDesc),
              o: L.value + 35 + "px",
              p: e.o(e => pa(a, t), t)
            }) : {}, {
              q: e.f(a.dayDetailDtos, (a, t, l) => e.e({
                a: a.titlesIcon,
                b: a.title
              }, a.title ? {
                c: e.t(a.title)
              } : {}, {
                d: a.descript
              }, a.descript ? {
                e: e.t(a.descript)
              } : {}, {
                f: a.picture
              }, a.picture ? {
                g: e.f(a.picture, (e, a, t) => ({
                  a: e,
                  b: a
                }))
              } : {}, {
                h: t
              })),
              r: "travel-date-item" + t,
              s: t,
              t: a.open ? 1 : ""
            })),
            ap: z.value.length > 0
          }, z.value.length > 0 ? {
            aq: e.p({
              slides: z.value,
              "swiper-config": re
            })
          } : {}, {
            ar: Ce.travelType && ae.value
          }, Ce.travelType && ae.value ? {
            as: e.p({
              content: F.value.costDescription
            }),
            at: e.p({
              content: F.value.costIncludes
            }),
            av: e.p({
              content: F.value.costExcluding
            }),
            aw: e.p({
              "default-height": "30px",
              open: !0,
              "arrow-style": X.value,
              "icon-name": "icon-a-16_xialajiantou_hei"
            }),
            ax: e.p({
              content: F.value.warmPrompt
            }),
            ay: e.p({
              "default-height": "30px",
              open: !0,
              "arrow-style": X.value,
              "icon-name": "icon-a-16_xialajiantou_hei"
            }),
            az: e.p({
              content: F.value.bookCondition
            }),
            aA: e.p({
              "default-height": "30px",
              open: !0,
              "arrow-style": X.value,
              "icon-name": "icon-a-16_xialajiantou_hei"
            })
          } : {}, {
            aB: Ce.productProblemDtos && Ce.productProblemDtos.length > 0
          }, Ce.productProblemDtos && Ce.productProblemDtos.length > 0 ? e.e({
            aC: e.f(Ce.productProblemDtos, (a, t, l) => e.e({
              a: t < 3
            }, t < 3 ? {
              b: e.t(a.title),
              c: e.t(a.answer),
              d: e.o(e => function(e) {
                h.goPage("/pagesB/other/questionDetail?problemCode=" + e.problemCode)
              }(a), t)
            } : {}, {
              e: t
            })),
            aD: Ce.productProblemDtos.length > 3
          }, Ce.productProblemDtos.length > 3 ? {
            aE: e.o(e => {
              ea() || (y.setStorage("problemDtos", Ce.productProblemDtos), h.goPage("/pagesB/other/question?type=product"))
            })
          } : {}) : {}, {
            aF: J.value
          }, J.value ? e.e({
            aG: e.o(e => ze(!1)),
            aH: "recommend" === V.value
          }, "recommend" === V.value ? {
            aI: e.o($e)
          } : {}, {
            aJ: he.value > 0 || B.value
          }, he.value > 0 || B.value ? {
            aK: e.o(aa)
          } : {}) : {}, {
            aL: "PEOPLE" === G.value.priceModel
          }, "PEOPLE" === G.value.priceModel ? {
            aM: e.o(Ve),
            aN: e.p({
              min: Ne.value,
              max: Re.value,
              "model-value": we.value
            }),
            aO: e.o(Oe),
            aP: e.p({
              min: qe.value,
              max: Be.value,
              "model-value": Ye.value
            })
          } : "PACKAGE" === G.value.priceModel ? {
            aR: e.o(e => xe.value = e),
            aS: e.p({
              max: Le.value,
              modelValue: xe.value
            })
          } : "FAMILY" === G.value.priceModel && G.value.specificationsPriceDtos ? {
            aU: e.f(G.value.specificationsPriceDtos, (a, t, l) => e.e({
              a: a.adult > 0 || a.children > 0
            }, a.adult > 0 || a.children > 0 ? e.e({
              b: a.adult > 0
            }, a.adult > 0 ? {
              c: e.t(a.adult)
            } : {}, {
              d: a.children > 0
            }, a.children > 0 ? {
              e: e.t(a.children),
              f: e.t(e.unref(r.ProductChildTypeMeta)[a.childType])
            } : {}) : {}, {
              g: "type-" + t,
              h: e.n({
                active: I.value._id === a._id
              }),
              i: e.o(e => {
                return t = a, void(I.value = t);
                var t
              }, "type-" + t)
            }))
          } : {}, {
            aQ: "PACKAGE" === G.value.priceModel,
            aT: "FAMILY" === G.value.priceModel && G.value.specificationsPriceDtos,
            aV: "PACKAGE" === G.value.priceModel
          }, "PACKAGE" === G.value.priceModel ? {
            aW: e.t(G.value.allNumber)
          } : ("PEOPLE" === G.value.priceModel || G.value.priceModel, {}), {
            aX: "PEOPLE" === G.value.priceModel,
            aY: "FAMILY" === G.value.priceModel,
            aZ: "PACKAGE" !== G.value.priceModel
          }, "PACKAGE" !== G.value.priceModel ? {
            ba: e.o(e => ze(!0))
          } : {}, {
            bb: e.o(e => ma()),
            bc: e.sr(Y, "96fa774f-15", {
              k: "numberLayer"
            }),
            bd: e.p({
              title: "PACKAGE" === G.value.priceModel ? "选择预订套数" : "选择出行人数"
            }),
            be: _.value
          }, _.value ? {
            bf: e.o(Qe),
            bg: e.p({
              "poster-info": te.value
            })
          } : {}, {
            bh: e.sr(O, "96fa774f-21", {
              k: "kf"
            }),
            bi: e.p({
              title: "联系客服",
              sideslip: W.value,
              "tracking-data": {
                commodity_id: q.value,
                commodity_name: Pe.value.title
              }
            }),
            bj: Ce.travelType && !ye.value && !P.value,
            bk: e.o((...a) => e.unref(ha) && e.unref(ha)(...a)),
            bl: e.o(sa),
            bm: e.o(e => De.value = e),
            bn: e.p({
              "z-index": 900,
              show: De.value
            }),
            bo: $.value
          }, ($.value, {}), {
            bp: e.t(F.value.categorySubDesc),
            bq: e.t(F.value.itineraryDesc),
            br: e.t(F.value.itineraryShortDesc),
            bs: e.sr(k, "96fa774f-24,96fa774f-23", {
              k: "dailyPrices"
            }),
            bt: e.o(va),
            bv: G.value.groupBeginDateFormat && oe.value
          }, G.value.groupBeginDateFormat && oe.value ? {
            bw: e.t(G.value.groupBeginDateFormat),
            bx: e.t(G.value.groupEndDateFormat)
          } : {}, {
            by: e.o(e => Xe()),
            bz: e.sr(R, "96fa774f-23", {
              k: "orderLayer"
            }),
            bA: e.p({
              title: "选择可订团期"
            })
          })
        }
      }
    });
  I.__runtimeHooks = 7;
  const x = e._export_sfc(I, [
    ["__scopeId", "data-v-96fa774f"]
  ]);
  wx.createPage(x)
}();