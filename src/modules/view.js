
import {BOARD_SIZE} from './gameboard.js';

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

export function renderPlayerGrid(player){

    if (player !== 'player' && player !== 'computer'){
        console.log(`Unable to render ${player}`);
        return;
    }

    const main = document.querySelector('main');
    const playerContainer = document.createElement('div');

   
    playerContainer.setAttribute('id', `${player}-container`);

    const header = document.createElement('h2');
    header.classList.add('player-header');
    header.textContent = `${player.slice(0, 1).toUpperCase() + player.slice(1, player.length)}`;
    playerContainer.append(header);

    const playerGrid = document.createElement('div');
    playerGrid.setAttribute('id', `${player}`);
    playerGrid.classList.add('player-board')
    

    for(let row = 0; row < BOARD_SIZE; row++){
        for(let col = 0; col < BOARD_SIZE; col++){
            const boardItem = document.createElement('div');
            boardItem.dataset.row = row;
            boardItem.dataset.col = col;
            boardItem.classList.add('board-item');
            playerGrid.appendChild(boardItem);
        }
    }

    playerContainer.appendChild(playerGrid);
    main.appendChild(playerContainer);
}


export function addPlayerMoveEvents(handleMove){

    const computerBoard = document.querySelector('#computer');
    const boardCells = computerBoard.childNodes;

    boardCells.forEach(cell => {

        cell.addEventListener('click', handleMove);

        cell.addEventListener('mouseenter', (event) => {
        event.target.style.backgroundColor = "blue";
        });

        cell.addEventListener('mouseleave', (event) => {
            if(event.target.classList.contains('board-item')){
                event.target.style.backgroundColor = 'var(--secondary-color)';
            } else{
                event.target.style.backgroundColor = 'var(--ship-color)';
            }        
        });

    });
    
    

}


export function disableBoard(player){

    const playerGrid = document.querySelector(`#${player}`);
    const disabled = document.createElement("div");
    disabled.classList.add('disabled-board');
    disabled.textContent = player === 'player' ? `Player's Turn` : `Computer's Turn`;
    playerGrid.appendChild(disabled);
    
}

export function enableBoard(player){

    const playerGrid = document.querySelector(`#${player}`);
    const disabled = playerGrid.querySelector('.disabled-board');
    if(disabled){
        playerGrid.removeChild(disabled);
    }


}


export function renderShip(shipLength, y, x, axis = 'x'){
    
    if(y < 0 || y >= BOARD_SIZE || x < 0 || x >= BOARD_SIZE || shipLength <= 0){
        return;
    } 

    if(axis === 'x'){
        renderHorizontalShip(shipLength, y, x);
    } else if (axis === 'y'){
        renderVerticalShip(shipLength, y, x);
    }
}


function renderHorizontalShip(shipLength, y, x){

    for(let col = x; col < x + shipLength; col++){
        const boardItem = document.querySelector(`[data-row="${y}"][data-col="${col}"]`);
        boardItem.classList.remove('board-item');
        boardItem.classList.add('ship-item');
        if(col !== x + shipLength - 1){
            boardItem.style.borderRight = '0';
        }
        if(col !== x){
            boardItem.style.borderLeft = '0';
        }
    }
}


function renderVerticalShip(shipLength, y, x){

    for(let row = y; row < y + shipLength; row++){
        const boardItem = document.querySelector(`[data-row="${row}"][data-col="${x}"]`);
        boardItem.classList.remove('board-item');
        boardItem.classList.add('ship-item');
        if(row !== y + shipLength - 1){
            boardItem.style.borderBottom = '0';
        }
        if(row !== y){
            boardItem.style.borderTop = '0';
        }
    }
}







