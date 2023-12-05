import { readFileSync } from 'fs';

const filename = '2022_aoc_04/aoc_0401.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const totalOverlap = (arrays: Array<Array<number>>): boolean =>
  (arrays[0][0] <= arrays[1][0] && arrays[0][1] >= arrays[1][1]) ||
  (arrays[1][0] <= arrays[0][0] && arrays[1][1] >= arrays[0][1]);

const sectionPair = (line: string): Array<Array<number>> =>
  line
    .split(',')
    .slice(0, 2)
    .map((range: string): Array<number> => range.split('-').map((e: string): number => +e));

const result = extractLines().map(sectionPair).filter(totalOverlap).length;

console.log(`result ${result}`);
