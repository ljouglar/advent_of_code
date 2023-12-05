import { readFileSync } from 'fs';

const scoreMatrix = {
  'A X': ['C', 3 + 0],
  'A Y': ['A', 1 + 3],
  'A Z': ['B', 2 + 6],
  'B X': ['A', 1 + 0],
  'B Y': ['B', 2 + 3],
  'B Z': ['C', 3 + 6],
  'C X': ['B', 2 + 0],
  'C Y': ['C', 3 + 3],
  'C Z': ['A', 1 + 6],
}

const filename = '2022/day_02/input.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const result = extractLines().reduce((sum, curLine) => sum + scoreMatrix[curLine][1], 0);

console.log(`result ${result}`);
