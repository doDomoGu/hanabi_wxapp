const Url = getApp().gData.apiBaseUrl

// 进入房间
const enter = (roomId) => {
  const token = wx.getStorageSync('token') || ''
  return new Promise(function (resolve, reject) {
    wx.request({
      method: "POST",
      url: Url + '/my-room/enter?token=' + token,
      data: {
        roomId : roomId
      },
      success: res => {
        resolve(res.data)
      },
      fail: error => {
        reject(error)
      }
    })
  })
}

// 退出房间
const exit = () => {
  const token = wx.getStorageSync('token') || ''
  return new Promise(function (resolve, reject) {
    wx.request({
      method: "POST",
      url: Url + '/my-room/exit?token=' + token,
      success: res => {
        resolve(res.data)
      },
      fail: error => {
        reject(error)
      }
    })
  })
}

// 获取房间信息
// 参数 mode:  all 返回完整信息 | simple 只返回roomId
const getInfo  = (param) => {
  if (!param.hasOwnProperty('mode')) { param.mode = 'all' }
  const token = wx.getStorageSync('token') || ''
  return new Promise(function (resolve, reject) {
    wx.request({
      method: "POST",
      url: Url + '/my-room/get-info?token=' + token,
      data:param,
      success: res => {
        resolve(res.data)
      },
      fail: error => {
        reject(error)
      }
    })
  })
}

// 准备操作
const doReady = () => {
  const token = wx.getStorageSync('token') || ''
  return new Promise(function (resolve, reject) {
    wx.request({
      method: "POST",
      url: Url + '/my-room/do-ready?token=' + token,
      success: res => {
        resolve(res.data)
      },
      fail: error => {
        reject(error)
      }
    })
  })
}


module.exports = {
  enter: enter,
  exit: exit,
  getInfo: getInfo,
  doReady: doReady,
}
