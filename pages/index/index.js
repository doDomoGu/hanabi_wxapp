//index.js

const Api    = require('../../utils/api')
const Auth   = require('../../utils/auth')
const Canvas = require('../../utils/canvas')

//获取应用实例
//const app = getApp()

Page({
  data: {
    userInfo: {},
    userId: null,
    hasUserInfo: false,

    isInRoom: false,
    isInGame: false,
    gameOperation: null,
    cardSelectOrd: -1,
    //canIUse: wx.canIUse('button.open-type.getUserInfo'),

    roomListInterval: -1,
    myRoomInterval: -1,
    myGameInterval: -1,


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


    card : {
      score: -1,
      cueNum: -1,
      chanceNum: -1,
      hostHands: [],
      guestHands: [],
      libraryCardsNum: -1,
      discardCardsNum: -1,
      successCards: []
    },
    game : {
      roundNum: -1,
      roundPlayerIsHost: null,
      lastUpdated: null
    },
    isPlaying: null,
    log: [],



    colors: ['white', 'blue', 'yellow', 'red', 'green'],
    colorsCn: ['白', '蓝', '黄', '红', '绿'],
    numbers: [1, 1, 1, 2, 2, 3, 3, 4, 4, 5],

    scrollTop:0,

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
        that.drawRoomList(true)
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
        }else{
          that.drawMyGame(true)
          // let myGameInterval = setInterval(that.drawMyGame,1000)
          // that.setData({
          //   myGameInterval : myGameInterval
          // })
        }
      }
    }).catch(function(err){
      console.log('catch err')
      console.log(err)
    })
  },

  drawRoomList : function(force = false){
    let that = this
    Api.RoomList.getList({force: force}).then((res)=>{
      if (res) {
        if (res.success) {
          if (!res.data.noUpdate) {
            that.setData({
              roomList: res.data.list
            })

            Canvas.Draw.roomList(that.data.roomList,that.data.canvasParam)
          }
        }
      }
    })
  },
  drawMyRoom : function(force=false){
    let that = this
    Api.MyRoom.getInfo({force:force}).then((res)=> {
      if (res){
        if (res.success) {
          if (!res.data.noUpdate) {
            if(res.data.gameStart){
              clearInterval(that.data.myRoomInterval)
              that.setData({
                isInGame : true
              })
              that.drawMyGame(true)
              let myGameInterval = setInterval(that.drawMyGame,1000)
              that.setData({
                myGameInterval : myGameInterval
              })
            }else{
              that.setData(res.data)
            }
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
      Canvas.Draw.myRoom(that.data,that.data.canvasParam)
    })
  },

  drawMyGame : function(force=false){
    let that = this
    Api.MyRoom.getInfo({force:force}).then((res)=> {
      if (res){
        if (res.success) {
          if (!res.data.noUpdate) {
            that.setData(res.data)
          }

          Api.MyGame.getInfo({force:force}).then((res)=> {
            if (res){
              if (res.success) {
                if (!res.data.noUpdate) {
                  that.setData({
                    card: res.data.card,
                    game: res.data.game,
                    isPlaying: res.data.isPlaying,
                    log: res.data.log.reverse()
                  })

                  that.setData({
                    scrollTop:0
                  })

                  Canvas.Draw.myGame(that.data,that.data.canvasParam)
                }
              } else {
                that.setData({
                  card : {
                    score: -1,
                    cueNum: -1,
                    chanceNum: -1,
                    hostHands: [],
                    guestHands: [],
                    libraryCardsNum: -1,
                    discardCardsNum: -1,
                    successCards: []
                  },
                  game : {
                    roundNum: -1,
                    roundPlayerIsHost: null,
                    lastUpdated: null
                  },
                  isPlaying: null,
                  log: [],
                })
              }
            }else{
              console.log('getgameinfo wrong  170')
            }
            /*that.setData({
              roomList: roomList
            })*/

          })

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
    })



  },

  drawGameOperation : function(tap) {
    let that = this
    if(that.data.gameOperation === 'self') {
      Canvas.Draw.gameOperationSelf(tap, that.data, that.data.canvasParam)
    } else if(that.data.gameOperation === 'opposite') {
      Canvas.Draw.gameOperationOpposite(tap, that.data, that.data.canvasParam)
    } else {
      console.log('draw go wrong')
    }
  },
  startHandle : function(e) {
    console.log(e)
    console.log(123123)
  },
  moveHandle : function(e) {
    // console.log(2222)
    console.log(e)
    console.log(111)
  },
  tap: function(e) {
    console.log(222)
    let that = this
    const canvas_name = e.currentTarget.dataset.canvas
    //let tap

    if (canvas_name === 'room_list') {
      Canvas.Tap.roomList(e, this).then(function(res){
        if(res===true){
          that.drawMyRoom(true)
          let myRoomInterval = setInterval(that.drawMyRoom,1000)
          that.setData({
            myRoomInterval : myRoomInterval
          })
        }
      })
    } else if (canvas_name === 'my_room') {
      Canvas.Tap.myRoom(e, this).then(function(res){
        if (res === true) {
          if (!that.data.isInRoom) {

            clearInterval(that.data.myRoomInterval)
            that.drawRoomList(true)
            let roomListInterval = setInterval(that.drawRoomList,1000)
            that.setData({
             // isInRoom: false,
              roomListInterval : roomListInterval,
              myRoomInterval : -1
            })
          } else if (that.data.isInGame) {
            that.drawMyGame(true)
            let myGameInterval = setInterval(that.drawMyGame,1000)
            that.setData({
              myGameInterval : myGameInterval
            })
          }
        }
      })
    } else if (canvas_name === 'my_game') {
      Canvas.Tap.myGame(e, this).then(function(res){
        if(res.item === 'hands'){
          that.setData({
            gameOperation : res.gameOperation,
            cardSelectOrd : res.ord
          })
          that.drawGameOperation(res)
        }

      })
    } else if (canvas_name === 'game_operation_self') {
      Canvas.Tap.gameOperationSelf(e, this).then(function(res){
        if (res.item === 'outer-area') {
          that.setData({
            gameOperation : null,
            cardSelectOrd : -1
          })
        } else if (res.item === 'play-btn') {
          that.setData({
            gameOperation : null,
            cardSelectOrd : -1
          })
        } else if (res.item === 'discard-btn') {
          that.setData({
            gameOperation : null,
            cardSelectOrd : -1
          })
        }
      })
    } else if (canvas_name === 'game_operation_opposite') {
      Canvas.Tap.gameOperationOpposite(e, this).then(function(res){
        if(res.success){
          if (res.item === 'outer-area') {
            that.setData({
              gameOperation : null,
              cardSelectOrd : -1
            })
          } else if (res.item === 'cue-num') {
            that.setData({
              gameOperation : null,
              cardSelectOrd : -1
            })
          } else if (res.item === 'cue-color') {
            that.setData({
              gameOperation : null,
              cardSelectOrd : -1
            })
          }
        }
      })
    }
  },

  getStatus: function () {
    const that = this
    return new Promise(function (resolve, reject) {
      Api.MyRoom.getInfo({mode:'simple',force: true}).then(function(res){
        if(res.data.roomId > 0){
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
