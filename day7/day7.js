const fs = require('fs');
const path = require('path');

const readData = (fileName) => {
    const filePath = path.join(process.cwd(), 'data', fileName);
    return fs.readFileSync(filePath, 'utf-8')
        .split('\n')
        .filter(line => line.trim() !== '');
};

const evaluate = (numbers, operators) => {
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '+') {
            result += numbers[i + 1];
        } else if (operators[i] === '*') {
            result *= numbers[i + 1];
        }
    }
    return result;
};

const generateOperators = (count) => {
    const operators = ['+', '*'];
    const combinations = [];

    const generate = (current) => {
        if (current.length === count) {
            combinations.push(current);
            return;
        }

        operators.forEach(operator => generate([...current, operator]));
    };

    generate([]);
    return combinations;
};

const solve = (fileName) => {
    const lines = readData(fileName);
    let total = 0;

    lines.forEach(line => {
		console.log(line.split(':'));
        const testValue = line.split(':')[0]
		const equation = line.split(':')[1];
        
		const numbers = equation.trim().split(' ').map(Number);
        const target = Number(testValue);

        const operatorCount = numbers.length - 1;

        const operatorCombinations = generateOperators(operatorCount);

        let isValid = false;
        operatorCombinations.forEach(operators => {
            const result = evaluate(numbers, operators);
            if (result === target) {
                isValid = true;
            }
        });

        if (isValid) {
            total += target;
        }
    });

    return total;
};

const result = solve('day7.txt');
console.log(result);
