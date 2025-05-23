export function placeShips(numPlayers) {
    if (numPlayers === 1) {
        document.querySelector('.player-name').style.display = 'none'
        const placeShips = document.querySelector('.place-ships')
        placeShips.style.display = 'flex';
        placeShips.querySelector('.done').style.width = (document.querySelector('div.place-ships > div.grid').offsetWidth) + 'px';
        document.querySelector('.place-ship-player-name').textContent = document.querySelector('.player-name-input').value
    }
    else {
        const placeShips = document.querySelector('.place-ships')
        document.querySelector('.player-name').style.display = 'none'
        placeShips.style.display = 'flex';
        placeShips.querySelector('.done').style.width = (document.querySelector('div.place-ships > div.grid').offsetWidth) + 'px';
        document.querySelector('.place-ship-player-name').textContent = document.querySelector('.player-name-one-input').value
        placeShips.querySelector('.done').addEventListener('click', () => document.querySelector('.place-ship-player-name').textContent = document.querySelector('.player-name-two-input').value)
    }
}
