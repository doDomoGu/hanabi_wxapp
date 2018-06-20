const {drawRoundedRect}   = require('./common_func')

module.exports = (tap, data, p) => {
  const ctx = wx.createCanvasContext('gameOperationSelfCanvas')

  const isHost = data.isHost
  //const cardOrd = tap.ord

  ctx.fillStyle = p.GOS_areaBgColor
  drawRoundedRect(
    {
      x:p.GOS_areaX,
      y:p.GOS_areaY,
      w:p.GOS_areaW,
      h:p.GOS_areaH
    },
    p.radius,
    ctx
  )

  if (tap.gameOperation === 'self') {
    //点击了自己的手牌
    ctx.fillStyle = p.GOS_playBtnBgColor
    drawRoundedRect(
      {
        x:p.GOS_playBtnX,
        y:p.GOS_playBtnY,
        w:p.GOS_playBtnW,
        h:p.GOS_playBtnH
      },
      p.radius,
      ctx
    )



    ctx.fillStyle = p.GOS_discardBtnBgColor
    drawRoundedRect(
      {
        x:p.GOS_discardBtnX,
        y:p.GOS_discardBtnY,
        w:p.GOS_discardBtnW,
        h:p.GOS_discardBtnH
      },
      p.radius,
      ctx
    )


    ctx.setFontSize(13)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    ctx.fillStyle = p.GOS_areaTextColor
    ctx.fillText('选择要进行的操作', p.GOS_areaX + p.GOS_areaW / 2, p.GOS_areaY + 30)

    ctx.fillStyle = p.GOS_playBtnTextColor
    ctx.fillText(p.GOS_playBtnText, p.GOS_playBtnX + p.GOS_playBtnW / 2, p.GOS_playBtnY + p.GOS_playBtnH / 2)

    ctx.fillStyle = p.GOS_discardBtnTextColor
    ctx.fillText(p.GOS_discardBtnText, p.GOS_discardBtnX + p.GOS_discardBtnW / 2, p.GOS_discardBtnY + p.GOS_discardBtnH / 2)

  } else if (tap.gameOperation === 'opposite') {
    //点击了对面的手牌


  }

  ctx.draw(true)
}