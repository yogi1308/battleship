export class Gameboard {
    constructor() {
        this.playerShips = []
        this.missedShots = []
        this.madeShots = []
        this.attackedCoordinates = [] // all shots
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
        for (let coord of newCoords) {
            for (let ship of this.playerShips) {
                if (ship.coordinates.some(existing => existing[0] === coord[0] && existing[1] === coord[1])) {
                    canBePlaced = false;
                    break;
                }
            }
            if (!canBePlaced) break;
        }
        if (canBePlaced) {
            let shipAndCoords = {playerShip: ship, coordinates: []}
            newCoords.forEach(coord => {
                shipAndCoords.coordinates.push(coord)
            });
            this.playerShips.push(shipAndCoords)
        }
        return canBePlaced
    }
    recieveAttack(attackedCoord) {
        if (this.attackedCoordinates.some((existing => existing[0] === attackedCoord[0] && existing[1] === attackedCoord[1]))) {return}
        let hit = false
        for (let ship of this.playerShips) {
            if (ship.coordinates.some(existing => existing[0] === attackedCoord[0] && existing[1] === attackedCoord[1])) {
                ship.playerShip.hit()
                this.madeShots.push(attackedCoord)
                hit = true
                break;
            }
            if (hit) break
        }
        this.attackedCoordinates.push(attackedCoord)
        if (!hit) {this.missedShots.push(attackedCoord)}
    }
    checkShipsStatus() {
        let allSunk = true
        for (let ship of this.playerShips) {
            if (!ship.isSunk()) {allSunk = false; break}
        }
        return allSunk
    }
}