import { readFileSync } from 'fs';

const filename = '2022_aoc_05/aoc_0501.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');


const result = extractLines().length;

console.log(`result ${result}`);
