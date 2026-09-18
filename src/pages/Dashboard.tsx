import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Target, Trophy, Flame, Star, Lock, ChevronRight, Play, Award, Zap, Sparkles, Terminal, Gamepad2, HelpCircle, Film
} from 'lucide-react'
import { allLevels, level01 } from '../data/levels'
import { ACHIEVEMENTS } from '../data/achievements'
import { useGameProgress } from '../context/ProgressContext'
import { xpProgressInLevel } from '../types'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { ProgressBar } from '../components/ui/ProgressBar'
import { AchievementIcon } from '../components/ui/AchievementIcon'
import { HeroRobotIllustration } from '../components/hero/HeroRobotIllustration'
import { HowToPlayModal } from '../components/ui/HowToPlayModal'

export function Dashboard() {
  const { progress, isUnlocked } = useGameProgress()
  const [showGuide, setShowGuide] = useState(false)
  const xpProgress = xpProgressInLevel(progress.xp)
  const completedCount = progress.completedMissions.length
  const totalMissions = level01.missions.length

  const currentMission = progress.currentMission ?? 'mission-01'
  const isCurrentComplete = progress.completedMissions.includes(currentMission)
  const continueMissionId = isCurrentComplete
    ? level01.missions.find((m) => !progress.completedMissions.includes(m.id))?.id ?? currentMission
    : currentMission

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="mb-10 relative overflow-hidden rounded-2xl glass-panel p-6 sm:p-8 border border-forge-accent/30 shadow-[0_0_50px_rgba(0,212,170,0.08)]">
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-forge-accent/10 rounded-full blur-3xl pointer-events-none animate-float-slow" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-forge-secondary/15 rounded-full blur-3xl pointer-events-none animate-float-slow" style={{ animationDelay: '-5s' }} />

        {/* Ambient Grid overlay in hero card */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00d4aa08_1px,transparent_1px),linear-gradient(to_bottom,#00d4aa08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Mission Brief & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Mission Control Cyber Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-forge-accent/15 text-forge-accent border border-forge-accent/40 neon-glow-accent">
                <span className="w-2 h-2 rounded-full bg-forge-accent animate-ping" />
                MISSION CONTROL // SECTOR 01
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono bg-forge-secondary/15 text-indigo-300 border border-forge-secondary/40">
                <Gamepad2 className="w-3 h-3 text-forge-secondary" />
                CYBERNETIC ARENA
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Your mission:{' '}
              <span className="text-gradient animate-text-glow drop-shadow-[0_0_15px_rgba(0,212,170,0.4)]">
                Learn to think like a programmer.
              </span>
            </h1>

            <p className="text-forge-muted mt-4 text-base sm:text-lg max-w-xl leading-relaxed">
              Step into the cyber training grounds. Command robots, solve algorithmic puzzles, and build computational intuition through interactive gameplay.
            </p>

            {/* Quick Cyber Stats Chips */}
            <div className="flex flex-wrap items-center gap-3 mt-6 mb-6 text-xs font-mono">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forge-bg/80 border border-forge-border">
                <Terminal className="w-3.5 h-3.5 text-forge-accent" />
                <span className="text-forge-muted">LOGIC ENGINE:</span>
                <span className="text-forge-accent font-semibold">ONLINE</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forge-bg/80 border border-forge-border">
                <Sparkles className="w-3.5 h-3.5 text-forge-warning" />
                <span className="text-forge-muted">CADET STATUS:</span>
                <span className="text-forge-warning font-semibold">LVL {progress.level}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link to={`/mission/${continueMissionId}`}>
                <Button size="lg" icon={Play} className="w-full sm:w-auto shadow-[0_0_25px_rgba(0,212,170,0.4)] hover:shadow-[0_0_35px_rgba(0,212,170,0.6)]">
                  {completedCount === 0 ? 'Start Mission 01' : 'Continue Mission'}
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                icon={HelpCircle}
                onClick={() => setShowGuide(true)}
                className="w-full sm:w-auto"
              >
                How To Play
              </Button>
              <a
                href="/showcase-video.html"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="ghost"
                  size="lg"
                  icon={Film}
                  className="w-full text-forge-accent border border-forge-accent/30 hover:bg-forge-accent/15"
                >
                  Watch Video Reel
                </Button>
              </a>
              <span className="text-xs font-mono text-forge-muted text-center sm:text-left sm:ml-2">
                {completedCount}/{totalMissions} Cleared
              </span>
            </div>
          </div>

          {/* Right Column: Cartoon Mascot & Interactive Game Character */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <HeroRobotIllustration />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <Card className="animate-stat-enter stat-delay-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-forge-accent/10 flex items-center justify-center neon-glow-accent">
              <Zap className="w-5 h-5 text-forge-accent icon-neon" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neon-accent">{progress.xp}</p>
              <p className="text-xs text-forge-muted uppercase">Total XP</p>
            </div>
          </div>
        </Card>
        <Card className="animate-stat-enter stat-delay-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-forge-secondary/10 flex items-center justify-center neon-glow-secondary">
              <Star className="w-5 h-5 text-forge-secondary icon-neon" />
            </div>
            <div>
              <p className="text-2xl font-bold">Lv. {progress.level}</p>
              <p className="text-xs text-forge-muted uppercase">Level</p>
            </div>
          </div>
        </Card>
        <Card className="animate-stat-enter stat-delay-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-forge-warning/10 flex items-center justify-center neon-glow-warning">
              <Flame className="w-5 h-5 text-forge-warning icon-neon animate-float" style={{ animationDuration: '2s' }} />
            </div>
            <div>
              <p className="text-2xl font-bold">{progress.streak}</p>
              <p className="text-xs text-forge-muted uppercase">Day Streak</p>
            </div>
          </div>
        </Card>
        <Card className="animate-stat-enter stat-delay-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-forge-success/10 flex items-center justify-center neon-glow-success">
              <Target className="w-5 h-5 text-forge-success icon-neon" />
            </div>
            <div>
              <p className="text-2xl font-bold">{completedCount}/{totalMissions}</p>
              <p className="text-xs text-forge-muted uppercase">Missions</p>
            </div>
          </div>
        </Card>
      </section>

      {/* XP Progress */}
      <section className="mb-10">
        <Card>
          <ProgressBar
            value={xpProgress.current}
            max={xpProgress.needed}
            label={`Progress to Level ${progress.level + 1}`}
            showPercent
          />
        </Card>
      </section>

      {/* Level Map */}
      <section className="mb-10">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-forge-accent" />
          Progression Path
        </h2>

        {allLevels.map((level) => (
          <div key={level.id} className={`mb-8 ${level.locked ? 'opacity-60' : ''}`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono text-forge-accent">{level.subtitle}</span>
              <h3 className="font-bold">{level.title}</h3>
              {level.locked && (
                <span className="flex items-center gap-1 text-xs text-forge-muted bg-forge-card px-2 py-0.5 rounded-full">
                  <Lock className="w-3 h-3" /> Locked
                </span>
              )}
            </div>

            {level.locked ? (
              <Card className="blur-[2px] pointer-events-none select-none">
                <p className="text-forge-muted text-sm">{level.description}</p>
                <p className="text-xs text-forge-muted mt-2">Complete Level 01 to unlock</p>
              </Card>
            ) : (
              <div className="relative">
                <div className="absolute left-[19px] top-6 bottom-6 w-px hidden md:block bg-gradient-to-b from-forge-accent/40 via-forge-border to-forge-accent/20" />
                <div className="space-y-3">
                  {level.missions.map((mission) => {
                    const unlocked = isUnlocked(mission.id)
                    const completed = progress.completedMissions.includes(mission.id)
                    const isBoss = mission.challenge.isBoss
                    const isCurrent = mission.id === continueMissionId && !completed

                    return (
                      <Link
                        key={mission.id}
                        to={unlocked ? `/mission/${mission.id}` : '#'}
                        className={`block ${!unlocked ? 'pointer-events-none' : ''}`}
                      >
                        <Card
                          hover={unlocked}
                          glow={isCurrent}
                          className={`relative md:ml-0 transition-all ${
                            !unlocked ? 'opacity-50 blur-[1px]' : ''
                          } ${isBoss ? 'border-forge-warning/30' : ''}`}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 ${
                                completed
                                  ? 'bg-forge-success/20 border-forge-success text-forge-success'
                                  : unlocked
                                    ? isBoss
                                      ? 'bg-forge-warning/20 border-forge-warning text-forge-warning'
                                      : 'bg-forge-accent/10 border-forge-accent text-forge-accent'
                                    : 'bg-forge-card border-forge-border text-forge-muted'
                              }`}
                            >
                              {!unlocked ? (
                                <Lock className="w-4 h-4" />
                              ) : completed ? (
                                <Target className="w-4 h-4" />
                              ) : isBoss ? (
                                <Trophy className="w-4 h-4" />
                              ) : (
                                <span className="text-xs font-bold">{mission.number}</span>
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-mono text-forge-muted">
                                {isBoss ? 'FINAL BOSS' : `Mission ${String(mission.number).padStart(2, '0')}`}
                              </p>
                              <p className="font-semibold truncate">{mission.title}</p>
                              <p className="text-xs text-forge-muted">{mission.subtitle}</p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              {completed && (
                                <span className="text-xs font-mono text-forge-success">
                                  +{progress.missionResults[mission.id]?.xpEarned ?? mission.challenge.xp} XP
                                </span>
                              )}
                              {unlocked && <ChevronRight className="w-4 h-4 text-forge-muted" />}
                            </div>
                          </div>
                        </Card>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Achievements */}
      <section>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-forge-warning" />
          Achievements
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {ACHIEVEMENTS.map((achievement) => {
            const earned = progress.achievements.includes(achievement.id)
            return (
              <Card
                key={achievement.id}
                className={`text-center p-4 transition-all duration-300 ${
                  earned ? 'hover:neon-glow-warning' : 'opacity-40 grayscale'
                }`}
              >
                <AchievementIcon
                  name={achievement.icon}
                  className={`w-6 h-6 mx-auto mb-2 ${earned ? 'text-forge-warning' : 'text-forge-muted'}`}
                />
                <p className="text-xs font-semibold">{achievement.title}</p>
                <p className="text-[10px] text-forge-muted mt-1">{achievement.description}</p>
              </Card>
            )
          })}
        </div>
      </section>

      {/* How to Play Guide Modal */}
      <HowToPlayModal open={showGuide} onClose={() => setShowGuide(false)} />
    </div>
  )
}
