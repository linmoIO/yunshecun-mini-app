'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');
const config = require('../config');
const { success, error } = require('../utils/response');

const prisma = new PrismaClient();

const getSysConfigMap = async (keys) => {
  const rows = await prisma.sysConfig.findMany({ where: { key: { in: keys } } });
  return Object.fromEntries(rows.map(r => [r.key, r.value || '']));
};

const isTruthy = (v) => ['1', 'true', 'T', 'Y', 'yes', 'on'].includes(String(v || '').trim());

const hmac = (key, msg, encoding) => crypto.createHmac('sha256', key).update(msg).digest(encoding);
const sha256 = (msg) => crypto.createHash('sha256').update(msg).digest('hex');

const callTencentCloudApi = async ({ service, host, action, version, region = 'ap-guangzhou', payload, secretId, secretKey }) => {
  if (!secretId || !secretKey) throw new Error('腾讯云 SecretId/SecretKey 未配置');
  const timestamp = Math.floor(Date.now() / 1000);
  const date = new Date(timestamp * 1000).toISOString().slice(0, 10);
  const body = JSON.stringify(payload || {});
  const canonicalHeaders = `content-type:application/json; charset=utf-8\nhost:${host}\nx-tc-action:${action.toLowerCase()}\n`;
  const signedHeaders = 'content-type;host;x-tc-action';
  const canonicalRequest = ['POST', '/', '', canonicalHeaders, signedHeaders, sha256(body)].join('\n');
  const credentialScope = `${date}/${service}/tc3_request`;
  const stringToSign = ['TC3-HMAC-SHA256', timestamp, credentialScope, sha256(canonicalRequest)].join('\n');
  const secretDate = hmac(`TC3${secretKey}`, date);
  const secretService = hmac(secretDate, service);
  const secretSigning = hmac(secretService, 'tc3_request');
  const signature = hmac(secretSigning, stringToSign, 'hex');
  const authorization = `TC3-HMAC-SHA256 Credential=${secretId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const resp = await axios.post(`https://${host}`, body, {
    timeout: 10000,
    headers: {
      Authorization: authorization,
      'Content-Type': 'application/json; charset=utf-8',
      Host: host,
      'X-TC-Action': action,
      'X-TC-Timestamp': timestamp,
      'X-TC-Version': version,
      'X-TC-Region': region,
    },
  });
  const response = resp.data?.Response || {};
  if (response.Error) throw new Error(`${response.Error.Code}: ${response.Error.Message}`);
  return response;
};

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

const createLocalCaptcha = async (sessionId) => {
  const svgCaptcha = require('svg-captcha');
  const captcha = svgCaptcha.create({ size: 4, ignoreChars: '0o1l', noise: 1, color: true });
  const captchaId = sessionId || uuidv4();
  const expiresAt = new Date(Date.now() + 10 * 60000);
  await prisma.sysConfig.deleteMany({ where: { key: `captcha_${captchaId}` } }).catch(() => {});
  await prisma.sysConfig.create({
    data: { key: `captcha_${captchaId}`, value: JSON.stringify({ code: captcha.text, expiresAt: expiresAt.toISOString() }) },
  });
  return { captchaId, sessionId: captchaId, image: captcha.data, path: `data:image/svg+xml;utf8,${encodeURIComponent(captcha.data)}` };
};

// 生成图形验证码（本地开发兜底）
const generateCaptcha = async (req, res) => {
  try {
    return success(res, await createLocalCaptcha(req.query.sessionId || req.body?.sessionId), '图形验证码已生成');
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
    let storedCode = stored.value;
    let expiresAt = null;
    try {
      const parsed = JSON.parse(stored.value);
      storedCode = parsed.code;
      expiresAt = parsed.expiresAt ? new Date(parsed.expiresAt) : null;
    } catch (_) {}
    if (expiresAt && expiresAt <= new Date()) {
      await prisma.sysConfig.delete({ where: { key: `captcha_${captchaId}` } }).catch(() => {});
      return false;
    }
    // 不区分大小写
    const match = String(storedCode || '').toLowerCase() === userCode.toLowerCase().trim();
    // 验证成功后删除（一次性）
    if (match) {
      await prisma.sysConfig.delete({ where: { key: `captcha_${captchaId}` } }).catch(() => {});
    }
    return match;
  } catch {
    return false;
  }
};

const verifyHumanCaptcha = async (params, cfg) => {
  const provider = (cfg.captcha_provider || 'local').toLowerCase();
  if (provider === 'none') return true;
  if (provider === 'tencent') {
    const ticket = params.ticket || params.captchaTicket;
    const randstr = params.randstr || params.captchaRandstr;
    if (!ticket || !randstr) return false;
    const resp = await callTencentCloudApi({
      service: 'captcha',
      host: 'captcha.tencentcloudapi.com',
      action: 'DescribeCaptchaResult',
      version: '2019-07-22',
      region: cfg.captcha_tencent_region || 'ap-guangzhou',
      secretId: cfg.captcha_tencent_secret_id,
      secretKey: cfg.captcha_tencent_secret_key,
      payload: {
        CaptchaType: Number(cfg.captcha_tencent_type || 9),
        Ticket: ticket,
        UserIp: params.userIp || params.ip || '',
        Randstr: randstr,
        CaptchaAppId: Number(cfg.captcha_tencent_app_id),
        AppSecretKey: cfg.captcha_tencent_app_secret_key,
      },
    });
    return Number(resp.CaptchaCode) === 1;
  }
  const captchaId = params.captchaId || params.sessionId;
  const userCode = params.captchaCode || params.identifyCode;
  return verifyCaptcha(captchaId, userCode);
};

// 短信宝发送 SMS（保留兼容）
const sendSmsBao = async (phone, content, cfg) => {
  if (!cfg.sms_user || !cfg.sms_pass) throw new Error('短信服务未配置，请在后台-系统设置-短信配置中填写账号信息');
  const passHash = crypto.createHash('md5').update(cfg.sms_pass).digest('hex');
  const sign = cfg.sms_sign ? `【${cfg.sms_sign}】` : '【云舍村】';
  const smsContent = sign + content;
  const url = `https://api.smsbao.com/sms?u=${encodeURIComponent(cfg.sms_user)}&p=${passHash}&m=${phone}&c=${encodeURIComponent(smsContent)}`;
  const res = await axios.get(url, { timeout: 8000 });
  const code = String(res.data).trim();
  const SMS_ERRORS = { '0':'成功','30':'账号不存在','40':'账号密码错','41':'余额不足','43':'IP限制','50':'内容含敏感词','51':'手机号非法','52':'短信过期','53':'发送数量超限','54':'信息有误' };
  if (code !== '0') throw new Error('短信发送失败：' + (SMS_ERRORS[code] || `错误码${code}`));
};

const sendTencentSms = async (phone, code, cfg) => {
  const templateParams = (cfg.sms_tencent_template_params || '{code}').split(',').map(p => {
    const key = p.trim();
    return key === '{code}' || key === 'code' ? code : key;
  });
  const resp = await callTencentCloudApi({
    service: 'sms',
    host: 'sms.tencentcloudapi.com',
    action: 'SendSms',
    version: '2021-01-11',
    region: cfg.sms_tencent_region || 'ap-guangzhou',
    secretId: cfg.sms_tencent_secret_id,
    secretKey: cfg.sms_tencent_secret_key,
    payload: {
      PhoneNumberSet: [`+86${phone}`],
      SmsSdkAppId: cfg.sms_tencent_sdk_app_id,
      SignName: cfg.sms_tencent_sign_name,
      TemplateId: cfg.sms_tencent_template_id,
      TemplateParamSet: templateParams,
    },
  });
  const status = resp.SendStatusSet?.[0];
  if (status && status.Code && status.Code !== 'Ok') {
    throw new Error(`${status.Code}: ${status.Message || '短信发送失败'}`);
  }
};

const sendLoginSms = async (phone, code, cfg) => {
  const provider = (cfg.sms_provider || 'smsbao').toLowerCase();
  if (provider === 'tencent') return sendTencentSms(phone, code, cfg);
  if (provider === 'smsbao') return sendSmsBao(phone, `您的验证码是：${code}，5分钟内有效，请勿泄露。`, cfg);
  if (provider === 'dev') return;
  throw new Error(`不支持的短信服务商：${provider}`);
};

// 发送短信验证码（需先验证图形验证码）
const sendVerifyCode = async (req, res) => {
  const params = { ...(req.query || {}), ...(req.body || {}) };
  const { mobile, phone, sessionId } = params;
  const phoneNo = mobile || phone;

  const cfg = await getSysConfigMap([
    'sms_provider','sms_dev_mode','sms_user','sms_pass','sms_sign',
    'sms_tencent_secret_id','sms_tencent_secret_key','sms_tencent_sdk_app_id',
    'sms_tencent_sign_name','sms_tencent_template_id','sms_tencent_template_params','sms_tencent_region',
    'captcha_provider','captcha_required','captcha_tencent_secret_id','captcha_tencent_secret_key',
    'captcha_tencent_app_id','captcha_tencent_app_secret_key','captcha_tencent_region','captcha_tencent_type',
  ]);

  // 前端图形验证码组件初始化时只传 sessionId，不传手机号；这里返回验证码图片。
  if (!phoneNo && sessionId) {
    const captcha = await createLocalCaptcha(sessionId);
    return res.json({ code: 0, result: 1, msg: 'success', retVal: { path: captcha.path, captchaId: captcha.captchaId } });
  }

  if (!phoneNo) return error(res, '请提供手机号');
  if (!/^1\d{10}$/.test(phoneNo)) return error(res, '手机号格式不正确');

  if (isTruthy(cfg.captcha_required) && !params.captchaVerified) {
    const captchaValid = await verifyHumanCaptcha({ ...params, userIp: req.ip }, cfg);
    if (!captchaValid) return error(res, '人机验证失败或已过期');
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
    await sendLoginSms(phoneNo, code, cfg);
    console.log(`[SMS] 已发送验证码到 ${phoneNo}`);
  } catch (smsErr) {
    console.warn(`[SMS] 短信发送失败：${smsErr.message}`);
    if (isTruthy(cfg.sms_dev_mode) || (cfg.sms_provider || '').toLowerCase() === 'dev') {
      return success(res, { mobile: phoneNo, devCode: code }, '验证码已发送（开发模式）');
    }
    return error(res, '短信发送失败，请检查后台短信配置');
  }

  return success(res, { mobile: phoneNo }, '验证码已发送');
};

// 兼容前端旧流程：校验图形验证码并发送短信，返回 retVal 作为 verifyId。
const verifyIdentifyCode = async (req, res) => {
  const params = { ...(req.query || {}), ...(req.body || {}) };
  const phoneNo = params.mobile || params.phone;
  if (!phoneNo) return error(res, '请提供手机号');
  const cfg = await getSysConfigMap([
    'sms_provider','sms_dev_mode','sms_user','sms_pass','sms_sign',
    'sms_tencent_secret_id','sms_tencent_secret_key','sms_tencent_sdk_app_id',
    'sms_tencent_sign_name','sms_tencent_template_id','sms_tencent_template_params','sms_tencent_region',
    'captcha_provider','captcha_required','captcha_tencent_secret_id','captcha_tencent_secret_key',
    'captcha_tencent_app_id','captcha_tencent_app_secret_key','captcha_tencent_region','captcha_tencent_type',
  ]);
  const captchaValid = await verifyHumanCaptcha({ ...params, captchaId: params.sessionId, captchaCode: params.identifyCode, userIp: req.ip }, cfg);
  if (!captchaValid) return res.json({ code: -1, result: 0, msg: '人机验证失败或已过期', data: null });

  req.query = { ...params, mobile: phoneNo, captchaVerified: true };
  req.body = { ...params, mobile: phoneNo, captchaVerified: true };
  const originalJson = res.json.bind(res);
  res.json = (payload) => {
    if (payload?.code === 0) {
      return originalJson({ code: 0, result: 1, msg: payload.msg || 'success', retVal: uuidv4(), data: payload.data });
    }
    return originalJson({ ...payload, result: 0 });
  };
  return sendVerifyCode(req, res);
};

// 手机号+验证码登录
const loginByMobileCode = async (req, res) => {
  const { mobile, phone, identifyCode, code, verifyCode, openid } = req.body || req.query;
  const phoneNo = mobile || phone;
  const verCode = identifyCode || code || verifyCode;

  if (!phoneNo || !verCode) return error(res, '请提供手机号和验证码');
  if (!/^1\d{10}$/.test(phoneNo)) return error(res, '手机号格式不正确');

  const record = await prisma.verifyCode.findFirst({
    where: { phone: phoneNo, code: verCode, used: false, expiresAt: { gt: new Date() } },
    orderBy: { createdAt: 'desc' },
  });

  if (!record) return error(res, '验证码错误或已过期');

  await prisma.verifyCode.update({ where: { id: record.id }, data: { used: true } });

  let member = await prisma.member.findUnique({ where: { phone: phoneNo } });
  if (!member) {
    member = await prisma.member.create({
      data: { memberId: uuidv4(), phone: phoneNo, wechatOpenId: openid || null, cardLevel: '普通会员' },
    });
  } else if (openid && !member.wechatOpenId) {
    member = await prisma.member.update({ where: { id: member.id }, data: { wechatOpenId: openid } });
  }

  const token = generateToken(member);
  member = await prisma.member.update({ where: { id: member.id }, data: { memberToken: token } });

  return success(res, {
    memberId: member.memberId,
    memberToken: token,
    memberInfo: formatMember(member),
  });
};

const loginByVerificationCode = async (req, res) => {
  const payload = { ...(req.query || {}), ...(req.body || {}) };
  req.body = {
    ...payload,
    mobile: payload.mobile || payload.phone,
    verifyCode: payload.verifyCode || payload.identifyCode || payload.code,
  };

  const originalJson = res.json.bind(res);
  res.json = (body) => {
    if (body?.code === 0) {
      const token = body.data?.memberToken || body.data?.memberInfo?.memberToken || '';
      if (token) {
        res.setHeader('accessToken', token);
        res.setHeader('refreshToken', token);
      }
      return originalJson({
        success: true,
        code: 0,
        data: {
          isNew: false,
          member: body.data?.memberInfo || {},
        },
      });
    }
    return originalJson({ success: false, code: body?.code || -1, message: body?.msg || '登录失败', msg: body?.msg || '登录失败' });
  };
  return loginByMobileCode(req, res);
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

    // 前端 tokenManager 需要成对保存 access/refresh token；当前 JWT 无独立刷新令牌，
    // 使用同一个轮换后的 JWT 维持现有会话契约。
    return success(res, { accessToken: newToken, refreshToken: newToken, tokenType: 'Bearer' });
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

module.exports = {
  wechatLogin,
  sendVerifyCode,
  verifyIdentifyCode,
  loginByMobileCode,
  loginByVerificationCode,
  refreshToken,
  logout,
  adminLogin,
  memberLoginOpen,
  staffLogin,
  bindPhone,
  generateCaptcha,
  verifyCaptcha,
  loginByAuthorization,
};
