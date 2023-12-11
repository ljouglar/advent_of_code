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

const gcd = (a: number, b: number): number => (b == 0 ? a : gcd(b, a % b));
const lcm = (a: number, b: number): number => (a / gcd(a, b)) * b;
const lcmAll = (ns: Array<number>): number => ns.reduce(lcm, 1);

let FormulaIndex = 0;
let nbStep = 0;
let nodes = Object.keys(network).filter((key) => key.slice(-1) === 'A');
const nodeSizes = nodes.map((node) => []);
while (nodes.some((node) => node.slice(-1) !== 'Z')) {
  if (nodes.some((node) => node.slice(-1) === 'Z')) {
    const nodeIndex = nodes.findIndex((node) => node.slice(-1) === 'Z');
    nodeSizes[nodeIndex].push(
      nbStep - (nodeSizes[nodeIndex].length === 0 ? 0 : nodeSizes[nodeIndex][nodeSizes[nodeIndex].length - 1]),
    );
    if (nodeSizes.every((nodeSize) => nodeSize.length > 0)) {
      break;
    }
  }
  nodes = nodes.map((node) => network[node][formula[FormulaIndex]]);
  FormulaIndex = (FormulaIndex + 1) % formula.length;
  nbStep++;
}

const result = lcmAll(nodeSizes.map((nodeSize) => nodeSize[0]));

console.log(`result ${result}`);
