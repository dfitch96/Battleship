
import { BOARD_SIZE } from './modules/gameboard.js';
import {Player, playerTypes} from './modules/player.js';
import { MoveMaker } from './modules/move-maker.js';
import { ShipTypes } from './modules/ship-types.js';
import { getRandomCoordinate, getRandomTimeout } from './modules/random.js';
import {printGrid, log, renderPlayerGrid, renderShip, clearPlayerGrid, disableBoard, enableBoard, addPlayerMoveEventListeners, renderSuccessfullAttack, renderMissedAttack, disableBoardGameOver, removePlayerMoveEventListeners, addButtonGroup, addButton, removeButtonGroup} from './modules/view.js';


// const MAX_TIMEOUT = 2000;
// const MIN_TIMEOUT = 1000;

function gameDriver(){

    const moveMaker = new MoveMaker();
    const player = new Player(playerTypes.PLAYER);
    const computer = new Player(playerTypes.COMPUTER);
    const computerShips = [
        [5, 1, 3, 'x'],
        [4, 1, 1, 'y'],
        [3, 4, 4, 'x'],
        [3, 6 , 2, 'y'],    
        [2, 7, 6, 'x']
    ];


    const setupPlayerBoard = function(){

        renderPlayerGrid(player.getPlayerType());
        player.gameboard.placeRandomShips();
        player.gameboard.getShips().forEach(boardObj => renderShip(boardObj.ship.length, boardObj.y, boardObj.x, boardObj.axis));
        addButtonGroup();
        addButton('Randomize', handleRandomizeOnClick);
        addButton('Start Game', handleStartGameOnClick);
    }
    
    const initializeGame = function(){

        renderPlayerGrid(computer.getPlayerType());
        computer.gameboard.placeRandomShips();
        computer.gameboard.printSea();
        disableBoard(player.getPlayerType());
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
            
            if(player.gameboard.areShipsSunk()){
                enableBoard(computer.getPlayerType());
                gameOver(computer, player);
            }

            setTimeout(handleComputerMove, getRandomTimeout());

        } else{
            console.log(`Computer missed attack at y: ${move.y} and x: ${move.x}`);
            renderMissedAttack(player.getPlayerType(), move.y, move.x);
            enableBoard(computer.getPlayerType());
            disableBoard(player.getPlayerType());
        }

    }


    const gameOver = function(winner, loser){
        console.log(`${winner.getPlayerType()} Wins!`);
        //log(`${winner.getPlayerType()} Wins!`);
        disableBoardGameOver(winner);
        disableBoardGameOver(loser);
    }

    const handleRandomizeOnClick = function(){
    
        clearPlayerGrid();
        player.gameboard.reset();
        player.gameboard.placeRandomShips();
        player.gameboard.getShips().forEach(boardObj => renderShip(boardObj.ship.length, boardObj.y, boardObj.x, boardObj.axis));

    }

    const handleStartGameOnClick = function(){

        removeButtonGroup();
        initializeGame();
        addPlayerMoveEventListeners(handlePlayerMove);
    }
    
    setupPlayerBoard();
}


gameDriver();

















