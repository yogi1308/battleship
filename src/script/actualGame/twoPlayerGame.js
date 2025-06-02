import {player1, player2} from '../ui/playerName.js'

let opponent = null

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
    console.log(player1.gameboard.missedShots, player1.gameboard.madeShots)
    console.log(player2.gameboard.missedShots, player2.gameboard.madeShots)
    opponent = player2
    let allCoords = []

    player1.gameboard.playerShips.forEach(ship => {
        ship.coordinates.forEach(coord => {allCoords.push(coord)})
    });
    const grid = document.querySelector('.gameboards > .board-with-title > .grid')
    const cells = Array.from(grid.children);
    cells.forEach(cell => {
        cell.style.background = '';
        cell.textContent = ''
        cell.classList.remove('hit');
        cell.classList.remove('miss')
    });
    allCoords.forEach(([row, col]) => {
        const index = col * 10 + row;
        const cell = cells[index];
        cell.style.backgroundColor = 'green'; 
    })
    player1.gameboard.missedShots.forEach(([x, y]) => {
        const index = y * 10 + x;
        const cell = cells[index];
        cell.textContent = 'O';
        cell.classList.add('miss');
    });
    player1.gameboard.madeShots.forEach(([x, y]) => {
        const index = y * 10 + x;
        const cell = cells[index];
        cell.textContent = 'X';
        cell.classList.add('hit');
    });

    document.querySelector('.turn').textContent = `${player1.playerName}'s Turn`

    let otherPlayerCoords = []
    player2.gameboard.playerShips.forEach(ship => {
        ship.coordinates.forEach(coord => {otherPlayerCoords.push(coord)})
    })
    const opponentGrid = document.querySelector('body > div.main-screen > div.main-content > div.gameboards > div.board-with-title.opponent-board > div.grid');
    const opponentGridCells = Array.from(opponentGrid.children);
    opponentGridCells.forEach(cell => {
        cell.style.background = '';
        cell.textContent = ''
        cell.classList.remove('attacked')
        cell.classList.remove('hit');
        cell.classList.remove('miss')
    });
    otherPlayerCoords.forEach(([row, col]) => {
        const idx  = col * 10 + row;
        const opponentGridCell = opponentGridCells[idx];
        opponentGridCell.style.backgroundColor = 'green';
    });
    player2.gameboard.missedShots.forEach(([x, y]) => {
        const index = y * 10 + x;
        const cell = opponentGridCells[index];
        cell.textContent = 'O';
        cell.classList.add('miss');
        cell.classList.add('attacked')
    });
    player2.gameboard.madeShots.forEach(([x, y]) => {
        const index = y * 10 + x;
        const cell = opponentGridCells[index];
        cell.textContent = 'X';
        cell.classList.add('hit');
        cell.classList.add('attacked')
    });

    document.querySelectorAll('div.gameboards > div.board-with-title.opponent-board > div.grid > div').forEach(cell => {cell.addEventListener('click', onOpponentClick);})
    document.querySelectorAll('div.gameboards > div.board-with-title.opponent-board > div.grid > div.attacked').forEach(cell => {cell.removeEventListener('click', onOpponentClick)})
}

function player2Turn() {
    if (determineGameOver()) {announceWinner(); return}
    console.log(player1.gameboard.missedShots, player1.gameboard.madeShots)
    console.log(player2.gameboard.missedShots, player2.gameboard.madeShots)
    opponent = player1
    let allCoords = []
    player2.gameboard.playerShips.forEach(ship => {
        ship.coordinates.forEach(coord => {allCoords.push(coord)})
    });
    const grid = document.querySelector('.gameboards > .board-with-title > .grid')
    const cells = Array.from(grid.children);
    cells.forEach(cell => {
        cell.style.background = '';
        cell.textContent = ''
        cell.classList.remove('hit');
        cell.classList.remove('miss')
    });
    allCoords.forEach(([row, col]) => {
        const index = col * 10 + row;
        const cell = cells[index];
        cell.style.backgroundColor = 'green'; 
    })
    player2.gameboard.missedShots.forEach(([x, y]) => {
        const index = y * 10 + x;
        const cell = cells[index];
        cell.textContent = 'O';
        cell.classList.add('miss');
    });
    player2.gameboard.madeShots.forEach(([x, y]) => {
        const index = y * 10 + x;
        const cell = cells[index];
        cell.textContent = 'X';
        cell.classList.add('hit');
    });

    document.querySelector('.turn').textContent = `${player2.playerName}'s Turn`

    let otherPlayerCoords = []
    player1.gameboard.playerShips.forEach(ship => {
        ship.coordinates.forEach(coord => {otherPlayerCoords.push(coord)})
    })
    const opponentGrid = document.querySelector('body > div.main-screen > div.main-content > div.gameboards > div.board-with-title.opponent-board > div.grid');
    const opponentGridCells = Array.from(opponentGrid.children);
    opponentGridCells.forEach(cell => {
        cell.style.background = '';
        cell.textContent = ''
        cell.classList.remove('attacked')
        cell.classList.remove('hit');
        cell.classList.remove('miss')
    });
    otherPlayerCoords.forEach(([row, col]) => {
        const idx  = col * 10 + row;
        const opponentGridCell = opponentGridCells[idx];
        opponentGridCell.style.backgroundColor = 'green';
    });
    player1.gameboard.missedShots.forEach(([x, y]) => {
        const index = y * 10 + x;
        const cell = opponentGridCells[index];
        cell.textContent = 'O';
        cell.classList.add('miss');
        cell.classList.add('attacked')
    });
    player1.gameboard.madeShots.forEach(([x, y]) => {
        const index = y * 10 + x;
        const cell = opponentGridCells[index];
        cell.textContent = 'X';
        cell.classList.add('hit');
        cell.classList.add('attacked')
    });

    document.querySelectorAll('div.gameboards > div.board-with-title.opponent-board > div.grid > div').forEach(cell => {cell.addEventListener('click', onOpponentClick);})
    document.querySelectorAll('div.gameboards > div.board-with-title.opponent-board > div.grid > div.attacked').forEach(cell => {cell.removeEventListener('click', onOpponentClick)})
}

function opponentGridCellClicked(e) {
    const grid = document.querySelector('div.gameboards > div.board-with-title.opponent-board > div.grid');
    const cells = Array.from(grid.children);
    const index = cells.indexOf(e.currentTarget);
    const row = Math.floor(index / 10);
    const col = index % 10;
    const coords = [col, row]

    const hit = opponent.gameboard.recieveAttack(coords);

    if (opponent === player2) {
        player2Turn()
    }
    else {player1Turn()}
}

function onOpponentClick(e) {
    opponentGridCellClicked(e);
}