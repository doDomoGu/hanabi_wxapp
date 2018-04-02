//index.js
//获取应用实例
const app = getApp()

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
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        this.setData({
          userInfo : res.userInfo,
          hasUserInfo : true
        })
      }
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
