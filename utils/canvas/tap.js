const roomList                = require('./tap/room_list')
const myRoom                  = require('./tap/my_room')
const myGame                  = require('./tap/my_game')
const gameOperationSelf       = require('./tap/game_operation_self')
const gameOperationOpposite   = require('./tap/game_operation_opposite')

module.exports = {
  roomList : roomList,
  myRoom : myRoom,
  myGame : myGame,
  gameOperationSelf : gameOperationSelf,
  gameOperationOpposite : gameOperationOpposite
}