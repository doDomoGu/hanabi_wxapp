/*
 * 函数：检测tap区域（按钮）
 * 参数：x y w h
 */
const _isInPath = (obj, e, p) => {
  const _x = e.detail.x
  const _y = e.detail.y

  const page = obj.page
  const item = obj.item

  let x = 0, y = 0, w = 0, h = 0

  switch (page) {
    // 房间列表
    case 'RoomList':
      //房间列表item 只有list一种
      let ord = obj.ord  // 房间列表页 参数：列表地序号
      x = p.leftPad
      y = p.RL_innerTopPad + p.RL_innerLineHeight * ord - 16
      w = p.innerWidth
      h = p.RL_innerLineHeight
      break;
    // 房间页面
    case 'MyRoom':
      switch (item) {
        // 退出按钮
        case 'exit-btn':
          x = p.MR_exitBtnX
          y = p.MR_exitBtnY
          w = p.MR_exitBtnW
          h = p.MR_exitBtnH
          break;
        // 准备按钮
        case 'do-ready':
          x = p.MR_playerButtonX
          y = p.MR_playerButtonGuestY
          w = p.MR_playerButtonWidth
          h = p.MR_playerButtonHeight
          break;
        // 开始按钮
        case 'start-game':
          x = p.MR_playerButtonX
          y = p.MR_playerButtonHostY
          w = p.MR_playerButtonWidth
          h = p.MR_playerButtonHeight
          break;
      }
      break;
    // 游戏页面
    case 'MyGame':
      switch (item) {
        case 'hands' :
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
          break;
      }
      break;
    // 点击自己手牌后出现的界面
    case 'GameOperationSelf':
      switch (item) {
        // 在界面区域内 (点击区域外，隐藏(取消)界面)
        case 'in-area':
          x = p.GOS_areaX
          y = p.GOS_areaY
          w = p.GOS_areaW
          h = p.GOS_areaH
          break;
        // "打出"按钮
        case 'play-btn':
          x = p.GOS_playBtnX
          y = p.GOS_playBtnY
          w = p.GOS_playBtnW
          h = p.GOS_playBtnH
          break;
        // "弃牌"按钮
        case 'discard-btn':
          x = p.GOS_discardBtnX
          y = p.GOS_discardBtnY
          w = p.GOS_discardBtnW
          h = p.GOS_discardBtnH
          break
      }
      break;
    // 点击对面手牌后出现的界面
    case 'GameOperationOpposite':
      switch (item) {
        // 在界面区域内 (点击区域外，隐藏(取消)界面)
        case 'in-area':
          x = p.GOO_areaX
          y = p.GOO_areaY
          w = p.GOO_areaW
          h = p.GOO_areaH
          break;
        // 提示数字
        case 'cue-num':
          x = p.GOO_cueNumX
          y = p.GOO_cueNumY
          w = p.GOO_cueNumW
          h = p.GOO_cueNumH
          break;
        // 提示颜色
        case 'cue-color':
          x = p.GOO_cueColorX
          y = p.GOO_cueColorY
          w = p.GOO_cueColorW
          h = p.GOO_cueColorH
          break;
      }
      break;
  }

  // console.log("鼠标坐标：" + x + "," + y);
  // console.log("区域坐标：" + x1 + "," + x2 + "," + y1 + "," + y2);
  // console.log("结果：" + (x > x1 && x < x2 && y > y1 && y < y2) ? 'Y': 'N')
  return _x > x && _x < x + w && _y > y && _y < y + h
}

module.exports = {
  _isInPath : _isInPath
}