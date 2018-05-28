const Draw   = require('./canvas.draw.js')
const Tap    = require('./canvas.tap.js')

let commonParam = (p) => {
  p.pad = 10 //一般间隔留白
  p.topPad =  p.pad // 上边距
  p.leftPad = p.rightPad =  p.pad// 左右边距
  p.innerWidth = p.width - p.leftPad - p.rightPad // 去除左右边距后的宽度
  p.radius = 10
  p.fontSize = '20px sans-serif'  //全局文字尺寸

  return p
}

let roomListParam = (p) => {
  p.RL_bgColor = '#FFFFFF'  //区域背景色
  p.RL_bgColor2 = '#2510cc'  //区域背景色2
  p.RL_fontColor = '#2510cc' //文字颜色
  p.RL_fontColor2 = '#FFFFFF' //文字颜色2

  p.RL_fontSize = 18  //文字尺寸

  p.RL_innerHeight = 400 //区域高度
  p.RL_innerLeftPad = p.leftPad + 10 //区域左边距（相对整个画布）
  p.RL_innerTopPad = p.topPad + 30  //区域上边距 （相对整个画布）
  p.RL_innerLineHeight = 32 //列表行高
  p.RL_innerTitleLeftPad = p.RL_innerLeftPad + 50 //列表标题左边距（相对整个画布）
  p.RL_innerLockLeftPad = p.RL_innerLeftPad + 100 //上锁标志左边距（相对整个画布）

  return p
}

let myRoomParam = (p) => {
  p.MR_playerAreaBgColor = '#5fc0f3' // 玩家区域的背景色
  p.MR_playerInfoBgColor = '#ccf0f1' // 玩家信息的背景色
  p.MR_playerInfoTextColor = '#283085' // 玩家信息的文本色

  p.MR_playerButtonBgColor = '#f18d98' // 玩家按钮的背景色
  p.MR_playerButtonTextColor = '#e7f1ef' // 玩家按钮的文本色
  p.MR_playerButtonDisableBgColor = '#e7f1ef' // 玩家按钮(禁用)的背景色
  p.MR_playerButtonDisableTextColor = '#626262' // 玩家按钮(禁用)的文本色

  p.MR_exitButtonColor = '#dc0c22' // 退出按钮颜色
  p.MR_exitButtonTouchColor = '#8d0917' // 退出按钮颜色(触摸时)

  p.MR_playerAreaX = p.leftPad // 玩家区域x偏移量(相对整个画布)
  p.MR_playerAreaHostY = p.topPad// 房主玩家区域y偏移量(相对整个画布)
  p.MR_playerAreaHeight = 140 // 玩家区域的高度
  p.MR_playerAreaWidth = p.innerWidth // 玩家区域的宽度
  p.MR_playerAreaGuestY = p.MR_playerAreaHostY + p.MR_playerAreaHeight + p.pad // 访客玩家区域y偏移量(相对整个画布)

  p.MR_playerInfoPad = 10;
  p.MR_playerInfoX = p.MR_playerAreaX + p.MR_playerInfoPad  // 玩家区域内信息x偏移量(相对整个画布)
  p.MR_playerInfoHostY = p.MR_playerAreaHostY + p.MR_playerInfoPad  // 房主Y
  p.MR_playerInfoGuestY = p.MR_playerAreaGuestY + p.MR_playerInfoPad // 玩家Y
  p.MR_playerInfoWidth = p.MR_playerAreaWidth - p.MR_playerInfoPad * 2 // Width
  p.MR_playerInfoHeight = 40  //Height


  p.MR_playerInfoTextX = p.MR_playerInfoX + 20
  //p.MR_playerInfoTextHostY = p.MR_playerInfoHostY + p.MR_playerInfoPad
  //p.MR_playerInfoTextGuestY = p.MR_playerInfoGuestY + p.MR_playerInfoPad
  p.MR_playerInfoTextFontSize = p.MR_playerInfoHeight / 2



  p.MR_playerButtonPad = 10;
  p.MR_playerButtonX = p.MR_playerAreaX + p.MR_playerButtonPad // 玩家区域内按钮x偏移量
  p.MR_playerButtonHostY = p.MR_playerInfoHostY + p.MR_playerInfoHeight + p.MR_playerButtonPad // 房主Y
  p.MR_playerButtonGuestY = p.MR_playerInfoGuestY + p.MR_playerInfoHeight + p.MR_playerButtonPad // 玩家Y
  p.MR_playerButtonWidth = 100 // width
  p.MR_playerButtonHeight = 30 // height

  p.MR_playerButtonTextX = p.MR_playerButtonX + 20
  p.MR_playerButtonTextFontSize = p.MR_playerButtonHeight / 2
  // p.MR_playerButtonTextXOffset = 20 // 玩家区域内按钮内文字x偏移量(相对按钮区域)
  // p.MR_playerButtonTextYOffset = 20 // 玩家区域内按钮内文字y偏移量(相对按钮区域)


  p.MR_exitBtnX = p.leftPad // 退出按钮x偏移量(相对整个画布)
  p.MR_exitBtnY = p.MR_playerAreaGuestY + p.MR_playerAreaHeight + 20 // 退出按钮y偏移量(相对整个画布)
  p.MR_exitBtnW = p.innerWidth // 退出按钮宽度
  p.MR_exitBtnH = p.MR_exitBtnW / 8 // 退出按钮高度
  p.MR_exitTextFontSize = p.MR_exitBtnH / 2

  return p
}


let myGameParam =  (p) => {

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


        t.setData({
          canvasParam: p
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
