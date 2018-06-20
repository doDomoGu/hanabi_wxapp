module.exports =  (p) => {
  p.GOS_areaBgColor = '#5fc0f3'        //区域背景色
  p.GOS_areaTextColor = '#333'         //区域文字颜色
  p.GOS_playBtnBgColor = '#5cb85c'       //打出按钮背景
  p.GOS_playBtnTextColor = '#ffffff'     //打出按钮文字
  p.GOS_discardBtnBgColor = '#d9534f'   //丢弃按钮背景
  p.GOS_discardBtnTextColor = '#ffffff' //丢弃按钮文字


  p.GOS_areaX = p.width / 4            //区域X偏移量
  p.GOS_areaY = 200                    //区域Y偏移量
  p.GOS_areaW = p.width / 2            //区域宽度
  p.GOS_areaH = p.GOS_areaW / 1.5       //区域高度


  p.GOS_playBtnX = p.GOS_areaX + 20
  p.GOS_playBtnY = p.GOS_areaY + p.GOS_areaH - 40
  p.GOS_playBtnW = 40
  p.GOS_playBtnH = p.GOS_playBtnW / 2
  p.GOS_discardBtnX = p.GOS_playBtnX + 100
  p.GOS_discardBtnY = p.GOS_playBtnY
  p.GOS_discardBtnW = p.GOS_playBtnW
  p.GOS_discardBtnH = p.GOS_playBtnH

  p.GOS_playBtnText = '打出'
  p.GOS_discardBtnText = '弃牌'


  return p;
}