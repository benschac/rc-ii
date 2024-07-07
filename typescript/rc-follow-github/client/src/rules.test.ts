import { expect, test } from 'vitest'
import { rules } from './rules'

test('blinker 3x3 game of life', () => {
  // verticle blinker
  const board = [
    [false, true, false],
    [false, true, false],
    [false, true, false],
  ]

  // horizontal blinker
  const nextBoard = [
    [false, false, false],
    [true, true, true],
    [false, false, false],
  ]

  expect(rules(board)).toEqual(nextBoard)
})

test('block 2x2 game of life', () => {
  const board = [
    [true, true],
    [true, true],
  ]

  const nextBoard = [
    [true, true],
    [true, true],
  ]

  expect(rules(board)).toEqual(nextBoard)
})

test('beacon 4x4 game of life', () => {
  const board = [
    [true, true, false, false],
    [true, true, false, false],
    [false, false, true, true],
    [false, false, true, true],
  ]

  const nextBoard = [
    [true, true, false, false],
    [true, false, false, false],
    [false, false, false, true],
    [false, false, true, true],
  ]

  expect(rules(board)).toEqual(nextBoard)
})
