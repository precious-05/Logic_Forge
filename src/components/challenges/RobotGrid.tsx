import { useEffect, useRef, useState } from 'react'
import { Package, LogOut, Bot, Sparkles, Compass } from 'lucide-react'
import type { GridCell, Direction } from '../../types'
import type { RobotState } from '../../utils/helpers'
import { RobotAvatar } from './RobotAvatar'

interface RobotGridProps {
  grid: GridCell[][]
  robotState?: RobotState
  animating?: boolean
  lastAction?: 'forward' | 'left' | 'right' | 'start' | null
  missionSuccess?: boolean
}

const CELL_MD = 56
const GAP = 4

const DIR_ROTATE: Record<Direction, number> = {
  east: 0,
  south: 90,
  west: 180,
  north: -90,
}

export function RobotGrid({
  grid,
  robotState,
  animating,
  lastAction,
  missionSuccess,
}: RobotGridProps) {
  const [trails, setTrails] = useState<{ id: number; row: number; col: number }[]>([])
  const trailId = useRef(0)
  const prevPos = useRef<{ row: number; col: number } | null>(null)

  useEffect(() => {
    if (!robotState || !animating) return
    const moved =
      prevPos.current &&
      (prevPos.current.row !== robotState.row || prevPos.current.col !== robotState.col)

    if (moved && lastAction === 'forward') {
      const id = ++trailId.current
      setTrails((t) => [...t.slice(-8), { id, row: prevPos.current!.row, col: prevPos.current!.col }])
      setTimeout(() => setTrails((t) => t.filter((x) => x.id !== id)), 800)
    }
    prevPos.current = { row: robotState.row, col: robotState.col }
  }, [robotState, animating, lastAction])

  const cellIcon = (type: GridCell['type']) => {
    switch (type) {
      case 'start':
        return (
          <div className="relative flex items-center justify-center">
            <div className="w-6 h-6 rounded-full border border-forge-accent/60 animate-ping opacity-40" />
            <Compass className="w-4 h-4 text-forge-accent icon-neon" />
          </div>
        )
      case 'package':
        return (
          <div className="relative flex items-center justify-center animate-float" style={{ animationDuration: '2.5s' }}>
            <div className="absolute -inset-1 rounded-lg bg-forge-warning/20 blur-xs animate-pulse" />
            <div className="relative p-1 rounded-md bg-forge-warning/20 border border-forge-warning/60 shadow-[0_0_12px_rgba(245,158,11,0.6)]">
              <Package className="w-4 h-4 text-forge-warning icon-neon" />
            </div>
          </div>
        )
      case 'exit':
        return (
          <div className="relative flex items-center justify-center">
            {/* Swirling energy ring */}
            <div className="absolute w-7 h-7 rounded-full border border-dashed border-forge-success/70 animate-spin" style={{ animationDuration: '6s' }} />
            <div className="relative p-1 rounded-full bg-forge-success/20 border border-forge-success/60 shadow-[0_0_15px_rgba(16,185,129,0.7)]">
              <LogOut className="w-4 h-4 text-forge-success icon-neon" />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const cols = grid[0]?.length ?? 0
  const rows = grid.length

  const isMoving = lastAction === 'forward'
  const isTurning = lastAction === 'left' || lastAction === 'right'

  return (
    <div className="inline-block">
      <div
        className={`robot-arena neon-border rounded-xl p-4 robot-arena-scan transition-all duration-500 ${
          missionSuccess ? 'neon-glow-success border-forge-success/50' : ''
        }`}
      >
        {/* Arena Header HUD */}
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-forge-border/40 text-[11px] font-mono">
          <div className="flex items-center gap-2 text-forge-accent">
            <span className="w-2 h-2 rounded-full bg-forge-accent animate-ping" />
            <span>GRID MAP MATRIX // 5x5</span>
          </div>
          {robotState && (
            <div className="text-forge-muted">
              POS: <span className="text-forge-accent">[{robotState.row}, {robotState.col}]</span> | DIR: <span className="text-forge-warning uppercase">{robotState.direction}</span>
            </div>
          )}
        </div>

        <div
          className="relative"
          style={{
            width: cols * CELL_MD + (cols - 1) * GAP,
            height: rows * CELL_MD + (rows - 1) * GAP,
          }}
        >
          {/* Grid cells */}
          <div
            className="grid gap-1 absolute inset-0"
            style={{ gridTemplateColumns: `repeat(${cols}, ${CELL_MD}px)` }}
          >
            {grid.map((row, r) =>
              row.map((cell, c) => {
                const isRobotCell = robotState && robotState.row === r && robotState.col === c
                return (
                  <div
                    key={`${r}-${c}`}
                    className={`rounded-lg flex items-center justify-center transition-all duration-300 w-[48px] h-[48px] md:w-[56px] md:h-[56px] relative overflow-hidden ${
                      cell.type === 'wall'
                        ? 'bg-forge-border/60 border border-forge-border shadow-inner'
                        : cell.type === 'start'
                          ? 'bg-forge-accent/10 border border-forge-accent/50 cell-start-pulse shadow-[inset_0_0_12px_rgba(0,212,170,0.15)]'
                          : cell.type === 'package'
                            ? 'bg-forge-warning/10 border border-forge-warning/50 cell-package-pulse shadow-[inset_0_0_12px_rgba(245,158,11,0.15)]'
                            : cell.type === 'exit'
                              ? 'bg-forge-success/10 border border-forge-success/50 cell-exit-pulse shadow-[inset_0_0_12px_rgba(16,185,129,0.15)]'
                              : 'bg-forge-card/70 border border-forge-border/40 hover:border-forge-accent/30'
                    } ${isRobotCell && animating ? 'bg-forge-accent/15 border-forge-accent/60' : ''}`}
                  >
                    {/* Subtle corner crosshair markers on tiles */}
                    <div className="absolute top-1 left-1 w-1 h-1 border-t border-l border-forge-border/60" />
                    <div className="absolute bottom-1 right-1 w-1 h-1 border-b border-r border-forge-border/60" />

                    {!isRobotCell && cellIcon(cell.type)}
                  </div>
                )
              })
            )}
          </div>

          {/* Motion trails */}
          {trails.map((t) => (
            <div
              key={t.id}
              className="robot-trail"
              style={{
                left: t.col * (CELL_MD + GAP) + CELL_MD / 2 - 4,
                top: t.row * (CELL_MD + GAP) + CELL_MD / 2 - 4,
              }}
            />
          ))}

          {/* Robot overlay: smooth glide between cells with animated SVG character */}
          {robotState && (
            <div
              className={`robot-entity absolute flex items-center justify-center ${
                isMoving ? 'moving' : isTurning ? 'turning' : ''
              }`}
              style={{
                left: robotState.col * (CELL_MD + GAP),
                top: robotState.row * (CELL_MD + GAP),
                width: CELL_MD,
                height: CELL_MD,
              }}
            >
              <div
                className="robot-body w-full h-full flex items-center justify-center"
                style={{
                  transform: `rotate(${DIR_ROTATE[robotState.direction]}deg)`,
                  transition: 'transform 0.3s cubic-bezier(0.34, 1.2, 0.64, 1)',
                }}
              >
                <RobotAvatar
                  direction={robotState.direction}
                  hasPackage={robotState.hasPackage}
                  isMoving={isMoving}
                  isTurning={isTurning}
                  missionSuccess={missionSuccess}
                />
              </div>
            </div>
          )}
        </div>

        {/* Status bar & Legend */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-forge-border/40">
          <div className="flex gap-3 sm:gap-4 text-xs text-forge-muted">
            <span className="flex items-center gap-1">
              <Bot className="w-3.5 h-3.5 text-forge-accent icon-neon" /> Bot
            </span>
            <span className="flex items-center gap-1">
              <Package className="w-3.5 h-3.5 text-forge-warning icon-neon" /> Package
            </span>
            <span className="flex items-center gap-1">
              <LogOut className="w-3.5 h-3.5 text-forge-success icon-neon" /> Exit
            </span>
          </div>
          {animating && (
            <span className="text-[10px] font-mono text-forge-accent uppercase tracking-widest animate-pulse flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-forge-accent animate-ping" />
              Executing...
            </span>
          )}
          {missionSuccess && (
            <span className="text-[10px] font-mono text-forge-success uppercase tracking-widest text-neon-accent flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-forge-success animate-spin" />
              Mission OK!
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
