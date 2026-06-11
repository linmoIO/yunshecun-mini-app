! function() {
  "use strict";
  Object.defineProperty(exports, Symbol.toStringTag, {
    value: "Module"
  });
  const e = require("./common/vendor.js"),
    r = require("./utils/api.js"),
    t = require("./utils/log.js"),
    o = require("./utils/routingIntercept.js"),
    n = require("./utils/umengAdaptor.js"),
    a = require("./utils/user.js"),
    s = require("./utils/utils.js"),
    i = require("./utils/wxuser.js"),
    c = require("./hooks/useAdReport.js"),
    l = require("./utils/channelLinkParse.js"),
    p = require("./utils/qdTracker.js"),
    u = require("./utils/aplus.js");
  Math;
  const d = e.defineComponent({
      __name: "App",
      setup(u) {
        const d = i.getStorage("config"),
          h = c.useAdReport();

        function g() {
          const e = i.getStorage("user");
          n.adaptor.sendEvent("$$_user_profile", {
            phone_number: e.mobile,
            is_vip: "是",
            vip_level: e.cardLevelDescript,
            vip_number: e.cardId,
            vip_card_bumber: e.cardNo,
            vip_first_channel: e.cardSrcDescript || ""
          }, "OTHER"), n.adaptor.appendGlobalProperties({
            phone_number: e.mobile,
            is_vip: "是",
            vip_level: e.cardLevelDescript,
            vip_number: e.cardId,
            vip_card_bumber: e.cardNo,
            vip_first_channel: e.cardSrcDescript || ""
          })
        }

        function m() {
          p.qdTracker.setData({
            current_page() {
              var e;
              const r = getCurrentPages();
              return null == (e = r[r.length - 1]) ? void 0 : e.route
            },
            previous_page() {
              var e;
              const r = getCurrentPages();
              return r.length > 1 ? null == (e = r[r.length - 2]) ? void 0 : e.route : void 0
            }
          })
        }
        return e.onPageNotFound(() => {
          e.index.redirectTo({
            url: "/pages/travel/preIndex"
          })
        }), e.onLaunch(c => {
          t.log.info("<App> {onLaunch} options:", c), [{
            family: "Montserrat",
            source: "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/font/Montserrat-Regular.otf"
          }, {
            family: "Source Han Serif CN",
            source: "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/font/SourceHanSerifCN-SemiBold.otf"
          }].forEach(r => {
            e.index.loadFontFace({
              family: r.family,
              global: !0,
              source: `url("${r.source}")`,
              success(e) {
                console.log(e)
              },
              fail(e) {
                console.log(e)
              }
            })
          }), h("PAGE_SHOW", {
            query: null == c ? void 0 : c.query
          }), console.log("App Launch"), o.routingIntercept();
          const l = i.getStorage("user");
          (null == l ? void 0 : l.memberId) ? (s.refreshMemberInfo(() => {
            g()
          }), function() {
            const e = i.getStorage("user");
            r.api.interfaceTransfer({
              config: {
                interfaceFrom: "member",
                interfaceMethod: "/crm/v2/queryMemberProduction",
                hotelGroupCode: d.hotelGroupCode,
                interfaceType: "POST"
              },
              query: {
                channel: "WECHAT",
                hotelGroupCode: d.hotelGroupCode,
                cardId: e.cardId,
                returnFirstProduction: "T"
              }
            }).then(e => {
              1 === e.result && 0 === e.retVal.result && e.retVal.retVal.datas.length > 0 && (n.adaptor.sendEvent("$$_user_profile", {
                vip_first_order_channel: e.retVal.retVal.datas[0].channelDes
              }, "OTHER"), n.adaptor.appendGlobalProperties({
                vip_first_order_channel: e.retVal.retVal.datas[0].channelDes
              }))
            })
          }()) : n.adaptor.appendGlobalProperties({
            vip_first_channel: i.getStorage("cardSrc") || ""
          }), a.getWxUserInfo().then(() => {
            "T" !== i.getStorage("isOpenH5Refresh") && function() {
              const e = i.getStorage("wxuser");
              r.api.memberLoginOpen({
                hotelCode: d.hotelCode,
                hotelGroupCode: d.hotelGroupCode,
                hotelGroupId: d.hotelGroupId,
                openid: null == e ? void 0 : e.openid,
                appid: d.appid,
                componentAppid: d.componentAppid
              }).then(async e => {
                1 === e.result ? (await a.updateUserInfo(e.retVal), g()) : i.setStorage("user", "")
              })
            }()
          });
          const u = e.index.getLaunchOptionsSync();
          console.log("launchOption", u), u.query && u.query.partnerId && i.setStorage("partnerId", u.query.partnerId), u.query && u.query.cardSrc && i.setStorage("cardSrc", u.query.cardSrc), p.qdTracker.setData({
              cardSrc: i.getStorage("cardSrc") || ""
            }),
            function() {
              try {
                const r = e.index.getUpdateManager();
                r.onCheckForUpdate(t => {
                  t.hasUpdate && r.onUpdateReady(() => {
                    e.index.showModal({
                      title: "更新提示",
                      content: "新版本已经准备好，是否重启应用?",
                      success(e) {
                        e.confirm && r.applyUpdate()
                      }
                    })
                  })
                })
              } catch (e) {}
            }(),
            function() {
              const e = {
                appid: d.appid,
                codes: ["isOpenH5Refresh", "wmOrderListUrl", "wmCardListUrl"].join(","),
                componentAppid: d.componentAppid,
                hotelCode: d.hotelCode ? d.hotelCode : 0,
                hotelGroupCode: d.hotelGroupCode,
                clientType: "wechat_mini"
              };
              r.api.getMultiSysOptionCommon(e).then(e => {
                1 === e.result && e.retVal.forEach(e => {
                  "isOpenH5Refresh" === e.code && e.value && i.setStorage("isOpenH5Refresh", e.value), "wmOrderListUrl" === e.code && e.value && i.setStorage("wmOrderListUrl", e.value), "wmCardListUrl" === e.code && e.value && i.setStorage("wmCardListUrl", e.value)
                })
              })
            }()
        }), e.onShow(e => {
          console.warn("onShow: options:", e), i.removeStorage("navList"), console.warn("App Show"), m();
          try {
            l.channelLinkParse(e)
          } catch (e) {
            console.error("🚀 ~ error:", e)
          }
        }), e.onHide(() => {
          console.log("App Hide"), m()
        }), () => {}
      }
    }),
    h = () => "./components/new/FloatButtonKf.js";

  function g() {
    const r = e.createSSRApp(d);
    r.component("FloatButtonKf", h);
    const t = e.createPinia();
    r.use(t);
    const o = {};
    return o.qdTracker = p.qdTracker, r.mixin(p.QDTMixin), {
      app: r,
      globalData: o
    }
  }
  u.init(), p.qdTracker.init(), g().app.mount("#app"), exports.createApp = g
}();