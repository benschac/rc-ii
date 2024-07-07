/**
 * Step 3: Add rules
 * https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 *
 *
 * {@param board} - 2D array of booleans
 * Any live cell with fewer than two live neighbours dies, as if by underpopulation.
  Any live cell with two or three live neighbours lives on to the next generation.
  Any live cell with more than three live neighbours dies, as if by overpopulation.
  Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
 */
export function rules(board: boolean[][]) {
  const neighbours = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, -1],
    [-1, 1],
    [1, 1],
  ]
  const nextBoard = board.map((row, y) => {
    return row.map((cell, x) => {
      let liveNeighbours = 0
      for (const [offsetX, offsetY] of neighbours) {
        const neighbour = board?.[y + offsetY]?.[x + offsetX]
        if (neighbour === undefined) {
          continue
        }
        if (neighbour) {
          liveNeighbours += 1
        }
      }
      if (cell) {
        if (liveNeighbours < 2) {
          return false
        }
        if (liveNeighbours === 2 || liveNeighbours === 3) {
          return true
        }
        if (liveNeighbours > 3) {
          return false
        }
      } else {
        if (liveNeighbours === 3) {
          return true
        }
      }
      return cell
    })
  })
  return nextBoard
}
