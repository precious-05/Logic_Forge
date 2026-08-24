import {
  Target, Trophy, Brain, Bug, Repeat, Lightbulb,
  Database, GitBranch, Zap, Flame, Award,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { AchievementId } from '../../data/achievements'

const ICON_MAP: Record<string, LucideIcon> = {
  Target, Bug, Brain, Repeat, Lightbulb, Database, GitBranch, Trophy, Zap, Flame, Award,
}

export function AchievementIcon({ name, className = 'w-5 h-5' }: { name: string; className?: string }) {
  const Icon = ICON_MAP[name] ?? Award
  return <Icon className={className} />
}

export function getAchievementIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Award
}

export type { AchievementId }
