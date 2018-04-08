//index.js
//获取应用实例
//const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfoShow: false,
    userMottoShow: false,
    userInfo: {},
    userId: null,
    hasUserInfo: false,
    isInRoom: false,
    isInGame: false,
    //canIUse: wx.canIUse('button.open-type.getUserInfo'),
    apiBaseUrl: "http://192.168.0.100:8889/v1"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    // const ctx = wx.createCanvasContext('myCanvas')
    //
    // ctx.draw()


    const that = this


    let token = wx.getStorageSync('token') || ''

    if (token !== '') {
      wx.request({
        url: this.data.apiBaseUrl + '/wxauth?token=' + token,
        success: function (res) {
          console.log(40);
          console.log(res)
          if (res.data && res.data.success) {
            console.log(43)
            //获得 请求接口需要用到的token
            // wx.setStorageSync('token', res.data.token)
            // //获得 用户ID
            // that.setData({
            //   userId: res.data.userid,
            //   motto: that.data.motto + '(' + res.data.userid + ')'
            // })

            //that.getRoom()
          } else {
            wx.removeStorageSync('token')
            console.log(55)
            that.login()
          }
        }
      })
    }else{
      that.login()
    }
  },
  login: function () {
    const that = this
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(69)
        console.log(res)
        wx.request({
          url: this.data.apiBaseUrl + '/wxauth/code2session?jscode=' + res.code,
          success: function (res) {
            if (res.data && res.data.success) {
              //获得 请求接口需要用到的token
              wx.setStorageSync('token', res.data.token)
              //获得 用户ID
              that.setData({
                userId: res.data.userid,
                motto: that.data.motto + '(' + res.data.userid + ')'
              })

              //that.getRoom()
            }
          }
        })
      },
      fail : res => {
        console.log('login fail')
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //
  // onReady:function(){
  //   // 页面渲染完成
  //   //第一步创建个上下文容器
  //   let ctx = wx.createCanvasContext('main', this)
  //
  //   //第二步绘制这里我们绘制个矩形
  //   ctx.strokeRect(50, 50, 100, 100)
  //   ctx.draw()
  //
  //
  //   console.log(ctx)
  //
  // },

  getRoom: function() {
    console.log(this)
    wx.request({
      url: app.globalData.apiBaseUrl + '/room?accessToken=' + (wx.getStorageSync('token') || ''),
      success: function (res) {
        if (res.data) {
          console.log(res.data)
        }
        // if (res.data && res.data.success) {
        //   //获得 请求接口需要用到的token
        //   wx.setStorageSync('token', res.data.token)
        //   //获得 用户ID
        //   that.setData({
        //     userId: res.data.userid,
        //     motto: that.data.motto + '(' + res.data.userid + ')'
        //   })

        //   that.getRoom()
        // }
      }
    })

  }
})
