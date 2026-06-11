! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/api.js"),
    r = require("../../utils/wxuser.js"),
    o = require("../../utils/filter.js"),
    n = require("../../base/jAlert/jAlert.js");
  Array || e.resolveComponent("FloatButtonKf")(), Math || (i + l)();
  const i = () => "../../components/coustomHead.js",
    l = () => "../../components/empty.js",
    d = e.defineComponent({
      __name: "consultList",
      setup(i) {
        let l = r.getStorage("config"),
          d = r.getStorage("user"),
          a = e.ref(0),
          u = e.ref(15),
          m = e.ref([]);
        const s = () => {
          e.index.showLoading({
            title: "加载中..."
          }), t.api.interfaceTransfer({
            config: {
              interfaceType: "POST",
              interfaceModule: "GC_TRAVEL_ORDER",
              interfaceMethod: "/api/advice/queryAdviceOrderPage",
              interfaceFrom: "GC",
              hotelGroupCode: l.hotelGroupCode
            },
            query: {
              memberId: d.memberId,
              unitCode: l.hotelGroupCode,
              firstResult: a.value,
              pageSize: u.value
            }
          }).then(e => {
            1 == e.result && 0 == e.retVal.result && (a.value = a.value + u.value, m.value = m.value.concat(e.retVal.retVal.datas), console.log(m, "consultList---------"))
          }).finally(() => {
            e.index.hideLoading()
          })
        };
        return e.onReachBottom(() => {
          s()
        }), e.onMounted(() => {
          s()
        }), (t, r) => e.e({
          a: e.p({
            title: "咨询单",
            nativeMode: !0
          }),
          b: e.f(e.unref(m), (t, r, i) => e.e({
            a: e.t(t.modifyDatetime ? t.modifyDatetime : t.createDatetime),
            b: e.t(t.endPlaces),
            c: e.t(e.unref(o.timeDay)(t.startDate)),
            d: e.t(e.unref(o.timeDay)(t.endDate)),
            e: e.t(t.travelDay),
            f: "0" != t.adult && t.adult
          }, "0" != t.adult && t.adult ? {
            g: e.t(t.adult)
          } : {}, {
            h: "0" != t.olderChildren && t.olderChildren
          }, "0" != t.olderChildren && t.olderChildren ? {
            i: e.t(t.olderChildren)
          } : {}, {
            j: "0" != t.middleChildren && t.middleChildren
          }, "0" != t.middleChildren && t.middleChildren ? {
            k: e.t(t.middleChildren)
          } : {}, {
            l: "0" != t.youngerChildren && t.youngerChildren
          }, "0" != t.youngerChildren && t.youngerChildren ? {
            m: e.t(t.youngerChildren)
          } : {}, {
            n: "0" != t.oldNum && t.oldNum
          }, "0" != t.oldNum && t.oldNum ? {
            o: e.t(t.oldNum)
          } : {}, {
            p: "0" != t.hmkNum && t.hmkNum
          }, "0" != t.hmkNum && t.hmkNum ? {
            q: e.t(t.hmkNum)
          } : {}, {
            r: "0" != t.foreignerNum && t.foreignerNum
          }, "0" != t.foreignerNum && t.foreignerNum ? {
            s: e.t(t.foreignerNum)
          } : {}, {
            t: e.t(t.travelPreferences),
            v: e.t(t.otherRemark),
            w: e.t(t.rsvMan),
            x: e.t(t.mobile),
            y: e.t(t.startPlace),
            z: e.t(t.adviceNo),
            A: e.o(r => {
              return o = t.adviceNo, void e.index.setClipboardData({
                data: o,
                success: function() {
                  n.jAlert3("复制成功")
                }
              });
              var o
            }, r),
            B: r
          })),
          c: 0 == e.unref(m).length
        }, 0 == e.unref(m).length ? {
          d: e.p({
            tips: "暂无咨询单",
            subTips: "松赞，期待与您相遇。"
          })
        } : {})
      }
    }),
    a = e._export_sfc(d, [
      ["__scopeId", "data-v-51e00b20"]
    ]);
  wx.createPage(a)
}();