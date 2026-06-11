! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/api.js"),
    r = require("../../utils/wxuser.js");
  Math || o();
  const o = () => "../../components/coustomHead.js",
    a = e.defineComponent({
      __name: "questionDetail",
      setup(o) {
        let a = r.getStorage("config"),
          n = e.ref(""),
          i = e.ref({});
        return e.onLoad(e => {
          n.value = e.problemCode
        }), e.onMounted(() => {
          t.api.interfaceTransfer({
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
            1 == e.result && 0 == e.retVal.result && e.retVal.retVal.forEach(e => {
              e.problemCode == n.value && (i.value = e)
            })
          })
        }), (t, r) => ({
          a: e.p({
            title: "问题详情",
            nativeMode: "true"
          }),
          b: e.t(e.unref(i).title),
          c: e.t(e.unref(i).answer)
        })
      }
    }),
    n = e._export_sfc(a, [
      ["__scopeId", "data-v-7a04867b"]
    ]);
  wx.createPage(n)
}();