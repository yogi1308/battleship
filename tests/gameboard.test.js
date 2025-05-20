import { Gameboard } from "../src/script/game/gameboard";
import { Ship } from '../src/script/game/ship'

// Ship Placement
test('Test that a ship can be placed at a given coordinate.', () => {
    const ship = new Ship(3)
    const board = new Gameboard();
    board.placeShips([0, 0], 'x', ship); // horizontal placement of a ship of length 3
    expect(board.playerShips).toEqual([{
        playerShip: ship,
        coordinates: [[0,0], [1,0], [2,0]]
    }])
});
test('Test that a ship can be placed at a given coordinate.', () => {
    const ship = new Ship(3)
    const board = new Gameboard();
    board.placeShips([0, 0], 'y', ship); // vertical placement of a ship of length 3
    expect(board.playerShips).toEqual([{
        playerShip: ship,
        coordinates: [[0, 0],[0, 1],[0, 2]]
    }])
});
test('Test that multiple ships can be placed', () => {
    const ship1 = new Ship(3);
    const board = new Gameboard();
    board.placeShips([0, 0], 'x', ship1);
    const ship2 = new Ship(2);
    board.placeShips([0, 1], 'x', ship2);
    expect(board.playerShips).toEqual([{
        playerShip: ship1,
        coordinates: [[0, 0],[1, 0],[2, 0]]
    },
    {playerShip: ship2, coordinates: [[0, 1],[1, 1]]}
    ])
});
test('Test that overlapping ship placements are rejected.', () => {
    const board = new Gameboard();
    const ship1 = new Ship(3);
    board.placeShips([0, 2], 'x', ship1);
    const ship2 = new Ship(2);
    const result = board.placeShips([0, 1], 'y', ship2);
    expect(result).toBe(false); 
    expect(board.playerShips).toEqual([{
        playerShip: ship1,
        coordinates: [[0, 2],[1, 2],[2, 2]]
    }])
});

// Attack Handling
test('Test that a hit is registered when attacking a coordinate that contains a ship.', () => {
    const board = new Gameboard();
    const ship1 = new Ship(3);
    board.placeShips([0, 0], 'x', ship1)
    board.recieveAttack([0, 0])
    expect(ship1.damage).toEqual(1)
});
test('Test that a miss is recorded when attacking an empty coordinate.', () => {
    const board = new Gameboard();
    const ship1 = new Ship(3);
    board.placeShips([0, 0], 'x', ship1)
    board.recieveAttack([4, 0])
    expect(ship1.damage).toEqual(0)
})
test(`Test that attacking the same coordinate twice doesn't do anything or is properly handled.`, () => {
    const board = new Gameboard();
    const ship1 = new Ship(3);
    board.placeShips([0, 0], 'x', ship1)
    board.recieveAttack([0, 0])
    board.recieveAttack([0, 0])
    expect(ship1.damage).toEqual(1)
})

// Ship Sinking and Game End
test('Test that the board correctly identifies when all ships are sunk.', () => {
    const board = new Gameboard();
    const ship1 = new Ship(3);
    board.placeShips([0, 0], 'x', ship1)
    board.recieveAttack([0, 0])
    board.recieveAttack([1, 0])
    board.recieveAttack([2, 0])
    expect(board.checkShipsStatus).toBeTruthy()
})
test('Test that the board reports ships are not all sunk if at least one is still afloat.', () => {
    const board = new Gameboard();
    const ship1 = new Ship(3);
    board.placeShips([0, 0], 'x', ship1)
    board.recieveAttack([0, 0])
    board.recieveAttack([1, 0])
    board.recieveAttack([2, 0])
    const ship2 = new Ship(3);
    board.placeShips([0, 1], 'x', ship1)
    expect(board.checkShipsStatus).toBeTruthy()
})

