const {drawRoundedRect}   = require('./common_func')

module.exports = (tap, data, p) => {
  const ctx = wx.createCanvasContext('gameOperationOppositeCanvas')

  // const isHost = data.isHost
  //const cardOrd = tap.ord

  ctx.fillStyle = p.GOO_areaBgColor
  drawRoundedRect(
    {
      x:p.GOO_areaX,
      y:p.GOO_areaY,
      w:p.GOO_areaW,
      h:p.GOO_areaH
    },
    p.radius,
    ctx
  )


  // ctx.fillStyle = p.GOO_playBtnBgColor
  // drawRoundedRect(
  //   {
  //     x:p.GOO_playBtnX,
  //     y:p.GOO_playBtnY,
  //     w:p.GOO_playBtnW,
  //     h:p.GOO_playBtnH
  //   },
  //   p.radius,
  //   ctx
  // )
  //
  //
  //
  // ctx.fillStyle = p.GOO_discardBtnBgColor
  // drawRoundedRect(
  //   {
  //     x:p.GOO_discardBtnX,
  //     y:p.GOO_discardBtnY,
  //     w:p.GOO_discardBtnW,
  //     h:p.GOO_discardBtnH
  //   },
  //   p.radius,
  //   ctx
  // )
  //
  //
  // ctx.setFontSize(13)
  // ctx.textAlign = 'center'
  // ctx.textBaseline = 'middle'
  //
  // ctx.fillStyle = p.GOO_areaTextColor
  // ctx.fillText('选择要进行的操作', p.GOO_areaX + p.GOO_areaW / 2, p.GOO_areaY + 30)
  //
  // ctx.fillStyle = p.GOO_playBtnTextColor
  // ctx.fillText(p.GOO_playBtnText, p.GOO_playBtnX + p.GOO_playBtnW / 2, p.GOO_playBtnY + p.GOO_playBtnH / 2)
  //
  // ctx.fillStyle = p.GOO_discardBtnTextColor
  // ctx.fillText(p.GOO_discardBtnText, p.GOO_discardBtnX + p.GOO_discardBtnW / 2, p.GOO_discardBtnY + p.GOO_discardBtnH / 2)



  ctx.draw(true)
}