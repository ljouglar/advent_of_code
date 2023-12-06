import { readFileSync } from 'fs';
import { Race, getFirstAndLastSolution } from './utils';

const filename = '2023/day_06/input.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const data: Array<Array<number>> = extractLines().map(
  (line: string): Array<number> =>
    line
      .split(/: +/)[1]
      .split(/ +/)
      .map((e) => +e),
);

const races: Array<Race> = Array.from(data[0].keys()).map((index: number) => ({
  duration: data[0][index],
  distance: data[1][index],
}));

const getNbSolution = (race: Race): number => {
  const [firstSolution, lastSolution] = getFirstAndLastSolution(race);
  return lastSolution - firstSolution + 1;
}

const result = races.map(getNbSolution).reduce((product: number, curNbSolution: number) => product * curNbSolution);

console.log(`result ${result}`);
