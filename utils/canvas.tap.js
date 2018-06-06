const Api    = require('./api.js')

/*
 * roomlist :房间列表
 * r : 点击信息
 * t : 页面this对象
 * @param t          Information about the object.
 * @param t.data.roomList[].password   Information about the object's members.
 */
const roomList = (e, t) => {
  return new Promise(function (resolve, reject) {
    // console.log(r)
    /*const x = r.detail.x
    const y = r.detail.y*/
    // console.log("鼠标指针坐标：" + x + "," + y);

    const p = t.data.canvasParam
    const roomList = t.data.roomList

    for (let i = 0; i < roomList.length; i++) {
      if (_isInPath({page: 'RoomList', item: 'list', ord: i}, e, p)) {
        if (roomList[i].password === '') {
          Api.MyRoom.enter(roomList[i].id).then(function (re) {
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



const myRoom = (e, t) => {
  return new Promise(function (resolve, reject) {
    // console.log(r)
    // const x = r.detail.x
    // const y = r.detail.y
    // console.log("鼠标指针坐标：" + x + "," + y);

    const p = t.data.canvasParam

    const isTapExitBtn = _isInPath({page: 'MyRoom', item: 'exit-btn'}, e, p)

    const isTapDoReady = _isInPath({page: 'MyRoom', item: 'do-ready'}, e, p)

    const isTapStartGame = _isInPath({page: 'MyRoom', item: 'start-game'}, e, p)

    if (isTapExitBtn) {
      Api.MyRoom.exit().then(function (re) {
        if (re.success) {
          clearInterval(t.data.myRoomInterval)
          t.setData({
            isInRoom: false
          })
          resolve(true)
        }else {
          resolve(false)
        }
        /*  resolve({success:true,action:'exitBtn'})
        }else{
          resolve({success:false})
        }*/
      })
    } else if (isTapDoReady) {
      Api.MyRoom.doReady().then(function (re) {
        if (re.success) {
          resolve(true)
        }else{
          resolve(false)
        }
        /*  resolve({success:true,action:'doReady'})
        }else{
          resolve({success:false})
        }*/
      })
    } else if (isTapStartGame) {
      if (t.data.isReady && t.data.isHost && t.data.roomId > 0) {
        Api.MyGame.start().then(function (re) {
          if (re.success) {
            clearInterval(t.data.myRoomInterval)
            t.setData({
              isInGame: true
            })


            resolve(true)
          }else {
            resolve(false)
          }
          /*  resolve({success:true,action:'startGame'})
          }else{
            resolve({success:false})
          }*/
        })
      }
    }
  })
}


const myGame = (e, t) => {
  return new Promise(function (resolve, reject) {

    const p = t.data.canvasParam
    const isHost = t.data.isHost
    const roundPlayerIsHost = t.data.game.roundPlayerIsHost
    const isYourRound = isHost === roundPlayerIsHost

    const hostHands = t.data.card.hostHands
    const guestHands = t.data.card.guestHands

    if( t.data.isHost ){
      console.log('你是host')
    }else{
      console.log('你是guest')
    }

    let result = {}

    if (isYourRound) {
      console.log('当前是你的回合')
      for (let i = 0; i < hostHands.length; i++) {
        if ( _isInPath({page: 'MyGame', item: 'hands', ord: hostHands[i].ord}, e, p)) {
          console.log('点击了host的牌')

          result.item = 'hands'
          result.ord = i
          if(isHost){
            console.log('顺序 ：'+ (hostHands[i].ord +1 ) )
          }else{
            console.log('牌: 颜色：'+ hostHands[i].color + ' 数字'+ hostHands[i].num)
          }
        }
      }

      for (let i = 0; i < guestHands.length; i++) {
        if ( _isInPath({page: 'MyGame', item: 'hands', ord: guestHands[i].ord}, e, p)) {
          console.log('点击了guest的牌')

          result.item = 'hands'
          result.ord = i + 5
          if(isHost){
            console.log('牌: 颜色：'+ guestHands[i].color + ' 数字'+ guestHands[i].num)
          }else{
            console.log('顺序 ：'+ (guestHands[i].ord +1 ) )

          }
        }
      }
    } else {
      console.log('当前不是你的回合')
    }

    resolve(result)





    // if (isTapExitBtn) {
    //   Api.MyRoom.exit().then(function (re) {
    //     if (re.success) {
    //       clearInterval(t.data.myRoomInterval)
    //       t.setData({
    //         isInRoom: false
    //       })
    //       resolve(true)
    //     }else {
    //       resolve(false)
    //     }
    //   })
    // } else if (isTapDoReady) {
    //   Api.MyRoom.doReady().then(function (re) {
    //     if (re.success) {
    //       resolve(true)
    //     }else{
    //       resolve(false)
    //     }
    //   })
    // } else if (isTapStartGame) {
    //   if (t.data.isReady && t.data.isHost && t.data.roomId > 0) {
    //     Api.MyGame.start().then(function (re) {
    //       if (re.success) {
    //         clearInterval(t.data.myRoomInterval)
    //         t.setData({
    //           isInGame: true
    //         })
    //         resolve(true)
    //       }else {
    //         resolve(false)
    //       }
    //     })
    //   }
    // }


  })
}

const _isInPath = (obj, e, p) => {
  const x = e.detail.x
  const y = e.detail.y

  const page = obj.page
  const item = obj.item

  let x1 = 0 , x2 = 0, y1 = 0, y2 = 0

  if (page === 'MyRoom') {
    if (item === 'exit-btn') {
      x1 = p.MR_exitBtnX
      x2 = x1 + p.MR_exitBtnW
      y1 = p.MR_exitBtnY
      y2 = y1 + p.MR_exitBtnH
    } else if (item === 'do-ready') {
      x1 = p.MR_playerButtonX
      x2 = x1 + p.MR_playerButtonWidth
      y1 = p.MR_playerButtonGuestY
      y2 = y1 + p.MR_playerButtonHeight
    } else if (item === 'start-game') {
      x1 = p.MR_playerButtonX
      x2 = x1 + p.MR_playerButtonWidth
      y1 = p.MR_playerButtonHostY
      y2 = y1 + p.MR_playerButtonHeight
    }
  }else if (page === 'RoomList') {
    if (item === 'list') {
      let ord = obj.ord  //房间列表页 特殊参数： 序号
      x1 = p.leftPad
      x2 = p.leftPad  + p.innerWidth
      y1 = p.RL_innerTopPad + p.RL_innerLineHeight * ord - 16
      y2 = p.RL_innerTopPad + p.RL_innerLineHeight * ord - 16 + p.RL_innerLineHeight
    }
  }else if (page === 'MyGame') {
    if (item === 'hands') {
      let ord = obj.ord  //手牌顺序
      let rect = false
      if ([0,1,2,3,4].indexOf(ord) > -1) {
        rect = p.MG_playerHandsHostRectList[ord]
      }else if ([5,6,7,8,9].indexOf(ord) > -1) {
        rect = p.MG_playerHandsGuestRectList[ord-5]
      }

      if (rect !== false) {
        x1 = rect.x
        x2 = rect.x + rect.w
        y1 = rect.y
        y2 = rect.y + rect.h
      }
    }
  }

  // console.log("鼠标坐标：" + x + "," + y);
  // console.log("区域坐标：" + x1 + "," + x2 + "," + y1 + "," + y2);
  // console.log("结果：" + (x > x1 && x < x2 && y > y1 && y < y2) ? 'Y': 'N')
  return x > x1 && x < x2 && y > y1 && y < y2
}



module.exports = {
  roomList : roomList,
  myRoom : myRoom,
  myGame : myGame
}