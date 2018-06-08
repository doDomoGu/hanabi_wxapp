const {_isInPath}   = require('./common_func')

module.exports = (e, t) => {
  return new Promise(function (resolve, reject) {
    let result = {}
    const p = t.data.canvasParam

    const isTapInArea = _isInPath({page: 'GameOperation', item: 'in-area'}, e, p)

    if (isTapInArea) {



    }else{
      result.item = 'outer-area'
      result.success = true
    }

    resolve(result)
  })
}
