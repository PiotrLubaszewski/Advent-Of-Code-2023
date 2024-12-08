const fs = require('fs');

const readData = (fileName) => {
    const data = fs.readFileSync(fileName, 'utf-8').split('\n');
    return data.map(line => line.split(''));
};

const findGuard = (map) => {
    let guard = null;
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if ('^v<>'.includes(map[y][x])) {
                guard = { x, y, direction: map[y][x] };
                map[y][x] = '.'; 
                break;
            }
        }
        if (guard) break;
    }
    return guard;
};

const getNextPosition = (guard) => {
    switch (guard.direction) {
        case '^': return { x: 0, y: -1 };
        case '>': return { x: 1, y: 0 };
        case 'v': return { x: 0, y: 1 };
        case '<': return { x: -1, y: 0 };
        default: return { x: 0, y: 0 };
    }
};

const moveGuard = (map, guard) => {
    const nextPosition = getNextPosition(guard);
    const newX = guard.x + nextPosition.x;
    const newY = guard.y + nextPosition.y;

    if (newX < 0 || newY < 0 || newY >= map.length || newX >= map[newY].length) {
        return { guard, outOfBounds: true };
    }

    if (map[newY][newX] !== '#') {
        guard.x = newX;
        guard.y = newY;
        return { guard, outOfBounds: false };
    }

    guard.direction = changeDirection(guard.direction);
    return { guard, outOfBounds: false };
};

const changeDirection = (currentDirection) => {
    switch (currentDirection) {
        case '^': return '>'; 
        case '>': return 'v';
        case 'v': return '<';
        case '<': return '^';
        default: return currentDirection;
    }
};

const simulateGuard = (fileName) => {
    let map = readData(fileName);
    let guard = findGuard(map);
    let visited = new Set();
    visited.add(`${guard.x},${guard.y}`);

    let outOfBounds = false;
    let steps = 0;

    while (!outOfBounds) {
        const result = moveGuard(map, guard);
        guard = result.guard;
        outOfBounds = result.outOfBounds;

        if (!outOfBounds) {
            visited.add(`${guard.x},${guard.y}`);
        }

        steps++;
    }

    console.log(`Strażnik odwiedził ${visited.size} unikalnych pozycji.`);
};

simulateGuard('data/day6.txt');
