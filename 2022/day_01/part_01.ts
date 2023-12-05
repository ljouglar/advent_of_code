import { readFileSync } from 'fs';

type Total = {
  bestTotal: number;
  curTotal: number;
};

const zeroTotal: Total = {
  bestTotal: 0,
  curTotal: 0,
};

const filename = '2022/day_01/input.data';

const extractLines = (): Array<string> => [...readFileSync(filename, 'utf-8').split('\n'), ''];

const result = extractLines().reduce(
  (total: Total, curLine: string) => ({
    bestTotal: curLine ? total.bestTotal : total.curTotal > total.bestTotal ? total.curTotal : total.bestTotal,
    curTotal: curLine ? total.curTotal + +curLine : 0,
  }),
  zeroTotal,
);

console.log(`result ${result.bestTotal}`);
