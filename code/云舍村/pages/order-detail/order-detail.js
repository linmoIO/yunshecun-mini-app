import dayjs from "../../miniprogram_npm/dayjs/index";
const {
    request
} = require("../../utils/request");

Page({
    data: {
        myScrollTop: 0,
        showIndex: null, //打开弹窗的对应下标
        height: '', //屏幕高度
        village: '',
        facilities: '',
        bathroom: '',
        roomId: 0,
        adultNumber: 0,
        childrenNumber: 0,
        homeNumber: 0,
        startTimestamp: 0,
        endTimestamp: 0,
        startDay: "",
        startMonth: "",
        endDay: "",
        endMonth: "",
        days: 0,
        startTimestamp: 0,
        endTimestamp: 0,
        price: "0.00",
        detailPayAmount: null,
        detailPayableAmount: null,
        roomNum: null,
        username: "",
        phone: "",
        remark: "",
        orderStatus: null,
        orderId: null,
        trig: false,
        trirs_puls: false,
        trirs_puls2: 'false',
        orderNo: '',
        orderTime: '',
        payChannel: '',
        expand_notes: true,
        radio1: false,
        radio2: false,
        radio3: true,
        policyWaring: false,
        save: '',
        showIndex: '0',//打开弹窗的对应下标
        height: '',//屏幕高度
        bottomDialogVisible: false,
        getmsg: "获取验证码",
        sendmsg: "sendmsg",
        Code_verify: "",
        smsKey: '',
        travel_project_all: '',
        discountAmount: '',
        payAmount: "",
        keyboardHeight: 0,
        isIos: wx.getSystemInfoSync().platform === 'ios',
        freeCancelTime: '',
        DomTop: true
    },
    
    onShareAppMessage() {
        return {
            title: '梦中的桃花源',
            path: '/pages/home/home',
            imageUrl: 'https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/img/applet_shar_img.png'
        }
    },
    nav: function () {
        wx.openLocation({
            latitude: 28.79133, //维度
            longitude: 111.442009, //经度
            name: "湖南省常德市桃花源风景区", //目的地定位名称
            scale: 15, //缩放比例
            address: "湖南省常德市桃花源风景区" //导航详细地址
        })
    },
    travel_project() {
        this.setData({
            showIndex: 1
        })
    },
    termPopup() {
        this.setData({
            showIndex: 3
        })
    },
    async mster() {
        var that = this;
        try {
            const res = await request({
                path: "/applet/room/project/list",
                method: "GET",
                data: {},
            });
            that.setData({
                travel_project_all: res.data
            })
        } catch (e) {
            console.log(e);
        }
        wx.hideLoading();
    },
    onReady() {
        var that = this;
        // 动态获取屏幕高度
        wx.getSystemInfo({
            success: (result) => {
                that.setData({
                    height: result.windowHeight
                });
            },
        })
    },
    makePhoneCall(event) {
        const phoneNumber = event.currentTarget.dataset.tel; // 替换成要拨打的电话号码
        wx.makePhoneCall({
            phoneNumber: phoneNumber
        })
    },
    remember() {
        this.setData({
            radio2: !this.data.radio2
        })
        //隐藏红色条款提醒
        this.setData({
            policyWaring: false
        })
    },
    onLoad(options) {
        this.mster()
        const {
            adultNumber,
            childrenNumber,
            homeNumber,
            startTimestamp,
            endTimestamp,
            roomId,
            userNum,
            roomName,
            price,
            roomNum,
            orderId,
            village,
            facilities,
            bathroom
        } = options;
        const safeDecode = (value = "") => {
            try {
                return decodeURIComponent(value);
            } catch (error) {
                return value;
            }
        };
        wx.loadFontFace({
            // family: 'I.PenCrane-B',
            // source: 'url("https://yunshecun.oss-cn-guangzhou.aliyuncs.com/applet/font/I-PenCrane-B-2.ttf")',
            complete: function (res) {
                // console.log('插入字体');
                // console.log(res);
            },
            success: function (res) {
                // console.log('成功');
                // console.log(res);
            },

            fail: function (res) {
                // console.log('失败');
                // console.log(res);
            },
        })
        if (orderId) {
            this.setData({
                orderId
            });
            this.getOrderInfo(orderId);
        } else {
            const days = dayjs(+endTimestamp).diff(dayjs(+startTimestamp), "day");
            this.setData({
                adultNumber: +adultNumber,
                childrenNumber: +childrenNumber,
                homeNumber: +homeNumber,
                startTimestamp: +startTimestamp,
                endTimestamp: +endTimestamp,
                roomId: +roomId,
                userNum: +userNum,
                startDay: dayjs(+startTimestamp).format("MM-DD"),
                startMonth: dayjs(+startTimestamp).format("YYYY"),
                endDay: dayjs(+endTimestamp).format("DD"),
                endMonth: dayjs(+endTimestamp).format("YYYY-MM"),
                price: (+price).toFixed(2),
                roomNum: +roomNum,
                roomName: safeDecode(roomName),
                days,
                village: safeDecode(village),
                facilities: safeDecode(facilities),
                bathroom: safeDecode(bathroom)
            });

        }
        this.detail()
    },
    expand() {
        this.setData({
            expand_notes: !this.data.expand_notes
        })
    },
    handleInputUsername(e) {
        this.setData({
            username: e.detail.value,
        });
    },
    handleInputPhone(e) {
        this.setData({
            phone: e.detail.value,
        });
    },

    handleInputnotes(e) {
        this.setData({
            remark: e.detail.value,
        });
    },
    handleInputCode(e) {
        this.setData({
            Code_verify: e.detail.value,
        });

    },
    validate() {
        if (!this.data.username.trim()) {
            wx.showToast({
                title: "请填写预约人",
                icon: "error",
                duration: 2000,
                mask: false,
            });
            return false;
        }
        if (!this.data.phone) {
            wx.showToast({
                title: "请填写手机号码",
                icon: "error",
                duration: 2000,
                mask: false,
            });
            return false;
        }
        if (!/1\d{10}/.test(this.data.phone)) {
            wx.showToast({
                title: "请填写正确的手机号",
                icon: "error",
                duration: 2000,
                mask: false,
            });
            return false;
        }
        if (this.data.radio2 == false) {
            this.setData({
                policyWaring: true
            })
            wx.showToast({
                title: "请您确认条款",
                icon: "error",
                duration: 2000,
                mask: false,
            });
            return false;
        }
        return true;
    },
    async submit() {
        if (!this.validate()) {
            return;
        }
        this.do_you_remember()
        const res = await request({
            path: "/applet/room/order",
            method: "POST",
            data: {
                roomNum: this.data.homeNumber,
                categoryId: this.data.roomId,
                adultNum: this.data.adultNumber,
                childrenNum: this.data.childrenNumber,
                amount: this.data.amount,
                arriveTime: dayjs(this.data.startTimestamp).format("YYYY-MM-DD"),
                leaveTime: dayjs(this.data.endTimestamp).format("YYYY-MM-DD"),
                peopleName: this.data.username,
                phoneNo: this.data.phone,
                demand: this.data.remark,
                smsCode: this.data.Code_verify,
                smsKey: this.data.smsKey,
                remember: this.data.radio1 = this.data.radio1 == false ? '0' : '1',
                payAmount: this.data.payAmount,
            },
        });
        console.log(res);
        if (res.code === "0") {
            this.pay({
                timeStamp: res.data.timeStamp,
                nonceStr: res.data.nonceStr,
                package: res.data.packageVal,
                signType: res.data.signType,
                paySign: res.data.paySign,
            });
        } else {
            wx.showToast({
                title: res.msg,
                icon: "error",
                duration: 2000,
                mask: false,
            });
        }
    },

    // 支付
    pay({
        timeStamp,
        nonceStr,
        package: packageStr,
        signType,
        paySign
    }) {
        wx.requestPayment({
            timeStamp,
            nonceStr,
            package: packageStr,
            signType,
            paySign,
            success: () => {
                setTimeout(() => {
                    wx.redirectTo({
                        url: '/pages/myOrders/myOrders',
                    });
                }, 2000);
                wx.showToast({
                    title: "預約成功",
                    icon: "success",
                    duration: 2000,
                    mask: true,
                });
            },
            fail: (res) => {
                setTimeout(() => {
                    wx.redirectTo({
                        url: '/pages/myOrders/myOrders',
                    });
                }, 2000);
                wx.showToast({
                    title: "預約失败",
                    icon: "error",
                    duration: 2000,
                    mask: false,
                });
            },
        });
    },
    //记住入住信息
    async do_you_remember() {
        try {
            const res = await request({
                path: "/applet/room/remember",
                method: "POST",
                data: {
                    peopleName: this.data.username,
                    phoneNo: this.data.phone,
                    remember: this.data.radio1 = this.data.radio1 == true ? '0' : '1',
                },
            });
            if (this.data.radio1 == false) {
                this.setData({
                    radio1: !this.data.radio1
                })
            }
        } catch (e) {
            console.log(e);
        }
        wx.hideLoading();
    },

    // 取消订单
    async cancelOrder() {
        const {
            confirm
        } = await wx.showModal({
            title: "提示",
            content: "确定要取消订单吗？",
        });

        if (!confirm) return;

        const res = await request({
            path: "/applet/personal/order/cancel",
            method: "POST",
            data: {
                id: this.data.orderId
            },
        });
        if (res.code === "0") {
            wx.showToast({
                title: "取消成功",
                icon: "success",
                duration: 2000,
            });
            setTimeout(() => {
                wx.navigateBack();
            }, 2000);
        }
    },
    //获取验证码
    async sendmessg(e) {
        var that = this;
        var mobile = that.data.phone;
        if (mobile) {
            var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
            if (!myreg.test(mobile)) {
                wx.showToast({
                    title: '手机号有误！',
                    icon: "none",
                    duration: 1000
                });
                return false;
            } else {
                var timer = 1;
                if (timer == 1) {
                    timer = 0;
                    var time = 60;
                    that.setData({
                        sendmsg: "Sendafter",
                    })
                    var inter = setInterval(function () {
                        that.setData({
                            getmsg: time + "s后重试",
                        })
                        time--
                        if (time < 0) {
                            timer = 1
                            clearInterval(inter);
                            that.setData({
                                sendmsg: "sendmsg",
                                getmsg: "获取验证码",
                            })
                        }
                    }, 1000)
                }
                //调用获取短信息接口
                try {
                    const res = await request({
                        path: "/applet/util/send",
                        method: "POST",
                        data: {
                            phoneNo: this.data.phone,
                        },
                    });
                    this.data.smsKey = res.data
                    if (res.code === "0") {
                        wx.showToast({
                            title: '已发送验证码',
                            icon: "success",
                            mask: true,
                            duration: 2000,
                        });
                    } else {
                        wx.showToast({
                            title: res.msg,
                            icon: "none",
                            mask: true,
                            duration: 2000,
                        });
                    }
                } catch (e) {
                    console.log(e);
                }
                wx.hideLoading();
            }
        } else {
            wx.showToast({
                title: '手机号码不能为空',
                icon: "none",
                duration: 1000
            });
        }
    },
    // 退款
    async refund() {
        const {
            confirm
        } = await wx.showModal({
            title: "提示",
            content: "确定要申請退款吗？",
        });

        if (!confirm) return;

        wx.showLoading();
        try {
            const res = await request({
                path: "/applet/personal/order/refund",
                method: "POST",
                data: {
                    id: this.data.orderId,
                    reason: "小程序退款",
                },
            });
            if (res.code === "0") {
                setTimeout(() => {
                    wx.navigateBack();
                }, 2000);
                wx.showToast({
                    title: res.data,
                    icon: "success",
                    mask: true,
                    duration: 2000,
                });
            } else {
                wx.showToast({
                    title: '申请失败',
                    icon: "error",
                    mask: true,
                    duration: 2000,
                });
            }
        } catch (e) {
            console.log(e);
        }
        wx.hideLoading();
    },
    // 获取订单信息
    async getOrderInfo(orderId) {
        wx.showLoading();
        try {
            const res = await request({
                path: "/applet/personal/order/detail",
                method: "POST",
                data: {
                    id: orderId
                },
            });
            if (res.data.remark == null) {
                res.data.remark = ''
            }
            if (res.code === "0") {
                const startTimestamp = dayjs(res.data.arriveTime).valueOf();
                const endTimestamp = dayjs(res.data.leaveTime).valueOf();
                const freeCancelTime = dayjs(+startTimestamp).add(-2, "day");
                const days = dayjs(+endTimestamp).diff(dayjs(+startTimestamp), "day");
                this.setData({
                    orderStatus: res.data.orderStatus,
                    adultNumber: res.data.adultNum,
                    childrenNumber: res.data.childrenNum,
                    homeNumber: 1,
                    startTimestamp,
                    endTimestamp,
                    roomId: res.data.categoryId,
                    userNum: res.data.peopleNum,
                    startDay: dayjs(+startTimestamp).format("DD"),
                    startMonth: dayjs(+startTimestamp).format("YYYY-MM"),
                    endDay: dayjs(+endTimestamp).format("DD"),
                    endMonth: dayjs(+endTimestamp).format("YYYY-MM"),
                    freeCancelTime: dayjs(+freeCancelTime).format("YYYY年MM月DD日"),
                    price: res.data.price.toFixed(2),
                    detailPayableAmount: res.data.payableAmount,
                    detailPayAmount: res.data.payAmount,
                    homeNumber: res.data.roomNum,
                    roomName: res.data.categoryName,
                    username: res.data.peopleName,
                    phone: res.data.phoneNo,
                    remark: res.data.remark,
                    days,
                    orderNo: res.data.orderNo,
                    orderTime: res.data.orderTime,
                    payChannel: res.data.payChannel,
                });
            }
        } catch (e) {
            console.log(e);
        }
        wx.hideLoading();
    },
    openPopup(e) {
        var index = e.currentTarget.dataset.index;
        this.setData({
            showIndex: index
        })
    },
    //关闭弹窗
    closePopup() {
        this.setData({
            showIndex: null,
            trirs_puls: false,
            trirs_puls2: false
        })
    },
    triggers() {
        this.setData({
            trig: true
        })
    },
    triggers_puls() {
        this.setData({
            trirs_puls: true
        })

    },
    triggers_puls2() {
        this.setData({
            trirs_puls2: true
        })
    },
    async detail() {
        try {
            const res = await request({
                path: "/applet/room/order/amount",
                method: "POST",
                data: {
                    adultNum: this.data.adultNumber,
                    amount: +this.data.price * this.data.homeNumber * this.data.days,
                    arriveTime: dayjs(this.data.startTimestamp).format("YYYY-MM-DD"),
                    categoryId: this.data.roomId,
                    childrenNum: this.data.childrenNumber,
                    demand: this.data.remark,
                    leaveTime: dayjs(this.data.endTimestamp).format("YYYY-MM-DD"),
                    peopleName: this.data.username,
                    phoneNo: this.data.phone,
                    remember: this.data.radio1 = this.data.radio1 == false ? '0' : '1',
                    roomNum: this.data.homeNumber,
                    smsCode: this.data.Code_verify,
                    smsKey: this.data.smsKey,
                },
            });
            this.setData({
                discountAmount: res.data.discountAmount,
                days: res.data.days,
                price: res.data.price,
                roomNum: res.data.roomNum,
                amount: res.data.orderAmount,
                payAmount: res.data.payAmount
            })
            console.log(this.data.payAmount);
        } catch (e) {
            console.log(e);
        }
        wx.hideLoading();
    },
    close_popup() {
        this.setData({
            trirs_puls: false,
            trirs_puls2: false
        })
    },
    onscrollTo(e) {
        this.setData({
            DomTop: false
        })
        this.setData({
            myScrollTop:100
        })
        wx.onKeyboardHeightChange(res => {
            
        })
    },
    onscrollTo2() {
        console.log("失焦");
        this.setData({
            DomTop: true,
            myScrollTop: 0,
        })
    },

    // 监听页面软键盘弹起手动推动页面
    bindKeyBoardHeightChange(e) {
        // 只对ios 处理
        if (!this.data.isIos) {
            return
        }
        const windowHeight = wx.getSystemInfoSync().windowHeight;
        // 键盘高度
        const height = e.detail.height;
        const className = e.target.dataset.class;
        if (height === 0) {
            this.scrollToInput(0);
            return;
        }
        try {
            this.createSelectorQuery()
                .select(`.${className}`)
                .boundingClientRect(res => {
                    console.log(res)
                    // 除去键盘的剩余高度
                    let restHeight = windowHeight - height;
                    // 元素左下角坐标
                    let bottom = res.bottom;
                    // 只有当元素被软键盘覆盖的时候才上推页面
                    if (bottom <= restHeight) return;
                    // 现阶段需要滚动的大小
                    let scrollTop = bottom - restHeight;
                    this.scrollToInput(height, scrollTop);
                }).exec();
        } catch (error) { }
    },
    // 获取页面滚动条位置
    getScrollOffset() {
        return new Promise((resolve) => {
            try {
                wx.createSelectorQuery()
                    .selectViewport()
                    .scrollOffset((res) => {
                        resolve(res.scrollTop);
                    })
                    .exec();
            } catch (error) {
                resolve(0);
            }
        });
    },
    // 监听页面软键盘弹起手动推动页面
    scrollToInput(keyboardHeight, scrollTop) {
        this.setData({
            keyboardHeight,
        });
        if (scrollTop) {
            try {
                this.getScrollOffset().then((lastScrollTop) => {
                    wx.pageScrollTo({
                        // 如果已经存在滚动，在此基础上继续滚
                        scrollTop: lastScrollTop ? lastScrollTop + scrollTop : scrollTop,
                        duration: 300,
                    });
                });
            } catch (error) { }
        }
    },
    //获取游历项目
    //  travel_project

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        var that = this;
        // 动态获取屏幕高度
        wx.getSystemInfo({
            success: (result) => {
                that.setData({
                    height: result.windowHeight,
                });
            },
        })
    },
    emptyFunction() {

    }
});
