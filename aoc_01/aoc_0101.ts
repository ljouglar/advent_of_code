import { readFileSync } from 'fs';

const filename = 'aoc_01/aoc_0101.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const getFirstAndLastConcatNumber = (line: string): number => {
  const { 0: first, length, [length - 1]: last } = line.match(/\d/g);
  return +`${first}${last}`;
};

const result = extractLines()
  .map(getFirstAndLastConcatNumber)
  .reduce((sum: number, curNumber: number): number => sum + curNumber);

console.log(`result ${result}`);
