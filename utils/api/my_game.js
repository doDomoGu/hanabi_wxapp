const Url = getApp().gData.apiBaseUrl

// 开始游戏
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

// 获得信息
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

// 打出（自己的）手牌
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

// 弃掉（自己的）手牌
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

// 提示手牌
// 参数 type : 提示类型 ，'num' 或 'color'
const doCue = (cueType, cardSelectOrd) => {
  const token = wx.getStorageSync('token') || ''
  return new Promise(function (resolve, reject) {
    wx.request({
      method: "POST",
      url: Url + '/my-game/do-cue?token=' + token,
      data:{
        cardSelectOrd: cardSelectOrd,
        cueType: cueType
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
  doDiscard: doDiscard,
  doCue: doCue
}
