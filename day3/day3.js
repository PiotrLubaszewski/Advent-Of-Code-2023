
const fs = require('fs');
const path = require('path');

const readData = (fileName) => {
    const filePath = path.join(process.cwd(), 'data', fileName);
    return fs.readFileSync(filePath, 'utf-8')
        .split('\n')
        .filter(line => line.trim() !== '');
};


const main = () =>  {
	const data = readData('day3.txt');
	const rowMul = data.map(dataSet => {
		const regex = new RegExp(`mul\\((\\d+),(\\d+)\\)`, 'g');

		total = 0;
		const matches = dataSet.matchAll(regex);
		for (const match of matches) {
			total += match[1] * match[2];
		}
		return total;
	}).reduce((curr, prev) => curr + prev, 0);

	console.log(rowMul);
}


main();
