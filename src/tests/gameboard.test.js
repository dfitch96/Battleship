const Gameboard = require('../modules/gameboard');
const Ship = require('../modules/ship');

describe('Gameboard', () => {

    let gameboard;
    beforeEach(() => {
        gameboard = new Gameboard();
    });

    test('placing a ship of size 1', () => {
        
        expect(gameboard.placeShip(1, 2, 2)).toBe(true);
        
        //verify board state
        const cell = gameboard.getCell(2, 2);
        expect(cell.ship).not.toBe(null);
        expect(cell.ship).toEqual(expect.any(Ship));
        expect(cell.ship.id).toBe(0);
        expect(cell.ship.length).toBe(1);
        
    });

    test('placing a ship of size 5 horizantally', () => {
        expect(gameboard.placeShip(5, 0, 0)).toBe(true);

        //verify board state
        for(let col = 0; col < 5; col++){
            const cell = gameboard.getCell(0, col);
            expect(cell.ship).not.toBe(null);
            expect(cell.ship).toEqual(expect.any(Ship));
            expect(cell.ship.id).toBe(0);
            expect(cell.ship.length).toBe(5);
        }
    });

    test('placing a ship of size 3 horizantally', () => {
        expect(gameboard.placeShip(3, 4, 4)).toBe(true);
        for(let col = 4; col < 7; col++){
            const cell = gameboard.getCell(4, col);
            expect(cell.ship).not.toBe(null);
            expect(cell.ship).toEqual(expect.any(Ship));
            expect(cell.ship.id).toBe(0);
            expect(cell.ship.length).toBe(3);
        }
    });


    test('placing a ship of size 5 vertically', () => {
        expect(gameboard.placeShip(5, 4, 0, 'y')).toBe(true);
        for(let row = 4; row < 9; row++){
            const cell = gameboard.getCell(row, 0);
            expect(cell.ship).not.toBe(null);
            expect(cell.ship).toEqual(expect.any(Ship));
            expect(cell.ship.id).toBe(0);
            expect(cell.ship.length).toBe(5);
        }
    });

    test('placing a ship out of bounds', () => {
        const initialState = JSON.stringify(gameboard.getGameboard());
        expect(gameboard.placeShip(3, -5, 4)).toBe(false);
        expect(JSON.stringify(gameboard.getGameboard())).toEqual(initialState);
    });

    test('placing a ship with an invalid length', () => {
        const initialState = JSON.stringify(gameboard.getGameboard());
        expect(gameboard.placeShip(-5, 4, 5)).toBe(false);
        expect(JSON.stringify(gameboard.getGameboard())).toEqual(initialState);
    });


    test('placing a ship where a ship has already been placed', () => {
        expect(gameboard.placeShip(1, 0, 0)).toBe(true);
        const beforeState = JSON.stringify(gameboard.getGameboard());
        expect(gameboard.placeShip(3, 0, 0)).toBe(false);
        expect(JSON.stringify(gameboard.getGameboard())).toEqual(beforeState);
    });


    test('placing a ship through the middle of another ship', () => {
        expect(gameboard.placeShip(5, 3, 0)).toBe(true);
        const beforeState = JSON.stringify(gameboard.getGameboard());
        expect(gameboard.placeShip(3, 2, 0, 'y')).toBe(false);
        expect(JSON.stringify(gameboard.getGameboard())).toEqual(beforeState);
    })


    test('successful hit', () => {
        gameboard.placeShip(1, 0, 0);
        let res = gameboard.recieveAttack(0, 0);

        expect(res).toBe(true);
        expect(gameboard.getCell(0, 0).isHit).toBe(true);
        expect(gameboard.getCell(0, 0).ship.getHits()).toBe(1);
        expect(gameboard.getCell(0, 0).ship.isSunk()).toBe(true);


    });

    test('two successful hits and no ship sink', () => {
        gameboard.placeShip(3, 0, 0);
        gameboard.recieveAttack(0, 0);
        gameboard.recieveAttack(0, 1);

        for(let col = 0; col < 2; col++){
            expect(gameboard.getCell(0, col).isHit).toBe(true);
            expect(gameboard.getCell(0, col).ship.getHits()).toBe(2);
            expect(gameboard.getCell(0, col).ship.isSunk()).toBe(false);
        }

    });

    test('three successful hits and ship sink', () => {
        gameboard.placeShip(3, 0, 0);
        gameboard.recieveAttack(0, 0);
        gameboard.recieveAttack(0, 1);
        gameboard.recieveAttack(0, 2);

        for(let col = 0; col < 3; col++){
            expect(gameboard.getCell(0, col).isHit).toBe(true);
        }

        expect(gameboard.getCell(0, 0).ship.getHits()).toBe(3);
        expect(gameboard.getCell(0, 0).ship.isSunk()).toBe(true);
    });


    test('attack miss', () => {
        gameboard.placeShip(1, 0, 0);
        const res = gameboard.recieveAttack(1, 1);
        expect(res).toBe(false);
        expect(gameboard.misses.length).toBe(1);
        expect(gameboard.misses[0][0]).toBe(1);
        expect(gameboard.misses[0][1]).toBe(1);
    });


    test('attack on coordinate already hit', () => {
        gameboard.placeShip(1, 0, 0);
        gameboard.recieveAttack(0, 0);
        const res = gameboard.recieveAttack(0, 0);
        expect(res).toBe(false);
        expect(gameboard.misses.length).toBe(0);
    });


    test('all ships are sunk', () => {
        gameboard.placeShip(1, 0, 0);
        gameboard.recieveAttack(0, 0);
        expect(gameboard.areShipsSunk()).toBe(true);
    });


    test('all ships are not sunk', () => {
        gameboard.placeShip(1, 0, 0);
        expect(gameboard.areShipsSunk()).toBe(false);
    });



});