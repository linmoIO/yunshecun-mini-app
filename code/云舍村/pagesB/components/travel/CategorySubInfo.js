! function() {
  "use strict";
  const e = require("../../../common/vendor.js"),
    t = require("../../../hooks/useConfig.js"),
    o = require("../../../utils/api.js");
  Math || r();
  const r = () => "../../../components/bottomDialog.js",
    a = e.defineComponent({
      __name: "CategorySubInfo",
      props: {
        travelType: null,
        customStyle: null
      },
      setup(r) {
        const a = r,
          {
            config: n
          } = t.useConfig(),
          l = e.ref(),
          i = e.ref([]);
        return e.watch(() => a.travelType, e => {
          e && async function() {
            var e, t, r;
            if (a.travelType) try {
              const l = await o.api.interfaceTransfer({
                query: {
                  unitCode: n.hotelGroupCode,
                  travelType: a.travelType
                },
                config: {
                  interfaceType: "GET",
                  interfaceModule: "GC_PRODUCT_JOURNEY",
                  interfaceMethod: "api/itinerary/listHotelItineraryTypeDescs",
                  interfaceFrom: "GC",
                  hotelGroupCode: n.hotelGroupCode
                }
              });
              0 === (null == (e = null == l ? void 0 : l.retVal) ? void 0 : e.result) && (null == (r = null == (t = l.retVal) ? void 0 : t.retVal) ? void 0 : r.length) && (i.value = l.retVal.retVal)
            } catch (e) {
              console.error(e)
            }
          }()
        }, {
          immediate: !0
        }), (t, o) => ({
          a: e.s(r.customStyle),
          b: e.o(() => l.value.showDialog()),
          c: e.f(i.value, (t, o, r) => ({
            a: e.t(t.dictionaryDesc),
            b: e.t(t.travelTypeDesc),
            c: "info-" + o
          })),
          d: e.sr(l, "8ad38c1e-0", {
            k: "categorySubInfoLayer"
          }),
          e: e.p({
            title: "类型说明",
            maxDialog: !0,
            "custom-wrap-style": "background-color: white;"
          })
        })
      }
    }),
    n = e._export_sfc(a, [
      ["__scopeId", "data-v-8ad38c1e"]
    ]);
  wx.createComponent(n)
}();