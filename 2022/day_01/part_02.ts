import { readFileSync } from 'fs';

// From higher to lower
type BestTotals = [number, number, number];

type Total = {
  bestTotals: BestTotals;
  curTotal: number;
};

const zeroTotal: Total = {
  bestTotals: [0, 0, 0],
  curTotal: 0,
};

const filename = '2022/day_01/input.data';

const extractLines = (): Array<string> => [...readFileSync(filename, 'utf-8').split('\n'), ''];

const updateBestTotals = (bestTotals: BestTotals, curTotal: number): BestTotals => {
  if (curTotal > bestTotals[0]) {
    bestTotals[2] = bestTotals[1]
    bestTotals[1] = bestTotals[0]
    bestTotals[0] = curTotal;
  } else if (curTotal > bestTotals[1]) {
    bestTotals[2] = bestTotals[1]
    bestTotals[1] = curTotal;
  } else if (curTotal > bestTotals[2]) {
    bestTotals[2] = curTotal;
  }
  return bestTotals;
};

const total = extractLines().reduce(
  (total: Total, curLine: string) => ({
    bestTotals: curLine ? total.bestTotals : updateBestTotals(total.bestTotals, total.curTotal),
    curTotal: curLine ? total.curTotal + +curLine : 0,
  }),
  zeroTotal,
);

const result = total.bestTotals.reduce((sum: number, total: number): number => sum + total)

console.log(`result ${result}`);
