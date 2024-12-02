import { readFileSync } from 'fs';

const filename = '2024/day_01/input.ex1.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const getColumnSets = (lines: Array<string>): [Array<number>, Array<number>] => {
  const firstColumn = new Set<number>();
  const secondColumn = new Set<number>();
  lines.forEach((line: string) => {
    const [first, second] = line.split('  ');
    firstColumn.add(+first);
    secondColumn.add(+second);
  });
  return [Array.from(firstColumn).sort(), Array.from(secondColumn).sort()];
};

const result = extractLines().map((line) => line.split('  ')).reduce((acc, column) => {
  const [first, second] = column;
  return acc + Math.abs(+first - +second);
}, 0);

console.log(`result: ${result}`);
