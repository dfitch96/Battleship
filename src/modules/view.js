
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
            boardItem.classList.add('board-item');
            playerGrid.appendChild(boardItem);
        }
    }

    playerContainer.appendChild(playerGrid);
    main.appendChild(playerContainer);
}







