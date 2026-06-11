! function() {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = require("../../hooks/useStorage.js"),
    r = require("../../services/micro.js"),
    u = require("../../utils/config.js"),
    n = e.defineStore("micro", () => {
      const n = e.ref(),
        s = e.ref(new Map),
        i = e.ref(new Map),
        c = e.ref({}),
        t = o.useStorage("micro_subscribe_popup_record", []);
      return {
        memberActivityId: n,
        setMemberActivityId: function(e) {
          n.value = e
        },
        refreshedCouponInfoMap: i,
        refreshCoupon: async function(e) {
          try {
            s.value.set(e, !0);
            const o = await r.refreshCouponInfo({
              id: e,
              hotelGroupCode: u.config.hotelGroupCode
            });
            i.value.set(e, {
              ...o,
              isRefresh: !0
            })
          } catch (e) {
            console.error("[store] <micro> {refreshCoupon} error:", e)
          } finally {
            s.value.delete(e)
          }
        },
        refreshCouponLoadingMap: s,
        couponBeforeLogin: c,
        setCouponBeforeLogin: function(e) {
          c.value = e
        },
        subscribePopupRecord: t,
        addSubscribePopupRecord: function(e) {
          t.value.includes(e) || (t.value = [e, ...t.value])
        },
        hasShownSubscribePopup: function(e) {
          return t.value.includes(e)
        }
      }
    });
  exports.useMicroStore = n
}();