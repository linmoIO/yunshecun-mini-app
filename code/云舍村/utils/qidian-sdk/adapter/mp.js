! function() {
  "use strict";
  const t = require("../packages/QDTracker-mp.js"),
    a = {
      instance: t.et,
      uniPlatform: "mp",
      mpPltf: "",
      init(e) {
        a.adaptGlobalApi(), t.et.init({
          ...e,
          mpPltf: a.mpPltf
        })
      },
      adaptGlobalApi() {
        a.mpPltf = "wx"
      },
      adaptPageApi(a) {
        t.et.startPageMonitor(a, t.et)
      },
      QDTMixin: {
        methods: {
          customOnLoad(t) {
            try {
              const e = t => {
                (t || []).forEach(t => {
                  a.adaptPageApi(t.$mp.component || t.$scope), t.$children && t.$children.length && e(t.$children)
                })
              };
              if (e(t.$children), !t.$mp.page && !t.$scope) return;
              a.adaptPageApi(t.$mp.page || t.$scope)
            } catch (t) {
              console.log("[ADAPTER ERROR]", t)
            }
          }
        },
        onLoad() {
          this.customOnLoad(this)
        }
      }
    };
  exports.QDTMini = a
}();