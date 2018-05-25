const Api = require('./api.js')

// 微信登录验证
const login = () => {
  let codeAuth = function () {
    // 登录
    return new Promise(function (resolve, reject) {
      // console.log('开始 请求获得code')
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          // console.log('获得code :'+ res.code )
          // console.log('开始 请求code换取token')
          Api.Auth.getToken(res.code)
        },
        fail : error => {
          console.log(error)
          reject(error)
        }
      })
    })
  }


  // console.log('开始')
  return new Promise(function (resolve, reject) {
    Api.Auth.checkToken().then(function(res){
      if(res.result === 'success'){
        // console.log('153 返回userid')
        return res
      } else {
        return codeAuth()
      }
    }).then(function(res){
      // that.setData({
      //   userId: res.user_id,
      // })

      // console.log(res)
      // console.log('打印 userid :' +   res.user_id)
      // console.log('结束')
      resolve(res.user_id)
    }).catch(function(error){
      console.log('有错')
      console.log(error)


    })
  })
}

module.exports = {
  login: login
}
