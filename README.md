# Battleship
## Overview
This is a classic Battleship game built with JavaScript. The game follows the principles of Test-Driven Development (TDD) and includes a player-controlled board as well as an intelligent computer AI opponent. The project is part of __The Odin Project's__ curriculum and focuses on modular design and game logic implementation.

## Features
- __Ship Placement:__ Players can manually place ships or randomly generate their placements.
- __Gameboard Management:__ Tracks ship locations, missed shots, and hits.
- __Turn-Based Gameplay:__ Players take turns attacking the opponent's board.
- __AI Opponent:__ The computer makes intelligent moves, avoiding duplicate attacks and prioritizing adjacent targets after a hit.
- __Endgame Condition:__ The game ends when all ships of a player are sunk.
- __User Interface:__ A graphical interface displays both player and computer gameboards, updating dynamically with game progress.

## Installation
1. Clone the repository:
   ```bash
   git@github.com:dfitch96/Battleship.git
2. Install Dependencies
   ```bash
   npm install

## Game Rules
1. Players start by placing ships on a 10x10 grid.
2. Ships can be placed horizontally or vertically.
3. Players take turns selecting a coordinate to attack. If an attack successfully hits a ship, the player gets another turn. Otherwise, the turn passes to the opponent.
4. The opponent’s board updates to reflect hits or misses.
5. The game continues until one player has no remaining ships.

## How It Works
- Ship Class: Defines ship properties (length, hit status, sunk status).
- Gameboard Class: Manages ship placement, tracking hits and misses.
- Player Class: Handles player and computer actions.
- Computer AI: Randomly selects moves but follows a logical strategy after a successful hit.
- DOM Module: Updates the UI dynamically based on game state.

## Future Enhancements
- Implement drag-and-drop ship placement.
- Add a two-player mode.

## Live Preview
[View the app live](https://dfitch96.github.io/Battleship/)
