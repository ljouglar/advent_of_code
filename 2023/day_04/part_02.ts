import { readFileSync } from 'fs';

type Card = {
  cardNo: number;
  nbCopies: number;
  winNumbers: Array<string>;
  myNumbers: Array<string>;
};

const filename = '2023/day_04/input.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const toLists = (line: string, index: number): Card => ({
  cardNo: index,
  nbCopies: 0,
  winNumbers: line
    .split(/: +/)[1]
    .split(/ +\| +/)[0]
    .split(/ +/),
  myNumbers: line
    .split(/: +/)[1]
    .split(/ +\| +/)[1]
    .split(/ +/),
});

const cards = extractLines().map(toLists);
for (const card of cards) {
  const nbMatch = card.winNumbers.filter((number: string) => card.myNumbers.includes(number)).length;
  for (const nextCard of cards.slice(card.cardNo + 1, card.cardNo + nbMatch + 1)) {
    nextCard.nbCopies += 1 + card.nbCopies;
  }
}

const result = cards.reduce((sum, curCard) => sum + curCard.nbCopies + 1, 0);

console.log(`result ${result}`);
