// // https://leetcode.com/problems/maximum-subarray/submissions/1301279550/
class Solution {
    func containsDuplicate(_ nums: [Int]) -> Bool {
        let toSet = Set(nums)

        return toSet.count != nums.count
    }
}
