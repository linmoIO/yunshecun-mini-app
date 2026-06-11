! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/helper.js"),
    o = require("../../utils/utils.js"),
    l = e.defineComponent({
      __name: "Carousel",
      props: {
        componentName: null,
        list: null,
        autoplay: {
          type: Boolean,
          default: !0
        },
        interval: {
          default: 3e3
        },
        duration: {
          default: 500
        },
        showArrows: {
          type: Boolean,
          default: !0
        },
        showDots: {
          type: Boolean,
          default: !0
        },
        dotPosition: {
          default: "bottom"
        },
        height: {
          default: 300
        },
        rounded: {
          type: Boolean
        },
        fit: {
          default: "cover"
        },
        beforeClickCarouselItem: {
          type: Function
        }
      },
      emits: ["change", "click"],
      setup(l, {
        emit: u
      }) {
        const a = l,
          n = u,
          r = e.computed(() => {
            var e;
            return (null == (e = a.list) ? void 0 : e.length) || 0
          }),
          i = e.computed(() => {
            switch (a.fit) {
              case "cover":
                return "aspectFill";
              case "fill":
                return "scaleToFill";
              default:
                return "aspectFit"
            }
          }),
          s = e.ref(0),
          c = e.computed(() => ({
            height: t.pxTransform(a.height, 375)
          }));

        function d() {
          s.value = (s.value + 1) % r.value
        }

        function p() {
          s.value = (s.value - 1 + r.value) % r.value
        }

        function v(e) {
          var t;
          ["autoplay", "touch"].includes(null == (t = e.detail) ? void 0 : t.source) && (s.value = e.detail.current)
        }
        return e.watch(s, e => {
          n("change", e)
        }), (t, u) => e.e({
          a: e.f(l.list, (t, l, u) => ({
            a: t.imgUrl,
            b: e.o(e => function(e) {
              var t;
              null == (t = a.beforeClickCarouselItem) || t.call(a, e), e.jumpUrl && o.goPage(e.jumpUrl)
            }(t), "swiper-" + l),
            c: "swiper-" + l
          })),
          b: i.value,
          c: s.value,
          d: l.autoplay,
          e: l.interval,
          f: l.duration,
          g: e.o(v),
          h: l.showArrows && r.value > 1
        }, l.showArrows && r.value > 1 ? {
          i: e.o(p),
          j: e.o(d)
        } : {}, {
          k: l.showDots && r.value > 1
        }, l.showDots && r.value > 1 ? {
          l: e.f(r.value, (e, t, o) => ({
            a: "dot-" + e,
            b: e - 1 === s.value ? 1 : ""
          })),
          m: e.n("position-" + l.dotPosition)
        } : {}, {
          n: l.rounded ? 1 : "",
          o: e.s(c.value)
        })
      }
    }),
    u = e._export_sfc(l, [
      ["__scopeId", "data-v-b4274907"]
    ]);
  wx.createComponent(u)
}();