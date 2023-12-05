import { readFileSync } from 'fs';

type Interval = {
  start: number;
  end: number;
  diff: number;
};

type Map = Array<Interval>;

const filename = '2023/day_05/input.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const seeds: Array<number> = extractLines()[0]
  .split(/: +/)[1]
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
    const [destStart, srcStart, length] = line.split(/ +/).map((n) => +n);
    maps[maps.length - 1].push({ start: srcStart, end: srcStart + length, diff: destStart - srcStart });
  }
}

const getValue = (resource: number, map: Map): number => {
  const interval: Interval = map.find((interval: Interval) => resource >= interval.start && resource < interval.end);
  return interval ? resource + interval.diff : resource;
};

const toValue = (seed: number): number => maps.reduce((value: number, curMap: Map) => getValue(value, curMap), seed);

const result = Math.min(...seeds.map(toValue));

console.log(`result ${result}`);
