import {player1, player2, numPlayers, player, setNumPlayers} from '../ui/playerName.js'
import { placeShips, setAxis, shipClicked, axisClicked } from '../ui/placeShips.js';
import { Gameboard } from "../game/gameboard.js"
import {setShipPlacedForPlayer1} from '../GameUiInteraction/shipPlacementManager.js'
import { computer } from '../actualGame/startGame.js';

export {rematch, mainMenu}

function rematch() {
    document.querySelector('.main-content').classList.remove('blur-boards')
    document.querySelector('.main-content').style.display = 'none'
    setShipPlacedForPlayer1(false)
    const grid = document.querySelector('.grid-and-ship-pallete > .grid');
    Array.from(grid.children).forEach(cell => {
        cell.style.background = '';
        cell.classList.remove('placed');
        const marker = cell.querySelector('.reposition-circle');
        if (marker) marker.remove();
    });

    document.querySelectorAll('.ship-pallete > div').forEach(div => {
        div.style.opacity = '';
        div.style.cursor  = 'pointer';
        div.querySelector('img').style.filter = '';
        div.addEventListener('click', shipClicked);
    });

    document.querySelectorAll('.axis > button').forEach(btn => {
        btn.style.background = '';
        btn.style.color      = '';
        btn.addEventListener('click', axisClicked);
    });
    setAxis();
    const xBtn = document.querySelector('.axis > .x-axis');
    xBtn.style.background = 'rgb(80, 207, 208)';
    xBtn.style.color      = 'rgb(4, 29, 33)';

    const doneBtn = document.querySelector('.done');
    doneBtn.replaceWith(doneBtn.cloneNode(true));

    if (numPlayers === 1) {
        console.log('numplayer = 1')
        player.gameboard = new Gameboard();

        document.querySelector('.place-ship-player-name').textContent = player.playerName
        console.log(player, computer)
        const endScreenDiv = document.querySelector('.end-screen')
        endScreenDiv.style.display = 'none'
        setNumPlayers(1)
        placeShips(1)
    }
    else {
        console.log('numplayer = 2')
        player1.gameboard = new Gameboard();
        player2.gameboard = new Gameboard();

        document.querySelector('.place-ship-player-name').textContent = player1.playerName
        const endScreenDiv = document.querySelector('.end-screen')
        endScreenDiv.style.display = 'none'
        setNumPlayers(2)
        placeShips(2)
    }
}

function mainMenu() {
    window.location.reload();
}
