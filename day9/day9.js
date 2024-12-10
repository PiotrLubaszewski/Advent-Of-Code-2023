
const fs = require('fs');
const path = require('path');

const readData = (fileName) => {
    const filePath = path.join(process.cwd(), 'data', fileName);
    return fs.readFileSync(filePath, 'utf-8')
        .split('')
        .map(Number);
};

const unpackDisk = (data) => {
    const unpackedDisk = [];

    data.forEach((value, i) => {
        for (let j = value; j > 0; j--) {
            if (i % 2 === 0) {
                unpackedDisk.push(i / 2);
            } else {
                unpackedDisk.push('.');
            }
        }
    });

    resolveHoles(unpackedDisk);
    return unpackedDisk;
};

const resolveHoles = (unpackedDisk) => {
    for (let i = 0; i < unpackedDisk.length; i++) {
        if (unpackedDisk[i] === '.') {
            while (unpackedDisk.length > 0) {
                const temp = unpackedDisk.pop();
                if (temp !== '.') {
                    unpackedDisk[i] = temp;
                    break;
                }
            }
        }
    }
};

const calculateChecksum = (unpackedDisk) => {
    return unpackedDisk.reduce((checksum, block, id) => checksum + (block * id), 0);
};

const main = () => {
    const data = readData('day9.txt');
    const unpackedDisk = unpackDisk(data);

    console.log('Unpacked Disk:', unpackedDisk);

    const checksum = calculateChecksum(unpackedDisk);
    console.log('Checksum:', checksum);
};

main();
