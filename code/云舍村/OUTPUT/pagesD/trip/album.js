! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/api.js"),
    a = require("../../utils/utils.js"),
    l = require("../../utils/wxuser.js"),
    o = require("../../base/jAlert/jAlert.js");
  Array || e.resolveComponent("FloatButtonKf")(), Math || (i + n + u + r)();
  const r = () => "../components/v-previewImage.js",
    u = () => "../../components/empty.js",
    n = () => "../../components/tabs.js",
    i = () => "../../components/coustomHead.js",
    s = e.defineComponent({
      __name: "album",
      setup(r) {
        let u = l.getStorage("config"),
          n = e.ref([{
            name: "个人相册",
            active: !0,
            categoryId: "-1",
            id: 0
          }]),
          i = e.ref(""),
          s = e.ref(""),
          v = e.ref("");
        const c = e.ref(),
          m = e.ref(!1),
          f = e.ref(-1),
          p = e.ref(0),
          h = e.ref(""),
          d = e.ref([]),
          g = e.ref([]),
          C = e.ref(""),
          y = (t, a) => {
            i.value = [], a.forEach(e => {
              i.value.push(e.photoUrl)
            }), e.nextTick$1(() => {
              c.value.open(t)
            })
          },
          G = e => {
            let a = "FOREVER";
            1 == e && (a = "SEVEN"), t.api.interfaceTransfer({
              query: {
                teamNo: s.value,
                guestId: v.value,
                saveTime: a,
                teamEndTime: l.getStorage("teamInfo").teamEndTime
              },
              config: {
                interfaceType: "GET",
                interfaceModule: "GC_UCBASE_URL",
                interfaceMethod: "albumPhoto/setSaveTime",
                interfaceFrom: "GC",
                hotelGroupCode: u.hotelGroupCode
              }
            }).then(t => {
              m.value = !1, 1 == t.result && 0 == t.retVal.result ? (f.value = e, o.jAlert3("设置成功")) : o.jAlert3(t.result.msg || t.msg)
            })
          },
          T = t => {
            t != f.value && (m.value || (m.value = !0, 1 == t ? e.index.showModal({
              title: "确认调整保留时间",
              content: "行程结束7天到期后相册内容会永久删除",
              cancelText: "返回",
              confirmText: "确认",
              confirmColor: "#000000",
              success: e => {
                e.confirm ? G(t) : m.value = !1
              }
            }) : G(t)))
          },
          _ = (e, a) => {
            var l;
            n.value.forEach(e => {
              e.active = !1
            }), n.value[a].active = !0, p.value = a, C.value = n.value[a].categoryId, "酒店相册" == n.value[a].name && (h.value = "hotel"), "活动相册" == n.value[a].name && (h.value = "activity"), 0 != a && (l = n.value[a].categoryId, t.api.interfaceTransfer({
              query: {
                unitCode: u.hotelGroupCode,
                categoryId: l,
                teamNo: s.value
              },
              config: {
                interfaceType: "GET",
                interfaceModule: "GC_UCBASE_URL",
                interfaceMethod: "albumCategory/photoByRemark",
                interfaceFrom: "GC",
                hotelGroupCode: u.hotelGroupCode
              }
            }).then(e => {
              m.value = !1, 1 == e.result && 0 == e.retVal.result ? (g.value = [], g.value = e.retVal.retVal) : o.jAlert3(e.result.msg || e.msg)
            }))
          };
        return e.onMounted(() => {
          t.api.interfaceTransfer({
            query: {
              unitCode: u.hotelGroupCode,
              teamNo: s.value
            },
            config: {
              interfaceType: "GET",
              interfaceModule: "GC_UCBASE_URL",
              interfaceMethod: "albumCategory/listRootCategory",
              interfaceFrom: "GC",
              hotelGroupCode: u.hotelGroupCode
            }
          }).then(e => {
            1 == e.result && 0 == e.retVal.result ? n.value = n.value.concat(e.retVal.retVal) : o.jAlert3(e.result.msg || e.msg)
          }), t.api.interfaceTransfer({
            query: {
              teamNo: s.value,
              guestId: v.value
            },
            config: {
              interfaceType: "GET",
              interfaceModule: "GC_UCBASE_URL",
              interfaceMethod: "albumPhoto/listPrivate",
              interfaceFrom: "GC",
              hotelGroupCode: u.hotelGroupCode
            }
          }).then(e => {
            1 == e.result && 0 == e.retVal.result ? (d.value = e.retVal.retVal.albumPhotos, "FOREVER" == e.retVal.retVal.saveTime ? f.value = 0 : f.value = 1) : o.jAlert3(e.result.msg || e.msg)
          })
        }), e.onLoad(e => {
          s.value = e.teamNo, v.value = e.guestId
        }), (t, l) => e.e({
          a: e.p({
            title: "松赞相册",
            nativeMode: !0
          }),
          b: e.unref(n).length > 1
        }, e.unref(n).length > 1 ? {
          c: e.o(_),
          d: e.p({
            datas: e.unref(n),
            type: "line",
            color: "#A43127",
            titleInactiveColor: "#808080",
            titleActiveColor: "#000000",
            fullWidth: !0
          })
        } : {}, {
          e: 0 == p.value
        }, 0 == p.value ? e.e({
          f: 0 == f.value ? 1 : "",
          g: e.o(e => T(0)),
          h: 1 == f.value ? 1 : "",
          i: e.o(e => T(1)),
          j: 1 == f.value
        }, (f.value, {}), {
          k: e.f(d.value, (t, a, l) => ({
            a: t.photoUrl + "?imageView2/1/w/332/h/332&x-oss-process=image/resize,m_fill,w_332,h_332",
            b: a,
            c: e.o(e => y(t.photoUrl, d.value), a)
          })),
          l: 0 == d.value.length && !m.value
        }, 0 != d.value.length || m.value ? {} : {
          m: e.p({
            tips: "暂无图片"
          })
        }) : e.e({
          n: e.f(g.value, (t, l, o) => ({
            a: e.t(t.name),
            b: e.o(e => (e => {
              let t = `/pagesD/trip/albumDetail?activeType=${h.value}&name=${e.name}&categoryId=${C.value}&teamNo=${s.value}`;
              a.goPage(t)
            })(t), l),
            c: e.f(t.albumPhotos, (a, l, o) => ({
              a: a.photoUrl + "?imageView2/1/w/332/h/332&x-oss-process=image/resize,m_fill,w_332,h_332",
              b: l,
              c: e.o(e => y(a.photoUrl, t.albumPhotos), l)
            })),
            d: l
          })),
          o: 0 == g.value.length && !m.value
        }, 0 != g.value.length || m.value ? {} : {
          p: e.p({
            tips: "暂无图片"
          })
        }), {
          q: e.sr(c, "49f16a63-4", {
            k: "previewImageBox"
          }),
          r: e.p({
            isPrivate: 0 == p.value,
            urls: e.unref(i)
          })
        })
      }
    }),
    v = e._export_sfc(s, [
      ["__scopeId", "data-v-49f16a63"]
    ]);
  wx.createPage(v)
}();