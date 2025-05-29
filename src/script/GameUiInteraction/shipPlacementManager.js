import {Ship} from '../game/ship.js'
import { numPlayers, player, player1, player2 } from '../ui/playerName.js'
import {selectedAxis, selectedShip, selectedShipLength, setShipAndLength, setShipAndLengthImg} from '../ui/placeShips.js'
import {startSinglePlayerGame} from '../actualGame/startGame.js'

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
        if (!cell.classList.contains('placed')) {
            cell.style.backgroundColor = isOutOfBounds ? 'rgba(255, 0, 0, 0.5)' : 'rgba(80, 207, 208, 0.5)';
        }
    });
}

function mouseLeave(e) { 
    document.querySelectorAll('.grid-and-ship-pallete > .grid > div').forEach(div => {
        if (!div.classList.contains('placed')) {div.style.background = ''}
    })
}

function mouseClick(e) {
    const grid = document.querySelector('.grid-and-ship-pallete > .grid');
    const cells = Array.from(grid.children);
    const index = cells.indexOf(e.currentTarget);
    const row = Math.floor(index / 10);
    const col = index % 10;

    const start = [col, row]; 
    if (numPlayers === 1) {
        const ship = new Ship(selectedShipLength, selectedShip); 
        const canBePlaced = player.gameboard.placeShips(start, selectedAxis, ship); 

        if (canBePlaced) {
            let cellsToHighlight = [];
            for (let i = 0; i < selectedShipLength; i++) {
                let r = row;
                let c = col;
                if (selectedAxis === 'x') c += i;
                else r += i;

                const targetIndex = r * 10 + c;
                cellsToHighlight.push(cells[targetIndex]);
            }

            cellsToHighlight.forEach(cell => {
                cell.style.background = 'green';
                cell.classList.add('placed');
            });
            setShipAndLength()
            setShipAndLengthImg()
            if (player.gameboard.playerShips.length === 5) {
                const doneBtn = document.querySelector('.done');
                doneBtn.style.cursor = 'pointer'
                doneBtn.replaceWith(doneBtn.cloneNode(true));
                const newDone = document.querySelector('.done');
                newDone.addEventListener('click', () => startSinglePlayerGame());
            }
            const circle = document.createElement('div');
            circle.classList.add('reposition-circle');
            circle.addEventListener('click', e => {
                e.stopPropagation();   // ← prevent the grid‐cell click
                deleteShip(e);
            });
            if (cellsToHighlight[0]) {
                cellsToHighlight[0].appendChild(circle);
            }
        }
    }
}

function deleteShip(e) {
    const grid = document.querySelector('.grid-and-ship-pallete > .grid');
    const cells = Array.from(grid.children);
    const index = cells.indexOf(e.currentTarget.parentElement); // <div> containing circle
    const row = Math.floor(index / 10);
    const col = index % 10;

    const arrIndex = player.gameboard.playerShips.findIndex(ship =>
        ship.coordinates[0][0] == col && ship.coordinates[0][1] == row
    );

    const ship = player.gameboard.playerShips[arrIndex];
    player.gameboard.playerShips = player.gameboard.playerShips.filter((_, i) => i !== arrIndex);

    ship.coordinates.forEach(([r, c]) => {
        const targetIndex = c * 10 + r;
        const cell = cells[targetIndex];
        cell.classList.remove('placed');
        cell.style.background = '';
        const marker = cell.querySelector('.reposition-circle');
        if (marker) marker.remove();
    });
    console.log(ship.playerShip.name, ship.playerShip.length)
    setShipAndLengthImg(ship.playerShip.name)
}
