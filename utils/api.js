const Url = top.getApp().gData.apiBaseUrl
const token = wx.getStorageSync('token') || ''


const getRoomList = function() {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: Url + '/room?token=' + token,
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
  getRoomList: getRoomList
}