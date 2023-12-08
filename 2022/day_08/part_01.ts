import { readFileSync } from 'fs';

const filename = '2022/day_08/input.ex.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const treesByRows = extractLines().map((line: string): Array<number> => line.split('').map((e) => +e));

const treesByColumns = [];
for (const treeRow of treesByRows) {
  let col: number = 0;
  for (const tree of treeRow) {
    treesByColumns[col] ||= [];
    treesByColumns[col++].push(tree);
  }
}

console.dir(treesByRows);
console.dir(treesByColumns);

const isVisible = (i: number, j: number): number =>
  +(i === 0 || j === 0 || i === treesByRows.length - 1 || j === treesByColumns.length - 1 || treesByRows[i][j]);

let result = 0;
for (let i; i < treesByColumns.length; i++) {
  for (let j; j < treesByRows.length; j++) {
    result += isVisible(i, j);
  }
}

console.log(`result ${result}`);
