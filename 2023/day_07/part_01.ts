import { readFileSync } from 'fs';
import { Hand, HandTypes } from './utils';

const CardValues = 'AKQJT98765432';

const filename = '2023/day_07/input.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const getHandType = (cards: string): HandTypes => {
  const qties = cards
    .split('')
    .reduce((qties, curChar) => ({ ...qties, [curChar]: curChar in qties ? qties[curChar] + 1 : 1 }), {});
  if (Object.values(qties).includes(5)) {
    return HandTypes.FiveOfAKind;
  } else if (Object.values(qties).includes(4)) {
    return HandTypes.FourOfAKind;
  } else if (Object.values(qties).includes(3) && Object.values(qties).includes(2)) {
    return HandTypes.FullHouse;
  } else if (Object.values(qties).includes(3)) {
    return HandTypes.ThreeOfAKind;
  } else if (Object.values(qties).filter((x) => x === 2).length === 2) {
    return HandTypes.TwoPair;
  } else if (Object.values(qties).includes(2)) {
    return HandTypes.OnePair;
  }
  return HandTypes.HighCard;
};

const lineToHand = (line: string): Hand => {
  const values: Array<string> = line.split(/ +/);
  return {
    cards: values[0],
    bid: +values[1],
    type: getHandType(values[0]),
    rank: undefined,
  };
};

const compareHands = (hand1: Hand, hand2: Hand): number => {
  for (const i of [0, 1, 2, 3, 4]) {
    const diff = CardValues.indexOf(hand2.cards[i]) - CardValues.indexOf(hand1.cards[i]);
    if (diff !== 0) {
      return diff;
    }
  }
  return 0;
};

const hands: Array<Hand> = extractLines().map(lineToHand);

let rank: number = 1;
for (const handType of Object.values(HandTypes)) {
  hands
    .filter((hand: Hand) => hand.type === handType)
    .sort(compareHands)
    .forEach((hand) => (hand.rank = rank++));
}

const result = hands.reduce((sum: number, curHand: Hand): number => sum + curHand.bid * curHand.rank, 0);

console.log(`result ${result}`);
