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

    ctx.fillStyle = p.GO_playBtnBgColor
    drawRoundedRect(
      {
        x:p.GO_playBtnX,
        y:p.GO_playBtnY,
        w:p.GO_playBtnW,
        h:p.GO_playBtnH
      },
      p.radius,
      ctx
    )



    ctx.fillStyle = p.GO_discardBtnBgColor
    drawRoundedRect(
      {
        x:p.GO_discardBtnX,
        y:p.GO_discardBtnY,
        w:p.GO_discardBtnW,
        h:p.GO_discardBtnH
      },
      p.radius,
      ctx
    )


    ctx.setFontSize(13)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    ctx.fillStyle = p.GO_areaTextColor
    ctx.fillText('选择要进行的操作', p.GO_areaX + p.GO_areaW / 2, p.GO_areaY + 30)

    ctx.fillStyle = p.GO_playBtnTextColor
    ctx.fillText(p.GO_playBtnText, p.GO_playBtnX + p.GO_playBtnW / 2, p.GO_playBtnY + p.GO_playBtnH / 2)

    ctx.fillStyle = p.GO_discardBtnTextColor
    ctx.fillText(p.GO_discardBtnText, p.GO_discardBtnX + p.GO_discardBtnW / 2, p.GO_discardBtnY + p.GO_discardBtnH / 2)

  } else {
    //点击了对面的手牌


  }

  ctx.draw(true)
}