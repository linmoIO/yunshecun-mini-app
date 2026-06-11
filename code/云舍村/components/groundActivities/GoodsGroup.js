! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    l = require("../../base/channel.js"),
    a = require("../../base/product.js"),
    t = require("../../hooks/useNavigatorRect.js"),
    u = require("../../services/trip.js"),
    i = require("../../utils/helper.js"),
    o = require("../../utils/qdTracker.js"),
    n = require("../../utils/utils.js"),
    r = require("../../utils/wxuser.js");
  Math || (c + f + v + s + d)();
  const v = () => "../new/ProductCardList.js",
    d = () => "../new/StAd.js",
    s = () => "../water.js",
    c = () => "./LineTab.js",
    f = () => "./Tabs.js",
    p = e.defineComponent({
      __name: "GoodsGroup",
      props: {
        adCustomTravelList: null
      },
      emits: ["first-group-fixed", "group-name", "is-reach-success"],
      setup(v, {
        expose: d,
        emit: s
      }) {
        const c = v,
          f = s,
          p = r.getStorage("config"),
          h = t.useNavigatorRect(),
          g = {
            1: "travel",
            2: "daily",
            3: "hotel",
            4: "travel"
          },
          m = e.ref(""),
          b = e.ref([]),
          L = e.ref(""),
          T = e.ref(""),
          y = e.ref([]),
          x = e.ref(0),
          C = e.ref({}),
          _ = e.ref({}),
          w = e.ref([]),
          k = e.ref(0);
        e.ref(0), e.ref(0), e.ref(0), e.ref(!1);
        const E = e.ref([]),
          j = e.ref([]),
          R = e.computed(() => {
            var e;
            return (null == (e = h.value.padding) ? void 0 : e.top) + h.value.height
          }),
          G = e.ref(!1),
          I = e.ref(!1),
          q = e.ref(!1),
          S = e.ref([
            [],
            []
          ]),
          U = e.getCurrentInstance(),
          P = e.ref(!1),
          A = e.ref(0),
          D = e.ref(1),
          z = e.ref(0);
        let B = [],
          N = [];
        const V = e.ref(),
          F = e.ref(),
          H = e.ref();
        let O = [];

        function M() {
          const a = r.getStorage("user");
          e.index.showLoading({
            mask: !0,
            title: "加载中"
          }), u.getTripRecommendFeed({
            hotelGroupCode: p.hotelGroupCode,
            curPage: D.value,
            mobile: null == a ? void 0 : a.mobile,
            teamNo: "",
            isRecommendDayActivity: !0,
            firstResult: 0,
            channel: l.defaultChannel,
            pageSize: 8
          }).then(l => {
            var a, t;
            z.value = (null == (a = l.retVal) ? void 0 : a.totalRows) || 0;
            const u = (null == (t = null == l ? void 0 : l.retVal) ? void 0 : t.datas) || [];
            B.push(...u);
            const i = B;
            N = [...B];
            const o = function(e = [], l = 1) {
                const a = [];
                let t = [];
                return e.forEach((u, i) => {
                  t.push(u);
                  const o = i % l == l - 1,
                    n = i === e.length - 1;
                  (o || n) && (a.push(t), t = [])
                }), a
              }(i, 2) || [],
              n = [
                [],
                []
              ];
            o.forEach(e => {
              e.forEach((e, l) => n[l].push(e))
            }), S.value[0] = [...S.value[0], ...n[0]], S.value[1] = [...S.value[1], ...n[1]], setTimeout(() => {
              e.index.hideLoading()
            }, 1e3)
          })
        }

        function Q(e) {
          if (null == e ? void 0 : e.length) return "goods" === e[0].groupType
        }

        function $(e) {
          if (null == e ? void 0 : e.length) return "marketing" === e[0].groupType
        }

        function J(e) {
          if (null == e ? void 0 : e.length) return "advertise" === e[0].groupType
        }

        function K() {
          e.index.showLoading({
            title: "加载中"
          }), u.getAdvertiseProductGroup({
            hotelGroupCode: p.hotelGroupCode,
            clientType: "wechat_mini",
            pageType: "ON_SITE_ACTIVITIES"
          }).then(l => {
            if (e.index.hideLoading(), b.value = l.detailList || [], console.log("firstGroupList", b.value), m.value = (null == l ? void 0 : l.title) || "在地探索", f("group-name", m.value), f("is-reach-success", !0), b.value.length) {
              if ($(b.value)) return G.value = !0, b.value = [], void ue();
              if (Q(b.value)) return O = b.value, ae(), y.value = [], void(b.value = []);
              if (J(b.value)) return Z(b.value), I.value = !0, void(b.value = []);
              b.value.forEach(e => {
                e.id = e.detailCode
              }), x.value = b.value[0].id, Y(x.value, !1)
            }
          }).catch(() => {
            e.index.hideLoading(), f("is-reach-success", !0)
          })
        }

        function W(e) {
          const l = N.findIndex(l => l.id === e.id);
          N[l] = e;
          const a = N.filter(e => e.element);
          if (a.length !== N.length) return;
          const t = [
            [],
            []
          ];
          let u = 0,
            i = 0;
          a.forEach(e => u <= i ? (u += e.element.height, t[0].push(e)) : (t[1].push(e), i += e.element.height)), S.value = t
        }

        function X(e) {
          x.value = e, oe(), setTimeout(() => {
            Y(x.value, !0)
          }, 200)
        }

        function Y(e, l) {
          var a;
          const t = b.value.find(l => l.id === e);
          L.value = (null == t ? void 0 : t.groupPicUrl) || "", T.value = (null == t ? void 0 : t.path) || "", G.value = !1, I.value = !1, y.value = [], E.value = [], q.value = !1, l && ne(t), (null == (a = null == t ? void 0 : t.childrenList) ? void 0 : a.length) ? Q(t.childrenList) ? (O = t.childrenList, ae(), y.value = []) : $(t.childrenList) ? (ue(), G.value = !0) : J(t.childrenList) ? (Z(t.childrenList), I.value = !0, k.value = t.id) : function() {
            const e = b.value.find(e => e.id === x.value),
              l = (null == e ? void 0 : e.childrenList) || [];
            l.length ? (l.forEach(e => {
              e.id = e.detailCode
            }), y.value = l, C.value = l[0], setTimeout(() => {
              var e;
              null == (e = F.value) || e.updateTabId(C.value.id)
            }, 180), ee(C.value)) : (y.value = [], E.value = [])
          }() : ie()
        }
        async function Z(l) {
          (null == l ? void 0 : l.length) && await Promise.all(l.map(async l => {
            l.fileType = function(e) {
              var l;
              const a = null == (l = e.split("?")[0].split("#")[0].split(".").pop()) ? void 0 : l.toLowerCase();
              return ["jpg", "jpeg", "png", "gif", "bmp", "webp", "tiff", "svg"].includes(a) ? "image" : ["mp4", "avi", "mov", "mkv", "webm", "flv", "wmv", "m4v"].includes(a) ? "video" : void 0
            }(l.fileUrl), l.aspectRatio = await async function(l, a) {
              if (l)
                if ("image" === a) try {
                  const a = await e.index.getImageInfo({
                    src: l
                  });
                  if (a.width && a.height) return a.width / a.height
                } catch (e) {
                  console.log("[StAd] getImageInfo failed", e)
                } else if ("video" === a) return 16 / 9
            }(l.fileUrl, l.fileType)
          })), w.value = l
        }

        function ee(e, l = !1) {
          var a, t;
          l && P.value && oe(), q.value = l, E.value = [], C.value = e, G.value = !1, I.value = !1, l && ne(C.value), (null == (t = null == (a = C.value) ? void 0 : a.childrenList) ? void 0 : t.length) ? Q(C.value.childrenList) ? (O = C.value.childrenList, ae()) : $(C.value.childrenList) ? (ue(), G.value = !0) : J(C.value.childrenList) ? (Z(C.value.childrenList), I.value = !0, k.value = C.value.id) : function(e = !1) {
            var l;
            const a = y.value.find(e => e.id === C.value.id),
              t = (null == a ? void 0 : a.childrenList) || [];
            t.length ? (t.forEach(e => {
              e.id = e.detailCode
            }), E.value = t, _.value = t[0], null == (l = H.value) || l.updateTabId(_.value.id), le(_.value, e)) : E.value = []
          }(l) : ie()
        }

        function le(e, l = !1) {
          var a, t;
          l && P.value && oe(), q.value = l, _.value = e, G.value = !1, I.value = !1, l && ne(_.value), (null == (t = null == (a = _.value) ? void 0 : a.childrenList) ? void 0 : t.length) ? Q(_.value.childrenList) ? (O = _.value.childrenList, ae()) : $(_.value.childrenList) ? (ue(), G.value = !0) : J(_.value.childrenList) && (Z(_.value.childrenList), I.value = !0, k.value = _.value.id) : ie()
        }

        function ae() {
          e.index.showLoading({
            title: "加载中"
          }), u.getProductGroupGoodsDataList({
            hotelGroupCode: p.hotelGroupCode,
            otaChannel: "WECHAT",
            goodsList: O
          }).then(l => {
            l.forEach(e => {
              e.productType = g[e.goodsType]
            }), j.value = l, e.index.hideLoading()
          })
        }
        function se(t) {
          const l = Array.isArray(t) ? t : [];
          try {
            if (a && "function" == typeof a.formatTravelThemeProducts) return a.formatTravelThemeProducts(l)
          } catch (e) {
            console.warn("[GoodsGroup] format via cached product module failed:", e)
          }
          try {
            const e = require("../../base/product.js");
            if (e && "function" == typeof e.formatTravelThemeProducts) return e.formatTravelThemeProducts(l)
          } catch (e) {
            console.warn("[GoodsGroup] format via dynamic product module failed:", e)
          }
          return l
        }
        const te = e.computed(() => se(j.value));

        function ue() {
          D.value = 1, S.value = [
            [],
            []
          ], B = [], M()
        }

        function ie() {
          j.value = [], B = [], w.value = []
        }

        function oe() {
          console.warn("执行函数 backToTop"), e.nextTick$1(() => {
            const l = e.index.createSelectorQuery().in(U);
            l.select(".goods-group-anchor").boundingClientRect(), l.selectViewport().scrollOffset(() => {}), l.exec(l => {
              if (!l || !l[0] || !l[1]) return void console.warn("未找到 .goods-group-anchor 或 scrollOffset");
              const a = l[0],
                t = l[1],
                u = a.top + t.scrollTop - R.value;
              e.index.pageScrollTo({
                scrollTop: u,
                duration: 300
              })
            })
          })
        }

        function ne(e) {
          o.qdTracker.track("click_activity_group", {
            group_id: null == e ? void 0 : e.id,
            group_name: null == e ? void 0 : e.name,
            source_group_id: null == e ? void 0 : e.parentDetailCode
          })
        }
        return e.onPageScroll(() => {
          U && e.index.createSelectorQuery().in(U).select(".group-container").boundingClientRect(e => {
            e && (e.top <= R.value + 2 ? P.value || (P.value = !0, f("first-group-fixed", !0), setTimeout(() => {
              var e;
              null == (e = V.value) || e.updateTab(x.value)
            }, 50), console.log(" 一级分类已固定，开始监听滚动距离")) : P.value && (P.value = !1, A.value = 0, f("first-group-fixed", !1), console.log(" 一级分类取消固定")))
          }).exec()
        }), e.onLoad(() => {
          K(), o.qdTracker.track("view_activity_page", {})
        }), e.onReachBottom(() => {
          z.value > S.value[0].length + S.value[1].length && G.value && (D.value++, M())
        }), d({
          reachData: function() {
            console.log("触发下拉刷新"), K()
          }
        }), (l, a) => e.e({
          a: b.value.length
        }, b.value.length ? e.e({
          b: P.value
        }, P.value ? {
          c: e.unref(i.addCssUnit)(A.value)
        } : {}, {
          d: !P.value
        }, P.value ? {} : e.e({
          e: e.f(b.value, (l, a, t) => ({
            a: x.value === l.id,
            b: e.t(l.name),
            c: "item-" + l.id,
            d: a,
            e: `url('${encodeURI(l.groupBackgroundUrl)}')`,
            f: e.o(e => function(e, l, a = !1) {
              x.value = e, Y(x.value, a)
            }(l.id, 0, !0), a)
          })),
          f: b.value.length > 4 ? "90px" : "",
          g: b.value.length > 4 ? "none" : "1",
          h: b.value.length > 4
        }, (b.value.length, {}), {
          i: b.value.length > 4 ? "0" : "18px",
          j: "item-" + x.value
        }), {
          k: P.value ? "" : 1,
          l: P.value ? 1 : "",
          m: P.value
        }, P.value ? {
          n: e.sr(V, "feebbd27-0", {
            k: "lineTabRef"
          }),
          o: e.o(X),
          p: e.p({
            "tabs-list": b.value,
            "default-title-size": "16px",
            "active-title-size": "16px",
            "padding-bottom": "12px",
            "border-bottom": "1px solid #EEEEEE",
            type: "line"
          })
        } : {}, {
          q: e.unref(i.addCssUnit)(R.value),
          r: e.sr(F, "feebbd27-1", {
            k: "secondGroupRef"
          }),
          s: y.value.length,
          t: e.o(ee),
          v: e.p({
            "tabs-list": y.value,
            type: E.value.length ? "default" : "card",
            "custom-style": {
              paddingBottom: E.value.length ? "0" : "16px"
            }
          }),
          w: E.value.length,
          x: e.sr(H, "feebbd27-2", {
            k: "thirdGroupRef"
          }),
          y: E.value.length,
          z: e.o(le),
          A: e.p({
            "tabs-list": E.value,
            type: "card",
            "custom-style": {
              paddingBottom: "16px"
            }
          }),
          B: e.unref(i.addCssUnit)(R.value + 45 + 8 + 8),
          C: q.value ? "sticky" : "static"
        }) : {}, {
          D: L.value
        }, L.value ? {
          E: L.value,
          F: e.o(l => e.unref(n.goPage)(T.value))
        } : {}, {
          G: e.p({
            list: te.value,
            "item-custom-style": {
              boxShadow: "#0000000D 0px 4px 8px 0px"
            }
          }),
          H: !G.value && !I.value,
          I: e.f(S.value, (l, a, t) => ({
            a: e.f(l, (l, a, u) => ({
              a: e.o(W, a),
              b: "feebbd27-4-" + t + "-" + u,
              c: e.p({
                item: l
              }),
              d: a
            })),
            b: a
          })),
          J: G.value,
          K: I.value && w.value.length
        }, I.value && w.value.length ? {
          L: e.f(w.value, (l, a, t) => ({
            a: "ad-logged-" + a,
            b: "feebbd27-5-" + t,
            c: e.p({
              id: "ad-logged-" + a,
              "file-url": l.fileUrl,
              "video-cover-url": l.videoCoverUrl,
              "file-type": l.fileType,
              path: l.path,
              "play-btn-postion": "center",
              "tracking-name": "click_activity_group_ads",
              mode: "aspectFit",
              "custom-style": {
                aspectRatio: l.aspectRatio
              },
              "tracking-data": {
                group_ads_id: l.detailCode,
                group_ads_name: l.name || "在地活动页分组广告",
                group_id: k.value
              },
              "play-btn-size": "large"
            }),
            d: a
          }))
        } : {}, {
          M: v.adCustomTravelList.length
        }, v.adCustomTravelList.length ? {
          N: e.f(c.adCustomTravelList, (l, a, t) => ({
            a: "what-is-" + a,
            b: "feebbd27-6-" + t,
            c: e.p({
              id: "what-is-" + a,
              "file-url": l.fileUrl,
              "video-cover-url": l.videoCoverUrl,
              "file-type": l.type,
              path: l.path,
              "full-screen-when-played": !0,
              "pause-after-show-poster": !0,
              "tracking-name": "click_activity_bottom_banner",
              "tracking-data": {
                banner_id: l.id,
                banner_name: l.name || "在地活动页末尾广告"
              }
            }),
            d: "ad-what-is-" + a
          }))
        } : {})
      }
    });
  p.__runtimeHooks = 1;
  const h = e._export_sfc(p, [
    ["__scopeId", "data-v-feebbd27"]
  ]);
  wx.createComponent(h)
}();
