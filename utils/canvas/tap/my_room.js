const Api    = require('../../api')
const {_isInPath}   = require('./common_func')


module.exports = (e, t) => {
  return new Promise(function (resolve, reject) {
    // console.log(r)
    // const x = r.detail.x
    // const y = r.detail.y
    // console.log("鼠标指针坐标：" + x + "," + y);

    const p = t.data.canvasParam

    const isTapExitBtn = _isInPath({page: 'MyRoom', item: 'exit-btn'}, e, p)

    const isTapDoReady = _isInPath({page: 'MyRoom', item: 'do-ready'}, e, p)

    const isTapStartGame = _isInPath({page: 'MyRoom', item: 'start-game'}, e, p)

    if (isTapExitBtn) {
      Api.MyRoom.exit().then(function (re) {
        if (re.success) {
          clearInterval(t.data.myRoomInterval)
          t.setData({
            isInRoom: false
          })
          resolve(true)
        }else {
          resolve(false)
        }
        /*  resolve({success:true,action:'exitBtn'})
        }else{
          resolve({success:false})
        }*/
      })
    } else if (isTapDoReady) {
      Api.MyRoom.doReady().then(function (re) {
        if (re.success) {
          resolve(true)
        }else{
          resolve(false)
        }
        /*  resolve({success:true,action:'doReady'})
        }else{
          resolve({success:false})
        }*/
      })
    } else if (isTapStartGame) {
      if (t.data.isReady && t.data.isHost && t.data.roomId > 0) {
        Api.MyGame.start().then(function (re) {
          if (re.success) {
            clearInterval(t.data.myRoomInterval)
            t.setData({
              isInGame: true
            })


            resolve(true)
          }else {
            resolve(false)
          }
          /*  resolve({success:true,action:'startGame'})
          }else{
            resolve({success:false})
          }*/
        })
      }
    }
  })
}