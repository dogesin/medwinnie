"use client"

export function DoctorIllustration() {
  return (
    <div className="relative h-64 w-64 md:h-80 md:w-80">
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        {/* ── Floating elements ──────────────────────── */}

        {/* Heart top-right */}
        <g className="animate-float-slow">
          <path
            d="M310 80c-6-12-20-16-30-10-10-6-24-2-30 10-4 8-2 18 6 26l24 22 24-22c8-8 10-18 6-26z"
            className="fill-primary/20"
          />
        </g>

        {/* Cross top-left */}
        <g className="animate-float-medium">
          <rect x="72" y="60" width="8" height="28" rx="4" className="fill-primary/15" />
          <rect x="62" y="70" width="28" height="8" rx="4" className="fill-primary/15" />
        </g>

        {/* Small circle bottom-left */}
        <circle cx="65" cy="300" r="6" className="fill-primary/10 animate-float-medium" />

        {/* Small dots right */}
        <circle cx="340" cy="200" r="4" className="fill-primary/15 animate-float-slow" />
        <circle cx="355" cy="240" r="3" className="fill-primary/10 animate-float-medium" />

        {/* Pill bottom-right */}
        <g className="animate-float-slow">
          <rect x="310" y="300" width="36" height="16" rx="8" className="fill-primary/15" />
          <rect x="328" y="300" width="18" height="16" rx="8" className="fill-primary/10" />
        </g>

        {/* ── Doctor figure ──────────────────────────── */}
        <g className="animate-breathe">
          {/* Shadow */}
          <ellipse cx="200" cy="355" rx="60" ry="8" className="fill-primary/5" />

          {/* Body / lab coat */}
          <path
            d="M160 220c0 0-20 10-25 50l-5 80h140l-5-80c-5-40-25-50-25-50"
            fill="white"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary/30"
          />

          {/* Coat lapel left */}
          <path d="M175 220l-8 60" stroke="currentColor" strokeWidth="1.5" className="text-primary/20" />
          {/* Coat lapel right */}
          <path d="M225 220l8 60" stroke="currentColor" strokeWidth="1.5" className="text-primary/20" />

          {/* Coat buttons */}
          <circle cx="200" cy="255" r="2.5" className="fill-primary/25" />
          <circle cx="200" cy="275" r="2.5" className="fill-primary/25" />
          <circle cx="200" cy="295" r="2.5" className="fill-primary/25" />

          {/* Scrub/shirt underneath */}
          <path
            d="M180 220l20 12 20-12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary/40"
          />

          {/* Neck */}
          <rect x="190" y="190" width="20" height="32" rx="10" className="fill-[#f5d0b0]" />

          {/* Head */}
          <ellipse cx="200" cy="168" rx="38" ry="42" className="fill-[#f5d0b0]" />

          {/* Hair */}
          <path
            d="M162 160c0-30 17-50 38-50s38 20 38 50c0 0-5-28-38-28s-38 28-38 28z"
            className="fill-[#4a3728]"
          />

          {/* Eyes */}
          <ellipse cx="186" cy="170" rx="4" ry="4.5" className="fill-[#4a3728]" />
          <ellipse cx="214" cy="170" rx="4" ry="4.5" className="fill-[#4a3728]" />
          {/* Eye shine */}
          <circle cx="188" cy="168" r="1.5" fill="white" />
          <circle cx="216" cy="168" r="1.5" fill="white" />

          {/* Smile */}
          <path
            d="M190 183c4 6 16 6 20 0"
            fill="none"
            stroke="#c4866a"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Cheek blush */}
          <ellipse cx="176" cy="180" rx="6" ry="4" className="fill-[#f0b0a0]/40" />
          <ellipse cx="224" cy="180" rx="6" ry="4" className="fill-[#f0b0a0]/40" />

          {/* Stethoscope */}
          <path
            d="M175 220c-10 5-15 25-10 45"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="text-primary/50"
          />
          <circle cx="165" cy="268" r="6" className="fill-primary/40" />
          <circle cx="165" cy="268" r="3" className="fill-primary/20" />

          {/* Left arm */}
          <path
            d="M160 225c-15 10-20 35-18 55"
            fill="none"
            stroke="white"
            strokeWidth="12"
          />
          <path
            d="M160 225c-15 10-20 35-18 55"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary/30"
          />
          {/* Left hand */}
          <ellipse cx="142" cy="282" rx="8" ry="7" className="fill-[#f5d0b0]" />

          {/* Right arm — waving */}
          <g className="origin-[240px_225px] animate-wave">
            <path
              d="M240 225c15-5 25-20 30-40"
              fill="none"
              stroke="white"
              strokeWidth="12"
            />
            <path
              d="M240 225c15-5 25-20 30-40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary/30"
            />
            {/* Right hand */}
            <ellipse cx="270" cy="183" rx="8" ry="7" className="fill-[#f5d0b0]" />
          </g>

          {/* Clipboard in left hand */}
          <rect x="128" y="268" width="28" height="36" rx="3" className="fill-primary/10 stroke-primary/30" strokeWidth="1.5" />
          <line x1="134" y1="278" x2="150" y2="278" className="stroke-primary/20" strokeWidth="1.5" />
          <line x1="134" y1="284" x2="148" y2="284" className="stroke-primary/20" strokeWidth="1.5" />
          <line x1="134" y1="290" x2="146" y2="290" className="stroke-primary/20" strokeWidth="1.5" />
        </g>

        {/* ── Pulse line ─────────────────────────────── */}
        <g className="animate-pulse-line">
          <polyline
            points="50,200 80,200 95,180 110,220 125,190 140,210 155,200 170,200"
            fill="none"
            className="stroke-primary/20"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
        @keyframes breathe {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-8deg); }
          75% { transform: rotate(8deg); }
        }
        @keyframes pulse-line {
          0% { opacity: 0.3; transform: translateX(-20px); }
          50% { opacity: 0.6; transform: translateX(0px); }
          100% { opacity: 0.3; transform: translateX(20px); }
        }
        :global(.animate-float-slow) {
          animation: float-slow 4s ease-in-out infinite;
        }
        :global(.animate-float-medium) {
          animation: float-medium 3s ease-in-out infinite;
        }
        :global(.animate-breathe) {
          animation: breathe 4s ease-in-out infinite;
        }
        :global(.animate-wave) {
          animation: wave 2.5s ease-in-out infinite;
        }
        :global(.animate-pulse-line) {
          animation: pulse-line 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
