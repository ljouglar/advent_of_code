import { readFileSync } from 'fs';

const filename = '2023/day_01/input.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const digits = ['\\d', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

const getFirstAndLastConcatNumber = (line: string): number => {
  const matches = Array.from(line.matchAll(new RegExp(digits.join('|'), 'g'))).map((match) => match[0]);

  const first = matches.at(0).length === 1 ? +matches.at(0) : digits.indexOf(matches.at(0));
  const last = matches.at(-1).length === 1 ? +matches.at(-1) : digits.indexOf(matches.at(-1));

  return +`${first}${last}`;
};

const result = extractLines()
  .map(getFirstAndLastConcatNumber)
  .reduce((sum: number, curNumber: number): number => sum + curNumber, 0);

console.log(`result ${result}`);
