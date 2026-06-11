! function() {
  "use strict";
  Object.defineProperty(exports, Symbol.toStringTag, {
    value: "Module"
  });
  const e = require("./common/vendor.js"),
    r = require("./utils/aplus.js"),
    a = require("./utils/qdTracker.js");
  let o = {
    userInfo: {},
    navInfo: {
      top: 0,
      bottom: 44,
      height: 44,
      statusBarHeight: 20
    }
  };
  const t = e.defineComponent({
      __name: "App",
      setup() {
        const t = () => {
          try {
            const t = e.index.getWindowInfo ? e.index.getWindowInfo() : e.index.getSystemInfoSync(),
              n = e.index.getAppBaseInfo ? e.index.getAppBaseInfo() : {},
              s = t.statusBarHeight || n.statusBarHeight || 20,
              a = e.index.getMenuButtonBoundingClientRect ? e.index.getMenuButtonBoundingClientRect() : null;
            let i = {
              top: s,
              bottom: s + 44,
              height: 44,
              statusBarHeight: s
            };
            a && a.top && (i = {
              ...a,
              statusBarHeight: s,
              height: a.bottom - a.top + 2 * (a.top - s)
            });
            o.navInfo = i
          } catch (e) {
            console.warn("[app] initNavInfo failed:", e)
          }
        };
        return e.onLaunch(() => {
          const n = "function" == typeof getApp ? getApp() : null;
          n && (n.showNone = (t = "", n = 2e3) => {
            e.index.showToast({
              title: t,
              icon: "none",
              duration: n
            })
          });
          try {
            r.init()
          } catch (e) {
            console.warn("[app] aplus init failed:", e)
          }
          try {
            a.qdTracker.init()
          } catch (e) {
            console.warn("[app] qdTracker init failed:", e)
          }
          t()
        }), () => {}
      }
    });

  function n() {
    const r = e.createSSRApp(t),
      i = e.createPinia();
    r.component("FloatButtonKf", () => "./components/new/FloatButtonKf.js"), r.use(i), r.mixin(a.QDTMixin);
    return {
      app: r,
      globalData: o
    }
  }
  n().app.mount("#app"), exports.createApp = n
}();
