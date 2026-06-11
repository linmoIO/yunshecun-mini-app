!function(){
'use strict';
const cfg=require('../../utils/config.js'),BASE=cfg.config.baseUrlmall||'http://localhost:3000/api';
function gt(){try{var u=wx.getStorageSync('user');return u&&u.memberToken?u.memberToken:''}catch(e){return ''}}
Page({
data:{phone:'',points:'',myPoints:0,submitting:false},
__l:function(){},
onLoad:function(){this.loadPoints()},
loadPoints:function(){
var s=this;
wx.request({url:BASE+'/member/memberInfo.json',method:'GET',header:{'Authorization':'Bearer '+gt()},
success:function(res){var d=res.data;if(d&&d.result===1&&d.retVal)s.setData({myPoints:d.retVal.points||0})},
fail:function(){}});
},
onInput:function(e){var k=e.currentTarget.dataset.key,u={};u[k]=e.detail.value;this.setData(u)},
submit:function(){
if(this.data.submitting)return;
var phone=this.data.phone.trim(),pts=parseInt(this.data.points);
if(!/^1\d{10}$/.test(phone)){wx.showToast({title:'请输入正确的手机号',icon:'none'});return}
if(!pts||pts<1){wx.showToast({title:'请输入转赠积分数量',icon:'none'});return}
if(pts>this.data.myPoints){wx.showToast({title:'积分余额不足，当前积分：'+this.data.myPoints,icon:'none'});return}
var s=this;s.setData({submitting:true});
wx.request({url:BASE+'/member/transfer-points',method:'POST',data:{targetPhone:phone,points:pts},
header:{'Authorization':'Bearer '+gt(),'Content-Type':'application/json'},
success:function(res){
s.setData({submitting:false});
var d=res.data;
if(d&&d.code===0){
wx.showModal({title:'转赠成功',content:d.msg||'积分已转赠',confirmText:'好的',showCancel:false,success:function(){s.setData({phone:'',points:''});s.loadPoints()}});
}else{wx.showToast({title:(d&&d.msg)||'转赠失败',icon:'none'})}
},fail:function(){s.setData({submitting:false});wx.showToast({title:'网络错误',icon:'none'})}});
},
});}();
