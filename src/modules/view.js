
import {BOARD_SIZE} from './gameboard.js';
import { playerTypes } from './player.js';
import { ClassNames } from './class-names.js';


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

export function clearPlayerGrid(){
    const playerGrid = document.querySelector(`#${playerTypes.PLAYER}`);
    for(let row = 0; row < BOARD_SIZE; row++){
        for(let col = 0; col < BOARD_SIZE; col++){
            const gridCell = playerGrid.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            if (gridCell.classList.contains(ClassNames.SHIP_ITEM)){
                gridCell.removeAttribute('style');
                gridCell.classList.remove(ClassNames.SHIP_ITEM);
                gridCell.classList.add(ClassNames.BOARD_ITEM);
            }
        }
    }

}


export function renderPlayerGrid(player){

    if (player !== playerTypes.PLAYER && player !== playerTypes.COMPUTER){
        console.log(`Unable to render ${player}`);
        return;
    }

    const main = document.querySelector('main');
    const playerContainer = document.createElement('div');

   
    playerContainer.setAttribute('id', `${player}-container`);

    const header = document.createElement('h2');
    header.classList.add(ClassNames.PLAYER_HEADER);
    header.textContent = `${player.slice(0, 1).toUpperCase() + player.slice(1, player.length)}`;
    playerContainer.append(header);

    const playerGrid = document.createElement('div');
    playerGrid.setAttribute('id', `${player}`);
    playerGrid.classList.add(ClassNames.PLAYER_BOARD)
    

    for(let row = 0; row < BOARD_SIZE; row++){
        for(let col = 0; col < BOARD_SIZE; col++){
            const boardItem = document.createElement('div');
            boardItem.dataset.row = row;
            boardItem.dataset.col = col;
            boardItem.classList.add(ClassNames.BOARD_ITEM);
            playerGrid.appendChild(boardItem);
        }
    }

    playerContainer.appendChild(playerGrid);
    main.appendChild(playerContainer);
}



export function addPlayerMoveEventListeners(handleMove){

    const computerBoard = document.querySelector(`#${playerTypes.COMPUTER}`);
    const boardCells = computerBoard.childNodes;

    boardCells.forEach(cell => {
        cell.addEventListener('click', handleMove);
        cell.addEventListener('mouseenter', handleMouseEnter);
        cell.addEventListener('mouseleave', handleMouseLeave);
    });
}

export function removePlayerMoveEventListeners(target, handlePlayerMove){
    target.style.backgroundColor = '';
    target.removeEventListener('click', handlePlayerMove);
    target.removeEventListener('mouseenter', handleMouseEnter);
    target.removeEventListener('mouseleave', handleMouseLeave);
}


function handleMouseEnter(event){
    event.target.style.backgroundColor = "blue";
}

function handleMouseLeave(event){
    event.target.style.backgroundColor = '';
}


export function disableBoard(player){

    const playerGrid = document.querySelector(`#${player}`);
    const disabled = document.createElement('div');
    disabled.classList.add(ClassNames.DISABLED_BOARD);
    disabled.textContent = player === playerTypes.PLAYER ? `Player's Turn` : `Computer's Turn`;
    playerGrid.appendChild(disabled);
    
}

export function enableBoard(player){

    const playerGrid = document.querySelector(`#${player}`);
    const disabled = playerGrid.querySelector(`.${ClassNames.DISABLED_BOARD}`);
    if(disabled){
        playerGrid.removeChild(disabled);
    }
}


export function disableBoardGameOver(player){

    const playerGrid = document.querySelector(`#${player.getPlayerType()}`);
    const disabled = document.createElement('div');
    disabled.classList.add(ClassNames.DISABLED_BOARD);
    const hitsDiv = document.createElement('div');
    hitsDiv.textContent = `Total Hits: ${player.gameboard.getTotalSuccessfulHits()}`;
    const missesDiv = document.createElement('div');
    missesDiv.textContent = `Total Misses: ${player.gameboard.getMisses().length}`;

    disabled.appendChild(hitsDiv);
    disabled.appendChild(missesDiv);
    playerGrid.appendChild(disabled);
}


export function renderSuccessfullAttack(player, y, x){

    const playerBoard = document.querySelector(`#${player}`);
    const cell = playerBoard.querySelector(`[data-row="${y}"][data-col="${x}"]`);
    cell.classList.add(ClassNames.HIT_ITEM);
    const blastIcon = document.createElement('img');
    blastIcon.src = './images/blast.png';
    cell.appendChild(blastIcon);
}

export function renderMissedAttack(player, y, x){

    const playerBoard = document.querySelector(`#${player}`);
    const cell = playerBoard.querySelector(`[data-row="${y}"][data-col="${x}"]`);
    const missIcon = document.createElement('img');
    missIcon.src = './images/close.png';
    cell.appendChild(missIcon);

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

    const playerBoard = document.querySelector(`#${playerTypes.PLAYER}`);
    for(let col = x; col < x + shipLength; col++){
        const boardItem = playerBoard.querySelector(`[data-row="${y}"][data-col="${col}"]`);
        boardItem.classList.remove(ClassNames.BOARD_ITEM);
        boardItem.classList.add(ClassNames.SHIP_ITEM);
        if(col !== x + shipLength - 1){
            boardItem.style.borderRight = '0';
        }
        if(col !== x){
            boardItem.style.borderLeft = '0';
        }
    }
}


function renderVerticalShip(shipLength, y, x){

    const playerBoard = document.querySelector(`#${playerTypes.PLAYER}`);
    for(let row = y; row < y + shipLength; row++){
        const boardItem = playerBoard.querySelector(`[data-row="${row}"][data-col="${x}"]`);
        boardItem.classList.remove(ClassNames.BOARD_ITEM);
        boardItem.classList.add(ClassNames.SHIP_ITEM);
        if(row !== y + shipLength - 1){
            boardItem.style.borderBottom = '0';
        }
        if(row !== y){
            boardItem.style.borderTop = '0';
        }
    }
}


export const addButtonGroup = function(){

    const playerContainer = document.querySelector(`#${playerTypes.PLAYER}-container`);
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add(ClassNames.BUTTONS);

    playerContainer.appendChild(buttonsDiv);

}


export function removeButtonGroup(){
    const playerContainer = document.querySelector(`#${playerTypes.PLAYER}-container`);
     const buttonsDiv = playerContainer.querySelector(`.${ClassNames.BUTTONS}`);
     playerContainer.removeChild(buttonsDiv);

}


export function addButton(btnText, handler){

    const buttonsDiv = document.querySelector(`.${ClassNames.BUTTONS}`);
    const newButton = document.createElement('button');
    newButton.textContent = btnText;
    newButton.addEventListener('click', handler);
    buttonsDiv.appendChild(newButton);
}


export function log(msg){
    const output = document.querySelector('output');
    output.textContent = msg;
}








