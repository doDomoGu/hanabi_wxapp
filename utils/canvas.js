const Api    = require('./api.js')

let commonParam = (p) => {
  p.pad = 10 //一般间隔留白
  p.topPad =  p.pad // 上边距
  p.leftPad = p.rightPad =  p.pad// 左右边距
  p.innerWidth = p.width - p.leftPad - p.rightPad // 去除左右边距后的宽度
  p.radius = 10
  p.fontSize = '20px sans-serif'  //全局文字尺寸

  return p
}

let roomListParam = (p) => {
  p.RL_bgColor = '#FFFFFF'  //区域背景色
  p.RL_bgColor2 = '#2510cc'  //区域背景色2
  p.RL_fontColor = '#2510cc' //文字颜色
  p.RL_fontColor2 = '#FFFFFF' //文字颜色2

  p.RL_fontSize = 18  //文字尺寸

  p.RL_innerHeight = 400 //区域高度
  p.RL_innerLeftPad = p.leftPad + 10 //区域左边距（相对整个画布）
  p.RL_innerTopPad = p.topPad + 30  //区域上边距 （相对整个画布）
  p.RL_innerLineHeight = 32 //列表行高
  p.RL_innerTitleLeftPad = p.RL_innerLeftPad + 50 //列表标题左边距（相对整个画布）
  p.RL_innerLockLeftPad = p.RL_innerLeftPad + 100 //上锁标志左边距（相对整个画布）

  return p
}

let myRoomParam = (p) => {
  p.MR_playerAreaBgColor = '#5fc0f3' // 玩家区域的背景色
  p.MR_playerInfoBgColor = '#ccf0f1' // 玩家信息的背景色
  p.MR_playerInfoTextColor = '#283085' // 玩家信息的文本色

  p.MR_playerButtonBgColor = '#f18d98' // 玩家按钮的背景色
  p.MR_playerButtonTextColor = '#e7f1ef' // 玩家按钮的文本色
  p.MR_playerButtonDisableBgColor = '#e7f1ef' // 玩家按钮(禁用)的背景色
  p.MR_playerButtonDisableTextColor = '#626262' // 玩家按钮(禁用)的文本色

  p.MR_exitButtonColor = '#dc0c22' // 退出按钮颜色
  p.MR_exitButtonTouchColor = '#8d0917' // 退出按钮颜色(触摸时)

  p.MR_playerAreaX = p.leftPad // 玩家区域x偏移量(相对整个画布)
  p.MR_playerAreaHostY = p.topPad// 房主玩家区域y偏移量(相对整个画布)
  p.MR_playerAreaHeight = 140 // 玩家区域的高度
  p.MR_playerAreaWidth = p.innerWidth // 玩家区域的宽度
  p.MR_playerAreaGuestY = p.MR_playerAreaHostY + p.MR_playerAreaHeight + p.pad // 访客玩家区域y偏移量(相对整个画布)

  p.MR_playerInfoPad = 10;
  p.MR_playerInfoX = p.MR_playerAreaX + p.MR_playerInfoPad  //玩家信息区域x偏移量(相对整个画布)
  p.MR_playerInfoHostY = p.MR_playerAreaHostY + p.MR_playerInfoPad
  p.MR_playerInfoHeight = 40
  p.MR_playerInfoWidth = p.MR_playerAreaWidth - p.MR_playerInfoPad * 2
  p.MR_playerInfoGuestY = p.MR_playerAreaGuestY + p.MR_playerInfoPad

  p.MR_playerInfoTextX = p.MR_playerInfoX + 20
  //p.MR_playerInfoTextHostY = p.MR_playerInfoHostY + p.MR_playerInfoPad
  //p.MR_playerInfoTextGuestY = p.MR_playerInfoGuestY + p.MR_playerInfoPad
  p.MR_playerInfoTextFontSize = p.MR_playerInfoHeight / 2


  p.MR_playerButtonXOffset = 20 // 玩家区域内按钮x偏移量(相对玩家区域)
  p.MR_playerButtonYOffset = 80 // 玩家区域内按钮y偏移量(相对玩家区域)
  p.MR_playerButtonWidth = 100 // 玩家区域内按钮宽度
  p.MR_playerButtonHeight = 30 // 玩家区域内按钮高度

  p.MR_playerButtonTextXOffset = 20 // 玩家区域内按钮内文字x偏移量(相对按钮区域)
  p.MR_playerButtonTextYOffset = 20 // 玩家区域内按钮内文字y偏移量(相对按钮区域)

  p.MR_playerButtonRectHost = {
    x: p.MR_playerAreaX + p.MR_playerButtonXOffset,
    y: p.MR_playerAreaHostY + p.MR_playerButtonYOffset,
    w: p.MR_playerButtonWidth,
    h: p.MR_playerButtonHeight
  }
  p.MR_playerButtonRectGuest = {
    x: p.MR_playerAreaX + p.MR_playerButtonXOffset,
    y: p.MR_playerAreaGuestY + p.MR_playerButtonYOffset,
    w: p.MR_playerButtonWidth,
    h: p.MR_playerButtonHeight
  }

  p.MR_exitBtnX = p.leftPad // 退出按钮x偏移量(相对整个画布)
  p.MR_exitBtnY = 320 // 退出按钮y偏移量(相对整个画布)
  p.MR_exitBtnW = p.innerWidth // 退出按钮宽度
  p.MR_exitBtnH = p.MR_exitBtnW / 8 // 退出按钮高度
  p.MR_exitTextFontSize = p.MR_exitBtnH / 2

  //p.MR_exitBtnPad = 20 // 退出按钮内文字y偏移量(相对按钮区域)

  return p
}


let myGameParam =  (p) => {


  return p
}


// 函数：绘制圆角矩形
const drawRoundedRect = function (rect, radius, ctx) {
  ctx.fillRect(rect.x,rect.y,rect.w,rect.h)

  //ctx.draw(true)

  // const point = function (x, y) {
  //   return { x: x, y: y }
  // }
  // const ptA = point(rect.x + radius, rect.y)
  // const ptB = point(rect.x + rect.w, rect.y)
  // const ptC = point(rect.x + rect.w, rect.y + rect.h)
  // const ptD = point(rect.x, rect.y + rect.h)
  // const ptE = point(rect.x, rect.y)
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
  // ctx.beginPath()
  // ctx.moveTo(ptA.x, ptA.y)
  // ctx.arcTo(ptB.x, ptB.y, ptC.x, ptC.y, radius)
  // ctx.arcTo(ptC.x, ptC.y, ptD.x, ptD.y, radius)
  // ctx.arcTo(ptD.x, ptD.y, ptE.x, ptE.y, radius)
  // ctx.arcTo(ptE.x, ptE.y, ptA.x, ptA.y, radius)
  // // ctx.stroke();  //边框绘制 根据笔触样式(strokeStyle)
  // ctx.fill()
  // ctx.draw()
}

// 画布初始化 ：获得并设置高度/宽度/像素比  设置绘图的各种参数 位置/高度/宽度/颜色/样式
const init = (t) => {  // t = this
  return new Promise(function (resolve, reject) {
    wx.getSystemInfo({
      success: function (res) {
        let p = t.data.canvasParam
        p.width = res.windowWidth
        p.height = res.windowHeight
        p.ratio = res.pixelRatio
        // console.log('width : '+ p.width)
        // console.log('height : '+ p.height)
        // console.log('ratio : '+ p.ratio)


        //1.通用参数
        p = commonParam(p)
        //2.房间列表页面参数
        p = roomListParam(p)
        //3.房间页面参数
        p = myRoomParam(p)
        //4.游戏页面参数
        p = myGameParam(p)


        t.setData({
          canvasParam: p
        })

        //测试用
        initTest(p)

        resolve()
      }
    })
  })
}

const initTest = (p) => {
  const ctxRL = wx.createCanvasContext('roomListCanvas')
  const ctxMR = wx.createCanvasContext('myRoomCanvas')
  const ctxMG = wx.createCanvasContext('myGameCanvas')

  ctxRL.setFillStyle("#333333");
  ctxRL.setFontSize(p.fontSize)
  //ctxRL.setTextBaseline('top')
  ctxRL.fillText('room list canvas', p.leftPad + 10, 10)
  ctxRL.draw()

  ctxMR.setFillStyle("#333333");
  ctxMR.setFontSize(p.fontSize)
  ctxMR.fillText('my room canvas', p.leftPad + 10, 10)
  ctxMR.draw()

  ctxMG.setFillStyle("#333333");
  ctxMG.setFontSize(p.fontSize)
  ctxMG.fillText('my game canvas', p.leftPad + 10, 10)
  ctxMG.draw()
}

const drawRoomList = (roomList, p) => {
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
/*
 * roomlist :房间列表
 * r : 点击信息
 * t : 页面this对象
 * @param t          Information about the object.
 * @param t.data.roomList[].password   Information about the object's members.
 */
const tapRoomList = (r, t) => {
  return new Promise(function (resolve, reject) {
    // console.log(r)
    /*const x = r.detail.x
    const y = r.detail.y*/
    // console.log("鼠标指针坐标：" + x + "," + y);

    const p = t.data.canvasParam
    const roomList = t.data.roomList

    for (let i = 0; i < roomList.length; i++) {
      if (_isInPath({page: 'RoomList', item: 'list', ord: i}, r, p)) {
        if (roomList[i].password === '') {
          Api.enterRoom(roomList[i].id).then(function (re) {
            if (re.success) {
              clearInterval(t.data.roomListInterval)
              t.setData({
                isInRoom: true
              })
              resolve(true)
            }
          })
        } else {
          let id = roomList[i].id
          id = id < 10 ? '00' + id : '0' + id
          wx.showToast({
            title: '[' + id + '] 不可进入'
          })
          resolve(false)
        }
      }
    }
  })
}

const drawMyRoom = (p) => {
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
    textY = p.MR_playerInfoHostY + p.MR_playerInfoHeight / 2
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
  const playerName = info.id > -1 ? info.name + (isHost === isHost ? ' (你)' : '') : '--'
  ctx.fillText((isHost ? '房主' : '玩家') + ' : ' + playerName, p.MR_playerInfoTextX , textY)
}

const tapMyRoom = (event, t) => {
  return new Promise(function (resolve, reject) {
    // console.log(r)
    // const x = r.detail.x
    // const y = r.detail.y
    // console.log("鼠标指针坐标：" + x + "," + y);

    const p = t.data.canvasParam

    const isTapExitBtn = _isInPath({page: 'MyRoom', item: 'exit-btn'}, event, p)

    if (isTapExitBtn) {
      Api.exitRoom().then(function (re) {
        if (re.success) {
          clearInterval(t.data.myRoomInterval)
          drawRoomList(t.data.roomList, t.data.canvasParam)
          t.setData({
            isInRoom: false
          })
          resolve(true)
        }else{
          resolve(false)
        }
      })
    }
  })
}

const _isInPath = (obj, event, p) => {
  const x = event.detail.x
  const y = event.detail.y

  const page = obj.page
  const item = obj.item

  let x1 = 0 , x2 = 0, y1 = 0, y2 = 0

  if (page === 'MyRoom') {
    if (item === 'exit-btn') {
      x1 = p.MR_exitBtnX
      x2 = p.MR_exitBtnX + p.MR_exitBtnW
      y1 = p.MR_exitBtnY
      y2 = p.MR_exitBtnY + p.MR_exitBtnH
    } else if(item === 'do-ready'){

    } else if(item === 'start-game'){

    }
  }else if (page === 'RoomList') {
    if (item === 'list'){
      let ord = obj.ord
      x1 = p.leftPad
      x2 = p.leftPad  + p.innerWidth
      y1 = p.RL_innerTopPad + p.RL_innerLineHeight * ord - 16
      y2 = p.RL_innerTopPad + p.RL_innerLineHeight * ord - 16 + p.RL_innerLineHeight
    }
  }

  console.log("鼠标坐标：" + x + "," + y);
  console.log("区域坐标：" + x1 + "," + x2 + "," + y1 + "," + y2);
  console.log("结果：" + (x > x1 && x < x2 && y > y1 && y < y2) ? 'Y': 'N')
  return x > x1 && x < x2 && y > y1 && y < y2
}

module.exports = {
  init: init,
  drawRoomList : drawRoomList,
  tapRoomList : tapRoomList,
  drawMyRoom : drawMyRoom,
  tapMyRoom : tapMyRoom
}
