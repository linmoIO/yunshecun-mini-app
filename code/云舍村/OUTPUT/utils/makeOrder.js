! function() {
  "use strict";
  const e = require("./wxuser.js");
  exports.makeOrder = function(o) {
    var a = {
      bookOrderInfoRQ: Object.assign({
        arr: o.arriveTime ? o.fromDate + " " + o.arriveTime + ":00" : o.fromDate + " 18:00:00",
        dep: o.depTime ? `${o.toDate} ${o.depTime}` : o.toDate + " 12:00:00",
        hotelCode: o.hotelCode || "",
        srcHotelGroupCode: o.srcHotelGroupCode || o.hotelGroupCode,
        ticketOrderInfo: {
          startDate: o.fromDate + " 00:00:00",
          endDate: o.toDate + " 00:00:00",
          rateSum: 0,
          ticketSum: 0,
          otherSum: 0
        },
        memberNo: o.memberNo ? o.memberNo : "",
        cardLevel: o.cardLevel ? o.cardLevel : "",
        cardType: o.cardType ? o.cardType : "",
        openId: o.openid ? o.openid : "",
        guests: o.checkInGuests,
        remark: o.remark,
        rsvMan: o.rsvMan,
        mobile: o.mobile,
        contactName: o.contactName,
        contactMobile: o.contactMobile,
        rmNum: o.rmNum ? o.rmNum : "1",
        gcDistributorId: o.distributorId || "",
        memberId: o.memberId || "",
        payMethod: o.payMethod || "",
        hotelGroupCode: o.hotelGroupCode,
        otaChannel: o.otaChannel || "WECHAT",
        ota: o.otaChannel || "WECHAT",
        channel: o.otaChannel || "WECHAT",
        appid: o.appid || "",
        componentAppid: o.componentAppid || "",
        productCode: o.productCode,
        productType: o.productType || "",
        hotelId: "",
        ticketUseDay: o.ticketUseDay,
        companyDesc: o.companyDesc || "",
        companyCode: o.companyCode || "",
        salesMan: o.salesMan || "",
        salesName: o.salesName || "",
        rsvManNo: o.rsvManNo || "",
        rsvManName: o.rsvManName || "",
        amenities: o.amenities || "",
        serviceCouponDetailCodes: o.serviceCouponDetailCodes || "",
        rsvClass: o.rsvClass || "F",
        meetingType: o.meetingType || "",
        isPointDed: o.isPointDed || "",
        moneyDed: o.moneyDed || "",
        pointDed: o.pointDed || ""
      }, {
        couponDetailCodes: o.couponDetailCodes || ""
      }),
      hotelCode: o.hotelCode,
      hotelGroupCode: o.hotelGroupCode,
      srcHotelGroupCode: o.srcHotelGroupCode || o.hotelGroupCode,
      otaChannel: o.otaChannel || "WECHAT",
      channel: o.channel || "WECHAT",
      clientChannel: o.clientChannel,
      domain: o.domain ? o.domain : "",
      productCode: o.productCode,
      productType: o.productType || "",
      hotelGroupId: o.hotelGroupId || "",
      formId: o.formId || "",
      appid: o.appid || "",
      componentAppid: o.componentAppid || "",
      packageParam: o.packageParam || "",
      original: "",
      categorySub: o.categorySub || "",
      productChannel: o.productChannel || "",
      companyCode: o.companyCode || "",
      companyDesc: o.companyDesc || "",
      couponBatchSaleParam: o.couponBatchSaleParam || "",
      products: o.products || [],
      isBuyOnBehalf: o.isBuyOnBehalf || "",
      sourceActivityId: o.sourceActivityId || "",
      sourceActivityName: o.sourceActivityName || "",
      utm_params: o.utm_params || ""
    };
    a.productChannel || (delete a.categorySub, delete a.productChannel);
    let t = e.getStorage("staticFrom") || "";
    return t && (a.original = t), console.log(JSON.stringify(a)), a
  }
}();