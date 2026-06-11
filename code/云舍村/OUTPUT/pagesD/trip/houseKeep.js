! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/api.js"),
    r = require("../../base/jAlert/jAlert.js"),
    o = require("../../utils/utils.js"),
    n = require("../../utils/getMemberUI.js"),
    a = require("../../utils/wxuser.js");
  Math || (u + i + s)();
  const u = () => "../../components/coustomHead.js",
    i = () => "../../components/swiperBox.js",
    s = () => "../../components/moreText.js",
    l = e.defineComponent({
      __name: "houseKeep",
      setup(u) {
        let i = a.getStorage("config"),
          s = e.ref(""),
          l = e.ref({}),
          c = e.reactive({
            indicatorDots: !1,
            autoplay: !1,
            dotPosStyle: "left: 50%;transform: translateX(-50%);bottom:12px;"
          }),
          f = e.ref([]),
          m = e.reactive([]);
        return e.onLoad(e => {
          if (e.code && (s.value = e.code), e.scene) {
            let t = o.getUrlParams(decodeURIComponent(decodeURIComponent(e.scene)));
            t.code && (s.value = t.code)
          }
        }), e.onMounted(() => {
          t.api.interfaceTransfer({
            query: {
              code: s.value,
              unitCode: i.hotelGroupCode
            },
            config: {
              interfaceType: "GET",
              interfaceModule: "GC_PRODUCT_CBD",
              interfaceMethod: "api/driverButler/queryResume",
              interfaceFrom: "GC",
              hotelGroupCode: i.hotelGroupCode
            }
          }).then(e => {
            if (1 == e.result && 0 == e.retVal.result) {
              l.value = e.retVal.retVal, f.value = l.value.commentList, f.value.forEach(e => {
                e.headImg = n.getMemberUI(e.memberLevel).defaultHeadImg
              });
              let t = {
                imgUrl: l.value.mainPic
              };
              m.push(t)
            } else r.jAlert3(e.retVal.msg || e.msg)
          })
        }), (t, r) => e.e({
          a: e.p({
            color: "#fff"
          }),
          b: e.unref(m).length > 0
        }, e.unref(m).length > 0 ? {
          c: e.p({
            slides: e.unref(m),
            swiperConfig: e.unref(c)
          }),
          d: e.t(e.unref(l).name),
          e: e.o(t => {
            return r = e.unref(l).mobile, void e.index.makePhoneCall({
              phoneNumber: r
            });
            var r
          })
        } : {}, {
          f: e.t(e.unref(l).nation),
          g: e.t(e.unref(l).speciality),
          h: e.unref(l).biographicalNotes
        }, e.unref(l).biographicalNotes ? {
          i: e.p({
            content: e.unref(l).biographicalNotes
          })
        } : {}, {
          j: e.f(e.unref(f), (t, r, o) => ({
            a: t.headImg,
            b: e.t(t.memberLevelDesc),
            c: "70b82410-3-" + o,
            d: e.p({
              content: t.commentContent
            }),
            e: r
          }))
        })
      }
    }),
    c = e._export_sfc(l, [
      ["__scopeId", "data-v-70b82410"]
    ]);
  wx.createPage(c)
}();