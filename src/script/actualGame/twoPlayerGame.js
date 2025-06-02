import {player1, player2} from '../ui/playerName.js'

export function startTwoPlayerGame() {
    document.querySelector('.place-ships').style.display = 'none'
    document.querySelector('.main-content').style.display = 'flex'
    player1Turn()
}

function determineGameOver() {
  const player1AllSunk = player1.gameboard.checkShipsStatus();
  const player2AllSunk  =  player2.gameboard.checkShipsStatus();
  return player1AllSunk || player2AllSunk;
}

function announceWinner() {
    if (player1.gameboard.checkShipsStatus()) {
        alert(`${player2.playerName} Wins!`);
    } else {
        alert(`${player1.playerName} Wins!`);
    }
}

function player1Turn() {
    if (determineGameOver()) {announceWinner(); return}
    let allCoords = []
    player1.gameboard.playerShips.forEach(ship => {
        ship.coordinates.forEach(coord => {allCoords.push(coord)})
    });
    const grid = document.querySelector('.gameboards > .board-with-title > .grid')
    const cells = Array.from(grid.children);
    allCoords.forEach(([row, col]) => {
        const index = col * 10 + row;
        const cell = cells[index];
        cell.style.backgroundColor = 'green'; 
    })

    document.querySelector('.turn').textContent = `${player1.playerName}'s Turn`

    let otherPlayerCoords = []
    player2.gameboard.playerShips.forEach(ship => {
        ship.coordinates.forEach(coord => {otherPlayerCoords.push(coord)})
    })
    const opponentGrid = document.querySelector('body > div.main-screen > div.main-content > div.gameboards > div.board-with-title.opponent-board > div.grid');
    const opponentGridCells = Array.from(opponentGrid.children);
    otherPlayerCoords.forEach(([row, col]) => {
        const idx  = col * 10 + row;
        const opponentGridCell = opponentGridCells[idx];
        opponentGridCell.style.backgroundColor = 'green';
    });
}

function player2Turn() {
    if (determineGameOver()) {announceWinner(); return}
    let allCoords = []
    player2.gameboard.playerShips.forEach(ship => {
        ship.coordinates.forEach(coord => {allCoords.push(coord)})
    });
    const grid = document.querySelector('.gameboards > .board-with-title > .grid')
    const cells = Array.from(grid.children);
    allCoords.forEach(([row, col]) => {
        const index = col * 10 + row;
        const cell = cells[index];
        cell.style.backgroundColor = 'green'; 
    })

    document.querySelector('.turn').textContent = `${player2.playerName}'s Turn`

    let otherPlayerCoords = []
    player2.gameboard.playerShips.forEach(ship => {
        ship.coordinates.forEach(coord => {otherPlayerCoords.push(coord)})
    })
    const opponentGrid = document.querySelector('body > div.main-screen > div.main-content > div.gameboards > div.board-with-title.opponent-board > div.grid');
    const opponentGridCells = Array.from(opponentGrid.children);
    otherPlayerCoords.forEach(([row, col]) => {
        const idx  = col * 10 + row;
        const opponentGridCell = opponentGridCells[idx];
        opponentGridCell.style.backgroundColor = 'green';
    });
}