import {placeShips} from './placeShips.js'
import {Player} from '../game/player.js'

export {enterPlayerName, player, player1, player2, numPlayers}

let player = null;
let player1 = null;
let player2 = null;
let numPlayers = 0;

function enterPlayerName() {
    const playFriend = document.querySelector('.play-friend')
    const playComputer = document.querySelector('.play-computer')
    playFriend.addEventListener('click', () => displayPlayerNameForm(numPlayers = 2))
    playComputer.addEventListener('click', () => displayPlayerNameForm(numPlayers = 1))
}

function displayPlayerNameForm(numPlayers) {
    document.querySelector('.choose-player').style.display = 'none'
    console.log('click')
    if (numPlayers === 1) {
        const singlePlayerNameDiv = document.querySelector('.single-player-name')
        singlePlayerNameDiv.style.display = 'flex'
        singlePlayerNameDiv.querySelector('form').onsubmit = function(e) {
            player = new Player(document.querySelector('.single-player-name > form > input').value)
            e.preventDefault();
            placeShips(numPlayers);
            singlePlayerNameDiv.style.display = 'none'
        };
    }
    else if (numPlayers === 2) {
        const twoPlayerNameDiv = document.querySelector('.two-player-name')
        twoPlayerNameDiv.style.display = 'flex'
        twoPlayerNameDiv.querySelector('form').onsubmit = function(e) {
            player1 = new Player(document.querySelector('.two-player-name > form').children[1].value)
            player2 = new Player(document.querySelector('.two-player-name > form').children[2].value)
            e.preventDefault();
            placeShips(numPlayers);
            twoPlayerNameDiv.style.display = 'none'
        };
    }
}