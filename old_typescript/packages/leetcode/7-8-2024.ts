// https://leetcode.com/problems/water-bottles/submissions/1314369344/
function numWaterBottles(numBottles: number, numExchange: number): number {
  // max number of water bottles
  // 9 / 3 = 3
  // 3 /3 = 1
  // 1 / 3 = .3


  // 15 / 4 = 3 + 3
  // 6 / 4 == 1 + 2
  // 3 / 4 == .75

  // on each exchange get clean division and hold on to remainder for further division.
  let count = numBottles;
  let remaining = numBottles;

  while(remaining >= numExchange) {
      count += Math.floor(remaining / numExchange);
      remaining = Math.floor(remaining / numExchange) + remaining % numExchange;

      console.log(count, remaining)
  }

  return count;
};


console.log(numWaterBottles(15, 4)) // 1
// console.log(numWaterBottles(9, 3)) // 1
