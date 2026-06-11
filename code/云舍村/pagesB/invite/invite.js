! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../base/jAlert/jAlert.js"),
    o = require("../../utils/api.js"),
    a = require("../../utils/helper.js"),
    r = require("../../utils/utils.js"),
    s = require("../../utils/wxuser.js");
  let i = {};
  const h = {
    components: {
      inviteShareImg: () => "./inviteShareImg.js",
      coustomHead: () => "../../components/coustomHead.js"
    },
    props: {},
    data: () => ({
      wxuser: s.getStorage("wxuser"),
      user: s.getStorage("user"),
      pageData: {},
      steps: [],
      showShare: !1,
      point: "",
      shareUrlParam: "",
      shareInfo: {
        posterImage: "",
        isShow: !1,
        qrCode: ""
      },
      shareData: {
        path: "",
        params: ""
      }
    }),
    watch: {},
    created() {
      i = s.getStorage("config")
    },
    mounted() {
      this.user && this.user.memberId ? this.getData() : r.toLogin()
    },
    onShareAppMessage() {
      return {
        title: "邀您体验云舍村",
        path: "/pagesB/invite/inviteShare?" + this.shareData.params,
        imageUrl: a.shareImageTransfrom(this.pageData.posterImage, "message"),
        success() {},
        fail() {}
      }
    },
    methods: {
      invite() {
        this.getWxacodeUnlimitUrl()
      },
      closePoster() {
        this.showShare = !1
      },
      getData() {
        console.log(this.wxuser, "this.wxuser"), console.log(this.user, "this.user"), e.index.showLoading({
          title: "加载中..."
        }), o.api.memberLoginOpen({
          hotelCode: i.hotelCode,
          hotelGroupCode: i.hotelGroupCode,
          hotelGroupId: i.hotelGroupId,
          memberId: this.user.memberId,
          openid: this.wxuser.openid,
          appid: i.appid,
          componentAppid: i.componentAppid
        }).then(a => {
          if (1 === a.result) {
            console.log(a);
            const r = a.retVal.cardLevel,
              s = a.retVal.cardLevelListOrder,
              h = {
                hotelGroupCode: i.hotelGroupCode,
                hotelCode: i.hotelCode,
                level: r,
                memberId: this.user.memberId,
                memberCardListOrder: s
              };
            o.api.selectInvitationSpoilRules(h).then(a => {
              if (console.log(a), 1 === a.result) {
                this.pageData = a.retVal[0] || {}, this.steps = this.pageData ? this.pageData.invitationStep : [];
                const r = {
                  hotelCode: i.hotelCode,
                  hotelGroupCode: i.hotelGroupCode,
                  ruleCode: this.pageData.ruleCode,
                  memberId: this.user.memberId,
                  cardListOrder: s
                };
                o.api.saveInvitationYQHYRecord(r).then(a => {
                  if (console.log(a), 1 === a.result) {
                    const t = a.retVal;
                    this.shareData.path = "pagesB/invite/inviteShare", this.shareData.params = `id=${t}&ruleCode=${this.pageData.ruleCode}&memberId=${this.user.memberId}&headimgurl=${this.wxuser.avatarUrl}&cardNo=${this.user.cardNo}`, setTimeout(() => {
                      this.shareInfo = {
                        posterImage: this.pageData.posterImage,
                        isShow: !1
                      }, console.log(this.shareInfo), e.index.hideLoading()
                    }, 500), this.user.memberId && o.api.interfaceTransfer({
                      config: {
                        interfaceFrom: "member",
                        interfaceMethod: "/crm/v2/getMemberPromotionCount",
                        hotelGroupCode: i.hotelGroupCode,
                        interfaceType: "POST"
                      },
                      query: {
                        hotelCode: i.hotelCode,
                        hotelGroupCode: i.hotelGroupCode,
                        channel: "WECHAT",
                        memberId: this.user.memberId,
                        cardId: this.user.cardId
                      }
                    }).then(e => {
                      this.point = e.retVal.retVal.totalPoint || "0"
                    })
                  } else t.jAlert3(a.msg), e.index.hideLoading()
                })
              } else t.jAlert3(a.msg), e.index.hideLoading()
            })
          } else t.jAlert3(a.msg), e.index.hideLoading()
        })
      },
      getWxacodeUnlimitUrl() {
        e.index.showLoading({
          title: "图片生成中..."
        }), console.log(this.shareData.params, "this.shareData.params");
        const a = s.getStorage("config"),
          r = {
            appid: a.appid,
            componentAppid: a.componentAppid,
            line_color_g: 0,
            page: this.shareData.path,
            param: this.shareData.params,
            width: 500,
            line_color_b: 0,
            auto_color: !1,
            scene: Math.random().toString(36).substring(2),
            is_hyaline: !0,
            line_color_r: 0,
            env_version: "trial"
          };
        o.api.getWxacodeUnlimitUrl(r).then(o => {
          1 === o.result ? setTimeout(() => {
            this.shareInfo = {
              posterImage: this.pageData.posterImage,
              qrCode: o.retVal.imageUrl,
              isShow: !0
            }, console.log(this.shareInfo), this.showShare = !0, e.index.hideLoading()
          }, 400) : (e.index.hideLoading(), t.jAlert3(o.msg))
        })
      }
    }
  };
  Array || (e.resolveComponent("coustom-head") + e.resolveComponent("inviteShareImg"))();
  const n = e._export_sfc(h, [
    ["render", function(t, o, a, r, s, i) {
      return e.e({
        a: e.p({
          title: "",
          color: "#fff"
        }),
        b: e.t(s.pageData.actTitle || "邀好友来云舍村"),
        c: e.t(s.pageData.actDetail),
        d: e.f(s.steps, (t, o, a) => e.e({
          a: t.pic,
          b: e.t(t.name),
          c: o < s.steps.length - 1
        }, (s.steps.length, {}), {
          d: o
        })),
        e: e.o((...e) => i.invite && i.invite(...e)),
        f: e.t(s.pageData.canInvitationLottery),
        g: e.t(s.point),
        h: s.showShare
      }, s.showShare ? {
        i: e.o(i.closePoster),
        j: e.p({
          "poster-info": s.shareInfo
        })
      } : {}, {
        k: s.pageData && s.pageData.logo ? `url(${s.pageData.logo})` : "url(https://website-10049437.cos.ap-shanghai.myqcloud.com/4cb3ea81-07b1-4ab4-9bc8-f7ff8900d2f7)"
      })
    }],
    ["__scopeId", "data-v-ccedb2bb"]
  ]);
  h.__runtimeHooks = 2, wx.createPage(n)
}();