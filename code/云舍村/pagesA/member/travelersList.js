!function(){
'use strict';
const cfg=require('../../utils/config.js'),BASE=cfg.config.baseUrlmall||'http://localhost:3000/api';
function gt(){try{var u=wx.getStorageSync('user');return u&&u.memberToken?u.memberToken:''}catch(e){return ''}}
function req(m,url,d){return new Promise(function(r,j){wx.request({url:BASE+url,method:m,data:d||{},header:{'Authorization':'Bearer '+gt(),'Content-Type':'application/json'},success:function(res){var x=res.data;if(x&&x.code===0)r(x.data);else j(new Error((x&&x.msg)||'失败'))},fail:j})})}
var EF={name:'',phone:'',email:'',idType:'身份证',idNumber:'',birthday:'',gender:'',nationality:'中国'};
Page({
data:{list:[],editId:null,form:Object.assign({},EF),saving:false,loading:true},
__l:function(){},
onLoad:function(){this.loadList()},
onShow:function(){this.loadList()},
loadList:function(){var s=this;req('GET','/member/travelers').then(function(d){s.setData({list:d.list||[],loading:false})}).catch(function(){s.setData({loading:false})})},
newTraveler:function(){this.setData({editId:null,form:Object.assign({},EF)});wx.pageScrollTo({selector:'#travelerForm',duration:300})},
editTraveler:function(e){var t=this.data.list[e.currentTarget.dataset.idx];if(!t)return;this.setData({editId:t.id,form:{name:t.name||'',phone:t.phone||'',email:t.email||'',idType:t.idType||'身份证',idNumber:t.idNumber||'',birthday:t.birthday||'',gender:String(t.gender||''),nationality:t.nationality||'中国'}});wx.pageScrollTo({selector:'#travelerForm',duration:300})},
onInput:function(e){var k=e.currentTarget.dataset.key,u={};u['form.'+k]=e.detail.value;this.setData(u)},
save:function(){if(this.data.saving)return;var f=this.data.form;if(!f.name.trim()){wx.showToast({title:'请填写姓名',icon:'none'});return}
var s=this,id=this.data.editId;s.setData({saving:true});
var p=id?req('PUT','/member/travelers/'+id,f):req('POST','/member/travelers',f);
p.then(function(){s.setData({saving:false,editId:null,form:Object.assign({},EF)});wx.showToast({title:'保存成功',icon:'success'});s.loadList()}).catch(function(e){s.setData({saving:false});wx.showToast({title:(e&&e.message)||'失败',icon:'none'})})},
cancel:function(){this.setData({editId:null,form:Object.assign({},EF)})},
del:function(e){var s=this,id=e.currentTarget.dataset.id;wx.showModal({title:'确认删除',content:'确定删除该出行人？',success:function(r){if(!r.confirm)return;req('DELETE','/member/travelers/'+id).then(function(){wx.showToast({title:'已删除',icon:'success'});s.loadList()})}})},
});}();
