
const fs = require('fs');
const path = require('path');

const readData = (fileName) => {
    const filePath = path.join(process.cwd(), 'data', fileName);
    return fs.readFileSync(filePath, 'utf-8')
        .split('\n')
        .filter(line => line.trim() !== '');
};

const extractInput = (data) => {
    return data.map(line => line.split('').map(Number));
};

const createZeros = (input) => {
    const zeros = [];
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            if (input[i][j] === 0) zeros.push([i, j]);
        }
    }
    return zeros;
};

const findNext = (pos, input) => {
    const current = input[pos[0]][pos[1]];
    const next = [];

    if (input[pos[0] + 1]?.[pos[1]] === current + 1) {
        next.push([pos[0] + 1, pos[1]]);
    }
    if (input[pos[0] - 1]?.[pos[1]] === current + 1) {
        next.push([pos[0] - 1, pos[1]]);
    }
    if (input[pos[0]][pos[1] + 1] === current + 1) {
        next.push([pos[0], pos[1] + 1]);
    }
    if (input[pos[0]][pos[1] - 1] === current + 1) {
        next.push([pos[0], pos[1] - 1]);
    }

    return next;
};

const calculateScores = (zeros, input) => {
    let scores = 0;

    zeros.forEach(pos => {
        let queue = [pos];

        while (queue.length) {
            const candidates = [];

            queue.forEach(pos => {
                if (input[pos[0]][pos[1]] === 9) {
                    scores++;
                } else {
                    candidates.push(...findNext(pos, input));
                }
            });

            const uniqueCandidates = Array.from(new Set(candidates.map(JSON.stringify))).map(JSON.parse);

            queue = uniqueCandidates;
        }
    });

    return scores;
};

const main = () => {
    const data = readData('day10.txt');
    const input = extractInput(data);
    const zeros = createZeros(input);
    const scores = calculateScores(zeros, input);

    console.log('Score:', scores);
};

main();
