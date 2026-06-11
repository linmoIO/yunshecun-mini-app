! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    l = require("../../hooks/useGetNodesRef.js"),
    i = require("../../hooks/useNavigatorRect.js");
  require("../../utils/umengAdaptor.js"), require("../../utils/config.js");
  const t = require("../../utils/utils.js");
  require("../../utils/request.js"), require("../../base/product.js");
  const n = require("../../utils/qdTracker.js");
  require("../../services/request/request.js");
  const u = require("../../utils/helper.js"),
    a = e.defineComponent({
      __name: "Banner",
      props: {
        list: null,
        isForcePauseVideo: {
          type: Boolean
        }
      },
      emits: ["video-play", "video-pause", "video-ended", "banner-bg"],
      setup(a, {
        emit: o
      }) {
        const r = a,
          s = o;
        i.useNavigatorRect();
        const v = e.ref(0),
          d = e.getCurrentInstance(),
          c = e.computed(() => !!r.list.find(e => "video" === e.type)),
          {
            nodesRef: p
          } = l.useGetNodesRef({
            selector: ".image-container__video",
            instance: d,
            enabled: c,
            isSelectAll: !0
          }),
          g = e.ref(!0),
          f = e.ref({});
        e.watch(() => p.value, e => {
          null == e || e.fields({
            dataset: !0,
            context: !0
          }, e => {
            (e || []).forEach(e => {
              void 0 !== e.dataset.index && (f.value[e.dataset.index] = {
                context: e.context
              })
            })
          }).exec()
        });
        const m = e.ref(0),
          h = e.ref(!1);

        function b(e) {
          var l, i, t, n, u;
          const a = e.detail.current,
            o = m.value;
          o !== a && "video" === (null == (l = r.list[o]) ? void 0 : l.type) && (null == (i = f.value[o]) ? void 0 : i.context) && (null == (u = null == (n = null == (t = f.value[o]) ? void 0 : t.context) ? void 0 : n.pause) || u.call(n)), m.value = a
        }
        const w = e.ref(0),
          y = e.computed(() => {
            if (!r.list.length) return {};
            const e = 100 / r.list.length,
              l = r.list[w.value];
            return "video" === (null == l ? void 0 : l.type) && h.value ? {
              width: 100 * v.value + "%",
              transition: "width linear 0.1s"
            } : {
              width: (w.value + 1) * e + "%",
              transition: "width linear 0.15s"
            }
          });

        function q(e) {
          var l, i;
          const t = e.detail.current;
          w.value = t, g.value = !1, "video" !== r.list[t].type ? s("banner-bg", null == (l = r.list[t]) ? void 0 : l.url) : s("banner-bg", null == (i = r.list[t]) ? void 0 : i.videoCoverUrl)
        }
        return e.watch(() => r.isForcePauseVideo, e => {
          var l, i, t;
          e && h.value && (null == (t = null == (i = null == (l = f.value[m.value]) ? void 0 : l.context) ? void 0 : i.pause) || t.call(i))
        }), e.watch(() => r.list, () => {
          if (r.list.length) {
            const e = r.list[0];
            "video" !== e.type ? s("banner-bg", e.url) : s("banner-bg", e.videoCoverUrl)
          }
        }), e.onLoad(() => {
          s("banner-bg", "https://dev-ht-img.songtsam.com/1747276140922-路虎会员互通页面1.jpg?imageMogr2/thumbnail/240x"), setTimeout(() => {
            m.value = r.list.length - 1, setTimeout(() => {
              m.value = 0
            }, 20)
          }, 20)
        }), (l, i) => e.e({
          a: e.f(a.list, (l, i, a) => {
            var o, d, c, p;
            return e.e({
              a: "video" === l.type
            }, "video" === l.type ? e.e({
              b: h.value
            }, (h.value, {}), {
              c: e.n({
                show: !h.value && !(null == (o = f.value[i]) ? void 0 : o.fullScreen)
              }),
              d: !h.value && !(null == (d = f.value[i]) ? void 0 : d.played) && !(null == (c = f.value[i]) ? void 0 : c.fullScreen),
              e: e.unref(u.imageMogr2)(l.videoCoverUrl, "750x"),
              f: "banner-video-" + i,
              g: i,
              h: l.url,
              i: h.value || (null == (p = f.value[i]) ? void 0 : p.fullScreen),
              j: e.o(e => function(e) {
                f.value[e].played = !0, h.value = !0, v.value = 0, s("video-play", e, f.value[e])
              }(i), "swiper-" + i),
              k: e.o(e => function(e) {
                h.value = !1, s("video-pause", e, f.value[e])
              }(i), "swiper-" + i),
              l: e.o(e => function(e) {
                f.value[e].played = !1, h.value = !1, v.value = 1, s("video-ended", e, f.value[e])
              }(i), "swiper-" + i),
              m: e.o(e => function(e, l) {
                var i;
                f.value[e].fullScreen = !!(null == (i = null == l ? void 0 : l.detail) ? void 0 : i.fullScreen)
              }(i, e), "swiper-" + i),
              n: e.o(e => function(e, l) {
                const i = l.detail.currentTime,
                  t = l.detail.duration;
                t > 0 && (v.value = i / t)
              }(0, e), "swiper-" + i),
              o: e.n(w.value === i ? "item-img" : "item-img-side"),
              p: e.s(g.value ? "animation: none;" : "")
            }) : {
              q: e.n(w.value === i ? "item-img" : "item-img-side"),
              r: e.unref(u.imageMogr2)(l.url, "750x"),
              s: e.s(g.value ? "animation: none;" : "")
            }, {
              t: "swiper-" + i,
              v: e.n(w.value === i ? "swiper-item" : "swiper-item-side"),
              w: e.o(e => function(e, l) {
                var i, u, a, o;
                n.qdTracker.track("click_activity_banner", (null == e ? void 0 : e.trackingData) || {}), "video" !== e.type ? "image" === e.type && e.path && t.goPage(e.path) : "video" !== (null == (i = r.list[l]) ? void 0 : i.type) || h.value || null == (o = null == (a = null == (u = f.value[l]) ? void 0 : u.context) ? void 0 : a.play) || o.call(a)
              }(l, i), "swiper-" + i)
            })
          }),
          b: m.value,
          c: !h.value,
          d: e.o(q),
          e: e.o(b),
          f: a.list.length > 0
        }, a.list.length > 0 ? {
          g: e.s(y.value)
        } : {})
      }
    }),
    o = e._export_sfc(a, [
      ["__scopeId", "data-v-e1ddc033"]
    ]);
  wx.createComponent(o)
}();