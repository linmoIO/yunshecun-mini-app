! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    s = require("../../hooks/useScroll.js"),
    o = require("../../utils/utils.js"),
    r = require("../../utils/wxuser.js"),
    t = require("../../utils/qdTracker.js");
  Math || a();
  const a = () => "../../components/coustomHead.js",
    n = "https://songtsam-internal-static.oss-cn-chengdu.aliyuncs.com/mobile/assets/travel-assistant/guide-share-cover.png",
    i = e.defineComponent({
      __name: "guide",
      setup(a) {
        const {
          scrollTop: i,
          onPageScroll: u
        } = s.useScroll(), c = r.getStorage("user"), l = e.ref("");
        u(e => {
          i.value = e.scrollTop
        });
        const m = e.computed(() => c && c.memberId),
          g = () => {
            console.log("体验服务"), console.log(m.value), t.qdTracker.track("user_uide", {
              button_name: "体验行中服务"
            }), e.index.reLaunch({
              url: "/pages/trip/index"
            })
          },
          d = () => {
            m.value ? (t.qdTracker.track("user_uide", {
              button_name: "创建行程计划"
            }), e.index.navigateTo({
              url: "/pagesTravelAssistant/journey/edit"
            })) : o.toLogin({
              redirect_url: "/pagesTravelAssistant/journey/edit"
            })
          };
        return e.onShareAppMessage(e => ({
          imageUrl: n + "?imageView2/1/w/375/h/300&x-oss-process=image/resize,m_fill,w_375,h_300"
        })), e.onShareTimeline(() => ({
          imageUrl: n + "?imageView2/1/w/375/h/300&x-oss-process=image/resize,m_fill,w_375,h_300"
        })), e.onLoad(async e => {
          e.funcName && (l.value = e.funcName)
        }), (s, o) => ({
          a: e.p({
            title: "",
            color: e.unref(i) > 40 ? "#000" : "#fff",
            bgColor: e.unref(i) > 40 ? "#fff" : ""
          }),
          b: e.o(g),
          c: e.o(d)
        })
      }
    });
  i.__runtimeHooks = 7;
  const u = e._export_sfc(i, [
    ["__scopeId", "data-v-438fed38"]
  ]);
  wx.createPage(u)
}();
