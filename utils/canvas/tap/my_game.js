//const Api    = require('../../api.js')
const {_isInPath}   = require('./common_func')

module.exports = (e, t) => {
  return new Promise(function (resolve, reject) {

    const p = t.data.canvasParam
    const isHost = t.data.isHost
    const roundPlayerIsHost = t.data.game.roundPlayerIsHost
    const isYourRound = isHost === roundPlayerIsHost

    const hostHands = t.data.card.hostHands
    const guestHands = t.data.card.guestHands

    if( t.data.isHost ){
      console.log('你是host')
    }else{
      console.log('你是guest')
    }

    let result = {}

    if (isYourRound) {
      console.log('当前是你的回合')
      for (let i = 0; i < hostHands.length; i++) {
        if ( _isInPath({page: 'MyGame', item: 'hands', ord: hostHands[i].ord}, e, p)) {
          console.log('点击了host的牌')

          result.item = 'hands'
          result.isHost = true
          result.ord = i
          if(isHost){
            console.log('顺序 ：'+ (hostHands[i].ord +1 ) )
          }else{
            console.log('牌: 颜色：'+ hostHands[i].color + ' 数字'+ hostHands[i].num)
          }
        }
      }

      for (let i = 0; i < guestHands.length; i++) {
        if ( _isInPath({page: 'MyGame', item: 'hands', ord: guestHands[i].ord}, e, p)) {
          console.log('点击了guest的牌')

          result.item = 'hands'
          result.isHost = false
          result.ord = i
          if(isHost){
            console.log('牌: 颜色：'+ guestHands[i].color + ' 数字'+ guestHands[i].num)
          }else{
            console.log('顺序 ：'+ (guestHands[i].ord +1 ) )

          }
        }
      }
    } else {
      console.log('当前不是你的回合')
    }

    resolve(result)
  })
}