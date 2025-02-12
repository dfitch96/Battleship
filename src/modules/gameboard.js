import {Ship}from './ship.js';

export const BOARD_SIZE = 10;

export class Gameboard{

    constructor(){
        this.boardSize = BOARD_SIZE;
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

        for(let col = x; col < x + shipLength; col++){
            if (this.board[y][col] !== null){
                return false;
            }
        }

        return true;

    }

    #verifyYAxis(y, x, shipLength){
        if (y + shipLength > this.boardSize){
            return false;
        }

        for(let row = y; row < y + shipLength; row++){
            if(this.board[row][x] !== null){
                return false;
            }
        }

        return true;


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

