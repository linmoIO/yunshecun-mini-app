! function() {
  "use strict";

  exports.makeOrder = function(data) {
    data = data || {};
    const guests = data.checkInGuests || data.guests || [];
    const firstGuest = guests[0] || {};
    const rq = {
      ...data,
      fromDate: data.fromDate || data.checkIn || data.arrDateStr || "",
      toDate: data.toDate || data.checkOut || data.depDateStr || "",
      guests,
      checkInGuests: guests,
      rsvMan: data.rsvMan || data.contactName || firstGuest.name || "",
      mobile: data.mobile || data.contactMobile || firstGuest.mobile || "",
      rmNum: Number(data.rmNum || data.rooms || 1),
      hotelCode: data.hotelCode || data.miniHotelCode || "",
      productCode: data.productCode || data.roomCode || "",
      rateCode: data.rateCode || data.productCode || data.roomCode || "",
      rmtype: data.rmtype || data.roomCode || data.productCode || ""
    };

    return {
      ...data,
      hotelCode: rq.hotelCode,
      roomCode: rq.rmtype || rq.productCode,
      checkIn: rq.fromDate,
      checkOut: rq.toDate,
      rooms: rq.rmNum,
      guestName: rq.contactName || rq.rsvMan,
      guestPhone: rq.contactMobile || rq.mobile,
      notes: rq.remark || "",
      bookOrderInfoRQ: rq,
      productCode: rq.productCode,
      appid: data.appid,
      componentAppid: data.componentAppid
    };
  };
}();
