! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    t = require("../utils/utils.js"),
    a = require("../utils/api.js"),
    r = require("../utils/wxuser.js"),
    n = require("../base/channel.js");
  let s = r.getStorage("config");
  const i = e.defineComponent({
      name: "bannerSwiper",
      props: {
        adBoxStyle: {
          type: String,
          default: () => ""
        },
        showLocation: {
          type: String,
          default: () => ""
        }
      },
      setup(r, i) {
        let o = e.ref([]),
          l = e.ref(0),
          d = e.ref(n.defaultChannel);
        const g = () => {
          a.api.advertisementPage({
            hotelCode: s.hotelCode,
            hotelGroupCode: s.hotelGroupCode,
            showLocation: r.showLocation,
            clientTypes: d.value,
            firstResult: 0,
            pageSize: 10
          }).then(e => {
            if (0 == e.result && e.retVal && e.retVal.datas && e.retVal.datas.length > 0) {
              let t = JSON.parse(e.retVal.datas[0].infos);
              o.value = t
            }
          })
        };
        return e.onMounted(() => {
          g()
        }), {
          advertisementPage: g,
          adList: o,
          swiperChange: e => {
            l.value = e.target.current
          },
          swiperCurrent: l,
          goPage: t.goPage,
          channel: d
        }
      }
    }),
    o = e._export_sfc(i, [
      ["render", function(t, a, r, n, s, i) {
        return e.e({
          a: t.adList.length > 0
        }, t.adList.length > 0 ? e.e({
          b: t.adList.length > 1
        }, t.adList.length > 1 ? {
          c: e.f(t.adList, (a, r, n) => ({
            a: a.imgUrl,
            b: e.o(e => t.goPage(a.link), r),
            c: r
          })),
          d: e.o((...e) => t.swiperChange && t.swiperChange(...e)),
          e: e.f(t.adList, (e, a, r) => ({
            a: a == t.swiperCurrent ? 1 : "",
            b: a
          }))
        } : {}, {
          f: 1 == t.adList.length
        }, 1 == t.adList.length ? {
          g: e.f(t.adList, (a, r, n) => ({
            a: a.imgUrl,
            b: e.o(e => t.goPage(a.link), r),
            c: r
          }))
        } : {}, {
          h: e.s(t.adBoxStyle)
        }) : {})
      }],
      ["__scopeId", "data-v-7c671b43"]
    ]);
  wx.createComponent(o)
}();