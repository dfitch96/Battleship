
import { BOARD_SIZE } from './modules/gameboard.js';
import {Player, playerTypes} from './modules/player.js';
import { MoveMaker } from './modules/move-maker.js';
import { ShipTypes } from './modules/ship-types.js';
import {printGrid, renderPlayerGrid, renderShip, disableBoard, enableBoard, addPlayerMoveEventListeners, renderSuccessfullAttack, renderMissedAttack, disableBoardGameOver, removePlayerMoveEventListeners} from './modules/view.js';

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




function mainDriver(){

    let player = new Player(playerTypes.PLAYER);
    let computer = new Player(playerTypes.COMPUTER);


    const initializeScreen = function(){
        renderPlayerGrid(player.getPlayerType());
        renderPlayerGrid(computer.getPlayerType());
    }


}



function gameDriver(player, computer, playerShips, computerShips){

    const moveMaker = new MoveMaker();
    
    const initializeGame = function(){

        // render each players board
        renderPlayerGrid(player.getPlayerType());
        renderPlayerGrid(computer.getPlayerType());

        // place random ships for the player
        placeRandomShips(player.gameboard);
        player.gameboard.getShips().forEach(boardObj => renderShip(boardObj.ship.length, boardObj.y, boardObj.x, boardObj.axis));

        // place computer ships
        computerShips.forEach(row => computer.gameboard.placeShip(...row));

        // disable players board to allow them to make the first move
        disableBoard(player.getPlayerType());
    }


    const placeRandomShips = function(playerBoard){

        for(const shipKey in ShipTypes){
            console.log(`${shipKey} ALLOCATED: ${ShipTypes[shipKey][0]} LENGTH: ${ShipTypes[shipKey][1]}`);

            const numAllocated = ShipTypes[shipKey][0];
            const shipLength = ShipTypes[shipKey][1];
            // for the number of ships which are allocated of this type,
            for(let i = 0; i < numAllocated; i++){
                let y = getRandomCoordinate();
                let x = getRandomCoordinate();
                let axis = Math.round(Math.random()) === 0 ? 'x' : 'y';

                while(!playerBoard.placeShip(shipLength, y, x, axis)){
                    y = getRandomCoordinate();
                    x = getRandomCoordinate();
                    axis = Math.round(Math.random()) === 0 ? 'x' : 'y';
                }

            }
        }
    }


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
        removePlayerMoveEventListeners(event.target, handlePlayerMove);
    }


    const handleComputerMove = function(){
        
        const move = moveMaker.getMove();
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


    const gameOver = function(winner, loser){
        console.log(`${winner.getPlayerType()} Wins!`);
        // disable the winners board and display their hits and misses
        disableBoardGameOver(winner);
        // disable the losers board and display their hits and misses
        disableBoardGameOver(loser);
    }

    const getRandomTimeout = function(){
        return Math.floor(Math.random() * (MAX_TIMEOUT - MIN_TIMEOUT) + MIN_TIMEOUT);
    }


     const getRandomCoordinate = function(){
        return Math.floor(Math.random() * BOARD_SIZE);
    }
    


    initializeGame();
    addPlayerMoveEventListeners(handlePlayerMove);

}


gameDriver(player, computer, playerShips, computerShips);

















