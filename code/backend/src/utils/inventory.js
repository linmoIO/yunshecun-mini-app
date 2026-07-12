'use strict';

const normalizeDate = (value) => {
  if (!value) return '';
  return String(value).split(' ')[0].slice(0, 10);
};

const decrementTravelDeparture = async (prisma, { productId, productCode, date, quantity = 1 }) => {
  const departDate = normalizeDate(date);
  if (!departDate) return null;

  const inv = await prisma.travelDeparture.findFirst({
    where: {
      status: 1,
      departDate,
      OR: [
        ...(productId ? [{ productId: Number(productId) }] : []),
        ...(productCode ? [{ productCode }] : []),
      ],
    },
  });
  if (!inv) return null;
  if (inv.stock < quantity) {
    const err = new Error(`该日期余量不足，当前剩余 ${inv.stock}`);
    err.code = 'OUT_OF_STOCK';
    throw err;
  }
  await prisma.travelDeparture.update({
    where: { id: inv.id },
    data: { stock: { decrement: quantity } },
  });
  return inv;
};

const restoreTravelDeparture = async (prisma, { productId, productCode, date, quantity = 1 }) => {
  const departDate = normalizeDate(date);
  if (!departDate) return;
  const inv = await prisma.travelDeparture.findFirst({
    where: {
      departDate,
      OR: [
        ...(productId ? [{ productId: Number(productId) }] : []),
        ...(productCode ? [{ productCode }] : []),
      ],
    },
  });
  if (inv) await prisma.travelDeparture.update({ where: { id: inv.id }, data: { stock: { increment: quantity } } });
};

const decrementDateInventory = async (prisma, { type, targetId, targetCode, date, quantity = 1 }) => {
  const day = normalizeDate(date);
  if (!day || !targetId) return null;
  const inv = await prisma.dateInventory.findFirst({
    where: {
      type,
      targetId: Number(targetId),
      date: day,
      status: 1,
    },
  });
  if (!inv) return null;
  if (inv.stock < quantity) {
    const err = new Error(`该日期余量不足，当前剩余 ${inv.stock}`);
    err.code = 'OUT_OF_STOCK';
    throw err;
  }
  await prisma.dateInventory.update({
    where: { id: inv.id },
    data: { stock: { decrement: quantity } },
  });
  return inv;
};

const restoreDateInventory = async (prisma, { type, targetId, date, quantity = 1 }) => {
  const day = normalizeDate(date);
  if (!day || !targetId) return;
  const inv = await prisma.dateInventory.findFirst({
    where: { type, targetId: Number(targetId), date: day },
  });
  if (inv) await prisma.dateInventory.update({ where: { id: inv.id }, data: { stock: { increment: quantity } } });
};

module.exports = {
  normalizeDate,
  decrementTravelDeparture,
  restoreTravelDeparture,
  decrementDateInventory,
  restoreDateInventory,
};
