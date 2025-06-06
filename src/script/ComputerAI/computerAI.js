import { Ship } from '../game/ship.js';
import { Gameboard } from '../game/gameboard.js';
import { computer } from '../actualGame/startGame.js';
import {player} from '../ui/playerName.js'

export class ComputerPlayer {
  constructor() {
    this.gameboard = new Gameboard();
    this.playerName = 'Computer';
    this.allShips = [];
    this.previousAttackCoords = [];
    this.random = true;
    this.foundOne = false;
    this.foundTwoContinous = false;
    this.continuousFound = 0;

    // Remember where the very first hit in a chain occurred:
    this.chainOrigin = null;
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

  attackOpponent() {
    let x, y;

    // ──────────── 1) RANDOM MODE ────────────
    if (this.random) {
      // 1a) Pick a brand-new random [x,y] that we haven't attacked yet:
      while (true) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        const already = player.gameboard.attackedCoordinates
          .some(([ax, ay]) => ax === x && ay === y);
        if (!already) break;
      }

      // 1b) Remember it & check if we hit:
      this.previousAttackCoords.push([x, y]);
      let matchFound = false;
      for (const shipEntry of player.gameboard.playerShips) {
        if (shipEntry.coordinates.some(([sx, sy]) => sx === x && sy === y)) {
          // → HIT!  switch to “foundOne” mode:
          this.random = false;
          this.foundOne = true;
          this.foundTwoContinous = false;
          this.continuousFound = 1;
          this.chainOrigin = [x, y];
          matchFound = true;
          break;
        }
      }

      if (!matchFound) {
        // → MISS: stay in “random” mode
        this.random = true;
        this.foundOne = false;
        this.foundTwoContinous = false;
        this.continuousFound = 0;
        this.chainOrigin = null;
      }

      return [x, y];
    }


    // ──────────── 2) FOUND EXACTLY ONE HIT ────────────
    else if (this.foundOne) {
      // 2a) We hit exactly one square last time. Try one of the 4 neighbors:
      const directions = ['+x', '-x', '+y', '-y'];
      const dir = directions[Math.floor(Math.random() * 4)];
      const [lastX, lastY] = this.previousAttackCoords[this.previousAttackCoords.length - 1];

      if (dir === '+x') {
        // move right (or fallback left if at edge)
        if (lastX === 9) {
          x = lastX - 1;
          y = lastY;
        } else {
          x = lastX + 1;
          y = lastY;
        }
      }
      else if (dir === '-x') {
        // move left (or fallback right if at edge)
        if (lastX === 0) {
          x = lastX + 1;
          y = lastY;
        } else {
          x = lastX - 1;
          y = lastY;
        }
      }
      else if (dir === '+y') {
        // move down (or fallback up if at edge)
        if (lastY === 9) {
          x = lastX;
          y = lastY - 1;
        } else {
          x = lastX;
          y = lastY + 1;
        }
      }
      else { // '-y'
        // move up (or fallback down if at edge)
        if (lastY === 0) {
          x = lastX;
          y = lastY + 1;
        } else {
          x = lastX;
          y = lastY - 1;
        }
      }

      // 2b) If we’ve already attacked [x,y], just recurse and pick again:
      const already = player.gameboard.attackedCoordinates
        .some(([ax, ay]) => ax === x && ay === y);
      if (already) {
        return this.attackOpponent();
      }

      // 2c) Remember it & check if we hit:
      this.previousAttackCoords.push([x, y]);
      let matchFound = false;
      for (const shipEntry of player.gameboard.playerShips) {
        if (shipEntry.coordinates.some(([sx, sy]) => sx === x && sy === y)) {
          // → second hit in a row. Switch to “foundTwoContinous”:
          this.random = false;
          this.foundOne = false;
          this.foundTwoContinous = true;
          this.continuousFound += 1; // chain length becomes 2
          matchFound = true;
          break;
        }
      }

      if (!matchFound) {
        // → MISS: revert to random
        this.random = true;
        this.foundOne = false;
        this.foundTwoContinous = false;
        this.continuousFound = 0;
        this.chainOrigin = null;
      }

      return [x, y];
    }


    // ──────────── 3) FOUND AT LEAST TWO IN A ROW ────────────
    else if (this.foundTwoContinous) {
      // 3a) We have at least two consecutive hits. Look at the last two:
      const lastIndex = this.previousAttackCoords.length - 1;
      const [lastX, lastY] = this.previousAttackCoords[lastIndex];
      const [prevX, prevY] = this.previousAttackCoords[lastIndex - 1];

      // 3b) Deduce axis: if the Y’s match ⇒ horizontal; else vertical
      const horizontal = (lastY === prevY);
      let dirSign;
      if (horizontal) {
        dirSign = (lastX > prevX ? '+x' : '-x');
      } else {
        dirSign = (lastY > prevY ? '+y' : '-y');
      }

      // 3c) Try to extend one more step in that same direction.
      if (dirSign === '+x') {
        // normally go one to the right, unless at right edge:
        if (lastX + 1 > 9) {
          // ran off right edge ⇒ flip around chainOrigin to the left
          const [origX, origY] = this.chainOrigin;
          x = origX - 1;
          y = origY;
        } else {
          x = lastX + 1;
          y = lastY;
        }
      }
      else if (dirSign === '-x') {
        if (lastX - 1 < 0) {
          // ran off left edge ⇒ flip around chainOrigin to the right
          const [origX, origY] = this.chainOrigin;
          x = origX + this.continuousFound;
          y = origY;
        } else {
          x = lastX - 1;
          y = lastY;
        }
      }
      else if (dirSign === '+y') {
        if (lastY + 1 > 9) {
          // ran off bottom edge ⇒ flip around chainOrigin upward
          const [origX, origY] = this.chainOrigin;
          x = origX;
          y = origY - 1;
        } else {
          x = lastX;
          y = lastY + 1;
        }
      }
      else { // '-y'
        if (lastY - 1 < 0) {
          // ran off top edge ⇒ flip around chainOrigin downward
          const [origX, origY] = this.chainOrigin;
          x = origX;
          y = origY + this.continuousFound;
        } else {
          x = lastX;
          y = lastY - 1;
        }
      }

      // 3d) If we’ve already attacked [x,y] (or went out of bounds), revert to random:
      const already = player.gameboard.attackedCoordinates
        .some(([ax, ay]) => ax === x && ay === y);
      if (
        already ||
        x < 0 || x > 9 ||
        y < 0 || y > 9
      ) {
        this.random = true;
        this.foundOne = false;
        this.foundTwoContinous = false;
        this.continuousFound = 0;
        this.chainOrigin = null;
        return this.attackOpponent();
      }

      // 3e) Remember it & check if we hit again:
      this.previousAttackCoords.push([x, y]);
      let matchFound = false;
      for (const shipEntry of player.gameboard.playerShips) {
        if (shipEntry.coordinates.some(([sx, sy]) => sx === x && sy === y)) {
          // → still hitting along that same ship, keep “foundTwoContinous”:
          this.random = false;
          this.foundOne = false;
          this.foundTwoContinous = true;
          this.continuousFound += 1;
          matchFound = true;
          break;
        }
      }

      if (!matchFound) {
        // → MISS: revert to random
        this.random = true;
        this.foundOne = false;
        this.foundTwoContinous = false;
        this.continuousFound = 0;
        this.chainOrigin = null;
      }

      return [x, y];
    }
  }
}
