const STORAGE_KEY = 'logicforge-progress'

import type { UserProgress, MissionResult } from '../types'
import { calculateLevel } from '../types'

export const DEFAULT_PROGRESS: UserProgress = {
  xp: 0,
  level: 1,
  streak: 0,
  lastPlayedDate: null,
  completedMissions: [],
  missionResults: {},
  achievements: [],
  hintsUsed: {},
  currentMission: 'mission-01',
}

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_PROGRESS }
    const parsed = JSON.parse(raw) as UserProgress
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      level: calculateLevel(parsed.xp ?? 0),
    }
  } catch {
    return { ...DEFAULT_PROGRESS }
  }
}

export function saveProgress(progress: UserProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function isMissionUnlocked(missionId: string, progress: UserProgress): boolean {
  if (missionId === 'mission-01') return true
  const missions = [
    'mission-01', 'mission-02', 'mission-03', 'mission-04',
    'mission-05', 'mission-06', 'mission-07', 'mission-08', 'boss-01',
  ]
  const idx = missions.indexOf(missionId)
  if (idx <= 0) return true
  return progress.completedMissions.includes(missions[idx - 1])
}

export function calculateMissionScore(baseXp: number, hintsUsed: number): { xp: number; score: number } {
  const penalty = hintsUsed * 15
  const xp = Math.max(Math.floor(baseXp * 0.5), baseXp - penalty)
  const score = Math.max(0, 100 - hintsUsed * 20)
  return { xp, score }
}

export function updateStreak(progress: UserProgress): UserProgress {
  const today = new Date().toISOString().split('T')[0]
  if (progress.lastPlayedDate === today) return progress

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]

  const newStreak =
    progress.lastPlayedDate === yesterdayStr ? progress.streak + 1 : 1

  return { ...progress, streak: newStreak, lastPlayedDate: today }
}

export function checkAchievements(
  progress: UserProgress,
  missionId: string,
  hintsUsed: number
): string[] {
  const newAchievements: string[] = []
  const add = (id: string) => {
    if (!progress.achievements.includes(id) && !newAchievements.includes(id)) {
      newAchievements.push(id)
    }
  }

  if (progress.completedMissions.length >= 1 || missionId) add('first-mission')
  if (missionId === 'mission-05') add('bug-hunter')
  if (missionId === 'mission-06') add('decision-maker')
  if (missionId === 'mission-07') add('pattern-master')
  if (missionId === 'mission-02' || missionId === 'mission-03') add('problem-solver')
  if (missionId === 'mission-08') add('memory-keeper')
  if (['mission-01', 'mission-04', 'mission-06', 'boss-01'].includes(missionId)) add('logic-builder')
  if (missionId === 'boss-01') add('level-complete')
  if (hintsUsed === 0) add('no-hints')
  if (progress.streak >= 3) add('streak-3')

  return newAchievements
}

export function completeMission(
  progress: UserProgress,
  missionId: string,
  baseXp: number,
  hintsUsed: number
): UserProgress {
  const { xp, score } = calculateMissionScore(baseXp, hintsUsed)
  const result: MissionResult = {
    missionId,
    xpEarned: xp,
    hintsUsed,
    completedAt: new Date().toISOString(),
    score,
  }

  let updated: UserProgress = updateStreak(progress)
  const newXp = updated.xp + xp
  const completedMissions = updated.completedMissions.includes(missionId)
    ? updated.completedMissions
    : [...updated.completedMissions, missionId]

  const newAchievements = checkAchievements(
    { ...updated, completedMissions },
    missionId,
    hintsUsed
  )

  const missions = [
    'mission-01', 'mission-02', 'mission-03', 'mission-04',
    'mission-05', 'mission-06', 'mission-07', 'mission-08', 'boss-01',
  ]
  const idx = missions.indexOf(missionId)
  const nextMission = idx >= 0 && idx < missions.length - 1 ? missions[idx + 1] : null

  updated = {
    ...updated,
    xp: newXp,
    level: calculateLevel(newXp),
    completedMissions,
    missionResults: { ...updated.missionResults, [missionId]: result },
    achievements: [...new Set([...updated.achievements, ...newAchievements])],
    currentMission: nextMission ?? updated.currentMission,
  }

  saveProgress(updated)
  return updated
}

export function resetProgress(): UserProgress {
  saveProgress(DEFAULT_PROGRESS)
  return { ...DEFAULT_PROGRESS }
}
