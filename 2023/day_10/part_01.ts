import { readFileSync } from 'fs';

const filename = '2023/day_10/input.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const labyrinth = 

const result = extractLines().length;

console.log(`result ${result}`);
