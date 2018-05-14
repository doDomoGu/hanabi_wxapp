const Api    = require('./api.js')

let commonParam = (p) => {
  p.topPad = 10 // 上边距
  p.leftPad = p.rightPad =  10 // 左右边距
  p.innerWidth = p.width - p.leftPad - p.rightPad // 去除左右边距后的宽度
  return p
}

let roomListParam = (p) => {
  p.RL_bgColor = '#FFFFFF'  //区域背景色
  p.RL_bgColor2 = '#2510cc'  //区域背景色2
  p.RL_fontColor = '#2510cc' //文字颜色
  p.RL_fontColor2 = '#FFFFFF' //文字颜色2

  p.RL_fontSize = 20  //文字尺寸

  p.RL_innerHeight = 400 //区域高度
  p.RL_innerLeftPad = p.leftPad + 10 //区域左边距（相对整个画布）
  p.RL_innerTopPad = p.topPad + 30   //区域上边距 （相对整个画布）
  p.RL_innerLineHeight = 32 //列表行高
  p.RL_innerTitleLeftPad = p.RL_innerLeftPad + 50 //列表标题左边距（相对整个画布）
  p.RL_innerLockLeftPad = p.RL_innerLeftPad + 100 //上锁标志左边距（相对整个画布）

  return p
}

let myRoomParam =  (p) => {
  p.MR_playerAreaX = p.leftPad // 玩家区域x偏移量(相对整个画布)
  p.MR_playerAreaHostY = 10 // 房主玩家区域y偏移量(相对整个画布)
  p.MR_playerAreaGuestY = 160 // 访客玩家区域y偏移量(相对整个画布)
  p.MR_playerAreaHeight = 140 // 玩家区域的高度
  p.MR_playerAreaWidth = p.innerWidth // 玩家区域的宽度

  p.MR_playerButtonXOffset = 20 // 玩家区域内按钮x偏移量(相对玩家区域)
  p.MR_playerButtonYOffset = 80 // 玩家区域内按钮y偏移量(相对玩家区域)
  p.MR_playerButtonWidth = 100 // 玩家区域内按钮宽度
  p.MR_playerButtonHeight = 30 // 玩家区域内按钮高度

  p.MR_playerButtonTextXOffset = 20 // 玩家区域内按钮内文字x偏移量(相对按钮区域)
  p.MR_playerButtonTextYOffset = 20 // 玩家区域内按钮内文字y偏移量(相对按钮区域)

  return p
}


let myGameParam =  (p) => {


  return p
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
  ctxRL.setFontSize(20)
  //ctxRL.setTextBaseline('top')
  ctxRL.fillText('room list canvas', p.leftPad + 10, 10)
  ctxRL.draw()

  // ctxMR.setFillStyle("#333333");
  // ctxMR.setFontSize(20)
  ctxMR.fillText('my room canvas', p.leftPad + 10, 10)
  ctxMR.draw()

  // ctxMG.setFillStyle("#333333");
  // ctxMG.setFontSize(20)
  ctxMG.fillText('my game canvas', p.leftPad + 10, 10)
  ctxMG.draw()


}

const drawRoomList = (roomList, p) => {
  const ctx = wx.createCanvasContext('roomListCanvas')
  //清空内容
  ctx.clearRect(0,0,p.width,p.height)

  //区域背景填充
  ctx.setFillStyle(p.RL_bgColor);
  ctx.rect(p.leftPad,p.topPad,p.innerWidth,p.RL_innerHeight)
  ctx.fill()
  ctx.draw(true)
  //列表文字绘制
  ctx.setFontSize(p.RL_fontSize)
  ctx.setTextAlign('left')
  ctx.setTextBaseline('middle')
  for(let i = 0 ; i < roomList.length ; i++){
    if (i % 2 === 0) {
      ctx.setFillStyle(p.RL_bgColor);
    } else {
      ctx.setFillStyle(p.RL_bgColor2);
    }
    ctx.rect(p.leftPad,p.RL_innerTopPad + p.RL_innerLineHeight * i - 16,p.innerWidth,p.RL_innerLineHeight)
    ctx.fill()
    ctx.draw(true)

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
 */
const tapRoomList = (roomList, r, t) => {
  // console.log(r)
  const x = r.detail.x
  const y = r.detail.y
  // console.log("鼠标指针坐标：" + x + "," + y);

  const p = t.data.canvasParam

  for(let i = 0 ; i < roomList.length ; i++){
    if( x >= p.leftPad
      && x <= ( p.leftPad  + p.innerWidth )
      && y>= ( p.RL_innerTopPad + p.RL_innerLineHeight * i - 16)
      && y <= ( p.RL_innerTopPad + p.RL_innerLineHeight * i - 16 + p.RL_innerLineHeight ) ){
      let id = roomList[i].id
      id = id < 10 ? '00' + id : '0' + id
      if(roomList[i].password ===''){
        Api.enterRoom(roomList[i].id).then(function(re){
          if(re.success){
            t.setData({
              isInRoom : true
            })
          }
        })
      }else{
        wx.showToast({
          title: '[' + id + '] 不可进入'
        })
      }
    }
  }
}

const drawMyRoom = (p) => {
  const ctx = wx.createCanvasContext('myRoomCanvas')
  //区域背景填充
  ctx.setFillStyle(p.RL_bgColor);
  ctx.rect(p.leftPad,p.topPad,p.innerWidth,p.RL_innerHeight)
  ctx.fill()
  ctx.draw(true)
}

const tapMyRoom = (r, t) => {
  // console.log(r)
  const x = r.detail.x
  const y = r.detail.y
  console.log("鼠标指针坐标：" + x + "," + y);

  Api.exitRoom().then(function(re){
    if(re.success){
      drawRoomList(t.data.roomList,t.data.canvasParam)
      t.setData({
        isInRoom : false
      })
    }
  })
}

module.exports = {
  init: init,
  drawRoomList : drawRoomList,
  tapRoomList : tapRoomList,
  drawMyRoom : drawMyRoom,
  tapMyRoom : tapMyRoom
}
