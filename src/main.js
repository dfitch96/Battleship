
import {Player} from './modules/player.js';
import {printGrid, renderPlayerGrid, renderShip, disableBoard, enableBoard} from './modules/view.js';

const player = new Player();
const computer = new Player();



renderPlayerGrid('player');
renderPlayerGrid('computer');

player.gameboard.placeShip(4, 1, 1);
renderShip(4, 1, 1);
player.gameboard.placeShip(5, 3, 2, 'y');
renderShip(5, 3, 2, 'y');









