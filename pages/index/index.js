//index.js
//获取应用实例
const app = getApp()
console.log(app)
Page({
  data: {
    motto: 'Hello World' ,
    userInfo: {},
    userId: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    const that = this
    console.log(that.data)
    // 登录
    wx.login({
      success: res => {    
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: app.globalData.apiBaseUrl + '/wxauth/code2session?jscode=' + res.code,
          success: function (res) {
            if (res.data && res.data.success) {
              //获得 请求接口需要用到的token
              wx.setStorageSync('token', res.data.token)
              //获得 用户ID
              that.setData({
                userId: res.data.userid,
                motto: that.data.motto + '(' + res.data.userid + ')'
              })

              that.getRoom()
            }
          }
        })
      },
      fail : res => {
        console.log(res)
      }
    })


    // if (app.globalData.userInfo) {
    //   console.log(20)
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   console.log(25)
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
        
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   console.log(35)
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getRoom: function() {
    wx.request({
      url: app.globalData.apiBaseUrl + '/room?accessToken=' + (wx.getStorageSync('token') || ''),
      success: function (res) {
        console.log(res);
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
