import { Ship } from './ship.js'
export class Gameboard {
    constructor() {
        this.playerOneShips = []
        this.playerOneMissedShots = []
    }
    placeShips(start, dir, ship) {
        let newCoords = []
        let canBePlaced = true 
        for (let i = 0; i < ship.length; ++i) {
            if (dir === 'x') {
                newCoords.push([start[0] + i, start[1]])
            }
            else {
                newCoords.push([start[0], start[1] + i])
            }
        }
        newCoords.forEach(coord => {
            if (this.playerOneShips.some(existing => existing[0] === coord[0] && existing[1] === coord[1])) {
                canBePlaced = false;
            }
        });
        if (canBePlaced) {
            newCoords.forEach(coord => {
                this.playerOneShips.push(coord)
            });
        }
        return canBePlaced
    }

    recieveAttack() {

    }
}