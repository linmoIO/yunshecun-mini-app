! function() {
  "use strict";
  const e = require("../services/common.js"),
    a = {
      "/": {
        pageName: "view_book_page",
        pageTitle: "预订页"
      },
      "pages/travel/index": {
        pageName: "view_book_page",
        pageTitle: "预订页"
      },
      "pages/trip/index": {
        pageName: "view_traveling_page",
        pageTitle: "出发页"
      },
      "pages/member/memberCenter": {
        pageName: "view_user_page",
        pageTitle: "我的"
      },
      "pages/member/orderList": {},
      "pages/mall/webview": {
        pageName: "view_web_page",
        pageTitle: "微页面"
      },
      "pages/search/result": {
        pageName: "view_search_result_page",
        pageTitle: "搜索结果页"
      },
      "pages/search/result-hotel": {
        pageName: "view_search_result_page",
        pageTitle: "搜索结果页（酒店）"
      },
      "pages/travel/destinations": {
        pageName: "view_all_destinations_page",
        pageTitle: "全部目的地页"
      },
      "pagesA/member/memberInfo": {
        pageName: "view_user_page",
        pageTitle: "个人信息页"
      },
      "pages/member/memberLogin": {
        pageName: "view_login_page",
        pageTitle: "登录页"
      },
      "pagesB/travel/travelDetail": {
        pageName: "view_travel_detail_page",
        pageTitle: "旅行产品详情页"
      },
      "pagesB/travel/confirmOrder": {
        pageName: "view_confirm_order_page",
        pageTitle: "确认订单页（旅行、通兑券）"
      },
      "pagesB/travel/orderGuest": {
        pageName: "view_travelers_page",
        pageTitle: "旅行产品-完善出行人页"
      },
      "pagesB/travel/orderDetail": {
        pageName: "view_order_detail_page",
        pageTitle: "订单详情页（旅行、通兑券）"
      },
      "pagesA/member/myCollection": {
        pageName: "view_collection_page",
        pageTitle: "我的收藏页"
      },
      "pagesB/other/pay": {
        pageName: "view_pay_page",
        pageTitle: "支付页"
      },
      "pagesB/travel/paySuccess": {
        pageName: "view_pay_succeed_page",
        pageTitle: "支付成功页"
      },
      "pagesC/order/hotelList": {
        pageName: "view_hotel_list_page",
        pageTitle: "酒店列表（搜索）"
      },
      "pagesC/order/hotel": {
        pageName: "view_hotel_detail_page",
        pageTitle: "酒店详情页"
      },
      "pagesC/order/orderInfo": {
        pageName: "view_order_detail_page",
        pageTitle: "订单详情页（酒店）"
      },
      "pagesC/order/bookInfo": {
        pageName: "view_confirm_order_page",
        pageTitle: "确认订单页（单订房）"
      },
      "pagesB/travel/theme": {
        pageName: "view_market_detail_page",
        pageTitle: "营销产品主题页"
      },
      "pagesB/travel/searchResult": {
        pageName: "view_search_page",
        pageTitle: "搜索结果页（旅行）"
      },
      "pages/search/index": {
        pageName: "view_search_page",
        pageTitle: "搜索页（新）"
      },
      "pagesE/dailyActivity/dailyActivityDetail": {
        pageName: "view_day_activity_detail_page",
        pageTitle: "日活动详情页"
      },
      "pagesE/dailyActivity/submitOrder": {
        pageName: "view_confirm_order_page",
        pageTitle: "确认订单页（日活动）"
      },
      "pagesE/dailyActivity/dailyOrderDetail": {
        pageName: "view_order_detail_page",
        pageTitle: "订单详情页（日活动）"
      },
      "pagesTravelAssistant/journey/recommend": {
        pageName: "veiw_travel_assistant_recommend_page",
        pageTitle: "行程助手-行程推荐页"
      },
      "pagesTravelAssistant/journey/edit": {
        pageName: "veiw_travel_assistant_page",
        pageTitle: "行程助手-DIY页 "
      },
      "pagesCommon/content/audio": {
        pageName: "view_traveling_content_detail_page",
        pageTitle: "推荐内容详情页-音频"
      },
      "pagesCommon/content/video": {
        pageName: "view_traveling_content_detail_page",
        pageTitle: "推荐内容详情页-视频"
      },
      "pagesMicro/index": {
        pageName: "view_mini_micro_page",
        pageTitle: "微页面"
      }
    };

  function t(e) {
    const a = {
        ...e
      },
      t = ["/"];
    return Object.keys(a).forEach(e => {
      "/" !== e && t.forEach(t => {
        a[`${t}${e}`] = a[e]
      })
    }), a
  }
  const g = {
    "aplus-auto-clk": [{
      cssSelector: ".click_auto_control",
      logkey: "aplus_auto_clk",
      props: ["data-button-name"]
    }],
    pageConfig: t(a)
  };
  exports.autoConfig = g, exports.refreshPageConfig = async function(g) {
    let i = {
        ...a
      },
      p = null,
      r = 0,
      l = !1;
    const s = () => {
      p && clearInterval(p), l || r >= 10 ? l = !0 : (g.aplus_queue ? (console.log("[utils/aplus] {refreshPageConfig} updateSDKConfig:", i), g.aplus_queue.push({
        action: "aplus.setMetaInfo",
        arguments: ["pageConfig", i]
      })) : p = setInterval(s, 1e3), r++)
    };
    try {
      const g = (new Date).setMinutes(0, 0, 0).valueOf(),
        p = await e.refreshQtPageConfigData({
          timeStamp: g
        });
      i = t({
        ...a,
        ...p
      }), console.log("[utils/aplus] aplusPageConfig {api.refreshPageConfig} res:", p), s()
    } catch (e) {
      throw new Error("[utils/aplus] aplusPageConfig {refreshPageConfig} err", e)
    }
  }
}();