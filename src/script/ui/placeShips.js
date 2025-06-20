import {displayShips} from '../GameUiInteraction/shipPlacementManager.js'
import { player1, player2 } from './playerName.js';

export {placeShips, selectedAxis, selectedShip, selectedShipLength, setShipAndLength, setShipAndLengthImg, shipClicked, axisClicked, setAxis}

displayShips()

let selectedAxis = 'x';
let selectedShip = null;
let selectedShipLength = null;
let selectedShipEvent = null

function setAxis() {
    selectedAxis = 'x'
}

function placeShips(numPlayers) {
    if (numPlayers === 1) {
        document.querySelector('.player-name').style.display = 'none'
        const placeShips = document.querySelector('.place-ships')
        placeShips.style.display = 'flex';
        document.querySelector('.axis > .x-axis').style.color = 'rgb(4, 29, 33)'
        document.querySelector('.axis > .x-axis').style.background = 'rgb(80, 207, 208)';
        document.querySelector('.place-ship-player-name').textContent = document.querySelector('.player-name-input').value
        document.querySelectorAll('.ship-pallete > div').forEach(div => {
            div.addEventListener('click', shipClicked);
        });
        document.querySelectorAll('.axis > button').forEach(button => {
            button.addEventListener('click', axisClicked);
        });
    }
    else {
        const placeShips = document.querySelector('.place-ships')
        document.querySelector('.player-name').style.display = 'none'
        placeShips.style.display = 'flex';
        document.querySelector('.axis > .x-axis').style.color = 'rgb(4, 29, 33)'
        document.querySelector('.axis > .x-axis').style.background = 'rgb(80, 207, 208)';
        document.querySelector('.place-ship-player-name').textContent = player1.playerName
        document.querySelectorAll('.ship-pallete > div').forEach(div => {
            div.addEventListener('click', shipClicked);
        });
        document.querySelectorAll('.axis > button').forEach(button => {
            button.addEventListener('click', axisClicked);
        });
    }
}

function shipClicked(event) {
    document.querySelectorAll('.ship-pallete img').forEach(img => {
        img.style.filter = ''; // reset others
    });
    const img = event.currentTarget.querySelector('img');
    img.style.filter = 'brightness(0) invert(1)';
    determineShipAndLength(event)
}

function axisClicked(event) {
    document.querySelectorAll('.axis > button').forEach(button => {
        button.style.background = ''; // reset others
        button.style.color = ''
    });
    const button = event.currentTarget;
    button.style.background = 'rgb(80, 207, 208)';
    button.style.color = 'rgb(4, 29, 33)'
    if (event.currentTarget.textContent === 'X-AXIS') {selectedAxis = 'x'}
    else {selectedAxis = 'y'}
}

function determineShipAndLength(event) {
    const pElement = event.currentTarget.querySelector('p').textContent
    switch (pElement) {
        case 'Carrier (5 spaces)' :
            selectedShip = 'Carrier'
            selectedShipLength = 5
            break;
        case 'Battleship (4 spaces)':
            selectedShip = 'Battleship'
            selectedShipLength = 4;
            break
        case 'Cruiser (3 spaces)' :
            selectedShip = 'Cruiser'
            selectedShipLength = 3
            break;
        case 'Submarine (3 spaces)':
            selectedShip = 'Submarine'
            selectedShipLength = 3
            break
        case 'Destroyer (2 spaces)' :
            selectedShip = 'Destroyer'
            selectedShipLength = 2
            break;
    }
    selectedShipEvent = event.currentTarget
}

function setShipAndLength(ship = null, length = null) {
    selectedShip = ship;
    selectedShipLength = length
}

function setShipAndLengthImg(name = null) {
    if (!selectedShipEvent) return;
    if (name === null) {
        selectedShipEvent.style.opacity = '0.5';
        selectedShipEvent.style.cursor = 'default';
        selectedShipEvent.querySelector('img').style.filter = ''
        selectedShipEvent.removeEventListener('click', shipClicked);
    }
    else {
        const shipPallete = document.querySelectorAll('.ship-pallete > div > p')
        let restoredShip = null
        shipPallete.forEach(ship => {
            if (ship.textContent.split(" ", 1).toString() === name) {
                restoredShip = ship.closest('div')
                restoredShip.style.opacity = '';
                restoredShip.style.cursor = 'pointer';
                restoredShip.addEventListener('click', shipClicked);
            }
        })

    }
}