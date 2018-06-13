const {drawRoundedRect}   = require('./common_func')

module.exports = (data, p) => {
  const drawPlayerInfo = (data, isHost, p, ctx) => {
    let rectYOffset, textYOffset, player
    if (isHost) {
      rectYOffset = p.MG_playerInfoHostY
      textYOffset = p.MG_playerInfoHostY + p.MG_playerInfoH / 2
      player = data.hostPlayer
    } else {
      rectYOffset = p.MG_playerInfoGuestY
      textYOffset = p.MG_playerInfoGuestY + p.MG_playerInfoH / 2
      player = data.guestPlayer
    }
    const rect = {
      x: p.MG_playerInfoX,
      y: rectYOffset,
      w: p.MG_playerInfoW,
      h: p.MG_playerInfoH
    }
    ctx.fillStyle = p.MG_playerInfoBgColor

    drawRoundedRect(rect, p.radius, ctx)
    ctx.font = '18px Microsoft JhengHei'
    ctx.fillStyle = p.MG_playerInfoTextColor
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText((isHost ? '房主' : '玩家') + ' : ' + player.name + (data.isHost === isHost ? ' (你)' : ''), p.MG_playerInfoTextX, textYOffset)
  }


  const drawHands = function (data, isHost, p, ctx) {
    const numbers = data.numbers

    let drawHandOne = function (rect, isInvisible, card) {
      if (isInvisible) {
        ctx.fillStyle = p.MG_playerHandsBackColor
      } else {
        ctx.fillStyle = p.MG_playerHandsColors[card.color]
      }
      drawRoundedRect(rect, p.radius, ctx)
      /*ctx.strokeStyle = p.MG_playerHandsStrokeColor
      ctx.stroke()*/

      ctx.setFontSize(30)
      ctx.fillStyle = p.MG_playerInfoTextColor
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      let cardText
      if (isInvisible) {
        cardText = (parseInt(card.ord) + 1).toString()
      } else {
        cardText = numbers[card.num]
      }
      ctx.fillText(cardText, rect.x + rect.w / 2, rect.y + rect.h / 2)
      ctx.draw(true)
    }

    let rect_list, cards
    if (isHost) {
      rect_list = p.MG_playerHandsHostRectList
      cards = data.card.hostHands
    } else {
      rect_list = p.MG_playerHandsGuestRectList
      cards = data.card.guestHands
    }

    for (const c in cards) {
      // data.isHost === isHost 是你的牌  牌面不可见 牌背灰色
      // data.isHost !== isHost 对方的牌  牌面可见 颜色对应
      drawHandOne(rect_list[c], data.isHost === isHost, cards[c])
    }
  }

  const drawLibraryCardsNum = (num, p, ctx) => {
    ctx.fillStyle = p.MG_tableLibraryBgColor
    drawRoundedRect(
      {
        x: p.MG_tableLibraryX,
        y: p.MG_tableLibraryY,
        w: p.MG_tableLibraryW,
        h: p.MG_tableLibraryH
      },
      p.radius,
      ctx
    )
    //ctx.stroke()

    ctx.font = '18px Microsoft JhengHei'
    ctx.fillStyle = p.MG_playerInfoTextColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'
    ctx.fillText('剩余', p.MG_tableLibraryX + p.MG_tableLibraryW / 2, p.MG_tableLibraryY + p.MG_tableLibraryH / 2)
    ctx.textBaseline = 'top'
    ctx.fillText(num + '张', p.MG_tableLibraryX + p.MG_tableLibraryW / 2, p.MG_tableLibraryY + p.MG_tableLibraryH / 2)
  }

  const drawDiscardCardsNum = (num, p, ctx) => {
    const that = this
    ctx.fillStyle = p.MG_tableDiscardBgColor
    drawRoundedRect(
      {
        x: p.MG_tableDiscardX,
        y: p.MG_tableDiscardY,
        w: p.MG_tableDiscardW,
        h: p.MG_tableDiscardH
      },
      p.radius,
      ctx
    )
    //ctx.stroke()

    ctx.font = '20px Microsoft JhengHei'
    ctx.fillStyle = p.MG_playerInfoTextColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'
    ctx.fillText('弃牌', p.MG_tableDiscardX + p.MG_tableDiscardW / 2, p.MG_tableDiscardY + p.MG_tableDiscardH / 2)
    ctx.textBaseline = 'top'
    ctx.fillText(num + '张', p.MG_tableDiscardX + p.MG_tableDiscardW / 2, p.MG_tableDiscardY + p.MG_tableDiscardH / 2)
  }


  const drawCueNum = (num, p, ctx) => {
    ctx.fillStyle = p.MG_tableAreaBgColor
    ctx.fillRect(p.MG_tableNumX, p.MG_tableNumY + 4, 40, 20)

    ctx.font = p.MG_infoFontSize+ 'px Microsoft JhengHei'
    ctx.fillStyle = p.MG_playerInfoTextColor
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    ctx.fillText('提示:' + num, p.MG_tableNumX, p.MG_tableNumY + 4)
  }

  const drawChanceNum = (num, p, ctx) => {
    ctx.fillStyle = p.MG_tableAreaBgColor
    ctx.fillRect(p.MG_tableNumX, p.MG_tableNumY + 24, 40, 20)

    ctx.font = p.MG_infoFontSize + 'px Microsoft JhengHei'
    ctx.fillStyle = p.MG_playerInfoTextColor
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    ctx.fillText('机会:' + num, p.MG_tableNumX, p.MG_tableNumY + 24)
  }

  const drawScore = (score, p, ctx) => {
    const that = this
    ctx.fillStyle = p.MG_tableAreaBgColor
    ctx.fillRect(p.MG_tableNumX, p.MG_tableNumY + 44, 40, 20)

    ctx.font = p.MG_infoFontSize + 'px Microsoft JhengHei'
    ctx.fillStyle = p.MG_playerInfoTextColor
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    ctx.fillText('分数:' + score, p.MG_tableNumX, p.MG_tableNumY + 44)
  }

  const drawSuccessCards = (cards, p, ctx) => {
    for (const c in cards) {
      const rect = {
        x: p.MG_tableSuccessCardsX + (p.MG_tableSuccessCardsW + p.MG_tableSuccessCardsPad) * c,
        y: p.MG_tableSuccessCardsY,
        w: p.MG_tableSuccessCardsW,
        h: p.MG_tableSuccessCardsH
      }

      ctx.fillStyle = p.MG_playerHandsColors[c]
      drawRoundedRect(rect, p.radius, ctx)
      ctx.strokeStyle = p.MG_playerHandsStrokeColor
      ctx.stroke()

      ctx.font = '15px Microsoft JhengHei'
      ctx.fillStyle = p.MG_playerInfoTextColor
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(cards[c], rect.x + rect.w / 2, rect.y + rect.h / 2)
    }
  }

  const drawRoundPlayerIsHost = (isHost, p, ctx) => {
    const x = p.MG_playerInfoX + p.MG_playerInfoW - 120
    const w = 120
    const h = p.MG_playerInfoH

    const rectHost = {
      x: x,
      y: p.MG_playerInfoHostY,
      w: w,
      h: h
    }

    const rectGuest = {
      x: x,
      y: p.MG_playerInfoGuestY,
      w: w,
      h: h
    }

    let rect = isHost ? rectHost : rectGuest
    let textY = rect.y + p.MG_playerInfoH / 2

    ctx.fillStyle = p.MG_playerInfoBgColor
    drawRoundedRect(rectHost, p.radius, ctx)
    drawRoundedRect(rectGuest, p.radius, ctx)

    ctx.font = '13px Microsoft JhengHei'
    ctx.fillStyle = p.MG_playerInfoTextColor
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText('(当前回合玩家)', rect.x, textY)
  }

  const drawRoundCountdown = (isHost, lastUpdated, p, ctx) => {
    const x = p.MG_playerInfoX + p.MG_playerInfoW - 50
    const w = 30
    const h = p.MG_playerInfoH

    let rect

    if (isHost) {
      rect = {
        x: x,
        y: p.MG_playerInfoHostY,
        w: w,
        h: h
      }
    } else {
      rect = {
        x: x,
        y: p.MG_playerInfoGuestY,
        w: w,
        h: h
      }
    }

    let textY = rect.y + rect.h / 2

    ctx.fillStyle = p.MG_playerInfoBgColor
    drawRoundedRect(rect, p.radius, ctx)
    /*drawRoundedRect(rectHost, p.radius, ctx)
    drawRoundedRect(rectGuest, p.radius, ctx)*/

    ctx.font = '13px Microsoft JhengHei'
    ctx.fillStyle = p.MG_playerInfoTextColor
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText((30 - parseInt((Date.parse(new Date().toString()) - Date.parse(lastUpdated)) / 1000 )).toString(), rect.x, textY)
  }

  const ctx = wx.createCanvasContext('myGameCanvas')

  // 绘制玩家1和玩家2区域
  ctx.fillStyle = p.MG_playerAreaBgColor
  ctx.fillRect(p.MG_playerAreaX, p.MG_playerAreaHostY, p.MG_playerAreaW, p.MG_playerAreaH)
  ctx.fillRect(p.MG_playerAreaX, p.MG_playerAreaGuestY, p.MG_playerAreaW, p.MG_playerAreaH)

  // 绘制桌面
  ctx.fillStyle = p.MG_tableAreaBgColor
  ctx.fillRect(p.MG_tableAreaX, p.MG_tableAreaY, p.MG_tableAreaW, p.MG_tableAreaH)

  // 绘制游戏历史区域
  ctx.fillStyle = p.MG_historyAreaBgColor
  ctx.fillRect(p.MG_historyAreaX, p.MG_historyAreaY, p.MG_historyAreaW, p.MG_historyAreaH)

  // 绘制玩家信息
  drawPlayerInfo(data, true, p, ctx)
  drawPlayerInfo(data, false, p, ctx)

  // 绘制玩家手牌
  drawHands(data, true, p, ctx)
  drawHands(data, false, p, ctx)

  // 绘制牌库
  drawLibraryCardsNum(data.card.libraryCardsNum, p, ctx)

  // 绘制弃牌堆
  drawDiscardCardsNum(data.card.discardCardsNum, p, ctx)


  // 绘制数字
  drawCueNum(data.card.cueNum, p, ctx)
  drawChanceNum(data.card.chanceNum, p, ctx)
  drawScore(data.card.score, p, ctx)

  // 成功燃放的卡片
  drawSuccessCards(data.card.successCards, p, ctx)

  // 绘制玩家是否当前回合
  drawRoundPlayerIsHost(data.game.roundPlayerIsHost, p, ctx)
  // drawRoundCountdown(data.game.roundPlayerIsHost, data.game.lastUpdated, p, ctx)


  ctx.draw(true)
}