! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/api.js"),
    i = require("../../base/jAlert/jAlert.js"),
    o = require("../../utils/wxuser.js"),
    r = require("../../utils/index.js"),
    s = require("../../utils/user.js");
  var a = {};
  const n = {
    components: {
      imgCode: () => "../../components/imgCode.js",
      Alert: () => "../../components/Alert.js",
      bottomDialog: () => "../../components/bottomDialog.js"
    },
    data: () => ({
      inviteMemberId: "",
      wxuser: o.getStorage("wxuser"),
      user: o.getStorage("user"),
      pageData: {},
      steps: [],
      postering: !1,
      isTap: !1,
      isGetVerify: !1,
      phone: "",
      verifyId: "",
      ysmState: !0,
      timeOut: 60,
      interVal: 0,
      errMsg: "",
      id: "",
      ruleCode: "",
      headimgurl: "",
      userData: {},
      canGive: !1,
      scene: ""
    }),
    props: {},
    watch: {
      timeOut: function(e) {
        0 == e && (clearInterval(this.interVal), this.isGetVerify = !1, this.timeOut = 60, this.isTap = !1)
      }
    },
    onLoad: function(e) {
      if (a = o.getStorage("config"), this.id = e.id, this.ruleCode = e.ruleCode, this.inviteMemberId = e.memberId, this.headimgurl = e.headimgurl, this.cardNo = e.cardNo, e.scene) {
        const t = decodeURIComponent(e.scene);
        this.scene = t
      }
    },
    mounted() {
      "" != this.scene ? this.getWxacodeParams(() => {
        this.getData()
      }) : this.getData()
    },
    methods: {
      getWxacodeParams(e) {
        if ("" != this.scene) {
          var o = {
            scene: this.scene,
            appid: a.appid
          };
          t.api.getWxacodeParams(o).then(t => {
            if (1 == t.result) try {
              var o = t.retVal.value;
              console.log(o, "这是扫码跳转读取的参数");
              const e = e => {
                let t = o.split("&");
                for (let i = 0; i < t.length; i++) {
                  let o = t[i].split("=");
                  if (o[0] == e) return o[1]
                }
                return !1
              };
              this.id = e("id"), this.ruleCode = e("ruleCode"), this.inviteMemberId = e("memberId"), this.headimgurl = e("headimgurl"), this.cardNo = e("cardNo")
            } catch (e) {
              console.log(e)
            } else i.jAlert3(t.msg);
            e && e()
          })
        } else e && e()
      },
      onRegister() {
        console.log(this.user), this.user && this.user.memberId ? e.index.reLaunch({
          url: "/pages/member/memberCenter"
        }) : e.index.navigateTo({
          url: `/pages/member/memberLogin?memberId=${this.inviteMemberId}&ruleCode=${this.ruleCode}&YQHYId=${this.id}&canGive=${this.canGive?"T":"F"}`
        })
      },
      verifyPost() {
        return !this.isTap && (this.isTap = !1, this.phone ? /^1[23456789]\d{9}$/.test(this.phone) ? (this.isTap = !1, void(this.ysmState ? (this.$refs.imgCodeComponent.getImgVerify(), this.$refs.imgCodeComponent.showDialog()) : this.isTap = !1)) : (i.jAlert3("请输入正确的手机号"), !1) : (i.jAlert3("请输入手机号"), !1))
      },
      changeTime(e) {
        this.isGetVerify = e.isGetVerify ? e.isGetVerify : this.isGetVerify, this.isTap = e.isTap ? e.isTap : this.isTap, this.ysmState = e.ysmState ? e.ysmState : this.ysmState, this.verifyId = e.verifyId, clearInterval(this.interVal), this.interVal = setInterval(() => {
          this.timeOut--
        }, 1e3)
      },
      loginPost() {
        {
          if (!this.phone) return i.jAlert3("请输入手机号"), !1;
          if (!this.verifyId) return i.jAlert3("请获取验证码"), !1;
          if (!this.verifyCode) return i.jAlert3("请输入验证码"), !1;
          this.errMsg = "";
          var e = this.wxuser;
          const n = {
            mobile: this.phone,
            verifyCode: this.verifyCode,
            openid: e.openid,
            hotelGroupCode: a.hotelGroupCode,
            hotelGroupId: a.hotelGroupId,
            appid: a.appid,
            verifyId: this.verifyId,
            componentAppid: a.componentAppid
          };
          t.api.memberLoginByMobileCode(n).then(async n => {
            if (1 == n.result) this.gobindOpenId(n.retVal), await s.updateUserInfo(n.retVal);
            else {
              if (n.msg.indexOf("未注册") > 0) {
                var d = a.hotelCode ? a.hotelCode : 0,
                  l = "?";
                e && e.sex && (l = e.sex);
                let i = o.getStorage("cardSrc") || "";
                var h = {
                  mobile: this.phone,
                  password: "YXNkMTIzNDU2",
                  sex: l,
                  email: "",
                  name: e.nickName,
                  hotelGroupCode: a.hotelGroupCode,
                  hotelGroupId: a.hotelGroupId,
                  openid: e.openid,
                  hotelCode: d,
                  inviteCode: "",
                  verifyCode: this.verifyCode,
                  verifyId: this.verifyId,
                  appid: a.appid,
                  componentAppid: a.componentAppid,
                  channel: "WECHAT",
                  cardSrc: i,
                  referrerId: this.canGive ? this.inviteMemberId : ""
                };
                t.api.fastRegister({
                  url: r.createUrl(h)
                }).then(async e => {
                  1 == e.result ? (await s.updateUserInfo(e.retVal), this.gobindOpenId(e.retVal)) : this.errMsg = e.msg
                })
              } else i.jAlert3(n.msg), this.ysmState = !0;
              t.api.saveInvitationJSYQRecord({
                ruleCode: this.ruleCode,
                memberId: this.user.memberId,
                YQHYId: this.id,
                hotelCode: a.hotelCode,
                hotelGroupCode: a.hotelGroupCode
              }).then(e => {}).catch(e => {})
            }
          })
        }
      },
      gobindOpenId: function(o, r) {
        var s = this;
        s.setProfile(), s.wxuser && s.wxuser.openid ? t.api.bindOpenId({
          memberId: o.memberId,
          openIdUserId: s.wxuser.openid,
          openIdType: "WEIXIN",
          hotelGroupCode: a.hotelGroupCode,
          hotelGroupId: a.hotelGroupId,
          appid: a.appid,
          componentAppid: a.componentAppid,
          channel: "WECHAT"
        }).then(t => {
          if (1 != t.result || 0 != t.retVal.resultCode) return console.log("openiderror"), i.jAlert3(t.retVal.resultMsg), !1;
          console.log("openid绑定成功ok"), i.jAlert3("登录成功，欢迎回来"), e.index.reLaunch({
            url: "/pages/member/memberCenter"
          })
        }) : (clearInterval(s.interVal), e.index.reLaunch({
          url: "/pages/member/memberCenter"
        }))
      },
      getData() {
        t.api.findInvitationLandConfigByCodeH5({
          ruleCode: this.ruleCode
        }).then(e => {
          0 == e.result ? (console.log(e), this.pageData = e.retVal) : i.jAlert3(e.msg)
        }), t.api.getMemberInfoByCardNo({
          cardNo: this.cardNo,
          hotelGroupCode: a.hotelGroupCode,
          hotelGroupId: "",
          hotelCode: ""
        }).then(e => {
          1 == e.result ? this.userData = e.retVal : i.jAlert3(e.msg)
        }), t.api.ifCanRewardGiveaways({
          hotelCode: a.hotelCode,
          hotelGroupCode: a.hotelGroupCode,
          ruleCode: this.ruleCode,
          memberId: this.user.memberId,
          YQHYId: this.id
        }).then(e => {
          console.log(e), 1 == e.result && (this.canGive = "T" == e.retVal)
        })
      }
    }
  };
  Array || (e.resolveComponent("Alert") + e.resolveComponent("bottom-dialog") + e.resolveComponent("img-code"))();
  const d = e._export_sfc(n, [
    ["render", function(t, i, o, r, s, a) {
      return {
        a: s.headimgurl,
        b: e.t(s.userData.cardLevelDescript),
        c: e.t(s.userData.name),
        d: e.t(s.pageData.landTitle || "邀您体验云舍村"),
        e: e.t(s.pageData.landDetail || "即刻注册云舍村会员，开启您的第一次云舍村行程！"),
        f: e.o((...e) => a.onRegister && a.onRegister(...e)),
        g: e.p({
          tips: s.errMsg
        }),
        h: s.phone,
        i: e.o(e => s.phone = e.detail.value),
        j: e.t(s.isGetVerify ? "重新获取" + s.timeOut + "s" : "获取验证码"),
        k: e.o((...e) => a.verifyPost && a.verifyPost(...e)),
        l: s.isGetVerify ? 1 : "",
        m: t.verifyCode,
        n: e.o(e => t.verifyCode = e.detail.value),
        o: e.o((...e) => a.loginPost && a.loginPost(...e)),
        p: e.sr("mobileLoginComponent", "b685e1e6-0"),
        q: e.p({
          title: "手机号登录"
        }),
        r: e.sr("imgCodeComponent", "b685e1e6-2"),
        s: e.o(a.changeTime),
        t: e.p({
          ysmState: s.ysmState,
          phone: s.phone,
          isTap: s.isTap,
          isGetVerify: s.isGetVerify,
          timeOut: s.timeOut
        }),
        v: s.pageData && s.pageData.landLogo ? `url(${s.pageData.landLogo})` : "url(https://website-10049437.cos.ap-shanghai.myqcloud.com/86cc97b5-d975-4a43-8918-f1c5caea4e24)"
      }
    }],
    ["__scopeId", "data-v-b685e1e6"]
  ]);
  wx.createPage(d)
}();