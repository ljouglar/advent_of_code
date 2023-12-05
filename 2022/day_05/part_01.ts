import { readFileSync } from 'fs';

type Move = {
  qty: number;
  src: number;
  dst: number;
};

const filename = '2022/day_05/input.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

// Build cargo representation and moves table
let phase = 0;
const rawCrates: Array<Array<string>> = [];
const moves: Array<Move> = [];
for (const line of extractLines()) {
  if (!line) {
    phase = 1;
  }
  if (phase === 0) {
    if (line.includes('[')) {
      rawCrates.push(Array.from(line.matchAll(/(...).?/g)).map((match) => match[0].replace(/[\[\] ]/g, '')));
    }
  } else {
    const [qty, src, dst] = Array.from(line.matchAll(/\d+/g)).map((e) => +e[0]);
    moves.push({ qty, src, dst });
  }
}

// Rotate the cargo representation to handle columns of crates
const crates: Array<Array<string>> = [];
for (const crateRow of rawCrates.reverse()) {
  let col = 0;
  for (const crate of crateRow) {
    crates[col] ||= [];
    if (crate) {
      crates[col].push(crate);
    }
    col++;
  }
}

// Evaluate the moves table on the cargo representation
for (const move of moves) {
  for (let i: number = 0; i < move.qty; i++) {
    crates[move.dst - 1].push(crates[move.src - 1].pop());
  }
}

const result = crates.map((crateRow) => crateRow.pop());

console.log(`result ${result.join('')}`);
