import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Terminal, Home, Settings, HelpCircle } from 'lucide-react'
import { HowToPlayModal } from '../ui/HowToPlayModal'

export function Header() {
  const location = useLocation()
  const [guideOpen, setGuideOpen] = useState(false)

  const nav = [
    { to: '/', label: 'Dashboard', icon: Home },
    { to: '/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-forge-border/60 bg-forge-bg/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-forge-accent/10 border border-forge-accent/40 flex items-center justify-center group-hover:neon-glow-accent transition-all duration-300 animate-glow-pulse">
              <Terminal className="w-4 h-4 text-forge-accent icon-neon" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              Logic<span className="text-forge-accent text-neon-accent animate-neon-flicker">Forge</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {/* Quick How to Play Guide Button */}
            <button
              onClick={() => setGuideOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-forge-accent bg-forge-accent/10 border border-forge-accent/40 hover:neon-glow-accent transition-all cursor-pointer"
              title="Learn how to play and control the robot"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>How To Play</span>
            </button>

            <nav className="flex items-center gap-1">
              {nav.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    location.pathname === to
                      ? 'text-forge-accent bg-forge-accent/10 neon-glow-accent'
                      : 'text-forge-muted hover:text-forge-text hover:bg-forge-card hover:border-forge-accent/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <HowToPlayModal open={guideOpen} onClose={() => setGuideOpen(false)} />
    </>
  )
}
