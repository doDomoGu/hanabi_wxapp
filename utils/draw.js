// 画布初始化 ：获得并设置高度/宽度/像素比  设置绘图的各种参数 位置/高度/宽度/颜色/样式
const init = (t) => {
  return new Promise(function (resolve, reject) {
    wx.getSystemInfo({
      success: function (res) {
        const width = res.windowWidth
        const height = res.windowHeight
        const ratio = res.pixelRatio
        let p = t.data.canvasParam
        p.width = width
        p.height = height
        p.ratio = ratio
        p.topLeftPad = 10 * ratio // 左侧pad
        p.topWidth = width - p.topLeftPad * 2 // 去除左右pad后的宽度
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

const drawRoomList = (data) => {
  const ctx = wx.createCanvasContext('roomListCanvas')
  const p = data.canvasParam
  const roomList = data.roomList

  ctx.setFillStyle("#ffffff");
  ctx.rect(p.topLeftPad,70,p.topWidth,400)
  ctx.fill()


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

  //return ctx
  ctx.draw(true);


}

module.exports = {
  init: init,
  drawRoomList : drawRoomList
}
