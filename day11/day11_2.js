const fs = require('fs');
const path = require('path');

const readData = (fileName) => {
  const filePath = path.join(process.cwd(), 'data', fileName);
  return fs
    .readFileSync(filePath, 'utf-8')
    .split('\n')
    .filter((line) => line.trim() !== '');
};

const countStones = (stones, num, count) => {
  return (stones[num] || 0) + count;
};

const main = () => {
  const data = readData('day11.txt');
  let stones = data[0].split(' ').reduce((acc, val) => {
    acc[val] = 1;
    return acc;
  }, {});

  const blinks = 75;

  for (let i = 1; i <= blinks; i++) {
    const newStones = {};

    for (const [stone, count] of Object.entries(stones)) {
      const num = Number(stone);

      if (num === 0) {
        const newStone = 1;
        newStones[newStone] = countStones(newStones, newStone, count);
      } else if (num.toString().length % 2 === 0) {
        const str = num.toString();
        const midPoint = str.length / 2;
        const left = parseInt(str.slice(0, midPoint), 10);
        const right = parseInt(str.slice(midPoint), 10);
        newStones[left] = countStones(newStones, left, count);
        newStones[right] = countStones(newStones, right, count);
      } else {
        const newStone = num * 2024;
        newStones[newStone] = countStones(newStones, newStone, count);
      }
    }

    stones = newStones;
  }

  const result = Object.values(stones).reduce((acc, val) => acc + val, 0);
  console.log(result);
};

main();
