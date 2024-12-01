const fs = require('fs');
const fileName = 'day1.txt';

const data = fs.readFileSync(process.cwd() + '/data/' + fileName).toString();

const rows = data.split('\n').filter(item => item != '');
const lefts = [];
const rights = [];

rows.forEach(r => {
	const locations = r.split(' ').filter(item => item != '');
	lefts.push(+locations[0]);
	rights.push(+locations[1]);
}); 

lefts.sort();
rights.sort();

const distances = rows.map((_, index) => {
	return Math.abs(lefts[index] - rights[index]);
}); 

const totalDistance = distances.reduce((prev, curr) => prev + curr, 0);

console.log(totalDistance);
