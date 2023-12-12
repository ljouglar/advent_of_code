import { readFileSync } from 'fs';

const filename = '2023/day_09/input.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const getDiffBetweenElements = (list: Array<number>): Array<number> => {
  const result: Array<number> = [];
  for (let i = 0; i < list.length - 1; i++) {
    result.push(list[i + 1] - list[i]);
  }
  return result;
}

const nextValue = (line: string): number => {
  const reductions: Array<Array<number>> = [line.split(' ').map((value) => parseInt(value, 10))];
  while (reductions[reductions.length - 1].some((element) => element !== 0)) {
    reductions.push(getDiffBetweenElements(reductions[reductions.length - 1]));
  }
  let firstValue = 0;
  for (let i = reductions.length - 2; i >= 0; i--) {
    firstValue = reductions[i][0] - firstValue;
    reductions[i].splice(0, 0, firstValue);
  }
  return reductions[0][0];
}

const result = extractLines().map(nextValue).reduce((acc, nextValue) => acc + nextValue, 0);

console.log(`result ${result}`);
