! function() {
  "use strict";
  Object.defineProperty(exports, Symbol.toStringTag, {
    value: "Module"
  });
  const e = require("./common/vendor.js"),
    r = require("./utils/aplus.js"),
    a = require("./utils/qdTracker.js"),
    c = require("./utils/config.js");
  // 全局楷体：霞鹜文楷常用字子集（OFL-1.1），由后端 /uploads/fonts 提供；加载失败时 app.wxss 中的字体栈回退到系统字体
  const loadKaiFont = () => {
    const base = String(c.config.baseUrlmall || "").replace(/\/api\/?$/, "");
    if (!base || !wx.loadFontFace) return;
    wx.loadFontFace({
      global: !0,
      family: "LXGW WenKai",
      source: `url("${base}/uploads/fonts/LXGWWenKai-Regular.subset.woff2")`,
      scopes: ["webview", "native"],
      fail: e => console.warn("[app] loadFontFace failed:", e)
    })
  };
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
          t(), loadKaiFont()
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
