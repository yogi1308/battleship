import { Gameboard } from "../src/script/game/gameboard";
import { Ship } from '../src/script/game/ship'

// Ship Placement
test('Test that a ship can be placed at a given coordinate.', () => {
    const ship = new Ship(3)
    const board = new Gameboard();
    board.placeShips([0, 0], 'x', ship); // horizontal placement of a ship of length 3 in x direction
    expect(board.playerOneShips).toEqual([
        [0, 0],
        [1, 0],
        [2, 0],
    ]);
});
test('Test that a ship can be placed at a given coordinate.', () => {
    const ship = new Ship(3)
    const board = new Gameboard();
    board.placeShips([0, 0], 'y', ship); // horizontal placement of a ship of length 3 in y direction
    expect(board.playerOneShips).toEqual([
        [0, 0],
        [0, 1],
        [0, 2],
    ]);
});
test('Test that multiple ships can be placed without conflict.', () => {
    const board = new Gameboard();
    const ship1 = new Ship(3);
    board.placeShips([0, 0], 'x', ship1); // Horizontal: (0,0), (1,0), (2,0)
    const ship2 = new Ship(2);
    board.placeShips([4, 1], 'y', ship2); // Vertical: (4,1), (4,2)
    expect(board.playerOneShips).toEqual([
        [0, 0],
        [1, 0],
        [2, 0],
        [4, 1],
        [4, 2],
    ]);
});
test('Test that overlapping ship placements are rejected.', () => {
    const board = new Gameboard();
    const ship1 = new Ship(3);
    board.placeShips([0, 0], 'x', ship1); // Places at (0,0), (1,0), (2,0)
    const ship2 = new Ship(2);
    // Try placing overlapping ship at (1,0), (2,0)
    const result = board.placeShips([1, 0], 'x', ship2); // Should be rejected
    expect(result).toBe(false); // Assuming your method returns false on failure
    expect(board.playerOneShips).toEqual([
        [0, 0],
        [1, 0],
        [2, 0],
    ]);
});


