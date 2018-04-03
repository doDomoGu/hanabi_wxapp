App({
  globalData : {
    apiBaseUrl: "http://192.168.31.176:8889/v1",
  },
  onLaunch: function () {
    var that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.push({id:logs.length+1 , logTime:Date.now()})
    wx.setStorageSync('logs', logs)
  }
})