const Url = getApp().gData.apiBaseUrl


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
        // const _res = res.data
        // let ret = {}
        // if (_res.success) {
        //   if (!_res.data.noUpdate) {
        //     if (param.mode === 'all') {
        //       ret = _res.data
        //     }else{
        //       ret.room_id = _res.data.roomId
        //     }
        //   }
        // }else{
        //   ret = false
        // }
        // resolve(ret)
      },
      fail: error => {
        reject(error)
      }
    })
  })
}


const getRoomId = () => {
  const token = wx.getStorageSync('token') || ''
  return new Promise(function (resolve, reject) {
    wx.request({
      method: "POST",
      url: Url + '/my-room/get-info?token=' + token,
      data: {
        mode: 'simple',
        force: true
      },
      success: res => {
        if (res.data && res.data.success) {
          resolve(res.data.data.roomId)
        } else {
          resolve(res.data.data.roomId)
        }
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
  getRoomId: getRoomId
}
