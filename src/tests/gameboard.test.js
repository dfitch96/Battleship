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
    });

    test('placing a ship of size greater than the board', () => {
        
        expect(gameboard.placeShip(11, 0, 0)).toBe(false);
    });

    test('placing a ship which extends out of bounds', () => {
        expect(gameboard.placeShip(5, 0, 6)).toBe(false);
    });

    test('placing a ship with string length', () => {
        expect(() => gameboard.placeShip('asdfa', 0, 0)).toThrow(TypeError)
    });

    test('placing a ship with an negative length', () => {
        const initialState = gameboard.getGameboard();
        expect(gameboard.placeShip(-5, 4, 5)).toBe(false);
        expect(gameboard.getGameboard()).toEqual(initialState);
    });

    test('placing a ship of size 5 horizantally', () => {
        expect(gameboard.placeShip(5, 0, 0)).toBe(true);

        //verify board state
        for(let col = 0; col < 5; col++){
            const cell = gameboard.getCell(0, col);
            expect(cell.ship).not.toBe(null);
        }
    });

    test('placing a ship of size 3 horizantally', () => {
        expect(gameboard.placeShip(3, 4, 4)).toBe(true);
        for(let col = 4; col < 7; col++){
            const cell = gameboard.getCell(4, col);
            expect(cell.ship).not.toBe(null);
        }
    });

    test('bottom right corner', () => {
        expect(gameboard.placeShip(5, 1, 1)).toBe(true);
        expect(gameboard.placeShip(3, 9, 7)).toBe(true);
    });

    test('crossing horizontally', () => {
      
        expect(gameboard.placeShip(5, 5, 4, 'y')).toBe(true);
        expect(gameboard.placeShip(5, 6, 3, 'y')).toBe(false);
    })


    test('placing a ship of size 5 vertically', () => {
        expect(gameboard.placeShip(5, 4, 0, 'y')).toBe(true);
        for(let row = 4; row < 9; row++){
            const cell = gameboard.getCell(row, 0);
            expect(cell.ship).not.toBe(null);
        }
    });

    test('placing a ship out of bounds', () => {
        const initialState = gameboard.getGameboard();
        expect(gameboard.placeShip(3, -5, 4)).toBe(false);
        expect(gameboard.getGameboard()).toEqual(initialState);
    });

   


    test('placing a ship where a ship has already been placed', () => {
        expect(gameboard.placeShip(1, 0, 0)).toBe(true);
        const beforeState = gameboard.getGameboard();
        expect(gameboard.placeShip(3, 0, 0)).toBe(false);
        expect(gameboard.getGameboard()).toEqual(beforeState);
    });

    test('placing an overlapping ship', () => {
        gameboard.placeShip(3, 0, 0);
        expect(gameboard.placeShip(2, 0, 3)).toBe(true);  // Should be valid
        expect(gameboard.placeShip(2, 0, 2)).toBe(false); // Should fail (overlap)
    })


    test('placing a ship through the middle of another ship', () => {
        expect(gameboard.placeShip(5, 3, 0)).toBe(true);
        const beforeState = gameboard.getGameboard();
        expect(gameboard.placeShip(3, 2, 0, 'y')).toBe(false);
        expect(gameboard.getGameboard()).toEqual(beforeState);
    })


    test('successful hit', () => {

        expect(gameboard.placeShip(1, 0, 0)).toBe(true);
        expect(gameboard.recieveAttack(0, 0)).toBe(true);
        expect(gameboard.getCell(0, 0).isHit).toBe(true);
        expect(gameboard.getCell(0, 0).ship.getHits()).toBe(1);
        expect(gameboard.getCell(0, 0).ship.isSunk()).toBe(true);


    });

    test('two successful hits and no ship sink', () => {

        expect(gameboard.placeShip(3, 0, 0)).toBe(true);
        expect(gameboard.recieveAttack(0, 0)).toBe(true);
        expect(gameboard.recieveAttack(0, 1)).toBe(true);
        for(let col = 0; col < 2; col++){
            const cell = gameboard.getCell(0, col);
            expect(cell.isHit).toBe(true);
            expect(cell.ship.getHits()).toBe(2);
            expect(cell.ship.isSunk()).toBe(false);
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
        const state = JSON.stringify(gameboard.getGameboard());
        expect(gameboard.recieveAttack(1, 1)).toBe(false);
        expect(gameboard.getMisses()).toContainEqual({y: 1, x: 1});
        expect(JSON.stringify(gameboard.getGameboard())).toEqual(state);
    });


    test('attack on coordinate already hit', () => {
        gameboard.placeShip(1, 0, 0);
        expect(gameboard.recieveAttack(0, 0)).toBe(true);
        expect(gameboard.recieveAttack(0, 0)).toBe(false);
    });


    test('all ships are sunk', () => {
        gameboard.placeShip(1, 0, 0);
        gameboard.placeShip(1, 2, 2);
        expect(gameboard.recieveAttack(0, 0)).toBe(true);
        expect(gameboard.recieveAttack(2, 2)).toBe(true);
        expect(gameboard.areShipsSunk()).toBe(true);
    });


    test('all ships are not sunk', () => {
        gameboard.placeShip(1, 0, 0);
        gameboard.placeShip(3, 4, 0);
        gameboard.recieveAttack(0, 0);
        expect(gameboard.areShipsSunk()).toBe(false);
    });



});