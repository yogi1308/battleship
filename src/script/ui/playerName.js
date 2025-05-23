import {placeShips} from './placeShips.js'

export function enterPlayerName() {
    const playFriend = document.querySelector('.play-friend')
    const playComputer = document.querySelector('.play-computer')
    playFriend.addEventListener('click', () => displayPlayerNameForm(2))
    playComputer.addEventListener('click', () => displayPlayerNameForm(1))
}

function displayPlayerNameForm(numPlayers) {
    document.querySelector('.choose-player').style.display = 'none'
    console.log('click')
    if (numPlayers === 1) {
        const singlePlayerNameDiv = document.querySelector('.single-player-name')
        singlePlayerNameDiv.style.display = 'flex'
        singlePlayerNameDiv.querySelector('form').onsubmit = function(e) {
            e.preventDefault();
            placeShips(numPlayers);
            singlePlayerNameDiv.style.display = 'none'
        };
    }
    else if (numPlayers === 2) {
        const twoPlayerNameDiv = document.querySelector('.two-player-name')
        twoPlayerNameDiv.style.display = 'flex'
        twoPlayerNameDiv.querySelector('form').onsubmit = function(e) {
            e.preventDefault();
            placeShips(numPlayers);
            twoPlayerNameDiv.style.display = 'none'
        };
    }
}