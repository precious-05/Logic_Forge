import type { Direction } from '../../types'

interface RobotAvatarProps {
  direction: Direction
  hasPackage?: boolean
  isMoving?: boolean
  isTurning?: boolean
  missionSuccess?: boolean
}

export function RobotAvatar({
  direction,
  hasPackage,
  isMoving,
  isTurning,
  missionSuccess,
}: RobotAvatarProps) {
  return (
    <div
      className="relative w-full h-full flex items-center justify-center pointer-events-none"
      data-direction={direction}
      title={`Robot facing ${direction}`}
    >
      {/* Victory Burst Aura */}
      {missionSuccess && (
        <div className="absolute inset-0 rounded-full bg-forge-success/30 blur-md animate-ping" />
      )}

      {/* Thruster Glow underneath */}
      <div
        className={`absolute bottom-0.5 w-5 h-2 rounded-full blur-xs transition-all ${
          missionSuccess
            ? 'bg-forge-success shadow-[0_0_10px_#10b981]'
            : 'bg-forge-accent shadow-[0_0_10px_#00d4aa]'
        } ${isMoving ? 'scale-125 opacity-100' : 'opacity-70 animate-pulse'}`}
      />

      {/* Animated SVG Robot Character */}
      <svg
        width="42"
        height="42"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`relative z-10 drop-shadow-[0_0_8px_rgba(0,212,170,0.8)] transition-transform duration-200 ${
          isMoving ? 'scale-110' : ''
        } ${isTurning ? 'rotate-12' : ''}`}
      >
        <defs>
          <linearGradient id="gridBotChassis" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="gridBotVisor" x1="0" y1="0" x2="0" y2="100%">
            <stop offset="0%" stopColor="#022C22" />
            <stop offset="100%" stopColor="#064E3B" />
          </linearGradient>
        </defs>

        {/* Thruster Jet Flame */}
        <path
          d="M26 53 Q32 62 38 53 Q32 57 26 53Z"
          fill={missionSuccess ? '#10B981' : '#00D4AA'}
          className="animate-pulse"
        />

        {/* Robot Main Body */}
        <rect
          x="16"
          y="28"
          width="32"
          height="24"
          rx="8"
          fill="url(#gridBotChassis)"
          stroke={missionSuccess ? '#10B981' : '#00D4AA'}
          strokeWidth="1.8"
        />

        {/* Chest Plate Circuit */}
        <rect x="22" y="36" width="20" height="12" rx="4" fill="#0A0E17" stroke="#2A3548" strokeWidth="1" />
        <circle
          cx="32"
          cy="42"
          r="3"
          fill={missionSuccess ? '#10B981' : '#00D4AA'}
          className="animate-pulse"
        />

        {/* Robot Head */}
        <rect
          x="14"
          y="10"
          width="36"
          height="20"
          rx="6"
          fill="url(#gridBotChassis)"
          stroke={missionSuccess ? '#10B981' : '#00D4AA'}
          strokeWidth="1.8"
        />

        {/* Visor Screen */}
        <rect
          x="18"
          y="14"
          width="28"
          height="12"
          rx="4"
          fill="url(#gridBotVisor)"
          stroke={missionSuccess ? '#10B981' : '#38BDF8'}
          strokeWidth="1"
        />

        {/* Expressive Glowing Eyes */}
        {missionSuccess ? (
          /* Happy Victory Eyes ^^ */
          <g>
            <path d="M22 21 Q25 17 28 21" stroke="#10B981" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M36 21 Q39 17 42 21" stroke="#10B981" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        ) : (
          /* Normal Glowing Eyes with Directional Focus */
          <g>
            <circle cx="25" cy="20" r="2.5" fill="#00D4AA" />
            <circle cx="26" cy="19" r="0.8" fill="#FFFFFF" />
            <circle cx="39" cy="20" r="2.5" fill="#00D4AA" />
            <circle cx="40" cy="19" r="0.8" fill="#FFFFFF" />
          </g>
        )}

        {/* Head Antenna with Beacon */}
        <line x1="32" y1="10" x2="32" y2="4" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
        <circle
          cx="32"
          cy="3"
          r="2.5"
          fill={missionSuccess ? '#10B981' : '#00D4AA'}
          className="animate-ping"
        />

        {/* Side Ear Guards / Headphone nodes */}
        <rect x="11" y="14" width="4" height="10" rx="2" fill="#818CF8" />
        <rect x="49" y="14" width="4" height="10" rx="2" fill="#818CF8" />

        {/* Directional Indicator Arrow (Subtle on Top of Robot Head) */}
        <path
          d="M32 0 L36 4 L28 4 Z"
          fill="#38BDF8"
          opacity="0.9"
          className="animate-bounce"
        />

        {/* Package Backpack */}
        {hasPackage && (
          <g className="animate-bounce" style={{ animationDuration: '1s' }}>
            <rect
              x="22"
              y="22"
              width="20"
              height="10"
              rx="2"
              fill="#F59E0B"
              stroke="#FDE047"
              strokeWidth="1.2"
            />
            <line x1="32" y1="22" x2="32" y2="32" stroke="#B45309" strokeWidth="1" />
            <line x1="22" y1="27" x2="42" y2="27" stroke="#B45309" strokeWidth="1" />
            <circle cx="42" cy="22" r="3" fill="#F59E0B" className="animate-ping" />
          </g>
        )}
      </svg>
    </div>
  )
}
