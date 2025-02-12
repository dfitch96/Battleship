
import { BOARD_SIZE } from './modules/gameboard.js';
import {Player} from './modules/player.js';
import {printGrid, renderPlayerGrid, renderShip, disableBoard, enableBoard, addPlayerMoveEvents, renderSuccessfullAttack, renderMissedAttack, removeCellEventListeners, disableBoardGameOver} from './modules/view.js';

const player = new Player();
const computer = new Player();
const MAX_TIMEOUT = 3000;
const MIN_TIMEOUT = 1500;

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
            if(computer.gameboard.areShipsSunk()){
                enableBoard('player');
                gameOver('player', 'computer', player, computer);
            }
        } else {
            renderMissedAttack('computer', event.target.dataset.row, event.target.dataset.col);
            enableBoard('player');
            disableBoard('computer');
            setTimeout(handleComputerMove, getRandomTimeout());
        }
        removeCellEventListeners(event.target, handlePlayerMove);
    }


    const handleComputerMove = function(){
        
        const move = getMove();
        if(player.gameboard.recieveAttack(move.y, move.x)){
            console.log(`Computer successfully attacked at y: ${move.y} and x: ${move.x}`);
            renderSuccessfullAttack('player', move.y, move.x);
            setTimeout(handleComputerMove, getRandomTimeout());
            if(player.gameboard.areShipsSunk()){
                enableBoard('computer');
                gameOver('computer', 'player', computer, player);
            }

        } else{
            console.log(`Computer missed attack at y: ${move.y} and x: ${move.x}`);
            renderMissedAttack('player', move.y, move.x);
            enableBoard('computer');
            disableBoard('player');
        }

    }

    const getMove = function(){
        let y = getRandomCoordinate();
        let x = getRandomCoordinate();
        
        while (player.gameboard.isAlreadyAttacked(y, x)){
            console.log(`${y}, ${x} already registered as an attack`);
            y = getRandomCoordinate();
            x = getRandomCoordinate();
        }

        return {y, x};
    }


    const gameOver = function(winner, loser, winnerPlayerObj, opponentPlayerObj){
        console.log(`${winner} Wins!`);
        disableBoardGameOver(winner, opponentPlayerObj);
        disableBoardGameOver(loser, winnerPlayerObj);
    }

    const getRandomCoordinate = function(){
        return Math.floor(Math.random() * BOARD_SIZE);
    }

    const getRandomTimeout = function(){
        return Math.floor(Math.random() * (MAX_TIMEOUT - MIN_TIMEOUT) + MIN_TIMEOUT);
    }

    addPlayerMoveEvents(handlePlayerMove);

}


gameDriver(player, computer, playerShips, computerShips);












