import { readFileSync } from 'fs';

type Box = {
  label: string;
  value: number;
}

const boxes: Array<Array<Box>> = Array(256);

const filename = '2023/day_15/input.ex.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const sequences: Array<string> = extractLines()[0].split(',');

const hashSequence = (sequence: string): number =>
  sequence.split('').reduce((acc, nextValue) => ((acc + nextValue.charCodeAt(0)) * 17) % 256, 0);

const result = sequences.map(hashSequence).reduce((acc, nextValue) => acc + nextValue, 0);

console.log(`result ${result}`);
