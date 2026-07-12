'use strict';

const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const { authMiddleware, adminAuthMiddleware } = require('../middleware/auth');
const { success, error } = require('../utils/response');

const prisma = new PrismaClient();

// 小程序端：用户发送消息，统一进入后台“在线客服”会话。
router.post('/chat/send', authMiddleware, async (req, res) => {
  const content = String(req.body?.content || '').trim();
  if (!content) return error(res, '消息内容不能为空');

  const member = await prisma.member.findUnique({
    where: { id: Number(req.member.id) },
    select: { memberId: true, nickname: true, phone: true, avatar: true },
  });
  if (!member) return error(res, '会员不存在，请重新登录', 401, 401);

  const memberName = member.nickname || member.phone || '用户';
  let conv = await prisma.chatConversation.findUnique({ where: { memberId: member.memberId } });

  if (!conv) {
    conv = await prisma.chatConversation.create({
      data: {
        memberId: member.memberId,
        memberName,
        avatar: member.avatar || '',
        status: 'open',
        lastMessage: content.slice(0, 50),
        unreadAdmin: 1,
      },
    });
  } else {
    conv = await prisma.chatConversation.update({
      where: { id: conv.id },
      data: {
        memberName,
        avatar: member.avatar || conv.avatar || '',
        status: 'open',
        lastMessage: content.slice(0, 50),
        unreadAdmin: { increment: 1 },
        updatedAt: new Date(),
      },
    });
  }

  const msg = await prisma.chatMessage.create({
    data: { conversationId: conv.id, content, fromAdmin: false },
  });

  return success(res, { messageId: msg.id, conversationId: conv.id });
});

// 小程序端：获取当前用户会话消息。
router.get('/chat/messages', authMiddleware, async (req, res) => {
  const pageNum = Math.max(Number(req.query.pageNum || 1), 1);
  const pageSize = Math.min(Math.max(Number(req.query.pageSize || 50), 1), 100);

  const member = await prisma.member.findUnique({
    where: { id: Number(req.member.id) },
    select: { memberId: true },
  });
  if (!member) return error(res, '会员不存在，请重新登录', 401, 401);

  const conv = await prisma.chatConversation.findUnique({ where: { memberId: member.memberId } });
  if (!conv) return success(res, { list: [], conversationId: null });

  await prisma.chatMessage.updateMany({
    where: { conversationId: conv.id, fromAdmin: true, read: false },
    data: { read: true },
  });
  await prisma.chatConversation.update({
    where: { id: conv.id },
    data: { unreadMember: 0 },
  });

  const list = await prisma.chatMessage.findMany({
    where: { conversationId: conv.id },
    orderBy: { createdAt: 'asc' },
    skip: (pageNum - 1) * pageSize,
    take: pageSize,
  });

  return success(res, { list, conversationId: conv.id });
});

router.get('/chat/unread', authMiddleware, async (req, res) => {
  const member = await prisma.member.findUnique({
    where: { id: Number(req.member.id) },
    select: { memberId: true },
  });
  if (!member) return success(res, { unread: 0 });

  const conv = await prisma.chatConversation.findUnique({ where: { memberId: member.memberId } });
  return success(res, { unread: conv?.unreadMember || 0 });
});

// 管理端：会话列表。
router.get('/admin/chat/conversations', adminAuthMiddleware, async (req, res) => {
  const { status, pageNum = 1, pageSize = 20 } = req.query;
  const where = status ? { status: String(status) } : {};
  const [list, total] = await Promise.all([
    prisma.chatConversation.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      skip: (Number(pageNum) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    prisma.chatConversation.count({ where }),
  ]);
  return success(res, { list, total });
});

router.get('/admin/chat/conversations/:id/messages', adminAuthMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  const conv = await prisma.chatConversation.findUnique({ where: { id } });
  if (!conv) return error(res, '会话不存在');

  const list = await prisma.chatMessage.findMany({
    where: { conversationId: id },
    orderBy: { createdAt: 'asc' },
  });
  await prisma.chatMessage.updateMany({
    where: { conversationId: id, fromAdmin: false, read: false },
    data: { read: true },
  });
  await prisma.chatConversation.update({ where: { id }, data: { unreadAdmin: 0 } });
  return success(res, list);
});

router.post('/admin/chat/conversations/:id/reply', adminAuthMiddleware, async (req, res) => {
  const convId = Number(req.params.id);
  const content = String(req.body?.content || '').trim();
  if (!content) return error(res, '内容不能为空');

  const conv = await prisma.chatConversation.findUnique({ where: { id: convId } });
  if (!conv) return error(res, '会话不存在');

  const msg = await prisma.chatMessage.create({
    data: { conversationId: convId, content, fromAdmin: true },
  });
  await prisma.chatConversation.update({
    where: { id: convId },
    data: {
      status: 'open',
      lastMessage: `[客服] ${content.slice(0, 40)}`,
      unreadMember: { increment: 1 },
      updatedAt: new Date(),
    },
  });

  return success(res, msg);
});

router.put('/admin/chat/conversations/:id/status', adminAuthMiddleware, async (req, res) => {
  const status = String(req.body?.status || 'open');
  if (!['open', 'closed'].includes(status)) return error(res, '状态不正确');

  const conv = await prisma.chatConversation.update({
    where: { id: Number(req.params.id) },
    data: { status },
  });
  return success(res, conv);
});

module.exports = router;
