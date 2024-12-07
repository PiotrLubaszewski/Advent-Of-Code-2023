
const fs = require('fs');
const path = require('path');

const readData = (fileName) => {
    const filePath = path.join(process.cwd(), 'data', fileName);
    return fs.readFileSync(filePath, 'utf-8')
        .split('\n')
        .filter(line => line.trim() !== '');
};

const prepareData = (data) => {
	const pageOrderingRules = data.filter(d => d.includes('|'));
	const updates = data.filter(d => d.includes(','))
	return {pageOrderingRules, updates}

}

const extractRules = (pageOrderingRules) => {
	const rules = {}

	pageOrderingRules.forEach(line => {
		const ruleVals = line.split('|');
		const left = +ruleVals[0];
		const right = +ruleVals[1];
		rules[left] = rules[left] ? [...rules[left], right] : [right] 
	});

	return rules;
}

const extractPageUpdates = (updates) => {
	return updates.map(update => {
		return	update.split(',').map(u => +u);
	});
}

const isCorrectOrder = (first, second, rules) => {
	return rules[first].includes(second);
}

const isRowInCorrectOrder = (row, rules) => {
	let res = true;

	for(let i = 0; i < row.length - 1; i++) {
		res = res && isCorrectOrder(row[i], row[i+1], rules);
	}

	return res;
}

const calculateSumOfMiddleElements = (arr) => {
	let sum = 0;

	arr.forEach(row => {
		const middleElement = row[Math.round((row.length - 1) / 2)];
		sum += middleElement;
	});

	return sum;
}

const main = () =>  {
	const data = readData('day5.txt');
	const { pageOrderingRules, updates } = prepareData(data);
	const rules = extractRules(pageOrderingRules);
	const pageUpdates = extractPageUpdates(updates);
	
	const filteredUpdates = pageUpdates
		.filter(pageUpdate => isRowInCorrectOrder(pageUpdate, rules))

	const result = calculateSumOfMiddleElements(filteredUpdates);
	console.log(result)
}

main();
