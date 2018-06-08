module.exports = (p) => {
  p.RL_bgColor = '#a2fff8'  //区域背景色
  p.RL_bgColor1 = '#FFFFFF'  //区域背景色1
  p.RL_bgColor2 = '#2510cc'  //区域背景色2
  p.RL_fontColor1 = '#2510cc' //文字颜色2
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