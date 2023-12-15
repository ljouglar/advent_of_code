import { readFileSync } from 'fs';

const filename = '2023/day_15/input.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const sequences: Array<string> = extractLines()[0].split(',');

const hashSequence = (sequence: string): number => {
  let currentValue = 0;
  for (let i = 0; i < sequence.length; i++) {
    currentValue = currentValue + sequence.charCodeAt(i);
    currentValue = currentValue * 17;
    currentValue = currentValue % 256;
  }
  return currentValue;
};

const result = sequences.map(hashSequence).reduce((acc, nextValue) => acc + nextValue, 0);

console.log(`result ${result}`);
