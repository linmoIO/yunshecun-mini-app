!function(){
'use strict';
const cfg=require('../../utils/config.js'),BASE=cfg.config.baseUrlmall||'http://localhost:3000/api';
function gt(){try{var u=wx.getStorageSync('user');return u&&u.memberToken?u.memberToken:''}catch(e){return ''}}
function req(m,url,d){return new Promise(function(r,j){wx.request({url:BASE+url,method:m,data:d||{},header:{'Authorization':'Bearer '+gt(),'Content-Type':'application/json'},success:function(res){var x=res.data;if(x&&x.code===0)r(x.data);else j(new Error((x&&x.msg)||'失败'))},fail:j})})}
Page({
data:{list:[],loading:true,phone:'',adding:false},
__l:function(){},
onLoad:function(){this.load()},
onShow:function(){this.load()},
load:function(){var s=this;req('GET','/member/benefit-links').then(function(d){s.setData({list:d.list||[],loading:false})}).catch(function(){s.setData({loading:false})})},
onInput:function(e){var k=e.currentTarget.dataset.key,u={};u[k]=e.detail.value;this.setData(u)},
addLink:function(){
if(this.data.adding)return;
var phone=this.data.phone.trim();
if(!/^1\d{10}$/.test(phone)){wx.showToast({title:'请输入正确的手机号',icon:'none'});return}
if(this.data.list.length>=3){wx.showToast({title:'最多绑定3位关联人',icon:'none'});return}
var s=this;s.setData({adding:true});
req('POST','/member/benefit-links',{targetPhone:phone}).then(function(){s.setData({adding:false,phone:''});wx.showToast({title:'关联成功',icon:'success'});s.load()}).catch(function(e){s.setData({adding:false});wx.showToast({title:(e&&e.message)||'添加失败',icon:'none'})})
},
unlink:function(e){
var s=this,id=e.currentTarget.dataset.id;
wx.showModal({title:'确认解除',content:'确定解除该关联人？',success:function(r){if(!r.confirm)return;req('DELETE','/member/benefit-links/'+id).then(function(){wx.showToast({title:'已解除',icon:'success'});s.load()})}})
},
});}();
