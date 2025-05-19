import { Ship } from '../src/script/game/ship'

// ship creation 
test('Test that a ship can be created with a given length.', () => {
    const ship = new Ship(3);
    expect(ship.length).toBe(3);
})
test('Test that the initial hit count is zero.', () => {
    const ship = new Ship();
    expect(ship.damage).toBe(0);
})
test('Test that the ship is not sunk initially.', () => {
    const ship = new Ship();
    expect(ship.sunk).toBe(false);
})

// hit method
test('Test that calling hit() once increases the hit count by 1.', () => {
    const ship = new Ship();
    ship.hit()
    expect(ship.damage).toEqual(1);
})
test('Test that calling hit() multiple times increases the hit count cumulatively.', () => {
    const ship = new Ship();
    ship.hit(); ship.hit(); ship.hit()
    expect(ship.damage).toEqual(3);
})

// sink method
// Test that a ship is not sunk before receiving hits equal to its length.
test('Test that a ship is not sunk before receiving hits equal to its length.', () => {
    const ship = new Ship();
    expect(ship.sunk).toBeFalsy();
})

// Test that a ship is considered sunk after receiving hits equal to its length.
test('Test that a ship is considered sunk after receiving hits equal to its length.', () => {
    const ship = new Ship(3);
    ship.hit(); ship.hit(); ship.hit()
    expect(ship.isSunk()).toBeTruthy();
})

// Test that a ship is still considered sunk if hit() is called more than its length.
test('Test that a ship is still considered sunk if hit() is called more than its length.', () => {
    const ship = new Ship(3);
    ship.hit(); ship.hit(); ship.hit(); ship.hit()
    expect(ship.isSunk()).toBeTruthy();
})