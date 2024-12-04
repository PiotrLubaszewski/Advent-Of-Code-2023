
const fs = require('fs');
const path = require('path');
const fileName = 'day4.txt';

const filePath = path.join(process.cwd(), 'data', fileName);
const data = fs.readFileSync(filePath, 'utf8');
const rows = data.split('\n').filter(row => row !== '');

const countWordOccurrences = (row, word) => {
    const reg = new RegExp(word, 'g');
    let count = 0;

    for (const match of row.matchAll(reg)) {
        count++;
    }

    const reversed = row.split('').reverse().join('');
    for (const match of reversed.matchAll(reg)) {
        count++;
    }

    return count;
};

const rotateRows = (rows) => {
    return rows[0].split('').map((_, colIndex) =>
        rows.map(row => row[colIndex] || '').reverse().join('')
    );
};

const getDiagonals = (rows) => {
    const height = rows.length;
    const width = rows[0].length;

    const diagonals = [];

    for (let d = -(height - 1); d < width; d++) {
        let diagonal = '';
        for (let row = 0; row < height; row++) {
            const col = row + d;
            if (col >= 0 && col < width) {
                diagonal += rows[row][col];
            }
        }
        if (diagonal) diagonals.push(diagonal);
    }

    for (let d = 0; d < height + width - 1; d++) {
        let diagonal = '';
        for (let row = 0; row < height; row++) {
            const col = d - row;
            if (col >= 0 && col < width) {
                diagonal += rows[row][col];
            }
        }
        if (diagonal) diagonals.push(diagonal);
    }

    return diagonals;
};

const main = () => {
    const word = 'XMAS';
    let count = 0;

    for (const row of rows) {
        count += countWordOccurrences(row, word);
    }

    const rotatedRows = rotateRows(rows);
    for (const row of rotatedRows) {
        const filteredRow = row.replace(/,/g, '');
        count += countWordOccurrences(filteredRow, word);
    }

    const diagonals = getDiagonals(rows);
    for (const diagonal of diagonals) {
        count += countWordOccurrences(diagonal, word);
    }

    console.log(count);
};

main();
