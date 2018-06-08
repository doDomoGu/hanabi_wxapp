const Url = getApp().gData.apiBaseUrl


const start = () => {
  const token = wx.getStorageSync('token') || ''
  return new Promise(function (resolve, reject) {
    wx.request({
      method: "POST",
      url: Url + '/my-game/start?token=' + token,
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
      url: Url + '/my-game/get-info?token=' + token,
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

const doPlay = (cardSelectOrd) => {
  const token = wx.getStorageSync('token') || ''
  return new Promise(function (resolve, reject) {
    wx.request({
      method: "POST",
      url: Url + '/my-game/do-play?token=' + token,
      data:{
        cardSelectOrd: cardSelectOrd
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


const doDiscard = (cardSelectOrd) => {
  const token = wx.getStorageSync('token') || ''
  return new Promise(function (resolve, reject) {
    wx.request({
      method: "POST",
      url: Url + '/my-game/do-discard?token=' + token,
      data:{
        cardSelectOrd: cardSelectOrd
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

module.exports = {
  start: start,
  getInfo: getInfo,
  doPlay: doPlay,
  doDiscard: doDiscard
}
