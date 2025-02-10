const Ship = require('./ship');

class Gameboard{

    constructor(){
        this.boardSize = 10;
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

        if(y < 0 || y >= this.boardSize || x < 0 || x >= this.boardSize || shipLength <= 0 || this.board[y][x] !== null){
            return false;
        } else if(axis === 'x' && !this.#verifyXAxis(y, x, shipLength)){
            return false;
        } else if(axis === 'y' && !this.#verifyYAxis(y, x, shipLength)){
            return false;
        }

        const newShipId = this.ships.length;
        const newShip = new Ship(newShipId, shipLength);
        this.ships.push(newShip);

        if(axis === 'x' && (x + shipLength < this.boardSize)){
            for(let col = x; col < x + shipLength; col++){
                this.board[y][col] = {
                    ship: newShip,
                    isHit: false
                };
            }

        } else if(axis === 'y' && (y + shipLength < this.boardSize)){
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

        for(let col = x; col < x + shipLength; col++){
            if (this.board[y][col] !== null){
                return false;
            }
        }

        return true;

    }

    #verifyYAxis(y, x, shipLength){

        for(let row = y; row < y + shipLength; row++){
            if(this.board[row][x] !== null){
                return false;
            }
        }

        return true;


    }


    recieveAttack(y, x){
        
        if(this.board[y][x] === null){
            this.misses.push([y, x]);
            return false;
        } else if(!this.board[y][x].isHit){
            this.board[y][x].ship.hit();
            this.board[y][x].isHit = true;
            return true;
        }
        
        return false;        
        
    }

    areShipsSunk(){

        for(const ship of this.ships){
            if(ship.isSunk()){
                return true;
            }
        }

        return false;

    }


}



module.exports = Gameboard;