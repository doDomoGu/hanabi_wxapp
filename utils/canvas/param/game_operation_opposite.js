module.exports =  (p) => {
  p.GOO_areaBgColor = '#4aa9a1'        //区域背景色
  p.GOO_areaTextColor = '#333'         //区域文字颜色

  p.GOO_cueNumBgColor = '#9015b8'       //提示数字背景
  p.GOO_cueNumTextColor = '#ffffff'     //提示数字文字

  p.GOO_cueColorBgColor = '#d9534f'   //提示颜色背景
  p.GOO_cueColorTextColor = '#ffffff' //提示颜色文字


  p.GOO_areaX = p.width / 3 / 2            //区域X偏移量
  p.GOO_areaY = 100                    //区域Y偏移量
  p.GOO_areaW = p.width / 3 * 2           //区域宽度
  p.GOO_areaH = p.GOO_areaW / 1.2       //区域高度


  p.GOO_cueNumX = p.GOO_areaX + 20
  p.GOO_cueNumY = p.GOO_areaY + p.GOO_areaH - 80
  p.GOO_cueNumW = 180
  p.GOO_cueNumH = 30

  p.GOO_cueColorX = p.GOO_cueNumX
  p.GOO_cueColorY = p.GOO_cueNumY + 40
  p.GOO_cueColorW = p.GOO_cueNumW
  p.GOO_cueColorH = p.GOO_cueNumH

  p.GOO_cueNumText = '提示数字是【?】的卡牌'
  p.GOO_cueColorText = '提示颜色是【?色】的卡牌'


  return p;
}