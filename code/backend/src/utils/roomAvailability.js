'use strict';

// 酒店房型按“每晚”计算可订量：
// - RoomType.stock 表示该房型的实际间数；后台为某天设置的 DateInventory（type=hotel_room）视为当晚总间数；
// - 当晚可订 = 当晚总间数 − 当晚仍占房的订单间数；整段入住取各晚最小值；
// - 下单不再扣减库存，订单取消 / 退款、未支付超时后自动释放，避免库存只减不增。
const MAX_ROOMS_PER_ORDER = 2;
const PENDING_HOLD_MINUTES = 30;
const RELEASED_STATUSES = ['cancelled', 'refunded'];

// [checkIn, checkOut) 内每一晚的日期（YYYY-MM-DD）
const listNights = (checkIn, checkOut) => {
  const nights = [];
  const cursor = new Date(`${checkIn}T00:00:00Z`);
  const end = new Date(`${checkOut}T00:00:00Z`);
  if (Number.isNaN(cursor.getTime()) || Number.isNaN(end.getTime())) return nights;
  while (cursor < end && nights.length < 366) {
    nights.push(cursor.toISOString().slice(0, 10));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return nights;
};

const isPendingExpired = (order, now = Date.now()) => (
  order.status === 'pending' && now - new Date(order.createdAt).getTime() > PENDING_HOLD_MINUTES * 60 * 1000
);

// 返回 Map<roomTypeId, 可订间数>；房型未设置间数（stock 为 null）时值为 null，表示不限
const getRoomAvailability = async (db, roomTypes, checkIn, checkOut, { excludeOrderNo } = {}) => {
  const result = new Map();
  const nights = listNights(checkIn, checkOut);
  const ids = roomTypes.map(r => r.id);
  if (!ids.length) return result;
  if (!nights.length) {
    roomTypes.forEach(r => result.set(r.id, r.stock == null ? null : Math.max(0, Number(r.stock))));
    return result;
  }

  const [orders, inventories] = await Promise.all([
    db.hotelOrder.findMany({
      where: {
        roomTypeId: { in: ids },
        status: { notIn: RELEASED_STATUSES },
        checkIn: { lt: checkOut },
        checkOut: { gt: checkIn },
        ...(excludeOrderNo ? { orderNo: { not: excludeOrderNo } } : {}),
      },
      select: { roomTypeId: true, rooms: true, checkIn: true, checkOut: true, status: true, createdAt: true },
    }),
    db.dateInventory.findMany({
      where: { type: 'hotel_room', targetId: { in: ids }, date: { in: nights }, status: 1 },
      select: { targetId: true, date: true, stock: true },
    }),
  ]);

  const now = Date.now();
  const activeOrders = orders.filter(o => !isPendingExpired(o, now));
  const capacityByNight = new Map(inventories.map(inv => [`${inv.targetId}|${inv.date}`, Number(inv.stock)]));

  for (const room of roomTypes) {
    let min = null;
    for (const night of nights) {
      const capacity = capacityByNight.has(`${room.id}|${night}`)
        ? capacityByNight.get(`${room.id}|${night}`)
        : (room.stock == null ? null : Number(room.stock));
      if (capacity == null) continue;
      const booked = activeOrders
        .filter(o => o.roomTypeId === room.id && o.checkIn <= night && o.checkOut > night)
        .reduce((sum, o) => sum + Number(o.rooms || 1), 0);
      const available = Math.max(0, capacity - booked);
      min = min == null ? available : Math.min(min, available);
    }
    result.set(room.id, min);
  }
  return result;
};

module.exports = {
  MAX_ROOMS_PER_ORDER,
  PENDING_HOLD_MINUTES,
  listNights,
  isPendingExpired,
  getRoomAvailability,
};
