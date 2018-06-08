const roomList   = require('./tap/room_list')
const myRoom   = require('./tap/my_room')
const myGame   = require('./tap/my_game')
//const gameOperationSelf   = require('./draw/game_opposite_self')

module.exports = {
  roomList : roomList,
  myRoom : myRoom,
  myGame : myGame,
  //gameOperation : gameOperation
}