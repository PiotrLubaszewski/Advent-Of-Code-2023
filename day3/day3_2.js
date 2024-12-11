const fs = require('fs');
const path = require('path');

const readData = (fileName) => {
    const filePath = path.join(process.cwd(), 'data', fileName);
    return fs.readFileSync(filePath, 'utf-8');
};

const parseInstructions = (data) => {
    const pattern = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;
    return data.match(pattern) || [];
};

const processInstruction = (instruction, isEnabled, currentSum) => {
    if (instruction === 'do()') {
        return { isEnabled: true, sum: currentSum };
    } else if (instruction === "don't()") {
        return { isEnabled: false, sum: currentSum };
    } else if (isEnabled) {
        const numbers = instruction.match(/\d+/g);
        if (numbers) {
            const [left, right] = numbers.map(Number);
            return { isEnabled, sum: currentSum + left * right };
        }
    }
    return { isEnabled, sum: currentSum };
};

const calculateSum = (instructions) => {
    let isEnabled = true;
    return instructions.reduce((acc, instruction) => {
        const result = processInstruction(instruction, isEnabled, acc);
        isEnabled = result.isEnabled;
        return result.sum;
    }, 0);
};

const main = () => {
    const data = readData('day3.txt');
    const instructions = parseInstructions(data);
    const sum = calculateSum(instructions);
    console.log(sum);
};

main();
