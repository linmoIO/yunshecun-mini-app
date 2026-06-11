! function() {
  "use strict";
  const c = {
    spinWhite: "spin-white.svg",
    spinBlack: "spin-black.svg",
    netError: "net-error.png",
    leave: "illustration-leave.png",
    homeMemberCardBg: "home/join-member-card-bg.png",
    empty: "empty.svg",
    adCustomTravel: "ad-custom-travel.png",
    contractConfirm: "contract-confirm.svg",
    icSlideDown: "ic-slide-down.svg",
    icExchange: "ic-exchange.svg",
    icCloseLineRoundBlack: "ic-close-line-round-black.svg",
    icCheckbox: "ic-checkbox.svg",
    icCheckboxChecked: "ic-checkbox-checked.svg",
    icCheckboxDisabled: "ic-checkbox-disabled.svg",
    icProductTravel: "ic-product-travel.svg",
    icProductPackage: "ic-product-package.svg",
    icProductCoupon: "ic-product-coupon.svg",
    icProductHotel: "ic-product-hotel.svg",
    icProductDayActivity: "ic-product-day-activity.svg",
    icNewStar: "ic-new-star.svg",
    icTravelLine: "ic-travel-line.svg",
    icTravelPoint: "ic-travel-point.svg",
    icPayLink: "ic-pay-link.svg",
    icPayScan: "ic-pay-scan.svg",
    icPayWallet: "ic-pay-wallet.svg",
    icPayWeChat: "ic-pay-wechat.svg",
    icPayAli: "ic-pay-ali.svg",
    icRadioDisabled: "ic-radio-disabled.svg",
    icQuestionGray: "ic-question-gray.svg",
    icMessageBell: "ic-message-bell.svg",
    tipsHeaderBg: "travel-assistant/tips-header-bg.png",
    indexBg: "travel-assistant/index-bg.png",
    icPointsTransfer: "ic-points-transfer.svg"
  };
  Reflect.ownKeys(c).forEach(i => {
    Reflect.set(c, i, "https://songtsam-internal-static.oss-cn-chengdu.aliyuncs.com/mobile/assets/" + Reflect.get(c, i))
  }), exports.assets = c
}();