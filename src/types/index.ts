export type ChallengeType =
  | 'sequence'
  | 'problem-analysis'
  | 'debug'
  | 'decision'
  | 'repetition'
  | 'variables'
  | 'pattern'
  | 'boss'

export type MissionPhase = 'brief' | 'understand' | 'logic' | 'pseudocode' | 'challenge' | 'concept'

export interface UnderstandQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  feedback?: { correct: string; incorrect: string }
}

export interface LogicBlock {
  id: string
  label: string
  type: 'start' | 'input' | 'process' | 'decision' | 'output' | 'end'
}

export interface PseudocodeLine {
  id: string
  text: string
  editable?: boolean
  placeholder?: string
  correctAnswer?: string
  acceptedAnswers?: string[]
  formatHint?: string
}

export interface Hint {
  level: number
  text: string
}

export interface GridCell {
  type: 'empty' | 'wall' | 'start' | 'package' | 'exit'
}

export type Direction = 'north' | 'east' | 'south' | 'west'

export interface RobotConfig {
  grid: GridCell[][]
  startDirection: Direction
  solution: ('forward' | 'left' | 'right')[]
}

export interface DebugStep {
  id: string
  text: string
  isBug?: boolean
}

export interface DecisionNode {
  id: string
  label: string
  type: 'condition' | 'action' | 'branch'
}

export interface VariableState {
  name: string
  value: number | string
  type: 'number' | 'string'
}

export interface VariableScenario {
  id: string
  question: string
  options: string[]
  correctIndex: number
  stateBefore: VariableState[]
  stateAfter?: VariableState[]
  operation: string
}

export interface BossPhase {
  id: string
  type: 'understand' | 'logic' | 'pseudocode' | 'test'
  title: string
}

export interface Challenge {
  id: string
  title: string
  description: string
  difficulty: 1 | 2 | 3 | 4 | 5
  concept: string
  type: ChallengeType
  problemStatement: string
  xp: number
  hints: Hint[]
  conceptExplanation: string
  conceptsLearned: string[]
  optionalTimer?: number
  understand?: UnderstandQuestion[]
  logicBlocks?: { blocks: LogicBlock[]; correctOrder: string[] }
  pseudocode?: {
    template: PseudocodeLine[]
    correctLines?: string[]
  }
  robot?: RobotConfig
  debug?: {
    steps: DebugStep[]
    bugStepId: string
    fixOptions: { id: string; text: string; correct?: boolean }[]
  }
  decision?: {
    scenario: string
    condition: string
    branches: { label: string; action: string }[]
    correctFlow: string[]
  }
  repetition?: {
    pattern: string[]
    question: string
    options: string[]
    correctIndex: number
    loopRepresentation: string
  }
  variables?: {
    initialState: VariableState[]
    scenarios: VariableScenario[]
  }
  pattern?: {
    sequence: (number | string)[]
    question: string
    options: string[]
    correctIndex: number
  }
  boss?: {
    phases: BossPhase[]
    testCases: { input: Record<string, unknown>; expectedOutput: string }[]
    pseudocodeSolution: string[]
    logicOrder: string[]
    understandQuestions: UnderstandQuestion[]
  }
  isBoss?: boolean
}

export interface Mission {
  id: string
  number: number
  title: string
  subtitle: string
  challenge: Challenge
  locked?: boolean
}

export interface Level {
  id: string
  number: number
  title: string
  subtitle: string
  description: string
  missions: Mission[]
  locked?: boolean
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  condition: (progress: UserProgress) => boolean
}

export interface MissionResult {
  missionId: string
  xpEarned: number
  hintsUsed: number
  completedAt: string
  score: number
}

export interface UserProgress {
  xp: number
  level: number
  streak: number
  lastPlayedDate: string | null
  completedMissions: string[]
  missionResults: Record<string, MissionResult>
  achievements: string[]
  hintsUsed: Record<string, number>
  currentMission: string | null
}

export const XP_PER_LEVEL = 500

export function xpForNextLevel(currentLevel: number): number {
  return currentLevel * XP_PER_LEVEL
}

export function calculateLevel(xp: number): number {
  let level = 1
  let remaining = xp
  while (remaining >= level * XP_PER_LEVEL) {
    remaining -= level * XP_PER_LEVEL
    level++
  }
  return level
}

export function xpProgressInLevel(xp: number): { current: number; needed: number; percent: number } {
  const level = calculateLevel(xp)
  let xpBeforeLevel = 0
  for (let i = 1; i < level; i++) {
    xpBeforeLevel += i * XP_PER_LEVEL
  }
  const current = xp - xpBeforeLevel
  const needed = level * XP_PER_LEVEL
  return { current, needed, percent: Math.min(100, (current / needed) * 100) }
}
