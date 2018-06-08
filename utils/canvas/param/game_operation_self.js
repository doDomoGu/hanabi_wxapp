module.exports =  (p) => {
  p.GO_areaBgColor = '#5fc0f3'        //区域背景色
  p.GO_areaTextColor = '#333'         //区域文字颜色
  p.GO_okBtnBgColor = '#5cb85c'       //确定按钮背景
  p.GO_okBtnTextColor = '#ffffff'     //确定按钮文字
  p.GO_cancelBtnBgColor = '#d9534f'   //取消按钮背景
  p.GO_cancelBtnTextColor = '#ffffff' //取消按钮文字


  p.GO_areaX = p.width / 4            //区域X偏移量
  p.GO_areaY = 200                    //区域Y偏移量
  p.GO_areaW = p.width / 2            //区域宽度
  p.GO_areaH = p.GO_areaW / 1.5       //区域高度


  p.GO_okBtnX = p.GO_areaX + 20
  p.GO_okBtnY = p.GO_areaY + p.GO_areaH - 40
  p.GO_okBtnW = 40
  p.GO_okBtnH = p.GO_okBtnW / 2
  p.GO_cancelBtnX = p.GO_okBtnX + 100
  p.GO_cancelBtnY = p.GO_okBtnY
  p.GO_cancelBtnW = p.GO_okBtnW
  p.GO_cancelBtnH = p.GO_okBtnH


  return p;
}