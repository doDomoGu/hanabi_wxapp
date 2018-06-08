module.exports =  (p) => {
  p.GO_areaBgColor = '#5fc0f3'        //区域背景色
  p.GO_areaTextColor = '#333'         //区域文字颜色
  p.GO_playBtnBgColor = '#5cb85c'       //打出按钮背景
  p.GO_playBtnTextColor = '#ffffff'     //打出按钮文字
  p.GO_discardBtnBgColor = '#d9534f'   //丢弃按钮背景
  p.GO_discardBtnTextColor = '#ffffff' //丢弃按钮文字


  p.GO_areaX = p.width / 4            //区域X偏移量
  p.GO_areaY = 200                    //区域Y偏移量
  p.GO_areaW = p.width / 2            //区域宽度
  p.GO_areaH = p.GO_areaW / 1.5       //区域高度


  p.GO_playBtnX = p.GO_areaX + 20
  p.GO_playBtnY = p.GO_areaY + p.GO_areaH - 40
  p.GO_playBtnW = 40
  p.GO_playBtnH = p.GO_playBtnW / 2
  p.GO_discardBtnX = p.GO_playBtnX + 100
  p.GO_discardBtnY = p.GO_playBtnY
  p.GO_discardBtnW = p.GO_playBtnW
  p.GO_discardBtnH = p.GO_playBtnH

  p.GO_playBtnText = '打出'
  p.GO_discardBtnText = '弃牌'


  return p;
}