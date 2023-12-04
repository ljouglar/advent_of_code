import { readFileSync } from 'fs';

type Lists = {
  winningCards: Array<string>;
  cards: Array<string>;
};

const filename = 'aoc_04/aoc_04.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const mapLineToLists = (line: string): Lists => ({
  winningCards: line
    .split(/: +/)[1]
    .split(/ +\| +/)[0]
    .split(/ +/),
  cards: line
    .split(/: +/)[1]
    .split(/ +\| +/)[1]
    .split(/ +/),
});

const mapListsToInteresect = (lists: Lists): Array<string> =>
  lists.winningCards.filter((card: string) => lists.cards.includes(card));

const mapIntersectToValue = (intersect: Array<string>): number =>
  intersect.length === 0 ? 0 : 2 ** (intersect.length - 1);

const result = extractLines()
  .map(mapLineToLists)
  .map(mapListsToInteresect)
  .map(mapIntersectToValue)
  .reduce((sum, curValue) => sum + curValue, 0);

console.log(`result ${result}`);
