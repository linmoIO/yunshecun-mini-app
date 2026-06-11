'use strict';

const { PrismaClient } = require('@prisma/client');
const { success, error, paginate } = require('../utils/response');

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

const showOrder = async (req, res) => {
  const { hotelCode, checkIn, checkOut } = req.query;
  const hotel = await prisma.hotel.findUnique({
    where: { hotelCode },
    include: { roomTypes: { where: { status: 1 } } },
  });
  if (!hotel) return error(res, '酒店不存在');
  return success(res, {
    hotel: formatHotel(hotel),
    roomTypes: hotel.roomTypes.map(formatRoom),
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

  const order = await prisma.hotelOrder.create({
    data: {
      memberId: req.member.id,
      hotelId: hotel.id,
      roomTypeId: roomType?.id || null,
      status: 'pending',
      checkIn,
      checkOut,
      nights,
      rooms: Number(rooms),
      totalAmount,
      guestName,
      guestPhone,
      notes,
    },
  });
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
