export function AmbientBackground() {
  const particles = [
    { text: '{ }', top: '12%', left: '8%', delay: '0s', duration: '14s', color: 'text-forge-accent/20' },
    { text: '0101', top: '28%', left: '88%', delay: '2s', duration: '18s', color: 'text-forge-secondary/25' },
    { text: '< />', top: '65%', left: '5%', delay: '4s', duration: '16s', color: 'text-forge-accent/20' },
    { text: '=>', top: '82%', left: '85%', delay: '1s', duration: '15s', color: 'text-forge-warning/20' },
    { text: '&&', top: '45%', left: '92%', delay: '3s', duration: '20s', color: 'text-pink-500/20' },
    { text: '++', top: '18%', left: '45%', delay: '5s', duration: '17s', color: 'text-emerald-400/20' },
    { text: '[ ]', top: '75%', left: '35%', delay: '2.5s', duration: '19s', color: 'text-forge-accent/15' },
  ]

  return (
    <div className="ambient-bg" aria-hidden="true">
      {/* Dynamic Ambient Neon Orbs */}
      <div className="ambient-orb ambient-orb-1" />
      <div className="ambient-orb ambient-orb-2" />
      <div className="ambient-orb ambient-orb-3" />
      <div className="ambient-orb ambient-orb-4" />

      {/* Floating Cybernetic Code Particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className={`absolute font-mono text-sm font-bold pointer-events-none select-none animate-float-slow ${p.color}`}
          style={{
            top: p.top,
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        >
          {p.text}
        </div>
      ))}

      {/* Subtle Digital Grid Scan Line */}
      <div className="ambient-scanline" />
    </div>
  )
}
