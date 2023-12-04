import { readFileSync } from 'fs';

type Lists = {
  winningCards: Array<string>;
  cards: Array<string>
}

const filename = 'aoc_04/aoc_0401.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const mapLineToLists = (line: string): Lists => ({
  winningCards: line.split(': ')[1].split(' | ')[0].split(/ +/),
  cards: line.split(': ')[1].split(' | ')[1].split(/ +/),
})

const result = extractLines().map(mapLineToLists).reduce((length, curList) => length + 1, 0);

console.log(`result ${result}`);
