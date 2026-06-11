! function() {
  "use strict";
  const e = require("../../utils/api.js"),
    t = require("../../utils/wxuser.js"),
    r = require("../../utils/user.js"),
    i = require("../../utils/utils.js"),
    o = require("../../utils/umengAdaptor.js"),
    s = require("../../utils/helper.js"),
    n = require("../../hooks/useAdReport.js"),
    a = require("../../hooks/useXhsReport.js"),
    d = require("../../common/vendor.js"),
    l = a.useXshReport(),
    u = n.useAdReport();
  var p = {};
  const h = {
      data: () => ({
        url: "",
        shareItem: {},
        original: "",
        user: {},
        pageOption: {},
        openid: ""
      }),
      onPullDownRefresh() {},
      onShareAppMessage(e) {
        let t = this.shareItem.link || this.pageOption && this.pageOption.url ? this.pageOption.url : "";
        t = i.getUrl(decodeURIComponent(t));
        const r = {
            url: t
          },
          o = "/pages/mall/webview?" + i.urlEncode(r);
        return console.log("<Webview> {onShareAppMessage} path:", o, r), {
          title: this.shareItem.title,
          imageUrl: s.shareImageTransfrom(this.shareItem.imgUrl),
          path: o
        }
      },
      methods: {
        bindload() {},
        refreshMemberInfo() {
          var t = this;
          e.api.memberLoginOpen({
            hotelCode: p.hotelCode,
            hotelGroupCode: p.hotelGroupCode,
            hotelGroupId: p.hotelGroupId,
            componentAppid: p.componentAppid,
            appid: p.appid,
            openid: this.openid || ""
          }).then((async function(e) {
            if (1 == e.result) await r.updateUserInfo(e.retVal), t.user = e.retVal, [t.currentCard, t.currentCardIndex] = i.getCurrentCard(), cb && cb();
            else {
              var o = {};
              await r.updateUserInfo(o), t.user = o[(t.currentCard, t.currentCardIndex)] = i.getCurrentCard()
            }
          }))
        },
        bindmessage(e) {
          var r = e.detail.data[e.detail.data.length - 1];
          console.log("=================>"), console.log(r), "share" == r.type ? this.shareItem = r : "signOut" == r.type ? (t.setStorage("user", ""), t.setStorage("token", ""), this.user = "") : "refreshMemberInfo" == r.type && (r.token ? (this.user && this.user.memberId, i.refreshMemberInfo()) : i.refreshMemberInfo())
        },
        parseUrl() {
          const e = t.getStorage("user");
          var r = i.getUrlParams(this.original);
          let o = t.getStorage("distributorBase"),
            s = "",
            n = t.getStorage("token");
          r && r.distributorId && (s = r.distributorId), r && (delete r.miniProgramOpenid, delete r.token, delete r.appid, delete r.distributorId), !s && o && o.id && (s = o.id);
          var a = this.original.split("?");
          a[a.length - 1].indexOf("=") > -1 && a.pop(), a = a.join("?");
          const d = {
            ...r,
            appid: p.appid,
            miniProgramOpenid: this.openid,
            distributorId: s,
            token: n,
            t: (new Date).getTime(),
            memberId: (null == e ? void 0 : e.memberId) || ""
          };
          this.url = ((e, t) => {
            const r = Object.keys(t).map(e => `${e}=${t[e]}`);
            return `${e}${e.split("?").pop().includes("=")?"&":"?"}${r.join("&")}`
          })(a, d), console.log("<webview> {urlAddObjectQuery} result:", {
            originUrl: this.original,
            finallyUrl: this.url
          })
        }
      },
      created() {
        p = t.getStorage("config"), this.user = t.getStorage("user"), this.wxuser = t.getStorage("wxuser")
      },
      onLoad: function(e) {
        l.init(e.click_id), l.report(l.actionTypeEnum.visit, null), setTimeout(() => {
          u("VIEW_CONTENT")
        }, 300), this.pageOption = e, e.url && (o.adaptor.updatePageProperties({
          option_url: e.url
        }), this.original = decodeURIComponent(e.url), -1 != this.original.indexOf("fadada.com") ? this.url = decodeURIComponent(this.original) : -1 != this.original.indexOf("https://mp.weixin.qq.com") ? this.url = this.original : r.getWxUserInfo().then(e => {
          (null == e ? void 0 : e.openid) && (this.openid = e.openid, this.parseUrl())
        })), e.scene && (this.original = decodeURIComponent(e.scene), r.getWxUserInfo().then(e => {
          (null == e ? void 0 : e.openid) && (this.openid = e.openid, this.parseUrl())
        }))
      },
      components: {}
    },
    g = d._export_sfc(h, [
      ["render", function(e, t, r, i, o, s) {
        return {
          a: o.url,
          b: d.o((...e) => s.bindmessage && s.bindmessage(...e)),
          c: d.o((...e) => s.bindload && s.bindload(...e))
        }
      }]
    ]);
  h.__runtimeHooks = 2, wx.createPage(g)
}();