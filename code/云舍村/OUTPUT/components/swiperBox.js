! function() {
  "use strict";
  const e = require("../utils/utils.js"),
    t = require("../common/vendor.js"),
    i = require("../utils/wxuser.js"),
    r = require("../utils/helper.js"),
    o = require("../utils/umengAdaptor.js"),
    n = t.defineComponent({
      name: "switchBar",
      props: {
        slides: {
          type: Array,
          default: () => []
        },
        videoUrl: {
          type: String,
          default: () => ""
        },
        interval: {
          type: Number,
          default: () => 3e3
        },
        isDot: {
          type: Boolean,
          default: () => !0
        },
        swiperConfig: {
          type: Object,
          default: () => ({
            indicatorDots: !1,
            autoplay: !0,
            slot: !1,
            dotPosStyle: "",
            dotStyle: "",
            circular: !0
          })
        }
      },
      setup(n, s) {
        let l = t.ref(0),
          a = t.ref(0);
        t.watch(() => n.videoUrl, (e, t) => {
          n.videoUrl && (l.value = -1)
        });
        const u = t.computed(() => {
            let e = "";
            return n.swiperConfig.padding && (e = "padding:0 16px;"), e
          }),
          p = t.computed(() => {
            var e = `width:${12*n.slides.length}px;`;
            return n.swiperConfig.dotPosStyle && (e += n.swiperConfig.dotPosStyle), e
          }),
          d = t.computed(() => {
            var e = `left:${12*l.value}px;`;
            return n.swiperConfig.dotStyle && (e += n.swiperConfig.dotStyle), e
          });
        return {
          swiperCurrent: l,
          toPage: t => {
            if (t.name && o.adaptor.sendEvent("click_book_page_subject_control", {
                banner_name: t.name
              }), t.link) {
              if (n.swiperConfig.needLogin) {
                let t = i.getStorage("user");
                if (!t || !t.memberId) return e.toLoginBack(), !1
              }
              e.goPage(t.link)
            }
          },
          swiperChange: e => {
            n.videoUrl ? l.value = e.detail.current - 1 : l.value = e.detail.current, s.emit("change", l.value)
          },
          swiperDotStyle: d,
          swiperDotsStyle: p,
          paddingStyle: u,
          current: a,
          changeCurrent: e => {
            a.value = e
          },
          imageMogr2: r.imageMogr2
        }
      }
    }),
    s = t._export_sfc(n, [
      ["render", function(e, i, r, o, n, s) {
        return t.e({
          a: "" != e.videoUrl
        }, "" != e.videoUrl ? {
          b: e.videoUrl
        } : {}, {
          c: t.f(e.slides, (i, r, o) => t.e(e.swiperConfig.slot ? {
            a: "item-" + o,
            b: t.r("item", {
              item: i
            }, o)
          } : t.e({
            c: i.title || i.subTitle
          }, i.title || i.subTitle ? t.e({
            d: i.title
          }, i.title ? {
            e: t.t(i.title)
          } : {}, {
            f: i.subTitle
          }, i.subTitle ? {
            g: t.t(i.subTitle)
          } : {}) : {}, {
            h: e.imageMogr2(i.imgUrl, "750x"),
            i: t.o(t => e.toPage(i), r),
            j: t.s(e.paddingStyle)
          }), {
            k: r
          })),
          d: e.swiperConfig.slot,
          e: e.swiperConfig.indicatorDots,
          f: e.swiperConfig.circular,
          g: e.swiperConfig.autoplay,
          h: e.interval,
          i: t.o((...t) => e.swiperChange && e.swiperChange(...t)),
          j: e.current,
          k: e.swiperConfig.duration ? e.swiperConfig.duration : 500,
          l: e.swiperCurrent >= 0 && e.isDot
        }, e.swiperCurrent >= 0 && e.isDot ? {
          m: t.s(e.swiperDotStyle),
          n: t.s(e.swiperDotsStyle)
        } : {})
      }],
      ["__scopeId", "data-v-561f75ec"]
    ]);
  wx.createComponent(s)
}();