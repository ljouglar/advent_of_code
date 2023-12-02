import { readFileSync } from 'fs';

const lines: Array<string> = readFileSync('aoc_03/aoc_0301.data', 'utf-8').split('\n');
for (const line of lines) {
  console.log(line);
}