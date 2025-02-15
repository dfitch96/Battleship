
const BOARD_SIZE = 10;
const MAX_TIMEOUT = 2000;
const MIN_TIMEOUT = 1000;

export function getRandomCoordinate(){
        return Math.floor(Math.random() * BOARD_SIZE);
}


export function getRandomTimeout(){
        return Math.floor(Math.random() * (MAX_TIMEOUT - MIN_TIMEOUT) + MIN_TIMEOUT);
    }