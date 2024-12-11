const fs = require('fs');

const readData = (fileName) => {
  const data = fs.readFileSync(fileName, 'utf-8').split('\n');
  return data.map((line) => line.split(''));
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

const getNextPosition = (direction) => {
  const positions = {
    '^': { x: 0, y: -1 },
    '>': { x: 1, y: 0 },
    v: { x: 0, y: 1 },
    '<': { x: -1, y: 0 },
  };

  return positions[direction];
};

const changeDirection = (currentDirection) => {
  const changed = {
    '^': '>',
    '>': 'v',
    v: '<',
    '<': '^',
  };
  return changed[currentDirection];
};

const moveGuard = (map, guard) => {
  const nextPosition = getNextPosition(guard.direction);
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

const main = () => {
  let map = readData('data/day6.txt');
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

  console.log(visited.size);
};

main();
