! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    a = require("../../utils/api.js"),
    t = require("../../utils/wxuser.js"),
    r = require("../../base/jAlert/jAlert.js"),
    o = require("../../utils/filter.js"),
    l = require("../../base/channel.js"),
    u = require("../../utils/utils.js"),
    i = require("../../utils/qdTracker.js");
  Math || (d + n + c + s)();
  const n = () => "../../components/pickerAddress.js",
    c = () => "../../components/calendar.js",
    s = () => "../../components/kfDialog.js",
    d = () => "../../components/coustomHead.js",
    f = e.defineComponent({
      __name: "index",
      setup(n) {
        let c = t.getStorage("config"),
          s = t.getStorage("user");
        e.reactive({
          indicatorDots: !1,
          autoplay: !0,
          dotPosStyle: "left: 50%;transform: translateX(-50%);bottom:8px;"
        });
        let d = e.ref(l.defaultActivityChannel),
          f = e.ref(l.defaultConsultChannel),
          v = e.ref("请选择出发地");
        e.ref("Hello");
        let p = e.ref(""),
          h = e.ref(""),
          m = e.ref("");
        e.ref(!1), e.ref(!1);
        let g = e.ref(e.dayjs().format("YYYY-MM-DD")),
          C = e.ref(e.dayjs().add(1, "days").format("YYYY-MM-DD"));
        const y = e.ref();
        let k = e.reactive(t.getStorage("wxuser")),
          T = e.reactive({
            provinceList: [],
            listCodeBaseList: [],
            cityData: [],
            proCheckValue: [],
            checkValue: [],
            provinceData: [],
            selectPlace: []
          }),
          b = e.ref({
            code: "",
            name: "",
            descript: ""
          }),
          D = e.ref({
            code: "",
            descript: ""
          });
        e.ref(80);
        const G = e.ref({
          imgUrl: "",
          title: "",
          subTitle: ""
        });
        let _ = e.ref(0),
          N = e.ref(0),
          V = e.ref(0),
          j = e.ref(0),
          L = e.ref(0),
          I = e.ref(0),
          x = e.ref(0),
          M = e.ref();
        e.ref(l.defaultChannel);
        let O = e.ref();
        const q = e => {
          T.selectPlace = e.data;
          let a = e.data || [];
          v.value = a.join(" "), b.value = T.provinceData.find(e => e.name == a[0]), z(b.value.code)
        };
        e.onShareAppMessage(() => ({
          title: "邀请您填写咨询单",
          path: "/pagesE/consultationForm/index",
          imageUrl: "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/songzan.jpg",
          success: function() {},
          fail: function() {}
        })), e.onShareTimeline(() => ({
          title: "邀请您填写咨询单",
          imageUrl: "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/songzan.jpg"
        }));
        const S = e => {
            switch (!0) {
              case "adult" == e:
                if (_.value <= 0) return !1;
                _.value = _.value - 1;
                break;
              case "daTong" == e:
                if (N.value <= 0) return !1;
                N.value = N.value - 1;
                break;
              case "zhongTong" == e:
                if (V.value <= 0) return !1;
                V.value = V.value - 1;
                break;
              case "xiaoTong" == e:
                if (j.value <= 0) return !1;
                j.value = j.value - 1;
                break;
              case "oldNum" == e:
                if (L.value <= 0) return !1;
                L.value = L.value - 1;
                break;
              case "hmkNum" == e:
                if (I.value <= 0) return !1;
                I.value = I.value - 1;
                break;
              case "foreignerNum" == e:
                if (x.value <= 0) return !1;
                x.value = x.value - 1
            }
          },
          A = e => {
            switch (!0) {
              case "adult" == e:
                _.value = _.value + 1;
                break;
              case "daTong" == e:
                N.value = N.value + 1;
                break;
              case "zhongTong" == e:
                V.value = V.value + 1;
                break;
              case "xiaoTong" == e:
                j.value = j.value + 1;
                break;
              case "oldNum" == e:
                L.value = L.value + 1;
                break;
              case "hmkNum" == e:
                I.value = I.value + 1;
                break;
              case "foreignerNum" == e:
                x.value = x.value + 1
            }
          },
          E = e => {
            g.value = e.checkInDay, C.value = e.checkOutDay
          },
          R = () => {
            y.value.showDialog()
          };
        e.ref(!1);
        const w = () => {
            O.value.showDialog()
          },
          P = () => {
            if (!s || !s.memberId) return void u.toLogin();
            if (!p.value) return r.jAlert3("请输入姓名"), !1;
            if (!h.value) return r.jAlert3("请输入手机号码"), !1;
            if (!/^1[23456789]\d{9}$/.test(h.value)) return r.jAlert3("请输入正确的手机号"), !1;
            let t = [];
            T.provinceList.map(e => {
              e.dictionaryDtos.map(e => {
                e.checked && t.push({
                  placeCode: e.dictionaryCode,
                  placeDesc: e.dictionaryDesc,
                  placeType: "END"
                })
              })
            }), b.value && b.value.code && (console.log(D.value, "currentCity.value--------------"), t.push({
              placeCode: b.value.code + "," + D.value.code,
              placeDesc: b.value.name + "-" + D.value.descript,
              placeType: "START"
            }));
            let o = [];
            T.listCodeBaseList.map(e => {
              e.checked && o.push({
                tagCode: e.code,
                tagName: e.name
              })
            });
            let l = "";
            k && k.openid && (l = k.openid);
            let n = e.reactive({});
            n = {
              openId: l,
              appId: c.appid,
              memberId: s.memberId,
              memberLevel: s.memberLevel,
              memberDesc: s.cardLevelDescript,
              memberNo: s.cardNo,
              guestId: M.value,
              unitCode: c.hotelGroupCode,
              hotelGroupCode: c.hotelGroupCode,
              rsvMan: p.value,
              mobile: h.value,
              startDate: g.value,
              endDate: C.value,
              adult: _.value,
              olderChildren: N.value,
              middleChildren: V.value,
              youngerChildren: j.value,
              oldNum: L.value,
              hmkNum: I.value,
              foreignerNum: x.value,
              placeDtoList: t,
              otherRemark: m.value,
              tagList: o
            }, n.source = "DirectCustomer", n.sourceDesc = "直客", n.customerType = "PERSONAL", n.subSource = "71", n.subSourceDesc = "小程序", e.index.showLoading({
              title: "提交中..."
            }), a.api.interfaceTransfer({
              config: {
                interfaceType: "POST",
                interfaceModule: "GC_TRAVEL_ORDER",
                interfaceMethod: "api/advice/saveOrUpdateAdviceOrder",
                interfaceFrom: "GC",
                hotelGroupCode: c.hotelGroupCode
              },
              query: n
            }).then(a => {
              1 == a.result && 0 == a.retVal.result && (i.qdTracker.track("submit_requirement", {
                begin_date: g.value,
                end_date: C.value,
                destination: (t.map(e => e.placeDesc) || []).join(","),
                adult: _.value,
                big_children: N.value,
                children: V.value,
                baby: j.value,
                expatriate_num: x.value,
                hmk_num: I.value,
                age_gt_sixty: L.value,
                departure_place: v.value
              }), e.index.navigateTo({
                url: "/pagesE/consultationForm/submitSucceed?type=success"
              }))
            }).finally(() => {
              e.index.hideLoading()
            })
          },
          z = e => {
            a.api.interfaceTransfer({
              config: {
                interfaceType: "GET",
                interfaceModule: "GC_INFOMATION_CENTER",
                interfaceMethod: "api/city/listCities",
                interfaceFrom: "GC",
                hotelGroupCode: c.hotelGroupCode
              },
              query: {
                countryCode: "CN",
                provinceCode: e,
                unitCode: c.hotelGroupCode
              }
            }).then(e => {
              if (1 == e.result && 0 == e.retVal.result) {
                T.cityData = e.retVal.retVal;
                let a = e.retVal.retVal.find(e => e.descript == T.selectPlace[1] || e.descript.substr(0, 2) == T.selectPlace[1].substr(0, 2)),
                  t = {
                    code: "NoCity",
                    descript: "无匹配城市"
                  };
                D.value = a || t
              }
            })
          };
        return e.onLoad(e => {
          a.api.advertisementPage({
            hotelCode: c.hotelCode,
            hotelGroupCode: c.hotelGroupCode,
            clientTypes: f.value,
            firstResult: 0,
            pageSize: 999
          }).then(e => {
            0 == e.result && e.retVal && e.retVal.datas && e.retVal.datas.length > 0 && e.retVal.datas.forEach(e => {
              "2" == e.showLocation && (G.value = JSON.parse(e.infos))
            })
          })
        }), e.onMounted(() => {
          setTimeout(() => {
            y.value.init({
              checkInDay: g.value,
              checkOutDay: C.value,
              title: "出行日期",
              isCheckedInTxt: "开始",
              isCheckedOutTxt: "结束"
            })
          }, 500), e.index.showLoading({
            title: "加载中..."
          }), a.api.interfaceTransfer({
            config: {
              interfaceType: "GET",
              interfaceModule: "GC_PRODUCT_JOURNEY",
              interfaceMethod: "api/itinerary/listTravelSeriesDestinationDto",
              interfaceFrom: "GC",
              hotelGroupCode: c.hotelGroupCode
            },
            query: {
              unitCode: c.hotelGroupCode,
              minProgramDisplay: "F"
            }
          }).then(e => {
            1 == e.result && 0 == e.retVal.result && (T.provinceList = e.retVal.retVal)
          }).finally(() => {
            e.index.hideLoading()
          }), a.api.interfaceTransfer({
            config: {
              interfaceType: "GET",
              interfaceModule: "GC_INFOMATION_CENTER",
              interfaceMethod: "api/city/listProvinces",
              interfaceFrom: "GC",
              hotelGroupCode: c.hotelGroupCode
            },
            query: {
              countryCode: "CN",
              unitCode: c.hotelGroupCode
            }
          }).then(a => {
            1 == a.result && 0 == a.retVal.result && (T.provinceData = e.reactive(a.retVal.retVal))
          }), (() => {
            let e = {
              hotelCode: c.hotelCode,
              hotelGroupCode: c.hotelGroupCode,
              firstResult: 0,
              pageSize: 200,
              channel: d.value,
              groupCode: "CXZT"
            };
            a.api.interfaceTransfer({
              config: {
                interfaceFrom: "member",
                interfaceMethod: "crm/v2/querySystemTagConfig",
                hotelGroupCode: c.hotelGroupCode
              },
              query: e
            }).then(e => {
              if (1 == e.result)
                if (0 == e.retVal.result) {
                  let a = e.retVal.retVal.datas;
                  T.listCodeBaseList = a[0].tagList
                } else r.jAlert3(e.retVal.msg);
              else r.jAlert3(e.msg);
              console.log(e)
            })
          })(), a.api.listGuestLinkExtraInfoWithMemberIdOrOpenId({
            channel: d.value,
            hotelGroupCode: c.hotelGroupCode,
            hotelCode: c.hotelCode,
            memberId: s.memberId,
            openIdType: d.value
          }).then(e => {
            1 == e.result && 0 == e.retVal.result && e.retVal.retVal.length && (M.value = e.retVal.retVal[0].guestId)
          })
        }), (a, t) => e.e({
          a: e.p({
            color: "#fff",
            title: ""
          }),
          b: e.t(G.value.title),
          c: e.t(G.value.subTitle),
          d: e.unref(p),
          e: e.o(a => e.isRef(p) ? p.value = a.detail.value : p = a.detail.value),
          f: e.unref(h),
          g: e.o(a => e.isRef(h) ? h.value = a.detail.value : h = a.detail.value),
          h: e.t(e.unref(o.timeDay)(e.unref(g)) + "-" + e.unref(o.timeDay)(e.unref(C))),
          i: e.o(R),
          j: "url(" + G.value.imgUrl + ")",
          k: e.f(e.unref(T).provinceList, (a, t, r) => ({
            a: e.t(a.provinceDesc),
            b: e.f(a.dictionaryDtos, (a, t, r) => ({
              a: a.dictionaryCode,
              b: a.checked,
              c: e.t(a.dictionaryDesc),
              d: e.n(a.checked ? "show_icon" : "hide_icon"),
              e: a.dictionaryCode,
              f: e.n(a.checked ? "option_active item" : "option_default item")
            })),
            c: e.o(e => ((e, a) => {
              for (var t = a, r = e.detail.value, o = 0, l = t.length; o < l; ++o) {
                const e = t[o];
                r.includes(e.dictionaryCode) ? e.checked = !0 : e.checked = !1
              }
              T.proCheckValue = r.sort()
            })(e, a.dictionaryDtos), t),
            d: t
          })),
          l: e.f(e.unref(T).listCodeBaseList, (a, t, r) => ({
            a: a.code,
            b: a.checked,
            c: e.t(a.name),
            d: e.n(a.checked ? "show_icon" : "hide_icon"),
            e: a.code,
            f: e.n(a.checked ? "option_active item" : "option_default item")
          })),
          m: e.o(a => ((e, a) => {
            for (var t = a, r = e.detail.value, o = 0, l = t.length; o < l; ++o) {
              const e = t[o];
              r.includes(e.code) ? e.checked = !0 : e.checked = !1
            }
            T.checkValue = r.sort()
          })(a, e.unref(T).listCodeBaseList)),
          n: e.unref(m),
          o: e.o(a => e.isRef(m) ? m.value = a.detail.value : m = a.detail.value),
          p: e.unref(_) > 0
        }, (e.unref(_), {}), {
          q: e.o(e => S("adult")),
          r: e.t(e.unref(_)),
          s: e.o(e => A("adult")),
          t: e.unref(N) > 0
        }, (e.unref(N), {}), {
          v: e.o(e => S("daTong")),
          w: e.t(e.unref(N)),
          x: e.o(e => A("daTong")),
          y: e.unref(V) > 0
        }, (e.unref(V), {}), {
          z: e.o(e => S("zhongTong")),
          A: e.t(e.unref(V)),
          B: e.o(e => A("zhongTong")),
          C: e.unref(j) > 0
        }, (e.unref(j), {}), {
          D: e.o(e => S("xiaoTong")),
          E: e.t(e.unref(j)),
          F: e.o(e => A("xiaoTong")),
          G: e.unref(L) > 0
        }, (e.unref(L), {}), {
          H: e.o(e => S("oldNum")),
          I: e.t(e.unref(L)),
          J: e.o(e => A("oldNum")),
          K: e.unref(I) > 0
        }, (e.unref(I), {}), {
          L: e.o(e => S("hmkNum")),
          M: e.t(e.unref(I)),
          N: e.o(e => A("hmkNum")),
          O: e.unref(x) > 0
        }, (e.unref(x), {}), {
          P: e.o(e => S("foreignerNum")),
          Q: e.t(e.unref(x)),
          R: e.o(e => A("foreignerNum")),
          S: "请选择出发地" == e.unref(v)
        }, "请选择出发地" == e.unref(v) ? {} : {
          T: e.t(e.unref(v))
        }, {
          U: e.o(q),
          V: e.o(w),
          W: e.o(P),
          X: e.sr(y, "9e1edb21-2", {
            k: "calendarCompent"
          }),
          Y: e.o(E),
          Z: e.p({
            checkInDay: e.unref(g),
            checkOutDay: e.unref(C)
          }),
          aa: e.sr(O, "9e1edb21-3", {
            k: "kf"
          }),
          ab: e.p({
            title: "一键咨询"
          })
        })
      }
    });
  f.__runtimeHooks = 6;
  const v = e._export_sfc(f, [
    ["__scopeId", "data-v-9e1edb21"]
  ]);
  wx.createPage(v)
}();