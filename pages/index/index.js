//index.js

const Api    = require('../../utils/api.js')
const Auth   = require('../../utils/auth.js')
const Canvas = require('../../utils/canvas.js')
const Draw   = require('../../utils/canvas.draw.js')
const Tap    = require('../../utils/canvas.tap.js')

//获取应用实例
//const app = getApp()

Page({
  data: {
    containerClass:'',
    userInfoShow: false,
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

    canvasParam: {}
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
        that.drawRoomList()
        let roomListInterval = setInterval(that.drawRoomList,1000)
        that.setData({
          roomListInterval : roomListInterval
        })

        //clearInterval(roomListInterval)
      }else if(that.data.isInRoom === true ){
        if(that.data.isInGame === false ) {
          that.drawMyRoom(true)
          let myRoomInterval = setInterval(that.drawMyRoom,1000)
          that.setData({
            myRoomInterval : myRoomInterval
          })

          //Canvas.drawMyRoom(that.data.canvasParam)
        }else{

        }
      }
    }).catch(function(err){
      console.log('catch err')
      console.log(err)
    })
  },

  drawRoomList : function(){
    let that = this
    Api.getRoomList().then((roomList)=>{
      //console.log(roomList)
      //console.log(that.data.roomList)
      /*if(roomList !== that.data.roomList){*/
      //TODO roomList不变化不用重新绘制
      that.setData({
        roomList: roomList
      })
      Draw.roomList(roomList,that.data.canvasParam)
      /*}*/
    })
  },
  drawMyRoom : function(force=false){
    let that = this
    Api.getRoomInfo({force:force}).then((res)=> {
      if (res){
        if (res.success) {
          if (!res.data.noUpdate) {
            that.setData(res.data)
          }
        } else {
          that.setData({
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
          })
        }
      }else{
        console.log('getroominfo wrong  155')
      }
      /*that.setData({
        roomList: roomList
      })*/
      Draw.myRoom(that.data,that.data.canvasParam)
    })
  },
  tapRoomList : function(event) {
    let that = this
    Tap.roomList(event, this).then(function(res){
      if(res===true){
        that.drawMyRoom(true)
        let myRoomInterval = setInterval(that.drawMyRoom,1000)
        that.setData({
          myRoomInterval : myRoomInterval
        })
      }
    })
  },
  tapMyRoom : function(event) {
    let that = this
    Tap.myRoom(event, this).then(function(res){
      if (res===true) {
        that.drawRoomList()
        let roomListInterval = setInterval(that.drawRoomList,1000)
        that.setData({
          roomListInterval : roomListInterval
        })
      }
    })
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
