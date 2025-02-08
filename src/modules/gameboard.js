

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


    placeShip(length, x, y, axis = 'x'){

        


    }
}



module.exports = Gameboard;