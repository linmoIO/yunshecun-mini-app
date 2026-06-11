! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    a = require("../../utils/api.js"),
    t = require("../../utils/wxuser.js"),
    r = require("../../base/jAlert/jAlert.js"),
    o = require("../../base/channel.js"),
    l = require("../../utils/filter.js"),
    u = require("../../utils/uploadFile.js");
  Math || (i + n)();
  const n = () => "../../components/kfDialog.js",
    i = () => "../../components/coustomHead.js",
    d = e.defineComponent({
      __name: "checkIn",
      setup(n) {
        let i = t.getStorage("config"),
          d = t.getStorage("user");
        e.ref(""), e.ref("");
        let s = e.ref(!1),
          f = e.ref({});
        e.ref(""), e.ref(e.dayjs().format("YYYY-MM-DD")), e.ref(e.dayjs().add(1, "days").format("YYYY-MM-DD"));
        let c = e.ref({}),
          p = e.ref(""),
          h = e.ref(""),
          v = e.ref(""),
          m = e.ref("");
        e.ref();
        let g = e.ref([]);
        const C = e.ref({});
        let y = e.ref({}),
          D = e.reactive({}),
          I = e.ref({}),
          j = e.ref("R"),
          b = e.ref([]),
          L = e.reactive({
            "01": "身份证",
            "02": "临时身份证",
            14: "护照",
            21: "港澳通行证"
          });
        e.ref(80);
        const M = e.ref({});
        let E = e.ref(o.defaultChannel),
          V = e.ref();
        const G = () => {
            e.index.chooseImage({
              count: 1,
              sizeType: ["original", "compressed"],
              sourceType: ["camera"],
              success: function(e) {
                var a = e.tempFilePaths;
                R(a)
              },
              fail(e) {
                console.log("err", e)
              }
            })
          },
          R = t => {
            u.uploadFile({
              file: {
                path: t.toString()
              },
              unitCode: i.hotelGroupCode,
              fileType: "IMAGE",
              point: {
                system: "DSPLAT",
                page: "MOBILE_CHECKIN",
                position: "MOBILE_CHECKIN_FACE",
                bizRelObject: "MOBILE_CHECKIN",
                bizRelObjectId: d.memberId
              }
            }).then(t => {
              if (e.index.hideLoading(), 1 != t.success) return r.jAlert3("上传失败~"), !1;
              (t => {
                e.index.showLoading({
                  title: "验证中..."
                });
                var o = {
                  hotelCode: f.value.hotelCode,
                  hotelGroupCode: i.hotelGroupCode,
                  picture: t,
                  teamNo: p.value,
                  certInfo: {
                    reusing: c.value.authId,
                    certNum: c.value.idNo
                  }
                };
                a.api.guestCheck(o).then(a => {
                  e.index.hideLoading(), 1 == a.result && 1 == a.retVal.code ? e.index.navigateTo({
                    url: "/pagesD/mobileCheckIn/checkInSucceed?type=success"
                  }) : r.jAlert3(a.msg || a.retVal.msg)
                }).finally(() => {})
              })(t.url)
            })
          },
          T = () => {
            e.index.showLoading({
              title: "加载中..."
            }), a.api.interfaceTransfer({
              query: {
                mobile: h.value,
                unitCode: i.hotelGroupCode
              },
              config: {
                interfaceType: "GET",
                interfaceModule: "GC_TRAVEL_ORDER",
                interfaceMethod: "/api/team/order/detail/" + p.value,
                interfaceFrom: "GC",
                hotelGroupCode: i.hotelGroupCode
              }
            }).then(a => {
              1 == a.result && 0 == a.retVal.result && (D = a.retVal.retVal, y.value = D.reserveOrders[0], I.value = D.teamOrder, b.value = D.teamItineraryInfos[0].teamItineraries, I.value.dayDiff = e.dayjs().diff(I.value.beginDate, "day"), I.value.dayEndDiff = e.dayjs(I.value.endDate).diff(e.dayjs(), "day"), b.value.forEach(a => {
                a.bizDateF = e.dayjs(I.value.beginDate).add(a.dayNum - 1, "day").format("M月D日"), a.moon = e.dayjs(I.value.beginDate).add(a.dayNum - 1, "day").format("M"), a.days = e.dayjs(I.value.beginDate).add(a.dayNum - 1, "day").format("D"), a.teamRsvSrcs.forEach(a => {
                  a.arrDateF = e.dayjs(a.arrDate).format("M月D日"), a.depDateF = e.dayjs(a.depDate).format("M月D日"), g.value.push(a)
                })
              }), I.value.tripTime = `${e.dayjs(I.value.beginDate).format("M月DD日")}-${e.dayjs(I.value.endDate).format("M月DD日")}`, c.value = D.teamItineraryInfos[0].guests.find(e => e.mobile == h.value), c.value.authId ? s.value = !0 : s.value = !1, x())
            }).finally(() => {
              e.index.hideLoading()
            })
          },
          x = () => {
            var e = {
              fromDate: "",
              toDate: "",
              otaChannel: "WECHAT",
              hotelGroupCodes: i.hotelGroupCode,
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
              appid: i.appid,
              componentAppid: i.componentAppid,
              memberNo: "",
              hotelCodes: v.value
            };
            a.api.findHotel(e).then(e => {
              1 == e.result && (g.value.forEach(a => {
                e.retVal.resultInfos.forEach(e => {
                  a.hotelCode == e.code && (a.extraLogo = e.extraLogo, a.phone = e.phone, a.pictures = e.pictures, a.hotelLatitude = e.hotelLatitude, a.hotelLongitude = e.hotelLongitude)
                })
              }), C.value = g.value.find(e => e.hotelCode == v.value))
            }).catch((function(e) {
              console.log(e)
            })).finally((function(e) {
              f.value = C.value
            }))
          },
          N = () => {
            a.api.interfaceTransfer({
              query: {
                teamNo: p.value,
                mobile: h.value,
                hotelCode: v.value,
                arr: e.dayjs().format("YYYY-MM-DD")
              },
              config: {
                interfaceType: "GET",
                interfaceModule: "GC_TRAVEL_ORDER",
                interfaceMethod: "/api/reserve/order/queryIsCheckIn",
                interfaceFrom: "GC",
                hotelGroupCode: i.hotelGroupCode
              }
            }).then(e => {
              if (1 == e.result && 0 == e.retVal.result && e.retVal.retVal.length > 0) {
                let a = e.retVal.retVal.find(e => e.mobile == h.value);
                j.value = a.isCheckIn
              }
            })
          };
        return e.onLoad(e => {
          if (a.api.advertisementPage({
              hotelCode: f.value.hotelCode,
              hotelGroupCode: i.hotelGroupCode,
              clientTypes: E.value,
              firstResult: 0,
              pageSize: 10
            }).then(e => {
              0 == e.result && e.retVal && e.retVal.datas && e.retVal.datas.length > 0 && e.retVal.datas.forEach(e => {
                "2" == e.showLocation && (M.value = JSON.parse(e.infos))
              })
            }), e.mobile && (h.value = e.mobile, p.value = e.teamNo, v.value = t.getStorage("checkHotelCode"), T()), e.scene) {
            const a = decodeURIComponent(e.scene);
            m.value = a
          }
        }), e.onMounted(() => {
          "" != m.value ? (e => {
            if ("" != m.value) {
              var t = {
                scene: m.value,
                appid: i.appid
              };
              a.api.getWxacodeParams(t).then(a => {
                if (1 == a.result) {
                  var t = JSON.parse(a.retVal.value);
                  h.value = t.mobile, p.value = t.teamNo, v.value = t.hotelCode
                } else r.jAlert3(a.msg);
                e && e()
              })
            } else e && e()
          })(() => {
            T(), N()
          }) : (T(), N())
        }), (a, t) => e.e({
          a: e.p({
            color: "#fff",
            title: "移动入住"
          }),
          b: e.t(e.unref(f).hotelDesc),
          c: e.t("R" == e.unref(j) ? "未办理入住" : "I" == e.unref(j) ? "已办理入住" : "已离店"),
          d: e.unref(s)
        }, e.unref(s) ? e.e({
          e: e.t(e.unref(c).name),
          f: e.t(e.unref(L)[e.unref(c).idCode]),
          g: e.t(e.unref(l.hideIdCard)(e.unref(c).idNo, e.unref(c).idCode)),
          h: e.t(1 == e.unref(c).sex ? "男" : "女"),
          i: e.t(e.unref(c).birthday),
          j: "R" == e.unref(j) && e.unref(s)
        }, ("R" == e.unref(j) && e.unref(s), {}), {
          k: "I" == e.unref(j)
        }, "I" == e.unref(j) ? e.e({
          l: C.value.phone
        }, C.value.phone ? {
          m: e.t(C.value.phone),
          n: e.o(a => {
            return t = C.value.phone, void e.index.makePhoneCall({
              phoneNumber: t
            });
            var t
          })
        } : {}) : {}) : {
          o: e.unref(f).mobileQrcode
        }, {
          p: "url(" + e.unref(f).extraLogo + "?imageView2/1/w/214/h/160&x-oss-process=image/resize,m_fill,w_214,h_160)",
          q: "R" == e.unref(j) && e.unref(s)
        }, "R" == e.unref(j) && e.unref(s) ? {
          r: e.o(G)
        } : {}, {
          s: e.sr(V, "43c2940e-1", {
            k: "kf"
          }),
          t: e.p({
            title: "一键咨询"
          })
        })
      }
    }),
    s = e._export_sfc(d, [
      ["__scopeId", "data-v-43c2940e"]
    ]);
  wx.createPage(s)
}();