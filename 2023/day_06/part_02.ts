import { readFileSync } from 'fs';
import { Race, getFirstAndLastSolution } from './utils';

const filename = '2023/day_06/input.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const data: Array<Array<string>> = extractLines().map(
  (line: string): Array<string> => line.split(/: +/)[1].split(/ +/),
);

const race: Race = {
  duration: +data[0].join(''),
  distance: +data[1].join(''),
};

const [firstSolution, lastSolution] = getFirstAndLastSolution(race);

const result = lastSolution - firstSolution + 1;

console.log(`result ${result}`);
