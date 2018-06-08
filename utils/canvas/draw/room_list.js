module.exports = (roomList, p) => {
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