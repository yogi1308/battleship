import {Ship} from '../game/ship.js'
import { numPlayers, player, player1, player2 } from '../ui/playerName.js'
import {selectedAxis, selectedShip, selectedShipLength} from '../ui/placeShips.js'

export {displayShips}

function displayShips() {
    document.querySelectorAll('.grid-and-ship-pallete > .grid > div').forEach(div => {
        div.addEventListener('mouseover', mouseEnter);
        div.addEventListener('mouseout', mouseLeave);
        div.addEventListener('click', mouseClick)
    });

}

function mouseEnter(e) {
    if (!selectedShip || selectedShipLength == null || !selectedAxis) return;

    const grid = document.querySelector('.grid-and-ship-pallete > .grid');
    const cells = Array.from(grid.children);
    const index = cells.indexOf(e.currentTarget);
    const row = Math.floor(index / 10);
    const col = index % 10;

    let cellsToHighlight = [];
    let isOutOfBounds = false;

    for (let i = 0; i < selectedShipLength; i++) {
        let r = row;
        let c = col;
        if (selectedAxis === 'x') c += i;
        else r += i;

        if (r >= 10 || c >= 10) {
            isOutOfBounds = true;
            break;
        }

        const targetIndex = r * 10 + c;
        cellsToHighlight.push(cells[targetIndex]);
    }

    cellsToHighlight.forEach(cell => {
        cell.style.backgroundColor = isOutOfBounds ? 'rgba(255, 0, 0, 0.5)' : 'rgba(80, 207, 208, 0.5)';
    });
}

function mouseLeave(e) {
    // Clear *all* hover previews
    document.querySelectorAll('.grid-and-ship-pallete > .grid > div').forEach(div => {
        div.style.background = '';
    });
}

function mouseClick(e) {
    
}