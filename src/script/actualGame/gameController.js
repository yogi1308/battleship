import {player} from '../ui/playerName.js'
import {computer} from './startGame.js'
import {rematch, mainMenu} from './gameOver.js'

export {controlGame}

function controlGame() {
    humanTurn()
}

function determineGameOver() {
  const humanAllSunk = player.gameboard.checkShipsStatus();
  const compAllSunk  =  computer.gameboard.checkShipsStatus();
  return humanAllSunk || compAllSunk;
}


function humanTurn() {
    if (determineGameOver()) {announceWinner(); return}
    document.querySelector('body > div.main-screen > div.main-content > h2.turn').textContent = `${player.playerName}'s Turn`
    const opponentGrid = document.querySelectorAll('div.gameboards > div.board-with-title.opponent-board > div.grid > div');
    opponentGrid.forEach(cell => {
        cell.addEventListener('click', onOpponentClick);
    })
    document.querySelectorAll('div.gameboards > div.board-with-title.opponent-board > div.grid > div.attacked').forEach(cell => {cell.removeEventListener('click', onOpponentClick)})
}

function announceWinner() {
    document.querySelector('.main-content').style.display = 'none'
    const endScreenDiv = document.querySelector('.end-screen')
    endScreenDiv.style.display = 'flex'
    if (player.gameboard.checkShipsStatus()) {
        endScreenDiv.querySelector('.winner').textContent = `Computer Wins!`
    } else {
        endScreenDiv.querySelector('.winner').textContent = `${player.playerName} Wins!`
    }
    document.querySelector('.end-screen .end-screen-options button').addEventListener('click', () => {rematch()})
    document.querySelector('.end-screen .end-screen-options button:nth-of-type(2)').addEventListener('click', () => {mainMenu()})
}

function opponentGridCellClicked(e) {
    const grid = document.querySelector('div.gameboards > div.board-with-title.opponent-board > div.grid');
    const cells = Array.from(grid.children);
    const index = cells.indexOf(e.currentTarget);
    const row = Math.floor(index / 10);
    const col = index % 10;
    const coords = [col, row]

    const hit = computer.gameboard.recieveAttack(coords);
    
    if (hit) {
        e.currentTarget.textContent = 'X'
        e.currentTarget.classList.add('hit')
    } else {
        e.currentTarget.textContent = 'O'
        e.currentTarget.classList.add('miss')
    }
    e.currentTarget.classList.add('attacked')
    computerTurn()
}

function computerTurn() {
    if (determineGameOver()) {announceWinner(); return}
    document.querySelector('body > div.main-screen > div.main-content > h2.turn').textContent = `Computer is making its move`
    const [x, y] = computer.attackOpponent()
    const hit = player.gameboard.recieveAttack([x, y])

    const grid = document.querySelector('.gameboards > .board-with-title > .grid')
    const cells = Array.from(grid.children);
    const idx  = y * 10 + x
    const cell = cells[idx]
    cell.textContent = hit ? 'X' : 'O'
    cell.classList.add(hit ? 'hit' : 'miss')
    humanTurn()
}

function onOpponentClick(e) {
    opponentGridCellClicked(e);
}