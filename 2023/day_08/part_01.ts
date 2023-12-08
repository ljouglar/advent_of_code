import { readFileSync } from 'fs';

type Letter = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | "w" | "x" | "y" | "z"
type UppercaseLetter = Uppercase<Letter>

type Node = `${UppercaseLetter}${UppercaseLetter}${UppercaseLetter}`

type Network = {
  [key: string]: [Node, Node];
};

const filename = '2023/day_08/input.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const lines: Array<string> = extractLines();

const formula: Array<string> = lines[0].split('');

const network: Network = lines.slice(2).reduce((netMap, curLine: string) => {
  const [key, nav] = curLine.split(/ += +/);
  const [L, R] = nav.slice(1, 9).split(/, +/);
  return { ...netMap, ...{ [key]: { L, R } } };
}, {});

let index = 0;
let result = 0;
let node = 'AAA';
while (node !== 'ZZZ') {
  node = network[node][formula[index++ % formula.length]];
  result++;
}

console.log(`result ${result}`);
