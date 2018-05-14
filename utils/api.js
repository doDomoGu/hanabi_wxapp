const Url = getApp().gData.apiBaseUrl


// 使用本地储存的token进行验证
const checkToken = () => {
  const token = wx.getStorageSync('token') || ''
  return new Promise(function (resolve, reject) {
    if (token!==''){
      // console.log('token存在，开始验证')
      wx.request({
        url: Url + '/wxauth?token=' + token,
        success: res => {
          if (res.data && res.data.success) {
            //获得 请求接口需要用到的token
            // wx.setStorageSync('token', res.data.token)
            // //获得 用户ID
            // that.setData({
            //   userId: res.data.userid,
            //   motto: that.data.motto + '(' + res.data.userid + ')'
            // })
            // console.log('token验证成功')
            resolve({result:'success',user_id:res.data.user_id})
          } else {
            // console.log('token验证失败')
            wx.removeStorageSync('token')
            resolve({result:'fail',error:'wrong_token'})
          }
        },
        fail: error => {
          reject(error)
        }
      })
    }else{
      console.log('token不存在')
      resolve({result:'fail',error:'empty_token'})
    }
  })
}


const getToken = (code) => {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: Url + '/wxauth/code2session?jscode=' + code,
      success: function (res) {
        if (res.data && res.data.success) {
          //获得 请求接口需要用到的token
          wx.setStorageSync('token', res.data.token)
          //获得 用户ID
          // that.setData({
          //   userId: res.data.user_id,
          //   motto: that.data.motto + '(' + res.data.user_id + ')'
          // })

          resolve({result: 'success', user_id: res.data.user_id})
        }else{
          reject('getToken error')
        }
      },
      fail: error => {
        console.log('getToken fail')
        reject(error)
      }
    })
  })
}


const getRoomList = () => {
  const token = wx.getStorageSync('token') || ''
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


const getIsInGame = () => {
  const token = wx.getStorageSync('token') || ''
  return new Promise(function (resolve, reject) {
    wx.request({
      method: "POST",
      url: Url + '/my-game/get-info?token=' + token,
      data: {
        mode: 'simple',
        force: true
      },
      success: res => {
        if (res.data && res.data.success) {
          resolve(true)
        } else {
          resolve(false)
        }
      },
      fail: error => {
        reject(error)
      }
    })
  })
}

const enterRoom = (roomId) => {
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

const exitRoom = () => {
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



module.exports = {
  checkToken: checkToken,
  getToken: getToken,
  getRoomList: getRoomList,
  getRoomId: getRoomId,
  getIsInGame: getIsInGame,
  enterRoom: enterRoom,
  exitRoom: exitRoom
}
