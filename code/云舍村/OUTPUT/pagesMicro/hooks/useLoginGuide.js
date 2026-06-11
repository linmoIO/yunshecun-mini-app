! function() {
  "use strict";
  const i = require("../../common/vendor.js"),
    e = require("../../utils/qdTracker.js"),
    u = require("../../utils/user.js"),
    l = require("../../utils/utils.js");
  exports.useLoginGuide = function(n) {
    const o = i.ref(!1),
      t = i.ref(!1);
    let r = null;
    const a = i.computed(() => {
        var e, u, l;
        return null == (l = null == (u = null == (e = i.unref(n)) ? void 0 : e.page) ? void 0 : u.config) ? void 0 : l.props
      }),
      d = i.computed(() => {
        var i;
        return !!(null == (i = a.value) ? void 0 : i.loginGuide)
      }),
      s = i.computed(() => {
        var i, e, u;
        return {
          title: null == (i = a.value) ? void 0 : i.loginGuideTitle,
          description: null == (e = a.value) ? void 0 : e.loginGuideDescription,
          image: null == (u = a.value) ? void 0 : u.loginGuideImage
        }
      });

    function v() {
      null !== r && (clearTimeout(r), r = null)
    }

    function c() {
      var i;
      if (v(), !d.value || u.isLogged() || t.value) return;
      const e = 1e3 * ((null == (i = a.value) ? void 0 : i.loginGuideTime) || 0);
      r = setTimeout(() => {
        o.value = !0
      }, e)
    }

    function g(u) {
      var l, o;
      e.qdTracker.track("login_popup_show", {
        activity_page_id: null == (l = i.unref(n)) ? void 0 : l.id,
        activity_page_name: null == (o = i.unref(n)) ? void 0 : o.title,
        click_result: "login" === u ? "去登录" : "暂不登录"
      })
    }
    return i.watch(d, i => {
      i && c()
    }), i.onShow(() => {
      !d.value || u.isLogged() || t.value || o.value || c()
    }), i.onHide(() => {
      v()
    }), {
      loginGuideVisible: o,
      loginGuideConfig: s,
      handleLogin: function() {
        l.toLogin(), g("login")
      },
      handleDismiss: function() {
        o.value = !1, t.value = !0, g("dismiss")
      }
    }
  }
}();