! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = require("../../base/channel.js"),
    t = require("../../base/common.js"),
    a = require("../../base/jAlert/jAlert.js"),
    l = require("../../hooks/useAdReport.js"),
    u = require("../../hooks/useScroll.js"),
    r = require("../../hooks/useSubscribeMessage.js"),
    i = require("../../hooks/useXhsReport.js"),
    n = require("../../utils/api.js"),
    s = require("../../utils/filter.js"),
    c = require("../../utils/helper.js"),
    v = require("../../utils/qdTracker.js"),
    d = require("../../utils/utils.js"),
    p = require("../../utils/wxuser.js");
  Array || e.resolveComponent("mp-html")(), Math || (f + C + y + T + (() => "../../uni_modules/mp-html/components/mp-html/mp-html.js") + m + D + h + g)();
  const g = () => "../../components/backToTop.js",
    m = () => "../../components/collapse.js",
    f = () => "../../components/coustomHead.js",
    h = () => "../../components/kfDialog.js",
    C = () => "../../components/new/ErrorLimiting.js",
    y = () => "../../components/swiperBox.js",
    D = () => "../../components/travelDialog.js",
    T = () => "../components/ExchangeListBox.js",
    k = e.defineComponent({
      __name: "exchangeCouponDetail",
      setup(g) {
        const m = i.useXshReport(),
          {
            subscribeMessage: f
          } = r.useSubscribeMessage(["NEW_ACTIVITY_MA", "POINT_VALID_MA", "TRAVEL_GUIDE_MA"]),
          h = l.useAdReport();
        setTimeout(() => {
          h("PRODUCT_VIEW"), h("VIEW_CONTENT")
        }, 300);
        const {
          scrollTop: C,
          onPageScroll: y
        } = u.useScroll(), D = p.getStorage("config"), T = p.getStorage("wxuser"), k = e.ref(p.getStorage("user") || {}), x = e.ref(o.defaultShopChannel), b = e.ref(1), I = e.ref(0), P = e.ref(!1), S = e.ref(!0), L = e.ref(""), j = e.ref([]), N = e.ref({}), _ = e.ref({}), G = e.ref(), A = e.ref(""), q = e.ref(""), V = e.ref(!1), R = e.ref(!1), w = e.ref([]), M = e.ref(), U = e.ref("T"), Y = e.ref(""), E = e.ref(""), B = e.ref(""), O = e.ref([]), $ = e.ref({}), F = e.ref(!1), H = e.ref(!1), J = e.ref([]), W = e.ref(!1), Q = e.ref(!1), X = e.reactive({
          indicatorDots: !1,
          autoplay: !1,
          dotPosStyle: "left: 50%;transform: translateX(-50%);bottom:12px;"
        }), z = e.ref([]), K = e.reactive([]);

        function Z() {
          var e;
          n.api.getGoodsIsCollection({
            goodsId: L.value,
            hotelGroupCode: D.hotelGroupCode,
            hotelCode: D.hotelCode,
            memberId: null == (e = k.value) ? void 0 : e.memberId
          }).then(e => {
            F.value = !1, 1 === e.result && e.retVal && e.retVal.length > 0 && (H.value = !0, J.value = e.retVal[0].id)
          })
        }

        function ee(e) {
          re() || (A.value = e.travelType, q.value = e.title, G.value.showDialog())
        }

        function oe(o) {
          const t = e.index.createSelectorQuery(),
            a = e.index.createSelectorQuery(),
            l = [];
          S.value = !1, t.selectAll(".topContent").boundingClientRect(), a.selectAll(".contentHight").boundingClientRect(), t.exec(t => {
            let u = t[0][0].height + 15;
            a.exec(t => {
              for (let e = 0; e < t[0].length; e++) l.push(t[0][e].height + 32);
              for (let e = 0; e < o - 1; e++) u += l[e];
              e.index.pageScrollTo({
                scrollTop: u,
                duration: 200,
                success: () => {
                  b.value = o, setTimeout(() => {
                    S.value = !0
                  }, 300)
                }
              })
            })
          })
        }

        function te(e) {
          z.value = [];
          const o = [],
            t = [],
            a = [],
            l = [],
            u = {
              unitCode: D.hotelGroupCode,
              hotelGroupCode: D.hotelGroupCode
            };
          e.couponCodeUseConfigProductDtoList.forEach(e => {
            const u = e.type.toString();
            "4" === u && o.push(e.productCode), "3" === u && a.push(e.productCode), "2" === u && "Custom" !== e.productPrimaryClassification && l.push(e.productPrimaryClassification), "1" === u && t.push(e.productCode)
          }), w.value = o, a.length > 0 && (u.itineraryCodes = a), t.length > 0 && (u.travelTypes = t), l.length > 0 && (u.categorySubs = l), o.length > 0 && (u.travelGroupCodes = o), n.api.interfaceTransfer({
            query: u,
            config: {
              interfaceType: "POST",
              interfaceModule: "GC_PRODUCT_JOURNEY",
              interfaceMethod: "/api/travelGroup/listTravelProductForWechatTdqV2",
              interfaceFrom: "GC",
              hotelGroupCode: D.hotelGroupCode
            }
          }).then(o => {
            if (1 === o.result && 0 === o.retVal.result && o.retVal.retVal) {
              const t = o.retVal.retVal;
              e.productDtoList = t
            }
          })
        }
        e.onShareAppMessage(() => ({
          title: _.value.name,
          imageUrl: c.shareImageTransfrom(_.value.mainPic)
        })), y(o => {
          C.value = o.scrollTop;
          const t = [],
            a = e.index.createSelectorQuery();
          a.selectAll(".contentHight").boundingClientRect();
          const l = e.index.createSelectorQuery();
          l.selectAll(".tabs-warp").boundingClientRect(), l.exec(e => {
            e[0][0].top < I.value ? P.value = !0 : P.value = !1
          }), a.exec(e => {
            for (let o = 0; o < e[0].length; o++) t.push(e[0][o].top);
            S.value && (t[2] < 0 ? b.value = 3 : t[1] < 0 ? b.value = 2 : b.value = 1)
          })
        });
        const ae = e.ref("");

        function le() {
          const o = {
            hotelGroupCode: D.hotelGroupCode,
            equipment: "desktop",
            goodsId: L.value,
            appid: D.appid,
            channel: x.value
          };
          T && T.openid && (o.openid = T.openid), k.value && k.value.memberId && (o.memberId = k.value.memberId), R.value && !V.value && (o.isMarketingPage = !0), Q.value = !0, e.index.showLoading({
            title: "加载中..."
          }), n.api.goodsDetail(o).then(e => {
            W.value = !1, _.value = e.retVal, ae.value = _.value.vrCode, _.value.tags = _.value.shopGoodsConfig.goodsCity.split(","), _.value.extraConfig && (_.value.extraConfig = JSON.parse(_.value.extraConfig)), "pack" === _.value.vrType ? O.value = _.value.couponPackageDetailList : (O.value = [{
              couponCodeUseConfigProductDtoList: []
            }], O.value[0].couponCodeUseConfigProductDtoList = _.value.couponCodeUseConfigProductDtoList), O.value.length > 0 && O.value.forEach(e => {
              te(e)
            }), _.value.shopGoodsConfig.limitPayment && (_.value.shopGoodsConfig.limitPayment.includes("11") || (U.value = "F", _.value.credit = 0));
            const o = _.value.price;
            _.value.price = _.value.cashPrice, _.value.creditPrice = o, _.value.diyDetail = JSON.parse(_.value.shopGoodsConfig.diyDetail), _.value.notesToBuy = JSON.parse(_.value.shopGoodsConfig.notesToBuy), e.retVal.pictureUrl.split(",").filter(e => e).forEach(e => {
              K.push({
                imgUrl: e
              })
            }), $.value = {
              commodity_id: _.value.id,
              commodity_name: _.value.name,
              series: B.value
            }, v.qdTracker.setData($.value), v.qdTracker.track("mini_productdetail_view", {
              commodity_id: _.value.id,
              commodity_name: _.value.name
            }), n.api.goodsSku({
              hotelGroupCode: D.hotelGroupCode,
              goodsId: L.value
            }).then(e => {
              W.value = !1, e.retVal.stock.length > 0 && (j.value = e.retVal.stock, j.value.forEach(e => {
                const o = e.price;
                e.price = e.cashPrice, e.creditPrice = o, e.extraConfig && (e.peopleNum = JSON.parse(e.extraConfig).peopleNum), e.stock > 0 && !N.value.skuId && (N.value = e, e.peopleNum && (_.value.extraConfig.peopleNum = e.peopleNum), "pack" === _.value.vrType ? O.value = e.couponPackageDetailList : (O.value = [{
                  couponCodeUseConfigProductDtoList: []
                }], O.value[0].couponCodeUseConfigProductDtoList = e.couponCodeUseConfigProductDtoList), O.value.length > 0 && O.value.forEach(e => {
                  te(e)
                }))
              }))
            }).catch(e => {
              (null == e ? void 0 : e.code) !== t.RateLimitStatusCode && (null == e ? void 0 : e.status) !== t.RateLimitStatusCode || (W.value = !0)
            })
          }).catch(e => {
            (null == e ? void 0 : e.code) !== t.RateLimitStatusCode && (null == e ? void 0 : e.status) !== t.RateLimitStatusCode || (W.value = !0)
          }).finally(() => {
            Q.value = !1, e.index.hideLoading()
          })
        }

        function ue(o, t, a, l, u) {
          let r = "";
          return r = "byDate" === o ? "" === a ? "" : "2099" === e.dayjs(a).format("YYYY").toString() ? "长期有效" : `${e.dayjs(t).format("YYYY年MM月DD日")}-${e.dayjs(a).format("YYYY年MM月DD日")}` : "2" === o.toString() ? 0 === Number(l) ? "有效期至" + e.dayjs(a).format("YYYY年MM月DD日") : `购买后第${l}天生效，有效期至${e.dayjs(a).format("YYYY年MM月DD日")}` : 0 === Number(l) ? `购买后${u}天内有效` : `购买后第${l}天生效，有效期${u}天`, r
        }

        function re() {
          return !!V.value && (e.index.showToast({
            title: "预览链接无法操作，请从正常入口进入。",
            icon: "none",
            duration: 5e3
          }), !0)
        }
        const ie = e.computed(() => {
          const e = [];
          return O.value.forEach(o => {
            o.productDtoList && o.productDtoList.length > 0 && e.push(o)
          }), e
        });
        return e.onLoad(o => {
          m.report(m.actionTypeEnum.visit, null), e.index.pageScrollTo({
            scrollTop: 0,
            duration: 200,
            success: e => {
              setTimeout(() => {
                S.value = !0
              }, 1e3)
            }
          }), o && o.isPreview && (V.value = o.isPreview), "true" === (null == o ? void 0 : o.isMarketingPage) && (R.value = !0), o.sourceActivityId && (Y.value = o.sourceActivityId), o.sourceActivityName && (E.value = decodeURIComponent(o.sourceActivityName)), o.seriesDesc && (B.value = decodeURIComponent(o.seriesDesc)), L.value = o.id
        }), e.onMounted(() => {
          Z(), le(), e.index.getSystemInfo({
            success: e => {
              I.value = e.statusBarHeight + 40
            },
            fail(e) {
              console.log(e)
            }
          })
        }), e.onUnload(() => {
          v.qdTracker.resetData($.value)
        }), (o, t) => e.e({
          a: W.value
        }, W.value ? {
          b: e.p({
            color: "#fff",
            "bg-color": "#000"
          }),
          c: e.o(le),
          d: e.p({
            show: W.value
          })
        } : _.value.id && !Q.value ? e.e({
          f: e.p({
            "is-preview": V.value,
            color: e.unref(C) > 50 ? "#000" : "#fff",
            "bg-color": e.unref(C) > 50 ? "#fff" : ""
          }),
          g: !Q.value && !W.value
        }, Q.value || W.value ? {} : e.e({
          h: e.p({
            slides: K,
            "swiper-config": X
          }),
          i: e.t(_.value.name),
          j: H.value ? 1 : "",
          k: H.value ? 1 : "",
          l: H.value ? "" : 1,
          m: e.o(e => function() {
            var e;
            if (!re()) return (null == (e = k.value) ? void 0 : e.memberId) ? void(H.value ? async function() {
              if (F.value) return !1;
              F.value = !0, await f(), n.api.deleteGoodsCollection([J.value]).then(e => {
                F.value = !1, 1 === e.result ? (a.jAlert3("取消收藏"), H.value = !1) : a.jAlert3(e.msg)
              })
            }(): async function() {
              var e;
              if (F.value) return !1;
              F.value = !0, await f(), n.api.addGoodsCollection({
                goodsId: L.value,
                goodsName: _.value.name,
                hotelCode: D.hotelCode,
                hotelGroupCode: D.hotelGroupCode,
                memberId: null == (e = k.value) ? void 0 : e.memberId,
                picture: _.value.logo,
                productType: "shop",
                price: _.value.price,
                subGoodsName: _.value.secondTitle
              }).then(e => {
                1 === e.result ? (h("ADD_TO_WISHLIST"), v.qdTracker.track("collect", {
                  collect_type: "产品"
                }), a.jAlert3("收藏成功"), Z()) : a.jAlert3(e.msg)
              })
            }()) : (d.toLogin(), !1)
          }()),
          n: e.t(_.value.secondTitle),
          o: e.t(e.unref(s.valFormat)(_.value.price)),
          p: j.value.length > 0
        }, (j.value.length, {}), {
          q: e.o(o => {
            re() || e.index.showModal({
              content: "此价格为多人拼团，2人共享一个房间，单人的价格。",
              showCancel: !1,
              confirmText: "我知道了",
              confirmColor: "#000000"
            })
          }),
          r: _.value.credit
        }, _.value.credit ? e.e({
          s: e.t(e.unref(s.valFormat)(_.value.creditPrice)),
          t: e.t(e.unref(s.valFormat)(_.value.credit)),
          v: j.value.length > 0
        }, (j.value.length, {})) : {}, {
          w: _.value.shopGoodsConfig.goodsCity
        }, _.value.shopGoodsConfig.goodsCity ? {
          x: e.f(_.value.tags, (o, t, a) => ({
            a: e.t(o),
            b: t
          }))
        } : {}, {
          y: j.value.length
        }, j.value.length ? {
          z: e.f(j.value, (o, t, a) => ({
            a: e.t(o.sku[0].itemValue),
            b: e.t(o.skuDesc),
            c: t,
            d: N.value.skuId === o.skuId ? 1 : "",
            e: e.o(e => function(e) {
              re() || (console.log(e), N.value = e, e.peopleNum && (_.value.extraConfig.peopleNum = e.peopleNum), "pack" === _.value.vrType ? O.value = e.couponPackageDetailList : (O.value = [{
                couponCodeUseConfigProductDtoList: []
              }], O.value[0].couponCodeUseConfigProductDtoList = e.couponCodeUseConfigProductDtoList), O.value.length > 0 && O.value.forEach(e => {
                te(e)
              }))
            }(o), t)
          }))
        } : {}), {
          A: 1 === b.value ? 1 : "",
          B: e.o(e => oe(1)),
          C: 2 === b.value ? 1 : "",
          D: e.o(e => oe(2)),
          E: 3 === b.value ? 1 : "",
          F: e.o(e => oe(3)),
          G: P.value ? 1 : "",
          H: I.value + "px",
          I: e.f(ie.value, (o, t, a) => e.e({
            a: o.productDtoList && o.productDtoList.length > 0
          }, o.productDtoList && o.productDtoList.length > 0 ? e.e({
            b: ie.value.length > 1
          }, ie.value.length > 1 ? {
            c: e.t(t + 1)
          } : {}, {
            d: e.o(ee, t),
            e: "250a8c56-4-" + a,
            f: e.p({
              list: o.productDtoList,
              "coupon-code": ae.value
            })
          }) : {}, {
            g: t
          })),
          J: _.value.extraConfig.peopleNum
        }, _.value.extraConfig.peopleNum ? {
          K: e.t(_.value.extraConfig.peopleNum)
        } : {}, {
          L: _.value.extraConfig.exchangeRule
        }, _.value.extraConfig.exchangeRule ? {
          M: e.p({
            content: _.value.extraConfig.exchangeRule
          })
        } : {}, {
          N: _.value.extraConfig.yyRule
        }, _.value.extraConfig.yyRule ? {
          O: e.p({
            content: _.value.extraConfig.yyRule
          })
        } : {}, {
          P: _.value.extraConfig.otherDes
        }, _.value.extraConfig.otherDes ? {
          Q: e.p({
            content: _.value.extraConfig.otherDes
          })
        } : {}, {
          R: e.f(_.value.diyDetail, (o, t, a) => e.e({
            a: o.name || o.content
          }, o.name || o.content ? {
            b: e.t(o.name),
            c: o.content,
            d: "250a8c56-8-" + a,
            e: e.p({
              "default-height": "30px",
              open: !0,
              "arrow-style": "position: absolute;right: 0;top: -5px;width: 100%;display: flex;justify-content: flex-end;",
              "icon-name": "icon-a-16_xialajiantou_hei"
            })
          } : {}, {
            f: t
          })),
          S: _.value.notesToBuy && _.value.notesToBuy.length > 0
        }, _.value.notesToBuy && _.value.notesToBuy.length > 0 ? e.e({
          T: e.f(_.value.notesToBuy, (o, t, a) => e.e({
            a: t < 3
          }, t < 3 ? {
            b: e.t(o.label),
            c: e.t(o.answer),
            d: e.o(e => function(e) {
              re() || d.goPage("/pagesB/other/questionDetail?problemCode=" + e.key)
            }(o), t)
          } : {}, {
            e: t
          })),
          U: _.value.notesToBuy.length > 3
        }, _.value.notesToBuy.length > 3 ? {
          V: e.o(e => {
            re() || (_.value.notesToBuy.forEach(e => {
              e.problemCode = e.key
            }), p.setStorage("problemDtos", _.value.notesToBuy), d.goPage("/pagesB/other/question?type=product"))
          })
        } : {}) : {}, {
          W: e.o(e => {
            re() || M.value.showDialog()
          }),
          X: e.o(e => function() {
            if (re()) return;
            if (!k.value || !k.value.memberId) return void d.toLogin();
            const e = {
              goodsId: _.value.id,
              logoUrl: _.value.logo,
              vrType: _.value.vrType,
              goodsName: _.value.name,
              price: _.value.price,
              goodsType: _.value.goodsType,
              stock: _.value.stock,
              hotelName: _.value.hotelName,
              number: 1,
              credit: _.value.credit,
              creditPrice: _.value.creditPrice,
              minLimit: _.value.minLimit,
              hotelCode: _.value.hotelCode,
              useTime: ue(_.value.vrDateType, _.value.vrStartDate, _.value.vrEndDate, _.value.vrBeginDay, _.value.vrValidDays)
            };
            if (N.value.skuId) {
              const o = [{
                stock: N.value.stock,
                price: N.value.price,
                credit: N.value.credit,
                creditPrice: N.value.creditPrice,
                sku: JSON.stringify([{
                  itemId: N.value.sku[0].itemId,
                  itemName: N.value.sku[0].itemName,
                  itemValue: N.value.sku[0].itemValue,
                  itemValueId: N.value.sku[0].itemValueId
                }])
              }];
              e.logoUrl = N.value.skuPicture, e.skuId = N.value.skuId, e.price = N.value.price, e.credit = N.value.credit, e.creditPrice = N.value.creditPrice, e.skuInfo = o, e.stock = N.value.stock, e.useTime = ue(N.value.vrDateType, N.value.vrStartDate, N.value.vrEndDate, N.value.vrBeginDay, N.value.vrValidDays)
            }
            e.stock <= 0 || e.stock < _.value.minLimit ? a.jAlert3("库存不足") : (_.value.extraConfig.peopleNum && (e.peopleNum = _.value.extraConfig.peopleNum), "F" === U.value && (e.credit = 0), v.qdTracker.track("book_click", {
              commodity_id: e.goodsId,
              commodity_name: e.goodsName
            }), p.setStorage("travelInfo", e), d.goPage(`/pagesB/travel/confirmOrder?productType=shop&sourceActivityId=${Y.value}&sourceActivityName=${E.value}`))
          }()),
          Y: e.sr(G, "250a8c56-9", {
            k: "travel"
          }),
          Z: e.p({
            "travel-type": A.value,
            "travel-title": q.value,
            "travel-group-codes": w.value,
            "coupon-code": ae.value
          }),
          aa: e.sr(M, "250a8c56-10", {
            k: "kf"
          }),
          ab: e.p({
            title: "联系客服",
            "tracking-data": {
              commodity_id: L.value,
              commodity_name: _.value.name
            }
          })
        }) : {}, {
          e: _.value.id && !Q.value
        })
      }
    });
  k.__runtimeHooks = 3;
  const x = e._export_sfc(k, [
    ["__scopeId", "data-v-250a8c56"]
  ]);
  wx.createPage(x)
}();