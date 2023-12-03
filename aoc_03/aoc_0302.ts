import { readFileSync } from 'fs';

type NumberOccurence = {
  number: string;
  pos: number;
};

type GearOccurence = {
  line: number;
  pos: number;
  numbers: Array<number>;
};

type AnalysedLine = {
  numbers: Array<NumberOccurence>;
  gears: Array<GearOccurence>;
};

type Gear = {
  numbers: Array<string>;
};

const filename = 'aoc_03/aoc_03.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const mapLineToAnalized = (line: string, index: number): AnalysedLine =>
  ({
    numbers:
      Array.from(line.matchAll(/\d+/g))?.map(
        (match: RegExpMatchArray): NumberOccurence =>
          ({
            number: match[0],
            pos: match.index,
          } as NumberOccurence),
      ) || [],
    gears:
      Array.from(line.matchAll(/\*/g))?.map(
        (match: RegExpMatchArray): GearOccurence =>
          ({
            line: index,
            pos: match.index,
            numbers: [],
          } as GearOccurence),
      ) || [],
    partNumbers: [],
  } as AnalysedLine);

const getNumbersTouchingGearSameLine = (gear: GearOccurence, numbers: Array<NumberOccurence>): Array<string> =>
  numbers
    .filter((number: NumberOccurence) => gear.pos === number.pos - 1 || gear.pos === number.pos + number.number.length)
    .map((number: NumberOccurence): string => number.number);

const getNumbersTouchingGearOtherLine = (gear: GearOccurence, numbers: Array<NumberOccurence>): Array<string> =>
  numbers
    .filter((number: NumberOccurence) => gear.pos >= number.pos - 1 && gear.pos <= number.pos + number.number.length)
    .map((number: NumberOccurence): string => number.number);

const analysedLines = extractLines().map(mapLineToAnalized);

const gears = {};
let lastAnalyzedLine = null;
for (const analysedLine of analysedLines) {
  for (const gear of analysedLine.gears) {
    const gearKey = `${gear.line}_${gear.pos}`;
    if (!gears[gearKey]) {
      gears[gearKey] = { numbers: [] };
    }
    gears[gearKey].numbers = [...gears[gearKey].numbers, ...getNumbersTouchingGearSameLine(gear, analysedLine.numbers)];
    if (lastAnalyzedLine) {
      gears[gearKey].numbers = [
        ...gears[gearKey].numbers,
        ...getNumbersTouchingGearOtherLine(gear, lastAnalyzedLine.numbers),
      ];
    }
  }
  if (lastAnalyzedLine) {
    for (const gear of lastAnalyzedLine.gears) {
      const gearKey = `${gear.line}_${gear.pos}`;
      if (!gears[gearKey]) {
        gears[gearKey] = { numbers: [] };
      }
      gears[gearKey].numbers = [
        ...gears[gearKey].numbers,
        ...getNumbersTouchingGearOtherLine(gear, analysedLine.numbers),
      ];
    }
  }
  lastAnalyzedLine = analysedLine;
}

const result = Object.values(gears)
  .filter((gear: Gear) => gear.numbers.length === 2)
  .reduce((sum: number, gear: Gear): number => sum + (+gear.numbers[0] * +gear.numbers[1]), 0);

console.log(`result ${result}`);
