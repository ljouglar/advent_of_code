import { readFileSync } from 'fs';

type Lists = {
  winningCards: Array<string>;
  cards: Array<string>;
};

const filename = 'aoc_04/aoc_04.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const toLists = (line: string): Lists => ({
  winningCards: line
    .split(/: +/)[1]
    .split(/ +\| +/)[0]
    .split(/ +/),
  cards: line
    .split(/: +/)[1]
    .split(/ +\| +/)[1]
    .split(/ +/),
});

const toNbInteresect = (lists: Lists): number =>
  lists.winningCards.filter((card: string) => lists.cards.includes(card)).length;

const toValue = (nbIntersect: number): number => (nbIntersect === 0 ? 0 : 2 ** (nbIntersect - 1));

const result = extractLines()
  .map(toLists)
  .map(toNbInteresect)
  .map(toValue)
  .reduce((sum, curValue) => sum + curValue, 0);

console.log(`result ${result}`);
