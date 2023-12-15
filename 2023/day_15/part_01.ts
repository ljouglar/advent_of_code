import { readFileSync } from 'fs';

const filename = '2023/day_15/input.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const sequences: Array<string> = extractLines()[0].split(',');

const hashSequence = (sequence: string): number =>
  sequence.split('').reduce((acc, nextValue) => ((acc + nextValue.charCodeAt(0)) * 17) % 256, 0);

const result = sequences.map(hashSequence).reduce((acc, nextValue) => acc + nextValue, 0);

console.log(`result ${result}`);
