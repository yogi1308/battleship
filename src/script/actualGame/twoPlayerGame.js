import {player1, player2} from '../ui/playerName.js'
import {rematch, mainMenu} from './gameOver.js'

let opponent = null
let nextTurn = null

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
    document.querySelector('.main-content').style.display = 'none'
    const endScreenDiv = document.querySelector('.end-screen')
    endScreenDiv.style.display = 'flex'
    if (player1.gameboard.checkShipsStatus()) {
        endScreenDiv.querySelector('.winner').textContent = `${player2.playerName} Wins!`
    } else {
        endScreenDiv.querySelector('.winner').textContent = `${player1.playerName} Wins!`
    }
    document.querySelector('.end-screen .end-screen-options button').addEventListener('click', () => {rematch()})
    document.querySelector('.end-screen .end-screen-options button:nth-of-type(2)').addEventListener('click', () => {mainMenu()})
}

function player1Turn() {
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

    switchScreen()
}

function onOpponentClick(e) {
    opponentGridCellClicked(e);
}

function switchScreen() {
    if (determineGameOver()) {announceWinner(); return}
    const switchDiv = document.querySelector('.switch');
    const mainContent = document.querySelector('.main-content');
    const turnLabel = switchDiv.querySelector('.turn');
    const button = switchDiv.querySelector('button');

    // Hide the main boards, show overlay
    mainContent.style.display = 'none';
    switchDiv.style.display = 'flex';

    // Decide whose turn is next
    if (opponent === player2) {
        turnLabel.textContent = `${player2.playerName}'s TURN`;
        document.querySelector('body > div.main-screen > div.switch > p:nth-child(3)').textContent = `GIVE HIM THE DEVICE AND LOOK AWAY, ${player1.playerName}!!!`
        button.textContent = `${player2.playerName}, CLICK WHEN YOU HAVE THE DEVICE`;
        nextTurn = player2Turn;
    } else {
        turnLabel.textContent = `${player1.playerName}'s TURN`;
        document.querySelector('body > div.main-screen > div.switch > p:nth-child(3)').textContent = `GIVE HIM THE DEVICE AND LOOK AWAY, ${player2.playerName}!!!`
        button.textContent = `${player1.playerName}, CLICK WHEN YOU HAVE THE DEVICE`;
        nextTurn = player1Turn;
    }
    button.replaceWith(button.cloneNode(true));
    const newBtn = switchDiv.querySelector('button');

    newBtn.addEventListener(
        'click',
        () => {
        // Hide overlay, show boards, and run the saved turn function
        switchDiv.style.display = 'none';
        mainContent.style.display = 'flex';
        if (typeof nextTurn === 'function') nextTurn();
        },
        { once: true }
    );
}