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


async function humanTurn() {
    if (determineGameOver()) {announceWinner(); return}
    const turnHeading = document.querySelector("body > div.main-screen > div.main-content > h2.turn");
    await typeText(turnHeading, "Your Turn", 75);
    const opponentGrid = document.querySelectorAll('div.gameboards > div.board-with-title.opponent-board > div.grid > div');
    opponentGrid.forEach(cell => {
        cell.addEventListener('click', onOpponentClick);
        cell.style.cursor = 'pointer'
    })
    document.querySelectorAll('div.gameboards > div.board-with-title.opponent-board > div.grid > div.attacked').forEach(cell => {cell.removeEventListener('click', onOpponentClick); cell.style.cursor = 'default'})
}

function announceWinner() {
    document.querySelector('.main-content').style.display = 'none'
    const endScreenDiv = document.querySelector('.end-screen')
    endScreenDiv.style.display = 'flex'
    if (player.gameboard.checkShipsStatus()) {
        endScreenDiv.querySelector('.winner').textContent = `Computer Wins!`
    } else {
        endScreenDiv.querySelector('.winner').textContent = `You Won!`
    }
    document.querySelector('.end-screen .end-screen-options button').addEventListener('click', () => {rematch()})
    document.querySelector('.end-screen .end-screen-options button:nth-of-type(2)').addEventListener('click', () => {mainMenu()})
}

async function opponentGridCellClicked(e) {
    const grid = document.querySelector('div.gameboards > div.board-with-title.opponent-board > div.grid');
    const cells = Array.from(grid.children);
    const index = cells.indexOf(e.currentTarget);
    const row = Math.floor(index / 10);
    const col = index % 10;
    const coords = [col, row]
    const cell = e.currentTarget;

    const turnHeading = document.querySelector("body > div.main-screen > div.main-content > h2.turn");

    const hit = computer.gameboard.recieveAttack(coords);
    
    if (hit) {
        cell.textContent = 'X'
        cell.classList.add('hit')
    } else {
        cell.textContent = 'O'
        cell.classList.add('miss')
    }
    cell.classList.add('glow');

    await typeText(turnHeading, hit ? "It's a Hit!!!" : "It's a Miss!!!", 75);
    await new Promise((r) => setTimeout(r, 300));

    // 4) Remove “glow” after 300ms so the animation can replay next time:
    setTimeout(() => {
        cell.classList.remove('glow');
    }, 300);
    cell.classList.add('attacked')
    computerTurn()
}

async function computerTurn() {
    if (determineGameOver()) {announceWinner(); return}
    const turnHeading = document.querySelector("body > div.main-screen > div.main-content > h2.turn");

    const opponentGrid = document.querySelector('div.gameboards > div.board-with-title.opponent-board > div.grid');
    const opponentCells = Array.from(opponentGrid.children);
    opponentCells.forEach(cell => {
        cell.removeEventListener('click', onOpponentClick)
        cell.style.cursor = 'default'
    })


    // 3. “Type out” the two lines in sequence:
    await typeText(turnHeading, "Computer is Attacking...", 75);

    // 4. After our typing is done, wait a moment so the user can read “…Attacking…”
    await new Promise((r) => setTimeout(r, 400));

    const [x, y] = computer.attackOpponent()
    const hit = player.gameboard.recieveAttack([x, y])

    const grid = document.querySelector('.gameboards > .board-with-title > .grid')
    const cells = Array.from(grid.children);
    const idx  = y * 10 + x
    const cell = cells[idx]
    cell.textContent = hit ? 'X' : 'O'
    cell.classList.add(hit ? 'hit' : 'miss')
    cell.classList.add('glow');

    await typeText(turnHeading, hit ? "It's a Hit!!!" : "It's a Miss!!!", 75);
      // 4) Remove “glow” after 300ms so the animation can replay next time:
    setTimeout(() => {
        cell.classList.remove('glow');
    }, 300);

    // 8. Finally, after a short delay, return control to `humanTurn()`:
    setTimeout(() => {
        humanTurn();
    }, 1000);
}

function onOpponentClick(e) {
    opponentGridCellClicked(e);
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