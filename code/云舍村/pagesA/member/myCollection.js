!function(){
'use strict';
const cfg=require('../../utils/config.js'),BASE=cfg.config.baseUrlmall||'http://localhost:3000/api';
function gt(){try{var u=wx.getStorageSync('user');return u&&u.memberToken?u.memberToken:''}catch(e){return ''}}
Page({
data:{list:[],loading:true},
onLoad:function(){this.load()},
onShow:function(){this.load()},
load:function(){
var s=this;
wx.request({url:BASE+'/member/all-collections',method:'GET',header:{'Authorization':'Bearer '+gt()},
success:function(res){
var d=res.data;var list=(d&&d.code===0&&d.data&&d.data.list)?d.data.list:[];
s.setData({list:list,loading:false});
},fail:function(){s.setData({loading:false})}});
},
goDetail:function(e){
var item=this.data.list[e.currentTarget.dataset.idx];
if(!item)return;
if(item.url)wx.navigateTo({url:item.url,fail:function(){wx.reLaunch({url:item.url})}});
},
remove:function(e){
var s=this,id=e.currentTarget.dataset.id;
wx.showModal({title:'取消收藏',content:'确认取消收藏？',success:function(r){
if(!r.confirm)return;
wx.request({url:BASE+'/shop/deleteGoodsCollection.json',method:'POST',data:{goodsId:id},header:{'Authorization':'Bearer '+gt(),'Content-Type':'application/json'},success:function(){s.load()},fail:function(){}});
}});
},
});}();
