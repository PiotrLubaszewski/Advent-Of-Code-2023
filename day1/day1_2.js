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

const similarity_scores = lefts.map((l, index) => {
	let score = 0;
	
	rights.forEach(r => {
		if(l === r) { score++ }; 
	})

	return l * score;
}) 

const similarity_score = similarity_scores.reduce((prev, curr) => prev + curr, 0);

console.log(similarity_score);


