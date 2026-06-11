! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    a = require("../../base/jAlert/jAlert.js"),
    t = require("../../base/product.js"),
    l = require("../../hooks/useAdReport.js"),
    u = require("../../hooks/useScroll.js"),
    r = require("../../hooks/useXhsReport.js"),
    o = require("../../utils/api.js"),
    i = require("../../utils/config.js"),
    s = require("../../utils/helper.js"),
    n = require("../../utils/qdTracker.js"),
    v = require("../../utils/umengAdaptor.js"),
    c = require("../../utils/utils.js"),
    m = require("../../utils/wxuser.js");
  Array || (e.resolveComponent("mp-html") + e.resolveComponent("FloatButtonKf"))(), Math || (f + (() => "../../uni_modules/mp-html/components/mp-html/mp-html.js") + p)();
  const f = () => "../../components/coustomHead.js",
    p = () => "../../components/new/ProductCardList.js",
    d = e.defineComponent({
      __name: "theme",
      setup(f) {
        const p = r.useXshReport(),
          d = l.useAdReport();
        setTimeout(() => {
          d("VIEW_CONTENT")
        }, 300);
        const g = e.ref(""),
          h = e.ref(!1),
          y = e.ref({});
        let j = m.getStorage("user");
        const _ = e.ref(!1),
          k = e.ref(!1),
          q = e.ref(!1);
        let A = e.ref({});
        const T = e.ref([]),
          b = e.ref([]),
          C = e.computed(() => t.formatTravelThemeProducts(b.value, {
            currentPage: "theme",
            sourceActivityId: g.value,
            sourceActivityName: A.value.activityName,
            pathQuery: `sourceActivityId=${g.value}&sourceActivityName=${A.value.activityName}&isMarketingPage=true`
          })),
          N = e.ref(0),
          P = e.ref(0),
          x = e.ref(0),
          V = e.ref(0);

        function I(e) {
          N.value = e.touches[0].clientY, P.value = 0
        }

        function M(e) {
          x.value = e.touches[0].clientY, V.value = 0
        }

        function R(e) {
          const a = e.touches[0].clientY - N.value;
          P.value = a
        }

        function w(e) {
          const a = e.touches[0].clientY - x.value;
          V.value = a
        }

        function S(e) {
          const a = P.value;
          a < 0 ? q.value || _.value ? !q.value && _.value ? (q.value = !1, _.value = !1) : q.value && !_.value && (q.value = !0, _.value = !0) : (q.value = !0, _.value = !0) : a > 0 && (q.value || _.value ? q.value && (q.value = !1, _.value = !1) : _.value = !0)
        }

        function E(e) {
          V.value > 0 && (q.value || _.value ? q.value && !_.value && (_.value = !0, q.value = !1) : (_.value = !0, q.value = !1))
        }

        function W(e) {
          const a = e.detail.scrollTop;
          k.value = a > 100
        }
        e.onLoad(e => {
          p.init(e.click_id), p.report(p.actionTypeEnum.visit, null), g.value = e.id, e.isPreview && (h.value = !0)
        }), e.onUnload(() => {
          n.qdTracker.resetData(y.value)
        });
        const {
          scrollTop: G,
          onPageScroll: H
        } = u.useScroll();

        function Y() {
          _.value = !_.value, q.value = !1
        }
        return H(e => {
          G.value = e.scrollTop
        }), e.onShareAppMessage(() => {
          var e;
          return {
            title: A.value ? A.value.activityName : "营销活动",
            path: "/pagesB/travel/theme?id=" + g.value,
            imageUrl: s.shareImageTransfrom(null == (e = A.value) ? void 0 : e.shareImage),
            success() {},
            fail() {}
          }
        }), e.onShareTimeline(() => ({
          title: A.value ? A.value.activityName : "营销活动",
          query: "id=" + g.value,
          imageUrl: A.value ? A.value.background : ""
        })), e.onMounted(() => {
          !async function() {
            j || (j = {});
            const e = {
              firstResult: 0,
              pageSize: 100,
              id: g.value || "",
              channel: "WECHAT",
              mobile: j.mobile,
              memberId: j.memberId
            };
            o.api.marketingActivityPage(e).then(async e => {
              if (0 === e.result) {
                if (e.retVal && e.retVal.datas && e.retVal.datas.length > 0) {
                  const t = e.retVal.datas[0].description;
                  if (t) {
                    const a = c.getMaxWidthContent(t);
                    e.retVal.datas[0].description = a
                  }
                  if (A.value = e.retVal.datas[0] || {}, A.value.activityName && (v.adaptor.updatePageProperties({
                      st_page_name: A.value.activityName
                    }), y.value = {
                      marketing_page_name: A.value.activityName
                    }, n.qdTracker.setData(y.value), n.qdTracker.track("activity_page_view", {
                      activity_page_id: g.value || "",
                      activity_page_name: A.value.activityName
                    })), "activity" === A.value.limitNode) try {
                    const e = await o.api.checkWhitelist({
                      hotelGroupCode: i.config.hotelGroupCode,
                      activityId: g.value,
                      channel: "WECHAT",
                      mobile: j.mobile
                    });
                    1 === e.result ? "F" === e.retVal.result && a.jAlert3(e.retVal.msg, 2e3) : a.jAlert3(e.msg, 2e3)
                  } catch (e) {
                    console.log(e)
                  }
                  T.value = A.value.tags.split(",");
                  const l = {
                    hotelGroupCode: i.config.hotelGroupCode,
                    hotelCode: i.config.hotelCode,
                    id: g.value,
                    isMarketingPage: !0
                  };
                  o.api.listMarketingProducts(l).then(e => {
                    0 === e.result && e.retVal && (b.value = e.retVal)
                  })
                }
              } else a.jAlert3(e.msg, 2e3)
            })
          }()
        }), (a, t) => e.e({
          a: e.p({
            title: q.value || e.unref(G) > 150 ? e.unref(A).activityName : "",
            color: e.unref(G) > 150 ? "#000" : "#fff",
            "bg-color": e.unref(G) > 150 ? "#fff" : "",
            "back-filter": k.value ? "blur(10px)" : ""
          }),
          b: e.unref(A).tags
        }, e.unref(A).tags ? {
          c: e.f(T.value, (a, t, l) => ({
            a: e.t(a),
            b: t
          }))
        } : {}, {
          d: e.t(e.unref(A).activityName),
          e: !q.value
        }, q.value ? {
          g: e.p({
            content: e.unref(A).description
          })
        } : {
          f: e.unref(A).description
        }, {
          h: _.value ? 1 : "",
          i: _.value ? "" : 1,
          j: e.t(_.value ? "收起 ↑" : "展开 ↓"),
          k: e.o(Y),
          l: k.value ? 1 : "",
          m: _.value && !q.value ? e.unref(c.getReallyPx)(370) + "px" : "",
          n: _.value && !q.value ? e.unref(c.getReallyPx)(750) + "px" : "",
          o: e.o(M),
          p: e.o(w),
          q: e.o(E),
          r: q.value && _.value ? e.unref(c.getReallyPx)(84) + "px" : "",
          s: `url(${e.unref(s.imageMogr2)(e.unref(A).background,"750x")})`,
          t: _.value ? 1 : "",
          v: e.o(W),
          w: e.o(I),
          x: e.o(R),
          y: e.o(S),
          z: e.p({
            list: C.value,
            "custom-style": {
              padding: "0 " + e.unref(s.pxTransform)(32)
            }
          }),
          A: q.value && _.value ? "auto" : "",
          B: _.value && !q.value ? 1 : "",
          C: q.value && _.value ? 1 : "",
          D: q.value && _.value ? "hidden" : ""
        })
      }
    });
  d.__runtimeHooks = 7;
  const g = e._export_sfc(d, [
    ["__scopeId", "data-v-6b522bac"]
  ]);
  wx.createPage(g)
}();