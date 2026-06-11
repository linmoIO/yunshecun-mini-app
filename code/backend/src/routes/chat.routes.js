'use strict';

const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const { authMiddleware, adminAuthMiddleware } = require('../middleware/auth');
const { success, error } = require('../utils/response');

const prisma = new PrismaClient();

// ---- 小程序端：用户发消息 / 获取会话 ----

// 发消息（用户 → 客服）
router.post('/chat/send', authMiddleware, async (req, res) => {
  const { content } = req.body;
  if (!content?.trim()) return error(res, '消息内容不能为空');

  const member = await prisma.member.findUnique({
    where: { id: req.member.id },
    select: { memberId: true, nickname: true, avatar: true },
  });

  // 找或创建会话
  let conv = await prisma.chatConversation.findFirst({ where: { memberId: req.member.memberId } });
  if (!conv) {
    conv = await prisma.chatConversation.create({
      data: {
        memberId: req.member.memberId,
        memberName: member?.nickname || '用户',
        avatar: member?.avatar || '',
        status: 'open',
        lastMessage: content.slice(0, 50),
        unreadAdmin: 1,
      },
    });
  } else {
    conv = await prisma.chatConversation.update({
      where: { id: conv.id },
      data: { lastMessage: content.slice(0, 50), unreadAdmin: { increment: 1 }, updatedAt: new Date() },
    });
  }

  const msg = await prisma.chatMessage.create({
    data: { conversationId: conv.id, content: content.trim(), fromAdmin: false },
  });

  return success(res, { messageId: msg.id, conversationId: conv.id });
});

// 获取我的会话消息列表
router.get('/chat/messages', authMiddleware, async (req, res) => {
  const { pageNum = 1, pageSize = 50 } = req.query;
  const conv = await prisma.chatConversation.findFirst({ where: { memberId: req.member.memberId } });
  if (!conv) return success(res, { list: [], conversationId: null });

  // 标记用户已读
  await prisma.chatMessage.updateMany({
    where: { conversationId: conv.id, fromAdmin: true, read: false },
    data: { read: true },
  });
  await prisma.chatConversation.update({
    where: { id: conv.id }, data: { unreadMember: 0 },
  });

  const list = await prisma.chatMessage.findMany({
    where: { conversationId: conv.id },
    orderBy: { createdAt: 'asc' },
    skip: (Number(pageNum) - 1) * Number(pageSize),
    take: Number(pageSize),
  });

  return success(res, { list, conversationId: conv.id });
});

// 轮询：获取未读数（用户端）
router.get('/chat/unread', authMiddleware, async (req, res) => {
  const conv = await prisma.chatConversation.findFirst({ where: { memberId: req.member.memberId } });
  return success(res, { unread: conv?.unreadMember || 0 });
});

// ---- 管理端：查看所有会话、回复 ----

// 所有会话列表
router.get('/admin/chat/conversations', adminAuthMiddleware, async (req, res) => {
  const { status, pageNum = 1, pageSize = 20 } = req.query;
  const where = status ? { status } : {};
  const [list, total] = await Promise.all([
    prisma.chatConversation.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      skip: (Number(pageNum) - 1) * Number(pageSize),
      take: Number(pageSize),
    }),
    prisma.chatConversation.count({ where }),
  ]);
  return res.json({ code: 0, data: { list, total } });
});

// 某个会话的消息详情
router.get('/admin/chat/conversations/:id/messages', adminAuthMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  const list = await prisma.chatMessage.findMany({
    where: { conversationId: id },
    orderBy: { createdAt: 'asc' },
  });
  // 标记后台已读
  await prisma.chatMessage.updateMany({
    where: { conversationId: id, fromAdmin: false, read: false },
    data: { read: true },
  });
  await prisma.chatConversation.update({ where: { id }, data: { unreadAdmin: 0 } });
  return res.json({ code: 0, data: list });
});

// 管理员回复
router.post('/admin/chat/conversations/:id/reply', adminAuthMiddleware, async (req, res) => {
  const convId = Number(req.params.id);
  const { content } = req.body;
  if (!content?.trim()) return res.json({ code: -1, msg: '内容不能为空' });

  const conv = await prisma.chatConversation.findUnique({ where: { id: convId } });
  if (!conv) return res.json({ code: -1, msg: '会话不存在' });

  const msg = await prisma.chatMessage.create({
    data: { conversationId: convId, content: content.trim(), fromAdmin: true },
  });
  await prisma.chatConversation.update({
    where: { id: convId },
    data: { lastMessage: `[客服] ${content.slice(0, 40)}`, unreadMember: { increment: 1 }, updatedAt: new Date() },
  });

  return res.json({ code: 0, data: msg });
});

// 关闭/重开会话
router.put('/admin/chat/conversations/:id/status', adminAuthMiddleware, async (req, res) => {
  const { status } = req.body; // 'open' | 'closed'
  const conv = await prisma.chatConversation.update({
    where: { id: Number(req.params.id) },
    data: { status },
  });
  return res.json({ code: 0, data: conv });
});

module.exports = router;
