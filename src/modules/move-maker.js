


const DecisionStates = {
    LOST: 'lost',
    FOUND: 'found',
}


export class MoveMaker{

    constructor(){
        this.state = DecisionStates.LOST;
        this.verticalMoveQueue = [];
        this.horizantalMoveQueue = [];
    }

    getMove(board){

        if(this.state === DecisionStates.LOST){
            let y = getRandomCoordinate();
            let x = getRandomCoordinate();
        
            while (board.isAlreadyAttacked(y, x)){
                console.log(`${y}, ${x} already registered as an attack`);
                y = getRandomCoordinate();
                x = getRandomCoordinate();
            }

            return {y, x};
        }
        
    }

    addSuccessfulAttack(){
        
    }

    updateState(success){

        if(success && this.state === DecisionStates.LOST){

        }

    }
    
    getRandomCoordinate(){
        return Math.floor(Math.random() * BOARD_SIZE);
    }


}