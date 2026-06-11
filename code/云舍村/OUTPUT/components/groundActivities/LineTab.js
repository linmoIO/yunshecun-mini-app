! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/utils.js"),
    i = e.defineComponent({
      __name: "LineTab",
      props: {
        type: {
          default: "line"
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
          n = o,
          r = e.ref(0),
          d = e.ref(0),
          u = e.ref(0),
          s = e.ref(0),
          f = e.getCurrentInstance();

        function c() {
          Promise.all([t.getAllRect(f, ".tabs-item"), t.getRect(f, ".tabs-main")]).then(([e, i]) => {
            const l = e[u.value],
              o = e.slice(0, u.value).reduce((e, t) => e + t.width, 0);
            d.value = o - (i.width - l.width) / 2, a.tabsList.length >= 4 ? "line" === a.type && Promise.all([t.getAllRect(f, ".tabs-item"), t.getRect(f, ".tabs-line")]).then(([e = [], t]) => {
              const i = e[u.value];
              if (null == i) return;
              console.log("lineOffsetLeft2", s.value);
              let l = e.slice(0, u.value).reduce((e, t) => e + t.width, 0);
              l += (i.width - t.width) / 2 + 8, s.value = l
            }) : "line" === a.type && Promise.all([t.getAllRect(f, ".tabs-item"), t.getRect(f, ".tabs-main")]).then(([e = [], t]) => {
              const i = e[u.value];
              if (!i) return;
              const l = e.reduce((e, t) => e + t.width, 0),
                o = (t.width - l) / 2;
              let n = e.slice(0, u.value).reduce((e, t) => e + t.width, 0);
              n += (i.width - Number.parseFloat(a.lineWidth)) / 2, s.value = o + n
            })
          })
        }
        e.onLoad(() => {
          a.tabsList.length && (r.value = a.tabsList[0].id), c()
        });
        const h = e.computed(() => ({
          transform: `translateX(${s.value}px)`,
          transitionDuration: "0.3s",
          backgroundColor: a.lineColor,
          bottom: a.lineBottom,
          width: a.lineWidth,
          height: a.lineHeight,
          left: a.tabsList.length >= 4 ? "-10px" : "-3px"
        }));
        return e.watch(r, e => {
          a.tabsList.forEach((t, i) => {
            t.id === e && (u.value = i)
          }), c()
        }), l({
          updateTab: function(e) {
            r.value = e
          }
        }), (t, l) => e.e({
          a: "line" === i.type
        }, "line" === i.type ? {
          b: e.s(h.value)
        } : {}, {
          c: e.f(i.tabsList, (t, i, l) => ({
            a: e.t(t.name),
            b: i,
            c: e.s(r.value === t.id ? "default" === a.type ? {
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
            d: e.o(e => {
              return i = t.id, r.value = i, void n("change", i, !0);
              var i
            }, i)
          })),
          d: a.paddingBottom,
          e: a.tabsList.length >= 4 ? "none" : "center",
          f: d.value,
          g: e.s({
            borderBottom: a.borderBottom
          }),
          h: e.s(i.customStyle)
        })
      }
    }),
    l = e._export_sfc(i, [
      ["__scopeId", "data-v-e90d1019"]
    ]);
  wx.createComponent(l)
}();