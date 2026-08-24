import type { Direction, GridCell } from '../types'

export interface RobotState {
  row: number
  col: number
  direction: Direction
  hasPackage: boolean
}

const DIRECTIONS: Direction[] = ['north', 'east', 'south', 'west']

const DELTA: Record<Direction, { dr: number; dc: number }> = {
  north: { dr: -1, dc: 0 },
  east: { dr: 0, dc: 1 },
  south: { dr: 1, dc: 0 },
  west: { dr: 0, dc: -1 },
}

export function findCell(grid: GridCell[][], type: GridCell['type']): { row: number; col: number } | null {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c].type === type) return { row: r, col: c }
    }
  }
  return null
}

export function initRobot(grid: GridCell[][], startDirection: Direction): RobotState {
  const start = findCell(grid, 'start')
  if (!start) throw new Error('No start cell')
  return { row: start.row, col: start.col, direction: startDirection, hasPackage: false }
}

function turnLeft(dir: Direction): Direction {
  const idx = DIRECTIONS.indexOf(dir)
  return DIRECTIONS[(idx + 3) % 4]
}

function turnRight(dir: Direction): Direction {
  const idx = DIRECTIONS.indexOf(dir)
  return DIRECTIONS[(idx + 1) % 4]
}

export interface SimulationStep {
  state: RobotState
  action: string
  success: boolean
  message?: string
}

export function simulateRobot(
  grid: GridCell[][],
  startDirection: Direction,
  instructions: ('forward' | 'left' | 'right')[]
): { steps: SimulationStep[]; success: boolean; message: string } {
  let state = initRobot(grid, startDirection)
  const steps: SimulationStep[] = [{ state: { ...state }, action: 'start', success: true }]
  const packagePos = findCell(grid, 'package')
  const exitPos = findCell(grid, 'exit')

  for (let i = 0; i < instructions.length; i++) {
    const instr = instructions[i]
    let action = ''

    if (instr === 'left') {
      state = { ...state, direction: turnLeft(state.direction) }
      action = 'Turn Left'
    } else if (instr === 'right') {
      state = { ...state, direction: turnRight(state.direction) }
      action = 'Turn Right'
    } else {
      const { dr, dc } = DELTA[state.direction]
      const newRow = state.row + dr
      const newCol = state.col + dc
      action = 'Move Forward'

      if (newRow < 0 || newRow >= grid.length || newCol < 0 || newCol >= grid[0].length) {
        steps.push({
          state: { ...state },
          action,
          success: false,
          message: `The robot hit a boundary at Step ${i + 1}. Check the instruction before this move.`,
        })
        return {
          steps,
          success: false,
          message: `The robot hit a boundary at Step ${i + 1}. Check the instruction before this move.`,
        }
      }

      if (grid[newRow][newCol].type === 'wall') {
        steps.push({
          state: { ...state },
          action,
          success: false,
          message: `The robot collided with a wall at Step ${i + 1}.`,
        })
        return {
          steps,
          success: false,
          message: `The robot collided with a wall at Step ${i + 1}.`,
        }
      }

      state = { ...state, row: newRow, col: newCol }

      if (packagePos && state.row === packagePos.row && state.col === packagePos.col) {
        state = { ...state, hasPackage: true }
      }
    }

    steps.push({ state: { ...state }, action, success: true })
  }

  if (!state.hasPackage) {
    return {
      steps,
      success: false,
      message: 'The robot did not collect the package. Review your path to the package location.',
    }
  }

  if (exitPos && (state.row !== exitPos.row || state.col !== exitPos.col)) {
    return {
      steps,
      success: false,
      message: 'The robot reached the wrong position. Check the instructions after collecting the package.',
    }
  }

  return { steps, success: true, message: 'Mission complete. The robot delivered the package.' }
}

export function getDirectionSymbol(dir: Direction): string {
  const symbols: Record<Direction, string> = { north: '↑', east: '→', south: '↓', west: '←' }
  return symbols[dir]
}

export function normalizeAnswer(text: string): string {
  return text.trim().replace(/\s+/g, ' ').toLowerCase()
}

export function arraysEqual<T>(a: T[], b: T[]): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i])
}
