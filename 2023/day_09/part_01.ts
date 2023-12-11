import { readFileSync } from 'fs';

const filename = '2023/day_09/input.ex.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');



const result = extractLines().length;

console.log(`result ${result}`);
