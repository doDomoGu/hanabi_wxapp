//index.js
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
    canvasParam: {
      width: 0,
      height: 0,
      ratio: 1,
      topLeftPad: 0,
      topWidth: 0,
    }
  },
  onLoad: function () {
    const that = this
    // 1.登录验证 （获得用户ID）
    that.login().then(function(){
      // 2.根据用户ID 获取当前状态（在房间中/在游戏中）
      return that.getStatus()
    }).then(function(){
      // 3.初始化画布 (获取宽/高/像素比)
      return that.canvasInit()
    }).then(function(){
      if(that.data.isInRoom===false){
        that.getRoomList().then(()=>{
          that.drawRoomList()
        })
      }
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
  // 画布初始化 ：获得并设置高度/宽度/像素比
  canvasInit: function () {
    const that = this
    return new Promise(function (resolve, reject) {
        wx.getSystemInfo({
          success: function (res) {
            const width = res.windowWidth
            const height = res.windowHeight
            const ratio = res.pixelRatio
            let p = that.data.canvasParam
            p.width = width
            p.height = height
            p.ratio = ratio
            p.topLeftPad = 10 * ratio // 左侧pad
            p.topWidth = width - p.topLeftPad * 2 // 去除左右pad后的宽度
            that.setData({
              canvasParam : p
            })

            const ctxRL = wx.createCanvasContext('roomListCanvas')
            const ctxMR = wx.createCanvasContext('myRoomCanvas')
            const ctxMG = wx.createCanvasContext('myGameCanvas')

            ctxRL.setFillStyle("#333333");
            ctxRL.setFontSize(20)
            ctxRL.fillText('room list canvas', p.topLeftPad + 20, 30)

            ctxMR.setFillStyle("#333333");
            ctxMR.setFontSize(20)
            ctxMR.fillText('my room canvas', p.topLeftPad + 20, 30)

            ctxMG.setFillStyle("#333333");
            ctxMG.setFontSize(20)
            ctxMG.fillText('my game canvas', p.topLeftPad + 20, 30)


            ctxRL.draw()
            ctxMR.draw()
            ctxMG.draw()

            resolve()
          }
        })
    })
  },


  // 微信登录验证
  login: function () {
    const that = this

    // 使用本地储存的token进行验证
    let checkToken = function () {
      return new Promise(function (resolve, reject) {
        let token = wx.getStorageSync('token') || ''
        if (token!==''){
          console.log('token存在，开始验证')
          wx.request({
            url: app.gData.apiBaseUrl + '/wxauth?token=' + token,
            success: res => {
              if (res.data && res.data.success) {
                //获得 请求接口需要用到的token
                // wx.setStorageSync('token', res.data.token)
                // //获得 用户ID
                // that.setData({
                //   userId: res.data.userid,
                //   motto: that.data.motto + '(' + res.data.userid + ')'
                // })
                console.log('token验证成功')
                resolve({result:'success',user_id:res.data.user_id})
              } else {
                console.log('token验证失败')
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

    let codeAuth = function () {
      // 登录
      return new Promise(function (resolve, reject) {
        console.log('开始 请求获得code')
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            console.log('获得code :'+ res.code )
            //console.log(res)

            console.log('开始 请求code换取token')
            wx.request({
              url: app.gData.apiBaseUrl + '/wxauth/code2session?jscode=' + res.code,
              success: function (res) {
                if (res.data && res.data.success) {

                  //获得 请求接口需要用到的token
                  wx.setStorageSync('token', res.data.token)
                  //获得 用户ID
                  // that.setData({
                  //   userId: res.data.user_id,
                  //   motto: that.data.motto + '(' + res.data.user_id + ')'
                  // })

                  //that.getRoom()

                  resolve({result:'success',user_id:res.data.user_id})
                }
              },
              fail: error => {
                  reject(error)
              }
            })
          },
          fail : error => {
            console.log(error)
            reject(error)
          }
        })
      })
    }


    console.log('开始')
    return new Promise(function (resolve, reject) {
      checkToken().then(function(res){
        if(res.result === 'success'){
          console.log('153 返回userid')
          return res
        } else {
          return codeAuth()
        }
      }).then(function(res){
        that.setData({
          userId: res.user_id,
        })

        console.log(res)
        console.log('打印 userid :' +   res.user_id)
        console.log('结束')
        resolve(res.user_id)
      }).catch(function(error){
        console.log('有错')
        console.log(error)


        //wx.removeStorageSync('token')
      })
      /* }else{
         that.login()
       }*/


    })




  },

  getRoomList: function() {
    const that = this
    return new Promise(function (resolve, reject) {
      wx.request({
        url: app.gData.apiBaseUrl + '/room?token=' + (wx.getStorageSync('token') || ''),
        success: function (res) {
          if (res.data) {
            that.setData({
              roomList : res.data
            })
          }
          resolve()
        }
      })
    })
  },

  drawRoomList: function() {
    const that = this

    const ctx = wx.createCanvasContext('roomListCanvas')
    const p = that.data.canvasParam
    ctx.setFillStyle("#ffffff");
    ctx.rect(p.topLeftPad,70,p.topWidth,400)
    ctx.fill()


    const roomList = that.data.roomList
    ctx.setFillStyle("#ff0000");
    ctx.setFontSize(20)
    //ctx.setTextAlign('left')
    for(let i=0; i < roomList.length; i++){
      let id = roomList[i].id
      id = id < 10 ? '00' + id : '0' + id
      let title = roomList[i].title

      ctx.fillText(id, p.topLeftPad + 20, 100 + 30 * i)
      ctx.fillText(title, 200, 100 + 30 * i)


    }

    ctx.draw(true);
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
