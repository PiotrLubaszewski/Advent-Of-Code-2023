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

const getHorizontalBarriers = (barriers, yPosition) => {
     return barriers.filter(b => {
            return b.y === yPosition;
        })
}

const handleUp = (barriers, cursor) => {
    const barriersOnAxis = getVerticalBarriers(barriers, cursor.x);
    const closestBarrier = barriersOnAxis.filter(boa => {
        return boa.y < cursor.y;
    })[0];
    return  cursor.y - closestBarrier.y;
}

const handleRight = (barriers, cursor) => {
    const barriersOnAxis = getHorizontalBarriers(barriers, cursor.y);
    const closestBarrier = barriersOnAxis.filter(boa => {
        return boa.x > cursor.x;
    })[0] 
    return closestBarrier.x - cursor.x;
}

const handleDown = (barriers, cursor) => {
    const barriersOnAxis = getVerticalBarriers(barriers, cursor.x);
    const closestBarrier = barriersOnAxis.filter(boa => {
        return boa.y > cursor.y;
    })[0]
    return closestBarrier.y - cursor.y;
}

const handleLeft = (barriers, cursor) => {
    const barriersOnAxis = getHorizontalBarriers(barriers, cursor.y);
    const closestBarrier = barriersOnAxis.filter(boa => {
        return boa.x < cursor.x;
    })[0];
    return cursor.y - closestBarrier.y; 
}

const makeMove = (barriers, cursor, distinctPositionsCount = 0) => {
    let newCursor = { ...cursor }
    if(cursor.direction === 'UP') {
        distinctPositionsCount += handleUp(barriers, cursor);
        newCursor.y = newCursor.y - distinctPositionsCount - 1;
        newCursor.direction = 'RIGHT';
    }
    if(cursor.direction === 'RIGHT') {
        distinctPositionsCount += handleRight(barriers, cursor);
        newCursor.x = newCursor.x + distinctPositionsCount - 1;
        newCursor.direction = 'DOWN';
    }
    if(cursor.direction === 'DOWN') {
        distinctPositionsCount += handleDown(barriers, cursor);
        newCursor.y = newCursor.y + distinctPositionsCount - 1;
        newCursor.direction = 'LEFT';
    }
    if(cursor.direction === 'LEFT') {
        distinctPositionsCount += handleLeft(barriers, cursor);
        newCursor.x = newCursor.x - distinctPositionsCount - 1;
        newCursor.direction = 'UP';
    }
    return { 
        cursor: newCursor, 
        distinctPositionsCount: distinctPositionsCount - 1 
    };
}

const main = () => {
    const data = readData('day6.txt');
    const { barriers, cursor } = prepareData(data);
    const isFinished = false; 
    const moves = 0;
}

main();
