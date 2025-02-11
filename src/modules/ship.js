

export class Ship{

    constructor(length){
        if(typeof length !== "number"){
            throw new TypeError('ship constructor takes length of type number')
        }
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    }

    getHits(){
        return this.hits;
    }

    hit(){
        if(!this.isSunk()){
            this.hits++;
        }
    }

    isSunk(){
        if(this.hits === this.length){
            this.sunk = true;
        }
        return this.sunk;
    }
}


