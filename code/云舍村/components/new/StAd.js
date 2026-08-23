! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    l = require("../../hooks/useGetNodesRef.js"),
    a = require("../../utils/helper.js"),
    t = require("../../utils/qdTracker.js"),
    u = require("../../utils/umengAdaptor.js"),
    n = require("../../utils/utils.js"),
    o = e.defineComponent({
      __name: "StAd",
      props: {
        id: null,
        fileUrl: null,
        fileType: {
          default: "image"
        },
        rounded: {
          type: Boolean,
          default: !0
        },
        videoCoverUrl: null,
        path: null,
        fullScreenWhenPlayed: {
          type: Boolean
        },
        showPlayBtn: {
          type: Boolean,
          default: !0
        },
        playBtnSize: {
          default: "default"
        },
        muted: {
          type: Boolean,
          default: !1
        },
        autoplay: {
          type: Boolean,
          default: !1
        },
        isForcePause: {
          type: Boolean
        },
        pauseAfterShowPoster: {
          type: Boolean
        },
        playBtnPostion: {
          default: "rb"
        },
        trackingData: null,
        trackingName: {
          default: "mini_homepage_banner_click"
        },
        afterClick: {
          type: Function
        },
        customStyle: null
      },
      emits: ["play-after", "pause-after", "end-after"],
      setup(o, {
        emit: r
      }) {
        const i = o,
          c = r,
          s = e.inject("handleSubscribeMessage", void 0),
          d = e.ref(!1),
          f = e.ref(!1),
          v = e.getCurrentInstance(),
          {
            nodesRef: p
          } = l.useGetNodesRef({
            selector: "#" + i.id,
            instance: v,
            enabled: !("video" !== i.fileType || !i.fileUrl)
          }),
          y = e.ref(),
          m = e.ref(!1);
        async function g() {
          var e;
          if (s && await s(), i.trackingData && (u.adaptor.sendEvent("click_book_page_subject_control", i.trackingData || {}), t.qdTracker.track(i.trackingName, (null == i ? void 0 : i.trackingData) || {})), "video" === i.fileType) {
            if (d.value || f.value) return;
            ! function() {
              var e;
              console.log("[index] <StAd> {play} ", i.fileType, y.value), setTimeout(() => {
                var e, l;
                null == (l = null == (e = y.value) ? void 0 : e.play) || l.call(e)
              }, 300), i.fullScreenWhenPlayed && !f.value && (null == (e = y.value) || e.requestFullScreen())
            }()
          } else i.path && n.goPage(i.path);
          null == (e = i.afterClick) || e.call(i)
        }

        function k() {
          m.value = !0, d.value = !0, c("play-after")
        }

        function h() {
          d.value = !1, c("pause-after")
        }

        function S() {
          m.value = !1, d.value = !1
        }

        function _(e) {
          var l, a, t;
          f.value = e.detail.fullScreen, e.detail.fullScreen || i.fullScreenWhenPlayed && (m.value = !1, null == (l = y.value) || l.seek(0), null == (t = null == (a = y.value) ? void 0 : a.pause) || t.call(a))
        }
        const B = e.computed(() => d.value || f.value);
        return e.watch(() => p.value, e => {
          null == e || e.context(e => {
            y.value = null == e ? void 0 : e.context
          }).exec()
        }), e.watch(() => i.isForcePause, e => {
          var l, a;
          e && d.value && (null == (a = null == (l = y.value) ? void 0 : l.pause) || a.call(l))
        }), (l, t) => e.e({
          a: o.fileUrl
        }, o.fileUrl ? e.e({
          b: "video" === o.fileType
        }, "video" === o.fileType ? {
          c: e.n({
            show: !d.value && !f.value
          }),
          d: e.n("control-play--" + o.playBtnPostion),
          e: e.n("control-play--" + o.playBtnSize),
          f: o.videoCoverUrl && !m.value && !f.value,
          g: e.unref(a.imageMogr2)(o.videoCoverUrl, "750x"),
          h: o.id,
          i: o.fileUrl,
          j: o.muted,
          k: o.autoplay,
          l: B.value,
          m: B.value,
          n: B.value,
          o: B.value,
          p: e.o(k),
          q: e.o(h),
          r: e.o(S),
          s: e.o(_)
        } : "image" === o.fileType ? {
          v: e.unref(a.imageMogr2)(o.fileUrl, "750x")
        } : {}, {
          t: "image" === o.fileType,
          w: e.n({
            rounded: o.rounded
          }),
          x: e.s(o.customStyle),
          y: e.o(g),
          z: o.trackingData && o.trackingData.banner_name
        }) : {})
      }
    }),
    r = e._export_sfc(o, [
      ["__scopeId", "data-v-01b76427"]
    ]);
  wx.createComponent(r)
}();
