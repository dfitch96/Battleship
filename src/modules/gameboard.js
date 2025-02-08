const Ship = require('./ship');

class Gameboard{

    constructor(){
        this.boardSize = 10;
        this.ships = [];
        this.board = this.initBoard();
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
            return;
        } 

        const newShipId = this.ships.length;
        const newShip = new Ship(newShipId, shipLength);
        this.ships.push(newShip);

        if(axis === 'x' && (x + shipLength < this.boardSize)){
            for(let col = x; col < x + shipLength; col++){
                this.board[y][col] = newShip;
            }
        } else if(axis === 'y' && (y + shipLength < this.boardSize)){
            for(let row = y; y < y + shipLength; row++){
                this.board[row][x] = newShip;
            }
        }

    }
}



module.exports = Gameboard;