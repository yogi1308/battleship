import { numPlayers, player, player1, player2 } from '../ui/playerName.js'

export {startGame}

function startGame() {
    let allCoords = []
    document.querySelector('.place-ships').style.display = 'none'
    document.querySelector('.main-content').style.display = 'flex'
    player.gameboard.playerShips.forEach(ship => {
        console.log(ship.coordinates)
        ship.coordinates.forEach(coord => {allCoords.push(coord)})
    });
    const grid = document.querySelector('.gameboards > .board-with-title > .grid')
    const cells = Array.from(grid.children);
    console.log(allCoords)
    allCoords.forEach(([row, col]) => {
        const index = col * 10 + row;
        const cell = cells[index];
        cell.style.backgroundColor = 'green'; 
    })
}