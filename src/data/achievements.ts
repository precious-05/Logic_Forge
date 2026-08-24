export const ACHIEVEMENTS = [
  {
    id: 'first-mission',
    title: 'First Mission',
    description: 'Complete your first mission',
    icon: 'Target',
  },
  {
    id: 'bug-hunter',
    title: 'Bug Hunter',
    description: 'Fix your first logical bug',
    icon: 'Bug',
  },
  {
    id: 'logic-builder',
    title: 'Logic Builder',
    description: 'Build a complete logic flow',
    icon: 'Brain',
  },
  {
    id: 'pattern-master',
    title: 'Pattern Master',
    description: 'Identify a repeating pattern',
    icon: 'Repeat',
  },
  {
    id: 'problem-solver',
    title: 'Problem Solver',
    description: 'Analyze a problem correctly',
    icon: 'Lightbulb',
  },
  {
    id: 'memory-keeper',
    title: 'Memory Keeper',
    description: 'Master variable state changes',
    icon: 'Database',
  },
  {
    id: 'decision-maker',
    title: 'Decision Maker',
    description: 'Construct a correct decision flow',
    icon: 'GitBranch',
  },
  {
    id: 'level-complete',
    title: 'Logic Core Master',
    description: 'Complete Level 01',
    icon: 'Trophy',
  },
  {
    id: 'no-hints',
    title: 'Independent Thinker',
    description: 'Complete a mission without hints',
    icon: 'Zap',
  },
  {
    id: 'streak-3',
    title: 'On a Roll',
    description: 'Maintain a 3-day streak',
    icon: 'Flame',
  },
] as const

export type AchievementId = (typeof ACHIEVEMENTS)[number]['id']

export const ACHIEVEMENT_MAP = Object.fromEntries(
  ACHIEVEMENTS.map((a) => [a.id, a])
) as Record<AchievementId, (typeof ACHIEVEMENTS)[number]>
