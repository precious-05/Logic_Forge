interface CardProps {
  children: React.ReactNode
  className?: string
  glow?: boolean
  hover?: boolean
  onClick?: () => void
}

export function Card({ children, className = '', glow, hover, onClick }: CardProps) {
  return (
    <div
      className={`glass-panel rounded-xl p-5 ${
        glow ? 'accent-glow animate-glow-pulse mission-active-ring' : ''
      } ${hover ? 'card-neon-hover cursor-pointer' : 'card-neon-hover'} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {children}
    </div>
  )
}
