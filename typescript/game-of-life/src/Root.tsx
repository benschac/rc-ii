import '@tamagui/core/reset.css'

import { Button, TamaguiProvider, XStack, YStack, getTokens } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'
import { Square } from 'tamagui'

import config from './tamagui.config'
import React from 'react'

export const Root = () => {
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <YStack f={1} ai="center" jc="center">
        <Button>Hello world</Button>
        <Board size={4} />
        <LinearGradient zIndex={-1} fullscreen colors={['red', 'blue']} />
      </YStack>
    </TamaguiProvider>
  )
}

/*
1. Step 1: create a grid of cells
 */

function Cell({
  x,
  y,
  value,
}: {
  x: number
  y: number
  value: boolean
}) {
  return (
    <Square
      borderColor="blue"
      borderWidth={0.5}
      bg={value ? 'red' : 'blue'}
      size="$4"
    >
      {/* {x}, {y} */}
      {value ? 't' : 'f'}
    </Square>
  )
}
// Array.from({ length: size })
//   .map((_, idx) => idx)
//   .map(() =>
//     Array.from({ length: size }).map(
//       (_, idx) => !!Math.round(Math.random())
//     )
//   )

/**
 * Step 2: create grid / Board
 *
 * w and h, square for now
 */
function Board({
  size,
}: {
  size: number
}) {
  const token = getTokens().size.$1.val
  const [generation, setGeneration] = React.useState(0)
  const [board, setBoard] = React.useState([
    [false, false, false, false],
    [true, true, true, false],
    [false, false, false, false],
    [false, false, false, false],
  ])
  const nextGeneration = () => setGeneration((prev) => prev + 1)
  const previousGeneration = () => setGeneration((prev) => prev - 1)
  const nextBoard = React.useMemo(() => {
    const prevBoard = [...board]
    return board.map((row, rowIdx) => {
      return row.map((_, columnIdx) => {
        return rules({ x: rowIdx, y: columnIdx, board: prevBoard })
      })
    })
  }, [board])
  const handleNext = () => {
    setBoard(nextBoard)
  }

  console.log(board)
  return (
    <>
      <Button onPress={handleNext}>Click</Button>
      <YStack w={size * token}>
        {board.map((row, rowIdx) => {
          return (
            <XStack
              key={`row-${
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                rowIdx
              }`}
            >
              {row.map((value, columnIdx) => {
                return (
                  <Cell
                    key={`${columnIdx}-${
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      rowIdx
                    }`}
                    value={value}
                    x={rowIdx}
                    y={columnIdx}
                  />
                )
              })}
            </XStack>
          )
        })}
      </YStack>
    </>
  )
}

/**
 * Step 3: Add rules
 * https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 *
 *
 * Any live cell with fewer than two live neighbours dies, as if by underpopulation.
  Any live cell with two or three live neighbours lives on to the next generation.
  Any live cell with more than three live neighbours dies, as if by overpopulation.
  Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
 */
function rules({
  x,
  y,
  board,
}: {
  x: number
  y: number
  board: boolean[][]
}): boolean {
  const neighbours = [
    // [x=1, y] right
    [1, 0],
    // [x=1, y=1] right corner
    [1, 1],
    // [x=0, y=1] bottom bottom
    [0, 1],
    // [x=-1, y=-1] bottom left
    [-1, -1],
    // [x=-1, y=0] left
    [-1, 0],
    // [x=-1, y=-1] top left
    [-1, -1],
    // [x=0, y=-1] top top
    [0, -1],
    // [x=1, y=-1] top right
    [1, -1],
  ]
  const cell: boolean = board[y][x]
  const liveNeighbours = neighbours.reduce((prev, [x, y]) => {
    const neighbour = board?.[x]?.[y] ?? undefined
    console.log(neighbour)
    if (neighbour) {
      return prev + 1
    }
    return prev
  }, 0)

  switch (cell) {
    case true: {
      console.log('live', { x, y }, liveNeighbours)
      if (liveNeighbours < 2) {
        //  Any live cell with fewer than two live neighbours dies, as if by underpopulation.
        return false
      }
      if (liveNeighbours === 2 || liveNeighbours === 3) {
        // Any live cell with two or three live neighbours lives on to the next generation.
        return true
      }
      if (liveNeighbours > 3) {
        // Any live cell with more than three live neighbours dies, as if by overpopulation.
        return false
      }
      break
    }
    case false: {
      if (liveNeighbours === 3) {
        // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
        return true
      }
    }
  }
  return false
}
