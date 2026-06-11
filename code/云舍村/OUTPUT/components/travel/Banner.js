! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    l = require("../../hooks/useGetNodesRef.js"),
    t = require("../../utils/utils.js"),
    u = require("../../utils/umengAdaptor.js"),
    a = require("../../utils/qdTracker.js"),
    n = require("../../utils/helper.js"),
    i = require("../../hooks/useNavigatorRect.js");
  require("../../utils/config.js"), require("../../utils/request.js"), require("../../base/product.js"), require("../../services/request/request.js");
  const o = e.defineComponent({
      __name: "Banner",
      props: {
        list: null,
        isForcePauseVideo: {
          type: Boolean
        }
      },
      emits: ["video-play", "video-pause", "video-ended"],
      setup(o, {
        emit: r
      }) {
        const s = o,
          v = r,
          d = i.useNavigatorRect(),
          c = e.getCurrentInstance(),
          p = e.computed(() => !!s.list.find(e => "video" === e.type)),
          {
            nodesRef: f
          } = l.useGetNodesRef({
            selector: ".swiper-item__video",
            instance: c,
            enabled: p,
            isSelectAll: !0
          }),
          g = e.ref({});
        e.watch(() => f.value, e => {
          null == e || e.fields({
            dataset: !0,
            context: !0
          }, e => {
            (e || []).forEach(e => {
              void 0 !== e.dataset.index && (g.value[e.dataset.index] = {
                context: e.context
              })
            })
          }).exec()
        });
        const m = e.ref(0),
          h = e.ref(!1);

        function q(e) {
          var l, t, u, a, n;
          const i = e.detail.current,
            o = m.value;
          o !== i && "video" === (null == (l = s.list[o]) ? void 0 : l.type) && (null == (t = g.value[o]) ? void 0 : t.context) && (null == (n = null == (a = null == (u = g.value[o]) ? void 0 : u.context) ? void 0 : a.pause) || n.call(a)), m.value = i
        }
        const y = e.ref(0),
          _ = e.computed(() => {
            let e = 100;
            return s.list.length && (e = 100 / s.list.length), {
              width: e + "%",
              transform: `translate3d(${100*y.value}%, 0, 0)`
            }
          });

        function x(e) {
          const l = e.detail.current;
          y.value = l
        }
        return e.watch(() => s.isForcePauseVideo, e => {
          var l, t, u;
          e && h.value && (null == (u = null == (t = null == (l = g.value[m.value]) ? void 0 : l.context) ? void 0 : t.pause) || u.call(t))
        }), (l, i) => e.e({
          a: e.f(o.list, (l, i, o) => {
            var r, c, p, f, m;
            return e.e({
              a: "video" === l.type
            }, "video" === l.type ? e.e({
              b: h.value
            }, (h.value, {}), {
              c: e.n({
                show: !h.value && !(null == (r = g.value[i]) ? void 0 : r.fullScreen)
              }),
              d: `translateY(${e.unref(n.addCssUnit)((null==(c=e.unref(d).padding)?void 0:c.top)||0)})`,
              e: !h.value && !(null == (p = g.value[i]) ? void 0 : p.played) && !(null == (f = g.value[i]) ? void 0 : f.fullScreen),
              f: e.unref(n.imageMogr2)(l.videoCoverUrl, "750x"),
              g: "banner-video-" + i,
              h: i,
              i: l.url,
              j: h.value || (null == (m = g.value[i]) ? void 0 : m.fullScreen),
              k: e.o(e => function(e) {
                g.value[e].played = !0, h.value = !0, v("video-play", e, g.value[e])
              }(i), "swiper-" + i),
              l: e.o(e => function(e) {
                h.value = !1, v("video-pause", e, g.value[e])
              }(i), "swiper-" + i),
              m: e.o(e => function(e) {
                g.value[e].played = !1, h.value = !1, v("video-ended", e, g.value[e])
              }(i), "swiper-" + i),
              n: e.o(e => function(e, l) {
                var t;
                g.value[e].fullScreen = !!(null == (t = null == l ? void 0 : l.detail) ? void 0 : t.fullScreen)
              }(i, e), "swiper-" + i)
            }) : "image" === l.type ? {
              p: e.unref(n.imageMogr2)(l.url, "750x")
            } : {}, {
              o: "image" === l.type,
              q: "swiper-" + i,
              r: e.o(e => function(e, l) {
                var n, i, o, r;
                u.adaptor.sendEvent("click_book_page_subject_control", (null == e ? void 0 : e.trackingData) || {}), a.qdTracker.track("mini_homepage_banner_click", (null == e ? void 0 : e.trackingData) || {}), "video" !== e.type ? "image" === e.type && e.path && t.goPage(e.path) : "video" !== (null == (n = s.list[l]) ? void 0 : n.type) || h.value || null == (r = null == (o = null == (i = g.value[l]) ? void 0 : i.context) ? void 0 : o.play) || r.call(o)
              }(l, i), "swiper-" + i)
            })
          }),
          b: m.value,
          c: !h.value,
          d: e.o(x),
          e: e.o(q),
          f: o.list.length > 0
        }, o.list.length > 0 ? {
          g: e.s(_.value),
          h: e.n({
            show: !h.value
          })
        } : {})
      }
    }),
    r = e._export_sfc(o, [
      ["__scopeId", "data-v-1a32bab8"]
    ]);
  wx.createComponent(r)
}();