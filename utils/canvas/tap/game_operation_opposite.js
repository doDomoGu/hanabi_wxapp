const Api    = require('../../api')
const {_isInPath}   = require('./common_func')

module.exports = (e, t) => {
  return new Promise(function (resolve, reject) {
    let result = {}
    const p = t.data.canvasParam

    const isTapInArea = _isInPath({page: 'GameOperationOpposite', item: 'in-area'}, e, p)

    let cardSeletedOrd = t.data.isHost ? t.data.cardSelectOrd : t.data.cardSelectOrd + 5

    if (isTapInArea) {
      /*if (_isInPath({page: 'GameOperationOpposite', item: 'play-btn'}, e, p)){
        Api.MyGame.doPlay(cardSeletedOrd).then(function (re) {
          if (re.success) {
            resolve(true)
          }
        })
        result.item = 'play-btn'
        result.success = true
      } else if (_isInPath({page: 'GameOperationOpposite', item: 'discard-btn'}, e, p)){
        Api.MyGame.doDiscard(cardSeletedOrd).then(function (re) {
          if (re.success) {
            resolve(true)
          }
        })
        result.item = 'discard-btn'
        result.success = true
      }*/
    }else{
      result.item = 'outer-area'
      result.success = true
    }

    resolve(result)
  })
}
