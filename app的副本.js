//app.js
App({
  onLaunch: function () {
    var that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // wx.request({
    //   url: 'http://localhost:8889/v1/user',
    // })
    


    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     console.log(22)
    //     console.log(res)
    //     console.log(res.authSetting['scope.userInfo'])
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })

   
    
  },
  globalData: {
    apiBaseUrl:"http://192.168.31.176:8889/v1",
    userid: null,
    userInfo: null
  }
})