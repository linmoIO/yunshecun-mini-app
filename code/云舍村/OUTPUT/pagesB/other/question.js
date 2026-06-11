! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = require("../../utils/api.js"),
    t = require("../../utils/wxuser.js"),
    r = require("../../utils/utils.js");
  Array || e.resolveComponent("FloatButtonKf")(), Math || (n + l + a)();
  const l = () => "../../components/tabs.js",
    a = () => "../../components/kfDialog.js",
    n = () => "../../components/coustomHead.js",
    u = e.defineComponent({
      __name: "question",
      setup(l) {
        let a = t.getStorage("config"),
          n = e.reactive([{
            id: "all",
            name: "全部"
          }]);
        const u = e.ref();
        let i = e.ref(!1),
          s = e.ref(""),
          f = e.ref([]),
          p = e.ref("all");
        const c = e => {
          p.value = e.id
        };
        let d = e.computed(() => {
          let e = [];
          return "all" != p.value ? f.value.forEach(o => {
            o.oneLevelType == p.value && e.push(o)
          }) : e = f.value, e
        });
        return e.onLoad(e => {
          e.type && (s.value = e.type)
        }), e.onMounted(() => {
          o.api.interfaceTransfer({
            query: {
              isHalts: "F",
              unitCode: a.hotelGroupCode
            },
            config: {
              interfaceType: "POST",
              interfaceModule: "GC_PRODUCT_JOURNEY",
              interfaceMethod: "/api/itinerary/listTravelProblem",
              interfaceFrom: "GC",
              hotelGroupCode: a.hotelGroupCode
            }
          }).then(e => {
            if (i.value = !0, 1 == e.result && 0 == e.retVal.result) {
              let o = [];
              if (s.value) {
                let r = t.getStorage("problemDtos");
                e.retVal.retVal.forEach(e => {
                  r.forEach(t => {
                    e.problemCode == t.problemCode && o.push(e)
                  })
                })
              } else o = e.retVal.retVal;
              f.value = [], f.value = o, o.forEach(e => {
                if (e.oneLevelType) {
                  let o = !0;
                  n.forEach(t => {
                    e.oneLevelType == t.id && (o = !1)
                  }), o && n.push({
                    id: e.oneLevelType,
                    name: e.oneLevelTypeDesc
                  })
                }
              })
            }
          })
        }), (o, t) => e.e({
          a: e.p({
            title: "常见问题",
            nativeMode: "true"
          }),
          b: e.unref(i)
        }, e.unref(i) ? {
          c: e.o(c),
          d: e.p({
            datas: e.unref(n),
            type: "fk",
            borderColor: "#eee",
            borderActiveColor: "#A43127",
            titleInactiveColor: "#000000",
            color: "#000000"
          })
        } : {}, {
          e: e.f(e.unref(d), (o, t, l) => ({
            a: e.t(o.title),
            b: e.t(o.answer),
            c: t,
            d: e.o(t => e.unref(r.goPage)("/pagesB/other/questionDetail?problemCode=" + o.problemCode), t)
          })),
          f: e.sr(u, "af273841-2", {
            k: "kf"
          }),
          g: e.p({
            title: "联系客服"
          })
        })
      }
    }),
    i = e._export_sfc(u, [
      ["__scopeId", "data-v-af273841"]
    ]);
  wx.createPage(i)
}();