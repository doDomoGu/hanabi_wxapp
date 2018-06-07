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
  p.RL_bgColor = '#a2fff8'  //区域背景色
  p.RL_bgColor1 = '#FFFFFF'  //区域背景色1
  p.RL_bgColor2 = '#2510cc'  //区域背景色2
  p.RL_fontColor1 = '#2510cc' //文字颜色2
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

  const playerAreaXPad = 20 // 玩家区域内的左右留白
  const playerAreaYPad = 10 // 玩家区域内的上留白
  const playerInfoXPad = 20 // 玩家信息文字相对玩家信息的左右留白
  const playerInfoYPad = 6 // 玩家信息文字相对玩家信息的上留白

  const tableAreaXPad = 20 // 桌面区域内的左右留白
  const tableAreaYPad = 10 // 桌面区域内的上留白

  // 区块的宽高(尺寸)
  //p.MG_playerAreaX = p.leftPad // 玩家区域x偏移量(相对整个画布)
  p.MG_playerAreaW = p.width // 玩家区域的宽度
  p.MG_playerAreaH = 140 // 玩家区域的高度

  p.MG_playerInfoPad = 10;
  p.MG_playerInfoW = p.MG_playerAreaW - p.MG_playerInfoPad * 2 // 玩家信息的宽度
  p.MG_playerInfoH = 30 // 玩家信息的高度

  const cardW = 40
  const cardH = 70

  p.MG_playerHandsW = cardW // 手牌宽度
  p.MG_playerHandsH = cardH // 手牌高度

  p.MG_tableAreaW = p.width // 桌面区域的宽度
  p.MG_tableAreaH = 90 // 桌面区域的高度

  p.MG_tableLibraryW = cardW // 桌面牌库的宽度
  p.MG_tableLibraryH = cardH // 桌面牌库的高度

  p.MG_tableSuccessCardsW = 30 // 桌面成功的卡牌的宽度
  p.MG_tableSuccessCardsH = 30 / cardW * cardH // 桌面成功的卡牌的高度

  p.MG_tableDiscardW = cardW // 桌面弃牌堆的宽度
  p.MG_tableDiscardH = cardH // 桌面弃牌堆的高度

  p.MG_historyAreaW = p.width // 游戏历史区域的高度
  p.MG_historyAreaH = 80 // 游戏历史区域的高度

  /* 颜色 */
  p.MG_playerAreaBgColor = '#5fc0f3' // 玩家区域的背景色
  p.MG_playerInfoBgColor = '#ccf0f1' // 玩家信息的背景色
  p.MG_playerInfoTextColor = '#283085' // 玩家信息的文本色
  p.MG_playerHandsColors = [ // 手牌牌面背景色
    '#f2f2f2', // 白
    '#4f82c3', // 蓝
    '#c3c30d', // 黄
    '#c33b00', // 红
    '#3ac34b' // 绿
  ]
  p.MG_playerHandsBackColor = '#8f8f8b' // 手牌背景背景色
  p.MG_playerHandsStrokeColor = '#111111' // 手牌边框颜色

  p.MG_tableAreaBgColor = '#f3ca90' // 桌面区域的背景色
  p.MG_tableLibraryBgColor = p.MG_playerHandsBackColor // 桌面牌库的背景色
  p.MG_tableDiscardBgColor = p.MG_playerHandsBackColor // 桌面弃牌堆的背景色

  p.MG_historyAreaBgColor = '#b55170' // 游戏历史区域的背景色

  /* xy位置偏移量 */
  p.MG_playerAreaX = 0 // 玩家区域x偏移量
  p.MG_playerAreaHostY = 0 // (房主)玩家区域y偏移量
  p.MG_playerAreaGuestY = p.MG_playerAreaH + p.MG_tableAreaH + p.MG_historyAreaH // (访客)玩家区域y偏移量

  p.MG_playerInfoX = p.MG_playerAreaX + playerAreaXPad // 玩家信息x偏移量
  p.MG_playerInfoHostY = p.MG_playerAreaHostY + playerAreaYPad // (房主)玩家信息y偏移量
  p.MG_playerInfoGuestY = p.MG_playerAreaGuestY + playerAreaYPad // (访客)玩家信息y偏移量
  // 玩家信息的高度

  p.MG_playerInfoTextX = p.MG_playerInfoX + playerInfoXPad // 玩家信息内文字x偏移量
  p.MG_playerInfoTextHostY = p.MG_playerInfoHostY + playerInfoYPad // (房主)玩家信息内文字y偏移量
  p.MG_playerInfoTextGuestY = p.MG_playerInfoGuestY + playerInfoYPad // (访客)玩家信息内文字y偏移量

  p.MG_playerHandsFirstX = 20 // 玩家手牌第一张x偏移量(相对玩家区域)
  p.MG_playerHandsHostY = p.MG_playerInfoHostY + p.MG_playerInfoH + 20 // (房主)玩家手牌y偏移量
  p.MG_playerHandsGuestY = p.MG_playerInfoGuestY + p.MG_playerInfoH + 20 // (访客)玩家手牌y偏移量

  p.MG_playerHandsPad = 16 // 手牌之间的留白距离

  p.MG_playerHandsHostRectList = [] // (房主)玩家的全部手牌路径信息
  for (let n = 0; n < 5; n++) {
    p.MG_playerHandsHostRectList.push(
      {
        x: p.MG_playerHandsFirstX + (p.MG_playerHandsW + p.MG_playerHandsPad) * n,
        y: p.MG_playerHandsHostY,
        w: p.MG_playerHandsW,
        h: p.MG_playerHandsH
      }
    )
  }

  p.MG_playerHandsGuestRectList = [] // (访客)玩家的全部手牌路径信息
  for (let n = 0; n < 5; n++) {
    p.MG_playerHandsGuestRectList.push(
      {
        x: p.MG_playerHandsFirstX + (p.MG_playerHandsW + p.MG_playerHandsPad) * n,
        y: p.MG_playerHandsGuestY,
        w: p.MG_playerHandsW,
        h: p.MG_playerHandsH
      }
    )
  }

  p.MG_tableAreaX = 0 // 桌面区域x偏移量
  p.MG_tableAreaY = p.MG_playerAreaH // 桌面区域y偏移量

  p.MG_tableLibraryX = p.MG_tableAreaX + tableAreaXPad // 牌库区域x偏移量
  p.MG_tableLibraryY = p.MG_tableAreaY + tableAreaYPad // 牌库区域y偏移量

  p.MG_tableNumX = p.MG_tableLibraryX + p.MG_tableLibraryW + 10 // 牌库区域x偏移量
  p.MG_tableNumY = p.MG_tableAreaY + tableAreaYPad // 牌库区域y偏移量

  p.MG_tableSuccessCardsX = p.MG_tableNumX + 60 // 成功的卡牌区域x偏移量
  p.MG_tableSuccessCardsY = p.MG_tableAreaY + tableAreaYPad // 成功的卡牌区域y偏移量
  p.MG_tableSuccessCardsPad = 6 // 成功的卡牌区域之间的留白

  p.MG_tableDiscardX = p.MG_tableAreaX + p.MG_tableAreaW - p.MG_tableDiscardW - 10 // 弃牌堆x偏移量
  p.MG_tableDiscardY = p.MG_tableAreaY + tableAreaYPad // 弃牌堆y偏移量

  p.MG_historyAreaX = 0 // 游戏历史区域x偏移量
  p.MG_historyAreaY = p.MG_playerAreaH + p.MG_tableAreaH // 游戏历史区域y偏移量

  p.MG_infoFontSize = 16



  return p
}

// 操作框
let gameOperationParam =  (p) => {
  p.GO_areaBgColor = '#5fc0f3'        //区域背景色
  p.GO_okBtnBgColor = '#5cb85c'       //确定按钮背景
  p.GO_okBtnTextColor = '#ffffff'     //确定按钮文字
  p.GO_cancelBtnBgColor = '#d9534f'   //取消按钮背景
  p.GO_cancelBtnTextColor = '#ffffff' //取消按钮文字


  p.GO_areaX = p.width / 4            //区域X偏移量
  p.GO_areaY = 200                    //区域Y偏移量
  p.GO_areaW = p.width / 2            //区域宽度
  p.GO_areaH = p.GO_areaW / 1.5       //区域高度


  p.GO_okBtnX = p.GO_areaX + 20
  p.GO_okBtnY = p.GO_areaY + 100
  p.GO_okBtnW = 40
  p.GO_okBtnH = p.GO_okBtnW / 2
  p.GO_cancelBtnX = p.GO_okBtnX + 100
  p.GO_cancelBtnY = p.GO_okBtnY
  p.GO_cancelBtnW = p.GO_okBtnW
  p.GO_cancelBtnH = p.GO_okBtnH


  return p;
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
        //5.游戏操作框参数
        p = gameOperationParam(p)


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
