! function() {
  "use strict";
  const e = require("../utils/request.js"),
    t = "/member-activity-center/";
  exports.getJumpMemberExchangeActivityInfo = (r, o) => e.request.get(t + "api/jump/brand/config", r, {}, {
    newModel: !0,
    showToast: !0,
    ...o
  }), exports.getMemberCardInfo = t => e.request.get("/api/member/membercardInterestDesc.json", t), exports.getMemberExchangeActivityInfo = (r, o) => e.request.get(t + "member/interflow/activity/info", r, {}, {
    newModel: !0,
    showToast: !0,
    ...o
  }), exports.jumpBackJoinMemberExchangeActivity = (r, o) => e.request.post(t + "member/interflow/jump/info", r, {}, {
    newModel: !0,
    showToast: !0,
    ...o
  }), exports.jumpJoinMemberExchangeActivity = r => e.request.post(t + "api/jump/brand/member", r, {}, {
    newModel: !0,
    showToast: !0
  })
}();