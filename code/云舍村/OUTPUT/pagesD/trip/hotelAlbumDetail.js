! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    r = require("../../utils/api.js"),
    t = require("../../utils/wxuser.js"),
    o = require("../../base/jAlert/jAlert.js");
  Math || (s + n + a + u)();
  const n = () => "../../components/moreText.js",
    a = () => "../../components/empty.js",
    u = () => "../components/v-previewImage.js",
    s = () => "../../components/coustomHead.js",
    l = e.defineComponent({
      __name: "hotelAlbumDetail",
      setup(n) {
        let a = t.getStorage("config"),
          u = e.ref(""),
          s = e.ref(""),
          l = e.ref(""),
          i = e.ref([]),
          c = e.ref(""),
          f = e.ref([]),
          p = e.ref(!0),
          m = e.ref();
        return e.onLoad(e => {
          u.value = decodeURIComponent(e.name), s.value = e.activeType, l.value = e.categoryId
        }), e.onMounted(() => {
          r.api.interfaceTransfer({
            query: {
              unitCode: a.hotelGroupCode,
              categoryName: u.value
            },
            config: {
              interfaceType: "POST",
              interfaceModule: "GC_UCBASE_URL",
              interfaceMethod: "albumCategory/getPhotoListByName",
              interfaceFrom: "GC",
              hotelGroupCode: a.hotelGroupCode
            }
          }).then(e => {
            1 == e.result && 0 == e.retVal.result ? (p.value = !1, i.value = e.retVal.retVal) : o.jAlert3(e.result.msg || e.msg)
          })
        }), (r, t) => e.e({
          a: e.p({
            title: "松赞相册",
            nativeMode: !0
          }),
          b: e.unref(c)
        }, e.unref(c) ? {
          c: e.p({
            content: e.unref(c)
          })
        } : {}, {
          d: e.f(e.unref(i), (r, t, o) => ({
            a: r.photoUrl + "?imageView2/1/w/442/h/442&x-oss-process=image/resize,m_fill,w_442,h_442",
            b: t,
            c: e.o(t => {
              return o = r.photoUrl, n = e.unref(i), f.value = [], n.forEach(e => {
                f.value.push(e.photoUrl)
              }), e.index.previewImage({
                urls: f,
                current: o
              }), void e.nextTick$1(() => {
                m.value.open(o)
              });
              var o, n
            }, t)
          })),
          e: 0 == e.unref(i).length && !e.unref(p)
        }, 0 != e.unref(i).length || e.unref(p) ? {} : {
          f: e.p({
            tips: "暂无图片"
          })
        }, {
          g: e.sr(m, "18c46e82-3", {
            k: "previewImageBox"
          }),
          h: e.p({
            urls: e.unref(f)
          })
        })
      }
    }),
    i = e._export_sfc(l, [
      ["__scopeId", "data-v-18c46e82"]
    ]);
  wx.createPage(i)
}();