const Url = getApp().gData.apiBaseUrl

const getList = (param) => {
  const token = wx.getStorageSync('token') || ''
  return new Promise(function (resolve, reject) {
    wx.request({
      method: "POST",
      url: Url + '/room/list?token=' + token,
      data:param,
      success: function (res) {
        if (res.data) {
          resolve(res.data)
        }else{
          reject('房间列表空！')
        }
      },
      fail: function(){
        reject('获取房间列表错误！')
      }
    })
  })
}

module.exports = {
  getList: getList
}
