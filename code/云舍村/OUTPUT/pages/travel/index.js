! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    l = require("../../assets/index.js"),
    n = require("../../base/channel.js"),
    a = require("../../base/home.js");
  require("../../hooks/useNavigatorRect.js");
  const o = require("../../utils/umengAdaptor.js"),
    i = require("../../utils/wxuser.js"),
    t = require("../../utils/utils.js");
  require("../../utils/request.js"), require("../../base/product.js");
  const u = require("../../hooks/useRequest.js"),
    r = require("../../utils/qdTracker.js"),
    d = require("../../hooks/useSearchTravel.js"),
    v = require("../../services/home.js"),
    s = require("../../utils/helper.js");
  Array || e.resolveComponent("FloatButtonKf")(), Math || (m + g + y + h + c + f + p + b + T)();
  const p = () => "../../components/bottomNav.js",
    m = () => "../../components/new/ErrorLimiting.js",
    f = () => "../../components/new/SafeArea.js",
    c = () => "../../components/new/StAd.js",
    h = () => "../../components/new/StButton.js",
    g = () => "../../components/search/SearchBarView.js",
    b = () => "../../components/travel/AdPopup.js",
    y = () => "../../components/travel/Banner.js",
    T = () => "../../components/travel/UserAgreement.js",
    _ = e.defineComponent({
      __name: "index",
      setup(p) {
        const m = i.getStorage("config"),
          f = e.ref(i.getStorage("user")),
          c = e.computed(() => {
            var e;
            return !!(null == (e = f.value) ? void 0 : e.memberId)
          }),
          h = e.ref({
            banner: [],
            loggedMember: [],
            whatIs: [],
            travelType: [],
            fullScreen: [],
            hotRecommendTop: [],
            hotRecommendSwiper: []
          }),
          g = e.ref(!1),
          b = e.ref(!1),
          y = e.ref(),
          T = e.ref(!1),
          {
            run: _,
            loading: U,
            isRateLimited: w
          } = u.useRequest(() => {
            var e;
            const l = {
              hotelGroupCode: m.hotelGroupCode,
              clientTypes: n.defaultChannel,
              channel: n.defaultShopChannel,
              showLocation: "1,2,3,4,5,6,7"
            };
            return (null == (e = f.value) ? void 0 : e.memberId) && (l.memberId = f.value.memberId), v.getAdData(l)
          }, {
            manual: !0,
            onSuccess(e) {
              var l, n, o, i, t, u, r;
              if (g.value || (g.value = !0), y.value = null == (l = f.value) ? void 0 : l.memberId, j(), !(null == (n = null == e ? void 0 : e.retVal) ? void 0 : n.length)) return;
              const d = new Map;
              e.retVal.forEach(e => {
                d.set(e.location, e.infos)
              });
              const v = d.get(1);
              (null == (o = null == v ? void 0 : v.topCarousel) ? void 0 : o.length) && (h.value.banner = v.topCarousel.map((e, l) => {
                var n;
                return {
                  ...e,
                  url: e.fileUrl,
                  type: null == (n = a.AdFileTypeMeta[e.fileType]) ? void 0 : n.name,
                  path: e.path,
                  trackingData: {
                    banner_num: l + 1,
                    banner_type: "预定主页顶部轮播广告位",
                    banner_name: (null == e ? void 0 : e.name) || "主页顶部轮播-" + (l + 1)
                  }
                }
              }));
              const s = d.get(2);
              (null == (i = null == s ? void 0 : s.homePageLogin) ? void 0 : i.length) && (h.value.loggedMember = s.homePageLogin.map(e => {
                var l;
                return {
                  ...e,
                  type: null == (l = a.AdFileTypeMeta[e.fileType]) ? void 0 : l.name
                }
              }));
              const p = d.get(3);
              (null == (t = null == p ? void 0 : p.homePageIntroduction) ? void 0 : t.length) && (h.value.whatIs = p.homePageIntroduction.map(e => {
                var l;
                return {
                  ...e,
                  type: null == (l = a.AdFileTypeMeta[e.fileType]) ? void 0 : l.name
                }
              }));
              const m = d.get(4);
              m && Object.keys(m).length && (h.value.destination = m);
              const c = d.get(5);
              if (c && Object.keys(c).length) {
                const e = [];
                ["down1", "down2", "down3", "down4"].forEach(l => {
                  null == c || c[l].forEach(l => {
                    var n;
                    e.push({
                      ...l,
                      type: null == (n = a.AdFileTypeMeta[l.fileType]) ? void 0 : n.name
                    })
                  })
                }), h.value.hotRecommendTop = null == c ? void 0 : c.up, h.value.hotRecommendSwiper = e
              }
              const b = d.get(6),
                T = Object.keys(b);
              if (b && T.length) {
                const e = [];
                T.forEach(l => {
                  var n;
                  null == (n = b[l]) || n.forEach(l => {
                    var n;
                    e.push({
                      ...l,
                      type: null == (n = a.AdFileTypeMeta[l.fileType]) ? void 0 : n.name
                    })
                  })
                }), h.value.travelType = e
              }
              const _ = d.get(7);
              (null == (u = null == _ ? void 0 : _.homePageGlobalPopUp) ? void 0 : u.length) && (h.value.fullScreen = null == (r = _.homePageGlobalPopUp) ? void 0 : r.map(e => ({
                ...e,
                imgUrl: e.fileUrl
              })))
            },
            onRateLimit: e => {
              console.warn("触发限流:", e)
            },
            onError(e) {
              console.log("调用失败===", e), j()
            }
          });
        e.watch(w, e => {
          e && j()
        });
        const M = e.debounce(_, 300, {
          leading: !0
        });

        function j() {
          var l;
          b.value && (null == (l = e.index) || l.stopPullDownRefresh(), b.value = !1)
        }

        function k() {
          e.index.showLoading({
            title: "加载中...",
            mask: !0
          }), T.value = !0, M()
        }
        e.watch(U, l => {
          T.value && !l && e.index.hideLoading()
        });
        const S = e.ref();

        function q(e) {
          S.value = e
        }

        function A(e, l, n = "335x") {
          return 1 === l ? s.imageMogr2(e, n) : e
        }
        const {
          hotSearchList: x
        } = d.useSearchTravel();

        function C() {
          o.adaptor.sendEvent("click_all_destinations_control"), r.qdTracker.track("homepage_explore_click"), t.goPage("/pages/travel/destinations")
        }
        const R = e.ref(!0);
        e.onShow(() => {
          var e, l;
          console.log("[index] <Travel> {onShow} :", y.value, null == (e = f.value) ? void 0 : e.memberId), f.value = i.getStorage("user"), g.value && (null == (l = f.value) ? void 0 : l.memberId) !== y.value && M()
        }), e.onMounted(() => {
          M()
        }), e.onPullDownRefresh(() => {
          b.value = !0, M()
        });
        const I = {
          title: "松赞与你相遇",
          imageUrl: "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/songzan.jpg"
        };
        return e.onShareAppMessage(() => I), e.onShareTimeline(() => I), (n, o) => {
          var i, u, r, d, v, p, m, f, g, b, y, T, _, M, j, I, F, P, L, E, B, z, D, G, O, V, N, $, H, K, J, Q, W, X, Y, Z, ee, le, ne, ae, oe, ie, te, ue, re, de, ve, se, pe, me, fe, ce, he, ge, be, ye, Te, _e, Ue, we, Me, je, ke, Se, qe, Ae, xe, Ce, Re, Ie, Fe, Pe, Le, Ee, Be, ze, De, Ge, Oe, Ve, Ne, $e;
          return e.e({
            a: e.unref(w)
          }, e.unref(w) ? {
            b: e.o(k),
            c: e.p({
              show: e.unref(w)
            })
          } : e.unref(U) ? {} : e.e({
            e: e.p({
              list: e.unref(x)
            }),
            f: e.o(e => q("top-banner")),
            g: e.p({
              list: h.value.banner,
              "is-force-pause-video": "top-banner" !== S.value
            }),
            h: !c.value || c.value && (null == (u = null == (i = h.value.loggedMember) ? void 0 : i[0]) ? void 0 : u.fileUrl)
          }, !c.value || c.value && (null == (d = null == (r = h.value.loggedMember) ? void 0 : r[0]) ? void 0 : d.fileUrl) ? e.e({
            i: !c.value
          }, c.value ? (null == (m = null == (p = null == (v = h.value) ? void 0 : v.loggedMember) ? void 0 : p[0]) ? void 0 : m.fileUrl) ? {
            n: e.p({
              id: "ad-logged",
              "file-url": h.value.loggedMember[0].fileUrl,
              "video-cover-url": h.value.loggedMember[0].videoCoverUrl,
              "file-type": h.value.loggedMember[0].type,
              path: h.value.loggedMember[0].path,
              "tracking-data": {
                banner_num: 1,
                banner_type: "预订主页登录位",
                banner_name: (null == (f = h.value.loggedMember[0]) ? void 0 : f.name) || "主页登录位"
              }
            })
          } : {} : {
            j: e.o(l => e.unref(t.toLogin)()),
            k: e.p({
              theme: "black",
              "custom-style": `\n              --button-default-height: ${e.unref(s.pxTransform)(60)};\n              --button-default-font-size: ${e.unref(s.pxTransform)(28)}\n            `
            }),
            l: `url(${e.unref(l.assets).homeMemberCardBg})`
          }, {
            m: null == (y = null == (b = null == (g = h.value) ? void 0 : g.loggedMember) ? void 0 : b[0]) ? void 0 : y.fileUrl
          }) : {}, {
            o: e.o(C),
            p: null == (j = null == (M = null == (_ = null == (T = h.value) ? void 0 : T.destination) ? void 0 : _.ul) ? void 0 : M[0]) ? void 0 : j.fileUrl
          }, (null == (L = null == (P = null == (F = null == (I = h.value) ? void 0 : I.destination) ? void 0 : F.ul) ? void 0 : P[0]) ? void 0 : L.fileUrl) ? {
            q: e.o(e => q("destination-ul")),
            r: e.p({
              id: "destination-ul",
              "file-url": A(null == (E = h.value) ? void 0 : E.destination.ul[0].fileUrl, h.value.destination.ul[0].fileType),
              "file-type": e.unref(a.AdFileTypeMeta)[h.value.destination.ul[0].fileType].name,
              "video-cover-url": h.value.destination.ul[0].videoCoverUrl,
              path: h.value.destination.ul[0].path,
              "is-force-pause": "destination-ul" !== S.value,
              "tracking-data": {
                banner_num: "上左",
                banner_type: "预订主页松赞目的地栅栏位",
                banner_name: (null == (B = h.value.destination.ul[0]) ? void 0 : B.name) || "主页目的地栅栏位-上左"
              }
            })
          } : {}, {
            s: null == (O = null == (G = null == (D = null == (z = h.value) ? void 0 : z.destination) ? void 0 : D.ur1) ? void 0 : G[0]) ? void 0 : O.fileUrl
          }, (null == (H = null == ($ = null == (N = null == (V = h.value) ? void 0 : V.destination) ? void 0 : N.ur1) ? void 0 : $[0]) ? void 0 : H.fileUrl) ? {
            t: e.o(e => q("destination-ur1")),
            v: e.p({
              id: "destination-ur1",
              "file-url": A(null == (K = h.value) ? void 0 : K.destination.ur1[0].fileUrl, h.value.destination.ur1[0].fileType),
              "file-type": e.unref(a.AdFileTypeMeta)[h.value.destination.ur1[0].fileType].name,
              path: h.value.destination.ur1[0].path,
              "video-cover-url": h.value.destination.ur1[0].videoCoverUrl,
              "is-force-pause": "destination-ur1" !== S.value,
              "tracking-data": {
                banner_num: "上右1",
                banner_type: "预订主页松赞目的地栅栏位",
                banner_name: (null == (J = h.value.destination.ur1[0]) ? void 0 : J.name) || "主页目的地栅栏位-上右1"
              }
            })
          } : {}, {
            w: null == (Y = null == (X = null == (W = null == (Q = h.value) ? void 0 : Q.destination) ? void 0 : W.ur2) ? void 0 : X[0]) ? void 0 : Y.fileUrl
          }, (null == (ne = null == (le = null == (ee = null == (Z = h.value) ? void 0 : Z.destination) ? void 0 : ee.ur2) ? void 0 : le[0]) ? void 0 : ne.fileUrl) ? {
            x: e.o(e => q("destination-ur2")),
            y: e.p({
              id: "destination-ur2",
              "file-url": A(null == (ae = h.value) ? void 0 : ae.destination.ur2[0].fileUrl, h.value.destination.ur2[0].fileType),
              "file-type": e.unref(a.AdFileTypeMeta)[h.value.destination.ur2[0].fileType].name,
              path: h.value.destination.ur2[0].path,
              "video-cover-url": h.value.destination.ur2[0].videoCoverUrl,
              "is-force-pause": "destination-ur2" !== S.value,
              "tracking-data": {
                banner_num: "上右2",
                banner_type: "预订主页松赞目的地栅栏位",
                banner_name: (null == (oe = h.value.destination.ur2[0]) ? void 0 : oe.name) || "主页目的地栅栏位-上右2"
              }
            })
          } : {}, {
            z: e.unref(s.pxTransform)(16),
            A: e.unref(s.pxTransform)(16),
            B: null == (re = null == (ue = null == (te = null == (ie = h.value) ? void 0 : ie.destination) ? void 0 : te.dl1) ? void 0 : ue[0]) ? void 0 : re.fileUrl
          }, (null == (pe = null == (se = null == (ve = null == (de = h.value) ? void 0 : de.destination) ? void 0 : ve.dl1) ? void 0 : se[0]) ? void 0 : pe.fileUrl) ? {
            C: e.o(e => q("destination-dl1")),
            D: e.p({
              id: "destination-dl1",
              "file-url": A(null == (me = h.value) ? void 0 : me.destination.dl1[0].fileUrl, h.value.destination.dl1[0].fileType),
              "file-type": e.unref(a.AdFileTypeMeta)[h.value.destination.dl1[0].fileType].name,
              path: h.value.destination.dl1[0].path,
              "video-cover-url": h.value.destination.dl1[0].videoCoverUrl,
              "is-force-pause": "destination-dl1" !== S.value,
              "tracking-data": {
                banner_num: "下左1",
                banner_type: "预订主页松赞目的地栅栏位",
                banner_name: (null == (fe = h.value.destination.dl1[0]) ? void 0 : fe.name) || "主页目的地栅栏位-下左1"
              }
            })
          } : {}, {
            E: null == (be = null == (ge = null == (he = null == (ce = h.value) ? void 0 : ce.destination) ? void 0 : he.dl2) ? void 0 : ge[0]) ? void 0 : be.fileUrl
          }, (null == (Ue = null == (_e = null == (Te = null == (ye = h.value) ? void 0 : ye.destination) ? void 0 : Te.dl2) ? void 0 : _e[0]) ? void 0 : Ue.fileUrl) ? {
            F: e.o(e => q("destination-dl2")),
            G: e.p({
              id: "destination-dl2",
              "file-url": A(null == (we = h.value) ? void 0 : we.destination.dl2[0].fileUrl, h.value.destination.dl2[0].fileType),
              "file-type": e.unref(a.AdFileTypeMeta)[h.value.destination.dl2[0].fileType].name,
              path: h.value.destination.dl2[0].path,
              "video-cover-url": h.value.destination.dl2[0].videoCoverUrl,
              "is-force-pause": "destination-dl2" !== S.value,
              "tracking-data": {
                banner_num: "下左2",
                banner_type: "预订主页松赞目的地栅栏位",
                banner_name: (null == (Me = h.value.destination.dl2[0]) ? void 0 : Me.name) || "主页目的地栅栏位-下左2"
              }
            })
          } : {}, {
            H: e.unref(s.pxTransform)(16),
            I: null == (qe = null == (Se = null == (ke = null == (je = h.value) ? void 0 : je.destination) ? void 0 : ke.dr) ? void 0 : Se[0]) ? void 0 : qe.fileUrl
          }, (null == (Re = null == (Ce = null == (xe = null == (Ae = h.value) ? void 0 : Ae.destination) ? void 0 : xe.dr) ? void 0 : Ce[0]) ? void 0 : Re.fileUrl) ? {
            J: e.o(e => q("destination-dr")),
            K: e.p({
              id: "destination-dr",
              "file-url": A(null == (Ie = h.value) ? void 0 : Ie.destination.dr[0].fileUrl, h.value.destination.dr[0].fileType),
              "file-type": e.unref(a.AdFileTypeMeta)[h.value.destination.dr[0].fileType].name,
              path: h.value.destination.dr[0].path,
              "video-cover-url": h.value.destination.dr[0].videoCoverUrl,
              "is-force-pause": "destination-dr" !== S.value,
              "tracking-data": {
                banner_num: "下右",
                banner_type: "预订主页松赞目的地栅栏位",
                banner_name: (null == (Fe = h.value.destination.dr[0]) ? void 0 : Fe.name) || "主页目的地栅栏位-下右"
              }
            })
          } : {}, {
            L: e.unref(s.pxTransform)(16),
            M: null == (Le = null == (Pe = h.value) ? void 0 : Pe.whatIs) ? void 0 : Le.length
          }, (null == (Be = null == (Ee = h.value) ? void 0 : Ee.whatIs) ? void 0 : Be.length) ? {
            N: e.f(h.value.whatIs, (l, n, a) => ({
              a: "what-is-" + n,
              b: e.o(e => q("what-is-" + n), "ad-what-is-" + n),
              c: "d22a2b02-11-" + a,
              d: e.p({
                id: "what-is-" + n,
                "file-url": l.fileUrl,
                "video-cover-url": l.videoCoverUrl,
                "file-type": l.type,
                path: l.path,
                "full-screen-when-played": !0,
                "pause-after-show-poster": !0,
                "tracking-data": {
                  banner_num: n + 1,
                  banner_type: "预订主页松赞介绍位",
                  banner_name: (null == l ? void 0 : l.name) || "主页松赞介绍位-" + (n + 1)
                }
              }),
              e: "ad-what-is-" + n
            }))
          } : {}, {
            O: null == (De = null == (ze = h.value.hotRecommendTop) ? void 0 : ze[0]) ? void 0 : De.fileUrl
          }, (null == (Oe = null == (Ge = h.value.hotRecommendTop) ? void 0 : Ge[0]) ? void 0 : Oe.fileUrl) ? {
            P: e.o(e => q("recommend-top")),
            Q: e.p({
              id: "recommend-top",
              "file-url": h.value.hotRecommendTop[0].fileUrl,
              "video-cover-url": h.value.hotRecommendTop[0].videoCoverUrl,
              "file-type": e.unref(a.AdFileTypeMeta)[h.value.hotRecommendTop[0].fileType].name,
              path: h.value.hotRecommendTop[0].path,
              "is-force-pause": "recommend-top" !== S.value,
              "play-btn-postion": "center",
              "play-btn-size": "large",
              "tracking-data": {
                banner_num: "上",
                banner_type: "预订主页热门推荐栅栏位",
                banner_name: (null == (Ve = h.value.hotRecommendTop[0]) ? void 0 : Ve.name) || "主页热门推荐栅栏位-上"
              }
            })
          } : {}, {
            R: e.f(h.value.hotRecommendSwiper, (l, n, a) => ({
              a: "ad-recommend-swiper-" + n,
              b: "ad-recommend-swiper-" + n,
              c: "d22a2b02-13-" + a,
              d: e.p({
                id: "ad-recommend-swiper-" + n,
                "file-url": e.unref(s.imageMogr2)(l.fileUrl, "220x"),
                path: l.path,
                "tracking-data": {
                  banner_num: "下" + (n + 1),
                  banner_type: "预订主页热门推荐栅栏位",
                  banner_name: (null == l ? void 0 : l.name) || "主页热门推荐栅栏位-下" + (n + 1)
                }
              }),
              e: "recommend-item-" + n
            })),
            S: e.f(h.value.travelType, (l, n, a) => ({
              a: "ad-travel-type-" + n,
              b: "d22a2b02-14-" + a,
              c: e.p({
                id: "ad-travel-type-" + n,
                "file-url": l.fileUrl,
                "video-cover-url": l.videoCoverUrl,
                "file-type": l.type,
                path: l.path,
                "tracking-data": {
                  banner_num: n + 1,
                  banner_type: "预订主页探索更多栅栏位",
                  banner_name: (null == l ? void 0 : l.name) || "主页探索更多栅栏位-" + (n + 1)
                }
              }),
              d: "ad-travel-type-" + n
            })),
            T: e.o(C),
            U: e.p({
              position: "bottom",
              "custom-style": {
                height: e.unref(s.pxTransform)(48)
              }
            })
          }), {
            d: !e.unref(U),
            V: !R.value && (null == (Ne = h.value.fullScreen) ? void 0 : Ne.length)
          }, !R.value && (null == ($e = h.value.fullScreen) ? void 0 : $e.length) ? {
            W: e.p({
              items: h.value.fullScreen
            })
          } : {}, {
            X: e.o(() => R.value = !1)
          })
        }
      }
    });
  _.__runtimeHooks = 6;
  const U = e._export_sfc(_, [
    ["__scopeId", "data-v-d22a2b02"]
  ]);
  wx.createPage(U)
}();