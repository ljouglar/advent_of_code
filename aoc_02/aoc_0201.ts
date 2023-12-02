import { readFileSync } from 'fs';

let result = 0;

type Set = {
  red?: number;
  green?: number;
  blue?: number;
};

const getSetFromString = (accSet: Set, curStrSet: string): Set => ({
  ...accSet,
  [curStrSet.split(' ')[1]]: +curStrSet.split(' ')[0],
});

const setLessThanCrit = (set: Set): boolean => {
  const crit: Set = { red: 12, green: 13, blue: 14 };
  return (set?.red || 0) <= crit.red && (set?.green || 0) <= crit.green && (set?.blue || 0) <= crit.blue;
};

const lines: Array<string> = readFileSync('aoc_02/aoc_02.data', 'utf-8').split('\n');
for (const line of lines) {
  console.log(line);
  const id = +line.split(': ')[0].split(' ')[1];
  const sets: Array<Set> = line
    .split(': ')[1]
    .split('; ')
    .map((stringSet: string) => stringSet.split(', ').reduce(getSetFromString, {} as Set));
  if (sets.every(setLessThanCrit)) {
    result += id;
    console.log(`result ${result}`);
  }
}
