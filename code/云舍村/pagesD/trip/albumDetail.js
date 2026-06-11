! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/api.js"),
    o = require("../../utils/wxuser.js"),
    r = require("../../base/jAlert/jAlert.js");
  Math || (u + a + n)();
  const a = () => "../../components/moreText.js",
    n = () => "../components/v-previewImage.js",
    u = () => "../../components/coustomHead.js",
    l = e.defineComponent({
      __name: "albumDetail",
      setup(a) {
        let n = o.getStorage("config"),
          u = e.ref(""),
          l = e.ref(""),
          i = e.ref(""),
          s = e.ref([]),
          c = e.ref(""),
          p = e.ref([]),
          f = e.ref("");
        const d = e.ref();
        return e.onLoad(e => {
          u.value = decodeURIComponent(e.name), l.value = e.activeType, i.value = e.categoryId, f.value = e.teamNo
        }), e.onMounted(() => {
          var e;
          "hotel" == l.value ? (e = {
            fromDate: "",
            toDate: "",
            otaChannel: "WECHAT",
            hotelGroupCodes: n.hotelGroupCode,
            cardLevel: "",
            hasPriceMin: "T",
            clientLatitude: "",
            clientLongitude: "",
            position: "",
            positionValue: "",
            keyWord: "",
            radius: "",
            pageSize: 999,
            firstResult: 0,
            cardType: "",
            appid: n.appid,
            componentAppid: n.componentAppid,
            memberNo: ""
          }, t.api.findHotel(e).then(e => {
            1 == e.result && e.retVal.resultInfos.forEach(e => {
              e.descript == u.value && (c.value = e.htmlInfo)
            })
          }).catch((function(e) {
            console.log(e)
          }))) : t.api.interfaceTransfer({
            query: {
              unitCode: n.hotelGroupCode,
              activityName: u.value
            },
            config: {
              interfaceType: "GET",
              interfaceModule: "GC_ACTIVITIES_CENTER",
              interfaceMethod: "api/activity/getOneActivityIntroduce",
              interfaceFrom: "GC",
              hotelGroupCode: n.hotelGroupCode
            }
          }).then(e => {
            1 == e.result && 0 == e.retVal.result ? c.value = e.retVal.retVal.introduce : r.jAlert3(e.result.msg || e.msg)
          }), t.api.interfaceTransfer({
            query: {
              unitCode: n.hotelGroupCode,
              categoryId: i.value,
              teamNo: f.value
            },
            config: {
              interfaceType: "GET",
              interfaceModule: "GC_UCBASE_URL",
              interfaceMethod: "albumCategory/photoByRemark",
              interfaceFrom: "GC",
              hotelGroupCode: n.hotelGroupCode
            }
          }).then(e => {
            1 == e.result && 0 == e.retVal.result ? e.retVal.retVal.forEach(e => {
              e.name == u.value && (s.value = e.albumPhotos)
            }) : r.jAlert3(e.result.msg || e.msg)
          })
        }), (t, o) => e.e({
          a: e.p({
            title: "云舍村相册",
            nativeMode: !0
          }),
          b: e.t(e.unref(u)),
          c: e.unref(c)
        }, e.unref(c) ? {
          d: e.p({
            content: e.unref(c)
          })
        } : {}, {
          e: e.f(e.unref(s), (t, o, r) => ({
            a: t.photoUrl + "?imageView2/1/w/332/h/290&x-oss-process=image/resize,m_fill,w_333,h_290",
            b: o,
            c: e.o(o => {
              return r = t.photoUrl, a = e.unref(s), p.value = [], a.forEach(e => {
                p.value.push(e.photoUrl)
              }), void e.nextTick$1(() => {
                d.value.open(r)
              });
              var r, a
            }, o)
          })),
          f: e.sr(d, "771d1761-2", {
            k: "previewImageBox"
          }),
          g: e.p({
            urls: e.unref(p)
          })
        })
      }
    }),
    i = e._export_sfc(l, [
      ["__scopeId", "data-v-771d1761"]
    ]);
  wx.createPage(i)
}();