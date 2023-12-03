import { readFileSync } from 'fs';

const filename = 'aoc_02/aoc_0201.data';

type Set = {
  red?: number;
  green?: number;
  blue?: number;
};

type Game = {
  sets: Array<Set>;
};

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const getSetFromString = (accSet: Set, curStrSet: string): Set => ({
  ...accSet,
  [curStrSet.split(' ')[1]]: +curStrSet.split(' ')[0],
});

const getSetListFromLine = (line: string): Array<string> => line.split(': ')[1].split('; ');

const getSetListFromStr = (strSetList: string): Set => strSetList.split(', ').reduce(getSetFromString, {} as Set);

const mapLineToGame = (line: string): Game =>
  ({
    sets: getSetListFromLine(line).map(getSetListFromStr),
  } as Game);

const zeroSet: Set = { red: 0, green: 0, blue: 0 };

const getMinSet = (accSet: Set, curSet: Set): Set => {
  return {
    red: Math.max(curSet?.red || 0, accSet.red),
    green: Math.max(curSet?.green || 0, accSet.green),
    blue: Math.max(curSet?.blue || 0, accSet.blue),
  };
};

const setPower = (set: Set): number => (set?.red || 0) * (set?.green || 0) * (set?.blue || 0);

const result = extractLines().map(mapLineToGame).reduce(
  (sum: number, curGame: Game) => sum + setPower(curGame.sets.reduce(getMinSet, zeroSet)),
  0,
);

console.log(`result ${result}`);
