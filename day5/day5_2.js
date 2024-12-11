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
    const updates = data.filter(d => d.includes(','));
    return { pageOrderingRules, updates };
};

const extractRules = (pageOrderingRules) => {
    return pageOrderingRules.reduce((rules, line) => {
        const [left, right] = line.split('|').map(Number);
        rules[left] = rules[left] ? [...rules[left], right] : [right];
        return rules;
    }, {});
};

const extractPageUpdates = (updates) => {
    return updates.map(update => update.split(',').map(Number));
};

const isCorrectOrder = (first, second, rules) => {
    return rules[first]?.includes(second) || false;
};

const isRowInCorrectOrder = (row, rules) => {
    return row.every((page, idx) => idx === row.length - 1 || isCorrectOrder(page, row[idx + 1], rules));
};

const orderList = (update, rules) => {
    const dependencies = update.reduce((dic, page) => {
        dic[page] = rules[page]?.filter(rule => update.includes(rule)) || [];
        return dic;
    }, {});

    const ordered = [];
    while (Object.keys(dependencies).length) {
        const independentPage = Object.keys(dependencies).find(page => dependencies[page].length === 0);

        if (!independentPage) {
            throw new Error('Cyclic dependency detected in page ordering rules.');
        }

        ordered.unshift(Number(independentPage));

        for (const page in dependencies) {
            dependencies[page] = dependencies[page].filter(dep => dep !== Number(independentPage));
        }

        delete dependencies[independentPage];
    }

    return ordered;
};

const calculateResult = (pageUpdates, rules) => {
    return pageUpdates.reduce((acc, update) => {
        if (isRowInCorrectOrder(update, rules)) {
            return acc;
        }

        const orderedUpdate = orderList(update, rules);
        const middleElement = orderedUpdate[Math.floor((orderedUpdate.length - 1) / 2)];
        return acc + middleElement;
    }, 0);
};

const main = () => {
    const data = readData('day5.txt');
    const { pageOrderingRules, updates } = prepareData(data);
    const rules = extractRules(pageOrderingRules);
    const pageUpdates = extractPageUpdates(updates);

    const result = calculateResult(pageUpdates, rules);
    console.log(result);
};

main();
