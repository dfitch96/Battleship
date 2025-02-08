const Gameboard = require('../modules/gameboard');
const Ship = require('../modules/ship');

describe('Gameboard', () => {

    let gameboard;
    beforeEach(() => {
        gameboard = new Gameboard();
    });

    test('placing a ship of size 1', () => {
        gameboard.placeShip(1, 2, 2);
        const ship = gameboard.board[2][2];
        console.log(typeof ship);
        
    });

    test('placing a ship of size 3 horizantally', () => {
        gameboard.placeShip(3, 4, 4);
        for(let i = 4; i < 7; i++){
            const ship = gameboard.board[4][i];
            expect(ship).not.toBe(null);
            expect(ship).toEqual(expect.any(Ship));
            expect(ship.id).toBe(0);
            expect(ship.length).toBe(3);
        }
    });



})