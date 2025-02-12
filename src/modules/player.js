import {Gameboard} from './gameboard.js'

export const playerTypes = {
    PLAYER: 'player',
    COMPUTER: 'computer'
}

export class Player{

    #playerType;

    constructor(playerType){
        this.gameboard = new Gameboard();
        this.#playerType = playerType;
    }

    getPlayerType(){
        return this.#playerType;
    }

}


