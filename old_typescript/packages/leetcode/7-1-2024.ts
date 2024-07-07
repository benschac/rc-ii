/**
 *
 * @param arr
 * Given an integer array arr, return true if there are three consecutive odd numbers in the array. Otherwise, return false.


Example 1:

Input: arr = [2,6,4,1]
Output: false
Explanation: There are no three consecutive odds.
Example 2:

Input: arr = [1,2,34,3,4,5,7,23,12]
Output: true
Explanation: [5,7,23] are three consecutive odds.


Constraints:

1 <= arr.length <= 1000
1 <= arr[i] <= 1000
 * @returns
 */
function threeConsecutiveOdds(arr: number[]): boolean {
  let consecutiveCount = 0;
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (element % 2 !== 0) {
      consecutiveCount += 1;
    } else {
      consecutiveCount = 0;
    }

    if (consecutiveCount === 3) {
      return true;
    }
  }

  return consecutiveCount >= 3;
}

// // console.log(threeConsecutiveOdds([2, 6, 4, 1]));
// console.log(threeConsecutiveOdds([1, 2, 34, 3, 4, 5, 7, 23, 12]));
// https://leetcode.com/problems/word-break/

/**
 *
 *Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.



Example 1:

Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".
Example 2:

Input: s = "applepenapple", wordDict = ["apple","pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
Note that you are allowed to reuse a dictionary word.
Example 3:

Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false


Constraints:

1 <= s.length <= 300
1 <= wordDict.length <= 1000
1 <= wordDict[i].length <= 20
s and wordDict[i] consist of only lowercase English letters.
All the strings of wordDict are unique.
 * @param wordDict
 * @returns
 */

function wordBreak(s: string, wordDict: string[]): boolean {
  return false;
}

console.log(wordBreak("leetcode", ["leet", "code"]));
console.log(wordBreak("applepenapple", ["apple", "pen"]));
