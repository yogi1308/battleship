export class Ship {
    constructor(length) {
        this.length = length
        this.damage = 0
        this.sunk = false
    }
    hit() {
        ++this.damage;
    }
    isSunk() {
        if (this.damage >= this.length) {return true}
        return false
    }
}