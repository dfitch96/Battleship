const Gameboard = require('../modules/gameboard');
const Ship = require('../modules/ship');

describe('Gameboard', () => {

    let gameboard;
    beforeEach(() => {
        gameboard = new Gameboard();
    });

    test('placing a ship of size 1', () => {
        gameboard.placeShip(1, 2, 2);
        const cell = gameboard.board[2][2];
        expect(cell.ship).not.toBe(null);
        expect(cell.ship).toEqual(expect.any(Ship));
        expect(cell.ship.id).toBe(0);
        expect(cell.ship.length).toBe(1);
        
    });

    test('placing a ship of size 5 horizantally', () => {
        gameboard.placeShip(5, 0, 0);
        for(let col = 0; col < 5; col++){
            const cell = gameboard.board[0][col];
            expect(cell.ship).not.toBe(null);
            expect(cell.ship).toEqual(expect.any(Ship));
            expect(cell.ship.id).toBe(0);
            expect(cell.ship.length).toBe(5);
        }
    });

    test('placing a ship of size 3 horizantally', () => {
        gameboard.placeShip(3, 4, 4);
        for(let col = 4; col < 7; col++){
            const cell = gameboard.board[4][col];
            expect(cell.ship).not.toBe(null);
            expect(cell.ship).toEqual(expect.any(Ship));
            expect(cell.ship.id).toBe(0);
            expect(cell.ship.length).toBe(3);
        }
    });


    test('placing a ship of size 5 vertically', () => {
        gameboard.placeShip(5, 4, 0, 'y');
        for(let row = 4; row < 9; row++){
            const cell = gameboard.board[row][0];
            expect(cell.ship).not.toBe(null);
            expect(cell.ship).toEqual(expect.any(Ship));
            expect(cell.ship.id).toBe(0);
            expect(cell.ship.length).toBe(5);
        }
    });

    test('placing a ship out of bounds', () => {
        gameboard.placeShip(3, -5, 4);
        gameboard.board.forEach(row => row.forEach(cell => expect(cell).toBe(null)));
    });

    test('placing a ship with an invalid length', () => {
        gameboard.placeShip(-5, 4, 5);
        gameboard.board.forEach(row => row.forEach(cell => expect(cell).toBe(null)));
    });


    test('placing a ship where a ship has already been placed', () => {
        gameboard.placeShip(1, 0, 0);
        gameboard.placeShip(3, 0, 0);

        expect(gameboard.board[0][0].ship.id).toBe(0)

        for(let col = 1; col < 3; col++){
            expect(gameboard.board[0][col]).toBe(null);
        }
    });


    test('successful hit', () => {
        gameboard.placeShip(1, 0, 0);
        let res = gameboard.recieveAttack(0, 0);

        expect(res).toBe(true);
        expect(gameboard.board[0][0].isHit).toBe(true);
        expect(gameboard.board[0][0].ship.getHits()).toBe(1);
        expect(gameboard.board[0][0].ship.isSunk()).toBe(true);


    });

    test('two successful hits and no ship sink', () => {
        gameboard.placeShip(3, 0, 0);
        gameboard.recieveAttack(0, 0);
        gameboard.recieveAttack(0, 1);

        for(let col = 0; col < 2; col++){
            expect(gameboard.board[0][col].isHit).toBe(true);
            expect(gameboard.board[0][col].ship.getHits()).toBe(2);
            expect(gameboard.board[0][col].ship.isSunk()).toBe(false);
        }

    });

    test('three successful hits and ship sink', () => {
        gameboard.placeShip(3, 0, 0);
        gameboard.recieveAttack(0, 0);
        gameboard.recieveAttack(0, 1);
        gameboard.recieveAttack(0, 2);

        for(let col = 0; col < 3; col++){
            expect(gameboard.board[0][col].isHit).toBe(true);
        }

        expect(gameboard.board[0][0].ship.getHits()).toBe(3);
        expect(gameboard.board[0][0].ship.isSunk()).toBe(true);
    });



});