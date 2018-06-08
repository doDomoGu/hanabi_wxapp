// 函数：绘制圆角矩形
const _isInPath = (obj, e, p) => {
  const _x = e.detail.x
  const _y = e.detail.y

  const page = obj.page
  const item = obj.item

  let x = 0, y =0, w = 0, h = 0

  if (page === 'MyRoom') {
    if (item === 'exit-btn') {
      x = p.MR_exitBtnX
      y = p.MR_exitBtnY
      w = p.MR_exitBtnW
      h = p.MR_exitBtnH
    } else if (item === 'do-ready') {
      x = p.MR_playerButtonX
      y = p.MR_playerButtonGuestY
      w = p.MR_playerButtonWidth
      h = p.MR_playerButtonHeight
    } else if (item === 'start-game') {
      x = p.MR_playerButtonX
      y = p.MR_playerButtonHostY
      w = p.MR_playerButtonWidth
      h = p.MR_playerButtonHeight
    }
  } else if (page === 'RoomList') {
    if (item === 'list') {
      let ord = obj.ord  //房间列表页 特殊参数： 序号
      x = p.leftPad
      y = p.RL_innerTopPad + p.RL_innerLineHeight * ord - 16
      w = p.innerWidth
      h = p.RL_innerLineHeight
    }
  } else if (page === 'MyGame') {
    if (item === 'hands') {
      let ord = obj.ord  //手牌顺序
      let rect = false
      if ([0,1,2,3,4].indexOf(ord) > -1) {
        rect = p.MG_playerHandsHostRectList[ord]
      }else if ([5,6,7,8,9].indexOf(ord) > -1) {
        rect = p.MG_playerHandsGuestRectList[ord-5]
      }

      if (rect !== false) {
        x = rect.x
        y = rect.y
        w = rect.w
        h = rect.h
      }
    }
  } else if (page === 'GameOperationSelf') {
    if (item === 'in-area') {
      x = p.GO_areaX
      y = p.GO_areaY
      w = p.GO_areaW
      h = p.GO_areaH
    } else if (item === 'play-btn') {
      x = p.GO_playBtnX
      y = p.GO_playBtnY
      w = p.GO_playBtnW
      h = p.GO_playBtnH
    } else if (item === 'discard-btn') {
      x = p.GO_discardBtnX
      y = p.GO_discardBtnY
      w = p.GO_discardBtnW
      h = p.GO_discardBtnH
    }
  }

  // console.log("鼠标坐标：" + x + "," + y);
  // console.log("区域坐标：" + x1 + "," + x2 + "," + y1 + "," + y2);
  // console.log("结果：" + (x > x1 && x < x2 && y > y1 && y < y2) ? 'Y': 'N')
  return _x > x && _x < x + w && _y > y && _y < y + h
}

module.exports = {
  _isInPath : _isInPath
}