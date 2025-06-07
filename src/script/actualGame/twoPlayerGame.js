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
    document.querySelector('.main-content').classList.add('blur-boards')
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
    // otherPlayerCoords.forEach(([row, col]) => {
    //     const idx  = col * 10 + row;
    //     const opponentGridCell = opponentGridCells[idx];
    //     opponentGridCell.style.backgroundColor = 'green';
    // });
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
    // otherPlayerCoords.forEach(([row, col]) => {
    //     const idx  = col * 10 + row;
    //     const opponentGridCell = opponentGridCells[idx];
    //     opponentGridCell.style.backgroundColor = 'green';
    // });
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

async function opponentGridCellClicked(e) {
    document.querySelectorAll('div.gameboards > div.board-with-title.opponent-board > div.grid > div').forEach(cell => {cell.removeEventListener('click', onOpponentClick)})
    const grid = document.querySelector('div.gameboards > div.board-with-title.opponent-board > div.grid');
    const cells = Array.from(grid.children);
    const index = cells.indexOf(e.currentTarget);
    const row = Math.floor(index / 10);
    const col = index % 10;
    const coords = [col, row]
    const cell = e.currentTarget;
    const turnHeading = document.querySelector("body > div.main-screen > div.main-content > h2.turn");

    const hit = opponent.gameboard.recieveAttack(coords);

    if (hit) {
        cell.textContent = 'X'
        cell.classList.add('hit')
    } else {
        cell.textContent = 'O'
        cell.classList.add('miss')
    }
    cell.classList.add('glow');

    if (!hit) {await typeText(turnHeading, `It was a miss`, 50)}
    else {await typeText(turnHeading, `It hit one of the ships`, 50)}
    cell.classList.remove('glow')
    await new Promise((r) => setTimeout(r, 1000));

    switchScreen(hit, coords)
}

function onOpponentClick(e) {
    opponentGridCellClicked(e);
}

async function switchScreen(hit, coords) {
    if (determineGameOver()) {announceWinner(); return}
    const turnHeading = document.querySelector("body > div.main-screen > div.main-content > h2.turn");
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
        async () => {
        // Hide overlay, show boards again
        switchDiv.style.display = 'none';
        mainContent.style.display = 'flex';
        const grid = document.querySelector('.gameboards > .board-with-title > .grid')
        const cells = Array.from(grid.children);
        const idx  = coords[1] * 10 + coords[0]
        const cell = cells[idx]
    
        // Finally invoke the nextTurn function
        if (typeof nextTurn === 'function') {
            nextTurn();
        }

        const opponentGrid = document.querySelector('div.gameboards > div.board-with-title.opponent-board > div.grid');
        const opponentCells = Array.from(opponentGrid.children);
        opponentCells.forEach(cell => {
            cell.removeEventListener('click', onOpponentClick)
            cell.style.cursor = 'default'
        })
        // Type out “X attacked” depending on which turn function is next
        if (nextTurn === player1Turn) {
            cell.classList.add('glow');
            await typeText(turnHeading, `${player2.playerName} attacked`, 50);
            cell.classList.remove('glow');
        } else {
            cell.classList.add('glow');
            await typeText(turnHeading, `${player1.playerName} attacked`, 50);
            cell.classList.remove('glow');
        }
        await new Promise((r) => setTimeout(r, 200));
        if (!hit) {cell.classList.add('glow'); await typeText(turnHeading, `It was a miss`, 50); cell.classList.remove('glow');}
        else {cell.classList.add('glow'); await typeText(turnHeading, `It hit one of your ships`, 50); cell.classList.remove('glow');}
        await new Promise((r) => setTimeout(r, 200)); 
        {cell.classList.add('glow'); await typeText(turnHeading, `It's your turn now`, 50); cell.classList.remove('glow');}
        await new Promise((r) => setTimeout(r, 200)); 
        if (nextTurn === player1Turn) {
            cell.classList.add('glow');
            await typeText(turnHeading, `Place your attack carefully, ${player1.playerName}`, 50);
            cell.classList.remove('glow');
        } else {
            cell.classList.add('glow');
            await typeText(turnHeading, `Place your attack carefully, ${player2.playerName}`, 50);
            cell.classList.remove('glow');
        }

        cell.classList.add('glow');
        setTimeout(() => {
            cell.classList.remove('glow');
        }, 300);
        opponentCells.forEach(cell => {
            cell.addEventListener('click', onOpponentClick)
            cell.style.cursor = 'pointer'
        })
        document.querySelectorAll('div.gameboards > div.board-with-title.opponent-board > div.grid > div.attacked').forEach(cell => {cell.removeEventListener('click', onOpponentClick); cell.style.cursor = 'default'})
        },
        { once: true }
    );
}

function typeText(containerElement, fullText, letterDelay = 50) {
  return new Promise((resolve) => {
    containerElement.textContent = ""; // start empty
    let i = 0;

    function _typeNext() {
      if (i < fullText.length) {
        containerElement.textContent += fullText[i++];
        setTimeout(_typeNext, letterDelay);
      } else {
        resolve();
      }
    }

    _typeNext();
  });
}