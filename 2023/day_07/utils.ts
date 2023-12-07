export type Race = {
  duration: number;
  distance: number;
};

const testDistanceForHoldDuration = (holdDuration: number, race: Race): boolean =>
  (race.duration - holdDuration) * holdDuration > race.distance;

export const getFirstAndLastSolution = (race: Race): Array<number> => {
  const result = [];
  for (let curHoldDuration = 1; curHoldDuration < race.duration; curHoldDuration++){
    if (testDistanceForHoldDuration(curHoldDuration, race)) {
      result[0] = curHoldDuration;
      break;
    }
  }
  for (let curHoldDuration = race.duration - 1; curHoldDuration > 0; curHoldDuration--){
    if (testDistanceForHoldDuration(curHoldDuration, race)) {
      result[1] = curHoldDuration;
      break;
    }
  }
  return result;
}
