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

const detectInfiniteLoop = (grid, startX, startY, startDirection) => {
  const rows = grid.length;
  const cols = grid[0].length;

  let x = startX;
  let y = startY;
  let direction = startDirection;

  const visited = new Set();

  while (true) {
    const state = `${x},${y},${direction}`;

    if (visited.has(state)) {
      return true;
    }

    visited.add(state);

    const nextX = x + getNextPosition(direction).x;
    const nextY = y + getNextPosition(direction).y;

    if (nextX < 0 || nextX >= rows || nextY < 0 || nextY >= cols) {
      return false;
    }

    if (grid[nextX][nextY] === '#') {
      direction = changeDirection(direction);
    } else {
      x = nextX;
      y = nextY;
    }
  }
};

const main = () => {
  const grid = readData('data/day6.txt');
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  const initialGuard = findGuard(grid);
  const { x, y, direction } = initialGuard;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] !== '.') continue;

      grid[i][j] = '#';

      if (detectInfiniteLoop(grid, x, y, direction)) {
        count++;
      }

      grid[i][j] = '.';
    }
  }

  console.log(count);
};

main();
