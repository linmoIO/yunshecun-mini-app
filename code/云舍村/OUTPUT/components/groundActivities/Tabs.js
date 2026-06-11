! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/utils.js"),
    i = e.defineComponent({
      __name: "Tabs",
      props: {
        type: {
          default: "default"
        },
        defaultTitleColor: {
          default: "#808080"
        },
        activeTitleColror: {
          default: "#000000"
        },
        defaultTitleSize: {
          default: "14px"
        },
        activeTitleSize: {
          default: "14px"
        },
        defaultFontWeight: {
          default: "400"
        },
        activeFontWeight: {
          default: "500"
        },
        paddingBottom: {
          default: "0"
        },
        borderRadius: {
          default: "4px"
        },
        defaultBorder: {
          default: "1px solid #CCCCCC"
        },
        activeBorder: {
          default: "1px solid #A43127"
        },
        marginRight: {
          default: "8px"
        },
        lineColor: {
          default: "#A43127"
        },
        lineBottom: {
          default: "0"
        },
        lineWidth: {
          default: "32px"
        },
        lineHeight: {
          default: "2px"
        },
        borderBottom: {
          default: "none"
        },
        customStyle: null,
        tabsList: null
      },
      emits: ["change"],
      setup(i, {
        expose: l,
        emit: o
      }) {
        const a = i,
          d = o,
          n = e.ref(0),
          r = e.ref(0),
          u = e.ref(0),
          f = e.ref(0),
          c = e.getCurrentInstance();

        function s() {
          Promise.all([t.getAllRect(c, ".tabs-item"), t.getRect(c, ".tabs-main")]).then(([e, i]) => {
            const l = e[u.value],
              o = e.slice(0, u.value).reduce((e, t) => e + t.width, 0);
            r.value = o - (i.width - (null == l ? void 0 : l.width)) / 2, "line" === a.type && Promise.all([t.getAllRect(c, ".tabs-item"), t.getRect(c, ".tabs-line")]).then(([e = [], t]) => {
              const i = e[u.value];
              if (null == i) return;
              console.log("lineOffsetLeft2", f.value);
              let l = e.slice(0, u.value).reduce((e, t) => e + t.width, 0);
              l += (i.width - t.width) / 2 + 8, f.value = l
            })
          })
        }
        e.onLoad(() => {
          a.tabsList.length && (n.value = a.tabsList[0].id), s()
        });
        const g = e.computed(() => ({
          transform: `translateX(${f.value}px)`,
          transitionDuration: "0.3s",
          backgroundColor: a.lineColor,
          bottom: a.lineBottom,
          width: a.lineWidth,
          height: a.lineHeight
        }));
        return e.watch(n, e => {
          a.tabsList.forEach((t, i) => {
            t.id === e && (u.value = i)
          }), s()
        }), l({
          updateTabId: function(e) {
            n.value = e
          }
        }), (t, l) => e.e({
          a: "line" === i.type
        }, "line" === i.type ? {
          b: e.s(g.value)
        } : {}, {
          c: e.f(i.tabsList, (t, i, l) => ({
            a: e.t(t.name),
            b: i,
            c: e.s(n.value === t.id ? "default" === a.type ? {
              color: a.activeTitleColror,
              fontSize: a.activeTitleSize,
              fontWeight: a.activeFontWeight
            } : "card" === a.type ? {
              color: a.activeTitleColror,
              fontSize: a.activeTitleSize,
              fontWeight: a.activeFontWeight,
              border: a.activeBorder,
              borderRadius: a.borderRadius,
              marginRight: a.marginRight
            } : "line" === a.type ? {
              color: a.activeTitleColror,
              fontSize: a.activeTitleSize,
              fontWeight: a.activeFontWeight
            } : void 0 : "default" === a.type ? {
              color: a.defaultTitleColor,
              fontSize: a.defaultTitleSize,
              fontWeight: a.defaultFontWeight
            } : "card" === a.type ? {
              color: a.defaultTitleColor,
              fontSize: a.defaultTitleSize,
              fontWeight: a.defaultFontWeight,
              border: a.defaultBorder,
              borderRadius: a.borderRadius,
              marginRight: a.marginRight
            } : "line" === a.type ? {
              color: a.defaultTitleColor,
              fontSize: a.defaultTitleSize,
              fontWeight: a.defaultFontWeight
            } : void 0),
            d: e.o(e => function(e) {
              n.value = e.id, d("change", e, !0)
            }(t), i)
          })),
          d: a.paddingBottom,
          e: r.value,
          f: e.s({
            borderBottom: a.borderBottom
          }),
          g: e.s(i.customStyle)
        })
      }
    }),
    l = e._export_sfc(i, [
      ["__scopeId", "data-v-c3b8cab7"]
    ]);
  wx.createComponent(l)
}();