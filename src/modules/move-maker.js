
import { BOARD_SIZE } from "./gameboard.js";

const DecisionStates = {
    HUNT: 0,
    TARGET: 1
}


export class MoveMaker{

    constructor(){
        this.state = DecisionStates.HUNT;
        this.decisions = this.#initDecisions();
    }

    #initDecisions(){

        const decisions = []

        for(let row = 0; row < BOARD_SIZE; row++){
            decisions.push([]);
            for(let col = 0; col < BOARD_SIZE; col++){
                decisions[row].push(false);
            }
        }

        return decisions;
    }

    getMove(){

        if(this.state === DecisionStates.HUNT){
            let y = this.getRandomCoordinate();
            let x = this.getRandomCoordinate();

            // while we've already made this decision, pick another random point
            while (this.decisions[y][x] === true){  
                console.log(`${y}, ${x} already registered as an attack`);
                y = this.getRandomCoordinate();
                x = this.getRandomCoordinate();
            }

            this.decisions[y][x] = true;
            return {y, x};
        }
        
    }

    markDecision(isSuccess, y, x){

        if(this.state === DecisionStates.HUNT){
            // move to TARGET state
            // append adjacent coordinates that havent already been targeted to target queue 
        } else{
            // if decision was a successful hit, continue moving in that directionwaa

        }

        
    }

    
    getRandomCoordinate(){
        return Math.floor(Math.random() * BOARD_SIZE);
    }


}