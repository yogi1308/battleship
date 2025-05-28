import { Ship } from '../game/ship.js';
import { Gameboard } from '../game/gameboard.js';

export class ComputerPlayer {
  constructor() {
    this.gameboard = new Gameboard();
    this.playerName = 'Computer';
    this.allShips = [];
  }

  createComputerShips() {
    this.allShips.push(new Ship(5, 'Carrier'));
    this.allShips.push(new Ship(4, 'Battleship'));
    this.allShips.push(new Ship(3, 'Cruiser'));
    this.allShips.push(new Ship(3, 'Submarine'));
    this.allShips.push(new Ship(2, 'Destroyer'));
  }

  placeComputerShips() {
    for (const ship of this.allShips) {
      let placed = false;

      while (!placed) {
        // 1) pick random origin and axis
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const dir = Math.random() < 0.5 ? 'x' : 'y';

        // 2) generate its would-be coordinates
        const coords = [];
        for (let i = 0; i < ship.length; i++) {
          const nx = dir === 'x' ? x + i : x;
          const ny = dir === 'y' ? y + i : y;
          coords.push([nx, ny]);
        }

        // 3) bounds check
        if (coords.some(([nx, ny]) => nx < 0 || nx >= 10 || ny < 0 || ny >= 10)) {
          continue;
        }

        // 4) overlap check (no coordinate may already be taken)
        const overlaps = this.gameboard.playerShips.some(existing =>
          existing.coordinates.some(([ex, ey]) =>
            coords.some(([nx, ny]) => nx === ex && ny === ey)
          )
        );
        if (overlaps) continue;

        // 5) adjacency check: no new cell may sit within 1 of any existing ship cell
        const tooClose = this.gameboard.playerShips.some(existing =>
          existing.coordinates.some(([ex, ey]) =>
            coords.some(([nx, ny]) =>
              Math.abs(nx - ex) <= 1 && Math.abs(ny - ey) <= 1
            )
          )
        );
        if (tooClose) continue;

        // 6) if we passed all checks, actually place it
        placed = this.gameboard.placeShips([x, y], dir, ship);
      }
    }
  }
}
