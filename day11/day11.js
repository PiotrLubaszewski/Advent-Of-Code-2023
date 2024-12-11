const fs = require('fs');
const path = require('path');

const readData = (fileName) => {
  const filePath = path.join(process.cwd(), 'data', fileName);
  return fs
    .readFileSync(filePath, 'utf-8')
    .split('\n')
    .filter((line) => line.trim() !== '');
};

const changeStone = (stone) => {
  if (stone === '0') {
    return '1';
  } else if (stone.length % 2 === 0) {
    const left = stone.slice(0, stone.length / 2);
    const right = stone.slice(stone.length / 2, stone.length);
    return `${left} ${+right}`;
  } else {
    return `${Number(stone) * 2024}`;
  }
};

const changeStones = (stones) => {
  return stones.map((stone) => changeStone(stone));
};

const main = () => {
  const data = readData('day11.txt');
  let numbers = data[0].split(' ');

  const blinks = 25;

  for (let i = 1; i <= blinks; i++) {
    numbers = changeStones(numbers).join(' ').split(' ');
    console.log(i);
  }

  const result = numbers.length;
  console.log(result);
};

main();
