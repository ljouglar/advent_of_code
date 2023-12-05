import { readFileSync } from 'fs';

const values = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const filename = '2022/day_03/input.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const intersectArrays = (array1: Array<string>, array2: Array<string>): string =>
  array1.filter((e) => array2.includes(e))[0];

const commonItel = (line: string): string =>
  intersectArrays(line.split('').slice(0, line.length / 2), line.split('').slice(line.length / 2, line.length));

const result = extractLines().map(commonItel).reduce((sum, item) => sum + values.indexOf(item), 0);

console.log(`result ${result}`);
