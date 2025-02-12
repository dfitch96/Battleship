
import { BOARD_SIZE } from './modules/gameboard.js';
import {Player, playerTypes} from './modules/player.js';
import {printGrid, renderPlayerGrid, renderShip, disableBoard, enableBoard, addPlayerMoveEvents, renderSuccessfullAttack, renderMissedAttack, removeCellEventListeners, disableBoardGameOver} from './modules/view.js';

const player = new Player(playerTypes.PLAYER);
const computer = new Player(playerTypes.COMPUTER);
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


renderPlayerGrid(player.getPlayerType());
renderPlayerGrid(computer.getPlayerType());



function gameDriver(player, computer, playerShips, computerShips){

    playerShips.forEach(row => player.gameboard.placeShip(...row));
    playerShips.forEach(row => renderShip(...row));
    computerShips.forEach(row => computer.gameboard.placeShip(...row));
    disableBoard(player.getPlayerType());
    

    const handlePlayerMove = function(event){
        const row = event.target.dataset.row;
        const col = event.target.dataset.col;

        if(computer.gameboard.recieveAttack(row, col)){
            renderSuccessfullAttack(computer.getPlayerType(), row, col);
            if(computer.gameboard.areShipsSunk()){
                enableBoard(player.getPlayerType());
                gameOver(player, computer);
            }
        } else {
            renderMissedAttack(computer.getPlayerType(), row, col);
            enableBoard(player.getPlayerType());
            disableBoard(computer.getPlayerType());
            setTimeout(handleComputerMove, getRandomTimeout());
        }
        removeCellEventListeners(event.target, handlePlayerMove);
    }


    const handleComputerMove = function(){
        
        const move = getMove();
        if(player.gameboard.recieveAttack(move.y, move.x)){
            console.log(`Computer successfully attacked at y: ${move.y} and x: ${move.x}`);
            renderSuccessfullAttack(player.getPlayerType(), move.y, move.x);
            setTimeout(handleComputerMove, getRandomTimeout());
            if(player.gameboard.areShipsSunk()){
                enableBoard(computer.getPlayerType());
                gameOver(computer, player);
            }

        } else{
            console.log(`Computer missed attack at y: ${move.y} and x: ${move.x}`);
            renderMissedAttack(player.getPlayerType(), move.y, move.x);
            enableBoard(computer.getPlayerType());
            disableBoard(player.getPlayerType());
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


    const gameOver = function(winner, loser){
        console.log(`${winner.getPlayerType()} Wins!`);
        // disable the winners board and display their hits and misses
        disableBoardGameOver(winner);
        // disable the losers board and display their hits and misses
        disableBoardGameOver(loser);
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












