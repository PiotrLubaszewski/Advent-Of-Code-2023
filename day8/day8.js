const fs = require('fs');
const path = require('path');

const readData = (fileName) => {
    const filePath = path.join(process.cwd(), 'data', fileName);
    return fs.readFileSync(filePath, 'utf-8')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line !== '');
};

const extractAntennas = (grid) => {
    const antennas = [];
    const gridSize = grid.length;

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] !== '.') {
                antennas.push({
                    char: grid[i][j],
                    x: i,
                    y: j
                });
            }
        }
    }

    return antennas;
};

const calculateAntiNodes = (antennas, gridSize) => {
    const antiNodes = new Set();

    antennas.forEach((a) => {
        antennas.forEach((b) => {
            if (a.char !== b.char || a === b) return;

            const dY = b.y - a.y;
            const dX = b.x - a.x;
            const newPoint = {
                y: b.y + dY,
                x: b.x + dX
            };

            if (
                newPoint.y >= 0 &&
                newPoint.x >= 0 &&
                newPoint.y < gridSize &&
                newPoint.x < gridSize
            ) {
                antiNodes.add(`${newPoint.x}|${newPoint.y}`);
            }
        });
    });

    return antiNodes;
};

const main = () => {
    const grid = readData('day8.txt');
    const gridSize = grid.length;
    const antennas = extractAntennas(grid);
    const antiNodes = calculateAntiNodes(antennas, gridSize);

    console.log(antiNodes.size);
};

main();
