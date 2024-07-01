// https://leetcode.com/problems/three-consecutive-odds/
impl Solution {
  pub fn three_consecutive_odds(arr: Vec<i32>) -> bool {
     let mut count = 0;

     for i in 0..arr.len() {

      match arr[i] % 2 {
          1 => count += 1,
          _ => count = 0 ,
      }
      if count >= 3 {
      return true;
     }


     }

      false

  }
}
