const fs = require('fs');
const path = require('path');

const readData = (fileName) => {
    const filePath = path.join(process.cwd(), 'data', fileName);
    return fs.readFileSync(filePath, 'utf-8')
        .split('\n')
        .filter(line => line.trim() !== '');
};

const parseLevels = (rows) => {
    return rows.map(row =>
        row.split(' ').map(Number)
    );
};

const isLevelSafe = (level) => {
    let isDescending = (level[0] - level[1]) > 0;

    for (let i = 1; i < level.length; i++) {
        const isConsistentDirection = isDescending === ((level[i - 1] - level[i]) > 0);
        const distance = Math.abs(level[i - 1] - level[i]);
		const isValidDistance = distance > 0 && distance < 4
        if (!isValidDistance || !isConsistentDirection) {
            return false;
        }
    }
    return true;
};

const canBeFixedByRemovingOne = (level) => {
	for (let i = 0; i < level.length; i++) {
		const newLevel = [...level.slice(0, i), ...level.slice(i + 1)];
		if(isLevelSafe(newLevel)) {
			return true
		}
	}
}

const main = () => {
    const fileName = 'day2.txt';
    const rows = readData(fileName);
    const levels = parseLevels(rows);

    const safeLevelsCount = levels
        .map(level => isLevelSafe(level) || canBeFixedByRemovingOne(level))
        .filter(isSafe => isSafe)
        .length;

    console.log('Safe levels count:', safeLevelsCount);
};

main();
