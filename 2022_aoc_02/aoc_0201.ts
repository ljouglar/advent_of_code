import { readFileSync } from 'fs';

const scoreMatrix = {
  'A X': 1 + 3,
  'A Y': 2 + 6,
  'A Z': 3 + 0,
  'B X': 1 + 0,
  'B Y': 2 + 3,
  'B Z': 3 + 6,
  'C X': 1 + 6,
  'C Y': 2 + 0,
  'C Z': 3 + 3,
}

const filename = '2022_aoc_02/aoc_02.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const result = extractLines().reduce((sum, curLine) => sum + scoreMatrix[curLine], 0);

console.log(`result ${result}`);
