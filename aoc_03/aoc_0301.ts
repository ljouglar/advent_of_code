import { readFileSync } from 'fs';

type NumberOccurence = {
  number: string;
  pos: number;
};

type SymbolOccurence = {
  symbol: string;
  pos: number;
};

type AnalysedLine = {
  numbers: Array<NumberOccurence>;
  symbols: Array<SymbolOccurence>;
};

const filename = 'aoc_03/aoc_03.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const mapLineToAnalized = (line: string): AnalysedLine =>
  ({
    numbers:
      Array.from(line.matchAll(/\d+/g))?.map(
        (match: RegExpMatchArray): NumberOccurence =>
          ({
            number: match[0],
            pos: match.index,
          } as NumberOccurence),
      ) || [],
    symbols:
      Array.from(line.matchAll(/[^.\d\w]/g))?.map(
        (match: RegExpMatchArray): SymbolOccurence =>
          ({
            symbol: match[0],
            pos: match.index,
          } as SymbolOccurence),
      ) || [],
    partNumbers: [],
  } as AnalysedLine);

const numberTouchesSymbolSameLine = (number: NumberOccurence, symbols: Array<SymbolOccurence>): boolean =>
  symbols.some(
    (symbol: SymbolOccurence) => symbol.pos === number.pos - 1 || symbol.pos === number.pos + number.number.length,
  );

const numberTouchesSymbolOtherLine = (number: NumberOccurence, symbols: Array<SymbolOccurence>): boolean =>
  symbols.some(
    (symbol: SymbolOccurence) => symbol.pos >= number.pos - 1 && symbol.pos <= number.pos + number.number.length,
  );

const analysedLines = extractLines().map(mapLineToAnalized);

const partNumbers = new Array<string>();
let lastAnalyzedLine = null;
for (const analysedLine of analysedLines) {
  for (const number of analysedLine.numbers) {
    if (numberTouchesSymbolSameLine(number, analysedLine.symbols)) {
      partNumbers.push(number.number);
    }
    if (lastAnalyzedLine && numberTouchesSymbolOtherLine(number, lastAnalyzedLine.symbols)) {
      partNumbers.push(number.number);
    }
  }
  if (lastAnalyzedLine) {
    for (const number of lastAnalyzedLine.numbers) {
      if (numberTouchesSymbolOtherLine(number, analysedLine.symbols)) {
        partNumbers.push(number.number);
      }
    }
  }
  lastAnalyzedLine = analysedLine;
}

const result = partNumbers.reduce((sum: number, number: string): number => sum + +number, 0);

console.log(`result ${result}`);
