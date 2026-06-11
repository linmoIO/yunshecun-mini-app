! function() {
  "use strict";
  const a = require("../../common/vendor.js"),
    e = require("../../utils/helper.js");
  Array || a.resolveComponent("StIcon")(), Math || t();
  const t = () => "./CompList.js",
    o = a.defineComponent({
      __name: "Tabs",
      props: {
        indexPrefix: null,
        tabs: null,
        activeKey: null,
        memberActivityId: null,
        shrink: {
          type: Boolean
        },
        sticky: {
          type: Boolean
        },
        offsetTop: null,
        panelPadding: null,
        tabColor: {
          default: () => ({
            type: "color",
            value: "#808080"
          })
        },
        activeTabColor: {
          default: () => ({
            type: "color",
            value: "#000000"
          })
        },
        indicatorColor: {
          default: () => ({
            type: "color",
            value: "#a43127"
          })
        },
        tabBackground: null,
        panelBackground: null,
        customStyle: null,
        trackData: null
      },
      emits: ["click-tab"],
      setup(t, {
        emit: o
      }) {
        var l;
        const n = t,
          r = o,
          i = a.ref(n.activeKey || (null == (l = n.tabs[0]) ? void 0 : l.value) || ""),
          c = a.ref(n.activeKey ? n.tabs.findIndex(a => a.value === n.activeKey) : 0),
          u = a.computed(() => n.tabs.length > 4 || n.shrink),
          d = a.computed(() => {
            var a, t, o, l, r;
            const i = {};
            return n.offsetTop && (i["--tabs-offset-top"] = e.addCssUnit(n.offsetTop)), n.panelPadding && (i["--tabs-panel-padding"] = `${e.pxTransform(n.panelPadding.top,375)} ${e.pxTransform(n.panelPadding.right,375)} ${e.pxTransform(n.panelPadding.bottom,375)} ${e.pxTransform(n.panelPadding.left,375)}`), "color" === (null == (a = n.tabColor) ? void 0 : a.type) && n.tabColor.value && (i["--tabs-tab-color"] = n.tabColor.value), "color" === (null == (t = n.activeTabColor) ? void 0 : t.type) && n.activeTabColor.value && (i["--tabs-tab-color-active"] = n.activeTabColor.value), "color" === (null == (o = n.indicatorColor) ? void 0 : o.type) && n.indicatorColor.value && (i["--tabs-indicator-color"] = n.indicatorColor.value), "color" === (null == (l = n.tabBackground) ? void 0 : l.type) && n.tabBackground.value && (i["--tabs-tab-background"] = n.tabBackground.value), "color" === (null == (r = n.panelBackground) ? void 0 : r.type) && n.panelBackground.value && (i["--tabs-panel-background"] = n.panelBackground.value), i
          }),
          b = a.computed(() => {
            let a = c.value;
            return c.value < 2 && (a = 0), `tab-nav-${n.indexPrefix}-${a}`
          });
        return (e, o) => ({
          a: a.f(t.tabs, (e, o, l) => a.e({
            a: e.icon
          }, e.icon ? {
            b: "63d1b8a8-0-" + l,
            c: a.p({
              icon: e.icon,
              size: 20
            })
          } : {}, {
            d: a.t(e.label),
            e: `tab-nav-${t.indexPrefix}-${o}`,
            f: `tab-nav-${t.indexPrefix}-${o}`,
            g: i.value === e.value ? 1 : "",
            h: a.o(a => function(a, e) {
              i.value = a, c.value = e, r("click-tab", a, e)
            }(e.value, o), `tab-nav-${t.indexPrefix}-${o}`)
          })),
          b: a.n(u.value ? "tabs-nav-bar--shrink" : "tabs-nav-bar--flex"),
          c: b.value,
          d: !u.value,
          e: u.value,
          f: a.n({
            "tabs-nav-bar--sticky": t.sticky
          }),
          g: a.f(t.tabs, (e, o, l) => ({
            a: "63d1b8a8-1-" + l,
            b: a.p({
              items: e.children,
              "member-activity-id": t.memberActivityId,
              "parent-comp-name": "tabs",
              "track-data": t.trackData
            }),
            c: `tab-panel-${t.indexPrefix}-${o}`,
            d: `tab-panel-${t.indexPrefix}-${o}`,
            e: i.value === e.value ? "block" : "none"
          })),
          h: "tabs-" + t.indexPrefix,
          i: a.s(d.value),
          j: a.s(t.customStyle)
        })
      }
    }),
    l = a._export_sfc(o, [
      ["__scopeId", "data-v-63d1b8a8"]
    ]);
  wx.createComponent(l)
}();