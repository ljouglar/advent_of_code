import { readFileSync } from 'fs';

type Move = {
  qty: number;
  src: number;
  dst: number;
};

const filename = '2022_aoc_05/aoc_0501.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

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

let col = 0;
const crates: Array<Array<string>> = [];
for (const crateRow of rawCrates.reverse()) {
  crates[col] = [];
  for (const crate of crateRow) {
    crates[col].push(crate)
  }
  col++;
}

const applyMove = (crates: Array<Array<string>>, move: Move): Array<Array<string>> => {
  for (let i: number = 0; i < move.qty; i++){

  }
  return crates;
}

const result = crates;

console.log(`result ${result}`);
