import { readFileSync } from 'fs';

const filename = '2023/day_08/input.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const lines: Array<string> = extractLines();

const formula: Array<string> = lines[0].split('');

const network = lines.slice(2).reduce((netMap, curLine: string) => {
  const [key, nav] = curLine.split(/ += +/);
  const [L, R] = nav.slice(1, 9).split(/, +/);
  return { ...netMap, ...{ [key]: { L, R } } };
}, {});

let index = 0;
let result = 0;
let nodes = Object.keys(network).filter((key) => key.slice(-1) === 'A');
while (nodes.some((node) => node.slice(-1) !== 'Z')) {
  nodes = nodes.map((node) => network[node][formula[index]]);
  index = (index + 1) % formula.length;
  result++;
}

console.log(`result ${result}`);
