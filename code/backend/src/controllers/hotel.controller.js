'use strict';

const { PrismaClient } = require('@prisma/client');
const { success, error, paginate } = require('../utils/response');
const { decrementDateInventory, normalizeDate } = require('../utils/inventory');

const prisma = new PrismaClient();
const tryParse = (s, f) => { try { return s ? JSON.parse(s) : f; } catch { return f; } };

// ---- 小程序端 ----

const getHotelList = async (req, res) => {
  const params = { ...(req.body || {}), ...(req.query || {}) };
  const { city, keyword, keyWord, pageNum = 1, pageSize = 20 } = params;
  const kw = keyword || keyWord;
  const where = { status: 1 };
  if (city) where.city = city;
  if (kw) where.name = { contains: kw };

  const [list, total] = await Promise.all([
    prisma.hotel.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      skip: (Number(pageNum) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    prisma.hotel.count({ where }),
  ]);

  const hotels = list.map(h => ({
    ...formatHotel(h),
    // 兼容前端 findHotelByCondition 格式
    hotelCode: h.hotelCode,
    hotelName: h.name,
    hotelPic: h.coverImage || '',
    hotelCity: h.city || '',
    address: h.address || '',
    star: h.starLevel || 5,
    priceMin: h.priceFrom || 0,
    productType: 'Hotel',
    pics: h.coverImage || '',
    title: h.name,
    minPriceDto: { payType: 'CASH', price: h.priceFrom || 0 },
  }));

  // 兼容多种格式：list 格式 + retVal 格式（搜索页）
  return res.json({
    code: 0,
    result: 0,
    msg: 'success',
    data: { list: hotels, total },
    retVal: { hotelList: hotels, totalRecord: total },
    success: true,
  });
};

const getHotelInfo = async (req, res) => {
  const { hotelCode, id } = req.query;
  const hotel = id
    ? await prisma.hotel.findUnique({ where: { id: Number(id) }, include: { roomTypes: true } })
    : await prisma.hotel.findUnique({ where: { hotelCode }, include: { roomTypes: true } });
  if (!hotel) return error(res, '酒店不存在');
  return success(res, { ...formatHotel(hotel), roomTypes: hotel.roomTypes.map(formatRoom) });
};

const buildWechatHotelDetail = (hotel, fromDate, toDate, inventoryMap = new Map()) => {
  const rooms = (hotel.roomTypes || []).map(room => buildWechatRoom(hotel, room, fromDate, toDate, inventoryMap.get(room.id)));
  const minRoomPrice = rooms.reduce((min, room) => {
    const price = Number(room.gcProductBases?.[0]?.pbMinPriceWithPromotion) || 0;
    return price > 0 ? Math.min(min, price) : min;
  }, 999999);

  return {
    gcHotel: {
      hotelCode: hotel.hotelCode,
      descript: hotel.name,
      address1: hotel.address || '',
      city: hotel.city || '',
      province: hotel.province || '',
      phone: hotel.phone || '',
      logo: hotel.coverImage || '',
      description: hotel.description || '',
      resrvNoticePp: '',
      resrvNoticeCs: '',
      starLevel: hotel.starLevel || 5,
    },
    gcHotelExtra: { logo: hotel.coverImage || '' },
    minPrice: hotel.priceFrom || (minRoomPrice === 999999 ? 0 : minRoomPrice),
    productRoomList: rooms,
    roomImagesList: [],
  };
};

const buildWechatRoom = (hotel, room, fromDate, toDate, dateInventory) => {
  const images = tryParse(room.images, []);
  const stock = dateInventory ? Number(dateInventory.stock) : (room.stock != null ? Number(room.stock) : 10);
  const canBook = stock > 0;
  const price = Number(room.price) || 0;
  const roomCode = room.roomCode || String(room.id);
  const productCode = `${hotel.hotelCode}-${roomCode}`;
  const roomDetail = {
    roomCode,
    fromDate,
    toDate,
    price,
    unit: '元',
    priceDtos: [{ payType: 'CASH', adultPrice: price }],
    specificationsPriceDtos: [{ priceModel: 'ROOM', priceModelDesc: '间/晚', price }],
    productAvailNum: stock,
    canBook,
    bedType: room.bedType || '',
    area: room.area ? `${room.area}㎡` : '',
    capacity: room.capacity || 2,
  };

  return {
    roomCode,
    roomName: room.name,
    roomDescript: room.name,
    bedType: room.bedType || '',
    area: room.area ? `${room.area}㎡` : '',
    capacity: room.capacity || 2,
    roomPicCount: Math.max(1, images.length),
    gcRoomExtra: {
      logo: images[0] || hotel.coverImage || '',
      picturesList: images,
      pictures: images.join(';'),
      description: room.description || '',
      abstracts: room.description || '',
      bedType: room.bedType || '',
      squareMeter: room.area ? `${room.area}㎡` : '',
      floor: '',
      detail: room.description || '',
    },
    gcProductBases: [{
      name: `${price}元/晚`,
      showName: `${price}元/晚`,
      pbMinPriceWithPromotion: price,
      bookAble: canBook ? 'T' : 'F',
      minSaleNum: canBook ? Math.max(1, stock) : 0,
      notMemberBook: 'T',
      payMethod: 'CASH',
      prodCategorySub: 'STD',
      price,
      productCode,
      roomType: roomCode,
      pmsRateCode: roomCode,
      rateCode: roomCode,
      ticket: '',
      hotelGroupCode: hotel.hotelGroupCode || 'SONGTSAM',
      stayTime: '',
      resrvNumMin: 1,
      prepayTimeLimit: 24,
      prepayHoldTimeMax: 72,
      prepayMethod: 'PREPAY',
      cancelPrehour: 24,
      cancelPretime: '',
      cancelPredays: 1,
      cancelCondition: '入住前24小时可免费取消',
      otaChannel: 'WECHAT',
      fromDate,
      toDate,
    }],
    travelWechatHotelDetailDtos: [roomDetail],
    travelList: [roomDetail],
  };
};

const showOrder = async (req, res) => {
  const { hotelCode, orderNo, checkIn, checkOut } = req.query;

  if (orderNo) {
    const order = await prisma.hotelOrder.findUnique({
      where: { orderNo },
      include: { hotel: true, roomType: true },
    });
    if (!order) return error(res, '订单不存在');

    const retVal = {
      ...formatHotelOrder(order),
      crsNo: order.orderNo,
      gcRsvNo: order.orderNo,
      orderNo: order.orderNo,
      hotelCode: order.hotel?.hotelCode || '',
      hotelGroupCode: order.hotel?.hotelGroupCode || 'SONGTSAM',
      hotelDescript: order.hotel?.name || '',
      roomDescript: order.roomType?.name || '',
      productDesc: order.roomType?.name || order.hotel?.name || '酒店预订',
      paySubject: order.roomType?.name || order.hotel?.name || '酒店预订',
      rateSum: Number(order.totalAmount || 0),
      payRate: Number(order.totalAmount || 0),
      leftTimeSeconds: order.status === 'pending' ? 30 * 60 : 0,
      paySta: order.status === 'paid' ? '2' : '1',
      sta: order.status === 'cancelled' ? 'X' : 'R',
      arr: order.checkIn,
      dep: order.checkOut,
      adult: 1,
      baby: 0,
      children: 0,
      bigChildren: 0,
      memberLevel: '000',
      cardType: '',
      cardLevel: '000',
    };
    return res.json({ code: 0, result: 1, msg: 'success', retVal, data: retVal });
  }

  if (!hotelCode) return error(res, '缺少酒店编码');
  const hotel = await prisma.hotel.findUnique({
    where: { hotelCode },
    include: { roomTypes: { where: { status: 1 } } },
  });
  if (!hotel) return error(res, '酒店不存在');
  const inventoryRows = checkIn ? await prisma.dateInventory.findMany({
    where: {
      type: 'hotel_room',
      targetId: { in: hotel.roomTypes.map(r => r.id) },
      date: normalizeDate(checkIn),
      status: 1,
    },
  }) : [];
  const inventoryMap = new Map(inventoryRows.map(row => [row.targetId, row]));
  const detail = buildWechatHotelDetail(hotel, checkIn, checkOut, inventoryMap);
  return success(res, {
    hotel: formatHotel(hotel),
    roomTypes: hotel.roomTypes.map(formatRoom),
    ...detail,
    checkIn,
    checkOut,
  });
};

const makeHotelOrder = async (req, res) => {
  const { hotelCode, roomCode, checkIn, checkOut, rooms = 1, guestName, guestPhone, notes, couponNo } = req.body;

  const hotel = await prisma.hotel.findUnique({ where: { hotelCode } });
  if (!hotel) return error(res, '酒店不存在');

  const roomType = roomCode
    ? await prisma.roomType.findFirst({ where: { hotelId: hotel.id, roomCode } })
    : null;

  const nights = checkIn && checkOut
    ? Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000))
    : 1;
  const pricePerNight = roomType?.price || 0;
  const totalAmount = pricePerNight * Number(rooms) * nights;

  const roomCount = Number(rooms);
  let order;
  try {
    order = await prisma.$transaction(async (tx) => {
      if (roomType) {
        const dateInventory = await decrementDateInventory(tx, {
          type: 'hotel_room',
          targetId: roomType.id,
          targetCode: roomType.roomCode,
          date: normalizeDate(checkIn),
          quantity: roomCount,
        });
        if (!dateInventory) {
          if (roomType.stock < roomCount) {
            const err = new Error(`该房型库存不足，当前剩余 ${roomType.stock}`);
            err.code = 'OUT_OF_STOCK';
            throw err;
          }
          await tx.roomType.update({ where: { id: roomType.id }, data: { stock: { decrement: roomCount } } });
        }
      }
      return tx.hotelOrder.create({
        data: {
          memberId: req.member.id,
          hotelId: hotel.id,
          roomTypeId: roomType?.id || null,
          status: 'pending',
          checkIn,
          checkOut,
          nights,
          rooms: roomCount,
          totalAmount,
          guestName,
          guestPhone,
          notes,
        },
      });
    });
  } catch (err) {
    return error(res, err.message || '库存不足');
  }
  return res.json({ code: 0, result: 1, msg: 'success', retVal: { orderNo: order.orderNo, totalAmount: order.totalAmount, gcRsvNo: order.orderNo }, data: { orderNo: order.orderNo, totalAmount: order.totalAmount } });
};

const getHotelOrderList = async (req, res) => {
  const { status, pageNum = 1, pageSize = 10 } = req.query;
  const where = { memberId: req.member.id };
  if (status) where.status = status;

  const [list, total] = await Promise.all([
    prisma.hotelOrder.findMany({
      where,
      include: { hotel: true, roomType: true },
      orderBy: { createdAt: 'desc' },
      skip: (Number(pageNum) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    prisma.hotelOrder.count({ where }),
  ]);
  return success(res, { list: list.map(formatHotelOrder), total });
};

// ---- 管理端 ----

const adminListHotels = async (req, res) => {
  const { pageNum = 1, pageSize = 20, keyword, status } = req.query;
  const where = {};
  if (status !== undefined) where.status = Number(status);
  if (keyword) where.name = { contains: keyword };

  const [list, total] = await Promise.all([
    prisma.hotel.findMany({
      where,
      include: { roomTypes: true },
      orderBy: [{ sortOrder: 'asc' }, { updatedAt: 'desc' }],
      skip: (Number(pageNum) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    prisma.hotel.count({ where }),
  ]);
  return paginate(res, list.map(h => ({ ...formatHotel(h), roomTypes: h.roomTypes.map(formatRoom) })), total, pageNum, pageSize);
};

const adminGetHotel = async (req, res) => {
  const hotel = await prisma.hotel.findUnique({
    where: { id: Number(req.params.id) },
    include: { roomTypes: true },
  });
  if (!hotel) return error(res, '酒店不存在');
  return success(res, { ...formatHotel(hotel), roomTypes: hotel.roomTypes.map(formatRoom) });
};

const adminCreateHotel = async (req, res) => {
  const data = buildHotelData(req.body);
  const hotel = await prisma.hotel.create({ data });
  return success(res, formatHotel(hotel));
};

const adminUpdateHotel = async (req, res) => {
  const data = buildHotelData(req.body);
  const hotel = await prisma.hotel.update({ where: { id: Number(req.params.id) }, data });
  return success(res, formatHotel(hotel));
};

const adminDeleteHotel = async (req, res) => {
  const id = Number(req.params.id);
  // 先解除订单对该酒店的引用，再删除客房，最后删酒店
  await prisma.hotelOrder.updateMany({ where: { hotelId: id }, data: { hotelId: null, roomTypeId: null } });
  await prisma.roomType.deleteMany({ where: { hotelId: id } });
  await prisma.hotelService.deleteMany({ where: { hotelId: id } });
  await prisma.hotel.delete({ where: { id } });
  return success(res, null, '删除成功');
};

const adminUpdateHotelMedia = async (req, res) => {
  const { id } = req.params;
  const { coverImage, images, videoUrl, videoThumb, videoLinkType } = req.body;
  const updated = await prisma.hotel.update({
    where: { id: Number(id) },
    data: {
      ...(coverImage !== undefined && { coverImage }),
      ...(images !== undefined && { images: typeof images === 'string' ? images : JSON.stringify(images) }),
      ...(videoUrl !== undefined && { videoUrl }),
      ...(videoThumb !== undefined && { videoThumb }),
      ...(videoLinkType !== undefined && { videoLinkType }),
    },
  });
  return success(res, formatHotel(updated));
};

// 房型管理
const adminListRoomTypes = async (req, res) => {
  const rooms = await prisma.roomType.findMany({
    where: { hotelId: Number(req.params.id) },
    orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
  });
  return success(res, rooms.map(formatRoom));
};

const adminCreateRoomType = async (req, res) => {
  const { hotelId, roomCode, name, description, price, originalPrice, area, bedType, capacity, images, amenities, stock, sortOrder, status } = req.body;
  const room = await prisma.roomType.create({
    data: {
      hotelId: Number(hotelId),
      roomCode: roomCode || `room_${Date.now()}`,
      name, description,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : null,
      area: area ? Number(area) : null,
      bedType, capacity: capacity ? Number(capacity) : null,
      images: images ? (typeof images === 'string' ? images : JSON.stringify(images)) : null,
      amenities: amenities ? (typeof amenities === 'string' ? amenities : JSON.stringify(amenities)) : null,
      stock: stock !== undefined ? Number(stock) : 10,
      sortOrder: sortOrder ? Number(sortOrder) : 0,
      status: status !== undefined ? Number(status) : 1,
    },
  });
  return success(res, formatRoom(room));
};

const adminUpdateRoomType = async (req, res) => {
  const { name, description, price, originalPrice, area, bedType, capacity, images, amenities, stock, sortOrder, status } = req.body;
  const room = await prisma.roomType.update({
    where: { id: Number(req.params.id) },
    data: {
      name, description,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : null,
      area: area ? Number(area) : null,
      bedType, capacity: capacity ? Number(capacity) : null,
      images: images ? (typeof images === 'string' ? images : JSON.stringify(images)) : null,
      amenities: amenities ? (typeof amenities === 'string' ? amenities : JSON.stringify(amenities)) : null,
      ...(stock !== undefined && { stock: Number(stock) }),
      sortOrder: sortOrder ? Number(sortOrder) : 0,
      status: status !== undefined ? Number(status) : 1,
    },
  });
  return success(res, formatRoom(room));
};

const adminDeleteRoomType = async (req, res) => {
  await prisma.roomType.delete({ where: { id: Number(req.params.id) } });
  return success(res, null, '删除成功');
};

const adminListOrders = async (req, res) => {
  const { pageNum = 1, pageSize = 20, status, keyword } = req.query;
  const where = {};
  if (status) where.status = status;
  if (keyword) where.orderNo = { contains: keyword };

  const [list, total] = await Promise.all([
    prisma.hotelOrder.findMany({
      where,
      include: { hotel: true, roomType: true, member: { select: { nickname: true, phone: true } } },
      orderBy: { createdAt: 'desc' },
      skip: (Number(pageNum) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    prisma.hotelOrder.count({ where }),
  ]);
  return paginate(res, list.map(formatHotelOrder), total, pageNum, pageSize);
};

const adminUpdateOrderStatus = async (req, res) => {
  const { orderNo, status } = req.body;
  const order = await prisma.hotelOrder.update({ where: { orderNo }, data: { status } });
  return success(res, formatHotelOrder(order));
};

const buildHotelData = (body) => {
  const { hotelCode, name, address, city, province, phone, description, coverImage, images,
    videoUrl, videoThumb, videoLinkType, latitude, longitude, starLevel, facilities,
    checkInTime, checkOutTime, sortOrder, status, hotelGroupCode } = body;
  return {
    hotelCode: hotelCode || `hotel_${Date.now()}`,
    hotelGroupCode: hotelGroupCode || 'SONGTSAM',
    name, address, city, province, phone, description,
    coverImage, videoUrl, videoThumb, videoLinkType,
    latitude: latitude ? Number(latitude) : null,
    longitude: longitude ? Number(longitude) : null,
    starLevel: starLevel ? Number(starLevel) : null,
    checkInTime, checkOutTime,
    sortOrder: sortOrder ? Number(sortOrder) : 0,
    status: status !== undefined ? Number(status) : 1,
    images: images ? (typeof images === 'string' ? images : JSON.stringify(images)) : null,
    facilities: facilities ? (typeof facilities === 'string' ? facilities : JSON.stringify(facilities)) : null,
  };
};

const formatHotel = (h) => ({
  ...h,
  images: tryParse(h.images, []),
  facilities: tryParse(h.facilities, []),
  roomTypes: undefined,
});

const formatRoom = (r) => ({
  ...r,
  images: tryParse(r.images, []),
  amenities: tryParse(r.amenities, []),
});

const formatHotelOrder = (o) => ({
  ...o,
  hotel: o.hotel ? formatHotel(o.hotel) : null,
  roomType: o.roomType ? formatRoom(o.roomType) : null,
});

module.exports = {
  getHotelList, getHotelInfo, showOrder, makeHotelOrder, getHotelOrderList,
  adminListHotels, adminGetHotel, adminCreateHotel, adminUpdateHotel,
  adminDeleteHotel, adminUpdateHotelMedia,
  adminListRoomTypes, adminCreateRoomType, adminUpdateRoomType, adminDeleteRoomType,
  adminListOrders, adminUpdateOrderStatus,
};
