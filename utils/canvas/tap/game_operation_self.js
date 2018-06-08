const Api    = require('../../api')
const {_isInPath}   = require('./common_func')

module.exports = (e, t) => {
  return new Promise(function (resolve, reject) {
    let result = {}
    const p = t.data.canvasParam

    const isTapInArea = _isInPath({page: 'GameOperationSelf', item: 'in-area'}, e, p)
    if (isTapInArea) {
      if (_isInPath({page: 'GameOperationSelf', item: 'play-btn'}, e, p)){
        console.log('play')
        Api.MyGame.doPlay(t.data.cardSelectOrd).then(function (re) {
          if (re.success) {
            resolve(true)
          }
        })
        result.item = 'play-btn'
        result.success = true
      } else if (_isInPath({page: 'GameOperationSelf', item: 'discard-btn'}, e, p)){
        Api.MyGame.doDiscard(t.data.cardSelectOrd).then(function (re) {
          if (re.success) {
            resolve(true)
          }
        })
        result.item = 'discard-btn'
        result.success = true
      }
    }else{
      result.item = 'outer-area'
      result.success = true
    }

    resolve(result)
  })
}
