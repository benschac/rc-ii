/**
 * from daily leetcode challenge 06-26-2024
 * @param nums
 * @returns
 */
function containsDuplicate(nums: number[]): boolean {
  return nums.length !== new Set(nums).size;
}
// https://leetcode.com/problems/maximum-subarray/submissions/1301279550/
function maxSubArray(nums: number[]): number {
  if (nums.length === 1) {
    return nums[0];
  }

  let highestSum = nums[0] + nums[1]

  // A subarray is a contiguous non-empty sequence of elements within an array.
  // [-2,1,-3,4,-1,2,1,-5,4]
  // console.log({highestSum, tmp}, 'start')
  let i = 2
  let tmp = highestSum;
  while (i <= nums.length) {
    tmp += nums[i]
    if (tmp > highestSum) {
      highestSum = tmp;
    } else if (tmp < highestSum) {
      tmp = nums[i + 1] + nums[i + 1]
      i += 2;
      continue
    }
    i++
  }
  const wholeArray = nums.reduce((prev, curr) => {
      const newLocal = prev + curr;
      return newLocal;
  }, 0)
  return highestSum > wholeArray ? highestSum : wholeArray
}

console.log(maxSubArray([-2, 1]))
