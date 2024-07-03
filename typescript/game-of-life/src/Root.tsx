import '@tamagui/core/reset.css'
import { rules } from './rules'

import {
  Button,
  Spacer,
  TamaguiProvider,
  XStack,
  YStack,
  getTokens,
  Text,
} from 'tamagui'
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
      size="$6"
    >
      <Text>
        x:{x}, y:{y}
      </Text>
    </Square>
  )
}

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
  const twobytwoBoard = [
    [false, false],
    [false, true],
  ]
  // https://conwaylife.com/wiki/Blinker
  // const threeByThreeBoard = [
  //   [false, true, false],
  //   [false, true, false],
  //   [false, true, false],
  // ]
  const beaconBoard = [
    [true, true, false, false],
    [true, true, false, false],
    [false, false, true, true],
    [false, false, true, true],
  ]
  const initialBoard = beaconBoard

  const token = getTokens().size.$1.val
  const [board, setBoard] = React.useState([initialBoard])
  const [generation, setGeneration] = React.useState(0)

  const nextBoard = React.useMemo(() => {
    return rules(board[board.length - 1])
  }, [board])

  const handleNext = () => {
    setBoard(board.concat([nextBoard]))
    setGeneration(generation + 1)
  }
  const handlePrevious = () => {
    setBoard(board.slice(0, -1))
    setGeneration(generation - 1)
  }

  return (
    <>
      <YStack w={size * token}>
        {board[board.length - 1].map((row, rowIdx) => {
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
                    x={columnIdx}
                    y={rowIdx}
                  />
                )
              })}
            </XStack>
          )
        })}
      </YStack>
      <XStack f={1}>
        <Button onPress={handlePrevious}>previous</Button>
        <Spacer />
        <Button onPress={handleNext}>Next</Button>
      </XStack>
    </>
  )
}
