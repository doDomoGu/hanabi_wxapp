const Api    = require('./api.js')

/*
 * roomlist :房间列表
 * r : 点击信息
 * t : 页面this对象
 * @param t          Information about the object.
 * @param t.data.roomList[].password   Information about the object's members.
 */
const roomList = (r, t) => {
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



const myRoom = (event, t) => {
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
  roomList : roomList,
  myRoom : myRoom
}