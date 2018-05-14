//index.js

const Api    = require('../../utils/api.js')
const Auth   = require('../../utils/auth.js')
const Canvas = require('../../utils/canvas.js')

//获取应用实例
//const app = getApp()

Page({
  data: {
    containerClass:'',
    motto: 'Hello World',
    userInfoShow: false,
    userMottoShow: false,
    userInfo: {},
    userId: null,
    hasUserInfo: false,
    isInRoom: false,
    isInGame: false,
    //canIUse: wx.canIUse('button.open-type.getUserInfo'),


    roomList:[],

    roomId: -1,
    isHost: null,
    hostPlayer: {
      id: -1,
      username: null,
      name: null
    },
    guestPlayer: {
      id: -1,
      username: null,
      name: null
    },
    isReady: null,

    isPlaying: null,
    logList: [],
    hostHands: [],
    guestHands: [],
    roundNum: -1,
    roundPlayerIsHost: -1,
    libraryCardsNum: -1,
    discardCardsNum: -1,
    lastUpdated: null,
    cueNum: -1,
    chanceNum: -1,
    score: -1,
    successCards: [],

    canvasParam: {
      // width: 0,
      // height: 0,
      // ratio: 1,
      // topLeftPad: 0,
      // topWidth: 0,
    }
  },
  onLoad: function () {
    const that = this
    // 1.登录验证 （获得用户ID）
    Auth.login().then(function(userId){
      console.log('userId :'+ userId)
      that.setData({
        userId: userId
      })
      // 2.根据用户ID 获取当前状态（在房间中/在游戏中）
      return that.getStatus()
    }).then(function(){
      // 3.初始化画布 (获取宽/高/像素比)
      return Canvas.init(that)
    }).then(function(){
      if ( that.data.isInRoom === false ) {
        let roomListInterval = setInterval(function(){
          Api.getRoomList().then((roomList)=>{
            //console.log(roomList)
            //console.log(that.data.roomList)
            /*if(roomList !== that.data.roomList){*/
              //TODO roomList不变化不用重新绘制
              that.setData({
                roomList: roomList
              })
              Canvas.drawRoomList(roomList,that.data.canvasParam)
            /*}*/
          })
        },1000)

        that.setData({
          roomListInterval : roomListInterval
        })

        //clearInterval(roomListInterval)
      }else if(that.data.isInRoom === true ){
        if(that.data.isInGame === false ) {

        }else{
          Canvas.drawMyRoom(that.data.canvasParam)
        }
      }
    }).catch(function(err){
      console.log('catch err')
      console.log(err)
    })
  },
  bindButtonTap: function(r) {
    const page = parseInt(r.currentTarget.dataset.page)

    let isInRoom
    let isInGame
    if (page === 1){
      isInRoom = false
      isInGame = false
    } else if(page === 2){
      isInRoom = true
      isInGame = false
    } else if(page === 3){
      isInRoom = true
      isInGame = true
    }
    this.setData({
      isInRoom: isInRoom,
      isInGame: isInGame
    })
  },
  tapRoomList : function(r) {
    Canvas.tapRoomList(this.data.roomList, r, this)
  },
  tapMyRoom : function(r) {
    Canvas.tapMyRoom(r, this)
  },
  tapMyGame : function(r) {
    console.log('my_game')
    console.log(r)
  },
  getStatus: function () {
    const that = this
    return new Promise(function (resolve, reject) {
      Api.getRoomId().then(function(room_id){
        if(room_id>0){
          return Api.getIsInGame().then(function(isInGame){
            that.setData({
              isInRoom: true,
              isInGame: isInGame
            })
            resolve()
          })
        }else{
          that.setData({
            isInRoom: false,
            isInGame: false
          })
          resolve()
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
