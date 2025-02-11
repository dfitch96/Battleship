


export function printGrid(gameboard){
        
        for(let row = 0; row < gameboard.getGameboardSize(); row++){
            let rowStr = '|';
            for(let col = 0; col < gameboard.getGameboardSize(); col++){
                if (gameboard.getCell(row, col) !== null){
                    rowStr += 'X';
                } else {
                    rowStr += ' ';
                }
                
            }

            rowStr += '|';
            console.log(rowStr);
        }

    }




