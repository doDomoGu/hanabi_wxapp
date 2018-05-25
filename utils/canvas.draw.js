

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
  //
  // // console.log('A:',ptA.x, ptA.y)
  // // console.log('B:',ptB.x, ptB.y)
  // // console.log('C:',ptC.x, ptC.y)
  // // console.log('D:',ptD.x, ptD.y)
  // // console.log('E:',ptE.x, ptE.y)
  // // console.log('F:',ptF.x, ptF.y)
  // // console.log('G:',ptG.x, ptG.y)
  // // console.log('H:',ptH.x, ptH.y)
  //
  ctx.beginPath()
  ctx.moveTo(ptA.x, ptA.y)
  ctx.arcTo(ptB.x, ptB.y, ptC.x, ptC.y, radius)
  ctx.arcTo(ptC.x, ptC.y, ptD.x, ptD.y, radius)
  ctx.arcTo(ptD.x, ptD.y, ptE.x, ptE.y, radius)
  ctx.arcTo(ptE.x, ptE.y, ptA.x, ptA.y, radius)
  // ctx.stroke();  //边框绘制 根据笔触样式(strokeStyle)
  ctx.fill()
  ctx.draw(true)
}


const roomList = (roomList, p) => {
  const ctx = wx.createCanvasContext('roomListCanvas')
  //清空内容
  ctx.clearRect(0,0,p.width,p.height)

  //区域背景填充
  ctx.setFontSize(p.RL_fontSize)
  ctx.fillStyle = p.RL_bgColor;
  ctx.rect(p.leftPad,p.topPad,p.innerWidth,p.RL_innerHeight)
  ctx.fill()
  //ctx.draw(true)
  //列表文字绘制
  // ctx.setFontSize(p.fontSize)
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  for(let i = 0 ; i < roomList.length ; i++){
    if (i % 2 === 0) {
      ctx.setFillStyle(p.RL_bgColor);
    } else {
      ctx.setFillStyle(p.RL_bgColor2);
    }
    ctx.rect(p.leftPad, p.RL_innerTopPad + p.RL_innerLineHeight * i - 16, p.innerWidth, p.RL_innerLineHeight)
    ctx.fill()
    //ctx.draw(true)

    if (i % 2 === 0) {
      ctx.setFillStyle(p.RL_fontColor);
    } else {
      ctx.setFillStyle(p.RL_fontColor2);
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


const myRoom = (data,p) => {
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
  drawPlayerInfo({}, true, p, ctx)
  drawPlayerInfo({}, false, p, ctx)
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




const drawPlayerInfo = function (info, isHost,  p, ctx) {
  let rectY, textY

  if (isHost) {
    rectY = p.MR_playerInfoHostY
    textY = p.MR_playerInfoHostY  + p.MR_playerInfoHeight / 2
  } else {
    rectY = p.MR_playerInfoGuestY
    textY = p.MR_playerInfoGuestY + p.MR_playerInfoHeight / 2
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
  let playerName = info.id > -1 ? info.name + (isHost === isHost ? ' (你)' : '') : '--'
  ctx.fillText((isHost ? '房主' : '玩家') + ' : ' + playerName, p.MR_playerInfoTextX , textY)
  ctx.draw(true)
}



module.exports = {
  roomList : roomList,
  myRoom : myRoom
}