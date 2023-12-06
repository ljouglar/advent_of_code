import { readFileSync } from 'fs';

type Race = {
  duration: number;
  distance: number;
};

const filename = '2023/day_06/input.ex.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const data: Array<Array<string>> = extractLines().map(
  (line: string): Array<string> =>
    line
      .split(/: +/)[1]
      .split(/ +/),
);

const race: Race = {
  duration: +data[0].join(''),
  distance: +data[1].join(''),
};

const getDistanceForHoldDuration = (holdDuration: number, duration: number): number =>
  (duration - holdDuration) * holdDuration;

const getNbSolution = (race: Race): number =>
  Array.from(Array(race.duration).keys()).reduce((holdDurations: Array<number>, curHoldDuration: number) => {
    if (getDistanceForHoldDuration(curHoldDuration, race.duration) > race.distance) {
      return [...holdDurations, curHoldDuration];
    } else {
      return holdDurations;
    }
  }, []).length;

const result = getNbSolution(race);

console.log(`result ${result}`);
