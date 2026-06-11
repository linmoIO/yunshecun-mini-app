! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    r = require("../utils/api.js"),
    o = require("../utils/config.js"),
    n = require("../utils/log.js"),
    u = require("../utils/user.js"),
    s = require("../utils/wxuser.js");
  exports.useUser = function(t) {
    const {
      autoRefresh: l = !0
    } = {}, i = e.ref(), a = e.ref(), c = e.ref(), d = e.computed(() => {
      var e, r;
      return Boolean((null == (e = i.value) ? void 0 : e.memberId) && (null == (r = c.value) ? void 0 : r.accessToken))
    }), m = e.ref(!1);
    async function f() {
      c.value = u.getUserToken();
      const {
        accessToken: e,
        refreshToken: r
      } = c.value;
      e && r || u.removeLocalUserInfo(), i.value = s.getStorage("user"), a.value = await u.getWxUserInfo()
    }
    e.onMounted(() => {
      f(), m.value = !0
    }), e.onShow(() => {
      m.value && l && f()
    });
    const {
      run: v,
      runAsync: p
    } = e.useRequest(() => new Promise((e, t) => {
      var l, c, d;
      if (!(null == (l = i.value) ? void 0 : l.memberId)) return void t(new Error("user.memberId is required"));
      const m = {
        memberId: i.value.memberId,
        hotelCode: o.config.hotelCode,
        hotelGroupCode: o.config.hotelGroupCode,
        hotelGroupId: o.config.hotelGroupId,
        appid: o.config.appid,
        componentAppid: o.config.componentAppid
      };
      (null == (c = i.value) ? void 0 : c.memberToken) && (m.memberToken = i.value.memberToken);
      let f = r.api.refreshMemberInfo;

      function v(e) {
        n.log.error("<useUser>{fetchUserInfo} params:", m), n.log.error("<useUser>{fetchUserInfo} error:", e), s.setStorage("user", ""), s.removeStorage("user_new"), t(e)
      }(null == (d = a.value) ? void 0 : d.openid) && (f = r.api.memberLoginOpen, m.openid = a.value.openid), f(m, {
        showToast: !1
      }).then(r => {
        1 === r.result ? (i.value = r.retVal, u.updateUserInfo(r.retVal), e(r.retVal)) : v(new Error(r))
      }).catch(v)
    }), {
      manual: !0
    });
    return {
      user: i,
      wxuser: a,
      isLogged: d,
      refreshUser: v,
      refreshUserAsync: p
    }
  }
}();