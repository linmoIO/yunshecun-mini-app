! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    a = require("../../utils/api.js"),
    r = require("../../utils/wxuser.js"),
    t = require("../../base/jAlert/jAlert.js");
  Math || l();
  const l = () => "../../components/coustomHead.js",
    i = e.defineComponent({
      __name: "travelersInfo",
      setup(l) {
        let i = r.getStorage("config"),
          n = r.getStorage("user");
        const u = e.ref("add"),
          o = e.ref("");
        let d = e.dayjs().format("YYYY-MM-DD"),
          s = e.ref(""),
          f = e.ref(1),
          m = [{
            value: "1",
            name: "男"
          }, {
            value: "2",
            name: "女"
          }],
          p = [{
            name: "身份证",
            value: "01"
          }, {
            name: "临时身份证",
            value: "02"
          }, {
            name: "护照",
            value: "14"
          }, {
            name: "港澳通行证",
            value: "21"
          }],
          h = e.reactive({
            name: "",
            idCode: "",
            idNo: "",
            sex: "",
            birth: "",
            mobile: "",
            email: "",
            relationship: ""
          }),
          v = e.ref([]);
        var c = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
          C = /(\w{8,10}$)/,
          b = /^[A-Z]\d{6,10}[A-Z0-9]?$/,
          x = /(^[a-zA-Z][0-9]{9}$)|(^\d{8}$)/;
        const F = a => {
          const r = String(a || "").trim().toUpperCase();
          if (!c.test(r) || 18 !== r.length) return 15 === r.length && c.test(r);
          const t = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
            e = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"],
            n = r.slice(0, 17).split("").reduce((e, a, r) => e + Number(a) * t[r], 0);
          return e[n % 11] === r[17]
        };
        let N = e.computed(() => {
          let e = "";
          return m.forEach(a => {
            a.value == h.sex && (e = a.name)
          }), e
        });
        e.watch(() => h.idNo, (e, a) => {
          j()
        }), e.watch(() => h.idCode, (e, a) => {
          j()
        }), e.watch(() => h.relationship, (e, a) => {
          "Self" == e && "T" == n.isRealName && (h.idCode = n.idType, h.name = n.name, h.idNo = n.idNo, h.sex = n.sex, h.birth = n.birth, h.mobile = n.mobile, h.email = n.email)
        });
        let A = e.computed(() => {
            let e = "";
            return p.forEach(a => {
              a.value == h.idCode && (e = a.name)
            }), e
          }),
          g = e.reactive({
            relationshipIndex: 0,
            sexIndex: 0,
            idCodeIndex: 0
          });
        e.watch(() => h, (e, a) => {
          v.value.forEach((e, a) => {
            e.value == h.relationship && (g.relationshipIndex = a)
          }), p.forEach((e, a) => {
            e.value == h.idCode && (g.idCodeIndex = a)
          }), m.forEach((e, a) => {
            e.value == h.sex && (g.sexIndex = a)
          })
        }, {
          deep: !0
        });
        let I = e.computed(() => {
          let e = "";
          return v.value.forEach(a => {
            a.value == h.relationship && (e = a.name)
          }), e
        });
        const j = () => {
            if ("01" != h.idCode) return;
            if (!F(h.idNo)) return;
            const e = h.idNo.substr(6, 4),
              a = h.idNo.substr(10, 2),
              r = h.idNo.substr(12, 2),
              t = parseInt(h.idNo.substr(-2, 1));
            h.sex = t % 2 == 0 ? "2" : "1", h.birth = `${e}-${a}-${r}`
          },
          S = a => {
            e.index.uploadFile({
              url: i.baseUrlmall.replace("/guardian", "") + "/memberapi/guestBase/recognizeIdcard",
              filePath: a.toString(),
              name: "serviceId",
              formData: {
                hotelGroupCode: i.hotelGroupCode,
                hotelCode: i.hotelCode,
                appid: i.appid,
                componentAppid: i.componentAppid,
                filePath: a.toString()
              },
              success: function(a) {
                if (200 != a.statusCode) return t.jAlert3("身份证识别失败，请手动填写"), !1;
                var r = JSON.parse(a.data);
                if (1 != r.result) return t.jAlert3("身份证识别失败，请手动填写"), !1;
                h.name = r.retVal.data.face.data.name, h.idNo = r.retVal.data.face.data.idNumber, "男" == r.retVal.data.face.data.sex ? h.sex = "1" : h.sex = "2", h.idCode = "01", h.birth = e.dayjs(r.retVal.data.face.data.birthDate.replace("年", "-").replace("月", "-").replace("日", "")).format("YYYY-MM-DD")
              },
              fail: function(e) {
                t.jAlert3("身份证识别失败，请手动填写")
              }
            })
          },
          T = e => {
            const a = e.detail.value,
              r = v.value[a].value;
            h.relationship = r
          },
          R = e => {
            const a = e.detail.value,
              r = p[a].value;
            h.idCode = r
          },
          E = e => {
            const a = e.detail.value,
              r = m[a].value;
            h.sex = r
          },
          y = e => {
            let a = e.detail.value;
            h.birth = a
          },
          V = a => {
            var r = f.value;
            a && (r = 2), "Self" == h.relationship ? e.index.navigateTo({
              url: `/pagesA/member/travelPreference?type=member&guestId=${a}&mode=${u.value}&delta=${r}`
            }) : e.index.navigateTo({
              url: `/pagesA/member/travelPreference?type=guest&guestId=${a}&mode=${u.value}&delta=${r}`
            })
          },
          M = () => {
            if (!h.relationship) return t.jAlert3("请选择与本人的关系"), !1;
            if (!h.name) return t.jAlert3("请输入姓名"), !1;
            if (!h.idCode) return t.jAlert3("请选择证件类型"), !1;
            if (!h.idNo) return t.jAlert3("请输入证件号"), !1;
            if (!h.sex) return t.jAlert3("请选择性别"), !1;
            if (!h.birth) return t.jAlert3("请选择出生日期"), !1;
            if ("01" == h.idCode || "02" == h.idCode) {
              if (!F(h.idNo)) return t.jAlert3("请输入正确的证件号"), !1
            } else if ("14" == h.idCode) {
              if (!C.test(h.idNo)) return t.jAlert3("请输入正确的证件号"), !1
            } else if ("21" == h.idCode && !b.test(h.idNo)) return t.jAlert3("请输入正确的证件号"), !1;
            if (!/^1\d{10}$/.test(h.mobile))
              if (s.value) {
                if (e.dayjs(s.value).diff(h.birth, "year") >= 18) return t.jAlert3("请输入正确的手机号码"), !1
              } else if (e.dayjs().diff(h.birth, "year") >= 18) return t.jAlert3("请输入正确的手机号码"), !1;
            let r = n.memberId.toString().padStart(20, "0");
            var l = {
              extraIdno: h.idNo,
              extraIdcode: h.idCode,
              linkMemberId: r,
              hotelGroupCode: i.hotelGroupCode,
              extraName: h.name,
              extraMobile: h.mobile,
              extraEmail: h.email,
              extraBirth: h.birth,
              relationship: h.relationship,
              campSex: h.sex,
              channel: "WECHAT"
            };
            o.value ? (l.guestId = o.value, a.api.saveMemberGuestLinkRelation(l).then(a => {
              1 == a.result ? 0 == a.retVal.result ? "edit" == u.value ? (t.jAlert3("修改成功"), e.index.navigateBack({
                delta: 1
              })) : V(o.value) : t.jAlert3(a.retVal.msg) : t.jAlert3(a.msg)
            })) : a.api.saveMemberGuestLinkRelation(l).then(e => {
              1 == e.result ? 0 == e.retVal.result ? (o.value = e.retVal.retVal, V(e.retVal.retVal)) : t.jAlert3(e.retVal.msg) : t.jAlert3(e.msg)
            })
          };
        return e.onLoad(e => {
          e.delta && (f.value = e.delta), e.endDate && (s.value = e.type), e.type && (u.value = e.type), e.id && (o.value = e.id)
        }), e.onMounted(() => {
          a.api.listGuestLinkExtraInfoWithMemberIdOrOpenId({
            channel: "WECHAT",
            hotelGroupCode: i.hotelGroupCode,
            hotelCode: i.hotelCode,
            memberId: n.memberId,
            openIdType: "WECHAT"
          }).then(e => {
            if (1 == e.result && 0 == e.retVal.result) {
              let a = !1;
              e.retVal.retVal.length && e.retVal.retVal.forEach(e => {
                e.guestLinkRelationExtraSimpleDtoList.forEach(a => {
                  "EXTRA_IDCODE" == a.type && (e.idCode = a.value), "EXTRA_IDNO" == a.type && (e.idNo = a.value), "CAMP_SEX" == a.type && (e.sex = a.value), "EXTRA_EMAIL" == a.type && (e.email = a.value), "EXTRA_MOBILE" == a.type && (e.mobile = a.value), "EXTRA_NAME" == a.type && (e.name = a.value), "EXTRA_BIRTH" == a.type && (e.birth = a.value)
                }), "edit" == u.value && e.guestId == o.value && (h = Object.assign(h, e)), "Self" == e.relationship && (a = !0)
              }), a && "Self" != h.relationship ? v.value = [{
                name: "父母",
                value: "Parent"
              }, {
                name: "夫妻",
                value: "Spouse"
              }, {
                name: "子女",
                value: "Child"
              }, {
                name: "朋友",
                value: "Friend"
              }, {
                name: "其他",
                value: "Other"
              }] : v.value = [{
                name: "本人",
                value: "Self"
              }, {
                name: "父母",
                value: "Parent"
              }, {
                name: "夫妻",
                value: "Spouse"
              }, {
                name: "子女",
                value: "Child"
              }, {
                name: "朋友",
                value: "Friend"
              }, {
                name: "其他",
                value: "Other"
              }]
            }
          }), "edit" == u.value && e.index.setNavigationBarTitle({
            title: "编辑出行人"
          })
        }), (r, l) => {
          return e.e({
            a: e.p({
              title: "edit" == u.value ? "编辑出行人" : "新增出行人",
              nativeMode: !0
            }),
            b: e.o(a => {
              e.index.chooseImage({
                count: 1,
                sizeType: ["original", "compressed"],
                sourceType: ["album", "camera"],
                success: function(e) {
                  var a = e.tempFilePaths;
                  S(a)
                }
              })
            }),
            c: e.unref(h).relationship
          }, e.unref(h).relationship ? {
            d: e.t(e.unref(I))
          } : {}, {
            e: e.unref(g).relationshipIndex,
            f: e.unref(v),
            g: e.o(T),
            h: "Self" == e.unref(h).relationship && "T" == e.unref(n).isRealName ? 1 : "",
            i: "Self" == e.unref(h).relationship && "T" == e.unref(n).isRealName,
            j: e.unref(h).name,
            k: e.o(a => e.unref(h).name = a.detail.value),
            l: "Self" != e.unref(h).relationship
          }, (e.unref(h).relationship, {}), {
            m: e.unref(h).idCode
          }, e.unref(h).idCode ? {
            n: e.t(e.unref(A))
          } : {}, {
            o: e.unref(g).idCodeIndex,
            p: e.unref(p),
            q: e.o(R),
            r: "Self" == e.unref(h).relationship && "T" == e.unref(n).isRealName ? 1 : "",
            s: "Self" == e.unref(h).relationship && "T" == e.unref(n).isRealName,
            t: e.unref(h).idNo,
            v: e.o(a => e.unref(h).idNo = a.detail.value),
            w: e.unref(h).sex
          }, e.unref(h).sex ? {
            x: e.t(e.unref(N))
          } : e.e({
            y: "01" == e.unref(h).idCode
          }, (e.unref(h).idCode, {})), {
            z: !("01" == e.unref(h).idCode || "Self" == e.unref(h).relationship && "T" == e.unref(n).isRealName)
          }, ("01" == e.unref(h).idCode || "Self" == e.unref(h).relationship && e.unref(n).isRealName, {}), {
            A: "01" == e.unref(h).idCode || "Self" == e.unref(h).relationship && "T" == e.unref(n).isRealName ? 1 : "",
            B: e.unref(g).sexIndex,
            C: e.unref(m),
            D: e.o(E),
            E: "01" == e.unref(h).idCode || "Self" == e.unref(h).relationship && "T" == e.unref(n).isRealName,
            F: e.unref(h).birth
          }, e.unref(h).birth ? {
            G: e.t((s = e.unref(h).birth, e.dayjs(s).format("YYYY-MM-DD")))
          } : e.e({
            H: "01" == e.unref(h).idCode
          }, (e.unref(h).idCode, {})), {
            I: !("01" == e.unref(h).idCode || "Self" == e.unref(h).relationship && "T" == e.unref(n).isRealName)
          }, ("01" == e.unref(h).idCode || "Self" == e.unref(h).relationship && e.unref(n).isRealName, {}), {
            J: "01" == e.unref(h).idCode || "Self" == e.unref(h).relationship && "T" == e.unref(n).isRealName ? 1 : "",
            K: e.unref(h).birth,
            L: e.unref("1900-01-01"),
            M: e.unref(d),
            N: "01" == e.unref(h).idCode || "Self" == e.unref(h).relationship && "T" == e.unref(n).isRealName,
            O: e.o(y),
            P: "Self" == e.unref(h).relationship && "T" == e.unref(n).isRealName ? 1 : "",
            Q: "Self" == e.unref(h).relationship && "T" == e.unref(n).isRealName,
            R: e.unref(h).mobile,
            S: e.o(a => e.unref(h).mobile = a.detail.value),
            T: "Self" == e.unref(h).relationship && "T" == e.unref(n).isRealName ? 1 : "",
            U: "Self" == e.unref(h).relationship && "T" == e.unref(n).isRealName,
            V: e.unref(h).email,
            W: e.o(a => e.unref(h).email = a.detail.value),
            X: "edit" == u.value
          }, "edit" == u.value ? {
            Y: e.o(e => V(o.value))
          } : {}, {
            Z: "edit" == u.value
          }, "edit" == u.value ? {
            aa: e.o(e => M()),
            ab: e.o(r => {
              a.api.deleteGuestLinkRelation({
                hotelGroupCode: i.hotelGroupCode,
                hotelCode: i.hotelCode,
                memberId: n.memberId,
                guestId: o.value
              }).then(a => {
                0 == a.retVal.result ? (t.jAlert3("删除成功"), e.index.navigateBack({
                  delta: 1
                })) : t.jAlert3(a.msg || a.retVal.msg)
              })
            })
          } : {
            ac: e.o(e => M())
          });
          var s
        }
      }
    }),
    n = e._export_sfc(i, [
      ["__scopeId", "data-v-adac4bb5"]
    ]);
  wx.createPage(n)
}();
