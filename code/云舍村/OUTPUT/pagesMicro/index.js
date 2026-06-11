! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    o = require("../hooks/useNavigatorRect.js"),
    i = require("../utils/umengAdaptor.js");
  require("../utils/config.js"), require("../utils/request.js"), require("../utils/log.js");
  const n = require("../utils/qdTracker.js");
  require("../base/product.js"), require("../services/request/request.js");
  const r = require("../hooks/useSubscribeMessage.js");
  require("../store/index.js");
  const u = require("../utils/helper.js"),
    l = require("./hooks/useLoginGuide.js"),
    a = require("./hooks/useMicroPage.js"),
    s = require("../store/modules/micro.js");
  Array || e.resolveComponent("FloatButtonKf")(), Math || (v + f + g + _ + m + c + d + t + p)();
  const t = () => "../components/new/ErrorBlock.js",
    c = () => "../components/new/LimitingRetry/index.js",
    v = () => "../components/new/Navigator.js",
    p = () => "../components/new/Spin.js",
    d = () => "../components/new/StButton.js",
    g = () => "./components/Collect.js",
    f = () => "./components/CompList.js",
    m = () => "./components/LoginGuide.js",
    _ = () => "./components/SubscribeMessage.js",
    b = e.defineComponent({
      __name: "index",
      setup(t) {
        const c = e.ref(),
          v = e.ref(),
          p = s.useMicroStore();
        e.onLoad(e => {
          console.log("[pagesMicro] <Index> {onLoad} options:", e), (null == e ? void 0 : e.id) && (c.value = e.id), p.setMemberActivityId(null == e ? void 0 : e.memberActivityId), (null == e ? void 0 : e.collectArticleId) && (v.value = e.collectArticleId)
        });
        const d = ["NEW_ACTIVITY_MA", "POINT_VALID_MA", "TRAVEL_GUIDE_MA"],
          {
            subscribeMessage: g
          } = r.useSubscribeMessage(d),
          f = o.useNavigatorRect(),
          m = e.ref({}),
          {
            data: _,
            page: b,
            items: h,
            loading: j,
            isError: y,
            isServerLimiting: q,
            refresh: k
          } = a.useMicroPage(c),
          {
            loginGuideVisible: w,
            loginGuideConfig: S,
            handleLogin: M,
            handleDismiss: T
          } = l.useLoginGuide(_),
          A = e.computed(() => {
            var e, o, i, n;
            return {
              activity_page_id: (null == (e = _.value) ? void 0 : e.id) || "",
              activity_page_name: (null == (n = null == (i = null == (o = b.value) ? void 0 : o.config) ? void 0 : i.props) ? void 0 : n.title) || ""
            }
          });
        e.watch(A, e => {
          (null == e ? void 0 : e.activity_page_id) && (null == e ? void 0 : e.activity_page_name) && (n.qdTracker.track("activity_page_view", {
            activity_page_id: e.activity_page_id,
            activity_page_name: e.activity_page_name
          }), m.value = {
            marketing_page_name: e.activity_page_name
          }, n.qdTracker.setData(m.value), i.adaptor.updatePageProperties({
            page_id: e.activity_page_id,
            st_page_name: e.activity_page_name
          }))
        }), e.onUnload(() => {
          n.qdTracker.resetData(m.value)
        });
        const I = e.computed(() => {
            var e, o;
            return v.value && (null == (o = null == (e = b.value) ? void 0 : e.config.props) ? void 0 : o.supportCollect)
          }),
          P = e.computed(() => {
            var e, o, i;
            return null == (i = null == (o = null == (e = b.value) ? void 0 : e.config) ? void 0 : o.props) ? void 0 : i.immersiveNav
          }),
          L = e.ref({
            title: "",
            imageUrl: ""
          });
        e.onShareAppMessage(() => ({
          ...L.value,
          imageUrl: u.shareImageTransfrom(L.value.imageUrl)
        })), e.onShareTimeline(() => ({
          ...L.value,
          imageUrl: u.shareImageTransfrom(L.value.imageUrl, "timeline")
        })), e.watch(b, o => {
          var i, n, r, u, l, a;
          (null == (n = null == (i = null == o ? void 0 : o.config) ? void 0 : i.props) ? void 0 : n.share) ? (L.value.title = (null == (r = o.config.props) ? void 0 : r.shareTitle) || (null == (u = o.config.props) ? void 0 : u.title), (null == (l = o.config.props) ? void 0 : l.sharePoster) && (L.value.imageUrl = null == (a = o.config.props) ? void 0 : a.sharePoster)) : e.wx$1.hideShareMenu()
        });
        const x = e.computed(() => {
          var e, o, i;
          const n = {};
          if (null == (i = null == (o = null == (e = b.value) ? void 0 : e.config) ? void 0 : o.wrap) ? void 0 : i.background) {
            const e = b.value.config.wrap.background;
            n.background = "color" === e.type ? e.value : `url(${e.value})`
          }
          return n
        });
        e.onPageScroll(e => {});
        const C = e.computed(() => {
          var e, o, i, n, r, u, l, a, s, t;
          return {
            ...null == (o = null == (e = b.value) ? void 0 : e.config) ? void 0 : o.props,
            background: (null == (u = null == (r = null == (n = null == (i = b.value) ? void 0 : i.config) ? void 0 : n.props) ? void 0 : r.navBackground) ? void 0 : u.value) || void 0,
            color: (null == (t = null == (s = null == (a = null == (l = b.value) ? void 0 : l.config) ? void 0 : a.props) ? void 0 : s.navColor) ? void 0 : t.value) || void 0
          }
        });
        return e.provide("handleSubscribeMessage", (async function() {
          c.value && !p.hasShownSubscribePopup(c.value) && (await g(), p.addSubscribePopupRecord(c.value))
        })), (o, i) => {
          var n, r, l, a, s, t, g, m;
          return e.e({
            a: e.p({
              fixed: !0,
              placeholder: !P.value,
              "use-immersive-style": P.value,
              ...C.value,
              "custom-style": e.unref(j) ? {
                opacity: 0,
                pointerEvents: "none",
                ...null == (n = C.value) ? void 0 : n.customStyle
              } : {
                ...null == (r = C.value) ? void 0 : r.customStyle
              }
            }),
            b: e.unref(b)
          }, e.unref(b) ? e.e({
            c: e.p({
              items: e.unref(h),
              "parent-comp-name": "page",
              "track-data": A.value,
              "tab-offset-top": e.unref(f).outerHeight - 1
            }),
            d: null == (l = e.unref(b).config.props) ? void 0 : l.showKf
          }, (null == (a = e.unref(b).config.props) ? void 0 : a.showKf) ? {
            e: !e.unref(w)
          } : {}, {
            f: I.value
          }, I.value ? {
            g: e.p({
              "article-id": v.value
            })
          } : {}, {
            h: null == (s = e.unref(b).config.props) ? void 0 : s.subscribe
          }, (null == (t = e.unref(b).config.props) ? void 0 : t.subscribe) ? {
            i: e.p({
              visible: !e.unref(p).hasShownSubscribePopup(c.value),
              scenes: d,
              "page-id": c.value
            })
          } : {}, {
            j: null == (g = e.unref(b).config.props) ? void 0 : g.loginGuide
          }, (null == (m = e.unref(b).config.props) ? void 0 : m.loginGuide) ? {
            k: e.o(e.unref(M)),
            l: e.o(e.unref(T)),
            m: e.p({
              visible: e.unref(w),
              config: e.unref(S)
            })
          } : {}, {
            n: e.unref(j) ? 1 : ""
          }) : {}, {
            o: !e.unref(j)
          }, e.unref(j) ? {
            w: e.p({
              size: 48
            })
          } : e.e({
            p: e.unref(y)
          }, e.unref(y) ? e.e({
            q: e.o(e.unref(k)),
            r: e.p({
              show: e.unref(q)
            }),
            s: !e.unref(q)
          }, e.unref(q) ? {} : {
            t: e.o(e.unref(k)),
            v: e.p({
              block: !0,
              theme: "black",
              "custom-style": {
                marginTop: e.unref(u.pxTransform)(24, 375)
              }
            })
          }) : {}), {
            x: e.s(x.value)
          })
        }
      }
    });
  b.__runtimeHooks = 7;
  const h = e._export_sfc(b, [
    ["__scopeId", "data-v-aa548360"]
  ]);
  wx.createPage(h)
}();