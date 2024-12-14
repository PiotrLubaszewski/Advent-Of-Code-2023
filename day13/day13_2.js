const fs = require('fs');
const path = require('path');

const readData = (fileName) => {
  const filePath = path.join(process.cwd(), 'data', fileName);
  return fs
    .readFileSync(filePath, 'utf-8')
    .split('\n\n')
    .map((m) => m.match(/\d+/g).map(Number));
};

const tokens = ([aX, aY, bX, bY, pX, pY]) => {
  const a = (pX * bY - pY * bX) / (aX * bY - aY * bX);
  const b = (aX * pY - aY * pX) / (aX * bY - aY * bX);

  return Number.isInteger(a) && Number.isInteger(b) ? a * 3 + b : 0;
};

const main = () => {
  const data = readData('day13.txt');

  const result = data.reduce((acc, machine) => {
    machine[4] = machine[4] + Math.pow(10, 13);
    machine[5] = machine[5] + Math.pow(10, 13);
    return acc + tokens(machine);
  }, 0);

  console.log(result);
};

main();
