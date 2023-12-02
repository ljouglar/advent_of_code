import { readFileSync } from 'fs';

let result = 0;
const digits = ['\\d', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const reversedDigits = [digits[0], ...digits.slice(1).map((digit) => digit.split('').reverse().join(''))];

const lines: Array<string> = readFileSync('aoc_01/aoc_0102.data', 'utf-8').split('\n');
for (const line of lines) {
  const reversedLine = line.split('').reverse().join('');

  const firstMatch = line.match(new RegExp(digits.join('|')))[0];
  const lastMatch = reversedLine.match(new RegExp(reversedDigits.join('|')))[0];

  const first = firstMatch.length === 1 ? +firstMatch : digits.indexOf(firstMatch);
  const last = lastMatch.length === 1 ? +lastMatch : reversedDigits.indexOf(lastMatch);

  result += +`${first}${last}`;
  console.log(`${first} - ${last} - ${result} - ${line}`);
}
