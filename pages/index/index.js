//index.js
//获取应用实例
//const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfoShow: false,
    userMottoShow: false,
    userInfo: {},
    userId: null,
    hasUserInfo: false,
    isInRoom: false,
    isInGame: false,
    width: 0,
    height: 0,
    ratio: 1,
    //canIUse: wx.canIUse('button.open-type.getUserInfo'),
    apiBaseUrl: "http://192.168.31.176:8889/v1"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    const that = this

    // 1.登录验证 （获得用户ID）
    that.login()
    // 2.根据用户ID 获取当前状态（在房间中/在游戏中）




    /*const ctx = wx.createCanvasContext('myCanvas')
    that.canvasInit().then(function() {

    })*/
  },
  // 画布初始化 ：获得并设置高度/宽度/像素比
  canvasInit: function () {
    const that = this
    return new Promise(function (resolve, reject) {
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            width : res.windowWidth,
            height: res.windowHeight,
            ratio : res.pixelRatio
          })
          // that.radius = 105 / 602 * that.height
          // console.log(res.model)
          // console.log(res.pixelRatio)
          // console.log(res.windowWidth)
          // console.log(res.windowHeight)
          // console.log(res.language)
          // console.log(res.version)
          // console.log(res.platform)
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
            url: that.data.apiBaseUrl + '/wxauth?token=' + token,
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
              url: that.data.apiBaseUrl + '/wxauth/code2session?jscode=' + res.code,
              success: function (res) {
                if (res.data && res.data.success) {

                  //获得 请求接口需要用到的token
                  wx.setStorageSync('token', res.data.token)
                  //获得 用户ID
                  that.setData({
                    userId: res.data.user_id,
                    motto: that.data.motto + '(' + res.data.user_id + ')'
                  })

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

    checkToken().then(function(res){
      if(res.result === 'success'){
        console.log('153 返回userid')
        return res
      } else {
        return codeAuth()
      }
    }).then(function(res){
      console.log(res)
      console.log('打印 userid :' +   res.user_id)
      console.log('结束')
    }).catch(function(error){
      console.log('有错')
      console.log(error)


      //wx.removeStorageSync('token')
    })
   /* }else{
      that.login()
    }*/



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

  getRoom: function() {
    console.log(this)
    wx.request({
      url: app.globalData.apiBaseUrl + '/room?accessToken=' + (wx.getStorageSync('token') || ''),
      success: function (res) {
        if (res.data) {
          console.log(res.data)
        }
        // if (res.data && res.data.success) {
        //   //获得 请求接口需要用到的token
        //   wx.setStorageSync('token', res.data.token)
        //   //获得 用户ID
        //   that.setData({
        //     userId: res.data.userid,
        //     motto: that.data.motto + '(' + res.data.userid + ')'
        //   })

        //   that.getRoom()
        // }
      }
    })

  }
})
