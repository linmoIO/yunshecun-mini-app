! function() {
  "use strict";
  const e = require("../common/vendor.js"),
    a = require("../utils/wxuser.js"),
    r = require("../utils/api.js"),
    o = require("../base/jAlert/jAlert.js");
  let t = a.getStorage("config");
  const l = e.defineComponent({
    name: "destinationBox",
    props: {
      datas: {
        type: Array,
        default: () => []
      },
      dictionaryCode: {
        type: String,
        default: () => ""
      },
      isAutoChooseCity: {
        type: Boolean,
        default: () => !0
      }
    },
    components: {
      searchInput: () => "./searchInput.js",
      collapse: () => "./collapse.js"
    },
    setup(l, i) {
      let s = e.ref(""),
        c = e.ref([]),
        n = e.ref({}),
        u = e.ref([]),
        d = e.ref(""),
        p = e.ref(!1);
      const h = () => {
          s.value = a.getStorage("myMallSearch"), s.value && (u.value = u.value.concat(s.value.split(",")))
        },
        v = () => {
          r.api.interfaceTransfer({
            query: {
              unitCode: t.hotelGroupCode,
              minProgramDisplay: "F"
            },
            config: {
              interfaceType: "GET",
              interfaceModule: "GC_PRODUCT_JOURNEY",
              interfaceMethod: "/api/itinerary/listTravelSeriesDestinationDto",
              interfaceFrom: "GC",
              hotelGroupCode: t.hotelGroupCode
            }
          }).then(e => {
            var r, o;
            if (console.log(e), 1 == e.result && (null == (o = null == (r = e.retVal) ? void 0 : r.retVal) ? void 0 : o.length) > 0) {
              let r = {};
              c.value = [], n.value = e.retVal.retVal, e.retVal.retVal.forEach(e => {
                e.dictionaryDtos.forEach(o => {
                  o.totalprovinceDesc = e.provinceDesc, c.value.push(o), r.dictionaryCode || (r = o), !l.dictionaryCode && a.getStorage("searchHis") && a.getStorage("searchHis").dictionaryCode == o.dictionaryCode && (r = o), l.dictionaryCode && l.dictionaryCode == o.dictionaryCode && (r = o)
                })
              }), l.isAutoChooseCity && i.emit("search", r)
            }
          })
        },
        y = e.computed(() => {
          let a = e.ref([]);
          return d.value && (a.value = c.value.filter(e => {
            if (-1 != e.dictionaryDesc.indexOf(d.value)) {
              var a = new RegExp(d.value, "gi");
              return e.dictionary = e.dictionaryDesc.replace(a, '<span style="color: #A43127;">$&</span>'), e
            }
          })), a.value
        });
      return e.onMounted(() => {
        h(), v()
      }), {
        mySearch: s,
        mySearchGroup: u,
        search: e => {
          if (console.log(e), !e || !e.dictionaryCode) {
            for (var r in n.value) {
              var o = n.value[r];
              o.forEach(a => {
                a.dictionaryDesc == d.value && (e = o)
              })
            }
            e && e.dictionaryCode || (e = {
              dictionaryDesc: d.value
            })
          }
          d.value && (u.value.splice(0, 0, d.value), u.value = [...new Set(u.value)], s.value = u.value.join(","), a.setStorage("myMallSearch", s.value), d.value = ""), p.value = !1, a.setStorage("searchHis", e), i.emit("search", e)
        },
        getMysearch: h,
        listTravelDictionary: v,
        searchVal: d,
        delSearch: () => {
          a.removeStorage("myMallSearch"), s.value = "", u.value = [], o.jAlert3("删除成功")
        },
        destList: c,
        resultList: y,
        destinations: n,
        chooseHis: e => {
          d.value = e
        },
        updataHis: () => {
          p.value = !0
        },
        isCollapse: p
      }
    }
  });
  Array || (e.resolveComponent("search-input") + e.resolveComponent("collapse"))();
  const i = e._export_sfc(l, [
    ["render", function(a, r, o, t, l, i) {
      return e.e({
        a: e.o(e => a.searchVal = e),
        b: e.p({
          placeholder: "关键词/城市名",
          modelValue: a.searchVal
        }),
        c: !a.searchVal && a.mySearchGroup.length > 0 && a.isCollapse
      }, !a.searchVal && a.mySearchGroup.length > 0 && a.isCollapse ? {
        d: e.o(e => a.delSearch()),
        e: e.f(a.mySearchGroup, (r, o, t) => ({
          a: e.t(r),
          b: o,
          c: e.o(e => a.chooseHis(r), o)
        })),
        f: e.sr("collapseBox", "1a8e267e-1"),
        g: e.p({
          defaultHeight: "50px"
        })
      } : {}, {
        h: a.searchVal
      }, a.searchVal ? {
        i: e.f(a.resultList, (r, o, t) => ({
          a: r.dictionary,
          b: e.t(r.provinceDesc),
          c: e.t(r.dictionaryDesc),
          d: o,
          e: e.o(e => a.search(r), o)
        })),
        j: e.t(a.searchVal)
      } : {
        k: e.f(a.destinations, (r, o, t) => ({
          a: e.t(r.provinceDesc),
          b: e.f(r.dictionaryDtos, (r, o, t) => e.e({
            a: e.t(r.dictionaryDesc),
            b: "T" == r.isPopular
          }, (r.isPopular, {}), {
            c: o,
            d: e.o(e => a.search(r), o)
          })),
          c: o
        }))
      })
    }],
    ["__scopeId", "data-v-1a8e267e"]
  ]);
  wx.createComponent(i)
}();