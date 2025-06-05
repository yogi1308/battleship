import { player, player1, player2 } from '../ui/playerName.js'
import {ComputerPlayer} from '../ComputerAI/computerAI.js'
import {controlGame} from './gameController.js'

export {startSinglePlayerGame, computer}

let computer = null

function startSinglePlayerGame() {
    let allCoords = []
    document.querySelector('.place-ships').style.display = 'none'
    document.querySelector('.main-content').style.display = 'flex'
    player.gameboard.playerShips.forEach(ship => {
        ship.coordinates.forEach(coord => {allCoords.push(coord)})
    });
    const grid = document.querySelector('.gameboards > .board-with-title > .grid')
    const cells = Array.from(grid.children);
    cells.forEach(cell => {
        cell.style.backgroundColor = ''; 
        cell.textContent = ''
        cell.classList.remove('hit')
        cell.classList.remove('miss')
        cell.classList.remove('attacked')
    })
    allCoords.forEach(([row, col]) => {
        const index = col * 10 + row;
        const cell = cells[index];
        cell.style.backgroundColor = 'green'; 
    })

    computer = new ComputerPlayer()
    computer.createComputerShips()
    computer.placeComputerShips()
    let computerCoords = []
    computer.gameboard.playerShips.forEach(ship => {
        ship.coordinates.forEach(coord => {computerCoords.push(coord)})
    })
    const opponentGrid = document.querySelector('body > div.main-screen > div.main-content > div.gameboards > div.board-with-title.opponent-board > div.grid');
    const opponentGridCells = Array.from(opponentGrid.children);
    opponentGridCells.forEach(cell => {
        cell.style.backgroundColor = ''; 
        cell.textContent = ''
        cell.classList.remove('hit')
        cell.classList.remove('miss')
        cell.classList.remove('attacked')
    })
    computerCoords.forEach(([row, col]) => {
        const idx  = col * 10 + row;
        const opponentGridCell = opponentGridCells[idx];
        opponentGridCell.style.backgroundColor = 'green';
    });
    controlGame()
}