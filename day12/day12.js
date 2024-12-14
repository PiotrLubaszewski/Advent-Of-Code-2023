const fs = require('fs');
const path = require('path');

const readData = (fileName) => {
  const filePath = path.join(process.cwd(), 'data', fileName);
  return fs
    .readFileSync(filePath, 'utf-8')
    .split('\n')
    .filter((line) => line.trim() !== '');
};

const main = () => {
  const rows = readData('day12.txt').map((r) => r.split(''));
  const rowCount = rows.length;
  const colsCount = rows[0].length;
  const visited = Array.from({ length: rowCount }, () =>
    Array(colsCount).fill(false)
  );
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const regions = [];

  const isInside = (x, y) => {
    return x >= 0 && y >= 0 && x < rowCount && y < colsCount;
  };

  const processPoint = (x, y, char) => {
    let count = 0;
    let permiter = 0;

    const stack = [[x, y]];

    while (stack.length) {
      const [currentX, currentY] = stack.pop();

      if (
        !isInside(currentX, currentY) ||
        visited[currentX][currentY] ||
        rows[currentX][currentY] !== char
      ) {
        continue;
      }

      visited[currentX][currentY] = true;
      count++;

      for (const [dx, dy] of directions) {
        const newX = currentX + dx;
        const newY = currentY + dy;

        if (!isInside(newX, newY) || rows[newX][newY] !== char) {
          permiter++;
        } else if (!visited[newX][newY]) {
          stack.push([newX, newY]);
        }
      }
    }
    return { count, permiter };
  };

  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < colsCount; j++) {
      if (!visited[i][j]) {
        const char = rows[i][j];
        const region = processPoint(i, j, char);
        regions.push({ count: region.count, permiter: region.permiter });
      }
    }
  }

  const processed = regions.reduce((acc, v) => {
    acc += v.count * v.permiter;
    return acc;
  }, 0);

  console.log(processed);
};

main();
