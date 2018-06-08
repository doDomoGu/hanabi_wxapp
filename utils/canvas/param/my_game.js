module.exports = (p) => {

  const playerAreaXPad = 20 // 玩家区域内的左右留白
  const playerAreaYPad = 10 // 玩家区域内的上留白
  const playerInfoXPad = 20 // 玩家信息文字相对玩家信息的左右留白
  const playerInfoYPad = 6 // 玩家信息文字相对玩家信息的上留白

  const tableAreaXPad = 20 // 桌面区域内的左右留白
  const tableAreaYPad = 10 // 桌面区域内的上留白

  // 区块的宽高(尺寸)
  //p.MG_playerAreaX = p.leftPad // 玩家区域x偏移量(相对整个画布)
  p.MG_playerAreaW = p.width // 玩家区域的宽度
  p.MG_playerAreaH = 140 // 玩家区域的高度

  p.MG_playerInfoPad = 10;
  p.MG_playerInfoW = p.MG_playerAreaW - p.MG_playerInfoPad * 2 // 玩家信息的宽度
  p.MG_playerInfoH = 30 // 玩家信息的高度

  const cardW = 40
  const cardH = 70

  p.MG_playerHandsW = cardW // 手牌宽度
  p.MG_playerHandsH = cardH // 手牌高度

  p.MG_tableAreaW = p.width // 桌面区域的宽度
  p.MG_tableAreaH = 90 // 桌面区域的高度

  p.MG_tableLibraryW = cardW // 桌面牌库的宽度
  p.MG_tableLibraryH = cardH // 桌面牌库的高度

  p.MG_tableSuccessCardsW = 30 // 桌面成功的卡牌的宽度
  p.MG_tableSuccessCardsH = 30 / cardW * cardH // 桌面成功的卡牌的高度

  p.MG_tableDiscardW = cardW // 桌面弃牌堆的宽度
  p.MG_tableDiscardH = cardH // 桌面弃牌堆的高度

  p.MG_historyAreaW = p.width // 游戏历史区域的高度
  p.MG_historyAreaH = 80 // 游戏历史区域的高度

  /* 颜色 */
  p.MG_playerAreaBgColor = '#5fc0f3' // 玩家区域的背景色
  p.MG_playerInfoBgColor = '#ccf0f1' // 玩家信息的背景色
  p.MG_playerInfoTextColor = '#283085' // 玩家信息的文本色
  p.MG_playerHandsColors = [ // 手牌牌面背景色
    '#f2f2f2', // 白
    '#4f82c3', // 蓝
    '#c3c30d', // 黄
    '#c33b00', // 红
    '#3ac34b' // 绿
  ]
  p.MG_playerHandsBackColor = '#8f8f8b' // 手牌背景背景色
  p.MG_playerHandsStrokeColor = '#111111' // 手牌边框颜色

  p.MG_tableAreaBgColor = '#f3ca90' // 桌面区域的背景色
  p.MG_tableLibraryBgColor = p.MG_playerHandsBackColor // 桌面牌库的背景色
  p.MG_tableDiscardBgColor = p.MG_playerHandsBackColor // 桌面弃牌堆的背景色

  p.MG_historyAreaBgColor = '#b55170' // 游戏历史区域的背景色

  /* xy位置偏移量 */
  p.MG_playerAreaX = 0 // 玩家区域x偏移量
  p.MG_playerAreaHostY = 0 // (房主)玩家区域y偏移量
  p.MG_playerAreaGuestY = p.MG_playerAreaH + p.MG_tableAreaH + p.MG_historyAreaH // (访客)玩家区域y偏移量

  p.MG_playerInfoX = p.MG_playerAreaX + playerAreaXPad // 玩家信息x偏移量
  p.MG_playerInfoHostY = p.MG_playerAreaHostY + playerAreaYPad // (房主)玩家信息y偏移量
  p.MG_playerInfoGuestY = p.MG_playerAreaGuestY + playerAreaYPad // (访客)玩家信息y偏移量
  // 玩家信息的高度

  p.MG_playerInfoTextX = p.MG_playerInfoX + playerInfoXPad // 玩家信息内文字x偏移量
  p.MG_playerInfoTextHostY = p.MG_playerInfoHostY + playerInfoYPad // (房主)玩家信息内文字y偏移量
  p.MG_playerInfoTextGuestY = p.MG_playerInfoGuestY + playerInfoYPad // (访客)玩家信息内文字y偏移量

  p.MG_playerHandsFirstX = 20 // 玩家手牌第一张x偏移量(相对玩家区域)
  p.MG_playerHandsHostY = p.MG_playerInfoHostY + p.MG_playerInfoH + 20 // (房主)玩家手牌y偏移量
  p.MG_playerHandsGuestY = p.MG_playerInfoGuestY + p.MG_playerInfoH + 20 // (访客)玩家手牌y偏移量

  p.MG_playerHandsPad = 16 // 手牌之间的留白距离

  p.MG_playerHandsHostRectList = [] // (房主)玩家的全部手牌路径信息
  for (let n = 0; n < 5; n++) {
    p.MG_playerHandsHostRectList.push(
      {
        x: p.MG_playerHandsFirstX + (p.MG_playerHandsW + p.MG_playerHandsPad) * n,
        y: p.MG_playerHandsHostY,
        w: p.MG_playerHandsW,
        h: p.MG_playerHandsH
      }
    )
  }

  p.MG_playerHandsGuestRectList = [] // (访客)玩家的全部手牌路径信息
  for (let n = 0; n < 5; n++) {
    p.MG_playerHandsGuestRectList.push(
      {
        x: p.MG_playerHandsFirstX + (p.MG_playerHandsW + p.MG_playerHandsPad) * n,
        y: p.MG_playerHandsGuestY,
        w: p.MG_playerHandsW,
        h: p.MG_playerHandsH
      }
    )
  }

  p.MG_tableAreaX = 0 // 桌面区域x偏移量
  p.MG_tableAreaY = p.MG_playerAreaH // 桌面区域y偏移量

  p.MG_tableLibraryX = p.MG_tableAreaX + tableAreaXPad // 牌库区域x偏移量
  p.MG_tableLibraryY = p.MG_tableAreaY + tableAreaYPad // 牌库区域y偏移量

  p.MG_tableNumX = p.MG_tableLibraryX + p.MG_tableLibraryW + 10 // 牌库区域x偏移量
  p.MG_tableNumY = p.MG_tableAreaY + tableAreaYPad // 牌库区域y偏移量

  p.MG_tableSuccessCardsX = p.MG_tableNumX + 60 // 成功的卡牌区域x偏移量
  p.MG_tableSuccessCardsY = p.MG_tableAreaY + tableAreaYPad // 成功的卡牌区域y偏移量
  p.MG_tableSuccessCardsPad = 6 // 成功的卡牌区域之间的留白

  p.MG_tableDiscardX = p.MG_tableAreaX + p.MG_tableAreaW - p.MG_tableDiscardW - 10 // 弃牌堆x偏移量
  p.MG_tableDiscardY = p.MG_tableAreaY + tableAreaYPad // 弃牌堆y偏移量

  p.MG_historyAreaX = 0 // 游戏历史区域x偏移量
  p.MG_historyAreaY = p.MG_playerAreaH + p.MG_tableAreaH // 游戏历史区域y偏移量

  p.MG_infoFontSize = 16



  return p
}