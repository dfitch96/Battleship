
import { BOARD_SIZE } from './modules/gameboard.js';
import {Player, playerTypes} from './modules/player.js';
import { MoveMaker } from './modules/move-maker.js';
import { ShipTypes } from './modules/ship-types.js';
import { getRandomCoordinate, getRandomTimeout } from './modules/random.js';
import {printGrid, log, renderPlayerGrid, renderShip, clearPlayerGrid, disableBoard, enableBoard, addPlayerMoveEventListeners, renderSuccessfullAttack, renderMissedAttack, disableBoardGameOver, removePlayerMoveEventListeners, addButtonGroup, addButton, removeButtonGroup, displayLog} from './modules/view.js';


function gameDriver(){

    const moveMaker = new MoveMaker();
    const player = new Player(playerTypes.PLAYER);
    const computer = new Player(playerTypes.COMPUTER);
   
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
        addPlayerMoveEventListeners(handlePlayerMove);
        computer.gameboard.placeRandomShips();
        computer.gameboard.printSea();
        disableBoard(player.getPlayerType());
        log('Battle!');
        
    }



    const handlePlayerMove = function(event){
        const row = event.target.dataset.row;
        const col = event.target.dataset.col;

        if(computer.gameboard.recieveAttack(row, col)){
            log(`You hit a target at (${Number(col) + 1},${Number(row) + 1})`)
            renderSuccessfullAttack(computer.getPlayerType(), row, col);

            if(computer.gameboard.isShipSunk(row, col)){
                log('You sunk a ship')
            }

            if(computer.gameboard.areShipsSunk()){
                enableBoard(player.getPlayerType());
                gameOver(player, computer);
            }

        } else {
            log(`You missed at (${Number(col) + 1},${Number(row) + 1})`)
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
            log(`Computer hit a target at (${move.x + 1},${move.y + 1})`)
            moveMaker.targetHit(move.y, move.x);
            renderSuccessfullAttack(player.getPlayerType(), move.y, move.x);
            
            if(player.gameboard.isShipSunk(move.y, move.x)){
                console.log('')
                log('Computer sunk a ship');
                moveMaker.targetSunk();
            }

            if(player.gameboard.areShipsSunk()){
                enableBoard(computer.getPlayerType());
                gameOver(computer, player);
                return;
            }

            setTimeout(handleComputerMove, getRandomTimeout());

        } else{
            log(`Computer missed at (${move.x + 1},${move.y + 1})`)
            moveMaker.targetMiss();
            renderMissedAttack(player.getPlayerType(), move.y, move.x);
            enableBoard(computer.getPlayerType());
            disableBoard(player.getPlayerType());
        }

    }


    const gameOver = function(winner, loser){
        log(`${winner.getPlayerType()} Wins!`)
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
        displayLog();
        log('Game Loading....');
        setTimeout(initializeGame, 2000);
        
    }
    
    setupPlayerBoard();
}

gameDriver();



















