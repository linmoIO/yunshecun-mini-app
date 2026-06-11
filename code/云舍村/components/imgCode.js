! function() {
  "use strict";
  const e = require("../utils/api.js"),
    i = require("../base/jAlert/jAlert.js"),
    t = require("../utils/index.js"),
    o = require("../utils/wxuser.js"),
    s = require("../common/vendor.js");
  var d = {};
  const r = {
      data: () => ({
        dialogState: !1,
        path: "",
        sessionId: "",
        imgVerifyCode: ""
      }),
      props: ["ysmState", "phone", "isTap", "isGetVerify", "timeOut"],
      methods: {
        async getVerifyCodeNew() {
          var t = this;
          let o = await e.api.verifyIdentifyCode({
            sessionId: t.sessionId,
            identifyCode: t.imgVerifyCode,
            ifSendSms: "T",
            mobile: t.phone,
            hotelGroupCode: d.hotelGroupCode,
            hotelGroupId: d.hotelGroupId,
            hotelCode: d.hotelCode,
            hotelId: d.hotelId || ""
          });
          1 == o.result ? (i.jAlert3("获取验证码成功"), t.hideDialog(), this.$emit("change-time", {
            isGetVerify: !0,
            isTap: !0,
            ysmState: !1,
            verifyId: o.retVal
          }), this.imgVerifyCode = "") : (t.getImgVerify(), i.jAlert3(o.msg))
        },
        async getImgVerify() {
          this.sessionId = t.genSessionId(24);
          let i = await e.api.verifyCode({
            sessionId: this.sessionId
          });
          this.sessionId = i.retVal.sessionId, this.path = i.retVal.path
        },
        showDialog() {
          this.dialogState = !this.dialogState
        },
        hideDialog() {
          this.dialogState = !this.dialogState
        }
      },
      mounted() {
        this.imgVerifyCode = "", this.getImgVerify()
      },
      created() {
        d = o.getStorage("config")
      }
    },
    a = s._export_sfc(r, [
      ["render", function(e, i, t, o, d, r) {
        return {
          a: d.dialogState,
          b: s.o(e => r.hideDialog()),
          c: s.o((...e) => r.hideDialog && r.hideDialog(...e)),
          d: d.imgVerifyCode,
          e: s.o(e => d.imgVerifyCode = e.detail.value),
          f: d.path,
          g: s.o((...e) => r.getImgVerify && r.getImgVerify(...e)),
          h: s.o((...e) => r.getVerifyCodeNew && r.getVerifyCodeNew(...e)),
          i: d.dialogState
        }
      }],
      ["__scopeId", "data-v-36e5643e"]
    ]);
  wx.createComponent(a)
}();