const {drawRoundedRect}   = require('./common_func')

module.exports = (tap, data, p) => {
  const ctx = wx.createCanvasContext('gameOperationOppositeCanvas')

  // const isHost = data.isHost
  const cardOrd = tap.ord
  const cardColor = data.colorsCn[tap.color]
  const cardNum = data.numbers[tap.num]


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


  ctx.fillStyle = p.GOO_cueNumBgColor
  drawRoundedRect(
    {
      x:p.GOO_cueNumX,
      y:p.GOO_cueNumY,
      w:p.GOO_cueNumW,
      h:p.GOO_cueNumH
    },
    p.radius,
    ctx
  )
  

  ctx.fillStyle = p.GOO_cueColorBgColor
  drawRoundedRect(
    {
      x:p.GOO_cueColorX,
      y:p.GOO_cueColorY,
      w:p.GOO_cueColorW,
      h:p.GOO_cueColorH
    },
    p.radius,
    ctx
  )


  ctx.setFontSize(13)
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  ctx.fillStyle = p.GOO_areaTextColor
  ctx.fillText('你选择的是【?】 选择要进行的操作'.replace('?',cardColor+' - '+ cardNum), p.GOO_areaX + p.GOO_areaW / 2, p.GOO_areaY + 30)
  
  ctx.fillStyle = p.GOO_cueNumTextColor
  ctx.fillText(p.GOO_cueNumText.replace('?',cardNum), p.GOO_cueNumX + p.GOO_cueNumW / 2, p.GOO_cueNumY + p.GOO_cueNumH / 2)

  ctx.fillStyle = p.GOO_cueColorTextColor
  ctx.fillText(p.GOO_cueColorText.replace('?',cardColor), p.GOO_cueColorX + p.GOO_cueColorW / 2, p.GOO_cueColorY + p.GOO_cueColorH / 2)



  ctx.draw(true)
}