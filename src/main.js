
import {Player} from './modules/player.js';
import {printGrid, renderPlayerGrid, renderShip, disableBoard, enableBoard} from './modules/view.js';

const player = new Player();
const computer = new Player();

const playerShips = [
    [5, 1, 3, 'x'],
    [4, 1, 1, 'y'],
    [3, 4, 4, 'x'],
    [3, 6 , 2, 'y'],
    [2, 7, 6, 'x']
];

const computerShips = [
    [5, 1, 3, 'x'],
    [4, 1, 1, 'y'],
    [3, 4, 4, 'x'],
    [3, 6 , 2, 'y'],
    [2, 7, 6, 'x']
];


renderPlayerGrid('player');
renderPlayerGrid('computer');

playerShips.forEach(row => player.gameboard.placeShip(...row));
playerShips.forEach(row => renderShip(...row));

computerShips.forEach(row => computer.gameboard.placeShip(...row));
printGrid(computer.gameboard);












