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

const zeroSet: Set = { red: 0, green: 0, blue: 0 };

const getMinSet = (accSet: Set, curSet: Set): Set => {
  return {
    red: Math.max(curSet?.red || 0, accSet.red),
    green: Math.max(curSet?.green || 0, accSet.green),
    blue: Math.max(curSet?.blue || 0, accSet.blue),
  };
};

const setPower = (set: Set): number => (set?.red || 0) * (set?.green || 0) * (set?.blue || 0);

const lines: Array<string> = readFileSync('aoc_02/aoc_02.data', 'utf-8').split('\n');
for (const line of lines) {
  console.log(line);
  const sets: Array<Set> = line
    .split(': ')[1]
    .split('; ')
    .map((stringSet: string) => stringSet.split(', ').reduce(getSetFromString, {} as Set));
  result += setPower(sets.reduce(getMinSet, zeroSet));
  console.log(`result ${result}`);
}
