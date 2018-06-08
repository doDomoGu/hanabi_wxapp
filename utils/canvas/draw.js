const roomList                = require('./draw/room_list')
const myRoom                  = require('./draw/my_room')
const myGame                  = require('./draw/my_game')
const gameOperationSelf       = require('./draw/game_operation_self')
const gameOperationOpposite   = require('./draw/game_operation_opposite')

module.exports = {
  roomList : roomList,
  myRoom : myRoom,
  myGame : myGame,
  gameOperationSelf : gameOperationSelf,
  gameOperationOpposite : gameOperationOpposite
}