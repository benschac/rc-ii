/**
 * Definition for a binary tree node.
 * class TreeNode {
 * val: number
 * left: TreeNode | null
 * right: TreeNode | null
 * constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 * this.val = (val===undefined ? 0 : val)
 * this.left = (left===undefined ? null : left)
 * this.right = (right===undefined ? null : right)
 * }
 * }
 */

function maxDepth(root: TreeNode | null): number {
  if (!root) {
    return 0
  }
  let deep = 0
  let stack: [TreeNode, number][] = [[root, 1]]
  while (stack.length > 0) {
    let [node, depth] = stack.pop()!
    deep = Math.max(depth, deep)
    if (node.left) {
      stack.push([node.left, depth + 1])
    }
    if (node.right) {
      stack.push([node.right, depth + 1])
    }
  }
  return deep
}
