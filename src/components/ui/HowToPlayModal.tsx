import { useState } from 'react'
import { Modal } from './Modal'
import { ArrowUp, CornerUpLeft, CornerUpRight, Package, LogOut, Compass, RotateCcw, Bot } from 'lucide-react'
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
  east: 'East (Right 👉)',
  south: 'South (Down 👇)',
  west: 'West (Left 👈)',
  north: 'North (Up 👆)',
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

export function HowToPlayModal({ open, onClose }: HowToPlayModalProps) {
  // Mini interactive practice sandbox inside modal
  const [direction, setDirection] = useState<Direction>('east')
  const [pos, setPos] = useState({ row: 1, col: 1 })
  const [hasPackage, setHasPackage] = useState(false)
  const [lastActionText, setLastActionText] = useState('Robot is facing East 👉')

  const moveForward = () => {
    setPos((prev) => {
      let { row, col } = prev
      if (direction === 'east' && col < 2) col++
      else if (direction === 'west' && col > 0) col--
      else if (direction === 'south' && row < 2) row++
      else if (direction === 'north' && row > 0) row--

      if (row === 2 && col === 1) {
        setHasPackage(true)
      }
      return { row, col }
    })
    setLastActionText(`Moved 1 step forward in direction: ${DIR_NAMES[direction]}`)
  }

  const turnLeft = () => {
    const nextDir = TURN_LEFT_MAP[direction]
    setDirection(nextDir)
    setLastActionText(`Rotated 90° Left ↺. Now facing: ${DIR_NAMES[nextDir]}`)
  }

  const turnRight = () => {
    const nextDir = TURN_RIGHT_MAP[direction]
    setDirection(nextDir)
    setLastActionText(`Rotated 90° Right ↻. Now facing: ${DIR_NAMES[nextDir]}`)
  }

  const resetSandbox = () => {
    setDirection('east')
    setPos({ row: 1, col: 1 })
    setHasPackage(false)
    setLastActionText('Sandbox reset! Robot facing East 👉')
  }

  return (
    <Modal open={open} onClose={onClose} title="🎮 Cadet Field Manual: How to Control Robot" size="lg">
      <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-1 text-sm">
        {/* Core Concept Banner */}
        <div className="p-4 rounded-xl bg-forge-accent/10 border border-forge-accent/40 neon-glow-accent">
          <h3 className="font-bold text-forge-accent flex items-center gap-2 mb-1.5 text-base">
            <Compass className="w-5 h-5 text-forge-accent icon-neon" />
            Basic Rule: Robot Moves in the Direction It Faces!
          </h3>
          <p className="text-forge-text leading-relaxed text-xs sm:text-sm">
            Real robots (aur programming algorithms) world-space directions (up/down/left/right) directly use nahi karte. 
            Robot ke paas <strong>3 primary commands</strong> hote hain:
          </p>
        </div>

        {/* 3 Commands Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-forge-card border border-forge-border">
            <div className="flex items-center gap-2 text-forge-accent font-mono font-bold mb-1.5">
              <ArrowUp className="w-4 h-4" />
              <span>MOVE FORWARD</span>
            </div>
            <p className="text-xs text-forge-muted leading-relaxed">
              Robot jis taraf dekh raha hai, us taraf <strong>1 tile aage</strong> barhta hai.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-forge-card border border-forge-border">
            <div className="flex items-center gap-2 text-indigo-400 font-mono font-bold mb-1.5">
              <CornerUpLeft className="w-4 h-4" />
              <span>TURN LEFT (↺)</span>
            </div>
            <p className="text-xs text-forge-muted leading-relaxed">
              Robot apni jagah khare ho kar <strong>90° left</strong> turn karta hai.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-forge-card border border-forge-border">
            <div className="flex items-center gap-2 text-forge-warning font-mono font-bold mb-1.5">
              <CornerUpRight className="w-4 h-4" />
              <span>TURN RIGHT (↻)</span>
            </div>
            <p className="text-xs text-forge-muted leading-relaxed">
              Robot apni jagah khare ho kar <strong>90° right</strong> turn karta hai.
            </p>
          </div>
        </div>

        {/* Down / Backward Explanation Card */}
        <div className="p-4 rounded-xl bg-forge-bg border border-forge-border/80">
          <h4 className="font-bold text-forge-warning flex items-center gap-2 mb-2">
            ❓ "Neeche (Down 👇) kaise jana hai?"
          </h4>
          <div className="text-xs sm:text-sm text-forge-muted space-y-2 leading-relaxed">
            <p>
              Agar Robot <strong>Right (East 👉)</strong> dekh raha hai aur aapko neeche jana hai:
            </p>
            <div className="p-3 rounded-lg bg-forge-card/90 font-mono text-xs text-forge-text border border-forge-border space-y-1">
              <p className="text-forge-accent font-semibold">1. Pehle <span className="text-forge-warning underline">TURN RIGHT</span> dein</p>
              <p className="text-forge-muted pl-4">↳ Robot ghoom kar Neeche (South 👇) dekhne lagega.</p>
              <p className="text-forge-accent font-semibold">2. Phir <span className="text-forge-accent underline">MOVE FORWARD</span> dein</p>
              <p className="text-forge-muted pl-4">↳ Robot 1 step neeche (South) chal parega!</p>
            </div>
          </div>
        </div>

        {/* Interactive Practice Sandbox */}
        <div className="p-4 rounded-xl bg-forge-surface border border-forge-accent/30 shadow-inner">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold text-forge-accent flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-forge-accent" />
              TRY IT LIVE (Interactive Practice Arena)
            </span>
            <button
              onClick={resetSandbox}
              className="text-xs text-forge-muted hover:text-forge-text flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 justify-around bg-forge-bg/60 p-4 rounded-xl">
            {/* 3x3 Mini Grid */}
            <div className="relative p-2 rounded-xl bg-forge-card border border-forge-border">
              <div className="grid grid-cols-3 gap-1.5">
                {[0, 1, 2].map((r) =>
                  [0, 1, 2].map((c) => {
                    const isRobot = pos.row === r && pos.col === c
                    const isTarget = r === 2 && c === 1
                    return (
                      <div
                        key={`${r}-${c}`}
                        className={`w-12 h-12 rounded-lg flex items-center justify-center border transition-all ${
                          isRobot
                            ? 'bg-forge-accent/20 border-forge-accent/60'
                            : isTarget
                              ? 'bg-forge-warning/15 border-forge-warning/40'
                              : 'bg-forge-surface border-forge-border/40'
                        }`}
                      >
                        {isRobot ? (
                          <div
                            style={{
                              transform: `rotate(${DIR_ROTATE[direction]}deg)`,
                              transition: 'transform 0.3s ease',
                            }}
                          >
                            <RobotAvatar direction={direction} hasPackage={hasPackage} />
                          </div>
                        ) : isTarget ? (
                          <Package className="w-4 h-4 text-forge-warning" />
                        ) : null}
                      </div>
                    )
                  })
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <p className="text-[11px] font-mono text-forge-muted">Click to test movements:</p>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" icon={CornerUpLeft} variant="secondary" onClick={turnLeft}>
                  Turn Left
                </Button>
                <Button size="sm" icon={ArrowUp} onClick={moveForward}>
                  Move Forward
                </Button>
                <Button size="sm" icon={CornerUpRight} variant="secondary" onClick={turnRight}>
                  Turn Right
                </Button>
              </div>
              <div className="mt-2 text-xs font-mono p-2 rounded bg-forge-card border border-forge-border/60 text-forge-accent">
                {lastActionText}
              </div>
            </div>
          </div>
        </div>

        {/* Mission Goal Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-forge-card border border-forge-border">
            <div className="p-2 rounded-lg bg-forge-warning/10 text-forge-warning shrink-0">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-xs text-forge-text">1. Collect Package</p>
              <p className="text-[11px] text-forge-muted mt-0.5">Package tile par robot ko le jayein to wo automatic collect ho jata hai.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-forge-card border border-forge-border">
            <div className="p-2 rounded-lg bg-forge-success/10 text-forge-success shrink-0">
              <LogOut className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-xs text-forge-text">2. Reach Exit Portal</p>
              <p className="text-[11px] text-forge-muted mt-0.5">Package uthane ke baad robot ko Exit tile tak guide karein mission complete karne ke liye.</p>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="pt-2 flex justify-end">
          <Button onClick={onClose} size="md">
            Understood, Let's Play! 🚀
          </Button>
        </div>
      </div>
    </Modal>
  )
}
