!function(){
'use strict';
const cfg=require('../../utils/config.js'),BASE=cfg.config.baseUrlmall||'http://localhost:3000/api';
var DEFAULT_FAQ=[
{id:1,question:'如何预订旅游套餐？',answer:'进入「全部产品」，选择心仪套餐，选择出发日期和人数，填写联系人信息后提交订单，完成支付即可。'},
{id:2,question:'可以取消订单吗？',answer:'出发前72小时可申请免费取消；出发前24-72小时取消收取20%手续费；出发前24小时内不可取消。'},
{id:3,question:'如何获得积分？',answer:'每消费1元获得1积分。完成实名认证额外获得100积分。积分可在下次预订时折抵现金使用。'},
{id:4,question:'会员等级如何升级？',answer:'普通会员消费满5000元升级为银卡会员，消费满20000元升级为金卡会员，消费满50000元升级为铂金会员。高等级会员享受更多折扣和专属服务。'},
{id:5,question:'如何联系客服？',answer:'可通过以下方式联系我们：\n1. 小程序在线客服（首页右下角）\n2. 客服热线：400-XXXX-XXXX（9:00-21:00）\n3. 提交DIY定制行程需求，顾问会主动联系您。'},
{id:6,question:'风物商品多久发货？',answer:'下单并付款成功后，一般1-3个工作日内发货。节假日期间可能延迟，具体以物流通知为准。'},
{id:7,question:'发票如何申请？',answer:'进入「我的」→「开票信息」，选择需要开票的订单，填写发票抬头和接收邮箱，提交申请后3-5个工作日内处理。'},
];
Page({
data:{items:[],loading:true},
__l:function(){},
onLoad:function(){this.loadFAQ()},
loadFAQ:function(){
var s=this;
wx.request({url:BASE+'/cms/faq',method:'GET',success:function(res){
var d=res.data;var items=[];
if(d&&d.code===0&&d.data&&d.data.content){try{items=JSON.parse(d.data.content)}catch(e){items=DEFAULT_FAQ}}
else items=DEFAULT_FAQ;
items=items.map(function(x){return Object.assign({},x,{open:false})});
s.setData({items:items,loading:false});
},fail:function(){
var items=DEFAULT_FAQ.map(function(x){return Object.assign({},x,{open:false})});
s.setData({items:items,loading:false});
}});
},
toggle:function(e){
var idx=e.currentTarget.dataset.idx;
var items=this.data.items.slice();
items[idx].open=!items[idx].open;
this.setData({items:items});
},
goChat:function(){wx.navigateTo({url:'/pagesA/other/chat'})},
});}();
