import { useState, useEffect, useRef } from 'react'
import { Modal } from './Modal'
import {
  ArrowUp,
  CornerUpLeft,
  CornerUpRight,
  Package,
  LogOut,
  Play,
  RotateCcw,
  Bot,
  Compass,
  CheckCircle2,
  Sparkles,
  Info,
  Pause,
} from 'lucide-react'
import { Button } from './Button'
import { RobotAvatar } from '../challenges/RobotAvatar'
import type { Direction } from '../../types'

interface HowToPlayModalProps {
  open: boolean
  onClose: () => void
}

const DIR_ROTATE: Record<Direction, number> = {
  east: 0,
  south: 90,
  west: 180,
  north: -90,
}

const DIR_NAMES: Record<Direction, string> = {
  east: 'East (Facing Right)',
  south: 'South (Facing Down)',
  west: 'West (Facing Left)',
  north: 'North (Facing Up)',
}

const TURN_LEFT_MAP: Record<Direction, Direction> = {
  east: 'north',
  north: 'west',
  west: 'south',
  south: 'east',
}

const TURN_RIGHT_MAP: Record<Direction, Direction> = {
  east: 'south',
  south: 'west',
  west: 'north',
  north: 'east',
}

interface DemoStep {
  action: 'forward' | 'left' | 'right'
  label: string
  explanation: string
  row: number
  col: number
  dir: Direction
  hasPkg: boolean
  isExit?: boolean
}

const DEMO_STEPS: DemoStep[] = [
  {
    action: 'forward',
    label: 'MOVE FORWARD',
    explanation: 'Robot moves 1 tile forward in its current facing direction (East).',
    row: 0,
    col: 1,
    dir: 'east',
    hasPkg: false,
  },
  {
    action: 'forward',
    label: 'MOVE FORWARD',
    explanation: 'Robot advances another tile forward toward the corner.',
    row: 0,
    col: 2,
    dir: 'east',
    hasPkg: false,
  },
  {
    action: 'right',
    label: 'TURN RIGHT',
    explanation: 'Robot rotates 90° clockwise. It now faces South (Downwards).',
    row: 0,
    col: 2,
    dir: 'south',
    hasPkg: false,
  },
  {
    action: 'forward',
    label: 'MOVE FORWARD',
    explanation: 'Moving forward now moves the robot Downward along South.',
    row: 1,
    col: 2,
    dir: 'south',
    hasPkg: false,
  },
  {
    action: 'forward',
    label: 'MOVE FORWARD',
    explanation: 'Robot steps onto the Package tile and automatically collects it!',
    row: 2,
    col: 2,
    dir: 'south',
    hasPkg: true,
  },
  {
    action: 'left',
    label: 'TURN LEFT',
    explanation: 'Robot turns 90° counter-clockwise to face East toward the Exit.',
    row: 2,
    col: 2,
    dir: 'east',
    hasPkg: true,
  },
  {
    action: 'forward',
    label: 'MOVE FORWARD',
    explanation: 'Robot steps into the Exit Portal: Mission Accomplished!',
    row: 2,
    col: 3,
    dir: 'east',
    hasPkg: true,
    isExit: true,
  },
]

export function HowToPlayModal({ open, onClose }: HowToPlayModalProps) {
  const [activeTab, setActiveTab] = useState<'demo' | 'sandbox'>('demo')

  // Auto-demo state
  const [demoIndex, setDemoIndex] = useState(-1)
  const [demoPlaying, setDemoPlaying] = useState(false)
  const timerRef = useRef<number | null>(null)

  // Sandbox state
  const [sandboxPos, setSandboxPos] = useState({ row: 1, col: 0 })
  const [sandboxDir, setSandboxDir] = useState<Direction>('east')
  const [sandboxHasPkg, setSandboxHasPkg] = useState(false)
  const [sandboxLog, setSandboxLog] = useState('Select a command or build a sequence to test.')
  const [sandboxQueue, setSandboxQueue] = useState<('forward' | 'left' | 'right')[]>([])
  const [sandboxRunning, setSandboxRunning] = useState(false)

  // Auto-start demo when opening modal in demo tab
  useEffect(() => {
    if (!open) {
      if (timerRef.current) clearTimeout(timerRef.current)
      return
    }

    if (activeTab === 'demo') {
      const initialTimer = window.setTimeout(() => {
        setDemoPlaying(true)
      }, 400)
      return () => clearTimeout(initialTimer)
    }
  }, [open, activeTab])

  useEffect(() => {
    if (!demoPlaying || activeTab !== 'demo' || !open) {
      if (timerRef.current) clearTimeout(timerRef.current)
      return
    }

    if (demoIndex >= DEMO_STEPS.length - 1) {
      timerRef.current = window.setTimeout(() => {
        setDemoIndex(-1)
      }, 2500)
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current)
      }
    }

    timerRef.current = window.setTimeout(() => {
      setDemoIndex((prev) => prev + 1)
    }, 1100)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [demoPlaying, demoIndex, activeTab, open])

  const restartDemo = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setDemoIndex(-1)
    setDemoPlaying(true)
  }

  const toggleDemoPlay = () => {
    setDemoPlaying((prev) => !prev)
  }

  // Current demo visual state
  const currentDemoState =
    demoIndex >= 0 && demoIndex < DEMO_STEPS.length
      ? DEMO_STEPS[demoIndex]
      : {
          row: 0,
          col: 0,
          dir: 'east' as Direction,
          hasPkg: false,
          label: 'INITIAL POSITION',
          explanation: 'Robot starts at the Entrance facing East (Right). Click Play to see the solution in action.',
          action: 'forward' as const,
          isExit: false,
        }

  // Sandbox methods
  const sandboxMoveForward = () => {
    setSandboxPos((prev) => {
      let { row, col } = prev
      if (sandboxDir === 'east' && col < 3) col++
      else if (sandboxDir === 'west' && col > 0) col--
      else if (sandboxDir === 'south' && row < 3) row++
      else if (sandboxDir === 'north' && row > 0) row--

      if (row === 2 && col === 2) {
        setSandboxHasPkg(true)
      }
      return { row, col }
    })
    setSandboxLog(`Executed MOVE FORWARD. Current facing: ${DIR_NAMES[sandboxDir]}`)
  }

  const sandboxTurnLeft = () => {
    const nextDir = TURN_LEFT_MAP[sandboxDir]
    setSandboxDir(nextDir)
    setSandboxLog(`Executed TURN LEFT. Now facing: ${DIR_NAMES[nextDir]}`)
  }

  const sandboxTurnRight = () => {
    const nextDir = TURN_RIGHT_MAP[sandboxDir]
    setSandboxDir(nextDir)
    setSandboxLog(`Executed TURN RIGHT. Now facing: ${DIR_NAMES[nextDir]}`)
  }

  const resetSandbox = () => {
    setSandboxPos({ row: 1, col: 0 })
    setSandboxDir('east')
    setSandboxHasPkg(false)
    setSandboxQueue([])
    setSandboxLog('Sandbox reset to starting position facing East.')
  }

  const addSandboxQueue = (action: 'forward' | 'left' | 'right') => {
    if (sandboxQueue.length < 8) {
      setSandboxQueue((q) => [...q, action])
    }
  }

  const runSandboxQueue = async () => {
    if (sandboxQueue.length === 0 || sandboxRunning) return
    setSandboxRunning(true)

    let curRow = sandboxPos.row
    let curCol = sandboxPos.col
    let curDir = sandboxDir
    let curPkg = sandboxHasPkg

    for (let i = 0; i < sandboxQueue.length; i++) {
      const act = sandboxQueue[i]
      if (act === 'forward') {
        if (curDir === 'east' && curCol < 3) curCol++
        else if (curDir === 'west' && curCol > 0) curCol--
        else if (curDir === 'south' && curRow < 3) curRow++
        else if (curDir === 'north' && curRow > 0) curRow--

        if (curRow === 2 && curCol === 2) curPkg = true
      } else if (act === 'left') {
        curDir = TURN_LEFT_MAP[curDir]
      } else if (act === 'right') {
        curDir = TURN_RIGHT_MAP[curDir]
      }

      setSandboxPos({ row: curRow, col: curCol })
      setSandboxDir(curDir)
      setSandboxHasPkg(curPkg)
      setSandboxLog(`Step ${i + 1}/${sandboxQueue.length}: Executed ${act.toUpperCase()}`)
      await new Promise((r) => setTimeout(r, 600))
    }

    setSandboxRunning(false)
  }

  return (
    <Modal open={open} onClose={onClose} title="Cadet Field Manual: How to Control the Robot" size="lg">
      <div className="space-y-5 max-h-[75vh] overflow-y-auto pr-1 text-sm">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 p-1 bg-forge-bg rounded-xl border border-forge-border">
          <button
            onClick={() => setActiveTab('demo')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'demo'
                ? 'bg-forge-accent/20 text-forge-accent border border-forge-accent/40 shadow-sm'
                : 'text-forge-muted hover:text-forge-text'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            Watch Automated Live Demo
          </button>
          <button
            onClick={() => setActiveTab('sandbox')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'sandbox'
                ? 'bg-forge-accent/20 text-forge-accent border border-forge-accent/40 shadow-sm'
                : 'text-forge-muted hover:text-forge-text'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            Interactive Practice Sandbox
          </button>
        </div>

        {/* TAB 1: AUTOMATED LIVE DEMO */}
        {activeTab === 'demo' && (
          <div className="space-y-4 animate-fade-in">
            {/* Concept Banner */}
            <div className="p-3.5 rounded-xl bg-forge-card/90 border border-forge-accent/30 flex items-start gap-3">
              <Info className="w-5 h-5 text-forge-accent shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-forge-text text-xs sm:text-sm">
                  Core Rule: Robot Moves in the Direction It Faces
                </h4>
                <p className="text-forge-muted text-xs mt-1 leading-relaxed">
                  Unlike traditional keys, the robot does not have a static "Down" command. To navigate downwards, turn the robot to face <strong>South (Down)</strong>, and then command it to <strong>Move Forward</strong>.
                </p>
              </div>
            </div>

            {/* Live Visual Simulation Stage */}
            <div className="p-4 rounded-xl bg-forge-surface border border-forge-border relative overflow-hidden">
              {/* Header Bar */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-forge-border/40">
                <div className="flex items-center gap-2 text-xs font-mono text-forge-accent">
                  <span className="w-2 h-2 rounded-full bg-forge-accent animate-ping" />
                  <span>SIMULATION DEMO // STEP {demoIndex + 1} OF {DEMO_STEPS.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleDemoPlay}
                    className="p-1.5 rounded-lg bg-forge-card border border-forge-border hover:border-forge-accent/40 text-forge-text cursor-pointer flex items-center gap-1 text-xs font-mono"
                    title={demoPlaying ? 'Pause Demo' : 'Play Demo'}
                  >
                    {demoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{demoPlaying ? 'Pause' : 'Resume'}</span>
                  </button>
                  <button
                    onClick={restartDemo}
                    className="p-1.5 rounded-lg bg-forge-card border border-forge-border hover:border-forge-accent/40 text-forge-muted hover:text-forge-text cursor-pointer text-xs font-mono flex items-center gap-1"
                    title="Replay from beginning"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restart</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                {/* 4x3 Simulation Grid */}
                <div className="md:col-span-5 flex justify-center">
                  <div className="relative p-2 rounded-xl bg-forge-card border border-forge-border/80 shadow-lg">
                    <div className="grid grid-cols-4 gap-1.5">
                      {[0, 1, 2].map((r) =>
                        [0, 1, 2, 3].map((c) => {
                          const isRobot = currentDemoState.row === r && currentDemoState.col === c
                          const isStart = r === 0 && c === 0
                          const isPkg = r === 2 && c === 2 && !currentDemoState.hasPkg
                          const isExit = r === 2 && c === 3

                          return (
                            <div
                              key={`${r}-${c}`}
                              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center border transition-all duration-300 relative ${
                                isRobot
                                  ? 'bg-forge-accent/20 border-forge-accent shadow-[0_0_12px_rgba(0,212,170,0.3)]'
                                  : isExit
                                    ? 'bg-forge-success/15 border-forge-success/50'
                                    : isPkg
                                      ? 'bg-forge-warning/15 border-forge-warning/50'
                                      : isStart
                                        ? 'bg-forge-accent/10 border-forge-accent/40'
                                        : 'bg-forge-surface/80 border-forge-border/40'
                              }`}
                            >
                              {isRobot ? (
                                <div
                                  style={{
                                    transform: `rotate(${DIR_ROTATE[currentDemoState.dir]}deg)`,
                                    transition: 'transform 0.3s cubic-bezier(0.34, 1.2, 0.64, 1)',
                                  }}
                                >
                                  <RobotAvatar
                                    direction={currentDemoState.dir}
                                    hasPackage={currentDemoState.hasPkg}
                                    missionSuccess={currentDemoState.isExit}
                                  />
                                </div>
                              ) : isPkg ? (
                                <Package className="w-4 h-4 text-forge-warning animate-pulse" />
                              ) : isExit ? (
                                <LogOut className="w-4 h-4 text-forge-success" />
                              ) : isStart ? (
                                <Compass className="w-4 h-4 text-forge-accent/60" />
                              ) : null}
                            </div>
                          )
                        })
                      )}
                    </div>
                  </div>
                </div>

                {/* Live Step Explanation & Script Queue */}
                <div className="md:col-span-7 space-y-3">
                  {/* Current Active Command Callout */}
                  <div className="p-3 rounded-xl bg-forge-card border border-forge-accent/40 neon-glow-accent">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-forge-accent">
                        Active Command
                      </span>
                      {currentDemoState.isExit && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-forge-success/20 text-forge-success ml-auto">
                          SUCCESS
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-sm font-bold text-forge-text flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-forge-warning" />
                      {currentDemoState.label}
                    </p>
                    <p className="text-xs text-forge-muted mt-1 leading-relaxed">
                      {currentDemoState.explanation}
                    </p>
                  </div>

                  {/* Step-by-Step Program Preview Queue */}
                  <div>
                    <p className="text-[11px] font-mono text-forge-muted mb-1.5">Executed Algorithm Sequence:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {DEMO_STEPS.map((step, idx) => {
                        const isCurrent = idx === demoIndex
                        const isPassed = idx < demoIndex
                        return (
                          <div
                            key={idx}
                            className={`px-2 py-1 rounded text-[10px] font-mono transition-all flex items-center gap-1 ${
                              isCurrent
                                ? 'bg-forge-accent text-forge-bg font-bold shadow-[0_0_10px_rgba(0,212,170,0.6)] scale-105'
                                : isPassed
                                  ? 'bg-forge-success/15 text-forge-success border border-forge-success/40'
                                  : 'bg-forge-card text-forge-muted border border-forge-border'
                            }`}
                          >
                            <span>{idx + 1}.</span>
                            <span>{step.action === 'forward' ? 'FWD' : step.action === 'left' ? 'LEFT ↺' : 'RIGHT ↻'}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE PRACTICE SANDBOX */}
        {activeTab === 'sandbox' && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-4 rounded-xl bg-forge-surface border border-forge-border">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-forge-border/40">
                <span className="text-xs font-mono font-bold text-forge-accent flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-forge-accent" />
                  PRACTICE ARENA (Test Commands Live)
                </span>
                <button
                  onClick={resetSandbox}
                  className="text-xs text-forge-muted hover:text-forge-text flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Reset Grid
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 justify-around bg-forge-bg/80 p-4 rounded-xl">
                {/* 4x4 Interactive Grid */}
                <div className="relative p-2 rounded-xl bg-forge-card border border-forge-border">
                  <div className="grid grid-cols-4 gap-1.5">
                    {[0, 1, 2, 3].map((r) =>
                      [0, 1, 2, 3].map((c) => {
                        const isRobot = sandboxPos.row === r && sandboxPos.col === c
                        const isPackage = r === 2 && c === 2 && !sandboxHasPkg
                        const isExit = r === 3 && c === 3

                        return (
                          <div
                            key={`${r}-${c}`}
                            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center border transition-all ${
                              isRobot
                                ? 'bg-forge-accent/20 border-forge-accent/60 shadow-[0_0_10px_rgba(0,212,170,0.3)]'
                                : isExit
                                  ? 'bg-forge-success/15 border-forge-success/40'
                                  : isPackage
                                    ? 'bg-forge-warning/15 border-forge-warning/40'
                                    : 'bg-forge-surface border-forge-border/40'
                            }`}
                          >
                            {isRobot ? (
                              <div
                                style={{
                                  transform: `rotate(${DIR_ROTATE[sandboxDir]}deg)`,
                                  transition: 'transform 0.3s ease',
                                }}
                              >
                                <RobotAvatar direction={sandboxDir} hasPackage={sandboxHasPkg} />
                              </div>
                            ) : isPackage ? (
                              <Package className="w-4 h-4 text-forge-warning" />
                            ) : isExit ? (
                              <LogOut className="w-4 h-4 text-forge-success" />
                            ) : null}
                          </div>
                        )
                      })
                    )}
                  </div>
                </div>

                {/* Instant Actions & Sequence Builder */}
                <div className="flex flex-col gap-3 w-full sm:w-auto">
                  <div>
                    <p className="text-[11px] font-mono text-forge-muted mb-1.5">Instant Action Buttons:</p>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" icon={CornerUpLeft} variant="secondary" onClick={sandboxTurnLeft} disabled={sandboxRunning}>
                        Turn Left
                      </Button>
                      <Button size="sm" icon={ArrowUp} onClick={sandboxMoveForward} disabled={sandboxRunning}>
                        Move Forward
                      </Button>
                      <Button size="sm" icon={CornerUpRight} variant="secondary" onClick={sandboxTurnRight} disabled={sandboxRunning}>
                        Turn Right
                      </Button>
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-mono text-forge-muted mb-1">Queue & Execute Sequence:</p>
                    <div className="flex flex-wrap gap-1.5 mb-2 min-h-[32px] p-2 rounded-lg bg-forge-card border border-forge-border">
                      {sandboxQueue.length === 0 && (
                        <span className="text-[11px] text-forge-muted self-center">Click buttons below to add to queue</span>
                      )}
                      {sandboxQueue.map((act, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-forge-accent/15 text-forge-accent border border-forge-accent/30 font-mono text-[10px]">
                          {act.toUpperCase()}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => addSandboxQueue('forward')}
                        className="px-2 py-1 rounded text-[11px] font-mono bg-forge-card border border-forge-border hover:border-forge-accent/40 text-forge-text cursor-pointer"
                        disabled={sandboxRunning}
                      >
                        + Forward
                      </button>
                      <button
                        onClick={() => addSandboxQueue('left')}
                        className="px-2 py-1 rounded text-[11px] font-mono bg-forge-card border border-forge-border hover:border-forge-accent/40 text-forge-text cursor-pointer"
                        disabled={sandboxRunning}
                      >
                        + Left
                      </button>
                      <button
                        onClick={() => addSandboxQueue('right')}
                        className="px-2 py-1 rounded text-[11px] font-mono bg-forge-card border border-forge-border hover:border-forge-accent/40 text-forge-text cursor-pointer"
                        disabled={sandboxRunning}
                      >
                        + Right
                      </button>
                      <Button size="sm" icon={Play} onClick={runSandboxQueue} loading={sandboxRunning} disabled={sandboxQueue.length === 0 || sandboxRunning}>
                        Run Sequence
                      </Button>
                    </div>
                  </div>

                  {/* Status telemetry log */}
                  <div className="text-xs font-mono p-2.5 rounded-lg bg-forge-card border border-forge-border text-forge-accent">
                    {sandboxLog}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Command Reference Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-forge-card border border-forge-border">
            <p className="font-mono text-xs font-bold text-forge-accent flex items-center gap-1 mb-1">
              <ArrowUp className="w-3.5 h-3.5" /> MOVE FORWARD
            </p>
            <p className="text-[11px] text-forge-muted leading-relaxed">
              Advances the robot 1 tile forward in its current facing direction.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-forge-card border border-forge-border">
            <p className="font-mono text-xs font-bold text-indigo-300 flex items-center gap-1 mb-1">
              <CornerUpLeft className="w-3.5 h-3.5" /> TURN LEFT
            </p>
            <p className="text-[11px] text-forge-muted leading-relaxed">
              Rotates the robot 90° counter-clockwise in place without moving tiles.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-forge-card border border-forge-border">
            <p className="font-mono text-xs font-bold text-forge-warning flex items-center gap-1 mb-1">
              <CornerUpRight className="w-3.5 h-3.5" /> TURN RIGHT
            </p>
            <p className="text-[11px] text-forge-muted leading-relaxed">
              Rotates the robot 90° clockwise in place without moving tiles.
            </p>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="pt-2 flex items-center justify-between border-t border-forge-border/40">
          <span className="text-xs text-forge-muted flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-forge-success" />
            Pick up the package, then proceed to the exit portal.
          </span>
          <Button onClick={onClose} size="md">
            Understood, Start Mission
          </Button>
        </div>
      </div>
    </Modal>
  )
}
