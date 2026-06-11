! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    t = require("../hooks/useScroll.js"),
    {
      scrollTop: o,
      onPageScroll: a
    } = t.useScroll(),
    i = e.defineComponent({
      name: "coustomHead",
      props: {
        title: {
          type: String,
          default: () => ""
        },
        isPreview: {
          type: Boolean,
          default: () => !1
        },
        color: {
          type: String,
          default: () => ""
        },
        backFilter: {
          type: String,
          default: () => ""
        },
        bgColor: {
          type: String,
          default: () => ""
        },
        position: {
          type: String,
          default: () => "fixed"
        },
        nativeMode: {
          type: [Boolean, String],
          default: () => !1
        },
        coustomPage: {
          type: String,
          default: () => ""
        },
        customClass: {
          type: String,
          default: () => ""
        },
        goBackNext: {
          type: Boolean,
          default: () => !0
        },
        paymentRequired: {
          type: Boolean,
          default: () => !0
        }
      },
      emits: ["navigate-back-guard"],
      setup(t, {
        emit: i
      }) {
        let n = e.ref(0),
          r = e.ref(!1),
          l = e.ref(44),
          u = e.computed(() => t.nativeMode ? "fixed" : t.position),
          d = e.computed(() => t.nativeMode ? t.color || "#000" : t.color),
          c = e.computed(() => t.nativeMode ? t.bgColor || "#FFF" : t.bgColor);
        const s = () => !!t.isPreview && (e.index.showToast({
            title: "预览链接无法操作，请从正常入口进入。",
            icon: "none",
            duration: 5e3
          }), !0),
          g = () => {
            s() || (i("navigate-back-guard", {
              showGuardDialog: !t.goBackNext && t.paymentRequired
            }), !t.goBackNext && t.paymentRequired || (t.coustomPage ? e.index.redirectTo({
              url: t.coustomPage
            }) : e.index.navigateBack({
              delta: 1
            })))
          };
        e.watch(d, () => {
          f()
        }), e.watch(() => t.goBackNext, (e, t) => {
          e && g()
        });
        const f = () => {
          "#000" == d.value || "#000000" == d.value || t.title && "#fff" != d.value && "#ffffff" != d.value ? e.index.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: "#ffffff"
          }) : e.index.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#000000"
          })
        };
        return a(e => {
          o.value = e.scrollTop
        }), e.onMounted(() => {
          e.index.getSystemInfo({
            success: e => {
              n.value = e.statusBarHeight || 0, l.value = (e.statusBarHeight || 0) + l.value
            },
            fail(e) {
              console.log(e)
            }
          }), 1 == getCurrentPages().length && (r.value = !0), f()
        }), {
          navHeight: n,
          isFirstPage: r,
          back: g,
          goIndex: () => {
            s() || e.index.reLaunch({
              url: "/pages/travel/index"
            })
          },
          computedPosition: u,
          computedColor: d,
          computedBgColor: c,
          navigationBarHeight: l,
          scrollTop: o
        }
      }
    }),
    n = e._export_sfc(i, [
      ["render", function(t, o, a, i, n, r) {
        return e.e({
          a: t.navHeight + "px",
          b: t.isFirstPage
        }, t.isFirstPage ? {
          c: e.o((...e) => t.goIndex && t.goIndex(...e))
        } : {
          d: e.o((...e) => t.back && t.back(...e))
        }, {
          e: t.title
        }, t.title ? {
          f: e.t(t.title)
        } : {}, {
          g: t.computedColor,
          h: t.computedBgColor,
          i: t.computedPosition,
          j: t.backFilter,
          k: e.n(t.customClass),
          l: t.nativeMode
        }, t.nativeMode ? {
          m: t.navigationBarHeight + "px"
        } : {})
      }],
      ["__scopeId", "data-v-491f35ff"]
    ]);
  wx.createComponent(n)
}();