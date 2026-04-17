"use client"

import { cn } from "@/lib/utils"
import { Sparkles, Check } from "lucide-react"

interface AnalysisHeroProps {
  isComplete: boolean
  percent: number
}

export function AnalysisHero({ isComplete, percent }: AnalysisHeroProps) {
  return (
    <div className="flex flex-col items-center gap-5">
      {/* Animated circle */}
      <div className="relative flex items-center justify-center">
        {/* Pulsing ring background */}
        {!isComplete && (
          <div className="absolute size-28 animate-ping rounded-full bg-primary/10 duration-[2000ms]" />
        )}

        {/* SVG circular progress */}
        <svg
          className="size-24 -rotate-90"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            strokeWidth="6"
            className="stroke-muted"
          />
          {/* Progress arc */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            className={cn(
              "transition-all duration-700 ease-out",
              isComplete ? "stroke-primary" : "stroke-primary"
            )}
            style={{
              strokeDasharray: `${2 * Math.PI * 42}`,
              strokeDashoffset: `${2 * Math.PI * 42 * (1 - percent / 100)}`,
            }}
          />
        </svg>

        {/* Center icon */}
        <div
          className={cn(
            "absolute flex size-16 items-center justify-center rounded-full transition-all duration-500",
            isComplete
              ? "bg-primary text-primary-foreground scale-110"
              : "bg-primary/10 text-primary"
          )}
        >
          {isComplete ? (
            <Check className="size-7 animate-in zoom-in duration-300" />
          ) : (
            <Sparkles className="size-7 animate-pulse" />
          )}
        </div>
      </div>

      {/* Percentage text */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-3xl font-bold tabular-nums text-foreground">
          {percent}%
        </span>
        <span className="text-sm text-muted-foreground">
          {isComplete ? "Análisis completado" : "Analizando..."}
        </span>
      </div>
    </div>
  )
}
