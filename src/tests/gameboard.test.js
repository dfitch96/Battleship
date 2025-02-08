const Gameboard = require('../modules/gameboard');

describe('Gameboard', () => {

    let gameboard;
    beforeEach(() => {
        gameboard = new Gameboard();
    });

    test('placing a ship of size 1', () => {
        gameboard.placeShip(1, 2, 2);
        const ship = gameboard.board[2][2];

        expect(ship).not.toBe(null);
    });

})