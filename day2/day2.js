const fs = require('fs');
const fileName = 'day2.txt';

const data = fs.readFileSync(process.cwd() + '/data/' + fileName).toString();

const rows = data.split('\n').filter(item => item != '');

const levels = rows.filter(r => r !== '').map(row => {
	return row.split(' ').map(vals => +vals);
	
});


const checked = levels.map(level => {
	let safe = true;
	let isDescending = (level[0] - level[1]) > 0;
	for(let i = 1; i < level.length; i++) {
		const isCosistentDirection = isDescending === ((level[i - 1] - level[i]) > 0) 
		const distance = Math.abs(level[i - 1] - level[i]) 
		safe = safe && (distance > 0 && distance < 4) && isCosistentDirection;
	}
	return safe;
})

const count = checked.filter(r => !!r).length;
console.log('count', count);


