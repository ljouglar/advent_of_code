import { readFileSync} from 'fs';

let result = 0;
const lines: Array<string> = readFileSync('aoc_01/aoc_0101.data', 'utf-8').split('\n');
for (const line of lines) {
    const reversedLine = line.split('').reverse().join('');
    
    const first = line.match(/\d/)[0];
    const last = reversedLine.match(/\d/)[0];

    result += +`${first}${last}`
    console.log(`${first} - ${last} - ${result} - ${line}`);
}
