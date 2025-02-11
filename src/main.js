
import {Player} from './modules/player.js';
import {printGrid} from './modules/view.js';

const player = new Player();
const computer = new Player();
printGrid(player.gameboard);