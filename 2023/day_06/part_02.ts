import { readFileSync } from 'fs';

type Race = {
  duration: number;
  distance: number;
};

const filename = '2023/day_06/input.ex.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const data: Array<Array<string>> = extractLines().map(
  (line: string): Array<string> => line.split(/: +/)[1].split(/ +/),
);

const race: Race = {
  duration: +data[0].join(''),
  distance: +data[1].join(''),
};

const getFirstAndLastSolution = (race: Race): Array<number> => {
  const result = [];
  for (let curHoldDuration = 1; curHoldDuration < race.duration; curHoldDuration++){
    if ((race.duration - curHoldDuration) * curHoldDuration > race.distance) {
      result[0] = curHoldDuration;
      break;
    }
  }
  for (let curHoldDuration = race.duration - 1; curHoldDuration > 0; curHoldDuration--){
    if ((race.duration - curHoldDuration) * curHoldDuration > race.distance) {
      result[1] = curHoldDuration;
      break;
    }
  }
  return result;
}

const [firstSolution, lastSolution] = getFirstAndLastSolution(race);

const result = lastSolution - firstSolution + 1;

console.log(`result ${result}`);
