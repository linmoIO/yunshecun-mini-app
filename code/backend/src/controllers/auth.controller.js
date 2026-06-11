'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const config = require('../config');
const { success, error } = require('../utils/response');

const prisma = new PrismaClient();

const generateToken = (member) => {
  return jwt.sign(
    { id: member.id, memberId: member.memberId, phone: member.phone },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );
};

// 从数据库读取微信配置（优先 DB，回退 config.js）
const getWechatConfig = async () => {
  try {
    const rows = await prisma.sysConfig.findMany({
      where: { key: { in: ['wechat_app_id', 'wechat_app_secret'] } },
    });
    const map = {};
    rows.forEach(r => { map[r.key] = r.value; });
    return {
      appId: map['wechat_app_id'] || config.wechat.appId,
      appSecret: map['wechat_app_secret'] || config.wechat.appSecret,
    };
  } catch {
    return { appId: config.wechat.appId, appSecret: config.wechat.appSecret };
  }
};

// 微信 code 换 openId
const wechatLogin = async (req, res) => {
  const { code, avatarUrl, hotelGroupCode } = req.body || req.query;
  if (!code) return error(res, '缺少 code 参数');

  try {
    const wxCfg = await getWechatConfig();

    let openid, session_key;

    if (!wxCfg.appSecret) {
      // 未配置 AppSecret：开发模式，用 code 派生固定 openid
      openid = 'dev_openid_' + code.slice(0, 16);
      session_key = 'dev_session_key';
      console.log(`[微信登录] 开发模式 (AppSecret 未配置)，openid=${openid}`);
    } else {
      const wxRes = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
        params: {
          appid: wxCfg.appId,
          secret: wxCfg.appSecret,
          js_code: code,
          grant_type: 'authorization_code',
        },
        timeout: 10000,
      });
      const data = wxRes.data;
      if (data.errcode) return error(res, `微信登录失败: ${data.errmsg} (${data.errcode})`);
      openid = data.openid;
      session_key = data.session_key;
    }

    let member = await prisma.member.findUnique({ where: { wechatOpenId: openid } });
    if (!member) {
      member = await prisma.member.create({
        data: {
          memberId: uuidv4(),
          wechatOpenId: openid,
          cardLevel: '普通会员',
          // 不存 CDN 默认头像（无法访问），等用户主动更新
          avatar: null,
          nickname: null,
        },
      });
    }

    const token = generateToken(member);
    await prisma.member.update({ where: { id: member.id }, data: { memberToken: token } });

    // 前端 user.js 检查 result===1 且 retVal.openid（注意字段命名）
    return res.json({
      code: 0,
      result: 1,
      msg: 'success',
      data: {
        memberId: member.memberId,
        memberToken: token,
        openId: openid,
        sessionKey: session_key,
      },
      retVal: {
        openid,
        session_key,
        memberToken: token,
        memberId: member.memberId,
        nickName: member.nickname || '云舍村家人',
        avatar: member.avatar || avatarUrl || '',
        cardLevel: member.cardLevel,
        points: member.points,
        memberInfo: {
          nickname: member.nickname,
          avatar: member.avatar,
          cardLevel: member.cardLevel,
          points: member.points,
        },
      },
    });
  } catch (err) {
    console.error('wechatLogin error:', err.message);
    return error(res, '微信登录异常: ' + err.message);
  }
};

// 生成图形验证码（使用 svg-captcha，返回 SVG 图片和 captchaId）
const generateCaptcha = async (req, res) => {
  try {
    const svgCaptcha = require('svg-captcha');
    const { v4: uuid } = require('uuid');
    const captcha = svgCaptcha.create({ size: 4, ignoreChars: '0o1l', noise: 1, color: true });
    const captchaId = uuid();
    const expiresAt = new Date(Date.now() + 10 * 60000); // 10 分钟有效期
    // 存储验证码（可用数据库或内存，这里用 sysConfig 表简单存储）
    await prisma.sysConfig.create({
      data: { key: `captcha_${captchaId}`, value: captcha.text, expiresAt }
    }).catch(async () => {
      // 如果 upsert 冲突，先删旧的再创建
      await prisma.sysConfig.deleteMany({ where: { key: `captcha_${captchaId}` } }).catch(() => {});
      return prisma.sysConfig.create({ data: { key: `captcha_${captchaId}`, value: captcha.text, expiresAt } });
    });
    return success(res, { captchaId, image: captcha.data }, '图形验证码已生成');
  } catch (err) {
    console.error('generateCaptcha error:', err.message);
    return error(res, '验证码生成失败: ' + err.message);
  }
};

// 验证图形验证码（验证码 ID + 用户输入的验证码）
const verifyCaptcha = async (captchaId, userCode) => {
  if (!captchaId || !userCode) return false;
  try {
    const stored = await prisma.sysConfig.findUnique({ where: { key: `captcha_${captchaId}` } });
    if (!stored) return false;
    // 不区分大小写
    const match = stored.value.toLowerCase() === userCode.toLowerCase().trim();
    // 验证成功后删除（一次性）
    if (match) {
      await prisma.sysConfig.delete({ where: { key: `captcha_${captchaId}` } }).catch(() => {});
    }
    return match;
  } catch {
    return false;
  }
};

// 短信宝发送 SMS（需配置 sms_provider / sms_user / sms_pass / sms_sign）
const sendSmsBao = async (phone, content) => {
  const axios_sms = require('axios');
  const md5 = require('crypto');
  const cfgRows = await prisma.sysConfig.findMany({
    where: { key: { in: ['sms_user', 'sms_pass', 'sms_sign'] } }
  });
  const cfg = Object.fromEntries(cfgRows.map(r => [r.key, r.value]));
  if (!cfg.sms_user || !cfg.sms_pass) throw new Error('短信服务未配置，请在后台-系统设置-短信配置中填写账号信息');
  const passHash = md5.createHash('md5').update(cfg.sms_pass).digest('hex');
  const sign = cfg.sms_sign ? `【${cfg.sms_sign}】` : '【云舍村】';
  const smsContent = sign + content;
  const url = `https://api.smsbao.com/sms?u=${encodeURIComponent(cfg.sms_user)}&p=${passHash}&m=${phone}&c=${encodeURIComponent(smsContent)}`;
  const res = await axios_sms.get(url, { timeout: 8000 });
  const code = String(res.data).trim();
  const SMS_ERRORS = { '0':'成功','30':'账号不存在','40':'账号密码错','41':'余额不足','43':'IP限制','50':'内容含敏感词','51':'手机号非法','52':'短信过期','53':'发送数量超限','54':'信息有误' };
  if (code !== '0') throw new Error('短信发送失败：' + (SMS_ERRORS[code] || `错误码${code}`));
};

// 发送短信验证码（需先验证图形验证码）
const sendVerifyCode = async (req, res) => {
  const params = { ...(req.query || {}), ...(req.body || {}) };
  const { mobile, phone, captchaId, captchaCode } = params;
  const phoneNo = mobile || phone;

  if (!phoneNo) return error(res, '请提供手机号');
  if (!/^1\d{10}$/.test(phoneNo)) return error(res, '手机号格式不正确');

  // 验证图形验证码（如果提供了）
  if (captchaId && captchaCode) {
    const captchaValid = await verifyCaptcha(captchaId, captchaCode);
    if (!captchaValid) return error(res, '图形验证码错误或已过期');
  }

  // 频率限制：同一手机号 60 秒内只能发一次
  const lastSent = await prisma.verifyCode.findFirst({
    where: { phone: phoneNo, createdAt: { gt: new Date(Date.now() - 60000) } },
    orderBy: { createdAt: 'desc' }
  });
  if (lastSent) return error(res, '发送太频繁，请60秒后再试');

  const code = String(Math.floor(100000 + Math.random() * 900000));
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  await prisma.verifyCode.create({ data: { phone: phoneNo, code, expiresAt } });

  // 尝试真实短信发送
  try {
    await sendSmsBao(phoneNo, `您的验证码是：${code}，5分钟内有效，请勿泄露。`);
    console.log(`[SMS] 已发送验证码到 ${phoneNo}`);
  } catch (smsErr) {
    console.warn(`[SMS] 短信发送失败（${smsErr.message}），开发模式返回验证码`);
    // 短信未配置时，开发模式直接返回验证码（生产环境应去掉 devCode）
    return success(res, { mobile: phoneNo, devCode: code }, '验证码已发送（开发模式）');
  }

  return success(res, { mobile: phoneNo }, '验证码已发送');
};

// 手机号+验证码登录
const loginByMobileCode = async (req, res) => {
  const { mobile, phone, identifyCode, code, hotelGroupCode } = req.body || req.query;
  const phoneNo = mobile || phone;
  const verCode = identifyCode || code;

  if (!phoneNo || !verCode) return error(res, '请提供手机号和验证码');

  const record = await prisma.verifyCode.findFirst({
    where: { phone: phoneNo, code: verCode, used: false, expiresAt: { gt: new Date() } },
    orderBy: { createdAt: 'desc' },
  });

  if (!record) return error(res, '验证码错误或已过期');

  await prisma.verifyCode.update({ where: { id: record.id }, data: { used: true } });

  let member = await prisma.member.findUnique({ where: { phone: phoneNo } });
  if (!member) {
    member = await prisma.member.create({
      data: { memberId: uuidv4(), phone: phoneNo, cardLevel: '普通会员' },
    });
  }

  const token = generateToken(member);
  await prisma.member.update({ where: { id: member.id }, data: { memberToken: token } });

  return success(res, {
    memberId: member.memberId,
    memberToken: token,
    memberInfo: formatMember(member),
  });
};

// Token 刷新
const refreshToken = async (req, res) => {
  const token =
    req.headers['authorization']?.replace('Bearer ', '') ||
    req.body?.refreshToken;

  if (!token) return error(res, '缺少 Token');

  try {
    const decoded = jwt.verify(token, config.jwt.secret, { ignoreExpiration: true });
    const member = await prisma.member.findUnique({ where: { id: decoded.id } });
    if (!member) return error(res, '用户不存在');

    const newToken = generateToken(member);
    await prisma.member.update({ where: { id: member.id }, data: { memberToken: newToken } });

    return success(res, { accessToken: newToken, tokenType: 'Bearer' });
  } catch (e) {
    return error(res, 'Token 无效');
  }
};

// 退出登录
const logout = async (req, res) => {
  const memberId = req.member?.id;
  if (memberId) {
    await prisma.member.update({ where: { id: memberId }, data: { memberToken: null } });
  }
  return success(res, null, '已退出登录');
};

// 管理员登录
const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return error(res, '请提供账号和密码');

  const admin = await prisma.adminUser.findUnique({ where: { username } });
  if (!admin || admin.status !== 1) return error(res, '账号不存在或已禁用');

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) return error(res, '密码错误');

  const token = jwt.sign(
    { id: admin.id, username: admin.username, role: admin.role },
    config.adminJwt.secret,
    { expiresIn: config.adminJwt.expiresIn }
  );

  await prisma.adminUser.update({ where: { id: admin.id }, data: { lastLoginAt: new Date() } });

  return success(res, {
    token,
    admin: { id: admin.id, username: admin.username, name: admin.name, role: admin.role },
  });
};

const CARD_LEVEL_DESC_AUTH = {
  '普通会员': '普通会员', '银卡会员': '银卡会员', '金卡会员': '金卡会员',
  '铂金会员': '铂金会员', '钻石会员': '钻石会员',
};
const formatMember = (m) => ({
  memberId: m.memberId,
  memberIdStr: m.memberId,
  memberToken: m.memberToken || '',
  nickname: m.nickname || '云舍村用户',
  avatar: m.avatar || '',
  headPortraitUrl: m.avatar || '',
  phone: m.phone || '',
  mobile: m.phone || '',
  email: m.email || '',
  realName: m.realName || '',
  gender: m.gender,
  birthday: m.birthday || '',
  cardLevel: m.cardLevel || '普通会员',
  cardLevelDescript: CARD_LEVEL_DESC_AUTH[m.cardLevel] || m.cardLevel || '普通会员',
  cardId: m.id,
  cardNo: m.cardNo || '',
  points: m.points || 0,
  pointBalance: m.points || 0,
  balance: m.balance || 0,
  memberBalanceUsable: m.balance || 0,
  couponNum: 0,
  // memberCenter.js 直接访问 cardListDto.length，必须返回数组不能为 undefined
  cardListDto: [],
});

// memberLoginOpen.json：refreshMemberInfo 用 openid/memberId 刷新会员信息
// 关键：必须返回 result:1, retVal:{memberId, memberToken, ...}
// 否则 utils/utils.js refreshMemberInfo 会调 setStorage("user","") 清空登录状态
const memberLoginOpen = async (req, res) => {
  const params = { ...(req.body || {}), ...(req.query || {}) };
  const { memberId: memberUUID, openid } = params;

  let member = null;
  if (memberUUID) {
    member = await prisma.member.findFirst({ where: { memberId: memberUUID } });
  }
  if (!member && openid) {
    member = await prisma.member.findUnique({ where: { wechatOpenId: openid } });
  }

  if (!member) {
    // 找不到会员也要返回 result:1 防止 refreshMemberInfo 清空 user 存储
    return res.json({ code: 0, result: 1, msg: 'success', retVal: { memberId: memberUUID || '', memberToken: '' } });
  }

  const token = generateToken(member);
  await prisma.member.update({ where: { id: member.id }, data: { memberToken: token } });

  return res.json({
    code: 0, result: 1, msg: 'success',
    data: { memberId: member.memberId, memberToken: token },
    retVal: {
      ...formatMember(member),
      openid: member.wechatOpenId || openid || '',
      session_key: '',
      memberToken: token,
      memberId: member.memberId,
      nickName: member.nickname || '云舍村家人',
    },
  });
};

// 员工登录（使用管理员 JWT，包含权限信息）
const staffLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return error(res, '请提供账号和密码');

  const staff = await prisma.staff.findUnique({ where: { username } }).catch(() => null);
  if (!staff || staff.status !== 1) return error(res, '账号不存在或已禁用');

  const valid = await bcrypt.compare(password, staff.password);
  if (!valid) return error(res, '密码错误');

  const permissions = staff.permissions ? JSON.parse(staff.permissions) : [];
  const token = jwt.sign(
    { id: staff.id, username: staff.username, role: staff.role, permissions, isStaff: true },
    config.adminJwt.secret,
    { expiresIn: config.adminJwt.expiresIn }
  );

  await prisma.staff.update({ where: { id: staff.id }, data: { lastLoginAt: new Date() } }).catch(() => {});

  return success(res, {
    token,
    admin: { id: staff.id, username: staff.username, name: staff.name, role: staff.role, permissions, isStaff: true },
  });
};

// 绑定手机号（微信用户绑定手机，或更换手机；若手机号已有账号则合并）
const bindPhone = async (req, res) => {
  const { phone, code } = req.body;
  if (!phone || !code) return error(res, '请提供手机号和验证码');
  if (!/^1\d{10}$/.test(phone)) return error(res, '手机号格式不正确');

  // 验证验证码
  const now = new Date();
  const vc = await prisma.verifyCode.findFirst({ where: { phone, used: false, expiresAt: { gt: now } }, orderBy: { createdAt: 'desc' } });
  if (!vc || vc.code !== code) return error(res, '验证码错误或已过期');
  await prisma.verifyCode.update({ where: { id: vc.id }, data: { used: true } });

  const currentMember = await prisma.member.findUnique({ where: { id: req.member.id } });
  if (!currentMember) return error(res, '用户不存在');

  // 检查该手机号是否已有账号
  const existingByPhone = await prisma.member.findFirst({ where: { phone, id: { not: currentMember.id } } });
  if (existingByPhone) {
    // 合并账号：把当前账号（微信登录）的 openid 合并到手机账号
    if (currentMember.wechatOpenId && !existingByPhone.wechatOpenId) {
      await prisma.member.update({
        where: { id: existingByPhone.id },
        data: { wechatOpenId: currentMember.wechatOpenId, avatar: currentMember.avatar || existingByPhone.avatar, nickname: existingByPhone.nickname || currentMember.nickname }
      });
    }
    // 生成新 token for merged account
    const token = jwt.sign({ id: existingByPhone.id, memberId: existingByPhone.memberId, phone: existingByPhone.phone }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
    await prisma.member.update({ where: { id: existingByPhone.id }, data: { memberToken: token } });
    return success(res, { merged: true, msg: '已合并到原有账号', memberToken: token, memberId: existingByPhone.memberId }, '账号已合并');
  }

  // 直接绑定手机号
  const token = generateToken({ ...currentMember, phone });
  await prisma.member.update({ where: { id: currentMember.id }, data: { phone, memberToken: token } });
  return success(res, { phone, memberToken: token }, '手机号绑定成功');
};

// 一键登录（微信 getPhoneNumber open-type 流程，memberLogin.js 使用）
// authData: { code, encryptedData, iv, sessionKey, phoneType, openid, nickname }
// 前端期望响应: { success:true, data: { isNew, member } }，token 放在响应头
const loginByAuthorization = async (req, res) => {
  const { authData = {}, loginType } = req.body || {};
  const { openid, code, nickname } = authData;

  try {
    const wxCfg = await getWechatConfig();
    let resolvedOpenid = openid;

    // 没有 openid 但有 code，尝试用 code 换 openid
    if (!resolvedOpenid && code && wxCfg.appSecret) {
      try {
        const wxRes = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
          params: { appid: wxCfg.appId, secret: wxCfg.appSecret, js_code: code, grant_type: 'authorization_code' },
          timeout: 8000,
        });
        if (!wxRes.data.errcode) resolvedOpenid = wxRes.data.openid;
      } catch (_) {}
    }

    // 开发模式：无 openid 时用 code 派生
    if (!resolvedOpenid) {
      resolvedOpenid = 'dev_openid_' + (code || 'unknown').slice(0, 16);
    }

    let isNew = false;
    let member = await prisma.member.findUnique({ where: { wechatOpenId: resolvedOpenid } });
    if (!member) {
      isNew = true;
      member = await prisma.member.create({
        data: { memberId: uuidv4(), wechatOpenId: resolvedOpenid, cardLevel: '普通会员', nickname: nickname || null },
      });
    } else if (nickname && !member.nickname) {
      member = await prisma.member.update({ where: { id: member.id }, data: { nickname } });
    }

    const token = generateToken(member);
    await prisma.member.update({ where: { id: member.id }, data: { memberToken: token } });

    const memberData = formatMember({ ...member, memberToken: token });

    // 把 token 写入响应头（memberLogin.js 从 headers.accessToken 读取）
    res.setHeader('accessToken', token);
    res.setHeader('refreshToken', token);

    return res.json({
      success: true,
      data: { isNew, member: memberData },
    });
  } catch (err) {
    console.error('loginByAuthorization error:', err.message);
    return res.status(500).json({ success: false, message: '登录失败: ' + err.message });
  }
};

module.exports = { wechatLogin, sendVerifyCode, loginByMobileCode, refreshToken, logout, adminLogin, memberLoginOpen, staffLogin, bindPhone, generateCaptcha, verifyCaptcha, loginByAuthorization };
