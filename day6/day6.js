const fs = require('fs');
const path = require('path');

const readData = (fileName) => {
    const filePath = path.join(process.cwd(), 'data', fileName);
    return fs.readFileSync(filePath, 'utf-8')
        .split('\n')
        .filter(line => line.trim() !== '');
};

const prepareData = (data) => {
    const barriers = [];
    let cursor = {}
    for(let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            const charAtPosition = data[i][j];
            if(charAtPosition === '#') {
                barriers.push({x: i, y: j})
            };
            if(charAtPosition === '^') {
                cursor = {x: i, y: j, direction: "UP"}
            }
            if(charAtPosition === '>') {
                cursor = {x: i, y: j, direction: "RIGHT"}
            }
            if(charAtPosition === 'v') {
                cursor = {x: i, y: j, direction: "DOWN"}
            }
            if(charAtPosition === '<') {
                cursor = {x: i, y: j, direction: "LEFT"}
            }
        }
    }

    return { barriers, cursor };
}

const makeMove = (barriers, cursor) => {
    if(cursor.direction === 'UP') {
        // barriers of x < cursor.x;
    }
    if(cursor.direction === 'RIGHT') {
        // barriers of y > cursor.y;
    }
    if(cursor.direction === 'DOWN') {
        // barriers of x > cursor.x;
    }
    if(cursor.direction === 'LEFT') {
        // barriers of y < cursor.y;
    }
    // set new coordinates for cursor => 
    // repeat until maze is left
    // count moves
}

const main = () => {
    const data = readData('day6.txt');
    const { barriers, cursor } = prepareData(data);
    console.log(barriers, cursor);
}

main();
