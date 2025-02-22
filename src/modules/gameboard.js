import {Ship}from './ship.js';
import { ShipTypes } from './ship-types.js';
import { getRandomCoordinate } from './random.js';

export const BOARD_SIZE = 10;

export class Gameboard{

    constructor(){
        this.boardSize = BOARD_SIZE;
        this.ships = [];
        this.board = this.initBoard();
        this.misses = [];
    }


    reset(){
        this.ships = [];
        this.board = this.initBoard();
        this.misses = [];
    }

    getCell(y, x){
        if (y >= 0 && y < this.boardSize && x >= 0 && x < this.boardSize){
            return this.board[y][x];
        }
        
        return null;
    }


    getShips(){
        return this.ships;
    }

    getGameboard(){
        return this.board;
    }

    getMisses(){
        return this.misses;
    }

    getGameboardSize(){
        return this.boardSize;
    }

    initBoard(){

        const board = [];
        for(let i = 0; i < this.boardSize; i++){
            board.push([]);
            for(let j = 0; j < this.boardSize; j++){
                board[i][j] = null;
            }
        }
      
        return board;
    }

    isAlreadyAttacked(y, x){

        // if the board is a ship, return if its been hit
        if(this.board[y][x] !== null){
            return this.board[y][x].isHit;

            
        } else if(this.misses){ // if there are misses, return whether this coordinate has been hit
            
            return this.misses.some(coordinate => coordinate.y === y && coordinate.x === x);
        }

        return false;
        
    }

    getTotalSuccessfulHits(){

        let total = 0;
        for(let row = 0; row < BOARD_SIZE; row++){
            for(let col = 0; col < BOARD_SIZE; col++){
                if (this.board[row][col] !== null && this.board[row][col].isHit){
                    total++;
                }
            }
        }

        return total;

    }


    placeShip(shipLength, y, x, axis = 'x'){

        // verify ship placement is in bounds and space is not already occupied by a ship
        if(y < 0 || y >= this.boardSize || x < 0 || x >= this.boardSize || shipLength <= 0){
            return false;
        } else if(axis === 'x' && !this.#verifyXAxis(y, x, shipLength)){
            return false;
        } else if(axis === 'y' && !this.#verifyYAxis(y, x, shipLength)){
            return false;
        }

        const newShip = new Ship(shipLength);
        this.ships.push({
            ship: newShip,
            y,
            x,
            axis
        });
        if(axis === 'x'){
            for(let col = x; col < x + shipLength; col++){
                this.board[y][col] = {
                    ship: newShip,
                    isHit: false
                };
            }

        } else if(axis === 'y'){
            for(let row = y; row < (y + shipLength); row++){
                this.board[row][x] = {
                    ship: newShip,
                    isHit: false
                };
            }
        }

        return true;

    }

    #verifyXAxis(y, x, shipLength){
        if (x + shipLength > this.boardSize){
            return false;
        }

        let row = Math.max(y - 1, 0);
        const rows = Math.min(y + 2, BOARD_SIZE);
        const colStart = Math.max(x - 1, 0);
        const colEnd = Math.min(x + shipLength + 1, BOARD_SIZE);

        for(; row < rows; row++){
            for(let col = colStart; col < colEnd; col++){
                if (this.board[row][col] !== null){
                    return false;
                }
            }

        }
        
        return true;
    }

    #verifyYAxis(y, x, shipLength){
        if (y + shipLength > this.boardSize){
            return false;
        }

        // verify no ship has already been placed in this area of the grid
        const colStart = Math.max(x - 1, 0);
        const colEnd = Math.min(x + 2, BOARD_SIZE);
        const rowStart = Math.max(y - 1, 0);
        const rowEnd = Math.min(y + shipLength + 1, BOARD_SIZE);

        for(let row = rowStart; row < rowEnd; row++){
            for(let col = colStart; col < colEnd; col++){
                if(this.board[row][col] !== null){
                    return false;
                }
            }
        }

        return true;


    }


    placeRandomShips(){
    
        for(const shipKey in ShipTypes){
            console.log(`${shipKey} ALLOCATED: ${ShipTypes[shipKey][0]} LENGTH: ${ShipTypes[shipKey][1]}`);

            const numAllocated = ShipTypes[shipKey][0];
            const shipLength = ShipTypes[shipKey][1];
            // for the number of ships which are allocated of this type,
            for(let i = 0; i < numAllocated; i++){
                let y = getRandomCoordinate();
                let x = getRandomCoordinate();
                let axis = Math.round(Math.random()) === 0 ? 'x' : 'y';

                while(!this.placeShip(shipLength, y, x, axis)){
                    y = getRandomCoordinate();
                    x = getRandomCoordinate();
                    axis = Math.round(Math.random()) === 0 ? 'x' : 'y';
                }

            }
        }
    }



    recieveAttack(y, x){
        
        if(this.board[y][x] === null){
            if(!this.misses.some(coordinates => coordinates.y === y && coordinates.x === x)){
                this.misses.push({y, x});
            }
            return false;
        } else if(!this.board[y][x].isHit){
            this.board[y][x].ship.hit();
            this.board[y][x].isHit = true;
            return true;
        }
        
        return false;        
        
    }



    areShipsSunk(){

        for(const shipData of this.ships){
            if(!shipData.ship.isSunk()){
                return false;
            }
        }

        return true;

    }

    isShipSunk(y, x){

        if(this.board[y][x] !== null){
            return this.board[y][x].ship.isSunk();
        }

        return false;
    
    }


    printSea(){
        
        for(let row = 0; row < this.boardSize; row++){
            let rowStr = '|';
            for(let col = 0; col < this.boardSize; col++){
                if (this.getCell(row, col) !== null){
                    rowStr += 'X';
                } else {
                    rowStr += ' ';
                }
                
            }

            rowStr += '|';
            console.log(rowStr);
        }

    }

   


}

