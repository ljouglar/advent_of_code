import { readFileSync } from 'fs';

const filename = 'aoc_05/aoc_0501.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');



const result = extractLines().reduce((sum, curline) => sum + 1, 0);

console.log(`result ${result}`);
