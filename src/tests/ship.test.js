const Ship = require('../modules/ship');

describe('Ship', () => {


    test('passing incorrect type to ship constructor', () => {
        expect(() => new Ship('fdaf')).toThrow(TypeError);
    });
    
    test('hitting a ship', () => {
        const ship = new Ship(3);
        ship.hit();
        expect(ship.getHits()).toBe(1);
        ship.hit();
        expect(ship.getHits()).toBe(2);
        
    });

    test('hitting a ship after its already been sunk', () => {
        const ship = new Ship(1);
        ship.hit();
        expect(ship.getHits()).toBe(1);
        ship.hit();
        expect(ship.getHits()).toBe(1);
    });

    test('sinking a ship', () => {
        const ship = new Ship(1);
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });


});