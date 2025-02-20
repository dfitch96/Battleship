
import { BOARD_SIZE } from "./gameboard.js";
import { getRandomCoordinate } from "./random.js";

const DecisionStates = {
    HUNT: 0,
    SIGHTED: 1,
    TARGET: 2
}

export class MoveMaker{

    constructor(){
        this.state = DecisionStates.HUNT;
        this.decisions = this.#initDecisions();
        this.sightedStack = [];
        this.sightedTarget = null;
        this.targetQueueLeft = [];
        this.targetQueueRight = [];
        this.movingLeft = true;
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

        console.log('getting move in state ' + this.state);
        let decision = null;
        if(this.state === DecisionStates.HUNT){
            let y = getRandomCoordinate();
            let x = getRandomCoordinate();

            // while we've already made this decision, pick another random point
            while (this.decisions[y][x] === true){  
                y = getRandomCoordinate();
                x = getRandomCoordinate();
            }

            this.decisions[y][x] = true;
            decision = {y, x};
            
        } else if(this.state === DecisionStates.SIGHTED){
            decision = this.sightedStack.pop();

        } else if(this.state === DecisionStates.TARGET){

            if(this.targetQueueLeft.length === 0 && this.movingLeft){
                this.movingLeft = false;
            }
            
            if(this.targetQueueLeft.length !== 0 && this.movingLeft){
                decision = this.targetQueueLeft.shift();
            
            } else if (this.targetQueueRight.length !== 0 && !this.movingLeft){
                decision = this.targetQueueRight.shift();
            }

        }
        
        
        this.decisions[decision.y][decision.x] = true;
        
        return decision;
        
    }

    targetHit(y, x){

        console.log('target hit in state ' + this.state);
        if(this.state === DecisionStates.HUNT){
            // move to SIGHTED state
            console.log('moving to SIGHTED state');
            this.state = DecisionStates.SIGHTED;
            this.sightedTarget = {y, x};
            this.#pushAdjacentTargets(y, x);

        } else if(this.state === DecisionStates.SIGHTED){
            console.log('moving to TARGET state');
            this.state = DecisionStates.TARGET;
            this.sightedStack = [];
            

            const prevRowMove = y - this.sightedTarget.y
            if(prevRowMove !== 0){
                this.#populateColumn(y, x);
            }
            
            const prevColMove = x - this.sightedTarget.x;
            if(prevColMove !== 0){
                this.#populateRow(y, x);
            } 

            if(this.targetQueueLeft.length === 0 && this.targetQueueRight.length === 0){
                this.state = DecisionStates.HUNT;
                return
            }

            this.movingLeft = this.targetQueueLeft.length !== 0 ? true : false;

        } 
           
    }


    #populateRow(y, x){

        // populate targetStacks

        if(x + 1 < BOARD_SIZE){
            for(let col = x + 1; col < BOARD_SIZE; col++){
                if(!this.decisions[y][col]){
                    this.targetQueueRight.push({y, x: col});
                }
            }
        }
        
        if(x - 1 >= 0){
            for(let col = x - 1; col >= 0; col--){
                if(!this.decisions[y][col]){
                    this.targetQueueLeft.push({y, x: col});
                }
            }
        }

    }


    #populateColumn(y, x){

       
        // populate targetStacks
        if(y - 1 >= 0){
            
            for(let row = y - 1; row >= 0; row--){
                if(!this.decisions[row][x]){
                    this.targetQueueLeft.push({y: row , x});
                }
                
            }
        }
        
        if(y + 1 < BOARD_SIZE){
            
            for(let row = y + 1; row < BOARD_SIZE; row++){
                if(!this.decisions[row][x]){
                    this.targetQueueRight.push({y: row, x});
                }
                
            }
        }

    }



    targetSunk(){

        console.log('TARGET sunk');
        this.state = DecisionStates.HUNT;
        this.targetQueueLeft = [];
        this.targetQueueRight = [];

    }

    targetMiss(){
        if(this.state === DecisionStates.TARGET){
            
            if(this.targetQueueLeft.length !== 0 && this.movingLeft){
                this.targetQueueLeft = [];
                this.movingLeft = false;
            } else if (this.targetQueueRight.length !== 0 && !this.movingLeft){
                this.targetQueueRight = [];
            }

            // if(this.targetQueueLeft.length === 0 && this.targetQueueRight.length === 0){
            //     this.state = DecisionStates.HUNT;
            // }

        }
    }

    #pushAdjacentTargets(y, x){

        if(y - 1 >= 0 && !this.decisions[y - 1][x]){
            this.sightedStack.push({y: y - 1, x: x});
        } 

        if(y + 1 < BOARD_SIZE && !this.decisions[y + 1][x]){
            this.sightedStack.push({y: y + 1, x: x});
        }

        if(x - 1 >= 0 && !this.decisions[y][x - 1]){
            this.sightedStack.push({y: y, x: x - 1});
        }

        if(x + 1 < BOARD_SIZE && !this.decisions[y][x + 1]){
            this.sightedStack.push({y: y, x: x + 1});
        }
    }

}