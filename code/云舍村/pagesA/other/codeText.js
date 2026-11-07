!function() {
  'use strict';
  const cfg = require('../../utils/config.js');
  const BASE = cfg.config.baseUrlmall || 'http://localhost:3000/api';

  // 前端协议 code → 后台 CMS pageCode
  const CMS_CODE = {
    rule: 'user_agreement',
    PrivacyRule: 'privacy_policy',
    reservationProtocol: 'member_policy',
  };

  const DEFAULT_CONTENT = {
    user_agreement: `
      <section><h2>云舍村用户协议</h2><p>欢迎您使用云舍村小程序。请您在使用我们的服务前仔细阅读本协议。您登录、浏览、提交订单或使用其他服务，即表示您已阅读并同意遵守本协议及页面公示的相关规则。</p></section>
      <section><h3>一、服务内容</h3><p>云舍村提供村落信息展示、住宿及旅游预订、特色活动、商城、会员、订单和客户服务等功能。具体服务内容、库存、价格、开放时间及履约安排，以页面展示、订单信息和双方确认内容为准。</p></section>
      <section><h3>二、账号与信息</h3><p>使用账号及相关服务时，请提供真实、准确、完整的信息，并在信息发生变化时及时更新。请妥善保管您的账号和验证信息，不得出租、出借或转让账号。发现账号异常或存在安全风险时，请及时联系我们。</p></section>
      <section><h3>三、预订与支付</h3><p>提交订单前，请仔细核对产品、日期、数量、入住人或出行人、联系方式及订单金额。需要支付的订单，请在页面提示的时限内完成支付。订单是否成立以及具体履约安排，以订单确认信息为准。请勿提交虚假订单或实施其他干扰正常交易的行为。</p></section>
      <section><h3>四、取消、变更与退款</h3><p>订单的取消、变更和退款规则，以对应产品页面、订单详情及预约须知为准。如需申请取消或变更，请通过小程序页面或客服渠道提交。退款金额和到账时间以订单审核及实际支付渠道处理结果为准。</p></section>
      <section><h3>五、用户行为规范</h3><p>使用本服务时，请遵守法律法规和公序良俗，不得侵犯他人合法权益，不得干扰小程序及服务的正常运行，不得利用本服务从事欺诈、恶意刷单、未经授权的转售或其他违法违规活动。</p></section>
      <section><h3>六、隐私与知识产权</h3><p>我们将在提供服务的必要范围内处理您的个人信息，具体规则请参见《隐私政策》。小程序及云舍村相关内容中的文字、图片、标识和其他素材，未经合法授权不得擅自复制、传播或用于商业用途。</p></section>
      <section><h3>七、服务变更与责任</h3><p>我们可能根据业务需要对服务内容进行调整，并通过页面展示或其他合理方式告知。我们将尽合理努力保障服务稳定，因不可抗力、平台维护或支付、通信等第三方服务异常造成影响的，将在合理范围内协助处理，并依法承担相应责任。</p></section>
      <section><h3>八、协议更新与联系我们</h3><p>我们可能根据服务变化和法律法规要求更新本协议，并通过小程序页面展示。更新后的协议自公布之日起生效，您继续使用相关服务即表示接受更新后的内容。如您对本协议或订单服务有疑问，请致电 0736-7070666 与我们联系。</p></section>
    `,
    privacy_policy: `
      <section><h2>隐私政策</h2><p>感谢您选择云舍村为您的度假目的地。我们诚挚地致力于为您提供卓越的度假体验。为了确保您的隐私得到最大程度的保护，我们编制了详尽的隐私政策，以便您全面了解我们如何收集、使用、共享和保护您的个人信息。</p></section>
      <section><h3>信息收集与使用</h3><p>在使用云舍村服务时，我们可能会收集多样化的个人信息，包括但不限于姓名、联系方式、信用卡信息、偏好设置、身份证明文件等。这些信息将用于订单处理、住宿安排、特色活动提供等服务；我们也可能用于市场研究、用户行为分析，以优化服务和满足用户需求。</p><p>为确保服务符合您的期望，我们可能收集房间喜好、餐饮口味等偏好信息，以提供更符合您期望的个性化度假体验。</p></section>
      <section><h3>信息保护</h3><p>我们采用数据加密、访问控制、网络安全监控等安全措施，保护您的个人信息免受未经授权的访问、使用、披露或破坏。我们定期进行风险评估和安全审查，并开展员工信息安全意识培训。只有在必要业务运作中、经合法授权的工作人员才能访问您的个人信息。</p></section>
      <section><h3>信息共享与披露</h3><p>我们将您的个人信息视为高度机密。除非经您明确同意或法律法规明文规定，我们不会将个人信息分享给第三方。与合作伙伴的信息共享遵循法律法规，并在明确目的下保障同等水平的信息保护。为提供支付处理、客户支持、市场营销等服务，可能与第三方服务提供商共享必要信息；我们将确保这些服务提供商同样遵循高标准信息保护措施。</p></section>
      <section><h3>未成年人隐私保护</h3><p>我们的服务主要面向成年人。对于未满 18 岁的未成年人，建议在监护人陪同和同意下使用服务。我们不会故意收集未成年人个人信息；如发现错误收集，将立即删除。</p></section>
      <section><h3>隐私政策的修改</h3><p>我们可能根据业务发展、技术更新或法规要求修改本政策。发生重大变更时，将通过适当方式通知您，并提供更新后政策链接。</p></section>
      <section><h3>联系我们</h3><p>如对本政策有疑问、建议或投诉，请致电 +86 0736-7070666。我们将竭力解答，并持续改进隐私政策和数据保护措施。感谢您耐心阅读，云舍村期待与您一同共度世外桃源的美好时光。</p></section>
    `,
  };

  Page({
    data: { content: '', loading: true },

    onLoad: function(options) {
      const code = options.code || '';
      const title = options.title ? decodeURIComponent(options.title) : '';
      const pageCode = CMS_CODE[code] || code;
      const defaultContent = DEFAULT_CONTENT[pageCode] || '';
      if (title) wx.setNavigationBarTitle({ title: title });
      wx.request({
        url: BASE + '/cms/' + pageCode,
        method: 'GET',
        success: res => {
          const d = res.data;
          const content = d && d.code === 0 && d.data && d.data.content ? d.data.content : '';
          this.setData({ content: content || defaultContent, loading: false });
        },
        fail: () => this.setData({ content: defaultContent, loading: false }),
      });
    },
  });
}();
