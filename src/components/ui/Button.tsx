import { type LucideIcon } from 'lucide-react'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  icon?: LucideIcon
  loading?: boolean
}

const variants = {
  primary: 'bg-forge-accent text-forge-bg hover:bg-forge-accent-dim font-semibold btn-neon-primary',
  secondary: 'bg-forge-secondary/20 text-forge-secondary border border-forge-secondary/40 hover:bg-forge-secondary/30 hover:neon-glow-secondary',
  ghost: 'bg-transparent text-forge-muted hover:text-forge-text hover:bg-forge-card',
  danger: 'bg-forge-danger/20 text-forge-danger border border-forge-danger/40 hover:bg-forge-danger/30',
  outline: 'bg-transparent border border-forge-border text-forge-text hover:border-forge-accent/60 hover:text-forge-accent hover:neon-glow-accent',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3.5 text-base gap-2.5',
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  loading,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {children}
    </button>
  )
}
