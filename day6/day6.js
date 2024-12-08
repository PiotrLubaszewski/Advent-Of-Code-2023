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
            const x = j + 1;
            const y = i + 1;
            if(charAtPosition === '#') {
                barriers.push({x, y})
            };
            if(charAtPosition === '^') {
                cursor = {x, y, direction: "UP"}
            }
            if(charAtPosition === '>') {
                cursor = {x, y, direction: "RIGHT"}
            }
            if(charAtPosition === 'v') {
                cursor = {x, y, direction: "DOWN"}
            }
            if(charAtPosition === '<') {
                cursor = {x, y, direction: "LEFT"}
            }
        }
    }

    return { barriers, cursor };
}

const getVerticalBarriers = (barriers, xPosition) => {
    return barriers.filter(b => {
            return b.x === xPosition;
        })
}

const getHorizontalBarriers = (yPosition) => {
     return barriers.filter(b => {
            return b.y === yPosition;
        })
}

const makeMove = (barriers, cursor) => {
    let distinctPositionsCount = 0;
    if(cursor.direction === 'UP') {
        const barriersOnAxis = getVerticalBarriers(barriers, cursor.x);
        const closestBarrier = barriersOnAxis.filter(boa => {
           return boa.y < cursor.y;
        })[0];
        distinctPositionsCount += cursor.y - closestBarrier.y;
    }
    if(cursor.direction === 'RIGHT') {
        const barriersOnAxis = getHorizontalBarriers(barriers, cursor.y);
        const closestBarrier = barriersOnAxis.filter(boa => {
           return boa.x > cursor.x;
        })[0] 
        distinctPositionsCount += closestBarrier.x - cursor.x;
    }
    if(cursor.direction === 'DOWN') {
        const barriersOnAxis = getVerticalBarriers(barriers, cursor.x);
        const closestBarrier = barriersOnAxis.filter(boa => {
            return boa.y > cursor.y;
        })[0]
        distinctPositionsCount += closestBarrier.y - cursor.y;

    }
    if(cursor.direction === 'LEFT') {
        const barriersOnAxis = getHorizontalBarriers(barriers, cursor.y);
        const closestBarrier = barriersOnAxis.filter(boa => {
           return boa.x < cursor.x;
        })[0];
        distinctPositionsCount += cursor.y - closestBarrier.y; 
    }
    return distinctPositionsCount - 1;
}

const main = () => {
    const data = readData('day6.txt');
    const { barriers, cursor } = prepareData(data);
    const distance = makeMove(barriers, cursor);
    console.log(distance);
}

main();
