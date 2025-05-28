import { player, player1, player2 } from '../ui/playerName.js'
import {ComputerPlayer} from '../ComputerAI/computerAI.js'

export {startSinglePlayerGame}

function startSinglePlayerGame() {
    let allCoords = []
    document.querySelector('.place-ships').style.display = 'none'
    document.querySelector('.main-content').style.display = 'flex'
    document.querySelector('body > div.main-screen > div.main-content > h2.turn').textContent = player.playerName
    player.gameboard.playerShips.forEach(ship => {
        ship.coordinates.forEach(coord => {allCoords.push(coord)})
    });
    const grid = document.querySelector('.gameboards > .board-with-title > .grid')
    const cells = Array.from(grid.children);
    allCoords.forEach(([row, col]) => {
        const index = col * 10 + row;
        const cell = cells[index];
        cell.style.backgroundColor = 'green'; 
    })

    const computer = new ComputerPlayer()
    computer.createComputerShips()
    computer.placeComputerShips()
    let computerCoords = []
    computer.gameboard.playerShips.forEach(ship => {
        ship.coordinates.forEach(coord => {computerCoords.push(coord)})
    })
    console.log(computerCoords)
    const opponentGrid = document.querySelector('body > div.main-screen > div.main-content > div.gameboards > div.board-with-title.opponent-board > div');
    const opponentGridCells = Array.from(opponentGrid.children);
    computerCoords.forEach(([row, col]) => {
        const idx  = col * 10 + row;
        const opponentGridCell = opponentGridCells[idx];
        opponentGridCell.style.backgroundColor = 'green';
    });
}