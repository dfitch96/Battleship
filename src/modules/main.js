const Gameboard = require('./gameboard');

const gameboard = new Gameboard();
gameboard.placeShip(5, 1, 1);
gameboard.placeShip(3, 9, 7);
gameboard.placeShip(5, 0, 9, 'y');
gameboard.placeShip(5, 5, 4, 'y');
gameboard.placeShip(5, 6, 3, 'y');
gameboard.printSea();
