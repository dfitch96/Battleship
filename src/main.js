
import { BOARD_SIZE } from './modules/gameboard.js';
import {Player} from './modules/player.js';
import {printGrid, renderPlayerGrid, renderShip, disableBoard, enableBoard, addPlayerMoveEvents, renderSuccessfullAttack, renderMissedAttack, removeCellEventListeners} from './modules/view.js';

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



function gameDriver(player, computer, playerShips, computerShips){

    playerShips.forEach(row => player.gameboard.placeShip(...row));
    playerShips.forEach(row => renderShip(...row));
    computerShips.forEach(row => computer.gameboard.placeShip(...row));
    disableBoard('player');
    
    const handlePlayerMove = function(event){
        if(computer.gameboard.recieveAttack(event.target.dataset.row, event.target.dataset.col)){
            renderSuccessfullAttack('computer', event.target.dataset.row, event.target.dataset.col);
        } else {
            renderMissedAttack('computer', event.target.dataset.row, event.target.dataset.col);
            enableBoard('player');
            disableBoard('computer');
            setTimeout(handleComputerMove, 2000);
        }
        removeCellEventListeners(event.target, handlePlayerMove);
    }


    const handleComputerMove = function(){
        const y = Math.floor(Math.random() * BOARD_SIZE);
        const x = Math.floor(Math.random() * BOARD_SIZE);
        console.log(`Computer attacking at y: ${y} and x: ${x}`);

        if(player.gameboard.recieveAttack(y, x)){
            renderSuccessfullAttack('player', y, x);
            setTimeout(handleComputerMove, 1000);
        } else{
            renderMissedAttack('player', y, x);
            enableBoard('computer');
            disableBoard('player');
        }

    }

    addPlayerMoveEvents(handlePlayerMove);

}


gameDriver(player, computer, playerShips, computerShips);












