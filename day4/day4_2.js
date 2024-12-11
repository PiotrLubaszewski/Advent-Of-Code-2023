const fs = require('fs');
const path = require('path');

const readData = (fileName) => {
    const filePath = path.join(process.cwd(), 'data', fileName);
    return fs.readFileSync(filePath, 'utf-8')
};

const createTable = (data) => {
    return data.split('\n').map((row) => row.split(''));
}

const main = () => {
    const data = readData('day4.txt')
    const table = createTable(data);
    const rows = table.length;
    const cols = table[0].length;
    const wrod = "XMAS".split('');
    let count = 0;;

    for (let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            if(table[i][j] === "A") {
                if(
                    table?.[i - 1]?.[j - 1] === "M" &&
                    table?.[i - 1]?.[j + 1] === "M" &&
                    table?.[i + 1]?.[j - 1] === "S" &&
                    table?.[i + 1]?.[j + 1] === "S" 
                ) {
                    count++;
                }
                if(
                    table?.[i - 1]?.[j - 1] === "M" &&
                    table?.[i - 1]?.[j + 1] === "S" &&
                    table?.[i + 1]?.[j - 1] === "M" &&
                    table?.[i + 1]?.[j + 1] === "S" 
                ) {
                    count++;
                }
                  if(
                    table?.[i - 1]?.[j - 1] === "S" &&
                    table?.[i - 1]?.[j + 1] === "M" &&
                    table?.[i + 1]?.[j - 1] === "S" &&
                    table?.[i + 1]?.[j + 1] === "M" 
                ) {
                    count++;
                }          
                if(
                    table?.[i - 1]?.[j - 1] === "S" &&
                    table?.[i - 1]?.[j + 1] === "S" &&
                    table?.[i + 1]?.[j - 1] === "M" &&
                    table?.[i + 1]?.[j + 1] === "M" 
                ) {
                    count++;
                }          
            } 
        }
    }

    console.log(count)

}

main();
