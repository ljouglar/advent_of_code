import { readFileSync } from 'fs';

const filename = 'aoc_01/aoc_0102.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const digits = ['\\d', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

const getFirstAndLastConcatNumber = (line: string): number => {
  const { 0: firstMatch, length, [length - 1]: lastMatch } = line.match(new RegExp(digits.join('|'), 'g'));

  const first = firstMatch.length === 1 ? +firstMatch : digits.indexOf(firstMatch);
  const last = lastMatch.length === 1 ? +lastMatch : digits.indexOf(lastMatch);

  return +`${first}${last}`;
};

const result = extractLines()
  .map(getFirstAndLastConcatNumber)
  .reduce((sum: number, curNumber: number): number => sum + curNumber);

console.log(`result ${result}`);
