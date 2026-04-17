"use client"

import { ScanText, Pill, Brain, Sparkles, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"
import type { AnalysisStep } from "@/types/analysis-loading"

const ICON_MAP = {
  scan: ScanText,
  pill: Pill,
  brain: Brain,
  sparkles: Sparkles,
  check: Check,
} as const

interface AnalysisStepListProps {
  steps: AnalysisStep[]
  currentStepIndex: number
  isComplete: boolean
}

export function AnalysisStepList({
  steps,
  currentStepIndex,
  isComplete,
}: AnalysisStepListProps) {
  return (
    <div className="flex flex-col gap-1">
      {steps.map((step, index) => {
        const Icon = ICON_MAP[step.icon]
        const isDone = isComplete || index < currentStepIndex
        const isActive = !isComplete && index === currentStepIndex
        const isPending = !isComplete && index > currentStepIndex

        return (
          <div
            key={step.id}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-500",
              isActive && "bg-primary/8",
              isDone && "opacity-100",
              isPending && "opacity-40"
            )}
          >
            {/* Step indicator */}
            <div
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-full transition-all duration-500",
                isDone && "bg-primary text-primary-foreground",
                isActive && "bg-primary/15 text-primary",
                isPending && "bg-muted text-muted-foreground"
              )}
            >
              {isDone ? (
                <Check className="size-4" />
              ) : isActive ? (
                <Spinner className="size-4 text-primary" />
              ) : (
                <Icon className="size-4" />
              )}
            </div>

            {/* Step text */}
            <div className="flex flex-1 flex-col">
              <span
                className={cn(
                  "text-sm font-medium transition-colors duration-300",
                  isDone && "text-foreground",
                  isActive && "text-foreground",
                  isPending && "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
              {isActive && (
                <span className="text-xs text-muted-foreground animate-in fade-in duration-500">
                  {step.description}
                </span>
              )}
            </div>

            {/* Status check mark for completed */}
            {isDone && (
              <div className="text-primary animate-in fade-in zoom-in duration-300">
                <Check className="size-4" />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
