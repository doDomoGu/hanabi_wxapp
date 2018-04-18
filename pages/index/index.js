//index.js

const Api = require('../../utils/api.js')
const Auth = require('../../utils/auth.js')
const Draw = require('../../utils/draw.js')

//获取应用实例
const app = getApp()

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
      that.setData({
        userId: userId
      })
      // 2.根据用户ID 获取当前状态（在房间中/在游戏中）
      return that.getStatus()
    }).then(function(){
      // 3.初始化画布 (获取宽/高/像素比)
      return Draw.init(that)
    }).then(function(){
      if(that.data.isInRoom===false){
        Api.getRoomList().then((roomList)=>{
          that.setData({
            roomList: roomList
          })
          Draw.drawRoomList(that.data)
        })
      }
    }).catch(function(err){
      console.log('catch err')
      console.log(err)
    })
  },


  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
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
  //
  getStatus: function () {
    const that = this

    let getRoomId = function() {
      return new Promise(function (resolve, reject) {
        let token = wx.getStorageSync('token') || ''
        wx.request({
          method: "POST",
          url: app.gData.apiBaseUrl + '/my-room/get-info?token=' + token,
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

    let getIsInGame = function() {
      return new Promise(function (resolve, reject) {
        let token = wx.getStorageSync('token') || ''
        wx.request({
          method: "POST",
          url: app.gData.apiBaseUrl + '/my-game/get-info?token=' + token,
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

    return new Promise(function (resolve, reject) {
      getRoomId().then(function(room_id){
        if(room_id>0){
          // that.setData({
          //   isInRoom: true
          // })
          console.log(142)
          return getIsInGame().then(function(isInGame){
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

  },
  //
  // onReady:function(){
  //   // 页面渲染完成
  //   //第一步创建个上下文容器
  //   let ctx = wx.createCanvasContext('main', this)
  //
  //   //第二步绘制这里我们绘制个矩形
  //   ctx.strokeRect(50, 50, 100, 100)
  //   ctx.draw()
  //
  //
  //   console.log(ctx)
  //
  // },


})
