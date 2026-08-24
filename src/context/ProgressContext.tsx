import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import type { UserProgress } from '../types'
import {
  loadProgress,
  saveProgress,
  completeMission as completeMissionUtil,
  resetProgress as resetProgressUtil,
  isMissionUnlocked,
} from '../hooks/useProgress'

interface ProgressContextValue {
  progress: UserProgress
  completeMission: (missionId: string, baseXp: number, hintsUsed: number) => void
  useHint: (missionId: string) => number
  getHintsUsed: (missionId: string) => number
  setCurrentMission: (missionId: string) => void
  isUnlocked: (missionId: string) => boolean
  resetProgress: () => void
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(() => loadProgress())

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  const completeMission = useCallback((missionId: string, baseXp: number, hintsUsed: number) => {
    setProgress((prev) => completeMissionUtil(prev, missionId, baseXp, hintsUsed))
  }, [])

  const useHint = useCallback((missionId: string) => {
    let newCount = 0
    setProgress((prev) => {
      newCount = (prev.hintsUsed[missionId] ?? 0) + 1
      return {
        ...prev,
        hintsUsed: { ...prev.hintsUsed, [missionId]: newCount },
      }
    })
    return newCount
  }, [])

  const getHintsUsed = useCallback(
    (missionId: string) => progress.hintsUsed[missionId] ?? 0,
    [progress.hintsUsed]
  )

  const setCurrentMission = useCallback((missionId: string) => {
    setProgress((prev) => ({ ...prev, currentMission: missionId }))
  }, [])

  const isUnlocked = useCallback(
    (missionId: string) => isMissionUnlocked(missionId, progress),
    [progress]
  )

  const resetProgress = useCallback(() => {
    setProgress(resetProgressUtil())
  }, [])

  return (
    <ProgressContext.Provider
      value={{
        progress,
        completeMission,
        useHint,
        getHintsUsed,
        setCurrentMission,
        isUnlocked,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export function useGameProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useGameProgress must be used within ProgressProvider')
  return ctx
}
