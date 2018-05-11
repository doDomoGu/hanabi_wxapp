let commonParam = (p) => {
  p.topPad = 10 // 上边距
  p.leftPad = p.rightPad =  10 * p.ratio // 左右边距
  p.innerWidth = p.width - p.leftPad - p.rightPad // 去除左右边距后的宽度
  return p
}

let roomListParam = (p) => {
  p.RL_bgColor = '#FFFFFF'  //区域背景色
  p.RL_fontColor = '#2510cc' //文字颜色
  p.RL_fontSize = 20  //文字尺寸

  p.RL_innerHeight = 400  //区域高度
  p.RL_innerLeftPad = p.leftPad + 20 * p.ratio //区域左边距（相对整个画布）
  p.RL_innerTopPad = p.topPad + 80  //区域上边距 （相对整个画布）
  p.RL_innerLineHeight = 30  //列表行高
  p.RL_innerTitleLeftPad = p.RL_innerLeftPad + 50 * p.ratio //列表标题左边距（相对整个画布）

  return p
}

let myRoomParam =  (p) => {
  p.MR_playerAreaX = p.leftPad // 玩家区域x偏移量(相对整个画布)
  p.MR_playerAreaHostY = 10 * p.ratio // 房主玩家区域y偏移量(相对整个画布)
  p.MR_playerAreaGuestY = 160 * p.ratio // 访客玩家区域y偏移量(相对整个画布)
  p.MR_playerAreaHeight = 140 * p.ratio // 玩家区域的高度
  p.MR_playerAreaWidth = p.innerWidth // 玩家区域的宽度

  p.MR_playerButtonXOffset = 20 * p.ratio // 玩家区域内按钮x偏移量(相对玩家区域)
  p.MR_playerButtonYOffset = 80 * p.ratio // 玩家区域内按钮y偏移量(相对玩家区域)
  p.MR_playerButtonWidth = 100 * p.ratio // 玩家区域内按钮宽度
  p.MR_playerButtonHeight = 30 * p.ratio // 玩家区域内按钮高度

  p.MR_playerButtonTextXOffset = 20 * p.ratio // 玩家区域内按钮内文字x偏移量(相对按钮区域)
  p.MR_playerButtonTextYOffset = 20 * p.ratio // 玩家区域内按钮内文字y偏移量(相对按钮区域)

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
}

const drawRoomList = (roomList, p) => {
  const ctx = wx.createCanvasContext('roomListCanvas')

  //区域背景填充
  ctx.setFillStyle(p.RL_bgColor);
  ctx.rect(p.leftPad,p.topPad,p.innerWidth,p.RL_innerHeight)
  ctx.fill()


  //列表文字
  ctx.setFillStyle(p.RL_fontColor);
  ctx.setFontSize(p.RL_fontSize)
  ctx.setTextAlign('left')
  for(let i=0; i < roomList.length; i++){
    let id = roomList[i].id
    id = id < 10 ? '00' + id : '0' + id
    let title = roomList[i].title

    ctx.fillText(id, p.RL_innerLeftPad, p.RL_innerTopPad + p.RL_innerLineHeight * i)
    ctx.fillText(title, p.RL_innerTitleLeftPad, p.RL_innerTopPad + p.RL_innerLineHeight * i)


  }

  //return ctx
  ctx.draw(true);


}

module.exports = {
  init: init,
  drawRoomList : drawRoomList
}
