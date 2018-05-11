// let page = {
//   width : 0,
//   height : 0,
//   height
// }

let MyRoomPage = {
//   playerAreaX = this.topLeftPad // 玩家区域x偏移量(相对整个画布)
// this.playerAreaHostY = MyCanvas.px2Rem(10) * this.ratio // 房主玩家区域y偏移量(相对整个画布)
// this.playerAreaGuestY = MyCanvas.px2Rem(160) * this.ratio // 访客玩家区域y偏移量(相对整个画布)
// this.playerAreaHeight = MyCanvas.px2Rem(140) * this.ratio // 玩家区域的高度
// this.playerAreaWidth = this.topWidth // 玩家区域的宽度
//
// this.playerButtonXOffset = MyCanvas.px2Rem(20) * this.ratio // 玩家区域内按钮x偏移量(相对玩家区域)
// this.playerButtonYOffset = MyCanvas.px2Rem(80) * this.ratio // 玩家区域内按钮y偏移量(相对玩家区域)
// this.playerButtonWidth = MyCanvas.px2Rem(100) * this.ratio // 玩家区域内按钮宽度
// this.playerButtonHeight = MyCanvas.px2Rem(30) * this.ratio // 玩家区域内按钮高度
//
// this.playerButtonTextXOffset = MyCanvas.px2Rem(20) * this.ratio // 玩家区域内按钮内文字x偏移量(相对按钮区域)
// this.playerButtonTextYOffset = MyCanvas.px2Rem(20) * this.ratio // 玩家区域内按钮内文字y偏移量(相对按钮区域)
}


let commonParam = (p) => {
  p.topPad = 10 * p.ratio // 上侧pad
  p.leftPad = p.rightPad =  10 * p.ratio // 左右两侧pad
  p.innerWidth = p.width - p.leftPad - p.rightPad // 去除左右pad后的宽度
  return p
}

let roomListParam = (p) => {
  p.RL_bgColor = '#FFFFFF'
  p.RL_fontColor = '#2510cc'
  p.RL_fontSize = 20

  p.RL_innerHeight = 400
  p.RL_innerLeftPad = p.leftPad + 20 * p.ratio
  p.RL_innerTopPad = 100
  p.RL_innerLineHeight = 30 
  p.RL_innerTitleLeftPad = p.RL_innerLeftPad + 50 * p.ratio

  return p
}


// 画布初始化 ：获得并设置高度/宽度/像素比  设置绘图的各种参数 位置/高度/宽度/颜色/样式
const init = (t) => {
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
