const {drawRoundedRect}   = require('./common_func')


module.exports = (data, p) => {

  const drawPlayerInfo = function (data, isHost, p, ctx) {
    let rectY, player

    if (isHost) {
      rectY = p.MR_playerInfoHostY
      player = data.hostPlayer
    } else {
      rectY = p.MR_playerInfoGuestY
      player = data.guestPlayer
    }

    const rect = {
      x: p.MR_playerInfoX,
      y: rectY,
      w: p.MR_playerInfoWidth,
      h: p.MR_playerInfoHeight
    }

    ctx.fillStyle = p.MR_playerInfoBgColor
    drawRoundedRect(rect, p.radius, ctx)

    ctx.setFontSize(p.MR_playerInfoTextFontSize)
    ctx.fillStyle = p.MR_playerInfoTextColor
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'

    let playerName = player.id > -1 ? player.name + (isHost === data.isHost ? ' (你)' : '') : '--'
    ctx.fillText((isHost ? '房主' : '玩家') + ' : ' + playerName, p.MR_playerInfoTextX , rectY + p.MR_playerInfoHeight / 2)
    //ctx.draw(true)
  }


  const drawPlayerButton = function (data, isHost, isReady, p, ctx) {
    let rectY, player

    if (isHost) {
      rectY = p.MR_playerButtonHostY
      player = data.hostPlayer
      if (!data.isHost || player.id === -1 ) {
        return false
      }
    } else {
      rectY = p.MR_playerButtonGuestY
      player = data.guestPlayer
      if (data.isHost || player.id === -1 ) {
        return false
      }
    }

    const rect = {
      x: p.MR_playerButtonX,
      y: rectY,
      w: p.MR_playerButtonWidth,
      h: p.MR_playerButtonHeight
    }

    let textY = rectY + p.MR_playerButtonHeight / 2

    ctx.setFontSize( p.MR_playerButtonHeight / 2)
    ctx.textAlign = 'left'
    ctx.fillStyle = p.MR_playerAreaBgColor
    ctx.textBaseline = 'middle'

    /*drawRoundedRect(rectHost, p.radius, ctx)
    drawRoundedRect(rectGuest, p.radius, ctx)*/

    if (isHost) {
      if (isReady) {
        ctx.fillStyle = p.MR_playerButtonBgColor
      } else {
        ctx.fillStyle = p.MR_playerButtonDisableBgColor
      }

      drawRoundedRect(rect, p.radius, ctx)

      if (isReady) {
        ctx.fillStyle = p.MR_playerButtonTextColor
      } else {
        ctx.fillStyle = p.MR_playerButtonDisableTextColor
      }

      ctx.fillText('开始游戏！', rect.x + p.MR_playerButtonPad, textY)

    } else {
      ctx.fillStyle = p.MR_playerButtonBgColor
      drawRoundedRect(rect, p.radius, ctx)

      ctx.fillStyle = p.MR_playerButtonTextColor
      let readyText
      if (isReady) {
        readyText = '取消准备'
      } else {
        readyText = '准备！'
      }
      ctx.fillText(readyText, rect.x + p.MR_playerButtonPad, textY)
    }
  }


  const ctx = wx.createCanvasContext('myRoomCanvas')
  // 绘制玩家1和玩家2区域
  ctx.fillStyle = p.MR_playerAreaBgColor
  drawRoundedRect(
    {
      x: p.MR_playerAreaX,
      y: p.MR_playerAreaHostY,
      w: p.MR_playerAreaWidth,
      h: p.MR_playerAreaHeight
    },
    p.radius,
    ctx
  )
  drawRoundedRect(
    {
      x: p.MR_playerAreaX,
      y: p.MR_playerAreaGuestY,
      w: p.MR_playerAreaWidth,
      h: p.MR_playerAreaHeight
    },
    p.radius,
    ctx
  )
  drawPlayerInfo(data, true, p, ctx)
  drawPlayerButton(data, true, data.isReady, p , ctx)

  drawPlayerInfo(data, false, p, ctx)
  drawPlayerButton(data, false, data.isReady, p , ctx)
  // 绘制退出按钮
  ctx.fillStyle = p.MR_exitButtonColor
  drawRoundedRect(
    {
      x: p.MR_exitBtnX,
      y: p.MR_exitBtnY,
      w: p.MR_exitBtnW,
      h: p.MR_exitBtnH
    },
    p.radius,
    ctx
  )
  ctx.setFontSize(p.MR_exitTextFontSize)
  ctx.fillStyle = '#FFFFFF'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('退出房间', p.width / 2, p.MR_exitBtnY + p.MR_exitBtnH / 2)
  ctx.draw(true)
}