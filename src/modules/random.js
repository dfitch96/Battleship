
const BOARD_SIZE = 10;
const MAX_TIMEOUT = 1500;
const MIN_TIMEOUT = 500;

export function getRandomCoordinate(){
        return Math.floor(Math.random() * BOARD_SIZE);
}


export function getRandomTimeout(){
        return Math.floor(Math.random() * (MAX_TIMEOUT - MIN_TIMEOUT) + MIN_TIMEOUT);
    }