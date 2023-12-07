export enum HandTypes {
  HighCard,
  OnePair,
  TwoPair,
  ThreeOfAKind,
  FullHouse,
  FourOfAKind,
  FiveOfAKind,
}

export type Hand = {
  cards: string;
  bid: number;
  type: HandTypes;
  rank: number;
};
