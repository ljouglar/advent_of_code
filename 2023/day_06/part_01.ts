import { readFileSync } from 'fs';

type Race = {
  duration: number;
  distance: number;
};

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

const result = races.map(getNbSolution).reduce((product: number, curNbSolution: number) => product * curNbSolution);

console.log(`result ${result}`);
