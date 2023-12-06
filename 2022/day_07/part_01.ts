import { readFileSync } from 'fs';

type TreeNode = {
  [key: string]: any;
  children?: TreeNode[];
  size: number;
}
const filename = '2022/day_07/input.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

// const tree: Array<Leave> = [];
// for (const line: string of extractLines()) {
  
// }

const result = extractLines().length;

console.log(`result ${result}`);
