! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    r = require("../base/defaultConfig.js"),
    o = require("../base/jAlert/jAlert.js"),
    n = require("./api.js"),
    t = require("./config.js"),
    s = require("./log.js"),
    i = require("./qdTracker.js"),
    a = require("./umengAdaptor.js"),
    u = require("./wxuser.js"),
    g = "access_token",
    d = "refresh_token";

  function l(e) {
    return `${t.config.appid?t.config.appid+"_":""}${e}`
  }
  let p = null,
    c = "";

  function m(r = "松赞家人") {
    if (!p) {
      let o = !1;
      const g = e => {
          if ((null == e ? void 0 : e.openid) && e.openid !== c) {
            c = e.openid, a.adaptor.setDeviceId(e.openid);
            const r = {
              wx_unionid: e.unionid,
              wx_applet_openid: l(e.openid)
            };
            i.qdTracker.setAccountInfo(r), s.log.info("[utils/user] {updateAccountInfo} qdParams:", r)
          }
        },
        d = new Promise((e, r) => {
          setTimeout(() => {
            o || (s.log.error("{getWxUserInfo} 获取用户信息超时"), r(new Error("获取用户信息超时"))), p = null
          }, 1e4)
        });
      p = Promise.race([new Promise((i, a) => {
        try {
          const o = u.getStorage("wxuser") || {};
          (null == o ? void 0 : o.nickName) || (o.nickName = "微信用户", u.setStorage("wxuser", o)), (null == o ? void 0 : o.session_key) ? (g(o), d(o)) : u.login().then(({
            code: o
          }) => {
            const i = {
              code: o,
              appid: t.config.appid,
              avatarUrl: "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/avatar.png"
            };
            n.api.getWxCode(i).then(o => {
              var n;
              if (s.log.info("{getWxUserInfo} {api.getWxCode} res:", o, i), s.log.info("{getWxUserInfo} {api.getWxCode} params:", i), 1 === (null == o ? void 0 : o.result) && (null == (n = null == o ? void 0 : o.retVal) ? void 0 : n.openid)) {
                const n = Object.assign(o.retVal, {
                  nickName: r
                });
                g(n), setTimeout(() => {
                  d(n)
                }, 300), e.index.$emit("app-update-wxuser", n)
              } else l({
                msg: "{getWxUserInfo} {api.getWxCode} 获取session_key失败",
                originError: o
              })
            }).catch(e => {
              s.log.error("{getWxUserInfo} {api.getWxCode} httpError:", e), s.log.error("{getWxUserInfo} {api.getWxCode} params:", i), l({
                msg: "{getWxUserInfo} {api.getWxCode} 获取session_key失败",
                originError: e
              })
            })
          }).catch(e => {
            s.log.error("{getWxUserInfo} {wxuser.login} err:", e), l({
              msg: "{getWxUserInfo} {uni.login} 获取code失败",
              originError: e
            })
          })
        } catch (e) {
          l({
            msg: "{getWxUserInfo} 发生未捕获的异常",
            originError: e
          })
        }

        function d(e) {
          o = !0, i(e), u.setStorage("wxuser", e),
          e && e.memberId && u.setStorage("user", {
            memberId: e.memberId, memberToken: e.memberToken || e.token || "",
            nickname: e.nickName || e.nickname || "云舍村家人",
            avatar: e.avatar || "", openid: e.openid || "", cardLevel: e.cardLevel || "普通会员",
            cardListDto: [], cardId: "", cardNo: "", cardLevelDescript: e.cardLevel || "普通会员",
            cardSrcDescript: "", mobile: e.phone || "", points: e.points || 0, balance: e.balance || 0, isNew: "F",
          }),
          p = null
        }

        function l(e) {
          a(e), p = null
        }
      }), d]).catch(e => {
        throw console.error("[utils] <utils/user> {getWxUserInfo} 请求失败:", e), p = null, e
      })
    }
    return p
  }
  let f = {};

  function x() {
    return {
      accessToken: u.getStorage(g),
      refreshToken: u.getStorage(d)
    }
  }

  function I() {
    u.removeStorage(g), u.removeStorage(d)
  }
  exports.getUserToken = x, exports.getWxUserInfo = m, exports.isLogged = function() {
    const e = u.getStorage("user"),
      {
        accessToken: r
      } = x() || {};
    return !(!(null == e ? void 0 : e.memberId) || !r)
  }, exports.removeLocalUserInfo = function() {
    I(), u.removeStorage("user"), u.removeStorage("user_new")
  }, exports.removeOpenIdAndSignOut = async function(t = !1, a = "/pages/member/memberCenter") {
    const g = u.getStorage("config"),
      d = u.getStorage("user"),
      l = u.getStorage("wxuser"),
      p = {
        hotelCode: g.hotelCode,
        hotelGroupCode: g.hotelGroupCode,
        hotelGroupId: g.hotelGroupId,
        isMiniApp: !0,
        memberId: d.memberId,
        miniAppid: g.appid,
        openIdType: "WEIXIN",
        openIdUserId: l.openid
      };
    try {
      const g = await n.api.removeOpenId(p);
      if (console.log("<Loginout> {removeOpenIdAndSignOut} {api.removeOpenId} res:", g), !g || 1 !== g.result) return s.log.error("[utils/wxuser] {api.removeOpenId} resultError:", g), s.log.error("[utils/wxuser] {api.removeOpenId} params:", p), void o.jAlert3(r.defaultConfig.errorMessage);
      s.log.info("[utils/wxuser] {api.removeOpenId} res:", g, p), s.log.info("[utils/wxuser] {api.removeOpenId} params:", p), i.qdTracker.setAccountInfo({
        business_id: ""
      }), I(), u.setStorage("user", ""), u.removeStorage("user_new"), t || (o.jAlert3("退出成功"), setTimeout(() => {
        e.index.reLaunch({
          url: a
        })
      }, 2e3))
    } catch (e) {
      s.log.error("[utils/wxuser] {api.removeOpenId} httpError:", e), s.log.error("[utils/wxuser] {api.removeOpenId} params:", p), t || o.jAlert3(r.defaultConfig.errorMessage)
    }
  }, exports.removeUserToken = I, exports.setUserToken = function(e) {
    (null == e ? void 0 : e.accessToken) && (u.setStorage(g, e.accessToken), u.setStorage(d, e.refreshToken))
  }, exports.updateUserInfo = async function(r) {
    u.setStorage("user", r);
    const o = await m(),
      n = {
        wx_unionid: o.unionid,
        wx_applet_openid: l(o.openid)
      };
    (null == r ? void 0 : r.memberIdStr) && (n.business_id = r.memberIdStr), e.isEqual(f, n) || (i.qdTracker.setAccountInfo(n), s.log.info("[utils/user] {updateUserInfo} qdParams:", n), f = n)
  }
}();