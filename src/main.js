const Player = require('./modules/player');
const {printGrid} = require('./modules/view')

const player = new Player();
const computer = new Player();
printGrid(player.gameboard);