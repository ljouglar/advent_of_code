import { readFileSync } from 'fs';

const filename = '2022/day_06/input.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const startIndex = (line): number => {
  for (let i = 0; i < line.length; i++){
    if (!/(\w).*\1/i.test(line.slice(i, i + 14))) {
      return i + 14;
    }
  }
  return -1;
}

const result = startIndex(extractLines()[0]);

console.log(`result ${result}`);
