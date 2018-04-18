App({
  gData : {
    //apiBaseUrl: "http://192.168.31.176:8889/v1",
    apiBaseUrl: "http://192.168.0.110:8889/v1",
    //apiBaseUrl: "https://api.hanabi8.com/v1",
  },
  onLaunch: function () {
    // let that = this
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     wx.request({
    //       url: this.globalData.apiBaseUrl + '/wxauth/code2session?jscode=' + res.code,
    //       success: function (res) {
    //         if (res.data && res.data.success) {
    //           //获得 请求接口需要用到的token
    //           wx.setStorageSync('token', res.data.token)
    //
    //           that.globalData.userInfo = {id:res.data.userid}
    //
    //
    //           console.log(that.globalData)
    //
    //
    //           wx.reLaunch({
    //             url: 'pages/game/index'
    //           })
    //         }
    //       }
    //     })
    //   },
    //   fail : res => {
    //     console.log(res)
    //   }
    // })

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.push({id:logs.length+1 , logTime:Date.now()})
    wx.setStorageSync('logs', logs)
  }
})