import { readFileSync } from 'fs';

const values = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const filename = '2022/day_03/input.data';

const extractLines = (): Array<string> => [...readFileSync(filename, 'utf-8').split('\n'), ''];

const intersectArrays = (array1: Array<string>, array2: Array<string>, array3: Array<string>): string =>
  array1.filter((e) => array2.includes(e) && array3.includes(e))[0];

const badges = [];
const groups = [];
for (const line of extractLines()) {
  if (groups.length === 3) {
    badges.push(intersectArrays(groups[0], groups[1], groups[2]));
    groups.length = 0;
  }
  groups.push(line.split(''));
}

const result = badges.reduce((sum, item) => sum + values.indexOf(item), 0);

console.log(`result ${result}`);
