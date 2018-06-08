const roomList   = require('./draw/room_list')
const myRoom   = require('./draw/my_room')
const myGame   = require('./draw/my_game')
const gameOperationSelf   = require('./draw/game_opposite_self')

module.exports = {
  roomList : roomList,
  myRoom : myRoom,
  myGame : myGame,
  gameOperationSelf : gameOperationSelf
}