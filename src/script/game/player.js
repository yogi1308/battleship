import { Gameboard } from "./gameboard.js"
export class Player {
    constructor(player) {
        this.gameboard = new Gameboard()
        this.playerName = player
    }
}