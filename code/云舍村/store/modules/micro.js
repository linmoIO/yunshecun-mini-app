'use strict';

const vendor = require('../../common/vendor.js');

const state = {
  memberActivityId: '',
  subscribePopupRecords: {},
  refreshedCouponInfoMap: vendor.ref(new Map()),
};

function useMicroStore() {
  return {
    refreshedCouponInfoMap: state.refreshedCouponInfoMap,
    setMemberActivityId(id) {
      state.memberActivityId = id || '';
    },
    hasShownSubscribePopup(pageId) {
      return !!state.subscribePopupRecords[pageId];
    },
    addSubscribePopupRecord(pageId) {
      if (pageId) state.subscribePopupRecords[pageId] = true;
    },
    refreshCoupon(id, patch = {}) {
      if (!id) return;
      const map = state.refreshedCouponInfoMap.value || new Map();
      map.set(id, { id, isRefresh: true, ...patch });
      state.refreshedCouponInfoMap.value = new Map(map);
    },
  };
}

module.exports = { useMicroStore };
