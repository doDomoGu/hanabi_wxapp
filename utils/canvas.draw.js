const run = (t) => {
  const d = t.data
  const p = t.data.canvasParam

  // if() {
  //
  // }

}

// 函数：绘制圆角矩形
const drawRoundedRect = function (rect, radius, ctx) {
  //ctx.fillRect(rect.x,rect.y,rect.w,rect.h)

  const point = function (x, y) {
    return { x: x, y: y }
  }
  const ptA = point(rect.x + radius, rect.y)
  const ptB = point(rect.x + rect.w, rect.y)
  const ptC = point(rect.x + rect.w, rect.y + rect.h)
  const ptD = point(rect.x, rect.y + rect.h)
  const ptE = point(rect.x, rect.y)

  ctx.beginPath()
  ctx.moveTo(ptA.x, ptA.y)
  ctx.arcTo(ptB.x, ptB.y, ptC.x, ptC.y, radius)
  ctx.arcTo(ptC.x, ptC.y, ptD.x, ptD.y, radius)
  ctx.arcTo(ptD.x, ptD.y, ptE.x, ptE.y, radius)
  ctx.arcTo(ptE.x, ptE.y, ptA.x, ptA.y, radius)
  ctx.closePath()
  // ctx.stroke();  //边框绘制 根据笔触样式(strokeStyle)
  ctx.fill()
  ctx.draw(true)
}


const roomList = (roomList, p) => {
  const ctx = wx.createCanvasContext('roomListCanvas')
  //清空内容
  ctx.clearRect(0,0,p.width,p.height)

  //区域背景填充
  ctx.fillStyle = p.RL_bgColor;
  ctx.rect(p.leftPad,p.topPad,p.innerWidth,p.RL_innerHeight)
  ctx.fill()
  ctx.draw(true)

  //列表文字设置字号/对齐方式等
  ctx.setFontSize(p.RL_fontSize)
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'

  //列表文字绘制
  for(let i = 0 ; i < roomList.length ; i++){
    if (i % 2 === 0) {
      ctx.fillStyle = p.RL_bgColor1;
    } else {
      ctx.fillStyle = p.RL_bgColor2;
    }
    ctx.rect(p.leftPad, p.RL_innerTopPad + p.RL_innerLineHeight * i - 16, p.innerWidth, p.RL_innerLineHeight)
    ctx.fill()
    ctx.draw(true)

    if (i % 2 === 0) {
      ctx.fillStyle = p.RL_fontColor1;
    } else {
      ctx.fillStyle = p.RL_fontColor2;
    }
    let id = roomList[i].id
    id = id < 10 ? '00' + id : '0' + id
    let title = roomList[i].title
    let isLocked = roomList[i].password!==''

    ctx.fillText(id, p.RL_innerLeftPad, p.RL_innerTopPad + p.RL_innerLineHeight * i)
    ctx.fillText(title, p.RL_innerTitleLeftPad, p.RL_innerTopPad + p.RL_innerLineHeight * i)
    if(isLocked)
      ctx.fillText('locked', p.RL_innerLockLeftPad, p.RL_innerTopPad + p.RL_innerLineHeight * i)
    ctx.draw(true)
  }
}


const myRoom = (data, p) => {
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

const myGame = (data, p) => {
  const ctx = wx.createCanvasContext('myGameCanvas')
  // 绘制玩家1和玩家2区域
  console.log(ctx)

  console.log('draw myGame')

  return true

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



module.exports = {
  roomList : roomList,
  myRoom : myRoom,
  myGame : myGame,
  run : run
}