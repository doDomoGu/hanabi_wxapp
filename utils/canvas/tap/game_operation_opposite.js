const Api    = require('../../api')
const {_isInPath}   = require('./common_func')

module.exports = (e, t) => {
  return new Promise(function (resolve, reject) {
    let result = {}
    const p = t.data.canvasParam

    const isTapInArea = _isInPath({page: 'GameOperationOpposite', item: 'in-area'}, e, p)

    let cardSeletedOrd = t.data.isHost ? t.data.cardSelectOrd + 5 : t.data.cardSelectOrd

    if (isTapInArea) {
      if (_isInPath({page: 'GameOperationOpposite', item: 'cue-num'}, e, p)){
        Api.MyGame.doCue('num', cardSeletedOrd).then(function (re) {
          if (re.success) {
            resolve(true)
          }
        })
        result.item = 'cue-num'
        result.success = true
      } else if (_isInPath({page: 'GameOperationOpposite', item: 'cue-color'}, e, p)){
        Api.MyGame.doCue('color', cardSeletedOrd).then(function (re) {
          if (re.success) {
            resolve(true)
          }
        })
        result.item = 'cue-color'
        result.success = true
      }
    }else{
      result.item = 'outer-area'
      result.success = true
    }

    resolve(result)
  })
}
