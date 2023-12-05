import { readFileSync } from 'fs';

type Interval = {
  start: number;
  end: number;
  diff: number;
};

type Map = Array<Interval>;

const filename = 'aoc_05/aoc_0501.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const seeds: Array<number> = extractLines()[0]
  .split(/ +/)
  .map((seed) => +seed);

const maps: Array<Map> = [];
for (const line of extractLines().slice(2)) {
  if (!line) {
    continue;
  }
  if (line.includes(' map:')) {
    maps.push([] as Map);
  } else {
    const [destRangeStart, srcRangeStart, rangeLength] = line.split(/ +/).map((n) => +n);
    maps[maps.length - 1].push({
      start: srcRangeStart,
      end: srcRangeStart + rangeLength,
      diff: destRangeStart - srcRangeStart,
    });
  }
}

const getValue = (resource: number, map: Map): number => {
  const interval: Interval = map.filter((interval: Interval) => resource >= interval.start && resource < interval.end);
  if (interval) {
    return resource + interval.diff
  }
}

const toValue = (seed: number): number => maps.reduce((value: number, curMap: Map) => , 0)

const result = seeds.map(toValue).reduce((sum, curvalue) => sum + curvalue, 0);

console.log(`result ${result}`);
