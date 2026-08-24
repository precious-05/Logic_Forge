import { useState, useEffect } from 'react'
import { Sparkles, Terminal, Shield, Zap, Gamepad2 } from 'lucide-react'

const ROBOT_QUOTES = [
  "Cadet! System is 100% ONLINE!",
  "Ready to train your algorithmic thinking?",
  "No syntax errors allowed in this sector!",
  "Analyzing logic circuits... All clear!",
  "Grab your badge and let's conquer Level 01!",
]

export function HeroRobotIllustration() {
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [blink, setBlink] = useState(false)
  const [clickSparks, setClickSparks] = useState<{ id: number; x: number; y: number }[]>([])

  // Random eye blink
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true)
      setTimeout(() => setBlink(false), 200)
    }, 3500)
    return () => clearInterval(blinkInterval)
  }, [])

  // Cycle speech quotes
  const nextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % ROBOT_QUOTES.length)
  }

  const handleMascotClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const newSpark = { id: Date.now(), x, y }
    setClickSparks((prev) => [...prev, newSpark])
    setTimeout(() => {
      setClickSparks((prev) => prev.filter((s) => s.id !== newSpark.id))
    }, 800)
    nextQuote()
  }

  return (
    <div
      className="relative flex flex-col items-center justify-center p-2 select-none cursor-pointer group"
      onClick={handleMascotClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Click Byte for messages!"
    >
      {/* Speech Bubble */}
      <div className="relative mb-3 z-20 animate-float" style={{ animationDuration: '3.5s' }}>
        <div className="glass-panel px-4 py-2 rounded-2xl border border-forge-accent/50 neon-glow-accent text-xs font-mono text-forge-accent flex items-center gap-2 shadow-lg backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-forge-warning animate-spin" style={{ animationDuration: '4s' }} />
          <span>{ROBOT_QUOTES[quoteIndex]}</span>
        </div>
        {/* Speech tail */}
        <div className="w-3 h-3 bg-forge-card border-r border-b border-forge-accent/50 rotate-45 mx-auto -mt-1.5" />
      </div>

      {/* Cyberpunk Hologram Container */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-center justify-center">
        {/* Ambient Neon Backlight Orbs */}
        <div className="absolute inset-0 bg-gradient-to-tr from-forge-accent/20 via-forge-secondary/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-48 h-48 bg-forge-accent/15 rounded-full blur-2xl animate-glow-pulse" />

        {/* Floating Game Badges around Robot */}
        {/* Top-Right Badge: Pilot Status */}
        <div className="absolute -top-1 -right-2 z-20 animate-float" style={{ animationDuration: '4.5s' }}>
          <div className="glass-panel px-2.5 py-1 rounded-lg border border-forge-accent/40 text-[10px] font-mono text-forge-accent flex items-center gap-1.5 neon-glow-accent">
            <span className="w-2 h-2 rounded-full bg-forge-accent animate-ping" />
            <span>PILOT LVL 1</span>
          </div>
        </div>

        {/* Bottom-Left Badge: Logic Core */}
        <div className="absolute bottom-6 -left-4 z-20 animate-float" style={{ animationDuration: '5s', animationDelay: '1s' }}>
          <div className="glass-panel px-2.5 py-1 rounded-lg border border-forge-secondary/40 text-[10px] font-mono text-indigo-300 flex items-center gap-1.5 neon-glow-secondary">
            <Terminal className="w-3 h-3 text-forge-secondary" />
            <span>&lt;LOGIC_READY/&gt;</span>
          </div>
        </div>

        {/* Top-Left Floating XP Crystal */}
        <div className="absolute top-6 left-0 z-20 animate-float" style={{ animationDuration: '3.8s', animationDelay: '0.5s' }}>
          <div className="glass-panel px-2 py-0.5 rounded-full border border-forge-warning/40 text-[10px] font-mono text-forge-warning flex items-center gap-1 neon-glow-warning">
            <Zap className="w-3 h-3 text-forge-warning icon-neon" />
            <span>+100 XP</span>
          </div>
        </div>

        {/* Bottom-Right Shield */}
        <div className="absolute bottom-10 -right-2 z-20 animate-float" style={{ animationDuration: '4.2s', animationDelay: '1.5s' }}>
          <div className="glass-panel px-2 py-1 rounded-lg border border-emerald-500/40 text-[10px] font-mono text-emerald-400 flex items-center gap-1 neon-glow-success">
            <Shield className="w-3 h-3 text-emerald-400" />
            <span>SYNC: 100%</span>
          </div>
        </div>

        {/* Floating Mini Drone Companion */}
        <div
          className="absolute -top-4 left-6 z-10 animate-float"
          style={{ animationDuration: '3.2s', animationDelay: '0.8s' }}
        >
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className="drop-shadow-[0_0_10px_rgba(99,102,241,0.8)]">
            {/* Drone Wings / Propeller Glow */}
            <ellipse cx="22" cy="12" rx="16" ry="3" fill="#6366F1" opacity="0.6" className="animate-pulse" />
            {/* Drone Body */}
            <circle cx="22" cy="22" r="11" fill="#1E1B4B" stroke="#818CF8" strokeWidth="1.5" />
            {/* Drone Eye */}
            <circle cx="22" cy="22" r="5" fill="#00D4AA" className="animate-ping" style={{ animationDuration: '2s' }} />
            <circle cx="22" cy="22" r="3" fill="#FFFFFF" />
            {/* Antenna */}
            <line x1="22" y1="11" x2="22" y2="5" stroke="#818CF8" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="22" cy="4" r="2" fill="#F43F5E" />
          </svg>
        </div>

        {/* Main Cartoon Robot SVG Character */}
        <div
          className={`relative z-10 transition-transform duration-300 ${
            isHovered ? 'scale-105' : 'scale-100'
          } animate-float`}
          style={{ animationDuration: '4s' }}
        >
          <svg
            width="220"
            height="220"
            viewBox="0 0 240 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_25px_rgba(0,212,170,0.4)]"
          >
            <defs>
              {/* Chassis Gradient */}
              <linearGradient id="chassisGrad" x1="0" y1="0" x2="240" y2="240" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="50%" stopColor="#0F172A" />
                <stop offset="100%" stopColor="#0A0E17" />
              </linearGradient>

              {/* Visor Screen Gradient */}
              <linearGradient id="visorGrad" x1="0" y1="0" x2="0" y2="100%">
                <stop offset="0%" stopColor="#051923" />
                <stop offset="100%" stopColor="#003554" />
              </linearGradient>

              {/* Headset Purple Gradient */}
              <linearGradient id="headsetGrad" x1="0" y1="0" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818CF8" />
                <stop offset="100%" stopColor="#4F46E5" />
              </linearGradient>

              {/* Plasma Flame Gradient */}
              <linearGradient id="plasmaFlame" x1="0" y1="0" x2="0" y2="100%">
                <stop offset="0%" stopColor="#00D4AA" />
                <stop offset="50%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
              </linearGradient>

              {/* Glow Filter */}
              <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* --- HOVER THRUSTER PLASMA FLAME --- */}
            <g className="animate-pulse" style={{ animationDuration: '0.8s' }}>
              {/* Outer flame */}
              <path
                d="M100 205 Q120 235 140 205 Q120 225 100 205Z"
                fill="url(#plasmaFlame)"
                opacity="0.8"
              />
              {/* Inner core flame */}
              <path
                d="M108 205 Q120 225 132 205 Z"
                fill="#FFFFFF"
                opacity="0.9"
              />
            </g>

            {/* --- ROBOT BODY / TORSO --- */}
            {/* Torso Base */}
            <rect
              x="72"
              y="132"
              width="96"
              height="74"
              rx="20"
              fill="url(#chassisGrad)"
              stroke="#00D4AA"
              strokeWidth="2.5"
            />
            {/* Cyber Circuit Inset on Chest */}
            <rect
              x="86"
              y="146"
              width="68"
              height="44"
              rx="10"
              fill="#060B13"
              stroke="#2A3548"
              strokeWidth="1.5"
            />

            {/* Chest Core Reactor (Heart of Logic) */}
            <circle cx="120" cy="168" r="14" fill="#0A1826" stroke="#00D4AA" strokeWidth="2" />
            <circle
              cx="120"
              cy="168"
              r="8"
              fill="#00D4AA"
              filter="url(#neonGlow)"
              className="animate-pulse"
              style={{ animationDuration: '1.5s' }}
            />
            <path
              d="M120 162 L124 167 L120 172 L116 167 Z"
              fill="#FFFFFF"
            />

            {/* Chest Level Gauge Bars */}
            <rect x="91" y="152" width="16" height="3" rx="1.5" fill="#00D4AA" />
            <rect x="91" y="158" width="12" height="3" rx="1.5" fill="#38BDF8" />
            <rect x="91" y="164" width="14" height="3" rx="1.5" fill="#818CF8" />

            <rect x="133" y="152" width="16" height="3" rx="1.5" fill="#F59E0B" />
            <rect x="137" y="158" width="12" height="3" rx="1.5" fill="#10B981" />
            <rect x="135" y="164" width="14" height="3" rx="1.5" fill="#EC4899" />

            {/* Left Arm & Claw */}
            <g className={isHovered ? 'animate-bounce' : ''}>
              <circle cx="62" cy="148" r="10" fill="#1E293B" stroke="#00D4AA" strokeWidth="1.5" />
              <path d="M60 156 Q52 170 56 182" stroke="#2A3548" strokeWidth="6" strokeLinecap="round" />
              <circle cx="56" cy="186" r="7" fill="#0F172A" stroke="#00D4AA" strokeWidth="1.5" />
              <path d="M52 186 C50 192 56 195 62 191" stroke="#00D4AA" strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>

            {/* Right Arm & Gamepad Claw */}
            <g>
              <circle cx="178" cy="148" r="10" fill="#1E293B" stroke="#00D4AA" strokeWidth="1.5" />
              <path d="M180 156 Q188 170 184 182" stroke="#2A3548" strokeWidth="6" strokeLinecap="round" />
              <circle cx="184" cy="186" r="7" fill="#0F172A" stroke="#818CF8" strokeWidth="1.5" />
              <path d="M188 186 C190 192 184 195 178 191" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>

            {/* --- NECK CONNECTOR --- */}
            <rect x="108" y="122" width="24" height="12" rx="4" fill="#334155" stroke="#00D4AA" strokeWidth="1" />
            <line x1="114" y1="124" x2="114" y2="132" stroke="#00D4AA" strokeWidth="1.5" />
            <line x1="120" y1="124" x2="120" y2="132" stroke="#00D4AA" strokeWidth="1.5" />
            <line x1="126" y1="124" x2="126" y2="132" stroke="#00D4AA" strokeWidth="1.5" />

            {/* --- HEADSET / EAR PIECES (Cyberpunk Gamer Headphone) --- */}
            <path
              d="M48 76 C48 30 192 30 192 76"
              stroke="url(#headsetGrad)"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Left Ear Cushion */}
            <rect x="42" y="66" width="14" height="34" rx="7" fill="#4338CA" stroke="#818CF8" strokeWidth="2" />
            <circle cx="49" cy="83" r="4" fill="#00D4AA" />
            {/* Right Ear Cushion */}
            <rect x="184" y="66" width="14" height="34" rx="7" fill="#4338CA" stroke="#818CF8" strokeWidth="2" />
            <circle cx="191" cy="83" r="4" fill="#00D4AA" />

            {/* Antenna with Glowing Beacon */}
            <line x1="120" y1="46" x2="120" y2="24" stroke="#818CF8" strokeWidth="3" strokeLinecap="round" />
            <circle cx="120" cy="20" r="7" fill="#00D4AA" filter="url(#neonGlow)" className="animate-pulse" />
            <circle cx="120" cy="20" r="3" fill="#FFFFFF" />
            <circle cx="120" cy="20" r="14" stroke="#00D4AA" strokeWidth="1" opacity="0.4" className="animate-ping" style={{ animationDuration: '2.5s' }} />

            {/* --- ROBOT HEAD --- */}
            <rect
              x="54"
              y="48"
              width="132"
              height="78"
              rx="24"
              fill="url(#chassisGrad)"
              stroke="#00D4AA"
              strokeWidth="2.5"
            />

            {/* Visor Screen Outer Rim */}
            <rect
              x="64"
              y="58"
              width="112"
              height="58"
              rx="16"
              fill="url(#visorGrad)"
              stroke="#38BDF8"
              strokeWidth="1.5"
            />

            {/* Visor Glass Scanlines Effect */}
            <line x1="68" y1="68" x2="172" y2="68" stroke="#38BDF8" strokeWidth="0.5" opacity="0.25" />
            <line x1="68" y1="78" x2="172" y2="78" stroke="#38BDF8" strokeWidth="0.5" opacity="0.25" />
            <line x1="68" y1="88" x2="172" y2="88" stroke="#38BDF8" strokeWidth="0.5" opacity="0.25" />
            <line x1="68" y1="98" x2="172" y2="98" stroke="#38BDF8" strokeWidth="0.5" opacity="0.25" />

            {/* --- EXPRESSIVE DIGITAL EYES --- */}
            {!blink ? (
              isHovered ? (
                /* Happy Joyful Arc Eyes (^_^) on Hover */
                <g filter="url(#neonGlow)">
                  <path d="M82 88 Q96 74 106 88" stroke="#00D4AA" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                  <path d="M134 88 Q144 74 158 88" stroke="#00D4AA" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                  {/* Cheerful Blush */}
                  <ellipse cx="80" cy="98" rx="6" ry="3" fill="#EC4899" opacity="0.8" />
                  <ellipse cx="160" cy="98" rx="6" ry="3" fill="#EC4899" opacity="0.8" />
                  {/* Joyful Mouth */}
                  <path d="M112 98 Q120 106 128 98" stroke="#00D4AA" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </g>
              ) : (
                /* Standard Cool Digital Gamer Eyes */
                <g filter="url(#neonGlow)">
                  {/* Left Eye */}
                  <rect x="82" y="74" width="26" height="24" rx="8" fill="#00D4AA" />
                  <circle cx="89" cy="81" r="3.5" fill="#FFFFFF" />
                  <rect x="90" y="88" width="12" height="4" rx="2" fill="#064E3B" />

                  {/* Right Eye */}
                  <rect x="132" y="74" width="26" height="24" rx="8" fill="#00D4AA" />
                  <circle cx="139" cy="81" r="3.5" fill="#FFFFFF" />
                  <rect x="140" y="88" width="12" height="4" rx="2" fill="#064E3B" />

                  {/* Subtle Smile Matrix */}
                  <path d="M114 96 Q120 101 126 96" stroke="#00D4AA" strokeWidth="2" strokeLinecap="round" fill="none" />
                </g>
              )
            ) : (
              /* Blinking Line Eyes (-_-) */
              <g filter="url(#neonGlow)">
                <line x1="82" y1="86" x2="108" y2="86" stroke="#00D4AA" strokeWidth="4" strokeLinecap="round" />
                <line x1="132" y1="86" x2="158" y2="86" stroke="#00D4AA" strokeWidth="4" strokeLinecap="round" />
              </g>
            )}

            {/* Corner Screen Highlights / Glare */}
            <path
              d="M70 64 L90 64 A 8 8 0 0 0 82 72 L70 72 Z"
              fill="#FFFFFF"
              opacity="0.25"
            />
          </svg>
        </div>

        {/* Holographic Glowing Launchpad / Energy Floor */}
        <div className="absolute -bottom-2 w-64 h-12 flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 rounded-[100%] border border-forge-accent/40 shadow-[0_0_20px_rgba(0,212,170,0.5)] animate-pulse" />
          <div className="absolute w-44 h-8 rounded-[100%] border border-forge-secondary/50 shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
          <div className="w-28 h-5 bg-gradient-to-r from-forge-accent/60 via-forge-secondary/60 to-forge-accent/60 rounded-[100%] blur-sm" />
        </div>

        {/* Click Spark Particles */}
        {clickSparks.map((spark) => (
          <div
            key={spark.id}
            className="absolute pointer-events-none z-30 animate-ping"
            style={{ left: spark.x, top: spark.y }}
          >
            <div className="w-3 h-3 rounded-full bg-forge-accent neon-glow-accent" />
          </div>
        ))}
      </div>

      {/* Interactive Action Prompt */}
      <div className="mt-2 flex items-center gap-1.5 text-[11px] font-mono text-forge-muted group-hover:text-forge-accent transition-colors">
        <Gamepad2 className="w-3.5 h-3.5 text-forge-accent icon-neon" />
        <span>CLICK BYTE FOR COMMS</span>
      </div>
    </div>
  )
}
