const {drawRoundedRect}   = require('./common_func')

module.exports = (tap, data, p) => {
  const ctx = wx.createCanvasContext('gameOperationSelfCanvas')

  const isHost = data.isHost
  const tapIsHost = tap.isHost
  //const cardOrd = tap.ord

  ctx.fillStyle = p.GO_areaBgColor
  drawRoundedRect(
    {
      x:p.GO_areaX,
      y:p.GO_areaY,
      w:p.GO_areaW,
      h:p.GO_areaH
    },
    p.radius,
    ctx
  )

  if (isHost === tapIsHost) {
    //点击了自己的手牌

    ctx.fillStyle = p.GO_okBtnBgColor
    drawRoundedRect(
      {
        x:p.GO_okBtnX,
        y:p.GO_okBtnY,
        w:p.GO_okBtnW,
        h:p.GO_okBtnH
      },
      p.radius,
      ctx
    )



    ctx.fillStyle = p.GO_cancelBtnBgColor
    drawRoundedRect(
      {
        x:p.GO_cancelBtnX,
        y:p.GO_cancelBtnY,
        w:p.GO_cancelBtnW,
        h:p.GO_cancelBtnH
      },
      p.radius,
      ctx
    )


    ctx.setFontSize(13)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    ctx.fillStyle = p.GO_areaTextColor
    ctx.fillText('选择要进行的操作', p.GO_areaX + p.GO_areaW / 2, p.GO_areaY + 30)

    ctx.fillStyle = p.GO_okBtnTextColor
    ctx.fillText('确定', p.GO_okBtnX + p.GO_okBtnW / 2, p.GO_okBtnY + p.GO_okBtnH / 2)

    ctx.fillStyle = p.GO_cancelBtnTextColor
    ctx.fillText('取消', p.GO_cancelBtnX + p.GO_cancelBtnW / 2, p.GO_cancelBtnY + p.GO_cancelBtnH / 2)

  } else {
    //点击了对面的手牌


  }

  ctx.draw(true)
}