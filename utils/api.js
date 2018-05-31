const Url = getApp().gData.apiBaseUrl


const Auth = require('./api/auth.js')
const RoomList = require('./api/room_list.js')
const MyRoom = require('./api/my_room.js')
const MyGame = require('./api/my_game.js')




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





module.exports = {
  getIsInGame: getIsInGame,
  Auth: Auth,
  RoomList: RoomList,
  MyRoom: MyRoom,
  MyGame: MyGame
}
