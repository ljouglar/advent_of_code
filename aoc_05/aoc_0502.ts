import { readFileSync } from 'fs';

type Interval = {
  start: number;
  end: number;
  diff: number;
};

type Map = Array<Interval>;

const filename = 'aoc_05/aoc_05.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const seedRanges: Array<Array<number>> = Array.from(
  extractLines()[0]
    .split(/: +/)[1]
    .matchAll(/\d+ +\d+/g),
).map((match: RegExpMatchArray) => match[0]).map((range: string) => range.split(/ +/).map((e: string): number => +e));

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

const result: number = seedRanges.reduce((min: number, range: Array<number>) => {
  console.log(range);
  for (let i: number = range[0]; i < range[0] + range[1]; i++){
    const value = toValue(i);
    min = Math.min(min, value);
  }
  return min;
}, Number.MAX_VALUE);


console.log(`result ${result}`);
