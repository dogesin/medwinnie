"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingUp, Minus, TrendingDown } from "lucide-react"
import type { HealthStatus } from "@/types/medical-case"

const STATUS_OPTIONS: {
  value: HealthStatus
  label: string
  emoji: string
  description: string
  icon: React.ElementType
  activeClasses: string
}[] = [
  {
    value: "mejor",
    label: "Mejor",
    emoji: "😊",
    description: "Me siento mejor que antes",
    icon: TrendingUp,
    activeClasses:
      "border-emerald-500 bg-emerald-50 text-emerald-700 ring-emerald-500/20",
  },
  {
    value: "igual",
    label: "Igual",
    emoji: "😐",
    description: "Sin cambios notables",
    icon: Minus,
    activeClasses:
      "border-amber-500 bg-amber-50 text-amber-700 ring-amber-500/20",
  },
  {
    value: "peor",
    label: "Peor",
    emoji: "😞",
    description: "Me siento peor que antes",
    icon: TrendingDown,
    activeClasses: "border-red-500 bg-red-50 text-red-700 ring-red-500/20",
  },
]

interface StatusSelectorProps {
  value: HealthStatus | null
  onChange: (status: HealthStatus) => void
}

export function StatusSelector({ value, onChange }: StatusSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-semibold text-foreground">
          ¿Cómo te sientes?
        </h2>
        <p className="text-sm text-muted-foreground">
          Compara con la última vez que actualizaste
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {STATUS_OPTIONS.map((option) => {
          const isActive = value === option.value
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all cursor-pointer",
                isActive
                  ? `${option.activeClasses} ring-2`
                  : "border-border hover:border-primary/30 hover:bg-muted/50"
              )}
            >
              <span className="text-3xl" role="img" aria-label={option.label}>
                {option.emoji}
              </span>
              <span className="text-sm font-semibold">{option.label}</span>
            </button>
          )
        })}
      </div>

      {/* Show description for the selected status */}
      {value && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-1 pb-1">
            <p className="text-sm text-foreground/80 text-center">
              {STATUS_OPTIONS.find((o) => o.value === value)?.description}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
