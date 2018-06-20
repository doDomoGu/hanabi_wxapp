module.exports =  (p) => {
  p.GOO_areaBgColor = '#22a938'        //区域背景色
  p.GOO_areaTextColor = '#333'         //区域文字颜色
  p.GOO_playBtnBgColor = '#5cb85c'       //打出按钮背景
  p.GOO_playBtnTextColor = '#ffffff'     //打出按钮文字
  p.GOO_discardBtnBgColor = '#d9534f'   //丢弃按钮背景
  p.GOO_discardBtnTextColor = '#ffffff' //丢弃按钮文字


  p.GOO_areaX = p.width / 3 / 2            //区域X偏移量
  p.GOO_areaY = 200                    //区域Y偏移量
  p.GOO_areaW = p.width / 3 * 2           //区域宽度
  p.GOO_areaH = p.GOO_areaW / 2       //区域高度


  p.GOO_playBtnX = p.GOO_areaX + 20
  p.GOO_playBtnY = p.GOO_areaY + p.GOO_areaH - 40
  p.GOO_playBtnW = 40
  p.GOO_playBtnH = p.GOO_playBtnW / 2
  p.GOO_discardBtnX = p.GOO_playBtnX + 100
  p.GOO_discardBtnY = p.GOO_playBtnY
  p.GOO_discardBtnW = p.GOO_playBtnW
  p.GOO_discardBtnH = p.GOO_playBtnH

  p.GOO_playBtnText = '打出'
  p.GOO_discardBtnText = '弃牌'


  return p;
}