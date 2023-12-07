import { readFileSync } from 'fs';
import { Race, getFirstAndLastSolution } from './utils';

enum HandTypes {
  FiveOfAKind,
  FourOfAKind,
  FullHouse,
  ThreeOfAKind,
  TwoPair,
  OnePair,
  HighCard,
}

type Hand = {
  cards: string;
  bid: number;
  type: HandTypes;
};

const CardValues = 'AKQJT98765432';

const filename = '2023/day_07/input.ex.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const getHandType = (cards: string): HandTypes => {
  // TOUT FAUX !!
  if (cards.match(/.{5}/)) {
    return HandTypes.FiveOfAKind;
  } else if (cards.match(/.{4}/)) {
    return HandTypes.FourOfAKind;
  } else if (cards.match(/.{3}.{2}/) || cards.match(/.{1}.{3}/)) {
    return HandTypes.FullHouse;
  } else if (cards.match(/.{3}/)) {
    return HandTypes.ThreeOfAKind;
  } else if (cards.match(/.{2}.*.{2}/)) {
    return HandTypes.TwoPair;
  } else if (cards.match(/.{2}/)) {
    return HandTypes.OnePair;
  }
  return HandTypes.HighCard;
};

const hands: Array<Hand> = extractLines()
  .map((line: string): Array<string> => line.split(/ +/))
  .map(
    (values: Array<string>): Hand => ({
      cards: values[0],
      bid: +values[1],
      type: getHandType(values[0]),
    }),
  );


console.log(`result ${JSON.stringify(hands)}`);
