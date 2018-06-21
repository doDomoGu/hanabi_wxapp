const roomListParam                 = require('./canvas/param/room_list')
const myRoomParam                   = require('./canvas/param/my_room')
const myGameParam                   = require('./canvas/param/my_game')
const gameOperationSelfParam        = require('./canvas/param/game_operation_self')
const gameOperationOppositeParam    = require('./canvas/param/game_operation_opposite')

const Draw   = require('./canvas/draw')
const Tap    = require('./canvas/tap')

let commonParam = (p) => {
  p.pad = 10 //一般间隔留白
  p.topPad =  p.pad // 上边距
  p.leftPad = p.rightPad =  p.pad// 左右边距
  p.innerWidth = p.width - p.leftPad - p.rightPad // 去除左右边距后的宽度
  p.radius = 10
  p.fontSize = '20px sans-serif'  //全局文字尺寸

  return p
}

// 画布初始化 ：获得并设置高度/宽度/像素比  设置绘图的各种参数 位置/高度/宽度/颜色/样式
const init = (t) => {  // t = this
  return new Promise(function (resolve, reject) {
    wx.getSystemInfo({
      success: function (res) {
        let p = t.data.canvasParam
        p.width = res.windowWidth
        p.height = res.windowHeight
        p.ratio = res.pixelRatio
        // console.log('width : '+ p.width)
        // console.log('height : '+ p.height)
        // console.log('ratio : '+ p.ratio)


        //1.通用参数
        p = commonParam(p)
        //2.房间列表页面参数
        p = roomListParam(p)
        //3.房间页面参数
        p = myRoomParam(p)
        //4.游戏页面参数
        p = myGameParam(p)
        //5.游戏操作框参数 (点击自己手牌）
        p = gameOperationSelfParam(p)
        //6.游戏操作框参数 (点击对面手牌）
        p = gameOperationOppositeParam(p)

        t.setData({
          canvasParam: p
        })

        //7.游戏日志位置参数
        let gameLogPosition = {
          top:p.MG_historyAreaY,
          left:10,
          width:p.MG_historyAreaW - 20,
          height:p.MG_historyAreaH - 14
        }

        t.setData({
          gameLogPosition: gameLogPosition
        })
        resolve()
      }
    })
  })
}

module.exports = {
  init: init,
  Draw: Draw,
  Tap: Tap
}
