! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    t = require("./wxuser.js"),
    r = require("./api.js"),
    n = require("../base/jAlert/jAlert.js"),
    o = require("./user.js");

  function i(e, t) {
    if (!(e = e.split("?")[1])) return !1;
    for (var r = e.split("&"), n = 0; n < r.length; n++) {
      var o = r[n].split("=");
      if (o[0] == t) return o[1]
    }
  }

  function a(t, r) {
    if (console.log("<Tips> {goPage} url:", t), !t) return !1;
    if (t.startsWith("http")) return function(t, r) {
      if (!t) return !1;
      (r ? e.index.redirectTo : e.index.navigateTo)({
        url: "/pages/mall/webview?url=" + encodeURIComponent(t),
        fail: e => {
          console.log("<Tips> {goWebview} err:", e)
        }
      })
    }(t, r), !1;
    var n = i(t, "appid");
    n ? s(n, t) : (r ? e.index.redirectTo : e.index.navigateTo)({
      url: t,
      fail: () => {
        // switchTab 只对原生 tabBar 有效，此 app 用自定义导航，改用 reLaunch 清栈后跳转
        e.index.reLaunch({ url: t, fail: () => {} })
      }
    })
  }

  function s(t, r) {
    e.index.openEmbeddedMiniProgram({
      appId: t,
      path: r,
      envVersion: "release",
      success(e) {}
    })
  }

  function l(t = {}) {
    var r = getCurrentPages(),
      n = r[r.length - 1],
      o = {
        redirect_url: `${"/"+n.route}?${u(n.options)}`
      };
    o = Object.assign(o, t), e.index.navigateTo({
      url: "/pages/member/memberLogin?" + u(o)
    })
  }

  function u(e) {
    e && e.length;
    var t = "";
    for (var r in e) "url" != r && null !== e[r] && (t += r + "=" + encodeURIComponent(e[r]) + "&");
    return t.substring(0, t.lastIndexOf("&"))
  }

  function c(e) {
    const t = {},
      r = e.split("?"),
      n = r[r.length - 1];
    return n && n.includes("=") && n.split("&").forEach(e => {
      const [r, n] = e.split("=");
      t[r] = n
    }), t
  }
  exports.addNum = function(e, t) {
    var r, n, o;
    try {
      r = e.toString().split(".")[1].length
    } catch (e) {
      r = 0
    }
    try {
      n = t.toString().split(".")[1].length
    } catch (e) {
      n = 0
    }
    return (e * (o = Math.pow(10, Math.max(r, n))) + t * o) / o
  }, exports.convertToCSSColor = function(e) {
    const t = e >> 8 & 255,
      r = 255 & e;
    return `#${(e>>16&255).toString(16).padStart(2,"0")}${t.toString(16).padStart(2,"0")}${r.toString(16).padStart(2,"0")}`
  }, exports.createUrl = u, exports.genSessionId = function(e) {
    let t = "";
    for (let r = 0, n = 64; r < e; r++) t += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_" [Math.floor(Math.random() * n)];
    return t
  }, exports.getAllRect = function(t, r) {
    return new Promise(n => {
      e.index.createSelectorQuery().in(t).selectAll(r).boundingClientRect().exec((e = []) => n(e[0]))
    })
  }, exports.getBoundingClientRect = function(t) {
    return new Promise(r => {
      e.index.createSelectorQuery().selectAll(t).boundingClientRect().exec((e = []) => {
        var t;
        return r(null == (t = e[0]) ? void 0 : t[0])
      })
    })
  }, exports.getCurrentCard = () => {
    let e = t.getStorage("cardIndex"),
      r = t.getStorage("user"),
      n = t.getStorage("cardNo"),
      o = {},
      i = {};
    return r && r.memberId ? (r.cardListDto[e] ? (o = r.cardListDto[e], i = e) : (o = r.cardListDto[0], i = 0, t.setStorage("cardIndex", 0)), n && r.cardListDto.forEach((e, r) => {
      e.cardNo == n && (o = e, i = r, t.setStorage("cardIndex", i))
    })) : (o = {
      cardType: "",
      cardLevel: ""
    }, i = 0, t.setStorage("cardIndex", 0)), [o, i]
  }, exports.getMaxWidthContent = function(e) {
    if (e) return e.replace(/<img.*?src=['"](.*?)['"].*?>/gi, "<img style='max-width: 100%;' src='$1'>")
  }, exports.getQuery = () => {
    const t = e.last(getCurrentPages()).$page.fullPath.split("?")[1],
      r = Object.create(null);
    return t && t.split("&").forEach(e => {
      const [t, n] = e.split("=");
      r[t] = n
    }), r
  }, exports.getReallyPx = function(t) {
    return t * (e.index.getSystemInfoSync().windowWidth / 375)
  }, exports.getRect = function(t, r) {
    return new Promise(n => {
      e.index.createSelectorQuery().in(t).select(r).boundingClientRect().exec((e = []) => n(e[0]))
    })
  }, exports.getUrl = e => {
    if (!e) return "";
    var r = {
      url: e
    };
    let n = t.getStorage("openid"),
      o = c(r.url),
      i = t.getStorage("config");
    return Object.keys(o).length > 0 ? r.url += `&miniProgramOpenid=${n}&appid=${i.appid}` : r.url += `?miniProgramOpenid=${n}&appid=${i.appid}`, r.url
  }, exports.getUrlParams = c, exports.goPage = a, exports.goPageWithUser = function(e) {
    let r = t.getStorage("user");
    r && r.memberId ? a(e) : l()
  }, exports.goWmUrl = function(e) {
    // 替换外部商城跳转为内部页面
    if ("orderList" == e) {
      try { wx.navigateTo({ url: '/pagesA/other/myShopOrders' }); } catch(_e) {}
      return !1;
    }
    if ("showCard" == e) {
      try { wx.navigateTo({ url: '/pagesA/other/myShopOrders' }); } catch(_e) {}
      return !1;
    }
    try { n.jAlert3("敬请期待~"); } catch(_e) {}
    return !1;
  }, exports.hasIllegalInputValue = e => {
    if (null == e ? void 0 : e.length) return /[\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/.test(null == e ? void 0 : e.trim())
  }, exports.hexToRgba = (e, t) => {
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
    return null == r ? "rgba(0,0,0,0)" : `rgba(${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}, ${t})`
  }, exports.isCmbchina = () => !1, exports.queryOrderGuestIsAll = function(o, i) {
    var a = t.getStorage("config");
    r.api.interfaceTransfer({
      query: o,
      config: {
        interfaceType: "GET",
        interfaceModule: "GC_TRAVEL_ORDER",
        interfaceMethod: "/api/reserve/order/queryOrderGuestIsAll",
        interfaceFrom: "GC",
        hotelGroupCode: a.hotelGroupCode
      }
    }).then(t => {
      1 == t.result && 0 == t.retVal.result ? t.retVal.retVal ? i && i() : e.index.showModal({
        content: "订单未添加全部出行人信息，请联系顾问",
        showCancel: !1
      }) : n.jAlert3(t.msg || t.retVal.msg)
    })
  }, exports.refreshMemberInfo = function(e, n) {
    var i = t.getStorage("user"),
      a = t.getStorage("wxuser"),
      s = t.getStorage("config");
    if (i && i.memberId) {
      var l = !1;
      if (l = !0, console.log("是微信"), "T" == t.getStorage("isOpenH5Refresh") && (l = !1), !l) return function(e) {
        var n = t.getStorage("user"),
          i = t.getStorage("wxuser"),
          a = t.getStorage("config");
        n && n.memberId ? r.api.refreshMemberInfo({
          memberId: n.memberId,
          hotelCode: a.hotelCode,
          hotelGroupCode: a.hotelGroupCode,
          hotelGroupId: a.hotelGroupId,
          appid: a.appid,
          componentAppid: a.componentAppid
        }).then((async function(r) {
          1 == r.result ? (await o.updateUserInfo(r.retVal), setTimeout(() => {
            null == e || e(r.retVal)
          }, 100)) : t.setStorage("user", "")
        })) : i && i.openid || t.setStorage("user", "")
      }(e), !1;
      r.api.memberLoginOpen({
        hotelCode: s.hotelCode,
        hotelGroupCode: s.hotelGroupCode,
        hotelGroupId: s.hotelGroupId,
        memberId: i.memberId || "",
        openid: a.openid,
        appid: s.appid,
        componentAppid: s.componentAppid
      }).then((async function(r) {
        1 == r.result ? (await o.updateUserInfo(r.retVal), setTimeout(() => {
          null == e || e(r.retVal)
        }, 100)) : t.setStorage("user", "")
      }))
    } else a && a.openid || t.setStorage("user", "")
  }, exports.requestMsg = function(t) {
    return new Promise(r => {
      "function" == typeof e.index.requestSubscribeMessage ? e.index.requestSubscribeMessage({
        tmplIds: t,
        complete(e) {
          r(e)
        }
      }) : r("")
    })
  }, exports.subtraction = function(e, t) {
    var r, n, o;
    try {
      r = e.toString().split(".")[1].length
    } catch (e) {
      r = 0
    }
    try {
      n = t.toString().split(".")[1].length
    } catch (e) {
      n = 0
    }
    return o = Math.pow(10, Math.max(r, n)), Number(((e * o - t * o) / o).toFixed(r >= n ? r : n))
  }, exports.toLogin = l, exports.toLoginBack = function() {
    l({
      mode: "back"
    })
  }, exports.urlEncode = function e(t, r, n) {
    if (null == t) return "";
    var o = "",
      i = typeof t;
    if ("string" == i || "number" == i || "boolean" == i) o += "&" + r + "=" + encodeURIComponent(t);
    else
      for (var a in t) {
        var s = null == r ? a : r + (t instanceof Array ? "[" + a + "]" : "." + a);
        o += e(t[a], s)
      }
    return o
  }
}();