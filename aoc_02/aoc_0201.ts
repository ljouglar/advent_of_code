import { readFileSync } from 'fs';

const filename = 'aoc_02/aoc_02.data';

type Set = {
  red?: number;
  green?: number;
  blue?: number;
};

type Game = {
  id: number;
  sets: Array<Set>;
};

const getSetFromString = (accSet: Set, curStrSet: string): Set => ({
  ...accSet,
  [curStrSet.split(' ')[1]]: +curStrSet.split(' ')[0],
});

const getSetListFromLine = (line: string): Array<string> => line.split(': ')[1].split('; ');

const getSetListFromStr = (strSetList: string): Set => strSetList.split(', ').reduce(getSetFromString, {} as Set);

const extractGames = (): Array<Game> =>
  readFileSync(filename, 'utf-8')
    .split('\n')
    .map(
      (line: string) =>
        ({
          id: +line.split(': ')[0].split(' ')[1],
          sets: getSetListFromLine(line).map(getSetListFromStr),
        } as Game),
    );

const setLessThanCrit = (set: Set): boolean => {
  const crit: Set = { red: 12, green: 13, blue: 14 };
  return (set?.red || 0) <= crit.red && (set?.green || 0) <= crit.green && (set?.blue || 0) <= crit.blue;
};

const result = extractGames().reduce(
  (sum: number, curGame: Game) => sum + (curGame.sets.every(setLessThanCrit) ? curGame.id : 0),
  0,
);

console.log(`result ${result}`);
