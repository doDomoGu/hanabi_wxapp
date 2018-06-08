module.exports = (p) => {
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
  p.MR_playerInfoX = p.MR_playerAreaX + p.MR_playerInfoPad  // 玩家区域内信息x偏移量(相对整个画布)
  p.MR_playerInfoHostY = p.MR_playerAreaHostY + p.MR_playerInfoPad  // 房主Y
  p.MR_playerInfoGuestY = p.MR_playerAreaGuestY + p.MR_playerInfoPad // 玩家Y
  p.MR_playerInfoWidth = p.MR_playerAreaWidth - p.MR_playerInfoPad * 2 // Width
  p.MR_playerInfoHeight = 40  //Height


  p.MR_playerInfoTextX = p.MR_playerInfoX + 20
  //p.MR_playerInfoTextHostY = p.MR_playerInfoHostY + p.MR_playerInfoPad
  //p.MR_playerInfoTextGuestY = p.MR_playerInfoGuestY + p.MR_playerInfoPad
  p.MR_playerInfoTextFontSize = p.MR_playerInfoHeight / 2



  p.MR_playerButtonPad = 10;
  p.MR_playerButtonX = p.MR_playerAreaX + p.MR_playerButtonPad // 玩家区域内按钮x偏移量
  p.MR_playerButtonHostY = p.MR_playerInfoHostY + p.MR_playerInfoHeight + p.MR_playerButtonPad // 房主Y
  p.MR_playerButtonGuestY = p.MR_playerInfoGuestY + p.MR_playerInfoHeight + p.MR_playerButtonPad // 玩家Y
  p.MR_playerButtonWidth = 100 // width
  p.MR_playerButtonHeight = 30 // height

  p.MR_playerButtonTextX = p.MR_playerButtonX + 20
  p.MR_playerButtonTextFontSize = p.MR_playerButtonHeight / 2
  // p.MR_playerButtonTextXOffset = 20 // 玩家区域内按钮内文字x偏移量(相对按钮区域)
  // p.MR_playerButtonTextYOffset = 20 // 玩家区域内按钮内文字y偏移量(相对按钮区域)


  p.MR_exitBtnX = p.leftPad // 退出按钮x偏移量(相对整个画布)
  p.MR_exitBtnY = p.MR_playerAreaGuestY + p.MR_playerAreaHeight + 20 // 退出按钮y偏移量(相对整个画布)
  p.MR_exitBtnW = p.innerWidth // 退出按钮宽度
  p.MR_exitBtnH = p.MR_exitBtnW / 8 // 退出按钮高度
  p.MR_exitTextFontSize = p.MR_exitBtnH / 2

  return p
}